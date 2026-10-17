import { ProfessionalRole, TransferEvent } from '../types/professionals';

export interface HistoricalTransferItem {
  id: string;
  year: number;
  seasonLabel?: string;
  professionalId?: string;
  professionalName: string;
  role: ProfessionalRole;
  roleName: string;
  previousSchoolId?: string;
  previousSchoolName: string;
  newSchoolId: string;
  newSchoolName: string;
  impactTitle?: string;
  notes: string;
  mode?: 'solo' | 'dupla' | 'separacao_dupla';
  partnerName?: string;
  isHistoricalMilestone?: boolean;
  wonTitleInFirstYear?: boolean;
  valueSalary?: number;
  buyoutPaid?: number;
  dateStr?: string;
}

/**
 * Base de dados oficial de transferências históricas e marcantes do Carnaval Carioca
 * Registra a dança das cadeiras de carnavalescos, mestres de bateria, intérpretes,
 * casais de mestre-sala e porta-bandeira, coreógrafos e diretores de harmonia.
 */
export const HISTORICAL_CARNAVAL_TRANSFERS: HistoricalTransferItem[] = [
  // ==================== TEMPORADA 2026 ====================
  {
    id: 'tr_hist_2026_01',
    year: 2026,
    seasonLabel: 'Temporada 2026',
    professionalName: 'Paulo Barros',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'tijuca',
    previousSchoolName: 'Unidos da Tijuca',
    newSchoolId: 'beija_flor',
    newSchoolName: 'Beija-Flor de Nilópolis',
    impactTitle: 'O Mago na Soberana da Baixada',
    notes: 'Grande retorno do conceituado carnavalesco a Nilópolis. Promete aliar a monumentalidade da Beija-Flor ao seu repertório de ilusionismo e criatividade estética na Marquês de Sapucaí.',
    isHistoricalMilestone: true,
    valueSalary: 160000,
    dateStr: 'Março de 2025'
  },
  {
    id: 'tr_hist_2026_02',
    year: 2026,
    seasonLabel: 'Temporada 2026',
    professionalName: 'Leandro Vieira',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'imperatriz',
    previousSchoolName: 'Imperatriz Leopoldinense',
    newSchoolId: 'imperatriz',
    newSchoolName: 'Imperatriz Leopoldinense',
    impactTitle: 'Renovação da Hegemonia em Ramos',
    notes: 'Consolidado como um dos maiores carnavalescos da era moderna, Leandro assina contrato de longa duração com a agremiação de Ramos após o campeonato de 2023 e o vice de 2024.',
    isHistoricalMilestone: false,
    valueSalary: 175000,
    dateStr: 'Abril de 2025'
  },
  {
    id: 'tr_hist_2026_03',
    year: 2026,
    seasonLabel: 'Temporada 2026',
    professionalName: 'Neguinho da Beija-Flor',
    role: 'interprete',
    roleName: 'Intérprete Oficial',
    previousSchoolId: 'beija_flor',
    previousSchoolName: 'Beija-Flor de Nilópolis',
    newSchoolId: 'beija_flor',
    newSchoolName: 'Beija-Flor de Nilópolis',
    impactTitle: 'O Último Canto da Lenda (50 Anos de Avenida)',
    notes: 'Após 50 anos consecutivos como a voz soberana de Nilópolis, a maior lenda viva do microfone oficial conduz seu desfile de celebração e transição histórica no carro de som da Beija-Flor.',
    isHistoricalMilestone: true,
    valueSalary: 180000,
    dateStr: 'Novembro de 2025'
  },
  {
    id: 'tr_hist_2026_04',
    year: 2026,
    seasonLabel: 'Temporada 2026',
    professionalName: 'Marcelo Misailidis',
    role: 'coreografo',
    roleName: 'Coreógrafo da Comissão de Frente',
    previousSchoolId: 'tijuca',
    previousSchoolName: 'Unidos da Tijuca',
    newSchoolId: 'imperatriz',
    newSchoolName: 'Imperatriz Leopoldinense',
    impactTitle: 'Dança Erudita & Efeito Visual em Ramos',
    notes: 'O premiado bailarino e coreógrafo assume a missão de desenhar a comissão de frente da Rainha de Ramos, integrando rigor técnico e teatralidade na abertura do cortejo.',
    valueSalary: 95000,
    dateStr: 'Maio de 2025'
  },

  // ==================== TEMPORADA 2025 ====================
  {
    id: 'tr_hist_2025_01',
    year: 2025,
    seasonLabel: 'Temporada 2025',
    professionalName: 'Alexandre Louzada',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'beija_flor',
    previousSchoolName: 'Beija-Flor de Nilópolis',
    newSchoolId: 'unidos_de_padre_miguel',
    newSchoolName: 'Unidos de Padre Miguel',
    impactTitle: 'Mestre Louzada na Estreia do Boi Vermelho no Especial',
    notes: 'Em uma das jogadas mais comentadas da janela, o pentacampeão Alexandre Louzada é contratado pela UPM para comandar o primeiro desfile da história da agremiação no Grupo Especial.',
    isHistoricalMilestone: true,
    valueSalary: 140000,
    dateStr: 'Abril de 2024'
  },
  {
    id: 'tr_hist_2025_02',
    year: 2025,
    seasonLabel: 'Temporada 2025',
    professionalName: 'Paulo Barros',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'tuiuti',
    previousSchoolName: 'Paraíso do Tuiuti',
    newSchoolId: 'tijuca',
    newSchoolName: 'Unidos da Tijuca',
    impactTitle: 'O Retorno da Alquimia do Pavão',
    notes: 'A diretoria da Unidos da Tijuca anuncia o retorno do artista que mudou o patamar da escola na década de 2000 e 2010 com a promessa de resgatar o espírito de campeã.',
    valueSalary: 150000,
    dateStr: 'Março de 2024'
  },
  {
    id: 'tr_hist_2025_03',
    year: 2025,
    seasonLabel: 'Temporada 2025',
    professionalName: 'Ito Melodia',
    role: 'interprete',
    roleName: 'Intérprete Oficial',
    previousSchoolId: 'mocidade',
    previousSchoolName: 'Mocidade Independente',
    newSchoolId: 'imperio_serrano',
    newSchoolName: 'Império Serrano',
    impactTitle: 'A Voz da Serrinha na Série Ouro',
    notes: 'Com inúmeros Estandartes de Ouro na carreira, Ito Melodia aceita o desafio de empurrar o canto da comunidade imperiana em busca do retorno ao Grupo Especial.',
    valueSalary: 100000,
    dateStr: 'Maio de 2024'
  },
  {
    id: 'tr_hist_2025_04',
    year: 2025,
    seasonLabel: 'Temporada 2025',
    professionalName: 'Zé Paulo Sierra',
    role: 'interprete',
    roleName: 'Intérprete Oficial',
    previousSchoolId: 'viradouro',
    previousSchoolName: 'Unidos do Viradouro',
    newSchoolId: 'mocidade',
    newSchoolName: 'Mocidade Independente',
    impactTitle: 'Garra e Potência Vocal em Padre Miguel',
    notes: 'Dono de um dos gritos de guerra mais viscerais da avenida, Zé Paulo assume o comando do carro de som da Estrela-Guia de Padre Miguel.',
    valueSalary: 110000,
    dateStr: 'Abril de 2024'
  },

  // ==================== TEMPORADA 2024 ====================
  {
    id: 'tr_hist_2024_01',
    year: 2024,
    seasonLabel: 'Temporada 2024',
    professionalName: 'Wander Pires',
    role: 'interprete',
    roleName: 'Intérprete Oficial',
    previousSchoolId: 'tuiuti',
    previousSchoolName: 'Paraíso do Tuiuti',
    newSchoolId: 'viradouro',
    newSchoolName: 'Unidos do Viradouro',
    impactTitle: 'Campeão Invicto no 1º Ano',
    notes: 'Wander Pires retorna à Viradouro com atuações de gala e arrasta a Sapucaí no enredo "Arrebita!", faturando notas máximas de harmonia e sagrando-se campeão do Grupo Especial 2024.',
    isHistoricalMilestone: true,
    wonTitleInFirstYear: true,
    valueSalary: 135000,
    dateStr: 'Abril de 2023'
  },
  {
    id: 'tr_hist_2024_02',
    year: 2024,
    seasonLabel: 'Temporada 2024',
    professionalName: 'Marcus Ferreira',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'viradouro',
    previousSchoolName: 'Unidos do Viradouro',
    newSchoolId: 'mocidade',
    newSchoolName: 'Mocidade Independente',
    impactTitle: 'O Fenômeno do Enredo do Caju',
    notes: 'Marcus Ferreira desembarca em Padre Miguel e concebe o enredo "Pede Caju que Dou... Pé de Caju que Dá!", tornando o samba da Mocidade o hino viral e popular do ano.',
    valueSalary: 120000,
    dateStr: 'Março de 2023'
  },
  {
    id: 'tr_hist_2024_03',
    year: 2024,
    seasonLabel: 'Temporada 2024',
    professionalName: 'Edson Pereira',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'vila_isabel',
    previousSchoolName: 'Unidos de Vila Isabel',
    newSchoolId: 'salgueiro',
    newSchoolName: 'Acadêmicos do Salgueiro',
    impactTitle: 'Hutukara Yanomami na Academia do Samba',
    notes: 'Edson Pereira é contratado pelo Salgueiro para liderar um dos enredos mais aclamados e engajados internacionalmente sobre a preservação e a cosmologia do povo Yanomami.',
    valueSalary: 125000,
    dateStr: 'Abril de 2023'
  },

  // ==================== TEMPORADA 2023 ====================
  {
    id: 'tr_hist_2023_01',
    year: 2023,
    seasonLabel: 'Temporada 2023',
    professionalName: 'Leandro Vieira',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'imperio_serrano',
    previousSchoolName: 'Império Serrano',
    newSchoolId: 'imperatriz',
    newSchoolName: 'Imperatriz Leopoldinense',
    impactTitle: 'Campeão Inédito Quebrando Jejum de 22 Anos',
    notes: 'Após subir com o Império Serrano como campeão da Série Ouro em 2022, Leandro chega à Imperatriz Leopoldinense e cria "O aperreio do cabra que o excomungado tratou com má-querença e o santíssimo não deu guarida", dando à Rainha de Ramos o campeonato que esperava desde 2001.',
    isHistoricalMilestone: true,
    wonTitleInFirstYear: true,
    valueSalary: 140000,
    dateStr: 'Maio de 2022'
  },
  {
    id: 'tr_hist_2023_02',
    year: 2023,
    seasonLabel: 'Temporada 2023',
    professionalName: 'Patrick Carvalho',
    role: 'coreografo',
    roleName: 'Coreógrafo da Comissão de Frente',
    previousSchoolId: 'salgueiro',
    previousSchoolName: 'Acadêmicos do Salgueiro',
    newSchoolId: 'mangueira',
    newSchoolName: 'Estação Primeira de Mangueira',
    impactTitle: 'As Áfricas da Estação Primeira',
    notes: 'Patrick leva sua bagagem de ritmo e teatralidade para a abertura do cortejo da verde e rosa no enredo das Oyás e deusas baianas.',
    valueSalary: 90000,
    dateStr: 'Abril de 2022'
  },

  // ==================== TEMPORADA 2022 ====================
  {
    id: 'tr_hist_2022_01',
    year: 2022,
    seasonLabel: 'Temporada 2022',
    professionalName: 'Leandro Vieira',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'mangueira',
    previousSchoolName: 'Estação Primeira de Mangueira',
    newSchoolId: 'imperio_serrano',
    newSchoolName: 'Império Serrano',
    impactTitle: 'Campeão da Série Ouro com Besouro Mangangá',
    notes: 'Em um movimento histórico de dupla jornada, Leandro assume o Império Serrano na Intendente / Sapucaí da Série Ouro e conquista o título invicto, devolvendo o Reizinho de Madureira à elite do Carnaval.',
    isHistoricalMilestone: true,
    wonTitleInFirstYear: true,
    valueSalary: 110000,
    dateStr: 'Julho de 2021'
  },
  {
    id: 'tr_hist_2022_02',
    year: 2022,
    seasonLabel: 'Temporada 2022',
    professionalName: 'Renato Lage & Márcia Lage',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'grande_rio',
    previousSchoolName: 'Acadêmicos do Grande Rio',
    newSchoolId: 'portela',
    newSchoolName: 'Portela',
    impactTitle: 'O Baobá e a Força Ancestral da Majestade',
    notes: 'O célebre casal desembarca em Oswaldo Cruz e Madureira para homenagear a ancestralidade negra e as raízes africanas da escola mais vitoriosa do samba.',
    mode: 'dupla',
    partnerName: 'Márcia Lage',
    valueSalary: 130000,
    dateStr: 'Maio de 2020'
  },

  // ==================== TEMPORADA 2020 ====================
  {
    id: 'tr_hist_2020_01',
    year: 2020,
    seasonLabel: 'Temporada 2020',
    professionalName: 'Tarcisio Zanon & Marcus Ferreira',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'estacio_de_sa',
    previousSchoolName: 'Estácio de Sá / Rocinha',
    newSchoolId: 'viradouro',
    newSchoolName: 'Unidos do Viradouro',
    impactTitle: 'Campeões do Grupo Especial no 1º Ano',
    notes: 'Em aposta ousada da presidência da Viradouro, a jovem dupla assume a agremiação e cria a monumentalidade de "Viradouro de Alma Lavada", homenageando as Ganhadeiras de Itapuã e sagrando-se campeões no primeiro ano de parceria.',
    isHistoricalMilestone: true,
    wonTitleInFirstYear: true,
    mode: 'dupla',
    partnerName: 'Marcus Ferreira',
    valueSalary: 130000,
    dateStr: 'Março de 2019'
  },
  {
    id: 'tr_hist_2020_02',
    year: 2020,
    seasonLabel: 'Temporada 2020',
    professionalName: 'Mestre Fafá',
    role: 'mestreBateria',
    roleName: 'Mestre de Bateria',
    previousSchoolId: 'grande_rio',
    previousSchoolName: 'Acadêmicos do Grande Rio',
    newSchoolId: 'grande_rio',
    newSchoolName: 'Acadêmicos do Grande Rio',
    impactTitle: 'A Era de Ouro da Bateria Invocada',
    notes: 'Cria de Caxias, Fafá assume a regência principal da Bateria Invocada, conquistando consecutivas notas 10 e estabelecendo a melhor fase rítmica da história da agremiação.',
    isHistoricalMilestone: false,
    valueSalary: 85000,
    dateStr: 'Abril de 2019'
  },

  // ==================== TEMPORADA 2019 ====================
  {
    id: 'tr_hist_2019_01',
    year: 2019,
    seasonLabel: 'Temporada 2019',
    professionalName: 'Paulo Barros',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'vila_isabel',
    previousSchoolName: 'Unidos de Vila Isabel',
    newSchoolId: 'viradouro',
    newSchoolName: 'Unidos do Viradouro',
    impactTitle: 'Vice-Campeão Histórico Recém-Subido do Acesso',
    notes: 'Paulo Barros retorna à Viradouro logo após o acesso da escola, desenvolvendo "ViraViradouro!" sobre o universo encantado dos contos de fadas, conquistando o vice-campeonato e assombrando o Sambódromo.',
    isHistoricalMilestone: true,
    valueSalary: 150000,
    dateStr: 'Abril de 2018'
  },
  {
    id: 'tr_hist_2019_02',
    year: 2019,
    seasonLabel: 'Temporada 2019',
    professionalName: 'Tinga',
    role: 'interprete',
    roleName: 'Intérprete Oficial',
    previousSchoolId: 'tijuca',
    previousSchoolName: 'Unidos da Tijuca',
    newSchoolId: 'vila_isabel',
    newSchoolName: 'Unidos de Vila Isabel',
    impactTitle: 'A Voz da Swingueira Volta pra Casa',
    notes: 'Após brilhante passagem como campeão na Unidos da Tijuca, Tinga retorna à sua escola de coração para liderar o carro de som da comunidade de Noel Rosa.',
    valueSalary: 105000,
    dateStr: 'Maio de 2018'
  },
  {
    id: 'tr_hist_2019_03',
    year: 2019,
    seasonLabel: 'Temporada 2019',
    professionalName: 'Mestre Ciça',
    role: 'mestreBateria',
    roleName: 'Mestre de Bateria',
    previousSchoolId: 'uniao_da_ilha',
    previousSchoolName: 'União da Ilha do Governador',
    newSchoolId: 'viradouro',
    newSchoolName: 'Unidos do Viradouro',
    impactTitle: 'O Retorno do Maestro do Tamborim',
    notes: 'O lendário Mestre Ciça volta a comandar a Bateria Furiosa da Viradouro, resgatando as célebres paradinhas marciais e a identidade rítmica que marcaram sua passagem em 2007.',
    isHistoricalMilestone: true,
    valueSalary: 110000,
    dateStr: 'Maio de 2018'
  },

  // ==================== TEMPORADA 2017 ====================
  {
    id: 'tr_hist_2017_01',
    year: 2017,
    seasonLabel: 'Temporada 2017',
    professionalName: 'Paulo Barros',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'mocidade',
    previousSchoolName: 'Mocidade Independente',
    newSchoolId: 'portela',
    newSchoolName: 'Portela',
    impactTitle: 'Campeão Invicto Quebrando Jejum de 33 Anos da Águia',
    notes: 'Em uma das maiores consagrações da história do Sambódromo, Paulo Barros leva a Portela ao campeonato oficial do Grupo Especial de 2017 com "Quem nunca sentiu o corpo arrepiar ao ver esse rio passar...", quebrando a histórica seca iniciada em 1984.',
    isHistoricalMilestone: true,
    wonTitleInFirstYear: true,
    valueSalary: 155000,
    dateStr: 'Março de 2016'
  },
  {
    id: 'tr_hist_2017_02',
    year: 2017,
    seasonLabel: 'Temporada 2017',
    professionalName: 'Alexandre Louzada',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'portela',
    previousSchoolName: 'Portela',
    newSchoolId: 'mocidade',
    newSchoolName: 'Mocidade Independente',
    impactTitle: 'Campeão Oficial Dividindo o Título da Folia',
    notes: 'Louzada troca a Portela pela Mocidade e cria "As Mil e Uma Noites de uma Mocidade pra Lá de Marrakesh", faturando o título oficial de campeã do Carnaval de 2017 ao lado da Portela.',
    isHistoricalMilestone: true,
    wonTitleInFirstYear: true,
    valueSalary: 130000,
    dateStr: 'Abril de 2016'
  },

  // ==================== TEMPORADA 2016 ====================
  {
    id: 'tr_hist_2016_01',
    year: 2016,
    seasonLabel: 'Temporada 2016',
    professionalName: 'Leandro Vieira',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'caprichosos_de_pilares',
    previousSchoolName: 'Caprichosos de Pilares',
    newSchoolId: 'mangueira',
    newSchoolName: 'Estação Primeira de Mangueira',
    impactTitle: 'Estreia Fulminante no Especial: Campeão no 1º Ano',
    notes: 'Desconhecido do grande público do Especial, Leandro é contratado pelo presidente Chiquinho da Mangueira e cria a antológica homenagem "Maria Bethânia: A Menina dos Olhos de Oyá", levando a verde e rosa ao título após 14 anos de jejum.',
    isHistoricalMilestone: true,
    wonTitleInFirstYear: true,
    valueSalary: 85000,
    dateStr: 'Junho de 2015'
  },

  // ==================== TEMPORADA 2015 ====================
  {
    id: 'tr_hist_2015_01',
    year: 2015,
    seasonLabel: 'Temporada 2015',
    professionalName: 'Paulo Barros',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'tijuca',
    previousSchoolName: 'Unidos da Tijuca',
    newSchoolId: 'mocidade',
    newSchoolName: 'Mocidade Independente',
    impactTitle: 'A Maior Contratação da Década na Folia',
    notes: 'Após três títulos na Unidos da Tijuca, Paulo Barros assina contrato histórico com o patrono Rogério Andrade na Mocidade Independente. Sua chegada paraquedista na quadra parou o noticiário nacional do Carnaval.',
    isHistoricalMilestone: true,
    valueSalary: 180000,
    buyoutPaid: 350000,
    dateStr: 'Março de 2014'
  },
  {
    id: 'tr_hist_2015_02',
    year: 2015,
    seasonLabel: 'Temporada 2015',
    professionalName: 'Rosa Magalhães',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'mangueira',
    previousSchoolName: 'Estação Primeira de Mangueira',
    newSchoolId: 'sao_clemente',
    newSchoolName: 'São Clemente',
    impactTitle: 'A Professora Revoluciona a Estética da Zona Sul',
    notes: 'A lendária carnavalesca multicampeã Rosa Magalhães fecha com a irreverente São Clemente e monta o aclamado desfile "A Incrível História do Homem que Só Tinha Medo de Envelhecer", homenagem a Fernando Pamplona que obteve as melhores notas da história da escola.',
    isHistoricalMilestone: true,
    valueSalary: 120000,
    dateStr: 'Maio de 2014'
  },

  // ==================== TEMPORADA 2014 ====================
  {
    id: 'tr_hist_2014_01',
    year: 2014,
    seasonLabel: 'Temporada 2014',
    professionalName: 'Tinga',
    role: 'interprete',
    roleName: 'Intérprete Oficial',
    previousSchoolId: 'imperatriz',
    previousSchoolName: 'Imperatriz Leopoldinense',
    newSchoolId: 'tijuca',
    newSchoolName: 'Unidos da Tijuca',
    impactTitle: 'Campeão Invicto no Tributo a Ayrton Senna',
    notes: 'Tinga chega ao Borel e forma parceria antológica com o carro de som da Tijuca, vencendo o Carnaval de 2014 com "Acelera, Tijuca!" e nota máxima dos julgadores em harmonia.',
    isHistoricalMilestone: true,
    wonTitleInFirstYear: true,
    valueSalary: 95000,
    dateStr: 'Abril de 2013'
  },

  // ==================== TEMPORADA 2013 ====================
  {
    id: 'tr_hist_2013_01',
    year: 2013,
    seasonLabel: 'Temporada 2013',
    professionalName: 'Rosa Magalhães',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'imperatriz',
    previousSchoolName: 'Imperatriz Leopoldinense',
    newSchoolId: 'vila_isabel',
    newSchoolName: 'Unidos de Vila Isabel',
    impactTitle: 'Campeã Invicto: Kizomba do Agronegócio',
    notes: 'Rosa assume a Vila Isabel e concebe "A Vila Canta o Brasil Celeiro do Mundo", arrebatando o público e os jurados, coroando o terceiro campeonato da história da escola de Noel.',
    isHistoricalMilestone: true,
    wonTitleInFirstYear: true,
    valueSalary: 130000,
    dateStr: 'Maio de 2012'
  },

  // ==================== TEMPORADA 2010 ====================
  {
    id: 'tr_hist_2010_01',
    year: 2010,
    seasonLabel: 'Temporada 2010',
    professionalName: 'Paulo Barros',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'viradouro',
    previousSchoolName: 'Unidos do Viradouro',
    newSchoolId: 'tijuca',
    newSchoolName: 'Unidos da Tijuca',
    impactTitle: 'Campeão Quebrando Jejum de 74 Anos com "É Segredo!"',
    notes: 'O carnavalesco retorna à Unidos da Tijuca e cria o divisor de águas da história moderna do Carnaval: a comissão de frente do truque da troca instantânea de vestidos (Priscilla Mota e Rodrigo Negri), sagrando a Tijuca campeã após sete décadas.',
    isHistoricalMilestone: true,
    wonTitleInFirstYear: true,
    valueSalary: 140000,
    dateStr: 'Abril de 2009'
  },

  // ==================== TEMPORADA 2007 ====================
  {
    id: 'tr_hist_2007_01',
    year: 2007,
    seasonLabel: 'Temporada 2007',
    professionalName: 'Paulo Barros',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'tijuca',
    previousSchoolName: 'Unidos da Tijuca',
    newSchoolId: 'viradouro',
    newSchoolName: 'Unidos do Viradouro',
    impactTitle: 'A Bateria no Alto do Carro Alegórico',
    notes: 'Paulo troca o Borel por Niterói e choca o Sambódromo ao colocar todos os ritmistas da Bateria Furiosa de Mestre Ciça em cima de um carro alegórico em movimento.',
    isHistoricalMilestone: true,
    valueSalary: 120000,
    dateStr: 'Abril de 2006'
  },
  {
    id: 'tr_hist_2007_02',
    year: 2007,
    seasonLabel: 'Temporada 2007',
    professionalName: 'Alexandre Louzada',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'vila_isabel',
    previousSchoolName: 'Unidos de Vila Isabel',
    newSchoolId: 'beija_flor',
    newSchoolName: 'Beija-Flor de Nilópolis',
    impactTitle: 'Bicampeonato Imediato na Deusa da Passarela',
    notes: 'Após faturar o título de 2006 na Vila Isabel, Louzada assume a Beija-Flor e vence consecutivamente os carnavais de 2007 ("Áfricas") e 2008 ("Macapá").',
    isHistoricalMilestone: true,
    wonTitleInFirstYear: true,
    valueSalary: 135000,
    dateStr: 'Março de 2006'
  },

  // ==================== TEMPORADA 2004 ====================
  {
    id: 'tr_hist_2004_01',
    year: 2004,
    seasonLabel: 'Temporada 2004',
    professionalName: 'Paulo Barros',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'tuiuti',
    previousSchoolName: 'Paraíso do Tuiuti (Acesso)',
    newSchoolId: 'tijuca',
    newSchoolName: 'Unidos da Tijuca',
    impactTitle: 'A Revolução Estética do Carro do DNA (Vice-Campeão Histórico)',
    notes: 'Vindo do Grupo de Acesso, Paulo Barros estreia no Grupo Especial e choca a cultura carnavalesca com o lendário "Carro do DNA" e esculturas humanas vivas no enredo "O Segredo do Agbê", garantindo o vice-campeonato e refundando a plástica do Sambódromo.',
    isHistoricalMilestone: true,
    valueSalary: 60000,
    dateStr: 'Maio de 2003'
  },

  // ==================== TEMPORADA 2003 ====================
  {
    id: 'tr_hist_2003_01',
    year: 2003,
    seasonLabel: 'Temporada 2003',
    professionalName: 'Renato Lage',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'mocidade',
    previousSchoolName: 'Mocidade Independente',
    newSchoolId: 'salgueiro',
    newSchoolName: 'Acadêmicos do Salgueiro',
    impactTitle: 'Fim da Era Futurista e Chegada na Academia do Samba',
    notes: 'Após mais de uma década brilhante e revolucionária em Padre Miguel, Renato Lage se transfere para a Academia do Samba, onde construiu uma dinastia de 15 carnavais.',
    isHistoricalMilestone: true,
    valueSalary: 115000,
    dateStr: 'Abril de 2002'
  },

  // ==================== TEMPORADA 1997 ====================
  {
    id: 'tr_hist_1997_01',
    year: 1997,
    seasonLabel: 'Temporada 1997',
    professionalName: 'Joãosinho Trinta',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'beija_flor',
    previousSchoolName: 'Beija-Flor / Livre',
    newSchoolId: 'viradouro',
    newSchoolName: 'Unidos do Viradouro',
    impactTitle: '1º Título da História da Viradouro ("Trevas! Luz!")',
    notes: 'Joãosinho Trinta consolida sua lenda na Sapucaí ao levar a Unidos do Viradouro ao seu primeiro campeonato histórico na elite do Carnaval com o antológico "Trevas! Luz! A Explosão do Universo".',
    isHistoricalMilestone: true,
    wonTitleInFirstYear: true,
    valueSalary: 120000,
    dateStr: 'Maio de 1996'
  },

  // ==================== TEMPORADA 1996 ====================
  {
    id: 'tr_hist_1996_01',
    year: 1996,
    seasonLabel: 'Temporada 1996',
    professionalName: 'Claudinho & Selminha Sorriso',
    role: 'mestreSalaPortaBandeira',
    roleName: '1º Casal de Mestre-Sala e Porta-Bandeira',
    previousSchoolId: 'estacio_de_sa',
    previousSchoolName: 'Estácio de Sá',
    newSchoolId: 'beija_flor',
    newSchoolName: 'Beija-Flor de Nilópolis',
    impactTitle: 'O Maior Casal da História do Carnaval na Deusa da Passarela',
    notes: 'Após brilharem como campeões no Estácio de Sá em 1992, Claudinho e Selminha Sorriso desembarcam em Nilópolis para iniciar a dinastia de três décadas defendendo o pavilhão azul e branco.',
    isHistoricalMilestone: true,
    mode: 'dupla',
    partnerName: 'Selminha Sorriso',
    valueSalary: 80000,
    dateStr: 'Abril de 1995'
  },

  // ==================== TEMPORADA 1993 ====================
  {
    id: 'tr_hist_1993_01',
    year: 1993,
    seasonLabel: 'Temporada 1993',
    professionalName: 'Joãosinho Trinta',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'beija_flor',
    previousSchoolName: 'Beija-Flor de Nilópolis',
    newSchoolId: 'viradouro',
    newSchoolName: 'Unidos do Viradouro',
    impactTitle: 'A Despedida da Baixada e o Desembarque em Niterói',
    notes: 'Após 17 carnavais e cinco títulos na Beija-Flor, o mestre do luxo encerra seu ciclo em Nilópolis e é contratado com pompas pela agremiação de Niterói.',
    isHistoricalMilestone: true,
    valueSalary: 130000,
    dateStr: 'Março de 1992'
  },

  // ==================== TEMPORADA 1992 ====================
  {
    id: 'tr_hist_1992_01',
    year: 1992,
    seasonLabel: 'Temporada 1992',
    professionalName: 'Rosa Magalhães',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'imperio_serrano',
    previousSchoolName: 'Império Serrano / Salgueiro',
    newSchoolId: 'imperatriz',
    newSchoolName: 'Imperatriz Leopoldinense',
    impactTitle: 'Início da Era de Ouro da Rainha de Ramos',
    notes: 'Rosa Magalhães chega à Imperatriz Leopoldinense onde conceberia a era de maior perfeição técnica da Marquês de Sapucaí, culminando em 5 títulos oficiais (1994, 1995, 1999, 2000 e 2001).',
    isHistoricalMilestone: true,
    valueSalary: 90000,
    dateStr: 'Junho de 1991'
  },

  // ==================== TEMPORADA 1990 ====================
  {
    id: 'tr_hist_1990_01',
    year: 1990,
    seasonLabel: 'Temporada 1990',
    professionalName: 'Renato Lage',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'salgueiro',
    previousSchoolName: 'Acadêmicos do Salgueiro',
    newSchoolId: 'mocidade',
    newSchoolName: 'Mocidade Independente',
    impactTitle: 'Bicampeão e a Revolução Futurista das Estrelas',
    notes: 'Renato Lage assume a Mocidade Independente e cria os antológicos desfiles "Vira, Virou" (1990) e "Chuê, Chuá" (1991), consagrando-se bicampeão consecutivo da Sapucaí.',
    isHistoricalMilestone: true,
    wonTitleInFirstYear: true,
    valueSalary: 100000,
    dateStr: 'Maio de 1989'
  },

  // ==================== TEMPORADA 1976 ====================
  {
    id: 'tr_hist_1976_01',
    year: 1976,
    seasonLabel: 'Temporada 1976',
    professionalName: 'Joãosinho Trinta',
    role: 'carnavalesco',
    roleName: 'Carnavalesco',
    previousSchoolId: 'salgueiro',
    previousSchoolName: 'Acadêmicos do Salgueiro',
    newSchoolId: 'beija_flor',
    newSchoolName: 'Beija-Flor de Nilópolis',
    impactTitle: 'Tricampeão Invicto no 1º Ano: O Início da Era do Luxo',
    notes: 'Após o bicampeonato consecutivo no Salgueiro (1974/1975), Joãosinho Trinta aceita a proposta de Aniz Abraão David e se muda para Nilópolis. No primeiro ano cria "Sonhar com Rei Dá Leão" (1976), conquistando o primeiro título da história da Beija-Flor e iniciando o tricampeonato histórico (1976, 1977 e 1978).',
    isHistoricalMilestone: true,
    wonTitleInFirstYear: true,
    valueSalary: 50000,
    dateStr: 'Abril de 1975'
  }
];

