import type { School, YearHistory } from '../types/carnaval';

export const HISTORICAL_ENREDOS_BY_YEAR: Record<number, Record<string, string>> = {
  2026: {
    viradouro: 'Malandragem, Dá um Tempo',
    beija_flor: 'Laíla de Todos os Santos, Laíla de Todos os Sambas',
    vila_isabel: 'Quanto Mais Eu Rezo, Mais Assombração Me Aparece',
    salgueiro: 'Salgueiro de Corpo Fechado',
    imperatriz: 'Ómi Tútú ao Rei do Terreiro de Mina',
    mangueira: 'À Flor da Terra - No Rio da Vida, Quem Tem Sede Bebe Choro',
    tijuca: 'Logun-Edé: Santo Menino Que Velho Respeita',
    grande_rio: 'Pororocas Parawaras: As Águas dos Meus Encantos nas Contas do Meu Rosário',
    tuiuti: 'Quem Tem Medo de Xica Manicongo?',
    portela: 'Cantar Será Buscar o Céu que Mora em Mim',
    mocidade: 'Voltando Para o Futuro - Não Há Limites Para Sonhar',
    niteroi: 'A Dança das Estrelas e os Segredos de Arariboia',
    marica: 'O Meu País é Meu Lugar'
  },
  2025: {
    beija_flor: 'Laíla de Todos os Santos, Laíla de Todos os Sambas',
    grande_rio: 'Pororocas Parawaras: As Águas dos Meus Encantos nas Contas do Meu Rosário',
    imperatriz: 'Ómi Tútú ao Rei do Terreiro de Mina',
    viradouro: 'Malunguinho: O Mensageiro de Três Mundos',
    portela: 'Cantar Será Buscar o Céu que Mora em Mim',
    mangueira: 'À Flor da Terra - No Rio da Vida, Quem Tem Sede Bebe Choro',
    salgueiro: 'Salgueiro de Corpo Fechado',
    vila_isabel: 'Quanto Mais Eu Rezo, Mais Assombração Me Aparece',
    tijuca: 'Logun-Edé: Santo Menino Que Velho Respeita',
    tuiuti: 'Quem Tem Medo de Xica Manicongo?',
    mocidade: 'Voltando Para o Futuro - Não Há Limites Para Sonhar',
    unidos_padre_miguel: 'Egbé Iyá Nassô'
  },
  2024: {
    viradouro: 'Arroboboi, Dangbé',
    imperatriz: 'Com a Sorte Virada pra Lua Segundo o Testamento da Cigana Esmeralda',
    grande_rio: 'Nosso Destino É Ser Onça',
    salgueiro: 'Hutukara',
    portela: 'Um Defeito de Cor',
    vila_isabel: 'Gbalá - Viagem ao Templo da Criação',
    mangueira: 'A Negra Voz do Amanhã (Homenagem a Alcione)',
    beija_flor: 'Um Delírio de Carnaval na Maceió de Rás Gonguila',
    tuiuti: 'Glória ao Almirante Negro!',
    mocidade: 'Pede Caju que Dou... Pé de Caju que Dá!',
    tijuca: 'O Conto de Fados',
    porto_da_pedra: 'Lunário Perpétuo: A Profética do Saber Popular'
  },
  2023: {
    imperatriz: 'O Aperreio do Cabra que o Excomungado Tratou com Má-querença e o Santíssimo Não Deu Abrigo',
    viradouro: 'Rosa Maria Egipcíaca',
    vila_isabel: 'Nessa Festa, Eu Levo Fé!',
    beija_flor: 'Brava Gente! O Grito dos Excluídos no Bicentenário da Independência',
    mangueira: 'As Áfricas que a Bahia Canta',
    grande_rio: 'Ô Zeca, o Pagode Onde É Que É? Andar com Fé Eu Vou!',
    salgueiro: 'Delírios de um Paraíso Vermelho',
    tuiuti: 'Mogangueiro da Cara Preta',
    tijuca: 'É Onda que Vai... É Onda que Vem... Serei a Baía de Todos os Santos a Te Abraçar',
    portela: 'O Azul que Vem do Infinito (Centenário da Portela)',
    mocidade: 'Terra de Meu Céu, Estrelas de Meu Chão',
    imperio_serrano: 'Lugares de Arlindo'
  },
  2022: {
    grande_rio: 'Fala, Majeté! Sete Chaves de Exu',
    beija_flor: 'Empretecer o Pensamento É Ouvir a Voz da Beija-Flor',
    viradouro: 'Não Dá Mais Pra Segurar, Explode Coração',
    vila_isabel: 'Canta, Canta, Minha Gente! A Vila É de Martinho',
    portela: 'Igi Osè Baobá',
    salgueiro: 'Resistência',
    mangueira: 'Angenor, José & Laurindo',
    mocidade: 'Batuque ao Caçador',
    tijuca: 'Waranã - A Reexistência Vermelha',
    imperatriz: 'Meninos Eu Vidi... O Mundo Se Encantou Demais!',
    tuiuti: 'Ka Ríba Tí É - Que Nossos Caminhos Se Abram',
    sao_clemente: 'Minha Vida É uma Peça (Homenagem a Paulo Gustavo)'
  },
  2020: {
    viradouro: 'Viradouro de Alma Lavada',
    grande_rio: 'Tata Londirá: O Canto do Caboclo no Quilombo de Caxias',
    mocidade: 'Elza Deusa Soares',
    beija_flor: 'Guajupiá, Terra Sem Males',
    salgueiro: 'O Rei Negro do Picadeiro',
    mangueira: 'A Verdade Vos Fará Livre',
    portela: 'Guajajara de Todos os Santos',
    vila_isabel: 'Gigante Pela Própria Natureza: Jaçanã e a Força da Floresta',
    tijuca: 'Onde Moram os Sonhos',
    sao_clemente: 'O Conto do Vigário',
    tuiuti: 'O Santo dos Pobres',
    estacio_de_sa: 'Pedra: O Segredo do Saber',
    uniao_da_ilha: 'Nas Encruzilhadas da Vida, Entre Becos, Ruas e Vielas'
  },
  2019: {
    mangueira: 'História pra Ninar Gente Grande',
    viradouro: 'Viraviradouro!',
    vila_isabel: 'Em Nome do Pai, do Filho e dos Santos - A Vila Canta a Cidade de Pedro',
    portela: 'Na Madureira Moderníssima, Hei de Ouvir Cantar uma Sabiá (Clara Nunes)',
    salgueiro: 'Xangô',
    mocidade: 'Eu Sou o Tempo. Tempo É Vida!',
    tijuca: 'Cada Macaco no Seu Galho. Ó, Meu Pai, Me Dê o Pão que Eu Não Morro de Fome',
    tuiuti: 'O Salvador da Pátria',
    grande_rio: 'Quem Nunca...? Que Atire a Primeira Pedra!',
    uniao_da_ilha: 'A Peleja Poética Entre Rachel e Alencar no Asfalto de Ceará e Rio',
    beija_flor: 'Quem Não Viu Vai Ver... As Fábulas do Beija-Flor',
    sao_clemente: 'E o Samba Sambou',
    imperatriz: 'Me Dá um Dinheiro Aí',
    imperio_serrano: 'O Que É, O Que É?'
  },
  2018: {
    beija_flor: 'Monstro É Aquele que Não Sabe Amar (Os Filhos Abandonados da Pátria que os Pariu)',
    tuiuti: 'Meu Deus, Meu Deus, Está Extinta a Escravidão?',
    salgueiro: 'Senhoras do Ventre do Mundo',
    portela: 'De Repente de Lá Pra Cá e Dirrepente de Cá Pra Lá',
    mangueira: 'Com Dinheiro ou Sem Dinheiro, Eu Brinco',
    mocidade: 'Namastê: A Estrela que Habita em Mim Saúda a Estrela que Habita em Você',
    tijuca: 'Um Coração Urbano: Miguel Falabella, a Pátria que o Pariu',
    imperatriz: 'Uma Noite Real no Museu Nacional',
    vila_isabel: 'Corra que o Futuro Vem Aí!',
    uniao_da_ilha: 'Brasil Bom de Boca',
    sao_clemente: 'Academicamente Popular',
    grande_rio: 'Vai Para o Trono ou Não Vai? (Homenagem ao Chacrinha)',
    imperio_serrano: 'O Império do Samba na Rota da Seda'
  },
  2017: {
    portela: 'Quem Nunca Sentiu o Corpo Arrepiar ao Ver Esse Rio Passar?',
    mocidade: 'As Mil e Uma Noites de uma ' + 'Mocidade pra Lá de Marrakesh',
    salgueiro: 'A Divina Comédia do Carnaval',
    mangueira: 'Só com a Ajuda do Santo',
    grande_rio: 'Hoje É Dia de Ivete!',
    beija_flor: 'A Virgem dos Lábios de Mel - Iracema',
    imperatriz: 'Xingu, o Clamor que Vem da Floresta',
    uniao_da_ilha: 'Nzambi',
    sao_clemente: 'Onisuáquiti',
    vila_isabel: 'O Som da Cor',
    tijuca: 'Música na Alma, Inspiração de uma Nação',
    tuiuti: 'Carnavaleidoscópio Fabuloso'
  },
  2016: {
    mangueira: 'Maria Bethânia: A Menina dos Olhos de Oyá',
    tijuca: 'Semeando Sorrisos, a Tijuca Celebra a Terra do Pão',
    portela: 'No Voo da Águia, uma Viagem Sem Fim...',
    salgueiro: 'A Ópera dos Malandros',
    beija_flor: 'Mineirinho Genial! Nova Lima - Cidade Natal (Marquês de Sapucaí)',
    imperatriz: 'É o Amor... Que Mexe com Minha Cabeça e Me Deixa Assim (Zezé & Luciano)',
    grande_rio: 'Fui no Itororó Beber Água, Não Achei: Mas Achei a Bela Santos',
    vila_isabel: 'Memórias do Pai Arraia - Um Sonho de Liberdade',
    sao_clemente: 'Mais de Mil Palhaços no Salão',
    mocidade: 'O Brasil de Lá Pra Cá',
    uniao_da_ilha: 'Olímpico Por Natureza',
    estacio_de_sa: 'Salve Jorge! O Guerreiro na Fé'
  },
  2015: {
    beija_flor: 'Um Griô Conta a História: Um Olhar Sobre a África e o Despontar da Guiné Equatorial',
    salgueiro: 'Do Fundo do Quintal, Saberes e Sabores na Sapucaí',
    grande_rio: 'A Grande Rio É do Baralho!',
    tijuca: 'Um Conto Marcado no Tempo, o Olhar Suíço de Clóvis Bornay',
    portela: 'Imagina-Rio, 450 Janeiros de uma Cidade Surreal',
    imperatriz: 'Axé, Nikiti! Duas Praias, uma Cidade',
    mocidade: 'Se o Mundo Fosse Acabar, Me Diz o Que Você Faria se Só Te Restasse um Dia?',
    sao_clemente: 'A Incrível História do Homem que Não Sabia Contar Mentira',
    uniao_da_ilha: 'Beleza Pura?',
    mangueira: 'Agora Chegou a Vez, Vou Cantar: Mulher de Mangueira, Mulher Brasileira',
    vila_isabel: 'O Maestro Brasileiro Está na Terra de Noel',
    viradouro: 'Nas Veias do Brasil, É Fogo Cruzado em Amarelo, Vermelho e Branco'
  },
  2014: {
    tijuca: 'Acelera, Tijuca! (Homenagem a Ayrton Senna)',
    salgueiro: 'Gaia - A Vida em Nossas Mãos',
    portela: 'Um Rio de Mar a Mar: Do Valongo à Glória de São Sebastião',
    uniao_da_ilha: 'É Brinquedo, É Brincadeira: A Ilha Vai Levantar Poeira!',
    imperatriz: 'Arthur X - O Reino do Galinho de Ouro na Corte da Rainha (Zico)',
    grande_rio: 'Verdes Olhos de Maysa Sobre o Mar, no Caminho de Maricá',
    beija_flor: 'O Astro Iluminado da Comunicação Brasileira (Homenagem a Boni)',
    mangueira: 'A Festa da Catuçaba',
    mocidade: 'Pernambucópolis',
    vila_isabel: 'Retratos de um Brasil Plural',
    sao_clemente: 'Favela',
    imperio_da_tijuca: 'Batuk'
  },
  2013: {
    vila_isabel: 'A Vila Canta o Brasil Celeiro do Mundo - Água no Feijão que Chegou Mais Um',
    beija_flor: 'Amigo Fiel - Do Cavalo do Amanhecer ao Boi-Bumbá',
    tijuca: 'Descidão da Tijuca',
    imperatriz: 'Pará - O Muiraquitã do Brasil Sobre a Região Norte',
    salgueiro: 'Fama',
    grande_rio: 'Amo o Rio e Vou à Luta: Ouro Negro Sem Disputa',
    portela: 'Madureira... Onde o Meu Coração Se Deixou Levar',
    mangueira: 'Cuiabá: Um Paraíso no Centro da América',
    uniao_da_ilha: 'Vinicius no Plural: Paixão, Poesia e Carnaval',
    sao_clemente: 'Horóscopo: Uma Viagem ao Signo do Zodíaco',
    mocidade: 'Eu Vou de Manto e Espada, Sou a Estrela de Padre Miguel',
    inocentes: 'As Sete Confluências do Rio São Francisco'
  },
  2012: {
    tijuca: 'O Dia em que Toda a Realeza Desembarcou na Sapucaí para Coroar o Rei Luiz do Sertão',
    salgueiro: 'Cordel Branco e Encarnado',
    vila_isabel: 'Você Semba Lá... Que Eu Sambo Cá! O Canto Livre de Angola',
    beija_flor: 'São Luís - O Poema Encantado do Maranhão',
    grande_rio: 'Eu Acredito em Você! E Você?',
    portela: '...E o Povo na Rua Cantando... É a Condição Pra Salvar a Cidade',
    mangueira: 'Vou Festejar! Sou Festeiro e o Rei da Folia Eu Sou',
    uniao_da_ilha: 'De Londres ao Rio: Era uma Vez... Uma Grande Viagem',
    mocidade: 'Por Ti, Portinari, Rompendo a Tela em Poesia',
    imperatriz: 'Jorge, Amado Jorge',
    sao_clemente: 'Uma Aventura Musical na Sapucaí',
    porto_da_pedra: 'Da Seiva Materna ao Equilíbrio da Vida',
    renascer_jacarepagua: 'Romero Britto, o Artista da Alegria'
  },
  2011: {
    beija_flor: 'A Simplicidade de um Rei (Roberto Carlos)',
    tijuca: 'Esta Noite Levarei Sua Alma',
    mangueira: 'O Filho Fiel, Sempre Mangueira (Nelson Cavaquinho)',
    vila_isabel: 'Mitos e Histórias Entrelaçadas Pelos Fios de Cabelo',
    salgueiro: 'O Rio no Cinema',
    imperatriz: 'A Imperatriz Adverte: Sambar Faz Bem à Saúde',
    mocidade: 'Parábola dos Divinos Amores',
    porto_da_pedra: 'O Sonho Rasgou o Mar, Trazendo a Riqueza da Terra',
    sao_clemente: 'O Seu, o Meu, o Nosso... Mas o Rio É de Todos Nós',
    grande_rio: 'Y-Jurerê Mirim - A Encantadora Ilha das Bruxas',
    portela: 'Rio, Azul da Cor do Mar',
    uniao_da_ilha: 'O Mistério da Vida'
  },
  2010: {
    tijuca: 'É Segredo!',
    grande_rio: 'Das Arquibancadas ao Camarote, a Grande Rio É Pura Energia!',
    beija_flor: 'Brilhante ao Sol do Novo Mundo, Brasília do Sonho à Realidade',
    vila_isabel: 'Noel: A Presença do Poeta da Vila',
    salgueiro: 'Histórias Sem Fim',
    mangueira: 'Mangueira É Música do Brasil',
    mocidade: 'Do Paraíso das Cores ao Brilho do Milagre',
    imperatriz: 'Brasil de Todos os Deuses',
    portela: 'Derrubando Fronteiras, Conquistando a Liberdade',
    porto_da_pedra: 'Com que Roupa... Eu Vou?',
    uniao_da_ilha: 'Dom Quixote de La Mula: O Cavaleiro dos Sonhos',
    viradouro: 'México, Paradoxo dos Opostos'
  },
  2009: {
    salgueiro: 'Tambor',
    beija_flor: 'No Chuveiro da Alegria, Quem Banha o Corpo Lava a Alma na Folia',
    portela: 'E Por Que Não?',
    vila_isabel: 'Neste Palco da Folia, É Pura Energia!',
    grande_rio: 'Voa, Brancaleone! Da França Tropical aos Gigantes da Floresta',
    mangueira: 'A Mangueira É uma Estrela do Céu',
    imperatriz: 'Imperatriz... Só Quer Vencer!',
    viradouro: 'Vira-Bahia, Pura Energia',
    tijuca: 'Tijuca 2009: Uma Odisséia no Espaço',
    porto_da_pedra: 'Não Tem Mosquito Nem Fofoca',
    mocidade: 'Mocidade: Clube de Regatas Vasco da Gama',
    imperio_serrano: 'Lendas das Sereias, Mistérios do Mar'
  },
  2008: {
    beija_flor: 'Macapaba: Equinócio Solar, Viagens Fantásticas ao Meio do Mundo',
    salgueiro: 'O Rio de Janeiro Continua Sendo',
    grande_rio: 'Do Verde de Coari Vem Meu Gás, Sapucaí!',
    portela: 'Reconstruindo a Natureza, Recriando a Vida',
    tijuca: 'Vou Juntar Minha Panela, o Mel de Sua Boca É Meu Tempero',
    imperatriz: 'João e Maria no Reino do Faz de Conta',
    viradouro: 'É de Arrepiar!',
    mocidade: 'O Quinto Império: De Portugal ao Brasil',
    vila_isabel: 'Trabalhadores do Brasil',
    mangueira: '100 Anos do Frevo, É de Perder o Sapato!',
    porto_da_pedra: '100 Anos da Imigração Japonesa no Brasil',
    sao_clemente: 'O Canto da Ema'
  },
  2007: {
    beija_flor: 'Áfricas: Do Berço Real à Corte Brasiliana',
    grande_rio: 'Caxias, o Caminho Suave da Prosperidade',
    mangueira: 'Brasil Cidadão - Meu Filho, Vai Ser Gente!',
    tijuca: 'De Lambida em Lambida, a Tijuca Vê a Vida',
    viradouro: 'A Viradouro Vira o Jogo',
    vila_isabel: 'Metamorfoses: Do Reino Vegetal à Criação Humana',
    salgueiro: 'Candaces',
    portela: 'Os Três Poetas do Povo: Ary, Vinicius e Chico',
    imperatriz: 'Bacaval, o Reino da Fartura',
    porto_da_pedra: 'Preto e Branco a Cores',
    mocidade: 'O Futuro no Pretérito: Uma História Feita por Nós',
    imperio_serrano: 'Ser Diferente É Normal - O Império Celebra as Diferenças',
    estacio_de_sa: 'O Ti-ti-ti do Ta-ta-tá na Sapucaí'
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
  }
};

