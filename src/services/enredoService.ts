import { School, Enredo, EnredoThemeType, DivisionId } from '../types/carnaval';
import { cleanSchoolName } from '../utils/schoolNameUtils';

export interface ThematicCore {
  id: string;
  themeType: EnredoThemeType;
  subject: string;
  keywords: string[];
  baseQuality: number;
  baseCost: number;
  isSponsored?: boolean;
  sponsorName?: string;
  sponsorType?: 'Cidade / Estado' | 'Agronegócio / Indústria' | 'Companhia Aérea / Turismo' | 'Tecnologia / Inovação' | 'Patrimônio Histórico';
  sponsorValues?: Record<DivisionId, number>;
  tradeoff?: string;
  titleVariants: string[];
  narrativePerspectives: string[];
}

export const INVOCATIONS = [
  'O Canto Sagrado de',
  'O Manto Estrelado de',
  'A Epopeia Viva de',
  'Nas Asas Encantadas de',
  'Sinfonia Negra em',
  'O Banquete dos Orixás:',
  'Tambores de Fé e Bravura:',
  'A Chama Imortal de',
  'Na Cadência da Memória:',
  'Pelas Veredas Místicas de',
  'O Grito que Rompe o Silêncio:',
  'Nas Águas Sagradas de',
  'A Força que Brota da Terra:',
  'Soberana Poesia:',
  'Das Raízes ao Firmamento:',
  'O Alvorecer Triunfante de',
  'No Compasso dos Terreiros:',
  'O Mágico Teatrinho de',
  'A Dança dos Ventos e Marés:',
  'O Manto de Luz de',
  'Na Encruzilhada da Glória:',
  'A Epopeia Imortal de',
  'Nos Trilhos da Emoção:',
  'A Alvorada da Paz:',
  'O Eco dos Ancestrais em',
  'No Fogo Sagrado de',
  'Pelas Ruas e Becos de',
  'A Voz que Não se Cala:',
  'O Delírio Fantástico de',
  'No Rufar da Bateria:',
  'Baluartes da Eternidade:',
  'O Espelho das Águas de',
  'No Reinos dos Encantados:',
  'A Dança dos Quatro Cantos:',
  'O Auto da Resistência:',
  'Flores e Espinhos de',
  'A Magia que Renasce em',
  'O Cortejo Triunfal de',
  'Sob a Bênção dos Céus:',
  'O Povo Canta e Dança:'
];

