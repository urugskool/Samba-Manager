import { School, DivisionId } from '../types/carnaval';
import { SorteioSlot, ParadeDay } from '../types/sorteio';

export interface FleetBreakdown {
  busesComponentes: number; // Ônibus fretados para componentes, baianas e velha guarda
  trucksBateria: number; // Caminhões-baú com travas para instrumentos da bateria (surdos, caixas, repiques)
  trucksMateriaisEAderecos: number; // Caminhões para adereços de mão, tripés e chapelaria
  trucksAlegorias: number; // Carretas e pranchas de reboque de carros alegóricos
  supportVans: number; // Vans para diretoria, harmonia e apoio de emergência
  totalVehicles: number;
}

export interface ComparativeVenueAnalysis {
  currentVenue: 'sapucai' | 'intendente';
  currentDistanceKm: number;
  currentTotalCost: number;
  alternativeVenue: 'sapucai' | 'intendente';
  alternativeVenueName: string;
  alternativeDistanceKm: number;
  alternativeTotalCost: number;
  differenceCost: number; // positivo se a arena atual for mais cara, negativo se for mais barata
  differencePercent: number;
  insight: string;
}

export interface SchoolLogisticsReport {
  schoolId: string;
  schoolName: string;
  division: DivisionId;
  venueName: string;
  venueType: 'sapucai' | 'intendente';
  neighborhood: string;
  originCity: string;
  originZone: string;
  expressway: string;
  travelTimeMinutes: number;
  distanceKm: number;
  routeDescription: string;
  
  // Componentes e Frota Detalhada
  componentesCount: number;
  alegoriasCount: number;
  tripesCount: number;
  busesNeeded: number;
  trucksNeeded: number;
  fleetBreakdown: FleetBreakdown;

  // Gastos detalhados de locomoção e logística
  ensaioTecnicoCosts: {
    transporteComponentes: number;
    transporteBateria: number;
    transporteMateriais: number;
    pedagiosEEscolta: number;
    alimentacaoHidratacao: number;
    total: number;
  };

  desfileOficialCosts: {
    transporteComponentes: number;
    transporteBateria: number;
    transporteMateriais: number;
    transporteAlegoriasETripes: number;
    pedagiosEEscolta: number;
    apoioConcentracaoDispersao: number;
    hidratacaoEquipe: number;
    total: number;
  };

  totalLogisticsCost: number;
  budgetAffordability: 'confortavel' | 'adequado' | 'apertado' | 'critico';
  budgetImpactPercent: number; // percentual do orçamento consumido apenas com transporte
  logisticsEfficiencyPercent: number; // 60 a 100%

