export type DivisionId = 'especial' | 'ouro' | 'prata' | 'bronze' | 'avaliacao';

export type QuesitoId =
  | 'bateria'
  | 'comissaoDeFrente'
  | 'evolucao'
  | 'harmonia'
  | 'enredo'
  | 'fantasias'
  | 'alegorias'
  | 'sambaEnredo'
  | 'mestreSalaPortaBandeira';

export interface QuesitoConfig {
  id: QuesitoId;
  name: string;
  order: number; // 1 to 9
  shortName: string;
  description: string;
  keyAttribute: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'carnavalesco' | 'mestreBateria' | 'harmonia' | 'mestreSalaPortaBandeira' | 'interprete' | 'coreografo';
  roleName: string;
  rating: number; // 50 - 99
  salary: number; // R$ per year
  reputation: string;
}

export interface Enredo {
  id: string;
  title: string;
  themeType: 'Afro-brasileiro' | 'Histórico' | 'Homenagem' | 'Crítica Social' | 'Folclore & Lendas' | 'Cultural';
  synopsis: string;
  qualityBoost: number; // 0 - 15
  cost: number;
}

export interface SchoolAttributes {
  bateria: number; // 60 - 99
  comissaoDeFrente: number;
  evolucao: number;
  harmonia: number;
  enredo: number;
  fantasias: number;
  alegorias: number;
  sambaEnredo: number;
  mestreSalaPortaBandeira: number;
}

export interface InGameAchievement {
  year: number;
  division: DivisionId;
  placement: number;
  titleName: string;
  badgeType:
    | 'champion_especial'
    | 'vice_especial'
    | 'champion_ouro'
    | 'vice_ouro'
    | 'champion_prata'
    | 'vice_prata'
    | 'champion_bronze'
    | 'vice_bronze'
    | 'champion_avaliacao'
    | 'vice_avaliacao'
    | 'promoted_ouro'
    | 'promoted_prata'
    | 'promoted_bronze'
    | 'promoted_avaliacao'
    | 'g6'
    | 'regular'
    | 'relegated'
    | 'suspended';
  totalScore: number;
  dateAdded?: string;
}

export interface TitleYearEntry {
  year: number;
  isHistorical: boolean;
  source: string;
}

export interface ConsolidatedSchoolStats {
  ancientEspecialTitles: number;
  ancientEspecialVices: number;
  ancientOuroTitles: number;
  ancientOuroVices: number;
  ancientPrataTitles: number;
  ancientPrataVices: number;
  ancientBronzeTitles: number;
  ancientBronzeVices: number;
  ancientAvaliacaoTitles: number;
  ancientAvaliacaoVices: number;
  inGameEspecialTitles: number;
  inGameEspecialVices: number;
  inGameOuroTitles: number;
  inGameOuroVices: number;
  inGamePrataTitles: number;
  inGamePrataVices: number;
  inGameBronzeTitles: number;
  inGameBronzeVices: number;
  inGameAvaliacaoTitles: number;
  inGameAvaliacaoVices: number;
  totalEspecialTitles: number;
  totalEspecialVices: number;
  totalOuroTitles: number;
  totalOuroVices: number;
  totalPrataTitles: number;
  totalPrataVices: number;
  totalBronzeTitles: number;
  totalBronzeVices: number;
  totalAvaliacaoTitles: number;
  totalAvaliacaoVices: number;
  grandTotalTitles: number;
  grandTotalVices: number;
  grandTotalConquests: number;
  allEspecialYears: TitleYearEntry[];
  allOuroYears: TitleYearEntry[];
  allPrataYears: TitleYearEntry[];
  allBronzeYears: TitleYearEntry[];
  allAvaliacaoYears: TitleYearEntry[];
  achievements: InGameAchievement[];
}

export interface SchoolHonors {
  historicalEspecialTitles: number;
  historicalEspecialYears?: number[];
  historicalEspecialRunnerUps: number;
  historicalOuroTitles: number;
  historicalOuroYears?: number[];
  historicalOuroRunnerUps: number;
  historicalPrataTitles?: number;
  historicalPrataYears?: number[];
  historicalPrataRunnerUps?: number;
  historicalBronzeTitles?: number;
  historicalBronzeYears?: number[];
  historicalBronzeRunnerUps?: number;
  historicalAvaliacaoTitles?: number;
  historicalAvaliacaoYears?: number[];
  historicalAvaliacaoRunnerUps?: number;
  inGameAchievements: InGameAchievement[];
}