export const THEMATIC_CORES: ThematicCore[] = [
  // --- NÚCLEOS TEMÁTICOS CONSAGRADOS & INÉDITOS (O ENREDO DITA O DESFILE) ---
  {
    id: 'japao_sol_nascente',
    themeType: 'Cultural',
    subject: 'O Império do Sol Nascente: Dos Samurais de Quioto aos Floresceres da Imigração no Brasil',
    keywords: ['japao', 'japão', 'samurai', 'sakura', 'kasato-maru', 'liberdade', 'oriente', 'bushido', 'gueixa', 'toquio', 'tóquio', 'monte-fuji', 'taiko'],
    baseQuality: 16,
    baseCost: 210000,
    titleVariants: [
      'O Império do Sol Nascente: O Voo das Garças de Quioto, a Honra dos Samurais e o Laço Eterno no Brasil',
      'Nas Asas do Kasato Maru: A Travessia dos Oceanos, Cerejeiras em Flor e a Fraternidade Nipo-Brasileira',
      'Do Monte Fuji à Sapucaí: A Sabedoria dos Deuses Xintoístas e a Chama Milenar do Oriente',
      'Sakura, o Despertar da Primavera: O Código Bushido, o Teatro Kabuki e o Futuro Neon de Tóquio'
    ],
    narrativePerspectives: [
      'a aliança espiritual entre a deusa Amaterasu, os guerreiros de honra do Bushido e o acolhimento fraterno das terras brasileiras',
      'a epopeia da travessia marítima no Kasato Maru (1908), onde o suor dos imigrantes fez florescer o café e a cultura no coração de São Paulo',
      'o contraste poético entre o Japão ancestral dos templos zen e a vanguarda tecnológica dos mangás, robôs e luzes de neon de Tóquio na passarela'
    ]
  },
  {
    id: 'egito_antigo_faraos',
    themeType: 'Histórico',
    subject: 'Egito Antigo: Os Segredos dos Faraós, o Nilo Sagrado e o Triunfo da Imortalidade',
    keywords: ['egito', 'farao', 'faraó', 'piramides', 'pirâmides', 'nilo', 'tutancamon', 'tutancâmon', 'isis', 'ísis', 'anubis', 'anúbis', 'cleopatra', 'cleópatra', 'hieroglifos', 'esfinge'],
    baseQuality: 16,
    baseCost: 215000,
    titleVariants: [
      'Os Mistérios de Tutancâmon: O Rio Nilo da Criação, a Balança de Anúbis e a Luz Eterna das Pirâmides',
      'Sob o Olhar de Hórus: O Vale dos Faraós, a Barca Solar de Rá e o Banquete Sagrado de Cleópatra',
      'A Dádiva do Nilo: Das Areias Douradas de Gizé à Imortalidade dos Reis na Passarela do Samba',
      'O Livro dos Mortos e o Alvorecer dos Deuses: Ouro, Papiros e o Império Milenar do Egito Antigo'
    ],
    narrativePerspectives: [
      'a jornada mística da alma humana guiada por Anúbis pesando o coração contra a pena da verdade de Maat',
      'a grandiosidade arquitetônica das pirâmides erguidas sob as estrelas de Órion e o pulsar fertilizante das águas do Nilo',
      'o esplendor da tumba dourada de Tutancâmon e a sedução intelectual de Cleópatra reinando em Alexandria com a realeza do Carnaval'
    ]
  },
  {
    id: 'amazonia_floresta_sagrada',
    themeType: 'Ambiental & Natureza',
    subject: 'Amazônia, o Coração Verde da Terra: A Samaúma Sagrada, o Canto dos Encantados e o Grito da Floresta Viva',
    keywords: ['amazonia', 'amazônia', 'floresta', 'samauma', 'samaúma', 'rios-voadores', 'indigenas', 'indígenas', 'curupira', 'parintins', 'selva', 'iara', 'encantados'],
    baseQuality: 16,
    baseCost: 205000,
    titleVariants: [
      'Amazônia, o Coração Verde da Terra: A Samaúma Sagrada, o Canto dos Encantados e o Grito da Floresta Viva',
      'O Reino dos Igarapés: Das Lendas de Parintins aos Rios Voadores que Alimentam o Brasil',
      'A Catedral da Selva: O Pajé, a Onça e o Mistério das Águas que Regam a Vida',
      'Curupira e Yara na Passarela: A Salvação do Pulmão do Mundo e a Voz dos Povos Originários'
    ],
    narrativePerspectives: [
      'a monumental árvore Samaúma pulsando água e conectando as raízes da terra com os rios voadores que abastecem o continente',
      'a encantaria cabocla dos botos, yaras e curupiras em diálogo vibrante com o festival folclórico de Parintins (Garantido e Caprichoso)',
      'o manifesto urgente pela preservação da biodiversidade e demarcação das terras sagradas dos povos originários'
    ]
  },
  {
    id: 'futebol_paixao_nacional',
    themeType: 'Cultural',
    subject: 'A Pátria de Chuteiras: O Drible Moleque, a Emoção do Gol e a Magia dos Gramados',
    keywords: ['futebol', 'maracana', 'maracanã', 'pele', 'pelé', 'gol', 'drible', 'varzea', 'várzea', 'selecao', 'seleção', 'chuteira', 'marta', 'torcida'],
    baseQuality: 15,
    baseCost: 195000,
    titleVariants: [
      'A Pátria de Chuteiras: Da Bola de Meia ao Maracanã, o Samba no Pé e a Emoção Sagrada do Gol',
      'O Drible que Fez o Mundo Parar: De Charles Miller aos Reis do Futebol-Arte na Passarela',
      'Golaço de Placa na Sapucaí! A Fé das Torcidas, a Várzea e a Glória Eterna da Camisa Canarinho',
      'A Dança das Chuteiras Aladas: Dos Terrões da Periferia à Coroação Mundial dos Deuses da Pelota'
    ],
    narrativePerspectives: [
      'a infância nos campinhos de terra batida onde a bola de meia revela os gênios e poetas do drible brasileiro',
      'o templo do Maracanã como palco da catarse coletiva onde o grito de gol liberta as dores e une todas as classes e credos',
      'a consagração dos reis e rainhas do esporte: da genialidade divina de Pelé e Garrincha ao pioneirismo histórico de Marta'
    ]
  },
  {
    id: 'inteligencia_artificial_futurismo',
    themeType: 'Surrealista',
    subject: 'O Algoritmo do Tamborim: A Inteligência Artificial, as Máquinas Pensantes e a Alma do Samba',
    keywords: ['inteligencia-artificial', 'inteligência artificial', 'ia', 'futurismo', 'algoritmo', 'androide', 'andróide', 'cibernetica', 'cibernética', 'dados', 'chips', 'silicio', 'silício', 'tecnologia', 'quântico'],
    baseQuality: 16,
    baseCost: 220000,
    titleVariants: [
      'O Algoritmo do Tamborim: Pode a Máquina Ter Alma? A Inteligência Artificial diante da Ginga do Samba',
      'Odisseia Cyber 2050: Dos Circuitos de Silício à Batida do Coração na Passarela do Futuro',
      'A Singularidade da Emoção: Redes Neurais, Androides e o Axé que Nenhum Código Consegue Explicar',
      'Do Chip ao Couro de Surdo: A Dança dos Robôs e a Vitória da Consciência Humana no Carnaval'
    ],
    narrativePerspectives: [
      'o confronto filosófico entre a precisão fria das máquinas calculadoras e o calor espontâneo da batucada comunitária',
      'uma metrópole futurista hiperconectada onde androides e redes neurais tentam decifrar o mistério do arrepiado da pele',
      'a revelação triunfal de que a criatividade, o amor e o samba são expressões exclusivas do espírito e do coração humano'
    ]
  },
  {
    id: 'astronomia_odisseia_cosmica',
    themeType: 'Surrealista',
    subject: 'Odisseia Cósmica: O Big Bang, a Dança das Galáxias e o Infinito no Asfalto da Sapucaí',
    keywords: ['astronomia', 'cosmos', 'galaxias', 'galáxias', 'estrelas', 'big-bang', 'universo', 'telescopio', 'telescópio', 'planetas', 'espaco', 'espaço'],
    baseQuality: 16,
    baseCost: 215000,
    titleVariants: [
      'Odisseia Estelar: A Dança das Galáxias, o Pálido Ponto Azul e o Voo do Samba pelo Infinito',
      'Nasceu a Luz! Do Big Bang às Nebulosas de Órion: A Sinfonia Cósmica dos Astros no Asfalto',
      'Poeira de Estrelas na Passarela: A Astronomia dos Telescópios e os Mistérios do Vácuo Espacial',
      'O Homem no Espelho do Universo: O Tempo, as Constelações e a Imensidão Sagrada do Firmamento'
    ],
    narrativePerspectives: [
      'a explosão primordial de energia do Big Bang desdobrada como o primeiro rufar do tambor cósmico da existência',
      'a beleza estonteante das nebulosas, buracos negros e galáxias espirais capturadas pelo olhar dos telescópios espaciais',
      'a reflexão de Carl Sagan sobre o Pálido Ponto Azul: somos todos feitos de poeira estelar dançando juntos na mesma nave'
    ]
  },

  // --- AFRO-BRASILEIRO: Orixás e Divindades ---
  {
    id: 'xango_oya',
    themeType: 'Afro-brasileiro',
    subject: 'Xangô e Iansã em Oió',
    keywords: ['xango', 'iansa', 'oya', 'trovao', 'justica', 'fogo'],
    baseQuality: 14,
    baseCost: 195000,
    titleVariants: [
      'Xangô e Oyá: O Trovão da Justiça e o Vento da Coragem na Coroação da Terra',
      'O Fogo de Ayrá e o Vento de Iansã: O Reino Sagrado de Oió na Passarela',
      'Kaô Kabecilê! A Balança da Justiça nos Trovões de Xangô',
      'Eparrei, Iansã! A Força das Tempestades e o Julgamento Sagrado de Oió'
    ],
    narrativePerspectives: [
      'o rufar dos tambores anunciando o cortejo dos orixás com o julgamento supremo da balança',
      'a fúria dos ventos de Oyá guiando a libertação dos humildes sob as chamas sagradas de Ayrá',
      'a corte imperial de Oió descendo o morro em cortejo suntuoso de búzios, cobre e pedras sagradas'
    ]
  },
  {
    id: 'oxum_iemanja',
    themeType: 'Afro-brasileiro',
    subject: 'Oxum e Iemanjá: As Águas Doces e Salgadas',
    keywords: ['oxum', 'iemanja', 'aguas', 'ouro', 'mar', 'fertilidade'],
    baseQuality: 14,
    baseCost: 190000,
    titleVariants: [
      'Ora Yê Yê Ô! O Espelho de Oxum e o Manto de Pérolas de Iemanjá',
      'No Encontro das Águas: O Ouro das Cachoeiras e o Abraço Sagrado do Oceano',
      'Sereias de Fé: O Canto de Yemanjá e a Fecundidade Dourada de Oxum',
      'Odoyá Rainha do Mar! As Bençãos das Águas que Regam a Vida do Brasil'
    ],
    narrativePerspectives: [
      'a fertilidade do ouro que brota das fontes cristalinas em encontro com a grandiosidade azul dos mares',
      'o canto das lavadeiras e pescadores que encontram nas divindades das águas o sustento e a fé',
      'a consagração das mães d’água em um cortejo aquático que lava a alma da passarela'
    ]
  },
  {
    id: 'ogum_oxossi',
    themeType: 'Afro-brasileiro',
    subject: 'Ogum e Oxóssi: O Ferro e as Matas',
    keywords: ['ogum', 'oxossi', 'guerreiro', 'mata', 'caminhos', 'fartura'],
    baseQuality: 13,
    baseCost: 185000,
    titleVariants: [
      'Ogunhê! O Guerreiro do Ferro Forjado e o Flecheiro das Matas Verdes',
      'Nas Trilhas de Oxóssi e nas Batalhas de Ogum: A Flecha Certeira e a Espada Protetora',
      'Senhores dos Caminhos: O Aço que Abre Portas e o Verde que Alimenta a Vida',
      'Okê Arô! O Caçador de Uma Flecha Só e a Forja Sagrada da Vitória'
    ],
    narrativePerspectives: [
      'a coragem dos que lutam pela subsistência diária protegidos pela lâmina justiceira de São Jorge e Ogum',
      'a sabedoria ecológica dos caçadores ancestrais que respeitam a floresta sagrada de Oxóssi',
      'a união do ferro com a terra em uma aliança sagrada que defende os terreiros e a liberdade'
    ]
  },
  {
    id: 'exu_bara',
    themeType: 'Afro-brasileiro',
    subject: 'Exu: O Mensageiro das Encruzilhadas',
    keywords: ['exu', 'encruzilhada', 'comunicacao', 'movimento', 'laroye'],
    baseQuality: 15,
    baseCost: 205000,
    titleVariants: [
      'Laroyê! O Senhor dos Caminhos, da Comunicação e do Movimento da Vida',
      'A Chave das Encruzilhadas: Exu Abre os Portais da Liberdade e da Criação',
      'O Primeiro a Comer, o Último a Partir: A Filosofia Cósmica do Orixá da Transformação',
      'Boca do Mundo: O Verbo Ancestral que Desperta o Samba e Quebra Correntes'
    ],
    narrativePerspectives: [
      'a desmistificação e o louvor à divindade da comunicação, do dinamismo e da justiça cósmica',
      'a travessia da noite carioca, os mistérios da encruza e a ginga que move os malandros e sambistas',
      'a gargalhada que afasta a tristeza e abre os horizontes para quem tem fé no batuque'
    ]
  },
  {
    id: 'obaluaye_nana',
    themeType: 'Afro-brasileiro',
    subject: 'Obaluaê e Nanã: O Barro e a Cura',
    keywords: ['obaluaye', 'omolu', 'nana', 'barro', 'cura', 'ancestralidade'],
    baseQuality: 13,
    baseCost: 180000,
    titleVariants: [
      'Atotô! O Manto de Palha que Cura as Dores e o Barro Primitivo de Nanã',
      'A Sabedoria dos Mais Velhos: Do Barro da Criação às Bençãos do Senhor da Terra',
      'Salubá Nanã! A Senhora dos Pântanos e o Médico dos Pobres na Passarela da Paz',
      'O Segredo das Palhas: Orixás da Terra, da Transformação e do Renascimento'
    ],
    narrativePerspectives: [
      'a homenagem aos médicos do povo, às rezadeiras e à ciência ancestral que cura o corpo e o espírito',
      'o respeito sagrado aos anciãos e à memória que não se apaga com o passar dos séculos',
      'a renovação da esperança através do barro fértil onde brotam as sementes do novo amanhã'
    ]
  },
  {
    id: 'oxumare_arco_iris',
    themeType: 'Afro-brasileiro',
    subject: 'Oxumarê: A Serpente Sagrada e as Sete Cores do Arco-Íris',
    keywords: ['oxumare', 'serpente', 'arco-iris', 'transformacao', 'chuva'],
    baseQuality: 14,
    baseCost: 190000,
    titleVariants: [
      'Arroboboi! A Dança Celestial de Oxumarê e o Arco-Íris que Une Céu e Terra',
      'A Serpente de Ouro e Luz: O Mistério das Chuvas e a Aliança das Cores',
      'Das Profundezas ao Infinito: O Renascimento Contínuo do Orixá da Transformação',
      'O Cinto de Pedras Preciosas: A Roda do Tempo e o Esplendor de Dan'
    ],
    narrativePerspectives: [
      'a beleza plástica do arco-íris refletido nas fantasias e alegorias em celebração à diversidade cósmica',
      'a sabedoria da constante renovação da natureza que se desfaz e renasce em ciclos sagrados',
      'a harmonia entre os povos guiada pelo laço celestial de Oxumarê'
    ]
  },

  // --- AFRO-BRASILEIRO: Quilombos, Resistência e Reinos ---
  {
    id: 'palmares_zumbi_dandara',
    themeType: 'Afro-brasileiro',
    subject: 'Quilombo dos Palmares e a Bravura de Dandara',
    keywords: ['palmares', 'zumbi', 'dandara', 'quilombo', 'resistencia', 'liberdade'],
    baseQuality: 14,
    baseCost: 195000,
    titleVariants: [
      'Reino Encantado de Palmares: A Coroa de Dandara e a Lança Imortal de Zumbi',
      'A República da Liberdade: O Eco da Serra da Barriga na Luta do Povo Preto',
      'Dandara Vive! O Salto Corajoso das Guerreiras que Jamais se Renderam',
      'Ganga Zumba e a Raiz Quilombola: Quando o Brasil Aprendeu a Palavra Liberdade'
    ],
    narrativePerspectives: [
      'a celebração do primeiro grande território livre das Américas como modelo de comunhão social',
      'o protagonismo feminino e militar de Dandara na defesa intransigente do ideal antiescravista',
      'a continuidade contemporânea dos ideais de Palmares na voz e na garra das comunidades faveladas'
    ]
  },
  {
    id: 'tereza_benguela',
    themeType: 'Afro-brasileiro',
    subject: 'Tereza de Benguela e o Quilombo do Quariterê',
    keywords: ['tereza', 'benguela', 'quaritere', 'rainha', 'pantanal', 'mulheres'],
    baseQuality: 14,
    baseCost: 190000,
    titleVariants: [
      'A Rainha do Pantanal: Tereza de Benguela e o Parlamento do Quilombo do Quariterê',
      'Soberania Preta nos Confins do Guaporé: A Força Inabalável da Rainha Tereza',
      'O Trono de Benguela: Como Uma Mulher Governou Negros e Indígenas em Harmonia',
      'Quariterê em Festa: A Democracia Quilombola que Desafiou a Coroa Portuguesa'
    ],
    narrativePerspectives: [
      'a aliança histórica entre povos indígenas e negros sob uma liderança matriarcal visionária',
      'a engenhosidade do parlamento do Quariterê que produzia tecidos, ferro e alimentos em plena selva',
      'a consagração da liderança negra feminina como esteio moral e político da história do Brasil'
    ]
  },
  {
    id: 'reino_benim_bronzes',
    themeType: 'Afro-brasileiro',
    subject: 'O Reino de Benim e as Cabeças de Bronze',
    keywords: ['benim', 'oba', 'bronze', 'africa', 'arte', 'civilizacao'],
    baseQuality: 15,
    baseCost: 205000,
    titleVariants: [
      'Ouro e Bronze nos Palácios de Benim: A Realeza dos Obás e a Eternidade da Arte Africana',
      'Os Mestres da Forja Imperial: Como Benim Moldou a Memória do Mundo em Metal Nobre',
      'A Coroa do Obá: Tesouros Sagrados e o Esplendor de Uma Civilização Milenar',
      'Cabeças Sagradas: O Olhar Ancestral de Benim que Resiste ao Tempo e ao Saque'
    ],
    narrativePerspectives: [
      'o apogeu tecnológico, artístico e urbano das cortes africanas antes das invasões coloniais',
      'a restituição simbólica da dignidade e soberania dos povos que criaram obras de arte imortais',
      'o desfile visual requintado com alegorias douradas e bronzificadas de profundo valor histórico'
    ]
  },
  {
    id: 'nzinga_angola',
    themeType: 'Afro-brasileiro',
    subject: 'Rainha Nzinga Mbandi de Matamba e Ndongo',
    keywords: ['nzinga', 'angola', 'matamba', 'diplomacia', 'guerreira'],
    baseQuality: 14,
    baseCost: 200000,
    titleVariants: [
      'A Soberana de Matamba: Rainha Nzinga e a Flecha que Quebrou os Grilhões de Angola',
      'Coroada na Guerra e na Diplomacia: Nzinga Desafia os Conquistadores',
      'O Trono dos Imbangalas: Como Uma Mulher Comandou os Exércitos da Liberdade',
      'Nzinga Mbandi: O Eco de Bravura que Atravessou o Atlântico até as Rodas de Samba'
    ],
    narrativePerspectives: [
      'a habilidade tática e diplomática de uma governante que negociou de igual para igual com impérios europeus',
      'a força militar de lideranças femininas ancestrais que inspiram as mulheres da comunidade',
      'as raízes bantas que fundamentaram a língua, a dança e o batuque do carnaval carioca'
    ]
  },

  // --- HISTÓRICO: Revoltas e Ciclos ---
  {
    id: 'chibata_joao_candido',
    themeType: 'Histórico',
    subject: 'A Revolta da Chibata e o Dragão do Mar',
    keywords: ['chibata', 'joao-candido', 'marinha', 'guanabara', 'dignidade'],
    baseQuality: 15,
    baseCost: 205000,
    titleVariants: [
      'O Dragão do Mar e a Chama da Honra: A Revolta da Chibata nos Mares da Guanabara',
      'Cem Chibatadas Jamais! João Cândido Faz os Encouraçados Apitarem por Liberdade',
      'O Almirante Negro: Quando os Canhões da Armada Exigiram Respeito ao Homem do Povo',
      'Revolta na Baía: O Fim dos Castigos e a Vitória da Dignidade dos Marinheiros'
    ],
    narrativePerspectives: [
      'o motim pacífico e tático que colocou de joelhos a capital federal contra a tortura oficial',
      'a liderança brilhante e humanista de João Cândido manobrando os mais modernos encouraçados do mundo',
      'o canto dos marinheiros silenciados que hoje navegam eternizados na avenida da folia'
    ]
  },
  {
    id: 'canudos_conselheiro',
    themeType: 'Histórico',
    subject: 'A Epopeia de Canudos e Antônio Conselheiro',
    keywords: ['canudos', 'conselheiro', 'sertao', 'resistencia', 'bahia'],
    baseQuality: 14,
    baseCost: 195000,
    titleVariants: [
      'Belo Monte Sagrado: O Grito dos Descamisados e a Utopia Popular de Canudos',
      'A Terra sem Senhores: Antônio Conselheiro e a Cidade Santa no Coração da Caatinga',
      'Sertanejo Forte: O Arraial que Desafiou Quatro Expedições da República',
      'Canudos não se Rendeu: A Fé que Moveu Montanhas no Sertão da Bahia'
    ],
    narrativePerspectives: [
      'a organização comunitária solidária que acolheu ex-escravizados, sertanejos e desamparados',
      'a força espiritual e poética de uma comunidade que sonhava com terra partilhada e dignidade',
      'o tributo comovente aos mártires de Belo Monte com estandartes rústicos e corações de fé'
    ]
  },
  {
    id: 'cabanagem_grao_para',
    themeType: 'Histórico',
    subject: 'A Cabanagem no Grão-Pará: O Povo no Poder',
    keywords: ['cabanagem', 'para', 'belem', 'amazonia', 'povo', 'revolucao'],
    baseQuality: 14,
    baseCost: 190000,
    titleVariants: [
      'Fogo nas Águas do Guajará: A Cabanagem e o Dia em que os Pobres Governaram a Amazônia',
      'Os Rebeldes das Palafitas: A Revolução Cabana nas Fronteiras da Pátria Grande',
      'Cabanos em Marcha! Ribeirinhos e Tapuias na Luta pela Verdadeira Soberania',
      'O Rugido dos Rios: Quando a Selva Tomou o Palácio da Província'
    ],
    narrativePerspectives: [
      'a única revolução popular no Brasil onde a população pobre e indígena conquistou e exerceu o poder',
      'a navegação fluvial guerrilheira pelos igarapés na defesa da igualdade e justiça social',
      'o encontro de ritmos amazônicos com as caixas de guerra em uma apoteose de cidadania rebelde'
    ]
  },
  {
    id: 'inconfidencia_mineira_tiradentes',
    themeType: 'Histórico',
    subject: 'Inconfidência Mineira: Os Poetas e a Liberdade',
    keywords: ['inconfidencia', 'tiradentes', 'ouro-preto', 'poetas', 'liberdade'],
    baseQuality: 13,
    baseCost: 185000,
    titleVariants: [
      'Liberdade Ainda que Tardia: Os Poetas de Vila Rica e o Sonho Republicano de Tiradentes',
      'No Ouro das Minas a Chama da Razão: A Conspiração que Acendeu a Independência',
      'Versos Rebeldes sob o Céu das Gerais: A Inconfidência que Não Teve Medo da Coroa',
      'A Alvorada da Liberdade: O Mártir que Virou Bandeira no Coração do Brasil'
    ],
    narrativePerspectives: [
      'o idealismo dos poetas árcades compondo versos e leis para um Brasil soberano e livre de impostos',
      'a trajetória de Tiradentes como mártir que pagou com a vida para que a ideia de república não morresse',
      'a cenografia barroca de ladeiras e sinos coloniais desfilando em cortejo de rara erudição popular'
    ]
  },

  // --- CULTURAL, BOEMIA E ARTES ---
  {
    id: 'lapa_malandragem',
    themeType: 'Cultural',
    subject: 'A Boemia da Lapa e a Nobreza da Malandragem Carioca',
    keywords: ['lapa', 'boemia', 'malandro', 'navalha', 'madame-sata', 'arcos'],
    baseQuality: 15,
    baseCost: 190000,
    titleVariants: [
      'Sob os Arcos da Glória: Terno de Linho, Chapéu de Palha e a Ginga Imortal da Lapa',
      'Madame Satã e os Mestres da Noite: A Poesia Subversiva dos Cabarés Cariocas',
      'Malandragem Nobre: O Passo Elegante que Fez do Samba a Identidade da Cidade',
      'Nas Esquinas do Pecado e da Poesia: A Lapa dos Boêmios que Jamais Dormem'
    ],
    narrativePerspectives: [
      'a transformação do malandro marginalizado em símbolo estético e cultural de inteligência e drible',
      'a crônica de uma noite sem fim nos Arcos onde poetas, operários e cantores inventaram o Rio boêmio',
      'o desfile teatralizado de malandros com passos de dança de gafieira e comissão de frente com navalha de ouro'
    ]
  },
  {
    id: 'auto_armorial_suassuna',
    themeType: 'Cultural',
    subject: 'Ariano Suassuna e o Reino Armorial do Sertão',
    keywords: ['suassuna', 'armorial', 'nordeste', 'compadecida', 'cordel'],
    baseQuality: 15,
    baseCost: 200000,
    titleVariants: [
      'O Auto da Sapucaí: A Dança das Onças no Reino Encantado de Ariano Suassuna',
      'Armorial do Meu Sertão: Da Rabeca ao Cordel, o Brasil Profundo na Passarela',
      'A Compadecida Intercede no Asfalto: Chicó e João Grilo em Folia de Reis',
      'Romanceiro Popular: As Cavalhadas, os Bonecos de Barro e o Estandarte da Iluminura'
    ],
    narrativePerspectives: [
      'a dignificação estética da cultura popular nordestina aliada à nobreza barroca ibérica',
      'a farsa teatral de João Grilo enganando os poderosos com inteligência e humor sertanejo',
      'um espetáculo policromático de tapeçarias armoriais, xilogravuras gigantes e reisados festivos'
    ]
  },
  {
    id: 'circo_mambembe_piolim',
    themeType: 'Cultural',
    subject: 'O Circo Mambembe e a Graça Imortal de Piolim',
    keywords: ['circo', 'palhaco', 'piolim', 'trapezio', 'picadeiro', 'magia'],
    baseQuality: 13,
    baseCost: 180000,
    titleVariants: [
      'Respeitável Público! O Circo Mambembe e o Riso Sagrado do Grande Piolim',
      'A Lona das Ilusões: Trapezeiros da Esperança e a Caravana da Alegria Popular',
      'O Palhaço Chora de Rir: A Poesia do Picadeiro sob o Céu Estrelado do Brasil',
      'Sonho no Trapézio: Onde Todo Pobre Vira Rei e a Tristeza Pede Passagem'
    ],
    narrativePerspectives: [
      'a magia itinerante das trupes circenses que levavam arte e encantamento às cidades mais distantes',
      'a genialidade dos palhaços brasileiros que inspiraram a Semana de Arte Moderna de 1922',
      'a apoteose lúdica com acrobatas voando nos carros alegóricos e pierrôs chorando de felicidade'
    ]
  },

  // --- HOMENAGENS: Baluartes do Samba e da Música Popular ---
  {
    id: 'cartola_poeta_das_rosas',
    themeType: 'Homenagem',
    subject: 'Angenor de Oliveira, o Cartola: As Rosas Não Falam',
    keywords: ['cartola', 'mangueira', 'poeta', 'rosas', 'verde-rosa', 'alvorada'],
    baseQuality: 16,
    baseCost: 210000,
    titleVariants: [
      'As Rosas Falam por Ti: A Poesia Eterna de Cartola no Alvorecer do Samba',
      'O Divino Cartola: Do Silêncio da Colina à Consagração da Obra-Prima',
      'O Sol Nascerá: A Vida, as Dores e o Violão Encantado do Mestre de Todos Nós',
      'Zica e Cartola: O Banquete do Samba no Coração Verde e Rosa do Morro'
    ],
    narrativePerspectives: [
      'a trajetória de superação do pedreiro e lavador de carros que compôs as mais belas melodias do mundo',
      'o lirismo sofisticado das harmonias de Cartola que uniram a academia à poética popular da favela',
      'uma procissão lírica com chuvas de pétalas de rosas e violões de ouro emocionando a plateia'
    ]
  },
  {
    id: 'clara_nunes_sabia',
    themeType: 'Homenagem',
    subject: 'Clara Nunes: O Sabiá de Minas e a Deusa dos Terreiros',
    keywords: ['clara-nunes', 'portela', 'terreiro', 'sabia', 'mineira', 'orixas'],
    baseQuality: 16,
    baseCost: 210000,
    titleVariants: [
      'O Canto do Sabiá: Clara Nunes, as Águas de Oxum e o Axé que Clareia a Passarela',
      'Guerreira da Luz: Vestida de Branco com Colares de Fé, Clara Ilumina o Asfalto',
      'Ê Baiana! A Força do Canto que Uniu o Jongo, o Terreiro e o Pavilhão da Folia',
      'Clara Clareou: Da Estalagem de Cedro à Imortalidade no Altar do Samba'
    ],
    narrativePerspectives: [
      'a cantora que assumiu com orgulho as vestimentas brancas e os búzios dos orixás na televisão brasileira',
      'a voz cristalina que pesquisou as matrizes do samba rural, dos maracatus e das tradições afro-mineiras',
      'um cortejo celestial onde a arquibancada inteira canta de braços abertos num coro comovente'
    ]
  },
  {
    id: 'dona_ivone_lara',
    themeType: 'Homenagem',
    subject: 'Dona Ivone Lara: A Primeira-Dama do Samba e Enfermeira da Alma',
    keywords: ['ivone-lara', 'imperio', 'enfermeira', 'cavaquinho', 'serrinha'],
    baseQuality: 15,
    baseCost: 205000,
    titleVariants: [
      'Sonho Meu: Dona Ivone Lara, a Dama do Cavaquinho e o Bálsamo da Loucura',
      'A Rainha da Serrinha: A Mulher Pioneira que Venceu o Preconceito com Nota 10',
      'Nas Asas do Império: O Canto Doce da Enfermeira que Curava com Amor e Melodia',
      'Tiê, Tiê! O Canto Livre de Uma Guerreira que Virou História Nacional'
    ],
    narrativePerspectives: [
      'o trabalho pioneiro de Ivone Lara na terapia ocupacional psiquiátrica ao lado de Nise da Silveira',
      'a quebra histórica de paradigmas como a primeira mulher a assinar um samba-enredo na elite carioca',
      'a elegância altiva das baianas rodopiando com leques dourados ao som do compasso inconfundível do Tiê'
    ]
  },
  {
    id: 'noel_rosa_filosofo_da_vila',
    themeType: 'Homenagem',
    subject: 'Noel Rosa: O Filósofo do Samba e Poeta da Cidade',
    keywords: ['noel-rosa', 'vila-isabel', 'poeta', 'cronista', 'boemia', 'filosofo'],
    baseQuality: 15,
    baseCost: 200000,
    titleVariants: [
      'Com que Roupa? Noel Rosa, o Cronista do Povo e o Coração do 28 de Setembro',
      'O Poeta da Vila: Filosofia de Beco, Feitiço de Mulher e Conversa de Botequim',
      'Palpite Infeliz Jamais! Noel Escreve a Crônica Imortal da Cidade Maravilhosa',
      'A Voz que Não se Esquece: O Jovem Gênio que Transformou a Fala do Povo em Arte Pura'
    ],
    narrativePerspectives: [
      'o cronista mordaz que retratou com inteligência e humor as agruras e delícias do trabalhador carioca',
      'o duelo lírico com Wilson Batista que gerou alguns dos sambas mais geniais da história brasileira',
      'a cenografia nostálgica dos bondes de Santa Teresa, mesas de ferro fundido e partituras ao vento'
    ]
  },
  {
    id: 'elza_soares_mulher_do_fim_do_mundo',
    themeType: 'Homenagem',
    subject: 'Elza Soares: A Mulher do Fim do Mundo',
    keywords: ['elza-soares', 'mocidade', 'resistencia', 'grito', 'planeta-fome', 'jazz'],
    baseQuality: 16,
    baseCost: 215000,
    titleVariants: [
      'A Mulher do Fim do Mundo: Elza Soares e o Grito que Rompeu a Fome do Planeta',
      'Gogó de Ouro e Raça: A Epopeia da Menina da Favela que Conquistou o Mundo',
      'Deus é Mulher! O Trono Futurista da Deusa Negra da Canção e do Samba',
      'Canta até o Fim: A Voz Rasgada da Liberdade que Jamais Dobrou os Joelhos'
    ],
    narrativePerspectives: [
      'a resiliência épica de quem enfrentou a pobreza, a violência e a perda sem jamais perder a voz nem a luta',
      'a vanguarda musical de Elza misturando o samba de raiz com distorções eletrônicas e jazz',
      'uma apoteose cósmica com alegorias futuristas e coroas de lâmpadas comemorando a imortalidade'
    ]
  },

  // --- FOLCLORE, LENDAS E MISTICISMO ---
  {
    id: 'parintins_garantido_caprichoso',
    themeType: 'Folclore & Lendas',
    subject: 'O Festival de Parintins: O Duelo das Cores na Floresta',
    keywords: ['parintins', 'garantido', 'caprichoso', 'boi-bumba', 'amazonia', 'cunha-poranga'],
    baseQuality: 14,
    baseCost: 195000,
    titleVariants: [
      'O Rugido dos Bois na Selva: Garantido e Caprichoso no Bumbódromo das Ilusões',
      'Festa na Aldeia das Águas: A Lenda de Catirina e o Mistério dos Pajés Amazônicos',
      'Vermelho de Paixão, Azul de Maravilha: O Duelo Encantado dos Bois de Parintins',
      'Cunhã-Poranga e o Trovão da Batucada: A Ópera Cabocla que Faz o Brasil Tremer'
    ],
    narrativePerspectives: [
      'o espetáculo monumental e a coreografia sincronizada das galeras e tribos no coração do Amazonas',
      'a preservação da ancestralidade indígena unida à alegria popular do boi-bumbá ribeirinho',
      'alegorias gigantescas articuladas que se transformam na passarela com efeitos teatrais assombrosos'
    ]
  },
  {
    id: 'bumba_meu_boi_maranhao',
    themeType: 'Folclore & Lendas',
    subject: 'O Bumba Meu Boi do Maranhão: A Festa dos Santos e Cazumbás',
    keywords: ['maranhao', 'bumba-boi', 'cazumba', 'matracas', 'sao-joao'],
    baseQuality: 14,
    baseCost: 190000,
    titleVariants: [
      'No Toque das Matracas: O Bumba Meu Boi e o Manto de Contas de São João',
      'Cazumbá Mascarado e a Máscara da Selva: O Mistério Encantado dos Terreiros Maranhenses',
      'O Boi de Guimarães a São Luís: Da Morte à Ressurreição na Cadência da Tradição',
      'Bordado em Estrelas e Vidrilhos: O Batalhão Pesado da Ilha do Amor'
    ],
    narrativePerspectives: [
      'a riqueza dos sotaques de zabumba, matraca e orquestra na consagração do patrimônio cultural da humanidade',
      'a figura mística do Cazumbá como guardião brincalhão e assombroso das matas e dos terreiros',
      'o brilho ofuscante dos couros de boi ricamente bordados com veludo, pedrarias e fitas multicoloridas'
    ]
  },
  {
    id: 'curupira_iara_encantados',
    themeType: 'Folclore & Lendas',
    subject: 'Os Guardiões da Mata: Curupira, Iara e os Encantados do Brasil',
    keywords: ['curupira', 'iara', 'encantados', 'lendas', 'floresta', 'boto'],
    baseQuality: 13,
    baseCost: 185000,
    titleVariants: [
      'Vozes da Mata Misteriosa: O Curupira Protetor e o Canto Sereia da Iara nas Águas',
      'Pegadas Invertidas no Chão da Selva: A Sabedoria dos Espíritos Guardiões',
      'Noites de Lua e Encantaria: O Boto Galanteador e as Lendas que Salvam a Floresta',
      'A Cidade dos Encantados: O Mundo Oculto onde os Animais e os Deuses se Abraçam'
    ],
    narrativePerspectives: [
      'o papel ecológico das lendas ancestrais que impunham medo aos destruidores da natureza',
      'a sensualidade mística das águas fluviais com sereias e botos desafiando o racionalismo ocidental',
      'uma floresta cenográfica viva onde as árvores caminham e os olhos dos animais iluminam a Sapucaí'
    ]
  },

  // --- AMBIENTAL, NATUREZA E BIOMAS ---
  {
    id: 'rios_voadores_amazonia',
    themeType: 'Ambiental & Natureza',
    subject: 'Os Rios Voadores da Amazônia e o Clamor da Mãe Terra',
    keywords: ['amazonia', 'rios-voadores', 'chuva', 'clima', 'arvores', 'indigenas'],
    baseQuality: 15,
    baseCost: 200000,
    titleVariants: [
      'Rios que Voam pelos Céus: O Hálito da Floresta que Faz Chover a Vida no Brasil',
      'O Clamor da Mãe Terra: Das Raízes da Samaúma ao Coração dos Povos Originários',
      'Sinfonia da Selva Viva: As Nuvens Sagradas que Nascem nas Folhas da Amazônia',
      'Água que Brota do Vento: A Ciência Ancestral dos Guardiões do Pulmão Tropical'
    ],
    narrativePerspectives: [
      'a poesia científica do fenômeno da evapotranspiração que conduz a umidade da floresta por todo o continente',
      'a denúncia contundente contra o desmatamento e o garimpo que envenenam os rios sagrados dos povos indígenas',
      'alegorias monumentais que borrifam névoa perfumada e exibem árvores gigantescas com cascatas de água limpa'
    ]
  },
  {
    id: 'pantanal_onca_aguas',
    themeType: 'Ambiental & Natureza',
    subject: 'O Pantanal das Águas e o Reino da Onça-Pintada',
    keywords: ['pantanal', 'onca-pintada', 'tuiuiu', 'aguas', 'bioma', 'biodiversidade'],
    baseQuality: 14,
    baseCost: 190000,
    titleVariants: [
      'O Espelho das Águas Infinitas: O Voo do Tuiuiú e o Passo Soberano da Onça-Pintada',
      'Pantanal Selvagem: A Dança das Cheias e das Secas no Coração do Paraíso Tropical',
      'O Rugido que Protege a Vida: Preservar as Veredas e os Corredores de Esperança',
      'Arca da Criação no Mato Grosso: Onde os Bichos Ensinam o Homem a Viver em Paz'
    ],
    narrativePerspectives: [
      'a beleza comovente do maior pantanal alagável do planeta em seus ciclos de cheia e renascimento',
      'a força majestosa da onça-pintada como ápice da cadeia ecológica e símbolo de garra nacional',
      'alas deslumbrantes imitando revoadas de tuiuiús, vitórias-régias douradas e camalotes flutuantes'
    ]
  },

  // --- CRÍTICA SOCIAL E CIDADANIA ---
  {
    id: 'favela_resiste_juventude',
    themeType: 'Crítica Social',
    subject: 'A Favela Vive e Vence: A Juventude que Transforma com Arte e Dignidade',
    keywords: ['favela', 'comunidade', 'juventude', 'trabalhador', 'esperanca', 'resistencia'],
    baseQuality: 15,
    baseCost: 195000,
    titleVariants: [
      'A Favela é o Meu Palácio: O Grito dos Becos que Rompe o Asfalto e Conquista o Mundo',
      'A Caneta, o Pincel e o Microfone: A Juventude Periférica na Batalha da Cidadania',
      'Nem Bala, Nem Silêncio: A Força Inquebrantável das Mães que Sustentam a Colina',
      'Deus do Morro: A Beleza do Povo Trabalhador que Desce a Ladeira para Ensinar a Viver'
    ],
    narrativePerspectives: [
      'a celebração das lideranças jovens, educadores populares e empreendedores culturais das periferias',
      'a crítica contundente à violência de Estado e à desigualdade que tenta calar a criatividade comunitária',
      'um desfile vibrante e arrebatador onde as alas representam os heróis anônimos do cotidiano carioca'
    ]
  },
  {
    id: 'merenda_educacao_liberta',
    themeType: 'Crítica Social',
    subject: 'A Educação que Liberta: O Livro, a Merenda e o Futuro das Crianças',
    keywords: ['educacao', 'escola', 'livro', 'professor', 'criancas', 'paulo-freire'],
    baseQuality: 14,
    baseCost: 185000,
    titleVariants: [
      'A Caneta que Desperta o Gigante: O Livro na Mão do Menino e o Sonho da Nação',
      'Sala de Aula, Templo da Esperança: O Valor Sagrado dos Mestres e Educadores',
      'Pedagogia do Amor e da Palavra: Como o Conhecimento Rompe as Grades do Cativeiro',
      'O Futuro Começa na Cartilha: A Criança sem Fome e com Asas para Voar'
    ],
    narrativePerspectives: [
      'a homenagem reverente aos professores do ensino público que constroem a cidadania dia a dia',
      'a reflexão sobre a necessidade básica de alimentação e carinho para que a infância possa florescer',
      'alas pedagógicas e lúdicas com lápis coloridos gigantes, alfabetos dançantes e cortejo de diplomas de honra'
    ]
  },

  // --- SURREALISTA E ONÍRICO ---
  {
    id: 'senhor_do_tempo_ampulheta',
    themeType: 'Surrealista',
    subject: 'O Senhor do Tempo: A Ampulheta Cósmica e o Carnaval da Eternidade',
    keywords: ['tempo', 'ampulheta', 'relogio', 'eternidade', 'memoria', 'delirio'],
    baseQuality: 15,
    baseCost: 205000,
    titleVariants: [
      'O Senhor das Quatro Estações: As Engrenagens do Tempo e o Delírio da Ampulheta',
      'Passado, Presente e o Infinito: A Máquina Cósmica que Fabrica os Sonhos da Folia',
      'Um Segundo de Ilusão: Quando o Relógio Pára e a Sapucaí Vira Eterna',
      'O Labirinto das Memórias: Relógios Derretidos e o Sorriso que Nunca Envelhece'
    ],
    narrativePerspectives: [
      'a reflexão existencial sobre a efemeridade da vida e a eternidade da arte do carnaval',
      'a viagem delirante por eras pretéritas e galáxias futuras guiada pelas engrenagens de um relógio solar',
      'efeitos ilusionistas deslumbrantes com ponteiros gigantes, pêndulos oscilantes e máscaras espelhadas'
    ]
  },

  // --- PATROCINADOS CULTURAIS DE ALTO NÍVEL ---
  {
    id: 'minas_estrada_real',
    themeType: 'Patrocinado',
    subject: 'A Estrada Real de Minas: Ouro, Diamantes e Tradições Barrocas',
    keywords: ['minas', 'estrada-real', 'ouro', 'diamantina', 'barroco', 'tiradentes'],
    baseQuality: 11,
    baseCost: 0,
    isSponsored: true,
    sponsorName: 'Circuito Turístico e Governo do Estado de Minas Gerais',
    sponsorType: 'Cidade / Estado',
    sponsorValues: { especial: 5500000, ouro: 2200000, prata: 950000, bronze: 480000, avaliacao: 240000 },
    tradeoff: 'Aporte financeiro gigantesco e grande simpatia do público. Exige pesquisa plástica apurada para honrar o barroco mineiro.',
    titleVariants: [
      'Pelos Caminhos da Estrada Real: Minas Gerais, o Ouro das Gerais e a Fé que Esculpe o Brasil',
      'Nas Pegadas dos Tropeiros: Ouro Preto, Diamantes e a Nobreza da Cozinha Mineira',
      'O Canto dos Sinos Coloniais: O Circuito da Estrada Real na Passarela da Cidade Maravilhosa',
      'De Paraty a Diamantina: A Rota Imperial que Ensinou a Pátria a Cantar'
    ],
    narrativePerspectives: [
      'o resgate das rotas coloniais que transportavam as riquezas do interior até os portos do Rio de Janeiro',
      'a culinária de tacho, a hospitalidade e a religiosidade barroca esculpida na pedra-sabão por Aleijadinho',
      'cortejo dourado de carruagens coloniais, estandartes de congado e arcos sacros de impressionante beleza'
    ]
  },
  {
    id: 'cafe_vale_do_paraiba',
    themeType: 'Patrocinado',
    subject: 'O Ciclo do Café e as Terras do Vale do Paraíba',
    keywords: ['cafe', 'vale-paraiba', 'grao', 'fazendas', 'trilhos', 'aroma'],
    baseQuality: 10,
    baseCost: 0,
    isSponsored: true,
    sponsorName: 'Consórcio Nacional dos Cafeicultores e Fazendas Históricas',
    sponsorType: 'Agronegócio / Indústria',
    sponsorValues: { especial: 5300000, ouro: 2100000, prata: 900000, bronze: 450000, avaliacao: 225000 },
    tradeoff: 'Excelente injeção de receita no barracão. Exige cuidado cenográfico para valorizar o trabalhador rural e evitar o tom corporativo.',
    titleVariants: [
      'O Grão Dourado que Conquistou o Mundo: O Perfume do Café nas Terras do Vale',
      'No Balanço dos Trens de Ferro: A Epopeia do Café da Terra Vermelha à Xícara do Povo',
      'Sinfonia da Florada Branca: O Aroma que Move a Economia e Faz o Brasil Despertar',
      'Das Fazendas Históricas ao Porto: A Saga das Mãos Calejadas que Colheram a Riqueza'
    ],
    narrativePerspectives: [
      'a história social do grão de café que financiou a urbanização, os trilhos e os teatros brasileiros',
      'o tributo comovente aos trabalhadores rurais que de sol a sol cultivam o fruto da terra',
      'alegorias ricas em folhas de café verdejantes, sacas de juta e locomotivas fumegantes cortando o vale'
    ]
  },
  {
    id: 'aviacao_santos_dumont',
    themeType: 'Patrocinado',
    subject: 'Santos Dumont e as Asas da Inovação Brasileira',
    keywords: ['santos-dumont', 'aviacao', '14-bis', 'paris', 'inovacao', 'ceu'],
    baseQuality: 12,
    baseCost: 0,
    isSponsored: true,
    sponsorName: 'Empresa Brasileira de Tecnologia Aeronáutica e Defesa',
    sponsorType: 'Tecnologia / Inovação',
    sponsorValues: { especial: 5600000, ouro: 2300000, prata: 980000, bronze: 500000, avaliacao: 250000 },
    tradeoff: 'Patrocínio de peso com forte apelo patriótico e científico. Muito bem aceito se focar na genialidade poética de Dumont.',
    titleVariants: [
      'O Sonho de Voar: Santos Dumont, o 14-Bis e as Asas que Desafiaram a Gravidade',
      'Nos Céus de Paris o Brasil se Eleva: O Pai da Aviação e o Clarim da Invenção',
      'As Asas do Futuro: Da Seda dos Balões aos Jatos que Cruzam o Firmamento',
      'O Voo do Beija-Flor Humano: Como um Brasileiro Deu Asas à Humanidade'
    ],
    narrativePerspectives: [
      'o idealismo poético de Santos Dumont ao contornar a Torre Eiffel e presentear o mundo com a aviação pública',
      'o orgulho nacional de pioneirismo tecnológico e engenhosidade aeroespacial que ecoa até os dias de hoje',
      'efeitos aéreos na avenida com réplicas motorizadas do 14-Bis e acrobatas suspensos em balões iluminados'
    ]
  },
  {
    id: 'mar_paraty_turismo',
    themeType: 'Patrocinado',
    subject: 'Paraty: Patrimônio da Humanidade entre a Serra e o Mar',
    keywords: ['paraty', 'costa-verde', 'mar', 'literatura', 'pedras-pes-de-moleque'],
    baseQuality: 11,
    baseCost: 0,
    isSponsored: true,
    sponsorName: 'Fundo Municipal de Fomento ao Turismo de Paraty e Ilha Grande',
    sponsorType: 'Patrimônio Histórico',
    sponsorValues: { especial: 5400000, ouro: 2150000, prata: 930000, bronze: 470000, avaliacao: 235000 },
    tradeoff: 'Renda direta de turismo aliada a forte apelo literário (FLIP) e beleza náutica exuberante.',
    titleVariants: [
      'Onde as Pedras Encontram o Mar: Paraty, o Casario Nobre e a Magia da Costa Verde',
      'Maré Alta na Passarela: A Cidade Literária que Guarda os Segredos da Baía',
      'Caminhos do Ouro e da Cachaça: Paraty em Festa no Abraço da Mata Atlântica',
      'O Espelho das Ruas Alagadas: Paraty Desfila sua História sob o Luar dos Poetas'
    ],
    narrativePerspectives: [
      'o charme único das ruas coloniais calçadas em pedras pés-de-moleque invadidas pelas marés místicas',
      'a convergência vibrante entre a literatura contemporânea, as comunidades caiçaras e as vilas de pescadores',
      'alegorias azuis e brancas com barcos de pesca iluminados e fachadas coloniais floridas com bougainvilles'
    ]
  }
];

