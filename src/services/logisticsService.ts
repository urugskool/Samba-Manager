import { School, DivisionId } from '../types/carnaval';
import { SorteioSlot, ParadeDay } from '../types/sorteio';
import { PARADE_CONFIG, VENUES } from '../config/paradeConfig';

export interface SchoolLogisticsReport {
  schoolId: string;
  schoolName: string;
  division: DivisionId;
  venueName: string;
  venueType: 'sapucai' | 'intendente';
  neighborhood: string;
  distanceKm: number;
  routeDescription: string;
  
  // Componentes e Frota
  componentesCount: number;
  alegoriasCount: number;
  tripesCount: number;
  busesNeeded: number;
  trucksNeeded: number;

  // Gastos detalhados de locomoção e logística
  ensaioTecnicoCosts: {
    transporteComponentes: number;
    transporteBateria: number;
    alimentacaoHidratacao: number;
    total: number;
  };

  desfileOficialCosts: {
    transporteComponentes: number;
    transporteAlegoriasETripes: number;
    apoioConcentracaoDispersao: number;
    hidratacaoEquipe: number;
    total: number;
  };

  totalLogisticsCost: number;
  budgetAffordability: 'confortavel' | 'adequado' | 'apertado' | 'critico';
  logisticsEfficiencyPercent: number; // 60 a 100%

  // Interferência da Posição de Desfile
  paradePosition: {
    day?: ParadeDay;
    dayLabel?: string;
    order: number;
    totalInDay?: number;
    category: 'abertura' | 'horario_nobre' | 'intermediaria' | 'madrugada_amanhecer';
    orderTitle: string;
  };

  positionImpactSummary: string;
  performanceModifiers: {
    evolucaoMod: number;     // ex: +2.5 ou -1.8
    harmoniaMod: number;     // ex: +2.0 ou -1.5
    bateriaMod: number;      // ex: +1.5 ou -2.0
    timeRiskMod: number;     // risco de buraco ou estouro
    judgeStrictnessMod: number; // severidade do jurado na abertura
  };
  fatigueRisk: 'baixo' | 'moderado' | 'alto';
  logisticsNotes: string[];
}

