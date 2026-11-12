import {
  ActiveThematicSponsor,
  DivisionId,
  Enredo,
  School,
  ThematicSponsorOffer
} from '../types/carnaval';

export const HISTORICAL_CULTURAL_BONUS_PERCENT = 40;

interface ThematicSponsorTemplate {
  id: string;
  name: string;
  sector: string;
  tagline: string;
  tierLabel: string;
  tierMultiplier: number;
  baseAffinity: number;
}

interface ThemeCategoryConfig {
  key: string;
  label: string;
  sponsors: ThematicSponsorTemplate[];
}

const DIVISION_THEMATIC_BASE: Record<DivisionId, number> = {
  especial: 1200000,
  ouro: 320000,
  prata: 95000,
  bronze: 55000,
  avaliacao: 35000
};

const DIVISION_ROUNDING: Record<DivisionId, number> = {
  especial: 10000,
  ouro: 5000,
  prata: 2500,
  bronze: 1000,
  avaliacao: 1000
};

const THEME_CATEGORY_CATALOG: Record<string, ThemeCategoryConfig> = {
  historico: {
    key: 'historico',
    label: 'Histórico & Patrimônio Nacional',
    sponsors: [
      {
        id: 'hist_acervo_nacional',
        name: 'Instituto Acervo Histórico Nacional',
        sector: 'Fomento Cultural & Preservação',
        tagline: 'Edital de incentivo cultural para narrativas de memória histórica brasileira e patrimônio documental.',
        tierLabel: 'Edital Patrimônio Ouro',
        tierMultiplier: 1.08,
        baseAffinity: 97
      },
      {
        id: 'hist_fundacao_memoria',
        name: 'Fundação Memória & Museus do Brasil',
        sector: 'Patrocínio Cultural & Educação',
        tagline: 'Apoio institucional a enredos históricos com foco em pesquisa iconográfica e valorização de acervos.',
        tierLabel: 'Fomento Cultural Direto',
        tierMultiplier: 1.0,
        baseAffinity: 94
      },
      {
        id: 'hist_conselho_artes',
        name: 'Conselho Carioca de História e Artes',
        sector: 'Lei de Incentivo Cultural',
        tagline: 'Cota cultural dedicada à pesquisa histórica nas escolas de samba e difusão da memória popular.',
        tierLabel: 'Cota Cultural Estadual',
        tierMultiplier: 0.93,
        baseAffinity: 91
      }
    ]
  },
  afro: {
    key: 'afro',
    label: 'Afro-Brasileiro & Ancestralidade',
    sponsors: [
      {
        id: 'afro_raizes',
        name: 'Coletivo Raízes & Ancestralidade',
        sector: 'Cultura Afro-Brasileira & Economia Criativa',
        tagline: 'Apoio a expressões de matriz africana, saberes dos terreiros e artesãos das comunidades.',
        tierLabel: 'Parceria Ancestral',
        tierMultiplier: 1.06,
        baseAffinity: 96
      },
      {
        id: 'afro_casa_aguas',
        name: 'Casa das Águas — Instituto Cultural',
        sector: 'Patrimônio Imaterial',
        tagline: 'Financiamento cultural para projetos que exaltam a diáspora africana e a música afro-brasileira.',
        tierLabel: 'Fomento Comunitário',
        tierMultiplier: 1.0,
        baseAffinity: 92
      },
      {
        id: 'afro_banco_diaspora',
        name: 'Fundo Diáspora & Tambor',
        sector: 'Iniciativa Social & Cultural',
        tagline: 'Investimento em oficinas de percussão, adereços tradicionais e visibilidade afrocentrada.',
        tierLabel: 'Cota Identidade',
        tierMultiplier: 0.94,
        baseAffinity: 89
      }
    ]
  },
  ambiental: {
    key: 'ambiental',
    label: 'Ambiental, Natureza & Biomas',
    sponsors: [
      {
        id: 'amb_alianca_verde',
        name: 'Aliança Verde Bioenergia',
        sector: 'Energia Limpa & Sustentabilidade',
        tagline: 'Patrocínio temático para enredos dedicados à floresta, aos rios e ao equilíbrio climático.',
        tierLabel: 'Cota Carbono Zero',
        tierMultiplier: 1.08,
        baseAffinity: 95
      },
      {
        id: 'amb_floresta_viva',
        name: 'Instituto Floresta Viva',
        sector: 'Preservação & Biodiversidade',
        tagline: 'Apoio a alegorias com materiais recicláveis e mensagens de defesa dos biomas brasileiros.',
        tierLabel: 'Parceria Bioma',
        tierMultiplier: 1.0,
        baseAffinity: 93
      },
      {
        id: 'amb_ecoparque',
        name: 'Rede Ecoparque Águas do Brasil',
        sector: 'Ecoturismo & Educação Ambiental',
        tagline: 'Incentivo financeiro para alas temáticas sobre fauna, flora e preservação hídrica.',
        tierLabel: 'Cota Sustentável',
        tierMultiplier: 0.92,
        baseAffinity: 88
      }
    ]
  },
  ciencia: {
    key: 'ciencia',
    label: 'Ciência, Tecnologia & Futuro',
    sponsors: [
      {
        id: 'cie_polo_guanabara',
        name: 'Polo Tecnológico Guanabara',
        sector: 'Inovação & Engenharia Digital',
        tagline: 'Patrocínio voltado à iluminação cênica, automação alegórica e narrativa científica.',
        tierLabel: 'Cota Inovação',
        tierMultiplier: 1.07,
        baseAffinity: 95
      },
      {
        id: 'cie_vertice',
        name: 'Vértice Sistemas & Aeroespacial',
        sector: 'Tecnologia & Pesquisa Aplicada',
        tagline: 'Aporte para enredos sobre astronomia, computação e fronteiras do conhecimento humano.',
        tierLabel: 'Parceria Futuro',
        tierMultiplier: 1.0,
        baseAffinity: 91
      },
      {
        id: 'cie_observatorio',
        name: 'Observatório Horizonte Científico',
        sector: 'Divulgação Científica',
        tagline: 'Apoio institucional para transformar ciência e descobertas em espetáculo popular.',
        tierLabel: 'Cota Conhecimento',
        tierMultiplier: 0.93,
        baseAffinity: 89
      }
    ]
  },
  regional: {
    key: 'regional',
    label: 'Regionalismo & Saberes do Brasil',
    sponsors: [
      {
        id: 'reg_rota_sabores',
        name: 'Rota dos Sabores & Destinos Regionais',
        sector: 'Turismo & Gastronomia Brasileira',
        tagline: 'Investimento em enredos que celebram o sertão, a Amazônia, o Nordeste e a cultura regional.',
        tierLabel: 'Cota Turismo Nacional',
        tierMultiplier: 1.06,
        baseAffinity: 95
      },
      {
        id: 'reg_artesaos',
        name: 'Cooperativa Mãos do Brasil',
        sector: 'Artesanato & Economia Solidária',
        tagline: 'Parceria que valoriza trajes típicos, bordados, barro e expressões regionais na avenida.',
        tierLabel: 'Parceria Regional',
        tierMultiplier: 1.0,
        baseAffinity: 92
      },
      {
        id: 'reg_via_brasil',
        name: 'Via Brasil Transportes & Cultura',
        sector: 'Integração Regional',
        tagline: 'Cota comercial para divulgação das tradições estaduais e festas populares brasileiras.',
        tierLabel: 'Cota Território',
        tierMultiplier: 0.94,
        baseAffinity: 89
      }
    ]
  },
  literario: {
    key: 'literario',
    label: 'Literatura, Música & Artes',
    sponsors: [
      {
        id: 'lit_editora_passaro',
        name: 'Editora Pássaro de Letras',
        sector: 'Mercado Editorial & Literatura',
        tagline: 'Incentivo a desfiles inspirados em grandes escritores, romances clássicos e poesia nacional.',
        tierLabel: 'Cota Bienal do Livro',
        tierMultiplier: 1.06,
        baseAffinity: 96
      },
      {
        id: 'lit_porto_artes',
        name: 'Galeria & Academia Porto das Artes',
        sector: 'Artes Plásticas & Teatro',
        tagline: 'Apoio para cenografia autoral, figurinos artísticos e homenagens às belas-artes.',
        tierLabel: 'Parceria Mecenas',
        tierMultiplier: 1.0,
        baseAffinity: 92
      },
      {
        id: 'lit_selo_harmonia',
        name: 'Selo Sonoro Harmonia Brasileira',
        sector: 'Música & Acervo Fonográfico',
        tagline: 'Fomento à musicalidade e à conexão entre literatura, palco e samba-enredo.',
        tierLabel: 'Cota Sonora',
        tierMultiplier: 0.93,
        baseAffinity: 89
      }
    ]
  },
  folclore: {
    key: 'folclore',
    label: 'Folclore, Lendas & Tradição Oral',
    sponsors: [
      {
        id: 'fol_museu_lendas',
        name: 'Museu Vivo das Lendas Populares',
        sector: 'Patrimônio Imaterial & Cordel',
        tagline: 'Apoio a cortejos que levam mitos brasileiros, bois-bumbás e personagens encantados à pista.',
        tierLabel: 'Cota Cultura Popular',
        tierMultiplier: 1.06,
        baseAffinity: 95
      },
      {
        id: 'fol_povos_terra',
        name: 'Fundação Saberes & Povos da Terra',
        sector: 'Cultura Indígena & Tradição Oral',
        tagline: 'Parceria cultural dedicada à preservação das narrativas originárias e festejos populares.',
        tierLabel: 'Parceria Tradição',
        tierMultiplier: 1.0,
        baseAffinity: 92
      },
      {
        id: 'fol_casa_cordel',
        name: 'Casa do Cordel e Xilogravura',
        sector: 'Artesanato & Literatura de Cordel',
        tagline: 'Patrocínio para figurinos inspirados em gravuras populares e folguedos tradicionais.',
        tierLabel: 'Cota Folclore',
        tierMultiplier: 0.94,
        baseAffinity: 89
      }
    ]
  },
  mitologico: {
    key: 'mitologico',
    label: 'Mitologia & Épicos Universais',
    sponsors: [
      {
        id: 'mit_teatro_epico',
        name: 'Orquestra & Teatro Épico Carioca',
        sector: 'Artes Cênicas & Ópera Popular',
        tagline: 'Aporte voltado para grandes alegorias míticas, cosmogonias e espetáculos teatrais.',
        tierLabel: 'Cota Ópera da Avenida',
        tierMultiplier: 1.07,
        baseAffinity: 94
      },
      {
        id: 'mit_cosmogonia',
        name: 'Estúdio Cosmogonia Audiovisual',
        sector: 'Cinema, Cenografia & Fantasia',
        tagline: 'Patrocínio para narrativas épicas com forte apelo visual e personagens mitológicos.',
        tierLabel: 'Parceria Épica',
        tierMultiplier: 1.0,
        baseAffinity: 91
      },
      {
        id: 'mit_instituto_mitos',
        name: 'Instituto Mitologias do Mundo',
        sector: 'Intercâmbio Cultural',
        tagline: 'Incentivo a enredos que cruzam civilizações antigas, deuses e símbolos universais.',
        tierLabel: 'Cota Clássica',
        tierMultiplier: 0.93,
        baseAffinity: 88
      }
    ]
  },
  critica: {
    key: 'critica',
    label: 'Crítica Social, Sátira & Cidadania',
    sponsors: [
      {
        id: 'cri_forum_cidadania',
        name: 'Fórum Cidadania & Direitos Humanos',
        sector: 'Projetos Sociais & Educação',
        tagline: 'Apoio institucional a enredos de consciência social, inclusão e voz das periferias.',
        tierLabel: 'Cota Impacto Social',
        tierMultiplier: 1.05,
        baseAffinity: 95
      },
      {
        id: 'cri_cooperativa_voz',
        name: 'Rede Cooperativa Trabalho & Voz',
        sector: 'Economia Popular & Comunitária',
        tagline: 'Patrocínio voltado para iniciativas de participação popular e geração de renda na quadra.',
        tierLabel: 'Parceria Popular',
        tierMultiplier: 1.0,
        baseAffinity: 91
      },
      {
        id: 'cri_observatorio_urbano',
        name: 'Observatório Urbano do Samba',
        sector: 'Direito à Cidade & Cultura',
        tagline: 'Incentivo para desfiles críticos que debatem a realidade urbana com poesia e irreverência.',
        tierLabel: 'Cota Crônica Social',
        tierMultiplier: 0.93,
        baseAffinity: 88
      }
    ]
  },
  homenagem: {
    key: 'homenagem',
    label: 'Homenagem & Personalidades',
    sponsors: [
      {
        id: 'hom_baluartes',
        name: 'Instituto Memória dos Baluartes',
        sector: 'Tributos Biográficos & Música',
        tagline: 'Patrocínio especial para celebrações de grandes nomes da cultura, rádio, teatro e samba.',
        tierLabel: 'Cota Tributo Maior',
        tierMultiplier: 1.06,
        baseAffinity: 95
      },
      {
        id: 'hom_estrelas',
        name: 'Fundação Estrelas da Cultura Nacional',
        sector: 'Preservação Artística',
        tagline: 'Aporte para reconstrução biográfica de trajetórias marcantes nas alas e alegorias.',
        tierLabel: 'Parceria Biográfica',
        tierMultiplier: 1.0,
        baseAffinity: 92
      },
      {
        id: 'hom_gravadora',
        name: 'Acervo Fonográfico Ouro Nacional',
        sector: 'Patrimônio Musical & Audiovisual',
        tagline: 'Apoio comercial para homenagens ligadas à música popular e aos palcos brasileiros.',
        tierLabel: 'Cota Acervo',
        tierMultiplier: 0.94,
        baseAffinity: 89
      }
    ]
  },
  ludico: {
    key: 'ludico',
    label: 'Lúdico, Circo, Fantasia & Surrealismo',
    sponsors: [
      {
        id: 'lud_parques',
        name: 'Grande Circo & Parques Alegria',
        sector: 'Entretenimento & Espetáculos Familiares',
        tagline: 'Patrocínio vibrante para enredos de picadeiro, infância, fantasia e cores lúdicas.',
        tierLabel: 'Cota Espetáculo',
        tierMultiplier: 1.06,
        baseAffinity: 94
      },
      {
        id: 'lud_fabrica_sonhos',
        name: 'Fábrica de Sonhos & Brinquedos',
        sector: 'Varejo Lúdico & Design',
        tagline: 'Apoio criativo para alas leves, fantásticas e cenários de imaginação livre.',
        tierLabel: 'Parceria Fantasia',
        tierMultiplier: 1.0,
        baseAffinity: 91
      },
      {
        id: 'lud_atelie_surreal',
        name: 'Ateliê Surreal Rio',
        sector: 'Moda, Figurino & Vanguarda',
        tagline: 'Cota temática dedicada a estéticas oníricas, surrealistas e ousadia plástica.',
        tierLabel: 'Cota Vanguarda',
        tierMultiplier: 0.94,
        baseAffinity: 88
      }
    ]
  },
  cultural: {
    key: 'cultural',
    label: 'Cultural & Economia Criativa',
    sponsors: [
      {
        id: 'cul_porto_maravilha',
        name: 'Centro Cultural Porto Maravilha',
        sector: 'Incentivo Cultural Multissetorial',
        tagline: 'Cota institucional para projetos culturais abrangentes, danças, festas e identidades.',
        tierLabel: 'Parceria Cultural',
        tierMultiplier: 1.05,
        baseAffinity: 93
      },
      {
        id: 'cul_economia_criativa',
        name: 'Circuito Carioca de Economia Criativa',
        sector: 'Produção Artística & Carnaval',
        tagline: 'Apoio direto ao trabalho de costureiras, escultores, pintores e aderecistas do barracão.',
        tierLabel: 'Fomento Artístico',
        tierMultiplier: 1.0,
        baseAffinity: 90
      },
      {
        id: 'cul_samba_cidade',
        name: 'Fomento Samba & Cidade',
        sector: 'Apoio Cultural Institucional',
        tagline: 'Patrocínio temático para celebrações das manifestações artísticas e populares.',
        tierLabel: 'Cota Cidade',
        tierMultiplier: 0.93,
        baseAffinity: 87
      }
    ]
  }
};

