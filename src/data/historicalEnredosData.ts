import type { School, YearHistory } from '../types/carnaval';
import {
  CANONICAL_2026_ENREDOS,
  getCanonical2026Enredo,
  CANONICAL_2024_ENREDOS,
  getCanonical2024Enredo,
  CANONICAL_2023_ENREDOS,
  getCanonical2023Enredo,
  CANONICAL_2022_ENREDOS,
  getCanonical2022Enredo,
  CANONICAL_2020_ENREDOS,
  getCanonical2020Enredo,
  CANONICAL_2019_ENREDOS,
  getCanonical2019Enredo,
  CANONICAL_2018_ENREDOS,
  getCanonical2018Enredo,
  CANONICAL_2017_ENREDOS,
  getCanonical2017Enredo,
  CANONICAL_2016_ENREDOS,
  getCanonical2016Enredo,
  normalizeCanonicalSchoolId
} from './canonicalEnredosRegistry';

export {
  CANONICAL_2026_ENREDOS,
  getCanonical2026Enredo,
  CANONICAL_2024_ENREDOS,
  getCanonical2024Enredo,
  CANONICAL_2023_ENREDOS,
  getCanonical2023Enredo,
  CANONICAL_2022_ENREDOS,
  getCanonical2022Enredo,
  CANONICAL_2020_ENREDOS,
  getCanonical2020Enredo,
  CANONICAL_2019_ENREDOS,
  getCanonical2019Enredo,
  CANONICAL_2018_ENREDOS,
  getCanonical2018Enredo,
  CANONICAL_2017_ENREDOS,
  getCanonical2017Enredo,
  CANONICAL_2016_ENREDOS,
  getCanonical2016Enredo,
  normalizeCanonicalSchoolId
};

