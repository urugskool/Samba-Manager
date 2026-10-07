import { School, DivisionId, Enredo, EnredoThemeType } from '../types/carnaval';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import { DIVISION_REGULATIONS, generateDefaultParadeComposition } from '../config/obrigatoriedadesConfig';
import { THEMATIC_PARADE_PRESETS, ThematicParadePreset } from '../data/thematicParadeDatabase';

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
  | 'apoteose';

export interface ParadeScriptElement {
  id: string;
  orderNumber: number;
  type: ParadeElementType;
  name: string;
  categoryLabel: string;
  sectorNumber: number;
  sectorTitle: string;
  description: string;
  costumeDetails?: string;
  highlightPeople?: string;
  componentsCount: number;
  isAllegoryOrTripod?: boolean;
}

export interface ParadeSector {
  sectorNumber: number;
  title: string;
  themeSynopsis: string;
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
}

interface EnredoNarrativeProfile {
  mainSubject: string;
  subTitle: string;
  synopsis: string;
  themeType: EnredoThemeType;
  sector1Synopsis: string;
  sector2Synopsis: string;
  sector3Synopsis: string;
  sector4Synopsis: string;
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
   * Detecta se o enredo pertence a um dos núcleos temáticos prioritários:
   * Japão, Egito, Amazônia, Futebol, Inteligência Artificial ou Astronomia.
   */
  public static detectThematicPreset(enredo: Enredo): ThematicParadePreset | null {
    const raw = `${enredo.title || ''} ${enredo.synopsis || ''} ${(enredo as any).keywords?.join(' ') || ''}`.toLowerCase();
    let bestPreset: ThematicParadePreset | null = null;
    let maxMatches = 0;

    for (const key of Object.keys(THEMATIC_PARADE_PRESETS)) {
      const preset = THEMATIC_PARADE_PRESETS[key];
      let currentMatches = 0;
      for (const kw of preset.themeKeywords) {
        const lowerKw = kw.toLowerCase();
        if (lowerKw.length <= 3) {
          const regex = new RegExp(`\\b${lowerKw}\\b`, 'i');
          if (regex.test(raw)) {
            currentMatches += 2;
          }
        } else {
          if (raw.includes(lowerKw)) {
            currentMatches++;
          }
        }
      }
      if (currentMatches > maxMatches) {
        maxMatches = currentMatches;
        bestPreset = preset;
      }
    }
    return maxMatches > 0 ? bestPreset : null;
  }

  /**
   * Obtém ou gera o Roteiro Oficial do Desfile (Livro Abre-Alas) para uma escola
   * O roteiro é 100% derivado e construído a partir do enredo apresentado pela escola.
   */
  public static getOrGenerateParadeScript(school: School, division?: DivisionId): ParadeScript {
    const div = division || school.division;
    const enredoTitle = school.currentEnredo?.title || 'O Canto Sagrado da Passarela';
    const enredoId = school.currentEnredo?.id || 'default_enr';
    const cacheKey = `${school.id}_${div}_${enredoId}_${enredoTitle}`;

    if (this.scriptCache.has(cacheKey)) {
      return this.scriptCache.get(cacheKey)!;
    }

    const script = this.generateScript(school, div);
    this.scriptCache.set(cacheKey, script);
    return script;
  }

