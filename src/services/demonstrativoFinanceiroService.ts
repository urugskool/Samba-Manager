import { DivisionId, School, YearHistory } from '../types/carnaval';
import {
  ComiteLigaId,
  EmprestimoComiteEconomico,
  EstadoComiteEconomicoEscola,
  PrestacaoContasLiga,
  SancaoComiteEconomico,
  StatusComiteEconomico
} from '../types/financasFM';
import { LIGA_FINANCIAL_CONSTANTS } from './ligaFinancialService';
import { RepassesFinanceirosService } from './repassesFinanceirosService';

export interface RegraOrcamentoDivisao {
  division: DivisionId;
  divisionLabel: string;
  liga: ComiteLigaId;
  comiteNome: string;
  minimoObrigatorio: number;
  referenciaIdeal: number;
  faixaMinimaLabel: string;
  permiteEmprestimoLiga: boolean;
  regraInadimplenciaResumo: string;
  premiacaoPosCarnavalResumo: string;
}

export const REGRAS_ORCAMENTO_POR_DIVISAO: Record<DivisionId, RegraOrcamentoDivisao> = {
  especial: {
    division: 'especial',
    divisionLabel: 'Grupo Especial',
    liga: 'LIESA',
    comiteNome: 'Comitê Econômico da LIESA',
    minimoObrigatorio: 14_000_000,
    referenciaIdeal: 14_000_000,
    faixaMinimaLabel: 'R$ 14.000.000 (mínimo obrigatório)',
    permiteEmprestimoLiga: true,
    regraInadimplenciaResumo:
      'Empréstimo compulsório descontado de repasses futuros da LIESA, retenção de 15% a 35% das cotas, bloqueio de contratações de elite e perda de 0,3 a 0,8 ponto na apuração.',
    premiacaoPosCarnavalResumo:
      'Fundo de R$ 20M (distribuição decrescente por colocação) + Bônus G6 Campeãs (R$ 5,72M) — pagos pós-Carnaval.'
  },
  ouro: {
    division: 'ouro',
    divisionLabel: 'Série Ouro',
    liga: 'LIGA-RJ',
    comiteNome: 'Comitê Econômico da LIGA-RJ',
    minimoObrigatorio: 1_000_000,
    referenciaIdeal: 1_000_000,
    faixaMinimaLabel: 'R$ 1.000.000 (mínimo obrigatório)',
    permiteEmprestimoLiga: true,
    regraInadimplenciaResumo:
      'Empréstimo emergencial descontado de repasses futuros da LIGA-RJ, retenção de 15% a 35% das cotas, sanções administrativas e perda de 0,3 a 0,8 ponto na apuração.',
    premiacaoPosCarnavalResumo:
      '1º R$ 2M · 2º R$ 900k · 3º R$ 700k · 4º em diante: rateio de R$ 800k — pagos pós-Carnaval.'
  },
  prata: {
    division: 'prata',
    divisionLabel: 'Série Prata',
    liga: 'SUPERLIGA',
    comiteNome: 'Comitê Econômico da Superliga',
    minimoObrigatorio: 300_000,
    referenciaIdeal: 300_000,
    faixaMinimaLabel: 'R$ 300.000 (mínimo obrigatório)',
    permiteEmprestimoLiga: true,
    regraInadimplenciaResumo:
      'Empréstimo emergencial descontado dos repasses futuros da Superliga, retenção de cotas, sanções administrativas e perda de 0,3 a 0,8 ponto na apuração.',
    premiacaoPosCarnavalResumo:
      'Top 3: 1º R$ 300k · 2º R$ 150k · 3º R$ 70k — pagos pós-Carnaval.'
  },
  bronze: {
    division: 'bronze',
    divisionLabel: 'Série Bronze',
    liga: 'SUPERLIGA',
    comiteNome: 'Comitê Econômico da Superliga',
    minimoObrigatorio: 300_000,
    referenciaIdeal: 300_000,
    faixaMinimaLabel: 'R$ 300.000 (mínimo obrigatório)',
    permiteEmprestimoLiga: true,
    regraInadimplenciaResumo:
      'Empréstimo emergencial descontado dos repasses futuros da Superliga, retenção de cotas, sanções administrativas e perda de 0,3 a 0,8 ponto na apuração.',
    premiacaoPosCarnavalResumo:
      'Top 3: 1º R$ 90k · 2º R$ 60k · 3º R$ 30k — pagos pós-Carnaval.'
  },
  avaliacao: {
    division: 'avaliacao',
    divisionLabel: 'Grupo de Avaliação',
    liga: 'SUPERLIGA',
    comiteNome: 'Comitê Econômico da Superliga',
    minimoObrigatorio: 50_000,
    referenciaIdeal: 100_000,
    faixaMinimaLabel: 'R$ 50.000 a R$ 100.000 (mínimo obrigatório)',
    permiteEmprestimoLiga: false,
    regraInadimplenciaResumo:
      'Sem repasse fixo da Superliga. Se não atingir o mínimo de R$ 50.000 ou ficar no vermelho, a escola é impedida de desfilar e afastada por no mínimo 1 ano.',
    premiacaoPosCarnavalResumo:
      'Top 3: 1º R$ 20k · 2º R$ 12k · 3º R$ 6k — pagos pós-Carnaval.'
  }
};

export interface ReceitasIgualitariasAbertura {
  division: DivisionId;
  liga: ComiteLigaId;
  direitosTransmissao: number;
  repasseLiga: number;
  subvencaoPublica: number;
  bilheteriaBaseIgualitaria: number;
  totalIgualitarioBruto: number;
  detalheDireitosTransmissao: string;
  detalheRepasseLiga: string;
  detalheSubvencao: string;
  detalheBilheteria: string;
}

