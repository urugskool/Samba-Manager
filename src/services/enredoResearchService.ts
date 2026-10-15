import { School, DivisionId, Enredo, EnredoThemeType } from '../types/carnaval';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import { ParadeScript, ParadeScriptElement, ParadeSector } from './paradeScriptService';
import { DIVISION_REGULATIONS, generateDefaultParadeComposition } from '../config/obrigatoriedadesConfig';

export interface EnredoResearchTopic {
  themeInput: string;
  notesInput?: string;
  themeType?: EnredoThemeType;
}

export interface EnredoApproachOption {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  suggestedTitle: string;
  subTitle: string;
  themeType: EnredoThemeType;
  narrativeAxis: string;
  synopsis: string;
  aestheticStyle: string;
  dominatColors: string[];
  qualityBoost: number;
  cost: number;
  setorizacaoPreview: {
    sectorNumber: number;
    title: string;
    synopsis: string;
  }[];
  elementsPreview: {
    comissaoDeFrente: { name: string; concept: string; costume: string };
    casal1: { name: string; costume: string; representation: string };
    abreAlas: { name: string; concept: string; materials: string };
    baianas: { name: string; costume: string; symbolism: string };
    bateria: { name: string; costume: string; bossas: string };
    allegories: { number: number; name: string; concept: string }[];
    alasHighlights: { name: string; sector: number; concept: string }[];
  };
}

export interface EnredoResearchDossier {
  theme: string;
  detectedGenre: EnredoThemeType;
  historicalContext: string;
  centralFigures: string[];
  iconography: string[];
  dramaticTension: string;
  recommendedPalette: {
    name: string;
    colors: string[];
    concept: string;
  };
  researchHighlights: string[];
  approaches: EnredoApproachOption[];
}

export class EnredoResearchService {
  /**
   * Realiza a pesquisa temática integrada sobre o tema e resumo fornecidos pelo jogador.
   * Se a API do servidor estiver disponível, pode se conectar a ela; caso contrário,
   * executa o motor carnavalesco enciclopédico de alta precisão.
   */
  public static async conductResearch(
    school: School,
    theme: string,
    notes?: string,
    customGenre?: EnredoThemeType
  ): Promise<EnredoResearchDossier> {
    const cleanTheme = theme.trim();
    const cleanNotes = (notes || '').trim();

    // Tenta primeiro chamar o endpoint do servidor com IA / busca
    try {
      const response = await fetch('/api/enredo/pesquisar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schoolName: school.name,
          division: school.division,
          theme: cleanTheme,
          notes: cleanNotes,
          genre: customGenre
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.approaches && data.approaches.length > 0) {
          return data as EnredoResearchDossier;
        }
      }
    } catch {
      // Falha silenciosa no fetch -> usa o motor carnavalesco offline-first
    }

