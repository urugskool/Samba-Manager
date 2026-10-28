/**
 * REGISTRO CANÔNICO E AUTORITATIVO DE ENREDOS
 * 
 * Este arquivo é a fonte única da verdade para os títulos e dados oficiais dos enredos
 * do Carnaval Carioca, garantindo que todas as telas, tabelas, fichas e simulações
 * utilizem sempre os enredos originais corretos sem divergências.
 */

export interface CanonicalEnredoInfo {
  schoolId: string;
  title: string;
  themeType?: string;
  synopsis?: string;
}

export const CANONICAL_2026_ENREDOS: Record<string, CanonicalEnredoInfo> = {
  // GRUPO ESPECIAL (2026)
  viradouro: {
    schoolId: 'viradouro',
    title: 'Pra cima, Ciça!',
    themeType: 'Homenagem',
    synopsis: 'Homenagem ao lendário Mestre Ciça e à cadência histórica da Bateria Furiosa da Viradouro.'
  },
  beija_flor: {
    schoolId: 'beija_flor',
    title: 'Bembé',
    themeType: 'Afro-Brasileiro',
    synopsis: 'A centenária festa do Bembé do Mercado em Santo Amaro da Purificação e a ancestralidade negra.'
  },
  vila_isabel: {
    schoolId: 'vila_isabel',
    title: 'Macumbembê, Samborembá - Sonhei que um sambista sonhou a África',
    themeType: 'Afro-Brasileiro',
    synopsis: 'A viagem mística pelos caminhos do sonho onde um sambista revive as raízes africanas do Rio.'
  },
  salgueiro: {
    schoolId: 'salgueiro',
    title: 'A Delirante Jornada Carnavalesca da Professora que não tinha medo de Bruxa, de Bacalhau e nem do Pirata da Perna-de-Pau',
    themeType: 'Lúdico & Homenagem',
    synopsis: 'A genialidade lúdica e irreverente da professora e carnavalesca Rosa Magalhães no Carnaval.'
  },
  imperatriz: {
    schoolId: 'imperatriz',
    title: 'Camaleônico',
    themeType: 'Cultural & Artístico',
    synopsis: 'A capacidade humana e artística de se metamorfosear através das cores, formas e fantasias.'
  },
  mangueira: {
    schoolId: 'mangueira',
    title: 'Mestre Sacaca do Encanto Tucuju - O Guardião da Amazônia Negra',
    themeType: 'Cultural & Histórico',
    synopsis: 'A sabedoria dos remédios da floresta, a cultura amapaense e o legado do curandeiro Mestre Sacaca.'
  },
  tijuca: {
    schoolId: 'tijuca',
    title: 'Carolina Maria de Jesus',
    themeType: 'Histórico & Social',
    synopsis: 'A vida, os versos e a luta inquebrantável da escritora de Quarto de Despejo na literatura brasileira.'
  },
  grande_rio: {
    schoolId: 'grande_rio',
    title: 'A Nação do Mangue',
    themeType: 'Cultural & Musical',
    synopsis: 'O movimento manguebeat, Chico Science, a lama fértil dos caranguejos com cérebro e a música do Brasil.'
  },
  tuiuti: {
    schoolId: 'tuiuti',
    title: 'Lonã Ifá Lukumi',
    themeType: 'Afro-Brasileiro',
    synopsis: 'Os oráculos sagrados de Ifá, as tradições lukumí e os caminhos espirituais abertos pelo axé.'
  },
  portela: {
    schoolId: 'portela',
    title: 'O Mistério do Príncipe do Bará - A Oração do Negrinho e a Ressurreição de Sua Coroa sob o Céu Aberto do Rio Grande',
    themeType: 'Religioso / Afro',
    synopsis: 'A figura do Príncipe Custódio, o orixá Bará e as profundas raízes negras e religiosas do Rio Grande do Sul.'
  },
  mocidade: {
    schoolId: 'mocidade',
    title: 'Rita Lee, a Padroeira da Liberdade',
    themeType: 'Homenagem',
    synopsis: 'A irreverência, a vanguarda e o hino à liberdade deixados pela eterna rainha do rock brasileiro.'
  },
  niteroi: {
    schoolId: 'niteroi',
    title: 'Do alto do Mulungu surge a esperança: Lula, o operário do Brasil',
    themeType: 'Histórico',
    synopsis: 'A trajetória de superação do retirante nordestino operário que chegou à presidência da República.'
  },
  marica: {
    schoolId: 'marica',
    title: 'Berenguendéns & Balangandãs',
    themeType: 'Cultural & Afro-Brasileiro',
    synopsis: 'Berenguendéns & Balangandãs: Os amuletos, o brilho, a ancestralidade e a história viva da cultura afro-brasileira.'
  },

  // SÉRIE OURO (2026)
  imperio_serrano: {
    schoolId: 'imperio_serrano',
    title: 'Ponciá Evaristo, Flor do Mulungu',
    themeType: 'Homenagem & Literatura',
    synopsis: 'Homenagem à escritora Conceição Evaristo e sua marcante escrevivência, da favela ao reconhecimento internacional.'
  },
  unidos_padre_miguel: {
    schoolId: 'unidos_padre_miguel',
    title: 'Kunhã-Eté: O Sopro Sagrado da Jurema',
    themeType: 'Indígena & Religioso',
    synopsis: 'A força da mulher indígena, as rezadeiras da Jurema Sagrada e o sopro ancestral da cura e da floresta.'
  },
  uniao_da_ilha: {
    schoolId: 'uniao_da_ilha',
    title: 'Viva o hoje! O amanhã? Fica pra Depois',
    themeType: 'Cultural & Filosófico',
    synopsis: 'A celebração do momento presente, a alegria do viver carioca e a leveza insulana na Sapucaí.'
  },
  em_cima_da_hora: {
    schoolId: 'em_cima_da_hora',
    title: 'Salve Todas as Marias – Laroyê, Pombagiras!',
    themeType: 'Afro-Brasileiro & Religioso',
    synopsis: 'Homenagem e exaltação à força das Marias e Pombagiras na sabedoria da umbanda e da espiritualidade popular.'
  },
  estacio_de_sa: {
    schoolId: 'estacio_de_sa',
    title: 'Tata Tancredo - O Papa Negro no Terreiro do Estácio',
    themeType: 'Histórico & Religioso',
    synopsis: 'A biografia de Tancredo da Silva Pinto, o Tata Tancredo, grande baluarte da umbanda e da tradição do Morro de São Carlos.'
  },
  porto_da_pedra: {
    schoolId: 'porto_da_pedra',
    title: 'Das Mais Antigas da Vida, o Doce e Amargo Beijo da Noite',
    themeType: 'Cultural & Boêmio',
    synopsis: 'A sedução da boêmia, os encantos da madrugada, suas dores e poesias imortalizadas nas esquinas e no samba.'
  },
  parque_acari: {
    schoolId: 'parque_acari',
    title: 'Brasiliana',
    themeType: 'Cultural & Histórico',
    synopsis: 'Um mosaico visual e poético dos encantos, manifestações artísticas e raízes plurais que tecem o Brasil.'
  },
  botafogo_samba_clube: {
    schoolId: 'botafogo_samba_clube',
    title: 'O Brasil que Floresce em Arte',
    themeType: 'Cultural & Artístico',
    synopsis: 'As grandes expressões da arte brasileira, da pintura à música e poesia, celebrando o talento genuíno do povo.'
  },
  vigario_geral: {
    schoolId: 'vigario_geral',
    title: 'Brasil Incógnito - O Que Os Seus Olhos Não Veem, A Minha Imaginação Reinventa',
    themeType: 'Lúdico & Cultural',
    synopsis: 'Os recantos misteriosos e fascinantes do Brasil profundo, reinventados pelo imaginário fantástico de passarela.'
  },
  unidos_da_ponte: {
    schoolId: 'unidos_da_ponte',
    title: 'Tamborzão – O Rio é Baile! O Poder é Black!',
    themeType: 'Musical & Cultural',
    synopsis: 'A potência sonora do tamborzão, a cultura dos bailes charme e funk cariocas e a afirmação do orgulho negro.'
  },
  unidos_de_bangu: {
    schoolId: 'unidos_de_bangu',
    title: 'As Coisas que Mamãe me Ensinou',
    themeType: 'Afetivo & Cultural',
    synopsis: 'A sabedoria matriarcal, os conselhos de mãe, as receitas e os valores transmitidos de geração em geração.'
  },
  arranco: {
    schoolId: 'arranco',
    title: 'A Gargalhada é o Xamego da Vida',
    themeType: 'Lúdico & Cultural',
    synopsis: 'A gargalhada que cura e resiste, o humor brasileiro e a alegria contagiante do samba que desafia a tristeza.'
  },
  inocentes: {
    schoolId: 'inocentes',
    title: 'O Sonho de um Tal Pagode Russo nos Frevos do meu Pernambuco',
    themeType: 'Musical & Homenagem',
    synopsis: 'O encontro do frevo pernambucano com o forró e a genialidade irreverente de Luiz Gonzaga no Carnaval.'
  },
  jacarezinho: {
    schoolId: 'jacarezinho',
    title: 'O ar que se respira agora inspira novos tempos',
    themeType: 'Social & Poético',
    synopsis: 'O recomeço, a esperança, os novos ares de renovação e a força da comunidade do Jacarezinho de cabeça erguida.'
  },
  sao_clemente: {
    schoolId: 'sao_clemente',
    title: 'Quem Avisa Amigo É',
    themeType: 'Crítica Social',
    synopsis: 'A marca registrada da irreverência clementiana em sátira refinada às loucuras do cotidiano brasileiro.'
  },

  // DEMAIS AGREMIAÇÕES TRADICIONAIS
  caprichosos_de_pilares: {
    schoolId: 'caprichosos_de_pilares',
    title: 'Caprichando no Samba',
    themeType: 'Tradicional',
    synopsis: 'A irreverência histórica do bairro de Pilares, o trem da Central e a garra caprichosa no Carnaval.'
  },
  tradicao: {
    schoolId: 'tradicao',
    title: 'Tradição É Tradição',
    themeType: 'Tradicional',
    synopsis: 'O legado do Condor de Campinho na evolução do samba carioca.'
  },
  cubango: {
    schoolId: 'cubango',
    title: 'No Rastro da Onça',
    themeType: 'Ambiental & Folclórico',
    synopsis: 'A defesa do bioma pantaneiro e a força sagrada do maior felino das Américas.'
  },
  rocinha: {
    schoolId: 'rocinha',
    title: 'A Rocinha É Nossa Casa',
    themeType: 'Comunitário',
    synopsis: 'A potência artística, comunitária e cultural da maior favela da América Latina.'
  },
  lins_imperial: {
    schoolId: 'lins_imperial',
    title: 'Mazzaropi, o Poeta Caipira',
    themeType: 'Homenagem',
    synopsis: 'A simplicidade e sabedoria cômica do ícone do cinema nacional Amácio Mazzaropi.'
  },
  sereno_campo_grande: {
    schoolId: 'sereno_campo_grande',
    title: 'O Sertão de Suassuna',
    themeType: 'Cultural',
    synopsis: 'O Movimento Armorial e o auto teatral encantado de Ariano Suassuna.'
  },
  leao_zona_oeste: {
    schoolId: 'leao_zona_oeste',
    title: 'A Dança dos Quatro Cantos',
    themeType: 'Cultural',
    synopsis: 'A fusão dos ritmos do folclore regional brasileiro.'
  },
  casa_de_malandro: {
    schoolId: 'casa_de_malandro',
    title: 'No Compasso da Boêmia',
    themeType: 'Tradicional',
    synopsis: 'A Lapa dos malandros de chapéu de palha, ternos de linho e navalha no bolso.'
  }
};