/**
 * Normaliza id da escola para busca
 */
function normalizeId(rawId?: string, rawName?: string): string {
  if (rawId && rawId.trim()) {
    const id = rawId.trim().toLowerCase();
    if (id.includes('estacio') || id.includes('sao_carlos')) return 'estacio_de_sa';
    if (id.includes('padre_miguel') && id.includes('unidos')) return 'unidos_padre_miguel';
    if (id.includes('marica')) return 'marica';
    return id;
  }
  if (!rawName) return '';
  const n = rawName.toLowerCase();
  if (n.includes('viradouro')) return 'viradouro';
  if (n.includes('beija-flor') || n.includes('beija flor')) return 'beija_flor';
  if (n.includes('vila isabel')) return 'vila_isabel';
  if (n.includes('salgueiro')) return 'salgueiro';
  if (n.includes('imperatriz')) return 'imperatriz';
  if (n.includes('mangueira')) return 'mangueira';
  if (n.includes('tijuca') && !n.includes('império')) return 'tijuca';
  if (n.includes('grande rio')) return 'grande_rio';
  if (n.includes('tuiuti')) return 'tuiuti';
  if (n.includes('portela')) return 'portela';
  if (n.includes('mocidade')) return 'mocidade';
  if (n.includes('maricá') || n.includes('marica')) return 'marica';
  if (n.includes('padre miguel') && n.includes('unidos')) return 'unidos_padre_miguel';
  if (n.includes('serrano')) return 'imperio_serrano';
  if (n.includes('império da tijuca') || n.includes('imperio da tijuca')) return 'imperio_da_tijuca';
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
  return '';
}

