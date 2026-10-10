export type ProfessionalRole =
  | 'carnavalesco'
  | 'mestreBateria'
  | 'interprete'
  | 'mestreSalaPortaBandeira'
  | 'coreografo'
  | 'harmonia';

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
  reputation: string;
  status: ProfessionalStatus;
  currentSchoolId?: string;
  currentSchoolName?: string;
  originCity: string;
  isDupla: boolean;
  partnerName?: string;
  partnerId?: string;
  willingToSolo: boolean;
  willingToFormDupla: boolean;
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
  year: number;
  monthId: string;
  headlineGenerated?: string;
}