/**
 * Normaliza qualquer ID ou nome de agremiação para a chave canônica correspondente
 */
export function normalizeCanonicalSchoolId(schoolId?: string, schoolName?: string): string {
  const raw = `${schoolId || ''} ${schoolName || ''}`.toLowerCase().trim();
  if (raw.includes('viradouro')) return 'viradouro';
  if (raw.includes('beija-flor') || raw.includes('beija flor') || raw.includes('nilopolis')) return 'beija_flor';
  if (raw.includes('vila isabel')) return 'vila_isabel';
  if (raw.includes('salgueiro')) return 'salgueiro';
  if (raw.includes('imperatriz')) return 'imperatriz';
  if (raw.includes('mangueira')) return 'mangueira';
  if (raw.includes('império da tijuca') || raw.includes('imperio da tijuca') || raw.includes('imperio_da_tijuca')) return 'imperio_da_tijuca';
  if (raw.includes('tijuca') && !raw.includes('império da tijuca') && !raw.includes('imperio da tijuca') && !raw.includes('barra')) return 'tijuca';
  if (raw.includes('grande rio')) return 'grande_rio';
  if (raw.includes('tuiuti')) return 'tuiuti';
  if (raw.includes('portela')) return 'portela';
  if (raw.includes('mocidade') && !raw.includes('santa marta') && !raw.includes('vicente')) return 'mocidade';
  if (raw.includes('niterói') || raw.includes('niteroi')) return 'niteroi';
  if (raw.includes('maricá') || raw.includes('marica')) return 'marica';
  if (raw.includes('imperio serrano') || raw.includes('império serrano') || raw.includes('serrano')) return 'imperio_serrano';
  if (raw.includes('padre miguel') && !raw.includes('mocidade')) return 'unidos_padre_miguel';
  if (raw === 'upm' || raw.includes('padre_miguel')) return 'unidos_padre_miguel';
  if (raw.includes('porto da pedra') || raw.includes('pedra')) return 'porto_da_pedra';
  if (raw.includes('ilha do governador') || raw.includes('uniao da ilha') || raw.includes('união da ilha')) return 'uniao_da_ilha';
  if (raw.includes('estácio') || raw.includes('estacio') || raw.includes('são carlos')) return 'estacio_de_sa';
  if (raw.includes('em cima da hora') || raw.includes('cima da hora')) return 'em_cima_da_hora';
  if (raw.includes('unidos da ponte') || raw.includes('ponte')) return 'unidos_da_ponte';
  if (raw.includes('bangu')) return 'unidos_de_bangu';
  if (raw.includes('arranco')) return 'arranco';
  if (raw.includes('botafogo')) return 'botafogo_samba_clube';
  if (raw.includes('acari')) return 'parque_acari';
  if (raw.includes('inocentes') || raw.includes('belford')) return 'inocentes';
  if (raw.includes('santa cruz')) return 'santa_cruz';
  if (raw.includes('vigário') || raw.includes('vigario')) return 'vigario_geral';
  if (raw.includes('jacarezinho')) return 'jacarezinho';
  if (raw.includes('clemente')) return 'sao_clemente';
  if (raw.includes('caprichosos')) return 'caprichosos_de_pilares';
  if (raw.includes('tradição') || raw.includes('tradicao')) return 'tradicao';
  if (raw.includes('cubango')) return 'cubango';
  if (raw.includes('rocinha')) return 'rocinha';
  if (raw.includes('lins imperial') || raw.includes('lins')) return 'lins_imperial';
  if (raw.includes('sossego')) return 'academicos_do_sossego';
  if (raw.includes('sereno')) return 'sereno_campo_grande';
  if (raw.includes('leão da zona oeste') || raw.includes('leao da zona oeste')) return 'leao_zona_oeste';
  if (raw.includes('casa de malandro')) return 'casa_de_malandro';
  if (raw.includes('curicica')) return 'curicica';
  if (raw.includes('engenho da rainha')) return 'engenho_da_rainha';
  if (raw.includes('unidos de lucas') || raw.includes('lucas')) return 'unidos_de_lucas';
  if (raw.includes('olaria')) return 'independentes_olaria';
  if (raw.includes('arrastão') || raw.includes('arrastao')) return 'arrastao_cascadura';
  if (raw.includes('união de jacarepaguá') || raw.includes('uniao de jacarepagua') || raw.includes('jacarepaguá') || raw.includes('jacarepagua')) return 'uniao_de_jacarepagua';
  return (schoolId || '').toLowerCase().trim();
}

