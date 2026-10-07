import { QuesitoConfig, School, Enredo, StaffMember, InGameAchievement, YearHistory, ConsolidatedSchoolStats, TitleYearEntry } from '../types/carnaval';
import { AVALIACAO_SCHOOLS_INITIAL, INACTIVE_SCHOOLS_INITIAL, generateRandomCarnavalSchool } from './avaliacaoData';

export const QUESITOS: QuesitoConfig[] = [
  {
    id: 'bateria',
    name: 'Bateria',
    order: 1,
    shortName: 'BAT',
    description: 'Cadência, ritmo, afinação dos instrumentos, paradinhas e sustentação do andamento.',
    keyAttribute: 'Mestre de Bateria & Ritmo'
  },
  {
    id: 'comissaoDeFrente',
    name: 'Comissão de Frente',
    order: 2,
    shortName: 'CDF',
    description: 'Saudação ao público, impacto visual, coreografia, sincronia e respeito ao enredo.',
    keyAttribute: 'Coreógrafo & Teatralidade'
  },
  {
    id: 'evolucao',
    name: 'Evolução',
    order: 3,
    shortName: 'EVO',
    description: 'Fluidez do desfile, ausência de buracos, correria ou paradas desnecessárias na avenida.',
    keyAttribute: 'Direção de Harmonia & Alas'
  },
  {
    id: 'harmonia',
    name: 'Harmonia',
    order: 4,
    shortName: 'HAR',
    description: 'Canto dos componentes da escola, entusiasmo e sincronia com o carro de som.',
    keyAttribute: 'Canto da Comunidade'
  },
  {
    id: 'enredo',
    name: 'Enredo',
    order: 5,
    shortName: 'ENR',
    description: 'Clareza temática, pesquisa histórica/cultural, roteiro e fácil compreensão visual.',
    keyAttribute: 'Carnavalesco & Pesquisa'
  },
  {
    id: 'fantasias',
    name: 'Fantasias',
    order: 6,
    shortName: 'FAN',
    description: 'Acabamento, cores, riqueza de materiais, leveza e adequação à narrativa.',
    keyAttribute: 'Ateliê do Barracão'
  },
  {
    id: 'alegorias',
    name: 'Alegorias e Adereço',
    order: 7,
    shortName: 'ALE',
    description: 'Grandiosidade dos carros alegóricos, iluminação, escultura, segurança e acabamento.',
    keyAttribute: 'Esculturas & Mecânica'
  },
  {
    id: 'sambaEnredo',
    name: 'Samba Enredo',
    order: 8,
    shortName: 'SAM',
    description: 'Letra poética, melodia marcante, adequação ao enredo e pegada na avenida.',
    keyAttribute: 'Compositores & Intérprete'
  },
  {
    id: 'mestreSalaPortaBandeira',
    name: 'Mestre e Sala e Porta Bandeira',
    order: 9,
    shortName: 'MSPB',
    description: 'Condução e reverência ao pavilhão sagrado, elegância, giros e sincronismo do casal.',
    keyAttribute: '1º Casal de MS e PB'
  }
];

// Available enredos that schools can select
export const SAMPLE_ENREDOS: Enredo[] = [
  {
    id: 'enr_japao',
    title: 'O Império do Sol Nascente: O Voo das Garças de Quioto, a Honra dos Samurais e o Laço Eterno no Brasil',
    themeType: 'Cultural',
    synopsis: 'A saga milenar do Japão, os deuses xintoístas, os bravos samurais, o navio Kasato Maru e a fraternidade nipo-brasileira na Sapucaí.',
    qualityBoost: 16,
    cost: 210000
  },
  {
    id: 'enr_egito',
    title: 'Os Mistérios de Tutancâmon: O Rio Nilo da Criação, a Balança de Anúbis e a Luz Eterna das Pirâmides',
    themeType: 'Histórico',
    synopsis: 'A imortalidade dos faraós, as pirâmides de Gizé, os ritos do Livro dos Mortos e o fausto de Alexandria com Cleópatra.',
    qualityBoost: 16,
    cost: 215000
  },
  {
    id: 'enr_amazonia',
    title: 'Amazônia, o Coração Verde da Terra: A Samaúma Sagrada, o Canto dos Encantados e o Grito da Floresta Viva',
    themeType: 'Ambiental & Natureza',
    synopsis: 'A Samaúma cósmica, a magia dos botos e do Curupira, o festival folclórico de Parintins e os rios voadores que sustentam o planeta.',
    qualityBoost: 16,
    cost: 205000
  },
  {
    id: 'enr_futebol',
    title: 'A Pátria de Chuteiras: Da Bola de Meia ao Maracanã, o Samba no Pé e a Emoção Sagrada do Gol',
    themeType: 'Cultural',
    synopsis: 'Da várzea aos templos mundiais, a ginga dos dribles, o Rei Pelé, Garrincha, Marta e a paixão arrebatadora das torcidas.',
    qualityBoost: 15,
    cost: 195000
  },
  {
    id: 'enr_ia',
    title: 'O Algoritmo do Tamborim: Pode a Máquina Ter Alma? A Inteligência Artificial diante da Ginga do Samba',
    themeType: 'Surrealista',
    synopsis: 'Tema Inédito: Das redes neurais e androides à vitória do coração humano: a poesia do samba que nenhum código é capaz de calcular.',
    qualityBoost: 16,
    cost: 220000
  },
  {
    id: 'enr_astronomia',
    title: 'Odisseia Estelar: A Dança das Galáxias, o Pálido Ponto Azul e o Voo do Samba pelo Infinito',
    themeType: 'Surrealista',
    synopsis: 'Tema Inédito: Do Big Bang às nebulosas cósmicas: a astronomia do James Webb e a poeira de estrelas que baila na passarela.',
    qualityBoost: 16,
    cost: 215000
  },
  {
    id: 'enr_afro',
    title: 'O Canto Sagrado das Águas de Oió',
    themeType: 'Afro-brasileiro',
    synopsis: 'Uma viagem mística pelas divindades iorubás e os mistérios das águas ancestrais.',
    qualityBoost: 12,
    cost: 180000
  },
  {
    id: 'enr_lapa',
    title: 'Sinfonia da Lapa: Malandros, Poetas e Boêmios',
    themeType: 'Cultural',
    synopsis: 'Os arcos, o violão de sete cordas e a poesia noturna dos botecos cariocas.',
    qualityBoost: 10,
    cost: 140000
  }
];

// Pool of staff for market transfers
export const AVAILABLE_STAFF_MARKET: StaffMember[] = [
  { id: 'st_c1', name: 'Leandro Vieira da Silva', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 94, salary: 150000, reputation: 'Gênio Estético' },
  { id: 'st_c2', name: 'Paulo Barros Jr.', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 92, salary: 140000, reputation: 'Mago dos Truques' },
  { id: 'st_c3', name: 'Rosa Magalhães Neto', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 90, salary: 120000, reputation: 'Professora do Barroco' },
  { id: 'st_c4', name: 'Alex de Souza Ramos', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 84, salary: 90000, reputation: 'Estrategista Moderno' },
  { id: 'st_c5', name: 'Marcus Ferreira Lima', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 88, salary: 110000, reputation: 'Pesquisador Campeão' },
  { id: 'st_c6', name: 'Renato Lage Filho', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 86, salary: 95000, reputation: 'Futurista & Luz' },
  
  { id: 'st_b1', name: 'Mestre Ciça', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 96, salary: 110000, reputation: 'Lenda do Tamborim' },
  { id: 'st_b2', name: 'Mestre Rodney', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 93, salary: 95000, reputation: 'Afinação Cirúrgica' },
  { id: 'st_b3', name: 'Mestre Fafá', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 91, salary: 85000, reputation: 'Inovador de Paradinhas' },
  { id: 'st_b4', name: 'Mestre Lolo', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 89, salary: 80000, reputation: 'Firmeza de Ritmo' },
  { id: 'st_b5', name: 'Mestre Nilo', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 85, salary: 70000, reputation: 'Jovem Talento' },

  { id: 'st_i1', name: 'Neguinho da Beija-Flor', role: 'interprete', roleName: 'Intérprete Oficial', rating: 97, salary: 140000, reputation: 'Voz Imortal' },
  { id: 'st_i2', name: 'Wander Pires', role: 'interprete', roleName: 'Intérprete Oficial', rating: 93, salary: 110000, reputation: 'Potência & Agudo' },
  { id: 'st_i3', name: 'Tinga do Samba', role: 'interprete', roleName: 'Intérprete Oficial', rating: 91, salary: 95000, reputation: 'Canto Apaixonado' },
  { id: 'st_i4', name: 'Zé Paulo Sierra', role: 'interprete', roleName: 'Intérprete Oficial', rating: 92, salary: 100000, reputation: 'Grito Guerreiro' },
  { id: 'st_i5', name: 'Marquinho Art\'Samba', role: 'interprete', roleName: 'Intérprete Oficial', rating: 88, salary: 80000, reputation: 'Afinação Precisa' },

  { id: 'st_m1', name: 'Claudinho & Selminha Sorriso', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 96, salary: 120000, reputation: 'Dupla Histórica' },
  { id: 'st_m2', name: 'Sidclei Santos & Marcella Alves', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 95, salary: 115000, reputation: 'Elegância Suprema' },
  { id: 'st_m3', name: 'Julinho & Rute Alves', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 94, salary: 110000, reputation: 'Giros Perfeitos' },
  { id: 'st_m4', name: 'Matheus Olivério & Cintia Ribeiro', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 91, salary: 90000, reputation: 'Nobreza Tradicional' },
  { id: 'st_m5', name: 'Rodrigo Negão & Emanuelly', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 86, salary: 65000, reputation: 'Promessa da Avenida' },

  { id: 'st_cf1', name: 'Patrick Carvalho', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 95, salary: 105000, reputation: 'Ilusionismo Teatral' },
  { id: 'st_cf2', name: 'Priscilla Mota & Rodrigo Negri', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 96, salary: 115000, reputation: 'Campeões do Efeito' },
  { id: 'st_cf3', name: 'Marcelo Misailidis', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 90, salary: 85000, reputation: 'Dança Clássica & Samba' },
  { id: 'st_cf4', name: 'Hélio Bejani & Beth Bejani', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 92, salary: 95000, reputation: 'Rigor Cênico' },

  { id: 'st_h1', name: 'Jairo da Tijuca', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 92, salary: 80000, reputation: 'Cronômetro Implacável' },
  { id: 'st_h2', name: 'Almir Reis', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 94, salary: 90000, reputation: 'Voz da Comunidade' },
  { id: 'st_h3', name: 'Jorge Silveira', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 88, salary: 70000, reputation: 'Evolução Disciplinada' }
];

export interface SchoolHistoryRecord {
  championshipsEspecial: number;
  runnerUpsEspecial: number;
  especialYears?: number[];
  especialRunnerUpYears?: number[];
  championshipsOuro: number;
  runnerUpsOuro: number;
  ouroYears?: number[];
  ouroRunnerUpYears?: number[];
  championshipsPrata?: number;
  runnerUpsPrata?: number;
  prataYears?: number[];
  championshipsBronze?: number;
  runnerUpsBronze?: number;
  bronzeYears?: number[];
  championshipsAvaliacao?: number;
  runnerUpsAvaliacao?: number;
  avaliacaoYears?: number[];
}

export const HISTORICAL_CARNAVAL_RECORDS: Record<string, SchoolHistoryRecord> = {
  portela: {
    championshipsEspecial: 22,
    runnerUpsEspecial: 13,
    especialYears: [1935, 1939, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1951, 1953, 1957, 1958, 1959, 1960, 1962, 1964, 1966, 1970, 1980, 1984, 2017],
    especialRunnerUpYears: [1932, 1934, 1937, 1949, 1950, 1956, 1971, 1974, 1977, 1982, 1983, 1984, 1995],
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    ouroYears: [],
    ouroRunnerUpYears: []
  },
  mangueira: {
    championshipsEspecial: 20,
    runnerUpsEspecial: 19,
    especialYears: [1932, 1933, 1934, 1940, 1949, 1950, 1954, 1960, 1961, 1967, 1968, 1973, 1984, 1984, 1986, 1987, 1998, 2002, 2016, 2019],
    especialRunnerUpYears: [1935, 1936, 1939, 1941, 1943, 1944, 1945, 1946, 1947, 1955, 1963, 1966, 1969, 1972, 1975, 1976, 1978, 1988, 2003],
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    ouroYears: [],
    ouroRunnerUpYears: []
  },
  beija_flor: {
    championshipsEspecial: 15,
    runnerUpsEspecial: 14,
    especialYears: [1976, 1977, 1978, 1980, 1983, 1998, 2003, 2004, 2005, 2007, 2008, 2011, 2015, 2018, 2025],
    especialRunnerUpYears: [1979, 1981, 1985, 1986, 1989, 1990, 1999, 2000, 2001, 2002, 2009, 2013, 2022, 2026],
    championshipsOuro: 1,
    runnerUpsOuro: 2,
    ouroYears: [1954],
    ouroRunnerUpYears: [1962, 1973]
  },
  salgueiro: {
    championshipsEspecial: 9,
    runnerUpsEspecial: 10,
    especialYears: [1960, 1963, 1965, 1969, 1971, 1974, 1975, 1993, 2009],
    especialRunnerUpYears: [1959, 1961, 1964, 1970, 1991, 1994, 2008, 2012, 2014, 2015],
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    ouroYears: [],
    ouroRunnerUpYears: []
  },
  imperatriz: {
    championshipsEspecial: 9,
    runnerUpsEspecial: 3,
    especialYears: [1980, 1981, 1989, 1994, 1995, 1999, 2000, 2001, 2023],
    especialRunnerUpYears: [1993, 1996, 2024],
    championshipsOuro: 1,
    runnerUpsOuro: 4,
    ouroYears: [2020],
    ouroRunnerUpYears: [1964, 1966, 1968, 1978]
  },
  imperio_serrano: {
    championshipsEspecial: 9,
    runnerUpsEspecial: 10,
    especialYears: [1948, 1949, 1950, 1951, 1955, 1956, 1960, 1972, 1982],
    especialRunnerUpYears: [1953, 1954, 1957, 1958, 1962, 1965, 1967, 1968, 1973, 1984],
    championshipsOuro: 5,
    runnerUpsOuro: 5,
    ouroYears: [1998, 2000, 2008, 2017, 2022],
    ouroRunnerUpYears: [1979, 1993, 2012, 2024, 2026]
  },
  mocidade: {
    championshipsEspecial: 6,
    runnerUpsEspecial: 5,
    especialYears: [1979, 1985, 1990, 1991, 1996, 2017],
    especialRunnerUpYears: [1980, 1984, 1987, 1992, 1997],
    championshipsOuro: 1,
    runnerUpsOuro: 0,
    ouroYears: [1958],
    ouroRunnerUpYears: []
  },
  tijuca: {
    championshipsEspecial: 4,
    runnerUpsEspecial: 6,
    especialYears: [1936, 2010, 2012, 2014],
    especialRunnerUpYears: [1934, 1948, 2004, 2005, 2011, 2016],
    championshipsOuro: 3,
    runnerUpsOuro: 1,
    ouroYears: [1980, 1987, 1999],
    ouroRunnerUpYears: [1985]
  },
  viradouro: {
    championshipsEspecial: 4,
    runnerUpsEspecial: 2,
    especialYears: [1997, 2020, 2024, 2026],
    especialRunnerUpYears: [2019, 2023],
    championshipsOuro: 3,
    runnerUpsOuro: 3,
    ouroYears: [1990, 2014, 2018],
    ouroRunnerUpYears: [2011, 2013, 2017]
  },
  vila_isabel: {
    championshipsEspecial: 3,
    runnerUpsEspecial: 1,
    especialYears: [1988, 2006, 2013],
    especialRunnerUpYears: [1980],
    championshipsOuro: 2,
    runnerUpsOuro: 3,
    ouroYears: [1979, 2004],
    ouroRunnerUpYears: [1956, 1965, 2002]
  },
  estacio_de_sa: {
    championshipsEspecial: 1,
    runnerUpsEspecial: 0,
    especialYears: [1992],
    especialRunnerUpYears: [],
    championshipsOuro: 8,
    runnerUpsOuro: 2,
    ouroYears: [1967, 1973, 1978, 1981, 1983, 2006, 2015, 2019],
    ouroRunnerUpYears: [2014, 2025]
  },
  grande_rio: {
    championshipsEspecial: 1,
    runnerUpsEspecial: 5,
    especialYears: [2022],
    especialRunnerUpYears: [2006, 2007, 2010, 2020, 2025],
    championshipsOuro: 1,
    runnerUpsOuro: 1,
    ouroYears: [1992],
    ouroRunnerUpYears: [1990]
  },
  tuiuti: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 1,
    especialRunnerUpYears: [2018],
    championshipsOuro: 1,
    runnerUpsOuro: 1,
    ouroYears: [2016],
    ouroRunnerUpYears: [2000]
  },
  uniao_da_ilha: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 1,
    especialRunnerUpYears: [1980],
    championshipsOuro: 2,
    runnerUpsOuro: 2,
    ouroYears: [1974, 2009],
    ouroRunnerUpYears: [2003, 2005]
  },
  // Escolas históricas extintas do Grupo Especial e Série Ouro (na aba Inativas)
  unidos_da_capela: {
    championshipsEspecial: 2,
    runnerUpsEspecial: 0,
    especialYears: [1950, 1960],
    especialRunnerUpYears: [],
    championshipsOuro: 1,
    runnerUpsOuro: 0,
    ouroYears: [1963],
    ouroRunnerUpYears: []
  },
  prazer_da_serrinha: {
    championshipsEspecial: 1,
    runnerUpsEspecial: 0,
    especialYears: [1950],
    especialRunnerUpYears: [],
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    ouroYears: [],
    ouroRunnerUpYears: []
  },
  recreio_de_ramos: {
    championshipsEspecial: 1,
    runnerUpsEspecial: 0,
    especialYears: [1934],
    especialRunnerUpYears: [],
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    ouroYears: [],
    ouroRunnerUpYears: []
  },
  aprendizes_de_lucas: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 3,
    especialYears: [],
    especialRunnerUpYears: [1950, 1951, 1960],
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    ouroYears: [],
    ouroRunnerUpYears: []
  },
  azul_e_branco_salgueiro: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 2,
    especialYears: [],
    especialRunnerUpYears: [1933, 1949],
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    ouroYears: [],
    ouroRunnerUpYears: []
  },
  depois_eu_digo: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 2,
    especialYears: [],
    especialRunnerUpYears: [1942, 1950],
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    ouroYears: [],
    ouroRunnerUpYears: []
  },
  tres_mosqueteiros: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 2,
    especialYears: [],
    especialRunnerUpYears: [1950, 1951],
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    ouroYears: [],
    ouroRunnerUpYears: []
  },
  mocidade_louca_sao_cristovao: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 1,
    especialYears: [],
    especialRunnerUpYears: [1940],
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    ouroYears: [],
    ouroRunnerUpYears: []
  },
  cada_ano_sai_melhor: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 1,
    especialYears: [],
    especialRunnerUpYears: [1932],
    championshipsOuro: 0,
    runnerUpsOuro: 1,
    ouroYears: [],
    ouroRunnerUpYears: [1952]
  },
  coracoes_unidos_jacarepagua: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    especialYears: [],
    especialRunnerUpYears: [],
    championshipsOuro: 1,
    runnerUpsOuro: 0,
    ouroYears: [1955],
    ouroRunnerUpYears: []
  },
  flor_do_lins: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    especialYears: [],
    especialRunnerUpYears: [],
    championshipsOuro: 1,
    runnerUpsOuro: 0,
    ouroYears: [1956],
    ouroRunnerUpYears: []
  },
  paz_e_amor: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    especialYears: [],
    especialRunnerUpYears: [],
    championshipsOuro: 1,
    runnerUpsOuro: 0,
    ouroYears: [1955],
    ouroRunnerUpYears: []
  },
  tupy_bras_de_pina: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    especialYears: [],
    especialRunnerUpYears: [],
    championshipsOuro: 1,
    runnerUpsOuro: 3,
    ouroYears: [1972],
    ouroRunnerUpYears: [1957, 1961, 1975]
  },
  uniao_do_centenario: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    especialYears: [],
    especialRunnerUpYears: [],
    championshipsOuro: 1,
    runnerUpsOuro: 0,
    ouroYears: [1956],
    ouroRunnerUpYears: []
  },
  unidos_do_indaia: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    especialYears: [],
    especialRunnerUpYears: [],
    championshipsOuro: 1,
    runnerUpsOuro: 0,
    ouroYears: [1952],
    ouroRunnerUpYears: []
  },
  academicos_bento_ribeiro: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    especialYears: [],
    especialRunnerUpYears: [],
    championshipsOuro: 0,
    runnerUpsOuro: 1,
    ouroYears: [],
    ouroRunnerUpYears: [1960]
  },
  aprendizes_boca_do_mato: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    especialYears: [],
    especialRunnerUpYears: [],
    championshipsOuro: 0,
    runnerUpsOuro: 1,
    ouroYears: [],
    ouroRunnerUpYears: [1959]
  },
  independentes_cordovil: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    especialYears: [],
    especialRunnerUpYears: [],
    championshipsOuro: 0,
    runnerUpsOuro: 1,
    ouroYears: [],
    ouroRunnerUpYears: [1967]
  },
  independentes_do_rio: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    especialYears: [],
    especialRunnerUpYears: [],
    championshipsOuro: 0,
    runnerUpsOuro: 1,
    ouroYears: [],
    ouroRunnerUpYears: [1953]
  },
  unidos_bento_ribeiro: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    especialYears: [],
    especialRunnerUpYears: [],
    championshipsOuro: 0,
    runnerUpsOuro: 1,
    ouroYears: [],
    ouroRunnerUpYears: [1955]
  },
  unidos_do_salgueiro: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    especialYears: [],
    especialRunnerUpYears: [],
    championshipsOuro: 0,
    runnerUpsOuro: 1,
    ouroYears: [],
    ouroRunnerUpYears: [1958]
  },
  porto_da_pedra: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 3,
    runnerUpsOuro: 2,
    ouroYears: [1995, 2001, 2023],
    ouroRunnerUpYears: [1999, 2022]
  },
  santa_cruz: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 5,
    runnerUpsOuro: 2,
    ouroYears: [1965, 1969, 1989, 1996, 2002],
    ouroRunnerUpYears: [1984, 2004]
  },
  unidos_padre_miguel: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 2,
    runnerUpsOuro: 7,
    ouroYears: [1959, 2024],
    ouroRunnerUpYears: [1963, 1970, 2015, 2016, 2018, 2020, 2023]
  },
  sao_clemente: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 4,
    runnerUpsOuro: 5,
    ouroYears: [1966, 2003, 2007, 2010],
    ouroRunnerUpYears: [1986, 1994, 1998, 2001, 2006]
  },
  unidos_da_ponte: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 1,
    runnerUpsOuro: 2,
    ouroYears: [1985],
    ouroRunnerUpYears: [1982, 1992]
  },
  inocentes: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 1,
    runnerUpsOuro: 1,
    ouroYears: [2012],
    ouroRunnerUpYears: [2010]
  },
  jacarezinho: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 1,
    runnerUpsOuro: 3,
    ouroYears: [1986],
    ouroRunnerUpYears: [1969, 1972, 1988]
  },
  em_cima_da_hora: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 2,
    runnerUpsOuro: 0,
    ouroYears: [1968, 1971],
    ouroRunnerUpYears: []
  },
  arranco: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 1,
    runnerUpsOuro: 2,
    ouroYears: [1988],
    ouroRunnerUpYears: [1977, 1980]
  },
  unidos_de_bangu: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 2,
    runnerUpsOuro: 0,
    ouroYears: [1957, 1962],
    ouroRunnerUpYears: []
  },
  botafogo_samba_clube: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    ouroYears: [],
    ouroRunnerUpYears: []
  },
  parque_acari: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    ouroYears: [],
    ouroRunnerUpYears: []
  },
  marica: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 1,
    runnerUpsOuro: 0,
    ouroYears: [2026],
    ouroRunnerUpYears: []
  },
  niteroi: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 1,
    runnerUpsOuro: 0,
    ouroYears: [2025],
    ouroRunnerUpYears: []
  },
  vigario_geral: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    ouroYears: [],
    ouroRunnerUpYears: []
  },
  // Série Prata (Terceira Divisão - 24 agremiações)
  unidos_de_lucas: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 2,
    ouroYears: [],
    ouroRunnerUpYears: [1971, 1974]
  },
  rosa_de_ouro: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0
  },
  curicica: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    ouroYears: [],
    ouroRunnerUpYears: []
  },
  vila_santa_tereza: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0
  },
  arrastao_cascadura: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 1,
    runnerUpsOuro: 0,
    ouroYears: [1977],
    ouroRunnerUpYears: []
  },
  renascer_jacarepagua: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 1,
    runnerUpsOuro: 1,
    ouroYears: [2011],
    ouroRunnerUpYears: [2009]
  },
  independentes_olaria: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0
  },
  leao_zona_oeste: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0
  },
  sereno_campo_grande: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    ouroYears: [],
    ouroRunnerUpYears: []
  },
  tradicao: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 3,
    runnerUpsOuro: 1,
    ouroYears: [1991, 1993, 1997],
    ouroRunnerUpYears: [1987]
  },
  tubarao_mesquita: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0
  },
  engenho_da_rainha: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 1,
    runnerUpsOuro: 0,
    ouroYears: [1953],
    ouroRunnerUpYears: []
  },
  imperio_da_tijuca: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 4,
    runnerUpsOuro: 3,
    ouroYears: [1964, 1970, 1976, 2013],
    ouroRunnerUpYears: [1981, 1983, 1995]
  },
  santa_marta: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0
  },
  boi_da_ilha: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    ouroYears: [],
    ouroRunnerUpYears: []
  },
  fla_manguaca: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0
  },
  unidos_de_cosmos: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0
  },
  imperio_da_uva: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0
  },
  rocinha: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 1,
    runnerUpsOuro: 2,
    ouroYears: [2005],
    ouroRunnerUpYears: [1996, 2008]
  },
  cubango: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 1,
    ouroYears: [],
    ouroRunnerUpYears: [2019]
  },
  abolicao: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0
  },
  alegria_do_vilar: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0
  },
  feitico_carioca: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0
  },
  lins_imperial: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 1,
    runnerUpsOuro: 1,
    ouroYears: [1975],
    ouroRunnerUpYears: [1989]
  },
  // Série Bronze (Quarta Divisão - 22 agremiações)
  arame_de_ricardo: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 0,
    runnerUpsBronze: 0
  },
  chatuba: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 0,
    runnerUpsBronze: 0
  },
  uniao_cruzmaltina: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 0,
    runnerUpsBronze: 0
  },
  villa_rica: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 1,
    runnerUpsOuro: 0,
    ouroYears: [1994],
    ouroRunnerUpYears: [],
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 0,
    runnerUpsBronze: 0
  },
  vicente_de_carvalho: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 0,
    runnerUpsBronze: 0
  },
  imperio_nova_iguacu: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 0,
    runnerUpsBronze: 0
  },
  cabucu: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 2,
    runnerUpsOuro: 1,
    ouroYears: [1961, 1984],
    ouroRunnerUpYears: [1976],
    championshipsPrata: 2,
    runnerUpsPrata: 1,
    championshipsBronze: 1,
    runnerUpsBronze: 0,
    bronzeYears: [2018]
  },
  novo_imperio: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 0,
    runnerUpsBronze: 0
  },
  praca_da_bandeira: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 0,
    runnerUpsBronze: 0
  },
  casa_de_malandro: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 0,
    runnerUpsBronze: 0
  },
  coroado_jacarepagua: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 0,
    runnerUpsBronze: 0
  },
  imperadores_rubro_negros: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 0,
    runnerUpsBronze: 0
  },
  academicos_do_dende: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 0,
    runnerUpsBronze: 0
  },
  siri_de_ramos: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 0,
    runnerUpsBronze: 0
  },
  vizinha_faladeira: {
    championshipsEspecial: 1,
    runnerUpsEspecial: 0,
    especialYears: [1937],
    especialRunnerUpYears: [],
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    ouroYears: [],
    ouroRunnerUpYears: [],
    championshipsPrata: 2,
    runnerUpsPrata: 1,
    championshipsBronze: 0,
    runnerUpsBronze: 0
  },
  academicos_do_recreio: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 0,
    runnerUpsBronze: 0
  },
  leao_de_nova_iguacu: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 1,
    ouroYears: [],
    ouroRunnerUpYears: [1991],
    championshipsPrata: 1,
    runnerUpsPrata: 1,
    championshipsBronze: 0,
    runnerUpsBronze: 0
  },
  alegria_de_copacabana: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 0,
    runnerUpsBronze: 0
  },
  uniao_de_jacarepagua: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    ouroYears: [],
    ouroRunnerUpYears: [],
    championshipsPrata: 1,
    runnerUpsPrata: 1,
    championshipsBronze: 0,
    runnerUpsBronze: 0
  },
  caprichosos_de_pilares: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 2,
    runnerUpsOuro: 3,
    ouroYears: [1960, 1982],
    ouroRunnerUpYears: [1954, 1997, 2007],
    championshipsPrata: 1,
    runnerUpsPrata: 0,
    championshipsBronze: 0,
    runnerUpsBronze: 0
  },
  dificil_e_o_nome: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 1,
    championshipsBronze: 1,
    runnerUpsBronze: 0,
    bronzeYears: [2020]
  },
  academicos_de_madureira: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 0,
    runnerUpsBronze: 0
  },
  tpm_madureira: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 0,
    runnerUpsBronze: 0,
    championshipsAvaliacao: 0,
    runnerUpsAvaliacao: 0
  },
  amarelinho: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 0,
    runnerUpsBronze: 0,
    championshipsAvaliacao: 0,
    runnerUpsAvaliacao: 0
  },
  uniao_vaz_lobo: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 1,
    prataYears: [1961],
    runnerUpsPrata: 0,
    championshipsBronze: 1,
    bronzeYears: [1980],
    runnerUpsBronze: 0,
    championshipsAvaliacao: 0,
    runnerUpsAvaliacao: 0
  },
  imperio_petropolis: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 0,
    runnerUpsBronze: 0,
    championshipsAvaliacao: 0,
    runnerUpsAvaliacao: 0
  },
  sao_cristovao: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 1,
    bronzeYears: [1975],
    runnerUpsBronze: 0,
    championshipsAvaliacao: 0,
    runnerUpsAvaliacao: 0
  },
  manguariba: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 0,
    runnerUpsBronze: 0,
    championshipsAvaliacao: 0,
    runnerUpsAvaliacao: 0
  },
  unidos_anil: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 0,
    runnerUpsBronze: 0,
    championshipsAvaliacao: 0,
    runnerUpsAvaliacao: 0
  },
  canarios_laranjeiras: {
    championshipsEspecial: 0,
    runnerUpsEspecial: 0,
    championshipsOuro: 0,
    runnerUpsOuro: 0,
    championshipsPrata: 0,
    runnerUpsPrata: 0,
    championshipsBronze: 1,
    bronzeYears: [1968],
    runnerUpsBronze: 0,
    championshipsAvaliacao: 0,
    runnerUpsAvaliacao: 0
  }
};

