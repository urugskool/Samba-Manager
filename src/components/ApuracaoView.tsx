import React, { useState, useEffect, useRef } from 'react';
import {
  School,
  DivisionId,
  SchoolParadeScores,
  QuesitoId,
  DivisionResult
} from '../types/carnaval';
import { QUESITOS } from '../data/carnavalData';
import { SimulationEngine, TIEBREAKER_QUESITO_ORDER } from '../services/simulationEngine';
import { soundService } from '../services/soundService';
import { TiebreakerModal } from './TiebreakerModal';
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
  especialScores: SchoolParadeScores[];
  ouroScores: SchoolParadeScores[];
  prataScores: SchoolParadeScores[];
  bronzeScores: SchoolParadeScores[];
  userSchool: School | null;
  onAdvanceYear: (
    especialResult: DivisionResult,
    ouroResult: DivisionResult,
    prataResult: DivisionResult,
    bronzeResult: DivisionResult
  ) => void;
  onSimulateNewScores: () => void;
  allParadesCompleted?: boolean;
  completedParadeCount?: number;
  totalParadeCount?: number;
  onNavigateToDesfile?: () => void;
  onSimulateAllParades?: () => void;
}

export const ApuracaoView: React.FC<ApuracaoViewProps> = ({
  currentYear,
  especialSchools,
  ouroSchools,
  prataSchools,
  bronzeSchools,
  especialScores,
  ouroScores,
  prataScores,
  bronzeScores,
  userSchool,
  onAdvanceYear,
  onSimulateNewScores,
  allParadesCompleted = true,
  completedParadeCount = 0,
  totalParadeCount = 75,
  onNavigateToDesfile,
  onSimulateAllParades
}) => {
  const [selectedDivision, setSelectedDivision] = useState<DivisionId>('especial');
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

  // Separate playback & completion state per division
  const [divisionStates, setDivisionStates] = useState<
    Record<DivisionId, { hasStarted: boolean; quesitoIdx: number; judgeIdx: number; schoolIdx: number; isCompleted: boolean }>
  >({
    especial: { hasStarted: false, quesitoIdx: 0, judgeIdx: 0, schoolIdx: 0, isCompleted: false },
    ouro: { hasStarted: false, quesitoIdx: 0, judgeIdx: 0, schoolIdx: 0, isCompleted: false },
    prata: { hasStarted: false, quesitoIdx: 0, judgeIdx: 0, schoolIdx: 0, isCompleted: false },
    bronze: { hasStarted: false, quesitoIdx: 0, judgeIdx: 0, schoolIdx: 0, isCompleted: false }
  });

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
    divisionStates.bronze.isCompleted;

  const completedCount =
    (divisionStates.especial.isCompleted ? 1 : 0) +
    (divisionStates.ouro.isCompleted ? 1 : 0) +
    (divisionStates.prata.isCompleted ? 1 : 0) +
    (divisionStates.bronze.isCompleted ? 1 : 0);

  const pendingDivisions: { id: DivisionId; name: string }[] = [];
  if (!divisionStates.especial.isCompleted) pendingDivisions.push({ id: 'especial', name: 'Grupo Especial' });
  if (!divisionStates.ouro.isCompleted) pendingDivisions.push({ id: 'ouro', name: 'Série Ouro' });
  if (!divisionStates.prata.isCompleted) pendingDivisions.push({ id: 'prata', name: 'Série Prata' });
  if (!divisionStates.bronze.isCompleted) pendingDivisions.push({ id: 'bronze', name: 'Série Bronze' });

  const schools =
    selectedDivision === 'especial'
      ? especialSchools
      : selectedDivision === 'ouro'
      ? ouroSchools
      : selectedDivision === 'prata'
      ? prataSchools
      : bronzeSchools;

  const paradeScores =
    selectedDivision === 'especial'
      ? especialScores
      : selectedDivision === 'ouro'
      ? ouroScores
      : selectedDivision === 'prata'
      ? prataScores
      : bronzeScores;

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
        soundService.announceScore(
          nextSchool.shortName,
          currentQuesito.name,
          currentJudgeIdx + 1,
          scoreValue
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
          soundService.announceScore(
            firstSchool.shortName,
            currentQuesito.name,
            nextJudgeIdx + 1,
            qScores[nextJudgeIdx]
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
      prata: { hasStarted: true, quesitoIdx: 8, judgeIdx: 3, schoolIdx: prataSchools.length - 1, isCompleted: true },
      bronze: { hasStarted: true, quesitoIdx: 8, judgeIdx: 3, schoolIdx: bronzeSchools.length - 1, isCompleted: true }
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

  const handleRestartApuracao = () => {
    updateCurrentDivision((prev) => ({
      ...prev,
      hasStarted: false,
      quesitoIdx: 0,
      judgeIdx: 0,
      schoolIdx: 0,
      isCompleted: false
    }));
    setIsPlaying(false);
  };

  const handleSelectDivision = (div: DivisionId) => {
    setIsPlaying(false);
    setSelectedDivision(div);
  };

  const handleAdvanceYearClick = () => {
    // Strictly prevent skipping before all groups are completed
    if (!allGroupsCompleted) {
      return;
    }

    // Calculate final results for all 4 divisions
    const espResult = SimulationEngine.finalizeSeasonDivision(
      'especial',
      currentYear,
      especialSchools,
      especialScores
    );

    const ouroResult = SimulationEngine.finalizeSeasonDivision(
      'ouro',
      currentYear,
      ouroSchools,
      ouroScores,
      ouroSchools.length
    );

    const prataResult = SimulationEngine.finalizeSeasonDivision(
      'prata',
      currentYear,
      prataSchools,
      prataScores,
      ouroSchools.length
    );

    const bronzeResult = SimulationEngine.finalizeSeasonDivision(
      'bronze',
      currentYear,
      bronzeSchools,
      bronzeScores,
      0
    );

    onAdvanceYear(espResult, ouroResult, prataResult, bronzeResult);
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
            Leitura das Notas dos 36 Jurados
          </h2>
          <p className="text-xs text-slate-400">
            9 quesitos oficiais com 4 jurados cada. Soma de todos os quesitos define a campeã, acesso e rebaixamento.
          </p>
        </div>

        {/* Division Selector Tabs with completion status */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => handleSelectDivision('especial')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
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

          <button
            onClick={() => handleSelectDivision('ouro')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
              selectedDivision === 'ouro'
                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Série Ouro</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                divisionStates.ouro.isCompleted
                  ? 'bg-emerald-500 text-slate-950 ring-1 ring-emerald-400'
                  : !divisionStates.ouro.hasStarted
                  ? selectedDivision === 'ouro'
                    ? 'bg-blue-900/60 text-white'
                    : 'bg-slate-900 text-slate-400'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              {divisionStates.ouro.isCompleted
                ? '✓ Apurado'
                : !divisionStates.ouro.hasStarted
                ? `${ouroSchools.length} escolas`
                : 'Em leitura'}
            </span>
          </button>

          <button
            onClick={() => handleSelectDivision('prata')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
              selectedDivision === 'prata'
                ? 'bg-slate-300 text-slate-950 shadow-md shadow-slate-300/20 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Série Prata</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                divisionStates.prata.isCompleted
                  ? 'bg-emerald-500 text-slate-950 ring-1 ring-emerald-400'
                  : !divisionStates.prata.hasStarted
                  ? selectedDivision === 'prata'
                    ? 'bg-slate-400/60 text-slate-950'
                    : 'bg-slate-900 text-slate-400'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              {divisionStates.prata.isCompleted
                ? '✓ Apurado'
                : !divisionStates.prata.hasStarted
                ? `${prataSchools.length} escolas`
                : 'Em leitura'}
            </span>
          </button>

          <button
            onClick={() => handleSelectDivision('bronze')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
              selectedDivision === 'bronze'
                ? 'bg-amber-700 text-amber-100 shadow-md shadow-amber-800/30 font-black ring-1 ring-amber-500'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Série Bronze</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                divisionStates.bronze.isCompleted
                  ? 'bg-emerald-500 text-slate-950 ring-1 ring-emerald-400'
                  : !divisionStates.bronze.hasStarted
                  ? selectedDivision === 'bronze'
                    ? 'bg-amber-900/60 text-amber-200'
                    : 'bg-slate-900 text-slate-400'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              {divisionStates.bronze.isCompleted
                ? '✓ Apurado'
                : !divisionStates.bronze.hasStarted
                ? `${bronzeSchools.length} escolas`
                : 'Em leitura'}
            </span>
          </button>
        </div>
      </div>

      {/* Reader Stage / Locutor Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 p-6 shadow-2xl">
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
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 min-w-[260px] flex items-center justify-between gap-4 shadow-inner">
            <div className="space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                {hasStarted ? 'Lendo Envelope de' : 'Status da Mesa'}
              </div>
              <div className="text-lg font-black text-white flex items-center gap-2">
                <span>{hasStarted ? (readingSchool?.name || 'Aguardando...') : 'Envelopes Lacrados'}</span>
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
        </div>

        {/* Playback & Step Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-5 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2">
            {!hasStarted ? (
              <button
                disabled={isCompleted}
                onClick={handleStartApuracao}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs transition flex items-center gap-2 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400/50 transform hover:scale-[1.02] cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Iniciar a Apuração</span>
              </button>
            ) : !isPlaying ? (
              <button
                disabled={isCompleted}
                onClick={() => setIsPlaying(true)}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-2 shadow-lg shadow-amber-500/25 disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Continuar Apuração Ao Vivo</span>
              </button>
            ) : (
              <button
                onClick={() => setIsPlaying(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center gap-2"
              >
                <Pause className="w-4 h-4" />
                <span>Pausar Leitura</span>
              </button>
            )}

            <button
              disabled={isCompleted}
              onClick={handleStepNote}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5 disabled:opacity-50"
            >
              <span>{!hasStarted ? 'Revelar 1ª Nota' : 'Próxima Nota'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              disabled={isCompleted}
              onClick={handleNextQuesito}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5 disabled:opacity-50"
            >
              <SkipForward className="w-4 h-4" />
              <span>Pular Quesito</span>
            </button>

            <button
              disabled={isCompleted}
              onClick={handleInstantFinish}
              className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-amber-300 text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-50"
              title="Apurar instantaneamente o grupo selecionado"
            >
              <FastForward className="w-4 h-4" />
              <span>Resultado Imediato ({selectedDivision === 'especial' ? 'Especial' : selectedDivision === 'ouro' ? 'Ouro' : 'Prata'})</span>
            </button>

            {!allGroupsCompleted && (
              <button
                onClick={handleInstantFinishAll}
                className="px-3.5 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 hover:bg-amber-500/30 text-amber-300 text-xs font-black transition flex items-center gap-1.5 shadow"
                title="Apurar todos os 3 grupos (Especial, Ouro e Prata) de uma só vez"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Apurar Todos os Grupos (3 em 1)</span>
              </button>
            )}

            <button
              onClick={handleRestartApuracao}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition"
              title="Reiniciar Apuração deste Grupo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
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
              <span>{showMatrix ? 'Ocultar Matriz 36' : 'Ver Matriz Completa'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full 36-Judge Matrix Modal / Drawer */}
      {showMatrix && (
        <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 shadow-2xl overflow-x-auto space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Table className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">
                Matriz Completa de Notas: 9 Quesitos x 4 Jurados (36 Avaliações)
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Total Máximo Possível: 360,0 pts
            </span>
          </div>

          <div className="overflow-x-auto min-w-[750px]">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="py-2 px-3">Escola de Samba</th>
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
                    <td className="py-2 px-3 flex items-center gap-2 text-white">
                      <span className="w-5 font-mono text-slate-400">{item.rank}º</span>
                      <span>{item.school.name}</span>
                    </td>
                    {QUESITOS.map((q) => {
                      const qSum = item.quesitoSums[q.id] || 0;
                      return (
                        <td key={q.id} className="py-2 px-2 text-center font-mono">
                          <span
                            className={
                              !hasStarted || qSum === 0
                                ? 'text-slate-600'
                                : qSum >= 40.0
                                ? 'text-amber-400 font-bold'
                                : qSum >= 39.8
                                ? 'text-emerald-400'
                                : 'text-slate-300'
                            }
                          >
                            {!hasStarted || qSum === 0 ? '-' : qSum.toFixed(1)}
                          </span>
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
                : 'Série Prata'}
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
              </>
            )}
            {selectedDivision === 'prata' && (
              <>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Acesso à Série Ouro (1º colocado{ouroSchools.length <= 14 ? ' e 2º colocado' : ''})
                </span>
                <span className="text-[11px] text-amber-300">
                  {ouroSchools.length > 14
                    ? '• Transição: 1 vaga de acesso (Série Ouro ajustando p/ 14 escolas)'
                    : '• Meta de 14 agremiações atingida: 2 vagas de acesso direto'}
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
                    : isRelegatedEspecial || isRelegatedOuro
                    ? 'bg-rose-950/20 border-rose-900/50'
                    : isPromotedPrata && isCompleted
                    ? 'bg-emerald-950/20 border-emerald-500/40'
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
                        : isPromotedOuro || isPromotedPrata
                        ? 'bg-emerald-500 text-slate-950'
                        : isRelegatedEspecial || isRelegatedOuro
                        ? 'bg-rose-600 text-white'
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
                        {item.school.name}
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

                      {isPromotedOuro && isCompleted && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 flex items-center gap-1 shadow">
                          <ArrowUpCircle className="w-3 h-3" /> SOBE PARA O ESPECIAL!
                        </span>
                      )}

                      {isPromotedPrata && isCompleted && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 flex items-center gap-1 shadow">
                          <ArrowUpCircle className="w-3 h-3" /> SOBE PARA A SÉRIE OURO!
                        </span>
                      )}

                      {isG6 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          G6 Campeãs
                        </span>
                      )}

                      {isRelegatedEspecial && isCompleted && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                          <ArrowDownCircle className="w-3 h-3" /> REBAIXADA P/ SÉRIE OURO
                        </span>
                      )}

                      {isRelegatedOuro && isCompleted && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                          <ArrowDownCircle className="w-3 h-3" /> REBAIXADA P/ SÉRIE PRATA
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
                    <div className="text-[10px] text-rose-400">
                      Penalidade: -{item.scores.penalties.toFixed(1)}
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
            <span>CARNAVAL {currentYear} HOMOLOGADO EM TODOS OS 4 GRUPOS!</span>
          </div>

          <p className="text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
            As notas dos 36 jurados do <strong>Grupo Especial</strong>, <strong>Série Ouro</strong>, <strong>Série Prata</strong> e <strong>Série Bronze</strong> foram todas apuradas!
            O regulamento oficial de campeãs, acessos e rebaixamentos foi consolidado e está pronto para o próximo ano.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={handleAdvanceYearClick}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-base shadow-xl shadow-amber-500/30 transition transform hover:-translate-y-0.5 flex items-center gap-3 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>AVANÇAR PARA O CARNAVAL {currentYear + 1}</span>
            </button>

            <button
              onClick={onSimulateNewScores}
              className="px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition"
            >
              Simular Novo Desfile Deste Ano
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900/90 border-2 border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <h4 className="text-base font-black text-white">
                  Avanço de Temporada Bloqueado • Apuração Parcial ({completedCount} de 4 Grupos Apurados)
                </h4>
                <p className="text-xs text-slate-400">
                  Pelo regulamento oficial da apuração, <strong>não é permitido pular ou avançar o ano antes de todos os 4 grupos serem apurados</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 self-start sm:self-auto">
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
            </div>
          </div>

          {pendingDivisions.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="text-amber-300 font-semibold">Grupos pendentes de leitura das notas:</span>
              {pendingDivisions.map((p) => (
                <span
                  key={p.id}
                  className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold"
                >
                  {p.name}
                </span>
              ))}
            </div>
          )}

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
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 transition shadow-lg shadow-amber-500/20"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Apurar Todos os Grupos Restantes Agora</span>
            </button>

            <button
              disabled={true}
              className="px-6 py-2.5 rounded-xl bg-slate-800/40 text-slate-500 font-bold text-xs flex items-center gap-2 cursor-not-allowed border border-slate-800"
              title="Apure todos os 3 grupos para desbloquear o avanço do ano"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Avançar para o Carnaval {currentYear + 1} (Bloqueado)</span>
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
