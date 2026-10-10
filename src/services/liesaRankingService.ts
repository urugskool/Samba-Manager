import { School, YearHistory } from '../types/carnaval';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import { HISTORICAL_CARNAVAL_RECORDS } from '../data/carnavalData';

export interface LiesaStandingRecord {
  rank: number;
  schoolId: string;
  schoolName: string;
  totalScore?: number;
  isHorsConcours?: boolean;
}

/**
 * Escala oficial de pontuação do Ranking LIESA (Regulamento Oficial da LIESA):
 * 1º lugar: 20 pts
 * 2º lugar: 15 pts
 * 3º lugar: 12 pts
 * 4º lugar: 10 pts
 * 5º lugar: 8 pts
 * 6º lugar: 6 pts
 * 7º lugar: 4 pts
 * 8º lugar: 3 pts
 * 9º lugar: 2 pts
 * 10º lugar: 1 pt
 * 11º lugar em diante: 0 pts
 */
export const LIESA_POINTS_BY_RANK: Record<number, number> = {
  1: 20,
  2: 15,
  3: 12,
  4: 10,
  5: 8,
  6: 6,
  7: 4,
  8: 3,
  9: 2,
  10: 1
};

export function getLiesaPoints(rank: number): number {
  return LIESA_POINTS_BY_RANK[rank] || 0;
}

/**
 * Resultados oficiais catalogados dos carnavais históricos (2010 a 2026)
 * fornecidos pela LIESA para balizar o ranking oficial e histórico do jogo.
 * Carnaval 2021: Não houve desfiles (0 pontos) devido à pandemia.
 * Carnaval 2018: Não houve rebaixamento por decisão unânime da plenária da LIESA (Grande Rio e Império Serrano mantiveram-se no Especial).
 * Carnaval 2017: Duas campeãs oficiais (Portela e Mocidade Independente) e NÃO houve rebaixamento por decisão da plenária após acidentes com alegorias.
 * Carnaval 2011: Grande Rio, Portela e União da Ilha desfilaram como Hors concours devido ao incêndio na Cidade do Samba (sem rebaixamento).
 */
