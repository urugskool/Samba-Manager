// src/services/financasFMService.ts
import { School, DivisionId } from '../types/carnaval';
import {
  GestaoFinanceiraEscola,
  TipoBarracao,
  PrestacaoContasLiga,
  ResumoFinanceiroEscola,
  SaudeFinanceira
} from '../types/financasFM';

// Custos anuais de base de infraestrutura por modelo de barracão
export const CUSTOS_FIXOS_BARRACAO: Record<TipoBarracao, { aluguer: number; manutencaoEnergia: number }> = {
  cidade_do_samba_1: {
    aluguer: 0, // Cedido pela LIESA/Prefeitura
    manutencaoEnergia: 950_000 // Condomínio, elevadores, segurança industrial e energia pesada
  },
  cidade_do_samba_2: {
    aluguer: 200_000, // Taxa de manutenção da Liga
    manutencaoEnergia: 550_000
  },
  galpao_campinho: {
    aluguer: 360_000, // Cota de galpão partilhado
    manutencaoEnergia: 240_000 // Geradores, logística de água e reparações
  },
  galpao_alugado_proprio: {
    aluguer: 600_000,
    manutencaoEnergia: 380_000
  }
};

/**
 * Converte patrocínio bruto em líquido após impostos, custos de captação e contrapartidas.
 */
export function liquidarPatrocinio(valorBruto: number): number {
  const percentualDeducoes = 0.25; // 25% consumidos em comissões, ativação e impostos
  return valorBruto * (1 - percentualDeducoes);
}

/**
 * Aplica despesas fixas institucionais e custos de barracão do mês.
 */
export function processarCustoMensalOperacional(
  financas: GestaoFinanceiraEscola,
  grupoAtual: 'Especial' | 'Ouro' | 'Prata' | 'Bronze' | 'Avaliacao'
): GestaoFinanceiraEscola {
  const custosInst = financas.custosInstitucionaisAnuais;
  const custoInstMensal = 
    (custosInst.folhaSedeQuadra + 
     custosInst.manutencaoEspacos + 
     custosInst.impostosJuridicoContabilidade + 
     custosInst.projetosSociaisEventos) / 12;

  const custoBarracao = CUSTOS_FIXOS_BARRACAO[financas.tipoBarracao];
  const custoBarracaoMensal = (custoBarracao.aluguer + custoBarracao.manutencaoEnergia) / 12;

  const custoTotalMensal = custoInstMensal + custoBarracaoMensal;

  return {
    ...financas,
    saldoCaixa: financas.saldoCaixa - custoTotalMensal
  };
}

/**
 * Custo de desocupação e transferência de barracão ao subir ou descer de divisão.
 */
export function processarMudancaDivisaoBarracao(
  financas: GestaoFinanceiraEscola,
  grupoDestino: 'Especial' | 'Ouro' | 'Prata' | 'Bronze' | 'Avaliacao'
): GestaoFinanceiraEscola {
  let novoTipo: TipoBarracao = financas.tipoBarracao;
  let custoMudanca = 0;

  if (grupoDestino === 'Especial') {
    novoTipo = 'cidade_do_samba_1';
    // Frete de alegorias de grande porte, limpeza, pintura e instalação na Cidade do Samba 1
    custoMudanca = 750_000;
  } else if (grupoDestino === 'Ouro') {
    novoTipo = 'cidade_do_samba_2';
    custoMudanca = 350_000;
  } else {
    novoTipo = 'galpao_campinho';
    custoMudanca = 150_000;
  }

  return {
    ...financas,
    tipoBarracao: novoTipo,
    saldoCaixa: financas.saldoCaixa - custoMudanca
  };
}

/**
 * Auditoria da Liga / Fair Play Financeiro no final da temporada.
 * Avalia o nível de endividamento da escola e estipula punições.
 */
export function auditarPrestacaoContas(
  financas: GestaoFinanceiraEscola,
  receitaAnualRealizada: number,
  anoExercicio: number
): PrestacaoContasLiga {
  // Se o caixa fechou positivo ou sem dívidas excessivas
  if (!financas || financas.saldoCaixa >= 0) {
    return {
      status: 'aprovada',
      deficitAcumulado: 0,
      penalizacaoPontosApuracao: 0,
      percentualRetencaoRepasses: 0,
      proibicaoContratacaoElite: false,
      anoExercicio
    };
  }

  const deficit = Math.abs(financas.saldoCaixa);
  const proporcaoDeficit = deficit / Math.max(receitaAnualRealizada, 1_000_000);

  // Défice Leve (até 10% da receita anual)
  if (proporcaoDeficit <= 0.10) {
    return {
      status: 'aprovada_com_ressalvas',
      deficitAcumulado: deficit,
      penalizacaoPontosApuracao: 0,
      percentualRetencaoRepasses: 0.15, // Retém 15% das verbas do próximo ano
      proibicaoContratacaoElite: false,
      anoExercicio
    };
  }

  // Défice Moderado (10% a 25% da receita anual)
  if (proporcaoDeficit <= 0.25) {
    return {
      status: 'reprovada_grave',
      deficitAcumulado: deficit,
      penalizacaoPontosApuracao: 0.3, // Perda de 3 décimos na abertura da apuração
      percentualRetencaoRepasses: 0.30,
      proibicaoContratacaoElite: true,
      anoExercicio
    };
  }

  // Défice Crítico / Insolvência (> 25% da receita anual)
  return {
    status: 'reprovada_grave',
    deficitAcumulado: deficit,
    penalizacaoPontosApuracao: 0.8, // Perda severa de até 8 décimos
    percentualRetencaoRepasses: 0.50, // 50% das subvenções retidas pela comissão fiscalizadora
    proibicaoContratacaoElite: true,
    anoExercicio
  };
}

