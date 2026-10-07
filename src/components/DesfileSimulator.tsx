import React, { useState, useEffect, useRef } from 'react';
import { School, DivisionId, SchoolParadeScores } from '../types/carnaval';
import {
  Play,
  Pause,
  FastForward,
  CheckCircle,
  Sparkles,
  Volume2,
  ArrowRight,
  Trophy,
  Zap,
  ChevronRight,
  CheckCircle2,
  RotateCcw,
  Eye,
  Clock,
  Star,
  AlertTriangle,
  Scale,
  BookOpen,
  ShieldCheck,
  Lock,
  Calendar,
  Dices,
  Shuffle,
  AlertCircle,
  Crown,
  Hammer,
  Music
} from 'lucide-react';
import { soundService } from '../services/soundService';
import { generateParadeReport, ParadeReport } from '../utils/paradeReports';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import { PARADE_CONFIG, VENUES, getParadeDuration, simulateParadeDuration, getSectorIndex, LEAGUES } from '../config/paradeConfig';
import { DIVISION_REGULATIONS } from '../config/obrigatoriedadesConfig';
import { RegulamentoObrigatoriedadesModal } from './RegulamentoObrigatoriedadesModal';
import { ParadeScriptModal } from './ParadeScriptModal';
import { ParadeLogisticsModal } from './ParadeLogisticsModal';
import { ParadeScriptService } from '../services/paradeScriptService';
import { LogisticsService } from '../services/logisticsService';
import { CarnavalSorteio, SorteioSlot, ParadeDay, PARADE_DAYS_ORDER } from '../types/sorteio';
import { SorteioEngine } from '../services/sorteioEngine';
import { Truck } from 'lucide-react';

interface DesfileSimulatorProps {
  currentYear: number;
  userSchool: School | null;
  schools: School[];
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
  completedSchoolIds: string[];
  sorteio?: CarnavalSorteio;
  onNavigateToSorteio?: () => void;
  onCompleteDayParades?: (day: ParadeDay) => void;
  onCompleteParade: (
    schoolId: string,
    simulatedData?: {
      duration: number;
      penalty: number;
      status: 'regular' | 'estouro' | 'abaixo';
      diffMinutes: number;
    }
  ) => void;
  onRecordParadeTime?: (
    schoolId: string,
    duration: number,
    penalty: number,
    status: 'regular' | 'estouro' | 'abaixo',
    diffMinutes: number
  ) => void;
  onCompleteParadesForDivision: (division: DivisionId) => void;
  onCompleteAllParades: () => void;
  onNavigateToApuracao: () => void;
}

interface ParadeEvent {
  minute: number;
  sector: string;
  description: string;
  type: 'highlight' | 'bateria' | 'casal' | 'comissao' | 'alegoria' | 'finish';
}

