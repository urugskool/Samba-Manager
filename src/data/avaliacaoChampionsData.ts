/**
 * Base de Dados Oficial dos Resultados Históricos do Grupo de Avaliação (Quinta Divisão)
 * do Carnaval do Rio de Janeiro (1989 – 2026).
 *
 * Registra com precisão absoluta todas as Campeãs e Vice-Campeãs oficiais,
 * incluindo anos com múltiplas agremiações laureadas (ex: 1993 com duas campeãs oficiais).
 */

export interface AvaliacaoHonorEntry {
  schoolId: string;
  schoolName: string;
  isExtinct?: boolean;
}

export interface AvaliacaoYearResult {
  year: number;
  champions: AvaliacaoHonorEntry[];
  runnerUps: AvaliacaoHonorEntry[];
  note?: string;
}

export interface AvaliacaoSchoolRecord {
  titles: number;
  titleYears: number[];
  runnerUps: number;
  runnerUpYears: number[];
}

/**
 * Relação cronológica oficial de todos os Carnavais da 5ª Divisão (1989 - 2026)
 */
export const OFFICIAL_AVALIACAO_YEARLY_RESULTS: AvaliacaoYearResult[] = [
  {
    year: 1989,
    champions: [{ schoolId: 'rocinha', schoolName: 'Acadêmicos da Rocinha' }],
    runnerUps: [{ schoolId: 'unidos_do_campinho', schoolName: 'Unidos do Campinho' }]
  },
  {
    year: 1990,
    champions: [{ schoolId: 'vizinha_faladeira', schoolName: 'Vizinha Faladeira' }],
    runnerUps: [{ schoolId: 'unidos_da_vila_kennedy', schoolName: 'Unidos da Vila Kennedy' }]
  },
  {
    year: 1991,
    champions: [{ schoolId: 'villa_rica', schoolName: 'Unidos da Villa Rica' }],
    runnerUps: [{ schoolId: 'boi_da_ilha', schoolName: 'Boi da Ilha do Governador' }]
  },
  {
    year: 1992,
    champions: [{ schoolId: 'vigario_geral', schoolName: 'Acadêmicos de Vigário Geral' }],
    runnerUps: [{ schoolId: 'mocidade_de_vasconcelos', schoolName: 'Mocidade de Vasconcelos', isExtinct: true }]
  },
  {
    year: 1993,
    champions: [
      { schoolId: 'flor_da_mina', schoolName: 'Flor da Mina do Andaraí' },
      { schoolId: 'santa_marta', schoolName: 'Mocidade Unida do Santa Marta' }
    ],
    runnerUps: [{ schoolId: 'academicos_do_dende', schoolName: 'Acadêmicos do Dendê' }],
    note: 'Ano com duas campeãs oficiais declaradas'
  },
  {
    year: 1994,
    champions: [{ schoolId: 'alegria_da_zona_sul', schoolName: 'Alegria da Zona Sul' }],
    runnerUps: [{ schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra' }]
  },
  {
    year: 1995,
    champions: [{ schoolId: 'uniao_vaz_lobo', schoolName: 'União de Vaz Lobo' }],
    runnerUps: [{ schoolId: 'unidos_padre_miguel', schoolName: 'Unidos de Padre Miguel' }]
  },
  {
    year: 1996,
    champions: [{ schoolId: 'unidos_do_campinho', schoolName: 'Unidos do Campinho' }],
    runnerUps: [{ schoolId: 'inocentes', schoolName: 'Inocentes de Belford Roxo' }]
  },
  {
    year: 1997,
    champions: [{ schoolId: 'academicos_do_sossego', schoolName: 'Acadêmicos do Sossego' }],
    runnerUps: [{ schoolId: 'alegria_da_zona_sul', schoolName: 'Alegria da Zona Sul' }]
  },
  {
    year: 1998,
    champions: [{ schoolId: 'uniao_de_jacarepagua', schoolName: 'União de Jacarepaguá' }],
    runnerUps: [{ schoolId: 'mocidade_de_inhauma', schoolName: 'Mocidade Independente de Inhaúma' }]
  },
  {
    year: 1999,
    champions: [{ schoolId: 'renascer_jacarepagua', schoolName: 'Renascer de Jacarepaguá' }],
    runnerUps: [{ schoolId: 'boemios_de_inhauma', schoolName: 'Boêmios de Inhaúma', isExtinct: true }]
  },
  {
    year: 2000,
    champions: [{ schoolId: 'alegria_da_zona_sul', schoolName: 'Alegria da Zona Sul' }],
    runnerUps: [{ schoolId: 'curicica', schoolName: 'União do Parque Curicica' }]
  },
  {
    year: 2001,
    champions: [{ schoolId: 'academicos_da_barra_da_tijuca', schoolName: 'Acadêmicos da Barra da Tijuca' }],
    runnerUps: [{ schoolId: 'boemios_de_inhauma', schoolName: 'Boêmios de Inhaúma', isExtinct: true }]
  },
  {
    year: 2002,
    champions: [{ schoolId: 'vicente_de_carvalho', schoolName: 'Mocidade de Vicente de Carvalho' }],
    runnerUps: [{ schoolId: 'abolicao', schoolName: 'Acadêmicos da Abolição' }]
  },
  {
    year: 2003,
    champions: [{ schoolId: 'praca_da_bandeira', schoolName: 'Independente da Praça da Bandeira' }],
    runnerUps: []
  },
  {
    year: 2004,
    champions: [{ schoolId: 'flor_da_mina', schoolName: 'Flor da Mina do Andaraí' }],
    runnerUps: [{ schoolId: 'unidos_do_cabral', schoolName: 'Unidos do Cabral', isExtinct: true }]
  },
  {
    year: 2005,
    champions: [{ schoolId: 'unidos_padre_miguel', schoolName: 'Unidos de Padre Miguel' }],
    runnerUps: [{ schoolId: 'sereno_campo_grande', schoolName: 'Sereno de Campo Grande' }]
  },
  {
    year: 2006,
    champions: [{ schoolId: 'em_cima_da_hora', schoolName: 'Em Cima da Hora' }],
    runnerUps: [{ schoolId: 'academicos_do_dende', schoolName: 'Acadêmicos do Dendê' }]
  },
  {
    year: 2007,
    champions: [{ schoolId: 'amarelinho', schoolName: 'Corações Unidos do Amarelinho' }],
    runnerUps: [{ schoolId: 'unidos_anil', schoolName: 'Unidos do Anil' }]
  },
  {
    year: 2008,
    champions: [{ schoolId: 'academicos_do_sossego', schoolName: 'Acadêmicos do Sossego' }],
    runnerUps: [{ schoolId: 'unidos_de_manguinhos', schoolName: 'Unidos de Manguinhos' }]
  },
  {
    year: 2009,
    champions: [{ schoolId: 'engenho_da_rainha', schoolName: 'Acadêmicos do Engenho da Rainha' }],
    runnerUps: [{ schoolId: 'vila_santa_tereza', schoolName: 'Unidos da Vila Santa Tereza' }]
  },
  {
    year: 2010,
    champions: [{ schoolId: 'em_cima_da_hora', schoolName: 'Em Cima da Hora' }],
    runnerUps: [{ schoolId: 'villa_rica', schoolName: 'Unidos da Villa Rica' }]
  },
  {
    year: 2011,
    champions: [{ schoolId: 'imperio_da_praca_seca', schoolName: 'Império da Praça Seca', isExtinct: true }],
    runnerUps: [{ schoolId: 'mocidade_cidade_de_deus', schoolName: 'Mocidade Unida da Cidade de Deus' }]
  },
  {
    year: 2012,
    champions: [{ schoolId: 'unidos_de_lucas', schoolName: 'Unidos de Lucas' }],
    runnerUps: [{ schoolId: 'mocidade_cidade_de_deus', schoolName: 'Mocidade Unida da Cidade de Deus' }]
  },
  {
    year: 2013,
    champions: [{ schoolId: 'santa_marta', schoolName: 'Mocidade Unida do Santa Marta' }],
    runnerUps: [{ schoolId: 'leao_de_nova_iguacu', schoolName: 'Leão de Nova Iguaçu' }]
  },
  {
    year: 2014,
    champions: [{ schoolId: 'unidos_das_vargens', schoolName: 'Unidos das Vargens' }],
    runnerUps: [{ schoolId: 'lins_imperial', schoolName: 'Lins Imperial' }]
  },
  {
    year: 2015,
    champions: [{ schoolId: 'vizinha_faladeira', schoolName: 'Vizinha Faladeira' }],
    runnerUps: [{ schoolId: 'coroado_jacarepagua', schoolName: 'Coroado de Jacarepaguá' }]
  },
  {
    year: 2016,
    champions: [{ schoolId: 'flor_da_mina', schoolName: 'Flor da Mina do Andaraí' }],
    runnerUps: [{ schoolId: 'vigario_geral', schoolName: 'Acadêmicos de Vigário Geral' }]
  },
  {
    year: 2017,
    champions: [{ schoolId: 'imperio_da_uva', schoolName: 'Império da Uva' }],
    runnerUps: [{ schoolId: 'rosa_de_ouro', schoolName: 'Rosa de Ouro' }]
  },
  {
    year: 2018,
    champions: [{ schoolId: 'villa_rica', schoolName: 'Unidos da Villa Rica' }],
    runnerUps: [{ schoolId: 'academicos_de_madureira', schoolName: 'Acadêmicos de Madureira' }]
  },
  {
    year: 2019,
    champions: [{ schoolId: 'uniao_de_jacarepagua', schoolName: 'União de Jacarepaguá' }],
    runnerUps: [{ schoolId: 'botafogo_samba_clube', schoolName: 'Botafogo Samba Clube' }]
  },
  {
    year: 2020,
    champions: [{ schoolId: 'arrastao_cascadura', schoolName: 'Arrastão de Cascadura' }],
    runnerUps: [{ schoolId: 'santa_marta', schoolName: 'Mocidade Unida do Santa Marta' }]
  },
  {
    year: 2021,
    champions: [],
    runnerUps: [],
    note: 'Não houve Carnaval devido à pandemia de COVID-19'
  },
  {
    year: 2022,
    champions: [{ schoolId: 'fla_manguaca', schoolName: 'Fla Manguaça' }],
    runnerUps: [{ schoolId: 'tubarao_mesquita', schoolName: 'Tubarão de Mesquita' }]
  },
  {
    year: 2023,
    champions: [{ schoolId: 'alegria_do_vilar', schoolName: 'Alegria do Vilar' }],
    runnerUps: [{ schoolId: 'imperio_bras_de_pina', schoolName: 'Império de Brás de Pina' }]
  },
  {
    year: 2024,
    champions: [{ schoolId: 'unidos_da_vila_kennedy', schoolName: 'Unidos da Vila Kennedy' }],
    runnerUps: [{ schoolId: 'academicos_do_recreio', schoolName: 'Acadêmicos do Recreio' }]
  },
  {
    year: 2025,
    champions: [{ schoolId: 'rosa_de_ouro', schoolName: 'Rosa de Ouro' }],
    runnerUps: [{ schoolId: 'novo_imperio', schoolName: 'Novo Império' }]
  },
  {
    year: 2026,
    champions: [{ schoolId: 'casa_de_malandro', schoolName: 'Casa de Malandro' }],
    runnerUps: [{ schoolId: 'dificil_e_o_nome', schoolName: 'Difícil É o Nome' }]
  }
];

/**
 * Mapeamento oficial dos números consolidados de cada agremiação no Grupo de Avaliação
 */
export const OFFICIAL_AVALIACAO_RECORDS_BY_SCHOOL: Record<string, AvaliacaoSchoolRecord> = {
  // Campeãs (3 títulos)
  flor_da_mina: {
    titles: 3,
    titleYears: [1993, 2004, 2016],
    runnerUps: 0,
    runnerUpYears: []
  },

  // Campeãs (2 títulos)
  academicos_do_sossego: {
    titles: 2,
    titleYears: [1997, 2008],
    runnerUps: 0,
    runnerUpYears: []
  },
  alegria_da_zona_sul: {
    titles: 2,
    titleYears: [1994, 2000],
    runnerUps: 1,
    runnerUpYears: [1997]
  },
  em_cima_da_hora: {
    titles: 2,
    titleYears: [2006, 2010],
    runnerUps: 0,
    runnerUpYears: []
  },
  santa_marta: {
    titles: 2,
    titleYears: [1993, 2013],
    runnerUps: 1,
    runnerUpYears: [2020]
  },
  uniao_de_jacarepagua: {
    titles: 2,
    titleYears: [1998, 2019],
    runnerUps: 0,
    runnerUpYears: []
  },
  villa_rica: {
    titles: 2,
    titleYears: [1991, 2018],
    runnerUps: 1,
    runnerUpYears: [2010]
  },
  vizinha_faladeira: {
    titles: 2,
    titleYears: [1990, 2015],
    runnerUps: 0,
    runnerUpYears: []
  },

  // Campeãs (1 título)
  academicos_da_barra_da_tijuca: {
    titles: 1,
    titleYears: [2001],
    runnerUps: 0,
    runnerUpYears: []
  },
  rocinha: {
    titles: 1,
    titleYears: [1989],
    runnerUps: 0,
    runnerUpYears: []
  },
  vigario_geral: {
    titles: 1,
    titleYears: [1992],
    runnerUps: 1,
    runnerUpYears: [2016]
  },
  engenho_da_rainha: {
    titles: 1,
    titleYears: [2009],
    runnerUps: 0,
    runnerUpYears: []
  },
  alegria_do_vilar: {
    titles: 1,
    titleYears: [2023],
    runnerUps: 0,
    runnerUpYears: []
  },
  arrastao_cascadura: {
    titles: 1,
    titleYears: [2020],
    runnerUps: 0,
    runnerUpYears: []
  },
  casa_de_malandro: {
    titles: 1,
    titleYears: [2026],
    runnerUps: 0,
    runnerUpYears: []
  },
  amarelinho: {
    titles: 1,
    titleYears: [2007],
    runnerUps: 0,
    runnerUpYears: []
  },
  fla_manguaca: {
    titles: 1,
    titleYears: [2022],
    runnerUps: 0,
    runnerUpYears: []
  },
  imperio_da_praca_seca: {
    titles: 1,
    titleYears: [2011],
    runnerUps: 0,
    runnerUpYears: []
  },
  imperio_da_uva: {
    titles: 1,
    titleYears: [2017],
    runnerUps: 0,
    runnerUpYears: []
  },
  praca_da_bandeira: {
    titles: 1,
    titleYears: [2003],
    runnerUps: 0,
    runnerUpYears: []
  },
  vicente_de_carvalho: {
    titles: 1,
    titleYears: [2002],
    runnerUps: 0,
    runnerUpYears: []
  },
  renascer_jacarepagua: {
    titles: 1,
    titleYears: [1999],
    runnerUps: 0,
    runnerUpYears: []
  },
  rosa_de_ouro: {
    titles: 1,
    titleYears: [2025],
    runnerUps: 1,
    runnerUpYears: [2017]
  },
  uniao_vaz_lobo: {
    titles: 1,
    titleYears: [1995],
    runnerUps: 0,
    runnerUpYears: []
  },
  unidos_das_vargens: {
    titles: 1,
    titleYears: [2014],
    runnerUps: 0,
    runnerUpYears: []
  },
  unidos_de_lucas: {
    titles: 1,
    titleYears: [2012],
    runnerUps: 0,
    runnerUpYears: []
  },
  unidos_padre_miguel: {
    titles: 1,
    titleYears: [2005],
    runnerUps: 1,
    runnerUpYears: [1995]
  },
  unidos_do_campinho: {
    titles: 1,
    titleYears: [1996],
    runnerUps: 1,
    runnerUpYears: [1989]
  },
  unidos_da_vila_kennedy: {
    titles: 1,
    titleYears: [2024],
    runnerUps: 1,
    runnerUpYears: [1990]
  },

  // Vice-Campeãs (2 vices)
  academicos_do_dende: {
    titles: 0,
    titleYears: [],
    runnerUps: 2,
    runnerUpYears: [1993, 2006]
  },
  boemios_de_inhauma: {
    titles: 0,
    titleYears: [],
    runnerUps: 2,
    runnerUpYears: [1999, 2001]
  },
  mocidade_cidade_de_deus: {
    titles: 0,
    titleYears: [],
    runnerUps: 2,
    runnerUpYears: [2011, 2012]
  },

  // Vice-Campeãs (1 vice - sem título)
  abolicao: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2002]
  },
  academicos_do_recreio: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2024]
  },
  academicos_de_madureira: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2018]
  },
  boi_da_ilha: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [1991]
  },
  botafogo_samba_clube: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2019]
  },
  coroado_jacarepagua: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2015]
  },
  dificil_e_o_nome: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2026]
  },
  inocentes: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [1996]
  },
  imperio_bras_de_pina: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2023]
  },
  leao_de_nova_iguacu: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2013]
  },
  lins_imperial: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2014]
  },
  mocidade_de_vasconcelos: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [1992]
  },
  mocidade_de_inhauma: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [1998]
  },
  novo_imperio: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2025]
  },
  sereno_campo_grande: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2005]
  },
  tubarao_mesquita: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2022]
  },
  curicica: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2000]
  },
  vila_santa_tereza: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2009]
  },
  unidos_de_manguinhos: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2008]
  },
  unidos_anil: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2007]
  },
  unidos_do_cabral: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [2004]
  },
  porto_da_pedra: {
    titles: 0,
    titleYears: [],
    runnerUps: 1,
    runnerUpYears: [1994]
  }
};
