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
    vila_isabel: 'Você semba lá... Que eu sambo cá! O canto livre de Angola',
    unidos_de_vila_isabel: 'Você semba lá... Que eu sambo cá! O canto livre de Angola',
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
    vila_isabel: 'Soy loco por ti América: a Vila canta a latinidade',
    unidos_de_vila_isabel: 'Soy loco por ti América: a Vila canta a latinidade',
    grande_rio: 'Amazonas, o eldorado é aqui',
    academicos_do_grande_rio: 'Amazonas, o eldorado é aqui',
    viradouro: 'Arquitetando folias',
    unidos_do_viradouro: 'Arquitetando folias',
    mangueira: 'Das águas do São Francisco, nasce um rio de esperança',
    estacao_primeira_de_mangueira: 'Das águas do São Francisco, nasce um rio de esperança',
    beija_flor: 'Poços de Caldas: Derrama sobre a terra suas águas milagrosas - Do caos inicial à explosão da vida',
    beija_flor_de_nilopolis: 'Poços de Caldas: Derrama sobre a terra suas águas milagrosas - Do caos inicial à explosão da vida',
    tijuca: 'Ouvindo tudo que vejo, vou vendo tudo que ouço',
    unidos_da_tijuca: 'Ouvindo tudo que vejo, vou vendo tudo que ouço',
    portela: 'Brasil marca a tua cara e mostra para o mundo',
    imperio_serrano: 'O Império do Divino',
    imperatriz: 'Um por todos e todos por um',
    imperatriz_leopoldinense: 'Um por todos e todos por um',
    mocidade: 'A vida que pedi a Deus',
    mocidade_independente: 'A vida que pedi a Deus',
    mocidade_independente_de_padre_miguel: 'A vida que pedi a Deus',
    salgueiro: 'Microcosmos: o que os olhos não vêem, o coração sente',
    academicos_do_salgueiro: 'Microcosmos: o que os olhos não vêem, o coração sente',
    porto_da_pedra: 'Bendita és tu entre as mulheres do Brasil',
    unidos_do_porto_da_pedra: 'Bendita és tu entre as mulheres do Brasil',
    caprichosos_de_pilares: 'Na folia com o Espírito Santo, o Espírito Santo caprichou!',
    caprichosos: 'Na folia com o Espírito Santo, o Espírito Santo caprichou!',
    rocinha: 'Felicidade não tem preço',
    academicos_da_rocinha: 'Felicidade não tem preço',
    estacio_de_sa: 'Quem é você?',
    estacio: 'Quem é você?',
    sao_clemente: 'De Gonzagão a Gonzaquinha: em vida de viajante',
    uniao_da_ilha: 'As minas Del Rei São João',
    ilha: 'As minas Del Rei São João',
    tradicao: 'Bahia de todos os deuses',
    renascer_jacarepagua: 'A divina comédia brasileira',
    renascer_de_jacarepagua: 'A divina comédia brasileira',
    renascer: 'A divina comédia brasileira',
    santa_cruz: 'Liberdade, igualdade e fraternidade - Um sonho chamado França',
    academicos_de_santa_cruz: 'Liberdade, igualdade e fraternidade - Um sonho chamado França',
    arranco: 'Guelédés, o retrato das almas',
    cubango: 'Na magia da escrita, a viagem do saber',
    academicos_do_cubango: 'Na magia da escrita, a viagem do saber',
    vizinha_faladeira: 'Adorável loucura na cidade do encantamento',
    alegria_da_zona_sul: 'A Alegria é show de bola',
    alegria: 'A Alegria é show de bola'
  },
  2005: {
    beija_flor: 'O Vento Corta as Terras dos Pampas. Em Nome do Pai, do Filho e do Espírito Guarani, Sete Povos na Fé e na Dor... Sete Missões de Amor',
    beija_flor_de_nilopolis: 'O Vento Corta as Terras dos Pampas. Em Nome do Pai, do Filho e do Espírito Guarani, Sete Povos na Fé e na Dor... Sete Missões de Amor',
    tijuca: 'Entrou por Um Lado, Saiu pelo Outro... Quem Quiser que Invente Outro!',
    unidos_da_tijuca: 'Entrou por Um Lado, Saiu pelo Outro... Quem Quiser que Invente Outro!',
    grande_rio: 'Alimentar o Corpo e a Alma Faz Bem!',
    academicos_do_grande_rio: 'Alimentar o Corpo e a Alma Faz Bem!',
    imperatriz: 'Uma Delirante Confusão Fabulística',
    imperatriz_leopoldinense: 'Uma Delirante Confusão Fabulística',
    salgueiro: 'Do Fogo que Ilumina a Vida, Salgueiro É Chama que Não se Apaga',
    academicos_do_salgueiro: 'Do Fogo que Ilumina a Vida, Salgueiro É Chama que Não se Apaga',
    mangueira: 'Mangueira Energiza a Avenida. O Carnaval É Pura Energia e a Energia É o Nosso Desafio',
    estacao_primeira_de_mangueira: 'Mangueira Energiza a Avenida. O Carnaval É Pura Energia e a Energia É o Nosso Desafio',
    porto_da_pedra: 'Carnaval - Festa Profana',
    unidos_do_porto_da_pedra: 'Carnaval - Festa Profana',
    viradouro: 'A Viradouro É Só Sorriso!',
    unidos_do_viradouro: 'A Viradouro É Só Sorriso!',
    mocidade: 'Buon Mangiare, Mocidade! A Arte Está na Mesa',
    mocidade_independente: 'Buon Mangiare, Mocidade! A Arte Está na Mesa',
    mocidade_independente_de_padre_miguel: 'Buon Mangiare, Mocidade! A Arte Está na Mesa',
    vila_isabel: 'Singrando em Mares Bravios... E Construindo o Futuro',
    unidos_de_vila_isabel: 'Singrando em Mares Bravios... E Construindo o Futuro',
    caprichosos_de_pilares: 'Carnaval, Doce Ilusão. A Gente Se Vê Aqui no Meio da Multidão: 20 Anos de Liga',
    caprichosos: 'Carnaval, Doce Ilusão. A Gente Se Vê Aqui no Meio da Multidão: 20 Anos de Liga',
    imperio_serrano: 'Um Grito que Ecoa no Ar. Homem/Natureza - O Perfeito Equilíbrio',
    portela: 'Nós Podemos: Oito Idéias para Mudar o Mundo!',
    tradicao: 'De Sol a Sol, de Sol à Soja. Um Negócio da China!',
    rocinha: 'Um Mundo sem Fronteiras',
    academicos_da_rocinha: 'Um Mundo sem Fronteiras',
    uniao_da_ilha: 'Das Veredas dos Trilhos a Um Sonho de Fé... A Ilha Traz a Conquista do Pináculo, Corcovado Tentação!',
    ilha: 'Das Veredas dos Trilhos a Um Sonho de Fé... A Ilha Traz a Conquista do Pináculo, Corcovado Tentação!',
    sao_clemente: 'Velha É a Vovozinha: a São Clemente Enrugadinha e Gostosinha',
    santa_cruz: 'Rio - Conquistas e Glórias de Uma Cidade de Histórias',
    academicos_de_santa_cruz: 'Rio - Conquistas e Glórias de Uma Cidade de Histórias',
    alegria_da_zona_sul: 'Teatro Rival - 70 Anos de Resistência Cultural',
    alegria: 'Teatro Rival - 70 Anos de Resistência Cultural',
    cubango: 'O Fruto da África de Todos os Deuses no Brasil de Fé. Candomblé...',
    academicos_do_cubango: 'O Fruto da África de Todos os Deuses no Brasil de Fé. Candomblé...',
    vizinha_faladeira: '222 Gil, o Expresso da Cultura do Brasil',
    renascer_jacarepagua: 'Espelho, Espelho Meu!',
    renascer_de_jacarepagua: 'Espelho, Espelho Meu!',
    renascer: 'Espelho, Espelho Meu!',
    tuiuti: 'Cravo de Ouro, Eu Também Sou da Lira e Não Quero Negar',
    paraiso_do_tuiuti: 'Cravo de Ouro, Eu Também Sou da Lira e Não Quero Negar',
    uniao_de_jacarepagua: 'Iriruama-arara-o-ama por Toda Eternidade',
    uniao_jacarepagua: 'Iriruama-arara-o-ama por Toda Eternidade'
  },
  2004: {
    beija_flor: 'Manõa, Manaus, Amazônia, Terra Santa: Alimenta o Corpo, Equilibra a Alma e Transmite a Paz',
    beija_flor_de_nilopolis: 'Manõa, Manaus, Amazônia, Terra Santa: Alimenta o Corpo, Equilibra a Alma e Transmite a Paz',
    tijuca: 'O Sonho da Criação e a Criação do Sonho. A Arte da Ciência no Tempo do Impossível',
    unidos_da_tijuca: 'O Sonho da Criação e a Criação do Sonho. A Arte da Ciência no Tempo do Impossível',
    mangueira: 'Mangueira Redescobre a Estrada Real... E Deste Eldorado Faz Seu Carnaval',
    estacao_primeira_de_mangueira: 'Mangueira Redescobre a Estrada Real... E Deste Eldorado Faz Seu Carnaval',
    viradouro: 'Pediu pra Pará, Parou! Com a Viradouro Eu Vou pro Círio de Nazaré',
    unidos_do_viradouro: 'Pediu pra Pará, Parou! Com a Viradouro Eu Vou pro Círio de Nazaré',
    imperatriz: 'Breazail',
    imperatriz_leopoldinense: 'Breazail',
    salgueiro: 'A Cana que Aqui se Planta, Tudo Dá... Até Energia! Álcool, o Combustível do Futuro',
    academicos_do_salgueiro: 'A Cana que Aqui se Planta, Tudo Dá... Até Energia! Álcool, o Combustível do Futuro',
    portela: 'Lendas e Mistérios da Amazônia',
    mocidade: 'Não Corra, não Mate, não Morra. Pegue Carona com a Mocidade!',
    mocidade_independente: 'Não Corra, não Mate, não Morra. Pegue Carona com a Mocidade!',
    mocidade_independente_de_padre_miguel: 'Não Corra, não Mate, não Morra. Pegue Carona com a Mocidade!',
    imperio_serrano: 'Aquarela Brasileira',
    grande_rio: 'Vamos Vestir a Camisinha, Meu Amor!',
    academicos_do_grande_rio: 'Vamos Vestir a Camisinha, Meu Amor!',
    porto_da_pedra: 'Sou Tigre, Sou Porto, da Pedra à Internet: O Mensageiro na História da Vida do Leva e Traz',
    unidos_do_porto_da_pedra: 'Sou Tigre, Sou Porto, da Pedra à Internet: O Mensageiro na História da Vida do Leva e Traz',
    tradicao: 'Contos de Areia',
    caprichosos_de_pilares: 'Xuxa e Seu Reino Encantado no Carnaval da Imaginação',
    caprichosos: 'Xuxa e Seu Reino Encantado no Carnaval da Imaginação',
    sao_clemente: 'Boi Voador Sobre o Recife: Cordel da Galhofa Nacional',
    vila_isabel: 'A Vila É Para Ti...',
    unidos_de_vila_isabel: 'A Vila É Para Ti...',
    santa_cruz: 'Nas Páginas do Brasil, Santa Cruz Escreve Sua História',
    academicos_de_santa_cruz: 'Nas Páginas do Brasil, Santa Cruz Escreve Sua História',
    rocinha: 'O Mago do Novo, João do Povo',
    academicos_da_rocinha: 'O Mago do Novo, João do Povo',
    uniao_de_jacarepagua: 'Rio de Janeiro, o Rio que o Mundo Inteiro Ama',
    uniao_jacarepagua: 'Rio de Janeiro, o Rio que o Mundo Inteiro Ama',
    cubango: 'Cubango é Shopping no Mundo do Toma Lá, Dá Cá',
    academicos_do_cubango: 'Cubango é Shopping no Mundo do Toma Lá, Dá Cá',
    alegria_da_zona_sul: 'Dorival Caymmi, o Mar e o Tempo nas Areias de Copacabana',
    alegria: 'Dorival Caymmi, o Mar e o Tempo nas Areias de Copacabana',
    uniao_da_ilha: 'Com Pandeiro ou sem Pandeiro... Eu Brinco. Com Dinheiro ou sem Dinheiro... Eu Também Brinco!',
    ilha: 'Com Pandeiro ou sem Pandeiro... Eu Brinco. Com Dinheiro ou sem Dinheiro... Eu Também Brinco!',
    tuiuti: 'Olha que Coisa Mais Linda, o Poeta Está no Paraíso',
    paraiso_do_tuiuti: 'Olha que Coisa Mais Linda, o Poeta Está no Paraíso',
    estacio_de_sa: 'A Estácio é Dez, o Brasil é Mil e a Fome é Zero',
    estacio: 'A Estácio é Dez, o Brasil é Mil e a Fome é Zero',
    inocentes: 'Sorria! Sou Rio, Sou Inocentes, Sou Pan, Serei Olimpíadas',
    inocentes_de_belford_roxo: 'Sorria! Sou Rio, Sou Inocentes, Sou Pan, Serei Olimpíadas',
    inocentes_da_baixada: 'Sorria! Sou Rio, Sou Inocentes, Sou Pan, Serei Olimpíadas',
    leao_de_nova_iguacu: 'Insone Planeta Insano',
    leao_nova_iguacu: 'Insone Planeta Insano',
    lins_imperial: '75 Anos da Mangueira. É Bom Se Segurar que a Poeira Vai Subir!',
    lins: '75 Anos da Mangueira. É Bom Se Segurar que a Poeira Vai Subir!'
  },
  2003: {
    beija_flor: 'O Povo conta a sua história: saco vazio não para em pé, a mão que faz a guerra, faz a paz',
    beija_flor_de_nilopolis: 'O Povo conta a sua história: saco vazio não para em pé, a mão que faz a guerra, faz a paz',
    mangueira: 'Os dez mandamentos! O samba da paz canta a saga da liberdade',
    estacao_primeira_de_mangueira: 'Os dez mandamentos! O samba da paz canta a saga da liberdade',
    grande_rio: 'O Brasil que vale...',
    academicos_do_grande_rio: 'O Brasil que vale...',
    imperatriz: 'Nem todo pirata tem perna de pau, o olho de vidro e a cara de mau',
    imperatriz_leopoldinense: 'Nem todo pirata tem perna de pau, o olho de vidro e a cara de mau',
    mocidade: 'Para sempre no seu coração, carnaval da doação',
    mocidade_independente: 'Para sempre no seu coração, carnaval da doação',
    mocidade_independente_de_padre_miguel: 'Para sempre no seu coração, carnaval da doação',
    viradouro: 'A Viradouro canta e conta Bibi – Uma homenagem ao teatro brasileiro',
    unidos_do_viradouro: 'A Viradouro canta e conta Bibi – Uma homenagem ao teatro brasileiro',
    salgueiro: 'Salgueiro, minha paixão, minha raiz - 50 Anos de glória',
    academicos_do_salgueiro: 'Salgueiro, minha paixão, minha raiz - 50 Anos de glória',
    portela: 'Ontem, hoje e sempre Cinelândia - O samba entra em cena na Broadway Brasileira',
    tijuca: 'Agudás: os que levaram a África no coração e trouxeram para o coração da África, o Brasil!',
    unidos_da_tijuca: 'Agudás: os que levaram a África no coração e trouxeram para o coração da África, o Brasil!',
    caprichosos_de_pilares: 'Zumbi, rei de Palmares e herói do Brasil. A história que não foi contada',
    caprichosos: 'Zumbi, rei de Palmares e herói do Brasil. A história que não foi contada',
    porto_da_pedra: 'Os donos da rua - um jeitinho brasileiro de ser',
    unidos_do_porto_da_pedra: 'Os donos da rua - um jeitinho brasileiro de ser',
    imperio_serrano: 'E onde houver trevas que se faça a luz',
    tradicao: 'O Brasil é penta, R é 9 - O fenômeno iluminado',
    santa_cruz: 'Do universo teatral à ribalta do carnaval',
    academicos_de_santa_cruz: 'Do universo teatral à ribalta do carnaval',
    sao_clemente: 'Mangaratiba, uma História de Lutas para todos que Amam a Terra e a Liberdade',
    uniao_da_ilha: 'Chega em seu cavalinho azul uma bruxinha boa. A Ilha trouxe do céu Maria Clara Machado',
    ilha: 'Chega em seu cavalinho azul uma bruxinha boa. A Ilha trouxe do céu Maria Clara Machado',
    vila_isabel: 'Oscar Niemeyer, o arquiteto no Recanto da Princesa',
    unidos_de_vila_isabel: 'Oscar Niemeyer, o arquiteto no Recanto da Princesa',
    tuiuti: 'Tuiuti desfila o Brasil nas Telas de Portinari',
    paraiso_do_tuiuti: 'Tuiuti desfila o Brasil nas Telas de Portinari',
    estacio_de_sa: 'Um Banho da Natureza. Cachoeiras de Macacu',
    estacio: 'Um Banho da Natureza. Cachoeiras de Macacu',
    inocentes: 'O gênio da Inocentes e a lâmpada maravilhosa',
    inocentes_de_belford_roxo: 'O gênio da Inocentes e a lâmpada maravilhosa',
    inocentes_da_baixada: 'O gênio da Inocentes e a lâmpada maravilhosa',
    uniao_de_jacarepagua: 'O cupim é do capim',
    uniao_jacarepagua: 'O cupim é do capim',
    leao_de_nova_iguacu: 'Beleza: a Eterna Busca do Ser',
    leao_nova_iguacu: 'Beleza: a Eterna Busca do Ser',
    cubango: 'Cândido Mendes, um século de paixão na história da educação',
    academicos_do_cubango: 'Cândido Mendes, um século de paixão na história da educação',
    rocinha: 'Nas asas da realização entre glórias e tradições. A Rocinha faz a festa dos 100 anos de um clube campeão. Sou Tricolor de Coração!',
    academicos_da_rocinha: 'Nas asas da realização entre glórias e tradições. A Rocinha faz a festa dos 100 anos de um clube campeão. Sou Tricolor de Coração!',
    unidos_da_ponte: 'De Graham Bell à Sérgio Motta - Um Salto para a Modernidade',
    ponte: 'De Graham Bell à Sérgio Motta - Um Salto para a Modernidade',
    boi_da_ilha: 'Em 500 Anos de Glórias, Cabo Frio conta sua História',
    boi_da_ilha_do_governador: 'Em 500 Anos de Glórias, Cabo Frio conta sua História'
  },
  2002: {
    mangueira: 'Brazil com Z é pra cabra da peste, Brasil com S é nação do Nordeste',
    estacao_primeira_de_mangueira: 'Brazil com Z é pra cabra da peste, Brasil com S é nação do Nordeste',
    beija_flor: 'O Brasil dá o ar da sua graça. De Ícaro a Rubem Berta, o ímpeto de voar',
    beija_flor_de_nilopolis: 'O Brasil dá o ar da sua graça. De Ícaro a Rubem Berta, o ímpeto de voar',
    imperatriz: 'Goitacazes... Tupi or not tupi in a south american way',
    imperatriz_leopoldinense: 'Goitacazes... Tupi or not tupi in a south american way',
    mocidade: 'O Grande Circo Místico',
    mocidade_independente: 'O Grande Circo Místico',
    mocidade_independente_de_padre_miguel: 'O Grande Circo Místico',
    viradouro: 'Viradouro, Viramundo, rei do mundo',
    unidos_do_viradouro: 'Viradouro, Viramundo, rei do mundo',
    salgueiro: 'Asas de um sonho. Viajando com o Salgueiro, o orgulho de ser brasileiro...',
    academicos_do_salgueiro: 'Asas de um sonho. Viajando com o Salgueiro, o orgulho de ser brasileiro...',
    grande_rio: 'Os papagaios amarelos nas terras encantadas do Maranhão',
    academicos_do_grande_rio: 'Os papagaios amarelos nas terras encantadas do Maranhão',
    portela: 'Amazonas, esse desconhecido. Delírios e verdades do Eldorado Verde',
    imperio_serrano: 'Aclamação e coroação do Imperador da Pedra do Reino: Ariano Suassuna',
    tijuca: 'O sol brilha eternamente sobre o mundo de língua portuguesa',
    unidos_da_tijuca: 'O sol brilha eternamente sobre o mundo de língua portuguesa',
    porto_da_pedra: 'Serra acima, rumo a terra dos Coroados',
    unidos_do_porto_da_pedra: 'Serra acima, rumo a terra dos Coroados',
    caprichosos_de_pilares: 'Deu pra ti! Tô em alto astral! Tô com Porto Alegre, trilegal!',
    caprichosos: 'Deu pra ti! Tô em alto astral! Tô com Porto Alegre, trilegal!',
    tradicao: 'Os encantos da Costa do Sol',
    sao_clemente: 'Guapimirim, paraíso ecológico abençoado pelo Dedo de Deus',
    santa_cruz: 'Papel - Das Origens à Folia - História, Arte e Magia',
    academicos_de_santa_cruz: 'Papel - Das Origens à Folia - História, Arte e Magia',
    vila_isabel: 'O glorioso Nilton Santos... Sua bola, sua vida, nossa Vila...',
    unidos_de_vila_isabel: 'O glorioso Nilton Santos... Sua bola, sua vida, nossa Vila...',
    uniao_da_ilha: 'Folias de Caxias: de João a João... É o carnaval da União',
    ilha: 'Folias de Caxias: de João a João... É o carnaval da União',
    tuiuti: 'Arlindo, Arlequins e Querubins: Um Carnaval no Paraíso',
    paraiso_do_tuiuti: 'Arlindo, Arlequins e Querubins: Um Carnaval no Paraíso',
    leao_de_nova_iguacu: 'Do Esplendor Diamantino aos Sonhos Dourados de Juscelino',
    leao_nova_iguacu: 'Do Esplendor Diamantino aos Sonhos Dourados de Juscelino',
    boi_da_ilha: 'Boi da Ilha é Holambra, a Tulipa Brasileira',
    boi_da_ilha_do_governador: 'Boi da Ilha é Holambra, a Tulipa Brasileira',
    rocinha: 'Na Rocinha, o povo é sempre notícia',
    academicos_da_rocinha: 'Na Rocinha, o povo é sempre notícia',
    estacio_de_sa: 'Nos Braços do Povo, na Passarela do Samba... Cinqüenta Anos de O Dia',
    estacio: 'Nos Braços do Povo, na Passarela do Samba... Cinqüenta Anos de O Dia',
    uniao_de_jacarepagua: 'Asas: sonho de muitos, privilégio de poucos, tecnologia de todos',
    uniao_jacarepagua: 'Asas: sonho de muitos, privilégio de poucos, tecnologia de todos',
    unidos_da_ponte: 'De Minas para o Brasil, o Mártir da Nova República',
    ponte: 'De Minas para o Brasil, o Mártir da Nova República',
    unidos_da_villa_rica: 'Sou Rio, sou Grande, sou Villa Rica do Norte',
    villa_rica: 'Sou Rio, sou Grande, sou Villa Rica do Norte',
    imperio_da_tijuca: 'Vossa excelência: feijão com arroz'
  },
  2001: {
    imperatriz: 'Cana-caiana, cana roxa, cana fita, cana preta, amarela, pernambuco... Quero vê descê o cuco, na pancada do ganzá',
    imperatriz_leopoldinense: 'Cana-caiana, cana roxa, cana fita, cana preta, amarela, pernambuco... Quero vê descê o cuco, na pancada do ganzá',
    beija_flor: 'A saga de Agotime, Maria mineira Naê',
    beija_flor_de_nilopolis: 'A saga de Agotime, Maria mineira Naê',
    mangueira: 'A seiva da vida',
    estacao_primeira_de_mangueira: 'A seiva da vida',
    salgueiro: 'Salgueiro no mar de Xarayés, é Pantanal, é carnaval',
    academicos_do_salgueiro: 'Salgueiro no mar de Xarayés, é Pantanal, é carnaval',
    viradouro: 'Os Sete Pecados Capitais',
    unidos_do_viradouro: 'Os Sete Pecados Capitais',
    grande_rio: 'Gentileza, o profeta saído do fogo',
    academicos_do_grande_rio: 'Gentileza, o profeta saído do fogo',
    mocidade: 'Paz e harmonia - A Mocidade é alegria',
    mocidade_independente: 'Paz e harmonia - A Mocidade é alegria',
    mocidade_independente_de_padre_miguel: 'Paz e harmonia - A Mocidade é alegria',
    tradicao: 'Hoje é domingo, é alegria. Vamos sorrir e cantar!',
    tijuca: 'Tijuca, com Nélson Rodrigues, pelo buraco da fechadura',
    unidos_da_tijuca: 'Tijuca, com Nélson Rodrigues, pelo buraco da fechadura',
    portela: 'Querer é Poder',
    imperio_serrano: 'O Rio corre pro mar',
    caprichosos_de_pilares: 'Goiás, um sonho de amor no coração do Brasil',
    caprichosos: 'Goiás, um sonho de amor no coração do Brasil',
    uniao_da_ilha: 'A União faz a força, com muita energia',
    ilha: 'A União faz a força, com muita energia',
    tuiuti: 'Um mouro no quilombo. Isto a história registra!',
    paraiso_do_tuiuti: 'Um mouro no quilombo. Isto a história registra!',
    porto_da_pedra: 'Um sonho possível: crescer e viver! Agora é lei',
    unidos_do_porto_da_pedra: 'Um sonho possível: crescer e viver! Agora é lei',
    sao_clemente: 'A São Clemente Mostrou, e Nada Mudou nesse Brasil Gigante',
    santa_cruz: 'Mário Lago, na Rolança do Tempo, uma Vida de Histórias',
    academicos_de_santa_cruz: 'Mário Lago, na Rolança do Tempo, uma Vida de Histórias',
    vila_isabel: 'Estado maravilhoso cheios de encantos mil',
    unidos_de_vila_isabel: 'Estado maravilhoso cheios de encantos mil',
    villa_rica: 'Da Vila Olímpica à Villa Rica, Chiquinho da Mangueira, um Exemplo de Vida',
    unidos_da_villa_rica: 'Da Vila Olímpica à Villa Rica, Chiquinho da Mangueira, um Exemplo de Vida',
    boi_da_ilha: 'Orun-Ayê',
    boi_da_ilha_do_governador: 'Orun-Ayê',
    estacio_de_sa: 'E aí Tem Patrocínio ? Tenho, José',
    estacio: 'E aí Tem Patrocínio ? Tenho, José',
    leao_de_nova_iguacu: 'Allah-la-ô, um Carnaval das Arábias',
    leao_nova_iguacu: 'Allah-la-ô, um Carnaval das Arábias',
    imperio_da_tijuca: 'Macaé, a princesinha do Atlântico',
    unidos_da_ponte: 'Em Azul e Branco, Meu Coração se Deixou Levar',
    ponte: 'Em Azul e Branco, Meu Coração se Deixou Levar',
    inocentes: 'Região dos Lagos, a Inocentes é folia na terra do sal e do sol',
    inocentes_de_belford_roxo: 'Região dos Lagos, a Inocentes é folia na terra do sal e do sol',
    inocentes_da_baixada: 'Região dos Lagos, a Inocentes é folia na terra do sal e do sol',
    em_cima_da_hora: 'Goiá tacá amopí - O campo das delícias'
  },
  2000: {
    imperatriz: 'Quem descobriu o Brasil, foi seu Cabral, no dia 22 de abril, dois meses depois do carnaval',
    imperatriz_leopoldinense: 'Quem descobriu o Brasil, foi seu Cabral, no dia 22 de abril, dois meses depois do carnaval',
    beija_flor: 'Brasil, um coração que pulsa forte, pátria de todos ou terra de ninguém?',
    beija_flor_de_nilopolis: 'Brasil, um coração que pulsa forte, pátria de todos ou terra de ninguém?',
    viradouro: 'Brasil: visões de paraísos e infernos',
    unidos_do_viradouro: 'Brasil: visões de paraísos e infernos',
    mocidade: 'Verde, amarelo, branco, anil, colorem o Brasil no ano 2000',
    mocidade_independente: 'Verde, amarelo, branco, anil, colorem o Brasil no ano 2000',
    mocidade_independente_de_padre_miguel: 'Verde, amarelo, branco, anil, colorem o Brasil no ano 2000',
    tijuca: 'Terra dos Papagaios... Navegar foi preciso!',
    unidos_da_tijuca: 'Terra dos Papagaios... Navegar foi preciso!',
    salgueiro: 'Sou rei, sou Salgueiro, meu reinado é brasileiro',
    academicos_do_salgueiro: 'Sou rei, sou Salgueiro, meu reinado é brasileiro',
    mangueira: 'Dom Obá II - Rei dos esfarrapados, príncipe do povo',
    estacao_primeira_de_mangueira: 'Dom Obá II - Rei dos esfarrapados, príncipe do povo',
    uniao_da_ilha: 'Pra não dizer que não falei das flores',
    ilha: 'Pra não dizer que não falei das flores',
    grande_rio: 'Carnaval à vista - Não fomos catequizados, fizemos carnaval',
    academicos_do_grande_rio: 'Carnaval à vista - Não fomos catequizados, fizemos carnaval',
    portela: 'Trabalhadores do Brasil, a época de Getúlio Vargas',
    caprichosos_de_pilares: 'Brasil, teu Espírito é Santo',
    caprichosos: 'Brasil, teu Espírito é Santo',
    tradicao: 'Liberdade! Sou negro, raça e tradição',
    vila_isabel: 'Academia indígena de letras - Eu sou índio, eu também sou imortal',
    unidos_de_vila_isabel: 'Academia indígena de letras - Eu sou índio, eu também sou imortal',
    porto_da_pedra: 'Ordem, progresso, amor e folia no milênio de fantasia',
    unidos_do_porto_da_pedra: 'Ordem, progresso, amor e folia no milênio de fantasia',
    // Série Ouro 2000
    imperio_serrano: 'Os canhões de Guararapes',
    tuiuti: 'Um Monarca na Fuzarca',
    paraiso_do_tuiuti: 'Um Monarca na Fuzarca',
    em_cima_da_hora: 'Oswaldo Cruz, a saga de um herói brasileiro',
    sao_clemente: 'No ano 2000, a São Clemente é Tupi com Sergipe na Sapucaí',
    inocentes: 'Petrópolis, roxo de amor por você',
    inocentes_de_belford_roxo: 'Petrópolis, roxo de amor por você',
    inocentes_da_baixada: 'Petrópolis, roxo de amor por você',
    santa_cruz: 'Brasil, do extrativismo à reciclagem, 500 anos de riqueza',
    academicos_de_santa_cruz: 'Brasil, do extrativismo à reciclagem, 500 anos de riqueza',
    imperio_da_tijuca: 'O ouro vermelho de Pati do Alferes',
    estacio_de_sa: 'Envergo, Mas Não Quebro',
    estacio: 'Envergo, Mas Não Quebro',
    rocinha: 'O sonho da França Antártica de Villegagnon',
    academicos_da_rocinha: 'O sonho da França Antártica de Villegagnon',
    jacarezinho: 'Do Barão à fundação, 100 anos a serviço da nação',
    unidos_do_jacarezinho: 'Do Barão à fundação, 100 anos a serviço da nação',
    cubango: 'Por uma independência de fato',
    academicos_do_cubango: 'Por uma independência de fato',
    cabucu: 'Brasil 500... Ano 2000, Cabral faz a festa no Brasil',
    unidos_do_cabucu: 'Brasil 500... Ano 2000, Cabral faz a festa no Brasil'
  },
  1999: {
    imperatriz: 'Brasil mostra a sua cara em... Theatrum Rerum Naturalium Brasiliae',
    imperatriz_leopoldinense: 'Brasil mostra a sua cara em... Theatrum Rerum Naturalium Brasiliae',
    beija_flor: 'Araxá, lugar alto onde primeiro se avista o sol',
    beija_flor_de_nilopolis: 'Araxá, lugar alto onde primeiro se avista o sol',
    viradouro: 'Anita Garibaldi, Heroína das Sete Magias',
    unidos_do_viradouro: 'Anita Garibaldi, Heroína das Sete Magias',
    mocidade: 'Villa-Lobos e a apoteose brasileira',
    mocidade_independente: 'Villa-Lobos e a apoteose brasileira',
    mocidade_independente_de_padre_miguel: 'Villa-Lobos e a apoteose brasileira',
    salgueiro: 'Salgueiro é sol e sal nos quatrocentos anos de Natal',
    academicos_do_salgueiro: 'Salgueiro é sol e sal nos quatrocentos anos de Natal',
    grande_rio: 'Ei, ei, ei, Chatô é nosso rei!',
    academicos_do_grande_rio: 'Ei, ei, ei, Chatô é nosso rei!',
    mangueira: 'O século do samba',
    estacao_primeira_de_mangueira: 'O século do samba',
    portela: 'De Volta aos Caminhos de Minas Gerais',
    caprichosos_de_pilares: 'No universo da beleza, Mestre Pitanguy',
    caprichosos: 'No universo da beleza, Mestre Pitanguy',
    uniao_da_ilha: 'Barbosa Lima, 101 anos do Sobrinho do Brasil',
    ilha: 'Barbosa Lima, 101 anos do Sobrinho do Brasil',
    vila_isabel: 'João Pessoa, onde o sol brilha mais cedo',
    unidos_de_vila_isabel: 'João Pessoa, onde o sol brilha mais cedo',
    tradicao: 'Nos braços da história, Jacarepaguá, quatro séculos de glórias',
    imperio_serrano: 'Uma rua chamada Brasil',
    sao_clemente: 'A São Clemente comemora e traz Rui Barbosa para os braços do povo',
    // Série Ouro 1999
    tijuca: 'O dono da terra',
    unidos_da_tijuca: 'O dono da terra',
    porto_da_pedra: 'E na farofa do confete, tem limão, tem serpentina',
    unidos_do_porto_da_pedra: 'E na farofa do confete, tem limão, tem serpentina',
    estacio_de_sa: 'No passo do Compasso, a Estácio no Sapatinho',
    estacio: 'No passo do Compasso, a Estácio no Sapatinho',
    santa_cruz: 'Abraham Medina em noite de gala',
    academicos_de_santa_cruz: 'Abraham Medina em noite de gala',
    jacarezinho: 'Jacarezinho canta e se encanta com os mistérios do Senhor da Luz',
    unidos_do_jacarezinho: 'Jacarezinho canta e se encanta com os mistérios do Senhor da Luz',
    em_cima_da_hora: 'Horas... Eras de glórias... E outras histórias...',
    cabucu: 'O meu cabelo não nega',
    unidos_do_cabucu: 'O meu cabelo não nega',
    cubango: 'Tempero, uma pitada na história',
    academicos_do_cubango: 'Tempero, uma pitada na história',
    imperio_da_tijuca: 'No palco da alegria, Molejão é rei nesta folia',
    unidos_da_ponte: 'O Samba é a Minha Voz',
    ponte: 'O Samba é a Minha Voz',
    unidos_da_villa_rica: 'Sargentelli, Lenda Viva do Ziriguidum',
    villa_rica: 'Sargentelli, Lenda Viva do Ziriguidum'
  },
  1998: {
    beija_flor: 'O mundo místico dos Caruanas nas águas do Patu-Anu',
    beija_flor_de_nilopolis: 'O mundo místico dos Caruanas nas águas do Patu-Anu',
    mangueira: 'Chico Buarque da Mangueira',
    estacao_primeira_de_mangueira: 'Chico Buarque da Mangueira',
    imperatriz: 'Quase no ano 2.000...',
    imperatriz_leopoldinense: 'Quase no ano 2.000...',
    portela: 'Os olhos da noite',
    viradouro: 'Orfeu, o Negro do Carnaval',
    unidos_do_viradouro: 'Orfeu, o Negro do Carnaval',
    mocidade: 'Brilha no céu a estrela que me faz sonhar',
    mocidade_independente: 'Brilha no céu a estrela que me faz sonhar',
    mocidade_independente_de_padre_miguel: 'Brilha no céu a estrela que me faz sonhar',
    salgueiro: 'Parintins, a ilha do boi-bumbá: Garantido X Caprichoso, Caprichoso X Garantido',
    academicos_do_salgueiro: 'Parintins, a ilha do boi-bumbá: Garantido X Caprichoso, Caprichoso X Garantido',
    grande_rio: 'Prestes, o cavaleiro da esperança',
    academicos_do_grande_rio: 'Prestes, o cavaleiro da esperança',
    uniao_da_ilha: 'Fatumbi, a ilha de todos os santos',
    ilha: 'Fatumbi, a ilha de todos os santos',
    caprichosos_de_pilares: 'Negra origem, negro Pelé, negra Bené',
    caprichosos: 'Negra origem, negro Pelé, negra Bené',
    tradicao: 'Viagem Fantástica ao Pulmão do Mundo',
    vila_isabel: 'Lágrimas, suor e conquistas no mundo em transformação',
    unidos_de_vila_isabel: 'Lágrimas, suor e conquistas no mundo em transformação',
    tijuca: 'De Gama a Vasco, a epopéia da Tijuca',
    unidos_da_tijuca: 'De Gama a Vasco, a epopéia da Tijuca',
    porto_da_pedra: 'Samba no Pé e Mãos ao Alto, Isto é um Assalto',
    unidos_do_porto_da_pedra: 'Samba no Pé e Mãos ao Alto, Isto é um Assalto',
    // Série Ouro 1998
    imperio_serrano: 'Sou o ouro negro da Mãe África',
    sao_clemente: 'Maiores são os Poderes do Povo ! Se Liga na São Clemente !',
    santa_cruz: 'O exagerado Cazuza nas terras de Santa Cruz',
    academicos_de_santa_cruz: 'O exagerado Cazuza nas terras de Santa Cruz',
    cubango: 'Nausicaa - A odisséia Cubanga nos verdes mares',
    academicos_do_cubango: 'Nausicaa - A odisséia Cubanga nos verdes mares',
    imperio_da_tijuca: 'Elymar superpopular',
    unidos_da_ponte: 'Quem Pode, Pode, no Pagode se Sacode',
    ponte: 'Quem Pode, Pode, no Pagode se Sacode',
    em_cima_da_hora: 'Quem é você, Zuzu Angel? Um anjo feito mulher',
    estacio_de_sa: 'Cem Anos de Cultura - Academia Brasileira de Letras',
    estacio: 'Cem Anos de Cultura - Academia Brasileira de Letras',
    rocinha: 'Tá... Na ponta da língua',
    academicos_da_rocinha: 'Tá... Na ponta da língua',
    lins_imperial: 'Búzios : o Paraíso da Humanidade',
    lins: 'Búzios : o Paraíso da Humanidade'
  },
  1997: {
    viradouro: 'Trevas! Luz! A explosão do universo',
    unidos_do_viradouro: 'Trevas! Luz! A explosão do universo',
    mocidade: 'De corpo e alma na avenida',
    mocidade_independente: 'De corpo e alma na avenida',
    mocidade_independente_de_padre_miguel: 'De corpo e alma na avenida',
    mangueira: 'O Olimpo é verde e rosa',
    estacao_primeira_de_mangueira: 'O Olimpo é verde e rosa',
    beija_flor: 'A Beija-Flor é festa na Sapucaí',
    beija_flor_de_nilopolis: 'A Beija-Flor é festa na Sapucaí',
    porto_da_pedra: 'No reino da folia, cada louco com sua mania',
    unidos_do_porto_da_pedra: 'No reino da folia, cada louco com sua mania',
    imperatriz: 'Eu sou da lira, não posso negar',
    imperatriz_leopoldinense: 'Eu sou da lira, não posso negar',
    salgueiro: 'De poeta, carnavalesco e louco... Todo mundo tem um pouco',
    academicos_do_salgueiro: 'De poeta, carnavalesco e louco... Todo mundo tem um pouco',
    portela: 'Linda, eternamente Olinda',
    vila_isabel: 'Não deixe o samba morrer',
    unidos_de_vila_isabel: 'Não deixe o samba morrer',
    grande_rio: 'Madeira-Mamoré, a volta dos que não goram lá no Guaporé',
    academicos_do_grande_rio: 'Madeira-Mamoré, a volta dos que não goram lá no Guaporé',
    tijuca: 'Viagem pitoresca pelos cinco continentes num jardim',
    unidos_da_tijuca: 'Viagem pitoresca pelos cinco continentes num jardim',
    uniao_da_ilha: 'Cidade maravilhosa, o sonho de Pereira Passos',
    ilha: 'Cidade maravilhosa, o sonho de Pereira Passos',
    estacio_de_sa: 'Através da fumaça, o mágico cheiro do carnaval',
    estacio: 'Através da fumaça, o mágico cheiro do carnaval',
    santa_cruz: 'Não se vive sem bandeira',
    academicos_de_santa_cruz: 'Não se vive sem bandeira',
    imperio_serrano: 'O mundo dos sonhos de Beto Carrero',
    rocinha: 'A viagem fantástica do Zé Carioca à Disney',
    academicos_da_rocinha: 'A viagem fantástica do Zé Carioca à Disney',
    // Série Ouro 1997
    tradicao: 'Os balagandãs',
    caprichosos_de_pilares: 'Do tambor ao computador',
    caprichosos: 'Do tambor ao computador',
    sao_clemente: 'A São Clemente Botafogo na Sapucaí',
    imperio_da_tijuca: 'A coroa do perdão na terra de Oyó',
    em_cima_da_hora: 'Sérgio Cabral, a cara do Rio',
    unidos_da_ponte: 'Da lata de lixo ao luxo da lata',
    ponte: 'Da lata de lixo ao luxo da lata',
    cabucu: 'Todas as Marias de nossa terra',
    unidos_do_cabucu: 'Todas as Marias de nossa terra',
    arranco: 'Chico Anísio, 50 anos de Humor',
    arranco_do_engenho_de_dentro: 'Chico Anísio, 50 anos de Humor',
    academicos_do_dende: 'Do pasto, fantasia, do gado, alegoria',
    dende: 'Do pasto, fantasia, do gado, alegoria',
    vizinha_faladeira: 'Lan, a cara alegre e colorida do Rio',
    vizinha: 'Lan, a cara alegre e colorida do Rio'
  },
  1996: {
    // Grupo Especial 1996
    mocidade: 'Criador e criatura',
    mocidade_independente: 'Criador e criatura',
    mocidade_independente_de_padre_miguel: 'Criador e criatura',
    imperatriz: 'Imperatriz Leopoldinense honrosamente apresenta "Leopoldina, a Imperatriz do Brasil"',
    imperatriz_leopoldinense: 'Imperatriz Leopoldinense honrosamente apresenta "Leopoldina, a Imperatriz do Brasil"',
    beija_flor: 'Aurora do povo brasileiro',
    beija_flor_de_nilopolis: 'Aurora do povo brasileiro',
    mangueira: 'Os Tambores da Mangueira na Terra da Encantaria',
    estacao_primeira_de_mangueira: 'Os Tambores da Mangueira na Terra da Encantaria',
    salgueiro: 'Anarquistas sim, mas nem todos',
    academicos_do_salgueiro: 'Anarquistas sim, mas nem todos',
    imperio_serrano: 'Verás que um filho teu não foge à luta',
    vila_isabel: 'A heróica cavalgada de um povo',
    unidos_de_vila_isabel: 'A heróica cavalgada de um povo',
    portela: 'Essa gente bronzeada mostra seu valor',
    porto_da_pedra: 'A Folia no Mundo - Um Carnaval dos Carnavais',
    unidos_do_porto_da_pedra: 'A Folia no Mundo - Um Carnaval dos Carnavais',
    estacio_de_sa: 'De um Novo Mundo eu sou e uma Nova Cidade Será',
    estacio: 'De um Novo Mundo eu sou e uma Nova Cidade Será',
    grande_rio: 'Na era dos Felipes o Brasil era espanhol',
    academicos_do_grande_rio: 'Na era dos Felipes o Brasil era espanhol',
    uniao_da_ilha: 'A Viagem da Pintada Encantada',
    ilha: 'A Viagem da Pintada Encantada',
    viradouro: 'Aquarela do Brasil Ano 2.000',
    unidos_do_viradouro: 'Aquarela do Brasil Ano 2.000',
    tijuca: 'Ganga-Zumbi, Expressão de uma Raça',
    unidos_da_tijuca: 'Ganga-Zumbi, Expressão de uma Raça',
    caprichosos_de_pilares: 'Samba, sabor chocolate',
    caprichosos: 'Samba, sabor chocolate',
    tradicao: 'Do Barril ao Brasil',
    imperio_da_tijuca: 'O reino unido independente do Nordeste',
    unidos_da_ponte: 'As Sombras da Folia em Alto Astral',
    ponte: 'As Sombras da Folia em Alto Astral',
    // Série Ouro 1996
    santa_cruz: 'Ribalta - Luz, Sonho e Ilusão',
    academicos_de_santa_cruz: 'Ribalta - Luz, Sonho e Ilusão',
    rocinha: 'Bahia com muito amor',
    academicos_da_rocinha: 'Bahia com muito amor',
    sao_clemente: 'Se a Canoa não Virar, a São Clemente Chega Lá',
    vizinha_faladeira: 'Elba Popular Brasileira',
    vizinha: 'Elba Popular Brasileira',
    cabucu: 'Do reclame ao merchandising, a história da propaganda no Brasil',
    unidos_do_cabucu: 'Do reclame ao merchandising, a história da propaganda no Brasil',
    em_cima_da_hora: 'Yara cigana, canta, dança e toca, é Rio, é rua, é Carioca',
    arrastao_cascadura: 'As Icamiabas',
    arrastao: 'As Icamiabas',
    arrastao_de_cascadura: 'As Icamiabas',
    engenho_da_rainha: 'Anjo azul',
    academicos_do_engenho_da_rainha: 'Anjo azul',
    cubango: 'Dos brasões do reino de Portugal, ao esplendor da bandeira nacional',
    academicos_do_cubango: 'Dos brasões do reino de Portugal, ao esplendor da bandeira nacional',
    villa_rica: 'A Lavagem do Bonfim',
    unidos_da_villa_rica: 'A Lavagem do Bonfim'
  },
  1995: {
    // Grupo Especial 1995
    imperatriz: 'Mais Vale um Jegue que me Carregue, que um Camelo que me Derrube lá no Ceará',
    imperatriz_leopoldinense: 'Mais Vale um Jegue que me Carregue, que um Camelo que me Derrube lá no Ceará',
    portela: 'Gosto que me Enrosco',
    beija_flor: 'Bidu Sayão e o Canto de Cristal',
    beija_flor_de_nilopolis: 'Bidu Sayão e o Canto de Cristal',
    mocidade: 'Padre Miguel Olhai por Nós',
    mocidade_independente: 'Padre Miguel Olhai por Nós',
    mocidade_independente_de_padre_miguel: 'Padre Miguel Olhai por Nós',
    salgueiro: 'O Caso do por Acaso',
    academicos_do_salgueiro: 'O Caso do por Acaso',
    mangueira: 'A Esmeralda do Atlântico',
    estacao_primeira_de_mangueira: 'A Esmeralda do Atlântico',
    estacio_de_sa: 'Uma Vez Flamengo...',
    estacio: 'Uma Vez Flamengo...',
    viradouro: 'O Rei e os Três Espantos de Debret',
    unidos_do_viradouro: 'O Rei e os Três Espantos de Debret',
    vila_isabel: 'Cara ou Coroa, as Duas Faces da Moeda',
    unidos_de_vila_isabel: 'Cara ou Coroa, as Duas Faces da Moeda',
    caprichosos_de_pilares: 'Da Terra Brotei, Negro Sou e Ouro Virei',
    caprichosos: 'Da Terra Brotei, Negro Sou e Ouro Virei',
    uniao_da_ilha: 'Todo Dia é Dia de Índio',
    ilha: 'Todo Dia é Dia de Índio',
    tijuca: 'Os Nove Bravos do Guarani',
    unidos_da_tijuca: 'Os Nove Bravos do Guarani',
    tradicao: 'Gira Roda, Roda Gira',
    unidos_da_ponte: 'Paraná, esse Estado Leva a Sério o meu Brasil',
    ponte: 'Paraná, esse Estado Leva a Sério o meu Brasil',
    imperio_serrano: 'O Tempo não Pára',
    grande_rio: 'Estória para Ninar um Povo Patriota',
    academicos_do_grande_rio: 'Estória para Ninar um Povo Patriota',
    sao_clemente: 'O que é que não é, mas será?',
    villa_rica: 'Deu Pano pra Manga',
    unidos_da_villa_rica: 'Deu Pano pra Manga',
    // Série Ouro 1995
    porto_da_pedra: 'Campo Cidade em Busca da Felicidade',
    unidos_do_porto_da_pedra: 'Campo Cidade em Busca da Felicidade',
    imperio_da_tijuca: 'No Sassarico da Colombo',
    arrastao_cascadura: 'Frevança',
    arrastao: 'Frevança',
    arrastao_de_cascadura: 'Frevança',
    rocinha: 'Sem Medo de ser Feliz',
    academicos_da_rocinha: 'Sem Medo de ser Feliz',
    santa_cruz: 'Deuses e Costumes nas Terras de Santa Cruz',
    academicos_de_santa_cruz: 'Deuses e Costumes nas Terras de Santa Cruz',
    vizinha_faladeira: 'O Relicário do Samba',
    vizinha: 'O Relicário do Samba',
    cubango: 'Da Aldeia de São Lourenço a Niterói, a Cidade Sorriso',
    academicos_do_cubango: 'Da Aldeia de São Lourenço a Niterói, a Cidade Sorriso',
    cabucu: 'Um Abraço à Cinelândia, 60 anos de Teatro Rival',
    unidos_do_cabucu: 'Um Abraço à Cinelândia, 60 anos de Teatro Rival',
    engenho_da_rainha: 'Yolhesman Crisbeles, a República de Ipanema é um Desbunde',
    academicos_do_engenho_da_rainha: 'Yolhesman Crisbeles, a República de Ipanema é um Desbunde',
    em_cima_da_hora: 'No Reflexo do Espelho, a Arte de Dançar (Homenagem à Carlinhos de Jesus)',
    jacarezinho: 'E o Jacarezinho Descobriu a Atlântida, a Tela Perdida',
    unidos_do_jacarezinho: 'E o Jacarezinho Descobriu a Atlântida, a Tela Perdida',
    dificil_e_o_nome: 'A Grande Estrela, o Sol',
    dificil: 'A Grande Estrela, o Sol',
    leao_de_nova_iguacu: 'Arautos do Brasil Mulato',
    leao_nova_iguacu: 'Arautos do Brasil Mulato',
    unidos_de_lucas: 'Os Quindins de Yayá',
    lucas: 'Os Quindins de Yayá',
    lins_imperial: 'Uma Festa em Verde e Rosa',
    lins: 'Uma Festa em Verde e Rosa',
    arranco: 'Ria ... Se Puder',
    arranco_do_engenho_de_dentro: 'Ria ... Se Puder',
    independentes_cordovil: 'Retratos e Canções',
    independentes_de_cordovil: 'Retratos e Canções',
    cordovil: 'Retratos e Canções',
    mocidade_cidade_de_deus: 'Domingo é Dia de Quinta',
    mocidade_unida_da_cidade_de_deus: 'Domingo é Dia de Quinta',
    cidade_de_deus: 'Domingo é Dia de Quinta',
    canarios_laranjeiras: 'Seu Conductor, Din Din Seu Condutor',
    canarios: 'Seu Conductor, Din Din Seu Condutor',
    canarios_das_laranjeiras: 'Seu Conductor, Din Din Seu Condutor'
  },
  1994: {
    // Grupo Especial 1994
    imperatriz: 'Catarina de Médicis na corte dos tupinambôs e tabajeres',
    imperatriz_leopoldinense: 'Catarina de Médicis na corte dos tupinambôs e tabajeres',
    salgueiro: 'Rio de lá pra cá',
    academicos_do_salgueiro: 'Rio de lá pra cá',
    viradouro: 'Tereza de Benguela, uma rainha negra no Pantanal',
    unidos_do_viradouro: 'Tereza de Benguela, uma rainha negra no Pantanal',
    uniao_da_ilha: 'Abrakadabra, o despertar dos mágicos',
    ilha: 'Abrakadabra, o despertar dos mágicos',
    beija_flor: 'Margareth Mee, a dama das bromélias',
    beija_flor_de_nilopolis: 'Margareth Mee, a dama das bromélias',
    tradicao: 'Passarinho, passarola, quero ver voar',
    portela: 'Quando o samba era samba',
    mocidade: 'Avenida Brasil, tudo passa, quem não viu?',
    mocidade_independente: 'Avenida Brasil, tudo passa, quem não viu?',
    mocidade_independente_de_padre_miguel: 'Avenida Brasil, tudo passa, quem não viu?',
    vila_isabel: 'Muito prazer! Isabel de Bragança e Drumond Rosa da Silva, mas pode me chamar de Vila',
    unidos_de_vila_isabel: 'Muito prazer! Isabel de Bragança e Drumond Rosa da Silva, mas pode me chamar de Vila',
    caprichosos_de_pilares: 'Estou amando loucamente uma coroa de quase 90 anos',
    caprichosos: 'Estou amando loucamente uma coroa de quase 90 anos',
    mangueira: 'Atrás da Verde e Rosa só não vai quem já morreu',
    estacao_primeira_de_mangueira: 'Atrás da Verde e Rosa só não vai quem já morreu',
    grande_rio: 'Os santos que a África não viu',
    academicos_do_grande_rio: 'Os santos que a África não viu',
    estacio_de_sa: 'S.A.A.R.A. A Estácio chegou no iê iê iê de alalaô',
    estacio: 'S.A.A.R.A. A Estácio chegou no iê iê iê de alalaô',
    tijuca: 'SóRio... É verão',
    unidos_da_tijuca: 'SóRio... É verão',
    unidos_da_ponte: 'Marrom da cor do samba',
    ponte: 'Marrom da cor do samba',
    imperio_serrano: 'Uma festa brasileira',
    // Série Ouro 1994
    villa_rica: 'Copacabana, meu amor',
    unidos_da_villa_rica: 'Copacabana, meu amor',
    sao_clemente: 'Uma andorinha só não faz verão ou Aonde vai a corda vai a caçamba',
    rocinha: 'Humor pra dar e vender',
    academicos_da_rocinha: 'Humor pra dar e vender',
    imperio_da_tijuca: 'Nélson Rodrigues, um beijo na Sapucaí',
    cabucu: 'Brajiru, meu Japão brasileiro',
    unidos_do_cabucu: 'Brajiru, meu Japão brasileiro',
    leao_de_nova_iguacu: 'Da França tropical a Orfeu do Carnaval',
    leao_nova_iguacu: 'Da França tropical a Orfeu do Carnaval',
    santa_cruz: 'A rota dos mercadores',
    academicos_de_santa_cruz: 'A rota dos mercadores',
    jacarezinho: 'E agora eu, ao vivo e a cores',
    unidos_do_jacarezinho: 'E agora eu, ao vivo e a cores',
    arranco: 'Sapucaia Oroca',
    arranco_do_engenho_de_dentro: 'Sapucaia Oroca',
    engenho_da_rainha: 'Entre festas e fitas',
    academicos_do_engenho_da_rainha: 'Entre festas e fitas',
    canarios_laranjeiras: 'Quem é bom já nasce feito',
    canarios: 'Quem é bom já nasce feito',
    canarios_das_laranjeiras: 'Quem é bom já nasce feito',
    unidos_de_lucas: 'Conservatória, cidade serenata sambando na Sapucaí',
    lucas: 'Conservatória, cidade serenata sambando na Sapucaí',
    lins_imperial: 'Magos da oitava maravilha',
    lins: 'Magos da oitava maravilha',
    independentes_cordovil: 'Garotinho vem... Sacudindo a Sapucaí',
    independentes_de_cordovil: 'Garotinho vem... Sacudindo a Sapucaí',
    cordovil: 'Garotinho vem... Sacudindo a Sapucaí',
    cubango: 'Ao mestre com carinho (Homenagem a Fernando Pamplona)',
    academicos_do_cubango: 'Ao mestre com carinho (Homenagem a Fernando Pamplona)',
    arrastao_cascadura: 'Assim caminha a humanidade',
    arrastao: 'Assim caminha a humanidade',
    arrastao_de_cascadura: 'Assim caminha a humanidade'
  },
  1993: {
    // Grupo Especial 1993
    salgueiro: 'Peguei um Ita no Norte',
    academicos_do_salgueiro: 'Peguei um Ita no Norte',
    imperatriz: 'Marquês que é marquês do sassarico é freguês',
    imperatriz_leopoldinense: 'Marquês que é marquês do sassarico é freguês',
    beija_flor: 'Uni-duni-tê, a Beija-Flor escolheu: é você',
    beija_flor_de_nilopolis: 'Uni-duni-tê, a Beija-Flor escolheu: é você',
    mocidade: 'Marraio feridô sou rei',
    mocidade_independente: 'Marraio feridô sou rei',
    mocidade_independente_de_padre_miguel: 'Marraio feridô sou rei',
    mangueira: 'Dessa fruta eu como até o caroço',
    estacao_primeira_de_mangueira: 'Dessa fruta eu como até o caroço',
    estacio_de_sa: 'A dança da lua',
    estacio: 'A dança da lua',
    viradouro: 'Amor, sublime amor',
    unidos_do_viradouro: 'Amor, sublime amor',
    vila_isabel: 'Gbala, viagem ao templo da criação',
    unidos_de_vila_isabel: 'Gbala, viagem ao templo da criação',
    grande_rio: 'No mundo da lua',
    academicos_do_grande_rio: 'No mundo da lua',
    portela: 'Cerimônia de casamento',
    uniao_da_ilha: 'Os maiores espetáculos da terra',
    ilha: 'Os maiores espetáculos da terra',
    tijuca: 'Dança Brasil',
    unidos_da_tijuca: 'Dança Brasil',
    caprichosos_de_pilares: 'Não existe pecado do lado de cá do Túnel Rebouças',
    caprichosos: 'Não existe pecado do lado de cá do Túnel Rebouças',
    unidos_da_ponte: 'A face do disfarce',
    ponte: 'A face do disfarce',
    // Série Ouro 1993
    tradicao: 'Não me leve a mal, hoje é carnaval',
    imperio_serrano: 'Império Serrano, um ato de amor',
    cabucu: 'De quadrinho em quadrinho, lá vai meu recado... Maurício de Souza',
    unidos_do_cabucu: 'De quadrinho em quadrinho, lá vai meu recado... Maurício de Souza',
    santa_cruz: 'Quo vadis, meu negro de ouro',
    academicos_de_santa_cruz: 'Quo vadis, meu negro de ouro',
    leao_de_nova_iguacu: 'O que é que a Baixada tem',
    leao_nova_iguacu: 'O que é que a Baixada tem',
    rocinha: 'Tristão e Isolda, uma ópera no asfalto',
    academicos_da_rocinha: 'Tristão e Isolda, uma ópera no asfalto',
    sao_clemente: 'O pão nosso de cada dia',
    imperio_da_tijuca: 'Vitis vinífera, o Império é uma uva',
    lins_imperial: 'No mundo encantado de Beto Carrero',
    lins: 'No mundo encantado de Beto Carrero',
    engenho_da_rainha: 'Ciranda, cirandinha, vamos todos sonhar',
    academicos_do_engenho_da_rainha: 'Ciranda, cirandinha, vamos todos sonhar',
    cubango: 'Do fogo às águas, recriando a terra',
    academicos_do_cubango: 'Do fogo às águas, recriando a terra',
    unidos_de_lucas: 'O Galo cantou e Lucas saboreou',
    lucas: 'O Galo cantou e Lucas saboreou',
    jacarezinho: 'Mangueira, beleza que a natureza criou',
    unidos_do_jacarezinho: 'Mangueira, beleza que a natureza criou',
    arranco: 'Acredite se quiser',
    arranco_do_engenho_de_dentro: 'Acredite se quiser',
    arrastao_cascadura: 'Quem canta seus males espanta',
    arrastao: 'Quem canta seus males espanta',
    arrastao_de_cascadura: 'Quem canta seus males espanta',
    mocidade_cidade_de_deus: 'Dona Zica e Dona Neuma, enredos de verdade',
    cidade_de_deus: 'Dona Zica e Dona Neuma, enredos de verdade',
    mocidade_unida_da_cidade_de_deus: 'Dona Zica e Dona Neuma, enredos de verdade'
  },
  1992: {
    // Grupo Especial 1992
    estacio_de_sa: 'Paulicéia desvairada, 70 anos de modernismo no Brasil',
    estacio: 'Paulicéia desvairada, 70 anos de modernismo no Brasil',
    mocidade: 'Sonhar não custa nada, ou quase nada',
    mocidade_independente: 'Sonhar não custa nada, ou quase nada',
    mocidade_independente_de_padre_miguel: 'Sonhar não custa nada, ou quase nada',
    imperatriz: 'Não existe pecado do lado de baixo do equador',
    imperatriz_leopoldinense: 'Não existe pecado do lado de baixo do equador',
    salgueiro: 'O negro que virou ouro nas terras do Salgueiro',
    academicos_do_salgueiro: 'O negro que virou ouro nas terras do Salgueiro',
    portela: 'Todo o azul que o azul tem',
    mangueira: 'Se todos fossem iguais a você -Tom Jobim',
    estacao_primeira_de_mangueira: 'Se todos fossem iguais a você -Tom Jobim',
    beija_flor: 'Há um ponto de luz na imensidão',
    beija_flor_de_nilopolis: 'Há um ponto de luz na imensidão',
    tijuca: 'Guanabaram, o seio do mar',
    unidos_da_tijuca: 'Guanabaram, o seio do mar',
    viradouro: 'E a magia da sorte chegou',
    unidos_do_viradouro: 'E a magia da sorte chegou',
    uniao_da_ilha: 'Sou mais minha Ilha',
    ilha: 'Sou mais minha Ilha',
    caprichosos_de_pilares: 'Brasil feito a mão... Do barro ao carnaval',
    caprichosos: 'Brasil feito a mão... Do barro ao carnaval',
    vila_isabel: 'A Vila vê o ôvo e põe às claras',
    unidos_de_vila_isabel: 'A Vila vê o ôvo e põe às claras',
    leao_de_nova_iguacu: 'O Leão na selva de ilusões de Janete Clair',
    leao_nova_iguacu: 'O Leão na selva de ilusões de Janete Clair',
    tradicao: 'O espetáculo maior... As flores',
    santa_cruz: 'De quatro em quatro eu chego lá',
    academicos_de_santa_cruz: 'De quatro em quatro eu chego lá',

    // Série Ouro 1992
    grande_rio: 'Águas claras para um rei negro',
    academicos_do_grande_rio: 'Águas claras para um rei negro',
    unidos_da_ponte: 'Da cor do pecado',
    ponte: 'Da cor do pecado',
    imperio_serrano: 'Fala Serrinha, a voz do samba sou eu mesmo, sim senhor',
    arranco: 'Mandacaru, fruta-flor do querer',
    arranco_do_engenho_de_dentro: 'Mandacaru, fruta-flor do querer',
    rocinha: 'Para não dizer que não falei das flores',
    academicos_da_rocinha: 'Para não dizer que não falei das flores',
    jacarezinho: 'A visita do Jacarezinho ao reino encantado de Maria Clara Machado',
    unidos_do_jacarezinho: 'A visita do Jacarezinho ao reino encantado de Maria Clara Machado',
    sao_clemente: 'E o salário Ó ...',
    cabucu: 'Xuxa, a realidade vira sonho no xou da Cabuçu',
    unidos_do_cabucu: 'Xuxa, a realidade vira sonho no xou da Cabuçu',
    unidos_de_lucas: 'Baía com I',
    lucas: 'Baía com I',
    imperio_da_tijuca: 'Um mistério chamado Brasil (Homenagem a Sinval Silva)',
    lins_imperial: 'Rio - Eco 92',
    lins: 'Rio - Eco 92',
    engenho_da_rainha: 'Mãe Terra: e o homem refez a criação. O mito do Engenho da Rainha',
    academicos_do_engenho_da_rainha: 'Mãe Terra: e o homem refez a criação. O mito do Engenho da Rainha',
    independentes_cordovil: 'Um negro chamado felicidade, Neguinho da Beija-Flor',
    independentes_de_cordovil: 'Um negro chamado felicidade, Neguinho da Beija-Flor',
    cordovil: 'Um negro chamado felicidade, Neguinho da Beija-Flor',
    unidos_do_campinho: 'Passa, passa o tempo',
    unidos_de_campinho: 'Passa, passa o tempo',
    campinho: 'Passa, passa o tempo'
  },
  1991: {
    // Grupo Especial 1991
    mocidade: 'Chuê, chuá, as águas vão rolar',
    mocidade_independente: 'Chuê, chuá, as águas vão rolar',
    mocidade_independente_de_padre_miguel: 'Chuê, chuá, as águas vão rolar',
    salgueiro: 'Me masso se não passo pela Rua do Ouvidor',
    academicos_do_salgueiro: 'Me masso se não passo pela Rua do Ouvidor',
    imperatriz: 'O quê é que a banana tem?',
    imperatriz_leopoldinense: 'O quê é que a banana tem?',
    beija_flor: 'Alice no Brasil das Maravilhas',
    beija_flor_de_nilopolis: 'Alice no Brasil das Maravilhas',
    estacio_de_sa: 'Brasil, brega e kitsch',
    estacio: 'Brasil, brega e kitsch',
    portela: 'Tributo à vaidade',
    viradouro: 'Bravo, bravíssimo - Dercy, o retrato de um povo',
    unidos_do_viradouro: 'Bravo, bravíssimo - Dercy, o retrato de um povo',
    tijuca: 'Tá na mesa Brasil',
    unidos_da_tijuca: 'Tá na mesa Brasil',
    uniao_da_ilha: 'De bar em bar, Didi, um poeta',
    ilha: 'De bar em bar, Didi, um poeta',
    caprichosos_de_pilares: 'Terceiro milênio, em busca do juízo afinal',
    caprichosos: 'Terceiro milênio, em busca do juízo afinal',
    vila_isabel: 'Luiz Peixoto: e tome polca!',
    unidos_de_vila_isabel: 'Luiz Peixoto: e tome polca!',
    mangueira: 'As três rendeiras do universo',
    estacao_primeira_de_mangueira: 'As três rendeiras do universo',
    sao_clemente: 'Já vi este filme',
    lins_imperial: 'Chico Mendes, o arauto da natureza',
    lins: 'Chico Mendes, o arauto da natureza',
    imperio_serrano: 'É por aí que eu vou',
    grande_rio: 'Antes, durante e depois, o despertar do homem',
    academicos_do_grande_rio: 'Antes, durante e depois, o despertar do homem',

    // Série Ouro 1991
    tradicao: 'De geração à geração nas asas da Tradição',
    leao_de_nova_iguacu: 'Quem te viu, quem TV',
    leao_nova_iguacu: 'Quem te viu, quem TV',
    jacarezinho: 'Sou negro, sou raça, sou gente',
    unidos_do_jacarezinho: 'Sou negro, sou raça, sou gente',
    cabucu: 'Aconteceu, virou Manchete',
    unidos_do_cabucu: 'Aconteceu, virou Manchete',
    unidos_de_lucas: 'Pare a big bang-bang, nem todo amarelo é ouro, nem todo vermelho é sangue',
    lucas: 'Pare a big bang-bang, nem todo amarelo é ouro, nem todo vermelho é sangue',
    engenho_da_rainha: 'Meu padrinho padre Cícero do Juazeiro do Norte, olhai pelo Cariri',
    academicos_do_engenho_da_rainha: 'Meu padrinho padre Cícero do Juazeiro do Norte, olhai pelo Cariri',
    arranco: 'Barracão, pregos, panos e paetês',
    arranco_do_engenho_de_dentro: 'Barracão, pregos, panos e paetês',
    imperio_da_tijuca: 'Canaã, a terra prometida Brasil',
    unidos_da_ponte: 'Quando o Rio ria',
    ponte: 'Quando o Rio ria',
    independentes_cordovil: 'Ela, ele e eles, possuidores da noite',
    independentes_de_cordovil: 'Ela, ele e eles, possuidores da noite',
    cordovil: 'Ela, ele e eles, possuidores da noite',
    tuiuti: 'Asa branca',
    paraiso_do_tuiuti: 'Asa branca',
    santa_cruz: 'O Boca do Inferno',
    academicos_de_santa_cruz: 'O Boca do Inferno'
  },
  1990: {
    // Grupo Especial 1990
    mocidade: 'Vira, virou, a Mocidade chegou',
    mocidade_independente: 'Vira, virou, a Mocidade chegou',
    mocidade_independente_de_padre_miguel: 'Vira, virou, a Mocidade chegou',
    beija_flor: 'Todo mundo nasceu nu',
    beija_flor_de_nilopolis: 'Todo mundo nasceu nu',
    salgueiro: 'Sou amigo do rei',
    academicos_do_salgueiro: 'Sou amigo do rei',
    imperatriz: 'Terra Brasilis, o que se plantou deu',
    imperatriz_leopoldinense: 'Terra Brasilis, o que se plantou deu',
    estacio_de_sa: 'Langsdorff, delírio na Sapucaí',
    estacio: 'Langsdorff, delírio na Sapucaí',
    sao_clemente: 'E o samba sambou',
    uniao_da_ilha: 'Sonhar com rei dá João',
    ilha: 'Sonhar com rei dá João',
    mangueira: 'E deu a louca no Barroco',
    estacao_primeira_de_mangueira: 'E deu a louca no Barroco',
    tijuca: 'E o Borel descobriu... Navegar foi preciso',
    unidos_da_tijuca: 'E o Borel descobriu... Navegar foi preciso',
    portela: 'É de ouro e prata esse chão',
    imperio_serrano: 'História da nossa história',
    vila_isabel: 'Se esta terra, se esta terra fosse minha',
    unidos_de_vila_isabel: 'Se esta terra, se esta terra fosse minha',
    caprichosos_de_pilares: 'Com a boca no mundo',
    caprichosos: 'Com a boca no mundo',
    lins_imperial: 'Madame Satã',
    lins: 'Madame Satã',
    santa_cruz: 'Os heróis da resistência',
    academicos_de_santa_cruz: 'Os heróis da resistência',
    cabucu: 'Será que votei certo para presidente?',
    unidos_do_cabucu: 'Será que votei certo para presidente?',

    // Série Ouro 1990
    viradouro: 'Só vale o que está escrito',
    unidos_do_viradouro: 'Só vale o que está escrito',
    grande_rio: 'Porque sou carioca?',
    academicos_do_grande_rio: 'Porque sou carioca?',
    unidos_da_ponte: 'Robauto, uma ova',
    ponte: 'Robauto, uma ova',
    tradicao: 'A coroação',
    jacarezinho: 'Jurupari, a voz da mata',
    unidos_do_jacarezinho: 'Jurupari, a voz da mata',
    engenho_da_rainha: 'Dan, a serpente encantada do arco-íris',
    academicos_do_engenho_da_rainha: 'Dan, a serpente encantada do arco-íris',
    arranco: 'Do leite de cabra ao silicone',
    arranco_do_engenho_de_dentro: 'Do leite de cabra ao silicone',
    unidos_de_lucas: 'O magnífico Niemeyer',
    lucas: 'O magnífico Niemeyer',
    tuiuti: 'Eneida, o pierrô está de volta',
    paraiso_do_tuiuti: 'Eneida, o pierrô está de volta',
    independentes_cordovil: 'Cantares ao meu povo, Solano Trindade',
    independentes_de_cordovil: 'Cantares ao meu povo, Solano Trindade',
    cordovil: 'Cantares ao meu povo, Solano Trindade'
  },
  1989: {
    // Grupo Especial 1989
    imperatriz: 'Liberdade, Liberdade, Abre as Asas sobre Nós',
    imperatriz_leopoldinense: 'Liberdade, Liberdade, Abre as Asas sobre Nós',
    beija_flor: 'Ratos e urubus larguem minha fantasia',
    beija_flor_de_nilopolis: 'Ratos e urubus larguem minha fantasia',
    uniao_da_ilha: 'Festa profana',
    ilha: 'Festa profana',
    vila_isabel: 'Direito é direito',
    unidos_de_vila_isabel: 'Direito é direito',
    salgueiro: 'Templo negro em tempo de consciência negra',
    academicos_do_salgueiro: 'Templo negro em tempo de consciência negra',
    portela: 'Achado não é roubado',
    mocidade: 'Elis, um Trem Chamado Emoção',
    mocidade_independente: 'Elis, um Trem Chamado Emoção',
    mocidade_independente_de_padre_miguel: 'Elis, um Trem Chamado Emoção',
    tijuca: 'De Portugal à Bienal no país do carnaval',
    unidos_da_tijuca: 'De Portugal à Bienal no país do carnaval',
    estacio_de_sa: 'Um, dois, feijão com arroz',
    estacio: 'Um, dois, feijão com arroz',
    imperio_serrano: 'Jorge Amado, Axé Brasil',
    mangueira: 'Trinca de Reis',
    estacao_primeira_de_mangueira: 'Trinca de Reis',
    caprichosos_de_pilares: 'O que é bom todo mundo gosta',
    caprichosos: 'O que é bom todo mundo gosta',
    sao_clemente: 'Made in Brazil, Yes Nós Temos Banana',
    cabucu: 'Milton Nascimento, sou do mundo, sou de Minas Gerais',
    unidos_do_cabucu: 'Milton Nascimento, sou do mundo, sou de Minas Gerais',
    unidos_da_ponte: 'Vida que te quero viva',
    ponte: 'Vida que te quero viva',
    tradicao: 'Rio, Samba, Amor e Tradição',
    arranco: 'Quem Vai Querer?',
    arranco_do_engenho_de_dentro: 'Quem Vai Querer?',
    jacarezinho: 'Mitologia, astrologia, horóscopo, uma benção para o carnaval brasileiro',
    unidos_do_jacarezinho: 'Mitologia, astrologia, horóscopo, uma benção para o carnaval brasileiro',

    // Série Ouro 1989
    santa_cruz: 'Stanislaw, uma história sem final',
    academicos_de_santa_cruz: 'Stanislaw, uma história sem final',
    lins_imperial: 'Gênios da ilusão',
    lins: 'Gênios da ilusão',
    unidos_de_lucas: 'Estrelas Solitárias, Linda e Dircinha Batista',
    lucas: 'Estrelas Solitárias, Linda e Dircinha Batista',
    engenho_da_rainha: 'Canta Brasil',
    academicos_do_engenho_da_rainha: 'Canta Brasil',
    independentes_cordovil: 'Marrom som Brasil',
    independentes_de_cordovil: 'Marrom som Brasil',
    cordovil: 'Marrom som Brasil',
    tuiuti: 'Folclore, Tradição Popular',
    paraiso_do_tuiuti: 'Folclore, Tradição Popular',
    imperio_da_tijuca: 'Rio, samba e carnaval',
    arrastao_cascadura: 'Zezé, um canto de amor e raça',
    arrastao_de_cascadura: 'Zezé, um canto de amor e raça',
    arrastao: 'Zezé, um canto de amor e raça',
    em_cima_da_hora: 'Num passe de mágica',
    tupy_bras_de_pina: 'Rio Boa Praça',
    tupy_de_bras_de_pina: 'Rio Boa Praça',
    tupy: 'Rio Boa Praça'
  },
  1988: {
    // Grupo Especial 1988
    vila_isabel: 'Kizomba, festa da raça',
    unidos_de_vila_isabel: 'Kizomba, festa da raça',
    mangueira: '100 anos de liberdade, realidade ou ilusão?',
    estacao_primeira_de_mangueira: '100 anos de liberdade, realidade ou ilusão?',
    beija_flor: 'Sou negro, do Egito à liberdade',
    beija_flor_de_nilopolis: 'Sou negro, do Egito à liberdade',
    salgueiro: 'Em busca do ouro',
    academicos_do_salgueiro: 'Em busca do ouro',
    portela: 'Na lenda carioca, os sonhos do vice-rei',
    uniao_da_ilha: 'Aquarilha do Brasil',
    ilha: 'Aquarilha do Brasil',
    imperio_serrano: 'Pára com isto, dá cá o meu',
    caprichosos_de_pilares: 'Luz, câmera e ação',
    caprichosos: 'Luz, câmera e ação',
    mocidade: 'Beijim, beijim, bye bye Brasil',
    mocidade_independente: 'Beijim, beijim, bye bye Brasil',
    mocidade_independente_de_padre_miguel: 'Beijim, beijim, bye bye Brasil',
    tradicao: 'O melhor da raça, o melhor do carnaval',
    estacio_de_sa: 'O boi dá bode',
    estacio: 'O boi dá bode',
    sao_clemente: 'Quem avisa amigo é',
    tijuca: 'Templo do absurdo - Bar Brasil',
    unidos_da_tijuca: 'Templo do absurdo - Bar Brasil',
    unidos_da_ponte: 'O bem amado Paulo Gracindo',
    ponte: 'O bem amado Paulo Gracindo',
    cabucu: 'O mundo mágico dos Trapalhões',
    unidos_do_cabucu: 'O mundo mágico dos Trapalhões',
    imperatriz: 'Conta outra que essa foi boa',
    imperatriz_leopoldinense: 'Conta outra que essa foi boa',

    // Série Ouro 1988
    arranco: 'Pra ver a banda passar',
    arranco_do_engenho_de_dentro: 'Pra ver a banda passar',
    jacarezinho: 'Parabéns pra Vocês',
    unidos_do_jacarezinho: 'Parabéns pra Vocês',
    unidos_de_lucas: 'Na Ginga do Samba, aí vem Ataulfo',
    lucas: 'Na Ginga do Samba, aí vem Ataulfo',
    imperio_da_tijuca: 'Nosso Sinhô, rei do samba',
    santa_cruz: 'Como se bebe nesta terra',
    academicos_de_santa_cruz: 'Como se bebe nesta terra',
    tuiuti: 'Filho de Branco é Menino, Filho de Negro é Moleque. Moleque taí, Moleque vem cá, vem cá Apanhar',
    paraiso_do_tuiuti: 'Filho de Branco é Menino, Filho de Negro é Moleque. Moleque taí, Moleque vem cá, vem cá Apanhar',
    lins_imperial: 'Primavera é tempo de saudade, tributo a Zinco e Caxambu',
    lins: 'Primavera é tempo de saudade, tributo a Zinco e Caxambu',
    engenho_da_rainha: 'De sete em sete, pintando o sete',
    academicos_do_engenho_da_rainha: 'De sete em sete, pintando o sete',
    independentes_cordovil: 'Burle Marx',
    independentes_de_cordovil: 'Burle Marx',
    cordovil: 'Burle Marx',
    tupy_bras_de_pina: 'E agora, José?',
    tupy_de_bras_de_pina: 'E agora, José?',
    tupy: 'E agora, José?'
  },
  1987: {
    // Grupo Especial 1987
    mangueira: 'No Reino das Palavras, Carlos Drummond de Andrade',
    estacao_primeira_de_mangueira: 'No Reino das Palavras, Carlos Drummond de Andrade',
    mocidade: 'Tupinicópolis',
    mocidade_independente: 'Tupinicópolis',
    mocidade_independente_de_padre_miguel: 'Tupinicópolis',
    portela: 'Adelaide, a Pomba da Paz',
    imperio_serrano: 'Com a Boca no Mundo, Quem não se Comunica se Trumbica',
    beija_flor: 'As Mágicas Luzes da Ribalta',
    beija_flor_de_nilopolis: 'As Mágicas Luzes da Ribalta',
    estacio_de_sa: 'O Ti-Ti-Ti do Sapoti',
    estacio: 'O Ti-Ti-Ti do Sapoti',
    salgueiro: 'E Por Que Não?',
    academicos_do_salgueiro: 'E Por Que Não?',
    vila_isabel: 'Raízes',
    unidos_de_vila_isabel: 'Raízes',
    imperatriz: 'Estrela Dalva - Homenagem a Dalva de Oliveira',
    imperatriz_leopoldinense: 'Estrela Dalva - Homenagem a Dalva de Oliveira',
    cabucu: 'Roberto Carlos na Cidade da Fantasia',
    unidos_do_cabucu: 'Roberto Carlos na Cidade da Fantasia',
    sao_clemente: 'Capitães do Asfalto',
    caprichosos_de_pilares: 'Ajoelhou Tem que Rezar... ou Eu Prometo',
    caprichosos: 'Ajoelhou Tem que Rezar... ou Eu Prometo',
    uniao_da_ilha: 'Extra, Extra',
    uniao_da_ilha_do_governador: 'Extra, Extra',
    ilha: 'Extra, Extra',
    unidos_da_ponte: 'G.R.E.S. Saudade',
    ponte: 'G.R.E.S. Saudade',
    jacarezinho: 'Lupicínio Rodrigues, Dor-de-Cotovelo',
    unidos_do_jacarezinho: 'Lupicínio Rodrigues, Dor-de-Cotovelo',
    imperio_da_tijuca: 'Viva o Povo Brasileiro',

    // Série Ouro 1987
    tijuca: 'As Três Faces da Moeda',
    unidos_da_tijuca: 'As Três Faces da Moeda',
    tradicao: 'Sonhos de Natal',
    unidos_de_lucas: 'Olha que Coisa mais Linda, mais Cheia de Graça',
    lucas: 'Olha que Coisa mais Linda, mais Cheia de Graça',
    santa_cruz: 'Quem Espera só se Cansa',
    academicos_de_santa_cruz: 'Quem Espera só se Cansa',
    arranco: 'Tradição de uma Raça',
    arranco_do_engenho_de_dentro: 'Tradição de uma Raça',
    engenho_da_rainha: 'E o Rio Amanheceu Cantando',
    academicos_do_engenho_da_rainha: 'E o Rio Amanheceu Cantando',
    independentes_cordovil: 'Amado, Jorge, Amante',
    independentes_de_cordovil: 'Amado, Jorge, Amante',
    cordovil: 'Amado, Jorge, Amante',
    lins_imperial: 'Tenda dos Milagres',
    lins: 'Tenda dos Milagres',
    em_cima_da_hora: 'Kid Morangueira da Silva, o Embaixador dos Morros'
  },
  1986: {
    // Grupo Especial 1986
    mangueira: 'Caymmi mostra ao mundo o que a Bahia tem e a Mangueira também',
    estacao_primeira_de_mangueira: 'Caymmi mostra ao mundo o que a Bahia tem e a Mangueira também',
    beija_flor: 'O mundo é uma bola',
    beija_flor_de_nilopolis: 'O mundo é uma bola',
    imperio_serrano: 'Eu quero',
    portela: 'Morfeu no carnaval, a utopia brasileira',
    uniao_da_ilha: 'Assombrações',
    uniao_da_ilha_do_governador: 'Assombrações',
    ilha: 'Assombrações',
    salgueiro: 'Tem que se tirar da cabeça aquilo que não se tem no bolso - Tributo a Fernando Pamplona',
    academicos_do_salgueiro: 'Tem que se tirar da cabeça aquilo que não se tem no bolso - Tributo a Fernando Pamplona',
    mocidade: 'Bruxarias e estórias do arco da velha',
    mocidade_independente: 'Bruxarias e estórias do arco da velha',
    mocidade_independente_de_padre_miguel: 'Bruxarias e estórias do arco da velha',
    imperatriz: 'Um jeito pra ninguém botar defeito',
    imperatriz_leopoldinense: 'Um jeito pra ninguém botar defeito',
    caprichosos_de_pilares: 'Brazil com Z não seremos jamais, ou seremos?',
    caprichosos: 'Brazil com Z não seremos jamais, ou seremos?',
    estacio_de_sa: 'Prata da noite - Homenagem a Grande Otelo',
    estacio: 'Prata da noite - Homenagem a Grande Otelo',
    vila_isabel: 'De alegria cantei, de alegria pulei, de três em três, pelo mundo rodei',
    unidos_de_vila_isabel: 'De alegria cantei, de alegria pulei, de três em três, pelo mundo rodei',
    imperio_da_tijuca: 'Tijuca, cantos, recantos e encantos',
    cabucu: 'Deu a louca na História! E agora Stanislaw, como é que',
    unidos_do_cabucu: 'Deu a louca na História! E agora Stanislaw, como é que',
    unidos_da_ponte: 'Herivelto Martins, tá na hora do samba que fala mais alto, que fala primeiro',
    ponte: 'Herivelto Martins, tá na hora do samba que fala mais alto, que fala primeiro',
    tijuca: 'Cama, mesa e banho de gato',
    unidos_da_tijuca: 'Cama, mesa e banho de gato',

    // Série Ouro 1986
    jacarezinho: 'Candeia, luz de inspiração',
    unidos_do_jacarezinho: 'Candeia, luz de inspiração',
    sao_clemente: 'Pouca saúde, muita saúva, os males do Brasil são',
    independentes_cordovil: 'Quem não discute, tem que engolir',
    independentes_de_cordovil: 'Quem não discute, tem que engolir',
    cordovil: 'Quem não discute, tem que engolir',
    engenho_da_rainha: 'Ganga Zumba, raiz da liberdade',
    academicos_do_engenho_da_rainha: 'Ganga Zumba, raiz da liberdade',
    em_cima_da_hora: 'Terra Brasilis',
    arranco: 'Sai mais uma',
    arranco_do_engenho_de_dentro: 'Sai mais uma',
    unidos_de_lucas: 'No ano da copa, bota no meio',
    lucas: 'No ano da copa, bota no meio',
    santa_cruz: 'E você, o que é que dá?',
    academicos_de_santa_cruz: 'E você, o que é que dá?',
    uniao_de_jacarepagua: 'No cheiro, no trago, no mastigo ou de baforada',
    jacarepagua: 'No cheiro, no trago, no mastigo ou de baforada'
  },
  1985: {
    // Grupo Especial 1985
    mocidade: 'Ziriguidum 2001, carnaval nas estrelas',
    mocidade_independente: 'Ziriguidum 2001, carnaval nas estrelas',
    mocidade_independente_de_padre_miguel: 'Ziriguidum 2001, carnaval nas estrelas',
    beija_flor: 'A Lapa de Adão e Eva',
    beija_flor_de_nilopolis: 'A Lapa de Adão e Eva',
    vila_isabel: 'Parece até que foi ontem',
    unidos_de_vila_isabel: 'Parece até que foi ontem',
    portela: 'Recordar é viver',
    caprichosos_de_pilares: 'E por falar em saudade',
    caprichosos: 'E por falar em saudade',
    salgueiro: 'Anos trinta, vento sul - Vargas',
    academicos_do_salgueiro: 'Anos trinta, vento sul - Vargas',
    imperio_serrano: 'Samba, suor e cerveja, o combustível da ilusão',
    imperatriz: 'Adolã, a cidade mistério',
    imperatriz_leopoldinense: 'Adolã, a cidade mistério',
    mangueira: 'Abram alas que eu quero passar - Chiquinha Gonzaga',
    estacao_primeira_de_mangueira: 'Abram alas que eu quero passar - Chiquinha Gonzaga',
    estacio_de_sa: 'Chora chorões',
    estacio: 'Chora chorões',
    imperio_da_tijuca: 'Se a lua contasse - Homenagem a Custódio Mesquita',
    uniao_da_ilha: 'Um herói, uma canção, um enredo',
    uniao_da_ilha_do_governador: 'Um herói, uma canção, um enredo',
    ilha: 'Um herói, uma canção, um enredo',
    cabucu: 'A festa é nossa, ninguém tasca ou Quem ri por último, ri melhor',
    unidos_do_cabucu: 'A festa é nossa, ninguém tasca ou Quem ri por último, ri melhor',
    santa_cruz: 'Ibrahim, de leve eu chego lá',
    academicos_de_santa_cruz: 'Ibrahim, de leve eu chego lá',
    sao_clemente: 'Quem casa, quer casa',
    em_cima_da_hora: 'Me acostumo mas não me amanso',

    // Série Ouro 1985
    unidos_da_ponte: 'Dez, nota dez',
    ponte: 'Dez, nota dez',
    tijuca: 'Mas o que foi que aconteceu?',
    unidos_da_tijuca: 'Mas o que foi que aconteceu?',
    arranco: 'Chuê, chuá, moronguetá cruz credo',
    arranco_do_engenho_de_dentro: 'Chuê, chuá, moronguetá cruz credo',
    engenho_da_rainha: 'Não existe pecado do lado de baixo do Equador',
    academicos_do_engenho_da_rainha: 'Não existe pecado do lado de baixo do Equador',
    unidos_de_lucas: 'Essa gente brasileira',
    lucas: 'Essa gente brasileira',
    jacarezinho: 'Do batuque à apoteose, o samba pede passagem',
    unidos_do_jacarezinho: 'Do batuque à apoteose, o samba pede passagem',
    unidos_de_bangu: 'É hoje só, amanhã não tem mais',
    bangu: 'É hoje só, amanhã não tem mais',
    arrastao_de_cascadura: 'Depois do mal feito, chorar não é proveito',
    arrastao: 'Depois do mal feito, chorar não é proveito',
    lins_imperial: 'Feliz por um dia',
    lins: 'Feliz por um dia',
    unidos_padre_miguel: 'Folia, amor e fantasia',
    padre_miguel: 'Folia, amor e fantasia',
    upm: 'Folia, amor e fantasia'
  },
  1984: {
    // Grupo Especial 1984
    portela: 'Contos de Areia',
    mangueira: 'Yes, Nós Temos Braguinha',
    estacao_primeira_de_mangueira: 'Yes, Nós Temos Braguinha',
    imperio_serrano: 'Foi Malandro, É',
    mocidade: 'Mamãe eu Quero Manaus',
    mocidade_independente: 'Mamãe eu Quero Manaus',
    mocidade_independente_de_padre_miguel: 'Mamãe eu Quero Manaus',
    caprichosos_de_pilares: 'A Visita da Nobreza do Riso a Chico Rei, num Palco nem Sempre Iluminado',
    caprichosos: 'A Visita da Nobreza do Riso a Chico Rei, num Palco nem Sempre Iluminado',
    beija_flor: 'O Gigante em Berço Esplêndido',
    beija_flor_de_nilopolis: 'O Gigante em Berço Esplêndido',
    salgueiro: 'Skindô, Skindô',
    academicos_do_salgueiro: 'Skindô, Skindô',
    imperatriz: 'Alô Mamãe',
    imperatriz_leopoldinense: 'Alô Mamãe',
    uniao_da_ilha: 'Quem Pode, Pode, quem não Pode...',
    uniao_da_ilha_do_governador: 'Quem Pode, Pode, quem não Pode...',
    ilha: 'Quem Pode, Pode, quem não Pode...',
    vila_isabel: 'Pra Tudo se Acabar na Quarta-Feira',
    unidos_de_vila_isabel: 'Pra Tudo se Acabar na Quarta-Feira',
    imperio_da_tijuca: '9215',
    estacio_de_sa: 'Quem é Você?',
    estacio: 'Quem é Você?',
    tijuca: 'Salamaleikum, a Epopéia dos Insubmissos Malês',
    unidos_da_tijuca: 'Salamaleikum, a Epopéia dos Insubmissos Malês',
    unidos_da_ponte: 'Oferendas',
    ponte: 'Oferendas',

    // Série Ouro 1984
    cabucu: 'Beth Carvalho, a enamorada do samba',
    unidos_do_cabucu: 'Beth Carvalho, a enamorada do samba',
    santa_cruz: 'Acima da Coroa de um Rei, só um Deus',
    academicos_de_santa_cruz: 'Acima da Coroa de um Rei, só um Deus',
    em_cima_da_hora: '33, Destino D. Pedro II',
    sao_clemente: 'Não Corra, não Mate, não Morra - O Diabo está Solto no Asfalto',
    engenho_da_rainha: 'O Tucá Juê',
    academicos_do_engenho_da_rainha: 'O Tucá Juê',
    unidos_de_bangu: 'Atrás do Trio Elétrico',
    bangu: 'Atrás do Trio Elétrico',
    arrastao_de_cascadura: 'O Conto Lendário de Marabá',
    arrastao: 'O Conto Lendário de Marabá',
    unidos_de_lucas: 'Dança Brasil',
    lucas: 'Dança Brasil',
    lins_imperial: 'Só Vale Quem tem Dinheiro',
    lins: 'Só Vale Quem tem Dinheiro',
    jacarezinho: 'Ziguezagueando no Zum Zum da Fantasia',
    unidos_do_jacarezinho: 'Ziguezagueando no Zum Zum da Fantasia',
    tuiuti: '1984 - um Ano de Otimismo',
    paraiso_do_tuiuti: '1984 - um Ano de Otimismo',
    imperio_do_maranga: 'Águas Lendárias',
    maranga: 'Águas Lendárias'
  },
  1983: {
    // Grupo Especial 1983
    beija_flor: 'A Grande Constelação das Estrelas Negras',
    beija_flor_de_nilopolis: 'A Grande Constelação das Estrelas Negras',
    portela: 'A Ressurreição das Coroas - Reisado, Reino e Reinado',
    imperio_serrano: 'Mãe Baiana Mãe',
    imperatriz: 'O Rei da Costa do Marfim Visita Chica da Silva em Diamantina',
    imperatriz_leopoldinense: 'O Rei da Costa do Marfim Visita Chica da Silva em Diamantina',
    mangueira: 'Verde que Te Quero Rosa, Semente Viva do Samba',
    estacao_primeira_de_mangueira: 'Verde que Te Quero Rosa, Semente Viva do Samba',
    mocidade: 'Como Era Verde Meu Xingu',
    mocidade_independente: 'Como Era Verde Meu Xingu',
    mocidade_independente_de_padre_miguel: 'Como Era Verde Meu Xingu',
    uniao_da_ilha: 'Toma Lá, Dá Cá',
    uniao_da_ilha_do_governador: 'Toma Lá, Dá Cá',
    ilha: 'Toma Lá, Dá Cá',
    salgueiro: 'Traços e Troças',
    academicos_do_salgueiro: 'Traços e Troças',
    vila_isabel: 'Os Imortais',
    unidos_de_vila_isabel: 'Os Imortais',
    tijuca: 'Brasil: Devagar com o Andor que o Santo É de Barro',
    unidos_da_tijuca: 'Brasil: Devagar com o Andor que o Santo É de Barro',
    unidos_da_ponte: 'E Eles Verão a Deus',
    ponte: 'E Eles Verão a Deus',
    caprichosos_de_pilares: 'Um Cardápio à Brasileira',
    caprichosos: 'Um Cardápio à Brasileira',

    // Série Ouro 1983
    estacio_de_sa: 'Orfeu do Carnaval',
    estacio: 'Orfeu do Carnaval',
    sao_carlos: 'Orfeu do Carnaval',
    unidos_de_sao_carlos: 'Orfeu do Carnaval',
    imperio_da_tijuca: 'Santos e Pecadores',
    santa_cruz: 'Uma Andorinha Só não Faz Verão',
    academicos_de_santa_cruz: 'Uma Andorinha Só não Faz Verão',
    cabucu: 'A Visita de Ony de Ifé ao Obá de Oió',
    unidos_do_cabucu: 'A Visita de Ony de Ifé ao Obá de Oió',
    unidos_de_bangu: 'Obrigado, Brasil',
    bangu: 'Obrigado, Brasil',
    unidos_de_lucas: 'Senta que o Leão É Manso',
    lucas: 'Senta que o Leão É Manso',
    lins_imperial: 'O Dragão da Maldade Contra o Santo Guerreiro',
    lins: 'O Dragão da Maldade Contra o Santo Guerreiro',
    tuiuti: 'Vamos Falar de Amor',
    paraiso_do_tuiuti: 'Vamos Falar de Amor',
    jacarezinho: 'Quente como Inferno, Negro como Noite, Doce como Amor',
    unidos_do_jacarezinho: 'Quente como Inferno, Negro como Noite, Doce como Amor',
    em_cima_da_hora: 'Enredo sem Enredo',
    arrastao_de_cascadura: 'Barravilhosa',
    arrastao: 'Barravilhosa',
    imperio_do_maranga: 'A Coroa do Rei não É de Ouro, nem de Prata',
    maranga: 'A Coroa do Rei não É de Ouro, nem de Prata'
  },
  1982: {
    // Grupo Especial 1982
    imperio_serrano: 'Bum-bum paticumbum prugurundum',
    portela: 'Meu Brasil brasileiro',
    imperatriz: 'Onde canta o sabiá',
    imperatriz_leopoldinense: 'Onde canta o sabiá',
    mangueira: 'As mil e uma noites cariocas',
    estacao_primeira_de_mangueira: 'As mil e uma noites cariocas',
    uniao_da_ilha: 'É hoje',
    uniao_da_ilha_do_governador: 'É hoje',
    ilha: 'É hoje',
    beija_flor: 'O olho azul da serpente',
    beija_flor_de_nilopolis: 'O olho azul da serpente',
    mocidade: 'O velho Chico',
    mocidade_independente: 'O velho Chico',
    mocidade_independente_de_padre_miguel: 'O velho Chico',
    salgueiro: 'No reino do faz de conta',
    academicos_do_salgueiro: 'No reino do faz de conta',
    tijuca: 'Lima Barreto, mulato, pobre, mas livre',
    unidos_da_tijuca: 'Lima Barreto, mulato, pobre, mas livre',
    vila_isabel: 'Noel Rosa e os poetas da Vila nas batalhas do Boulevard',
    unidos_de_vila_isabel: 'Noel Rosa e os poetas da Vila nas batalhas do Boulevard',
    imperio_da_tijuca: 'Iara, ouro e pinhão na terra da gralha azul',
    estacio_de_sa: 'Onde há rede há renda',
    estacio: 'Onde há rede há renda',
    sao_carlos: 'Onde há rede há renda',
    unidos_de_sao_carlos: 'Onde há rede há renda',

    // Série Ouro 1982
    caprichosos_de_pilares: 'Moça bonita não paga',
    caprichosos: 'Moça bonita não paga',
    unidos_da_ponte: 'O casamento de Dona Baratinha',
    ponte: 'O casamento de Dona Baratinha',
    santa_cruz: 'Braguinha, carnaval de sonho',
    academicos_de_santa_cruz: 'Braguinha, carnaval de sonho',
    em_cima_da_hora: 'Popô, papá, bubu, babá',
    unidos_de_lucas: 'Lua viajante',
    lucas: 'Lua viajante',
    arrastao_de_cascadura: 'Brasil verde e amarelo',
    arrastao: 'Brasil verde e amarelo',
    lins_imperial: 'Clementina, uma rainha negra',
    lins: 'Clementina, uma rainha negra',
    cabucu: 'A lenda do dragão dourado',
    unidos_do_cabucu: 'A lenda do dragão dourado',
    imperio_do_maranga: 'Lágrimas',
    maranga: 'Lágrimas',
    unidos_de_bangu: 'Você sabe como é',
    bangu: 'Você sabe como é',
    arranco: 'Como vencer na vida sem fazer força',
    arranco_do_engenho_de_dentro: 'Como vencer na vida sem fazer força',
    uniao_de_jacarepagua: 'Gosto que me enrosco',
    jacarepagua: 'Gosto que me enrosco'
  },
  1981: {
    // Grupo Especial 1981
    imperatriz: 'O Teu Cabelo Não Nega',
    imperatriz_leopoldinense: 'O Teu Cabelo Não Nega',
    beija_flor: 'Carnaval do Brasil, a Oitava das Sete Maravilhas do Mundo',
    beija_flor_de_nilopolis: 'Carnaval do Brasil, a Oitava das Sete Maravilhas do Mundo',
    portela: 'Das Maravilhas do Mar, Fez-se o Esplendor de Uma Noite',
    mangueira: 'De Nonô a JK',
    estacao_primeira_de_mangueira: 'De Nonô a JK',
    salgueiro: 'Rio de Janeiro',
    academicos_do_salgueiro: 'Rio de Janeiro',
    mocidade: 'Abram Alas para a Folia, aí Vem a Mocidade',
    mocidade_independente: 'Abram Alas para a Folia, aí Vem a Mocidade',
    mocidade_independente_de_padre_miguel: 'Abram Alas para a Folia, aí Vem a Mocidade',
    uniao_da_ilha: '1910, Burro na Cabeça',
    uniao_da_ilha_do_governador: '1910, Burro na Cabeça',
    ilha: '1910, Burro na Cabeça',
    tijuca: 'Macobeba - O que Dá pra Rir, Dá pra Chorar',
    unidos_da_tijuca: 'Macobeba - O que Dá pra Rir, Dá pra Chorar',
    vila_isabel: 'Dos Jardins do Éden à Era de Aquárius',
    unidos_de_vila_isabel: 'Dos Jardins do Éden à Era de Aquárius',
    imperio_serrano: 'Na Terra do Pau-brasil, nem Tudo Caminha Viu',

    // Série Ouro 1981
    estacio_de_sa: 'Quem Diria, da Monarquia à Boemia ao Esplendor da Praça Tiradentes',
    estacio: 'Quem Diria, da Monarquia à Boemia ao Esplendor da Praça Tiradentes',
    sao_carlos: 'Quem Diria, da Monarquia à Boemia ao Esplendor da Praça Tiradentes',
    unidos_de_sao_carlos: 'Quem Diria, da Monarquia à Boemia ao Esplendor da Praça Tiradentes',
    imperio_da_tijuca: 'Cataratas do Iguaçu',
    unidos_de_lucas: 'O Imperador de Parada de Lucas',
    lucas: 'O Imperador de Parada de Lucas',
    lins_imperial: 'Meu Padim Pade Ciço',
    lins: 'Meu Padim Pade Ciço',
    cabucu: 'De Daomé a São Luis, a Pureza Mina Jêje',
    unidos_do_cabucu: 'De Daomé a São Luis, a Pureza Mina Jêje',
    santa_cruz: 'Amazonas, Verde que Te Quero Verde',
    academicos_de_santa_cruz: 'Amazonas, Verde que Te Quero Verde',
    unidos_de_bangu: 'É Hoje, a História do Carnaval',
    bangu: 'É Hoje, a História do Carnaval',
    arranco: 'Ou Isto ou Aquilo',
    arranco_do_engenho_de_dentro: 'Ou Isto ou Aquilo',
    arrastao_de_cascadura: 'Rudá, o Deus do Amor',
    arrastao: 'Rudá, o Deus do Amor',
    imperio_do_maranga: 'Dos Balões aos Aviões',
    maranga: 'Dos Balões aos Aviões',
    uniao_de_jacarepagua: 'Mauricéia em Noite de Festa',
    jacarepagua: 'Mauricéia em Noite de Festa',
    caprichosos_de_pilares: 'Amor, Sublime Amor',
    caprichosos: 'Amor, Sublime Amor'
  },
  1980: {
    // Grupo Especial 1980
    beija_flor: 'O Sol da Meia-Noite, uma Viagem ao País das Maravilhas',
    beija_flor_de_nilopolis: 'O Sol da Meia-Noite, uma Viagem ao País das Maravilhas',
    imperatriz: 'O Que é Que a Bahia Tem',
    imperatriz_leopoldinense: 'O Que é Que a Bahia Tem',
    portela: 'Hoje tem Marmelada',
    mocidade: 'Tropicália Maravilha',
    mocidade_independente: 'Tropicália Maravilha',
    mocidade_independente_de_padre_miguel: 'Tropicália Maravilha',
    uniao_da_ilha: 'Bom, Bonito e Barato',
    uniao_da_ilha_do_governador: 'Bom, Bonito e Barato',
    ilha: 'Bom, Bonito e Barato',
    vila_isabel: 'Sonho de um Sonho',
    unidos_de_vila_isabel: 'Sonho de um Sonho',
    salgueiro: 'O Bailar dos Ventos, Relampejou, Mas não Choveu',
    academicos_do_salgueiro: 'O Bailar dos Ventos, Relampejou, Mas não Choveu',
    mangueira: 'Coisas Nossas',
    estacao_primeira_de_mangueira: 'Coisas Nossas',
    imperio_serrano: 'Império das Ilusões - Atlântida, Eldorado, Sonho e Aventura',
    estacio_de_sa: 'Deixa Falar',
    estacio: 'Deixa Falar',
    sao_carlos: 'Deixa Falar',
    unidos_de_sao_carlos: 'Deixa Falar',

    // Série Ouro 1980
    tijuca: 'Delmiro Gouveia',
    unidos_da_tijuca: 'Delmiro Gouveia',
    arranco: 'O Guarani - José de Alencar',
    arranco_do_engenho_de_dentro: 'O Guarani - José de Alencar',
    lins_imperial: 'Guarda Velha, Velha Guarda',
    lins: 'Guarda Velha, Velha Guarda',
    imperio_da_tijuca: 'De Sacristão a Barão de Ouro',
    arrastao_de_cascadura: 'Mambembes e Mamulengos',
    arrastao: 'Mambembes e Mamulengos',
    caprichosos_de_pilares: 'É a Maior - Emilinha Borba',
    caprichosos: 'É a Maior - Emilinha Borba',
    unidos_de_bangu: 'A Lenda de Juparanã, a Lagoa Encantada',
    bangu: 'A Lenda de Juparanã, a Lagoa Encantada',
    cabucu: 'Tua obra não nega, Lalá',
    unidos_do_cabucu: 'Tua obra não nega, Lalá',
    imperio_do_maranga: 'Brasil, Terra do Amor',
    maranga: 'Brasil, Terra do Amor',
    unidos_de_lucas: 'França, bumba e assombrações no Maranhão',
    lucas: 'França, bumba e assombrações no Maranhão',
    sao_clemente: 'A Doce Ilusão do Sambista',
    unidos_da_ponte: 'Maravilhosa Marajó',
    ponte: 'Maravilhosa Marajó'
  },
  1979: {
    // Grupo Especial 1979
    mocidade: 'O descobrimento do Brasil',
    mocidade_independente: 'O descobrimento do Brasil',
    mocidade_independente_de_padre_miguel: 'O descobrimento do Brasil',
    beija_flor: 'O paraíso da loucura',
    beija_flor_de_nilopolis: 'O paraíso da loucura',
    portela: 'Incrível, fantástico, extraordinário',
    mangueira: 'Avatar e a Selva Transformou-se em Ouro',
    estacao_primeira_de_mangueira: 'Avatar e a Selva Transformou-se em Ouro',
    uniao_da_ilha: 'O Que Será ?',
    uniao_da_ilha_do_governador: 'O Que Será ?',
    ilha: 'O Que Será ?',
    salgueiro: 'O reino encantado da mãe natureza contra o reino do mal',
    academicos_do_salgueiro: 'O reino encantado da mãe natureza contra o reino do mal',
    imperatriz: 'Oxumaré, a lenda do arco-íris',
    imperatriz_leopoldinense: 'Oxumaré, a lenda do arco-íris',
    estacio_de_sa: 'Das trevas ao sol, uma odisséia dos Karajás',
    estacio: 'Das trevas ao sol, uma odisséia dos Karajás',
    sao_carlos: 'Das trevas ao sol, uma odisséia dos Karajás',
    unidos_de_sao_carlos: 'Das trevas ao sol, uma odisséia dos Karajás',

    // Série Ouro 1979
    vila_isabel: 'Os Dourados Anos de Carlos Machado',
    unidos_de_vila_isabel: 'Os Dourados Anos de Carlos Machado',
    imperio_serrano: 'Municipal maravilhoso, 70 anos de glória',
    arrastao_de_cascadura: 'Da Lapinha ao coreto, um folguedo popular',
    arrastao: 'Da Lapinha ao coreto, um folguedo popular',
    arranco: 'Quem conta um conto aumenta um ponto',
    arranco_do_engenho_de_dentro: 'Quem conta um conto aumenta um ponto',
    unidos_de_lucas: 'O Rio de Janeiro em Tempo de Debret',
    lucas: 'O Rio de Janeiro em Tempo de Debret',
    caprichosos_de_pilares: 'Uruçumirim, paraíso tupinambá',
    caprichosos: 'Uruçumirim, paraíso tupinambá',
    cabucu: 'Gigante negro da Abolição à República',
    unidos_do_cabucu: 'Gigante negro da Abolição à República',
    unidos_da_ponte: 'Sonho da vovó',
    ponte: 'Sonho da vovó'
  },
  1978: {
    // Grupo Especial 1978
    beija_flor: 'A Criação do Mundo na Tradição Nagô',
    beija_flor_de_nilopolis: 'A Criação do Mundo na Tradição Nagô',
    mangueira: 'Dos Carroceiros do Imperador ao Palácio do Samba',
    estacao_primeira_de_mangueira: 'Dos Carroceiros do Imperador ao Palácio do Samba',
    mocidade: 'Brasiliana',
    mocidade_independente: 'Brasiliana',
    mocidade_independente_de_padre_miguel: 'Brasiliana',
    uniao_da_ilha: 'O Amanhã',
    uniao_da_ilha_do_governador: 'O Amanhã',
    ilha: 'O Amanhã',
    portela: 'Mulher à Brasileira',
    salgueiro: 'Do Yorubá à Luz, a Aurora dos Deuses',
    academicos_do_salgueiro: 'Do Yorubá à Luz, a Aurora dos Deuses',
    imperio_serrano: 'Oscarito, Carnaval e Samba, Uma Chanchada no Asfalto',
    vila_isabel: 'Dique, Um Mar de Amor',
    unidos_de_vila_isabel: 'Dique, Um Mar de Amor',
    arrastao_cascadura: 'Talaque, Talaque, o Romance da Maria-Fumaça',
    arrastao_de_cascadura: 'Talaque, Talaque, o Romance da Maria-Fumaça',
    arrastao: 'Talaque, Talaque, o Romance da Maria-Fumaça',
    arranco: 'Sonho Infantil',
    arranco_do_engenho_de_dentro: 'Sonho Infantil',

    // Série Ouro 1978
    estacio_de_sa: 'Céu de Orestes no chão de estrelas',
    estacio: 'Céu de Orestes no chão de estrelas',
    sao_carlos: 'Céu de Orestes no chão de estrelas',
    unidos_de_sao_carlos: 'Céu de Orestes no chão de estrelas',
    imperatriz: 'Vamos Brincar de ser Criança',
    imperatriz_leopoldinense: 'Vamos Brincar de ser Criança',
    cabucu: 'Exaltação às pedras preciosas do Brasil',
    unidos_do_cabucu: 'Exaltação às pedras preciosas do Brasil',
    unidos_de_lucas: 'Preta, Preta, Pretinha',
    lucas: 'Preta, Preta, Pretinha',
    unidos_da_ponte: 'Festa de Olubajé',
    ponte: 'Festa de Olubajé',
    caprichosos_de_pilares: 'Festa da Uva no Rio Grande do Sul',
    caprichosos: 'Festa da Uva no Rio Grande do Sul',
    imperio_do_maranga: 'Salamanca do Jarau',
    maranga: 'Salamanca do Jarau',
    lins_imperial: 'Viagem Encantada do Tio Benjamim do Vale da Esperança',
    lins: 'Viagem Encantada do Tio Benjamim do Vale da Esperança',
    sao_clemente: 'Apoteose ao Teatro de Revista',
    jacarezinho: 'Todas as Rosas do meu Rio',
    unidos_do_jacarezinho: 'Todas as Rosas do meu Rio',
    imperio_da_tijuca: 'Calendário do Rio',
    uniao_de_jacarepagua: 'Cor, Ação e Samba',
    jacarepagua: 'Cor, Ação e Samba',
    tupy_bras_de_pina: 'Manôa, um sonho dourado',
    tupy_de_bras_de_pina: 'Manôa, um sonho dourado',
    tupy: 'Manôa, um sonho dourado',
    engenho_da_rainha: 'Criação do Mundo, Segundo os Carajás',
    academicos_do_engenho_da_rainha: 'Criação do Mundo, Segundo os Carajás',
    tijuca: 'A Praça dos Sonhos, Amor, Alegria e Fantasia',
    unidos_da_tijuca: 'A Praça dos Sonhos, Amor, Alegria e Fantasia',
    santa_cruz: 'O Mestre da Musicologia Nacional',
    academicos_de_santa_cruz: 'O Mestre da Musicologia Nacional'
  },
  1977: {
    // Grupo Especial 1977
    beija_flor: 'Vovó e o rei da saturnália na corte egipciana',
    beija_flor_de_nilopolis: 'Vovó e o rei da saturnália na corte egipciana',
    portela: 'Festa da aclamação',
    uniao_da_ilha: 'Domingo',
    uniao_da_ilha_do_governador: 'Domingo',
    ilha: 'Domingo',
    salgueiro: 'Do cauim ao efó, com moça branca, branquinha',
    academicos_do_salgueiro: 'Do cauim ao efó, com moça branca, branquinha',
    vila_isabel: 'Ai que saudades que eu tenho',
    unidos_de_vila_isabel: 'Ai que saudades que eu tenho',
    imperio_serrano: 'Brasil, berço dos imigrantes',
    mangueira: 'Parapanã, o segredo do amor',
    estacao_primeira_de_mangueira: 'Parapanã, o segredo do amor',
    mocidade: 'Samba marca registrada',
    mocidade_independente: 'Samba marca registrada',
    mocidade_independente_de_padre_miguel: 'Samba marca registrada',
    imperatriz: 'Viagens fantásticas às terras de Ibirapitanga',
    imperatriz_leopoldinense: 'Viagens fantásticas às terras de Ibirapitanga',
    estacio_de_sa: 'Alô, alô, Brasil, 40 anos de Rádio Nacional',
    estacio: 'Alô, alô, Brasil, 40 anos de Rádio Nacional',
    sao_carlos: 'Alô, alô, Brasil, 40 anos de Rádio Nacional',
    unidos_de_sao_carlos: 'Alô, alô, Brasil, 40 anos de Rádio Nacional',
    imperio_da_tijuca: 'O mundo de barro de Mestre Vitalino',
    cabucu: 'Os sete povos das missões',
    unidos_do_cabucu: 'Os sete povos das missões',

    // Série Ouro 1977
    arrastao_cascadura: 'Um talismã para Iaiá',
    arrastao_de_cascadura: 'Um talismã para Iaiá',
    arrastao: 'Um talismã para Iaiá',
    arranco: 'Logum, o príncipe de Efan',
    arranco_do_engenho_de_dentro: 'Logum, o príncipe de Efan',
    lins_imperial: 'Cruz credo, eta diabo',
    lins: 'Cruz credo, eta diabo',
    unidos_de_lucas: 'Insurreição do Queimado',
    lucas: 'Insurreição do Queimado',
    uniao_de_jacarepagua: 'Banzo',
    jacarepagua: 'Banzo',
    imperio_do_maranga: 'Lenda do Arco-Íris',
    maranga: 'Lenda do Arco-Íris',
    tupy_bras_de_pina: 'Um sonho colorido',
    tupy_de_bras_de_pina: 'Um sonho colorido',
    tupy: 'Um sonho colorido',
    jacarezinho: 'A glória dos quilombos ou Congoleses, sudaneses, angoleses, bantus e os ciclos da mineração, açúcar e café',
    unidos_do_jacarezinho: 'A glória dos quilombos ou Congoleses, sudaneses, angoleses, bantus e os ciclos da mineração, açúcar e café',
    tijuca: 'Paraíso dos Sonhos',
    unidos_da_tijuca: 'Paraíso dos Sonhos',
    sao_clemente: 'Acredite se quiser',
    em_cima_da_hora: 'Heitor dos Prazeres, um artista carioca',
    folioes_de_botafogo: 'O cortiço',
    folioes: 'O cortiço',
    unidos_de_nilopolis: 'Império negro, um sonho de liberdade',
    nilopolis: 'Império negro, um sonho de liberdade',
    independentes_cordovil: 'Manjares do céu e da terra',
    independentes_de_cordovil: 'Manjares do céu e da terra',
    cordovil: 'Manjares do céu e da terra',
    grande_rio_duque_de_caxias: 'Os precursores',
    grande_rio_antiga: 'Os precursores',
    gres_grande_rio_antiga: 'Os precursores',
    gres_grande_rio: 'Os precursores',
    mocidade_unida_da_cidade_de_deus: 'Baronesa da Taquara',
    cidade_de_deus: 'Baronesa da Taquara',
    tuiuti: 'Brasil caboclo',
    paraiso_do_tuiuti: 'Brasil caboclo',
    unidos_de_manguinhos: 'O tesouro maldito',
    manguinhos: 'O tesouro maldito'
  },
  1976: {
    // Grupo Especial 1976
    beija_flor: 'Sonhar com rei dá leão',
    mangueira: 'No reino da Mãe do Ouro',
    mocidade: 'Mãe menininha do Gantois',
    portela: 'O Homem do Pacoval',
    salgueiro: 'Valongo',
    vila_isabel: 'Invenção de Orfeu',
    imperio_serrano: 'A lenda das sereias, rainhas do mar',
    imperatriz: 'Por mares nunca dantes navegados',
    uniao_da_ilha: 'Poemas de máscaras e sonhos',
    estacio_de_sa: 'Arte negra na legendária Bahia',
    sao_carlos: 'Arte negra na legendária Bahia',
    lins_imperial: 'Folia de reis',
    lins: 'Folia de reis',
    unidos_de_lucas: 'Mar baiano em noite de gala',
    lucas: 'Mar baiano em noite de gala',
    em_cima_da_hora: 'Os sertões',
    tupy_bras_de_pina: 'Riquezas áureas de nossa bandeira',
    tupy: 'Riquezas áureas de nossa bandeira',

    // Série Ouro (Grupo 2) 1976
    imperio_da_tijuca: 'Guerreiro das Alagoas',
    cabucu: 'Reisado da terra das Alagoas',
    unidos_do_cabucu: 'Reisado da terra das Alagoas',
    uniao_de_jacarepagua: 'Acalanto para Uiara',
    jacarepagua: 'Acalanto para Uiara',
    tijuca: 'No mundo encantado dos deuses afro-brasileiros',
    unidos_da_tijuca: 'No mundo encantado dos deuses afro-brasileiros',
    arranco: 'Piaburú, o caminho da montanha do sol',
    arranco_do_engenho_de_dentro: 'Piaburú, o caminho da montanha do sol',
    imperio_do_maranga: 'Glórias do Teatro Municipal',
    maranga: 'Glórias do Teatro Municipal',
    jacarezinho: 'Canudos, sua história, sua gente',
    unidos_do_jacarezinho: 'Canudos, sua história, sua gente',
    tuiuti: 'Cobra Norato',
    paraiso_do_tuiuti: 'Cobra Norato',
    unidos_de_nilopolis: 'Maranhão em tempo de bumba-meu-boi',
    nilopolis: 'Maranhão em tempo de bumba-meu-boi',
    sao_clemente: 'Recife, nosso amor distante',
    independentes_cordovil: 'Recordar é viver, o passado manda lembrança',
    independentes_de_cordovil: 'Recordar é viver, o passado manda lembrança',
    cordovil: 'Recordar é viver, o passado manda lembrança',
    folioes_de_botafogo: 'Festa do Bonfim',
    folioes: 'Festa do Bonfim',
    caprichosos_de_pilares: 'Sonho de pierrot',
    caprichosos: 'Sonho de pierrot',
    independentes_do_zumbi: 'Símbolos e cenários do carnaval carioca',
    zumbi: 'Símbolos e cenários do carnaval carioca',
    engenho_da_rainha: 'Mar em tempo de carnaval',
    academicos_do_engenho_da_rainha: 'Mar em tempo de carnaval',
    unidos_de_bangu: 'Festas e tradições de nossa gente',
    bangu: 'Festas e tradições de nossa gente',
    santa_cruz: 'Brasília, sonho imperial, realidade nacional',
    academicos_de_santa_cruz: 'Brasília, sonho imperial, realidade nacional',
    unidos_padre_miguel: 'Ajuricaba, um herói amazonense',
    padre_miguel: 'Ajuricaba, um herói amazonense',
    unidos_da_ponte: 'O negro em três tempos',
    ponte: 'O negro em três tempos',
    vila_santa_tereza: 'Ídolos do rádio brasileiro',
    unidos_da_vila_santa_tereza: 'Ídolos do rádio brasileiro'
  },
  1975: {
    // Grupo Especial 1975
    salgueiro: 'O Segredo das Minas do Rei Salomão',
    mangueira: 'Imagens Poéticas de Jorge de Lima',
    imperio_serrano: 'Zaquia Jorge, a Vedete do Subúrbio, Estrela de Madureira',
    mocidade: 'O Mundo Fantástico do Uirapurú',
    portela: 'Macunaíma, Herói de Nossa Gente',
    vila_isabel: 'Quatro Séculos de Paixão - História do Teatro Brasileiro',
    beija_flor: 'O Grande Decênio',
    imperatriz: 'A Morte da Porta-Estandarte',
    uniao_da_ilha: 'Nos Confins de Vila Monte',
    estacio_de_sa: 'A Festa do Círio de Nazaré',
    unidos_de_sao_carlos: 'A Festa do Círio de Nazaré',
    unidos_de_lucas: 'Cidades Feitas de Memórias',
    lucas: 'Cidades Feitas de Memórias',
    em_cima_da_hora: 'Personagens Marcantes dos Carnavais Cariocas',

    // Série Ouro (Grupo 2) 1975
    lins_imperial: 'Dona Flor e seus dois maridos',
    lins: 'Dona Flor e seus dois maridos',
    tupy_bras_de_pina: 'Brasil, Glória e Integração',
    tupi_de_bras_de_pina: 'Brasil, Glória e Integração',
    imperio_da_tijuca: 'Muiraquitã, o amuleto do amor',
    folioes_de_botafogo: 'Glória em pedra-sabão',
    folioes: 'Glória em pedra-sabão',
    sao_clemente: 'Quem Quebrou meu Violão - Tra-Lá-Lá',
    tijuca: 'Magia africana no Brasil e seus mistérios',
    unidos_da_tijuca: 'Magia africana no Brasil e seus mistérios',
    tuiuti: 'Obra e Vida de Cecília Meireles',
    paraiso_do_tuiuti: 'Obra e Vida de Cecília Meireles',
    cabucu: 'Uiara a Deusa da Terra Grande',
    unidos_do_cabucu: 'Uiara a Deusa da Terra Grande',
    santa_cruz: 'Bahia de São Salvador, Tenda dos Milagres',
    academicos_de_santa_cruz: 'Bahia de São Salvador, Tenda dos Milagres',
    caprichosos_de_pilares: 'Congada do Rei David',
    caprichosos: 'Congada do Rei David',
    unidos_de_bangu: 'Emília no país da gramática',
    bangu: 'Emília no país da gramática',
    jacarezinho: 'Catarina Mina',
    unidos_do_jacarezinho: 'Catarina Mina',
    uniao_de_jacarepagua: 'Reais pessoas - chegada de D. João VI',
    unidos_de_jacarepagua: 'Reais pessoas - chegada de D. João VI',
    jacarepagua: 'Reais pessoas - chegada de D. João VI',
    vila_santa_tereza: 'Acaiaca, Esplendor do Tijuco',
    unidos_da_vila_santa_tereza: 'Acaiaca, Esplendor do Tijuco',
    independentes_cordovil: 'O mestiço predestinado',
    independentes_de_cordovil: 'O mestiço predestinado',
    cordovil: 'O mestiço predestinado',
    engenho_da_rainha: 'O Folclore Carioca',
    academicos_do_engenho_da_rainha: 'O Folclore Carioca',
    unidos_padre_miguel: 'Resplendor de um Grande Festival',
    padre_miguel: 'Resplendor de um Grande Festival',
    unidos_da_ponte: 'Eleição e coroação da Boneca do Café',
    ponte: 'Eleição e coroação da Boneca do Café'
  },
  1974: {
    // Grupo Especial 1974
    salgueiro: 'O Rei de França na Ilha da Assombração',
    portela: 'O mundo melhor de Pixinguinha',
    imperio_serrano: 'Dona Santa, rainha do maracatu',
    mangueira: 'Mangueira em tempo de folclore',
    mocidade: 'A Festa do Divino',
    imperatriz: 'Réquiem por um sambista, Silas de Oliveira',
    beija_flor: 'Brasil ano 2000',
    em_cima_da_hora: 'Festa dos deuses afro-brasileiros',
    estacio_de_sa: 'Heroínas dos romances brasileiros',
    unidos_de_sao_carlos: 'Heroínas dos romances brasileiros',
    vila_isabel: 'Aruana-Açu',

    // Série Ouro (Grupo 2) 1974
    uniao_da_ilha: 'Lendas e festas das Yabás',
    ilha: 'Lendas e festas das Yabás',
    unidos_de_lucas: 'Mulata maior',
    lucas: 'Mulata maior',
    imperio_da_tijuca: 'Minas de prata',
    cabucu: 'Devaneios de um poeta',
    unidos_do_cabucu: 'Devaneios de um poeta',
    independentes_cordovil: 'Festas tradicionais da Bahia',
    independentes_de_cordovil: 'Festas tradicionais da Bahia',
    cordovil: 'Festas tradicionais da Bahia',
    lins_imperial: 'Cobra Norato',
    lins: 'Cobra Norato',
    tupy_bras_de_pina: 'Essa nega Fulô',
    tupi_de_bras_de_pina: 'Essa nega Fulô',
    santa_cruz: 'O rouxinol da canção brasileira',
    academicos_de_santa_cruz: 'O rouxinol da canção brasileira',
    uniao_de_jacarepagua: 'Bandeira Branca - Homenagem a Dalva de Oliveira',
    unidos_de_jacarepagua: 'Bandeira Branca - Homenagem a Dalva de Oliveira',
    jacarepagua: 'Bandeira Branca - Homenagem a Dalva de Oliveira',
    jacarezinho: 'Duduca Lunga, a maravilhosa arte negra',
    unidos_do_jacarezinho: 'Duduca Lunga, a maravilhosa arte negra',
    sao_clemente: 'Sonhos fascinantes de um jovem adolescente',
    tuiuti: 'Olimpíadas, festa de um povo',
    paraiso_do_tuiuti: 'Olimpíadas, festa de um povo',
    unidos_da_ponte: 'Rio em festa - tradição e folclore',
    ponte: 'Rio em festa - tradição e folclore',
    unidos_de_bangu: 'Rio, pé de moleque',
    bangu: 'Rio, pé de moleque',
    tijuca: 'Petrópolis, nossa flor serrana',
    unidos_da_tijuca: 'Petrópolis, nossa flor serrana',
    vila_santa_tereza: 'Primavera, estação das flores',
    unidos_da_vila_santa_tereza: 'Primavera, estação das flores'
  },
  1973: {
    // Grupo Especial 1973
    mangueira: 'Lendas do Abaeté',
    imperio_serrano: 'Viagem encantada Pindorama adentro',
    salgueiro: 'Eneida, amor e fantasia',
    portela: 'Pasárgada, o amigo do rei',
    imperatriz: 'ABC do carnaval',
    em_cima_da_hora: 'O saber poético da literatura de cordel',
    mocidade: 'Rio Zé Pereira',
    vila_isabel: 'Zodíaco no samba',
    tupy_bras_de_pina: 'Assim dança o Brasil - Formação das danças brasileiras',
    tupi_de_bras_de_pina: 'Assim dança o Brasil - Formação das danças brasileiras',
    jacarezinho: 'Ameno Resedá',
    unidos_do_jacarezinho: 'Ameno Resedá',

    // Série Ouro (Grupo 2) 1973
    estacio_de_sa: 'Trá, lá, lá, um hino ao carnaval brasileiro de Lamartine Babo',
    unidos_de_sao_carlos: 'Trá, lá, lá, um hino ao carnaval brasileiro de Lamartine Babo',
    sao_carlos: 'Trá, lá, lá, um hino ao carnaval brasileiro de Lamartine Babo',
    beija_flor: 'Educação para o desenvolvimento',
    lins_imperial: 'Bahia de Jorge Amado',
    lins: 'Bahia de Jorge Amado',
    imperio_da_tijuca: 'Brasil, explosão do progresso',
    tuiuti: 'Os imortais da música brasileira',
    paraiso_do_tuiuti: 'Os imortais da música brasileira',
    unidos_de_lucas: 'Estórias que ouvimos na infância',
    lucas: 'Estórias que ouvimos na infância',
    sao_clemente: 'Momentos inesquecíveis de Tapoagipe',
    tijuca: 'Bom dia, café!',
    unidos_da_tijuca: 'Bom dia, café!',
    uniao_da_ilha: 'Y-Juca Pirama',
    ilha: 'Y-Juca Pirama',
    independentes_cordovil: 'Festival do cinema brasileiro',
    independentes_de_cordovil: 'Festival do cinema brasileiro',
    cordovil: 'Festival do cinema brasileiro',
    unidos_da_ponte: 'Samba, dança para os orixás',
    ponte: 'Samba, dança para os orixás',
    uniao_de_jacarepagua: 'As sete portas da Bahia de Carybé',
    unidos_de_jacarepagua: 'As sete portas da Bahia de Carybé',
    jacarepagua: 'As sete portas da Bahia de Carybé',
    caprichosos_de_pilares: 'Aclamação e coroação de D. Pedro I',
    caprichosos: 'Aclamação e coroação de D. Pedro I',
    imperio_do_maranga: 'Os Imortais da Música - Aquarela do Brasil',
    maranga: 'Os Imortais da Música - Aquarela do Brasil',
    imperio_de_campo_grande: 'Casa grande e senzala',
    campo_grande: 'Casa grande e senzala',
    unidos_padre_miguel: 'Cazuza',
    padre_miguel: 'Cazuza',
    upm: 'Cazuza'
  },
  1972: {
    // Grupo Especial 1972
    imperio_serrano: 'Alô, alô, taí Carmem Miranda',
    mangueira: 'Carnaval dos carnavais',
    portela: 'Ilu Ayê, a terra da vida',
    imperatriz: 'Martim Cererê',
    salgueiro: 'Nossa madrinha, Mangueira querida',
    vila_isabel: 'Onde o Brasil aprendeu a liberdade',
    mocidade: 'Rainha mestiça em tempo de lundu',
    em_cima_da_hora: 'Bahia, berço do Brasil',
    estacio_de_sa: 'O Rio Grande do Sul na festa do Preto Forro',
    unidos_de_sao_carlos: 'O Rio Grande do Sul na festa do Preto Forro',
    sao_carlos: 'O Rio Grande do Sul na festa do Preto Forro',
    imperio_da_tijuca: 'O samba do morro à sociedade',
    unidos_de_lucas: 'Brasil das 200 milhas',
    lucas: 'Brasil das 200 milhas',
    unidos_padre_miguel: 'Madureira, seu samba, sua história',
    padre_miguel: 'Madureira, seu samba, sua história',
    upm: 'Madureira, seu samba, sua história',

    // Série Ouro (Grupo 2) 1972
    tupy_bras_de_pina: 'Chiquinha Gonzaga, alma cantante do Brasil',
    tupi_de_bras_de_pina: 'Chiquinha Gonzaga, alma cantante do Brasil',
    tupy: 'Chiquinha Gonzaga, alma cantante do Brasil',
    jacarezinho: 'Banzo Ayê',
    unidos_do_jacarezinho: 'Banzo Ayê',
    tuiuti: 'Sempre Brasil (Brasil de ponta a ponta)',
    paraiso_do_tuiuti: 'Sempre Brasil (Brasil de ponta a ponta)',
    lins_imperial: 'Salve, salve Independência',
    lins: 'Salve, salve Independência',
    sao_clemente: 'Dança de um Povo Livre',
    beija_flor: 'Bahia dos meus amores',
    uniao_de_jacarepagua: 'A Festa da Independência',
    unidos_de_jacarepagua: 'A Festa da Independência',
    jacarepagua: 'A Festa da Independência',
    uniao_da_ilha: 'A Festa da Cavalhada',
    ilha: 'A Festa da Cavalhada',
    independentes_cordovil: 'Datas, personagens e fatos históricos',
    independentes_de_cordovil: 'Datas, personagens e fatos históricos',
    cordovil: 'Datas, personagens e fatos históricos',
    tijuca: 'Ganga Zumba',
    unidos_da_tijuca: 'Ganga Zumba',
    caprichosos_de_pilares: 'Brasil, a flor que desabrocha',
    caprichosos: 'Brasil, a flor que desabrocha',
    santa_cruz: 'Brasil folclórico',
    academicos_de_santa_cruz: 'Brasil folclórico',
    unidos_de_manguinhos: 'Zumbi dos Palmares',
    manguinhos: 'Zumbi dos Palmares',
    grande_rio_duque_de_caxias: 'A outra força do Brasil',
    grande_rio_antiga: 'A outra força do Brasil',
    gres_grande_rio_antiga: 'A outra força do Brasil',
    gres_grande_rio: 'A outra força do Brasil',
    cabucu: 'Laços de amizade',
    unidos_do_cabucu: 'Laços de amizade',
    vila_santa_tereza: 'Heróis da Liberdade',
    unidos_da_vila_santa_tereza: 'Heróis da Liberdade',
    unidos_de_bangu: 'Um dos motivos da Independência do Brasil',
    bangu: 'Um dos motivos da Independência do Brasil'
  },
  1971: {
    // Grupo Especial 1971
    salgueiro: 'Festa para um Rei Negro',
    portela: 'Lapa em Três Tempos',
    imperio_serrano: 'Nordeste, Seu Povo, Seu Canto, Sua Gente',
    mangueira: 'Os Modernos Bandeirantes',
    vila_isabel: 'Ouro Mascavo',
    estacio_de_sa: 'Brasil Turístico',
    unidos_de_sao_carlos: 'Brasil Turístico',
    sao_carlos: 'Brasil Turístico',
    imperatriz: 'Barra de Ouro, Barra de Rio, Barra de Saia',
    imperio_da_tijuca: 'O Misticismo da África ao Brasil',
    mocidade: 'Rapsódia de Saudade',
    unidos_padre_miguel: 'Samba do Crioulo Doido',
    padre_miguel: 'Samba do Crioulo Doido',
    upm: 'Samba do Crioulo Doido',

    // Série Ouro (Grupo 2) 1971
    em_cima_da_hora: 'Este Rio que Eu Amo',
    unidos_de_lucas: 'Tributo às Raízes, Pixinguinha, Donga e João da Baiana',
    lucas: 'Tributo às Raízes, Pixinguinha, Donga e João da Baiana',
    lins_imperial: 'Casa-Grande e Senzala',
    lins: 'Casa-Grande e Senzala',
    tupy_bras_de_pina: 'São Francisco a Caminho do Sertão',
    tupi_de_bras_de_pina: 'São Francisco a Caminho do Sertão',
    tupy: 'São Francisco a Caminho do Sertão',
    sao_clemente: 'O Beijo de Três Saudades',
    tuiuti: 'Rio, Carnaval e Batucada',
    paraiso_do_tuiuti: 'Rio, Carnaval e Batucada',
    beija_flor: 'Carnaval, Sublime Ilusão',
    jacarezinho: 'Bahia de Ontem, de Hoje e de Sempre',
    unidos_do_jacarezinho: 'Bahia de Ontem, de Hoje e de Sempre',
    santa_cruz: 'Três Fases da Poesia',
    academicos_de_santa_cruz: 'Três Fases da Poesia',
    tijuca: 'Quiva e Iaiá',
    unidos_da_tijuca: 'Quiva e Iaiá',
    uniao_de_jacarepagua: 'Marília de Dirceu',
    unidos_de_jacarepagua: 'Marília de Dirceu',
    jacarepagua: 'Marília de Dirceu',
    independentes_cordovil: 'Baile das Rosas',
    independentes_de_cordovil: 'Baile das Rosas',
    cordovil: 'Baile das Rosas',
    independentes_do_leblon: 'Baile das Rosas',
    leblon: 'Baile das Rosas',
    cabucu: 'Ninguém Segura este País',
    unidos_do_cabucu: 'Ninguém Segura este País',
    uniao_da_ilha: 'Ritual Afro-Brasileiro',
    ilha: 'Ritual Afro-Brasileiro',
    unidos_de_manguinhos: 'Ouro Verde',
    manguinhos: 'Ouro Verde',
    cartolinhas_de_caxias: 'Viagem ao Norte e Nordeste Brasileiro',
    cartolinhas: 'Viagem ao Norte e Nordeste Brasileiro'
  },
  1970: {
    // Grupo Especial 1970
    portela: 'Lendas e mistérios da Amazônia',
    salgueiro: 'Praça Onze, carioca da gema',
    mangueira: 'Um cântico à natureza',
    mocidade: 'O meu pé de laranja lima',
    vila_isabel: 'Glórias gaúchas',
    imperatriz: 'Oropa, França e Bahia',
    estacio_de_sa: 'Terra de Caruaru',
    unidos_de_sao_carlos: 'Terra de Caruaru',
    sao_carlos: 'Terra de Caruaru',
    imperio_serrano: 'Arte em tom maior',
    jacarezinho: 'O fabuloso mundo do circo',
    unidos_do_jacarezinho: 'O fabuloso mundo do circo',
    santa_cruz: 'Bravura, Amor e Beleza da Mulher Brasileira',
    academicos_de_santa_cruz: 'Bravura, Amor e Beleza da Mulher Brasileira',

    // Série Ouro (Grupo 2) 1970
    imperio_da_tijuca: 'Segredos e encantos da Bahia',
    unidos_padre_miguel: 'Primavera',
    padre_miguel: 'Primavera',
    upm: 'Primavera',
    tupy_bras_de_pina: 'Praça XI, Berço do Samba',
    tupi_de_bras_de_pina: 'Praça XI, Berço do Samba',
    tupy: 'Praça XI, Berço do Samba',
    lins_imperial: 'Memórias da rua do Ouvidor',
    lins: 'Memórias da rua do Ouvidor',
    uniao_de_jacarepagua: 'Salões e damas imperiais',
    unidos_de_jacarepagua: 'Salões e damas imperiais',
    jacarepagua: 'Salões e damas imperiais',
    beija_flor: 'Rio, quatro séculos de glórias',
    tuiuti: 'Alencar, Patriarca da Literatura Brasileira',
    paraiso_do_tuiuti: 'Alencar, Patriarca da Literatura Brasileira',
    em_cima_da_hora: 'O mundo maravilhoso de Debret',
    sao_clemente: 'Histórias fantásticas',
    unidos_de_lucas: 'Arte barroca',
    lucas: 'Arte barroca',
    cabucu: 'As musas de Chico Buarque de Holanda',
    unidos_do_cabucu: 'As musas de Chico Buarque de Holanda',
    tijuca: 'Festas da Bahia',
    unidos_da_tijuca: 'Festas da Bahia',
    aprendizes_da_gavea: 'Evolução dos transportes na terra carioca',
    aprendizes_gavea: 'Evolução dos transportes na terra carioca',
    gavea: 'Evolução dos transportes na terra carioca',
    uniao_do_centenario: 'Brasil, berço de riquezas',
    centenario: 'Brasil, berço de riquezas',
    independentes_cordovil: 'Não desfilou',
    independentes_de_cordovil: 'Não desfilou',
    independentes_do_leblon: 'Não desfilou',
    cordovil: 'Não desfilou',
    leblon: 'Não desfilou',
    uniao_vaz_lobo: 'Iracema, a virgem Tupã',
    uniao_de_vaz_lobo: 'Iracema, a virgem Tupã',
    vaz_lobo: 'Iracema, a virgem Tupã'
  },
  1969: {
    // Grupo Especial 1969
    salgueiro: 'Bahia de Todos os Deuses',
    mangueira: 'Mercadores e suas Tradições',
    portela: 'Treze Naus',
    imperio_serrano: 'Heróis da Liberdade',
    vila_isabel: 'Yayá do Cais Dourados',
    estacio_de_sa: 'Gabriela, Cravo e Canela',
    unidos_de_sao_carlos: 'Gabriela, Cravo e Canela',
    sao_carlos: 'Gabriela, Cravo e Canela',
    mocidade: 'Vida e Glória de Francisco Adolfo Varnhagen',
    imperatriz: 'Brasil, Flor Amorosa de Três Raças',
    unidos_de_lucas: 'Rapsódia Folclórica',
    lucas: 'Rapsódia Folclórica',
    em_cima_da_hora: 'Ouro Escravo',

    // Série Ouro (Grupo 2) 1969
    santa_cruz: 'O Rio dos Vice-Reis',
    academicos_de_santa_cruz: 'O Rio dos Vice-Reis',
    jacarezinho: 'Vila Rica do Pilar',
    unidos_do_jacarezinho: 'Vila Rica do Pilar',
    tuiuti: 'O Mundo da Poesia de Olavo Bilac',
    paraiso_do_tuiuti: 'O Mundo da Poesia de Olavo Bilac',
    uniao_de_jacarepagua: 'Memórias Históricas do Primeiro Império',
    unidos_de_jacarepagua: 'Memórias Históricas do Primeiro Império',
    jacarepagua: 'Memórias Históricas do Primeiro Império',
    aprendizes_da_gavea: 'Último Baile Imperial',
    aprendizes_gavea: 'Último Baile Imperial',
    gavea: 'Último Baile Imperial',
    lins_imperial: 'Imperatriz das Rosas',
    lins: 'Imperatriz das Rosas',
    unidos_padre_miguel: 'Três Lendas de Amor',
    padre_miguel: 'Três Lendas de Amor',
    upm: 'Três Lendas de Amor',
    tijuca: 'Tijuca Sempre Jovem',
    unidos_da_tijuca: 'Tijuca Sempre Jovem',
    beija_flor: 'O Paquete do Exílio',
    uniao_do_centenario: 'Barão de Mauá',
    centenario: 'Barão de Mauá',
    imperio_da_tijuca: 'O negro na civilização brasileira',
    independentes_cordovil: 'Baile das Rosas',
    independentes_de_cordovil: 'Baile das Rosas',
    independentes_do_leblon: 'Baile das Rosas',
    cordovil: 'Baile das Rosas',
    leblon: 'Baile das Rosas',
    sao_clemente: 'Assim dança o Brasil',
    tupy_bras_de_pina: 'Senzala em festa',
    tupi_de_bras_de_pina: 'Senzala em festa',
    tupy: 'Senzala em festa'
  },
  1968: {
    // Grupo Especial 1968
    mangueira: 'Samba, festa de um povo',
    imperio_serrano: 'Pernambuco, Leão do Norte',
    salgueiro: 'Dona Beja, a feiticeira de Araxá',
    portela: 'O tronco do ipê',
    unidos_de_lucas: 'História do negro no Brasil ou Sublime pergaminho',
    lucas: 'História do negro no Brasil ou Sublime pergaminho',
    mocidade: 'Viagem pitoresca através do Brasil',
    estacio_de_sa: 'Uma visita ao Museu Imperial',
    unidos_de_sao_carlos: 'Uma visita ao Museu Imperial',
    sao_carlos: 'Uma visita ao Museu Imperial',
    vila_isabel: 'Quatro séculos de modas e costumes',
    independentes_cordovil: 'Modas e aspectos do Rio no século XVIII',
    independentes_de_cordovil: 'Modas e aspectos do Rio no século XVIII',
    independentes_do_leblon: 'Modas e aspectos do Rio no século XVIII',
    cordovil: 'Modas e aspectos do Rio no século XVIII',
    leblon: 'Modas e aspectos do Rio no século XVIII',
    imperio_da_tijuca: 'Exaltação a Cândido Portinari',

    // Série Ouro (Grupo 2) 1968
    em_cima_da_hora: 'Anita Garibaldi, amor e revolução',
    imperatriz: 'Bahia em festa',
    tijuca: 'Danças do Brasil',
    unidos_da_tijuca: 'Danças do Brasil',
    uniao_de_jacarepagua: 'Promulgação da lei áurea',
    unidos_de_jacarepagua: 'Promulgação da lei áurea',
    jacarepagua: 'Promulgação da lei áurea',
    santa_cruz: 'Moedas e medalhas do Brasil',
    academicos_de_santa_cruz: 'Moedas e medalhas do Brasil',
    tupy_bras_de_pina: 'Bodas Imperiais',
    tupi_de_bras_de_pina: 'Bodas Imperiais',
    tupy: 'Bodas Imperiais',
    sao_clemente: 'Vultos da cultura imperial',
    unidos_padre_miguel: 'Salões e damas do Segundo Império',
    padre_miguel: 'Salões e damas do Segundo Império',
    upm: 'Salões e damas do Segundo Império',
    beija_flor: 'Exaltação a José de Alencar',
    jacarezinho: 'Exaltação à cultura nacional',
    unidos_do_jacarezinho: 'Exaltação à cultura nacional',
    aprendizes_da_gavea: 'Dragão do mar ou Jangadeiro da abolição',
    aprendizes_gavea: 'Dragão do mar ou Jangadeiro da abolição',
    gavea: 'Dragão do mar ou Jangadeiro da abolição',
    lins_imperial: 'Exaltação às façanhas heróicas dos bravos bandeirantes',
    lins: 'Exaltação às façanhas heróicas dos bravos bandeirantes',
    caprichosos_de_pilares: 'Brasil em plena primavera',
    caprichosos: 'Brasil em plena primavera',
    cabucu: 'A primazia da Bahia',
    unidos_do_cabucu: 'A primazia da Bahia'
  },
  1967: {
    // Grupo Especial 1967
    mangueira: 'O mundo encantado de Monteiro Lobato',
    estacao_primeira_de_mangueira: 'O mundo encantado de Monteiro Lobato',
    imperio_serrano: 'São Paulo, chapadão de glórias',
    salgueiro: 'História da liberdade no Brasil',
    academicos_do_salgueiro: 'História da liberdade no Brasil',
    vila_isabel: 'Carnaval das ilusões',
    unidos_de_vila_isabel: 'Carnaval das ilusões',
    unidos_de_lucas: 'Festas tradicionais do Rio de Janeiro',
    lucas: 'Festas tradicionais do Rio de Janeiro',
    portela: 'Tal dia é o batizado',
    mocidade: 'O teatro brasileiro através dos tempos',
    mocidade_independente: 'O teatro brasileiro através dos tempos',
    mocidade_independente_de_padre_miguel: 'O teatro brasileiro através dos tempos',
    imperio_da_tijuca: 'O reino encantado de Vicente Guimarães',
    imperatriz: 'A vida poética de Olavo Bilac',
    imperatriz_leopoldinense: 'A vida poética de Olavo Bilac',
    sao_clemente: 'Festas e tradições populares do Brasil',

    // Série Ouro (Grupo 2) 1967
    estacio_de_sa: 'Lendas e costumes do Brasil',
    unidos_de_sao_carlos: 'Lendas e costumes do Brasil',
    sao_carlos: 'Lendas e costumes do Brasil',
    estacio: 'Lendas e costumes do Brasil',
    independentes_cordovil: 'Último baile da Ilha Fiscal',
    independentes_de_cordovil: 'Último baile da Ilha Fiscal',
    independentes_do_leblon: 'Último baile da Ilha Fiscal',
    cordovil: 'Último baile da Ilha Fiscal',
    leblon: 'Último baile da Ilha Fiscal',
    em_cima_da_hora: 'Vida e amores de Beja',
    unidos_padre_miguel: 'O penacho do capitão-mor',
    padre_miguel: 'O penacho do capitão-mor',
    upm: 'O penacho do capitão-mor',
    santa_cruz: 'Núpcias Imperiais',
    academicos_de_santa_cruz: 'Núpcias Imperiais',
    tupy_bras_de_pina: 'O homem que não quis ser rei',
    tupi_de_bras_de_pina: 'O homem que não quis ser rei',
    tupy: 'O homem que não quis ser rei',
    uniao_de_jacarepagua: 'Contratadores de diamantes',
    unidos_de_jacarepagua: 'Contratadores de diamantes',
    jacarepagua: 'Contratadores de diamantes',
    cabucu: 'Bandeiras e brasões na história do Brasil',
    unidos_do_cabucu: 'Bandeiras e brasões na história do Brasil',
    aprendizes_da_gavea: 'Dorotéia de Vila Rica',
    aprendizes_gavea: 'Dorotéia de Vila Rica',
    gavea: 'Dorotéia de Vila Rica',
    lins_imperial: 'A Condessa de Barral',
    lins: 'A Condessa de Barral',
    caprichosos_de_pilares: 'O Brasil através de sua música',
    caprichosos: 'O Brasil através de sua música',
    unidos_de_manguinhos: 'Espumas flutuantes - Homenagem a Castro Alves',
    manguinhos: 'Espumas flutuantes - Homenagem a Castro Alves',
    unidos_do_jardim: 'Brasil, reino, império',
    jardim: 'Brasil, reino, império'
  },
  1966: {
    // Grupo Especial 1966
    portela: 'Memórias de um sargento de milícias',
    mangueira: 'Exaltação a Villa-Lobos',
    estacao_primeira_de_mangueira: 'Exaltação a Villa-Lobos',
    imperio_serrano: 'Glória e graças da Bahia',
    vila_isabel: 'Três Épocas do Brasil',
    unidos_de_vila_isabel: 'Três Épocas do Brasil',
    salgueiro: 'Os amores célebres do Brasil',
    academicos_do_salgueiro: 'Os amores célebres do Brasil',
    mocidade: 'Exaltação à Academia Brasileira de Letras',
    mocidade_independente: 'Exaltação à Academia Brasileira de Letras',
    mocidade_independente_de_padre_miguel: 'Exaltação à Academia Brasileira de Letras',
    aprendizes_de_lucas: 'A semente de um grande império',
    unidos_da_capela: 'Oitenta e oito anos de samba',
    santa_cruz: 'Epopéia de uma raça',
    academicos_de_santa_cruz: 'Epopéia de uma raça',
    imperio_da_tijuca: 'A história do teatro nacional',

    // Série Ouro (Grupo 2) 1966
    sao_clemente: 'Apoteose ao Folclore Brasileiro',
    imperatriz: 'Monarquia e esplendor da história',
    imperatriz_leopoldinense: 'Monarquia e esplendor da história',
    estacio_de_sa: 'História da Escola Nacional de Belas Artes',
    unidos_de_sao_carlos: 'História da Escola Nacional de Belas Artes',
    sao_carlos: 'História da Escola Nacional de Belas Artes',
    estacio: 'História da Escola Nacional de Belas Artes',
    aprendizes_da_gavea: 'A Vida em Flor de Dona Beja',
    aprendizes_gavea: 'A Vida em Flor de Dona Beja',
    gavea: 'A Vida em Flor de Dona Beja',
    independentes_cordovil: 'D. Beja, a feiticeira de Araxá',
    independentes_de_cordovil: 'D. Beja, a feiticeira de Araxá',
    independentes_do_leblon: 'D. Beja, a feiticeira de Araxá',
    cordovil: 'D. Beja, a feiticeira de Araxá',
    leblon: 'D. Beja, a feiticeira de Araxá',
    uniao_de_jacarepagua: 'Galeria de vultos imperiais',
    unidos_de_jacarepagua: 'Galeria de vultos imperiais',
    jacarepagua: 'Galeria de vultos imperiais',
    unidos_padre_miguel: 'Conquista de Araci',
    padre_miguel: 'Conquista de Araci',
    upm: 'Conquista de Araci',
    lins_imperial: 'Chiquinha Gonzaga e sua época',
    lins: 'Chiquinha Gonzaga e sua época',
    tupy_bras_de_pina: 'Exaltação à Bahia',
    tupi_de_bras_de_pina: 'Exaltação à Bahia',
    tupy: 'Exaltação à Bahia',
    cabucu: 'Apoteose ao trabalho',
    unidos_do_cabucu: 'Apoteose ao trabalho',
    tijuca: 'O Império em Três Atos',
    unidos_da_tijuca: 'O Império em Três Atos',
    caprichosos_de_pilares: 'Vida e obra de D. João VI',
    caprichosos: 'Vida e obra de D. João VI',
    unidos_do_jardim: 'Os Três Acontecimentos Históricos',
    jardim: 'Os Três Acontecimentos Históricos',
    uniao_do_centenario: 'Sua Majestade, o Carnaval',
    centenario: 'Sua Majestade, o Carnaval',
    tuiuti: 'Sonho de uma Noite de Carnaval',
    paraiso_do_tuiuti: 'Sonho de uma Noite de Carnaval'
  },
  1965: {
    // Grupo Especial 1965
    salgueiro: 'História do Carnaval Carioca - Eneida',
    academicos_do_salgueiro: 'História do Carnaval Carioca - Eneida',
    imperio_serrano: 'Cinco bailes tradicionais na história do Rio',
    portela: 'Histórias e tradições do Rio quatrocentão, do morro Cara de Cão à Praça Onze',
    mangueira: 'Rio através dos séculos',
    estacao_primeira_de_mangueira: 'Rio através dos séculos',
    unidos_da_capela: 'Rio de Ontem e de Hoje',
    capela: 'Rio de Ontem e de Hoje',
    mocidade: 'Parabéns pra Você, Rio (4º Centenário)',
    mocidade_independente: 'Parabéns pra Você, Rio (4º Centenário)',
    mocidade_independente_de_padre_miguel: 'Parabéns pra Você, Rio (4º Centenário)',
    aprendizes_de_lucas: 'Progresso e tradições do Rio',
    imperio_da_tijuca: 'Apoteose ao Rio de Janeiro',
    uniao_de_jacarepagua: 'Carnaval, alegria do Rio',
    unidos_de_jacarepagua: 'Carnaval, alegria do Rio',
    jacarepagua: 'Carnaval, alegria do Rio',
    imperatriz: 'Homenagem ao Brasil no IV Centenário do Rio de Janeiro',
    imperatriz_leopoldinense: 'Homenagem ao Brasil no IV Centenário do Rio de Janeiro',

    // Série Ouro (Grupo 2) 1965
    santa_cruz: 'Rio, quatro séculos de glórias',
    academicos_de_santa_cruz: 'Rio, quatro séculos de glórias',
    vila_isabel: 'Epopéia do Teatro Municipal',
    unidos_de_vila_isabel: 'Epopéia do Teatro Municipal',
    sao_clemente: 'Relíquias e Memórias do Rio',
    lins_imperial: 'Rio através da história',
    lins: 'Rio através da história',
    tuiuti: 'Quatro séculos de glória',
    paraiso_do_tuiuti: 'Quatro séculos de glória',
    tupy_bras_de_pina: 'Outros carnavais',
    tupi_de_bras_de_pina: 'Outros carnavais',
    tupy: 'Outros carnavais',
    cabucu: 'Rio de 400 janeiros',
    unidos_do_cabucu: 'Rio de 400 janeiros',
    caprichosos_de_pilares: 'O IV centenário do Rio de Janeiro',
    caprichosos: 'O IV centenário do Rio de Janeiro',
    unidos_padre_miguel: 'Viagem através do Rio',
    padre_miguel: 'Viagem através do Rio',
    upm: 'Viagem através do Rio',
    imperio_do_maranga: 'Exaltação ao IV centenário do Rio de Janeiro',
    maranga: 'Exaltação ao IV centenário do Rio de Janeiro',
    vila_santa_tereza: 'Rio Antigo',
    unidos_da_vila_santa_tereza: 'Rio Antigo'
  },
  1964: {
    // Grupo Especial 1964
    portela: 'O segundo casamento de D. Pedro I',
    salgueiro: 'Chico-Rei',
    academicos_do_salgueiro: 'Chico-Rei',
    mangueira: 'Histórias de um preto velho',
    estacao_primeira_de_mangueira: 'Histórias de um preto velho',
    imperio_serrano: 'Aquarela Brasileira',
    unidos_da_capela: 'Exaltação às Beldades de Nossa Pátria',
    capela: 'Exaltação às Beldades de Nossa Pátria',
    uniao_de_jacarepagua: 'Uma Festa no Tijuco',
    unidos_de_jacarepagua: 'Uma Festa no Tijuco',
    jacarepagua: 'Uma Festa no Tijuco',
    mocidade: 'O cacho de banana',
    mocidade_independente: 'O cacho de banana',
    mocidade_independente_de_padre_miguel: 'O cacho de banana',
    aprendizes_de_lucas: 'Viagem através do Brasil',
    unidos_padre_miguel: 'Feira na Bahia',
    padre_miguel: 'Feira na Bahia',
    upm: 'Feira na Bahia',
    cabucu: 'Brasil de norte a sul',
    unidos_do_cabucu: 'Brasil de norte a sul',

    // Série Ouro (Grupo 2) 1964
    imperio_da_tijuca: 'O esplendor do Rio Imperial',
    imperatriz: 'A Favorita do Imperador, Marquesa de Santos',
    imperatriz_leopoldinense: 'A Favorita do Imperador, Marquesa de Santos',
    vila_isabel: 'Exaltação à Bahia',
    unidos_de_vila_isabel: 'Exaltação à Bahia',
    tijuca: 'Homenagem ao Rio Grande do Sul',
    unidos_da_tijuca: 'Homenagem ao Rio Grande do Sul',
    santa_cruz: 'Costumes e Tradições da Bahia',
    academicos_de_santa_cruz: 'Costumes e Tradições da Bahia',
    lins_imperial: 'O sonho das esmeraldas',
    lins: 'O sonho das esmeraldas',
    caprichosos_de_pilares: 'O último baile da corte imperial',
    caprichosos: 'O último baile da corte imperial',
    imperio_do_maranga: 'Aclamação a D. Pedro I',
    maranga: 'Aclamação a D. Pedro I',
    beija_flor: 'Café, riqueza do Brasil',
    beija_flor_de_nilopolis: 'Café, riqueza do Brasil',
    unidos_de_bangu: 'Jóias da poesia',
    bangu: 'Jóias da poesia'
  },
  1963: {
    // Grupo Especial 1963
    salgueiro: 'Chica da Silva',
    academicos_do_salgueiro: 'Chica da Silva',
    mangueira: 'Exaltação à Bahia',
    estacao_primeira_de_mangueira: 'Exaltação à Bahia',
    imperio_serrano: 'Rio de ontem e de hoje ou Exaltação a Mem de Sá',
    portela: 'Barão de Mauá e suas realizações ou Barão de Mauá e sua época',
    uniao_de_jacarepagua: 'Mestre Valentim e sua época',
    unidos_de_jacarepagua: 'Mestre Valentim e sua época',
    jacarepagua: 'Mestre Valentim e sua época',
    mocidade: 'As Minas Gerais',
    mocidade_independente: 'As Minas Gerais',
    mocidade_independente_de_padre_miguel: 'As Minas Gerais',
    cabucu: 'Os heróis de Vila Rica',
    unidos_do_cabucu: 'Os heróis de Vila Rica',
    aprendizes_de_lucas: 'Páginas da história',
    unidos_de_bangu: 'Brasil, pátria universal',
    bangu: 'Brasil, pátria universal',
    beija_flor: 'Ceci e Peri',
    beija_flor_de_nilopolis: 'Ceci e Peri',

    // Série Ouro (Grupo 2) 1963
    unidos_padre_miguel: 'Costumes e tradição do Rio Grande do Sul',
    padre_miguel: 'Costumes e tradição do Rio Grande do Sul',
    upm: 'Costumes e tradição do Rio Grande do Sul',
    imperatriz: 'As Três Capitais',
    imperatriz_leopoldinense: 'As Três Capitais',
    vila_isabel: 'Três acontecimentos históricos',
    unidos_de_vila_isabel: 'Três acontecimentos históricos',
    independentes_cordovil: 'Brasil turístico',
    independentes_do_leblon: 'Brasil turístico',
    imperio_da_tijuca: 'Reminiscências da música popular brasileira',
    uniao_do_centenario: 'Uma página da história do Brasil',
    centenario: 'Uma página da história do Brasil',
    tijuca: 'Do Oiapoque ao Chuí',
    unidos_da_tijuca: 'Do Oiapoque ao Chuí',
    caprichosos_de_pilares: 'Ilusão de um bandeirante (A lenda da pedra verde)',
    caprichosos: 'Ilusão de um bandeirante (A lenda da pedra verde)',
    tupy_bras_de_pina: 'Vinte anos a serviço do carnaval',
    tupi_de_bras_de_pina: 'Vinte anos a serviço do carnaval',
    tupy: 'Vinte anos a serviço do carnaval',
    imperio_do_maranga: 'Exaltação ao Barão do Rio Branco',
    maranga: 'Exaltação ao Barão do Rio Branco',
    unidos_de_nilopolis: 'O Último baile imperial da Ilha Fiscal'
  },
  1962: {
    // Grupo Especial 1962
    portela: 'Rugendas ou Viagens pitorescas através do Brasil',
    imperio_serrano: 'Rio dos vice-reis',
    salgueiro: 'O Descobrimento do Brasil',
    academicos_do_salgueiro: 'O Descobrimento do Brasil',
    mangueira: 'Casa grande e senzala',
    estacao_primeira_de_mangueira: 'Casa grande e senzala',
    mocidade: 'Brasil no Campo Cultural',
    mocidade_independente: 'Brasil no Campo Cultural',
    mocidade_independente_de_padre_miguel: 'Brasil no Campo Cultural',
    aprendizes_de_lucas: 'Maravilhas do Brasil',
    cabucu: 'A glória e os amores de D. Pedro I',
    unidos_do_cabucu: 'A glória e os amores de D. Pedro I',
    uniao_de_jacarepagua: 'Tipos populares do Brasil-Colônia',
    unidos_de_jacarepagua: 'Tipos populares do Brasil-Colônia',
    jacarepagua: 'Tipos populares do Brasil-Colônia',
    unidos_da_capela: 'Da expulsão dos franceses à fundação da cidade de São Sebastião',
    capela: 'Da expulsão dos franceses à fundação da cidade de São Sebastião',
    tupy_bras_de_pina: 'Gonçalves Dias e suas memórias',
    tupi_de_bras_de_pina: 'Gonçalves Dias e suas memórias',
    tupy: 'Gonçalves Dias e suas memórias',

    // Série Ouro (Grupo 2) 1962
    unidos_de_bangu: 'A fragata de D. Afonso',
    bangu: 'A fragata de D. Afonso',
    beija_flor: 'Dia do Fico',
    beija_flor_de_nilopolis: 'Dia do Fico',
    imperio_da_tijuca: 'Rapsódia brasileira',
    caprichosos_de_pilares: 'Galeria dos bravos',
    caprichosos: 'Galeria dos bravos',
    imperatriz: 'Rio no século XVIII, Apoteose a Carlos Gomes de Andrade, o Conde de Bobadela',
    imperatriz_leopoldinense: 'Rio no século XVIII, Apoteose a Carlos Gomes de Andrade, o Conde de Bobadela',
    academicos_bento_ribeiro: 'Marília de Dirceu',
    academicos_de_bento_ribeiro: 'Marília de Dirceu',
    bento_ribeiro: 'Marília de Dirceu',
    tijuca: 'Rio pitoresco',
    unidos_da_tijuca: 'Rio pitoresco',
    vila_isabel: 'Dom João VI',
    unidos_de_vila_isabel: 'Dom João VI',
    uniao_do_centenario: 'A cultura a serviço do progresso do Brasil',
    centenario: 'A cultura a serviço do progresso do Brasil',
    unidos_padre_miguel: 'Cinco fatos históricos',
    padre_miguel: 'Cinco fatos históricos',
    upm: 'Cinco fatos históricos',
    imperio_do_maranga: 'Cenas do carnaval na Rua do Ouvidor',
    maranga: 'Cenas do carnaval na Rua do Ouvidor',
    filhos_do_deserto: 'Jóias da poesia brasileira - Castro Alves',
    flor_do_lins: 'Exaltação aos vultos republicanos',
    uniao_da_ilha: 'Homenagem a Catulo da Paixão Cearense',
    uniao_da_ilha_do_governador: 'Homenagem a Catulo da Paixão Cearense',
    unidos_da_vila_sao_luis: 'Reminiscências da história do Brasil',
    vila_sao_luis: 'Reminiscências da história do Brasil'
  },
  1961: {
    // Grupo Especial 1961
    mangueira: 'Reminiscências do Rio Antigo',
    estacao_primeira_de_mangueira: 'Reminiscências do Rio Antigo',
    salgueiro: 'Vida e obra do Aleijadinho',
    academicos_do_salgueiro: 'Vida e obra do Aleijadinho',
    portela: 'Jóias das lendas brasileiras',
    imperio_serrano: 'Movimentos revolucionários e Independência do Brasil - Inconfidência Mineira',
    unidos_da_capela: 'Centenário de Rui Barbosa',
    capela: 'Centenário de Rui Barbosa',
    aprendizes_de_lucas: 'Nos tempos de Aleijadinho',
    mocidade: 'Carnaval carioca',
    mocidade_independente: 'Carnaval carioca',
    mocidade_independente_de_padre_miguel: 'Carnaval carioca',
    uniao_de_jacarepagua: 'D. João VI no Brasil',
    unidos_de_jacarepagua: 'D. João VI no Brasil',
    jacarepagua: 'D. João VI no Brasil',
    caprichosos_de_pilares: 'Coroação de D. Pedro II',
    caprichosos: 'Coroação de D. Pedro II',
    unidos_padre_miguel: 'Exaltação aos ex-combatentes',
    padre_miguel: 'Exaltação aos ex-combatentes',
    upm: 'Exaltação aos ex-combatentes',
    academicos_bento_ribeiro: 'Apoteose aos grandes vultos da Marinha',
    academicos_de_bento_ribeiro: 'Apoteose aos grandes vultos da Marinha',
    bento_ribeiro: 'Apoteose aos grandes vultos da Marinha',
    // Série Ouro (Grupo 2) 1961
    cabucu: 'Relíquias do Rio Antigo',
    unidos_do_cabucu: 'Relíquias do Rio Antigo',
    tupy_bras_de_pina: 'Seca no Nordeste',
    tupi_de_bras_de_pina: 'Seca no Nordeste',
    tupy: 'Seca no Nordeste',
    unidos_de_bangu: 'Os bandeirantes',
    bangu: 'Os bandeirantes',
    vila_isabel: 'A Imprensa Através dos Tempos',
    unidos_de_vila_isabel: 'A Imprensa Através dos Tempos',
    filhos_do_deserto: 'Homenagem a Santos Dumont',
    uniao_do_centenario: 'Anhangüera',
    centenario: 'Anhangüera',
    tijuca: 'Leilão de Escravos',
    unidos_da_tijuca: 'Leilão de Escravos',
    beija_flor: 'Homenagem à Brasília',
    beija_flor_de_nilopolis: 'Homenagem à Brasília',
    flor_do_lins: 'Um Dia na Primavera',
    imperio_da_tijuca: 'Brasil em três épocas',
    imperio_do_maranga: 'Vultos que Engrandeceram a História da Bahia',
    maranga: 'Vultos que Engrandeceram a História da Bahia',
    unidos_da_vila_sao_luis: 'Reminiscências do Carnaval',
    vila_sao_luis: 'Reminiscências do Carnaval',
    aprendizes_boca_do_mato: 'Três vultos da Independência do Brasil',
    boca_do_mato: 'Três vultos da Independência do Brasil',
    tuiuti: 'Exaltação a Pedro Américo, Castro Alves e Rui Barbosa',
    paraiso_do_tuiuti: 'Exaltação a Pedro Américo, Castro Alves e Rui Barbosa',
    uniao_vaz_lobo: 'Chico Rei',
    vaz_lobo: 'Chico Rei',
    unidos_de_nilopolis: 'Guanabara em Foco',
    nilopolis: 'Guanabara em Foco',
    cartolinhas_de_caxias: 'Iracema',
    cartolinhas: 'Iracema'
  },
  1960: {
    // Grupo Especial 1960
    portela: 'Rio, capital eterna do samba ou Rio, cidade eterna',
    mangueira: 'Carnaval de Todos os Tempos ou Glória ao Samba',
    estacao_primeira_de_mangueira: 'Carnaval de Todos os Tempos ou Glória ao Samba',
    salgueiro: 'Quilombo dos Palmares',
    academicos_do_salgueiro: 'Quilombo dos Palmares',
    unidos_da_capela: 'Produtos e Costumes de Nossa Terra',
    capela: 'Produtos e Costumes de Nossa Terra',
    imperio_serrano: 'Medalhas e brasões',
    aprendizes_de_lucas: 'José Bonifácio, Patriarca da Independência',
    mocidade: 'Frases Célebres da História',
    mocidade_independente: 'Frases Célebres da História',
    mocidade_independente_de_padre_miguel: 'Frases Célebres da História',
    uniao_de_jacarepagua: 'A um passo da glória',
    unidos_de_jacarepagua: 'A um passo da glória',
    jacarepagua: 'A um passo da glória',
    unidos_padre_miguel: 'Ato da aclamação',
    padre_miguel: 'Ato da aclamação',
    upm: 'Ato da aclamação',
    beija_flor: 'Regência prima',
    beija_flor_de_nilopolis: 'Regência prima',
    aprendizes_boca_do_mato: 'Rui Barbosa na conferência de Haia',
    boca_do_mato: 'Rui Barbosa na conferência de Haia',
    unidos_de_bangu: 'Jóias da primavera',
    bangu: 'Jóias da primavera',
    // Série Ouro (Grupo 2) 1960
    caprichosos_de_pilares: 'Invasão holandesa na Bahia',
    caprichosos: 'Invasão holandesa na Bahia',
    imperio_do_maranga: 'Rio antigo Colonial',
    maranga: 'Rio antigo Colonial',
    cabucu: 'De Cabral a JK',
    unidos_do_cabucu: 'De Cabral a JK',
    tupy_bras_de_pina: 'Exaltação à Arte e Pintura de Almeida Jr.',
    tupi_de_bras_de_pina: 'Exaltação à Arte e Pintura de Almeida Jr.',
    tupy: 'Exaltação à Arte e Pintura de Almeida Jr.',
    imperio_da_tijuca: 'Brasil universitário',
    filhos_do_deserto: 'Brasil Colonial',
    tijuca: 'Sonho de Bravos',
    unidos_da_tijuca: 'Sonho de Bravos',
    cartolinhas_de_caxias: 'As Três Heroínas',
    cartolinhas: 'As Três Heroínas',
    flor_do_lins: 'Glória a Memória de Carlos Gomes',
    tuiuti: 'Exaltação a Villa Lobos',
    paraiso_do_tuiuti: 'Exaltação a Villa Lobos',
    unidos_da_vila_sao_luis: 'Entradas e Bandeiras através dos Séculos',
    vila_sao_luis: 'Entradas e Bandeiras através dos Séculos',
    unidos_de_nilopolis: 'Exaltação a Brasília',
    nilopolis: 'Exaltação a Brasília',
    uniao_da_piedade: 'Academia de Letras',
    piedade: 'Academia de Letras',
    unidos_do_jacare: 'Adeus Cidade Maravilhosa',
    jacare: 'Adeus Cidade Maravilhosa',
    unidos_do_morro_azul: 'Três Gigantes do Patriotismo',
    morro_azul: 'Três Gigantes do Patriotismo',
    unidos_da_ponte: 'Exaltação ao Estado do Rio de Janeiro',
    ponte: 'Exaltação ao Estado do Rio de Janeiro'
  },
  1959: {
    // Grupo Especial 1959
    portela: 'Brasil, Panteon de Glórias',
    salgueiro: 'Viagem pitoresca através do Brasil - Debret',
    academicos_do_salgueiro: 'Viagem pitoresca através do Brasil - Debret',
    imperio_serrano: 'Brasil Holandês, homenagem a João Maurício de Nassau',
    mangueira: 'O Brasil através dos tempos',
    estacao_primeira_de_mangueira: 'O Brasil através dos tempos',
    mocidade: 'Os vultos que ficaram na história',
    mocidade_independente: 'Os vultos que ficaram na história',
    mocidade_independente_de_padre_miguel: 'Os vultos que ficaram na história',
    unidos_da_capela: 'Petróleo do Brasil',
    capela: 'Petróleo do Brasil',
    aprendizes_de_lucas: 'Homenagem ao Corpo de Bombeiros',
    unidos_de_bangu: 'O último baile da corte imperial',
    bangu: 'O último baile da corte imperial',
    beija_flor: 'Copa do Mundo',
    beija_flor_de_nilopolis: 'Copa do Mundo',
    caprichosos_de_pilares: 'Laços de fitas',
    caprichosos: 'Laços de fitas',
    cartolinhas_de_caxias: 'Sonhos de um Pescador',
    cartolinhas: 'Sonhos de um Pescador',
    uniao_de_jacarepagua: 'Primeira estrofe do hino nacional',
    unidos_de_jacarepagua: 'Primeira estrofe do hino nacional',
    jacarepagua: 'Primeira estrofe do hino nacional',
    uniao_do_centenario: 'Brasil nas Letras e Artes',
    centenario: 'Brasil nas Letras e Artes',
    tupy_bras_de_pina: 'Memórias de um Preto Velho',
    tupi_de_bras_de_pina: 'Memórias de um Preto Velho',
    tupy: 'Memórias de um Preto Velho',
    cabucu: 'Coroação de D. Pedro I',
    unidos_do_cabucu: 'Coroação de D. Pedro I',
    tuiuti: 'Batalha do Tuiuti',
    paraiso_do_tuiuti: 'Batalha do Tuiuti',
    tijuca: 'Heróis e Heroínas',
    unidos_da_tijuca: 'Heróis e Heroínas',
    unidos_do_salgueiro: 'Exaltação aos Heróis de Monte Castelo',
    // Série Ouro (Grupo 2) 1959
    unidos_padre_miguel: 'Lampião',
    padre_miguel: 'Lampião',
    upm: 'Lampião',
    aprendizes_boca_do_mato: 'Machado de Assis',
    boca_do_mato: 'Machado de Assis',
    imperio_da_tijuca: 'Homenagem aos bombeiros',
    unidos_da_piedade: 'Noite de núpcias',
    imperio_do_maranga: 'Três Páginas da História do Brasil',
    maranga: 'Três Páginas da História do Brasil',
    unidos_do_coqueiro: 'Exaltação a Barão de Mauá',
    coqueiro: 'Exaltação a Barão de Mauá',
    estacio_de_sa: 'Marechal Rondon',
    unidos_de_sao_carlos: 'Marechal Rondon',
    sao_carlos: 'Marechal Rondon',
    unidos_da_ponte: 'Revista brasileira',
    ponte: 'Revista brasileira',
    vila_isabel: 'Homenagem à Saldanha da Gama',
    unidos_de_vila_isabel: 'Homenagem à Saldanha da Gama',
    unidos_da_favela: 'Quatro vultos da Bahia'
  },
  1958: {
    // Grupo Especial 1958
    portela: 'Vultos e efemérides do Brasil',
    imperio_serrano: 'Exaltação à Bárbara Heliodora',
    mangueira: 'Poema inolvidável ou Canção do Exílio',
    estacao_primeira_de_mangueira: 'Poema inolvidável ou Canção do Exílio',
    salgueiro: 'Um século e meio de progresso a serviço do Brasil - Homenagem ao Corpo de Fuzileiros Navais',
    academicos_do_salgueiro: 'Um século e meio de progresso a serviço do Brasil - Homenagem ao Corpo de Fuzileiros Navais',
    unidos_da_capela: 'Brasil, de Cabral a Pedro',
    capela: 'Brasil, de Cabral a Pedro',
    uniao_de_jacarepagua: 'Vultos do Brasil - De Cabral a Brasília',
    unidos_de_jacarepagua: 'Vultos do Brasil - De Cabral a Brasília',
    jacarepagua: 'Vultos do Brasil - De Cabral a Brasília',
    uniao_do_centenario: 'Glória a Carlos Gomes',
    centenario: 'Glória a Carlos Gomes',
    tupy_bras_de_pina: 'Inconfidência Mineira',
    tupi_de_bras_de_pina: 'Inconfidência Mineira',
    tupy: 'Inconfidência Mineira',
    aprendizes_de_lucas: 'Voluntários da Pátria',
    beija_flor: 'Tomada de Monte Castelo ou Exaltação às Forças Armadas',
    beija_flor_de_nilopolis: 'Tomada de Monte Castelo ou Exaltação às Forças Armadas',
    tijuca: 'O Patriarca da Independência',
    unidos_da_tijuca: 'O Patriarca da Independência',
    unidos_de_bangu: 'Proclamação da República',
    bangu: 'Proclamação da República',
    cartolinhas_de_caxias: 'Os amores do imperador',
    cartolinhas: 'Os amores do imperador',
    cabucu: 'Aí vem a Marinha e seu patrono',
    unidos_do_cabucu: 'Aí vem a Marinha e seu patrono',
    caprichosos_de_pilares: 'Exaltação à música brasileira',
    caprichosos: 'Exaltação à música brasileira',
    unidos_bento_ribeiro: 'O Grito do Ipiranga',
    bento_ribeiro: 'O Grito do Ipiranga',
    flor_do_lins: 'A Grande Descoberta',
    filhos_do_deserto: 'Retirada da Laguna',
    // Série Ouro (Grupo 2) 1958
    mocidade: 'Apoteose do samba',
    mocidade_independente: 'Apoteose do samba',
    mocidade_independente_de_padre_miguel: 'Apoteose do samba',
    unidos_do_salgueiro: 'Ouro Negro',
    tuiuti: 'Homenagem às Forças Armadas',
    paraiso_do_tuiuti: 'Homenagem às Forças Armadas',
    estacio_de_sa: 'Homenagem a Alberto Santos Dumont',
    unidos_de_sao_carlos: 'Homenagem a Alberto Santos Dumont',
    sao_carlos: 'Homenagem a Alberto Santos Dumont',
    vila_isabel: 'Riquezas do Brasil',
    unidos_de_vila_isabel: 'Riquezas do Brasil',
    unidos_da_vila_sao_luis: 'Como é Grande o Meu Brasil',
    vila_sao_luis: 'Como é Grande o Meu Brasil',
    uniao_do_catete: 'Homenagem ao Gaúcho',
    catete: 'Homenagem ao Gaúcho',
    unidos_da_piedade: 'Brasília, Novo Horizonte',
    unidos_de_nilopolis: 'As Minas de Prata',
    nilopolis: 'As Minas de Prata',
    independentes_cordovil: 'Escravatura',
    independentes_do_leblon: 'Escravatura',
    imperio_da_tijuca: 'Amores de D. Pedro I',
    unidos_do_morro_azul: 'Homenagem a José Bonifácio',
    morro_azul: 'Homenagem a José Bonifácio',
    paz_e_amor: 'Sonho Infantil',
    engenho_da_rainha: 'Relicário histórico',
    academicos_do_engenho_da_rainha: 'Relicário histórico',
    aprendizes_da_gavea: 'Anita Garibaldi',
    gavea: 'Anita Garibaldi',
    imperio_de_campo_grande: 'Bandeirante no Século',
    aprendizes_boca_do_mato: 'Exaltação à Tamandaré',
    boca_do_mato: 'Exaltação à Tamandaré',
    imperio_do_maranga: 'Proclamação da República ou Três Páginas da História do Brasil',
    maranga: 'Proclamação da República ou Três Páginas da História do Brasil',
    alem_do_horizonte: 'O Tigre da Abolição',
    uniao_vaz_lobo: 'Recordar é viver',
    vaz_lobo: 'Recordar é viver',
    alunos_da_penha_circular: 'Trajes regionais',
    universitaria_de_rocha_miranda: 'A vida no morro',
    unidos_da_congonha: 'Proclamação da República',
    congonha: 'Proclamação da República',
    unidos_do_jacare: 'Fernão Dias Paes Leme',
    jacare: 'Fernão Dias Paes Leme'
  },
  1957: {
    // Grupo Especial 1957
    portela: 'Legados de D. João VI',
    imperio_serrano: 'D. João VI ou Brasil Império',
    mangueira: 'Brasil rumo ao progresso',
    estacao_primeira_de_mangueira: 'Brasil rumo ao progresso',
    salgueiro: 'Navio negreiro',
    academicos_do_salgueiro: 'Navio negreiro',
    aprendizes_de_lucas: 'Homenagem à Imprensa',
    uniao_de_jacarepagua: 'Exaltação a D. Pedro I',
    unidos_da_capela: 'Petrobrás',
    caprichosos_de_pilares: 'Exaltação ao General Osório',
    caprichosos: 'Exaltação ao General Osório',
    uniao_do_centenario: 'Constituições do Brasil',
    beija_flor: 'Riquezas áureas do Brasil',
    beija_flor_de_nilopolis: 'Riquezas áureas do Brasil',
    tijuca: 'Sonho de Esmeralda ou Fascinação do Ouro e Diamantes',
    unidos_da_tijuca: 'Sonho de Esmeralda ou Fascinação do Ouro e Diamantes',
    cabucu: 'Sinfonia do Trabalho',
    unidos_do_cabucu: 'Sinfonia do Trabalho',
    unidos_bento_ribeiro: 'Fundação da Cidade do Rio de Janeiro',
    unidos_de_bento_ribeiro: 'Fundação da Cidade do Rio de Janeiro',
    filhos_do_deserto: 'Exaltação à Medicina',
    flor_do_lins: 'Sonho de um Mártir',
    vila_isabel: 'O Último Baile da Ilha Fiscal',
    unidos_de_vila_isabel: 'O Último Baile da Ilha Fiscal',
    tuiuti: 'Meus Sonhos de Criança',
    paraiso_do_tuiuti: 'Meus Sonhos de Criança',
    paz_e_amor: 'Trabalho, Indústria e Lavoura',

    // Série Ouro 1957
    unidos_de_bangu: 'Homenagem à aviação brasileira - Santos Dumont',
    bangu: 'Homenagem à aviação brasileira - Santos Dumont',
    tupy_bras_de_pina: 'Ordem e Progresso',
    cartolinhas_de_caxias: 'Jóia de Nossa Poesia',
    imperio_do_maranga: 'Sucessão de Bandeiras',
    mocidade: 'O baile das rosas',
    mocidade_independente_de_padre_miguel: 'O baile das rosas',
    uniao_do_catete: 'Cultura Nacional',
    engenho_da_rainha: 'Devaneios de um pescador',
    academicos_do_engenho_da_rainha: 'Devaneios de um pescador',
    aprendizes_boca_do_mato: 'Carlos Gomes',
    aprendizes_da_boca_do_mato: 'Carlos Gomes',
    unidos_da_congonha: 'Riquezas do Brasil',
    congonha: 'Riquezas do Brasil',
    recreio_de_inhauma: 'Exaltação a Rui Barbosa e Oswaldo Cruz',
    unidos_de_nilopolis: 'Homenagem a Santos Dumont',
    universitaria_de_rocha_miranda: 'Samba em três tempos',
    unidos_do_jacare: 'Pedro I e Cabral',
    jacare: 'Pedro I e Cabral',
    unidos_do_salgueiro: 'Marquesa de Santos',
    uniao_vaz_lobo: 'Santos Dumont',
    unidos_da_vila_sao_luis: 'Exaltação ao Samba',
    aprendizes_da_gavea: 'Ana Néri',
    imperio_da_tijuca: 'Festa do samba',
    alem_do_horizonte: 'Ana Néri',
    imperio_de_campo_grande: 'Cultura Nacional',
    unidos_do_morro_azul: 'Defesa do Brasil na Paz e na Guerra',
    capricho_do_centenario: 'Homenagem a Marinha Nacional'
  },
  1956: {
    // Grupo Especial 1956
    imperio_serrano: 'Caçador de esmeraldas ou Sonho das esmeraldas',
    portela: 'Gigante pela própria natureza',
    mangueira: 'Exaltação a Getúlio Vargas - Emancipação Nacional Brasil',
    estacao_primeira_de_mangueira: 'Exaltação a Getúlio Vargas - Emancipação Nacional Brasil',
    salgueiro: 'Brasil, fonte das artes ou A riqueza das artes no Brasil',
    academicos_do_salgueiro: 'Brasil, fonte das artes ou A riqueza das artes no Brasil',
    aprendizes_de_lucas: 'Paisagens do Sul',
    tijuca: 'Inferno verde',
    unidos_da_tijuca: 'Inferno verde',
    cabucu: 'O primeiro centenário do Corpo de Bombeiros',
    unidos_do_cabucu: 'O primeiro centenário do Corpo de Bombeiros',
    paz_e_amor: 'O Sonho do Caçador de Esmeraldas',
    filhos_do_deserto: 'Exaltação a Catulo, Luar do Sertão',
    unidos_bento_ribeiro: 'Exaltação à Princesa Isabel',
    unidos_de_bento_ribeiro: 'Exaltação à Princesa Isabel',
    tuiuti: 'O circo, a grande parada',
    paraiso_do_tuiuti: 'O circo, a grande parada',
    unidos_da_capela: 'Frases que Simbolizaram uma Pátria',
    beija_flor: 'O gaúcho',
    beija_flor_de_nilopolis: 'O gaúcho',
    coracoes_unidos_jacarepagua: 'Descoberta do Brasil',
    caprichosos_de_pilares: 'Exaltação à justiça brasileira',
    caprichosos: 'Exaltação à justiça brasileira',
    vai_se_quiser: 'Quem Quiser Que Venha Ver',
    unidos_da_congonha: 'A corte de D. João VI',
    congonha: 'A corte de D. João VI',
    unidos_do_indaia: 'Homenagem ao Amazonas',
    unidos_do_salgueiro: 'Meu Brasil',

    // Série Ouro 1956
    flor_do_lins: 'Exaltação a Princesa Isabel, a Redentora da Escravidão',
    uniao_do_centenario: 'Palheta no Brasil',
    vila_isabel: 'Três Épocas',
    unidos_de_vila_isabel: 'Três Épocas',
    uniao_vaz_lobo: 'General Rondon, bandeirante do século XX',
    engenho_da_rainha: 'Glória a Carlos Gomes',
    academicos_do_engenho_da_rainha: 'Glória a Carlos Gomes',
    estacio_de_sa: 'Glória aos imortais do samba',
    unidos_de_sao_carlos: 'Glória aos imortais do samba',
    cartolinhas_de_caxias: 'Sonho e Realidade',
    imperio_da_tijuca: 'Constituição de uma raça',
    indios_do_acau: 'Descoberta do Brasil',
    unidos_do_jacare: 'Saudação aos Jornalistas Brasileiros',
    jacare: 'Saudação aos Jornalistas Brasileiros',
    aprendizes_boca_do_mato: 'Principais riquezas do Brasil',
    aprendizes_da_boca_do_mato: 'Principais riquezas do Brasil',
    recreio_de_inhauma: 'Glória a Santos Dumont',
    unidos_do_barao: 'Brasil e seu Progresso',
    capricho_do_centenario: 'Lei Áurea',
    imperio_de_jacarepagua: 'Indígenas do Brasil',
    independentes_cordovil: 'Urbanização das Favelas',
    independentes_do_leblon: 'Urbanização das Favelas',
    uniao_do_catete: 'Três Páginas da História',
    alem_do_horizonte: 'Os Três Imortais',
    recreio_de_rocha_miranda: 'Esperança do Brasil',
    tupy_bras_de_pina: 'Benfeitores da cidade em 1902'
  },
  1955: {
    // Grupo Especial
    imperio_serrano: 'Exaltação a Caxias',
    mangueira: 'As quatro estações do ano ou Cânticos à natureza',
    portela: 'Uma festa junina no mês de fevereiro',
    salgueiro: 'Epopéia do samba',
    academicos_do_salgueiro: 'Epopéia do samba',
    aprendizes_de_lucas: 'Homenagem ao Fruto Proibido',
    beija_flor: 'Páginas de ouro da poesia brasileira',
    beija_flor_de_nilopolis: 'Páginas de ouro da poesia brasileira',
    vai_se_quiser: 'Exaltação à D. João VI - Abertura dos portos',
    unidos_da_congonha: 'Exaltação à Bahia',
    filhos_do_deserto: 'Inferno Verde',
    caprichosos_de_pilares: 'Retirada da Laguna',
    caprichosos: 'Retirada da Laguna',
    tuiuti: 'Apoteose a Edgar Roquete Pinto',
    paraiso_do_tuiuti: 'Apoteose a Edgar Roquete Pinto',
    tijuca: 'Sinhá moça',
    unidos_da_tijuca: 'Sinhá moça',
    unidos_do_indaia: 'Uma Noite de Samba no Museu Nacional de Belas Artes',
    cabucu: 'A queda da Monarquia',
    unidos_do_cabucu: 'A queda da Monarquia',
    unidos_da_capela: 'Saudações aos primeiros heróis que lutaram pela Independência',
    unidos_do_salgueiro: 'Glória aos mártires da Independência',
    indios_do_acau: 'Os amores da Marquesa de Santos',
    imperio_da_tijuca: 'Símbolos de nossa pátria',
    uniao_do_catete: 'Riquezas vegetais do nosso país',
    floresta_do_andarai: '(não se apresentou)',
    // Série Ouro
    coracoes_unidos_jacarepagua: 'Primavera',
    coracoes_unidos_de_jacarepagua: 'Primavera',
    paz_e_amor: 'O Guarani',
    unidos_bento_ribeiro: 'Batalha de Guararapes',
    unidos_de_bento_ribeiro: 'Batalha de Guararapes',
    bento_ribeiro: 'Batalha de Guararapes',
    flor_do_lins: 'Cultura do Café',
    uniao_do_centenario: 'Brasil Desperta',
    vila_isabel: 'Obras da Natureza',
    unidos_de_vila_isabel: 'Obras da Natureza',
    cada_ano_sai_melhor: 'Viva a Marinha'
  },
  1954: {
    // Grupo Especial
    mangueira: 'Rio antigo e moderno',
    imperio_serrano: 'O Guarani de Carlos Gomes',
    salgueiro: 'Uma romaria na Bahia',
    academicos_do_salgueiro: 'Uma romaria na Bahia',
    portela: 'São Paulo quatrocentão (O despertar do gigante)',
    aprendizes_de_lucas: 'Exaltação a São Paulo',
    filhos_do_deserto: 'Brasil primaveril - Floricultura',
    unidos_do_salgueiro: 'Exaltação aos vultos militares do Brasil',
    indios_do_acau: 'Guarani de Carlos Gomes',
    cabucu: 'Relíquias do Rio Antigo',
    unidos_do_cabucu: 'Relíquias do Rio Antigo',
    uniao_do_catete: 'Motivos históricos do Brasil',
    paraiso_das_baianas: 'Do Terço Velho ao Sampaio da FEB',
    tijuca: '400 anos de lutas e glórias - Homenagem ao 4º Centenário de São Paulo',
    unidos_da_tijuca: '400 anos de lutas e glórias - Homenagem ao 4º Centenário de São Paulo',
    unidos_da_capela: 'Brasil antigo e Brasil moderno',
    vai_se_quiser: 'Glória a Santos Dumont',
    unidos_do_grajau: 'Glória ao Passado, Homenagem aos Cronistas',
    floresta_do_andarai: 'Primavera Outra Vez',
    unidos_do_indaia: 'Brasil colônia',
    imperio_da_tijuca: 'Como o samba nasceu',
    engenho_da_rainha: 'Gigante pela própria natureza',
    academicos_do_engenho_da_rainha: 'Gigante pela própria natureza',
    aventureiros_da_matriz: 'Homenagem às Forças Armadas',
    paz_e_amor: 'Honra a três vultos da História - Caxias, Tamandaré e Santos Dumont',
    unidos_da_tamarineira: 'Coroação de Pedro II',
    independentes_do_rio: 'Descoberta do Brasil',
    independentes_cordovil: 'Ordem e Progresso',
    independentes_do_leblon: 'Ordem e Progresso',
    uniao_vaz_lobo: 'Descoberta do rio Amazonas',
    uniao_de_vaz_lobo: 'Descoberta do rio Amazonas',
    // Série Ouro
    beija_flor: 'O caçador de esmeraldas',
    beija_flor_de_nilopolis: 'O caçador de esmeraldas',
    caprichosos_de_pilares: 'Maria Quitéria',
    caprichosos: 'Maria Quitéria',
    imperio_de_jacarepagua: 'Honra ao mérito',
    uniao_do_centenario: 'Siderurgia Nacional',
    unidos_bento_ribeiro: 'Homenagem a Tamandaré',
    unidos_de_bento_ribeiro: 'Homenagem a Tamandaré',
    bento_ribeiro: 'Homenagem a Tamandaré',
    independentes_da_serra: 'Homenagem aos esportes brasileiros',
    recreio_de_rocha_miranda: 'Algodão - Homenagem ao 4º Centenário de São Paulo'
  },
  1953: {
    // Grupo Especial
    portela: 'Seis Datas Magnas',
    imperio_serrano: 'O último baile da corte imperial',
    mangueira: 'Unidade do Brasil',
    aprendizes_de_lucas: 'Exaltação a Recife',
    tijuca: 'Também temos nossos heróis : Caxias, Barroso e Santos Dumont',
    unidos_da_tijuca: 'Também temos nossos heróis : Caxias, Barroso e Santos Dumont',
    unidos_do_salgueiro: 'Apoteose aos Heróis da Batalha de Guararapes',
    filhos_do_deserto: 'Incentivo à cultura do trigo',
    unidos_da_capela: 'As quatro estações do ano',
    tres_mosqueteiros: 'Aquarela do Brasil',
    paz_e_amor: 'Rio de Janeiro, Jóia Universal',
    floresta_do_andarai: 'Descobrimento do Brasil e Primeira Missa',
    unidos_da_tamarineira: 'Os três maiores artistas do Brasil Colonial',
    depois_eu_digo: 'Os Três Vultos Imortais da Poesia Brasileira',
    unidos_do_indaia: 'Comemoração ao Dia do Trabalho',
    indios_do_acau: 'Os Grandes Vultos de Nossa História',
    cabucu: 'Bandeiras, armas e fardas do Brasil Antigo',
    unidos_do_cabucu: 'Bandeiras, armas e fardas do Brasil Antigo',
    vai_se_quiser: 'Páginas gloriosas',
    aventureiros_da_matriz: 'Fundação da Cidade do Rio de Janeiro',
    azul_e_branco_salgueiro: 'Exaltação ao Exército Brasileiro',
    imperio_da_tijuca: 'Primeira cultura do café no Brasil',
    flor_do_lins: 'Os jangadeiros',
    independentes_cordovil: 'Ordem e Progresso',
    independentes_do_leblon: 'Ordem e Progresso',
    // Série Ouro
    engenho_da_rainha: 'Glória à música brasileira',
    academicos_do_engenho_da_rainha: 'Glória à música brasileira',
    independentes_do_rio: 'A história do café no Brasil',
    paraiso_das_baianas: 'Glória à música popular brasileira',
    unidos_da_piedade: 'Abençoada terra',
    independentes_da_serra: 'Regresso da FEB',
    unidos_da_congonha: 'Cadetes da Escola Naval',
    caprichosos_de_pilares: 'Benjamin Constant',
    caprichosos: 'Benjamin Constant',
    coracoes_da_liberdade: 'Chico Viola'
  },
  1952: {
    // Grupo Especial
    aprendizes_de_lucas: 'Cultura do café',
    azul_e_branco_salgueiro: 'Evoluções da ciência',
    combinado_do_amor: 'Marinha do Brasil',
    depois_eu_digo: 'Recordar é viver',
    mangueira: 'Sonhos de um poeta - visões de Gonçalves Dias',
    filhos_do_deserto: 'O dia do algodão ou Cotonicultura brasileira',
    imperio_da_tijuca: 'Maravilhas brasileiras',
    imperio_serrano: 'Ana Néri ou Homenagem à medicina brasileira',
    independentes_cordovil: 'Exaltação à raça - Homenagem a Confederação Brasileira de Desportos',
    independentes_do_leblon: 'Exaltação à raça - Homenagem a Confederação Brasileira de Desportos',
    paz_e_amor: 'Alicerce de uma nação',
    portela: 'Brasil de ontem',
    tres_mosqueteiros: 'Candomblé da Bahia',
    uniao_vaz_lobo: 'Ouvindo estrelas',
    unidos_da_capela: 'Ordem e Progresso',
    unidos_da_tamarineira: 'O dia do fico',
    tijuca: 'Feira de Nazaré',
    unidos_da_tijuca: 'Feira de Nazaré',
    unidos_do_catete: 'Justiça e Caridade',
    unidos_do_grajau: 'O reorganizador',
    unidos_do_salgueiro: 'Mártires da Independência',
    vai_se_quiser: 'Aurora da Minha Vida',
    coracoes_unidos_jacarepagua: 'Progresso do Brasil',
    floresta_do_andarai: 'Lendas brasileiras',
    indios_do_acau: 'Bandeirantes',
    // Série Ouro
    unidos_do_indaia: 'Regresso da primavera',
    cada_ano_sai_melhor: 'O samba nasceu no morro',
    cabucu: 'Encouraçado São Paulo',
    unidos_do_cabucu: 'Encouraçado São Paulo',
    unidos_da_piedade: 'Impressa e seus Progressos',
    flor_do_lins: 'Grito do Ipiranga',
    imperio_do_maranga: 'Isto acima de tudo',
    unidos_do_maranga: 'Isto acima de tudo',
    caprichosos_de_pilares: 'Homenagem a Benjamin Constant',
    caprichosos: 'Homenagem a Benjamin Constant',
    independentes_do_rio: 'Santos Dumont',
    coracoes_unidos_da_favela: 'Escola de Samba',
    imperio_de_campo_grande: 'Riquezas do Brasil',
    unidos_da_congonha: 'Paraíso das Flores',
    fiquei_firme: 'Recordações de um passado',
    independentes_de_turiacu: 'Exaltação a Música Popular Brasileira',
    vila_isabel: 'Homenagem a Saldanha da Gama',
    unidos_de_vila_isabel: 'Homenagem a Saldanha da Gama',
    unidos_da_mocidade: 'Uma homenagem à imprensa',
    imperio_do_grotao: 'A bandeira',
    recreio_de_sao_carlos: 'Bailado da Colombina',
    paraiso_da_floresta: 'Melodias brasileiras',
    unidos_do_outeiro: 'Musa sertaneja',
    unidos_dos_arcos: 'Glórias imortais'
  },
  1951: {
    // FBES
    imperio_serrano: 'Sessenta e um anos de república',
    aprendizes_de_lucas: 'Festa da Uva - Homenagem ao Rio Grande do Sul',
    filhos_do_deserto: 'Reino do Mar',
    azul_e_branco_salgueiro: 'De pé pelo Brasil',
    irmaos_unidos_do_catete: 'O Grito do Ipiranga',
    imperio_da_tijuca: 'D. João VI',
    indios_do_acau: 'Batalha do Tuiuti',
    paz_e_amor: 'Um só povo, uma só bandeira',
    unidos_do_grajau: 'Os bandeirantes',
    vai_se_quiser: 'Sem enredo registrado',
    uniao_vaz_lobo: 'Homenagem aos soldados do fogo',
    depois_eu_digo: 'Vitória do trabalhadores do Brasil',
    floresta_do_andarai: 'Grito do Ipiranga',
    coracoes_unidos_da_favela: 'Primavera na favela',
    unidos_de_santo_amaro: 'Três imortais - Machado de Assis, Catulo da Paixão Cearense e Olavo Bilac',
    independentes_cordovil: 'Retirada da Laguna',
    engenho_da_rainha: 'O sonho de um pescador',
    unidos_do_pecado: 'José do Patrocínio',
    independentes_do_rio: 'Brasil cabloco',
    unidos_do_outeiro: 'Homens de novembro - Proclamação da República',
    estrela_de_ouro: 'Benfeitores da cidade em 1902',
    unidos_de_cordovil: 'Homenagem a Municipalidade',
    unidos_do_itambi: 'A Independência do Brasil',
    capricho_do_centenario: 'Reinado das margaridas',
    unidos_dos_arcos: 'Homenagem à música e à literatura - Rui Barbosa e Carlos Gomes',
    paraiso_do_grotao: 'Jardim dos Namorados',
    mocidade_de_um_paraiso: '24 de maio - A Batalha do Tuiuti',
    vitoria_de_bento_ribeiro: 'Soldado do fogo',
    unidos_dos_telegrafos: 'Homenagem à marinha brasileira',
    trovadores_do_maracana: 'A Festa da Uva',
    uniao_dos_casados: 'Bahia, berço da Águia de Haia - Rui Barbosa',
    flor_do_lins: 'Sem enredo registrado',
    unidos_de_campo_grande: 'A corte do samba',
    // FBES - Desclassificadas por infringir regulamento
    imperio_do_grotao: 'Santos Dumont',
    recreio_da_mocidade: 'Cabral descobre o Brasil',
    recreio_de_sao_carlos: 'O futebol carioca ou Homenagem ao Vasco da Gama',
    uniao_do_cruzeiro: 'O pobre pescador',
    unidos_da_piedade: 'O Brasil vanguardeiro na proteção à infância',
    unidos_de_santo_antonio: 'Evolução do samba',
    unidos_do_arapa: 'Invasão do samba no universo',
    unidos_do_barao: 'Desceu do morro para fundar a ABL - Machado de Assis',
    imperio_do_maranga: 'Relíquias do Império Brasileiro',
    unidos_do_maranga: 'Relíquias do Império Brasileiro',
    // UGESB
    portela: 'A volta do filho pródigo',
    tres_mosqueteiros: 'Feira na Bahia',
    mangueira: 'Unidade nacional',
    unidos_da_capela: 'Sem enredo registrado',
    aventureiros_da_matriz: 'Sem enredo registrado',
    unidos_da_tamarineira: 'Sem enredo registrado',
    tijuca: 'Três de Outubro',
    unidos_da_tijuca: 'Três de Outubro',
    coracoes_unidos_jacarepagua: 'Sem enredo registrado',
    prazer_da_serrinha: 'Sem enredo registrado',
    recreio_de_inhauma: 'Sem enredo registrado',
    cartolinhas_de_caxias: 'Sem enredo registrado',
    cabucu: 'Sem enredo registrado',
    unidos_do_cabucu: 'Sem enredo registrado',
    unidos_do_morro_azul: 'Sem enredo registrado',
    independentes_de_turiacu: 'Sem enredo registrado',
    unidos_do_coqueiro: 'Sem enredo registrado',
    em_cima_da_hora_catumbi: 'Sem enredo registrado',
    caprichosos_de_pilares: 'Alavanca do progresso',
    embaixadores_sao_joao_meriti: 'Sem enredo registrado',
    nao_e_o_que_dizem: 'Retirada da Laguna',
    cada_ano_sai_melhor: 'Sem enredo registrado',
    unidos_do_jacare: 'Sem enredo registrado',
    unidos_do_indaia: 'Homenagem à Força Expedicionária Brasileira',
    guarani_de_realengo: 'Sem enredo registrado'
  },
  1950: {
    // FBES
    imperio_serrano: 'Batalha Naval do Riachuelo',
    aprendizes_de_lucas: 'Uma festa na Igreja do Bonfim (Exaltação à Bahia)',
    irmaos_unidos_do_catete: 'Glória do Brasil',
    floresta_do_andarai: 'Homenagem a Oswaldo Cruz',
    imperio_da_tijuca: 'Primeiro governador do Brasil',
    indios_do_acau: 'Centenário de Rui Barbosa',
    azul_e_branco_salgueiro: 'Sob o império da lei - Homenagem a Rui Barbosa',
    independentes_cordovil: 'Iracema',
    independentes_leblon: 'Iracema',
    unidos_do_engenho_velho: 'Glórias do Brasil',
    mocidade_de_um_paraiso: 'Um domingo em festa na Feira de Santana',
    capricho_do_centenario: 'Concentração das borboletas no verão',
    estrela_de_ouro: 'Jardim em flores',
    independentes_do_rio: 'Homenagem aos Embaixadores do Samba',
    paraiso_da_mocidade: 'Alegoria carioca',
    uniao_vaz_lobo: 'Isto é Brasil',
    unidos_de_santo_amaro: 'Páginas da Glória',
    unidos_do_grajau: 'O civilizador das selvas',
    uniao_dos_casados: 'Brasil gigante',
    unidos_do_salgueiro: 'Maravilhas do Brasil',
    unidos_do_outeiro: 'Rondon, o civilizador das selvas brasileiras',
    engenho_da_rainha: 'Glória a Carlos Gomes',
    academicos_do_engenho_da_rainha: 'Glória a Carlos Gomes',
    vitoria_de_bento_ribeiro: 'Fundação da cidade de São Salvador',
    unidos_do_pecado: 'Culturas do Brasil',
    imperio_da_colina: 'Santos Dumont',
    orgulho_de_cordovil: 'O Rio de hoje',
    coracoes_unidos_da_favela: 'Academia do Samba',
    flor_do_lins: 'Azas do Brasil',
    unidos_do_itambi: 'Nossas homenagens',
    unidos_de_cosmos: 'Tardes de verão',
    imperio_do_samba: 'Proclamação da República',
    sem_voce_vivo_bem: 'Epopéia da Democracia',
    unidos_da_lagoa: 'Justa homenagem',
    unidos_da_barao_de_petropolis: 'Batalha Naval do Riachuelo',
    uniao_dos_topazios: 'Ruy Barbosa',
    unidos_dos_telegrafos: 'Sonho na Guanabara',
    coracoes_da_liberdade: 'Centenário de Ruy Barbosa',
    de_nos_ninguem_esquece: 'Baía na história do Brasil',
    // UCES
    mangueira: 'Plano Salte - Saúde, lavoura, transporte e educação',
    estacao_primeira_de_mangueira: 'Plano Salte - Saúde, lavoura, transporte e educação',
    portela: 'Riquezas do Brasil',
    tijuca: 'Homenagem a Santos Dumont',
    unidos_da_tijuca: 'Homenagem a Santos Dumont',
    coracoes_unidos_jacarepagua: 'Sem enredo registrado',
    vai_se_quiser: 'Sem enredo registrado',
    filhos_do_deserto: 'Pescaria',
    unidos_do_coqueiro: 'Sem enredo registrado',
    uniao_do_realengo: 'Sem enredo registrado',
    unidos_de_riachuelo: 'Sem enredo registrado',
    cada_ano_sai_melhor: 'Sem enredo registrado',
    voz_do_orion: 'Sem enredo registrado',
    // UGESB
    prazer_da_serrinha: 'Sem enredo registrado',
    unidos_da_capela: 'Sem enredo registrado',
    depois_eu_digo: 'Sem enredo registrado',
    paz_e_amor: 'Sem enredo registrado',
    tres_mosqueteiros: 'Sem enredo registrado',
    unidos_da_congonha: 'Sem enredo registrado',
    unidos_da_tamarineira: 'Sem enredo registrado',
    unidos_do_indaia: 'Sem enredo registrado',
    vila_isabel: 'Baía de Guanabara',
    unidos_de_vila_isabel: 'Baía de Guanabara',
    unidos_de_turiacu: 'Sem enredo registrado',
    recreio_de_inhauma: 'Sem enredo registrado',
    prazer_da_mocidade: 'Sem enredo registrado',
    cabucu: 'Sem enredo registrado',
    unidos_do_cabucu: 'Sem enredo registrado',
    caprichosos: 'Grito do Ipiranga',
    caprichosos_de_pilares: 'Grito do Ipiranga',
    em_cima_da_hora_catumbi: 'Sem enredo registrado',
    paraiso_da_floresta: 'Sem enredo registrado',
    unidos_de_terra_nova: 'Sem enredo registrado',
    uniao_de_sampaio: 'Sem enredo registrado',
    fiquei_firme: 'Sem enredo registrado'
  },
  1949: {
    // FBES
    imperio_serrano: 'Exaltação à Tiradentes',
    azul_e_branco_salgueiro: 'Ouro Negro',
    unidos_do_salgueiro: 'Maravilhas do Brasil ou Despedida da primavera',
    floresta_do_andarai: 'Tudo é Brasil',
    unidos_do_outeiro: 'Brasil de outrora',
    recreio_de_sao_carlos: 'Uma lavagem na igreja do Senhor do Bonfim',
    aprendizes_de_lucas: 'Salve o pandeiro',
    independentes_cordovil: 'Pedro Américo, a glória da pintura brasileira',
    independentes_leblon: 'Pedro Américo, a glória da pintura brasileira',
    filhos_do_deserto: 'Homenagem à Marinha',
    irmaos_unidos_do_catete: 'Música e poesia',
    unidos_de_santo_amaro: 'Primavera do samba',
    indios_do_acau: 'Romance de Ubirajara, a história de um índio',
    vitoria_de_bento_ribeiro: 'Progresso de Volta Redonda',
    flor_do_lins: 'O samba no Rio de Janeiro',
    manda_quem_pode: 'Festa da uva no Rio Grande',
    paraiso_das_morenas: 'Conferência de Haia',
    uniao_de_bras_de_pina: 'Pesca Nordeste',
    unidos_de_campo_grande: 'O sertão carioca em foco',
    imperio_da_colina: 'Marcílio Dias',
    azul_e_branco_de_bonsucesso: 'Asas do Brasil',
    uniao_primeira: 'Homenagem aos heróis da aviação brasileira',
    boemios_do_andarai: 'Uma história do Amazonas',
    coracoes_unidos_da_favela: 'Professores do samba',
    orgulho_de_cordovil: 'Morreu mas venceu',
    uniao_dos_casados: 'Sem enredo registrado',
    cabucu: 'Proclamador da República',
    unidos_do_cabucu: 'Proclamador da República',
    imperio_do_andarai: 'Tudo é possível',
    unidos_da_lagoa: 'Favela dos meus amores',
    // UGESB
    mangueira: 'Apologia aos mestres',
    estacao_primeira_de_mangueira: 'Apologia aos mestres',
    portela: 'O despertar de um gigante',
    depois_eu_digo: 'Sem enredo registrado',
    prazer_da_serrinha: 'Sem enredo registrado',
    unidos_da_capela: 'Sem enredo registrado',
    tijuca: 'Proclamação da República',
    unidos_da_tijuca: 'Proclamação da República',
    imperio_da_tijuca: 'Sem enredo registrado',
    vila_isabel: 'Iracema',
    unidos_de_vila_isabel: 'Iracema',
    baianinhas_brasileiras: 'Sem enredo registrado',
    unidos_de_turiacu: 'Sem enredo registrado',
    coracoes_unidos_jacarepagua: 'Sem enredo registrado',
    vai_se_quiser: 'Sem enredo registrado',
    paz_e_amor: 'Sem enredo registrado',
    em_cima_da_hora_catumbi: 'Sem enredo registrado',
    unidos_de_tomas_coelho: 'Sem enredo registrado',
    recreio_de_inhauma: 'Sem enredo registrado',
    unidos_do_morro_azul: 'Sem enredo registrado',
    uniao_do_realengo: 'Sem enredo registrado',
    unidos_do_iraja: 'Sem enredo registrado',
    imperio_de_campo_grande: 'Sem enredo registrado',
    nao_e_o_que_dizem: 'Sem enredo registrado',
    unidos_de_terra_nova: 'Sem enredo registrado',
    fiquei_firme: 'Sem enredo registrado',
    coracao_das_morenas: 'Sem enredo registrado'
  },
  1948: {
    imperio_serrano: 'Homenagem a Antônio Castro Alves',
    tijuca: 'Assinatura da Lei Áurea',
    unidos_da_tijuca: 'Assinatura da Lei Áurea',
    portela: 'Exaltação à Redentora',
    mangueira: 'Vale de São Francisco',
    estacao_primeira_de_mangueira: 'Vale de São Francisco',
    azul_e_branco_salgueiro: 'Fogo Simbólico',
    paz_e_amor: 'A lei do ventre livre',
    imperio_da_tijuca: 'Brasil império e Brasil república',
    prazer_da_serrinha: 'Glória aos volantes brasileiros',
    unidos_de_turiacu: 'Sem enredo registrado',
    depois_eu_digo: 'Um passo para a glória',
    independentes_cordovil: 'Conferência do Quitandinha',
    independentes_leblon: 'Conferência do Quitandinha',
    recreio_de_inhauma: 'Sem enredo registrado',
    aprendizes_de_lucas: 'Carlos Gomes, o imortal',
    paraiso_das_morenas: 'Sem enredo registrado',
    unidos_da_capela: 'Treze de Maio',
    irmaos_unidos_do_catete: 'Sem enredo registrado',
    vai_se_quiser: 'Sem enredo registrado',
    unidos_de_santo_amaro: 'O negro e o samba',
    estrela_de_ouro: 'Sem enredo registrado',
    cada_ano_sai_melhor: 'Exaltação à Princesa Isabel',
    unidos_do_salgueiro: 'Sem enredo registrado',
    cabucu: 'Brasil, celeiro do mundo',
    unidos_do_cabucu: 'Brasil, celeiro do mundo',
    coracoes_unidos_da_favela: 'Sem enredo registrado',
    sem_voce_vivo_bem: 'Sem enredo registrado',
    unidos_de_bras_de_pina: 'Sem enredo registrado',
    unidos_de_cavalcante: 'Sem enredo registrado',
    unidos_de_tomas_coelho: 'Sem enredo registrado',
    mocidade_de_cachambi: 'Sem enredo registrado',
    unidos_do_morro_azul: 'Produção do Brasil',
    unidos_do_outeiro: 'Sem enredo registrado',
    imperio_da_colina: 'Sem enredo registrado',
    paraiso_do_grotao: 'Sem enredo registrado',
    mocidade_de_um_paraiso: 'Querido Brasil',
    inimigos_da_tristeza: 'Sem enredo registrado',
    uniao_vaz_lobo: 'Sem enredo registrado',
    unidos_do_castelo: 'Sem enredo registrado',
    unidos_da_lagoa: 'Sem enredo registrado'
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
    unidos_do_catete: 'Catete Velho',
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
    portela: 'Alvorada do novo mundo',
    mangueira: 'Carnaval da vitória',
    depois_eu_digo: 'Tomada de Monte Castelo',
    imperio_da_tijuca: 'Aos heróis do Monte Castelo',
    azul_e_branco_salgueiro: 'Cruzada da Vitória',
    paz_e_amor: 'Mensageiros do samba na Assembléia das Reparações',
    lira_do_amor: 'A Lira no Salão de 1946',
    tijuca: 'Anjos da paz',
    unidos_da_capela: 'Jardim de Alá',
    filhos_do_deserto: 'O samba na cidade',
    prazer_da_serrinha: 'Conferência de São Francisco',
    unidos_do_salgueiro: 'Recordando a história',
    coracoes_unidos_jacarepagua: 'As armas da vitória',
    nao_e_o_que_dizem: 'A chegada do herói brasileiro',
    vai_se_quiser: 'Pela vitória das Armas do Brasil',
    cada_ano_sai_melhor: 'Uma festa na Bahia',
    uniao_primeira: 'Homenagem às escolas de samba',
    fiquei_firme: 'Louros da vitória',
    mocidade_louca_sao_cristovao: 'Alvorada de Paz'
  },
  1945: {
    portela: 'Motivos patrióticos',
    mangueira: 'A nossa história'
  },
  1944: {
    portela: 'Brasil glorioso',
    mangueira: 'Glória ao samba'
  },
  1943: {
    portela: 'Carnaval de guerra',
    mangueira: 'Samba no Palácio Itamarati',
    azul_e_branco_salgueiro: 'Alô, Alô, América',
    deixa_malhar: 'Sem enredo registrado',
    coracoes_unidos_jacarepagua: 'Sem enredo registrado',
    cada_ano_sai_melhor: 'Sem enredo registrado',
    depois_eu_digo: 'Sem enredo registrado',
    fiquei_firme: 'Sem enredo registrado',
    imperio_da_tijuca: 'Sem enredo registrado',
    lira_do_amor: 'Sem enredo registrado',
    mocidade_louca_sao_cristovao: 'Sem enredo registrado',
    nao_e_o_que_dizem: 'Sem enredo registrado',
    paz_e_amor: 'Sem enredo registrado',
    prazer_da_serrinha: 'Sem enredo registrado',
    uniao_de_sampaio: 'Sem enredo registrado',
    tijuca: 'Sem enredo registrado',
    unidos_do_salgueiro: 'Sem enredo registrado',
    unidos_do_tuiuti: 'Sem enredo registrado',
    vai_se_quiser: 'Sem enredo registrado'
  },
  1942: {
    portela: 'A Vida do Samba',
    depois_eu_digo: 'Uma noite feliz',
    mangueira: 'A vitória do samba nas Américas',
    paz_e_amor: 'Brasil, Joia Fraternal da América',
    deixa_malhar: 'Homenagem aos Jangadeiros',
    unidos_do_salgueiro: 'A Rainha e a Baiana',
    papagaio_linguarudo: 'Sem enredo registrado',
    cada_ano_sai_melhor: 'O Homem que Sonhou com o Baile',
    azul_e_branco_salgueiro: 'Sem enredo registrado',
    fiquei_firme: 'Sem enredo registrado',
    uniao_de_sampaio: 'Sem enredo registrado',
    unidos_do_tuiuti: 'Sem enredo registrado',
    nao_e_o_que_dizem: 'Sem enredo registrado',
    mocidade_de_um_paraiso: 'Sem enredo registrado',
    tijuca: 'Sem enredo registrado',
    prazer_da_serrinha: 'Cais dourado',
    mocidade_louca_sao_cristovao: 'Sem enredo registrado',
    unidos_de_riachuelo: 'Sem enredo registrado',
    paraiso_de_anchieta: 'Sem enredo registrado',
    uniao_de_colegio: 'Sem enredo registrado',
    paraiso_do_grotao: 'Sem enredo registrado',
    flor_da_infancia_bras_de_pina: 'Sem enredo registrado',
    vai_se_quiser: 'Riquezas do Brasil'
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
    if (
      id === 'grande_rio_duque_de_caxias' ||
      id.includes('grande_rio_duque_de_caxias') ||
      id === 'grande_rio_antiga' ||
      id.includes('grande_rio_antiga') ||
      id === 'gres_grande_rio' ||
      id.includes('gres_grande_rio')
    ) {
      return 'grande_rio_duque_de_caxias';
    }
    if (id === 'folioes_de_botafogo' || id.includes('folioes')) return 'folioes_de_botafogo';
    if (id === 'botafogo_samba_clube' || id.includes('botafogo_samba_clube')) return 'botafogo_samba_clube';
    if (id === 'imperio_de_jacarepagua' || id.includes('imperio_de_jacarepagua') || id.includes('imperio_da_jacarepagua')) return 'imperio_de_jacarepagua';
    if (id === 'coracoes_unidos_jacarepagua' || id.includes('coracoes_unidos_jacarepagua')) return 'coracoes_unidos_jacarepagua';
    if (id === 'independente_de_jacarepagua' || id.includes('independente_de_jacarepagua')) return 'independente_de_jacarepagua';
    if (id === 'uniao_de_jacarepagua' || id.includes('uniao_de_jacarepagua')) return 'uniao_de_jacarepagua';
    if (id === 'independentes_do_zumbi' || id.includes('zumbi')) return 'independentes_do_zumbi';
    if (id === 'unidos_da_vila_sao_luis' || id.includes('vila_sao_luis')) return 'unidos_da_vila_sao_luis';
    if (id.includes('unidos_da_mangueira')) return 'unidos_da_mangueira';
    if (id.includes('uniao_barao_da_gamboa')) return 'uniao_barao_da_gamboa';
    if (id.includes('ultima_hora')) return 'ultima_hora';
    if (id.includes('unidos_do_tuiuti')) return 'unidos_do_tuiuti';
    if (id.includes('uniao_parada_de_lucas')) return 'uniao_parada_de_lucas';
    if (id.includes('uniao_da_mocidade')) return 'uniao_da_mocidade';
    if (id.includes('unidos_da_mocidade')) return 'unidos_da_mocidade';
    if (id.includes('recreio_da_mocidade')) return 'recreio_da_mocidade';
    if (id.includes('prazer_da_mocidade')) return 'prazer_da_mocidade';
    if (id.includes('paraiso_da_mocidade')) return 'paraiso_da_mocidade';
    if (id.includes('mocidade_de_um_paraiso')) return 'mocidade_de_um_paraiso';
    if (id.includes('mocidade_de_cachambi')) return 'mocidade_de_cachambi';
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
    if (id.includes('cidade_de_deus') || id.includes('cidade de deus')) return 'mocidade_cidade_de_deus';
    if (id.includes('cordovil') || id.includes('leblon')) return 'independentes_cordovil';
    if (id.includes('cartolinhas')) return 'cartolinhas_de_caxias';
    if (id.includes('manguinhos')) return 'unidos_de_manguinhos';
    if (id.includes('jardim')) return 'unidos_do_jardim';
    if (id.includes('aprendizes_de_lucas')) return 'aprendizes_de_lucas';
    if (id.includes('capela')) return 'unidos_da_capela';
    if (id.includes('centenario')) return 'uniao_do_centenario';
    if (id.includes('maranga')) return 'imperio_do_maranga';
    if (id.includes('cruzeiro')) return 'uniao_do_cruzeiro';
    if (id.includes('santo_antonio')) return 'unidos_de_santo_antonio';
    if (id.includes('arapa')) return 'unidos_do_arapa';
    if (id.includes('santa_tereza') || id.includes('santa_theresa')) return 'vila_santa_tereza';
    if (id === 'azul_e_branco_salgueiro' || id.includes('azul_e_branco_salgueiro')) return 'azul_e_branco_salgueiro';
    if (id === 'unidos_do_salgueiro' || id.includes('unidos_do_salgueiro')) return 'unidos_do_salgueiro';
    if (id === 'salgueiro' || id.includes('academicos_do_salgueiro')) return 'salgueiro';
    if (
      id === 'em_cima_da_hora_catumbi' ||
      id.includes('em_cima_da_hora_catumbi') ||
      (id.includes('cima_da_hora') && id.includes('catumbi'))
    ) {
      return 'em_cima_da_hora_catumbi';
    }
    if (id === 'em_cima_da_hora' || id.includes('em_cima_da_hora')) return 'em_cima_da_hora';
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
  if (n.includes('mangueira')) return 'mangueira';
  if (n.includes('tijuca') && !n.includes('império')) return 'tijuca';
  if (
    n.includes('grande_rio_duque_de_caxias') ||
    n.includes('grande rio (antiga)') ||
    n.includes('grande rio antiga') ||
    n.includes('gres grande rio') ||
    n.includes('duque de caxias') ||
    (n.includes('grande rio') && !n.includes('acadêmicos') && !n.includes('academicos') && rawId !== 'grande_rio')
  ) {
    return 'grande_rio_duque_de_caxias';
  }
  if (n.includes('grande rio')) return 'grande_rio';
  if (n.includes('foliões') || n.includes('folioes')) return 'folioes_de_botafogo';
  if (n.includes('botafogo samba clube') || (n.includes('botafogo') && !n.includes('foliões') && !n.includes('folioes'))) return 'botafogo_samba_clube';
  if (n.includes('zumbi')) return 'independentes_do_zumbi';
  if (n.includes('vila são luís') || n.includes('vila sao luis') || n.includes('vila_sao_luis')) return 'unidos_da_vila_sao_luis';
  if (n.includes('unidos do tuiuti')) return 'unidos_do_tuiuti';
  if (n.includes('tuiuti')) return 'tuiuti';
  if (n.includes('portela')) return 'portela';
  if (n.includes('cidade de deus')) return 'mocidade_cidade_de_deus';
  if (n.includes('união da mocidade') || n.includes('uniao da mocidade')) return 'uniao_da_mocidade';
  if (n.includes('unidos da mocidade')) return 'unidos_da_mocidade';
  if (n.includes('recreio da mocidade')) return 'recreio_da_mocidade';
  if (n.includes('prazer da mocidade')) return 'prazer_da_mocidade';
  if (n.includes('paraíso da mocidade') || n.includes('paraiso da mocidade')) return 'paraiso_da_mocidade';
  if (n.includes('mocidade de um paraíso') || n.includes('mocidade de um paraiso')) return 'mocidade_de_um_paraiso';
  if (n.includes('mocidade de cachambi')) return 'mocidade_de_cachambi';
  if (n.includes('mocidade unidos do riachuelo') || n.includes('modelo unidos do riachuelo')) return 'mocidade_unidos_do_riachuelo';
  if (n.includes('mocidade louca')) return 'mocidade_louca_sao_cristovao';
  if (n.includes('mocidade') && !n.includes('cidade de deus') && !n.includes('santa marta') && !n.includes('vicente')) return 'mocidade';
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
  if (n.includes('dendê') || n.includes('dende')) return 'academicos_do_dende';
  if (n.includes('niterói') || n.includes('niteroi')) return 'niteroi';
  if (n.includes('arrastão') || n.includes('arrastao')) return 'arrastao_cascadura';
  if (n.includes('arranco')) return 'arranco';
  if (n.includes('aprendizes de lucas')) return 'aprendizes_de_lucas';
  if (n.includes('capela')) return 'unidos_da_capela';
  if (n.includes('lucas')) return 'unidos_de_lucas';
  if (n.includes('lins')) return 'lins_imperial';
  // Distinção fundamental: Em Cima da Hora do Catumbi (inativa, Catumbi) vs G.R.E.S. Em Cima da Hora (fundada em 1958, Cavalcanti)
  if (
    n.includes('em cima da hora do catumbi') ||
    (n.includes('cima da hora') && n.includes('catumbi'))
  ) {
    return 'em_cima_da_hora_catumbi';
  }
  if (n.includes('cima da hora')) return 'em_cima_da_hora';
  if (n.includes('flor da infância') || n.includes('flor da infancia')) return 'flor_da_infancia_bras_de_pina';
  if (n.includes('unidos de brás de pina') || n.includes('unidos de bras de pina')) return 'unidos_de_bras_de_pina';
  if (n.includes('união de brás de pina') || n.includes('uniao de bras de pina')) return 'uniao_de_bras_de_pina';
  if (n.includes('tupy') || n.includes('brás de pina') || n.includes('bras de pina')) return 'tupy_bras_de_pina';
  if (n.includes('império de campo grande') || n.includes('imperio de campo grande')) return 'imperio_de_campo_grande';
  if (n.includes('império de jacarepaguá') || n.includes('imperio de jacarepagua') || n.includes('império da jacarepaguá') || n.includes('imperio da jacarepagua')) return 'imperio_de_jacarepagua';
  if (n.includes('corações unidos') || n.includes('coracoes unidos')) return 'coracoes_unidos_jacarepagua';
  if (n.includes('independente de jacarepaguá') || n.includes('independente de jacarepagua')) return 'independente_de_jacarepagua';
  if (n.includes('união de jacarepaguá') || n.includes('uniao de jacarepagua')) return 'uniao_de_jacarepagua';
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
  if (n.includes('aprendizes da gávea') || n.includes('aprendizes da gavea') || n.includes('aprendizes de copacabana')) return 'aprendizes_da_gavea';
  if (n.includes('centenário') || n.includes('centenario')) return 'uniao_do_centenario';
  if (n.includes('vaz lobo')) return 'uniao_vaz_lobo';
  if (n.includes('cordovil') || n.includes('leblon')) return 'independentes_cordovil';
  if (n.includes('cartolinhas')) return 'cartolinhas_de_caxias';
  if (n.includes('manguinhos')) return 'unidos_de_manguinhos';
  if (n.includes('jardim')) return 'unidos_do_jardim';
  if (n.includes('marangá') || n.includes('maranga')) return 'imperio_do_maranga';
  if (n.includes('união do cruzeiro') || n.includes('uniao do cruzeiro')) return 'uniao_do_cruzeiro';
  if (n.includes('santo antônio') || n.includes('santo antonio')) return 'unidos_de_santo_antonio';
  if (n.includes('arapá') || n.includes('arapa')) return 'unidos_do_arapa';
  if (n.includes('cosmos')) return 'unidos_de_cosmos';
  if (n.includes('engenho velho')) return 'unidos_do_engenho_velho';
  if (n.includes('barão de petrópolis') || n.includes('barao de petropolis')) return 'unidos_da_barao_de_petropolis';
  if (n.includes('topázios') || n.includes('topazios')) return 'uniao_dos_topazios';
  if (n.includes('sem você vivo bem') || n.includes('sem voce vivo bem')) return 'sem_voce_vivo_bem';
  if (n.includes('império da colina') || n.includes('imperio da colina')) return 'imperio_da_colina';
  if (n.includes('império do samba') || n.includes('imperio do samba')) return 'imperio_do_samba';
  if (n.includes('de nós ninguém esquece') || n.includes('de nos ninguem esquece')) return 'de_nos_ninguem_esquece';
  if (n.includes('corações da liberdade') || n.includes('coracoes da liberdade')) return 'coracoes_da_liberdade';
  if (n.includes('orion') || n.includes('órion')) return 'voz_do_orion';
  if (n.includes('coqueiro')) return 'unidos_do_coqueiro';
  if (n.includes('terra nova')) return 'unidos_de_terra_nova';
  if (n.includes('paraiso da floresta') || n.includes('paraíso da floresta')) return 'paraiso_da_floresta';
  if (n.includes('manda quem pode')) return 'manda_quem_pode';
  if (n.includes('paraiso das morenas') || n.includes('paraíso das morenas')) return 'paraiso_das_morenas';
  if (n.includes('união primeira') || n.includes('uniao primeira')) return 'uniao_primeira';
  if (n.includes('boêmios do andaraí') || n.includes('boemios do andarai')) return 'boemios_do_andarai';
  if (n.includes('império do andaraí') || n.includes('imperio do andarai')) return 'imperio_do_andarai';
  if (n.includes('tomás coelho') || n.includes('tomas coelho')) return 'unidos_de_tomas_coelho';
  if (n.includes('irajá') || n.includes('iraja')) return 'unidos_do_iraja';
  if (n.includes('coração das morenas') || n.includes('coracao das morenas')) return 'coracao_das_morenas';
  if (n.includes('baianinhas')) return 'baianinhas_brasileiras';
  if (n.includes('santa tereza') || n.includes('santa theresa')) return 'vila_santa_tereza';
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

  // Isolamento estrito: Império de Jacarepaguá é uma escola diferente da União de Jacarepaguá
  const isImperioDeJacarepaguaTarget =
    key === 'imperio_de_jacarepagua' ||
    schoolId === 'imperio_de_jacarepagua' ||
    canonKey === 'imperio_de_jacarepagua' ||
    (schoolName &&
      (schoolName.toLowerCase().includes('império de jacarepaguá') ||
        schoolName.toLowerCase().includes('imperio de jacarepagua') ||
        schoolName.toLowerCase().includes('império da jacarepaguá') ||
        schoolName.toLowerCase().includes('imperio da jacarepagua')));

  if (isImperioDeJacarepaguaTarget) {
    const yrRecs = HISTORICAL_ENREDOS_BY_YEAR[year];
    if (yrRecs) {
      const enredo = yrRecs['imperio_de_jacarepagua'] || yrRecs['imperio_da_jacarepagua'];
      if (enredo) return enredo;
    }
    if (inGameHistory && inGameHistory.length > 0) {
      const histYear = inGameHistory.find((h) => h.year === year);
      if (histYear?.schoolEnredos) {
        const match = histYear.schoolEnredos['imperio_de_jacarepagua'] || histYear.schoolEnredos['imperio_da_jacarepagua'];
        if (match) return match;
      }
    }
    if (schoolObj?.enredoHistory && schoolObj.enredoHistory.length > 0) {
      const match = schoolObj.enredoHistory.find((h) => h.year === year);
      if (match?.enredo) return match.enredo;
    }
    return undefined;
  }

  // Isolamento estrito: Unidos do Tuiuti (fundada em 1940, azul e branco, inativa) é distinta da Paraíso do Tuiuti (fundada em 1954, azul e amarelo)
  const isUnidosDoTuiutiTarget =
    key === 'unidos_do_tuiuti' ||
    schoolId === 'unidos_do_tuiuti' ||
    canonKey === 'unidos_do_tuiuti' ||
    (schoolName && schoolName.toLowerCase().includes('unidos do tuiuti'));

  if (isUnidosDoTuiutiTarget) {
    const yrRecs = HISTORICAL_ENREDOS_BY_YEAR[year];
    if (yrRecs) {
      const enredo = yrRecs['unidos_do_tuiuti'];
      if (enredo) return enredo;
    }
    if (inGameHistory && inGameHistory.length > 0) {
      const histYear = inGameHistory.find((h) => h.year === year);
      if (histYear?.schoolEnredos) {
        const match = histYear.schoolEnredos['unidos_do_tuiuti'];
        if (match) return match;
      }
    }
    if (schoolObj?.enredoHistory && schoolObj.enredoHistory.length > 0) {
      const match = schoolObj.enredoHistory.find((h) => h.year === year);
      if (match?.enredo) return match.enredo;
    }
    return undefined;
  }

  // Paraíso do Tuiuti só desfilou a partir de 1954/1955 e nunca herda enredos da Unidos do Tuiuti
  const isParaisoDoTuiutiTarget =
    (key === 'tuiuti' || key === 'paraiso_do_tuiuti' || schoolId === 'tuiuti' || schoolId === 'paraiso_do_tuiuti' || canonKey === 'tuiuti') &&
    !isUnidosDoTuiutiTarget;

  if (isParaisoDoTuiutiTarget && year < 1954) {
    return undefined;
  }

  // Isolamento estrito: Azul e Branco do Salgueiro vs Acadêmicos do Salgueiro
  const isAzulEBrancoSalgueiroTarget =
    key === 'azul_e_branco_salgueiro' ||
    schoolId === 'azul_e_branco_salgueiro' ||
    canonKey === 'azul_e_branco_salgueiro' ||
    (schoolName &&
      schoolName.toLowerCase().includes('azul e branco') &&
      schoolName.toLowerCase().includes('salgueiro'));

  if (isAzulEBrancoSalgueiroTarget) {
    if (year > 1953) return undefined;
    const yrRecs = HISTORICAL_ENREDOS_BY_YEAR[year];
    if (yrRecs) {
      const enredo = yrRecs['azul_e_branco_salgueiro'];
      if (enredo) return enredo;
    }
    return undefined;
  }

  // Acadêmicos do Salgueiro (fundada em 1953, primeiro desfile em 1954): nunca herda enredos anteriores a 1954
  const isSalgueiroTarget =
    (key === 'salgueiro' || schoolId === 'salgueiro' || canonKey === 'salgueiro' || (schoolName && schoolName.toLowerCase().includes('salgueiro'))) &&
    !isAzulEBrancoSalgueiroTarget &&
    key !== 'unidos_do_salgueiro' &&
    schoolId !== 'unidos_do_salgueiro' &&
    canonKey !== 'unidos_do_salgueiro' &&
    !(schoolName && schoolName.toLowerCase().includes('unidos do salgueiro'));

  if (isSalgueiroTarget && year < 1954) {
    return undefined;
  }

  // Isolamento estrito: Em Cima da Hora do Catumbi (inativa, Catumbi) vs Em Cima da Hora de Cavalcanti (fundada em 1958)
  const isCatumbiTarget =
    key === 'em_cima_da_hora_catumbi' ||
    schoolId === 'em_cima_da_hora_catumbi' ||
    canonKey === 'em_cima_da_hora_catumbi' ||
    (schoolName &&
      schoolName.toLowerCase().includes('cima da hora') &&
      schoolName.toLowerCase().includes('catumbi'));

  if (isCatumbiTarget) {
    const yrRecs = HISTORICAL_ENREDOS_BY_YEAR[year];
    if (yrRecs) {
      const enredo = yrRecs['em_cima_da_hora_catumbi'];
      if (enredo) return enredo;
    }
    return undefined;
  }

  const isEmCimaDaHoraCavalcantiTarget =
    (key === 'em_cima_da_hora' || schoolId === 'em_cima_da_hora' || canonKey === 'em_cima_da_hora' || (schoolName && schoolName.toLowerCase().includes('cima da hora'))) &&
    !isCatumbiTarget;

  if (isEmCimaDaHoraCavalcantiTarget && year < 1958) {
    return undefined;
  }

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

  // Distinção fundamental: G.R.E.S. Grande Rio antiga (1971-1988, extinta antes da fundação da Acadêmicos do Grande Rio)
  // Seu catálogo compreende estritamente anos anteriores a 1989 (ex: 1977: "Os precursores"),
  // garantindo de forma absoluta que nunca exiba os enredos da atual Acadêmicos do Grande Rio (1990 em diante).
  const isOldGrandeRio =
    key === 'grande_rio_antiga' ||
    key === 'grande_rio_duque_de_caxias' ||
    schoolId === 'grande_rio_antiga' ||
    schoolId === 'grande_rio_duque_de_caxias' ||
    canonKey === 'grande_rio_antiga' ||
    canonKey === 'grande_rio_duque_de_caxias' ||
    (schoolName &&
      schoolName.toLowerCase().includes('grande rio') &&
      !schoolName.toLowerCase().includes('acadêmicos') &&
      !schoolName.toLowerCase().includes('academicos') &&
      schoolId !== 'grande_rio');

  if (isOldGrandeRio) {
    const oldEnredos: { year: number; enredo: string }[] = [];
    const years = Object.keys(HISTORICAL_ENREDOS_BY_YEAR)
      .map(Number)
      .sort((a, b) => b - a);

    years.forEach((yr) => {
      if (yr <= 1988) {
        const yearRecords = HISTORICAL_ENREDOS_BY_YEAR[yr];
        if (yearRecords) {
          const enredo =
            yearRecords['grande_rio_duque_de_caxias'] ||
            yearRecords['grande_rio_antiga'] ||
            yearRecords['gres_grande_rio'] ||
            yearRecords[schoolId] ||
            (schoolName && yearRecords[schoolName.toLowerCase()]);
          if (enredo) {
            oldEnredos.push({ year: yr, enredo });
          }
        }
      }
    });

    return oldEnredos;
  }

  // Foliões de Botafogo (fundada em 1950, inativa): agremiação histórica independente e sem vínculo com a Botafogo Samba Clube (fundada em 2018).
  // Seu histórico catalogado compreende exclusivamente seus desfiles oficiais históricos (ex: 1977 "O cortiço", 1976 "Festa do Bonfim") e jamais enredos da Botafogo Samba Clube.
  const isFolioesDeBotafogo =
    key === 'folioes_de_botafogo' ||
    key === 'folioes' ||
    schoolId === 'folioes_de_botafogo' ||
    schoolId === 'folioes' ||
    canonKey === 'folioes_de_botafogo' ||
    (schoolName && (schoolName.toLowerCase().includes('foliões') || schoolName.toLowerCase().includes('folioes')));

  if (isFolioesDeBotafogo) {
    const folioesEnredos: { year: number; enredo: string }[] = [];
    const years = Object.keys(HISTORICAL_ENREDOS_BY_YEAR)
      .map(Number)
      .sort((a, b) => b - a);

    years.forEach((yr) => {
      if (yr < 2018) {
        const yearRecords = HISTORICAL_ENREDOS_BY_YEAR[yr];
        if (yearRecords) {
          const enredo =
            yearRecords['folioes_de_botafogo'] ||
            yearRecords['folioes'] ||
            yearRecords[schoolId] ||
            (schoolName && yearRecords[schoolName.toLowerCase()]);
          if (enredo) {
            folioesEnredos.push({ year: yr, enredo });
          }
        }
      }
    });

    return folioesEnredos;
  }

  // Império de Jacarepaguá (fundada na década de 1950, inativa): agremiação histórica independente e sem vínculo com a União de Jacarepaguá.
  // Seu histórico catalogado compreende estritamente suas próprias participações oficiais (ex: 1956: "Indígenas do Brasil"),
  // garantindo de forma absoluta que NUNCA herde ou exiba os enredos da União de Jacarepaguá.
  const isImperioDeJacarepagua =
    key === 'imperio_de_jacarepagua' ||
    schoolId === 'imperio_de_jacarepagua' ||
    canonKey === 'imperio_de_jacarepagua' ||
    (schoolName &&
      (schoolName.toLowerCase().includes('império de jacarepaguá') ||
        schoolName.toLowerCase().includes('imperio de jacarepagua') ||
        schoolName.toLowerCase().includes('império da jacarepaguá') ||
        schoolName.toLowerCase().includes('imperio da jacarepagua')));

  if (isImperioDeJacarepagua) {
    const imperioJacarepaguaEnredos: { year: number; enredo: string }[] = [];
    const years = Object.keys(HISTORICAL_ENREDOS_BY_YEAR)
      .map(Number)
      .sort((a, b) => b - a);

    years.forEach((yr) => {
      const yearRecords = HISTORICAL_ENREDOS_BY_YEAR[yr];
      if (yearRecords) {
        const enredo =
          yearRecords['imperio_de_jacarepagua'] ||
          yearRecords['imperio_da_jacarepagua'];
        if (enredo) {
          imperioJacarepaguaEnredos.push({ year: yr, enredo });
        }
      }
    });

    if (inGameHistory && inGameHistory.length > 0) {
      inGameHistory.forEach((h) => {
        if (h.schoolEnredos && (h.schoolEnredos['imperio_de_jacarepagua'] || h.schoolEnredos['imperio_da_jacarepagua'])) {
          const match = h.schoolEnredos['imperio_de_jacarepagua'] || h.schoolEnredos['imperio_da_jacarepagua'];
          if (match && !imperioJacarepaguaEnredos.some((e) => e.year === h.year)) {
            imperioJacarepaguaEnredos.push({ year: h.year, enredo: match });
          }
        }
      });
    }

    if (schoolObj?.enredoHistory && schoolObj.enredoHistory.length > 0) {
      schoolObj.enredoHistory.forEach((item) => {
        if (item.year && item.enredo && !imperioJacarepaguaEnredos.some((e) => e.year === item.year)) {
          imperioJacarepaguaEnredos.push({ year: item.year, enredo: item.enredo });
        }
      });
    }

    return imperioJacarepaguaEnredos.sort((a, b) => b.year - a.year);
  }

  // Unidos do Tuiuti (fundada em 1940, azul e branco, inativa): agremiação histórica independente e sem vínculo com a Paraíso do Tuiuti (fundada em 1954).
  // Seu histórico catalogado compreende estritamente suas próprias participações oficiais históricas (ex: 1941, 1942, 1945, 1946, 1947, 1948, 1954),
  // garantindo de forma absoluta que NUNCA herde ou exiba os enredos da Paraíso do Tuiuti.
  const isUnidosDoTuiuti =
    key === 'unidos_do_tuiuti' ||
    schoolId === 'unidos_do_tuiuti' ||
    canonKey === 'unidos_do_tuiuti' ||
    (schoolName && schoolName.toLowerCase().includes('unidos do tuiuti'));

  if (isUnidosDoTuiuti) {
    const unidosTuiutiEnredos: { year: number; enredo: string }[] = [];
    const years = Object.keys(HISTORICAL_ENREDOS_BY_YEAR)
      .map(Number)
      .sort((a, b) => b - a);

    years.forEach((yr) => {
      const yearRecords = HISTORICAL_ENREDOS_BY_YEAR[yr];
      if (yearRecords) {
        const enredo = yearRecords['unidos_do_tuiuti'];
        if (enredo) {
          unidosTuiutiEnredos.push({ year: yr, enredo });
        }
      }
    });

    if (inGameHistory && inGameHistory.length > 0) {
      inGameHistory.forEach((h) => {
        if (h.schoolEnredos && h.schoolEnredos['unidos_do_tuiuti']) {
          const match = h.schoolEnredos['unidos_do_tuiuti'];
          if (match && !unidosTuiutiEnredos.some((e) => e.year === h.year)) {
            unidosTuiutiEnredos.push({ year: h.year, enredo: match });
          }
        }
      });
    }

    if (schoolObj?.enredoHistory && schoolObj.enredoHistory.length > 0) {
      schoolObj.enredoHistory.forEach((item) => {
        if (item.year && item.enredo && !unidosTuiutiEnredos.some((e) => e.year === item.year)) {
          unidosTuiutiEnredos.push({ year: item.year, enredo: item.enredo });
        }
      });
    }

    return unidosTuiutiEnredos.sort((a, b) => b.year - a.year);
  }

  // União da Mocidade (inativa): agremiação histórica independente e sem vínculo com a Mocidade Independente de Padre Miguel.
  // Seu histórico catalogado compreende estritamente suas próprias participações oficiais históricas (ex: 1950, 1951, etc.),
  // garantindo de forma absoluta que NUNCA herde ou exiba os enredos da Mocidade Independente nem de outras escolas.
  const isUniaoDaMocidade =
    key === 'uniao_da_mocidade' ||
    schoolId === 'uniao_da_mocidade' ||
    canonKey === 'uniao_da_mocidade' ||
    (schoolName &&
      (schoolName.toLowerCase().includes('união da mocidade') || schoolName.toLowerCase().includes('uniao da mocidade')));

  if (isUniaoDaMocidade) {
    const uniaoMocidadeEnredos: { year: number; enredo: string }[] = [];
    const years = Object.keys(HISTORICAL_ENREDOS_BY_YEAR)
      .map(Number)
      .sort((a, b) => b - a);

    years.forEach((yr) => {
      const yearRecords = HISTORICAL_ENREDOS_BY_YEAR[yr];
      if (yearRecords) {
        const enredo = yearRecords['uniao_da_mocidade'];
        if (enredo) {
          uniaoMocidadeEnredos.push({ year: yr, enredo });
        }
      }
    });

    if (inGameHistory && inGameHistory.length > 0) {
      inGameHistory.forEach((h) => {
        if (h.schoolEnredos && h.schoolEnredos['uniao_da_mocidade']) {
          const match = h.schoolEnredos['uniao_da_mocidade'];
          if (match && !uniaoMocidadeEnredos.some((e) => e.year === h.year)) {
            uniaoMocidadeEnredos.push({ year: h.year, enredo: match });
          }
        }
      });
    }

    if (schoolObj?.enredoHistory && schoolObj.enredoHistory.length > 0) {
      schoolObj.enredoHistory.forEach((item) => {
        if (item.year && item.enredo && !uniaoMocidadeEnredos.some((e) => e.year === item.year)) {
          uniaoMocidadeEnredos.push({ year: item.year, enredo: item.enredo });
        }
      });
    }

    return uniaoMocidadeEnredos.sort((a, b) => b.year - a.year);
  }

  // Unidos da Mocidade (inativa): agremiação histórica participante da Série Ouro em 1952.
  // Seu histórico catalogado compreende estritamente suas próprias participações oficiais históricas (ex: 1952: "Uma homenagem à imprensa"),
  // garantindo de forma absoluta que NUNCA herde ou exiba os enredos da Mocidade Independente nem de outras escolas.
  const isUnidosDaMocidade =
    key === 'unidos_da_mocidade' ||
    schoolId === 'unidos_da_mocidade' ||
    canonKey === 'unidos_da_mocidade' ||
    (schoolName && schoolName.toLowerCase().includes('unidos da mocidade'));

  if (isUnidosDaMocidade) {
    const unidosMocidadeEnredos: { year: number; enredo: string }[] = [];
    const years = Object.keys(HISTORICAL_ENREDOS_BY_YEAR)
      .map(Number)
      .sort((a, b) => b - a);

    years.forEach((yr) => {
      const yearRecords = HISTORICAL_ENREDOS_BY_YEAR[yr];
      if (yearRecords) {
        const enredo = yearRecords['unidos_da_mocidade'];
        if (enredo) {
          unidosMocidadeEnredos.push({ year: yr, enredo });
        }
      }
    });

    if (inGameHistory && inGameHistory.length > 0) {
      inGameHistory.forEach((h) => {
        if (h.schoolEnredos && h.schoolEnredos['unidos_da_mocidade']) {
          const match = h.schoolEnredos['unidos_da_mocidade'];
          if (match && !unidosMocidadeEnredos.some((e) => e.year === h.year)) {
            unidosMocidadeEnredos.push({ year: h.year, enredo: match });
          }
        }
      });
    }

    if (schoolObj?.enredoHistory && schoolObj.enredoHistory.length > 0) {
      schoolObj.enredoHistory.forEach((item) => {
        if (item.year && item.enredo && !unidosMocidadeEnredos.some((e) => e.year === item.year)) {
          unidosMocidadeEnredos.push({ year: item.year, enredo: item.enredo });
        }
      });
    }

    return unidosMocidadeEnredos.sort((a, b) => b.year - a.year);
  }

  // Recreio da Mocidade (inativa): agremiação histórica participante da Série Ouro em 1953.
  const isRecreioDaMocidade =
    key === 'recreio_da_mocidade' ||
    schoolId === 'recreio_da_mocidade' ||
    canonKey === 'recreio_da_mocidade' ||
    (schoolName && schoolName.toLowerCase().includes('recreio da mocidade'));

  if (isRecreioDaMocidade) {
    const recreioMocidadeEnredos: { year: number; enredo: string }[] = [];
    const years = Object.keys(HISTORICAL_ENREDOS_BY_YEAR)
      .map(Number)
      .sort((a, b) => b - a);

    years.forEach((yr) => {
      const yearRecords = HISTORICAL_ENREDOS_BY_YEAR[yr];
      if (yearRecords) {
        const enredo = yearRecords['recreio_da_mocidade'];
        if (enredo) {
          recreioMocidadeEnredos.push({ year: yr, enredo });
        }
      }
    });

    if (inGameHistory && inGameHistory.length > 0) {
      inGameHistory.forEach((h) => {
        if (h.schoolEnredos && h.schoolEnredos['recreio_da_mocidade']) {
          const match = h.schoolEnredos['recreio_da_mocidade'];
          if (match && !recreioMocidadeEnredos.some((e) => e.year === h.year)) {
            recreioMocidadeEnredos.push({ year: h.year, enredo: match });
          }
        }
      });
    }

    if (schoolObj?.enredoHistory && schoolObj.enredoHistory.length > 0) {
      schoolObj.enredoHistory.forEach((item) => {
        if (item.year && item.enredo && !recreioMocidadeEnredos.some((e) => e.year === item.year)) {
          recreioMocidadeEnredos.push({ year: item.year, enredo: item.enredo });
        }
      });
    }

    return recreioMocidadeEnredos.sort((a, b) => b.year - a.year);
  }

  // Azul e Branco do Salgueiro (inativa): agremiação histórica independente do Morro do Salgueiro (desfilou até 1953).
  // Não herda nem compartilha histórico com a Acadêmicos do Salgueiro (fundada em 1953, primeiro desfile em 1954).
  const isAzulEBrancoSalgueiro =
    key === 'azul_e_branco_salgueiro' ||
    schoolId === 'azul_e_branco_salgueiro' ||
    canonKey === 'azul_e_branco_salgueiro' ||
    (schoolName &&
      schoolName.toLowerCase().includes('azul e branco') &&
      schoolName.toLowerCase().includes('salgueiro'));

  if (isAzulEBrancoSalgueiro) {
    const azulEBrancoEnredos: { year: number; enredo: string }[] = [];
    const years = Object.keys(HISTORICAL_ENREDOS_BY_YEAR)
      .map(Number)
      .sort((a, b) => b - a);

    years.forEach((yr) => {
      if (yr <= 1953) {
        const yearRecords = HISTORICAL_ENREDOS_BY_YEAR[yr];
        if (yearRecords) {
          const enredo = yearRecords['azul_e_branco_salgueiro'];
          if (enredo) {
            azulEBrancoEnredos.push({ year: yr, enredo });
          }
        }
      }
    });

    if (inGameHistory && inGameHistory.length > 0) {
      inGameHistory.forEach((h) => {
        if (h.schoolEnredos && h.schoolEnredos['azul_e_branco_salgueiro']) {
          const match = h.schoolEnredos['azul_e_branco_salgueiro'];
          if (match && !azulEBrancoEnredos.some((e) => e.year === h.year)) {
            azulEBrancoEnredos.push({ year: h.year, enredo: match });
          }
        }
      });
    }

    if (schoolObj?.enredoHistory && schoolObj.enredoHistory.length > 0) {
      schoolObj.enredoHistory.forEach((item) => {
        if (item.year && item.enredo && !azulEBrancoEnredos.some((e) => e.year === item.year)) {
          azulEBrancoEnredos.push({ year: item.year, enredo: item.enredo });
        }
      });
    }

    return azulEBrancoEnredos.sort((a, b) => b.year - a.year);
  }

  // Em Cima da Hora do Catumbi (inativa): agremiação histórica independente do Catumbi e sem qualquer vínculo com o G.R.E.S. Em Cima da Hora de Cavalcanti (fundada em 1958).
  const isEmCimaDaHoraDoCatumbi =
    key === 'em_cima_da_hora_catumbi' ||
    schoolId === 'em_cima_da_hora_catumbi' ||
    canonKey === 'em_cima_da_hora_catumbi' ||
    (schoolName &&
      schoolName.toLowerCase().includes('cima da hora') &&
      schoolName.toLowerCase().includes('catumbi'));

  if (isEmCimaDaHoraDoCatumbi) {
    const catumbiEnredos: { year: number; enredo: string }[] = [];
    const years = Object.keys(HISTORICAL_ENREDOS_BY_YEAR)
      .map(Number)
      .sort((a, b) => b - a);

    years.forEach((yr) => {
      const yearRecords = HISTORICAL_ENREDOS_BY_YEAR[yr];
      if (yearRecords) {
        const enredo = yearRecords['em_cima_da_hora_catumbi'];
        if (enredo) {
          catumbiEnredos.push({ year: yr, enredo });
        }
      }
    });

    if (inGameHistory && inGameHistory.length > 0) {
      inGameHistory.forEach((h) => {
        if (h.schoolEnredos && h.schoolEnredos['em_cima_da_hora_catumbi']) {
          const match = h.schoolEnredos['em_cima_da_hora_catumbi'];
          if (match && !catumbiEnredos.some((e) => e.year === h.year)) {
            catumbiEnredos.push({ year: h.year, enredo: match });
          }
        }
      });
    }

    if (schoolObj?.enredoHistory && schoolObj.enredoHistory.length > 0) {
      schoolObj.enredoHistory.forEach((item) => {
        if (item.year && item.enredo && !catumbiEnredos.some((e) => e.year === item.year)) {
          catumbiEnredos.push({ year: item.year, enredo: item.enredo });
        }
      });
    }

    return catumbiEnredos.sort((a, b) => b.year - a.year);
  }

  const isParaisoDoTuiuti =
    (key === 'tuiuti' || key === 'paraiso_do_tuiuti' || schoolId === 'tuiuti' || schoolId === 'paraiso_do_tuiuti' || canonKey === 'tuiuti') &&
    !isUnidosDoTuiuti;

  const isSalgueiro =
    (key === 'salgueiro' || schoolId === 'salgueiro' || canonKey === 'salgueiro' || (schoolName && schoolName.toLowerCase().includes('salgueiro'))) &&
    !isAzulEBrancoSalgueiro &&
    key !== 'unidos_do_salgueiro' &&
    schoolId !== 'unidos_do_salgueiro' &&
    canonKey !== 'unidos_do_salgueiro' &&
    !(schoolName && schoolName.toLowerCase().includes('unidos do salgueiro'));

  const isEmCimaDaHoraCavalcanti =
    (key === 'em_cima_da_hora' || schoolId === 'em_cima_da_hora' || canonKey === 'em_cima_da_hora' || (schoolName && schoolName.toLowerCase().includes('cima da hora'))) &&
    !isEmCimaDaHoraDoCatumbi;

  const enredosMap = new Map<number, string>();

  // 1. Catálogo histórico oficial (1932 a 2026)
  const years = Object.keys(HISTORICAL_ENREDOS_BY_YEAR).map(Number).sort((a, b) => b - a);
  years.forEach((yr) => {
    if (isParaisoDoTuiuti && yr < 1954) {
      return;
    }
    if (isSalgueiro && yr < 1954) {
      return;
    }
    if (isEmCimaDaHoraCavalcanti && yr < 1958) {
      return;
    }
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

  // Se for a G.R.E.S. Grande Rio antiga (1955-1988, anterior à fundação da Acadêmicos do Grande Rio),
  // seu histórico compreende estritamente anos anteriores à fundação da Acadêmicos do Grande Rio (<= 1988),
  // garantindo que NUNCA exiba os enredos da atual Acadêmicos do Grande Rio (1989 em diante).
  if (key === 'grande_rio_antiga' || schoolId === 'grande_rio_antiga' || canonKey === 'grande_rio_antiga') {
    return Array.from(enredosMap.entries())
      .filter(([yr]) => yr <= 1988)
      .map(([yr, enredo]) => ({ year: yr, enredo }))
      .sort((a, b) => b.year - a.year);
  }

  // Se for a Acadêmicos do Grande Rio atual (fundada em 22/09/1988),
  // seu histórico oficial compreende estritamente a partir de 1989.
  if (key === 'grande_rio' || schoolId === 'grande_rio' || canonKey === 'grande_rio') {
    return Array.from(enredosMap.entries())
      .filter(([yr]) => yr >= 1989)
      .map(([yr, enredo]) => ({ year: yr, enredo }))
      .sort((a, b) => b.year - a.year);
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
