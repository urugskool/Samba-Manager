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
  role: 'carnavalesco' | 'mestreBateria' | 'harmonia' | 'mestreSalaPortaBandeira' | 'interprete' | 'coreografo' | 'direcaoCarnaval';
  roleName: string;
  rating: number; // 50 - 99
  salary: number; // R$ per year
  reputation: string;
  isDupla?: boolean;
  partnerName?: string;
  partnerId?: string;
  originCity?: string;
  previousSchoolName?: string;
}

export type EnredoThemeType =
  | 'Afro-brasileiro'
  | 'Afro-Brasileiro'
  | 'Histórico'
  | 'Homenagem'
  | 'Crítica Social'
  | 'Folclore & Lendas'
  | 'Regional'
  | 'Cultural'
  | 'Patrocinado'
  | 'Ambiental & Natureza'
  | 'Mitológico'
  | 'Literário & Artes'
  | 'Lúdico'
  | 'Ciência e Tecnologia'
  | 'Ciência & Tecnologia'
  | 'Surrealista'
  | (string & {});

export interface Enredo {
  id: string;
  title: string;
  themeType: EnredoThemeType;
  synopsis: string;
  qualityBoost: number; // 0 - 15
  cost: number;
  isSponsored?: boolean;
  sponsorName?: string;
  sponsorValue?: number; // Valor R$ aportado pelo patrocinador diretamente à escola
  carnavalescoAffinity?: number; // 0 - 100% afinidade com o estilo do carnavalesco
  historicalAffinity?: number; // 0 - 100% afinidade com a tradição da escola
  commercialTradeoff?: string; // Observações críticas / contrapartidas
  proponent?: string; // Quem propôs o enredo (ex: 'Carnavalesco', 'Conselho Deliberativo', 'Patrocinador')
}

export interface CampeasParadeResult {
  schoolId: string;
  rankInCarnaval: number; // 1 a 6
  rankLabel: string; // Ex: '1º Lugar (Campeã)', 'Vice-Campeã', '6º Lugar'
  paradeOrder: number; // 1 a 6 (6ª colocada desfila primeiro, 1ª desfila por último)
  durationMinutes: number;
  timeStatus: 'regular' | 'estouro' | 'abaixo';
  diffMinutes: number;
  fineAmount: number; // R$ 100.000 por minuto excedido (estouro de tempo)
  completed: boolean;
  celebrationNote?: string;
}

export type DivisionStatesMap = Record<
  DivisionId,
  {
    hasStarted: boolean;
    quesitoIdx: number;
    judgeIdx: number;
    schoolIdx: number;
    isCompleted: boolean;
  }
>;

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
  label?: string;
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
  ancientGrupoETitles?: number;
  ancientGrupoEVices?: number;
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
  totalGrupoETitles?: number;
  totalGrupoEVices?: number;
  grandTotalTitles: number;
  grandTotalVices: number;
  grandTotalConquests: number;
  allEspecialYears: TitleYearEntry[];
  allEspecialRunnerUpYears: TitleYearEntry[];
  allOuroYears: TitleYearEntry[];
  allOuroRunnerUpYears: TitleYearEntry[];
  allPrataYears: TitleYearEntry[];
  allPrataRunnerUpYears: TitleYearEntry[];
  allBronzeYears: TitleYearEntry[];
  allBronzeRunnerUpYears: TitleYearEntry[];
  allAvaliacaoYears: TitleYearEntry[];
  allAvaliacaoRunnerUpYears: TitleYearEntry[];
  allGrupoEYears?: TitleYearEntry[];
  allGrupoERunnerUpYears?: TitleYearEntry[];
  totalEspecialRelegations?: number;
  allEspecialRelegationYears?: number[];
  achievements: InGameAchievement[];
}

