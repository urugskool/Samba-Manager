import React, { useState, useMemo, useEffect } from 'react';
import { School, DivisionId } from '../types/carnaval';
import { OFFICIAL_AVALIACAO_YEARLY_RESULTS, AvaliacaoYearResult } from '../data/avaliacaoChampionsData';
import { getSchoolConsolidatedStats } from '../data/carnavalData';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import {
  Trophy,
  Award,
  Medal,
  Calendar,
  Sparkles,
  Search,
  X,
  History,
  Info,
  CheckCircle2,
  AlertCircle,
  Crown,
  ChevronRight,
  Flame,
  Layers
} from 'lucide-react';

export type GaleriaDivisionTab = 'especial' | 'ouro' | 'prata' | 'bronze' | 'avaliacao';
export type GaleriaResultTab = 'campeas' | 'vices' | 'ano_a_ano';

interface GaleriaDosCampeoesModalProps {
  isOpen: boolean;
  onClose: () => void;
  schools: School[];
  initialDivision?: GaleriaDivisionTab;
  onSelectSchool?: (schoolId: string) => void;
}

interface SchoolRankItem {
  schoolId: string;
  schoolName: string;
  count: number;
  years: number[];
  divisionText?: string;
  isExtinct: boolean;
  school?: School;
}

interface YearResultItem {
  year: number;
  division?: GaleriaDivisionTab;
  divisionLabel?: string;
  champions: { schoolId: string; schoolName: string; school?: School }[];
  runnerUps: { schoolId: string; schoolName: string; school?: School }[];
  note?: string;
}

const DIVISION_CONFIG: Record<
  GaleriaDivisionTab,
  {
    name: string;
    shortName: string;
    sublabel: string;
    color: string;
    badgeBg: string;
    badgeBorder: string;
    badgeText: string;
    activeTabClass: string;
  }
> = {
  especial: {
    name: 'Grupo Especial',
    shortName: 'Especial',
    sublabel: '1ª Divisão • LIESA',
    color: 'from-amber-400 to-amber-600',
    badgeBg: 'bg-amber-500/20',
    badgeBorder: 'border-amber-500/40',
    badgeText: 'text-amber-300',
    activeTabClass: 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/20'
  },
  ouro: {
    name: 'Série Ouro',
    shortName: 'Ouro',
    sublabel: '2ª Divisão • Liga-RJ',
    color: 'from-yellow-400 to-amber-500',
    badgeBg: 'bg-yellow-500/20',
    badgeBorder: 'border-yellow-500/40',
    badgeText: 'text-yellow-300',
    activeTabClass: 'bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-black shadow-lg shadow-yellow-500/20'
  },
  prata: {
    name: 'Série Prata',
    shortName: 'Prata',
    sublabel: '3ª Divisão • Superliga',
    color: 'from-slate-300 to-slate-400',
    badgeBg: 'bg-slate-400/20',
    badgeBorder: 'border-slate-400/40',
    badgeText: 'text-slate-200',
    activeTabClass: 'bg-gradient-to-r from-slate-300 to-slate-400 text-slate-950 font-black shadow-lg shadow-slate-400/20'
  },
  bronze: {
    name: 'Série Bronze',
    shortName: 'Bronze',
    sublabel: '4ª Divisão • Superliga',
    color: 'from-orange-500 to-amber-700',
    badgeBg: 'bg-orange-500/20',
    badgeBorder: 'border-orange-500/40',
    badgeText: 'text-orange-300',
    activeTabClass: 'bg-gradient-to-r from-orange-500 to-amber-700 text-white font-black shadow-lg shadow-orange-500/20'
  },
  avaliacao: {
    name: 'Grupo de Avaliação',
    shortName: 'Avaliação',
    sublabel: '5ª Divisão • Superliga',
    color: 'from-purple-500 to-indigo-600',
    badgeBg: 'bg-purple-500/20',
    badgeBorder: 'border-purple-500/40',
    badgeText: 'text-purple-300',
    activeTabClass: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black shadow-lg shadow-purple-600/20'
  }
};

