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
  if (raw.includes('sereno')) return 'sereno_campo_grande';
  if (raw.includes('leão da zona oeste') || raw.includes('leao da zona oeste')) return 'leao_zona_oeste';
  if (raw.includes('casa de malandro')) return 'casa_de_malandro';
  if (raw.includes('curicica')) return 'curicica';
  if (raw.includes('engenho da rainha')) return 'engenho_da_rainha';
  if (raw.includes('unidos de lucas') || raw.includes('lucas')) return 'unidos_de_lucas';
  if (raw.includes('olaria')) return 'independentes_olaria';
  if (raw.includes('arrastão') || raw.includes('arrastao')) return 'arrastao_cascadura';
  return (schoolId || '').toLowerCase().trim();
}

/**
 * Retorna o enredo oficial original de 2026 para uma agremiação
 */
export function getCanonical2026Enredo(schoolId?: string, schoolName?: string): CanonicalEnredoInfo | undefined {
  const normId = normalizeCanonicalSchoolId(schoolId, schoolName);
  return CANONICAL_2026_ENREDOS[normId];
}