// Tabela de distâncias médias em km para os bairros do Rio, Baixada e adjacências
const NEIGHBORHOOD_DISTANCES: Record<string, { sapucai: number; intendente: number; zone: string }> = {
  // Centro & Adjacências (Próximos à Sapucaí)
  'Centro': { sapucai: 2, intendente: 20, zone: 'Centro' },
  'Estácio': { sapucai: 2.5, intendente: 19, zone: 'Centro' },
  'Catumbi': { sapucai: 1.8, intendente: 20, zone: 'Centro' },
  'Gamboa': { sapucai: 2.5, intendente: 21, zone: 'Portuária' },
  'Saúde': { sapucai: 2.8, intendente: 21, zone: 'Portuária' },
  'Santo Cristo': { sapucai: 2.5, intendente: 20, zone: 'Portuária' },
  'Lapa': { sapucai: 3.2, intendente: 20, zone: 'Centro' },
  'Glória': { sapucai: 4, intendente: 22, zone: 'Zona Sul' },
  'Santa Teresa': { sapucai: 3.5, intendente: 21, zone: 'Centro' },

  // Mangueira, Benfica & São Cristóvão
  'Mangueira': { sapucai: 4.5, intendente: 18, zone: 'Zona Norte' },
  'São Cristóvão': { sapucai: 4.2, intendente: 18, zone: 'Zona Norte' },
  'Benfica': { sapucai: 5.5, intendente: 17, zone: 'Zona Norte' },

  // Grande Tijuca
  'Tijuca': { sapucai: 5.5, intendente: 16, zone: 'Grande Tijuca' },
  'Vila Isabel': { sapucai: 6.5, intendente: 15, zone: 'Grande Tijuca' },
  'Andaraí': { sapucai: 7, intendente: 15, zone: 'Grande Tijuca' },
  'Grajaú': { sapucai: 8, intendente: 15, zone: 'Grande Tijuca' },
  'Maracanã': { sapucai: 5, intendente: 16, zone: 'Grande Tijuca' },

  // Subúrbio / Madureira & Entorno (Vizinhos da Intendente Magalhães!)
  'Madureira': { sapucai: 20, intendente: 1.5, zone: 'Subúrbio Central' },
  'Oswaldo Cruz': { sapucai: 21, intendente: 2.2, zone: 'Subúrbio Central' },
  'Campinho': { sapucai: 19, intendente: 0.8, zone: 'Subúrbio Central' },
  'Cascadura': { sapucai: 18, intendente: 2.5, zone: 'Subúrbio Central' },
  'Vaz Lobo': { sapucai: 20, intendente: 2.8, zone: 'Subúrbio Central' },
  'Rocha Miranda': { sapucai: 22, intendente: 3.5, zone: 'Subúrbio Central' },
  'Bento Ribeiro': { sapucai: 23, intendente: 4.2, zone: 'Subúrbio Central' },
  'Marechal Hermes': { sapucai: 24, intendente: 5.5, zone: 'Subúrbio Central' },
  'Quintino Bocaiúva': { sapucai: 17, intendente: 3.8, zone: 'Subúrbio Central' },
  'Piedade': { sapucai: 16, intendente: 5, zone: 'Subúrbio Central' },
  'Engenho de Dentro': { sapucai: 13, intendente: 8, zone: 'Zona Norte' },
  'Méier': { sapucai: 12, intendente: 9, zone: 'Zona Norte' },
  'Pilares': { sapucai: 15, intendente: 6, zone: 'Zona Norte' },
  'Abolição': { sapucai: 16, intendente: 5, zone: 'Zona Norte' },

  // Leopoldina (Ramos, Penha, etc.)
  'Ramos': { sapucai: 11, intendente: 13, zone: 'Leopoldina' },
  'Olaria': { sapucai: 12, intendente: 14, zone: 'Leopoldina' },
  'Penha': { sapucai: 13, intendente: 15, zone: 'Leopoldina' },
  'Penha Circular': { sapucai: 14, intendente: 16, zone: 'Leopoldina' },
  'Bonsucesso': { sapucai: 9, intendente: 14, zone: 'Leopoldina' },
  'Brás de Pina': { sapucai: 15, intendente: 17, zone: 'Leopoldina' },
  'Cordovil': { sapucai: 16, intendente: 18, zone: 'Leopoldina' },
  'Parada de Lucas': { sapucai: 17, intendente: 19, zone: 'Leopoldina' },
  'Vigário Geral': { sapucai: 18, intendente: 20, zone: 'Leopoldina' },
  'Jardim América': { sapucai: 19, intendente: 21, zone: 'Leopoldina' },

  // Ilha do Governador
  'Ilha do Governador': { sapucai: 22, intendente: 23, zone: 'Ilha do Governador' },
  'Galeão': { sapucai: 19, intendente: 21, zone: 'Ilha do Governador' },
  'Cocotá': { sapucai: 24, intendente: 25, zone: 'Ilha do Governador' },

  // Zona Oeste (Padre Miguel, Bangu, etc.)
  'Padre Miguel': { sapucai: 32, intendente: 15, zone: 'Zona Oeste' },
  'Bangu': { sapucai: 35, intendente: 18, zone: 'Zona Oeste' },
  'Realengo': { sapucai: 29, intendente: 12, zone: 'Zona Oeste' },
  'Magalhães Bastos': { sapucai: 27, intendente: 10, zone: 'Zona Oeste' },
  'Deodoro': { sapucai: 25, intendente: 8, zone: 'Zona Oeste' },
  'Vila Militar': { sapucai: 26, intendente: 9, zone: 'Zona Oeste' },
  'Sulacap': { sapucai: 28, intendente: 8, zone: 'Zona Oeste' },
  'Campo Grande': { sapucai: 48, intendente: 32, zone: 'Zona Oeste Extrema' },
  'Santa Cruz': { sapucai: 56, intendente: 42, zone: 'Zona Oeste Extrema' },
  'Paciência': { sapucai: 52, intendente: 38, zone: 'Zona Oeste Extrema' },
  'Guaratiba': { sapucai: 50, intendente: 36, zone: 'Zona Oeste Extrema' },

  // Jacarepaguá & Barra
  'Jacarepaguá': { sapucai: 25, intendente: 9, zone: 'Jacarepaguá' },
  'Taquara': { sapucai: 26, intendente: 8, zone: 'Jacarepaguá' },
  'Freguesia': { sapucai: 22, intendente: 11, zone: 'Jacarepaguá' },
  'Praça Seca': { sapucai: 21, intendente: 4.5, zone: 'Jacarepaguá' },
  'Tanque': { sapucai: 24, intendente: 6, zone: 'Jacarepaguá' },
  'Curicica': { sapucai: 28, intendente: 11, zone: 'Jacarepaguá' },
  'Barra da Tijuca': { sapucai: 27, intendente: 22, zone: 'Barra da Tijuca' },
  'Recreio dos Bandeirantes': { sapucai: 38, intendente: 30, zone: 'Barra da Tijuca' },

  // Zona Sul
  'Botafogo': { sapucai: 8, intendente: 24, zone: 'Zona Sul' },
  'Copacabana': { sapucai: 11, intendente: 26, zone: 'Zona Sul' },
  'Ipanema': { sapucai: 13, intendente: 28, zone: 'Zona Sul' },
  'Leblon': { sapucai: 14, intendente: 29, zone: 'Zona Sul' },
  'Gávea': { sapucai: 13, intendente: 26, zone: 'Zona Sul' },
  'Flamengo': { sapucai: 5.5, intendente: 23, zone: 'Zona Sul' },
  'Laranjeiras': { sapucai: 5, intendente: 22, zone: 'Zona Sul' },

  // Baixada Fluminense
  'Nilópolis': { sapucai: 33, intendente: 18, zone: 'Baixada Fluminense' },
  'Duque de Caxias': { sapucai: 27, intendente: 20, zone: 'Baixada Fluminense' },
  'Nova Iguaçu': { sapucai: 39, intendente: 24, zone: 'Baixada Fluminense' },
  'São João de Meriti': { sapucai: 26, intendente: 15, zone: 'Baixada Fluminense' },
  'Belford Roxo': { sapucai: 35, intendente: 21, zone: 'Baixada Fluminense' },
  'Mesquita': { sapucai: 34, intendente: 19, zone: 'Baixada Fluminense' },
  'Queimados': { sapucai: 48, intendente: 33, zone: 'Baixada Fluminense' },
  'Magé': { sapucai: 58, intendente: 55, zone: 'Baixada Fluminense' },

  // Leste Fluminense (Ponte Rio-Niterói)
  'Niterói': { sapucai: 22, intendente: 36, zone: 'Leste Fluminense' },
  'São Gonçalo': { sapucai: 34, intendente: 47, zone: 'Leste Fluminense' },
  'Itaboraí': { sapucai: 56, intendente: 68, zone: 'Leste Fluminense' },
  'Maricá': { sapucai: 62, intendente: 75, zone: 'Leste Fluminense' }
};

