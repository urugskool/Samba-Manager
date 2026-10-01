import { School, Enredo, EnredoThemeType, DivisionId } from '../types/carnaval';
import { cleanSchoolName } from '../utils/schoolNameUtils';

// Base templates for diverse carnival themes
interface EnredoTemplate {
  title: string;
  themeType: EnredoThemeType;
  synopsis: string;
  qualityBoost: number;
  baseCost: number;
  tags: string[];
}

const AUTHORAL_TEMPLATES: EnredoTemplate[] = [
  // Afro-brasileiro
  {
    title: 'O Canto Sagrado das Águas de Oió: Xangô e Iansã na Coroação da Terra',
    themeType: 'Afro-brasileiro',
    synopsis: 'Uma jornada mística pelos trovões e ventos da ancestralidade iorubá, exaltando a justiça de Xangô e a bravura de Oyá.',
    qualityBoost: 12,
    baseCost: 180000,
    tags: ['orixas', 'ancestral', 'tambor', 'religiosidade']
  },
  {
    title: 'Guerreiras do Daomé: O Exército de Mulheres que Desafiou Impérios',
    themeType: 'Afro-brasileiro',
    synopsis: 'A epopeia das guerreiras Mino do Reino de Daomé e sua força imortal ecoando nas mães e matriarcas das favelas cariocas.',
    qualityBoost: 13,
    baseCost: 200000,
    tags: ['mulheres', 'africa', 'bravura', 'resistencia']
  },
  {
    title: 'Reino de Palmares: O Trono Encantado de Ganga Zumba e Dandara',
    themeType: 'Afro-brasileiro',
    synopsis: 'A celebração do maior quilombo das Américas como um refúgio eterno de liberdade, comunhão e soberania preta.',
    qualityBoost: 11,
    baseCost: 170000,
    tags: ['quilombo', 'liberdade', 'historia', 'ancestralidade']
  },
  {
    title: 'Ogum Beira-Mar: O Forjador de Espadas e o Senhor das Batalhas',
    themeType: 'Afro-brasileiro',
    synopsis: 'O ferro sagrado que rasga caminhos, a proteção das encruzilhadas e a valentia dos guerreiros na poeira da avenida.',
    qualityBoost: 12,
    baseCost: 190000,
    tags: ['orixas', 'ferro', 'valentia', 'caminhos']
  },

  // Histórico
  {
    title: 'A Revolta da Chibata: O Dragão do Mar e a Chama da Dignidade',
    themeType: 'Histórico',
    synopsis: 'João Cândido lidera marinheiros em 1910 contra os castigos corporais, erguendo a bandeira da honra e da justiça nos mares do Rio.',
    qualityBoost: 13,
    baseCost: 190000,
    tags: ['historia', 'marinha', 'luta', 'cidadania']
  },
  {
    title: 'Das Minas Gerais ao Asfalto da Sapucaí: O Ouro Barroco e o Gênio de Aleijadinho',
    themeType: 'Histórico',
    synopsis: 'As pedras-sabão esculpidas em devoção, o contraste da opressão colonial com o esplendor barroco das Gerais.',
    qualityBoost: 10,
    baseCost: 160000,
    tags: ['minas', 'barroco', 'arte', 'escultura']
  },
  {
    title: 'A Noite dos Cristais Quebrados: O Levante dos Caetés e a Defesa da Terra',
    themeType: 'Histórico',
    synopsis: 'A resistência indígena dos povos originários frente às invasões, preservando suas matas sagradas e rituais milenares.',
    qualityBoost: 11,
    baseCost: 165000,
    tags: ['indigenas', 'brasil', 'resistencia', 'terra']
  },
  {
    title: 'Farroupilhas: Os Cavaleiros da Liberdade nos Pampas do Sul',
    themeType: 'Histórico',
    synopsis: 'Os dez anos de epopeia republicana no Rio Grande do Sul, a valentia de Anita e Giuseppe Garibaldi e a bravura dos lanceiros negros.',
    qualityBoost: 10,
    baseCost: 175000,
    tags: ['sul', 'pampas', 'revolucao', 'liberdade']
  },

  // Homenagem
  {
    title: 'A Dama do Samba: Clementina de Jesus e o Eco do Quilombo',
    themeType: 'Homenagem',
    synopsis: 'Homenagem arrebatadora a Quelé, a voz rouca e monumental que brotou do chão do morro para emocionar o planeta.',
    qualityBoost: 14,
    baseCost: 210000,
    tags: ['samba', 'mulheres', 'clementina', 'partido-alto']
  },
  {
    title: 'Rei do Baião: Lua de Todos os Luares na Imensidão do Sertão',
    themeType: 'Homenagem',
    synopsis: 'Tributo apaixonado a Luiz Gonzaga, o sanfoneiro que cantou a seca, a asa branca e a nobreza da alma nordestina.',
    qualityBoost: 12,
    baseCost: 185000,
    tags: ['gonzaga', 'nordeste', 'sanfona', 'baiao']
  },
  {
    title: 'O Mago das Cores: Candido Portinari e a Alma Operária do Brasil',
    themeType: 'Homenagem',
    synopsis: 'Do cafezal de Brodowski aos murais da ONU, as pinceladas que retrataram a dor dos retirantes e o lirismo da infância.',
    qualityBoost: 11,
    baseCost: 170000,
    tags: ['artes', 'pintura', 'brasil', 'portinari']
  },
  {
    title: 'Cartola: As Rosas Não Falam, mas Perfumam a Eternidade da Mangueira',
    themeType: 'Homenagem',
    synopsis: 'A poesia refinada, os amores de Dona Zica, o Zicartola e o verde-e-rosa eternizado no coração do samba carioca.',
    qualityBoost: 15,
    baseCost: 220000,
    tags: ['cartola', 'mangueira', 'poesia', 'classico']
  },

  // Crítica Social
  {
    title: 'A Voz do Povo: O Grito que Rompe o Silêncio dos Becos e Favelas',
    themeType: 'Crítica Social',
    synopsis: 'Manifesto contundente e lírico sobre a sobrevivência diária, o descaso dos poderosos e a potência criativa das comunidades.',
    qualityBoost: 14,
    baseCost: 195000,
    tags: ['favela', 'periferia', 'protesto', 'dignidade']
  },
  {
    title: 'O Prato Vazio e a Mesa Farta: Banquete dos Invisíveis',
    themeType: 'Crítica Social',
    synopsis: 'Uma ópera carnavalesca expondo o desperdício das elites e a força dos trabalhadores que plantam e não colhem.',
    qualityBoost: 13,
    baseCost: 180000,
    tags: ['comida', 'trabalhador', 'desigualdade', 'consciencia']
  },
  {
    title: 'Escola Sem Muro: O Livro, a Caneta e o Sonho que Transforma',
    themeType: 'Crítica Social',
    synopsis: 'A exaltação dos professores e da educação pública como a única revolução capaz de libertar as crianças da opressão.',
    qualityBoost: 12,
    baseCost: 170000,
    tags: ['educacao', 'livros', 'futuro', 'professores']
  },

  // Folclore & Lendas
  {
    title: 'Contos da Floresta: Os Encantos da Mãe Amazônia e os Guardiões da Mata',
    themeType: 'Folclore & Lendas',
    synopsis: 'Curupira, Iara, Mapinguari e o Boi-Bumbá em uma explosão de cores e mistérios no coração da maior floresta do mundo.',
    qualityBoost: 12,
    baseCost: 200000,
    tags: ['amazonia', 'lendas', 'curupira', 'rio']
  },
  {
    title: 'Noite de São João: O Fogo Santo que Alumia as Paixões do Sertão',
    themeType: 'Folclore & Lendas',
    synopsis: 'As fogueiras, as simpatias amorosas, o casamento matuto e a fé sertaneja que faz da noite junina o maior espetáculo da terra.',
    qualityBoost: 11,
    baseCost: 175000,
    tags: ['festa-junina', 'fogueira', 'nordeste', 'alegria']
  },
  {
    title: 'Os Mistérios da Encantaria Maranhense: No Reino do Rei Sebastião',
    themeType: 'Folclore & Lendas',
    synopsis: 'As praias dos Lençóis, o touro negro coroado e as divindades da Mina que bailam nas noites de lua cheia no Maranhão.',
    qualityBoost: 13,
    baseCost: 190000,
    tags: ['maranhao', 'encantaria', 'lendas', 'tambor-de-mina']
  },

  // Cultural & Tradição Popular
  {
    title: 'Sinfonia da Lapa: Malandros, Poetas e Boêmios Debaixo dos Arcos',
    themeType: 'Cultural',
    synopsis: 'O terno de linho branco, a navalha no bolso, o violão de sete cordas e a poesia noturna dos botecos cariocas.',
    qualityBoost: 11,
    baseCost: 160000,
    tags: ['lapa', 'malandragem', 'rio-antigo', 'boemia']
  },
  {
    title: 'Feira de Caruaru: O Museu Vivo da Alma Popular Brasileira',
    themeType: 'Cultural',
    synopsis: 'O barro de Mestre Vitalino, o cordel pendurado no varal, a carne de sol e a poesia repentista do agreste pernambucano.',
    qualityBoost: 12,
    baseCost: 180000,
    tags: ['caruaru', 'barro', 'vitalino', 'cordel']
  },
  {
    title: 'O Circo Chegou! A Magia da Lona que Não Deixa o Sorriso Morrer',
    themeType: 'Cultural',
    synopsis: 'Palhaços, trapezistas e ilusionistas que levam a arte mambembe aos quatro cantos do país mantendo viva a pureza da infância.',
    qualityBoost: 10,
    baseCost: 150000,
    tags: ['circo', 'lona', 'palhaco', 'ilusao']
  },

  // Ambiental & Natureza
  {
    title: 'Pantanal das Águas Claras: O Santuário dos Tuiuiús e das Onças-Pintadas',
    themeType: 'Ambiental & Natureza',
    synopsis: 'O pulsar das cheias e vazantes na maior planície alagável do globo, clamando pelo fim das queimadas e preservação da fauna.',
    qualityBoost: 12,
    baseCost: 195000,
    tags: ['pantanal', 'onca', 'natureza', 'preservacao']
  },
  {
    title: 'Rios Voadores: O Fôlego da Floresta que Abençoa o Solo do Brasil',
    themeType: 'Ambiental & Natureza',
    synopsis: 'A poesia científica da transpiração das copas amazônicas gerando as chuvas sagradas que irrigam os campos e cidades do país.',
    qualityBoost: 13,
    baseCost: 205000,
    tags: ['chuva', 'clima', 'arvores', 'amazonia']
  }
];

