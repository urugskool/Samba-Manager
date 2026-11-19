import React, { useMemo, useState } from 'react';
import {
  FileSpreadsheet,
  Scale,
  AlertTriangle,
  CheckCircle2,
  Landmark,
  Tv,
  Sparkles,
  Trophy,
  HandCoins,
  ShieldAlert,
  ArrowDownRight,
  ArrowUpRight,
  Ban
} from 'lucide-react';
import { DivisionId, School, YearHistory } from '../types/carnaval';
import {
  DemonstrativoFinanceiroService,
  REGRAS_ORCAMENTO_POR_DIVISAO
} from '../services/demonstrativoFinanceiroService';
import { soundService } from '../services/soundService';

export interface DemonstrativoFinanceiroProps {
  school: School;
  allSchools: School[];
  currentYear: number;
  history?: YearHistory[];
  onUpdateSchool: (updatedSchool: School) => void;
  onShowMessage: (msg: string, type?: 'info' | 'success' | 'warning' | 'alert') => void;
}

type ActiveStatementTab = 'resumo' | 'comite' | 'divisoes';

const ALL_DIVISIONS: DivisionId[] = ['especial', 'ouro', 'prata', 'bronze', 'avaliacao'];

export const DemonstrativoFinanceiro: React.FC<DemonstrativoFinanceiroProps> = ({
  school,
  allSchools,
  currentYear,
  history = [],
  onUpdateSchool,
  onShowMessage
}) => {
  const [activeTab, setActiveTab] = useState<ActiveStatementTab>('resumo');
  const [loanInstallments, setLoanInstallments] = useState<2 | 3>(2);
  const [avaliacaoTargetBudget, setAvaliacaoTargetBudget] = useState<number>(50_000);

  const demonstrativo = useMemo(
    () =>
      DemonstrativoFinanceiroService.gerarDemonstrativoFinanceiro(
        school,
        allSchools,
        currentYear,
        history
      ),
    [school, allSchools, currentYear, history]
  );

  const prataActiveCount = useMemo(
    () =>
      Math.max(
        1,
        (allSchools || []).filter((s) => s.division === 'prata' && !s.isInactive && !s.inactive)
          .length
      ),
    [allSchools]
  );

  // Valor padrão sugerido para empréstimo emergencial (cobre exatamente o déficit ou 25% do mínimo)
  const suggestedLoanAmount = useMemo(() => {
    if (demonstrativo.deficitParaMinimo > 0) {
      return Math.ceil(demonstrativo.deficitParaMinimo / 10_000) * 10_000;
    }
    const base = Math.round(demonstrativo.orcamentoMinimoDesfile * 0.25);
    return Math.max(50_000, Math.round(base / 10_000) * 10_000);
  }, [demonstrativo.deficitParaMinimo, demonstrativo.orcamentoMinimoDesfile]);

  const [customLoanAmount, setCustomLoanAmount] = useState<number | null>(null);
  const effectiveLoanAmount = customLoanAmount ?? suggestedLoanAmount;

  const loanFeePercent = loanInstallments === 2 ? 10 : 15;
  const loanTotalDue = Math.round(effectiveLoanAmount * (1 + loanFeePercent / 100));
  const loanAnnualInstallment = Math.ceil(loanTotalDue / loanInstallments);

  const formatBRL = DemonstrativoFinanceiroService.formatCurrency;

  const progressPercent = Math.min(
    100,
    Math.round(
      (demonstrativo.valorDesembolsadoDesfile /
        Math.max(1, demonstrativo.orcamentoMinimoDesfile)) *
        100
    )
  );

  const handleQuitarMinimo = () => {
    const targetValue =
      school.division === 'avaliacao' ? avaliacaoTargetBudget : demonstrativo.orcamentoMinimoDesfile;
    const result = DemonstrativoFinanceiroService.quitarOrcamentoMinimoDesfile(
      school,
      currentYear,
      targetValue
    );

    if (!result.ok || !result.updatedSchool) {
      soundService.playBuzzer();
      onShowMessage(result.message, 'warning');
      return;
    }

    soundService.playGavel();
    onUpdateSchool(result.updatedSchool);
    onShowMessage(result.message, 'success');
  };

  const handleContratarEmprestimo = () => {
    const result = DemonstrativoFinanceiroService.contratarEmprestimoComite(
      school,
      currentYear,
      effectiveLoanAmount,
      loanInstallments
    );

    if (!result.ok || !result.updatedSchool) {
      soundService.playBuzzer();
      onShowMessage(result.message, 'warning');
      return;
    }

    soundService.playGavel();
    onUpdateSchool(result.updatedSchool);
    setCustomLoanAmount(null);
    onShowMessage(result.message, 'success');
  };

  const handleAmortizarEmprestimo = (loanId: string, quitarTotal: boolean) => {
    const result = DemonstrativoFinanceiroService.quitarParcelaEmprestimo(
      school,
      currentYear,
      loanId,
      quitarTotal
    );

    if (!result.ok || !result.updatedSchool) {
      soundService.playBuzzer();
      onShowMessage(result.message, 'warning');
      return;
    }

    soundService.playLevelUp();
    onUpdateSchool(result.updatedSchool);
    onShowMessage(result.message, 'success');
  };

  // Estilo semântico do status do Comitê Econômico (sempre acompanhado de rótulo textual explícito)
  const statusTone = useMemo(() => {
    switch (demonstrativo.statusComite) {
      case 'regular':
        return {
          text: 'text-emerald-400',
          surface: 'bg-emerald-950/30 border-emerald-800/60',
          Icon: CheckCircle2
        };
      case 'emprestimo_ativo':
      case 'alerta_orcamento':
      case 'sancao_administrativa':
        return {
          text: 'text-amber-400',
          surface: 'bg-amber-950/30 border-amber-800/60',
          Icon: AlertTriangle
        };
      case 'perda_pontos':
      case 'impedida_desfilar':
      default:
        return {
          text: 'text-rose-400',
          surface: 'bg-rose-950/35 border-rose-800/70',
          Icon: demonstrativo.statusComite === 'impedida_desfilar' ? Ban : ShieldAlert
        };
    }
  }, [demonstrativo.statusComite]);

  const StatusIcon = statusTone.Icon;

  const loanPresetOptions = useMemo(() => {
    const min = demonstrativo.orcamentoMinimoDesfile;
    const raw = [
      demonstrativo.deficitParaMinimo > 0
        ? Math.ceil(demonstrativo.deficitParaMinimo / 10_000) * 10_000
        : Math.round(min * 0.2),
      Math.round(min * 0.35),
      Math.round(min * 0.5)
    ].map((v) => Math.max(20_000, Math.round(v / 10_000) * 10_000));
    return Array.from(new Set(raw)).sort((a, b) => a - b);
  }, [demonstrativo.deficitParaMinimo, demonstrativo.orcamentoMinimoDesfile]);

  return (
    <section
      aria-label="Demonstrativo Financeiro da Temporada"
      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
    >
      {/* Cabeçalho do Demonstrativo */}
      <div className="p-6 border-b border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Demonstrativo Contábil</span>
            <span aria-hidden="true">·</span>
            <span>Temporada {currentYear}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-300 font-medium">
              {demonstrativo.regraDivisao.divisionLabel} ({demonstrativo.regraDivisao.liga})
            </span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <FileSpreadsheet className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Demonstrativo Financeiro & Comitê Econômico</span>
          </h3>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Receitas igualitárias de abertura da temporada (direitos de transmissão e repasses da{' '}
            {demonstrativo.regraDivisao.liga}), patrocínios temáticos, prêmios pagos pós-Carnaval e
            cumprimento do orçamento mínimo obrigatório do desfile.
          </p>
        </div>

        {/* Controle Segmentado de Abas */}
        <div
          role="tablist"
          aria-label="Seções do Demonstrativo Financeiro"
          className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl self-start lg:self-auto"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'resumo'}
            onClick={() => setActiveTab('resumo')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'resumo'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Demonstrativo
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'comite'}
            onClick={() => setActiveTab('comite')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'comite'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Comitê Econômico</span>
            {(demonstrativo.statusComite !== 'regular' ||
              demonstrativo.estadoComite.emprestimosAtivos.length > 0) && (
              <span className={`font-mono text-[11px] ${statusTone.text}`}>!</span>
            )}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'divisoes'}
            onClick={() => setActiveTab('divisoes')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'divisoes'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pisos por Divisão
          </button>
        </div>
      </div>

      {/* Faixa de KPIs Principais (4 colunas limpas com hairline dividers) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 border-b border-slate-800 bg-slate-950/40">
        <div className="p-5 space-y-1">
          <div className="text-xs text-slate-400">Abertura Igualitária ({demonstrativo.regraDivisao.liga})</div>
          <div className="text-xl font-bold text-white font-mono tabular-nums">
            {formatBRL(demonstrativo.receitasAbertura.totalIgualitarioBruto)}
          </div>
          <div className="text-[11px] text-slate-400">
            TV {formatBRL(demonstrativo.receitasAbertura.direitosTransmissao)} · Liga/Subv.{' '}
            {formatBRL(
              demonstrativo.receitasAbertura.repasseLiga +
                demonstrativo.receitasAbertura.subvencaoPublica +
                demonstrativo.receitasAbertura.bilheteriaBaseIgualitaria
            )}
          </div>
        </div>

        <div className="p-5 space-y-1">
          <div className="text-xs text-slate-400">Patrocínio Temático ({currentYear})</div>
          <div
            className={`text-xl font-bold font-mono tabular-nums ${
              demonstrativo.patrocinioTematicoRealizado > 0 ? 'text-emerald-400' : 'text-slate-300'
            }`}
          >
            {formatBRL(demonstrativo.patrocinioTematicoRealizado)}
          </div>
          <div className="text-[11px] text-slate-400 truncate">
            {demonstrativo.patrocinioTematicoNome
              ? `${demonstrativo.patrocinioTematicoNome}${
                  demonstrativo.patrocinioTematicoBonusCultural > 0 ? ' (+40% Cultural)' : ''
                }`
              : 'Disponível para contratação na temporada'}
          </div>
        </div>

        <div className="p-5 space-y-1">
          <div className="text-xs text-slate-400">Mínimo Obrigatório do Desfile</div>
          <div className="text-xl font-bold text-amber-400 font-mono tabular-nums">
            {school.division === 'avaliacao'
              ? 'R$ 50.000 – 100.000'
              : formatBRL(demonstrativo.orcamentoMinimoDesfile)}
          </div>
          <div className="text-[11px] text-slate-400">
            {demonstrativo.desfileQuitado
              ? `Quitado (${formatBRL(demonstrativo.valorDesembolsadoDesfile)})`
              : `Restam ${formatBRL(demonstrativo.restanteObrigatorioDesfile)} a desembolsar`}
          </div>
        </div>

        <div className="p-5 space-y-1">
          <div className="text-xs text-slate-400">Situação · {demonstrativo.regraDivisao.comiteNome}</div>
          <div className={`text-sm font-bold flex items-center gap-1.5 pt-0.5 ${statusTone.text}`}>
            <StatusIcon className="w-4 h-4 shrink-0" />
            <span className="truncate">{demonstrativo.statusComiteLabel}</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono tabular-nums">
            Saldo após mínimo:{' '}
            <span
              className={
                demonstrativo.saldoProjetadoAposDesfile < 0
                  ? 'text-rose-400 font-semibold'
                  : 'text-emerald-400 font-semibold'
              }
            >
              {formatBRL(demonstrativo.saldoProjetadoAposDesfile)}
            </span>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* ABA 1: DEMONSTRATIVO FINANCEIRO DETALHADO (LEDGER CONTÁBIL)       */}
      {/* ================================================================ */}
      {activeTab === 'resumo' && (
        <div className="p-6 space-y-6">
          {/* Alerta Contextual do Comitê Econômico quando não está Regular */}
          {demonstrativo.statusComite !== 'regular' && (
            <div
              className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${statusTone.surface}`}
            >
              <div className="flex items-start gap-3">
                <StatusIcon className={`w-5 h-5 mt-0.5 shrink-0 ${statusTone.text}`} />
                <div className="space-y-1">
                  <div className={`text-sm font-semibold ${statusTone.text}`}>
                    {demonstrativo.regraDivisao.comiteNome} — {demonstrativo.statusComiteLabel}
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {demonstrativo.statusComiteResumo}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('comite')}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-700 text-white hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start md:self-center"
              >
                Abrir Comitê Econômico
              </button>
            </div>
          )}

          {/* Tabela Contábil Principal (DRE da Temporada) */}
          <div className="overflow-x-auto border border-slate-800 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400">
                  <th className="py-3 px-4 font-semibold">Rubrica Financeira</th>
                  <th className="py-3 px-4 font-semibold">Momento do Repasse</th>
                  <th className="py-3 px-4 font-semibold">Regime</th>
                  <th className="py-3 px-4 font-semibold text-right">Valor (R$)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-sm">
                {/* Bloco 1: Direitos de Transmissão */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2 font-medium text-white">
                      <Tv className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>Direitos de Transmissão (TV Regular)</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 pl-6">
                      {demonstrativo.receitasAbertura.detalheDireitosTransmissao}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-300 whitespace-nowrap">
                    Abertura da Temporada
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap">
                    Igualitário
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-emerald-400 whitespace-nowrap">
                    {formatBRL(demonstrativo.receitasAbertura.direitosTransmissao)}
                  </td>
                </tr>

                {/* Bloco 2: Repasse da Liga / Superliga */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2 font-medium text-white">
                      <Landmark className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Repasse Oficial ({demonstrativo.regraDivisao.liga})</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 pl-6">
                      {demonstrativo.receitasAbertura.detalheRepasseLiga}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-300 whitespace-nowrap">
                    Abertura da Temporada
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap">
                    Igualitário
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-emerald-400 whitespace-nowrap">
                    {formatBRL(demonstrativo.receitasAbertura.repasseLiga)}
                  </td>
                </tr>

                {/* Subvenção Pública (quando houver) */}
                {demonstrativo.receitasAbertura.subvencaoPublica > 0 && (
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2 font-medium text-white">
                        <ArrowUpRight className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Subvenção Pública (Estado + Prefeitura)</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 pl-6">
                        {demonstrativo.receitasAbertura.detalheSubvencao}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-300 whitespace-nowrap">
                      Abertura da Temporada
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap">
                      Igualitário
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-emerald-400 whitespace-nowrap">
                      {formatBRL(demonstrativo.receitasAbertura.subvencaoPublica)}
                    </td>
                  </tr>
                )}

                {/* Bilheteria Base (Grupo Especial) */}
                {demonstrativo.receitasAbertura.bilheteriaBaseIgualitaria > 0 && (
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2 font-medium text-white">
                        <ArrowUpRight className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Bilheteria Oficial Base (15% ÷ 12 Escolas)</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 pl-6">
                        {demonstrativo.receitasAbertura.detalheBilheteria}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-300 whitespace-nowrap">
                      Abertura da Temporada
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap">
                      Igualitário
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-emerald-400 whitespace-nowrap">
                      {formatBRL(demonstrativo.receitasAbertura.bilheteriaBaseIgualitaria)}
                    </td>
                  </tr>
                )}

                {/* Bloco 3: Patrocínio Temático */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2 font-medium text-white">
                      <Sparkles className="w-4 h-4 text-violet-400 shrink-0" />
                      <span>Patrocínio Temático do Enredo</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 pl-6">
                      {demonstrativo.patrocinioTematicoNome
                        ? `Contrato homologado: ${demonstrativo.patrocinioTematicoNome}${
                            demonstrativo.patrocinioTematicoBonusCultural > 0
                              ? ` · Inclui Bônus Cultural (+${formatBRL(
                                  demonstrativo.patrocinioTematicoBonusCultural
                                )})`
                              : ''
                          }`
                        : 'Receita variável conforme o tema do enredo (enredos Históricos rendem +40% de bônus cultural).'}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-300 whitespace-nowrap">
                    Na Contratação
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap">
                    Gestão da Escola
                  </td>
                  <td
                    className={`py-3.5 px-4 text-right font-mono tabular-nums font-semibold whitespace-nowrap ${
                      demonstrativo.patrocinioTematicoRealizado > 0
                        ? 'text-emerald-400'
                        : 'text-slate-500'
                    }`}
                  >
                    {formatBRL(demonstrativo.patrocinioTematicoRealizado)}
                  </td>
                </tr>

                {/* Bloco 4: Premiações Pós-Carnaval */}
                <tr className="bg-slate-950/35 hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2 font-medium text-white">
                      <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Prêmios por Classificação & Premiações</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 pl-6">
                      {demonstrativo.regraDivisao.premiacaoPosCarnavalResumo}
                      {demonstrativo.ultimoPremioPosCarnaval && (
                        <span className="text-slate-300">
                          {' '}
                          Último recebido ({demonstrativo.ultimoPremioPosCarnaval.ano} ·{' '}
                          {demonstrativo.ultimoPremioPosCarnaval.posicao}º lugar):{' '}
                          {formatBRL(demonstrativo.ultimoPremioPosCarnaval.valorTotal)}.
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-medium text-amber-300 whitespace-nowrap">
                    Pós-Carnaval (Apuração)
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-400 whitespace-nowrap">
                    Mérito Esportivo
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums text-xs text-amber-300 whitespace-nowrap">
                    A apurar pós-desfile
                  </td>
                </tr>

                {/* Deduções de Empréstimos / Retenções (quando ativas) */}
                {(demonstrativo.descontoEmprestimosPrevisto > 0 ||
                  demonstrativo.retencaoSancaoPrevista > 0) && (
                  <tr className="bg-rose-950/20 hover:bg-rose-950/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2 font-medium text-rose-300">
                        <ArrowDownRight className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>Descontos do Comitê Econômico em Repasses Futuros</span>
                      </div>
                      <div className="text-xs text-rose-200/80 mt-0.5 pl-6">
                        Parcelas de empréstimos ({formatBRL(demonstrativo.descontoEmprestimosPrevisto)})
                        {demonstrativo.retencaoSancaoPrevista > 0
                          ? ` + retenção administrativa (${formatBRL(
                              demonstrativo.retencaoSancaoPrevista
                            )})`
                          : ''}
                        .
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-rose-300 whitespace-nowrap">
                      Próximo Repasse
                    </td>
                    <td className="py-3.5 px-4 text-xs text-rose-300 whitespace-nowrap">
                      Compulsório
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-rose-400 whitespace-nowrap">
                      -{formatBRL(demonstrativo.descontoEmprestimosPrevisto + demonstrativo.retencaoSancaoPrevista)}
                    </td>
                  </tr>
                )}

                {/* Linha de Obrigação Mínima do Desfile */}
                <tr className="bg-slate-950/60">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 font-semibold text-white">
                      <Scale className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Orçamento Mínimo Obrigatório do Desfile ({currentYear})</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 pl-6">
                      Desembolso obrigatório com as receitas da escola. Já desembolsado:{' '}
                      <span className="text-slate-200 font-mono tabular-nums">
                        {formatBRL(demonstrativo.valorDesembolsadoDesfile)}
                      </span>{' '}
                      · Restante obrigatório:{' '}
                      <span className="text-amber-300 font-mono tabular-nums">
                        {formatBRL(demonstrativo.restanteObrigatorioDesfile)}
                      </span>
                      .
                    </div>
                  </td>
                  <td className="py-4 px-4 text-xs text-slate-300 whitespace-nowrap">
                    Antes do Desfile
                  </td>
                  <td className="py-4 px-4 text-xs text-amber-300 font-medium whitespace-nowrap">
                    Obrigatório
                  </td>
                  <td className="py-4 px-4 text-right font-mono tabular-nums font-bold text-rose-400 whitespace-nowrap">
                    -{formatBRL(demonstrativo.orcamentoMinimoDesfile)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Painel de Execução do Orçamento Mínimo Obrigatório */}
          <div className="border border-slate-800 rounded-xl p-5 bg-slate-950/50 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-sm font-semibold text-white">
                  Cumprimento do Piso Obrigatório · {demonstrativo.regraDivisao.divisionLabel}
                </div>
                <p className="text-xs text-slate-400">
                  {demonstrativo.desfileQuitado
                    ? `Desfile de ${currentYear} com orçamento mínimo integralmente empenhado (${formatBRL(
                        demonstrativo.valorDesembolsadoDesfile
                      )}). Escola liberada para desfilar sem pendências de piso.`
                    : `Desembolse o mínimo obrigatório (${demonstrativo.regraDivisao.faixaMinimaLabel}) usando suas receitas para garantir liberação plena junto ao ${demonstrativo.regraDivisao.comiteNome}.`}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {school.division === 'avaliacao' && !demonstrativo.desfileQuitado && (
                  <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setAvaliacaoTargetBudget(50_000)}
                      className={`px-2.5 py-1.5 text-xs font-mono tabular-nums rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                        avaliacaoTargetBudget === 50_000
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      R$ 50.000
                    </button>
                    <button
                      type="button"
                      onClick={() => setAvaliacaoTargetBudget(100_000)}
                      className={`px-2.5 py-1.5 text-xs font-mono tabular-nums rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                        avaliacaoTargetBudget === 100_000
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      R$ 100.000
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  disabled={demonstrativo.desfileQuitado}
                  onClick={handleQuitarMinimo}
                  className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
                    demonstrativo.desfileQuitado
                      ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/60 cursor-default'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer'
                  }`}
                >
                  {demonstrativo.desfileQuitado ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Orçamento Mínimo Quitado</span>
                    </>
                  ) : (
                    <>
                      <HandCoins className="w-4 h-4 shrink-0" />
                      <span>
                        Desembolsar Mínimo (
                        {formatBRL(
                          school.division === 'avaliacao'
                            ? Math.max(
                                0,
                                avaliacaoTargetBudget - demonstrativo.valorDesembolsadoDesfile
                              )
                            : demonstrativo.restanteObrigatorioDesfile
                        )}
                        )
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Barra de Progresso de Quitação do Mínimo */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono tabular-nums">
                <span>
                  Empenhado: {formatBRL(demonstrativo.valorDesembolsadoDesfile)} de{' '}
                  {formatBRL(demonstrativo.orcamentoMinimoDesfile)}
                </span>
                <span className={progressPercent >= 100 ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    progressPercent >= 100 ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* ABA 2: COMITÊ ECONÔMICO, EMPRÉSTIMOS E SANÇÕES                    */}
      {/* ================================================================ */}
      {activeTab === 'comite' && (
        <div className="p-6 space-y-6">
          {/* Diagnóstico do Comitê */}
          <div className={`p-5 rounded-xl border space-y-2 ${statusTone.surface}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className={`text-sm font-bold flex items-center gap-2 ${statusTone.text}`}>
                <StatusIcon className="w-4 h-4 shrink-0" />
                <span>{demonstrativo.regraDivisao.comiteNome}</span>
              </div>
              <span className={`text-xs font-semibold ${statusTone.text}`}>
                {demonstrativo.statusComiteLabel}
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {demonstrativo.statusComiteResumo}
            </p>
            <div className="pt-2 border-t border-slate-800/70 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-slate-300 font-mono tabular-nums">
              <span>Caixa atual: {formatBRL(demonstrativo.saldoCaixaAtual)}</span>
              <span>
                Mínimo pendente: {formatBRL(demonstrativo.restanteObrigatorioDesfile)}
              </span>
              <span>
                Dívida ativa na Liga: {formatBRL(demonstrativo.totalDividaEmprestimos)}
              </span>
              <span>
                Penalidade apuração:{' '}
                {demonstrativo.estadoComite.pontosPenalizacaoProximoCarnaval > 0
                  ? `-${demonstrativo.estadoComite.pontosPenalizacaoProximoCarnaval.toFixed(1)} pt`
                  : '0,0 pt'}
              </span>
            </div>
          </div>

          {/* Linha de Crédito / Empréstimo Emergencial ou Regra Especial do Grupo de Avaliação */}
          {demonstrativo.regraDivisao.permiteEmprestimoLiga ? (
            <div className="border border-slate-800 rounded-xl p-5 bg-slate-950/50 space-y-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">
                  Empréstimo Emergencial · {demonstrativo.regraDivisao.comiteNome}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Quando as receitas não cobrem o mínimo obrigatório do desfile ou o caixa fica no
                  vermelho, a agremiação pode contratar empréstimo junto ao comitê econômico da sua
                  liga. As parcelas são descontadas automaticamente dos repasses futuros da{' '}
                  {demonstrativo.regraDivisao.liga}.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                {/* Escolha do Valor */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300 block">
                    Valor do Empréstimo
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {loanPresetOptions.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setCustomLoanAmount(amount)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono tabular-nums border transition-colors whitespace-nowrap cursor-pointer ${
                          effectiveLoanAmount === amount
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        {formatBRL(amount)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Escolha das Parcelas */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300 block">
                    Desconto em Repasses Futuros
                  </label>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setLoanInstallments(2)}
                      className={`px-3 py-1.5 rounded-lg text-xs border transition-colors whitespace-nowrap cursor-pointer ${
                        loanInstallments === 2
                          ? 'bg-slate-800 text-white border-slate-500 font-semibold'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      2 temporadas (taxa 10%)
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoanInstallments(3)}
                      className={`px-3 py-1.5 rounded-lg text-xs border transition-colors whitespace-nowrap cursor-pointer ${
                        loanInstallments === 3
                          ? 'bg-slate-800 text-white border-slate-500 font-semibold'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      3 temporadas (taxa 15%)
                    </button>
                  </div>
                </div>

                {/* Resumo e Ação */}
                <div className="flex flex-col justify-between gap-2">
                  <div className="text-xs text-slate-400 font-mono tabular-nums space-y-0.5">
                    <div>
                      Total a devolver:{' '}
                      <span className="text-white font-semibold">{formatBRL(loanTotalDue)}</span>
                    </div>
                    <div>
                      Desconto anual:{' '}
                      <span className="text-amber-400 font-semibold">
                        {formatBRL(loanAnnualInstallment)} / ano
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleContratarEmprestimo}
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Contratar Empréstimo ({formatBRL(effectiveLoanAmount)})
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-rose-800/70 rounded-xl p-5 bg-rose-950/25 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-rose-300">
                <Ban className="w-4 h-4 shrink-0" />
                <span>Regra Específica do Grupo de Avaliação · Impedimento de Desfile</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                O Grupo de Avaliação não recebe repasse fixo da Superliga, portanto não conta com
                linha de empréstimo lastreada em cotas futuras. A agremiação precisa obrigatoriamente
                orçar e desembolsar entre{' '}
                <strong className="text-white font-mono">R$ 50.000 e R$ 100.000</strong> usando
                patrocínios temáticos, apoio comunitário e eventos de quadra. Caso não atinja o
                mínimo ou encerre com saldo negativo, fica{' '}
                <strong className="text-rose-300">
                  impedida de desfilar e é afastada por no mínimo 1 ano
                </strong>
                .
              </p>
            </div>
          )}

          {/* Empréstimos Ativos */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">
                Empréstimos Ativos com Desconto em Repasses Futuros
              </h4>
              <span className="text-xs text-slate-400 font-mono tabular-nums">
                {demonstrativo.estadoComite.emprestimosAtivos.length} contrato(s)
              </span>
            </div>

            {demonstrativo.estadoComite.emprestimosAtivos.length === 0 ? (
              <div className="border border-slate-800 rounded-xl p-4 text-xs text-slate-400 bg-slate-950/30">
                Nenhum empréstimo ativo junto ao {demonstrativo.regraDivisao.comiteNome}. Os
                repasses futuros da liga estão 100% livres de descontos contratuais.
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400">
                      <th className="py-2.5 px-4 font-semibold">Contrato / Origem</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Saldo Devedor</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Parcela Anual</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Restantes</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Amortização</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-xs">
                    {demonstrativo.estadoComite.emprestimosAtivos.map((loan) => (
                      <tr key={loan.id} className="hover:bg-slate-800/30">
                        <td className="py-3 px-4">
                          <div className="font-medium text-white">
                            {loan.liga} · Temporada {loan.anoContratacao}
                          </div>
                          <div className="text-slate-400">{loan.motivo}</div>
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums text-rose-300 font-semibold whitespace-nowrap">
                          {formatBRL(loan.saldoDevedor)}
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums text-amber-300 whitespace-nowrap">
                          {formatBRL(loan.valorParcelaAnual)}
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-300 whitespace-nowrap">
                          {loan.parcelasRestantes}x
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleAmortizarEmprestimo(loan.id, false)}
                              className="px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors cursor-pointer"
                            >
                              Pagar 1x
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAmortizarEmprestimo(loan.id, true)}
                              className="px-2.5 py-1.5 rounded-md bg-emerald-700 hover:bg-emerald-600 text-white font-medium transition-colors cursor-pointer"
                            >
                              Quitar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Sanções Ativas e Matriz Disciplinar */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">
              Sanções Progressivas do Comitê Econômico
            </h4>

            {demonstrativo.estadoComite.sancoesAtivas.length > 0 && (
              <div className="border border-rose-800/60 rounded-xl divide-y divide-rose-900/50 bg-rose-950/20">
                {demonstrativo.estadoComite.sancoesAtivas.map((sancao) => (
                  <div key={sancao.id} className="p-3.5 flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold text-rose-300">{sancao.titulo}</div>
                      <div className="text-xs text-slate-300 mt-0.5">{sancao.descricao}</div>
                    </div>
                    <span className="text-[11px] font-mono text-rose-300 whitespace-nowrap">
                      {sancao.liga} · {sancao.anoAplicacao}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="overflow-x-auto border border-slate-800 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400">
                    <th className="py-2.5 px-4 font-semibold">Faixa de Irregularidade</th>
                    <th className="py-2.5 px-4 font-semibold">Medida Financeira</th>
                    <th className="py-2.5 px-4 font-semibold">Sanção Administrativa / Esportiva</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="py-3 px-4 font-medium text-amber-300 whitespace-nowrap">
                      Déficit Leve (até 15% do piso)
                    </td>
                    <td className="py-3 px-4">
                      Empréstimo compulsório (2x, taxa 10%) descontado de repasses futuros
                    </td>
                    <td className="py-3 px-4">Retenção de 15% no próximo repasse</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-amber-400 whitespace-nowrap">
                      Déficit Moderado (15% a 35%)
                    </td>
                    <td className="py-3 px-4">
                      Empréstimo compulsório (2x, taxa 10%) descontado de repasses futuros
                    </td>
                    <td className="py-3 px-4">
                      Retenção de 25%, bloqueio de contratações elite e <strong>-0,3 ponto</strong> na apuração
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-rose-400 whitespace-nowrap">
                      Déficit Grave (&gt; 35% do piso)
                    </td>
                    <td className="py-3 px-4">
                      Empréstimo compulsório (3x, taxa 15%) descontado de repasses futuros
                    </td>
                    <td className="py-3 px-4">
                      Retenção de 35%, intervenção administrativa e <strong>-0,8 ponto</strong> na apuração
                    </td>
                  </tr>
                  <tr className="bg-rose-950/20">
                    <td className="py-3 px-4 font-medium text-rose-300 whitespace-nowrap">
                      Grupo de Avaliação (&lt; R$ 50k / Vermelho)
                    </td>
                    <td className="py-3 px-4">Sem empréstimo de repasse fixo da Superliga</td>
                    <td className="py-3 px-4 text-rose-200">
                      <strong>Impedida de desfilar</strong> e afastamento obrigatório de <strong>no mínimo 1 ano</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* ABA 3: MATRIZ COMPARATIVA DE PISOS E RECEITAS POR DIVISÃO         */}
      {/* ================================================================ */}
      {activeTab === 'divisoes' && (
        <div className="p-6 space-y-4">
          <div className="text-xs text-slate-400 leading-relaxed">
            Todas as agremiações de cada divisão iniciam a temporada com exatamente os mesmos valores
            igualitários de direitos de transmissão e repasses da sua liga. Prêmios por colocação e
            Desfile das Campeãs são entregues exclusivamente pós-Carnaval.
          </div>

          <div className="overflow-x-auto border border-slate-800 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400">
                  <th className="py-3 px-4 font-semibold">Divisão · Liga</th>
                  <th className="py-3 px-4 font-semibold text-right">Direitos TV</th>
                  <th className="py-3 px-4 font-semibold text-right">Repasse Igualitário Total</th>
                  <th className="py-3 px-4 font-semibold text-right">Mínimo Obrigatório Desfile</th>
                  <th className="py-3 px-4 font-semibold">Premiação (Pós-Carnaval)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {ALL_DIVISIONS.map((divId) => {
                  const regra = REGRAS_ORCAMENTO_POR_DIVISAO[divId];
                  const abertura = DemonstrativoFinanceiroService.calcularReceitasIgualitariasAbertura(
                    divId,
                    prataActiveCount
                  );
                  const isCurrent = school.division === divId;

                  return (
                    <tr
                      key={divId}
                      className={
                        isCurrent
                          ? 'bg-emerald-950/25 text-white'
                          : 'text-slate-300 hover:bg-slate-800/30'
                      }
                    >
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-semibold text-white">
                          {regra.divisionLabel}
                          {isCurrent && (
                            <span className="ml-2 text-[11px] font-medium text-emerald-400">
                              (Sua divisão)
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">{regra.comiteNome}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums whitespace-nowrap">
                        {formatBRL(abertura.direitosTransmissao)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-emerald-400 whitespace-nowrap">
                        {formatBRL(abertura.totalIgualitarioBruto)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-amber-400 whitespace-nowrap">
                        {divId === 'avaliacao'
                          ? 'R$ 50.000 a R$ 100.000'
                          : formatBRL(regra.minimoObrigatorio)}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 max-w-xs">
                        {regra.premiacaoPosCarnavalResumo}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};
