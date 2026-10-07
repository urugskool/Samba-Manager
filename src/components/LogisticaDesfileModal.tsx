import React from 'react';
import { School } from '../types/carnaval';
import { SorteioSlot } from '../types/sorteio';
import { LogisticsService } from '../services/logisticsService';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import {
  X,
  Truck,
  MapPin,
  Clock,
  Compass,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShieldAlert,
  Info
} from 'lucide-react';

interface LogisticaDesfileModalProps {
  school: School;
  slot?: SorteioSlot;
  onClose: () => void;
}

export const LogisticaDesfileModal: React.FC<LogisticaDesfileModalProps> = ({
  school,
  slot,
  onClose
}) => {
  const logistics = LogisticsService.calculateSchoolLogistics(school, slot);

  const getAffordabilityBadge = (status: typeof logistics.budgetAffordability) => {
    switch (status) {
      case 'confortavel':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'adequado':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'apertado':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'critico':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    }
  };

  const getFatigueRiskBadge = (risk: typeof logistics.fatigueRisk) => {
    switch (risk) {
      case 'baixo':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'moderado':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'alto':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Glow Decorativo */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none -mr-20 -mt-20"
          style={{ backgroundColor: school.colors.primary }}
        />

        {/* Modal Header */}
        <div
          className="p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between gap-4 relative z-10"
          style={{
            background: `linear-gradient(135deg, ${school.colors.primary}22 0%, #0f172a 100%)`
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl font-black shadow-xl border-2 shrink-0"
              style={{
                backgroundColor: school.colors.primary,
                color: school.colors.text,
                borderColor: school.colors.border || '#fff'
              }}
            >
              {school.shortName.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 flex items-center gap-1">
                  <Truck className="w-3 h-3" />
                  LOGÍSTICA & POSIÇÃO DE DESFILE
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {school.division.toUpperCase()}
                </span>
                <span className="text-[11px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Distância: {logistics.distanceKm} km
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {cleanSchoolName(school)}
              </h2>
              <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{logistics.routeDescription}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-300 text-xs">
          {/* Card Principal de Interferência da Posição */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-amber-500/40 shadow-xl space-y-3 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    {logistics.paradePosition.orderTitle}
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    {logistics.paradePosition.dayLabel || 'Ordem Oficial Definida em Sorteio'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${getFatigueRiskBadge(logistics.fatigueRisk)}`}>
                  Risco de Fadiga: {logistics.fatigueRisk.toUpperCase()}
                </span>
                <span className="text-[10px] font-mono bg-slate-800 px-2 py-1 rounded text-slate-300">
                  {logistics.logisticsEfficiencyPercent}% Eficiência
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {logistics.positionImpactSummary}
            </p>

            {/* Impacto Direto nas Notas / Modificadores */}
            <div className="pt-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Interferência Direta da Posição no Desempenho da Pista:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Evolução & Alas</span>
                  <div className={`text-base font-black font-mono mt-0.5 flex items-center justify-center gap-1 ${
                    logistics.performanceModifiers.evolucaoMod >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {logistics.performanceModifiers.evolucaoMod >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>
                      {logistics.performanceModifiers.evolucaoMod >= 0 ? '+' : ''}
                      {logistics.performanceModifiers.evolucaoMod.toFixed(1)} pts
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Harmonia & Canto</span>
                  <div className={`text-base font-black font-mono mt-0.5 flex items-center justify-center gap-1 ${
                    logistics.performanceModifiers.harmoniaMod >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {logistics.performanceModifiers.harmoniaMod >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>
                      {logistics.performanceModifiers.harmoniaMod >= 0 ? '+' : ''}
                      {logistics.performanceModifiers.harmoniaMod.toFixed(1)} pts
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Bateria & Ritmo</span>
                  <div className={`text-base font-black font-mono mt-0.5 flex items-center justify-center gap-1 ${
                    logistics.performanceModifiers.bateriaMod >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {logistics.performanceModifiers.bateriaMod >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>
                      {logistics.performanceModifiers.bateriaMod >= 0 ? '+' : ''}
                      {logistics.performanceModifiers.bateriaMod.toFixed(1)} pts
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Rigor dos Jurados</span>
                  <div className={`text-base font-black font-mono mt-0.5 flex items-center justify-center gap-1 ${
                    logistics.performanceModifiers.judgeStrictnessMod >= 0 ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    <span>
                      {logistics.performanceModifiers.judgeStrictnessMod >= 0 ? 'Atenção Total' : 'Mais Conservador'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Custos Detalhados de Locomoção e Logística */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-white text-xs uppercase tracking-wider">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Orçamento & Custos Reais de Locomoção</span>
              </div>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${getAffordabilityBadge(logistics.budgetAffordability)}`}>
                Folga Orçamentária: {logistics.budgetAffordability.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Fase 1: Ensaio Técnico */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-400" />
                    <h4 className="font-bold text-white text-xs">
                      1. Ensaio Técnico (Dez / Jan)
                    </h4>
                  </div>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    R$ {logistics.ensaioTecnicoCosts.total.toLocaleString('pt-BR')}
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px] text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Frota de Ônibus ({logistics.busesNeeded} veículos):</span>
                    <span className="font-mono font-semibold">
                      R$ {logistics.ensaioTecnicoCosts.transporteComponentes.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Caminhões de Bateria ({logistics.trucksNeeded} caminhões):</span>
                    <span className="font-mono font-semibold">
                      R$ {logistics.ensaioTecnicoCosts.transporteBateria.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kit Lanche & Água ({logistics.componentesCount} desfilantes):</span>
                    <span className="font-mono font-semibold">
                      R$ {logistics.ensaioTecnicoCosts.alimentacaoHidratacao.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-800/60">
                  Mobilização comunitária para reconhecimento de pista, calibragem acústica dos instrumentos e treino de evolução.
                </p>
              </div>

              {/* Fase 2: Desfile Oficial */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-amber-400" />
                    <h4 className="font-bold text-white text-xs">
                      2. Desfile Oficial (Fevereiro)
                    </h4>
                  </div>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    R$ {logistics.desfileOficialCosts.total.toLocaleString('pt-BR')}
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px] text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Comboio Noturno de Ônibus ({logistics.busesNeeded} unid.):</span>
                    <span className="font-mono font-semibold">
                      R$ {logistics.desfileOficialCosts.transporteComponentes.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Reboque de Alegorias ({logistics.alegoriasCount}) e Tripés:</span>
                    <span className="font-mono font-semibold">
                      R$ {logistics.desfileOficialCosts.transporteAlegoriasETripes.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Apoio de Concentração & Dispersão:</span>
                    <span className="font-mono font-semibold">
                      R$ {logistics.desfileOficialCosts.apoioConcentracaoDispersao.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Hidratação na Armação & Pista:</span>
                    <span className="font-mono font-semibold">
                      R$ {logistics.desfileOficialCosts.hidratacaoEquipe.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-800/60">
                  Operação logística com reboques pesados na madrugada, batedores de trânsito, equipes de segurança e pontos de apoio.
                </p>
              </div>
            </div>

            {/* Total Geral de Logística */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">
                  Custo Total de Logística da Temporada
                </span>
                <span className="text-[11px] text-slate-300">
                  Locomoção de {logistics.componentesCount.toLocaleString('pt-BR')} componentes + {logistics.alegoriasCount} carros por {logistics.distanceKm} km
                </span>
              </div>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-black font-mono text-amber-300">
                  R$ {logistics.totalLogisticsCost.toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          </div>

          {/* Notas Técnicas da Diretoria de Logística */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-white text-xs uppercase tracking-wider">
              <Info className="w-4 h-4 text-amber-400" />
              <span>Notas Operacionais de Transporte & Concentração</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              {logistics.logisticsNotes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-4">
          <div className="text-[11px] text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Dados integrados ao motor de simulação de notas e tempo de desfile.</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer shadow-lg shadow-amber-500/20"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
