/**
 * REGISTRO HISTÓRICO OFICIAL DA SÉRIE PRATA (SUPERLIGA CARNAVALESCA / TERCEIRA DIVISÃO)
 *
 * Fonte da verdade para resultados históricos oficiais, colocações, enredos
 * e movimentações de acesso e rebaixamento da Série Prata do Carnaval Carioca.
 */

import type { YearHistory } from '../types/carnaval';

export interface PrataStandingRecord {
  rank: number;
  schoolId: string;
  schoolName: string;
  totalScore?: number;
  enredo?: string;
  promoted?: boolean; // Subiu para a Série Ouro
  relegated?: boolean; // Rebaixada para a Série Bronze
  isHorsConcours?: boolean; // Desfilou sem julgamento / Não desfilou
  statusDescription?: string;
}

export interface PrataHistoricalCarnaval {
  year: number;
  standings: PrataStandingRecord[];
  notes?: string;
  championNames: string[];
  viceChampionNames: string[];
  promotedNames: string[];
  relegatedNames: string[];
  totalSchools: number;
  isNoCarnaval?: boolean;
}

/**
 * Resultados Oficiais da Série Prata catalogados por ano
 */
export const OFFICIAL_PRATA_HISTORICAL_STANDINGS: Record<number, PrataStandingRecord[]> = {
  2026: [
    {
      rank: 1,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Brasil de Mil Faces em Um Só Coração',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Na Tamarineira, é pagode, é carioca, é São Clemente',
      promoted: true,
      statusDescription: 'Vice-Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 3,
      schoolId: 'vila_santa_tereza',
      schoolName: 'Unidos da Vila Santa Tereza',
      enredo: 'Vila Santa Tereza não marca bobeira e festeja os 65 anos do Cacique de Ramos',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'O Menino Sonhador do Sertão',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'imperio_da_uva',
      schoolName: 'Império da Uva',
      enredo: 'Nos Caminhos da Fé, o Meu Sonho Anunciou… Salve Nossa Senhora Aparecida, a Mãe Preta do Brasil!',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'A Divina Comédia Brasileira',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'fla_manguaca',
      schoolName: 'Flamanguaça',
      enredo: 'Ecos de Sortilégios',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'O povo escreve sua história em um sublime pergaminho',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'abolicao',
      schoolName: 'Acadêmicos da Abolição',
      enredo: 'Chão é Gente. Cultivar, Cultuar e Colher Ancestralidade',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'feitico_carioca',
      schoolName: 'Feitiço Carioca',
      enredo: 'Meu Malvado do Fundo do Coração',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'O Intrépido Santo Guerreiro',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'tubarao_mesquita',
      schoolName: 'Tubarão de Mesquita',
      enredo: 'Berta Ribeiro: Da Praça Onze ao Coração da Floresta',
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'A Menina do Sertão que virou Estrela de TV - Gardênia Cavalcanti',
      statusDescription: '13º Lugar'
    },
    {
      rank: 14,
      schoolId: 'alegria_do_vilar',
      schoolName: 'Alegria do Vilar',
      enredo: 'Regido e guiado pelas Lâminas do Rei da Justiça',
      statusDescription: '14º Lugar'
    },
    {
      rank: 15,
      schoolId: 'santa_marta',
      schoolName: 'Mocidade Unida do Santa Marta',
      enredo: 'Samba é minha Cachaça',
      statusDescription: '15º Lugar'
    },
    {
      rank: 16,
      schoolId: 'independentes_olaria',
      schoolName: 'Independentes de Olaria',
      enredo: 'O balanço do cabra que embolou o som e no compasso da mistura fez um Brasil pandeiro',
      statusDescription: '16º Lugar'
    },
    {
      rank: 17,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Alafiou! Caminhos Abertos para a Vitória!',
      statusDescription: '17º Lugar'
    },
    {
      rank: 18,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Macacu - No caminho das águas cristalinas, reflete a alma da criação',
      statusDescription: '18º Lugar'
    },
    {
      rank: 19,
      schoolId: 'curicica',
      schoolName: 'União do Parque Curicica',
      enredo: 'As Viagens de Arlindo - Minha Loucura é Ser Artista',
      statusDescription: '19º Lugar'
    },
    {
      rank: 20,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Santa Rosa - Negro, Moderno, Plural',
      statusDescription: '20º Lugar'
    },
    {
      rank: 21,
      schoolId: 'arrastao_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'Cascadura se diverte nas culturas populares do Nordeste',
      statusDescription: '21º Lugar'
    },
    {
      rank: 22,
      schoolId: 'imperio_nova_iguacu',
      schoolName: 'Império de Nova Iguaçu',
      enredo: 'Kupapa Unsaba - Morada Ancestral',
      relegated: true,
      statusDescription: '22º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 23,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Quingombô - Entre Dois Mundos',
      relegated: true,
      statusDescription: '23º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 24,
      schoolId: 'siri_de_ramos',
      schoolName: 'Siri de Ramos',
      enredo: 'Jóias do Axé',
      relegated: true,
      statusDescription: '24º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 25,
      schoolId: 'academicos_do_dende',
      schoolName: 'Acadêmicos do Dendê',
      enredo: 'No Carnaval dos 7 Mares, vai dar Zebra!',
      relegated: true,
      statusDescription: '25º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 26,
      schoolId: 'praca_da_bandeira',
      schoolName: 'Independente da Praça da Bandeira',
      enredo: 'Grande Sertão Negro',
      relegated: true,
      statusDescription: '26º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 27,
      schoolId: 'chatuba',
      schoolName: 'Chatuba de Mesquita',
      enredo: 'BenEdita do povo',
      relegated: true,
      statusDescription: '27º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 28,
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'A Voz que vem do Mar é Ancestral',
      relegated: true,
      statusDescription: '28º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 29,
      schoolId: 'leao_de_nova_iguacu',
      schoolName: 'Leão de Nova Iguaçu',
      enredo: 'Maria Felipa',
      relegated: true,
      statusDescription: '29º Lugar • Rebaixada para a Série Bronze'
    }
  ]
};