/**
 * Retorna lista unificada de transferências (históricas oficiais + in-game)
 */
export function getUnifiedTransferHistory(inGameTransfers: TransferEvent[] = []): HistoricalTransferItem[] {
  const convertedInGame: HistoricalTransferItem[] = (inGameTransfers || []).map((tr) => ({
    id: tr.id,
    year: tr.year,
    seasonLabel: `Temporada ${tr.year} (Modo Carreira)`,
    professionalId: tr.professionalId,
    professionalName: tr.professionalName,
    role: tr.role,
    roleName: tr.roleName,
    previousSchoolId: tr.previousSchoolId,
    previousSchoolName: tr.previousSchoolName || 'Sem Clube (Agente Livre)',
    newSchoolId: tr.newSchoolId,
    newSchoolName: tr.newSchoolName,
    impactTitle: tr.buyoutPaid && tr.buyoutPaid > 0
      ? `Quebra de Contrato (Multa de R$ ${(tr.buyoutPaid / 1000).toFixed(0)}k)`
      : tr.mode === 'dupla'
      ? `Formação de Parceria Técnica`
      : 'Contratação Oficial da Temporada',
    notes: tr.headlineGenerated || `Transferência de ${tr.professionalName} para a ${tr.newSchoolName} concluída na janela do mês de ${tr.monthId}.`,
    mode: tr.mode,
    partnerName: tr.partnerName,
    isHistoricalMilestone: Boolean(tr.buyoutPaid && tr.buyoutPaid > 0),
    valueSalary: tr.valueSalary,
    buyoutPaid: tr.buyoutPaid,
    dateStr: tr.dateStr || `${tr.monthId?.toUpperCase()} • Temporada ${tr.year}`
  }));

  // Mescla históricos e do jogo ordenados do mais recente para o mais antigo
  const all = [...convertedInGame, ...HISTORICAL_CARNAVAL_TRANSFERS];
  return all.sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return a.professionalName.localeCompare(b.professionalName);
  });
}

