import { School } from '../types/carnaval';

export interface ThematicAlaDef {
  sectorNumber: 1 | 2 | 3 | 4;
  title: string;
  description: string;
  costume: string;
}

export interface ThematicParadePreset {
  id: 'japao' | 'egito' | 'amazonia' | 'futebol' | 'inteligencia_artificial' | 'astronomia';
  themeKeywords: string[];
  sectors: [
    { title: string; synopsis: string },
    { title: string; synopsis: string },
    { title: string; synopsis: string },
    { title: string; synopsis: string }
  ];
  comissaoDeFrente: {
    name: string;
    description: (school: School, count: number) => string;
    costume: (school: School) => string;
  };
  casal1: {
    name: string;
    description: (school: School) => string;
    costume: (school: School) => string;
  };
  abreAlas: {
    name: string;
    description: (school: School) => string;
    structure: (school: School) => string;
  };
  tripod1: {
    name: string;
    description: string;
  };
  baianas: {
    name: string;
    description: (count: number) => string;
    costume: (school: School) => string;
  };
  bateria: {
    name: string;
    description: (school: School, count: number) => string;
    costume: (school: School) => string;
  };
  passistas: {
    name: string;
    description: string;
    costume: (school: School) => string;
  };
  casal2: {
    name: string;
    description: string;
    costume: (school: School) => string;
  };
  tripod2: {
    name: string;
    description: string;
  };
  floats: Array<{
    floatNumber: number;
    name: string;
    description: string;
  }>;
  velhaGuarda: {
    name: string;
    description: (school: School) => string;
    costume: (school: School) => string;
  };
  apoteose: {
    name: (school: School, floatNumber: number) => string;
    description: (school: School) => string;
  };
  alas: ThematicAlaDef[];
}