// Expansive procedural subjects repository with rich metadata
export interface ProceduralSubject {
  name: string;
  theme: EnredoThemeType;
  boost: number;
  keywords: string[];
  historicalAngle: string;
  isSponsored?: boolean;
  sponsorName?: string;
}

export const PROCEDURAL_SUBJECTS: ProceduralSubject[] = [
  // Afro-brasileiro
  { name: 'O Trono Sagrado de Oyó e a Justiça dos Tambores', theme: 'Afro-brasileiro', boost: 14, keywords: ['xango', 'oyo', 'justica', 'trovao'], historicalAngle: 'a justiça distributiva dos deuses africanos' },
  { name: 'O Reino das Yabás: As Mães d’Água e o Espelho Dourado', theme: 'Afro-brasileiro', boost: 14, keywords: ['yabas', 'oxum', 'iemanja', 'aguas'], historicalAngle: 'o matriarcado sagrado que rege a vida' },
  { name: 'Oxóssi Caçador: O Segredo das Folhas e o Canto de Keto', theme: 'Afro-brasileiro', boost: 13, keywords: ['oxossi', 'keto', 'folhas', 'mata'], historicalAngle: 'a preservação das matas e o sustento da comunidade' },
  { name: 'Orixá da Criação: O Alvorecer Branco de Oxalá', theme: 'Afro-brasileiro', boost: 15, keywords: ['oxala', 'paz', 'branco', 'criacao'], historicalAngle: 'a alvorada da paz e a tolerância religiosa' },
  { name: 'A Lança de Ogum e a Forja Sagrada dos Caminhos', theme: 'Afro-brasileiro', boost: 13, keywords: ['ogum', 'ferro', 'guerra', 'caminhos'], historicalAngle: 'o ferro que liberta e abre portas para os desfavorecidos' },
  { name: 'Obaluaê nas Palhas da Cura: A Renovação da Terra', theme: 'Afro-brasileiro', boost: 13, keywords: ['obaluae', 'omolu', 'palha', 'cura'], historicalAngle: 'o alento aos enfermos e o respeito aos anciãos' },
  { name: 'Logun Edé: A Doçura das Cachoeiras e a Audácia da Caça', theme: 'Afro-brasileiro', boost: 14, keywords: ['logun', 'ouro', 'caca', 'doce'], historicalAngle: 'a harmonia do belo e a inteligência dos jovens' },
  { name: 'Mansa Musa e o Império Dourado do Mali', theme: 'Afro-brasileiro', boost: 15, keywords: ['mali', 'mansa-musa', 'ouro', 'africa', 'sabedoria'], historicalAngle: 'a grandeza econômica e intelectual dos impérios africanos' },
  { name: 'O Reino de Axum e os Obeliscos do Sol', theme: 'Afro-brasileiro', boost: 14, keywords: ['axum', 'etiopia', 'obelisco', 'historia'], historicalAngle: 'a resistência milenar da Etiópia independente' },
  { name: 'Luísa Mahin e a Conspiração dos Alfaiates', theme: 'Afro-brasileiro', boost: 14, keywords: ['luisa-mahin', 'bahia', 'revolta', 'liberdade'], historicalAngle: 'a conspiração revolucionária liderada por mulheres negras' },
  { name: 'Chico Rei e a Alforria nas Minas de Ouro Preto', theme: 'Afro-brasileiro', boost: 14, keywords: ['chico-rei', 'ouro-preto', 'alforria', 'minas'], historicalAngle: 'a conquista da liberdade através da solidariedade comunitária' },
  { name: 'Afoxé Filhos de Gandhy: O Tapete Branco da Paz', theme: 'Afro-brasileiro', boost: 13, keywords: ['afoxe', 'gandhy', 'salvador', 'paz'], historicalAngle: 'o cortejo de alfazema que pacifica o carnaval' },

  // Histórico
  { name: 'A Revolta da Vacina e o Povo da Saúde', theme: 'Histórico', boost: 13, keywords: ['vacina', 'saude', 'prata-preta', 'rio'], historicalAngle: 'a revolta dos moradores do porto contra os despejos' },
  { name: 'A Balaiada e os Vaqueiros do Maranhão', theme: 'Histórico', boost: 13, keywords: ['balaiada', 'maranhao', 'vaqueiro', 'revolta'], historicalAngle: 'a luta dos camponeses contra as oligarquias coloniais' },
  { name: 'A Estrada de Ferro Central do Brasil e os Trens do Subúrbio', theme: 'Histórico', boost: 14, keywords: ['trem', 'central', 'suburbio', 'trabalhador'], historicalAngle: 'as veias de ferro que conectaram o subúrbio à memória operária' },
  { name: 'A Epopeia de Canudos e o Canto do Arraial', theme: 'Histórico', boost: 14, keywords: ['canudos', 'arraial', 'sertao', 'terra'], historicalAngle: 'a resistência sertaneja de Belo Monte' },
  { name: 'Os Jangadeiros do Ceará e o Fim do Tráfico Negreiro', theme: 'Histórico', boost: 14, keywords: ['jangadeiro', 'dragao-do-mar', 'ceara', 'mar'], historicalAngle: 'a recusa heroica dos marinheiros em embarcar escravizados' },
  { name: 'A Guerra dos Mascates e o Orgulho de Olinda', theme: 'Histórico', boost: 12, keywords: ['mascates', 'olinda', 'recife', 'pernambuco'], historicalAngle: 'a disputa colonial entre mercadores e fidalgos' },
  { name: 'A Confederação do Equador e Frei Caneca', theme: 'Histórico', boost: 13, keywords: ['confederacao', 'frei-caneca', 'nordeste', 'republica'], historicalAngle: 'o sonho republicano e a coragem do frade jornalista' },

  // Cultural & Boemia
  { name: 'Machado de Assis: O Bruxo do Cosme Velho', theme: 'Cultural', boost: 15, keywords: ['machado', 'cosme-velho', 'bruxo', 'literatura'], historicalAngle: 'a fina ironia do maior escritor do país decifrando o Rio' },
  { name: 'Lima Barreto: A Voz dos Excluídos no Subúrbio Carioca', theme: 'Cultural', boost: 14, keywords: ['lima-barreto', 'suburbio', 'policarpo', 'cronica'], historicalAngle: 'a literatura engajada contra o racismo e a hipocrisia' },
  { name: 'Carolina Maria de Jesus e o Quarto de Despejo', theme: 'Cultural', boost: 15, keywords: ['carolina', 'quarto-despejo', 'favela', 'literatura'], historicalAngle: 'a escrita crua e poética que denunciou a fome e comoveu o planeta' },
  { name: 'A Belle Époque Carioca e a Confeitaria Colombo', theme: 'Cultural', boost: 13, keywords: ['belle-epoque', 'colombo', 'cinelandia', 'teatro'], historicalAngle: 'o fausto dos salões de espelhos e a boemia dos jornais' },
  { name: 'As Gafieiras do Catete e a Elegância do Samba de Salão', theme: 'Cultural', boost: 13, keywords: ['gafieira', 'catete', 'danca', 'elegancia'], historicalAngle: 'a disciplina do passo e a elegância dos salões populares' },
  { name: 'O Cordel Encantado e as Gravuras do Padre Cícero', theme: 'Cultural', boost: 13, keywords: ['cordel', 'xilogravura', 'juazeiro', 'sertao'], historicalAngle: 'a imprensa dos pobres rimando a vida no sertão' },
  { name: 'Tarsila do Amaral e o Banquete do Abaporu', theme: 'Cultural', boost: 14, keywords: ['tarsila', 'abaporu', 'modernismo', 'antropofagia'], historicalAngle: 'a reinvenção modernista que deglutiu a cultura estrangeira' },

  // Homenagem
  { name: 'Silas de Oliveira: O Poeta Monumental da Serrinha', theme: 'Homenagem', boost: 15, keywords: ['silas', 'imperio', 'serrinha', 'monumental'], historicalAngle: 'o maior autor de sambas-enredo de todos os tempos' },
  { name: 'Paulinho da Viola: O Azul e Branco do Choro e do Samba', theme: 'Homenagem', boost: 16, keywords: ['paulinho', 'portela', 'choro', 'elegancia'], historicalAngle: 'a nobreza do cavaquinho que canta o amor e a amizade' },
  { name: 'Clementina de Jesus: A Voz Ancestral que Ecoa dos Troncos', theme: 'Homenagem', boost: 15, keywords: ['clementina', 'troncos', 'partido-alto', 'raiz'], historicalAngle: 'o elo sagrado entre a África e o samba moderno' },
  { name: 'Pixinguinha: O Carinhoso Saxofone de Ouro do Brasil', theme: 'Homenagem', boost: 15, keywords: ['pixinguinha', 'choro', 'carinhoso', 'saxofone'], historicalAngle: 'o pai da música instrumental e arranjador fundamental' },
  { name: 'Alcione: A Voz Maranhense que Conquistou a Sapucaí', theme: 'Homenagem', boost: 15, keywords: ['alcione', 'maranhao', 'trompete', 'mangueira'], historicalAngle: 'a força inconfundível da Marrom e sua paixão comunitária' },
  { name: 'Jamelão: A Voz de Trovão que Eternizou o Samba-Enredo', theme: 'Homenagem', boost: 15, keywords: ['jamelao', 'interprete', 'mangueira', 'trovao'], historicalAngle: 'o mestre supremo dos intérpretes oficiais da avenida' },
  { name: 'Arlindo Cruz: O Banjo Abençoado de Madureira', theme: 'Homenagem', boost: 15, keywords: ['arlindo', 'banjo', 'madureira', 'pagode'], historicalAngle: 'o compositor prodigioso que uniu o pagode à passarela' },
  { name: 'Joãosinho Trinta: O Alquimista que Transformou Lixo em Luxo', theme: 'Homenagem', boost: 16, keywords: ['joaosinho-trinta', 'salgueiro', 'beija-flor', 'luxo'], historicalAngle: 'a revolução estética que transformou o desfile em ópera a céu aberto' },

  // Folclore & Lendas
  { name: 'A Lenda da Iara e os Mistérios das Águas Doces', theme: 'Folclore & Lendas', boost: 13, keywords: ['iara', 'sereia', 'rio', 'lenda'], historicalAngle: 'o encanto místico que guarda os leitos dos rios amazônicos' },
  { name: 'A Festa do Divino Espírito Santo e as Bandeiras de Fitas', theme: 'Folclore & Lendas', boost: 13, keywords: ['divino', 'bandeiras', 'maranhao', 'imperador'], historicalAngle: 'a coroação popular dos imperadores mirins e caixeiras' },
  { name: 'A Cavalhada de Pirenópolis: A Batalha das Cores', theme: 'Folclore & Lendas', boost: 13, keywords: ['cavalhadas', 'pirenopolis', 'mouros', 'cristaos'], historicalAngle: 'a encenação épica dos cavaleiros com máscaras de boi' },
  { name: 'O Boi de Mamão e as Bruxas do Litoral Catarinense', theme: 'Folclore & Lendas', boost: 12, keywords: ['boi-mamao', 'santa-catarina', 'bruxas', 'litoral'], historicalAngle: 'o auto lúdico e açoriano nas areias do sul' },

  // Ambiental & Natureza
  { name: 'O Cerrado Berço das Águas: Veredas Douradas da Vida', theme: 'Ambiental & Natureza', boost: 14, keywords: ['cerrado', 'veredas', 'aguas', 'natureza'], historicalAngle: 'o bioma que abastece as maiores bacias hidrográficas do país' },
  { name: 'O Rio São Francisco: O Velho Chico e as Carrancas do Sertão', theme: 'Ambiental & Natureza', boost: 14, keywords: ['velho-chico', 'sao-francisco', 'carrancas', 'ribeirinhos'], historicalAngle: 'a artéria vital que alimenta a esperança de cinco estados' },
  { name: 'Lençóis Maranhenses: Oásis de Lagoas entre Dunas de Cristal', theme: 'Ambiental & Natureza', boost: 13, keywords: ['lencois', 'maranhao', 'dunas', 'lagoas'], historicalAngle: 'o milagre natural onde a chuva cria rios no deserto' },
  { name: 'A Mata Atlântica e as Escarpas Verdes da Serra do Mar', theme: 'Ambiental & Natureza', boost: 13, keywords: ['mata-atlantica', 'serra-do-mar', 'biodiversidade', 'verde'], historicalAngle: 'o abraço verde que protege a costa e as fontes da cidade' },

  // Crítica Social
  { name: 'O Pão Nosso de Cada Dia: A Dignidade dos Que Constroem o País', theme: 'Crítica Social', boost: 14, keywords: ['trabalhador', 'pao', 'suor', 'dignidade'], historicalAngle: 'o valor sagrado dos pedreiros, garis e operários' },
  { name: 'A Cidade que Não Dorme: O Grito por Moradia e Transporte Digno', theme: 'Crítica Social', boost: 13, keywords: ['moradia', 'transporte', 'mobilidade', 'povo'], historicalAngle: 'a rotina heroica de quem cruza a metrópole pelo sustento' },
  { name: 'Vozes da Diversidade: O Amor Sem Correntes na Passarela', theme: 'Crítica Social', boost: 14, keywords: ['diversidade', 'respeito', 'amor', 'inclusao'], historicalAngle: 'a celebração democrática do respeito a todas as existências' },

  // Surrealista
  { name: 'O Labirinto dos Espelhos e a Ilusão das Máscaras', theme: 'Surrealista', boost: 14, keywords: ['espelhos', 'mascara', 'ilusao', 'delirio'], historicalAngle: 'a pergunta eterna sobre quem somos por trás da fantasia' },
  { name: 'A Dança das Constelações no Zodíaco do Samba', theme: 'Surrealista', boost: 13, keywords: ['constelacoes', 'zodiaco', 'astros', 'ceu'], historicalAngle: 'o mapa das estrelas desenhado pelos tamborins' },
  { name: 'O Teatro Mágico da Vida: Bonecos, Mágicos e Acrobatas', theme: 'Surrealista', boost: 13, keywords: ['teatro', 'magico', 'marionetes', 'vida'], historicalAngle: 'o espetáculo que transforma o asfalto em palco do infinito' },

  // Patrocinados
  { name: 'As Riquezas da Mantiqueira e as Águas Termais', theme: 'Patrocinado', boost: 10, keywords: ['mantiqueira', 'aguas-termais', 'montanhas', 'turismo'], historicalAngle: 'o turismo ecológico e o descanso nas serras', isSponsored: true, sponsorName: 'Consórcio de Turismo da Serra da Mantiqueira' },
  { name: 'A Força dos Ventos e a Energia Limpa do Nordeste', theme: 'Patrocinado', boost: 11, keywords: ['vento', 'energia-solar', 'nordeste', 'futuro'], historicalAngle: 'a revolução das turbinas eólicas que geram progresso limpo', isSponsored: true, sponsorName: 'Companhia Nacional de Transição Energética' },
  { name: 'A Rota do Vinho e as Vindimas da Serra Gaúcha', theme: 'Patrocinado', boost: 10, keywords: ['vinho', 'serra-gaucha', 'uva', 'imigrantes'], historicalAngle: 'a colheita da uva e a tradição dos vales vinícolas', isSponsored: true, sponsorName: 'Associação dos Produtores de Vinho da Serra' },
  { name: 'O Café Especial das Montanhas e o Solo Abençoado', theme: 'Patrocinado', boost: 11, keywords: ['cafe', 'minas', 'montanhas', 'grao'], historicalAngle: 'a cultura centenária do grão que alimentou as ferrovias', isSponsored: true, sponsorName: 'Cooperativa dos Cafeicultores do Brasil' },
  { name: 'A Rota das Frutas e as Águas do Velho Chico', theme: 'Patrocinado', boost: 10, keywords: ['petrolina', 'frutas', 'sao-francisco', 'irrigacao'], historicalAngle: 'o milagre da irrigação transformando o sertão em pomar', isSponsored: true, sponsorName: 'Consórcio de Exportadores do Vale' },
  { name: 'As Asas da Inovação e a Conquista dos Céus', theme: 'Patrocinado', boost: 12, keywords: ['aviacao', 'santos-dumont', 'inovacao', 'aeroespacial'], historicalAngle: 'a genialidade de Santos Dumont e o polo tecnológico nacional', isSponsored: true, sponsorName: 'Agência Nacional de Ciência e Inovação' },

  // Mais Temas Afro-Brasileiros Autênticos
  { name: 'Dandara de Palmares e o Punho da Liberdade', theme: 'Afro-brasileiro', boost: 15, keywords: ['dandara', 'palmares', 'quilombo', 'guerreira'], historicalAngle: 'a liderança estratégica e o combate destemido das mulheres quilombolas' },
  { name: 'Tereza de Benguela: A Rainha Negra do Pantanal', theme: 'Afro-brasileiro', boost: 14, keywords: ['tereza-benguela', 'quaritere', 'rainha', 'pantanal'], historicalAngle: 'o parlamento comunitário do Quilombo do Quariterê' },
  { name: 'O Reinado do Maracatu Nação e as Rainhas Coroadas', theme: 'Afro-brasileiro', boost: 13, keywords: ['maracatu', 'nacao', 'cortejo', 'tambor'], historicalAngle: 'a coroação dos reis do Congo e a suntuosidade dos tambores de baque virado' },
  { name: 'Besouro Mangangá e a Mandinga da Capoeira', theme: 'Afro-brasileiro', boost: 14, keywords: ['besouro', 'capoeira', 'mandinga', 'santo-amaro'], historicalAngle: 'a agilidade invencível do mestre que desafiou os canhões coloniais' },
  { name: 'Mercedes Baptista: O Primeiro Passo Negro no Teatro Municipal', theme: 'Afro-brasileiro', boost: 15, keywords: ['mercedes-baptista', 'danca', 'ballet', 'teatro-municipal'], historicalAngle: 'a bailarina pioneira que fundou a dança afro-brasileira moderna' },

  // Mais Temas Históricos Épicos
  { name: 'A Revolta da Chibata e o Dragão do Mar na Baía', theme: 'Histórico', boost: 14, keywords: ['chibata', 'joao-candido', 'marinha', 'guanabara'], historicalAngle: 'o marinheiro negro que silenciou os castigos físicos nas frotas' },
  { name: 'A Cabanagem: O Povo em Armas no Grão-Pará', theme: 'Histórico', boost: 13, keywords: ['cabanagem', 'grao-para', 'amazonia', 'revolta'], historicalAngle: 'a tomada do poder pelos cabanos nas margens dos grandes rios' },
  { name: 'A Epopeia da Borracha e o Teatro Amazonas', theme: 'Histórico', boost: 13, keywords: ['borracha', 'manaus', 'seringal', 'amazonia'], historicalAngle: 'o fausto da Paris dos Trópicos e a dura labuta dos seringueiros no coração da floresta' },
  { name: 'A Batalha dos Guararapes e o Nascimento da Pátria', theme: 'Histórico', boost: 13, keywords: ['guararapes', 'pernambuco', 'batalha', 'uniao'], historicalAngle: 'a união de indígenas, africanos e luso-brasileiros contra a invasão' },

  // Mais Temas de Literatura, Poesia e Teatro
  { name: 'Ariano Suassuna e o Reino Encantado da Pedra do Reino', theme: 'Literário & Artes', boost: 15, keywords: ['suassuna', 'pedra-do-reino', 'armorial', 'sertao'], historicalAngle: 'o movimento armorial fundindo a erudição barroca com a cantoria popular' },
  { name: 'Guimarães Rosa: As Veredas do Grande Sertão', theme: 'Literário & Artes', boost: 15, keywords: ['guimaraes-rosa', 'veredas', 'jaguncos', 'sertao'], historicalAngle: 'a reinvenção da língua e a metafísica dos jagunços mineiros' },
  { name: 'Clarice Lispector e os Mistérios da Alma', theme: 'Literário & Artes', boost: 14, keywords: ['clarice', 'literatura', 'misterio', 'poesia'], historicalAngle: 'o mergulho profundo no íntimo humano e a epifania do cotidiano' },
  { name: 'Jorge Amado: O Canto de Amor à Bahia e aos Meninos de Areia', theme: 'Literário & Artes', boost: 14, keywords: ['jorge-amado', 'bahia', 'capitaes-da-areia', 'salvador'], historicalAngle: 'as crônicas afetuosas do cais de Salvador e os deuses das ruas' },

  // Mais Homenagens Inesquecíveis
  { name: 'Cartola e Dona Zica: O Verde e Rosa na Colina da Poesia', theme: 'Homenagem', boost: 16, keywords: ['cartola', 'dona-zica', 'mangueira', 'poeta'], historicalAngle: 'o mestre maior da canção popular e o refúgio amoroso da colina' },
  { name: 'Dona Ivone Lara: A Dama do Samba e o Sorriso Negro', theme: 'Homenagem', boost: 16, keywords: ['ivone-lara', 'serrinha', 'partido-alto', 'enfermeira'], historicalAngle: 'a primeira mulher a compor um samba-enredo e pioneira da saúde mental' },
  { name: 'Noel Rosa: O Poeta da Vila e a Filosofia das Calçadas', theme: 'Homenagem', boost: 15, keywords: ['noel-rosa', 'vila-isabel', 'filosofia', 'cronica'], historicalAngle: 'o cronista genial que transformou o cotidiano carioca em poesia eterna' },
  { name: 'Clara Nunes: O Canto do Guerreiro e a Força da Sabiá', theme: 'Homenagem', boost: 16, keywords: ['clara-nunes', 'portela', 'axe', 'minas'], historicalAngle: 'a cantora luminosa que uniu as religiões de matriz africana ao coração do país' },
  { name: 'Chiquinha Gonzaga: O Abre-Alas da Liberdade e do Piano', theme: 'Homenagem', boost: 15, keywords: ['chiquinha-gonzaga', 'marchinha', 'piano', 'pioneira'], historicalAngle: 'a compositora que inventou a marchinha de carnaval e quebrou preconceitos' },

  // Mais Folclore, Encantaria e Brasil Profundo
  { name: 'O Boi Bumbá de Parintins: O Duelo Encantado no Bumbódromo', theme: 'Folclore & Lendas', boost: 14, keywords: ['parintins', 'garantido', 'caprichoso', 'amazonia'], historicalAngle: 'a ópera a céu aberto que divide a ilha tupinambarana em azul e vermelho' },
  { name: 'O Maracatu Rural e o Brilho dos Caboclos de Lança', theme: 'Folclore & Lendas', boost: 14, keywords: ['caboclo-lanca', 'maracatu-rural', 'zona-da-mata', 'cravo'], historicalAngle: 'os guerreiros canavieiros com suas cabeleiras reluzentes e cravos na boca' },
  { name: 'A Lenda da Vitória-Régia e as Lágrimas da Lua', theme: 'Folclore & Lendas', boost: 13, keywords: ['vitoria-regia', 'lua', 'indigena', 'floresta'], historicalAngle: 'o mito tupi-guarani da jovem que se transformou na rainha das águas' },

  // Mais Meio Ambiente e Biomas
  { name: 'O Pantanal dos Tuiuiús e o Ciclo Sagrado das Cheias', theme: 'Ambiental & Natureza', boost: 14, keywords: ['pantanal', 'tuiuiu', 'aguas', 'biodiversidade'], historicalAngle: 'o maior ecossistema alagável do planeta em harmonia com a fauna' },
  { name: 'A Amazônia dos Rios Voadores e o Pulso da Vida', theme: 'Ambiental & Natureza', boost: 15, keywords: ['amazonia', 'rios-voadores', 'floresta', 'clima'], historicalAngle: 'as nuvens de vapor que irrigam as lavouras e resfriam o continente' },
  { name: 'O Canto do Sertão: A Florada Sagrada do Mandacaru', theme: 'Ambiental & Natureza', boost: 13, keywords: ['caatinga', 'mandacaru', 'sertao', 'resiliencia'], historicalAngle: 'a riqueza única do único bioma exclusivamente brasileiro' },

  // Mais Temas Épicos, Heroicos e Culturais (Livre Escolha Sem Repetições)
  { name: 'Cruz e Sousa: O Cisne Negro do Simbolismo e a Chama da Liberdade', theme: 'Literário & Artes', boost: 15, keywords: ['cruz-sousa', 'simbolismo', 'poeta', 'florianopolis'], historicalAngle: 'o mestre que desafiou o preconceito com versos de luz e dor' },
  { name: 'Castro Alves e o Navio Negreiro: O Grito da Abolição', theme: 'Literário & Artes', boost: 15, keywords: ['castro-alves', 'navio-negreiro', 'liberdade', 'bahia'], historicalAngle: 'a poesia trovadoresca que abalou as correntes do império' },
  { name: 'Leci Brandão: O Canto de Coragem e o Povo da Periferia', theme: 'Homenagem', boost: 15, keywords: ['leci', 'periferia', 'mangueira', 'partido-alto'], historicalAngle: 'a pioneira do samba que levou a voz dos desamparados à tribuna' },
  { name: 'Nelson Sargento: Agoniza Mas Não Morre no Asfalto Sagrado', theme: 'Homenagem', boost: 15, keywords: ['nelson-sargento', 'agoniza', 'mangueira', 'baluarte'], historicalAngle: 'o filósofo do morro e pintor das cores do samba' },
  { name: 'Candeia: A Luz dos Palmares e a Raiz do Quilombo de Madureira', theme: 'Homenagem', boost: 16, keywords: ['candeia', 'quilombo', 'portela', 'axe'], historicalAngle: 'o guerreiro da cultura negra que fundou a resistência artística' },
  { name: 'Paulo da Portela: A Camisa de Seda e a Dignidade do Sambista', theme: 'Homenagem', boost: 16, keywords: ['paulo-portela', 'camisa-seda', 'osvaldo-cruz', 'fundador'], historicalAngle: 'o diplomata do samba que levou a escola ao reconhecimento nacional' },
  { name: 'A Revolta dos Malês: A Insurreição Sagrada dos Alufás em Salvador', theme: 'Afro-brasileiro', boost: 15, keywords: ['males', 'alufas', 'salvador', 'insurreicao'], historicalAngle: 'a coragem dos africanos letrados que lutaram pela libertação' },
  { name: 'Os Reisados do Cariri e as Espadas de Fitas do Sertão', theme: 'Folclore & Lendas', boost: 13, keywords: ['reisado', 'cariri', 'juazeiro', 'mestre'], historicalAngle: 'os mestres de cultura que guardam os autos medievais no Ceará' },
  { name: 'João Cabral de Melo Neto: A Pedra do Sono e o Canto do Capibaribe', theme: 'Literário & Artes', boost: 15, keywords: ['joao-cabral', 'morte-vida-severina', 'recife', 'poesia'], historicalAngle: 'o arquiteto da palavra que esculpiu a saga sertaneja' },
  { name: 'Milton Nascimento: A Voz do Vento e a Travessia dos Meninos', theme: 'Homenagem', boost: 16, keywords: ['milton', 'clube-esquina', 'minas', 'travessia'], historicalAngle: 'a sonoridade cósmica que abraçou os corações da América Latina' },
  { name: 'Gonzagão e Gonzaguinha: Da Asa Branca ao Sangue da Cidade', theme: 'Homenagem', boost: 15, keywords: ['gonzagao', 'baiao', 'sanfona', 'gonzaguinha'], historicalAngle: 'o pai do baião e a voz da resistência unidos no mesmo palco' },
  { name: 'As Chapadas do Brasil: Veadeiros, Diamantina e os Cânions de Luz', theme: 'Ambiental & Natureza', boost: 14, keywords: ['chapada', 'veadeiros', 'diamantina', 'cachoeira'], historicalAngle: 'os santuários de quartzo e cristais que guardam as nascentes puras' },
  { name: 'O Manguezal Sagrado: O Berço da Vida e a Lama Fértil do Brasil', theme: 'Ambiental & Natureza', boost: 14, keywords: ['manguezal', 'caranguejo', 'mare', 'ecologia'], historicalAngle: 'o ecossistema fundamental onde a terra e o mar geram abundância' },
  { name: 'O Maracatu Atômico e a Lama da Esperança no Manguebeat', theme: 'Cultural', boost: 14, keywords: ['manguebeat', 'chico-science', 'maracatu', 'antena'], historicalAngle: 'a explosão da antena parabólica fincada na lama do Recife' },
  { name: 'O Cacuriá de Dona Teté e as Caixeiras do Divino Maranhense', theme: 'Folclore & Lendas', boost: 13, keywords: ['cacuria', 'dona-tete', 'maranhao', 'caixeiras'], historicalAngle: 'o ritmo sensual e alegre que reúne a comunidade em coro' },
  { name: 'Mestre Vitalino e os Bonecos de Barro da Feira de Caruaru', theme: 'Cultural', boost: 14, keywords: ['vitalino', 'barro', 'caruaru', 'artesanato'], historicalAngle: 'a argila modelada que retratou com ternura a alma dos sertanejos' },
  { name: 'A Feira de São Cristóvão: O Coração Nordestino na Terra da Garoa e do Samba', theme: 'Cultural', boost: 13, keywords: ['feira-sao-cristovao', 'nordeste', 'rio', 'cordel'], historicalAngle: 'o pavilhão da acolhida onde o baião conversa com o tamborim' },
  { name: 'As Mulheres das Rendas de Bilro e a Brisa do Litoral', theme: 'Cultural', boost: 13, keywords: ['renda-bilro', 'rendeiras', 'litoral', 'mar'], historicalAngle: 'o estalar compassado das madeiras tecendo poesias nas toalhas' },
  { name: 'A Dignidade do Povo da Limpeza: Os Heróis de Laranja da Cidade', theme: 'Crítica Social', boost: 14, keywords: ['garis', 'limpeza', 'dignidade', 'rua'], historicalAngle: 'o trabalho honrado que devolve o brilho e a beleza às avenidas' },
  { name: 'O Grito das Cores: A Diversidade e o Direito Inegociável de Amar', theme: 'Crítica Social', boost: 14, keywords: ['diversidade', 'cores', 'orgulho', 'respeito'], historicalAngle: 'o arco-íris da cidadania que vence o ódio com amor e arte' },
  { name: 'A Alquimia do Tempo e o Relógio Mágico dos Sambistas', theme: 'Surrealista', boost: 14, keywords: ['alquimia', 'tempo', 'relogio', 'magia'], historicalAngle: 'a viagem fabulosa onde os ponteiros param para o desfile acontecer' },
  { name: 'O Baile dos Astros: O Casamento da Lua com o Sol na Passarela', theme: 'Surrealista', boost: 13, keywords: ['lua', 'sol', 'astros', 'eclipse'], historicalAngle: 'a lenda cósmica da paixão celestial que ilumina a madrugada' },
  { name: 'As Lendas do Guaraná e a Sabedoria dos Filhos de Mawé', theme: 'Folclore & Lendas', boost: 14, keywords: ['guarana', 'mawe', 'amazonia', 'olhos'], historicalAngle: 'a semente sagrada da vida que brotou dos olhos dos encantados' },
  { name: 'O Voo Sagrado do Uirapuru e os Segredos da Floresta Profunda', theme: 'Ambiental & Natureza', boost: 14, keywords: ['uirapuru', 'canto', 'selva', 'passaro'], historicalAngle: 'a ave mítica cujo canto silencia todos os seres da floresta' },
  { name: 'A Dança das Fitilhas e os Mestres do Bumba-Meu-Boi do Maranhão', theme: 'Folclore & Lendas', boost: 14, keywords: ['bumba-boi', 'maranhao', 'matraca', 'coxixo'], historicalAngle: 'o auto popular da ressurreição do boi que uniu negros, índios e caboclos' },
  { name: 'Antônio Conselheiro e a Promessa da Terra Prometida no Sertão', theme: 'Histórico', boost: 15, keywords: ['conselheiro', 'canudos', 'sertao', 'beato'], historicalAngle: 'a utopia sertaneja de irmandade e fé que desafiou os poderosos' },
  { name: 'Villa-Lobos: O Trenzinho do Caipira e as Bachianas Brasileiras', theme: 'Literário & Artes', boost: 15, keywords: ['villa-lobos', 'trenzinho', 'bachianas', 'musica'], historicalAngle: 'o maestro que transformou o canto dos pássaros e dos trens em sinfonia mundial' },
  { name: 'O Teatro Mágico dos Bonecos de Mamulengo e a Risada Popular', theme: 'Cultural', boost: 13, keywords: ['mamulengo', 'fantoche', 'riso', 'teatro'], historicalAngle: 'a arte do improviso que desconcertou coronéis com a sátira do povo' },
  { name: 'A Saga dos Erveiros do Mercado Ver-o-Peso e os Banhos de Cheiro', theme: 'Cultural', boost: 14, keywords: ['ver-o-peso', 'belem', 'banho-cheiro', 'priprioca'], historicalAngle: 'a farmácia viva da floresta amazônica que perfuma as manhãs de Belém' },
  { name: 'Clarice Lispector: O Mistério da Hora da Estrela e a Alma Humana', theme: 'Literário & Artes', boost: 15, keywords: ['clarice', 'hora-estrela', 'introspeccao', 'macabea'], historicalAngle: 'a sensibilidade luminosa que transformou o sofrimento humano em poesia eterna' },
  { name: 'O Reino das Águas Claras de Monteiro Lobato e o Sítio Encantado', theme: 'Literário & Artes', boost: 14, keywords: ['sitio', 'emilia', 'lobato', 'fantasia'], historicalAngle: 'a imaginação sem fronteiras da boneca de pano que pensava o mundo' },
  { name: 'A Lenda de Sepé Tiaraju: Esta Terra Tem Dono nas Missões Guaranis', theme: 'Histórico', boost: 15, keywords: ['sepe-tiaraju', 'missoes', 'guarani', 'sul'], historicalAngle: 'a resistência heroica dos povos originários do sul contra as coroas opressoras' },
  { name: 'O Império de Daomé e a Coragem das Guerreiras Agoodjie', theme: 'Afro-brasileiro', boost: 15, keywords: ['daome', 'agoodjie', 'guerreiras', 'africa'], historicalAngle: 'o exército de mulheres invencíveis que defendeu a soberania africana' },
  { name: 'Chiquinha Gonzaga: O Abre-Alas que Rompeu as Grades do Preconceito', theme: 'Homenagem', boost: 16, keywords: ['chiquinha', 'abre-alas', 'pioneira', 'marchinha'], historicalAngle: 'a maestrina rebelde que criou a primeira marcha carnavalesca e financiou alforrias' },
  { name: 'Noel Rosa: O Poeta da Vila e o Violão da Cidade Cenográfica', theme: 'Homenagem', boost: 15, keywords: ['noel-rosa', 'vila-isabel', 'cronica', 'violao'], historicalAngle: 'o filósofo do samba que imortalizou as esquinas do Rio de Janeiro' },
  { name: 'O Canto das Fiandeiras e o Fuso Dourado do Vale do Jequitinhonha', theme: 'Cultural', boost: 14, keywords: ['fiandeiras', 'jequitinhonha', 'barro', 'minas'], historicalAngle: 'as mãos calejadas de mulheres que transformam o barro e o algodão em obras-primas' },
  { name: 'A Cidade Invisível dos Garimpos de Sonhos na Serra Pelada', theme: 'Crítica Social', boost: 14, keywords: ['serra-pelada', 'ouro', 'formigueiro', 'desejo'], historicalAngle: 'a epopeia dolorosa dos formigueiros humanos em busca da miragem da riqueza' },
  { name: 'O Circo Mágico de Benjamin de Oliveira: O Primeiro Palhaço Negro do Brasil', theme: 'Cultural', boost: 15, keywords: ['benjamin-oliveira', 'circo', 'palhaco', 'pioneiro'], historicalAngle: 'o artista genial que fundou o teatro circense e encantou gerações' },
  { name: 'Clementina de Jesus: Quelé, a Voz Ancestral que Desceu o Morro', theme: 'Homenagem', boost: 16, keywords: ['clementina', 'quele', 'partido-alto', 'ancestralidade'], historicalAngle: 'a rainha do jongo e do partido-alto que cantou com o peso de séculos de história' },
  // Target Flagship Subjects
  { name: 'O Império do Sol Nascente: O Voo das Garças de Quioto e a Honra dos Samurais', theme: 'Cultural', boost: 16, keywords: ['japao', 'samurai', 'sakura', 'kasato-maru', 'bushido', 'quioto'], historicalAngle: 'a filosofia milenar xintoísta e a saga dos pioneiros que uniram os oceanos no Brasil' },
  { name: 'Os Mistérios de Tutancâmon e a Balança Sagrada de Anúbis', theme: 'Histórico', boost: 16, keywords: ['egito', 'tutancamon', 'farao', 'piramides', 'nilo', 'anubis'], historicalAngle: 'a busca pela imortalidade e o pulsar fértil das águas do Nilo sob a luz de Rá' },
  { name: 'A Samaúma Cósmica e os Rios Voadores da Amazônia Viva', theme: 'Ambiental & Natureza', boost: 16, keywords: ['amazonia', 'samauma', 'rios-voadores', 'floresta', 'curupira', 'parintins'], historicalAngle: 'a respiração sagrada da maior floresta tropical e o alerta ecológico dos povos originários' },
  { name: 'A Pátria de Chuteiras e a Dança Mágica dos Gramados', theme: 'Cultural', boost: 15, keywords: ['futebol', 'maracana', 'drible', 'pele', 'gol', 'varzea'], historicalAngle: 'a ginga do futebol-arte dos campinhos de terra até os templos sagrados mundiais' },
  { name: 'O Algoritmo do Tamborim: A Inteligência Artificial diante da Alma do Samba', theme: 'Surrealista', boost: 16, keywords: ['inteligencia-artificial', 'ia', 'futurismo', 'algoritmo', 'androide', 'dados'], historicalAngle: 'o dilema moderno da máquina que busca decifrar o calor e a emoção do coração humano' },
  { name: 'Odisseia Cósmica: O Big Bang, a Dança das Galáxias e o Infinito no Asfalto', theme: 'Surrealista', boost: 16, keywords: ['astronomia', 'cosmos', 'galaxias', 'estrelas', 'big-bang', 'universo'], historicalAngle: 'a poeira de estrelas que formou a vida e agora baila nas constelações da passarela' }
];

