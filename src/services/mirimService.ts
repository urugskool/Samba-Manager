import { QuesitoId, School } from '../types/carnaval';
import {
  CreateMirimSchoolParams,
  EspecialMirimComplianceStatus,
  MirimEnredoRecord,
  MirimParadeSlotId,
  MirimSchool,
  MirimSeasonEvent,
  MirimTalent,
  MirimTalentRole,
} from '../types/mirim';
import { INITIAL_MIRIM_SCHOOLS } from '../data/mirimData';
import { cleanSchoolName } from '../utils/schoolNameUtils';

export const MIRIM_MAX_ESPECIAL_YEARS_WITHOUT_MIRIM = 2;
export const LIESA_SOCIAL_PROJECT_BASE_GRANT = 220000;

interface MirimEnredoTemplate {
  titlePattern: (mirim: MirimSchool) => string;
  synopsisPattern: (mirim: MirimSchool) => string;
  themeType: string;
}

const MIRIM_ENREDO_TEMPLATES: MirimEnredoTemplate[] = [
  {
    titlePattern: (m) => `Brincadeiras de Quintal: A ${m.abbreviation || m.calledName} Canta a Infância Carioca`,
    synopsisPattern: (m) =>
      `Pipa no céu, amarelinha no chão e cantigas de roda ganham cores vibrantes na Sapucaí com a garotada da ${m.calledName}.`,
    themeType: 'Lúdico',
  },
  {
    titlePattern: (m) => `Fábulas da Floresta Encantada: Guardiões do Amanhã`,
    synopsisPattern: (m) =>
      `A ${m.calledName} mergulha nos mistérios das matas brasileiras para ensinar o respeito à natureza através do ritmo e da fantasia.`,
    themeType: 'Ambiental & Natureza',
  },
  {
    titlePattern: (m) => `Contos de Avó e Sabedoria Ancestral: A Herança que Nos Guia`,
    synopsisPattern: (m) =>
      `Narrativas afro-brasileiras, griôs e a memória das matriarcas do samba inspiram o cortejo juvenil de ${m.neighborhood || m.city}.`,
    themeType: 'Afro-brasileiro',
  },
  {
    titlePattern: (m) => `No Picadeiro da Alegria: O Grande Circo da ${m.abbreviation || m.calledName}`,
    synopsisPattern: (m) =>
      `Malabaristas, palhaços, mágicos e acrobatas transformam a Marquês de Sapucaí em uma lona colorida comandada pelas crianças.`,
    themeType: 'Lúdico',
  },
  {
    titlePattern: (m) => `Pequenos Inventores do Futuro: Ciência, Arte e Samba no Pé`,
    synopsisPattern: (m) =>
      `Entre foguetes de papelão, telescópios e cadernos escolares, os jovens da ${m.calledName} mostram que o conhecimento abre caminhos.`,
    themeType: 'Ciência & Tecnologia',
  },
  {
    titlePattern: (m) => `Aquarela do Folclore Brasileiro: Saci, Iara e Boi-Bumbá na Avenida`,
    synopsisPattern: (m) =>
      `As lendas mais queridas do Brasil ganham vida em alas lúdicas preparadas pelas oficinas culturais da ${m.calledName}.`,
    themeType: 'Folclore & Lendas',
  },
  {
    titlePattern: (m) => `Memórias de ${m.neighborhood || m.city}: Nosso Bairro, Nossa Escola, Nossa Raiz`,
    synopsisPattern: (m) =>
      `Uma declaração de amor às ruas, praças e personagens populares de ${m.neighborhood || m.city}, contada pelos olhos das novas gerações.`,
    themeType: 'Regional',
  },
  {
    titlePattern: (m) => `Livros que Criam Asas: A Biblioteca Mágica da ${m.abbreviation || m.calledName}`,
    synopsisPattern: (m) =>
      `Literatura infantojuvenil, cordel e poesia brasileira se encontram na passarela para celebrar o poder transformador da leitura.`,
    themeType: 'Literário & Artes',
  },
  {
    titlePattern: (m) => `Tambores do Amanhã: A Bateria Mirim Faz a Terra Tremer`,
    synopsisPattern: (m) =>
      `Homenagem às oficinas de percussão que formam novos mestres de bateria e mantêm acesa a chama do samba carioca.`,
    themeType: 'Cultural',
  },
  {
    titlePattern: (m) => `Sinfonia das Águas: Dos Rios à Baía de Guanabara`,
    synopsisPattern: (m) =>
      `A importância da água, dos mares e das lagoas do Rio de Janeiro em um desfile colorido e educativo assinado pela ${m.calledName}.`,
    themeType: 'Ambiental & Natureza',
  },
  {
    titlePattern: (m) => `Estrelas da Quadra: Homenagem aos Baluartes que Ensinaram a Sambar`,
    synopsisPattern: (m) =>
      `A velha guarda e as baianas passam o bastão simbólico às crianças da ${m.calledName}, celebrando o encontro entre gerações.`,
    themeType: 'Homenagem',
  },
  {
    titlePattern: (m) => `Aventura Espacial no Samba: Viajando Pelos Planetas da Imaginação`,
    synopsisPattern: (m) =>
      `Com trajes siderais e alegria contagiante, a meninada de ${m.neighborhood || m.city} parte em missão festiva pela galáxia do carnaval.`,
    themeType: 'Lúdico',
  },
];

