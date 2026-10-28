import React, { useState, useMemo } from 'react';
import {
  ArrowLeftRight,
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Crown,
  Filter,
  Flame,
  History,
  Layers,
  MapPin,
  Newspaper,
  RotateCcw,
  Search,
  Sparkles,
  Star,
  Trophy,
  User,
  Users,
  X,
  Zap
} from 'lucide-react';
import { School } from '../types/carnaval';
import { ProfessionalRole, TransferEvent } from '../types/professionals';
import {
  HISTORICAL_CARNAVAL_TRANSFERS,
  HistoricalTransferItem,
  getAvailableTransferSeasons,
  getProfessionalTrajectories,
  getUnifiedTransferHistory
} from '../data/historicalTransfersData';
import { cleanSchoolName } from '../utils/schoolNameUtils';

interface HistoricoTransferenciasModalProps {
  isOpen: boolean;
  onClose: () => void;
  allSchools?: School[];
  inGameTransfers?: TransferEvent[];
  currentYear?: number;
}

const ROLE_LABELS: Record<ProfessionalRole | 'all', string> = {
  all: 'Todas as Funções',
  carnavalesco: 'Carnavalescos',
  mestreBateria: 'Mestres de Bateria',
  interprete: 'Intérpretes Oficiais',
  mestreSalaPortaBandeira: '1º Casal MS e PB',
  coreografo: 'Coreógrafos de Comissão',
  harmonia: 'Diretores de Harmonia',
  direcaoCarnaval: 'Direção de Carnaval'
};

const ROLE_COLORS: Record<ProfessionalRole, { bg: string; text: string; border: string }> = {
  carnavalesco: {
    bg: 'bg-amber-500/15',
    text: 'text-amber-300',
    border: 'border-amber-500/30'
  },
  mestreBateria: {
    bg: 'bg-rose-500/15',
    text: 'text-rose-300',
    border: 'border-rose-500/30'
  },
  interprete: {
    bg: 'bg-sky-500/15',
    text: 'text-sky-300',
    border: 'border-sky-500/30'
  },
  mestreSalaPortaBandeira: {
    bg: 'bg-purple-500/15',
    text: 'text-purple-300',
    border: 'border-purple-500/30'
  },
  coreografo: {
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-300',
    border: 'border-emerald-500/30'
  },
  harmonia: {
    bg: 'bg-orange-500/15',
    text: 'text-orange-300',
    border: 'border-orange-500/30'
  },
  direcaoCarnaval: {
    bg: 'bg-indigo-500/15',
    text: 'text-indigo-300',
    border: 'border-indigo-500/30'
  }
};

const SCHOOL_BADGE_STYLE: Record<string, { bg: string; text: string; border: string }> = {
  beija_flor: { bg: 'bg-blue-900/60', text: 'text-blue-200', border: 'border-blue-500/40' },
  mangueira: { bg: 'bg-emerald-950/70', text: 'text-pink-300', border: 'border-emerald-500/40' },
  portela: { bg: 'bg-sky-950/70', text: 'text-sky-200', border: 'border-sky-500/40' },
  salgueiro: { bg: 'bg-red-950/70', text: 'text-red-200', border: 'border-red-500/40' },
  viradouro: { bg: 'bg-rose-950/70', text: 'text-rose-200', border: 'border-rose-500/40' },
  vila_isabel: { bg: 'bg-cyan-950/70', text: 'text-cyan-200', border: 'border-cyan-500/40' },
  imperatriz: { bg: 'bg-emerald-950/70', text: 'text-amber-200', border: 'border-emerald-500/40' },
  mocidade: { bg: 'bg-teal-950/70', text: 'text-teal-200', border: 'border-teal-500/40' },
  grande_rio: { bg: 'bg-red-950/60', text: 'text-emerald-300', border: 'border-red-500/40' },
  tijuca: { bg: 'bg-amber-950/60', text: 'text-blue-300', border: 'border-amber-500/40' },
  tuiuti: { bg: 'bg-indigo-950/60', text: 'text-amber-300', border: 'border-indigo-500/40' },
  unidos_de_padre_miguel: { bg: 'bg-red-950/60', text: 'text-red-300', border: 'border-red-500/40' },
  imperio_serrano: { bg: 'bg-green-950/70', text: 'text-green-200', border: 'border-green-500/40' },
  estacio_de_sa: { bg: 'bg-red-950/70', text: 'text-red-200', border: 'border-red-500/40' },
  sao_clemente: { bg: 'bg-yellow-950/70', text: 'text-yellow-200', border: 'border-yellow-500/40' }
};