/**
 * Retorna o enredo oficial original de 2026 para uma agremiação
 */
export function getCanonical2026Enredo(schoolId?: string, schoolName?: string): CanonicalEnredoInfo | undefined {
  const normId = normalizeCanonicalSchoolId(schoolId, schoolName);
  return CANONICAL_2026_ENREDOS[normId];
}

export const CANONICAL_2024_ENREDOS: Record<string, CanonicalEnredoInfo> = {
  viradouro: {
    schoolId: 'viradouro',
    title: 'Arroboboi, Dangbé',
    themeType: 'Afro-Brasileiro'
  },
  imperatriz: {
    schoolId: 'imperatriz',
    title: 'Com a sorte virada pra lua segundo o testamento da cigana Esmeralda',
    themeType: 'Cultural'
  },
  grande_rio: {
    schoolId: 'grande_rio',
    title: 'Nosso destino é ser onça!',
    themeType: 'Mítico & Indígena'
  },
  salgueiro: {
    schoolId: 'salgueiro',
    title: 'Hutukara',
    themeType: 'Indígena & Crítica Social'
  },
  portela: {
    schoolId: 'portela',
    title: 'Um defeito de cor',
    themeType: 'Histórico & Literatura'
  },
  vila_isabel: {
    schoolId: 'vila_isabel',
    title: 'Gbalá - Viagem ao templo da criação!',
    themeType: 'Afro-Brasileiro'
  },
  mangueira: {
    schoolId: 'mangueira',
    title: 'A Negra Voz do Amanhã',
    themeType: 'Homenagem'
  },
  beija_flor: {
    schoolId: 'beija_flor',
    title: 'Um delírio de Carnaval na Maceió de Rás Gonguila',
    themeType: 'Cultural'
  },
  tuiuti: {
    schoolId: 'tuiuti',
    title: 'Glória ao Almirante Negro',
    themeType: 'Histórico & Crítica Social'
  },
  mocidade: {
    schoolId: 'mocidade',
    title: 'Pede caju que dou... Pé de caju que dá!',
    themeType: 'Cultural & Lúdico'
  },
  tijuca: {
    schoolId: 'tijuca',
    title: 'O conto de fados',
    themeType: 'Histórico & Cultural'
  },
  porto_da_pedra: {
    schoolId: 'porto_da_pedra',
    title: 'Lunário Perpétuo: A profética do saber popular',
    themeType: 'Cultural'
  },
  // SÉRIE OURO 2024
  unidos_padre_miguel: {
    schoolId: 'unidos_padre_miguel',
    title: 'O Redentor do Sertão',
    themeType: 'Regional & Religioso'
  },
  imperio_serrano: {
    schoolId: 'imperio_serrano',
    title: 'Ilú-ọba Ọ̀yọ́: a gira dos ancestrais',
    themeType: 'Afro-Brasileiro'
  },
  estacio_de_sa: {
    schoolId: 'estacio_de_sa',
    title: 'Chão de devoção: orgulho ancestral',
    themeType: 'Afro-Brasileiro'
  },
  marica: {
    schoolId: 'marica',
    title: 'O esperançar do poeta',
    themeType: 'Homenagem & Poesia'
  },
  sao_clemente: {
    schoolId: 'sao_clemente',
    title: 'Que grande destino reservam pra você!',
    themeType: 'Homenagem'
  },
  inocentes: {
    schoolId: 'inocentes',
    title: 'Debret pintou, camelô gritou: compre 2 leve 3! Tudo para agradar o freguês!',
    themeType: 'Cultural & Crítica Social'
  },
  uniao_da_ilha: {
    schoolId: 'uniao_da_ilha',
    title: 'Doum e Amora: crianças para transformar o mundo!',
    themeType: 'Lúdico & Social'
  },
  niteroi: {
    schoolId: 'niteroi',
    title: 'Catopês – Um céu de fitas',
    themeType: 'Folclore & Regional'
  },
  vigario_geral: {
    schoolId: 'vigario_geral',
    title: 'Maracanaú: Bem-vindos ao maior São João do Planeta!',
    themeType: 'Regional'
  },
  unidos_de_bangu: {
    schoolId: 'unidos_de_bangu',
    title: 'Jorge da Capadócia',
    themeType: 'Religioso & Mítico'
  },
  unidos_da_ponte: {
    schoolId: 'unidos_da_ponte',
    title: 'Tendendém - O axé do epô pupá',
    themeType: 'Afro-Brasileiro'
  },
  em_cima_da_hora: {
    schoolId: 'em_cima_da_hora',
    title: 'A nossa luta continua',
    themeType: 'Crítica Social'
  },
  parque_acari: {
    schoolId: 'parque_acari',
    title: 'Ilê Aiyê, 50 anos de luta e de resistência',
    themeType: 'Afro-Brasileiro'
  },
  arranco: {
    schoolId: 'arranco',
    title: 'Nise - Reimaginação da Loucura',
    themeType: 'Homenagem & Ciência'
  },
  imperio_da_tijuca: {
    schoolId: 'imperio_da_tijuca',
    title: 'Sou Lia de Itamaracá cirandando a vida na beira do mar',
    themeType: 'Homenagem & Folclore'
  },
  sereno_campo_grande: {
    schoolId: 'sereno_campo_grande',
    title: '4 de dezembro',
    themeType: 'Religioso'
  }
};

