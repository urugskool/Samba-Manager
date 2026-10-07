import React from 'react';
import { School, DivisionId } from '../types/carnaval';
import { SorteioSlot } from '../types/sorteio';
import {
  LogisticsService,
  SchoolLogisticsReport
} from '../services/logisticsService';
import {
  X,
  Truck,
  MapPin,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users,
  Compass,
  Zap,
  Info,
  Layers,
  Fuel,
  Bus
} from 'lucide-react';
import { cleanSchoolName } from '../utils/schoolNameUtils';

interface ParadeLogisticsModalProps {
  school: School;
  slot?: SorteioSlot;
  onClose: () => void;
}

export const ParadeLogisticsModal: React.FC<ParadeLogisticsModalProps> = ({
  school,
  slot,
  onClose
}) => {
  const report: SchoolLogisticsReport = LogisticsService.calculateSchoolLogistics(school, slot);

  const getPositionCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'horario_nobre':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'abertura':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'madrugada_amanhecer':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default:
        return 'bg-slate-700/40 text-slate-300 border-slate-600/40';
    }
  };

  const getAffordabilityBadge = (aff: string) => {
    switch (aff) {
      case 'confortavel':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'adequado':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'apertado':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'critico':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-slate-700 text-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-slate-900 p-5 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
              <Truck className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow">
                  RELATÓRIO DE LOGÍSTICA & DESLOCAMENTO
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                  {report.neighborhood} → {report.venueName}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                {cleanSchoolName(school)}
              </h2>
              <p className="text-xs text-blue-200">
                Distância até a passarela: <strong className="text-white">{report.distanceKm} km</strong> • {report.routeDescription}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer self-end sm:self-auto"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Top Banner: Sorteio Parade Position Impact */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Posição de Desfile Sorteada</div>
                  <h4 className="text-base font-black text-white flex items-center gap-2">
                    <span>{report.paradePosition.order}ª a Desfilar</span>
                    {report.paradePosition.dayLabel && (
                      <span className="text-xs font-normal text-amber-300">({report.paradePosition.dayLabel})</span>
                    )}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-black uppercase px-3 py-1 rounded-full border ${getPositionCategoryBadge(
                    report.paradePosition.category
                  )}`}
                >
                  {report.paradePosition.orderTitle}
                </span>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                  report.fatigueRisk === 'alto'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : report.fatigueRisk === 'moderado'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  Fadiga: {report.fatigueRisk.toUpperCase()}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {report.positionImpactSummary}
            </p>

            {/* Performance Modifiers Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400">Impacto em Evolução</div>
                <div className={`text-base font-black font-mono flex items-center gap-1 ${
                  report.performanceModifiers.evolucaoMod >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {report.performanceModifiers.evolucaoMod >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{report.performanceModifiers.evolucaoMod >= 0 ? '+' : ''}{report.performanceModifiers.evolucaoMod.toFixed(1)} pts</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400">Impacto em Harmonia</div>
                <div className={`text-base font-black font-mono flex items-center gap-1 ${
                  report.performanceModifiers.harmoniaMod >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {report.performanceModifiers.harmoniaMod >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{report.performanceModifiers.harmoniaMod >= 0 ? '+' : ''}{report.performanceModifiers.harmoniaMod.toFixed(1)} pts</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400">Impacto em Bateria</div>
                <div className={`text-base font-black font-mono flex items-center gap-1 ${
                  report.performanceModifiers.bateriaMod >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {report.performanceModifiers.bateriaMod >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{report.performanceModifiers.bateriaMod >= 0 ? '+' : ''}{report.performanceModifiers.bateriaMod.toFixed(1)} pts</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400">Rigor dos Jurados</div>
                <div className={`text-base font-black font-mono flex items-center gap-1 ${
                  report.performanceModifiers.judgeStrictnessMod >= 0 ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  <span>{report.performanceModifiers.judgeStrictnessMod >= 0 ? '+' : ''}{report.performanceModifiers.judgeStrictnessMod.toFixed(1)} pts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Fleet & Contingent Needs */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider text-[11px]">
              <Bus className="w-4 h-4 text-amber-400" />
              <span>Contingente e Frota Mobilizada</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400">Componentes a Deslocar</div>
                <div className="text-base font-black text-white font-mono">
                  {report.componentesCount.toLocaleString('pt-BR')}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400">Ônibus de Transporte</div>
                <div className="text-base font-black text-amber-300 font-mono">
                  {report.busesNeeded} ônibus
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400">Alegorias & Tripés</div>
                <div className="text-base font-black text-white font-mono">
                  {report.alegoriasCount} carros + {report.tripesCount} tripés
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400">Carretas & Batedores</div>
                <div className="text-base font-black text-blue-300 font-mono">
                  {report.trucksNeeded} caminhões
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Detailed Expenses (Ensaio Técnico + Desfile Oficial) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ensaio Técnico */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-black text-white">Ensaios Técnicos na Passarela</h4>
                </div>
                <span className="text-xs font-black font-mono text-amber-400">
                  R$ {report.ensaioTecnicoCosts.total.toLocaleString('pt-BR')}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span>Transporte de Componentes (Frota de Ônibus):</span>
                  <span className="font-mono font-bold text-white">
                    R$ {report.ensaioTecnicoCosts.transporteComponentes.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Transporte de Bateria e Instrumentos:</span>
                  <span className="font-mono font-bold text-white">
                    R$ {report.ensaioTecnicoCosts.transporteBateria.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Alimentação e Hidratação dos Segmentos:</span>
                  <span className="font-mono font-bold text-white">
                    R$ {report.ensaioTecnicoCosts.alimentacaoHidratacao.toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>

            {/* Desfile Oficial */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-400" />
                  <h4 className="text-sm font-black text-white">Desfile Oficial de Carnaval</h4>
                </div>
                <span className="text-xs font-black font-mono text-blue-400">
                  R$ {report.desfileOficialCosts.total.toLocaleString('pt-BR')}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span>Frota Geral de Ônibus para Componentes:</span>
                  <span className="font-mono font-bold text-white">
                    R$ {report.desfileOficialCosts.transporteComponentes.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Comboio de Alegorias, Carretas e Guincho:</span>
                  <span className="font-mono font-bold text-white">
                    R$ {report.desfileOficialCosts.transporteAlegoriasETripes.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Apoio de Concentração e Dispersão:</span>
                  <span className="font-mono font-bold text-white">
                    R$ {report.desfileOficialCosts.apoioConcentracaoDispersao.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Hidratação e Água Mineral na Pista:</span>
                  <span className="font-mono font-bold text-white">
                    R$ {report.desfileOficialCosts.hidratacaoEquipe.toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Total & Budget Affordability */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-blue-950/40 to-slate-950 border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Custo Consolidado da Operação Logística</div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                R$ {report.totalLogisticsCost.toLocaleString('pt-BR')}
              </div>
              <p className="text-xs text-slate-300">
                Baseado na distância de {report.distanceKm} km entre a quadra/barracão e o local do desfile ({report.venueName}).
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] text-slate-400">Impacto Orçamentário</div>
                <div className="text-xs font-bold text-white">
                  Caixa Disponível: R$ {school.budget.toLocaleString('pt-BR')}
                </div>
              </div>
              <span
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase border ${getAffordabilityBadge(
                  report.budgetAffordability
                )}`}
              >
                Orçamento {report.budgetAffordability.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Section 5: Notes & Strategic Tips */}
          <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <Info className="w-4 h-4 text-amber-400" />
              <span>Diretrizes e Recomendações da Diretoria de Carnaval</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-400 list-disc list-inside">
              {report.logisticsNotes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Plano de transporte e comboio validado pelo departamento de trânsito e ligas carnavalescas.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer"
          >
            Fechar Relatório
          </button>
        </div>
      </div>
    </div>
  );
};
