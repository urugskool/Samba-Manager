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
 * Resultados oficiais catalogados dos carnavais históricos (1980 a 2026).
 * Nota Histórica: A LIESA foi fundada em 24 de julho de 1984 para administrar o Grupo Especial
 * a partir do Carnaval de 1985. Até o Carnaval de 1984 a administração era de responsabilidade
 * da AESCRJ (Associação das Escolas de Samba do Rio de Janeiro).
 * Carnaval 2021: Não houve desfiles (0 pontos) devido à pandemia.
 * Carnaval 2018: Não houve rebaixamento por decisão unânime da plenária da LIESA.
 * Carnaval 2017: Duas campeãs oficiais (Portela e Mocidade Independente) e NÃO houve rebaixamento.
 * Carnaval 2011: Grande Rio, Portela e União da Ilha desfilaram como Hors concours (sem rebaixamento).
 * Carnaval 1998: Duas campeãs oficiais dividindo o título (Beija-Flor e Mangueira).
 * Carnaval 1994: Não houve rebaixamento no Grupo Especial.
 * Carnaval 1993: Não houve rebaixamento no Grupo Especial.
 * Carnaval 1988: Não houve rebaixamento no Grupo Especial.
 * Carnaval 1985: Primeiro Carnaval administrado pela LIESA (fundada em 24/07/1984).
 * Carnaval 1984: Inauguração da Passarela do Samba com 3 campeãs e três desfiles: Domingo, Segunda-Feira e Supercampeonato (administrado pela AESCRJ; LIESA fundada posteriormente em 24/07/1984).
 * Carnaval 1983: Não houve rebaixamento por deliberação da AESCRJ. Caprichosos de Pilares desfilou como Hors concours.
 * Carnaval 1982: Império da Tijuca e Unidos de São Carlos (Estácio) rebaixadas pela AESCRJ.
 * Carnaval 1981: Não houve rebaixamento no Grupo Especial por deliberação da AESCRJ.
 * Carnaval 1980: Três campeãs oficiais (Beija-Flor, Imperatriz e Portela) e três vices oficiais (Mocidade, União da Ilha e Vila Isabel). Rebaixada pela AESCRJ: Unidos de São Carlos.
 * Carnaval 1979: Mocidade Independente de Padre Miguel campeã e Beija-Flor vice. Não houve rebaixamento.
 * Carnaval 1978: Beija-Flor campeã e Mangueira vice. Rebaixadas: Império Serrano, Unidos de Vila Isabel, Arrastão de Cascadura e Arranco.
 * Carnaval 1977: Beija-Flor campeã e Portela vice. Rebaixadas: Imperatriz Leopoldinense, Unidos de São Carlos, Império da Tijuca e Unidos do Cabuçu.
 * Carnaval 1976: Beija-Flor campeã e Mangueira vice. Rebaixadas: Lins Imperial, Unidos de Lucas, Em Cima da Hora e Tupy de Brás de Pina.
 * Carnaval 1975: Salgueiro campeã e Mangueira vice. Não houve rebaixamento.
 * Carnaval 1974: Salgueiro campeã e Portela vice. Não houve rebaixamento.
 * Carnaval 1973: Mangueira campeã e Império Serrano vice. Rebaixadas: Tupy de Brás de Pina e Unidos do Jacarezinho.
 * Carnaval 1972: Império Serrano campeã e Mangueira vice. Rebaixadas: Unidos de São Carlos, Império da Tijuca, Unidos de Lucas e Unidos de Padre Miguel.
 * Carnaval 1971: Salgueiro campeã e Portela vice. Não houve rebaixamento.
 * Carnaval 1970: Portela campeã e Salgueiro vice. Rebaixadas: Unidos do Jacarezinho e Acadêmicos de Santa Cruz.
 * Carnaval 1969: Salgueiro campeã e Mangueira vice. Rebaixadas: Unidos de Lucas e Em Cima da Hora.
 * Carnaval 1968: Mangueira campeã e Império Serrano vice. Rebaixadas: Independentes do Leblon (Independentes de Cordovil) e Império da Tijuca.
 * Carnaval 1967: Mangueira campeã e Império Serrano vice. Rebaixadas: Imperatriz Leopoldinense e São Clemente.
 * Carnaval 1966: Portela campeã e Mangueira vice. Rebaixadas: Unidos da Capela e Acadêmicos de Santa Cruz. Império da Tijuca desfilou como Hors Concours.
 * Carnaval 1965: Salgueiro campeã e Império Serrano vice. Rebaixadas: União de Jacarepaguá e Imperatriz Leopoldinense.
 * Carnaval 1964: Portela campeã e Salgueiro vice. Rebaixadas: Unidos de Padre Miguel e Unidos do Cabuçu.
 * Carnaval 1963: Salgueiro campeã e Mangueira vice. Rebaixadas: Unidos de Bangu e Beija-Flor.
 * Carnaval 1962: Portela campeã e Império Serrano vice. Rebaixadas: Unidos da Capela e Tupy de Brás de Pina.
 * Carnaval 1961: Mangueira campeã e Salgueiro vice. Rebaixadas: Caprichosos de Pilares, Unidos de Padre Miguel e Acadêmicos de Bento Ribeiro.
 * Carnaval 1959: Portela campeã e Salgueiro vice. Oito rebaixadas: Caprichosos de Pilares, Cartolinhas de Caxias, União do Centenário, Tupy de Brás de Pina, Unidos do Cabuçu, Paraíso do Tuiuti, Unidos da Tijuca e Unidos do Salgueiro.
 * Carnaval 1958: Portela campeã e Império Serrano vice. Rebaixadas: Unidos de Bento Ribeiro, Flor do Lins e Filhos do Deserto.
 * Carnaval 1957: Portela campeã e Império Serrano vice. Rebaixadas: Unidos de Vila Isabel, Paraíso do Tuiuti e Paz e Amor.
 * Carnaval 1956: Império Serrano campeã e Portela vice. Rebaixadas: Unidos da Congonha, Unidos do Indaiá e Unidos do Salgueiro.
 * Carnaval 1955: Império Serrano campeã e Mangueira vice. Rebaixadas: Índios do Acaú, Império da Tijuca e União do Catete.
 * Carnaval 1954: Mangueira campeã e Império Serrano vice. Rebaixadas: Acadêmicos do Engenho da Rainha, Aventureiros da Matriz, Paz e Amor, Unidos da Tamarineira, Independentes do Rio, Independentes do Leblon e União de Vaz Lobo.
 */