/**
 * Retorna o enredo oficial original de 2024 para uma agremiação
 */
export function getCanonical2024Enredo(schoolId?: string, schoolName?: string): CanonicalEnredoInfo | undefined {
  const normId = normalizeCanonicalSchoolId(schoolId, schoolName);
  return CANONICAL_2024_ENREDOS[normId];
}

export const CANONICAL_2023_ENREDOS: Record<string, CanonicalEnredoInfo> = {
  // GRUPO ESPECIAL 2023
  imperatriz: {
    schoolId: 'imperatriz',
    title: 'O Aperreio do Cabra que o Excomungado Tratou com Má-Querença e o Santíssimo não Deu Guarida',
    themeType: 'Regional & Cordel'
  },
  viradouro: {
    schoolId: 'viradouro',
    title: 'Rosa Maria Egipcíaca',
    themeType: 'Histórico & Religioso'
  },
  vila_isabel: {
    schoolId: 'vila_isabel',
    title: 'Nessa Festa, Eu Levo Fé!',
    themeType: 'Cultural & Religioso'
  },
  beija_flor: {
    schoolId: 'beija_flor',
    title: 'Brava Gente! O Grito dos Excluídos no Bicentenário da Independência',
    themeType: 'Histórico & Crítica Social'
  },
  mangueira: {
    schoolId: 'mangueira',
    title: 'As Áfricas que a Bahia Canta',
    themeType: 'Afro-Brasileiro'
  },
  grande_rio: {
    schoolId: 'grande_rio',
    title: 'Ô Zeca, o Pagode Onde É que É? Andei Descalço, Carroça e Trem, Procurando por Xerém, Pra Te Ver, Pra Te Abraçar, Pra Beber e Batucar!',
    themeType: 'Homenagem & Música'
  },
  salgueiro: {
    schoolId: 'salgueiro',
    title: 'Delírios de Um Paraíso Vermelho',
    themeType: 'Cultural & Crítica Social'
  },
  tuiuti: {
    schoolId: 'tuiuti',
    title: 'Mogangueiro da Cara Preta',
    themeType: 'Regional & Folclore'
  },
  tijuca: {
    schoolId: 'tijuca',
    title: 'É Onda Que Vai... É Onda que Vem... Serei a Baía de Todos os Santos a Se Mirar no Samba da Minha Terra',
    themeType: 'Regional & Cultural'
  },
  portela: {
    schoolId: 'portela',
    title: 'O Azul que Vem do Infinito',
    themeType: 'Histórico & Centenário'
  },
  mocidade: {
    schoolId: 'mocidade',
    title: 'Terra de Meu Céu, Estrelas de Meu Chão',
    themeType: 'Regional & Artesanato'
  },
  imperio_serrano: {
    schoolId: 'imperio_serrano',
    title: 'Lugares de Arlindo',
    themeType: 'Homenagem & Samba'
  },

  // SÉRIE OURO 2023
  porto_da_pedra: {
    schoolId: 'porto_da_pedra',
    title: 'A Invenção da Amazônia',
    themeType: 'Regional & Cultural'
  },
  unidos_padre_miguel: {
    schoolId: 'unidos_padre_miguel',
    title: 'Baião de Mouros',
    themeType: 'Regional & Histórico'
  },
  inocentes: {
    schoolId: 'inocentes',
    title: 'Mulheres de Barro',
    themeType: 'Regional & Artesanato'
  },
  imperio_da_tijuca: {
    schoolId: 'imperio_da_tijuca',
    title: 'Cores do Axé',
    themeType: 'Afro-Brasileiro'
  },
  niteroi: {
    schoolId: 'niteroi',
    title: 'O Carnaval da Vitória',
    themeType: 'Histórico & Cultural'
  },
  uniao_da_ilha: {
    schoolId: 'uniao_da_ilha',
    title: 'O Encontro das Águias no Templo de Momo',
    themeType: 'Homenagem & Centenário'
  },
  sao_clemente: {
    schoolId: 'sao_clemente',
    title: 'O Achamento do Velho Mundo',
    themeType: 'Crítica Social & Irreverência'
  },
  estacio_de_sa: {
    schoolId: 'estacio_de_sa',
    title: 'São João, São Luís, Maranhão! Acende a Fogueira do Meu Coração!',
    themeType: 'Regional & Folclore'
  },
  unidos_de_bangu: {
    schoolId: 'unidos_de_bangu',
    title: 'Aganjú - A Visão do Fogo, A Voz do Trovão no Reino de Oyó',
    themeType: 'Afro-Brasileiro'
  },
  vigario_geral: {
    schoolId: 'vigario_geral',
    title: 'A Fantástica Fábrica da Alegria',
    themeType: 'Lúdico'
  },
  unidos_da_ponte: {
    schoolId: 'unidos_da_ponte',
    title: 'Liberte Nosso Sagrado: O Legado Ancestral de Mãe Meninazinha de Oxum',
    themeType: 'Afro-Brasileiro'
  },
  arranco: {
    schoolId: 'arranco',
    title: 'Zé Espinguela - Chão do Meu Terreiro',
    themeType: 'Histórico & Samba'
  },
  em_cima_da_hora: {
    schoolId: 'em_cima_da_hora',
    title: 'Esperança, Presente!',
    themeType: 'Crítica Social'
  },
  lins_imperial: {
    schoolId: 'lins_imperial',
    title: 'Madame Satã: Resistir Para Existir',
    themeType: 'Histórico & Biográfico'
  },
  uniao_de_jacarepagua: {
    schoolId: 'uniao_de_jacarepagua',
    title: 'Manoel Congo, Mariana Crioula - Heróis da Liberdade no Vale do Café',
    themeType: 'Histórico & Afro-Brasileiro'
  }
};