/**
 * Cálculo final de notas da Apuração com aplicação de eventuais penalizações da Prestação de Contas da Liga
 */
export function calcularTotalComPenalizacao(
  somaNotasQuesitos: number,
  prestacaoContas?: PrestacaoContasLiga
): { totalFinal: number; penalidadeAplicada: number; justificativa?: string } {
  if (!prestacaoContas || prestacaoContas.penalizacaoPontosApuracao <= 0) {
    return { totalFinal: somaNotasQuesitos, penalidadeAplicada: 0 };
  }

  const penalidade = prestacaoContas.penalizacaoPontosApuracao;
  const totalComDesconto = Math.max(0, somaNotasQuesitos - penalidade);

  return {
    totalFinal: parseFloat(totalComDesconto.toFixed(1)),
    penalidadeAplicada: penalidade,
    justificativa: `Penalização de -${penalidade} ponto(s) por reprovação na Prestação de Contas (Défice de R$ ${(prestacaoContas.deficitAcumulado / 1_000_000).toFixed(2)} mi)`
  };
}

export class FinancasFMService {
  public static readonly CUSTOS_FIXOS_BARRACAO = CUSTOS_FIXOS_BARRACAO;
  public static readonly liquidarPatrocinio = liquidarPatrocinio;
  public static readonly processarCustoMensalOperacional = processarCustoMensalOperacional;
  public static readonly processarMudancaDivisaoBarracao = processarMudancaDivisaoBarracao;
  public static readonly auditarPrestacaoContas = auditarPrestacaoContas;
  public static readonly calcularTotalComPenalizacao = calcularTotalComPenalizacao;

  public static mapDivision(div: DivisionId): 'ESPECIAL' | 'OURO' | 'PRATA' | 'BRONZE' | 'AVALIACAO' {
    switch (div) {
      case 'especial':
        return 'ESPECIAL';
      case 'ouro':
        return 'OURO';
      case 'prata':
        return 'PRATA';
      case 'bronze':
        return 'BRONZE';
      case 'avaliacao':
        return 'AVALIACAO';
      default:
        return 'ESPECIAL';
    }
  }

  public static gerarResumoEscola(school: School): ResumoFinanceiroEscola {
    // Folha salarial dos profissionais
    const totalStaffSalaryAnnual = Object.values(school.staff || {}).reduce(
      (acc, m) => acc + (m?.salary || 0),
      0
    );
    const folhaSalarialMensal = Math.round(totalStaffSalaryAnnual / 12) || 45000;

    // Teto salarial por divisão
    const tetoMultiplier: Record<string, number> = {
      especial: 550000,
      ouro: 120000,
      prata: 35000,
      bronze: 15000,
      avaliacao: 6000
    };
    const tetoDivisao = tetoMultiplier[school.division] || 100000;
    const tetoSalarialMensal = Math.max(tetoDivisao, Math.round(folhaSalarialMensal * 1.2));

    // Orçamento de Barracão por divisão
    const orcamentoBaseDivisao: Record<string, number> = {
      especial: 12000000,
      ouro: 1800000,
      prata: 350000,
      bronze: 120000,
      avaliacao: 40000
    };
    const orcamentoBarracao = orcamentoBaseDivisao[school.division] || 500000;
    const progressoBarracao = Math.min(100, Math.max(10, school.barracaoProgress || 50));
    const gastoBarracaoAteAgora = Math.round((orcamentoBarracao * progressoBarracao) / 100);

    // Passivos / dívidas acumuladas (baseado no porte da escola e caixa)
    const fatorDivida =
      school.division === 'especial'
        ? 1800000
        : school.division === 'ouro'
        ? 350000
        : school.division === 'prata'
        ? 70000
        : 20000;
    const saldoEmCaixa = school.budget;
    const dividas = Math.max(0, Math.round(fatorDivida * (saldoEmCaixa < fatorDivida ? 1.3 : 0.6)));

    // Projeção pós-carnaval
    const projecaoSuperavitDeficit = Math.round(
      saldoEmCaixa - (orcamentoBarracao - gastoBarracaoAteAgora) - folhaSalarialMensal * 4 - dividas * 0.3
    );

    // Avaliação da Saúde Financeira
    let saude: SaudeFinanceira = 'Estável';
    if (saldoEmCaixa > orcamentoBarracao * 0.6 && projecaoSuperavitDeficit > 500000 && dividas < saldoEmCaixa * 0.4) {
      saude = 'Próspera';
    } else if (projecaoSuperavitDeficit >= 0 && saldoEmCaixa >= folhaSalarialMensal * 3) {
      saude = 'Estável';
    } else if (projecaoSuperavitDeficit > -1000000 || saldoEmCaixa >= folhaSalarialMensal) {
      saude = 'Atenção';
    } else {
      saude = 'Crítica';
    }

    return {
      id: school.id,
      nome: school.name,
      divisao: this.mapDivision(school.division),
      saldoEmCaixa,
      folhaSalarialMensal,
      tetoSalarialMensal,
      orcamentoBarracao,
      gastoBarracaoAteAgora,
      dividas,
      projecaoSuperavitDeficit,
      saude
    };
  }

  public static gerarListaResumos(schools: School[]): ResumoFinanceiroEscola[] {
    return schools.map((s) => this.gerarResumoEscola(s));
  }
}
