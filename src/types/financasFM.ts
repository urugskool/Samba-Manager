// src/types/financasFM.ts

export type TipoBarracao = 
  | 'cidade_do_samba_1'      // Grupo Especial (Complexo verticalizado da LIESA)
  | 'cidade_do_samba_2'      // Série Ouro (1.600m² previstos)
  | 'galpao_campinho'         // Cotas coletivas para Prata / Bronze / Avaliação
  | 'galpao_alugado_proprio'; // Barracão alugado particular

export interface DepartamentoDesfile {
  nome: string;
  percentualSugerido: number; // Ex: 0.25 para 25%
  orcado: number;
  gastoEfetivo: number;
}

export interface PrestacaoContasLiga {
  status: 'aprovada' | 'aprovada_com_ressalvas' | 'reprovada_grave';
  deficitAcumulado: number;
  penalizacaoPontosApuracao: number; // Ex: 0.5 a 1.0 ponto subtraído no Carnaval
  percentualRetencaoRepasses: number; // Bloqueio de subvenção pública/comercial (ex: 0.30)
  proibicaoContratacaoElite: boolean; // Impede contratar mestres/carnavalescos nível A/Elite
  anoExercicio: number;
}

export interface GestaoFinanceiraEscola {
  escolaId: string;
  saldoCaixa: number; // Pode ficar negativo (défice)
  dividaConsolidada: number;
  limiteCreditoDisponivel: number;
  tipoBarracao: TipoBarracao;
  
  // A) Orçamento Institucional (Ano civil)
  custosInstitucionaisAnuais: {
    folhaSedeQuadra: number;
    manutencaoEspacos: number;
    impostosJuridicoContabilidade: number;
    projetosSociaisEventos: number;
  };

  // B) Orçamento Carnavalesco (Desfile)
  departamentosCarnaval: {
    alegorias: DepartamentoDesfile;
    fantasias: DepartamentoDesfile;
    barracaoProducao: DepartamentoDesfile;
    carnavalescosArtistas: DepartamentoDesfile;
    comissaoFrente: DepartamentoDesfile;
    bateria: DepartamentoDesfile;
    harmoniaEvolucao: DepartamentoDesfile;
    sambaEnredo: DepartamentoDesfile;
    quadraEventos: DepartamentoDesfile;
    administracaoComunicacao: DepartamentoDesfile;
    reservaImprevistos: DepartamentoDesfile;
  };

  prestacaoContasUltimoAno?: PrestacaoContasLiga;
}

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

export type ComiteLigaId = 'LIESA' | 'LIGA-RJ' | 'SUPERLIGA';

export type StatusComiteEconomico =
  | 'regular'
  | 'alerta_orcamento'
  | 'emprestimo_ativo'
  | 'sancao_administrativa'
  | 'perda_pontos'
  | 'impedida_desfilar';

export interface EmprestimoComiteEconomico {
  id: string;
  liga: ComiteLigaId;
  anoContratacao: number;
  valorPrincipal: number;
  jurosPercentual: number;
  valorTotalDevido: number;
  saldoDevedor: number;
  parcelasRestantes: number;
  valorParcelaAnual: number;
  motivo: string;
}

export interface SancaoComiteEconomico {
  id: string;
  liga: ComiteLigaId;
  anoAplicacao: number;
  tipo: 'retencao_repasse' | 'restricao_administrativa' | 'perda_pontos' | 'impedimento_avaliacao';
  titulo: string;
  descricao: string;
  percentualRetencao?: number;
  pontosDeduzidos?: number;
  anosAfastamento?: number;
  ativa: boolean;
}

export interface EstadoComiteEconomicoEscola {
  temporadaAtual: number;
  receitasIniciaisCreditadasAno?: number;
  orcamentoMinimoDesfile: number;
  orcamentoRecomendadoDesfile: number;
  valorDesembolsadoDesfile: number;
  desfileQuitadoTemporada: boolean;
  descontoEmprestimoAplicadoAno?: number;
  valorDescontadoEmprestimosAno?: number;
  retencaoAplicadaAno?: number;
  premiosPosCarnavalRecebidosAno?: number;
  ultimoPremioPosCarnavalValor?: number;
  emprestimosAtivos: EmprestimoComiteEconomico[];
  sancoesAtivas: SancaoComiteEconomico[];
  pontosPenalizacaoProximoCarnaval: number;
  percentualRetencaoProximoRepasse: number;
  bloqueioContratacaoElite: boolean;
  impedidaDeDesfilar: boolean;
  motivoImpedimento?: string;
}

