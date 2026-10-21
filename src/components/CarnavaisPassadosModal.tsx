import React, { useState, useMemo, useEffect } from 'react';
import { School, YearHistory } from '../types/carnaval';
import {
  HistoricalCarnavalInfo,
  EspecialParticipationRecord,
  LiesaStandingRecord,
  computeEspecialParticipationsList,
  getHistoricalCarnavalsList,
  getLiesaPoints
} from '../services/liesaRankingService';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import {
  Trophy,
  Crown,
  Medal,
  Calendar,
  Award,
  History,
  BookOpen,
  Search,
  X,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  AlertTriangle,
  Info,
  Sparkles,
  Layers
} from 'lucide-react';
import {
  getHistoricalEnredo,
  getSchoolHistoricalEnredosList
} from '../data/historicalEnredosData';

interface CarnavaisPassadosModalProps {
  isOpen: boolean;
  onClose: () => void;
  schools: School[];
  inGameHistory?: YearHistory[];
  currentYear: number;
  userSchool?: School | null;
  onSelectSchool?: (schoolId: string) => void;
  initialTab?: 'carnavais_passados' | 'participacoes';
}

export const CarnavaisPassadosModal: React.FC<CarnavaisPassadosModalProps> = ({
  isOpen,
  onClose,
  schools,
  inGameHistory = [],
  currentYear,
  userSchool,
  onSelectSchool,
  initialTab = 'carnavais_passados'
}) => {
  const [activeTab, setActiveTab] = useState<'carnavais_passados' | 'participacoes'>(initialTab);
  const [selectedPastYear, setSelectedPastYear] = useState<number>(2026);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSchoolId, setExpandedSchoolId] = useState<string | null>(null);
  const [expandedPartSchoolId, setExpandedPartSchoolId] = useState<string | null>(null);

  // Subgrupos para carnavais históricos com múltiplas ligas/dias
  const [subgroup1984Tab, setSubgroup1984Tab] = useState<'supercampeonato' | 'domingo' | 'segunda' | 'geral'>('supercampeonato');
  const [subgroup1951Tab, setSubgroup1951Tab] = useState<'geral' | 'fbes' | 'ugesb'>('geral');
  const [subgroup1950Tab, setSubgroup1950Tab] = useState<'geral' | 'fbes' | 'uces' | 'ugesb'>('geral');

  // Atualiza tab quando o modal é aberto
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Lista dos carnavais catalogados (1950 a 2026 + save)
  const historicalCarnavals = useMemo(() => {
    return getHistoricalCarnavalsList(inGameHistory);
  }, [inGameHistory]);

  const currentPastCarnaval = useMemo(() => {
    return historicalCarnavals.find((c) => c.year === selectedPastYear) || historicalCarnavals[0];
  }, [historicalCarnavals, selectedPastYear]);

  // Define o ano inicial ao abrir
  useEffect(() => {
    if (isOpen && historicalCarnavals.length > 0) {
      setSelectedPastYear(historicalCarnavals[0].year);
    }
  }, [isOpen, historicalCarnavals]);

  // Participações no Grupo Especial
  const participationsList = useMemo(() => {
    return computeEspecialParticipationsList(schools, inGameHistory);
  }, [schools, inGameHistory]);

  const filteredParticipations = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return participationsList;
    return participationsList.filter(
      (item) =>
        item.schoolName.toLowerCase().includes(q) ||
        (item.school?.shortName && item.school.shortName.toLowerCase().includes(q)) ||
        (item.school?.calledName && item.school.calledName.toLowerCase().includes(q))
    );
  }, [participationsList, searchQuery]);

  // Colocações filtradas do carnaval selecionado
  const filteredPastCarnavalStandings = useMemo(() => {
    if (!currentPastCarnaval) return [];
    let baseList = currentPastCarnaval.standings || [];

    if (currentPastCarnaval.year === 1984 && currentPastCarnaval.subgroups) {
      if (subgroup1984Tab === 'domingo' && currentPastCarnaval.subgroups.domingo) {
        baseList = currentPastCarnaval.subgroups.domingo;
      } else if (subgroup1984Tab === 'segunda' && currentPastCarnaval.subgroups.segunda) {
        baseList = currentPastCarnaval.subgroups.segunda;
      } else if (subgroup1984Tab === 'supercampeonato' && currentPastCarnaval.subgroups.supercampeonato) {
        baseList = currentPastCarnaval.subgroups.supercampeonato;
      }
    } else if (currentPastCarnaval.year === 1951 && currentPastCarnaval.subgroups) {
      if (subgroup1951Tab === 'fbes' && currentPastCarnaval.subgroups.fbes) {
        baseList = currentPastCarnaval.subgroups.fbes;
      } else if (subgroup1951Tab === 'ugesb' && currentPastCarnaval.subgroups.ugesb) {
        baseList = currentPastCarnaval.subgroups.ugesb;
      }
    } else if (currentPastCarnaval.year === 1950 && currentPastCarnaval.subgroups) {
      if (subgroup1950Tab === 'fbes' && currentPastCarnaval.subgroups.fbes) {
        baseList = currentPastCarnaval.subgroups.fbes;
      } else if (subgroup1950Tab === 'uces' && currentPastCarnaval.subgroups.uces) {
        baseList = currentPastCarnaval.subgroups.uces;
      } else if (subgroup1950Tab === 'ugesb' && currentPastCarnaval.subgroups.ugesb) {
        baseList = currentPastCarnaval.subgroups.ugesb;
      }
    }

    const q = searchQuery.toLowerCase().trim();
    if (!q) return baseList;
    return baseList.filter((st) => st.schoolName.toLowerCase().includes(q));
  }, [currentPastCarnaval, searchQuery, subgroup1984Tab, subgroup1951Tab, subgroup1950Tab]);

  const isNoRelegationYear = currentPastCarnaval
    ? currentPastCarnaval.year <= 1952 ||
      [1971, 1974, 1975, 1979, 1981, 1983, 1988, 1993, 1994, 2011, 2017, 2018].includes(currentPastCarnaval.year)
    : false;

  const pastCarnavalRelegations = useMemo(() => {
    if (!currentPastCarnaval || currentPastCarnaval.isNoCarnaval || isNoRelegationYear) return [];
    const relegated = currentPastCarnaval.standings.filter((s) =>
      s.statusDescription?.toLowerCase().includes('rebaixada')
    );
    if (relegated.length > 0) {
      return Array.from(new Set(relegated.map((s) => s.schoolName)));
    }
    return [];
  }, [currentPastCarnaval, isNoRelegationYear]);

  if (!isOpen) return null;

  const toggleExpand = (schoolId: string) => {
    setExpandedSchoolId((prev) => (prev === schoolId ? null : schoolId));
  };

  const togglePartExpand = (schoolId: string) => {
    setExpandedPartSchoolId((prev) => (prev === schoolId ? null : schoolId));
  };

  const getRankBadge = (rank: number, statusDescription?: string) => {
    if (statusDescription?.toLowerCase().includes('rebaixada')) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 text-xs font-bold">
          {rank}º Rebaixada
        </span>
      );
    }
    if (rank === 1) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/50 font-black text-xs shadow-sm">
          <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          1º Campeã
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-300/20 text-slate-200 border border-slate-300/40 font-bold text-xs">
          <Medal className="w-3 h-3 text-slate-300" />
          2º Vice
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-700/25 text-amber-400 border border-amber-600/40 font-bold text-xs">
          <Medal className="w-3 h-3 text-amber-500" />
          3º Lugar
        </span>
      );
    }
    if (rank <= 6) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold text-xs">
          {rank}º G6
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-slate-800 text-slate-400 font-mono text-xs">
        {rank}º
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center text-amber-400 shrink-0 shadow-lg shadow-amber-500/10">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  MEMÓRIA DO SAMBA
                </span>
                <span className="text-xs text-slate-400">
                  Resultados Oficiais & Participações na Elite (1950 a {currentYear || 2026})
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5 flex items-center gap-2">
                Carnavais Passados
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher & Search Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-2xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('carnavais_passados')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'carnavais_passados'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Resultados Ano a Ano ({historicalCarnavals.length} Carnavais)</span>
            </button>
            <button
              onClick={() => setActiveTab('participacoes')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'participacoes'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Participações no Especial ({participationsList.length} Escolas)</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={activeTab === 'carnavais_passados' ? 'Buscar no desfile...' : 'Buscar escola...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 transition"
            />
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar">
          {/* TAB 1: RESULTADOS ANO A ANO */}
          {activeTab === 'carnavais_passados' && (
            <div className="space-y-4">
              {/* Year Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-slate-300">Selecione o Carnaval:</span>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedPastYear}
                    onChange={(e) => {
                      setSelectedPastYear(Number(e.target.value));
                      setExpandedSchoolId(null);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-300 font-bold text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    {historicalCarnavals.map((c) => (
                      <option key={c.year} value={c.year} className="bg-slate-900 text-white">
                        Carnaval {c.year} {c.isNoCarnaval ? '(Sem Desfile)' : `• ${c.championNames.join(' & ')}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Ano sem Carnaval (ex: 2021 ou 1952) */}
              {currentPastCarnaval.isNoCarnaval ? (
                <div className="p-8 rounded-2xl bg-slate-950/60 border border-dashed border-slate-800 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                    <AlertTriangle className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-black text-white">Ano sem desfiles oficiais</h3>
                  <p className="text-xs text-slate-400 max-w-lg mx-auto">{currentPastCarnaval.notes}</p>
                </div>
              ) : (
                <>
                  {/* Summary Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/30 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          {currentPastCarnaval.year === 1950
                            ? 'RESULTADO OFICIAL FBES / UCES / UGESB'
                            : currentPastCarnaval.year === 1951
                            ? 'RESULTADO OFICIAL FBES / UGESB'
                            : currentPastCarnaval.year <= 1984
                            ? 'RESULTADO OFICIAL AESCRJ'
                            : 'RESULTADO OFICIAL LIESA'}
                        </span>
                        <span className="text-xs text-slate-300 font-mono font-bold">
                          Carnaval {currentPastCarnaval.year}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          ({currentPastCarnaval.totalSchools} agremiações no Grupo Especial)
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Crown className="w-3.5 h-3.5 text-amber-400" />
                          <span className="text-slate-400">Campeã:</span>
                          <span className="text-white font-black">{currentPastCarnaval.championNames.join(' & ')}</span>
                        </div>
                        {currentPastCarnaval.viceChampionNames.length > 0 && (
                          <div className="flex items-center gap-1.5">
                            <Medal className="w-3.5 h-3.5 text-slate-300" />
                            <span className="text-slate-400">Vice:</span>
                            <span className="text-slate-200 font-bold">{currentPastCarnaval.viceChampionNames.join(' & ')}</span>
                          </div>
                        )}
                      </div>

                      {currentPastCarnaval.notes && (
                        <p className="text-[11px] text-slate-400 italic max-w-3xl pt-1">
                          {currentPastCarnaval.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Sub-leagues selector for 1950 */}
                  {currentPastCarnaval.year === 1950 && currentPastCarnaval.subgroups && (
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-amber-300">Competições Oficiais de 1950:</span>
                        <span className="text-slate-400 text-[11px]">3 Ligas • Não houve rebaixamento</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <button
                          onClick={() => setSubgroup1950Tab('geral')}
                          className={`p-2 rounded-xl text-left border transition cursor-pointer text-xs ${
                            subgroup1950Tab === 'geral'
                              ? 'bg-amber-500/20 border-amber-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-bold text-amber-400 text-[11px]">Geral Combinado</div>
                          <div className="text-[10px] text-slate-300">Todas as Ligas</div>
                        </button>
                        <button
                          onClick={() => setSubgroup1950Tab('fbes')}
                          className={`p-2 rounded-xl text-left border transition cursor-pointer text-xs ${
                            subgroup1950Tab === 'fbes'
                              ? 'bg-emerald-500/20 border-emerald-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-bold text-emerald-400 text-[11px]">FBES (34 Escolas)</div>
                          <div className="text-[10px] text-slate-300">Império Serrano Campeã</div>
                        </button>
                        <button
                          onClick={() => setSubgroup1950Tab('uces')}
                          className={`p-2 rounded-xl text-left border transition cursor-pointer text-xs ${
                            subgroup1950Tab === 'uces'
                              ? 'bg-pink-500/20 border-pink-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-bold text-pink-400 text-[11px]">UCES (11 Escolas)</div>
                          <div className="text-[10px] text-slate-300">Mangueira Campeã</div>
                        </button>
                        <button
                          onClick={() => setSubgroup1950Tab('ugesb')}
                          className={`p-2 rounded-xl text-left border transition cursor-pointer text-xs ${
                            subgroup1950Tab === 'ugesb'
                              ? 'bg-blue-500/20 border-blue-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-bold text-blue-400 text-[11px]">UGESB (20 Escolas)</div>
                          <div className="text-[10px] text-slate-300">Serrinha & Capela</div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Sub-leagues selector for 1951 */}
                  {currentPastCarnaval.year === 1951 && currentPastCarnaval.subgroups && (
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-amber-300">Competições Oficiais de 1951:</span>
                        <span className="text-slate-400 text-[11px]">2 Ligas • Não houve rebaixamento</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => setSubgroup1951Tab('geral')}
                          className={`p-2 rounded-xl text-left border transition cursor-pointer text-xs ${
                            subgroup1951Tab === 'geral'
                              ? 'bg-amber-500/20 border-amber-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-bold text-amber-400 text-[11px]">Geral Combinado</div>
                          <div className="text-[10px] text-slate-300">FBES + UGESB</div>
                        </button>
                        <button
                          onClick={() => setSubgroup1951Tab('fbes')}
                          className={`p-2 rounded-xl text-left border transition cursor-pointer text-xs ${
                            subgroup1951Tab === 'fbes'
                              ? 'bg-emerald-500/20 border-emerald-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-bold text-emerald-400 text-[11px]">FBES (31 Escolas)</div>
                          <div className="text-[10px] text-slate-300">Império Serrano Campeã</div>
                        </button>
                        <button
                          onClick={() => setSubgroup1951Tab('ugesb')}
                          className={`p-2 rounded-xl text-left border transition cursor-pointer text-xs ${
                            subgroup1951Tab === 'ugesb'
                              ? 'bg-blue-500/20 border-blue-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-bold text-blue-400 text-[11px]">UGESB (20 Escolas)</div>
                          <div className="text-[10px] text-slate-300">Portela Campeã</div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Subgroups selector for 1984 */}
                  {currentPastCarnaval.year === 1984 && currentPastCarnaval.subgroups && (
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-amber-300">Inauguração do Sambódromo (1984):</span>
                        <span className="text-slate-400 text-[11px]">3 Campeãs Oficiais</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <button
                          onClick={() => setSubgroup1984Tab('supercampeonato')}
                          className={`p-2 rounded-xl text-left border transition cursor-pointer text-xs ${
                            subgroup1984Tab === 'supercampeonato'
                              ? 'bg-amber-500/20 border-amber-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-bold text-amber-400 text-[11px]">Supercampeonato</div>
                          <div className="text-[10px] text-slate-300">Mangueira Supercampeã</div>
                        </button>
                        <button
                          onClick={() => setSubgroup1984Tab('domingo')}
                          className={`p-2 rounded-xl text-left border transition cursor-pointer text-xs ${
                            subgroup1984Tab === 'domingo'
                              ? 'bg-amber-500/20 border-amber-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-bold text-amber-400 text-[11px]">Domingo</div>
                          <div className="text-[10px] text-slate-300">Portela Campeã</div>
                        </button>
                        <button
                          onClick={() => setSubgroup1984Tab('segunda')}
                          className={`p-2 rounded-xl text-left border transition cursor-pointer text-xs ${
                            subgroup1984Tab === 'segunda'
                              ? 'bg-amber-500/20 border-amber-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-bold text-amber-400 text-[11px]">Segunda-Feira</div>
                          <div className="text-[10px] text-slate-300">Mangueira Campeã</div>
                        </button>
                        <button
                          onClick={() => setSubgroup1984Tab('geral')}
                          className={`p-2 rounded-xl text-left border transition cursor-pointer text-xs ${
                            subgroup1984Tab === 'geral'
                              ? 'bg-amber-500/20 border-amber-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-bold text-amber-400 text-[11px]">Geral LIESA</div>
                          <div className="text-[10px] text-slate-300">Pontuação Cumulativa</div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Standings Table */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-900/90 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                            <th className="py-3 px-4 w-28">Colocação</th>
                            <th className="py-3 px-4">Agremiação</th>
                            <th className="py-3 px-4 hidden md:table-cell">Enredo Histórico</th>
                            <th className="py-3 px-4 text-center w-24">Pontos</th>
                            <th className="py-3 px-3 text-right w-16"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-medium">
                          {filteredPastCarnavalStandings.map((st, idx) => {
                            const isExpanded = expandedSchoolId === `${st.schoolId}_${idx}`;
                            const isUser = userSchool && (userSchool.id === st.schoolId || userSchool.name === st.schoolName);
                            const historicalEnredo = getHistoricalEnredo(currentPastCarnaval.year, st.schoolId, st.schoolName);
                            const schoolObj = schools.find((s) => s.id === st.schoolId || s.name.toLowerCase() === st.schoolName.toLowerCase());

                            return (
                              <React.Fragment key={`${st.schoolId}_${idx}`}>
                                <tr
                                  onClick={() => toggleExpand(`${st.schoolId}_${idx}`)}
                                  className={`hover:bg-slate-800/40 transition cursor-pointer ${
                                    isUser ? 'bg-amber-500/10' : ''
                                  }`}
                                >
                                  <td className="py-2.5 px-4 whitespace-nowrap">
                                    {getRankBadge(st.rank, st.statusDescription)}
                                  </td>
                                  <td className="py-2.5 px-4 font-bold text-white">
                                    <div className="flex items-center gap-2">
                                      {schoolObj?.colors && (
                                        <div
                                          className="w-3 h-3 rounded-full shrink-0 border border-white/20"
                                          style={{ backgroundColor: schoolObj.colors.primary }}
                                        />
                                      )}
                                      <span className={isUser ? 'text-amber-300' : ''}>
                                        {st.schoolName}
                                      </span>
                                      {st.league && (
                                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                                          {st.league}
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="py-2.5 px-4 text-slate-300 hidden md:table-cell italic truncate max-w-xs">
                                    {historicalEnredo ? `"${historicalEnredo}"` : '—'}
                                  </td>
                                  <td className="py-2.5 px-4 text-center font-mono font-bold text-amber-300">
                                    {st.totalScore !== undefined
                                      ? st.totalScore.toFixed(1)
                                      : `+${getLiesaPoints(st.rank)} pts`}
                                  </td>
                                  <td className="py-2.5 px-3 text-right">
                                    <ChevronRight
                                      className={`w-4 h-4 text-slate-500 transition-transform ${
                                        isExpanded ? 'rotate-90 text-amber-400' : ''
                                      }`}
                                    />
                                  </td>
                                </tr>

                                {isExpanded && (
                                  <tr className="bg-slate-900/80">
                                    <td colSpan={5} className="p-4 border-t border-slate-800 space-y-2">
                                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                                        <div>
                                          <span className="text-slate-400">Enredo em {currentPastCarnaval.year}: </span>
                                          <span className="text-white font-bold italic">
                                            {historicalEnredo ? `"${historicalEnredo}"` : 'Registro em catálogo'}
                                          </span>
                                        </div>
                                        {st.statusDescription && (
                                          <div className="text-[11px] text-amber-300 font-medium">
                                            {st.statusDescription}
                                          </div>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 2: PARTICIPAÇÕES NO GRUPO ESPECIAL */}
          {activeTab === 'participacoes' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-black text-white text-sm">
                    Ranking de Presenças na Elite do Carnaval ({participationsList.length} Agremiações)
                  </h4>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Ordenado decrescentemente pelo número total de anos de desfile no Grupo Especial (1950 a {currentYear || 2026}).
                  </p>
                </div>
                <div className="text-slate-400 font-mono text-[11px] shrink-0">
                  Total de Edições Catalogadas: <strong className="text-amber-300 font-bold">{historicalCarnavals.length}</strong>
                </div>
              </div>

              {/* Participations Table */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-900/90 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                        <th className="py-3 px-4 w-16 text-center">Pos</th>
                        <th className="py-3 px-4">Agremiação</th>
                        <th className="py-3 px-4 text-center">Temporadas</th>
                        <th className="py-3 px-4 text-center hidden sm:table-cell">1ª Vez</th>
                        <th className="py-3 px-4 text-center hidden sm:table-cell">Mais Recente</th>
                        <th className="py-3 px-4 text-center">Títulos</th>
                        <th className="py-3 px-4 text-center">Vices</th>
                        <th className="py-3 px-3 text-right w-14"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {filteredParticipations.map((item, idx) => {
                        const isExpanded = expandedPartSchoolId === item.schoolId;
                        const isUser = userSchool && userSchool.id === item.schoolId;

                        return (
                          <React.Fragment key={item.schoolId}>
                            <tr
                              onClick={() => togglePartExpand(item.schoolId)}
                              className={`hover:bg-slate-800/40 transition cursor-pointer ${
                                isUser ? 'bg-amber-500/10' : ''
                              }`}
                            >
                              <td className="py-2.5 px-4 text-center font-mono font-bold text-slate-400">
                                {idx + 1}º
                              </td>
                              <td className="py-2.5 px-4 font-bold text-white">
                                <div className="flex items-center gap-2">
                                  {item.school?.colors && (
                                    <div
                                      className="w-3 h-3 rounded-full shrink-0 border border-white/20"
                                      style={{ backgroundColor: item.school.colors.primary }}
                                    />
                                  )}
                                  <span className={isUser ? 'text-amber-300' : ''}>{item.schoolName}</span>
                                  {item.isCurrentlyInEspecial && (
                                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                                      Atual Especial
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-black text-amber-400 text-sm">
                                {item.totalParticipations}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono text-slate-300 hidden sm:table-cell">
                                {item.firstYear || '—'}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono text-slate-300 hidden sm:table-cell">
                                {item.lastYear || '—'}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-bold text-amber-300">
                                {item.titlesCount}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono text-slate-400">
                                {item.vicesCount}
                              </td>
                              <td className="py-2.5 px-3 text-right">
                                <ChevronRight
                                  className={`w-4 h-4 text-slate-500 transition-transform ${
                                    isExpanded ? 'rotate-90 text-amber-400' : ''
                                  }`}
                                />
                              </td>
                            </tr>

                            {isExpanded && (
                              <tr className="bg-slate-900/80">
                                <td colSpan={8} className="p-4 border-t border-slate-800 space-y-3">
                                  <div>
                                    <span className="text-xs font-bold text-amber-300">
                                      Anos de Desfile no Grupo Especial ({item.years.length}):
                                    </span>
                                    <div className="flex flex-wrap gap-1.5 mt-1.5 max-h-36 overflow-y-auto pr-1 custom-scrollbar">
                                      {item.years.map((y) => (
                                        <span
                                          key={y}
                                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                                        >
                                          {y}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
