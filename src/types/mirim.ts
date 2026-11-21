import { QuesitoId } from './carnaval';
import { FlagDesignConfig } from '../components/SchoolFlag';

/**
 * Denominações jurídicas válidas para Escolas de Samba Mirins.
 */
export type MirimDenomination = 'G.R.C.E.S.M.' | 'G.R.E.S.M.';

/**
 * Origem do financiamento anual da agremiação mirim:
 * - 'escola_mae': verba repassada pela escola de samba tradicional (escola-mãe)
 * - 'liesa_projeto_social': verba direta da LIESA para projetos sociais independentes
 */
export type MirimFundingSource = 'escola_mae' | 'liesa_projeto_social';

/**
 * Identificador dos 4 dias oficiais de apresentações mirins na Marquês de Sapucaí (LIESA):
 * - 3 dias durante os Ensaios Técnicos (31/01, 01/02 e 08/02, sempre às 18h) -> 8 escolas mirins
 * - 1 dia principal na Sexta-feira pós-Carnaval -> 12+ escolas mirins
 */
export type MirimParadeSlotId =
  | 'ensaio_tecnico_1'
  | 'ensaio_tecnico_2'
  | 'ensaio_tecnico_3'
  | 'desfile_principal';

export interface MirimParadeScheduleSlot {
  slotId: MirimParadeSlotId;
  dayTitle: string;
  dateLabel: string;
  timeLabel: string;
  orderInDay: number;
  venue: string;
  isTechnicalRehearsal: boolean;
  completed: boolean;
  highlightNote?: string;
}

/**
 * Registro de enredo próprio de uma Escola de Samba Mirim.
 */
export interface MirimEnredoRecord {
  year: number;
  title: string;
  synopsis: string;
  themeType: string;
}

/**
 * Categoria de talento em formação na categoria de base mirim.
 */
export type MirimTalentRole =
  | 'ritmista'
  | 'passista'
  | 'casal_mspb'
  | 'compositor'
  | 'carnavalesco_juvenil'
  | 'interprete_mirim';

export interface MirimTalent {
  id: string;
  name: string;
  role: MirimTalentRole;
  roleLabel: string;
  age: number; // 13 a 18 anos
  potential: number; // 75 a 97
  targetQuesito: QuesitoId;
  readyToGraduate: boolean;
  graduatedYear?: number;
  graduatedToSchoolId?: string;
  graduatedToSchoolName?: string;
}

/**
 * Entidade principal de uma Escola de Samba Mirim no jogo.
 * Mantida separada do ciclo competitivo adulto (não recebe notas nem julgamento).
 */
export interface MirimSchool {
  id: string;
  denomination: MirimDenomination;
  corporateName: string;
  name: string;
  calledName: string;
  abbreviation?: string;
  motherSchoolId?: string;
  motherSchoolName?: string;
  isSocialProject: boolean;
  fundingSource: MirimFundingSource;
  annualGrant: number; // R$ por temporada (Escola-Mãe ou LIESA)
  budget: number; // Caixa atual da escola mirim
  foundationYear?: number;
  foundationDate?: string;
  neighborhood?: string;
  city: string;
  colors: string[]; // Códigos hexadecimais
  colorsDescription: string;
  symbol: string;
  symbolEmoji: string;
  flagConfig: FlagDesignConfig;
  currentEnredo: MirimEnredoRecord;
  enredoHistory: MirimEnredoRecord[];
  youthSquadSize: number; // Quantidade de crianças e adolescentes na escola
  academyLevel: number; // 1 a 5 (estrutura pedagógica e musical da base)
  talents: MirimTalent[];
  paradeSchedule: MirimParadeScheduleSlot;
  hasParadedThisYear: boolean;
  isCustom?: boolean;
  autoCreatedByRule?: boolean;
  autoCreatedYear?: number;
}

/**
 * Status de conformidade de uma escola do Grupo Especial frente à regra obrigatória:
 * toda escola do Especial deve possuir escola mirim; se subir sem uma, tem até 2 anos.
 */
export interface EspecialMirimComplianceStatus {
  schoolId: string;
  schoolName: string;
  hasMirim: boolean;
  mirimId?: string;
  mirimName?: string;
  yearsInEspecialWithoutMirim: number;
  maxYearsAllowed: number;
  status: 'regular' | 'aviso_ano_1' | 'prazo_final_ano_2' | 'criada_automaticamente';
}

/**
 * Evento gerado na virada de temporada envolvendo Escolas Mirins.
 */
export interface MirimSeasonEvent {
  type: 'auto_created_mirim' | 'verba_transferida' | 'talento_formado';
  title: string;
  description: string;
  schoolId?: string;
  mirimId?: string;
}

/**
 * Parâmetros para criação manual de uma Escola Mirim pelo jogador.
 */
export interface CreateMirimSchoolParams {
  denomination: MirimDenomination;
  name: string;
  calledName: string;
  abbreviation?: string;
  motherSchoolId?: string;
  motherSchoolName?: string;
  isSocialProject: boolean;
  neighborhood?: string;
  city: string;
  foundationYear: number;
  foundationDate?: string;
  colors: string[];
  colorsDescription: string;
  symbol: string;
  symbolEmoji: string;
  flagConfig: FlagDesignConfig;
  initialEnredoTitle: string;
  initialEnredoSynopsis: string;
  initialEnredoThemeType: string;
}