export function normalizeThemeText(themeType?: string): string {
  if (!themeType) return '';
  return themeType
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function isHistoricalEnredoTheme(themeType?: string): boolean {
  const norm = normalizeThemeText(themeType);
  if (!norm) return false;
  return norm.includes('historico') || norm.includes('historia');
}

export function resolveThemeCategoryKey(themeType?: string): string {
  const norm = normalizeThemeText(themeType);
  if (!norm) return 'cultural';

  if (isHistoricalEnredoTheme(themeType)) return 'historico';
  if (norm.includes('afro') || norm.includes('orixa') || norm.includes('religios')) return 'afro';
  if (norm.includes('ambient') || norm.includes('naturez') || norm.includes('ecolog') || norm.includes('preservac')) return 'ambiental';
  if (norm.includes('cienc') || norm.includes('tecnolog') || norm.includes('futur') || norm.includes('cosmol')) return 'ciencia';
  if (norm.includes('region') || norm.includes('sertao') || norm.includes('amazon') || norm.includes('gastronom')) return 'regional';
  if (norm.includes('literar') || norm.includes('literat') || norm.includes('poes') || norm.includes('artes') || norm.includes('barroc')) return 'literario';
  if (norm.includes('folclor') || norm.includes('lenda') || norm.includes('indigen') || norm.includes('cordel') || norm.includes('xilograv')) return 'folclore';
  if (norm.includes('mitolog') || norm.includes('mitic')) return 'mitologico';
  if (norm.includes('critic') || norm.includes('satira') || norm.includes('politic') || norm.includes('social')) return 'critica';
  if (norm.includes('homenag') || norm.includes('music') || norm.includes('teatro') || norm.includes('radio') || norm.includes('atriz')) return 'homenagem';
  if (norm.includes('ludic') || norm.includes('circo') || norm.includes('fantas') || norm.includes('surreal') || norm.includes('infancia')) return 'ludico';

  return 'cultural';
}

export class ThematicSponsorService {
  /**
   * Calcula o multiplicador de prestígio e atratividade temática da agremiação.
   */
  public static getSchoolThematicPrestigeMultiplier(school: School): number {
    const enredoScore = school.attributes?.enredo ?? 78;
    const morale = school.fanBaseMorale ?? 75;
    const titlesFactor = Math.min(
      0.16,
      (school.championshipsEspecial || 0) * 0.02 + (school.championshipsOuro || 0) * 0.01
    );

    const enredoFactor = Math.max(0.85, Math.min(1.18, 0.85 + ((enredoScore - 68) / 31) * 0.33));
    const moraleFactor = Math.max(0.92, Math.min(1.08, 0.92 + ((morale - 50) / 50) * 0.16));

    return Number((enredoFactor * moraleFactor + titlesFactor).toFixed(3));
  }

  /**
   * Gera ofertas de patrocinadores temáticos compatíveis com o Tema do Enredo atual.
   * Se o tema for 'Histórico', aplica automaticamente o Bônus de Patrocínio Cultural (+40%).
   */
  public static generateOffersForSchool(school: School, currentYear: number): ThematicSponsorOffer[] {
    const enredo: Enredo | undefined = school.currentEnredo;
    if (!enredo) return [];

    const themeType = String(enredo.themeType || 'Cultural');
    const categoryKey = resolveThemeCategoryKey(themeType);
    const category = THEME_CATEGORY_CATALOG[categoryKey] || THEME_CATEGORY_CATALOG.cultural;
    const hasHistoricalCulturalBonus = isHistoricalEnredoTheme(themeType);
    const culturalBonusPercent = hasHistoricalCulturalBonus ? HISTORICAL_CULTURAL_BONUS_PERCENT : 0;

    const divisionBase = DIVISION_THEMATIC_BASE[school.division] || DIVISION_THEMATIC_BASE.avaliacao;
    const rounding = DIVISION_ROUNDING[school.division] || 1000;
    const prestigeMult = this.getSchoolThematicPrestigeMultiplier(school);

    // Leve variação por qualidade/custo do enredo e ano para manter ofertas vivas
    const qualityFactor = 1 + Math.min(0.12, Math.max(0, ((enredo.qualityBoost || 10) - 8) * 0.015));

    return category.sponsors.map((tpl, idx) => {
      const rawBase = divisionBase * tpl.tierMultiplier * prestigeMult * qualityFactor;
      const baseAmount = Math.max(
        rounding * 5,
        Math.round(rawBase / rounding) * rounding
      );

      const culturalBonusAmount = hasHistoricalCulturalBonus
        ? Math.round((baseAmount * (culturalBonusPercent / 100)) / rounding) * rounding
        : 0;

      const totalAmount = baseAmount + culturalBonusAmount;

      // Afinidade levemente ajustada ao nível do carnavalesco e qualidade do enredo
      const carnavalescoRating = school.staff?.carnavalesco?.rating ?? 80;
      const affinityBoost = Math.round(((carnavalescoRating - 75) / 25) * 4) + (idx === 0 ? 1 : 0);
      const affinityScore = Math.min(99, Math.max(78, tpl.baseAffinity + affinityBoost));

      return {
        id: `${tpl.id}_${currentYear}`,
        name: tpl.name,
        sector: tpl.sector,
        tagline: tpl.tagline,
        matchedThemeKey: category.key,
        matchedThemeLabel: category.label,
        enredoThemeType: themeType,
        baseAmount,
        culturalBonusPercent,
        culturalBonusAmount,
        totalAmount,
        hasHistoricalCulturalBonus,
        affinityScore,
        tierLabel: tpl.tierLabel
      };
    });
  }

  /**
   * Aplica o contrato de patrocínio temático escolhido ao estado da escola.
   */
  public static applyThematicSponsorContract(
    school: School,
    offer: ThematicSponsorOffer,
    currentYear: number
  ): School {
    if (!school.currentEnredo) return school;

    const activeThematicSponsor: ActiveThematicSponsor = {
      sponsorId: offer.id,
      sponsorName: offer.name,
      sector: offer.sector,
      enredoTitle: school.currentEnredo.title,
      enredoThemeType: String(school.currentEnredo.themeType || offer.enredoThemeType),
      matchedThemeLabel: offer.matchedThemeLabel,
      baseAmount: offer.baseAmount,
      culturalBonusPercent: offer.culturalBonusPercent,
      culturalBonusAmount: offer.culturalBonusAmount,
      totalAmount: offer.totalAmount,
      hasHistoricalCulturalBonus: offer.hasHistoricalCulturalBonus,
      year: currentYear
    };

    const existingFinancas = (school as any).financas;
    const updatedFinancas = existingFinancas
      ? {
          ...existingFinancas,
          saldoCaixa: (existingFinancas.saldoCaixa ?? school.budget) + offer.totalAmount
        }
      : undefined;

    return {
      ...school,
      budget: school.budget + offer.totalAmount,
      thematicSponsorClaimedYear: currentYear,
      activeThematicSponsor,
      fanBaseMorale: Math.min(
        100,
        school.fanBaseMorale + (offer.hasHistoricalCulturalBonus ? 3 : 2)
      ),
      ...(updatedFinancas ? { financas: updatedFinancas } : {})
    };
  }

  /**
   * Permite que escolas controladas pela IA também atraiam patrocinadores temáticos
   * baseados em seu Enredo atual (recebendo o bônus cultural quando o tema for 'Histórico').
   */
  public static applyThematicSponsorsToAISchools(
    schools: School[],
    currentYear: number,
    playerSchoolId?: string | null
  ): School[] {
    return schools.map((school) => {
      const isInactive = Boolean(school.isInactive || (school as any).inactive);
      if (isInactive) return school;
      if (playerSchoolId && school.id === playerSchoolId) return school;
      if (!school.currentEnredo) return school;
      if (school.thematicSponsorClaimedYear === currentYear) return school;

      const isHistorical = isHistoricalEnredoTheme(String(school.currentEnredo.themeType));
      // Escolas com tema Histórico têm maior atratividade de editais culturais (88% vs 68%)
      const attractionChance = isHistorical ? 0.88 : 0.68;
      if (Math.random() > attractionChance) {
        return school;
      }

      const offers = this.generateOffersForSchool(school, currentYear);
      if (offers.length === 0) return school;

      // Escolhe entre a 1ª ou 2ª melhor oferta compatível
      const pickIdx = Math.random() < 0.65 ? 0 : Math.min(1, offers.length - 1);
      return this.applyThematicSponsorContract(school, offers[pickIdx], currentYear);
    });
  }
}