const RAW_INITIAL_SCHOOLS: Omit<School, 'runnerUpsEspecial' | 'runnerUpsOuro' | 'runnerUpsPrata' | 'runnerUpsBronze' | 'honors'>[] = [
  // ==========================================
  // GRUPO ESPECIAL (12 ESCOLAS CONFORME SOLICITADO)
  // ==========================================
  {
    id: 'viradouro',
    name: 'Unidos do Viradouro',
    shortName: 'Viradouro',
    nickname: 'O Furacão Vermelho e Branco',
    foundationYear: 1946,
    neighborhood: 'Barreto, Niterói',
    colors: {
      primary: '#dc2626',
      secondary: '#ffffff',
      accent: '#991b1b',
      text: '#ffffff',
      border: '#dc2626'
    },
    symbol: '👑 Serpente & Coroa',
    division: 'especial',
    budget: 2800000,
    fanBaseMorale: 92,
    championshipsEspecial: 3,
    championshipsOuro: 3,
    attributes: {
      bateria: 95,
      comissaoDeFrente: 96,
      evolucao: 94,
      harmonia: 94,
      enredo: 95,
      fantasias: 96,
      alegorias: 95,
      sambaEnredo: 93,
      mestreSalaPortaBandeira: 94
    },
    staff: {
      carnavalesco: { id: 'v_c', name: 'Tarcísio Zanon', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 95, salary: 140000, reputation: 'Campeão Atual' },
      mestreBateria: { id: 'v_b', name: 'Mestre Ciça', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 96, salary: 110000, reputation: 'Lenda Viva' },
      harmonia: { id: 'v_h', name: 'Marcos Mendes', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 93, salary: 80000, reputation: 'Rigor Técnico' },
      mestreSalaPortaBandeira: { id: 'v_m', name: 'Julinho & Rute Alves', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 94, salary: 105000, reputation: 'Giros Nobres' },
      interprete: { id: 'v_i', name: 'Wander Pires', role: 'interprete', roleName: 'Intérprete Oficial', rating: 94, salary: 115000, reputation: 'Voz Marcante' },
      coreografo: { id: 'v_cf', name: 'Priscilla Mota & Rodrigo Negri', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 96, salary: 115000, reputation: 'Mágicos da Sapucaí' }
    },
    currentEnredo: SAMPLE_ENREDOS[0],
    rehearsalLevel: 85,
    barracaoProgress: 80,
    technicalParadeDone: false
  },
  {
    id: 'beija_flor',
    name: 'Beija-Flor de Nilópolis',
    shortName: 'Beija-Flor',
    nickname: 'A Deusa da Passarela',
    foundationYear: 1948,
    neighborhood: 'Nilópolis, Baixada Fluminense',
    colors: {
      primary: '#2563eb',
      secondary: '#ffffff',
      accent: '#1e40af',
      text: '#ffffff',
      border: '#3b82f6'
    },
    symbol: '🐦 Beija-Flor Real',
    division: 'especial',
    budget: 3100000,
    fanBaseMorale: 90,
    championshipsEspecial: 15,
    championshipsOuro: 1,
    attributes: {
      bateria: 94,
      comissaoDeFrente: 92,
      evolucao: 95,
      harmonia: 96,
      enredo: 92,
      fantasias: 93,
      alegorias: 94,
      sambaEnredo: 95,
      mestreSalaPortaBandeira: 96
    },
    staff: {
      carnavalesco: { id: 'bf_c', name: 'João Vitor Araújo', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 92, salary: 130000, reputation: 'Inovador Plástico' },
      mestreBateria: { id: 'bf_b', name: 'Mestre Rodney & Plínio', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 93, salary: 90000, reputation: 'Soberana de Nilópolis' },
      harmonia: { id: 'bf_h', name: 'Válber Frutuoso', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 95, salary: 90000, reputation: 'Comunidade Afinada' },
      mestreSalaPortaBandeira: { id: 'bf_m', name: 'Claudinho & Selminha Sorriso', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 96, salary: 120000, reputation: 'Ícones Históricos' },
      interprete: { id: 'bf_i', name: 'Neguinho da Beija-Flor', role: 'interprete', roleName: 'Intérprete Oficial', rating: 97, salary: 140000, reputation: 'A Voz Eterna' },
      coreografo: { id: 'bf_cf', name: 'Jorge Texeira & Saulo Finelon', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 91, salary: 85000, reputation: 'Tradição Cênica' }
    },
    currentEnredo: SAMPLE_ENREDOS[1],
    rehearsalLevel: 80,
    barracaoProgress: 85,
    technicalParadeDone: false
  },
  {
    id: 'vila_isabel',
    name: 'Unidos de Vila Isabel',
    shortName: 'Vila Isabel',
    nickname: 'O Povo do Samba',
    foundationYear: 1946,
    neighborhood: 'Vila Isabel',
    colors: {
      primary: '#0284c7',
      secondary: '#ffffff',
      accent: '#0369a1',
      text: '#ffffff',
      border: '#38bdf8'
    },
    symbol: '👑 Coroa com Fita Azul',
    division: 'especial',
    budget: 2700000,
    fanBaseMorale: 88,
    championshipsEspecial: 3,
    championshipsOuro: 1,
    attributes: {
      bateria: 93,
      comissaoDeFrente: 91,
      evolucao: 93,
      harmonia: 94,
      enredo: 93,
      fantasias: 94,
      alegorias: 94,
      sambaEnredo: 94,
      mestreSalaPortaBandeira: 93
    },
    staff: {
      carnavalesco: { id: 'vi_c', name: 'Paulo Barros', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 93, salary: 145000, reputation: 'Mago dos Efeitos' },
      mestreBateria: { id: 'vi_b', name: 'Mestre Macaco Branco', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 92, salary: 85000, reputation: 'Swingueira Pura' },
      harmonia: { id: 'vi_h', name: 'Marcelinho Emoção', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 91, salary: 75000, reputation: 'Voz da Vila' },
      mestreSalaPortaBandeira: { id: 'vi_m', name: 'Marcinho Siqueira & Cristiane Caldas', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 92, salary: 85000, reputation: 'Graciosidade' },
      interprete: { id: 'vi_i', name: 'Tinga', role: 'interprete', roleName: 'Intérprete Oficial', rating: 93, salary: 105000, reputation: 'Grito Inconfundível' },
      coreografo: { id: 'vi_cf', name: 'Alex Neoral', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 90, salary: 80000, reputation: 'Dança Contemporânea' }
    },
    currentEnredo: SAMPLE_ENREDOS[2],
    rehearsalLevel: 82,
    barracaoProgress: 78,
    technicalParadeDone: false
  },
  {
    id: 'salgueiro',
    name: 'Acadêmicos do Salgueiro',
    shortName: 'Salgueiro',
    nickname: 'A Academia do Samba',
    foundationYear: 1953,
    neighborhood: 'Andaraí / Tijuca',
    colors: {
      primary: '#b91c1c',
      secondary: '#ffffff',
      accent: '#7f1d1d',
      text: '#ffffff',
      border: '#ef4444'
    },
    symbol: '🥁 Tambores & Pandeiro',
    division: 'especial',
    budget: 2750000,
    fanBaseMorale: 89,
    championshipsEspecial: 9,
    championshipsOuro: 0,
    attributes: {
      bateria: 96,
      comissaoDeFrente: 92,
      evolucao: 93,
      harmonia: 93,
      enredo: 94,
      fantasias: 93,
      alegorias: 93,
      sambaEnredo: 95,
      mestreSalaPortaBandeira: 93
    },
    staff: {
      carnavalesco: { id: 's_c', name: 'Jorge Silveira', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 91, salary: 115000, reputation: 'Visual Marcante' },
      mestreBateria: { id: 's_b', name: 'Mestres Guilherme & Gustavo', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 96, salary: 110000, reputation: 'Furiosa do Salgueiro' },
      harmonia: { id: 's_h', name: 'Wilsinho Alves', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 92, salary: 80000, reputation: 'Pressão da Quadra' },
      mestreSalaPortaBandeira: { id: 's_m', name: 'Sidclei Santos & Marcella Alves', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 95, salary: 115000, reputation: 'Referência Mundial' },
      interprete: { id: 's_i', name: 'Emerson Dias', role: 'interprete', roleName: 'Intérprete Oficial', rating: 92, salary: 95000, reputation: 'Gogó Poderoso' },
      coreografo: { id: 's_cf', name: 'Patrick Carvalho', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 95, salary: 110000, reputation: 'Dramaturgia Pura' }
    },
    currentEnredo: SAMPLE_ENREDOS[3],
    rehearsalLevel: 84,
    barracaoProgress: 82,
    technicalParadeDone: false
  },
  {
    id: 'imperatriz',
    name: 'Imperatriz Leopoldinense',
    shortName: 'Imperatriz',
    nickname: 'A Rainha de Ramos',
    foundationYear: 1959,
    neighborhood: 'Ramos',
    colors: {
      primary: '#15803d',
      secondary: '#ffffff',
      accent: '#ca8a04',
      text: '#ffffff',
      border: '#22c55e'
    },
    symbol: '👑 Coroa Imperial e Ramos',
    division: 'especial',
    budget: 2900000,
    fanBaseMorale: 91,
    championshipsEspecial: 9,
    championshipsOuro: 1,
    attributes: {
      bateria: 93,
      comissaoDeFrente: 94,
      evolucao: 95,
      harmonia: 94,
      enredo: 96,
      fantasias: 95,
      alegorias: 96,
      sambaEnredo: 93,
      mestreSalaPortaBandeira: 95
    },
    staff: {
      carnavalesco: { id: 'imp_c', name: 'Leandro Vieira', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 96, salary: 155000, reputation: 'Mestre da Cultura Popular' },
      mestreBateria: { id: 'imp_b', name: 'Mestre Lolo', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 94, salary: 90000, reputation: 'Swing de Ramos' },
      harmonia: { id: 'imp_h', name: 'André Bonatte', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 94, salary: 85000, reputation: 'Precisão Imperial' },
      mestreSalaPortaBandeira: { id: 'imp_m', name: 'Phelipe Lemos & Rafaela Theodoro', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 95, salary: 110000, reputation: 'Soberania' },
      interprete: { id: 'imp_i', name: 'Pitty de Menezes', role: 'interprete', roleName: 'Intérprete Oficial', rating: 93, salary: 95000, reputation: 'Talento da Nova Geração' },
      coreografo: { id: 'imp_cf', name: 'Marcelo Misailidis', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 93, salary: 90000, reputation: 'Coreografia Clássica' }
    },
    currentEnredo: SAMPLE_ENREDOS[4],
    rehearsalLevel: 86,
    barracaoProgress: 88,
    technicalParadeDone: false
  },
  {
    id: 'mangueira',
    name: 'Estação Primeira de Mangueira',
    shortName: 'Mangueira',
    nickname: 'A Verde e Rosa',
    foundationYear: 1928,
    neighborhood: 'Morro da Mangueira',
    colors: {
      primary: '#047857',
      secondary: '#ec4899',
      accent: '#be185d',
      text: '#ffffff',
      border: '#10b981'
    },
    symbol: '🥁 Surdo de Marcação e Louros',
    division: 'especial',
    budget: 2850000,
    fanBaseMorale: 93,
    championshipsEspecial: 20,
    championshipsOuro: 0,
    attributes: {
      bateria: 96,
      comissaoDeFrente: 92,
      evolucao: 93,
      harmonia: 95,
      enredo: 94,
      fantasias: 93,
      alegorias: 93,
      sambaEnredo: 95,
      mestreSalaPortaBandeira: 95
    },
    staff: {
      carnavalesco: { id: 'mng_c', name: 'Sidnei França', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 92, salary: 125000, reputation: 'Emoção e Tradição' },
      mestreBateria: { id: 'mng_b', name: 'Mestre Taranta Neto', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 95, salary: 100000, reputation: 'O Surdo Um Inconfundível' },
      harmonia: { id: 'mng_h', name: 'Dimas Cordeiro', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 92, salary: 80000, reputation: 'Canto do Morro' },
      mestreSalaPortaBandeira: { id: 'mng_m', name: 'Matheus Olivério & Cintia Ribeiro', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 95, salary: 110000, reputation: 'Baluartes da Dança' },
      interprete: { id: 'mng_i', name: 'Marquinho Art\'Samba & Dowglas Diniz', role: 'interprete', roleName: 'Intérprete Oficial', rating: 93, salary: 100000, reputation: 'Voz da Estação' },
      coreografo: { id: 'mng_cf', name: 'Lucas Maciel & Karina Dias', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 91, salary: 85000, reputation: 'Ancestralidade em Movimento' }
    },
    currentEnredo: SAMPLE_ENREDOS[5],
    rehearsalLevel: 85,
    barracaoProgress: 81,
    technicalParadeDone: false
  },
  {
    id: 'tijuca',
    name: 'Unidos da Tijuca',
    shortName: 'Unidos da Tijuca',
    nickname: 'O Pavão Azul e Amarelo',
    foundationYear: 1931,
    neighborhood: 'Morro do Borel',
    colors: {
      primary: '#1d4ed8',
      secondary: '#facc15',
      accent: '#eab308',
      text: '#ffffff',
      border: '#3b82f6'
    },
    symbol: '🦚 Pavão Real Dourado',
    division: 'especial',
    budget: 2500000,
    fanBaseMorale: 86,
    championshipsEspecial: 4,
    championshipsOuro: 3,
    attributes: {
      bateria: 92,
      comissaoDeFrente: 93,
      evolucao: 92,
      harmonia: 91,
      enredo: 92,
      fantasias: 91,
      alegorias: 93,
      sambaEnredo: 91,
      mestreSalaPortaBandeira: 92
    },
    staff: {
      carnavalesco: { id: 'ut_c', name: 'Edson Pereira', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 91, salary: 115000, reputation: 'Estética Suntuosa' },
      mestreBateria: { id: 'ut_b', name: 'Mestre Casagrande', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 94, salary: 95000, reputation: 'Pura Cadência' },
      harmonia: { id: 'ut_h', name: 'Fernando Costa', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 90, salary: 75000, reputation: 'Harmonia Borel' },
      mestreSalaPortaBandeira: { id: 'ut_m', name: 'Lucinha Nobre & Matheus', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 93, salary: 95000, reputation: 'Elegância e Carisma' },
      interprete: { id: 'ut_i', name: 'Ito Melodia', role: 'interprete', roleName: 'Intérprete Oficial', rating: 93, salary: 105000, reputation: 'Voz da Emoção' },
      coreografo: { id: 'ut_cf', name: 'Sérgio Lobato', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 92, salary: 85000, reputation: 'Narrativas Visuais' }
    },
    currentEnredo: SAMPLE_ENREDOS[0],
    rehearsalLevel: 80,
    barracaoProgress: 79,
    technicalParadeDone: false
  },
  {
    id: 'grande_rio',
    name: 'Acadêmicos do Grande Rio',
    shortName: 'Grande Rio',
    nickname: 'A Tricolor de Caxias',
    foundationYear: 1988,
    neighborhood: 'Duque de Caxias',
    colors: {
      primary: '#16a34a',
      secondary: '#dc2626',
      accent: '#ffffff',
      text: '#ffffff',
      border: '#22c55e'
    },
    symbol: '🐆 Onça Pintada & Estrela',
    division: 'especial',
    budget: 3000000,
    fanBaseMorale: 91,
    championshipsEspecial: 1,
    championshipsOuro: 0,
    attributes: {
      bateria: 95,
      comissaoDeFrente: 95,
      evolucao: 93,
      harmonia: 94,
      enredo: 95,
      fantasias: 95,
      alegorias: 94,
      sambaEnredo: 94,
      mestreSalaPortaBandeira: 93
    },
    staff: {
      carnavalesco: { id: 'gr_c', name: 'Gabriel Haddad & Leonardo Bora', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 95, salary: 150000, reputation: 'Cosmogonia e Pesquisa' },
      mestreBateria: { id: 'gr_b', name: 'Mestre Fafá', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 95, salary: 100000, reputation: 'Invocada de Caxias' },
      harmonia: { id: 'gr_h', name: 'Cacá & Fabrício', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 93, salary: 85000, reputation: 'Garra da Baixada' },
      mestreSalaPortaBandeira: { id: 'gr_m', name: 'Daniel Werneck & Taciana Couto', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 93, salary: 90000, reputation: 'Dança Técnica' },
      interprete: { id: 'gr_i', name: 'Evandro Malandro', role: 'interprete', roleName: 'Intérprete Oficial', rating: 94, salary: 110000, reputation: 'Potência e Swing' },
      coreografo: { id: 'gr_cf', name: 'Hélio Bejani & Beth Bejani', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 95, salary: 110000, reputation: 'Espetáculo Cênico' }
    },
    currentEnredo: SAMPLE_ENREDOS[1],
    rehearsalLevel: 85,
    barracaoProgress: 86,
    technicalParadeDone: false
  },
  {
    id: 'tuiuti',
    name: 'Paraíso do Tuiuti',
    shortName: 'Paraíso do Tuiuti',
    nickname: 'A Majestade de São Cristóvão',
    foundationYear: 1952,
    neighborhood: 'São Cristóvão',
    colors: {
      primary: '#2563eb',
      secondary: '#facc15',
      accent: '#1e3a8a',
      text: '#ffffff',
      border: '#3b82f6'
    },
    symbol: '👑 Coroa e Pavão do Morro',
    division: 'especial',
    budget: 2300000,
    fanBaseMorale: 84,
    championshipsEspecial: 0,
    championshipsOuro: 2,
    attributes: {
      bateria: 93,
      comissaoDeFrente: 92,
      evolucao: 91,
      harmonia: 92,
      enredo: 93,
      fantasias: 91,
      alegorias: 91,
      sambaEnredo: 93,
      mestreSalaPortaBandeira: 91
    },
    staff: {
      carnavalesco: { id: 'pt_c', name: 'Jack Vasconcelos', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 93, salary: 120000, reputation: 'Crítica Mordaz e Enredo Forte' },
      mestreBateria: { id: 'pt_b', name: 'Mestre Marcão', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 93, salary: 85000, reputation: 'Experiência & Cadência' },
      harmonia: { id: 'pt_h', name: 'Rodrigo', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 89, salary: 65000, reputation: 'Firmeza' },
      mestreSalaPortaBandeira: { id: 'pt_m', name: 'Raphael Rodrigues & Dandara Ventapane', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 92, salary: 85000, reputation: 'Ancestralidade' },
      interprete: { id: 'pt_i', name: 'Pixulé', role: 'interprete', roleName: 'Intérprete Oficial', rating: 91, salary: 85000, reputation: 'Voz Autêntica' },
      coreografo: { id: 'pt_cf', name: 'Lucas Maciel', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 91, salary: 80000, reputation: 'Dança Africana' }
    },
    currentEnredo: SAMPLE_ENREDOS[2],
    rehearsalLevel: 81,
    barracaoProgress: 75,
    technicalParadeDone: false
  },
  {
    id: 'portela',
    name: 'Portela',
    shortName: 'Portela',
    nickname: 'A Majestade do Samba',
    foundationYear: 1923,
    neighborhood: 'Madureira / Oswaldo Cruz',
    colors: {
      primary: '#1d4ed8',
      secondary: '#ffffff',
      accent: '#60a5fa',
      text: '#ffffff',
      border: '#3b82f6'
    },
    symbol: '🦅 Águia Altaneira',
    division: 'especial',
    budget: 2900000,
    fanBaseMorale: 92,
    championshipsEspecial: 22,
    championshipsOuro: 0,
    attributes: {
      bateria: 95,
      comissaoDeFrente: 92,
      evolucao: 93,
      harmonia: 94,
      enredo: 94,
      fantasias: 93,
      alegorias: 94,
      sambaEnredo: 96,
      mestreSalaPortaBandeira: 94
    },
    staff: {
      carnavalesco: { id: 'por_c', name: 'André Rodrigues & Antônio Gonzaga', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 93, salary: 125000, reputation: 'Pesquisa e Identidade Azul' },
      mestreBateria: { id: 'por_b', name: 'Mestre Nilo Sérgio', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 95, salary: 105000, reputation: 'Tabajara do Samba' },
      harmonia: { id: 'por_h', name: 'Jeronymo Portela', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 92, salary: 80000, reputation: 'Tradição Centenária' },
      mestreSalaPortaBandeira: { id: 'por_m', name: 'Marlon Lamar & Squel Jorgea', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 94, salary: 100000, reputation: 'Porte Imperial' },
      interprete: { id: 'por_i', name: 'Gilsinho', role: 'interprete', roleName: 'Intérprete Oficial', rating: 95, salary: 120000, reputation: 'Timbre Lírico' },
      coreografo: { id: 'por_cf', name: 'Leo Senna', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 91, salary: 80000, reputation: 'Expressão Corporal' }
    },
    currentEnredo: SAMPLE_ENREDOS[3],
    rehearsalLevel: 84,
    barracaoProgress: 83,
    technicalParadeDone: false
  },
  {
    id: 'mocidade',
    name: 'Mocidade Independente de Padre Miguel',
    shortName: 'Mocidade',
    nickname: 'A Estrela Guia da Zona Oeste',
    foundationYear: 1955,
    neighborhood: 'Padre Miguel',
    colors: {
      primary: '#15803d',
      secondary: '#ffffff',
      accent: '#166534',
      text: '#ffffff',
      border: '#22c55e'
    },
    symbol: '⭐ Estrela Guia de Cinco Pontas',
    division: 'especial',
    budget: 2600000,
    fanBaseMorale: 87,
    championshipsEspecial: 6,
    championshipsOuro: 1,
    attributes: {
      bateria: 97,
      comissaoDeFrente: 91,
      evolucao: 92,
      harmonia: 93,
      enredo: 92,
      fantasias: 92,
      alegorias: 92,
      sambaEnredo: 94,
      mestreSalaPortaBandeira: 92
    },
    staff: {
      carnavalesco: { id: 'moc_c', name: 'Marcus Ferreira', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 92, salary: 120000, reputation: 'Traço Popular e Colorido' },
      mestreBateria: { id: 'moc_b', name: 'Mestre Dudu', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 97, salary: 120000, reputation: 'Não Existe Mais Quente' },
      harmonia: { id: 'moc_h', name: 'Wallace Capoeira', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 90, salary: 75000, reputation: 'Comunidade Apaixonada' },
      mestreSalaPortaBandeira: { id: 'moc_m', name: 'Diogo Jesus & Bruna Santos', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 92, salary: 85000, reputation: 'Sincronia Forte' },
      interprete: { id: 'moc_i', name: 'Zé Paulo Sierra', role: 'interprete', roleName: 'Intérprete Oficial', rating: 94, salary: 110000, reputation: 'Energia Incendiária' },
      coreografo: { id: 'moc_cf', name: 'Paulo Pinna', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 90, salary: 75000, reputation: 'Originalidade Zona Oeste' }
    },
    currentEnredo: SAMPLE_ENREDOS[4],
    rehearsalLevel: 82,
    barracaoProgress: 80,
    technicalParadeDone: false
  },
  {
    id: 'marica',
    name: 'União de Maricá',
    shortName: 'União de Maricá',
    nickname: 'A Força do Litoral',
    foundationYear: 2015,
    neighborhood: 'Maricá, Região dos Lagos',
    colors: {
      primary: '#b91c1c',
      secondary: '#eab308',
      accent: '#ffffff',
      text: '#ffffff',
      border: '#ef4444'
    },
    symbol: '⛵ Farol e Barco do Pescador',
    division: 'especial',
    budget: 2700000,
    fanBaseMorale: 85,
    championshipsEspecial: 0,
    championshipsOuro: 1,
    attributes: {
      bateria: 91,
      comissaoDeFrente: 92,
      evolucao: 91,
      harmonia: 91,
      enredo: 92,
      fantasias: 92,
      alegorias: 93,
      sambaEnredo: 92,
      mestreSalaPortaBandeira: 91
    },
    staff: {
      carnavalesco: { id: 'um_c', name: 'Celso Villela', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 90, salary: 100000, reputation: 'Cenógrafo de Destaque' },
      mestreBateria: { id: 'um_b', name: 'Mestre Paulinho Steves', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 91, salary: 80000, reputation: 'Batucada Maricaense' },
      harmonia: { id: 'um_h', name: 'Jansen', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 89, salary: 65000, reputation: 'Organização' },
      mestreSalaPortaBandeira: { id: 'um_m', name: 'Fabrício Pires & Giovanna Justo', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 91, salary: 80000, reputation: 'Tradição e Sangue Bom' },
      interprete: { id: 'um_i', name: 'Matheus Gaúcho', role: 'interprete', roleName: 'Intérprete Oficial', rating: 90, salary: 80000, reputation: 'Timbre Potente' },
      coreografo: { id: 'um_cf', name: 'Patrick Carvalho Jr.', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 91, salary: 80000, reputation: 'Impacto Teatral' }
    },
    currentEnredo: SAMPLE_ENREDOS[5],
    rehearsalLevel: 81,
    barracaoProgress: 82,
    technicalParadeDone: false
  },

  // ==========================================
  // SÉRIE OURO (17 ESCOLAS CONFORME SOLICITADO)
  // ==========================================
  {
    id: 'niteroi',
    name: 'Acadêmicos de Niterói',
    shortName: 'Acad. de Niterói',
    nickname: 'A Caçulinha de Niterói',
    foundationYear: 2022,
    neighborhood: 'Niterói',
    colors: { primary: '#0284c7', secondary: '#ffffff', text: '#ffffff', border: '#38bdf8' },
    symbol: '🏛️ Museu de Arte Contemporânea',
    division: 'ouro',
    budget: 1500000,
    fanBaseMorale: 80,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    attributes: { bateria: 87, comissaoDeFrente: 88, evolucao: 86, harmonia: 86, enredo: 88, fantasias: 87, alegorias: 88, sambaEnredo: 86, mestreSalaPortaBandeira: 87 },
    staff: {
      carnavalesco: { id: 'nit_c', name: 'Tiago Martins', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 87, salary: 75000, reputation: 'Plástica Dinâmica' },
      mestreBateria: { id: 'nit_b', name: 'Mestre Demétrius', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 88, salary: 65000, reputation: 'Cadência Arariboia' },
      harmonia: { id: 'nit_h', name: 'Danilo', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 86, salary: 50000, reputation: 'Organizado' },
      mestreSalaPortaBandeira: { id: 'nit_m', name: 'Vinicius & Jessica', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 87, salary: 60000, reputation: 'Sincronia' },
      interprete: { id: 'nit_i', name: 'Danilo Cezar', role: 'interprete', roleName: 'Intérprete Oficial', rating: 86, salary: 55000, reputation: 'Canto Firme' },
      coreografo: { id: 'nit_cf', name: 'Fábio Batista', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 87, salary: 55000, reputation: 'Cênico' }
    },
    currentEnredo: SAMPLE_ENREDOS[0],
    rehearsalLevel: 75,
    barracaoProgress: 72,
    technicalParadeDone: false
  },
  {
    id: 'imperio_serrano',
    name: 'Império Serrano',
    shortName: 'Império Serrano',
    nickname: 'O Menino de 47 / Reizinho de Madureira',
    foundationYear: 1947,
    neighborhood: 'Morro da Serrinha, Madureira',
    colors: { primary: '#15803d', secondary: '#ffffff', text: '#ffffff', border: '#22c55e' },
    symbol: '👑 Coroa Imperial Verde e Ramo',
    division: 'ouro',
    budget: 1800000,
    fanBaseMorale: 86,
    championshipsEspecial: 9,
    championshipsOuro: 4,
    attributes: { bateria: 92, comissaoDeFrente: 89, evolucao: 88, harmonia: 90, enredo: 91, fantasias: 90, alegorias: 90, sambaEnredo: 92, mestreSalaPortaBandeira: 90 },
    staff: {
      carnavalesco: { id: 'is_c', name: 'Renato Esteves', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 90, salary: 85000, reputation: 'Tradição do Reizinho' },
      mestreBateria: { id: 'is_b', name: 'Mestre Vitinho', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 92, salary: 75000, reputation: 'Sinfônica da Serrinha' },
      harmonia: { id: 'is_h', name: 'Cosme Márcio', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 89, salary: 60000, reputation: 'Ginga Imperiana' },
      mestreSalaPortaBandeira: { id: 'is_m', name: 'Renan Oliveira & Laís Lúcia', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 90, salary: 70000, reputation: 'Postura Tradicional' },
      interprete: { id: 'is_i', name: 'Tem-Tem Jr.', role: 'interprete', roleName: 'Intérprete Oficial', rating: 89, salary: 65000, reputation: 'Emoção Pura' },
      coreografo: { id: 'is_cf', name: 'Marlon Flores', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 88, salary: 60000, reputation: 'Teatro da Serrinha' }
    },
    currentEnredo: SAMPLE_ENREDOS[1],
    rehearsalLevel: 80,
    barracaoProgress: 78,
    technicalParadeDone: false
  },
  {
    id: 'unidos_padre_miguel',
    name: 'Unidos de Padre Miguel',
    shortName: 'Unidos de P. Miguel',
    nickname: 'O Boi Vermelho da Vila Vintém',
    foundationYear: 1957,
    neighborhood: 'Vila Vintém, Padre Miguel',
    colors: { primary: '#dc2626', secondary: '#ffffff', text: '#ffffff', border: '#ef4444' },
    symbol: '🐂 Boi Vermelho e Branco',
    division: 'ouro',
    budget: 1900000,
    fanBaseMorale: 89,
    championshipsEspecial: 0,
    championshipsOuro: 2,
    attributes: { bateria: 92, comissaoDeFrente: 91, evolucao: 90, harmonia: 91, enredo: 90, fantasias: 91, alegorias: 92, sambaEnredo: 89, mestreSalaPortaBandeira: 91 },
    staff: {
      carnavalesco: { id: 'upm_c', name: 'Alexandre Louzada & Lucas Milato', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 92, salary: 90000, reputation: 'Barracão Poderoso' },
      mestreBateria: { id: 'upm_b', name: 'Mestre Dinho', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 92, salary: 75000, reputation: 'Guerreiros da Vintém' },
      harmonia: { id: 'upm_h', name: 'Alessandro Cobra', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 90, salary: 65000, reputation: 'Disciplina Absoluta' },
      mestreSalaPortaBandeira: { id: 'upm_m', name: 'Vinicius Pessanha & Jéssica Ferreira', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 91, salary: 75000, reputation: 'Alta Performance' },
      interprete: { id: 'upm_i', name: 'Bruno Ribas', role: 'interprete', roleName: 'Intérprete Oficial', rating: 92, salary: 85000, reputation: 'Voz Consagrada' },
      coreografo: { id: 'upm_cf', name: 'David Lima', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 90, salary: 65000, reputation: 'Impacto Visual' }
    },
    currentEnredo: SAMPLE_ENREDOS[2],
    rehearsalLevel: 82,
    barracaoProgress: 82,
    technicalParadeDone: false
  },
  {
    id: 'porto_da_pedra',
    name: 'Unidos do Porto da Pedra',
    shortName: 'Porto da Pedra',
    nickname: 'O Tigre de São Gonçalo',
    foundationYear: 1978,
    neighborhood: 'São Gonçalo',
    colors: { primary: '#b91c1c', secondary: '#ffffff', text: '#ffffff', border: '#dc2626' },
    symbol: '🐯 Tigre São-Gonçalense',
    division: 'ouro',
    budget: 1700000,
    fanBaseMorale: 84,
    championshipsEspecial: 0,
    championshipsOuro: 4,
    attributes: { bateria: 89, comissaoDeFrente: 89, evolucao: 88, harmonia: 88, enredo: 89, fantasias: 89, alegorias: 89, sambaEnredo: 89, mestreSalaPortaBandeira: 89 },
    staff: {
      carnavalesco: { id: 'pdp_c', name: 'Mauro Quintaes', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 90, salary: 85000, reputation: 'Grande Porte' },
      mestreBateria: { id: 'pdp_b', name: 'Mestre Pablo', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 90, salary: 70000, reputation: 'Ritmo Forte' },
      harmonia: { id: 'pdp_h', name: 'Ivan Carneiro', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 88, salary: 60000, reputation: 'Guerreiro' },
      mestreSalaPortaBandeira: { id: 'pdp_m', name: 'Rodrigo França & Cintia Santos', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 89, salary: 65000, reputation: 'Sintonia' },
      interprete: { id: 'pdp_i', name: 'Wantuir', role: 'interprete', roleName: 'Intérprete Oficial', rating: 90, salary: 75000, reputation: 'Agudos Imponentes' },
      coreografo: { id: 'pdp_cf', name: 'Junior Scapin', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 89, salary: 65000, reputation: 'Dinâmico' }
    },
    currentEnredo: SAMPLE_ENREDOS[3],
    rehearsalLevel: 78,
    barracaoProgress: 76,
    technicalParadeDone: false
  },
  {
    id: 'uniao_da_ilha',
    name: 'União da Ilha do Governador',
    shortName: 'União da Ilha',
    nickname: 'A Ilha da Alegria',
    foundationYear: 1953,
    neighborhood: 'Ilha do Governador',
    colors: { primary: '#2563eb', secondary: '#dc2626', accent: '#ffffff', text: '#ffffff', border: '#3b82f6' },
    symbol: '⚓ Âncora e Gaivota',
    division: 'ouro',
    budget: 1850000,
    fanBaseMorale: 88,
    championshipsEspecial: 0,
    championshipsOuro: 1,
    attributes: { bateria: 91, comissaoDeFrente: 90, evolucao: 89, harmonia: 91, enredo: 90, fantasias: 90, alegorias: 89, sambaEnredo: 93, mestreSalaPortaBandeira: 90 },
    staff: {
      carnavalesco: { id: 'ui_c', name: 'Cahê Rodrigues', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 91, salary: 85000, reputation: 'Alegria e Requinte' },
      mestreBateria: { id: 'ui_b', name: 'Mestre Marcelo Santos', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 91, salary: 75000, reputation: 'Baterilha' },
      harmonia: { id: 'ui_h', name: 'Carlinhos Fuzil', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 90, salary: 65000, reputation: 'Entusiasmo Insulano' },
      mestreSalaPortaBandeira: { id: 'ui_m', name: 'Thiaguinho Mendonça & Amanda Poblete', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 90, salary: 70000, reputation: 'Leveza' },
      interprete: { id: 'ui_i', name: 'Nêgo', role: 'interprete', roleName: 'Intérprete Oficial', rating: 92, salary: 80000, reputation: 'Tetracampeão do Estandarte' },
      coreografo: { id: 'ui_cf', name: 'Marcio Moura', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 90, salary: 65000, reputation: 'Humor e Leveza' }
    },
    currentEnredo: SAMPLE_ENREDOS[4],
    rehearsalLevel: 81,
    barracaoProgress: 79,
    technicalParadeDone: false
  },
  {
    id: 'estacio_de_sa',
    name: 'Estácio de Sá',
    shortName: 'Estácio de Sá',
    nickname: 'O Berço do Samba',
    foundationYear: 1955,
    neighborhood: 'Estácio / São Carlos',
    colors: { primary: '#b91c1c', secondary: '#ffffff', text: '#ffffff', border: '#ef4444' },
    symbol: '🦁 Leão de São Carlos',
    division: 'ouro',
    budget: 1750000,
    fanBaseMorale: 86,
    championshipsEspecial: 1,
    championshipsOuro: 8,
    attributes: { bateria: 92, comissaoDeFrente: 88, evolucao: 88, harmonia: 90, enredo: 89, fantasias: 88, alegorias: 88, sambaEnredo: 92, mestreSalaPortaBandeira: 89 },
    staff: {
      carnavalesco: { id: 'es_c', name: 'Marcus Paulo', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 89, salary: 75000, reputation: 'Raiz Histórica' },
      mestreBateria: { id: 'es_b', name: 'Mestre Chuvisco', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 92, salary: 80000, reputation: 'Medalha de Ouro' },
      harmonia: { id: 'es_h', name: 'Wanderley Silva', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 89, salary: 60000, reputation: 'Voz do Berço' },
      mestreSalaPortaBandeira: { id: 'es_m', name: 'Feliciano Jr. & Thainá Teixeira', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 89, salary: 65000, reputation: 'Ginga Malandra' },
      interprete: { id: 'es_i', name: 'Tiganá', role: 'interprete', roleName: 'Intérprete Oficial', rating: 90, salary: 70000, reputation: 'Voz Emocionante' },
      coreografo: { id: 'es_cf', name: 'Ariell Ribeiro', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 88, salary: 55000, reputation: 'Dramático' }
    },
    currentEnredo: SAMPLE_ENREDOS[5],
    rehearsalLevel: 80,
    barracaoProgress: 77,
    technicalParadeDone: false
  },
  {
    id: 'em_cima_da_hora',
    name: 'Em Cima da Hora',
    shortName: 'Em Cima da Hora',
    nickname: 'A Azul e Branco de Cavalcanti',
    foundationYear: 1959,
    neighborhood: 'Cavalcanti',
    colors: { primary: '#1d4ed8', secondary: '#ffffff', text: '#ffffff', border: '#60a5fa' },
    symbol: '🐎 Cavalo Alado',
    division: 'ouro',
    budget: 1400000,
    fanBaseMorale: 78,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    attributes: { bateria: 87, comissaoDeFrente: 86, evolucao: 85, harmonia: 86, enredo: 87, fantasias: 85, alegorias: 86, sambaEnredo: 88, mestreSalaPortaBandeira: 86 },
    staff: {
      carnavalesco: { id: 'ech_c', name: 'Rodrigo Almeida', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 86, salary: 60000, reputation: 'Poesia Visual' },
      mestreBateria: { id: 'ech_b', name: 'Mestre Léo Capoeira', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 87, salary: 55000, reputation: 'Batida Firme' },
      harmonia: { id: 'ech_h', name: 'Júlio César', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 85, salary: 45000, reputation: 'Cavalcanti Canta' },
      mestreSalaPortaBandeira: { id: 'ech_m', name: 'Johny & Winnie', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 86, salary: 50000, reputation: 'Juventude' },
      interprete: { id: 'ech_i', name: 'Rafael Tinguinha', role: 'interprete', roleName: 'Intérprete Oficial', rating: 87, salary: 55000, reputation: 'Gogó Forte' },
      coreografo: { id: 'ech_cf', name: 'Leandro Azevedo', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 86, salary: 50000, reputation: 'Dança Popular' }
    },
    currentEnredo: SAMPLE_ENREDOS[0],
    rehearsalLevel: 74,
    barracaoProgress: 71,
    technicalParadeDone: false
  },
  {
    id: 'unidos_da_ponte',
    name: 'Unidos da Ponte',
    shortName: 'Unidos da Ponte',
    nickname: 'A Ponte Velha de Meriti',
    foundationYear: 1952,
    neighborhood: 'São João de Meriti',
    colors: { primary: '#0284c7', secondary: '#ffffff', text: '#ffffff', border: '#38bdf8' },
    symbol: '🌉 Ponte de Meriti',
    division: 'ouro',
    budget: 1350000,
    fanBaseMorale: 77,
    championshipsEspecial: 0,
    championshipsOuro: 1,
    attributes: { bateria: 86, comissaoDeFrente: 85, evolucao: 85, harmonia: 86, enredo: 86, fantasias: 85, alegorias: 85, sambaEnredo: 86, mestreSalaPortaBandeira: 86 },
    staff: {
      carnavalesco: { id: 'udp_c', name: 'Renato Campero', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 86, salary: 55000, reputation: 'Engenhosidade' },
      mestreBateria: { id: 'udp_b', name: 'Mestre Branco', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 87, salary: 50000, reputation: 'Ritmo Meriti' },
      harmonia: { id: 'udp_h', name: 'Paulinho', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 85, salary: 45000, reputation: 'Dedicado' },
      mestreSalaPortaBandeira: { id: 'udp_m', name: 'Emanuel Lima & Thainara', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 86, salary: 50000, reputation: 'Técnica' },
      interprete: { id: 'udp_i', name: 'Kleber Simpatia', role: 'interprete', roleName: 'Intérprete Oficial', rating: 86, salary: 50000, reputation: 'Simpatia no Canto' },
      coreografo: { id: 'udp_cf', name: 'Valci Pelé', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 85, salary: 45000, reputation: 'Samba no Pé' }
    },
    currentEnredo: SAMPLE_ENREDOS[1],
    rehearsalLevel: 73,
    barracaoProgress: 70,
    technicalParadeDone: false
  },
  {
    id: 'unidos_de_bangu',
    name: 'Unidos de Bangu',
    shortName: 'Unidos de Bangu',
    nickname: 'O Caldeirão da Zona Oeste',
    foundationYear: 1937,
    neighborhood: 'Bangu',
    colors: { primary: '#b91c1c', secondary: '#ffffff', text: '#ffffff', border: '#ef4444' },
    symbol: '🦫 Castor Vermelho e Branco',
    division: 'ouro',
    budget: 1450000,
    fanBaseMorale: 81,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    attributes: { bateria: 88, comissaoDeFrente: 86, evolucao: 86, harmonia: 87, enredo: 87, fantasias: 86, alegorias: 87, sambaEnredo: 87, mestreSalaPortaBandeira: 87 },
    staff: {
      carnavalesco: { id: 'udb_c', name: 'Robson Goulart', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 87, salary: 65000, reputation: 'Fértil Criatividade' },
      mestreBateria: { id: 'udb_b', name: 'Mestre Laion', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 89, salary: 60000, reputation: 'Caldeirão da Bateria' },
      harmonia: { id: 'udb_h', name: 'Jeferson', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 86, salary: 50000, reputation: 'Fibra de Bangu' },
      mestreSalaPortaBandeira: { id: 'udb_m', name: 'Jorge Vinicius & Verônica', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 87, salary: 55000, reputation: 'Porte' },
      interprete: { id: 'udb_i', name: 'Igor Vianna', role: 'interprete', roleName: 'Intérprete Oficial', rating: 88, salary: 65000, reputation: 'Voz Romântica' },
      coreografo: { id: 'udb_cf', name: 'Fábio Costa', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 86, salary: 50000, reputation: 'Cênica Teatral' }
    },
    currentEnredo: SAMPLE_ENREDOS[2],
    rehearsalLevel: 75,
    barracaoProgress: 74,
    technicalParadeDone: false
  },
  {
    id: 'arranco',
    name: 'Arranco',
    shortName: 'Arranco',
    nickname: 'O Falcão do Engenho de Dentro',
    foundationYear: 1973,
    neighborhood: 'Engenho de Dentro',
    colors: { primary: '#1e40af', secondary: '#ffffff', text: '#ffffff', border: '#3b82f6' },
    symbol: '🦅 Falcão Azul e Branco',
    division: 'ouro',
    budget: 1300000,
    fanBaseMorale: 76,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    attributes: { bateria: 86, comissaoDeFrente: 85, evolucao: 85, harmonia: 85, enredo: 86, fantasias: 85, alegorias: 84, sambaEnredo: 86, mestreSalaPortaBandeira: 85 },
    staff: {
      carnavalesco: { id: 'arr_c', name: 'Nicolas Gonçalves', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 85, salary: 50000, reputation: 'Jovem Promessa' },
      mestreBateria: { id: 'arr_b', name: 'Mestre Cabide', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 86, salary: 50000, reputation: 'Batuque Seguro' },
      harmonia: { id: 'arr_h', name: 'Chico', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 85, salary: 45000, reputation: 'Comprometido' },
      mestreSalaPortaBandeira: { id: 'arr_m', name: 'Guto & Suelene', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 85, salary: 45000, reputation: 'Baluarte' },
      interprete: { id: 'arr_i', name: 'Pamela Falcão', role: 'interprete', roleName: 'Intérprete Oficial', rating: 86, salary: 50000, reputation: 'Canto Marcante' },
      coreografo: { id: 'arr_cf', name: 'Suellen', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 85, salary: 45000, reputation: 'Expressão' }
    },
    currentEnredo: SAMPLE_ENREDOS[3],
    rehearsalLevel: 72,
    barracaoProgress: 69,
    technicalParadeDone: false
  },
  {
    id: 'botafogo_samba_clube',
    name: 'Botafogo Samba Clube',
    shortName: 'Botafogo S.C.',
    nickname: 'A Alvinegra da Paixão',
    foundationYear: 2018,
    neighborhood: 'Botafogo / Engenho de Dentro',
    colors: { primary: '#0f172a', secondary: '#ffffff', text: '#ffffff', border: '#475569' },
    symbol: '⭐ Estrela Solitária Gloriosa',
    division: 'ouro',
    budget: 1550000,
    fanBaseMorale: 84,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    attributes: { bateria: 88, comissaoDeFrente: 87, evolucao: 87, harmonia: 88, enredo: 87, fantasias: 86, alegorias: 87, sambaEnredo: 88, mestreSalaPortaBandeira: 87 },
    staff: {
      carnavalesco: { id: 'bsc_c', name: 'Marcelo Adnet & Ricardo Hessez', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 88, salary: 70000, reputation: 'Criatividade & Paixão' },
      mestreBateria: { id: 'bsc_b', name: 'Mestre Straus', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 88, salary: 60000, reputation: 'Batucada Alvinegra' },
      harmonia: { id: 'bsc_h', name: 'Luiz Carlos', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 87, salary: 55000, reputation: 'Torcida Apaixonada' },
      mestreSalaPortaBandeira: { id: 'bsc_m', name: 'Diego Falcão & Beatriz Paula', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 87, salary: 55000, reputation: 'Sincronia Forte' },
      interprete: { id: 'bsc_i', name: 'Chicão', role: 'interprete', roleName: 'Intérprete Oficial', rating: 87, salary: 55000, reputation: 'Voz da Raça' },
      coreografo: { id: 'bsc_cf', name: 'Jardel Lemos', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 87, salary: 55000, reputation: 'Impacto Teatral' }
    },
    currentEnredo: SAMPLE_ENREDOS[4],
    rehearsalLevel: 77,
    barracaoProgress: 75,
    technicalParadeDone: false
  },
  {
    id: 'parque_acari',
    name: 'União do Parque Acari',
    shortName: 'Parque Acari',
    nickname: 'A Trindade de Acari',
    foundationYear: 2018,
    neighborhood: 'Complexo de Acari',
    colors: { primary: '#db2777', secondary: '#facc15', accent: '#ffffff', text: '#ffffff', border: '#f472b6' },
    symbol: '🦚 Pavão e Flores de Acari',
    division: 'ouro',
    budget: 1250000,
    fanBaseMorale: 75,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    attributes: { bateria: 86, comissaoDeFrente: 84, evolucao: 84, harmonia: 85, enredo: 85, fantasias: 84, alegorias: 84, sambaEnredo: 85, mestreSalaPortaBandeira: 85 },
    staff: {
      carnavalesco: { id: 'upa_c', name: 'André Tabuquine', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 85, salary: 50000, reputation: 'Dedicado' },
      mestreBateria: { id: 'upa_b', name: 'Mestres Daniel & Erik', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 86, salary: 50000, reputation: 'Bateria Ritmo Acari' },
      harmonia: { id: 'upa_h', name: 'Beto', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 84, salary: 40000, reputation: 'Comunitário' },
      mestreSalaPortaBandeira: { id: 'upa_m', name: 'Renan & Gabi', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 85, salary: 45000, reputation: 'Juventude' },
      interprete: { id: 'upa_i', name: 'Leozinho', role: 'interprete', roleName: 'Intérprete Oficial', rating: 85, salary: 45000, reputation: 'Voz da Comunidade' },
      coreografo: { id: 'upa_cf', name: 'Adilson Lourenço', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 84, salary: 40000, reputation: 'Coreografia Popular' }
    },
    currentEnredo: SAMPLE_ENREDOS[5],
    rehearsalLevel: 71,
    barracaoProgress: 68,
    technicalParadeDone: false
  },
  {
    id: 'inocentes',
    name: 'Inocentes de Belford Roxo',
    shortName: 'Inocentes',
    nickname: 'A Caçulinha da Baixada',
    foundationYear: 1993,
    neighborhood: 'Belford Roxo',
    colors: { primary: '#2563eb', secondary: '#dc2626', accent: '#ffffff', text: '#ffffff', border: '#3b82f6' },
    symbol: '🕊️ Pomba da Paz Branca',
    division: 'ouro',
    budget: 1600000,
    fanBaseMorale: 82,
    championshipsEspecial: 0,
    championshipsOuro: 1,
    attributes: { bateria: 89, comissaoDeFrente: 88, evolucao: 88, harmonia: 88, enredo: 88, fantasias: 88, alegorias: 88, sambaEnredo: 89, mestreSalaPortaBandeira: 88 },
    staff: {
      carnavalesco: { id: 'in_c', name: 'Cristiano Bara', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 88, salary: 70000, reputation: 'Plástica Baixada' },
      mestreBateria: { id: 'in_b', name: 'Mestre Washington Paz', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 90, salary: 65000, reputation: 'Cadência Pura' },
      harmonia: { id: 'in_h', name: 'Sancler', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 88, salary: 55000, reputation: 'Vigor' },
      mestreSalaPortaBandeira: { id: 'in_m', name: 'Paulo Barbosa & Jaçanã', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 88, salary: 60000, reputation: 'Tradição' },
      interprete: { id: 'in_i', name: 'Thiago Brito', role: 'interprete', roleName: 'Intérprete Oficial', rating: 89, salary: 65000, reputation: 'Canto Firme' },
      coreografo: { id: 'in_cf', name: 'Juliana Frathane', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 88, salary: 55000, reputation: 'Expressão Corporal' }
    },
    currentEnredo: SAMPLE_ENREDOS[0],
    rehearsalLevel: 78,
    barracaoProgress: 76,
    technicalParadeDone: false
  },
  {
    id: 'santa_cruz',
    name: 'Acadêmicos de Santa Cruz',
    shortName: 'Santa Cruz',
    nickname: 'A Verde e Branco da Zona Oeste',
    foundationYear: 1959,
    neighborhood: 'Santa Cruz',
    colors: { primary: '#16a34a', secondary: '#ffffff', text: '#ffffff', border: '#22c55e' },
    symbol: '✝️ Cruz de Malta & Âncora',
    division: 'ouro',
    budget: 1300000,
    fanBaseMorale: 77,
    championshipsEspecial: 0,
    championshipsOuro: 4,
    attributes: { bateria: 87, comissaoDeFrente: 85, evolucao: 85, harmonia: 86, enredo: 86, fantasias: 85, alegorias: 85, sambaEnredo: 86, mestreSalaPortaBandeira: 86 },
    staff: {
      carnavalesco: { id: 'sc_c', name: 'Cid Carvalho', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 87, salary: 60000, reputation: 'Experiente Campeão' },
      mestreBateria: { id: 'sc_b', name: 'Mestre Riquinho', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 87, salary: 55000, reputation: 'Bateria Tabajara Zona Oeste' },
      harmonia: { id: 'sc_h', name: 'Paulo', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 85, salary: 45000, reputation: 'Comunidade Raiz' },
      mestreSalaPortaBandeira: { id: 'sc_m', name: 'Francisco & Roberta', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 86, salary: 50000, reputation: 'Harmonia' },
      interprete: { id: 'sc_i', name: 'Roninho', role: 'interprete', roleName: 'Intérprete Oficial', rating: 86, salary: 50000, reputation: 'Samba no Sangue' },
      coreografo: { id: 'sc_cf', name: 'Marcelo Chocolate', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 86, salary: 50000, reputation: 'Dança de Salão' }
    },
    currentEnredo: SAMPLE_ENREDOS[1],
    rehearsalLevel: 73,
    barracaoProgress: 71,
    technicalParadeDone: false
  },
  {
    id: 'vigario_geral',
    name: 'Acadêmicos de Vigário Geral',
    shortName: 'Vigário Geral',
    nickname: 'A Tricolor da Praça Dois',
    foundationYear: 1966,
    neighborhood: 'Vigário Geral',
    colors: { primary: '#1d4ed8', secondary: '#ffffff', text: '#ffffff', border: '#60a5fa' },
    symbol: '👑 Coroa e Tamborim',
    division: 'ouro',
    budget: 1350000,
    fanBaseMorale: 78,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    attributes: { bateria: 87, comissaoDeFrente: 86, evolucao: 86, harmonia: 86, enredo: 86, fantasias: 86, alegorias: 85, sambaEnredo: 86, mestreSalaPortaBandeira: 86 },
    staff: {
      carnavalesco: { id: 'vg_c', name: 'Alexandre Costa & Lino Salles', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 86, salary: 55000, reputation: 'Dupla Criativa' },
      mestreBateria: { id: 'vg_b', name: 'Mestre Lolo de Vigário', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 87, salary: 50000, reputation: 'Batida Firme' },
      harmonia: { id: 'vg_h', name: 'Ney', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 85, salary: 45000, reputation: 'Praça Dois Firme' },
      mestreSalaPortaBandeira: { id: 'vg_m', name: 'Lucas & Thais', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 86, salary: 50000, reputation: 'Sincronia' },
      interprete: { id: 'vg_i', name: 'Danilo', role: 'interprete', roleName: 'Intérprete Oficial', rating: 86, salary: 50000, reputation: 'Canto Claro' },
      coreografo: { id: 'vg_cf', name: 'Handerson Big', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 86, salary: 50000, reputation: 'Impacto Cênico' }
    },
    currentEnredo: SAMPLE_ENREDOS[2],
    rehearsalLevel: 74,
    barracaoProgress: 72,
    technicalParadeDone: false
  },
  {
    id: 'jacarezinho',
    name: 'Unidos do Jacarezinho',
    shortName: 'Jacarezinho',
    nickname: 'A Rosa e Branco do Jacaré',
    foundationYear: 1966,
    neighborhood: 'Morro do Jacarezinho',
    colors: { primary: '#db2777', secondary: '#ffffff', text: '#ffffff', border: '#f472b6' },
    symbol: '🐊 Jacaré e Pandeiro',
    division: 'ouro',
    budget: 1250000,
    fanBaseMorale: 76,
    championshipsEspecial: 0,
    championshipsOuro: 1,
    attributes: { bateria: 87, comissaoDeFrente: 84, evolucao: 85, harmonia: 86, enredo: 85, fantasias: 84, alegorias: 84, sambaEnredo: 87, mestreSalaPortaBandeira: 85 },
    staff: {
      carnavalesco: { id: 'jac_c', name: 'Flávio Lins', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 85, salary: 48000, reputation: 'Cultura de Morro' },
      mestreBateria: { id: 'jac_b', name: 'Mestre Maurício', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 87, salary: 50000, reputation: 'Bateria Show' },
      harmonia: { id: 'jac_h', name: 'Pedrão', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 85, salary: 40000, reputation: 'Raiz' },
      mestreSalaPortaBandeira: { id: 'jac_m', name: 'Danilo & Amanda', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 85, salary: 45000, reputation: 'Brio' },
      interprete: { id: 'jac_i', name: 'Aílton Santos', role: 'interprete', roleName: 'Intérprete Oficial', rating: 86, salary: 48000, reputation: 'Voz da Comunidade' },
      coreografo: { id: 'jac_cf', name: 'Thiago Faria', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 84, salary: 40000, reputation: 'Dança Comunitária' }
    },
    currentEnredo: SAMPLE_ENREDOS[3],
    rehearsalLevel: 72,
    barracaoProgress: 69,
    technicalParadeDone: false
  },
  {
    id: 'sao_clemente',
    name: 'São Clemente',
    shortName: 'São Clemente',
    nickname: 'A Preta e Amarela da Zona Sul',
    foundationYear: 1951,
    neighborhood: 'Botafogo',
    colors: { primary: '#ca8a04', secondary: '#09090b', accent: '#ffffff', text: '#ffffff', border: '#eab308' },
    symbol: '🎭 Máscaras de Teatro & Pandeiro',
    division: 'ouro',
    budget: 1750000,
    fanBaseMorale: 85,
    championshipsEspecial: 0,
    championshipsOuro: 1,
    attributes: { bateria: 91, comissaoDeFrente: 90, evolucao: 88, harmonia: 89, enredo: 91, fantasias: 89, alegorias: 89, sambaEnredo: 90, mestreSalaPortaBandeira: 89 },
    staff: {
      carnavalesco: { id: 'sc_clem_c', name: 'Jorge Silveira & Mauro Leite', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 90, salary: 80000, reputation: 'Sátira e Bom Humor' },
      mestreBateria: { id: 'sc_clem_b', name: 'Mestre Caliquinho', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 91, salary: 75000, reputation: 'Fiel Bateria' },
      harmonia: { id: 'sc_clem_h', name: 'Roberto', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 88, salary: 60000, reputation: 'Alegria e Disciplina' },
      mestreSalaPortaBandeira: { id: 'sc_clem_m', name: 'Alex Marcelino & Danielle Nascimento', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 90, salary: 70000, reputation: 'Herança Familiar' },
      interprete: { id: 'sc_clem_i', name: 'Leozinho Nunes', role: 'interprete', roleName: 'Intérprete Oficial', rating: 90, salary: 70000, reputation: 'Energia Pura' },
      coreografo: { id: 'sc_clem_cf', name: 'Lucas Pinho', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 89, salary: 60000, reputation: 'Humor Carioca' }
    },
    currentEnredo: SAMPLE_ENREDOS[4],
    rehearsalLevel: 79,
    barracaoProgress: 78,
    technicalParadeDone: false
  },

  // ==========================================
  // SÉRIE PRATA (TERCEIRA DIVISÃO - 24 ESCOLAS)
  // ==========================================
  {
    id: 'unidos_de_lucas',
    name: 'Unidos de Lucas',
    shortName: 'Unidos de Lucas',
    nickname: 'O Galo de Ouro da Leopoldina',
    foundationYear: 1966,
    neighborhood: 'Parada de Lucas',
    colors: { primary: '#dc2626', secondary: '#eab308', text: '#ffffff', border: '#ef4444' },
    symbol: '🐓 Galo de Ouro Cantante',
    division: 'prata',
    budget: 820000,
    fanBaseMorale: 82,
    championshipsEspecial: 0,
    championshipsOuro: 1,
    championshipsPrata: 2,
    attributes: { bateria: 84, comissaoDeFrente: 82, evolucao: 83, harmonia: 84, enredo: 83, fantasias: 82, alegorias: 82, sambaEnredo: 85, mestreSalaPortaBandeira: 83 },
    staff: {
      carnavalesco: { id: 'luc_c', name: 'Fran Sérgio', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 83, salary: 38000, reputation: 'Tradição da Leopoldina' },
      mestreBateria: { id: 'luc_b', name: 'Mestre Celsinho', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 85, salary: 36000, reputation: 'Bateria do Galo' },
      harmonia: { id: 'luc_h', name: 'Marcos', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 83, salary: 28000, reputation: 'Firmeza' },
      mestreSalaPortaBandeira: { id: 'luc_m', name: 'Hugo & Geovanna', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 83, salary: 32000, reputation: 'Elegância' },
      interprete: { id: 'luc_i', name: 'Marcelo Rodrigues', role: 'interprete', roleName: 'Intérprete Oficial', rating: 84, salary: 34000, reputation: 'Voz da Raiz' },
      coreografo: { id: 'luc_cf', name: 'Carlos Bolacha', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 82, salary: 28000, reputation: 'Dança Ancestral' }
    },
    currentEnredo: SAMPLE_ENREDOS[0],
    rehearsalLevel: 74,
    barracaoProgress: 72,
    technicalParadeDone: false
  },
  {
    id: 'rosa_de_ouro',
    name: 'Rosa de Ouro',
    shortName: 'Rosa de Ouro',
    nickname: 'A Rosa Dourada de Oswaldo Cruz',
    foundationYear: 1971,
    neighborhood: 'Oswaldo Cruz',
    colors: { primary: '#2563eb', secondary: '#eab308', text: '#ffffff', border: '#3b82f6' },
    symbol: '🌹 Rosa Dourada Imperial',
    division: 'prata',
    budget: 720000,
    fanBaseMorale: 78,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 1,
    attributes: { bateria: 82, comissaoDeFrente: 81, evolucao: 81, harmonia: 82, enredo: 82, fantasias: 80, alegorias: 80, sambaEnredo: 83, mestreSalaPortaBandeira: 82 },
    staff: {
      carnavalesco: { id: 'ro_c', name: 'Catia Drummond', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 81, salary: 32000, reputation: 'Amor à Rosa' },
      mestreBateria: { id: 'ro_b', name: 'Mestre Paulinho', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 82, salary: 30000, reputation: 'Swingueira' },
      harmonia: { id: 'ro_h', name: 'Adilson', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 81, salary: 25000, reputation: 'Organizado' },
      mestreSalaPortaBandeira: { id: 'ro_m', name: 'Yuri & Larissa', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 82, salary: 28000, reputation: 'Leveza' },
      interprete: { id: 'ro_i', name: 'Léo Simpatia', role: 'interprete', roleName: 'Intérprete Oficial', rating: 82, salary: 30000, reputation: 'Carisma' },
      coreografo: { id: 'ro_cf', name: 'Renata Monnier', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 80, salary: 25000, reputation: 'Graciosidade' }
    },
    currentEnredo: SAMPLE_ENREDOS[1],
    rehearsalLevel: 72,
    barracaoProgress: 70,
    technicalParadeDone: false
  },
  {
    id: 'curicica',
    name: 'União do Parque Curicica',
    shortName: 'Parque Curicica',
    nickname: 'A Tricolor de Jacarepaguá',
    foundationYear: 1993,
    neighborhood: 'Curicica, Jacarepaguá',
    colors: { primary: '#2563eb', secondary: '#dc2626', accent: '#ffffff', text: '#ffffff', border: '#3b82f6' },
    symbol: '🕊️ Pombinha da Paz & Sol',
    division: 'prata',
    budget: 850000,
    fanBaseMorale: 82,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 1,
    attributes: { bateria: 84, comissaoDeFrente: 83, evolucao: 83, harmonia: 83, enredo: 84, fantasias: 83, alegorias: 82, sambaEnredo: 84, mestreSalaPortaBandeira: 83 },
    staff: {
      carnavalesco: { id: 'cur_c', name: 'Alan Dias', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 83, salary: 38000, reputation: 'Criação Viva' },
      mestreBateria: { id: 'cur_b', name: 'Mestre Vitinho', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 84, salary: 36000, reputation: 'Pressão da Bateria' },
      harmonia: { id: 'cur_h', name: 'Julinho Curicica', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 82, salary: 28000, reputation: 'Comunidade Forte' },
      mestreSalaPortaBandeira: { id: 'cur_m', name: 'Matheus & Thainá', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 83, salary: 32000, reputation: 'Sintonia' },
      interprete: { id: 'cur_i', name: 'Ronaldo Yllê', role: 'interprete', roleName: 'Intérprete Oficial', rating: 84, salary: 35000, reputation: 'Voz da Comunidade' },
      coreografo: { id: 'cur_cf', name: 'Luciana Yegros', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 82, salary: 28000, reputation: 'Cênica Teatral' }
    },
    currentEnredo: SAMPLE_ENREDOS[2],
    rehearsalLevel: 75,
    barracaoProgress: 74,
    technicalParadeDone: false
  },
  {
    id: 'vila_santa_tereza',
    name: 'Unidos da Vila Santa Tereza',
    shortName: 'Vila Santa Tereza',
    nickname: 'A Azul e Branco de Rocha Miranda',
    foundationYear: 1956,
    neighborhood: 'Rocha Miranda',
    colors: { primary: '#0284c7', secondary: '#ffffff', text: '#ffffff', border: '#38bdf8' },
    symbol: '⛪ Capelinha e Coroa Sagrada',
    division: 'prata',
    budget: 730000,
    fanBaseMorale: 77,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    attributes: { bateria: 82, comissaoDeFrente: 81, evolucao: 81, harmonia: 82, enredo: 82, fantasias: 80, alegorias: 80, sambaEnredo: 82, mestreSalaPortaBandeira: 82 },
    staff: {
      carnavalesco: { id: 'vst_c', name: 'Caaio Araujo', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 81, salary: 32000, reputation: 'Pesquisa Popular' },
      mestreBateria: { id: 'vst_b', name: 'Mestre Peçanha', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 82, salary: 30000, reputation: 'Batida Firme' },
      harmonia: { id: 'vst_h', name: 'Delson', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 81, salary: 25000, reputation: 'Rua Iluminada' },
      mestreSalaPortaBandeira: { id: 'vst_m', name: 'Lucas & Evelyn', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 82, salary: 28000, reputation: 'Porte' },
      interprete: { id: 'vst_i', name: 'Bico Doce', role: 'interprete', roleName: 'Intérprete Oficial', rating: 82, salary: 30000, reputation: 'Potência' },
      coreografo: { id: 'vst_cf', name: 'Felipe Ribeiro', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 80, salary: 25000, reputation: 'Dança Popular' }
    },
    currentEnredo: SAMPLE_ENREDOS[3],
    rehearsalLevel: 71,
    barracaoProgress: 70,
    technicalParadeDone: false
  },
  {
    id: 'arrastao_cascadura',
    name: 'Arrastão de Cascadura',
    shortName: 'Arrastão de Cascadura',
    nickname: 'O Arrastão da Zona Norte',
    foundationYear: 1973,
    neighborhood: 'Cascadura',
    colors: { primary: '#15803d', secondary: '#ffffff', text: '#ffffff', border: '#22c55e' },
    symbol: '🌊 Rede de Pesca & Pandeiro',
    division: 'prata',
    budget: 740000,
    fanBaseMorale: 78,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    attributes: { bateria: 83, comissaoDeFrente: 81, evolucao: 81, harmonia: 82, enredo: 82, fantasias: 81, alegorias: 80, sambaEnredo: 83, mestreSalaPortaBandeira: 82 },
    staff: {
      carnavalesco: { id: 'arr_cas_c', name: 'Sandro Gomes', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 81, salary: 33000, reputation: 'Raiz Suburbana' },
      mestreBateria: { id: 'arr_cas_b', name: 'Mestre Chuvisco', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 83, salary: 32000, reputation: 'Arrastão de Ritmo' },
      harmonia: { id: 'arr_cas_h', name: 'Gilberto', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 81, salary: 25000, reputation: 'Fidelidade' },
      mestreSalaPortaBandeira: { id: 'arr_cas_m', name: 'Erick & Dandara', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 82, salary: 28000, reputation: 'Elegância Verde' },
      interprete: { id: 'arr_cas_i', name: 'Marquinhos Silva', role: 'interprete', roleName: 'Intérprete Oficial', rating: 83, salary: 30000, reputation: 'Samba no Sangue' },
      coreografo: { id: 'arr_cas_cf', name: 'Marcos Paulo', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 80, salary: 25000, reputation: 'Movimento' }
    },
    currentEnredo: SAMPLE_ENREDOS[4],
    rehearsalLevel: 72,
    barracaoProgress: 71,
    technicalParadeDone: false
  },
  {
    id: 'renascer_jacarepagua',
    name: 'Renascer de Jacarepaguá',
    shortName: 'Renascer de Jacarepaguá',
    nickname: 'A Vermelho e Branco do Tanque',
    foundationYear: 1992,
    neighborhood: 'Tanque, Jacarepaguá',
    colors: { primary: '#dc2626', secondary: '#ffffff', text: '#ffffff', border: '#ef4444' },
    symbol: '🕊️ Pomba Branca Alada',
    division: 'prata',
    budget: 920000,
    fanBaseMorale: 86,
    championshipsEspecial: 0,
    championshipsOuro: 1,
    championshipsPrata: 1,
    attributes: { bateria: 86, comissaoDeFrente: 85, evolucao: 84, harmonia: 85, enredo: 85, fantasias: 84, alegorias: 84, sambaEnredo: 86, mestreSalaPortaBandeira: 85 },
    staff: {
      carnavalesco: { id: 'ren_c', name: 'Rodrigo Pacheco', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 85, salary: 42000, reputation: 'Visual Imponente' },
      mestreBateria: { id: 'ren_b', name: 'Mestre Felipe', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 86, salary: 40000, reputation: 'Guerreira do Tanque' },
      harmonia: { id: 'ren_h', name: 'Vagner', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 84, salary: 32000, reputation: 'Evolução Cirúrgica' },
      mestreSalaPortaBandeira: { id: 'ren_m', name: 'Luís & Mariana', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 85, salary: 36000, reputation: 'Nobreza' },
      interprete: { id: 'ren_i', name: 'Leonardo Bessa', role: 'interprete', roleName: 'Intérprete Oficial', rating: 86, salary: 40000, reputation: 'Voz Consagrada' },
      coreografo: { id: 'ren_cf', name: 'Tony Tara', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 84, salary: 32000, reputation: 'Impacto Teatral' }
    },
    currentEnredo: SAMPLE_ENREDOS[5],
    rehearsalLevel: 78,
    barracaoProgress: 76,
    technicalParadeDone: false
  },
  {
    id: 'independentes_olaria',
    name: 'Independentes de Olaria',
    shortName: 'Independentes de Olaria',
    nickname: 'O Lobo da Leopoldina',
    foundationYear: 2017,
    neighborhood: 'Olaria',
    colors: { primary: '#1e40af', secondary: '#ffffff', text: '#ffffff', border: '#3b82f6' },
    symbol: '🐺 Lobo Uivante Coroado',
    division: 'prata',
    budget: 780000,
    fanBaseMorale: 80,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    attributes: { bateria: 83, comissaoDeFrente: 83, evolucao: 82, harmonia: 83, enredo: 83, fantasias: 82, alegorias: 81, sambaEnredo: 84, mestreSalaPortaBandeira: 83 },
    staff: {
      carnavalesco: { id: 'ola_c', name: 'Caio Cidrini', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 83, salary: 35000, reputation: 'Jovem Talento' },
      mestreBateria: { id: 'ola_b', name: 'Mestre Merica', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 84, salary: 34000, reputation: 'Pegada do Lobo' },
      harmonia: { id: 'ola_h', name: 'Jorge Olaria', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 82, salary: 26000, reputation: 'Disciplina' },
      mestreSalaPortaBandeira: { id: 'ola_m', name: 'Gabriel & Bárbara', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 83, salary: 30000, reputation: 'Brio Juvenil' },
      interprete: { id: 'ola_i', name: 'Tuninho Jr.', role: 'interprete', roleName: 'Intérprete Oficial', rating: 83, salary: 32000, reputation: 'Gogó Forte' },
      coreografo: { id: 'ola_cf', name: 'Handerson Big', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 82, salary: 26000, reputation: 'Dança Urbana' }
    },
    currentEnredo: SAMPLE_ENREDOS[0],
    rehearsalLevel: 74,
    barracaoProgress: 73,
    technicalParadeDone: false
  },
  {
    id: 'leao_zona_oeste',
    name: 'Leão da Zona Oeste',
    shortName: 'Leão da Zona Oeste',
    nickname: 'O Rugido de Bangu',
    foundationYear: 2021,
    neighborhood: 'Bangu',
    colors: { primary: '#b91c1c', secondary: '#ffffff', text: '#ffffff', border: '#ef4444' },
    symbol: '🦁 Leão Dourado Coroado',
    division: 'prata',
    budget: 720000,
    fanBaseMorale: 76,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    attributes: { bateria: 82, comissaoDeFrente: 81, evolucao: 81, harmonia: 81, enredo: 82, fantasias: 80, alegorias: 80, sambaEnredo: 82, mestreSalaPortaBandeira: 81 },
    staff: {
      carnavalesco: { id: 'lzo_c', name: 'André Cabral', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 81, salary: 32000, reputation: 'Fervor da Baixada' },
      mestreBateria: { id: 'lzo_b', name: 'Mestre Léo Bangu', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 82, salary: 30000, reputation: 'Batucada Feroz' },
      harmonia: { id: 'lzo_h', name: 'Cléber', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 80, salary: 24000, reputation: 'Garra' },
      mestreSalaPortaBandeira: { id: 'lzo_m', name: 'Renan & Camila', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 81, salary: 28000, reputation: 'Sincronia' },
      interprete: { id: 'lzo_i', name: 'Fabinho Pirueta', role: 'interprete', roleName: 'Intérprete Oficial', rating: 82, salary: 30000, reputation: 'Animação' },
      coreografo: { id: 'lzo_cf', name: 'Julio Cesar', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 80, salary: 24000, reputation: 'Dança Ancestral' }
    },
    currentEnredo: SAMPLE_ENREDOS[1],
    rehearsalLevel: 71,
    barracaoProgress: 69,
    technicalParadeDone: false
  },
  {
    id: 'sereno_campo_grande',
    name: 'Sereno de Campo Grande',
    shortName: 'Sereno de Campo Grande',
    nickname: 'A Coruja da Zona Oeste',
    foundationYear: 1976,
    neighborhood: 'Campo Grande',
    colors: { primary: '#0284c7', secondary: '#ffffff', text: '#ffffff', border: '#38bdf8' },
    symbol: '🦉 Coruja Imponente',
    division: 'prata',
    budget: 820000,
    fanBaseMorale: 82,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 1,
    attributes: { bateria: 84, comissaoDeFrente: 83, evolucao: 83, harmonia: 83, enredo: 84, fantasias: 82, alegorias: 82, sambaEnredo: 84, mestreSalaPortaBandeira: 83 },
    staff: {
      carnavalesco: { id: 'ser_c', name: 'Marcello Portella', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 83, salary: 36000, reputation: 'Tradição do Sertão Carioca' },
      mestreBateria: { id: 'ser_b', name: 'Mestre Celsinho Mão de Fogo', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 84, salary: 35000, reputation: 'Ritmo Puro' },
      harmonia: { id: 'ser_h', name: 'Luiz Carlos', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 82, salary: 27000, reputation: 'Dedicação' },
      mestreSalaPortaBandeira: { id: 'ser_m', name: 'Yago & Amanda', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 83, salary: 31000, reputation: 'Nobreza' },
      interprete: { id: 'ser_i', name: 'Sandro Mota', role: 'interprete', roleName: 'Intérprete Oficial', rating: 83, salary: 33000, reputation: 'Voz da Coruja' },
      coreografo: { id: 'ser_cf', name: 'Fábio Costa', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 82, salary: 27000, reputation: 'Cênica' }
    },
    currentEnredo: SAMPLE_ENREDOS[2],
    rehearsalLevel: 75,
    barracaoProgress: 73,
    technicalParadeDone: false
  },
  {
    id: 'tradicao',
    name: 'Tradição',
    shortName: 'Tradição',
    nickname: 'O Condor Dourado de Campinho',
    foundationYear: 1984,
    neighborhood: 'Campinho',
    colors: { primary: '#1d4ed8', secondary: '#eab308', accent: '#ffffff', text: '#ffffff', border: '#3b82f6' },
    symbol: '🦅 Condor de Ouro Majestoso',
    division: 'prata',
    budget: 930000,
    fanBaseMorale: 88,
    championshipsEspecial: 0,
    championshipsOuro: 1,
    championshipsPrata: 2,
    attributes: { bateria: 86, comissaoDeFrente: 85, evolucao: 85, harmonia: 85, enredo: 86, fantasias: 85, alegorias: 85, sambaEnredo: 87, mestreSalaPortaBandeira: 86 },
    staff: {
      carnavalesco: { id: 'tra_c', name: 'Leandro Valente', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 86, salary: 44000, reputation: 'Herança Portelense' },
      mestreBateria: { id: 'tra_b', name: 'Mestre Beto Peçanha', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 87, salary: 42000, reputation: 'Explosão do Condor' },
      harmonia: { id: 'tra_h', name: 'Celso', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 85, salary: 34000, reputation: 'Disciplina e Glória' },
      mestreSalaPortaBandeira: { id: 'tra_m', name: 'Fabrício & Thais', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 86, salary: 38000, reputation: 'Soberania' },
      interprete: { id: 'tra_i', name: 'Leco da Frigideira', role: 'interprete', roleName: 'Intérprete Oficial', rating: 86, salary: 42000, reputation: 'Grito Inconfundível' },
      coreografo: { id: 'tra_cf', name: 'Marcio Moura', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 85, salary: 34000, reputation: 'Tradição Cênica' }
    },
    currentEnredo: SAMPLE_ENREDOS[3],
    rehearsalLevel: 80,
    barracaoProgress: 78,
    technicalParadeDone: false
  },
  {
    id: 'tubarao_mesquita',
    name: 'Tubarão de Mesquita',
    shortName: 'Tubarão de Mesquita',
    nickname: 'O Tubarão da Baixada',
    foundationYear: 2021,
    neighborhood: 'Mesquita',
    colors: { primary: '#0369a1', secondary: '#ffffff', text: '#ffffff', border: '#0284c7' },
    symbol: '🦈 Tubarão Valente da Baixada',
    division: 'prata',
    budget: 720000,
    fanBaseMorale: 76,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    attributes: { bateria: 82, comissaoDeFrente: 81, evolucao: 81, harmonia: 81, enredo: 82, fantasias: 80, alegorias: 80, sambaEnredo: 82, mestreSalaPortaBandeira: 81 },
    staff: {
      carnavalesco: { id: 'tub_c', name: 'Sidney Rocha', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 81, salary: 32000, reputation: 'Criatividade da Baixada' },
      mestreBateria: { id: 'tub_b', name: 'Mestre Jonas', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 82, salary: 30000, reputation: 'Pegada' },
      harmonia: { id: 'tub_h', name: 'Evandro', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 80, salary: 24000, reputation: 'Vontade' },
      mestreSalaPortaBandeira: { id: 'tub_m', name: 'Ronaldo & Bia', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 81, salary: 28000, reputation: 'Postura' },
      interprete: { id: 'tub_i', name: 'Daniel Silva', role: 'interprete', roleName: 'Intérprete Oficial', rating: 82, salary: 30000, reputation: 'Empenho' },
      coreografo: { id: 'tub_cf', name: 'Leandro Azevedo', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 80, salary: 24000, reputation: 'Juventude' }
    },
    currentEnredo: SAMPLE_ENREDOS[4],
    rehearsalLevel: 72,
    barracaoProgress: 70,
    technicalParadeDone: false
  },
  {
    id: 'engenho_da_rainha',
    name: 'Acadêmicos do Engenho da Rainha',
    shortName: 'Engenho da Rainha',
    nickname: 'A Primeira Academia do Samba',
    foundationYear: 1949,
    neighborhood: 'Engenho da Rainha',
    colors: { primary: '#dc2626', secondary: '#ffffff', text: '#ffffff', border: '#ef4444' },
    symbol: '👑 Coroa da Rainha e Ramos',
    division: 'prata',
    budget: 820000,
    fanBaseMorale: 83,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 1,
    attributes: { bateria: 84, comissaoDeFrente: 83, evolucao: 83, harmonia: 83, enredo: 84, fantasias: 82, alegorias: 82, sambaEnredo: 85, mestreSalaPortaBandeira: 83 },
    staff: {
      carnavalesco: { id: 'eng_c', name: 'Alexandre Gonçalves', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 83, salary: 37000, reputation: 'Samba de Raiz' },
      mestreBateria: { id: 'eng_b', name: 'Mestre Laion', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 84, salary: 35000, reputation: 'Bateria da Rainha' },
      harmonia: { id: 'eng_h', name: 'Paulo', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 82, salary: 27000, reputation: 'Raça Suburbana' },
      mestreSalaPortaBandeira: { id: 'eng_m', name: 'Vinicius & Thayane', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 83, salary: 31000, reputation: 'Brio' },
      interprete: { id: 'eng_i', name: 'Rafael Faustino', role: 'interprete', roleName: 'Intérprete Oficial', rating: 84, salary: 34000, reputation: 'Canto Sagrado' },
      coreografo: { id: 'eng_cf', name: 'Leo Torres', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 82, salary: 27000, reputation: 'Dramaturgia' }
    },
    currentEnredo: SAMPLE_ENREDOS[5],
    rehearsalLevel: 75,
    barracaoProgress: 73,
    technicalParadeDone: false
  },
  {
    id: 'imperio_da_tijuca',
    name: 'Império da Tijuca',
    shortName: 'Império da Tijuca',
    nickname: 'O Primeiro Império do Samba',
    foundationYear: 1940,
    neighborhood: 'Morro da Formiga, Tijuca',
    colors: { primary: '#15803d', secondary: '#ffffff', text: '#ffffff', border: '#22c55e' },
    symbol: '👑 Coroa Imperial & Formiga Guerreira',
    division: 'prata',
    budget: 950000,
    fanBaseMorale: 88,
    championshipsEspecial: 0,
    championshipsOuro: 1,
    championshipsPrata: 2,
    attributes: { bateria: 87, comissaoDeFrente: 85, evolucao: 85, harmonia: 86, enredo: 86, fantasias: 85, alegorias: 85, sambaEnredo: 87, mestreSalaPortaBandeira: 86 },
    staff: {
      carnavalesco: { id: 'itij_c', name: 'Júnior Pernambucano', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 86, salary: 45000, reputation: 'Sinfonia Verde e Branca' },
      mestreBateria: { id: 'itij_b', name: 'Mestre Jordan', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 87, salary: 44000, reputation: 'Sinfonia Imperial' },
      harmonia: { id: 'itij_h', name: 'Robson', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 85, salary: 35000, reputation: 'Fervor da Formiga' },
      mestreSalaPortaBandeira: { id: 'itij_m', name: 'Renan & Laís', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 86, salary: 40000, reputation: 'Graciosidade Pura' },
      interprete: { id: 'itij_i', name: 'Daniel Silva', role: 'interprete', roleName: 'Intérprete Oficial', rating: 87, salary: 43000, reputation: 'Gogó Dourado' },
      coreografo: { id: 'itij_cf', name: 'Lucas Maciel', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 85, salary: 35000, reputation: 'Força Cênica' }
    },
    currentEnredo: SAMPLE_ENREDOS[0],
    rehearsalLevel: 81,
    barracaoProgress: 79,
    technicalParadeDone: false
  },
  {
    id: 'santa_marta',
    name: 'Mocidade Unida do Santa Marta',
    shortName: 'Mocidade do Santa Marta',
    nickname: 'A Furiosa do Dona Marta',
    foundationYear: 1992,
    neighborhood: 'Morro Dona Marta, Botafogo',
    colors: { primary: '#2563eb', secondary: '#ffffff', text: '#ffffff', border: '#3b82f6' },
    symbol: '🕊️ Pombinha da Paz & Mirante',
    division: 'prata',
    budget: 740000,
    fanBaseMorale: 78,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    attributes: { bateria: 83, comissaoDeFrente: 81, evolucao: 81, harmonia: 82, enredo: 82, fantasias: 81, alegorias: 80, sambaEnredo: 83, mestreSalaPortaBandeira: 82 },
    staff: {
      carnavalesco: { id: 'sm_c', name: 'Carila Matos', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 81, salary: 33000, reputation: 'Cultura da Favela' },
      mestreBateria: { id: 'sm_b', name: 'Mestre Neidinho', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 83, salary: 32000, reputation: 'Furiosa do Morro' },
      harmonia: { id: 'sm_h', name: 'Carlinhos', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 81, salary: 25000, reputation: 'Lealdade' },
      mestreSalaPortaBandeira: { id: 'sm_m', name: 'Diego & Clara', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 82, salary: 29000, reputation: 'Harmonia' },
      interprete: { id: 'sm_i', name: 'Edu Chagas', role: 'interprete', roleName: 'Intérprete Oficial', rating: 83, salary: 31000, reputation: 'Entusiasmo' },
      coreografo: { id: 'sm_cf', name: 'Wallace Souza', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 80, salary: 25000, reputation: 'Expressão' }
    },
    currentEnredo: SAMPLE_ENREDOS[1],
    rehearsalLevel: 73,
    barracaoProgress: 71,
    technicalParadeDone: false
  },
  {
    id: 'boi_da_ilha',
    name: 'Boi da Ilha do Governador',
    shortName: 'Boi da Ilha',
    nickname: 'O Boi da Freguesia',
    foundationYear: 1965,
    neighborhood: 'Freguesia, Ilha do Governador',
    colors: { primary: '#dc2626', secondary: '#ffffff', text: '#ffffff', border: '#ef4444' },
    symbol: '🐂 Boi Pintadinho Tradicional',
    division: 'prata',
    budget: 760000,
    fanBaseMorale: 80,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    attributes: { bateria: 83, comissaoDeFrente: 82, evolucao: 82, harmonia: 82, enredo: 83, fantasias: 81, alegorias: 81, sambaEnredo: 84, mestreSalaPortaBandeira: 82 },
    staff: {
      carnavalesco: { id: 'boi_c', name: 'Cahê Rodrigues', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 83, salary: 36000, reputation: 'Tradição Insulana' },
      mestreBateria: { id: 'boi_b', name: 'Mestre Maurício', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 83, salary: 33000, reputation: 'Batucada do Boi' },
      harmonia: { id: 'boi_h', name: 'Fininho', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 81, salary: 26000, reputation: 'Voz da Ilha' },
      mestreSalaPortaBandeira: { id: 'boi_m', name: 'Igor & Julia', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 82, salary: 29000, reputation: 'Leveza' },
      interprete: { id: 'boi_i', name: 'Cadinho da Ilha', role: 'interprete', roleName: 'Intérprete Oficial', rating: 83, salary: 32000, reputation: 'Identidade' },
      coreografo: { id: 'boi_cf', name: 'Guilherme Miranda', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 81, salary: 26000, reputation: 'Folclore' }
    },
    currentEnredo: SAMPLE_ENREDOS[2],
    rehearsalLevel: 74,
    barracaoProgress: 72,
    technicalParadeDone: false
  },
  {
    id: 'fla_manguaca',
    name: 'Fla Manguaça',
    shortName: 'Fla Manguaça',
    nickname: 'A Paixão Rubro-Negra na Passarela',
    foundationYear: 2020,
    neighborhood: 'Pilares',
    colors: { primary: '#b91c1c', secondary: '#18181b', text: '#ffffff', border: '#dc2626' },
    symbol: '🦅 Urubu Guerreiro & Pandeiro',
    division: 'prata',
    budget: 820000,
    fanBaseMorale: 86,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    attributes: { bateria: 85, comissaoDeFrente: 83, evolucao: 83, harmonia: 84, enredo: 84, fantasias: 82, alegorias: 82, sambaEnredo: 85, mestreSalaPortaBandeira: 83 },
    staff: {
      carnavalesco: { id: 'fla_c', name: 'Amarildo de Mello', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 84, salary: 38000, reputation: 'Energia Popular' },
      mestreBateria: { id: 'fla_b', name: 'Mestre Felipe D´Lellis', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 85, salary: 36000, reputation: 'Bateria Furiosa' },
      harmonia: { id: 'fla_h', name: 'Marquinhos Fla', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 83, salary: 29000, reputation: 'Arrasto da Torcida' },
      mestreSalaPortaBandeira: { id: 'fla_m', name: 'Emanuel & Kelly', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 83, salary: 32000, reputation: 'Paixão' },
      interprete: { id: 'fla_i', name: 'Hudson Luiz', role: 'interprete', roleName: 'Intérprete Oficial', rating: 85, salary: 37000, reputation: 'Canto Poderoso' },
      coreografo: { id: 'fla_cf', name: 'Jariel', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 82, salary: 28000, reputation: 'Vibração' }
    },
    currentEnredo: SAMPLE_ENREDOS[3],
    rehearsalLevel: 77,
    barracaoProgress: 75,
    technicalParadeDone: false
  },
  {
    id: 'unidos_de_cosmos',
    name: 'Unidos de Cosmos',
    shortName: 'Unidos de Cosmos',
    nickname: 'A Estrela do Extremo Oeste',
    foundationYear: 1948,
    neighborhood: 'Cosmos, Zona Oeste',
    colors: { primary: '#15803d', secondary: '#ffffff', text: '#ffffff', border: '#22c55e' },
    symbol: '🪐 Estrela Guia e Cosmos',
    division: 'prata',
    budget: 720000,
    fanBaseMorale: 77,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    attributes: { bateria: 82, comissaoDeFrente: 81, evolucao: 81, harmonia: 81, enredo: 82, fantasias: 80, alegorias: 80, sambaEnredo: 82, mestreSalaPortaBandeira: 81 },
    staff: {
      carnavalesco: { id: 'cos_c', name: 'Raphael Ladosky', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 81, salary: 32000, reputation: 'Arte Comunitária' },
      mestreBateria: { id: 'cos_b', name: 'Mestre Paulão Cosmos', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 82, salary: 30000, reputation: 'Cadência' },
      harmonia: { id: 'cos_h', name: 'Zé Carlos', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 80, salary: 24000, reputation: 'Dedicação' },
      mestreSalaPortaBandeira: { id: 'cos_m', name: 'Felipe & Marcela', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 81, salary: 28000, reputation: 'Respeito ao Manto' },
      interprete: { id: 'cos_i', name: 'Léo Oliveira', role: 'interprete', roleName: 'Intérprete Oficial', rating: 82, salary: 30000, reputation: 'Canto Firme' },
      coreografo: { id: 'cos_cf', name: 'Diego Fernandes', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 80, salary: 24000, reputation: 'Expressividade' }
    },
    currentEnredo: SAMPLE_ENREDOS[4],
    rehearsalLevel: 71,
    barracaoProgress: 69,
    technicalParadeDone: false
  },
  {
    id: 'imperio_da_uva',
    name: 'Império da Uva',
    shortName: 'Império da Uva',
    nickname: 'A Mais Doce da Baixada',
    foundationYear: 1980,
    neighborhood: 'Nova Iguaçu',
    colors: { primary: '#16a34a', secondary: '#7e22ce', text: '#ffffff', border: '#a855f7' },
    symbol: '🍇 Cacho de Uva Dourado',
    division: 'prata',
    budget: 770000,
    fanBaseMorale: 81,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    attributes: { bateria: 83, comissaoDeFrente: 82, evolucao: 82, harmonia: 82, enredo: 83, fantasias: 81, alegorias: 81, sambaEnredo: 83, mestreSalaPortaBandeira: 82 },
    staff: {
      carnavalesco: { id: 'uva_c', name: 'Clebson Prates', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 82, salary: 35000, reputation: 'Criatividade da Baixada' },
      mestreBateria: { id: 'uva_b', name: 'Mestre Paulinho Uva', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 83, salary: 33000, reputation: 'Batucada Doce' },
      harmonia: { id: 'uva_h', name: 'Nivaldo', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 81, salary: 26000, reputation: 'Organização' },
      mestreSalaPortaBandeira: { id: 'uva_m', name: 'Douglas & Thayná', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 82, salary: 29000, reputation: 'Sintonia' },
      interprete: { id: 'uva_i', name: 'Leozinho da Uva', role: 'interprete', roleName: 'Intérprete Oficial', rating: 83, salary: 32000, reputation: 'Alegria' },
      coreografo: { id: 'uva_cf', name: 'Marcio Oliveira', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 81, salary: 25000, reputation: 'Dança' }
    },
    currentEnredo: SAMPLE_ENREDOS[5],
    rehearsalLevel: 74,
    barracaoProgress: 72,
    technicalParadeDone: false
  },
  {
    id: 'rocinha',
    name: 'Acadêmicos da Rocinha',
    shortName: 'Acad. da Rocinha',
    nickname: 'A Borboleta Encantada',
    foundationYear: 1988,
    neighborhood: 'Rocinha, São Conrado',
    colors: { primary: '#15803d', secondary: '#2563eb', accent: '#ffffff', text: '#ffffff', border: '#22c55e' },
    symbol: '🦋 Borboleta Majestosa da Rocinha',
    division: 'prata',
    budget: 920000,
    fanBaseMorale: 87,
    championshipsEspecial: 0,
    championshipsOuro: 1,
    championshipsPrata: 2,
    attributes: { bateria: 86, comissaoDeFrente: 85, evolucao: 85, harmonia: 85, enredo: 85, fantasias: 84, alegorias: 84, sambaEnredo: 86, mestreSalaPortaBandeira: 85 },
    staff: {
      carnavalesco: { id: 'roc_c', name: 'Marcus Paulo', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 85, salary: 43000, reputation: 'Plástica Encantada' },
      mestreBateria: { id: 'roc_b', name: 'Mestre Junior', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 86, salary: 41000, reputation: 'Ritmo da Rocinha' },
      harmonia: { id: 'roc_h', name: 'Marcelo Harmonia', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 84, salary: 33000, reputation: 'Comunidade Apaixonada' },
      mestreSalaPortaBandeira: { id: 'roc_m', name: 'Wanderson & Thais', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 85, salary: 37000, reputation: 'Elegância e Giro' },
      interprete: { id: 'roc_i', name: 'Dodô Ananias', role: 'interprete', roleName: 'Intérprete Oficial', rating: 86, salary: 40000, reputation: 'Voz da Borboleta' },
      coreografo: { id: 'roc_cf', name: 'Júnior Scapin', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 84, salary: 33000, reputation: 'Inovação Cênica' }
    },
    currentEnredo: SAMPLE_ENREDOS[0],
    rehearsalLevel: 79,
    barracaoProgress: 77,
    technicalParadeDone: false
  },
  {
    id: 'cubango',
    name: 'Acadêmicos do Cubango',
    shortName: 'Cubango',
    nickname: 'O Quilombo Verde e Branco de Niterói',
    foundationYear: 1959,
    neighborhood: 'Cubango, Niterói',
    colors: { primary: '#15803d', secondary: '#ffffff', text: '#ffffff', border: '#22c55e' },
    symbol: '🌿 Folhas Sagradas & Atabaque',
    division: 'prata',
    budget: 940000,
    fanBaseMorale: 88,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 2,
    attributes: { bateria: 87, comissaoDeFrente: 85, evolucao: 85, harmonia: 86, enredo: 86, fantasias: 85, alegorias: 85, sambaEnredo: 87, mestreSalaPortaBandeira: 86 },
    staff: {
      carnavalesco: { id: 'cub_c', name: 'Gabriel Haddad & Leonardo Bora', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 86, salary: 45000, reputation: 'Enredos Afro Históricos' },
      mestreBateria: { id: 'cub_b', name: 'Mestre Alemão da Ilha', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 87, salary: 43000, reputation: 'Ritmo Quilombola' },
      harmonia: { id: 'cub_h', name: 'Alan', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 85, salary: 34000, reputation: 'Fervor e Disciplina' },
      mestreSalaPortaBandeira: { id: 'cub_m', name: 'Diego Falcão & Jackeline', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 86, salary: 39000, reputation: 'Ancestralidade' },
      interprete: { id: 'cub_i', name: 'Wagner do Canto', role: 'interprete', roleName: 'Intérprete Oficial', rating: 87, salary: 43000, reputation: 'Timbre Guerreiro' },
      coreografo: { id: 'cub_cf', name: 'Sérgio Lobato', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 85, salary: 35000, reputation: 'Força Teatral' }
    },
    currentEnredo: SAMPLE_ENREDOS[1],
    rehearsalLevel: 80,
    barracaoProgress: 78,
    technicalParadeDone: false
  },
  {
    id: 'abolicao',
    name: 'Acadêmicos da Abolição',
    shortName: 'Acad. da Abolição',
    nickname: 'A Flor da Abolição',
    foundationYear: 1976,
    neighborhood: 'Abolição',
    colors: { primary: '#16a34a', secondary: '#ffffff', text: '#ffffff', border: '#22c55e' },
    symbol: '🕊️ Grilhões Rompidos da Liberdade',
    division: 'prata',
    budget: 740000,
    fanBaseMorale: 78,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    attributes: { bateria: 83, comissaoDeFrente: 81, evolucao: 81, harmonia: 82, enredo: 82, fantasias: 81, alegorias: 80, sambaEnredo: 83, mestreSalaPortaBandeira: 82 },
    staff: {
      carnavalesco: { id: 'abo_c', name: 'Cristiano Bara', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 82, salary: 33000, reputation: 'Pesquisa Popular' },
      mestreBateria: { id: 'abo_b', name: 'Mestre Flavinho', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 83, salary: 31000, reputation: 'Cadência da Abolição' },
      harmonia: { id: 'abo_h', name: 'Renato', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 81, salary: 25000, reputation: 'Compromisso' },
      mestreSalaPortaBandeira: { id: 'abo_m', name: 'Alex & Roberta', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 82, salary: 28000, reputation: 'Harmonia' },
      interprete: { id: 'abo_i', name: 'Digão da Abolição', role: 'interprete', roleName: 'Intérprete Oficial', rating: 83, salary: 31000, reputation: 'Gogó Forte' },
      coreografo: { id: 'abo_cf', name: 'Rodrigo', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 80, salary: 25000, reputation: 'Expressão' }
    },
    currentEnredo: SAMPLE_ENREDOS[2],
    rehearsalLevel: 73,
    barracaoProgress: 71,
    technicalParadeDone: false
  },
  {
    id: 'alegria_do_vilar',
    name: 'Alegria do Vilar',
    shortName: 'Alegria do Vilar',
    nickname: 'O Sol Radiante de Meriti',
    foundationYear: 2017,
    neighborhood: 'São João de Meriti',
    colors: { primary: '#2563eb', secondary: '#dc2626', accent: '#ffffff', text: '#ffffff', border: '#3b82f6' },
    symbol: '☀️ Sol Dourado Radiante & Pandeiro',
    division: 'prata',
    budget: 740000,
    fanBaseMorale: 78,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    attributes: { bateria: 83, comissaoDeFrente: 81, evolucao: 81, harmonia: 82, enredo: 82, fantasias: 81, alegorias: 81, sambaEnredo: 83, mestreSalaPortaBandeira: 82 },
    staff: {
      carnavalesco: { id: 'vil_c', name: 'Ricardo Paulino', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 82, salary: 33000, reputation: 'Alegria de Meriti' },
      mestreBateria: { id: 'vil_b', name: 'Mestre Biel', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 83, salary: 31000, reputation: 'Pressão do Sol' },
      harmonia: { id: 'vil_h', name: 'Tião', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 81, salary: 25000, reputation: 'Amor à Escola' },
      mestreSalaPortaBandeira: { id: 'vil_m', name: 'Cleber & Viviane', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 82, salary: 29000, reputation: 'Dedicação' },
      interprete: { id: 'vil_i', name: 'Mário Sérgio', role: 'interprete', roleName: 'Intérprete Oficial', rating: 83, salary: 31000, reputation: 'Entusiasmo' },
      coreografo: { id: 'vil_cf', name: 'Carlos Alberto', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 81, salary: 25000, reputation: 'Dança Viva' }
    },
    currentEnredo: SAMPLE_ENREDOS[3],
    rehearsalLevel: 73,
    barracaoProgress: 71,
    technicalParadeDone: false
  },
  {
    id: 'feitico_carioca',
    name: 'Feitiço Carioca',
    shortName: 'Feitiço Carioca',
    nickname: 'O Feitiço da Zona Sul',
    foundationYear: 2016,
    neighborhood: 'Catete / Santa Teresa',
    colors: { primary: '#1d4ed8', secondary: '#eab308', text: '#ffffff', border: '#3b82f6' },
    symbol: '✨ Varadouro Mágico e Coroa',
    division: 'prata',
    budget: 730000,
    fanBaseMorale: 77,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    attributes: { bateria: 82, comissaoDeFrente: 81, evolucao: 81, harmonia: 82, enredo: 82, fantasias: 80, alegorias: 80, sambaEnredo: 83, mestreSalaPortaBandeira: 82 },
    staff: {
      carnavalesco: { id: 'fei_c', name: 'Elidio Júnior', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 81, salary: 32000, reputation: 'Feitiço e Magia' },
      mestreBateria: { id: 'fei_b', name: 'Mestre Douglas', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 82, salary: 30000, reputation: 'Swing Mágico' },
      harmonia: { id: 'fei_h', name: 'Armando', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 80, salary: 25000, reputation: 'Organização' },
      mestreSalaPortaBandeira: { id: 'fei_m', name: 'Cristiano & Aline', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 82, salary: 28000, reputation: 'Graciosidade' },
      interprete: { id: 'fei_i', name: 'Betinho do Feitiço', role: 'interprete', roleName: 'Intérprete Oficial', rating: 82, salary: 30000, reputation: 'Alegria da Zona Sul' },
      coreografo: { id: 'fei_cf', name: 'Danilo Silva', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 80, salary: 24000, reputation: 'Teatro Popular' }
    },
    currentEnredo: SAMPLE_ENREDOS[4],
    rehearsalLevel: 72,
    barracaoProgress: 70,
    technicalParadeDone: false
  },
  {
    id: 'lins_imperial',
    name: 'Lins Imperial',
    shortName: 'Lins Imperial',
    nickname: 'A Verde e Rosa do Lins',
    foundationYear: 1963,
    neighborhood: 'Lins de Vasconcelos',
    colors: { primary: '#15803d', secondary: '#db2777', text: '#ffffff', border: '#22c55e' },
    symbol: '👑 Coroa Imperial de São Jorge & Águia',
    division: 'prata',
    budget: 910000,
    fanBaseMorale: 86,
    championshipsEspecial: 0,
    championshipsOuro: 2,
    championshipsPrata: 2,
    attributes: { bateria: 86, comissaoDeFrente: 84, evolucao: 85, harmonia: 85, enredo: 85, fantasias: 84, alegorias: 84, sambaEnredo: 86, mestreSalaPortaBandeira: 85 },
    staff: {
      carnavalesco: { id: 'lins_c', name: 'Ray Menezes & Eduardo Gonçalves', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 85, salary: 42000, reputation: 'Tradição do Lins' },
      mestreBateria: { id: 'lins_b', name: 'Mestre Átila', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 86, salary: 40000, reputation: 'Verdadeira Bateria' },
      harmonia: { id: 'lins_h', name: 'Jorginho Harmonia', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 84, salary: 32000, reputation: 'Garra Histórica' },
      mestreSalaPortaBandeira: { id: 'lins_m', name: 'Jackson & Manoela', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 85, salary: 36000, reputation: 'Nobreza Verde e Rosa' },
      interprete: { id: 'lins_i', name: 'Rafael Tinga', role: 'interprete', roleName: 'Intérprete Oficial', rating: 85, salary: 39000, reputation: 'Voz da Comunidade' },
      coreografo: { id: 'lins_cf', name: 'Carlos Muvuca', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 84, salary: 32000, reputation: 'Cênica de São Jorge' }
    },
    currentEnredo: SAMPLE_ENREDOS[5],
    rehearsalLevel: 78,
    barracaoProgress: 76,
    technicalParadeDone: false
  },

  // ==========================================
  // SÉRIE BRONZE (QUARTA DIVISÃO - 22 ESCOLAS)
  // ==========================================
  {
    id: 'arame_de_ricardo',
    name: 'Arame de Ricardo',
    shortName: 'Arame de Ricardo',
    nickname: 'O Arame de Ricardo de Albuquerque',
    foundationYear: 1995,
    neighborhood: 'Ricardo de Albuquerque',
    colors: { primary: '#1d4ed8', secondary: '#ffffff', text: '#ffffff', border: '#3b82f6' },
    symbol: '🪢 Pandeiro & Laço de Arame Dourado',
    division: 'bronze',
    budget: 460000,
    fanBaseMorale: 80,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    championshipsBronze: 0,
    attributes: { bateria: 82, comissaoDeFrente: 80, evolucao: 81, harmonia: 81, enredo: 81, fantasias: 79, alegorias: 79, sambaEnredo: 82, mestreSalaPortaBandeira: 80 },
    staff: {
      carnavalesco: { id: 'adr_c', name: 'Guto', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 80, salary: 23000, reputation: 'Raiz Suburbana' },
      mestreBateria: { id: 'adr_b', name: 'Mestre Paulinho Sorriso', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 82, salary: 23000, reputation: 'Cadência Firme' },
      harmonia: { id: 'adr_h', name: 'Jorge Arame', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 80, salary: 17000, reputation: 'Comunidade Forte' },
      mestreSalaPortaBandeira: { id: 'adr_m', name: 'Welington & Mariana', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 80, salary: 19000, reputation: 'Harmonia' },
      interprete: { id: 'adr_i', name: 'Giovane Mello', role: 'interprete', roleName: 'Intérprete Oficial', rating: 81, salary: 21000, reputation: 'Canto Claro' },
      coreografo: { id: 'adr_cf', name: 'Carlos Bolacha Jr.', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 79, salary: 16000, reputation: 'Dança Popular' }
    },
    currentEnredo: SAMPLE_ENREDOS[0],
    rehearsalLevel: 72,
    barracaoProgress: 70,
    technicalParadeDone: false
  },
  {
    id: 'chatuba',
    name: 'Chatuba de Mesquita',
    shortName: 'Chatuba de Mesquita',
    nickname: 'A Alviverde da Baixada',
    foundationYear: 1995,
    neighborhood: 'Chatuba, Mesquita (Baixada)',
    colors: { primary: '#15803d', secondary: '#ffffff', text: '#ffffff', border: '#22c55e' },
    symbol: '🌿 Cachimbo Sagrado & Pandeiro Alviverde',
    division: 'bronze',
    budget: 450000,
    fanBaseMorale: 79,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    championshipsBronze: 0,
    attributes: { bateria: 81, comissaoDeFrente: 80, evolucao: 80, harmonia: 81, enredo: 80, fantasias: 79, alegorias: 78, sambaEnredo: 82, mestreSalaPortaBandeira: 80 },
    staff: {
      carnavalesco: { id: 'cha_c', name: 'Sérgio Falcão', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 80, salary: 22000, reputation: 'Raiz da Baixada' },
      mestreBateria: { id: 'cha_b', name: 'Mestre Paulinho', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 81, salary: 22000, reputation: 'Cadência Verde' },
      harmonia: { id: 'cha_h', name: 'Valdir Mesquita', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 80, salary: 16000, reputation: 'Determinado' },
      mestreSalaPortaBandeira: { id: 'cha_m', name: 'Cléber & Bia', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 80, salary: 18000, reputation: 'Sincronia' },
      interprete: { id: 'cha_i', name: 'Ronaldo Oliveira', role: 'interprete', roleName: 'Intérprete Oficial', rating: 81, salary: 20000, reputation: 'Voz da Chatuba' },
      coreografo: { id: 'cha_cf', name: 'Fabiano Santos', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 79, salary: 16000, reputation: 'Dança Cênica' }
    },
    currentEnredo: SAMPLE_ENREDOS[1],
    rehearsalLevel: 71,
    barracaoProgress: 69,
    technicalParadeDone: false
  },
  {
    id: 'uniao_cruzmaltina',
    name: 'União Cruzmaltina',
    shortName: 'União Cruzmaltina',
    nickname: 'O Trem Bala da Folia',
    foundationYear: 2019,
    neighborhood: 'São Cristóvão / Vasco da Gama',
    colors: { primary: '#18181b', secondary: '#ffffff', accent: '#dc2626', text: '#ffffff', border: '#ef4444' },
    symbol: '✝️ Cruz de Malta Rubra & Caravela',
    division: 'bronze',
    budget: 490000,
    fanBaseMorale: 84,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    championshipsBronze: 0,
    attributes: { bateria: 83, comissaoDeFrente: 81, evolucao: 81, harmonia: 82, enredo: 82, fantasias: 80, alegorias: 80, sambaEnredo: 83, mestreSalaPortaBandeira: 81 },
    staff: {
      carnavalesco: { id: 'ucr_c', name: 'Rodrigo Almeida', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 81, salary: 25000, reputation: 'Herança Cruzmaltina' },
      mestreBateria: { id: 'ucr_b', name: 'Mestre Lucianinho', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 83, salary: 24000, reputation: 'Bateria Guerreira da Colina' },
      harmonia: { id: 'ucr_h', name: 'Marcelo Cruzmaltino', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 81, salary: 18000, reputation: 'Fervor da Torcida' },
      mestreSalaPortaBandeira: { id: 'ucr_m', name: 'Erick & Dandara', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 81, salary: 20000, reputation: 'Postura Imponente' },
      interprete: { id: 'ucr_i', name: 'Juan Briggs', role: 'interprete', roleName: 'Intérprete Oficial', rating: 82, salary: 22000, reputation: 'Potência de Voz' },
      coreografo: { id: 'ucr_cf', name: 'Thiago Brito Jr.', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 80, salary: 18000, reputation: 'Cênica da Colina' }
    },
    currentEnredo: SAMPLE_ENREDOS[2],
    rehearsalLevel: 73,
    barracaoProgress: 71,
    technicalParadeDone: false
  },
  {
    id: 'villa_rica',
    name: 'Unidos da Villa Rica',
    shortName: 'Villa Rica',
    nickname: 'A Nobreza de Copacabana',
    foundationYear: 1966,
    neighborhood: 'Copacabana',
    colors: { primary: '#1e40af', secondary: '#eab308', text: '#ffffff', border: '#3b82f6' },
    symbol: '🦚 Pavão Real & Sol Dourado',
    division: 'bronze',
    budget: 440000,
    fanBaseMorale: 78,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    championshipsBronze: 0,
    attributes: { bateria: 81, comissaoDeFrente: 79, evolucao: 80, harmonia: 80, enredo: 81, fantasias: 79, alegorias: 78, sambaEnredo: 82, mestreSalaPortaBandeira: 80 },
    staff: {
      carnavalesco: { id: 'vr_c', name: 'João Vitor', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 79, salary: 21000, reputation: 'Beleza do Mar' },
      mestreBateria: { id: 'vr_b', name: 'Mestre Chicão', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 80, salary: 20000, reputation: 'Cadência Carioca' },
      harmonia: { id: 'vr_h', name: 'Antônio Villa', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 79, salary: 15000, reputation: 'Amor à Escola' },
      mestreSalaPortaBandeira: { id: 'vr_m', name: 'Marcos & Amanda', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 80, salary: 18000, reputation: 'Delicadeza' },
      interprete: { id: 'vr_i', name: 'Gustavo Lins Jr.', role: 'interprete', roleName: 'Intérprete Oficial', rating: 80, salary: 19000, reputation: 'Alegria do Pavão' },
      coreografo: { id: 'vr_cf', name: 'Beatriz Almeida', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 78, salary: 15000, reputation: 'Dança das Ondas' }
    },
    currentEnredo: SAMPLE_ENREDOS[3],
    rehearsalLevel: 70,
    barracaoProgress: 68,
    technicalParadeDone: false
  },
  {
    id: 'vicente_de_carvalho',
    name: 'Mocidade de Vicente de Carvalho',
    shortName: 'Vicente de Carvalho',
    nickname: 'A Verde e Branco do Subúrbio',
    foundationYear: 1947,
    neighborhood: 'Vicente de Carvalho',
    colors: { primary: '#16a34a', secondary: '#ffffff', text: '#ffffff', border: '#22c55e' },
    symbol: '👑 Coroa Real e Ramos Verdes',
    division: 'bronze',
    budget: 460000,
    fanBaseMorale: 80,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    championshipsBronze: 0,
    attributes: { bateria: 82, comissaoDeFrente: 80, evolucao: 80, harmonia: 81, enredo: 81, fantasias: 79, alegorias: 78, sambaEnredo: 82, mestreSalaPortaBandeira: 80 },
    staff: {
      carnavalesco: { id: 'vdc_c', name: 'Eduardo Pires', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 80, salary: 22000, reputation: 'História Suburbana' },
      mestreBateria: { id: 'vdc_b', name: 'Mestre Betão', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 82, salary: 22000, reputation: 'Batuque Alviverde' },
      harmonia: { id: 'vdc_h', name: 'Moacir', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 80, salary: 16000, reputation: 'Antigo de Casa' },
      mestreSalaPortaBandeira: { id: 'vdc_m', name: 'Leonardo & Daniele', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 80, salary: 18000, reputation: 'Postura' },
      interprete: { id: 'vdc_i', name: 'Flavinho Bento', role: 'interprete', roleName: 'Intérprete Oficial', rating: 81, salary: 20000, reputation: 'Voz da Linha Auxiliar' },
      coreografo: { id: 'vdc_cf', name: 'Manoel Pedro', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 79, salary: 16000, reputation: 'Ginga Tradicional' }
    },
    currentEnredo: SAMPLE_ENREDOS[4],
    rehearsalLevel: 71,
    barracaoProgress: 69,
    technicalParadeDone: false
  },
  {
    id: 'imperio_nova_iguacu',
    name: 'Império de Nova Iguaçu',
    shortName: 'Império de Nova Iguaçu',
    nickname: 'A Laranja da Baixada',
    foundationYear: 2020,
    neighborhood: 'Nova Iguaçu (Baixada)',
    colors: { primary: '#ea580c', secondary: '#16a34a', accent: '#eab308', text: '#ffffff', border: '#f97316' },
    symbol: '🍊 Laranja Mecânica & Coroa Imperial',
    division: 'bronze',
    budget: 450000,
    fanBaseMorale: 80,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    championshipsBronze: 0,
    attributes: { bateria: 82, comissaoDeFrente: 80, evolucao: 80, harmonia: 81, enredo: 81, fantasias: 79, alegorias: 79, sambaEnredo: 82, mestreSalaPortaBandeira: 80 },
    staff: {
      carnavalesco: { id: 'ini_c', name: 'Flávio Lins Jr.', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 80, salary: 22000, reputation: 'Criatividade da Baixada' },
      mestreBateria: { id: 'ini_b', name: 'Mestre Luquinhas', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 82, salary: 22000, reputation: 'Pressão da Baixada' },
      harmonia: { id: 'ini_h', name: 'Rogério Nova Iguaçu', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 80, salary: 16000, reputation: 'Comunitário' },
      mestreSalaPortaBandeira: { id: 'ini_m', name: 'Gabriel & Jéssica', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 80, salary: 18000, reputation: 'Brio' },
      interprete: { id: 'ini_i', name: 'Nando do Samba', role: 'interprete', roleName: 'Intérprete Oficial', rating: 81, salary: 20000, reputation: 'Canto Vibrante' },
      coreografo: { id: 'ini_cf', name: 'Jonas Silva', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 79, salary: 16000, reputation: 'Expressão' }
    },
    currentEnredo: SAMPLE_ENREDOS[5],
    rehearsalLevel: 71,
    barracaoProgress: 69,
    technicalParadeDone: false
  },
  {
    id: 'cabucu',
    name: 'Unidos do Cabuçu',
    shortName: 'Unidos do Cabuçu',
    nickname: 'A Tradicional Águia do Engenho Novo',
    foundationYear: 1945,
    neighborhood: 'Engenho Novo / Morro do Cabuçu',
    colors: { primary: '#1d4ed8', secondary: '#ffffff', text: '#ffffff', border: '#3b82f6' },
    symbol: '🦅 Águia Branca & Colina Sagrada',
    division: 'bronze',
    budget: 520000,
    fanBaseMorale: 85,
    championshipsEspecial: 0,
    championshipsOuro: 1,
    championshipsPrata: 2,
    championshipsBronze: 1,
    attributes: { bateria: 83, comissaoDeFrente: 81, evolucao: 81, harmonia: 82, enredo: 82, fantasias: 81, alegorias: 81, sambaEnredo: 83, mestreSalaPortaBandeira: 82 },
    staff: {
      carnavalesco: { id: 'cab_c', name: 'Lane Santana', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 82, salary: 27000, reputation: 'História Viva' },
      mestreBateria: { id: 'cab_b', name: 'Mestre Paulão do Cabuçu', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 83, salary: 26000, reputation: 'Bateria Guerreira' },
      harmonia: { id: 'cab_h', name: 'Luizinho Cabuçu', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 81, salary: 19000, reputation: 'Baluarte' },
      mestreSalaPortaBandeira: { id: 'cab_m', name: 'Yuri & Larissa Cabuçu', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 82, salary: 22000, reputation: 'Nobreza Azul' },
      interprete: { id: 'cab_i', name: 'Sandro Motta', role: 'interprete', roleName: 'Intérprete Oficial', rating: 82, salary: 24000, reputation: 'Voz Tradicional' },
      coreografo: { id: 'cab_cf', name: 'Marcos Maycon', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 80, salary: 18000, reputation: 'Cênica Clássica' }
    },
    currentEnredo: SAMPLE_ENREDOS[0],
    rehearsalLevel: 74,
    barracaoProgress: 72,
    technicalParadeDone: false
  },
  {
    id: 'novo_imperio',
    name: 'Novo Império',
    shortName: 'Novo Império',
    nickname: 'O Novo Império Carioca',
    foundationYear: 2020,
    neighborhood: 'Taquara / Jacarepaguá',
    colors: { primary: '#1e3a8a', secondary: '#f59e0b', accent: '#ffffff', text: '#ffffff', border: '#3b82f6' },
    symbol: '👑 Coroa Alada Imperial & Estrelas',
    division: 'bronze',
    budget: 440000,
    fanBaseMorale: 78,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    championshipsBronze: 0,
    attributes: { bateria: 81, comissaoDeFrente: 80, evolucao: 80, harmonia: 80, enredo: 81, fantasias: 79, alegorias: 78, sambaEnredo: 82, mestreSalaPortaBandeira: 80 },
    staff: {
      carnavalesco: { id: 'ni_c', name: 'Elvis Luiz', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 80, salary: 22000, reputation: 'Jovem Talento' },
      mestreBateria: { id: 'ni_b', name: 'Mestre Vinicius', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 81, salary: 22000, reputation: 'Swing Novo' },
      harmonia: { id: 'ni_h', name: 'Carlos Taquara', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 79, salary: 16000, reputation: 'Dedicação' },
      mestreSalaPortaBandeira: { id: 'ni_m', name: 'Renan & Camila', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 80, salary: 18000, reputation: 'Sintonia' },
      interprete: { id: 'ni_i', name: 'Lucas Donato', role: 'interprete', roleName: 'Intérprete Oficial', rating: 81, salary: 20000, reputation: 'Canto Firme' },
      coreografo: { id: 'ni_cf', name: 'Vanessa Lima', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 79, salary: 16000, reputation: 'Expressão Corporal' }
    },
    currentEnredo: SAMPLE_ENREDOS[1],
    rehearsalLevel: 70,
    barracaoProgress: 68,
    technicalParadeDone: false
  },
  {
    id: 'praca_da_bandeira',
    name: 'Independente da Praça da Bandeira',
    shortName: 'Praça da Bandeira',
    nickname: 'A Tricolor da Praça',
    foundationYear: 2002,
    neighborhood: 'Praça da Bandeira',
    colors: { primary: '#0284c7', secondary: '#16a34a', accent: '#ffffff', text: '#ffffff', border: '#38bdf8' },
    symbol: '🚩 Pavilhão Tricolor & Tamborim',
    division: 'bronze',
    budget: 450000,
    fanBaseMorale: 79,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    championshipsBronze: 0,
    attributes: { bateria: 82, comissaoDeFrente: 80, evolucao: 80, harmonia: 81, enredo: 81, fantasias: 79, alegorias: 78, sambaEnredo: 82, mestreSalaPortaBandeira: 80 },
    staff: {
      carnavalesco: { id: 'pb_c', name: 'Ricardo Hessez Jr.', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 80, salary: 22000, reputation: 'Arte da Zona Norte' },
      mestreBateria: { id: 'pb_b', name: 'Mestre Neném', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 82, salary: 22000, reputation: 'Batuque Tricolor' },
      harmonia: { id: 'pb_h', name: 'Marcão Bandeira', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 80, salary: 16000, reputation: 'Fidelidade' },
      mestreSalaPortaBandeira: { id: 'pb_m', name: 'Thiago & Taís', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 80, salary: 18000, reputation: 'Garbo' },
      interprete: { id: 'pb_i', name: 'Cidinho', role: 'interprete', roleName: 'Intérprete Oficial', rating: 81, salary: 20000, reputation: 'Voz da Praça' },
      coreografo: { id: 'pb_cf', name: 'Luciana Neves', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 79, salary: 16000, reputation: 'Teatro Urbano' }
    },
    currentEnredo: SAMPLE_ENREDOS[2],
    rehearsalLevel: 71,
    barracaoProgress: 69,
    technicalParadeDone: false
  },
  {
    id: 'casa_de_malandro',
    name: 'Casa de Malandro',
    shortName: 'Casa de Malandro',
    nickname: 'A Malandragem Sagrada da Lapa',
    foundationYear: 2022,
    neighborhood: 'Lapa / Centro',
    colors: { primary: '#b91c1c', secondary: '#ffffff', text: '#ffffff', border: '#ef4444' },
    symbol: '🎩 Chapéu Panamá, Cravo e Navalha',
    division: 'bronze',
    budget: 480000,
    fanBaseMorale: 84,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    championshipsBronze: 0,
    attributes: { bateria: 83, comissaoDeFrente: 82, evolucao: 81, harmonia: 82, enredo: 83, fantasias: 80, alegorias: 80, sambaEnredo: 84, mestreSalaPortaBandeira: 81 },
    staff: {
      carnavalesco: { id: 'cdm_c', name: 'Luiz Fernando', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 81, salary: 25000, reputation: 'Poeta da Boemia' },
      mestreBateria: { id: 'cdm_b', name: 'Mestre Juninho Lapa', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 83, salary: 24000, reputation: 'Batida Boêmia' },
      harmonia: { id: 'cdm_h', name: 'Carlinhos Malandro', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 81, salary: 18000, reputation: 'Ginga de Malandro' },
      mestreSalaPortaBandeira: { id: 'cdm_m', name: 'Jonas & Bianca', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 81, salary: 20000, reputation: 'Passo Firme' },
      interprete: { id: 'cdm_i', name: 'Serginho do Porto Jr.', role: 'interprete', roleName: 'Intérprete Oficial', rating: 82, salary: 22000, reputation: 'Gogó Forte' },
      coreografo: { id: 'cdm_cf', name: 'Denise Ramos', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 81, salary: 18000, reputation: 'Coreografia de Salão' }
    },
    currentEnredo: SAMPLE_ENREDOS[3],
    rehearsalLevel: 73,
    barracaoProgress: 71,
    technicalParadeDone: false
  },
  {
    id: 'coroado_jacarepagua',
    name: 'Coroado de Jacarepaguá',
    shortName: 'Coroado de Jacarepaguá',
    nickname: 'O Cacique de Jacarepaguá',
    foundationYear: 1969,
    neighborhood: 'Jacarepaguá / Cidade de Deus',
    colors: { primary: '#15803d', secondary: '#dc2626', accent: '#ffffff', text: '#ffffff', border: '#22c55e' },
    symbol: '🏹 Cocar Indígena Imperial & Pandeiro',
    division: 'bronze',
    budget: 460000,
    fanBaseMorale: 81,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    championshipsBronze: 0,
    attributes: { bateria: 82, comissaoDeFrente: 80, evolucao: 80, harmonia: 81, enredo: 81, fantasias: 79, alegorias: 79, sambaEnredo: 82, mestreSalaPortaBandeira: 81 },
    staff: {
      carnavalesco: { id: 'cdj_c', name: 'André Cabral', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 80, salary: 23000, reputation: 'Tradição do Sertão Carioca' },
      mestreBateria: { id: 'cdj_b', name: 'Mestre Paulinho da Mina', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 82, salary: 23000, reputation: 'Batuque Ancestral' },
      harmonia: { id: 'cdj_h', name: 'Zé Carlos Coroado', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 80, salary: 17000, reputation: 'Comunitário' },
      mestreSalaPortaBandeira: { id: 'cdj_m', name: 'Pedro & Sabrina', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 81, salary: 20000, reputation: 'Leveza' },
      interprete: { id: 'cdj_i', name: 'Edu Chagas Jr.', role: 'interprete', roleName: 'Intérprete Oficial', rating: 81, salary: 21000, reputation: 'Canto Apaixonado' },
      coreografo: { id: 'cdj_cf', name: 'Ana Flávia', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 80, salary: 17000, reputation: 'Dança Guerreira' }
    },
    currentEnredo: SAMPLE_ENREDOS[4],
    rehearsalLevel: 72,
    barracaoProgress: 70,
    technicalParadeDone: false
  },
  {
    id: 'imperadores_rubro_negros',
    name: 'Imperadores Rubro-Negros',
    shortName: 'Imperadores R.N.',
    nickname: 'O Urubu Rei da Folia',
    foundationYear: 2018,
    neighborhood: 'Flamengo / Gávea',
    colors: { primary: '#b91c1c', secondary: '#18181b', accent: '#f59e0b', text: '#ffffff', border: '#ef4444' },
    symbol: '🦅 Urubu Coroado Imperial & Cetro',
    division: 'bronze',
    budget: 500000,
    fanBaseMorale: 86,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    championshipsBronze: 0,
    attributes: { bateria: 83, comissaoDeFrente: 82, evolucao: 81, harmonia: 82, enredo: 82, fantasias: 81, alegorias: 80, sambaEnredo: 84, mestreSalaPortaBandeira: 82 },
    staff: {
      carnavalesco: { id: 'irn_c', name: 'Wallace Oliveira', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 82, salary: 26000, reputation: 'Paixão Popular' },
      mestreBateria: { id: 'irn_b', name: 'Mestre Vitão', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 84, salary: 25000, reputation: 'Explosão Rubro-Negra' },
      harmonia: { id: 'irn_h', name: 'Rodrigo Gávea', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 81, salary: 19000, reputation: 'Garra de Torcida' },
      mestreSalaPortaBandeira: { id: 'irn_m', name: 'Fábio & Nathália', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 82, salary: 21000, reputation: 'Postura Imponente' },
      interprete: { id: 'irn_i', name: 'Tem-Tem da Gávea', role: 'interprete', roleName: 'Intérprete Oficial', rating: 83, salary: 23000, reputation: 'Voz Incendiária' },
      coreografo: { id: 'irn_cf', name: 'Rafael Gomes', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 81, salary: 18000, reputation: 'Teatro de Bravura' }
    },
    currentEnredo: SAMPLE_ENREDOS[5],
    rehearsalLevel: 74,
    barracaoProgress: 72,
    technicalParadeDone: false
  },
  {
    id: 'academicos_do_dende',
    name: 'Acadêmicos do Dendê',
    shortName: 'Acad. do Dendê',
    nickname: 'A Estrela Azul do Morro do Dendê',
    foundationYear: 1965,
    neighborhood: 'Morro do Dendê, Ilha do Governador',
    colors: { primary: '#2563eb', secondary: '#ffffff', text: '#ffffff', border: '#3b82f6' },
    symbol: '🌴 Coqueiro Dourado & Berimbau Sagrado',
    division: 'bronze',
    budget: 470000,
    fanBaseMorale: 82,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    championshipsBronze: 0,
    attributes: { bateria: 83, comissaoDeFrente: 80, evolucao: 81, harmonia: 81, enredo: 81, fantasias: 80, alegorias: 79, sambaEnredo: 83, mestreSalaPortaBandeira: 81 },
    staff: {
      carnavalesco: { id: 'den_c', name: 'Severo Luzardo Jr.', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 81, salary: 24000, reputation: 'Tradição Insulana' },
      mestreBateria: { id: 'den_b', name: 'Mestre Sagui', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 83, salary: 23000, reputation: 'Batuque do Dendê' },
      harmonia: { id: 'den_h', name: 'Bebeto da Ilha', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 80, salary: 17000, reputation: 'Comunidade Apaixonada' },
      mestreSalaPortaBandeira: { id: 'den_m', name: 'Wellington & Camila', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 81, salary: 20000, reputation: 'Ginga e Beleza' },
      interprete: { id: 'den_i', name: 'Cadinho do Dendê', role: 'interprete', roleName: 'Intérprete Oficial', rating: 82, salary: 22000, reputation: 'Timbre Guerreiro' },
      coreografo: { id: 'den_cf', name: 'Roberta Moura', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 79, salary: 16000, reputation: 'Dança Afro-Carioca' }
    },
    currentEnredo: SAMPLE_ENREDOS[0],
    rehearsalLevel: 72,
    barracaoProgress: 70,
    technicalParadeDone: false
  },
  {
    id: 'siri_de_ramos',
    name: 'Siri de Ramos',
    shortName: 'Siri de Ramos',
    nickname: 'O Crustáceo Sambista da Leopoldina',
    foundationYear: 2019,
    neighborhood: 'Ramos / Olaria',
    colors: { primary: '#dc2626', secondary: '#ffffff', accent: '#eab308', text: '#ffffff', border: '#ef4444' },
    symbol: '🦀 Siri Sambista de Cartola e Pandeiro',
    division: 'bronze',
    budget: 440000,
    fanBaseMorale: 78,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    championshipsBronze: 0,
    attributes: { bateria: 81, comissaoDeFrente: 79, evolucao: 80, harmonia: 80, enredo: 80, fantasias: 78, alegorias: 78, sambaEnredo: 81, mestreSalaPortaBandeira: 80 },
    staff: {
      carnavalesco: { id: 'sdr_c', name: 'Marcos Salles', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 79, salary: 21000, reputation: 'Humor e Samba' },
      mestreBateria: { id: 'sdr_b', name: 'Mestre Denis', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 81, salary: 21000, reputation: 'Batida Leve' },
      harmonia: { id: 'sdr_h', name: 'Sandro Ramos', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 79, salary: 15000, reputation: 'Espírito Comunitário' },
      mestreSalaPortaBandeira: { id: 'sdr_m', name: 'Bruno & Renata', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 80, salary: 18000, reputation: 'Juventude' },
      interprete: { id: 'sdr_i', name: 'Paulinho de Ramos', role: 'interprete', roleName: 'Intérprete Oficial', rating: 80, salary: 19000, reputation: 'Alegria' },
      coreografo: { id: 'sdr_cf', name: 'Aline Vieira', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 78, salary: 15000, reputation: 'Dança Descontraída' }
    },
    currentEnredo: SAMPLE_ENREDOS[1],
    rehearsalLevel: 70,
    barracaoProgress: 68,
    technicalParadeDone: false
  },
  {
    id: 'vizinha_faladeira',
    name: 'Vizinha Faladeira',
    shortName: 'Vizinha Faladeira',
    nickname: 'A Pioneira da Saúde e Santo Cristo',
    foundationYear: 1932,
    neighborhood: 'Santo Cristo / Gamboa',
    colors: { primary: '#dc2626', secondary: '#ffffff', text: '#ffffff', border: '#ef4444' },
    symbol: '🗣️ Duas Mulheres Falando & Pandeiro Imperial',
    division: 'bronze',
    budget: 520000,
    fanBaseMorale: 87,
    championshipsEspecial: 1,
    championshipsOuro: 1,
    championshipsPrata: 2,
    championshipsBronze: 0,
    attributes: { bateria: 84, comissaoDeFrente: 82, evolucao: 82, harmonia: 83, enredo: 83, fantasias: 81, alegorias: 81, sambaEnredo: 84, mestreSalaPortaBandeira: 82 },
    staff: {
      carnavalesco: { id: 'viz_c', name: 'Jean Rodrigues', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 82, salary: 28000, reputation: 'Pioneirismo Carioca' },
      mestreBateria: { id: 'viz_b', name: 'Mestre Jorginho', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 84, salary: 26000, reputation: 'Bateria da Pioneira' },
      harmonia: { id: 'viz_h', name: 'Beto Vizinha', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 82, salary: 20000, reputation: 'Tradição Centenária' },
      mestreSalaPortaBandeira: { id: 'viz_m', name: 'Danilo & Viviane Faladeira', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 82, salary: 23000, reputation: 'Nobreza Vermelha' },
      interprete: { id: 'viz_i', name: 'Enzo Belmonte', role: 'interprete', roleName: 'Intérprete Oficial', rating: 83, salary: 24000, reputation: 'Voz da Pequena África' },
      coreografo: { id: 'viz_cf', name: 'Carlos Augusto', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 81, salary: 19000, reputation: 'Encenação Histórica' }
    },
    currentEnredo: SAMPLE_ENREDOS[2],
    rehearsalLevel: 75,
    barracaoProgress: 73,
    technicalParadeDone: false
  },
  {
    id: 'academicos_do_recreio',
    name: 'Acadêmicos do Recreio',
    shortName: 'Acad. do Recreio',
    nickname: 'A Princesa do Pontal',
    foundationYear: 2020,
    neighborhood: 'Recreio dos Bandeirantes',
    colors: { primary: '#0ea5e9', secondary: '#10b981', accent: '#ffffff', text: '#ffffff', border: '#38bdf8' },
    symbol: '🌊 Ondas do Pontal e Sol Dourado',
    division: 'bronze',
    budget: 440000,
    fanBaseMorale: 78,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    championshipsBronze: 0,
    attributes: { bateria: 81, comissaoDeFrente: 79, evolucao: 80, harmonia: 80, enredo: 80, fantasias: 78, alegorias: 78, sambaEnredo: 81, mestreSalaPortaBandeira: 80 },
    staff: {
      carnavalesco: { id: 'rec_c', name: 'Fábio Fabato Jr.', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 79, salary: 21000, reputation: 'Jovem e Audacioso' },
      mestreBateria: { id: 'rec_b', name: 'Mestre Anderson', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 81, salary: 21000, reputation: 'Ritmo Forte' },
      harmonia: { id: 'rec_h', name: 'Róbson Recreio', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 79, salary: 15000, reputation: 'Organizado' },
      mestreSalaPortaBandeira: { id: 'rec_m', name: 'Renato & Bianca', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 80, salary: 18000, reputation: 'Leveza Litorânea' },
      interprete: { id: 'rec_i', name: 'Marquinho Ramos', role: 'interprete', roleName: 'Intérprete Oficial', rating: 80, salary: 19000, reputation: 'Empolgação' },
      coreografo: { id: 'rec_cf', name: 'Gisele Santos', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 78, salary: 15000, reputation: 'Dança Praiana' }
    },
    currentEnredo: SAMPLE_ENREDOS[3],
    rehearsalLevel: 70,
    barracaoProgress: 68,
    technicalParadeDone: false
  },
  {
    id: 'leao_de_nova_iguacu',
    name: 'Leão de Nova Iguaçu',
    shortName: 'Leão de Nova Iguaçu',
    nickname: 'O Rugido Vermelho da Baixada',
    foundationYear: 1980,
    neighborhood: 'Nova Iguaçu (Baixada)',
    colors: { primary: '#b91c1c', secondary: '#ffffff', text: '#ffffff', border: '#ef4444' },
    symbol: '🦁 Leão Vermelho Coroado & Pandeiro',
    division: 'bronze',
    budget: 510000,
    fanBaseMorale: 86,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 1,
    championshipsBronze: 0,
    attributes: { bateria: 83, comissaoDeFrente: 81, evolucao: 81, harmonia: 82, enredo: 83, fantasias: 81, alegorias: 80, sambaEnredo: 84, mestreSalaPortaBandeira: 82 },
    staff: {
      carnavalesco: { id: 'lni_c', name: 'Cid Carvalho Jr.', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 82, salary: 27000, reputation: 'Histórico da Sapucaí' },
      mestreBateria: { id: 'lni_b', name: 'Mestre Betão do Leão', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 83, salary: 25000, reputation: 'Rugido Feroz' },
      harmonia: { id: 'lni_h', name: 'Cláudio Nova Iguaçu', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 81, salary: 19000, reputation: 'Garra da Baixada' },
      mestreSalaPortaBandeira: { id: 'lni_m', name: 'Thiago & Mayara Leão', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 82, salary: 22000, reputation: 'Elegância e Brio' },
      interprete: { id: 'lni_i', name: 'Beto da Vila Jr.', role: 'interprete', roleName: 'Intérprete Oficial', rating: 82, salary: 23000, reputation: 'Voz da Baixada' },
      coreografo: { id: 'lni_cf', name: 'Juliana Costa', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 80, salary: 18000, reputation: 'Teatro de Impacto' }
    },
    currentEnredo: SAMPLE_ENREDOS[4],
    rehearsalLevel: 74,
    barracaoProgress: 72,
    technicalParadeDone: false
  },
  {
    id: 'alegria_de_copacabana',
    name: 'Alegria de Copacabana',
    shortName: 'Alegria de Copacabana',
    nickname: 'A Joia Vermelha de Copacabana',
    foundationYear: 2019,
    neighborhood: 'Copacabana / Pavão-Pavãozinho',
    colors: { primary: '#e11d48', secondary: '#ffffff', text: '#ffffff', border: '#f43f5e' },
    symbol: '🏖️ Calçadão Carioca & Trompete Dourado',
    division: 'bronze',
    budget: 450000,
    fanBaseMorale: 80,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    championshipsBronze: 0,
    attributes: { bateria: 82, comissaoDeFrente: 80, evolucao: 80, harmonia: 81, enredo: 81, fantasias: 79, alegorias: 78, sambaEnredo: 82, mestreSalaPortaBandeira: 80 },
    staff: {
      carnavalesco: { id: 'alc_c', name: 'Clóvis Pê Jr.', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 80, salary: 23000, reputation: 'Cores do Litoral' },
      mestreBateria: { id: 'alc_b', name: 'Mestre Sorriso', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 82, salary: 22000, reputation: 'Swingueira da Praia' },
      harmonia: { id: 'alc_h', name: 'Júnior Copacabana', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 80, salary: 16000, reputation: 'Organizado' },
      mestreSalaPortaBandeira: { id: 'alc_m', name: 'Lucas & Evelyn Copa', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 80, salary: 18000, reputation: 'Charme' },
      interprete: { id: 'alc_i', name: 'Bico Doce Jr.', role: 'interprete', roleName: 'Intérprete Oficial', rating: 81, salary: 20000, reputation: 'Canto Sentido' },
      coreografo: { id: 'alc_cf', name: 'Felipe Ribeiro', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 79, salary: 16000, reputation: 'Cênica de Rua' }
    },
    currentEnredo: SAMPLE_ENREDOS[5],
    rehearsalLevel: 71,
    barracaoProgress: 69,
    technicalParadeDone: false
  },
  {
    id: 'uniao_de_jacarepagua',
    name: 'União de Jacarepaguá',
    shortName: 'União de Jacarepaguá',
    nickname: 'A Tradicional Verde e Branco de Campinho',
    foundationYear: 1956,
    neighborhood: 'Campinho / Jacarepaguá',
    colors: { primary: '#15803d', secondary: '#ffffff', text: '#ffffff', border: '#22c55e' },
    symbol: '🦅 Águia Altaneira & Ramos Verdes',
    division: 'bronze',
    budget: 530000,
    fanBaseMorale: 87,
    championshipsEspecial: 0,
    championshipsOuro: 1,
    championshipsPrata: 1,
    championshipsBronze: 0,
    attributes: { bateria: 84, comissaoDeFrente: 82, evolucao: 82, harmonia: 83, enredo: 83, fantasias: 82, alegorias: 81, sambaEnredo: 85, mestreSalaPortaBandeira: 83 },
    staff: {
      carnavalesco: { id: 'udj_c', name: 'Rodrigo Pacheco Jr.', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 83, salary: 29000, reputation: 'Tradição Sexagenária' },
      mestreBateria: { id: 'udj_b', name: 'Mestre Marquinhos União', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 84, salary: 27000, reputation: 'Cadência Histórica' },
      harmonia: { id: 'udj_h', name: 'Vagner Jacarepaguá', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 82, salary: 20000, reputation: 'Guerreira de Campinho' },
      mestreSalaPortaBandeira: { id: 'udj_m', name: 'Luís & Mariana Jacarepaguá', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 83, salary: 23000, reputation: 'Nobreza Verde e Branca' },
      interprete: { id: 'udj_i', name: 'Tuninho Jr. União', role: 'interprete', roleName: 'Intérprete Oficial', rating: 84, salary: 25000, reputation: 'Voz da Tradição' },
      coreografo: { id: 'udj_cf', name: 'Tony Tara Jr.', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 82, salary: 20000, reputation: 'Expressão Ancestral' }
    },
    currentEnredo: SAMPLE_ENREDOS[0],
    rehearsalLevel: 75,
    barracaoProgress: 73,
    technicalParadeDone: false
  },
  {
    id: 'caprichosos_de_pilares',
    name: 'Caprichosos de Pilares',
    shortName: 'Caprichosos de Pilares',
    nickname: 'A Cobra Coral de Pilares',
    foundationYear: 1949,
    neighborhood: 'Pilares',
    colors: { primary: '#1e40af', secondary: '#ffffff', text: '#ffffff', border: '#3b82f6' },
    symbol: '🐍 Cobra Coral Coroada & Pandeiro',
    division: 'bronze',
    budget: 560000,
    fanBaseMorale: 90,
    championshipsEspecial: 0,
    championshipsOuro: 2,
    championshipsPrata: 1,
    championshipsBronze: 0,
    attributes: { bateria: 85, comissaoDeFrente: 84, evolucao: 83, harmonia: 84, enredo: 85, fantasias: 83, alegorias: 82, sambaEnredo: 86, mestreSalaPortaBandeira: 84 },
    staff: {
      carnavalesco: { id: 'cap_c', name: 'Fran Sérgio Jr.', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 84, salary: 32000, reputation: 'Sátira & Irreverência' },
      mestreBateria: { id: 'cap_b', name: 'Mestre Américo', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 85, salary: 30000, reputation: 'Bateria Venenosa de Pilares' },
      harmonia: { id: 'cap_h', name: 'Jorginho Pilares', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 83, salary: 22000, reputation: 'Garra Caprichosa' },
      mestreSalaPortaBandeira: { id: 'cap_m', name: 'Yago & Amanda Caprichosos', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 84, salary: 26000, reputation: 'Tradição e Realeza' },
      interprete: { id: 'cap_i', name: 'Carlinhos de Pilares', role: 'interprete', roleName: 'Intérprete Oficial', rating: 85, salary: 28000, reputation: 'Voz Histórica' },
      coreografo: { id: 'cap_cf', name: 'Marcio Moura Jr.', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 83, salary: 22000, reputation: 'Teatro Irreverente' }
    },
    currentEnredo: SAMPLE_ENREDOS[1],
    rehearsalLevel: 76,
    barracaoProgress: 75,
    technicalParadeDone: false
  },
  {
    id: 'dificil_e_o_nome',
    name: 'Difícil é o Nome',
    shortName: 'Difícil é o Nome',
    nickname: 'A Guerreira Vermelha de Pilares',
    foundationYear: 1973,
    neighborhood: 'Pilares',
    colors: { primary: '#b91c1c', secondary: '#ffffff', text: '#ffffff', border: '#ef4444' },
    symbol: '🥁 Pandeiro Vermelho & Pergaminho',
    division: 'bronze',
    budget: 470000,
    fanBaseMorale: 81,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    championshipsBronze: 1,
    attributes: { bateria: 82, comissaoDeFrente: 80, evolucao: 81, harmonia: 81, enredo: 81, fantasias: 79, alegorias: 79, sambaEnredo: 82, mestreSalaPortaBandeira: 80 },
    staff: {
      carnavalesco: { id: 'dif_c', name: 'Sidney Rocha', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 80, salary: 23000, reputation: 'Tradição Vermelha' },
      mestreBateria: { id: 'dif_b', name: 'Mestre Paulão', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 82, salary: 23000, reputation: 'Swing de Pilares' },
      harmonia: { id: 'dif_h', name: 'Nilson', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 80, salary: 17000, reputation: 'Garra Histórica' },
      mestreSalaPortaBandeira: { id: 'dif_m', name: 'Caio & Patrícia', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 80, salary: 19000, reputation: 'Firmeza' },
      interprete: { id: 'dif_i', name: 'Gérson Silva', role: 'interprete', roleName: 'Intérprete Oficial', rating: 81, salary: 21000, reputation: 'Voz Marcante' },
      coreografo: { id: 'dif_cf', name: 'Cléber Ferreira', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 79, salary: 16000, reputation: 'Teatro da Comunidade' }
    },
    currentEnredo: SAMPLE_ENREDOS[2],
    rehearsalLevel: 72,
    barracaoProgress: 70,
    technicalParadeDone: false
  },
  {
    id: 'academicos_de_madureira',
    name: 'Acadêmicos de Madureira',
    shortName: 'Acad. de Madureira',
    nickname: 'O Berço Suburbano do Viaduto',
    foundationYear: 2013,
    neighborhood: 'Madureira',
    colors: { primary: '#7e22ce', secondary: '#16a34a', accent: '#f59e0b', text: '#ffffff', border: '#a855f7' },
    symbol: '🎷 Saxofone & Coroa do Viaduto de Madureira',
    division: 'bronze',
    budget: 460000,
    fanBaseMorale: 81,
    championshipsEspecial: 0,
    championshipsOuro: 0,
    championshipsPrata: 0,
    championshipsBronze: 0,
    attributes: { bateria: 82, comissaoDeFrente: 80, evolucao: 80, harmonia: 81, enredo: 82, fantasias: 79, alegorias: 79, sambaEnredo: 83, mestreSalaPortaBandeira: 81 },
    staff: {
      carnavalesco: { id: 'mad_c', name: 'Alexandre Costa Jr.', role: 'carnavalesco', roleName: 'Carnavalesco', rating: 80, salary: 23000, reputation: 'Cultura do Viaduto' },
      mestreBateria: { id: 'mad_b', name: 'Mestre Lolo de Madureira', role: 'mestreBateria', roleName: 'Mestre de Bateria', rating: 82, salary: 23000, reputation: 'Ritmo Suburbano' },
      harmonia: { id: 'mad_h', name: 'Ney Madureira', role: 'harmonia', roleName: 'Diretor de Harmonia', rating: 80, salary: 17000, reputation: 'Raça Carioca' },
      mestreSalaPortaBandeira: { id: 'mad_m', name: 'Lucas & Thais Madureira', role: 'mestreSalaPortaBandeira', roleName: '1º Casal MS e PB', rating: 81, salary: 20000, reputation: 'Charme e Balanço' },
      interprete: { id: 'mad_i', name: 'Danilo de Madureira', role: 'interprete', roleName: 'Intérprete Oficial', rating: 82, salary: 22000, reputation: 'Canto Forte' },
      coreografo: { id: 'mad_cf', name: 'Handerson Big Jr.', role: 'coreografo', roleName: 'Coreógrafo Comissão', rating: 80, salary: 17000, reputation: 'Dança Charme e Samba' }
    },
    currentEnredo: SAMPLE_ENREDOS[3],
    rehearsalLevel: 71,
    barracaoProgress: 69,
    technicalParadeDone: false
  }
];