export const HISTORICAL_ENREDOS_BY_YEAR: Record<number, Record<string, string>> = {
  2026: {
    viradouro: 'Pra cima, Ciça!',
    beija_flor: 'Bembé',
    vila_isabel: 'Macumbembê, Samborembá - Sonhei que um sambista sonhou a África',
    salgueiro: 'A Delirante Jornada Carnavalesca da Professora que não tinha medo de Bruxa, de Bacalhau e nem do Pirata da Perna-de-Pau',
    imperatriz: 'Camaleônico',
    mangueira: 'Mestre Sacaca do Encanto Tucuju - O Guardião da Amazônia Negra',
    tijuca: 'Carolina Maria de Jesus',
    grande_rio: 'A Nação do Mangue',
    tuiuti: 'Lonã Ifá Lukumi',
    portela: 'O Mistério do Príncipe do Bará - A Oração do Negrinho e a Ressurreição de Sua Coroa sob o Céu Aberto do Rio Grande',
    mocidade: 'Rita Lee, a Padroeira da Liberdade',
    niteroi: 'Do alto do Mulungu surge a esperança: Lula, o operário do Brasil',
    marica: 'Berenguendéns & Balangandãs',
    imperio_serrano: 'Ponciá Evaristo, Flor do Mulungu',
    unidos_padre_miguel: 'Kunhã-Eté: O Sopro Sagrado da Jurema',
    padre_miguel: 'Kunhã-Eté: O Sopro Sagrado da Jurema',
    porto_da_pedra: 'Das Mais Antigas da Vida, o Doce e Amargo Beijo da Noite',
    uniao_da_ilha: 'Viva o hoje! O amanhã? Fica pra Depois',
    estacio_de_sa: 'Tata Tancredo - O Papa Negro no Terreiro do Estácio',
    em_cima_da_hora: 'Salve Todas as Marias – Laroyê, Pombagiras!',
    unidos_da_ponte: 'Tamborzão – O Rio é Baile! O Poder é Black!',
    unidos_de_bangu: 'As Coisas que Mamãe me Ensinou',
    arranco: 'A Gargalhada é o Xamego da Vida',
    arranco_do_engenho_de_dentro: 'A Gargalhada é o Xamego da Vida',
    botafogo_samba_clube: 'O Brasil que Floresce em Arte',
    parque_acari: 'Brasiliana',
    uniao_do_parque_acari: 'Brasiliana',
    inocentes: 'O Sonho de um Tal Pagode Russo nos Frevos do meu Pernambuco',
    santa_cruz: 'Os Filhos da Noite',
    vigario_geral: 'Brasil Incógnito - O Que Os Seus Olhos Não Veem, A Minha Imaginação Reinventa',
    jacarezinho: 'O ar que se respira agora inspira novos tempos',
    sao_clemente: 'Quem Avisa Amigo É',
    caprichosos_de_pilares: 'Caprichando no Samba',
    tradicao: 'Tradição É Tradição',
    cubango: 'No Rastro da Onça',
    rocinha: 'A Rocinha É Nossa Casa',
    lins_imperial: 'Mazzaropi, o Poeta Caipira',
    sereno_campo_grande: 'O Sertão de Suassuna',
    leao_zona_oeste: 'A Dança dos Quatro Cantos',
    casa_de_malandro: 'No Compasso da Boêmia'
  },
  2025: {
    beija_flor: 'Laíla de todos os Santos, Laíla de todos os Sambas',
    grande_rio: 'Pororocas Parawaras: As águas dos meus encantos nas contas dos curimbós',
    imperatriz: 'Ómi Tútú ao Olúfon - Água Fresca para o Senhor de Ifón',
    viradouro: 'Malunguinho - o Mensageiro de Três Mundos',
    portela: 'Cantar Será Buscar o caminho que vai dar no Sol - Uma homenagem a Milton Nascimento',
    mangueira: 'À Flor da Terra – No Rio da Negritude entre Dores e Paixões',
    salgueiro: 'Salgueiro de Corpo Fechado',
    vila_isabel: 'Quanto mais eu Rezo, mais Assombração aparece!',
    tijuca: 'Logun-Edé - Santo Menino que Velho Respeita',
    tuiuti: 'Quem tem medo de Xica Manicongo?',
    paraiso_do_tuiuti: 'Quem tem medo de Xica Manicongo?',
    mocidade: 'Voltando para o Futuro - Não há Limites pra Sonhar',
    mocidade_independente: 'Voltando para o Futuro - Não há Limites pra Sonhar',
    unidos_padre_miguel: 'Egbé Iyá Nassô',
    padre_miguel: 'Egbé Iyá Nassô',
    // Série Ouro 2025
    niteroi: 'Vixe Maria',
    academicos_de_niteroi: 'Vixe Maria',
    estacio_de_sa: 'O Leão se Engerou em Encantado Amazônico',
    estacio: 'O Leão se Engerou em Encantado Amazônico',
    porto_da_pedra: 'A História que a Borracha do Tempo não Apagou!',
    unidos_do_porto_da_pedra: 'A História que a Borracha do Tempo não Apagou!',
    uniao_da_ilha: 'BA-DER-NA! Maria do Povo',
    ilha: 'BA-DER-NA! Maria do Povo',
    marica: 'O Cavalo de Santíssimo e a Coroa do Seu 7',
    uniao_de_marica: 'O Cavalo de Santíssimo e a Coroa do Seu 7',
    vigario_geral: 'Ecos de um Vagalume',
    academicos_de_vigario_geral: 'Ecos de um Vagalume',
    arranco: 'Mães que Alimentam o Sagrado',
    arranco_do_engenho_de_dentro: 'Mães que Alimentam o Sagrado',
    parque_acari: 'Cordas de Prata, o Retrato Musical do Povo',
    uniao_do_parque_acari: 'Cordas de Prata, o Retrato Musical do Povo',
    em_cima_da_hora: 'Ópera dos Terreiros - O Canto do Encanto da Alma Brasileira',
    inocentes: 'Ewe, a Cura vem da Floresta',
    inocentes_de_belford_roxo: 'Ewe, a Cura vem da Floresta',
    botafogo_samba_clube: 'Uma Gloriosa História em Preto e Branco',
    botafogo: 'Uma Gloriosa História em Preto e Branco',
    sao_clemente: 'A São Clemente dá Voz a quem não tem',
    tradicao: 'Reza',
    // Hors concours 2025
    imperio_serrano: 'O que Espanta Miséria é Festa',
    unidos_da_ponte: 'Antropoceno',
    ponte: 'Antropoceno',
    unidos_de_bangu: "Maraka' Anandê: Resistência Ancestral",
    bangu: "Maraka' Anandê: Resistência Ancestral"
  },
  2024: {
    viradouro: 'Arroboboi, Dangbé',
    unidos_do_viradouro: 'Arroboboi, Dangbé',
    imperatriz: 'Com a sorte virada pra lua segundo o testamento da cigana Esmeralda',
    imperatriz_leopoldinense: 'Com a sorte virada pra lua segundo o testamento da cigana Esmeralda',
    grande_rio: 'Nosso destino é ser onça!',
    academicos_do_grande_rio: 'Nosso destino é ser onça!',
    salgueiro: 'Hutukara',
    academicos_do_salgueiro: 'Hutukara',
    portela: 'Um defeito de cor',
    vila_isabel: 'Gbalá - Viagem ao templo da criação!',
    unidos_de_vila_isabel: 'Gbalá - Viagem ao templo da criação!',
    mangueira: 'A Negra Voz do Amanhã',
    estacao_primeira_de_mangueira: 'A Negra Voz do Amanhã',
    beija_flor: 'Um delírio de Carnaval na Maceió de Rás Gonguila',
    beija_flor_de_nilopolis: 'Um delírio de Carnaval na Maceió de Rás Gonguila',
    tuiuti: 'Glória ao Almirante Negro',
    paraiso_do_tuiuti: 'Glória ao Almirante Negro',
    mocidade: 'Pede caju que dou... Pé de caju que dá!',
    mocidade_independente: 'Pede caju que dou... Pé de caju que dá!',
    mocidade_independente_de_padre_miguel: 'Pede caju que dou... Pé de caju que dá!',
    tijuca: 'O conto de fados',
    unidos_da_tijuca: 'O conto de fados',
    porto_da_pedra: 'Lunário Perpétuo: A profética do saber popular',
    unidos_do_porto_da_pedra: 'Lunário Perpétuo: A profética do saber popular',
    // Série Ouro 2024
    unidos_padre_miguel: 'O Redentor do Sertão',
    padre_miguel: 'O Redentor do Sertão',
    imperio_serrano: 'Ilú-ọba Ọ̀yọ́: a gira dos ancestrais',
    estacio_de_sa: 'Chão de devoção: orgulho ancestral',
    estacio: 'Chão de devoção: orgulho ancestral',
    marica: 'O esperançar do poeta',
    uniao_de_marica: 'O esperançar do poeta',
    sao_clemente: 'Que grande destino reservam pra você!',
    inocentes: 'Debret pintou, camelô gritou: compre 2 leve 3! Tudo para agradar o freguês!',
    inocentes_de_belford_roxo: 'Debret pintou, camelô gritou: compre 2 leve 3! Tudo para agradar o freguês!',
    uniao_da_ilha: 'Doum e Amora: crianças para transformar o mundo!',
    ilha: 'Doum e Amora: crianças para transformar o mundo!',
    niteroi: 'Catopês – Um céu de fitas',
    academicos_de_niteroi: 'Catopês – Um céu de fitas',
    vigario_geral: 'Maracanaú: Bem-vindos ao maior São João do Planeta!',
    academicos_de_vigario_geral: 'Maracanaú: Bem-vindos ao maior São João do Planeta!',
    unidos_de_bangu: 'Jorge da Capadócia',
    bangu: 'Jorge da Capadócia',
    unidos_da_ponte: 'Tendendém - O axé do epô pupá',
    ponte: 'Tendendém - O axé do epô pupá',
    em_cima_da_hora: 'A nossa luta continua',
    parque_acari: 'Ilê Aiyê, 50 anos de luta e de resistência',
    uniao_do_parque_acari: 'Ilê Aiyê, 50 anos de luta e de resistência',
    arranco: 'Nise - Reimaginação da Loucura',
    arranco_do_engenho_de_dentro: 'Nise - Reimaginação da Loucura',
    imperio_da_tijuca: 'Sou Lia de Itamaracá cirandando a vida na beira do mar',
    sereno_campo_grande: '4 de dezembro',
    sereno: '4 de dezembro'
  },
  2023: {
    // Grupo Especial 2023
    imperatriz: 'O Aperreio do Cabra que o Excomungado Tratou com Má-Querença e o Santíssimo não Deu Guarida',
    imperatriz_leopoldinense: 'O Aperreio do Cabra que o Excomungado Tratou com Má-Querença e o Santíssimo não Deu Guarida',
    viradouro: 'Rosa Maria Egipcíaca',
    unidos_do_viradouro: 'Rosa Maria Egipcíaca',
    vila_isabel: 'Nessa Festa, Eu Levo Fé!',
    unidos_de_vila_isabel: 'Nessa Festa, Eu Levo Fé!',
    beija_flor: 'Brava Gente! O Grito dos Excluídos no Bicentenário da Independência',
    beija_flor_de_nilopolis: 'Brava Gente! O Grito dos Excluídos no Bicentenário da Independência',
    mangueira: 'As Áfricas que a Bahia Canta',
    estacao_primeira_de_mangueira: 'As Áfricas que a Bahia Canta',
    grande_rio: 'Ô Zeca, o Pagode Onde É que É? Andei Descalço, Carroça e Trem, Procurando por Xerém, Pra Te Ver, Pra Te Abraçar, Pra Beber e Batucar!',
    academicos_do_grande_rio: 'Ô Zeca, o Pagode Onde É que É? Andei Descalço, Carroça e Trem, Procurando por Xerém, Pra Te Ver, Pra Te Abraçar, Pra Beber e Batucar!',
    salgueiro: 'Delírios de Um Paraíso Vermelho',
    academicos_do_salgueiro: 'Delírios de Um Paraíso Vermelho',
    tuiuti: 'Mogangueiro da Cara Preta',
    paraiso_do_tuiuti: 'Mogangueiro da Cara Preta',
    tijuca: 'É Onda Que Vai... É Onda que Vem... Serei a Baía de Todos os Santos a Se Mirar no Samba da Minha Terra',
    unidos_da_tijuca: 'É Onda Que Vai... É Onda que Vem... Serei a Baía de Todos os Santos a Se Mirar no Samba da Minha Terra',
    portela: 'O Azul que Vem do Infinito',
    mocidade: 'Terra de Meu Céu, Estrelas de Meu Chão',
    mocidade_independente: 'Terra de Meu Céu, Estrelas de Meu Chão',
    mocidade_independente_de_padre_miguel: 'Terra de Meu Céu, Estrelas de Meu Chão',
    imperio_serrano: 'Lugares de Arlindo',

    // Série Ouro 2023
    porto_da_pedra: 'A Invenção da Amazônia',
    unidos_do_porto_da_pedra: 'A Invenção da Amazônia',
    unidos_padre_miguel: 'Baião de Mouros',
    padre_miguel: 'Baião de Mouros',
    inocentes: 'Mulheres de Barro',
    inocentes_de_belford_roxo: 'Mulheres de Barro',
    imperio_da_tijuca: 'Cores do Axé',
    niteroi: 'O Carnaval da Vitória',
    academicos_de_niteroi: 'O Carnaval da Vitória',
    uniao_da_ilha: 'O Encontro das Águias no Templo de Momo',
    ilha: 'O Encontro das Águias no Templo de Momo',
    sao_clemente: 'O Achamento do Velho Mundo',
    estacio_de_sa: 'São João, São Luís, Maranhão! Acende a Fogueira do Meu Coração!',
    estacio: 'São João, São Luís, Maranhão! Acende a Fogueira do Meu Coração!',
    unidos_de_bangu: 'Aganjú - A Visão do Fogo, A Voz do Trovão no Reino de Oyó',
    bangu: 'Aganjú - A Visão do Fogo, A Voz do Trovão no Reino de Oyó',
    vigario_geral: 'A Fantástica Fábrica da Alegria',
    academicos_de_vigario_geral: 'A Fantástica Fábrica da Alegria',
    unidos_da_ponte: 'Liberte Nosso Sagrado: O Legado Ancestral de Mãe Meninazinha de Oxum',
    ponte: 'Liberte Nosso Sagrado: O Legado Ancestral de Mãe Meninazinha de Oxum',
    arranco: 'Zé Espinguela - Chão do Meu Terreiro',
    arranco_do_engenho_de_dentro: 'Zé Espinguela - Chão do Meu Terreiro',
    em_cima_da_hora: 'Esperança, Presente!',
    lins_imperial: 'Madame Satã: Resistir Para Existir',
    lins: 'Madame Satã: Resistir Para Existir',
    uniao_de_jacarepagua: 'Manoel Congo, Mariana Crioula - Heróis da Liberdade no Vale do Café',
    jacarepagua: 'Manoel Congo, Mariana Crioula - Heróis da Liberdade no Vale do Café'
  },
  2022: {
    // Grupo Especial 2022
    grande_rio: 'Fala, Majeté! Sete Chaves de Exu',
    academicos_do_grande_rio: 'Fala, Majeté! Sete Chaves de Exu',
    beija_flor: 'Empretecer o Pensamento é Ouvir a Voz da Beija-Flor',
    beija_flor_de_nilopolis: 'Empretecer o Pensamento é Ouvir a Voz da Beija-Flor',
    viradouro: 'Não há Tristeza que possa Suportar tanta Alegria',
    unidos_do_viradouro: 'Não há Tristeza que possa Suportar tanta Alegria',
    vila_isabel: 'Canta, canta, minha gente! A Vila é de Martinho!',
    unidos_de_vila_isabel: 'Canta, canta, minha gente! A Vila é de Martinho!',
    portela: 'Igi Osè Baobá',
    salgueiro: 'Resistência',
    academicos_do_salgueiro: 'Resistência',
    mangueira: 'Angenor, José & Laurindo',
    estacao_primeira_de_mangueira: 'Angenor, José & Laurindo',
    mocidade: 'Batuque ao Caçador',
    mocidade_independente: 'Batuque ao Caçador',
    mocidade_independente_de_padre_miguel: 'Batuque ao Caçador',
    tijuca: 'Waranã - A Reexistência Vermelha',
    unidos_da_tijuca: 'Waranã - A Reexistência Vermelha',
    imperatriz: 'Meninos, eu vivi... Onde canta o sabiá, onde cantam Dalva e Lamartine',
    imperatriz_leopoldinense: 'Meninos, eu vivi... Onde canta o sabiá, onde cantam Dalva e Lamartine',
    tuiuti: 'Ka Ríba Tí Ye - Que Nossos Caminhos se Abram',
    paraiso_do_tuiuti: 'Ka Ríba Tí Ye - Que Nossos Caminhos se Abram',
    sao_clemente: 'Minha Vida é uma Peça',

    // Série Ouro 2022
    imperio_serrano: 'Mangangá',
    porto_da_pedra: 'O Caçador que traz Alegrias',
    unidos_do_porto_da_pedra: 'O Caçador que traz Alegrias',
    uniao_da_ilha: 'O Vendedor de Orações',
    ilha: 'O Vendedor de Orações',
    inocentes: 'A Meia-Noite dos Tambores Silenciosos',
    inocentes_de_belford_roxo: 'A Meia-Noite dos Tambores Silenciosos',
    unidos_padre_miguel: 'Iroko - É Tempo de Xirê',
    padre_miguel: 'Iroko - É Tempo de Xirê',
    academicos_do_sossego: 'Visões Xamânicas',
    sossego: 'Visões Xamânicas',
    unidos_de_bangu: 'Deu Castor na Cabeça',
    bangu: 'Deu Castor na Cabeça',
    estacio_de_sa: 'Cobra Coral, Papagaio-Vintém. #VESTIRUBRONEGRO não tem pra ninguém',
    estacio: 'Cobra Coral, Papagaio-Vintém. #VESTIRUBRONEGRO não tem pra ninguém',
    imperio_da_tijuca: 'Samba de Quilombo - A Resistência pela Raiz',
    vigario_geral: 'Pequena África: da Escravidão ao Pertencimento - Camadas de Memórias entre o Mar e o Morro',
    academicos_de_vigario_geral: 'Pequena África: da Escravidão ao Pertencimento - Camadas de Memórias entre o Mar e o Morro',
    unidos_da_ponte: 'Santa Dulce dos Pobres - O Anjo Bom da Bahia',
    ponte: 'Santa Dulce dos Pobres - O Anjo Bom da Bahia',
    lins_imperial: 'Mussum Pra Sempris - Traga o Mé que hoje com a Lins vai ter muito samba no pé!',
    lins: 'Mussum Pra Sempris - Traga o Mé que hoje com a Lins vai ter muito samba no pé!',
    em_cima_da_hora: '33 - Destino Dom Pedro II',
    santa_cruz: 'Axé! Milton Gonçalves no Catupé da Santa Cruz',
    academicos_de_santa_cruz: 'Axé! Milton Gonçalves no Catupé da Santa Cruz',
    cubango: 'O Amor Preto Cura: Chica Xavier, a Mãe Baiana do Brasil',
    academicos_do_cubango: 'O Amor Preto Cura: Chica Xavier, a Mãe Baiana do Brasil'
  },
  2020: {
    // Grupo Especial 2020
    viradouro: 'Viradouro de Alma Lavada',
    unidos_do_viradouro: 'Viradouro de Alma Lavada',
    grande_rio: 'Tata Londirá: o Canto do Caboclo no Quilombo de Caxias',
    academicos_do_grande_rio: 'Tata Londirá: o Canto do Caboclo no Quilombo de Caxias',
    mocidade: 'Elza Deusa Soares',
    mocidade_independente: 'Elza Deusa Soares',
    mocidade_independente_de_padre_miguel: 'Elza Deusa Soares',
    beija_flor: 'Se Essa Rua Fosse Minha',
    beija_flor_de_nilopolis: 'Se Essa Rua Fosse Minha',
    salgueiro: 'O Rei Negro do Picadeiro',
    academicos_do_salgueiro: 'O Rei Negro do Picadeiro',
    mangueira: 'A Verdade vos fará Livre',
    estacao_primeira_de_mangueira: 'A Verdade vos fará Livre',
    portela: 'Guajupiá - Terra sem Males',
    vila_isabel: 'Gigante pela própria Natureza: Jaçanã e um Índio chamado Brasil',
    unidos_de_vila_isabel: 'Gigante pela própria Natureza: Jaçanã e um Índio chamado Brasil',
    tijuca: 'Onde Moram os Sonhos',
    unidos_da_tijuca: 'Onde Moram os Sonhos',
    sao_clemente: 'O Conto do Vigário',
    tuiuti: 'O Santo e o Rei: Encantarias de Sebastião',
    paraiso_do_tuiuti: 'O Santo e o Rei: Encantarias de Sebastião',
    estacio_de_sa: 'Pedra',
    estacio: 'Pedra',
    uniao_da_ilha: 'Nas Encruzilhadas da Vida, entre becos, ruas e vielas, a Sorte está Lançada: Salvem-se quem puder!',
    ilha: 'Nas Encruzilhadas da Vida, entre becos, ruas e vielas, a Sorte está Lançada: Salvem-se quem puder!',

    // Série Ouro 2020
    imperatriz: 'Só dá Lalá',
    imperatriz_leopoldinense: 'Só dá Lalá',
    unidos_padre_miguel: 'Ginga',
    padre_miguel: 'Ginga',
    porto_da_pedra: 'O que é que a Baiana tem? Do Bonfim à Sapucaí',
    unidos_do_porto_da_pedra: 'O que é que a Baiana tem? Do Bonfim à Sapucaí',
    inocentes: 'Marta do Brasil - Chorar no Começo para Sorrir no Fim',
    inocentes_de_belford_roxo: 'Marta do Brasil - Chorar no Começo para Sorrir no Fim',
    cubango: 'A Voz da Liberdade',
    academicos_do_cubango: 'A Voz da Liberdade',
    imperio_da_tijuca: 'Quimeras de um Eterno Aprendiz',
    santa_cruz: 'Santa Cruz de Barbalha - Um conto popular no Cariri Cearense',
    academicos_de_santa_cruz: 'Santa Cruz de Barbalha - Um conto popular no Cariri Cearense',
    academicos_do_sossego: 'Os Tambores de Olokun',
    sossego: 'Os Tambores de Olokun',
    imperio_serrano: 'Lugar de Mulher é onde ela Quiser!',
    unidos_de_bangu: 'Memórias de um Griô: a Diáspora Africana numa Idade nada Moderna e muito menos Contemporânea',
    bangu: 'Memórias de um Griô: a Diáspora Africana numa Idade nada Moderna e muito menos Contemporânea',
    vigario_geral: 'O Conto do Vigário',
    academicos_de_vigario_geral: 'O Conto do Vigário',
    unidos_da_ponte: 'Elos da Eternidade',
    ponte: 'Elos da Eternidade',
    renascer_jacarepagua: 'Eu que te Benzo, Deus que te Cura',
    renascer_de_jacarepagua: 'Eu que te Benzo, Deus que te Cura',
    renascer: 'Eu que te Benzo, Deus que te Cura',
    rocinha: 'A Guerreira Negra que Dominou Dois Mundos',
    academicos_da_rocinha: 'A Guerreira Negra que Dominou Dois Mundos'
  },
  2019: {
    // Grupo Especial 2019
    mangueira: 'História pra Ninar Gente Grande',
    estacao_primeira_de_mangueira: 'História pra Ninar Gente Grande',
    viradouro: 'Viraviradouro!',
    unidos_do_viradouro: 'Viraviradouro!',
    vila_isabel: 'Em Nome do Pai, do Filho e dos Santos, a Vila canta a Cidade de Pedro',
    unidos_de_vila_isabel: 'Em Nome do Pai, do Filho e dos Santos, a Vila canta a Cidade de Pedro',
    portela: 'Na Madureira Moderníssima, Hei Sempre de Ouvir Cantar uma Sabiá',
    salgueiro: 'Xangô',
    academicos_do_salgueiro: 'Xangô',
    mocidade: 'Eu sou o Tempo. Tempo é Vida',
    mocidade_independente: 'Eu sou o Tempo. Tempo é Vida',
    mocidade_independente_de_padre_miguel: 'Eu sou o Tempo. Tempo é Vida',
    tijuca: 'Cada Macaco no seu Galho. Ó, meu Pai! Me dê o Pão que eu não Morro de Fome!',
    unidos_da_tijuca: 'Cada Macaco no seu Galho. Ó, meu Pai! Me dê o Pão que eu não Morro de Fome!',
    tuiuti: 'O Salvador da Pátria',
    paraiso_do_tuiuti: 'O Salvador da Pátria',
    grande_rio: 'Quem Nunca...? Que Atire a Primeira Pedra',
    academicos_do_grande_rio: 'Quem Nunca...? Que Atire a Primeira Pedra',
    uniao_da_ilha: 'A Peleja Poética entre Rachel e Alencar no Avarandado do Céu',
    ilha: 'A Peleja Poética entre Rachel e Alencar no Avarandado do Céu',
    beija_flor: 'Quem não viu, vai ver... As Fábulas do Beija-Flor',
    beija_flor_de_nilopolis: 'Quem não viu, vai ver... As Fábulas do Beija-Flor',
    sao_clemente: 'E o Samba Sambou...',
    imperatriz: 'Me dá um Dinheiro aí',
    imperatriz_leopoldinense: 'Me dá um Dinheiro aí',
    imperio_serrano: 'O que é, o que é?',

    // Série Ouro 2019
    estacio_de_sa: 'A Fé que Emerge das Águas',
    estacio: 'A Fé que Emerge das Águas',
    cubango: 'Igbá Cubango - A Alma das Coisas e a Arte dos Milagres',
    academicos_do_cubango: 'Igbá Cubango - A Alma das Coisas e a Arte dos Milagres',
    porto_da_pedra: 'Antônio Pitanga - Um Negro em Movimento',
    unidos_do_porto_da_pedra: 'Antônio Pitanga - Um Negro em Movimento',
    imperio_da_tijuca: 'Império do Café, o Vale da Esperança',
    santa_cruz: 'Ruth de Souza – Senhora Liberdade, Abre as Asas sobre Nós',
    academicos_de_santa_cruz: 'Ruth de Souza – Senhora Liberdade, Abre as Asas sobre Nós',
    unidos_padre_miguel: 'Qualquer Semelhança não terá sido mera Coincidência',
    padre_miguel: 'Qualquer Semelhança não terá sido mera Coincidência',
    renascer_jacarepagua: 'Dois de Fevereiro, no Rio Vermelho',
    renascer_de_jacarepagua: 'Dois de Fevereiro, no Rio Vermelho',
    renascer: 'Dois de Fevereiro, no Rio Vermelho',
    unidos_de_bangu: 'Do Ventre da Terra, Raízes para o Mundo',
    bangu: 'Do Ventre da Terra, Raízes para o Mundo',
    inocentes: 'O Frasco do Bandoleiro',
    inocentes_de_belford_roxo: 'O Frasco do Bandoleiro',
    unidos_da_ponte: 'Oferendas',
    ponte: 'Oferendas',
    rocinha: 'Bananas para o Preconceito',
    academicos_da_rocinha: 'Bananas para o Preconceito',
    academicos_do_sossego: 'Não se meta com minha fé, acredito em quem quiser',
    sossego: 'Não se meta com minha fé, acredito em quem quiser',
    alegria_da_zona_sul: 'Saravá, Umbanda!',
    alegria: 'Saravá, Umbanda!'
  },
  2018: {
    // Grupo Especial 2018
    beija_flor: 'Monstro é Aquele que não sabe Amar. Os Filhos Abandonados da Pátria que os pariu',
    beija_flor_de_nilopolis: 'Monstro é Aquele que não sabe Amar. Os Filhos Abandonados da Pátria que os pariu',
    tuiuti: 'Meu Deus, meu Deus, está Extinta a Escravidão?',
    paraiso_do_tuiuti: 'Meu Deus, meu Deus, está Extinta a Escravidão?',
    salgueiro: 'Senhoras do Ventre do Mundo',
    academicos_do_salgueiro: 'Senhoras do Ventre do Mundo',
    portela: 'De Repente de Lá Pra Cá e Dirrepente de Cá Pra Lá',
    mangueira: 'Com Dinheiro ou sem Dinheiro, eu Brinco!',
    estacao_primeira_de_mangueira: 'Com Dinheiro ou sem Dinheiro, eu Brinco!',
    mocidade: 'Namastê: a Estrela que habita em mim saúda a que existe em você',
    mocidade_independente: 'Namastê: a Estrela que habita em mim saúda a que existe em você',
    mocidade_independente_de_padre_miguel: 'Namastê: a Estrela que habita em mim saúda a que existe em você',
    tijuca: 'Um Coração Urbano: Miguel, o Arcanjo das Artes, saúda o povo e pede passagem',
    unidos_da_tijuca: 'Um Coração Urbano: Miguel, o Arcanjo das Artes, saúda o povo e pede passagem',
    imperatriz: 'Uma Noite Real no Museu Nacional',
    imperatriz_leopoldinense: 'Uma Noite Real no Museu Nacional',
    vila_isabel: 'Corra que o Futuro vem aí!',
    unidos_de_vila_isabel: 'Corra que o Futuro vem aí!',
    uniao_da_ilha: 'Brasil Bom de Boca',
    ilha: 'Brasil Bom de Boca',
    sao_clemente: 'Academicamente Popular',
    grande_rio: 'Vai para o Trono ou não Vai?',
    academicos_do_grande_rio: 'Vai para o Trono ou não Vai?',
    imperio_serrano: 'O Império do Samba na Rota da China',

    // Série Ouro 2018
    viradouro: 'Vira a Cabeça, pira o Coração. Loucos Gênios da Criação',
    unidos_do_viradouro: 'Vira a Cabeça, pira o Coração. Loucos Gênios da Criação',
    unidos_padre_miguel: 'O Eldorado Submerso - Delírio Tupi-Parintintin',
    padre_miguel: 'O Eldorado Submerso - Delírio Tupi-Parintintin',
    porto_da_pedra: 'Rainhas do Rádio - Nas Ondas da Emoção, o Tigre Coroa as Divas da Canção!',
    unidos_do_porto_da_pedra: 'Rainhas do Rádio - Nas Ondas da Emoção, o Tigre Coroa as Divas da Canção!',
    inocentes: 'Mojú, Magé, Mojubá - Sinfonias e Batuques',
    inocentes_de_belford_roxo: 'Mojú, Magé, Mojubá - Sinfonias e Batuques',
    cubango: 'O Rei que Bordou o Mundo',
    academicos_do_cubango: 'O Rei que Bordou o Mundo',
    estacio_de_sa: 'No Pregão da Folia sou Comerciante da Alegria e com a Estácio Boto Banca na Avenida',
    estacio: 'No Pregão da Folia sou Comerciante da Alegria e com a Estácio Boto Banca na Avenida',
    imperio_da_tijuca: 'Olubajé – Um Banquete para o Rei',
    alegria_da_zona_sul: 'Bravos Malês! A Saga de Luiza Mahin',
    alegria: 'Bravos Malês! A Saga de Luiza Mahin',
    renascer_jacarepagua: 'Renascer de Flechas e de Lobos',
    renascer_de_jacarepagua: 'Renascer de Flechas e de Lobos',
    renascer: 'Renascer de Flechas e de Lobos',
    santa_cruz: 'No Vôo Mágico da Esperança, quem Acredita sempre Alcança',
    academicos_de_santa_cruz: 'No Vôo Mágico da Esperança, quem Acredita sempre Alcança',
    rocinha: 'Madeira Matriz',
    academicos_da_rocinha: 'Madeira Matriz',
    unidos_de_bangu: 'A Travessia da Calunga Grande e a Nobreza Negra no Brasil',
    bangu: 'A Travessia da Calunga Grande e a Nobreza Negra no Brasil',
    academicos_do_sossego: 'Ritualis',
    sossego: 'Ritualis'
  },
  2017: {
    // Grupo Especial 2017
    portela: 'Quem nunca sentiu o corpo arrepiar ao ver esse Rio passar...',
    mocidade: 'As mil e uma noites de uma ‘Mocidade’ prá lá de Marrakesh',
    mocidade_independente: 'As mil e uma noites de uma ‘Mocidade’ prá lá de Marrakesh',
    mocidade_independente_de_padre_miguel: 'As mil e uma noites de uma ‘Mocidade’ prá lá de Marrakesh',
    salgueiro: 'A Divina Comédia do Carnaval',
    academicos_do_salgueiro: 'A Divina Comédia do Carnaval',
    mangueira: 'Só com a Ajuda do Santo',
    estacao_primeira_de_mangueira: 'Só com a Ajuda do Santo',
    grande_rio: 'Ivete do rio ao Rio!',
    academicos_do_grande_rio: 'Ivete do rio ao Rio!',
    beija_flor: 'A Virgem dos Lábios de Mel - Iracema',
    beija_flor_de_nilopolis: 'A Virgem dos Lábios de Mel - Iracema',
    imperatriz: 'Xingu, o clamor que vem da floresta!',
    imperatriz_leopoldinense: 'Xingu, o clamor que vem da floresta!',
    uniao_da_ilha: 'Nzara Ndembu - Glória ao Senhor Tempo',
    ilha: 'Nzara Ndembu - Glória ao Senhor Tempo',
    sao_clemente: 'Onisuáquimalipanse (Envergonhe-se quem pensar mal disso)',
    vila_isabel: 'O Som da Cor',
    unidos_de_vila_isabel: 'O Som da Cor',
    tijuca: 'Música na alma, inspiração de uma nação',
    unidos_da_tijuca: 'Música na alma, inspiração de uma nação',
    tuiuti: 'Carnavaleidoscópio Tropifágico',
    paraiso_do_tuiuti: 'Carnavaleidoscópio Tropifágico',

    // Série Ouro 2017
    imperio_serrano: 'Meu quintal é maior do que o mundo',
    viradouro: 'E todo menino é um Rei',
    unidos_do_viradouro: 'E todo menino é um Rei',
    estacio_de_sa: 'É! O moleque desceu o São Carlos, pegou um sonho e partiu com a Estácio!',
    estacio: 'É! O moleque desceu o São Carlos, pegou um sonho e partiu com a Estácio!',
    unidos_padre_miguel: 'Ossaim: o poder da cura',
    padre_miguel: 'Ossaim: o poder da cura',
    porto_da_pedra: 'O Abre-alas que as Marchinhas vão passar! Porto da Pedra é quem vai ganhar... seu coração!',
    unidos_do_porto_da_pedra: 'O Abre-alas que as Marchinhas vão passar! Porto da Pedra é quem vai ganhar... seu coração!',
    rocinha: 'No saçarico do Marquês, tem mais um freguês. Viriato Ferreira',
    academicos_da_rocinha: 'No saçarico do Marquês, tem mais um freguês. Viriato Ferreira',
    imperio_da_tijuca: 'O Último dos Profetas',
    cubango: 'Versando Nogueira nos cem anos do ritmo que é nó na madeira!',
    academicos_do_cubango: 'Versando Nogueira nos cem anos do ritmo que é nó na madeira!',
    inocentes: 'Vilões - o verso do inverso',
    inocentes_de_belford_roxo: 'Vilões - o verso do inverso',
    renascer_jacarepagua: 'O Papel e o Mar',
    renascer_de_jacarepagua: 'O Papel e o Mar',
    renascer: 'O Papel e o Mar',
    academicos_do_sossego: 'Zezé Motta - A deusa de ébano!',
    sossego: 'Zezé Motta - A deusa de ébano!',
    santa_cruz: 'Vou levar somente o que couber no bolso e no coração... uma viagem de sabedoria além da imaginação',
    academicos_de_santa_cruz: 'Vou levar somente o que couber no bolso e no coração... uma viagem de sabedoria além da imaginação',
    alegria_da_zona_sul: 'Vou festejar com Beth Carvalho, a Madrinha do Samba',
    alegria: 'Vou festejar com Beth Carvalho, a Madrinha do Samba',
    curicica: 'O importante é ser feliz e mais nada!',
    parque_curicica: 'O importante é ser feliz e mais nada!',
    uniao_do_parque_curicica: 'O importante é ser feliz e mais nada!'
  },
  2016: {
    // Grupo Especial 2016
    mangueira: 'Maria Bethânia: a menina dos olhos de Oyá',
    estacao_primeira_de_mangueira: 'Maria Bethânia: a menina dos olhos de Oyá',
    tijuca: 'Semeando sorriso, a Tijuca festeja o solo sagrado!',
    unidos_da_tijuca: 'Semeando sorriso, a Tijuca festeja o solo sagrado!',
    portela: 'No voo da Águia, uma viagem sem fim...',
    salgueiro: 'A Ópera dos Malandros',
    academicos_do_salgueiro: 'A Ópera dos Malandros',
    beija_flor: 'Mineirinho genial! Nova Lima - Cidade natal. Marquês de Sapucaí, o poeta imortal!',
    beija_flor_de_nilopolis: 'Mineirinho genial! Nova Lima - Cidade natal. Marquês de Sapucaí, o poeta imortal!',
    imperatriz: '"É o amor, que mexe com a minha cabeça e me deixa assim". Do sonho de um caipira, nascem os filhos do Brasil',
    imperatriz_leopoldinense: '"É o amor, que mexe com a minha cabeça e me deixa assim". Do sonho de um caipira, nascem os filhos do Brasil',
    grande_rio: 'Fui no Itororó beber água, não achei. Mas achei a bela Santos, e por ela me apaixonei...',
    academicos_do_grande_rio: 'Fui no Itororó beber água, não achei. Mas achei a bela Santos, e por ela me apaixonei...',
    vila_isabel: "Memórias do 'Pai Arraia' - um sonho pernambucano, um legado brasileiro!",
    unidos_de_vila_isabel: "Memórias do 'Pai Arraia' - um sonho pernambucano, um legado brasileiro!",
    sao_clemente: 'Mais de mil palhaços no salão!',
    mocidade: 'O Brasil de La Mancha: sou Miguel, Padre Miguel. Sou Cervantes, sou Quixote cavaleiro, Pixote brasileiro',
    mocidade_independente: 'O Brasil de La Mancha: sou Miguel, Padre Miguel. Sou Cervantes, sou Quixote cavaleiro, Pixote brasileiro',
    mocidade_independente_de_padre_miguel: 'O Brasil de La Mancha: sou Miguel, Padre Miguel. Sou Cervantes, sou Quixote cavaleiro, Pixote brasileiro',
    uniao_da_ilha: 'Olímpico por natureza, todo mundo se encontra no Rio!',
    ilha: 'Olímpico por natureza, todo mundo se encontra no Rio!',
    estacio_de_sa: 'Salve Jorge! O guerreiro na fé',
    estacio: 'Salve Jorge! O guerreiro na fé',

    // Série Ouro 2016
    tuiuti: 'A Farra do Boi',
    paraiso_do_tuiuti: 'A Farra do Boi',
    unidos_padre_miguel: 'O Quinto dos Infernos!',
    padre_miguel: 'O Quinto dos Infernos!',
    viradouro: 'O Alabê de Jerusalém, a saga de Ogundana!',
    unidos_do_viradouro: 'O Alabê de Jerusalém, a saga de Ogundana!',
    imperio_serrano: 'Silas canta Serrinha!',
    porto_da_pedra: 'Palhaço Carequinha, paixão e orgulho de São Gonçalo. Tá certo ou não tá?',
    unidos_do_porto_da_pedra: 'Palhaço Carequinha, paixão e orgulho de São Gonçalo. Tá certo ou não tá?',
    cubango: 'Um banho de mar à fantasia',
    academicos_do_cubango: 'Um banho de mar à fantasia',
    imperio_da_tijuca: 'O tempo ruge, A Sapucaí é grande e o Império aplaude o Felomenal!',
    renascer_jacarepagua: 'Ibejís - Nas brincadeiras de criança: os orixás que viraram santos no Brasil',
    renascer_de_jacarepagua: 'Ibejís - Nas brincadeiras de criança: os orixás que viraram santos no Brasil',
    renascer: 'Ibejís - Nas brincadeiras de criança: os orixás que viraram santos no Brasil',
    inocentes: 'Cacá Diegues - Retratos de um Brasil em cena!',
    inocentes_de_belford_roxo: 'Cacá Diegues - Retratos de um Brasil em cena!',
    alegria_da_zona_sul: 'Ogum',
    alegria: 'Ogum',
    curicica: 'Corações Mamulengos',
    parque_curicica: 'Corações Mamulengos',
    uniao_do_parque_curicica: 'Corações Mamulengos',
    santa_cruz: 'Diz mata! Digo verde. A natureza veste a incerteza. E o amanhã?',
    academicos_de_santa_cruz: 'Diz mata! Digo verde. A natureza veste a incerteza. E o amanhã?',
    rocinha: 'Nova Roma é Brasil, Brasil é Rocinha!',
    academicos_da_rocinha: 'Nova Roma é Brasil, Brasil é Rocinha!',
    caprichosos_de_pilares: 'Tem gringo no samba!',
    caprichosos: 'Tem gringo no samba!'
  },
  2015: {
    // Grupo Especial 2015
    beija_flor: 'Um Griô conta a história: um olhar sobre a África e o despontar da Guiné Equatorial. Caminhemos sobre a trilha de nossa felicidade',
    beija_flor_de_nilopolis: 'Um Griô conta a história: um olhar sobre a África e o despontar da Guiné Equatorial. Caminhemos sobre a trilha de nossa felicidade',
    salgueiro: 'Do fundo do quintal, sabores e saberes na Sapucaí',
    academicos_do_salgueiro: 'Do fundo do quintal, sabores e saberes na Sapucaí',
    grande_rio: 'A Grande Rio é do Baralho!',
    academicos_do_grande_rio: 'A Grande Rio é do Baralho!',
    tijuca: 'Um conto marcado no tempo - O olhar suíço de Clóvis Bornay',
    unidos_da_tijuca: 'Um conto marcado no tempo - O olhar suíço de Clóvis Bornay',
    portela: 'ImaginaRio, 450 janeiros de uma cidade surreal',
    imperatriz: 'Axé Nkenda – Um ritual de liberdade – E que voz da liberdade seja sempre a nossa voz',
    imperatriz_leopoldinense: 'Axé Nkenda – Um ritual de liberdade – E que voz da liberdade seja sempre a nossa voz',
    mocidade: 'Se o mundo fosse acabar, me diz o que você faria se só lhe restasse um dia?',
    mocidade_independente: 'Se o mundo fosse acabar, me diz o que você faria se só lhe restasse um dia?',
    mocidade_independente_de_padre_miguel: 'Se o mundo fosse acabar, me diz o que você faria se só lhe restasse um dia?',
    sao_clemente: 'A incrível história do homem que só tinha medo da Matinta Pereira, da Tocandira e da Onça Pé de Boi!',
    uniao_da_ilha: 'Beleza pura?',
    ilha: 'Beleza pura?',
    mangueira: 'Agora chegou a vez vou cantar: mulher de Mangueira, mulher brasileira em primeiro lugar!',
    estacao_primeira_de_mangueira: 'Agora chegou a vez vou cantar: mulher de Mangueira, mulher brasileira em primeiro lugar!',
    vila_isabel: 'O maestro brasileiro está na terra de Noel, a partitura é azul e branco, da nossa Vila Isabel',
    unidos_de_vila_isabel: 'O maestro brasileiro está na terra de Noel, a partitura é azul e branco, da nossa Vila Isabel',
    viradouro: 'Nas veias do Brasil, é a Viradouro em um dia de graça!',
    unidos_do_viradouro: 'Nas veias do Brasil, é a Viradouro em um dia de graça!',

    // Série Ouro 2015
    estacio_de_sa: 'De braços abertos, de janeiro à janeiro. Sorrio, sou Rio, sou Estácio de Sá!',
    estacio: 'De braços abertos, de janeiro à janeiro. Sorrio, sou Rio, sou Estácio de Sá!',
    unidos_padre_miguel: 'O cavaleiro armorial mandacariza o Carnaval',
    padre_miguel: 'O cavaleiro armorial mandacariza o Carnaval',
    imperio_serrano: 'Poema aos peregrinos da fé!',
    cubango: 'Cubango, a realeza africana de Niterói!',
    academicos_do_cubango: 'Cubango, a realeza africana de Niterói!',
    tuiuti: 'Curumim chama Cunhantã que eu vou contar...',
    paraiso_do_tuiuti: 'Curumim chama Cunhantã que eu vou contar...',
    imperio_da_tijuca: 'O Império nas águas doces de Oxum',
    caprichosos_de_pilares: 'Na minha mão é mais barato!',
    caprichosos: 'Na minha mão é mais barato!',
    inocentes: 'Nelson Sargento - Samba, inocente pé no chão!',
    inocentes_de_belford_roxo: 'Nelson Sargento - Samba, inocente pé no chão!',
    renascer_jacarepagua: 'Candeia! Manifesto ao povo em forma de arte!',
    renascer_de_jacarepagua: 'Candeia! Manifesto ao povo em forma de arte!',
    renascer: 'Candeia! Manifesto ao povo em forma de arte!',
    santa_cruz: 'Um pequeno menino se tonou um Grande Otelo!',
    academicos_de_santa_cruz: 'Um pequeno menino se tonou um Grande Otelo!',
    porto_da_pedra: 'Há uma luz que nunca se apaga!',
    unidos_do_porto_da_pedra: 'Há uma luz que nunca se apaga!',
    curicica: 'Os três tenores... do samba!',
    parque_curicica: 'Os três tenores... do samba!',
    uniao_do_parque_curicica: 'Os três tenores... do samba!',
    alegria_da_zona_sul: 'Kari’Oka',
    alegria: 'Kari’Oka',
    unidos_de_bangu: 'Imperium',
    bangu: 'Imperium',
    em_cima_da_hora: 'No coração da cidade, uma história das Mil e Uma Noites: O Rio das Arábias'
  },
  2014: {
    // Grupo Especial 2014
    tijuca: 'Acelera, Tijuca',
    unidos_da_tijuca: 'Acelera, Tijuca',
    salgueiro: 'Gaia - A vida em nossas mãos',
    academicos_do_salgueiro: 'Gaia - A vida em nossas mãos',
    portela: 'Um Rio de mar a mar: do Valongo à Glória de São Sebastião',
    uniao_da_ilha: 'É brinquedo, é brincadeira: a Ilha vai levantar poeira!',
    ilha: 'É brinquedo, é brincadeira: a Ilha vai levantar poeira!',
    imperatriz: 'Arthur X - O reino do Galinho de Ouro na corte da Imperatriz',
    imperatriz_leopoldinense: 'Arthur X - O reino do Galinho de Ouro na corte da Imperatriz',
    grande_rio: 'Verdes olhos de Maysa sobre o mar, no caminho: Maricá',
    academicos_do_grande_rio: 'Verdes olhos de Maysa sobre o mar, no caminho: Maricá',
    beija_flor: 'O astro iluminado da comunicação brasileira',
    beija_flor_de_nilopolis: 'O astro iluminado da comunicação brasileira',
    mangueira: 'A festança brasileira cai no samba da Mangueira',
    estacao_primeira_de_mangueira: 'A festança brasileira cai no samba da Mangueira',
    mocidade: 'Pernambucópolis',
    mocidade_independente: 'Pernambucópolis',
    mocidade_independente_de_padre_miguel: 'Pernambucópolis',
    vila_isabel: 'Retratos de um Brasil plural',
    unidos_de_vila_isabel: 'Retratos de um Brasil plural',
    sao_clemente: 'Favela',
    imperio_da_tijuca: 'Batuk',

    // Série Ouro 2014
    viradouro: 'Sou a terra de Ismael. Guanabaran vou cruzar, para você tiro o chapéu, Rio eu vim te abraçar',
    unidos_do_viradouro: 'Sou a terra de Ismael. Guanabaran vou cruzar, para você tiro o chapéu, Rio eu vim te abraçar',
    estacio_de_sa: 'Um Rio à beira-mar: ventos do passado em direção ao futuro!',
    estacio: 'Um Rio à beira-mar: ventos do passado em direção ao futuro!',
    unidos_padre_miguel: 'Decifra-me ou te devoro: enigmas da vida!',
    padre_miguel: 'Decifra-me ou te devoro: enigmas da vida!',
    porto_da_pedra: 'Majestades do Samba: os defensores do meu pavilhão!',
    unidos_do_porto_da_pedra: 'Majestades do Samba: os defensores do meu pavilhão!',
    cubango: 'Continente Negro - uma epopeia africana',
    academicos_do_cubango: 'Continente Negro - uma epopeia africana',
    imperio_serrano: 'Angra com os Reis',
    curicica: 'Na garrafa, no barril, salve a cachaça, patrimônio cultural do Brasil',
    parque_curicica: 'Na garrafa, no barril, salve a cachaça, patrimônio cultural do Brasil',
    uniao_do_parque_curicica: 'Na garrafa, no barril, salve a cachaça, patrimônio cultural do Brasil',
    tuiuti: 'Kizomba - A festa da raça',
    paraiso_do_tuiuti: 'Kizomba - A festa da raça',
    caprichosos_de_pilares: 'Dos malandros e das madames: Lapa, a estrela da noite carioca',
    caprichosos: 'Dos malandros e das madames: Lapa, a estrela da noite carioca',
    inocentes: 'O triunfo da América - o canto lírico de Joaquina Lapinha',
    inocentes_de_belford_roxo: 'O triunfo da América - o canto lírico de Joaquina Lapinha',
    renascer_jacarepagua: 'Olhar caricato. Simplesmente, Lan!',
    renascer_de_jacarepagua: 'Olhar caricato. Simplesmente, Lan!',
    renascer: 'Olhar caricato. Simplesmente, Lan!',
    santa_cruz: 'Do toque do criador à cidade saudável do Brasil – Jundiaí, uma referência nacional',
    academicos_de_santa_cruz: 'Do toque do criador à cidade saudável do Brasil – Jundiaí, uma referência nacional',
    em_cima_da_hora: 'Os Sertões',
    alegria_da_zona_sul: 'Sacopenapã',
    alegria: 'Sacopenapã',
    uniao_de_jacarepagua: 'Os Iorubás - A história do povo nagô',
    jacarepagua: 'Os Iorubás - A história do povo nagô',
    rocinha: 'Do paraíso sonhado um sonho realizado...',
    academicos_da_rocinha: 'Do paraíso sonhado um sonho realizado...',
    tradicao: 'Sonhar com Rei dá Leão!'
  },
  2013: {
    // Grupo Especial 2013
    vila_isabel: 'A Vila canta o Brasil celeiro do mundo - Água no feijão que chegou mais um...',
    unidos_de_vila_isabel: 'A Vila canta o Brasil celeiro do mundo - Água no feijão que chegou mais um...',
    beija_flor: 'Amigo fiel - Do cavalo do amanhecer ao Mangalarga Marchador',
    beija_flor_de_nilopolis: 'Amigo fiel - Do cavalo do amanhecer ao Mangalarga Marchador',
    tijuca: 'Desceu num raio, é trovoada! O Deus Thor pede passagem pra mostrar nessa viagem a Alemanha encantada',
    unidos_da_tijuca: 'Desceu num raio, é trovoada! O Deus Thor pede passagem pra mostrar nessa viagem a Alemanha encantada',
    imperatriz: 'Pará - O Muiraquitã do Brasil - Sob a nudez forte da verdade, o manto diáfano da fantasia',
    imperatriz_leopoldinense: 'Pará - O Muiraquitã do Brasil - Sob a nudez forte da verdade, o manto diáfano da fantasia',
    salgueiro: 'Fama',
    academicos_do_salgueiro: 'Fama',
    grande_rio: 'Amo o Rio e vou à luta... Ouro negro sem disputa!',
    academicos_do_grande_rio: 'Amo o Rio e vou à luta... Ouro negro sem disputa!',
    portela: 'Madureira... Onde o meu coração se deixou levar',
    mangueira: 'Cuiabá: Um paraíso no centro da América',
    estacao_primeira_de_mangueira: 'Cuiabá: Um paraíso no centro da América',
    uniao_da_ilha: 'Vinicius, no plural. Paixão, poesia e carnaval',
    ilha: 'Vinicius, no plural. Paixão, poesia e carnaval',
    sao_clemente: 'Horário nobre (das 8 ou das 9, é sempre 10!)',
    mocidade: 'Eu vou de Mocidade com samba e Rock in Rio - Por um mundo melhor',
    mocidade_independente: 'Eu vou de Mocidade com samba e Rock in Rio - Por um mundo melhor',
    mocidade_independente_de_padre_miguel: 'Eu vou de Mocidade com samba e Rock in Rio - Por um mundo melhor',
    inocentes: 'As sete confluências do Rio Han - 50 anos de imigração da Coreia do Sul no Brasil',
    inocentes_de_belford_roxo: 'As sete confluências do Rio Han - 50 anos de imigração da Coreia do Sul no Brasil',

    // Série Ouro 2013
    imperio_da_tijuca: 'Negra, pérola mulher',
    viradouro: 'Nem melhor nem pior, que não sai da minha mente. Inspiração para o meu samba, eu também sou diferente!',
    unidos_do_viradouro: 'Nem melhor nem pior, que não sai da minha mente. Inspiração para o meu samba, eu também sou diferente!',
    imperio_serrano: 'Caxambu - O milagre das águas na fonte do samba',
    estacio_de_sa: 'Rildo Hora: A ópera de um menino... O toque do realejo rege o seu destino!',
    estacio: 'Rildo Hora: A ópera de um menino... O toque do realejo rege o seu destino!',
    rocinha: 'Mistura de sabores e raças: uma feijoada à brasileira',
    academicos_da_rocinha: 'Mistura de sabores e raças: uma feijoada à brasileira',
    caprichosos_de_pilares: 'Fanatismo... Enigma da mente humana',
    caprichosos: 'Fanatismo... Enigma da mente humana',
    unidos_padre_miguel: 'O reencontro entre o céu e a terra no reino de Aláàfin Óyo',
    padre_miguel: 'O reencontro entre o céu e a terra no reino de Aláàfin Óyo',
    renascer_jacarepagua: 'Rio, uma viagem alucinante',
    renascer_de_jacarepagua: 'Rio, uma viagem alucinante',
    renascer: 'Rio, uma viagem alucinante',
    porto_da_pedra: 'Me digas o que calças e eu te direis quem és!',
    unidos_do_porto_da_pedra: 'Me digas o que calças e eu te direis quem és!',
    santa_cruz: 'O dragão do mar e a lenda do Ceará',
    academicos_de_santa_cruz: 'O dragão do mar e a lenda do Ceará',
    cubango: 'Teimosias da imaginação',
    academicos_do_cubango: 'Teimosias da imaginação',
    curicica: 'Quando o samba era samba',
    parque_curicica: 'Quando o samba era samba',
    uniao_do_parque_curicica: 'Quando o samba era samba',
    tuiuti: 'Ao mestre do riso com carinho: as caras do Brasil',
    paraiso_do_tuiuti: 'Ao mestre do riso com carinho: as caras do Brasil',
    alegria_da_zona_sul: 'Quem não chora, não mama...',
    alegria: 'Quem não chora, não mama...',
    uniao_de_jacarepagua: 'Dos Barões do café à cidade universitária. Vassouras, ouro verde do Brasil!',
    jacarepagua: 'Dos Barões do café à cidade universitária. Vassouras, ouro verde do Brasil!',
    tradicao: 'Das maravilhas do mar, fez-se o esplendor de uma noite',
    sereno_campo_grande: 'Na busca da paz, equilíbrio e harmonia. Bem aventurados sejam os que ouvem a voz de Deus!',
    sereno_de_campo_grande: 'Na busca da paz, equilíbrio e harmonia. Bem aventurados sejam os que ouvem a voz de Deus!',
    sereno: 'Na busca da paz, equilíbrio e harmonia. Bem aventurados sejam os que ouvem a voz de Deus!',
    jacarezinho: 'Puxador, não. Intérprete! Por Mestre Jamelão!',
    unidos_do_jacarezinho: 'Puxador, não. Intérprete! Por Mestre Jamelão!',
    vila_santa_tereza: 'Axé - No caminho das águas sagradas',
    unidos_da_vila_santa_tereza: 'Axé - No caminho das águas sagradas'
  },
  2012: {
    // Grupo Especial 2012
    tijuca: 'O dia em que toda a realeza desembarcou na Avenida para coroar o Rei Luiz do Sertão',
    unidos_da_tijuca: 'O dia em que toda a realeza desembarcou na Avenida para coroar o Rei Luiz do Sertão',
    salgueiro: 'Cordel branco e encarnado',
    academicos_do_salgueiro: 'Cordel branco e encarnado',
    vila_isabel: 'Você sembo lá... que eu sambo cá - O canto livre de Angola',
    unidos_de_vila_isabel: 'Você sembo lá... que eu sambo cá - O canto livre de Angola',
    beija_flor: 'São Luís - o poema encantado do Maranhão',
    beija_flor_de_nilopolis: 'São Luís - o poema encantado do Maranhão',
    grande_rio: 'Eu acredito em você. E você? - Histórias de superação',
    academicos_do_grande_rio: 'Eu acredito em você. E você? - Histórias de superação',
    portela: '...E o povo na rua cantando. É feito uma reza, um ritual...',
    mangueira: 'Vou festejar! Sou Cacique, sou Mangueira!',
    estacao_primeira_de_mangueira: 'Vou festejar! Sou Cacique, sou Mangueira!',
    uniao_da_ilha: 'De Londres ao Rio: Era uma vez... uma Ilha...',
    ilha: 'De Londres ao Rio: Era uma vez... uma Ilha...',
    mocidade: 'Por ti, Portinari, rompendo a tela, a realidade',
    mocidade_independente: 'Por ti, Portinari, rompendo a tela, a realidade',
    mocidade_independente_de_padre_miguel: 'Por ti, Portinari, rompendo a tela, a realidade',
    imperatriz: 'Jorge, Amado Jorge',
    imperatriz_leopoldinense: 'Jorge, Amado Jorge',
    sao_clemente: 'Uma aventura musical na Sapucaí',
    porto_da_pedra: 'Da seiva materna ao equilíbrio da vida',
    unidos_do_porto_da_pedra: 'Da seiva materna ao equilíbrio da vida',
    renascer_jacarepagua: 'Romero Britto, o artista da alegria dá o tom na folia',
    renascer_de_jacarepagua: 'Romero Britto, o artista da alegria dá o tom na folia',
    renascer: 'Romero Britto, o artista da alegria dá o tom na folia',

    // Série Ouro 2012
    inocentes: 'Corumbá – Ópera Tupi Guaikuru',
    inocentes_de_belford_roxo: 'Corumbá – Ópera Tupi Guaikuru',
    imperio_serrano: 'Dona Ivone Lara: O enredo do meu samba',
    imperio_da_tijuca: 'Utopias - viagens aos confins da imaginação',
    cubango: 'Barão de Mauá — Sonho de um Brasil moderno',
    academicos_do_cubango: 'Barão de Mauá — Sonho de um Brasil moderno',
    viradouro: 'A vida como ela é, bonitinha, mas ordinária... Assim falou Nelson Rodrigues',
    unidos_do_viradouro: 'A vida como ela é, bonitinha, mas ordinária... Assim falou Nelson Rodrigues',
    santa_cruz: 'Nas ondas do rádio... Acorda Brasil para escutar! O show do Antônio Carlos está no ar!',
    academicos_de_santa_cruz: 'Nas ondas do rádio... Acorda Brasil para escutar! O show do Antônio Carlos está no ar!',
    estacio_de_sa: 'Luma de Oliveira: coração de um país em festa!',
    estacio: 'Luma de Oliveira: coração de um país em festa!',
    rocinha: 'Vou colocar teu nome na praça',
    academicos_da_rocinha: 'Vou colocar teu nome na praça',
    tuiuti: 'Clara Nunes - A tal mineira',
    paraiso_do_tuiuti: 'Clara Nunes - A tal mineira'
  },
  2011: {
    // Grupo Especial 2011
    beija_flor: 'Roberto Carlos: a Simplicidade do Rei',
    beija_flor_de_nilopolis: 'Roberto Carlos: a Simplicidade do Rei',
    tijuca: 'Esta Noite Levarei sua Alma',
    unidos_da_tijuca: 'Esta Noite Levarei sua Alma',
    mangueira: 'O Filho Fiel, sempre Mangueira',
    estacao_primeira_de_mangueira: 'O Filho Fiel, sempre Mangueira',
    vila_isabel: 'Mitos e histórias entrelaçadas pelos fios de cabelo',
    unidos_de_vila_isabel: 'Mitos e histórias entrelaçadas pelos fios de cabelo',
    salgueiro: 'Salgueiro Apresenta: o Rio no Cinema',
    academicos_do_salgueiro: 'Salgueiro Apresenta: o Rio no Cinema',
    imperatriz: 'Imperatriz adverte: sambar faz bem à saúde!',
    imperatriz_leopoldinense: 'Imperatriz adverte: sambar faz bem à saúde!',
    mocidade: 'Parábola dos Divinos Semeadores',
    mocidade_independente: 'Parábola dos Divinos Semeadores',
    mocidade_independente_de_padre_miguel: 'Parábola dos Divinos Semeadores',
    porto_da_pedra: 'O sonho sempre vem pra quem sonhar...',
    unidos_do_porto_da_pedra: 'O sonho sempre vem pra quem sonhar...',
    sao_clemente: 'O seu, o meu, o nosso Rio, abençoado por Deus e bonito por natureza!',
    grande_rio: 'Y-Jurerê Mirim - A Encantadora Ilha das Bruxas (Um conto de Cascaes)',
    academicos_do_grande_rio: 'Y-Jurerê Mirim - A Encantadora Ilha das Bruxas (Um conto de Cascaes)',
    portela: 'Rio, Azul da Cor do Mar',
    uniao_da_ilha: 'O Mistério da Vida',
    ilha: 'O Mistério da Vida',

    // Série Ouro 2011
    renascer_jacarepagua: 'Águas de Março',
    renascer_de_jacarepagua: 'Águas de Março',
    renascer: 'Águas de Março',
    viradouro: 'Quem sou eu sem você?',
    unidos_do_viradouro: 'Quem sou eu sem você?',
    estacio_de_sa: 'Rosas',
    estacio: 'Rosas',
    cubango: 'A emoção está no ar!',
    academicos_do_cubango: 'A emoção está no ar!',
    santa_cruz: 'Paz e amor, o sonho não acabou...',
    academicos_de_santa_cruz: 'Paz e amor, o sonho não acabou...',
    imperio_serrano: 'A Benção, Vinícius',
    imperio_da_tijuca: 'O Mundo em Carnaval - Um olhar sobre a cultura dos povos',
    inocentes: 'De Guarulhos para o palco da folia, sonhos, irreverência e alegria. Mamonas para sempre!',
    inocentes_de_belford_roxo: 'De Guarulhos para o palco da folia, sonhos, irreverência e alegria. Mamonas para sempre!',
    rocinha: 'Rocinha! Estou Vidrado em Você',
    academicos_da_rocinha: 'Rocinha! Estou Vidrado em Você',
    caprichosos_de_pilares: 'Gente Humilde',
    caprichosos: 'Gente Humilde',
    alegria_da_zona_sul: 'Os Doze Obás de Xangô',
    alegria: 'Os Doze Obás de Xangô'
  },
  2010: {
    // Grupo Especial 2010
    tijuca: 'É segredo!',
    unidos_da_tijuca: 'É segredo!',
    grande_rio: 'Das arquibancadas ao Camarote nº 1, um "Grande Rio" de emoção, na Apoteose do seu coração',
    academicos_do_grande_rio: 'Das arquibancadas ao Camarote nº 1, um "Grande Rio" de emoção, na Apoteose do seu coração',
    beija_flor: 'Brilhante ao sol do novo mundo, Brasília: do sonho à realidade, a capital da esperança',
    beija_flor_de_nilopolis: 'Brilhante ao sol do novo mundo, Brasília: do sonho à realidade, a capital da esperança',
    vila_isabel: 'Noël: a presença do "Poeta da Vila"',
    unidos_de_vila_isabel: 'Noël: a presença do "Poeta da Vila"',
    salgueiro: 'Histórias sem fim',
    academicos_do_salgueiro: 'Histórias sem fim',
    mangueira: 'Mangueira é música do Brasil',
    estacao_primeira_de_mangueira: 'Mangueira é música do Brasil',
    mocidade: 'Do paraíso de Deus ao paraíso da loucura, cada um sabe o que procura',
    mocidade_independente: 'Do paraíso de Deus ao paraíso da loucura, cada um sabe o que procura',
    mocidade_independente_de_padre_miguel: 'Do paraíso de Deus ao paraíso da loucura, cada um sabe o que procura',
    imperatriz: 'Brasil de todos os deuses',
    imperatriz_leopoldinense: 'Brasil de todos os deuses',
    portela: 'Derrubando fronteiras, conquistando a liberdade... Rio de paz, em estado de graça!',
    porto_da_pedra: 'Com que roupa... eu vou? Pro samba que você me convidou',
    unidos_do_porto_da_pedra: 'Com que roupa... eu vou? Pro samba que você me convidou',
    uniao_da_ilha: 'Dom Quixote de La Mancha... o cavaleiro dos sonhos impossíveis',
    ilha: 'Dom Quixote de La Mancha... o cavaleiro dos sonhos impossíveis',
    viradouro: 'México, o paraíso das cores, sob o signo do Sol',
    unidos_do_viradouro: 'México, o paraíso das cores, sob o signo do Sol',

    // Série Ouro 2010
    sao_clemente: 'Choque de Ordem na folia',
    inocentes: 'Água para prover a vida',
    inocentes_de_belford_roxo: 'Água para prover a vida',
    estacio_de_sa: 'Deixa falar. A Estácio é isso ai! Eu visto esse manto e vou por ai...',
    estacio: 'Deixa falar. A Estácio é isso ai! Eu visto esse manto e vou por ai...',
    santa_cruz: 'Nos passos do compasso',
    academicos_de_santa_cruz: 'Nos passos do compasso',
    imperio_da_tijuca: 'Suprema Jinga - Senhora do trono Brazngola',
    imperio_serrano: 'João das ruas do Rio',
    caprichosos_de_pilares: 'E por falar em saudade',
    caprichosos: 'E por falar em saudade',
    renascer_jacarepagua: 'Aquaticópolis',
    renascer_de_jacarepagua: 'Aquaticópolis',
    renascer: 'Aquaticópolis',
    cubango: 'Os loucos da praia chamada saudade',
    academicos_do_cubango: 'Os loucos da praia chamada saudade',
    rocinha: 'Ykamiabas',
    academicos_da_rocinha: 'Ykamiabas',
    unidos_padre_miguel: 'Aço – Universo presente na riqueza da Terra – O futuro a ti pertence!',
    padre_miguel: 'Aço – Universo presente na riqueza da Terra – O futuro a ti pertence!',
    tuiuti: 'Eneida, o pierrôt está de volta!',
    paraiso_do_tuiuti: 'Eneida, o pierrôt está de volta!'
  },
  2009: {
    // Grupo Especial 2009
    salgueiro: 'Tambor',
    academicos_do_salgueiro: 'Tambor',
    beija_flor: 'No Chuveiro da Alegria, quem Banha o Corpo Lava a Alma na Folia',
    beija_flor_de_nilopolis: 'No Chuveiro da Alegria, quem Banha o Corpo Lava a Alma na Folia',
    portela: 'E por falar em amor... Onde anda você?',
    vila_isabel: 'Neste palco da folia, é minha Vila que anuncia: Theatro Municipal - A centenária maravilha',
    unidos_de_vila_isabel: 'Neste palco da folia, é minha Vila que anuncia: Theatro Municipal - A centenária maravilha',
    grande_rio: 'Voila, Caxias! Pra sempre Liberté, egalité, fraternité, merci beaucoup, Brésil! Não tem de quê!',
    academicos_do_grande_rio: 'Voila, Caxias! Pra sempre Liberté, egalité, fraternité, merci beaucoup, Brésil! Não tem de quê!',
    mangueira: 'A Mangueira traz os Brasis do Brasil Mostrando a Formação do Povo Brasileiro',
    estacao_primeira_de_mangueira: 'A Mangueira traz os Brasis do Brasil Mostrando a Formação do Povo Brasileiro',
    imperatriz: 'Imperatriz... só quer mostrar que faz samba também',
    imperatriz_leopoldinense: 'Imperatriz... só quer mostrar que faz samba também',
    viradouro: 'Vira-Bahia, Pura Energia',
    unidos_do_viradouro: 'Vira-Bahia, Pura Energia',
    tijuca: 'Tijuca 2009: uma Odisséia sobre o Espaço',
    unidos_da_tijuca: 'Tijuca 2009: uma Odisséia sobre o Espaço',
    porto_da_pedra: 'Não me proíbam criar, pois preciso curiar! Sou o país do futuro; tenho muito a inventar...',
    unidos_do_porto_da_pedra: 'Não me proíbam criar, pois preciso curiar! Sou o país do futuro; tenho muito a inventar...',
    mocidade: 'Mocidade apresenta: Clube Literário Machado de Assis e Guimarães Rosa, estrelas em poesia!',
    mocidade_independente: 'Mocidade apresenta: Clube Literário Machado de Assis e Guimarães Rosa, estrelas em poesia!',
    mocidade_independente_de_padre_miguel: 'Mocidade apresenta: Clube Literário Machado de Assis e Guimarães Rosa, estrelas em poesia!',
    imperio_serrano: 'Lendas das Sereias, Mistérios do Mar',

    // Série Ouro 2009
    uniao_da_ilha: 'Viajar é Preciso - Extraordinárias Através de Mundos Conhecidos e Desconhecidos',
    ilha: 'Viajar é Preciso - Extraordinárias Através de Mundos Conhecidos e Desconhecidos',
    renascer_jacarepagua: 'Como vai, vai bem? Veio a pé ou de trem?',
    renascer_de_jacarepagua: 'Como vai, vai bem? Veio a pé ou de trem?',
    renascer: 'Como vai, vai bem? Veio a pé ou de trem?',
    rocinha: 'Tem Francesinha no Salão... O Rio no meu Coração',
    academicos_da_rocinha: 'Tem Francesinha no Salão... O Rio no meu Coração',
    sao_clemente: 'O Beijo Moleque da São Clemente',
    estacio_de_sa: 'Que Chita Bacana',
    estacio: 'Que Chita Bacana',
    santa_cruz: 'S.O.S Planeta Terra - Santuário da Vida',
    academicos_de_santa_cruz: 'S.O.S Planeta Terra - Santuário da Vida',
    tuiuti: 'O Cassino da Urca',
    paraiso_do_tuiuti: 'O Cassino da Urca',
    imperio_da_tijuca: 'O Mundo de Barro de Mestre Vitalino',
    inocentes: 'Do Rio Grande do Sul ao Rio de Janeiro, a Inocentes canta Brizola, a voz do povo brasileiro',
    inocentes_de_belford_roxo: 'Do Rio Grande do Sul ao Rio de Janeiro, a Inocentes canta Brizola, a voz do povo brasileiro',
    caprichosos_de_pilares: 'No transporte da alegria... Me leva Caprichosos a caminho da folia',
    caprichosos: 'No transporte da alegria... Me leva Caprichosos a caminho da folia'
  },
  2008: {
    // Grupo Especial 2008
    beija_flor: 'Macapaba: equinócio solar, viagens fantásticas ao meio do mundo',
    beija_flor_de_nilopolis: 'Macapaba: equinócio solar, viagens fantásticas ao meio do mundo',
    salgueiro: 'O Rio de Janeiro continua sendo...',
    academicos_do_salgueiro: 'O Rio de Janeiro continua sendo...',
    grande_rio: 'Do verde de Coarí, vem meu gás, Sapucaí!',
    academicos_do_grande_rio: 'Do verde de Coarí, vem meu gás, Sapucaí!',
    portela: 'Reconstruindo a natureza, recriando a vida: o sonho vira realidade',
    tijuca: 'Vou juntando o que eu quiser, minha mania vale ouro. Sou Tijuca, trago a arte colecionando o meu tesouro',
    unidos_da_tijuca: 'Vou juntando o que eu quiser, minha mania vale ouro. Sou Tijuca, trago a arte colecionando o meu tesouro',
    imperatriz: 'João e Marias',
    imperatriz_leopoldinense: 'João e Marias',
    viradouro: 'É de arrepiar',
    unidos_do_viradouro: 'É de arrepiar',
    mocidade: 'O Quinto Império: de Portugal ao Brasil, uma utopia na história',
    mocidade_independente: 'O Quinto Império: de Portugal ao Brasil, uma utopia na história',
    mocidade_independente_de_padre_miguel: 'O Quinto Império: de Portugal ao Brasil, uma utopia na história',
    vila_isabel: 'Trabalhadores do Brasil',
    unidos_de_vila_isabel: 'Trabalhadores do Brasil',
    mangueira: '100 anos do frevo, é de perder o sapato. Recife mandou me chamar...',
    estacao_primeira_de_mangueira: '100 anos do frevo, é de perder o sapato. Recife mandou me chamar...',
    porto_da_pedra: '100 anos de imigração japonesa no Brasil - tem pagode no Maru',
    unidos_do_porto_da_pedra: '100 anos de imigração japonesa no Brasil - tem pagode no Maru',
    sao_clemente: 'O clemente João VI no Rio: a redescoberta do Brasil...',

    // Série Ouro 2008
    imperio_serrano: 'Taí, eu fiz tudo pra você gostar de mim',
    rocinha: 'Rocinha é minha vida... Nordeste é minha história',
    academicos_da_rocinha: 'Rocinha é minha vida... Nordeste é minha história',
    santa_cruz: 'Da abertura dos Portos à cidade do porto, Itaguaí - uma história real',
    academicos_de_santa_cruz: 'Da abertura dos Portos à cidade do porto, Itaguaí - uma história real',
    renascer_jacarepagua: 'É chegado a Portugal o tempo de padecer, se te oprime a cruel França, sorte melhor hás de ter',
    renascer_de_jacarepagua: 'É chegado a Portugal o tempo de padecer, se te oprime a cruel França, sorte melhor hás de ter',
    renascer: 'É chegado a Portugal o tempo de padecer, se te oprime a cruel França, sorte melhor hás de ter',
    uniao_da_ilha: 'É hoje o dia!',
    ilha: 'É hoje o dia!',
    caprichosos_de_pilares: 'De Santo Antônio de Sá ao pólo petroquímico, Itaboraí... Uma terra abençoada!',
    caprichosos: 'De Santo Antônio de Sá ao pólo petroquímico, Itaboraí... Uma terra abençoada!',
    estacio_de_sa: 'A história do futuro',
    estacio: 'A história do futuro',
    imperio_da_tijuca: 'Duzentos anos da corte real nos jardins da família imperial',
    cubango: 'Mercedes Baptista, de passo a passo, um passo',
    academicos_do_cubango: 'Mercedes Baptista, de passo a passo, um passo',
    lins_imperial: 'Apresento-lhes com louvor, meu pai querido, D. João VI'
  },
  2007: {
    // Grupo Especial 2007
    beija_flor: 'Áfricas - Do Berço Real à Corte Brasiliana',
    beija_flor_de_nilopolis: 'Áfricas - Do Berço Real à Corte Brasiliana',
    grande_rio: 'Caxias, Caminho do Progresso, um Retrato do Brasil',
    academicos_do_grande_rio: 'Caxias, Caminho do Progresso, um Retrato do Brasil',
    mangueira: 'Minha Pátria é minha Língua, Mangueira, meu Grande Amor. Meu Samba vai ao Lácio e colhe a Última Flor',
    estacao_primeira_de_mangueira: 'Minha Pátria é minha Língua, Mangueira, meu Grande Amor. Meu Samba vai ao Lácio e colhe a Última Flor',
    tijuca: 'De Lambida em Lambida, a Tijuca dá um Click na Avenida',
    unidos_da_tijuca: 'De Lambida em Lambida, a Tijuca dá um Click na Avenida',
    viradouro: 'A Viradouro Vira o Jogo',
    unidos_do_viradouro: 'A Viradouro Vira o Jogo',
    vila_isabel: 'Metamorfoses: Do Reino Natural à Corte Popular do Carnaval - as Transformações da Vida',
    unidos_de_vila_isabel: 'Metamorfoses: Do Reino Natural à Corte Popular do Carnaval - as Transformações da Vida',
    salgueiro: 'Candaces',
    academicos_do_salgueiro: 'Candaces',
    portela: 'Os Deuses do Olimpo na Terra do Carnaval: uma Festa dos Esportes, da Saúde e da Beleza',
    imperatriz: 'Teresinhaaa, uhuhuuu!!! Vocês Querem Bacalhau?',
    imperatriz_leopoldinense: 'Teresinhaaa, uhuhuuu!!! Vocês Querem Bacalhau?',
    porto_da_pedra: 'Preto e Branco a Cores',
    unidos_do_porto_da_pedra: 'Preto e Branco a Cores',
    mocidade: 'O Futuro no Pretérito - uma História Feita à Mão',
    mocidade_independente: 'O Futuro no Pretérito - uma História Feita à Mão',
    mocidade_independente_de_padre_miguel: 'O Futuro no Pretérito - uma História Feita à Mão',
    imperio_serrano: 'Ser Diferente é Normal: o Império Serrano faz a Diferença no Carnaval',
    estacio_de_sa: 'O Tititi do Sapoti',
    estacio: 'O Tititi do Sapoti',

    // Série Ouro 2007
    sao_clemente: 'Barrados no Baile',
    caprichosos_de_pilares: 'Com todo o gás, a Caprichosos acende a chama do carnaval',
    caprichosos: 'Com todo o gás, a Caprichosos acende a chama do carnaval',
    santa_cruz: 'O Tempo que o Tempo tem',
    academicos_de_santa_cruz: 'O Tempo que o Tempo tem',
    uniao_da_ilha: 'Ripa na Tulipa, Ilha!',
    ilha: 'Ripa na Tulipa, Ilha!',
    imperio_da_tijuca: 'O Intrépido Santo Guerreiro',
    renascer_jacarepagua: 'Jacarepaguá - Fábrica de Sonhos',
    renascer_de_jacarepagua: 'Jacarepaguá - Fábrica de Sonhos',
    renascer: 'Jacarepaguá - Fábrica de Sonhos',
    cubango: 'De fio a fio na Real, pra lá pra lí. Paracambi',
    academicos_do_cubango: 'De fio a fio na Real, pra lá pra lí. Paracambi',
    rocinha: 'O Gigante Mundo dos Pequenos',
    academicos_da_rocinha: 'O Gigante Mundo dos Pequenos',
    tradicao: 'Passarinho, Passarola, quero ver Voar',
    arranco: 'A Sinfonia Brasileira das Quatro Estações'
  },
  2006: {
    vila_isabel: 'Soy Loco Por Ti, América - A Vila Canta a Latinidade',
    grande_rio: 'Amazonas, o Eldorado do Brasil',
    viradouro: 'Arquitetura: A Arte de Viver Bem',
    mangueira: 'Das Águas do Velho Chico Nasce um Paraíso',
    beija_flor: 'Poços de Caldas: Derrama Sobre a Terra Suas Águas Milagrosas',
    tijuca: 'Ouviram do Ipiranga às Margens Plácidas',
    portela: 'Brasil, Marca a Tua Cara e Mostra Para o Mundo Quem É Você',
    imperio_serrano: 'O Império do Divino',
    imperatriz: 'Um Por Todos e Todos Por Um (A Epopeia dos Mosqueteiros)',
    mocidade: 'A Vida que Eu Pedi a Deus',
    salgueiro: 'Microcosmos: O que os Olhos Não Veem, o Coração Sente',
    porto_da_pedra: 'Bendita És Tu Entre as Mulheres do Brasil',
    caprichosos_de_pilares: 'Na Terra do Pau-Brasil, Nem Tudo Caminha Viu',
    rocinha: 'A Felicidade Não Tem Preço'
  },
  2005: {
    beija_flor: 'Sete Pecados Capitais',
    tijuca: 'Entrou por um Lado, Saiu Pelo Outro... Quem Quiser que Invente Outra!',
    grande_rio: 'Alimentar o Corpo e a Alma Faz Bem ao Coração',
    imperatriz: 'Quem Tem Padrinho Não Morre Moço',
    salgueiro: 'Do Fogo que Purifica à Cinza que Renasce, a Vida É uma Festa',
    mangueira: 'Mangueira Energiza a Pura Energia do Brasil',
    porto_da_pedra: 'Carnaval, a Festa do Povo',
    viradouro: 'A Viradouro É Show de Bola!',
    mocidade: 'Buena Bicha: A História da Sorte',
    vila_isabel: 'Singrando os Mares da Guanabara no Caminho do Ouro',
    caprichosos_de_pilares: 'Carnaval, Te Quero Amor!',
    imperio_serrano: 'Um Grito de Alerta Pela Natureza',
    portela: 'Brasil, Tantas Vezes Campeão',
    tradicao: 'De Geração em Geração, a Tradição Mantém a Fé'
  },
  2004: {
    beija_flor: 'Manôa - Manaus - Amazônia - Terra Santa',
    tijuca: 'O Segredo do Agbê',
    mangueira: 'A Mangueira no Cinema',
    viradouro: 'A Brincadeira dos Reis',
    imperatriz: 'Breazail',
    salgueiro: 'A Cana que Aqui Se Deu, Tudo Deu',
    portela: 'Nas Asas da Águia, a Portela Voa Alto',
    mocidade: 'Não Corra, Não Mate, Não Morra: Pegue Carona na Mocidade',
    imperio_serrano: 'Aquarela Brasileira (Reedição Histórica)',
    grande_rio: 'Vamos Vestir a Camisinha, Meu Amor!',
    porto_da_pedra: 'Sou Tigre, Sou Porto, da Pedra ao Asfalto',
    tradicao: 'De Férias no Rio, um Mergulho na Cidade Maravilhosa',
    caprichosos_de_pilares: 'Xuxa e Seu Planeta Encantado',
    sao_clemente: 'Quem Não Chora Não Mama'
  },
  2003: {
    beija_flor: 'O Povo Conta a Sua História: Saco Vazio Não Pára em Pé',
    mangueira: 'Dez de Maio, Cem Anos de Glória (Centenário de JK)',
    grande_rio: 'O Nosso Brasil que Vale',
    imperatriz: 'Nem Todo Pirata Tem a Perna de Pau',
    mocidade: 'Para Sempre no Seu Coração: Viva o Rei do Rock!',
    viradouro: 'A Viradouro Canta e Conta Bibi Ferreira',
    salgueiro: 'Salgueiro, Minha Paixão, Minha Raiz - 50 Anos de Glória',
    portela: 'Ontem, Hoje e Sempre Cinelândia',
    tijuca: 'Agudás, os que Voltaram',
    caprichosos_de_pilares: 'Ziraldo: O Menino Maluquinho no Planeta Folia',
    porto_da_pedra: 'Rondônia, Terra de Bravos!',
    imperio_serrano: 'O Império na Rota do Ouro',
    tradicao: 'O Brasil É um Jardim de Rosas',
    santa_cruz: 'Do Universo Fenício aos Brasis de Maurício'
  },
  2002: {
    mangueira: 'Brazil com Z é pra cabra da peste, Brasil com S é a nação do Nordeste',
    beija_flor: 'O Brasil Dá o Ar de Sua Graça: De Ícaro a Santos Dumont',
    imperatriz: 'Goyazes: De Onde Vinde, Para Onde Vades?',
    mocidade: 'O Grande Circo da Vida',
    viradouro: 'Vira, Virou, Viradouro!',
    salgueiro: 'Asas de um Sonho: A Conquista dos Céus',
    grande_rio: 'Os Papagaios Amarelos nas Terras Encantadas do Maranhão',
    portela: 'Amazonas, Esse Desconhecido',
    imperio_serrano: 'Aclamação Real: Reencontro com a Corte do Samba',
    tijuca: 'O Sol Brilha Eternamente Sobre o Mundo de Língua Portuguesa',
    porto_da_pedra: 'Serra Acima: A Saga dos Imigrantes Suíços',
    caprichosos_de_pilares: 'Explosão de Alegria: Viva a Festa Popular!',
    tradicao: 'As Vozes da Floresta',
    sao_clemente: 'Guarani: O Romance da Terra'
  },
  2001: {
    imperatriz: 'Cana-Caiana, Cana-Roxa, Cana-Fita: O Suco Doce do Brasil',
    beija_flor: 'A Saga de Agotime, Maria Mineira Naê',
    mangueira: 'A Seiva da Vida na Terra do Sempre',
    salgueiro: 'Salgueiro no Caminho das Índias',
    viradouro: 'Os Sete Pecados Capitais',
    grande_rio: 'Gentileza, o Profeta da Paz',
    mocidade: 'Paz e Amor 2001: O Ano do Milênio',
    tradicao: 'Hoje É Dia de Festa, Tradição!',
    tijuca: 'Tijuca: O Maravilhoso Mundo do Teatro Infantil',
    portela: 'Querer É Poder: A Epopeia do Sertão',
    imperio_serrano: 'O Império Coroa a Cultura do Sertão',
    caprichosos_de_pilares: 'Goiás, Coração do Brasil',
    uniao_da_ilha: 'A Força da Fé: O Milagre da Criação',
    tuiuti: 'Um Mouro no Rio: Da África ao Asfalto da Sapucaí'
  },
  2000: {
    imperatriz: 'Quem Descobriu o Brasil, Foi Seu Cabral: No Ano 2000 o Rei Sou Eu!',
    beija_flor: 'Brasil: Um Coração que Pulsa Forte Pátria Amada!',
    viradouro: 'Brasil: Visões de Paraísos e Infernos',
    mocidade: 'Verde, Amarelo, Azul-Anil: O Brasil que Vale É Esse Aqui',
    tijuca: 'Terra dos Papagaios: Navegar Foi Preciso',
    salgueiro: 'Eu Sou Rei, Eu Sou Salgueiro: As Três Faces do Império',
    mangueira: 'Dom Obá II: O Príncipe do Povo',
    uniao_da_ilha: 'Pra Não Dizer que Não Falei das Flores',
    grande_rio: 'Brasil, Carnaval de Emoção: Da Natureza ao Samba',
    portela: 'Trabalhadores do Brasil: A Época de Ouro da Era Vargas',
    caprichosos_de_pilares: 'Brasil, Mostra a Tua Cara: Do Ouro ao Petróleo',
    tradicao: 'O Brasil de Todos os Ritmos',
    vila_isabel: 'Meu Porto, Meu Povo: 500 Anos de Memória',
    porto_da_pedra: 'Ordem e Progresso: A Saga dos 500 Anos'
  },
  1999: {
    imperatriz: 'Brasil, Mostra a Sua Cara em... Caviar!',
    beija_flor: 'Araxá - Lugar Alto Onde Primeiro Se Avista o Sol',
    viradouro: 'Anita Garibaldi: Heroína das Sete Magias',
    mocidade: 'Villa-Lobos e a Apoteose Brasileira',
    salgueiro: 'O Salgueiro É a Minha Raiz',
    grande_rio: 'Ei, Ei, Ei, Beto Carrero É Nosso Rei!',
    mangueira: 'O Século do Samba',
    portela: 'De Volta às Raízes: Da Floresta ao Asfalto',
    caprichosos_de_pilares: 'No Ano 2000, Braços Abertos para a Paz',
    uniao_da_ilha: 'Asas: Um Sonho de Voar',
    vila_isabel: 'João de Barro, o Arquiteto da Floresta',
    tradicao: 'Nos Braços da História',
    imperio_serrano: 'Uma Rua Chamada Brasil',
    sao_clemente: 'O Banquete dos Reis: Da Idade Média ao Carnaval'
  },
  1998: {
    beija_flor: 'Pará: O Mundo das Águas Onde a Floresta É Pecado',
    mangueira: 'Chico Buarque da Mangueira',
    imperatriz: 'Quase no Ano 2000...',
    portela: 'Os Olhos da Noite: O Esplendor do Luar',
    viradouro: 'Orfeu, o Negro do Bixiga',
    mocidade: 'Brilha no Céu a Estrela da Mocidade',
    salgueiro: 'Parintins: A Ilha Encantada do Boi-Bumbá',
    grande_rio: 'Preste Atenção: O Carnaval É Nosso!',
    uniao_da_ilha: 'Fatumbi: A Ilha dos Orixás',
    caprichosos_de_pilares: 'Negra É a Noite: A Magia das Trevas',
    tradicao: 'Viagem Fantástica ao Fundo do Mar',
    vila_isabel: 'Lágrimas, Suor e Conquistas: O Suor do Povo Negro',
    tijuca: 'De Gama a Vasco, a Epopeia da Cruz de Malta',
    porto_da_pedra: 'Samba, Festejo e Carnaval'
  },
  1997: {
    viradouro: 'Trevas! Luz! A Explosão do Universo',
    mocidade: 'De Corpo e Alma na Avenida',
    mangueira: 'O Filho da Noite, o Sol da Madrugada',
    beija_flor: 'A Beija-Flor É Festa no Céu',
    porto_da_pedra: 'No Reino das Águas Claras',
    imperatriz: 'Eu Sou da Lira, Não Posso Negar (Homenagem a Chiquinha Gonzaga)',
    salgueiro: 'De Poeta, Carnavalesco e Louco... Todo Mundo Tem um Pouco',
    portela: 'Linda, Eternamente Linda (Homenagem a Madureira e Paulo da Portela)',
    vila_isabel: 'Não É Tristeza Nem Desengano: O Circo Chegou!',
    grande_rio: 'Madeira-Mamoré, a Ferrovia da Morte',
    tijuca: 'Viagem Pitoresca e Histórica Debretiana',
    uniao_da_ilha: 'Cidade Maravilhosa, o Sonho de um Carioca',
    estacio_de_sa: 'Através da Fumaça, o Canto de Paz',
    santa_cruz: 'Não Se Amarra em Nada, Quem Tem Samba no Pé',
    imperio_serrano: 'Mundo de Sonhos',
    rocinha: 'A Viagem dos Sonhos nas Asas da Imaginação'
  },
  1996: {
    mocidade: 'Criador e Criatura',
    imperatriz: 'Imperatriz Leopoldinense Honra, Brilha e Resplandece...',
    beija_flor: 'Aurora do Povo Brasileiro: A Criação da Raça',
    mangueira: 'Os Tambores da Mangueira na Terra da Encantaria',
    salgueiro: 'Anhum',
    imperio_serrano: 'E Verás que um Filho Teu Não Foge à Luta',
    vila_isabel: 'A Raça Humana: Da Criação aos Nossos Dias',
    portela: 'Essa Gente Brasileira',
    porto_da_pedra: 'Um Carnaval dos Carnavais',
    estacio_de_sa: 'De um Sonho à Realidade: O Circo da Folia',
    grande_rio: 'Na Era dos Fenícios, Navegar É Preciso',
    uniao_da_ilha: 'A Ilha de Encantos e Mistérios',
    viradouro: 'Aquarela do Brasil',
    tijuca: 'Ganga-Zumba: O Rei dos Palmares',
    caprichosos_de_pilares: 'Samba, Sabor de Brasil',
    tradicao: 'A Lenda da Cobra Norato',
    imperio_da_tijuca: 'O Reino Unido dos Palmares',
    unidos_da_ponte: 'Vida de Gado'
  },
  1995: {
    imperatriz: 'Mais Vale um Jegue que Me Carregue do que um Camelo que Me Derrube... Lá no Ceará',
    portela: 'Gosto que Me Enrosco',
    beija_flor: 'Bidu Sayão, o Canto de Cristal',
    mocidade: 'Padre Miguel, Olhai Por Nós',
    salgueiro: 'O Caso do Por Acaso',
    mangueira: 'A Esmeralda do Atlântico',
    estacio_de_sa: 'Em Busca do Ouro',
    viradouro: 'O Rei e os Três Espantos de Debret',
    vila_isabel: 'Cara e Coroa, as Duas Faces da Moeda',
    caprichosos_de_pilares: 'Da Terra da Folia ao Vale dos Sonhos',
    uniao_da_ilha: 'Todo Dia É Dia de Folia',
    tijuca: 'Os Sete Nomes do Amor',
    tradicao: 'Tradição de Glórias e Conquistas',
    unidos_da_ponte: 'Paraná, a Terra de Todas as Gentes',
    imperio_serrano: 'O Grito de Liberdade',
    grande_rio: 'Estou Te Guardando na Manga',
    sao_clemente: 'O que É que a Bahia Tem',
    villa_rica: 'A Flor de Lisboa'
  },
  1994: {
    imperatriz: 'Catarina de Médicis na Corte dos Tupinambás',
    salgueiro: 'O Rio que Passa em Minha Vida',
    viradouro: 'Tereza de Benguela: Uma Rainha Negra no Pantanal',
    uniao_da_ilha: 'Abra a Boca e Feche os Olhos',
    beija_flor: 'Margareth Mee, a Dama das Bromélias',
    tradicao: 'Passou Batido, Quem Não Viu Vai Ver',
    portela: 'Quando o Samba Era Samba',
    mocidade: 'Avenida Brasil - Tudo Passa, Quem Não Viu Vai Ver...',
    vila_isabel: 'Muito Prazer! Isabel de Bragança e Drumond Rosa da Silva',
    caprichosos_de_pilares: 'Estou Amando: A Fantasia das Paixões',
    mangueira: 'Atrás da Verde e Rosa Só Não Vai Quem Já Morreu (Doces Bárbaros)',
    grande_rio: 'Van Gogh: As Cores da Loucura',
    estacio_de_sa: 'Sertão da Ressurreição',
    tijuca: 'Só Vale o Escrito',
    unidos_da_ponte: 'Café, Nosso Pão de Cada Dia',
    imperio_serrano: 'Uma Festa Brasileira'
  },
  1993: {
    salgueiro: 'Peguei um Ita no Norte (Explode Coração)',
    imperatriz: 'Marquês que É Marquês do Saçarico É Freguês',
    beija_flor: 'Uni-Duni-Tê, a Beija-Flor Escolheu Você',
    mocidade: 'No Rastro do Sol: A Rota dos Bandeirantes',
    mangueira: 'Dona Neuma, a Voz da Colina',
    estacio_de_sa: 'A Dança da Lua',
    viradouro: 'Amor, Sublime Amor',
    vila_isabel: 'Gbalá - Viagem ao Templo da Criação',
    grande_rio: 'No Mundo da Lua',
    portela: 'Cerimônia de Coroação de um Rei Negro',
    uniao_da_ilha: 'Os Maiores Espetáculos da Terra',
    tijuca: 'Dança, Brasil!',
    caprichosos_de_pilares: 'Não Existe Pecado do Lado de Baixo do Equador',
    unidos_da_ponte: 'A Face do Amor'
  },
  1992: {
    estacio_de_sa: 'Paulicéia Desvairada - 70 Anos de Modernismo',
    mocidade: 'Sonhar Não Custa Nada! Ou Quase Nada...',
    imperatriz: 'Não Existe Pecado ao Sul do Equador',
    salgueiro: 'O Hábito Não Faz o Monge',
    portela: 'Todo Azul que o Azul Tem',
    mangueira: 'Se Todos Fossem Iguais a Você (Tom Jobim)',
    beija_flor: 'Há um Ponto de Luz na Imensidão',
    tijuca: 'Guanabara, a Noiva do Mar',
    viradouro: 'E a Magia Continua...',
    uniao_da_ilha: 'Sou Mais Minha Ilha',
    caprichosos_de_pilares: 'Brasil, Feito a Mão',
    vila_isabel: 'A Um Passo da Infinidade',
    leao_de_nova_iguacu: 'O Amor Venceu',
    tradicao: 'O Espetáculo Maior',
    santa_cruz: 'Quatro Luas de Glória'
  },
  1991: {
    mocidade: 'Chuê, Chuá... As Águas Vão Rolar',
    salgueiro: 'Me Masso se Não Me Passo',
    imperatriz: 'O que É que a Cidade Tem?',
    beija_flor: 'Alice no Brasil das Maravilhas',
    estacio_de_sa: 'Chora, Violão!',
    portela: 'Tributo à Vaidade',
    viradouro: 'Brava Gente, Soberana do Samba',
    tijuca: 'Tá na Mesa, Brasil!',
    uniao_da_ilha: 'De Bar em Bar, Didi um Poeta',
    caprichosos_de_pilares: 'Terceiro Milênio: Em Busca do Juízo Final',
    vila_isabel: 'Luiz Peixoto: O Poeta do Riso',
    mangueira: 'As Três Rendeiras do Universo',
    sao_clemente: 'Já Vi Tudo, Não Me Engana Mais',
    lins_imperial: 'Chico Mendes, o Cavaleiro da Floresta',
    imperio_serrano: 'É Fim de Feira',
    grande_rio: 'Antes do Brasil Chegar, Éramos Felizes'
  },
  1990: {
    mocidade: 'Vira, Virou, a Mocidade Chegou',
    beija_flor: 'Todo Mundo Nasceu Nu',
    salgueiro: 'Sou Amigo do Rei',
    imperatriz: 'Terra Brasilis, o que Se Plantou Deu',
    estacio_de_sa: 'Langsdorff, Delírio na Floresta',
    sao_clemente: 'E o Samba Sambou',
    uniao_da_ilha: 'Sonhar com Rei Dá Leão',
    mangueira: 'E Deu a Louca no Barroco',
    tijuca: 'E o Vento Levou',
    portela: 'É Melhor Rir do Que Chorar',
    imperio_serrano: 'História da Música Popular Brasileira',
    vila_isabel: 'Se Esta Rua Fosse Minha',
    caprichosos_de_pilares: 'Com a Boca no Mundo',
    lins_imperial: 'Madame Satã',
    santa_cruz: 'Os Heroicos Cavaleiros da Noite',
    cabucu: 'Cabuçu, uma Fábula de Amor'
  },
  1989: {
    imperatriz: 'Liberdade! Liberdade! Abre as Asas Sobre Nós',
    beija_flor: 'Ratos e Urubus, Larguem Minha Fantasia',
    uniao_da_ilha: 'Festa Profana',
    vila_isabel: 'Direito É Direito',
    salgueiro: 'Templo Negro em Tempo de Consciência Negra',
    portela: 'Tributo à Vaidade',
    mocidade: 'Elis, um Trem de Emoções',
    tijuca: 'De Gama a Vasco, a Epopeia das Naus',
    estacio_de_sa: 'Um, Dois, Feijão com Arroz',
    imperio_serrano: 'Jorge Amado, Axé Brasil',
    mangueira: 'Trinca de Reis',
    caprichosos_de_pilares: 'O que É Bom Todo Mundo Gosta',
    sao_clemente: 'Made in Brazil: Feito no Brasil',
    cabucu: 'Mil e uma Noites de Amor',
    unidos_da_ponte: 'Vida de Artista',
    tradicao: 'Passou Batido',
    arranco: 'A Festa da Ilusão',
    jacarezinho: 'Ginga, Palmares'
  },
  1988: {
    vila_isabel: 'Kizomba, a Festa da Raça',
    mangueira: '100 Anos de Liberdade, Realidade ou Ilusão?',
    beija_flor: 'Sou Negro, do Egito à Liberdade',
    salgueiro: 'Em Busca do Ouro',
    portela: 'Na Lenda Carioca, os Sonhos do Vice-Rei',
    uniao_da_ilha: 'Aquilombamente',
    imperio_serrano: 'Pára com Isso, Dá Cá Meu Dinheiro',
    caprichosos_de_pilares: 'A Cidade da Esperança',
    mocidade: 'Beijim, Beijim, Bye Bye Brasil',
    tradicao: 'O Melhor da Noite',
    estacio_de_sa: 'O Boi Dá Bode',
    sao_clemente: 'Quem Avisa Amigo É',
    tijuca: 'Te Cuida, Malandro',
    unidos_da_ponte: 'O Amor de Três Séculos',
    cabucu: 'A Lenda do Morro da Viúva',
    imperatriz: 'Conta Outra que Essa Foi Boa'
  },
  1987: {
    mangueira: 'No Reino das Palavras, Carlos Drummond de Andrade',
    mocidade: 'Tupinicópolis',
    portela: 'Adelaide, a Moça do Bumbo',
    beija_flor: 'As Mágicas Luzes da Ribalta',
    estacio_de_sa: 'O Tititi do Ta-ta-tá',
    salgueiro: 'E por Fim, o Amor Venceu',
    vila_isabel: 'Raízes',
    imperatriz: 'Estrela do Mar',
    sao_clemente: 'Capitães do Asfalto',
    cabucu: 'Roberto Carlos, o Menino de Cachoeiro',
    caprichosos_de_pilares: 'Eu Prometo',
    uniao_da_ilha: 'Extra! Extra!',
    unidos_da_ponte: 'O Sonho de uma Noite de Quarta-Feira',
    jacarezinho: 'No Reino da Ilusão',
    imperio_da_tijuca: 'Viva o Povo Brasileiro'
  },
  1986: {
    mangueira: 'Caymmi Mostra ao Mundo o que a Bahia e a Mangueira Têm',
    beija_flor: 'O Mundo É uma Bola',
    imperio_serrano: 'Eu Quero',
    portela: 'Morfeu no Carnaval, a Utopia Brasileira',
    uniao_da_ilha: 'Assum Preto',
    salgueiro: 'Tempero Salgueirense',
    mocidade: 'Bruxarias e Feitiçarias',
    imperatriz: 'Terra Brasilis',
    caprichosos_de_pilares: 'Flashback',
    estacio_de_sa: 'Prata da Casa',
    vila_isabel: 'De Alegria Cantei, de Alegria Pulei',
    imperio_da_tijuca: 'Menino Rei',
    cabucu: 'De Quem É Essa Ciranda?',
    unidos_da_ponte: 'De um Sonho de Liberdade',
    tijuca: 'Cama, Mesa e Banho de Gato'
  },
  1985: {
    mocidade: 'Ziriguidum 2001, Um Carnaval nas Estrelas',
    beija_flor: 'A Lapa de Adão e Eva',
    vila_isabel: 'Parece Até que Foi Ontem',
    portela: 'Recordar É Viver',
    caprichosos_de_pilares: 'E por Falar em Saudade',
    salgueiro: 'Mata, Papai!',
    imperio_serrano: 'Samba, Suor e Cerveja',
    imperatriz: 'Adorável Trapalhão',
    mangueira: 'Abram Alas que Eu Quero Passar (Chiquinha Gonzaga)',
    estacio_de_sa: 'Chora, Cavaquinho',
    imperio_da_tijuca: 'Se a Lua Contasse',
    uniao_da_ilha: 'Um Herói, uma Canção: A Lenda de Zumbi',
    cabucu: 'A Festa É Nossa, Ninguém Tasca',
    santa_cruz: 'Hoje Tem Festa na Aldeia',
    sao_clemente: 'Quem Casa Quer Casa',
    em_cima_da_hora: 'Me Engana que Eu Gosto'
  },
  1984: {
    portela: 'Contos de Areia',
    mangueira: 'Yes, Nós Temos Braguinha',
    mocidade: 'Mamãe eu Quero Manaus',
    imperio_serrano: 'Foi Malandro, É',
    beija_flor: 'O Gigante em Berço Esplêndido',
    caprichosos_de_pilares: 'A Visita da Nobreza do Riso a Chico Rei, num Palco Nem Sempre Iluminado',
    salgueiro: 'Skindô, Skindô',
    imperatriz: 'Alô Mamãe',
    uniao_da_ilha: 'Quem Pode, Pode, Quem Não Pode...',
    vila_isabel: 'Pra Tudo se Acabar na Quarta-Feira',
    imperio_da_tijuca: '9215',
    estacio_de_sa: 'Quem É Você (Vem de Lá)',
    cabucu: 'Beth Carvalho, a Enamorada do Samba',
    santa_cruz: 'Uma Cidade Chamada Esperança',
    tijuca: 'Salamaleikum, a Epopéia dos Insubmissos Malês',
    unidos_da_ponte: 'Oferendas'
  },
  1983: {
    beija_flor: 'A Grande Constelação das Estrelas Negras',
    portela: 'A Ressurreição das Coroas - Reisado, Reino, Reinado',
    imperio_serrano: 'Mãe Baiana Mãe',
    imperatriz: 'O Rei da Costa do Marfim Visita Xica da Silva em Diamantina',
    mangueira: 'Verde que te Quero Rosa... Semente Viva do Samba',
    mocidade: 'Como Era Verde o Meu Xingu',
    uniao_da_ilha: 'Toma Lá Dá Cá',
    salgueiro: 'Traços e Troças',
    vila_isabel: 'Os Imortais',
    tijuca: 'Brasil, Devagar com o Andor que o Santo É de Barro',
    unidos_da_ponte: 'E Eles Verão a Deus',
    caprichosos_de_pilares: 'Um Cardápio à Brasileira'
  },
  1982: {
    imperio_serrano: 'Bum Bum Paticumbum Prugurundum',
    portela: 'Meu Brasil Brasileiro',
    imperatriz: 'Onde Canta o Sabiá',
    mangueira: 'As Mil e Uma Noites Cariocas',
    uniao_da_ilha: 'É Hoje',
    beija_flor: 'O Olho Azul da Serpente',
    mocidade: 'O Velho Chico',
    salgueiro: 'No Reino do Faz de Conta',
    tijuca: 'Lima Barreto, Mulato, Pobre, mas Livre',
    vila_isabel: 'Noel Rosa e os poetas da Vila nas Batalhas do Boulevard',
    imperio_da_tijuca: 'Iara, Ouro e Pinhão na Terra da Gralha Azul',
    estacio_de_sa: 'Onde Há Rede, Há Renda'
  },
  1981: {
    imperatriz: 'O Teu Cabelo Não Nega (Só Dá Lalá)',
    beija_flor: 'Carnaval do Brasil, a Oitava das Sete Maravilhas do Mundo',
    portela: 'Das Maravilhas do Mar Fez-se o Esplendor de uma Noite',
    mangueira: 'De Nonô a JK',
    salgueiro: 'Rio de Janeiro',
    mocidade: 'Abram Alas para a Folia, Aí Vem a Mocidade',
    uniao_da_ilha: '1910, Burro na Cabeça',
    tijuca: 'Macobeba - O que Dá pra Rir, Dá pra Chorar',
    vila_isabel: 'Dos Jardins do Éden à Era de Aquárius',
    imperio_serrano: 'Na Terra do Pau-Brasil, Nem Tudo Caminha Viu'
  },
  1980: {
    beija_flor: 'O Sol da Meia-Noite, Uma Viagem ao País das Maravilhas',
    imperatriz: 'O Que É Que a Bahia Tem',
    portela: 'Hoje Tem Marmelada',
    mocidade: 'Tropicália Maravilha',
    uniao_da_ilha: 'Bom, Bonito e Barato',
    vila_isabel: 'Sonho de um Sonho',
    salgueiro: 'O Bailar dos Ventos, Relampejou, Mas Não Choveu',
    mangueira: 'Dos Jeitos da Gente, Mineira',
    imperio_serrano: 'Império das Ilusões',
    estacio_de_sa: 'Brasil, Terra à Vista'
  },
  1979: {
    mocidade: 'O Descobrimento do Brasil',
    beija_flor: 'O Paraíso da Loucura',
    portela: 'Incrível, Fantástico, Extraordinário',
    mangueira: 'Avatar da e Popa a Valença',
    uniao_da_ilha: 'O que Será do Amanhã?',
    salgueiro: 'O Reino Encantado de Mãe Zulmira',
    imperatriz: 'Oxumarê, a Lenda do Arco-Íris',
    estacio_de_sa: 'Das Maravilhas do Mar, Fez-se o Esplendor de uma Noite'
  },
  1978: {
    beija_flor: 'A Criação do Mundo na Tradição Nagô',
    mangueira: 'Dos Carroceiros do Imperador ao Palácio do Samba',
    mocidade: 'Brasiliana',
    uniao_da_ilha: 'O Amanhã',
    portela: 'Mulher à Brasileira',
    salgueiro: 'Do Yorubá à Luz, a Aurora dos Deuses',
    imperio_serrano: 'Oscarito, Carnaval e Chanchada',
    vila_isabel: 'Dique, um Mar de Amor',
    arrastao_cascadura: 'Tala de Marfim',
    arranco: 'Sonho de Pintor'
  },
  1977: {
    beija_flor: 'Vovó e o Rei da Saturnália na Corte de Tutankamon',
    portela: 'Festa da Aclamação',
    uniao_da_ilha: 'Domingo',
    salgueiro: 'Do Caboclo ao Negro',
    vila_isabel: 'Ai Que Saudades Que Eu Tenho',
    imperio_serrano: 'Brasil, Berço dos Imigrantes',
    mangueira: 'Panapaná, o Segredo do Amor',
    mocidade: 'Samba, Marca Registrada do Brasil',
    imperatriz: 'Viagem Fantástica às Terras de Ibirapitanga',
    estacio_de_sa: 'Alô, Alô, Brasil, 40 Anos de Rádio Nacional',
    imperio_da_tijuca: 'O Mundo de Barro de Mestre Vitalino',
    cabucu: 'Sete Povos das Missões'
  },
  1976: {
    beija_flor: 'Sonhar com Rei Dá Leão',
    mangueira: 'No Reino da Mãe do Ouro',
    mocidade: 'Mãe Menininha do Gantois',
    portela: 'Homem do Rio, os Meus Bens Você Levou',
    salgueiro: 'Valongo',
    vila_isabel: 'Invenção de Orfeu',
    imperio_serrano: 'A Lenda das Sereias, Rainhas do Mar',
    imperatriz: 'Por Mares Nunca Dantes Navegados',
    uniao_da_ilha: 'Poemas de Vinicius de Moraes',
    estacio_de_sa: 'Arte Negra na Legendária Bahia',
    lins_imperial: 'Festa da Uva no Rio Grande do Sul',
    unidos_de_lucas: 'Mar Baiano em Noite de Gala',
    em_cima_da_hora: 'Os Sertões',
    tupy_bras_de_pina: 'Riquezas do Mar'
  },
  1975: {
    salgueiro: 'O Segredo das Minas do Rei Salomão',
    mangueira: 'Imagens Poéticas de Jorge de Lima',
    imperio_serrano: 'Zaquia Jorge, a Vedete do Subúrbio, Estrela de Madureira',
    mocidade: 'O Mundo Fantástico do Circo',
    portela: 'Macunaíma, Herói de Nossa Gente',
    vila_isabel: 'Arrastão de Flores',
    beija_flor: 'O Grande Decênio',
    imperatriz: 'Desencontrados da Vida',
    uniao_da_ilha: 'Nos Confins de Vila Rica',
    estacio_de_sa: 'A Festa do Círio de Nazaré',
    unidos_de_lucas: 'Cidades Feitas de Memórias',
    em_cima_da_hora: 'Boi da Cara Preta'
  },
  1974: {
    salgueiro: 'O Rei de França na Ilha da Assombração',
    portela: 'O Mundo Melhor de Pixinguinha (Pizindin)',
    imperio_serrano: 'Dona Santa, Rainha do Maracatu',
    mangueira: 'Mangueira no Ponto do Amor',
    mocidade: 'O Festejo do Boi-Pintadinho em Noite de Reis',
    imperatriz: 'Réquiem por um Sambista, Silas de Oliveira',
    beija_flor: 'Brasil Ano 2000',
    em_cima_da_hora: 'Festa dos Deuses Afro-Brasileiros',
    estacio_de_sa: 'Heroínas do Romance Brasileiro',
    vila_isabel: 'Aruanã-Açu'
  },
  1973: {
    mangueira: 'Lendas do Abaeté',
    imperio_serrano: 'Viagem Encantada Pelo Mar das Esmeraldas',
    salgueiro: 'Eneida: Amor e Fantasia',
    portela: 'Pasárgada, o Amigo do Rei',
    imperatriz: 'Cinderela de Boas Festas',
    em_cima_da_hora: 'Bahia do Amor, Monte Pascoal',
    mocidade: 'Criança, a Felicidade Tem Cor de Esperança',
    vila_isabel: 'Fados e Danças de Portugal',
    tupy_bras_de_pina: 'O Corsário',
    jacarezinho: 'Aquarela de um Povo'
  },
  1972: {
    imperio_serrano: 'Alô, Alô, Ta-Hí, Cem Anos de Carmen Miranda',
    mangueira: 'Rio, Carnaval dos Carnavais',
    portela: 'Ilariê: O Desfile dos Bonecos',
    imperatriz: 'Martim Cererê',
    salgueiro: 'Nossa Madrinha, Mangueira Querida',
    vila_isabel: 'Onde o Brasil Aprendeu a Liberdade',
    mocidade: 'Rainha de Sabá',
    em_cima_da_hora: 'Amor de Mãe, Amor Que Fica',
    estacio_de_sa: 'Rio Grande do Sul na Festa do Arroz',
    imperio_da_tijuca: 'O Samba na Cidade das Sete Colinas',
    unidos_de_lucas: 'O Poeta das Praias e dos Amores',
    unidos_padre_miguel: 'Madureira, Seu Samba, Sua História'
  },
  1971: {
    salgueiro: 'Festa para um Rei Negro (Pega no Ganzê)',
    portela: 'Lapa em Três Tempos',
    imperio_serrano: 'Nordeste: Seu Povo, Seu Canto, Sua Glória',
    mangueira: 'Os Modernos Bandeirantes',
    vila_isabel: 'O Quatrocentos Anos de Mem de Sá',
    estacio_de_sa: 'Festa do Divino Salvador',
    imperatriz: 'Barra do Ouro, Riqueza do Brasil',
    imperio_da_tijuca: 'O Poeta dos Orixás',
    mocidade: 'O Sol Amigo',
    unidos_padre_miguel: 'O Samba do Crioulo Doido'
  },
  1970: {
    portela: 'Lendas e Mistérios da Amazônia',
    salgueiro: 'Praça Onze, Carioca da Gema',
    mangueira: 'Um Cântico à Natureza',
    mocidade: 'O Meu Pé de Laranja Lima',
    vila_isabel: 'Glórias Gaúchas',
    imperatriz: 'Ode a Castro Alves',
    estacio_de_sa: 'Terra de Caruaru',
    imperio_serrano: 'Arte em Tom Maior',
    jacarezinho: 'Ginga, Samba e Cor',
    santa_cruz: 'Braz de Pina, Ontem e Hoje'
  },
  1969: {
    salgueiro: 'Bahia de Todos os Deuses',
    mangueira: 'Mercadores e Suas Mercadorias',
    portela: 'Treze Naus',
    imperio_serrano: 'Brasil, Berço dos Imigrantes',
    vila_isabel: 'I Jogo Aberto (Festa de São João)',
    estacio_de_sa: 'A Cama de Gonçalo Fernandes',
    mocidade: 'Vida e Glória de Francisco Alves',
    imperatriz: 'Brasil Flor Amoroso',
    unidos_de_lucas: 'Rapsódia de Saudades',
    em_cima_da_hora: 'O Sino do Alto da Colina'
  },
  1968: {
    mangueira: 'Samba, Festa de um Povo',
    imperio_serrano: 'Pernambuco, Leão do Norte',
    salgueiro: 'Dona Beja, a Feiticeira de Araxá',
    portela: 'O Tronco do Ipê',
    unidos_de_lucas: 'Sublime Pergaminho',
    mocidade: 'Viagem ao Mundo da Ilusão',
    estacio_de_sa: 'Visita ao Rio Antigo',
    vila_isabel: 'Quatro Séculos de Modas e Costumes',
    independentes_cordovil: 'Festival do Folclore Brasileiro',
    imperio_da_tijuca: 'A Epopéia dos Bandeirantes'
  },
  1967: {
    mangueira: 'O Mundo Encantado de Monteiro Lobato',
    imperio_serrano: 'São Paulo, Chapadão de Glórias',
    salgueiro: 'História do Carnaval Carioca - E o Samba Sambou',
    vila_isabel: 'Carnaval das Ilusões',
    unidos_de_lucas: 'Festas Tradicionais do Brasil',
    portela: 'Ressurreição das Coroas',
    mocidade: 'A Musa de Ataulfo Alves',
    imperio_da_tijuca: 'O Ouro de Ouro Preto',
    imperatriz: 'A Volta da Corte Real',
    sao_clemente: 'Festas de Santo Antônio'
  },
  1966: {
    portela: 'Memórias de um Sargento de Milícias',
    mangueira: 'Exaltação a Villa-Lobos',
    imperio_serrano: 'Glórias e Graças da Bahia',
    vila_isabel: 'Três Acontecimentos Históricos',
    salgueiro: 'Os Amores Célebres do Brasil',
    mocidade: 'Exaltação ao Engenho de Dentro',
    aprendizes_de_lucas: 'História de um Povo',
    unidos_da_capela: 'No Reino da Alegria',
    santa_cruz: 'O Homem na Lua',
    imperio_da_tijuca: 'Glória Histórica de Ouro Preto'
  },
  1965: {
    salgueiro: 'História do Carnaval Carioca',
    imperio_serrano: 'Cinco Bailes Tradicionais na História do Rio',
    portela: 'Histórias do Rio Antigo',
    mangueira: 'Rio Através dos Séculos',
    unidos_da_capela: 'Rio de Ontem, de Hoje e de Sempre',
    mocidade: 'Parabéns para Você, Rio',
    aprendizes_de_lucas: 'Rio de Quatrocentos Janeiros',
    imperio_da_tijuca: 'Quatro Séculos de Glórias',
    uniao_de_jacarepagua: 'O Rio e Suas Belezas',
    imperatriz: 'Homenagem ao IV Centenário do Rio'
  },
  1964: {
    portela: 'O Segundo Casamento de D. Pedro I',
    salgueiro: 'Chico Rei',
    mangueira: 'História de um Preto Velho',
    imperio_serrano: 'Aquarela Brasileira',
    unidos_da_capela: 'A Marquesa de Santos',
    uniao_de_jacarepagua: 'Uma Festa no Rio Antigo',
    mocidade: 'O Café, Riqueza do Brasil',
    aprendizes_de_lucas: 'Glória a Tomé de Souza',
    unidos_padre_miguel: 'Feira de Caruaru',
    cabucu: 'A Terra das Mil e Uma Noites'
  },
  1963: {
    salgueiro: 'Chica da Silva',
    mangueira: 'Exaltação à Bahia',
    imperio_serrano: 'Rio de Ontem e de Hoje',
    portela: 'Barão de Mauá e Suas Realizações',
    uniao_de_jacarepagua: 'Origem da Moeda Brasileira',
    mocidade: 'A Chegada de D. João VI',
    cabucu: 'Homenagem à Cidade do Rio de Janeiro',
    aprendizes_de_lucas: 'Brasília, Capital da Esperança',
    unidos_de_bangu: 'Panorama de Brasília',
    beija_flor: 'Peri e Ceci'
  },
  1962: {
    portela: 'Rugendas - Viagens Pitorescas através do Brasil',
    imperio_serrano: 'Rio dos Vice-Reis',
    salgueiro: 'O Descobrimento do Brasil',
    mangueira: 'Casa-Grande e Senzala',
    mocidade: 'A Presença de Tomé de Souza',
    aprendizes_de_lucas: 'Homenagem ao Barão de Mauá',
    cabucu: 'A Deusa de Ébano',
    uniao_de_jacarepagua: 'Retratos de Gonçalves Dias',
    unidos_da_capela: 'Três Séculos de Glórias da Igreja da Candelária',
    tupy_bras_de_pina: 'Seca do Nordeste'
  },
  1961: {
    mangueira: 'Reminiscências do Rio Antigo',
    salgueiro: 'Vida e Obra de Aleijadinho',
    portela: 'Jóias das Minas Gerais',
    imperio_serrano: 'Movimentos Revolucionários Brasileiros',
    unidos_da_capela: 'D. João VI no Brasil',
    aprendizes_de_lucas: 'Riquezas do Brasil',
    mocidade: 'Carnaval no Rio',
    uniao_de_jacarepagua: 'O Primeiro Reinado',
    caprichosos_de_pilares: 'A Coroação de D. Pedro II',
    unidos_padre_miguel: 'Exaltação aos Ex-Combatentes',
    academicos_bento_ribeiro: 'Epopéia dos Bandeirantes'
  },
  1960: {
    portela: 'Vila Rica de Ouro Preto',
    mangueira: 'Carnaval de Todos os Tempos',
    salgueiro: 'Quilombo dos Palmares',
    unidos_da_capela: 'Noite de Gala no Palácio de São Cristóvão',
    imperio_serrano: 'Exaltação a Tiradentes',
    aprendizes_de_lucas: 'Os Bandeirantes',
    mocidade: 'Exaltação à Cidade de Salvador',
    uniao_de_jacarepagua: 'Apolo e Suas Musas',
    unidos_padre_miguel: 'A Chegada de D. João VI',
    beija_flor: 'Regência Trina',
    aprendizes_boca_do_mato: 'Homenagem às Forças Armadas',
    unidos_de_bangu: 'A Epopéia dos Bandeirantes'
  },
  1959: {
    portela: 'Brasil, Panteon de Glórias',
    salgueiro: 'Viagem Pitoresca através do Brasil (Debret)',
    imperio_serrano: 'Brasil Holandês',
    mangueira: 'Brasil através dos Séculos',
    mocidade: 'Os Vultos da História Pátria',
    unidos_da_capela: 'O Petróleo do Brasil',
    aprendizes_de_lucas: 'Homenagem a Castro Alves',
    unidos_de_bangu: 'A Epopéia dos Emboabas',
    beija_flor: 'Copa do Mundo (Brasil Campeão Mundial)',
    caprichosos_de_pilares: 'Três Épocas do Brasil',
    cartolinhas_de_caxias: 'Exaltação a Tamandaré',
    uniao_de_jacarepagua: 'Vultos Ilustres do Brasil',
    uniao_do_centenario: 'Homenagem à Marinha Nacional',
    tupy_bras_de_pina: 'Centenário da Estrada de Ferro Central do Brasil',
    cabucu: 'História do Café',
    tuiuti: 'Homenagem a Santos Dumont',
    tijuca: 'Heróis da Guerra do Paraguai',
    unidos_do_salgueiro: 'Exaltação à Música Popular Brasileira'
  },
  1958: {
    portela: 'Vultos Célebres do Brasil',
    imperio_serrano: 'Exaltação a Bárbara Heliodora',
    mangueira: 'Poema das Canções dos Poetas das Flores',
    salgueiro: 'Um Século de Glórias',
    unidos_da_capela: 'Glória a Rui Barbosa',
    uniao_de_jacarepagua: 'Primavera no Rio',
    uniao_do_centenario: 'Retratos da História',
    tupy_bras_de_pina: 'Minas Gerais e Seus Inconfidentes',
    aprendizes_de_lucas: 'Exaltação ao Marechal Rondon',
    beija_flor: 'Tomada de Monte Castelo',
    tijuca: 'O Patriarca da Independência - José Bonifácio',
    unidos_de_bangu: 'O Maior Tributo da História',
    cartolinhas_de_caxias: 'Exaltação a Duque de Caxias',
    cabucu: 'Glória aos Vultos da Pátria',
    caprichosos_de_pilares: 'Glória aos Heróis de 1932',
    unidos_bento_ribeiro: 'Três Páginas da História',
    flor_do_lins: 'Um Século de Poesia',
    filhos_do_deserto: 'Homenagem ao Centenário de Olavo Bilac'
  },
  1957: {
    portela: 'Legados de D. João VI',
    imperio_serrano: 'D. João VI',
    mangueira: 'Brasil, Tesouro do Mundo',
    salgueiro: 'Navio Negreiro',
    aprendizes_de_lucas: 'Homenagem a Gonçalves Dias',
    uniao_de_jacarepagua: 'Exaltação aos Heróis Brasileiros',
    unidos_da_capela: 'Epopéia da Borracha',
    caprichosos_de_pilares: 'Glórias do Brasil Antigo',
    uniao_do_centenario: 'História dos Três Poderes',
    beija_flor: 'Riquezas do Brasil',
    tijuca: 'Festa dos Navegantes',
    cabucu: 'A Glória de Tiradentes',
    unidos_bento_ribeiro: 'Homenagem ao Centenário da Estrada de Ferro',
    filhos_do_deserto: 'Exaltação às Belas Artes',
    flor_do_lins: 'História da Cidade do Rio',
    vila_isabel: 'O Maior Carnaval do Mundo',
    tuiuti: 'Glórias do Teatro Municipal',
    paz_e_amor: 'Exaltação aos Bandeirantes'
  },
  1956: {
    imperio_serrano: 'O Caçador de Esmeraldas',
    portela: 'O Tesouro Descoberto por Colombo',
    mangueira: 'Exaltação a Getúlio Vargas',
    salgueiro: 'As Minas Gerais',
    aprendizes_de_lucas: 'Homenagem à Marinha',
    tijuca: 'A Epopéia dos Bandeirantes',
    cabucu: 'A Lenda da Princesa Encantada',
    paz_e_amor: 'Paz, Amor e Carnaval',
    filhos_do_deserto: 'Lendas e Tradições Indígenas',
    unidos_bento_ribeiro: 'Vultos Históricos',
    tuiuti: 'O Circo',
    unidos_da_capela: 'Homenagem ao Centenário de Santos Dumont',
    beija_flor: 'O Caçador de Esmeraldas',
    coracoes_unidos_jacarepagua: 'Brasil Tropical',
    caprichosos_de_pilares: 'Homenagem aos Heróis da Pátria',
    vai_se_quiser: 'Quem Quiser Que Venha Ver',
    unidos_da_congonha: 'História do Rio Antigo',
    unidos_do_indaia: 'Homenagem ao Amazonas',
    unidos_do_salgueiro: 'Noite de São João'
  },
  1955: {
    imperio_serrano: 'Exaltação a Caxias',
    mangueira: 'As Quatro Estações do Ano',
    portela: 'Cinco Bailes Tradicionais na História do Rio',
    salgueiro: 'Epopéia do Samba',
    aprendizes_de_lucas: 'Homenagem a José Bonifácio',
    beija_flor: 'Primavera',
    vai_se_quiser: 'Brasil de Ontem e de Hoje',
    unidos_da_congonha: 'Carnaval no Morro',
    filhos_do_deserto: 'Homenagem a Santos Dumont',
    caprichosos_de_pilares: 'Exaltação aos Grandes Mestres da Música',
    tuiuti: 'Apoteose ao Samba',
    tijuca: 'Inferno Verde',
    unidos_do_indaia: 'O Garimpo das Minas Gerais',
    cabucu: 'Lendas do Sertão',
    unidos_da_capela: 'Três Páginas da Nossa História',
    unidos_do_salgueiro: 'Origem do Samba',
    indios_do_acau: 'A Força das Florestas Brasileiras',
    imperio_da_tijuca: 'Exaltação à Princesa Isabel',
    uniao_do_catete: 'O Catete Republicano'
  },
  1954: {
    mangueira: 'O Novo Continente',
    imperio_serrano: 'O Guarda da Marinha Real',
    salgueiro: 'Uma Romaria à Bahia',
    portela: 'São Paulo Quatrocentão (Homenagem ao IV Centenário de São Paulo)',
    aprendizes_de_lucas: 'Três Páginas da História do Brasil',
    filhos_do_deserto: 'Homenagem às Forças Armadas',
    unidos_do_salgueiro: 'Exaltação à Marinha Nacional',
    indios_do_acau: 'A Dança dos Guerreiros Indígenas',
    cabucu: 'Glória ao Grande Santos Dumont',
    uniao_do_catete: 'O Rio através dos Tempos',
    paraiso_das_baianas: 'Exaltação às Baianas Tradicionais',
    tijuca: 'Três Vultos Históricos',
    unidos_da_capela: 'Apoteose ao Samba e às Suas Tradições',
    vai_se_quiser: 'O Carnaval Carioca',
    unidos_do_grajau: 'A Epopéia dos Bandeirantes',
    floresta_do_andarai: 'Tradições da Guanabara',
    unidos_do_indaia: 'O Descobrimento das Minas de Ouro',
    imperio_da_tijuca: 'Homenagem a Gonçalves Dias',
    engenho_da_rainha: 'A Mineração no Brasil Colonial',
    aventureiros_da_matriz: 'Homenagem à Cidade Maravilhosa',
    paz_e_amor: 'Bandeirantes e Pioneiros',
    unidos_da_tamarineira: 'Exaltação ao Folclore Nacional',
    independentes_do_rio: 'Achegas da História do Brasil',
    independentes_cordovil: 'O Esplendor da Natureza',
    uniao_vaz_lobo: 'Vultos Ilustres da Pátria'
  },
  1953: {
    portela: 'Seis Datas Magnas',
    imperio_serrano: 'O Último Baile da Ilha Fiscal',
    mangueira: 'Unidade Nacional',
    aprendizes_de_lucas: 'Três Épocas do Brasil',
    tijuca: 'De D. Pedro I a Caxias',
    unidos_do_salgueiro: 'Episódios Históricos',
    filhos_do_deserto: 'Glória à Marinha do Brasil',
    unidos_da_capela: 'Homenagem aos Heróis Nacionais',
    tres_mosqueteiros: 'Achegas Históricas',
    paz_e_amor: 'Quatro Vultos da História',
    floresta_do_andarai: 'Sonho das Flores',
    unidos_da_tamarineira: 'Exaltação ao Samba',
    depois_eu_digo: 'Vultos Históricos',
    unidos_do_indaia: 'Homenagem a Santos Dumont',
    uniao_do_catete: 'O Catete e a República',
    indios_do_acau: 'A Lenda da Vitória-Régia',
    cabucu: 'Bandeirantes do Sertão',
    vai_se_quiser: 'Tradições do Rio Antigo',
    cada_ano_sai_melhor: 'Reminiscências da Guanabara',
    aventureiros_da_matriz: 'Homenagem à Pátria',
    azul_e_branco_salgueiro: 'Os Bandeirantes da História',
    imperio_da_tijuca: 'Glória a Caxias'
  },
  1952: {
    aprendizes_de_lucas: 'Três Épocas do Brasil',
    azul_e_branco_salgueiro: 'Os Bandeirantes da História',
    combinado_do_amor: 'Amor e Samba',
    depois_eu_digo: 'Vultos Históricos',
    mangueira: 'Homenagem a Gonçalves Dias',
    filhos_do_deserto: 'Glória à Marinha do Brasil',
    imperio_da_tijuca: 'Homenagem a Gonçalves Dias',
    imperio_serrano: 'Homenagem à Medicina Brasileira',
    independentes_cordovil: 'O Esplendor da Natureza',
    paz_e_amor: 'Bandeirantes e Pioneiros',
    portela: 'Brasil de Ontem',
    tres_mosqueteiros: 'Achegas Históricas',
    uniao_vaz_lobo: 'Vultos Ilustres da Pátria',
    unidos_da_capela: 'Homenagem aos Heróis da Pátria',
    unidos_da_tamarineira: 'Exaltação ao Samba',
    tijuca: 'O Pavão no Asfalto',
    unidos_do_catete: 'Memórias do Catete',
    unidos_do_grajau: 'A Epopéia dos Bandeirantes',
    unidos_do_pecado: 'Festa no Terreiro',
    unidos_do_salgueiro: 'Episódios Históricos',
    vai_se_quiser: 'Tradições do Rio Antigo',
    aventureiros_da_matriz: 'Homenagem à Pátria',
    coracoes_unidos_jacarepagua: 'Guanabara Histórica',
    floresta_do_andarai: 'Tradições da Guanabara',
    indios_do_acau: 'A Lenda da Vitória-Régia'
  },
  1951: {
    // FBES
    imperio_serrano: 'Batalha do Riachuelo',
    aprendizes_de_lucas: 'Três Épocas do Brasil',
    filhos_do_deserto: 'Homenagem aos Heróis Nacionais',
    azul_e_branco_salgueiro: 'Martírio de Tiradentes',
    irmaos_unidos_do_catete: 'Exaltação à Guanabara',
    imperio_da_tijuca: 'Batalha do Passo da Pátria',
    indios_do_acau: 'Tupinambás',
    paz_e_amor: 'Vultos da Nossa História',
    unidos_do_grajau: 'A Epopéia dos Bandeirantes',
    vai_se_quiser: 'Tradições do Samba',
    uniao_vaz_lobo: 'Homenagem a Santos Dumont',
    depois_eu_digo: 'Episódios Históricos',
    floresta_do_andarai: 'O Esplendor do Andaraí',
    coracoes_unidos_da_favela: 'O Morro da Favela',
    unidos_de_santo_amaro: 'Glória a Santo Amaro',
    independentes_cordovil: 'O Rio Colonial',
    engenho_da_rainha: 'Bandeirantes e Pioneiros',
    unidos_do_pecado: 'Festa no Terreiro',
    independentes_do_rio: 'Achegas da Guanabara',
    unidos_do_outeiro: 'Glória a Caxias',
    estrela_de_ouro: 'O Brilho da Guanabara',
    unidos_de_cordovil: 'Exaltação à Pátria',
    unidos_do_itambi: 'Tradições Fluminenses',
    capricho_do_centenario: 'Centenário da Independência',
    unidos_dos_arcos: 'Os Arcos da Lapa',
    paraiso_do_grotao: 'O Grotão em Festa',
    mocidade_de_um_paraiso: 'Sonho de um Paraíso',
    vitoria_de_bento_ribeiro: 'As Glórias do Brasil',
    unidos_dos_telegrafos: 'Mangueira e Seus Telégrafos',
    trovadores_do_maracana: 'Samba e Poesia',
    uniao_dos_casados: 'Bodas do Samba',
    flor_do_lins: 'Primavera no Lins',
    unidos_de_campo_grande: 'Zona Oeste em Desfile',
    // UGESB
    portela: 'A Volta do Filho Pródigo',
    tres_mosqueteiros: 'D. João VI no Brasil',
    mangueira: 'Amor à Pátria',
    unidos_da_capela: 'Homenagem a Carlos Gomes',
    aventureiros_da_matriz: 'O Brasil Republicano',
    unidos_da_tamarineira: 'Exaltação às Tradições Brasileiras',
    tijuca: 'Três Épocas da História',
    coracoes_unidos_jacarepagua: 'Abolição da Escravatura',
    prazer_da_serrinha: 'A Epopéia da Serrinha',
    recreio_de_inhauma: 'Guanabara Histórica',
    cartolinhas_de_caxias: 'Duque de Caxias, O Pacificador',
    cabucu: 'Glória aos Bandeirantes',
    unidos_do_morro_azul: 'O Morro Azul Canta a Pátria',
    independentes_de_turiacu: 'Primavera em Turiaçu',
    unidos_do_coqueiro: 'O Coqueiro Verdejante',
    em_cima_da_hora_catumbi: 'Glória ao Catumbi',
    caprichosos_de_pilares: 'Guanabara Boêmia',
    embaixadores_sao_joao_meriti: 'História de São João de Meriti',
    nao_e_o_que_dizem: 'A Verdade do Samba',
    cada_ano_sai_melhor: 'Achegas Históricas',
    unidos_do_jacare: 'Verde e Rosa no Jacaré',
    unidos_do_indaia: 'O Descobrimento do Brasil',
    guarani_de_realengo: 'O Guarani de Carlos Gomes'
  },
  1950: {
    // FBES
    imperio_serrano: 'Batalha dos Guararapes',
    aprendizes_de_lucas: 'O Patriarca da Independência',
    irmaos_unidos_do_catete: 'Homenagem a Gonçalves Dias',
    floresta_do_andarai: 'Tradição Imperial',
    imperio_da_tijuca: 'Homenagem a Castro Alves',
    indios_do_acau: 'A Dança das Tribos',
    azul_e_branco_salgueiro: 'Exaltação à Marinha',
    independentes_cordovil: 'O Rio Antigo',
    unidos_do_engenho_velho: 'Glória ao Engenho Velho',
    mocidade_de_um_paraiso: 'Sonho Infantil',
    capricho_do_centenario: 'O Centenário',
    estrela_de_ouro: 'Ouro e Tradição',
    independentes_do_rio: 'Guanabara em Flor',
    paraiso_da_mocidade: 'Paraíso de Cordovil',
    uniao_vaz_lobo: 'Asas da Pátria',
    unidos_de_santo_amaro: 'Devoção e Samba',
    unidos_do_grajau: 'Primavera no Grajaú',
    uniao_dos_casados: 'Aliança do Samba',
    unidos_do_salgueiro: 'Recordações do Salgueiro',
    unidos_do_outeiro: 'Outeiro em Desfile',
    engenho_da_rainha: 'Terra das Rainhas',
    vitoria_de_bento_ribeiro: 'Vitória Brasileira',
    unidos_do_pecado: 'Pecado Original',
    imperio_da_colina: 'A Colina Imperial',
    orgulho_de_cordovil: 'Baluarte de Cordovil',
    coracoes_unidos_da_favela: 'O Morro em Flor',
    flor_do_lins: 'Flores de Maio',
    unidos_do_itambi: 'Terras Fluminenses',
    unidos_de_cosmos: 'Cosmos em Harmonia',
    imperio_do_samba: 'A Realeza da Zona Sul',
    sem_voce_vivo_bem: 'Alegria de Viver',
    unidos_da_lagoa: 'Cisne das Margens',
    unidos_da_barao_de_petropolis: 'Tradição da Barão',
    uniao_dos_topazios: 'Topázio da Baixada',
    unidos_dos_telegrafos: 'Sons da Mangueira',
    coracoes_da_liberdade: 'Liberdade no Samba',
    de_nos_ninguem_esquece: 'A Voz da Lembrança',
    // UCES
    mangueira: 'Plano SALTE - Saúde, Alimentação, Transporte e Energia',
    portela: 'Riquezas do Brasil',
    tijuca: 'Homenagem a Santos Dumont',
    coracoes_unidos_jacarepagua: 'Guanabara Histórica',
    vai_se_quiser: 'Tradições Cariocas',
    filhos_do_deserto: 'Oásis do Samba',
    unidos_do_coqueiro: 'Coqueiro de Ramos',
    uniao_do_realengo: 'Força de Realengo',
    unidos_de_riachuelo: 'Epopéia do Riachuelo',
    cada_ano_sai_melhor: 'Evolução Sambista',
    voz_do_orion: 'Constelação da Zona Norte',
    // UGESB
    prazer_da_serrinha: 'Canto à Natureza',
    unidos_da_capela: 'Homenagem a Olavo Bilac',
    depois_eu_digo: 'Páginas da História',
    paz_e_amor: 'Paz, Amor e Harmonia',
    tres_mosqueteiros: 'Glórias da Marinha Brasileira',
    unidos_da_congonha: 'Guanabara Tradição',
    unidos_da_tamarineira: 'Tamarineira em Festa',
    unidos_do_indaia: 'Ouro e Esplendor',
    vila_isabel: 'Homenagem à Marinha',
    unidos_de_turiacu: 'Turiaçu dos Meus Amores',
    recreio_de_inhauma: 'Achegas Históricas',
    prazer_da_mocidade: 'Alegria Sambista',
    cabucu: 'Glória aos Bandeirantes',
    caprichosos: 'Guanabara Boêmia',
    caprichosos_de_pilares: 'Guanabara Boêmia',
    em_cima_da_hora_catumbi: 'Catumbi Tradicional',
    paraiso_da_floresta: 'Mata Verdejante',
    unidos_de_terra_nova: 'Brilho de Terra Nova',
    uniao_de_sampaio: 'Sampaio Histórico',
    fiquei_firme: 'Firmeza no Samba'
  },
  1949: {
    // FBES
    imperio_serrano: 'Exaltação a Tiradentes',
    azul_e_branco_salgueiro: 'História do Rio Antigo',
    unidos_do_salgueiro: 'Glórias da Cidade Nova',
    floresta_do_andarai: 'Tradição do Andaraí',
    unidos_do_outeiro: 'Colina Verde',
    recreio_de_sao_carlos: 'Berço do Samba de São Carlos',
    aprendizes_de_lucas: 'Paz e Harmonia',
    independentes_cordovil: 'Sonho Carioca',
    filhos_do_deserto: 'Noites do Oriente',
    irmaos_unidos_do_catete: 'Glória ao Catete',
    unidos_de_santo_amaro: 'Santo Amaro em Festa',
    indios_do_acau: 'Guerreiros do Acaú',
    vitoria_de_bento_ribeiro: 'Vitória Sambista',
    flor_do_lins: 'Flor do Morro do Amor',
    manda_quem_pode: 'Manda Quem Pode no Salgueiro',
    paraiso_das_morenas: 'Paraíso em Flor',
    uniao_de_bras_de_pina: 'Brás de Pina em Festa',
    unidos_de_campo_grande: 'Orgulho de Campo Grande',
    imperio_da_colina: 'Colina em Festa',
    azul_e_branco_de_bonsucesso: 'Bonsucesso Tradicional',
    uniao_primeira: 'União e Samba',
    boemios_do_andarai: 'Noite de Boemia',
    coracoes_unidos_da_favela: 'Favela em Harmonia',
    orgulho_de_cordovil: 'Orgulho Suburbano',
    uniao_dos_casados: 'Aliança Sambista',
    cabucu: 'Glória aos Bandeirantes',
    imperio_do_andarai: 'Andaraí Tradicional',
    unidos_da_lagoa: 'Cisne das Margens',
    // UGESB
    mangueira: 'Apoteose aos Mestres',
    portela: 'O Despertar do Gigante',
    depois_eu_digo: 'Recordações da Praça Onze',
    prazer_da_serrinha: 'Voz da Serrinha',
    unidos_da_capela: 'Cântico à Natureza',
    tijuca: 'Proclamação da República',
    imperio_da_tijuca: 'Primavera em Flor',
    vila_isabel: 'Iracema',
    baianinhas_brasileiras: 'Riquezas da Bahia',
    unidos_de_turiacu: 'Turiaçu dos Meus Amores',
    coracoes_unidos_jacarepagua: 'Guanabara em Sol',
    vai_se_quiser: 'Quem Canta Seus Males Espanta',
    paz_e_amor: 'Paz e Amor em Romaria',
    em_cima_da_hora_catumbi: 'Catumbi Tradicional',
    unidos_de_tomas_coelho: 'Lembranças da Zona Norte',
    recreio_de_inhauma: 'Achegas Históricas',
    unidos_do_morro_azul: 'Alvorada do Morro',
    uniao_do_realengo: 'Força de Realengo',
    unidos_do_iraja: 'Flores de Irajá',
    imperio_de_campo_grande: 'Voz da Zona Oeste',
    nao_e_o_que_dizem: 'Verdade Sambista',
    unidos_de_terra_nova: 'Brilho de Terra Nova',
    fiquei_firme: 'Firmeza no Samba',
    coracao_das_morenas: 'Coração Providência'
  },
  1948: {
    imperio_serrano: 'Homenagem a Antônio Castro Alves',
    tijuca: 'Assinatura da Lei Áurea',
    portela: 'Exaltação à Redentora',
    mangueira: 'Brasil, Tesouro Incomparável',
    azul_e_branco_salgueiro: 'Reminiscências do Rio Antigo',
    paz_e_amor: 'Glórias da Pátria',
    imperio_da_tijuca: 'Homenagem aos Heróis de Laguna',
    prazer_da_serrinha: 'Castro Alves, o Poeta dos Escravos',
    unidos_de_turiacu: 'Primavera em Flor',
    depois_eu_digo: 'Epopéia da Independência',
    independentes_cordovil: 'Retalhos da História',
    recreio_de_inhauma: 'Samba e Tradição',
    aprendizes_de_lucas: 'Hino à Natureza',
    paraiso_das_morenas: 'Lendas da Guanabara',
    unidos_da_capela: 'Noites Cariocas',
    irmaos_unidos_do_catete: 'Memórias do Catete',
    vai_se_quiser: 'Vozes da Colina',
    unidos_de_santo_amaro: 'Glória à Bahia',
    estrela_de_ouro: 'Brilho Dourado',
    cada_ano_sai_melhor: 'Festa no Terreiro',
    unidos_do_salgueiro: 'História do Morro',
    cabucu: 'Bandeirantes do Brasil',
    coracoes_unidos_da_favela: 'União e Samba',
    sem_voce_vivo_bem: 'Alegria de Viver',
    unidos_de_bras_de_pina: 'Saudação à Leopoldina',
    unidos_de_cavalcante: 'Tradições de Cavalcante',
    unidos_de_tomas_coelho: 'Lembranças da Zona Norte',
    mocidade_de_cachambi: 'Primavera no Cachambi',
    unidos_do_morro_azul: 'Alvorada no Morro',
    unidos_do_outeiro: 'Paz no Outeiro',
    imperio_da_colina: 'Colina em Sol',
    paraiso_do_grotao: 'Música e Poesia',
    mocidade_de_um_paraiso: 'Sonho Paradisíaco',
    inimigos_da_tristeza: 'Adeus Tristeza, Viva a Folia',
    uniao_vaz_lobo: 'Canto a Vaz Lobo',
    unidos_do_castelo: 'Memórias do Morro do Castelo',
    unidos_da_lagoa: 'Águas de Guanabara'
  },
  1947: {
    portela: 'Honra ao Mérito (Glória à Justiça Real)',
    mangueira: 'Brasil, Reino Unido de Portugal, Brasil e Algarves',
    depois_eu_digo: 'Vultos Históricos da Pátria',
    paz_e_amor: 'Glórias da Pátria',
    azul_e_branco_salgueiro: 'Reminiscências do Passado',
    lira_do_amor: 'Epopéia da Música e do Amor',
    prazer_da_serrinha: 'Inconfidência Mineira',
    unidos_da_capela: 'Exaltação à Pátria',
    tijuca: 'Homenagem aos Santos',
    paraiso_das_morenas: 'Lendas e Folclore',
    filhos_do_deserto: 'Deserto em Flor',
    cada_ano_sai_melhor: 'Festa Tradicional Carioca',
    vila_isabel: 'Homenagem a Noel Rosa',
    cabucu: 'Bandeirantes Paulistas',
    unidos_do_salgueiro: 'Vida no Morro do Salgueiro',
    recreio_de_inhauma: 'Lembranças do Subúrbio',
    unidos_do_catete: 'Memórias da Zona Sul (Catete Velho)',
    recreio_de_sao_carlos: 'Canto ao Berço do Samba',
    paraiso_do_grotao: 'Primavera Carioca',
    escalao_de_tupa: 'Tributo ao Deus do Trovão',
    flor_do_lins: 'Flores de Madureira',
    unidos_de_terra_nova: 'Saudação ao Progresso',
    cenaculo_do_samba: 'Cálice da Poesia Sambista',
    unidos_do_morro_azul: 'Luar no Morro Azul',
    fiquei_firme: 'Firmeza no Compasso',
    aprendizes_de_copacabana: 'Princesinha do Mar',
    academicos_da_gavea: 'Pedra da Gávea e Seus Mistérios'
  },
  1946: {
    portela: 'Aljezur (Voando Para o Passado)',
    mangueira: 'Carnaval',
    depois_eu_digo: 'Glórias do Passado',
    imperio_da_tijuca: 'Homenagem aos Heróis de Laguna',
    azul_e_branco_salgueiro: 'Reminiscências Cariocas',
    paz_e_amor: 'Glórias da Pátria',
    lira_do_amor: 'Amor à Terra',
    tijuca: 'Anchieta',
    unidos_da_capela: 'Noites Cariocas',
    filhos_do_deserto: 'Deserto e Amor',
    prazer_da_serrinha: 'Castro Alves',
    unidos_do_salgueiro: 'História do Morro',
    coracoes_unidos_jacarepagua: 'Brasil de Ontem e de Hoje',
    nao_e_o_que_dizem: 'A Verdade do Samba',
    vai_se_quiser: 'Vozes da Colina',
    cada_ano_sai_melhor: 'Tradições Cariocas',
    uniao_primeira: 'União e Samba',
    fiquei_firme: 'Firmeza no Compasso',
    mocidade_louca_sao_cristovao: 'Loucuras do Samba de São Cristóvão'
  },
  1945: {
    portela: 'Motivos Patrióticos (Brasil Terra de Amor)',
    mangueira: 'A Glória do Samba (Homenagem aos Pracinhas)'
  },
  1944: {
    portela: 'Motivos Patrióticos',
    mangueira: 'Glória ao Samba'
  },
  1943: {
    portela: 'Carnaval de Guerra',
    mangueira: 'Samba no Terreiro',
    azul_e_branco_salgueiro: 'Reminiscências do Rio Antigo',
    deixa_malhar: 'Malandros e Sambistas da Tijuca',
    coracoes_unidos_jacarepagua: 'Guanabara em Sol',
    cada_ano_sai_melhor: 'Tradições Cariocas',
    depois_eu_digo: 'Páginas da História',
    fiquei_firme: 'Firmeza no Compasso',
    imperio_da_tijuca: 'Homenagem à Pátria',
    lira_do_amor: 'Amor e Canção',
    mocidade_louca_sao_cristovao: 'Loucuras de São Cristóvão',
    nao_e_o_que_dizem: 'A Verdade do Samba',
    paz_e_amor: 'Glórias da Pátria',
    prazer_da_serrinha: 'Castro Alves',
    uniao_de_sampaio: 'Sampaio Histórico',
    tijuca: 'Festa Tradicional',
    unidos_do_salgueiro: 'Vida no Morro',
    unidos_do_tuiuti: 'Tradições do Tuiuti',
    tuiuti: 'Tradições do Tuiuti',
    vai_se_quiser: 'Vozes da Colina'
  },
  1942: {
    portela: 'A Vida do Samba',
    depois_eu_digo: 'Glórias da Pátria',
    mangueira: 'No Terreiro de Mangueira',
    paz_e_amor: 'Paz e Harmonia',
    deixa_malhar: 'Malandros da Tijuca',
    unidos_do_salgueiro: 'Origens do Salgueiro',
    papagaio_linguarudo: 'Cantando e Falando no Terreiro',
    cada_ano_sai_melhor: 'Tradições Cariocas',
    azul_e_branco_salgueiro: 'Páginas do Samba',
    fiquei_firme: 'Firmeza no Compasso',
    uniao_de_sampaio: 'Exaltação ao Sampaio',
    unidos_do_tuiuti: 'Tradições do Morro do Tuiuti',
    nao_e_o_que_dizem: 'A Verdade do Samba',
    mocidade_de_um_paraiso: 'Paraíso de Encantos',
    tijuca: 'Guanabara Tradicional',
    prazer_da_serrinha: 'Vozes da Serrinha',
    mocidade_louca_sao_cristovao: 'Loucuras do Samba de São Cristóvão',
    unidos_de_riachuelo: 'Riachuelo em Festa',
    paraiso_de_anchieta: 'Anchieta em Folia',
    uniao_de_colegio: 'União da Colina de Colégio',
    paraiso_do_grotao: 'Primavera Carioca',
    flor_da_infancia_bras_de_pina: 'Infância e Poesia',
    vai_se_quiser: 'Vozes da Colina'
  },
  1941: {
    portela: 'Dez Anos de Glória',
    mangueira: 'Transformação do Samba',
    depois_eu_digo: 'Glória ao Samba',
    deixa_malhar: 'O Samba e as Suas Tradições',
    tijuca: 'Tradições do Rio de Janeiro',
    unidos_do_salgueiro: 'O Morro do Salgueiro em Desfile',
    paz_e_amor: 'Harmonia e Glória',
    lira_do_amor: 'Páginas do Samba',
    mocidade_louca_sao_cristovao: 'São Cristóvão Imperial',
    nao_e_o_que_dizem: 'A Verdade do Samba',
    fiquei_firme: 'Firmeza no Compasso',
    prazer_da_serrinha: 'Aquarela da Serrinha',
    cada_ano_sai_melhor: 'Evolução do Samba',
    unidos_do_tuiuti: 'Lembranças do Morro do Tuiuti',
    uniao_de_sampaio: 'Tradição do Sampaio',
    vai_se_quiser: 'Vozes do Morro',
    filhos_do_deserto: 'Maravilhas da Terra'
  },
  1940: {
    mangueira: 'Prélio Sambístico',
    mocidade_louca_sao_cristovao: 'Epopéia do Samba em São Cristóvão',
    azul_e_branco_salgueiro: 'Reminiscências do Salgueiro',
    uniao_de_sampaio: 'Tradição do Sampaio',
    portela: 'Homenagem à Justiça',
    deixa_malhar: 'Malandragem da Tijuca',
    cada_ano_sai_melhor: 'Tradições da Praça Onze',
    paz_e_amor: 'Paz e Harmonia',
    tijuca: 'Homenagem aos Heróis da Pátria',
    fiquei_firme: 'Firmeza no Samba',
    uniao_barao_da_gamboa: 'Epopéia da Gamboa',
    depois_eu_digo: 'Glórias da Pátria',
    unidos_da_mangueira: 'O Morro de Mangueira em Festa',
    ultima_hora: 'Madureira em Desfile',
    unidos_do_salgueiro: 'Origens do Salgueiro',
    vai_se_quiser: 'Vozes do Morro',
    lira_do_amor: 'Canto ao Amor',
    nao_e_o_que_dizem: 'A Verdade do Samba',
    filhos_do_deserto: 'Maravilhas do Deserto',
    unidos_do_tuiuti: 'Lembranças do Tuiuti',
    prazer_da_serrinha: 'Aquarela da Serrinha',
    uniao_de_colegio: 'Alegria em Colégio',
    coracoes_unidos_jacarepagua: 'Guanabara em Sol'
  },
  1939: {
    portela: 'Teste ao Samba',
    mangueira: 'Noções de Geografia',
    unidos_do_tuiuti: 'Tradições do Morro',
    depois_eu_digo: 'Exaltação à Música Brasileira',
    unidos_da_mangueira: 'A Voz do Morro',
    tijuca: 'Clássicos Nacionais',
    azul_e_branco_salgueiro: 'Samba e Poesia',
    uniao_de_sampaio: 'Minha Terra',
    deixa_malhar: 'Noites Cariocas',
    uniao_parada_de_lucas: 'Saudações de Lucas',
    fiquei_firme: 'Firmeza e Ritmo',
    uniao_barao_da_gamboa: 'Lembranças da Gamboa',
    lira_do_amor: 'Canção de Amor',
    unidos_da_capela: 'História do Samba',
    unidos_do_salgueiro: 'Origens do Samba',
    prazer_da_serrinha: 'Serrinha em Festa',
    uniao_da_mocidade: 'Alegria da Mocidade',
    mocidade_louca_sao_cristovao: 'Mocidade em Desfile',
    filhos_do_deserto: 'Noites do Deserto',
    unidos_de_rocha_miranda: 'Exaltação a Rocha Miranda',
    recreio_de_ramos: 'Ramos Tradicional',
    rainha_das_pretas: 'Homenagem à Rainha',
    nao_e_o_que_dizem: 'A Razão do Samba',
    cada_ano_sai_melhor: 'Passos da Folia',
    paz_e_amor: 'Paz no Terreiro',
    ultima_hora: 'Madureira Alerta',
    papagaio_linguarudo: 'Trabalho e Harmonia',
    uniao_de_madureira: 'Canto de Madureira',
    vai_se_quiser: 'Lamento da Colina',
    vizinha_faladeira: 'Sem Falar de Ninguém'
  },
  1938: {
    azul_e_branco_salgueiro: 'O Samba no Salgueiro',
    baianinhas_brasileiras: 'Bahia Tradicional',
    cada_ano_sai_melhor: 'Alegrias do Povo',
    coracoes_unidos_jacarepagua: 'Aquarela Suburbana',
    deixa_malhar: 'Malandros da Tijuca',
    depois_eu_digo: 'O Samba em Festa',
    mangueira: 'Homenagem ao Morro',
    filhos_do_deserto: 'Deserto em Flor',
    fiquei_firme: 'Batuque Firme',
    lira_do_amor: 'Amor ao Samba',
    mocidade_louca_sao_cristovao: 'São Cristóvão em Folia',
    mocidade_unidos_do_riachuelo: 'Riachuelo em Ritmo',
    na_hora_e_que_se_ve: 'Na Hora da Batucada',
    nao_e_o_que_dizem: 'A Voz do Povo',
    papagaio_linguarudo: 'Cantos da Favela',
    paraiso_de_campo_grande: 'Flores de Campo Grande',
    paraiso_do_grotao: 'O Grotão em Canto',
    paz_e_amor: 'Paz e Concórdia',
    portela: 'Glórias da Portela',
    prazer_da_serrinha: 'Melodias da Serrinha',
    rainha_das_pretas: 'Canto da Rainha',
    recreio_de_ramos: 'Recordações de Ramos',
    ultima_hora: 'O Trem de Madureira',
    uniao_barao_da_gamboa: 'Saudações da Gamboa',
    uniao_da_mocidade: 'União e Samba',
    uniao_de_madureira: 'Vozes de Madureira',
    uniao_de_sampaio: 'Sampaio Tradicional',
    uniao_de_colegio: 'A União de Colégio',
    uniao_entre_nos: 'Entre Nós e o Samba',
    uniao_parada_de_lucas: 'Parada de Lucas em Festa',
    unidos_da_capela: 'Tradições da Capela',
    unidos_da_mangueira: 'Mangueira em Canção',
    tijuca: 'O Pavão no Asfalto',
    unidos_de_cavalcante: 'Cavalcante em Samba',
    unidos_do_salgueiro: 'Salgueiro Altaneiro',
    unidos_do_tuiuti: 'Saudações do Tuiuti',
    vizinha_faladeira: 'Histórias do Santo Cristo'
  },
  1937: {
    vizinha_faladeira: 'Uma Só Família',
    portela: 'O Tesouro das Ruínas',
    depois_eu_digo: 'Tradição do Salgueiro',
    unidos_da_mangueira: 'Samba e Amor',
    unidos_do_tuiuti: 'Lendas do Tuiuti',
    uniao_parada_de_lucas: 'O Canto de Lucas',
    azul_e_branco_salgueiro: 'Tradições do Salgueiro',
    papagaio_linguarudo: 'Cantos da Favela',
    cada_ano_sai_melhor: 'Cada Ano Sai Melhor',
    mocidade_louca_sao_cristovao: 'São Cristóvão em Flor',
    unidos_de_cavalcante: 'Cavalcante no Asfalto',
    uniao_barao_da_gamboa: 'Gamboa e Saúde',
    paraiso_do_grotao: 'O Grotão em Canto',
    unidos_do_salgueiro: 'Salgueiro Altaneiro',
    fiquei_firme: 'Fiquei Firme',
    filhos_do_deserto: 'Oásis do Samba'
  },
  1936: {
    tijuca: 'Sonho das Ilusões',
    mangueira: 'Não Faz Mal, a Mangueira É Maior',
    portela: 'A Batalha do Riachuelo',
    depois_eu_digo: 'Samba na Favela',
    deixa_malhar: 'Deixa Malhar na Tijuca',
    vizinha_faladeira: 'Pai João',
    uniao_barao_da_gamboa: 'Saudações da Gamboa',
    fiquei_firme: 'Samba Firme',
    ultima_hora: 'Última Hora de Madureira',
    azul_e_branco_salgueiro: 'Saudações Salgueirenses',
    lira_do_amor: 'A Lira Canta'
  },
  1935: {
    portela: 'O Samba Dominando o Mundo',
    mangueira: 'O Romance do Samba',
    prazer_da_serrinha: 'A Serrinha Canta',
    vizinha_faladeira: 'Malandro Regenerado',
    tijuca: 'O Pavão no Asfalto',
    azul_e_branco_salgueiro: 'Salgueiro em Festa',
    cada_ano_sai_melhor: 'Cada Ano Sai Melhor',
    coracoes_unidos_da_favela: 'Corações Unidos na Favela',
    deixa_malhar: 'Deixa Malhar no Samba',
    depois_eu_digo: 'Depois Eu Digo',
    depois_te_explico: 'Depois Te Explico no Terreiro',
    em_cima_da_hora_catumbi: 'Catumbi em Folia',
    fiquei_firme: 'Samba Firme',
    lira_do_amor: 'A Lira Canta',
    na_hora_e_que_se_ve: 'Na Hora É Que Se Vê',
    paraiso_do_grotao: 'O Grotão em Canto',
    paz_e_amor: 'Paz e Harmonia',
    rainha_das_pretas: 'Canto da Rainha',
    ultima_hora: 'O Apito do Trem',
    uniao_barao_da_gamboa: 'Saudações da Gamboa',
    uniao_do_uruguai: 'União da Tijuca na Rua Uruguai',
    unidos_do_salgueiro: 'O Samba do Salgueiro',
    unidos_do_tuiuti: 'Tradição do Tuiuti'
  },
  1934: {
    mangueira: 'República do Samba',
    recreio_de_ramos: 'Glórias de Ramos',
    portela: 'Academia do Samba',
    tijuca: 'O Pavão no Asfalto',
    deixa_malhar: 'Malandros em Desfile',
    unidos_da_saude: 'O Porto em Festa',
    vizinha_faladeira: 'Malandro Regenerado',
    para_o_ano_sai_melhor: 'Esperança da Folia',
    azul_e_branco_salgueiro: 'Salgueiro em Festa',
    cada_ano_sai_melhor: 'Cada Ano Sai Melhor',
    de_mim_ninguem_se_lembra: 'A Voz da Lembrança',
    depois_eu_digo: 'Depois Eu Digo',
    depois_te_explico: 'Depois Te Explico no Terreiro',
    em_cima_da_hora_catumbi: 'Catumbi em Folia',
    fale_quem_quizer: 'Fale Quem Quiser',
    filhos_de_ninguem: 'Irmãos no Samba',
    fiquei_firme: 'Samba Firme',
    lira_do_amor: 'A Lira Canta',
    paraiso_da_floresta: 'Mata Verdejante',
    paraiso_do_grotao: 'O Grotão em Canto',
    prazer_da_serrinha: 'A Serrinha Canta',
    ultima_hora: 'Última Hora de Madureira',
    uniao_barao_da_gamboa: 'Saudações da Gamboa',
    uniao_de_madureira: 'Canto de Madureira',
    uniao_do_amor: 'Coração no Terreiro',
    uniao_do_sape: 'Raiz do Sapê'
  },
  1933: {
    mangueira: 'Uma Segunda-Feira na Mangueira',
    azul_e_branco_salgueiro: 'Salgueiro em Festa',
    tijuca: 'O Pavão no Asfalto',
    de_mim_ninguem_se_lembra: 'A Voz da Lembrança',
    portela: 'Samba e Amor',
    uniao_do_uruguai: 'União da Tijuca na Rua Uruguai',
    aventureiros_da_matriz: 'Samba na Matriz',
    capricho_do_engenho_novo: 'Capricho no Samba',
    e_assim_que_nos_queremos: 'É Assim que Nós Queremos',
    e_o_que_se_ve: 'É o Que Se Vê',
    em_cima_da_hora_catumbi: 'Catumbi em Folia',
    amizade_do_realengo: 'Amizade no Samba',
    estrela_da_tijuca: 'Brilho da Tijuca',
    filhos_de_ninguem: 'Irmãos no Samba',
    fiquei_firme: 'Samba Firme',
    inimigos_da_tristeza: 'Alegria no Morro',
    lira_do_amor: 'A Lira Canta',
    mocidade_louca_sao_cristovao: 'Mocidade em Desfile',
    na_hora_e_que_se_ve: 'Na Hora é Que Se Vê',
    nos_nao_somos_la_essas_coisas: 'Nós Não Somos Lá Essas Coisas',
    paz_e_amor: 'Paz e Amor na Avenida',
    podia_ser_pior: 'Podia Ser Pior',
    prazer_da_serrinha: 'A Serrinha Canta',
    principes_da_floresta: 'Príncipes da Floresta',
    recreio_de_ramos: 'Glórias de Ramos',
    sport_club_guarany: 'Guarany em Folia',
    escola_tuiuti: 'O Morro do Tuiuti',
    ultima_hora: 'O Apito do Trem',
    uniao_barao_da_gamboa: 'Saudações da Gamboa',
    uniao_do_amor: 'Coração no Terreiro',
    unidos_do_salgueiro: 'O Samba do Salgueiro',
    vizinha_faladeira: 'Malandro Regenerado'
  },
  1932: {
    mangueira: 'Sorrindo (A Floresta)',
    segunda_linha_do_estacio: 'O Berço do Samba no Estácio',
    portela: 'O Carnaval Carioca',
    para_o_ano_sai_melhor: 'Esperança e Alegria',
    tijuca: 'O Pavão no Asfalto'
  }
};

