import { DivisionId, School } from '../types/carnaval';

export type VenueId = 'sapucai' | 'intendente';

export const VENUES: Record<VenueId, {
  name: string;
  liveLabel: string;
  endPhrase: string;
  sectors: string[];       // 6 trechos da pista (usado no "📍 posição atual")
  checkpoints: string[];   // rótulos curtos abaixo da barra
  eventSectors: string[];  // 7 setores dos eventos do roteiro
}> = {
  sapucai: {
    name: 'Marquês de Sapucaí',
    liveLabel: 'AO VIVO NA MARQUÊS DE SAPUCAÍ',
    endPhrase: 'na Praça da Apoteose',
    sectors: [
      'Setor 1 / Armação',
      'Cabine de Jurados 1 (Setores 2/3)',
      'Setores 5 e 6 / Balcões',
      'Cabine 2 & Recuo de Bateria (Setores 9/11)',
      'Cabines 3 e 4 (Setor 10)',
      'Praça da Apoteose / Dispersão'
    ],
    checkpoints: ['Setor 1', 'Cabine 1', 'Balcões', 'Recuo Bateria', 'Cabine 3/4', 'Apoteose'],
    eventSectors: [
      'Setor 1 (Armação & Entrada)',
      'Cabine 1 (Setores 2 e 3)',
      'Setores 5 e 6 (Balcões Centrais)',
      'Cabine 2 (Setor 7)',
      'Segundo Recuo de Bateria (Setor 9)',
      'Cabines 3 e 4 (Setor 10)',
      'Praça da Apoteose (Dispersão)'
    ]
  },
  intendente: {
    name: 'Estrada Intendente Magalhães',
    liveLabel: 'AO VIVO NA ESTRADA INTENDENTE MAGALHÃES',
    endPhrase: 'na dispersão da Estrada Intendente Magalhães',
    sectors: [
      'Concentração / Armação',
      'Cabine de Jurados 1',
      'Meio da Pista',
      'Recuo de Bateria',
      'Cabine de Jurados 2',
      'Dispersão'
    ],
    checkpoints: ['Concentração', 'Cabine 1', 'Meio da Pista', 'Recuo Bateria', 'Cabine 2', 'Dispersão'],
    eventSectors: [
      'Concentração (Armação & Entrada)',
      'Cabine de Jurados 1',
      'Meio da Pista',
      'Cabine de Jurados 2',
      'Recuo de Bateria',
      'Trecho Final da Pista',
      'Dispersão'
    ]
  }
};

export type LeagueId = 'liesa' | 'ligarj' | 'superliga';

export interface LeagueConfig {
  id: LeagueId;
  name: string;
  fullName: string;
  roleDescription: string;
  divisions: DivisionId[];
  venue: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
}

export const LEAGUES: Record<LeagueId, LeagueConfig> = {
  liesa: {
    id: 'liesa',
    name: 'LIESA',
    fullName: 'Liga Independente das Escolas de Samba do Rio de Janeiro',
    roleDescription: 'É responsável e administra o Grupo Especial',
    divisions: ['especial'],
    venue: 'Sambódromo Marquês de Sapucaí',
    badgeBg: 'bg-amber-500/20',
    badgeText: 'text-amber-300',
    badgeBorder: 'border-amber-500/40'
  },
  ligarj: {
    id: 'ligarj',
    name: 'LIGA RJ',
    fullName: 'Liga Independente do Grupo A do Rio de Janeiro',
    roleDescription: 'Administra e é responsável pela Série Ouro',
    divisions: ['ouro'],
    venue: 'Sambódromo Marquês de Sapucaí',
    badgeBg: 'bg-blue-500/20',
    badgeText: 'text-blue-300',
    badgeBorder: 'border-blue-500/40'
  },
  superliga: {
    id: 'superliga',
    name: 'Superliga',
    fullName: 'Superliga Carnavalesca do Brasil',
    roleDescription: 'É responsável por administrar a Série Prata, Série Bronze e o Grupo de Avaliação',
    divisions: ['prata', 'bronze', 'avaliacao'],
    venue: 'Estrada Intendente Magalhães',
    badgeBg: 'bg-purple-500/20',
    badgeText: 'text-purple-300',
    badgeBorder: 'border-purple-500/40'
  }
};

export const DIVISION_LEAGUE_MAP: Record<DivisionId, LeagueId> = {
  especial: 'liesa',
  ouro: 'ligarj',
  prata: 'superliga',
  bronze: 'superliga',
  avaliacao: 'superliga'
};

export interface GroupParadeConfig {
  label: string;
  minMinutes: number;
  maxMinutes: number;
  venue: VenueId;
  schedule: string; // texto exibido na aba
  leagueId: LeagueId;
  leagueName: string;
  leagueFullName: string;
}

