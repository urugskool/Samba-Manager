import React, { useState, useMemo, useEffect } from 'react';
import { School, YearHistory, DivisionId } from '../types/carnaval';
import {
  HistoricalCarnavalInfo,
  EspecialParticipationRecord,
  LiesaStandingRecord,
  computeEspecialParticipationsList,
  getHistoricalCarnavalsList,
  getLiesaPoints
} from '../services/liesaRankingService';
import {
  getHistoricalOuroCarnavalsList,
  OuroHistoricalCarnaval,
  OuroStandingRecord
} from '../data/ouroHistoricalData';
import {
  computeDivisionParticipationsList,
  GroupParticipationRecord
} from '../services/historicalParticipationsService';
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
  Layers,
  ArrowUpCircle,
  ArrowDownCircle
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

const PARTICIPATIONS_GROUP_CONFIGS: { id: DivisionId; label: string; short: string; badge: string }[] = [
  { id: 'especial', label: 'Grupo Especial', short: 'Especial', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  { id: 'ouro', label: 'Série Ouro', short: 'Série Ouro', badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40' },
  { id: 'prata', label: 'Série Prata', short: 'Série Prata', badge: 'bg-slate-300/20 text-slate-200 border-slate-400/40' },
  { id: 'bronze', label: 'Série Bronze', short: 'Série Bronze', badge: 'bg-amber-700/20 text-amber-400 border-amber-600/40' },
  { id: 'avaliacao', label: 'Grupo de Avaliação', short: 'Avaliação', badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40' }
];

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
  const [pastDivision, setPastDivision] = useState<'especial' | 'ouro'>('especial');
  const [participationsGroup, setParticipationsGroup] = useState<DivisionId>('especial');
  const [selectedPastYear, setSelectedPastYear] = useState<number>(2026);
  const [selectedDecade, setSelectedDecade] = useState<string>('recentes');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSchoolId, setExpandedSchoolId] = useState<string | null>(null);
  const [expandedPartSchoolId, setExpandedPartSchoolId] = useState<string | null>(null);

  // Subgrupos para carnavais históricos com múltiplas ligas/dias
  const [subgroup1984Tab, setSubgroup1984Tab] = useState<'supercampeonato' | 'domingo' | 'segunda' | 'geral'>('supercampeonato');
  const [subgroup1951Tab, setSubgroup1951Tab] = useState<'geral' | 'fbes' | 'ugesb'>('geral');
  const [subgroup1950Tab, setSubgroup1950Tab] = useState<'geral' | 'fbes' | 'uces' | 'ugesb'>('geral');
  const [subgroup1949Tab, setSubgroup1949Tab] = useState<'geral' | 'fbes' | 'ugesb'>('geral');
  const [subgroup1934Tab, setSubgroup1934Tab] = useState<'geral' | 'o_pais' | 'a_hora'>('geral');

  // Atualiza tab quando o modal é aberto
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Lista dos carnavais catalogados (1932 a 2026 + save)
  const historicalCarnavals = useMemo(() => {
    return getHistoricalCarnavalsList(inGameHistory);
  }, [inGameHistory]);

  const currentPastCarnaval = useMemo(() => {
    return historicalCarnavals.find((c) => c.year === selectedPastYear) || historicalCarnavals[0];
  }, [historicalCarnavals, selectedPastYear]);

  const displayedCarnavals = useMemo(() => {
    if (selectedDecade === 'todos') return historicalCarnavals;
    if (selectedDecade === 'recentes') return historicalCarnavals.filter((c) => c.year >= 2020);
    if (selectedDecade === '2010s') return historicalCarnavals.filter((c) => c.year >= 2010 && c.year <= 2019);
    if (selectedDecade === '2000s') return historicalCarnavals.filter((c) => c.year >= 2000 && c.year <= 2009);
    if (selectedDecade === '1990s') return historicalCarnavals.filter((c) => c.year >= 1990 && c.year <= 1999);
    if (selectedDecade === '1980s') return historicalCarnavals.filter((c) => c.year >= 1980 && c.year <= 1989);
    if (selectedDecade === '1970s') return historicalCarnavals.filter((c) => c.year >= 1970 && c.year <= 1979);
    if (selectedDecade === '1960s') return historicalCarnavals.filter((c) => c.year >= 1960 && c.year <= 1969);
    if (selectedDecade === '1950s') return historicalCarnavals.filter((c) => c.year >= 1950 && c.year <= 1959);
    if (selectedDecade === '1940s') return historicalCarnavals.filter((c) => c.year >= 1940 && c.year <= 1949);
    if (selectedDecade === '1930s') return historicalCarnavals.filter((c) => c.year >= 1930 && c.year <= 1939);
    return historicalCarnavals;
  }, [historicalCarnavals, selectedDecade]);

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
    } else if (currentPastCarnaval.year === 1949 && currentPastCarnaval.subgroups) {
      if (subgroup1949Tab === 'fbes' && currentPastCarnaval.subgroups.fbes) {
        baseList = currentPastCarnaval.subgroups.fbes;
      } else if (subgroup1949Tab === 'ugesb' && currentPastCarnaval.subgroups.ugesb) {
        baseList = currentPastCarnaval.subgroups.ugesb;
      }
    } else if (currentPastCarnaval.year === 1934 && currentPastCarnaval.subgroups) {
      if (subgroup1934Tab === 'o_pais' && currentPastCarnaval.subgroups.o_pais) {
        baseList = currentPastCarnaval.subgroups.o_pais;
      } else if (subgroup1934Tab === 'a_hora' && currentPastCarnaval.subgroups.a_hora) {
        baseList = currentPastCarnaval.subgroups.a_hora;
      }
    }

    const q = searchQuery.toLowerCase().trim();
    if (!q) return baseList;
    return baseList.filter((st) => st.schoolName.toLowerCase().includes(q));
  }, [currentPastCarnaval, searchQuery, subgroup1984Tab, subgroup1951Tab, subgroup1950Tab, subgroup1949Tab, subgroup1934Tab]);

  // Lista dos carnavais catalogados da Série Ouro
  const historicalOuroCarnavals = useMemo(() => {
    return getHistoricalOuroCarnavalsList(inGameHistory);
  }, [inGameHistory]);

  const currentPastOuroCarnaval = useMemo(() => {
    return historicalOuroCarnavals.find((c) => c.year === selectedPastYear);
  }, [historicalOuroCarnavals, selectedPastYear]);

  // Colocações filtradas da Série Ouro do carnaval selecionado
  const filteredPastOuroStandings = useMemo(() => {
    if (!currentPastOuroCarnaval) return [];
    const baseList = currentPastOuroCarnaval.standings || [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return baseList;
    return baseList.filter(
      (st) =>
        st.schoolName.toLowerCase().includes(q) ||
        (st.enredo && st.enredo.toLowerCase().includes(q))
    );
  }, [currentPastOuroCarnaval, searchQuery]);

  // Configuração e Lista da Aba de Participações por Grupo
  const currentGroupConfig = useMemo(() => {
    return (
      PARTICIPATIONS_GROUP_CONFIGS.find((g) => g.id === participationsGroup) ||
      PARTICIPATIONS_GROUP_CONFIGS[0]
    );
  }, [participationsGroup]);

  const groupParticipationsList = useMemo(() => {
    return computeDivisionParticipationsList(participationsGroup, schools, inGameHistory);
  }, [participationsGroup, schools, inGameHistory]);

  const filteredGroupParticipations = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return groupParticipationsList;
    return groupParticipationsList.filter(
      (item) =>
        item.schoolName.toLowerCase().includes(q) ||
        (item.school?.shortName && item.school.shortName.toLowerCase().includes(q)) ||
        (item.school?.calledName && item.school.calledName.toLowerCase().includes(q))
    );
  }, [groupParticipationsList, searchQuery]);

  const isNoRelegationYear = currentPastCarnaval
    ? currentPastCarnaval.year <= 1952 ||
      [1971, 1974, 1975, 1979, 1981, 1983, 1988, 1993, 1994, 2011, 2017, 2018, 2021].includes(currentPastCarnaval.year)
    : false;

  const pastCarnavalRelegations = useMemo(() => {
    if (!currentPastCarnaval || currentPastCarnaval.isNoCarnaval || isNoRelegationYear) return [];
    if (currentPastCarnaval.relegatedNames && currentPastCarnaval.relegatedNames.length > 0) {
      return currentPastCarnaval.relegatedNames;
    }
    const relegated = currentPastCarnaval.standings.filter(
      (s) => s.relegated || s.statusDescription?.toLowerCase().includes('rebaixada')
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

  const getRankBadge = (
    rank: number,
    statusDescription?: string,
    isRelegated?: boolean,
    isHorsConcours?: boolean
  ) => {
    const relegated = isRelegated || statusDescription?.toLowerCase().includes('rebaixada');
    if (isHorsConcours || rank === 0) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold">
          HC
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
    if (relegated) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold shadow-sm">
          <ArrowDownCircle className="w-3.5 h-3.5 text-rose-400" />
          {rank}º Rebaixada
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
                  Resultados Oficiais & Participações na Elite (1932 a {currentYear || 2026})
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
              <span>Participações por Grupo</span>
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
              {/* Interactive Year Buttons Selector */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3 shadow-lg">
                {/* Header with Decade Tabs & Active Year Highlight */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-800/80">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white">Carnavais Catalogados:</span>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-black">
                      Carnaval {selectedPastYear}
                    </span>
                    <span className="text-[11px] text-slate-400 hidden sm:inline">
                      • Clique em qualquer ano para abrir o resultado oficial
                    </span>
                  </div>

                  {/* Decade Filter Tabs */}
                  <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-[11px]">
                    {[
                      { id: 'recentes', label: '2020s' },
                      { id: '2010s', label: '2010s' },
                      { id: '2000s', label: '2000s' },
                      { id: '1990s', label: '1990s' },
                      { id: '1980s', label: '1980s' },
                      { id: '1970s', label: '1970s' },
                      { id: '1960s', label: '1960s' },
                      { id: '1950s', label: '1950s' },
                      { id: '1940s', label: '1940s' },
                      { id: '1930s', label: '1930s' },
                      { id: 'todos', label: 'Todos' }
                    ].map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setSelectedDecade(d.id)}
                        className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                          selectedDecade === d.id
                            ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid of Year Buttons */}
                <div className="flex flex-wrap items-center gap-1.5 max-h-40 overflow-y-auto p-1 custom-scrollbar">
                  {displayedCarnavals.map((c) => {
                    const isSelected = selectedPastYear === c.year;
                    return (
                      <button
                        key={c.year}
                        onClick={() => {
                          setSelectedPastYear(c.year);
                          setExpandedSchoolId(null);
                        }}
                        className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center justify-center cursor-pointer text-xs active:scale-95 min-w-[3.75rem] ${
                          isSelected
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/25 ring-2 ring-amber-400 scale-[1.02]'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
                        }`}
                        title={c.isNoCarnaval ? `Carnaval ${c.year} (Sem desfile)` : `Carnaval ${c.year}: Campeã ${c.championNames.join(' & ')}`}
                      >
                        <span className="font-mono text-xs">{c.year}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Division Selector: Grupo Especial / Série Ouro */}
              <div className="flex items-center gap-2 p-1.5 bg-slate-950 rounded-2xl border border-slate-800 w-fit">
                <button
                  onClick={() => {
                    setPastDivision('especial');
                    setExpandedSchoolId(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                    pastDivision === 'especial'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>Grupo Especial</span>
                </button>
                <button
                  onClick={() => {
                    setPastDivision('ouro');
                    setExpandedSchoolId(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                    pastDivision === 'ouro'
                      ? 'bg-yellow-500 text-slate-950 font-black shadow-md shadow-yellow-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Medal className="w-3.5 h-3.5" />
                  <span>Série Ouro</span>
                </button>
              </div>

              {/* GRUPO ESPECIAL VIEW */}
              {pastDivision === 'especial' && (
                currentPastCarnaval.isNoCarnaval ? (
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
                        {pastCarnavalRelegations.length > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <ArrowDownCircle className="w-3.5 h-3.5 text-rose-400" />
                            <span className="text-slate-400">Rebaixada(s) para a Série Ouro:</span>
                            <span className="text-rose-300 font-bold">{pastCarnavalRelegations.join(', ')}</span>
                          </div>
                        ) : isNoRelegationYear ? (
                          <div className="flex items-center gap-1.5 text-slate-400 italic">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>(Não houve rebaixamento neste ano)</span>
                          </div>
                        ) : null}
                      </div>

                      {currentPastCarnaval.notes && (
                        <p className="text-[11px] text-slate-400 italic max-w-3xl pt-1">
                          {currentPastCarnaval.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Sub-leagues selector for 1934 */}
                  {currentPastCarnaval.year === 1934 && currentPastCarnaval.subgroups && (
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-amber-300">Desfiles Competitivos de 1934:</span>
                        <span className="text-slate-400 text-[11px]">2 Periódicos Organizadores (O País e A Hora)</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <button
                          onClick={() => setSubgroup1934Tab('geral')}
                          className={`p-2 rounded-xl text-left border transition cursor-pointer text-xs ${
                            subgroup1934Tab === 'geral'
                              ? 'bg-amber-500/20 border-amber-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-bold text-amber-400 text-[11px]">Geral Combinado (26 Escolas)</div>
                          <div className="text-[10px] text-slate-300">O País + A Hora</div>
                        </button>
                        <button
                          onClick={() => setSubgroup1934Tab('o_pais')}
                          className={`p-2 rounded-xl text-left border transition cursor-pointer text-xs ${
                            subgroup1934Tab === 'o_pais'
                              ? 'bg-emerald-500/20 border-emerald-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-bold text-emerald-400 text-[11px]">Jornal "O País" (16 Escolas)</div>
                          <div className="text-[10px] text-slate-300">Mangueira Campeã</div>
                        </button>
                        <button
                          onClick={() => setSubgroup1934Tab('a_hora')}
                          className={`p-2 rounded-xl text-left border transition cursor-pointer text-xs ${
                            subgroup1934Tab === 'a_hora'
                              ? 'bg-blue-500/20 border-blue-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-bold text-blue-400 text-[11px]">Jornal "A Hora" (20 Escolas)</div>
                          <div className="text-[10px] text-slate-300">Recreio de Ramos Campeã</div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Sub-leagues selector for 1949 */}
                  {currentPastCarnaval.year === 1949 && currentPastCarnaval.subgroups && (
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-amber-300">Competições Oficiais de 1949:</span>
                        <span className="text-slate-400 text-[11px]">2 Ligas (FBES e UGESB) • Não houve rebaixamento</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => setSubgroup1949Tab('geral')}
                          className={`p-2 rounded-xl text-left border transition cursor-pointer text-xs ${
                            subgroup1949Tab === 'geral'
                              ? 'bg-amber-500/20 border-amber-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-bold text-amber-400 text-[11px]">Geral Combinado</div>
                          <div className="text-[10px] text-slate-300">FBES + UGESB</div>
                        </button>
                        <button
                          onClick={() => setSubgroup1949Tab('fbes')}
                          className={`p-2 rounded-xl text-left border transition cursor-pointer text-xs ${
                            subgroup1949Tab === 'fbes'
                              ? 'bg-emerald-500/20 border-emerald-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-bold text-emerald-400 text-[11px]">FBES (28 Escolas)</div>
                          <div className="text-[10px] text-slate-300">Império Serrano Campeã</div>
                        </button>
                        <button
                          onClick={() => setSubgroup1949Tab('ugesb')}
                          className={`p-2 rounded-xl text-left border transition cursor-pointer text-xs ${
                            subgroup1949Tab === 'ugesb'
                              ? 'bg-blue-500/20 border-blue-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-bold text-blue-400 text-[11px]">UGESB (25 Escolas)</div>
                          <div className="text-[10px] text-slate-300">Mangueira Campeã</div>
                        </button>
                      </div>
                    </div>
                  )}

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
                            <th className="py-3 px-4 text-center">Situação / Status</th>
                            <th className="py-3 px-4 text-center w-24">Pontos</th>
                            <th className="py-3 px-3 text-right w-14"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-medium">
                          {filteredPastCarnavalStandings.map((st, idx) => {
                            const isExpanded = expandedSchoolId === `${st.schoolId}_${idx}`;
                            const isUser = userSchool && (userSchool.id === st.schoolId || userSchool.name === st.schoolName);
                            const schoolObj = schools.find((s) => s.id === st.schoolId || s.name.toLowerCase() === st.schoolName.toLowerCase());
                            const historicalEnredo = getHistoricalEnredo(currentPastCarnaval.year, st.schoolId, st.schoolName, schoolObj, inGameHistory);

                            return (
                              <React.Fragment key={`${st.schoolId}_${idx}`}>
                                <tr
                                  onClick={() => toggleExpand(`${st.schoolId}_${idx}`)}
                                  className={`hover:bg-slate-800/40 transition cursor-pointer ${
                                    isUser ? 'bg-amber-500/10' : ''
                                  }`}
                                >
                                  <td className="py-2.5 px-4 whitespace-nowrap">
                                    {getRankBadge(st.rank, st.statusDescription, st.relegated, st.isHorsConcours)}
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
                                  <td className="py-2.5 px-4 text-center whitespace-nowrap">
                                    {st.isHorsConcours || st.rank === 0 ? (
                                      <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                                        <span>Hors concours</span>
                                      </span>
                                    ) : st.rank === 1 ? (
                                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/50 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                                        <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                        <span>Campeã Oficial</span>
                                      </span>
                                    ) : st.rank === 2 ? (
                                      <span className="px-2.5 py-1 rounded-lg bg-slate-300/20 text-slate-200 border border-slate-300/40 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                                        <Medal className="w-3.5 h-3.5 text-slate-300" />
                                        <span>Vice-Campeã</span>
                                      </span>
                                    ) : (st.relegated || st.statusDescription?.toLowerCase().includes('rebaixada')) ? (
                                      <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                                        <ArrowDownCircle className="w-3.5 h-3.5 text-rose-400" />
                                        <span>Rebaixada (Série Ouro)</span>
                                      </span>
                                    ) : st.rank <= 6 ? (
                                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                                        <Award className="w-3.5 h-3.5 text-emerald-400" />
                                        <span>Desfile das Campeãs (G6)</span>
                                      </span>
                                    ) : (
                                      <span className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800 text-[10px] font-medium">
                                        Permanece no Especial
                                      </span>
                                    )}
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
                                    <td colSpan={6} className="p-4 border-t border-slate-800 space-y-2">
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
              )
            )}

              {/* SÉRIE OURO VIEW */}
              {pastDivision === 'ouro' && (
                currentPastOuroCarnaval ? (
                  currentPastOuroCarnaval.isNoCarnaval ? (
                    <div className="p-8 rounded-2xl bg-slate-950/60 border border-dashed border-slate-800 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                        <AlertTriangle className="w-6 h-6 text-yellow-400" />
                      </div>
                      <h3 className="text-lg font-black text-white">Não houve desfiles em {currentPastOuroCarnaval.year}</h3>
                      <p className="text-xs text-slate-400 max-w-lg mx-auto">
                        {currentPastOuroCarnaval.notes}
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Summary Card Série Ouro */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-yellow-950/30 border border-yellow-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">
                            RESULTADO OFICIAL SÉRIE OURO (LIGA-RJ)
                          </span>
                          <span className="text-xs text-slate-300 font-mono font-bold">
                            Carnaval {currentPastOuroCarnaval.year}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            ({currentPastOuroCarnaval.totalSchools} agremiações na Série Ouro)
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                          <div className="flex items-center gap-1.5">
                            <Crown className="w-3.5 h-3.5 text-yellow-400" />
                            <span className="text-slate-400">Campeã:</span>
                            <span className="text-white font-black">{currentPastOuroCarnaval.championNames.join(' & ')}</span>
                          </div>
                          {currentPastOuroCarnaval.viceChampionNames.length > 0 && (
                            <div className="flex items-center gap-1.5">
                              <Medal className="w-3.5 h-3.5 text-slate-300" />
                              <span className="text-slate-400">Vice:</span>
                              <span className="text-slate-200 font-bold">{currentPastOuroCarnaval.viceChampionNames.join(' & ')}</span>
                            </div>
                          )}
                          {currentPastOuroCarnaval.promotedNames.length > 0 && (
                            <div className="flex items-center gap-1.5">
                              <ArrowUpCircle className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-slate-400">Subiu ao Especial:</span>
                              <span className="text-emerald-300 font-bold">{currentPastOuroCarnaval.promotedNames.join(', ')}</span>
                            </div>
                          )}
                          {currentPastOuroCarnaval.relegatedNames && currentPastOuroCarnaval.relegatedNames.length > 0 ? (
                            <div className="flex items-center gap-1.5">
                              <ArrowDownCircle className="w-3.5 h-3.5 text-rose-400" />
                              <span className="text-slate-400">Rebaixada(s) para a Série Prata:</span>
                              <span className="text-rose-300 font-bold">{currentPastOuroCarnaval.relegatedNames.join(', ')}</span>
                            </div>
                          ) : (currentPastOuroCarnaval.year === 2018 || currentPastOuroCarnaval.year === 2026) ? (
                            <div className="flex items-center gap-1.5 text-slate-400 italic">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                              <span>(Não houve rebaixamento neste ano)</span>
                            </div>
                          ) : null}
                        </div>

                        {currentPastOuroCarnaval.notes && (
                          <p className="text-[11px] text-yellow-200/90 font-medium italic max-w-3xl pt-1">
                            {currentPastOuroCarnaval.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Standings Table Série Ouro */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-slate-900/90 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                              <th className="py-3 px-4 w-20">Classificação</th>
                              <th className="py-3 px-4">Agremiação</th>
                              <th className="py-3 px-4 hidden md:table-cell">Enredo Oficial</th>
                              <th className="py-3 px-4 text-center">Movimentação / Status</th>
                              <th className="py-3 px-3 text-right w-14"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 font-medium">
                            {filteredPastOuroStandings.map((st, idx) => {
                              const isExpanded = expandedSchoolId === `ouro_${st.schoolId}_${idx}`;
                              const isUser = userSchool && (userSchool.id === st.schoolId || userSchool.name === st.schoolName);
                              const schoolObj = schools.find((s) => s.id === st.schoolId || s.name.toLowerCase() === st.schoolName.toLowerCase());
                              const enredoTitle = st.enredo || getHistoricalEnredo(currentPastOuroCarnaval.year, st.schoolId, st.schoolName, schoolObj, inGameHistory);

                              return (
                                <React.Fragment key={`ouro_${st.schoolId}_${idx}`}>
                                  <tr
                                    onClick={() => toggleExpand(`ouro_${st.schoolId}_${idx}`)}
                                    className={`hover:bg-slate-800/40 transition cursor-pointer ${
                                      isUser ? 'bg-yellow-500/10' : ''
                                    }`}
                                  >
                                    <td className="py-3 px-4 whitespace-nowrap">
                                      <span className={`inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black ${
                                        st.isHorsConcours || st.rank === 0
                                          ? 'bg-purple-950/80 text-purple-300 border border-purple-700/50 font-bold text-[10px]'
                                          : st.promoted || st.rank === 1
                                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                                          : st.rank === 2
                                          ? 'bg-slate-300 text-slate-950 font-bold'
                                          : st.rank === 3
                                          ? 'bg-amber-700/60 text-amber-200 border border-amber-600/40'
                                          : st.relegated
                                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                                          : 'bg-slate-900 text-slate-300 border border-slate-800 font-mono'
                                      }`}>
                                        {st.relegated && <ArrowDownCircle className="w-3.5 h-3.5 text-rose-400" />}
                                        {st.promoted && st.rank === 1 && <Crown className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />}
                                        {st.isHorsConcours || st.rank === 0 ? 'HC' : `${st.rank}ª`}
                                      </span>
                                    </td>

                                    <td className="py-3 px-4 font-bold text-white">
                                      <div className="flex items-center gap-2">
                                        {schoolObj?.colors && (
                                          <div
                                            className="w-3 h-3 rounded-full shrink-0 border border-white/20"
                                            style={{ backgroundColor: schoolObj.colors.primary }}
                                          />
                                        )}
                                        <span className={isUser ? 'text-yellow-300' : ''}>{st.schoolName}</span>
                                        {isUser && (
                                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                                            Sua Escola
                                          </span>
                                        )}
                                      </div>
                                    </td>

                                    <td className="py-3 px-4 text-slate-300 italic text-[11px] max-w-xs truncate hidden md:table-cell">
                                      {enredoTitle ? `"${enredoTitle}"` : '—'}
                                    </td>

                                    <td className="py-3 px-4 text-center whitespace-nowrap">
                                      {st.isHorsConcours || st.rank === 0 ? (
                                        <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                                          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                                          <span>Hors concours (Não julgada)</span>
                                        </span>
                                      ) : st.promoted || st.rank === 1 ? (
                                        <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                                          <ArrowUpCircle className="w-3.5 h-3.5 text-emerald-400" />
                                          <span>Subiu (Grupo Especial)</span>
                                        </span>
                                      ) : st.relegated ? (
                                        <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                                          <ArrowDownCircle className="w-3.5 h-3.5 text-rose-400" />
                                          <span>Rebaixada (Série Prata)</span>
                                        </span>
                                      ) : (
                                        <span className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800 text-[10px] font-medium">
                                          Permanece na Série Ouro
                                        </span>
                                      )}
                                    </td>

                                    <td className="py-3 px-3 text-right">
                                      <ChevronRight
                                        className={`w-4 h-4 text-slate-500 transition-transform ${
                                          isExpanded ? 'rotate-90 text-yellow-400' : ''
                                        }`}
                                      />
                                    </td>
                                  </tr>

                                  {isExpanded && (
                                    <tr className="bg-slate-900/80">
                                      <td colSpan={5} className="p-4 border-t border-slate-800 space-y-2">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                                          <div>
                                            <span className="text-slate-400">Enredo Oficial de {currentPastOuroCarnaval.year}: </span>
                                            <span className="text-white font-bold italic">
                                              {enredoTitle ? `"${enredoTitle}"` : 'Registro em catálogo'}
                                            </span>
                                          </div>
                                          {st.statusDescription && (
                                            <div className="text-[11px] text-yellow-300 font-medium">
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
                  )
                ) : (
                  <div className="p-8 rounded-2xl bg-slate-950/60 border border-dashed border-slate-800 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                      <Info className="w-6 h-6 text-yellow-400" />
                    </div>
                    <h3 className="text-lg font-black text-white">Série Ouro em Catalogação</h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      Os resultados da Série Ouro para o Carnaval de {selectedPastYear} ainda não foram inseridos no catálogo histórico. Os registros oficiais estão disponíveis a partir de 2011.
                    </p>
                    <button
                      onClick={() => setSelectedPastYear(2026)}
                      className="px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 text-xs font-black transition cursor-pointer"
                    >
                      Ver Carnaval 2026 (Série Ouro)
                    </button>
                  </div>
                )
              )}
            </div>
          )}

          {/* TAB 2: PARTICIPAÇÕES POR GRUPO COM SUB-ABAS */}
          {activeTab === 'participacoes' && (
            <div className="space-y-4">
              {/* Sub-abas de Grupos */}
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-2 rounded-2xl border border-slate-800">
                {PARTICIPATIONS_GROUP_CONFIGS.map((grp) => (
                  <button
                    key={grp.id}
                    onClick={() => {
                      setParticipationsGroup(grp.id);
                      setExpandedPartSchoolId(null);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                      participationsGroup === grp.id
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <span>{grp.label}</span>
                  </button>
                ))}
              </div>

              {/* Header Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-black text-white text-sm flex items-center gap-2">
                    <span>Ranking de Presenças — {currentGroupConfig.label}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {filteredGroupParticipations.length} Agremiações
                    </span>
                  </h4>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Ordenado decrescentemente pelo número total de temporadas catalogadas na {currentGroupConfig.label}.
                  </p>
                </div>
              </div>

              {/* Table */}
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
                      {filteredGroupParticipations.map((item, idx) => {
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
                                  {item.isCurrentlyInGroup && (
                                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                                      Atual {currentGroupConfig.short}
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
                                      Anos de Desfile na {currentGroupConfig.label} ({item.years.length}):
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