export class EnredoService {
  /**
   * Generates an authentically tailored, strictly unique and non-repeating enredo
   * for a specific school, respecting its community, neighborhood, colors and identity.
   * Schools choose their themes randomly and free of rigid pre-definitions.
   */
  public static generateUniqueEnredoForSchool(
    school: School,
    currentYear: number,
    usedTitlesInSeason: Set<string> = new Set<string>()
  ): Enredo {
    const division = school.division;
    const carnavalesco = school.staff?.carnavalesco;
    const carnavalescoRating = carnavalesco?.rating || 80;
    const pastTitles = new Set<string>(school.pastEnredoTitles || []);
    if (school.currentEnredo?.title) {
      pastTitles.add(school.currentEnredo.title);
    }

    // Identify keywords of past enredos to guarantee no thematic repetition across years
    const pastKeywords = new Set<string>();
    pastTitles.forEach((t) => {
      t.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter((w) => w.length >= 4)
        .forEach((w) => pastKeywords.add(w));
    });

    // Escolas escolhem o tema de forma verdadeiramente aleatória e livre de pré-definições rígidas
    // Alterna de forma orgânica e randômica entre o sintetizador procedural combinatório e núcleos autorais
    const preferProcedural = Math.random() < 0.65;

    if (preferProcedural) {
      const procedural = this.synthesizeProceduralEnredo(school, currentYear, usedTitlesInSeason, pastTitles, pastKeywords);
      if (procedural && !usedTitlesInSeason.has(procedural.title) && !pastTitles.has(procedural.title)) {
        return procedural;
      }
    }

    // Se necessário, tenta núcleos temáticos autorais não utilizados por esta escola
    const availableCores = THEMATIC_CORES.filter((core) => {
      const hasDirectKeywordOverlap = core.keywords.some((kw) => pastKeywords.has(kw.toLowerCase()));
      return !hasDirectKeywordOverlap;
    });

    const shuffledCores = [...availableCores].sort(() => 0.5 - Math.random());

    for (const core of shuffledCores) {
      const candidateTitles = [...core.titleVariants].sort(() => 0.5 - Math.random());

      for (const baseTitle of candidateTitles) {
        const tailoredTitle = this.buildSchoolTailoredTitle(baseTitle, school, core);

        if (!usedTitlesInSeason.has(tailoredTitle) && !pastTitles.has(tailoredTitle)) {
          return this.createEnredoFromCore(
            tailoredTitle,
            core,
            school,
            currentYear,
            carnavalescoRating,
            division
          );
        }
      }
    }

    // Procedural com novas combinações poéticas garantidas
    return this.synthesizeProceduralEnredo(school, currentYear, usedTitlesInSeason, pastTitles, pastKeywords);
  }