    // Executa o motor enciclopédico de pesquisa carnavalesca
    return this.generateProceduralDossier(school, cleanTheme, cleanNotes, customGenre);
  }

  /**
   * Motor Enciclopédico Carnavalesco Inteligente
   * Mapeia raízes semânticas e gera 4 abordagens profundas e contrastantes.
   */
  public static generateProceduralDossier(
    school: School,
    theme: string,
    notes: string,
    forcedGenre?: EnredoThemeType
  ): EnredoResearchDossier {
    const lower = `${theme} ${notes}`.toLowerCase();
    const genre = forcedGenre || this.detectThemeGenre(lower);
    const keywords = this.extractKeywords(theme, notes);
    const schoolClean = cleanSchoolName(school);

    // Identificação de núcleos temáticos especiais (ex: Cangaço, Afro, Amazônia, Mitologia, etc.)
    const semanticProfile = this.analyzeThematicSemantics(theme, notes, lower);

    const approaches: EnredoApproachOption[] = [
      this.buildApproach1_Mistica(theme, notes, semanticProfile, genre, schoolClean),
      this.buildApproach2_Historica(theme, notes, semanticProfile, genre, schoolClean),
      this.buildApproach3_SocialCritica(theme, notes, semanticProfile, genre, schoolClean),
      this.buildApproach4_PoeticaLirica(theme, notes, semanticProfile, genre, schoolClean)
    ];

    return {
      theme,
      detectedGenre: genre,
      historicalContext: semanticProfile.historicalContext,
      centralFigures: semanticProfile.figures,
      iconography: semanticProfile.iconography,
      dramaticTension: semanticProfile.dramaticTension,
      recommendedPalette: semanticProfile.palette,
      researchHighlights: semanticProfile.highlights,
      approaches
    };
  }

  /**
   * Gera o Roteiro Oficial do Desfile completo (Livro Abre-Alas)
   * a partir da abordagem carnavalesca escolhida pelo jogador.
   */
  public static buildParadeScript(
    school: School,
    approach: EnredoApproachOption,
    division?: DivisionId
  ): ParadeScript {
    const div = division || school.division;
    const reg = DIVISION_REGULATIONS[div];
    const comp = school.paradeComposition || generateDefaultParadeComposition(school);
    const divisionLabel = reg.divisionLabel;

    const alegoriasCount = comp.alegorias || (div === 'especial' ? 5 : div === 'ouro' ? 3 : div === 'prata' ? 3 : div === 'bronze' ? 2 : 1);
    const tripesCount = comp.tripes || (div === 'especial' ? 2 : div === 'ouro' ? 1 : 0);
    const ritmistasCount = comp.ritmistas || (div === 'especial' ? 220 : div === 'ouro' ? 160 : div === 'prata' ? 130 : div === 'bronze' ? 95 : 80);
    const baianasCount = comp.baianas || (div === 'especial' ? 70 : div === 'ouro' ? 50 : div === 'prata' ? 40 : div === 'bronze' ? 30 : 15);
    const comissaoCount = comp.comissaoDeFrente || (div === 'especial' ? 14 : div === 'ouro' ? 14 : div === 'prata' ? 11 : 10);

    const totalAlas = div === 'especial' ? 26 : div === 'ouro' ? 18 : div === 'prata' ? 14 : div === 'bronze' ? 11 : 8;
    const componentesTotal = comp.componentes || (div === 'especial' ? 2800 : div === 'ouro' ? 1100 : div === 'prata' ? 750 : div === 'bronze' ? 600 : 400);
    const componentesPorAla = Math.max(25, Math.round((componentesTotal - ritmistasCount - baianasCount - comissaoCount - 150) / totalAlas));

    // Constrói setores
    const numSectors = div === 'especial' ? 5 : 4;
    const setores: ParadeSector[] = [];
    for (let i = 0; i < numSectors; i++) {
      const preview = approach.setorizacaoPreview[i] || {
        sectorNumber: i + 1,
        title: `Setor ${i + 1}: ${this.getGenericSectorTitle(i, approach.themeType)}`,
        synopsis: `Desenvolvimento temático da narrativa no setor ${i + 1}, exaltando as nuances poéticas do enredo "${approach.suggestedTitle}".`
      };
      setores.push({
        sectorNumber: i + 1,
        title: preview.title,
        themeSynopsis: preview.synopsis
      });
    }

    const elements: ParadeScriptElement[] = [];
    let orderSeq = 1;

    // 1. Comissão de Frente
    elements.push({
      id: `cdf_${school.id}_custom`,
      orderNumber: orderSeq++,
      type: 'comissao_frente',
      name: approach.elementsPreview.comissaoDeFrente.name,
      categoryLabel: 'Comissão de Frente',
      sectorNumber: 1,
      sectorTitle: setores[0].title,
      description: `${approach.elementsPreview.comissaoDeFrente.concept} O grupo composto por ${comissaoCount} bailarinos atua como arauto da narrativa, apresentando truques cênicos e impacto visual na abertura do cortejo.`,
      costumeDetails: approach.elementsPreview.comissaoDeFrente.costume,
      highlightPeople: `Coreógrafo(a): ${school.staff?.coreografo?.name || 'Direção Cênica'}`,
      componentsCount: comissaoCount,
      isAllegoryOrTripod: false
    });

    // 2. 1º Casal de Mestre-Sala e Porta-Bandeira
    elements.push({
      id: `casal_1_${school.id}_custom`,
      orderNumber: orderSeq++,
      type: 'casal_mspb',
      name: approach.elementsPreview.casal1.name,
      categoryLabel: '1º Casal de MS & PB',
      sectorNumber: 1,
      sectorTitle: setores[0].title,
      description: `${approach.elementsPreview.casal1.representation} Conduzem o pavilhão sagrado de ${cleanSchoolName(school)} com bailado nobre e giros perfeitos diante das cabines de jurados.`,
      costumeDetails: approach.elementsPreview.casal1.costume,
      highlightPeople: `1º Casal Oficial: ${school.staff?.mestreSalaPortaBandeira?.name || 'Mestre-Sala e Porta-Bandeira'}`,
      componentsCount: 2,
      isAllegoryOrTripod: false
    });

    // 3. Abre-Alas (Alegoria 1)
    elements.push({
      id: `alegoria_1_${school.id}_custom`,
      orderNumber: orderSeq++,
      type: 'abre_alas',
      name: approach.elementsPreview.abreAlas.name,
      categoryLabel: 'Abre-Alas (Alegoria 1)',
      sectorNumber: 1,
      sectorTitle: setores[0].title,
      description: `${approach.elementsPreview.abreAlas.concept} Uma imponente estrutura alegórica com esculturas articuladas, iluminação cênica integrada e acabamento barroco carnavalesco.`,
      costumeDetails: approach.elementsPreview.abreAlas.materials,
      highlightPeople: `Destaque Principal: A Alma Encantada do Enredo`,
      componentsCount: Math.round(componentesTotal * 0.03),
      isAllegoryOrTripod: true
    });

    // 4. Ala das Baianas (Setor 2)
    elements.push({
      id: `baianas_${school.id}_custom`,
      orderNumber: orderSeq++,
      type: 'baianas',
      name: approach.elementsPreview.baianas.name,
      categoryLabel: 'Ala das Baianas',
      sectorNumber: 2,
      sectorTitle: setores[1] ? setores[1].title : setores[0].title,
      description: `${approach.elementsPreview.baianas.symbolism} Compostas por ${baianasCount} matriarcas, giram com elegância monumental trazendo o manto tradicional do samba e a bênção dos ancestrais.`,
      costumeDetails: approach.elementsPreview.baianas.costume,
      highlightPeople: 'Matriarcas da Velha Guarda & Conselho de Baianas',
      componentsCount: baianasCount,
      isAllegoryOrTripod: false
    });

    // 5. Bateria (Setor 3)
    const bateriaSectorIdx = Math.min(2, setores.length - 1);
    elements.push({
      id: `bateria_${school.id}_custom`,
      orderNumber: orderSeq++,
      type: 'bateria',
      name: approach.elementsPreview.bateria.name,
      categoryLabel: 'Bateria',
      sectorNumber: bateriaSectorIdx + 1,
      sectorTitle: setores[bateriaSectorIdx].title,
      description: `${approach.elementsPreview.bateria.bossas} Sob o comando enérgico do mestre de bateria, os ${ritmistasCount} ritmistas ditam o andamento do samba-enredo, sustentando o canto de toda a escola.`,
      costumeDetails: approach.elementsPreview.bateria.costume,
      highlightPeople: `Comandante dos Tambores: ${school.staff?.mestreBateria?.name || 'Mestre de Bateria'}`,
      componentsCount: ritmistasCount,
      isAllegoryOrTripod: false
    });

    // 6. Demais Alegorias e Tripés distribuídos
    let alegoriaIndex = 2;
    for (let sIdx = 1; sIdx < setores.length; sIdx++) {
      if (alegoriaIndex <= alegoriasCount) {
        const customAl = approach.elementsPreview.allegories.find(a => a.number === alegoriaIndex) || {
          number: alegoriaIndex,
          name: `Alegoria ${alegoriaIndex}: ${setores[sIdx].title}`,
          concept: `Representação plástica monumental das teses do setor ${sIdx + 1}.`
        };

        elements.push({
          id: `alegoria_${alegoriaIndex}_${school.id}_custom`,
          orderNumber: orderSeq++,
          type: 'alegoria',
          name: customAl.name,
          categoryLabel: `Alegoria ${alegoriaIndex}`,
          sectorNumber: sIdx + 1,
          sectorTitle: setores[sIdx].title,
          description: customAl.concept,
          costumeDetails: `Esculturas em EPS resinado, ferragens estruturais e tecidos nobres nas cores ${approach.dominatColors.join(', ')}.`,
          highlightPeople: `Destaques Centrais e Composição de Carro`,
          componentsCount: Math.round(componentesTotal * 0.025),
          isAllegoryOrTripod: true
        });
        alegoriaIndex++;
      }
    }

    // 7. Tripés cenográficos
    for (let t = 1; t <= tripesCount; t++) {
      const targetSector = Math.min(t + 1, setores.length);
      elements.push({
        id: `tripe_${t}_${school.id}_custom`,
        orderNumber: orderSeq++,
        type: 'tripe',
        name: `Tripé Cênico ${t}: O Emblema da Memória`,
        categoryLabel: `Tripé Cênico ${t}`,
        sectorNumber: targetSector,
        sectorTitle: setores[targetSector - 1].title,
        description: `Elemento cênico móvel que apoia a evolução teatral das alas do setor ${targetSector}.`,
        costumeDetails: `Estrutura de ferro leve com adereços cenográficos temáticos.`,
        componentsCount: 3,
        isAllegoryOrTripod: true
      });
    }

    // 8. Alas Temáticas distribuídas
    const alasHighlights = approach.elementsPreview.alasHighlights;
    let alaSeq = 1;
    for (let sIdx = 0; sIdx < setores.length; sIdx++) {
      const sectorNumber = sIdx + 1;
      const alasInSector = Math.round(totalAlas / setores.length);

      for (let a = 0; a < alasInSector && alaSeq <= totalAlas; a++) {
        const highlight = alasHighlights.find(h => h.sector === sectorNumber && !elements.some(e => e.name === h.name));
        const alaName = highlight
          ? highlight.name
          : `Ala ${alaSeq}: Guardiões de ${setores[sIdx].title}`;
        const alaDesc = highlight
          ? highlight.concept
          : `Ala caracterizada representando os elementos conceituais do setor ${sectorNumber}.`;

        elements.push({
          id: `ala_${alaSeq}_${school.id}_custom`,
          orderNumber: orderSeq++,
          type: 'ala',
          name: alaName,
          categoryLabel: `Ala ${alaSeq}`,
          sectorNumber,
          sectorTitle: setores[sIdx].title,
          description: alaDesc,
          costumeDetails: `Fantasia detalhada em tons de ${approach.dominatColors[a % approach.dominatColors.length] || 'dourado'}, com esplendor e adereço de mão.`,
          componentsCount: componentesPorAla,
          isAllegoryOrTripod: false
        });
        alaSeq++;
      }
    }

    // Ordena elementos por setor e sequência lógica de desfile
    elements.sort((a, b) => a.orderNumber - b.orderNumber);

    return {
      schoolId: school.id,
      schoolName: school.name,
      shortName: school.shortName,
      division: div,
      divisionLabel,
      enredoTitle: approach.suggestedTitle,
      enredoTheme: approach.themeType,
      synopsis: approach.synopsis,
      carnavalesco: school.staff?.carnavalesco?.name || 'Comissão de Carnaval',
      obrigatoriedades: {
        totalComponentes: componentesTotal,
        totalAlas,
        totalAlegorias: alegoriasCount,
        totalTripes: tripesCount,
        ritmistasCount,
        baianasCount,
        comissaoDeFrenteCount: comissaoCount,
        componentesPorAla,
        casaisCount: div === 'especial' ? 4 : 3
      },
      setores,
      elements
    };
  }

  /**
   * Converte uma abordagem aprovada em um objeto de Enredo completo para a agremiação.
   */
  public static createEnredoFromApproach(
    school: School,
    approach: EnredoApproachOption
  ): Enredo {
    return {
      id: `enr_custom_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      title: approach.suggestedTitle,
      themeType: approach.themeType,
      synopsis: approach.synopsis,
      qualityBoost: approach.qualityBoost,
      cost: approach.cost,
      proponent: `Diretoria & Comunidade de ${cleanSchoolName(school)}`,
      carnavalescoAffinity: 96,
      historicalAffinity: 92,
      commercialTradeoff: 'Enredo autoral inédito criado sob medida, garantindo máxima originalidade e identidade comunitária na avenida.'
    };
  }

  // ==========================================================================
  // HELPERS INTERNOS DE PESQUISA & MODELAGEM CARNAVALESCA
  // ==========================================================================

  private static detectThemeGenre(raw: string): EnredoThemeType {
    if (/orix[aá]|afro|quilombo|zumbi|dandara|terreiro|candombl[eé]|oxum|ogum|iemanj[aá]|batuque/i.test(raw)) {
      return 'Afro-Brasileiro';
    }
    if (/hist[oó]ri|antigo|século|império|revolu|guerra|barroco|brasil colônia|monarquia/i.test(raw)) {
      return 'Histórico';
    }
    if (/lampi[aã]o|sert[aã]o|nordeste|cangaço|amaz[oô]nia|pantanal|caatinga|caipira|cerrado|pampa/i.test(raw)) {
      return 'Regional';
    }
    if (/mitolog|deus|grécia|n[oó]rdic|thor|odin|egito|fara[oó]|astronom|lenda|f[aá]bula/i.test(raw)) {
      return 'Mitológico';
    }
    if (/protesto|povo|fome|favela|luta|resist|oper[aá]ri|cr[ií]tica|desigual/i.test(raw)) {
      return 'Crítica Social';
    }
    if (/vida de|homenagem|cantor|poeta|escritor|chico|clara nunes|machado|drummond/i.test(raw)) {
      return 'Homenagem';
    }
    if (/circo|magia|brinquedo|l[uú]dic|sonho|inf[aâ]ncia|faz de conta/i.test(raw)) {
      return 'Lúdico';
    }
    if (/ci[eê]ncia|intelig[eê]ncia artificial|futuro|cosmos|computador|rob[oô]|rob[oó]tica/i.test(raw)) {
      return 'Ciência e Tecnologia';
    }
    return 'Cultural';
  }

  private static extractKeywords(theme: string, notes: string): string[] {
    const text = `${theme} ${notes}`.toLowerCase().replace(/[^a-zà-ú0-9\s]/gi, ' ');
    const stopWords = new Set(['o', 'a', 'os', 'as', 'um', 'uma', 'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas', 'por', 'para', 'com', 'sem', 'sob', 'sobre', 'e', 'ou', 'mas', 'que', 'se', 'seu', 'sua', 'como', 'mais', 'foi', 'ao', 'aos', 'pelo', 'pela']);
    const tokens = text.split(/\s+/).filter(t => t.length > 2 && !stopWords.has(t));
    return Array.from(new Set(tokens)).slice(0, 15);
  }

  private static analyzeThematicSemantics(theme: string, notes: string, lower: string) {
    // Dicionário semântico e enciclopédico carnavalesco
    if (lower.includes('lampi') || lower.includes('canga') || lower.includes('maria bonita') || lower.includes('sertao') || lower.includes('sertão')) {
      return {
        historicalContext: 'O Cangaço foi um movimento social e militar autônomo ocorrido no sertão do Nordeste brasileiro entre o fim do século XIX e 1938. Sob a liderança lendária de Virgulino Ferreira da Silva (Lampião) e Maria Bonita, o bando impôs respeito, terror e fascínio mítico em meio à aridez e ao coronelismo opressor.',
        figures: ['Virgulino Ferreira (Lampião, o Rei do Cangaço)', 'Maria Bonita (A Rainha Sertaneja)', 'Padre Cícero Romão Batista', 'Corisco e Dadá', 'Os Soldados Volantes'],
        iconography: ['Chapéus de couro com estrelas de Salomão', 'Cartucheiras cruzadas e punhais de prata', 'Mandacarus e cactos da Caatinga', 'Xilogravuras de folhetos de cordel', 'Santos de barro e medalhas de proteção'],
        dramaticTension: 'O choque eterno entre a justiça dos homens da lei e a vingança rústica dos desvalidos do sertão, culminando na lenda imortalizada pelo povo.',
        palette: {
          name: 'Sertão Dourado & Couro Envelhecido',
          colors: ['#D97706', '#92400E', '#78350F', '#B45309', '#FDE68A'],
          concept: 'Tons de terracota, poeira solar, dourado cru, couro entalhado e o verde resistente do mandacaru.'
        },
        highlights: [
          'A estética rica dos cangaceiros com anéis, lenços de seda e perfumes franceses',
          'A devoção religiosa fervorosa misturada aos pactos místicos do sertão profundo',
          'A presença altiva de Maria Bonita como marco feminino no banditismo social',
          'A apoteose do cordel popular imortalizando o julgamento de Lampião no além'
        ]
      };
    }

    if (lower.includes('orixa') || lower.includes('orixá') || lower.includes('ogum') || lower.includes('oxum') || lower.includes('iemanj') || lower.includes('quilombo') || lower.includes('afro')) {
      return {
        historicalContext: 'As tradições afro-brasileiras e a cosmovisão dos Orixás fundamentam a essência e a matriz sagrada do Carnaval. Do Reino de Iorubá aos terreiros ancestrais da Bahia e do Rio Antigo, as divindades representam as forças vivas da natureza, a resistência negra e a vitória sobre a escravidão.',
        figures: ['Ogum (Senhor do Ferro e dos Caminhos)', 'Iemanjá (Mãe das Águas Claras)', 'Oxum (Deusa da Fertilidade e do Ouro)', 'Zumbi e Dandara dos Palmares', 'As Mães de Santo e Alabês'],
        iconography: ['Espadas forjadas em ferro', 'Espelhos dourados e abebés', 'Conchas marinhas e búzios sagrados', 'Tambores atabaques e agogôs', 'Fios de contas reluzentes'],
        dramaticTension: 'A travessia heroica da Kalunga Grande (o oceano), onde a fé inabalável nos ancestrais venceu as correntes do cativeiro e fez brotar a liberdade no rufar dos tambores.',
        palette: {
          name: 'Ouro Real dos Orixás & Azul Sagrado',
          colors: ['#F59E0B', '#1E40AF', '#047857', '#DC2626', '#FFFFFF'],
          concept: 'Ouro cintilante de Oxum, azul profundo de Iemanjá, verde mato de Oxóssi e o branco da paz de Oxalá.'
        },
        highlights: [
          'A bênção ancestral e a invocação dos caminhos na comissão de frente',
          'A força guerreira das mulheres negras e a realeza das rainhas de Palmares',
          'A cadência sagrada dos ritmos iorubás traduzidos no repique e nos tamborins',
          'A apoteose triunfante em louvor à liberdade e à perpetuação da herança afro'
        ]
      };
    }

    if (lower.includes('amaz') || lower.includes('indig') || lower.includes('índig') || lower.includes('floresta') || lower.includes('paje') || lower.includes('pajé')) {
      return {
        historicalContext: 'A Amazônia e os povos originários guardam o pulmão verde e a maior biodiversidade do planeta. Milênios de sabedoria xamânica, cantos ancestrais e a comunhão sagrada entre os seres da floresta e os espíritos encantados inspiram a preservação e o futuro da humanidade.',
        figures: ['O Grande Xamã / Pajé da Floresta', 'Curupira e Caipora (Guardiões da Mata)', 'A Deusa Iara e os Encantados do Rio', 'As Guerreiras Icamiabas', 'A Árvore Mãe Samaúma'],
        iconography: ['Grafismos corporais de jenipapo e urucum', 'Cocar de penas e plumas multicoloridas', 'A canoa sagrada cortando as águas escuras', 'A flor da vitória-régia', 'Animais totêmicos: onça-pintada, gavião-real e sucuri'],
        dramaticTension: 'O clamor da floresta viva em chamas contra a ganância predatória, resgatada pelo levante dos guerreiros encantados em defesa da Mãe Terra.',
        palette: {
          name: 'Esmeralda Viva & Terras de Urucum',
          colors: ['#059669', '#10B981', '#DC2626', '#D97706', '#1E293B'],
          concept: 'Verdes profundos da copa das árvores, o vermelho vivo do urucum, o ocre da terra úmida e o dourado do sol poente.'
        },
        highlights: [
          'O ritual xamânico de invocação dos espíritos na comissão de frente',
          'A grandiosidade escultural da Samaúma com raízes monumentais no abre-alas',
          'A batida pulsante da bateria emulando os tambores da mata e o canto dos pássaros',
          'O juramento solene pela vida e pela demarcação das matas ancestrais'
        ]
      };
    }

    // Perfil Genérico / Universal Criativo
    return {
      historicalContext: `Investigação aprofundada sobre as matrizes, marcos e relevância cultural de "${theme}". O tema explora nuances estéticas e conceituais de grande apelo emotivo, perfeitamente talhadas para a magnitude e a teatralidade do espetáculo na passarela do samba.`,
      figures: [`Os Pioneiros de ${theme}`, `As Vozes do Povo`, `A Musa Inspiradora`, `Os Baluartes da Memória`],
      iconography: ['Portal do Tempo e Memória', 'Flâmulas da Vitória', 'A Coroa do Saber', 'Esculturas Monumentais', 'Fios e Tramas do Destino'],
      dramaticTension: `A jornada de superação e revelação que transforma o tema "${theme}" em um monumento poético inesquecível diante do público e do corpo de jurados.`,
      palette: {
        name: 'Harmonia Imperial & Luz da Ribalta',
        colors: ['#F59E0B', '#6366F1', '#EC4899', '#10B981', '#F8FAFC'],
        concept: 'Contraste harmônico entre cores nobres e vibrantes, desenhadas para brilhar sob a iluminação da passarela.'
      },
      highlights: [
        'Abertura monumental contextualizando o nascimento da narrativa',
        'Desenvolvimento poético dos conflitos e vitórias da história',
        'Segmentos tradicionais da escola integrados cenicamente ao tema',
        'Encerramento apoteótico com o coro da comunidade ecoando no Sambódromo'
      ]
    };
  }

  private static buildApproach1_Mistica(
    theme: string,
    notes: string,
    profile: any,
    genre: EnredoThemeType,
    schoolName: string
  ): EnredoApproachOption {
    const title = `Nas Asas do Sobrenatural: O Canto Místico e os Encantados de ${theme}`;
    const subTitle = `O Manto Sagrado da Ilusão, Rituais Ancestrais e a Fé que Ilumina a Passarela`;

    return {
      id: 'approach_mistica',
      name: 'Abordagem Mística & Encantada',
      badge: 'Mítica & Lúdica',
      tagline: 'Foco na magia, religiosidade popular, lendas míticas e no encanto sobrenatural.',
      suggestedTitle: title,
      subTitle,
      themeType: genre === 'Afro-Brasileiro' || genre === 'Mitológico' ? genre : 'Mitológico',
      narrativeAxis: `Transporta "${theme}" para uma dimensão mágica e atemporal. A história é contada sob a ótica das lendas, crenças populares, profecias e forças cósmicas que encantam a alma sertaneja e urbana.`,
      synopsis: `Era uma vez nas dobras do infinito, onde o tempo não se mede em horas, mas no pulsar dos corações... A ${schoolName} pede licença aos oráculos e às entidades do imaginário para abrir o grande livro dos segredos sobre "${theme}".\n\nNesta jornada transcendental, homens e deuses compartilham o mesmo chão de poesia. Entre visões proféticas, amuletos reluzentes e bênçãos sagradas, o enredo descortina as maravilhas que os olhos comuns não enxergam: a fé inabalável do povo em seus protetores, o sortilégio das matas e o triunfo do espírito sobre a matéria.\n\nNa apoteose da passarela, a comunidade se veste com o manto estrelado da esperança, celebrando a vitória da luz e consagrando a agremiação no altar sagrado do Carnaval.`,
      aestheticStyle: 'Barroco místico com toques de realismo mágico, espelhos, tecidos esvoaçantes e iluminação fosforescente.',
      dominatColors: ['#7C3AED', '#F59E0B', '#3B82F6', '#F8FAFC'],
      qualityBoost: 15,
      cost: 210000,
      setorizacaoPreview: [
        {
          sectorNumber: 1,
          title: 'Setor 1: O Portal dos Oráculos e a Criação Mítica',
          synopsis: `Abertura solene invocando os guardiões do infinito e apresentando a gênese mística do tema com esculturas monumentais de seres celestiais.`
        },
        {
          sectorNumber: 2,
          title: 'Setor 2: Veredas Sagradas e o Testemunho da Fé',
          synopsis: `O desdobrar dos rituais populares, devoções profundas, amuletos e a presença viva dos protetores que abençoam a jornada.`
        },
        {
          sectorNumber: 3,
          title: 'Setor 3: O Banquete dos Encantados e as Provações',
          synopsis: `O confronto dramático com as forças da escuridão e as provações espirituais superadas com o poder do canto e da união comunitária.`
        },
        {
          sectorNumber: 4,
          title: 'Setor 4: A Alvorada Estelar e a Eternidade no Panteão',
          synopsis: `Apoteose triunfal onde a lenda é coroada e imortalizada nos anais da passarela sob uma chuva de estrelas e bênçãos.`
        }
      ],
      elementsPreview: {
        comissaoDeFrente: {
          name: `Os Magos do Infinito Revelam o Segredo de ${theme}`,
          concept: `Bailarinos encarnam seres místicos que realizam metamorfoses coreográficas com mantos reflexivos e ilusões de levitação.`,
          costume: `Indumentária em veludo azul meia-noite e fios de fibra ótica dourada com máscaras entalhadas.`
        },
        casal1: {
          name: `O Sol e a Lua na Aliança das Estrelas`,
          costume: `Fantasia suntuosa cravejada com mais de 30 mil cristais austríacos nos tons de ametista e ouro puro.`,
          representation: `Conduzem o pavilhão como o eixo de equilíbrio cósmico do cortejo.`
        },
        abreAlas: {
          name: `O Altar Místico da Criação Universal`,
          concept: `Gigantesca alegoria com três corpos articulados, fontes de fumaça aromática e esculturas de divindades com olhos luminosos.`,
          materials: `Revestimentos em lâminas douradas, espelhos d'água mecânicos e resinas translúcidas.`
        },
        baianas: {
          name: `Sacerdotisas da Cura e das Ervas Sagradas`,
          costume: `Saias rodadas em tecido brocado púrpura e prata com detalhes de folhas douradas e turbantes majestosos.`,
          symbolism: `A purificação da passarela e o elo maternal com a sabedoria dos ancestrais.`
        },
        bateria: {
          name: `Os Guardiões dos Tambores Celestes`,
          costume: `Túnicas de guerreiros templários místicos com capacetes emplumados em azul e ouro.`,
          bossas: `Convenções rítmicas inspiradas nos toques sagrados de atabaques com paradas súbitas e retorno empolgante dos surdos de primeira.`
        },
        allegories: [
          { number: 2, name: `A Carruagem dos Astros e Veredas de Fogo`, concept: `Escultura cinética que projeta constelações na pista do Sambódromo.` },
          { number: 3, name: `O Templo da Vitória e a Redenção da Alma`, concept: `Monumento repleto de anjos, querubins e figuras populares coroadas de ouro.` }
        ],
        alasHighlights: [
          { name: `Ala dos Visionários e Profetas`, sector: 1, concept: `Fantasias com mantos pintados à mão retratando o mapa astral do desfile.` },
          { name: `Ala das Chamas Eternas`, sector: 2, concept: `Adereços de mão luminosos simulando tochas de fogo sagrado sem risco de chama real.` },
          { name: `Ala do Cordel dos Milagres`, sector: 3, concept: `Figurinos estruturados em camadas que simulam páginas de folhetos voadores.` }
        ]
      }
    };
  }

  private static buildApproach2_Historica(
    theme: string,
    notes: string,
    profile: any,
    genre: EnredoThemeType,
    schoolName: string
  ): EnredoApproachOption {
    const title = `A Epopeia Viva da Memória: O Legado Heroico e as Batalhas de ${theme}`;
    const subTitle = `O Suor dos Bravos, as Fronteiras da Glória e o Triunfo Histórico no Pavilhão`;

    return {
      id: 'approach_historica',
      name: 'Abordagem Histórica & Épica',
      badge: 'Documental & Heroica',
      tagline: 'Foco na verdade factual, cronologia documental, bravura dos pioneiros e relevância cívica.',
      suggestedTitle: title,
      subTitle,
      themeType: 'Histórico',
      narrativeAxis: `Reconstituição fidedigna e cinematográfica da trajetória de "${theme}". Da semente inicial às grandes batalhas, documentos, figuras de liderança e a consagração indelével no patrimônio cultural da nação.`,
      synopsis: `A história de um povo é escrita com coragem, suor e legado. Em um momento solene de resgate da memória nacional, a ${schoolName} traz à avenida a reconstituição épica e documentada de "${theme}".\n\nAbram-se os arquivos da pátria! Das origens desafiadoras aos embates decisivos, o cortejo mergulha nas raízes profundas dos pioneiros que ousaram transformar o seu tempo. Cada ala é um capítulo esculpido em honra; cada alegoria, um monumento aos marcos que moldaram o nosso destino.\n\nMais do que um desfile, este é um tributo vivo aos heróis anônimos e célebres que provaram que nenhuma tempestade é capaz de apagar a dignidade humana. A Sapucaí se ergue em continência à bravura imortal!`,
      aestheticStyle: 'Neoclássico monumental, texturas de bronze, mármore envelhecido, pergaminhos e fardamentos heráldicos.',
      dominatColors: ['#B45309', '#1E3A8A', '#065F46', '#D97706', '#E2E8F0'],
      qualityBoost: 16,
      cost: 225000,
      setorizacaoPreview: [
        {
          sectorNumber: 1,
          title: 'Setor 1: O Alvorecer dos Bravos e as Raízes da Jornada',
          synopsis: `Reconstituição do período inicial, o território e a vida rústica dos primeiros desbravadores diante das adversidades.`
        },
        {
          sectorNumber: 2,
          title: 'Setor 2: Os Anos de Luta e o Levante das Comunidades',
          synopsis: `O surgimento dos líderes emblemáticos, a organização dos batalhões e o avanço pelas fronteiras do desafio.`
        },
        {
          sectorNumber: 3,
          title: 'Setor 3: O Ponto de Inflexão e as Batalhas Decisivas',
          synopsis: `O clímax histórico: o confronto épico que definiu os rumos dos acontecimentos e forjou o caráter dos guerreiros.`
        },
        {
          sectorNumber: 4,
          title: 'Setor 4: O Memorial da Liberdade e a Imortalidade Cívica',
          synopsis: `A consagração definitiva do legado histórico nas páginas douradas da cultura e da memória do Brasil.`
        }
      ],
      elementsPreview: {
        comissaoDeFrente: {
          name: `Os Cronistas do Tempo Desvendam o Arquivo Real`,
          concept: `Historiadores e escribas que abrem pergaminhos cenográficos gigantes de onde surgem os vultos dos pioneiros históricos.`,
          costume: `Trajes de época em casacos adamascados com gravuras históricas autênticas e relógios de bolso de ouro cenográfico.`
        },
        casal1: {
          name: `A Nobreza da República e a Soberania Nacional`,
          costume: `Vestimenta nobre com medalhas imperiais, faixas tricolores e plumas nobres nas cores da bandeira da escola.`,
          representation: `Simbolizam a fidelidade aos ideais de justiça e a honra máxima do estandarte.`
        },
        abreAlas: {
          name: `O Galeão da Memória e a Fundação da Glória`,
          concept: `Imensa nau de guerra e monumentos de pedra com brasões esculpidos, canhões cênicos e caravelas interligadas.`,
          materials: `Madeira naval envelhecida, ferragens fundidas e esculturas com pátina de bronze antigo.`
        },
        baianas: {
          name: `Damas da Corte e Guardiãs do Patrimônio`,
          costume: `Saias estruturadas com brocados dourados e motivos renascentistas com fitas de veludo azul-marinho.`,
          symbolism: `A tradição que resistiu aos séculos e preservou a identidade do povo.`
        },
        bateria: {
          name: `O Regimento de Honra dos Inconfidentes`,
          costume: `Fardamento militar histórico do século XIX com dragonas douradas, botões de latão e quepe cerimonial.`,
          bossas: `Marchas rítmicas marciais alternadas com levadas rápidas de caixa e surdo de cortejo que eletrizam a arquibancada.`
        },
        allegories: [
          { number: 2, name: `A Fortaleza dos Heróis e o Trono da Coragem`, concept: `Representação monumental de um forte histórico com ameias, estandartes e guerreiros esculpidos.` },
          { number: 3, name: `O Museu Vivo da Pátria e o Panteão dos Imortais`, concept: `Alegoria em estilo de templo greco-romano com esculturas dos grandes vultos em mármore sintético.` }
        ],
        alasHighlights: [
          { name: `Ala dos Desbravadores do Sertão`, sector: 1, concept: `Fantasias com gibões de couro e mapas antigos costurados no dorso.` },
          { name: `Ala dos Mensageiros da Liberdade`, sector: 2, concept: `Adereços de mão em forma de cartas lacradas com cera vermelha.` },
          { name: `Ala dos Forjadores da Independência`, sector: 3, concept: `Adereços de forja e metalurgia representando a construção das ferramentas da vitória.` }
        ]
      }
    };
  }

  private static buildApproach3_SocialCritica(
    theme: string,
    notes: string,
    profile: any,
    genre: EnredoThemeType,
    schoolName: string
  ): EnredoApproachOption {
    const title = `O Grito que Ecoa no Peito: A Voz do Povo e a Resistência em ${theme}`;
    const subTitle = `Das Correntes da Opressão ao Manifesto da Favela: O Samba Não se Rende!`;

    return {
      id: 'approach_critica',
      name: 'Abordagem Crítica & Social',
      badge: 'Manifesto & Resistência',
      tagline: 'Foco na luta dos marginalizados, denúncia social, protesto poético e no grito de libertação popular.',
      suggestedTitle: title,
      subTitle,
      themeType: 'Crítica Social',
      narrativeAxis: `Aborda "${theme}" como uma metáfora contundente das desigualdades, das lutas populares e da força da classe trabalhadora. Um manifesto cênico e arrebatador que questiona os donos do poder e exalta a dignidade dos oprimidos.`,
      synopsis: `Senhores do asfalto e donos do poder, prestem atenção: a voz do morro desceu para julgar o mundo! A ${schoolName} empunha o seu pavilhão como um escudo e faz de "${theme}" o mais poderoso grito de alerta e resistência do Carnaval.\n\nPor trás das versões oficiais douradas pela elite, este enredo revela a carne viva do povo: as mãos calejadas que constroem este país, o suor dos operários, a dignidade dos esquecidos que nunca baixaram a cabeça diante da injustiça. Aqui, a dor se transmuta em poesia; a indignação vira samba no pé!\n\nNa reta final da avenida, quebra-se a mordaça! Não há mordaça capaz de calar a favela unida. Um manifesto de celebração, orgulho e liberdade que exige respeito ao trabalhador e faz a Sapucaí tremer de emoção!`,
      aestheticStyle: 'Neorrealismo carnavalesco, elementos industriais, sucata artística reciclada, grafites urbanos e cores vivas de impacto.',
      dominatColors: ['#DC2626', '#1E293B', '#F59E0B', '#FFFFFF', '#047857'],
      qualityBoost: 16,
      cost: 195000,
      setorizacaoPreview: [
        {
          sectorNumber: 1,
          title: 'Setor 1: O Banquete dos Poderosos e o Chão dos Esquecidos',
          synopsis: `O contraste visual chocante entre o luxo estéril dos opressores e a força crua dos trabalhadores que sustentam o país.`
        },
        {
          sectorNumber: 2,
          title: 'Setor 2: O Calvário Diário e a Sobrevivência com Arte',
          synopsis: `A rotina de luta, os transportes lotados, a labuta no sol quente e a capacidade incomparável do povo de sorrir através da música.`
        },
        {
          sectorNumber: 3,
          title: 'Setor 3: O Levante da Periferia e a Quebra dos Grilhões',
          synopsis: `A união das comunidades, os movimentos culturais que enfrentam o preconceito e o despertar da consciência coletiva.`
        },
        {
          sectorNumber: 4,
          title: 'Setor 4: A Revolução do Samba e o Amanhã que nos Pertence',
          synopsis: `Apoteose catártica onde as correntes são rompidas e a bandeira da dignidade popular é hasteada no topo da Sapucaí.`
        }
      ],
      elementsPreview: {
        comissaoDeFrente: {
          name: `A Mordaça que se Desfaz: O Despertar da Consciência`,
          concept: `Atores vestidos como operários acorrentados realizam uma coreografia visceral, libertando-se das amarras para reger o primeiro acorde do samba.`,
          costume: `Macacões de trabalho grafitados com mensagens de paz, esperança e palavras de ordem da classe trabalhadora.`
        },
        casal1: {
          name: `A Chama da Esperança e a Bandeira do Povo`,
          costume: `Fantasia tridimensional estilizada com motivos de favela vertical, tijolos expostos em pedrarias e coroa de louros de operário.`,
          representation: `Giram com orgulho e altivez, representando o triunfo dos filhos da comunidade.`
        },
        abreAlas: {
          name: `A Torre dos Desiguais: A Balança Viciada do Poder`,
          concept: `Monumento impressionante que contrapõe uma mansão de ouro oco a um morro pulsante em alta tecnologia de LED e arte urbana.`,
          materials: `Estruturas metálicas de andaime com telas de projeção, grafites reais pintados por artistas comunitários e tecidos reciclados.`
        },
        baianas: {
          name: `Mães do Asfalto e Lavadeiras da História`,
          costume: `Saias confeccionadas em patchwork de retalhos nobres com bordados retratando o rosto das heroínas anônimas das favelas.`,
          symbolism: `A sustentação moral das famílias periféricas e a força da mulher brasileira.`
        },
        bateria: {
          name: `O Batalhão dos Invisíveis que Faz a Cidade Tremer`,
          costume: `Uniformes de garis, entregadores, pedreiros e professores estilizados com detalhes luminosos e cetim brilhante.`,
          bossas: `Arrancadas com batidas secas de caixas simulando marchas de protesto e o rufar triunfante da favela ecoando nos tamborins.`
        },
        allegories: [
          { number: 2, name: `A Fábrica dos Sonhos e a Dignidade do Suor`, concept: `Engrenagens industriais gigantes que se transformam em flores e instrumentos musicais.` },
          { number: 3, name: `A Apoteose da Cidadania: O Brasil que Queremos`, concept: `Uma gigantesca bandeira nacional formada por mil fotos de trabalhadores sorrindo com a faixa: 'Respeite a Favela!'.` }
        ],
        alasHighlights: [
          { name: `Ala dos Trabalhadores da Madrugada`, sector: 1, concept: `Mochilas térmicas e lanternas cênicas que iluminam o chão do desfile.` },
          { name: `Ala da Educação que Liberta`, sector: 2, concept: `Adereços de livros abertos de onde brotam notas musicais e poesias.` },
          { name: `Ala do Funk e do Passinho`, sector: 3, concept: `Figurinos ultra contemporâneos com cores neon e coreografia eletrizante.` }
        ]
      }
    };
  }

  private static buildApproach4_PoeticaLirica(
    theme: string,
    notes: string,
    profile: any,
    genre: EnredoThemeType,
    schoolName: string
  ): EnredoApproachOption {
    const title = `Sinfonia das Cores e Poesia: O Sonho e o Encanto de ${theme}`;
    const subTitle = `Onde a Palavra Vira Melodia, as Almas Bailam e o Samba se Faz Arte Eterna`;

    return {
      id: 'approach_poetica',
      name: 'Abordagem Poética & Armorial',
      badge: 'Lírica & Artística',
      tagline: 'Foco na beleza literária, lirismo refinado, sutileza plástica e na estética das artes visuais.',
      suggestedTitle: title,
      subTitle,
      themeType: 'Cultural',
      narrativeAxis: `Uma declaração de amor à arte e à beleza estética de "${theme}". Cada verso é uma aquarela em movimento; cada ala traduz poesias, sonetos e pinturas em fantasias de extremo requinte e delicadeza lírica.`,
      synopsis: `Quando a poesia desce a colina em noite de lua cheia, as palavras ganham asas e a vida vira melodia. A ${schoolName} convida o público a sonhar acordado em uma viagem deslumbrante pela essência lírica de "${theme}".\n\nLonge do ruído do mundo cotidiano, este desfile é um refúgio de beleza, encanto e sensibilidade. Das estrofes apaixonadas dos poetas aos acordes doces do violão da velha guarda, os versos se materializam em cores suaves, curvas barrocas e movimentos de rara nobreza.\n\nUm cortejo esculpido como uma sinfonia à céu aberto, onde o samba e a alta cultura se abraçam fraternalmente, provando que a arte é a mais doce salvação da humanidade. Venha se encantar com a mais pura poesia na passarela!`,
      aestheticStyle: 'Rococó romântico, tons pastéis refinados, rendas, porcelanas, flores de seda e arabescos dourados delicados.',
      dominatColors: ['#FDE68A', '#F472B6', '#67E8F9', '#DDD6FE', '#FFFFFF'],
      qualityBoost: 15,
      cost: 200000,
      setorizacaoPreview: [
        {
          sectorNumber: 1,
          title: 'Setor 1: O Suspiro da Musa e o Nascedouro dos Sonhos',
          synopsis: `A inspiração criativa que brota da alma do artista diante do papel em branco e do primeiro acorde do violão.`
        },
        {
          sectorNumber: 2,
          title: 'Setor 2: Aquarelas da Natureza e o Jardim das Metáforas',
          synopsis: `A transposição lírica das paisagens, flores, rios e sentimentos transformados em versos imortais.`
        },
        {
          sectorNumber: 3,
          title: 'Setor 3: O Baile das Rimas e o Idílio dos Namorados',
          synopsis: `A celebração do amor romântico, das serenatas ao luar e das danças clássicas dos salões da memória boêmia.`
        },
        {
          sectorNumber: 4,
          title: 'Setor 4: A Glória da Poesia e o Aplauso dos Querubins',
          synopsis: `Encerramento apoteótico onde o samba se consagra como a forma mais sublime de literatura popular no mundo.`
        }
      ],
      elementsPreview: {
        comissaoDeFrente: {
          name: `O Despertar das Musas e o Voo das Borboletas de Ouro`,
          concept: `Bailarinos clássicos com figurinos de asas articuladas realizam evoluções aéreas suaves ao redor de uma lira gigante cenográfica.`,
          costume: `Tecidos de organza translúcida em degrade suave com bordados finos de fios de prata e plumas brancas.`
        },
        casal1: {
          name: `Pierrô Apaixonado e a Colombina da Passarela`,
          costume: `Roupas românticas em seda pura com golas plissadas renascentistas e cristais furtacor nos losangos clássicos.`,
          representation: `Dançam com leveza poética sem perder a raiz tradicional do bailado carnavalesco.`
        },
        abreAlas: {
          name: `O Jardim Secreto da Poesia e a Carruagem dos Sonhos`,
          concept: `Alegoria esculpida com milhares de flores artesanais de seda, cascatas de cristal e estátuas de musas clássicas com violoncelos.`,
          materials: `Rendas francesas resinadas, madrepérola, porcelana cenográfica e iluminação quente em tom de vela.`
        },
        baianas: {
          name: `Bordadeiras da Saudade e Rendas de luar`,
          costume: `Saias confeccionadas em camadas de renda filé branca com babados de cetim rosa chá e detalhes em dourado suave.`,
          symbolism: `A pureza lírica e o aconchego maternal das lembranças poéticas da infância.`
        },
        bateria: {
          name: `Os Trovadores da Lua Serena`,
          costume: `Fraques estilizados em veludo azul celeste com cartolas de fita de cetim e broches de clave de sol.`,
          bossas: `Cadência cadenciada e aveludada, valorizando o desenho melódico do samba com repiques melodiosos e tamborins virtuosos.`
        },
        allegories: [
          { number: 2, name: `O Coreto Encantado das Serenatas da Lapa`, concept: `Coreto iluminado com casais de época e músicos clássicos tocando ao vivo na alegoria.` },
          { number: 3, name: `A Nuvem das Quimeras: O Templo das Belas Artes`, concept: `Alegoria flutuante com esculturas de poetas e deusas aladas entre nuvens de algodão cênico iluminado.` }
        ],
        alasHighlights: [
          { name: `Ala dos Poemas ao Vento`, sector: 1, concept: `Adereços de mão em forma de penas de escrever com fitas esvoaçantes.` },
          { name: `Ala dos Jardins Suspensos`, sector: 2, concept: `Fantasias com guirlandas florais aromáticas que perfumam a pista.` },
          { name: `Ala do Luar Prateado`, sector: 3, concept: `Resplendores semicirculares em prata espelhada que refletem os holofotes da Sapucaí.` }
        ]
      }
    };
  }

  private static getGenericSectorTitle(sectorIndex: number, genre: EnredoThemeType): string {
    const titlesByGenre: Record<string, string[]> = {
      'Histórico': ['A Gênese e as Raízes da Trajetória', 'Os Embates e a Marcha dos Pioneiros', 'A Grande Transformação', 'O Legado Eterno e a Glória'],
      'Afro-Brasileiro': ['A Invocação dos Sagrados Orixás', 'A Travessia e a Raiz Ancestral', 'O Quilombo da Resistência', 'O Triunfo dos Filhos de África'],
      'Regional': ['O Chão Sagrado e o Despertar da Terra', 'A Bravura e os Costumes do Povo', 'As Festas e o Folclore Tradicional', 'A Apoteose da Identidade'],
      'Mitológico': ['O Olimpo dos Deuses e os Enigmas', 'A Queda e a Busca da Imortalidade', 'O Confronto com os Monstros Místicos', 'A Coroação Estelar'],
      'Crítica Social': ['O Espelho da Desigualdade', 'A Labuta dos Invisíveis', 'O Grito da Coletividade', 'A Alvorada da Cidadania'],
      'Cultural': ['O Berço das Tradições', 'A Mistura de Culturas e Cores', 'A Celebração da Arte', 'O Estandarte da Glória']
    };

    const list = titlesByGenre[genre] || titlesByGenre['Cultural'];
    return list[sectorIndex % list.length];
  }
}