export interface DemonstrativoFinanceiroResumo {
  anoTemporada: number;
  regraDivisao: RegraOrcamentoDivisao;
  receitasAbertura: ReceitasIgualitariasAbertura;
  patrocinioTematicoRealizado: number;
  patrocinioTematicoNome?: string;
  patrocinioTematicoBonusCultural: number;
  patrocinioMasterOuComunitarioStatus: boolean;
  descontoEmprestimosPrevisto: number;
  retencaoSancaoPrevista: number;
  repasseLiquidoAbertura: number;
  ultimoPremioPosCarnaval?: {
    ano: number;
    posicao: number;
    valorClassificacao: number;
    valorBonusCampeas: number;
    valorTotal: number;
  };
  orcamentoMinimoDesfile: number;
  orcamentoRecomendadoDesfile: number;
  valorDesembolsadoDesfile: number;
  restanteObrigatorioDesfile: number;
  desfileQuitado: boolean;
  folhaEquipeAnual: number;
  saldoCaixaAtual: number;
  saldoProjetadoAposDesfile: number;
  deficitParaMinimo: number;
  totalDividaEmprestimos: number;
  statusComite: StatusComiteEconomico;
  statusComiteLabel: string;
  statusComiteResumo: string;
  estadoComite: EstadoComiteEconomicoEscola;
}

export class DemonstrativoFinanceiroService {
  public static getRegraDivisao(division: DivisionId): RegraOrcamentoDivisao {
    return REGRAS_ORCAMENTO_POR_DIVISAO[division] || REGRAS_ORCAMENTO_POR_DIVISAO.avaliacao;
  }

  /**
   * Calcula os valores igualitários com os quais TODAS as agremiações de uma divisão iniciam a temporada.
   * Prêmios de classificação e Desfile das Campeãs NÃO entram aqui pois são entregues pós-Carnaval.
   */
  public static calcularReceitasIgualitariasAbertura(
    division: DivisionId,
    totalEscolasPrata: number = 28
  ): ReceitasIgualitariasAbertura {
    const safePrataCount = Math.max(1, totalEscolasPrata);

    if (division === 'especial') {
      const direitosTransmissao = LIGA_FINANCIAL_CONSTANTS.TV_REGULAR_PER_SCHOOL; // 3.000.000
      const repasseLiga = LIGA_FINANCIAL_CONSTANTS.SPONSOR_FIXED_PER_SCHOOL; // 14.000.000
      const subvencaoPublica = RepassesFinanceirosService.SUBVENCAO_PUBLICA.ESPECIAL; // 4.000.000
      const bilheteriaBaseIgualitaria = LIGA_FINANCIAL_CONSTANTS.OFFICIAL_PARADE_SHARE_PER_SCHOOL; // 1.000.000
      return {
        division,
        liga: 'LIESA',
        direitosTransmissao,
        repasseLiga,
        subvencaoPublica,
        bilheteriaBaseIgualitaria,
        totalIgualitarioBruto:
          direitosTransmissao + repasseLiga + subvencaoPublica + bilheteriaBaseIgualitaria,
        detalheDireitosTransmissao: 'Cota igualitária de TV da temporada regular (LIESA).',
        detalheRepasseLiga: 'Cota igualitária de patrocínios comerciais da LIESA.',
        detalheSubvencao: 'Subvenção pública igualitária (Governo do Estado + Prefeitura).',
        detalheBilheteria: 'Rateio igualitário de 15% da bilheteria oficial do Grupo Especial (acordo LIESA + Prefeitura).'
      };
    }

    if (division === 'ouro') {
      const direitosTransmissao = RepassesFinanceirosService.OURO_CONSTANTES.COTA_TV; // 700.000
      const repasseLiga = RepassesFinanceirosService.OURO_CONSTANTES.COTA_LIGA; // 500.000
      const subvencaoPublica = RepassesFinanceirosService.OURO_CONSTANTES.SUBVENCAO; // 600.000
      return {
        division,
        liga: 'LIGA-RJ',
        direitosTransmissao,
        repasseLiga,
        subvencaoPublica,
        bilheteriaBaseIgualitaria: 0,
        totalIgualitarioBruto: direitosTransmissao + repasseLiga + subvencaoPublica,
        detalheDireitosTransmissao: 'Cota igualitária de transmissão de TV (LIGA-RJ).',
        detalheRepasseLiga: 'Cota igualitária de patrocínio e gestão da LIGA-RJ.',
        detalheSubvencao: 'Subvenção pública igualitária da Série Ouro.',
        detalheBilheteria: 'Sem rateio fixo de bilheteria na Série Ouro.'
      };
    }

    if (division === 'prata') {
      const direitosTransmissao = RepassesFinanceirosService.PRATA_CONSTANTES.COTA_TV_POR_ESCOLA; // 80.000
      const repasseLiga = Math.round(
        RepassesFinanceirosService.PRATA_CONSTANTES.FUNDO_GLOBAL / safePrataCount
      );
      return {
        division,
        liga: 'SUPERLIGA',
        direitosTransmissao,
        repasseLiga,
        subvencaoPublica: 0,
        bilheteriaBaseIgualitaria: 0,
        totalIgualitarioBruto: direitosTransmissao + repasseLiga,
        detalheDireitosTransmissao: 'Cota igualitária de transmissão da Série Prata.',
        detalheRepasseLiga: `Rateio igualitário do Fundo de R$ 1,5M da Superliga (${safePrataCount} escolas).`,
        detalheSubvencao: 'Integrada ao fundo global da Superliga.',
        detalheBilheteria: 'Desfile aberto na Estrada Intendente Magalhães.'
      };
    }

    if (division === 'bronze') {
      const repasseLiga = RepassesFinanceirosService.BRONZE_CONSTANTES.REPASSE_FIXO; // 80.000
      return {
        division,
        liga: 'SUPERLIGA',
        direitosTransmissao: 0,
        repasseLiga,
        subvencaoPublica: 0,
        bilheteriaBaseIgualitaria: 0,
        totalIgualitarioBruto: repasseLiga,
        detalheDireitosTransmissao: 'Sem direitos de transmissão na Série Bronze.',
        detalheRepasseLiga: 'Repasse fixo igualitário da Superliga para todas as participantes.',
        detalheSubvencao: 'Sem subvenção separada além do repasse fixo da Superliga.',
        detalheBilheteria: 'Desfile aberto na Estrada Intendente Magalhães.'
      };
    }

    // Grupo de Avaliação
    return {
      division: 'avaliacao',
      liga: 'SUPERLIGA',
      direitosTransmissao: 0,
      repasseLiga: 0,
      subvencaoPublica: 0,
      bilheteriaBaseIgualitaria: 0,
      totalIgualitarioBruto: 0,
      detalheDireitosTransmissao: 'Sem direitos de transmissão no Grupo de Avaliação.',
      detalheRepasseLiga: 'Sem repasse fixo da Superliga — sustentação via patrocínio e eventos.',
      detalheSubvencao: 'Sem subvenção pública fixa no Grupo de Avaliação.',
      detalheBilheteria: 'Desfile aberto na Estrada Intendente Magalhães.'
    };
  }

