import React from 'react';
import { School, QuesitoId } from '../types/carnaval';
import { QUESITOS } from '../data/carnavalData';
import { TIEBREAKER_QUESITO_ORDER } from '../services/simulationEngine';
import { X, Trophy, Shuffle, CheckCircle, Scale } from 'lucide-react';

interface TiebreakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  schoolA: School;
  schoolB: School;
  scoresA: Record<QuesitoId, [number, number, number, number]>;
  scoresB: Record<QuesitoId, [number, number, number, number]>;
  totalA: number;
  totalB: number;
}

export const TiebreakerModal: React.FC<TiebreakerModalProps> = ({
  isOpen,
  onClose,
  schoolA,
  schoolB,
  scoresA,
  scoresB,
  totalA,
  totalB
}) => {
  if (!isOpen) return null;

  // Compute valid sum per quesito (discarding the lowest note)
  const sumQuesito = (scores: [number, number, number, number]) => {
    const minVal = Math.min(...scores);
    return Math.round((scores[0] + scores[1] + scores[2] + scores[3] - minVal) * 10) / 10;
  };

  // Determine which quesito broke the tie
  let decisiveQuesitoId: QuesitoId | null = null;
  let winner: 'A' | 'B' | 'sorteio' = 'sorteio';

  for (const qId of TIEBREAKER_QUESITO_ORDER) {
    const sumA = sumQuesito(scoresA[qId]);
    const sumB = sumQuesito(scoresB[qId]);
    if (Math.abs(sumA - sumB) > 0.01) {
      decisiveQuesitoId = qId;
      winner = sumA > sumB ? 'A' : 'B';
      break;
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-2xl w-full p-6 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Critério Oficial de Desempate
              </h3>
              <p className="text-xs text-slate-400">
                Regulamento Oficial: Soma no último quesito retroativamente (menor nota descartada) e sorteio
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Schools Comparison Banner */}
        <div className="grid grid-cols-2 gap-4 my-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="text-center border-r border-slate-800/80 pr-2">
            <div className="text-sm font-semibold text-slate-300 truncate">{schoolA.name}</div>
            <div className="text-2xl font-black text-amber-400">{totalA.toFixed(1)} pts</div>
            {winner === 'A' && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 mt-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <CheckCircle className="w-3 h-3" /> Vencedora do Desempate
              </span>
            )}
          </div>
          <div className="text-center pl-2">
            <div className="text-sm font-semibold text-slate-300 truncate">{schoolB.name}</div>
            <div className="text-2xl font-black text-amber-400">{totalB.toFixed(1)} pts</div>
            {winner === 'B' && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 mt-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <CheckCircle className="w-3 h-3" /> Vencedora do Desempate
              </span>
            )}
          </div>
        </div>

        {/* Tiebreaker resolution explanation */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 mb-4 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2">
          {winner === 'sorteio' ? (
            <>
              <Shuffle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Empate total em todos os 9 quesitos!</strong> O desempate foi decidido pelo
                <strong> Sorteio Oficial da LIESA</strong> conforme o regulamento.
              </div>
            </>
          ) : (
            <>
              <Trophy className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                O desempate foi decidido pelo quesito{' '}
                <strong>
                  {QUESITOS.find(q => q.id === decisiveQuesitoId)?.name}
                </strong>
                , onde a{' '}
                <strong>{winner === 'A' ? schoolA.name : schoolB.name}</strong> obteve pontuação
                superior ({winner === 'A' ? sumQuesito(scoresA[decisiveQuesitoId!]).toFixed(1) : sumQuesito(scoresB[decisiveQuesitoId!]).toFixed(1)} vs{' '}
                {winner === 'A' ? sumQuesito(scoresB[decisiveQuesitoId!]).toFixed(1) : sumQuesito(scoresA[decisiveQuesitoId!]).toFixed(1)}).
              </div>
            </>
          )}
        </div>

        {/* Step-by-Step Quesitos Table (in tiebreak check order: 9th down to 1st) */}
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Verificação Retroativa dos Quesitos (Do Último ao Primeiro)
          </div>
          <div className="space-y-1.5 text-xs">
            {TIEBREAKER_QUESITO_ORDER.map((qId, idx) => {
              const qConfig = QUESITOS.find(q => q.id === qId)!;
              const valA = sumQuesito(scoresA[qId]);
              const valB = sumQuesito(scoresB[qId]);
              const isDecisive = qId === decisiveQuesitoId;
              const isTiedHere = Math.abs(valA - valB) < 0.01;

              return (
                <div
                  key={qId}
                  className={`flex items-center justify-between p-2.5 rounded-lg border transition ${
                    isDecisive
                      ? 'bg-amber-500/20 border-amber-500/60 font-semibold'
                      : 'bg-slate-950/40 border-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-slate-400">
                      {idx + 1}º
                    </span>
                    <div>
                      <span className="text-white">{qConfig.name}</span>
                      <span className="text-[10px] text-slate-500 ml-1.5">
                        (Quesito Oficial #{qConfig.order})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`font-mono ${
                        isDecisive && winner === 'A' ? 'text-emerald-400 font-bold' : ''
                      }`}
                    >
                      {valA.toFixed(1)}
                    </span>
                    <span className="text-slate-600">x</span>
                    <span
                      className={`font-mono ${
                        isDecisive && winner === 'B' ? 'text-emerald-400 font-bold' : ''
                      }`}
                    >
                      {valB.toFixed(1)}
                    </span>

                    <div className="w-24 text-right">
                      {isDecisive ? (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-400 text-slate-950 font-bold">
                          Decisivo!
                        </span>
                      ) : isTiedHere ? (
                        <span className="text-[10px] text-slate-500">Empate</span>
                      ) : (
                        <span className="text-[10px] text-slate-600">Superado</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition text-sm shadow-md"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