// Sponsored enredo proposals with real financial sponsorship contributions!
interface SponsoredProposalTemplate {
  title: string;
  sponsorName: string;
  sponsorType: 'Cidade / Estado' | 'Agronegócio / Indústria' | 'Companhia Aérea / Turismo' | 'Tecnologia / Inovação' | 'Patrimônio Histórico';
  synopsis: string;
  baseSponsorValue: Record<DivisionId, number>; // R$ contribution to school treasury
  qualityBoost: number;
  commercialTradeoff: string;
}

const SPONSORED_PROPOSALS: SponsoredProposalTemplate[] = [
  {
    title: 'O Despertar da Dubai Brasileira: Balneário Camboriú e o Futuro no Horizonte',
    sponsorName: 'Secretaria de Turismo & Consórcio de Balneário Camboriú',
    sponsorType: 'Cidade / Estado',
    synopsis: 'A transformação da orla catarinense em um polo futurista de arranha-céus, marinas suntuosas e turismo internacional de luxo.',
    baseSponsorValue: {
      especial: 7500000,
      ouro: 2800000,
      prata: 1200000,
      bronze: 600000,
      avaliacao: 300000
    },
    qualityBoost: 8,
    commercialTradeoff: 'Alto aporte financeiro para o barracão! Exige grande habilidade plástica do carnavalesco para evitar que os jurados julguem como um mero enredo comercial (CEP).'
  },
  {
    title: 'O Grão Sagrado que Move Nações: A Saga do Café e o Progresso do Brasil',
    sponsorName: 'Associação Brasileira dos Exportadores e Cooperativas de Café',
    sponsorType: 'Agronegócio / Indústria',
    synopsis: 'Das montanhas da Etiópia ao solo vermelho brasileiro: o aroma da bebida mais consumida do mundo e a tecnologia dos campos.',
    baseSponsorValue: {
      especial: 6800000,
      ouro: 2500000,
      prata: 1100000,
      bronze: 550000,
      avaliacao: 280000
    },
    qualityBoost: 9,
    commercialTradeoff: 'Excelente financiamento para alegorias grandiosas. Requer narrativa cultural e poética profunda para garantir notas 10 em Enredo.'
  },
  {
    title: 'Nas Asas da Panair e do Futuro: A Travessia dos Mares e o Sonho do Céu',
    sponsorName: 'Holding de Aviação Comercial & Linhas Aéreas Nacionais',
    sponsorType: 'Companhia Aérea / Turismo',
    synopsis: 'Santos Dumont, as primeiras rotas hidroaviárias da Guanabara e as turbinas que encurtam distâncias entre povos e continentes.',
    baseSponsorValue: {
      especial: 6200000,
      ouro: 2300000,
      prata: 1000000,
      bronze: 500000,
      avaliacao: 250000
    },
    qualityBoost: 9,
    commercialTradeoff: 'Proposta altamente lucrativa. Os jurados exigirão originalidade visual e soluções cenográficas que fujam de clichês corporativos.'
  },
  {
    title: 'Paraty de Sal, Ouro e Poesia: Os Caminhos Coloniais à Beira da Baía',
    sponsorName: 'Prefeitura Municipal e Fundo de Fomento ao Patrimônio Histórico de Paraty',
    sponsorType: 'Patrimônio Histórico',
    synopsis: 'A arquitetura colonial preservada, a cachaça artesanal, os piratas da Baía da Ilha Grande e as noites literárias que encantam o mundo.',
    baseSponsorValue: {
      especial: 5500000,
      ouro: 2100000,
      prata: 900000,
      bronze: 450000,
      avaliacao: 220000
    },
    qualityBoost: 10,
    commercialTradeoff: 'Enredo patrocinado de forte apelo estético! Alia recursos generosos a uma riqueza cultural reconhecida pela UNESCO.'
  },
  {
    title: 'A Revolução da Luz: Da Energia Solar ao Algoritmo das Cidades Inteligentes',
    sponsorName: 'Consórcio de Energia Limpa & Tecnologia Verde',
    sponsorType: 'Tecnologia / Inovação',
    synopsis: 'A transição energética, o sol que ilumina a caatinga gerando riqueza limpa e a fusão entre a natureza e a tecnologia do amanhã.',
    baseSponsorValue: {
      especial: 5800000,
      ouro: 2200000,
      prata: 950000,
      bronze: 480000,
      avaliacao: 240000
    },
    qualityBoost: 8,
    commercialTradeoff: 'Garante orçamento de ponta para iluminação cênica e alegorias eletrônicas. O carnavalesco deve evitar frieza técnica no samba.'
  },
  {
    title: 'O Diamante do Centro-Oeste: Goiânia e as Rotas da Integração Nacional',
    sponsorName: 'Governo do Estado de Goiás & Federação das Indústrias',
    sponsorType: 'Cidade / Estado',
    synopsis: 'O Art Déco do planalto central, o cerrado perfumado pelo pequi, a música sertaneja de raiz e a pujança dos trilhos rumo ao norte.',
    baseSponsorValue: {
      especial: 5200000,
      ouro: 2000000,
      prata: 850000,
      bronze: 420000,
      avaliacao: 200000
    },
    qualityBoost: 9,
    commercialTradeoff: 'Entrada vultosa de verba na conta da agremiação. Permite contratação de grandes figurinistas e materiais nobres.'
  },
  {
    title: 'O Fio do Progresso: A Arte da Seda e a Moda que Conquista as Passarelas',
    sponsorName: 'Sindicato Nacional da Indústria Têxtil e Alta Costura',
    sponsorType: 'Agronegócio / Indústria',
    synopsis: 'Do casulo do bicho-da-seda no interior paranaense aos desfiles de Paris, a história do vestir e a elegância dos tecidos brasileiros.',
    baseSponsorValue: {
      especial: 4900000,
      ouro: 1900000,
      prata: 800000,
      bronze: 400000,
      avaliacao: 190000
    },
    qualityBoost: 9,
    commercialTradeoff: 'Patrocínio ideal para encher de esplendor o ateliê de fantasias das alas e da bateria. Requer carnavalesco de forte traço estético.'
  }
];