  /**
   * Inicializa ou normaliza o estado do Comitê Econômico para uma escola na temporada atual.
   */
  public static getOrInitEstadoComite(
    school: School,
    currentYear: number
  ): EstadoComiteEconomicoEscola {
    const regra = this.getRegraDivisao(school.division);
    const existing = school.comiteEconomico;

    if (existing && existing.temporadaAtual === currentYear) {
      return {
        ...existing,
        orcamentoMinimoDesfile: regra.minimoObrigatorio,
        orcamentoRecomendadoDesfile: regra.referenciaIdeal
      };
    }

    const emprestimosAtivos = existing?.emprestimosAtivos?.filter((e) => e.saldoDevedor > 0) || [];
    const sancoesAtivas = existing?.sancoesAtivas?.filter((s) => s.ativa) || [];
    const pontosPenalizacaoProximoCarnaval =
      existing?.pontosPenalizacaoProximoCarnaval ||
      school.financas?.prestacaoContasUltimoAno?.penalizacaoPontosApuracao ||
      0;

    return {
      temporadaAtual: currentYear,
      receitasIniciaisCreditadasAno: existing?.receitasIniciaisCreditadasAno,
      orcamentoMinimoDesfile: regra.minimoObrigatorio,
      orcamentoRecomendadoDesfile: regra.referenciaIdeal,
      valorDesembolsadoDesfile: 0,
      desfileQuitadoTemporada: false,
      descontoEmprestimoAplicadoAno: existing?.descontoEmprestimoAplicadoAno,
      valorDescontadoEmprestimosAno: existing?.valorDescontadoEmprestimosAno || 0,
      retencaoAplicadaAno: existing?.retencaoAplicadaAno || 0,
      premiosPosCarnavalRecebidosAno: existing?.premiosPosCarnavalRecebidosAno,
      ultimoPremioPosCarnavalValor: existing?.ultimoPremioPosCarnavalValor || 0,
      emprestimosAtivos,
      sancoesAtivas,
      pontosPenalizacaoProximoCarnaval,
      percentualRetencaoProximoRepasse: existing?.percentualRetencaoProximoRepasse || 0,
      bloqueioContratacaoElite: Boolean(existing?.bloqueioContratacaoElite),
      impedidaDeDesfilar: Boolean(existing?.impedidaDeDesfilar),
      motivoImpedimento: existing?.motivoImpedimento
    };
  }

  /**
   * Inicializa todas as escolas ativas de um novo jogo com os valores igualitários de abertura da temporada.
   * No Grupo de Avaliação (repasse R$ 0), todas partem igualmente com R$ 0 de repasse da liga e precisam
   * arrecadar o mínimo obrigatório (R$ 50k–100k) via patrocínio temático, apoio comunitário e quadra.
   */
  public static inicializarOrcamentosIgualitarios(
    schools: School[],
    year: number = 2027
  ): School[] {
    const prataCount = Math.max(
      1,
      schools.filter((s) => s.division === 'prata' && !s.isInactive && !s.inactive).length
    );

    return schools.map((s) => {
      if (s.isInactive || s.inactive) return s;
      const abertura = this.calcularReceitasIgualitariasAbertura(s.division, prataCount);
      const regra = this.getRegraDivisao(s.division);
      const estadoComite: EstadoComiteEconomicoEscola = {
        temporadaAtual: year,
        receitasIniciaisCreditadasAno: year,
        orcamentoMinimoDesfile: regra.minimoObrigatorio,
        orcamentoRecomendadoDesfile: regra.referenciaIdeal,
        valorDesembolsadoDesfile: 0,
        desfileQuitadoTemporada: false,
        valorDescontadoEmprestimosAno: 0,
        retencaoAplicadaAno: 0,
        emprestimosAtivos: [],
        sancoesAtivas: [],
        pontosPenalizacaoProximoCarnaval: 0,
        percentualRetencaoProximoRepasse: 0,
        bloqueioContratacaoElite: false,
        impedidaDeDesfilar: false
      };

      return {
        ...s,
        budget: abertura.totalIgualitarioBruto,
        comiteEconomico: estadoComite,
        ...(s.financas
          ? {
              financas: {
                ...s.financas,
                saldoCaixa: abertura.totalIgualitarioBruto
              }
            }
          : {})
      };
    });
  }

  /**
   * Busca o último prêmio pós-Carnaval efetivamente conquistado pela escola no histórico.
   */
  public static obterUltimoPremioPosCarnaval(
    school: School,
    history: YearHistory[] = []
  ): DemonstrativoFinanceiroResumo['ultimoPremioPosCarnaval'] {
    if (!history || history.length === 0) return undefined;

    for (const h of history) {
      // Verifica Grupo Especial
      if (h.ligaFinancialReport?.payouts) {
        const match = h.ligaFinancialReport.payouts.find(
          (p: any) =>
            p.schoolId === school.id ||
            p.schoolName?.toLowerCase() === school.name.toLowerCase()
        );
        if (match) {
          return {
            ano: h.year,
            posicao: match.rank,
            valorClassificacao: match.classificationPrize || 0,
            valorBonusCampeas: match.totalBonusCampeas || 0,
            valorTotal: (match.classificationPrize || 0) + (match.totalBonusCampeas || 0)
          };
        }
      }

      // Verifica Ouro, Prata, Bronze e Avaliação
      const reports = [
        h.ouroFinancialReport,
        h.prataFinancialReport,
        h.bronzeFinancialReport,
        h.avaliacaoFinancialReport
      ];
      for (const rep of reports) {
        if (Array.isArray(rep)) {
          const match = rep.find(
            (e: any) =>
              e.escolaId === school.id ||
              e.nomeEscola?.toLowerCase() === school.name.toLowerCase()
          );
          if (match) {
            return {
              ano: h.year,
              posicao: match.posicao,
              valorClassificacao: match.premiacaoClassificacao || 0,
              valorBonusCampeas: 0,
              valorTotal: match.premiacaoClassificacao || 0
            };
          }
        }
      }
    }

    return undefined;
  }

