import React, { useState, useMemo } from 'react';
import {
  School,
  SchoolParadeScores,
  DivisionResult,
  CampeasParadeResult,
  YearHistory
} from '../types/carnaval';
import { CarnavalQuesitosDrawState, CarnavalSorteio } from '../types/sorteio';
import { SimulationEngine } from '../services/simulationEngine';
import { SorteioEngine } from '../services/sorteioEngine';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import { evaluateSchoolParadeObrigatoriedades } from '../config/obrigatoriedadesConfig';
import { soundService } from '../services/soundService';
import {
  Trophy,
  Sparkles,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Play,
  RotateCcw,
  Zap,
  DollarSign,
  Crown,
  ChevronRight,
  ShieldAlert,
  Volume2,
  Users,
  Feather,
  Music,
  PartyPopper,
  Info,
  Lock
} from 'lucide-react';

interface DesfileCampeasViewProps {
  currentYear: number;
  especialSchools: School[];
  especialScores: SchoolParadeScores[];
  userSchool: School | null;
  onAdvanceYear: () => void;
  onApplyFineToUserSchool?: (fineAmount: number) => void;
  onShowMessage?: (msg: string, type?: 'info' | 'success' | 'warning' | 'alert') => void;
  paradeResults?: Record<string, CampeasParadeResult>;
  onUpdateParadeResults?: React.Dispatch<React.SetStateAction<Record<string, CampeasParadeResult>>>;
  allApuracoesCompleted?: boolean;
  onNavigateToApuracao?: () => void;
  quesitosDraw?: CarnavalQuesitosDrawState;
  sorteio?: CarnavalSorteio;
  history?: YearHistory[];
  officialEspecialStandings?: {
    school: School;
    scores: SchoolParadeScores;
    currentScore: number;
    rank: number;
    tiebreakerNote?: string;
  }[];
}

interface RankedSchoolEntry {
  school: School;
  scores: SchoolParadeScores;
  currentScore: number;
  rank: number; // 1 to 6
  rankLabel: string;
  tiebreakerNote?: string;
}

