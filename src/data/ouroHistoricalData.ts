/**
 * REGISTRO HISTÓRICO OFICIAL DA SÉRIE OURO (LIGA-RJ)
 * 
 * Fonte da verdade para resultados históricos oficiais, colocações, enredos
 * e movimentações de acesso e rebaixamento da Série Ouro do Carnaval Carioca.
 */

import type { YearHistory, School } from '../types/carnaval';
import { cleanSchoolName } from '../utils/schoolNameUtils';

export interface OuroStandingRecord {
  rank: number;
  schoolId: string;
  schoolName: string;
  totalScore?: number;
  enredo?: string;
  promoted?: boolean; // Subiu ao Grupo Especial
  relegated?: boolean; // Rebaixada para Série Prata
  statusDescription?: string;
}

export interface OuroHistoricalCarnaval {
  year: number;
  standings: OuroStandingRecord[];
  notes?: string;
  championNames: string[];
  viceChampionNames: string[];
  promotedNames: string[];
  relegatedNames: string[];
  totalSchools: number;
  isNoCarnaval?: boolean;
}

/**
 * Resultados Oficiais da Série Ouro catalogados por ano
 */
export const OFFICIAL_OURO_HISTORICAL_STANDINGS: Record<number, OuroStandingRecord[]> = {
  2026: [
    {
      rank: 1,
      schoolId: 'marica',
      schoolName: 'União de Maricá',
      enredo: 'Berenguendéns & Balangandãs',
      totalScore: 269.9,
      promoted: true,
      statusDescription: 'Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'imperio_serrano',
      schoolName: 'Império Serrano',
      enredo: 'Ponciá Evaristo, Flor do Mulungu',
      totalScore: 269.8,
      statusDescription: 'Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Kunhã-Eté: O Sopro Sagrado da Jurema',
      totalScore: 269.7,
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'uniao_da_ilha',
      schoolName: 'União da Ilha do Governador',
      enredo: 'Viva o hoje! O amanhã? Fica pra Depois',
      totalScore: 269.5,
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Salve Todas as Marias – Laroyê, Pombagiras!',
      totalScore: 269.4,
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'Tata Tancredo - O Papa Negro no Terreiro do Estácio',
      totalScore: 269.2,
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'porto_da_pedra',
      schoolName: 'Unidos do Porto da Pedra',
      enredo: 'Das Mais Antigas da Vida, o Doce e Amargo Beijo da Noite',
      totalScore: 269.0,
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'parque_acari',
      schoolName: 'União do Parque Acari',
      enredo: 'Brasiliana',
      totalScore: 268.8,
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'botafogo_samba_clube',
      schoolName: 'Botafogo Samba Clube',
      enredo: 'O Brasil que Floresce em Arte',
      totalScore: 268.7,
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'vigario_geral',
      schoolName: 'Acadêmicos de Vigário Geral',
      enredo: 'Brasil Incógnito - O Que Os Seus Olhos Não Veem, A Minha Imaginação Reinventa',
      totalScore: 268.5,
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Tamborzão – O Rio é Baile! O Poder é Black!',
      totalScore: 268.4,
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'As Coisas que Mamãe me Ensinou',
      totalScore: 268.2,
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'arranco',
      schoolName: 'Arranco do Engenho de Dentro',
      enredo: 'A Gargalhada é o Xamego da Vida',
      totalScore: 268.0,
      statusDescription: '13º Lugar'
    },
    {
      rank: 14,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'O Sonho de um Tal Pagode Russo nos Frevos do meu Pernambuco',
      totalScore: 267.8,
      statusDescription: '14º Lugar'
    },
    {
      rank: 15,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'O ar que se respira agora inspira novos tempos',
      totalScore: 267.6,
      statusDescription: '15º Lugar'
    }
  ]
};

/**
 * Notas históricas por edição da Série Ouro
 */
export const OFFICIAL_OURO_NOTES_BY_YEAR: Record<number, string> = {
  2026: 'Carnaval de 2026: (Não Houve Rebaixamento) • União de Maricá Campeã e promovida ao Grupo Especial.'
};

/**
 * Retorna lista de carnavais históricos da Série Ouro catalogados somados aos simulados no save
 */
export function getHistoricalOuroCarnavalsList(inGameHistory: YearHistory[] = []): OuroHistoricalCarnaval[] {
  const result: OuroHistoricalCarnaval[] = [];

  // Anos simulados in-game (> 2026)
  const inGameYears = inGameHistory
    .filter((h) => h.year > 2026 && h.ouroStandings && h.ouroStandings.length > 0)
    .sort((a, b) => b.year - a.year);

  inGameYears.forEach((h) => {
    const stands = h.ouroStandings || [];
    const champs = stands.filter((s) => s.rank === 1).map((s) => s.schoolName);
    const vices = stands.filter((s) => s.rank === 2).map((s) => s.schoolName);
    const promoted = h.ouroChampion ? [h.ouroChampion] : champs;
    const relegated = h.ouroRelegated || [];

    result.push({
      year: h.year,
      standings: stands.map((s) => ({
        rank: s.rank,
        schoolId: s.schoolId || '',
        schoolName: s.schoolName,
        totalScore: s.totalScore,
        promoted: s.rank === 1,
        relegated: relegated.includes(s.schoolName) || (s.schoolId ? relegated.includes(s.schoolId) : false),
        statusDescription:
          s.rank === 1
            ? 'Campeã • Subiu ao Grupo Especial'
            : relegated.includes(s.schoolName)
            ? 'Rebaixada para a Série Prata'
            : undefined
      })),
      notes: `Série Ouro simulada durante o save (Ano ${h.year}).`,
      championNames: champs,
      viceChampionNames: vices,
      promotedNames: promoted,
      relegatedNames: relegated,
      totalSchools: stands.length,
      isNoCarnaval: false
    });
  });

  // Anos oficiais catalogados (a começar por 2026)
  const catalogedYears = Object.keys(OFFICIAL_OURO_HISTORICAL_STANDINGS)
    .map(Number)
    .sort((a, b) => b - a);

  catalogedYears.forEach((yr) => {
    const stands = OFFICIAL_OURO_HISTORICAL_STANDINGS[yr] || [];
    const champs = stands.filter((s) => s.rank === 1).map((s) => s.schoolName);
    const vices = stands.filter((s) => s.rank === 2).map((s) => s.schoolName);
    const promoted = stands.filter((s) => s.promoted).map((s) => s.schoolName);
    const relegated = stands.filter((s) => s.relegated).map((s) => s.schoolName);

    result.push({
      year: yr,
      standings: stands,
      notes: OFFICIAL_OURO_NOTES_BY_YEAR[yr] || `Desfile Oficial da Série Ouro de ${yr}`,
      championNames: champs,
      viceChampionNames: vices,
      promotedNames: promoted,
      relegatedNames: relegated,
      totalSchools: stands.length,
      isNoCarnaval: false
    });
  });

  return result;
}