export const RESULTS_2026: Record<string, InGameAchievement> = {
  // Grupo Especial 2026 (escala de 270.0 com menor nota descartada)
  viradouro: { year: 2026, division: 'especial', placement: 1, titleName: 'Campeã do Grupo Especial 2026', badgeType: 'champion_especial', totalScore: 270.0 },
  imperatriz: { year: 2026, division: 'especial', placement: 2, titleName: 'Vice-Campeã do Grupo Especial 2026', badgeType: 'vice_especial', totalScore: 269.8 },
  grande_rio: { year: 2026, division: 'especial', placement: 3, titleName: '3º Lugar - Desfile das Campeãs (G6) 2026', badgeType: 'g6', totalScore: 269.7 },
  salgueiro: { year: 2026, division: 'especial', placement: 4, titleName: '4º Lugar - Desfile das Campeãs (G6) 2026', badgeType: 'g6', totalScore: 269.5 },
  portela: { year: 2026, division: 'especial', placement: 5, titleName: '5º Lugar - Desfile das Campeãs (G6) 2026', badgeType: 'g6', totalScore: 269.4 },
  mangueira: { year: 2026, division: 'especial', placement: 6, titleName: '6º Lugar - Desfile das Campeãs (G6) 2026', badgeType: 'g6', totalScore: 269.2 },
  beija_flor: { year: 2026, division: 'especial', placement: 7, titleName: '7º Lugar no Grupo Especial 2026', badgeType: 'regular', totalScore: 269.0 },
  vila_isabel: { year: 2026, division: 'especial', placement: 8, titleName: '8º Lugar no Grupo Especial 2026', badgeType: 'regular', totalScore: 268.9 },
  tijuca: { year: 2026, division: 'especial', placement: 9, titleName: '9º Lugar no Grupo Especial 2026', badgeType: 'regular', totalScore: 268.7 },
  tuiuti: { year: 2026, division: 'especial', placement: 10, titleName: '10º Lugar no Grupo Especial 2026', badgeType: 'regular', totalScore: 268.5 },
  mocidade: { year: 2026, division: 'especial', placement: 11, titleName: '11º Lugar no Grupo Especial 2026', badgeType: 'regular', totalScore: 268.3 },
  niteroi: { year: 2026, division: 'especial', placement: 12, titleName: '12º Lugar - Rebaixada para a Série Ouro (2026)', badgeType: 'relegated', totalScore: 267.6 },

  // Série Ouro 2026 (Sem rebaixamento em 2026)
  marica: { year: 2026, division: 'ouro', placement: 1, titleName: 'Campeã da Série Ouro & Acesso ao Especial 2026', badgeType: 'champion_ouro', totalScore: 269.9 },
  imperio_serrano: { year: 2026, division: 'ouro', placement: 2, titleName: 'Vice-Campeã da Série Ouro 2026', badgeType: 'vice_ouro', totalScore: 269.8 },
  unidos_padre_miguel: { year: 2026, division: 'ouro', placement: 3, titleName: '3º Lugar na Série Ouro 2026', badgeType: 'regular', totalScore: 269.7 },
  estacio_de_sa: { year: 2026, division: 'ouro', placement: 4, titleName: '4º Lugar na Série Ouro 2026', badgeType: 'regular', totalScore: 269.5 },
  uniao_da_ilha: { year: 2026, division: 'ouro', placement: 5, titleName: '5º Lugar na Série Ouro 2026', badgeType: 'regular', totalScore: 269.4 },
  inocentes: { year: 2026, division: 'ouro', placement: 6, titleName: '6º Lugar na Série Ouro 2026', badgeType: 'regular', totalScore: 269.2 },
  botafogo_samba_clube: { year: 2026, division: 'ouro', placement: 7, titleName: '7º Lugar na Série Ouro 2026', badgeType: 'regular', totalScore: 269.0 },
  unidos_de_bangu: { year: 2026, division: 'ouro', placement: 8, titleName: '8º Lugar na Série Ouro 2026', badgeType: 'regular', totalScore: 268.8 },
  em_cima_da_hora: { year: 2026, division: 'ouro', placement: 9, titleName: '9º Lugar na Série Ouro 2026', badgeType: 'regular', totalScore: 268.7 },
  unidos_da_ponte: { year: 2026, division: 'ouro', placement: 10, titleName: '10º Lugar na Série Ouro 2026', badgeType: 'regular', totalScore: 268.5 },
  arranco: { year: 2026, division: 'ouro', placement: 11, titleName: '11º Lugar na Série Ouro 2026', badgeType: 'regular', totalScore: 268.4 },
  vigario_geral: { year: 2026, division: 'ouro', placement: 12, titleName: '12º Lugar na Série Ouro 2026', badgeType: 'regular', totalScore: 268.2 },
  parque_acari: { year: 2026, division: 'ouro', placement: 13, titleName: '13º Lugar na Série Ouro 2026', badgeType: 'regular', totalScore: 268.0 },
  jacarezinho: { year: 2026, division: 'ouro', placement: 14, titleName: '14º Lugar na Série Ouro 2026', badgeType: 'regular', totalScore: 267.8 },
  porto_da_pedra: { year: 2026, division: 'ouro', placement: 15, titleName: '15º Lugar na Série Ouro 2026', badgeType: 'regular', totalScore: 267.6 },

  // Série Prata 2026
  santa_cruz: { year: 2026, division: 'prata', placement: 1, titleName: 'Campeã da Série Prata & Promovida para a Série Ouro (2026)', badgeType: 'champion_prata', totalScore: 269.9 },
  sao_clemente: { year: 2026, division: 'prata', placement: 2, titleName: 'Vice-Campeã da Série Prata & Promovida para a Série Ouro (2026)', badgeType: 'vice_prata', totalScore: 269.8 },

  // Série Bronze 2026
  sereno_campo_grande: { year: 2026, division: 'bronze', placement: 1, titleName: 'Campeã da Série Bronze & Promovida para a Série Prata (2026)', badgeType: 'champion_bronze', totalScore: 269.7 },
  leao_zona_oeste: { year: 2026, division: 'bronze', placement: 2, titleName: 'Vice-Campeã da Série Bronze & Promovida para a Série Prata (2026)', badgeType: 'vice_bronze', totalScore: 269.6 },

  // Grupo de Avaliação 2026
  casa_de_malandro: { year: 2026, division: 'avaliacao', placement: 1, titleName: 'Campeã do Grupo de Avaliação & Promovida para a Série Bronze (2026)', badgeType: 'champion_avaliacao', totalScore: 269.0 }
};