export const DesfileCampeãsView: React.FC<DesfileCampeasViewProps> = ({
  currentYear,
  especialSchools,
  especialScores,
  userSchool,
  onAdvanceYear,
  onApplyFineToUserSchool,
  onShowMessage,
  paradeResults: propParadeResults,
  onUpdateParadeResults,
  allApuracoesCompleted = false,
  onNavigateToApuracao,
  quesitosDraw,
  sorteio,
  history = [],
  officialEspecialStandings
}) => {
  // Results of each of the 6 parades (uses persistent parent state when provided)
  const [localParadeResults, setLocalParadeResults] = useState<Record<string, CampeasParadeResult>>({});
  const paradeResults = propParadeResults ?? localParadeResults;
  const setParadeResults = onUpdateParadeResults ?? setLocalParadeResults;

  // Canonical, official G6 of Grupo Especial (strictly matches official apuração)
  const rankedG6: RankedSchoolEntry[] = useMemo(() => {
    if (!allApuracoesCompleted || !especialSchools || especialSchools.length === 0) {
      return [];
    }

    const fullRanked =
      officialEspecialStandings && officialEspecialStandings.length >= 6
        ? officialEspecialStandings
        : SimulationEngine.getOfficialEspecialStandings(
            especialSchools,
            especialScores,
            sorteio,
            currentYear,
            history,
            quesitosDraw
          );

    return fullRanked.slice(0, 6).map((item, idx) => {
      const rank = idx + 1;
      let rankLabel = `${rank}º Lugar`;
      if (rank === 1) rankLabel = '1º Lugar (Campeã)';
      else if (rank === 2) rankLabel = '2º Lugar (Vice-Campeã)';
      else if (rank === 3) rankLabel = '3º Lugar (3ª Colocada)';

      return {
        school: item.school,
        scores: item.scores,
        currentScore: item.currentScore ?? item.scores.finalScore,
        rank,
        rankLabel,
        tiebreakerNote: item.tiebreakerNote
      };
    });
  }, [
    allApuracoesCompleted,
    officialEspecialStandings,
    especialSchools,
    especialScores,
    sorteio,
    currentYear,
    history,
    quesitosDraw
  ]);

  // Parade order is descending: 6ª colocada down to 1ª colocada (Campeã)
  const paradeOrderList: RankedSchoolEntry[] = useMemo(() => {
    return [...rankedG6].reverse();
  }, [rankedG6]);
  
  // Active parade being watched/simulated
  const [activeParadeSchoolId, setActiveParadeSchoolId] = useState<string | null>(null);
  const [isParading, setIsParading] = useState<boolean>(false);
  const [paradeProgress, setParadeProgress] = useState<number>(0);
  const [liveMinutes, setLiveMinutes] = useState<number>(0);
  const [liveNarrative, setLiveNarrative] = useState<string>('Concentração na armação do Setor 1...');

  // Simulation logic for a single school
  const simulateSchoolParadeTime = (school: School, rank: number, paradeOrder: number): CampeasParadeResult => {
    // Official presentation duration for Grupo Especial: 70 to 80 minutes
    const minMinutes = 70;
    const maxMinutes = 80;

    // Realistic duration influenced by evolution & harmonia attributes
    const evolutionFactor = (school.attributes.evolucao + school.attributes.harmonia) / 2;
    // 75 is the sweet spot. Higher evolution stays closer to 74-76 min.
    // Random jitter can cause a rush (below 70) or a bottleneck (above 80)
    const baseTarget = 75;
    const jitter = Math.floor(Math.random() * 9) - 4; // -4 to +4
    const stressPenalty = evolutionFactor < 82 ? Math.floor(Math.random() * 6) : 0;
    
    let duration = baseTarget + jitter + stressPenalty;
    // Ensure duration stays in realistic window (66 to 86 min)
    duration = Math.max(66, Math.min(86, duration));

    let timeStatus: 'regular' | 'estouro' | 'abaixo' = 'regular';
    let diffMinutes = 0;
    let fineAmount = 0;

    if (duration > maxMinutes) {
      timeStatus = 'estouro';
      diffMinutes = duration - maxMinutes;
      // Regra oficial: R$ 100.000 por cada minuto excedido!
      fineAmount = diffMinutes * 100000;
    } else if (duration < minMinutes) {
      timeStatus = 'abaixo';
      diffMinutes = minMinutes - duration;
      fineAmount = 0;
    }

    let celebrationNote = `A ${cleanSchoolName(school)} levantou as arquibancadas no Sábado das Campeãs!`;
    if (rank === 1) {
      celebrationNote = `Apoteose total! A grande campeã ${cleanSchoolName(school)} desfilou sob gritos de "É Campeã!" e chuva de confetes!`;
    } else if (rank === 2) {
      celebrationNote = `A vice-campeã ${cleanSchoolName(school)} fez uma exibição de gala, consagrando sua belíssima campanha!`;
    }

    return {
      schoolId: school.id,
      rankInCarnaval: rank,
      rankLabel: rank === 1 ? '1º Lugar (Campeã)' : rank === 2 ? 'Vice-Campeã' : `${rank}º Lugar`,
      paradeOrder,
      durationMinutes: duration,
      timeStatus,
      diffMinutes,
      fineAmount,
      completed: true,
      celebrationNote
    };
  };

  // Live animation simulation
  const handleWatchParade = (item: RankedSchoolEntry, orderIdx: number) => {
    // Validação regulamentar de ordem estrita
    if (orderIdx > 0) {
      const prevItem = paradeOrderList[orderIdx - 1];
      if (!paradeResults[prevItem.school.id]?.completed) {
        onShowMessage?.(
          `Ordem oficial bloqueada! A ${cleanSchoolName(prevItem.school)} (${orderIdx}ª a desfilar) precisa se apresentar antes da ${cleanSchoolName(item.school)}.`,
          'alert'
        );
        return;
      }
    }

    setActiveParadeSchoolId(item.school.id);
    setIsParading(true);
    setParadeProgress(0);
    setLiveMinutes(0);

    const schoolClean = cleanSchoolName(item.school);
    const result = simulateSchoolParadeTime(item.school, item.rank, orderIdx + 1);

    soundService.playSurdoBeat(true);

    const sectors = [
      { pct: 15, text: `Setor 1 (Armação): A ${schoolClean} entra na pista sob o rufar da bateria!` },
      { pct: 35, text: `Cabine 1 (Setores 2 e 3): Comissão de frente encanta e o casal baila com o pavilhão!` },
      { pct: 55, text: `Balcões e Setores 5/6: O canto da escola explode nas arquibancadas lotadas!` },
      { pct: 75, text: `Segundo Recuo (Setor 9): A bateria dá um show de paradinhas consagrando a noite!` },
      { pct: 90, text: `Cabines 3 e 4 (Setor 10): Cronômetro marcando o tempo oficial de desfile...` },
      { pct: 100, text: `Praça da Apoteose: A ${schoolClean} cruza a linha final de consagração no Sábado das Campeãs!` }
    ];

    let currentSec = 0;
    const interval = setInterval(() => {
      currentSec++;
      if (currentSec < sectors.length) {
        setParadeProgress(sectors[currentSec].pct);
        setLiveNarrative(sectors[currentSec].text);
        setLiveMinutes(Math.round((result.durationMinutes * sectors[currentSec].pct) / 100));
      } else {
        clearInterval(interval);
        setParadeProgress(100);
        setLiveMinutes(result.durationMinutes);
        setIsParading(false);
        setParadeResults((prev) => ({ ...prev, [item.school.id]: result }));

        if (result.fineAmount > 0) {
          soundService.playGavel();
          if (item.school.id === userSchool?.id && onApplyFineToUserSchool) {
            onApplyFineToUserSchool(result.fineAmount);
          }
          onShowMessage?.(
            `Estouro de tempo de ${result.diffMinutes} minuto(s)! Multa estatutária de R$ ${result.fineAmount.toLocaleString('pt-BR')} aplicada à ${schoolClean}.`,
            'alert'
          );
        } else {
          soundService.playChampionFanfare();
          onShowMessage?.(
            `Desfile da ${schoolClean} concluído com sucesso dentro do tempo regulamentar (${result.durationMinutes} min)!`,
            'success'
          );
        }
      }
    }, 700);
  };

  // Instant simulation of a single school
  const handleQuickSimulate = (item: RankedSchoolEntry, orderIdx: number) => {
    // Validação regulamentar de ordem estrita
    if (orderIdx > 0) {
      const prevItem = paradeOrderList[orderIdx - 1];
      if (!paradeResults[prevItem.school.id]?.completed) {
        onShowMessage?.(
          `Ordem oficial bloqueada! A ${cleanSchoolName(prevItem.school)} (${orderIdx}ª a desfilar) precisa se apresentar antes da ${cleanSchoolName(item.school)}.`,
          'alert'
        );
        return;
      }
    }

    const res = simulateSchoolParadeTime(item.school, item.rank, orderIdx + 1);
    setParadeResults((prev) => ({ ...prev, [item.school.id]: res }));

    if (res.fineAmount > 0 && item.school.id === userSchool?.id && onApplyFineToUserSchool) {
      onApplyFineToUserSchool(res.fineAmount);
    }

    onShowMessage?.(
      res.fineAmount > 0
        ? `Estouro de ${res.diffMinutes} min! Multa de R$ ${res.fineAmount.toLocaleString('pt-BR')} aplicada à ${cleanSchoolName(item.school)}.`
        : `Desfile da ${cleanSchoolName(item.school)} realizado no tempo regulamentar (${res.durationMinutes} min)!`,
      res.fineAmount > 0 ? 'warning' : 'success'
    );
  };

  // Simulate all 6 parades at once
  const handleSimulateAll = () => {
    const newResults: Record<string, CampeasParadeResult> = {};
    let totalFines = 0;

    paradeOrderList.forEach((item, idx) => {
      const res = simulateSchoolParadeTime(item.school, item.rank, idx + 1);
      newResults[item.school.id] = res;
      totalFines += res.fineAmount;

      if (res.fineAmount > 0 && item.school.id === userSchool?.id && onApplyFineToUserSchool) {
        onApplyFineToUserSchool(res.fineAmount);
      }
    });

    setParadeResults(newResults);
    soundService.playChampionFanfare();
    onShowMessage?.(
      `Todos os 6 desfiles do Sábado das Campeãs foram realizados na Marquês de Sapucaí! Temporada pronta para encerramento!`,
      'success'
    );
  };

  // Reset simulation
  
  const g6Ids = useMemo(() => new Set(rankedG6.map((r) => r.school.id)), [rankedG6]);
  const completedCount = useMemo(() => {
    return Object.keys(paradeResults).filter((id) => g6Ids.has(id)).length;
  }, [paradeResults, g6Ids]);
  const isAllCompleted = completedCount >= 6 && rankedG6.length === 6;
  const championEntry = rankedG6.find((r) => r.rank === 1);

  // Total fines calculated (strictly for the G6)
  const totalFinesImposed = useMemo(() => {
    return Object.entries(paradeResults)
      .filter(([id]) => g6Ids.has(id))
      .reduce((sum, [, r]) => sum + r.fineAmount, 0);
  }, [paradeResults, g6Ids]);

  // BLOCKING GUARD: The Desfile das Campeãs is strictly locked until all apurações are completed
  if (!allApuracoesCompleted) {
    return (
      <div className="space-y-6 pb-16 animate-fadeIn">
        <div className="bg-slate-900 border-2 border-amber-500/40 rounded-2xl p-6 sm:p-10 shadow-2xl text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400 shadow-lg shadow-amber-500/20">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              🔴 REGULAMENTO OFICIAL DA LIESA • CARNAVAL {currentYear}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
              Desfile das Campeãs Bloqueado • Apuração Pendente
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto mt-2 leading-relaxed">
              O tradicional <strong>Sábado das Campeãs</strong> reúne exclusivamente as <strong>6 primeiras colocadas do Grupo Especial</strong>. Pelo regulamento oficial, a ordem de desfile só pode ser revelada e liberada para assistir ou simular após a realização e homologação de todas as apurações na Praça da Apoteose.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
            <span>Status da Apuração:</span>
            <span className="text-amber-400 font-bold">Aguardando leitura oficial das notas dos jurados</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {onNavigateToApuracao && (
              <button
                onClick={onNavigateToApuracao}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/25 flex items-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5"
              >
                <Trophy className="w-4 h-4 text-slate-950" />
                <span>IR PARA A APURAÇÃO OFICIAL (LER NOTAS) →</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-amber-950/40 border-2 border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Crown className="w-64 h-64 text-amber-400" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 shadow">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>SÁBADO DAS CAMPEÃS • CARNAVAL {currentYear}</span>
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
              Sambódromo Marquês de Sapucaí • LIESA
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
              G6 Consagrado
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Desfile das Campeãs</span>
              <Sparkles className="w-7 h-7 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-2 leading-relaxed">
              As <strong>6 primeiras colocadas do Grupo Especial</strong> retornam à Marquês de Sapucaí no tradicional Sábado das Campeãs para celebrar com o público. 
              A ordem oficial é <strong>decrescente</strong> (da 6ª colocada até a Grande Campeã). Segue rigorosamente o tempo oficial (70 a 80 min) e as obrigatoriedades de apresentação.
            </p>
          </div>

          {/* Regulation & Overtime fine reminder */}
          <div className="flex flex-wrap items-center gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30 text-xs">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Tempo Regulamentar: 70 a 80 minutos</span>
            </div>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <div className="flex items-center gap-2 text-rose-300 font-semibold">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Multa por Estouro: <strong>R$ 100.000,00 por minuto excedido</strong></span>
            </div>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <div className="text-slate-400">
              Progresso: <strong className="text-white font-mono">{completedCount} de 6 desfiles realizados</strong>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleSimulateAll}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition flex items-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Simular Todos os Desfiles das Campeãs</span>
              </button>

              
            </div>

            {/* End season button if all parades completed */}
            {isAllCompleted ? (
              <button
                onClick={onAdvanceYear}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/30 transition transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer animate-pulse"
              >
                <PartyPopper className="w-4 h-4 text-slate-950" />
                <span>ENCERRAR TEMPORADA DO CARNAVAL {currentYear} & AVANÇAR PARA {currentYear + 1} 🎆</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Avanço Bloqueado: <strong>{completedCount} de 6 desfiles</strong></span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Live Parade Broadcast Overlay */}
      {isParading && activeParadeSchoolId && (
        <div className="bg-slate-900 border-2 border-amber-500 rounded-2xl p-6 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs font-black uppercase text-rose-400 tracking-wider">
                AO VIVO NA MARQUÊS DE SAPUCAÍ • SÁBADO DAS CAMPEÃS
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-sm font-bold bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 text-amber-400">
              <Clock className="w-4 h-4" />
              <span>Cronômetro: {liveMinutes} min</span>
            </div>
          </div>

          <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 to-amber-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${paradeProgress}%` }}
            />
          </div>

          <p className="text-sm font-bold text-white text-center italic bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            "{liveNarrative}"
          </p>
        </div>
      )}

      {/* Official G6 Standings from Apuração */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-black text-white">
              Resultado Oficial da Apuração • G6 Homologado pela LIESA
            </h3>
          </div>
          <span className="text-[11px] text-amber-300 font-semibold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            Ordem no Sábado das Campeãs: Inversa (da 6ª à 1ª colocada)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {rankedG6.map((entry) => {
            const isUser = entry.school.id === userSchool?.id;
            const paradeNum = 7 - entry.rank;
            return (
              <div
                key={entry.school.id}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                  entry.rank === 1
                    ? 'bg-amber-500/15 border-amber-400/50 shadow'
                    : entry.rank === 2
                    ? 'bg-slate-800/80 border-slate-600'
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                      entry.rank === 1
                        ? 'bg-amber-400 text-slate-950 ring-1 ring-amber-300'
                        : entry.rank === 2
                        ? 'bg-slate-300 text-slate-950'
                        : entry.rank === 3
                        ? 'bg-amber-700 text-amber-100'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {entry.rank}º
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-white truncate flex items-center gap-1.5">
                      <span>{cleanSchoolName(entry.school)}</span>
                      {isUser && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-black">
                          VOCÊ
                        </span>
                      )}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Nota: <strong>{entry.currentScore.toFixed(1)}</strong>
                      {entry.tiebreakerNote && (
                        <span className="text-amber-400 ml-1.5">
                          • {entry.tiebreakerNote.includes('(') ? entry.tiebreakerNote.split('(')[1]?.replace(')', '') : 'Desempate'}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Desfile</span>
                  <span className="text-xs font-mono font-black text-amber-400">
                    {paradeNum}ª a desfilar
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Parades List in Descending Order (6ª até a 1ª) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-black text-white">
              Ordem Oficial de Desfile das Campeãs (Decrescente: 6º ao 1º Lugar)
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Regulamento LIESA • 6 Agremiações Consagradas
          </span>
        </div>

        <div className="space-y-3">
          {paradeOrderList.map((entry, idx) => {
            const school = entry.school;
            const cleanName = cleanSchoolName(school);
            const paradeOrderNumber = idx + 1;
            const result = paradeResults[school.id];
            const isUser = school.id === userSchool?.id;
            
            // Regra oficial: desfiles ocorrem estritamente em ordem decrescente (6ª até a Campeã)
            const previousSchoolEntry = idx > 0 ? paradeOrderList[idx - 1] : null;
            const isPreviousParadeDone = idx === 0 || Boolean(previousSchoolEntry && paradeResults[previousSchoolEntry.school.id]?.completed);
            const isCurrentOnTrack = isPreviousParadeDone && !result?.completed;
            const isLocked = !isPreviousParadeDone;

            const evalObrig = evaluateSchoolParadeObrigatoriedades(
              school,
              school.paradeComposition || {
                componentes: 2800,
                ritmistas: 230,
                baianas: 65,
                comissaoDeFrente: 13,
                alegorias: 5,
                tripes: 2,
                componentesPorTripe: 2,
                componentesPorAla: 40,
                cumpreFolhaObrigatoriedades: true,
                respeitaIdentidadeVisual: true,
                respeitaVestimentaEMerchandising: true,
                semAnimaisOuGenitalia: true
              }
            );

            return (
              <div
                key={school.id}
                className={`p-4 sm:p-5 rounded-2xl border transition shadow-lg ${
                  result?.completed
                    ? result.timeStatus === 'estouro'
                      ? 'bg-rose-950/20 border-rose-500/40'
                      : 'bg-slate-900/90 border-emerald-500/40'
                    : isCurrentOnTrack
                    ? 'bg-amber-500/10 border-amber-400 ring-2 ring-amber-400/40 shadow-xl shadow-amber-500/10'
                    : isLocked
                    ? 'bg-slate-950/60 border-slate-800/60 opacity-65'
                    : isUser
                    ? 'bg-amber-500/5 border-amber-500/50 shadow-amber-500/10'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: School Identification and Rank */}
                  <div className="flex items-start sm:items-center gap-3.5">
                    {/* Parade Order Number Badge */}
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border flex flex-col items-center justify-center shrink-0 ${
                      result?.completed
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400'
                        : isCurrentOnTrack
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/30'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}>
                      <span className="text-[9px] uppercase font-bold">Ordem</span>
                      <span className="text-base sm:text-lg font-black font-mono">
                        {paradeOrderNumber}ª
                      </span>
                    </div>

                    {/* School Symbol / Initial Avatar */}
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-black text-sm shadow shrink-0"
                      style={{
                        backgroundColor: school.colors.primary,
                        color: school.colors.text,
                        border: `2px solid ${school.colors.border || '#fff'}`
                      }}
                    >
                      {school.symbol || cleanName.charAt(0)}
                    </div>

                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                            entry.rank === 1
                              ? 'bg-amber-400 text-slate-950 font-black ring-2 ring-amber-300'
                              : entry.rank === 2
                              ? 'bg-slate-300 text-slate-950 font-bold'
                              : entry.rank === 3
                              ? 'bg-amber-700/80 text-amber-100 font-bold'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {entry.rankLabel}
                        </span>

                        {isCurrentOnTrack && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase tracking-wide flex items-center gap-1 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                            Na Concentração • Próxima na Pista
                          </span>
                        )}

                        {isLocked && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 flex items-center gap-1">
                            <Lock className="w-3 h-3 text-amber-500" />
                            Aguardando Fila Oficial
                          </span>
                        )}

                        {result?.completed && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            Desfile Consagrado
                          </span>
                        )}

                        {isUser && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 uppercase tracking-wide">
                            Sua Agremiação
                          </span>
                        )}

                        <span className="text-[10px] text-slate-400 font-mono">
                          Nota Final Apuração: <strong>{(entry.currentScore ?? entry.scores.finalScore).toFixed(1)}</strong>
                        </span>

                        {entry.tiebreakerNote && (
                          <span className="text-[9px] text-amber-300 font-bold px-1.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 truncate max-w-[220px]" title={entry.tiebreakerNote}>
                            {entry.tiebreakerNote}
                          </span>
                        )}
                      </div>

                      <h4 className="text-base sm:text-lg font-black text-white truncate">
                        {cleanName}
                      </h4>

                      {/* Enredo subtitle */}
                      <p className="text-xs text-slate-300 truncate max-w-xl">
                        Enredo: <em>"{school.currentEnredo?.title || 'Enredo Consagrado na Sapucaí'}"</em>
                        {school.currentEnredo?.isSponsored && (
                          <span className="ml-1 text-[10px] text-emerald-400 font-bold">
                            [Patrocinado]
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Middle: Presentation Obrigatoriedades Status */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 shrink-0">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>{school.paradeComposition?.componentes || 2800} comp.</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Music className="w-3.5 h-3.5 text-amber-400" />
                      <span>{school.paradeComposition?.ritmistas || 230} ritm.</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Feather className="w-3.5 h-3.5 text-amber-400" />
                      <span>{school.paradeComposition?.baianas || 65} baianas</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300 font-semibold">Obrigatoriedades OK</span>
                    </div>
                  </div>

                  {/* Right: Parade Timing & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    {result ? (
                      <div className="text-right space-y-1">
                        <div className="flex items-center gap-2 justify-end">
                          <span className="text-xs text-slate-400">Tempo de Desfile:</span>
                          <span
                            className={`font-mono font-black text-sm px-2 py-0.5 rounded ${
                              result.timeStatus === 'estouro'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                : result.timeStatus === 'abaixo'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            }`}
                          >
                            {result.durationMinutes} min
                          </span>
                        </div>

                        {result.timeStatus === 'estouro' ? (
                          <div className="text-[11px] font-black text-rose-400 flex items-center gap-1 justify-end">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>
                              Estouro de {result.diffMinutes} min • Multa: R${' '}
                              {result.fineAmount.toLocaleString('pt-BR')}
                            </span>
                          </div>
                        ) : result.timeStatus === 'abaixo' ? (
                          <div className="text-[11px] text-amber-400 justify-end">
                            <span>Abaixo do mínimo ({result.diffMinutes} min a menos)</span>
                          </div>
                        ) : (
                          <div className="text-[11px] text-emerald-400 flex items-center gap-1 justify-end font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Tempo Regular • Sem multas</span>
                          </div>
                        )}
                      </div>
                    ) : isLocked ? (
                      <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/90 border border-amber-500/30 text-xs text-amber-300">
                        <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="font-semibold">
                          Aguarde o desfile da {cleanSchoolName(previousSchoolEntry?.school!)} ({idx}ª a desfilar)
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          disabled={isParading}
                          onClick={() => handleWatchParade(entry, idx)}
                          className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow cursor-pointer disabled:opacity-50"
                        >
                          <Play className="w-3.5 h-3.5 fill-slate-950" />
                          <span>Assistir Desfile</span>
                        </button>

                        <button
                          disabled={isParading}
                          onClick={() => handleQuickSimulate(entry, idx)}
                          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition border border-slate-700 cursor-pointer disabled:opacity-50"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>Simular Rápido</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Celebration note if finished */}
                {result?.celebrationNote && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-xs text-slate-300 italic flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{result.celebrationNote}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Season Closure Card (Final Step of Carnival) */}
      <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center mx-auto text-slate-950 shadow-xl shadow-amber-500/20">
          <Crown className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            CICLO DO CARNAVAL {currentYear} HOMOLOGADO
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {championEntry
              ? `${cleanSchoolName(championEntry.school)} é Consagrada Campeã do Carnaval ${currentYear}!`
              : `Encerramento do Carnaval ${currentYear}`}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Com a realização do Sábado das Campeãs, encerra-se formalmente o Carnaval Carioca de {currentYear}. 
            {totalFinesImposed > 0 && (
              <span className="text-rose-300 font-semibold block mt-1">
                Foram aplicadas um total de R$ {totalFinesImposed.toLocaleString('pt-BR')} em multas estatutárias por estouro de tempo.
              </span>
            )}
            Ao avançar, os acessos e rebaixamentos serão efetivados nas 5 divisões e os trabalhos para o Carnaval {currentYear + 1} terão início!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          {isAllCompleted ? (
            <button
              onClick={onAdvanceYear}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer animate-pulse"
            >
              <PartyPopper className="w-5 h-5 text-slate-950" />
              <span>ENCERRAR TEMPORADA ATUAL & AVANÇAR PARA O CARNAVAL {currentYear + 1} 🎆</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 max-w-xl">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Avanço de Temporada Bloqueado:</strong> A passagem para a próxima temporada só é liberada após todos os 6 Desfiles das Campeãs serem realizados ({completedCount} de 6 concluídos).
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Also export as DesfileCampeasView for alternate naming compatibility
export const DesfileCampeasView = DesfileCampeãsView;