  /**
   * Tailors a title organically to a school's identity without rigid locks or repetitive formulas.
   */
  private static buildSchoolTailoredTitle(
    baseTitle: string,
    school: School,
    core?: ThematicCore | ProceduralSubject
  ): string {
    const cleanName = cleanSchoolName(school);
    const nickname = school.nickname?.replace(/^A\s+|^O\s+/i, '') || cleanName;
    const neighborhood = school.neighborhood?.split('/')[0]?.split(',')[0]?.trim() || 'Comunidade';

    // Se o título já possui subtítulo ou detalhe poético próprio, preserva integralmente
    if (baseTitle.includes(':') || Math.random() < 0.60) {
      return baseTitle;
    }

    // Variadas perspectivas comunitárias e líricas sem repetir fórmulas
    const tailors = [
      `na Visão Soberana de ${cleanName}`,
      `sob o Manto da ${nickname}`,
      `no Canto Fiel de ${neighborhood}`,
      `pelas Vozes da ${nickname}`,
      `nas Cores da ${cleanName}`,
      `a Oração Poética de ${neighborhood}`,
      `a Festa da ${nickname}`
    ];

    const chosenTailor = tailors[Math.floor(Math.random() * tailors.length)];
    return `${baseTitle}: ${chosenTailor}`;
  }