/**
 * Calculates consolidated school stats by summing historical records (up to 2026)
 * together with in-game achievements from Carnaval 2027 onwards.
 */
export function getSchoolConsolidatedStats(school: School): ConsolidatedSchoolStats {
  const allAchievements = school.honors?.inGameAchievements || [];
  // In-game conquests start strictly from Carnaval 2027 onwards
  const inGameAchievements = allAchievements.filter((a) => a.year >= 2027);

  const inGameEspecialTitles = inGameAchievements.filter((a) => a.badgeType === 'champion_especial');
  const inGameEspecialVices = inGameAchievements.filter((a) => a.badgeType === 'vice_especial');
  const inGameOuroTitles = inGameAchievements.filter((a) => a.badgeType === 'champion_ouro');
  const inGameOuroVices = inGameAchievements.filter((a) => a.badgeType === 'vice_ouro');
  const inGamePrataTitles = inGameAchievements.filter((a) => a.badgeType === 'champion_prata');
  const inGamePrataVices = inGameAchievements.filter((a) => a.badgeType === 'vice_prata');
  const inGameBronzeTitles = inGameAchievements.filter((a) => a.badgeType === 'champion_bronze');
  const inGameBronzeVices = inGameAchievements.filter((a) => a.badgeType === 'vice_bronze');
  const inGameAvaliacaoTitles = inGameAchievements.filter((a) => a.badgeType === 'champion_avaliacao');
  const inGameAvaliacaoVices = inGameAchievements.filter((a) => a.badgeType === 'vice_avaliacao');

  const ancientEspecialTitles = school.honors?.historicalEspecialTitles ?? 0;
  const ancientEspecialVices = school.honors?.historicalEspecialRunnerUps ?? 0;
  const ancientOuroTitles = school.honors?.historicalOuroTitles ?? 0;
  const ancientOuroVices = school.honors?.historicalOuroRunnerUps ?? 0;
  const ancientPrataTitles = school.honors?.historicalPrataTitles ?? 0;
  const ancientPrataVices = school.honors?.historicalPrataRunnerUps ?? 0;
  const ancientBronzeTitles = school.honors?.historicalBronzeTitles ?? 0;
  const ancientBronzeVices = school.honors?.historicalBronzeRunnerUps ?? 0;
  const ancientAvaliacaoTitles = school.honors?.historicalAvaliacaoTitles ?? 0;
  const ancientAvaliacaoVices = school.honors?.historicalAvaliacaoRunnerUps ?? 0;

  const totalEspecialTitles = ancientEspecialTitles + inGameEspecialTitles.length;
  const totalEspecialVices = ancientEspecialVices + inGameEspecialVices.length;
  const totalOuroTitles = ancientOuroTitles + inGameOuroTitles.length;
  const totalOuroVices = ancientOuroVices + inGameOuroVices.length;
  const totalPrataTitles = ancientPrataTitles + inGamePrataTitles.length;
  const totalPrataVices = ancientPrataVices + inGamePrataVices.length;
  const totalBronzeTitles = ancientBronzeTitles + inGameBronzeTitles.length;
  const totalBronzeVices = ancientBronzeVices + inGameBronzeVices.length;
  const totalAvaliacaoTitles = ancientAvaliacaoTitles + inGameAvaliacaoTitles.length;
  const totalAvaliacaoVices = ancientAvaliacaoVices + inGameAvaliacaoVices.length;

  const grandTotalTitles = totalEspecialTitles + totalOuroTitles + totalPrataTitles + totalBronzeTitles + totalAvaliacaoTitles;
  const grandTotalVices = totalEspecialVices + totalOuroVices + totalPrataVices + totalBronzeVices + totalAvaliacaoVices;
  const grandTotalConquests = grandTotalTitles + grandTotalVices;

  // Build sorted list of Especial title years
  const especialYearsList: TitleYearEntry[] = [];
  const historicalEspecialYears = school.honors?.historicalEspecialYears || [];
  historicalEspecialYears.forEach((yr, idx) => {
    const isMangueiraSuper =
      (school.id === 'mangueira' || school.name?.toLowerCase().includes('mangueira')) &&
      yr === 1984 &&
      idx === historicalEspecialYears.lastIndexOf(1984) &&
      historicalEspecialYears.filter((y) => y === 1984).length > 1;

    especialYearsList.push({
      year: yr,
      isHistorical: true,
      source: yr <= 2026 ? `Histórico (${yr})` : 'Histórico',
      label: isMangueiraSuper ? '1984 (Supercampeã)' : `${yr}`
    });
  });
  inGameEspecialTitles.forEach((ach) => {
    especialYearsList.push({
      year: ach.year,
      isHistorical: false,
      source: `No Jogo (${ach.year})`,
      label: `${ach.year}`
    });
  });

  const allEspecialYears: TitleYearEntry[] = especialYearsList.sort((a, b) => a.year - b.year);

  // Build sorted list of Especial runner-up (vice) years
  const especialRunnerUpYearsList: TitleYearEntry[] = [];
  (school.honors?.historicalEspecialRunnerUpYears || []).forEach((yr) => {
    especialRunnerUpYearsList.push({
      year: yr,
      isHistorical: true,
      source: yr <= 2026 ? `Histórico (${yr})` : 'Histórico',
      label: `${yr}`
    });
  });
  inGameEspecialVices.forEach((ach) => {
    especialRunnerUpYearsList.push({
      year: ach.year,
      isHistorical: false,
      source: `No Jogo (${ach.year})`,
      label: `${ach.year}`
    });
  });

  const allEspecialRunnerUpYears: TitleYearEntry[] = especialRunnerUpYearsList.sort((a, b) => a.year - b.year);

  // Build sorted list of Série Ouro title years
  const ouroYearsMap = new Map<number, { isHistorical: boolean; source: string }>();
  (school.honors?.historicalOuroYears || []).forEach((yr) => {
    ouroYearsMap.set(yr, {
      isHistorical: true,
      source: yr <= 2026 ? `Histórico (${yr})` : 'Histórico'
    });
  });
  inGameOuroTitles.forEach((ach) => {
    ouroYearsMap.set(ach.year, {
      isHistorical: false,
      source: `No Jogo (${ach.year})`
    });
  });

  const allOuroYears: TitleYearEntry[] = Array.from(ouroYearsMap.entries())
    .map(([year, info]) => ({ year, isHistorical: info.isHistorical, source: info.source }))
    .sort((a, b) => a.year - b.year);

  // Build sorted list of Série Ouro runner-up (vice) years
  const ouroRunnerUpYearsMap = new Map<number, { isHistorical: boolean; source: string }>();
  (school.honors?.historicalOuroRunnerUpYears || []).forEach((yr) => {
    ouroRunnerUpYearsMap.set(yr, {
      isHistorical: true,
      source: yr <= 2026 ? `Histórico (${yr})` : 'Histórico'
    });
  });
  inGameOuroVices.forEach((ach) => {
    ouroRunnerUpYearsMap.set(ach.year, {
      isHistorical: false,
      source: `No Jogo (${ach.year})`
    });
  });

  const allOuroRunnerUpYears: TitleYearEntry[] = Array.from(ouroRunnerUpYearsMap.entries())
    .map(([year, info]) => ({ year, isHistorical: info.isHistorical, source: info.source }))
    .sort((a, b) => a.year - b.year);

  // Build sorted list of Série Prata title years
  const prataYearsMap = new Map<number, { isHistorical: boolean; source: string }>();
  (school.honors?.historicalPrataYears || []).forEach((yr) => {
    prataYearsMap.set(yr, {
      isHistorical: true,
      source: yr <= 2026 ? `Histórico (${yr})` : 'Histórico'
    });
  });
  inGamePrataTitles.forEach((ach) => {
    prataYearsMap.set(ach.year, {
      isHistorical: false,
      source: `No Jogo (${ach.year})`
    });
  });

  const allPrataYears: TitleYearEntry[] = Array.from(prataYearsMap.entries())
    .map(([year, info]) => ({ year, isHistorical: info.isHistorical, source: info.source }))
    .sort((a, b) => a.year - b.year);

  // Build sorted list of Série Bronze title years
  const bronzeYearsMap = new Map<number, { isHistorical: boolean; source: string }>();
  (school.honors?.historicalBronzeYears || []).forEach((yr) => {
    bronzeYearsMap.set(yr, {
      isHistorical: true,
      source: yr <= 2026 ? `Histórico (${yr})` : 'Histórico'
    });
  });
  inGameBronzeTitles.forEach((ach) => {
    bronzeYearsMap.set(ach.year, {
      isHistorical: false,
      source: `No Jogo (${ach.year})`
    });
  });

  const allBronzeYears: TitleYearEntry[] = Array.from(bronzeYearsMap.entries())
    .map(([year, info]) => ({ year, isHistorical: info.isHistorical, source: info.source }))
    .sort((a, b) => a.year - b.year);

  // Build sorted list of Grupo de Avaliação title years
  const avaliacaoYearsMap = new Map<number, { isHistorical: boolean; source: string }>();
  (school.honors?.historicalAvaliacaoYears || []).forEach((yr) => {
    avaliacaoYearsMap.set(yr, {
      isHistorical: true,
      source: yr <= 2026 ? `Histórico (${yr})` : 'Histórico'
    });
  });
  inGameAvaliacaoTitles.forEach((ach) => {
    avaliacaoYearsMap.set(ach.year, {
      isHistorical: false,
      source: `No Jogo (${ach.year})`
    });
  });

  const allAvaliacaoYears: TitleYearEntry[] = Array.from(avaliacaoYearsMap.entries())
    .map(([year, info]) => ({ year, isHistorical: info.isHistorical, source: info.source }))
    .sort((a, b) => a.year - b.year);

  return {
    ancientEspecialTitles,
    ancientEspecialVices,
    ancientOuroTitles,
    ancientOuroVices,
    ancientPrataTitles,
    ancientPrataVices,
    ancientBronzeTitles,
    ancientBronzeVices,
    ancientAvaliacaoTitles,
    ancientAvaliacaoVices,
    inGameEspecialTitles: inGameEspecialTitles.length,
    inGameEspecialVices: inGameEspecialVices.length,
    inGameOuroTitles: inGameOuroTitles.length,
    inGameOuroVices: inGameOuroVices.length,
    inGamePrataTitles: inGamePrataTitles.length,
    inGamePrataVices: inGamePrataVices.length,
    inGameBronzeTitles: inGameBronzeTitles.length,
    inGameBronzeVices: inGameBronzeVices.length,
    inGameAvaliacaoTitles: inGameAvaliacaoTitles.length,
    inGameAvaliacaoVices: inGameAvaliacaoVices.length,
    totalEspecialTitles,
    totalEspecialVices,
    totalOuroTitles,
    totalOuroVices,
    totalPrataTitles,
    totalPrataVices,
    totalBronzeTitles,
    totalBronzeVices,
    totalAvaliacaoTitles,
    totalAvaliacaoVices,
    grandTotalTitles,
    grandTotalVices,
    grandTotalConquests,
    allEspecialYears,
    allEspecialRunnerUpYears,
    allOuroYears,
    allOuroRunnerUpYears,
    allPrataYears,
    allBronzeYears,
    allAvaliacaoYears,
    achievements: inGameAchievements
  };
}

