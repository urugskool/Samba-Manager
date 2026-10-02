import React, { useState, useEffect, useRef } from 'react';
import {
  School,
  DivisionId,
  SchoolParadeScores,
  QuesitoId,
  DivisionResult,
  DivisionStatesMap
} from '../types/carnaval';
import { QUESITOS } from '../data/carnavalData';
import { SimulationEngine, TIEBREAKER_QUESITO_ORDER } from '../services/simulationEngine';
import { SorteioEngine } from '../services/sorteioEngine';
import { soundService } from '../services/soundService';
import { TiebreakerModal } from './TiebreakerModal';
import { LEAGUES, PARADE_CONFIG } from '../config/paradeConfig';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Play,
  Pause,
  SkipForward,
  FastForward,
  RotateCcw,
  Volume2,
  Sparkles,
  ArrowUpCircle,
  ArrowDownCircle,
  Scale,
  Table,
  CheckCircle2,
  ChevronRight,
  Shuffle,
  Lock,
  AlertTriangle,
  Zap
} from 'lucide-react';

interface ApuracaoViewProps {
  currentYear: number;
  especialSchools: School[];
  ouroSchools: School[];
  prataSchools: School[];
  bronzeSchools: School[];
  avaliacaoSchools?: School[];
  especialScores: SchoolParadeScores[];
  ouroScores: SchoolParadeScores[];
  prataScores: SchoolParadeScores[];
  bronzeScores: SchoolParadeScores[];
  avaliacaoScores?: SchoolParadeScores[];
  userSchool: School | null;
  onAdvanceYear: (
    especialResult: DivisionResult,
    ouroResult: DivisionResult,
    prataResult: DivisionResult,
    bronzeResult: DivisionResult,
    avaliacaoResult?: DivisionResult
  ) => void;
  allParadesCompleted?: boolean;
  completedParadeCount?: number;
  totalParadeCount?: number;
  onNavigateToDesfile?: () => void;
  onSimulateAllParades?: () => void;
  onNavigateToCampeas?: () => void;
  divisionStates?: DivisionStatesMap;
  onUpdateDivisionStates?: (
    updater: DivisionStatesMap | ((prev: DivisionStatesMap) => DivisionStatesMap)
  ) => void;
}