  private static generateThematicPresetScript(
    school: School,
    division: DivisionId,
    enredo: Enredo,
    preset: ThematicParadePreset
  ): ParadeScript {
    const reg = DIVISION_REGULATIONS[division];
    const comp = school.paradeComposition || generateDefaultParadeComposition(school);
    const divisionLabel = reg.divisionLabel;

    const alegoriasCount = comp.alegorias || (division === 'especial' ? 5 : division === 'ouro' ? 3 : division === 'prata' ? 3 : division === 'bronze' ? 2 : 1);
    const tripesCount = comp.tripes || (division === 'especial' ? 2 : division === 'ouro' ? 1 : 0);
    const ritmistasCount = comp.ritmistas || (division === 'especial' ? 220 : division === 'ouro' ? 160 : division === 'prata' ? 130 : division === 'bronze' ? 95 : 80);
    const baianasCount = comp.baianas || (division === 'especial' ? 70 : division === 'ouro' ? 50 : division === 'prata' ? 40 : division === 'bronze' ? 30 : 15);
    const comissaoCount = comp.comissaoDeFrente || (division === 'especial' ? 14 : division === 'ouro' ? 14 : division === 'prata' ? 11 : 10);

    const totalAlas = division === 'especial' ? 28 : division === 'ouro' ? 20 : division === 'prata' ? 16 : division === 'bronze' ? 12 : 9;
    const componentesTotal = comp.componentes || (division === 'especial' ? 2800 : division === 'ouro' ? 1100 : division === 'prata' ? 750 : division === 'bronze' ? 600 : 400);
    const componentesPorAla = Math.max(25, Math.round((componentesTotal - ritmistasCount - baianasCount - comissaoCount - 150) / totalAlas));

    const setores: ParadeSector[] = preset.sectors.map((s, idx) => ({
      sectorNumber: idx + 1,
      title: s.title,
      themeSynopsis: s.synopsis
    }));

    const elements: ParadeScriptElement[] = [];
    let orderSeq = 1;

    // 1. Comissão de Frente
    elements.push({
      id: `cdf_${school.id}`,
      orderNumber: orderSeq++,
      type: 'comissao_frente',
      name: preset.comissaoDeFrente.name,
      categoryLabel: 'Comissão de Frente',
      sectorNumber: 1,
      sectorTitle: setores[0].title,
      description: preset.comissaoDeFrente.description(school, comissaoCount),
      costumeDetails: preset.comissaoDeFrente.costume(school),
      highlightPeople: `Coreógrafo(a): ${school.staff?.coreografo?.name || 'Direção Cênica'}`,
      componentsCount: comissaoCount,
      isAllegoryOrTripod: false
    });

    // 2. 1º Casal de MS & PB
    elements.push({
      id: `casal_1_${school.id}`,
      orderNumber: orderSeq++,
      type: 'casal_mspb',
      name: preset.casal1.name,
      categoryLabel: '1º Casal de MS & PB',
      sectorNumber: 1,
      sectorTitle: setores[0].title,
      description: preset.casal1.description(school),
      costumeDetails: preset.casal1.costume(school),
      highlightPeople: `1º Casal Oficial: ${school.staff?.mestreSalaPortaBandeira?.name || 'Casal Oficial'}`,
      componentsCount: 2,
      isAllegoryOrTripod: false
    });

    // 3. Abre-Alas
    elements.push({
      id: `alegoria_1_${school.id}`,
      orderNumber: orderSeq++,
      type: 'abre_alas',
      name: preset.abreAlas.name,
      categoryLabel: 'Abre-Alas (Alegoria 1)',
      sectorNumber: 1,
      sectorTitle: setores[0].title,
      description: preset.abreAlas.description(school),
      costumeDetails: preset.abreAlas.structure(school),
      highlightPeople: `Carnavalesco(a): ${school.staff?.carnavalesco?.name || 'Comissão de Carnaval'}`,
      componentsCount: 35,
      isAllegoryOrTripod: true
    });

    // Distribuir as alas pelos 4 setores
    const sector1Alas = preset.alas.filter((a) => a.sectorNumber === 1);
    const sector2Alas = preset.alas.filter((a) => a.sectorNumber === 2);
    const sector3Alas = preset.alas.filter((a) => a.sectorNumber === 3);
    const sector4Alas = preset.alas.filter((a) => a.sectorNumber === 4);

    const alasPerSector = Math.ceil(totalAlas / 4);
    let alaGlobalNum = 1;

    // Alas do Setor 1
    const s1Count = Math.min(alasPerSector, sector1Alas.length);
    for (let i = 0; i < s1Count && alaGlobalNum <= totalAlas; i++) {
      const a = sector1Alas[i % sector1Alas.length];
      elements.push({
        id: `ala_${alaGlobalNum}_${school.id}`,
        orderNumber: orderSeq++,
        type: 'ala',
        name: `Ala ${alaGlobalNum}: ${a.title}`,
        categoryLabel: `Ala ${alaGlobalNum}`,
        sectorNumber: 1,
        sectorTitle: setores[0].title,
        description: a.description,
        costumeDetails: a.costume,
        componentsCount: componentesPorAla,
        isAllegoryOrTripod: false
      });
      alaGlobalNum++;
    }

    // Tripé 1
    if (tripesCount >= 1) {
      elements.push({
        id: `tripe_1_${school.id}`,
        orderNumber: orderSeq++,
        type: 'tripe',
        name: preset.tripod1.name,
        categoryLabel: 'Elemento Cenográfico (Tripé 1)',
        sectorNumber: 1,
        sectorTitle: setores[0].title,
        description: preset.tripod1.description,
        componentsCount: 2,
        isAllegoryOrTripod: true
      });
    }

    // Setor 2: Baianas
    elements.push({
      id: `baianas_${school.id}`,
      orderNumber: orderSeq++,
      type: 'baianas',
      name: preset.baianas.name,
      categoryLabel: 'Ala das Baianas',
      sectorNumber: 2,
      sectorTitle: setores[1].title,
      description: preset.baianas.description(baianasCount),
      costumeDetails: preset.baianas.costume(school),
      highlightPeople: `Presidente das Baianas da ${school.shortName}`,
      componentsCount: baianasCount,
      isAllegoryOrTripod: false
    });

    // Alas do Setor 2
    const s2Count = Math.min(alasPerSector, sector2Alas.length);
    for (let i = 0; i < s2Count && alaGlobalNum <= totalAlas; i++) {
      const a = sector2Alas[i % sector2Alas.length];
      elements.push({
        id: `ala_${alaGlobalNum}_${school.id}`,
        orderNumber: orderSeq++,
        type: 'ala',
        name: `Ala ${alaGlobalNum}: ${a.title}`,
        categoryLabel: `Ala ${alaGlobalNum}`,
        sectorNumber: 2,
        sectorTitle: setores[1].title,
        description: a.description,
        costumeDetails: a.costume,
        componentsCount: componentesPorAla,
        isAllegoryOrTripod: false
      });
      alaGlobalNum++;
    }

    // Carro 2
    if (alegoriasCount >= 2) {
      const f2 = preset.floats.find((f) => f.floatNumber === 2) || {
        name: `Carro 2: A Jornada do Enredo`,
        description: 'Segunda alegoria desenvolvendo o segundo setor narrativo.'
      };
      elements.push({
        id: `alegoria_2_${school.id}`,
        orderNumber: orderSeq++,
        type: 'alegoria',
        name: f2.name,
        categoryLabel: 'Carro Alegórico 2',
        sectorNumber: 2,
        sectorTitle: setores[1].title,
        description: f2.description,
        costumeDetails: `Cenografia com esculturas temáticas nas cores ${school.colors.primary} e ${school.colors.secondary}.`,
        componentsCount: 30,
        isAllegoryOrTripod: true
      });
    }

    // Setor 3: Bateria, Passistas, 2º Casal
    elements.push({
      id: `bateria_${school.id}`,
      orderNumber: orderSeq++,
      type: 'bateria',
      name: preset.bateria.name,
      categoryLabel: 'Bateria',
      sectorNumber: 3,
      sectorTitle: setores[2].title,
      description: preset.bateria.description(school, ritmistasCount),
      costumeDetails: preset.bateria.costume(school),
      highlightPeople: `Mestre de Bateria: ${school.staff?.mestreBateria?.name || 'Mestre da Bateria'}`,
      componentsCount: ritmistasCount,
      isAllegoryOrTripod: false
    });

    elements.push({
      id: `passistas_${school.id}`,
      orderNumber: orderSeq++,
      type: 'passistas',
      name: preset.passistas.name,
      categoryLabel: 'Ala dos Passistas',
      sectorNumber: 3,
      sectorTitle: setores[2].title,
      description: preset.passistas.description,
      costumeDetails: preset.passistas.costume(school),
      componentsCount: 45,
      isAllegoryOrTripod: false
    });

    elements.push({
      id: `casal_2_${school.id}`,
      orderNumber: orderSeq++,
      type: 'casal_mspb',
      name: preset.casal2.name,
      categoryLabel: '2º Casal de MS & PB',
      sectorNumber: 3,
      sectorTitle: setores[2].title,
      description: preset.casal2.description,
      costumeDetails: preset.casal2.costume(school),
      componentsCount: 2,
      isAllegoryOrTripod: false
    });

    // Alas do Setor 3
    const s3Count = Math.min(alasPerSector, sector3Alas.length);
    for (let i = 0; i < s3Count && alaGlobalNum <= totalAlas; i++) {
      const a = sector3Alas[i % sector3Alas.length];
      elements.push({
        id: `ala_${alaGlobalNum}_${school.id}`,
        orderNumber: orderSeq++,
        type: 'ala',
        name: `Ala ${alaGlobalNum}: ${a.title}`,
        categoryLabel: `Ala ${alaGlobalNum}`,
        sectorNumber: 3,
        sectorTitle: setores[2].title,
        description: a.description,
        costumeDetails: a.costume,
        componentsCount: componentesPorAla,
        isAllegoryOrTripod: false
      });
      alaGlobalNum++;
    }

    // Carro 3
    if (alegoriasCount >= 3) {
      const f3 = preset.floats.find((f) => f.floatNumber === 3) || {
        name: `Carro 3: O Clímax Narrativo`,
        description: 'Terceira alegoria retratando a comoção popular.'
      };
      elements.push({
        id: `alegoria_3_${school.id}`,
        orderNumber: orderSeq++,
        type: 'alegoria',
        name: f3.name,
        categoryLabel: 'Carro Alegórico 3',
        sectorNumber: 3,
        sectorTitle: setores[2].title,
        description: f3.description,
        costumeDetails: `Alegoria com iluminação computadorizada e efeitos cênicos nas cores ${school.colors.primary}.`,
        componentsCount: 28,
        isAllegoryOrTripod: true
      });
    }

    // Tripé 2
    if (tripesCount >= 2) {
      elements.push({
        id: `tripe_2_${school.id}`,
        orderNumber: orderSeq++,
        type: 'tripe',
        name: preset.tripod2.name,
        categoryLabel: 'Elemento Cenográfico (Tripé 2)',
        sectorNumber: 3,
        sectorTitle: setores[2].title,
        description: preset.tripod2.description,
        componentsCount: 2,
        isAllegoryOrTripod: true
      });
    }

    // Setor 4: Alas Finais, Velha Guarda e Apoteose
    while (alaGlobalNum <= totalAlas) {
      const s4Idx = (alaGlobalNum - 1) % sector4Alas.length;
      const a = sector4Alas[s4Idx] || sector1Alas[0];
      elements.push({
        id: `ala_${alaGlobalNum}_${school.id}`,
        orderNumber: orderSeq++,
        type: 'ala',
        name: `Ala ${alaGlobalNum}: ${a.title}`,
        categoryLabel: `Ala ${alaGlobalNum}`,
        sectorNumber: 4,
        sectorTitle: setores[3].title,
        description: a.description,
        costumeDetails: a.costume,
        componentsCount: componentesPorAla,
        isAllegoryOrTripod: false
      });
      alaGlobalNum++;
    }

    // Carros intermediários 4..N-1
    for (let carNum = 4; carNum < alegoriasCount; carNum++) {
      const extraFloat = preset.floats.find((f) => f.floatNumber === carNum) || {
        name: `Carro ${carNum}: O Triunfo da Sabedoria e da Arte`,
        description: 'Alegoria monumental preparando o encerramento do espetáculo.'
      };
      elements.push({
        id: `alegoria_${carNum}_${school.id}`,
        orderNumber: orderSeq++,
        type: 'alegoria',
        name: extraFloat.name,
        categoryLabel: `Carro Alegórico ${carNum}`,
        sectorNumber: 4,
        sectorTitle: setores[3].title,
        description: extraFloat.description,
        componentsCount: 26,
        isAllegoryOrTripod: true
      });
    }

    // Velha Guarda
    elements.push({
      id: `velha_guarda_${school.id}`,
      orderNumber: orderSeq++,
      type: 'velha_guarda',
      name: preset.velhaGuarda.name,
      categoryLabel: 'Velha Guarda',
      sectorNumber: 4,
      sectorTitle: setores[3].title,
      description: preset.velhaGuarda.description(school),
      costumeDetails: preset.velhaGuarda.costume(school),
      componentsCount: 30,
      isAllegoryOrTripod: false
    });

    // Última Alegoria
    if (alegoriasCount >= 1) {
      elements.push({
        id: `alegoria_apoteose_${school.id}`,
        orderNumber: orderSeq++,
        type: 'apoteose',
        name: preset.apoteose.name(school, alegoriasCount),
        categoryLabel: `Última Alegoria (Carro ${alegoriasCount})`,
        sectorNumber: 4,
        sectorTitle: setores[3].title,
        description: preset.apoteose.description(school),
        highlightPeople: 'Destaques de Luxo & Grande Obra Escultórica',
        componentsCount: 35,
        isAllegoryOrTripod: true
      });
    }

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
      obrigatoriedades: {
        totalComponentes: componentesTotal,
        totalAlas,
        totalAlegorias: alegoriasCount,
        totalTripes: tripesCount,
        ritmistasCount,
        baianasCount,
        comissaoDeFrenteCount: comissaoCount,
        componentesPorAla,
        casaisCount: 2
      },
      setores,
      elements
    };
  }

  private static generateScript(school: School, division: DivisionId): ParadeScript {
    const reg = DIVISION_REGULATIONS[division];
    const comp = school.paradeComposition || generateDefaultParadeComposition(school);
    const enredo = school.currentEnredo || {
      id: 'default_enr',
      title: 'A Festa da Raiz do Samba',
      themeType: 'Cultural' as EnredoThemeType,
      synopsis: 'Uma celebração às tradições imortais e aos baluartes do Carnaval carioca.',
      qualityBoost: 10,
      cost: 150000
    };

    // "O ENREDO DITA O DESFILE": Se houver preset temático homologado, gera desfile 100% autêntico
    const preset = this.detectThematicPreset(enredo);
    if (preset) {
      return this.generateThematicPresetScript(school, division, enredo, preset);
    }

    const divisionLabel = reg.divisionLabel;

    // Obrigatoriedades consolidadas
    const alegoriasCount = comp.alegorias || (division === 'especial' ? 5 : division === 'ouro' ? 3 : division === 'prata' ? 3 : division === 'bronze' ? 2 : 1);
    const tripesCount = comp.tripes || (division === 'especial' ? 2 : division === 'ouro' ? 1 : 0);
    const ritmistasCount = comp.ritmistas || (division === 'especial' ? 220 : division === 'ouro' ? 160 : division === 'prata' ? 130 : division === 'bronze' ? 95 : 80);
    const baianasCount = comp.baianas || (division === 'especial' ? 70 : division === 'ouro' ? 50 : division === 'prata' ? 40 : division === 'bronze' ? 30 : 15);
    const comissaoCount = comp.comissaoDeFrente || (division === 'especial' ? 14 : division === 'ouro' ? 14 : division === 'prata' ? 11 : 10);
    
    // Total de alas proporcionais à divisão e total de desfilantes
    const totalAlas = division === 'especial' ? 28 : division === 'ouro' ? 20 : division === 'prata' ? 16 : division === 'bronze' ? 12 : 9;
    const componentesTotal = comp.componentes || (division === 'especial' ? 2800 : division === 'ouro' ? 1100 : division === 'prata' ? 750 : division === 'bronze' ? 600 : 400);
    const componentesPorAla = Math.max(25, Math.round((componentesTotal - ritmistasCount - baianasCount - comissaoCount - 150) / totalAlas));

    // Perfil narrativo extraído do enredo
    const narrative = this.extractNarrativeProfile(enredo, school);

    // Gerar Setores Narrativos do Enredo
    const setores = this.generateSectors(narrative);

    // Gerar Elementos sequenciais do desfile inteiramente contextualizados
    const elements: ParadeScriptElement[] = [];
    let orderSeq = 1;

    // 1. Comissão de Frente (Abertura do Desfile)
    const cdfData = this.generateComissaoDeFrente(narrative, school, comissaoCount, setores[0]);
    elements.push({
      id: `cdf_${school.id}`,
      orderNumber: orderSeq++,
      type: 'comissao_frente',
      name: cdfData.name,
      categoryLabel: 'Comissão de Frente',
      sectorNumber: 1,
      sectorTitle: setores[0].title,
      description: cdfData.description,
      costumeDetails: cdfData.costume,
      highlightPeople: `Coreógrafo(a): ${school.staff?.coreografo?.name || 'Direção Cênica'}`,
      componentsCount: comissaoCount,
      isAllegoryOrTripod: false
    });

    // 2. 1º Casal de Mestre-Sala e Porta-Bandeira
    const casalData = this.generateFirstCouple(narrative, school, setores[0]);
    elements.push({
      id: `casal_1_${school.id}`,
      orderNumber: orderSeq++,
      type: 'casal_mspb',
      name: casalData.name,
      categoryLabel: '1º Casal de MS & PB',
      sectorNumber: 1,
      sectorTitle: setores[0].title,
      description: casalData.description,
      costumeDetails: casalData.costume,
      highlightPeople: `1º Casal Oficial: ${school.staff?.mestreSalaPortaBandeira?.name || 'Casal de Ouro'}`,
      componentsCount: 2,
      isAllegoryOrTripod: false
    });

    // 3. Carro Abre-Alas (Alegoria 1)
    const abreAlasData = this.generateAbreAlas(narrative, school, setores[0]);
    elements.push({
      id: `alegoria_1_${school.id}`,
      orderNumber: orderSeq++,
      type: 'abre_alas',
      name: abreAlasData.name,
      categoryLabel: 'Abre-Alas (Alegoria 1)',
      sectorNumber: 1,
      sectorTitle: setores[0].title,
      description: abreAlasData.description,
      costumeDetails: abreAlasData.structure,
      highlightPeople: `Carnavalesco(a): ${school.staff?.carnavalesco?.name || 'Comissão de Carnaval'}`,
      componentsCount: 35,
      isAllegoryOrTripod: true
    });

    // Gerar as alas do desfile contextualizadas do enredo
    const alasList = this.generateThematicAlas(narrative, school, totalAlas, setores);
    const alasPerSector = Math.ceil(totalAlas / setores.length);
    let alaIndex = 0;

    // Setor 1: Alas iniciais
    const setor1AlasCount = Math.min(alasPerSector, totalAlas - alaIndex);
    for (let i = 0; i < setor1AlasCount; i++) {
      const a = alasList[alaIndex];
      elements.push({
        id: `ala_${alaIndex + 1}_${school.id}`,
        orderNumber: orderSeq++,
        type: 'ala',
        name: `Ala ${alaIndex + 1}: ${a.title}`,
        categoryLabel: `Ala ${alaIndex + 1}`,
        sectorNumber: 1,
        sectorTitle: setores[0].title,
        description: a.description,
        costumeDetails: a.costume,
        componentsCount: componentesPorAla,
        isAllegoryOrTripod: false
      });
      alaIndex++;
    }

    // Tripé 1 (se a escola possuir tripé)
    if (tripesCount >= 1) {
      const tripe1Data = this.generateTripod(narrative, school, 1, setores[0]);
      elements.push({
        id: `tripe_1_${school.id}`,
        orderNumber: orderSeq++,
        type: 'tripe',
        name: tripe1Data.name,
        categoryLabel: 'Elemento Cenográfico (Tripé 1)',
        sectorNumber: 1,
        sectorTitle: setores[0].title,
        description: tripe1Data.description,
        componentsCount: 2,
        isAllegoryOrTripod: true
      });
    }

    // Setor 2: Desenvolvimento da narrativa
    const setor2Index = Math.min(1, setores.length - 1);
    const setor2 = setores[setor2Index];

    // Ala das Baianas tradicional no Setor 2
    const baianasData = this.generateBaianas(narrative, school, baianasCount, setor2);
    elements.push({
      id: `baianas_${school.id}`,
      orderNumber: orderSeq++,
      type: 'baianas',
      name: baianasData.name,
      categoryLabel: 'Ala das Baianas',
      sectorNumber: setor2.sectorNumber,
      sectorTitle: setor2.title,
      description: baianasData.description,
      costumeDetails: baianasData.costume,
      highlightPeople: `Mães do Samba • ${baianasCount} Baianas em giro cerimonial`,
      componentsCount: baianasCount,
      isAllegoryOrTripod: false
    });

    // Alas do Setor 2
    const setor2AlasCount = Math.min(alasPerSector, totalAlas - alaIndex);
    for (let i = 0; i < setor2AlasCount; i++) {
      const a = alasList[alaIndex];
      elements.push({
        id: `ala_${alaIndex + 1}_${school.id}`,
        orderNumber: orderSeq++,
        type: 'ala',
        name: `Ala ${alaIndex + 1}: ${a.title}`,
        categoryLabel: `Ala ${alaIndex + 1}`,
        sectorNumber: setor2.sectorNumber,
        sectorTitle: setor2.title,
        description: a.description,
        costumeDetails: a.costume,
        componentsCount: componentesPorAla,
        isAllegoryOrTripod: false
      });
      alaIndex++;
    }

    // Alegoria 2 (se tiver 2 ou mais alegorias)
    if (alegoriasCount >= 2) {
      const alegoria2Data = this.generateFloat(narrative, school, 2, setor2);
      elements.push({
        id: `alegoria_2_${school.id}`,
        orderNumber: orderSeq++,
        type: 'alegoria',
        name: alegoria2Data.name,
        categoryLabel: 'Carro Alegórico 2',
        sectorNumber: setor2.sectorNumber,
        sectorTitle: setor2.title,
        description: alegoria2Data.description,
        componentsCount: 30,
        isAllegoryOrTripod: true
      });
    }

    // Setor 3: Bateria, Passistas e Clímax Popular
    const setor3Index = Math.min(2, setores.length - 1);
    const setor3 = setores[setor3Index];

    // Bateria Oficial
    const bateriaData = this.generateBateria(narrative, school, ritmistasCount, setor3);
    elements.push({
      id: `bateria_${school.id}`,
      orderNumber: orderSeq++,
      type: 'bateria',
      name: bateriaData.name,
      categoryLabel: 'Bateria dos Ritmistas',
      sectorNumber: setor3.sectorNumber,
      sectorTitle: setor3.title,
      description: bateriaData.description,
      costumeDetails: bateriaData.costume,
      highlightPeople: `Comandada pelo Mestre: ${school.staff?.mestreBateria?.name || 'Mestre da Bateria'}`,
      componentsCount: ritmistasCount,
      isAllegoryOrTripod: false
    });

    // Ala dos Passistas
    const passistasData = this.generatePassistas(narrative, school, setor3);
    elements.push({
      id: `passistas_${school.id}`,
      orderNumber: orderSeq++,
      type: 'passistas',
      name: passistasData.name,
      categoryLabel: 'Ala dos Passistas',
      sectorNumber: setor3.sectorNumber,
      sectorTitle: setor3.title,
      description: passistasData.description,
      costumeDetails: passistasData.costume,
      componentsCount: 45,
      isAllegoryOrTripod: false
    });

    // 2º Casal de MS e PB
    elements.push({
      id: `casal_2_${school.id}`,
      orderNumber: orderSeq++,
      type: 'casal_mspb',
      name: `2º Casal de MS & PB: A Nobreza e os Mistérios de ${narrative.mainSubject}`,
      categoryLabel: '2º Casal de MS & PB',
      sectorNumber: setor3.sectorNumber,
      sectorTitle: setor3.title,
      description: `Elegância e reverência ao pavilhão secundário, exaltando os tons temáticos de ${narrative.mainSubject}.`,
      costumeDetails: `Indumentária luxuosa nas cores ${school.colors.primary} e ${school.colors.secondary} com detalhes ornamentais.`,
      componentsCount: 2,
      isAllegoryOrTripod: false
    });

    // Alas do Setor 3
    const setor3AlasCount = Math.min(alasPerSector, totalAlas - alaIndex);
    for (let i = 0; i < setor3AlasCount; i++) {
      const a = alasList[alaIndex];
      elements.push({
        id: `ala_${alaIndex + 1}_${school.id}`,
        orderNumber: orderSeq++,
        type: 'ala',
        name: `Ala ${alaIndex + 1}: ${a.title}`,
        categoryLabel: `Ala ${alaIndex + 1}`,
        sectorNumber: setor3.sectorNumber,
        sectorTitle: setor3.title,
        description: a.description,
        costumeDetails: a.costume,
        componentsCount: componentesPorAla,
        isAllegoryOrTripod: false
      });
      alaIndex++;
    }

    // Alegoria 3 (se tiver 3 ou mais alegorias)
    if (alegoriasCount >= 3) {
      const alegoria3Data = this.generateFloat(narrative, school, 3, setor3);
      elements.push({
        id: `alegoria_3_${school.id}`,
        orderNumber: orderSeq++,
        type: 'alegoria',
        name: alegoria3Data.name,
        categoryLabel: 'Carro Alegórico 3',
        sectorNumber: setor3.sectorNumber,
        sectorTitle: setor3.title,
        description: alegoria3Data.description,
        componentsCount: 28,
        isAllegoryOrTripod: true
      });
    }

    // Tripé 2 (se a escola possuir 2 ou mais tripés)
    if (tripesCount >= 2) {
      const tripe2Data = this.generateTripod(narrative, school, 2, setor3);
      elements.push({
        id: `tripe_2_${school.id}`,
        orderNumber: orderSeq++,
        type: 'tripe',
        name: tripe2Data.name,
        categoryLabel: 'Elemento Cenográfico (Tripé 2)',
        sectorNumber: setor3.sectorNumber,
        sectorTitle: setor3.title,
        description: tripe2Data.description,
        componentsCount: 2,
        isAllegoryOrTripod: true
      });
    }

    // Setor 4: Apoteose, Velha Guarda e Alas Finais
    const setor4Index = setores.length - 1;
    const setor4 = setores[setor4Index];

    // Demais alas restantes até completar o total
    while (alaIndex < totalAlas) {
      const a = alasList[alaIndex];
      elements.push({
        id: `ala_${alaIndex + 1}_${school.id}`,
        orderNumber: orderSeq++,
        type: 'ala',
        name: `Ala ${alaIndex + 1}: ${a.title}`,
        categoryLabel: `Ala ${alaIndex + 1}`,
        sectorNumber: setor4.sectorNumber,
        sectorTitle: setor4.title,
        description: a.description,
        costumeDetails: a.costume,
        componentsCount: componentesPorAla,
        isAllegoryOrTripod: false
      });
      alaIndex++;
    }

    // Carros intermediários adicionais (Alegoria 4, etc.)
    for (let carNum = 4; carNum < alegoriasCount; carNum++) {
      const floatData = this.generateFloat(narrative, school, carNum, setor4);
      elements.push({
        id: `alegoria_${carNum}_${school.id}`,
        orderNumber: orderSeq++,
        type: 'alegoria',
        name: floatData.name,
        categoryLabel: `Carro Alegórico ${carNum}`,
        sectorNumber: setor4.sectorNumber,
        sectorTitle: setor4.title,
        description: floatData.description,
        componentsCount: 26,
        isAllegoryOrTripod: true
      });
    }

    // Velha Guarda tradicional antes do último carro
    const vgData = this.generateVelhaGuarda(narrative, school, setor4);
    elements.push({
      id: `velha_guarda_${school.id}`,
      orderNumber: orderSeq++,
      type: 'velha_guarda',
      name: vgData.name,
      categoryLabel: 'Velha Guarda',
      sectorNumber: setor4.sectorNumber,
      sectorTitle: setor4.title,
      description: vgData.description,
      costumeDetails: vgData.costume,
      componentsCount: 30,
      isAllegoryOrTripod: false
    });

    // Última Alegoria
    if (alegoriasCount >= 1) {
      const lastFloatNum = alegoriasCount;
      const apoteoseData = this.generateApoteoseFloat(narrative, school, lastFloatNum, setor4);
      elements.push({
        id: `alegoria_apoteose_${school.id}`,
        orderNumber: orderSeq++,
        type: 'apoteose',
        name: apoteoseData.name,
        categoryLabel: `Última Alegoria (Carro ${lastFloatNum})`,
        sectorNumber: setor4.sectorNumber,
        sectorTitle: setor4.title,
        description: apoteoseData.description,
        highlightPeople: 'Destaques de Luxo & Grande Obra Escultórica',
        componentsCount: 35,
        isAllegoryOrTripod: true
      });
    }

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
      obrigatoriedades: {
        totalComponentes: componentesTotal,
        totalAlas,
        totalAlegorias: alegoriasCount,
        totalTripes: tripesCount,
        ritmistasCount,
        baianasCount,
        comissaoDeFrenteCount: comissaoCount,
        componentesPorAla,
        casaisCount: 2
      },
      setores,
      elements
    };
  }

  /**
   * Extrai e deconstrói de forma inteligente o perfil narrativo exclusivo do enredo
   */
  private static extractNarrativeProfile(enredo: Enredo, school: School): EnredoNarrativeProfile {
    const rawTitle = enredo.title || 'A Festa da Raiz do Samba';
    const cleanTitle = rawTitle
      .replace(/^(No Rufar da Bateria:|Baluartes da Eternidade:|O Espelho das Águas de:|No Reinos dos Encantados:|A Dança dos Quatro Cantos:|O Auto da Resistência:|Flores e Espinhos de:|A Magia que Renasce em:|O Cortejo Triunfal de:|Sob a Bênção dos Céus:|O Povo Canta e Dança:)\s*/i, '')
      .trim();

    let mainSubject = cleanTitle;
    let subTitle = '';

    if (cleanTitle.includes(':')) {
      const parts = cleanTitle.split(':');
      mainSubject = parts[0].trim();
      subTitle = parts.slice(1).join(':').trim();
    } else if (cleanTitle.includes(' - ')) {
      const parts = cleanTitle.split(' - ');
      mainSubject = parts[0].trim();
      subTitle = parts.slice(1).join(' - ').trim();
    } else {
      subTitle = `A Epopeia de ${mainSubject}`;
    }

    const synopsis = enredo.synopsis || `Uma narrativa monumental desdobrando ${mainSubject}.`;

    // Verifica se a sinopse já possui descrição explícita de setores
    const s1Match = synopsis.match(/No Setor 1,\s*([^.]+)/i);
    const s2Match = synopsis.match(/No Setor 2,\s*([^.]+)/i);
    const s3Match = synopsis.match(/No Setor 3,\s*([^.]+)/i);
    const s4Match = synopsis.match(/No Setor 4,\s*([^.]+)/i);

    const sector1Synopsis = s1Match
      ? s1Match[1].trim()
      : `O descortinar das obras e recriações artísticas inspiradas nas lendas e tradições de ${mainSubject}.`;

    const sector2Synopsis = s2Match
      ? s2Match[1].trim()
      : `As cores, figuras e paisagens culturais que dão vida à história de ${subTitle || mainSubject}.`;

    const sector3Synopsis = s3Match
      ? s3Match[1].trim()
      : `A cadência rítmica e as expressões populares da comunidade em torno de ${mainSubject}.`;

    const sector4Synopsis = s4Match
      ? s4Match[1].trim()
      : `O legado imortal e as grandes criações artísticas que celebram ${mainSubject} no manto da ${school.shortName}.`;

    return {
      mainSubject,
      subTitle,
      synopsis,
      themeType: enredo.themeType,
      sector1Synopsis,
      sector2Synopsis,
      sector3Synopsis,
      sector4Synopsis
    };
  }

  /**
   * Constrói os 4 setores oficiais diretamente com base no enredo apresentado pela escola
   */
  private static generateSectors(narrative: EnredoNarrativeProfile): ParadeSector[] {
    return [
      {
        sectorNumber: 1,
        title: `Setor 1: O Despertar Artístico de ${narrative.mainSubject}`,
        themeSynopsis: narrative.sector1Synopsis
      },
      {
        sectorNumber: 2,
        title: `Setor 2: Painel Cultural: ${narrative.mainSubject} - ${narrative.subTitle || 'Tradições Vivas'}`,
        themeSynopsis: narrative.sector2Synopsis
      },
      {
        sectorNumber: 3,
        title: `Setor 3: O Canto Coletivo e a Emoção Popular de ${narrative.mainSubject}`,
        themeSynopsis: narrative.sector3Synopsis
      },
      {
        sectorNumber: 4,
        title: `Setor 4: O Legado Imortal e a Glória de ${narrative.mainSubject}`,
        themeSynopsis: narrative.sector4Synopsis
      }
    ];
  }

  private static generateComissaoDeFrente(
    narrative: EnredoNarrativeProfile,
    school: School,
    count: number,
    sector: ParadeSector
  ) {
    const name = `Comissão de Frente: O Despertar Cênico de ${narrative.mainSubject}`;
    const description = `Teatralização de impacto em que ${count} bailarinos encenam o prólogo do enredo. A coreografia dialoga com a ancestralidade e os símbolos de ${narrative.mainSubject}, realizando transformações e ilusionismos na frente dos módulos de jurados.`;
    const costume = `Indumentária dramática integrando as cores ${school.colors.primary} e ${school.colors.secondary} com tecidos acetinados, texturas cênicas e adereços característicos do universo de ${narrative.mainSubject}.`;

    return { name, description, costume };
  }

  private static generateFirstCouple(
    narrative: EnredoNarrativeProfile,
    school: School,
    sector: ParadeSector
  ) {
    const name = `1º Casal de MS & PB: A Nobreza e a Alma Sagrada de ${narrative.mainSubject}`;
    const description = `O Mestre-Sala e a Porta-Bandeira rodopiam com elegância e reverência ao pavilhão, personificando a essência lírica de ${narrative.mainSubject} e cortejando o público com passos nobres e bailado clássico.`;
    const costume = `Fantasia de gala com resplendores dourados e prateados, rica em pedrarias reluzentes, plumas majestosas e bordados manuais nas cores oficiais ${school.colors.primary} e ${school.colors.secondary}.`;

    return { name, description, costume };
  }

  private static generateAbreAlas(
    narrative: EnredoNarrativeProfile,
    school: School,
    sector: ParadeSector
  ) {
    const name = `Abre-Alas: O Monumental Portal de ${narrative.mainSubject}`;
    const description = `Alegoria de abertura suntuosa apresentando o símbolo da ${school.shortName} integrado aos elementos fundadores de ${narrative.mainSubject}. Esculturas monumentais com articulações mecânicas, efeitos de iluminação cênica e fumaça fria abrem o desfile com grandiosidade plástica.`;
    const structure = `Carro acoplado com cerca de 45 metros de extensão, detalhes nos tons ${school.colors.primary} e ${school.colors.secondary}, iluminação computadorizada e fontes cenográficas.`;

    return { name, description, structure };
  }

  private static generateTripod(
    narrative: EnredoNarrativeProfile,
    school: School,
    tripNum: number,
    sector: ParadeSector
  ) {
    const name = tripNum === 1
      ? `Tripé 1: O Altar dos Mistérios de ${narrative.mainSubject}`
      : `Tripé 2: O Relicário Popular e a Chama de ${narrative.mainSubject}`;
    const description = `Elemento cenográfico móvel articulado com iluminação própria e detalhes esculturais, ilustrando a transição do ${sector.title}.`;

    return { name, description };
  }

  private static generateBaianas(
    narrative: EnredoNarrativeProfile,
    school: School,
    count: number,
    sector: ParadeSector
  ) {
    const name = `Ala das Baianas: As Mães Guardiãs e as Bênçãos de ${narrative.mainSubject}`;
    const description = `${count} matriarcas rodando em harmonia solene, espalhando axé, ternura e alfazema pela pista, abençoando o percurso do enredo.`;
    const costume = `Vestido rodado com bordados artesanais em richelieu, panos da costa autênticos, anáguas engomadas e turbantes ornados com pedrarias e guias sagradas alusivas a ${narrative.mainSubject}.`;

    return { name, description, costume };
  }

  private static generateFloat(
    narrative: EnredoNarrativeProfile,
    school: School,
    floatNumber: number,
    sector: ParadeSector
  ) {
    let name = `Carro ${floatNumber}: A Travessia e os Desafios de ${narrative.mainSubject}`;
    let description = `Segunda alegoria desenvolvendo os conflitos, a jornada histórica e as paisagens culturais do tema.`;

    if (floatNumber === 3) {
      name = `Carro 3: O Ponto Alto e a Celebração de ${narrative.mainSubject}`;
      description = `Terceira alegoria retratando o clímax artístico e a comoção popular do terceiro setor narrativo.`;
    } else if (floatNumber >= 4) {
      name = `Carro ${floatNumber}: A Sabedoria e o Legado Vivo de ${narrative.mainSubject}`;
      description = `Alegoria monumental pavimentando o caminho para o encerramento do espetáculo.`;
    }

    return { name, description };
  }

  private static generateBateria(
    narrative: EnredoNarrativeProfile,
    school: School,
    count: number,
    sector: ParadeSector
  ) {
    const name = `Bateria da ${school.shortName}: Os Guardiões do Batuque de ${narrative.mainSubject}`;
    const description = `${count} ritmistas sustentando o andamento compassado com caixas, repiques, tamborins e surdos, executando bossas e paradinhas que dialogam diretamente com a musicalidade de ${narrative.mainSubject}.`;
    const costume = `Fantasia leve e ergonômica representando os personagens e operários da arte de ${narrative.mainSubject}, permitindo pleno movimento aos músicos com chapéus temáticos e adereços reluzentes.`;

    return { name, description, costume };
  }

  private static generatePassistas(
    narrative: EnredoNarrativeProfile,
    school: School,
    sector: ParadeSector
  ) {
    const name = `Ala dos Passistas: O Furor do Samba e a Alegria de ${narrative.mainSubject}`;
    const description = `Espinha dorsal do samba no pé, com passos velozes, malandragem e cadência frenética celebrando o clímax da narrativa.`;
    const costume = `Indumentária festiva nas cores ${school.colors.primary} e ${school.colors.secondary}, com franjas cintilantes e penas leves que vibram a cada volteio do corpo.`;

    return { name, description, costume };
  }

  private static generateVelhaGuarda(
    narrative: EnredoNarrativeProfile,
    school: School,
    sector: ParadeSector
  ) {
    const name = `Velha Guarda: Os Baluartes e a Memória Imortal de ${narrative.mainSubject}`;
    const description = `Os mestres fundadores e matriarcas da agremiação desfilam com garbo aristocrático, abençoando o encerramento do cortejo e celebrando a história da escola e de ${narrative.mainSubject}.`;
    const costume = `Casacas e ternos clássicos de linho com corte imperial nas cores ${school.colors.primary} e ${school.colors.secondary}, com chapéus de aba e medalhas de honra ao mérito.`;

    return { name, description, costume };
  }

  private static generateApoteoseFloat(
    narrative: EnredoNarrativeProfile,
    school: School,
    floatNum: number,
    sector: ParadeSector
  ) {
    const cleanName = cleanSchoolName(school);
    const name = `Carro ${floatNum}: O Grande Monumento Artístico a ${narrative.mainSubject}`;
    const description = `Monumental alegoria de encerramento, homenageando o tema sob arcos dourados, efeitos de luz cenográfica, chuva de papel picado e o pavilhão sagrado da ${cleanName} reluzindo no topo do Carnaval.`;

    return { name, description };
  }

  /**
   * Gera uma lista de alas 100% contextualizadas no enredo da agremiação
   */
  private static generateThematicAlas(
    narrative: EnredoNarrativeProfile,
    school: School,
    totalAlas: number,
    sectors: ParadeSector[]
  ): Array<{ title: string; description: string; costume: string }> {
    const result: Array<{ title: string; description: string; costume: string }> = [];
    const subj = narrative.mainSubject;
    const sub = narrative.subTitle || subj;

    // Modelos dinâmicos por setor narrativo
    const sectorTemplates = [
      // Setor 1: Origem, despertar, raízes
      [
        { prefix: 'Os Portais Sagrados de', suffix: 'e a Alvorada dos Tempos', action: 'evocando o nascimento místico e os primeiros sinais' },
        { prefix: 'As Lendas Ancestrais de', suffix: 'no Berço das Tradições', action: 'retratando as lendas culturais e o solo onde tudo começou' },
        { prefix: 'Os Guardiões Primordiais de', suffix: 'e a Força da Memória', action: 'os ancestrais e pioneiros que abriram as sendas históricas' },
        { prefix: 'O Despertar das Águas e Matas de', suffix: 'na Aurora do Brasil', action: 'a conexão com as forças vitais da natureza e o ambiente primordial' },
        { prefix: 'Os Primeiros Acordes e Ritos de', suffix: 'sob a Luz dos Astros', action: 'a inspiração artística brotando nos primeiros cânticos' },
        { prefix: 'A Meninice dos Sonhos de', suffix: 'e o Olhar no Infinito', action: 'a pureza dos primeiros passos que moldaram o destino' },
        { prefix: 'As Chamas da Criação de', suffix: 'no Altar da Passarela', action: 'o fogo sagrado da criatividade rompendo a escuridão' }
      ],
      // Setor 2: Travessia, história, lutas, caminhada
      [
        { prefix: 'A Caravana das Veredas de', suffix: 'e a Labuta do Povo', action: 'o percurso heróico e a dignidade dos trabalhadores anônimos' },
        { prefix: 'O Florescer Cultural de', suffix: 'nas Ruas e Cidades', action: 'a expansão das ideias e o encontro fértil com novos horizontes' },
        { prefix: 'As Batalhas e a Resistência de', suffix: 'contra as Correntes', action: 'a coragem dos que ergueram a voz pela liberdade e dignidade' },
        { prefix: 'Os Caminhos de Ferro e Barro de', suffix: 'na Marcha do Progresso', action: 'os trilhos, estradas e caminhos que uniram as comunidades' },
        { prefix: 'A Força das Mulheres em', suffix: 'e o Fio da Esperança', action: 'a liderança feminina tecendo a trama da resistência' },
        { prefix: 'O Encontro dos Mestres de', suffix: 'no Coração do Brasil', action: 'o abraço de diferentes tradições compondo uma rica identidade' },
        { prefix: 'A Sabedoria dos Artesãos de', suffix: 'e o Ofício da Beleza', action: 'as mãos dedicadas que moldaram a arte com alma e devoção' }
      ],
      // Setor 3: Celebração, ritmo, festa comunitária, ritos
      [
        { prefix: 'O Canto Coletivo em Louvor a', suffix: 'na Festa Popular', action: 'a explosão de vozes em uníssono celebrando a riqueza do tema' },
        { prefix: 'Os Ritos Mágicos e Terreiros de', suffix: 'sob o Toque do Tambor', action: 'a fé inabalável que move os corações e sustenta a tradição' },
        { prefix: 'A Dança das Fitilhas e Bandeiras de', suffix: 'na Folia do Povo', action: 'o colorido vibrante dos festejos regionais contagiando a pista' },
        { prefix: 'A Primavera das Cores de', suffix: 'no Asfalto da Paixão', action: 'a celebração da diversidade estética e poética na avenida' },
        { prefix: 'Os Poetas e Cantadores de', suffix: 'com Viola e Tamborim', action: 'a rima popular que eternizou causos, versos e memórias' },
        { prefix: 'A Comunidade em Festa com', suffix: 'no Coração do Samba', action: 'o orgulho do povo desfilando com sorriso e suor de alegria' },
        { prefix: 'O Clarim da Vitória de', suffix: 'ecoando na Madrugada', action: 'a emoção vibrante que arrepia as arquibancadas' }
      ],
      // Setor 4: Legado, apoteose, eternidade
      [
        { prefix: 'A Herança Viva e o Futuro de', suffix: 'nas Mãos da Juventude', action: 'as novas gerações recebendo a tocha sagrada do conhecimento' },
        { prefix: 'A Coroação Imortal de', suffix: 'no Templo de Momo', action: 'o reconhecimento definitivo da grandiosidade do enredo' },
        { prefix: 'O Espelho dos Campeões e', suffix: 'sob a Luz da Glória', action: 'a aclamação dos jurados e do público com nota máxima no coração' },
        { prefix: 'A Epopeia Eterna de', suffix: 'eternizada no Pavilhão', action: 'o selo indelével do enredo na história gloriosa da agremiação' },
        { prefix: 'O Grande Abraço do Samba a', suffix: 'na Emoção do Povo', action: 'a celebração final em grande coro de luz, amor e festa' },
        { prefix: 'A Constelação Dourada de', suffix: 'brilhando no Céu do Rio', action: 'o brilho eterno que nunca se apagará da memória do Carnaval' },
        { prefix: 'A Bênção dos Imortais a', suffix: 'no Asfalto Sagrado', action: 'a chancela dos antepassados acolhendo a passagem vitoriosa' }
      ]
    ];

    const alasPerSector = Math.ceil(totalAlas / 4);

    for (let alaNum = 1; alaNum <= totalAlas; alaNum++) {
      const sectorIdx = Math.min(3, Math.floor((alaNum - 1) / alasPerSector));
      const pool = sectorTemplates[sectorIdx];
      const template = pool[(alaNum - 1) % pool.length];

      const title = `${template.prefix} ${subj} ${template.suffix}`.replace(/\s+/g, ' ').trim();
      const description = `Ala que emociona o ${sectors[sectorIdx].title}, ${template.action} com rigor plástico e evolução impecável.`;
      const costume = `Indumentária luxuosa nas cores ${school.colors.primary} e ${school.colors.secondary}, com adereços de cabeça estilizados, tecidos acetinados e materiais alusivos a ${subj}.`;

      result.push({ title, description, costume });
    }

    return result;
  }
}