/**
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

  // 1. Verifica no histórico gravado na própria escola no save
  if (schoolObj?.enredoHistory && schoolObj.enredoHistory.length > 0) {
    const match = schoolObj.enredoHistory.find((h) => h.year === year);
    if (match?.enredo) return match.enredo;
  }

  // 2. Verifica se é o ano da temporada em andamento e a escola possui enredo definido
  if (schoolObj?.currentEnredo?.title && year >= 2026) {
    if (year === 2026 || (schoolObj as any).currentYear === year) {
      return schoolObj.currentEnredo.title;
    }
  }

  // 3. Verifica nos anos simulados registrados no inGameHistory do save
  if (inGameHistory && inGameHistory.length > 0) {
    const histYear = inGameHistory.find((h) => h.year === year);
    if (histYear?.schoolEnredos) {
      const match =
        (schoolId && histYear.schoolEnredos[schoolId]) ||
        (schoolName && histYear.schoolEnredos[schoolName]) ||
        (key && histYear.schoolEnredos[key]);
      if (match) return match;
    }
  }

  // 4. Catálogo histórico oficial (1980 a 2026)
  const yearRecords = HISTORICAL_ENREDOS_BY_YEAR[year];
  if (!yearRecords) return undefined;

  if (key && yearRecords[key]) {
    return yearRecords[key];
  }

  if (schoolId && yearRecords[schoolId]) {
    return yearRecords[schoolId];
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
  const enredosMap = new Map<number, string>();

  // 1. Catálogo histórico oficial (1980 a 2026)
  const years = Object.keys(HISTORICAL_ENREDOS_BY_YEAR).map(Number).sort((a, b) => b - a);
  years.forEach((yr) => {
    const enredo = HISTORICAL_ENREDOS_BY_YEAR[yr]?.[key];
    if (enredo) {
      enredosMap.set(yr, enredo);
    }
  });

  // 2. Histórico de enredos gravado no save (inGameHistory)
  if (inGameHistory && inGameHistory.length > 0) {
    inGameHistory.forEach((h) => {
      if (h.schoolEnredos) {
        const found =
          (schoolId && h.schoolEnredos[schoolId]) ||
          (schoolName && h.schoolEnredos[schoolName]) ||
          (key && h.schoolEnredos[key]);
        if (found) {
          enredosMap.set(h.year, found);
        }
      }
    });
  }

  // 3. Histórico de enredos na própria agremiação no save
  if (schoolObj?.enredoHistory && schoolObj.enredoHistory.length > 0) {
    schoolObj.enredoHistory.forEach((item) => {
      if (item.year && item.enredo) {
        enredosMap.set(item.year, item.enredo);
      }
    });
  }

  // 4. Enredo atual da escola na temporada em andamento
  if (schoolObj?.currentEnredo?.title) {
    const activeYr = currentYear || (schoolObj as any).currentYear || 2026;
    enredosMap.set(activeYr, schoolObj.currentEnredo.title);
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