export const THEMATIC_PARADE_PRESETS: Record<string, ThematicParadePreset> = {
  japao: {
    id: 'japao',
    themeKeywords: ['japao', 'japão', 'samurai', 'sakura', 'kasato-maru', 'kasato maru', 'bushido', 'quioto', 'toquio', 'tóquio', 'fuji', 'oriente', 'kabuki', 'taiko'],
    sectors: [
      {
        title: 'Setor 1: O Arquipélago Sagrado: O Sol Nascente e os Deuses Xintoístas',
        synopsis: 'A abertura do desfile desvenda a criação mística do arquipélago japonês pelos deuses Izanagi e Izanami sob o brilho sagrado de Amaterasu.'
      },
      {
        title: 'Setor 2: A Era dos Samurais e o Florescer das Artes Milenares',
        synopsis: 'O código Bushido, a honra das katanas, a poesia das gueixas e a expressão teatral dramática do Kabuki.'
      },
      {
        title: 'Setor 3: A Travessia dos Oceanos: O Kasato Maru e a Fraternidade Nipo-Brasileira',
        synopsis: 'A epopeia marítima de 1908, a labuta heroica nos cafezais paulistas e a cultura florescendo no Bairro da Liberdade.'
      },
      {
        title: 'Setor 4: O Japão do Futuro: A Metrópole Neon de Tóquio, Mangás e a Conexão Brasil-Japão',
        synopsis: 'A vanguarda da robótica e da cultura pop irmanada com o ritmo contagiante da Sapucaí.'
      }
    ],
    comissaoDeFrente: {
      name: 'Comissão de Frente: A Dança dos Samurais de Quioto e o Despertar de Amaterasu',
      description: (_school, count) =>
        `Coreografia teatralizada em que ${count} bailarinos samurais encenam o combate do código Bushido com armaduras laqueadas. Biombos dourados giratórios se abrem revelando a Deusa Sol Amaterasu levitando com leques de seda e chuva de pétalas de cerejeira.`,
      costume: (school) =>
        `Armaduras o-yoroi cerimoniais em laca vermelha e dourada, quimonos de seda pura com detalhes nas cores ${school.colors.primary} e ${school.colors.secondary}, e katanas cênicas espelhadas.`
    },
    casal1: {
      name: '1º Casal de MS & PB: A Nobreza Imperial do Crisântemo e o Voo do Dragão Celestial',
      description: () =>
        'O Mestre-Sala rodopia com elegância principesca de Kyoto, enquanto a Porta-Bandeira desfralda o pavilhão com giros nobres, personificando a flor de lótus imperial.',
      costume: (school) =>
        `Trajes de corte imperial em seda branca com bordados manuais em fio de ouro de dragões e cerejeiras sakura, resplendores de madrepérola e plumas nas cores ${school.colors.primary}.`
    },
    abreAlas: {
      name: 'Abre-Alas: O Templo Dourado de Kinkaku-ji e o Portal Sagrado Torii',
      description: (school) =>
        `Alegoria colossal de 48 metros. À frente, um monumental portal Torii vermelho de 14 metros ladeado por dragões mecânicos com névoa aromática. Ao centro, a réplica do Templo Dourado sob o Monte Fuji com o símbolo da ${school.shortName}.`,
      structure: (school) =>
        `Acoplado em dois chassis, folhas de ouro legítimo, lanternas chochin iluminadas por fibra óptica e detalhes em ${school.colors.primary} e ${school.colors.secondary}.`
    },
    tripod1: {
      name: 'Tripé 1: O Altar dos Ancestrais e a Cerimônia Sagrada do Chá',
      description: 'Elemento cenográfico móvel retratando a casa de chá tradicional com lanternas de pedra e monges zen.'
    },
    baianas: {
      name: 'Ala das Baianas: As Matriarcas das Cerejeiras em Flor (Sakura)',
      description: (count) =>
        `${count} senhoras rodopiando como um imenso bosque de cerejeiras em flor, espalhando aroma suave e bênçãos orientais pela pista.`,
      costume: (school) =>
        `Vestidos rodados com degradê de pétalas de cerejeira rosa, branco e prata, quimonos com obis bordados artesanalmente nas cores ${school.colors.primary} e sombrinhas wagasa de bambu.`
    },
    bateria: {
      name: 'Bateria: Os Guerreiros do Taiko e os Guardiões do Monte Fuji',
      description: (school, count) =>
        `Mestre comanda ${count} ritmistas com paradinhas de impacto que fundem a cadência do surdo carioca à precisão dos tambores Taiko japoneses.`,
      costume: (school) =>
        `Indumentária leve inspirada em samurais e mestres de artes marciais, faixas hachimaki e coletes nas cores ${school.colors.primary} e ${school.colors.secondary}.`
    },
    passistas: {
      name: 'Ala dos Passistas: O Frenezô das Sombrinhas e o Samba Nipo-Brasileiro',
      description: 'Malandros e passistas bailando com leques dourados e sombrinhas wagasa com ginga frenética.',
      costume: (school) => `Costumes leves com franjas reluzentes e motivos de dragão e crisântemo nas cores ${school.colors.primary}.`
    },
    casal2: {
      name: '2º Casal de MS & PB: A Promessa de Hiroshima e as Mil Garças da Paz',
      description: 'Condução nobre do segundo pavilhão exaltando o tsuru e a mensagem de paz universal.',
      costume: (school) => `Quimonos estilizados em prata e azul marinho com detalhes em ${school.colors.secondary}.`
    },
    tripod2: {
      name: 'Tripé 2: O Jardim Zen de Quioto e a Carpa Koi da Superação',
      description: 'Escultura móvel de carpa dourada saltando sobre cascatas de água cenográfica.'
    },
    floats: [
      {
        floatNumber: 2,
        name: 'Carro 2: O Navio Kasato Maru e a Travessia dos Mares da Esperança',
        description: 'Imponente transatlântico de 1908 cortando ondas escultóricas com baús de imigrantes e sacas de café do interior paulista.'
      },
      {
        floatNumber: 3,
        name: 'Carro 3: O Castelo de Himeji e a Magia do Teatro Kabuki',
        description: 'Castelo medieval japonês com guerreiros articulados, máscaras de teatro gigantescas e dragões voadores.'
      },
      {
        floatNumber: 4,
        name: 'Carro 4: A Metrópole Neon de Tóquio: Mangás, Games e Robótica',
        description: 'Cenografia futurista com painéis de LED, réplicas de robôs mecha e personagens da cultura pop japonesa.'
      }
    ],
    velhaGuarda: {
      name: 'Velha Guarda: Os Mestres do Bambu e a Sabedoria dos Imigrantes',
      description: (school) => `Os baluartes da ${school.shortName} desfilando com trajes de gala e leques comemorativos da amizade entre as duas nações.`,
      costume: (school) => `Ternos clássicos de linho imperial nas cores ${school.colors.primary} com gravatas e quimonos acetinados.`
    },
    apoteose: {
      name: (_school, floatNum) => `Carro ${floatNum}: O Sol Nascente na Sapucaí: A Fraternidade Brasil-Japão`,
      description: (school) =>
        `Monumental escultura do Sol Vermelho erguendo-se sobre a passarela, ladeada por garças sagradas e o pavilhão da ${school.shortName} reluzindo no topo do Carnaval.`
    },
    alas: [
      { sectorNumber: 1, title: 'Izanagi e Izanami: A Criação do Arquipélago Sagrado', description: 'A mitologia dos deuses primitivos agitando a lança de joias nas águas.', costume: 'Túnicas divinas fluidas em tons celestes e ouro.' },
      { sectorNumber: 1, title: 'A Deusa Amaterasu e o Espelho Sagrado do Sol', description: 'O culto ao Sol que aquece a terra e ilumina os caminhos.', costume: 'Saiotes dourados com resplendores em raios solares.' },
      { sectorNumber: 1, title: 'Os Guardiões dos Templos e as Raposas Místicas Kitsune', description: 'Protetores dos santuários xintoístas com máscaras de raposa.', costume: 'Túnicas brancas e vermelhas com máscaras kitsune em fibra leve.' },
      { sectorNumber: 1, title: 'O Voo Sagrado dos Tsurus e os Origamis da Paz', description: 'A ave símbolo da longevidade e da fidelidade conjugal.', costume: 'Fantasias com asas de papel estilizado e detalhes prateados.' },
      { sectorNumber: 1, title: 'As Quatro Estações e as Cerejeiras em Flor (Sakura)', description: 'O espetáculo efêmero das pétalas rosadas na primavera.', costume: 'Quimonos floridos com golas acetinadas e leques wagasa.' },
      { sectorNumber: 1, title: 'Os Monges Zen e a Iluminação nos Jardins de Pedra', description: 'A serenidade meditativa dos jardins contemplativos de pedra.', costume: 'Hábito monástico leve em tons terra com rosários budistas.' },
      { sectorNumber: 2, title: 'O Código de Honra Bushido: As Sete Virtudes Samurais', description: 'Coragem, justiça, benevolência, respeito e lealdade na batalha.', costume: 'Couraças de placas laqueadas e capacetes kabuto estilizados.' },
      { sectorNumber: 2, title: 'Os Arqueiros Montados Yabusame e as Flechas Cerimoniais', description: 'A precisão ritual dos guerreiros no tiro com arco.', costume: 'Vestimentas de caça nobre com aljavas douradas e arcos cênicos.' },
      { sectorNumber: 2, title: 'O Teatro Kabuki: As Máscaras e o Drama das Cores', description: 'A teatralidade dramática com maquiagem kumadori.', costume: 'Capas dramáticas multicoloridas e adereços de cabeça volumosos.' },
      { sectorNumber: 2, title: 'A Poesia das Gueixas e a Arte dos Leques Dourados', description: 'Música, dança e erudição nas cortes tradicionais de Edo.', costume: 'Quimonos nobres de seda brocada com amplas mangas esvoaçantes.' },
      { sectorNumber: 2, title: 'O Teatro Noh e os Mistérios das Máscaras Fantasmagóricas', description: 'A dança lenta e contemplativa dos espíritos ancestrais.', costume: 'Túnicas cerimoniais austeras com máscaras entalhadas.' },
      { sectorNumber: 2, title: 'A Forja das Katanas: O Aço Sagrado dos Mestres Armeiros', description: 'O fogo sagrado moldando as lâminas dos guerreiros.', costume: 'Vestimentas com detalhes em metal escovado e faixas vermelhas.' },
      { sectorNumber: 3, title: 'A Travessia dos Oceanos: A Partida no Kasato Maru (1908)', description: 'A despedida da terra natal e a viagem de esperança pelo mar.', costume: 'Trajes de época dos passageiros pioneiros com malas de viagem.' },
      { sectorNumber: 3, title: 'O Desembarque no Porto de Santos e os Primeiros Passos', description: 'A chegada em terra brasileira e o encontro de culturas.', costume: 'Roupas de trabalho adaptadas ao clima tropical brasileiro.' },
      { sectorNumber: 3, title: 'O Suor nos Cafezais Paulistas e a Fertilidade da Terra', description: 'A labuta perseverante que construiu riqueza nas fazendas.', costume: 'Fantasias com ramos de café maduro e chapéus de palha rústica.' },
      { sectorNumber: 3, title: 'O Bairro da Liberdade: O Coração Japonês no Brasil', description: 'O reduto de lanternas chochin e festividades comunitárias.', costume: 'Lanternas iluminadas nas mãos e vestes tradicionais festivas.' },
      { sectorNumber: 3, title: 'O Festival Tanabata Matsuri e as Fitas Coloridas dos Desejos', description: 'A lenda dos amantes celestiais Orihime e Hikoboshi.', costume: 'Fantasias cobertas por fitas tanzaku com poesias e desejos.' },
      { sectorNumber: 3, title: 'As Artes Marciais: Judô e Karatê na Formação do Caráter', description: 'A filosofia da disciplina corporal e mental abraçada no Brasil.', costume: 'Kimônos esportivos estilizados com faixas pretas reluzentes.' },
      { sectorNumber: 3, title: 'A Culinária Tradicional: O Arroz, o Chá e o Toque Tropical', description: 'Sabores milenares que conquistaram o paladar nacional.', costume: 'Fantasias lúdicas com esteiras de bambu e tigelas laqueadas.' },
      { sectorNumber: 4, title: 'A Metrópole Neon de Tóquio: O Cruzamento de Shibuya', description: 'A agitação luminosa da capital hipermoderna.', costume: 'Macacões com fios luminescentes em neon azul, rosa e verde.' },
      { sectorNumber: 4, title: 'Os Trens-Bala Shinkansen e a Conquista da Velocidade', description: 'A eficiência tecnológica nos trilhos futuristas.', costume: 'Fantasias aerodinâmicas em prata e azul metálico.' },
      { sectorNumber: 4, title: 'O Universo dos Mangás e a Arte Sequencial Nipônica', description: 'As páginas preto-e-branco que encantaram a juventude mundial.', costume: 'Painéis gráficos impressos com traços de mangá e retículas.' },
      { sectorNumber: 4, title: 'A Febre dos Animes e a Celebração dos Cosplayers', description: 'A criatividade dos fãs vestindo seus heróis animados.', costume: 'Trajes estilizados de guerreiros e guerreiras de anime.' },
      { sectorNumber: 4, title: 'A Robótica do Futuro e a Inteligência Artificial Nipônica', description: 'Androides e robôs cuidando da vida cotidiana.', costume: 'Armaduras biomecânicas futuristas com acabamento cromado.' },
      { sectorNumber: 4, title: 'O Samba no Passo do Sol Nascente: Passistas da Liberdade', description: 'A comunidade nipo-brasileira bailando com malandragem carioca.', costume: 'Fantasias festivas com franjas brilhantes e quimonos abertos.' },
      { sectorNumber: 4, title: 'O Laço Vermelho do Destino: A Amizade Brasil-Japão', description: 'O fio invisível que une duas pátrias no amor ao Carnaval.', costume: 'Trajes de gala em cetim escarlate com fitas douradas unindo as alas.' },
      { sectorNumber: 4, title: 'A Coroação na Sapucaí: O Abraço dos Tamborins e dos Taikos', description: 'A explosão de felicidade celebrando a união das culturas na avenida.', costume: 'Indumentária de gala com esplendores dourados e flores de sakura.' },
      { sectorNumber: 4, title: 'O Carnaval da Eternidade: Paz e Harmonia Sob o Sol Nascente', description: 'A despedida gloriosa com nota 10 nos corações dos foliões.', costume: 'Mantos brancos e dourados celebrando a vitória da cultura.' }
    ]
  },
  egito: {
    id: 'egito',
    themeKeywords: ['egito', 'farao', 'faraó', 'piramides', 'pirâmides', 'nilo', 'tutancamon', 'tutancâmon', 'isis', 'ísis', 'anubis', 'anúbis', 'cleopatra', 'cleópatra', 'hieroglifos', 'esfinge', 'horus', 'hórus'],
    sectors: [
      {
        title: 'Setor 1: O Nilo Sagrado e o Panteão dos Deuses Primordiais',
        synopsis: 'O despertar da criação pelas águas férteis do Rio Nilo, sob a bênção do Deus Sol Rá e o olhar soberano de Hórus.'
      },
      {
        title: 'Setor 2: Os Mistérios da Eternidade: As Pirâmides de Gizé e o Livro dos Mortos',
        synopsis: 'A busca dos faraós pela imortalidade, a engenharia celestial de Gizé e a travessia das almas no tribunal de Osíris.'
      },
      {
        title: 'Setor 3: A Idade de Ouro dos Faraós e a Tumba Dourada de Tutancâmon',
        synopsis: 'O esplendor dos tesouros reais em Luxor, o papiro sagrado, as joias de lápis-lazúli e a grandiosidade de Nefertiti e Ramsés.'
      },
      {
        title: 'Setor 4: O Esplendor de Cleópatra em Alexandria e o Legado Eterno',
        synopsis: 'O saber universal da Biblioteca de Alexandria, o banquete dos deuses e a glória eterna do Egito na Passarela do Samba.'
      }
    ],
    comissaoDeFrente: {
      name: 'Comissão de Frente: O Julgamento da Alma: A Balança de Anúbis e os Guardiões do Sarcófago',
      description: (_school, count) =>
        `Coreografia de ${count} bailarinos sacerdotes com máscaras douradas de chacal empunhando cetros sagrados. No ápice da coreografia, eles abrem um sarcófago tridimensional dourado do qual levita magicamente Tutancâmon sob feixes solares de Rá.`,
      costume: (school) =>
        `Túnicas egípcias com peitorais de contas douradas, faixas de linho com hieróglifos luminescentes nas cores ${school.colors.primary} e máscaras esculpidas com olhos de lápis-lazúli.`
    },
    casal1: {
      name: '1º Casal de MS & PB: Ísis e Osíris: O Amor Imortal e as Asas Celestiais do Nilo',
      description: () =>
        'O Mestre-Sala rodopia com majestade divina como Osíris, senhor da eternidade, enquanto a Porta-Bandeira abre majestosas asas plissadas em ouro puro de Ísis reverenciando o pavilhão sagrado.',
      costume: (school) =>
        `Gala imperial faraônica em fios de ouro e seda azul-turquesa, peitorais com escaravelhos e resplendores monumentais com plumas douradas e detalhes nas cores ${school.colors.primary}.`
    },
    abreAlas: {
      name: 'Abre-Alas: O Alvorecer de Gizé: A Esfinge Dourada e o Templo Solar de Rá',
      description: (school) =>
        `Alegoria colossal de 48 metros. À frente, uma Esfinge dourada de 16 metros com olhos em canhões de luz laser e névoa fria. Pirâmides reluzentes em folhas de ouro e o pavilhão da ${school.shortName} coroando o monumento.`,
      structure: (school) =>
        `Dois chassis acoplados com acabamento em folha de ouro, espelhos refletivos, colunas de papiros e iluminação cênica nas cores ${school.colors.primary}.`
    },
    tripod1: {
      name: 'Tripé 1: A Barca Solar de Rá e a Travessia dos Doze Portais',
      description: 'Elemento cenográfico com a barca mística de Rá navegando pelo céu e combatendo as trevas.'
    },
    baianas: {
      name: 'Ala das Baianas: As Sacerdotisas de Hathor e as Águas Abençoadas do Nilo',
      description: (count) =>
        `${count} matriarcas rodopiando com a serenidade milenar das guardiãs de Hathor, espalhando perfume de flores de lótus e alfazema.`,
      costume: (school) =>
        `Vestidos rodados em linho plissado branco e ouro, toucas sacerdotais com chifres lunares de Hathor ornados com pedrarias e detalhes nas cores ${school.colors.primary}.`
    },
    bateria: {
      name: 'Bateria: O Exército Sagrado do Faraó Ramsés II',
      description: (school, count) =>
        `Mestre comanda ${count} ritmistas com paradinhas de marcha bélica e cadência imponente, com tamborins e surdos evocando o poder do império faraônico.`,
      costume: (school) =>
        `Armaduras leves em couro dourado com a serpente sagrada Uraeus, saiotes plissados e elmos de falcão nas cores ${school.colors.primary} e ${school.colors.secondary}.`
    },
    passistas: {
      name: 'Ala dos Passistas: O Frenezô das Dançarinas dos Templos e a Ginga do Deserto',
      description: 'Passistas evoluindo com passos rápidos e malandros, com braceletes de serpente dourada e tecidos esvoaçantes.',
      costume: (school) => `Saiotes curtos com contas brilhantes e fios dourados com toques de ${school.colors.primary}.`
    },
    casal2: {
      name: '2º Casal de MS & PB: Hórus e Hathor: O Céu Estrelado e a Proteção Real',
      description: 'Condução solene do segundo pavilhão exaltando o olho de Hórus e a harmonia celestial.',
      costume: (school) => `Trajes em turquesa e dourado com capas plissadas e plumas leves.`
    },
    tripod2: {
      name: 'Tripé 2: O Tribunal da Verdade: A Balança e a Pena de Maat',
      description: 'Balança cenográfica articulada onde o coração é pesado contra a pena da deusa Maat.'
    },
    floats: [
      {
        floatNumber: 2,
        name: 'Carro 2: A Barca Solar e os Deuses do Panteão Sagrado',
        description: 'Monumental embarcação celestial de Rá escoltada por Anúbis, Tot e Bastet sob colunas de hieróglifos.'
      },
      {
        floatNumber: 3,
        name: 'Carro 3: A Tumba de Ouro de Tutancâmon e os Tesouros de Luxor',
        description: 'Réplica magnífica da câmara funerária de Tutancâmon com tronos dourados, bigas e escaravelhos reluzentes.'
      },
      {
        floatNumber: 4,
        name: 'Carro 4: O Banquete de Alexandria: A Glória de Cleópatra',
        description: 'O fausto da última rainha do Egito entre leões de mármore, cortinados de seda púrpura e obeliscos romanos.'
      }
    ],
    velhaGuarda: {
      name: 'Velha Guarda: Os Escribas da Eternidade e os Sábios do Nilo',
      description: (school) => `Os baluartes da ${school.shortName} desfilando com garbo imperial e leques de plumas douradas.`,
      costume: (school) => `Ternos clássicos de linho imperial branco e ouro com medalhas honorárias.`
    },
    apoteose: {
      name: (_school, floatNum) => `Carro ${floatNum}: A Imortalidade dos Faraós na Sapucaí`,
      description: (school) =>
        `Megaescultura dourada do Faraó triunfante ladeada por obeliscos de cristal que espelham a passarela, com o pavilhão da ${school.shortName} brilhando no topo do Carnaval.`
    },
    alas: [
      { sectorNumber: 1, title: 'O Caos Primordial (Nun) e o Primeiro Raio de Rá', description: 'O despertar da luz divina sobre as águas infinitas da criação.', costume: 'Túnicas azuis profundas com resplendores solares dourados.' },
      { sectorNumber: 1, title: 'As Cheias Férteis do Nilo e as Sementes da Vida', description: 'O milagre anual das águas que nutriam os campos do Egito.', costume: 'Saias plissadas com motivos de canaviais de papiro e lótus.' },
      { sectorNumber: 1, title: 'Os Escribas Reais e os Papiros Sagrados', description: 'Os mestres da escrita preservando a história nas palavras dos deuses.', costume: 'Túnicas de linho com rolos de papiro cênicos e pincéis de junco.' },
      { sectorNumber: 1, title: 'O Olho de Hórus: O Amuleto Protetor da Humanidade', description: 'A proteção celestial contra todos os males e perigos.', costume: 'Peitorais com o olho Udjat reluzente em pedrarias turquesa.' },
      { sectorNumber: 1, title: 'Bastet, a Deusa Gata e os Guardiões do Lar', description: 'A doçura maternal e a ferocidade na proteção das famílias.', costume: 'Fantasias com máscaras de felino douradas e colares de contas.' },
      { sectorNumber: 1, title: 'Tot, o Deus da Sabedoria e o Registro do Tempo', description: 'O patrono das ciências, astronomia e escrita sagrada.', costume: 'Túnicas com asas de íbis e tábuas astronômicas nas mãos.' },
      { sectorNumber: 2, title: 'Os Arquitetos e Construtores das Pirâmides de Gizé', description: 'Os mestres de obras que ergueram monumentos eternos.', costume: 'Saiotes rústicos de linho com réguas e esquadros de bronze cênicos.' },
      { sectorNumber: 2, title: 'Os Astrônomos e o Alinhamento com a Constelação de Órion', description: 'A conexão cósmica entre os monumentos da terra e os astros.', costume: 'Mantos estrelados em azul marinho com constelações reluzentes.' },
      { sectorNumber: 2, title: 'O Ritual da Mumificação e os Quatro Vasos Canópicos', description: 'O preparo sagrado do corpo físico para a travessia espiritual.', costume: 'Faixas estilizadas de linho branco com amuletos de escaravelho.' },
      { sectorNumber: 2, title: 'O Livro dos Mortos e os Encantamentos da Alma', description: 'Os feitiços e orações que garantiam a passagem segura pelo além.', costume: 'Capas pintadas à mão com hieróglifos dourados sagrados.' },
      { sectorNumber: 2, title: 'Os Escaravelhos Sagrados e o Renascimento Diário', description: 'O símbolo divino da regeneração e do renascer da vida.', costume: 'Fantasias iridescentes com asas mecânicas de escaravelho.' },
      { sectorNumber: 2, title: 'O Tribunal de Osíris e a Pena da Deusa Maat', description: 'A pesagem do coração contra a pureza e a verdade cósmica.', costume: 'Balancins dourados nos ombros e penas de avestruz imaculadas.' },
      { sectorNumber: 3, title: 'Os Guerreiros de Ramsés II e as Bigas de Batalha', description: 'O poder bélico que defendeu as fronteiras do grande império.', costume: 'Couraças de placas de cobre e elmos com plumas guerreiras.' },
      { sectorNumber: 3, title: 'A Rainha Hatshepsut: O Faraó Feminino da Paz', description: 'A líder sábia que abriu rotas comerciais e construiu templos sublimes.', costume: 'Manto real de linho fino plissado com barba cerimonial e coroa dupla.' },
      { sectorNumber: 3, title: 'Akhenaton e o Hino ao Sol Único de Aton', description: 'A revolução mística que cantou a luz solar como criadora do mundo.', costume: 'Túnicas solares fluidas com raios de ouro descendo sobre as mãos.' },
      { sectorNumber: 3, title: 'A Rainha Nefertiti: A Beleza que Iluminou o Nilo', description: 'O ícone imortal de elegância, graça e liderança imperial.', costume: 'O icônico toucado azul alto de Nefertiti e colares peitorais de ouro.' },
      { sectorNumber: 3, title: 'A Máscara de Ouro Maciço de Tutancâmon', description: 'O tesouro inestimável que encantou e deslumbrou o mundo moderno.', costume: 'Máscaras monumentais estilizadas em folha de ouro e lápis-lazúli.' },
      { sectorNumber: 3, title: 'Os Tesouros e Bigas Douradas da Tumba Real', description: 'As riquezas que acompanharam o jovem faraó na eternidade.', costume: 'Indumentária reluzente com motivos de bigas e falcões reais.' },
      { sectorNumber: 3, title: 'A Maldição dos Faraós e a Lenda de Howard Carter', description: 'O fascínio e o mistério que envolveram a abertura do túmulo.', costume: 'Trajes de expedição clássica combinados com elementos dourados.' },
      { sectorNumber: 4, title: 'A Grande Biblioteca de Alexandria e o Saber do Mundo', description: 'O santuário do conhecimento humano que reuniu todo o saber clássico.', costume: 'Túnicas helenísticas em marfim com pergaminhos de veludo.' },
      { sectorNumber: 4, title: 'O Farol de Alexandria: A Sétima Maravilha da Antiguidade', description: 'A torre luminosa que guiava os navegantes nas noites mediterrâneas.', costume: 'Fantasias com espelhos refletores e lanternas de luz cálida.' },
      { sectorNumber: 4, title: 'O Banquete de Cleópatra e o Fascínio de Roma', description: 'A inteligência política e o encanto da última rainha do Egito.', costume: 'Vestes de gala púrpuras com bordados romanos e coroas de louros.' },
      { sectorNumber: 4, title: 'Os Mercadores de Incenso, Mirra e Pedra Lápis-Lazúli', description: 'O comércio das rotas milenares que enriqueceram as cidades.', costume: 'Turbantes de seda orientais com alforjes de especiarias e tecidos.' },
      { sectorNumber: 4, title: 'O Fascínio do Cinema: O Egito na Cultura Pop e nas Telas', description: 'A paixão eterna da humanidade pelas lendas das múmias e reis.', costume: 'Fantasias lúdicas inspiradas nos grandes clássicos cinematográficos.' },
      { sectorNumber: 4, title: 'O Nilo Deságua na Sapucaí: O Abraço do Egito com o Samba', description: 'O encontro do mistério dos faraós com a alegria da passarela carioca.', costume: 'Fantasias festivas com franjas douradas e motivos egípcios.' },
      { sectorNumber: 4, title: 'A Glória Imortal dos Faraós no Reino de Momo', description: 'A eternidade conquistada não em pedras, mas na voz do povo que canta.', costume: 'Mantos reais com resplendores dourados celebrando a eternidade.' }
    ]
  },
  amazonia: {
    id: 'amazonia',
    themeKeywords: ['amazonia', 'amazônia', 'samauma', 'samaúma', 'rios-voadores', 'curupira', 'parintins', 'selva', 'floresta', 'iara', 'encantados', 'boto', 'indigenas', 'indígenas'],
    sectors: [
      {
        title: 'Setor 1: O Manto Sagrado da Floresta: A Samaúma Cósmica e os Povos Originários',
        synopsis: 'A floresta viva criada pelos espíritos ancestrais, a sabedoria dos pajés e a comunhão sagrada dos povos originários com a natureza.'
      },
      {
        title: 'Setor 2: O Reino das Águas Doces e os Encantados dos Igarapés',
        synopsis: 'A magia dos botos galanteadores, o canto sedutor de Iara e as lendas que protegem os rios da ganância humana.'
      },
      {
        title: 'Setor 3: A Ópera Cabocla de Parintins: O Folclore que Faz a Selva Cantar',
        synopsis: 'A explosão de cores e toadas entre Caprichoso e Garantido, a força dos tuxauas e a poesia do boi-bumbá amazônico.'
      },
      {
        title: 'Setor 4: Os Rios Voadores e o Clamor Planetário: A Salvação do Pulmão do Mundo',
        synopsis: 'A transpiração das copas que faz chover em todo o continente e o grito urgente em defesa da vida na Terra.'
      }
    ],
    comissaoDeFrente: {
      name: 'Comissão de Frente: O Alerta dos Encantados e a Fúria Protetora do Curupira',
      description: (_school, count) =>
        `Coreografia teatralizada em que ${count} bailarinos espíritos da floresta se camuflam entre troncos cenográficos vivos. Sob fumaça esmeralda e relâmpagos cenográficos, surge o Curupira com passos invertidos e truque ilusionista fazendo as árvores caminharem.`,
      costume: (school) =>
        `Fibras naturais de buriti, sementes de açaí, folhagens tropicais com pintura corporal fluorescente de grafismos Yanomami e toques nas cores ${school.colors.primary}.`
    },
    casal1: {
      name: '1º Casal de MS & PB: A Vitória-Régia e a Lua Cheia: O Romance de Naiá e Jaci',
      description: () =>
        'O Mestre-Sala rodopia como o brilho lunar de Jaci, enquanto a Porta-Bandeira abre a saia em pétalas de vitória-régia verde e branca com cristais aquáticos, desfraldando o pavilhão com amor à floresta.',
      costume: (school) =>
        `Verde esmeralda e branco lunar, plumas ecológicas de fibras vegetais, saia bordada com vitórias-régias iluminadas por micropontos de LED e resplendores nas cores ${school.colors.primary}.`
    },
    abreAlas: {
      name: 'Abre-Alas: A Samaúma Cósmica e a Sinfonia dos Rios Voadores',
      description: (school) =>
        `Alegoria monumental acoplada de 48 metros. Ao centro, a majestosa Samaúma de 17 metros com raízes sapopembas que pulsam iluminação bio-verde. Cascatas de água real recirculante e canhões de névoa fria lançando os rios voadores sobre a avenida.`,
      structure: (school) =>
        `Dois chassis com vegetação cenográfica realista, animais mecatrônicos articulados e esculturas em ${school.colors.primary} e ${school.colors.secondary}.`
    },
    tripod1: {
      name: 'Tripé 1: O Altar dos Xamãs e a Chama Sagrada do Maracá',
      description: 'Elemento cenográfico com pajés e maracás emanando fumaça aromática de defumação da mata.'
    },
    baianas: {
      name: 'Ala das Baianas: As Mães da Mata: As Rezadeiras e Erveiras de Iara',
      description: (count) =>
        `${count} matriarcas rodopiando como flores aquáticas nos remansos dos igarapés, espalhando cheiro de patchouli e alfazema da floresta.`,
      costume: (school) =>
        `Saias volumosas estampadas com folhas gigantescas de vitória-régia, panos da costa rústicos tingidos com urucum e turbantes com sementes e flores nas cores ${school.colors.primary}.`
    },
    bateria: {
      name: 'Bateria: Os Guardiões do Pulso Verde e os Batuques da Selva',
      description: (school, count) =>
        `Mestre comanda ${count} ritmistas com levadas inspiradas nas toadas de Parintins, combinando caixas, surdos e tamborins com a força tribal dos tambores da selva.`,
      costume: (school) =>
        `Indumentárias leves de caboclos ribeirinhos com pinturas corporais, braceletes de cipó e penas ecológicas nos chapéus de palha com detalhes em ${school.colors.primary}.`
    },
    passistas: {
      name: 'Ala dos Passistas: O Frenezô das Cunhãs e a Ginga dos Caboclos',
      description: 'Passistas evoluindo com passos frenéticos e toques de toada, combinando o samba no pé com a dança tribal.',
      costume: (school) => `Costumes leves de palha e penas ecológicas nas cores ${school.colors.primary} e ${school.colors.secondary}.`
    },
    casal2: {
      name: '2º Casal de MS & PB: O Canto do Uirapuru e o Espírito da Paz',
      description: 'Condução harmoniosa do segundo pavilhão exaltando o pássaro sagrado da floresta.',
      costume: (school) => `Trajes em tons terrosos e dourados com penas de fibra ecológica.`
    },
    tripod2: {
      name: 'Tripé 2: O Bumbódromo Místico: O Encontro de Azuis e Vermelhos',
      description: 'Elemento cenográfico celebrando a harmonia das cores de Caprichoso e Garantido.'
    },
    floats: [
      {
        floatNumber: 2,
        name: 'Carro 2: O Reino Encantado dos Igarapés: A Mãe-d’Água e o Boto',
        description: 'Cenografia aquática monumental com botos rosados articulados, peixes amazônicos gigantes e a figura mística de Iara.'
      },
      {
        floatNumber: 3,
        name: 'Carro 3: A Ópera de Parintins: O Boi-Bumbá no Coração da Selva',
        description: 'Alegoria vibrante unindo o Boi Caprichoso e o Boi Garantido entre tuxauas monumentais e cocares gigantes.'
      },
      {
        floatNumber: 4,
        name: 'Carro 4: A Catedral dos Rios Voadores e o Pulso do Clima',
        description: 'Estrutura imponente com nuvens translúcidas iluminadas e efeitos de vapor representando a umidade que irriga o continente.'
      }
    ],
    velhaGuarda: {
      name: 'Velha Guarda: Os Mestres Seringueiros e os Guardiões da Sabedoria',
      description: (school) => `Os baluartes da ${school.shortName} desfilando com trajes de gala de linho com detalhes em palha nobre.`,
      costume: (school) => `Ternos clássicos de linho cru com botões de sementes amazônicas e gravatas nas cores ${school.colors.primary}.`
    },
    apoteose: {
      name: (_school, floatNum) => `Carro ${floatNum}: A Amazônia Viva: O Clamor da Terra e a Floresta em Pé`,
      description: (school) =>
        `Megaescultura da Mãe Terra abraçando a floresta e os povos originários, com o pavilhão da ${school.shortName} reluzindo no topo do Carnaval.`
    },
    alas: [
      { sectorNumber: 1, title: 'Os Pajés Primordiais e o Conhecimento da Floresta', description: 'Os líderes espirituais que guardam os cantos sagrados dos povos.', costume: 'Cocares estilizados em fibras e túnicas com grafismos indígenas.' },
      { sectorNumber: 1, title: 'A Dança das Araras Canindé e a Sinfonia das Aves', description: 'A explosão de azul e amarelo cruzando as copas da mata.', costume: 'Fantasias com asas aerodinâmicas em plumas ecológicas coloridas.' },
      { sectorNumber: 1, title: 'A Onça-Pintada: A Senhora Soberana da Selva', description: 'A força e o mistério da grande predadora do chão da mata.', costume: 'Macacões com estampa realista e máscaras de felino em veludo.' },
      { sectorNumber: 1, title: 'As Serpentes Sagradas: A Lenda da Cobra Norato', description: 'A grande serpente mítica que moldou os cursos dos rios.', costume: 'Fantasias articuladas em escamas cintilantes verdes e douradas.' },
      { sectorNumber: 1, title: 'O Boitatá de Fogo nas Noites Sem Fim', description: 'A serpente luminosa que pune quem queima a floresta.', costume: 'Tecidos esvoaçantes com fitas de LED âmbar e vermelho fogo.' },
      { sectorNumber: 2, title: 'O Boto Cor-de-Rosa e as Festas da Ribeira', description: 'O ser encantado que se veste de branco para dançar nas noites de lua.', costume: 'Ternos brancos elegantes de linho com chapéus de palha e flores.' },
      { sectorNumber: 2, title: 'A Sereia Iara e o Canto das Profundezas Fluviais', description: 'A beleza aquática que atrai os pescadores para o fundo das águas.', costume: 'Caudas de peixe reluzentes em madrepérola e tops de conchas.' },
      { sectorNumber: 2, title: 'O Peixe-Boi e a Fauna Doce dos Remansos', description: 'A mansidão dos mamíferos aquáticos nos lagos amazônicos.', costume: 'Fantasias acolchoadas em tons cinza com detalhes em musgo verde.' },
      { sectorNumber: 2, title: 'As Vitórias-Régias e os Espelhos d’Água', description: 'As gigantescas folhas flutuantes que suportam pássaros e rãs.', costume: 'Costados circulares imitando as folhas gigantes com lótus no peito.' },
      { sectorNumber: 2, title: 'A Lenda do Guaraná e os Olhos Sagrados de Mawé', description: 'O fruto divino que nasceu do choro e da esperança dos filhos da terra.', costume: 'Adereços com cachos de guaraná estilizados em resina brilhante.' },
      { sectorNumber: 3, title: 'O Boi Caprichoso: A Estrela Azul de Parintins', description: 'A magia e a tradição do boi da estrela na testa.', costume: 'Indumentárias festivas em azul real, prata e veludo bordado.' },
      { sectorNumber: 3, title: 'O Boi Garantido: O Coração Vermelho da Baixa', description: 'A paixão e a cadência do boi do coração na testa.', costume: 'Indumentárias vibrantes em vermelho rubro, branco e fitas festivas.' },
      { sectorNumber: 3, title: 'Os Grandes Tuxauas e a Nobreza das Tribos', description: 'Os guerreiros com seus espaldares monumentais de penas.', costume: 'Estruturas dorsais monumentais com arte plumária ecológica.' },
      { sectorNumber: 3, title: 'A Cunha-Poranga: A Força da Mulher Guerreira', description: 'A personificação da bravura e da beleza da floresta.', costume: 'Vestimentas de guerreira em couro vegetal e braceletes de sementes.' },
      { sectorNumber: 3, title: 'Os Pescadores e as Casas de Palafita nos Igarapés', description: 'A vida simples e digna às margens das grandes águas.', costume: 'Roupas leves de ribeirinho com redes de pesca e cestos de palha.' },
      { sectorNumber: 4, title: 'Os Rios Voadores e as Nuvens que Fazem Chover', description: 'O fenômeno natural que sustenta as lavouras e cidades do país.', costume: 'Capas translúcidas imitando nuvens de vapor e gotas cristalinas.' },
      { sectorNumber: 4, title: 'A Medicina da Mata: As Ervas e o Saber Ancestral', description: 'O conhecimento botânico tradicional que cura a humanidade.', costume: 'Fantasias verdes com ramos medicinais e potes de cerâmica indígena.' },
      { sectorNumber: 4, title: 'O Grito Contra o Garimpo e o Veneno nos Rios', description: 'A denúncia contra a destruição das águas que sustentam os povos.', costume: 'Fantasias em cinza e preto com lágrimas azuis descendo no rosto.' },
      { sectorNumber: 4, title: 'Os Guardiões da Terra: Yanomami, Kayapó e Tikuna', description: 'A resistência histórica dos povos na defesa do solo sagrado.', costume: 'Indumentária solene com cocares de fibra e lanças de paz cênicas.' },
      { sectorNumber: 4, title: 'A Salvação da Terra: A Amazônia Viva no Asfalto', description: 'A celebração da vida e da esperança de um planeta regenerado.', costume: 'Vestes reluzentes com motivos de folhas douradas e flores tropicais.' }
    ]
  },
  futebol: {
    id: 'futebol',
    themeKeywords: ['futebol', 'maracana', 'maracanã', 'pele', 'pelé', 'gol', 'drible', 'varzea', 'várzea', 'selecao', 'seleção', 'chuteira', 'marta', 'torcida', 'bola'],
    sectors: [
      {
        title: 'Setor 1: O Futebol Moleque: Da Várzea e Chão Batido à Dança do Drible',
        synopsis: 'A infância no campinho de terra, a bola de meia, a chegada de Charles Miller e a ginga brasileira que transformou o esporte em arte.'
      },
      {
        title: 'Setor 2: A Era de Ouro e os Deuses da Pelota: Pelé, Garrincha e Marta',
        synopsis: 'A coroação dos grandes mestres do futebol-arte, o drible desconcertante de Garrincha, a majestade de Pelé e o pioneirismo de Marta.'
      },
      {
        title: 'Setor 3: O Templo Sagrado do Maracanã e o Amor Eterno das Torcidas',
        synopsis: 'O pulsar emocionante das arquibancadas, os bandeirões, as charangas, o radinho de pilha e a explosão arrebatadora do grito de gol.'
      },
      {
        title: 'Setor 4: A Glória Eterna do Brasil Canarinho: O Grito de Campeão na Sapucaí',
        synopsis: 'As cinco estrelas mundiais, a paixão da camisa amarela e o samba no pé comemorando a vitória do povo brasileiro.'
      }
    ],
    comissaoDeFrente: {
      name: 'Comissão de Frente: A Mágica da Pelota: O Drible que Fez o Mundo Parar',
      description: (_school, count) =>
        `Coreografia acrobática em que ${count} bailarinos malabaristas executam embaixadinhas sincronizadas, canetas, elásticos e tabelinhas aéreas com bolas luminosas. Em meio a traves douradas cenográficas, um bailarino realiza uma bicicleta no ar congelando o instante do gol.`,
      costume: (school) =>
        `Uniformes estilizados de gala esportiva retrô em degradê verde-amarelo e dourado, chuteiras personalizadas espelhadas e detalhes nas cores ${school.colors.primary}.`
    },
    casal1: {
      name: '1º Casal de MS & PB: A Taça do Mundo e a Glória Sagrada do Pavilhão Canarinho',
      description: () =>
        'O Mestre-Sala rodopia como um capitão lendário erguendo a glória máxima do futebol, enquanto a Porta-Bandeira baila desfraldando o pavilhão como o mais sagrado estandarte.',
      costume: (school) =>
        `Ouro reluzente e verde-esmeralda, saia bordada com as taças Jules Rimet e FIFA em fios dourados, resplendores monumentais com cinco estrelas brilhantes e detalhes em ${school.colors.primary}.`
    },
    abreAlas: {
      name: 'Abre-Alas: O Templo Sagrado: O Maracanã Iluminado e os Deuses da Bola',
      description: (school) =>
        `Alegoria monumental acoplada de 48 metros representando o Maracanã em dia de clássico. Fachada com arquibancadas móveis e bonecos articulados, torres de refletores autênticos de estádio, gramado cenográfico de alta fidelidade e megaesculturas de chuteiras aladas com o símbolo da ${school.shortName}.`,
      structure: (school) =>
        `Dois chassis com gramado cenográfico, iluminação de refletores esportivos e acabamentos nas cores ${school.colors.primary} e ${school.colors.secondary}.`
    },
    tripod1: {
      name: 'Tripé 1: A Trave de Chinelo e o Campinho de Terra Vermelha',
      description: 'Elemento cenográfico retratando o campo de várzea da infância com bolas de meia e chinelos como traves.'
    },
    baianas: {
      name: 'Ala das Baianas: As Donas da Geral e as Matriarcas das Torcidas Brasileiras',
      description: (count) =>
        `${count} matriarcas rodopiando com estandartes e bandeiras nas cores dos estádios, recriando a emoção das arquibancadas de domingo.`,
      costume: (school) =>
        `Vestidos rodados com saias plissadas compostas por faixas de torcida, estampas retrô dos grandes momentos do futebol e turbantes nas cores ${school.colors.primary}.`
    },
    bateria: {
      name: 'Bateria: A Torcida que Canta e Vibra: O Coração da Arquibancada',
      description: (school, count) =>
        `Mestre comanda ${count} ritmistas vestidos com camisas clássicas da Seleção dos anos 70, com paradinhas que simulam a pulsação do estádio e a explosão de GOOOOL!`,
      costume: (school) =>
        `Camisas canarinho retrô com o número 10 nas costas, meiões listrados, bonés esportivos e apitos de arbitragem que soam nas entradas das bossas, com toques de ${school.colors.primary}.`
    },
    passistas: {
      name: 'Ala dos Passistas: O Frenezô da Ginga e o Drible da Vaca',
      description: 'Malandros e passistas evoluindo com ginga de capoeira e passos que lembram o drible no gramado.',
      costume: (school) => `Costumes leves em verde e amarelo com chuteiras adaptadas para o samba no pé.`
    },
    casal2: {
      name: '2º Casal de MS & PB: A Camisa Canarinho e o Orgulho Nacional',
      description: 'Condução nobre do segundo pavilhão exaltando a paixão popular pelo manto canarinho.',
      costume: (school) => `Trajes em amarelo ouro e azul cobalto com detalhes em ${school.colors.secondary}.`
    },
    tripod2: {
      name: 'Tripé 2: A Cabine de Transmissão e o Radinho de Pilha',
      description: 'Escultura de radinho de pilha gigante com microfones e fitas de campeão.'
    },
    floats: [
      {
        floatNumber: 2,
        name: 'Carro 2: Dos Terrões da Periferia aos Palcos do Mundo',
        description: 'Cenografia da várzea brasileira com campos de terra, varais de camisas e a ascensão dos meninos sonhadores.'
      },
      {
        floatNumber: 3,
        name: 'Carro 3: O Tri de 70 e os Monumentos do Futebol-Arte',
        description: 'Megaesculturas douradas de Pelé e dos craques imortais erguendo a taça sob arcos triunfais.'
      },
      {
        floatNumber: 4,
        name: 'Carro 4: A Festa das Torcidas: Bandeirões, Charangas e Papel Picado',
        description: 'Arquibancada efervescente com canhões de papel picado e fogos frios celebrando o amor dos torcedores.'
      }
    ],
    velhaGuarda: {
      name: 'Velha Guarda: Os Capitães da Vitória e os Baluartes da Bola',
      description: (school) => `Os mestres fundadores da ${school.shortName} desfilando com ternos clássicos de linho e faixas de campeão do povo.`,
      costume: (school) => `Ternos clássicos nas cores ${school.colors.primary} com broches dourados em formato de chuteira.`
    },
    apoteose: {
      name: (_school, floatNum) => `Carro ${floatNum}: É Campeão! A Taça Dourada e a Glória do Povo`,
      description: (school) =>
        `Monumental taça dourada de 16 metros girando sob refletores de estádio e chuva de papel picado, com o pavilhão da ${school.shortName} coroado como o grande campeão.`
    },
    alas: [
      { sectorNumber: 1, title: 'A Bola de Meia e a Infância no Terreno Baldio', description: 'A inocência e a criatividade dos primeiros chutes sem chuteira.', costume: 'Roupas infantis estilizadas com meias coloridas e bolas de retalho.' },
      { sectorNumber: 1, title: 'As Traves de Chinelo e o Campinho de Terra Batida', description: 'O improviso genial que fez nascer os maiores craques do mundo.', costume: 'Fantasias com motivos de poeira vermelha e chinelos estilizados.' },
      { sectorNumber: 1, title: 'Charles Miller e o Desembarque da Pelota no Brasil', description: 'O jovem que trouxe a primeira bola da Inglaterra em 1894.', costume: 'Trajes de época vitoriana com coletes elegantes e bolas de couro marrom.' },
      { sectorNumber: 1, title: 'A Ginga da Capoeira Encontrando o Passo da Pelota', description: 'A dança ancestral que deu aos brasileiros a malandragem do drible.', costume: 'Abadás estilizados com berimbaus e bolas decoradas.' },
      { sectorNumber: 1, title: 'O Futebol Operário e a Luta contra o Preconceito', description: 'A superação das barreiras raciais e de classe nos primeiros clubes.', costume: 'Uniformes operários retrô com emblemas históricos de resistência.' },
      { sectorNumber: 2, title: 'O Drible da Vaca, a Caneta, o Chapéu e a Lamparina', description: 'A enciclopédia dos dribles que enlouqueceram zagueiros pelo mundo.', costume: 'Fantasias dinâmicas com fitas esvoaçantes simulando a trajetória da bola.' },
      { sectorNumber: 2, title: 'O Rei Pelé: A Coroa, o Trono e a Camisa 10 Eterna', description: 'A reverência ao maior atleta do século XX e rei dos gramados.', costume: 'Coroas douradas monumentais e mantos reais com o número 10 brilhante.' },
      { sectorNumber: 2, title: 'O Anjo das Pernas Tortas: A Mágica de Garrincha', description: 'A alegria do povo e o drible desconcertante que desafiou a física.', costume: 'Fantasias com pernas estilizadas e asas douradas de anjo vadio.' },
      { sectorNumber: 2, title: 'A Rainha Marta: Seis Vezes a Melhor e a Força Feminina', description: 'A genialidade e a luta histórica das mulheres no esporte.', costume: 'Coroas de rainha modernas com armaduras leves em verde e rosa.' },
      { sectorNumber: 2, title: 'Os Grandes Goleiros: Os Milagres Debaixo das Traves', description: 'A coragem dos homens que voavam para impedir a festa do gol.', costume: 'Fantasias com luvas gigantes prateadas e traves dorsais leves.' },
      { sectorNumber: 3, title: 'O Maracanã Lotado: Cem Mil Corações em Sintonia', description: 'O templo do futebol pulsando em uníssono como uma só voz.', costume: 'Estruturas dorsais imitando a marquise do estádio com bonecos torcedores.' },
      { sectorNumber: 3, title: 'A Charanga de Jaime de Carvalho e os Metais na Geral', description: 'A música que embalava as torcidas antes das caixas de som.', costume: 'Fantasias de instrumentistas de charanga com trompetes e pratos.' },
      { sectorNumber: 3, title: 'Os Juízes, Bandeirinhas e os Cartões Amarelos e Vermelhos', description: 'A autoridade em campo e os lances polêmicos que geram debate.', costume: 'Fantasias pretas e amarelas com apitos e cartões gigantes.' },
      { sectorNumber: 3, title: 'O Radinho de Pilha e os Narradores Inesquecíveis', description: 'A emoção das transmissões de rádio que narravam epopeias.', costume: 'Fantasias lúdicas com réplicas de rádios vintage e fones de ouvido.' },
      { sectorNumber: 3, title: 'O Minuto Noventa: A Agonia e a Esperança do Pênalti', description: 'A respiração suspensa no estádio antes da cobrança decisiva.', costume: 'Fantasias com relógios parados marcando o instante do suspense.' },
      { sectorNumber: 4, title: 'A Suécia em 1958: O Primeiro Beijo na Taça Jules Rimet', description: 'O mundo se rende à juventude do garoto Pelé e ao futebol brasileiro.', costume: 'Fantasias retrô nas cores azul e branco do uniforme reserva de 58.' },
      { sectorNumber: 4, title: 'O México em 1970: A Maior Seleção de Todos os Tempos', description: 'O tricampeonato mundial e o desfile de craques em cores na TV.', costume: 'Sombreros mexicanos estilizados e camisas canarinho vibrantes.' },
      { sectorNumber: 4, title: 'O Tetra nos Estados Unidos em 1994: É Tetra! É Tetra!', description: 'O desabafo da nação nos pênaltis sob o sol escaldante da Califórnia.', costume: 'Fantasias com faixas comemorativas e estrelas douradas de campeão.' },
      { sectorNumber: 4, title: 'O Penta na Ásia em 2002: Os Cinco Astros no Peito', description: 'A redenção de Ronaldo e o penta definitivo da Seleção.', costume: 'Fantasias reluzentes com cinco grandes astros dourados no peito.' },
      { sectorNumber: 4, title: 'A Explosão do Gol: O Abraço Coletivo na Favela e no Asfalto', description: 'A comunhão de todas as gentes comemorando a bola na rede.', costume: 'Fantasias festivas com chuva de fitas laminadas e confetes dourados.' }
    ]
  },
  inteligencia_artificial: {
    id: 'inteligencia_artificial',
    themeKeywords: ['inteligencia-artificial', 'inteligência artificial', 'inteligência-artificial', 'algoritmo', 'androide', 'andróide', 'cibernetica', 'cibernética', 'microchip', 'silicio', 'silício', 'redes neurais', 'quântico'],
    sectors: [
      {
        title: 'Setor 1: A Aurora Digital: Os Primeiros Códigos e a Criação das Máquinas',
        synopsis: 'O ábaco, os pioneiros como Alan Turing, o código binário 0 e 1 e o nascimento do primeiro microchip de silício.'
      },
      {
        title: 'Setor 2: A Metrópole Quântica: A Inteligência das Redes e o Big Data',
        synopsis: 'A era dos supercomputadores, as redes neurais artificiais, os oceanos de dados e a automação do cotidiano.'
      },
      {
        title: 'Setor 3: O Dilema da Consciência: Pode o Algoritmo Ter Alma e Sambar?',
        synopsis: 'O confronto filosófico entre a precisão fria das máquinas e a espontaneidade calorosa do batuque do morro.'
      },
      {
        title: 'Setor 4: A Vitória da Emoção: A Tecnologia a Serviço da Arte e do Amor Humano',
        synopsis: 'O tamborim que quebra os códigos e faz o coração bater: o calor e a vitória da alma humana na Passarela do Futuro.'
      }
    ],
    comissaoDeFrente: {
      name: 'Comissão de Frente: O Despertar da Consciência: O Encontro do Ciborgue com a Ginga Humana',
      description: (_school, count) =>
        `Coreografia teatralizada em que ${count} bailarinos ciborgues com exoesqueletos cromados e LEDs programáveis iniciam com movimentos rígidos e matemáticos. Ao ouvirem o primeiro surdo, seus peitorais iluminam em vermelho pulsante e eles 'aprendem' a sambar, libertando a emoção humana das amarras do código.`,
      costume: (school) =>
        `Exoesqueletos prateados em fibra de carbono, tecidos holográficos com circuitos impressos, capacetes espelhados futuristas e fitas de LED endereçável nas cores ${school.colors.primary}.`
    },
    casal1: {
      name: '1º Casal de MS & PB: O Código Binário e a Alma Humana: A Dança da Luz e do Sentimento',
      description: () =>
        'O Mestre-Sala corteja com a precisão dos feixes de luz quânticos, enquanto a Porta-Bandeira baila com um manto holográfico, defendendo o pavilhão como o único tesouro incorruptível pelas máquinas.',
      costume: (school) =>
        `Seda prateada com fios de fibra óptica luminosa, degradê em azul elétrico e magenta neon, resplendores de acrílico espelhado com plumas furta-cor e detalhes nas cores ${school.colors.primary}.`
    },
    abreAlas: {
      name: 'Abre-Alas: A Megacidade Quântica e o Grande Cérebro de Silício',
      description: (school) =>
        `Megaestrutura cenográfica futurista de 48 metros. Ao centro, uma escultura colossal de 16 metros de um cérebro cibernético translúcido pulsando conexões neurais em fibra óptica e lasers, com o símbolo da ${school.shortName} reluzindo no topo do Carnaval.`,
      structure: (school) =>
        `Dois chassis com torres de servidores espelhados, hologramas tridimensionais, jatos de fumaça criogênica e acabamentos nas cores ${school.colors.primary} e ${school.colors.secondary}.`
    },
    tripod1: {
      name: 'Tripé 1: A Encruzilhada Binária: O Portal dos Dados 0 e 1',
      description: 'Elemento cenográfico móvel com painéis de dados em cascata no estilo Matrix futurista.'
    },
    baianas: {
      name: 'Ala das Baianas: As Matriarcas Quânticas: O Axé que Nenhum Código Consegue Decifrar',
      description: (count) =>
        `${count} baianas com saias holográficas furta-cor girando em rotações que refletem as luzes dos refletores, provando que a bênção dos ancestrais e o amor comunitário jamais serão programados por uma máquina.`,
      costume: (school) =>
        `Saias em tecidos refletores com mandalas quânticas bordadas em fios dourados, turbantes com antenas estilizadas de cristal e detalhes nas cores ${school.colors.primary}.`
    },
    bateria: {
      name: 'Bateria: Os Ritmistas Cibernéticos: A Pulsação Humana no Mundo Digital',
      description: (school, count) =>
        `Mestre comanda ${count} ritmistas em trajes futuristas executando paradinhas que iniciam com marcações mecânicas em compasso quebrado e explodem no ritmo visceral e quente do surdo carioca.`,
      costume: (school) =>
        `Macacões ergonômicos de alta tecnologia em prata e preto fosco, com circuitos impressos luminescentes e viseiras espelhadas futuristas com toques de ${school.colors.primary}.`
    },
    passistas: {
      name: 'Ala dos Passistas: O Frenezô Holográfico e a Eletricidade no Pé',
      description: 'Passistas evoluindo com passos ultrarrápidos e roupas reflexivas de alto impacto visual.',
      costume: (school) => `Costumes leves em prata metálica com detalhes de néon nas cores ${school.colors.primary}.`
    },
    casal2: {
      name: '2º Casal de MS & PB: A Conexão Sem Fio e a Harmonia Universal',
      description: 'Condução solene do segundo pavilhão exaltando a união pacífica da ciência com o samba.',
      costume: (school) => `Trajes em cromo e azul ciano com capas de fibra óptica luminosa.`
    },
    tripod2: {
      name: 'Tripé 2: O Laboratório do Metaverso e os Avatares Digitais',
      description: 'Estrutura móvel com telas de LED translúcidas exibindo animações de avatares sambando.'
    },
    floats: [
      {
        floatNumber: 2,
        name: 'Carro 2: O Laboratório do Futuro: A Criação da Vida Artificial',
        description: 'Cenografia laboratorial com cápsulas de androides, braços robóticos articulados e labirintos de cabos de fibra óptica.'
      },
      {
        floatNumber: 3,
        name: 'Carro 3: O Tribunal das Máquinas: O Julgamento da Emoção',
        description: 'Imponente corte futurista com robôs gigantes e juízes cibernéticos que se curvam perante a lágrima e a poesia do ser humano.'
      },
      {
        floatNumber: 4,
        name: 'Carro 4: A Metrópole da Esperança: A Tecnologia a Serviço da Cura',
        description: 'Visão utópica e luminosa da ciência curando enfermidades e conectando os povos em fraternidade.'
      }
    ],
    velhaGuarda: {
      name: 'Velha Guarda: Os Guardiões da Tradição Analógica e do Coração Puro',
      description: (school) => `Os baluartes da ${school.shortName} desfilando com ternos de gala e bengalas com luz suave, simbolizando a eterna sabedoria da experiência humana.`,
      costume: (school) => `Ternos clássicos de linho prateado com lapelas nas cores ${school.colors.primary}.`
    },
    apoteose: {
      name: (_school, floatNum) => `Carro ${floatNum}: O Tamborim Vence o Algoritmo: A Vitória da Alma Humana`,
      description: (school) =>
        `Megaescultura de um tamborim cósmico dourado que desliga os circuitos e acende os corações, com o pavilhão da ${school.shortName} coroado no topo do futuro.`
    },
    alas: [
      { sectorNumber: 1, title: 'O Ábaco e os Primeiros Engenhos Matemáticos', description: 'A centelha pioneira da contagem e do cálculo na antiguidade.', costume: 'Túnicas com contas de madeira estilizadas e tábuas de argila.' },
      { sectorNumber: 1, title: 'Alan Turing e a Máquina de Decifrar Enigmas', description: 'O gênio que antecipou a inteligência das máquinas modernas.', costume: 'Trajes clássicos dos anos 40 com engrenagens e rotores metálicos.' },
      { sectorNumber: 1, title: 'Os Primeiros Tubos de Vácuo e a Era dos Mainframes', description: 'Os computadores gigantescos que ocupavam salas inteiras.', costume: 'Fantasias geométricas com válvulas translúcidas iluminadas.' },
      { sectorNumber: 1, title: 'O Microchip de Silício e os Transistores em Miniatura', description: 'A miniaturização que permitiu a revolução digital planetária.', costume: 'Placas de circuito impresso verdes e douradas cobrindo os trajes.' },
      { sectorNumber: 1, title: 'O Código Binário: O Universo em Zeros e Uns', description: 'A linguagem fundamental que codifica toda a informação digital.', costume: 'Fantasias pretas com números 0 e 1 fluorescentes em relevo.' },
      { sectorNumber: 2, title: 'A Teia Mundial: A Internet e a Conexão Instantânea', description: 'A rede global que aproximou continentes e culturas.', costume: 'Capas de malha prateada com pontos luminosos interconectados.' },
      { sectorNumber: 2, title: 'Os Satélites Orbitais e as Rodovias da Informação', description: 'As constelações artificiais orbitando e transmitindo dados.', costume: 'Fantasias aeroespaciais com painéis solares dobráveis nas costas.' },
      { sectorNumber: 2, title: 'O Big Data e os Oceanos Infinitos de Informação', description: 'A torrente de dados capturada a cada segundo na Terra.', costume: 'Saias em camadas azuis e prateadas simulando ondas de dados.' },
      { sectorNumber: 2, title: 'As Redes Neurais e o Aprendizado Profundo', description: 'Sistemas que aprendem imitando o cérebro biológico humano.', costume: 'Fantasias com nós de LED intermitentes mapeando conexões.' },
      { sectorNumber: 2, title: 'A Computação Quântica e os Qubits em Superposição', description: 'A física quântica revolucionando a velocidade do cálculo.', costume: 'Fantasias translúcidas em roxo e ciano com esferas atômicas orbitais.' },
      { sectorNumber: 3, title: 'A Robótica Industrial e as Fábricas Automatizadas', description: 'Os braços mecânicos assumindo o peso do trabalho pesado.', costume: 'Armaduras robóticas articuladas com acabamento em aço escovado.' },
      { sectorNumber: 3, title: 'Os Carros Autônomos e as Cidades Hiperconectadas', description: 'O transporte inteligente guiado por radares e sensores.', costume: 'Fantasias dinâmicas com faróis de LED e linhas aerodinâmicas.' },
      { sectorNumber: 3, title: 'A Inteligência Artificial Generativa e a Arte Digital', description: 'Algoritmos compondo sinfonias e pintando quadros.', costume: 'Túnicas com telas de pintura digital em cores caleidoscópicas.' },
      { sectorNumber: 3, title: 'O Metaverso e os Avatares na Realidade Virtual', description: 'A vida duplicada nos ambientes virtuais tridimensionais.', costume: 'Óculos VR estilizados e vestimentas pixeladas futuristas.' },
      { sectorNumber: 3, title: 'O Dilema: Pode um Robô Sentir o Arrepiado do Samba?', description: 'A perplexidade da máquina diante do calor e da lágrima humana.', costume: 'Fantasias meio-androide e meio-folião com corações reluzentes.' },
      { sectorNumber: 4, title: 'A Medicina do Futuro: A Cura das Enfermidades por I.A.', description: 'A ciência de precisão salvando vidas e regenerando a saúde.', costume: 'Trajes imaculados em branco e ciano com caduceus luminosos.' },
      { sectorNumber: 4, title: 'A Agricultura de Precisão e os Drones da Esperança', description: 'A tecnologia alimentando o planeta e combatendo o desperdício.', costume: 'Fantasias com asas de drone e espigas de milho e trigo douradas.' },
      { sectorNumber: 4, title: 'A Defesa da Ética e a Dignidade Inegociável do Homem', description: 'A certeza de que a tecnologia deve servir à liberdade e à paz.', costume: 'Mantos de guardiões da justiça em azul nobre e ouro.' },
      { sectorNumber: 4, title: 'O Tamborim que Desliga os Robôs e Acende o Povo', description: 'O instante em que a batucada cala os circuitos e triunfa o amor.', costume: 'Fantasias com tamborins dourados brilhando no peito dos foliões.' },
      { sectorNumber: 4, title: 'A Eternidade da Emoção: A Alma do Samba É Imortal', description: 'A certeza de que nenhuma máquina poderá substituir o calor humano.', costume: 'Trajes reluzentes em veludo e cristais celebrando o calor do coração humano.' }
    ]
  },
  astronomia: {
    id: 'astronomia',
    themeKeywords: ['astronomia', 'cosmos', 'galaxias', 'galáxias', 'estrelas', 'big-bang', 'universo', 'telescopio', 'telescópio', 'planetas', 'espaco', 'espaço'],
    sectors: [
      {
        title: 'Setor 1: O Big Bang e o Nascimento da Luz: O Despertar do Universo',
        synopsis: 'A grande explosão primordial de energia, as primeiras partículas e o nascimento do espaço-tempo.'
      },
      {
        title: 'Setor 2: O Sistema Solar e a Sinfonia das Órbitas Planetárias',
        synopsis: 'O balé dos planetas em torno do Sol, os cometas de gelo e os anéis reluzentes de Saturno.'
      },
      {
        title: 'Setor 3: Os Olhos da Humanidade: De Galileu aos Telescópios James Webb',
        synopsis: 'A busca incansável pelos confins do cosmos através de espelhos de berílio e lentes ópticas.'
      },
      {
        title: 'Setor 4: O Pálido Ponto Azul: Somos Poeira de Estrelas na Passarela do Infinito',
        synopsis: 'A reflexão cósmica de Carl Sagan: a Terra como nosso lar sagrado e o samba bailando na imensidão.'
      }
    ],
    comissaoDeFrente: {
      name: 'Comissão de Frente: O Big Bang Primordial e a Dança das Partículas de Luz',
      description: (_school, count) =>
        `Coreografia teatralizada em que ${count} bailarinos vestidos de trevas e energia cósmica convergem para o centro da pista. Em um clarão cenográfico de luz estroboscópica e fogos frios, surge a expansão cósmica com tecidos infláveis gigantes representando galáxias espirais.`,
      costume: (school) =>
        `Tecidos reflexivos pretos com cristais de quartzo simulando estrelas, capas circulares que se abrem como nebulosas e detalhes nas cores ${school.colors.primary}.`
    },
    casal1: {
      name: '1º Casal de MS & PB: A Gravidade e a Estrela Guia: A Dança do Sol e da Lua',
      description: () =>
        'O Mestre-Sala rodopia como a força gravitacional solar, enquanto a Porta-Bandeira baila com a suavidade prateada da Lua, desfraldando o pavilhão como o próprio cosmos.',
      costume: (school) =>
        `Degradê de ouro solar e prata lunar, saia bordada com as doze constelações zodiacais em pedrarias reluzentes e resplendores nas cores ${school.colors.primary}.`
    },
    abreAlas: {
      name: 'Abre-Alas: A Fábrica de Galáxias e o Alvorecer do Espaço-Tempo',
      description: (school) =>
        `Alegoria colossal de 48 metros. Ao centro, um buraco negro cenográfico rodeado por um disco de acreção luminoso em espiral de fibra óptica de 16 metros, sob as asas da ${school.shortName} iluminadas por constelações de LED.`,
      structure: (school) =>
        `Dois chassis com esferas planetárias articuladas, névoa interestelar criogênica e espelhos ópticos nas cores ${school.colors.primary}.`
    },
    tripod1: {
      name: 'Tripé 1: O Pêndulo de Foucault e as Leis da Gravitação',
      description: 'Estrutura móvel com pêndulo oscilante dourado e anéis orbitais giratórios.'
    },
    baianas: {
      name: 'Ala das Baianas: As Mães das Nebulosas e a Poeira Cósmica da Criação',
      description: (count) =>
        `${count} matriarcas rodopiando como nebulosas de Órion e Carina, com saias de cores difusas em púrpura, magenta e azul petróleo.`,
      costume: (school) =>
        `Saias volumosas estampadas com fotografias em alta definição do telescópio espacial, turbantes com cometas de cristal e detalhes nas cores ${school.colors.primary}.`
    },
    bateria: {
      name: 'Bateria: Os Ritmistas Astronautas: A Frequência Sonora dos Pulsares',
      description: (school, count) =>
        `Mestre comanda ${count} ritmistas com paradinhas de andamento cósmico e repiques rápidos como pulsares de nêutrons, transformando a Sapucaí em um observatório de som.`,
      costume: (school) =>
        `Trajes estilizados de astronauta em branco fosco e prata, com capacetes translúcidos iluminados e insígnias nas cores ${school.colors.primary}.`
    },
    passistas: {
      name: 'Ala dos Passistas: O Frenezô das Chuvas de Meteoros',
      description: 'Passistas evoluindo com passos ultrarrápidos e capas de caudas de cometa.',
      costume: (school) => `Costumes dourados reluzentes com franjas que deixam rastros luminosos na pista.`
    },
    casal2: {
      name: '2º Casal de MS & PB: As Auroras Boreais e o Campo Magnético',
      description: 'Condução harmônica do segundo pavilhão com véus esmeralda e violeta.',
      costume: (school) => `Trajes em verde e violeta furta-cor com plumas cintilantes.`
    },
    tripod2: {
      name: 'Tripé 2: Os Olhos de Galileu e o Telescópio James Webb',
      description: 'Escultura dos hexágonos dourados de berílio do telescópio espacial.'
    },
    floats: [
      {
        floatNumber: 2,
        name: 'Carro 2: O Carrossel dos Planetas e a Majestade de Saturno',
        description: 'Monumental orquestra planetária com Saturno e seus anéis de gelo girando sobre a passarela.'
      },
      {
        floatNumber: 3,
        name: 'Carro 3: As Viagens Interestelares e a Sonda Voyager',
        description: 'A odisseia das sondas espaciais carregando o disco de ouro com a música e as saudações da Terra.'
      },
      {
        floatNumber: 4,
        name: 'Carro 4: O Pálido Ponto Azul: A Terra no Coração do Infinito',
        description: 'Megaescultura do planeta Terra flutuando como uma joia azul no vácuo escuro do cosmos.'
      }
    ],
    velhaGuarda: {
      name: 'Velha Guarda: Os Astrônomos Imortais e os Sábios do Firmamento',
      description: (school) => `Os mestres da ${school.shortName} desfilando com ternos de gala azul marinho e broches estelares.`,
      costume: (school) => `Ternos clássicos azuis escuros com gravatas prateadas e medalhas astronômicas.`
    },
    apoteose: {
      name: (_school, floatNum) => `Carro ${floatNum}: A Sinfonia das Galáxias: O Samba Brilha no Universo`,
      description: (school) =>
        `Monumental cortejo das estrelas eternas coroando a escola de samba como embaixadora da beleza e da poesia cósmica na Sapucaí.`
    },
    alas: [
      { sectorNumber: 1, title: 'O Vácuo Quântico e a Centelha Primordial', description: 'O instante zero que precedeu todo o espaço e o tempo.', costume: 'Fantasias pretas com espelhos de cristal reluzentes.' },
      { sectorNumber: 1, title: 'A Radiação Cósmica de Fundo e os Primeiros Fótons', description: 'O eco luminoso que viaja desde o início da criação.', costume: 'Túnicas douradas translúcidas com fitas de luz âmbar.' },
      { sectorNumber: 1, title: 'O Nascimento dos Primeiros Átomos de Hidrogênio', description: 'A matéria primordial que formou todas as estrelas.', costume: 'Fantasias azuis com esferas atômicas orbitais.' },
      { sectorNumber: 1, title: 'As Primeiras Estrelas e o Fim da Idade das Trevas', description: 'A luz rompendo a escuridão do universo nascente.', costume: 'Resplendores brancos brilhantes com plumas reluzentes.' },
      { sectorNumber: 1, title: 'A Formação das Galáxias Espirais', description: 'Brazos luminosos girando em harmonia gravitacional.', costume: 'Capas espirais em violeta, azul e prata cintilante.' },
      { sectorNumber: 2, title: 'O Sol: O Astro Rei e a Fonte de Toda a Vida', description: 'A fornalha nuclear benevolente que aquece a Terra.', costume: 'Fantasias douradas com raios de sol em lâminas de acetato.' },
      { sectorNumber: 2, title: 'Mercúrio e Vênus: Os Vizinhos Incandescentes', description: 'O calor extremo e as nuvens misteriosas de ácido e fogo.', costume: 'Fantasias em tons ocre e cobre metálico.' },
      { sectorNumber: 2, title: 'Marte: O Planeta Vermelho e os Sonhos de Exploração', description: 'As areias ferruginosas e os vulcões gigantescos.', costume: 'Fantasias em terracota e vermelho rubro com capacetes de exploração.' },
      { sectorNumber: 2, title: 'Júpiter: O Gigante Gasoso e a Grande Mancha Vermelha', description: 'O escudo planetário que protege a Terra de cometas.', costume: 'Saias em faixas concêntricas de tons marrom, laranja e creme.' },
      { sectorNumber: 2, title: 'Saturno e os Anéis Majestosos de Gelo e Rocha', description: 'A joia do Sistema Solar rodopiando com elegância.', costume: 'Grandes aros dorsais em prata translúcida com cristais de gelo cênico.' },
      { sectorNumber: 3, title: 'Os Primeiros Telescópios de Galileu Galilei', description: 'A coragem de apontar as lentes para o céu e descobrir a verdade.', costume: 'Trajes renascentistas com réplicas de lunetas de latão nas mãos.' },
      { sectorNumber: 3, title: 'O Telescópio Espacial Hubble e as Imagens que Chocaram o Mundo', description: 'A janela límpida no espaço que revelou a imensidão do cosmos.', costume: 'Fantasias com painéis solares prateados e lentes espelhadas.' },
      { sectorNumber: 3, title: 'O Observatório James Webb e os Hexágonos Dourados de Berílio', description: 'O olhar infravermelho desvendando as primeiras galáxias.', costume: 'Costados dorsais com espelhos hexagonais dourados articulados.' },
      { sectorNumber: 3, title: 'Os Buracos Negros e o Horizonte de Eventos', description: 'O mistério da gravidade infinita onde o tempo congela.', costume: 'Fantasias escuras com discos luminosos de acreção em degradê néon.' },
      { sectorNumber: 3, title: 'As Ondas Gravitacionais: O Tecido do Espaço Tremendo', description: 'A comprovação da teoria de Einstein na colisão de estrelas.', costume: 'Fantasias com tecidos ondulantes em relevo cinza e prata.' },
      { sectorNumber: 4, title: 'A Dança das Estrelas Cadentes e a Magia dos Desejos', description: 'O rastro luminoso de poeira cósmica que encanta quem olha para o céu.', costume: 'Fantasias prateadas com franjas reluzentes e estrelas cadentes.' },
      { sectorNumber: 4, title: 'Os Astronautas e a Conquista da Lua em 1969', description: 'Um pequeno passo para o homem, um salto gigante para a humanidade.', costume: 'Trajes brancos lunares estilizados com bandeiras da paz.' },
      { sectorNumber: 4, title: 'A Mensagem da Voyager: A Saudação da Terra ao Infinito', description: 'O disco de ouro com saudações e músicas da humanidade viajando pelo cosmos.', costume: 'Fantasias com discos de ouro reluzentes no peito e notas musicais.' },
      { sectorNumber: 4, title: 'O Pálido Ponto Azul: A Casa Comum da Humanidade', description: 'A lição de fraternidade: na imensidão cósmica, só temos uns aos outros.', costume: 'Fantasias azuis brilhantes com esferas terrestres iluminadas nas mãos.' },
      { sectorNumber: 4, title: 'A Sinfonia Estelar: O Samba Eternizado nas Constelações', description: 'O Carnaval como a maior celebração da vida em todo o universo.', costume: 'Indumentária de gala celestial em prata, ouro e luz estroboscópica.' }
    ]
  }
};


