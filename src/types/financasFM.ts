export type SaudeFinanceira = 'Próspera' | 'Estável' | 'Atenção' | 'Crítica';

export interface ResumoFinanceiroEscola {
  id: string;
  nome: string;
  divisao: 'ESPECIAL' | 'OURO' | 'PRATA' | 'BRONZE' | 'AVALIACAO';
  posicaoAnoAnterior?: number;
  saldoEmCaixa: number;
  folhaSalarialMensal: number;
  tetoSalarialMensal: number;
  orcamentoBarracao: number;
  gastoBarracaoAteAgora: number;
  dividas: number;
  projecaoSuperavitDeficit: number;
  saude: SaudeFinanceira;
}

export interface ItemDRE {
  categoria: string;
  orcado: number;
  realizado: number;
  tipo: 'RECEITA' | 'DESPESA';
}