  /**
   * Gera o Demonstrativo Financeiro completo para exibição na view de Finanças.
   */
  public static gerarDemonstrativoFinanceiro(
    school: School,
    allSchools: School[],
    currentYear: number,
    history: YearHistory[] = []
  ): DemonstrativoFinanceiroResumo {
    const regraDivisao = this.getRegraDivisao(school.division);
    const prataCount = Math.max(
      1,
      (allSchools || []).filter((s) => s.division === 'prata' && !s.isInactive && !s.inactive).length
    );

    const receitasAbertura = this.calcularReceitasIgualitariasAbertura(school.division, prataCount);
    const estadoComite = this.getOrInitEstadoComite(school, currentYear);

    const activeThematic =
      school.activeThematicSponsor && school.activeThematicSponsor.year === currentYear
        ? school.activeThematicSponsor
        : undefined;

    const patrocinioTematicoRealizado = activeThematic?.totalAmount || 0;
    const patrocinioTematicoBonusCultural = activeThematic?.culturalBonusAmount || 0;
    const patrocinioMasterOuComunitarioStatus =
      school.masterSponsorClaimedYear === currentYear ||
      school.communitySponsorClaimedYear === currentYear;

    const descontoEmprestimosPrevisto = estadoComite.emprestimosAtivos.reduce(
      (acc, emp) => acc + Math.min(emp.saldoDevedor, emp.valorParcelaAnual),
      0
    );
    const retencaoSancaoPrevista = Math.round(
      receitasAbertura.totalIgualitarioBruto * (estadoComite.percentualRetencaoProximoRepasse || 0)
    );
    const repasseLiquidoAbertura = Math.max(
      0,
      receitasAbertura.totalIgualitarioBruto - descontoEmprestimosPrevisto - retencaoSancaoPrevista
    );

    const orcamentoMinimoDesfile = regraDivisao.minimoObrigatorio;
    const orcamentoRecomendadoDesfile = regraDivisao.referenciaIdeal;
    const valorDesembolsadoDesfile = estadoComite.valorDesembolsadoDesfile || 0;
    const restanteObrigatorioDesfile = Math.max(
      0,
      orcamentoMinimoDesfile - valorDesembolsadoDesfile
    );
    const desfileQuitado =
      estadoComite.desfileQuitadoTemporada || restanteObrigatorioDesfile === 0;

    const folhaEquipeAnual = Object.values(school.staff || {}).reduce(
      (acc, member) => acc + (member?.salary || 0),
      0
    );

    const saldoCaixaAtual = school.budget;
    const saldoProjetadoAposDesfile = saldoCaixaAtual - restanteObrigatorioDesfile;
    const deficitParaMinimo = saldoProjetadoAposDesfile < 0 ? Math.abs(saldoProjetadoAposDesfile) : 0;

    const totalDividaEmprestimos = estadoComite.emprestimosAtivos.reduce(
      (acc, e) => acc + e.saldoDevedor,
      0
    );

    let statusComite: StatusComiteEconomico = 'regular';
    let statusComiteLabel = 'Regular · Adimplente';
    let statusComiteResumo =
      'Receitas e caixa cobrem o mínimo obrigatório do desfile sem intervenção do Comitê Econômico.';

    if (
      estadoComite.impedidaDeDesfilar ||
      (school.division === 'avaliacao' && !desfileQuitado && deficitParaMinimo > 0)
    ) {
      statusComite = 'impedida_desfilar';
      statusComiteLabel = estadoComite.impedidaDeDesfilar
        ? 'Impedida de Desfilar · Afastamento 1 Ano'
        : 'Risco de Impedimento · Avaliação';
      statusComiteResumo = estadoComite.impedidaDeDesfilar
        ? estadoComite.motivoImpedimento ||
          'Impedida de desfilar pelo Comitê Econômico da Superliga (afastamento mínimo de 1 ano).'
        : `Faltam R$ ${deficitParaMinimo.toLocaleString('pt-BR')} para atingir o mínimo obrigatório de R$ ${orcamentoMinimoDesfile.toLocaleString('pt-BR')}. Sem cobertura, a Superliga impede o desfile e afasta a escola por no mínimo 1 ano.`;
    } else if (estadoComite.pontosPenalizacaoProximoCarnaval > 0) {
      statusComite = 'perda_pontos';
      statusComiteLabel = `Punição Ativa · -${estadoComite.pontosPenalizacaoProximoCarnaval.toFixed(1)} pt`;
      statusComiteResumo = `O ${regraDivisao.comiteNome} aplicou perda de -${estadoComite.pontosPenalizacaoProximoCarnaval.toFixed(1)} ponto(s) na apuração devido a déficit anterior.`;
    } else if (estadoComite.sancoesAtivas.length > 0 || estadoComite.percentualRetencaoProximoRepasse > 0) {
      statusComite = 'sancao_administrativa';
      statusComiteLabel = 'Sanção Administrativa Ativa';
      statusComiteResumo = `Retenção prevista de ${Math.round(
        estadoComite.percentualRetencaoProximoRepasse * 100
      )}% sobre repasses futuros determinada pelo ${regraDivisao.comiteNome}.`;
    } else if (saldoCaixaAtual < 0 || (!desfileQuitado && deficitParaMinimo > 0)) {
      statusComite = 'alerta_orcamento';
      statusComiteLabel = saldoCaixaAtual < 0 ? 'Caixa no Vermelho' : 'Déficit para Mínimo Obrigatório';
      statusComiteResumo =
        saldoCaixaAtual < 0
          ? `Caixa negativo em R$ ${Math.abs(saldoCaixaAtual).toLocaleString('pt-BR')}. O ${regraDivisao.comiteNome} aplicará empréstimo compulsório e sanções se não houver regularização.`
          : `Faltam R$ ${deficitParaMinimo.toLocaleString('pt-BR')} para quitar o mínimo obrigatório de R$ ${orcamentoMinimoDesfile.toLocaleString('pt-BR')}. Capte patrocínios/eventos ou solicite empréstimo ao ${regraDivisao.comiteNome}.`;
    } else if (totalDividaEmprestimos > 0) {
      statusComite = 'emprestimo_ativo';
      statusComiteLabel = 'Empréstimo da Liga em Amortização';
      statusComiteResumo = `Saldo devedor de R$ ${totalDividaEmprestimos.toLocaleString('pt-BR')} junto ao ${regraDivisao.comiteNome}, com desconto automático nos repasses futuros.`;
    }

    const ultimoPremioPosCarnaval = this.obterUltimoPremioPosCarnaval(school, history);

    return {
      anoTemporada: currentYear,
      regraDivisao,
      receitasAbertura,
      patrocinioTematicoRealizado,
      patrocinioTematicoNome: activeThematic?.sponsorName,
      patrocinioTematicoBonusCultural,
      patrocinioMasterOuComunitarioStatus,
      descontoEmprestimosPrevisto,
      retencaoSancaoPrevista,
      repasseLiquidoAbertura,
      ultimoPremioPosCarnaval,
      orcamentoMinimoDesfile,
      orcamentoRecomendadoDesfile,
      valorDesembolsadoDesfile,
      restanteObrigatorioDesfile,
      desfileQuitado,
      folhaEquipeAnual,
      saldoCaixaAtual,
      saldoProjetadoAposDesfile,
      deficitParaMinimo,
      totalDividaEmprestimos,
      statusComite,
      statusComiteLabel,
      statusComiteResumo,
      estadoComite
    };
  }

