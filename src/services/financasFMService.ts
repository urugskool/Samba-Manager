import { School, DivisionId } from '../types/carnaval';
import { ResumoFinanceiroEscola, SaudeFinanceira } from '../types/financasFM';

export class FinancasFMService {
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