export const INITIAL_SCHOOLS: School[] = [
  ...RAW_INITIAL_SCHOOLS.map((school) => {
    const stats = HISTORICAL_CARNAVAL_RECORDS[school.id] || {
      championshipsEspecial: 0,
      runnerUpsEspecial: 0,
      championshipsOuro: 0,
      runnerUpsOuro: 0
    };

    const tempSchool: School = {
      ...school,
      championshipsEspecial: stats.championshipsEspecial,
      runnerUpsEspecial: stats.runnerUpsEspecial,
      championshipsOuro: stats.championshipsOuro,
      runnerUpsOuro: stats.runnerUpsOuro,
      championshipsPrata: school.championshipsPrata || stats.championshipsPrata || 0,
      runnerUpsPrata: stats.runnerUpsPrata || 0,
      championshipsBronze: school.championshipsBronze || stats.championshipsBronze || 0,
      runnerUpsBronze: stats.runnerUpsBronze || 0,
      championshipsAvaliacao: school.championshipsAvaliacao || 0,
      runnerUpsAvaliacao: 0,
      isInactive: false,
      inactive: false,
      inactiveYearsCount: 0,
      honors: {
        historicalEspecialTitles: stats.championshipsEspecial,
        historicalEspecialYears: stats.especialYears || [],
        historicalEspecialRunnerUps: stats.runnerUpsEspecial,
        historicalEspecialRunnerUpYears: stats.especialRunnerUpYears || [],
        historicalOuroTitles: stats.championshipsOuro,
        historicalOuroYears: stats.ouroYears || [],
        historicalOuroRunnerUps: stats.runnerUpsOuro,
        historicalOuroRunnerUpYears: stats.ouroRunnerUpYears || [],
        historicalPrataTitles: school.championshipsPrata || stats.championshipsPrata || 0,
        historicalPrataYears: stats.prataYears || [],
        historicalPrataRunnerUps: stats.runnerUpsPrata || 0,
        historicalBronzeTitles: school.championshipsBronze || stats.championshipsBronze || 0,
        historicalBronzeYears: stats.bronzeYears || [],
        historicalBronzeRunnerUps: stats.runnerUpsBronze || 0,
        historicalAvaliacaoTitles: 0,
        historicalAvaliacaoYears: [],
        historicalAvaliacaoRunnerUps: 0,
        inGameAchievements: []
      }
    };

    const consolidated = getSchoolConsolidatedStats(tempSchool);

    return {
      ...tempSchool,
      championshipsEspecial: consolidated.totalEspecialTitles,
      runnerUpsEspecial: consolidated.totalEspecialVices,
      championshipsOuro: consolidated.totalOuroTitles,
      runnerUpsOuro: consolidated.totalOuroVices,
      championshipsPrata: consolidated.totalPrataTitles,
      runnerUpsPrata: consolidated.totalPrataVices,
      championshipsBronze: consolidated.totalBronzeTitles,
      runnerUpsBronze: consolidated.totalBronzeVices,
      championshipsAvaliacao: consolidated.totalAvaliacaoTitles,
      runnerUpsAvaliacao: consolidated.totalAvaliacaoVices
    };
  }),
  ...AVALIACAO_SCHOOLS_INITIAL.map((school) => {
    const consolidated = getSchoolConsolidatedStats(school);
    return {
      ...school,
      isInactive: false,
      inactive: false,
      championshipsEspecial: consolidated.totalEspecialTitles,
      runnerUpsEspecial: consolidated.totalEspecialVices,
      championshipsOuro: consolidated.totalOuroTitles,
      runnerUpsOuro: consolidated.totalOuroVices,
      championshipsPrata: consolidated.totalPrataTitles,
      runnerUpsPrata: consolidated.totalPrataVices,
      championshipsBronze: consolidated.totalBronzeTitles,
      runnerUpsBronze: consolidated.totalBronzeVices,
      championshipsAvaliacao: consolidated.totalAvaliacaoTitles,
      runnerUpsAvaliacao: consolidated.totalAvaliacaoVices
    };
  }),
  ...INACTIVE_SCHOOLS_INITIAL.map((school) => {
    const consolidated = getSchoolConsolidatedStats(school);
    return {
      ...school,
      isInactive: true,
      inactive: true,
      championshipsEspecial: consolidated.totalEspecialTitles,
      runnerUpsEspecial: consolidated.totalEspecialVices,
      championshipsOuro: consolidated.totalOuroTitles,
      runnerUpsOuro: consolidated.totalOuroVices,
      championshipsPrata: consolidated.totalPrataTitles,
      runnerUpsPrata: consolidated.totalPrataVices,
      championshipsBronze: consolidated.totalBronzeTitles,
      runnerUpsBronze: consolidated.totalBronzeVices,
      championshipsAvaliacao: consolidated.totalAvaliacaoTitles,
      runnerUpsAvaliacao: consolidated.totalAvaliacaoVices
    };
  })
];