export const OFFICIAL_PRATA_NOTES_BY_YEAR: Record<number, string> = {
  2026: 'Carnaval de 2026: Acadêmicos de Santa Cruz (Campeã) e São Clemente (Vice-Campeã) garantiram o acesso à Série Ouro. Império de Nova Iguaçu, União de Jacarepaguá, Siri de Ramos, Acadêmicos do Dendê, Independente da Praça da Bandeira, Chatuba de Mesquita, Vizinha Faladeira e Leão de Nova Iguaçu foram rebaixadas para a Série Bronze.'
};

/**
 * Retorna lista de carnavais históricos da Série Prata catalogados somados aos simulados no save
 */
export function getHistoricalPrataCarnavalsList(inGameHistory: YearHistory[] = []): PrataHistoricalCarnaval[] {
  const result: PrataHistoricalCarnaval[] = [];

  // Anos simulados in-game (> 2026)
  const inGameYears = inGameHistory
    .filter((h) => h.year > 2026 && h.prataStandings && h.prataStandings.length > 0)
    .sort((a, b) => b.year - a.year);

  inGameYears.forEach((h) => {
    const stands = h.prataStandings || [];
    const champs = stands.filter((s) => s.rank === 1).map((s) => s.schoolName);
    const vices = stands.filter((s) => s.rank === 2).map((s) => s.schoolName);
    const promoted = h.prataPromoted && h.prataPromoted.length > 0
      ? h.prataPromoted
      : h.prataChampion
      ? [h.prataChampion]
      : champs;
    const relegated = h.prataRelegated || [];

    result.push({
      year: h.year,
      standings: stands.map((s) => {
        const isPromoted =
          promoted.includes(s.schoolName) ||
          (s.schoolId ? promoted.includes(s.schoolId) : false) ||
          s.rank <= 2;
        const isRelegated =
          relegated.includes(s.schoolName) ||
          (s.schoolId ? relegated.includes(s.schoolId) : false);
        return {
          rank: s.rank,
          schoolId: s.schoolId || '',
          schoolName: s.schoolName,
          totalScore: s.totalScore,
          promoted: isPromoted,
          relegated: isRelegated,
          statusDescription:
            s.rank === 1
              ? 'Campeã • Subiu para a Série Ouro'
              : isPromoted
              ? 'Subiu para a Série Ouro'
              : isRelegated
              ? 'Rebaixada para a Série Bronze'
              : undefined
        };
      }),
      notes: `Série Prata simulada durante o save (Ano ${h.year}).`,
      championNames: champs,
      viceChampionNames: vices,
      promotedNames: promoted,
      relegatedNames: relegated,
      totalSchools: stands.length,
      isNoCarnaval: false
    });
  });

  // Anos oficiais catalogados (em ordem decrescente)
  const catalogedYears = Object.keys(OFFICIAL_PRATA_HISTORICAL_STANDINGS)
    .map(Number)
    .sort((a, b) => b - a);

  catalogedYears.forEach((yr) => {
    const stands = OFFICIAL_PRATA_HISTORICAL_STANDINGS[yr] || [];

    if (yr === 2021) {
      result.push({
        year: 2021,
        standings: [],
        notes: OFFICIAL_PRATA_NOTES_BY_YEAR[2021] || 'Carnaval de 2021: Não houve desfiles em 2021.',
        championNames: [],
        viceChampionNames: [],
        promotedNames: [],
        relegatedNames: [],
        totalSchools: 0,
        isNoCarnaval: true
      });
      return;
    }

    const champs = stands.filter((s) => s.rank === 1 && !s.isHorsConcours).map((s) => s.schoolName);
    const vices = stands.filter((s) => s.rank === 2 && !s.isHorsConcours).map((s) => s.schoolName);
    const promoted = stands.filter((s) => s.promoted).map((s) => s.schoolName);
    const relegated = stands.filter((s) => s.relegated).map((s) => s.schoolName);

    result.push({
      year: yr,
      standings: stands,
      notes: OFFICIAL_PRATA_NOTES_BY_YEAR[yr] || `Desfile Oficial da Série Prata de ${yr}`,
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