export const OFFICIAL_LIESA_HISTORICAL_STANDINGS: Record<number, LiesaStandingRecord[]> = {
  2010: [
    { rank: 1, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 2, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 3, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 4, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 5, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 6, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 7, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 8, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 9, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 10, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra' },
    { rank: 11, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 12, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' }
  ],
  2011: [
    { rank: 1, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 2, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 3, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 4, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 5, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 6, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 7, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 8, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra' },
    { rank: 9, schoolId: 'sao_clemente', schoolName: 'São Clemente' },
    { rank: 0, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio', isHorsConcours: true },
    { rank: 0, schoolId: 'portela', schoolName: 'Portela', isHorsConcours: true },
    { rank: 0, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador', isHorsConcours: true }
  ],
  2012: [
    { rank: 1, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 2, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 3, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 4, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 5, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 6, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 7, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 8, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 9, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 10, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 11, schoolId: 'sao_clemente', schoolName: 'São Clemente' },
    { rank: 12, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra' },
    { rank: 13, schoolId: 'renascer_jacarepagua', schoolName: 'Renascer de Jacarepaguá' }
  ],
  2013: [
    { rank: 1, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 2, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 3, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 4, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 5, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 6, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 7, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 8, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 9, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 10, schoolId: 'sao_clemente', schoolName: 'São Clemente' },
    { rank: 11, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 12, schoolId: 'inocentes', schoolName: 'Inocentes de Belford Roxo' }
  ],
  2014: [
    { rank: 1, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 2, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 3, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 4, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 5, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 6, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 7, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 8, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 9, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 10, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 11, schoolId: 'sao_clemente', schoolName: 'São Clemente' },
    { rank: 12, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca' }
  ],
  2015: [
    { rank: 1, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 2, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 3, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 4, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 5, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 6, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 7, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 8, schoolId: 'sao_clemente', schoolName: 'São Clemente' },
    { rank: 9, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 10, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 11, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 12, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' }
  ],
  2016: [
    { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 2, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 3, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 4, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 5, schoolId: 'beija_flor', schoolName: 'Beija-Flor de Nilópolis' },
    { rank: 6, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 7, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 8, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 9, schoolId: 'sao_clemente', schoolName: 'São Clemente' },
    { rank: 10, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 11, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 12, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá' }
  ],
  2017: [
    { rank: 1, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 1, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 3, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 4, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 5, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 6, schoolId: 'beija_flor', schoolName: 'Beija-Flor de Nilópolis' },
    { rank: 7, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 8, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 9, schoolId: 'sao_clemente', schoolName: 'São Clemente' },
    { rank: 10, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 11, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 12, schoolId: 'tuiuti', schoolName: 'Paraíso do Tuiuti' }
  ],
  2018: [
    { rank: 1, schoolId: 'beija_flor', schoolName: 'Beija-Flor de Nilópolis' },
    { rank: 2, schoolId: 'tuiuti', schoolName: 'Paraíso do Tuiuti' },
    { rank: 3, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 4, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 5, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 6, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 7, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 8, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 9, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 10, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 11, schoolId: 'sao_clemente', schoolName: 'São Clemente' },
    { rank: 12, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 13, schoolId: 'imperio_serrano', schoolName: 'Império Serrano' }
  ],
  2019: [
    { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 2, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 3, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 4, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 5, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 6, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 7, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 8, schoolId: 'tuiuti', schoolName: 'Paraíso do Tuiuti' },
    { rank: 9, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 10, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 11, schoolId: 'beija_flor', schoolName: 'Beija-Flor de Nilópolis' },
    { rank: 12, schoolId: 'sao_clemente', schoolName: 'São Clemente' },
    { rank: 13, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 14, schoolId: 'imperio_serrano', schoolName: 'Império Serrano' }
  ],
  2020: [
    { rank: 1, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 2, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 3, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 4, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 5, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 6, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 7, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 8, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 9, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 10, schoolId: 'sao_clemente', schoolName: 'São Clemente' },
    { rank: 11, schoolId: 'tuiuti', schoolName: 'Paraíso do Tuiuti' },
    { rank: 12, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá' },
    { rank: 13, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' }
  ],
  2021: [], // Não Houve Carnaval
  2022: [
    { rank: 1, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 2, schoolId: 'beija_flor', schoolName: 'Beija-Flor de Nilópolis' },
    { rank: 3, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 4, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 5, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 6, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 7, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 8, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 9, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 10, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 11, schoolId: 'tuiuti', schoolName: 'Paraíso do Tuiuti' },
    { rank: 12, schoolId: 'sao_clemente', schoolName: 'São Clemente' }
  ],
  2023: [
    { rank: 1, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 2, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 3, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 4, schoolId: 'beija_flor', schoolName: 'Beija-Flor de Nilópolis' },
    { rank: 5, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 6, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 7, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 8, schoolId: 'tuiuti', schoolName: 'Paraíso do Tuiuti' },
    { rank: 9, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 10, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 11, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 12, schoolId: 'imperio_serrano', schoolName: 'Império Serrano' }
  ],
  2024: [
    { rank: 1, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 2, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 3, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 4, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 5, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 6, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 7, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 8, schoolId: 'beija_flor', schoolName: 'Beija-Flor de Nilópolis' },
    { rank: 9, schoolId: 'tuiuti', schoolName: 'Paraíso do Tuiuti' },
    { rank: 10, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 11, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 12, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra' }
  ],
  2025: [
    { rank: 1, schoolId: 'beija_flor', schoolName: 'Beija-Flor de Nilópolis' },
    { rank: 2, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 3, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 4, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 5, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 6, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 7, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 8, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 9, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 10, schoolId: 'tuiuti', schoolName: 'Paraíso do Tuiuti' },
    { rank: 11, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 12, schoolId: 'unidos_padre_miguel', schoolName: 'Unidos de Padre Miguel' }
  ],
  2026: [
    { rank: 1, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 2, schoolId: 'beija_flor', schoolName: 'Beija-Flor de Nilópolis' },
    { rank: 3, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 4, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 5, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 6, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 7, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 8, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 9, schoolId: 'tuiuti', schoolName: 'Paraíso do Tuiuti' },
    { rank: 10, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 11, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 12, schoolId: 'niteroi', schoolName: 'Acadêmicos de Niterói' }
  ]
};

/**
 * Resultados oficiais dos 5 últimos carnavais históricos (2022 a 2026)
 * fornecidos pela LIESA para balizar o ranking oficial inicial do jogo.
 */
export const OFFICIAL_LIESA_STANDINGS_2022_2026: Record<number, LiesaStandingRecord[]> = {
  2022: OFFICIAL_LIESA_HISTORICAL_STANDINGS[2022],
  2023: OFFICIAL_LIESA_HISTORICAL_STANDINGS[2023],
  2024: OFFICIAL_LIESA_HISTORICAL_STANDINGS[2024],
  2025: OFFICIAL_LIESA_HISTORICAL_STANDINGS[2025],
  2026: OFFICIAL_LIESA_HISTORICAL_STANDINGS[2026]
};

export interface LiesaSchoolYearPerformance {
  year: number;
  rank?: number;
  points: number;
  participated: boolean;
  schoolName?: string;
  isHorsConcours?: boolean;
}

export interface LiesaRankingEntry {
  position: number;
  schoolId: string;
  schoolName: string;
  school?: School;
  totalPoints: number;
  titlesInWindow: number;
  vicesInWindow: number;
  performancesByYear: Record<number, LiesaSchoolYearPerformance>;
  yearsCovered: number[];
}

export interface HistoricalLiesaEntry {
  position: number;
  schoolId: string;
  schoolName: string;
  school?: School;
  totalPoints: number;
  totalEspecialTitles: number;
  totalEspecialVices: number;
  titlePoints: number;
  vicePoints: number;
  recentPointsPre2022: number;
  pointsDetailedEra: number;
  pointsEraPre2015: number;
  performancesDetailed: Record<number, LiesaSchoolYearPerformance>;
  performances2022Onward: Record<number, LiesaSchoolYearPerformance>;
  totalCarnavalesContados: number;
}

export interface HistoricalCarnavalInfo {
  year: number;
  standings: LiesaStandingRecord[];
  isNoCarnaval: boolean;
  notes?: string;
  championNames: string[];
  viceChampionNames: string[];
  totalSchools: number;
}

/**
 * Normaliza o ID da escola para garantir casamento exato em históricos
 */
function resolveSchoolId(rawId?: string, rawName?: string, schoolsMap?: Map<string, School>): string {
  if (rawId && rawId.trim()) {
    const cleanId = rawId.trim().toLowerCase();
    if (schoolsMap?.has(cleanId)) return cleanId;
    return cleanId;
  }
  if (!rawName) return 'desconhecido';
  const nameNorm = rawName.toLowerCase();
  if (nameNorm.includes('viradouro')) return 'viradouro';
  if (nameNorm.includes('beija-flor') || nameNorm.includes('beija flor') || nameNorm.includes('beija_flor')) return 'beija_flor';
  if (nameNorm.includes('grande rio')) return 'grande_rio';
  if (nameNorm.includes('imperatriz')) return 'imperatriz';
  if (nameNorm.includes('vila isabel')) return 'vila_isabel';
  if (nameNorm.includes('salgueiro')) return 'salgueiro';
  if (nameNorm.includes('mangueira')) return 'mangueira';
  if (nameNorm.includes('portela')) return 'portela';
  if (nameNorm.includes('império da tijuca') || nameNorm.includes('imperio da tijuca')) return 'imperio_da_tijuca';
  if (nameNorm.includes('tijuca') && !nameNorm.includes('barra')) return 'tijuca';
  if (nameNorm.includes('tuiuti')) return 'tuiuti';
  if (nameNorm.includes('mocidade') && !nameNorm.includes('cidade de deus') && !nameNorm.includes('porto') && !nameNorm.includes('vicente')) return 'mocidade';
  if (nameNorm.includes('niterói') || nameNorm.includes('niteroi')) return 'niteroi';
  if (nameNorm.includes('porto da pedra')) return 'porto_da_pedra';
  if (nameNorm.includes('padre miguel') && nameNorm.includes('unidos de')) return 'unidos_padre_miguel';
  if (nameNorm.includes('império serrano') || nameNorm.includes('imperio serrano')) return 'imperio_serrano';
  if (nameNorm.includes('são clemente') || nameNorm.includes('sao clemente')) return 'sao_clemente';
  if (nameNorm.includes('estácio') || nameNorm.includes('estacio')) return 'estacio_de_sa';
  if (nameNorm.includes('ilha do governador') || nameNorm.includes('união da ilha') || nameNorm.includes('uniao da ilha')) return 'uniao_da_ilha';
  if (nameNorm.includes('inocentes')) return 'inocentes';
  if (nameNorm.includes('renascer')) return 'renascer_jacarepagua';
  return nameNorm.replace(/[^a-z0-9]/g, '_');
}

/**
 * Retorna lista de carnavais históricos com resultados oficiais catalogados (2010 em diante + save)
 */
export function getHistoricalCarnavalsList(inGameHistory: YearHistory[] = []): HistoricalCarnavalInfo[] {
  const result: HistoricalCarnavalInfo[] = [];

  // Anos simulados in-game (> 2026)
  const inGameYears = inGameHistory
    .filter((h) => h.year > 2026 && h.especialStandings && h.especialStandings.length > 0)
    .sort((a, b) => b.year - a.year);

  inGameYears.forEach((h) => {
    const stands = h.especialStandings || [];
    const champs = stands.filter((s) => s.rank === 1).map((s) => s.schoolName);
    const vices = stands.filter((s) => s.rank === 2).map((s) => s.schoolName);
    result.push({
      year: h.year,
      standings: stands.map((s) => ({
        rank: s.rank,
        schoolId: resolveSchoolId(s.schoolId, s.schoolName),
        schoolName: s.schoolName,
        totalScore: s.totalScore
      })),
      isNoCarnaval: false,
      notes: `Carnaval simulado durante o save (Ano ${h.year}).`,
      championNames: champs,
      viceChampionNames: vices,
      totalSchools: stands.length
    });
  });

  // Anos oficiais catalogados (2026 descendo até 2010)
  const officialYears = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010];
  officialYears.forEach((yr) => {
    const stands = OFFICIAL_LIESA_HISTORICAL_STANDINGS[yr] || [];
    if (yr === 2021) {
      result.push({
        year: 2021,
        standings: [],
        isNoCarnaval: true,
        notes: 'Não Houve Desfile de Carnaval no Sambódromo da Marquês de Sapucaí em razão da pandemia de COVID-19. Nenhum ponto atribuído.',
        championNames: [],
        viceChampionNames: [],
        totalSchools: 0
      });
      return;
    }

    const champs = stands.filter((s) => s.rank === 1 && !s.isHorsConcours).map((s) => s.schoolName);
    const vices = stands.filter((s) => s.rank === 2 && !s.isHorsConcours).map((s) => s.schoolName);

    let notes: string | undefined;
    if (yr === 2017) {
      notes = 'Carnaval histórico com duas campeãs oficiais pela LIESA: Portela e Mocidade Independente de Padre Miguel dividiram o título (ambas pontuando 20 pontos de campeã). Devido aos acidentes graves com carros alegóricos na pista, a plenária da LIESA decidiu por unanimidade que NÃO houve rebaixamento em 2017 (Paraíso do Tuiuti manteve-se no Grupo Especial).';
    } else if (yr === 2020) {
      notes = 'Carnaval 2020: Unidos do Viradouro conquistou o campeonato com 20 pontos, e Grande Rio foi a vice-campeã com 15 pontos. Estácio de Sá e União da Ilha foram rebaixadas para a Série Ouro.';
    } else if (yr === 2019) {
      notes = 'Carnaval 2019: Estação Primeira de Mangueira foi campeã com 20 pontos e Viradouro vice com 15 pontos. Edição com 14 escolas no Grupo Especial: Imperatriz Leopoldinense e Império Serrano foram rebaixadas para a Série Ouro.';
    } else if (yr === 2018) {
      notes = 'Carnaval 2018: Beija-Flor de Nilópolis foi campeã com 20 pontos e Paraíso do Tuiuti vice-campeã histórica com 15 pontos. Em plenária extraordinária da LIESA, foi decidido que NÃO houve rebaixamento em 2018 (Acadêmicos do Grande Rio e Império Serrano permaneceram no Grupo Especial, ampliando o grupo para 14 escolas em 2019).';
    } else if (yr === 2016) {
      notes = 'Carnaval 2016: Estação Primeira de Mangueira foi campeã com 20 pontos e Unidos da Tijuca vice com 15 pontos.';
    } else if (yr === 2015) {
      notes = 'Carnaval 2015: Beija-Flor de Nilópolis foi campeã com 20 pontos e Acadêmicos do Salgueiro vice com 15 pontos.';
    } else if (yr === 2014) {
      notes = 'Carnaval 2014: Unidos da Tijuca foi campeã com o enredo histórico "Acelera, Tijuca!" em tributo a Ayrton Senna (+20 pts) e Acadêmicos do Salgueiro vice-campeã com "Gaia" (+15 pts). Império da Tijuca rebaixada.';
    } else if (yr === 2013) {
      notes = 'Carnaval 2013: Unidos de Vila Isabel sagrou-se campeã com "A Vila Canta o Brasil Celeiro do Mundo" (+20 pts) e Beija-Flor de Nilópolis vice-campeã com "Amigo Fiel" (+15 pts). Inocentes de Belford Roxo rebaixada.';
    } else if (yr === 2012) {
      notes = 'Carnaval 2012: Unidos da Tijuca conquistou o campeonato com homenagem a Luiz Gonzaga (+20 pts) e Acadêmicos do Salgueiro foi vice-campeã com "Cordel Branco e Encarnado" (+15 pts). Porto da Pedra e Renascer de Jacarepaguá rebaixadas.';
    } else if (yr === 2011) {
      notes = 'Carnaval 2011: Marcado pelo incêndio na Cidade do Samba semanas antes do desfile que atingiu os barracões de Grande Rio, Portela e União da Ilha. As três agremiações desfilaram como Hors concours (sem receber notas e sem risco de rebaixamento). Beija-Flor foi campeã com enredo sobre Roberto Carlos (+20 pts) e Unidos da Tijuca vice-campeã (+15 pts). Não houve rebaixamento.';
    } else if (yr === 2010) {
      notes = 'Carnaval 2010: Unidos da Tijuca sagrou-se campeã quebrando jejum histórico com a inovadora comissão de frente de Paulo Barros no enredo "É Segredo!" (+20 pts) e Acadêmicos do Grande Rio foi a vice-campeã (+15 pts). Viradouro rebaixada.';
    }

    result.push({
      year: yr,
      standings: stands,
      isNoCarnaval: false,
      notes,
      championNames: champs,
      viceChampionNames: vices,
      totalSchools: stands.length
    });
  });

  return result;
}

/**
 * Calcula o Ranking Oficial da LIESA dos últimos 5 carnavais.
 * Atualiza-se dinamicamente conforme os anos avançam no save.
 * Exemplo de janela móvel de 5 anos:
 * - Em 2026: 2022, 2023, 2024, 2025, 2026
 * - Em 2027: 2023, 2024, 2025, 2026, 2027
 * Anos sem desfile (como 2021) computam 0 pontos conforme o regulamento.
 */
export function computeLiesa5YearRanking(
  allSchools: School[],
  inGameHistory: YearHistory[] = [],
  currentYear: number = 2026
): {
  entries: LiesaRankingEntry[];
  yearsWindow: number[];
} {
  // Determina a janela dos 5 últimos carnavais
  // Janela móvel: os 5 carnavais terminando no mais recente concluído ou atual
  // Se o ano atual ainda não teve apuração concluída no save, verifica se há resultados desse ano
  const hasHistoryForCurrent = inGameHistory.some((h) => h.year === currentYear && h.especialStandings && h.especialStandings.length > 0);
  const baseEndYear = hasHistoryForCurrent || currentYear <= 2026 ? currentYear : currentYear - 1;
  const startYear = Math.max(2022, baseEndYear - 4);
  const yearsWindow: number[] = [];
  for (let y = baseEndYear - 4; y <= baseEndYear; y++) {
    yearsWindow.push(y);
  }

  const schoolsMap = new Map<string, School>();
  allSchools.forEach((s) => schoolsMap.set(s.id, s));

  // Mapa de resultados por ano: ano -> LiesaStandingRecord[]
  const standingsByYear = new Map<number, LiesaStandingRecord[]>();

  // 1. Carrega dados oficiais estáticos 2022-2026
  Object.entries(OFFICIAL_LIESA_STANDINGS_2022_2026).forEach(([yearStr, records]) => {
    standingsByYear.set(parseInt(yearStr, 10), records);
  });

  // 2. Sobrescreve/adiciona anos salvos em inGameHistory
  inGameHistory.forEach((h) => {
    if (h.especialStandings && h.especialStandings.length > 0) {
      standingsByYear.set(
        h.year,
        h.especialStandings.map((st) => ({
          rank: st.rank,
          schoolId: resolveSchoolId(st.schoolId, st.schoolName, schoolsMap),
          schoolName: st.schoolName,
          totalScore: st.totalScore
        }))
      );
    }
  });

  // Dicionário acumulador por escola
  const schoolAggregator: Record<
    string,
    {
      schoolId: string;
      schoolName: string;
      totalPoints: number;
      titlesInWindow: number;
      vicesInWindow: number;
      performances: Record<number, LiesaSchoolYearPerformance>;
    }
  > = {};

  // Inicializa com todas as escolas ativas conhecidas para que constem no ranking
  allSchools.forEach((s) => {
    schoolAggregator[s.id] = {
      schoolId: s.id,
      schoolName: cleanSchoolName(s),
      totalPoints: 0,
      titlesInWindow: 0,
      vicesInWindow: 0,
      performances: {}
    };
  });

  // Itera sobre a janela de 5 anos
  yearsWindow.forEach((yr) => {
    const yearResults = standingsByYear.get(yr) || [];
    
    // Registra para as escolas que desfilaram no Grupo Especial naquele ano
    yearResults.forEach((rec) => {
      const sId = resolveSchoolId(rec.schoolId, rec.schoolName, schoolsMap);
      if (!schoolAggregator[sId]) {
        schoolAggregator[sId] = {
          schoolId: sId,
          schoolName: rec.schoolName,
          totalPoints: 0,
          titlesInWindow: 0,
          vicesInWindow: 0,
          performances: {}
        };
      }

      const points = getLiesaPoints(rec.rank);
      schoolAggregator[sId].performances[yr] = {
        year: yr,
        rank: rec.rank,
        points,
        participated: true,
        schoolName: rec.schoolName
      };
      schoolAggregator[sId].totalPoints += points;
      if (rec.rank === 1) schoolAggregator[sId].titlesInWindow++;
      if (rec.rank === 2) schoolAggregator[sId].vicesInWindow++;
    });

    // Para as que não desfilaram no Especial no ano yr
    Object.keys(schoolAggregator).forEach((sId) => {
      if (!schoolAggregator[sId].performances[yr]) {
        schoolAggregator[sId].performances[yr] = {
          year: yr,
          rank: undefined,
          points: 0,
          participated: false
        };
      }
    });
  });

  // Converte para array e ordena conforme regulamento da LIESA:
  // 1. Maior pontuação total nos 5 anos
  // 2. Maior número de títulos no período
  // 3. Maior número de vice-campeonatos no período
  // 4. Melhor colocação no carnaval mais recente da janela
  const sortedList = Object.values(schoolAggregator)
    .filter((entry) => {
      // Exibe todas as escolas que pontuaram OU que pertencem ao Grupo Especial atual
      const sObj = schoolsMap.get(entry.schoolId);
      return entry.totalPoints > 0 || (sObj && sObj.division === 'especial');
    })
    .sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (b.titlesInWindow !== a.titlesInWindow) {
        return b.titlesInWindow - a.titlesInWindow;
      }
      if (b.vicesInWindow !== a.vicesInWindow) {
        return b.vicesInWindow - a.vicesInWindow;
      }
      // Desempate: colocação no ano mais recente da janela
      const latestYear = yearsWindow[yearsWindow.length - 1];
      const rankA = a.performances[latestYear]?.rank ?? 999;
      const rankB = b.performances[latestYear]?.rank ?? 999;
      return rankA - rankB;
    });

  const entries: LiesaRankingEntry[] = sortedList.map((entry, index) => ({
    position: index + 1,
    schoolId: entry.schoolId,
    schoolName: entry.schoolName,
    school: schoolsMap.get(entry.schoolId),
    totalPoints: entry.totalPoints,
    titlesInWindow: entry.titlesInWindow,
    vicesInWindow: entry.vicesInWindow,
    performancesByYear: entry.performances,
    yearsCovered: yearsWindow
  }));

  return { entries, yearsWindow };
}

/**
 * Calcula o Ranking Histórico da LIESA (considerando toda a história do Carnaval).
 * Aplica os mesmos moldes e atribuições de pontos da LIESA:
 * - 20 pontos por título no Grupo Especial
 * - 15 pontos por vice-campeonato no Grupo Especial
 * - Pontuações detalhadas de 3º a 10º lugar para todos os anos com resultados catalogados (como 2022 a 2026 e anos simulados)
 */
export function computeHistoricalLiesaRanking(
  allSchools: School[],
  inGameHistory: YearHistory[] = []
): HistoricalLiesaEntry[] {
  const schoolsMap = new Map<string, School>();
  allSchools.forEach((s) => schoolsMap.set(s.id, s));

  // Acumulador de pontos históricos
  const historicalMap: Record<
    string,
    {
      schoolId: string;
      schoolName: string;
      totalPoints: number;
      totalEspecialTitles: number;
      totalEspecialVices: number;
      titlePoints: number;
      vicePoints: number;
      recentPointsPre2022: number;
      pointsDetailedEra: number;
      pointsEraPre2015: number;
      performancesDetailed: Record<number, LiesaSchoolYearPerformance>;
      performances2022Onward: Record<number, LiesaSchoolYearPerformance>;
      totalCarnavalesContados: number;
    }
  > = {};

  const ensureEntry = (sId: string, name?: string) => {
    if (!historicalMap[sId]) {
      const sObj = schoolsMap.get(sId);
      historicalMap[sId] = {
        schoolId: sId,
        schoolName: sObj ? cleanSchoolName(sObj) : name || sId,
        totalPoints: 0,
        totalEspecialTitles: 0,
        totalEspecialVices: 0,
        titlePoints: 0,
        vicePoints: 0,
        recentPointsPre2022: 0,
        pointsDetailedEra: 0,
        pointsEraPre2015: 0,
        performancesDetailed: {},
        performances2022Onward: {},
        totalCarnavalesContados: 0
      };
    }
    return historicalMap[sId];
  };

  // 1. Processa todos os títulos e vices históricos da era pré-2010 a partir de HISTORICAL_CARNAVAL_RECORDS
  // A partir de 2010 em diante, todas as colocações detalhadas vêm do catálogo oficial LIESA
  Object.entries(HISTORICAL_CARNAVAL_RECORDS).forEach(([id, rec]) => {
    const sId = resolveSchoolId(id, undefined, schoolsMap);
    const entry = ensureEntry(sId);

    const espYearsPre2010 = (rec.especialYears || []).filter((y) => y < 2010);
    const espViceYearsPre2010 = (rec.especialRunnerUpYears || []).filter((y) => y < 2010);

    const titlesPre2010 = espYearsPre2010.length;
    const vicesPre2010 = espViceYearsPre2010.length;

    entry.totalEspecialTitles += titlesPre2010;
    entry.totalEspecialVices += vicesPre2010;
    entry.titlePoints += titlesPre2010 * 20;
    entry.vicePoints += vicesPre2010 * 15;
    entry.pointsEraPre2015 += titlesPre2010 * 20 + vicesPre2010 * 15;
    entry.totalPoints += titlesPre2010 * 20 + vicesPre2010 * 15;
    entry.totalCarnavalesContados += titlesPre2010 + vicesPre2010;
  });

  // 2. Processa anos de 2010 a 2026 oficiais (com todas as colocações de 1º a 14º)
  Object.entries(OFFICIAL_LIESA_HISTORICAL_STANDINGS).forEach(([yrStr, list]) => {
    const yr = parseInt(yrStr, 10);
    if (yr === 2021 || !list || list.length === 0) {
      // 2021: Não Houve Carnaval
      return;
    }

    list.forEach((st) => {
      const sId = resolveSchoolId(st.schoolId, st.schoolName, schoolsMap);
      const entry = ensureEntry(sId, st.schoolName);
      const pts = st.isHorsConcours ? 0 : getLiesaPoints(st.rank);

      const perf: LiesaSchoolYearPerformance = {
        year: yr,
        rank: st.isHorsConcours ? undefined : st.rank,
        points: pts,
        participated: true,
        schoolName: st.schoolName,
        isHorsConcours: st.isHorsConcours
      };

      entry.performancesDetailed[yr] = perf;
      if (yr >= 2022) {
        entry.performances2022Onward[yr] = perf;
      }

      entry.totalPoints += pts;
      entry.pointsDetailedEra += pts;
      entry.totalCarnavalesContados++;

      if (!st.isHorsConcours) {
        if (st.rank === 1) {
          entry.totalEspecialTitles++;
          entry.titlePoints += 20;
        } else if (st.rank === 2) {
          entry.totalEspecialVices++;
          entry.vicePoints += 15;
        }
      }
    });
  });

  // 3. Processa anos do jogo simulados (2027 em diante)
  inGameHistory.forEach((h) => {
    if (h.year > 2026 && h.especialStandings && h.especialStandings.length > 0) {
      h.especialStandings.forEach((st) => {
        const sId = resolveSchoolId(st.schoolId, st.schoolName, schoolsMap);
        const entry = ensureEntry(sId, st.schoolName);
        const pts = getLiesaPoints(st.rank);

        const perf: LiesaSchoolYearPerformance = {
          year: h.year,
          rank: st.rank,
          points: pts,
          participated: true,
          schoolName: st.schoolName
        };

        entry.performancesDetailed[h.year] = perf;
        entry.performances2022Onward[h.year] = perf;

        entry.totalPoints += pts;
        entry.pointsDetailedEra += pts;
        entry.totalCarnavalesContados++;

        if (st.rank === 1) {
          entry.totalEspecialTitles++;
          entry.titlePoints += 20;
        } else if (st.rank === 2) {
          entry.totalEspecialVices++;
          entry.vicePoints += 15;
        }
      });
    }
  });

  // 4. Ordena o ranking histórico:
  // - Maior pontuação total histórica
  // - Maior número de títulos no Grupo Especial
  // - Maior número de vices no Grupo Especial
  const sorted = Object.values(historicalMap)
    .filter((e) => e.totalPoints > 0)
    .sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (b.totalEspecialTitles !== a.totalEspecialTitles) {
        return b.totalEspecialTitles - a.totalEspecialTitles;
      }
      return b.totalEspecialVices - a.totalEspecialVices;
    });

  return sorted.map((entry, index) => ({
    position: index + 1,
    schoolId: entry.schoolId,
    schoolName: entry.schoolName,
    school: schoolsMap.get(entry.schoolId),
    totalPoints: entry.totalPoints,
    totalEspecialTitles: entry.totalEspecialTitles,
    totalEspecialVices: entry.totalEspecialVices,
    titlePoints: entry.titlePoints,
    vicePoints: entry.vicePoints,
    recentPointsPre2022: entry.recentPointsPre2022,
    pointsDetailedEra: entry.pointsDetailedEra,
    pointsEraPre2015: entry.pointsEraPre2015,
    performancesDetailed: entry.performancesDetailed,
    performances2022Onward: entry.performances2022Onward,
    totalCarnavalesContados: entry.totalCarnavalesContados
  }));
}
