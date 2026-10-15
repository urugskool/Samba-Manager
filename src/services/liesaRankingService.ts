import { School, YearHistory } from '../types/carnaval';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import { HISTORICAL_CARNAVAL_RECORDS, INITIAL_SCHOOLS } from '../data/carnavalData';

export interface LiesaStandingRecord {
  rank: number;
  schoolId: string;
  schoolName: string;
  totalScore?: number;
  isHorsConcours?: boolean;
  subgroup?: 'domingo' | 'segunda' | 'supercampeonato';
  statusDescription?: string;
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
 * Resultados específicos dos desfiles do Carnaval de 1984 (Ano da inauguração do Sambódromo):
 * Domingo de Carnaval, Segunda-Feira de Carnaval e o Supercampeonato do Sábado das Campeãs.
 */
export const CARNAVAL_1984_DOMINGO: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'portela', schoolName: 'Portela', subgroup: 'domingo', statusDescription: 'Campeã de Domingo (+20 pts)' },
  { rank: 2, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', subgroup: 'domingo', statusDescription: 'Vice-Campeã de Domingo (+15 pts)' },
  { rank: 3, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares', subgroup: 'domingo', statusDescription: '3º Lugar (Classificada Supercampeonato)' },
  { rank: 4, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', subgroup: 'domingo', statusDescription: '4º Lugar' },
  { rank: 5, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador', subgroup: 'domingo', statusDescription: '5º Lugar' },
  { rank: 6, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', subgroup: 'domingo', statusDescription: '6º Lugar' },
  { rank: 7, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', subgroup: 'domingo', statusDescription: '7º Lugar (Rebaixada)' }
];

export const CARNAVAL_1984_SEGUNDA: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', subgroup: 'segunda', statusDescription: 'Campeã de Segunda (+20 pts)' },
  { rank: 2, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', subgroup: 'segunda', statusDescription: 'Vice-Campeã de Segunda (+15 pts)' },
  { rank: 3, schoolId: 'beija_flor', schoolName: 'Beija-Flor', subgroup: 'segunda', statusDescription: '3º Lugar (Classificada Supercampeonato)' },
  { rank: 4, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', subgroup: 'segunda', statusDescription: '4º Lugar' },
  { rank: 5, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', subgroup: 'segunda', statusDescription: '5º Lugar' },
  { rank: 6, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá', subgroup: 'segunda', statusDescription: '6º Lugar' },
  { rank: 7, schoolId: 'unidos_da_ponte', schoolName: 'Unidos da Ponte', subgroup: 'segunda', statusDescription: '7º Lugar (Rebaixada)' }
];

export const CARNAVAL_1984_SUPERCAMPEONATO: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', subgroup: 'supercampeonato', statusDescription: 'Supercampeã de 1984 (+20 pts)' },
  { rank: 2, schoolId: 'portela', schoolName: 'Portela', subgroup: 'supercampeonato', statusDescription: 'Supervice-Campeã de 1984 (+15 pts)' },
  { rank: 3, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', subgroup: 'supercampeonato', statusDescription: '3º Lugar no Supercampeonato' },
  { rank: 4, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', subgroup: 'supercampeonato', statusDescription: '4º Lugar no Supercampeonato' },
  { rank: 5, schoolId: 'beija_flor', schoolName: 'Beija-Flor', subgroup: 'supercampeonato', statusDescription: '5º Lugar no Supercampeonato' },
  { rank: 6, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares', subgroup: 'supercampeonato', statusDescription: '6º Lugar no Supercampeonato' },
  { rank: 7, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', subgroup: 'supercampeonato', statusDescription: '7º Lugar (Campeã Grupo 1-B)' },
  { rank: 8, schoolId: 'santa_cruz', schoolName: 'Acadêmicos de Santa Cruz', subgroup: 'supercampeonato', statusDescription: '8º Lugar (Vice Grupo 1-B)' }
];

/**
 * Resultados oficiais catalogados dos carnavais históricos (1984 a 2026)
 * fornecidos pela LIESA para balizar o ranking oficial e histórico do jogo.
 * Carnaval 2021: Não houve desfiles (0 pontos) devido à pandemia.
 * Carnaval 2018: Não houve rebaixamento por decisão unânime da plenária da LIESA.
 * Carnaval 2017: Duas campeãs oficiais (Portela e Mocidade Independente) e NÃO houve rebaixamento.
 * Carnaval 2011: Grande Rio, Portela e União da Ilha desfilaram como Hors concours (sem rebaixamento).
 * Carnaval 1998: Duas campeãs oficiais dividindo o título (Beija-Flor e Mangueira).
 * Carnaval 1994: Não houve rebaixamento no Grupo Especial.
 * Carnaval 1993: Não houve rebaixamento no Grupo Especial.
 * Carnaval 1988: Não houve rebaixamento no Grupo Especial.
 * Carnaval 1984: Inauguração da Passarela do Samba com 3 campeãs e três desfiles: Domingo, Segunda-Feira e Supercampeonato.
 */
export const OFFICIAL_LIESA_HISTORICAL_STANDINGS: Record<number, LiesaStandingRecord[]> = {
  1984: [
    { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: 'Supercampeã e Campeã de Segunda (+20 pts)' },
    { rank: 1, schoolId: 'portela', schoolName: 'Portela', statusDescription: 'Campeã de Domingo e Supervice (+20 pts)' },
    { rank: 2, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: 'Vice-Campeã de Domingo e 4º no Super (+15 pts)' },
    { rank: 2, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: 'Vice-Campeã de Segunda e 3º no Super (+15 pts)' },
    { rank: 3, schoolId: 'beija_flor', schoolName: 'Beija-Flor', statusDescription: '3º Lugar Segunda e 5º no Super (+12 pts)' },
    { rank: 3, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares', statusDescription: '3º Lugar Domingo e 6º no Super (+12 pts)' },
    { rank: 4, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: '4º Lugar Domingo (+10 pts)' },
    { rank: 4, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', statusDescription: '4º Lugar Segunda (+10 pts)' },
    { rank: 5, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador', statusDescription: '5º Lugar Domingo (+8 pts)' },
    { rank: 5, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', statusDescription: '5º Lugar Segunda (+8 pts)' },
    { rank: 6, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', statusDescription: '6º Lugar Domingo (+6 pts)' },
    { rank: 6, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá', statusDescription: '6º Lugar Segunda (+6 pts)' },
    { rank: 7, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', statusDescription: '7º Lugar no Supercampeonato (+4 pts)' },
    { rank: 8, schoolId: 'santa_cruz', schoolName: 'Acadêmicos de Santa Cruz', statusDescription: '8º Lugar no Supercampeonato (+3 pts)' },
    { rank: 15, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', statusDescription: '7º Lugar Domingo (Rebaixada)' },
    { rank: 16, schoolId: 'unidos_da_ponte', schoolName: 'Unidos da Ponte', statusDescription: '7º Lugar Segunda (Rebaixada)' }
  ],
  1985: [
    { rank: 1, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 2, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 3, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 4, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 5, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares' },
    { rank: 6, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 7, schoolId: 'imperio_serrano', schoolName: 'Império Serrano' },
    { rank: 8, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 9, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 10, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá' },
    { rank: 11, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca' },
    { rank: 12, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 13, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu' },
    { rank: 14, schoolId: 'santa_cruz', schoolName: 'Acadêmicos de Santa Cruz' },
    { rank: 15, schoolId: 'sao_clemente', schoolName: 'São Clemente' },
    { rank: 16, schoolId: 'em_cima_da_hora', schoolName: 'Em Cima da Hora' }
  ],
  1986: [
    { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 2, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 3, schoolId: 'imperio_serrano', schoolName: 'Império Serrano' },
    { rank: 4, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 5, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 6, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 7, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 8, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 9, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares' },
    { rank: 10, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá' },
    { rank: 11, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 12, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca' },
    { rank: 13, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu' },
    { rank: 14, schoolId: 'unidos_da_ponte', schoolName: 'Unidos da Ponte' },
    { rank: 15, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' }
  ],
  1987: [
    { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 2, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 3, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 4, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 4, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá' },
    { rank: 5, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 5, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 6, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 7, schoolId: 'sao_clemente', schoolName: 'São Clemente' },
    { rank: 7, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu' },
    { rank: 8, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares' },
    { rank: 9, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 10, schoolId: 'unidos_da_ponte', schoolName: 'Unidos da Ponte' },
    { rank: 11, schoolId: 'jacarezinho', schoolName: 'Unidos do Jacarezinho' },
    { rank: 12, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca' }
  ],
  1988: [
    { rank: 1, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 2, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 3, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 4, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 5, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 6, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 7, schoolId: 'imperio_serrano', schoolName: 'Império Serrano' },
    { rank: 8, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares' },
    { rank: 8, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 8, schoolId: 'tradicao', schoolName: 'Tradição' },
    { rank: 9, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá' },
    { rank: 10, schoolId: 'sao_clemente', schoolName: 'São Clemente' },
    { rank: 11, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 12, schoolId: 'unidos_da_ponte', schoolName: 'Unidos da Ponte' },
    { rank: 13, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu' },
    { rank: 14, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' }
  ],
  1989: [
    { rank: 1, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 2, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 3, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 4, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 5, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 6, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 7, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 8, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 9, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá' },
    { rank: 10, schoolId: 'imperio_serrano', schoolName: 'Império Serrano' },
    { rank: 11, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 12, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares' },
    { rank: 13, schoolId: 'sao_clemente', schoolName: 'São Clemente' },
    { rank: 14, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu' },
    { rank: 15, schoolId: 'unidos_da_ponte', schoolName: 'Unidos da Ponte' },
    { rank: 16, schoolId: 'tradicao', schoolName: 'Tradição' },
    { rank: 17, schoolId: 'arranco', schoolName: 'Arranco' },
    { rank: 18, schoolId: 'jacarezinho', schoolName: 'Unidos do Jacarezinho' }
  ],
  1990: [
    { rank: 1, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 2, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 3, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 4, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 5, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá' },
    { rank: 6, schoolId: 'sao_clemente', schoolName: 'São Clemente' },
    { rank: 7, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 8, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 9, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 10, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 11, schoolId: 'imperio_serrano', schoolName: 'Império Serrano' },
    { rank: 12, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 13, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares' },
    { rank: 14, schoolId: 'lins_imperial', schoolName: 'Lins Imperial' },
    { rank: 15, schoolId: 'santa_cruz', schoolName: 'Acadêmicos de Santa Cruz' },
    { rank: 16, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu' }
  ],
  1991: [
    { rank: 1, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 2, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 3, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 4, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 5, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá' },
    { rank: 6, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 7, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 8, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 9, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 10, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares' },
    { rank: 11, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 12, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 13, schoolId: 'sao_clemente', schoolName: 'São Clemente' },
    { rank: 14, schoolId: 'lins_imperial', schoolName: 'Lins Imperial' },
    { rank: 15, schoolId: 'imperio_serrano', schoolName: 'Império Serrano' },
    { rank: 16, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' }
  ],
  1992: [
    { rank: 1, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá' },
    { rank: 2, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 3, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 4, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 5, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 6, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 7, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 8, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 9, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 10, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 11, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares' },
    { rank: 12, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 13, schoolId: 'leao_de_nova_iguacu', schoolName: 'Leão de Nova Iguaçu' },
    { rank: 14, schoolId: 'tradicao', schoolName: 'Tradição' },
    { rank: 15, schoolId: 'santa_cruz', schoolName: 'Acadêmicos de Santa Cruz' }
  ],
  1993: [
    { rank: 1, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 2, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 3, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 4, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 5, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 6, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá' },
    { rank: 7, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 8, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 9, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 10, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 11, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 12, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 13, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares' },
    { rank: 14, schoolId: 'unidos_da_ponte', schoolName: 'Unidos da Ponte' }
  ],
  1994: [
    { rank: 1, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 2, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 3, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 4, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 5, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 6, schoolId: 'tradicao', schoolName: 'Tradição' },
    { rank: 7, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 8, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 9, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 10, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares' },
    { rank: 11, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 12, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 13, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá' },
    { rank: 14, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 15, schoolId: 'unidos_da_ponte', schoolName: 'Unidos da Ponte' },
    { rank: 16, schoolId: 'imperio_serrano', schoolName: 'Império Serrano' }
  ],
  1995: [
    { rank: 1, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 2, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 3, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 4, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 5, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 6, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 7, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá' },
    { rank: 8, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 9, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 10, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares' },
    { rank: 11, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 12, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 13, schoolId: 'tradicao', schoolName: 'Tradição' },
    { rank: 14, schoolId: 'unidos_da_ponte', schoolName: 'Unidos da Ponte' },
    { rank: 15, schoolId: 'imperio_serrano', schoolName: 'Império Serrano' },
    { rank: 16, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 17, schoolId: 'sao_clemente', schoolName: 'São Clemente' },
    { rank: 18, schoolId: 'villa_rica', schoolName: 'Unidos da Villa Rica' }
  ],
  1996: [
    { rank: 1, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 2, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 3, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 4, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 5, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 6, schoolId: 'imperio_serrano', schoolName: 'Império Serrano' },
    { rank: 7, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 8, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 9, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra' },
    { rank: 10, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá' },
    { rank: 11, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 12, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 13, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 14, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 15, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares' },
    { rank: 16, schoolId: 'tradicao', schoolName: 'Tradição' },
    { rank: 17, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca' },
    { rank: 18, schoolId: 'unidos_da_ponte', schoolName: 'Unidos da Ponte' }
  ],
  1997: [
    { rank: 1, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 2, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 3, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 4, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 5, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra' },
    { rank: 6, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 7, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 8, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 9, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 10, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 11, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 12, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 13, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá' },
    { rank: 14, schoolId: 'santa_cruz', schoolName: 'Acadêmicos de Santa Cruz' },
    { rank: 15, schoolId: 'imperio_serrano', schoolName: 'Império Serrano' },
    { rank: 16, schoolId: 'rocinha', schoolName: 'Acadêmicos da Rocinha' }
  ],
  1998: [
    { rank: 1, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 3, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 4, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 5, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 6, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 7, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 8, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 9, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 10, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares' },
    { rank: 11, schoolId: 'tradicao', schoolName: 'Tradição' },
    { rank: 12, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 13, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 14, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra' }
  ],
  1999: [
    { rank: 1, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 2, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 3, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 4, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 5, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 6, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 7, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 8, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 9, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares' },
    { rank: 10, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 11, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 12, schoolId: 'tradicao', schoolName: 'Tradição' },
    { rank: 13, schoolId: 'imperio_serrano', schoolName: 'Império Serrano' },
    { rank: 14, schoolId: 'sao_clemente', schoolName: 'São Clemente' }
  ],
  2000: [
    { rank: 1, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 2, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 3, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 4, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 5, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 6, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 7, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 8, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 9, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 10, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 11, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares' },
    { rank: 12, schoolId: 'tradicao', schoolName: 'Tradição' },
    { rank: 13, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 14, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra' }
  ],
  2001: [
    { rank: 1, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 2, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 3, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 4, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 5, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 6, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 7, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 8, schoolId: 'tradicao', schoolName: 'Tradição' },
    { rank: 9, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 10, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 11, schoolId: 'imperio_serrano', schoolName: 'Império Serrano' },
    { rank: 12, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares' },
    { rank: 13, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador' },
    { rank: 14, schoolId: 'tuiuti', schoolName: 'Paraíso do Tuiuti' }
  ],
  2002: [
    { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 2, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 3, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 4, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 5, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 6, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 7, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 8, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 9, schoolId: 'imperio_serrano', schoolName: 'Império Serrano' },
    { rank: 10, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 11, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra' },
    { rank: 12, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares' },
    { rank: 13, schoolId: 'tradicao', schoolName: 'Tradição' },
    { rank: 14, schoolId: 'sao_clemente', schoolName: 'São Clemente' }
  ],
  2003: [
    { rank: 1, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 2, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 3, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 4, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 5, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 6, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 7, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 8, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 9, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 10, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares' },
    { rank: 11, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra' },
    { rank: 12, schoolId: 'imperio_serrano', schoolName: 'Império Serrano' },
    { rank: 13, schoolId: 'tradicao', schoolName: 'Tradição' },
    { rank: 14, schoolId: 'santa_cruz', schoolName: 'Acadêmicos de Santa Cruz' }
  ],
  2004: [
    { rank: 1, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 2, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 3, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 4, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 5, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 6, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 7, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 8, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 9, schoolId: 'imperio_serrano', schoolName: 'Império Serrano' },
    { rank: 10, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 11, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra' },
    { rank: 12, schoolId: 'tradicao', schoolName: 'Tradição' },
    { rank: 13, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares' },
    { rank: 14, schoolId: 'sao_clemente', schoolName: 'São Clemente' }
  ],
  2005: [
    { rank: 1, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 2, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 3, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 4, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 5, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 6, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 7, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra' },
    { rank: 8, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 9, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 10, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 11, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares' },
    { rank: 12, schoolId: 'imperio_serrano', schoolName: 'Império Serrano' },
    { rank: 13, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 14, schoolId: 'tradicao', schoolName: 'Tradição' }
  ],
  2006: [
    { rank: 1, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 2, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 3, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 4, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 5, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 6, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 7, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 8, schoolId: 'imperio_serrano', schoolName: 'Império Serrano' },
    { rank: 9, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 10, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 11, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 12, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra' },
    { rank: 13, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares' },
    { rank: 14, schoolId: 'rocinha', schoolName: 'Acadêmicos da Rocinha' }
  ],
  2007: [
    { rank: 1, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 2, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 3, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 4, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 5, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 6, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 7, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 8, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 9, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 10, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra' },
    { rank: 11, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 12, schoolId: 'imperio_serrano', schoolName: 'Império Serrano' },
    { rank: 13, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá' }
  ],
  2008: [
    { rank: 1, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 2, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 3, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 4, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 5, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 6, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 7, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 8, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 9, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 10, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 11, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra' },
    { rank: 12, schoolId: 'sao_clemente', schoolName: 'São Clemente' }
  ],
  2009: [
    { rank: 1, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro' },
    { rank: 2, schoolId: 'beija_flor', schoolName: 'Beija-Flor' },
    { rank: 3, schoolId: 'portela', schoolName: 'Portela' },
    { rank: 4, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel' },
    { rank: 5, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio' },
    { rank: 6, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira' },
    { rank: 7, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense' },
    { rank: 8, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro' },
    { rank: 9, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca' },
    { rank: 10, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra' },
    { rank: 11, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel' },
    { rank: 12, schoolId: 'imperio_serrano', schoolName: 'Império Serrano' }
  ],
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
  subgroups?: {
    domingo?: LiesaStandingRecord[];
    segunda?: LiesaStandingRecord[];
    supercampeonato?: LiesaStandingRecord[];
  };
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
  if (nameNorm.includes('caprichosos')) return 'caprichosos_de_pilares';
  if (nameNorm.includes('rocinha')) return 'rocinha';
  if (nameNorm.includes('tradição') || nameNorm.includes('tradicao')) return 'tradicao';
  if (nameNorm.includes('santa cruz')) return 'santa_cruz';
  if (nameNorm.includes('villa rica') || nameNorm.includes('vila rica')) return 'villa_rica';
  if (nameNorm.includes('ponte')) return 'unidos_da_ponte';
  if (nameNorm.includes('leão de nova') || nameNorm.includes('leao de nova')) return 'leao_de_nova_iguacu';
  if (nameNorm.includes('lins imperial')) return 'lins_imperial';
  if (nameNorm.includes('cabuçu') || nameNorm.includes('cabucu')) return 'cabucu';
  if (nameNorm.includes('arranco')) return 'arranco';
  if (nameNorm.includes('jacarezinho')) return 'jacarezinho';
  if (nameNorm.includes('cima da hora')) return 'em_cima_da_hora';
  return nameNorm.replace(/[^a-z0-9]/g, '_');
}

/**
 * Retorna lista de carnavais históricos com resultados oficiais catalogados (1984 a 2026 + save)
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

  // Anos oficiais catalogados (2026 descendo até 1984)
  const officialYears = [
    2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017,
    2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007,
    2006, 2005, 2004, 2003, 2002, 2001, 2000,
    1999, 1998, 1997, 1996, 1995,
    1994, 1993, 1992, 1991, 1990,
    1989, 1988, 1987, 1986, 1985, 1984
  ];
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
    } else if (yr === 2009) {
      notes = 'Carnaval 2009: Acadêmicos do Salgueiro sagrou-se campeã quebrando 16 anos de jejum com o antológico enredo "Tambor" (+20 pts) e Beija-Flor vice-campeã com "No Chuveiro da Alegria..." (+15 pts). Império Serrano rebaixada.';
    } else if (yr === 2008) {
      notes = 'Carnaval 2008: Beija-Flor de Nilópolis conquistou o bicampeonato homenageando Macapá (+20 pts) e Acadêmicos do Salgueiro vice-campeã (+15 pts). São Clemente rebaixada.';
    } else if (yr === 2007) {
      notes = 'Carnaval 2007: Beija-Flor de Nilópolis foi campeã com o enredo "Áfricas: Do Berço Real à Corte Brasiliana" (+20 pts) e Acadêmicos do Grande Rio vice-campeã (+15 pts). Império Serrano e Estácio de Sá rebaixadas.';
    } else if (yr === 2006) {
      notes = 'Carnaval 2006: Unidos de Vila Isabel conquistou o campeonato com "Soy loco por ti, América" (+20 pts) e Acadêmicos do Grande Rio vice-campeã (+15 pts). Caprichosos de Pilares e Acadêmicos da Rocinha rebaixadas.';
    } else if (yr === 2005) {
      notes = 'Carnaval 2005: Beija-Flor de Nilópolis sagrou-se tricampeã consecutiva com "Sete Pecados Capitais" (+20 pts) e Unidos da Tijuca vice-campeã com "Entrou por um lado, saiu pelo outro..." (+15 pts). Tradição rebaixada.';
    } else if (yr === 2004) {
      notes = 'Carnaval 2004: Beija-Flor sagrou-se bicampeã com "Manôa - Manaus - Amazônia - Terra Santa" (+20 pts) e Unidos da Tijuca vice-campeã histórica com o antológico "O Segredo do Agbê" de Paulo Barros (+15 pts). São Clemente rebaixada.';
    } else if (yr === 2003) {
      notes = 'Carnaval 2003: Beija-Flor de Nilópolis foi a grande campeã com "O Povo Conta a Sua História: Saco Vazio Não Pára em Pé" (+20 pts) e Estação Primeira de Mangueira vice-campeã com "Dez de Maio, Cem Anos de Glória" (+15 pts). Acadêmicos de Santa Cruz rebaixada.';
    } else if (yr === 2002) {
      notes = 'Carnaval 2002: Estação Primeira de Mangueira conquistou o campeonato com "Brazil com Z é pra cabra da peste, Brasil com S é a nação do Nordeste" (+20 pts) e Beija-Flor vice-campeã com "O Brasil Dá o Ar de Sua Graça" (+15 pts). São Clemente rebaixada.';
    } else if (yr === 2001) {
      notes = 'Carnaval 2001: Imperatriz Leopoldinense conquistou o histórico tricampeonato consecutivo com "Cana-Caiana, Cana-Roxa, Cana-Fita" (+20 pts) e Beija-Flor vice-campeã com "A Saga de Agotime" (+15 pts). União da Ilha e Paraíso do Tuiuti rebaixadas.';
    } else if (yr === 2000) {
      notes = 'Carnaval 2000: Carnaval comemorativo dos 500 anos do Brasil. Imperatriz Leopoldinense sagrou-se bicampeã com "Quem Descobriu o Brasil, Foi Seu Cabral..." (+20 pts) e Beija-Flor vice-campeã com "Brasil: Um Coração que Pulsa Forte" (+15 pts). Unidos de Vila Isabel e Porto da Pedra rebaixadas.';
    } else if (yr === 1999) {
      notes = 'Carnaval 1999: Imperatriz Leopoldinense sagrou-se campeã com "Brasil, Mostra a Sua Cara em... Caviar" (+20 pts) e Beija-Flor vice-campeã com "Araxá - Lugar Alto Onde Primeiro Se Avista o Sol" (+15 pts). Império Serrano e São Clemente rebaixadas.';
    } else if (yr === 1998) {
      notes = 'Carnaval 1998: Histórico empate com duas campeãs oficiais dividindo o título: Beija-Flor de Nilópolis ("Pará: O Mundo das Águas...") e Estação Primeira de Mangueira ("Chico Buarque da Mangueira"), ambas somando 20 pontos de campeã. Unidos da Tijuca e Unidos do Porto da Pedra rebaixadas.';
    } else if (yr === 1997) {
      notes = 'Carnaval 1997: Unidos do Viradouro conquistou seu primeiro campeonato histórico sob comando de Joãosinho Trinta com "Trevas! Luz! A Explosão do Universo" (+20 pts) e Mocidade Independente foi vice-campeã com "De Corpo e Alma na Avenida" (+15 pts). Quatro agremiações foram rebaixadas: Estácio de Sá, Acadêmicos de Santa Cruz, Império Serrano e Acadêmicos da Rocinha.';
    } else if (yr === 1996) {
      notes = 'Carnaval 1996: Mocidade Independente de Padre Miguel conquistou o campeonato com o antológico enredo "Criador e Criatura" de Renato Lage (+20 pts) e Imperatriz Leopoldinense foi a vice-campeã com "Imperatriz Leopoldinense Honra, Brilha e Resplandece..." (+15 pts). Quatro agremiações foram rebaixadas: Caprichosos de Pilares, Tradição, Império da Tijuca e Unidos da Ponte.';
    } else if (yr === 1995) {
      notes = 'Carnaval 1995: Imperatriz Leopoldinense sagrou-se bicampeã com "Mais Vale um Jegue que Me Carregue..." de Rosa Magalhães (+20 pts) e Portela conquistou o vice-campeonato com "Gosto que Me Enrosco" (+15 pts). Duas agremiações foram rebaixadas: São Clemente e Unidos da Villa Rica.';
    } else if (yr === 1994) {
      notes = 'Carnaval 1994: Imperatriz Leopoldinense sagrou-se campeã com "Catarina de Médicis na Corte dos Tupinambás" de Rosa Magalhães (+20 pts) e Acadêmicos do Salgueiro conquistou o vice-campeonato com "O Rio que Passa em Minha Vida" (+15 pts). Não houve rebaixamento neste ano.';
    } else if (yr === 1993) {
      notes = 'Carnaval 1993: Acadêmicos do Salgueiro consagrou-se campeã com o antológico "Peguei um Ita no Norte" ("Explode Coração") de Mário Borriello (+20 pts) e Imperatriz Leopoldinense foi vice-campeã com "Marquês que É Marquês do Saçarico É Freguês" (+15 pts). Não houve rebaixamento neste ano.';
    } else if (yr === 1992) {
      notes = 'Carnaval 1992: Estácio de Sá conquistou seu campeonato histórico no Grupo Especial com "Paulicéia Desvairada - 70 Anos de Modernismo" (+20 pts) e Mocidade Independente foi vice-campeã com "Sonhar Não Custa Nada..." (+15 pts). Três agremiações foram rebaixadas: Leão de Nova Iguaçu, Tradição e Acadêmicos de Santa Cruz.';
    } else if (yr === 1991) {
      notes = 'Carnaval 1991: Mocidade Independente de Padre Miguel sagrou-se bicampeã com "Chuê, Chuá... As Águas Vão Rolar" (+20 pts) e Acadêmicos do Salgueiro vice-campeã com "Me Masso se Não Me Passo" (+15 pts). Quatro agremiações foram rebaixadas: São Clemente, Lins Imperial, Império Serrano e Acadêmicos do Grande Rio.';
    } else if (yr === 1990) {
      notes = 'Carnaval 1990: Mocidade Independente de Padre Miguel sagrou-se campeã com "Vira, Virou, a Mocidade Chegou" de Renato Lage (+20 pts) e Beija-Flor conquistou o vice-campeonato com "Todo Mundo Nasceu Nu" (+15 pts). Duas agremiações foram rebaixadas: Acadêmicos de Santa Cruz e Unidos do Cabuçu.';
    } else if (yr === 1989) {
      notes = 'Carnaval 1989: Imperatriz Leopoldinense sagrou-se campeã no desempate com o antológico "Liberdade, Liberdade, Abre as Asas Sobre Nós" (+20 pts) e Beija-Flor foi vice-campeã com o histórico desfile "Ratos e Urubus, Larguem Minha Fantasia" de Joãosinho Trinta (+15 pts). Quatro agremiações foram rebaixadas: Unidos da Ponte, Tradição, Arranco e Unidos do Jacarezinho.';
    } else if (yr === 1988) {
      notes = 'Carnaval 1988: No centenário da Abolição, a Unidos de Vila Isabel sagrou-se campeã com o clássico "Kizomba, a Festa da Raça" (+20 pts) e Mangueira foi vice-campeã com "100 Anos de Liberdade, Realidade ou Ilusão?" (+15 pts). Não houve rebaixamento neste ano.';
    } else if (yr === 1987) {
      notes = 'Carnaval 1987: Estação Primeira de Mangueira sagrou-se bicampeã com "No Reino das Palavras, Carlos Drummond de Andrade" (+20 pts) e Mocidade Independente foi vice-campeã com "Tupinicópolis" (+15 pts). Duas agremiações foram rebaixadas: Unidos do Jacarezinho e Império da Tijuca.';
    } else if (yr === 1986) {
      notes = 'Carnaval 1986: Estação Primeira de Mangueira sagrou-se campeã com "Caymmi Mostra ao Mundo o que a Bahia e a Mangueira Têm" (+20 pts) e Beija-Flor vice-campeã com "O Mundo É uma Bola" (+15 pts). Unidos da Tijuca foi rebaixada.';
    } else if (yr === 1985) {
      notes = 'Carnaval 1985: Primeiro carnaval sob a organização da LIESA. Mocidade Independente sagrou-se campeã com o revolucionário "Ziriguidum 2001, Um Carnaval nas Estrelas" de Fernando Pinto (+20 pts) e Beija-Flor vice-campeã com "A Lapa de Adão e Eva" (+15 pts). Três agremiações foram rebaixadas: Acadêmicos de Santa Cruz, São Clemente e Em Cima da Hora.';
    } else if (yr === 1984) {
      notes = 'Carnaval Histórico de 1984 (Inauguração do Sambódromo Darcy Ribeiro): Três campeãs e três resultados distintos — Desfile de Domingo (Portela campeã com 20 pts, Império Serrano vice com 15 pts), Desfile de Segunda-Feira (Mangueira campeã com 20 pts, Mocidade vice com 15 pts) e o Supercampeonato no Sábado das Campeãs (Mangueira Supercampeã com 20 pts, Portela Supervice com 15 pts). Rebaixadas: Unidos da Tijuca (Domingo) e Unidos da Ponte (Segunda-Feira).';
    }

    result.push({
      year: yr,
      standings: stands,
      isNoCarnaval: false,
      notes,
      championNames: yr === 1984 ? ['Estação Primeira de Mangueira (Supercampeã)', 'Portela (Campeã de Domingo)'] : champs,
      viceChampionNames: yr === 1984 ? ['Portela (Supervice)', 'Mocidade Independente (Vice Segunda)', 'Império Serrano (Vice Domingo)'] : vices,
      totalSchools: stands.length,
      subgroups: yr === 1984 ? {
        domingo: CARNAVAL_1984_DOMINGO,
        segunda: CARNAVAL_1984_SEGUNDA,
        supercampeonato: CARNAVAL_1984_SUPERCAMPEONATO
      } : undefined
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
  allSchools: School[] = INITIAL_SCHOOLS,
  inGameHistory: YearHistory[] = []
): HistoricalLiesaEntry[] {
  const effectiveSchools = allSchools && allSchools.length > 0 ? allSchools : INITIAL_SCHOOLS;
  const schoolsMap = new Map<string, School>();
  effectiveSchools.forEach((s) => schoolsMap.set(s.id, s));

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

  // 1. Processa todos os títulos e vices históricos da era pré-1984 a partir de HISTORICAL_CARNAVAL_RECORDS
  // A partir de 1984 em diante (inauguração do Sambódromo), todas as colocações detalhadas vêm do catálogo oficial LIESA
  Object.entries(HISTORICAL_CARNAVAL_RECORDS).forEach(([id, rec]) => {
    const sId = resolveSchoolId(id, undefined, schoolsMap);
    const entry = ensureEntry(sId);

    const espYearsPre1984 = (rec.especialYears || []).filter((y) => y < 1984);
    const espViceYearsPre1984 = (rec.especialRunnerUpYears || []).filter((y) => y < 1984);

    const titlesPre1984 = espYearsPre1984.length;
    const vicesPre1984 = espViceYearsPre1984.length;

    entry.totalEspecialTitles += titlesPre1984;
    entry.totalEspecialVices += vicesPre1984;
    entry.titlePoints += titlesPre1984 * 20;
    entry.vicePoints += vicesPre1984 * 15;
    entry.pointsEraPre2015 += titlesPre1984 * 20 + vicesPre1984 * 15;
    entry.totalPoints += titlesPre1984 * 20 + vicesPre1984 * 15;
    entry.totalCarnavalesContados += titlesPre1984 + vicesPre1984;
  });

  // 2. Processa anos de 1984 a 2026 oficiais (com todas as colocações detalhadas catalogadas)
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
          if (yr === 1984 && sId === 'mangueira') {
            // Em 1984 a Mangueira foi Campeã de Segunda-Feira e Supercampeã do Sábado das Campeãs
            entry.totalEspecialTitles++;
            entry.titlePoints += 20;
          }
        } else if (st.rank === 2) {
          entry.totalEspecialVices++;
          entry.vicePoints += 15;
        }

        if (yr === 1984 && sId === 'portela') {
          // Em 1984 a Portela foi Campeã de Domingo e Supervice no Supercampeonato
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
