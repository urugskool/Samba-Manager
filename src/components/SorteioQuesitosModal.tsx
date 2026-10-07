import React, { useState } from 'react';
import { QuesitoId } from '../types/carnaval';
import { CarnavalQuesitosDrawState, QuesitosDrawEntity, QuesitoDrawRecord } from '../types/sorteio';
import { QUESITOS } from '../data/carnavalData';
import { SorteioEngine } from '../services/sorteioEngine';
import { soundService } from '../services/soundService';
import confetti from 'canvas-confetti';
import {
  X,
  Shuffle,
  CheckCircle2,
  Lock,
  Sparkles,
  Scale,
  Award,
  AlertCircle,
  Zap,
  RotateCcw,
  ChevronRight
} from 'lucide-react';

interface SorteioQuesitosModalProps {
  isOpen: boolean;
  onClose: () => void;
  quesitosDrawState: CarnavalQuesitosDrawState;
  onUpdateQuesitosDraw: (
    updater: CarnavalQuesitosDrawState | ((prev: CarnavalQuesitosDrawState) => CarnavalQuesitosDrawState)
  ) => void;
  initialEntityTab?: QuesitosDrawEntity;
}

export const SorteioQuesitosModal: React.FC<SorteioQuesitosModalProps> = ({
  isOpen,
  onClose,
  quesitosDrawState,
  onUpdateQuesitosDraw,
  initialEntityTab = 'liesa'
}) => {
  const [activeTab, setActiveTab] = useState<QuesitosDrawEntity>(initialEntityTab);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animationStep, setAnimationStep] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'reading' | 'tiebreaker'>('reading');

  if (!isOpen) return null;

  const currentRecord: QuesitoDrawRecord = quesitosDrawState[activeTab];
  const lockInfo = SorteioEngine.isQuesitosDrawUnlocked(activeTab, quesitosDrawState);

  const getQuesitoObj = (id: QuesitoId) => {
    return QUESITOS.find((q) => q.id === id) || {
      id,
      name: id,
      shortName: id.slice(0, 3).toUpperCase(),
      description: ''
    };
  };

  const handlePerformDraw = (entityId: QuesitosDrawEntity) => {
    const unlockCheck = SorteioEngine.isQuesitosDrawUnlocked(entityId, quesitosDrawState);
    if (!unlockCheck.unlocked) {
      soundService.playBuzzer();
      return;
    }

    setIsAnimating(true);
    setAnimationStep(0);
    soundService.playGavel();

    // Quick suspense animation before revealing
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setAnimationStep(step);
      soundService.playDrumRoll();
      if (step >= 6) {
        clearInterval(interval);
        setIsAnimating(false);
        const newState = SorteioEngine.drawQuesitosForEntity(entityId, quesitosDrawState);
        onUpdateQuesitosDraw(newState);
        soundService.playChampionFanfare();
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}
      }
    }, 180);
  };

  const handleDrawAll = () => {
    soundService.playGavel();
    const newState = SorteioEngine.drawAllQuesitos(quesitosDrawState);
    onUpdateQuesitosDraw(newState);
    soundService.playChampionFanfare();
    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch {}
  };

  const entitiesList: {
    id: QuesitosDrawEntity;
    label: string;
    sublabel: string;
    badge: string;
    badgeColor: string;
    borderActive: string;
  }[] = [
    {
      id: 'liesa',
      label: '1º Grupo Especial',
      sublabel: 'LIESA • Cidade do Samba',
      badge: 'LIESA',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      borderActive: 'border-amber-500 text-amber-300 bg-amber-500/10'
    },
    {
      id: 'ligarj',
      label: '2º Série Ouro',
      sublabel: 'LIGA-RJ • Sapucaí',
      badge: 'LIGA-RJ',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      borderActive: 'border-blue-500 text-blue-300 bg-blue-500/10'
    },
    {
      id: 'superliga',
      label: '3º Superliga',
      sublabel: 'Série Prata, Bronze e Avaliação',
      badge: 'SUPERLIGA',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      borderActive: 'border-purple-500 text-purple-300 bg-purple-500/10'
    }
  ];

  const allCompleted =
    quesitosDrawState.liesa.isCompleted &&
    quesitosDrawState.ligarj.isCompleted &&
    quesitosDrawState.superliga.isCompleted;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Shuffle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  REGULAMENTO OFICIAL • CARNAVAL {quesitosDrawState.year}
                </span>
                <span className="text-xs text-slate-400">Antes da Leitura das Notas</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
                Sorteio da Ordem dos Quesitos & Critérios de Desempate
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                As entidades sorteiam a ordem de abertura dos envelopes. A ordem dos quesitos de desempate é estritamente a <strong>ordem inversa</strong> (o último quesito lido é o 1º critério decisivo).
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Action Banner if not all drawn */}
        {!allCompleted && (
          <div className="mt-3 p-3 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Sorteio sequencial: <strong>1º Grupo Especial (LIESA)</strong> ➔ <strong>2º Série Ouro (LIGA-RJ)</strong> ➔ <strong>3º Superliga (uma vez para Prata, Bronze e Avaliação)</strong>.
              </span>
            </div>
            <button
              onClick={handleDrawAll}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>Sortear Todos os Grupos (3 em 1)</span>
            </button>
          </div>
        )}

        {/* Entity Tabs (Strict sequential order) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
          {entitiesList.map((ent) => {
            const isSelected = activeTab === ent.id;
            const record = quesitosDrawState[ent.id];
            const unlocked = SorteioEngine.isQuesitosDrawUnlocked(ent.id, quesitosDrawState).unlocked;

            return (
              <button
                key={ent.id}
                onClick={() => setActiveTab(ent.id)}
                className={`p-3 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? `${ent.borderActive} shadow-lg ring-1 ring-amber-500/30`
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-white">{ent.label}</span>
                    <span className={`text-[9px] font-black px-1.5 py-0.2 rounded border ${ent.badgeColor}`}>
                      {ent.badge}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">{ent.sublabel}</div>
                </div>

                <div className="shrink-0 ml-2">
                  {record.isCompleted ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" /> Sorteado
                    </span>
                  ) : !unlocked ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700">
                      <Lock className="w-3 h-3" /> Bloqueado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/40 animate-pulse">
                      🎲 Sortear
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto mt-4 pr-1 space-y-4">
          {/* Locked State Warning */}
          {!lockInfo.unlocked ? (
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">
                Sorteio Bloqueado pela Ordem Oficial
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                {lockInfo.reason}
              </p>
              {lockInfo.requiredEntity && (
                <button
                  onClick={() => setActiveTab(lockInfo.requiredEntity!)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Ir para o sorteio do {lockInfo.requiredName}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Entity Overview Card & Action */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-white">{currentRecord.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {currentRecord.targetGroupsDescription}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {activeTab === 'superliga'
                      ? 'Este sorteio é realizado uma única vez e vale simultaneamente para a Série Prata, Série Bronze e Grupo de Avaliação.'
                      : activeTab === 'ligarj'
                      ? 'Sorteio oficial dos 9 quesitos para a leitura das notas da Série Ouro na Marquês de Sapucaí.'
                      : 'Sorteio solene realizado pela diretoria da LIESA na Cidade do Samba com os presidentes das 12 agremiações.'}
                  </p>
                  {currentRecord.isCompleted && currentRecord.drawDate && (
                    <div className="text-[11px] text-emerald-400 font-medium">
                      ✓ Sorteio oficial homologado em {currentRecord.drawDate}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handlePerformDraw(activeTab)}
                    disabled={isAnimating}
                    className={`px-4 py-2.5 rounded-xl font-black text-xs transition flex items-center gap-2 cursor-pointer shadow-lg ${
                      isAnimating
                        ? 'bg-amber-600 text-white animate-pulse'
                        : currentRecord.isCompleted
                        ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700'
                        : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-amber-500/25 ring-1 ring-amber-400'
                    }`}
                  >
                    <Shuffle className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
                    <span>
                      {isAnimating
                        ? 'Embaralhando Envelopes...'
                        : currentRecord.isCompleted
                        ? 'Refazer Sorteio dos Quesitos'
                        : 'Realizar Sorteio dos Quesitos'}
                    </span>
                  </button>
                </div>
              </div>

              {/* View Toggle: Ordem de Leitura vs Ordem de Desempate */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('reading')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      viewMode === 'reading'
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>📋 Ordem de Leitura das Notas (1º ao 9º)</span>
                  </button>
                  <button
                    onClick={() => setViewMode('tiebreaker')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      viewMode === 'tiebreaker'
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>⚖️ Ordem dos Quesitos de Desempate (Inversa)</span>
                  </button>
                </div>

                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  {viewMode === 'reading'
                    ? 'Sequência em que as notas dos jurados serão abertas'
                    : 'Hierarquia regulamentar em caso de empate na pontuação final'}
                </span>
              </div>

              {/* Displaying either Reading Order (1st to 9th) or Tiebreaker Order (9th to 1st) */}
              {viewMode === 'reading' ? (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Ordem Sorteada para Abertura dos Envelopes</span>
                    <span className="text-[11px] text-amber-300">
                      O 9º quesito será o primeiro critério de desempate
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {currentRecord.order.map((qId, idx) => {
                      const q = getQuesitoObj(qId);
                      const isLastQuesito = idx === 8; // 9th quesito is 1st tiebreaker!
                      const orderNum = idx + 1;

                      return (
                        <div
                          key={qId}
                          className={`p-3 rounded-xl border transition relative overflow-hidden ${
                            isLastQuesito
                              ? 'bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-950 border-amber-500/60 shadow-lg shadow-amber-500/10'
                              : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-black text-xs shrink-0 ${
                                isLastQuesito
                                  ? 'bg-amber-400 text-slate-950'
                                  : 'bg-slate-800 text-slate-300 border border-slate-700'
                              }`}
                            >
                              {orderNum}º
                            </span>
                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                              {q.shortName}
                            </span>
                          </div>

                          <div className="mt-2 space-y-0.5">
                            <div className="font-black text-sm text-white flex items-center gap-1.5">
                              <span>{q.name}</span>
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-1">
                              {q.description}
                            </p>
                          </div>

                          {isLastQuesito && (
                            <div className="mt-2 pt-2 border-t border-amber-500/30 flex items-center gap-1 text-[10px] font-black text-amber-300">
                              <Award className="w-3.5 h-3.5 text-amber-400" />
                              <span>1º CRITÉRIO DECISIVO DE DESEMPATE!</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Tiebreaker View (Inverse Order) */
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Hierarquia Oficial dos Critérios de Desempate (Ordem Inversa)</span>
                    <span className="text-[11px] text-emerald-400">
                      Regulamento: maior soma no último quesito e sucessivamente para trás
                    </span>
                  </div>

                  <div className="space-y-2">
                    {currentRecord.tiebreakerOrder.map((qId, idx) => {
                      const q = getQuesitoObj(qId);
                      const readingIdx = currentRecord.order.indexOf(qId) + 1;
                      const isFirstDecisive = idx === 0;

                      return (
                        <div
                          key={qId}
                          className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition ${
                            isFirstDecisive
                              ? 'bg-amber-500/15 border-amber-500/60 shadow-md'
                              : 'bg-slate-950/60 border-slate-800/80 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-black text-xs shrink-0 ${
                                isFirstDecisive
                                  ? 'bg-amber-400 text-slate-950 shadow'
                                  : 'bg-slate-800 text-slate-300 border border-slate-700'
                              }`}
                            >
                              {idx + 1}º
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-black text-sm text-white">{q.name}</span>
                                <span className="text-[10px] text-slate-500">
                                  ({readingIdx}º quesito lido na apuração)
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-400">
                                {isFirstDecisive
                                  ? '1º Desempate: Se houver empate no total geral (270.0), vence a escola com maior soma neste quesito.'
                                  : `${idx + 1}º Desempate: Aplicado caso o empate persista nos ${idx} critérios anteriores.`}
                              </div>
                            </div>
                          </div>

                          <div className="shrink-0 text-right">
                            {isFirstDecisive ? (
                              <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase bg-amber-400 text-slate-950 border border-amber-300 shadow">
                                Decisivo Principal
                              </span>
                            ) : (
                              <span className="text-xs font-mono text-slate-400">
                                Critério #{idx + 1}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {/* Sorteio Final */}
                    <div className="p-3 rounded-xl border border-dashed border-slate-700 bg-slate-950/40 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center font-mono font-bold text-xs text-slate-400">
                          10º
                        </span>
                        <div>
                          <span className="font-bold text-slate-200">Sorteio Oficial Presencial da Entidade</span>
                          <p className="text-[11px] text-slate-500">
                            Caso o empate persista em todas as notas dos 9 quesitos de desempate.
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-500 italic">Último recurso</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>
              {allCompleted
                ? 'Todos os 3 sorteios oficiais foram concluídos com sucesso!'
                : 'Conclua os sorteios para iniciar a leitura oficial das notas na apuração.'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