  /**
   * Procedural synthesizer combining invocations, rich subjects, territorial perspectives
   * and aesthetic qualifiers to guarantee an infinite supply of 100% unique, non-repeating enredos.
   */
  private static synthesizeProceduralEnredo(
    school: School,
    currentYear: number,
    usedTitles: Set<string>,
    pastTitles: Set<string>,
    pastKeywords: Set<string>
  ): Enredo {
    const cleanName = cleanSchoolName(school);
    const neighborhood = school.neighborhood?.split('/')[0]?.split(',')[0]?.trim() || 'Comunidade';
    const symbol = school.symbol?.replace(/^[^\w\s]+\s*/, '') || 'Ginga';
    const nickname = school.nickname || cleanName;

    // Filter procedural subjects to avoid repeating past subjects
    const availableSubjects = PROCEDURAL_SUBJECTS.filter(
      (s) => !s.keywords.some((kw) => pastKeywords.has(kw.toLowerCase()))
    );
    const subjectsPool = availableSubjects.length >= 5 ? availableSubjects : PROCEDURAL_SUBJECTS;

    const QUALIFIERS = [
      'na Passarela dos Imortais',
      `na Consagração de ${cleanName}`,
      `no Manto Iluminado de ${neighborhood}`,
      `e o Voo Sagrado da ${symbol}`,
      `sob a Bênção de ${nickname}`,
      'a Epopeia que Faz o Coração Bater Mais Forte',
      'o Clarim da Vitória na Sapucaí',
      'as Asas que Abrem os Portais do Tempo',
      'o Espelho Onde o Povo se Vê Feliz',
      'a Chama Viva dos Terreiros e Colinas',
      'a Alvorada dos Sonhos Comunitários'
    ];

    for (let attempt = 0; attempt < 100; attempt++) {
      const inv = INVOCATIONS[Math.floor(Math.random() * INVOCATIONS.length)];
      const subj = subjectsPool[Math.floor(Math.random() * subjectsPool.length)];
      const qual = QUALIFIERS[Math.floor(Math.random() * QUALIFIERS.length)];

      let candidateTitle = `${inv} ${subj.name}: ${qual}`;
      const roll = Math.random();
      if (roll < 0.35) {
        candidateTitle = `${subj.name}: ${inv} ${cleanName}`;
      } else if (roll < 0.65) {
        candidateTitle = `${inv} ${subj.name}`;
      } else if (roll < 0.85) {
        candidateTitle = `${subj.name}: O Canto Fiel de ${neighborhood}`;
      }

      if (!usedTitles.has(candidateTitle) && !pastTitles.has(candidateTitle)) {
        const isSponsored = Boolean(subj.isSponsored);
        const sponsorValue = isSponsored
          ? school.division === 'especial'
            ? 5500000
            : school.division === 'ouro'
            ? 2200000
            : school.division === 'prata'
            ? 950000
            : 480000
          : undefined;

        const synopsis = `Uma rica obra artística desenvolvida para a ${cleanName}, inspirada em ${subj.name}. No Setor 1, a agremiação recria cenicamente as lendas e tradições de ${subj.name}. No Setor 2, apresenta um painel cultural destacando ${subj.historicalAngle}. No Setor 3, a comunidade ganha a pista em canto e batuque contagiantes. No Setor 4, o cortejo celebra o legado imortal do enredo na avenida sob o manto sagrado do pavilhão.`;

        return {
          id: `enredo_${school.id}_${currentYear}_${attempt + 1}_${Math.floor(Math.random() * 10000)}`,
          title: candidateTitle,
          themeType: subj.theme,
          synopsis,
          qualityBoost: subj.boost,
          cost: isSponsored ? 0 : Math.round((180000 * (school.division === 'especial' ? 1.0 : 0.5)) / 1000) * 1000,
          isSponsored,
          sponsorName: isSponsored ? subj.sponsorName || 'Consórcio de Fomento Cultural Regional' : undefined,
          sponsorValue,
          carnavalescoAffinity: Math.min(99, Math.max(75, Math.round(82 + Math.random() * 15))),
          historicalAffinity: Math.min(99, Math.max(70, Math.round(80 + Math.random() * 16))),
          commercialTradeoff: isSponsored
            ? 'Aporte financeiro substancial no caixa da agremiação. Exige cuidado plástico do carnavalesco para evitar penalidades dos jurados de enredo.'
            : undefined,
          proponent: isSponsored
            ? `Proposta Oficial de Patrocínio: ${subj.sponsorName || 'Consórcio Cultural'}`
            : `Projeto Autoral da Comissão de Carnaval de ${cleanName}`
        };
      }
    }

    // Infinite fallback safety garantindo título inédito
    const uniqueTitle = `${cleanName}: A Força Imortal do Samba e a Chama Sagrada de ${neighborhood} (Ano ${currentYear})`;
    return {
      id: `enredo_fallback_${school.id}_${currentYear}_${Date.now()}`,
      title: uniqueTitle,
      themeType: 'Cultural',
      synopsis: `A consagração centenária de ${cleanName} em uma ode apaixonada ao samba carioca, celebrando o pavilhão, as baianas, a bateria e as raízes imortais de ${neighborhood}.`,
      qualityBoost: 13,
      cost: 160000,
      carnavalescoAffinity: 92,
      historicalAffinity: 95,
      proponent: `Diretoria e Velha Guarda de ${cleanName}`
    };
  }

