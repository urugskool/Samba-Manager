import { DivisionId } from './carnaval';

export type ParadeDay =
  | 'sexta' // Sexta-feira de Carnaval (Série Ouro - Noite 1)
  | 'sabado' // Sábado de Carnaval (Série Bronze - Noite 1 & Série Ouro - Noite 2)
  | 'domingo' // Domingo de Carnaval (Série Bronze - Noite 2 & Grupo Especial - Noite 1)
  | 'segunda' // Segunda-feira de Carnaval (Série Prata - Noite 1 & Grupo Especial - Noite 2)
  | 'terca' // Terça-feira de Carnaval (Série Prata - Noite 2 & Grupo Especial - Noite 3)
  | 'quarta_cinzas'; // Quarta-feira de Cinzas (Grupo de Avaliação)

export interface ParadeDayInfo {
  id: ParadeDay;
  label: string;
  shortLabel: string;
  dateDescription: string;
  divisions: DivisionId[];
  order: number;
}

export const PARADE_DAYS_ORDER: ParadeDayInfo[] = [
  {
    id: 'sexta',
    label: 'Sexta-Feira de Carnaval',
    shortLabel: 'Sexta',
    dateDescription: 'Abertura oficial na Marquês de Sapucaí • Série Ouro (Noite 1)',
    divisions: ['ouro'],
    order: 1
  },
  {
    id: 'sabado',
    label: 'Sábado de Carnaval',
    shortLabel: 'Sábado',
    dateDescription: 'Intendente Magalhães (Série Bronze 1) & Sapucaí (Série Ouro 2)',
    divisions: ['bronze', 'ouro'],
    order: 2
  },
  {
    id: 'domingo',
    label: 'Domingo de Carnaval',
    shortLabel: 'Domingo',
    dateDescription: 'Intendente Magalhães (Série Bronze 2) & Sapucaí (Grupo Especial 1)',
    divisions: ['bronze', 'especial'],
    order: 3
  },
  {
    id: 'segunda',
    label: 'Segunda-Feira de Carnaval',
    shortLabel: 'Segunda',
    dateDescription: 'Intendente Magalhães (Série Prata 1) & Sapucaí (Grupo Especial 2)',
    divisions: ['prata', 'especial'],
    order: 4
  },
  {
    id: 'terca',
    label: 'Terça-Feira de Carnaval',
    shortLabel: 'Terça',
    dateDescription: 'Intendente Magalhães (Série Prata 2) & Sapucaí (Grupo Especial 3)',
    divisions: ['prata', 'especial'],
    order: 5
  },
  {
    id: 'quarta_cinzas',
    label: 'Quarta-Feira de Cinzas',
    shortLabel: 'Quarta de Cinzas',
    dateDescription: 'Intendente Magalhães • Grupo de Avaliação',
    divisions: ['avaliacao'],
    order: 6
  }
];

export interface SorteioSlot {
  id: string; // Ex: 'especial_domingo_1'
  division: DivisionId;
  day: ParadeDay;
  dayLabel: string;
  order: number; // 1, 2, 3...
  schoolId: string;
  schoolName: string;
  reason: string;
  isFixedRule?: boolean;
  chosenBySchool?: boolean;
  ballLabel?: string;
  drawOrder?: number; // Ordem cronológica em que a escola subiu ao palco e sorteou a bolinha
}

export interface DivisionSorteio {
  division: DivisionId;
  isCompleted: boolean;
  slots: SorteioSlot[];
  drawDate?: string;
}

export interface CarnavalSorteio {
  year: number;
  isCompleted: boolean;
  divisions: Record<DivisionId, DivisionSorteio>;
}

export type QuesitosDrawEntity = 'liesa' | 'ligarj' | 'superliga';

export interface QuesitoDrawRecord {
  entityId: QuesitosDrawEntity;
  name: string; // Ex: 'LIESA (Grupo Especial)'
  leagueName: string; // Ex: 'LIESA'
  targetGroupsDescription: string; // Ex: 'Grupo Especial' ou 'Série Prata, Série Bronze e Grupo de Avaliação'
  isCompleted: boolean;
  order: import('./carnaval').QuesitoId[]; // 9 quesitos na ordem oficial sorteada de leitura (1º ao 9º)
  tiebreakerOrder: import('./carnaval').QuesitoId[]; // 9 quesitos na ordem inversa (9º lido ao 1º lido)
  drawDate?: string;
}

export interface CarnavalQuesitosDrawState {
  year: number;
  liesa: QuesitoDrawRecord;
  ligarj: QuesitoDrawRecord;
  superliga: QuesitoDrawRecord;
}

export type SorteioBallColor = 'amarela' | 'azul' | 'branca';

export interface SorteioBallConfig {
  color: SorteioBallColor;
  colorName: string; // 'Amarela' | 'Azul' | 'Branca'
  bgGradient: string;
  borderColor: string;
  textColor: string;
  shadowColor: string;
  glowColor: string;
  ringColor: string;
  nightLabel: string;
}