export class LogisticsService {
  /**
   * Obtém a distância real estimada em km da quadra da escola até o local de desfile
   */
  public static getDistanceToVenue(
    neighborhood: string,
    division: DivisionId,
    originType?: 'rio_bairro' | 'outra_cidade',
    cityState?: string
  ): { distanceKm: number; venueName: string; venueType: 'sapucai' | 'intendente'; zone: string } {
    const isSapucai = division === 'especial' || division === 'ouro';
    const venueName = isSapucai ? 'Sambódromo Marquês de Sapucaí' : 'Estrada Intendente Magalhães';
    const venueType: 'sapucai' | 'intendente' = isSapucai ? 'sapucai' : 'intendente';

    // Se for de outra cidade / outro estado
    if (originType === 'outra_cidade' || (cityState && !cityState.toLowerCase().includes('rio de janeiro'))) {
      const city = (cityState || neighborhood).toLowerCase();
      let dist = 120;
      if (city.includes('são paulo') || city.includes('sp')) dist = 430;
      else if (city.includes('belo horizonte') || city.includes('mg')) dist = 440;
      else if (city.includes('florianópolis') || city.includes('sc')) dist = 1100;
      else if (city.includes('petrópolis') || city.includes('serrana')) dist = 68;
      else if (city.includes('cabo frio') || city.includes('lagos')) dist = 150;
      else if (city.includes('campos')) dist = 280;

      return {
        distanceKm: dist,
        venueName,
        venueType,
        zone: 'Outra Cidade / Interior'
      };
    }

    // Busca exata ou por substring no mapa de bairros
    const cleanBairro = (neighborhood || '').trim();
    let entry = NEIGHBORHOOD_DISTANCES[cleanBairro];

    if (!entry) {
      // Procura parcial
      const key = Object.keys(NEIGHBORHOOD_DISTANCES).find(
        (k) => cleanBairro.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(cleanBairro.toLowerCase())
      );
      if (key) entry = NEIGHBORHOOD_DISTANCES[key];
    }

    if (entry) {
      return {
        distanceKm: isSapucai ? entry.sapucai : entry.intendente,
        venueName,
        venueType,
        zone: entry.zone
      };
    }

    // Fallback razoável
    const fallbackDist = isSapucai ? 18 : 12;
    return {
      distanceKm: fallbackDist,
      venueName,
      venueType,
      zone: 'Região Metropolitana'
    };
  }

