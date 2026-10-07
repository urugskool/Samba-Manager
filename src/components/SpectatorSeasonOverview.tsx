import React, { useState, useEffect } from 'react';
import { School, DivisionId, NewsItem } from '../types/carnaval';
import { SeasonMonthId } from '../types/seasonCycle';
import { SeasonCycleService, SEASON_PERIODS } from '../services/seasonCycleService';
import { CarnavalSorteio } from '../types/sorteio';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import { RoteiroDesfileModal } from './RoteiroDesfileModal';
import {
  Calendar,
  Clock,
  Sparkles,
  Trophy,
  Dices,
  Lock,
  ChevronRight,
  Zap,
  Hammer,
  Music,
  Users,
  Wallet,
  BookOpen,
  Search,
  CheckCircle2,
  TrendingUp,
  LayoutDashboard,
  Coins,
  Heart,
  ArrowRight,
  Radio,
  FastForward,
  Newspaper,
  Crown
} from 'lucide-react';

interface SpectatorSeasonOverviewProps {
  schools: School[];
  currentYear: number;
  currentMonth: SeasonMonthId;
  onNavigateTab: (tab: string) => void;
  onAdvanceMonth: (targetMonth?: SeasonMonthId, targetTab?: string) => void;
  sorteio: CarnavalSorteio | null;
  news: NewsItem[];
  defaultCategory?: 'dashboard' | 'barracao' | 'ensaios' | 'equipe' | 'financas';
  isAllParadesCompleted?: boolean;
  isAllApuracoesCompleted?: boolean;
  completedParadeCount?: number;
  totalParadeCount?: number;
  onOpenSeasonCycleModal?: () => void;
  onSimulateAllMonthsToCarnaval?: () => void;
}

