import { School, YearHistory } from '../types/carnaval';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import { HISTORICAL_CARNAVAL_RECORDS, INITIAL_SCHOOLS } from '../data/carnavalData';

export interface LiesaStandingRecord {
  rank: number;
  schoolId: string;
  schoolName: string;
  totalScore?: number;
  isHorsConcours?: boolean;
  subgroup?: 'domingo' | 'segunda' | 'supercampeonato' | 'fbes' | 'ugesb' | 'uces' | 'o_pais' | 'a_hora';
  league?: 'FBES' | 'UGESB' | 'UCES' | 'AESCRJ' | 'LIESA' | 'O País' | 'A Hora' | 'Mundo Sportivo';
  statusDescription?: string;
  relegated?: boolean;
  promoted?: boolean;
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
 * Resultados específicos do Carnaval de 1932:
 * É o primeiro desfile competitivo da história do carnaval, realizado na Praça Onze.
 * Desfile organizado pelo Jornal Mundo Sportivo (criado por Mário Filho).
 * 1ª Estação Primeira de Mangueira (Campeã Histórica +20 pts)
 * 2ª Segunda Linha do Estácio (Vice-Campeã Histórica +15 pts)
 * 2ª Vai Como Pode - Portela (Vice-Campeã Histórica +15 pts)
 * 3ª Para o Ano Sai Melhor (+12 pts)
 * 4ª Unidos da Tijuca (+10 pts)
 */
export const CARNAVAL_1932_OFICIAL: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', league: 'Mundo Sportivo', statusDescription: 'Campeã Oficial (+20 pts)' },
  { rank: 2, schoolId: 'segunda_linha_do_estacio', schoolName: 'Segunda Linha do Estácio', league: 'Mundo Sportivo', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
  { rank: 2, schoolId: 'portela', schoolName: 'Vai Como Pode (Portela)', league: 'Mundo Sportivo', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
  { rank: 3, schoolId: 'para_o_ano_sai_melhor', schoolName: 'Para o Ano Sai Melhor', league: 'Mundo Sportivo', statusDescription: '3º Lugar (+12 pts)' },
  { rank: 4, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', league: 'Mundo Sportivo', statusDescription: '4º Lugar (+10 pts)' }
];

/**
 * Resultados específicos do Carnaval de 1933:
 * Segundo desfile competitivo de escolas de samba na Praça Onze.
 * Apenas as 5 primeiras colocadas foram classificadas oficialmente (empate em 4º lugar).
 * 1ª Estação Primeira de Mangueira (Bicampeã Oficial +20 pts)
 * 2ª Azul e Branco do Salgueiro (Vice-Campeã Oficial +15 pts)
 * 3ª Unidos da Tijuca (+12 pts)
 * 4ª De Mim Ninguém se Lembra (+10 pts)
 * 4ª Vai Como Pode - Portela (+10 pts)
 * 5ª União do Uruguai (+8 pts)
 * 26 agremiações desfilaram sem classificação final oficial atribuída (0 pts).
 */
export const CARNAVAL_1933_OFICIAL: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', league: 'UGESB', statusDescription: 'Campeã Oficial (+20 pts)' },
  { rank: 2, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', league: 'UGESB', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
  { rank: 3, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', league: 'UGESB', statusDescription: '3º Lugar (+12 pts)' },
  { rank: 4, schoolId: 'de_mim_ninguem_se_lembra', schoolName: 'De Mim Ninguém se Lembra', league: 'UGESB', statusDescription: '4º Lugar empatada (+10 pts)' },
  { rank: 4, schoolId: 'portela', schoolName: 'Vai Como Pode (Portela)', league: 'UGESB', statusDescription: '4º Lugar empatada (+10 pts)' },
  { rank: 5, schoolId: 'uniao_do_uruguai', schoolName: 'União do Uruguai', league: 'UGESB', statusDescription: '5º Lugar (+8 pts)' },
  // Não Classificadas (0 pts)
  { rank: 0, schoolId: 'aventureiros_da_matriz', schoolName: 'Aventureiros da Matriz', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'capricho_do_engenho_novo', schoolName: 'Capricho do Engenho Novo', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'e_assim_que_nos_queremos', schoolName: 'É Assim que Nós Queremos', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'e_o_que_se_ve', schoolName: 'É o Que Se Vê', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'em_cima_da_hora_catumbi', schoolName: 'Em Cima da Hora do Catumbi', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'amizade_do_realengo', schoolName: 'Embaixada Escola Amizade do Realengo', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'estrela_da_tijuca', schoolName: 'Estrela da Tijuca', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'filhos_de_ninguem', schoolName: 'Filhos de Ninguém', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'fiquei_firme', schoolName: 'Fiquei Firme', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'inimigos_da_tristeza', schoolName: 'Inimigos da Tristeza', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'lira_do_amor', schoolName: 'Lira do Amor', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'mocidade_louca_sao_cristovao', schoolName: 'Mocidade Louca de São Cristóvão', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'na_hora_e_que_se_ve', schoolName: 'Na Hora é Que Se Vê', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'nos_nao_somos_la_essas_coisas', schoolName: 'Nós Não Somos Lá Essas Coisas', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'podia_ser_pior', schoolName: 'Podia ser pior', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'prazer_da_serrinha', schoolName: 'Prazer da Serrinha', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'principes_da_floresta', schoolName: 'Príncipes da Floresta', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'recreio_de_ramos', schoolName: 'Recreio de Ramos', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'sport_club_guarany', schoolName: 'Sport Clube Guarany', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'escola_tuiuti', schoolName: 'Tuiuti', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'ultima_hora', schoolName: 'Última Hora', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'uniao_barao_da_gamboa', schoolName: 'União Barão da Gamboa', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'uniao_do_amor', schoolName: 'União do Amor', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'unidos_do_salgueiro', schoolName: 'Unidos do Salgueiro', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'vizinha_faladeira', schoolName: 'Vizinha Faladeira', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou em 1933 (Sem classificação oficial • 0 pts)' }
];

/**
 * Resultados específicos do Carnaval de 1934 - Desfile organizado pelo jornal "O País":
 * Houve 2 desfiles competitivos em 1934. Este foi organizado pelo tradicional periódico "O País".
 * 1ª Mangueira (Campeã O País, +20 pts)
 * 2ª Vai Como Pode - Portela (Vice-Campeã O País, +15 pts)
 * 3ª Deixa Malhar (+12 pts)
 * 13 agremiações desfilaram sem classificação final oficial atribuída (0 pts).
 */
export const CARNAVAL_1934_O_PAIS: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', subgroup: 'o_pais', league: 'O País', statusDescription: 'Campeã Jornal O País (+20 pts)' },
  { rank: 2, schoolId: 'portela', schoolName: 'Vai Como Pode (Portela)', subgroup: 'o_pais', league: 'O País', statusDescription: 'Vice-Campeã Jornal O País (+15 pts)' },
  { rank: 3, schoolId: 'deixa_malhar', schoolName: 'Deixa Malhar', subgroup: 'o_pais', league: 'O País', statusDescription: '3º Lugar Jornal O País (+12 pts)' },
  // Sem classificação oficial (0 pts)
  { rank: 0, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', isHorsConcours: true, subgroup: 'o_pais', league: 'O País', statusDescription: 'Desfilou O País (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'cada_ano_sai_melhor', schoolName: 'Cada Ano Sai Melhor', isHorsConcours: true, subgroup: 'o_pais', league: 'O País', statusDescription: 'Desfilou O País (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'de_mim_ninguem_se_lembra', schoolName: 'De Mim Ninguém Se Lembra', isHorsConcours: true, subgroup: 'o_pais', league: 'O País', statusDescription: 'Desfilou O País (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'depois_te_explico', schoolName: 'Depois Te Explico', isHorsConcours: true, subgroup: 'o_pais', league: 'O País', statusDescription: 'Desfilou O País (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'fale_quem_quizer', schoolName: 'Fale Quem Quizer', isHorsConcours: true, subgroup: 'o_pais', league: 'O País', statusDescription: 'Desfilou O País (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'lira_do_amor', schoolName: 'Lira do Amor', isHorsConcours: true, subgroup: 'o_pais', league: 'O País', statusDescription: 'Desfilou O País (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'para_o_ano_sai_melhor', schoolName: 'Para o Ano Sai Melhor', isHorsConcours: true, subgroup: 'o_pais', league: 'O País', statusDescription: 'Desfilou O País (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'paraiso_da_floresta', schoolName: 'Paraíso da Floresta', isHorsConcours: true, subgroup: 'o_pais', league: 'O País', statusDescription: 'Desfilou O País (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'paraiso_do_grotao', schoolName: 'Paraíso do Grotão', isHorsConcours: true, subgroup: 'o_pais', league: 'O País', statusDescription: 'Desfilou O País (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'prazer_da_serrinha', schoolName: 'Prazer da Serrinha', isHorsConcours: true, subgroup: 'o_pais', league: 'O País', statusDescription: 'Desfilou O País (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'ultima_hora', schoolName: 'Última Hora', isHorsConcours: true, subgroup: 'o_pais', league: 'O País', statusDescription: 'Desfilou O País (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'uniao_do_sape', schoolName: 'União do Sapê', isHorsConcours: true, subgroup: 'o_pais', league: 'O País', statusDescription: 'Desfilou O País (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'unidos_da_saude', schoolName: 'Unidos da Saúde', isHorsConcours: true, subgroup: 'o_pais', league: 'O País', statusDescription: 'Desfilou O País (Sem classificação oficial • 0 pts)' }
];

/**
 * Resultados específicos do Carnaval de 1934 - Desfile organizado pelo jornal "A Hora":
 * Houve 2 desfiles competitivos em 1934. Este foi organizado pelo periódico "A Hora".
 * 1ª Recreio de Ramos (Campeã A Hora, +20 pts)
 * 2ª Unidos da Tijuca (Vice-Campeã A Hora, +15 pts)
 * 3ª Unidos da Saúde (+12 pts)
 * 4ª Vizinha Faladeira (+10 pts)
 * 5ª Para o Ano Sai Melhor (+8 pts)
 * 6ª Azul e Branco do Salgueiro (+6 pts)
 * 14 agremiações desfilaram sem classificação final oficial atribuída (0 pts).
 */
export const CARNAVAL_1934_A_HORA: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'recreio_de_ramos', schoolName: 'Recreio de Ramos', subgroup: 'a_hora', league: 'A Hora', statusDescription: 'Campeã Jornal A Hora (+20 pts)' },
  { rank: 2, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', subgroup: 'a_hora', league: 'A Hora', statusDescription: 'Vice-Campeã Jornal A Hora (+15 pts)' },
  { rank: 3, schoolId: 'unidos_da_saude', schoolName: 'Unidos da Saúde', subgroup: 'a_hora', league: 'A Hora', statusDescription: '3º Lugar Jornal A Hora (+12 pts)' },
  { rank: 4, schoolId: 'vizinha_faladeira', schoolName: 'Vizinha Faladeira', subgroup: 'a_hora', league: 'A Hora', statusDescription: '4º Lugar Jornal A Hora (+10 pts)' },
  { rank: 5, schoolId: 'para_o_ano_sai_melhor', schoolName: 'Para o Ano Sai Melhor', subgroup: 'a_hora', league: 'A Hora', statusDescription: '5º Lugar Jornal A Hora (+8 pts)' },
  { rank: 6, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', subgroup: 'a_hora', league: 'A Hora', statusDescription: '6º Lugar Jornal A Hora (+6 pts)' },
  // Sem classificação oficial (0 pts)
  { rank: 0, schoolId: 'cada_ano_sai_melhor', schoolName: 'Cada Ano Sai Melhor', isHorsConcours: true, subgroup: 'a_hora', league: 'A Hora', statusDescription: 'Desfilou A Hora (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'de_mim_ninguem_se_lembra', schoolName: 'De Mim Ninguém Se Lembra', isHorsConcours: true, subgroup: 'a_hora', league: 'A Hora', statusDescription: 'Desfilou A Hora (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'deixa_malhar', schoolName: 'Deixa Malhar', isHorsConcours: true, subgroup: 'a_hora', league: 'A Hora', statusDescription: 'Desfilou A Hora (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'depois_eu_digo', schoolName: 'Depois Eu Digo', isHorsConcours: true, subgroup: 'a_hora', league: 'A Hora', statusDescription: 'Desfilou A Hora (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'em_cima_da_hora_catumbi', schoolName: 'Em Cima da Hora do Catumbi', isHorsConcours: true, subgroup: 'a_hora', league: 'A Hora', statusDescription: 'Desfilou A Hora (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'filhos_de_ninguem', schoolName: 'Filhos de Ninguém', isHorsConcours: true, subgroup: 'a_hora', league: 'A Hora', statusDescription: 'Desfilou A Hora (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'fiquei_firme', schoolName: 'Fiquei Firme', isHorsConcours: true, subgroup: 'a_hora', league: 'A Hora', statusDescription: 'Desfilou A Hora (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'lira_do_amor', schoolName: 'Lira do Amor', isHorsConcours: true, subgroup: 'a_hora', league: 'A Hora', statusDescription: 'Desfilou A Hora (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'paraiso_da_floresta', schoolName: 'Paraíso da Floresta', isHorsConcours: true, subgroup: 'a_hora', league: 'A Hora', statusDescription: 'Desfilou A Hora (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'paraiso_do_grotao', schoolName: 'Paraíso do Grotão', isHorsConcours: true, subgroup: 'a_hora', league: 'A Hora', statusDescription: 'Desfilou A Hora (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'prazer_da_serrinha', schoolName: 'Prazer da Serrinha', isHorsConcours: true, subgroup: 'a_hora', league: 'A Hora', statusDescription: 'Desfilou A Hora (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'uniao_barao_da_gamboa', schoolName: 'União Barão da Gamboa', isHorsConcours: true, subgroup: 'a_hora', league: 'A Hora', statusDescription: 'Desfilou A Hora (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'uniao_de_madureira', schoolName: 'União de Madureira', isHorsConcours: true, subgroup: 'a_hora', league: 'A Hora', statusDescription: 'Desfilou A Hora (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'uniao_do_amor', schoolName: 'União do Amor', isHorsConcours: true, subgroup: 'a_hora', league: 'A Hora', statusDescription: 'Desfilou A Hora (Sem classificação oficial • 0 pts)' }
];

/**
 * Resultados consolidados do Carnaval de 1934 (Desfiles de O País e A Hora):
 * Computa as colocações e pontuações de ambas as competições históricas.
 */
export const CARNAVAL_1934_OFICIAL: LiesaStandingRecord[] = [
  // 1º Lugares (+20 pts)
  { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', subgroup: 'o_pais', league: 'O País', statusDescription: 'Campeã Jornal O País (+20 pts)' },
  { rank: 1, schoolId: 'recreio_de_ramos', schoolName: 'Recreio de Ramos', subgroup: 'a_hora', league: 'A Hora', statusDescription: 'Campeã Jornal A Hora (+20 pts)' },
  // 2º Lugares (+15 pts)
  { rank: 2, schoolId: 'portela', schoolName: 'Vai Como Pode (Portela)', subgroup: 'o_pais', league: 'O País', statusDescription: 'Vice-Campeã Jornal O País (+15 pts)' },
  { rank: 2, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', subgroup: 'a_hora', league: 'A Hora', statusDescription: 'Vice-Campeã Jornal A Hora (+15 pts)' },
  // 3º Lugares (+12 pts)
  { rank: 3, schoolId: 'deixa_malhar', schoolName: 'Deixa Malhar', subgroup: 'o_pais', league: 'O País', statusDescription: '3º Lugar Jornal O País (+12 pts)' },
  { rank: 3, schoolId: 'unidos_da_saude', schoolName: 'Unidos da Saúde', subgroup: 'a_hora', league: 'A Hora', statusDescription: '3º Lugar Jornal A Hora (+12 pts)' },
  // 4º Lugar (+10 pts)
  { rank: 4, schoolId: 'vizinha_faladeira', schoolName: 'Vizinha Faladeira', subgroup: 'a_hora', league: 'A Hora', statusDescription: '4º Lugar Jornal A Hora (+10 pts)' },
  // 5º Lugar (+8 pts)
  { rank: 5, schoolId: 'para_o_ano_sai_melhor', schoolName: 'Para o Ano Sai Melhor', subgroup: 'a_hora', league: 'A Hora', statusDescription: '5º Lugar Jornal A Hora (+8 pts)' },
  // 6º Lugar (+6 pts)
  { rank: 6, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', subgroup: 'a_hora', league: 'A Hora', statusDescription: '6º Lugar Jornal A Hora (+6 pts)' },
  // Sem classificação oficial (0 pts)
  { rank: 0, schoolId: 'cada_ano_sai_melhor', schoolName: 'Cada Ano Sai Melhor', isHorsConcours: true, statusDescription: 'Desfilou em 1934 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'de_mim_ninguem_se_lembra', schoolName: 'De Mim Ninguém Se Lembra', isHorsConcours: true, statusDescription: 'Desfilou em 1934 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'depois_eu_digo', schoolName: 'Depois Eu Digo', isHorsConcours: true, statusDescription: 'Desfilou em A Hora (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'depois_te_explico', schoolName: 'Depois Te Explico', isHorsConcours: true, statusDescription: 'Desfilou em O País (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'em_cima_da_hora_catumbi', schoolName: 'Em Cima da Hora do Catumbi', isHorsConcours: true, statusDescription: 'Desfilou em A Hora (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'fale_quem_quizer', schoolName: 'Fale Quem Quizer', isHorsConcours: true, statusDescription: 'Desfilou em O País (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'filhos_de_ninguem', schoolName: 'Filhos de Ninguém', isHorsConcours: true, statusDescription: 'Desfilou em A Hora (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'fiquei_firme', schoolName: 'Fiquei Firme', isHorsConcours: true, statusDescription: 'Desfilou em A Hora (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'lira_do_amor', schoolName: 'Lira do Amor', isHorsConcours: true, statusDescription: 'Desfilou em 1934 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'paraiso_da_floresta', schoolName: 'Paraíso da Floresta', isHorsConcours: true, statusDescription: 'Desfilou em 1934 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'paraiso_do_grotao', schoolName: 'Paraíso do Grotão', isHorsConcours: true, statusDescription: 'Desfilou em 1934 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'prazer_da_serrinha', schoolName: 'Prazer da Serrinha', isHorsConcours: true, statusDescription: 'Desfilou em 1934 (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'ultima_hora', schoolName: 'Última Hora', isHorsConcours: true, statusDescription: 'Desfilou em O País (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'uniao_barao_da_gamboa', schoolName: 'União Barão da Gamboa', isHorsConcours: true, statusDescription: 'Desfilou em A Hora (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'uniao_de_madureira', schoolName: 'União de Madureira', isHorsConcours: true, statusDescription: 'Desfilou em A Hora (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'uniao_do_amor', schoolName: 'União do Amor', isHorsConcours: true, statusDescription: 'Desfilou em A Hora (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'uniao_do_sape', schoolName: 'União do Sapê', isHorsConcours: true, statusDescription: 'Desfilou em O País (Sem classificação oficial • 0 pts)' }
];

/**
 * Resultados específicos do desfile competitivo do Carnaval de 1935:
 * Primeiro desfile oficial unificado organizado pela UGES / Jornal A Nação.
 * Apenas as 5 primeiras colocadas foram classificadas oficialmente com pontos.
 * Vai Como Pode (atual Portela) consagrada campeã (+20 pts) e Estação Primeira de Mangueira vice-campeã (+15 pts).
 * 18 agremiações desfilaram sem classificação final oficial atribuída (0 pts).
 */
export const CARNAVAL_1935_OFICIAL: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'portela', schoolName: 'Vai Como Pode (Portela)', league: 'UGESB', statusDescription: 'Campeã Oficial (+20 pts)' },
  { rank: 2, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', league: 'UGESB', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
  { rank: 3, schoolId: 'prazer_da_serrinha', schoolName: 'Prazer da Serrinha', league: 'UGESB', statusDescription: '3º Lugar (+12 pts)' },
  { rank: 4, schoolId: 'vizinha_faladeira', schoolName: 'Vizinha Faladeira', league: 'UGESB', statusDescription: '4º Lugar (+10 pts)' },
  { rank: 5, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', league: 'UGESB', statusDescription: '5º Lugar (+8 pts)' },
  // Sem classificação oficial (0 pts)
  { rank: 0, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'cada_ano_sai_melhor', schoolName: 'Cada Ano Sai Melhor', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'coracoes_unidos_da_favela', schoolName: 'Corações Unidos da Favela', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'deixa_malhar', schoolName: 'Deixa Malhar', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'depois_eu_digo', schoolName: 'Depois Eu Digo', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'depois_te_explico', schoolName: 'Depois Te Explico', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'em_cima_da_hora_catumbi', schoolName: 'Em Cima da Hora do Catumbi', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'fiquei_firme', schoolName: 'Fiquei Firme', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'lira_do_amor', schoolName: 'Lira do Amor', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'na_hora_e_que_se_ve', schoolName: 'Na Hora É Que Se Vê', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'paraiso_do_grotao', schoolName: 'Paraíso do Grotão', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'rainha_das_pretas', schoolName: 'Rainha das Pretas', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'ultima_hora', schoolName: 'Última Hora', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'uniao_barao_da_gamboa', schoolName: 'União Barão da Gamboa', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'uniao_do_uruguai', schoolName: 'União do Uruguai', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'unidos_do_salgueiro', schoolName: 'Unidos do Salgueiro', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou (Sem classificação oficial • 0 pts)' },
  { rank: 0, schoolId: 'unidos_do_tuiuti', schoolName: 'Unidos do Tuiuti', isHorsConcours: true, league: 'UGESB', statusDescription: 'Desfilou (Sem classificação oficial • 0 pts)' }
];

/**
 * Resultados específicos do desfile competitivo do Carnaval de 1936:
 * Desfile oficial com 11 agremiações classificadas.
 * Unidos da Tijuca consagrada campeã (+20 pts) e Estação Primeira de Mangueira vice-campeã (+15 pts).
 */
export const CARNAVAL_1936_OFICIAL: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', league: 'FBES', statusDescription: 'Campeã Oficial (+20 pts)' },
  { rank: 2, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', league: 'FBES', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
  { rank: 3, schoolId: 'portela', schoolName: 'Portela', league: 'FBES', statusDescription: '3º Lugar (+12 pts)' },
  { rank: 4, schoolId: 'depois_eu_digo', schoolName: 'Depois Eu Digo', league: 'FBES', statusDescription: '4º Lugar (+10 pts)' },
  { rank: 5, schoolId: 'deixa_malhar', schoolName: 'Deixa Malhar', league: 'FBES', statusDescription: '5º Lugar (+8 pts)' },
  { rank: 6, schoolId: 'vizinha_faladeira', schoolName: 'Vizinha Faladeira', league: 'FBES', statusDescription: '6º Lugar (+6 pts)' },
  { rank: 7, schoolId: 'uniao_barao_da_gamboa', schoolName: 'União Barão da Gamboa', league: 'FBES', statusDescription: '7º Lugar (+4 pts)' },
  { rank: 8, schoolId: 'fiquei_firme', schoolName: 'Fiquei Firme', league: 'FBES', statusDescription: '8º Lugar (+3 pts)' },
  { rank: 9, schoolId: 'ultima_hora', schoolName: 'Última Hora', league: 'FBES', statusDescription: '9º Lugar (+2 pts)' },
  { rank: 10, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', league: 'FBES', statusDescription: '10º Lugar (+1 pt)' },
  { rank: 11, schoolId: 'lira_do_amor', schoolName: 'Lira do Amor', league: 'FBES', statusDescription: '11º Lugar (0 pts)' }
];

/**
 * Resultados específicos do desfile competitivo do Carnaval de 1937:
 * Desfile oficial com 15 agremiações classificadas (empate em 9º lugar).
 * Vizinha Faladeira consagrada campeã (+20 pts) e Portela vice-campeã (+15 pts).
 */
export const CARNAVAL_1937_OFICIAL: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'vizinha_faladeira', schoolName: 'Vizinha Faladeira', league: 'FBES', statusDescription: 'Campeã Oficial (+20 pts)' },
  { rank: 2, schoolId: 'portela', schoolName: 'Portela', league: 'FBES', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
  { rank: 3, schoolId: 'depois_eu_digo', schoolName: 'Depois Eu Digo', league: 'FBES', statusDescription: '3º Lugar (+12 pts)' },
  { rank: 4, schoolId: 'unidos_da_mangueira', schoolName: 'Unidos da Mangueira', league: 'FBES', statusDescription: '4º Lugar (+10 pts)' },
  { rank: 5, schoolId: 'unidos_do_tuiuti', schoolName: 'Unidos do Tuiuti', league: 'FBES', statusDescription: '5º Lugar (+8 pts)' },
  { rank: 6, schoolId: 'uniao_parada_de_lucas', schoolName: 'União Parada de Lucas', league: 'FBES', statusDescription: '6º Lugar (+6 pts)' },
  { rank: 7, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', league: 'FBES', statusDescription: '7º Lugar (+4 pts)' },
  { rank: 8, schoolId: 'papagaio_linguarudo', schoolName: 'Papagaio Linguarudo', league: 'FBES', statusDescription: '8º Lugar (+3 pts)' },
  { rank: 9, schoolId: 'cada_ano_sai_melhor', schoolName: 'Cada Ano Sai Melhor', league: 'FBES', statusDescription: '9º Lugar empatada (+2 pts)' },
  { rank: 9, schoolId: 'mocidade_louca_sao_cristovao', schoolName: 'Mocidade Louca de São Cristóvão', league: 'FBES', statusDescription: '9º Lugar empatada (+2 pts)' },
  { rank: 10, schoolId: 'unidos_de_cavalcante', schoolName: 'Unidos de Cavalcante', league: 'FBES', statusDescription: '10º Lugar (+1 pt)' },
  { rank: 11, schoolId: 'uniao_barao_da_gamboa', schoolName: 'União Barão da Gamboa', league: 'FBES', statusDescription: '11º Lugar (0 pts)' },
  { rank: 12, schoolId: 'paraiso_do_grotao', schoolName: 'Paraíso do Grotão', league: 'FBES', statusDescription: '12º Lugar (0 pts)' },
  { rank: 13, schoolId: 'unidos_do_salgueiro', schoolName: 'Unidos do Salgueiro', league: 'FBES', statusDescription: '13º Lugar (0 pts)' },
  { rank: 14, schoolId: 'fiquei_firme', schoolName: 'Fiquei Firme', league: 'FBES', statusDescription: '14º Lugar (0 pts)' },
  { rank: 15, schoolId: 'filhos_do_deserto', schoolName: 'Filhos do Deserto', league: 'FBES', statusDescription: '15º Lugar (0 pts)' }
];

/**
 * Resultados específicos do Carnaval de 1938:
 * Não houve apuração oficial em função do forte temporal e chuvas durante os desfiles na Praça Onze.
 * 37 agremiações participaram do evento. Nenhum ponto atribuído por ausência de julgamento oficial.
 */
export const CARNAVAL_1938_OFICIAL: LiesaStandingRecord[] = [
  { rank: 0, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'baianinhas_brasileiras', schoolName: 'Baianinhas Brasileiras', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'cada_ano_sai_melhor', schoolName: 'Cada Ano Sai Melhor', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'coracoes_unidos_jacarepagua', schoolName: 'Corações Unidos de Jacarepaguá', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'deixa_malhar', schoolName: 'Deixa Malhar', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'depois_eu_digo', schoolName: 'Depois Eu Digo', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'filhos_do_deserto', schoolName: 'Filhos do Deserto', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'fiquei_firme', schoolName: 'Fiquei Firme', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'lira_do_amor', schoolName: 'Lira do Amor', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'mocidade_louca_sao_cristovao', schoolName: 'Mocidade Louca de São Cristóvão', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'mocidade_unidos_do_riachuelo', schoolName: 'Modelo Unidos do Riachuelo', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'na_hora_e_que_se_ve', schoolName: 'Na Hora é Que Se Vê', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'nao_e_o_que_dizem', schoolName: 'Não é o Que Dizem', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'papagaio_linguarudo', schoolName: 'Papagaio Linguarudo', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'paraiso_de_campo_grande', schoolName: 'Paraíso de Campo Grande', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'paraiso_do_grotao', schoolName: 'Paraíso do Grotão', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'portela', schoolName: 'Portela', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'prazer_da_serrinha', schoolName: 'Prazer da Serrinha', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'rainha_das_pretas', schoolName: 'Rainha das Pretas', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'recreio_de_ramos', schoolName: 'Recreio de Ramos', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'ultima_hora', schoolName: 'Última Hora', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'uniao_barao_da_gamboa', schoolName: 'União Barão da Gamboa', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'uniao_da_mocidade', schoolName: 'União da Mocidade', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'uniao_de_madureira', schoolName: 'União de Madureira', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'uniao_de_sampaio', schoolName: 'União de Sampaio', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'uniao_de_colegio', schoolName: 'União do Colégio', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'uniao_entre_nos', schoolName: 'União Entre Nós', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'uniao_parada_de_lucas', schoolName: 'União Parada de Lucas', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'unidos_da_mangueira', schoolName: 'Unidos da Mangueira', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'unidos_de_cavalcante', schoolName: 'Unidos de Cavalcante', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'unidos_do_salgueiro', schoolName: 'Unidos do Salgueiro', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'unidos_do_tuiuti', schoolName: 'Unidos do Tuiuti', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'vizinha_faladeira', schoolName: 'Vizinha Faladeira', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' }
];

/**
 * Resultados específicos do desfile competitivo do Carnaval de 1939:
 * Desfile oficial com 26 agremiações classificadas e 4 desclassificadas.
 * Portela consagrada campeã (+20 pts) e Estação Primeira de Mangueira vice-campeã (+15 pts).
 */
export const CARNAVAL_1939_OFICIAL: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'portela', schoolName: 'Portela', league: 'FBES', statusDescription: 'Campeã Oficial (+20 pts)' },
  { rank: 2, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', league: 'FBES', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
  { rank: 3, schoolId: 'unidos_do_tuiuti', schoolName: 'Unidos do Tuiuti', league: 'FBES', statusDescription: '3º Lugar (+12 pts)' },
  { rank: 4, schoolId: 'depois_eu_digo', schoolName: 'Depois Eu Digo', league: 'FBES', statusDescription: '4º Lugar (+10 pts)' },
  { rank: 5, schoolId: 'unidos_da_mangueira', schoolName: 'Unidos da Mangueira', league: 'FBES', statusDescription: '5º Lugar (+8 pts)' },
  { rank: 6, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', league: 'FBES', statusDescription: '6º Lugar (+6 pts)' },
  { rank: 7, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', league: 'FBES', statusDescription: '7º Lugar (+4 pts)' },
  { rank: 8, schoolId: 'uniao_de_sampaio', schoolName: 'União do Sampaio', league: 'FBES', statusDescription: '8º Lugar (+3 pts)' },
  { rank: 9, schoolId: 'deixa_malhar', schoolName: 'Deixa Malhar', league: 'FBES', statusDescription: '9º Lugar (+2 pts)' },
  { rank: 10, schoolId: 'uniao_parada_de_lucas', schoolName: 'União Parada de Lucas', league: 'FBES', statusDescription: '10º Lugar (+1 pt)' },
  { rank: 11, schoolId: 'fiquei_firme', schoolName: 'Fiquei Firme', league: 'FBES', statusDescription: '11º Lugar (0 pts)' },
  { rank: 12, schoolId: 'uniao_barao_da_gamboa', schoolName: 'União Barão da Gamboa', league: 'FBES', statusDescription: '12º Lugar (0 pts)' },
  { rank: 13, schoolId: 'lira_do_amor', schoolName: 'Lira do Amor', league: 'FBES', statusDescription: '13º Lugar (0 pts)' },
  { rank: 14, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', league: 'FBES', statusDescription: '14º Lugar (0 pts)' },
  { rank: 15, schoolId: 'unidos_do_salgueiro', schoolName: 'Unidos do Salgueiro', league: 'FBES', statusDescription: '15º Lugar (0 pts)' },
  { rank: 16, schoolId: 'prazer_da_serrinha', schoolName: 'Prazer da Serrinha', league: 'FBES', statusDescription: '16º Lugar (0 pts)' },
  { rank: 17, schoolId: 'uniao_da_mocidade', schoolName: 'União da Mocidade', league: 'FBES', statusDescription: '17º Lugar (0 pts)' },
  { rank: 18, schoolId: 'mocidade_louca_sao_cristovao', schoolName: 'Mocidade Louca de São Cristóvão', league: 'FBES', statusDescription: '18º Lugar (0 pts)' },
  { rank: 19, schoolId: 'filhos_do_deserto', schoolName: 'Filhos do Deserto', league: 'FBES', statusDescription: '19º Lugar (0 pts)' },
  { rank: 20, schoolId: 'unidos_de_rocha_miranda', schoolName: 'Unidos de Rocha Miranda', league: 'FBES', statusDescription: '20º Lugar (0 pts)' },
  { rank: 21, schoolId: 'recreio_de_ramos', schoolName: 'Recreio de Ramos', league: 'FBES', statusDescription: '21º Lugar (0 pts)' },
  { rank: 22, schoolId: 'rainha_das_pretas', schoolName: 'Rainha das Pretas', league: 'FBES', statusDescription: '22º Lugar (0 pts)' },
  { rank: 23, schoolId: 'nao_e_o_que_dizem', schoolName: 'Não É o Que Dizem', league: 'FBES', statusDescription: '23º Lugar (0 pts)' },
  { rank: 24, schoolId: 'cada_ano_sai_melhor', schoolName: 'Cada Ano Sai Melhor', league: 'FBES', statusDescription: '24º Lugar (0 pts)' },
  { rank: 25, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', league: 'FBES', statusDescription: '25º Lugar (0 pts)' },
  { rank: 26, schoolId: 'ultima_hora', schoolName: 'Última Hora', league: 'FBES', statusDescription: '26º Lugar (0 pts)' },
  // Desclassificadas (0 pts)
  { rank: 0, schoolId: 'papagaio_linguarudo', schoolName: 'Papagaio Linguarudo', isHorsConcours: true, league: 'FBES', statusDescription: 'Desclassificada (0 pts)' },
  { rank: 0, schoolId: 'uniao_de_madureira', schoolName: 'União de Madureira', isHorsConcours: true, league: 'FBES', statusDescription: 'Desclassificada (0 pts)' },
  { rank: 0, schoolId: 'vai_se_quiser', schoolName: 'Vai Se Quiser', isHorsConcours: true, league: 'FBES', statusDescription: 'Desclassificada (0 pts)' },
  { rank: 0, schoolId: 'vizinha_faladeira', schoolName: 'Vizinha Faladeira', isHorsConcours: true, league: 'FBES', statusDescription: 'Desclassificada (0 pts)' }
];

/**
 * Resultados específicos do desfile competitivo do Carnaval de 1940:
 * Desfile oficial unificado das Escolas de Samba com 23 agremiações participantes.
 * Estação Primeira de Mangueira consagrada campeã e Mocidade Louca de São Cristóvão vice-campeã.
 */
export const CARNAVAL_1940_OFICIAL: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', league: 'FBES', statusDescription: 'Campeã Oficial (+20 pts)' },
  { rank: 2, schoolId: 'mocidade_louca_sao_cristovao', schoolName: 'Mocidade Louca de São Cristóvão', league: 'FBES', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
  { rank: 3, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', league: 'FBES', statusDescription: '3º Lugar (+12 pts)' },
  { rank: 4, schoolId: 'uniao_de_sampaio', schoolName: 'União do Sampaio', league: 'FBES', statusDescription: '4º Lugar (+10 pts)' },
  { rank: 5, schoolId: 'portela', schoolName: 'Portela', league: 'FBES', statusDescription: '5º Lugar (+8 pts)' },
  { rank: 6, schoolId: 'deixa_malhar', schoolName: 'Deixa Malhar', league: 'FBES', statusDescription: '6º Lugar (+6 pts)' },
  { rank: 7, schoolId: 'cada_ano_sai_melhor', schoolName: 'Cada Ano Sai Melhor', league: 'FBES', statusDescription: '7º Lugar empatada (+4 pts)' },
  { rank: 7, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', league: 'FBES', statusDescription: '7º Lugar empatada (+4 pts)' },
  { rank: 7, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', league: 'FBES', statusDescription: '7º Lugar empatada (+4 pts)' },
  { rank: 8, schoolId: 'fiquei_firme', schoolName: 'Fiquei Firme', league: 'FBES', statusDescription: '8º Lugar (+3 pts)' },
  { rank: 9, schoolId: 'uniao_barao_da_gamboa', schoolName: 'União Barão da Gamboa', league: 'FBES', statusDescription: '9º Lugar (+2 pts)' },
  { rank: 10, schoolId: 'depois_eu_digo', schoolName: 'Depois Eu Digo', league: 'FBES', statusDescription: '10º Lugar (+1 pt)' },
  { rank: 11, schoolId: 'unidos_da_mangueira', schoolName: 'Unidos da Mangueira', league: 'FBES', statusDescription: '11º Lugar (0 pts)' },
  { rank: 12, schoolId: 'ultima_hora', schoolName: 'Última Hora', league: 'FBES', statusDescription: '12º Lugar (0 pts)' },
  { rank: 13, schoolId: 'unidos_do_salgueiro', schoolName: 'Unidos do Salgueiro', league: 'FBES', statusDescription: '13º Lugar empatada (0 pts)' },
  { rank: 13, schoolId: 'vai_se_quiser', schoolName: 'Vai Se Quiser', league: 'FBES', statusDescription: '13º Lugar empatada (0 pts)' },
  { rank: 14, schoolId: 'lira_do_amor', schoolName: 'Lira do Amor', league: 'FBES', statusDescription: '14º Lugar (0 pts)' },
  { rank: 15, schoolId: 'nao_e_o_que_dizem', schoolName: 'Não é o Que Dizem', league: 'FBES', statusDescription: '15º Lugar (0 pts)' },
  { rank: 16, schoolId: 'filhos_do_deserto', schoolName: 'Filhos do Deserto', league: 'FBES', statusDescription: '16º Lugar empatada (0 pts)' },
  { rank: 16, schoolId: 'unidos_do_tuiuti', schoolName: 'Unidos do Tuiuti', league: 'FBES', statusDescription: '16º Lugar empatada (0 pts)' },
  { rank: 17, schoolId: 'prazer_da_serrinha', schoolName: 'Prazer da Serrinha', league: 'FBES', statusDescription: '17º Lugar empatada (0 pts)' },
  { rank: 17, schoolId: 'uniao_de_colegio', schoolName: 'União de Colégio', league: 'FBES', statusDescription: '17º Lugar empatada (0 pts)' },
  { rank: 18, schoolId: 'coracoes_unidos_jacarepagua', schoolName: 'Corações Unidos de Jacarepaguá', league: 'FBES', statusDescription: '18º Lugar (0 pts)' }
];

export const CARNAVAL_1941_OFICIAL: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'portela', schoolName: 'Portela', league: 'FBES', statusDescription: 'Campeã Oficial (+20 pts)' },
  { rank: 2, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', league: 'FBES', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
  { rank: 3, schoolId: 'depois_eu_digo', schoolName: 'Depois Eu Digo', league: 'FBES', statusDescription: '3º Lugar (+12 pts)' },
  { rank: 4, schoolId: 'deixa_malhar', schoolName: 'Deixa Malhar', league: 'FBES', statusDescription: '4º Lugar (+10 pts)' },
  { rank: 5, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', league: 'FBES', statusDescription: '5º Lugar (+8 pts)' },
  { rank: 6, schoolId: 'unidos_do_salgueiro', schoolName: 'Unidos do Salgueiro', league: 'FBES', statusDescription: '6º Lugar (+6 pts)' },
  { rank: 7, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', league: 'FBES', statusDescription: '7º Lugar (+4 pts)' },
  { rank: 8, schoolId: 'lira_do_amor', schoolName: 'Lira do Amor', league: 'FBES', statusDescription: '8º Lugar (+3 pts)' },
  { rank: 9, schoolId: 'mocidade_louca_sao_cristovao', schoolName: 'Mocidade Louca de São Cristóvão', league: 'FBES', statusDescription: '9º Lugar (+2 pts)' },
  { rank: 10, schoolId: 'nao_e_o_que_dizem', schoolName: 'Não é o Que Dizem', league: 'FBES', statusDescription: '10º Lugar (+1 pt)' },
  { rank: 11, schoolId: 'fiquei_firme', schoolName: 'Fiquei Firme', league: 'FBES', statusDescription: '11º Lugar empatada (0 pts)' },
  { rank: 11, schoolId: 'prazer_da_serrinha', schoolName: 'Prazer da Serrinha', league: 'FBES', statusDescription: '11º Lugar empatada (0 pts)' },
  { rank: 12, schoolId: 'cada_ano_sai_melhor', schoolName: 'Cada Ano Sai Melhor', league: 'FBES', statusDescription: '12º Lugar (0 pts)' },
  { rank: 13, schoolId: 'unidos_do_tuiuti', schoolName: 'Unidos do Tuiuti', league: 'FBES', statusDescription: '13º Lugar (0 pts)' },
  { rank: 14, schoolId: 'uniao_de_sampaio', schoolName: 'União do Sampaio', league: 'FBES', statusDescription: '14º Lugar (0 pts)' },
  { rank: 15, schoolId: 'vai_se_quiser', schoolName: 'Vai Se Quiser', league: 'FBES', statusDescription: '15º Lugar (0 pts)' },
  { rank: 16, schoolId: 'filhos_do_deserto', schoolName: 'Filhos do Deserto', league: 'FBES', statusDescription: '16º Lugar (0 pts)' }
];

/**
 * Resultados específicos do desfile competitivo do Carnaval de 1942:
 * Desfile oficial unificado das Escolas de Samba com 23 agremiações participantes.
 * Portela bicampeã consecutiva e Depois Eu Digo vice-campeã.
 */
export const CARNAVAL_1942_OFICIAL: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'portela', schoolName: 'Portela', league: 'FBES', statusDescription: 'Campeã Oficial (+20 pts)' },
  { rank: 2, schoolId: 'depois_eu_digo', schoolName: 'Depois Eu Digo', league: 'FBES', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
  { rank: 3, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', league: 'FBES', statusDescription: '3º Lugar (+12 pts)' },
  { rank: 4, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', league: 'FBES', statusDescription: '4º Lugar (+10 pts)' },
  { rank: 5, schoolId: 'deixa_malhar', schoolName: 'Deixa Malhar', league: 'FBES', statusDescription: '5º Lugar (+8 pts)' },
  { rank: 6, schoolId: 'unidos_do_salgueiro', schoolName: 'Unidos do Salgueiro', league: 'FBES', statusDescription: '6º Lugar (+6 pts)' },
  { rank: 7, schoolId: 'papagaio_linguarudo', schoolName: 'Papagaio Linguarudo', league: 'FBES', statusDescription: '7º Lugar (+4 pts)' },
  { rank: 8, schoolId: 'cada_ano_sai_melhor', schoolName: 'Cada Ano Sai Melhor', league: 'FBES', statusDescription: '8º Lugar (+3 pts)' },
  { rank: 9, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', league: 'FBES', statusDescription: '9º Lugar (+2 pts)' },
  { rank: 10, schoolId: 'fiquei_firme', schoolName: 'Fiquei Firme', league: 'FBES', statusDescription: '10º Lugar (+1 pt)' },
  { rank: 11, schoolId: 'uniao_de_sampaio', schoolName: 'União do Sampaio', league: 'FBES', statusDescription: '11º Lugar (0 pts)' },
  { rank: 12, schoolId: 'unidos_do_tuiuti', schoolName: 'Unidos do Tuiuti', league: 'FBES', statusDescription: '12º Lugar (0 pts)' },
  { rank: 13, schoolId: 'nao_e_o_que_dizem', schoolName: 'Não é o Que Dizem', league: 'FBES', statusDescription: '13º Lugar (0 pts)' },
  { rank: 14, schoolId: 'mocidade_de_um_paraiso', schoolName: 'Mocidade de Um Paraíso', league: 'FBES', statusDescription: '14º Lugar (0 pts)' },
  { rank: 15, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', league: 'FBES', statusDescription: '15º Lugar (0 pts)' },
  { rank: 16, schoolId: 'prazer_da_serrinha', schoolName: 'Prazer da Serrinha', league: 'FBES', statusDescription: '16º Lugar (0 pts)' },
  { rank: 17, schoolId: 'mocidade_louca_sao_cristovao', schoolName: 'Mocidade Louca de São Cristóvão', league: 'FBES', statusDescription: '17º Lugar (0 pts)' },
  { rank: 18, schoolId: 'unidos_de_riachuelo', schoolName: 'Unidos de Riachuelo', league: 'FBES', statusDescription: '18º Lugar (0 pts)' },
  { rank: 19, schoolId: 'paraiso_de_anchieta', schoolName: 'Paraíso de Anchieta', league: 'FBES', statusDescription: '19º Lugar (0 pts)' },
  { rank: 20, schoolId: 'uniao_de_colegio', schoolName: 'União de Colégio', league: 'FBES', statusDescription: '20º Lugar (0 pts)' },
  { rank: 21, schoolId: 'paraiso_do_grotao', schoolName: 'Paraíso do Grotão', league: 'FBES', statusDescription: '21º Lugar (0 pts)' },
  { rank: 22, schoolId: 'flor_da_infancia_bras_de_pina', schoolName: 'Flor da Infância de Brás de Pina', league: 'FBES', statusDescription: '22º Lugar (0 pts)' },
  { rank: 23, schoolId: 'vai_se_quiser', schoolName: 'Vai Se Quiser', league: 'FBES', statusDescription: '23º Lugar (0 pts)' }
];

/**
 * Resultados específicos do desfile competitivo do Carnaval de 1943:
 * Vinte e duas agremiações participaram. Apenas as 5 primeiras foram classificadas pelo júri oficial.
 * Portela tricampeã consecutiva e Estação Primeira de Mangueira vice-campeã.
 */
export const CARNAVAL_1943_OFICIAL: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'portela', schoolName: 'Portela', league: 'FBES', statusDescription: 'Campeã Oficial (+20 pts)' },
  { rank: 2, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', league: 'FBES', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
  { rank: 3, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', league: 'FBES', statusDescription: '3º Lugar (+12 pts)' },
  { rank: 4, schoolId: 'deixa_malhar', schoolName: 'Deixa Malhar', league: 'FBES', statusDescription: '4º Lugar (+10 pts)' },
  { rank: 5, schoolId: 'coracoes_unidos_jacarepagua', schoolName: 'Corações Unidos de Jacarepaguá', league: 'FBES', statusDescription: '5º Lugar (+8 pts)' },
  // Agremiações participantes não classificadas (0 pts)
  { rank: 6, schoolId: 'cada_ano_sai_melhor', schoolName: 'Cada Ano Sai Melhor', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou (Não classificada • 0 pts)' },
  { rank: 6, schoolId: 'depois_eu_digo', schoolName: 'Depois Eu Digo', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou (Não classificada • 0 pts)' },
  { rank: 6, schoolId: 'fiquei_firme', schoolName: 'Fiquei Firme', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou (Não classificada • 0 pts)' },
  { rank: 6, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou (Não classificada • 0 pts)' },
  { rank: 6, schoolId: 'lira_do_amor', schoolName: 'Lira do Amor', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou (Não classificada • 0 pts)' },
  { rank: 6, schoolId: 'mocidade_louca_sao_cristovao', schoolName: 'Mocidade Louca de São Cristóvão', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou (Não classificada • 0 pts)' },
  { rank: 6, schoolId: 'nao_e_o_que_dizem', schoolName: 'Não É o Que Dizem', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou (Não classificada • 0 pts)' },
  { rank: 6, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou (Não classificada • 0 pts)' },
  { rank: 6, schoolId: 'prazer_da_serrinha', schoolName: 'Prazer da Serrinha', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou (Não classificada • 0 pts)' },
  { rank: 6, schoolId: 'uniao_de_sampaio', schoolName: 'União do Sampaio', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou (Não classificada • 0 pts)' },
  { rank: 6, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou (Não classificada • 0 pts)' },
  { rank: 6, schoolId: 'unidos_do_salgueiro', schoolName: 'Unidos do Salgueiro', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou (Não classificada • 0 pts)' },
  { rank: 6, schoolId: 'unidos_do_tuiuti', schoolName: 'Unidos do Tuiuti', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou (Não classificada • 0 pts)' },
  { rank: 6, schoolId: 'vai_se_quiser', schoolName: 'Vai Se Quiser', isHorsConcours: true, league: 'FBES', statusDescription: 'Desfilou (Não classificada • 0 pts)' }
];

/**
 * Resultados específicos do desfile competitivo do Carnaval de 1944:
 * Nove escolas desfilaram no Carnaval Carioca; apenas campeã e vice oficializadas no julgamento.
 * Portela tetracampeã consecutiva e Estação Primeira de Mangueira vice-campeã.
 */
export const CARNAVAL_1944_OFICIAL: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'portela', schoolName: 'Portela', league: 'FBES', statusDescription: 'Campeã Oficial (+20 pts)' },
  { rank: 2, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', league: 'FBES', statusDescription: 'Vice-Campeã Oficial (+15 pts)' }
];

/**
 * Resultados específicos do desfile competitivo do Carnaval de 1945:
 * Oito escolas desfilaram no Carnaval Carioca; apenas campeã e vice oficializadas no julgamento.
 * Portela pentacampeã consecutiva e Estação Primeira de Mangueira vice-campeã.
 */
export const CARNAVAL_1945_OFICIAL: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'portela', schoolName: 'Portela', league: 'FBES', statusDescription: 'Campeã Oficial (+20 pts)' },
  { rank: 2, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', league: 'FBES', statusDescription: 'Vice-Campeã Oficial (+15 pts)' }
];

/**
 * Resultados específicos do desfile competitivo do Carnaval de 1946:
 * Desfile oficial unificado das Escolas de Samba com 19 agremiações participantes.
 * Portela consagrada campeã e Estação Primeira de Mangueira vice-campeã.
 */
export const CARNAVAL_1946_OFICIAL: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'portela', schoolName: 'Portela', league: 'FBES', statusDescription: 'Campeã Oficial (+20 pts)' },
  { rank: 2, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', league: 'FBES', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
  { rank: 3, schoolId: 'depois_eu_digo', schoolName: 'Depois Eu Digo', league: 'FBES', statusDescription: '3º Lugar (+12 pts)' },
  { rank: 4, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', league: 'FBES', statusDescription: '4º Lugar (+10 pts)' },
  { rank: 5, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', league: 'FBES', statusDescription: '5º Lugar (+8 pts)' },
  { rank: 6, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', league: 'FBES', statusDescription: '6º Lugar (+6 pts)' },
  { rank: 7, schoolId: 'lira_do_amor', schoolName: 'Lira do Amor', league: 'FBES', statusDescription: '7º Lugar (+4 pts)' },
  { rank: 8, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', league: 'FBES', statusDescription: '8º Lugar (+3 pts)' },
  { rank: 9, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', league: 'FBES', statusDescription: '9º Lugar (+2 pts)' },
  { rank: 10, schoolId: 'filhos_do_deserto', schoolName: 'Filhos do Deserto', league: 'FBES', statusDescription: '10º Lugar (+1 pt)' },
  { rank: 11, schoolId: 'prazer_da_serrinha', schoolName: 'Prazer da Serrinha', league: 'FBES', statusDescription: '11º Lugar (0 pts)' },
  { rank: 12, schoolId: 'unidos_do_salgueiro', schoolName: 'Unidos do Salgueiro', league: 'FBES', statusDescription: '12º Lugar (0 pts)' },
  { rank: 13, schoolId: 'coracoes_unidos_jacarepagua', schoolName: 'Corações Unidos de Jacarepaguá', league: 'FBES', statusDescription: '13º Lugar (0 pts)' },
  { rank: 14, schoolId: 'nao_e_o_que_dizem', schoolName: 'Não é o Que Dizem', league: 'FBES', statusDescription: '14º Lugar (0 pts)' },
  { rank: 15, schoolId: 'vai_se_quiser', schoolName: 'Vai Se Quiser', league: 'FBES', statusDescription: '15º Lugar (0 pts)' },
  { rank: 16, schoolId: 'cada_ano_sai_melhor', schoolName: 'Cada Ano Sai Melhor', league: 'FBES', statusDescription: '16º Lugar (0 pts)' },
  { rank: 17, schoolId: 'uniao_primeira', schoolName: 'União Primeira', league: 'FBES', statusDescription: '17º Lugar (0 pts)' },
  { rank: 18, schoolId: 'fiquei_firme', schoolName: 'Fiquei Firme', league: 'FBES', statusDescription: '18º Lugar (0 pts)' },
  { rank: 19, schoolId: 'mocidade_louca_sao_cristovao', schoolName: 'Mocidade Louca de São Cristóvão', league: 'FBES', statusDescription: '19º Lugar (0 pts)' }
];

/**
 * Resultados específicos do desfile competitivo do Carnaval de 1947:
 * Desfile oficial unificado das Escolas de Samba com 26 agremiações participantes.
 * Portela consagrada campeã e Estação Primeira de Mangueira vice-campeã.
 */
export const CARNAVAL_1947_OFICIAL: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'portela', schoolName: 'Portela', league: 'FBES', statusDescription: 'Campeã Oficial (+20 pts)' },
  { rank: 2, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', league: 'FBES', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
  { rank: 3, schoolId: 'depois_eu_digo', schoolName: 'Depois Eu Digo', league: 'FBES', statusDescription: '3º Lugar (+12 pts)' },
  { rank: 4, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', league: 'FBES', statusDescription: '4º Lugar (+10 pts)' },
  { rank: 5, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', league: 'FBES', statusDescription: '5º Lugar (+8 pts)' },
  { rank: 6, schoolId: 'lira_do_amor', schoolName: 'Lira do Amor', league: 'FBES', statusDescription: '6º Lugar empatada (+6 pts)' },
  { rank: 6, schoolId: 'prazer_da_serrinha', schoolName: 'Prazer da Serrinha', league: 'FBES', statusDescription: '6º Lugar empatada (+6 pts)' },
  { rank: 7, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', league: 'FBES', statusDescription: '7º Lugar (+4 pts)' },
  { rank: 8, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', league: 'FBES', statusDescription: '8º Lugar (+3 pts)' },
  { rank: 9, schoolId: 'paraiso_das_morenas', schoolName: 'Paraíso das Morenas', league: 'FBES', statusDescription: '9º Lugar (+2 pts)' },
  { rank: 10, schoolId: 'filhos_do_deserto', schoolName: 'Filhos do Deserto', league: 'FBES', statusDescription: '10º Lugar (+1 pt)' },
  { rank: 11, schoolId: 'cada_ano_sai_melhor', schoolName: 'Cada Ano Sai Melhor', league: 'FBES', statusDescription: '11º Lugar (0 pts)' },
  { rank: 12, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', league: 'FBES', statusDescription: '12º Lugar (0 pts)' },
  { rank: 13, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', league: 'FBES', statusDescription: '13º Lugar (0 pts)' },
  { rank: 14, schoolId: 'unidos_do_salgueiro', schoolName: 'Unidos do Salgueiro', league: 'FBES', statusDescription: '14º Lugar (0 pts)' },
  { rank: 15, schoolId: 'recreio_de_inhauma', schoolName: 'Recreio de Inhaúma', league: 'FBES', statusDescription: '15º Lugar (0 pts)' },
  { rank: 16, schoolId: 'unidos_do_catete', schoolName: 'Unidos do Catete (Catete Velho)', league: 'FBES', statusDescription: '16º Lugar (0 pts)' },
  { rank: 17, schoolId: 'recreio_de_sao_carlos', schoolName: 'Recreio de São Carlos', league: 'FBES', statusDescription: '17º Lugar (0 pts)' },
  { rank: 18, schoolId: 'paraiso_do_grotao', schoolName: 'Paraíso do Grotão', league: 'FBES', statusDescription: '18º Lugar (0 pts)' },
  { rank: 19, schoolId: 'escalao_de_tupa', schoolName: 'Escalão de Tupã', league: 'FBES', statusDescription: '19º Lugar (0 pts)' },
  { rank: 20, schoolId: 'flor_do_lins', schoolName: 'Flor do Lins', league: 'FBES', statusDescription: '20º Lugar (0 pts)' },
  { rank: 21, schoolId: 'unidos_de_terra_nova', schoolName: 'Unidos de Terra Nova', league: 'FBES', statusDescription: '21º Lugar (0 pts)' },
  { rank: 22, schoolId: 'cenaculo_do_samba', schoolName: 'Cenáculo do Samba', league: 'FBES', statusDescription: '22º Lugar (0 pts)' },
  { rank: 23, schoolId: 'unidos_do_morro_azul', schoolName: 'Unidos do Morro Azul', league: 'FBES', statusDescription: '23º Lugar (0 pts)' },
  { rank: 24, schoolId: 'fiquei_firme', schoolName: 'Fiquei Firme', league: 'FBES', statusDescription: '24º Lugar (0 pts)' },
  { rank: 25, schoolId: 'aprendizes_de_copacabana', schoolName: 'Aprendizes de Copacabana', league: 'FBES', statusDescription: '25º Lugar (0 pts)' },
  { rank: 26, schoolId: 'academicos_da_gavea', schoolName: 'Acadêmicos da Gávea', league: 'FBES', statusDescription: '26º Lugar (0 pts)' }
];

/**
 * Resultados específicos do desfile competitivo do Carnaval de 1948:
 * Organizado de forma unificada pela Federação Brasileira de Escolas de Samba (FBES).
 */
export const CARNAVAL_1948_FBES: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', subgroup: 'fbes', league: 'FBES', statusDescription: 'Campeã FBES (+20 pts)' },
  { rank: 2, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', subgroup: 'fbes', league: 'FBES', statusDescription: 'Vice-Campeã FBES (+15 pts)' },
  { rank: 3, schoolId: 'portela', schoolName: 'Portela', subgroup: 'fbes', league: 'FBES', statusDescription: '3º Lugar FBES (+12 pts)' },
  { rank: 4, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', subgroup: 'fbes', league: 'FBES', statusDescription: '4º Lugar FBES (+10 pts)' },
  { rank: 5, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', subgroup: 'fbes', league: 'FBES', statusDescription: '5º Lugar FBES (+8 pts)' },
  { rank: 6, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', subgroup: 'fbes', league: 'FBES', statusDescription: '6º Lugar FBES (+6 pts)' },
  { rank: 7, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', subgroup: 'fbes', league: 'FBES', statusDescription: '7º Lugar FBES (+4 pts)' },
  { rank: 8, schoolId: 'prazer_da_serrinha', schoolName: 'Prazer da Serrinha', subgroup: 'fbes', league: 'FBES', statusDescription: '8º Lugar FBES (+3 pts)' },
  { rank: 9, schoolId: 'unidos_de_turiacu', schoolName: 'Unidos de Turiaçu', subgroup: 'fbes', league: 'FBES', statusDescription: '9º Lugar FBES (+2 pts)' },
  { rank: 10, schoolId: 'depois_eu_digo', schoolName: 'Depois Eu Digo', subgroup: 'fbes', league: 'FBES', statusDescription: '10º Lugar FBES (+1 pt)' },
  { rank: 11, schoolId: 'independentes_cordovil', schoolName: 'Independentes do Leblon (Independentes de Cordovil)', subgroup: 'fbes', league: 'FBES', statusDescription: '11º Lugar FBES (0 pts)' },
  { rank: 12, schoolId: 'recreio_de_inhauma', schoolName: 'Recreio de Inhaúma', subgroup: 'fbes', league: 'FBES', statusDescription: '12º Lugar FBES (0 pts)' },
  { rank: 13, schoolId: 'aprendizes_de_lucas', schoolName: 'Aprendizes de Lucas', subgroup: 'fbes', league: 'FBES', statusDescription: '13º Lugar FBES (0 pts)' },
  { rank: 14, schoolId: 'paraiso_das_morenas', schoolName: 'Paraíso das Morenas', subgroup: 'fbes', league: 'FBES', statusDescription: '14º Lugar FBES (0 pts)' },
  { rank: 15, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', subgroup: 'fbes', league: 'FBES', statusDescription: '15º Lugar FBES (0 pts)' },
  { rank: 16, schoolId: 'irmaos_unidos_do_catete', schoolName: 'Irmãos Unidos do Catete', subgroup: 'fbes', league: 'FBES', statusDescription: '16º Lugar FBES (0 pts)' },
  { rank: 17, schoolId: 'vai_se_quiser', schoolName: 'Vai Se Quiser', subgroup: 'fbes', league: 'FBES', statusDescription: '17º Lugar FBES (0 pts)' },
  { rank: 18, schoolId: 'unidos_de_santo_amaro', schoolName: 'Unidos de Santo Amaro', subgroup: 'fbes', league: 'FBES', statusDescription: '18º Lugar FBES (0 pts)' },
  { rank: 19, schoolId: 'estrela_de_ouro', schoolName: 'Estrela de Ouro', subgroup: 'fbes', league: 'FBES', statusDescription: '19º Lugar FBES (0 pts)' },
  { rank: 20, schoolId: 'cada_ano_sai_melhor', schoolName: 'Cada Ano Sai Melhor', subgroup: 'fbes', league: 'FBES', statusDescription: '20º Lugar FBES (0 pts)' },
  { rank: 21, schoolId: 'unidos_do_salgueiro', schoolName: 'Unidos do Salgueiro', subgroup: 'fbes', league: 'FBES', statusDescription: '21º Lugar FBES (0 pts)' },
  { rank: 22, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', subgroup: 'fbes', league: 'FBES', statusDescription: '22º Lugar FBES (0 pts)' },
  { rank: 23, schoolId: 'coracoes_unidos_da_favela', schoolName: 'Corações Unidos da Favela', subgroup: 'fbes', league: 'FBES', statusDescription: '23º Lugar FBES (0 pts)' },
  { rank: 24, schoolId: 'sem_voce_vivo_bem', schoolName: 'Sem Você Vivo Bem', subgroup: 'fbes', league: 'FBES', statusDescription: '24º Lugar FBES (0 pts)' },
  { rank: 25, schoolId: 'unidos_de_bras_de_pina', schoolName: 'Unidos de Brás de Pina', subgroup: 'fbes', league: 'FBES', statusDescription: '25º Lugar FBES (0 pts)' },
  { rank: 26, schoolId: 'unidos_de_cavalcante', schoolName: 'Unidos de Cavalcante', subgroup: 'fbes', league: 'FBES', statusDescription: '26º Lugar FBES (0 pts)' },
  { rank: 27, schoolId: 'unidos_de_tomas_coelho', schoolName: 'Unidos de Tomás Coelho', subgroup: 'fbes', league: 'FBES', statusDescription: '27º Lugar FBES (0 pts)' },
  { rank: 28, schoolId: 'mocidade_de_cachambi', schoolName: 'Mocidade de Cachambi', subgroup: 'fbes', league: 'FBES', statusDescription: '28º Lugar FBES empatada (0 pts)' },
  { rank: 28, schoolId: 'unidos_do_morro_azul', schoolName: 'Unidos do Morro Azul', subgroup: 'fbes', league: 'FBES', statusDescription: '28º Lugar FBES empatada (0 pts)' },
  { rank: 29, schoolId: 'unidos_do_outeiro', schoolName: 'Unidos do Outeiro', subgroup: 'fbes', league: 'FBES', statusDescription: '29º Lugar FBES (0 pts)' },
  { rank: 30, schoolId: 'imperio_da_colina', schoolName: 'Império da Colina', subgroup: 'fbes', league: 'FBES', statusDescription: '30º Lugar FBES (0 pts)' },
  { rank: 31, schoolId: 'paraiso_do_grotao', schoolName: 'Paraíso do Grotão', subgroup: 'fbes', league: 'FBES', statusDescription: '31º Lugar FBES (0 pts)' },
  { rank: 32, schoolId: 'mocidade_de_um_paraiso', schoolName: 'Mocidade de Um Paraíso', subgroup: 'fbes', league: 'FBES', statusDescription: '32º Lugar FBES (0 pts)' },
  { rank: 33, schoolId: 'inimigos_da_tristeza', schoolName: 'Inimigos da Tristeza', subgroup: 'fbes', league: 'FBES', statusDescription: '33º Lugar FBES (0 pts)' },
  { rank: 34, schoolId: 'uniao_vaz_lobo', schoolName: 'União de Vaz Lobo', subgroup: 'fbes', league: 'FBES', statusDescription: '34º Lugar FBES empatada (0 pts)' },
  { rank: 34, schoolId: 'unidos_do_castelo', schoolName: 'Unidos do Castelo', subgroup: 'fbes', league: 'FBES', statusDescription: '34º Lugar FBES empatada (0 pts)' },
  { rank: 35, schoolId: 'unidos_da_lagoa', schoolName: 'Unidos da Lagoa', subgroup: 'fbes', league: 'FBES', statusDescription: '35º Lugar FBES (0 pts)' }
];

/**
 * Resultados específicos dos desfiles competitivos do Carnaval de 1949:
 * FBES (Federação Brasileira de Escolas de Samba) e UGESB (União Geral das Escolas de Samba do Brasil).
 */
export const CARNAVAL_1949_FBES: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', subgroup: 'fbes', league: 'FBES', statusDescription: 'Campeã FBES (+20 pts)' },
  { rank: 2, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', subgroup: 'fbes', league: 'FBES', statusDescription: 'Vice-Campeã FBES (+15 pts)' },
  { rank: 3, schoolId: 'unidos_do_salgueiro', schoolName: 'Unidos do Salgueiro', subgroup: 'fbes', league: 'FBES', statusDescription: '3º Lugar FBES (+12 pts)' },
  { rank: 4, schoolId: 'floresta_do_andarai', schoolName: 'Floresta do Andaraí', subgroup: 'fbes', league: 'FBES', statusDescription: '4º Lugar FBES (+10 pts)' },
  { rank: 5, schoolId: 'unidos_do_outeiro', schoolName: 'Unidos do Outeiro', subgroup: 'fbes', league: 'FBES', statusDescription: '5º Lugar FBES (+8 pts)' },
  { rank: 6, schoolId: 'recreio_de_sao_carlos', schoolName: 'Recreio de São Carlos', subgroup: 'fbes', league: 'FBES', statusDescription: '6º Lugar FBES (+6 pts)' },
  { rank: 7, schoolId: 'aprendizes_de_lucas', schoolName: 'Aprendizes de Lucas', subgroup: 'fbes', league: 'FBES', statusDescription: '7º Lugar FBES (+4 pts)' },
  { rank: 8, schoolId: 'independentes_cordovil', schoolName: 'Independentes do Leblon (Independentes de Cordovil)', subgroup: 'fbes', league: 'FBES', statusDescription: '8º Lugar FBES (+3 pts)' },
  { rank: 9, schoolId: 'filhos_do_deserto', schoolName: 'Filhos do Deserto', subgroup: 'fbes', league: 'FBES', statusDescription: '9º Lugar FBES (+2 pts)' },
  { rank: 10, schoolId: 'irmaos_unidos_do_catete', schoolName: 'Irmãos Unidos do Catete', subgroup: 'fbes', league: 'FBES', statusDescription: '10º Lugar FBES (+1 pt)' },
  { rank: 11, schoolId: 'unidos_de_santo_amaro', schoolName: 'Unidos de Santo Amaro', subgroup: 'fbes', league: 'FBES', statusDescription: '11º Lugar FBES (0 pts)' },
  { rank: 12, schoolId: 'indios_do_acau', schoolName: 'Índios do Acaú', subgroup: 'fbes', league: 'FBES', statusDescription: '12º Lugar FBES (0 pts)' },
  { rank: 13, schoolId: 'vitoria_de_bento_ribeiro', schoolName: 'Vitória de Bento Ribeiro', subgroup: 'fbes', league: 'FBES', statusDescription: '13º Lugar FBES (0 pts)' },
  { rank: 14, schoolId: 'flor_do_lins', schoolName: 'Flor do Lins', subgroup: 'fbes', league: 'FBES', statusDescription: '14º Lugar FBES (0 pts)' },
  { rank: 15, schoolId: 'manda_quem_pode', schoolName: 'Manda Quem Pode', subgroup: 'fbes', league: 'FBES', statusDescription: '15º Lugar FBES (0 pts)' },
  { rank: 16, schoolId: 'paraiso_das_morenas', schoolName: 'Paraíso das Morenas', subgroup: 'fbes', league: 'FBES', statusDescription: '16º Lugar FBES (0 pts)' },
  { rank: 17, schoolId: 'uniao_de_bras_de_pina', schoolName: 'União de Brás de Pina', subgroup: 'fbes', league: 'FBES', statusDescription: '17º Lugar FBES (0 pts)' },
  { rank: 18, schoolId: 'unidos_de_campo_grande', schoolName: 'Unidos de Campo Grande', subgroup: 'fbes', league: 'FBES', statusDescription: '18º Lugar FBES (0 pts)' },
  { rank: 19, schoolId: 'imperio_da_colina', schoolName: 'Império da Colina', subgroup: 'fbes', league: 'FBES', statusDescription: '19º Lugar FBES (0 pts)' },
  { rank: 20, schoolId: 'azul_e_branco_de_bonsucesso', schoolName: 'Azul e Branco de Bonsucesso', subgroup: 'fbes', league: 'FBES', statusDescription: '20º Lugar FBES (0 pts)' },
  { rank: 21, schoolId: 'uniao_primeira', schoolName: 'União Primeira', subgroup: 'fbes', league: 'FBES', statusDescription: '21º Lugar FBES (0 pts)' },
  { rank: 22, schoolId: 'boemios_do_andarai', schoolName: 'Boêmios do Andaraí', subgroup: 'fbes', league: 'FBES', statusDescription: '22º Lugar FBES empatada (0 pts)' },
  { rank: 22, schoolId: 'coracoes_unidos_da_favela', schoolName: 'Corações Unidos da Favela', subgroup: 'fbes', league: 'FBES', statusDescription: '22º Lugar FBES empatada (0 pts)' },
  { rank: 22, schoolId: 'orgulho_de_cordovil', schoolName: 'Orgulho de Cordovil', subgroup: 'fbes', league: 'FBES', statusDescription: '22º Lugar FBES empatada (0 pts)' },
  { rank: 23, schoolId: 'uniao_dos_casados', schoolName: 'União dos Casados', subgroup: 'fbes', league: 'FBES', statusDescription: '23º Lugar FBES (0 pts)' },
  { rank: 24, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', subgroup: 'fbes', league: 'FBES', statusDescription: '24º Lugar FBES (0 pts)' },
  { rank: 25, schoolId: 'imperio_do_andarai', schoolName: 'Império do Andaraí', subgroup: 'fbes', league: 'FBES', statusDescription: '25º Lugar FBES (0 pts)' },
  { rank: 26, schoolId: 'unidos_da_lagoa', schoolName: 'Unidos da Lagoa', subgroup: 'fbes', league: 'FBES', statusDescription: '26º Lugar FBES (0 pts)' }
];

export const CARNAVAL_1949_UGESB: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', subgroup: 'ugesb', league: 'UGESB', statusDescription: 'Campeã UGESB (+20 pts)' },
  { rank: 2, schoolId: 'portela', schoolName: 'Portela', subgroup: 'ugesb', league: 'UGESB', statusDescription: 'Vice-Campeã UGESB (+15 pts)' },
  { rank: 3, schoolId: 'depois_eu_digo', schoolName: 'Depois Eu Digo', subgroup: 'ugesb', league: 'UGESB', statusDescription: '3º Lugar UGESB (+12 pts)' },
  { rank: 4, schoolId: 'prazer_da_serrinha', schoolName: 'Prazer da Serrinha', subgroup: 'ugesb', league: 'UGESB', statusDescription: '4º Lugar UGESB (+10 pts)' },
  { rank: 5, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', subgroup: 'ugesb', league: 'UGESB', statusDescription: '5º Lugar UGESB (+8 pts)' },
  { rank: 6, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', subgroup: 'ugesb', league: 'UGESB', statusDescription: '6º Lugar UGESB (+6 pts)' },
  { rank: 7, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', subgroup: 'ugesb', league: 'UGESB', statusDescription: '7º Lugar UGESB (+4 pts)' },
  { rank: 8, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', subgroup: 'ugesb', league: 'UGESB', statusDescription: '8º Lugar UGESB (+3 pts)' },
  { rank: 9, schoolId: 'baianinhas_brasileiras', schoolName: 'Baianinhas Brasileiras', subgroup: 'ugesb', league: 'UGESB', statusDescription: '9º Lugar UGESB (+2 pts)' },
  { rank: 10, schoolId: 'unidos_de_turiacu', schoolName: 'Unidos de Turiaçu', subgroup: 'ugesb', league: 'UGESB', statusDescription: '10º Lugar UGESB (+1 pt)' },
  { rank: 11, schoolId: 'coracoes_unidos_jacarepagua', schoolName: 'Corações Unidos de Jacarepaguá', subgroup: 'ugesb', league: 'UGESB', statusDescription: '11º Lugar UGESB (0 pts)' },
  { rank: 12, schoolId: 'vai_se_quiser', schoolName: 'Vai Se Quiser', subgroup: 'ugesb', league: 'UGESB', statusDescription: '12º Lugar UGESB (0 pts)' },
  { rank: 13, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', subgroup: 'ugesb', league: 'UGESB', statusDescription: '13º Lugar UGESB (0 pts)' },
  { rank: 14, schoolId: 'em_cima_da_hora_catumbi', schoolName: 'Em Cima da Hora do Catumbi', subgroup: 'ugesb', league: 'UGESB', statusDescription: '14º Lugar UGESB (0 pts)' },
  { rank: 15, schoolId: 'unidos_de_tomas_coelho', schoolName: 'Unidos de Tomás Coelho', subgroup: 'ugesb', league: 'UGESB', statusDescription: '15º Lugar UGESB (0 pts)' },
  { rank: 16, schoolId: 'recreio_de_inhauma', schoolName: 'Recreio de Inhaúma', subgroup: 'ugesb', league: 'UGESB', statusDescription: '16º Lugar UGESB (0 pts)' },
  { rank: 17, schoolId: 'unidos_do_morro_azul', schoolName: 'Unidos do Morro Azul', subgroup: 'ugesb', league: 'UGESB', statusDescription: '17º Lugar UGESB (0 pts)' },
  { rank: 18, schoolId: 'paraiso_das_morenas', schoolName: 'Paraíso das Morenas', subgroup: 'ugesb', league: 'UGESB', statusDescription: '18º Lugar UGESB (0 pts)' },
  { rank: 19, schoolId: 'uniao_do_realengo', schoolName: 'União do Realengo', subgroup: 'ugesb', league: 'UGESB', statusDescription: '19º Lugar UGESB (0 pts)' },
  { rank: 20, schoolId: 'unidos_do_iraja', schoolName: 'Unidos do Irajá', subgroup: 'ugesb', league: 'UGESB', statusDescription: '20º Lugar UGESB (0 pts)' },
  { rank: 21, schoolId: 'imperio_de_campo_grande', schoolName: 'Império de Campo Grande', subgroup: 'ugesb', league: 'UGESB', statusDescription: '21º Lugar UGESB (0 pts)' },
  { rank: 22, schoolId: 'nao_e_o_que_dizem', schoolName: 'Não É O Que Dizem', subgroup: 'ugesb', league: 'UGESB', statusDescription: '22º Lugar UGESB (0 pts)' },
  { rank: 23, schoolId: 'unidos_de_terra_nova', schoolName: 'Unidos de Terra Nova', subgroup: 'ugesb', league: 'UGESB', statusDescription: '23º Lugar UGESB (0 pts)' },
  { rank: 24, schoolId: 'fiquei_firme', schoolName: 'Fiquei Firme', subgroup: 'ugesb', league: 'UGESB', statusDescription: '24º Lugar UGESB (0 pts)' },
  { rank: 25, schoolId: 'coracao_das_morenas', schoolName: 'Coração das Morenas', subgroup: 'ugesb', league: 'UGESB', statusDescription: '25º Lugar UGESB (0 pts)' }
];

/**
 * Resultados específicos dos desfiles competitivos do Carnaval de 1950:
 * FBES (Federação Brasileira de Escolas de Samba), UCES (União Cívica das Escolas de Samba) e UGESB (União Geral das Escolas de Samba do Brasil).
 */
export const CARNAVAL_1950_FBES: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', subgroup: 'fbes', league: 'FBES', statusDescription: 'Campeã FBES (+20 pts)' },
  { rank: 2, schoolId: 'aprendizes_de_lucas', schoolName: 'Aprendizes de Lucas', subgroup: 'fbes', league: 'FBES', statusDescription: 'Vice-Campeã FBES (+15 pts)' },
  { rank: 3, schoolId: 'irmaos_unidos_do_catete', schoolName: 'Irmãos Unidos do Catete', subgroup: 'fbes', league: 'FBES', statusDescription: '3º Lugar FBES (+12 pts)' },
  { rank: 4, schoolId: 'floresta_do_andarai', schoolName: 'Floresta do Andaraí', subgroup: 'fbes', league: 'FBES', statusDescription: '4º Lugar FBES (+10 pts)' },
  { rank: 5, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', subgroup: 'fbes', league: 'FBES', statusDescription: '5º Lugar FBES (+8 pts)' },
  { rank: 6, schoolId: 'indios_do_acau', schoolName: 'Índios do Acaú', subgroup: 'fbes', league: 'FBES', statusDescription: '6º Lugar FBES (+6 pts)' },
  { rank: 7, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', subgroup: 'fbes', league: 'FBES', statusDescription: '7º Lugar FBES (+4 pts)' },
  { rank: 8, schoolId: 'independentes_cordovil', schoolName: 'Independentes do Leblon (Independentes de Cordovil)', subgroup: 'fbes', league: 'FBES', statusDescription: '8º Lugar FBES (+3 pts)' },
  { rank: 9, schoolId: 'unidos_do_engenho_velho', schoolName: 'Unidos do Engenho Velho', subgroup: 'fbes', league: 'FBES', statusDescription: '9º Lugar FBES (+2 pts)' },
  { rank: 10, schoolId: 'mocidade_de_um_paraiso', schoolName: 'Mocidade de Um Paraíso', subgroup: 'fbes', league: 'FBES', statusDescription: '10º Lugar FBES (+1 pt)' },
  { rank: 11, schoolId: 'capricho_do_centenario', schoolName: 'Capricho do Centenário', subgroup: 'fbes', league: 'FBES', statusDescription: '11º Lugar FBES (0 pts)' },
  { rank: 12, schoolId: 'estrela_de_ouro', schoolName: 'Estrela de Ouro', subgroup: 'fbes', league: 'FBES', statusDescription: '12º Lugar FBES (0 pts)' },
  { rank: 13, schoolId: 'independentes_do_rio', schoolName: 'Independentes do Rio', subgroup: 'fbes', league: 'FBES', statusDescription: '13º Lugar FBES (0 pts)' },
  { rank: 14, schoolId: 'paraiso_da_mocidade', schoolName: 'Paraíso da Mocidade', subgroup: 'fbes', league: 'FBES', statusDescription: '14º Lugar FBES (0 pts)' },
  { rank: 15, schoolId: 'uniao_vaz_lobo', schoolName: 'União de Vaz Lobo', subgroup: 'fbes', league: 'FBES', statusDescription: '15º Lugar FBES (0 pts)' },
  { rank: 16, schoolId: 'unidos_de_santo_amaro', schoolName: 'Unidos de Santo Amaro', subgroup: 'fbes', league: 'FBES', statusDescription: '16º Lugar FBES (0 pts)' },
  { rank: 17, schoolId: 'unidos_do_grajau', schoolName: 'Unidos do Grajaú', subgroup: 'fbes', league: 'FBES', statusDescription: '17º Lugar FBES (0 pts)' },
  { rank: 18, schoolId: 'uniao_dos_casados', schoolName: 'União dos Casados', subgroup: 'fbes', league: 'FBES', statusDescription: '18º Lugar FBES (0 pts)' },
  { rank: 18, schoolId: 'unidos_do_salgueiro', schoolName: 'Unidos do Salgueiro', subgroup: 'fbes', league: 'FBES', statusDescription: '18º Lugar FBES (0 pts)' },
  { rank: 19, schoolId: 'unidos_do_outeiro', schoolName: 'Unidos do Outeiro', subgroup: 'fbes', league: 'FBES', statusDescription: '19º Lugar FBES (0 pts)' },
  { rank: 20, schoolId: 'engenho_da_rainha', schoolName: 'Acadêmicos do Engenho da Rainha', subgroup: 'fbes', league: 'FBES', statusDescription: '20º Lugar FBES (0 pts)' },
  { rank: 20, schoolId: 'vitoria_de_bento_ribeiro', schoolName: 'Vitória de Bento Ribeiro', subgroup: 'fbes', league: 'FBES', statusDescription: '20º Lugar FBES (0 pts)' },
  { rank: 21, schoolId: 'unidos_do_pecado', schoolName: 'Unidos do Pecado', subgroup: 'fbes', league: 'FBES', statusDescription: '21º Lugar FBES (0 pts)' },
  { rank: 22, schoolId: 'imperio_da_colina', schoolName: 'Império da Colina', subgroup: 'fbes', league: 'FBES', statusDescription: '22º Lugar FBES (0 pts)' },
  { rank: 23, schoolId: 'orgulho_de_cordovil', schoolName: 'Orgulho de Cordovil', subgroup: 'fbes', league: 'FBES', statusDescription: '23º Lugar FBES (0 pts)' },
  { rank: 24, schoolId: 'coracoes_unidos_da_favela', schoolName: 'Corações Unidos da Favela', subgroup: 'fbes', league: 'FBES', statusDescription: '24º Lugar FBES (0 pts)' },
  { rank: 25, schoolId: 'flor_do_lins', schoolName: 'Flor do Lins', subgroup: 'fbes', league: 'FBES', statusDescription: '25º Lugar FBES (0 pts)' },
  { rank: 26, schoolId: 'unidos_do_itambi', schoolName: 'Unidos do Itambí', subgroup: 'fbes', league: 'FBES', statusDescription: '26º Lugar FBES (0 pts)' },
  { rank: 27, schoolId: 'unidos_de_cosmos', schoolName: 'Unidos de Cosmos', subgroup: 'fbes', league: 'FBES', statusDescription: '27º Lugar FBES (0 pts)' },
  { rank: 28, schoolId: 'imperio_do_samba', schoolName: 'Império do Samba', subgroup: 'fbes', league: 'FBES', statusDescription: '28º Lugar FBES (0 pts)' },
  { rank: 28, schoolId: 'sem_voce_vivo_bem', schoolName: 'Sem Você Vivo Bem', subgroup: 'fbes', league: 'FBES', statusDescription: '28º Lugar FBES (0 pts)' },
  { rank: 29, schoolId: 'unidos_da_lagoa', schoolName: 'Unidos da Lagoa', subgroup: 'fbes', league: 'FBES', statusDescription: '29º Lugar FBES (0 pts)' },
  { rank: 30, schoolId: 'unidos_da_barao_de_petropolis', schoolName: 'Unidos da Barão de Petrópolis', subgroup: 'fbes', league: 'FBES', statusDescription: '30º Lugar FBES (0 pts)' },
  { rank: 31, schoolId: 'uniao_dos_topazios', schoolName: 'União dos Topázios', subgroup: 'fbes', league: 'FBES', statusDescription: '31º Lugar FBES (0 pts)' },
  { rank: 32, schoolId: 'unidos_dos_telegrafos', schoolName: 'Unidos dos Telégrafos', subgroup: 'fbes', league: 'FBES', statusDescription: '32º Lugar FBES (0 pts)' },
  { rank: 33, schoolId: 'coracoes_da_liberdade', schoolName: 'Corações da Liberdade', subgroup: 'fbes', league: 'FBES', statusDescription: '33º Lugar FBES (0 pts)' },
  { rank: 34, schoolId: 'de_nos_ninguem_esquece', schoolName: 'De Nós Ninguém Esquece', subgroup: 'fbes', league: 'FBES', statusDescription: '34º Lugar FBES (0 pts)' }
];

export const CARNAVAL_1950_UCES: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', subgroup: 'uces', league: 'UCES', statusDescription: 'Campeã UCES (+20 pts)' },
  { rank: 2, schoolId: 'portela', schoolName: 'Portela', subgroup: 'uces', league: 'UCES', statusDescription: 'Vice-Campeã UCES (+15 pts)' },
  { rank: 3, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', subgroup: 'uces', league: 'UCES', statusDescription: '3º Lugar UCES (+12 pts)' },
  { rank: 4, schoolId: 'coracoes_unidos_jacarepagua', schoolName: 'Corações Unidos de Jacarepaguá', subgroup: 'uces', league: 'UCES', statusDescription: '4º Lugar UCES (+10 pts)' },
  { rank: 4, schoolId: 'vai_se_quiser', schoolName: 'Vai Se Quiser', subgroup: 'uces', league: 'UCES', statusDescription: '4º Lugar UCES (+10 pts)' },
  { rank: 5, schoolId: 'filhos_do_deserto', schoolName: 'Filhos do Deserto', subgroup: 'uces', league: 'UCES', statusDescription: '5º Lugar UCES (+8 pts)' },
  { rank: 6, schoolId: 'unidos_do_coqueiro', schoolName: 'Unidos do Coqueiro', subgroup: 'uces', league: 'UCES', statusDescription: '6º Lugar UCES (+6 pts)' },
  { rank: 7, schoolId: 'uniao_do_realengo', schoolName: 'União do Realengo', subgroup: 'uces', league: 'UCES', statusDescription: '7º Lugar UCES (+4 pts)' },
  { rank: 8, schoolId: 'unidos_de_riachuelo', schoolName: 'Unidos de Riachuelo', subgroup: 'uces', league: 'UCES', statusDescription: '8º Lugar UCES (+3 pts)' },
  { rank: 9, schoolId: 'cada_ano_sai_melhor', schoolName: 'Cada Ano Sai Melhor', subgroup: 'uces', league: 'UCES', statusDescription: '9º Lugar UCES (+2 pts)' },
  { rank: 10, schoolId: 'voz_do_orion', schoolName: 'Voz do Orion', subgroup: 'uces', league: 'UCES', statusDescription: '10º Lugar UCES (+1 pt)' }
];

export const CARNAVAL_1950_UGESB: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'prazer_da_serrinha', schoolName: 'Prazer da Serrinha', subgroup: 'ugesb', league: 'UGESB', statusDescription: 'Campeã UGESB empatada (+20 pts)' },
  { rank: 1, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', subgroup: 'ugesb', league: 'UGESB', statusDescription: 'Campeã UGESB empatada (+20 pts)' },
  { rank: 2, schoolId: 'depois_eu_digo', schoolName: 'Depois Eu Digo', subgroup: 'ugesb', league: 'UGESB', statusDescription: 'Vice-Campeã UGESB empatada (+15 pts)' },
  { rank: 2, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', subgroup: 'ugesb', league: 'UGESB', statusDescription: 'Vice-Campeã UGESB empatada (+15 pts)' },
  { rank: 2, schoolId: 'tres_mosqueteiros', schoolName: 'Três Mosqueteiros', subgroup: 'ugesb', league: 'UGESB', statusDescription: 'Vice-Campeã UGESB empatada (+15 pts)' },
  { rank: 2, schoolId: 'unidos_da_congonha', schoolName: 'Unidos da Congonha', subgroup: 'ugesb', league: 'UGESB', statusDescription: 'Vice-Campeã UGESB empatada (+15 pts)' },
  { rank: 2, schoolId: 'unidos_da_tamarineira', schoolName: 'Unidos da Tamarineira', subgroup: 'ugesb', league: 'UGESB', statusDescription: 'Vice-Campeã UGESB empatada (+15 pts)' },
  { rank: 3, schoolId: 'unidos_do_indaia', schoolName: 'Unidos do Indaiá', subgroup: 'ugesb', league: 'UGESB', statusDescription: '3º Lugar UGESB (+12 pts)' },
  { rank: 4, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', subgroup: 'ugesb', league: 'UGESB', statusDescription: '4º Lugar UGESB (+10 pts)' },
  { rank: 5, schoolId: 'unidos_de_turiacu', schoolName: 'Unidos de Turiaçu', subgroup: 'ugesb', league: 'UGESB', statusDescription: '5º Lugar UGESB (+8 pts)' },
  { rank: 6, schoolId: 'recreio_de_inhauma', schoolName: 'Recreio de Inhaúma', subgroup: 'ugesb', league: 'UGESB', statusDescription: '6º Lugar UGESB (+6 pts)' },
  { rank: 7, schoolId: 'prazer_da_mocidade', schoolName: 'Prazer da Mocidade', subgroup: 'ugesb', league: 'UGESB', statusDescription: '7º Lugar UGESB (+4 pts)' },
  { rank: 8, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', subgroup: 'ugesb', league: 'UGESB', statusDescription: '8º Lugar UGESB (+3 pts)' },
  { rank: 9, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares', subgroup: 'ugesb', league: 'UGESB', statusDescription: '9º Lugar UGESB (+2 pts)' },
  { rank: 10, schoolId: 'em_cima_da_hora_catumbi', schoolName: 'Em Cima da Hora do Catumbi', subgroup: 'ugesb', league: 'UGESB', statusDescription: '10º Lugar UGESB (+1 pt)' },
  { rank: 11, schoolId: 'paraiso_da_floresta', schoolName: 'Paraíso da Floresta', subgroup: 'ugesb', league: 'UGESB', statusDescription: '11º Lugar UGESB (0 pts)' },
  { rank: 12, schoolId: 'unidos_de_riachuelo', schoolName: 'Unidos de Riachuelo', subgroup: 'ugesb', league: 'UGESB', statusDescription: '12º Lugar UGESB (0 pts)' },
  { rank: 13, schoolId: 'unidos_de_terra_nova', schoolName: 'Unidos de Terra Nova', subgroup: 'ugesb', league: 'UGESB', statusDescription: '13º Lugar UGESB (0 pts)' },
  { rank: 14, schoolId: 'uniao_de_sampaio', schoolName: 'União do Sampaio', subgroup: 'ugesb', league: 'UGESB', statusDescription: '14º Lugar UGESB (0 pts)' },
  { rank: 15, schoolId: 'fiquei_firme', schoolName: 'Fiquei Firme', subgroup: 'ugesb', league: 'UGESB', statusDescription: '15º Lugar UGESB (0 pts)' }
];

/**
 * Resultados específicos dos desfiles competitivos do Carnaval de 1951:
 * FBES (Federação Brasileira de Escolas de Samba) e UGESB (União Geral das Escolas de Samba do Brasil).
 */
export const CARNAVAL_1951_FBES: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', subgroup: 'fbes', league: 'FBES', statusDescription: 'Campeã FBES (+20 pts)' },
  { rank: 2, schoolId: 'aprendizes_de_lucas', schoolName: 'Aprendizes de Lucas', subgroup: 'fbes', league: 'FBES', statusDescription: 'Vice-Campeã FBES (+15 pts)' },
  { rank: 3, schoolId: 'filhos_do_deserto', schoolName: 'Filhos do Deserto', subgroup: 'fbes', league: 'FBES', statusDescription: '3º Lugar FBES (+12 pts)' },
  { rank: 4, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', subgroup: 'fbes', league: 'FBES', statusDescription: '4º Lugar FBES (+10 pts)' },
  { rank: 5, schoolId: 'irmaos_unidos_do_catete', schoolName: 'Irmãos Unidos do Catete', subgroup: 'fbes', league: 'FBES', statusDescription: '5º Lugar FBES (+8 pts)' },
  { rank: 6, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', subgroup: 'fbes', league: 'FBES', statusDescription: '6º Lugar FBES (+6 pts)' },
  { rank: 7, schoolId: 'indios_do_acau', schoolName: 'Índios do Acaú', subgroup: 'fbes', league: 'FBES', statusDescription: '7º Lugar FBES (+4 pts)' },
  { rank: 7, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', subgroup: 'fbes', league: 'FBES', statusDescription: '7º Lugar FBES (+4 pts)' },
  { rank: 8, schoolId: 'unidos_do_grajau', schoolName: 'Unidos do Grajaú', subgroup: 'fbes', league: 'FBES', statusDescription: '8º Lugar FBES (+3 pts)' },
  { rank: 9, schoolId: 'vai_se_quiser', schoolName: 'Vai Se Quiser', subgroup: 'fbes', league: 'FBES', statusDescription: '9º Lugar FBES (+2 pts)' },
  { rank: 10, schoolId: 'uniao_vaz_lobo', schoolName: 'União de Vaz Lobo', subgroup: 'fbes', league: 'FBES', statusDescription: '10º Lugar FBES (+1 pt)' },
  { rank: 11, schoolId: 'depois_eu_digo', schoolName: 'Depois Eu Digo', subgroup: 'fbes', league: 'FBES', statusDescription: '11º Lugar FBES (0 pts)' },
  { rank: 11, schoolId: 'floresta_do_andarai', schoolName: 'Floresta do Andaraí', subgroup: 'fbes', league: 'FBES', statusDescription: '11º Lugar FBES (0 pts)' },
  { rank: 12, schoolId: 'coracoes_unidos_da_favela', schoolName: 'Corações Unidos da Favela', subgroup: 'fbes', league: 'FBES', statusDescription: '12º Lugar FBES (0 pts)' },
  { rank: 13, schoolId: 'unidos_de_santo_amaro', schoolName: 'Unidos de Santo Amaro', subgroup: 'fbes', league: 'FBES', statusDescription: '13º Lugar FBES (0 pts)' },
  { rank: 14, schoolId: 'independentes_cordovil', schoolName: 'Independentes do Leblon (Independentes de Cordovil)', subgroup: 'fbes', league: 'FBES', statusDescription: '14º Lugar FBES (0 pts)' },
  { rank: 15, schoolId: 'engenho_da_rainha', schoolName: 'Acadêmicos do Engenho da Rainha', subgroup: 'fbes', league: 'FBES', statusDescription: '15º Lugar FBES (0 pts)' },
  { rank: 16, schoolId: 'unidos_do_pecado', schoolName: 'Unidos do Pecado', subgroup: 'fbes', league: 'FBES', statusDescription: '16º Lugar FBES (0 pts)' },
  { rank: 17, schoolId: 'independentes_do_rio', schoolName: 'Independentes do Rio', subgroup: 'fbes', league: 'FBES', statusDescription: '17º Lugar FBES (0 pts)' },
  { rank: 18, schoolId: 'unidos_do_outeiro', schoolName: 'Unidos do Outeiro', subgroup: 'fbes', league: 'FBES', statusDescription: '18º Lugar FBES (0 pts)' },
  { rank: 19, schoolId: 'estrela_de_ouro', schoolName: 'Estrela de Ouro', subgroup: 'fbes', league: 'FBES', statusDescription: '19º Lugar FBES (0 pts)' },
  { rank: 20, schoolId: 'unidos_de_cordovil', schoolName: 'Unidos de Cordovil', subgroup: 'fbes', league: 'FBES', statusDescription: '20º Lugar FBES (0 pts)' },
  { rank: 21, schoolId: 'unidos_do_itambi', schoolName: 'Unidos do Itambí', subgroup: 'fbes', league: 'FBES', statusDescription: '21º Lugar FBES (0 pts)' },
  { rank: 22, schoolId: 'capricho_do_centenario', schoolName: 'Capricho do Centenário', subgroup: 'fbes', league: 'FBES', statusDescription: '22º Lugar FBES (0 pts)' },
  { rank: 23, schoolId: 'unidos_dos_arcos', schoolName: 'Unidos dos Arcos', subgroup: 'fbes', league: 'FBES', statusDescription: '23º Lugar FBES (0 pts)' },
  { rank: 24, schoolId: 'paraiso_do_grotao', schoolName: 'Paraíso do Grotão', subgroup: 'fbes', league: 'FBES', statusDescription: '24º Lugar FBES (0 pts)' },
  { rank: 25, schoolId: 'mocidade_de_um_paraiso', schoolName: 'Mocidade de Um Paraíso', subgroup: 'fbes', league: 'FBES', statusDescription: '25º Lugar FBES (0 pts)' },
  { rank: 26, schoolId: 'vitoria_de_bento_ribeiro', schoolName: 'Vitória de Bento Ribeiro', subgroup: 'fbes', league: 'FBES', statusDescription: '26º Lugar FBES (0 pts)' },
  { rank: 27, schoolId: 'unidos_dos_telegrafos', schoolName: 'Unidos dos Telégrafos', subgroup: 'fbes', league: 'FBES', statusDescription: '27º Lugar FBES (0 pts)' },
  { rank: 28, schoolId: 'trovadores_do_maracana', schoolName: 'Trovadores do Maracanã', subgroup: 'fbes', league: 'FBES', statusDescription: '28º Lugar FBES (0 pts)' },
  { rank: 29, schoolId: 'uniao_dos_casados', schoolName: 'União dos Casados', subgroup: 'fbes', league: 'FBES', statusDescription: '29º Lugar FBES (0 pts)' },
  { rank: 30, schoolId: 'flor_do_lins', schoolName: 'Flor do Lins', subgroup: 'fbes', league: 'FBES', statusDescription: '30º Lugar FBES (0 pts)' },
  { rank: 30, schoolId: 'unidos_de_campo_grande', schoolName: 'Unidos de Campo Grande', subgroup: 'fbes', league: 'FBES', statusDescription: '30º Lugar FBES (0 pts)' }
];

export const CARNAVAL_1951_UGESB: LiesaStandingRecord[] = [
  { rank: 1, schoolId: 'portela', schoolName: 'Portela', subgroup: 'ugesb', league: 'UGESB', statusDescription: 'Campeã UGESB (+20 pts)' },
  { rank: 2, schoolId: 'tres_mosqueteiros', schoolName: 'Três Mosqueteiros', subgroup: 'ugesb', league: 'UGESB', statusDescription: 'Vice-Campeã UGESB (+15 pts)' },
  { rank: 3, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', subgroup: 'ugesb', league: 'UGESB', statusDescription: '3º Lugar UGESB (+12 pts)' },
  { rank: 4, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', subgroup: 'ugesb', league: 'UGESB', statusDescription: '4º Lugar UGESB (+10 pts)' },
  { rank: 5, schoolId: 'aventureiros_da_matriz', schoolName: 'Aventureiros da Matriz', subgroup: 'ugesb', league: 'UGESB', statusDescription: '5º Lugar UGESB (+8 pts)' },
  { rank: 5, schoolId: 'unidos_da_tamarineira', schoolName: 'Unidos da Tamarineira', subgroup: 'ugesb', league: 'UGESB', statusDescription: '5º Lugar UGESB (+8 pts)' },
  { rank: 6, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', subgroup: 'ugesb', league: 'UGESB', statusDescription: '6º Lugar UGESB (+6 pts)' },
  { rank: 7, schoolId: 'coracoes_unidos_jacarepagua', schoolName: 'Corações Unidos de Jacarepaguá', subgroup: 'ugesb', league: 'UGESB', statusDescription: '7º Lugar UGESB (+4 pts)' },
  { rank: 8, schoolId: 'prazer_da_serrinha', schoolName: 'Prazer da Serrinha', subgroup: 'ugesb', league: 'UGESB', statusDescription: '8º Lugar UGESB (+3 pts)' },
  { rank: 9, schoolId: 'recreio_de_inhauma', schoolName: 'Recreio de Inhaúma', subgroup: 'ugesb', league: 'UGESB', statusDescription: '9º Lugar UGESB (+2 pts)' },
  { rank: 10, schoolId: 'cartolinhas_de_caxias', schoolName: 'Cartolinhas de Caxias', subgroup: 'ugesb', league: 'UGESB', statusDescription: '10º Lugar UGESB (+1 pt)' },
  { rank: 10, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', subgroup: 'ugesb', league: 'UGESB', statusDescription: '10º Lugar UGESB (+1 pt)' },
  { rank: 10, schoolId: 'unidos_do_morro_azul', schoolName: 'Unidos do Morro Azul', subgroup: 'ugesb', league: 'UGESB', statusDescription: '10º Lugar UGESB (+1 pt)' },
  { rank: 11, schoolId: 'independentes_de_turiacu', schoolName: 'Independentes de Turiaçu', subgroup: 'ugesb', league: 'UGESB', statusDescription: '11º Lugar UGESB (0 pts)' },
  { rank: 12, schoolId: 'unidos_do_coqueiro', schoolName: 'Unidos do Coqueiro', subgroup: 'ugesb', league: 'UGESB', statusDescription: '12º Lugar UGESB (0 pts)' },
  { rank: 13, schoolId: 'em_cima_da_hora_catumbi', schoolName: 'Em Cima da Hora do Catumbi', subgroup: 'ugesb', league: 'UGESB', statusDescription: '13º Lugar UGESB (0 pts)' },
  { rank: 14, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares', subgroup: 'ugesb', league: 'UGESB', statusDescription: '14º Lugar UGESB (0 pts)' },
  { rank: 15, schoolId: 'embaixadores_sao_joao_meriti', schoolName: 'Embaixadores de São João de Meriti', subgroup: 'ugesb', league: 'UGESB', statusDescription: '15º Lugar UGESB (0 pts)' },
  { rank: 16, schoolId: 'nao_e_o_que_dizem', schoolName: 'Não É O Que Dizem', subgroup: 'ugesb', league: 'UGESB', statusDescription: '16º Lugar UGESB (0 pts)' },
  { rank: 17, schoolId: 'cada_ano_sai_melhor', schoolName: 'Cada Ano Sai Melhor', subgroup: 'ugesb', league: 'UGESB', statusDescription: '17º Lugar UGESB (0 pts)' },
  { rank: 18, schoolId: 'unidos_do_jacare', schoolName: 'Unidos do Jacaré', subgroup: 'ugesb', league: 'UGESB', statusDescription: '18º Lugar UGESB (0 pts)' },
  { rank: 19, schoolId: 'unidos_do_indaia', schoolName: 'Unidos do Indaiá', subgroup: 'ugesb', league: 'UGESB', statusDescription: '19º Lugar UGESB (0 pts)' },
  { rank: 20, schoolId: 'guarani_de_realengo', schoolName: 'Guarani de Realengo', subgroup: 'ugesb', league: 'UGESB', statusDescription: '20º Lugar UGESB (0 pts)' }
];

/**
 * Resultados específicos do Carnaval de 1952:
 * Não houve apuração oficial das notas em função do forte temporal e chuvas durante os desfiles.
 * 25 agremiações participaram do evento, sem classificação oficial e sem pontuação atribuída.
 */
export const CARNAVAL_1952_OFICIAL: LiesaStandingRecord[] = [
  { rank: 0, schoolId: 'aprendizes_de_lucas', schoolName: 'Aprendizes de Lucas', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'combinado_do_amor', schoolName: 'Combinado do Amor', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'depois_eu_digo', schoolName: 'Depois Eu Digo', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'filhos_do_deserto', schoolName: 'Filhos do Deserto', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'independentes_cordovil', schoolName: 'Independentes do Leblon (Independentes de Cordovil)', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'portela', schoolName: 'Portela', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'tres_mosqueteiros', schoolName: 'Três Mosqueteiros', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'uniao_vaz_lobo', schoolName: 'União de Vaz Lobo', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'unidos_da_tamarineira', schoolName: 'Unidos da Tamarineira', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'unidos_do_catete', schoolName: 'Unidos do Catete', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'unidos_do_grajau', schoolName: 'Unidos do Grajaú', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'unidos_do_pecado', schoolName: 'Unidos do Pecado', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'unidos_do_salgueiro', schoolName: 'Unidos do Salgueiro', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'vai_se_quiser', schoolName: 'Vai Se Quiser', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'aventureiros_da_matriz', schoolName: 'Aventureiros da Matriz', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'coracoes_unidos_jacarepagua', schoolName: 'Corações Unidos de Jacarepaguá', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'floresta_do_andarai', schoolName: 'Floresta do Andaraí', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' },
  { rank: 0, schoolId: 'indios_do_acau', schoolName: 'Índios do Acaú', isHorsConcours: true, statusDescription: 'Desfilou sob chuva (Sem apuração oficial • 0 pts)' }
];

/**
 * Resultados oficiais catalogados dos carnavais históricos (1932 a 2026).
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
 * Carnaval 1953: Portela campeã e Império Serrano vice. Primeiro Carnaval com sistema de rebaixamento. Império da Tijuca desfilou como Hors concours. Rebaixadas: Vai Se Quiser, Cada Ano Sai Melhor, Aventureiros da Matriz e Azul e Branco do Salgueiro.
 * Carnaval 1952: Não houve apuração oficial em função das fortes chuvas ocorridas durante os desfiles.
 * Carnaval 1951: Dois desfiles competitivos oficiais no Grupo Especial:
 *   - FBES: Império Serrano campeã e Aprendizes de Lucas vice.
 *   - UGESB: Portela campeã e Três Mosqueteiros vice.
 *   Não houve rebaixamento.
 * Carnaval 1950: Três competições oficiais de Escolas de Samba:
 *   - FBES: Império Serrano campeã e Aprendizes de Lucas vice.
 *   - UCES: Estação Primeira de Mangueira campeã e Portela vice.
 *   - UGESB: Prazer da Serrinha e Unidos da Capela campeãs empatadas, com cinco agremiações vice-campeãs empatadas.
 *   Não houve rebaixamento.
 * Carnaval 1949: Dois desfiles competitivos oficiais no Grupo Especial:
 *   - FBES: Império Serrano campeã e Azul e Branco do Salgueiro vice.
 *   - UGESB: Estação Primeira de Mangueira campeã e Portela vice.
 *   Não houve rebaixamento.
 * Carnaval 1940: Desfile oficial unificado das Escolas de Samba com 23 agremiações participantes:
 *   - Campeã: Estação Primeira de Mangueira (com "Prélio Sambístico")
 *   - Vice-campeã: Mocidade Louca de São Cristóvão
 *   Não houve rebaixamento.
 * Carnaval 1941: Desfile oficial unificado das Escolas de Samba com 17 agremiações participantes:
 *   - Campeã: Portela (campeã com "Dez Anos de Glória")
 *   - Vice-campeã: Estação Primeira de Mangueira (com "Transformação do Samba")
 *   Não houve rebaixamento.
 * Carnaval 1942: Desfile oficial unificado das Escolas de Samba com 23 agremiações participantes:
 *   - Campeã: Portela (bicampeã com "A Vida do Samba")
 *   - Vice-campeã: Depois Eu Digo (com "Glórias da Pátria")
 *   Não houve rebaixamento.
 * Carnaval 1943: Desfile competitivo oficial:
 *   - Campeã: Portela (tricampeã com "Carnaval de Guerra")
 *   - Vice-campeã: Estação Primeira de Mangueira
 *   Não houve rebaixamento.
 * Carnaval 1944: Desfile competitivo oficial:
 *   - Campeã: Portela (tetracampeã com "Motivos Patrióticos")
 *   - Vice-campeã: Estação Primeira de Mangueira (com "Glória ao Samba")
 *   Não houve rebaixamento.
 * Carnaval 1945: Desfile competitivo oficial:
 *   - Campeã: Portela (pentacampeã com "Motivos Patrióticos")
 *   - Vice-campeã: Estação Primeira de Mangueira (com "A Glória do Samba")
 *   Não houve rebaixamento.
 * Carnaval 1946: Desfile competitivo oficial unificado das Escolas de Samba:
 *   - Campeã: Portela (hexacampeã com "Aljezur")
 *   - Vice-campeã: Estação Primeira de Mangueira (com "Carnaval")
 *   Não houve rebaixamento.
 * Carnaval 1947: Desfile competitivo oficial unificado das Escolas de Samba:
 *   - Campeã: Portela (heptacampeã com "Honra ao Mérito" / "Glória à Justiça Real")
 *   - Vice-campeã: Estação Primeira de Mangueira (com "Brasil, Reino Unido")
 *   Não houve rebaixamento.
 * Carnaval 1948: Desfile competitivo oficial unificado organizado pela FBES:
 *   - Campeã: Império Serrano (com "Homenagem a Antônio Castro Alves")
 *   - Vice-campeã: Unidos da Tijuca (com "Assinatura da Lei Áurea")
 *   Não houve rebaixamento.
 */
export const OFFICIAL_LIESA_HISTORICAL_STANDINGS: Record<number, LiesaStandingRecord[]> = {
  1932: CARNAVAL_1932_OFICIAL,
  1933: CARNAVAL_1933_OFICIAL,
  1934: CARNAVAL_1934_OFICIAL,
  1935: CARNAVAL_1935_OFICIAL,
  1936: CARNAVAL_1936_OFICIAL,
  1937: CARNAVAL_1937_OFICIAL,
  1938: CARNAVAL_1938_OFICIAL,
  1939: CARNAVAL_1939_OFICIAL,
  1940: CARNAVAL_1940_OFICIAL,
  1941: CARNAVAL_1941_OFICIAL,
  1942: CARNAVAL_1942_OFICIAL,
  1943: CARNAVAL_1943_OFICIAL,
  1944: CARNAVAL_1944_OFICIAL,
  1945: CARNAVAL_1945_OFICIAL,
  1946: CARNAVAL_1946_OFICIAL,
  1947: CARNAVAL_1947_OFICIAL,
  1948: CARNAVAL_1948_FBES,
  1949: [
    // 1º Lugares (+20 pts)
    { rank: 1, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', subgroup: 'fbes', league: 'FBES', statusDescription: 'Campeã FBES (+20 pts)' },
    { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', subgroup: 'ugesb', league: 'UGESB', statusDescription: 'Campeã UGESB (+20 pts)' },
    // 2º Lugares (+15 pts)
    { rank: 2, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', subgroup: 'fbes', league: 'FBES', statusDescription: 'Vice-Campeã FBES (+15 pts)' },
    { rank: 2, schoolId: 'portela', schoolName: 'Portela', subgroup: 'ugesb', league: 'UGESB', statusDescription: 'Vice-Campeã UGESB (+15 pts)' },
    // 3º Lugares (+12 pts)
    { rank: 3, schoolId: 'unidos_do_salgueiro', schoolName: 'Unidos do Salgueiro', subgroup: 'fbes', league: 'FBES', statusDescription: '3º Lugar FBES (+12 pts)' },
    { rank: 3, schoolId: 'depois_eu_digo', schoolName: 'Depois Eu Digo', subgroup: 'ugesb', league: 'UGESB', statusDescription: '3º Lugar UGESB (+12 pts)' },
    // 4º Lugares (+10 pts)
    { rank: 4, schoolId: 'floresta_do_andarai', schoolName: 'Floresta do Andaraí', subgroup: 'fbes', league: 'FBES', statusDescription: '4º Lugar FBES (+10 pts)' },
    { rank: 4, schoolId: 'prazer_da_serrinha', schoolName: 'Prazer da Serrinha', subgroup: 'ugesb', league: 'UGESB', statusDescription: '4º Lugar UGESB (+10 pts)' },
    // 5º Lugares (+8 pts)
    { rank: 5, schoolId: 'unidos_do_outeiro', schoolName: 'Unidos do Outeiro', subgroup: 'fbes', league: 'FBES', statusDescription: '5º Lugar FBES (+8 pts)' },
    { rank: 5, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', subgroup: 'ugesb', league: 'UGESB', statusDescription: '5º Lugar UGESB (+8 pts)' },
    // 6º Lugares (+6 pts)
    { rank: 6, schoolId: 'recreio_de_sao_carlos', schoolName: 'Recreio de São Carlos', subgroup: 'fbes', league: 'FBES', statusDescription: '6º Lugar FBES (+6 pts)' },
    { rank: 6, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', subgroup: 'ugesb', league: 'UGESB', statusDescription: '6º Lugar UGESB (+6 pts)' },
    // 7º Lugares (+4 pts)
    { rank: 7, schoolId: 'aprendizes_de_lucas', schoolName: 'Aprendizes de Lucas', subgroup: 'fbes', league: 'FBES', statusDescription: '7º Lugar FBES (+4 pts)' },
    { rank: 7, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', subgroup: 'ugesb', league: 'UGESB', statusDescription: '7º Lugar UGESB (+4 pts)' },
    // 8º Lugares (+3 pts)
    { rank: 8, schoolId: 'independentes_cordovil', schoolName: 'Independentes do Leblon (Independentes de Cordovil)', subgroup: 'fbes', league: 'FBES', statusDescription: '8º Lugar FBES (+3 pts)' },
    { rank: 8, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', subgroup: 'ugesb', league: 'UGESB', statusDescription: '8º Lugar UGESB (+3 pts)' },
    // 9º Lugares (+2 pts)
    { rank: 9, schoolId: 'filhos_do_deserto', schoolName: 'Filhos do Deserto', subgroup: 'fbes', league: 'FBES', statusDescription: '9º Lugar FBES (+2 pts)' },
    { rank: 9, schoolId: 'baianinhas_brasileiras', schoolName: 'Baianinhas Brasileiras', subgroup: 'ugesb', league: 'UGESB', statusDescription: '9º Lugar UGESB (+2 pts)' },
    // 10º Lugares (+1 pt)
    { rank: 10, schoolId: 'irmaos_unidos_do_catete', schoolName: 'Irmãos Unidos do Catete', subgroup: 'fbes', league: 'FBES', statusDescription: '10º Lugar FBES (+1 pt)' },
    { rank: 10, schoolId: 'unidos_de_turiacu', schoolName: 'Unidos de Turiaçu', subgroup: 'ugesb', league: 'UGESB', statusDescription: '10º Lugar UGESB (+1 pt)' },
    // 11º Lugares
    { rank: 11, schoolId: 'unidos_de_santo_amaro', schoolName: 'Unidos de Santo Amaro', subgroup: 'fbes', league: 'FBES', statusDescription: '11º Lugar FBES (0 pts)' },
    { rank: 11, schoolId: 'coracoes_unidos_jacarepagua', schoolName: 'Corações Unidos de Jacarepaguá', subgroup: 'ugesb', league: 'UGESB', statusDescription: '11º Lugar UGESB (0 pts)' },
    // 12º Lugares
    { rank: 12, schoolId: 'indios_do_acau', schoolName: 'Índios do Acaú', subgroup: 'fbes', league: 'FBES', statusDescription: '12º Lugar FBES (0 pts)' },
    { rank: 12, schoolId: 'vai_se_quiser', schoolName: 'Vai Se Quiser', subgroup: 'ugesb', league: 'UGESB', statusDescription: '12º Lugar UGESB (0 pts)' },
    // 13º Lugares
    { rank: 13, schoolId: 'vitoria_de_bento_ribeiro', schoolName: 'Vitória de Bento Ribeiro', subgroup: 'fbes', league: 'FBES', statusDescription: '13º Lugar FBES (0 pts)' },
    { rank: 13, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', subgroup: 'ugesb', league: 'UGESB', statusDescription: '13º Lugar UGESB (0 pts)' },
    // 14º Lugares
    { rank: 14, schoolId: 'flor_do_lins', schoolName: 'Flor do Lins', subgroup: 'fbes', league: 'FBES', statusDescription: '14º Lugar FBES (0 pts)' },
    { rank: 14, schoolId: 'em_cima_da_hora_catumbi', schoolName: 'Em Cima da Hora do Catumbi', subgroup: 'ugesb', league: 'UGESB', statusDescription: '14º Lugar UGESB (0 pts)' },
    // 15º Lugares
    { rank: 15, schoolId: 'manda_quem_pode', schoolName: 'Manda Quem Pode', subgroup: 'fbes', league: 'FBES', statusDescription: '15º Lugar FBES (0 pts)' },
    { rank: 15, schoolId: 'unidos_de_tomas_coelho', schoolName: 'Unidos de Tomás Coelho', subgroup: 'ugesb', league: 'UGESB', statusDescription: '15º Lugar UGESB (0 pts)' },
    // 16º Lugares
    { rank: 16, schoolId: 'paraiso_das_morenas', schoolName: 'Paraíso das Morenas', subgroup: 'fbes', league: 'FBES', statusDescription: '16º Lugar FBES (0 pts)' },
    { rank: 16, schoolId: 'recreio_de_inhauma', schoolName: 'Recreio de Inhaúma', subgroup: 'ugesb', league: 'UGESB', statusDescription: '16º Lugar UGESB (0 pts)' },
    // 17º Lugares
    { rank: 17, schoolId: 'uniao_de_bras_de_pina', schoolName: 'União de Brás de Pina', subgroup: 'fbes', league: 'FBES', statusDescription: '17º Lugar FBES (0 pts)' },
    { rank: 17, schoolId: 'unidos_do_morro_azul', schoolName: 'Unidos do Morro Azul', subgroup: 'ugesb', league: 'UGESB', statusDescription: '17º Lugar UGESB (0 pts)' },
    // 18º Lugares
    { rank: 18, schoolId: 'unidos_de_campo_grande', schoolName: 'Unidos de Campo Grande', subgroup: 'fbes', league: 'FBES', statusDescription: '18º Lugar FBES (0 pts)' },
    { rank: 18, schoolId: 'paraiso_das_morenas', schoolName: 'Paraíso das Morenas', subgroup: 'ugesb', league: 'UGESB', statusDescription: '18º Lugar UGESB (0 pts)' },
    // 19º Lugares
    { rank: 19, schoolId: 'imperio_da_colina', schoolName: 'Império da Colina', subgroup: 'fbes', league: 'FBES', statusDescription: '19º Lugar FBES (0 pts)' },
    { rank: 19, schoolId: 'uniao_do_realengo', schoolName: 'União do Realengo', subgroup: 'ugesb', league: 'UGESB', statusDescription: '19º Lugar UGESB (0 pts)' },
    // 20º Lugares
    { rank: 20, schoolId: 'azul_e_branco_de_bonsucesso', schoolName: 'Azul e Branco de Bonsucesso', subgroup: 'fbes', league: 'FBES', statusDescription: '20º Lugar FBES (0 pts)' },
    { rank: 20, schoolId: 'unidos_do_iraja', schoolName: 'Unidos do Irajá', subgroup: 'ugesb', league: 'UGESB', statusDescription: '20º Lugar UGESB (0 pts)' },
    // 21º Lugares
    { rank: 21, schoolId: 'uniao_primeira', schoolName: 'União Primeira', subgroup: 'fbes', league: 'FBES', statusDescription: '21º Lugar FBES (0 pts)' },
    { rank: 21, schoolId: 'imperio_de_campo_grande', schoolName: 'Império de Campo Grande', subgroup: 'ugesb', league: 'UGESB', statusDescription: '21º Lugar UGESB (0 pts)' },
    // 22º Lugares
    { rank: 22, schoolId: 'boemios_do_andarai', schoolName: 'Boêmios do Andaraí', subgroup: 'fbes', league: 'FBES', statusDescription: '22º Lugar FBES empatada (0 pts)' },
    { rank: 22, schoolId: 'coracoes_unidos_da_favela', schoolName: 'Corações Unidos da Favela', subgroup: 'fbes', league: 'FBES', statusDescription: '22º Lugar FBES empatada (0 pts)' },
    { rank: 22, schoolId: 'orgulho_de_cordovil', schoolName: 'Orgulho de Cordovil', subgroup: 'fbes', league: 'FBES', statusDescription: '22º Lugar FBES empatada (0 pts)' },
    { rank: 22, schoolId: 'nao_e_o_que_dizem', schoolName: 'Não É O Que Dizem', subgroup: 'ugesb', league: 'UGESB', statusDescription: '22º Lugar UGESB (0 pts)' },
    // 23º Lugares
    { rank: 23, schoolId: 'uniao_dos_casados', schoolName: 'União dos Casados', subgroup: 'fbes', league: 'FBES', statusDescription: '23º Lugar FBES (0 pts)' },
    { rank: 23, schoolId: 'unidos_de_terra_nova', schoolName: 'Unidos de Terra Nova', subgroup: 'ugesb', league: 'UGESB', statusDescription: '23º Lugar UGESB (0 pts)' },
    // 24º Lugares
    { rank: 24, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', subgroup: 'fbes', league: 'FBES', statusDescription: '24º Lugar FBES (0 pts)' },
    { rank: 24, schoolId: 'fiquei_firme', schoolName: 'Fiquei Firme', subgroup: 'ugesb', league: 'UGESB', statusDescription: '24º Lugar UGESB (0 pts)' },
    // 25º Lugares
    { rank: 25, schoolId: 'imperio_do_andarai', schoolName: 'Império do Andaraí', subgroup: 'fbes', league: 'FBES', statusDescription: '25º Lugar FBES (0 pts)' },
    { rank: 25, schoolId: 'coracao_das_morenas', schoolName: 'Coração das Morenas', subgroup: 'ugesb', league: 'UGESB', statusDescription: '25º Lugar UGESB (0 pts)' },
    // 26º Lugares
    { rank: 26, schoolId: 'unidos_da_lagoa', schoolName: 'Unidos da Lagoa', subgroup: 'fbes', league: 'FBES', statusDescription: '26º Lugar FBES (0 pts)' }
  ],
  1950: [
    // 1º Lugares (+20 pts)
    { rank: 1, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', subgroup: 'fbes', league: 'FBES', statusDescription: 'Campeã FBES (+20 pts)' },
    { rank: 1, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', subgroup: 'uces', league: 'UCES', statusDescription: 'Campeã UCES (+20 pts)' },
    { rank: 1, schoolId: 'prazer_da_serrinha', schoolName: 'Prazer da Serrinha', subgroup: 'ugesb', league: 'UGESB', statusDescription: 'Campeã UGESB empatada (+20 pts)' },
    { rank: 1, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', subgroup: 'ugesb', league: 'UGESB', statusDescription: 'Campeã UGESB empatada (+20 pts)' },
    // 2º Lugares (+15 pts)
    { rank: 2, schoolId: 'aprendizes_de_lucas', schoolName: 'Aprendizes de Lucas', subgroup: 'fbes', league: 'FBES', statusDescription: 'Vice-Campeã FBES (+15 pts)' },
    { rank: 2, schoolId: 'portela', schoolName: 'Portela', subgroup: 'uces', league: 'UCES', statusDescription: 'Vice-Campeã UCES (+15 pts)' },
    { rank: 2, schoolId: 'depois_eu_digo', schoolName: 'Depois Eu Digo', subgroup: 'ugesb', league: 'UGESB', statusDescription: 'Vice-Campeã UGESB empatada (+15 pts)' },
    { rank: 2, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', subgroup: 'ugesb', league: 'UGESB', statusDescription: 'Vice-Campeã UGESB empatada (+15 pts)' },
    { rank: 2, schoolId: 'tres_mosqueteiros', schoolName: 'Três Mosqueteiros', subgroup: 'ugesb', league: 'UGESB', statusDescription: 'Vice-Campeã UGESB empatada (+15 pts)' },
    { rank: 2, schoolId: 'unidos_da_congonha', schoolName: 'Unidos da Congonha', subgroup: 'ugesb', league: 'UGESB', statusDescription: 'Vice-Campeã UGESB empatada (+15 pts)' },
    { rank: 2, schoolId: 'unidos_da_tamarineira', schoolName: 'Unidos da Tamarineira', subgroup: 'ugesb', league: 'UGESB', statusDescription: 'Vice-Campeã UGESB empatada (+15 pts)' },
    // 3º Lugares (+12 pts)
    { rank: 3, schoolId: 'irmaos_unidos_do_catete', schoolName: 'Irmãos Unidos do Catete', subgroup: 'fbes', league: 'FBES', statusDescription: '3º Lugar FBES (+12 pts)' },
    { rank: 3, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', subgroup: 'uces', league: 'UCES', statusDescription: '3º Lugar UCES (+12 pts)' },
    { rank: 3, schoolId: 'unidos_do_indaia', schoolName: 'Unidos do Indaiá', subgroup: 'ugesb', league: 'UGESB', statusDescription: '3º Lugar UGESB (+12 pts)' },
    // 4º Lugares (+10 pts)
    { rank: 4, schoolId: 'floresta_do_andarai', schoolName: 'Floresta do Andaraí', subgroup: 'fbes', league: 'FBES', statusDescription: '4º Lugar FBES (+10 pts)' },
    { rank: 4, schoolId: 'coracoes_unidos_jacarepagua', schoolName: 'Corações Unidos de Jacarepaguá', subgroup: 'uces', league: 'UCES', statusDescription: '4º Lugar UCES (+10 pts)' },
    { rank: 4, schoolId: 'vai_se_quiser', schoolName: 'Vai Se Quiser', subgroup: 'uces', league: 'UCES', statusDescription: '4º Lugar UCES (+10 pts)' },
    { rank: 4, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', subgroup: 'ugesb', league: 'UGESB', statusDescription: '4º Lugar UGESB (+10 pts)' },
    // 5º Lugares (+8 pts)
    { rank: 5, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', subgroup: 'fbes', league: 'FBES', statusDescription: '5º Lugar FBES (+8 pts)' },
    { rank: 5, schoolId: 'filhos_do_deserto', schoolName: 'Filhos do Deserto', subgroup: 'uces', league: 'UCES', statusDescription: '5º Lugar UCES (+8 pts)' },
    { rank: 5, schoolId: 'unidos_de_turiacu', schoolName: 'Unidos de Turiaçu', subgroup: 'ugesb', league: 'UGESB', statusDescription: '5º Lugar UGESB (+8 pts)' },
    // 6º Lugares (+6 pts)
    { rank: 6, schoolId: 'indios_do_acau', schoolName: 'Índios do Acaú', subgroup: 'fbes', league: 'FBES', statusDescription: '6º Lugar FBES (+6 pts)' },
    { rank: 6, schoolId: 'unidos_do_coqueiro', schoolName: 'Unidos do Coqueiro', subgroup: 'uces', league: 'UCES', statusDescription: '6º Lugar UCES (+6 pts)' },
    { rank: 6, schoolId: 'recreio_de_inhauma', schoolName: 'Recreio de Inhaúma', subgroup: 'ugesb', league: 'UGESB', statusDescription: '6º Lugar UGESB (+6 pts)' },
    // 7º Lugares (+4 pts)
    { rank: 7, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', subgroup: 'fbes', league: 'FBES', statusDescription: '7º Lugar FBES (+4 pts)' },
    { rank: 7, schoolId: 'uniao_do_realengo', schoolName: 'União do Realengo', subgroup: 'uces', league: 'UCES', statusDescription: '7º Lugar UCES (+4 pts)' },
    { rank: 7, schoolId: 'prazer_da_mocidade', schoolName: 'Prazer da Mocidade', subgroup: 'ugesb', league: 'UGESB', statusDescription: '7º Lugar UGESB (+4 pts)' },
    // 8º Lugares (+3 pts)
    { rank: 8, schoolId: 'independentes_cordovil', schoolName: 'Independentes do Leblon (Independentes de Cordovil)', subgroup: 'fbes', league: 'FBES', statusDescription: '8º Lugar FBES (+3 pts)' },
    { rank: 8, schoolId: 'unidos_de_riachuelo', schoolName: 'Unidos de Riachuelo', subgroup: 'uces', league: 'UCES', statusDescription: '8º Lugar UCES (+3 pts)' },
    { rank: 8, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', subgroup: 'ugesb', league: 'UGESB', statusDescription: '8º Lugar UGESB (+3 pts)' },
    // 9º Lugares (+2 pts)
    { rank: 9, schoolId: 'unidos_do_engenho_velho', schoolName: 'Unidos do Engenho Velho', subgroup: 'fbes', league: 'FBES', statusDescription: '9º Lugar FBES (+2 pts)' },
    { rank: 9, schoolId: 'cada_ano_sai_melhor', schoolName: 'Cada Ano Sai Melhor', subgroup: 'uces', league: 'UCES', statusDescription: '9º Lugar UCES (+2 pts)' },
    { rank: 9, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares', subgroup: 'ugesb', league: 'UGESB', statusDescription: '9º Lugar UGESB (+2 pts)' },
    // 10º Lugares (+1 pt)
    { rank: 10, schoolId: 'mocidade_de_um_paraiso', schoolName: 'Mocidade de Um Paraíso', subgroup: 'fbes', league: 'FBES', statusDescription: '10º Lugar FBES (+1 pt)' },
    { rank: 10, schoolId: 'voz_do_orion', schoolName: 'Voz do Orion', subgroup: 'uces', league: 'UCES', statusDescription: '10º Lugar UCES (+1 pt)' },
    { rank: 10, schoolId: 'em_cima_da_hora_catumbi', schoolName: 'Em Cima da Hora do Catumbi', subgroup: 'ugesb', league: 'UGESB', statusDescription: '10º Lugar UGESB (+1 pt)' },
    // 11º Lugares
    { rank: 11, schoolId: 'capricho_do_centenario', schoolName: 'Capricho do Centenário', subgroup: 'fbes', league: 'FBES', statusDescription: '11º Lugar FBES (0 pts)' },
    { rank: 11, schoolId: 'paraiso_da_floresta', schoolName: 'Paraíso da Floresta', subgroup: 'ugesb', league: 'UGESB', statusDescription: '11º Lugar UGESB (0 pts)' },
    // 12º Lugares
    { rank: 12, schoolId: 'estrela_de_ouro', schoolName: 'Estrela de Ouro', subgroup: 'fbes', league: 'FBES', statusDescription: '12º Lugar FBES (0 pts)' },
    { rank: 12, schoolId: 'unidos_de_riachuelo', schoolName: 'Unidos de Riachuelo', subgroup: 'ugesb', league: 'UGESB', statusDescription: '12º Lugar UGESB (0 pts)' },
    // 13º Lugares
    { rank: 13, schoolId: 'independentes_do_rio', schoolName: 'Independentes do Rio', subgroup: 'fbes', league: 'FBES', statusDescription: '13º Lugar FBES (0 pts)' },
    { rank: 13, schoolId: 'unidos_de_terra_nova', schoolName: 'Unidos de Terra Nova', subgroup: 'ugesb', league: 'UGESB', statusDescription: '13º Lugar UGESB (0 pts)' },
    // 14º Lugares
    { rank: 14, schoolId: 'paraiso_da_mocidade', schoolName: 'Paraíso da Mocidade', subgroup: 'fbes', league: 'FBES', statusDescription: '14º Lugar FBES (0 pts)' },
    { rank: 14, schoolId: 'uniao_de_sampaio', schoolName: 'União do Sampaio', subgroup: 'ugesb', league: 'UGESB', statusDescription: '14º Lugar UGESB (0 pts)' },
    // 15º Lugares
    { rank: 15, schoolId: 'uniao_vaz_lobo', schoolName: 'União de Vaz Lobo', subgroup: 'fbes', league: 'FBES', statusDescription: '15º Lugar FBES (0 pts)' },
    { rank: 15, schoolId: 'fiquei_firme', schoolName: 'Fiquei Firme', subgroup: 'ugesb', league: 'UGESB', statusDescription: '15º Lugar UGESB (0 pts)' },
    // 16º Lugares
    { rank: 16, schoolId: 'unidos_de_santo_amaro', schoolName: 'Unidos de Santo Amaro', subgroup: 'fbes', league: 'FBES', statusDescription: '16º Lugar FBES (0 pts)' },
    // 17º Lugares
    { rank: 17, schoolId: 'unidos_do_grajau', schoolName: 'Unidos do Grajaú', subgroup: 'fbes', league: 'FBES', statusDescription: '17º Lugar FBES (0 pts)' },
    // 18º Lugares
    { rank: 18, schoolId: 'uniao_dos_casados', schoolName: 'União dos Casados', subgroup: 'fbes', league: 'FBES', statusDescription: '18º Lugar FBES (0 pts)' },
    { rank: 18, schoolId: 'unidos_do_salgueiro', schoolName: 'Unidos do Salgueiro', subgroup: 'fbes', league: 'FBES', statusDescription: '18º Lugar FBES (0 pts)' },
    // 19º Lugares
    { rank: 19, schoolId: 'unidos_do_outeiro', schoolName: 'Unidos do Outeiro', subgroup: 'fbes', league: 'FBES', statusDescription: '19º Lugar FBES (0 pts)' },
    // 20º Lugares
    { rank: 20, schoolId: 'engenho_da_rainha', schoolName: 'Acadêmicos do Engenho da Rainha', subgroup: 'fbes', league: 'FBES', statusDescription: '20º Lugar FBES (0 pts)' },
    { rank: 20, schoolId: 'vitoria_de_bento_ribeiro', schoolName: 'Vitória de Bento Ribeiro', subgroup: 'fbes', league: 'FBES', statusDescription: '20º Lugar FBES (0 pts)' },
    // 21º Lugares
    { rank: 21, schoolId: 'unidos_do_pecado', schoolName: 'Unidos do Pecado', subgroup: 'fbes', league: 'FBES', statusDescription: '21º Lugar FBES (0 pts)' },
    // 22º Lugares
    { rank: 22, schoolId: 'imperio_da_colina', schoolName: 'Império da Colina', subgroup: 'fbes', league: 'FBES', statusDescription: '22º Lugar FBES (0 pts)' },
    // 23º Lugares
    { rank: 23, schoolId: 'orgulho_de_cordovil', schoolName: 'Orgulho de Cordovil', subgroup: 'fbes', league: 'FBES', statusDescription: '23º Lugar FBES (0 pts)' },
    // 24º Lugares
    { rank: 24, schoolId: 'coracoes_unidos_da_favela', schoolName: 'Corações Unidos da Favela', subgroup: 'fbes', league: 'FBES', statusDescription: '24º Lugar FBES (0 pts)' },
    // 25º Lugares
    { rank: 25, schoolId: 'flor_do_lins', schoolName: 'Flor do Lins', subgroup: 'fbes', league: 'FBES', statusDescription: '25º Lugar FBES (0 pts)' },
    // 26º Lugares
    { rank: 26, schoolId: 'unidos_do_itambi', schoolName: 'Unidos do Itambí', subgroup: 'fbes', league: 'FBES', statusDescription: '26º Lugar FBES (0 pts)' },
    // 27º Lugares
    { rank: 27, schoolId: 'unidos_de_cosmos', schoolName: 'Unidos de Cosmos', subgroup: 'fbes', league: 'FBES', statusDescription: '27º Lugar FBES (0 pts)' },
    // 28º Lugares
    { rank: 28, schoolId: 'imperio_do_samba', schoolName: 'Império do Samba', subgroup: 'fbes', league: 'FBES', statusDescription: '28º Lugar FBES (0 pts)' },
    { rank: 28, schoolId: 'sem_voce_vivo_bem', schoolName: 'Sem Você Vivo Bem', subgroup: 'fbes', league: 'FBES', statusDescription: '28º Lugar FBES (0 pts)' },
    // 29º Lugares
    { rank: 29, schoolId: 'unidos_da_lagoa', schoolName: 'Unidos da Lagoa', subgroup: 'fbes', league: 'FBES', statusDescription: '29º Lugar FBES (0 pts)' },
    // 30º Lugares
    { rank: 30, schoolId: 'unidos_da_barao_de_petropolis', schoolName: 'Unidos da Barão de Petrópolis', subgroup: 'fbes', league: 'FBES', statusDescription: '30º Lugar FBES (0 pts)' },
    // 31º Lugares
    { rank: 31, schoolId: 'uniao_dos_topazios', schoolName: 'União dos Topázios', subgroup: 'fbes', league: 'FBES', statusDescription: '31º Lugar FBES (0 pts)' },
    // 32º Lugares
    { rank: 32, schoolId: 'unidos_dos_telegrafos', schoolName: 'Unidos dos Telégrafos', subgroup: 'fbes', league: 'FBES', statusDescription: '32º Lugar FBES (0 pts)' },
    // 33º Lugares
    { rank: 33, schoolId: 'coracoes_da_liberdade', schoolName: 'Corações da Liberdade', subgroup: 'fbes', league: 'FBES', statusDescription: '33º Lugar FBES (0 pts)' },
    // 34º Lugares
    { rank: 34, schoolId: 'de_nos_ninguem_esquece', schoolName: 'De Nós Ninguém Esquece', subgroup: 'fbes', league: 'FBES', statusDescription: '34º Lugar FBES (0 pts)' }
  ],
  1951: [
    // 1º Lugares (+20 pts)
    { rank: 1, schoolId: 'portela', schoolName: 'Portela', subgroup: 'ugesb', league: 'UGESB', statusDescription: 'Campeã UGESB (+20 pts)' },
    { rank: 1, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', subgroup: 'fbes', league: 'FBES', statusDescription: 'Campeã FBES (+20 pts)' },
    // 2º Lugares (+15 pts)
    { rank: 2, schoolId: 'tres_mosqueteiros', schoolName: 'Três Mosqueteiros', subgroup: 'ugesb', league: 'UGESB', statusDescription: 'Vice-Campeã UGESB (+15 pts)' },
    { rank: 2, schoolId: 'aprendizes_de_lucas', schoolName: 'Aprendizes de Lucas', subgroup: 'fbes', league: 'FBES', statusDescription: 'Vice-Campeã FBES (+15 pts)' },
    // 3º Lugares (+12 pts)
    { rank: 3, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', subgroup: 'ugesb', league: 'UGESB', statusDescription: '3º Lugar UGESB (+12 pts)' },
    { rank: 3, schoolId: 'filhos_do_deserto', schoolName: 'Filhos do Deserto', subgroup: 'fbes', league: 'FBES', statusDescription: '3º Lugar FBES (+12 pts)' },
    // 4º Lugares (+10 pts)
    { rank: 4, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', subgroup: 'ugesb', league: 'UGESB', statusDescription: '4º Lugar UGESB (+10 pts)' },
    { rank: 4, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', subgroup: 'fbes', league: 'FBES', statusDescription: '4º Lugar FBES (+10 pts)' },
    // 5º Lugares (+8 pts)
    { rank: 5, schoolId: 'aventureiros_da_matriz', schoolName: 'Aventureiros da Matriz', subgroup: 'ugesb', league: 'UGESB', statusDescription: '5º Lugar UGESB (+8 pts)' },
    { rank: 5, schoolId: 'unidos_da_tamarineira', schoolName: 'Unidos da Tamarineira', subgroup: 'ugesb', league: 'UGESB', statusDescription: '5º Lugar UGESB (+8 pts)' },
    { rank: 5, schoolId: 'irmaos_unidos_do_catete', schoolName: 'Irmãos Unidos do Catete', subgroup: 'fbes', league: 'FBES', statusDescription: '5º Lugar FBES (+8 pts)' },
    // 6º Lugares (+6 pts)
    { rank: 6, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', subgroup: 'ugesb', league: 'UGESB', statusDescription: '6º Lugar UGESB (+6 pts)' },
    { rank: 6, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', subgroup: 'fbes', league: 'FBES', statusDescription: '6º Lugar FBES (+6 pts)' },
    // 7º Lugares (+4 pts)
    { rank: 7, schoolId: 'coracoes_unidos_jacarepagua', schoolName: 'Corações Unidos de Jacarepaguá', subgroup: 'ugesb', league: 'UGESB', statusDescription: '7º Lugar UGESB (+4 pts)' },
    { rank: 7, schoolId: 'indios_do_acau', schoolName: 'Índios do Acaú', subgroup: 'fbes', league: 'FBES', statusDescription: '7º Lugar FBES (+4 pts)' },
    { rank: 7, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', subgroup: 'fbes', league: 'FBES', statusDescription: '7º Lugar FBES (+4 pts)' },
    // 8º Lugares (+3 pts)
    { rank: 8, schoolId: 'prazer_da_serrinha', schoolName: 'Prazer da Serrinha', subgroup: 'ugesb', league: 'UGESB', statusDescription: '8º Lugar UGESB (+3 pts)' },
    { rank: 8, schoolId: 'unidos_do_grajau', schoolName: 'Unidos do Grajaú', subgroup: 'fbes', league: 'FBES', statusDescription: '8º Lugar FBES (+3 pts)' },
    // 9º Lugares (+2 pts)
    { rank: 9, schoolId: 'recreio_de_inhauma', schoolName: 'Recreio de Inhaúma', subgroup: 'ugesb', league: 'UGESB', statusDescription: '9º Lugar UGESB (+2 pts)' },
    { rank: 9, schoolId: 'vai_se_quiser', schoolName: 'Vai Se Quiser', subgroup: 'fbes', league: 'FBES', statusDescription: '9º Lugar FBES (+2 pts)' },
    // 10º Lugares (+1 pt)
    { rank: 10, schoolId: 'cartolinhas_de_caxias', schoolName: 'Cartolinhas de Caxias', subgroup: 'ugesb', league: 'UGESB', statusDescription: '10º Lugar UGESB (+1 pt)' },
    { rank: 10, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', subgroup: 'ugesb', league: 'UGESB', statusDescription: '10º Lugar UGESB (+1 pt)' },
    { rank: 10, schoolId: 'unidos_do_morro_azul', schoolName: 'Unidos do Morro Azul', subgroup: 'ugesb', league: 'UGESB', statusDescription: '10º Lugar UGESB (+1 pt)' },
    { rank: 10, schoolId: 'uniao_vaz_lobo', schoolName: 'União de Vaz Lobo', subgroup: 'fbes', league: 'FBES', statusDescription: '10º Lugar FBES (+1 pt)' },
    // 11º Lugares
    { rank: 11, schoolId: 'independentes_de_turiacu', schoolName: 'Independentes de Turiaçu', subgroup: 'ugesb', league: 'UGESB', statusDescription: '11º Lugar UGESB (0 pts)' },
    { rank: 11, schoolId: 'depois_eu_digo', schoolName: 'Depois Eu Digo', subgroup: 'fbes', league: 'FBES', statusDescription: '11º Lugar FBES (0 pts)' },
    { rank: 11, schoolId: 'floresta_do_andarai', schoolName: 'Floresta do Andaraí', subgroup: 'fbes', league: 'FBES', statusDescription: '11º Lugar FBES (0 pts)' },
    // 12º Lugares
    { rank: 12, schoolId: 'unidos_do_coqueiro', schoolName: 'Unidos do Coqueiro', subgroup: 'ugesb', league: 'UGESB', statusDescription: '12º Lugar UGESB (0 pts)' },
    { rank: 12, schoolId: 'coracoes_unidos_da_favela', schoolName: 'Corações Unidos da Favela', subgroup: 'fbes', league: 'FBES', statusDescription: '12º Lugar FBES (0 pts)' },
    // 13º Lugares
    { rank: 13, schoolId: 'em_cima_da_hora_catumbi', schoolName: 'Em Cima da Hora do Catumbi', subgroup: 'ugesb', league: 'UGESB', statusDescription: '13º Lugar UGESB (0 pts)' },
    { rank: 13, schoolId: 'unidos_de_santo_amaro', schoolName: 'Unidos de Santo Amaro', subgroup: 'fbes', league: 'FBES', statusDescription: '13º Lugar FBES (0 pts)' },
    // 14º Lugares
    { rank: 14, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares', subgroup: 'ugesb', league: 'UGESB', statusDescription: '14º Lugar UGESB (0 pts)' },
    { rank: 14, schoolId: 'independentes_cordovil', schoolName: 'Independentes do Leblon (Independentes de Cordovil)', subgroup: 'fbes', league: 'FBES', statusDescription: '14º Lugar FBES (0 pts)' },
    // 15º Lugares
    { rank: 15, schoolId: 'embaixadores_sao_joao_meriti', schoolName: 'Embaixadores de São João de Meriti', subgroup: 'ugesb', league: 'UGESB', statusDescription: '15º Lugar UGESB (0 pts)' },
    { rank: 15, schoolId: 'engenho_da_rainha', schoolName: 'Acadêmicos do Engenho da Rainha', subgroup: 'fbes', league: 'FBES', statusDescription: '15º Lugar FBES (0 pts)' },
    // 16º Lugares
    { rank: 16, schoolId: 'nao_e_o_que_dizem', schoolName: 'Não É O Que Dizem', subgroup: 'ugesb', league: 'UGESB', statusDescription: '16º Lugar UGESB (0 pts)' },
    { rank: 16, schoolId: 'unidos_do_pecado', schoolName: 'Unidos do Pecado', subgroup: 'fbes', league: 'FBES', statusDescription: '16º Lugar FBES (0 pts)' },
    // 17º Lugares
    { rank: 17, schoolId: 'cada_ano_sai_melhor', schoolName: 'Cada Ano Sai Melhor', subgroup: 'ugesb', league: 'UGESB', statusDescription: '17º Lugar UGESB (0 pts)' },
    { rank: 17, schoolId: 'independentes_do_rio', schoolName: 'Independentes do Rio', subgroup: 'fbes', league: 'FBES', statusDescription: '17º Lugar FBES (0 pts)' },
    // 18º Lugares
    { rank: 18, schoolId: 'unidos_do_jacare', schoolName: 'Unidos do Jacaré', subgroup: 'ugesb', league: 'UGESB', statusDescription: '18º Lugar UGESB (0 pts)' },
    { rank: 18, schoolId: 'unidos_do_outeiro', schoolName: 'Unidos do Outeiro', subgroup: 'fbes', league: 'FBES', statusDescription: '18º Lugar FBES (0 pts)' },
    // 19º Lugares
    { rank: 19, schoolId: 'unidos_do_indaia', schoolName: 'Unidos do Indaiá', subgroup: 'ugesb', league: 'UGESB', statusDescription: '19º Lugar UGESB (0 pts)' },
    { rank: 19, schoolId: 'estrela_de_ouro', schoolName: 'Estrela de Ouro', subgroup: 'fbes', league: 'FBES', statusDescription: '19º Lugar FBES (0 pts)' },
    // 20º Lugares
    { rank: 20, schoolId: 'guarani_de_realengo', schoolName: 'Guarani de Realengo', subgroup: 'ugesb', league: 'UGESB', statusDescription: '20º Lugar UGESB (0 pts)' },
    { rank: 20, schoolId: 'unidos_de_cordovil', schoolName: 'Unidos de Cordovil', subgroup: 'fbes', league: 'FBES', statusDescription: '20º Lugar FBES (0 pts)' },
    // 21º ao 30º Lugares FBES
    { rank: 21, schoolId: 'unidos_do_itambi', schoolName: 'Unidos do Itambí', subgroup: 'fbes', league: 'FBES', statusDescription: '21º Lugar FBES (0 pts)' },
    { rank: 22, schoolId: 'capricho_do_centenario', schoolName: 'Capricho do Centenário', subgroup: 'fbes', league: 'FBES', statusDescription: '22º Lugar FBES (0 pts)' },
    { rank: 23, schoolId: 'unidos_dos_arcos', schoolName: 'Unidos dos Arcos', subgroup: 'fbes', league: 'FBES', statusDescription: '23º Lugar FBES (0 pts)' },
    { rank: 24, schoolId: 'paraiso_do_grotao', schoolName: 'Paraíso do Grotão', subgroup: 'fbes', league: 'FBES', statusDescription: '24º Lugar FBES (0 pts)' },
    { rank: 25, schoolId: 'mocidade_de_um_paraiso', schoolName: 'Mocidade de Um Paraíso', subgroup: 'fbes', league: 'FBES', statusDescription: '25º Lugar FBES (0 pts)' },
    { rank: 26, schoolId: 'vitoria_de_bento_ribeiro', schoolName: 'Vitória de Bento Ribeiro', subgroup: 'fbes', league: 'FBES', statusDescription: '26º Lugar FBES (0 pts)' },
    { rank: 27, schoolId: 'unidos_dos_telegrafos', schoolName: 'Unidos dos Telégrafos', subgroup: 'fbes', league: 'FBES', statusDescription: '27º Lugar FBES (0 pts)' },
    { rank: 28, schoolId: 'trovadores_do_maracana', schoolName: 'Trovadores do Maracanã', subgroup: 'fbes', league: 'FBES', statusDescription: '28º Lugar FBES (0 pts)' },
    { rank: 29, schoolId: 'uniao_dos_casados', schoolName: 'União dos Casados', subgroup: 'fbes', league: 'FBES', statusDescription: '29º Lugar FBES (0 pts)' },
    { rank: 30, schoolId: 'flor_do_lins', schoolName: 'Flor do Lins', subgroup: 'fbes', league: 'FBES', statusDescription: '30º Lugar FBES (0 pts)' },
    { rank: 30, schoolId: 'unidos_de_campo_grande', schoolName: 'Unidos de Campo Grande', subgroup: 'fbes', league: 'FBES', statusDescription: '30º Lugar FBES (0 pts)' }
  ],
  1952: CARNAVAL_1952_OFICIAL,
  1953: [
    { rank: 1, schoolId: 'portela', schoolName: 'Portela', statusDescription: 'Campeã Oficial (+20 pts)' },
    { rank: 2, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: 'Vice-Campeã Oficial (+15 pts)' },
    { rank: 3, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', statusDescription: '3º Lugar (+12 pts)' },
    { rank: 4, schoolId: 'aprendizes_de_lucas', schoolName: 'Aprendizes de Lucas', statusDescription: '4º Lugar (+10 pts)' },
    { rank: 5, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', statusDescription: '5º Lugar (+8 pts)' },
    { rank: 6, schoolId: 'unidos_do_salgueiro', schoolName: 'Unidos do Salgueiro', statusDescription: '6º Lugar (+6 pts)' },
    { rank: 7, schoolId: 'filhos_do_deserto', schoolName: 'Filhos do Deserto', statusDescription: '7º Lugar (+4 pts)' },
    { rank: 8, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', statusDescription: '8º Lugar (+3 pts)' },
    { rank: 9, schoolId: 'tres_mosqueteiros', schoolName: 'Três Mosqueteiros', statusDescription: '9º Lugar (+2 pts)' },
    { rank: 10, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', statusDescription: '10º Lugar (+1 pt)' },
    { rank: 11, schoolId: 'floresta_do_andarai', schoolName: 'Floresta do Andaraí', statusDescription: '11º Lugar (0 pts)' },
    { rank: 12, schoolId: 'unidos_da_tamarineira', schoolName: 'Unidos da Tamarineira', statusDescription: '12º Lugar (0 pts)' },
    { rank: 13, schoolId: 'depois_eu_digo', schoolName: 'Depois Eu Digo', statusDescription: '13º Lugar (0 pts)' },
    { rank: 14, schoolId: 'unidos_do_indaia', schoolName: 'Unidos do Indaiá', statusDescription: '14º Lugar (0 pts)' },
    { rank: 15, schoolId: 'uniao_do_catete', schoolName: 'União do Catete', statusDescription: '15º Lugar (0 pts)' },
    { rank: 16, schoolId: 'indios_do_acau', schoolName: 'Índios do Acaú', statusDescription: '16º Lugar (0 pts)' },
    { rank: 17, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', statusDescription: '17º Lugar (0 pts)' },
    { rank: 18, schoolId: 'vai_se_quiser', schoolName: 'Vai Se Quiser', statusDescription: '18º Lugar (0 pts • Rebaixada)' },
    { rank: 19, schoolId: 'cada_ano_sai_melhor', schoolName: 'Cada Ano Sai Melhor', statusDescription: '19º Lugar (0 pts • Rebaixada)' },
    { rank: 20, schoolId: 'aventureiros_da_matriz', schoolName: 'Aventureiros da Matriz', statusDescription: '20º Lugar (0 pts • Rebaixada)' },
    { rank: 21, schoolId: 'azul_e_branco_salgueiro', schoolName: 'Azul e Branco do Salgueiro', statusDescription: '21º Lugar (0 pts • Rebaixada)' },
    { rank: 0, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', statusDescription: 'Hors Concours (Sem julgamento oficial)', isHorsConcours: true }
  ],
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
    { rank: 13, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: '13ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true },
    { rank: 14, schoolId: 'sao_clemente', schoolName: 'São Clemente', statusDescription: '14ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
    { rank: 13, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', statusDescription: '13ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true },
    { rank: 14, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra', statusDescription: '14ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
    { rank: 13, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador', statusDescription: '13ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true },
    { rank: 14, schoolId: 'tuiuti', schoolName: 'Paraíso do Tuiuti', statusDescription: '14ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
    { rank: 14, schoolId: 'sao_clemente', schoolName: 'São Clemente', statusDescription: '14ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
    { rank: 14, schoolId: 'santa_cruz', schoolName: 'Acadêmicos de Santa Cruz', statusDescription: '14ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
    { rank: 14, schoolId: 'sao_clemente', schoolName: 'São Clemente', statusDescription: '14ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
    { rank: 14, schoolId: 'tradicao', schoolName: 'Tradição', statusDescription: '14ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
    { rank: 13, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares', statusDescription: '13ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true },
    { rank: 14, schoolId: 'rocinha', schoolName: 'Acadêmicos da Rocinha', statusDescription: '14ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
    { rank: 12, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: '12ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true },
    { rank: 13, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá', statusDescription: '13ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
    { rank: 12, schoolId: 'sao_clemente', schoolName: 'São Clemente', statusDescription: '12ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
    { rank: 12, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: '12ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
    { rank: 12, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro', statusDescription: '12ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
    { rank: 12, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra', statusDescription: '12ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true },
    { rank: 13, schoolId: 'renascer_jacarepagua', schoolName: 'Renascer de Jacarepaguá', statusDescription: '13ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
    { rank: 12, schoolId: 'inocentes', schoolName: 'Inocentes de Belford Roxo', statusDescription: '12ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
    { rank: 12, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', statusDescription: '12ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
    { rank: 12, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro', statusDescription: '12ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
    { rank: 12, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá', statusDescription: '12ª (rebaixada) • Rebaixada para a Série Ouro' }
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
    { rank: 13, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', statusDescription: '13ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true },
    { rank: 14, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: '14ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
    { rank: 12, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá', statusDescription: '12ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true },
    { rank: 13, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador', statusDescription: '13ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
    { rank: 12, schoolId: 'sao_clemente', schoolName: 'São Clemente', statusDescription: '12ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
    { rank: 12, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', statusDescription: '12ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
    { rank: 12, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra', statusDescription: '12ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
    { rank: 12, schoolId: 'unidos_padre_miguel', schoolName: 'Unidos de Padre Miguel', statusDescription: '12ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
    { rank: 12, schoolId: 'niteroi', schoolName: 'Acadêmicos de Niterói', statusDescription: '12ª (rebaixada) • Rebaixada para a Série Ouro', relegated: true }
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
  league?: string;
  statusDescription?: string;
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
  relegatedNames: string[];
  promotedNames?: string[];
  totalSchools: number;
  subgroups?: {
    domingo?: LiesaStandingRecord[];
    segunda?: LiesaStandingRecord[];
    supercampeonato?: LiesaStandingRecord[];
    fbes?: LiesaStandingRecord[];
    uces?: LiesaStandingRecord[];
    ugesb?: LiesaStandingRecord[];
    o_pais?: LiesaStandingRecord[];
    a_hora?: LiesaStandingRecord[];
  };
}

/**
 * Catálogo cronológico oficial de rebaixamentos do Grupo Especial por ano
 */
export const OFFICIAL_ESPECIAL_RELEGATIONS_BY_YEAR: Record<number, string[]> = {
  2026: ['niteroi'],
  2025: ['unidos_padre_miguel'],
  2024: ['porto_da_pedra'],
  2023: ['imperio_serrano'],
  2022: ['sao_clemente'],
  2021: [], // Não houve carnaval
  2020: ['estacio_de_sa', 'uniao_da_ilha'],
  2019: ['imperatriz', 'imperio_serrano'],
  2018: [], // Não houve rebaixamento
  2017: [], // Não houve rebaixamento
  2016: ['estacio_de_sa'],
  2015: ['viradouro'],
  2014: ['imperio_da_tijuca'],
  2013: ['inocentes'],
  2012: ['porto_da_pedra', 'renascer', 'renascer_jacarepagua'],
  2011: [], // Não houve rebaixamento
  2010: ['viradouro'],
  2009: ['imperio_serrano'],
  2008: ['sao_clemente'],
  2007: ['imperio_serrano', 'estacio_de_sa'],
  2006: ['caprichosos_de_pilares', 'rocinha'],
  2005: ['tradicao'],
  2004: ['sao_clemente'],
  2003: ['santa_cruz'],
  2002: ['sao_clemente'],
  2001: ['uniao_da_ilha', 'tuiuti'],
  2000: ['vila_isabel', 'porto_da_pedra'],
  1999: ['imperio_serrano', 'sao_clemente'],
  1998: ['tijuca', 'porto_da_pedra'],
  1997: ['estacio_de_sa', 'santa_cruz', 'imperio_serrano', 'rocinha'],
  1996: ['caprichosos_de_pilares', 'tradicao', 'imperio_da_tijuca', 'unidos_da_ponte'],
  1995: ['sao_clemente', 'villa_rica'],
  1994: [],
  1993: [],
  1992: ['leao_de_nova_iguacu', 'tradicao', 'santa_cruz'],
  1991: ['sao_clemente', 'lins_imperial', 'imperio_serrano', 'grande_rio'],
  1990: ['santa_cruz', 'cabucu'],
  1989: ['unidos_da_ponte', 'tradicao', 'arranco', 'jacarezinho'],
  1988: [],
  1987: ['jacarezinho', 'imperio_da_tijuca'],
  1986: ['tijuca', 'unidos_da_ponte'],
  1985: ['em_cima_da_hora', 'santa_cruz'],
  1984: ['tijuca', 'unidos_da_ponte'],
  1983: [],
  1982: ['imperio_da_tijuca', 'estacio_de_sa'],
  1981: [],
  1980: ['estacio_de_sa'],
  1979: [],
  1978: ['imperio_serrano', 'vila_isabel', 'arrastao_cascadura', 'arranco'],
  1977: ['imperatriz', 'estacio_de_sa', 'imperio_da_tijuca', 'cabucu'],
  1976: ['lins_imperial', 'unidos_de_lucas', 'em_cima_da_hora', 'tupy_bras_de_pina'],
  1975: [],
  1974: [],
  1973: ['tupy_bras_de_pina', 'jacarezinho'],
  1972: ['estacio_de_sa', 'imperio_da_tijuca', 'unidos_de_lucas', 'unidos_padre_miguel'],
  1971: [],
  1970: ['jacarezinho', 'santa_cruz'],
  1969: ['unidos_de_lucas', 'em_cima_da_hora'],
  1968: ['independentes_cordovil', 'imperio_da_tijuca'],
  1967: ['imperatriz', 'sao_clemente'],
  1966: ['unidos_da_capela', 'santa_cruz'],
  1965: ['uniao_de_jacarepagua', 'imperatriz'],
  1964: ['unidos_padre_miguel', 'cabucu'],
  1963: ['unidos_de_bangu', 'beija_flor'],
  1962: ['unidos_da_capela', 'tupy_bras_de_pina'],
  1961: ['caprichosos_de_pilares', 'unidos_padre_miguel', 'academicos_bento_ribeiro'],
  1960: ['beija_flor', 'aprendizes_boca_do_mato', 'unidos_de_bangu'],
  1959: ['caprichosos_de_pilares', 'cartolinhas_de_caxias', 'uniao_do_centenario', 'tupy_bras_de_pina', 'cabucu', 'tuiuti', 'tijuca', 'unidos_do_salgueiro'],
  1958: ['unidos_bento_ribeiro', 'flor_do_lins', 'filhos_do_deserto'],
  1957: ['vila_isabel', 'tuiuti', 'paz_e_amor'],
  1956: ['unidos_da_congonha', 'unidos_do_indaia', 'unidos_do_salgueiro'],
  1955: ['indios_do_acau', 'imperio_da_tijuca', 'uniao_do_catete'],
  1954: ['engenho_da_rainha', 'aventureiros_da_matriz', 'paz_e_amor', 'unidos_da_tamarineira', 'independentes_do_rio', 'independentes_cordovil', 'uniao_vaz_lobo'],
  1953: ['vai_se_quiser', 'cada_ano_sai_melhor', 'aventureiros_da_matriz', 'azul_e_branco_salgueiro']
};

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
  if (nameNorm.includes('capricho do engenho novo')) return 'capricho_do_engenho_novo';
  if (nameNorm.includes('estrela da tijuca')) return 'estrela_da_tijuca';
  if (nameNorm === 'tuiuti' || nameNorm.includes('escola de samba tuiuti') || nameNorm.includes('escola tuiuti')) return 'escola_tuiuti';
  if (nameNorm.includes('viradouro')) return 'viradouro';
  if (nameNorm.includes('beija-flor') || nameNorm.includes('beija flor') || nameNorm.includes('beija_flor')) return 'beija_flor';
  if (nameNorm.includes('grande rio')) return 'grande_rio';
  if (nameNorm.includes('imperatriz')) return 'imperatriz';
  if (nameNorm.includes('vila isabel')) return 'vila_isabel';
  if (nameNorm.includes('unidos do salgueiro')) return 'unidos_do_salgueiro';
  if (nameNorm.includes('azul e branco') && nameNorm.includes('salgueiro')) return 'azul_e_branco_salgueiro';
  if (nameNorm.includes('salgueiro')) return 'salgueiro';
  if (nameNorm.includes('unidos da mangueira') || nameNorm.includes('unidos_da_mangueira')) return 'unidos_da_mangueira';
  if (nameNorm.includes('mangueira') || nameNorm.includes('estação primeira') || nameNorm.includes('estacao primeira')) return 'mangueira';
  if (nameNorm.includes('portela')) return 'portela';
  if (nameNorm.includes('império da tijuca') || nameNorm.includes('imperio da tijuca')) return 'imperio_da_tijuca';
  if (nameNorm.includes('tijuca') && !nameNorm.includes('barra')) return 'tijuca';
  if (nameNorm.includes('unidos do tuiuti') || nameNorm.includes('unidos_do_tuiuti')) return 'unidos_do_tuiuti';
  if (nameNorm.includes('tuiuti')) return 'tuiuti';
  if (nameNorm.includes('paraiso da mocidade') || nameNorm.includes('paraíso da mocidade')) return 'paraiso_da_mocidade';
  if (nameNorm.includes('prazer da mocidade')) return 'prazer_da_mocidade';
  if (nameNorm.includes('mocidade de um paraíso') || nameNorm.includes('mocidade de um paraiso')) return 'mocidade_de_um_paraiso';
  if (nameNorm.includes('acadêmicos do cachambi') || nameNorm.includes('academicos do cachambi')) return 'academicos_do_cachambi';
  if (nameNorm.includes('mocidade de cachambi') || nameNorm.includes('cachambi')) return 'mocidade_de_cachambi';
  if (nameNorm.includes('união da mocidade') || nameNorm.includes('uniao da mocidade')) return 'uniao_da_mocidade';
  if (nameNorm.includes('modelo unidos do riachuelo') || nameNorm.includes('mocidade unidos do riachuelo')) return 'mocidade_unidos_do_riachuelo';
  if (nameNorm.includes('mocidade') && !nameNorm.includes('cidade de deus') && !nameNorm.includes('porto') && !nameNorm.includes('vicente')) return 'mocidade';
  if (nameNorm.includes('niterói') || nameNorm.includes('niteroi')) return 'niteroi';
  if (nameNorm.includes('porto da pedra')) return 'porto_da_pedra';
  if (nameNorm.includes('padre miguel') && nameNorm.includes('unidos de')) return 'unidos_padre_miguel';
  if (nameNorm.includes('império serrano') || nameNorm.includes('imperio serrano')) return 'imperio_serrano';
  if (nameNorm.includes('são clemente') || nameNorm.includes('sao clemente')) return 'sao_clemente';
  if (nameNorm.includes('recreio de são carlos') || nameNorm.includes('recreio de sao carlos')) return 'recreio_de_sao_carlos';
  if (nameNorm.includes('segunda linha')) return 'segunda_linha_do_estacio';
  if (nameNorm.includes('estácio') || nameNorm.includes('estacio') || nameNorm.includes('são carlos') || nameNorm.includes('sao carlos')) return 'estacio_de_sa';
  if (nameNorm.includes('ilha do governador') || nameNorm.includes('união da ilha') || nameNorm.includes('uniao da ilha')) return 'uniao_da_ilha';
  if (nameNorm.includes('inocentes')) return 'inocentes';
  if (nameNorm.includes('renascer')) return 'renascer_jacarepagua';
  if (nameNorm.includes('caprichosos')) return 'caprichosos_de_pilares';
  if (nameNorm.includes('capricho do centenário') || nameNorm.includes('capricho do centenario') || nameNorm.includes('capricho')) return 'capricho_do_centenario';
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
  if (nameNorm.includes('unidos do jacaré') || nameNorm.includes('unidos do jacare')) return 'unidos_do_jacare';
  if (nameNorm.includes('jacarezinho')) return 'jacarezinho';
  if (nameNorm.includes('jacarepaguá') || nameNorm.includes('jacarepagua')) return 'uniao_de_jacarepagua';
  if (nameNorm.includes('capela')) return 'unidos_da_capela';
  if (nameNorm.includes('boca do mato')) return 'aprendizes_boca_do_mato';
  if (nameNorm.includes('bangu')) return 'unidos_de_bangu';
  if (nameNorm.includes('vitória de bento ribeiro') || nameNorm.includes('vitoria de bento ribeiro')) return 'vitoria_de_bento_ribeiro';
  if (nameNorm.includes('bento ribeiro')) return 'academicos_bento_ribeiro';
  if (nameNorm.includes('aprendizes')) return 'aprendizes_de_lucas';
  if (nameNorm.includes('orgulho de cordovil')) return 'orgulho_de_cordovil';
  if (nameNorm.includes('unidos de cordovil')) return 'unidos_de_cordovil';
  if (nameNorm.includes('leblon') || nameNorm.includes('cordovil')) return 'independentes_cordovil';
  if (nameNorm.includes('parada de lucas')) return 'uniao_parada_de_lucas';
  if (nameNorm.includes('lucas')) return 'unidos_de_lucas';
  if (nameNorm.includes('flor da infância') || nameNorm.includes('flor da infancia')) return 'flor_da_infancia_bras_de_pina';
  if (nameNorm.includes('unidos de brás de pina') || nameNorm.includes('unidos de bras de pina')) return 'unidos_de_bras_de_pina';
  if (nameNorm.includes('união de brás de pina') || nameNorm.includes('uniao de bras de pina')) return 'uniao_de_bras_de_pina';
  if (nameNorm.includes('tupy') || nameNorm.includes('brás de pina') || nameNorm.includes('bras de pina')) return 'tupy_bras_de_pina';
  if (nameNorm.includes('em cima da hora do catumbi') || nameNorm.includes('catumbi')) return 'em_cima_da_hora_catumbi';
  if (nameNorm.includes('cima da hora')) return 'em_cima_da_hora';
  if (nameNorm.includes('filhos do deserto') || nameNorm.includes('filhos_do_deserto')) return 'filhos_do_deserto';
  if (nameNorm.includes('indios do acau') || nameNorm.includes('índios do acaú')) return 'indios_do_acau';
  if (nameNorm.includes('irmãos unidos do catete') || nameNorm.includes('irmaos unidos do catete')) return 'irmaos_unidos_do_catete';
  if (nameNorm.includes('unidos do catete') || nameNorm.includes('catete velho')) return 'unidos_do_catete';
  if (nameNorm.includes('catete')) return 'uniao_do_catete';
  if (nameNorm.includes('vai se quiser')) return 'vai_se_quiser';
  if (nameNorm.includes('congonha')) return 'unidos_da_congonha';
  if (nameNorm.includes('centenário') || nameNorm.includes('centenario')) return 'uniao_do_centenario';
  if (nameNorm.includes('cartolinhas')) return 'cartolinhas_de_caxias';
  if (nameNorm.includes('flor do lins')) return 'flor_do_lins';
  if (nameNorm.includes('paz e amor')) return 'paz_e_amor';
  if (nameNorm.includes('indaia') || nameNorm.includes('indaiá')) return 'unidos_do_indaia';
  if (nameNorm.includes('corações da liberdade') || nameNorm.includes('coracoes da liberdade')) return 'coracoes_da_liberdade';
  if (nameNorm.includes('corações unidos da favela') || nameNorm.includes('coracoes unidos da favela')) return 'coracoes_unidos_da_favela';
  if (nameNorm.includes('corações unidos') || nameNorm.includes('coracoes unidos')) return 'coracoes_unidos_jacarepagua';
  if (nameNorm.includes('baianinhas')) return 'baianinhas_brasileiras';
  if (nameNorm.includes('baianas')) return 'paraiso_das_baianas';
  if (nameNorm.includes('aventureiros')) return 'aventureiros_da_matriz';
  if (nameNorm.includes('grajaú') || nameNorm.includes('grajau')) return 'unidos_do_grajau';
  if (nameNorm.includes('paraiso da floresta') || nameNorm.includes('paraíso da floresta')) return 'paraiso_da_floresta';
  if (nameNorm.includes('floresta')) return 'floresta_do_andarai';
  if (nameNorm.includes('tamarineira')) return 'unidos_da_tamarineira';
  if (nameNorm.includes('engenho velho')) return 'unidos_do_engenho_velho';
  if (nameNorm.includes('engenho da rainha')) return 'engenho_da_rainha';
  if (nameNorm.includes('vaz lobo')) return 'uniao_vaz_lobo';
  if (nameNorm.includes('independentes do rio')) return 'independentes_do_rio';
  if (nameNorm.includes('três mosqueteiros') || nameNorm.includes('tres mosqueteiros')) return 'tres_mosqueteiros';
  if (nameNorm.includes('depois eu digo')) return 'depois_eu_digo';
  if (nameNorm.includes('cada ano sai melhor')) return 'cada_ano_sai_melhor';
  if (nameNorm.includes('unidos do pecado') || nameNorm.includes('pecado')) return 'unidos_do_pecado';
  if (nameNorm.includes('combinado do amor') || nameNorm.includes('combinado')) return 'combinado_do_amor';
  if (nameNorm.includes('santo amaro')) return 'unidos_de_santo_amaro';
  if (nameNorm.includes('outeiro')) return 'unidos_do_outeiro';
  if (nameNorm.includes('estrela de ouro')) return 'estrela_de_ouro';
  if (nameNorm.includes('itambí') || nameNorm.includes('itambi')) return 'unidos_do_itambi';
  if (nameNorm.includes('arcos')) return 'unidos_dos_arcos';
  if (nameNorm.includes('grotão') || nameNorm.includes('grotao')) return 'paraiso_do_grotao';
  if (nameNorm.includes('telégrafos') || nameNorm.includes('telegrafos')) return 'unidos_dos_telegrafos';
  if (nameNorm.includes('trovadores')) return 'trovadores_do_maracana';
  if (nameNorm.includes('união dos casados') || nameNorm.includes('uniao dos casados')) return 'uniao_dos_casados';
  if (nameNorm.includes('império de campo grande') || nameNorm.includes('imperio de campo grande')) return 'imperio_de_campo_grande';
  if (nameNorm.includes('paraíso de campo grande') || nameNorm.includes('paraiso de campo grande')) return 'paraiso_de_campo_grande';
  if (nameNorm.includes('campo grande')) return 'unidos_de_campo_grande';
  if (nameNorm.includes('recreio de inhaúma') || nameNorm.includes('recreio de inhauma') || nameNorm.includes('inhaúma') || nameNorm.includes('inhauma')) return 'recreio_de_inhauma';
  if (nameNorm.includes('morro azul')) return 'unidos_do_morro_azul';
  if (nameNorm.includes('independentes de turiaçu') || nameNorm.includes('independentes de turiacu')) return 'independentes_de_turiacu';
  if (nameNorm.includes('turiaçu') || nameNorm.includes('turiacu')) return 'unidos_de_turiacu';
  if (nameNorm.includes('coqueiro')) return 'unidos_do_coqueiro';
  if (nameNorm.includes('embaixadores')) return 'embaixadores_sao_joao_meriti';
  if (nameNorm.includes('não é o que dizem') || nameNorm.includes('nao e o que dizem')) return 'nao_e_o_que_dizem';
  if (nameNorm.includes('império da colina') || nameNorm.includes('imperio da colina') || nameNorm.includes('colina')) return 'imperio_da_colina';
  if (nameNorm.includes('império do samba') || nameNorm.includes('imperio do samba')) return 'imperio_do_samba';
  if (nameNorm.includes('sem você vivo bem') || nameNorm.includes('sem voce vivo bem')) return 'sem_voce_vivo_bem';
  if (nameNorm.includes('lagoa')) return 'unidos_da_lagoa';
  if (nameNorm.includes('barão de petrópolis') || nameNorm.includes('barao de petropolis') || nameNorm.includes('petrópolis') || nameNorm.includes('petropolis')) return 'unidos_da_barao_de_petropolis';
  if (nameNorm.includes('topázios') || nameNorm.includes('topazios')) return 'uniao_dos_topazios';
  if (nameNorm.includes('de nós ninguém esquece') || nameNorm.includes('de nos ninguem esquece') || nameNorm.includes('ninguém esquece') || nameNorm.includes('ninguem esquece')) return 'de_nos_ninguem_esquece';
  if (nameNorm.includes('união do realengo') || nameNorm.includes('uniao do realengo') || nameNorm.includes('realengo')) return 'uniao_do_realengo';
  if (nameNorm.includes('riachuelo')) return 'unidos_de_riachuelo';
  if (nameNorm.includes('orion') || nameNorm.includes('órion')) return 'voz_do_orion';
  if (nameNorm.includes('prazer da serrinha')) return 'prazer_da_serrinha';
  if (nameNorm.includes('terra nova')) return 'unidos_de_terra_nova';
  if (nameNorm.includes('sampaio')) return 'uniao_de_sampaio';
  if (nameNorm.includes('fiquei firme')) return 'fiquei_firme';
  if (nameNorm.includes('guarani')) return 'guarani_de_realengo';
  if (nameNorm.includes('manda quem pode')) return 'manda_quem_pode';
  if (nameNorm.includes('paraíso das morenas') || nameNorm.includes('paraiso das morenas')) return 'paraiso_das_morenas';
  if (nameNorm.includes('bonsucesso')) return 'azul_e_branco_de_bonsucesso';
  if (nameNorm.includes('união primeira') || nameNorm.includes('uniao primeira')) return 'uniao_primeira';
  if (nameNorm.includes('boêmios do andaraí') || nameNorm.includes('boemios do andarai')) return 'boemios_do_andarai';
  if (nameNorm.includes('império do andaraí') || nameNorm.includes('imperio do andarai')) return 'imperio_do_andarai';
  if (nameNorm.includes('tomás coelho') || nameNorm.includes('tomas coelho')) return 'unidos_de_tomas_coelho';
  if (nameNorm.includes('irajá') || nameNorm.includes('iraja')) return 'unidos_do_iraja';
  if (nameNorm.includes('coração das morenas') || nameNorm.includes('coracao das morenas')) return 'coracao_das_morenas';
  if (nameNorm.includes('cavalcante')) return 'unidos_de_cavalcante';
  if (nameNorm.includes('inimigos da tristeza') || nameNorm.includes('inimigos_da_tristeza')) return 'inimigos_da_tristeza';
  if (nameNorm.includes('unidos do castelo') || nameNorm.includes('castelo')) return 'unidos_do_castelo';
  if (nameNorm.includes('lira do amor')) return 'lira_do_amor';
  if (nameNorm.includes('escalão de tupã') || nameNorm.includes('escalao de tupa')) return 'escalao_de_tupa';
  if (nameNorm.includes('cenáculo do samba') || nameNorm.includes('cenaculo do samba')) return 'cenaculo_do_samba';
  if (nameNorm.includes('aprendizes de copacabana')) return 'aprendizes_de_copacabana';
  if (nameNorm.includes('acadêmicos da gávea') || nameNorm.includes('academicos da gavea')) return 'academicos_da_gavea';
  if (nameNorm.includes('mocidade louca')) return 'mocidade_louca_sao_cristovao';
  if (nameNorm.includes('deixa malhar')) return 'deixa_malhar';
  if (nameNorm.includes('papagaio')) return 'papagaio_linguarudo';
  if (nameNorm.includes('anchieta')) return 'paraiso_de_anchieta';
  if (nameNorm.includes('colégio') || nameNorm.includes('colegio')) return 'uniao_de_colegio';
  if (nameNorm.includes('barão da gamboa') || nameNorm.includes('barao da gamboa') || nameNorm.includes('gamboa')) return 'uniao_barao_da_gamboa';
  if (nameNorm.includes('última hora') || nameNorm.includes('ultima hora')) return 'ultima_hora';
  if (nameNorm.includes('união de madureira') || nameNorm.includes('uniao de madureira')) return 'uniao_de_madureira';
  if (nameNorm.includes('rocha miranda')) return 'unidos_de_rocha_miranda';
  if (nameNorm.includes('rainha das pretas')) return 'rainha_das_pretas';
  if (nameNorm.includes('entre nós') || nameNorm.includes('entre nos')) return 'uniao_entre_nos';
  if (nameNorm.includes('na hora é que se vê') || nameNorm.includes('na hora e que se ve')) return 'na_hora_e_que_se_ve';
  if (nameNorm.includes('recreio de ramos')) return 'recreio_de_ramos';
  if (nameNorm.includes('vizinha faladeira') || nameNorm.includes('vizinha')) return 'vizinha_faladeira';
  if (nameNorm.includes('depois te explico')) return 'depois_te_explico';
  if (nameNorm.includes('uruguai') || nameNorm.includes('uruguay')) return 'uniao_do_uruguai';
  if (nameNorm.includes('ninguém se lembra') || nameNorm.includes('ninguem se lembra')) return 'de_mim_ninguem_se_lembra';
  if (nameNorm.includes('para o ano sai melhor')) return 'para_o_ano_sai_melhor';
  if (nameNorm.includes('fale quem quizer') || nameNorm.includes('fale quem quiser')) return 'fale_quem_quizer';
  if (nameNorm.includes('sapê') || nameNorm.includes('sape')) return 'uniao_do_sape';
  if (nameNorm.includes('saúde') || nameNorm.includes('saude')) return 'unidos_da_saude';
  if (nameNorm.includes('filhos de ninguém') || nameNorm.includes('filhos de ninguem')) return 'filhos_de_ninguem';
  if (nameNorm.includes('união do amor') || nameNorm.includes('uniao do amor')) return 'uniao_do_amor';
  if (nameNorm.includes('capricho do engenho novo')) return 'capricho_do_engenho_novo';
  if (nameNorm.includes('é assim que nós queremos') || nameNorm.includes('e assim que nos queremos')) return 'e_assim_que_nos_queremos';
  if (nameNorm.includes('é o que se vê') || nameNorm.includes('e o que se ve')) return 'e_o_que_se_ve';
  if (nameNorm.includes('amizade do realengo')) return 'amizade_do_realengo';
  if (nameNorm.includes('estrela da tijuca')) return 'estrela_da_tijuca';
  if (nameNorm.includes('lá essas coisas') || nameNorm.includes('la essas coisas')) return 'nos_nao_somos_la_essas_coisas';
  if (nameNorm.includes('podia ser pior')) return 'podia_ser_pior';
  if (nameNorm.includes('príncipes da floresta') || nameNorm.includes('principes da floresta')) return 'principes_da_floresta';
  if (nameNorm.includes('guarany') || nameNorm.includes('sport club') || nameNorm.includes('sport clube')) return 'sport_club_guarany';
  if (nameNorm === 'tuiuti' || nameNorm.includes('escola de samba tuiuti')) return 'escola_tuiuti';
  if (nameNorm.includes('vai como pode')) return 'portela';
  return nameNorm.replace(/[^a-z0-9]/g, '_');
}

/**
 * Retorna lista de carnavais históricos com resultados oficiais catalogados (1932 a 2026 + save)
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
    const relegated = h.especialRelegated || [];
    result.push({
      year: h.year,
      standings: stands.map((s) => {
        const isRelegated = relegated.includes(s.schoolName) || (!!s.schoolId && relegated.includes(s.schoolId));
        return {
          rank: s.rank,
          schoolId: resolveSchoolId(s.schoolId, s.schoolName),
          schoolName: s.schoolName,
          totalScore: s.totalScore,
          relegated: isRelegated,
          statusDescription: isRelegated ? `${s.rank}ª (rebaixada) • Rebaixada para a Série Ouro` : undefined
        };
      }),
      isNoCarnaval: false,
      notes: `Carnaval simulado durante o save (Ano ${h.year}).`,
      championNames: champs,
      viceChampionNames: vices,
      relegatedNames: relegated,
      totalSchools: stands.length
    });
  });

  // Anos oficiais catalogados (2026 descendo até 1932)
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
    1959, 1958, 1957, 1956, 1955, 1954, 1953, 1952, 1951, 1950, 1949, 1948, 1947, 1946, 1945, 1944, 1943, 1942, 1941, 1940, 1939, 1938, 1937, 1936, 1935, 1934, 1933, 1932
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
        relegatedNames: [],
        totalSchools: 0
      });
      return;
    }

    const champs = stands.filter((s) => s.rank === 1 && !s.isHorsConcours).map((s) => s.schoolName);
    const vices = stands.filter((s) => s.rank === 2 && !s.isHorsConcours).map((s) => s.schoolName);

    const relsForYear = OFFICIAL_ESPECIAL_RELEGATIONS_BY_YEAR[yr] || [];
    const standsWithStatus = stands.map((s) => {
      const isRelegated =
        s.relegated === true ||
        relsForYear.includes(s.schoolId) ||
        (s.statusDescription && s.statusDescription.toLowerCase().includes('rebaixada')) ||
        false;
      return {
        ...s,
        relegated: isRelegated,
        statusDescription: isRelegated
          ? (s.statusDescription || `${s.rank}ª (rebaixada) • Rebaixada para a Série Ouro`)
          : s.statusDescription
      };
    });
    const relNames = standsWithStatus.filter((s) => s.relegated).map((s) => s.schoolName);

    let notes: string | undefined;
    if (yr === 2026) {
      notes = 'Carnaval 2026: Unidos do Viradouro conquistou o campeonato com 20 pontos e Beija-Flor foi vice-campeã com 15 pontos. Acadêmicos de Niterói rebaixada para a Série Ouro.';
    } else if (yr === 2025) {
      notes = 'Carnaval 2025: Beija-Flor de Nilópolis conquistou o campeonato com 20 pontos e Grande Rio foi vice-campeã com 15 pontos. Unidos de Padre Miguel rebaixada para a Série Ouro.';
    } else if (yr === 2024) {
      notes = 'Carnaval 2024: Unidos do Viradouro sagrou-se campeã com 20 pontos e Imperatriz Leopoldinense vice com 15 pontos. Unidos do Porto da Pedra rebaixada para a Série Ouro.';
    } else if (yr === 2023) {
      notes = 'Carnaval 2023: Imperatriz Leopoldinense conquistou o campeonato com 20 pontos e Viradouro vice com 15 pontos. Império Serrano rebaixada para a Série Ouro.';
    } else if (yr === 2022) {
      notes = 'Carnaval 2022: Acadêmicos do Grande Rio sagrou-se campeã inédita com 20 pontos e Beija-Flor vice com 15 pontos. São Clemente rebaixada para a Série Ouro.';
    } else if (yr === 2017) {
      notes = 'Carnaval histórico com duas campeãs oficiais pela LIESA: Portela e Mocidade Independente de Padre Miguel dividiram o título (ambas pontuando 20 pontos de campeã). Devido aos acidentes graves com carros alegóricos na pista, a plenária da LIESA decidiu por unanimidade que NÃO houve rebaixamento em 2017 (Paraíso do Tuiuti manteve-se no Grupo Especial).';
    } else if (yr === 2020) {
      notes = 'Carnaval 2020: Unidos do Viradouro conquistou o campeonato com 20 pontos, e Grande Rio foi a vice-campeã com 15 pontos. Estácio de Sá e União da Ilha foram rebaixadas para a Série Ouro.';
    } else if (yr === 2019) {
      notes = 'Carnaval 2019: Estação Primeira de Mangueira foi campeã com 20 pontos e Viradouro vice com 15 pontos. Edição com 14 escolas no Grupo Especial: Imperatriz Leopoldinense e Império Serrano foram rebaixadas para a Série Ouro.';
    } else if (yr === 2018) {
      notes = 'Carnaval 2018: Beija-Flor de Nilópolis foi campeã com 20 pontos e Paraíso do Tuiuti vice-campeã histórica com 15 pontos. Em plenária extraordinária da LIESA, foi decidido que NÃO houve rebaixamento em 2018 (Acadêmicos do Grande Rio e Império Serrano permaneceram no Grupo Especial, ampliando o grupo para 14 escolas em 2019).';
    } else if (yr === 2016) {
      notes = 'Carnaval 2016: Estação Primeira de Mangueira foi campeã com 20 pontos e Unidos da Tijuca vice com 15 pontos. Estácio de Sá foi rebaixada para a Série Ouro.';
    } else if (yr === 2015) {
      notes = 'Carnaval 2015: Beija-Flor de Nilópolis foi campeã com 20 pontos e Acadêmicos do Salgueiro vice com 15 pontos. Unidos do Viradouro rebaixada para a Série Ouro.';
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
    } else if (yr === 1953) {
      notes = 'Carnaval Histórico de 1953 (Administrado pela AESCRJ - Primeiro Carnaval da história com sistema de rebaixamento): Portela sagrou-se campeã com "Seis Datas Magnas" (+20 pts) e Império Serrano foi a vice-campeã com "O Último Baile da Ilha Fiscal" (+15 pts). O Império da Tijuca desfilou como Hors concours. Quatro agremiações foram rebaixadas: Vai Se Quiser, Cada Ano Sai Melhor, Aventureiros da Matriz e Azul e Branco do Salgueiro.';
    } else if (yr === 1952) {
      notes = 'Carnaval Histórico de 1952: Não houve apuração oficial das notas em função do temporal e fortes chuvas ocorridas durante os desfiles. Vinte e cinco agremiações participaram do evento, sem classificação oficial e sem pontuação atribuída.';
    } else if (yr === 1951) {
      notes = 'Carnaval Histórico de 1951: Houve dois desfiles competitivos oficiais no Grupo Especial: o desfile da Federação Brasileira de Escolas de Samba (FBES), vencido pelo Império Serrano (+20 pts) com Aprendizes de Lucas vice-campeã (+15 pts); e o desfile da União Geral das Escolas de Samba do Brasil (UGESB), vencido pela Portela (+20 pts) com Três Mosqueteiros vice-campeã (+15 pts). Não houve rebaixamento.';
    } else if (yr === 1950) {
      notes = 'Carnaval Histórico de 1950: Houve três competições oficiais de Escolas de Samba no Grupo Especial: o desfile da Federação Brasileira de Escolas de Samba (FBES), vencido pelo Império Serrano (+20 pts) com Aprendizes de Lucas vice-campeã (+15 pts); o desfile da União Cívica das Escolas de Samba (UCES), vencido pela Estação Primeira de Mangueira (+20 pts) com a Portela vice-campeã (+15 pts); e o desfile da União Geral das Escolas de Samba do Brasil (UGESB), com título dividido entre Prazer da Serrinha e Unidos da Capela (+20 pts cada) e cinco vices empatadas (Depois Eu Digo, Paz e Amor, Três Mosqueteiros, Unidos da Congonha e Unidos da Tamarineira, +15 pts cada). Não houve rebaixamento.';
    } else if (yr === 1949) {
      notes = 'Carnaval Histórico de 1949: Houve dois desfiles competitivos oficiais no Grupo Especial — o desfile da Federação Brasileira de Escolas de Samba (FBES), vencido pelo Império Serrano (+20 pts) com Azul e Branco do Salgueiro vice-campeã (+15 pts); e o desfile da União Geral das Escolas de Samba do Brasil (UGESB), vencido pela Estação Primeira de Mangueira (+20 pts) com Portela vice-campeã (+15 pts). Não houve rebaixamento.';
    } else if (yr === 1948) {
      notes = 'Carnaval Histórico de 1948: Desfile competitivo oficial unificado organizado pela Federação Brasileira de Escolas de Samba (FBES) com 35 agremiações participantes. O Império Serrano sagrou-se campeão com "Homenagem a Antônio Castro Alves" (+20 pts) e a Unidos da Tijuca foi a vice-campeã com "Assinatura da Lei Áurea" (+15 pts). A Portela alcançou a 3ª colocação (+12 pts) e a Estação Primeira de Mangueira a 4ª colocação (+10 pts). Não houve rebaixamento.';
    } else if (yr === 1947) {
      notes = 'Carnaval Histórico de 1947: Desfile oficial unificado das Escolas de Samba com 26 agremiações participantes. A Portela sagrou-se campeã (+20 pts) e a Estação Primeira de Mangueira foi vice-campeã (+15 pts). Depois Eu Digo ficou com a 3ª colocação (+12 pts), Paz e Amor em 4º (+10 pts), Azul e Branco do Salgueiro em 5º (+8 pts), e Lira do Amor empatada com Prazer da Serrinha em 6º (+6 pts cada). Não houve rebaixamento.';
    } else if (yr === 1946) {
      notes = 'Carnaval Histórico de 1946: Desfile oficial unificado das Escolas de Samba com 19 agremiações participantes. A Portela sagrou-se campeã (+20 pts) com "Aljezur", e a Estação Primeira de Mangueira foi vice-campeã (+15 pts) com "Carnaval". Depois Eu Digo alcançou a 3ª colocação (+12 pts), Império da Tijuca em 4º (+10 pts), Azul e Branco do Salgueiro em 5º (+8 pts), Paz e Amor em 6º (+6 pts), Lira do Amor em 7º (+4 pts), Unidos da Tijuca em 8º (+3 pts), Unidos da Capela em 9º (+2 pts) e Filhos do Deserto em 10º (+1 pt). Não houve rebaixamento.';
    } else if (yr === 1945) {
      notes = 'Carnaval Histórico de 1945: Oito agremiações desfilaram no Carnaval Carioca. A Portela sagrou-se pentacampeã consecutiva (+20 pts) cantando "Motivos Patrióticos", e a Estação Primeira de Mangueira foi a vice-campeã (+15 pts) com "A Glória do Samba". Apenas campeã e vice foram oficializadas pelo júri.';
    } else if (yr === 1944) {
      notes = 'Carnaval Histórico de 1944: Nove agremiações desfilaram no Carnaval Carioca. A Portela sagrou-se tetracampeã consecutiva (+20 pts) com "Motivos Patrióticos", e a Estação Primeira de Mangueira foi vice-campeã (+15 pts) com "Glória ao Samba". Apenas campeã e vice foram oficializadas pelo júri.';
    } else if (yr === 1943) {
      notes = 'Carnaval Histórico de 1943: Vinte e duas agremiações participaram do desfile oficial. A Portela conquistou o tricampeonato consecutivo (+20 pts) com "Carnaval de Guerra", a Estação Primeira de Mangueira foi a vice-campeã (+15 pts), Azul e Branco do Salgueiro ficou em 3º (+12 pts), Deixa Malhar em 4º (+10 pts) e Corações Unidos de Jacarepaguá em 5º (+8 pts). Catorze agremiações adicionais desfilaram sem classificação final.';
    } else if (yr === 1942) {
      notes = 'Carnaval Histórico de 1942: Desfile oficial unificado das Escolas de Samba com 23 agremiações participantes. A Portela sagrou-se bicampeã consecutiva (+20 pts) cantando "A Vida do Samba", e a agremiação Depois Eu Digo foi vice-campeã histórica (+15 pts). Estação Primeira de Mangueira ficou em 3º (+12 pts), Paz e Amor em 4º (+10 pts), Deixa Malhar em 5º (+8 pts), Unidos do Salgueiro em 6º (+6 pts), Papagaio Linguarudo em 7º (+4 pts), Cada Ano Sai Melhor em 8º (+3 pts), Azul e Branco do Salgueiro em 9º (+2 pts) e Fiquei Firme em 10º (+1 pt). Não houve rebaixamento.';
    } else if (yr === 1941) {
      notes = 'Carnaval Histórico de 1941: Desfile oficial unificado das Escolas de Samba com 17 agremiações participantes. A Portela sagrou-se campeã (+20 pts) cantando "Dez Anos de Glória", e a Estação Primeira de Mangueira foi a vice-campeã oficial (+15 pts) com "Transformação do Samba". Depois Eu Digo ficou em 3º (+12 pts), Deixa Malhar em 4º (+10 pts), Unidos da Tijuca em 5º (+8 pts), Unidos do Salgueiro em 6º (+6 pts), Paz e Amor em 7º (+4 pts), Lira do Amor em 8º (+3 pts), Mocidade Louca de São Cristóvão em 9º (+2 pts) e Não é o Que Dizem em 10º (+1 pt). Empatadas em 11º ficaram Fiquei Firme e Prazer da Serrinha (0 pts). Não houve rebaixamento.';
    } else if (yr === 1940) {
      notes = 'Carnaval Histórico de 1940: Desfile oficial unificado das Escolas de Samba com 23 agremiações participantes. A Estação Primeira de Mangueira sagrou-se campeã (+20 pts) cantando "Prélio Sambístico", e a agremiação Mocidade Louca de São Cristóvão foi a vice-campeã histórica (+15 pts). Azul e Branco do Salgueiro ficou em 3º (+12 pts), União do Sampaio em 4º (+10 pts), Portela em 5º (+8 pts), Deixa Malhar em 6º (+6 pts), Cada Ano Sai Melhor, Paz e Amor e Unidos da Tijuca empatadas em 7º (+4 pts cada), Fiquei Firme em 8º (+3 pts), União Barão da Gamboa em 9º (+2 pts) e Depois Eu Digo em 10º (+1 pt). Não houve rebaixamento.';
    } else if (yr === 1939) {
      notes = 'Carnaval Histórico de 1939: Desfile oficial unificado das Escolas de Samba com 26 agremiações classificadas e 4 agremiações desclassificadas. A Portela sagrou-se campeã (+20 pts) cantando "Teste ao Samba", e a Estação Primeira de Mangueira foi vice-campeã (+15 pts) com "Noções de Geografia". Unidos do Tuiuti ficou em 3º (+12 pts), Depois Eu Digo em 4º (+10 pts), Unidos da Mangueira em 5º (+8 pts), Unidos da Tijuca em 6º (+6 pts), Azul e Branco do Salgueiro em 7º (+4 pts), União do Sampaio em 8º (+3 pts), Deixa Malhar em 9º (+2 pts) e União Parada de Lucas em 10º (+1 pt). Desclassificadas: Papagaio Linguarudo, União de Madureira, Vai Se Quiser e Vizinha Faladeira.';
    } else if (yr === 1938) {
      notes = 'Carnaval Histórico de 1938: Não houve apuração oficial das notas em função do forte temporal e chuvas torrenciais durante os desfiles na Praça Onze. 37 agremiações participaram do evento. Nenhum ponto atribuído por ausência de julgamento oficial.';
    } else if (yr === 1937) {
      notes = 'Carnaval Histórico de 1937: Desfile oficial com 15 agremiações classificadas. Vizinha Faladeira sagrou-se campeã histórica (+20 pts) cantando "Uma Só Família", e a Portela foi vice-campeã (+15 pts) com "O Tesouro das Ruínas". Depois Eu Digo ficou em 3º (+12 pts), Unidos da Mangueira em 4º (+10 pts), Unidos do Tuiuti em 5º (+8 pts), União Parada de Lucas em 6º (+6 pts), Azul e Branco do Salgueiro em 7º (+4 pts), Papagaio Linguarudo em 8º (+3 pts), e Cada Ano Sai Melhor e Mocidade Louca de São Cristóvão empatadas em 9º (+2 pts cada). Unidos de Cavalcante em 10º (+1 pt). Não houve rebaixamento.';
    } else if (yr === 1936) {
      notes = 'Carnaval Histórico de 1936: Desfile oficial com 11 agremiações classificadas. A Unidos da Tijuca sagrou-se campeã histórica (+20 pts) cantando "Sonho das Ilusões", e a Estação Primeira de Mangueira foi vice-campeã (+15 pts) com "Não Faz Mal, a Mangueira É Maior". A Portela ficou em 3º (+12 pts), Depois Eu Digo em 4º (+10 pts), Deixa Malhar em 5º (+8 pts), Vizinha Faladeira em 6º (+6 pts), União Barão da Gamboa em 7º (+4 pts), Fiquei Firme em 8º (+3 pts), Última Hora em 9º (+2 pts) e Azul e Branco do Salgueiro em 10º (+1 pt). Lira do Amor em 11º (0 pts). Não houve rebaixamento.';
    } else if (yr === 1935) {
      notes = 'Carnaval Histórico de 1935 (Primeiro desfile oficial organizado pela UGES / Jornal A Nação na Praça Onze): Apenas as 5 primeiras colocadas foram classificadas oficialmente com pontos. Vai Como Pode (atual Portela) sagrou-se campeã histórica (+20 pts) cantando "O Samba Dominando o Mundo", Estação Primeira de Mangueira foi vice-campeã (+15 pts) com "O Romance do Samba", Prazer da Serrinha em 3º (+12 pts), Vizinha Faladeira em 4º (+10 pts) e Unidos da Tijuca em 5º (+8 pts). As demais 18 agremiações desfilaram sem classificação final atribuída pelo júri.';
    } else if (yr === 1934) {
      notes = 'Carnaval Histórico de 1934: Houve 2 desfiles competitivos de grande repercussão na Praça Onze. No desfile organizado pelo jornal "O País", a Estação Primeira de Mangueira sagrou-se campeã (+20 pts), Vai Como Pode (Portela) foi vice-campeã (+15 pts), Deixa Malhar em 3º (+12 pts) e outras 13 agremiações desfilaram sem classificação oficial. No desfile organizado pelo jornal "A Hora", o Recreio de Ramos foi campeão (+20 pts), Unidos da Tijuca foi vice-campeã (+15 pts), Unidos da Saúde em 3º (+12 pts), Vizinha Faladeira em 4º (+10 pts), Para o Ano Sai Melhor em 5º (+8 pts) e Azul e Branco do Salgueiro em 6º (+6 pts), além de 14 agremiações sem classificação final oficial.';
    } else if (yr === 1933) {
      notes = 'Carnaval Histórico de 1933 (Apenas as 5 primeiras colocadas foram classificadas oficialmente): Estação Primeira de Mangueira sagrou-se bicampeã (+20 pts), Azul e Branco do Salgueiro vice-campeã (+15 pts), Unidos da Tijuca em 3º (+12 pts), De Mim Ninguém se Lembra e Vai Como Pode (Portela) empatadas em 4º (+10 pts cada) e União do Uruguai em 5º (+8 pts). Vinte e seis agremiações adicionais participaram do histórico desfile na Praça Onze.';
    } else if (yr === 1932) {
      notes = 'Carnaval Histórico de 1932: É o primeiro desfile competitivo da história do carnaval carioca, realizado na Praça Onze e organizado pelo jornal Mundo Sportivo (criado por Mário Filho). Estação Primeira de Mangueira sagrou-se a primeira campeã da história (+20 pts). O vice-campeonato oficial foi dividido entre Segunda Linha do Estácio e Vai Como Pode - Portela (+15 pts cada). Para o Ano Sai Melhor conquistou a 3ª colocação (+12 pts) e Unidos da Tijuca ficou em 4º lugar (+10 pts).';
    }

    result.push({
      year: yr,
      standings: standsWithStatus,
      isNoCarnaval: false,
      notes,
      relegatedNames: relNames,
      championNames: yr === 1984
        ? ['Estação Primeira de Mangueira (Supercampeã)', 'Portela (Campeã de Domingo)']
        : yr === 1980
        ? ['Beija-Flor', 'Imperatriz Leopoldinense', 'Portela']
        : yr === 1960
        ? ['Portela', 'Estação Primeira de Mangueira', 'Acadêmicos do Salgueiro', 'Unidos da Capela', 'Império Serrano']
        : yr === 1952
        ? []
        : yr === 1951
        ? ['Portela (Campeã UGESB)', 'Império Serrano (Campeã FBES)']
        : yr === 1950
        ? ['Império Serrano (Campeã FBES)', 'Estação Primeira de Mangueira (Campeã UCES)', 'Prazer da Serrinha (Campeã UGESB)', 'Unidos da Capela (Campeã UGESB)']
        : yr === 1949
        ? ['Império Serrano (Campeã FBES)', 'Estação Primeira de Mangueira (Campeã UGESB)']
        : yr === 1948
        ? ['Império Serrano (Campeã FBES)']
        : yr === 1947
        ? ['Portela (Campeã Oficial)']
        : yr === 1946
        ? ['Portela (Campeã Oficial)']
        : yr === 1945
        ? ['Portela (Campeã Oficial)']
        : yr === 1944
        ? ['Portela (Campeã Oficial)']
        : yr === 1943
        ? ['Portela (Campeã Oficial)']
        : yr === 1942
        ? ['Portela (Campeã Oficial)']
        : yr === 1941
        ? ['Portela (Campeã Oficial)']
        : yr === 1940
        ? ['Estação Primeira de Mangueira (Campeã Oficial)']
        : yr === 1939
        ? ['Portela (Campeã Oficial)']
        : yr === 1938
        ? []
        : yr === 1937
        ? ['Vizinha Faladeira (Campeã Oficial)']
        : yr === 1936
        ? ['Unidos da Tijuca (Campeã Oficial)']
        : yr === 1935
        ? ['Vai Como Pode - Portela (Campeã Oficial)']
        : yr === 1934
        ? ['Estação Primeira de Mangueira (Campeã O País)', 'Recreio de Ramos (Campeã A Hora)']
        : yr === 1933
        ? ['Estação Primeira de Mangueira (Bicampeã Oficial)']
        : yr === 1932
        ? ['Estação Primeira de Mangueira (Primeira Campeã da História)']
        : champs,
      viceChampionNames: yr === 1984
        ? ['Portela (Supervice)', 'Mocidade Independente (Vice Segunda)', 'Império Serrano (Vice Domingo)']
        : yr === 1980
        ? ['Mocidade Independente', 'União da Ilha do Governador', 'Unidos de Vila Isabel']
        : yr === 1960
        ? ['Aprendizes de Lucas']
        : yr === 1952
        ? []
        : yr === 1951
        ? ['Três Mosqueteiros (Vice UGESB)', 'Aprendizes de Lucas (Vice FBES)']
        : yr === 1950
        ? ['Aprendizes de Lucas (Vice FBES)', 'Portela (Vice UCES)', 'Depois Eu Digo (Vice UGESB)', 'Paz e Amor (Vice UGESB)', 'Três Mosqueteiros (Vice UGESB)', 'Unidos da Congonha (Vice UGESB)', 'Unidos da Tamarineira (Vice UGESB)']
        : yr === 1949
        ? ['Azul e Branco do Salgueiro (Vice FBES)', 'Portela (Vice UGESB)']
        : yr === 1948
        ? ['Unidos da Tijuca (Vice FBES)']
        : yr === 1947
        ? ['Estação Primeira de Mangueira (Vice-campeã Oficial)']
        : yr === 1946
        ? ['Estação Primeira de Mangueira (Vice-campeã Oficial)']
        : yr === 1945
        ? ['Estação Primeira de Mangueira (Vice-campeã Oficial)']
        : yr === 1944
        ? ['Estação Primeira de Mangueira (Vice-campeã Oficial)']
        : yr === 1943
        ? ['Estação Primeira de Mangueira (Vice-campeã Oficial)']
        : yr === 1942
        ? ['Depois Eu Digo (Vice-campeã Oficial)']
        : yr === 1941
        ? ['Estação Primeira de Mangueira (Vice-campeã Oficial)']
        : yr === 1940
        ? ['Mocidade Louca de São Cristóvão (Vice-campeã Oficial)']
        : yr === 1939
        ? ['Estação Primeira de Mangueira (Vice-campeã Oficial)']
        : yr === 1938
        ? []
        : yr === 1937
        ? ['Portela (Vice-campeã Oficial)']
        : yr === 1936
        ? ['Estação Primeira de Mangueira (Vice-campeã Oficial)']
        : yr === 1935
        ? ['Estação Primeira de Mangueira (Vice-campeã Oficial)']
        : yr === 1934
        ? ['Vai Como Pode - Portela (Vice O País)', 'Unidos da Tijuca (Vice A Hora)']
        : yr === 1933
        ? ['Azul e Branco do Salgueiro (Vice-campeã Oficial)']
        : yr === 1932
        ? ['Segunda Linha do Estácio (Vice-campeã Oficial)', 'Vai Como Pode - Portela (Vice-campeã Oficial)']
        : vices,
      totalSchools: stands.length,
      subgroups: yr === 1984 ? {
        domingo: CARNAVAL_1984_DOMINGO,
        segunda: CARNAVAL_1984_SEGUNDA,
        supercampeonato: CARNAVAL_1984_SUPERCAMPEONATO
      } : yr === 1951 ? {
        fbes: CARNAVAL_1951_FBES,
        ugesb: CARNAVAL_1951_UGESB
      } : yr === 1950 ? {
        fbes: CARNAVAL_1950_FBES,
        uces: CARNAVAL_1950_UCES,
        ugesb: CARNAVAL_1950_UGESB
      } : yr === 1949 ? {
        fbes: CARNAVAL_1949_FBES,
        ugesb: CARNAVAL_1949_UGESB
      } : yr === 1948 ? {
        fbes: CARNAVAL_1948_FBES
      } : yr === 1947 ? {
        fbes: CARNAVAL_1947_OFICIAL
      } : yr === 1946 ? {
        fbes: CARNAVAL_1946_OFICIAL
      } : yr === 1945 ? {
        fbes: CARNAVAL_1945_OFICIAL
      } : yr === 1944 ? {
        fbes: CARNAVAL_1944_OFICIAL
      } : yr === 1943 ? {
        fbes: CARNAVAL_1943_OFICIAL
      } : yr === 1942 ? {
        fbes: CARNAVAL_1942_OFICIAL
      } : yr === 1941 ? {
        fbes: CARNAVAL_1941_OFICIAL
      } : yr === 1940 ? {
        fbes: CARNAVAL_1940_OFICIAL
      } : yr === 1939 ? {
        fbes: CARNAVAL_1939_OFICIAL
      } : yr === 1938 ? {
        fbes: CARNAVAL_1938_OFICIAL
      } : yr === 1937 ? {
        fbes: CARNAVAL_1937_OFICIAL
      } : yr === 1936 ? {
        fbes: CARNAVAL_1936_OFICIAL
      } : yr === 1935 ? {
        ugesb: CARNAVAL_1935_OFICIAL
      } : yr === 1934 ? {
        o_pais: CARNAVAL_1934_O_PAIS,
        a_hora: CARNAVAL_1934_A_HORA
      } : yr === 1933 ? {
        ugesb: CARNAVAL_1933_OFICIAL
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

  // 1. Processa todos os títulos e vices históricos da era pré-1932 a partir de HISTORICAL_CARNAVAL_RECORDS
  // A partir de 1932 em diante, todas as colocações detalhadas vêm do catálogo oficial
  Object.entries(HISTORICAL_CARNAVAL_RECORDS).forEach(([id, rec]) => {
    const sId = resolveSchoolId(id, undefined, schoolsMap);
    const entry = ensureEntry(sId);

    const espYearsPre1932 = (rec.especialYears || []).filter((y) => y < 1932);
    const espViceYearsPre1932 = (rec.especialRunnerUpYears || []).filter((y) => y < 1932);

    const titlesPre1932 = espYearsPre1932.length;
    const vicesPre1932 = espViceYearsPre1932.length;

    espYearsPre1932.forEach((y) => {
      entry.participationsSet.add(y);
      entry.performancesDetailed[y] = {
        year: y,
        rank: 1,
        points: 20,
        participated: true,
        schoolName: entry.schoolName,
        statusDescription: 'Campeã do Carnaval (+20 pts)'
      };
    });

    espViceYearsPre1932.forEach((y) => {
      entry.participationsSet.add(y);
      entry.performancesDetailed[y] = {
        year: y,
        rank: 2,
        points: 15,
        participated: true,
        schoolName: entry.schoolName,
        statusDescription: 'Vice-Campeã do Carnaval (+15 pts)'
      };
    });

    entry.totalEspecialTitles += titlesPre1932;
    entry.totalEspecialVices += vicesPre1932;
    entry.titlePoints += titlesPre1932 * 20;
    entry.vicePoints += vicesPre1932 * 15;
    entry.pointsEraPre2015 += titlesPre1932 * 20 + vicesPre1932 * 15;
    entry.totalPoints += titlesPre1932 * 20 + vicesPre1932 * 15;
    entry.totalCarnavalesContados += titlesPre1932 + vicesPre1932;
  });

  // 2. Processa anos de 1932 a 2026 oficiais (com todas as colocações detalhadas catalogadas)
  Object.entries(OFFICIAL_LIESA_HISTORICAL_STANDINGS).forEach(([yrStr, list]) => {
    const yr = parseInt(yrStr, 10);
    if (yr === 2021 || !list || list.length === 0) {
      // 2021: Não houve desfiles em decorrência da pandemia
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
        isHorsConcours: st.isHorsConcours,
        league: st.league,
        statusDescription: st.statusDescription
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
          schoolName: st.schoolName,
          statusDescription: st.rank === 1 ? 'Campeã (+20 pts)' : st.rank === 2 ? 'Vice-Campeã (+15 pts)' : `${st.rank}º Lugar (+${pts} pts)`
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
 * no Grupo Especial, computando todos os Carnavais Passados catalogados (1932 a 2026)
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

  // 1. Processa todos os anos catalogados oficiais dos Carnavais Passados (1932 a 2026)
  Object.entries(OFFICIAL_LIESA_HISTORICAL_STANDINGS).forEach(([yrStr, standings]) => {
    const yr = Number(yrStr);
    if (yr === 2021 || yr === 1952 || !standings || standings.length === 0) return;

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