export const GaleriaDosCampeoesModal: React.FC<GaleriaDosCampeoesModalProps> = ({
  isOpen,
  onClose,
  schools,
  initialDivision = 'especial',
  onSelectSchool
}) => {
  const [selectedDivision, setSelectedDivision] = useState<GaleriaDivisionTab>(initialDivision);
  const [resultTab, setResultTab] = useState<GaleriaResultTab>('campeas');
  const [searchQuery, setSearchQuery] = useState('');

  // Update selectedDivision whenever modal is reopened with initialDivision
  useEffect(() => {
    if (isOpen && initialDivision) {
      setSelectedDivision(initialDivision);
    }
  }, [isOpen, initialDivision]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Map of unique schools by id
  const schoolsMap = useMemo(() => {
    const map = new Map<string, School>();
    schools.forEach((s) => {
      if (!map.has(s.id)) map.set(s.id, s);
    });
    return map;
  }, [schools]);

  // Unique schools list
  const uniqueSchools = useMemo(() => {
    return Array.from(schoolsMap.values());
  }, [schoolsMap]);

  // Calculate consolidated stats map once
  const schoolStatsMap = useMemo(() => {
    const map = new Map<string, ReturnType<typeof getSchoolConsolidatedStats>>();
    uniqueSchools.forEach((s) => {
      map.set(s.id, getSchoolConsolidatedStats(s));
    });
    return map;
  }, [uniqueSchools]);

  // Rankings calculation for current division
  const { campeasRanking, vicesRanking } = useMemo(() => {
    const campeasList: SchoolRankItem[] = [];
    const vicesList: SchoolRankItem[] = [];

    uniqueSchools.forEach((school) => {
      const stats = schoolStatsMap.get(school.id);
      if (!stats) return;

      const isExtinct = Boolean(school.isInactive || (school as any).inactive);
      const name = cleanSchoolName(school);

      let titlesCount = 0;
      let titleYears: number[] = [];
      let vicesCount = 0;
      let viceYears: number[] = [];

      switch (selectedDivision) {
        case 'especial':
          titlesCount = stats.totalEspecialTitles;
          titleYears = stats.allEspecialYears.map((y) => y.year);
          vicesCount = stats.totalEspecialVices;
          viceYears = stats.allEspecialRunnerUpYears.map((y) => y.year);
          break;
        case 'ouro':
          titlesCount = stats.totalOuroTitles;
          titleYears = stats.allOuroYears.map((y) => y.year);
          vicesCount = stats.totalOuroVices;
          viceYears = stats.allOuroRunnerUpYears.map((y) => y.year);
          break;
        case 'prata':
          titlesCount = stats.totalPrataTitles;
          titleYears = stats.allPrataYears.map((y) => y.year);
          vicesCount = stats.totalPrataVices;
          viceYears = stats.allPrataRunnerUpYears.map((y) => y.year);
          break;
        case 'bronze':
          titlesCount = stats.totalBronzeTitles;
          titleYears = stats.allBronzeYears.map((y) => y.year);
          vicesCount = stats.totalBronzeVices;
          viceYears = stats.allBronzeRunnerUpYears.map((y) => y.year);
          break;
        case 'avaliacao':
          titlesCount = stats.totalAvaliacaoTitles;
          titleYears = stats.allAvaliacaoYears.map((y) => y.year);
          vicesCount = stats.totalAvaliacaoVices;
          viceYears = stats.allAvaliacaoRunnerUpYears.map((y) => y.year);
          break;
      }

      if (titlesCount > 0) {
        campeasList.push({
          schoolId: school.id,
          schoolName: name,
          count: titlesCount,
          years: titleYears,
          isExtinct,
          school
        });
      }

      if (vicesCount > 0) {
        vicesList.push({
          schoolId: school.id,
          schoolName: name,
          count: vicesCount,
          years: viceYears,
          isExtinct,
          school
        });
      }
    });

    campeasList.sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      const lastA = a.years.length > 0 ? a.years[a.years.length - 1] : 0;
      const lastB = b.years.length > 0 ? b.years[b.years.length - 1] : 0;
      return lastB - lastA;
    });

    vicesList.sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      const lastA = a.years.length > 0 ? a.years[a.years.length - 1] : 0;
      const lastB = b.years.length > 0 ? b.years[b.years.length - 1] : 0;
      return lastB - lastA;
    });

    return { campeasRanking: campeasList, vicesRanking: vicesList };
  }, [uniqueSchools, schoolStatsMap, selectedDivision]);

  // Timeline year-by-year builder
  const yearlyTimeline = useMemo(() => {
    if (selectedDivision === 'avaliacao') {
      return OFFICIAL_AVALIACAO_YEARLY_RESULTS.map((r) => ({
        year: r.year,
        division: 'avaliacao' as GaleriaDivisionTab,
        divisionLabel: 'Grupo de Avaliação',
        champions: r.champions.map((c) => ({
          ...c,
          school: schoolsMap.get(c.schoolId)
        })),
        runnerUps: r.runnerUps.map((ru) => ({
          ...ru,
          school: schoolsMap.get(ru.schoolId)
        })),
        note: r.note
      })).sort((a, b) => b.year - a.year);
    }

    const yearMap = new Map<number, YearResultItem>();

    uniqueSchools.forEach((school) => {
      const stats = schoolStatsMap.get(school.id);
      if (!stats) return;

      const addResult = (
        titleList: { year: number }[],
        viceList: { year: number }[],
        divKey: GaleriaDivisionTab,
        divLabel: string
      ) => {
        titleList.forEach((t) => {
          if (!yearMap.has(t.year)) {
            yearMap.set(t.year, {
              year: t.year,
              division: divKey,
              divisionLabel: divLabel,
              champions: [],
              runnerUps: []
            });
          }
          yearMap.get(t.year)!.champions.push({
            schoolId: school.id,
            schoolName: cleanSchoolName(school),
            school
          });
        });

        viceList.forEach((v) => {
          if (!yearMap.has(v.year)) {
            yearMap.set(v.year, {
              year: v.year,
              division: divKey,
              divisionLabel: divLabel,
              champions: [],
              runnerUps: []
            });
          }
          yearMap.get(v.year)!.runnerUps.push({
            schoolId: school.id,
            schoolName: cleanSchoolName(school),
            school
          });
        });
      };

      if (selectedDivision === 'especial') {
        addResult(stats.allEspecialYears, stats.allEspecialRunnerUpYears, 'especial', 'Grupo Especial');
      } else if (selectedDivision === 'ouro') {
        addResult(stats.allOuroYears, stats.allOuroRunnerUpYears, 'ouro', 'Série Ouro');
      } else if (selectedDivision === 'prata') {
        addResult(stats.allPrataYears, stats.allPrataRunnerUpYears, 'prata', 'Série Prata');
      } else if (selectedDivision === 'bronze') {
        addResult(stats.allBronzeYears, stats.allBronzeRunnerUpYears, 'bronze', 'Série Bronze');
      }
    });

    if (selectedDivision === 'especial') {
      if (!yearMap.has(2021)) {
        yearMap.set(2021, {
          year: 2021,
          division: 'especial',
          divisionLabel: 'Grupo Especial',
          champions: [],
          runnerUps: [],
          note: 'Não houve Carnaval presencial oficial devido à pandemia de COVID-19'
        });
      }
    }

    return Array.from(yearMap.values()).sort((a, b) => b.year - a.year);
  }, [selectedDivision, uniqueSchools, schoolStatsMap, schoolsMap]);

  // Filtered lists based on search query
  const filteredCampeas = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return campeasRanking;
    return campeasRanking.filter(
      (c) =>
        c.schoolName.toLowerCase().includes(q) ||
        (c.school?.neighborhood && c.school.neighborhood.toLowerCase().includes(q)) ||
        (c.school?.abbreviation && c.school.abbreviation.toLowerCase().includes(q)) ||
        c.years.some((y) => y.toString().includes(q))
    );
  }, [campeasRanking, searchQuery]);

  const filteredVices = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return vicesRanking;
    return vicesRanking.filter(
      (v) =>
        v.schoolName.toLowerCase().includes(q) ||
        (v.school?.neighborhood && v.school.neighborhood.toLowerCase().includes(q)) ||
        (v.school?.abbreviation && v.school.abbreviation.toLowerCase().includes(q)) ||
        v.years.some((y) => y.toString().includes(q))
    );
  }, [vicesRanking, searchQuery]);

  const filteredTimeline = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return yearlyTimeline;
    return yearlyTimeline.filter(
      (item) =>
        item.year.toString().includes(q) ||
        item.champions.some((c) => c.schoolName.toLowerCase().includes(q)) ||
        item.runnerUps.some((r) => r.schoolName.toLowerCase().includes(q))
    );
  }, [yearlyTimeline, searchQuery]);

  // KPI stats
  const totalConquests = useMemo(() => {
    return campeasRanking.reduce((sum, item) => sum + item.count, 0);
  }, [campeasRanking]);

  const totalVicesCount = useMemo(() => {
    return vicesRanking.reduce((sum, item) => sum + item.count, 0);
  }, [vicesRanking]);

  const topChampion = campeasRanking.length > 0 ? campeasRanking[0] : null;

  if (!isOpen) return null;

  const currentDivConfig = DIVISION_CONFIG[selectedDivision];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-black/85 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 p-0.5 shadow-lg shadow-amber-500/20 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 fill-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg sm:text-2xl font-black text-white tracking-wide">
                  Galeria dos Campeões
                </h2>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Separado por Grupos
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 line-clamp-1">
                Palmarés oficial exclusivo por grupo: Campeãs e Vice-Campeãs de cada divisão do Carnaval Carioca
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer shrink-0"
            title="Fechar (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Division Selector (Abas dos Grupos) */}
        <div className="px-3 sm:px-6 py-2.5 bg-slate-950 border-b border-slate-800/80 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
            {(Object.keys(DIVISION_CONFIG) as GaleriaDivisionTab[]).map((divKey) => {
              const cfg = DIVISION_CONFIG[divKey];
              const isSelected = selectedDivision === divKey;

              return (
                <button
                  key={divKey}
                  type="button"
                  onClick={() => setSelectedDivision(divKey)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95 ${
                    isSelected
                      ? cfg.activeTabClass
                      : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <Trophy className={`w-3.5 h-3.5 ${isSelected ? '' : 'text-slate-500'}`} />
                  <span>{cfg.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      isSelected ? 'bg-black/20 text-current' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {divKey === 'especial'
                      ? '1ª Div'
                      : divKey === 'ouro'
                      ? '2ª Div'
                      : divKey === 'prata'
                      ? '3ª Div'
                      : divKey === 'bronze'
                      ? '4ª Div'
                      : '5ª Div'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sub-header: KPIs Banner & Search & Result Tabs */}
        <div className="px-4 sm:px-6 py-3 bg-slate-900/90 border-b border-slate-800 space-y-3">
          {/* Quick Division Info & Stats */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-black px-2.5 py-1 rounded-lg border ${currentDivConfig.badgeBg} ${currentDivConfig.badgeBorder} ${currentDivConfig.badgeText}`}>
                {currentDivConfig.name} ({currentDivConfig.sublabel})
              </span>
              <span className="text-slate-400 hidden sm:inline">•</span>
              <span className="text-slate-300 text-[11px]">
                {totalConquests} títulos homologados • {totalVicesCount} vice-campeonatos
              </span>
            </div>

            {topChampion && (
              <div className="flex items-center gap-2 bg-slate-950/70 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] self-start md:self-auto">
                <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-slate-400">Maior Campeã:</span>
                <strong className="text-amber-300 font-bold">{topChampion.schoolName}</strong>
                <span className="text-slate-500 font-mono">({topChampion.count} {topChampion.count === 1 ? 'título' : 'títulos'})</span>
              </div>
            )}
          </div>

          {/* Result Sub-tabs (Campeãs / Vices / Ano a Ano) & Search Input */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
            <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setResultTab('campeas')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  resultTab === 'campeas'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Campeãs ({campeasRanking.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setResultTab('vices')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  resultTab === 'vices'
                    ? 'bg-slate-300 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Medal className="w-3.5 h-3.5" />
                <span>Vice-Campeãs ({vicesRanking.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setResultTab('ano_a_ano')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  resultTab === 'ano_a_ano'
                    ? 'bg-purple-600 text-white shadow-md font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Ano a Ano ({yearlyTimeline.length})</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative sm:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar escola, ano, bairro..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-8 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* TAB 1: CAMPEÃS */}
          {resultTab === 'campeas' && (
            <div className="space-y-3">
              {filteredCampeas.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  Nenhuma escola campeã encontrada para a busca "{searchQuery}".
                </div>
              ) : (
                filteredCampeas.map((item, idx) => {
                  const medalEmoji = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : null;
                  const primaryColor = item.school?.colors?.primary || '#eab308';
                  const secondaryColor = item.school?.colors?.secondary || '#ffffff';

                  return (
                    <div
                      key={item.schoolId}
                      onClick={() => onSelectSchool && onSelectSchool(item.schoolId)}
                      className={`p-4 rounded-xl bg-slate-950/60 border border-slate-800/90 hover:border-amber-500/50 transition flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md group ${
                        onSelectSchool ? 'cursor-pointer' : ''
                      }`}
                    >
                      {/* Left: Rank, Name, Details */}
                      <div className="flex items-start sm:items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-black text-xs text-amber-400 shrink-0">
                          {medalEmoji || `#${idx + 1}`}
                        </div>

                        {/* Color swatch dot */}
                        <div
                          className="w-4 h-4 rounded-full border border-white/30 shrink-0 mt-1 sm:mt-0 shadow-inner"
                          style={{
                            background: `linear-gradient(135deg, ${primaryColor} 50%, ${secondaryColor} 50%)`
                          }}
                          title={`Cores: ${item.school?.colorsDescription || 'Oficiais'}`}
                        />

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-black text-sm sm:text-base text-white group-hover:text-amber-300 transition">
                              {item.schoolName}
                            </span>
                            {item.isExtinct && (
                              <span className="text-[10px] px-2 py-0.2 rounded-full font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                Inativa / Extinta
                              </span>
                            )}
                            {item.school?.division && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 uppercase font-mono">
                                {item.school.division}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400 mt-0.5">
                            {item.school?.neighborhood && <span>Bairro: {item.school.neighborhood}</span>}
                            {item.school?.foundationYear && <span>Fundação: {item.school.foundationYear}</span>}
                            {item.school?.symbol && <span className="text-slate-300">{item.school.symbol}</span>}
                          </div>
                        </div>
                      </div>

                      {/* Right: Titles count & Years Badges */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                        <div className="flex items-center gap-1.5">
                          <Trophy className="w-4 h-4 text-amber-400" />
                          <span className="text-lg font-black text-amber-400 font-mono">
                            {item.count}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">
                            {item.count === 1 ? 'título' : 'títulos'}
                          </span>
                        </div>

                        {/* List of Years */}
                        <div className="flex flex-wrap items-center gap-1 max-w-sm">
                          {item.years.map((year, yIdx) => {
                            const isMangueiraSuper =
                              item.schoolId === 'mangueira' &&
                              year === 1984 &&
                              yIdx === item.years.lastIndexOf(1984);
                            return (
                              <span
                                key={`${year}-${yIdx}`}
                                className={`px-2 py-0.5 rounded-md text-[11px] font-bold font-mono border ${
                                  isMangueiraSuper
                                    ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-sm'
                                    : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                                }`}
                                title={isMangueiraSuper ? 'Supercampeã de 1984' : undefined}
                              >
                                {isMangueiraSuper ? '1984 (Super)' : year}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TAB 2: VICE-CAMPEÃS */}
          {resultTab === 'vices' && (
            <div className="space-y-3">
              {filteredVices.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  Nenhuma escola vice-campeã encontrada para a busca "{searchQuery}".
                </div>
              ) : (
                filteredVices.map((item, idx) => {
                  const primaryColor = item.school?.colors?.primary || '#94a3b8';
                  const secondaryColor = item.school?.colors?.secondary || '#ffffff';

                  return (
                    <div
                      key={item.schoolId}
                      onClick={() => onSelectSchool && onSelectSchool(item.schoolId)}
                      className={`p-4 rounded-xl bg-slate-950/60 border border-slate-800/90 hover:border-slate-500/50 transition flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md group ${
                        onSelectSchool ? 'cursor-pointer' : ''
                      }`}
                    >
                      {/* Left: Rank, Name, Details */}
                      <div className="flex items-start sm:items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-black text-xs text-slate-300 shrink-0">
                          #{idx + 1}
                        </div>

                        {/* Color swatch dot */}
                        <div
                          className="w-4 h-4 rounded-full border border-white/30 shrink-0 mt-1 sm:mt-0 shadow-inner"
                          style={{
                            background: `linear-gradient(135deg, ${primaryColor} 50%, ${secondaryColor} 50%)`
                          }}
                          title={`Cores: ${item.school?.colorsDescription || 'Oficiais'}`}
                        />

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-black text-sm sm:text-base text-white group-hover:text-slate-200 transition">
                              {item.schoolName}
                            </span>
                            {item.isExtinct && (
                              <span className="text-[10px] px-2 py-0.2 rounded-full font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                Inativa / Extinta
                              </span>
                            )}
                            {item.school?.division && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 uppercase font-mono">
                                {item.school.division}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400 mt-0.5">
                            {item.school?.neighborhood && <span>Bairro: {item.school.neighborhood}</span>}
                            {item.school?.foundationYear && <span>Fundação: {item.school.foundationYear}</span>}
                            {item.school?.symbol && <span className="text-slate-300">{item.school.symbol}</span>}
                          </div>
                        </div>
                      </div>

                      {/* Right: Vices count & Years Badges */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                        <div className="flex items-center gap-1.5">
                          <Medal className="w-4 h-4 text-slate-400" />
                          <span className="text-lg font-black text-slate-200 font-mono">
                            {item.count}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">
                            {item.count === 1 ? 'vice' : 'vices'}
                          </span>
                        </div>

                        {/* List of Years */}
                        <div className="flex flex-wrap items-center gap-1 max-w-sm">
                          {item.years.map((year, yIdx) => (
                            <span
                              key={`${year}-${yIdx}`}
                              className="px-2 py-0.5 rounded-md text-[11px] font-bold font-mono bg-slate-800 text-slate-300 border border-slate-700"
                            >
                              {year}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TAB 3: ANO A ANO (CRONOLÓGICO) */}
          {resultTab === 'ano_a_ano' && (
            <div className="space-y-3">
              {filteredTimeline.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  Nenhum registro cronológico encontrado para a busca "{searchQuery}".
                </div>
              ) : (
                filteredTimeline.map((item, itemIdx) => (
                  <div
                    key={`${item.year}-${item.division || selectedDivision}-${itemIdx}`}
                    className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    {/* Left: Year Badge & Division */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-16 sm:w-20 py-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
                        <span className="font-black font-mono text-base sm:text-lg text-white">
                          {item.year}
                        </span>
                      </div>
                      <div className="text-xs">
                        <span className="text-slate-400 font-medium block">
                          Carnaval {item.year}
                        </span>
                        <span className="text-[11px] text-amber-400 font-bold">
                          {item.divisionLabel || currentDivConfig.name}
                        </span>
                      </div>
                    </div>

                    {/* Center / Right: Champions & Runner-Ups Cards */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {/* Campeã */}
                      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                          <div className="min-w-0">
                            <span className="text-[10px] text-amber-400/90 uppercase tracking-wider block font-bold">
                              Campeã
                            </span>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {item.champions.length > 0 ? (
                                item.champions.map((champ, i) => (
                                  <span
                                    key={`${champ.schoolId}-${item.year}-${i}`}
                                    onClick={() => onSelectSchool && onSelectSchool(champ.schoolId)}
                                    className={`font-black text-xs sm:text-sm text-white hover:text-amber-300 transition ${
                                      onSelectSchool ? 'cursor-pointer underline decoration-dotted' : ''
                                    }`}
                                  >
                                    {champ.schoolName}
                                    {i < item.champions.length - 1 ? ' & ' : ''}
                                  </span>
                                ))
                              ) : (
                                <span className="text-xs text-slate-400 italic">
                                  {item.note || 'Sem disputa oficial'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Vice-Campeã */}
                      <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/60 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <Medal className="w-4 h-4 text-slate-400 shrink-0" />
                          <div className="min-w-0">
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                              Vice-Campeã
                            </span>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {item.runnerUps.length > 0 ? (
                                item.runnerUps.map((vice, i) => (
                                  <span
                                    key={`${vice.schoolId}-${item.year}-${i}`}
                                    onClick={() => onSelectSchool && onSelectSchool(vice.schoolId)}
                                    className={`font-black text-xs sm:text-sm text-slate-200 hover:text-white transition ${
                                      onSelectSchool ? 'cursor-pointer underline decoration-dotted' : ''
                                    }`}
                                  >
                                    {vice.schoolName}
                                    {i < item.runnerUps.length - 1 ? ' & ' : ''}
                                  </span>
                                ))
                              ) : (
                                <span className="text-xs text-slate-500 italic">
                                  {item.note ? 'Sem desfile' : 'Não informado / Em aberto'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-[11px]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Resultados oficiais autenticados pela LIESA, Liga-RJ e Superliga Carnavalesca do Brasil.
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition cursor-pointer text-xs"
          >
            Fechar Galeria
          </button>
        </div>
      </div>
    </div>
  );
};
