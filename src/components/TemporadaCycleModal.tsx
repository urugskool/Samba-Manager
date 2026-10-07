import React, { useState } from 'react';
import { SeasonMonthId, SeasonPeriodConfig } from '../types/seasonCycle';
import { SEASON_PERIODS, SeasonCycleService } from '../services/seasonCycleService';
import { School } from '../types/carnaval';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Coins,
  Heart,
  Hammer,
  Music,
  Users,
  Wallet,
  BookOpen,
  Dices,
  Flame,
  Navigation,
  Crown,
  ClipboardCheck,
  ChevronRight,
  Zap,
  FastForward,
  X
} from 'lucide-react';

interface TemporadaCycleModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentYear: number;
  currentMonth: SeasonMonthId;
  userSchool: School | null;
  onAdvanceMonth: (targetMonth?: SeasonMonthId, targetTab?: string) => void;
  onNavigateTab: (tab: string) => void;
  isSorteioCompleted?: boolean;
  onSimulateAllMonthsToCarnaval?: () => void;
}

export const TemporadaCycleModal: React.FC<TemporadaCycleModalProps> = ({
  isOpen,
  onClose,
  currentYear,
  currentMonth,
  userSchool,
  onAdvanceMonth,
  onNavigateTab,
  isSorteioCompleted = false,
  onSimulateAllMonthsToCarnaval
}) => {
  const [selectedMonthId, setSelectedMonthId] = useState<SeasonMonthId>(currentMonth);

  if (!isOpen) return null;

  const currentPeriod = SeasonCycleService.getPeriod(currentMonth);
  const viewingPeriod = SeasonCycleService.getPeriod(selectedMonthId);
  const nextMonthId = SeasonCycleService.getNextMonth(currentMonth);
  const nextPeriod = nextMonthId ? SeasonCycleService.getPeriod(nextMonthId) : null;

  const currentMonthIdx = SEASON_PERIODS.findIndex((p) => p.id === currentMonth);
  const viewingMonthIdx = SEASON_PERIODS.findIndex((p) => p.id === selectedMonthId);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'ClipboardCheck':
        return ClipboardCheck;
      case 'Wallet':
        return Wallet;
      case 'Users':
        return Users;
      case 'BookOpen':
        return BookOpen;
      case 'Dices':
        return Dices;
      case 'Music':
        return Music;
      case 'Flame':
        return Flame;
      case 'Hammer':
        return Hammer;
      case 'Navigation':
        return Navigation;
      case 'CheckCircle2':
        return CheckCircle2;
      case 'Sparkles':
        return Sparkles;
      case 'Crown':
        return Crown;
      default:
        return Calendar;
    }
  };

  const handleSimulateCurrentMonth = () => {
    if (!userSchool) {
      onAdvanceMonth(nextMonthId || undefined, 'dashboard');
    } else {
      const nextP = nextMonthId ? SeasonCycleService.getPeriod(nextMonthId) : null;
      onAdvanceMonth(nextMonthId || undefined, nextP?.focusTab || 'dashboard');
    }
    if (nextMonthId) {
      setSelectedMonthId(nextMonthId);
    }
  };

  const handleGoToTab = (tab: string) => {
    // Para modo observador, abas exclusivas de gestão de escola direcionam com segurança para o painel
    if (!userSchool && (tab === 'ensaios' || tab === 'barracao' || tab === 'equipe' || tab === 'financas')) {
      onNavigateTab('dashboard');
      onClose();
      return;
    }
    const check = SeasonCycleService.isTabUnlockedForMonth(tab, currentMonth);
    if (!check.unlocked) {
      return;
    }
    onNavigateTab(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-slate-900 border-2 border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/20 shrink-0">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Passagem de Tempo • Ciclo Completo da Temporada
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Ano do Carnaval: <strong>{currentYear}</strong>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Calendário e Atividades Oficiais do Carnaval
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition border border-slate-700 cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current status banner */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                Período Atual: <strong>{currentPeriod.name}</strong> • {currentPeriod.activityTitle}
              </span>
            </div>
            <span className="text-xs text-slate-400 hidden md:inline">
              Progresso do ciclo: <strong>{currentMonthIdx + 1} de 12 meses</strong>
            </span>
          </div>

          {/* Quick simulation buttons */}
          <div className="flex items-center gap-2">
            {nextPeriod ? (
              <button
                onClick={handleSimulateCurrentMonth}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-slate-950" />
                <span>Simular {currentPeriod.name} & Avançar p/ {nextPeriod.name}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => handleGoToTab('desfile')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Ir para os Desfiles e Apuração (Fevereiro)</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* 12-Month Timeline Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
                Linha do Tempo Completa da Temporada (12 Períodos Oficiais)
              </span>
              <span className="text-[11px] text-slate-500">
                Clique em qualquer mês para examinar as atividades
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {SEASON_PERIODS.map((period, idx) => {
                const isCompleted = idx < currentMonthIdx;
                const isCurrent = idx === currentMonthIdx;
                const isSelected = period.id === selectedMonthId;
                const IconComponent = getIconComponent(period.icon);

                return (
                  <button
                    key={period.id}
                    onClick={() => setSelectedMonthId(period.id)}
                    className={`p-3 rounded-2xl border text-left transition relative cursor-pointer flex flex-col justify-between min-h-[96px] ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/50 shadow-lg shadow-amber-500/10'
                        : isCurrent
                        ? 'bg-slate-900 border-amber-500/60 ring-1 ring-amber-500/30'
                        : isCompleted
                        ? 'bg-slate-950/70 border-emerald-500/30 hover:border-emerald-500/60'
                        : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1.5">
                        <IconComponent
                          className={`w-4 h-4 ${
                            isSelected
                              ? 'text-amber-300'
                              : isCurrent
                              ? 'text-amber-400'
                              : isCompleted
                              ? 'text-emerald-400'
                              : 'text-slate-500'
                          }`}
                        />
                        <span
                          className={`text-xs font-black uppercase ${
                            isSelected
                              ? 'text-amber-300'
                              : isCurrent
                              ? 'text-white'
                              : isCompleted
                              ? 'text-emerald-300'
                              : 'text-slate-400'
                          }`}
                        >
                          {period.name}
                        </span>
                      </div>

                      {isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : isCurrent ? (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
                      ) : (
                        <Lock className="w-3 h-3 text-slate-600 shrink-0" />
                      )}
                    </div>

                    <div className="mt-2 text-[11px] font-bold text-slate-200 line-clamp-2 leading-tight">
                      {period.activityTitle}
                    </div>

                    <div className="mt-1 text-[9px] font-mono">
                      {isCompleted ? (
                        <span className="text-emerald-400">✓ Concluído</span>
                      ) : isCurrent ? (
                        <span className="text-amber-300 font-bold">⚡ Em Andamento</span>
                      ) : (
                        <span className="text-slate-500">⏳ Previsto</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Spotlight of Selected Period */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                {(() => {
                  const IconComp = getIconComponent(viewingPeriod.icon);
                  return (
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow shrink-0">
                      <IconComp className="w-6 h-6" />
                    </div>
                  );
                })()}

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                      Mês de {viewingPeriod.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      (Etapa {viewingMonthIdx + 1} de 12)
                    </span>
                    {viewingMonthIdx < currentMonthIdx ? (
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Etapa Concluída
                      </span>
                    ) : viewingMonthIdx === currentMonthIdx ? (
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                        Etapa Atual
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-slate-800 text-slate-400">
                        Etapa Futura
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
                    {viewingPeriod.activityTitle}
                  </h3>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {(() => {
                  const isSchoolPrivateTab = viewingPeriod.focusTab === 'barracao' || viewingPeriod.focusTab === 'ensaios' || viewingPeriod.focusTab === 'equipe' || viewingPeriod.focusTab === 'financas';

                  // No modo observador, não há barracões ou ensaios próprios
                  if (!userSchool && isSchoolPrivateTab) {
                    return (
                      <button
                        onClick={() => handleGoToTab('dashboard')}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition border border-slate-700 cursor-pointer"
                      >
                        <span>Ver Panorama das Escolas no Painel</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    );
                  }

                  const tabCheck = SeasonCycleService.isTabUnlockedForMonth(viewingPeriod.focusTab, currentMonth);
                  if (tabCheck.unlocked) {
                    return (
                      <button
                        onClick={() => handleGoToTab(viewingPeriod.focusTab)}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition border border-slate-700 cursor-pointer"
                      >
                        <span>Ir para Atividade ({viewingPeriod.focusTab.toUpperCase()})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    );
                  }
                  return (
                    <span
                      title={tabCheck.reason}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-500 font-bold text-xs flex items-center gap-1.5 cursor-not-allowed"
                    >
                      <Lock className="w-3.5 h-3.5 text-slate-600" />
                      <span>Atividade liberada em {tabCheck.availableFromMonthName}</span>
                    </span>
                  );
                })()}

                {currentMonth === 'julho' && !isSorteioCompleted ? (
                  <button
                    onClick={() => handleGoToTab('sorteio')}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs shadow-lg transition flex items-center gap-1.5 cursor-pointer animate-pulse"
                  >
                    <Dices className="w-4 h-4 text-slate-950" />
                    <span>Realizar Sorteio da Ordem (Obrigatório em Julho)</span>
                  </button>
                ) : (
                  viewingMonthIdx === currentMonthIdx && nextPeriod && (
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={handleSimulateCurrentMonth}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Concluir {currentPeriod.name} & Avançar p/ {nextPeriod.name}</span>
                      </button>
                      {!userSchool && onSimulateAllMonthsToCarnaval && (
                        <button
                          onClick={() => {
                            onSimulateAllMonthsToCarnaval();
                            onClose();
                          }}
                          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
                          title="Simula as etapas de preparação de todas as escolas e avança diretamente para Fevereiro (Mês dos Desfiles)"
                        >
                          <FastForward className="w-3.5 h-3.5 text-amber-400" />
                          <span>Simular até o Carnaval (Fev)</span>
                        </button>
                      )}
                    </div>
                  )
                )}

                {currentMonth === 'fevereiro' && (
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => handleGoToTab('desfile')}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Ir para os Desfiles</span>
                    </button>
                    <button
                      onClick={() => handleGoToTab('apuracao')}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Crown className="w-3.5 h-3.5" />
                      <span>Ir para Apuração</span>
                    </button>
                  </div>
                )}

                {viewingMonthIdx > currentMonthIdx && nextPeriod && (
                  <button
                    onClick={handleSimulateCurrentMonth}
                    title="O calendário não permite pular etapas. Avance mês a mês para alcançar este período."
                    className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs border border-amber-500/40 flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Avançar Ciclo ({currentPeriod.name} ➔ {nextPeriod.name})</span>
                  </button>
                )}
              </div>
            </div>

            {viewingMonthIdx > currentMonthIdx && (
              <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 text-amber-300/90 text-xs flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Avanço Cronológico Obrigatório:</strong> O calendário do Carnaval respeita rigorosamente o ciclo real. Não é permitido pular meses ou antecipar eventos. Avance mês a mês cumprindo as etapas da temporada.
                </span>
              </div>
            )}

            <p className="text-sm text-slate-300 leading-relaxed">
              {viewingPeriod.description}
            </p>

            {/* School context & benefits during this period */}
            {userSchool ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-left">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Tesouraria</div>
                  <div className="text-sm font-black text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5" />
                    R$ {(userSchool.budget / 1000).toFixed(0)}k
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-left">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Progresso Barracão</div>
                  <div className="text-sm font-black text-amber-400 font-mono mt-0.5 flex items-center gap-1">
                    <Hammer className="w-3.5 h-3.5" />
                    {userSchool.barracaoProgress}%
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-left">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Nível de Ensaios</div>
                  <div className="text-sm font-black text-blue-400 font-mono mt-0.5 flex items-center gap-1">
                    <Music className="w-3.5 h-3.5" />
                    {userSchool.rehearsalLevel}%
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-left">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Moral da Comunidade</div>
                  <div className="text-sm font-black text-rose-400 font-mono mt-0.5 flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-rose-400" />
                    {userSchool.fanBaseMorale}%
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-left">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Panorama Geral</div>
                  <div className="text-sm font-black text-amber-300 font-mono mt-0.5 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    Modo Observador
                  </div>
                  <span className="text-[10px] text-slate-500">60+ Agremiações Ativas</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-left">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Sorteio da Ordem</div>
                  <div className="text-sm font-black text-purple-400 font-mono mt-0.5 flex items-center gap-1">
                    <Dices className="w-3.5 h-3.5" />
                    {isSorteioCompleted ? '✓ Homologado' : 'Julho (Obrigatório)'}
                  </div>
                  <span className="text-[10px] text-slate-500">5 Divisões Oficiais</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-left">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Preparação Geral</div>
                  <div className="text-sm font-black text-blue-400 font-mono mt-0.5 flex items-center gap-1">
                    <Hammer className="w-3.5 h-3.5" />
                    Barracões & Ensaios
                  </div>
                  <span className="text-[10px] text-slate-500">Simulação Autônoma</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-left">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Desfiles Oficiais</div>
                  <div className="text-sm font-black text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5" />
                    Fevereiro
                  </div>
                  <span className="text-[10px] text-slate-500">Sapucaí & Intendente</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400 hidden sm:block">
            * O ciclo segue a tradição anual do Carnaval Carioca de Março a Fevereiro.
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer"
            >
              Fechar
            </button>

            {nextPeriod && (
              <button
                onClick={handleSimulateCurrentMonth}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Avançar Mês ({nextPeriod.name})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