export class EnredoService {
  /**
   * Generates a diverse list of 6-7 enredo proposals specifically tailored for a school.
   * Includes both authoral cultural themes and lucrative sponsored offers!
   */
  public static generateSchoolEnredoProposals(school: School, currentYear: number): Enredo[] {
    const proposals: Enredo[] = [];
    const division = school.division;
    const carnavalesco = school.staff?.carnavalesco;
    const carnavalescoRating = carnavalesco?.rating || 80;

    // Pick 3 random sponsored proposals
    const shuffledSponsored = [...SPONSORED_PROPOSALS].sort(() => 0.5 - Math.random());
    const selectedSponsored = shuffledSponsored.slice(0, 3);

    selectedSponsored.forEach((sp, idx) => {
      const sponsorValue = sp.baseSponsorValue[division] || 1000000;
      // Affinity calculation: carnavalescos with high ratings can handle sponsored themes better
      const carnavalescoAffinity = Math.min(96, Math.max(62, Math.round(carnavalescoRating * 0.9 + (Math.random() * 12 - 6))));
      const historicalAffinity = Math.min(90, Math.max(50, Math.round(60 + (Math.random() * 25))));

      proposals.push({
        id: `prop_sponsor_${school.id}_${currentYear}_${idx + 1}`,
        title: sp.title,
        themeType: 'Patrocinado',
        synopsis: sp.synopsis,
        qualityBoost: sp.qualityBoost,
        cost: 0, // No cost to school; on the contrary, it pays the school!
        isSponsored: true,
        sponsorName: sp.sponsorName,
        sponsorValue,
        carnavalescoAffinity,
        historicalAffinity,
        commercialTradeoff: sp.commercialTradeoff,
        proponent: `Proposta Oficial de Patrocínio: ${sp.sponsorName}`
      });
    });

    // Pick 3-4 diverse authoral proposals
    const shuffledAuthoral = [...AUTHORAL_TEMPLATES].sort(() => 0.5 - Math.random());
    const selectedAuthoral = shuffledAuthoral.slice(0, 4);

    selectedAuthoral.forEach((au, idx) => {
      // Calculate realistic cost based on division
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
      const calculatedCost = Math.round((au.baseCost * mult) / 1000) * 1000;

      // School & carnavalesco affinity: higher for authoral themes
      const carnavalescoAffinity = Math.min(99, Math.max(78, Math.round(carnavalescoRating + (Math.random() * 10 - 3))));
      const historicalAffinity = Math.min(98, Math.max(70, Math.round(75 + (Math.random() * 22))));

      proposals.push({
        id: `prop_auth_${school.id}_${currentYear}_${idx + 1}`,
        title: au.title,
        themeType: au.themeType,
        synopsis: au.synopsis,
        qualityBoost: au.qualityBoost,
        cost: calculatedCost,
        isSponsored: false,
        carnavalescoAffinity,
        historicalAffinity,
        proponent: `Projeto Autoral de ${carnavalesco?.name || 'Carnavalesco'}`
      });
    });

    return proposals;
  }

