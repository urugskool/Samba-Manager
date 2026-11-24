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
  getHistoricalPrataCarnavalsList
} from '../data/prataHistoricalData';
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
  ArrowDownCircle,
  Palette,
  Landmark
} from 'lucide-react';
import {
  getHistoricalEnredo,
  getSchoolHistoricalEnredosList
} from '../data/historicalEnredosData';
import {
  getTopDivisionMetadata,
  getChampionCarnavalescosByYear,
  HISTORICAL_DIVISION_TIMELINE,
  getOuroDivisionMetadata,
  getOuroChampionCarnavalescosByYear,
  HISTORICAL_OURO_DIVISION_TIMELINE
} from '../services/carnavalescosRankingService';

interface CarnavaisPassadosModalProps {
  isOpen: boolean;
  onClose: () => void;
  schools: School[];
  inGameHistory?: YearHistory[];
  currentYear: number;
  userSchool?: School | null;
  onSelectSchool?: (schoolId: string) => void;
  initialTab?: 'carnavais_passados' | 'participacoes' | 'nomenclatura';
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
  const [activeTab, setActiveTab] = useState<'carnavais_passados' | 'participacoes' | 'nomenclatura'>(initialTab);
  const [pastDivision, setPastDivision] = useState<'especial' | 'ouro' | 'prata' | 'bronze' | 'avaliacao'>('especial');
  const [nomenclatureDivision, setNomenclatureDivision] = useState<'especial' | 'ouro'>('especial');
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
  const [subgroupPrataTab, setSubgroupPrataTab] = useState<'geral' | 'noite1' | 'noite2' | 'liesb' | 'livres'>('geral');

  useEffect(() => {
    setSubgroupPrataTab('geral');
  }, [selectedPastYear]);

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

  const latestPastYear = useMemo(() => {
    return historicalCarnavals && historicalCarnavals.length > 0
      ? historicalCarnavals[0].year
      : 2026;
  }, [historicalCarnavals]);

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

  // Lista dos carnavais catalogados da Série Prata
  const historicalPrataCarnavals = useMemo(() => {
    return getHistoricalPrataCarnavalsList(inGameHistory);
  }, [inGameHistory]);

  const currentPastPrataCarnaval = useMemo(() => {
    return historicalPrataCarnavals.find((c) => c.year === selectedPastYear);
  }, [historicalPrataCarnavals, selectedPastYear]);

  // Colocações filtradas da Série Prata do carnaval selecionado
  const filteredPastPrataStandings = useMemo(() => {
    if (!currentPastPrataCarnaval) return [];
    let baseList = currentPastPrataCarnaval.standings || [];
    if (currentPastPrataCarnaval.subgroups) {
      if (subgroupPrataTab === 'noite1' && currentPastPrataCarnaval.subgroups.noite1) {
        baseList = currentPastPrataCarnaval.subgroups.noite1;
      } else if (subgroupPrataTab === 'noite2' && currentPastPrataCarnaval.subgroups.noite2) {
        baseList = currentPastPrataCarnaval.subgroups.noite2;
      } else if (subgroupPrataTab === 'liesb' && currentPastPrataCarnaval.subgroups.liesb) {
        baseList = currentPastPrataCarnaval.subgroups.liesb;
      } else if (subgroupPrataTab === 'livres' && currentPastPrataCarnaval.subgroups.livres) {
        baseList = currentPastPrataCarnaval.subgroups.livres;
      }
    }
    const q = searchQuery.toLowerCase().trim();
    if (!q) return baseList;
    return baseList.filter(
      (st) =>
        st.schoolName.toLowerCase().includes(q) ||
        (st.enredo && st.enredo.toLowerCase().includes(q))
    );
  }, [currentPastPrataCarnaval, searchQuery, subgroupPrataTab]);

  // Dados simulados in-game para Série Bronze e Grupo de Avaliação no ano selecionado
  const currentInGameYearHistory = useMemo(() => {
    return inGameHistory.find((h) => h.year === selectedPastYear);
  }, [inGameHistory, selectedPastYear]);