  /**
   * Calcula o relatório completo de logística e impacto de posição de desfile para a escola
   */
  public static calculateSchoolLogistics(
    school: School,
    slot?: SorteioSlot,
    totalSlotsInDay: number = 6
  ): SchoolLogisticsReport {
    const div = school.division;
    const { distanceKm, venueName, venueType, zone } = this.getDistanceToVenue(
      school.neighborhood,
      div,
      school.originType,
      school.cityState
    );

    // Contagem de componentes e alegorias
    const comp = school.paradeComposition;
    const componentesCount = comp?.componentes ?? (div === 'especial' ? 2800 : div === 'ouro' ? 1100 : div === 'prata' ? 750 : div === 'bronze' ? 600 : 400);
    const alegoriasCount = comp?.alegorias ?? (div === 'especial' ? 5 : div === 'ouro' ? 3 : div === 'prata' ? 3 : div === 'bronze' ? 2 : 1);
    const tripesCount = comp?.tripes ?? (div === 'especial' ? 2 : div === 'ouro' ? 1 : 0);

    // Frota necessária (capacidade média de 45 passageiros por ônibus de linha/fretamento)
    const busesNeeded = Math.ceil(componentesCount / 45);
    const trucksNeeded = Math.max(1, Math.ceil(componentesCount / 1200)) + 1; // caminhão de bateria e instrumentos

    // 1. GASTOS DO ENSAIO TÉCNICO (Dezembro/Janeiro)
    // O Ensaio Técnico mobiliza todos os componentes para reconhecimento de pista e som
    const custoOnibusEnsaio = busesNeeded * (650 + Math.round(distanceKm * 20));
    const custoBateriaEnsaio = trucksNeeded * (1200 + Math.round(distanceKm * 15));
    const custoAlimentacaoEnsaio = componentesCount * 12; // água, suco e sanduíche natural na concentração
    const totalEnsaioTecnico = custoOnibusEnsaio + custoBateriaEnsaio + custoAlimentacaoEnsaio;

    // 2. GASTOS DO DESFILE OFICIAL (Carnaval - Fevereiro)
    // O Desfile Oficial mobiliza comboio completo, batedores, reboque de chassis alegóricos pesados, apoio de armação e dispersão
    const custoOnibusDesfile = busesNeeded * (850 + Math.round(distanceKm * 28)); // tarifa noturna e espera prolongada
    
    // Transporte e reboque de carros alegóricos e tripés (reboques de madrugada com guincho e escolta)
    const custoPorAlegoria = 7500 + Math.round(distanceKm * 90);
    const custoPorTripe = 2500 + Math.round(distanceKm * 40);
    const custoAlegoriasDesfile = (alegoriasCount * custoPorAlegoria) + (tripesCount * custoPorTripe);

    // Apoio de concentração, armação de cabeçotes, dispersão e lanche
    const custoApoioConcentracao = 18000 + (alegoriasCount * 3000);
    const custoHidratacaoEquipe = componentesCount * 15; // hidratação pré-desfile e dispersão
    const totalDesfileOficial = custoOnibusDesfile + custoAlegoriasDesfile + custoApoioConcentracao + custoHidratacaoEquipe;

    const totalLogisticsCost = totalEnsaioTecnico + totalDesfileOficial;

    // Relação com o orçamento da escola (Budget Affordability)
    const budget = school.budget || 500000;
    const logisticsRatio = totalLogisticsCost / Math.max(100000, budget);

    let budgetAffordability: 'confortavel' | 'adequado' | 'apertado' | 'critico' = 'adequado';
    let logisticsEfficiencyPercent = 88;

    if (logisticsRatio < 0.18) {
      budgetAffordability = 'confortavel';
      logisticsEfficiencyPercent = 98; // Escola rica financia ônibus confortáveis, tendas com ar, hidratação plena
    } else if (logisticsRatio < 0.32) {
      budgetAffordability = 'adequado';
      logisticsEfficiencyPercent = 88;
    } else if (logisticsRatio < 0.50) {
      budgetAffordability = 'apertado';
      logisticsEfficiencyPercent = 75; // Faltam alguns ônibus, componentes viajam mais apertados
    } else {
      budgetAffordability = 'critico';
      logisticsEfficiencyPercent = 62; // Risco real de atraso no comboio ou falta de alimentação
    }

    // 3. ANÁLISE DA POSIÇÃO DE DESFILE E SEU IMPACTO NO DESEMPENHO
    const order = slot?.order ?? 2;
    const day = slot?.day;
    const dayLabel = slot?.dayLabel;

    let category: 'abertura' | 'horario_nobre' | 'intermediaria' | 'madrugada_amanhecer' = 'intermediaria';
    let orderTitle = `${order}ª Escola a Desfilar`;

    // Categorização da posição
    if (order === 1) {
      category = 'abertura';
      orderTitle = '1ª Escola (Abertura da Noite)';
    } else if (order === 2 || order === 3) {
      category = 'horario_nobre';
      orderTitle = `${order}ª Escola (Horário Nobre da Pista)`;
    } else if (order >= 5 || (order >= 4 && div === 'especial')) {
      category = 'madrugada_amanhecer';
      orderTitle = `${order}ª Escola (Madrugada / Encerramento ao Amanhecer)`;
    } else {
      category = 'intermediaria';
      orderTitle = `${order}ª Escola (Posição Intermediária)`;
    }

    // Cálculo dos Modificadores de Desempenho
    let evolucaoMod = 0;
    let harmoniaMod = 0;
    let bateriaMod = 0;
    let timeRiskMod = 0;
    let judgeStrictnessMod = 0;
    let fatigueRisk: 'baixo' | 'moderado' | 'alto' = 'baixo';

    const logisticsNotes: string[] = [];
    let positionImpactSummary = '';

    // Impacto da Abertura (Ordem 1)
    if (category === 'abertura') {
      judgeStrictnessMod = -1.5; // Jurados mais conservadores para "guardar nota"
      if (distanceKm > 20) {
        // Escola de longe abrindo o desfile: comboio deve sair às 16h no rush do trânsito
        fatigueRisk = 'moderado';
        evolucaoMod -= 2.0;
        harmoniaMod -= 1.5;
        timeRiskMod += 1.8;
        logisticsNotes.push(`Saída antecipada obrigatória da quadra (${distanceKm} km de distância): comboio enfrentará horário de pico nas vias expressas.`);
        positionImpactSummary = `Abertura oficial com pista ainda em aquecimento e jurados conservadores. Por vir de longe (${distanceKm} km), os componentes tiveram que se concentrar muito cedo, exigindo atenção redobrada no ritmo de evolução.`;
      } else {
        fatigueRisk = 'baixo';
        evolucaoMod -= 0.8;
        harmoniaMod -= 0.5;
        logisticsNotes.push(`Quadra próxima à passarela (${distanceKm} km): deslocamento rápido facilitou a concentração pontual para a abertura.`);
        positionImpactSummary = `Abertura oficial da noite: a agremiação encara a responsabilidade de acender a pista. Concentração tranquila devido à proximidade geográfica (${distanceKm} km).`;
      }
    }
    // Impacto do Horário Nobre (Ordens 2 e 3)
    else if (category === 'horario_nobre') {
      fatigueRisk = 'baixo';
      evolucaoMod += 2.2;
      harmoniaMod += 2.5;
      bateriaMod += 1.8;
      judgeStrictnessMod = 0.5; // Jurados no melhor nível de atenção e calor do público
      logisticsNotes.push(`Horário de desfile ideal: arquibancadas lotadas, temperatura amena da noite e intervalo de concentração perfeito para descanso e aquecimento.`);
      positionImpactSummary = `Posição privilegiada no ápice da noite! Pista aquecida, público empolgado e tempo perfeito para acomodação dos ${componentesCount} componentes. Potencializa o canto da harmonia e a pegada da bateria.`;
    }
    // Impacto da Madrugada / Amanhecer
    else if (category === 'madrugada_amanhecer') {
      // Longa espera na concentração (4 a 7 horas de espera)
      if (budgetAffordability === 'confortavel' || logisticsEfficiencyPercent >= 88) {
        // Logística impecável com muita água, tendas e suporte transforma a madrugada em apoteose mágica!
        fatigueRisk = 'moderado';
        harmoniaMod += 2.0;
        evolucaoMod += 1.2;
        bateriaMod += 0.8;
        logisticsNotes.push(`Longa vigília na concentração suportada com excelência por pontos de hidratação e alimentação da diretoria.`);
        positionImpactSummary = `Desfile ao clarear do dia! A agremiação superou as horas de espera graças à forte logística de hidratação e explodiu na passarela com o espetáculo inesquecível do sol nascente.`;
      } else {
        // Logística frágil sofrendo com fadiga de madrugada
        fatigueRisk = 'alto';
        evolucaoMod -= 3.2;
        harmoniaMod -= 2.2;
        bateriaMod -= 2.5;
        timeRiskMod += 2.5;
        logisticsNotes.push(`Alerta de fadiga: espera prolongada na armação provocou cansaço físico em baianas e ritmistas devido à limitação no suporte logístico.`);
        positionImpactSummary = `Desfile na alta madrugada sob desgaste físico severo. A longa espera na concentração sem estrutura suficiente pesou sobre os ritmistas e alas de comunidade, exigindo esforço titânico da harmonia.`;
      }
    }
    // Posição Intermediária
    else {
      fatigueRisk = 'baixo';
      evolucaoMod += 0.8;
      harmoniaMod += 1.0;
      positionImpactSummary = `Posição equilibrada na pista, com bom fluxo de concentração e passagem contínua sem sobressaltos logísticos.`;
    }

    // Ajuste fino pela distância geral
    if (distanceKm > 40) {
      logisticsNotes.push(`Grande distância geográfica (${distanceKm} km - ${zone}): custo logístico de R$ ${totalLogisticsCost.toLocaleString('pt-BR')} representa investimento expressivo da escola.`);
    } else {
      logisticsNotes.push(`Localização estratégica em ${zone} (${distanceKm} km): otimiza tempo de traslado dos chassis e componentes.`);
    }

    return {
      schoolId: school.id,
      schoolName: school.name,
      division: div,
      venueName,
      venueType,
      neighborhood: school.neighborhood,
      distanceKm,
      routeDescription: `Quadra em ${school.neighborhood} (${zone}) ➔ ${venueName} (${distanceKm} km)`,
      componentesCount,
      alegoriasCount,
      tripesCount,
      busesNeeded,
      trucksNeeded,
      ensaioTecnicoCosts: {
        transporteComponentes: custoOnibusEnsaio,
        transporteBateria: custoBateriaEnsaio,
        alimentacaoHidratacao: custoAlimentacaoEnsaio,
        total: totalEnsaioTecnico
      },
      desfileOficialCosts: {
        transporteComponentes: custoOnibusDesfile,
        transporteAlegoriasETripes: custoAlegoriasDesfile,
        apoioConcentracaoDispersao: custoApoioConcentracao,
        hidratacaoEquipe: custoHidratacaoEquipe,
        total: totalDesfileOficial
      },
      totalLogisticsCost,
      budgetAffordability,
      logisticsEfficiencyPercent,
      paradePosition: {
        day,
        dayLabel,
        order,
        totalInDay: totalSlotsInDay,
        category,
        orderTitle
      },
      positionImpactSummary,
      performanceModifiers: {
        evolucaoMod,
        harmoniaMod,
        bateriaMod,
        timeRiskMod,
        judgeStrictnessMod
      },
      fatigueRisk,
      logisticsNotes
    };
  }
}