  /**
   * Generates a single diverse enredo for an AI school, taking into account
   * the school's historical characteristics, budget and carnavalesco style.
   */
  public static generateDiverseEnredoForSchool(school: School, currentYear: number): Enredo {
    const proposals = this.generateSchoolEnredoProposals(school, currentYear);
    // AI decision: if school has low budget, higher chance to pick sponsored theme (35% chance)
    const isBudgetTight = school.budget < (school.division === 'especial' ? 3000000 : 800000);
    const sponsoredProposals = proposals.filter((p) => p.isSponsored);
    const authoralProposals = proposals.filter((p) => !p.isSponsored);

    if (isBudgetTight && sponsoredProposals.length > 0 && Math.random() < 0.6) {
      return sponsoredProposals[Math.floor(Math.random() * sponsoredProposals.length)];
    }

    if (Math.random() < 0.25 && sponsoredProposals.length > 0) {
      return sponsoredProposals[Math.floor(Math.random() * sponsoredProposals.length)];
    }

    return authoralProposals[Math.floor(Math.random() * authoralProposals.length)] || proposals[0];
  }

  /**
   * Scans a list of schools and ensures each school has a distinct, diverse enredo
   * with proper carnavalesco and historical affinities.
   */
  public static assignDiverseEnredosToAllSchools(schools: School[], currentYear: number): School[] {
    const usedTitles = new Set<string>();

    return schools.map((school) => {
      // If user school already has an active chosen enredo with title, keep it unless empty
      if (school.currentEnredo && school.currentEnredo.title && !school.currentEnredo.title.includes('SAMPLE')) {
        usedTitles.add(school.currentEnredo.title);
        return school;
      }

      // Generate proposals and find one not used yet
      const proposals = this.generateSchoolEnredoProposals(school, currentYear);
      let chosen = proposals.find((p) => !usedTitles.has(p.title)) || proposals[0];
      usedTitles.add(chosen.title);

      return {
        ...school,
        currentEnredo: chosen
      };
    });
  }
}
