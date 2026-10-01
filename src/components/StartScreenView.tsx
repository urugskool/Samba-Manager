import React, { useState } from 'react';
import { School, DivisionId } from '../types/carnaval';
import { getSchoolConsolidatedStats } from '../data/carnavalData';
import {
  cleanSchoolName,
  getSchoolCorporateName,
  getSchoolDenomination
} from '../utils/schoolNameUtils';
import {
  Trophy,
  Shield,
  Sparkles,
  Users,
  Compass,
  ArrowRight,
  Search,
  Award,
  Crown,
  CheckCircle2,
  Calendar,
  Music,
  Coins,
  Heart,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';
import { soundService } from '../services/soundService';

interface StartScreenViewProps {
  currentYear: number;
  especialSchools: School[];
  ouroSchools: School[];
  prataSchools: School[];
  bronzeSchools: School[];
  avaliacaoSchools?: School[];
  allSchools: School[];
  onStartGame: (selectedSchoolId: string | null, managerName: string) => void;
  onResetSave?: () => void;
  initialSchoolId?: string | null;
  initialSpectator?: boolean;
}

export const StartScreenView: React.FC<StartScreenViewProps> = ({
  currentYear,
  especialSchools,
  ouroSchools,
  prataSchools,
  bronzeSchools,
  avaliacaoSchools = [],
  allSchools,
  onStartGame,
  onResetSave,
  initialSchoolId = null,
  initialSpectator = false
}) => {
  const [mode, setMode] = useState<'manage' | 'spectator'>(initialSpectator ? 'spectator' : 'manage');
  const [selectedDivision, setSelectedDivision] = useState<DivisionId>('especial');
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>(
    initialSchoolId || especialSchools[0]?.id || 'portela'
  );
  const [managerName, setManagerName] = useState<string>(
    initialSpectator ? 'Presidente da LIGA' : 'Diretor Presidente'
  );
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showResetModal, setShowResetModal] = useState<boolean>(false);

  // Active division school list
  const activeDivisionSchools =
    selectedDivision === 'especial'
      ? especialSchools
      : selectedDivision === 'ouro'
      ? ouroSchools
      : selectedDivision === 'prata'
      ? prataSchools
      : selectedDivision === 'bronze'
      ? bronzeSchools
      : avaliacaoSchools;

  const totalSchoolsCount =
    especialSchools.length + ouroSchools.length + prataSchools.length + bronzeSchools.length + avaliacaoSchools.length;

  // Filtered schools by search
  const filteredSchools = activeDivisionSchools.filter((s) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      s.name.toLowerCase().includes(term) ||
      s.shortName.toLowerCase().includes(term) ||
      s.neighborhood.toLowerCase().includes(term) ||
      s.nickname.toLowerCase().includes(term)
    );
  });

  // Current selected school object
  const currentSchool =
    allSchools.find((s) => s.id === selectedSchoolId) ||
    activeDivisionSchools[0] ||
    especialSchools[0];

  const handleStartCareer = () => {
    soundService.playGavel();
    onStartGame(selectedSchoolId, managerName.trim() || 'Diretor Presidente');
  };

  const handleStartSpectator = () => {
    soundService.playGavel();
    onStartGame(null, managerName.trim() || 'Presidente da LIGA');
  };

  const stats = currentSchool ? getSchoolConsolidatedStats(currentSchool) : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Banner / Hero Header with Sambódromo backdrop */}
      <div className="relative overflow-hidden border-b border-slate-800 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/carnaval_start_hero_1790462574938.jpg"
            alt="Sambódromo Marquês de Sapucaí"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500 text-slate-950">
                LIESA • LIGA RJ • SUPERLIGA
              </span>
              <span className="text-xs font-semibold text-amber-300">
                Temporada Oficial do Carnaval {currentYear}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-300 font-mono">{totalSchoolsCount} Agremiações · 5 Divisões</span>
              {onResetSave && (
                <button
                  onClick={() => setShowResetModal(true)}
                  className="ml-auto text-xs px-3 py-1 rounded-lg bg-rose-950/70 hover:bg-rose-900/90 text-rose-300 border border-rose-500/40 transition flex items-center gap-1.5 cursor-pointer font-bold shadow"
                  title="Reiniciar todo o jogo e criar um novo save em 2027"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                  <span>Reiniciar Jogo (Novo Save)</span>
                </button>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              SAMBA MANAGER
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              O simulador definitivo do Carnaval Carioca estilo manager. Escolha uma agremiação para comandar
              no <strong>Grupo Especial</strong>, na <strong>Série Ouro</strong>, na <strong>Série Prata</strong>, na <strong>Série Bronze</strong> ou no <strong>Grupo de Avaliação</strong>,
              ou assuma a <strong>Presidência da LIGA</strong> no Modo Observador para acompanhar os desfiles e comandar a apuração oficial!
            </p>
          </div>

          {/* Mode Selector Tabs (Big cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 max-w-2xl">
            <button
              onClick={() => {
                setMode('manage');
                if (managerName === 'Presidente da LIGA') setManagerName('Diretor Presidente');
              }}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all flex items-start gap-4 cursor-pointer ${
                mode === 'manage'
                  ? 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-400/50 shadow-xl shadow-amber-500/10'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
              }`}
            >
              <div
                className={`p-3 rounded-xl flex-shrink-0 ${
                  mode === 'manage' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                }`}
              >
                <Shield className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-white text-base">Comandar uma Escola</h3>
                  {mode === 'manage' && (
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                      Selecionado
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-snug">
                  Assuma a presidência, contrate a equipe, gerencie o barracão, conduza os ensaios e desfile na Sapucaí em busca do título.
                </p>
              </div>
            </button>

            <button
              onClick={() => {
                setMode('spectator');
                if (managerName === 'Diretor Presidente') setManagerName('Presidente da LIGA');
              }}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all flex items-start gap-4 cursor-pointer ${
                mode === 'spectator'
                  ? 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-400/50 shadow-xl shadow-amber-500/10'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
              }`}
            >
              <div
                className={`p-3 rounded-xl flex-shrink-0 ${
                  mode === 'spectator' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                }`}
              >
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-white text-base">Modo Observador</h3>
                  {mode === 'spectator' && (
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                      Selecionado
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-snug">
                  Atue como Presidente da LIGA: assista e simule os desfiles das 5 divisões e comande a leitura das notas na Apoteose.
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-8 ${mode === 'manage' ? 'pb-28 lg:pb-8' : ''}`}>
        {mode === 'manage' ? (
          <div className="space-y-8">
            {/* Step 1: Manager Name Input */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-3">
              <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider">
                1. Identificação do Diretor / Presidente da Escola:
              </label>
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <input
                  type="text"
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                  placeholder="Seu nome ou cargo (Ex: Laíla, Pamplona, Diretor de Carnaval)..."
                  className="flex-1 bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-3 text-base sm:text-sm text-white font-semibold outline-none transition"
                />
                <span className="text-xs text-slate-400 self-center">
                  Você comandará as decisões técnicas e financeiras da agremiação escolhida.
                </span>
              </div>
            </div>

            {/* Step 2: Division and School Selection */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-white">
                    2. Escolha a Agremiação que Deseja Comandar
                  </h2>
                  <p className="text-xs text-slate-400">
                    Selecione entre as {especialSchools.length} escolas do Especial, {ouroSchools.length} da Série Ouro, {prataSchools.length} da Série Prata ou {bronzeSchools.length} da Série Bronze (Carnaval {currentYear}).
                  </p>
                </div>

                {/* Division Tabs */}
                <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl max-w-full">
                  <button
                    onClick={() => {
                      setSelectedDivision('especial');
                      setSelectedSchoolId(especialSchools[0]?.id || '');
                    }}
                    className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 sm:gap-2 shrink-0 ${
                      selectedDivision === 'especial'
                        ? 'bg-amber-500 text-slate-950 font-black shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>Grupo Especial</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950/20 font-mono">
                      {especialSchools.length}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedDivision('ouro');
                      setSelectedSchoolId(ouroSchools[0]?.id || '');
                    }}
                    className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 sm:gap-2 shrink-0 ${
                      selectedDivision === 'ouro'
                        ? 'bg-blue-500 text-white font-black shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>Série Ouro</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950/20 font-mono">
                      {ouroSchools.length}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedDivision('prata');
                      setSelectedSchoolId(prataSchools[0]?.id || '');
                    }}
                    className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 sm:gap-2 shrink-0 ${
                      selectedDivision === 'prata'
                        ? 'bg-slate-300 text-slate-950 font-black shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>Série Prata</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950/20 font-mono">
                      {prataSchools.length}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedDivision('bronze');
                      setSelectedSchoolId(bronzeSchools[0]?.id || '');
                    }}
                    className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 sm:gap-2 shrink-0 ${
                      selectedDivision === 'bronze'
                        ? 'bg-amber-700 text-amber-100 font-black shadow ring-1 ring-amber-500'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>Série Bronze</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950/20 font-mono">
                      {bronzeSchools.length}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedDivision('avaliacao');
                      setSelectedSchoolId(avaliacaoSchools[0]?.id || '');
                    }}
                    className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 sm:gap-2 shrink-0 ${
                      selectedDivision === 'avaliacao'
                        ? 'bg-purple-600 text-white font-black shadow ring-1 ring-purple-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>Grupo de Avaliação</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950/20 font-mono">
                      {avaliacaoSchools.length}
                    </span>
                  </button>
                </div>
              </div>

              {/* Search Filter Box */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={`Filtrar escolas da ${
                    selectedDivision === 'especial'
                      ? 'Série Especial'
                      : selectedDivision === 'ouro'
                      ? 'Série Ouro'
                      : selectedDivision === 'prata'
                      ? 'Série Prata'
                      : selectedDivision === 'bronze'
                      ? 'Série Bronze'
                      : 'Grupo de Avaliação'
                  } por nome ou bairro...`}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-amber-400 pl-10 pr-4 py-2.5 rounded-xl text-base sm:text-xs text-white placeholder-slate-500 outline-none transition"
                />
              </div>

              {/* Two Column Layout: Schools Grid + Selected School Showcase */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Schools Grid (7 cols) */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[580px] overflow-y-auto pr-1">
                  {filteredSchools.map((school) => {
                    const isSelected = selectedSchoolId === school.id;
                    const schStats = getSchoolConsolidatedStats(school);

                    return (
                      <button
                        key={school.id}
                        onClick={() => setSelectedSchoolId(school.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all duration-150 flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-500 ring-2 ring-amber-400/50 shadow-lg'
                            : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                        }`}
                      >
                        {/* School Color Emblem */}
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow border flex-shrink-0"
                          style={{
                            backgroundColor: school.colors.primary,
                            color: school.colors.text,
                            borderColor: school.colors.border || '#fff'
                          }}
                        >
                          {cleanSchoolName(school).charAt(0)}
                        </div>

                        <div className="min-w-0 flex-1 space-y-0.5">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-white text-xs truncate">
                              {cleanSchoolName(school)}
                            </span>
                            {isSelected && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">
                            {school.neighborhood}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-amber-300 font-medium">
                            <Trophy className="w-3 h-3 text-amber-400" />
                            <span>
                              {schStats.grandTotalTitles > 0
                                ? `${schStats.grandTotalTitles} título${schStats.grandTotalTitles === 1 ? '' : 's'}`
                                : 'Em busca do 1º título'}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}

                  {filteredSchools.length === 0 && (
                    <div className="col-span-full py-8 text-center text-slate-500 text-xs">
                      Nenhuma escola encontrada com o termo "{searchTerm}".
                    </div>
                  )}
                </div>

                {/* Selected School Showcase (5 cols) */}
                <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5 sticky top-24">
                  {currentSchool && (
                    <>
                      {/* Flag Header */}
                      <div
                        className="rounded-xl p-5 border text-center space-y-2 relative overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${currentSchool.colors.primary}dd 0%, #090d16 85%)`,
                          borderColor: currentSchool.colors.border || '#334155'
                        }}
                      >
                        <div className="flex items-center justify-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-black/40 text-amber-300 border border-white/10">
                            {currentSchool.division === 'especial'
                              ? 'Grupo Especial'
                              : currentSchool.division === 'ouro'
                              ? 'Série Ouro'
                              : currentSchool.division === 'prata'
                              ? 'Série Prata (Superliga)'
                              : 'Série Bronze (Superliga)'}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            {getSchoolDenomination(currentSchool)}
                          </span>
                        </div>
                        <h3 className="text-2xl font-black text-white">{cleanSchoolName(currentSchool)}</h3>
                        <p className="text-[11px] text-amber-300 font-semibold">{getSchoolCorporateName(currentSchool)}</p>
                        <p className="text-xs text-amber-200 italic">"{currentSchool.nickname}"</p>
                        <div className="text-[11px] text-slate-300 font-medium">
                          Fundação: {currentSchool.foundationYear} • Bairro: {currentSchool.neighborhood}
                        </div>
                      </div>

                      {/* Enredo Preview */}
                      <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">
                          Enredo Oficial Carnaval {currentYear}:
                        </div>
                        <div className="text-xs font-bold text-amber-300">
                          "{currentSchool.currentEnredo?.title || 'Enredo da Temporada'}"
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2">
                          {currentSchool.currentEnredo?.synopsis}
                        </p>
                      </div>

                      {/* Palmarés / Titles stats */}
                      {stats && (
                        <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl space-y-1 text-xs text-amber-300">
                          <div className="flex items-center gap-1.5 font-bold">
                            <Trophy className="w-3.5 h-3.5 text-amber-400" />
                            <span>Galeria de Conquistas:</span>
                          </div>
                          <div className="text-[11px] text-slate-300">
                            <strong>{stats.totalEspecialTitles}</strong> títulos no Grupo Especial ({stats.totalEspecialVices} vices) ·{' '}
                            <strong>{stats.totalOuroTitles}</strong> na Série Ouro ({stats.totalOuroVices} vices)
                            {stats.totalPrataTitles > 0 && ` · ${stats.totalPrataTitles} na Série Prata`}
                            {stats.totalBronzeTitles > 0 && ` · ${stats.totalBronzeTitles} na Série Bronze`}
                          </div>
                        </div>
                      )}

                      {/* Initial Resources & Attributes */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                          <span className="text-slate-500 text-[10px] block">Orçamento Inicial:</span>
                          <span className="font-mono font-bold text-emerald-400 text-sm">
                            R$ {(currentSchool.budget / 1000).toFixed(0)}k
                          </span>
                        </div>

                        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                          <span className="text-slate-500 text-[10px] block">Moral da Comunidade:</span>
                          <span className="font-mono font-bold text-white text-sm">
                            {currentSchool.fanBaseMorale}%
                          </span>
                        </div>

                        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                          <span className="text-slate-500 text-[10px] block">Nível da Bateria:</span>
                          <span className="font-mono font-bold text-amber-400 text-sm">
                            {currentSchool.attributes.bateria} pts
                          </span>
                        </div>

                        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                          <span className="text-slate-500 text-[10px] block">Harmonia & Canto:</span>
                          <span className="font-mono font-bold text-amber-400 text-sm">
                            {currentSchool.attributes.harmonia} pts
                          </span>
                        </div>
                      </div>

                      {/* Key Staff */}
                      <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-3 space-y-1">
                        <div>
                          <strong className="text-slate-300">Carnavalesco:</strong> {currentSchool.staff.carnavalesco.name}
                        </div>
                        <div>
                          <strong className="text-slate-300">Mestre Bateria:</strong> {currentSchool.staff.mestreBateria.name}
                        </div>
                        <div>
                          <strong className="text-slate-300">Intérprete:</strong> {currentSchool.staff.interprete.name}
                        </div>
                      </div>

                      {/* Big CTA */}
                      <button
                        onClick={handleStartCareer}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-sm tracking-wide transition shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                      >
                        <Sparkles className="w-4 h-4 text-slate-950" />
                        <span>COMANDAR {cleanSchoolName(currentSchool).toUpperCase()} NO CARNAVAL {currentYear}</span>
                        <ArrowRight className="w-4 h-4 text-slate-950" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Fixed CTA Bar for Managing Selected School */}
            {currentSchool && (
              <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-amber-500/40 p-3 pb-safe shadow-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shadow border shrink-0"
                    style={{
                      backgroundColor: currentSchool.colors.primary,
                      color: currentSchool.colors.text,
                      borderColor: currentSchool.colors.border || '#fff'
                    }}
                  >
                    {cleanSchoolName(currentSchool).charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-white truncate max-w-[130px] sm:max-w-[200px]">
                      {cleanSchoolName(currentSchool)}
                    </div>
                    <div className="text-[10px] text-amber-300 font-mono">
                      {currentSchool.division === 'especial'
                        ? 'Grupo Especial'
                        : currentSchool.division === 'ouro'
                        ? 'Série Ouro'
                        : currentSchool.division === 'prata'
                        ? 'Série Prata'
                        : currentSchool.division === 'bronze'
                        ? 'Série Bronze'
                        : 'Avaliação'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleStartCareer}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  <span>COMANDAR</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Spectator Mode View */
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400 shadow-lg shadow-amber-500/20">
                <Crown className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  MODO OBSERVADOR • LIESA, LIGA RJ & SUPERLIGA
                </span>
                <h2 className="text-3xl font-black text-white">
                  Presidência Geral do Carnaval Carioca {currentYear}
                </h2>
                <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                  No Modo Observador, você tem a visão panorâmica de todo o espetáculo. Você não precisa
                  administrar um único barracão: acompanha o desempenho das <strong>{totalSchoolsCount} agremiações</strong> nas 5 divisões sob supervisão da <strong>LIESA</strong> (Grupo Especial), <strong>LIGA RJ</strong> (Série Ouro) e <strong>Superliga</strong> (Séries Prata, Bronze e Avaliação),
                  assiste ou simula todos os desfiles da <strong>Marquês de Sapucaí</strong> e da <strong>Intendente Magalhães</strong>,
                  e comanda a <strong>Apuração Oficial dos 36 jurados</strong> na Praça da Apoteose!
                </p>
              </div>

              {/* 5 Divisions Summary Cards with Governing Leagues */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-left pt-2">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">LIESA</div>
                  <div className="text-xs font-bold text-white">Grupo Especial</div>
                  <div className="text-[11px] text-slate-400">{especialSchools.length} agremiações na elite. Desfiles no Domingo e Segunda na Sapucaí.</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">LIGA RJ</div>
                  <div className="text-xs font-bold text-white">Série Ouro</div>
                  <div className="text-[11px] text-slate-400">{ouroSchools.length} agremiações na Sapucaí (Sexta e Sábado). Campeã sobe ao Especial!</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">SUPERLIGA</div>
                  <div className="text-xs font-bold text-white">Série Prata</div>
                  <div className="text-[11px] text-slate-400">{prataSchools.length} agremiações na Intendente. {ouroSchools.length <= 14 ? 'Campeã e Vice sobem para a Série Ouro' : 'Campeã sobe para a Série Ouro'}.</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">SUPERLIGA</div>
                  <div className="text-xs font-bold text-white">Série Bronze</div>
                  <div className="text-[11px] text-slate-400">{bronzeSchools.length} agremiações na Intendente. {prataSchools.length > 16 ? 'Campeã garante acesso à Série Prata!' : prataSchools.length === 15 ? 'Campeã, vice e 3ª colocadas garantem acesso à Prata!' : 'Top 3 sobem para a Série Prata!'}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">SUPERLIGA</div>
                  <div className="text-xs font-bold text-white">Grupo de Avaliação</div>
                  <div className="text-[11px] text-slate-400">{avaliacaoSchools.length} agremiações na Intendente. Campeã e vice garantem acesso à Série Bronze!</div>
                </div>
              </div>

              {/* President Name Input */}
              <div className="text-left bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Nome do Presidente da LIGA:
                </label>
                <input
                  type="text"
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                  placeholder="Presidente da LIGA"
                  className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm text-white font-semibold outline-none"
                />
              </div>

              {/* Start Spectator Button */}
              <button
                onClick={handleStartSpectator}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-sm tracking-wide transition shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>INICIAR TEMPORADA COMO PRESIDENTE DA LIGA</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal to Reset Game & Start Fresh Save */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border-2 border-rose-500/60 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">Reiniciar Jogo e Criar Novo Save?</h3>
                <p className="text-xs text-slate-400">Esta ação não poderá ser desfeita.</p>
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed">
              <p>
                Todo o progresso das temporadas anteriores será apagado do navegador.
              </p>
              <p className="text-amber-300">
                O jogo será reiniciado no <strong>Carnaval 2027</strong> com todas as <strong>{totalSchoolsCount} agremiações</strong> distribuídas em suas 5 divisões originais (Especial, Ouro, Prata, Bronze e Avaliação) e seus orçamentos e elencos restaurados.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowResetModal(false);
                  if (onResetSave) onResetSave();
                }}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition shadow-lg shadow-rose-600/30 flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Sim, Recomeçar Novo Save</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
