import React, { useState, useEffect, useRef } from 'react';
import { School, DivisionId, SchoolParadeScores } from '../types/carnaval';
import { Play, Pause, FastForward, CheckCircle, Sparkles, Volume2, ArrowRight, Trophy, Zap, ChevronRight, CheckCircle2, RotateCcw, Eye, Clock, Star } from 'lucide-react';
import { soundService } from '../services/soundService';
import { generateParadeReport, ParadeReport } from '../utils/paradeReports';

interface DesfileSimulatorProps {
  currentYear: number;
  userSchool: School | null;
  schools: School[];
  especialSchools: School[];
  ouroSchools: School[];
  prataSchools: School[];
  bronzeSchools: School[];
  especialScores: SchoolParadeScores[];
  ouroScores: SchoolParadeScores[];
  prataScores: SchoolParadeScores[];
  bronzeScores: SchoolParadeScores[];
  completedSchoolIds: string[];
  onCompleteParade: (schoolId: string) => void;
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
  especialScores,
  ouroScores,
  prataScores,
  bronzeScores,
  completedSchoolIds,
  onCompleteParade,
  onCompleteParadesForDivision,
  onCompleteAllParades,
  onNavigateToApuracao
}) => {
  // Navigation within parades tab
  const [selectedGroup, setSelectedGroup] = useState<DivisionId>('especial');
  const [activeParadeSchool, setActiveParadeSchool] = useState<School | null>(null);
  const [viewingReportSchoolId, setViewingReportSchoolId] = useState<string | null>(null);

  // Live runway simulator states
  const [minute, setMinute] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [events, setEvents] = useState<ParadeEvent[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Completed counts
  const totalSchools = schools.length;
  const totalCompleted = completedSchoolIds.length;
  const isAllCarnavalCompleted = totalSchools > 0 && totalCompleted >= totalSchools;

  const especialCompletedCount = especialSchools.filter((s) => completedSchoolIds.includes(s.id)).length;
  const ouroCompletedCount = ouroSchools.filter((s) => completedSchoolIds.includes(s.id)).length;
  const prataCompletedCount = prataSchools.filter((s) => completedSchoolIds.includes(s.id)).length;
  const bronzeCompletedCount = bronzeSchools.filter((s) => completedSchoolIds.includes(s.id)).length;

  const getScoreDataForSchool = (schoolId: string): SchoolParadeScores | undefined => {
    return (
      especialScores.find((s) => s.schoolId === schoolId) ||
      ouroScores.find((s) => s.schoolId === schoolId) ||
      prataScores.find((s) => s.schoolId === schoolId) ||
      bronzeScores.find((s) => s.schoolId === schoolId)
    );
  };

  // Generate dynamic parade script for a school
  const getParadeScript = (sch: School): ParadeEvent[] => {
    const enredoTitle = sch.currentEnredo?.title || 'o Enredo Oficial da Temporada';
    return [
      {
        minute: 2,
        sector: 'Setor 1 (Armação & Entrada)',
        description: `A ${sch.name} entra na passarela do samba! O intérprete ${sch.staff.interprete.name} solta o grito de guerra clássico e a galera responde nas arquibancadas!`,
        type: 'highlight'
      },
      {
        minute: 12,
        sector: 'Cabine 1 (Setores 2 e 3)',
        description: `Apresentação impactante da Comissão de Frente concebida por ${sch.staff.coreografo.name}. Efeito cênico impecável aplaudido de pé pelos primeiros jurados!`,
        type: 'comissao'
      },
      {
        minute: 24,
        sector: 'Setores 5 e 6 (Balcões Centrais)',
        description: `O monumental Carro Abre-Alas passa com as cores ${sch.colors.primary} e ${sch.colors.secondary}. O carnavalesco ${sch.staff.carnavalesco.name} apostou em iluminação deslumbrante!`,
        type: 'alegoria'
      },
      {
        minute: 36,
        sector: 'Cabine 2 (Setor 7)',
        description: `O 1º Casal de Mestre-Sala e Porta-Bandeira ${sch.staff.mestreSalaPortaBandeira.name} reverencia a cabine com giros perfeitos, desfraldando o pavilhão sagrado com maestria.`,
        type: 'casal'
      },
      {
        minute: 48,
        sector: 'Segundo Recuo de Bateria (Setor 9)',
        description: `Momento épico! O ${sch.staff.mestreBateria.name} comanda uma paradinha antológica na entrada do recuo. Os tamborins e caixas sustentam a melodia de '${enredoTitle}'!`,
        type: 'bateria'
      },
      {
        minute: 60,
        sector: 'Cabines 3 e 4 (Setor 10)',
        description: `Harmonia e evolução impecáveis na reta final. As alas da comunidade sustentam o canto sem correr, garantindo o ritmo contagiante na passagem pelos últimos jurados.`,
        type: 'highlight'
      },
      {
        minute: 68,
        sector: 'Praça da Apoteose (Dispersão)',
        description: `A última alegoria cruza a linha final aos 68 minutos de desfile! Portões fechados com rigor e aplausos efusivos na Apoteose!`,
        type: 'finish'
      }
    ];
  };

  // Start watching a school's live runway parade
  const handleLaunchLiveParade = (school: School) => {
    setActiveParadeSchool(school);
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
      setMinute((prev) => {
        if (prev >= 70) return 70;
        return prev + 1;
      });
    }, 450 / speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, isFinished, activeParadeSchool, speed]);

  // Handle milestones and completion when minute advances
  useEffect(() => {
    if (!activeParadeSchool || minute === 0) return;

    if (minute % 4 === 0) {
      soundService.playSurdoBeat();
    }

    const script = getParadeScript(activeParadeSchool);
    const matchEvent = script.find((e) => e.minute === minute);
    if (matchEvent) {
      setEvents((cur) => {
        if (cur.some((e) => e.minute === matchEvent.minute)) return cur;
        return [matchEvent, ...cur];
      });
      soundService.playScoreRevealTone(10.0);
    }

    if (minute >= 70 && !isFinished) {
      setIsFinished(true);
      setIsPlaying(false);
      soundService.playChampionFanfare();
      onCompleteParade(activeParadeSchool.id);
    }
  }, [minute, isFinished, activeParadeSchool, onCompleteParade]);

  const handleSkipToEnd = () => {
    if (!activeParadeSchool) return;
    setMinute(70);
    const script = getParadeScript(activeParadeSchool);
    setEvents([...script].reverse());
    setIsFinished(true);
    setIsPlaying(false);
    soundService.playChampionFanfare();
    onCompleteParade(activeParadeSchool.id);
  };

  // Find next pending school to watch
  const handleWatchNextPending = () => {
    const nextSchool = schools.find((s) => !completedSchoolIds.includes(s.id));
    if (nextSchool) {
      handleLaunchLiveParade(nextSchool);
    }
  };

  // Simulate an individual school parade instantly
  const handleSimulateSingleSchool = (sch: School) => {
    onCompleteParade(sch.id);
    setViewingReportSchoolId(sch.id);
    soundService.playGavel();
  };

  const currentSector =
    minute < 10
      ? 'Setor 1 / Armação'
      : minute < 25
      ? 'Cabine de Jurados 1 (Setores 2/3)'
      : minute < 40
      ? 'Setores 5 e 6 / Balcões'
      : minute < 55
      ? 'Cabine 2 & Recuo de Bateria (Setores 9/11)'
      : minute < 67
      ? 'Cabines 3 e 4 (Setor 10)'
      : 'Praça da Apoteose / Dispersão';

  const displayedGroupSchools =
    selectedGroup === 'especial'
      ? especialSchools
      : selectedGroup === 'ouro'
      ? ouroSchools
      : selectedGroup === 'prata'
      ? prataSchools
      : bronzeSchools;

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Header & Global Parades Status */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                🔴 PASSALERA DO SAMBA • CARNAVAL {currentYear}
              </span>
              <span className="text-xs text-slate-400">
                Marquês de Sapucaí & Intendente Magalhães
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Desfiles Oficiais das Agremiações
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
              Assista e simule os desfiles de todos os 4 grupos (Especial, Ouro, Prata e Bronze) para acompanhar como cada escola se saiu. A apuração só é liberada após a conclusão dos desfiles!
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
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span className={especialCompletedCount === especialSchools.length ? 'text-emerald-400 font-bold' : ''}>
                Esp: {especialCompletedCount}/{especialSchools.length}
              </span>
              <span className={ouroCompletedCount === ouroSchools.length ? 'text-emerald-400 font-bold' : ''}>
                Ouro: {ouroCompletedCount}/{ouroSchools.length}
              </span>
              <span className={prataCompletedCount === prataSchools.length ? 'text-emerald-400 font-bold' : ''}>
                Prata: {prataCompletedCount}/{prataSchools.length}
              </span>
            </div>
          </div>
        </div>

        {/* Global Batch Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2">
            {!isAllCarnavalCompleted && (
              <button
                onClick={handleWatchNextPending}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Assistir Próximo Desfile da Lista</span>
              </button>
            )}

            {!isAllCarnavalCompleted && (
              <button
                onClick={() => onCompleteParadesForDivision(selectedGroup)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs transition border border-slate-700 flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Simular Todos da {selectedGroup === 'especial' ? 'Série Especial' : selectedGroup === 'ouro' ? 'Série Ouro' : 'Série Prata'}</span>
              </button>
            )}

            {!isAllCarnavalCompleted && (
              <button
                onClick={onCompleteAllParades}
                className="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-black text-xs transition flex items-center gap-1.5 shadow cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Simular Todos os Desfiles dos 3 Grupos (Completo)</span>
              </button>
            )}

            {isAllCarnavalCompleted && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Todos os 53 Desfiles Concluídos com Sucesso!</span>
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
            As agremiações do <strong>Grupo Especial</strong>, da <strong>Série Ouro</strong> e da <strong>Série Prata</strong> cruzaram a Marquês de Sapucaí e a Estrada Intendente Magalhães!
            Os 36 jurados lacraram os envelopes. Siga agora para a <strong>Apuração Oficial na Praça da Apoteose</strong> para revelar as notas e consagrar as campeãs!
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
                    🔴 AO VIVO NA MARQUÊS DE SAPUCAÍ • CARNAVAL {currentYear}
                  </span>
                  <span className="text-xs text-white/80 font-semibold">
                    {activeParadeSchool.division === 'especial'
                      ? 'Grupo Especial'
                      : activeParadeSchool.division === 'ouro'
                      ? 'Série Ouro'
                      : 'Série Prata (Superliga)'}
                  </span>
                </div>
                <h2 className="text-3xl font-black text-white mt-1">
                  {activeParadeSchool.name}
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
              </div>

              <div className="flex items-center gap-4 bg-black/60 px-5 py-3 rounded-2xl border border-white/10 self-start md:self-auto">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                    Cronômetro Oficial
                  </div>
                  <div
                    className={`text-3xl font-black font-mono ${
                      minute > 65 ? 'text-amber-400' : 'text-emerald-400'
                    }`}
                  >
                    {minute.toString().padStart(2, '0')}:00{' '}
                    <span className="text-xs text-slate-400 font-normal">/ 70 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Runway Progress Visualizer */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Posição da Agremiação na Pista da Sapucaí:
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
                  style={{ width: `${(minute / 70) * 100}%` }}
                />
              </div>

              {/* Sector Checkpoints */}
              <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
                <span>Setor 1</span>
                <span>Cabine 1</span>
                <span>Balcões</span>
                <span>Recuo Bateria</span>
                <span>Cabine 3/4</span>
                <span>Apoteose</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                {!isPlaying ? (
                  <button
                    disabled={isFinished}
                    onClick={() => {
                      setIsPlaying(true);
                      soundService.playGavel();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>{minute === 0 ? 'Dar a Partida no Desfile' : 'Continuar'}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center gap-2"
                  >
                    <Pause className="w-4 h-4" />
                    <span>Pausar</span>
                  </button>
                )}

                <button
                  disabled={isFinished}
                  onClick={handleSkipToEnd}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <FastForward className="w-4 h-4" />
                  <span>Pular para o Fim</span>
                </button>

                <button
                  onClick={() => setActiveParadeSchool(null)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold transition"
                >
                  Fechar Visualizador
                </button>
              </div>

              {/* Speed Selector */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
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
                Pressione "Dar a Partida no Desfile" para que a agremiação inicie a apresentação na Marquês de Sapucaí!
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
                  <span>Desfile da {activeParadeSchool.name} Concluído com Sucesso!</span>
                </div>
                <p className="text-xs text-slate-300 max-w-lg mx-auto">
                  Os 36 jurados (4 por quesito) já entregaram as notas em envelopes lacrados para a apuração oficial.
                </p>

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

      {/* SCHEDULE & GROUPS TABS */}
      <div className="space-y-4">
        {/* Group Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedGroup('especial')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                selectedGroup === 'especial'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>Grupo Especial</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  especialCompletedCount === especialSchools.length
                    ? 'bg-emerald-500 text-slate-950'
                    : selectedGroup === 'especial'
                    ? 'bg-slate-900 text-slate-300'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {especialCompletedCount} / {especialSchools.length}
              </span>
            </button>

            <button
              onClick={() => setSelectedGroup('ouro')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                selectedGroup === 'ouro'
                  ? 'bg-blue-500 text-white font-black shadow-md shadow-blue-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>Série Ouro</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  ouroCompletedCount === ouroSchools.length
                    ? 'bg-emerald-500 text-slate-950'
                    : selectedGroup === 'ouro'
                    ? 'bg-blue-900 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {ouroCompletedCount} / {ouroSchools.length}
              </span>
            </button>

            <button
              onClick={() => setSelectedGroup('prata')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                selectedGroup === 'prata'
                  ? 'bg-slate-300 text-slate-950 font-black shadow-md shadow-slate-300/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>Série Prata (Superliga)</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  prataCompletedCount === prataSchools.length
                    ? 'bg-emerald-500 text-slate-950'
                    : selectedGroup === 'prata'
                    ? 'bg-slate-400 text-slate-950'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {prataCompletedCount} / {prataSchools.length}
              </span>
            </button>

            <button
              onClick={() => setSelectedGroup('bronze')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                selectedGroup === 'bronze'
                  ? 'bg-amber-700 text-amber-100 font-black shadow-md shadow-amber-800/30 ring-1 ring-amber-500'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>Série Bronze (Superliga)</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  bronzeCompletedCount === bronzeSchools.length
                    ? 'bg-emerald-500 text-slate-950'
                    : selectedGroup === 'bronze'
                    ? 'bg-amber-900 text-amber-200'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {bronzeCompletedCount} / {bronzeSchools.length}
              </span>
            </button>
          </div>

          <div className="text-xs text-slate-400">
            {selectedGroup === 'especial'
              ? 'Sambódromo Marquês de Sapucaí • Domingo e Segunda de Carnaval'
              : selectedGroup === 'ouro'
              ? 'Sambódromo Marquês de Sapucaí • Sexta e Sábado de Carnaval'
              : selectedGroup === 'prata'
              ? 'Estrada Intendente Magalhães • Terça-Feira de Carnaval'
              : 'Estrada Intendente Magalhães • Quarta-Feira / Desfile da Superliga Bronze'}
          </div>
        </div>

        {/* Schools Cards Grid for Selected Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedGroupSchools.map((sch, index) => {
            const isCompleted = completedSchoolIds.includes(sch.id);
            const isUser = userSchool?.id === sch.id;
            const scoreData = getScoreDataForSchool(sch.id);
            const report = generateParadeReport(sch, scoreData);
            const isViewingReport = viewingReportSchoolId === sch.id;

            return (
              <div
                key={sch.id}
                className={`rounded-2xl border p-5 transition-all duration-200 flex flex-col justify-between gap-4 ${
                  isUser
                    ? 'bg-slate-900/90 border-amber-500/50 ring-1 ring-amber-400/30'
                    : isCompleted
                    ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-950/80 border-slate-800 hover:border-amber-500/30'
                }`}
              >
                {/* Header: School info & Status Badge */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow border flex-shrink-0"
                        style={{
                          backgroundColor: sch.colors.primary,
                          color: sch.colors.text,
                          borderColor: sch.colors.border || '#fff'
                        }}
                      >
                        {sch.shortName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-white text-sm hover:text-amber-300 transition">
                            {sch.name}
                          </h4>
                          {isUser && (
                            <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-500 text-slate-950">
                              Sua Escola
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {sch.nickname} • Bairro: {sch.neighborhood}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 flex items-center gap-1 ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      <span>{isCompleted ? 'Desfilou' : 'Aguardando'}</span>
                    </span>
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
                          {report.timeMinutes} min
                        </span>
                      </div>
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
                        </div>
                      )}

                      <button
                        onClick={() => setViewingReportSchoolId(isViewingReport ? null : sch.id)}
                        className="text-[10px] text-amber-400 hover:underline font-bold flex items-center gap-1 pt-1"
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
                    <>
                      <button
                        onClick={() => handleLaunchLiveParade(sch)}
                        className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-1.5 shadow cursor-pointer"
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
                    <button
                      onClick={() => handleLaunchLiveParade(sch)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                      <span>Reassistir Apresentação na Avenida</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
