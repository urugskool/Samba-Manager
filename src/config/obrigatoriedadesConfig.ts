import { DivisionId, School, SchoolParadeComposition, TechnicalInfraction } from '../types/carnaval';

export interface DivisionRegulation {
  division: DivisionId;
  divisionLabel: string;
  governingBody: string;
  venue: string;
  penaltyPerItem: number; // default -0.5 pts
  rules: {
    componentes: {
      min?: number;
      max?: number;
      description: string;
    };
    baianas?: {
      min?: number;
      description: string;
    };
    ritmistas?: {
      min?: number;
      description: string;
    };
    comissaoDeFrente?: {
      min?: number;
      max?: number;
      description: string;
    };
    alegorias?: {
      min?: number;
      max?: number;
      acoplagemRule?: string;
      description: string;
    };
    tripes?: {
      max?: number;
      maxComponentesPorTripe?: number;
      description: string;
    };
    alas?: {
      minComponentesPorAla?: number;
      description: string;
    };
    disciplinar?: {
      vedacoes: string[];
      multaMax?: number;
      description: string;
    };
  };
}

export const DIVISION_REGULATIONS: Record<DivisionId, DivisionRegulation> = {
  especial: {
    division: 'especial',
    divisionLabel: 'Grupo Especial',
    governingBody: 'LIESA (Liga Independente das Escolas de Samba)',
    venue: 'Sambódromo Marquês de Sapucaí',
    penaltyPerItem: 0.5,
    rules: {
      componentes: {
        min: 2500,
        max: 3200,
        description: 'O total de componentes deve ficar estritamente entre 2.500 e 3.200 pessoas.'
      },
      baianas: {
        min: 60,
        description: 'Pelo menos 60 baianas agrupadas em ala.'
      },
      ritmistas: {
        min: 200,
        description: 'Pelo menos 200 ritmistas (todos na bateria oficial).'
      },
      comissaoDeFrente: {
        min: 10,
        max: 15,
        description: 'A Comissão de Frente deve ter entre 10 e 15 dançarinos/integrantes.'
      },
      alegorias: {
        min: 4,
        max: 6,
        acoplagemRule: 'Permitida acoplagem em apenas uma alegoria.',
        description: 'Obrigatório o uso de no mínimo 4 e no máximo 6 carros alegóricos (acoplagem permitida em apenas 1).'
      },
      tripes: {
        max: 3,
        maxComponentesPorTripe: 2,
        description: 'Podem ser apresentados até 3 tripés (elementos cenográficos), com no máximo 2 componentes cada.'
      },
      disciplinar: {
        vedacoes: [
          'Proibido o uso de animais vivos na pista ou alegorias',
          'Proibida genitália à mostra em qualquer fantasia ou destaque',
          'Proibido o uso de microfones para propaganda ou manifestação comercial',
          'Proibido descumprimento de regras de vestimenta (camisetas) ou merchandising'
        ],
        multaMax: 250000,
        description: 'Vedações estritas: proibido animais vivos, genitália à mostra e uso de microfones para propaganda. Descumprimento de vestimenta ou merchandising acarreta multa de até R$ 250 mil e perda de 0,5 ponto por item.'
      }
    }
  },
  ouro: {
    division: 'ouro',
    divisionLabel: 'Série Ouro',
    governingBody: 'Liga-RJ',
    venue: 'Sambódromo Marquês de Sapucaí',
    penaltyPerItem: 0.5,
    rules: {
      componentes: {
        min: 900,
        description: 'Presença obrigatória de pelo menos 900 desfilantes em pista.'
      },
      alegorias: {
        min: 2,
        max: 3,
        description: 'Uso obrigatório de no mínimo 2 e no máximo 3 alegorias durante o desfile.'
      },
      comissaoDeFrente: {
        max: 15,
        description: 'Comissão de Frente com no máximo 15 componentes.'
      },
      disciplinar: {
        vedacoes: [
          'Cumprimento do regulamento de dispersão e concentração da Liga-RJ',
          'Proibido animais vivos e merchandising irregular'
        ],
        description: 'Exigências técnicas e disciplinares com punição de -0,5 ponto por item descumprido.'
      }
    }
  },
  prata: {
    division: 'prata',
    divisionLabel: 'Série Prata',
    governingBody: 'Superliga Carnavalesca do Brasil',
    venue: 'Estrada Intendente Magalhães',
    penaltyPerItem: 0.5,
    rules: {
      componentes: {
        min: 700,
        description: 'Cada escola deve ter no mínimo 700 componentes em pista.'
      },
      baianas: {
        min: 40,
        description: 'Mínimo de 40 Baianas agrupadas em ala.'
      },
      alegorias: {
        min: 2,
        max: 4,
        description: 'É permitido o uso de no mínimo 2 e no máximo 4 alegorias.'
      },
      comissaoDeFrente: {
        min: 10,
        max: 12,
        description: 'Comissão de frente deve reunir entre 10 e 12 integrantes.'
      },
      ritmistas: {
        min: 120,
        description: 'Exige-se um mínimo de 120 ritmistas na bateria.'
      },
      alas: {
        minComponentesPorAla: 30,
        description: 'Cada ala de enredo deve ter no mínimo 30 componentes.'
      },
      disciplinar: {
        vedacoes: [
          'Cumprimento das vedações da Superliga',
          'Assinatura da ata e respeito às normas da Intendente'
        ],
        description: 'Cada item não cumprido acarreta penalidade de -0,5 ponto.'
      }
    }
  },
  bronze: {
    division: 'bronze',
    divisionLabel: 'Série Bronze',
    governingBody: 'Superliga Carnavalesca do Brasil',
    venue: 'Estrada Intendente Magalhães',
    penaltyPerItem: 0.5,
    rules: {
      componentes: {
        min: 600,
        description: 'Perda de pontos por não atingir o mínimo de 600 componentes na escola.'
      },
      baianas: {
        min: 30,
        description: 'Penalidade por não desfilar com o mínimo de 30 baianas igualmente vestidas.'
      },
      alas: {
        minComponentesPorAla: 25,
        description: 'Perda de pontos por não manter alas com o mínimo de 25 componentes.'
      },
      disciplinar: {
        vedacoes: [
          'Proibido desfilar com fantasia de outra agremiação',
          'Obrigatório assinar a folha oficial de obrigatoriedades antes da armação'
        ],
        description: 'Penalidades por desfilar com fantasia de outra agremiação ou por não assinar a folha de obrigatoriedades. As sanções variam, com perdas de 0,4 a 2,3 pontos dependendo da gravidade e quantidade de itens não cumpridos.'
      }
    }
  },
  avaliacao: {
    division: 'avaliacao',
    divisionLabel: 'Grupo de Avaliação',
    governingBody: 'Superliga Carnavalesca do Brasil',
    venue: 'Estrada Intendente Magalhães',
    penaltyPerItem: 0.5,
    rules: {
      componentes: {
        min: 400,
        description: 'Perda de pontos por não atingir o mínimo de 400 componentes na escola.'
      },
      baianas: {
        min: 15,
        description: 'Penalidade por não desfilar com o mínimo de 15 baianas igualmente vestidas.'
      },
      ritmistas: {
        min: 80,
        description: 'Exige-se um mínimo de 80 ritmistas na bateria.'
      },
      comissaoDeFrente: {
        max: 10,
        description: 'A comissão de frente deve reunir no máximo 10 componentes.'
      },
      alegorias: {
        min: 1,
        max: 2,
        description: 'Obrigatório o uso de no mínimo 1 alegoria e no máximo 2.'
      },
      disciplinar: {
        vedacoes: [
          'Cumprimento do roteiro básico da comissão de avaliação da Superliga'
        ],
        description: 'Cada item não cumprido acarretará em punição de -0,5 pontos.'
      }
    }
  }
};