export interface SchoolHonors {
  historicalEspecialTitles: number;
  historicalEspecialYears?: number[];
  historicalEspecialRunnerUps: number;
  historicalEspecialRunnerUpYears?: number[];
  historicalEspecialRelegations?: number;
  historicalEspecialRelegationYears?: number[];
  historicalOuroTitles: number;
  historicalOuroYears?: number[];
  historicalOuroRunnerUps: number;
  historicalOuroRunnerUpYears?: number[];
  historicalPrataTitles?: number;
  historicalPrataYears?: number[];
  historicalPrataRunnerUps?: number;
  historicalPrataRunnerUpYears?: number[];
  historicalBronzeTitles?: number;
  historicalBronzeYears?: number[];
  historicalBronzeRunnerUps?: number;
  historicalBronzeRunnerUpYears?: number[];
  historicalAvaliacaoTitles?: number;
  historicalAvaliacaoYears?: number[];
  historicalAvaliacaoRunnerUps?: number;
  historicalAvaliacaoRunnerUpYears?: number[];
  historicalGrupoETitles?: number;
  historicalGrupoEYears?: number[];
  historicalGrupoERunnerUps?: number;
  historicalGrupoERunnerUpYears?: number[];
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
  calledName?: string; // Nome chamado oficial
  knownName?: string; // Nome conhecido oficial
  abbreviation?: string;
  denomination?: string; // Denominação jurídica / estatutária (Ex: "G.R.E.S.", "C.C.E.S.")
  corporateName?: string; // Razão social oficial completa nos perfis (Ex: "G.R.E.S. Estação Primeira de Mangueira")
  nickname: string;
  motto?: string; // Lema da agremiação (Ex: "A princesinha da Zona Oeste")
  foundationYear: number;
  foundationDate?: string;
  neighborhood: string;
  city?: string;
  mascot?: string; // Mascote oficial da agremiação (Ex: "Sabiá", "Castor")
  originType?: 'rio_bairro' | 'outra_cidade';
  cityState?: string;
  isCustomSchool?: boolean;
  quadraLevel?: number; // 1: Galpão Rústico, 2: Quadra Coberta, 3: Espaço de Eventos, 4: Arena Climatizada, 5: Palácio do Samba
  quadraName?: string;
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
    text: string;
    border: string;
  };
  colorsDescription?: string;
  symbol: string;
  flagPattern?: 'raios_16' | 'raios_8' | 'raios_24' | 'raios_ondulados' | 'faixa_diagonal' | 'faixa_diagonal_dupla' | 'cruz' | 'losango' | 'faixas_horizontais' | 'faixas_verticais' | 'quatro_quadrantes' | 'bicolor_meio' | 'circulos_concentricos' | 'estrelas_espalhadas';
  flagEmblemStyle?: 'circulo' | 'escudo' | 'losango' | 'coroa' | 'estrela' | 'nenhum';
  division: DivisionId;
  budget: number;
  fanBaseMorale: number; // 0 - 100
  championshipsEspecial: number;
  championshipsOuro: number;
  championshipsPrata?: number;
  championshipsBronze?: number;
  championshipsAvaliacao?: number;
  championshipsGrupoE?: number;
  runnerUpsEspecial: number;
  runnerUpsOuro: number;
  runnerUpsPrata?: number;
  runnerUpsBronze?: number;
  runnerUpsAvaliacao?: number;
  runnerUpsGrupoE?: number;
  relegationsEspecial?: number;
  especialRelegationYears?: number[];
  rebaixamentosEspecial?: number;
  rebaixamentosEspecialAnos?: number[];
  isInactive?: boolean;
  inactive?: boolean;
  inactiveYearsCount?: number;
  inactiveSince?: number | string;
  inactiveReason?: string;
  suspensionReason?: string;
  isBlocoCarnavalesco?: boolean;
  blocoOriginalDenomination?: string;
  federation?: 'FBCERJ' | 'LIESA' | 'LigaRJ' | 'Superliga' | 'LIVRES' | string;
  paradeVenue?: string;
  honors: SchoolHonors;
  attributes: SchoolAttributes;
  staff: {
    carnavalesco: StaffMember;
    mestreBateria: StaffMember;
    harmonia: StaffMember;
    mestreSalaPortaBandeira: StaffMember;
    interprete: StaffMember;
    coreografo: StaffMember;
    direcaoCarnaval?: StaffMember;
  };
  currentEnredo?: Enredo;
  customParadeScript?: any;
  pastEnredoTitles?: string[];
  enredoHistory?: { year: number; enredo: string }[];
  rehearsalLevel: number; // 0 - 100
  barracaoProgress: number; // 0 - 100
  technicalParadeDone: boolean;
  paradeComposition?: SchoolParadeComposition;
  lastFeijoadaMonth?: import('./seasonCycle').SeasonMonthId;
  lastNoiteSambaMonth?: import('./seasonCycle').SeasonMonthId;
  lastEnsaioShowMonth?: import('./seasonCycle').SeasonMonthId;
  masterSponsorClaimedYear?: number;
  communitySponsorClaimedYear?: number;
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
  financialPenalty?: number;
  financialPenaltyJustificativa?: string;
  infractions?: TechnicalInfraction[];
  paradeComposition?: SchoolParadeComposition;
  logisticsReport?: import('../services/logisticsService').SchoolLogisticsReport;
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
  avaliacaoRunnerUp?: string;
  avaliacaoPromoted?: string[];
  avaliacaoRelegated?: string[];
  avaliacaoSuspended?: string[];
  especialStandings: { rank: number; schoolName: string; schoolId?: string; totalScore: number }[];
  ouroStandings: { rank: number; schoolName: string; schoolId?: string; totalScore: number }[];
  prataStandings?: { rank: number; schoolName: string; schoolId?: string; totalScore: number }[];
  bronzeStandings?: { rank: number; schoolName: string; schoolId?: string; totalScore: number }[];
  avaliacaoStandings?: { rank: number; schoolName: string; schoolId?: string; totalScore: number }[];
  schoolEnredos?: Record<string, string>; // schoolId ou schoolName -> enredo title
  reactivatedSchools?: string[];
  newSchoolsCreated?: string[];
  newSchools?: string[];
  ligaFinancialReport?: any;
  ouroFinancialReport?: any;
  prataFinancialReport?: any;
  bronzeFinancialReport?: any;
  avaliacaoFinancialReport?: any;
}

export interface NewsItem {
  id: string;
  year: number;
  title: string;
  body: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  date: string;
}