  private static createEnredoFromCore(
    title: string,
    core: ThematicCore,
    school: School,
    currentYear: number,
    carnavalescoRating: number,
    division: DivisionId
  ): Enredo {
    const isSponsored = Boolean(core.isSponsored);
    const perspective =
      core.narrativePerspectives[Math.floor(Math.random() * core.narrativePerspectives.length)];
    const cleanName = cleanSchoolName(school);
    const neighborhood = school.neighborhood?.split('/')[0]?.split(',')[0]?.trim() || 'da comunidade';

    const mult =
      division === 'especial'
        ? 1.0
        : division === 'ouro'
        ? 0.55
        : division === 'prata'
        ? 0.3
        : division === 'bronze'
        ? 0.18
        : 0.1;
    const calculatedCost = isSponsored ? 0 : Math.round((core.baseCost * mult) / 1000) * 1000;
    const sponsorValue = isSponsored && core.sponsorValues ? core.sponsorValues[division] || 1000000 : undefined;

    const carnavalescoAffinity = Math.min(
      99,
      Math.max(65, Math.round(carnavalescoRating + (Math.random() * 10 - 4)))
    );
    const historicalAffinity = Math.min(99, Math.max(68, Math.round(78 + Math.random() * 20)));

    const synopsis = `Em uma narrativa monumental e apaixonada desenvolvida para a ${cleanName}, o enredo desdobra ${core.subject} sob a ótica única de ${neighborhood}. O projeto cenográfico traduz ${perspective}, unindo pesquisa histórica apurada, fantasias suntuosas e um samba-enredo de forte apelo popular e melódico para conquistar as notas 10 dos jurados.`;

    return {
      id: `enredo_${core.id}_${school.id}_${currentYear}_${Math.floor(Math.random() * 10000)}`,
      title,
      themeType: core.themeType,
      synopsis,
      qualityBoost: core.baseQuality,
      cost: calculatedCost,
      isSponsored,
      sponsorName: core.sponsorName,
      sponsorValue,
      carnavalescoAffinity,
      historicalAffinity,
      commercialTradeoff: core.tradeoff,
      proponent: isSponsored
        ? `Proposta Oficial de Patrocínio: ${core.sponsorName}`
        : `Projeto Autoral de ${school.staff?.carnavalesco?.name || 'Carnavalesco'}`
    };
  }