  /**
   * Empenha/quita o orçamento mínimo obrigatório do desfile diretamente do caixa da escola.
   */
  public static quitarOrcamentoMinimoDesfile(
    school: School,
    currentYear: number,
    valorEscolhido?: number
  ): { ok: boolean; updatedSchool?: School; message: string } {
    const regra = this.getRegraDivisao(school.division);
    const estado = this.getOrInitEstadoComite(school, currentYear);

    const metaValor =
      school.division === 'avaliacao' && valorEscolhido
        ? Math.max(regra.minimoObrigatorio, Math.min(regra.referenciaIdeal, valorEscolhido))
        : regra.minimoObrigatorio;

    const restante = Math.max(0, metaValor - estado.valorDesembolsadoDesfile);

    if (restante <= 0 && estado.desfileQuitadoTemporada) {
      return {
        ok: false,
        message: `O orçamento mínimo obrigatório do desfile de ${currentYear} já foi integralmente desembolsado.`
      };
    }

    if (school.budget < restante) {
      const falta = restante - school.budget;
      return {
        ok: false,
        message:
          school.division === 'avaliacao'
            ? `Caixa insuficiente! Faltam R$ ${falta.toLocaleString('pt-BR')} para quitar o mínimo de R$ ${metaValor.toLocaleString('pt-BR')}. Realize eventos na quadra ou feche patrocínios para evitar o impedimento de desfilar e afastamento mínimo de 1 ano.`
            : `Caixa insuficiente! Faltam R$ ${falta.toLocaleString('pt-BR')} para desembolsar o mínimo obrigatório de R$ ${metaValor.toLocaleString('pt-BR')}. Feche patrocínios, realize eventos ou solicite um Empréstimo Emergencial ao ${regra.comiteNome}.`
      };
    }

    const novoCaixa = school.budget - restante;
    const novoDesembolso = estado.valorDesembolsadoDesfile + restante;
    const quitado = novoDesembolso >= regra.minimoObrigatorio;
    const bonusBarracao =
      school.division === 'avaliacao' && novoDesembolso >= regra.referenciaIdeal ? 14 : 10;

    const novoEstado: EstadoComiteEconomicoEscola = {
      ...estado,
      valorDesembolsadoDesfile: novoDesembolso,
      desfileQuitadoTemporada: quitado,
      impedidaDeDesfilar: false,
      motivoImpedimento: undefined
    };

    const updatedSchool: School = {
      ...school,
      budget: novoCaixa,
      barracaoProgress: Math.min(100, (school.barracaoProgress || 70) + bonusBarracao),
      comiteEconomico: novoEstado,
      ...(school.financas
        ? {
            financas: {
              ...school.financas,
              saldoCaixa: novoCaixa
            }
          }
        : {})
    };

    return {
      ok: true,
      updatedSchool,
      message: `Desembolso obrigatório de R$ ${restante.toLocaleString('pt-BR')} confirmado para o desfile de ${currentYear}! Situação regularizada perante o ${regra.comiteNome} e barracão +${bonusBarracao}%.`
    };
  }