/**
 * Normaliza id da escola para busca
 */
function normalizeId(rawId?: string, rawName?: string): string {
  if (rawId && rawId.trim()) {
    const id = rawId.trim().toLowerCase();
    if (id.includes('unidos_da_mangueira')) return 'unidos_da_mangueira';
    if (id.includes('uniao_barao_da_gamboa')) return 'uniao_barao_da_gamboa';
    if (id.includes('ultima_hora')) return 'ultima_hora';
    if (id.includes('unidos_do_tuiuti')) return 'unidos_do_tuiuti';
    if (id.includes('uniao_parada_de_lucas')) return 'uniao_parada_de_lucas';
    if (id.includes('uniao_da_mocidade')) return 'uniao_da_mocidade';
    if (id.includes('unidos_de_rocha_miranda')) return 'unidos_de_rocha_miranda';
    if (id.includes('rainha_das_pretas')) return 'rainha_das_pretas';
    if (id.includes('uniao_de_madureira')) return 'uniao_de_madureira';
    if (id.includes('uniao_entre_nos')) return 'uniao_entre_nos';
    if (id.includes('paraiso_de_campo_grande')) return 'paraiso_de_campo_grande';
    if (id.includes('na_hora_e_que_se_ve')) return 'na_hora_e_que_se_ve';
    if (id.includes('mocidade_unidos_do_riachuelo')) return 'mocidade_unidos_do_riachuelo';
    if (id.includes('recreio_de_ramos')) return 'recreio_de_ramos';
    if (id.includes('vizinha_faladeira')) return 'vizinha_faladeira';
    if (id.includes('depois_te_explico')) return 'depois_te_explico';
    if (id.includes('uniao_do_uruguai')) return 'uniao_do_uruguai';
    if (id.includes('de_mim_ninguem_se_lembra')) return 'de_mim_ninguem_se_lembra';
    if (id.includes('para_o_ano_sai_melhor')) return 'para_o_ano_sai_melhor';
    if (id.includes('fale_quem_quizer')) return 'fale_quem_quizer';
    if (id.includes('uniao_do_sape')) return 'uniao_do_sape';
    if (id.includes('unidos_da_saude')) return 'unidos_da_saude';
    if (id.includes('filhos_de_ninguem')) return 'filhos_de_ninguem';
    if (id.includes('uniao_do_amor')) return 'uniao_do_amor';
    if (id.includes('recreio_de_sao_carlos')) return 'recreio_de_sao_carlos';
    if (id.includes('capricho_do_engenho_novo')) return 'capricho_do_engenho_novo';
    if (id.includes('e_assim_que_nos_queremos')) return 'e_assim_que_nos_queremos';
    if (id.includes('e_o_que_se_ve')) return 'e_o_que_se_ve';
    if (id.includes('amizade_do_realengo')) return 'amizade_do_realengo';
    if (id.includes('estrela_da_tijuca')) return 'estrela_da_tijuca';
    if (id.includes('nos_nao_somos_la_essas_coisas')) return 'nos_nao_somos_la_essas_coisas';
    if (id.includes('podia_ser_pior')) return 'podia_ser_pior';
    if (id.includes('principes_da_floresta')) return 'principes_da_floresta';
    if (id.includes('sport_club_guarany')) return 'sport_club_guarany';
    if (id.includes('escola_tuiuti')) return 'escola_tuiuti';
    if (id.includes('estacio') || id.includes('sao_carlos')) return 'estacio_de_sa';
    if ((id.includes('padre_miguel') || id === 'upm') && !id.includes('mocidade')) return 'unidos_padre_miguel';
    if (id.includes('marica')) return 'marica';
    return id;
  }
  if (!rawName) return '';
  const n = rawName.toLowerCase();
  if (n.includes('capricho do engenho novo')) return 'capricho_do_engenho_novo';
  if (n.includes('estrela da tijuca')) return 'estrela_da_tijuca';
  if (n === 'tuiuti' || n.includes('escola de samba tuiuti') || n.includes('escola tuiuti')) return 'escola_tuiuti';
  if (n.includes('viradouro')) return 'viradouro';
  if (n.includes('beija-flor') || n.includes('beija flor')) return 'beija_flor';
  if (n.includes('vila isabel')) return 'vila_isabel';
  if (n.includes('unidos do salgueiro')) return 'unidos_do_salgueiro';
  if (n.includes('azul e branco') && n.includes('salgueiro')) return 'azul_e_branco_salgueiro';
  if (n.includes('salgueiro')) return 'salgueiro';
  if (n.includes('imperatriz')) return 'imperatriz';
  if (n.includes('unidos da mangueira') || n.includes('unidos_da_mangueira')) return 'unidos_da_mangueira';
  if (n.includes('mangueira')) return 'mangueira';
  if (n.includes('tijuca') && !n.includes('império')) return 'tijuca';
  if (n.includes('grande rio')) return 'grande_rio';
  if (n.includes('unidos do tuiuti')) return 'unidos_do_tuiuti';
  if (n.includes('tuiuti')) return 'tuiuti';
  if (n.includes('portela')) return 'portela';
  if (n.includes('mocidade')) return 'mocidade';
  if (n.includes('maricá') || n.includes('marica')) return 'marica';
  if ((n.includes('padre miguel') || n === 'upm') && !n.includes('mocidade')) return 'unidos_padre_miguel';
  if (n.includes('serrano')) return 'imperio_serrano';
  if (n.includes('império da tijuca') || n.includes('imperio da tijuca')) return 'imperio_da_tijuca';
  if (n.includes('recreio de são carlos') || n.includes('recreio de sao carlos')) return 'recreio_de_sao_carlos';
  if (n.includes('estácio') || n.includes('são carlos') || n.includes('estacio')) return 'estacio_de_sa';
  if (n.includes('clemente')) return 'sao_clemente';
  if (n.includes('ilha')) return 'uniao_da_ilha';
  if (n.includes('pedra')) return 'porto_da_pedra';
  if (n.includes('caprichosos')) return 'caprichosos_de_pilares';
  if (n.includes('tradição') || n.includes('tradicao')) return 'tradicao';
  if (n.includes('ponte')) return 'unidos_da_ponte';
  if (n.includes('santa cruz')) return 'santa_cruz';
  if (n.includes('cabuçu') || n.includes('cabucu')) return 'cabucu';
  if (n.includes('niterói') || n.includes('niteroi')) return 'niteroi';
  if (n.includes('arrastão') || n.includes('arrastao')) return 'arrastao_cascadura';
  if (n.includes('arranco')) return 'arranco';
  if (n.includes('lucas')) return 'unidos_de_lucas';
  if (n.includes('lins')) return 'lins_imperial';
  if (n.includes('cima da hora')) return 'em_cima_da_hora';
  if (n.includes('flor da infância') || n.includes('flor da infancia')) return 'flor_da_infancia_bras_de_pina';
  if (n.includes('unidos de brás de pina') || n.includes('unidos de bras de pina')) return 'unidos_de_bras_de_pina';
  if (n.includes('união de brás de pina') || n.includes('uniao de bras de pina')) return 'uniao_de_bras_de_pina';
  if (n.includes('tupy') || n.includes('brás de pina') || n.includes('bras de pina')) return 'tupy_bras_de_pina';
  if (n.includes('império de campo grande') || n.includes('imperio de campo grande')) return 'imperio_de_campo_grande';
  if (n.includes('cavalcante')) return 'unidos_de_cavalcante';
  if (n.includes('cachambi')) return 'mocidade_de_cachambi';
  if (n.includes('inimigos da tristeza') || n.includes('tristeza')) return 'inimigos_da_tristeza';
  if (n.includes('castelo')) return 'unidos_do_castelo';
  if (n.includes('papagaio')) return 'papagaio_linguarudo';
  if (n.includes('anchieta')) return 'paraiso_de_anchieta';
  if (n.includes('colégio') || n.includes('colegio')) return 'uniao_de_colegio';
  if (n.includes('deixa malhar')) return 'deixa_malhar';
  if (n.includes('depois eu digo')) return 'depois_eu_digo';
  if (n.includes('paz e amor')) return 'paz_e_amor';
  if (n.includes('lira do amor')) return 'lira_do_amor';
  if (n.includes('filhos do deserto')) return 'filhos_do_deserto';
  if (n.includes('mocidade louca')) return 'mocidade_louca_sao_cristovao';
  if (n.includes('não é o que dizem') || n.includes('nao e o que dizem')) return 'nao_e_o_que_dizem';
  if (n.includes('fiquei firme')) return 'fiquei_firme';
  if (n.includes('prazer da serrinha')) return 'prazer_da_serrinha';
  if (n.includes('cada ano sai melhor')) return 'cada_ano_sai_melhor';
  if (n.includes('sampaio')) return 'uniao_de_sampaio';
  if (n.includes('vai se quiser')) return 'vai_se_quiser';
  if (n.includes('barão da gamboa') || n.includes('barao da gamboa') || n.includes('gamboa')) return 'uniao_barao_da_gamboa';
  if (n.includes('última hora') || n.includes('ultima hora')) return 'ultima_hora';
  if (n.includes('parada de lucas')) return 'uniao_parada_de_lucas';
  if (n.includes('união da mocidade') || n.includes('uniao da mocidade')) return 'uniao_da_mocidade';
  if (n.includes('modelo unidos do riachuelo') || n.includes('mocidade unidos do riachuelo')) return 'mocidade_unidos_do_riachuelo';
  if (n.includes('paraíso de campo grande') || n.includes('paraiso de campo grande')) return 'paraiso_de_campo_grande';
  if (n.includes('união de madureira') || n.includes('uniao de madureira')) return 'uniao_de_madureira';
  if (n.includes('rocha miranda')) return 'unidos_de_rocha_miranda';
  if (n.includes('rainha das pretas')) return 'rainha_das_pretas';
  if (n.includes('entre nós') || n.includes('entre nos')) return 'uniao_entre_nos';
  if (n.includes('na hora é que se vê') || n.includes('na hora e que se ve')) return 'na_hora_e_que_se_ve';
  if (n.includes('recreio de ramos')) return 'recreio_de_ramos';
  if (n.includes('vizinha faladeira') || n.includes('vizinha')) return 'vizinha_faladeira';
  if (n.includes('depois te explico')) return 'depois_te_explico';
  if (n.includes('uruguai') || n.includes('uruguay')) return 'uniao_do_uruguai';
  if (n.includes('ninguém se lembra') || n.includes('ninguem se lembra')) return 'de_mim_ninguem_se_lembra';
  if (n.includes('para o ano sai melhor')) return 'para_o_ano_sai_melhor';
  if (n.includes('fale quem quizer') || n.includes('fale quem quiser')) return 'fale_quem_quizer';
  if (n.includes('sapê') || n.includes('sape')) return 'uniao_do_sape';
  if (n.includes('saúde') || n.includes('saude')) return 'unidos_da_saude';
  if (n.includes('filhos de ninguém') || n.includes('filhos de ninguem')) return 'filhos_de_ninguem';
  if (n.includes('união do amor') || n.includes('uniao do amor')) return 'uniao_do_amor';
  if (n.includes('é assim que nós queremos') || n.includes('e assim que nos queremos')) return 'e_assim_que_nos_queremos';
  if (n.includes('é o que se vê') || n.includes('e o que se ve')) return 'e_o_que_se_ve';
  if (n.includes('amizade do realengo')) return 'amizade_do_realengo';
  if (n.includes('lá essas coisas') || n.includes('la essas coisas')) return 'nos_nao_somos_la_essas_coisas';
  if (n.includes('podia ser pior')) return 'podia_ser_pior';
  if (n.includes('príncipes da floresta') || n.includes('principes da floresta')) return 'principes_da_floresta';
  if (n.includes('guarany') || n.includes('sport club') || n.includes('sport clube')) return 'sport_club_guarany';
  if (n.includes('vai como pode')) return 'portela';
  return '';
}