export interface TechnicalInfraction {
  id: string;
  ruleName: string;
  description: string;
  pointsDeducted: number;
  category: 'composicao' | 'alegorias' | 'comissao' | 'bateria' | 'baianas' | 'alas' | 'disciplinar';
  fineAmount?: number;
}

export interface SchoolParadeComposition {
  componentes: number;
  ritmistas: number;
  baianas: number;
  comissaoDeFrente: number;
  alegorias: number;
  tripes?: number;
  componentesPorTripe?: number;
  componentesPorAla?: number;
  cumpreFolhaObrigatoriedades?: boolean;
  respeitaIdentidadeVisual?: boolean;
  respeitaVestimentaEMerchandising?: boolean;
  semAnimaisOuGenitalia?: boolean;
}

export interface School {
  id: string;
  name: string;
  shortName: string;
  abbreviation?: string;
  nickname: string;
  foundationYear: number;
  foundationDate?: string;
  neighborhood: string;
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
    text: string;
    border: string;
  };
  colorsDescription?: string;
  symbol: string;
  division: DivisionId;
  budget: number;
  fanBaseMorale: number; // 0 - 100
  championshipsEspecial: number;
  championshipsOuro: number;
  championshipsPrata?: number;
  championshipsBronze?: number;
  championshipsAvaliacao?: number;
  runnerUpsEspecial: number;
  runnerUpsOuro: number;
  runnerUpsPrata?: number;
  runnerUpsBronze?: number;
  runnerUpsAvaliacao?: number;
  isInactive?: boolean;
  inactive?: boolean;
  inactiveYearsCount?: number;
  inactiveSince?: number | string;
  inactiveReason?: string;
  suspensionReason?: string;
  honors: SchoolHonors;
  attributes: SchoolAttributes;
  staff: {
    carnavalesco: StaffMember;
    mestreBateria: StaffMember;
    harmonia: StaffMember;
    mestreSalaPortaBandeira: StaffMember;
    interprete: StaffMember;
    coreografo: StaffMember;
  };
  currentEnredo?: Enredo;
  rehearsalLevel: number; // 0 - 100
  barracaoProgress: number; // 0 - 100
  technicalParadeDone: boolean;
  paradeComposition?: SchoolParadeComposition;
}

export type JuradoScores = [number, number, number, number]; // 4 jurados

export interface SchoolParadeScores {
  schoolId: string;
  scoresByQuesito: Record<QuesitoId, JuradoScores>;
  totalScore: number;
  penalties: number; // total penalties (time + technical)
  finalScore: number;
  rank?: number;
  tiebreakerDetail?: string;
  sorteioRandomValue?: number;
  paradeTimeMinutes?: number;
  timePenalty?: number;
  timeStatus?: 'regular' | 'estouro' | 'abaixo';
  timeDifferenceMinutes?: number;
  technicalPenalty?: number;
  infractions?: TechnicalInfraction[];
  paradeComposition?: SchoolParadeComposition;
}

export interface DivisionResult {
  division: DivisionId;
  year: number;
  schoolResults: SchoolParadeScores[];
  championId: string;
  promotedSchoolIds: string[];
  relegatedSchoolIds: string[];
  tiebreakersApplied: {
    schoolAId: string;
    schoolBId: string;
    reason: string;
  }[];
}

export interface YearHistory {
  year: number;
  especialChampion: string;
  especialRelegated: string[];
  ouroChampion: string;
  ouroRelegated: string[];
  prataChampion?: string;
  prataPromoted?: string[];
  prataRelegated?: string[];
  bronzeChampion?: string;
  bronzePromoted?: string[];
  bronzeRelegated?: string[];
  avaliacaoChampion?: string;
  avaliacaoPromoted?: string[];
  avaliacaoRelegated?: string[];
  avaliacaoSuspended?: string[];
  especialStandings: { rank: number; schoolName: string; schoolId?: string; totalScore: number }[];
  ouroStandings: { rank: number; schoolName: string; schoolId?: string; totalScore: number }[];
  prataStandings?: { rank: number; schoolName: string; schoolId?: string; totalScore: number }[];
  bronzeStandings?: { rank: number; schoolName: string; schoolId?: string; totalScore: number }[];
  avaliacaoStandings?: { rank: number; schoolName: string; schoolId?: string; totalScore: number }[];
  reactivatedSchools?: string[];
  newSchoolsCreated?: string[];
  newSchools?: string[];
}

export interface NewsItem {
  id: string;
  year: number;
  title: string;
  body: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  date: string;
}