/**
 * Retorna o enredo oficial original de 2023 para uma agremiação
 */
export function getCanonical2023Enredo(schoolId?: string, schoolName?: string): CanonicalEnredoInfo | undefined {
  const normId = normalizeCanonicalSchoolId(schoolId, schoolName);
  return CANONICAL_2023_ENREDOS[normId];
}

export const CANONICAL_2022_ENREDOS: Record<string, CanonicalEnredoInfo> = {
  // GRUPO ESPECIAL 2022
  grande_rio: {
    schoolId: 'grande_rio',
    title: 'Fala, Majeté! Sete Chaves de Exu',
    themeType: 'Afro-Brasileiro'
  },
  beija_flor: {
    schoolId: 'beija_flor',
    title: 'Empretecer o Pensamento é Ouvir a Voz da Beija-Flor',
    themeType: 'Afro-Brasileiro & Crítica Social'
  },
  viradouro: {
    schoolId: 'viradouro',
    title: 'Não há Tristeza que possa Suportar tanta Alegria',
    themeType: 'Histórico & Carnaval'
  },
  vila_isabel: {
    schoolId: 'vila_isabel',
    title: 'Canta, canta, minha gente! A Vila é de Martinho!',
    themeType: 'Homenagem & Samba'
  },
  portela: {
    schoolId: 'portela',
    title: 'Igi Osè Baobá',
    themeType: 'Afro-Brasileiro & Natureza'
  },
  salgueiro: {
    schoolId: 'salgueiro',
    title: 'Resistência',
    themeType: 'Afro-Brasileiro & Resistência'
  },
  mangueira: {
    schoolId: 'mangueira',
    title: 'Angenor, José & Laurindo',
    themeType: 'Homenagem & Baluartes'
  },
  mocidade: {
    schoolId: 'mocidade',
    title: 'Batuque ao Caçador',
    themeType: 'Afro-Brasileiro & Oxóssi'
  },
  tijuca: {
    schoolId: 'tijuca',
    title: 'Waranã - A Reexistência Vermelha',
    themeType: 'Indígena & Lenda'
  },
  imperatriz: {
    schoolId: 'imperatriz',
    title: 'Meninos, eu vivi... Onde canta o sabiá, onde cantam Dalva e Lamartine',
    themeType: 'Homenagem & Memória'
  },
  tuiuti: {
    schoolId: 'tuiuti',
    title: 'Ka Ríba Tí Ye - Que Nossos Caminhos se Abram',
    themeType: 'Afro-Brasileiro'
  },
  sao_clemente: {
    schoolId: 'sao_clemente',
    title: 'Minha Vida é uma Peça',
    themeType: 'Homenagem'
  },

  // SÉRIE OURO 2022
  imperio_serrano: {
    schoolId: 'imperio_serrano',
    title: 'Mangangá',
    themeType: 'Afro-Brasileiro & Capoeira'
  },
  porto_da_pedra: {
    schoolId: 'porto_da_pedra',
    title: 'O Caçador que traz Alegrias',
    themeType: 'Afro-Brasileiro'
  },
  uniao_da_ilha: {
    schoolId: 'uniao_da_ilha',
    title: 'O Vendedor de Orações',
    themeType: 'Religioso & Homenagem'
  },
  inocentes: {
    schoolId: 'inocentes',
    title: 'A Meia-Noite dos Tambores Silenciosos',
    themeType: 'Afro-Brasileiro & Maracatu'
  },
  unidos_padre_miguel: {
    schoolId: 'unidos_padre_miguel',
    title: 'Iroko - É Tempo de Xirê',
    themeType: 'Afro-Brasileiro'
  },
  academicos_do_sossego: {
    schoolId: 'academicos_do_sossego',
    title: 'Visões Xamânicas',
    themeType: 'Indígena & Espiritual'
  },
  unidos_de_bangu: {
    schoolId: 'unidos_de_bangu',
    title: 'Deu Castor na Cabeça',
    themeType: 'Homenagem & Cultura Popular'
  },
  estacio_de_sa: {
    schoolId: 'estacio_de_sa',
    title: 'Cobra Coral, Papagaio-Vintém. #VESTIRUBRONEGRO não tem pra ninguém',
    themeType: 'Homenagem & Flamengo'
  },
  imperio_da_tijuca: {
    schoolId: 'imperio_da_tijuca',
    title: 'Samba de Quilombo - A Resistência pela Raiz',
    themeType: 'Afro-Brasileiro & Quilombo'
  },
  vigario_geral: {
    schoolId: 'vigario_geral',
    title: 'Pequena África: da Escravidão ao Pertencimento - Camadas de Memórias entre o Mar e o Morro',
    themeType: 'Histórico & Afro-Brasileiro'
  },
  unidos_da_ponte: {
    schoolId: 'unidos_da_ponte',
    title: 'Santa Dulce dos Pobres - O Anjo Bom da Bahia',
    themeType: 'Religioso & Homenagem'
  },
  lins_imperial: {
    schoolId: 'lins_imperial',
    title: 'Mussum Pra Sempris - Traga o Mé que hoje com a Lins vai ter muito samba no pé!',
    themeType: 'Homenagem & Humor'
  },
  em_cima_da_hora: {
    schoolId: 'em_cima_da_hora',
    title: '33 - Destino Dom Pedro II',
    themeType: 'Histórico & Ferrovia'
  },
  santa_cruz: {
    schoolId: 'santa_cruz',
    title: 'Axé! Milton Gonçalves no Catupé da Santa Cruz',
    themeType: 'Homenagem & Afro-Brasileiro'
  },
  cubango: {
    schoolId: 'cubango',
    title: 'O Amor Preto Cura: Chica Xavier, a Mãe Baiana do Brasil',
    themeType: 'Homenagem & Afro-Brasileiro'
  }
};

/**
 * Retorna o enredo oficial original de 2022 para uma agremiação
 */
export function getCanonical2022Enredo(schoolId?: string, schoolName?: string): CanonicalEnredoInfo | undefined {
  const normId = normalizeCanonicalSchoolId(schoolId, schoolName);
  return CANONICAL_2022_ENREDOS[normId];
}