export const SpectatorSeasonOverview: React.FC<SpectatorSeasonOverviewProps> = ({
  schools,
  currentYear,
  currentMonth,
  onNavigateTab,
  onAdvanceMonth,
  sorteio,
  news,
  defaultCategory = 'dashboard',
  isAllParadesCompleted = false,
  isAllApuracoesCompleted = false,
  completedParadeCount = 0,
  totalParadeCount = 0,
  onOpenSeasonCycleModal,
  onSimulateAllMonthsToCarnaval
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'dashboard' | 'barracao' | 'ensaios' | 'equipe' | 'financas'>(defaultCategory);

  useEffect(() => {
    if (defaultCategory) {
      setSelectedCategory(defaultCategory);
    }
  }, [defaultCategory]);
  const [selectedDivision, setSelectedDivision] = useState<DivisionId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectingSchool, setInspectingSchool] = useState<School | null>(null);

  const currentPeriod = SeasonCycleService.getPeriod(currentMonth);
  const nextMonthId = SeasonCycleService.getNextMonth(currentMonth);
  const nextPeriod = nextMonthId ? SeasonCycleService.getPeriod(nextMonthId) : null;
  const currentMonthIdx = SEASON_PERIODS.findIndex((p) => p.id === currentMonth);

  const activeSchools = schools.filter((s) => !s.isInactive && !(s as any).inactive);
  const filteredSchools = activeSchools.filter((school) => {
    if (selectedDivision !== 'all' && school.division !== selectedDivision) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const name = school.name.toLowerCase();
      const short = school.shortName.toLowerCase();
      const enredo = (school.currentEnredo?.title || '').toLowerCase();
      const carnavalesco = (school.staff?.carnavalesco?.name || '').toLowerCase();
      return name.includes(q) || short.includes(q) || enredo.includes(q) || carnavalesco.includes(q);
    }
    return true;
  });

  // Médias consolidadas para o observador
  const avgBarracao = activeSchools.length > 0
    ? Math.round(activeSchools.reduce((acc, s) => acc + (s.barracaoProgress || 50), 0) / activeSchools.length)
    : 70;
  const avgRehearsal = activeSchools.length > 0
    ? Math.round(activeSchools.reduce((acc, s) => acc + (s.rehearsalLevel || 50), 0) / activeSchools.length)
    : 70;
  const totalEnredos = activeSchools.filter((s) => s.currentEnredo && !s.currentEnredo.title.includes('SAMPLE')).length;

  const getDivisionBadgeColor = (div: DivisionId) => {
    switch (div) {
      case 'especial':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'ouro':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      case 'prata':
        return 'bg-slate-300/20 text-slate-200 border-slate-400/40';
      case 'bronze':
        return 'bg-amber-700/20 text-amber-400 border-amber-700/40';
      case 'avaliacao':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const getDivisionLabel = (div: DivisionId) => {
    switch (div) {
      case 'especial': return 'Grupo Especial';
      case 'ouro': return 'Série Ouro';
      case 'prata': return 'Série Prata';
      case 'bronze': return 'Série Bronze';
      case 'avaliacao': return 'Avaliação';
      default: return div;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner de Acompanhamento no Modo Observador */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-flex items-center gap-1.5 shadow-sm">
                <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                MODO OBSERVADOR • SUPERVISÃO GERAL DO CARNAVAL
              </span>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-0.5 rounded-lg border border-slate-800">
                Temporada {currentYear} • LIESA, LIGA RJ & Superliga
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Acompanhamento Oficial das {activeSchools.length} Agremiações do Rio
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              No Modo Observador, você acompanha os bastidores e preparativos de todas as divisões do Carnaval carioca.
              As escolas realizam seus projetos, barracões e ensaios autonomamente a cada virada de mês.
            </p>

            {/* Status do Mês Atual & Ação Rápida de Avanço */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div
                onClick={() => onOpenSeasonCycleModal && onOpenSeasonCycleModal()}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-300 font-bold text-xs cursor-pointer hover:bg-amber-500/25 transition shadow-sm"
              >
                <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Mês Atual: <strong>{currentPeriod.name}</strong> • {currentPeriod.activityTitle}
                </span>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded">
                  {currentMonthIdx + 1}/12
                </span>
              </div>

              {/* Botão de Avanço de Tempo Direto para o Observador */}
              {currentMonth === 'julho' && !sorteio?.isCompleted ? (
                <button
                  onClick={() => onNavigateTab('sorteio')}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 flex items-center gap-2 cursor-pointer transition animate-pulse"
                >
                  <Dices className="w-4 h-4 text-slate-950" />
                  <span>Realizar Sorteio da Ordem (Obrigatório em Julho)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : currentMonth === 'julho' && sorteio?.isCompleted ? (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => onAdvanceMonth(nextMonthId || undefined, 'dashboard')}
                    className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-500 hover:from-emerald-300 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 flex items-center gap-2 cursor-pointer transition animate-pulse"
                  >
                    <CheckCircle2 className="w-4 h-4 text-slate-950" />
                    <span>Sorteio Homologado! Avançar para Agosto (Início dos Ensaios)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  {onSimulateAllMonthsToCarnaval && (
                    <button
                      onClick={onSimulateAllMonthsToCarnaval}
                      className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-slate-700 flex items-center gap-2 cursor-pointer transition"
                      title="Simula as etapas de preparação de todas as escolas e avança diretamente para Fevereiro (Mês dos Desfiles)"
                    >
                      <FastForward className="w-4 h-4 text-amber-400" />
                      <span>Simular até Fevereiro (Carnaval)</span>
                    </button>
                  )}
                </div>
              ) : currentMonth === 'fevereiro' ? (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => onNavigateTab('desfile')}
                    className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 hover:from-emerald-300 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 flex items-center gap-2 cursor-pointer transition animate-pulse"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Ir para os Desfiles de Carnaval</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  {isAllParadesCompleted && (
                    <button
                      onClick={() => onNavigateTab('apuracao')}
                      className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg flex items-center gap-1.5 cursor-pointer transition"
                    >
                      <Trophy className="w-3.5 h-3.5" />
                      <span>Apuração Oficial</span>
                    </button>
                  )}
                  {isAllApuracoesCompleted && (
                    <button
                      onClick={() => onNavigateTab('campeas')}
                      className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-lg flex items-center gap-1.5 cursor-pointer transition"
                    >
                      <Crown className="w-3.5 h-3.5" />
                      <span>Desfile das Campeãs</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  {nextPeriod && (
                    <button
                      onClick={() => onAdvanceMonth(nextMonthId || undefined, 'dashboard')}
                      className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 flex items-center gap-2 cursor-pointer transition transform hover:scale-[1.02]"
                    >
                      <Zap className="w-4 h-4 fill-slate-950" />
                      <span>Simular {currentPeriod.name} & Avançar p/ {nextPeriod.name}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                  {onSimulateAllMonthsToCarnaval && (
                    <button
                      onClick={onSimulateAllMonthsToCarnaval}
                      className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-slate-700 flex items-center gap-2 cursor-pointer transition"
                      title="Simula as etapas de preparação de todas as escolas e avança diretamente para Fevereiro (Mês dos Desfiles)"
                    >
                      <FastForward className="w-4 h-4 text-amber-400" />
                      <span>Simular até Fevereiro (Carnaval)</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 shrink-0 lg:w-72">
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left">
              <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
                <Hammer className="w-3 h-3 text-amber-400" /> Barracões
              </span>
              <div className="text-xl font-black text-amber-400 font-mono mt-1">
                {avgBarracao}%
              </div>
              <span className="text-[10px] text-slate-400">Média das 60+ escolas</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left">
              <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
                <Music className="w-3 h-3 text-blue-400" /> Ensaios
              </span>
              <div className="text-xl font-black text-blue-400 font-mono mt-1">
                {avgRehearsal}%
              </div>
              <span className="text-[10px] text-slate-400">Média de preparação</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left">
              <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-emerald-400" /> Enredos
              </span>
              <div className="text-xl font-black text-emerald-400 font-mono mt-1">
                {totalEnredos} / {activeSchools.length}
              </div>
              <span className="text-[10px] text-slate-400">Temas homologados</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left">
              <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
                <Dices className="w-3 h-3 text-purple-400" /> Sorteio
              </span>
              <div className="text-sm font-black font-mono mt-1 text-white">
                {sorteio?.isCompleted ? '✓ Definido' : 'Pendente (Jul)'}
              </div>
              <span className="text-[10px] text-slate-400">5 divisões</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Pills Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-3 rounded-2xl">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
          <span className="text-slate-400 mr-1 text-[11px] uppercase tracking-wider">Visualização:</span>
          <button
            onClick={() => setSelectedCategory('dashboard')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'dashboard'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Painel do Observador</span>
          </button>
          <button
            onClick={() => setSelectedCategory('barracao')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'barracao'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Hammer className="w-3.5 h-3.5" />
            <span>Barracões & Enredos</span>
          </button>
          <button
            onClick={() => setSelectedCategory('ensaios')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'ensaios'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Ensaios de Quadra</span>
          </button>
          <button
            onClick={() => setSelectedCategory('equipe')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'equipe'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Equipes Técnicas</span>
          </button>
          <button
            onClick={() => setSelectedCategory('financas')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'financas'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Finanças & Orçamentos</span>
          </button>
        </div>

        {/* Division Quick Filter */}
        <div className="flex items-center gap-1.5 text-xs">
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value as DivisionId | 'all')}
            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 font-bold text-xs focus:ring-2 focus:ring-amber-500 outline-none cursor-pointer"
          >
            <option value="all">Todas as Divisões ({activeSchools.length})</option>
            <option value="especial">Grupo Especial (12)</option>
            <option value="ouro">Série Ouro (16)</option>
            <option value="prata">Série Prata (16)</option>
            <option value="bronze">Série Bronze (12)</option>
            <option value="avaliacao">Grupo de Avaliação</option>
          </select>
        </div>
      </div>

      {/* Ticker de Notícias Recentes do Carnaval */}
      {news && news.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-3 overflow-hidden shadow">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs shrink-0 border border-amber-500/30">
            <Newspaper className="w-3.5 h-3.5" />
            <span>ÚLTIMAS DO SAMBA</span>
          </div>
          <div className="text-xs text-slate-300 truncate">
            <strong className="text-white mr-1.5">{news[0].title}:</strong>
            <span className="text-slate-400">{news[0].body}</span>
          </div>
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar escola por nome, bairro, carnavalesco ou título do enredo..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
        />
      </div>

      {/* Listagem Rica das Agremiações no Modo Observador */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSchools.map((school) => {
          const cleanName = cleanSchoolName(school);
          const enredo = school.currentEnredo;
          const carnavalesco = school.staff?.carnavalesco?.name || 'Comissão Artística';
          const mestreBateria = school.staff?.mestreBateria?.name || 'Mestre de Bateria';
          const interprete = school.staff?.interprete?.name || 'Voz Oficial';
          const casal = school.staff?.mestreSalaPortaBandeira?.name || '1º Casal MS/PB';
          const coreografo = school.staff?.coreografo?.name || 'Comissão de Frente';
          const subvencaoLabel = school.division === 'especial' ? 'R$ 2.500.000 (LIESA)' : school.division === 'ouro' ? 'R$ 1.000.000 (LIGA RJ)' : school.division === 'prata' ? 'R$ 400.000 (Superliga)' : school.division === 'bronze' ? 'R$ 200.000 (Superliga)' : 'R$ 100.000 (Superliga)';

          return (
            <div
              key={school.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col justify-between space-y-4 shadow-lg group relative overflow-hidden"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 pointer-events-none -mr-10 -mt-10"
                style={{ backgroundColor: school.colors.primary }}
              />

              <div className="space-y-3 relative z-10">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-base font-black shadow-md border shrink-0"
                      style={{
                        backgroundColor: school.colors.primary,
                        color: school.colors.text,
                        borderColor: school.colors.border || '#fff'
                      }}
                    >
                      {school.shortName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-black text-white text-base group-hover:text-amber-300 transition">
                        {cleanName}
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        {school.neighborhood || 'Rio de Janeiro'}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${getDivisionBadgeColor(school.division)} shrink-0`}>
                    {getDivisionLabel(school.division)}
                  </span>
                </div>

                {/* Exibição condicional de acordo com a Categoria selecionada */}
                {selectedCategory === 'equipe' ? (
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[11px] border-b border-slate-800/80 pb-1.5">
                      <span className="text-slate-400 flex items-center gap-1"><Users className="w-3 h-3 text-amber-400" /> Carnavalesco:</span>
                      <strong className="text-slate-200">{carnavalesco}</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] border-b border-slate-800/80 pb-1.5">
                      <span className="text-slate-400 flex items-center gap-1"><Music className="w-3 h-3 text-blue-400" /> Bateria:</span>
                      <strong className="text-slate-200">{mestreBateria}</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] border-b border-slate-800/80 pb-1.5">
                      <span className="text-slate-400 flex items-center gap-1"><Radio className="w-3 h-3 text-emerald-400" /> Intérprete:</span>
                      <strong className="text-slate-200">{interprete}</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] border-b border-slate-800/80 pb-1.5">
                      <span className="text-slate-400 flex items-center gap-1"><Sparkles className="w-3 h-3 text-purple-400" /> 1º Casal MS/PB:</span>
                      <strong className="text-slate-200">{casal}</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 flex items-center gap-1"><Heart className="w-3 h-3 text-rose-400" /> Com. de Frente:</span>
                      <strong className="text-slate-200">{coreografo}</strong>
                    </div>
                  </div>
                ) : selectedCategory === 'financas' ? (
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[11px] border-b border-slate-800/80 pb-1.5">
                      <span className="text-slate-400 flex items-center gap-1"><Coins className="w-3 h-3 text-emerald-400" /> Subvenção Oficial:</span>
                      <strong className="text-emerald-400">{subvencaoLabel}</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] border-b border-slate-800/80 pb-1.5">
                      <span className="text-slate-400 flex items-center gap-1"><Wallet className="w-3 h-3 text-amber-400" /> Orçamento Estimado:</span>
                      <strong className="text-white font-mono">R$ {school.budget.toLocaleString('pt-BR')}</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 flex items-center gap-1"><Heart className="w-3 h-3 text-rose-400" /> Moral da Comunidade:</span>
                      <strong className="text-rose-300">{school.fanBaseMorale || 80}%</strong>
                    </div>
                  </div>
                ) : selectedCategory === 'ensaios' ? (
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 flex items-center gap-1"><Music className="w-3 h-3 text-blue-400" /> Preparação de Harmonia & Ensaios:</span>
                        <strong className="text-blue-400 font-mono">{school.rehearsalLevel || 50}%</strong>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${school.rehearsalLevel || 50}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                        <span>Bateria: <strong className="text-slate-300">{mestreBateria}</strong></span>
                        <span>{school.technicalParadeDone ? '✓ Ensaio Técnico Realizado' : 'Ensaios de Quadra/Rua'}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Enredo da Escola */}
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-slate-400">Enredo Oficial:</span>
                        <span className="font-bold text-amber-400">{enredo?.themeType || 'Cultural'}</span>
                      </div>
                      <h4 className="text-xs font-black text-slate-200 line-clamp-1" title={enredo?.title}>
                        "{enredo?.title || 'A Festa da Raiz do Samba'}"
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {enredo?.synopsis || 'Projeto carnavalesco em fase de desenvolvimento artístico.'}
                      </p>
                    </div>

                    {/* Métricas da Agremiação */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800/80">
                        <div className="text-[10px] text-slate-400 flex items-center justify-between">
                          <span>Barracão</span>
                          <span className="font-bold text-amber-400">{school.barracaoProgress || 50}%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-amber-500 to-amber-400 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${school.barracaoProgress || 50}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800/80">
                        <div className="text-[10px] text-slate-400 flex items-center justify-between">
                          <span>Ensaios</span>
                          <span className="font-bold text-blue-400">{school.rehearsalLevel || 50}%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-400 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${school.rehearsalLevel || 50}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span>Carnavalesco: <strong className="text-slate-300">{carnavalesco}</strong></span>
                      <span>Bateria: <strong className="text-slate-300">{mestreBateria}</strong></span>
                    </div>
                  </>
                )}
              </div>

              {/* Botão de abrir o Livro Abre-Alas / Roteiro da Escola */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => setInspectingSchool(school)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition border border-slate-700 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ver Roteiro Oficial (Livro Abre-Alas)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSchools.length === 0 && (
        <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
          <p className="text-slate-400 text-sm">Nenhuma agremiação encontrada com o filtro selecionado.</p>
          <button
            onClick={() => {
              setSelectedDivision('all');
              setSearchQuery('');
            }}
            className="text-xs text-amber-400 font-bold hover:underline"
          >
            Limpar filtros de busca
          </button>
        </div>
      )}

      {/* Modal do Livro Abre-Alas da agremiação inspecionada */}
      {inspectingSchool && (
        <RoteiroDesfileModal
          school={inspectingSchool}
          division={inspectingSchool.division}
          onClose={() => setInspectingSchool(null)}
        />
      )}
    </div>
  );
};