export const PARADE_CONFIG: Record<DivisionId, GroupParadeConfig> = {
  especial: {
    label: 'Grupo Especial',
    minMinutes: 70,
    maxMinutes: 80,
    venue: 'sapucai',
    schedule: 'Sambódromo Marquês de Sapucaí • Domingo, Segunda e Terça de Carnaval',
    leagueId: 'liesa',
    leagueName: 'LIESA',
    leagueFullName: 'Liga Independente das Escolas de Samba do Rio de Janeiro'
  },
  ouro: {
    label: 'Série Ouro',
    minMinutes: 45,
    maxMinutes: 55,
    venue: 'sapucai',
    schedule: 'Sambódromo Marquês de Sapucaí • Sexta e Sábado de Carnaval',
    leagueId: 'ligarj',
    leagueName: 'LIGA RJ',
    leagueFullName: 'Liga Independente do Grupo A do Rio de Janeiro'
  },
  prata: {
    label: 'Série Prata',
    minMinutes: 35,
    maxMinutes: 40,
    venue: 'intendente',
    schedule: 'Estrada Intendente Magalhães • Segunda e Terça-Feira de Carnaval',
    leagueId: 'superliga',
    leagueName: 'Superliga',
    leagueFullName: 'Superliga Carnavalesca do Brasil'
  },
  bronze: {
    label: 'Série Bronze',
    minMinutes: 30,
    maxMinutes: 35,
    venue: 'intendente',
    schedule: 'Estrada Intendente Magalhães • Sábado e Domingo de Carnaval',
    leagueId: 'superliga',
    leagueName: 'Superliga',
    leagueFullName: 'Superliga Carnavalesca do Brasil'
  },
  avaliacao: {
    label: 'Grupo de Avaliação',
    minMinutes: 28,
    maxMinutes: 33,
    venue: 'intendente',
    schedule: 'Estrada Intendente Magalhães • Quarta-Feira de Cinzas',
    leagueId: 'superliga',
    leagueName: 'Superliga',
    leagueFullName: 'Superliga Carnavalesca do Brasil'
  }
};

export interface SimulatedParadeTimeResult {
  duration: number;
  timeStatus: 'regular' | 'estouro' | 'abaixo';
  penalty: number;
  diffMinutes: number;
}

/**
 * Simulates a realistic parade duration dynamically based on parade performance.
 * The parade is NOT pre-defined: depending on pacing, evolution, harmonia,
 * rehearsals, and unexpected incidents (floats stuck, gaps/buracos, panicked rush),
 * the school can exceed the max time or finish below min time.
 * Every minute over or under causes an official penalty of -0.1 points per minute!
 */
export const simulateParadeDuration = (school: School): SimulatedParadeTimeResult => {
  const config = PARADE_CONFIG[school.division] || { minMinutes: 70, maxMinutes: 80 };
  const { minMinutes, maxMinutes } = config;
  const targetIdeal = Math.round((minMinutes + maxMinutes) / 2);

  const harmonia = school.attributes?.harmonia ?? 80;
  const evolucao = school.attributes?.evolucao ?? 80;
  const rehearsal = school.rehearsalLevel ?? 70;
  const barracao = school.barracaoProgress ?? 70;

  // Preparation factor roughly between -10 and +10
  const prepFactor = ((harmonia + evolucao) / 2 - 80) * 0.35 + (rehearsal - 75) * 0.25 + (barracao - 75) * 0.15;

  // Base random pacing variance
  const varianceSpread = prepFactor > 4 ? 2 : prepFactor < -4 ? 5 : 3;
  const randOffset = (Math.random() - 0.5) * varianceSpread * 2;

  // Dynamic incident simulation
  let incidentDelay = 0;
  const roll = Math.random();

  if (barracao < 70 && roll < 0.28) {
    // Problem with float or structure: delay +1 to +3 min
    incidentDelay += Math.floor(Math.random() * 3) + 1;
  } else if (rehearsal < 65 && roll < 0.25) {
    // Big hole in evolution: delay +1 to +2 min
    incidentDelay += Math.floor(Math.random() * 2) + 1;
  } else if (rehearsal < 60 && roll > 0.85) {
    // Panicked director accelerated the wings too much: finished early -1 to -2 min
    incidentDelay -= (Math.floor(Math.random() * 2) + 1);
  }

  let finalMinutes = Math.round(targetIdeal + randOffset + incidentDelay);

  let penalty = 0;
  let timeStatus: 'regular' | 'estouro' | 'abaixo' = 'regular';
  let diffMinutes = 0;

  if (finalMinutes > maxMinutes) {
    diffMinutes = finalMinutes - maxMinutes;
    penalty = Math.round(diffMinutes * 0.1 * 10) / 10;
    timeStatus = 'estouro';
  } else if (finalMinutes < minMinutes) {
    diffMinutes = minMinutes - finalMinutes;
    penalty = Math.round(diffMinutes * 0.1 * 10) / 10;
    timeStatus = 'abaixo';
  }

  return {
    duration: finalMinutes,
    timeStatus,
    penalty,
    diffMinutes
  };
};

export const getParadeDuration = (school: School, _year?: number): number => {
  return simulateParadeDuration(school).duration;
};

// Fronteiras (em % do desfile) entre os 6 trechos da pista
const SECTOR_BOUNDS = [0.14, 0.36, 0.57, 0.79, 0.96];

export const getSectorIndex = (minute: number, duration: number): number => {
  if (duration <= 0) return 0;
  const p = minute / duration;
  const i = SECTOR_BOUNDS.findIndex((b) => p < b);
  return i === -1 ? SECTOR_BOUNDS.length : i;
};