/**
 * Generates an initial or simulated parade composition for a school
 * based on realistic constraints, budget, division, and attributes.
 */
export function generateDefaultParadeComposition(school: School): SchoolParadeComposition {
  if (school.paradeComposition) {
    return { ...school.paradeComposition };
  }

  const div = school.division;
  const budgetTier = school.budget > 1500000 ? 1 : school.budget > 500000 ? 0.5 : 0;
  const barracao = school.barracaoProgress ?? 70;
  const rehearsal = school.rehearsalLevel ?? 70;

  switch (div) {
    case 'especial': {
      // Especial: 2500 - 3200 componentes, 200+ ritmistas, 60+ baianas, 10-15 comissao, 4-6 alegorias, 0-3 tripes (max 2 comp/tripe)
      // Top schools easily fulfill; under-prepared schools might have small slips
      const compBase = Math.round(2700 + budgetTier * 250 + (barracao - 70) * 5 + (Math.random() - 0.45) * 120);
      const componentes = Math.max(2400, Math.min(3250, compBase));
      const ritmistas = Math.round(220 + budgetTier * 20 + (rehearsal - 70) * 0.5 + (Math.random() - 0.4) * 15);
      const baianas = Math.round(68 + budgetTier * 8 + (Math.random() - 0.35) * 10);
      const comissaoDeFrente = Math.round(12 + Math.floor(Math.random() * 4)); // 12 to 15
      const alegorias = Math.max(4, Math.min(6, Math.round(5 + (barracao >= 80 ? 1 : barracao < 60 ? -1 : 0))));
      const tripes = Math.min(3, Math.max(1, Math.round(2 + (Math.random() > 0.6 ? 1 : 0))));
      const componentesPorTripe = 2;
      const componentesPorAla = Math.round(45 + (Math.random() - 0.5) * 10);

      // Low chance of incident if barracao or rehearsal is very low
      const hasDressIssue = barracao < 55 && Math.random() < 0.15;
      const hasPropagandaMicrophone = Math.random() < 0.03;

      return {
        componentes,
        ritmistas: Math.max(185, ritmistas),
        baianas: Math.max(52, baianas),
        comissaoDeFrente,
        alegorias,
        tripes,
        componentesPorTripe,
        componentesPorAla,
        cumpreFolhaObrigatoriedades: true,
        respeitaIdentidadeVisual: true,
        respeitaVestimentaEMerchandising: !hasDressIssue && !hasPropagandaMicrophone,
        semAnimaisOuGenitalia: true
      };
    }

    case 'ouro': {
      // Ouro: min 900 componentes, 2-3 alegorias, max 15 comissao
      const compBase = Math.round(1100 + budgetTier * 200 + (rehearsal - 70) * 4 + (Math.random() - 0.4) * 80);
      const componentes = Math.max(850, compBase);
      const alegorias = Math.max(2, Math.min(3, Math.round(2.6 + (barracao >= 80 ? 0.4 : -0.3))));
      const comissaoDeFrente = Math.round(13 + Math.floor(Math.random() * 3)); // 13-15
      const ritmistas = Math.round(160 + (Math.random() - 0.5) * 20);
      const baianas = Math.round(50 + (Math.random() - 0.5) * 8);

      return {
        componentes,
        ritmistas,
        baianas,
        comissaoDeFrente,
        alegorias,
        tripes: 1,
        componentesPorTripe: 2,
        componentesPorAla: 35,
        cumpreFolhaObrigatoriedades: true,
        respeitaIdentidadeVisual: true,
        respeitaVestimentaEMerchandising: true,
        semAnimaisOuGenitalia: true
      };
    }

    case 'prata': {
      // Prata: min 700 componentes, min 40 baianas, 2-4 alegorias, 10-12 comissao, min 120 ritmistas, min 30 por ala
      const componentes = Math.round(780 + budgetTier * 100 + (Math.random() - 0.4) * 60);
      const baianas = Math.round(44 + (Math.random() - 0.35) * 6);
      const alegorias = Math.max(2, Math.min(4, Math.round(3 + (Math.random() - 0.5))));
      const comissaoDeFrente = Math.round(11 + (Math.random() > 0.5 ? 1 : 0)); // 11-12
      const ritmistas = Math.round(135 + (Math.random() - 0.35) * 15);
      const componentesPorAla = Math.round(32 + Math.floor(Math.random() * 4));

      return {
        componentes,
        ritmistas,
        baianas,
        comissaoDeFrente,
        alegorias,
        tripes: 1,
        componentesPorTripe: 2,
        componentesPorAla,
        cumpreFolhaObrigatoriedades: true,
        respeitaIdentidadeVisual: true,
        respeitaVestimentaEMerchandising: true,
        semAnimaisOuGenitalia: true
      };
    }

    case 'bronze': {
      // Bronze: min 600 componentes, min 30 baianas, min 25 por ala, identidade visual e folha de obrigatoriedades
      const componentes = Math.round(660 + (Math.random() - 0.4) * 60);
      const baianas = Math.round(34 + (Math.random() - 0.35) * 6);
      const componentesPorAla = Math.round(27 + Math.floor(Math.random() * 4));
      const ritmistas = Math.round(100 + (Math.random() - 0.5) * 15);
      const comissaoDeFrente = 10;
      const alegorias = 2;

      // Small realistic chance in Série Bronze of documentation/costume infractions if low rehearsal/budget
      const irregularVisual = barracao < 55 && Math.random() < 0.12;
      const forgotFolha = Math.random() < 0.08;

      return {
        componentes,
        ritmistas,
        baianas,
        comissaoDeFrente,
        alegorias,
        tripes: 0,
        componentesPorTripe: 0,
        componentesPorAla,
        cumpreFolhaObrigatoriedades: !forgotFolha,
        respeitaIdentidadeVisual: !irregularVisual,
        respeitaVestimentaEMerchandising: true,
        semAnimaisOuGenitalia: true
      };
    }

    case 'avaliacao': {
      // Avaliação: min 400 componentes, min 15 baianas, min 80 ritmistas, max 10 comissao, 1-2 alegorias
      const componentes = Math.round(440 + (Math.random() - 0.4) * 40);
      const baianas = Math.round(18 + (Math.random() - 0.35) * 4);
      const ritmistas = Math.round(88 + (Math.random() - 0.35) * 10);
      const comissaoDeFrente = Math.round(9 + (Math.random() > 0.7 ? 1 : 0)); // 9 or 10
      const alegorias = Math.max(1, Math.min(2, Math.round(1.4 + Math.random() * 0.4)));

      return {
        componentes,
        ritmistas,
        baianas,
        comissaoDeFrente,
        alegorias,
        tripes: 0,
        componentesPorTripe: 0,
        componentesPorAla: 20,
        cumpreFolhaObrigatoriedades: true,
        respeitaIdentidadeVisual: true,
        respeitaVestimentaEMerchandising: true,
        semAnimaisOuGenitalia: true
      };
    }

    default:
      return {
        componentes: 2600,
        ritmistas: 220,
        baianas: 65,
        comissaoDeFrente: 12,
        alegorias: 5,
        tripes: 2,
        componentesPorTripe: 2,
        componentesPorAla: 40,
        cumpreFolhaObrigatoriedades: true,
        respeitaIdentidadeVisual: true,
        respeitaVestimentaEMerchandising: true,
        semAnimaisOuGenitalia: true
      };
  }
}