/**
 * Retorna o título oficial do enredo de uma escola em um carnaval histórico específico,
 * considerando tanto os anos catalogados quanto os enredos utilizados durante o save.
 */
export function getHistoricalEnredo(
  year: number,
  schoolId?: string,
  schoolName?: string,
  schoolObj?: School,
  inGameHistory?: YearHistory[]
): string | undefined {
  const key = normalizeId(schoolId, schoolName);
  const canonKey = normalizeCanonicalSchoolId(schoolId, schoolName);

  // 1. Para todos os carnavais oficiais já catalogados (1932 a 2026),
  // o Catálogo Oficial Canônico é soberano e autoritativo em 100% dos locais
  if (year <= 2026) {
    if (year === 2026) {
      const canonical = getCanonical2026Enredo(schoolId, schoolName);
      if (canonical?.title) return canonical.title;
    }
    if (year === 2024) {
      const canonical = getCanonical2024Enredo(schoolId, schoolName);
      if (canonical?.title) return canonical.title;
    }
    if (year === 2023) {
      const canonical = getCanonical2023Enredo(schoolId, schoolName);
      if (canonical?.title) return canonical.title;
    }
    if (year === 2022) {
      const canonical = getCanonical2022Enredo(schoolId, schoolName);
      if (canonical?.title) return canonical.title;
    }
    if (year === 2020) {
      const canonical = getCanonical2020Enredo(schoolId, schoolName);
      if (canonical?.title) return canonical.title;
    }
    if (year === 2019) {
      const canonical = getCanonical2019Enredo(schoolId, schoolName);
      if (canonical?.title) return canonical.title;
    }
    if (year === 2018) {
      const canonical = getCanonical2018Enredo(schoolId, schoolName);
      if (canonical?.title) return canonical.title;
    }
    if (year === 2017) {
      const canonical = getCanonical2017Enredo(schoolId, schoolName);
      if (canonical?.title) return canonical.title;
    }
    if (year === 2016) {
      const canonical = getCanonical2016Enredo(schoolId, schoolName);
      if (canonical?.title) return canonical.title;
    }

    const yearRecords = HISTORICAL_ENREDOS_BY_YEAR[year];
    if (yearRecords) {
      if (key && yearRecords[key]) return yearRecords[key];
      if (canonKey && yearRecords[canonKey]) return yearRecords[canonKey];
      if (schoolId && yearRecords[schoolId]) return yearRecords[schoolId];
      if (schoolName && yearRecords[schoolName.toLowerCase()]) return yearRecords[schoolName.toLowerCase()];
    }
  }

  // 2. Para temporadas simuladas in-game (anos > 2026), verifica no inGameHistory do save
  if (inGameHistory && inGameHistory.length > 0) {
    const histYear = inGameHistory.find((h) => h.year === year);
    if (histYear?.schoolEnredos) {
      const match =
        (schoolId && histYear.schoolEnredos[schoolId]) ||
        (schoolName && histYear.schoolEnredos[schoolName]) ||
        (key && histYear.schoolEnredos[key]) ||
        (canonKey && histYear.schoolEnredos[canonKey]);
      if (match) return match;
    }
  }

  // 3. Temporada atual em andamento no save (se for > 2026 ou se a escola do jogador definiu enredo novo)
  if (schoolObj?.currentEnredo?.title) {
    const activeYr = (schoolObj as any).currentYear || 2026;
    if (year === activeYr && year > 2026) {
      return schoolObj.currentEnredo.title;
    }
  }

  // 4. Histórico gravado na própria agremiação no save
  if (schoolObj?.enredoHistory && schoolObj.enredoHistory.length > 0) {
    const match = schoolObj.enredoHistory.find((h) => h.year === year);
    if (match?.enredo) return match.enredo;
  }

  // 5. Fallback geral no catálogo
  const fallbackRecords = HISTORICAL_ENREDOS_BY_YEAR[year];
  if (fallbackRecords) {
    if (key && fallbackRecords[key]) return fallbackRecords[key];
    if (canonKey && fallbackRecords[canonKey]) return fallbackRecords[canonKey];
    if (schoolId && fallbackRecords[schoolId]) return fallbackRecords[schoolId];
  }

  return undefined;
}