  /**
   * Generates a diverse list of 8 unique enredo proposals specifically for a school (used in Barracão).
   * Delivers multiple authoral across different genres + sponsored offers, all strictly unique and non-repeating.
   */
  public static generateSchoolEnredoProposals(school: School, currentYear: number): Enredo[] {
    const proposals: Enredo[] = [];
    const usedInSet = new Set<string>();
    const pastTitles = new Set<string>(school.pastEnredoTitles || []);
    if (school.currentEnredo?.title) {
      pastTitles.add(school.currentEnredo.title);
    }

    const pastKeywords = new Set<string>();
    pastTitles.forEach((t) => {
      t.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter((w) => w.length >= 4)
        .forEach((w) => pastKeywords.add(w));
    });

    // 1. Sponsored options (3 distinct offers from diverse industries/regions)
    const sponsoredCores = THEMATIC_CORES.filter((c) => c.isSponsored).sort(() => 0.5 - Math.random());
    for (const spCore of sponsoredCores) {
      if (proposals.filter((p) => p.isSponsored).length >= 3) break;
      const title = this.buildSchoolTailoredTitle(spCore.titleVariants[0], school, spCore);
      if (!usedInSet.has(title) && !pastTitles.has(title)) {
        usedInSet.add(title);
        proposals.push(
          this.createEnredoFromCore(
            title,
            spCore,
            school,
            currentYear,
            school.staff?.carnavalesco?.rating || 80,
            school.division
          )
        );
      }
    }

    // 2. Authoral options across diverse categories (4-5 distinct offers)
    const authoralCores = THEMATIC_CORES.filter((c) => !c.isSponsored).sort(() => 0.5 - Math.random());
    const seenCategories = new Set<EnredoThemeType>();

    for (const auCore of authoralCores) {
      if (proposals.length >= 8) break;
      // Prioritize diverse thematic categories
      if (seenCategories.has(auCore.themeType) && seenCategories.size < 4 && Math.random() < 0.6) {
        continue;
      }

      const availableTitles = [...auCore.titleVariants].sort(() => 0.5 - Math.random());
      for (const t of availableTitles) {
        const tailored = this.buildSchoolTailoredTitle(t, school, auCore);
        if (!usedInSet.has(tailored) && !pastTitles.has(tailored)) {
          usedInSet.add(tailored);
          seenCategories.add(auCore.themeType);
          proposals.push(
            this.createEnredoFromCore(
              tailored,
              auCore,
              school,
              currentYear,
              school.staff?.carnavalesco?.rating || 80,
              school.division
            )
          );
          break;
        }
      }
    }

    // Guarantee at least 8 proposals with procedural generator
    while (proposals.length < 8) {
      const syn = this.synthesizeProceduralEnredo(school, currentYear, usedInSet, pastTitles, pastKeywords);
      usedInSet.add(syn.title);
      proposals.push(syn);
    }

    return proposals;
  }

  /**
   * Generates a single diverse, non-repeating enredo for an AI school.
   */
  public static generateDiverseEnredoForSchool(
    school: School,
    currentYear: number,
    usedTitlesThisSeason: Set<string> = new Set<string>()
  ): Enredo {
    return this.generateUniqueEnredoForSchool(school, currentYear, usedTitlesThisSeason);
  }

  /**
   * Scans an entire array of schools and assigns a 100% unique, non-repeating enredo
   * to every active school in every division.
   * Also remembers past enredos in each school's pastEnredoTitles so schools avoid repeating themes.
   */
  public static assignDiverseEnredosToAllSchools(
    schools: School[],
    currentYear: number,
    preserveCurrentIfValid: boolean = false
  ): School[] {
    const usedTitlesThisSeason = new Set<string>();

    return schools.map((school) => {
      const isInactive = Boolean(school.isInactive || (school as any).inactive);
      if (isInactive) {
        return school;
      }

      // Check if current enredo can be preserved (e.g. user selected or already set without conflict)
      if (
        preserveCurrentIfValid &&
        school.currentEnredo?.title &&
        !school.currentEnredo.title.includes('SAMPLE') &&
        !usedTitlesThisSeason.has(school.currentEnredo.title)
      ) {
        usedTitlesThisSeason.add(school.currentEnredo.title);
        return school;
      }

      // Generate a fresh unique enredo guaranteed not to collide
      const newEnredo = this.generateUniqueEnredoForSchool(school, currentYear, usedTitlesThisSeason);
      usedTitlesThisSeason.add(newEnredo.title);

      // Record old enredo in school history if it had one
      const oldTitle = school.currentEnredo?.title;
      const updatedPastTitles = [
        ...(school.pastEnredoTitles || []),
        ...(oldTitle && !oldTitle.includes('SAMPLE') && !school.pastEnredoTitles?.includes(oldTitle)
          ? [oldTitle]
          : [])
      ];

      return {
        ...school,
        currentEnredo: newEnredo,
        pastEnredoTitles: updatedPastTitles
      };
    });
  }

  /**
   * Obtém um enredo pré-configurado emblemático para demonstração imediata
   * (Japão, Egito, Amazônia, Futebol, Inteligência Artificial ou Astronomia).
   */
  public static getThematicPreset(
    themeKey: 'japao' | 'egito' | 'amazonia' | 'futebol' | 'inteligencia_artificial' | 'astronomia',
    school: School,
    currentYear: number
  ): Enredo {
    const coreMap: Record<string, string> = {
      japao: 'japao_sol_nascente',
      egito: 'egito_antigo_faraos',
      amazonia: 'amazonia_floresta_sagrada',
      futebol: 'futebol_paixao_nacional',
      inteligencia_artificial: 'inteligencia_artificial_futurismo',
      astronomia: 'astronomia_odisseia_cosmica'
    };

    const coreId = coreMap[themeKey];
    const core = THEMATIC_CORES.find((c) => c.id === coreId) || THEMATIC_CORES[0];
    const title = core.titleVariants[0];

    return this.createEnredoFromCore(
      title,
      core,
      school,
      currentYear,
      school.staff?.carnavalesco?.rating || 85,
      school.division
    );
  }

  /**
   * Retorna a lista completa de enredos demonstrativos dos 5+ temas solicitados
   */
  public static getThematicPresetsList(
    school: School,
    currentYear: number
  ): Array<{
    key: 'japao' | 'egito' | 'amazonia' | 'futebol' | 'inteligencia_artificial' | 'astronomia';
    label: string;
    icon: string;
    badge: string;
    enredo: Enredo;
  }> {
    const keys: Array<{
      key: 'japao' | 'egito' | 'amazonia' | 'futebol' | 'inteligencia_artificial' | 'astronomia';
      label: string;
      icon: string;
      badge: string;
    }> = [
      { key: 'japao', label: 'Japão', icon: '🇯🇵', badge: 'Sol Nascente & Samurais' },
      { key: 'egito', label: 'Egito Antigo', icon: '🏺', badge: 'Faraós & Nilo Sagrado' },
      { key: 'amazonia', label: 'Amazônia', icon: '🌳', badge: 'Samaúma & Rios Voadores' },
      { key: 'futebol', label: 'Futebol', icon: '⚽', badge: 'A Pátria de Chuteiras & O Gol' },
      { key: 'inteligencia_artificial', label: 'Inteligência Artificial', icon: '🤖', badge: 'Inédito: O Algoritmo do Tamborim' },
      { key: 'astronomia', label: 'Odisseia Cósmica', icon: '🌌', badge: 'Inédito: Dança das Galáxias' }
    ];

    return keys.map((item) => ({
      ...item,
      enredo: this.getThematicPreset(item.key, school, currentYear)
    }));
  }
}