  /**
   * Contrata Empréstimo Emergencial junto ao Comitê Econômico da respectiva Liga/Superliga,
   * com desconto automático em parcelas anuais sobre os repasses futuros.
   */
  public static contratarEmprestimoComite(
    school: School,
    currentYear: number,
    valorSolicitado: number,
    parcelas: 2 | 3 = 2,
    motivo: string = 'Cobertura do orçamento mínimo obrigatório do desfile'
  ): { ok: boolean; updatedSchool?: School; message: string } {
    const regra = this.getRegraDivisao(school.division);

    if (!regra.permiteEmprestimoLiga) {
      return {
        ok: false,
        message:
          'O Grupo de Avaliação não possui repasses fixos da Superliga para lastrear empréstimos. A agremiação deve arrecadar o mínimo (R$ 50.000 a R$ 100.000) por patrocínios e eventos, sob pena de impedimento de desfile e afastamento mínimo de 1 ano.'
      };
    }

    const valorLimpo = Math.max(10_000, Math.round(valorSolicitado / 1_000) * 1_000);
    const tetoEmprestimo = regra.minimoObrigatorio;
    const estado = this.getOrInitEstadoComite(school, currentYear);
    const dividaAtual = estado.emprestimosAtivos.reduce((acc, e) => acc + e.saldoDevedor, 0);

    if (dividaAtual + valorLimpo > tetoEmprestimo * 1.5) {
      return {
        ok: false,
        message: `Limite de crédito excedido junto ao ${regra.comiteNome}. Amortize contratos anteriores antes de solicitar novo aporte.`
      };
    }

    const jurosPercentual = parcelas === 2 ? 10 : 15;
    const valorTotalDevido = Math.round(valorLimpo * (1 + jurosPercentual / 100));
    const valorParcelaAnual = Math.ceil(valorTotalDevido / parcelas);

    const novoEmprestimo: EmprestimoComiteEconomico = {
      id: `emp_${school.id}_${currentYear}_${Date.now()}`,
      liga: regra.liga,
      anoContratacao: currentYear,
      valorPrincipal: valorLimpo,
      jurosPercentual,
      valorTotalDevido,
      saldoDevedor: valorTotalDevido,
      parcelasRestantes: parcelas,
      valorParcelaAnual,
      motivo
    };

    const novoCaixa = school.budget + valorLimpo;
    const novoEstado: EstadoComiteEconomicoEscola = {
      ...estado,
      emprestimosAtivos: [...estado.emprestimosAtivos, novoEmprestimo]
    };

    const updatedSchool: School = {
      ...school,
      budget: novoCaixa,
      comiteEconomico: novoEstado,
      ...(school.financas
        ? {
            financas: {
              ...school.financas,
              saldoCaixa: novoCaixa,
              dividaConsolidada: (school.financas.dividaConsolidada || 0) + valorTotalDevido
            }
          }
        : {})
    };

    return {
      ok: true,
      updatedSchool,
      message: `Empréstimo de R$ ${valorLimpo.toLocaleString('pt-BR')} liberado pelo ${regra.comiteNome}! Total com taxa (${jurosPercentual}%): R$ ${valorTotalDevido.toLocaleString('pt-BR')} em ${parcelas}x de R$ ${valorParcelaAnual.toLocaleString('pt-BR')}, descontadas automaticamente dos repasses futuros.`
    };
  }

  /**
   * Amortiza antecipadamente uma parcela ou quita integralmente um empréstimo do Comitê Econômico.
   */
  public static quitarParcelaEmprestimo(
    school: School,
    currentYear: number,
    loanId: string,
    quitarTotal: boolean = false
  ): { ok: boolean; updatedSchool?: School; message: string } {
    const estado = this.getOrInitEstadoComite(school, currentYear);
    const loan = estado.emprestimosAtivos.find((e) => e.id === loanId);
    if (!loan) {
      return { ok: false, message: 'Contrato de empréstimo não encontrado.' };
    }

    const valorPagar = quitarTotal
      ? loan.saldoDevedor
      : Math.min(loan.saldoDevedor, loan.valorParcelaAnual);

    if (school.budget < valorPagar) {
      return {
        ok: false,
        message: `Saldo insuficiente em caixa para amortizar R$ ${valorPagar.toLocaleString('pt-BR')}.`
      };
    }

    const novoCaixa = school.budget - valorPagar;
    const novosEmprestimos = estado.emprestimosAtivos
      .map((e) => {
        if (e.id !== loanId) return e;
        const novoSaldo = Math.max(0, e.saldoDevedor - valorPagar);
        const novasParcelas = novoSaldo === 0 ? 0 : Math.max(1, e.parcelasRestantes - 1);
        return {
          ...e,
          saldoDevedor: novoSaldo,
          parcelasRestantes: novasParcelas
        };
      })
      .filter((e) => e.saldoDevedor > 0);

    const novoEstado: EstadoComiteEconomicoEscola = {
      ...estado,
      emprestimosAtivos: novosEmprestimos
    };

    const updatedSchool: School = {
      ...school,
      budget: novoCaixa,
      comiteEconomico: novoEstado,
      ...(school.financas
        ? {
            financas: {
              ...school.financas,
              saldoCaixa: novoCaixa,
              dividaConsolidada: Math.max(0, (school.financas.dividaConsolidada || 0) - valorPagar)
            }
          }
        : {})
    };

    return {
      ok: true,
      updatedSchool,
      message:
        quitarTotal || loan.saldoDevedor <= valorPagar
          ? `Empréstimo junto ao Comitê Econômico (${loan.liga}) quitado integralmente (R$ ${valorPagar.toLocaleString('pt-BR')})!`
          : `Parcela de R$ ${valorPagar.toLocaleString('pt-BR')} amortizada antecipadamente. Repasses futuros preservados!`
    };
  }