/**
 * Retorna todos os enredos históricos de uma escola em ordem decrescente de ano,
 * combinando os registros históricos oficiais com os enredos usados no save.
 */
export function getSchoolHistoricalEnredosList(
  schoolId: string,
  schoolName?: string,
  schoolObj?: School,
  inGameHistory?: YearHistory[],
  currentYear?: number
): { year: number; enredo: string }[] {
  const key = normalizeId(schoolId, schoolName);
  const canonKey = normalizeCanonicalSchoolId(schoolId, schoolName);
  const enredosMap = new Map<number, string>();

  // 1. Catálogo histórico oficial (1932 a 2026)
  const years = Object.keys(HISTORICAL_ENREDOS_BY_YEAR).map(Number).sort((a, b) => b - a);
  years.forEach((yr) => {
    let enredo = HISTORICAL_ENREDOS_BY_YEAR[yr]?.[key];
    if (!enredo && canonKey) {
      enredo = HISTORICAL_ENREDOS_BY_YEAR[yr]?.[canonKey];
    }
    if (!enredo && schoolId) {
      enredo = HISTORICAL_ENREDOS_BY_YEAR[yr]?.[schoolId];
    }
    if (!enredo && schoolName) {
      enredo = HISTORICAL_ENREDOS_BY_YEAR[yr]?.[schoolName.toLowerCase()];
    }
    if (enredo) {
      enredosMap.set(yr, enredo);
    }
  });

  // Garante que o enredo canônico oficial de 2026 seja registrado de forma autoritativa
  const can2026 = getCanonical2026Enredo(schoolId, schoolName);
  if (can2026?.title) {
    enredosMap.set(2026, can2026.title);
  }

  // Garante que o enredo canônico oficial de 2024 seja registrado de forma autoritativa
  const can2024 = getCanonical2024Enredo(schoolId, schoolName);
  if (can2024?.title) {
    enredosMap.set(2024, can2024.title);
  }

  // Garante que o enredo canônico oficial de 2023 seja registrado de forma autoritativa
  const can2023 = getCanonical2023Enredo(schoolId, schoolName);
  if (can2023?.title) {
    enredosMap.set(2023, can2023.title);
  }

  // Garante que o enredo canônico oficial de 2022 seja registrado de forma autoritativa
  const can2022 = getCanonical2022Enredo(schoolId, schoolName);
  if (can2022?.title) {
    enredosMap.set(2022, can2022.title);
  }

  // Garante que o enredo canônico oficial de 2020 seja registrado de forma autoritativa
  const can2020 = getCanonical2020Enredo(schoolId, schoolName);
  if (can2020?.title) {
    enredosMap.set(2020, can2020.title);
  }

  // Garante que o enredo canônico oficial de 2019 seja registrado de forma autoritativa
  const can2019 = getCanonical2019Enredo(schoolId, schoolName);
  if (can2019?.title) {
    enredosMap.set(2019, can2019.title);
  }

  // Garante que o enredo canônico oficial de 2018 seja registrado de forma autoritativa
  const can2018 = getCanonical2018Enredo(schoolId, schoolName);
  if (can2018?.title) {
    enredosMap.set(2018, can2018.title);
  }

  // Garante que o enredo canônico oficial de 2017 seja registrado de forma autoritativa
  const can2017 = getCanonical2017Enredo(schoolId, schoolName);
  if (can2017?.title) {
    enredosMap.set(2017, can2017.title);
  }

  // Garante que o enredo canônico oficial de 2016 seja registrado de forma autoritativa
  const can2016 = getCanonical2016Enredo(schoolId, schoolName);
  if (can2016?.title) {
    enredosMap.set(2016, can2016.title);
  }

  // 2. Histórico de enredos gravado no save (inGameHistory para anos > 2026 ou sem registro)
  if (inGameHistory && inGameHistory.length > 0) {
    inGameHistory.forEach((h) => {
      if (h.schoolEnredos) {
        const found =
          (schoolId && h.schoolEnredos[schoolId]) ||
          (schoolName && h.schoolEnredos[schoolName]) ||
          (key && h.schoolEnredos[key]) ||
          (canonKey && h.schoolEnredos[canonKey]);
        if (found) {
          if (h.year > 2026 || !enredosMap.has(h.year)) {
            enredosMap.set(h.year, found);
          }
        }
      }
    });
  }

  // 3. Histórico de enredos na própria agremiação no save
  if (schoolObj?.enredoHistory && schoolObj.enredoHistory.length > 0) {
    schoolObj.enredoHistory.forEach((item) => {
      if (item.year && item.enredo) {
        if (item.year > 2026 || !enredosMap.has(item.year)) {
          enredosMap.set(item.year, item.enredo);
        }
      }
    });
  }

  // 4. Enredo atual da escola na temporada em andamento (apenas para anos futuros > 2026 ou se não houver enredo oficial catalogado)
  if (schoolObj?.currentEnredo?.title) {
    const activeYr = currentYear || (schoolObj as any).currentYear || 2026;
    if (activeYr > 2026 || !enredosMap.has(activeYr)) {
      enredosMap.set(activeYr, schoolObj.currentEnredo.title);
    }
  }

  // Ordena decrescente por ano
  const result: { year: number; enredo: string }[] = [];
  Array.from(enredosMap.entries())
    .sort((a, b) => b[0] - a[0])
    .forEach(([yr, enredo]) => {
      result.push({ year: yr, enredo });
    });

  return result;
}
