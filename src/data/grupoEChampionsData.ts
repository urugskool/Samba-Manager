/**
 * Base de Dados Oficial dos Resultados Históricos do Grupo E (Sexta Divisão)
 * do Carnaval do Rio de Janeiro (1996 – 2019).
 *
 * Grupo atualmente extinto no Carnaval carioca (última edição disputada em 2019),
 * preservado integralmente na base de dados histórica do jogo.
 *
 * Registra com rigor histórico todas as agremiações Campeãs e Vice-Campeãs oficiais,
 * incluindo anos com títulos divididos e escolas históricas inativas/extintas.
 */

export interface GrupoEHonorEntry {
  schoolId: string;
  schoolName: string;
  isExtinct?: boolean;
}

export interface GrupoEYearResult {
  year: number;
  champions: GrupoEHonorEntry[];
  runnerUps: GrupoEHonorEntry[];
  note?: string;
}

export interface GrupoESchoolRecord {
  titles: number;
  titleYears: number[];
  runnerUps: number;
  runnerUpYears: number[];
}

/**
 * Relação cronológica oficial de todas as edições do Grupo E (Sexta Divisão)
 */
export const OFFICIAL_GRUPO_E_YEARLY_RESULTS: GrupoEYearResult[] = [
  {
    year: 1996,
    champions: [{ schoolId: 'alegria_da_zona_sul', schoolName: 'Alegria da Zona Sul', isExtinct: true }],
    runnerUps: [{ schoolId: 'academicos_do_sossego', schoolName: 'Acadêmicos do Sossego', isExtinct: true }],
    note: 'Ano de criação do Grupo E (Sexta Divisão) no Carnaval do Rio de Janeiro'
  },
  {
    year: 1997,
    champions: [
      { schoolId: 'mocidade_de_inhauma', schoolName: 'Mocidade Independente de Inhaúma' },
      { schoolId: 'academicos_do_cachambi', schoolName: 'Acadêmicos do Cachambi', isExtinct: true }
    ],
    runnerUps: [{ schoolId: 'arrastao_de_sao_joao', schoolName: 'Arrastão de São João', isExtinct: true }],
    note: 'Ano com duas campeãs oficiais dividindo o título da Sexta Divisão'
  },
  {
    year: 1998,
    champions: [{ schoolId: 'boemios_de_inhauma', schoolName: 'Boêmios de Inhaúma', isExtinct: true }],
    runnerUps: [{ schoolId: 'uniao_vaz_lobo', schoolName: 'União de Vaz Lobo', isExtinct: true }]
  },
  {
    year: 1999,
    champions: [{ schoolId: 'curicica', schoolName: 'União do Parque Curicica' }],
    runnerUps: [{ schoolId: 'sereno_campo_grande', schoolName: 'Sereno de Campo Grande' }]
  },
  {
    year: 2000,
    champions: [{ schoolId: 'academicos_da_barra_da_tijuca', schoolName: 'Acadêmicos da Barra da Tijuca', isExtinct: true }],
    runnerUps: [{ schoolId: 'abolicao', schoolName: 'Acadêmicos da Abolição' }]
  },
  {
    year: 2001,
    champions: [{ schoolId: 'academicos_do_dende', schoolName: 'Acadêmicos do Dendê' }],
    runnerUps: [{ schoolId: 'gato_de_bonsucesso', schoolName: 'Gato de Bonsucesso' }]
  },
  {
    year: 2002,
    champions: [
      { schoolId: 'praca_da_bandeira', schoolName: 'Independente da Praça da Bandeira' },
      { schoolId: 'sereno_campo_grande', schoolName: 'Sereno de Campo Grande' }
    ],
    runnerUps: [{ schoolId: 'delirio_da_zona_oeste', schoolName: 'Delírio da Zona Oeste', isExtinct: true }],
    note: 'Título dividido entre Independente da Praça da Bandeira e Sereno de Campo Grande'
  },
  {
    year: 2003,
    champions: [{ schoolId: 'flor_da_mina', schoolName: 'Flor da Mina do Andaraí' }],
    runnerUps: [{ schoolId: 'unidos_de_cosmos', schoolName: 'Unidos de Cosmos' }]
  },
  {
    year: 2004,
    champions: [{ schoolId: 'mocidade_cidade_de_deus', schoolName: 'Mocidade Unida da Cidade de Deus' }],
    runnerUps: [{ schoolId: 'unidos_padre_miguel', schoolName: 'Unidos de Padre Miguel' }]
  },
  {
    year: 2005,
    champions: [{ schoolId: 'unidos_do_uraiti', schoolName: 'Unidos do Uraiti', isExtinct: true }],
    runnerUps: [{ schoolId: 'arame_de_ricardo', schoolName: 'Arame de Ricardo' }]
  },
  {
    year: 2006,
    champions: [{ schoolId: 'rosa_de_ouro', schoolName: 'Rosa de Ouro' }],
    runnerUps: [{ schoolId: 'amarelinho', schoolName: 'Corações Unidos do Amarelinho', isExtinct: true }]
  },
  {
    year: 2007,
    champions: [{ schoolId: 'mocidade_de_inhauma', schoolName: 'Mocidade Independente de Inhaúma' }],
    runnerUps: [{ schoolId: 'vila_santa_tereza', schoolName: 'Unidos da Vila Santa Tereza' }],
    note: 'Bicampeonato histórico da Mocidade Independente de Inhaúma no Grupo E'
  },
  {
    year: 2008,
    champions: [{ schoolId: 'imperial_de_nova_iguacu', schoolName: 'Imperial de Nova Iguaçu', isExtinct: true }],
    runnerUps: [{ schoolId: 'mocidade_cidade_de_deus', schoolName: 'Mocidade Unida da Cidade de Deus' }]
  },
  {
    year: 2009,
    champions: [{ schoolId: 'favo_de_acari', schoolName: 'Favo de Acari', isExtinct: true }],
    runnerUps: [{ schoolId: 'villa_rica', schoolName: 'Unidos da Villa Rica' }]
  },
  {
    year: 2010,
    champions: [{ schoolId: 'leao_de_nova_iguacu', schoolName: 'Leão de Nova Iguaçu' }],
    runnerUps: [{ schoolId: 'imperio_da_praca_seca', schoolName: 'Império da Praça Seca', isExtinct: true }]
  },
  {
    year: 2011,
    champions: [{ schoolId: 'unidos_de_lucas', schoolName: 'Unidos de Lucas' }],
    runnerUps: [{ schoolId: 'matriz_de_sao_joao', schoolName: 'Matriz de São João de Meriti', isExtinct: true }]
  },
  {
    year: 2012,
    champions: [{ schoolId: 'siri_de_ramos', schoolName: 'Siri de Ramos' }],
    runnerUps: [{ schoolId: 'chatuba', schoolName: 'Chatuba de Mesquita' }]
  },
  {
    year: 2015,
    champions: [{ schoolId: 'imperio_da_uva', schoolName: 'Império da Uva' }],
    runnerUps: [{ schoolId: 'alegria_do_vilar', schoolName: 'Alegria do Vilar' }],
    note: 'Retorno do Grupo E após intervalo entre 2013 e 2014'
  },
  {
    year: 2016,
    champions: [{ schoolId: 'nacao_insulana', schoolName: 'Nação Insulana', isExtinct: true }],
    runnerUps: [{ schoolId: 'tupy_bras_de_pina', schoolName: 'Tupy de Brás de Pina', isExtinct: true }]
  },
  {
    year: 2017,
    champions: [{ schoolId: 'imperio_ricardense', schoolName: 'Império Ricardense' }],
    runnerUps: [{ schoolId: 'academicos_de_madureira', schoolName: 'Acadêmicos de Madureira' }]
  },
  {
    year: 2018,
    champions: [{ schoolId: 'independentes_olaria', schoolName: 'Independentes de Olaria' }],
    runnerUps: [{ schoolId: 'vicente_de_carvalho', schoolName: 'Mocidade de Vicente de Carvalho' }]
  },
  {
    year: 2019,
    champions: [{ schoolId: 'academicos_da_diversidade', schoolName: 'Acadêmicos da Diversidade', isExtinct: true }],
    runnerUps: [{ schoolId: 'unidos_de_manguinhos', schoolName: 'Unidos de Manguinhos' }],
    note: 'Última edição histórica realizada do Grupo E (Sexta Divisão) no Rio de Janeiro antes de sua extinção definitiva'
  }
];