  /**
   * Processamento completo de fechamento de temporada e abertura da próxima temporada:
   * 1. Entrega prêmios pós-Carnaval da temporada encerrada.
   * 2. Liquida o desembolso mínimo obrigatório do desfile caso não tenha sido quitado.
   * 3. Aciona o Comitê Econômico da respectiva Liga/Superliga em caso de caixa negativo ou inadimplência:
   *    - Especial/Ouro/Prata/Bronze: empréstimo compulsório (descontado em repasses futuros), retenções administrativas e perda de pontos.
   *    - Grupo de Avaliação: impedimento de desfilar e afastamento obrigatório por no mínimo 1 ano.
   * 4. Credita os valores igualitários de abertura da nova temporada (já descontando parcelas de empréstimos e retenções).
   */
  public static processarFechamentoEAberturaTemporada(params: {
    school: School;
    divisaoTemporadaEncerrada: DivisionId;
    divisaoProximaTemporada: DivisionId;
    anoEncerrado: number;
    premioPosCarnaval: number;
    folhaEquipeAnual: number;
    totalEscolasPrataProximaTemporada: number;
    isPlayerSchool: boolean;
  }): {
    budgetFinal: number;
    comiteEconomico: EstadoComiteEconomicoEscola;
    prestacaoContas: PrestacaoContasLiga;
    impedidaAvaliacao: boolean;
    suspensionReason?: string;
  } {
    const {
      school,
      divisaoTemporadaEncerrada,
      divisaoProximaTemporada,
      anoEncerrado,
      premioPosCarnaval,
      folhaEquipeAnual,
      totalEscolasPrataProximaTemporada,
      isPlayerSchool
    } = params;

    const regraEncerrada = this.getRegraDivisao(divisaoTemporadaEncerrada);
    const regraProxima = this.getRegraDivisao(divisaoProximaTemporada);
    const estadoAtual = this.getOrInitEstadoComite(school, anoEncerrado);

    // 1. Prêmio pós-Carnaval da temporada encerrada é creditado após a apuração
    let saldo = school.budget + premioPosCarnaval;

    // Para escolas da IA que não jogaram manualmente eventos/patrocínios da quadra,
    // simulamos a captação sazonal realista da diretoria (eventos + patrocínio local/master)
    if (!isPlayerSchool) {
      const moralFactor = Math.max(0.55, Math.min(1.15, (school.fanBaseMorale || 75) / 85));
      if (divisaoTemporadaEncerrada === 'prata') {
        saldo += Math.round(210_000 * moralFactor);
      } else if (divisaoTemporadaEncerrada === 'bronze') {
        saldo += Math.round(240_000 * moralFactor);
      } else if (divisaoTemporadaEncerrada === 'avaliacao') {
        saldo += Math.round(68_000 * moralFactor);
      }
    }

    // 2. Desembolso obrigatório do mínimo de desfile (se ainda não quitado na temporada) + folha salarial
    const restanteMinimo = Math.max(
      0,
      regraEncerrada.minimoObrigatorio - (estadoAtual.valorDesembolsadoDesfile || 0)
    );
    saldo -= restanteMinimo;
    saldo -= Math.min(folhaEquipeAnual, Math.round(regraEncerrada.minimoObrigatorio * 0.25));

    // 3. Avaliação do Comitê Econômico sobre o fechamento da temporada encerrada
    let emprestimosAtualizados: EmprestimoComiteEconomico[] = [...estadoAtual.emprestimosAtivos];
    const novasSancoes: SancaoComiteEconomico[] = [];
    let pontosPenalizacao = 0;
    let percentualRetencao = 0;
    let bloqueioElite = false;
    let impedidaAvaliacao = false;
    let suspensionReason: string | undefined;

    if (saldo < 0) {
      const deficit = Math.abs(saldo);

      if (divisaoTemporadaEncerrada === 'avaliacao') {
        // Grupo de Avaliação: impedimento de desfilar e afastamento mínimo de 1 ano
        impedidaAvaliacao = true;
        suspensionReason = `Impedida de desfilar pelo Comitê Econômico da Superliga (déficit de R$ ${deficit.toLocaleString('pt-BR')} frente ao mínimo obrigatório de R$ 50.000 a R$ 100.000) • Afastamento obrigatório de no mínimo 1 ano.`;
        novasSancoes.push({
          id: `sanc_ava_${school.id}_${anoEncerrado}`,
          liga: 'SUPERLIGA',
          anoAplicacao: anoEncerrado,
          tipo: 'impedimento_avaliacao',
          titulo: 'Impedimento de Desfile · Grupo de Avaliação',
          descricao: suspensionReason,
          anosAfastamento: 1,
          ativa: true
        });
      } else {
        // Especial, Ouro, Prata, Bronze: empréstimo compulsório + sanções progressivas
        const proporcao = deficit / Math.max(1, regraEncerrada.minimoObrigatorio);
        const parcelasCompulsorias = proporcao > 0.35 ? 3 : 2;
        const juros = parcelasCompulsorias === 3 ? 15 : 10;
        const totalDevido = Math.round(deficit * (1 + juros / 100));

        emprestimosAtualizados.push({
          id: `emp_comp_${school.id}_${anoEncerrado}`,
          liga: regraEncerrada.liga,
          anoContratacao: anoEncerrado,
          valorPrincipal: deficit,
          jurosPercentual: juros,
          valorTotalDevido: totalDevido,
          saldoDevedor: totalDevido,
          parcelasRestantes: parcelasCompulsorias,
          valorParcelaAnual: Math.ceil(totalDevido / parcelasCompulsorias),
          motivo: `Empréstimo compulsório do ${regraEncerrada.comiteNome} para cobertura de déficit no desfile de ${anoEncerrado}`
        });

        // O empréstimo compulsório cobre o saldo negativo imediato para a escola não quebrar
        saldo = 0;

        if (proporcao <= 0.15) {
          percentualRetencao = 0.15;
          novasSancoes.push({
            id: `sanc_ret_${school.id}_${anoEncerrado}`,
            liga: regraEncerrada.liga,
            anoAplicacao: anoEncerrado,
            tipo: 'retencao_repasse',
            titulo: 'Retenção Administrativa de Repasses (15%)',
            descricao: `Déficit leve de R$ ${deficit.toLocaleString('pt-BR')} na temporada ${anoEncerrado}. Retenção de 15% aplicada pelo ${regraEncerrada.comiteNome}.`,
            percentualRetencao: 0.15,
            ativa: true
          });
        } else if (proporcao <= 0.35) {
          percentualRetencao = 0.25;
          pontosPenalizacao = 0.3;
          bloqueioElite = true;
          novasSancoes.push(
            {
              id: `sanc_adm_${school.id}_${anoEncerrado}`,
              liga: regraEncerrada.liga,
              anoAplicacao: anoEncerrado,
              tipo: 'restricao_administrativa',
              titulo: 'Sanção Administrativa · Retenção de 25% e Bloqueio de Elite',
              descricao: `Déficit moderado de R$ ${deficit.toLocaleString('pt-BR')}. Retenção de 25% dos repasses e restrição de contratações.`,
              percentualRetencao: 0.25,
              ativa: true
            },
            {
              id: `sanc_pts_${school.id}_${anoEncerrado}`,
              liga: regraEncerrada.liga,
              anoAplicacao: anoEncerrado,
              tipo: 'perda_pontos',
              titulo: 'Perda de 0,3 Ponto na Apuração',
              descricao: `Penalidade esportiva aplicada pelo ${regraEncerrada.comiteNome} na apuração de ${anoEncerrado + 1}.`,
              pontosDeduzidos: 0.3,
              ativa: true
            }
          );
        } else {
          percentualRetencao = 0.35;
          pontosPenalizacao = 0.8;
          bloqueioElite = true;
          novasSancoes.push(
            {
              id: `sanc_adm_${school.id}_${anoEncerrado}`,
              liga: regraEncerrada.liga,
              anoAplicacao: anoEncerrado,
              tipo: 'restricao_administrativa',
              titulo: 'Intervenção Fiscal · Retenção de 35% e Bloqueio de Elite',
              descricao: `Déficit grave de R$ ${deficit.toLocaleString('pt-BR')}. Retenção de 35% dos repasses e restrição administrativa severa.`,
              percentualRetencao: 0.35,
              ativa: true
            },
            {
              id: `sanc_pts_${school.id}_${anoEncerrado}`,
              liga: regraEncerrada.liga,
              anoAplicacao: anoEncerrado,
              tipo: 'perda_pontos',
              titulo: 'Perda de 0,8 Ponto na Apuração',
              descricao: `Penalidade esportiva grave aplicada pelo ${regraEncerrada.comiteNome} na apuração de ${anoEncerrado + 1}.`,
              pontosDeduzidos: 0.8,
              ativa: true
            }
          );
        }
      }
    }

    // 4. Abertura da nova temporada: valores igualitários da próxima divisão MENOS descontos de empréstimos e retenções
    const aberturaProxima = this.calcularReceitasIgualitariasAbertura(
      divisaoProximaTemporada,
      totalEscolasPrataProximaTemporada
    );
    const repasseBrutoProxima = impedidaAvaliacao ? 0 : aberturaProxima.totalIgualitarioBruto;
    const retencaoAplicada = Math.round(repasseBrutoProxima * percentualRetencao);
    let repasseAposRetencao = Math.max(0, repasseBrutoProxima - retencaoAplicada);

    // Desconto automático de parcelas de empréstimos ativos sobre os repasses futuros
    let totalDescontadoEmprestimos = 0;
    emprestimosAtualizados = emprestimosAtualizados
      .map((emp) => {
        if (emp.saldoDevedor <= 0 || repasseAposRetencao <= 0) return emp;
        const parcelaDevida = Math.min(emp.saldoDevedor, emp.valorParcelaAnual);
        const valorEfetivoDescontado = Math.min(repasseAposRetencao, parcelaDevida);
        repasseAposRetencao -= valorEfetivoDescontado;
        totalDescontadoEmprestimos += valorEfetivoDescontado;
        const novoSaldo = Math.max(0, emp.saldoDevedor - valorEfetivoDescontado);
        return {
          ...emp,
          saldoDevedor: novoSaldo,
          parcelasRestantes: novoSaldo === 0 ? 0 : Math.max(1, emp.parcelasRestantes - 1)
        };
      })
      .filter((emp) => emp.saldoDevedor > 0);

    const budgetFinal = impedidaAvaliacao ? Math.max(0, saldo) : saldo + repasseAposRetencao;

    const prestacaoContas: PrestacaoContasLiga = {
      status:
        pontosPenalizacao > 0 || impedidaAvaliacao
          ? 'reprovada_grave'
          : percentualRetencao > 0
          ? 'aprovada_com_ressalvas'
          : 'aprovada',
      deficitAcumulado:
        pontosPenalizacao > 0 || percentualRetencao > 0 || impedidaAvaliacao
          ? emprestimosAtualizados.reduce((acc, e) => acc + e.saldoDevedor, 0)
          : 0,
      penalizacaoPontosApuracao: pontosPenalizacao,
      percentualRetencaoRepasses: percentualRetencao,
      proibicaoContratacaoElite: bloqueioElite,
      anoExercicio: anoEncerrado
    };

    const comiteEconomico: EstadoComiteEconomicoEscola = {
      temporadaAtual: anoEncerrado + 1,
      receitasIniciaisCreditadasAno: anoEncerrado + 1,
      orcamentoMinimoDesfile: regraProxima.minimoObrigatorio,
      orcamentoRecomendadoDesfile: regraProxima.referenciaIdeal,
      valorDesembolsadoDesfile: 0,
      desfileQuitadoTemporada: false,
      descontoEmprestimoAplicadoAno: totalDescontadoEmprestimos > 0 ? anoEncerrado + 1 : undefined,
      valorDescontadoEmprestimosAno: totalDescontadoEmprestimos,
      retencaoAplicadaAno: retencaoAplicada,
      premiosPosCarnavalRecebidosAno: anoEncerrado,
      ultimoPremioPosCarnavalValor: premioPosCarnaval,
      emprestimosAtivos: emprestimosAtualizados,
      sancoesAtivas: novasSancoes,
      pontosPenalizacaoProximoCarnaval: pontosPenalizacao,
      percentualRetencaoProximoRepasse: 0, // Já foi aplicada sobre a abertura desta temporada
      bloqueioContratacaoElite: bloqueioElite,
      impedidaDeDesfilar: impedidaAvaliacao,
      motivoImpedimento: suspensionReason
    };

    return {
      budgetFinal,
      comiteEconomico,
      prestacaoContas,
      impedidaAvaliacao,
      suspensionReason
    };
  }

  public static formatCurrency(val: number): string {
    const abs = Math.abs(Math.round(val));
    const formatted = `R$ ${abs.toLocaleString('pt-BR')}`;
    return val < 0 ? `-${formatted}` : formatted;
  }
}
