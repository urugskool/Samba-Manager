export type ProfessionalRole =
  | 'carnavalesco'
  | 'mestreBateria'
  | 'interprete'
  | 'mestreSalaPortaBandeira'
  | 'coreografo'
  | 'harmonia'
  | 'direcaoCarnaval';

export type ProfessionalStatus =
  | 'em_escola'
  | 'free_agent'
  | 'outra_cidade'
  | 'destaque_acesso';

export interface CarnavalProfessional {
  id: string;
  name: string;
  role: ProfessionalRole;
  roleName: string;
  rating: number; // 50 a 99
  salary: number; // R$ por ano
  signingBonus: number; // Luvas de assinatura (R$)
  buyoutClause?: number; // Multa rescisória de quebra de contrato para tirar de outra escola
  reputation: string;
  status: ProfessionalStatus;
  currentSchoolId?: string;
  currentSchoolName?: string;
  currentSchoolDivision?: string; // Divisão atual (ex: 'especial', 'ouro') para verificar exclusividade por grupo
  secondarySchoolId?: string; // Agremiação secundária em divisão diferente permitida pelas regras
  secondarySchoolName?: string;
  secondarySchoolDivision?: string;
  originCity: string;
  isDupla: boolean;
  partnerName?: string;
  partnerId?: string;
  willingToSolo: boolean;
  willingToFormDupla: boolean;
  contractYearsLeft?: number; // Anos de contrato restantes na agremiação (0 = expirado / agente livre)
  loyaltyLevel?: number; // 1 a 100 de fidelidade à agremiação atual
  bio: string;
  specialties: string[];
  historyHighlights: string;
  experienceYears: number;
  marketDemand: 'alta' | 'media' | 'baixa';
}

export interface TransferEvent {
  id: string;
  professionalId: string;
  professionalName: string;
  role: ProfessionalRole;
  roleName: string;
  previousSchoolId?: string;
  previousSchoolName?: string;
  newSchoolId: string;
  newSchoolName: string;
  mode: 'solo' | 'dupla' | 'separacao_dupla';
  partnerName?: string;
  valueSalary: number;
  valueBonus: number;
  buyoutPaid?: number; // Valor da multa rescisória paga à escola anterior
  year: number;
  monthId: string;
  headlineGenerated?: string;
  dateStr?: string;
}

export interface TransferWindowStatus {
  isOpen: boolean;
  currentMonth: string;
  deadlineName: string;
  daysRemainingInWindow?: number;
}