export const INITIAL_HISTORY: YearHistory[] = [
  {
    year: 2026,
    especialChampion: 'Unidos do Viradouro',
    especialRelegated: ['Acadêmicos de Niterói'],
    ouroChampion: 'União de Maricá',
    ouroRelegated: [],
    prataChampion: 'Acadêmicos de Santa Cruz',
    prataPromoted: ['Acadêmicos de Santa Cruz', 'São Clemente'],
    prataRelegated: [
      'Império de Nova Iguaçu',
      'União de Jacarepaguá',
      'Siri de Ramos',
      'Acadêmicos do Dendê',
      'Independente da Praça da Bandeira',
      'Chatuba de Mesquita',
      'Vizinha Faladeira',
      'Leão de Nova Iguaçu'
    ],
    bronzeChampion: 'Sereno de Campo Grande',
    bronzePromoted: [
      'Sereno de Campo Grande',
      'Leão da Zona Oeste',
      'Rosa de Ouro',
      'Unidos de Cosmos',
      'Boi da Ilha do Governador'
    ],
    bronzeRelegated: [
      'Flor da Mina do Andaraí',
      'Unidos da Vila Kennedy',
      'Unidos da Barra da Tijuca',
      'Concentra Imperial',
      'Império de Brás de Pina',
      'Acadêmicos do Peixe'
    ],
    avaliacaoChampion: 'Casa de Malandro',
    avaliacaoPromoted: [
      'Casa de Malandro',
      'Difícil é o Nome',
      'Acadêmicos de Madureira',
      'Arame de Ricardo',
      'Coroado de Jacarepaguá'
    ],
    avaliacaoRelegated: [],
    especialStandings: [
      { rank: 1, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro', totalScore: 270.0 },
      { rank: 2, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', totalScore: 269.8 },
      { rank: 3, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio', totalScore: 269.7 },
      { rank: 4, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', totalScore: 269.5 },
      { rank: 5, schoolId: 'portela', schoolName: 'Portela', totalScore: 269.4 },
      { rank: 6, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', totalScore: 269.2 },
      { rank: 7, schoolId: 'beija_flor', schoolName: 'Beija-Flor de Nilópolis', totalScore: 269.0 },
      { rank: 8, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', totalScore: 268.9 },
      { rank: 9, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', totalScore: 268.7 },
      { rank: 10, schoolId: 'tuiuti', schoolName: 'Paraíso do Tuiuti', totalScore: 268.5 },
      { rank: 11, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', totalScore: 268.3 },
      { rank: 12, schoolId: 'niteroi', schoolName: 'Acadêmicos de Niterói', totalScore: 267.6 }
    ],
    ouroStandings: [
      { rank: 1, schoolId: 'marica', schoolName: 'União de Maricá', totalScore: 269.9 },
      { rank: 2, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', totalScore: 269.8 },
      { rank: 3, schoolId: 'unidos_padre_miguel', schoolName: 'Unidos de Padre Miguel', totalScore: 269.7 },
      { rank: 4, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá', totalScore: 269.5 },
      { rank: 5, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador', totalScore: 269.4 },
      { rank: 6, schoolId: 'inocentes', schoolName: 'Inocentes de Belford Roxo', totalScore: 269.2 },
      { rank: 7, schoolId: 'botafogo_samba_clube', schoolName: 'Botafogo Samba Clube', totalScore: 269.0 },
      { rank: 8, schoolId: 'unidos_de_bangu', schoolName: 'Unidos de Bangu', totalScore: 268.8 },
      { rank: 9, schoolId: 'em_cima_da_hora', schoolName: 'Em Cima da Hora', totalScore: 268.7 },
      { rank: 10, schoolId: 'unidos_da_ponte', schoolName: 'Unidos da Ponte', totalScore: 268.5 },
      { rank: 11, schoolId: 'arranco', schoolName: 'Arranco', totalScore: 268.4 },
      { rank: 12, schoolId: 'vigario_geral', schoolName: 'Acadêmicos de Vigário Geral', totalScore: 268.2 },
      { rank: 13, schoolId: 'parque_acari', schoolName: 'União do Parque Acari', totalScore: 268.0 },
      { rank: 14, schoolId: 'jacarezinho', schoolName: 'Unidos do Jacarezinho', totalScore: 267.8 },
      { rank: 15, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra', totalScore: 267.6 }
    ],
    prataStandings: [
      { rank: 1, schoolId: 'santa_cruz', schoolName: 'Acadêmicos de Santa Cruz', totalScore: 269.9 },
      { rank: 2, schoolId: 'sao_clemente', schoolName: 'São Clemente', totalScore: 269.8 },
      { rank: 3, schoolId: 'tradicao', schoolName: 'Tradição', totalScore: 269.6 },
      { rank: 4, schoolId: 'renascer_jacarepagua', schoolName: 'Renascer de Jacarepaguá', totalScore: 269.4 },
      { rank: 5, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', totalScore: 269.3 },
      { rank: 6, schoolId: 'cubango', schoolName: 'Acadêmicos do Cubango', totalScore: 269.1 },
      { rank: 7, schoolId: 'rocinha', schoolName: 'Acadêmicos da Rocinha', totalScore: 269.0 },
      { rank: 8, schoolId: 'lins_imperial', schoolName: 'Lins Imperial', totalScore: 268.8 },
      { rank: 9, schoolId: 'curicica', schoolName: 'União do Parque Curicica', totalScore: 268.6 },
      { rank: 10, schoolId: 'engenho_da_rainha', schoolName: 'Engenho da Rainha', totalScore: 268.4 },
      { rank: 11, schoolId: 'unidos_de_lucas', schoolName: 'Unidos de Lucas', totalScore: 268.3 },
      { rank: 12, schoolId: 'independentes_olaria', schoolName: 'Independentes de Olaria', totalScore: 268.1 },
      { rank: 13, schoolId: 'arrastao_cascadura', schoolName: 'Arrastão de Cascadura', totalScore: 267.9 },
      { rank: 14, schoolId: 'santa_marta', schoolName: 'Mocidade Unida do Santa Marta', totalScore: 267.7 },
      { rank: 15, schoolId: 'tubarao_mesquita', schoolName: 'Tubarão de Mesquita', totalScore: 267.5 },
      { rank: 16, schoolId: 'feitico_carioca', schoolName: 'Feitiço Carioca', totalScore: 267.4 },
      { rank: 17, schoolId: 'fla_manguaca', schoolName: 'Fla Manguaça', totalScore: 267.3 },
      { rank: 18, schoolId: 'imperio_nova_iguacu', schoolName: 'Império de Nova Iguaçu', totalScore: 267.2 },
      { rank: 19, schoolId: 'uniao_de_jacarepagua', schoolName: 'União de Jacarepaguá', totalScore: 267.1 },
      { rank: 20, schoolId: 'siri_de_ramos', schoolName: 'Siri de Ramos', totalScore: 267.0 },
      { rank: 21, schoolId: 'academicos_do_dende', schoolName: 'Acadêmicos do Dendê', totalScore: 266.9 },
      { rank: 22, schoolId: 'praca_da_bandeira', schoolName: 'Independente da Praça da Bandeira', totalScore: 266.8 },
      { rank: 23, schoolId: 'chatuba', schoolName: 'Chatuba de Mesquita', totalScore: 266.7 },
      { rank: 24, schoolId: 'vizinha_faladeira', schoolName: 'Vizinha Faladeira', totalScore: 266.6 },
      { rank: 25, schoolId: 'leao_de_nova_iguacu', schoolName: 'Leão de Nova Iguaçu', totalScore: 266.4 }
    ],
    bronzeStandings: [
      { rank: 1, schoolId: 'sereno_campo_grande', schoolName: 'Sereno de Campo Grande', totalScore: 269.7 },
      { rank: 2, schoolId: 'leao_zona_oeste', schoolName: 'Leão da Zona Oeste', totalScore: 269.6 },
      { rank: 3, schoolId: 'rosa_de_ouro', schoolName: 'Rosa de Ouro', totalScore: 269.4 },
      { rank: 4, schoolId: 'unidos_de_cosmos', schoolName: 'Unidos de Cosmos', totalScore: 269.3 },
      { rank: 5, schoolId: 'boi_da_ilha', schoolName: 'Boi da Ilha do Governador', totalScore: 269.1 },
      { rank: 6, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares', totalScore: 269.0 },
      { rank: 7, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', totalScore: 268.8 },
      { rank: 8, schoolId: 'imperadores_rubro_negros', schoolName: 'Imperadores Rubro-Negros', totalScore: 268.7 },
      { rank: 9, schoolId: 'uniao_cruzmaltina', schoolName: 'União Cruzmaltina', totalScore: 268.5 },
      { rank: 10, schoolId: 'vicente_de_carvalho', schoolName: 'Mocidade de Vicente de Carvalho', totalScore: 268.3 },
      { rank: 11, schoolId: 'alegria_de_copacabana', schoolName: 'Alegria de Copacabana', totalScore: 268.1 },
      { rank: 12, schoolId: 'villa_rica', schoolName: 'Unidos da Villa Rica', totalScore: 268.0 },
      { rank: 13, schoolId: 'academicos_do_recreio', schoolName: 'Acadêmicos do Recreio', totalScore: 267.8 },
      { rank: 14, schoolId: 'novo_imperio', schoolName: 'Novo Império', totalScore: 267.6 },
      { rank: 15, schoolId: 'imperio_da_uva', schoolName: 'Império da Uva', totalScore: 267.4 },
      { rank: 16, schoolId: 'alegria_do_vilar', schoolName: 'Alegria do Vilar', totalScore: 267.2 },
      { rank: 17, schoolId: 'flor_da_mina', schoolName: 'Flor da Mina do Andaraí', totalScore: 267.0 },
      { rank: 18, schoolId: 'unidos_da_vila_kennedy', schoolName: 'Unidos da Vila Kennedy', totalScore: 266.9 },
      { rank: 19, schoolId: 'unidos_da_barra_da_tijuca', schoolName: 'Unidos da Barra da Tijuca', totalScore: 266.8 },
      { rank: 20, schoolId: 'concentra_imperial', schoolName: 'Concentra Imperial', totalScore: 266.6 },
      { rank: 21, schoolId: 'imperio_bras_de_pina', schoolName: 'Império de Brás de Pina', totalScore: 266.5 },
      { rank: 22, schoolId: 'academicos_do_peixe', schoolName: 'Acadêmicos do Peixe', totalScore: 266.3 }
    ],
    avaliacaoStandings: [
      { rank: 1, schoolId: 'casa_de_malandro', schoolName: 'Casa de Malandro', totalScore: 269.0 },
      { rank: 2, schoolId: 'dificil_e_o_nome', schoolName: 'Difícil é o Nome', totalScore: 268.8 },
      { rank: 3, schoolId: 'academicos_de_madureira', schoolName: 'Acadêmicos de Madureira', totalScore: 268.6 },
      { rank: 4, schoolId: 'arame_de_ricardo', schoolName: 'Arame de Ricardo', totalScore: 268.4 },
      { rank: 5, schoolId: 'coroado_jacarepagua', schoolName: 'Coroado de Jacarepaguá', totalScore: 268.2 },
      { rank: 6, schoolId: 'unidos_de_manguinhos', schoolName: 'Unidos de Manguinhos', totalScore: 268.0 },
      { rank: 7, schoolId: 'raca_rubro_negra', schoolName: 'Raça Rubro-Negra', totalScore: 267.9 },
      { rank: 8, schoolId: 'mocidade_cidade_de_deus', schoolName: 'Mocidade Unida da Cidade de Deus', totalScore: 267.7 },
      { rank: 9, schoolId: 'guardioes_da_capadocia', schoolName: 'Guardiões da Capadócia', totalScore: 267.5 },
      { rank: 10, schoolId: 'imperio_ricardense', schoolName: 'Império Ricardense', totalScore: 267.4 },
      { rank: 11, schoolId: 'renascer_de_nova_iguacu', schoolName: 'Renascer de Nova Iguaçu', totalScore: 267.2 },
      { rank: 12, schoolId: 'imperio_da_resistencia', schoolName: 'Império da Resistência', totalScore: 267.0 },
      { rank: 13, schoolId: 'independente_de_jacarepagua', schoolName: 'Independente de Jacarepaguá', totalScore: 266.8 },
      { rank: 14, schoolId: 'mocidade_de_inhauma', schoolName: 'Mocidade Independente de Inhaúma', totalScore: 266.6 },
      { rank: 15, schoolId: 'imperio_da_penha', schoolName: 'Império da Penha', totalScore: 266.3 },
      { rank: 16, schoolId: 'gato_de_bonsucesso', schoolName: 'Gato de Bonsucesso', totalScore: 266.0 }
    ]
  }
];

export { AVALIACAO_SCHOOLS_INITIAL, INACTIVE_SCHOOLS_INITIAL, generateRandomCarnavalSchool };
