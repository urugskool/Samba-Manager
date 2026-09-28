export type DivisionId = 'especial' | 'ouro' | 'prata' | 'bronze';

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
    | 'promoted_ouro'
    | 'promoted_bronze'
    | 'g6'
    | 'regular'
    | 'relegated';
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
  inGameEspecialTitles: number;
  inGameEspecialVices: number;
  inGameOuroTitles: number;
  inGameOuroVices: number;
  inGamePrataTitles: number;
  inGamePrataVices: number;
  inGameBronzeTitles: number;
  inGameBronzeVices: number;
  totalEspecialTitles: number;
  totalEspecialVices: number;
  totalOuroTitles: number;
  totalOuroVices: number;
  totalPrataTitles: number;
  totalPrataVices: number;
  totalBronzeTitles: number;
  totalBronzeVices: number;
  grandTotalTitles: number;
  grandTotalVices: number;
  grandTotalConquests: number;
  allEspecialYears: TitleYearEntry[];
  allOuroYears: TitleYearEntry[];
  allPrataYears: TitleYearEntry[];
  allBronzeYears: TitleYearEntry[];
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
  inGameAchievements: InGameAchievement[];
}

export interface School {
  id: string;
  name: string;
  shortName: string;
  nickname: string;
  foundationYear: number;
  neighborhood: string;
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
    text: string;
    border: string;
  };
  symbol: string;
  division: DivisionId;
  budget: number;
  fanBaseMorale: number; // 0 - 100
  championshipsEspecial: number;
  championshipsOuro: number;
  championshipsPrata?: number;
  championshipsBronze?: number;
  runnerUpsEspecial: number;
  runnerUpsOuro: number;
  runnerUpsPrata?: number;
  runnerUpsBronze?: number;
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
}

export type JuradoScores = [number, number, number, number]; // 4 jurados

export interface SchoolParadeScores {
  schoolId: string;
  scoresByQuesito: Record<QuesitoId, JuradoScores>;
  totalScore: number;
  penalties: number; // e.g. for time violation, missing components (usually 0.0)
  finalScore: number;
  rank?: number;
  tiebreakerDetail?: string;
  sorteioRandomValue?: number;
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
  especialStandings: { rank: number; schoolName: string; schoolId?: string; totalScore: number }[];
  ouroStandings: { rank: number; schoolName: string; schoolId?: string; totalScore: number }[];
  prataStandings?: { rank: number; schoolName: string; schoolId?: string; totalScore: number }[];
  bronzeStandings?: { rank: number; schoolName: string; schoolId?: string; totalScore: number }[];
}

export interface NewsItem {
  id: string;
  year: number;
  title: string;
  body: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  date: string;
}