/**
 * Dicionário indexado por schoolId para enriquecimento automático de agremiações
 */
export const OFFICIAL_GRUPO_E_RECORDS_BY_SCHOOL: Record<string, GrupoESchoolRecord> = {
  // --- 2 TÍTULOS ---
  mocidade_de_inhauma: {
    titles: 2,
    titleYears: [1997, 2007],
    runnerUps: 0,
    runnerUpYears: []
  },

  // --- 1 TÍTULO ---
  academicos_da_barra_da_tijuca: {
    titles: 1,
    titleYears: [2000],
    runnerUps: 0,
    runnerUpYears: []
  },
  academicos_da_diversidade: {
    titles: 1,
    titleYears: [2019],
    runnerUps: 0,
    runnerUpYears: []
  },
  academicos_do_cachambi: {
    titles: 1,
    titleYears: [1997],
    runnerUps: 0,
    runnerUpYears: []
  },
  academicos_do_dende: {
    titles: 1,
    titleYears: [2001],
    runnerUps: 0,
    runnerUpYears: []
  },
  alegria_da_zona_sul: {
    titles: 1,
    titleYears: [1996],
    runnerUps: 0,
    runnerUpYears: []
  },
  siri_de_ramos: {
    titles: 1,
    titleYears: [2012],
    runnerUps: 0,
    runnerUpYears: []
  },
  boemios_de_inhauma: {
    titles: 1,
    titleYears: [1998],
    runnerUps: 0,
    runnerUpYears: []
  },
  favo_de_acari: {
    titles: 1,
    titleYears: [2009],
    runnerUps: 0,
    runnerUpYears: []
  },
  flor_da_mina: {
    titles: 1,
    titleYears: [2003],
    runnerUps: 0,
    runnerUpYears: []
  },
  imperial_de_nova_iguacu: {
    titles: 1,
    titleYears: [2008],
    runnerUps: 0,
    runnerUpYears: []
  },
  imperio_da_uva: {
    titles: 1,
    titleYears: [2015],
    runnerUps: 0,
    runnerUpYears: []
  },
  imperio_ricardense: {
    titles: 1,
    titleYears: [2017],
    runnerUps: 0,
    runnerUpYears: []
  },
  praca_da_bandeira: {
    titles: 1,
    titleYears: [2002],
    runnerUps: 0,
    runnerUpYears: []
  },
  independentes_olaria: {
    titles: 1,
    titleYears: [2018],
    runnerUps: 0,
    runnerUpYears: []
  },
  leao_de_nova_iguacu: {
    titles: 1,
    titleYears: [2010],
    runnerUps: 0,
    runnerUpYears: []
  },
  nacao_insulana: {
    titles: 1,
    titleYears: [2016],
    runnerUps: 0,
    runnerUpYears: []
  },
  rosa_de_ouro: {
    titles: 1,
    titleYears: [2006],
    runnerUps: 0,
    runnerUpYears: []
  },
  sereno_campo_grande: {
    titles: 1,
    titleYears: [2002],
    runnerUps: 1,
    runnerUpYears: [1999]
  },
  curicica: {
    titles: 1,
    titleYears: [1999],
    runnerUps: 0,
    runnerUpYears: []
  },
  unidos_de_lucas: {
    titles: 1,
    titleYears: [2011],
    runnerUps: 0,
    runnerUpYears: []
  },
  unidos_do_uraiti: {
    titles: 1,
    titleYears: [2005],
    runnerUps: 0,
    runnerUpYears: []
  },

  // --- VICE-CAMPEÃS (0 TÍTULOS / COM VICES) ---
  academicos_do_sossego: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [1996]
  },
  arrastao_de_sao_joao: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [1997]
  },
  uniao_vaz_lobo: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [1998]
  },
  abolicao: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2000]
  },
  gato_de_bonsucesso: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2001]
  },
  delirio_da_zona_oeste: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2002]
  },
  unidos_de_cosmos: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2003]
  },
  unidos_padre_miguel: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2004]
  },
  arame_de_ricardo: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2005]
  },
  amarelinho: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2006]
  },
  vila_santa_tereza: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2007]
  },
  mocidade_cidade_de_deus: {
    titles: 1,
    titleYears: [2004],
    runnerUps: 1,
    runnerUpYears: [2008]
  },
  villa_rica: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2009]
  },
  imperio_da_praca_seca: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2010]
  },
  matriz_de_sao_joao: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2011]
  },
  chatuba: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2012]
  },
  alegria_do_vilar: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2015]
  },
  tupy_bras_de_pina: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2016]
  },
  academicos_de_madureira: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2017]
  },
  vicente_de_carvalho: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2018]
  },
  unidos_de_manguinhos: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2019]
  }
};