export const OFFICIAL_LIESA_HISTORICAL_STANDINGS: Record<number, LiesaStandingRecord[]> = {
  1954: [
    { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'portela', schoolName: 'Portela', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'aprendizes_de_lucas', schoolName: 'Aprendizes de Lucas', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'filhos_do_deserto', schoolName: 'Filhos do Deserto', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'unidos_do_salgueiro', schoolName: 'Unidos do Salgueiro', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'indios_do_acau', schoolName: 'Índios do Acaú', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', statusDescription: '9º Lugar (+2 pts)' },
    { rank: 10, schoolId: 'uniao_do_catete', schoolName: 'União do Catete', statusDescription: '10º Lugar (+1 pt)' },
    { rank: 11, schoolId: 'paraiso_das_baianas', schoolName: 'Paraíso das Baianas', statusDescription: '11º Lugar (0 pts)' },
    { rank: 11, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', statusDescription: '11º Lugar (0 pts)' },
    { rank: 12, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', statusDescription: '12º Lugar (0 pts)' },
    { rank: 13, schoolId: 'vai_se_quiser', schoolName: 'Vai Se Quiser', statusDescription: '13º Lugar (0 pts)' },
    { rank: 14, schoolId: 'unidos_do_grajau', schoolName: 'Unidos do Grajaú', statusDescription: '14º Lugar (0 pts)' },
    { rank: 15, schoolId: 'floresta_do_andarai', schoolName: 'Floresta do Andaraí', statusDescription: '15º Lugar (0 pts)' },
    { rank: 15, schoolId: 'unidos_do_indaia', schoolName: 'Unidos do Indaiá', statusDescription: '15º Lugar (0 pts)' },
    { rank: 16, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', statusDescription: '16º Lugar (0 pts)' },
    { rank: 17, schoolId: 'engenho_da_rainha', schoolName: 'Acadêmicos do Engenho da Rainha', statusDescription: '17º Lugar (0 pts • Rebaixada)' },
    { rank: 18, schoolId: 'aventureiros_da_matriz', schoolName: 'Aventureiros da Matriz', statusDescription: '18º Lugar (0 pts • Rebaixada)' },
    { rank: 19, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', statusDescription: '19º Lugar (0 pts • Rebaixada)' },
    { rank: 19, schoolId: 'unidos_da_tamarineira', schoolName: 'Unidos da Tamarineira', statusDescription: '19º Lugar (0 pts • Rebaixada)' },
    { rank: 20, schoolId: 'independentes_do_rio', schoolName: 'Independentes do Rio', statusDescription: '20º Lugar (0 pts • Rebaixada)' },
    { rank: 21, schoolId: 'independentes_cordovil', schoolName: 'Independentes do Leblon (Independentes de Cordovil)', statusDescription: '21º Lugar (0 pts • Rebaixada)' },
    { rank: 21, schoolId: 'uniao_vaz_lobo', schoolName: 'União de Vaz Lobo', statusDescription: '21º Lugar (0 pts • Rebaixada)' }
  ],
  1955: [
    { rank: 1, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'portela', schoolName: 'Portela', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'aprendizes_de_lucas', schoolName: 'Aprendizes de Lucas', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'beija_flor', schoolName: 'Beija-Flor', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'vai_se_quiser', schoolName: 'Vai Se Quiser', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'unidos_da_congonha', schoolName: 'Unidos da Congonha', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'filhos_do_deserto', schoolName: 'Filhos do Deserto', statusDescription: '9º Lugar (+2 pts)' },
    { rank: 10, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares', statusDescription: '10º Lugar (+1 pt)' },
    { rank: 10, schoolId: 'tuiuti', schoolName: 'Paraíso do Tuiuti', statusDescription: '10º Lugar (+1 pt)' },
    { rank: 11, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', statusDescription: '11º Lugar (0 pts)' },
    { rank: 12, schoolId: 'unidos_do_indaia', schoolName: 'Unidos do Indaiá', statusDescription: '12º Lugar (0 pts)' },
    { rank: 13, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', statusDescription: '13º Lugar (0 pts)' },
    { rank: 14, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', statusDescription: '14º Lugar (0 pts)' },
    { rank: 15, schoolId: 'unidos_do_salgueiro', schoolName: 'Unidos do Salgueiro', statusDescription: '15º Lugar (0 pts)' },
    { rank: 16, schoolId: 'indios_do_acau', schoolName: 'Índios do Acaú', statusDescription: '16º Lugar (0 pts • Rebaixada)' },
    { rank: 17, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', statusDescription: '17º Lugar (0 pts • Rebaixada)' },
    { rank: 18, schoolId: 'uniao_do_catete', schoolName: 'União do Catete', statusDescription: '18º Lugar (0 pts • Rebaixada)' }
  ],
  1956: [
    { rank: 1, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'portela', schoolName: 'Portela', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'aprendizes_de_lucas', schoolName: 'Aprendizes de Lucas', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'filhos_do_deserto', schoolName: 'Filhos do Deserto', statusDescription: '9º Lugar (+2 pts)' },
    { rank: 10, schoolId: 'unidos_bento_ribeiro', schoolName: 'Unidos de Bento Ribeiro', statusDescription: '10º Lugar (+1 pt)' },
    { rank: 11, schoolId: 'tuiuti', schoolName: 'Paraíso do Tuiuti', statusDescription: '11º Lugar (0 pts)' },
    { rank: 11, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', statusDescription: '11º Lugar (0 pts)' },
    { rank: 12, schoolId: 'beija_flor', schoolName: 'Beija-Flor', statusDescription: '12º Lugar (0 pts)' },
    { rank: 13, schoolId: 'coracoes_unidos_jacarepagua', schoolName: 'Corações Unidos de Jacarepaguá', statusDescription: '13º Lugar (0 pts)' },
    { rank: 14, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares', statusDescription: '14º Lugar (0 pts)' },
    { rank: 14, schoolId: 'vai_se_quiser', schoolName: 'Vai Se Quiser', statusDescription: '14º Lugar (0 pts)' },
    { rank: 15, schoolId: 'unidos_da_congonha', schoolName: 'Unidos da Congonha', statusDescription: '15º Lugar (0 pts • Rebaixada)' },
    { rank: 16, schoolId: 'unidos_do_indaia', schoolName: 'Unidos do Indaiá', statusDescription: '16º Lugar (0 pts • Rebaixada)' },
    { rank: 16, schoolId: 'unidos_do_salgueiro', schoolName: 'Unidos do Salgueiro', statusDescription: '16º Lugar (0 pts • Rebaixada)' }
  ],
  1957: [
    { rank: 1, schoolId: 'portela', schoolName: 'Portela', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'aprendizes_de_lucas', schoolName: 'Aprendizes de Lucas', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'uniao_de_jacarepagua', schoolName: 'União de Jacarepaguá', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'uniao_do_centenario', schoolName: 'União do Centenário', statusDescription: '9º Lugar (+2 pts)' },
    { rank: 10, schoolId: 'beija_flor', schoolName: 'Beija-Flor', statusDescription: '10º Lugar (+1 pt)' },
    { rank: 11, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', statusDescription: '11º Lugar (0 pts)' },
    { rank: 12, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', statusDescription: '12º Lugar (0 pts)' },
    { rank: 13, schoolId: 'unidos_bento_ribeiro', schoolName: 'Unidos de Bento Ribeiro', statusDescription: '13º Lugar (0 pts)' },
    { rank: 14, schoolId: 'filhos_do_deserto', schoolName: 'Filhos do Deserto', statusDescription: '14º Lugar (0 pts)' },
    { rank: 15, schoolId: 'flor_do_lins', schoolName: 'Flor do Lins', statusDescription: '15º Lugar (0 pts)' },
    { rank: 16, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', statusDescription: '16º Lugar (0 pts • Rebaixada)' },
    { rank: 17, schoolId: 'tuiuti', schoolName: 'Paraíso do Tuiuti', statusDescription: '17º Lugar (0 pts • Rebaixada)' },
    { rank: 17, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', statusDescription: '17º Lugar (0 pts • Rebaixada)' }
  ],
  1958: [
    { rank: 1, schoolId: 'portela', schoolName: 'Portela', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'uniao_de_jacarepagua', schoolName: 'União de Jacarepaguá', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'uniao_do_centenario', schoolName: 'União do Centenário', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'tupy_bras_de_pina', schoolName: 'Tupy de Brás de Pina', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'aprendizes_de_lucas', schoolName: 'Aprendizes de Lucas', statusDescription: '9º Lugar (+2 pts)' },
    { rank: 10, schoolId: 'beija_flor', schoolName: 'Beija-Flor', statusDescription: '10º Lugar (+1 pt)' },
    { rank: 11, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', statusDescription: '11º Lugar (0 pts)' },
    { rank: 12, schoolId: 'unidos_de_bangu', schoolName: 'Unidos de Bangu', statusDescription: '12º Lugar (0 pts)' },
    { rank: 13, schoolId: 'cartolinhas_de_caxias', schoolName: 'Cartolinhas de Caxias', statusDescription: '13º Lugar (0 pts)' },
    { rank: 14, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', statusDescription: '14º Lugar (0 pts)' },
    { rank: 15, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares', statusDescription: '15º Lugar (0 pts)' },
    { rank: 16, schoolId: 'unidos_bento_ribeiro', schoolName: 'Unidos de Bento Ribeiro', statusDescription: '16º Lugar (0 pts • Rebaixada)' },
    { rank: 17, schoolId: 'flor_do_lins', schoolName: 'Flor do Lins', statusDescription: '17º Lugar (0 pts • Rebaixada)' },
    { rank: 18, schoolId: 'filhos_do_deserto', schoolName: 'Filhos do Deserto', statusDescription: '18º Lugar (0 pts • Rebaixada)' }
  ],
  1959: [
    { rank: 1, schoolId: 'portela', schoolName: 'Portela', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'aprendizes_de_lucas', schoolName: 'Aprendizes de Lucas', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'unidos_de_bangu', schoolName: 'Unidos de Bangu', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'beija_flor', schoolName: 'Beija-Flor', statusDescription: '9º Lugar (+2 pts)' },
    { rank: 10, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares', statusDescription: '10º Lugar (+1 pt • Rebaixada)' },
    { rank: 11, schoolId: 'cartolinhas_de_caxias', schoolName: 'Cartolinhas de Caxias', statusDescription: '11º Lugar (0 pts • Rebaixada)' },
    { rank: 11, schoolId: 'uniao_de_jacarepagua', schoolName: 'União de Jacarepaguá', statusDescription: '11º Lugar (0 pts)' },
    { rank: 12, schoolId: 'uniao_do_centenario', schoolName: 'União do Centenário', statusDescription: '12º Lugar (0 pts • Rebaixada)' },
    { rank: 13, schoolId: 'tupy_bras_de_pina', schoolName: 'Tupy de Brás de Pina', statusDescription: '13º Lugar (0 pts • Rebaixada)' },
    { rank: 14, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', statusDescription: '14º Lugar (0 pts • Rebaixada)' },
    { rank: 15, schoolId: 'tuiuti', schoolName: 'Paraíso do Tuiuti', statusDescription: '15º Lugar (0 pts • Rebaixada)' },
    { rank: 16, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', statusDescription: '16º Lugar (0 pts • Rebaixada)' },
    { rank: 17, schoolId: 'unidos_do_salgueiro', schoolName: 'Unidos do Salgueiro', statusDescription: '17º Lugar (0 pts • Rebaixada)' }
  ],
  1960: [
    { rank: 1, schoolId: 'portela', schoolName: 'Portela', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 1, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 1, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 1, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'aprendizes_de_lucas', schoolName: 'Aprendizes de Lucas', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'uniao_de_jacarepagua', schoolName: 'União de Jacarepaguá', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'unidos_padre_miguel', schoolName: 'Unidos de Padre Miguel', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'beija_flor', schoolName: 'Beija-Flor', statusDescription: '6º Lugar (+6 pts • Rebaixada)' },
    { rank: 7, schoolId: 'aprendizes_boca_do_mato', schoolName: 'Aprendizes da Boca do Mato', statusDescription: '7º Lugar (+4 pts • Rebaixada)' },
    { rank: 8, schoolId: 'unidos_de_bangu', schoolName: 'Unidos de Bangu', statusDescription: '8º Lugar (+3 pts • Rebaixada)' }
  ],
  1961: [
    { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'portela', schoolName: 'Portela', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'aprendizes_de_lucas', schoolName: 'Aprendizes de Lucas', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'uniao_de_jacarepagua', schoolName: 'União de Jacarepaguá', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares', statusDescription: '9º Lugar (+2 pts • Rebaixada)' },
    { rank: 10, schoolId: 'unidos_padre_miguel', schoolName: 'Unidos de Padre Miguel', statusDescription: '10º Lugar (+1 pt • Rebaixada)' },
    { rank: 11, schoolId: 'academicos_bento_ribeiro', schoolName: 'Acadêmicos de Bento Ribeiro', statusDescription: '11º Lugar (0 pts • Rebaixada)' }
  ],
  1962: [
    { rank: 1, schoolId: 'portela', schoolName: 'Portela', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'aprendizes_de_lucas', schoolName: 'Aprendizes de Lucas', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'uniao_de_jacarepagua', schoolName: 'União de Jacarepaguá', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', statusDescription: '9º Lugar (+2 pts • Rebaixada)' },
    { rank: 10, schoolId: 'tupy_bras_de_pina', schoolName: 'Tupy de Brás de Pina', statusDescription: '10º Lugar (+1 pt • Rebaixada)' }
  ],
  1963: [
    { rank: 1, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'portela', schoolName: 'Portela', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'uniao_de_jacarepagua', schoolName: 'União de Jacarepaguá', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'aprendizes_de_lucas', schoolName: 'Aprendizes de Lucas', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'unidos_de_bangu', schoolName: 'Unidos de Bangu', statusDescription: '9º Lugar (+2 pts • Rebaixada)' },
    { rank: 10, schoolId: 'beija_flor', schoolName: 'Beija-Flor', statusDescription: '10º Lugar (+1 pt • Rebaixada)' }
  ],
  1964: [
    { rank: 1, schoolId: 'portela', schoolName: 'Portela', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'uniao_de_jacarepagua', schoolName: 'União de Jacarepaguá', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'aprendizes_de_lucas', schoolName: 'Aprendizes de Lucas', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'unidos_padre_miguel', schoolName: 'Unidos de Padre Miguel', statusDescription: '9º Lugar (+2 pts • Rebaixada)' },
    { rank: 10, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', statusDescription: '10º Lugar (+1 pt • Rebaixada)' }
  ],
  1965: [
    { rank: 1, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'portela', schoolName: 'Portela', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'aprendizes_de_lucas', schoolName: 'Aprendizes de Lucas', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'uniao_de_jacarepagua', schoolName: 'União de Jacarepaguá', statusDescription: '9º Lugar (+2 pts • Rebaixada)' },
    { rank: 10, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', statusDescription: '10º Lugar (+1 pt • Rebaixada)' }
  ],
  1966: [
    { rank: 1, schoolId: 'portela', schoolName: 'Portela', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'aprendizes_de_lucas', schoolName: 'Aprendizes de Lucas', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', statusDescription: '8º Lugar (+3 pts • Rebaixada)' },
    { rank: 9, schoolId: 'santa_cruz', schoolName: 'Acadêmicos de Santa Cruz', statusDescription: '9º Lugar (+2 pts • Rebaixada)' },
    { rank: 10, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', statusDescription: 'Hors Concours (Sem julgamento oficial)', isHorsConcours: true }
  ],
  1967: [
    { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'unidos_de_lucas', schoolName: 'Unidos de Lucas', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'portela', schoolName: 'Portela', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', statusDescription: '9º Lugar (+2 pts • Rebaixada)' },
    { rank: 10, schoolId: 'sao_clemente', schoolName: 'São Clemente', statusDescription: '10º Lugar (+1 pt • Rebaixada)' }
  ],
  1968: [
    { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'portela', schoolName: 'Portela', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'unidos_de_lucas', schoolName: 'Unidos de Lucas', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'estacio_de_sa', schoolName: 'Unidos de São Carlos (Estácio de Sá)', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'independentes_cordovil', schoolName: 'Independentes do Leblon (Independentes de Cordovil)', statusDescription: '9º Lugar (+2 pts • Rebaixada)' },
    { rank: 10, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', statusDescription: '10º Lugar (+1 pt • Rebaixada)' }
  ],
  1969: [
    { rank: 1, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'portela', schoolName: 'Portela', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'estacio_de_sa', schoolName: 'Unidos de São Carlos (Estácio de Sá)', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'unidos_de_lucas', schoolName: 'Unidos de Lucas', statusDescription: '9º Lugar (+2 pts • Rebaixada)' },
    { rank: 10, schoolId: 'em_cima_da_hora', schoolName: 'Em Cima da Hora', statusDescription: '10º Lugar (+1 pt • Rebaixada)' }
  ],
  1970: [
    { rank: 1, schoolId: 'portela', schoolName: 'Portela', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'estacio_de_sa', schoolName: 'Unidos de São Carlos (Estácio de Sá)', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'jacarezinho', schoolName: 'Unidos do Jacarezinho', statusDescription: '9º Lugar (+2 pts • Rebaixada)' },
    { rank: 10, schoolId: 'santa_cruz', schoolName: 'Acadêmicos de Santa Cruz', statusDescription: '10º Lugar (+1 pt • Rebaixada)' }
  ],
  1971: [
    { rank: 1, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'portela', schoolName: 'Portela', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'estacio_de_sa', schoolName: 'Unidos de São Carlos (Estácio de Sá)', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '9º Lugar (+2 pts • Sem Rebaixamento)' },
    { rank: 10, schoolId: 'unidos_padre_miguel', schoolName: 'Unidos de Padre Miguel', statusDescription: '10º Lugar (+1 pt • Sem Rebaixamento)' }
  ],
  1972: [
    { rank: 1, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'portela', schoolName: 'Portela', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'em_cima_da_hora', schoolName: 'Em Cima da Hora', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'estacio_de_sa', schoolName: 'Unidos de São Carlos (Estácio de Sá)', statusDescription: '9º Lugar (+2 pts • Rebaixada)' },
    { rank: 10, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', statusDescription: '10º Lugar (+1 pt • Rebaixada)' },
    { rank: 11, schoolId: 'unidos_de_lucas', schoolName: 'Unidos de Lucas', statusDescription: '11º Lugar (Rebaixada)' },
    { rank: 12, schoolId: 'unidos_padre_miguel', schoolName: 'Unidos de Padre Miguel', statusDescription: '12º Lugar (Rebaixada)' }
  ],
  1973: [
    { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'portela', schoolName: 'Portela', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'em_cima_da_hora', schoolName: 'Em Cima da Hora', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'tupy_bras_de_pina', schoolName: 'Tupy de Brás de Pina', statusDescription: '9º Lugar (+2 pts • Rebaixada)' },
    { rank: 10, schoolId: 'jacarezinho', schoolName: 'Unidos do Jacarezinho', statusDescription: '10º Lugar (+1 pt • Rebaixada)' }
  ],
  1974: [
    { rank: 1, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'portela', schoolName: 'Portela', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'beija_flor', schoolName: 'Beija-Flor', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'em_cima_da_hora', schoolName: 'Em Cima da Hora', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'estacio_de_sa', schoolName: 'Unidos de São Carlos (Estácio de Sá)', statusDescription: '9º Lugar (+2 pts • Sem Rebaixamento)' },
    { rank: 10, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', statusDescription: '10º Lugar (+1 pt • Sem Rebaixamento)' }
  ],
  1975: [
    { rank: 1, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'portela', schoolName: 'Portela', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'beija_flor', schoolName: 'Beija-Flor', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador', statusDescription: '9º Lugar (+2 pts)' },
    { rank: 10, schoolId: 'estacio_de_sa', schoolName: 'Unidos de São Carlos (Estácio de Sá)', statusDescription: '10º Lugar (+1 pt)' },
    { rank: 11, schoolId: 'unidos_de_lucas', schoolName: 'Unidos de Lucas', statusDescription: '11º Lugar (Sem Rebaixamento)' },
    { rank: 12, schoolId: 'em_cima_da_hora', schoolName: 'Em Cima da Hora', statusDescription: '12º Lugar (Sem Rebaixamento)' }
  ],
  1976: [
    { rank: 1, schoolId: 'beija_flor', schoolName: 'Beija-Flor', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'portela', schoolName: 'Portela', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador', statusDescription: '9º Lugar (+2 pts)' },
    { rank: 10, schoolId: 'estacio_de_sa', schoolName: 'Unidos de São Carlos (Estácio de Sá)', statusDescription: '10º Lugar (+1 pt)' },
    { rank: 11, schoolId: 'lins_imperial', schoolName: 'Lins Imperial', statusDescription: '11º Lugar (Rebaixada)' },
    { rank: 12, schoolId: 'unidos_de_lucas', schoolName: 'Unidos de Lucas', statusDescription: '12º Lugar (Rebaixada)' },
    { rank: 13, schoolId: 'em_cima_da_hora', schoolName: 'Em Cima da Hora', statusDescription: '13º Lugar (Rebaixada)' },
    { rank: 14, schoolId: 'tupy_bras_de_pina', schoolName: 'Tupy de Brás de Pina', statusDescription: '14º Lugar (Rebaixada)' }
  ],
  1977: [
    { rank: 1, schoolId: 'beija_flor', schoolName: 'Beija-Flor', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'portela', schoolName: 'Portela', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', statusDescription: '9º Lugar (+2 pts • Rebaixada)' },
    { rank: 10, schoolId: 'estacio_de_sa', schoolName: 'Unidos de São Carlos (Estácio de Sá)', statusDescription: '10º Lugar (+1 pt • Rebaixada)' },
    { rank: 11, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', statusDescription: '11º Lugar (Rebaixada)' },
    { rank: 12, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', statusDescription: '12º Lugar (Rebaixada)' }
  ],
  1978: [
    { rank: 1, schoolId: 'beija_flor', schoolName: 'Beija-Flor', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'portela', schoolName: 'Portela', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: '7º Lugar (+4 pts • Rebaixada)' },
    { rank: 8, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', statusDescription: '8º Lugar (+3 pts • Rebaixada)' },
    { rank: 9, schoolId: 'arrastao_cascadura', schoolName: 'Arrastão de Cascadura', statusDescription: '9º Lugar (+2 pts • Rebaixada)' },
    { rank: 10, schoolId: 'arranco', schoolName: 'Arranco', statusDescription: '10º Lugar (+1 pt • Rebaixada)' }
  ],
  1979: [
    { rank: 1, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'beija_flor', schoolName: 'Beija-Flor', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'portela', schoolName: 'Portela', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'estacio_de_sa', schoolName: 'Unidos de São Carlos (Estácio de Sá)', statusDescription: '8º Lugar (+3 pts • Sem Rebaixamento)' }
  ],
  1980: [
    { rank: 1, schoolId: 'beija_flor', schoolName: 'Beija-Flor', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 1, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 1, schoolId: 'portela', schoolName: 'Portela', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 2, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 2, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'estacio_de_sa', schoolName: 'Unidos de São Carlos (Estácio de Sá)', statusDescription: '6º Lugar (Rebaixada)' }
  ],
  1981: [
    { rank: 1, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'beija_flor', schoolName: 'Beija-Flor', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'portela', schoolName: 'Portela', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', statusDescription: '9º Lugar (+2 pts)' },
    { rank: 10, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: '10º Lugar (+1 pt)' }
  ],
  1982: [
    { rank: 1, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'portela', schoolName: 'Portela', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'beija_flor', schoolName: 'Beija-Flor', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', statusDescription: '9º Lugar (+2 pts)' },
    { rank: 10, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', statusDescription: '10º Lugar (+1 pt)' },
    { rank: 11, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', statusDescription: '11º Lugar (Rebaixada)' },
    { rank: 12, schoolId: 'estacio_de_sa', schoolName: 'Unidos de São Carlos (Estácio de Sá)', statusDescription: '12º Lugar (Rebaixada)' }
  ],
  1983: [
    { rank: 1, schoolId: 'beija_flor', schoolName: 'Beija-Flor', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'portela', schoolName: 'Portela', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', statusDescription: '9º Lugar (+2 pts)' },
    { rank: 10, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', statusDescription: '10º Lugar (+1 pt)' },
    { rank: 11, schoolId: 'unidos_da_ponte', schoolName: 'Unidos da Ponte', statusDescription: '11º Lugar (Sem Rebaixamento)' },
    { rank: 0, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares', isHorsConcours: true, statusDescription: 'Hors concours' }
  ],
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
  totalParticipations: number;
  yearsInEspecial: number[];
}

export interface EspecialParticipationRecord {
  position: number;
  schoolId: string;
  schoolName: string;
  school?: School;
  totalParticipations: number;
  years: number[];
  firstYear: number;
  lastYear: number;
  titlesCount: number;
  vicesCount: number;
  currentDivision?: string;
  isCurrentlyInEspecial: boolean;
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
  if (nameNorm.includes('unidos do salgueiro')) return 'unidos_do_salgueiro';
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
  if (nameNorm.includes('estácio') || nameNorm.includes('estacio') || nameNorm.includes('são carlos') || nameNorm.includes('sao carlos')) return 'estacio_de_sa';
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
  if (nameNorm.includes('arrastão') || nameNorm.includes('arrastao')) return 'arrastao_cascadura';
  if (nameNorm.includes('arranco')) return 'arranco';
  if (nameNorm.includes('jacarezinho')) return 'jacarezinho';
  if (nameNorm.includes('jacarepaguá') || nameNorm.includes('jacarepagua')) return 'uniao_de_jacarepagua';
  if (nameNorm.includes('capela')) return 'unidos_da_capela';
  if (nameNorm.includes('boca do mato')) return 'aprendizes_boca_do_mato';
  if (nameNorm.includes('bangu')) return 'unidos_de_bangu';
  if (nameNorm.includes('bento ribeiro')) return 'academicos_bento_ribeiro';
  if (nameNorm.includes('aprendizes')) return 'aprendizes_de_lucas';
  if (nameNorm.includes('leblon') || nameNorm.includes('cordovil')) return 'independentes_cordovil';
  if (nameNorm.includes('lucas')) return 'unidos_de_lucas';
  if (nameNorm.includes('tupy') || nameNorm.includes('brás de pina') || nameNorm.includes('bras de pina')) return 'tupy_bras_de_pina';
  if (nameNorm.includes('cima da hora')) return 'em_cima_da_hora';
  if (nameNorm.includes('filhos do deserto') || nameNorm.includes('filhos_do_deserto')) return 'filhos_do_deserto';
  if (nameNorm.includes('indios do acau') || nameNorm.includes('índios do acaú')) return 'indios_do_acau';
  if (nameNorm.includes('catete')) return 'uniao_do_catete';
  if (nameNorm.includes('vai se quiser')) return 'vai_se_quiser';
  if (nameNorm.includes('congonha')) return 'unidos_da_congonha';
  if (nameNorm.includes('centenário') || nameNorm.includes('centenario')) return 'uniao_do_centenario';
  if (nameNorm.includes('cartolinhas')) return 'cartolinhas_de_caxias';
  if (nameNorm.includes('flor do lins')) return 'flor_do_lins';
  if (nameNorm.includes('paz e amor')) return 'paz_e_amor';
  if (nameNorm.includes('indaia') || nameNorm.includes('indaiá')) return 'unidos_do_indaia';
  if (nameNorm.includes('corações unidos') || nameNorm.includes('coracoes unidos')) return 'coracoes_unidos_jacarepagua';
  if (nameNorm.includes('baianas')) return 'paraiso_das_baianas';
  if (nameNorm.includes('aventureiros')) return 'aventureiros_da_matriz';
  if (nameNorm.includes('grajaú') || nameNorm.includes('grajau')) return 'unidos_do_grajau';
  if (nameNorm.includes('floresta')) return 'floresta_do_andarai';
  if (nameNorm.includes('tamarineira')) return 'unidos_da_tamarineira';
  if (nameNorm.includes('engenho da rainha')) return 'engenho_da_rainha';
  if (nameNorm.includes('vaz lobo')) return 'uniao_vaz_lobo';
  if (nameNorm.includes('independentes do rio')) return 'independentes_do_rio';
  return nameNorm.replace(/[^a-z0-9]/g, '_');
}

/**
 * Retorna lista de carnavais históricos com resultados oficiais catalogados (1954 a 2026 + save)
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

  // Anos oficiais catalogados (2026 descendo até 1954)
  const officialYears = [
    2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017,
    2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007,
    2006, 2005, 2004, 2003, 2002, 2001, 2000,
    1999, 1998, 1997, 1996, 1995,
    1994, 1993, 1992, 1991, 1990,
    1989, 1988, 1987, 1986, 1985, 1984,
    1983, 1982, 1981, 1980,
    1979, 1978, 1977, 1976, 1975,
    1974, 1973, 1972, 1971, 1970,
    1969, 1968, 1967, 1966, 1965,
    1964, 1963, 1962, 1961, 1960,
    1959, 1958, 1957, 1956, 1955, 1954
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
      notes = 'Carnaval 1995: Imperatriz Leopoldinense sagrou-se bicampeã com "Mais Vale um再度 jegue que Me Carregue..." de Rosa Magalhães (+20 pts) e Portela conquistou o vice-campeonato com "Gosto que Me Enrosco" (+15 pts). Duas agremiações foram rebaixadas: São Clemente e Unidos da Villa Rica.';
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
      notes = 'Carnaval 1985: Primeiro carnaval sob a organização da LIESA, fundada em 24 de julho de 1984 para administrar o Grupo Especial a partir de 1985. Mocidade Independente sagrou-se campeã com o revolucionário "Ziriguidum 2001, Um Carnaval nas Estrelas" de Fernando Pinto (+20 pts) e Beija-Flor vice-campeã com "A Lapa de Adão e Eva" (+15 pts). Três agremiações foram rebaixadas: Acadêmicos de Santa Cruz, São Clemente e Em Cima da Hora.';
    } else if (yr === 1984) {
      notes = 'Carnaval Histórico de 1984 (Inauguração do Sambódromo Darcy Ribeiro • Último carnaval administrado pela AESCRJ antes da fundação da LIESA em 24 de julho de 1984): Três campeãs e três resultados distintos — Desfile de Domingo (Portela campeã com 20 pts, Império Serrano vice com 15 pts), Desfile de Segunda-Feira (Mangueira campeã com 20 pts, Mocidade vice com 15 pts) e o Supercampeonato no Sábado das Campeãs (Mangueira Supercampeã com 20 pts, Portela Supervice com 15 pts). Rebaixadas pela AESCRJ: Unidos da Tijuca (Domingo) e Unidos da Ponte (Segunda-Feira).';
    } else if (yr === 1983) {
      notes = 'Carnaval 1983 (Administrado pela AESCRJ): Beija-Flor sagrou-se campeã com "A Grande Constelação das Estrelas Negras" (+20 pts) e Portela foi vice-campeã com "Ressurreição das Coroas" (+15 pts). Não houve rebaixamento neste ano por deliberação da AESCRJ. A Caprichosos de Pilares desfilou como Hors concours.';
    } else if (yr === 1982) {
      notes = 'Carnaval 1982 (Administrado pela AESCRJ): Império Serrano conquistou o campeonato com o antológico "Bum bum paticumprucumbum prugurundum" (+20 pts) e Portela foi vice-campeã com "Meu Brasil Brasileiro" (+15 pts). Duas agremiações foram rebaixadas pela AESCRJ: Império da Tijuca e Unidos de São Carlos (atual Estácio de Sá).';
    } else if (yr === 1981) {
      notes = 'Carnaval 1981 (Administrado pela AESCRJ): Imperatriz Leopoldinense sagrou-se bicampeã com "O O que É que a Bahia Tem" (+20 pts) e Beija-Flor foi vice-campeã com "Carnaval do Brasil" (+15 pts). Não houve rebaixamento no Grupo Especial por deliberação da AESCRJ.';
    } else if (yr === 1980) {
      notes = 'Carnaval Histórico de 1980 (Administrado pela AESCRJ): Edição marcante com três campeãs oficiais dividindo o título — Beija-Flor, Imperatriz Leopoldinense e Portela (+20 pts cada), além de três vices oficiais — Mocidade Independente, União da Ilha e Unidos de Vila Isabel (+15 pts cada). Rebaixada pela AESCRJ: Unidos de São Carlos (atual Estácio de Sá).';
    } else if (yr === 1979) {
      notes = 'Carnaval Histórico de 1979 (Administrado pela AESCRJ): Mocidade Independente de Padre Miguel conquistou seu primeiro campeonato histórico com o enredo "O Descobrimento do Brasil" (+20 pts) e Beija-Flor sagrou-se vice-campeã com "O Paraíso da Loucura" (+15 pts). Não houve rebaixamento neste ano por deliberação da AESCRJ.';
    } else if (yr === 1978) {
      notes = 'Carnaval Histórico de 1978 (Administrado pela AESCRJ): Beija-Flor de Nilópolis conquistou o histórico tricampeonato consecutivo com "A Criação do Mundo na Tradição Nagô" de Joãosinho Trinta (+20 pts) e Estação Primeira de Mangueira foi vice-campeã com "Dos Carroceiros do Imperador ao Palácio do Samba" (+15 pts). Quatro agremiações foram rebaixadas: Império Serrano, Unidos de Vila Isabel, Arrastão de Cascadura e Arranco.';
    } else if (yr === 1977) {
      notes = 'Carnaval Histórico de 1977 (Administrado pela AESCRJ): Beija-Flor de Nilópolis sagrou-se bicampeã com o deslumbrante "Vovó e o Rei da Saturnália na Corte de Tutankamon" de Joãosinho Trinta (+20 pts) e Portela foi vice-campeã com "Festa da Aclamação" (+15 pts). Quatro agremiações foram rebaixadas: Imperatriz Leopoldinense, Unidos de São Carlos (atual Estácio de Sá), Império da Tijuca e Unidos do Cabuçu.';
    } else if (yr === 1976) {
      notes = 'Carnaval Histórico de 1976 (Administrado pela AESCRJ): Beija-Flor de Nilópolis conquistou seu histórico primeiro título na elite do samba com o antológico "Sonhar com Rei Dá Leão" de Joãosinho Trinta (+20 pts) e Estação Primeira de Mangueira foi vice-campeã com "No Reino da Mãe do Ouro" (+15 pts). Quatro agremiações foram rebaixadas: Lins Imperial, Unidos de Lucas, Em Cima da Hora e Tupy de Brás de Pina.';
    } else if (yr === 1975) {
      notes = 'Carnaval Histórico de 1975 (Administrado pela AESCRJ): Acadêmicos do Salgueiro sagrou-se bicampeã com a obra-prima "O Segredo das Minas do Rei Salomão" de Joãosinho Trinta (+20 pts) e Estação Primeira de Mangueira foi vice-campeã com "Imagens Poéticas de Jorge de Lima" (+15 pts). Não houve rebaixamento neste ano por deliberação da AESCRJ.';
    } else if (yr === 1974) {
      notes = 'Carnaval Histórico de 1974 (Administrado pela AESCRJ): Acadêmicos do Salgueiro sagrou-se campeã com "O Rei de França na Ilha da Assombração" de Joãosinho Trinta (+20 pts) e Portela foi a vice-campeã com "O Mundo Melhor de Pixinguinha" (+15 pts). Não houve rebaixamento neste ano por deliberação da AESCRJ.';
    } else if (yr === 1973) {
      notes = 'Carnaval Histórico de 1973 (Administrado pela AESCRJ): Estação Primeira de Mangueira conquistou o campeonato com o antológico "Lendas do Abaeté" (+20 pts) e Império Serrano foi o vice-campeão com "Viagem Encantada Pelo Mar das Esmeraldas" (+15 pts). Duas agremiações foram rebaixadas: Tupy de Brás de Pina e Unidos do Jacarezinho.';
    } else if (yr === 1972) {
      notes = 'Carnaval Histórico de 1972 (Administrado pela AESCRJ): Império Serrano conquistou o título com "Alô, Alô, Ta-Hí, Cem Anos de Carmen Miranda" de Fernando Pinto (+20 pts) e Estação Primeira de Mangueira foi vice-campeã com "Rio, Carnaval dos Carnavais" (+15 pts). Quatro agremiações foram rebaixadas: Unidos de São Carlos (atual Estácio de Sá), Império da Tijuca, Unidos de Lucas e Unidos de Padre Miguel.';
    } else if (yr === 1971) {
      notes = 'Carnaval Histórico de 1971 (Administrado pela AESCRJ): Acadêmicos do Salgueiro sagrou-se campeã com o imortal "Festa para um Rei Negro (Pega no Ganzê)" de Fernando Pamplona (+20 pts) e Portela foi vice-campeã com "Lapa em Três Tempos" (+15 pts). Não houve rebaixamento neste ano por deliberação da AESCRJ.';
    } else if (yr === 1970) {
      notes = 'Carnaval Histórico de 1970 (Administrado pela AESCRJ): Portela sagrou-se campeã com "Lendas e Mistérios da Amazônia" (+20 pts) e Acadêmicos do Salgueiro foi a vice-campeã com "Praça Onze, Carioca da Gema" (+15 pts). Duas agremiações foram rebaixadas: Unidos do Jacarezinho e Acadêmicos de Santa Cruz.';
    } else if (yr === 1969) {
      notes = 'Carnaval Histórico de 1969 (Administrado pela AESCRJ): Acadêmicos do Salgueiro sagrou-se campeã com a obra histórica "Bahia de Todos os Deuses" de Fernando Pamplona e Arlindo Rodrigues (+20 pts) e Estação Primeira de Mangueira foi vice-campeã com "Mercadores e Suas Mercadorias" (+15 pts). Rebaixadas: Unidos de Lucas e Em Cima da Hora.';
    } else if (yr === 1968) {
      notes = 'Carnaval Histórico de 1968 (Administrado pela AESCRJ): Estação Primeira de Mangueira sagrou-se campeã com "Samba, Festa de um Povo" de Júlio Mattos (+20 pts) e Império Serrano foi a vice-campeã com "Pernambuco, Leão do Norte" (+15 pts). Rebaixadas: Independentes do Leblon (Independentes de Cordovil) e Império da Tijuca.';
    } else if (yr === 1967) {
      notes = 'Carnaval Histórico de 1967 (Administrado pela AESCRJ): Estação Primeira de Mangueira sagrou-se campeã com o inesquecível "O Mundo Encantado de Monteiro Lobato" (+20 pts) e Império Serrano foi vice-campeã com "São Paulo, Chapadão de Glórias" (+15 pts). Rebaixadas: Imperatriz Leopoldinense e São Clemente.';
    } else if (yr === 1966) {
      notes = 'Carnaval Histórico de 1966 (Administrado pela AESCRJ): Portela sagrou-se campeã com "Memórias de um Sargento de Milícias" de Paulinho da Viola (+20 pts) e Estação Primeira de Mangueira foi vice-campeã com "Exaltação a Villa-Lobos" (+15 pts). Rebaixadas: Unidos da Capela e Acadêmicos de Santa Cruz. Império da Tijuca desfilou como Hors Concours.';
    } else if (yr === 1965) {
      notes = 'Carnaval Histórico de 1965 (Administrado pela AESCRJ - Comemoração do IV Centenário do Rio de Janeiro): Acadêmicos do Salgueiro sagrou-se campeã com "História do Carnaval Carioca" de Fernando Pamplona (+20 pts) e Império Serrano foi vice-campeã com "Cinco Bailes Tradicionais na História do Rio" (+15 pts). Rebaixadas: União de Jacarepaguá e Imperatriz Leopoldinense.';
    } else if (yr === 1964) {
      notes = 'Carnaval Histórico de 1964 (Administrado pela AESCRJ): Portela sagrou-se campeã com "O Segundo Casamento de D. Pedro I" (+20 pts) e Acadêmicos do Salgueiro conquistou o vice-campeonato com o clássico "Chico Rei" de Fernando Pamplona e Arlindo Rodrigues (+15 pts). Rebaixadas: Unidos de Padre Miguel e Unidos do Cabuçu.';
    } else if (yr === 1963) {
      notes = 'Carnaval Histórico de 1963 (Administrado pela AESCRJ): Acadêmicos do Salgueiro conquistou o campeonato com a inesquecível obra-prima "Chica da Silva" de Fernando Pamplona e Arlindo Rodrigues (+20 pts) e Estação Primeira de Mangueira foi vice-campeã com "Exaltação à Bahia" (+15 pts). Rebaixadas: Unidos de Bangu e Beija-Flor.';
    } else if (yr === 1962) {
      notes = 'Carnaval Histórico de 1962 (Administrado pela AESCRJ): Portela sagrou-se campeã com "Rugendas - Viagens Pitorescas através do Brasil" de Nélson de Andrade (+20 pts) e Império Serrano foi vice-campeã com "Rio dos Vice-Reis" (+15 pts). Rebaixadas: Unidos da Capela e Tupy de Brás de Pina.';
    } else if (yr === 1961) {
      notes = 'Carnaval Histórico de 1961 (Administrado pela AESCRJ): Estação Primeira de Mangueira sagrou-se campeã com "Reminiscências do Rio Antigo" de Roberto Paulino e Darque Dias Moreira (+20 pts) e Acadêmicos do Salgueiro foi vice-campeã com "Vida e Obra de Aleijadinho" (+15 pts). Rebaixadas: Caprichosos de Pilares, Unidos de Padre Miguel e Acadêmicos de Bento Ribeiro.';
    } else if (yr === 1960) {
      notes = 'Carnaval Histórico de 1960 (Administrado pela AESCRJ): Histórica e célebre edição com cinco agremiações campeãs dividindo o título máximo — Portela ("Vila Rica de Ouro Preto"), Estação Primeira de Mangueira ("Carnaval de Todos os Tempos"), Acadêmicos do Salgueiro ("Quilombo dos Palmares"), Unidos da Capela ("Noite de Gala no Palácio de São Cristóvão") e Império Serrano ("Exaltação a Tiradentes"), todas somando 20 pontos de campeã. Aprendizes de Lucas foi a vice-campeã (+15 pts). Rebaixadas: Beija-Flor, Aprendizes da Boca do Mato e Unidos de Bangu.';
    } else if (yr === 1959) {
      notes = 'Carnaval Histórico de 1959 (Administrado pela AESCRJ): Portela sagrou-se tricampeã com "Brasil, Panteon de Glórias" (+20 pts) e Acadêmicos do Salgueiro vice-campeã com "Viagem Pitoresca através do Brasil (Debret)" de Fernando Pamplona (+15 pts). Oito agremiações foram rebaixadas: Caprichosos de Pilares, Cartolinhas de Caxias, União do Centenário, Tupy de Brás de Pina, Unidos do Cabuçu, Paraíso do Tuiuti, Unidos da Tijuca e Unidos do Salgueiro.';
    } else if (yr === 1958) {
      notes = 'Carnaval Histórico de 1958 (Administrado pela AESCRJ): Portela conquistou o bicampeonato com "Vultos Célebres do Brasil" (+20 pts) e Império Serrano foi vice-campeã com "Exaltação a Bárbara Heliodora" (+15 pts). Rebaixadas: Unidos de Bento Ribeiro, Flor do Lins e Filhos do Deserto.';
    } else if (yr === 1957) {
      notes = 'Carnaval Histórico de 1957 (Administrado pela AESCRJ): Portela sagrou-se campeã com "Legados de D. João VI" (+20 pts) e Império Serrano vice-campeã com "D. João VI" (+15 pts). Rebaixadas: Unidos de Vila Isabel, Paraíso do Tuiuti e Paz e Amor.';
    } else if (yr === 1956) {
      notes = 'Carnaval Histórico de 1956 (Administrado pela AESCRJ): Império Serrano sagrou-se bicampeã com "O Caçador de Esmeraldas" (+20 pts) e Portela foi vice-campeã com "O Tesouro Descoberto por Colombo" (+15 pts). Rebaixadas: Unidos da Congonha, Unidos do Indaiá e Unidos do Salgueiro.';
    } else if (yr === 1955) {
      notes = 'Carnaval Histórico de 1955 (Administrado pela AESCRJ): Império Serrano sagrou-se campeã com "Exaltação a Caxias" (+20 pts) e Estação Primeira de Mangueira vice-campeã com "As Quatro Estações do Ano" (+15 pts). Rebaixadas: Índios do Acaú, Império da Tijuca e União do Catete.';
    } else if (yr === 1954) {
      notes = 'Carnaval Histórico de 1954 (Administrado pela AESCRJ): Estação Primeira de Mangueira sagrou-se campeã com "O Novo Continente" (+20 pts) e Império Serrano foi vice-campeã com "O Guarda da Marinha Real" (+15 pts). Sete agremiações foram rebaixadas: Acadêmicos do Engenho da Rainha, Aventureiros da Matriz, Paz e Amor, Unidos da Tamarineira, Independentes do Rio, Independentes do Leblon (Independentes de Cordovil) e União de Vaz Lobo.';
    }

    result.push({
      year: yr,
      standings: stands,
      isNoCarnaval: false,
      notes,
      championNames: yr === 1984
        ? ['Estação Primeira de Mangueira (Supercampeã)', 'Portela (Campeã de Domingo)']
        : yr === 1980
        ? ['Beija-Flor', 'Imperatriz Leopoldinense', 'Portela']
        : yr === 1960
        ? ['Portela', 'Estação Primeira de Mangueira', 'Acadêmicos do Salgueiro', 'Unidos da Capela', 'Império Serrano']
        : champs,
      viceChampionNames: yr === 1984
        ? ['Portela (Supervice)', 'Mocidade Independente (Vice Segunda)', 'Império Serrano (Vice Domingo)']
        : yr === 1980
        ? ['Mocidade Independente', 'União da Ilha do Governador', 'Unidos de Vila Isabel']
        : yr === 1960
        ? ['Aprendizes de Lucas']
        : vices,
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
      participationsSet: Set<number>;
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
        totalCarnavalesContados: 0,
        participationsSet: new Set<number>()
      };
    }
    return historicalMap[sId];
  };

  // 1. Processa todos os títulos e vices históricos da era pré-1954 a partir de HISTORICAL_CARNAVAL_RECORDS
  // A partir de 1954 em diante, todas as colocações detalhadas vêm do catálogo oficial LIESA
  Object.entries(HISTORICAL_CARNAVAL_RECORDS).forEach(([id, rec]) => {
    const sId = resolveSchoolId(id, undefined, schoolsMap);
    const entry = ensureEntry(sId);

    const espYearsPre1954 = (rec.especialYears || []).filter((y) => y < 1954);
    const espViceYearsPre1954 = (rec.especialRunnerUpYears || []).filter((y) => y < 1954);

    const titlesPre1954 = espYearsPre1954.length;
    const vicesPre1954 = espViceYearsPre1954.length;

    entry.totalEspecialTitles += titlesPre1954;
    entry.totalEspecialVices += vicesPre1954;
    entry.titlePoints += titlesPre1954 * 20;
    entry.vicePoints += vicesPre1954 * 15;
    entry.pointsEraPre2015 += titlesPre1954 * 20 + vicesPre1954 * 15;
    entry.totalPoints += titlesPre1954 * 20 + vicesPre1954 * 15;
    entry.totalCarnavalesContados += titlesPre1954 + vicesPre1954;
  });

  // 2. Processa anos de 1954 a 2026 oficiais (com todas as colocações detalhadas catalogadas)
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

      entry.participationsSet.add(yr);

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

        entry.participationsSet.add(h.year);

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
    totalCarnavalesContados: entry.totalCarnavalesContados,
    totalParticipations: entry.participationsSet.size,
    yearsInEspecial: Array.from(entry.participationsSet).sort((a, b) => b - a)
  }));
}

/**
 * Calcula a lista de agremiações por ordem estritamente DECRESCENTE de participações
 * no Grupo Especial, computando todos os Carnavais Passados catalogados (1954 a 2026)
 * somados dinamicamente aos anos decorridos no save (inGameHistory).
 */
export function computeEspecialParticipationsList(
  allSchools: School[] = INITIAL_SCHOOLS,
  inGameHistory: YearHistory[] = []
): EspecialParticipationRecord[] {
  const effectiveSchools = allSchools && allSchools.length > 0 ? allSchools : INITIAL_SCHOOLS;
  const schoolsMap = new Map<string, School>();
  effectiveSchools.forEach((s) => schoolsMap.set(s.id, s));

  const participationsMap = new Map<
    string,
    {
      schoolId: string;
      schoolName: string;
      years: Set<number>;
      titlesCount: number;
      vicesCount: number;
    }
  >();

  const getOrCreate = (rawId?: string, rawName?: string) => {
    const sId = resolveSchoolId(rawId || '', rawName, schoolsMap);
    if (!participationsMap.has(sId)) {
      const sch = schoolsMap.get(sId);
      participationsMap.set(sId, {
        schoolId: sId,
        schoolName: sch ? cleanSchoolName(sch) : rawName || sId,
        years: new Set<number>(),
        titlesCount: 0,
        vicesCount: 0
      });
    }
    return participationsMap.get(sId)!;
  };

  // 1. Processa todos os anos catalogados oficiais dos Carnavais Passados (1970 a 2026)
  Object.entries(OFFICIAL_LIESA_HISTORICAL_STANDINGS).forEach(([yrStr, standings]) => {
    const yr = Number(yrStr);
    if (yr === 2021 || !standings || standings.length === 0) return; // 2021: Não Houve Carnaval

    standings.forEach((st) => {
      const item = getOrCreate(st.schoolId, st.schoolName);
      item.years.add(yr);
      if (!st.isHorsConcours) {
        if (st.rank === 1) item.titlesCount++;
        else if (st.rank === 2) item.vicesCount++;
        if (yr === 1984 && item.schoolId === 'mangueira') item.titlesCount++;
        if (yr === 1984 && item.schoolId === 'portela') item.vicesCount++;
      }
    });
  });

  // 2. Processa anos decorridos no save (inGameHistory para anos > 2026)
  inGameHistory.forEach((h) => {
    if (h.year > 2026 && h.especialStandings && h.especialStandings.length > 0) {
      h.especialStandings.forEach((st) => {
        if (!st.schoolId && !st.schoolName) return;
        const item = getOrCreate(st.schoolId, st.schoolName);
        item.years.add(h.year);
        if (st.rank === 1) item.titlesCount++;
        else if (st.rank === 2) item.vicesCount++;
      });
    }
  });

  // 3. Converte para array e ordena em ordem DECRESCENTE de participações
  const list = Array.from(participationsMap.values()).map((item) => {
    const sortedYears = Array.from(item.years).sort((a, b) => b - a);
    const sch = schoolsMap.get(item.schoolId);
    return {
      schoolId: item.schoolId,
      schoolName: sch ? cleanSchoolName(sch) : item.schoolName,
      school: sch,
      totalParticipations: sortedYears.length,
      years: sortedYears,
      firstYear: sortedYears.length > 0 ? sortedYears[sortedYears.length - 1] : 0,
      lastYear: sortedYears.length > 0 ? sortedYears[0] : 0,
      titlesCount: item.titlesCount,
      vicesCount: item.vicesCount,
      currentDivision: sch?.division,
      isCurrentlyInEspecial: sch?.division === 'especial'
    };
  });

  list.sort((a, b) => {
    // 1º: Maior número de participações no Especial
    if (b.totalParticipations !== a.totalParticipations) {
      return b.totalParticipations - a.totalParticipations;
    }
    // 2º: Maior número de títulos no Especial
    if (b.titlesCount !== a.titlesCount) {
      return b.titlesCount - a.titlesCount;
    }
    // 3º: Maior número de vices
    if (b.vicesCount !== a.vicesCount) {
      return b.vicesCount - a.vicesCount;
    }
    // 4º: Ano mais recente de participação
    if (b.lastYear !== a.lastYear) {
      return b.lastYear - a.lastYear;
    }
    return a.schoolName.localeCompare(b.schoolName);
  });

  return list.map((item, idx) => ({
    ...item,
    position: idx + 1
  }));
}

/**
 * Retorna o número de participações de uma escola no Grupo Especial
 */
export function getSchoolEspecialParticipationsCount(
  schoolId: string,
  schoolName?: string,
  inGameHistory: YearHistory[] = []
): number {
  const list = computeEspecialParticipationsList(undefined, inGameHistory);
  const found = list.find((r) => r.schoolId === schoolId || (schoolName && r.schoolName === schoolName));
  return found ? found.totalParticipations : 0;
}
