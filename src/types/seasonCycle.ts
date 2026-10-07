export type SeasonMonthId =
  | 'marco'
  | 'abril'
  | 'maio'
  | 'junho'
  | 'julho'
  | 'agosto'
  | 'setembro'
  | 'outubro'
  | 'novembro'
  | 'dezembro'
  | 'janeiro'
  | 'fevereiro';

export interface SeasonPeriodConfig {
  id: SeasonMonthId;
  monthIndex: number; // 0 to 11
  name: string; // 'Março', 'Abril', etc.
  shortName: string; // 'MAR', 'ABR', etc.
  activityTitle: string; // 'Avaliação da temporada anterior', etc.
  description: string;
  focusTab: string; // 'dashboard', 'financas', 'equipe', 'barracao', 'sorteio', 'ensaios', 'desfile', 'apuracao', 'campeas'
  actionButtonLabel: string;
  icon: string;
  phaseCategory: 'planejamento' | 'preparacao' | 'ensaio' | 'execucao';
}

export interface SeasonCycleState {
  currentMonth: SeasonMonthId;
  completedMonths: SeasonMonthId[];
  logs: {
    month: SeasonMonthId;
    title: string;
    text: string;
    timestamp: string;
  }[];
}