export const DesfileSimulator: React.FC<DesfileSimulatorProps> = ({
  currentYear,
  userSchool,
  schools,
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
  completedSchoolIds,
  sorteio,
  onNavigateToSorteio,
  onCompleteDayParades,
  onCompleteParade,
  onCompleteParadesForDivision,
  onCompleteAllParades,
  onNavigateToApuracao
}) => {
  // Navigation within parades tab - Default to first chronological group with pending parades
  const getInitialChronologicalGroup = (): DivisionId => {
    const isCompleted = (divId: DivisionId) => {
      const gSchools = schools.filter((s) => s.division === divId && !s.isInactive && !s.inactive);
      return gSchools.length > 0 && gSchools.every((s) => completedSchoolIds.includes(s.id));
    };
    for (const divId of SorteioEngine.PARADE_GROUPS_CHRONOLOGICAL_ORDER) {
      if (!isCompleted(divId)) return divId;
    }
    return 'ouro';
  };

  const [selectedGroup, setSelectedGroup] = useState<DivisionId>(getInitialChronologicalGroup);
  const [activeParadeSchool, setActiveParadeSchool] = useState<School | null>(null);
  const [viewingReportSchoolId, setViewingReportSchoolId] = useState<string | null>(null);
  const [showRegulamentoModal, setShowRegulamentoModal] = useState<boolean>(false);
  const [regulamentoModalDiv, setRegulamentoModalDiv] = useState<DivisionId>('especial');
  const [scriptModalSchool, setScriptModalSchool] = useState<School | null>(null);
  const [logisticsModalSchool, setLogisticsModalSchool] = useState<School | null>(null);

  // Dynamic live parade simulation state
  const [activeParadeSim, setActiveParadeSim] = useState<{
    targetDuration: number;
    timeStatus: 'regular' | 'estouro' | 'abaixo';
    penalty: number;
    diffMinutes: number;
  } | null>(null);

  // Live runway simulator states
  const [minute, setMinute] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [events, setEvents] = useState<ParadeEvent[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Valores derivados da escola em desfile (config, local e duração dinâmica por grupo)
  const activeConfig = activeParadeSchool ? PARADE_CONFIG[activeParadeSchool.division] : null;
  const activeVenue = activeConfig ? VENUES[activeConfig.venue] : null;
  const paradeDuration = activeParadeSim
    ? activeParadeSim.targetDuration
    : activeParadeSchool
    ? getParadeDuration(activeParadeSchool, currentYear)
    : 0;

  // Completed counts
  const totalSchools = schools.length;
  const totalCompleted = completedSchoolIds.length;
  const isAllCarnavalCompleted = totalSchools > 0 && totalCompleted >= totalSchools;

  const especialCompletedCount = especialSchools.filter((s) => completedSchoolIds.includes(s.id)).length;
  const ouroCompletedCount = ouroSchools.filter((s) => completedSchoolIds.includes(s.id)).length;
  const prataCompletedCount = prataSchools.filter((s) => completedSchoolIds.includes(s.id)).length;
  const bronzeCompletedCount = bronzeSchools.filter((s) => completedSchoolIds.includes(s.id)).length;
  const avaliacaoCompletedCount = avaliacaoSchools.filter((s) => completedSchoolIds.includes(s.id)).length;

  const isSelectedGroupCompleted =
    selectedGroup === 'especial'
      ? especialCompletedCount === especialSchools.length
      : selectedGroup === 'ouro'
      ? ouroCompletedCount === ouroSchools.length
      : selectedGroup === 'prata'
      ? prataCompletedCount === prataSchools.length
      : selectedGroup === 'bronze'
      ? bronzeCompletedCount === bronzeSchools.length
      : avaliacaoCompletedCount === (avaliacaoSchools?.length ?? 0);

  const currentLeague = LEAGUES[PARADE_CONFIG[selectedGroup].leagueId];

  const getScoreDataForSchool = (schoolId: string): SchoolParadeScores | undefined => {
    return (
      especialScores.find((s) => s.schoolId === schoolId) ||
      ouroScores.find((s) => s.schoolId === schoolId) ||
      prataScores.find((s) => s.schoolId === schoolId) ||
      bronzeScores.find((s) => s.schoolId === schoolId) ||
      avaliacaoScores.find((s) => s.schoolId === schoolId)
    );
  };

  // Generate dynamic parade script for a school (proporcional à duração do grupo)
  const getParadeScript = (sch: School, duration: number): ParadeEvent[] => {
    const venue = VENUES[PARADE_CONFIG[sch.division].venue];
    const at = (f: number) => Math.max(1, Math.round(duration * f));
    const enredoTitle = sch.currentEnredo?.title || 'o Enredo Oficial da Temporada';
    const script = ParadeScriptService.getOrGenerateParadeScript(sch, sch.division);

    const comissaoElem = script.elements.find((e) => e.type === 'comissao_frente');
    const abreAlasElem = script.elements.find((e) => e.type === 'abre_alas');
    const baianasElem = script.elements.find((e) => e.type === 'baianas');
    const alegorias = script.elements.filter((e) => e.type === 'alegoria');
    const alas = script.elements.filter((e) => e.type === 'ala');

    const firstAla = alas[0];
    const middleAla = alas[Math.floor(alas.length / 2)] || alas[1];
    const lastAlegoria = alegorias[alegorias.length - 1] || abreAlasElem;

    return [
      {
        minute: at(0.03),
        sector: venue.eventSectors[0],
        description: `A ${cleanSchoolName(sch)} entra em ${venue.name}! O intérprete ${sch.staff.interprete.name} solta o grito de guerra clássico ecoando o enredo "${enredoTitle}"!`,
        type: 'highlight'
      },
      {
        minute: at(0.15),
        sector: venue.eventSectors[1],
        description: `Comissão de Frente: "${comissaoElem?.name || 'Abertura Triunfal'}" (${comissaoElem?.costumeDetails || 'Indumentária de gala'}). Coreografia de ${sch.staff.coreografo.name} ovacionada pelos jurados!`,
        type: 'comissao'
      },
      {
        minute: at(0.28),
        sector: venue.eventSectors[2],
        description: `Abre-Alas: "${abreAlasElem?.name || 'O Grande Pavilhão Ancestral'}". Escultura monumental de ${sch.staff.carnavalesco.name} nas cores ${sch.colors.primary} e ${sch.colors.secondary}!`,
        type: 'alegoria'
      },
      {
        minute: at(0.42),
        sector: venue.eventSectors[2],
        description: `Passeiam com elegância as Baianas: "${baianasElem?.name || 'As Matriarcas da Terra'}" com ${script.obrigatoriedades.baianasCount} senhoras rodando! Logo atrás, a Ala "${firstAla?.name || 'Povo da Floresta'}".`,
        type: 'highlight'
      },
      {
        minute: at(0.55),
        sector: venue.eventSectors[3],
        description: `O 1º Casal de Mestre-Sala e Porta-Bandeira ${sch.staff.mestreSalaPortaBandeira.name} reverencia a cabine com giros perfeitos, desfraldando o pavilhão sagrado com maestria.`,
        type: 'casal'
      },
      {
        minute: at(0.70),
        sector: venue.eventSectors[4],
        description: `Momento épico no recuo! Mestre ${sch.staff.mestreBateria.name} comanda ${script.obrigatoriedades.ritmistasCount} ritmistas com paradinhas arrojadas! Ala "${middleAla?.name || 'Guardiões do Ritmo'}" canta forte!`,
        type: 'bateria'
      },
      {
        minute: at(0.85),
        sector: venue.eventSectors[5],
        description: `Harmonia impecável na reta final! Alegoria "${lastAlegoria?.name || 'Apoteose da Comunidade'}" arrasta a multidão com efeitos cenográficos vibrantes.`,
        type: 'alegoria'
      },
      {
        minute: duration,
        sector: venue.eventSectors[6],
        description: `A última ala cruza a faixa final aos ${duration} minutos de desfile! Portões lacrados com rigor regulamentar e aplausos efusivos ${venue.endPhrase}!`,
        type: 'finish'
      }
    ];
  };

  // Start watching a school's live runway parade (only if not yet completed)
  const handleLaunchLiveParade = (school: School) => {
    // If the school has already desfilado, re-simulation is strictly prohibited
    if (completedSchoolIds.includes(school.id)) {
      return;
    }

    if (sorteio && sorteio.isCompleted) {
      const lockCheck = SorteioEngine.isSchoolUnlocked(school.id, sorteio, completedSchoolIds);
      if (!lockCheck.unlocked) {
        soundService.playBuzzer();
        return;
      }
    }

    const timeSim = simulateParadeDuration(school);
    setActiveParadeSchool(school);
    setActiveParadeSim({
      targetDuration: timeSim.duration,
      timeStatus: timeSim.timeStatus,
      penalty: timeSim.penalty,
      diffMinutes: timeSim.diffMinutes
    });
    setMinute(0);
    setEvents([]);
    setIsFinished(false);
    setIsPlaying(true);
    setSpeed(1);
    soundService.playGavel();
  };

  // Timer loop for active parade
  useEffect(() => {
    if (!isPlaying || isFinished || !activeParadeSchool) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setMinute((prev) => (prev >= paradeDuration ? paradeDuration : prev + 1));
    }, 450 / speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, isFinished, activeParadeSchool, speed, paradeDuration]);

  // Handle milestones and completion when minute advances
  useEffect(() => {
    if (!activeParadeSchool || minute === 0 || paradeDuration === 0) return;

    if (minute % 4 === 0) {
      soundService.playSurdoBeat();
    }

    const script = getParadeScript(activeParadeSchool, paradeDuration);
    const matchEvent = script.find((e) => e.minute === minute);
    if (matchEvent) {
      setEvents((cur) => {
        if (cur.some((e) => e.minute === matchEvent.minute)) return cur;
        return [matchEvent, ...cur];
      });
      soundService.playScoreRevealTone(10.0);
    }

    if (minute >= paradeDuration && !isFinished) {
      setIsFinished(true);
      setIsPlaying(false);
      soundService.playChampionFanfare();
      if (!completedSchoolIds.includes(activeParadeSchool.id)) {
        onCompleteParade(
          activeParadeSchool.id,
          activeParadeSim
            ? {
                duration: activeParadeSim.targetDuration,
                penalty: activeParadeSim.penalty,
                status: activeParadeSim.timeStatus,
                diffMinutes: activeParadeSim.diffMinutes
              }
            : undefined
        );
      }
    }
  }, [minute, isFinished, activeParadeSchool, paradeDuration, activeParadeSim, onCompleteParade, completedSchoolIds]);

  const handleSkipToEnd = () => {
    if (!activeParadeSchool) return;
    setMinute(paradeDuration);
    setEvents([...getParadeScript(activeParadeSchool, paradeDuration)].reverse());
    setIsFinished(true);
    setIsPlaying(false);
    soundService.playChampionFanfare();
    if (!completedSchoolIds.includes(activeParadeSchool.id)) {
      onCompleteParade(
        activeParadeSchool.id,
        activeParadeSim
          ? {
              duration: activeParadeSim.targetDuration,
              penalty: activeParadeSim.penalty,
              status: activeParadeSim.timeStatus,
              diffMinutes: activeParadeSim.diffMinutes
            }
          : undefined
      );
    }
  };

  // Chronological linear queue from official draw
  const chronologicalOrder = sorteio?.isCompleted
    ? SorteioEngine.getChronologicalParadeOrder(sorteio, schools)
    : [];

  const nextPendingItem = chronologicalOrder.find((item) => !completedSchoolIds.includes(item.school.id));
  const nextPendingSchool = nextPendingItem?.school || null;
  const nextPendingSlot = nextPendingItem?.slot || null;

  // Active Carnaval day currently marching
  const currentActiveDay = nextPendingSlot?.day || null;
  const currentActiveDayInfo = PARADE_DAYS_ORDER.find((d) => d.id === currentActiveDay);

  // Find next pending school to watch
  const handleWatchNextPending = () => {
    if (nextPendingSchool) {
      if (selectedGroup !== nextPendingSchool.division) {
        setSelectedGroup(nextPendingSchool.division);
      }
      handleLaunchLiveParade(nextPendingSchool);
    }
  };

  // Simulate an individual school parade instantly (only allowed if not yet completed and unlocked)
  const handleSimulateSingleSchool = (sch: School) => {
    if (completedSchoolIds.includes(sch.id)) return;
    if (sorteio && sorteio.isCompleted) {
      const lockCheck = SorteioEngine.isSchoolUnlocked(sch.id, sorteio, completedSchoolIds);
      if (!lockCheck.unlocked) {
        soundService.playBuzzer();
        return;
      }
    }
    const timeSim = simulateParadeDuration(sch);
    onCompleteParade(sch.id, {
      duration: timeSim.duration,
      penalty: timeSim.penalty,
      status: timeSim.timeStatus,
      diffMinutes: timeSim.diffMinutes
    });
    setViewingReportSchoolId(sch.id);
    soundService.playGavel();
  };

  const handleSimulateNextPending = () => {
    if (nextPendingSchool) {
      handleSimulateSingleSchool(nextPendingSchool);
    }
  };

  const currentSector = activeVenue
    ? activeVenue.sectors[getSectorIndex(minute, paradeDuration)]
    : '';

  const rawGroupSchools =
    selectedGroup === 'especial'
      ? especialSchools
      : selectedGroup === 'ouro'
      ? ouroSchools
      : selectedGroup === 'prata'
      ? prataSchools
      : selectedGroup === 'bronze'
      ? bronzeSchools
      : avaliacaoSchools;

  // Group the division's slots by parade day
  const divSlots = sorteio?.divisions?.[selectedGroup]?.slots || [];
  const divDays = Array.from(new Set(divSlots.map((s) => s.day)));

  // Check if selectedGroup is unlocked based on previous days
  const firstDivisionDay = divDays[0];
  const divisionLockCheck = firstDivisionDay && sorteio?.isCompleted
    ? SorteioEngine.isDayUnlocked(firstDivisionDay, sorteio, completedSchoolIds)
    : { unlocked: true };
  const isSelectedGroupUnlocked = divisionLockCheck.unlocked;

  // Sorted list of schools for selected group according to drawn slots
  const schoolSlotMap = new Map(divSlots.map((slot) => [slot.schoolId, slot]));
  const displayedGroupSchools = [...rawGroupSchools].sort((a, b) => {
    const slotA = schoolSlotMap.get(a.id);
    const slotB = schoolSlotMap.get(b.id);
    if (!slotA && !slotB) return 0;
    if (!slotA) return 1;
    if (!slotB) return -1;
    const dayOrder = { sexta: 1, sabado: 2, domingo: 3, segunda: 4, terca: 5, quarta_cinzas: 6 };
    const dDiff = (dayOrder[slotA.day] || 0) - (dayOrder[slotB.day] || 0);
    if (dDiff !== 0) return dDiff;
    return slotA.order - slotB.order;
  });

  // Se o sorteio geral ainda não foi realizado, a passarela está completamente fechada para desfiles
  if (!sorteio || !sorteio.isCompleted) {
    const isEspecialDrawn = Boolean(sorteio?.divisions?.especial?.isCompleted);
    const isOuroDrawn = Boolean(sorteio?.divisions?.ouro?.isCompleted);
    const isPrataDrawn = Boolean(sorteio?.divisions?.prata?.isCompleted);
    const isBronzeDrawn = Boolean(sorteio?.divisions?.bronze?.isCompleted);
    const isAvaliacaoDrawn = Boolean(sorteio?.divisions?.avaliacao?.isCompleted);
    const completedDrawsCount = [isEspecialDrawn, isOuroDrawn, isPrataDrawn, isBronzeDrawn, isAvaliacaoDrawn].filter(Boolean).length;

    return (
      <div className="space-y-6 pb-20 animate-fadeIn">
        {/* Main Lock Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 shadow-sm">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  PASSARELA DO SAMBA FECHADA • AGUARDANDO SORTEIO DA ORDEM
                </span>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Carnaval {currentYear} • Ciclo Pré-Desfile
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                A Ordem dos Desfiles Ainda Não Foi Definida
              </h1>
              <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                Na tradição do Carnaval carioca, a pista da Marquês de Sapucaí e a Estrada Intendente Magalhães só são abertas
                para os desfiles oficiais após a realização do <strong>Sorteio Oficial da Ordem de Desfile</strong>. Até que a LIESA,
                LIGA RJ e Superliga definam publicamente os dias e as posições de cada uma das <strong>{schools.length} agremiações</strong>,
                nenhuma escola pode entrar na passarela para assistir ou simular o desfile.
              </p>
            </div>

            {/* Direct CTA button to Sorteio tab */}
            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {onNavigateToSorteio && (
                <button
                  onClick={onNavigateToSorteio}
                  className="px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2.5 cursor-pointer transition shadow-xl shadow-amber-500/30 ring-2 ring-amber-400 animate-pulse"
                >
                  <Dices className="w-5 h-5 text-slate-950" />
                  <span>Realizar Sorteio da Ordem Agora</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Linha do Tempo do Ciclo Carnavalesco (Passagem do Tempo) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Linha do Tempo • Ciclo Carnavalesco {currentYear}
              </h3>
            </div>
            <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              Etapa 2 de 5: Sorteio Oficial Obrigatório
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-2">
            {/* Step 1: Preparação */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-emerald-500/30 space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                  Etapa 1 • Concluída
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-xs font-black text-white">Barracões & Ensaios</h4>
              <p className="text-[11px] text-slate-400 leading-snug">
                Enredos desenvolvidos, alegorias e fantasias em confecção e ensaios nas quadras.
              </p>
            </div>

            {/* Step 2: Sorteio (Current active step) */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-400 ring-2 ring-amber-400/30 space-y-2 relative overflow-hidden shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-amber-300 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 animate-pulse">
                  Etapa 2 • Em Aberto
                </span>
                <Dices className="w-4 h-4 text-amber-400" />
              </div>
              <h4 className="text-xs font-black text-white flex items-center gap-1.5">
                <span>Sorteio da Ordem</span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              </h4>
              <p className="text-[11px] text-slate-300 leading-snug">
                Globo oficial define os dias e horários na Sapucaí e na Intendente Magalhães.
              </p>
            </div>

            {/* Step 3: Desfiles (Locked) */}
            <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-2 opacity-60">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-500 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                  Etapa 3 • Bloqueada
                </span>
                <Lock className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <h4 className="text-xs font-bold text-slate-300">Desfiles na Passarela</h4>
              <p className="text-[11px] text-slate-500 leading-snug">
                Sexta a Quarta de Cinzas. Libera assim que o sorteio oficial for homologado.
              </p>
            </div>

            {/* Step 4: Apuração (Locked) */}
            <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-2 opacity-60">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-500 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                  Etapa 4 • Bloqueada
                </span>
                <Lock className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <h4 className="text-xs font-bold text-slate-300">Apuração das Notas</h4>
              <p className="text-[11px] text-slate-500 leading-snug">
                Leitura das notas dos 36 jurados na Apoteose após os desfiles concluídos.
              </p>
            </div>

            {/* Step 5: Campeãs (Locked) */}
            <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-2 opacity-60">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-500 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                  Etapa 5 • Bloqueada
                </span>
                <Lock className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <h4 className="text-xs font-bold text-slate-300">Desfile das Campeãs</h4>
              <p className="text-[11px] text-slate-500 leading-snug">
                Sábado de consagração das 6 melhores colocadas do Grupo Especial.
              </p>
            </div>
          </div>
        </div>

        {/* Status das 5 Divisões aguardando o sorteio */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="space-y-1">
              <h3 className="text-base font-black text-white">
                Situação do Sorteio por Divisão ({completedDrawsCount}/5 Concluídos)
              </h3>
              <p className="text-xs text-slate-400">
                Cada liga precisa sortear suas agremiações conforme os critérios do regulamento oficial.
              </p>
            </div>
            {onNavigateToSorteio && (
              <button
                onClick={onNavigateToSorteio}
                className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0"
              >
                <Dices className="w-4 h-4 text-amber-400" />
                <span>Abrir Globo de Sorteio</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { id: 'especial', name: 'Grupo Especial', league: 'LIESA', count: especialSchools.length, drawn: isEspecialDrawn, days: 'Dom, Seg e Ter' },
              { id: 'ouro', name: 'Série Ouro', league: 'LIGA RJ', count: ouroSchools.length, drawn: isOuroDrawn, days: 'Sex e Sáb' },
              { id: 'prata', name: 'Série Prata', league: 'Superliga', count: prataSchools.length, drawn: isPrataDrawn, days: 'Seg e Ter' },
              { id: 'bronze', name: 'Série Bronze', league: 'Superliga', count: bronzeSchools.length, drawn: isBronzeDrawn, days: 'Sáb e Dom' },
              { id: 'avaliacao', name: 'Grupo Avaliação', league: 'Superliga', count: avaliacaoSchools.length, drawn: isAvaliacaoDrawn, days: 'Quarta de Cinzas' }
            ].map((div) => (
              <div
                key={div.id}
                className={`p-4 rounded-2xl border transition flex flex-col justify-between gap-3 ${
                  div.drawn
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-slate-400">{div.league}</span>
                    <span
                      className={`font-black uppercase px-2 py-0.5 rounded-full ${
                        div.drawn
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {div.drawn ? '✓ Sorteado' : '🔒 Pendente'}
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-white">{div.name}</h4>
                  <p className="text-[11px] text-slate-400">
                    {div.count} escolas • {div.days}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  {div.drawn ? (
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Ordem Definida</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Aguardando Sorteio</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Header & Global Parades Status */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                🔴 PASSARELA DO SAMBA • CARNAVAL {currentYear}
              </span>
              <span className="text-xs text-slate-400">
                Marquês de Sapucaí & Intendente Magalhães
              </span>
              {currentActiveDayInfo && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-purple-400" />
                  <span>Em Andamento: {currentActiveDayInfo.shortLabel}</span>
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Desfiles Oficiais das Agremiações
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
              Assista e simule os desfiles na ordem cronológica oficial do Carnaval. Conforme regulamento, para acessar os desfiles das noites seguintes, as etapas anteriores devem estar concluídas!
            </p>
          </div>

          {/* Global Progress Widget */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 min-w-[260px] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">Progresso dos Desfiles:</span>
              <span className="font-mono font-black text-amber-400">
                {totalCompleted} / {totalSchools} Realizados
              </span>
            </div>
            <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 transition-all duration-500"
                style={{ width: `${(totalCompleted / Math.max(1, totalSchools)) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono gap-1 flex-wrap">
              <span className={especialCompletedCount === especialSchools.length ? 'text-emerald-400 font-bold' : ''}>
                Esp: {especialCompletedCount}/{especialSchools.length}
              </span>
              <span className={ouroCompletedCount === ouroSchools.length ? 'text-emerald-400 font-bold' : ''}>
                Ouro: {ouroCompletedCount}/{ouroSchools.length}
              </span>
              <span className={prataCompletedCount === prataSchools.length ? 'text-emerald-400 font-bold' : ''}>
                Prata: {prataCompletedCount}/{prataSchools.length}
              </span>
              <span className={bronzeCompletedCount === bronzeSchools.length ? 'text-emerald-400 font-bold' : ''}>
                Bronze: {bronzeCompletedCount}/{bronzeSchools.length}
              </span>
              <span className={avaliacaoCompletedCount === avaliacaoSchools.length ? 'text-emerald-400 font-bold' : ''}>
                Avaliação: {avaliacaoCompletedCount}/{avaliacaoSchools.length}
              </span>
            </div>
          </div>
        </div>

        {/* Global Batch Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2">
            {!isAllCarnavalCompleted && nextPendingSchool && (
              <>
                <button
                  onClick={handleWatchNextPending}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs transition flex items-center gap-2 shadow-lg shadow-amber-500/25 ring-2 ring-amber-400/50 cursor-pointer animate-pulse"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Assistir Próxima: {cleanSchoolName(nextPendingSchool)} ({nextPendingSlot?.dayLabel.split(' ')[0]})</span>
                </button>

                <button
                  onClick={handleSimulateNextPending}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow"
                  title="Simular instantaneamente a próxima escola da ordem"
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Simular Próxima</span>
                </button>
              </>
            )}

            {!isAllCarnavalCompleted && (
              isSelectedGroupCompleted ? (
                <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-xs">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Desfiles da {PARADE_CONFIG[selectedGroup].label} Homologados pela {currentLeague.name}</span>
                </div>
              ) : isSelectedGroupUnlocked ? (
                <button
                  onClick={() => onCompleteParadesForDivision(selectedGroup)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs transition border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Simular Restantes da {PARADE_CONFIG[selectedGroup].label}</span>
                </button>
              ) : (
                <div
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 text-xs font-bold"
                  title={divisionLockCheck.reason}
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{PARADE_CONFIG[selectedGroup].label} Bloqueada (Aguardando Dias Anteriores)</span>
                </div>
              )
            )}

            {!isAllCarnavalCompleted && (
              <button
                onClick={onCompleteAllParades}
                className="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-black text-xs transition flex items-center gap-1.5 shadow cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Simular Todos os Restantes em Ordem Cronológica</span>
              </button>
            )}

            {isAllCarnavalCompleted && (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Todos os {totalSchools} Desfiles Concluídos e Homologados pelas Ligas (LIESA, LIGA RJ e Superliga)!</span>
              </div>
            )}
          </div>

          {/* Quick Jump to Apuração */}
          <button
            onClick={onNavigateToApuracao}
            className={`px-5 py-2.5 rounded-xl font-black text-xs transition flex items-center gap-2 shadow-lg ${
              isAllCarnavalCompleted
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-emerald-500/25 ring-2 ring-emerald-400/50 cursor-pointer animate-pulse'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white cursor-pointer'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>{isAllCarnavalCompleted ? 'SEGUIR PARA A APURAÇÃO OFICIAL' : 'Ir para a Apuração (Aguardando Desfiles)'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ALL PARADES COMPLETED BANNER */}
      {isAllCarnavalCompleted && (
        <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-amber-500/20 border-2 border-amber-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-4 animate-fadeIn">
          <div className="flex items-center justify-center gap-2 text-amber-400 font-black text-xl">
            <Trophy className="w-7 h-7" />
            <span>TODOS OS DESFILES DO CARNAVAL {currentYear} CONCLUÍDOS!</span>
          </div>
          <p className="text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
            As agremiações do <strong>Grupo Especial</strong>, da <strong>Série Ouro</strong>, da <strong>Série Prata</strong>, da <strong>Série Bronze</strong> e do <strong>Grupo de Avaliação</strong> cruzaram a Marquês de Sapucaí (Especial e Ouro) e a Estrada Intendente Magalhães (Prata, Bronze e Avaliação)!
            Os envelopes foram lacrados com o regulamento do descarte da menor nota de cada quesito. Siga agora para a <strong>Apuração Oficial na Praça da Apoteose</strong> para revelar as notas e consagrar as campeãs!
          </p>
          <div className="pt-2">
            <button
              onClick={onNavigateToApuracao}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-base shadow-xl shadow-amber-500/30 transition transform hover:-translate-y-0.5 flex items-center gap-3 mx-auto cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>IR PARA A APURAÇÃO OFICIAL DAS NOTAS</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* LIVE PARADE RUNWAY SIMULATOR (If a school is marching) */}
      {activeParadeSchool && (
        <div className="space-y-6 animate-fadeIn">
          {/* Active School Banner */}
          <div
            className="rounded-2xl p-6 sm:p-8 border shadow-2xl relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${activeParadeSchool.colors.primary}cc 0%, #090d16 85%)`,
              borderColor: activeParadeSchool.colors.border || '#334155'
            }}
          >
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
                    🔴 {activeVenue?.liveLabel} • CARNAVAL {currentYear}
                  </span>
                  <span className="text-xs text-white/80 font-semibold">
                    {activeConfig?.label}
                  </span>
                </div>
                <h2 className="text-3xl font-black text-white mt-1">
                  {cleanSchoolName(activeParadeSchool)}
                </h2>
                <p className="text-xs text-amber-200/90 italic">
                  "{activeParadeSchool.currentEnredo?.title || 'Enredo Consagrado na Avenida'}"
                </p>
                <div className="text-[11px] text-slate-300 mt-2 flex flex-wrap items-center gap-3">
                  <span>Intérprete: <strong>{activeParadeSchool.staff.interprete.name}</strong></span>
                  <span>•</span>
                  <span>Bateria: <strong>{activeParadeSchool.staff.mestreBateria.name}</strong></span>
                  <span>•</span>
                  <span>Carnavalesco: <strong>{activeParadeSchool.staff.carnavalesco.name}</strong></span>
                </div>

                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <button
                    onClick={() => setScriptModalSchool(activeParadeSchool)}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>📜 Livro Abre-Alas (Roteiro do Enredo)</span>
                  </button>
                  <button
                    onClick={() => setLogisticsModalSchool(activeParadeSchool)}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                  >
                    <Truck className="w-3.5 h-3.5 text-blue-400" />
                    <span>🚚 Logística & Posição de Desfile</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-black/60 px-4 sm:px-5 py-3 rounded-2xl border border-white/10 self-stretch sm:self-auto justify-between sm:justify-end">
                <div className="text-right w-full sm:w-auto">
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold flex items-center justify-end gap-1.5">
                    <span>Cronômetro Oficial</span>
                    {activeConfig && minute > activeConfig.maxMinutes && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    )}
                  </div>
                  <div
                    className={`text-3xl font-black font-mono ${
                      activeConfig && minute > activeConfig.maxMinutes
                        ? 'text-rose-400 animate-pulse'
                        : activeConfig && minute >= activeConfig.minMinutes
                        ? 'text-emerald-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {minute.toString().padStart(2, '0')}:00
                  </div>
                  <div className="text-[10px] font-medium mt-0.5">
                    {activeConfig && minute > activeConfig.maxMinutes ? (
                      <span className="text-rose-400 font-bold">
                        ⚠️ Estouro: +{minute - activeConfig.maxMinutes} min (-{((minute - activeConfig.maxMinutes) * 0.1).toFixed(1)} pts)
                      </span>
                    ) : activeConfig && minute >= activeConfig.minMinutes ? (
                      <span className="text-emerald-400 font-semibold">
                        ✓ Faixa Regulamentar ({activeConfig.minMinutes}–{activeConfig.maxMinutes} min)
                      </span>
                    ) : (
                      <span className="text-slate-400">
                        Limite: {activeConfig?.minMinutes}–{activeConfig?.maxMinutes} min (-0,1 pts/min fora)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Runway Progress Visualizer */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Posição da Agremiação na Pista — {activeVenue?.name}:
              </span>
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                📍 {currentSector}
              </span>
            </div>

            {/* Track Bar */}
            <div className="relative pt-6 pb-2">
              <div className="h-4 bg-slate-950 rounded-full border border-slate-800 relative overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 rounded-full transition-all duration-300"
                  style={{ width: `${(minute / Math.max(1, paradeDuration)) * 100}%` }}
                />
              </div>

              {/* Sector Checkpoints */}
              <div className="flex justify-between text-[9px] sm:text-[10px] text-slate-500 mt-2 font-mono overflow-x-hidden">
                {activeVenue?.checkpoints.map((c) => (
                  <span key={c} className="truncate max-w-[55px] sm:max-w-none text-center">
                    <span className="sm:hidden">{c.replace('Setor ', 'S.').replace('(Bateria)', '🥁').replace('(Jurados)', '⚖️').replace('(Apoteose)', '🏁')}</span>
                    <span className="hidden sm:inline">{c}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-slate-800/80">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                {!isPlaying ? (
                  <button
                    disabled={isFinished}
                    onClick={() => {
                      setIsPlaying(true);
                      soundService.playGavel();
                    }}
                    className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>{minute === 0 ? 'Dar a Partida no Desfile' : 'Continuar'}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center justify-center gap-2"
                  >
                    <Pause className="w-4 h-4" />
                    <span>Pausar</span>
                  </button>
                )}

                <button
                  disabled={isFinished}
                  onClick={handleSkipToEnd}
                  className="flex-1 sm:flex-initial px-3 sm:px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <FastForward className="w-4 h-4" />
                  <span>Pular Fim</span>
                </button>

                <button
                  onClick={() => setActiveParadeSchool(null)}
                  className="px-3 sm:px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold transition"
                >
                  Fechar
                </button>
              </div>

              {/* Speed Selector */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400 ml-auto sm:ml-0">
                <span>Velocidade:</span>
                {[1, 2, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      speed === s
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Parade Commentary & Completion Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Transmissão da Passarela & Destaques</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {events.length} momento(s) registrado(s)
              </span>
            </div>

            {events.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                Pressione "Dar a Partida no Desfile" para que a agremiação inicie a apresentação em {activeVenue?.name}!
              </div>
            ) : (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {events.map((evt, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3 animate-fadeIn"
                  >
                    <div className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold text-xs flex-shrink-0">
                      {evt.minute} min
                    </div>
                    <div className="space-y-1">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {evt.sector}
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">
                        {evt.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Finished banner inside live simulator */}
            {isFinished && (
              <div className="mt-4 p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-fadeIn">
                <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-base">
                  <CheckCircle className="w-5 h-5" />
                  <span>Desfile da {cleanSchoolName(activeParadeSchool)} Concluído na Passarela!</span>
                </div>
                <p className="text-xs text-slate-300 max-w-lg mx-auto">
                  Tempo total de desfile: <strong>{paradeDuration} minutos</strong> (Regulamentar: {activeConfig?.minMinutes} a {activeConfig?.maxMinutes} min).
                </p>
                {(() => {
                  const scoreData = getScoreDataForSchool(activeParadeSchool.id);
                  const timePen = activeParadeSim?.penalty ?? scoreData?.timePenalty ?? 0;
                  const techPen = scoreData?.technicalPenalty ?? 0;
                  const totalPen = Math.round((timePen + techPen) * 10) / 10;
                  const infractions = scoreData?.infractions ?? [];

                  if (totalPen > 0) {
                    return (
                      <div className="space-y-2 inline-block text-left max-w-xl mx-auto w-full">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-3.5 py-2 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold">
                          <span>
                            ⚠️ Penalidade Total: -{totalPen.toFixed(1)} ponto(s)
                          </span>
                          <span className="text-[10px] font-mono text-rose-200">
                            Tempo: -{timePen.toFixed(1)} | Obrigatoriedades: -{techPen.toFixed(1)}
                          </span>
                        </div>

                        {infractions.length > 0 && (
                          <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/40 space-y-1 text-[11px] text-rose-200">
                            <div className="font-bold text-rose-300 flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              <span>Infrações Detectadas na Vistoria Técnica:</span>
                            </div>
                            {infractions.map((inf) => (
                              <div key={inf.id} className="flex items-center justify-between pl-2">
                                <span>• <strong>{inf.ruleName}:</strong> {inf.description}</span>
                                <span className="font-mono font-bold text-rose-300 whitespace-nowrap ml-2">-{inf.pointsDeducted.toFixed(1)} pt</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>✓ Desfile concluído no tempo regulamentar e com 100% das obrigatoriedades técnicas cumpridas! Sem penalidades.</span>
                    </div>
                  );
                })()}

                {/* Performance report summary */}
                {(() => {
                  const rep = generateParadeReport(activeParadeSchool, getScoreDataForSchool(activeParadeSchool.id));
                  return (
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-w-2xl mx-auto text-left space-y-2 mt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-300">{rep.verdictTitle}</span>
                        <span className="text-amber-400 font-mono text-xs">★ {rep.verdictStars} / 5</span>
                      </div>
                      <p className="text-xs text-slate-300 italic">{rep.criticaSummary}</p>
                    </div>
                  );
                })()}

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveParadeSchool(null)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
                  >
                    Voltar para a Lista de Agremiações
                  </button>

                  <button
                    onClick={handleWatchNextPending}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shadow"
                  >
                    <span>Assistir Próxima Escola</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SCHEDULE & GROUPS TABS - ORDENADOS CRONOLOGICAMENTE POR ENTRADA NA PISTA */}
      <div className="space-y-4">
        {/* Header & Chronological Division Cards */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                CRONOGRAMA OFICIAL • ORDEM DOS DESFILES NA PISTA
              </span>
              <h3 className="text-lg font-black text-white mt-1">
                Sequência Cronológica: Quem Desfila Primeiro
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              5 Grupos em Sequência Calendária Rigorosa
            </span>
          </div>

          {/* Grid dos 5 Grupos na Ordem Cronológica Oficial: Ouro -> Bronze -> Especial -> Prata -> Avaliação */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {/* 1º a Desfilar: Série Ouro */}
            <div
              onClick={() => setSelectedGroup('ouro')}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedGroup === 'ouro'
                  ? 'bg-blue-950/50 border-blue-500 ring-2 ring-blue-500/40 shadow-lg'
                  : 'bg-slate-950/70 border-slate-800/90 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-blue-500/20 text-blue-300 border border-blue-500/40">
                    1º A DESFILAR
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {ouroCompletedCount === ouroSchools.length ? '✓' : `${ouroCompletedCount}/${ouroSchools.length}`}
                  </span>
                </div>
                <h4 className="text-sm font-black text-white truncate">Série Ouro</h4>
                <div className="text-[11px] font-semibold text-blue-300 mt-0.5">Sexta & Sábado</div>
                <div className="text-[10px] text-slate-400">Sapucaí • LIGA-RJ</div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-800/80">
                <span className={`text-[10px] font-bold block text-center py-1 rounded ${
                  ouroCompletedCount === ouroSchools.length
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : selectedGroup === 'ouro'
                    ? 'bg-blue-500 text-white font-black shadow'
                    : 'bg-slate-900 text-slate-300'
                }`}>
                  {ouroCompletedCount === ouroSchools.length ? '✓ Concluído' : selectedGroup === 'ouro' ? 'Em Foco' : 'Ver Desfiles'}
                </span>
              </div>
            </div>

            {/* 2º a Desfilar: Série Bronze */}
            <div
              onClick={() => setSelectedGroup('bronze')}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedGroup === 'bronze'
                  ? 'bg-amber-950/50 border-amber-700 ring-2 ring-amber-500/40 shadow-lg'
                  : 'bg-slate-950/70 border-slate-800/90 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-700/20 text-amber-200 border border-amber-700/40">
                    2º A DESFILAR
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {bronzeCompletedCount === bronzeSchools.length ? '✓' : `${bronzeCompletedCount}/${bronzeSchools.length}`}
                  </span>
                </div>
                <h4 className="text-sm font-black text-white truncate">Série Bronze</h4>
                <div className="text-[11px] font-semibold text-amber-300 mt-0.5">Sábado & Domingo</div>
                <div className="text-[10px] text-slate-400">Intendente • Superliga</div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-800/80">
                <span className={`text-[10px] font-bold block text-center py-1 rounded ${
                  bronzeCompletedCount === bronzeSchools.length
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : selectedGroup === 'bronze'
                    ? 'bg-amber-700 text-amber-100 font-black shadow'
                    : 'bg-slate-900 text-slate-300'
                }`}>
                  {bronzeCompletedCount === bronzeSchools.length ? '✓ Concluído' : selectedGroup === 'bronze' ? 'Em Foco' : 'Ver Desfiles'}
                </span>
              </div>
            </div>

            {/* 3º a Desfilar: Grupo Especial */}
            <div
              onClick={() => setSelectedGroup('especial')}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedGroup === 'especial'
                  ? 'bg-amber-950/50 border-amber-500 ring-2 ring-amber-500/40 shadow-lg'
                  : 'bg-slate-950/70 border-slate-800/90 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    3º A DESFILAR
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {especialCompletedCount === especialSchools.length ? '✓' : `${especialCompletedCount}/${especialSchools.length}`}
                  </span>
                </div>
                <h4 className="text-sm font-black text-white truncate">Grupo Especial</h4>
                <div className="text-[11px] font-semibold text-amber-300 mt-0.5">Dom, Seg & Terça</div>
                <div className="text-[10px] text-slate-400">Sapucaí • LIESA</div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-800/80">
                <span className={`text-[10px] font-bold block text-center py-1 rounded ${
                  especialCompletedCount === especialSchools.length
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : selectedGroup === 'especial'
                    ? 'bg-amber-500 text-slate-950 font-black shadow'
                    : 'bg-slate-900 text-slate-300'
                }`}>
                  {especialCompletedCount === especialSchools.length ? '✓ Concluído' : selectedGroup === 'especial' ? 'Em Foco' : 'Ver Desfiles'}
                </span>
              </div>
            </div>

            {/* 4º a Desfilar: Série Prata */}
            <div
              onClick={() => setSelectedGroup('prata')}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedGroup === 'prata'
                  ? 'bg-slate-900 border-slate-400 ring-2 ring-slate-400/40 shadow-lg'
                  : 'bg-slate-950/70 border-slate-800/90 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-slate-400/20 text-slate-200 border border-slate-400/40">
                    4º A DESFILAR
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {prataCompletedCount === prataSchools.length ? '✓' : `${prataCompletedCount}/${prataSchools.length}`}
                  </span>
                </div>
                <h4 className="text-sm font-black text-white truncate">Série Prata</h4>
                <div className="text-[11px] font-semibold text-slate-300 mt-0.5">Segunda & Terça</div>
                <div className="text-[10px] text-slate-400">Intendente • Superliga</div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-800/80">
                <span className={`text-[10px] font-bold block text-center py-1 rounded ${
                  prataCompletedCount === prataSchools.length
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : selectedGroup === 'prata'
                    ? 'bg-slate-300 text-slate-950 font-black shadow'
                    : 'bg-slate-900 text-slate-300'
                }`}>
                  {prataCompletedCount === prataSchools.length ? '✓ Concluído' : selectedGroup === 'prata' ? 'Em Foco' : 'Ver Desfiles'}
                </span>
              </div>
            </div>

            {/* 5º a Desfilar: Grupo de Avaliação */}
            <div
              onClick={() => setSelectedGroup('avaliacao')}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedGroup === 'avaliacao'
                  ? 'bg-purple-950/50 border-purple-500 ring-2 ring-purple-500/40 shadow-lg'
                  : 'bg-slate-950/70 border-slate-800/90 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    5º A DESFILAR
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {avaliacaoCompletedCount === avaliacaoSchools.length ? '✓' : `${avaliacaoCompletedCount}/${avaliacaoSchools.length}`}
                  </span>
                </div>
                <h4 className="text-sm font-black text-white truncate">Avaliação</h4>
                <div className="text-[11px] font-semibold text-purple-300 mt-0.5">Quarta de Cinzas</div>
                <div className="text-[10px] text-slate-400">Intendente • Superliga</div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-800/80">
                <span className={`text-[10px] font-bold block text-center py-1 rounded ${
                  avaliacaoCompletedCount === avaliacaoSchools.length
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : selectedGroup === 'avaliacao'
                    ? 'bg-purple-600 text-white font-black shadow'
                    : 'bg-slate-900 text-slate-300'
                }`}>
                  {avaliacaoCompletedCount === avaliacaoSchools.length ? '✓ Concluído' : selectedGroup === 'avaliacao' ? 'Em Foco' : 'Ver Desfiles'}
                </span>
              </div>
            </div>
          </div>

          {/* Active Division & League Regulation Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <Scale className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <div>
                <span className="font-bold text-white">
                  Supervisão da {currentLeague.name} ({currentLeague.fullName}):
                </span>{' '}
                <span className="text-slate-300">{DIVISION_REGULATIONS[selectedGroup].rules.componentes.description}</span>{' '}
                <span className="text-amber-400 font-semibold">
                  (Penalidade: {selectedGroup === 'bronze' ? 'de 0,4 a 2,3 pts' : '-0,5 pt por item'})
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setRegulamentoModalDiv(selectedGroup);
                setShowRegulamentoModal(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-[11px] flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition self-end sm:self-auto"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Regulamento & Obrigatoriedades</span>
            </button>
          </div>

          <div className="text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <span>{PARADE_CONFIG[selectedGroup].schedule}</span>
            <span className="font-mono">{PARADE_CONFIG[selectedGroup].minMinutes}–{PARADE_CONFIG[selectedGroup].maxMinutes} minutos</span>
          </div>
        </div>

        {/* Schools Cards Grid for Selected Group - Grouped by Day */}
        {divDays.length > 0 ? (
          <div className="space-y-8">
            {divDays.map((dayKey) => {
              const dayInfo = PARADE_DAYS_ORDER.find((d) => d.id === dayKey);
              const daySlots = (sorteio?.divisions?.[selectedGroup]?.slots || []).filter((s) => s.day === dayKey);
              daySlots.sort((a, b) => a.order - b.order);
              const dayCheck = sorteio?.isCompleted
                ? SorteioEngine.isDayUnlocked(dayKey, sorteio, completedSchoolIds)
                : { unlocked: true };
              const completedInDayCount = daySlots.filter((s) => completedSchoolIds.includes(s.schoolId)).length;
              const isDayFullyCompleted = daySlots.length > 0 && completedInDayCount === daySlots.length;

              return (
                <div key={dayKey} className="space-y-4">
                  {/* Day Header Banner */}
                  <div
                    className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isDayFullyCompleted
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : !dayCheck.unlocked
                        ? 'bg-slate-950/90 border-slate-800'
                        : 'bg-slate-900/90 border-amber-500/40 ring-1 ring-amber-500/20 shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                          isDayFullyCompleted
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : !dayCheck.unlocked
                            ? 'bg-slate-800 text-slate-400 border border-slate-700'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {isDayFullyCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : !dayCheck.unlocked ? (
                          <Lock className="w-5 h-5" />
                        ) : (
                          <Calendar className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-black text-white">
                            {dayInfo?.label || dayKey}
                          </h4>
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                              isDayFullyCompleted
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : !dayCheck.unlocked
                                ? 'bg-slate-800 text-slate-400 border border-slate-700'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                            }`}
                          >
                            {isDayFullyCompleted ? '✓ Noite Concluída' : !dayCheck.unlocked ? '🔒 Bloqueado' : '🔴 Noite em Andamento'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {activeVenue?.name} • {PARADE_CONFIG[selectedGroup].label} ({daySlots.length} agremiações)
                          {!dayCheck.unlocked && dayCheck.reason && (
                            <span className="block text-amber-400 font-medium text-[11px] mt-0.5">
                              {dayCheck.reason}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span className="text-xs font-mono font-bold text-slate-300">
                        {completedInDayCount} / {daySlots.length} Desfilaram
                      </span>
                    </div>
                  </div>

                  {/* Grid of schools for this day */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {daySlots.map((slot) => {
                      const sch = displayedGroupSchools.find((s) => s.id === slot.schoolId);
                      if (!sch) return null;

                      const isCompleted = completedSchoolIds.includes(sch.id);
                      const isUser = userSchool?.id === sch.id;
                      const scoreData = getScoreDataForSchool(sch.id);
                      const report = generateParadeReport(sch, scoreData);
                      const isViewingReport = viewingReportSchoolId === sch.id;
                      const schoolLock = sorteio?.isCompleted
                        ? SorteioEngine.isSchoolUnlocked(sch.id, sorteio, completedSchoolIds)
                        : { unlocked: true };
                      const isNextInLine = nextPendingSchool?.id === sch.id;

                      return (
                        <div
                          key={sch.id}
                          className={`rounded-2xl border p-5 transition-all duration-200 flex flex-col justify-between gap-4 ${
                            isUser
                              ? 'bg-slate-900/90 border-amber-500/50 ring-1 ring-amber-400/30'
                              : isNextInLine && !isCompleted
                              ? 'bg-slate-900/95 border-amber-400 ring-2 ring-amber-400/60 shadow-xl shadow-amber-500/20'
                              : isCompleted
                              ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                              : !schoolLock.unlocked
                              ? 'bg-slate-950/70 border-slate-800/80'
                              : 'bg-slate-950/80 border-slate-800 hover:border-amber-500/30'
                          }`}
                        >
                          {/* Header: School info & Status Badge */}
                          <div className="space-y-3">
                            {/* Order & Reason Pill */}
                            <div className="flex items-center justify-between gap-2 text-[10px]">
                              <span
                                className={`px-2 py-0.5 rounded font-black font-mono flex items-center gap-1 ${
                                  isCompleted
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : isNextInLine
                                    ? 'bg-amber-500 text-slate-950 font-black shadow'
                                    : !schoolLock.unlocked
                                    ? 'bg-slate-800 text-slate-400 border border-slate-700'
                                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                }`}
                              >
                                <span>{slot.order}ª a Desfilar</span>
                              </span>

                              <span
                                className={`font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0 ${
                                  isCompleted
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                    : isNextInLine
                                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50 animate-pulse font-black'
                                    : !schoolLock.unlocked
                                    ? 'bg-slate-900 text-slate-400 border border-slate-800'
                                    : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                                }`}
                              >
                                {isCompleted ? (
                                  <>
                                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                    <span>Desfilou</span>
                                  </>
                                ) : isNextInLine ? (
                                  <>
                                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                                    <span>PRÓXIMA NA PISTA</span>
                                  </>
                                ) : !schoolLock.unlocked ? (
                                  <>
                                    <Lock className="w-3 h-3 text-slate-400" />
                                    <span>Aguardando Vez</span>
                                  </>
                                ) : (
                                  <>
                                    <Clock className="w-3 h-3 text-amber-400" />
                                    <span>Liberada</span>
                                  </>
                                )}
                              </span>
                            </div>

                            {slot.reason && (
                              <div className="text-[10px] text-amber-300/90 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20 italic">
                                📌 {slot.reason}
                              </div>
                            )}

                            <div className="flex items-center gap-3 pt-1">
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow border shrink-0"
                                style={{
                                  backgroundColor: sch.colors.primary,
                                  color: sch.colors.text,
                                  borderColor: sch.colors.border || '#fff'
                                }}
                              >
                                {sch.shortName.charAt(0)}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <h4 className="font-bold text-white text-sm hover:text-amber-300 transition truncate">
                                    {cleanSchoolName(sch)}
                                  </h4>
                                  {isUser && (
                                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-500 text-slate-950">
                                      Sua Escola
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-slate-400 truncate">
                                  {sch.nickname} • Bairro: {sch.neighborhood}
                                </div>
                              </div>
                            </div>

                            {/* Enredo Info */}
                            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-1">
                              <div className="text-[10px] text-slate-400 uppercase font-semibold">Enredo Oficial</div>
                              <div className="text-xs font-bold text-amber-300 truncate">
                                "{sch.currentEnredo?.title || 'Enredo Consagrado'}"
                              </div>
                              <div className="text-[10px] text-slate-400 line-clamp-2">
                                {sch.currentEnredo?.synopsis}
                              </div>
                            </div>

                            {/* Enredo Script & Logistics Action Buttons */}
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => setScriptModalSchool(sch)}
                                className="py-1.5 px-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-[11px] font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                                title="Ver Roteiro Oficial do Desfile (Livro Abre-Alas com alas, alegorias, comissão e tripés)"
                              >
                                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                                <span>Roteiro do Enredo</span>
                              </button>
                              <button
                                onClick={() => setLogisticsModalSchool(sch)}
                                className="py-1.5 px-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-blue-300 border border-blue-500/30 text-[11px] font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                                title="Ver Relatório de Logística, Deslocamento e Interferência da Posição de Desfile"
                              >
                                <Truck className="w-3.5 h-3.5 text-blue-400" />
                                <span>Logística & Ordem</span>
                              </button>
                            </div>

                            {/* Lock Warning if locked */}
                            {!isCompleted && !schoolLock.unlocked && (
                              <div className="text-[10px] text-slate-300 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 flex items-start gap-2">
                                <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                                <span>{schoolLock.reason}</span>
                              </div>
                            )}

                            {/* Staff Pills */}
                            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300">
                              <div className="truncate">
                                <span className="text-slate-500">Carnavalesco:</span> {sch.staff.carnavalesco.name}
                              </div>
                              <div className="truncate">
                                <span className="text-slate-500">Mestre Bateria:</span> {sch.staff.mestreBateria.name}
                              </div>
                              <div className="truncate">
                                <span className="text-slate-500">Intérprete:</span> {sch.staff.interprete.name}
                              </div>
                              <div className="truncate">
                                <span className="text-slate-500">1º Casal:</span> {sch.staff.mestreSalaPortaBandeira.name}
                              </div>
                            </div>

                            {/* Performance Report Summary (If Completed) */}
                            {isCompleted && (
                              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-3 space-y-1.5 animate-fadeIn">
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-bold text-emerald-300 flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                                    <span>{report.verdictTitle}</span>
                                  </span>
                                  <span className="text-[10px] font-mono text-emerald-400 font-bold">
                                    {scoreData?.paradeTimeMinutes || getParadeDuration(sch, currentYear)} min
                                  </span>
                                </div>
                                {scoreData?.penalties && scoreData.penalties > 0 ? (
                                  <div className="text-[10px] font-bold text-rose-300 bg-rose-950/60 px-2 py-1 rounded border border-rose-700/60 space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span>
                                        ⚠️ {scoreData.timePenalty && scoreData.timePenalty > 0
                                          ? (scoreData.timeStatus === 'estouro' ? `Estouro (+${scoreData.timeDifferenceMinutes}m)` : `Abaixo (-${scoreData.timeDifferenceMinutes}m)`)
                                          : 'Infração de Regulamento'}
                                      </span>
                                      <span className="font-mono text-rose-200">Total: -{scoreData.penalties.toFixed(1)} pts</span>
                                    </div>
                                    {scoreData.technicalPenalty && scoreData.technicalPenalty > 0 ? (
                                      <div className="text-[9px] font-medium text-rose-300/90">
                                        Obrigatoriedades: -{scoreData.technicalPenalty.toFixed(1)} pts
                                        {scoreData.infractions && scoreData.infractions.length > 0 && ` (${scoreData.infractions.map(i => i.ruleName).join(', ')})`}
                                      </div>
                                    ) : null}
                                  </div>
                                ) : (
                                  <div className="text-[10px] font-medium text-emerald-400/90 flex items-center justify-between bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-800/30">
                                    <span className="flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                      <span>Tempo & Obrigatoriedades cumpridos</span>
                                    </span>
                                    <span className="font-mono font-bold">0.0 penalidade</span>
                                  </div>
                                )}
                                <p className="text-[11px] text-slate-300 leading-snug">
                                  {report.criticaSummary}
                                </p>

                                {/* Detailed report accordion */}
                                {isViewingReport && (
                                  <div className="pt-2 mt-2 border-t border-emerald-500/20 space-y-1.5 text-[10px] text-slate-300">
                                    <div><strong>🥁 Bateria:</strong> {report.highlights.bateria}</div>
                                    <div><strong>🎭 Comissão:</strong> {report.highlights.comissao}</div>
                                    <div><strong>💃 Casal:</strong> {report.highlights.casal}</div>
                                    <div><strong>🎤 Canto:</strong> {report.highlights.harmonia}</div>
                                    <div><strong>🏰 Alegorias:</strong> {report.highlights.alegorias}</div>
                                    <div><strong>⏱️ Evolução:</strong> {report.highlights.evolucao}</div>
                                    {report.highlights.obrigatoriedades && (
                                      <div><strong>📋 Vistoria de Pista:</strong> {report.highlights.obrigatoriedades}</div>
                                    )}
                                  </div>
                                )}

                                <button
                                  onClick={() => setViewingReportSchoolId(isViewingReport ? null : sch.id)}
                                  className="text-[10px] text-amber-400 hover:underline font-bold flex items-center gap-1 pt-1 cursor-pointer"
                                >
                                  <Eye className="w-3 h-3" />
                                  <span>{isViewingReport ? 'Ocultar Detalhes Técnicos' : 'Ver Relatório Completo dos Jurados'}</span>
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Actions Footer */}
                          <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
                            {!isCompleted ? (
                              schoolLock.unlocked ? (
                                <>
                                  <button
                                    onClick={() => handleLaunchLiveParade(sch)}
                                    className={`flex-1 py-2 px-3 rounded-xl font-black text-xs transition flex items-center justify-center gap-1.5 shadow cursor-pointer ${
                                      isNextInLine
                                        ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-slate-950 shadow-amber-500/30 ring-2 ring-amber-400 animate-pulse'
                                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                                    }`}
                                  >
                                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                                    <span>Assistir ao Vivo</span>
                                  </button>

                                  <button
                                    onClick={() => handleSimulateSingleSchool(sch)}
                                    className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs transition border border-slate-700 flex items-center gap-1 cursor-pointer"
                                    title="Simular desfile instantaneamente"
                                  >
                                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                                    <span>Simular</span>
                                  </button>
                                </>
                              ) : (
                                <div className="w-full py-2 px-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-400 text-xs font-semibold flex items-center justify-center gap-1.5">
                                  <Lock className="w-3.5 h-3.5 text-amber-400/80" />
                                  <span>Aguardando Turno Oficial</span>
                                </div>
                              )
                            ) : (
                              <div className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-between shadow-inner">
                                <span className="flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>Desfile Concluído & Homologado</span>
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">Lacrado pela {currentLeague.name}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Sorteio da {PARADE_CONFIG[selectedGroup].label} Ainda Não Realizado</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                A ordem e os dias de desfile deste grupo ainda não foram definidos no globo oficial. Realize o sorteio para liberar a passarela para as agremiações.
              </p>
            </div>
            {onNavigateToSorteio && (
              <button
                onClick={onNavigateToSorteio}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 mx-auto cursor-pointer shadow-lg shadow-amber-500/20 transition"
              >
                <Dices className="w-4 h-4" />
                <span>Ir para o Sorteio da Ordem</span>
              </button>
            )}
          </div>
        )}
      </div>

      {showRegulamentoModal && (
        <RegulamentoObrigatoriedadesModal
          initialDivision={regulamentoModalDiv}
          onClose={() => setShowRegulamentoModal(false)}
        />
      )}

      {scriptModalSchool && (
        <ParadeScriptModal
          school={scriptModalSchool}
          division={scriptModalSchool.division}
          slot={schoolSlotMap.get(scriptModalSchool.id)}
          onClose={() => setScriptModalSchool(null)}
        />
      )}

      {logisticsModalSchool && (
        <ParadeLogisticsModal
          school={logisticsModalSchool}
          slot={schoolSlotMap.get(logisticsModalSchool.id)}
          onClose={() => setLogisticsModalSchool(null)}
        />
      )}
    </div>
  );
};