const TALENT_FIRST_NAMES = [
  'Lucas', 'Enzo', 'Cauã', 'Gabriel', 'Matheus', 'Pedro', 'Davi', 'João', 'Heitor', 'Bernardo',
  'Rafael', 'Arthur', 'Caio', 'Theo', 'Breno', 'Samuel', 'Vinícius', 'Gustavo', 'Kauan', 'Luan',
  'Beatriz', 'Sophia', 'Larissa', 'Manuela', 'Yasmin', 'Clara', 'Helena', 'Giovanna', 'Isabela', 'Valentina',
  'Nicole', 'Camila', 'Lívia', 'Mariana', 'Laura', 'Sofia', 'Júlia', 'Alice', 'Melissa', 'Ana Luiza',
];

const TALENT_ROLES: Array<{
  role: MirimTalentRole;
  roleLabel: string;
  targetQuesito: QuesitoId;
}> = [
  { role: 'ritmista', roleLabel: 'Ritmista de Base', targetQuesito: 'bateria' },
  { role: 'passista', roleLabel: 'Passista Mirim', targetQuesito: 'evolucao' },
  { role: 'casal_mspb', roleLabel: 'Casal Mirim de MS/PB', targetQuesito: 'mestreSalaPortaBandeira' },
  { role: 'compositor', roleLabel: 'Compositor Juvenil', targetQuesito: 'sambaEnredo' },
  { role: 'carnavalesco_juvenil', roleLabel: 'Carnavalesco Juvenil', targetQuesito: 'fantasias' },
  { role: 'interprete_mirim', roleLabel: 'Intérprete Mirim', targetQuesito: 'harmonia' },
];

const AUTO_MIRIM_PREFIXES = [
  'Sementes da',
  'Herdeiros da',
  'Pimpolhos da',
  'Estrelinhas da',
  'Futura Geração da',
  'Crias da',
];

const PARADE_HIGHLIGHTS = [
  'Apresentação contagiante sem julgamento oficial: arquibancadas aplaudiram de pé a bateria mirim.',
  'Crianças e adolescentes deram um show de alegria, civismo e amor ao samba na Marquês de Sapucaí.',
  'Desfile festivo celebrado pela LIESA, destacando o casal mirim e a energia das alas infantis.',
  'Evolução solta e emocionante na passarela, revelando novos talentos para o futuro do Carnaval Carioca.',
  'Comunidade lotou os setores populares da Sapucaí para prestigiar a nova geração do samba.',
];