  const filteredPastBronzeStandings = useMemo(() => {
    const baseList = currentInGameYearHistory?.bronzeStandings || [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return baseList;
    return baseList.filter((st) => {
      const enr =
        st.enredo ||
        getHistoricalEnredo(
          selectedPastYear,
          st.schoolId || '',
          st.schoolName,
          schools.find((s) => s.id === st.schoolId),
          inGameHistory
        );
      return (
        st.schoolName.toLowerCase().includes(q) ||
        (enr && enr.toLowerCase().includes(q))
      );
    });
  }, [currentInGameYearHistory, searchQuery, selectedPastYear, schools, inGameHistory]);

  const filteredPastAvaliacaoStandings = useMemo(() => {
    const baseList = currentInGameYearHistory?.avaliacaoStandings || [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return baseList;
    return baseList.filter((st) => {
      const enr =
        st.enredo ||
        getHistoricalEnredo(
          selectedPastYear,
          st.schoolId || '',
          st.schoolName,
          schools.find((s) => s.id === st.schoolId),
          inGameHistory
        );
      return (
        st.schoolName.toLowerCase().includes(q) ||
        (enr && enr.toLowerCase().includes(q))
      );
    });
  }, [currentInGameYearHistory, searchQuery, selectedPastYear, schools, inGameHistory]);

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

  const currentDivisionMeta = useMemo(() => {
    return currentPastCarnaval ? getTopDivisionMetadata(currentPastCarnaval.year) : getTopDivisionMetadata(2026);
  }, [currentPastCarnaval]);

  const currentYearCarnavalescos = useMemo(() => {
    if (!currentPastCarnaval) return [];
    return getChampionCarnavalescosByYear(currentPastCarnaval.year, inGameHistory, schools);
  }, [currentPastCarnaval, inGameHistory, schools]);

  const currentOuroDivisionMeta = useMemo(() => {
    return currentPastOuroCarnaval
      ? getOuroDivisionMetadata(currentPastOuroCarnaval.year)
      : getOuroDivisionMetadata(2026);
  }, [currentPastOuroCarnaval]);

  const currentOuroYearCarnavalescos = useMemo(() => {
    if (!currentPastOuroCarnaval) return [];
    return getOuroChampionCarnavalescosByYear(currentPastOuroCarnaval.year, inGameHistory, schools);
  }, [currentPastOuroCarnaval, inGameHistory, schools]);

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
      const isNaoDesfilou = statusDescription?.toLowerCase().includes('não desfilou');
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold ${
          isNaoDesfilou ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
        }`}>
          {isNaoDesfilou ? 'ND' : 'HC'}
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
                  Resultados Oficiais & Participações na Elite (1932 a {latestPastYear})
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
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1 rounded-2xl border border-slate-800 self-start lg:self-auto">
            <button
              onClick={() => setActiveTab('carnavais_passados')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
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
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                activeTab === 'participacoes'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Participações por Grupo</span>
            </button>
            <button
              onClick={() => setActiveTab('nomenclatura')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                activeTab === 'nomenclatura'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Nomenclatura e Organização</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-64 shrink-0">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={
                activeTab === 'carnavais_passados'
                  ? 'Buscar no desfile...'
                  : activeTab === 'participacoes'
                  ? 'Buscar escola...'
                  : 'Filtrar período, grupo ou liga...'
              }
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
                          setSubgroupPrataTab('geral');
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

              {/* Division Selector: Grupo Especial / Série Ouro / Série Prata */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-950 rounded-2xl border border-slate-800 w-fit">
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
                  {selectedPastYear < 1952 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                      pastDivision === 'ouro'
                        ? 'bg-slate-950/20 text-slate-950'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      a partir de 1952
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    setPastDivision('prata');
                    setExpandedSchoolId(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                    pastDivision === 'prata'
                      ? 'bg-slate-200 text-slate-950 font-black shadow-md shadow-slate-300/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Série Prata</span>
                  {!currentPastPrataCarnaval && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                      pastDivision === 'prata'
                        ? 'bg-slate-950/20 text-slate-950'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      em catalogação
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    setPastDivision('bronze');
                    setExpandedSchoolId(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                    pastDivision === 'bronze'
                      ? 'bg-amber-700 text-white font-black shadow-md shadow-amber-700/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Medal className="w-3.5 h-3.5" />
                  <span>Série Bronze</span>
                </button>
                <button
                  onClick={() => {
                    setPastDivision('avaliacao');
                    setExpandedSchoolId(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                    pastDivision === 'avaliacao'
                      ? 'bg-purple-500 text-white font-black shadow-md shadow-purple-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Grupo de Avaliação</span>
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
                        <span
                          className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          title={currentDivisionMeta.organizerFull}
                        >
                          {currentDivisionMeta.badgeText}
                        </span>
                        <span className="text-xs text-slate-300 font-mono font-bold tabular-nums">
                          Carnaval {currentPastCarnaval.year}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          ({currentPastCarnaval.totalSchools} agremiações • {currentDivisionMeta.divisionName})
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Crown className="w-3.5 h-3.5 text-amber-400" />
                          <span className="text-slate-400">Campeã:</span>
                          <span className="text-white font-black">{currentPastCarnaval.championNames.join(' & ')}</span>
                        </div>
                        {currentYearCarnavalescos.length > 0 && (
                          <div className="flex items-center gap-1.5">
                            <Palette className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                            <span className="text-slate-400">Carnavalesco(s):</span>
                            <span className="text-purple-200 font-semibold">
                              {currentYearCarnavalescos.length === 1
                                ? currentYearCarnavalescos[0].displayLabel
                                : currentYearCarnavalescos
                                    .map((c) => `${c.schoolName}: ${c.displayLabel}`)
                                    .join(' | ')}
                            </span>
                          </div>
                        )}
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
                                      st.statusDescription?.toLowerCase().includes('não desfilou') ? (
                                        <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                                          <span>Não Desfilou</span>
                                        </span>
                                      ) : (
                                        <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                                          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                                          <span>Hors concours</span>
                                        </span>
                                      )
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
                                        <div className="space-y-1">
                                          <div>
                                            <span className="text-slate-400">Enredo em {currentPastCarnaval.year}: </span>
                                            <span className="text-white font-bold italic">
                                              {historicalEnredo ? `"${historicalEnredo}"` : 'Registro em catálogo'}
                                            </span>
                                          </div>
                                          {st.rank === 1 && !st.isHorsConcours && (() => {
                                            const carnavalescoMatch = currentYearCarnavalescos.find(
                                              (c) =>
                                                c.schoolId === st.schoolId ||
                                                c.schoolName.toLowerCase() === st.schoolName.toLowerCase()
                                            );
                                            if (!carnavalescoMatch) return null;
                                            return (
                                              <div className="flex items-center gap-1.5 text-purple-200">
                                                <Palette className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                                                <span className="text-slate-400">Carnavalesco(s) Campeão(ões):</span>
                                                <span className="font-semibold">{carnavalescoMatch.displayLabel}</span>
                                              </div>
                                            );
                                          })()}
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
                          <span
                            className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/40"
                            title={currentOuroDivisionMeta.organizerFull}
                          >
                            {currentOuroDivisionMeta.badgeText}
                          </span>
                          <span className="text-xs text-slate-300 font-mono font-bold tabular-nums">
                            Carnaval {currentPastOuroCarnaval.year}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            ({currentPastOuroCarnaval.totalSchools} agremiações • {currentOuroDivisionMeta.divisionName})
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                          <div className="flex items-center gap-1.5">
                            <Crown className="w-3.5 h-3.5 text-yellow-400" />
                            <span className="text-slate-400">Campeã:</span>
                            <span className="text-white font-black">{currentPastOuroCarnaval.championNames.join(' & ')}</span>
                          </div>
                          {currentOuroYearCarnavalescos.length > 0 && (
                            <div className="flex items-center gap-1.5">
                              <Palette className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                              <span className="text-slate-400">Carnavalesco(s):</span>
                              <span className="text-purple-200 font-semibold">
                                {currentOuroYearCarnavalescos.length === 1
                                  ? currentOuroYearCarnavalescos[0].displayLabel
                                  : currentOuroYearCarnavalescos
                                      .map((c) => `${c.schoolName}: ${c.displayLabel}`)
                                      .join(' | ')}
                              </span>
                            </div>
                          )}
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
                          ) : (currentPastOuroCarnaval.year === 2018 || currentPastOuroCarnaval.year === 2026 || currentPastOuroCarnaval.year === 1994 || currentPastOuroCarnaval.year === 1990 || currentPastOuroCarnaval.year === 1988) ? (
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
                                          ? (st.relegated
                                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold text-[10px]'
                                              : st.statusDescription?.toLowerCase().includes('não desfilou')
                                              ? 'bg-slate-900 text-slate-400 border border-slate-700 font-bold text-[10px]'
                                              : 'bg-purple-950/80 text-purple-300 border border-purple-700/50 font-bold text-[10px]')
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
                                        {st.isHorsConcours || st.rank === 0 ? (st.statusDescription?.toLowerCase().includes('não desfilou') ? 'ND' : 'HC') : `${st.rank}ª`}
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
                                        st.promoted ? (
                                          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                                            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                                            <span>Hors concours (Subiu)</span>
                                          </span>
                                        ) : st.relegated ? (
                                          <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                                            <ArrowDownCircle className="w-3.5 h-3.5 text-rose-400" />
                                            <span>Não Desfilou (Rebaixada)</span>
                                          </span>
                                        ) : st.statusDescription?.toLowerCase().includes('não desfilou') ? (
                                          <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                                            <span>Não Desfilou</span>
                                          </span>
                                        ) : (
                                          <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                                            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                                            <span>Hors concours (Não julgada)</span>
                                          </span>
                                        )
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
                                          <div className="space-y-1">
                                            <div>
                                              <span className="text-slate-400">Enredo Oficial de {currentPastOuroCarnaval.year}: </span>
                                              <span className="text-white font-bold italic">
                                                {enredoTitle ? `"${enredoTitle}"` : 'Registro em catálogo'}
                                              </span>
                                            </div>
                                            {st.rank === 1 && !st.isHorsConcours && (() => {
                                              const carnavalescoMatch = currentOuroYearCarnavalescos.find(
                                                (c) =>
                                                  c.schoolId === st.schoolId ||
                                                  c.schoolName.toLowerCase() === st.schoolName.toLowerCase()
                                              );
                                              if (!carnavalescoMatch) return null;
                                              return (
                                                <div className="flex items-center gap-1.5 text-purple-200">
                                                  <Palette className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                                                  <span className="text-slate-400">Carnavalesco(s) Campeão(ões):</span>
                                                  <span className="font-semibold">{carnavalescoMatch.displayLabel}</span>
                                                </div>
                                              );
                                            })()}
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
                ) : selectedPastYear < 1952 ? (
                  <div className="p-8 rounded-2xl bg-slate-950/60 border border-dashed border-amber-500/30 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
                      <History className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black text-white">
                      A Série Ouro ainda não existia em {selectedPastYear}
                    </h3>
                    <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
                      A segunda divisão do Carnaval Carioca (atual Série Ouro, originalmente criada como Desfile Intermediário / Campeonato pela AESB) foi instituída apenas em <strong className="text-amber-300">1952</strong>. Nos anos anteriores a 1952, todas as escolas de samba competiam exclusivamente na divisão principal.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                      <button
                        onClick={() => {
                          setSelectedPastYear(1952);
                          setSelectedDecade('1950s');
                          setExpandedSchoolId(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 text-xs font-black transition cursor-pointer"
                      >
                        Ver 1º Ano da Série Ouro (1952)
                      </button>
                      <button
                        onClick={() => {
                          setPastDivision('especial');
                          setExpandedSchoolId(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition cursor-pointer"
                      >
                        Ver Grupo Especial ({selectedPastYear})
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 rounded-2xl bg-slate-950/60 border border-dashed border-slate-800 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                      <Info className="w-6 h-6 text-yellow-400" />
                    </div>
                    <h3 className="text-lg font-black text-white">Série Ouro em Catalogação</h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      Os resultados da Série Ouro para o Carnaval de {selectedPastYear} ainda não foram inseridos no catálogo histórico. Os registros oficiais estão disponíveis a partir de 1952.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedPastYear(2026);
                        setSelectedDecade('recentes');
                      }}
                      className="px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 text-xs font-black transition cursor-pointer"
                    >
                      Ver Carnaval 2026 (Série Ouro)
                    </button>
                  </div>
                )
              )}

              {/* SÉRIE PRATA VIEW */}
              {pastDivision === 'prata' && (
                currentPastPrataCarnaval ? (
                  currentPastPrataCarnaval.isNoCarnaval ? (
                    <div className="p-8 rounded-2xl bg-slate-950/60 border border-dashed border-slate-800 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                        <AlertTriangle className="w-6 h-6 text-slate-300" />
                      </div>
                      <h3 className="text-lg font-black text-white">Não houve desfiles em {currentPastPrataCarnaval.year}</h3>
                      <p className="text-xs text-slate-400 max-w-lg mx-auto">
                        {currentPastPrataCarnaval.notes}
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Summary Card Série Prata */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800/60 border border-slate-400/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-300/20 text-slate-200 border border-slate-400/40">
                              SÉRIE PRATA • 3ª DIVISÃO
                            </span>
                            <span className="text-xs text-slate-300 font-mono font-bold tabular-nums">
                              Carnaval {currentPastPrataCarnaval.year}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              ({currentPastPrataCarnaval.totalSchools} agremiações)
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                            <div className="flex items-center gap-1.5">
                              <Crown className="w-3.5 h-3.5 text-amber-400" />
                              <span className="text-slate-400">Campeã:</span>
                              <span className="text-white font-black">{currentPastPrataCarnaval.championNames.join(' & ')}</span>
                            </div>
                            {currentPastPrataCarnaval.viceChampionNames.length > 0 && (
                              <div className="flex items-center gap-1.5">
                                <Medal className="w-3.5 h-3.5 text-slate-300" />
                                <span className="text-slate-400">Vice:</span>
                                <span className="text-slate-200 font-bold">{currentPastPrataCarnaval.viceChampionNames.join(' & ')}</span>
                              </div>
                            )}
                            {currentPastPrataCarnaval.promotedNames.length > 0 && (
                              <div className="flex items-center gap-1.5">
                                <ArrowUpCircle className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-slate-400">Subiram à Série Ouro:</span>
                                <span className="text-emerald-300 font-bold">{currentPastPrataCarnaval.promotedNames.join(', ')}</span>
                              </div>
                            )}
                            {currentPastPrataCarnaval.relegatedNames && currentPastPrataCarnaval.relegatedNames.length > 0 ? (
                              <div className="flex items-center gap-1.5">
                                <ArrowDownCircle className="w-3.5 h-3.5 text-rose-400" />
                                <span className="text-slate-400">Rebaixada(s) para a Série Bronze:</span>
                                <span className="text-rose-300 font-bold">{currentPastPrataCarnaval.relegatedNames.join(', ')}</span>
                              </div>
                            ) : currentPastPrataCarnaval.year === 2019 ? (
                              <div className="flex items-center gap-1.5 text-slate-400 italic">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                <span>(Não houve rebaixamento neste ano)</span>
                              </div>
                            ) : null}
                          </div>

                          {currentPastPrataCarnaval.notes && (
                            <p className="text-[11px] text-slate-300/90 font-medium italic max-w-3xl pt-1">
                              {currentPastPrataCarnaval.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Multi-night / multi-league selector for Série Prata when applicable (ex: 2020, 2022, 2023, 2024) */}
                      {currentPastPrataCarnaval.subgroups && (
                        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-700/60 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-200">
                              {currentPastPrataCarnaval.subgroups.livres
                                ? `Competições e Noites de Desfile (${currentPastPrataCarnaval.year}):`
                                : `Noites de Desfile (${currentPastPrataCarnaval.year}):`}
                            </span>
                            <span className="text-slate-400 text-[11px]">
                              {currentPastPrataCarnaval.subgroups.liesb
                                ? 'LIESB + LIVRES (Série B)'
                                : currentPastPrataCarnaval.subgroups.livres
                                ? 'Superliga (2 Noites) + LIVRES (Grupo B)'
                                : '2 Noites Competitivas'}
                            </span>
                          </div>
                          <div
                            className={`grid grid-cols-1 gap-2 ${
                              currentPastPrataCarnaval.subgroups.liesb
                                ? 'sm:grid-cols-3'
                                : currentPastPrataCarnaval.subgroups.livres
                                ? 'sm:grid-cols-2 lg:grid-cols-4'
                                : 'sm:grid-cols-3'
                            }`}
                          >
                            <button
                              onClick={() => {
                                setSubgroupPrataTab('geral');
                                setExpandedSchoolId(null);
                              }}
                              className={`p-2 rounded-xl text-left border transition cursor-pointer text-xs ${
                                subgroupPrataTab === 'geral'
                                  ? 'bg-slate-200/15 border-slate-300 text-white'
                                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              <div className="font-bold text-slate-100 text-[11px]">Geral ({currentPastPrataCarnaval.totalSchools} Escolas)</div>
                              <div className="text-[10px] text-slate-300 truncate">
                                Campeã: {currentPastPrataCarnaval.championNames.join(' & ')}
                              </div>
                            </button>
                            {currentPastPrataCarnaval.subgroups.liesb && (
                              <button
                                onClick={() => {
                                  setSubgroupPrataTab('liesb');
                                  setExpandedSchoolId(null);
                                }}
                                className={`p-2 rounded-xl text-left border transition cursor-pointer text-xs ${
                                  subgroupPrataTab === 'liesb'
                                    ? 'bg-emerald-500/20 border-emerald-400 text-white'
                                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                                }`}
                              >
                                <div className="font-bold text-emerald-400 text-[11px]">
                                  LIESB ({currentPastPrataCarnaval.subgroups.liesb.length} Escolas)
                                </div>
                                <div className="text-[10px] text-slate-300 truncate">
                                  1ª: {currentPastPrataCarnaval.subgroups.liesb.find((s) => s.rank === 1)?.schoolName || '—'}
                                </div>
                              </button>
                            )}
                            {currentPastPrataCarnaval.subgroups.noite1 && (
                              <button
                                onClick={() => {
                                  setSubgroupPrataTab('noite1');
                                  setExpandedSchoolId(null);
                                }}
                                className={`p-2 rounded-xl text-left border transition cursor-pointer text-xs ${
                                  subgroupPrataTab === 'noite1'
                                    ? 'bg-emerald-500/20 border-emerald-400 text-white'
                                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                                }`}
                              >
                                <div className="font-bold text-emerald-400 text-[11px]">
                                  {currentPastPrataCarnaval.subgroups.livres ? 'Superliga • ' : ''}1ª Noite ({currentPastPrataCarnaval.subgroups.noite1.length} Escolas)
                                </div>
                                <div className="text-[10px] text-slate-300 truncate">
                                  1ª: {currentPastPrataCarnaval.subgroups.noite1.find((s) => s.rank === 1)?.schoolName || '—'}
                                </div>
                              </button>
                            )}
                            {currentPastPrataCarnaval.subgroups.noite2 && (
                              <button
                                onClick={() => {
                                  setSubgroupPrataTab('noite2');
                                  setExpandedSchoolId(null);
                                }}
                                className={`p-2 rounded-xl text-left border transition cursor-pointer text-xs ${
                                  subgroupPrataTab === 'noite2'
                                    ? 'bg-blue-500/20 border-blue-400 text-white'
                                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                                }`}
                              >
                                <div className="font-bold text-blue-400 text-[11px]">
                                  {currentPastPrataCarnaval.subgroups.livres ? 'Superliga • ' : ''}2ª Noite ({currentPastPrataCarnaval.subgroups.noite2.length} Escolas)
                                </div>
                                <div className="text-[10px] text-slate-300 truncate">
                                  1ª: {currentPastPrataCarnaval.subgroups.noite2.find((s) => s.rank === 1)?.schoolName || '—'}
                                </div>
                              </button>
                            )}
                            {currentPastPrataCarnaval.subgroups.livres && (
                              <button
                                onClick={() => {
                                  setSubgroupPrataTab('livres');
                                  setExpandedSchoolId(null);
                                }}
                                className={`p-2 rounded-xl text-left border transition cursor-pointer text-xs ${
                                  subgroupPrataTab === 'livres'
                                    ? 'bg-amber-500/20 border-amber-400 text-white'
                                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                                }`}
                              >
                                <div className="font-bold text-amber-400 text-[11px]">
                                  LIVRES • {currentPastPrataCarnaval.year === 2020 ? 'Série B' : 'Grupo B'} ({currentPastPrataCarnaval.subgroups.livres.length} Escolas)
                                </div>
                                <div className="text-[10px] text-slate-300 truncate">
                                  1ª: {currentPastPrataCarnaval.subgroups.livres.find((s) => s.rank === 1)?.schoolName || '—'}
                                </div>
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Standings Table Série Prata */}
                      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-slate-900/90 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                                <th className="py-3 px-4 w-24">Classificação</th>
                                <th className="py-3 px-4">Agremiação</th>
                                <th className="py-3 px-4 hidden md:table-cell">Enredo Oficial</th>
                                <th className="py-3 px-4 text-center">Movimentação / Status</th>
                                <th className="py-3 px-3 text-right w-14"></th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 font-medium">
                              {filteredPastPrataStandings.map((st, idx) => {
                                const isExpanded = expandedSchoolId === `prata_${subgroupPrataTab}_${st.schoolId}_${idx}`;
                                const isUser =
                                  userSchool &&
                                  (userSchool.id === st.schoolId ||
                                    userSchool.name.toLowerCase() === st.schoolName.toLowerCase());
                                const schoolObj = schools.find(
                                  (s) =>
                                    s.id === st.schoolId ||
                                    s.name.toLowerCase() === st.schoolName.toLowerCase()
                                );
                                const enredoTitle =
                                  st.enredo ||
                                  getHistoricalEnredo(
                                    currentPastPrataCarnaval.year,
                                    st.schoolId,
                                    st.schoolName,
                                    schoolObj,
                                    inGameHistory
                                  );
                                const displayRank = st.rank > 0 ? st.rank : st.nightRank ?? 0;
                                const isNightOnlyRank = st.rank === 0 && !st.isHorsConcours && st.nightRank !== undefined;
                                const isOverallChamp = st.rank === 1 && !st.isHorsConcours && (
                                  !currentPastPrataCarnaval.subgroups ||
                                  currentPastPrataCarnaval.championNames.some(
                                    (c) => c === st.schoolName || c.startsWith(`${st.schoolName} (`)
                                  )
                                );
                                const isOverallVice = currentPastPrataCarnaval.viceChampionNames.some(
                                  (v) => v === st.schoolName || v.startsWith(`${st.schoolName} (`)
                                );

                                return (
                                  <React.Fragment key={`prata_${subgroupPrataTab}_${st.schoolId}_${idx}`}>
                                    <tr
                                      onClick={() => toggleExpand(`prata_${subgroupPrataTab}_${st.schoolId}_${idx}`)}
                                      className={`hover:bg-slate-800/40 transition cursor-pointer ${
                                        isUser ? 'bg-slate-300/10' : ''
                                      }`}
                                    >
                                      <td className="py-3 px-4 whitespace-nowrap">
                                        <span
                                          className={`inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black ${
                                            st.isHorsConcours || displayRank === 0
                                              ? st.relegated
                                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold text-[10px]'
                                                : st.statusDescription?.toLowerCase().includes('não desfilou')
                                                ? 'bg-slate-900 text-slate-400 border border-slate-700 font-bold text-[10px]'
                                                : 'bg-purple-950/80 text-purple-300 border border-purple-700/50 font-bold text-[10px]'
                                              : isOverallChamp
                                              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                                              : st.promoted
                                              ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/50 font-black'
                                              : displayRank === 3
                                              ? 'bg-amber-700/60 text-amber-200 border border-amber-600/40'
                                              : st.relegated
                                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                                              : 'bg-slate-900 text-slate-300 border border-slate-800 font-mono'
                                          }`}
                                        >
                                          {st.relegated && <ArrowDownCircle className="w-3.5 h-3.5 text-rose-400" />}
                                          {isOverallChamp && <Crown className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />}
                                          {!isOverallChamp && st.promoted && <ArrowUpCircle className="w-3.5 h-3.5 text-emerald-300" />}
                                          {st.isHorsConcours || displayRank === 0
                                            ? st.statusDescription?.toLowerCase().includes('não desfilou')
                                              ? 'ND'
                                              : 'HC'
                                            : isNightOnlyRank
                                            ? `${displayRank}ª`
                                            : `${displayRank}ª`}
                                        </span>
                                      </td>

                                      <td className="py-3 px-4 font-bold text-white">
                                        <div className="flex flex-wrap items-center gap-2">
                                          {schoolObj?.colors && (
                                            <div
                                              className="w-3 h-3 rounded-full shrink-0 border border-white/20"
                                              style={{ backgroundColor: schoolObj.colors.primary }}
                                            />
                                          )}
                                          <span className={isUser ? 'text-slate-200' : ''}>{st.schoolName}</span>
                                          {st.league && subgroupPrataTab === 'geral' && (
                                            <span
                                              className={`text-[10px] px-1.5 py-0.2 rounded border font-bold ${
                                                st.league === 'LIVRES'
                                                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                                                  : 'bg-slate-800 text-slate-300 border-slate-700'
                                              }`}
                                            >
                                              {st.league}
                                            </span>
                                          )}
                                          {st.night && subgroupPrataTab === 'geral' && (
                                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                                              {st.night}
                                            </span>
                                          )}
                                          {isUser && (
                                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-300/20 text-slate-200 font-bold border border-slate-400/30">
                                              Sua Escola
                                            </span>
                                          )}
                                        </div>
                                        {enredoTitle && (
                                          <div className="md:hidden text-[11px] font-normal italic text-slate-400 mt-0.5 line-clamp-1">
                                            "{enredoTitle}"
                                          </div>
                                        )}
                                      </td>

                                      <td className="py-3 px-4 text-slate-300 italic text-[11px] max-w-xs truncate hidden md:table-cell" title={enredoTitle}>
                                        {enredoTitle ? `"${enredoTitle}"` : '—'}
                                      </td>

                                      <td className="py-3 px-4 text-center whitespace-nowrap">
                                        {st.isHorsConcours || (displayRank === 0 && !isNightOnlyRank) ? (
                                          st.relegated ? (
                                            <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                                              <ArrowDownCircle className="w-3.5 h-3.5 text-rose-400" />
                                              <span>
                                                {st.statusDescription?.toLowerCase().includes('grupo de avaliação')
                                                  ? 'Não Desfilou • Rebaixada (Avaliação)'
                                                  : 'Não Desfilou (Rebaixada)'}
                                              </span>
                                            </span>
                                          ) : st.statusDescription?.toLowerCase().includes('não desfilou') ? (
                                            <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                                              <span>Não Desfilou</span>
                                            </span>
                                          ) : (
                                            <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                                              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                                              <span>Hors concours (Não julgada)</span>
                                            </span>
                                          )
                                        ) : isOverallChamp && !st.promoted ? (
                                          <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/50 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                                            <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                            <span>Campeã ({st.league || 'Série Prata'})</span>
                                          </span>
                                        ) : st.promoted || isOverallChamp ? (
                                          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                                            <ArrowUpCircle className="w-3.5 h-3.5 text-emerald-400" />
                                            <span>
                                              {isOverallChamp
                                                ? 'Campeã • Subiu (Série Ouro)'
                                                : isOverallVice
                                                ? 'Vice • Subiu (Série Ouro)'
                                                : st.statusDescription?.toLowerCase().includes('convidada')
                                                ? 'Convidada (Série Ouro)'
                                                : 'Subiu (Série Ouro)'}
                                            </span>
                                          </span>
                                        ) : st.relegated ? (
                                          <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                                            <ArrowDownCircle className="w-3.5 h-3.5 text-rose-400" />
                                            <span>
                                              {st.statusDescription?.toLowerCase().includes('grupo de avaliação')
                                                ? 'Rebaixada (Grupo de Avaliação)'
                                                : 'Rebaixada (Série Bronze)'}
                                            </span>
                                          </span>
                                        ) : isOverallVice && !st.promoted ? (
                                          <span className="px-2.5 py-1 rounded-lg bg-slate-300/15 text-slate-200 border border-slate-400/40 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                                            <Medal className="w-3.5 h-3.5 text-slate-300" />
                                            <span>{st.league === 'LIVRES' ? 'Vice-Campeã (LIVRES)' : 'Vice-Campeã'}</span>
                                          </span>
                                        ) : st.league === 'LIVRES' ? (
                                          <span className="px-2 py-0.5 rounded-md bg-slate-900 text-amber-200/80 border border-amber-500/30 text-[10px] font-medium">
                                            {currentPastPrataCarnaval.year === 2020 ? 'LIVRES (Série B)' : 'LIVRES (Grupo B)'}
                                          </span>
                                        ) : (
                                          <span className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800 text-[10px] font-medium">
                                            Permanece na Série Prata
                                          </span>
                                        )}
                                      </td>

                                      <td className="py-3 px-3 text-right">
                                        <ChevronRight
                                          className={`w-4 h-4 text-slate-500 transition-transform ${
                                            isExpanded ? 'rotate-90 text-slate-200' : ''
                                          }`}
                                        />
                                      </td>
                                    </tr>

                                    {isExpanded && (
                                      <tr className="bg-slate-900/80">
                                        <td colSpan={5} className="p-4 border-t border-slate-800 space-y-2">
                                          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                                            <div>
                                              <span className="text-slate-400">Enredo Oficial de {currentPastPrataCarnaval.year}: </span>
                                              <span className="text-white font-bold italic">
                                                {enredoTitle ? `"${enredoTitle}"` : 'Registro em catálogo'}
                                              </span>
                                            </div>
                                            {st.statusDescription && (
                                              <div className="text-[11px] text-slate-200 font-medium">
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
                  <div className="p-8 rounded-2xl bg-slate-950/60 border border-dashed border-slate-700 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 mx-auto">
                      <Info className="w-6 h-6 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-black text-white">Série Prata em Catalogação</h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                      Os resultados e enredos da Série Prata (Terceira Divisão) para o Carnaval de {selectedPastYear} ainda estão sendo catalogados. Confira os registros oficiais já disponíveis no catálogo ({historicalPrataCarnavals[historicalPrataCarnavals.length - 1]?.year ?? 2025}–{historicalPrataCarnavals[0]?.year ?? 2026}).
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                      <button
                        onClick={() => {
                          setSelectedPastYear(2026);
                          setSelectedDecade('recentes');
                          setExpandedSchoolId(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-white text-slate-950 text-xs font-black transition cursor-pointer"
                      >
                        Ver Carnaval 2026 (Série Prata)
                      </button>
                      <button
                        onClick={() => {
                          setPastDivision('especial');
                          setExpandedSchoolId(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition cursor-pointer"
                      >
                        Ver Grupo Especial ({selectedPastYear})
                      </button>
                    </div>
                  </div>
                )
              )}

              {/* SÉRIE BRONZE VIEW (Temporadas Simuladas no Save) */}
              {pastDivision === 'bronze' && (
                filteredPastBronzeStandings.length > 0 && currentInGameYearHistory ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-700/40 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-base font-black text-amber-400">
                          Série Bronze • Carnaval {selectedPastYear}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Campeã: <strong className="text-white">{currentInGameYearHistory.bronzeChampion || filteredPastBronzeStandings[0]?.schoolName}</strong>
                          {' • '}{filteredPastBronzeStandings.length} agremiações julgadas
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-slate-900/90 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                              <th className="py-3 px-4 w-20">Pos.</th>
                              <th className="py-3 px-4">Agremiação</th>
                              <th className="py-3 px-4">Enredo Oficial</th>
                              <th className="py-3 px-4 text-right w-24">Pontos</th>
                              <th className="py-3 px-4 text-center">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 font-medium">
                            {filteredPastBronzeStandings.map((st, idx) => {
                              const schoolObj = schools.find(
                                (s) =>
                                  (st.schoolId && s.id === st.schoolId) ||
                                  s.name.toLowerCase() === st.schoolName.toLowerCase()
                              );
                              const enredoTitle =
                                st.enredo ||
                                getHistoricalEnredo(
                                  selectedPastYear,
                                  st.schoolId || '',
                                  st.schoolName,
                                  schoolObj,
                                  inGameHistory
                                );
                              const isPromoted = Boolean(
                                currentInGameYearHistory.bronzePromoted?.includes(st.schoolName) ||
                                (st.schoolId && currentInGameYearHistory.bronzePromoted?.includes(st.schoolId)) ||
                                st.rank === 1
                              );
                              const isRelegated = Boolean(
                                currentInGameYearHistory.bronzeRelegated?.includes(st.schoolName) ||
                                (st.schoolId && currentInGameYearHistory.bronzeRelegated?.includes(st.schoolId))
                              );
                              return (
                                <tr key={`bronze_${st.schoolId || idx}`} className="hover:bg-slate-800/40 transition">
                                  <td className="py-3 px-4 font-mono font-black text-amber-400">{st.rank}ª</td>
                                  <td className="py-3 px-4 font-bold text-white">{st.schoolName}</td>
                                  <td className="py-3 px-4 italic text-slate-300">
                                    {enredoTitle ? `"${enredoTitle}"` : '—'}
                                  </td>
                                  <td className="py-3 px-4 text-right font-mono text-slate-200">
                                    {typeof st.totalScore === 'number' ? st.totalScore.toFixed(1) : '—'}
                                  </td>
                                  <td className="py-3 px-4 text-center whitespace-nowrap">
                                    {isPromoted ? (
                                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase">
                                        {st.rank === 1 ? 'Campeã • Subiu (Prata)' : 'Subiu (Série Prata)'}
                                      </span>
                                    ) : isRelegated ? (
                                      <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-black uppercase">
                                        Rebaixada (Avaliação)
                                      </span>
                                    ) : (
                                      <span className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800 text-[10px]">
                                        Permanece na Série Bronze
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 rounded-2xl bg-slate-950/60 border border-dashed border-slate-700 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 mx-auto">
                      <Info className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black text-white">Série Bronze ({selectedPastYear})</h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                      Os resultados completos com enredos da Série Bronze ficam registrados aqui automaticamente para todas as temporadas concluídas no seu save (a partir de 2027).
                    </p>
                  </div>
                )
              )}

              {/* GRUPO DE AVALIAÇÃO VIEW (Temporadas Simuladas no Save) */}
              {pastDivision === 'avaliacao' && (
                filteredPastAvaliacaoStandings.length > 0 && currentInGameYearHistory ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/40 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-base font-black text-purple-300">
                          Grupo de Avaliação • Carnaval {selectedPastYear}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Campeã: <strong className="text-white">{currentInGameYearHistory.avaliacaoChampion || filteredPastAvaliacaoStandings[0]?.schoolName}</strong>
                          {' • '}{filteredPastAvaliacaoStandings.length} agremiações julgadas
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-slate-900/90 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                              <th className="py-3 px-4 w-20">Pos.</th>
                              <th className="py-3 px-4">Agremiação</th>
                              <th className="py-3 px-4">Enredo Oficial</th>
                              <th className="py-3 px-4 text-right w-24">Pontos</th>
                              <th className="py-3 px-4 text-center">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 font-medium">
                            {filteredPastAvaliacaoStandings.map((st, idx) => {
                              const schoolObj = schools.find(
                                (s) =>
                                  (st.schoolId && s.id === st.schoolId) ||
                                  s.name.toLowerCase() === st.schoolName.toLowerCase()
                              );
                              const enredoTitle =
                                st.enredo ||
                                getHistoricalEnredo(
                                  selectedPastYear,
                                  st.schoolId || '',
                                  st.schoolName,
                                  schoolObj,
                                  inGameHistory
                                );
                              const isPromoted = Boolean(
                                currentInGameYearHistory.avaliacaoPromoted?.includes(st.schoolName) ||
                                (st.schoolId && currentInGameYearHistory.avaliacaoPromoted?.includes(st.schoolId)) ||
                                st.rank === 1
                              );
                              const isSuspended = Boolean(
                                currentInGameYearHistory.avaliacaoSuspended?.includes(st.schoolName) ||
                                (st.schoolId && currentInGameYearHistory.avaliacaoSuspended?.includes(st.schoolId))
                              );
                              return (
                                <tr key={`ava_${st.schoolId || idx}`} className="hover:bg-slate-800/40 transition">
                                  <td className="py-3 px-4 font-mono font-black text-purple-300">{st.rank}ª</td>
                                  <td className="py-3 px-4 font-bold text-white">{st.schoolName}</td>
                                  <td className="py-3 px-4 italic text-slate-300">
                                    {enredoTitle ? `"${enredoTitle}"` : '—'}
                                  </td>
                                  <td className="py-3 px-4 text-right font-mono text-slate-200">
                                    {typeof st.totalScore === 'number' ? st.totalScore.toFixed(1) : '—'}
                                  </td>
                                  <td className="py-3 px-4 text-center whitespace-nowrap">
                                    {isPromoted ? (
                                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase">
                                        {st.rank === 1 ? 'Campeã • Subiu (Bronze)' : 'Subiu (Série Bronze)'}
                                      </span>
                                    ) : isSuspended ? (
                                      <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-black uppercase">
                                        Afastada (Mín. 1 ano fora)
                                      </span>
                                    ) : (
                                      <span className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800 text-[10px]">
                                        Permanece na Avaliação
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 rounded-2xl bg-slate-950/60 border border-dashed border-slate-700 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-purple-400 mx-auto">
                      <Info className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black text-white">Grupo de Avaliação ({selectedPastYear})</h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                      Os resultados completos com enredos do Grupo de Avaliação (incluindo escolas reativadas e recém-fundadas) ficam registrados aqui automaticamente para todas as temporadas concluídas no seu save (a partir de 2027).
                    </p>
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

          {/* TAB 3: NOMENCLATURA E ORGANIZAÇÃO */}
          {activeTab === 'nomenclatura' && (
            <div className="space-y-4">
              {/* Sub-toggle between 1ª Divisão and 2ª Divisão */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setNomenclatureDivision('especial')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                      nomenclatureDivision === 'especial'
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <Crown className="w-3.5 h-3.5" />
                    <span>1ª Divisão (Grupo Especial • 1932–Presente)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNomenclatureDivision('ouro')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                      nomenclatureDivision === 'ouro'
                        ? 'bg-yellow-500 text-slate-950 font-black shadow-md shadow-yellow-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <Medal className="w-3.5 h-3.5" />
                    <span>2ª Divisão (Série Ouro • 1952–Presente)</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                {nomenclatureDivision === 'especial' ? (
                  <>
                    Ao longo da história dos desfiles das escolas de samba do Rio de Janeiro, a 1ª divisão recebeu sete nomenclaturas diferentes e foi organizada por jornais cariocas, ligas e associações até a consolidação da <strong className="text-amber-300">LIESA</strong> e do <strong className="text-amber-300">Grupo Especial</strong>.
                  </>
                ) : (
                  <>
                    Instituída em <strong className="text-yellow-300">1952</strong> como <em>Desfile Intermediário / Campeonato</em>, a 2ª divisão mudou de nome e entidade organizadora diversas vezes — passando por <strong className="text-yellow-300">AESB, AESEG, AESCRJ, LIESGA, LESGA e LIERJ</strong> — até a adoção da marca <strong className="text-yellow-300">Série Ouro</strong> sob comando da <strong className="text-yellow-300">LIGA RJ</strong>.
                  </>
                )}
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-900/90 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        <th className="py-3 px-4 w-36">Período</th>
                        <th className="py-3 px-4 w-60">Nomenclatura do Grupo</th>
                        <th className="py-3 px-4 w-64">Organização</th>
                        <th className="py-3 px-4">Contexto Histórico</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {(nomenclatureDivision === 'especial'
                        ? HISTORICAL_DIVISION_TIMELINE
                        : HISTORICAL_OURO_DIVISION_TIMELINE
                      )
                        .filter((period) => {
                          const q = searchQuery.toLowerCase().trim();
                          if (!q) return true;
                          return (
                            period.periodLabel.toLowerCase().includes(q) ||
                            period.divisionName.toLowerCase().includes(q) ||
                            period.organizer.toLowerCase().includes(q) ||
                            period.organizerFull.toLowerCase().includes(q) ||
                            period.notes.toLowerCase().includes(q)
                          );
                        })
                        .map((period) => (
                          <tr key={`${nomenclatureDivision}-${period.periodLabel}`} className="hover:bg-slate-900/60 transition">
                            <td
                              className={`py-3.5 px-4 font-mono tabular-nums font-black whitespace-nowrap ${
                                nomenclatureDivision === 'especial' ? 'text-amber-300' : 'text-yellow-300'
                              }`}
                            >
                              {period.periodLabel}
                            </td>
                            <td className="py-3.5 px-4 font-bold text-white">
                              {period.divisionName}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-200">{period.organizer}</div>
                              <div className="text-[11px] text-slate-400 mt-0.5">
                                {period.organizerFull}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-300 leading-relaxed">
                              {period.notes}
                            </td>
                          </tr>
                        ))}
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