export const ApuracaoView: React.FC<ApuracaoViewProps> = ({
  currentYear,
  especialSchools,
  ouroSchools,
  prataSchools,
  bronzeSchools,
  avaliacaoSchools = [],
  especialScores,
  ouroScores,
  prataScores,
  bronzeScores,
  avaliacaoScores = [],
  userSchool,
  onAdvanceYear,
  allParadesCompleted = true,
  completedParadeCount = 0,
  totalParadeCount = 75,
  onNavigateToDesfile,
  onSimulateAllParades,
  onNavigateToCampeas,
  divisionStates: propDivisionStates,
  onUpdateDivisionStates
}) => {
  const [selectedDivision, setSelectedDivision] = useState<DivisionId>('especial');
  const currentLeague = LEAGUES[PARADE_CONFIG[selectedDivision]?.leagueId || 'liesa'];
  const [speed, setSpeed] = useState<number>(1);
  const [showMatrix, setShowMatrix] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [tiebreakerModalData, setTiebreakerModalData] = useState<{
    isOpen: boolean;
    schoolA?: School;
    schoolB?: School;
    scoresA?: Record<QuesitoId, [number, number, number, number]>;
    scoresB?: Record<QuesitoId, [number, number, number, number]>;
    totalA?: number;
    totalB?: number;
  }>({ isOpen: false });

  // Separate playback & completion state per division (fallback to local if not provided)
  const [localDivisionStates, setLocalDivisionStates] = useState<DivisionStatesMap>({
    especial: { hasStarted: false, quesitoIdx: 0, judgeIdx: 0, schoolIdx: 0, isCompleted: false },
    ouro: { hasStarted: false, quesitoIdx: 0, judgeIdx: 0, schoolIdx: 0, isCompleted: false },
    prata: { hasStarted: false, quesitoIdx: 0, judgeIdx: 0, schoolIdx: 0, isCompleted: false },
    bronze: { hasStarted: false, quesitoIdx: 0, judgeIdx: 0, schoolIdx: 0, isCompleted: false },
    avaliacao: { hasStarted: false, quesitoIdx: 0, judgeIdx: 0, schoolIdx: 0, isCompleted: false }
  });

  const divisionStates = propDivisionStates || localDivisionStates;
  const setDivisionStates = onUpdateDivisionStates || setLocalDivisionStates;

  // Stop playback whenever currentYear advances
  useEffect(() => {
    setIsPlaying(false);
  }, [currentYear]);

  const currentDivState = divisionStates[selectedDivision];
  const hasStarted = currentDivState.hasStarted;
  const currentQuesitoIdx = currentDivState.quesitoIdx;
  const currentJudgeIdx = currentDivState.judgeIdx;
  const currentSchoolIdx = currentDivState.schoolIdx;
  const isCompleted = currentDivState.isCompleted;

  const allGroupsCompleted =
    divisionStates.especial.isCompleted &&
    divisionStates.ouro.isCompleted &&
    divisionStates.prata.isCompleted &&
    divisionStates.bronze.isCompleted &&
    divisionStates.avaliacao.isCompleted;

  const completedCount =
    (divisionStates.especial.isCompleted ? 1 : 0) +
    (divisionStates.ouro.isCompleted ? 1 : 0) +
    (divisionStates.prata.isCompleted ? 1 : 0) +
    (divisionStates.bronze.isCompleted ? 1 : 0) +
    (divisionStates.avaliacao.isCompleted ? 1 : 0);

  const completedDivisionsMap: Record<DivisionId, boolean> = {
    especial: Boolean(divisionStates.especial?.isCompleted),
    ouro: Boolean(divisionStates.ouro?.isCompleted),
    avaliacao: Boolean(divisionStates.avaliacao?.isCompleted),
    bronze: Boolean(divisionStates.bronze?.isCompleted),
    prata: Boolean(divisionStates.prata?.isCompleted)
  };

  const activeDivUnlock = SorteioEngine.isDivisionApuracaoUnlocked(
    selectedDivision,
    completedDivisionsMap
  );

  const pendingDivisions: { id: DivisionId; name: string }[] = [];
  if (!divisionStates.especial.isCompleted) pendingDivisions.push({ id: 'especial', name: 'Grupo Especial' });
  if (!divisionStates.ouro.isCompleted) pendingDivisions.push({ id: 'ouro', name: 'Série Ouro' });
  if (!divisionStates.prata.isCompleted) pendingDivisions.push({ id: 'prata', name: 'Série Prata' });
  if (!divisionStates.bronze.isCompleted) pendingDivisions.push({ id: 'bronze', name: 'Série Bronze' });
  if (!divisionStates.avaliacao.isCompleted) pendingDivisions.push({ id: 'avaliacao', name: 'Grupo de Avaliação' });

  const schools =
    selectedDivision === 'especial'
      ? especialSchools
      : selectedDivision === 'ouro'
      ? ouroSchools
      : selectedDivision === 'prata'
      ? prataSchools
      : selectedDivision === 'bronze'
      ? bronzeSchools
      : avaliacaoSchools;

  const paradeScores =
    selectedDivision === 'especial'
      ? especialScores
      : selectedDivision === 'ouro'
      ? ouroScores
      : selectedDivision === 'prata'
      ? prataScores
      : selectedDivision === 'bronze'
      ? bronzeScores
      : avaliacaoScores;

  // Real-time standings calculation (strictly respects hasStarted and currentSchoolIdx)
  const standings = SimulationEngine.calculateStandings(
    schools,
    paradeScores,
    currentQuesitoIdx,
    currentJudgeIdx,
    currentSchoolIdx,
    hasStarted
  );

  const currentQuesito = QUESITOS[currentQuesitoIdx];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const updateCurrentDivision = (
    updater: (prev: { hasStarted: boolean; quesitoIdx: number; judgeIdx: number; schoolIdx: number; isCompleted: boolean }) => {
      hasStarted: boolean;
      quesitoIdx: number;
      judgeIdx: number;
      schoolIdx: number;
      isCompleted: boolean;
    }
  ) => {
    setDivisionStates((prev) => ({
      ...prev,
      [selectedDivision]: updater(prev[selectedDivision])
    }));
  };

  // Start Apuração: reveals the first note and commences live reading
  const handleStartApuracao = () => {
    if (!activeDivUnlock.unlocked) {
      soundService.playBuzzer();
      return;
    }

    updateCurrentDivision((prev) => ({
      ...prev,
      hasStarted: true
    }));
    setIsPlaying(true);

    const firstSchool = schools[0];
    const schoolScoreData = paradeScores.find((s) => s.schoolId === firstSchool?.id);
    if (schoolScoreData && firstSchool) {
      const qScores = schoolScoreData.scoresByQuesito[currentQuesito.id];
      const scoreValue = qScores[0];
      soundService.announceScore(
        firstSchool.shortName,
        currentQuesito.name,
        1,
        scoreValue
      );
    }
  };

  // Step Note: reveals 1st note if not started; otherwise advances to next school/judge
  const handleStepNote = () => {
    if (!activeDivUnlock.unlocked) {
      soundService.playBuzzer();
      return;
    }

    if (!hasStarted) {
      updateCurrentDivision((prev) => ({
        ...prev,
        hasStarted: true
      }));
      const firstSchool = schools[0];
      const schoolScoreData = paradeScores.find((s) => s.schoolId === firstSchool?.id);
      if (schoolScoreData && firstSchool) {
        const qScores = schoolScoreData.scoresByQuesito[currentQuesito.id];
        const scoreValue = qScores[0];
        soundService.announceScore(
          firstSchool.shortName,
          currentQuesito.name,
          1,
          scoreValue
        );
      }
      return;
    }

    advanceStep();
  };

  // Playback Step Logic
  const advanceStep = () => {
    const activeSchools = schools;
    if (currentSchoolIdx + 1 < activeSchools.length) {
      const nextSchoolIdx = currentSchoolIdx + 1;
      updateCurrentDivision((prev) => ({ ...prev, schoolIdx: nextSchoolIdx }));

      const nextSchool = activeSchools[nextSchoolIdx];
      const schoolScoreData = paradeScores.find((s) => s.schoolId === nextSchool?.id);
      if (schoolScoreData && nextSchool) {
        const qScores = schoolScoreData.scoresByQuesito[currentQuesito.id];
        const scoreValue = qScores[currentJudgeIdx];
        const discardedScore = currentJudgeIdx === 3 ? Math.min(...qScores) : undefined;
        soundService.announceScore(
          nextSchool.shortName,
          currentQuesito.name,
          currentJudgeIdx + 1,
          scoreValue,
          discardedScore
        );
      }
    } else {
      // Finished all schools for current Judge
      if (currentJudgeIdx + 1 < 4) {
        const nextJudgeIdx = currentJudgeIdx + 1;
        updateCurrentDivision((prev) => ({ ...prev, schoolIdx: 0, judgeIdx: nextJudgeIdx }));
        soundService.playGavel();

        const firstSchool = activeSchools[0];
        const schoolScoreData = paradeScores.find((s) => s.schoolId === firstSchool?.id);
        if (schoolScoreData && firstSchool) {
          const qScores = schoolScoreData.scoresByQuesito[currentQuesito.id];
          const discardedScore = nextJudgeIdx === 3 ? Math.min(...qScores) : undefined;
          soundService.announceScore(
            firstSchool.shortName,
            currentQuesito.name,
            nextJudgeIdx + 1,
            qScores[nextJudgeIdx],
            discardedScore
          );
        }
      } else {
        // Finished all 4 judges for current Quesito
        if (currentQuesitoIdx + 1 < 9) {
          const nextQuesitoIdx = currentQuesitoIdx + 1;
          const nextQuesitoObj = QUESITOS[nextQuesitoIdx];
          updateCurrentDivision((prev) => ({
            ...prev,
            schoolIdx: 0,
            judgeIdx: 0,
            quesitoIdx: nextQuesitoIdx
          }));
          soundService.playGavel();

          const firstSchool = activeSchools[0];
          const schoolScoreData = paradeScores.find((s) => s.schoolId === firstSchool?.id);
          if (schoolScoreData && firstSchool) {
            const qScores = schoolScoreData.scoresByQuesito[nextQuesitoObj.id];
            soundService.announceScore(
              firstSchool.shortName,
              nextQuesitoObj.name,
              1,
              qScores[0]
            );
          }
        } else {
          // Finished all 9 quesitos (all 36 judges) for this group!
          updateCurrentDivision((prev) => ({ ...prev, isCompleted: true }));
          setIsPlaying(false);
          soundService.playChampionFanfare();
          try {
            confetti({
              particleCount: 150,
              spread: 80,
              origin: { y: 0.6 }
            });
          } catch {}
        }
      }
    }
  };

  // Playback timer
  useEffect(() => {
    if (isPlaying && !isCompleted && hasStarted) {
      const delay = Math.max(300, 1400 / speed);
      timerRef.current = setTimeout(() => {
        advanceStep();
      }, delay);
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, isCompleted, hasStarted, currentQuesitoIdx, currentJudgeIdx, currentSchoolIdx, speed]);

  const handleNextQuesito = () => {
    if (!activeDivUnlock.unlocked) {
      soundService.playBuzzer();
      return;
    }

    if (!hasStarted) {
      updateCurrentDivision((prev) => ({
        ...prev,
        hasStarted: true,
        quesitoIdx: 1,
        judgeIdx: 0,
        schoolIdx: 0
      }));
      soundService.playGavel();
      return;
    }

    if (currentQuesitoIdx < 8) {
      updateCurrentDivision((prev) => ({
        ...prev,
        quesitoIdx: prev.quesitoIdx + 1,
        judgeIdx: 0,
        schoolIdx: 0
      }));
      soundService.playGavel();
    } else {
      handleInstantFinish();
    }
  };

  const handleInstantFinish = () => {
    if (!activeDivUnlock.unlocked) {
      soundService.playBuzzer();
      return;
    }

    updateCurrentDivision((prev) => ({
      ...prev,
      hasStarted: true,
      quesitoIdx: 8,
      judgeIdx: 3,
      schoolIdx: schools.length - 1,
      isCompleted: true
    }));
    setIsPlaying(false);
    soundService.playChampionFanfare();
    try {
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch {}
  };

  const handleInstantFinishAll = () => {
    setDivisionStates({
      especial: { hasStarted: true, quesitoIdx: 8, judgeIdx: 3, schoolIdx: especialSchools.length - 1, isCompleted: true },
      ouro: { hasStarted: true, quesitoIdx: 8, judgeIdx: 3, schoolIdx: ouroSchools.length - 1, isCompleted: true },
      avaliacao: { hasStarted: true, quesitoIdx: 8, judgeIdx: 3, schoolIdx: Math.max(0, avaliacaoSchools.length - 1), isCompleted: true },
      bronze: { hasStarted: true, quesitoIdx: 8, judgeIdx: 3, schoolIdx: bronzeSchools.length - 1, isCompleted: true },
      prata: { hasStarted: true, quesitoIdx: 8, judgeIdx: 3, schoolIdx: prataSchools.length - 1, isCompleted: true }
    });
    setIsPlaying(false);
    soundService.playChampionFanfare();
    try {
      confetti({
        particleCount: 250,
        spread: 100,
        origin: { y: 0.5 }
      });
    } catch {}
  };

  const handleSelectDivision = (div: DivisionId) => {
    setIsPlaying(false);
    setSelectedDivision(div);
  };

  // Find current reading school (only active after apuração starts)
  const readingSchool = hasStarted ? schools[currentSchoolIdx] : null;
  const readingScores = readingSchool ? paradeScores.find((s) => s.schoolId === readingSchool.id) : null;
  const currentRevealedScore =
    hasStarted && readingScores
      ? readingScores.scoresByQuesito[currentQuesito.id][currentJudgeIdx]
      : null;

  // BLOCKING GUARD: Player must perform/simulate/watch parades before reading notes
  if (!allParadesCompleted) {
    return (
      <div className="space-y-6 pb-16 animate-fadeIn">
        <div className="bg-slate-900 border-2 border-amber-500/40 rounded-2xl p-6 sm:p-10 shadow-2xl text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400 shadow-lg shadow-amber-500/20">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              🔴 REGULAMENTO OFICIAL • CARNAVAL {currentYear}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
              Apuração Bloqueada • Realize os Desfiles Primeiro
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto mt-2 leading-relaxed">
              Pelo regulamento oficial da LIESA e da Superliga, a abertura dos envelopes e a leitura das notas dos 36 jurados só é permitida após a <strong>realização, simulação e acompanhamento dos desfiles</strong> de todos os grupos na Marquês de Sapucaí e Intendente Magalhães.
            </p>
          </div>

          <div className="inline-flex items-center gap-3 bg-slate-950 px-5 py-2.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400">Progresso dos Desfiles:</span>
            <span className="font-mono font-bold text-amber-400">
              {completedParadeCount} de {totalParadeCount} agremiações concluídas
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            {onNavigateToDesfile && (
              <button
                onClick={onNavigateToDesfile}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/25 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>IR PARA OS DESFILES DA SAPUCAÍ (ASSISTIR & SIMULAR)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {onSimulateAllParades && (
              <button
                onClick={onSimulateAllParades}
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-slate-700 flex items-center gap-2 transition cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Simular Todos os Desfiles Restantes Agora</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Header & Division Switcher */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              🔴 APURAÇÃO OFICIAL • PRAÇA DA APOTEOSE
            </span>
            <span className="text-xs text-slate-400">Carnaval {currentYear}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Apuração Oficial das Notas
          </h2>
          <p className="text-xs text-slate-400">
            9 quesitos oficiais com 4 jurados cada. Regulamento oficial: a menor nota de cada quesito é descartada (somam-se as 3 maiores notas, total máximo de 270,0 pontos).
          </p>
        </div>

        {/* Division Selector Tabs Organized by Governing League in Strict Apuração Sequence */}
        <div className="flex items-center overflow-x-auto no-scrollbar gap-2 pb-1 max-w-full">
          {/* 1º LIESA - Grupo Especial */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
            <span className="text-[10px] font-black uppercase px-2 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              1ª LIESA
            </span>
            <button
              onClick={() => handleSelectDivision('especial')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                selectedDivision === 'especial'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Grupo Especial</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  divisionStates.especial.isCompleted
                    ? 'bg-emerald-500 text-slate-950 ring-1 ring-emerald-400'
                    : !divisionStates.especial.hasStarted
                    ? selectedDivision === 'especial'
                      ? 'bg-slate-900/40 text-slate-950'
                      : 'bg-slate-900 text-slate-400'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {divisionStates.especial.isCompleted
                  ? '✓ Apurado'
                  : !divisionStates.especial.hasStarted
                  ? `${especialSchools.length} escolas`
                  : 'Em leitura'}
              </span>
            </button>
          </div>

          {/* 2º LIGA RJ - Série Ouro */}
          {(() => {
            const ouroUnlocked = SorteioEngine.isDivisionApuracaoUnlocked('ouro', completedDivisionsMap).unlocked;
            return (
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                <span className="text-[10px] font-black uppercase px-2 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  2ª LIGA RJ
                </span>
                <button
                  onClick={() => handleSelectDivision('ouro')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    selectedDivision === 'ouro'
                      ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20 font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {!ouroUnlocked && <Lock className="w-3.5 h-3.5 text-slate-500" />}
                  <span>Série Ouro</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      divisionStates.ouro.isCompleted
                        ? 'bg-emerald-500 text-slate-950 ring-1 ring-emerald-400'
                        : !ouroUnlocked
                        ? 'bg-slate-800 text-slate-500'
                        : !divisionStates.ouro.hasStarted
                        ? selectedDivision === 'ouro'
                          ? 'bg-blue-900/60 text-white'
                          : 'bg-slate-900 text-slate-400'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {divisionStates.ouro.isCompleted
                      ? '✓ Apurado'
                      : !ouroUnlocked
                      ? '🔒 Bloq'
                      : !divisionStates.ouro.hasStarted
                      ? `${ouroSchools.length} escolas`
                      : 'Em leitura'}
                  </span>
                </button>
              </div>
            );
          })()}

          {/* 3º SUPERLIGA - Avaliação -> Bronze -> Prata */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
            <span className="text-[10px] font-black uppercase px-2 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              3ª SUPERLIGA
            </span>

            {/* 3.1 Grupo de Avaliação */}
            {(() => {
              const avaliacaoUnlocked = SorteioEngine.isDivisionApuracaoUnlocked('avaliacao', completedDivisionsMap).unlocked;
              return (
                <button
                  onClick={() => handleSelectDivision('avaliacao')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    selectedDivision === 'avaliacao'
                      ? 'bg-purple-600 text-white font-black shadow-md shadow-purple-600/30 ring-1 ring-purple-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {!avaliacaoUnlocked && <Lock className="w-3.5 h-3.5 text-slate-500" />}
                  <span>3ª Avaliação</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      divisionStates.avaliacao.isCompleted
                        ? 'bg-emerald-500 text-slate-950'
                        : !avaliacaoUnlocked
                        ? 'bg-slate-800 text-slate-500'
                        : selectedDivision === 'avaliacao'
                        ? 'bg-purple-900 text-purple-200'
                        : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    {divisionStates.avaliacao.isCompleted ? '✓' : !avaliacaoUnlocked ? '🔒' : avaliacaoSchools.length}
                  </span>
                </button>
              );
            })()}

            {/* 3.2 Série Bronze */}
            {(() => {
              const bronzeUnlocked = SorteioEngine.isDivisionApuracaoUnlocked('bronze', completedDivisionsMap).unlocked;
              return (
                <button
                  onClick={() => handleSelectDivision('bronze')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    selectedDivision === 'bronze'
                      ? 'bg-amber-700 text-amber-100 shadow-md shadow-amber-800/30 font-black ring-1 ring-amber-500'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {!bronzeUnlocked && <Lock className="w-3.5 h-3.5 text-slate-500" />}
                  <span>4ª Série Bronze</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      divisionStates.bronze.isCompleted
                        ? 'bg-emerald-500 text-slate-950'
                        : !bronzeUnlocked
                        ? 'bg-slate-800 text-slate-500'
                        : selectedDivision === 'bronze'
                        ? 'bg-amber-900/60 text-amber-200'
                        : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    {divisionStates.bronze.isCompleted ? '✓' : !bronzeUnlocked ? '🔒' : bronzeSchools.length}
                  </span>
                </button>
              );
            })()}

            {/* 3.3 Série Prata */}
            {(() => {
              const prataUnlocked = SorteioEngine.isDivisionApuracaoUnlocked('prata', completedDivisionsMap).unlocked;
              return (
                <button
                  onClick={() => handleSelectDivision('prata')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    selectedDivision === 'prata'
                      ? 'bg-slate-300 text-slate-950 shadow-md shadow-slate-300/20 font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {!prataUnlocked && <Lock className="w-3.5 h-3.5 text-slate-500" />}
                  <span>5ª Série Prata</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      divisionStates.prata.isCompleted
                        ? 'bg-emerald-500 text-slate-950'
                        : !prataUnlocked
                        ? 'bg-slate-800 text-slate-500'
                        : selectedDivision === 'prata'
                        ? 'bg-slate-400/60 text-slate-950'
                        : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    {divisionStates.prata.isCompleted ? '✓' : !prataUnlocked ? '🔒' : prataSchools.length}
                  </span>
                </button>
              );
            })()}
          </div>
        </div>
      </div>

      {/* SE A DIVISÃO ESTIVER BLOQUEADA PELA SEQUÊNCIA: TELA OFICIAL DE BLOQUEIO */}
      {!activeDivUnlock.unlocked ? (
        <div className="bg-slate-900 border-2 border-amber-500/40 rounded-2xl p-6 sm:p-10 shadow-2xl text-center space-y-5 animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400 shadow-xl shadow-amber-500/10">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 inline-flex items-center gap-1.5">
              🔒 APURAÇÃO BLOQUEADA • ORDEM SEQUENCIAL OBRIGATÓRIA
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Aguardando Proclamação do Resultado do {activeDivUnlock.requiredName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2 leading-relaxed">
              {activeDivUnlock.reason}
            </p>
          </div>

          <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-left space-y-2 text-slate-400">
            <span className="text-white font-bold block text-[11px] uppercase tracking-wider">
              Sequência Oficial de Apuração das Notas:
            </span>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className={`p-2 rounded-lg flex items-center justify-between border ${completedDivisionsMap.especial ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-amber-500/30 text-amber-300 font-bold'}`}>
                <span>1ª Grupo Especial (LIESA • Apoteose)</span>
                <span>{completedDivisionsMap.especial ? '✓ Apurado' : '🔴 Apurando Agora'}</span>
              </div>
              <div className={`p-2 rounded-lg flex items-center justify-between border ${completedDivisionsMap.ouro ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                <span>2ª Série Ouro (LIGA-RJ)</span>
                <span>{completedDivisionsMap.ouro ? '✓ Apurado' : 'Aguardando Especial'}</span>
              </div>
              <div className={`p-2 rounded-lg flex items-center justify-between border ${completedDivisionsMap.avaliacao ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                <span>3ª Grupo de Avaliação (Superliga)</span>
                <span>{completedDivisionsMap.avaliacao ? '✓ Apurado' : 'Aguardando Série Ouro'}</span>
              </div>
              <div className={`p-2 rounded-lg flex items-center justify-between border ${completedDivisionsMap.bronze ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                <span>4ª Série Bronze (Superliga)</span>
                <span>{completedDivisionsMap.bronze ? '✓ Apurado' : 'Aguardando Avaliação'}</span>
              </div>
              <div className={`p-2 rounded-lg flex items-center justify-between border ${completedDivisionsMap.prata ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                <span>5ª Série Prata (Superliga)</span>
                <span>{completedDivisionsMap.prata ? '✓ Apurado' : 'Aguardando Bronze'}</span>
              </div>
            </div>
          </div>

          {activeDivUnlock.requiredDivision && (
            <button
              onClick={() => handleSelectDivision(activeDivUnlock.requiredDivision!)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer mx-auto transition"
            >
              <span>IR PARA A APURAÇÃO DO {activeDivUnlock.requiredName}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        /* Reader Stage / Locutor Banner */
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 p-6 shadow-2xl space-y-4">
        {/* Presiding League Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded border ${currentLeague.badgeBg} ${currentLeague.badgeText} ${currentLeague.badgeBorder}`}>
              {currentLeague.name} • {currentLeague.roleDescription}
            </span>
          </div>
          <span className="text-xs text-slate-400">
            {currentLeague.venue} • Mesa Apuradora Oficial
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Quesito & Judge Info */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
                Quesito {currentQuesitoIdx + 1} de 9
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-white border border-slate-700 font-mono">
                Jurado {currentJudgeIdx + 1} de 4
              </span>
              <span className="text-xs text-slate-400">
                {hasStarted
                  ? `(Jurado ${currentQuesitoIdx * 4 + currentJudgeIdx + 1} de 36 em apuração)`
                  : '(Aguardando comando do jogador para iniciar a apuração)'}
              </span>
            </div>

            <div>
              <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                Quesito Sendo Apurado
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-amber-400">
                {currentQuesito.name}
              </h3>
              <p className="text-xs text-slate-300 italic mt-0.5">
                {currentQuesito.description}
              </p>
            </div>
          </div>

          {/* School Envelope Announcement Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 w-full lg:w-auto lg:min-w-[280px] shadow-inner space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">
                  {hasStarted ? 'Lendo Envelope de' : 'Status da Mesa'}
                </div>
                <div className="text-lg font-black text-white flex items-center gap-2">
                  <span>{hasStarted ? (cleanSchoolName(readingSchool) || 'Aguardando...') : 'Envelopes Lacrados'}</span>
                </div>
                <div className="text-xs text-slate-400">
                  {hasStarted ? `Jurado nº ${currentJudgeIdx + 1}` : 'Aguardando Início da Apuração'}
                </div>
              </div>

              <div className="text-center pl-3 border-l border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Nota</div>
                <div
                  className={`text-3xl font-black font-mono transition-transform duration-200 scale-105 ${
                    currentRevealedScore === null
                      ? 'text-slate-600'
                      : currentRevealedScore >= 10.0
                      ? 'text-amber-400'
                      : currentRevealedScore >= 9.9
                      ? 'text-emerald-400'
                      : 'text-rose-400'
                  }`}
                >
                  {currentRevealedScore !== null ? currentRevealedScore.toFixed(1) : '---'}
                </div>
              </div>
            </div>

            {hasStarted && readingScores && (
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-semibold mr-1">Jurados:</span>
                  {readingScores.scoresByQuesito[currentQuesito.id].map((score, jIdx) => {
                    const isRevealed = jIdx <= currentJudgeIdx;
                    const allScores = readingScores.scoresByQuesito[currentQuesito.id];
                    const minScore = Math.min(...allScores);
                    const minIdx = allScores.indexOf(minScore);
                    const isDiscarded = currentJudgeIdx === 3 && jIdx === minIdx;

                    return (
                      <span
                        key={jIdx}
                        className={`px-1.5 py-0.5 rounded text-[11px] font-mono font-bold transition-all ${
                          !isRevealed
                            ? 'bg-slate-800/50 text-slate-600 border border-slate-800'
                            : isDiscarded
                            ? 'bg-rose-950/70 text-rose-400 line-through border border-rose-500/50 shadow'
                            : 'bg-slate-800 text-amber-300 border border-slate-700'
                        }`}
                        title={
                          !isRevealed
                            ? `Jurado ${jIdx + 1} (Aguardando)`
                            : isDiscarded
                            ? `Jurado ${jIdx + 1}: ${score.toFixed(1)} (Menor nota descartada)`
                            : `Jurado ${jIdx + 1}: ${score.toFixed(1)} (Nota válida)`
                        }
                      >
                        {isRevealed ? score.toFixed(1) : '—'}
                      </span>
                    );
                  })}
                </div>
                {currentJudgeIdx === 3 && (
                  <span className="text-[10px] text-rose-400 font-extrabold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/25">
                    Menor nota descartada!
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Playback & Step Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-5 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2">
            {isCompleted ? (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold shadow-inner">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Apuração Homologada pela {currentLeague.name} • Resultado Oficial e Irrevogável</span>
              </div>
            ) : (
              <>
                {!hasStarted ? (
                  <button
                    onClick={handleStartApuracao}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs transition flex items-center gap-2 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400/50 transform hover:scale-[1.02] cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>Iniciar a Apuração</span>
                  </button>
                ) : !isPlaying ? (
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-2 shadow-lg shadow-amber-500/25 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>Continuar Apuração Ao Vivo</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center gap-2 cursor-pointer"
                  >
                    <Pause className="w-4 h-4" />
                    <span>Pausar Leitura</span>
                  </button>
                )}

                <button
                  onClick={handleStepNote}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{!hasStarted ? 'Revelar 1ª Nota' : 'Próxima Nota'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleNextQuesito}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <SkipForward className="w-4 h-4" />
                  <span>Pular Quesito</span>
                </button>

                <button
                  onClick={handleInstantFinish}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-amber-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  title="Apurar instantaneamente o grupo selecionado"
                >
                  <FastForward className="w-4 h-4" />
                  <span>Resultado Imediato ({selectedDivision === 'especial' ? 'Especial' : selectedDivision === 'ouro' ? 'Ouro' : selectedDivision === 'prata' ? 'Prata' : selectedDivision === 'bronze' ? 'Bronze' : 'Avaliação'})</span>
                </button>

                {!allGroupsCompleted && (
                  <button
                    onClick={handleInstantFinishAll}
                    className="px-3.5 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 hover:bg-amber-500/30 text-amber-300 text-xs font-black transition flex items-center gap-1.5 shadow cursor-pointer"
                    title="Apurar todos os 5 grupos (Especial, Ouro, Prata, Bronze e Avaliação) de uma só vez"
                  >
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Apurar Todos os Grupos (5 em 1)</span>
                  </button>
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Speed Buttons */}
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <span className="hidden sm:inline">Velocidade:</span>
              {[1, 2, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    speed === s
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            {/* Matrix View Toggle */}
            <button
              onClick={() => setShowMatrix(!showMatrix)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                showMatrix
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>{showMatrix ? 'Ocultar Matriz' : 'Ver Matriz de Notas'}</span>
            </button>
          </div>
        </div>
      </div>
      )}

      {/* Full 36-Judge Matrix Modal / Drawer */}
      {showMatrix && (
        <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 shadow-2xl overflow-x-auto space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Table className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">
                Matriz Completa de Notas: 9 Quesitos x 4 Jurados (Menor Nota Descartada)
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Total Máximo: 270,0 pts (3 notas válidas por quesito)
            </span>
          </div>

          {/* Mobile swipe hint */}
          <div className="sm:hidden text-[11px] text-amber-300/90 font-medium flex items-center gap-1.5 px-1 py-1">
            <span>👉 Deslize horizontalmente para ver todos os 9 quesitos</span>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[700px] text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="py-2 px-3 sticky left-0 bg-slate-900 z-10">Escola de Samba</th>
                  {QUESITOS.map((q) => (
                    <th key={q.id} className="py-2 px-2 text-center" title={q.name}>
                      {q.shortName}
                    </th>
                  ))}
                  <th className="py-2 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {standings.rankedList.map((item) => (
                  <tr
                    key={item.school.id}
                    className={`hover:bg-slate-800/40 transition ${
                      item.school.id === userSchool?.id ? 'bg-amber-500/10 font-bold' : ''
                    }`}
                  >
                    <td className="py-2 px-3 flex items-center gap-2 text-white sticky left-0 bg-slate-900/95 z-10 shadow-sm">
                      <span className="w-5 font-mono text-slate-400">{item.rank}º</span>
                      <span className="truncate max-w-[130px] sm:max-w-none">{cleanSchoolName(item.school)}</span>
                    </td>
                    {QUESITOS.map((q) => {
                      const qSum = item.quesitoSums[q.id] || 0;
                      const scores = item.scores.scoresByQuesito[q.id];
                      const minScore = Math.min(...scores);
                      const minIdx = scores.indexOf(minScore);
                      const qIdx = QUESITOS.findIndex((x) => x.id === q.id);
                      const isQuesitoCompleted = qIdx < currentQuesitoIdx || isCompleted;

                      return (
                        <td key={q.id} className="py-2 px-2 text-center font-mono">
                          <div
                            className={
                              !hasStarted || qSum === 0
                                ? 'text-slate-600'
                                : qSum >= 30.0
                                ? 'text-amber-400 font-bold'
                                : qSum >= 29.8
                                ? 'text-emerald-400'
                                : 'text-slate-300'
                            }
                          >
                            {!hasStarted || qSum === 0 ? '-' : qSum.toFixed(1)}
                          </div>
                          {hasStarted && isQuesitoCompleted && (
                            <div
                              className="flex items-center justify-center gap-0.5 text-[8px] mt-0.5"
                              title={`Notas: ${scores
                                .map((s, idx) => (idx === minIdx ? `${s.toFixed(1)} (desc.)` : s.toFixed(1)))
                                .join(' | ')}`}
                            >
                              {scores.map((sc, scIdx) => (
                                <span
                                  key={scIdx}
                                  className={
                                    scIdx === minIdx
                                      ? 'text-rose-400 line-through opacity-70 font-semibold'
                                      : 'text-slate-400'
                                  }
                                >
                                  {sc.toFixed(1)}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>
                      );
                    })}
                    <td className="py-2 px-3 text-right font-mono font-black text-amber-400 text-sm">
                      {!hasStarted ? '0.0' : item.currentScore.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Real-time Standings Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">
              Classificação em Tempo Real •{' '}
              {selectedDivision === 'especial'
                ? 'Grupo Especial'
                : selectedDivision === 'ouro'
                ? 'Série Ouro'
                : selectedDivision === 'prata'
                ? 'Série Prata'
                : selectedDivision === 'bronze'
                ? 'Série Bronze'
                : 'Grupo de Avaliação'}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Campeã
            </span>
            {selectedDivision === 'especial' && (
              <>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400" /> Desfile das Campeãs (G6)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Rebaixamento p/ Série Ouro (12º)
                </span>
                <span className="text-[11px] text-amber-300">
                  • Grupo Especial {currentYear}: {especialSchools.length} escolas
                </span>
              </>
            )}
            {selectedDivision === 'ouro' && (
              <>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Acesso ao Grupo Especial (1º)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Rebaixamento p/ Série Prata (Últimos 2)
                </span>
                <span className="text-[11px] text-amber-300">
                  • Série Ouro {currentYear}: {ouroSchools.length} escolas {ouroSchools.length > 14 ? '(ajustando até 14)' : '(estabilizada em 14)'}
                </span>
              </>
            )}
            {selectedDivision === 'prata' && (
              <>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Acesso à Série Ouro ({ouroSchools.length <= 14 ? '1º e 2º colocados' : '1º colocado'})
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Rebaixamento p/ Série Bronze ({prataSchools.length > 16 ? '4 últimas colocadas' : prataSchools.length === 15 ? '2 últimas colocadas (Ajuste para 16 escolas)' : '3 últimas colocadas'})
                </span>
                <span className="text-[11px] text-amber-300">
                  • Série Prata {currentYear}: {prataSchools.length} escolas {prataSchools.length > 16 ? '(transição até 16 escolas)' : prataSchools.length === 15 ? '(ano de transição para 16 escolas)' : '(estabilizada em 16)'}
                </span>
              </>
            )}
            {selectedDivision === 'bronze' && (
              <>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Acesso à Série Prata ({prataSchools.length === 15 ? 'Campeã e Vice (2 sobem)' : prataSchools.length > 16 ? 'Apenas a Campeã' : 'Top 3 sobem'})
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Rebaixamento p/ Grupo de Avaliação ({bronzeSchools.length > 18 ? '4 últimas colocadas' : '3 últimas colocadas'})
                </span>
                <span className="text-[11px] text-amber-300">
                  • Série Bronze {currentYear}: {bronzeSchools.length} escolas {bronzeSchools.length > 18 ? '(ajuste até 18 escolas)' : '(estabilizada em 18)'}
                </span>
              </>
            )}
            {selectedDivision === 'avaliacao' && (
              <>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Acesso à Série Bronze ({bronzeSchools.length > 18 ? 'Campeã e Vice (2 vagas)' : 'Top 3 sobem (3 vagas)'})
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400" /> Processo de Afastamento (Últimas 2 com risco de suspensão por min. 1 ano)
                </span>
                <span className="text-[11px] text-amber-300">
                  • Grupo de Avaliação {currentYear}: {avaliacaoSchools.length} escolas (máx 20)
                </span>
              </>
            )}
          </div>
        </div>

        {/* Table Rows */}
        <div className="space-y-2">
          {standings.rankedList.map((item, idx) => {
            const isUser = item.school.id === userSchool?.id;
            const isChampion = hasStarted && item.rank === 1;
            const isG6 = hasStarted && selectedDivision === 'especial' && item.rank <= 6 && item.rank > 1;
            const isRelegatedEspecial = hasStarted && selectedDivision === 'especial' && item.rank === standings.rankedList.length;
            const isPromotedOuro = hasStarted && selectedDivision === 'ouro' && item.rank === 1;
            const isRelegatedOuro = hasStarted && selectedDivision === 'ouro' && item.rank > standings.rankedList.length - 2;
            const isPromotedPrata =
              hasStarted &&
              selectedDivision === 'prata' &&
              (item.rank === 1 || (ouroSchools.length <= 14 && item.rank === 2));
            const prataRelegatedCount = prataSchools.length > 16 ? 4 : prataSchools.length === 15 ? 2 : 3;
            const isRelegatedPrata =
              hasStarted &&
              selectedDivision === 'prata' &&
              item.rank > standings.rankedList.length - prataRelegatedCount;
            const bronzePromotedCount = prataSchools.length === 15 ? 2 : prataSchools.length > 16 ? 1 : 3;
            const isPromotedBronze =
              hasStarted &&
              selectedDivision === 'bronze' &&
              item.rank <= bronzePromotedCount;
            const netFromPrata = prataRelegatedCount - bronzePromotedCount;
            const bronzeRelegatedCount =
              bronzeSchools.length > 18
                ? netFromPrata + 2 + Math.min(2, bronzeSchools.length - 18)
                : 3 + netFromPrata;
            const isRelegatedBronze =
              hasStarted &&
              selectedDivision === 'bronze' &&
              item.rank > standings.rankedList.length - bronzeRelegatedCount;

            const avaliacaoPromotedCount = bronzeSchools.length > 18 ? 2 : 3;
            const isPromotedAvaliacao =
              hasStarted &&
              selectedDivision === 'avaliacao' &&
              item.rank <= avaliacaoPromotedCount;
            const neededAfastadas = Math.max(2, (avaliacaoSchools.length - avaliacaoPromotedCount + bronzeRelegatedCount + 1) - 20);
            const isSuspendedAvaliacao =
              hasStarted &&
              selectedDivision === 'avaliacao' &&
              item.rank > standings.rankedList.length - neededAfastadas;

            // Check if tied with adjacent school to display tiebreaker button
            const prevItem = standings.rankedList[idx - 1];
            const isTiedWithPrev = hasStarted && prevItem && Math.abs(prevItem.currentScore - item.currentScore) < 0.001;

            return (
              <div
                key={item.school.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all duration-300 ${
                  isChampion && isCompleted
                    ? 'bg-amber-500/15 border-amber-500/60 shadow-lg shadow-amber-500/10'
                    : isUser
                    ? 'bg-slate-800/80 border-amber-500/40'
                    : (isPromotedOuro || isPromotedPrata || isPromotedBronze || isPromotedAvaliacao)
                    ? isCompleted
                      ? 'bg-emerald-950/30 border-emerald-500/60 shadow-md shadow-emerald-950/50'
                      : 'bg-emerald-950/15 border-emerald-500/30'
                    : isRelegatedEspecial || isRelegatedOuro || isRelegatedPrata || isRelegatedBronze
                    ? isCompleted
                      ? 'bg-rose-950/30 border-rose-600/60 shadow-md shadow-rose-950/50'
                      : 'bg-rose-950/15 border-rose-900/40'
                    : isSuspendedAvaliacao
                    ? isCompleted
                      ? 'bg-purple-950/30 border-purple-700/60 shadow-md shadow-purple-950/50'
                      : 'bg-purple-950/15 border-purple-900/40'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Left: Rank, Badge & School Name */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs font-mono shadow ${
                      !hasStarted
                        ? 'bg-slate-800 text-slate-400'
                        : isChampion
                        ? 'bg-amber-400 text-slate-950'
                        : isPromotedOuro || isPromotedPrata || isPromotedBronze || isPromotedAvaliacao
                        ? 'bg-emerald-500 text-slate-950'
                        : isRelegatedEspecial || isRelegatedOuro || isRelegatedPrata || isRelegatedBronze
                        ? 'bg-rose-600 text-white'
                        : isSuspendedAvaliacao
                        ? 'bg-purple-700 text-white'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.rank}º
                  </div>

                  <div
                    className="w-4 h-4 rounded-full border flex-shrink-0"
                    style={{
                      backgroundColor: item.school.colors.primary,
                      borderColor: item.school.colors.border || '#fff'
                    }}
                  />

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm truncate">
                        {cleanSchoolName(item.school)}
                      </span>

                      {isUser && (
                        <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-amber-500 text-slate-950">
                          Sua Escola
                        </span>
                      )}

                      {isChampion && isCompleted && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 flex items-center gap-1 shadow">
                          <Trophy className="w-3 h-3" /> CAMPEÃ!
                        </span>
                      )}

                      {isPromotedOuro && (
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow ${
                            isCompleted
                              ? 'bg-emerald-500 text-slate-950 animate-pulse'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          }`}
                        >
                          <ArrowUpCircle className="w-3 h-3" />
                          <span>{isCompleted ? 'SOBE PARA O ESPECIAL!' : 'Zona de Acesso ao Especial'}</span>
                        </span>
                      )}

                      {isPromotedPrata && (
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow ${
                            isCompleted
                              ? 'bg-emerald-500 text-slate-950 animate-pulse'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          }`}
                        >
                          <ArrowUpCircle className="w-3 h-3" />
                          <span>{isCompleted ? 'SOBE PARA A SÉRIE OURO!' : 'Zona de Acesso à Série Ouro'}</span>
                        </span>
                      )}

                      {isPromotedBronze && (
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow ${
                            isCompleted
                              ? 'bg-emerald-500 text-slate-950 animate-pulse'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          }`}
                        >
                          <ArrowUpCircle className="w-3 h-3" />
                          <span>{isCompleted ? 'SOBE PARA A SÉRIE PRATA!' : 'Zona de Acesso à Série Prata'}</span>
                        </span>
                      )}

                      {isG6 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          G6 Campeãs
                        </span>
                      )}

                      {isRelegatedEspecial && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                            isCompleted
                              ? 'bg-rose-600 text-white font-black shadow'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          }`}
                        >
                          <ArrowDownCircle className="w-3 h-3" />
                          <span>{isCompleted ? 'REBAIXADA P/ SÉRIE OURO' : 'Zona de Rebaixamento'}</span>
                        </span>
                      )}

                      {isRelegatedOuro && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                            isCompleted
                              ? 'bg-rose-600 text-white font-black shadow'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          }`}
                        >
                          <ArrowDownCircle className="w-3 h-3" />
                          <span>{isCompleted ? 'REBAIXADA P/ SÉRIE PRATA' : 'Zona de Rebaixamento'}</span>
                        </span>
                      )}

                      {isRelegatedPrata && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                            isCompleted
                              ? 'bg-rose-600 text-white font-black shadow'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          }`}
                        >
                          <ArrowDownCircle className="w-3 h-3" />
                          <span>{isCompleted ? 'REBAIXADA P/ SÉRIE BRONZE' : 'Zona de Rebaixamento'}</span>
                        </span>
                      )}

                      {isRelegatedBronze && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                            isCompleted
                              ? 'bg-rose-700 text-rose-100 font-black shadow'
                              : 'bg-rose-700/30 text-rose-300 border border-rose-600/40'
                          }`}
                        >
                          <ArrowDownCircle className="w-3 h-3" />
                          <span>{isCompleted ? 'REBAIXADA P/ GRUPO DE AVALIAÇÃO' : 'Zona de Rebaixamento'}</span>
                        </span>
                      )}

                      {isPromotedAvaliacao && (
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow ${
                            isCompleted
                              ? 'bg-emerald-500 text-slate-950 animate-pulse'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          }`}
                        >
                          <ArrowUpCircle className="w-3 h-3" />
                          <span>{isCompleted ? 'SOBE PARA A SÉRIE BRONZE!' : 'Zona de Acesso à Série Bronze'}</span>
                        </span>
                      )}

                      {isSuspendedAvaliacao && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                            isCompleted
                              ? 'bg-purple-800 text-purple-100 font-black shadow'
                              : 'bg-purple-700/30 text-purple-300 border border-purple-600/40'
                          }`}
                        >
                          <AlertTriangle className="w-3 h-3" />
                          <span>{isCompleted ? 'PROCESSO DE AFASTAMENTO (MÍN. 1 ANO)' : 'Risco de Afastamento'}</span>
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-400 italic truncate">
                      "{item.school.nickname}" • Enredo: {item.school.currentEnredo?.title}
                    </div>

                    {/* Tiebreaker Note & Audit Button */}
                    {hasStarted && item.tiebreakerNote && (
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-[10px] font-semibold text-amber-300/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          ⚖️ {item.tiebreakerNote}
                        </span>
                        {prevItem && isTiedWithPrev && (
                          <button
                            onClick={() => {
                              setTiebreakerModalData({
                                isOpen: true,
                                schoolA: prevItem.school,
                                schoolB: item.school,
                                scoresA: prevItem.scores.scoresByQuesito,
                                scoresB: item.scores.scoresByQuesito,
                                totalA: prevItem.currentScore,
                                totalB: item.currentScore
                              });
                            }}
                            className="text-[10px] text-amber-400 hover:underline font-bold flex items-center gap-0.5"
                          >
                            <span>Auditar Desempate</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Total Points Counter */}
                <div className="text-right flex-shrink-0">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">
                    Pontuação Atual
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono tracking-tight">
                    {!hasStarted ? '0.0' : item.currentScore.toFixed(1)}
                  </div>
                  {hasStarted && item.scores.penalties > 0 && currentQuesitoIdx === 8 && (
                    <div className="text-[10px] text-rose-400 font-bold">
                      <div>Penalidade: -{item.scores.penalties.toFixed(1)}</div>
                      {item.scores.technicalPenalty && item.scores.technicalPenalty > 0 ? (
                        <div className="text-[9px] text-rose-300 font-normal">
                          (Regulamento: -{item.scores.technicalPenalty.toFixed(1)})
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Multi-Group Completion & Advance Year Guard */}
      {allGroupsCompleted ? (
        <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-amber-500/20 border-2 border-amber-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-4 animate-fadeIn">
          <div className="flex items-center justify-center gap-2 text-amber-400 font-black text-xl">
            <Trophy className="w-7 h-7" />
            <span>CARNAVAL {currentYear} HOMOLOGADO EM TODOS OS 5 GRUPOS!</span>
          </div>

          <p className="text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
            As notas dos jurados do <strong>Grupo Especial</strong>, <strong>Série Ouro</strong>, <strong>Série Prata</strong>, <strong>Série Bronze</strong> e <strong>Grupo de Avaliação</strong> foram todas apuradas com o descarte da menor nota de cada quesito!
            O regulamento oficial de campeãs, acessos, rebaixamentos e afastamentos foi consolidado e está pronto para o próximo ano.
          </p>

          <div className="space-y-4 pt-3 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Resultados Homologados pela LIESA, LIGA RJ e Superliga • Apuração Definitiva</span>
            </div>
            <p className="text-xs text-slate-400 max-w-xl mx-auto">
              Todas as 5 divisões tiveram suas notas oficiais lidas e proclamadas. Conforme o regulamento oficial da LIESA, o ciclo de desfiles se encerra com a celebração máxima no Sábado das Campeãs com o retorno do G6!
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {onNavigateToCampeas && (
                <button
                  onClick={onNavigateToCampeas}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-base shadow-xl shadow-amber-500/30 transition transform hover:-translate-y-0.5 flex items-center gap-3 cursor-pointer"
                >
                  <Trophy className="w-5 h-5 text-slate-950" />
                  <span>IR PARA O DESFILE DAS CAMPEÃS (SÁBADO DAS CAMPEÃS) →</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900/90 border-2 border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <h4 className="text-base font-black text-white">
                  Desfile das Campeãs Bloqueado • Apuração Parcial ({completedCount} de 5 Grupos Apurados)
                </h4>
                <p className="text-xs text-slate-400">
                  Pelo regulamento oficial da apuração, <strong>o Desfile das Campeãs e o avanço para o próximo ano só serão liberados após todos os 5 grupos serem homologados</strong> (Especial, Ouro, Prata, Bronze e Avaliação). O encerramento definitivo da temporada ocorrerá exclusivamente no Sábado das Campeãs.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-bold bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 self-start sm:self-auto">
              <span className={divisionStates.especial.isCompleted ? 'text-emerald-400' : 'text-slate-400'}>
                {divisionStates.especial.isCompleted ? '✓ Especial' : '⏳ Especial'}
              </span>
              <span className="text-slate-600">•</span>
              <span className={divisionStates.ouro.isCompleted ? 'text-emerald-400' : 'text-slate-400'}>
                {divisionStates.ouro.isCompleted ? '✓ Ouro' : '⏳ Ouro'}
              </span>
              <span className="text-slate-600">•</span>
              <span className={divisionStates.prata.isCompleted ? 'text-emerald-400' : 'text-slate-400'}>
                {divisionStates.prata.isCompleted ? '✓ Prata' : '⏳ Prata'}
              </span>
              <span className="text-slate-600">•</span>
              <span className={divisionStates.bronze.isCompleted ? 'text-emerald-400' : 'text-slate-400'}>
                {divisionStates.bronze.isCompleted ? '✓ Bronze' : '⏳ Bronze'}
              </span>
              <span className="text-slate-600">•</span>
              <span className={divisionStates.avaliacao.isCompleted ? 'text-emerald-400' : 'text-slate-400'}>
                {divisionStates.avaliacao.isCompleted ? '✓ Avaliação' : '⏳ Avaliação'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="text-amber-300 font-semibold">Grupos pendentes:</span>
              {pendingDivisions.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectDivision(p.id)}
                  className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold hover:bg-amber-500/20 transition cursor-pointer"
                  title={`Ir para apuração de ${p.name}`}
                >
                  Ir para {p.name} →
                </button>
              ))}
            </div>

            <button
              onClick={handleInstantFinishAll}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shadow"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Concluir Apuração de Todos os Grupos Restantes</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {pendingDivisions.map((pending) => (
              <button
                key={pending.id}
                onClick={() => handleSelectDivision(pending.id)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition border border-slate-700"
              >
                <span>Ir para Apuração da {pending.name}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ))}

            <button
              onClick={handleInstantFinishAll}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 transition shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Apurar Todos os Grupos Restantes Agora</span>
            </button>
          </div>
        </div>
      )}

      {/* Tiebreaker Modal */}
      {tiebreakerModalData.isOpen && tiebreakerModalData.schoolA && tiebreakerModalData.schoolB && (
        <TiebreakerModal
          isOpen={tiebreakerModalData.isOpen}
          onClose={() => setTiebreakerModalData({ isOpen: false })}
          schoolA={tiebreakerModalData.schoolA}
          schoolB={tiebreakerModalData.schoolB}
          scoresA={tiebreakerModalData.scoresA!}
          scoresB={tiebreakerModalData.scoresB!}
          totalA={tiebreakerModalData.totalA!}
          totalB={tiebreakerModalData.totalB!}
        />
      )}
    </div>
  );
};