  // Comparativo Sapucaí vs Intendente
  comparativeVenue: ComparativeVenueAnalysis;

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

export interface NeighborhoodGeoRecord {
  sapucai: number;
  intendente: number;
  zone: string;
  city: string;
  expressway: string;
  tollsCostPerVehicle: number;
  hasPonteRioNiteroi?: boolean;
  terrainType: 'plano' | 'morro_acesso_dificil' | 'rodovia_interestadual';
}

/**
 * Tabela de Geolocalização Completa de Todos os Bairros e Cidades das 80+ Escolas do Rio de Janeiro
 * (Sapucaí = Marquês de Sapucaí / Centro | Intendente = Estrada Intendente Magalhães / Campinho / Madureira)
 */
export const NEIGHBORHOOD_GEODATA: Record<string, NeighborhoodGeoRecord> = {
  // Centro & Adjacências (Vizinhos Imediatos da Sapucaí)
  'Centro': { sapucai: 2, intendente: 20, zone: 'Centro', city: 'Rio de Janeiro', expressway: 'Av. Pres. Vargas ➔ Passarela', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Estácio': { sapucai: 2.2, intendente: 19, zone: 'Centro', city: 'Rio de Janeiro', expressway: 'Av. Salvador de Sá ➔ Setor 1', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Estácio / São Carlos': { sapucai: 2.2, intendente: 19, zone: 'Centro', city: 'Rio de Janeiro', expressway: 'Av. Salvador de Sá ➔ Praça Onze', tollsCostPerVehicle: 0, terrainType: 'morro_acesso_dificil' },
  'Catumbi': { sapucai: 1.8, intendente: 20, zone: 'Centro', city: 'Rio de Janeiro', expressway: 'Túnel Santa Bárbara ➔ Sambódromo', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Gamboa': { sapucai: 2.5, intendente: 21, zone: 'Portuária', city: 'Rio de Janeiro', expressway: 'Av. Rodrigues Alves ➔ Sambódromo', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Saúde': { sapucai: 2.8, intendente: 21, zone: 'Portuária', city: 'Rio de Janeiro', expressway: 'Via Binário do Porto ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Santo Cristo': { sapucai: 2.5, intendente: 20, zone: 'Portuária', city: 'Rio de Janeiro', expressway: 'Rua da América ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Lapa': { sapucai: 3.2, intendente: 20, zone: 'Centro', city: 'Rio de Janeiro', expressway: 'Av. Mem de Sá ➔ Frei Caneca', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Santa Teresa': { sapucai: 3.5, intendente: 21, zone: 'Centro', city: 'Rio de Janeiro', expressway: 'Rua Almirante Alexandrino ➔ Centro', tollsCostPerVehicle: 0, terrainType: 'morro_acesso_dificil' },
  'Catete': { sapucai: 4.5, intendente: 22, zone: 'Zona Sul', city: 'Rio de Janeiro', expressway: 'Aterro do Flamengo ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Catete / Santa Teresa': { sapucai: 4.5, intendente: 22, zone: 'Zona Sul', city: 'Rio de Janeiro', expressway: 'Aterro do Flamengo ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Glória': { sapucai: 4, intendente: 22, zone: 'Zona Sul', city: 'Rio de Janeiro', expressway: 'Aterro do Flamengo ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Rio Comprido': { sapucai: 3.5, intendente: 18, zone: 'Centro', city: 'Rio de Janeiro', expressway: 'Av. Paulo de Frontin ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },

  // Mangueira, Benfica & São Cristóvão
  'Mangueira': { sapucai: 4.5, intendente: 18, zone: 'Zona Norte', city: 'Rio de Janeiro', expressway: 'Radial Oeste ➔ Av. Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'morro_acesso_dificil' },
  'Morro da Mangueira': { sapucai: 4.5, intendente: 18, zone: 'Zona Norte', city: 'Rio de Janeiro', expressway: 'Radial Oeste ➔ Av. Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'morro_acesso_dificil' },
  'São Cristóvão': { sapucai: 4.2, intendente: 18, zone: 'Zona Norte', city: 'Rio de Janeiro', expressway: 'Campo de São Cristóvão ➔ Francisco Bicalho', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'São Cristóvão / Vasco da Gama': { sapucai: 4.5, intendente: 18, zone: 'Zona Norte', city: 'Rio de Janeiro', expressway: 'Rua General Almério de Moura ➔ Bicalho', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Benfica': { sapucai: 5.5, intendente: 17, zone: 'Zona Norte', city: 'Rio de Janeiro', expressway: 'Linha Vermelha ➔ Campo de Santana', tollsCostPerVehicle: 0, terrainType: 'plano' },

  // Grande Tijuca
  'Tijuca': { sapucai: 5.5, intendente: 16, zone: 'Grande Tijuca', city: 'Rio de Janeiro', expressway: 'Rua Conde de Bonfim ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Andaraí': { sapucai: 7, intendente: 15, zone: 'Grande Tijuca', city: 'Rio de Janeiro', expressway: 'Rua Barão de Mesquita ➔ Radial Oeste', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Andaraí / Tijuca': { sapucai: 6.8, intendente: 15, zone: 'Grande Tijuca', city: 'Rio de Janeiro', expressway: 'Rua Silva Teles ➔ Radial Oeste', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Morro do Salgueiro': { sapucai: 6.2, intendente: 15, zone: 'Grande Tijuca', city: 'Rio de Janeiro', expressway: 'Rua Silva Teles ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'morro_acesso_dificil' },
  'Morro do Salgueiro, Tijuca': { sapucai: 6.2, intendente: 15, zone: 'Grande Tijuca', city: 'Rio de Janeiro', expressway: 'Rua Silva Teles ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'morro_acesso_dificil' },
  'Morro da Formiga, Tijuca': { sapucai: 7.5, intendente: 15, zone: 'Grande Tijuca', city: 'Rio de Janeiro', expressway: 'Rua Conde de Bonfim ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'morro_acesso_dificil' },
  'Morro do Borel': { sapucai: 7.8, intendente: 15, zone: 'Grande Tijuca', city: 'Rio de Janeiro', expressway: 'Rua São Miguel ➔ Radial Oeste', tollsCostPerVehicle: 0, terrainType: 'morro_acesso_dificil' },
  'Vila Isabel': { sapucai: 6.5, intendente: 15, zone: 'Grande Tijuca', city: 'Rio de Janeiro', expressway: 'Boulevard 28 de Setembro ➔ Radial Oeste', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Grajaú': { sapucai: 8, intendente: 15, zone: 'Grande Tijuca', city: 'Rio de Janeiro', expressway: 'Rua Barão do Bom Retiro ➔ Radial Oeste', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Maracanã': { sapucai: 5, intendente: 16, zone: 'Grande Tijuca', city: 'Rio de Janeiro', expressway: 'Av. Maracanã ➔ Radial Oeste ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },

  // Subúrbio Central / Madureira & Entorno (Vizinhos da Intendente Magalhães!)
  'Madureira': { sapucai: 20, intendente: 1.5, zone: 'Subúrbio Central', city: 'Rio de Janeiro', expressway: 'Estrada do Portela ➔ Intendente Magalhães', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Morro da Serrinha, Madureira': { sapucai: 20, intendente: 1.8, zone: 'Subúrbio Central', city: 'Rio de Janeiro', expressway: 'Rua Min. Edgard Romero ➔ Intendente', tollsCostPerVehicle: 0, terrainType: 'morro_acesso_dificil' },
  'Serrinha': { sapucai: 20, intendente: 1.8, zone: 'Subúrbio Central', city: 'Rio de Janeiro', expressway: 'Rua Min. Edgard Romero ➔ Intendente', tollsCostPerVehicle: 0, terrainType: 'morro_acesso_dificil' },
  'Oswaldo Cruz': { sapucai: 21, intendente: 2.2, zone: 'Subúrbio Central', city: 'Rio de Janeiro', expressway: 'Rua Carolina Machado ➔ Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Madureira / Oswaldo Cruz': { sapucai: 20, intendente: 1.8, zone: 'Subúrbio Central', city: 'Rio de Janeiro', expressway: 'Estrada do Portela ➔ Intendente Magalhães', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Campinho': { sapucai: 19, intendente: 0.8, zone: 'Subúrbio Central', city: 'Rio de Janeiro', expressway: 'Estrada Intendente Magalhães Direta', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Cascadura': { sapucai: 18, intendente: 2.5, zone: 'Subúrbio Central', city: 'Rio de Janeiro', expressway: 'Av. Dom Hélder Câmara ➔ Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Vaz Lobo': { sapucai: 20, intendente: 2.8, zone: 'Subúrbio Central', city: 'Rio de Janeiro', expressway: 'Av. Min. Edgard Romero ➔ Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Rocha Miranda': { sapucai: 22, intendente: 3.5, zone: 'Subúrbio Central', city: 'Rio de Janeiro', expressway: 'Estrada do Barro Vermelho ➔ Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Bento Ribeiro': { sapucai: 23, intendente: 4.2, zone: 'Subúrbio Central', city: 'Rio de Janeiro', expressway: 'Estrada Henrique de Melo ➔ Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Marechal Hermes': { sapucai: 24, intendente: 5.5, zone: 'Subúrbio Central', city: 'Rio de Janeiro', expressway: 'Rua General Savaget ➔ Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Cavalcanti': { sapucai: 19, intendente: 3.5, zone: 'Subúrbio Central', city: 'Rio de Janeiro', expressway: 'Rua Padre Manuel da Nóbrega ➔ Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Quintino Bocaiúva': { sapucai: 17, intendente: 3.8, zone: 'Subúrbio Central', city: 'Rio de Janeiro', expressway: 'Rua Clarimundo de Melo ➔ Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Piedade': { sapucai: 16, intendente: 5, zone: 'Subúrbio Central', city: 'Rio de Janeiro', expressway: 'Av. Dom Hélder Câmara ➔ Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Vila Valqueire': { sapucai: 22, intendente: 2.5, zone: 'Subúrbio Central', city: 'Rio de Janeiro', expressway: 'Estrada Intendente Magalhães / Praça Seca', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Praça Seca': { sapucai: 21, intendente: 4.5, zone: 'Jacarepaguá', city: 'Rio de Janeiro', expressway: 'Rua Cândido Benício ➔ Intendente Magalhães', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Tanque': { sapucai: 24, intendente: 6, zone: 'Jacarepaguá', city: 'Rio de Janeiro', expressway: 'Rua Cândido Benício ➔ Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Tanque, Jacarepaguá': { sapucai: 24, intendente: 6, zone: 'Jacarepaguá', city: 'Rio de Janeiro', expressway: 'Rua Cândido Benício ➔ Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Freguesia': { sapucai: 22, intendente: 11, zone: 'Jacarepaguá', city: 'Rio de Janeiro', expressway: 'Linha Amarela ➔ Av. Brasil ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Curicica, Jacarepaguá': { sapucai: 28, intendente: 11, zone: 'Jacarepaguá', city: 'Rio de Janeiro', expressway: 'Transolímpica ➔ Linha Amarela / Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Taquara': { sapucai: 26, intendente: 8, zone: 'Jacarepaguá', city: 'Rio de Janeiro', expressway: 'Estrada dos Bandeirantes ➔ Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Cidade de Deus': { sapucai: 27, intendente: 11, zone: 'Jacarepaguá', city: 'Rio de Janeiro', expressway: 'Linha Amarela ➔ Av. Ayrton Senna', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Jacarepaguá': { sapucai: 25, intendente: 9, zone: 'Jacarepaguá', city: 'Rio de Janeiro', expressway: 'Linha Amarela ➔ Av. Brasil', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Anil': { sapucai: 24, intendente: 10, zone: 'Jacarepaguá', city: 'Rio de Janeiro', expressway: 'Linha Amarela ➔ Estr. de Jacarepaguá', tollsCostPerVehicle: 0, terrainType: 'plano' },

  // Zona Norte / Méier / Subúrbio da Linha Auxiliar
  'Engenho de Dentro': { sapucai: 13, intendente: 8, zone: 'Zona Norte', city: 'Rio de Janeiro', expressway: 'Linha Amarela ➔ Av. Brasil / Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Méier': { sapucai: 12, intendente: 9, zone: 'Zona Norte', city: 'Rio de Janeiro', expressway: 'Rua Dias da Cruz ➔ Radial Oeste', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Pilares': { sapucai: 15, intendente: 6, zone: 'Zona Norte', city: 'Rio de Janeiro', expressway: 'Av. Dom Hélder Câmara ➔ Intendente / Bicalho', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Abolição': { sapucai: 16, intendente: 5, zone: 'Zona Norte', city: 'Rio de Janeiro', expressway: 'Linha Amarela ➔ Dom Hélder Câmara', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Cachambi': { sapucai: 12, intendente: 9, zone: 'Zona Norte', city: 'Rio de Janeiro', expressway: 'Linha Amarela / Rua Honório ➔ Radial', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Engenho Novo': { sapucai: 10, intendente: 11, zone: 'Zona Norte', city: 'Rio de Janeiro', expressway: 'Rua 24 de Maio ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Sampaio': { sapucai: 11, intendente: 10, zone: 'Zona Norte', city: 'Rio de Janeiro', expressway: 'Rua 24 de Maio ➔ Radial Oeste', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Engenho da Rainha': { sapucai: 15, intendente: 7, zone: 'Zona Norte', city: 'Rio de Janeiro', expressway: 'Av. Pastor Martin Luther King Jr', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Inhaúma': { sapucai: 14, intendente: 8, zone: 'Zona Norte', city: 'Rio de Janeiro', expressway: 'Linha Amarela ➔ Av. Brasil', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Irajá': { sapucai: 18, intendente: 8, zone: 'Zona Norte', city: 'Rio de Janeiro', expressway: 'Av. Brasil ➔ Pres. Vargas / Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Vicente de Carvalho': { sapucai: 17, intendente: 5, zone: 'Zona Norte', city: 'Rio de Janeiro', expressway: 'Av. Pastor Martin Luther King Jr ➔ Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Lins de Vasconcelos': { sapucai: 11, intendente: 11, zone: 'Zona Norte', city: 'Rio de Janeiro', expressway: 'Grajaú-Jacarepaguá / Lins de Vasconcelos', tollsCostPerVehicle: 0, terrainType: 'morro_acesso_dificil' },
  'Morro do Jacarezinho': { sapucai: 9, intendente: 13, zone: 'Zona Norte', city: 'Rio de Janeiro', expressway: 'Av. Dom Hélder Câmara ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'morro_acesso_dificil' },
  'Ricardo de Albuquerque': { sapucai: 23, intendente: 6, zone: 'Subúrbio Central', city: 'Rio de Janeiro', expressway: 'Estrada Marechal Alencastro ➔ Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Parque Anchieta': { sapucai: 25, intendente: 8, zone: 'Subúrbio Norte', city: 'Rio de Janeiro', expressway: 'Estrada Marechal Alencastro ➔ Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Acari': { sapucai: 22, intendente: 9, zone: 'Subúrbio Norte', city: 'Rio de Janeiro', expressway: 'Av. Brasil ➔ Pres. Vargas / Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Complexo de Acari': { sapucai: 22, intendente: 9, zone: 'Subúrbio Norte', city: 'Rio de Janeiro', expressway: 'Av. Brasil ➔ Pres. Vargas / Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },

  // Leopoldina (Ramos, Penha, etc.)
  'Ramos': { sapucai: 11, intendente: 13, zone: 'Leopoldina', city: 'Rio de Janeiro', expressway: 'Av. Brasil ➔ Francisco Bicalho ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Olaria': { sapucai: 12, intendente: 14, zone: 'Leopoldina', city: 'Rio de Janeiro', expressway: 'Av. Brasil ➔ Francisco Bicalho', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Penha': { sapucai: 13, intendente: 15, zone: 'Leopoldina', city: 'Rio de Janeiro', expressway: 'Av. Brasil ➔ Linha Vermelha ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Penha Circular': { sapucai: 14, intendente: 16, zone: 'Leopoldina', city: 'Rio de Janeiro', expressway: 'Av. Brasil ➔ Francisco Bicalho', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Bonsucesso': { sapucai: 9, intendente: 14, zone: 'Leopoldina', city: 'Rio de Janeiro', expressway: 'Av. Brasil ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Brás de Pina': { sapucai: 15, intendente: 17, zone: 'Leopoldina', city: 'Rio de Janeiro', expressway: 'Av. Brasil ➔ Francisco Bicalho', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Cordovil': { sapucai: 16, intendente: 18, zone: 'Leopoldina', city: 'Rio de Janeiro', expressway: 'Av. Brasil ➔ Linha Vermelha', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Parada de Lucas': { sapucai: 17, intendente: 19, zone: 'Leopoldina', city: 'Rio de Janeiro', expressway: 'Av. Brasil ➔ Francisco Bicalho', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Vigário Geral': { sapucai: 18, intendente: 20, zone: 'Leopoldina', city: 'Rio de Janeiro', expressway: 'Av. Brasil ➔ Linha Vermelha', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Maré': { sapucai: 8, intendente: 15, zone: 'Leopoldina', city: 'Rio de Janeiro', expressway: 'Av. Brasil ➔ Linha Vermelha', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Manguinhos': { sapucai: 8, intendente: 15, zone: 'Leopoldina', city: 'Rio de Janeiro', expressway: 'Av. Brasil ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },

  // Ilha do Governador
  'Ilha do Governador': { sapucai: 22, intendente: 23, zone: 'Ilha do Governador', city: 'Rio de Janeiro', expressway: 'Estrada do Galeão ➔ Linha Vermelha', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Freguesia, Ilha do Governador': { sapucai: 23, intendente: 24, zone: 'Ilha do Governador', city: 'Rio de Janeiro', expressway: 'Estrada da Cacuia ➔ Linha Vermelha', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Tauá': { sapucai: 24, intendente: 25, zone: 'Ilha do Governador', city: 'Rio de Janeiro', expressway: 'Estrada do Dendê ➔ Linha Vermelha', tollsCostPerVehicle: 0, terrainType: 'plano' },

  // Zona Oeste (Padre Miguel, Bangu, Campo Grande, Santa Cruz)
  'Padre Miguel': { sapucai: 32, intendente: 15, zone: 'Zona Oeste', city: 'Rio de Janeiro', expressway: 'Av. Brasil ➔ Pres. Vargas / Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Vila Vintém, Padre Miguel': { sapucai: 32, intendente: 15, zone: 'Zona Oeste', city: 'Rio de Janeiro', expressway: 'Av. Brasil ➔ Pres. Vargas / Intendente', tollsCostPerVehicle: 0, terrainType: 'morro_acesso_dificil' },
  'Bangu': { sapucai: 35, intendente: 18, zone: 'Zona Oeste', city: 'Rio de Janeiro', expressway: 'Av. Brasil ➔ Pres. Vargas / Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Vila Kennedy': { sapucai: 38, intendente: 21, zone: 'Zona Oeste', city: 'Rio de Janeiro', expressway: 'Av. Brasil ➔ Pres. Vargas / Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Realengo': { sapucai: 29, intendente: 12, zone: 'Zona Oeste', city: 'Rio de Janeiro', expressway: 'Av. Brasil ➔ Pres. Vargas / Intendente', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Campo Grande': { sapucai: 48, intendente: 32, zone: 'Zona Oeste Extrema', city: 'Rio de Janeiro', expressway: 'Av. Cesário de Melo ➔ Av. Brasil', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Santa Cruz': { sapucai: 56, intendente: 42, zone: 'Zona Oeste Extrema', city: 'Rio de Janeiro', expressway: 'Av. Brasil Direta ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Paciência': { sapucai: 52, intendente: 38, zone: 'Zona Oeste Extrema', city: 'Rio de Janeiro', expressway: 'Av. Brasil ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Cosmos, Zona Oeste': { sapucai: 50, intendente: 35, zone: 'Zona Oeste Extrema', city: 'Rio de Janeiro', expressway: 'Av. Brasil ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Senador Vasconcelos': { sapucai: 46, intendente: 30, zone: 'Zona Oeste Extrema', city: 'Rio de Janeiro', expressway: 'Av. Brasil ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Barra da Tijuca': { sapucai: 27, intendente: 22, zone: 'Barra da Tijuca', city: 'Rio de Janeiro', expressway: 'Av. das Américas ➔ Autoestrada Lagoa-Barra', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Recreio dos Bandeirantes': { sapucai: 38, intendente: 30, zone: 'Barra da Tijuca', city: 'Rio de Janeiro', expressway: 'Av. das Américas ➔ Linha Amarela', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Vargem Grande': { sapucai: 44, intendente: 31, zone: 'Zona Oeste', city: 'Rio de Janeiro', expressway: 'Estrada dos Bandeirantes ➔ Transolímpica', tollsCostPerVehicle: 0, terrainType: 'plano' },

  // Zona Sul
  'Botafogo': { sapucai: 8, intendente: 24, zone: 'Zona Sul', city: 'Rio de Janeiro', expressway: 'Túnel Santa Bárbara ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Botafogo / Urca': { sapucai: 8.5, intendente: 24.5, zone: 'Zona Sul', city: 'Rio de Janeiro', expressway: 'Túnel Santa Bárbara ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Botafogo / Engenho de Dentro': { sapucai: 11, intendente: 16, zone: 'Zona Sul', city: 'Rio de Janeiro', expressway: 'Túnel Rebouças ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Morro Dona Marta, Botafogo': { sapucai: 7.5, intendente: 23, zone: 'Zona Sul', city: 'Rio de Janeiro', expressway: 'Túnel Santa Bárbara ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'morro_acesso_dificil' },
  'Copacabana': { sapucai: 11, intendente: 26, zone: 'Zona Sul', city: 'Rio de Janeiro', expressway: 'Túnel Novo / Rebouças ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Ipanema': { sapucai: 13, intendente: 28, zone: 'Zona Sul', city: 'Rio de Janeiro', expressway: 'Túnel Rebouças ➔ Radial Oeste ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Gávea': { sapucai: 13, intendente: 26, zone: 'Zona Sul', city: 'Rio de Janeiro', expressway: 'Autoestrada Lagoa-Barra / Rebouças', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Rocinha, São Conrado': { sapucai: 16, intendente: 24, zone: 'Zona Sul', city: 'Rio de Janeiro', expressway: 'Autoestrada Lagoa-Barra ➔ Rebouças', tollsCostPerVehicle: 0, terrainType: 'morro_acesso_dificil' },
  'Laranjeiras': { sapucai: 5, intendente: 22, zone: 'Zona Sul', city: 'Rio de Janeiro', expressway: 'Túnel Santa Bárbara ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },

  // Baixada Fluminense
  'Nilópolis': { sapucai: 33, intendente: 18, zone: 'Baixada Fluminense', city: 'Nilópolis', expressway: 'Via Light ➔ Av. Brasil ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Nilópolis, Baixada Fluminense': { sapucai: 33, intendente: 18, zone: 'Baixada Fluminense', city: 'Nilópolis', expressway: 'Via Light ➔ Av. Brasil ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Duque de Caxias': { sapucai: 27, intendente: 20, zone: 'Baixada Fluminense', city: 'Duque de Caxias', expressway: 'Rod. Washington Luís ➔ Linha Vermelha', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Centro de Caxias': { sapucai: 26, intendente: 21, zone: 'Baixada Fluminense', city: 'Duque de Caxias', expressway: 'Rod. Washington Luís ➔ Linha Vermelha', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Nova Iguaçu': { sapucai: 39, intendente: 24, zone: 'Baixada Fluminense', city: 'Nova Iguaçu', expressway: 'Rod. Pres. Dutra ➔ Linha Vermelha', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Corumbá, Nova Iguaçu': { sapucai: 43, intendente: 28, zone: 'Baixada Fluminense', city: 'Nova Iguaçu', expressway: 'Rod. Pres. Dutra ➔ Linha Vermelha', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'São João de Meriti': { sapucai: 26, intendente: 15, zone: 'Baixada Fluminense', city: 'São João de Meriti', expressway: 'Rod. Pres. Dutra ➔ Linha Vermelha / Av. Brasil', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Belford Roxo': { sapucai: 35, intendente: 21, zone: 'Baixada Fluminense', city: 'Belford Roxo', expressway: 'Rod. Pres. Dutra ➔ Linha Vermelha', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Mesquita': { sapucai: 34, intendente: 19, zone: 'Baixada Fluminense', city: 'Mesquita', expressway: 'Via Light ➔ Av. Brasil', tollsCostPerVehicle: 0, terrainType: 'plano' },
  'Chatuba': { sapucai: 34, intendente: 19, zone: 'Baixada Fluminense', city: 'Mesquita', expressway: 'Via Light ➔ Av. Brasil ➔ Pres. Vargas', tollsCostPerVehicle: 0, terrainType: 'plano' },

  // Leste Fluminense (Cruzam a Ponte Rio-Niterói!)
  'Niterói': { sapucai: 22, intendente: 36, zone: 'Leste Fluminense', city: 'Niterói', expressway: 'Ponte Rio-Niterói ➔ Av. Rodrigues Alves', tollsCostPerVehicle: 14, hasPonteRioNiteroi: true, terrainType: 'plano' },
  'Barreto, Niterói': { sapucai: 21, intendente: 35, zone: 'Leste Fluminense', city: 'Niterói', expressway: 'Ponte Rio-Niterói ➔ Av. Brasil ➔ Pres. Vargas', tollsCostPerVehicle: 14, hasPonteRioNiteroi: true, terrainType: 'plano' },
  'Cubango, Niterói': { sapucai: 25, intendente: 39, zone: 'Leste Fluminense', city: 'Niterói', expressway: 'Ponte Rio-Niterói ➔ Alameda São Boaventura', tollsCostPerVehicle: 14, hasPonteRioNiteroi: true, terrainType: 'morro_acesso_dificil' },
  'Largo da Batalha': { sapucai: 29, intendente: 42, zone: 'Leste Fluminense', city: 'Niterói', expressway: 'Ponte Rio-Niterói ➔ Estrada da Cachoeira', tollsCostPerVehicle: 14, hasPonteRioNiteroi: true, terrainType: 'morro_acesso_dificil' },
  'São Gonçalo': { sapucai: 34, intendente: 47, zone: 'Leste Fluminense', city: 'São Gonçalo', expressway: 'Rod. Niterói-Manilha (BR-101) ➔ Ponte Rio-Niterói', tollsCostPerVehicle: 14, hasPonteRioNiteroi: true, terrainType: 'plano' },
  'Maricá, Região dos Lagos': { sapucai: 62, intendente: 75, zone: 'Leste Fluminense', city: 'Maricá', expressway: 'Rod. Amaral Peixoto (RJ-106) ➔ Ponte Rio-Niterói', tollsCostPerVehicle: 14, hasPonteRioNiteroi: true, terrainType: 'rodovia_interestadual' },

  // Cidades do Interior / Outros Polos
  'Petrópolis, RJ': { sapucai: 68, intendente: 62, zone: 'Região Serrana', city: 'Petrópolis', expressway: 'Rod. Washington Luís (BR-040) ➔ Linha Vermelha', tollsCostPerVehicle: 28, terrainType: 'rodovia_interestadual' },
  'Porto de Itaguaí': { sapucai: 68, intendente: 52, zone: 'Costa Verde', city: 'Itaguaí', expressway: 'Rod. Rio-Santos (BR-101) ➔ Av. Brasil', tollsCostPerVehicle: 0, terrainType: 'rodovia_interestadual' }
};

export class LogisticsService {
  /**
   * Reconhece com precisão geográfica o bairro, município e rota da sede da agremiação
   */
  public static getGeolocatedRecord(
    neighborhood: string,
    cityState?: string
  ): NeighborhoodGeoRecord {
    const raw = (neighborhood || '').trim();

    // 1. Procura exata
    if (NEIGHBORHOOD_GEODATA[raw]) {
      return NEIGHBORHOOD_GEODATA[raw];
    }

    // 2. Procura com strip de pontuação e case insensitive
    const lower = raw.toLowerCase();
    for (const [key, val] of Object.entries(NEIGHBORHOOD_GEODATA)) {
      const keyLower = key.toLowerCase();
      if (keyLower === lower) return val;
      if (lower.includes(keyLower) || keyLower.includes(lower)) return val;
    }

    // 3. Procura por palavras-chave de bairros/municípios conhecidos
    if (lower.includes('niterói') || lower.includes('niteroi') || lower.includes('barreto') || lower.includes('cubango')) {
      return NEIGHBORHOOD_GEODATA['Niterói'];
    }
    if (lower.includes('são gonçalo') || lower.includes('sao goncalo') || lower.includes('porto da pedra')) {
      return NEIGHBORHOOD_GEODATA['São Gonçalo'];
    }
    if (lower.includes('nilópolis') || lower.includes('nilopolis') || lower.includes('beija-flor')) {
      return NEIGHBORHOOD_GEODATA['Nilópolis'];
    }
    if (lower.includes('caxias') || lower.includes('grande rio')) {
      return NEIGHBORHOOD_GEODATA['Duque de Caxias'];
    }
    if (lower.includes('nova iguaçu') || lower.includes('nova iguacu')) {
      return NEIGHBORHOOD_GEODATA['Nova Iguaçu'];
    }
    if (lower.includes('belford roxo')) {
      return NEIGHBORHOOD_GEODATA['Belford Roxo'];
    }
    if (lower.includes('mesquita') || lower.includes('chatuba')) {
      return NEIGHBORHOOD_GEODATA['Mesquita'];
    }
    if (lower.includes('madureira') || lower.includes('serrinha') || lower.includes('portela') || lower.includes('império serrano')) {
      return NEIGHBORHOOD_GEODATA['Madureira'];
    }
    if (lower.includes('padre miguel') || lower.includes('vintém') || lower.includes('mocidade')) {
      return NEIGHBORHOOD_GEODATA['Padre Miguel'];
    }
    if (lower.includes('tijuca') || lower.includes('salgueiro') || lower.includes('andaraí') || lower.includes('borel')) {
      return NEIGHBORHOOD_GEODATA['Tijuca'];
    }
    if (lower.includes('mangueira')) {
      return NEIGHBORHOOD_GEODATA['Mangueira'];
    }
    if (lower.includes('ilha do governador')) {
      return NEIGHBORHOOD_GEODATA['Ilha do Governador'];
    }
    if (lower.includes('campo grande')) {
      return NEIGHBORHOOD_GEODATA['Campo Grande'];
    }
    if (lower.includes('santa cruz')) {
      return NEIGHBORHOOD_GEODATA['Santa Cruz'];
    }
    if (lower.includes('bangu')) {
      return NEIGHBORHOOD_GEODATA['Bangu'];
    }

    // Se for de outra cidade / outro estado especificado em cityState
    if (cityState && !cityState.toLowerCase().includes('rio de janeiro')) {
      const city = cityState.toLowerCase();
      let distSapucai = 140;
      let distIntendente = 135;
      let tolls = 45;
      if (city.includes('são paulo') || city.includes('sp')) {
        distSapucai = 435;
        distIntendente = 420;
        tolls = 85;
      } else if (city.includes('petrópolis') || city.includes('petropolis')) {
        return NEIGHBORHOOD_GEODATA['Petrópolis, RJ'];
      }

      return {
        sapucai: distSapucai,
        intendente: distIntendente,
        zone: 'Outra Cidade / Interior',
        city: cityState,
        expressway: 'Rodovia Interestadual ➔ Vias Expressas',
        tollsCostPerVehicle: tolls,
        terrainType: 'rodovia_interestadual'
      };
    }

    // Fallback metropolitano realista
    return {
      sapucai: 18,
      intendente: 12,
      zone: 'Região Metropolitana',
      city: 'Rio de Janeiro',
      expressway: 'Av. Brasil ➔ Vias Principais',
      tollsCostPerVehicle: 0,
      terrainType: 'plano'
    };
  }

  /**
   * Obtém a distância real estimada em km da quadra da escola até o local de desfile
   */
  public static getDistanceToVenue(
    neighborhood: string,
    division: DivisionId,
    originType?: 'rio_bairro' | 'outra_cidade',
    cityState?: string
  ): {
    distanceKm: number;
    venueName: string;
    venueType: 'sapucai' | 'intendente';
    zone: string;
    city: string;
    expressway: string;
    tollsCostPerVehicle: number;
    hasPonteRioNiteroi: boolean;
    travelTimeMinutes: number;
  } {
    const isSapucai = division === 'especial' || division === 'ouro';
    const venueName = isSapucai ? 'Sambódromo Marquês de Sapucaí' : 'Passarela da Estrada Intendente Magalhães';
    const venueType: 'sapucai' | 'intendente' = isSapucai ? 'sapucai' : 'intendente';

    const geo = this.getGeolocatedRecord(neighborhood, cityState);
    const distanceKm = isSapucai ? geo.sapucai : geo.intendente;

    // Tempo estimado com comboio pesado e batedores (média de 35 km/h em vias expressas + parada de armação)
    const baseMinutes = Math.round((distanceKm / 35) * 60) + 15;
    const travelTimeMinutes = geo.terrainType === 'morro_acesso_dificil' ? baseMinutes + 20 : baseMinutes;

    return {
      distanceKm,
      venueName,
      venueType,
      zone: geo.zone,
      city: geo.city,
      expressway: geo.expressway,
      tollsCostPerVehicle: geo.tollsCostPerVehicle,
      hasPonteRioNiteroi: Boolean(geo.hasPonteRioNiteroi),
      travelTimeMinutes
    };
  }

  /**
   * Calcula o relatório completo de logística, frota e impacto financeiro
   */
  public static calculateSchoolLogistics(
    school: School,
    slot?: SorteioSlot,
    totalSlotsInDay: number = 6
  ): SchoolLogisticsReport {
    const div = school.division;
    const isSapucai = div === 'especial' || div === 'ouro';
    const currentVenueType: 'sapucai' | 'intendente' = isSapucai ? 'sapucai' : 'intendente';

    const currentGeo = this.getDistanceToVenue(
      school.neighborhood,
      div,
      school.originType,
      school.cityState
    );

    // Contagem de componentes e contingente da escola
    const comp = school.paradeComposition;
    const componentesCount = comp?.componentes ?? (div === 'especial' ? 3000 : div === 'ouro' ? 1400 : div === 'prata' ? 850 : div === 'bronze' ? 650 : 450);
    const alegoriasCount = comp?.alegorias ?? (div === 'especial' ? 5 : div === 'ouro' ? 3 : div === 'prata' ? 3 : div === 'bronze' ? 2 : 1);
    const tripesCount = comp?.tripes ?? (div === 'especial' ? 2 : div === 'ouro' ? 1 : 0);

    // Dimensionamento técnico da frota:
    // 1. Ônibus fretados para componentes (baianas, velha guarda, passistas e alas de comunidade)
    const busesNeeded = Math.ceil(componentesCount / 45);

    // 2. Caminhões-baú com travamento especial para os instrumentos da bateria
    // (surdos de 1ª, 2ª e 3ª, caixas de guerra, repiques, tamborins, chocalhos, agogôs, cuícas)
    const trucksBateria = div === 'especial' ? 2 : 1;

    // 3. Caminhões para outros materiais (adereços de mão das alas, tripés, bandeiras, chapelaria)
    const trucksMateriaisEAderecos = div === 'especial' ? 3 : div === 'ouro' ? 2 : 1;

    // 4. Carretas e pranchas de reboque de chassis pesados de alegorias
    const trucksAlegorias = alegoriasCount;

    // 5. Vans de apoio para harmonia, diretoria e emergência
    const supportVans = div === 'especial' ? 4 : div === 'ouro' ? 2 : 1;

    const totalVehicles = busesNeeded + trucksBateria + trucksMateriaisEAderecos + trucksAlegorias + supportVans;

    const fleetBreakdown: FleetBreakdown = {
      busesComponentes: busesNeeded,
      trucksBateria,
      trucksMateriaisEAderecos,
      trucksAlegorias,
      supportVans,
      totalVehicles
    };

    const dist = currentGeo.distanceKm;

    // ========================================================
    // 1. GASTOS DO ENSAIO TÉCNICO NA PASSARELA (DEZEMBRO / JANEIRO)
    // ========================================================
    // Ônibus de componentes para o ensaio técnico
    const custoOnibusEnsaio = busesNeeded * (700 + Math.round(dist * 22));

    // Caminhões para levar instrumentos da bateria no ensaio
    const custoBateriaEnsaio = trucksBateria * (1400 + Math.round(dist * 18));

    // Caminhões para outros materiais leves do ensaio
    const custoMateriaisEnsaio = trucksMateriaisEAderecos * (900 + Math.round(dist * 14));

    // Pedágios e escolta
    const custoPedagioEnsaio = (busesNeeded + trucksBateria + trucksMateriaisEAderecos) * (currentGeo.tollsCostPerVehicle * 2);

    // Alimentação e hidratação na concentração
    const custoAlimentacaoEnsaio = Math.round(componentesCount * 14);

    const totalEnsaioTecnico = custoOnibusEnsaio + custoBateriaEnsaio + custoMateriaisEnsaio + custoPedagioEnsaio + custoAlimentacaoEnsaio;

    // ========================================================
    // 2. GASTOS DO DESFILE OFICIAL DE CARNAVAL (FEVEREIRO)
    // ========================================================
    // Frota de ônibus noturna para o desfile com espera prolongada e manobra na dispersão
    const custoOnibusDesfile = busesNeeded * (950 + Math.round(dist * 32));

    // Caminhões para levar instrumentos da bateria no desfile oficial (segurança redobrada)
    const custoBateriaDesfile = trucksBateria * (1800 + Math.round(dist * 26));

    // Caminhões para levar outros materiais (adereços de mão das alas, tripés, bandeiras)
    const custoMateriaisDesfile = trucksMateriaisEAderecos * (1400 + Math.round(dist * 22));

    // Reboque e comboio de carros alegóricos e tripés
    const custoPorAlegoria = 8500 + Math.round(dist * 95);
    const custoPorTripe = 2800 + Math.round(dist * 45);
    const custoAlegoriasDesfile = (alegoriasCount * custoPorAlegoria) + (tripesCount * custoPorTripe);

    // Pedágios de ida e volta e batedores de trânsito para comboio
    const custoPedagiosDesfile = totalVehicles * (currentGeo.tollsCostPerVehicle * 2) + (dist > 30 ? 4500 : 1500);

    // Apoio de concentração, armação de cabeçotes, dispersão e guincho de emergência
    const custoApoioConcentracao = 20000 + (alegoriasCount * 3500);

    // Hidratação e alimentação dos componentes antes e depois do desfile
    const custoHidratacaoEquipe = Math.round(componentesCount * 18);

    const totalDesfileOficial = custoOnibusDesfile + custoBateriaDesfile + custoMateriaisDesfile + custoAlegoriasDesfile + custoPedagiosDesfile + custoApoioConcentracao + custoHidratacaoEquipe;

    const totalLogisticsCost = totalEnsaioTecnico + totalDesfileOficial;

    // Relação com o orçamento da escola (Impacto Financeiro)
    const budget = Math.max(100000, school.budget || 500000);
    const budgetImpactPercent = Math.min(100, Number(((totalLogisticsCost / budget) * 100).toFixed(1)));
    const logisticsRatio = totalLogisticsCost / budget;

    let budgetAffordability: 'confortavel' | 'adequado' | 'apertado' | 'critico' = 'adequado';
    let logisticsEfficiencyPercent = 88;

    if (logisticsRatio < 0.15) {
      budgetAffordability = 'confortavel';
      logisticsEfficiencyPercent = 98;
    } else if (logisticsRatio < 0.28) {
      budgetAffordability = 'adequado';
      logisticsEfficiencyPercent = 88;
    } else if (logisticsRatio < 0.45) {
      budgetAffordability = 'apertado';
      logisticsEfficiencyPercent = 75;
    } else {
      budgetAffordability = 'critico';
      logisticsEfficiencyPercent = 60;
    }

    // ========================================================
    // 3. COMPARATIVO SAPUCAÍ VS INTENDENTE MAGALHÃES
    // ========================================================
    const alternativeVenueType: 'sapucai' | 'intendente' = isSapucai ? 'intendente' : 'sapucai';
    const altGeo = this.getGeolocatedRecord(school.neighborhood, school.cityState);
    const altDistanceKm = isSapucai ? altGeo.intendente : altGeo.sapucai;
    const alternativeVenueName = isSapucai ? 'Passarela da Estrada Intendente Magalhães' : 'Sambódromo Marquês de Sapucaí';

    // Custo estimado na arena alternativa
    const ratioAlt = (altDistanceKm + 5) / (dist + 5);
    const altTotalCost = Math.round(totalLogisticsCost * (0.65 + 0.35 * ratioAlt));
    const differenceCost = totalLogisticsCost - altTotalCost;
    const differencePercent = Number(((differenceCost / Math.max(1, altTotalCost)) * 100).toFixed(1));

    let compInsight = '';
    if (isSapucai) {
      if (dist > altDistanceKm) {
        compInsight = `Por sediar-se em ${school.neighborhood} (${currentGeo.zone}), a escola gasta R$ ${Math.abs(differenceCost).toLocaleString('pt-BR')} a mais desfilando na Sapucaí (${dist} km) em comparação com a Intendente (${altDistanceKm} km), demandando maior folga de caixa para translado.`;
      } else {
        compInsight = `A quadra em ${school.neighborhood} fica estrategicamente mais próxima da Sapucaí (${dist} km) do que da Intendente (${altDistanceKm} km), poupando R$ ${Math.abs(differenceCost).toLocaleString('pt-BR')} em custos de combustível e fretamento de frota.`;
      }
    } else {
      if (altDistanceKm > dist) {
        compInsight = `Desfilando na Intendente Magalhães (${dist} km), a agremiação economiza R$ ${Math.abs(differenceCost).toLocaleString('pt-BR')} em relação à Sapucaí (${altDistanceKm} km). Uma eventual ascensão de divisão exigirá incremento substancial nas despesas de transporte.`;
      } else {
        compInsight = `A quadra está mais próxima do Centro/Sapucaí (${altDistanceKm} km) do que da Intendente (${dist} km), gerando sobrecusto logístico na divisão atual.`;
      }
    }

    const comparativeVenue: ComparativeVenueAnalysis = {
      currentVenue: currentVenueType,
      currentDistanceKm: dist,
      currentTotalCost: totalLogisticsCost,
      alternativeVenue: alternativeVenueType,
      alternativeVenueName,
      alternativeDistanceKm: altDistanceKm,
      alternativeTotalCost: altTotalCost,
      differenceCost,
      differencePercent,
      insight: compInsight
    };

    // ========================================================
    // 4. POSIÇÃO DE DESFILE E SEUS EFEITOS DE PISTA
    // ========================================================
    const order = slot?.order ?? 2;
    const day = slot?.day;
    const dayLabel = slot?.dayLabel;

    let category: 'abertura' | 'horario_nobre' | 'intermediaria' | 'madrugada_amanhecer' = 'intermediaria';
    let orderTitle = `${order}ª Escola a Desfilar`;

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

    let evolucaoMod = 0;
    let harmoniaMod = 0;
    let bateriaMod = 0;
    let timeRiskMod = 0;
    let judgeStrictnessMod = 0;
    let fatigueRisk: 'baixo' | 'moderado' | 'alto' = 'baixo';

    const logisticsNotes: string[] = [];
    let positionImpactSummary = '';

    if (category === 'abertura') {
      judgeStrictnessMod = -1.5;
      if (dist > 25) {
        fatigueRisk = 'moderado';
        evolucaoMod -= 2.0;
        harmoniaMod -= 1.5;
        timeRiskMod += 1.8;
        logisticsNotes.push(`Saída antecipada obrigatória da quadra (${dist} km de distância): frota enfrentará horário de pico nas vias expressas.`);
        positionImpactSummary = `Abertura oficial com pista ainda em aquecimento e jurados conservadores. Por vir de ${school.neighborhood} (${dist} km), os componentes tiveram que se concentrar muito cedo, exigindo atenção redobrada no ritmo de evolução.`;
      } else {
        fatigueRisk = 'baixo';
        evolucaoMod -= 0.8;
        harmoniaMod -= 0.5;
        logisticsNotes.push(`Quadra próxima à passarela (${dist} km): deslocamento rápido facilitou a concentração pontual para a abertura.`);
        positionImpactSummary = `Abertura oficial da noite: a agremiação encara a responsabilidade de acender a pista. Concentração tranquila devido à proximidade geográfica (${dist} km).`;
      }
    } else if (category === 'horario_nobre') {
      fatigueRisk = 'baixo';
      evolucaoMod += 2.2;
      harmoniaMod += 2.5;
      bateriaMod += 1.8;
      judgeStrictnessMod = 0.5;
      logisticsNotes.push(`Horário de desfile ideal: arquibancadas lotadas, temperatura amena da noite e intervalo de concentração perfeito para descanso e aquecimento.`);
      positionImpactSummary = `Posição privilegiada no ápice da noite! Pista aquecida, público empolgado e tempo perfeito para acomodação dos ${componentesCount.toLocaleString('pt-BR')} componentes. Potencializa o canto da harmonia e a pegada da bateria.`;
    } else if (category === 'madrugada_amanhecer') {
      if (budgetAffordability === 'confortavel' || logisticsEfficiencyPercent >= 88) {
        fatigueRisk = 'moderado';
        harmoniaMod += 2.0;
        evolucaoMod += 1.2;
        bateriaMod += 0.8;
        logisticsNotes.push(`Longa vigília na concentração suportada com excelência por pontos de hidratação e alimentação da diretoria.`);
        positionImpactSummary = `Desfile ao clarear do dia! A agremiação superou as horas de espera graças à forte logística de hidratação e explodiu na passarela com o espetáculo inesquecível do sol nascente.`;
      } else {
        fatigueRisk = 'alto';
        evolucaoMod -= 3.2;
        harmoniaMod -= 2.2;
        bateriaMod -= 2.5;
        timeRiskMod += 2.5;
        logisticsNotes.push(`Alerta de fadiga: espera prolongada na armação provocou cansaço físico em baianas e ritmistas devido à limitação no suporte logístico.`);
        positionImpactSummary = `Desfile na alta madrugada sob desgaste físico severo. A longa espera na concentração sem estrutura suficiente pesou sobre os ritmistas e alas de comunidade, exigindo esforço titânico da harmonia.`;
      }
    } else {
      fatigueRisk = 'baixo';
      evolucaoMod += 0.8;
      harmoniaMod += 1.0;
      positionImpactSummary = `Posição equilibrada na pista, com bom fluxo de concentração e passagem contínua sem sobressaltos logísticos.`;
    }

    if (dist > 35) {
      logisticsNotes.push(`Grande distância da sede (${dist} km em ${currentGeo.zone}): despesa de transporte de R$ ${totalLogisticsCost.toLocaleString('pt-BR')} consome ${budgetImpactPercent}% do orçamento anual.`);
    } else {
      logisticsNotes.push(`Sede bem posicionada em ${school.neighborhood} (${dist} km): agilidade operacional e menor custo de combustível.`);
    }

    if (currentGeo.hasPonteRioNiteroi) {
      logisticsNotes.push(`Travessia obrigatória da Ponte Rio-Niterói: pedágio para ${totalVehicles} veículos e escolta da Polícia Rodoviária Federal.`);
    }

    return {
      schoolId: school.id,
      schoolName: school.name,
      division: div,
      venueName: currentGeo.venueName,
      venueType: currentGeo.venueType,
      neighborhood: school.neighborhood,
      originCity: currentGeo.city,
      originZone: currentGeo.zone,
      expressway: currentGeo.expressway,
      travelTimeMinutes: currentGeo.travelTimeMinutes,
      distanceKm: dist,
      routeDescription: `Quadra em ${school.neighborhood} (${currentGeo.city} • ${currentGeo.zone}) ➔ ${currentGeo.venueName} (${dist} km via ${currentGeo.expressway})`,
      componentesCount,
      alegoriasCount,
      tripesCount,
      busesNeeded,
      trucksNeeded: trucksBateria + trucksMateriaisEAderecos,
      fleetBreakdown,
      ensaioTecnicoCosts: {
        transporteComponentes: custoOnibusEnsaio,
        transporteBateria: custoBateriaEnsaio,
        transporteMateriais: custoMateriaisEnsaio,
        pedagiosEEscolta: custoPedagioEnsaio,
        alimentacaoHidratacao: custoAlimentacaoEnsaio,
        total: totalEnsaioTecnico
      },
      desfileOficialCosts: {
        transporteComponentes: custoOnibusDesfile,
        transporteBateria: custoBateriaDesfile,
        transporteMateriais: custoMateriaisDesfile,
        transporteAlegoriasETripes: custoAlegoriasDesfile,
        pedagiosEEscolta: custoPedagiosDesfile,
        apoioConcentracaoDispersao: custoApoioConcentracao,
        hidratacaoEquipe: custoHidratacaoEquipe,
        total: totalDesfileOficial
      },
      totalLogisticsCost,
      budgetAffordability,
      budgetImpactPercent,
      logisticsEfficiencyPercent,
      comparativeVenue,
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
