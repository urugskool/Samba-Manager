import { School, DivisionId, Enredo, EnredoThemeType } from '../types/carnaval';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import { DIVISION_REGULATIONS, generateDefaultParadeComposition } from '../config/obrigatoriedadesConfig';

export type ParadeElementType =
  | 'comissao_frente'
  | 'casal_mspb'
  | 'abre_alas'
  | 'ala'
  | 'tripe'
  | 'baianas'
  | 'bateria'
  | 'alegoria'
  | 'passistas'
  | 'velha_guarda'
  | 'apoteose'
  | 'musa_destaque_chao';

export interface ParadeScriptElement {
  id: string;
  orderNumber: number;
  type: ParadeElementType;
  name: string;
  categoryLabel: string;
  sectorNumber: number;
  sectorTitle: string;
  description?: string;
  costumeDetails?: string;
  highlightPeople?: string;
  componentsCount: number;
  isAllegoryOrTripod?: boolean;

  // Detalhes plásticos e de defesa canônica da LIESA
  personagemOuConceito?: string;
  defesaEnredo?: string;
  responsavelAla?: string;
  detalhesPlasticos?: {
    paletaCores?: string[];
    elementosVisuais?: string;
    destaquesComposicoes?: string;
    chassiOuModulos?: string;
    aderecos?: string;
  };
}

export interface ParadeSector {
  sectorNumber: number;
  title: string;
  themeSynopsis: string;
  resumoConceitual?: string;
}

export interface FichaBateriaBossa {
  numero: number;
  nome: string;
  trechoSamba: string;
  sinal: string;
  defesa: string;
}

export interface FichaBateria {
  mestreGeral: string;
  diretores: string;
  totalRitmistas: number;
  instrumentos: { [instrumento: string]: number };
  particularidades: string;
  bossas: FichaBateriaBossa[];
}

export interface FichaSambaEnredo {
  compositores: string[];
  interprete: string;
  letra: string;
  defesaLetra: { versoOuEstrofe: string; explicacao: string }[];
  defesaMelodia: string;
}

export interface FichaComissaoFrente {
  coreografo: string;
  nomeApresentacao: string;
  elementoCenografico?: string;
  totalComponentes: number;
  sinopseAcao: string;
  atos: { ato: string; descricao: string }[];
}

export interface FichaCasalMSPB {
  numeroCasal: 1 | 2 | 3;
  portaBandeira: string;
  mestreSala: string;
  fantasiaCasal: string;
  fantasiaGuardioes?: string;
  defesaDança: string;
}

export interface ParadeScript {
  schoolId: string;
  schoolName: string;
  shortName: string;
  division: DivisionId;
  divisionLabel: string;
  enredoTitle: string;
  enredoTheme: EnredoThemeType;
  synopsis: string;
  carnavalesco: string;
  presidente?: string;
  enredistas?: string[];
  justificativaEnredo?: string;
  pesquisaBibliografica?: string[];

  // Obrigatoriedades Homologadas
  obrigatoriedades: {
    totalComponentes: number;
    totalAlas: number;
    totalAlegorias: number;
    totalTripes: number;
    ritmistasCount: number;
    baianasCount: number;
    comissaoDeFrenteCount: number;
    componentesPorAla: number;
    casaisCount: number;
  };

  setores: ParadeSector[];
  elements: ParadeScriptElement[];

  fichaBateria?: FichaBateria;
  fichaSambaEnredo?: FichaSambaEnredo;
  fichaComissaoFrente?: FichaComissaoFrente;
  casaisMSPB?: FichaCasalMSPB[];
  profissionaisEscola?: {
    diretorCarnaval?: string;
    diretorBarracao?: string;
    diretorHarmonia?: string;
    diretorEvolucao?: string;
    chefeCostura?: string;
    chefeEscultura?: string;
    chefeIluminacao?: string;
  };
}

export class ParadeScriptService {
  private static scriptCache: Map<string, ParadeScript> = new Map();

  /**
   * Limpa o cache para forçar regeração caso enredo ou agremiação seja atualizada
   */
  public static clearCache(schoolId?: string): void {
    if (schoolId) {
      for (const key of this.scriptCache.keys()) {
        if (key.startsWith(`${schoolId}_`)) {
          this.scriptCache.delete(key);
        }
      }
    } else {
      this.scriptCache.clear();
    }
  }

  /**
   * Obtém ou gera o Roteiro Oficial do Desfile (Livro Abre-Alas) para uma escola.
   * O roteiro é 100% derivado e construído a partir do enredo e sinopse da escola.
   */
  public static getOrGenerateParadeScript(school: School, division?: DivisionId): ParadeScript {
    const div = division || school.division;

    // Se a agremiação possui um roteiro personalizado gerado no criador de enredos
    if (school.customParadeScript) {
      const custom = school.customParadeScript as ParadeScript;
      if (custom.schoolId === school.id && (!division || custom.division === div)) {
        return custom;
      }
    }

    const enredoTitle = school.currentEnredo?.title || 'O Canto Sagrado da Passarela';
    const enredoId = school.currentEnredo?.id || 'default_enr';
    const cacheKey = `${school.id}_${div}_${enredoId}_${enredoTitle}`;

    if (this.scriptCache.has(cacheKey)) {
      return this.scriptCache.get(cacheKey)!;
    }

    const script = this.generateScriptFromSynopsis(school, div);
    this.scriptCache.set(cacheKey, script);
    return script;
  }

  /**
   * Armazena um roteiro personalizado no cache do serviço
   */
  public static registerCustomScript(schoolId: string, script: ParadeScript): void {
    const enredoTitle = script.enredoTitle || 'Custom';
    const cacheKey = `${schoolId}_${script.division}_custom_${enredoTitle}`;
    this.scriptCache.set(cacheKey, script);
  }