/**
 * Rigorously checks all technical regulations and obrigatoriedades for a school's parade.
 * Generates official infractions and calculates the exact technical penalty points deducted.
 */
export function evaluateSchoolParadeObrigatoriedades(
  school: School,
  customComposition?: SchoolParadeComposition
): {
  technicalPenalty: number;
  infractions: TechnicalInfraction[];
  composition: SchoolParadeComposition;
} {
  const comp = customComposition || school.paradeComposition || generateDefaultParadeComposition(school);
  const infractions: TechnicalInfraction[] = [];
  const div = school.division;

  // 1. GRUPO ESPECIAL (LIESA)
  if (div === 'especial') {
    // Ritmistas: Pelo menos 200 ritmistas (todos na bateria) -> -0.5
    if (comp.ritmistas < 200) {
      infractions.push({
        id: 'esp_ritmistas',
        ruleName: 'Mínimo de Ritmistas na Bateria',
        description: `Desfilou com ${comp.ritmistas} ritmistas (exigência mínima de 200 ritmistas na bateria).`,
        pointsDeducted: 0.5,
        category: 'bateria'
      });
    }

    // Baianas: Pelo menos 60 baianas agrupadas -> -0.5
    if (comp.baianas < 60) {
      infractions.push({
        id: 'esp_baianas',
        ruleName: 'Mínimo de Baianas Agrupadas',
        description: `Ala das Baianas com ${comp.baianas} integrantes (exigência mínima de 60 baianas agrupadas).`,
        pointsDeducted: 0.5,
        category: 'baianas'
      });
    }

    // Comissão de Frente: entre 10 e 15 dançarinos -> -0.5
    if (comp.comissaoDeFrente < 10 || comp.comissaoDeFrente > 15) {
      infractions.push({
        id: 'esp_comissao',
        ruleName: 'Comissão de Frente Fora do Limite',
        description: `Comissão de Frente com ${comp.comissaoDeFrente} dançarinos (obrigatório entre 10 e 15 componentes).`,
        pointsDeducted: 0.5,
        category: 'comissao'
      });
    }

    // Componentes: entre 2.500 e 3.200 pessoas -> -0.5
    if (comp.componentes < 2500 || comp.componentes > 3200) {
      infractions.push({
        id: 'esp_componentes',
        ruleName: 'Total de Componentes Fora da Faixa',
        description: `Contingente de ${comp.componentes.toLocaleString('pt-BR')} componentes (exigência oficial entre 2.500 e 3.200 desfilantes).`,
        pointsDeducted: 0.5,
        category: 'composicao'
      });
    }

    // Alegorias: mínimo 4 e máximo 6 carros alegóricos -> -0.5
    if (comp.alegorias < 4 || comp.alegorias > 6) {
      infractions.push({
        id: 'esp_alegorias',
        ruleName: 'Número de Carros Alegóricos Irregular',
        description: `Apresentou ${comp.alegorias} carros alegóricos (obrigatório mínimo de 4 e máximo de 6 alegorias, acoplagem permitida em apenas 1).`,
        pointsDeducted: 0.5,
        category: 'alegorias'
      });
    }

    // Tripés: até 3 tripés com no máximo 2 componentes cada -> -0.5
    const tripesCount = comp.tripes ?? 0;
    const tripesComp = comp.componentesPorTripe ?? 0;
    if (tripesCount > 3 || (tripesCount > 0 && tripesComp > 2)) {
      infractions.push({
        id: 'esp_tripes',
        ruleName: 'Excesso de Tripés ou Componentes Cenográficos',
        description: `Apresentou ${tripesCount} tripés com ${tripesComp} componentes por elemento (máximo permitido de 3 tripés e até 2 componentes por tripé).`,
        pointsDeducted: 0.5,
        category: 'alegorias'
      });
    }

    // Vedações: animais vivos, genitália à mostra, microfones para propaganda, vestimenta/merchandising
    if (comp.semAnimaisOuGenitalia === false) {
      infractions.push({
        id: 'esp_vedacao_gravissima',
        ruleName: 'Vedação Estrita: Animais Vivos ou Genitália Exposta',
        description: 'Constatação de uso de animais vivos ou nudez com genitália à mostra durante o cortejo.',
        pointsDeducted: 0.5,
        fineAmount: 250000,
        category: 'disciplinar'
      });
    }

    if (comp.respeitaVestimentaEMerchandising === false) {
      infractions.push({
        id: 'esp_merchandising',
        ruleName: 'Vestimenta Irregular / Merchandising Não Autorizado',
        description: 'Uso de microfone para propaganda ou desrespeito às regras de vestimenta (camisetas na pista) e merchandising.',
        pointsDeducted: 0.5,
        fineAmount: 120000,
        category: 'disciplinar'
      });
    }
  }

  // 2. SÉRIE OURO (Liga-RJ)
  else if (div === 'ouro') {
    // Total de desfilantes: pelo menos 900 -> -0.5
    if (comp.componentes < 900) {
      infractions.push({
        id: 'ouro_componentes',
        ruleName: 'Mínimo de Componentes Obrigatórios',
        description: `Contingente de ${comp.componentes.toLocaleString('pt-BR')} desfilantes (obrigatório pelo menos 900 componentes).`,
        pointsDeducted: 0.5,
        category: 'composicao'
      });
    }

    // Alegorias: mínimo 2 e máximo 3 -> -0.5
    if (comp.alegorias < 2 || comp.alegorias > 3) {
      infractions.push({
        id: 'ouro_alegorias',
        ruleName: 'Limite de Alegorias Descumprido',
        description: `Apresentou ${comp.alegorias} alegorias (exigência técnica de no mínimo 2 e no máximo 3 alegorias).`,
        pointsDeducted: 0.5,
        category: 'alegorias'
      });
    }

    // Comissão de Frente: máximo 15 componentes -> -0.5
    if (comp.comissaoDeFrente > 15) {
      infractions.push({
        id: 'ouro_comissao',
        ruleName: 'Comissão de Frente Excedente',
        description: `Comissão de Frente com ${comp.comissaoDeFrente} componentes (limite máximo permitido de 15 componentes).`,
        pointsDeducted: 0.5,
        category: 'comissao'
      });
    }
  }

  // 3. SÉRIE PRATA (Superliga)
  else if (div === 'prata') {
    // Mínimo de 700 componentes em pista -> -0.5
    if (comp.componentes < 700) {
      infractions.push({
        id: 'prata_componentes',
        ruleName: 'Mínimo de Componentes em Pista',
        description: `Desfilou com ${comp.componentes.toLocaleString('pt-BR')} componentes (mínimo exigido de 700 componentes).`,
        pointsDeducted: 0.5,
        category: 'composicao'
      });
    }

    // Mínimo de 40 Baianas agrupadas em ala -> -0.5
    if (comp.baianas < 40) {
      infractions.push({
        id: 'prata_baianas',
        ruleName: 'Ala das Baianas Abaixo do Mínimo',
        description: `Ala das Baianas com ${comp.baianas} baianas (mínimo obrigatório de 40 baianas agrupadas).`,
        pointsDeducted: 0.5,
        category: 'baianas'
      });
    }

    // Alegorias: no mínimo 2 e no máximo 4 -> -0.5
    if (comp.alegorias < 2 || comp.alegorias > 4) {
      infractions.push({
        id: 'prata_alegorias',
        ruleName: 'Alegorias Fora do Limite Regulamentar',
        description: `Apresentou ${comp.alegorias} alegorias (permitido entre 2 e 4 alegorias).`,
        pointsDeducted: 0.5,
        category: 'alegorias'
      });
    }

    // Comissão de frente: entre 10 e 12 integrantes -> -0.5
    if (comp.comissaoDeFrente < 10 || comp.comissaoDeFrente > 12) {
      infractions.push({
        id: 'prata_comissao',
        ruleName: 'Comissão de Frente Fora do Padrão',
        description: `Comissão de Frente com ${comp.comissaoDeFrente} integrantes (deve reunir rigorosamente entre 10 e 12 integrantes).`,
        pointsDeducted: 0.5,
        category: 'comissao'
      });
    }

    // Ritmistas: mínimo de 120 ritmistas -> -0.5
    if (comp.ritmistas < 120) {
      infractions.push({
        id: 'prata_ritmistas',
        ruleName: 'Mínimo de Ritmistas Não Atingido',
        description: `Apenas ${comp.ritmistas} ritmistas na bateria (exigência mínima de 120 ritmistas).`,
        pointsDeducted: 0.5,
        category: 'bateria'
      });
    }

    // Alas de enredo: cada ala deve ter no mínimo 30 componentes -> -0.5
    const compAla = comp.componentesPorAla ?? 35;
    if (compAla < 30) {
      infractions.push({
        id: 'prata_alas',
        ruleName: 'Alas de Enredo com Menos de 30 Componentes',
        description: `Média de ${compAla} componentes por ala (cada ala de enredo deve ter no mínimo 30 componentes).`,
        pointsDeducted: 0.5,
        category: 'alas'
      });
    }
  }

  // 4. SÉRIE BRONZE (Superliga)
  // As sanções variam, com perdas de 0,4 a 2,3 pontos dependendo da gravidade e quantidade de itens não cumpridos
  else if (div === 'bronze') {
    // Composição Mínima: mínimo de 600 componentes
    if (comp.componentes < 600) {
      infractions.push({
        id: 'bronze_componentes',
        ruleName: 'Componentes Abaixo do Limite Mínimo',
        description: `Desfilou com ${comp.componentes.toLocaleString('pt-BR')} componentes (mínimo de 600 componentes na escola).`,
        pointsDeducted: 0.5,
        category: 'composicao'
      });
    }

    // Ala das Baianas: mínimo de 30 baianas igualmente vestidas
    if (comp.baianas < 30) {
      infractions.push({
        id: 'bronze_baianas',
        ruleName: 'Ala das Baianas Abaixo de 30 Integrantes',
        description: `Ala das Baianas com ${comp.baianas} baianas (mínimo obrigatório de 30 baianas igualmente vestidas).`,
        pointsDeducted: 0.5,
        category: 'baianas'
      });
    }

    // Alas de Componentes: mínimo de 25 componentes por ala
    const compAla = comp.componentesPorAla ?? 28;
    if (compAla < 25) {
      infractions.push({
        id: 'bronze_alas',
        ruleName: 'Alas com Menos de 25 Componentes',
        description: `Alas com média de ${compAla} componentes (perda de pontos por não manter alas com o mínimo de 25 componentes).`,
        pointsDeducted: 0.4,
        category: 'alas'
      });
    }

    // Identidade Visual: fantasia de outra agremiação
    if (comp.respeitaIdentidadeVisual === false) {
      infractions.push({
        id: 'bronze_identidade_visual',
        ruleName: 'Infração de Identidade Visual',
        description: 'Penalidade por desfilar com fantasia de outra agremiação carnavalesca.',
        pointsDeducted: 0.5,
        category: 'disciplinar'
      });
    }

    // Documental: assinar a folha de obrigatoriedades
    if (comp.cumpreFolhaObrigatoriedades === false) {
      infractions.push({
        id: 'bronze_folha_obrigatoriedades',
        ruleName: 'Ausência de Assinatura na Folha de Obrigatoriedades',
        description: 'Penalidade administrativa por não assinar a folha oficial de obrigatoriedades junto à direção da Superliga.',
        pointsDeducted: 0.4,
        category: 'disciplinar'
      });
    }
  }

  // 5. GRUPO DE AVALIAÇÃO (Superliga)
  // Cada item não cumprido acarreta punição de -0.5 pontos
  else if (div === 'avaliacao') {
    // Composição Mínima: mínimo de 400 componentes
    if (comp.componentes < 400) {
      infractions.push({
        id: 'avaliacao_componentes',
        ruleName: 'Mínimo de 400 Componentes Não Atingido',
        description: `Contingente de ${comp.componentes.toLocaleString('pt-BR')} desfilantes (obrigatório no mínimo 400 componentes na escola).`,
        pointsDeducted: 0.5,
        category: 'composicao'
      });
    }

    // Ala das Baianas: mínimo de 15 baianas igualmente vestidas
    if (comp.baianas < 15) {
      infractions.push({
        id: 'avaliacao_baianas',
        ruleName: 'Ala das Baianas Abaixo do Mínimo',
        description: `Ala das Baianas com ${comp.baianas} baianas (mínimo de 15 baianas igualmente vestidas).`,
        pointsDeducted: 0.5,
        category: 'baianas'
      });
    }

    // Ritmistas: mínimo de 80 ritmistas
    if (comp.ritmistas < 80) {
      infractions.push({
        id: 'avaliacao_ritmistas',
        ruleName: 'Mínimo de Ritmistas Não Atingido',
        description: `Apresentou ${comp.ritmistas} ritmistas (exige-se um mínimo de 80 ritmistas na bateria).`,
        pointsDeducted: 0.5,
        category: 'bateria'
      });
    }

    // Comissão de frente: no máximo 10 componentes
    if (comp.comissaoDeFrente > 10) {
      infractions.push({
        id: 'avaliacao_comissao',
        ruleName: 'Comissão de Frente com Mais de 10 Componentes',
        description: `Comissão de Frente com ${comp.comissaoDeFrente} dançarinos (deve reunir no máximo 10 componentes).`,
        pointsDeducted: 0.5,
        category: 'comissao'
      });
    }

    // Alegorias: mínimo 1 e máximo 2
    if (comp.alegorias < 1 || comp.alegorias > 2) {
      infractions.push({
        id: 'avaliacao_alegorias',
        ruleName: 'Alegorias Fora da Faixa Obrigatória',
        description: `Apresentou ${comp.alegorias} alegorias (obrigatório o uso de no mínimo 1 alegoria e no máximo 2).`,
        pointsDeducted: 0.5,
        category: 'alegorias'
      });
    }
  }

  // Calculate sum of penalty points deducted
  let rawPenalty = infractions.reduce((acc, inf) => acc + inf.pointsDeducted, 0);

  // In Série Bronze, regulation states sanctions vary from 0.4 to 2.3 points
  if (div === 'bronze' && rawPenalty > 0) {
    rawPenalty = Math.min(2.3, Math.max(0.4, rawPenalty));
  }

  const technicalPenalty = Math.round(rawPenalty * 10) / 10;

  return {
    technicalPenalty,
    infractions,
    composition: comp
  };
}
