import React, { useState, useEffect, useRef } from 'react';
import { School, DivisionId, YearHistory } from '../types/carnaval';
import {
  CarnavalSorteio,
  DivisionSorteio,
  ParadeDay,
  SorteioSlot,
  PARADE_DAYS_ORDER
} from '../types/sorteio';
import { SorteioEngine, SorteioChoice } from '../services/sorteioEngine';
import { soundService } from '../services/soundService';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import {
  Shuffle,
  Dices,
  Sparkles,
  Trophy,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  Lock,
  ShieldCheck,
  Crown,
  Star,
  Info,
  SlidersHorizontal,
  Play,
  Pause,
  FastForward,
  Radio,
  Volume2,
  VolumeX,
  Megaphone,
  Sparkle
} from 'lucide-react';

interface SorteioOrdemViewProps {
  currentYear: number;
  userSchool: School | null;
  schools: School[];
  history: YearHistory[];
  sorteio: CarnavalSorteio;
  completedParadesCount: number;
  onUpdateSorteio: (updatedSorteio: CarnavalSorteio) => void;
  onNavigateToDesfile: () => void;
}

export const SorteioOrdemView: React.FC<SorteioOrdemViewProps> = ({
  currentYear,
  userSchool,
  schools,
  history,
  sorteio,
  completedParadesCount,
  onUpdateSorteio,
  onNavigateToDesfile
}) => {
  const [selectedTab, setSelectedTab] = useState<'all' | DivisionId>('especial');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [drawingDivision, setDrawingDivision] = useState<string | null>(null);

  // Live stage ceremony states
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [autoSpeed, setAutoSpeed] = useState<number>(1); // 1x, 2x, 4x
  const [revealedBallSlot, setRevealedBallSlot] = useState<SorteioSlot | null>(null);
  const [announcementFeed, setAnnouncementFeed] = useState<string[]>([]);
  const [soundMuted, setSoundMuted] = useState<boolean>(false);

  // Vice-champion modal choice
  const [showChoiceModal, setShowChoiceModal] = useState<boolean>(false);
  const [choiceDay, setChoiceDay] = useState<ParadeDay>('sabado');
  const [choiceOrder, setChoiceOrder] = useState<number>(7);

  // Cached planned sequence per division to guarantee authentic sequential stage steps
  const plannedSequenceRef = useRef<Record<string, SorteioSlot[]>>({});

  const prevHistory = SorteioEngine.getPreviousYearHistory(currentYear, history);

  // Verificar se a escola do usuário é a Vice-Campeã da Série Ouro
  const isUserOuroVice = Boolean(
    userSchool &&
    userSchool.division === 'ouro' &&
    prevHistory?.ouroStandings &&
    prevHistory.ouroStandings.length >= 2 &&
    (prevHistory.ouroStandings[1]?.schoolId === userSchool.id ||
      prevHistory.ouroStandings[1]?.schoolName === userSchool.name)
  );

  // Obter ou gerar a sequência planejada para uma divisão
  const getPlannedSequence = (div: DivisionId): SorteioSlot[] => {
    const key = `${div}_${currentYear}_${choiceDay}_${choiceOrder}`;
    if (!plannedSequenceRef.current[key]) {
      const choice: SorteioChoice | undefined = isUserOuroVice && userSchool
        ? { schoolId: userSchool.id, day: choiceDay, order: choiceOrder }
        : undefined;
      plannedSequenceRef.current[key] = SorteioEngine.getCeremonySequenceForDivision(
        div,
        schools,
        currentYear,
        history,
        choice
      );
    }
    return plannedSequenceRef.current[key];
  };

  // Identificar qual divisão atual para ações no palco
  const activeDiv: DivisionId = selectedTab === 'all' ? 'especial' : selectedTab;
  const activeDivSorteio = sorteio.divisions[activeDiv] || { division: activeDiv, isCompleted: false, slots: [] };
  const currentPlannedSequence = getPlannedSequence(activeDiv);

  // Próximo slot a ser revelado no palco
  const nextSlotIndex = activeDivSorteio.slots.length;
  const nextPlannedSlot: SorteioSlot | undefined = currentPlannedSequence[nextSlotIndex];
  const nextSchool: School | undefined = nextPlannedSlot
    ? schools.find((s) => s.id === nextPlannedSlot.schoolId)
    : undefined;

  const isUserNext = Boolean(userSchool && nextPlannedSlot && userSchool.id === nextPlannedSlot.schoolId);

  // Total de escolas sorteadas no Carnaval inteiro
  const totalDrawnCount = Object.values(sorteio.divisions).reduce(
    (acc, div) => acc + (div.slots?.length || 0),
    0
  );
  const totalCarnavalSchools = schools.filter((s) => !s.isInactive && !s.inactive).length;

  // Calcular horários estimados
  const getEstimatedTime = (division: DivisionId, order: number) => {
    const baseHour = division === 'especial' || division === 'ouro' ? 21 : 19;
    const totalMinutes = (order - 1) * (division === 'especial' ? 75 : division === 'ouro' ? 55 : 40);
    const hour = (baseHour + Math.floor(totalMinutes / 60)) % 24;
    const minute = totalMinutes % 60;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}h`;
  };

  // Simular passo a passo (escola sobe ao palco e tira bolinha)
  const handleDrawNextSchool = () => {
    if (!nextPlannedSlot || isDrawing) return;

    // Bloqueio regulamentar: divisão anterior deve ter sido concluída
    const unlockCheck = SorteioEngine.isDivisionSorteioUnlocked(activeDiv, sorteio);
    if (!unlockCheck.unlocked) {
      if (!soundMuted) soundService.playBuzzer();
      return;
    }

    setIsDrawing(true);
    setDrawingDivision(activeDiv);

    if (!soundMuted) {
      soundService.playGlobeSpin();
      soundService.playDrumRoll(0.6);
    }

    const delay = Math.max(350, Math.floor(900 / autoSpeed));

    setTimeout(() => {
      const updatedSlots = [...activeDivSorteio.slots, nextPlannedSlot];
      const isDivNowCompleted = updatedSlots.length >= currentPlannedSequence.length;

      const updatedDiv: DivisionSorteio = {
        division: activeDiv,
        isCompleted: isDivNowCompleted,
        slots: updatedSlots,
        drawDate: `Sorteio Oficial ${activeDiv.toUpperCase()} ${currentYear}`
      };

      const updatedDivisions = {
        ...sorteio.divisions,
        [activeDiv]: updatedDiv
      };

      const allCompleted = Object.values(updatedDivisions).every((d) => d.isCompleted);

      onUpdateSorteio({
        year: currentYear,
        isCompleted: allCompleted,
        divisions: updatedDivisions
      });

      // Ativar animação de revelação da bola
      setRevealedBallSlot(nextPlannedSlot);
      if (!soundMuted) {
        soundService.playBallReveal();
      }

      // Adicionar ao feed da cerimônia
      const cleanName = nextSchool ? cleanSchoolName(nextSchool) : nextPlannedSlot.schoolName;
      let feedMsg = `${cleanName}: ${nextPlannedSlot.dayLabel.split(' ')[0]}, ${nextPlannedSlot.order}ª escola (${getEstimatedTime(nextPlannedSlot.division, nextPlannedSlot.order)})`;
      if (nextPlannedSlot.isFixedRule) {
        feedMsg = `📜 [Abertura Fixa] ${feedMsg}`;
      } else if (nextPlannedSlot.chosenBySchool) {
        feedMsg = `👑 [Escolha da Vice] ${feedMsg}`;
      } else {
        feedMsg = `🎰 [Bolinha #${nextPlannedSlot.order}] ${feedMsg}`;
      }

      setAnnouncementFeed((prev) => [feedMsg, ...prev.slice(0, 19)]);

      setIsDrawing(false);
      setDrawingDivision(null);

      if (isDivNowCompleted) {
        setIsAutoPlaying(false);
        if (!soundMuted) {
          soundService.playVictory();
        }
      }
    }, delay);
  };

  // Simular todo o restante do grupo atual de uma vez
  const handleDrawWholeGroup = (division: DivisionId) => {
    // Bloqueio regulamentar: divisão anterior deve ter sido concluída
    const unlockCheck = SorteioEngine.isDivisionSorteioUnlocked(division, sorteio);
    if (!unlockCheck.unlocked) {
      if (!soundMuted) soundService.playBuzzer();
      return;
    }

    setIsDrawing(true);
    setDrawingDivision(division);
    setIsAutoPlaying(false);

    if (!soundMuted) {
      soundService.playGavel();
    }

    setTimeout(() => {
      const seq = getPlannedSequence(division);
      const isSchoolActive = (s: School) => !s.isInactive && !s.inactive;
      const divSchools = schools.filter((s) => s.division === division && isSchoolActive(s));

      const choice: SorteioChoice | undefined = isUserOuroVice && userSchool
        ? { schoolId: userSchool.id, day: choiceDay, order: choiceOrder }
        : undefined;

      let divSorteio: DivisionSorteio;
      if (division === 'especial') {
        divSorteio = SorteioEngine.generateEspecialSorteio(divSchools, currentYear, history);
      } else if (division === 'ouro') {
        divSorteio = SorteioEngine.generateOuroSorteio(divSchools, currentYear, history, choice);
      } else if (division === 'prata') {
        divSorteio = SorteioEngine.generatePrataSorteio(divSchools, currentYear);
      } else if (division === 'bronze') {
        divSorteio = SorteioEngine.generateBronzeSorteio(divSchools, currentYear);
      } else {
        divSorteio = SorteioEngine.generateAvaliacaoSorteio(divSchools, currentYear, history);
      }

      const updatedDivisions = {
        ...sorteio.divisions,
        [division]: divSorteio
      };

      const allCompleted = Object.values(updatedDivisions).every((d) => d.isCompleted);

      onUpdateSorteio({
        year: currentYear,
        isCompleted: allCompleted,
        divisions: updatedDivisions
      });

      setAnnouncementFeed((prev) => [
        `🏆 Sorteio completo do grupo ${division.toUpperCase()} homologado com sucesso!`,
        ...prev.slice(0, 19)
      ]);

      setIsDrawing(false);
      setDrawingDivision(null);
      if (!soundMuted) {
        soundService.playVictory();
      }
    }, 800);
  };

  // Simular todos os 5 grupos de uma vez (Avançar Ciclo Geral)
  const handleDrawAllGroups = () => {
    setIsDrawing(true);
    setDrawingDivision('all');
    setIsAutoPlaying(false);

    if (!soundMuted) {
      soundService.playGavel();
    }

    setTimeout(() => {
      const choice: SorteioChoice | undefined = isUserOuroVice && userSchool
        ? { schoolId: userSchool.id, day: choiceDay, order: choiceOrder }
        : undefined;

      const fullSorteio = SorteioEngine.generateCompleteSorteio(schools, history, currentYear, choice);
      onUpdateSorteio(fullSorteio);

      setAnnouncementFeed((prev) => [
        `🎉 CERIMÔNIA OFICIAL CONCLUÍDA: Todos os 5 grupos sorteados! A Passarela do Samba agora está aberta!`,
        ...prev.slice(0, 19)
      ]);

      setIsDrawing(false);
      setDrawingDivision(null);
      if (!soundMuted) {
        soundService.playVictory();
      }
    }, 1200);
  };

  // Contagem dinâmica e precisa de agremiações por grupo
  const isSchoolActive = (s: School) => !s.isInactive && !s.inactive;
  const especialTotal = schools.filter((s) => s.division === 'especial' && isSchoolActive(s)).length;
  const ouroTotal = schools.filter((s) => s.division === 'ouro' && isSchoolActive(s)).length;
  const prataTotal = schools.filter((s) => s.division === 'prata' && isSchoolActive(s)).length;
  const bronzeTotal = schools.filter((s) => s.division === 'bronze' && isSchoolActive(s)).length;
  const avaliacaoTotal = schools.filter((s) => s.division === 'avaliacao' && isSchoolActive(s)).length;

  // Loop de Autoplay (Transmissão ao Vivo Passo a Passo)
  useEffect(() => {
    if (!isAutoPlaying) return;

    if (!nextPlannedSlot || activeDivSorteio.isCompleted) {
      setIsAutoPlaying(false);
      return;
    }

    const intervalTime = Math.floor(1800 / autoSpeed);
    const timer = setTimeout(() => {
      handleDrawNextSchool();
    }, intervalTime);

    return () => clearTimeout(timer);
  }, [isAutoPlaying, nextPlannedSlot, activeDivSorteio.slots.length, autoSpeed]);

  // Lista de todos os slots de todas as divisões
  const allSlots: SorteioSlot[] = [];
  Object.values(sorteio.divisions).forEach((d) => {
    if (d?.slots) {
      allSlots.push(...d.slots);
    }
  });

  // Próxima divisão pendente para sugerir ao jogador na ordem oficial
  const divisionOrderList: DivisionId[] = SorteioEngine.SORTEIO_ORDER;
  const nextPendingDivision = divisionOrderList.find((d) => !sorteio.divisions[d]?.isCompleted);

  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      {/* Header Oficial do Evento de Sorteio */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 shadow-sm">
                <Dices className="w-3.5 h-3.5 text-amber-400" />
                SORTEIO OFICIAL DA ORDEM DE DESFILE • CARNAVAL {currentYear}
              </span>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-red-400 animate-pulse" />
                {userSchool ? (
                  <span>Modo Dirigente: <strong>{userSchool.shortName}</strong></span>
                ) : (
                  <span>Modo Observador / Sambista</span>
                )}
              </span>
              <span className="text-[11px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                {totalDrawnCount}/{totalCarnavalSchools} Escolas Sorteadas
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Cerimônia ao Vivo: Ordem Oficial na Sapucaí & Intendente
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              O evento que paralisa o mundo do samba! As agremiações sobem ao palco da Cidade do Samba para homologar suas
              aberturas estatutárias ou rodar o globo oficial e retirar a bolinha com a sua posição e horário de desfile.
              A Passarela do Samba só será liberada após a conclusão da passagem do tempo desta cerimônia.
            </p>
          </div>

          {/* Action Buttons Top */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {sorteio.isCompleted ? (
              <button
                onClick={onNavigateToDesfile}
                className="px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2.5 cursor-pointer transition shadow-xl shadow-amber-500/30 ring-2 ring-amber-400 animate-pulse"
              >
                <span>Ir para a Passarela do Samba</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleDrawAllGroups}
                  disabled={isDrawing}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 cursor-pointer transition shadow-xl shadow-amber-500/30 ring-2 ring-amber-400 disabled:opacity-50"
                >
                  <FastForward className={`w-4 h-4 ${isDrawing && drawingDivision === 'all' ? 'animate-spin' : ''}`} />
                  <span>
                    {isDrawing && drawingDivision === 'all'
                      ? 'Girando o Globo Oficial...'
                      : 'Simular Todos os Grupos (Avançar Ciclo)'}
                  </span>
                </button>
                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                  <span>Passagem do Tempo do Carnaval</span>
                  <span className="text-amber-400 font-bold">{Math.round((totalDrawnCount / Math.max(1, totalCarnavalSchools)) * 100)}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Prerrogativa Vice-Campeã Ouro Banner */}
        {isUserOuroVice && userSchool && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-300">
                  Prerrogativa Estatutária da {userSchool.shortName}
                </h4>
                <p className="text-xs text-slate-300">
                  Como Vice-Campeã da Série Ouro no ano anterior, sua agremiação tem o direito estatutário exclusivo de escolher
                  a noite ({choiceDay === 'sexta' ? 'Sexta-Feira' : 'Sábado'}) e a posição ({choiceOrder}ª a desfilar)!
                </p>
              </div>
            </div>
            {completedParadesCount === 0 && !sorteio.divisions.ouro?.isCompleted && (
              <button
                onClick={() => setShowChoiceModal(true)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow transition"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Alterar Posição Escolhida</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Tabs de Navegação entre Divisões na Ordem Oficial Estrita */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
          {/* 1º Grupo Especial (LIESA) */}
          <button
            onClick={() => {
              setSelectedTab('especial');
              setIsAutoPlaying(false);
            }}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              selectedTab === 'especial'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>1º Especial (LIESA)</span>
            {sorteio.divisions.especial?.isCompleted ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                {sorteio.divisions.especial?.slots.length || 0}/{especialTotal}
              </span>
            )}
          </button>

          {/* 2º Série Ouro (LIGA-RJ) */}
          {(() => {
            const ouroCheck = SorteioEngine.isDivisionSorteioUnlocked('ouro', sorteio);
            return (
              <button
                onClick={() => {
                  setSelectedTab('ouro');
                  setIsAutoPlaying(false);
                }}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  selectedTab === 'ouro'
                    ? 'bg-blue-500 text-white font-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={ouroCheck.unlocked ? 'Série Ouro (LIGA-RJ)' : ouroCheck.reason}
              >
                {!ouroCheck.unlocked && <Lock className="w-3.5 h-3.5 text-slate-500" />}
                <span>2º Série Ouro (LIGA-RJ)</span>
                {sorteio.divisions.ouro?.isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : !ouroCheck.unlocked ? (
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-800/80 text-slate-500">🔒 Bloq</span>
                ) : (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                    {sorteio.divisions.ouro?.slots.length || 0}/{ouroTotal}
                  </span>
                )}
              </button>
            );
          })()}

          {/* 3º Grupo de Avaliação (Superliga) */}
          {(() => {
            const avaliacaoCheck = SorteioEngine.isDivisionSorteioUnlocked('avaliacao', sorteio);
            return (
              <button
                onClick={() => {
                  setSelectedTab('avaliacao');
                  setIsAutoPlaying(false);
                }}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  selectedTab === 'avaliacao'
                    ? 'bg-purple-600 text-white font-black shadow-md ring-1 ring-purple-400'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={avaliacaoCheck.unlocked ? 'Grupo de Avaliação (Superliga)' : avaliacaoCheck.reason}
              >
                {!avaliacaoCheck.unlocked && <Lock className="w-3.5 h-3.5 text-slate-500" />}
                <span>3º Avaliação (Superliga)</span>
                {sorteio.divisions.avaliacao?.isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : !avaliacaoCheck.unlocked ? (
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-800/80 text-slate-500">🔒 Bloq</span>
                ) : (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                    {sorteio.divisions.avaliacao?.slots.length || 0}/{avaliacaoTotal}
                  </span>
                )}
              </button>
            );
          })()}

          {/* 4º Série Bronze (Superliga) */}
          {(() => {
            const bronzeCheck = SorteioEngine.isDivisionSorteioUnlocked('bronze', sorteio);
            return (
              <button
                onClick={() => {
                  setSelectedTab('bronze');
                  setIsAutoPlaying(false);
                }}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  selectedTab === 'bronze'
                    ? 'bg-amber-700 text-amber-100 font-black shadow-md ring-1 ring-amber-500'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={bronzeCheck.unlocked ? 'Série Bronze (Superliga)' : bronzeCheck.reason}
              >
                {!bronzeCheck.unlocked && <Lock className="w-3.5 h-3.5 text-slate-500" />}
                <span>4º Série Bronze (Superliga)</span>
                {sorteio.divisions.bronze?.isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : !bronzeCheck.unlocked ? (
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-800/80 text-slate-500">🔒 Bloq</span>
                ) : (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                    {sorteio.divisions.bronze?.slots.length || 0}/{bronzeTotal}
                  </span>
                )}
              </button>
            );
          })()}

          {/* 5º Série Prata (Superliga) */}
          {(() => {
            const prataCheck = SorteioEngine.isDivisionSorteioUnlocked('prata', sorteio);
            return (
              <button
                onClick={() => {
                  setSelectedTab('prata');
                  setIsAutoPlaying(false);
                }}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  selectedTab === 'prata'
                    ? 'bg-slate-300 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={prataCheck.unlocked ? 'Série Prata (Superliga)' : prataCheck.reason}
              >
                {!prataCheck.unlocked && <Lock className="w-3.5 h-3.5 text-slate-500" />}
                <span>5º Série Prata (Superliga)</span>
                {sorteio.divisions.prata?.isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : !prataCheck.unlocked ? (
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-800/80 text-slate-500">🔒 Bloq</span>
                ) : (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                    {sorteio.divisions.prata?.slots.length || 0}/{prataTotal}
                  </span>
                )}
              </button>
            );
          })()}

          {/* Visão Geral */}
          <button
            onClick={() => {
              setSelectedTab('all');
              setIsAutoPlaying(false);
            }}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              selectedTab === 'all'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Visão Geral Carnaval</span>
            {sorteio.isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />}
          </button>
        </div>

        {/* Quick Sound & Speed Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setSoundMuted(!soundMuted)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition cursor-pointer"
            title={soundMuted ? 'Ativar Efeitos Sonoros' : 'Silenciar Sons'}
          >
            {soundMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* Critérios Regulamentares Oficiais com Correção da 10ª Colocada */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-300 uppercase tracking-wider text-[11px]">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Regulamento Oficial do Sorteio da Ordem de Desfile</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-slate-400">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <span className="text-white font-bold block text-xs">Grupo Especial (LIESA)</span>
            <p className="text-[11px] leading-relaxed">
              • <strong>Domingo, Segunda e Terça de Carnaval</strong> (4 escolas por noite).
              <br />• <strong>Domingo:</strong> Campeã da Série Ouro abre a 1ª noite (1ª a desfilar).
              <br />• <strong>Segunda:</strong> 11ª colocada no último Carnaval abre a 2ª noite.
              <br />• <strong>Terça:</strong> 10ª colocada no último Carnaval abre a 3ª noite.
              <br />• Demais 9 agremiações sobem ao palco e retiram bolinha numerada do globo.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <span className="text-white font-bold block text-xs">Série Ouro (LIGA RJ)</span>
            <p className="text-[11px] leading-relaxed">
              • <strong>Sexta e Sábado de Carnaval</strong> (8 escolas por noite).
              <br />• <strong>Aberturas fixas:</strong> Promovidas da Prata ou safe anterior abrem Sexta e Sábado.
              <br />• <strong>Vice da Série Ouro:</strong> Prerrogativa estatutária de escolher dia e posição.
              <br />• Demais agremiações giram o globo e retiram suas bolinhas.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <span className="text-white font-bold block text-xs">Superliga (Prata, Bronze & Avaliação)</span>
            <p className="text-[11px] leading-relaxed">
              • <strong>Série Prata:</strong> Segunda e Terça de Carnaval (Intendente).
              <br />• <strong>Série Bronze:</strong> Sábado e Domingo de Carnaval (Intendente).
              <br />• <strong>Grupo de Avaliação:</strong> Quarta-Feira de Cinzas (escola que retorna abre a noite).
            </p>
          </div>
        </div>
      </div>

      {/* PALCO AO VIVO DA CERIMÔNIA OFICIAL (Globo da Sorte e Bolinhas) */}
      {selectedTab !== 'all' && (() => {
        const currentDivUnlock = SorteioEngine.isDivisionSorteioUnlocked(activeDiv, sorteio);
        const currentEventInfo = SorteioEngine.SORTEIO_EVENT_INFO[activeDiv];

        return (
          <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Luzes de Palco Spotlights */}
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none -mt-36" />
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none -mt-36" />

            {/* Top Stage Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800/80 relative z-10">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentDivUnlock.unlocked ? 'bg-red-400' : 'bg-slate-500'}`} />
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${currentDivUnlock.unlocked ? 'bg-red-500' : 'bg-slate-600'}`} />
                </span>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <span>{currentEventInfo.eventTitle}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${currentEventInfo.badgeBg} ${currentEventInfo.badgeText} border ${currentEventInfo.border}`}>
                      {currentEventInfo.league} • {activeDiv.toUpperCase()}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {currentEventInfo.venue} • {activeDivSorteio.isCompleted
                      ? 'Sorteio deste grupo já homologado!'
                      : !currentDivUnlock.unlocked
                      ? 'Aguardando liberação do grupo anterior'
                      : `Sorteando agremiação ${activeDivSorteio.slots.length + 1} de ${currentPlannedSequence.length}`}
                  </p>
                </div>
              </div>

              {/* Stage Controls: Step-by-Step, Auto Play, Simulate Group (apenas se liberado) */}
              <div className="flex items-center gap-2 flex-wrap">
                {currentDivUnlock.unlocked && !activeDivSorteio.isCompleted && (
                  <>
                    {/* Speed Selector */}
                    <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-1 text-[11px] font-mono">
                      <button
                        onClick={() => setAutoSpeed(1)}
                        className={`px-2 py-1 rounded-lg transition cursor-pointer ${autoSpeed === 1 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                      >
                        1x
                      </button>
                      <button
                        onClick={() => setAutoSpeed(2)}
                        className={`px-2 py-1 rounded-lg transition cursor-pointer ${autoSpeed === 2 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                      >
                        2x
                      </button>
                      <button
                        onClick={() => setAutoSpeed(4)}
                        className={`px-2 py-1 rounded-lg transition cursor-pointer ${autoSpeed === 4 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                      >
                        4x
                      </button>
                    </div>

                    {/* Auto Play / Pause */}
                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      disabled={isDrawing}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition shadow ${
                        isAutoPlaying
                          ? 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30'
                          : 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {isAutoPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pausar Auto</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 text-amber-400" />
                          <span>Auto (Ao Vivo)</span>
                        </>
                      )}
                    </button>

                    {/* Simular Todo o Grupo de Uma Vez */}
                    <button
                      onClick={() => handleDrawWholeGroup(activeDiv)}
                      disabled={isDrawing}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition shadow"
                    >
                      <FastForward className="w-3.5 h-3.5 text-amber-400" />
                      <span>Simular Grupo Inteiro</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* SE ESTIVER BLOQUEADO: TELA OFICIAL DE BLOQUEIO SEQUENCIAL */}
            {!currentDivUnlock.unlocked ? (
              <div className="py-12 px-4 sm:px-8 text-center space-y-5 relative z-10 max-w-xl mx-auto animate-fadeIn">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 flex items-center justify-center mx-auto text-amber-400 shadow-xl shadow-amber-500/10">
                  <Lock className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 inline-flex items-center gap-1.5">
                    🔒 SORTEIO BLOQUEADO • ORDEM SEQUENCIAL OBRIGATÓRIA
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Aguardando Conclusão do Sorteio do {currentDivUnlock.requiredName}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentDivUnlock.reason}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-left space-y-2.5 text-slate-400">
                  <span className="text-white font-bold block text-[11px] uppercase tracking-wider">
                    Ordem Obrigatória dos Sorteios de Carnaval:
                  </span>
                  <div className="space-y-2 font-mono text-[11px]">
                    <div className={`p-2 rounded-lg flex items-center justify-between border ${sorteio.divisions.especial?.isCompleted ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' : 'bg-slate-950 border-amber-500/30 text-amber-300'}`}>
                      <span>1º Grupo Especial (LIESA • Cidade do Samba)</span>
                      <span className="font-bold">{sorteio.divisions.especial?.isCompleted ? '✓ Concluído' : '🔴 Realizar Agora'}</span>
                    </div>
                    <div className={`p-2 rounded-lg flex items-center justify-between border ${sorteio.divisions.ouro?.isCompleted ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                      <span>2º Série Ouro (LIGA-RJ • Sapucaí)</span>
                      <span className="font-bold">{sorteio.divisions.ouro?.isCompleted ? '✓ Concluído' : 'Aguardando Especial'}</span>
                    </div>
                    <div className={`p-2 rounded-lg flex items-center justify-between border ${sorteio.divisions.avaliacao?.isCompleted ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                      <span>3º Grupo de Avaliação (Superliga)</span>
                      <span className="font-bold">{sorteio.divisions.avaliacao?.isCompleted ? '✓ Concluído' : 'Aguardando Série Ouro'}</span>
                    </div>
                    <div className={`p-2 rounded-lg flex items-center justify-between border ${sorteio.divisions.bronze?.isCompleted ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                      <span>4º Série Bronze (Superliga)</span>
                      <span className="font-bold">{sorteio.divisions.bronze?.isCompleted ? '✓ Concluído' : 'Aguardando Avaliação'}</span>
                    </div>
                    <div className={`p-2 rounded-lg flex items-center justify-between border ${sorteio.divisions.prata?.isCompleted ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                      <span>5º Série Prata (Superliga)</span>
                      <span className="font-bold">{sorteio.divisions.prata?.isCompleted ? '✓ Concluído' : 'Aguardando Bronze'}</span>
                    </div>
                  </div>
                </div>

                {currentDivUnlock.requiredDivision && (
                  <button
                    onClick={() => {
                      setSelectedTab(currentDivUnlock.requiredDivision!);
                      setIsAutoPlaying(false);
                    }}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 mx-auto cursor-pointer transition"
                  >
                    <span>IR PARA O SORTEIO DE: {currentDivUnlock.requiredName}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            ) : null}

            {/* PALCO CENTRAL (QUANDO LIBERADO) */}
            {currentDivUnlock.unlocked && !activeDivSorteio.isCompleted ? (
            <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Coluna 1: Escola Convocada ao Palco */}
              <div className="lg:col-span-4 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                    <Megaphone className="w-4 h-4 text-amber-400 animate-bounce" />
                    <span>Convocação ao Palco Oficial</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-white">
                    {nextSchool ? cleanSchoolName(nextSchool) : nextPlannedSlot?.schoolName}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {nextSchool?.neighborhood || activeDiv.toUpperCase()} • Presidente e Comissão no Palco
                  </p>
                </div>

                {/* Card da Escola no Palco */}
                {nextSchool && (
                  <div
                    className={`p-4 rounded-2xl border transition relative overflow-hidden ${
                      isUserNext
                        ? 'bg-slate-900 border-amber-400 ring-4 ring-amber-400/40 shadow-2xl shadow-amber-500/20'
                        : 'bg-slate-900/80 border-slate-800'
                    }`}
                  >
                    {isUserNext && (
                      <div className="absolute top-2 right-2">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 flex items-center gap-1 shadow">
                          <Star className="w-3 h-3 fill-slate-950" />
                          Sua Agremiação!
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg border-2"
                        style={{
                          backgroundColor: nextSchool.colors.primary,
                          color: nextSchool.colors.text,
                          borderColor: nextSchool.colors.border || '#fff'
                        }}
                      >
                        {nextSchool.shortName.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold text-amber-400 block">
                          {nextPlannedSlot?.isFixedRule
                            ? 'Abertura Estatutária Homologada'
                            : nextPlannedSlot?.chosenBySchool
                            ? 'Prerrogativa Estatutária da Vice'
                            : 'Gira o Globo da Sorte'}
                        </span>
                        <h5 className="text-sm font-bold text-white truncate">
                          {cleanSchoolName(nextSchool)}
                        </h5>
                        <p className="text-[11px] text-slate-400 truncate">
                          {nextSchool.motto || nextSchool.neighborhood || 'Tradição do Carnaval Carioca'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Botão Principal de Subir ao Palco e Pegar Bolinha */}
                <div className="pt-2">
                  <button
                    onClick={handleDrawNextSchool}
                    disabled={isDrawing}
                    className={`w-full py-4 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-3 cursor-pointer transition shadow-2xl ${
                      isUserNext
                        ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 ring-4 ring-amber-400/50 animate-pulse'
                        : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-amber-500/20'
                    }`}
                  >
                    <Dices className={`w-5 h-5 ${isDrawing ? 'animate-spin' : ''}`} />
                    <span>
                      {isDrawing
                        ? 'Girando o Globo Oficial...'
                        : isUserNext
                        ? 'Subir ao Palco e Retirar Minha Bolinha!'
                        : `Chamar ${nextSchool?.shortName || 'Escola'} ao Palco & Retirar Bolinha`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Coluna 2: O GLOBO OFICIAL & ANIMAÇÃO DA BOLINHA */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center py-4">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                  {/* Glowing Globe Ring */}
                  <div
                    className={`absolute inset-0 rounded-full border-4 border-amber-400/30 shadow-[0_0_50px_rgba(245,158,11,0.2)] transition-transform duration-700 ${
                      isDrawing ? 'scale-105 border-amber-400 shadow-[0_0_80px_rgba(245,158,11,0.5)]' : ''
                    }`}
                  />

                  {/* Globo Spherical Cage */}
                  <div
                    className={`relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-amber-950/40 via-slate-900/90 to-amber-900/30 border-2 border-amber-500/50 flex items-center justify-center shadow-inner overflow-hidden ${
                      isDrawing ? 'animate-spin' : ''
                    }`}
                    style={{ animationDuration: isDrawing ? '0.6s' : '15s' }}
                  >
                    {/* Linhas da grade do globo */}
                    <div className="absolute inset-x-0 top-1/2 h-[1px] bg-amber-400/40 -translate-y-1/2" />
                    <div className="absolute inset-y-0 left-1/2 w-[1px] bg-amber-400/40 -translate-x-1/2" />
                    <div className="absolute inset-4 rounded-full border border-amber-400/30" />
                    <div className="absolute inset-8 rounded-full border border-amber-400/20" />

                    {/* Bolinhas decorativas girando dentro do globo */}
                    <div className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-yellow-300 to-amber-600 shadow-md top-8 left-12 animate-pulse" />
                    <div className="absolute w-5 h-5 rounded-full bg-gradient-to-br from-white to-slate-400 shadow-md bottom-10 right-14" />
                    <div className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-amber-200 to-yellow-500 shadow-md bottom-12 left-16" />
                    <div className="absolute w-5 h-5 rounded-full bg-gradient-to-br from-yellow-400 to-amber-700 shadow-md top-14 right-10" />
                    <div className="absolute w-7 h-7 rounded-full bg-gradient-to-br from-amber-100 to-amber-500 shadow-lg top-20 left-20" />
                  </div>

                  {/* Base de Suporte do Globo */}
                  <div className="absolute -bottom-4 w-32 h-6 bg-gradient-to-t from-slate-950 to-amber-950 border border-amber-500/40 rounded-t-xl" />
                </div>

                <div className="text-center pt-2">
                  <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                    Globo Oficial LIESA / LIGA RJ
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Esferas com noites e posições oficiais numeradas
                  </span>
                </div>
              </div>

              {/* Coluna 3: REVELAÇÃO DA BOLINHA SORTEADA */}
              <div className="lg:col-span-3 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 block uppercase">
                    Última Bolinha Retirada:
                  </span>
                  {revealedBallSlot ? (
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-900 border-2 border-amber-400 shadow-xl space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-amber-300 px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40">
                          {revealedBallSlot.ballLabel || `Bolinha #${revealedBallSlot.order}`}
                        </span>
                        <span className="text-xs font-mono font-bold text-white flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-400" />
                          {getEstimatedTime(revealedBallSlot.division, revealedBallSlot.order)}
                        </span>
                      </div>

                      <div>
                        <h5 className="text-base font-black text-white leading-tight">
                          {revealedBallSlot.schoolName}
                        </h5>
                        <p className="text-xs font-bold text-amber-400 mt-1">
                          {revealedBallSlot.dayLabel}
                        </p>
                        <p className="text-xs text-slate-300">
                          {revealedBallSlot.order}ª Escola a entrar na pista
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 leading-snug">
                        {revealedBallSlot.reason}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-slate-950/60 border border-dashed border-slate-800 text-center space-y-2">
                      <Dices className="w-8 h-8 text-slate-600 mx-auto" />
                      <p className="text-xs text-slate-500">
                        Aguardando a primeira agremiação retirar a bolinha oficial do globo...
                      </p>
                    </div>
                  )}
                </div>

                {/* Mini feed de transmissões recentes */}
                {announcementFeed.length > 0 && (
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 text-[11px]">
                    <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">
                      Feed do Auditório
                    </span>
                    <p className="text-slate-300 truncate font-mono">
                      {announcementFeed[0]}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Grupo Homologado com Sucesso
            <div className="py-8 text-center space-y-5 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-black text-white tracking-tight">
                  Sorteio do {activeDiv.toUpperCase()} Homologado!
                </h4>
                <p className="text-sm text-slate-300 max-w-lg mx-auto">
                  Todas as {activeDivSorteio.slots.length} agremiações já retiraram suas bolinhas ou cumpriram os
                  dispositivos regulamentares da liga.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {nextPendingDivision ? (
                  <button
                    onClick={() => {
                      setSelectedTab(nextPendingDivision);
                      setIsAutoPlaying(false);
                    }}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition shadow-lg shadow-amber-500/25"
                  >
                    <span>Ir para o Sorteio da {nextPendingDivision.toUpperCase()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={onNavigateToDesfile}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition shadow-lg shadow-amber-500/25 animate-pulse"
                  >
                    <span>Ir para a Passarela do Samba (Desfiles)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        );
      })()}

      {/* TELÃO OFICIAL EM TEMPO REAL (Slots e Vagas por Noite) */}
      <div className="space-y-6">
        {selectedTab === 'all' ? (
          // VISÃO GERAL DE TODOS OS DIAS DO CARNAVAL
          PARADE_DAYS_ORDER.map((dayInfo) => {
            const daySlots = allSlots.filter((s) => s.day === dayInfo.id);
            if (daySlots.length === 0) return null;

            // Ordenar por divisão e ordem
            const sortedDaySlots = [...daySlots].sort((a, b) => {
              const divPriority: Record<DivisionId, number> = {
                ouro: 1,
                bronze: 2,
                especial: 3,
                prata: 4,
                avaliacao: 5
              };
              const pDiff = (divPriority[a.division] || 0) - (divPriority[b.division] || 0);
              if (pDiff !== 0) return pDiff;
              return a.order - b.order;
            });

            return (
              <div key={dayInfo.id} className="space-y-3 bg-slate-900/50 p-5 rounded-3xl border border-slate-800/80">
                {/* Day Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center font-black text-xs">
                      {dayInfo.order}
                    </div>
                    <div>
                      <h3 className="text-base font-black text-white flex items-center gap-2">
                        <span>{dayInfo.label}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                          {daySlots.length} Escolas Definidas
                        </span>
                      </h3>
                      <p className="text-[11px] text-slate-400">{dayInfo.dateDescription}</p>
                    </div>
                  </div>
                </div>

                {/* Slots Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {sortedDaySlots.map((slot) => {
                    const school = schools.find((s) => s.id === slot.schoolId);
                    const isUser = userSchool?.id === slot.schoolId;

                    return (
                      <div
                        key={slot.id}
                        className={`p-4 rounded-2xl border transition relative flex flex-col justify-between gap-3 ${
                          isUser
                            ? 'bg-slate-900/95 border-amber-500/60 ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/10'
                            : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-mono font-black text-amber-400 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30">
                              {slot.order}ª Escola • {slot.division.toUpperCase()}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-500" />
                              {getEstimatedTime(slot.division, slot.order)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2.5">
                            {school && (
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 shadow border"
                                style={{
                                  backgroundColor: school.colors.primary,
                                  color: school.colors.text,
                                  borderColor: school.colors.border || '#fff'
                                }}
                              >
                                {school.shortName.charAt(0)}
                              </div>
                            )}
                            <div className="min-w-0">
                              <h4 className="font-bold text-white text-xs truncate">
                                {school ? cleanSchoolName(school) : slot.schoolName}
                              </h4>
                              <span className="text-[10px] text-slate-400 block truncate">
                                {school?.neighborhood || slot.division.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between gap-1 text-[9px]">
                          <span
                            className={`truncate font-medium ${
                              slot.isFixedRule
                                ? 'text-amber-300 font-bold'
                                : slot.chosenBySchool
                                ? 'text-purple-300 font-bold'
                                : 'text-slate-400'
                            }`}
                          >
                            {slot.reason}
                          </span>
                          {isUser && (
                            <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 shrink-0">
                              Sua
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          // VISÃO DETALHADA POR DIAS DA DIVISÃO SELECIONADA
          (() => {
            // Mapear quais dias pertencem a esta divisão
            const daysForDiv: ParadeDay[] =
              selectedTab === 'especial'
                ? ['domingo', 'segunda', 'terca']
                : selectedTab === 'ouro'
                ? ['sexta', 'sabado']
                : selectedTab === 'prata'
                ? ['segunda', 'terca']
                : selectedTab === 'bronze'
                ? ['sabado', 'domingo']
                : ['quarta_cinzas'];

            return (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-white uppercase tracking-wider">
                      Telão Oficial • {selectedTab.toUpperCase()}
                    </h3>
                    <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                      {activeDivSorteio.slots.length} de {currentPlannedSequence.length} Definidas
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {activeDivSorteio.drawDate || 'Cerimônia Oficial'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {daysForDiv.map((d) => {
                    const dayMeta = PARADE_DAYS_ORDER.find((p) => p.id === d);
                    const slotsForThisDay = activeDivSorteio.slots.filter((s) => s.day === d);
                    const plannedForThisDay = currentPlannedSequence.filter((s) => s.day === d);
                    const slotsExpectedForDay = Math.max(slotsForThisDay.length, plannedForThisDay.length);

                    return (
                      <div key={d} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                          <div>
                            <h4 className="text-sm font-black text-white">
                              {dayMeta?.label || d}
                            </h4>
                            <p className="text-[11px] text-slate-400">
                              {slotsForThisDay.length} de {slotsExpectedForDay} vagas sorteadas
                            </p>
                          </div>
                          <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                            {slotsExpectedForDay} Escolas
                          </span>
                        </div>

                        {/* Slots do dia */}
                        <div className="space-y-2">
                          {Array.from({ length: slotsExpectedForDay }, (_, i) => i + 1).map((ord) => {
                            const drawnSlot = slotsForThisDay.find((s) => s.order === ord);
                            const school = drawnSlot ? schools.find((s) => s.id === drawnSlot.schoolId) : null;
                            const isUser = Boolean(userSchool && drawnSlot && userSchool.id === drawnSlot.schoolId);

                            if (drawnSlot) {
                              return (
                                <div
                                  key={`slot_${d}_${ord}`}
                                  className={`p-3 rounded-2xl border transition flex items-center justify-between gap-3 ${
                                    isUser
                                      ? 'bg-slate-900 border-amber-400 ring-2 ring-amber-400/40 shadow-md'
                                      : 'bg-slate-950/80 border-slate-800/80'
                                  }`}
                                >
                                  <div className="flex items-center gap-3 min-w-0">
                                    <span className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-black text-xs flex items-center justify-center shrink-0">
                                      {ord}º
                                    </span>
                                    {school && (
                                      <div
                                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 shadow border"
                                        style={{
                                          backgroundColor: school.colors.primary,
                                          color: school.colors.text,
                                          borderColor: school.colors.border || '#fff'
                                        }}
                                      >
                                        {school.shortName.charAt(0)}
                                      </div>
                                    )}
                                    <div className="min-w-0">
                                      <h5 className="text-xs font-bold text-white truncate">
                                        {school ? cleanSchoolName(school) : drawnSlot.schoolName}
                                      </h5>
                                      <span className="text-[10px] text-slate-400 block truncate">
                                        {drawnSlot.reason}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="text-right shrink-0">
                                    <span className="text-[10px] font-mono text-slate-400 block">
                                      {getEstimatedTime(selectedTab, ord)}
                                    </span>
                                    {isUser && (
                                      <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 inline-block">
                                        Sua
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            }

                            // Slot ainda não sorteado (vazio no globo)
                            return (
                              <div
                                key={`empty_${d}_${ord}`}
                                className="p-3 rounded-2xl border border-dashed border-slate-800/80 bg-slate-950/30 flex items-center justify-between gap-3 text-slate-500"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs flex items-center justify-center shrink-0">
                                    {ord}º
                                  </span>
                                  <span className="text-xs italic">Aguardando globo oficial...</span>
                                </div>
                                <span className="text-[10px] font-mono text-slate-600">
                                  {getEstimatedTime(selectedTab, ord)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()
        )}
      </div>

      {/* Modal de Escolha da Vice-Campeã da Série Ouro */}
      {showChoiceModal && isUserOuroVice && userSchool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Escolha da Vice-Campeã da Ouro</h3>
              </div>
              <button
                onClick={() => setShowChoiceModal(false)}
                className="text-slate-400 hover:text-white font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Pelo regulamento estatutário da LIGA RJ, a vice-campeã da Série Ouro no ano anterior tem a prerrogativa de
              escolher a noite de desfile e a sua posição exata na pista.
            </p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">Noite de Desfile:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setChoiceDay('sexta')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                      choiceDay === 'sexta'
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    Sexta-Feira de Carnaval
                  </button>
                  <button
                    onClick={() => setChoiceDay('sabado')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                      choiceDay === 'sabado'
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    Sábado de Carnaval
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  Posição de Desfile na Noite (2ª à {choiceDay === 'sexta' ? Math.floor(ouroTotal / 2) : Math.ceil(ouroTotal / 2)}ª):
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {Array.from(
                    { length: Math.max(1, (choiceDay === 'sexta' ? Math.floor(ouroTotal / 2) : Math.ceil(ouroTotal / 2)) - 1) },
                    (_, i) => i + 2
                  ).map((ord) => (
                    <button
                      key={ord}
                      onClick={() => setChoiceOrder(ord)}
                      className={`py-2 px-2 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                        choiceOrder === ord
                          ? 'bg-amber-500 text-slate-950 font-black ring-2 ring-amber-400'
                          : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {ord}ª Escola
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 italic">
                  * A 1ª escola da noite é reservada obrigatoriamente por estatuto à agremiação recém-promovida ou safe.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowChoiceModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  plannedSequenceRef.current = {};
                  setShowChoiceModal(false);
                }}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black cursor-pointer shadow"
              >
                Confirmar Escolha
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