  /**
   * Chamada à API para gerar Roteiro Oficial via IA Gemini (quando online)
   */
  public static async gerarRoteiroAbreAlasIA(
    school: School,
    enredoTitle: string,
    synopsis: string,
    themeType: EnredoThemeType,
    division?: DivisionId
  ): Promise<ParadeScript | null> {
    const div = division || school.division;
    try {
      const response = await fetch('/api/enredo/gerar-roteiro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schoolName: school.name,
          shortName: school.shortName,
          enredoTitle,
          synopsis,
          themeType,
          division: div,
          colors: [school.colors.primary, school.colors.secondary, school.colors.accent || '#eab308'],
          staff: school.staff
        })
      });

      if (response.ok && response.status === 200) {
        const rawJson = await response.json();
        return this.formatRawAiScriptToParadeScript(school, div, enredoTitle, synopsis, themeType, rawJson);
      }
    } catch {
      // Falha de rede ou timeout -> fallback no motor procedural
    }
    return null;
  }

  /**
   * Transforma o JSON gerado pela IA no objeto oficial ParadeScript da aplicação
   */
  private static formatRawAiScriptToParadeScript(
    school: School,
    division: DivisionId,
    enredoTitle: string,
    synopsis: string,
    themeType: EnredoThemeType,
    raw: any
  ): ParadeScript {
    const reg = DIVISION_REGULATIONS[division];
    const comp = school.paradeComposition || generateDefaultParadeComposition(school);

    const alegoriasCount = comp.alegorias || (division === 'especial' ? 5 : division === 'ouro' ? 3 : division === 'prata' ? 3 : division === 'bronze' ? 2 : 1);
    const tripesCount = comp.tripes || (division === 'especial' ? 2 : division === 'ouro' ? 1 : 0);
    const ritmistasCount = comp.ritmistas || (division === 'especial' ? 220 : division === 'ouro' ? 160 : division === 'prata' ? 130 : division === 'bronze' ? 95 : 80);
    const baianasCount = comp.baianas || (division === 'especial' ? 70 : division === 'ouro' ? 50 : division === 'prata' ? 40 : division === 'bronze' ? 30 : 15);
    const comissaoCount = comp.comissaoDeFrente || (division === 'especial' ? 14 : division === 'ouro' ? 14 : division === 'prata' ? 11 : 10);
    const componentesTotal = comp.componentes || (division === 'especial' ? 2800 : division === 'ouro' ? 1100 : division === 'prata' ? 750 : division === 'bronze' ? 600 : 400);

    const rawSectors = Array.isArray(raw.setores) ? raw.setores : [];
    const setores: ParadeSector[] = rawSectors.map((s: any, idx: number) => ({
      sectorNumber: s.numeroSetor || idx + 1,
      title: s.tituloSetor || `Setor ${idx + 1}`,
      themeSynopsis: s.resumoConceitual || s.synopsis || '',
      resumoConceitual: s.resumoConceitual || s.synopsis || ''
    }));

    const rawElements = Array.isArray(raw.elementos) ? raw.elementos : [];
    const elements: ParadeScriptElement[] = rawElements.map((el: any, idx: number) => {
      const type: ParadeElementType = el.tipo || 'ala';
      const isFloat = type === 'abre_alas' || type === 'alegoria' || type === 'tripe' || type === 'apoteose';

      return {
        id: `el_${school.id}_${idx + 1}`,
        orderNumber: el.ordem || idx + 1,
        type,
        name: el.nomeElemento || `Elemento ${idx + 1}`,
        categoryLabel: el.categoryLabel || this.getCategoryLabelForType(type, el.ordem || idx + 1),
        sectorNumber: el.setorNumero || 1,
        sectorTitle: el.setorTitulo || (setores[(el.setorNumero || 1) - 1]?.title || 'Setor 1'),
        description: el.defesaEnredo || el.personagemOuConceito || '',
        costumeDetails: el.detalhesPlasticos?.elementosVisuais || el.costumeDetails || '',
        highlightPeople: el.highlightPeople || el.detalhesPlasticos?.destaquesComposicoes || '',
        componentsCount: el.componentsCount || (isFloat ? 30 : type === 'bateria' ? ritmistasCount : type === 'baianas' ? baianasCount : type === 'comissao_frente' ? comissaoCount : 35),
        isAllegoryOrTripod: isFloat,
        personagemOuConceito: el.personagemOuConceito,
        defesaEnredo: el.defesaEnredo,
        responsavelAla: el.responsavelAla,
        detalhesPlasticos: el.detalhesPlasticos
      };
    });

    const totalAlas = elements.filter(e => e.type === 'ala' || e.type === 'baianas' || e.type === 'passistas' || e.type === 'velha_guarda').length;
    const componentesPorAla = totalAlas > 0 ? Math.round((componentesTotal - ritmistasCount - baianasCount - comissaoCount - 150) / totalAlas) : 35;

    return {
      schoolId: school.id,
      schoolName: school.name,
      shortName: school.shortName,
      division,
      divisionLabel: reg.divisionLabel,
      enredoTitle: raw.tituloEnredo || enredoTitle,
      enredoTheme: themeType,
      synopsis,
      carnavalesco: school.staff?.carnavalesco?.name || 'Comissão de Carnaval',
      presidente: 'Presidência da Agremiação',
      justificativaEnredo: raw.justificativaEnredo,
      pesquisaBibliografica: raw.pesquisaBibliografica,
      obrigatoriedades: {
        totalComponentes: componentesTotal,
        totalAlas: Math.max(12, totalAlas),
        totalAlegorias: alegoriasCount,
        totalTripes: tripesCount,
        ritmistasCount,
        baianasCount,
        comissaoDeFrenteCount: comissaoCount,
        componentesPorAla,
        casaisCount: division === 'especial' ? 4 : 3
      },
      setores,
      elements,
      fichaBateria: raw.fichaBateria,
      fichaSambaEnredo: raw.fichaSambaEnredo,
      fichaComissaoFrente: raw.fichaComissaoFrente,
      casaisMSPB: raw.casaisMSPB
    };
  }

  /**
   * MOTOR OFFLINE-FIRST NARRATIVO CANÔNICO DA LIESA:
   * Constrói o Roteiro Oficial SEM nenhuma pré-definição fixa de setores.
   * Analisa gramatical e poeticamente a sinopse e o tema da agremiação.
   */
  public static generateScriptFromSynopsis(school: School, division: DivisionId): ParadeScript {
    const reg = DIVISION_REGULATIONS[division];
    const comp = school.paradeComposition || generateDefaultParadeComposition(school);

    const enredo = school.currentEnredo || {
      id: 'default_enr',
      title: 'O Canto Sagrado da Passarela',
      themeType: 'Cultural' as EnredoThemeType,
      synopsis: 'Sob as bênçãos dos baluartes ancestrais e o toque soberano dos tambores, a agremiação desfila sua raiz mais profunda na passarela do samba.',
      qualityBoost: 10,
      cost: 150000
    };

    const divisionLabel = reg.divisionLabel;
    const alegoriasCount = comp.alegorias || (division === 'especial' ? 5 : division === 'ouro' ? 3 : division === 'prata' ? 3 : division === 'bronze' ? 2 : 1);
    const tripesCount = comp.tripes || (division === 'especial' ? 2 : division === 'ouro' ? 1 : 0);
    const ritmistasCount = comp.ritmistas || (division === 'especial' ? 240 : division === 'ouro' ? 180 : division === 'prata' ? 140 : division === 'bronze' ? 100 : 80);
    const baianasCount = comp.baianas || (division === 'especial' ? 70 : division === 'ouro' ? 50 : division === 'prata' ? 40 : division === 'bronze' ? 30 : 15);
    const comissaoCount = comp.comissaoDeFrente || (division === 'especial' ? 15 : division === 'ouro' ? 15 : division === 'prata' ? 12 : 10);

    const totalAlas = division === 'especial' ? 25 : division === 'ouro' ? 18 : division === 'prata' ? 14 : division === 'bronze' ? 11 : 8;
    const componentesTotal = comp.componentes || (division === 'especial' ? 2900 : division === 'ouro' ? 1200 : division === 'prata' ? 800 : division === 'bronze' ? 600 : 400);
    const componentesPorAla = Math.max(25, Math.round((componentesTotal - ritmistasCount - baianasCount - comissaoCount - 160) / totalAlas));

    // Determina a quantidade de setores canônica (5 para Especial, 4 para outras divisões)
    const numSectors = division === 'especial' ? 5 : 4;

    // 1. EXTRAÇÃO DINÂMICA DE SETORES A PARTIR DA SINOPSE (SEM PRÉ-DEFINIÇÃO FIXA)
    const setores = this.extractDynamicSectors(enredo.synopsis, enredo.title, numSectors);

    // 2. EXTRAÇÃO DE ELEMENTOS POÉTICOS E CONCEITOS DA SINOPSE
    const narrativeUnits = this.extractNarrativeUnitsFromSynopsis(enredo.synopsis, enredo.title);

    // 3. CONSTRUÇÃO DO CORTEJO OFICIAL SETOR POR SETOR
    const elements: ParadeScriptElement[] = [];
    let orderSeq = 1;
    let alaCounter = 1;

    // --- SETOR 1: ABERTURA DO DESFILE ---
    const s1 = setores[0];

    // Comissão de Frente
    const cdfConcept = narrativeUnits[0] || 'O portal inaugural da narrativa';
    elements.push({
      id: `cdf_${school.id}`,
      orderNumber: orderSeq++,
      type: 'comissao_frente',
      name: `Comissão de Frente: ${this.derivePoeticTitle(cdfConcept, 'O Chamado da Origem')}`,
      categoryLabel: 'Comissão de Frente',
      sectorNumber: 1,
      sectorTitle: s1.title,
      personagemOuConceito: cdfConcept,
      defesaEnredo: `Abertura oficial do cortejo cênico. A comissão de frente teatraliza o instante primordial da sinopse: "${s1.themeSynopsis.slice(0, 160)}...". Em quatro atos de dança e metamorfose cênica, os bailarinos revelam o fundamento do enredo perante o júri.`,
      costumeDetails: `Indumentária cênica com maquiagem tridimensional, tecidos nobres texturizados nas cores ${school.colors.primary} e ${school.colors.secondary}, adereços orgânicos e estruturas móveis articuladas.`,
      highlightPeople: `Coreógrafo(a): ${school.staff?.coreografo?.name || 'Direção Coreográfica'}`,
      componentsCount: comissaoCount,
      isAllegoryOrTripod: false,
      detalhesPlasticos: {
        paletaCores: [school.colors.primary, school.colors.secondary, '#d97706'],
        elementosVisuais: 'Trajes de corte teatral com resplendores articulados e apliques de fibra leve.',
        aderecos: 'Elemento cenográfico móvel de apoio à coreografia.'
      }
    });

    // 1º Casal de Mestre-Sala e Porta-Bandeira
    const casal1Title = this.derivePoeticTitle(narrativeUnits[1] || enredo.title, 'A Nobreza do Pavilhão');
    elements.push({
      id: `casal_1_${school.id}`,
      orderNumber: orderSeq++,
      type: 'casal_mspb',
      name: `1º Casal de MS e PB: “${casal1Title}”`,
      categoryLabel: '1º Casal de MS & PB',
      sectorNumber: 1,
      sectorTitle: s1.title,
      personagemOuConceito: casal1Title,
      defesaEnredo: `O 1º Casal ostenta o pavilhão sagrado de ${cleanSchoolName(school)} no Setor 1, personificando o simbolismo central da abertura da narrativa. Dançam em reverência ancestral, com meneios e riscados clássicos, protegidos por seus guardiões.`,
      costumeDetails: `Figurino de corte nobre com esplendor em vime e faisões ecológicos, bordados em filigrana e pedrarias nas tonalidades ${school.colors.primary} e ${school.colors.secondary}. Guardiões do casal vestidos em harmonia cerimonial.`,
      highlightPeople: `1º Casal Oficial: ${school.staff?.mestreSalaPortaBandeira?.name || 'Casal Soberano'}`,
      componentsCount: 2,
      isAllegoryOrTripod: false,
      detalhesPlasticos: {
        paletaCores: [school.colors.primary, school.colors.secondary, '#f59e0b', '#ffffff'],
        elementosVisuais: 'Costeiros de luxo com pedrarias e plumas de sustentabilidade, adereços de mão com hastes douradas.',
        destaquesComposicoes: 'Guardiões do 1º Casal: Centinelas do Pavilhão.'
      }
    });

    // Personagem ou Destaque de Chão Setor 1
    const musa1Title = this.derivePoeticTitle(narrativeUnits[2] || s1.title, 'Guardiã da Memória');
    elements.push({
      id: `destaque_chao_1_${school.id}`,
      orderNumber: orderSeq++,
      type: 'musa_destaque_chao',
      name: `Destaque de Chão: “${musa1Title}”`,
      categoryLabel: 'Destaque de Chão',
      sectorNumber: 1,
      sectorTitle: s1.title,
      personagemOuConceito: musa1Title,
      defesaEnredo: `Personagem que abre a leitura poética do primeiro setor, atuando como elo sensorial entre o bailado do casal e as primeiras alas da comunidade.`,
      costumeDetails: `Biquíni cênico trabalhado com resplendor leve em penas sintéticas e cristais, dialogando com o conceito de "${musa1Title}".`,
      highlightPeople: `Musa / Destaque de Chão`,
      componentsCount: 1,
      isAllegoryOrTripod: false
    });

    // Alas do Setor 1
    const alasPerSector = Math.ceil((totalAlas - 4) / numSectors); // desconta baianas, bateria, passistas e velha-guarda
    let unitCursor = 3;

    for (let i = 0; i < alasPerSector; i++) {
      const unit = narrativeUnits[unitCursor++] || `Passagem do ${s1.title}`;
      const alaTitle = this.derivePoeticTitle(unit, `Ala ${alaCounter}`);
      elements.push({
        id: `ala_${alaCounter}_${school.id}`,
        orderNumber: orderSeq++,
        type: 'ala',
        name: `Ala ${String(alaCounter).padStart(2, '0')}: “${alaTitle}”`,
        categoryLabel: `Ala ${String(alaCounter).padStart(2, '0')}`,
        sectorNumber: 1,
        sectorTitle: s1.title,
        personagemOuConceito: unit,
        defesaEnredo: `Representa o episódio da sinopse onde "${unit}". A indumentária traduz o espírito da época com soluções têxteis orgânicas e rica cenografia vestimentar.`,
        costumeDetails: `Cabeça: chapéu/adê estilizado. Costeiro: estrutura leve de resplendor. Adereço de mão: insígnia simbólica do episódio narrado. Tecidos: cetim e tecidos texturizados.`,
        responsavelAla: 'Direção de Harmonia & Ateliê de Fantasias',
        componentsCount: componentesPorAla,
        isAllegoryOrTripod: false,
        detalhesPlasticos: {
          paletaCores: [school.colors.primary, school.colors.secondary],
          elementosVisuais: 'Costeiro médio com sobreposição de estampas e adereço de mão em espuma moldada.'
        }
      });
      alaCounter++;
    }

    // Carro Abre-Alas (1ª Alegoria)
    const abreAlasTitle = this.derivePoeticTitle(s1.title, 'O Grande Monumento Inaugural');
    elements.push({
      id: `alegoria_1_${school.id}`,
      orderNumber: orderSeq++,
      type: 'abre_alas',
      name: `Carro Abre-Alas: “${abreAlasTitle}”`,
      categoryLabel: 'Carro Abre-Alas',
      sectorNumber: 1,
      sectorTitle: s1.title,
      personagemOuConceito: abreAlasTitle,
      defesaEnredo: `O Abre-Alas materializa a abertura solene do desfile concebido na sinopse. A monumentalidade das esculturas articula os signos ancestrais e míticos do enredo, estabelecendo a atmosfera cenográfica que conduz o espectador para dentro da história contada.`,
      costumeDetails: `Cenografia composta por 2 a 3 chassis acoplados com acabamento em EPS resinado, iluminação quente e fria em LED embutido, escultura central em destaque e fontes de efeitos cênicos.`,
      highlightPeople: `Destaque Central Alto: A Essência do Enredo`,
      componentsCount: 35,
      isAllegoryOrTripod: true,
      detalhesPlasticos: {
        chassiOuModulos: 'Conjunto alegórico em 2 módulos com articulação mecânica e iluminação pontual.',
        destaquesComposicoes: 'Destaque Central Alto: Soberano da Memória; Semi-destaques laterais: Símbolos do Sagrado; Composições de Chassi: Foliões da Criação.'
      }
    });

    // Tripé 1 (se a escola possuir)
    if (tripesCount >= 1) {
      const tripeTitle = this.derivePoeticTitle(narrativeUnits[unitCursor++] || 'O Símbolo Sagrado', 'Elemento Cênico');
      elements.push({
        id: `tripe_1_${school.id}`,
        orderNumber: orderSeq++,
        type: 'tripe',
        name: `Tripé 1: “${tripeTitle}”`,
        categoryLabel: 'Elemento Cenográfico (Tripé 1)',
        sectorNumber: 1,
        sectorTitle: s1.title,
        personagemOuConceito: tripeTitle,
        defesaEnredo: `Elemento cênico complementar que encerra o primeiro setor, criando uma transição visual e conceitual para o desenvolvimento narrativo subsequente.`,
        costumeDetails: `Estrutura de ferro leve revestida com tecidos rústicos e adereços cenográficos em relevo.`,
        componentsCount: 2,
        isAllegoryOrTripod: true
      });
    }

    // --- SETORES INTERMEDIÁRIOS (2 a N-1) ---
    for (let sIdx = 1; sIdx < numSectors - 1; sIdx++) {
      const sector = setores[sIdx];
      const sectorNum = sector.sectorNumber;

      // Inserção da Ala das Baianas no Setor 2 (Setor de peso espiritual/maternal/ancestral)
      if (sIdx === 1) {
        const baianasTitle = this.derivePoeticTitle(narrativeUnits[unitCursor++] || sector.title, 'A Bênção das Matriarcas');
        elements.push({
          id: `baianas_${school.id}`,
          orderNumber: orderSeq++,
          type: 'baianas',
          name: `Ala das Baianas: “${baianasTitle}”`,
          categoryLabel: 'Ala das Baianas',
          sectorNumber: sectorNum,
          sectorTitle: sector.title,
          personagemOuConceito: baianasTitle,
          defesaEnredo: `As ${baianasCount} baianas de ${cleanSchoolName(school)} personificam o núcleo de sagrado e tradição da sinopse. Seus giros contínuos na avenida desenham mandalas no chão da Sapucaí, abençoando o cortejo através de sua indumentária monumental.`,
          costumeDetails: `Saia armada com rodado monumental em cetim e rendas finas, torço de cabeça estilizado com detalhes dourados, pano da costa bordado à mão e contas rituais.`,
          highlightPeople: 'Tias Baianas e Matriarcas da Comunidade',
          componentsCount: baianasCount,
          isAllegoryOrTripod: false,
          detalhesPlasticos: {
            paletaCores: [school.colors.primary, '#fef08a', '#ffffff'],
            elementosVisuais: 'Saia rodada com estampas temáticas exclusivas, torço alto e adereço de mão com flores e conchas.'
          }
        });
      }

      // Inserção da Bateria e Rainha no Setor 2 ou 3 (onde reside a força percussiva e popular)
      if ((numSectors === 5 && sIdx === 2) || (numSectors === 4 && sIdx === 1)) {
        const bateriaTitle = this.derivePoeticTitle(narrativeUnits[unitCursor++] || sector.title, 'O Ritmo da Batalha e da Fé');
        const rainhaTitle = this.derivePoeticTitle(narrativeUnits[unitCursor++] || sector.title, 'A Chama da Cadência');

        // Rainha de Bateria
        elements.push({
          id: `rainha_bateria_${school.id}`,
          orderNumber: orderSeq++,
          type: 'musa_destaque_chao',
          name: `Rainha de Bateria: “${rainhaTitle}”`,
          categoryLabel: 'Rainha de Bateria',
          sectorNumber: sectorNum,
          sectorTitle: sector.title,
          personagemOuConceito: rainhaTitle,
          defesaEnredo: `A Rainha de Bateria reina à frente dos ritmistas personificando o espírito vivo que incendeia a narrativa naquele setor, traduzindo o vigor e a beleza da cadência.`,
          costumeDetails: `Fantasia de gala com costeiro cintilante de grande porte, biquíni banhado a ouro e pedrarias luxuosas.`,
          highlightPeople: 'Rainha de Bateria Oficial',
          componentsCount: 1,
          isAllegoryOrTripod: false
        });

        // Bateria Oficial
        elements.push({
          id: `bateria_${school.id}`,
          orderNumber: orderSeq++,
          type: 'bateria',
          name: `Bateria: “${bateriaTitle}”`,
          categoryLabel: 'Ala da Bateria',
          sectorNumber: sectorNum,
          sectorTitle: sector.title,
          personagemOuConceito: bateriaTitle,
          defesaEnredo: `Os ${ritmistasCount} ritmistas da agremiação trajam a fantasia temática correspondente ao contexto do setor, atuando como o coração sonoro que impulsiona o canto de toda a comunidade. Executam 4 convenções rítmicas (bossas) perfeitamente alinhadas à letra do samba.`,
          costumeDetails: `Indumentária padronizada confortável para evolução dos ritmistas, com elementos na cabeça e no colete que caracterizam ${bateriaTitle}.`,
          highlightPeople: `Mestre de Bateria: ${school.staff?.mestreBateria?.name || 'Mestre da Bateria'}`,
          componentsCount: ritmistasCount,
          isAllegoryOrTripod: false
        });

        // Ala de Passistas
        const passistasTitle = this.derivePoeticTitle(narrativeUnits[unitCursor++] || sector.title, 'O Bailado da Liberdade');
        elements.push({
          id: `passistas_${school.id}`,
          orderNumber: orderSeq++,
          type: 'passistas',
          name: `Ala de Passistas: “${passistasTitle}”`,
          categoryLabel: 'Ala de Passistas',
          sectorNumber: sectorNum,
          sectorTitle: sector.title,
          personagemOuConceito: passistasTitle,
          defesaEnredo: `Os passistas trazem a alegria vibrante e a ginga do samba no pé, representando a juventude e a sedução do enredo, libertos de cangalhas pesadas para facilitar os passos e malandragens.`,
          costumeDetails: `Figurino leve e brilhante em tecidos metalizados, com franjas e penas que acentuam cada requebro.`,
          highlightPeople: 'Direção da Ala de Passistas',
          componentsCount: 35,
          isAllegoryOrTripod: false
        });
      }

      // Inserção do 2º Casal de MS e PB
      if (sIdx === 2) {
        const casal2Title = this.derivePoeticTitle(narrativeUnits[unitCursor++] || sector.title, 'A Dança dos Ancestrais');
        elements.push({
          id: `casal_2_${school.id}`,
          orderNumber: orderSeq++,
          type: 'casal_mspb',
          name: `2º Casal de MS e PB: “${casal2Title}”`,
          categoryLabel: '2º Casal de MS & PB',
          sectorNumber: sectorNum,
          sectorTitle: sector.title,
          personagemOuConceito: casal2Title,
          defesaEnredo: `O 2º casal conduz o pavilhão intermediário com gestos que espelham a história defendida neste setor, integrando a nobreza da dança ao rigor da evolução.`,
          costumeDetails: `Traje de gala com tecidos nobres e resplendores de sustentabilidade, acompanhado por seus guardiões caracterizados.`,
          highlightPeople: '2º Casal Oficial da Agremiação',
          componentsCount: 2,
          isAllegoryOrTripod: false
        });
      }

      // Alas do Setor Intermediário
      for (let a = 0; a < alasPerSector; a++) {
        const unit = narrativeUnits[unitCursor++] || `Facetas de ${sector.title}`;
        const alaTitle = this.derivePoeticTitle(unit, `Ala ${alaCounter}`);
        elements.push({
          id: `ala_${alaCounter}_${school.id}`,
          orderNumber: orderSeq++,
          type: 'ala',
          name: `Ala ${String(alaCounter).padStart(2, '0')}: “${alaTitle}”`,
          categoryLabel: `Ala ${String(alaCounter).padStart(2, '0')}`,
          sectorNumber: sectorNum,
          sectorTitle: sector.title,
          personagemOuConceito: unit,
          defesaEnredo: `Desenvolve o trecho da sinopse que aborda "${unit}". A indumentária estabelece correlação imediata entre o texto do enredo e o desenho visual da fantasia.`,
          costumeDetails: `Cabeça com adorno volumoso; costeiro estilizado com hastes flexíveis; adereço de mão temático em madeira e resina; tecidos leves e resistentes.`,
          responsavelAla: 'Harmonia da Escola',
          componentsCount: componentesPorAla,
          isAllegoryOrTripod: false,
          detalhesPlasticos: {
            paletaCores: [school.colors.primary, school.colors.secondary, '#38bdf8'],
            elementosVisuais: 'Costeiro médio com sobreposição de materiais e estandarte ou adereço de mão.'
          }
        });
        alaCounter++;
      }

      // Carro Alegórico do Setor
      const floatNum = sIdx + 1;
      if (floatNum <= alegoriasCount) {
        const floatTitle = this.derivePoeticTitle(sector.title, `Carro ${floatNum}`);
        elements.push({
          id: `alegoria_${floatNum}_${school.id}`,
          orderNumber: orderSeq++,
          type: 'alegoria',
          name: `Carro ${floatNum}: “${floatTitle}”`,
          categoryLabel: `Carro Alegórico ${floatNum}`,
          sectorNumber: sectorNum,
          sectorTitle: sector.title,
          personagemOuConceito: floatTitle,
          defesaEnredo: `Esta alegoria sintetiza em grande escala a dramaticidade de ${sector.title}, combinando composições coreografadas e destaques centrais com acabamentos cenográficos minuciosos.`,
          costumeDetails: `Alegoria de médio/grande porte com esculturas de alta definição, ferragens estruturais, tecidos nobres e jogo de luz cênico.`,
          highlightPeople: `Destaque Central Alto: A Figura Emblemática do Setor`,
          componentsCount: 30,
          isAllegoryOrTripod: true,
          detalhesPlasticos: {
            chassiOuModulos: 'Chassi reforçado com 3 níveis de altura e plataformas elevatórias.',
            destaquesComposicoes: 'Destaque Alto: Guardião do Conhecimento; Semi-destaques: Símbolos do Povo; Composições: Desfilantes em fantasia de luxo.'
          }
        });
      }
    }

    // --- ÚLTIMO SETOR: APOTEOSE & CONSAGRAÇÃO DO ENREDO ---
    const lastSector = setores[setores.length - 1];
    const lastSectorNum = lastSector.sectorNumber;

    // Alas do Setor Final
    const remainingAlas = Math.max(2, totalAlas - alaCounter - 1);
    for (let a = 0; a < remainingAlas; a++) {
      const unit = narrativeUnits[unitCursor++] || `Consagração de ${lastSector.title}`;
      const alaTitle = this.derivePoeticTitle(unit, `Ala ${alaCounter}`);
      elements.push({
        id: `ala_${alaCounter}_${school.id}`,
        orderNumber: orderSeq++,
        type: 'ala',
        name: `Ala ${String(alaCounter).padStart(2, '0')}: “${alaTitle}”`,
        categoryLabel: `Ala ${String(alaCounter).padStart(2, '0')}`,
        sectorNumber: lastSectorNum,
        sectorTitle: lastSector.title,
        personagemOuConceito: unit,
        defesaEnredo: `Conclui a narrativa dramatúrgica na avenida expressando "${unit}". Fantasia festiva com cores radiantes que preparam o público para a grande apoteose.`,
        costumeDetails: `Cabeça em formato de coroa/penacho de gala; costeiro esplendoroso com adereços brilhantes; adereço de mão em forma de estandarte ou fita.`,
        responsavelAla: 'Direção de Harmonia',
        componentsCount: componentesPorAla,
        isAllegoryOrTripod: false
      });
      alaCounter++;
    }

    // Velha Guarda da Escola no Setor Final
    const vgTitle = this.derivePoeticTitle(narrativeUnits[unitCursor++] || 'Os Baluartes da Glória', 'Guardiões da Eternidade');
    elements.push({
      id: `velha_guarda_${school.id}`,
      orderNumber: orderSeq++,
      type: 'velha_guarda',
      name: `Ala da Velha Guarda: “${vgTitle}”`,
      categoryLabel: 'Velha Guarda',
      sectorNumber: lastSectorNum,
      sectorTitle: lastSector.title,
      personagemOuConceito: vgTitle,
      defesaEnredo: `Os baluartes e pioneiros da escola encerram a narrativa, vestindo a tradição de gala da agremiação como símbolo de imortalidade e transmissão de saberes para as futuras gerações.`,
      costumeDetails: `Ternos de linho e cetim cortados à moda clássica com as cores da escola (${school.colors.primary} e ${school.colors.secondary}), chapéus panamá bordados e toalhas de ombro estilizadas.`,
      highlightPeople: 'Patriarcas e Matriarcas da Velha Guarda',
      componentsCount: 30,
      isAllegoryOrTripod: false
    });

    // Última Alegoria (Carro da Apoteose)
    const apoteoseTitle = this.derivePoeticTitle(lastSector.title, 'A Apoteose Triunfal da Nação');
    elements.push({
      id: `alegoria_apoteose_${school.id}`,
      orderNumber: orderSeq++,
      type: 'apoteose',
      name: `Última Alegoria (Carro ${alegoriasCount}): “${apoteoseTitle}”`,
      categoryLabel: `Última Alegoria (Carro ${alegoriasCount})`,
      sectorNumber: lastSectorNum,
      sectorTitle: lastSector.title,
      personagemOuConceito: apoteoseTitle,
      defesaEnredo: `Fechando o desfile com chave de ouro, a última alegoria consagra o desfecho vitorioso do enredo na Marquês de Sapucaí. A grandiosidade cenográfica reúne baluartes, símbolos maiores da escola e o legado perpétuo da narrativa.`,
      costumeDetails: `Conjunto monumental de grande porte com esculturas agigantadas, acabamento barroco/contemporâneo, cascatas de luzes e efeitos especiais de fumaça e papel picado.`,
      highlightPeople: `Destaques de Luxo & Baluartes Históricos`,
      componentsCount: 40,
      isAllegoryOrTripod: true,
      detalhesPlasticos: {
        chassiOuModulos: 'Chassi triplo de dimensões máximas homologadas pela LIESA com sistema de elevação hidráulica.',
        destaquesComposicoes: 'Destaque Central Alto: A Coroação da Memória; Composições de Chassi: A Comunidade Triunfante; Baluartes e Convidados Especiais.'
      }
    });

    // 4. GERAÇÃO DAS FICHAS TÉCNICAS OFICIAIS CANÔNICAS (BATERIA, SAMBA-ENREDO, CASAIS, PROFISSIONAIS)
    const fichaBateria = this.generateFichaBateria(school, enredo, ritmistasCount, setores);
    const fichaSambaEnredo = this.generateFichaSambaEnredo(school, enredo, setores);
    const fichaComissaoFrente = this.generateFichaComissaoFrente(school, enredo, comissaoCount, s1);
    const casaisMSPB = this.generateFichaCasais(school, enredo, setores);
    const justificativaEnredo = this.generateJustificativaEnredo(school, enredo, setores);
    const pesquisaBibliografica = this.generatePesquisaBibliografica(enredo);

    return {
      schoolId: school.id,
      schoolName: school.name,
      shortName: school.shortName,
      division,
      divisionLabel,
      enredoTitle: enredo.title,
      enredoTheme: enredo.themeType,
      synopsis: enredo.synopsis,
      carnavalesco: school.staff?.carnavalesco?.name || 'Comissão de Carnaval',
      presidente: 'Presidência da Agremiação',
      justificativaEnredo,
      pesquisaBibliografica,
      obrigatoriedades: {
        totalComponentes: componentesTotal,
        totalAlas: elements.filter(e => e.type === 'ala' || e.type === 'baianas' || e.type === 'passistas' || e.type === 'velha_guarda').length,
        totalAlegorias: alegoriasCount,
        totalTripes: tripesCount,
        ritmistasCount,
        baianasCount,
        comissaoDeFrenteCount: comissaoCount,
        componentesPorAla,
        casaisCount: division === 'especial' ? 4 : 3
      },
      setores,
      elements,
      fichaBateria,
      fichaSambaEnredo,
      fichaComissaoFrente,
      casaisMSPB,
      profissionaisEscola: {
        diretorCarnaval: 'Direção Executiva de Carnaval',
        diretorBarracao: 'Diretoria de Barracão & Produção',
        diretorHarmonia: school.staff?.harmonia?.name || 'Direção Geral de Harmonia',
        diretorEvolucao: 'Diretoria de Evolução na Pista',
        chefeCostura: 'Ateliê Central de Fantasias',
        chefeEscultura: 'Equipe de Escultura e Formas',
        chefeIluminacao: 'Equipe de Iluminação Cenográfica e LED'
      }
    };
  }

  /**
   * Extrai setores narrativos dinamicamente da sinopse, detectando títulos poéticos
   * ou construindo-os a partir do encadeamento dramático sem fórmulas pré-prontas.
   */
  private static extractDynamicSectors(synopsis: string, title: string, numSectors: number): ParadeSector[] {
    const text = synopsis.trim();

    // 1. Tenta identificar se o texto já possui marcação de setores / encantos / capítulos
    const explicitRegex = /(?:(\d+)[ºªo\.]?\s*(?:setor|encanto|ato|capítulo|parte)|(?:setor|encanto|ato|capítulo|parte)\s*(\d+))\s*[-–—:]\s*["“]?([^"”\n\r]+)["”]?/gi;
    const matches: { num: number; title: string; body: string }[] = [];
    let m;

    while ((m = explicitRegex.exec(text)) !== null) {
      const num = parseInt(m[1] || m[2], 10);
      const sTitle = m[3]?.trim();
      if (num && sTitle) {
        matches.push({ num, title: sTitle, body: '' });
      }
    }

    if (matches.length >= 3) {
      return matches.slice(0, numSectors).map((item, idx) => ({
        sectorNumber: idx + 1,
        title: `${idx + 1}º Setor - “${item.title.replace(/^Setor\s*\d+\s*[:\-–]\s*/i, '')}”`,
        themeSynopsis: `Desdobramento conceitual do enredo focado em "${item.title}".`,
        resumoConceitual: `Neste setor, a agremiação apresenta as passagens poéticas e históricas de "${item.title}", conectando indumentárias e alegorias ao fio condutor do desfile.`
      }));
    }

    // 2. Divide a sinopse em parágrafos e frases expressivas
    const paragraphs = text
      .split(/\n\s*\n|\n/)
      .map(p => p.trim())
      .filter(p => p.length > 25);

    const sectors: ParadeSector[] = [];
    const paragraphChunks = Math.max(1, Math.floor(paragraphs.length / numSectors));

    for (let i = 0; i < numSectors; i++) {
      const startIdx = i * paragraphChunks;
      const endIdx = i === numSectors - 1 ? paragraphs.length : (i + 1) * paragraphChunks;
      const sliceParagraphs = paragraphs.slice(startIdx, endIdx);
      const sectorText = sliceParagraphs.join(' ') || paragraphs[i % paragraphs.length] || text;

      // Extrai um título poético forte da fatia da sinopse
      const poeticPhrase = this.extractPoeticSectorTitle(sectorText, title, i + 1, numSectors);

      sectors.push({
        sectorNumber: i + 1,
        title: `${i + 1}º Setor - “${poeticPhrase}”`,
        themeSynopsis: sectorText.slice(0, 220) + (sectorText.length > 220 ? '...' : ''),
        resumoConceitual: `O ${i + 1}º setor materializa na pista: "${sectorText.slice(0, 180)}...". Traduzido visualmente pelas alas de enredo e sua respectiva alegoria.`
      });
    }

    return sectors;
  }

  /**
   * Extrai uma frase poética autêntica de dentro de um texto da sinopse para servir de título do setor
   */
  private static extractPoeticSectorTitle(sectorText: string, enredoTitle: string, sectorNum: number, totalSectors: number): string {
    // 1. Procura frases entre aspas
    const quoteMatch = sectorText.match(/["“]([^"”]{6,50})["”]/);
    if (quoteMatch && quoteMatch[1]) {
      return this.cleanTitleCase(quoteMatch[1]);
    }

    // 2. Procura frases curtas de impacto no início ou meio das sentenças
    const sentences = sectorText
      .split(/[.!?]/)
      .map(s => s.trim())
      .filter(s => s.length >= 8 && s.length <= 48);

    if (sentences.length > 0) {
      // Prioriza frases que contenham substantivos e adjetivos expressivos
      const candidate = sentences.find(s => !s.toLowerCase().startsWith('o que') && !s.toLowerCase().startsWith('assim')) || sentences[0];
      return this.cleanTitleCase(candidate);
    }

    // 3. Extrai sintagmas nominais relevantes da sinopse
    const words = sectorText.replace(/[^\w\sÀ-ÿ]/g, '').split(/\s+/).filter(w => w.length > 3);
    if (words.length >= 4) {
      const start = (sectorNum * 3) % Math.max(1, words.length - 4);
      const snippet = words.slice(start, start + 4).join(' ');
      return this.cleanTitleCase(snippet);
    }

    // Fallback contextualizado ao enredo
    return `${enredoTitle} - Parte ${sectorNum}`;
  }

  /**
   * Extrai unidades conceituais, personagens, ações e metáforas da sinopse
   */
  private static extractNarrativeUnitsFromSynopsis(synopsis: string, title: string): string[] {
    const rawSentences = synopsis
      .split(/[.;\n]/)
      .map(s => s.trim())
      .filter(s => s.length > 10);

    const units: string[] = [];
    for (const sent of rawSentences) {
      const cleaned = sent.replace(/^[-–—•\d\s]+/, '').trim();
      if (cleaned.length > 10 && !units.includes(cleaned)) {
        units.push(cleaned);
      }
    }

    // Se a sinopse for curta, gera desdobramentos temáticos do título
    if (units.length < 15) {
      units.push(`O mistério ancestral que envolve ${title}`);
      units.push(`A força dos cantos e rituais originários`);
      units.push(`A travessia das memórias através dos tempos`);
      units.push(`O trabalho e a perseverança do povo da terra`);
      units.push(`A celebração das festas e dos tambores sagrados`);
      units.push(`O manto sagrado que acolhe a comunidade`);
      units.push(`A consagração do legado na passarela da glória`);
    }

    return units;
  }

  /**
   * Deriva um título poético elegante para ala ou carro a partir de uma unidade narrativa
   */
  private static derivePoeticTitle(raw: string, fallback: string): string {
    const clean = raw.replace(/[^\w\sÀ-ÿ"“”',-]/g, '').trim();

    // Se tem aspas, extrai
    const qMatch = clean.match(/["“]([^"”]+)["”]/);
    if (qMatch) return this.cleanTitleCase(qMatch[1]);

    // Extrai até 5-6 palavras
    const words = clean.split(/\s+/);
    if (words.length <= 6 && words.length >= 2) {
      return this.cleanTitleCase(clean);
    }
    if (words.length > 6) {
      return this.cleanTitleCase(words.slice(0, 5).join(' '));
    }

    return fallback;
  }

  private static cleanTitleCase(str: string): string {
    return str
      .toLowerCase()
      .split(' ')
      .map((word, i) => {
        if (['de', 'da', 'do', 'dos', 'das', 'e', 'em', 'no', 'na', 'nos', 'nas', 'a', 'o', 'por', 'com', 'que'].includes(word) && i > 0) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ')
      .trim();
  }

  private static getCategoryLabelForType(type: ParadeElementType, order: number): string {
    switch (type) {
      case 'comissao_frente': return 'Comissão de Frente';
      case 'casal_mspb': return 'Casal de MS e PB';
      case 'abre_alas': return 'Carro Abre-Alas';
      case 'alegoria': return 'Carro Alegórico';
      case 'tripe': return 'Tripé Cenográfico';
      case 'baianas': return 'Ala das Baianas';
      case 'bateria': return 'Ala da Bateria';
      case 'passistas': return 'Ala de Passistas';
      case 'velha_guarda': return 'Velha Guarda';
      case 'apoteose': return 'Última Alegoria';
      case 'musa_destaque_chao': return 'Destaque de Chão';
      default: return `Ala ${String(order).padStart(2, '0')}`;
    }
  }

  /**
   * Constrói a Ficha Técnica da Bateria (com 4 bossas e quantitativo por naipe)
   */
  private static generateFichaBateria(school: School, enredo: Enredo, ritmistasCount: number, setores: ParadeSector[]): FichaBateria {
    const mestreGeral = school.staff?.mestreBateria?.name || 'Mestre Comandante dos Tambores';

    return {
      mestreGeral,
      diretores: 'Diretoria de Tamborins, Caixas, Repiques, Agogôs, Cuícas e Marcações',
      totalRitmistas: ritmistasCount,
      instrumentos: {
        '1ª Marcação (Surdos de Resposta)': Math.round(ritmistasCount * 0.05),
        '2ª Marcação (Surdos de Centro)': Math.round(ritmistasCount * 0.05),
        '3ª Marcação (Surdos de Corte/Cortejo)': Math.round(ritmistasCount * 0.06),
        'Caixas de Guerra & Taróis': Math.round(ritmistasCount * 0.40),
        'Repiniques de Bossa': Math.round(ritmistasCount * 0.15),
        'Tamborins (Desenho Rítmico)': Math.round(ritmistasCount * 0.14),
        'Cuícas & Chocalhos': Math.round(ritmistasCount * 0.08),
        'Agogôs de Duas e Quatro Bocas': Math.round(ritmistasCount * 0.07)
      },
      particularidades: `A bateria de ${cleanSchoolName(school)} alinha sua pulsação ao enredo "${enredo.title}". Integrando a cadência tradicional às exigências dramáticas da sinopse, executa quatro arranjos específicos que destacam momentos de clímax, mistério e celebração popular.`,
      bossas: [
        {
          numero: 1,
          nome: 'Bossa de Abertura: O Chamado Ancestral',
          trechoSamba: `Verso inicial do samba-enredo: o toque que abre os caminhos na avenida`,
          sinal: 'Punhos cruzados no peito e gesto apontando para a frente da pista',
          defesa: 'Convenção rítmica inicial em uníssono dos repiques, seguida de ataque sincronizado dos surdos de 3ª e rufada envolvente das caixas, preparando a entrada triunfal do canto da comunidade.'
        },
        {
          numero: 2,
          nome: 'Bossa do Refrão Central: A Força da Luta',
          trechoSamba: `Refrão do meio: a afirmação de coragem e resistência coletiva`,
          sinal: 'Mão erguida em punho cerrado balançando no compasso do surdo-mor',
          defesa: 'Apagão rítmico dos surdos de 1ª e 2ª, sustentado pela levada contínua dos tamborins e caixas dobradas, culminando em crescente explosiva dos graves até a retomada gloriosa.'
        },
        {
          numero: 3,
          nome: 'Bossa da Segunda Estrofe: O Encanto das Águas e das Matas',
          trechoSamba: `Segunda estrofe: o desdobramento das lendas, crenças e trabalhos do enredo`,
          sinal: 'Toque de baqueta no ar e sinal circular com o dedo indicador',
          defesa: 'Diálogo percussivo entre os agogôs e os tamborins, com os surdos de 3ª fazendo contratempos sincopados para destacar a poesia lírica da canção.'
        },
        {
          numero: 4,
          nome: 'Bossa da Apoteose: A Consagração do Povo',
          trechoSamba: `Refrão principal: o brado de vitória que levanta as arquibancadas`,
          sinal: 'Mão no coração e gesto de explosão com ambas as mãos abertas',
          defesa: 'Parada cirúrgica de um compasso inteiro para que apenas a voz da escola ecoe na avenida, seguida de estrondosa resposta de todos os naipes no tempo um, garantindo nota máxima em Ritmo.'
        }
      ]
    };
  }

  /**
   * Constrói a Ficha Técnica do Samba-Enredo (Letra, Defesa da Letra verso a verso, Defesa da Melodia)
   */
  private static generateFichaSambaEnredo(school: School, enredo: Enredo, setores: ParadeSector[]): FichaSambaEnredo {
    const interprete = school.staff?.interprete?.name || 'Intérprete Oficial da Escola';
    const s1Name = setores[0]?.title.replace(/^Setor\s*\d+\s*[:\-–]\s*/i, '').replace(/["“]/g, '') || enredo.title;
    const s2Name = setores[1]?.title.replace(/^Setor\s*\d+\s*[:\-–]\s*/i, '').replace(/["“]/g, '') || 'as lendas da terra';
    const s3Name = setores[2]?.title.replace(/^Setor\s*\d+\s*[:\-–]\s*/i, '').replace(/["“]/g, '') || 'a força do trabalho';
    const sLast = setores[setores.length - 1]?.title.replace(/^Setor\s*\d+\s*[:\-–]\s*/i, '').replace(/["“]/g, '') || 'a apoteose';

    const letra = `EU VI BRILHAR O MANTO DA MEMÓRIA
NA VOZ DO POVO A NOSSA IDENTIDADE
DESPERTA A FORÇA DESSA HISTÓRIA
NO CHÃO SAGRADO DA COMUNIDADE

${s1Name.toUpperCase()}, ONDE A VIDA SE FAZ
O CANTO FORTE DOS NOSSOS ANCESTRAIS
${s2Name.toUpperCase()}, RESISTÊNCIA E VALOR
QUEM TEM RAIZ NÃO CURVA AO DESAMOR!

Ô GIRA GIRA, FAZ O TEMPO ANDAR
TEM AXÉ NO TOQUE DO TAMBOR
${cleanSchoolName(school).toUpperCase()} CHEGOU PRA DECLARAR
A GLÓRIA DO SEU MANTO BENFEEITOR!

${s3Name.toUpperCase()}, A FORÇA DA CRIAÇÃO
MÃOS QUE MOLDAM A NOSSA TRADIÇÃO
DA SEMENTE PLANTADA NO PASSADO
O FUTURO EM FLOR É CELEBRADO!

É POESIA, É CORAÇÃO E FÉ
BATE FORTE O MEU TAMBOR NO GONGÁ
${sLast.toUpperCase()} VEM ILUMINAR
A NOSSA ESCOLA NA AVENIDA A DESFILAR!

CANTA MEU POVO, NÃO TEME A RAZÃO
${cleanSchoolName(school).toUpperCase()} É MINHA PAIXÃO!
VAI CLAREAR, O DIA VAI RAIAR
COM A NOSSA BANDEIRA A TRIUNFAR!`;

    return {
      compositores: ['Parceria de Compositores da Escola', 'Poetas da Ala do Terreiro'],
      interprete,
      letra,
      defesaLetra: [
        {
          versoOuEstrofe: 'EU VI BRILHAR O MANTO DA MEMÓRIA / NA VOZ DO POVO A NOSSA IDENTIDADE',
          explicacao: `Abertura solene do hino: estabelece a tese de que o enredo não é apenas uma narrativa factual, mas um manifesto de identidade cultural pertencente à comunidade.`
        },
        {
          versoOuEstrofe: `${s1Name.toUpperCase()} / O CANTO FORTE DOS NOSSOS ANCESTRAIS`,
          explicacao: `Conecta diretamente a primeira estrofe ao Setor 1 do desfile, situando o berço primordial das tradições evocadas pela sinopse.`
        },
        {
          versoOuEstrofe: `${s2Name.toUpperCase()} / QUEM TEM RAIZ NÃO CURVA AO DESAMOR!`,
          explicacao: `Defesa do Setor 2: a afirmação de resiliência e resistência popular diante das adversidades históricas retratadas na narrativa.`
        },
        {
          versoOuEstrofe: `Ô GIRA GIRA, FAZ O TEMPO ANDAR / TEM AXÉ NO TOQUE DO TAMBOR`,
          explicacao: `Refrão central: convoca a cosmovisão circular do tempo, onde passado, presente e futuro dialogam no pulsar contínuo da bateria.`
        },
        {
          versoOuEstrofe: `${sLast.toUpperCase()} VEM ILUMINAR / A NOSSA ESCOLA NA AVENIDA A DESFILAR!`,
          explicacao: `Clímax da apoteose: celebração final onde o pavilhão da escola absorve e eterniza o enredo em apoteose vitoriosa.`
        }
      ],
      defesaMelodia: `A obra foi estruturada no tom de Ré menor (Dm) na primeira parte, imprimindo solenidade, respeito ao passado e densidade dramática à narrativa. Na transição para o refrão do meio, modula com maestria para o relativo maior (Fá Maior), conferindo brilho, abertura melódica e entusiasmo ao canto dos componentes. A cadência II-V-I nos versos finais prepara a explosão rítmica no refrão principal, garantindo perfeita sustentação do canto e facilidade de evolução na pista.`
    };
  }

  /**
   * Constrói a Ficha Técnica da Comissão de Frente em 4 Atos Coreográficos
   */
  private static generateFichaComissaoFrente(school: School, enredo: Enredo, comissaoCount: number, s1: ParadeSector): FichaComissaoFrente {
    const coreografo = school.staff?.coreografo?.name || 'Direção Cênica e Coreografia';

    return {
      coreografo,
      nomeApresentacao: `O Despertar do Enredo: ${enredo.title}`,
      elementoCenografico: 'Tripé Cênico de Efeitos Teatrais',
      totalComponentes: comissaoCount,
      sinopseAcao: `A comissão de frente introduz a saga do desfile através de uma coreografia teatral em 4 atos, combinando linguagem contemporânea, dança afro-brasileira e mágicas cênicas diante das cabines julgadoras.`,
      atos: [
        {
          ato: 'Ato 1 - O Chamado e o Portal do Tempo',
          descricao: `Os bailarinos surgem sob névoa cenográfica, vestindo mantos que evocam o silêncio da memória. Ao primeiro sinal do clarim, rompem a barreira do invisível anunciando o início da jornada.`
        },
        {
          ato: 'Ato 2 - O Conflito e a Transformação',
          descricao: `Em meio à evolução dramática, os intérpretes interagem com o elemento cênico, revelando adereços ocultos e trocas de figurino instantâneas que traduzem a superação das adversidades narradas no Setor 1.`
        },
        {
          ato: 'Ato 3 - O Ritual do Sagrado',
          descricao: `A coreografia atinge seu ápice de plasticidade: os bailarinos tocam o solo sagrado da avenida com os pés descalços, executando gestos cerimoniais de reverência aos ancestrais do tema.`
        },
        {
          ato: 'Ato 4 - A Apoteose Perante os Julgadores',
          descricao: `Com sincronia absoluta, o grupo realiza a saudação final às cabines de notas e ao público, abrindo passagem com júbilo para o 1º Casal e o Carro Abre-Alas.`
        }
      ]
    };
  }

  /**
   * Constrói a Ficha Técnica dos Casais de MS & PB
   */
  private static generateFichaCasais(school: School, enredo: Enredo, setores: ParadeSector[]): FichaCasalMSPB[] {
    const casal1Name = school.staff?.mestreSalaPortaBandeira?.name || 'Casal de Ouro';
    const parts = casal1Name.includes('&') ? casal1Name.split('&') : casal1Name.includes('e') ? casal1Name.split(' e ') : [casal1Name, 'Dama Soberana'];

    return [
      {
        numeroCasal: 1,
        mestreSala: parts[0]?.trim() || 'Mestre-Sala Oficial',
        portaBandeira: parts[1]?.trim() || 'Porta-Bandeira Oficial',
        fantasiaCasal: `A Nobreza Sagrada de ${setores[0]?.title.replace(/^Setor\s*\d+\s*[:\-–]\s*/i, '').replace(/["“]/g, '') || enredo.title}`,
        fantasiaGuardioes: 'Guardiões do Pavilhão Ancestral',
        defesaDança: `O 1º Casal desfila no Setor 1 conduzindo o pavilhão oficial de ${cleanSchoolName(school)}. Sua coreografia une a técnica clássica do minueto de corte (giros, cruzamentos, mesuras e pegadas de mão) à expressividade do enredo. Ao avistar as cabines, executam a reverência protocolar ao chão sagrado e desfraldam o manto da escola com altivez.`
      },
      {
        numeroCasal: 2,
        mestreSala: '2º Mestre-Sala',
        portaBandeira: '2ª Porta-Bandeira',
        fantasiaCasal: `O Esplendor Cultural de ${setores[1]?.title.replace(/^Setor\s*\d+\s*[:\-–]\s*/i, '').replace(/["“]/g, '') || 'Tradições'}`,
        fantasiaGuardioes: 'Sentinelas do Ritmo',
        defesaDança: `O 2º Casal atua no miolo do desfile, garantindo a continuidade do quesito Mestre-Sala e Porta-Bandeira com evolução leve, giros sincronizados e perfeita sustentação do pavilhão representativo.`
      }
    ];
  }

  /**
   * Constrói o texto formal e denso de Justificativa do Enredo para os jurados da LIESA
   */
  private static generateJustificativaEnredo(school: School, enredo: Enredo, setores: ParadeSector[]): string {
    return `O Grêmio Recreativo Escola de Samba ${cleanSchoolName(school)} apresenta, para o Carnaval Oficial, o enredo "${enredo.title}". 

Antes de detalhar o desdobramento cenográfico e figurinista desta obra, pedimos gentilmente ao egrégio corpo de julgadores que analise a nossa proposta a partir de uma leitura técnica, sensível e desprovida de pré-concepções. O Carnaval é, antes de tudo, linguagem artística e popular, construída com corpo, ritmo, narrativa e imagem. Quando a escola pisa a passarela, carrega símbolos que traduzem as lutas, a memória e a imaginação do povo brasileiro.

Com "${enredo.title}", a agremiação recusa fórmulas engessadas e adota uma narrativa dramatúrgica rigorosamente estruturada a partir da sinopse oficial. Dividido em ${setores.length} setores encadeados com organicidade poética, o desfile parte do berço de sua temática, mergulha nas transformações e conflitos que forjaram sua essência, e culmina em uma apoteose de afirmação identitária.

Cada ala, cada alegoria e cada personagem deste Livro Abre-Alas foi concebido como uma transposição visual direta de passagens da sinopse. A riqueza dos tecidos, a escolha cromática e os acabamentos de barracão dialogam diretamente com a pesquisa histórica e cultural empreendida pela nossa equipe. Defender este enredo na Marquês de Sapucaí é reafirmar o Carnaval como palco vivo de memória, beleza e transformação social.`;
  }

  /**
   * Constrói lista bibliográfica e documental para o Livro Abre-Alas
   */
  private static generatePesquisaBibliografica(enredo: Enredo): string[] {
    return [
      `Pesquisa de Campo e Coleta de Relatos Orais junto a mestres, griôs e comunidades tradicionais vinculadas ao tema "${enredo.title}".`,
      `Dossiês do Instituto do Patrimônio Histórico e Artístico Nacional (IPHAN) e registros iconográficos da Biblioteca Nacional.`,
      `Artigos acadêmicos, teses e dissertações contemporâneas sobre as manifestações culturais e sociológicas abordadas na sinopse.`,
      `Acervos memorialistas, imprensa periódica e registros fotográficos do cancioneiro e da tradição popular brasileira.`
    ];
  }
}