function deterministicHash(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export class MirimService {
  /**
   * Calcula a verba anual de uma Escola Mirim conforme origem:
   * - Escola-Mãe: proporcional à divisão da escola-mãe e nível da base
   * - Projeto Social (sem escola-mãe): verba fixa garantida pela LIESA + bônus de estrutura
   */
  static calculateAnnualGrant(mirim: MirimSchool, adultSchools: School[]): number {
    if (mirim.isSocialProject || !mirim.motherSchoolId) {
      return LIESA_SOCIAL_PROJECT_BASE_GRANT + (mirim.academyLevel - 1) * 18000;
    }

    const mother = adultSchools.find((s) => s.id === mirim.motherSchoolId);
    if (!mother) {
      return LIESA_SOCIAL_PROJECT_BASE_GRANT;
    }

    const divisionBase: Record<School['division'], number> = {
      especial: 310000,
      ouro: 215000,
      prata: 145000,
      bronze: 110000,
      avaliacao: 85000,
    };

    const base = divisionBase[mother.division] ?? 140000;
    return base + (mirim.academyLevel - 1) * 20000;
  }

  /**
   * Distribui oficialmente o calendário de 4 dias da LIESA na Marquês de Sapucaí (SEM JULGAMENTO):
   * - 8 escolas mirins desfilam nos 3 dias de Ensaios Técnicos (31/01, 01/02 e 08/02, às 18h -> 3 + 3 + 2)
   * - As demais (12+ escolas mirins) desfilam no dia principal (Sexta-feira Pós-Carnaval, na Sapucaí)
   * Prioriza manter escolas do Grupo Especial na Sexta-feira principal quando possível, respeitando a proporção oficial.
   */
  static assignSapucaiSchedule(
    mirims: MirimSchool[],
    year: number,
    adultSchools: School[] = []
  ): MirimSchool[] {
    const especialIds = new Set(
      adultSchools.filter((s) => s.division === 'especial').map((s) => s.id)
    );

    const cloned = mirims.map((m) => ({ ...m }));

    // Ordena deterministicamente por ano para variar suavemente a ordem de desfile
    const nonEspecialCandidates = cloned
      .filter((m) => !m.motherSchoolId || !especialIds.has(m.motherSchoolId))
      .sort((a, b) => deterministicHash(`${a.id}_${year}`) - deterministicHash(`${b.id}_${year}`));

    const especialMirims = cloned
      .filter((m) => m.motherSchoolId && especialIds.has(m.motherSchoolId))
      .sort((a, b) => deterministicHash(`${a.id}_${year}`) - deterministicHash(`${b.id}_${year}`));

    // Exatamente 8 escolas mirins nos 3 dias de Ensaios Técnicos (se houver >= 8 escolas)
    const technicalTarget = Math.min(8, cloned.length);
    const technicalList: MirimSchool[] = [];

    for (const candidate of nonEspecialCandidates) {
      if (technicalList.length < technicalTarget) {
        technicalList.push(candidate);
      }
    }
    for (const candidate of especialMirims) {
      if (technicalList.length < technicalTarget) {
        technicalList.push(candidate);
      }
    }

    const technicalSet = new Set(technicalList.map((m) => m.id));
    const fridayList = cloned
      .filter((m) => !technicalSet.has(m.id))
      .sort((a, b) => deterministicHash(`${a.id}_fri_${year}`) - deterministicHash(`${b.id}_fri_${year}`));

    const scheduleById = new Map<string, MirimSchool['paradeSchedule']>();

    // 31/01 (3 escolas), 01/02 (3 escolas), 08/02 (2 escolas) — sempre às 18h
    technicalList.forEach((m, idx) => {
      let slotId: MirimParadeSlotId = 'ensaio_tecnico_1';
      let dayTitle = '1º Dia de Ensaios Técnicos Mirins';
      let dateLabel = `31 de Janeiro de ${year}`;
      let orderInDay = idx + 1;

      if (idx >= 3 && idx < 6) {
        slotId = 'ensaio_tecnico_2';
        dayTitle = '2º Dia de Ensaios Técnicos Mirins';
        dateLabel = `1º de Fevereiro de ${year}`;
        orderInDay = idx - 2;
      } else if (idx >= 6) {
        slotId = 'ensaio_tecnico_3';
        dayTitle = '3º Dia de Ensaios Técnicos Mirins';
        dateLabel = `8 de Fevereiro de ${year}`;
        orderInDay = idx - 5;
      }

      scheduleById.set(m.id, {
        slotId,
        dayTitle,
        dateLabel,
        timeLabel: '18h',
        orderInDay,
        venue: 'Sambódromo da Marquês de Sapucaí',
        isTechnicalRehearsal: true,
        completed: false,
      });
    });

    fridayList.forEach((m, idx) => {
      scheduleById.set(m.id, {
        slotId: 'desfile_principal',
        dayTitle: 'Desfile Oficial das Escolas Mirins (Sexta-feira)',
        dateLabel: `Sexta-feira das Mirins • Carnaval ${year}`,
        timeLabel: '18h',
        orderInDay: idx + 1,
        venue: 'Sambódromo da Marquês de Sapucaí',
        isTechnicalRehearsal: false,
        completed: false,
      });
    });

    return cloned.map((m) => ({
      ...m,
      hasParadedThisYear: false,
      paradeSchedule: scheduleById.get(m.id) || m.paradeSchedule,
    }));
  }

  /**
   * Garante compatibilidade com saves antigos e mescla novas escolas oficiais da base
   * sem sobrescrever customizações ou escolas criadas automaticamente durante o jogo.
   */
  static sanitizeMirimSchools(
    savedMirims: MirimSchool[] | undefined,
    adultSchools: School[],
    currentYear: number
  ): MirimSchool[] {
    if (!Array.isArray(savedMirims) || savedMirims.length === 0) {
      const seeded = INITIAL_MIRIM_SCHOOLS.map((m) => {
        const annualGrant = this.calculateAnnualGrant(m, adultSchools);
        return {
          ...m,
          annualGrant,
          budget: annualGrant,
          currentEnredo: { ...m.currentEnredo, year: currentYear },
          talents: m.talents.map((t) => ({ ...t })),
          enredoHistory: [...m.enredoHistory],
          paradeSchedule: { ...m.paradeSchedule },
        };
      });
      return this.assignSapucaiSchedule(seeded, currentYear, adultSchools);
    }

    const byId = new Map<string, MirimSchool>();
    for (const saved of savedMirims) {
      if (saved && saved.id) {
        byId.set(saved.id, saved);
      }
    }

    // Garante que todas as 21 escolas oficiais estejam presentes em saves antigos
    for (const official of INITIAL_MIRIM_SCHOOLS) {
      if (!byId.has(official.id)) {
        const annualGrant = this.calculateAnnualGrant(official, adultSchools);
        byId.set(official.id, {
          ...official,
          annualGrant,
          budget: annualGrant,
          currentEnredo: { ...official.currentEnredo, year: currentYear },
          talents: official.talents.map((t) => ({ ...t })),
          enredoHistory: [],
          paradeSchedule: { ...official.paradeSchedule },
        });
      }
    }

    const merged = Array.from(byId.values()).map((m) => {
      const mother = m.motherSchoolId
        ? adultSchools.find((s) => s.id === m.motherSchoolId)
        : undefined;
      return {
        ...m,
        motherSchoolName: mother ? cleanSchoolName(mother.name) : m.motherSchoolName,
        fundingSource: m.isSocialProject || !m.motherSchoolId ? 'liesa_projeto_social' : 'escola_mae',
        annualGrant: m.annualGrant || this.calculateAnnualGrant(m, adultSchools),
        talents: Array.isArray(m.talents) ? m.talents : [],
        enredoHistory: Array.isArray(m.enredoHistory) ? m.enredoHistory : [],
      } as MirimSchool;
    });

    // Se algum registro perdeu agenda, reatribui com segurança
    const hasMissingSchedule = merged.some((m) => !m.paradeSchedule || !m.paradeSchedule.slotId);
    return hasMissingSchedule ? this.assignSapucaiSchedule(merged, currentYear, adultSchools) : merged;
  }

  /**
   * Gera um novo enredo próprio para uma Escola Mirim em determinado ano, sem repetir títulos anteriores.
   */
  static generateMirimEnredo(mirim: MirimSchool, year: number): MirimEnredoRecord {
    const usedTitles = new Set<string>([
      mirim.currentEnredo?.title || '',
      ...(mirim.enredoHistory || []).map((e) => e.title),
    ]);

    const startIdx = deterministicHash(`${mirim.id}_${year}`) % MIRIM_ENREDO_TEMPLATES.length;

    for (let offset = 0; offset < MIRIM_ENREDO_TEMPLATES.length; offset++) {
      const tpl = MIRIM_ENREDO_TEMPLATES[(startIdx + offset) % MIRIM_ENREDO_TEMPLATES.length];
      const title = tpl.titlePattern(mirim);
      if (!usedTitles.has(title)) {
        return {
          year,
          title,
          synopsis: tpl.synopsisPattern(mirim),
          themeType: tpl.themeType,
        };
      }
    }

    return {
      year,
      title: `Carnaval de Sonhos ${year}: A Alegria da ${mirim.abbreviation || mirim.calledName}`,
      synopsis: `Com samba no pé e muita criatividade, a garotada da ${mirim.calledName} celebra a cultura carioca na Sapucaí.`,
      themeType: 'Lúdico',
    };
  }

  /**
   * Gera um novo jovem talento para a categoria de base da Escola Mirim.
   */
  static generateYouthTalent(mirim: MirimSchool, year: number, sequenceIndex: number): MirimTalent {
    const seed = deterministicHash(`${mirim.id}_talent_${year}_${sequenceIndex}`);
    const firstName = TALENT_FIRST_NAMES[seed % TALENT_FIRST_NAMES.length];
    const roleInfo = TALENT_ROLES[(seed >>> 3) % TALENT_ROLES.length];
    const locality = mirim.neighborhood || mirim.abbreviation || mirim.calledName;
    const basePotential = 77 + mirim.academyLevel * 3 + (seed % 7);

    return {
      id: `${mirim.id}_tal_${year}_${sequenceIndex}_${seed % 997}`,
      name: `${firstName} (${locality})`,
      role: roleInfo.role,
      roleLabel: roleInfo.roleLabel,
      age: 14 + (seed % 3), // 14 a 16 anos ao ingressar
      potential: Math.min(97, basePotential),
      targetQuesito: roleInfo.targetQuesito,
      readyToGraduate: false,
    };
  }

  /**
   * Verifica a conformidade de todas as escolas do Grupo Especial com a regra obrigatória:
   * Toda escola do Especial deve possuir escola mirim; se subir sem uma, tem prazo máximo de 2 anos.
   */
  static getEspecialComplianceStatuses(
    adultSchools: School[],
    mirims: MirimSchool[],
    especialWithoutMirimTracker: Record<string, number>
  ): EspecialMirimComplianceStatus[] {
    const especialSchools = adultSchools
      .filter((s) => s.division === 'especial')
      .sort((a, b) => cleanSchoolName(a.name).localeCompare(cleanSchoolName(b.name), 'pt-BR'));

    return especialSchools.map((school) => {
      const linkedMirim = mirims.find((m) => m.motherSchoolId === school.id);
      const cleanName = cleanSchoolName(school.name);

      if (linkedMirim) {
        return {
          schoolId: school.id,
          schoolName: cleanName,
          hasMirim: true,
          mirimId: linkedMirim.id,
          mirimName: linkedMirim.calledName,
          yearsInEspecialWithoutMirim: 0,
          maxYearsAllowed: MIRIM_MAX_ESPECIAL_YEARS_WITHOUT_MIRIM,
          status: linkedMirim.autoCreatedByRule ? 'criada_automaticamente' : 'regular',
        };
      }

      const yearsWithout = Math.max(1, especialWithoutMirimTracker[school.id] ?? 1);
      return {
        schoolId: school.id,
        schoolName: cleanName,
        hasMirim: false,
        yearsInEspecialWithoutMirim: yearsWithout,
        maxYearsAllowed: MIRIM_MAX_ESPECIAL_YEARS_WITHOUT_MIRIM,
        status: yearsWithout >= MIRIM_MAX_ESPECIAL_YEARS_WITHOUT_MIRIM ? 'prazo_final_ano_2' : 'aviso_ano_1',
      };
    });
  }

  /**
   * Cria automaticamente uma Escola Mirim oficial para uma agremiação do Grupo Especial
   * ao completar o prazo máximo de 2 anos na elite sem categoria de base.
   */
  static createAutoMirimForSchool(motherSchool: School, year: number): MirimSchool {
    const cleanMother = cleanSchoolName(motherSchool.name);
    const seed = deterministicHash(`auto_mirim_${motherSchool.id}_${year}`);
    const prefix = AUTO_MIRIM_PREFIXES[seed % AUTO_MIRIM_PREFIXES.length];
    const shortMother = motherSchool.shortName || cleanMother;
    const mirimName = `${prefix} ${shortMother}`;
    const id = `mirim_auto_${motherSchool.id}_${year}`;

    const primaryColor = motherSchool.colors?.primary || '#1d4ed8';
    const secondaryColor = motherSchool.colors?.secondary || '#ffffff';
    const accentColor = motherSchool.colors?.accent || '#facc15';
    const neighborhood = motherSchool.neighborhood || 'Rio de Janeiro';
    const colorHexList = [primaryColor, secondaryColor, ...(motherSchool.colors?.accent ? [motherSchool.colors.accent] : [])];

    const newMirim: MirimSchool = {
      id,
      denomination: 'G.R.C.E.S.M.',
      corporateName: `Grêmio Recreativo Cultural Escola de Samba Mirim ${mirimName}`,
      name: mirimName,
      calledName: mirimName,
      abbreviation: shortMother.slice(0, 12),
      motherSchoolId: motherSchool.id,
      motherSchoolName: cleanMother,
      isSocialProject: false,
      fundingSource: 'escola_mae',
      annualGrant: 280000,
      budget: 280000,
      foundationYear: year,
      foundationDate: `Carnaval de ${year}`,
      neighborhood,
      city: motherSchool.city || motherSchool.cityState || 'Rio de Janeiro',
      colors: colorHexList,
      colorsDescription: motherSchool.colorsDescription || 'Cores oficiais da escola-mãe',
      symbol: motherSchool.symbol || `Versão juvenil do pavilhão da ${cleanMother}`,
      symbolEmoji: '🌱',
      flagConfig: {
        primaryColor,
        secondaryColor,
        accentColor,
        pattern: 'raios_16',
        emblemStyle: 'escudo',
        symbolEmoji: '🌱',
        abbreviation: shortMother.slice(0, 10).toUpperCase(),
        foundationYear: year,
        schoolName: mirimName,
        denomination: 'G.R.C.E.S.M.',
        showBanner: true,
      },
      currentEnredo: {
        year,
        title: `Nasce uma Nova Geração: ${mirimName} Abre Alas Para o Futuro`,
        synopsis: `Fundada em cumprimento à norma da LIESA para o Grupo Especial, a escola mirim da ${cleanMother} estreia na Sapucaí formando jovens sambistas.`,
        themeType: 'Cultural',
      },
      enredoHistory: [],
      youthSquadSize: 650,
      academyLevel: 2,
      talents: [],
      paradeSchedule: {
        slotId: 'desfile_principal',
        dayTitle: 'Desfile Oficial das Escolas Mirins (Sexta-feira)',
        dateLabel: `Sexta-feira das Mirins • Carnaval ${year}`,
        timeLabel: '18h',
        orderInDay: 99,
        venue: 'Sambódromo da Marquês de Sapucaí',
        isTechnicalRehearsal: false,
        completed: false,
      },
      hasParadedThisYear: false,
      autoCreatedByRule: true,
      autoCreatedYear: year,
    };

    newMirim.talents = [
      this.generateYouthTalent(newMirim, year, 1),
      this.generateYouthTalent(newMirim, year, 2),
    ];

    return newMirim;
  }

  /**
   * Cria uma Escola de Samba Mirim personalizada através do Modo Criar Escola ou painel Mirins.
   */
  static createCustomMirimSchool(
    params: CreateMirimSchoolParams,
    currentYear: number,
    adultSchools: School[]
  ): MirimSchool {
    const cleanName = params.name.trim();
    const calledName = (params.calledName || cleanName).trim();
    const slug = cleanName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_|_$/g, '');

    const id = `mirim_custom_${slug || 'escola'}_${Date.now()}`;
    const denomExtenso =
      params.denomination === 'G.R.E.S.M.'
        ? 'Grêmio Recreativo Escola de Samba Mirim'
        : 'Grêmio Recreativo Cultural Escola de Samba Mirim';

    const mother = !params.isSocialProject && params.motherSchoolId
      ? adultSchools.find((s) => s.id === params.motherSchoolId)
      : undefined;

    const draft: MirimSchool = {
      id,
      denomination: params.denomination,
      corporateName: `${denomExtenso} ${cleanName}`,
      name: cleanName,
      calledName,
      abbreviation: params.abbreviation?.trim() || calledName.slice(0, 14),
      motherSchoolId: mother ? mother.id : undefined,
      motherSchoolName: mother ? cleanSchoolName(mother.name) : undefined,
      isSocialProject: !mother,
      fundingSource: mother ? 'escola_mae' : 'liesa_projeto_social',
      annualGrant: LIESA_SOCIAL_PROJECT_BASE_GRANT,
      budget: LIESA_SOCIAL_PROJECT_BASE_GRANT,
      foundationYear: params.foundationYear || currentYear,
      foundationDate: params.foundationDate?.trim() || `${params.foundationYear || currentYear}`,
      neighborhood: params.neighborhood?.trim() || 'Rio de Janeiro',
      city: params.city?.trim() || 'Rio de Janeiro',
      colors: params.colors.length >= 2 ? params.colors : ['#1d4ed8', '#ffffff'],
      colorsDescription: params.colorsDescription.trim() || 'Cores oficiais da agremiação',
      symbol: params.symbol.trim() || 'Símbolo da agremiação mirim',
      symbolEmoji: params.symbolEmoji || '🥁',
      flagConfig: {
        ...params.flagConfig,
        schoolName: calledName,
        denomination: params.denomination,
        foundationYear: params.foundationYear || currentYear,
      },
      currentEnredo: {
        year: currentYear,
        title:
          params.initialEnredoTitle.trim() ||
          `Sementes do Amanhã: A Estreia da ${calledName} na Sapucaí`,
        synopsis:
          params.initialEnredoSynopsis.trim() ||
          `Enredo inaugural preparado pela nova geração de sambistas da ${calledName} sob gestão da LIESA.`,
        themeType: params.initialEnredoThemeType || 'Lúdico',
      },
      enredoHistory: [],
      youthSquadSize: 550,
      academyLevel: 2,
      talents: [],
      paradeSchedule: {
        slotId: 'desfile_principal',
        dayTitle: 'Desfile Oficial das Escolas Mirins (Sexta-feira)',
        dateLabel: `Sexta-feira das Mirins • Carnaval ${currentYear}`,
        timeLabel: '18h',
        orderInDay: 99,
        venue: 'Sambódromo da Marquês de Sapucaí',
        isTechnicalRehearsal: false,
        completed: false,
      },
      hasParadedThisYear: false,
      isCustom: true,
    };

    const grant = this.calculateAnnualGrant(draft, adultSchools);
    draft.annualGrant = grant;
    draft.budget = grant;
    draft.talents = [
      this.generateYouthTalent(draft, currentYear, 1),
      this.generateYouthTalent(draft, currentYear, 2),
    ];

    return draft;
  }

  /**
   * Processa a virada anual das Escolas Mirins:
   * 1. Arquiva enredos anteriores e gera novos enredos próprios
   * 2. Credita verbas anuais (Escola-Mãe ou LIESA Projetos Sociais)
   * 3. Evolui idade/maturação dos jovens talentos e forma novos nomes na base
   * 4. Aplica a regra obrigatória do Grupo Especial (prazo máximo de 2 anos sem Mirim -> criação automática)
   * 5. Monta o calendário oficial de 4 dias na Sapucaí (LIESA, sem julgamento)
   */
  static processSeasonTransition(
    currentMirims: MirimSchool[],
    nextAdultSchools: School[],
    nextYear: number,
    prevTracker: Record<string, number>
  ): {
    nextMirims: MirimSchool[];
    nextAdultSchools: School[];
    nextEspecialWithoutMirimTracker: Record<string, number>;
    events: MirimSeasonEvent[];
  } {
    const events: MirimSeasonEvent[] = [];
    const motherContributionDeductions = new Map<string, number>();

    // 1) Atualiza todas as escolas mirins existentes
    const updatedMirims: MirimSchool[] = currentMirims.map((mirim) => {
      const archivedHistory = mirim.currentEnredo
        ? [...(mirim.enredoHistory || []), mirim.currentEnredo]
        : [...(mirim.enredoHistory || [])];

      const nextGrant = this.calculateAnnualGrant(mirim, nextAdultSchools);
      if (!mirim.isSocialProject && mirim.motherSchoolId) {
        // Escola-mãe repassa verba anual para sua categoria de base
        const prevDed = motherContributionDeductions.get(mirim.motherSchoolId) || 0;
        motherContributionDeductions.set(mirim.motherSchoolId, prevDed + nextGrant);
      }

      // Evolução dos jovens talentos da base
      const evolvedTalents: MirimTalent[] = (mirim.talents || [])
        .filter((t) => !t.graduatedYear || nextYear - t.graduatedYear <= 2)
        .map((t) => {
          if (t.graduatedYear) return t;
          const nextAge = Math.min(18, t.age + 1);
          const ready = nextAge >= 17;
          return {
            ...t,
            age: nextAge,
            potential: Math.min(98, t.potential + (mirim.academyLevel >= 4 ? 1 : 0)),
            readyToGraduate: ready,
          };
        });

      // Mantém pelo menos 2 talentos ativos em formação na base
      const activeCount = evolvedTalents.filter((t) => !t.graduatedYear).length;
      if (activeCount < 2) {
        const needed = 2 - activeCount;
        for (let i = 0; i < needed; i++) {
          evolvedTalents.push(this.generateYouthTalent(mirim, nextYear, i + 1));
        }
      }

      const mother = mirim.motherSchoolId
        ? nextAdultSchools.find((s) => s.id === mirim.motherSchoolId)
        : undefined;

      const updatedBase: MirimSchool = {
        ...mirim,
        motherSchoolName: mother ? cleanSchoolName(mother.name) : mirim.motherSchoolName,
        annualGrant: nextGrant,
        budget: Math.round((mirim.budget || 0) * 0.25 + nextGrant),
        enredoHistory: archivedHistory,
        talents: evolvedTalents,
        youthSquadSize: Math.min(1400, mirim.youthSquadSize + 15),
        hasParadedThisYear: false,
      };

      updatedBase.currentEnredo = this.generateMirimEnredo(updatedBase, nextYear);
      return updatedBase;
    });

    // 2) Regra Obrigatória do Grupo Especial (prazo máximo de 2 anos sem Escola Mirim)
    const nextTracker: Record<string, number> = {};
    const especialSchools = nextAdultSchools.filter((s) => s.division === 'especial');

    for (const espSchool of especialSchools) {
      const hasMirim = updatedMirims.some((m) => m.motherSchoolId === espSchool.id);
      if (hasMirim) {
        nextTracker[espSchool.id] = 0;
        continue;
      }

      const previousYears = prevTracker[espSchool.id] || 0;
      const newYearsWithout = previousYears + 1;

      if (newYearsWithout >= MIRIM_MAX_ESPECIAL_YEARS_WITHOUT_MIRIM) {
        // Criação obrigatória automática após completar o prazo de 2 anos no Especial
        const autoMirim = this.createAutoMirimForSchool(espSchool, nextYear);
        updatedMirims.push(autoMirim);
        nextTracker[espSchool.id] = 0;
        const prevDed = motherContributionDeductions.get(espSchool.id) || 0;
        motherContributionDeductions.set(espSchool.id, prevDed + autoMirim.annualGrant);

        events.push({
          type: 'auto_created_mirim',
          title: `LIESA oficializa ${autoMirim.calledName}`,
          description: `Ao completar o prazo regulamentar de 2 anos no Grupo Especial sem categoria de base, a ${cleanSchoolName(espSchool.name)} fundou oficialmente a escola mirim ${autoMirim.calledName}.`,
          schoolId: espSchool.id,
          mirimId: autoMirim.id,
        });
      } else {
        nextTracker[espSchool.id] = newYearsWithout;
      }
    }

    // 3) Aplica dedução sustentável das verbas repassadas pelas Escolas-Mães
    const adjustedAdultSchools = nextAdultSchools.map((school) => {
      const deduction = motherContributionDeductions.get(school.id);
      if (!deduction) return school;
      // Garante que o repasse à base nunca quebre o caixa mínimo operacional da escola-mãe
      const safeDeduction = Math.min(deduction, Math.max(0, Math.round(school.budget * 0.08)));
      return {
        ...school,
        budget: Math.max(0, school.budget - safeDeduction),
      };
    });

    // 4) Remonta o calendário de 4 dias na Sapucaí para a nova temporada
    const scheduledMirims = this.assignSapucaiSchedule(updatedMirims, nextYear, adjustedAdultSchools);

    return {
      nextMirims: scheduledMirims,
      nextAdultSchools: adjustedAdultSchools,
      nextEspecialWithoutMirimTracker: nextTracker,
      events,
    };
  }

  /**
   * Conclui a apresentação festiva (SEM JULGAMENTO) de uma única Escola Mirim assistida ao vivo.
   */
  static simulateSingleMirimParade(
    mirims: MirimSchool[],
    mirimId: string
  ): { nextMirims: MirimSchool[]; completedSchool?: MirimSchool } {
    let completedSchool: MirimSchool | undefined;
    const nextMirims = mirims.map((m) => {
      if (m.id !== mirimId || m.paradeSchedule.completed) return m;
      const note =
        PARADE_HIGHLIGHTS[deterministicHash(`${m.id}_${m.currentEnredo.year}`) % PARADE_HIGHLIGHTS.length];
      completedSchool = {
        ...m,
        hasParadedThisYear: true,
        paradeSchedule: {
          ...m.paradeSchedule,
          completed: true,
          highlightNote: note,
        },
      };
      return completedSchool;
    });

    return { nextMirims, completedSchool };
  }

  /**
   * Simula a apresentação festiva (SEM JULGAMENTO) de um dia específico na Sapucaí.
   */
  static simulateMirimParadeDay(
    mirims: MirimSchool[],
    slotId: MirimParadeSlotId
  ): { nextMirims: MirimSchool[]; paradedCount: number } {
    let paradedCount = 0;
    const nextMirims = mirims.map((m) => {
      if (m.paradeSchedule.slotId !== slotId || m.paradeSchedule.completed) {
        return m;
      }
      paradedCount += 1;
      const note =
        PARADE_HIGHLIGHTS[deterministicHash(`${m.id}_${m.currentEnredo.year}`) % PARADE_HIGHLIGHTS.length];
      return {
        ...m,
        hasParadedThisYear: true,
        paradeSchedule: {
          ...m.paradeSchedule,
          completed: true,
          highlightNote: note,
        },
      };
    });

    return { nextMirims, paradedCount };
  }

  /**
   * Simula todos os 4 dias oficiais de apresentações mirins na Marquês de Sapucaí (sem notas).
   */
  static simulateAllMirimParades(mirims: MirimSchool[]): { nextMirims: MirimSchool[]; paradedCount: number } {
    let paradedCount = 0;
    const nextMirims = mirims.map((m) => {
      if (m.paradeSchedule.completed) return m;
      paradedCount += 1;
      const note =
        PARADE_HIGHLIGHTS[deterministicHash(`${m.id}_${m.currentEnredo.year}`) % PARADE_HIGHLIGHTS.length];
      return {
        ...m,
        hasParadedThisYear: true,
        paradeSchedule: {
          ...m.paradeSchedule,
          completed: true,
          highlightNote: note,
        },
      };
    });

    return { nextMirims, paradedCount };
  }

  /**
   * Promove um jovem talento pronto da categoria de base para uma escola adulta (Escola-Mãe ou contratante),
   * elevando o quesito técnico correspondente e a moral da comunidade.
   */
  static promoteTalentToAdultSchool(
    mirims: MirimSchool[],
    mirimId: string,
    talentId: string,
    targetAdultSchoolId: string,
    adultSchools: School[],
    currentYear: number
  ): {
    nextMirims: MirimSchool[];
    nextAdultSchools: School[];
    promotedTalent?: MirimTalent;
    boostAmount: number;
    targetSchoolName?: string;
  } {
    const mirim = mirims.find((m) => m.id === mirimId);
    const targetSchool = adultSchools.find((s) => s.id === targetAdultSchoolId);
    if (!mirim || !targetSchool) {
      return { nextMirims: mirims, nextAdultSchools: adultSchools, boostAmount: 0 };
    }

    const talent = mirim.talents.find((t) => t.id === talentId);
    if (!talent || !talent.readyToGraduate || talent.graduatedYear) {
      return { nextMirims: mirims, nextAdultSchools: adultSchools, boostAmount: 0 };
    }

    const boostAmount = talent.potential >= 90 ? 2 : 1;
    const cleanTargetName = cleanSchoolName(targetSchool.name);

    const nextMirims = mirims.map((m) => {
      if (m.id !== mirimId) return m;
      return {
        ...m,
        talents: m.talents.map((t) =>
          t.id === talentId
            ? {
                ...t,
                readyToGraduate: false,
                graduatedYear: currentYear,
                graduatedToSchoolId: targetSchool.id,
                graduatedToSchoolName: cleanTargetName,
              }
            : t
        ),
      };
    });

    const nextAdultSchools = adultSchools.map((s) => {
      if (s.id !== targetAdultSchoolId) return s;
      const currentAttr = s.attributes[talent.targetQuesito] ?? 80;
      return {
        ...s,
        fanBaseMorale: Math.min(100, (s.fanBaseMorale ?? 80) + 2),
        attributes: {
          ...s.attributes,
          [talent.targetQuesito]: Math.min(99, currentAttr + boostAmount),
        },
      };
    });

    return {
      nextMirims,
      nextAdultSchools,
      promotedTalent: talent,
      boostAmount,
      targetSchoolName: cleanTargetName,
    };
  }

  /**
   * Investe verba adicional da Escola-Mãe para evoluir a estrutura da Escola Mirim (nível 1 a 5).
   */
  static investInMirimAcademy(
    mirims: MirimSchool[],
    mirimId: string,
    motherSchoolId: string,
    adultSchools: School[]
  ): {
    success: boolean;
    errorMessage?: string;
    cost: number;
    nextMirims: MirimSchool[];
    nextAdultSchools: School[];
  } {
    const mirim = mirims.find((m) => m.id === mirimId);
    const mother = adultSchools.find((s) => s.id === motherSchoolId);
    if (!mirim || !mother) {
      return {
        success: false,
        errorMessage: 'Agremiação não encontrada.',
        cost: 0,
        nextMirims: mirims,
        nextAdultSchools: adultSchools,
      };
    }

    if (mirim.academyLevel >= 5) {
      return {
        success: false,
        errorMessage: 'A escola mirim já atingiu o nível máximo de excelência da base.',
        cost: 0,
        nextMirims: mirims,
        nextAdultSchools: adultSchools,
      };
    }

    const cost = mirim.academyLevel * 120000;
    if (mother.budget < cost) {
      return {
        success: false,
        errorMessage: `Caixa insuficiente na escola-mãe (necessário R$ ${cost.toLocaleString('pt-BR')}).`,
        cost,
        nextMirims: mirims,
        nextAdultSchools: adultSchools,
      };
    }

    const nextLevel = mirim.academyLevel + 1;
    const nextMirims = mirims.map((m) => {
      if (m.id !== mirimId) return m;
      return {
        ...m,
        academyLevel: nextLevel,
        budget: m.budget + Math.round(cost * 0.5),
        youthSquadSize: Math.min(1400, m.youthSquadSize + 60),
        talents: m.talents.map((t) =>
          t.graduatedYear ? t : { ...t, potential: Math.min(98, t.potential + 2) }
        ),
      };
    });

    const nextAdultSchools = adultSchools.map((s) =>
      s.id === motherSchoolId
        ? {
            ...s,
            budget: s.budget - cost,
            fanBaseMorale: Math.min(100, (s.fanBaseMorale ?? 80) + 3),
          }
        : s
    );

    return {
      success: true,
      cost,
      nextMirims,
      nextAdultSchools,
    };
  }
}