/**
 * Retorna todas as temporadas presentes no catálogo
 */
export function getAvailableTransferSeasons(transfers: HistoricalTransferItem[]): number[] {
  const seasons = Array.from(new Set(transfers.map((t) => t.year)));
  return seasons.sort((a, b) => b - a);
}

/**
 * Retorna lista de profissionais únicos e suas respectivas trajetórias completas
 */
export function getProfessionalTrajectories(transfers: HistoricalTransferItem[]): {
  professionalName: string;
  role: ProfessionalRole;
  roleName: string;
  movesCount: number;
  titlesCount: number;
  timeline: HistoricalTransferItem[];
}[] {
  const map = new Map<
    string,
    {
      professionalName: string;
      role: ProfessionalRole;
      roleName: string;
      timeline: HistoricalTransferItem[];
      titlesCount: number;
    }
  >();

  transfers.forEach((tr) => {
    const key = tr.professionalName;
    if (!map.has(key)) {
      map.set(key, {
        professionalName: tr.professionalName,
        role: tr.role,
        roleName: tr.roleName,
        timeline: [],
        titlesCount: 0
      });
    }
    const entry = map.get(key)!;
    entry.timeline.push(tr);
    if (tr.wonTitleInFirstYear) {
      entry.titlesCount++;
    }
  });

  return Array.from(map.values())
    .map((item) => ({
      ...item,
      movesCount: item.timeline.length,
      timeline: item.timeline.sort((a, b) => b.year - a.year)
    }))
    .sort((a, b) => b.movesCount - a.movesCount || a.professionalName.localeCompare(b.professionalName));
}