export const HistoricoTransferenciasModal: React.FC<HistoricoTransferenciasModalProps> = ({
  isOpen,
  onClose,
  allSchools = [],
  inGameTransfers = [],
  currentYear = 2026
}) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'trajetorias' | 'escolas'>('timeline');
  const [selectedRole, setSelectedRole] = useState<ProfessionalRole | 'all'>('all');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [selectedSchoolFilter, setSelectedSchoolFilter] = useState<string>('all');
  const [filterOnlyMilestones, setFilterOnlyMilestones] = useState<boolean>(false);
  const [filterOnlyTitleWinners, setFilterOnlyTitleWinners] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTrajectoryName, setSelectedTrajectoryName] = useState<string | null>(null);

  // Unifica dados históricos e do save
  const unifiedTransfers = useMemo(() => {
    return getUnifiedTransferHistory(inGameTransfers);
  }, [inGameTransfers]);

  // Lista de temporadas
  const seasons = useMemo(() => {
    return getAvailableTransferSeasons(unifiedTransfers);
  }, [unifiedTransfers]);

  // Trajetórias consolidadas de profissionais
  const trajectories = useMemo(() => {
    return getProfessionalTrajectories(unifiedTransfers);
  }, [unifiedTransfers]);

  // Lista de escolas para filtro
  const schoolOptions = useMemo(() => {
    const set = new Set<string>();
    unifiedTransfers.forEach((t) => {
      if (t.newSchoolName) set.add(t.newSchoolName);
      if (t.previousSchoolName && !t.previousSchoolName.includes('Sem Clube')) {
        set.add(t.previousSchoolName);
      }
    });
    return Array.from(set).sort();
  }, [unifiedTransfers]);

  // Filtra as transferências
  const filteredTransfers = useMemo(() => {
    return unifiedTransfers.filter((t) => {
      // Role filter
      if (selectedRole !== 'all' && t.role !== selectedRole) return false;

      // Season filter
      if (selectedSeason !== 'all' && String(t.year) !== selectedSeason) return false;

      // School filter
      if (selectedSchoolFilter !== 'all') {
        const matchesPrev = t.previousSchoolName?.toLowerCase() === selectedSchoolFilter.toLowerCase();
        const matchesNew = t.newSchoolName?.toLowerCase() === selectedSchoolFilter.toLowerCase();
        if (!matchesPrev && !matchesNew) return false;
      }

      // Milestones filter
      if (filterOnlyMilestones && !t.isHistoricalMilestone) return false;

      // Won title in 1st year
      if (filterOnlyTitleWinners && !t.wonTitleInFirstYear) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatches = t.professionalName.toLowerCase().includes(q);
        const prevMatches = t.previousSchoolName?.toLowerCase().includes(q);
        const newMatches = t.newSchoolName.toLowerCase().includes(q);
        const noteMatches = t.notes.toLowerCase().includes(q);
        const impactMatches = t.impactTitle?.toLowerCase().includes(q);
        const yearMatches = String(t.year).includes(q);
        if (!nameMatches && !prevMatches && !newMatches && !noteMatches && !impactMatches && !yearMatches) {
          return false;
        }
      }

      return true;
    });
  }, [
    unifiedTransfers,
    selectedRole,
    selectedSeason,
    selectedSchoolFilter,
    filterOnlyMilestones,
    filterOnlyTitleWinners,
    searchQuery
  ]);

  // Agrupamento por ano na visualização em linha do tempo
  const groupedByYear = useMemo(() => {
    const groups = new Map<number, HistoricalTransferItem[]>();
    filteredTransfers.forEach((t) => {
      if (!groups.has(t.year)) {
        groups.set(t.year, []);
      }
      groups.get(t.year)!.push(t);
    });
    return Array.from(groups.entries()).sort((a, b) => b[0] - a[0]);
  }, [filteredTransfers]);

  // Métricas para o cabeçalho
  const stats = useMemo(() => {
    const total = unifiedTransfers.length;
    const carnavalescos = unifiedTransfers.filter((t) => t.role === 'carnavalesco').length;
    const interpretes = unifiedTransfers.filter((t) => t.role === 'interprete').length;
    const baterias = unifiedTransfers.filter((t) => t.role === 'mestreBateria').length;
    const casais = unifiedTransfers.filter((t) => t.role === 'mestreSalaPortaBandeira').length;
    const coreografos = unifiedTransfers.filter((t) => t.role === 'coreografo').length;
    const campeoesPrimeiroAno = unifiedTransfers.filter((t) => t.wonTitleInFirstYear).length;
    const marcos = unifiedTransfers.filter((t) => t.isHistoricalMilestone).length;

    return {
      total,
      carnavalescos,
      interpretes,
      baterias,
      casais,
      coreografos,
      campeoesPrimeiroAno,
      marcos
    };
  }, [unifiedTransfers]);

  const activeTrajectory = useMemo(() => {
    if (!selectedTrajectoryName) return null;
    return trajectories.find((t) => t.professionalName === selectedTrajectoryName) || null;
  }, [selectedTrajectoryName, trajectories]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
        {/* Header Principal */}
        <div className="px-5 py-4 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 shrink-0">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-wide truncate">
                  Histórico de Transferências
                </h2>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Mercado da Folia • 1976 a {currentYear}
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate">
                Dança das cadeiras, chegadas triunfantes, quebras contratuais e títulos nas temporadas passadas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition shrink-0 cursor-pointer"
            title="Fechar Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Banner de KPIs Rápidos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 p-3 bg-slate-900/60 border-b border-slate-800/80 text-xs shrink-0">
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Total de Movimentações</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-black text-white font-mono">{stats.total}</span>
              <span className="text-[10px] text-slate-500">registros</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
            <span className="text-[10px] text-amber-400 uppercase font-semibold">Carnavalescos</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-black text-amber-400 font-mono">{stats.carnavalescos}</span>
              <span className="text-[10px] text-slate-500">trocas</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
            <span className="text-[10px] text-sky-400 uppercase font-semibold">Intérpretes</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-black text-sky-400 font-mono">{stats.interpretes}</span>
              <span className="text-[10px] text-slate-500">vozes</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
            <span className="text-[10px] text-rose-400 uppercase font-semibold">Mestres de Bateria</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-black text-rose-400 font-mono">{stats.baterias}</span>
              <span className="text-[10px] text-slate-500">regências</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
            <span className="text-[10px] text-purple-400 uppercase font-semibold">Casais MS / PB</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-black text-purple-400 font-mono">{stats.casais}</span>
              <span className="text-[10px] text-slate-500">pavilhões</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border border-amber-500/30 flex flex-col justify-between">
            <span className="text-[10px] text-amber-300 uppercase font-bold flex items-center gap-1">
              <Crown className="w-3 h-3 text-amber-400" />
              <span>Campeão 1º Ano</span>
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-black text-amber-300 font-mono">{stats.campeoesPrimeiroAno}</span>
              <span className="text-[10px] text-amber-400/70">títulos imediatos</span>
            </div>
          </div>
        </div>

        {/* Abas Superiores & Barra de Pesquisa */}
        <div className="px-5 py-3 bg-slate-900/90 border-b border-slate-800 space-y-3 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  setActiveTab('timeline');
                  setSelectedTrajectoryName(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'timeline'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Linha do Tempo (Temporadas)</span>
              </button>

              <button
                onClick={() => setActiveTab('trajetorias')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'trajetorias'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Dossiê dos Profissionais</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('escolas');
                  setSelectedTrajectoryName(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'escolas'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Balanço por Agremiação</span>
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar profissional, escola, ano..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Filtros em linha (Visíveis na Linha do Tempo e Escolas) */}
          {activeTab !== 'trajetorias' && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              {/* Função / Role Filter */}
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                  <Filter className="w-3 h-3 text-amber-400" /> Função:
                </span>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as ProfessionalRole | 'all')}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
                >
                  <option value="all">Todas as Funções</option>
                  <option value="carnavalesco">Carnavalesco</option>
                  <option value="mestreBateria">Mestre de Bateria</option>
                  <option value="interprete">Intérprete Oficial</option>
                  <option value="mestreSalaPortaBandeira">1º Casal MS e PB</option>
                  <option value="coreografo">Coreógrafo da Comissão</option>
                  <option value="harmonia">Diretor de Harmonia</option>
                </select>
              </div>

              {/* Temporada Filter */}
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-slate-400 font-semibold">Temporada:</span>
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
                >
                  <option value="all">Todas as Temporadas</option>
                  {seasons.map((s) => (
                    <option key={s} value={String(s)}>
                      Ano {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Escola Filter */}
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-slate-400 font-semibold">Agremiação:</span>
                <select
                  value={selectedSchoolFilter}
                  onChange={(e) => setSelectedSchoolFilter(e.target.value)}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50 max-w-[160px] truncate"
                >
                  <option value="all">Todas as Escolas</option>
                  {schoolOptions.map((sch) => (
                    <option key={sch} value={sch}>
                      {sch}
                    </option>
                  ))}
                </select>
              </div>

              {/* Toggle: Apenas Campeões no 1º Ano */}
              <button
                onClick={() => setFilterOnlyTitleWinners(!filterOnlyTitleWinners)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition flex items-center gap-1 cursor-pointer ${
                  filterOnlyTitleWinners
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <Crown className="w-3 h-3 text-amber-400" />
                <span>🏆 Campeão 1º Ano</span>
              </button>

              {/* Toggle: Apenas Marcos Históricos */}
              <button
                onClick={() => setFilterOnlyMilestones(!filterOnlyMilestones)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition flex items-center gap-1 cursor-pointer ${
                  filterOnlyMilestones
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <Star className="w-3 h-3 text-purple-400" />
                <span>⭐ Marcos Históricos</span>
              </button>

              {(selectedRole !== 'all' ||
                selectedSeason !== 'all' ||
                selectedSchoolFilter !== 'all' ||
                filterOnlyMilestones ||
                filterOnlyTitleWinners ||
                searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedRole('all');
                    setSelectedSeason('all');
                    setSelectedSchoolFilter('all');
                    setFilterOnlyMilestones(false);
                    setFilterOnlyTitleWinners(false);
                    setSearchQuery('');
                  }}
                  className="px-2 py-1 rounded-lg text-[10px] text-amber-400 hover:text-amber-300 font-semibold underline flex items-center gap-1 cursor-pointer ml-auto"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Limpar Filtros</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Conteúdo Principal com Rolagem Customizada */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-6">
          {/* TAB 1: LINHA DO TEMPO CRONOLÓGICA */}
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              {groupedByYear.length === 0 ? (
                <div className="p-12 text-center text-slate-500 bg-slate-900/30 rounded-2xl border border-slate-800 space-y-2">
                  <History className="w-8 h-8 mx-auto text-slate-600" />
                  <p className="text-sm font-semibold text-slate-400">Nenhuma movimentação encontrada com os filtros atuais.</p>
                  <p className="text-xs text-slate-500">Tente ajustar a função, temporada ou termo de busca.</p>
                </div>
              ) : (
                groupedByYear.map(([year, yearTransfers]) => (
                  <div key={year} className="space-y-3">
                    {/* Header do Ano / Temporada */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-sm font-black shadow-sm">
                        <Calendar className="w-4 h-4 text-amber-400" />
                        <span>Temporada {year}</span>
                      </div>
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-800 via-slate-800 to-transparent" />
                      <span className="text-[11px] text-slate-500 font-mono">
                        {yearTransfers.length} {yearTransfers.length === 1 ? 'movimentação' : 'movimentações'}
                      </span>
                    </div>

                    {/* Cards das Transferências da Temporada */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {yearTransfers.map((item) => {
                        const roleStyle = ROLE_COLORS[item.role] || ROLE_COLORS.carnavalesco;
                        const prevSchoolStyle =
                          SCHOOL_BADGE_STYLE[item.previousSchoolId || ''] || {
                            bg: 'bg-slate-900',
                            text: 'text-slate-300',
                            border: 'border-slate-800'
                          };
                        const newSchoolStyle =
                          SCHOOL_BADGE_STYLE[item.newSchoolId] || {
                            bg: 'bg-slate-900',
                            text: 'text-emerald-300',
                            border: 'border-emerald-500/30'
                          };

                        return (
                          <div
                            key={item.id}
                            className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 transition-all shadow-md flex flex-col justify-between space-y-3"
                          >
                            <div className="space-y-2">
                              {/* Top Bar do Card: Profissional & Cargo & Badges */}
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="font-bold text-white text-sm sm:text-base tracking-tight">
                                      {item.professionalName}
                                    </h4>
                                    <span
                                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${roleStyle.bg} ${roleStyle.text} ${roleStyle.border}`}
                                    >
                                      {item.roleName}
                                    </span>
                                  </div>
                                  {item.dateStr && (
                                    <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">
                                      {item.dateStr}
                                    </span>
                                  )}
                                </div>

                                <div className="flex flex-col items-end gap-1 shrink-0">
                                  {item.wonTitleInFirstYear && (
                                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-sm flex items-center gap-1">
                                      <Crown className="w-3 h-3" />
                                      <span>Campeão no 1º Ano</span>
                                    </span>
                                  )}
                                  {item.isHistoricalMilestone && !item.wonTitleInFirstYear && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1">
                                      <Star className="w-3 h-3 text-purple-400" />
                                      <span>Marco Histórico</span>
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Movimentação De -> Para com Badges */}
                              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                                <div className="flex-1 min-w-0">
                                  <span className="text-[9px] text-slate-500 uppercase font-bold block">Origem</span>
                                  <div className="flex items-center gap-1.5 mt-0.5 truncate">
                                    <span
                                      className={`text-[11px] font-semibold px-2 py-0.5 rounded border truncate ${prevSchoolStyle.bg} ${prevSchoolStyle.text} ${prevSchoolStyle.border}`}
                                    >
                                      {cleanSchoolName(item.previousSchoolName)}
                                    </span>
                                  </div>
                                </div>

                                <div className="p-1 rounded-full bg-slate-900 text-amber-400 shrink-0 border border-slate-800">
                                  <ArrowRight className="w-4 h-4" />
                                </div>

                                <div className="flex-1 min-w-0 text-right">
                                  <span className="text-[9px] text-slate-500 uppercase font-bold block">Destino</span>
                                  <div className="flex items-center justify-end gap-1.5 mt-0.5 truncate">
                                    <span
                                      className={`text-[11px] font-semibold px-2 py-0.5 rounded border truncate ${newSchoolStyle.bg} ${newSchoolStyle.text} ${newSchoolStyle.border}`}
                                    >
                                      {cleanSchoolName(item.newSchoolName)}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Título de Impacto & Crônica */}
                              <div className="space-y-1">
                                {item.impactTitle && (
                                  <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                                    <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                                    <span>{item.impactTitle}</span>
                                  </div>
                                )}
                                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                                  {item.notes}
                                </p>
                              </div>
                            </div>

                            {/* Rodapé do Card com Valores e Ação para Dossiê */}
                            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                              <div className="flex items-center gap-2 text-slate-400 font-mono">
                                {item.valueSalary && item.valueSalary > 0 && (
                                  <span title="Salário estimado da época">
                                    R$ {(item.valueSalary / 1000).toFixed(0)}k/mês
                                  </span>
                                )}
                                {item.buyoutPaid && item.buyoutPaid > 0 && (
                                  <span className="text-rose-400 font-bold">
                                    • Multa: R$ {(item.buyoutPaid / 1000).toFixed(0)}k
                                  </span>
                                )}
                              </div>

                              <button
                                onClick={() => {
                                  setActiveTab('trajetorias');
                                  setSelectedTrajectoryName(item.professionalName);
                                }}
                                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 text-[11px] cursor-pointer"
                              >
                                <span>Ver Trajetória Completa</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: DOSSIÊ DOS PROFISSIONAIS */}
          {activeTab === 'trajetorias' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Coluna da Esquerda: Lista de Profissionais */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-amber-400" />
                    <span>Grandes Nomes ({trajectories.length})</span>
                  </h3>
                </div>

                <div className="max-h-[550px] overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                  {trajectories.map((traj) => {
                    const isSelected = selectedTrajectoryName === traj.professionalName;
                    const roleStyle = ROLE_COLORS[traj.role] || ROLE_COLORS.carnavalesco;
                    return (
                      <button
                        key={traj.professionalName}
                        onClick={() => setSelectedTrajectoryName(traj.professionalName)}
                        className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                            : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="font-bold text-xs truncate text-white">{traj.professionalName}</div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={`text-[9px] px-1.5 py-0.2 rounded border font-semibold ${roleStyle.bg} ${roleStyle.text} ${roleStyle.border}`}>
                              {traj.roleName}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {traj.movesCount} {traj.movesCount === 1 ? 'troca' : 'trocas'}
                            </span>
                          </div>
                        </div>

                        {traj.titlesCount > 0 && (
                          <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 shrink-0 flex items-center gap-0.5">
                            <Crown className="w-2.5 h-2.5" />
                            <span>{traj.titlesCount}</span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Coluna da Direita: Mapa da Trajetória do Selecionado */}
              <div className="lg:col-span-2 space-y-4">
                {activeTrajectory ? (
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-black text-white">{activeTrajectory.professionalName}</h3>
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                              ROLE_COLORS[activeTrajectory.role]?.bg || ''
                            } ${ROLE_COLORS[activeTrajectory.role]?.text || ''} ${
                              ROLE_COLORS[activeTrajectory.role]?.border || ''
                            }`}
                          >
                            {activeTrajectory.roleName}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Linha do tempo oficial de clubes e agremiações defendidas no Carnaval Carioca
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                          <span className="text-slate-500 text-[10px] block uppercase">Movimentações</span>
                          <span className="font-bold text-white font-mono">{activeTrajectory.movesCount} temporadas</span>
                        </div>
                        {activeTrajectory.titlesCount > 0 && (
                          <div className="px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-xs text-amber-300">
                            <span className="text-amber-400/80 text-[10px] block uppercase">Títulos no 1º Ano</span>
                            <span className="font-bold text-amber-300 font-mono">
                              {activeTrajectory.titlesCount} campeonatos
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Timeline Vertical de Passagens */}
                    <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-slate-700 before:to-slate-800">
                      {activeTrajectory.timeline.map((step, idx) => (
                        <div key={step.id} className="relative group">
                          {/* Marcador na Linha */}
                          <div
                            className={`absolute -left-[27px] top-1.5 w-4 h-4 rounded-full border-2 border-slate-950 flex items-center justify-center ${
                              step.wonTitleInFirstYear
                                ? 'bg-amber-400 ring-4 ring-amber-400/20'
                                : 'bg-slate-700 group-hover:bg-amber-400 transition'
                            }`}
                          />

                          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-slate-700 transition space-y-2">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-amber-400 text-xs">
                                  Temporada {step.year}
                                </span>
                                {step.wonTitleInFirstYear && (
                                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 flex items-center gap-1">
                                    <Crown className="w-3 h-3" /> Campeão Invicto
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-500 font-mono">{step.dateStr}</span>
                            </div>

                            <div className="flex items-center gap-2 text-xs flex-wrap font-semibold">
                              <span className="text-slate-400">De:</span>
                              <span className="text-slate-300">{cleanSchoolName(step.previousSchoolName)}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              <span className="text-slate-400">Para:</span>
                              <span className="text-emerald-400 font-bold">{cleanSchoolName(step.newSchoolName)}</span>
                            </div>

                            {step.impactTitle && (
                              <div className="text-xs font-bold text-amber-300 flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-amber-400" />
                                <span>{step.impactTitle}</span>
                              </div>
                            )}

                            <p className="text-xs text-slate-300 leading-relaxed">{step.notes}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-16 text-center text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-2">
                    <User className="w-10 h-10 mx-auto text-slate-600" />
                    <p className="text-sm font-semibold text-slate-300">
                      Selecione um profissional na lista ao lado para ver o histórico e roteiro de clubes.
                    </p>
                    <p className="text-xs text-slate-500">
                      Nomes consagrados como Paulo Barros, Leandro Vieira, Rosa Magalhães, Joãosinho Trinta, Wander Pires e Mestre Ciça.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: BALANÇO POR AGREMIAÇÃO */}
          {activeTab === 'escolas' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>Chegadas e Saídas por Escola</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Entenda quais artistas e comandantes técnicos vestiram o pavilhão de cada agremiação
                    </p>
                  </div>

                  <select
                    value={selectedSchoolFilter}
                    onChange={(e) => setSelectedSchoolFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-300 font-bold focus:outline-none"
                  >
                    <option value="all">Todas as Escolas (Visão Geral)</option>
                    {schoolOptions.map((sch) => (
                      <option key={sch} value={sch}>
                        {sch}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Grid de Escolas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(selectedSchoolFilter === 'all' ? schoolOptions : [selectedSchoolFilter]).map((schoolName) => {
                  const arrivals = unifiedTransfers.filter(
                    (t) => t.newSchoolName.toLowerCase() === schoolName.toLowerCase()
                  );
                  const departures = unifiedTransfers.filter(
                    (t) => t.previousSchoolName?.toLowerCase() === schoolName.toLowerCase()
                  );

                  if (arrivals.length === 0 && departures.length === 0) return null;

                  return (
                    <div
                      key={schoolName}
                      className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        {/* Header da Escola */}
                        <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
                          <h4 className="font-bold text-white text-base tracking-tight truncate">
                            {cleanSchoolName(schoolName)}
                          </h4>
                          <div className="flex items-center gap-1.5 text-[11px] font-mono shrink-0">
                            <span className="text-emerald-400 font-bold">+{arrivals.length} chegadas</span>
                            <span className="text-slate-500">•</span>
                            <span className="text-rose-400 font-bold">-{departures.length} saídas</span>
                          </div>
                        </div>

                        {/* Chegadas / Contratações */}
                        {arrivals.length > 0 && (
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider block">
                              ✦ Contratações Históricas ({arrivals.length}):
                            </span>
                            <div className="space-y-1 max-h-36 overflow-y-auto pr-1 custom-scrollbar">
                              {arrivals.map((arr) => (
                                <div
                                  key={`arr-${arr.id}`}
                                  className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 text-xs flex items-center justify-between gap-2"
                                >
                                  <div className="min-w-0">
                                    <div className="font-semibold text-white truncate flex items-center gap-1.5">
                                      <span>{arr.professionalName}</span>
                                      {arr.wonTitleInFirstYear && (
                                        <span title="Campeão no 1º Ano">
                                          <Crown className="w-3 h-3 text-amber-400 shrink-0" />
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[10px] text-slate-400 truncate">
                                      Veio de: {cleanSchoolName(arr.previousSchoolName)}
                                    </div>
                                  </div>
                                  <span className="text-[10px] font-mono font-bold text-amber-400 shrink-0">
                                    {arr.year}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Saídas / Despedidas */}
                        {departures.length > 0 && (
                          <div className="space-y-1.5 pt-1">
                            <span className="text-[10px] font-extrabold text-rose-400 uppercase tracking-wider block">
                              ✦ Saídas / Despedidas ({departures.length}):
                            </span>
                            <div className="space-y-1 max-h-36 overflow-y-auto pr-1 custom-scrollbar">
                              {departures.map((dep) => (
                                <div
                                  key={`dep-${dep.id}`}
                                  className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 text-xs flex items-center justify-between gap-2"
                                >
                                  <div className="min-w-0">
                                    <div className="font-semibold text-slate-300 truncate">
                                      {dep.professionalName}
                                    </div>
                                    <div className="text-[10px] text-slate-500 truncate">
                                      Destino: {cleanSchoolName(dep.newSchoolName)}
                                    </div>
                                  </div>
                                  <span className="text-[10px] font-mono font-bold text-slate-400 shrink-0">
                                    {dep.year}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Rodapé do Modal */}
        <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Dados sincronizados com o histórico oficial LIESA e simulações do jogo.</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold border border-slate-700 transition cursor-pointer"
          >
            Fechar Janela
          </button>
        </div>
      </div>
    </div>
  );
};
