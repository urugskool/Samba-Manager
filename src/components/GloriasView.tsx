import React, { useState, useMemo, useRef } from 'react';
import { School, DivisionId, YearHistory } from '../types/carnaval';
import { getSchoolConsolidatedStats, INITIAL_HISTORY } from '../data/carnavalData';
import {
  cleanSchoolName,
  getSchoolCorporateName,
  getSchoolDenomination,
  getSchoolDenominationExtenso
} from '../utils/schoolNameUtils';
import {
  Trophy,
  Award,
  Medal,
  Star,
  Sparkles,
  History,
  ShieldCheck,
  Search,
  CheckCircle2,
  ChevronRight,
  Filter,
  Building2,
  Users,
  Palette,
  Calendar
} from 'lucide-react';

interface GloriasViewProps {
  schools: School[];
  userSchool: School | null;
  currentYear: number;
  history?: YearHistory[];
}

export const GloriasView: React.FC<GloriasViewProps> = ({
  schools,
  userSchool,
  currentYear,
  history
}) => {
  const lastHistory = (history && history.length > 0 ? history[0] : null) || INITIAL_HISTORY[0];
  const galleryRef = useRef<HTMLDivElement>(null);

  const isSchoolActive = (s: School) => !s.isInactive && !s.inactive;
  const isSchoolInactive = (s: School) => Boolean(s.isInactive || s.inactive);

  // Filter and search states
  const [divisionFilter, setDivisionFilter] = useState<'all' | DivisionId | 'inativas'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tableDivisionFilter, setTableDivisionFilter] = useState<'all' | DivisionId | 'inativas'>('all');

  const espCount = useMemo(() => schools.filter((s) => s.division === 'especial' && isSchoolActive(s)).length, [schools]);
  const ouroCount = useMemo(() => schools.filter((s) => s.division === 'ouro' && isSchoolActive(s)).length, [schools]);
  const prataCount = useMemo(() => schools.filter((s) => s.division === 'prata' && isSchoolActive(s)).length, [schools]);
  const bronzeCount = useMemo(() => schools.filter((s) => s.division === 'bronze' && isSchoolActive(s)).length, [schools]);
  const avaliacaoCount = useMemo(() => schools.filter((s) => s.division === 'avaliacao' && isSchoolActive(s)).length, [schools]);
  const inativasCount = useMemo(() => schools.filter(isSchoolInactive).length, [schools]);
  const activeSchoolsCount = espCount + ouroCount + prataCount + bronzeCount + avaliacaoCount;

  // Pre-calculate consolidated stats and last carnival info for all schools
  const rankedSchools = useMemo(() => {
    return schools.map((sch) => {
      const stats = getSchoolConsolidatedStats(sch);
      const isInactive = isSchoolInactive(sch);
      
      // Last carnival result determination
      let lastResult = {
        badgeText: isInactive
          ? 'AFASTADA / INATIVA'
          : sch.division === 'especial'
          ? 'ESPECIAL'
          : sch.division === 'ouro'
          ? 'SÉRIE OURO'
          : sch.division === 'prata'
          ? 'SÉRIE PRATA'
          : sch.division === 'bronze'
          ? 'SÉRIE BRONZE'
          : 'AVALIAÇÃO',
        shortBadge: isInactive
          ? '💤 Inativa'
          : sch.division === 'especial'
          ? 'Especial'
          : sch.division === 'ouro'
          ? 'Série Ouro'
          : sch.division === 'prata'
          ? 'Série Prata'
          : sch.division === 'bronze'
          ? 'Série Bronze'
          : 'Avaliação',
        rank: 99
      };

      if (lastHistory && !isInactive) {
        if (sch.division === 'especial') {
          const esp = lastHistory.especialStandings?.find(
            (s) => s.schoolId === sch.id || s.schoolName.toLowerCase() === sch.name.toLowerCase()
          );
          if (esp) {
            lastResult = {
              badgeText: esp.rank === 1 ? `🏆 Campeã Especial ${lastHistory.year}` : `${esp.rank}º Lugar Especial`,
              shortBadge: esp.rank === 1 ? '🏆 Campeã' : esp.rank === 2 ? '🥈 Vice' : `${esp.rank}º Lugar`,
              rank: esp.rank
            };
          }
        } else if (sch.division === 'ouro') {
          const ouro = lastHistory.ouroStandings?.find(
            (s) => s.schoolId === sch.id || s.schoolName.toLowerCase() === sch.name.toLowerCase()
          );
          if (ouro) {
            lastResult = {
              badgeText: ouro.rank === 1 ? `⬆️ Campeã Ouro ${lastHistory.year}` : `${ouro.rank}º Lugar Ouro`,
              shortBadge: ouro.rank === 1 ? '⬆️ Campeã' : ouro.rank === 2 ? '🥈 Vice' : `${ouro.rank}º Lugar`,
              rank: ouro.rank
            };
          }
        } else if (sch.division === 'prata') {
          const prata = lastHistory.prataStandings?.find(
            (s) => s.schoolId === sch.id || s.schoolName.toLowerCase() === sch.name.toLowerCase()
          );
          if (prata) {
            lastResult = {
              badgeText: prata.rank === 1 ? `⬆️ Campeã Prata ${lastHistory.year}` : `${prata.rank}º Lugar Prata`,
              shortBadge: prata.rank === 1 ? '⬆️ Campeã' : prata.rank === 2 ? '🥈 Vice' : `${prata.rank}º Lugar`,
              rank: prata.rank
            };
          }
        } else if (sch.division === 'bronze') {
          const bronze = lastHistory.bronzeStandings?.find(
            (s) => s.schoolId === sch.id || s.schoolName.toLowerCase() === sch.name.toLowerCase()
          );
          if (bronze) {
            lastResult = {
              badgeText: bronze.rank === 1 ? `🏆 Campeã Bronze ${lastHistory.year}` : `${bronze.rank}º Lugar Bronze`,
              shortBadge: bronze.rank === 1 ? '🏆 Campeã' : bronze.rank === 2 ? '🥈 Vice' : `${bronze.rank}º Lugar`,
              rank: bronze.rank
            };
          }
        } else if (sch.division === 'avaliacao') {
          const ava = lastHistory.avaliacaoStandings?.find(
            (s) => s.schoolId === sch.id || s.schoolName.toLowerCase() === sch.name.toLowerCase()
          );
          if (ava) {
            lastResult = {
              badgeText: ava.rank === 1 ? `🏆 Campeã Avaliação ${lastHistory.year}` : `${ava.rank}º Lugar Avaliação`,
              shortBadge: ava.rank === 1 ? '🏆 Campeã' : ava.rank === 2 ? '🥈 Vice' : `${ava.rank}º Lugar`,
              rank: ava.rank
            };
          }
        }
      }

      return {
        school: sch,
        stats,
        lastResult
      };
    }).sort((a, b) => {
      // Sort strictly by total titles across tiers
      if (b.stats.totalEspecialTitles !== a.stats.totalEspecialTitles) {
        return b.stats.totalEspecialTitles - a.stats.totalEspecialTitles;
      }
      if (b.stats.totalEspecialVices !== a.stats.totalEspecialVices) {
        return b.stats.totalEspecialVices - a.stats.totalEspecialVices;
      }
      if (b.stats.totalOuroTitles !== a.stats.totalOuroTitles) {
        return b.stats.totalOuroTitles - a.stats.totalOuroTitles;
      }
      if (b.stats.totalOuroVices !== a.stats.totalOuroVices) {
        return b.stats.totalOuroVices - a.stats.totalOuroVices;
      }
      if (b.stats.totalPrataTitles !== a.stats.totalPrataTitles) {
        return b.stats.totalPrataTitles - a.stats.totalPrataTitles;
      }
      if (b.stats.totalBronzeTitles !== a.stats.totalBronzeTitles) {
        return b.stats.totalBronzeTitles - a.stats.totalBronzeTitles;
      }
      if (b.stats.totalAvaliacaoTitles !== a.stats.totalAvaliacaoTitles) {
        return b.stats.totalAvaliacaoTitles - a.stats.totalAvaliacaoTitles;
      }
      return b.stats.grandTotalTitles - a.stats.grandTotalTitles;
    });
  }, [schools, lastHistory]);

  // Selected school (defaults to #1 ranking: Portela)
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>(() => {
    return rankedSchools[0]?.school.id || 'portela';
  });

  const selectedEntry = useMemo(() => {
    return rankedSchools.find((r) => r.school.id === selectedSchoolId) || rankedSchools[0];
  }, [rankedSchools, selectedSchoolId]);

  const selectedSchool = selectedEntry?.school || schools[0];
  const selectedStats = selectedEntry?.stats || getSchoolConsolidatedStats(selectedSchool);
  const achievements = useMemo(() => {
    return [...selectedStats.achievements].sort((a, b) => b.year - a.year);
  }, [selectedStats]);

  // Filtered schools for browser list
  const filteredSchools = useMemo(() => {
    return rankedSchools.filter((item) => {
      let matchDivision = true;
      if (divisionFilter === 'inativas') {
        matchDivision = isSchoolInactive(item.school);
      } else if (divisionFilter === 'all') {
        matchDivision = isSchoolActive(item.school);
      } else {
        matchDivision = item.school.division === divisionFilter && isSchoolActive(item.school);
      }
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        item.school.name.toLowerCase().includes(query) ||
        (item.school.shortName && item.school.shortName.toLowerCase().includes(query)) ||
        (item.school.nickname && item.school.nickname.toLowerCase().includes(query)) ||
        (item.school.neighborhood && item.school.neighborhood.toLowerCase().includes(query));
      return matchDivision && matchSearch;
    });
  }, [rankedSchools, divisionFilter, searchQuery]);

  // Filtered schools for the all-time ranking table
  const tableSchools = useMemo(() => {
    if (tableDivisionFilter === 'all') return rankedSchools.filter((item) => isSchoolActive(item.school));
    if (tableDivisionFilter === 'inativas') return rankedSchools.filter((item) => isSchoolInactive(item.school));
    return rankedSchools.filter((item) => item.school.division === tableDivisionFilter && isSchoolActive(item.school));
  }, [rankedSchools, tableDivisionFilter]);

  const handleSelectSchool = (schoolId: string) => {
    setSelectedSchoolId(schoolId);
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Division visual helper
  const getDivisionBadge = (schoolOrDivision: School | DivisionId) => {
    if (typeof schoolOrDivision === 'object') {
      if (isSchoolInactive(schoolOrDivision)) {
        return {
          label: 'Inativa / Afastada',
          short: 'Inativa',
          badgeClass: 'bg-rose-950/40 text-rose-300 border-rose-700/50',
          solidClass: 'bg-rose-800 text-rose-100 font-black',
          dotColor: '#e11d48'
        };
      }
      return getDivisionBadge(schoolOrDivision.division);
    }
    switch (schoolOrDivision) {
      case 'especial':
        return {
          label: 'Grupo Especial',
          short: 'Especial',
          badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          solidClass: 'bg-amber-500 text-slate-950 font-black',
          dotColor: '#f59e0b'
        };
      case 'ouro':
        return {
          label: 'Série Ouro',
          short: 'Ouro',
          badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
          solidClass: 'bg-blue-600 text-white font-black',
          dotColor: '#3b82f6'
        };
      case 'prata':
        return {
          label: 'Série Prata',
          short: 'Prata',
          badgeClass: 'bg-slate-300/20 text-slate-200 border-slate-400/40',
          solidClass: 'bg-slate-300 text-slate-950 font-black',
          dotColor: '#94a3b8'
        };
      case 'bronze':
        return {
          label: 'Série Bronze',
          short: 'Bronze',
          badgeClass: 'bg-amber-700/25 text-amber-300 border-amber-600/40',
          solidClass: 'bg-amber-700 text-amber-100 font-black ring-1 ring-amber-500/60',
          dotColor: '#b45309'
        };
      case 'avaliacao':
        return {
          label: 'Grupo de Avaliação',
          short: 'Avaliação',
          badgeClass: 'bg-purple-600/25 text-purple-300 border-purple-500/40',
          solidClass: 'bg-purple-600 text-white font-black ring-1 ring-purple-400/60',
          dotColor: '#9333ea'
        };
    }
  };

  const selectedDivInfo = getDivisionBadge(selectedSchool);

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Dynamic Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              👑 SALA DE GLÓRIAS & HONRAS DO SAMBA
            </span>
            <span className="text-xs text-slate-400 font-medium">Palmarés Oficial do Carnaval</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Galeria de Títulos e Estatísticas
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
            Classificação histórica e oficial do Carnaval Carioca: total de <strong className="text-amber-300 font-bold">{activeSchoolsCount} desfiles por ano</strong> de agremiações ativas ({espCount} Especial, {ouroCount} Ouro, {prataCount} Prata, {bronzeCount} Bronze, {avaliacaoCount} Avaliação) e <strong className="text-rose-400 font-bold">{inativasCount} agremiações inativas / afastadas</strong> atualmente (Carnaval {currentYear}).
          </p>
        </div>

        {/* Quick actions: Select User School */}
        {userSchool && (
          <button
            onClick={() => handleSelectSchool(userSchool.id)}
            className="px-4 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold rounded-xl text-xs transition flex items-center gap-2 self-start md:self-auto shadow-md cursor-pointer"
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Minha Escola ({userSchool.shortName || cleanSchoolName(userSchool)})</span>
          </button>
        )}
      </div>

      {/* Navegador Dinâmico de Escolas (Clean & Intuitivo) */}
      <div className="bg-slate-900/85 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        {/* Filter Controls & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Division Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setDivisionFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                divisionFilter === 'all'
                  ? 'bg-amber-500 text-slate-950 font-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Todas as Ativas ({activeSchoolsCount})
            </button>
            <button
              onClick={() => setDivisionFilter('especial')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                divisionFilter === 'especial'
                  ? 'bg-amber-500 text-slate-950 font-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Especial ({espCount})</span>
            </button>
            <button
              onClick={() => setDivisionFilter('ouro')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                divisionFilter === 'ouro'
                  ? 'bg-blue-600 text-white font-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Série Ouro ({ouroCount})</span>
            </button>
            <button
              onClick={() => setDivisionFilter('prata')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                divisionFilter === 'prata'
                  ? 'bg-slate-300 text-slate-950 font-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-slate-300" />
              <span>Série Prata ({prataCount})</span>
            </button>
            <button
              onClick={() => setDivisionFilter('bronze')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                divisionFilter === 'bronze'
                  ? 'bg-amber-700 text-amber-100 font-black shadow ring-1 ring-amber-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span>Série Bronze ({bronzeCount})</span>
            </button>
            <button
              onClick={() => setDivisionFilter('avaliacao')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                divisionFilter === 'avaliacao'
                  ? 'bg-purple-600 text-white font-black shadow ring-1 ring-purple-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Grupo de Avaliação ({avaliacaoCount})</span>
            </button>
            <button
              onClick={() => setDivisionFilter('inativas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                divisionFilter === 'inativas'
                  ? 'bg-rose-900 text-rose-100 font-black shadow ring-1 ring-rose-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Inativas / Afastadas ({inativasCount})</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[220px] sm:min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar agremiação..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Scrollable School List (Ordered by Titles) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {filteredSchools.map((item, idx) => {
            const sch = item.school;
            const stats = item.stats;
            const isSelected = sch.id === selectedSchoolId;
            const divInfo = getDivisionBadge(sch);

            return (
              <button
                key={sch.id}
                onClick={() => handleSelectSchool(sch.id)}
                className={`flex-shrink-0 px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-2.5 transition relative cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg ring-1 ring-amber-400/80'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <span className="font-mono text-[10px] text-slate-500">#{idx + 1}</span>

                <div
                  className="w-3.5 h-3.5 rounded-full border flex-shrink-0 shadow-sm"
                  style={{
                    backgroundColor: sch.colors.primary,
                    borderColor: sch.colors.border || '#fff'
                  }}
                />

                <span className="truncate max-w-[150px] sm:max-w-[200px] font-semibold text-white">
                  {cleanSchoolName(sch)}
                </span>

                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase border ${divInfo.badgeClass}`}>
                  {divInfo.short}
                </span>

                {stats.grandTotalTitles > 0 ? (
                  <span className="text-[10px] text-amber-400 font-mono font-black">
                    ★{stats.grandTotalTitles}
                  </span>
                ) : (
                  <span className="text-[9px] text-slate-600 font-mono">0</span>
                )}
              </button>
            );
          })}
          {filteredSchools.length === 0 && (
            <div className="py-4 text-center text-xs text-slate-500 w-full">
              Nenhuma agremiação encontrada para os filtros selecionados.
            </div>
          )}
        </div>
      </div>

      {/* Vitrine da Agremiação Selecionada (Hero Dinâmico & Elegante) */}
      <div ref={galleryRef} className="space-y-5 scroll-mt-20">
        {/* Banner de Identidade Visual Oficial */}
        <div
          className="rounded-2xl p-6 sm:p-7 border shadow-2xl relative overflow-hidden transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${selectedSchool.colors.primary}dd 0%, #090d16 85%)`,
            borderColor: selectedSchool.colors.border || '#334155'
          }}
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                {/* Correct Division Pill */}
                <span className={`text-[11px] font-black uppercase px-3 py-0.5 rounded-full shadow-sm ${selectedDivInfo.solidClass}`}>
                  {selectedDivInfo.label}
                </span>

                <span className="text-xs text-slate-300 bg-black/50 px-2.5 py-0.5 rounded-full border border-white/10 font-medium">
                  Fundação: {selectedSchool.foundationDate || selectedSchool.foundationYear} • Bairro: {selectedSchool.neighborhood}
                </span>

                {isSchoolInactive(selectedSchool) && (
                  <span className="text-xs text-rose-200 bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-700/60 font-medium">
                    {selectedSchool.suspensionReason || 'Agremiação Afastada / Inativa'}
                  </span>
                )}

                {selectedSchool.id === userSchool?.id && (
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 uppercase tracking-wide">
                    Sua Agremiação
                  </span>
                )}

                <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-sm">
                  {getSchoolDenomination(selectedSchool)}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {cleanSchoolName(selectedSchool)}
              </h2>

              <p className="text-sm text-amber-200/90 italic font-semibold">
                "{selectedSchool.nickname}" • Pavilhão: {selectedSchool.symbol}
              </p>
              <p className="text-xs text-slate-300 font-medium">
                Razão Social: <span className="text-white font-semibold">{getSchoolCorporateName(selectedSchool)}</span>
              </p>
            </div>

            {/* Total Trophies Compact Box */}
            <div className="bg-black/75 border border-amber-500/30 rounded-2xl p-4 text-center min-w-[220px] shadow-xl backdrop-blur-md self-start md:self-auto">
              <div className="text-[10px] text-amber-300 uppercase tracking-wider font-extrabold flex items-center justify-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Palmarés Acumulado</span>
              </div>
              <div className="text-4xl font-black text-amber-400 font-mono mt-0.5">
                {selectedStats.grandTotalTitles}
              </div>
              <div className="text-[11px] text-slate-300 font-medium">
                {selectedStats.grandTotalTitles === 1 ? '1 Título' : `${selectedStats.grandTotalTitles} Títulos`} • {selectedStats.grandTotalVices} Vice{selectedStats.grandTotalVices === 1 ? '' : 's'}
              </div>
              <div className="mt-1 pt-1 border-t border-white/10 text-[10px] text-amber-300/90 font-bold flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{selectedStats.grandTotalConquests} Conquistas Oficiais</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Cards das Divisões Oficiais (Especial, Ouro, Prata, Bronze, Avaliação) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Grupo Especial */}
          <div
            className={`rounded-2xl p-4 sm:p-5 border transition flex flex-col justify-between ${
              selectedStats.totalEspecialTitles > 0
                ? 'bg-amber-500/10 border-amber-500/40 shadow-lg'
                : 'bg-slate-900/70 border-slate-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Grupo Especial
                </span>
                <Trophy className={`w-4 h-4 ${selectedStats.totalEspecialTitles > 0 ? 'text-amber-400' : 'text-slate-600'}`} />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {selectedStats.totalEspecialTitles}
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[11px] text-slate-300 flex items-center justify-between">
              <span>{selectedStats.totalEspecialTitles === 1 ? '1 título' : `${selectedStats.totalEspecialTitles} títulos`}</span>
              <span className="text-slate-400">{selectedStats.totalEspecialVices} vices</span>
            </div>
          </div>

          {/* Série Ouro */}
          <div
            className={`rounded-2xl p-4 sm:p-5 border transition flex flex-col justify-between ${
              selectedStats.totalOuroTitles > 0
                ? 'bg-blue-500/10 border-blue-500/40 shadow-lg'
                : 'bg-slate-900/70 border-slate-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                  Série Ouro
                </span>
                <Award className={`w-4 h-4 ${selectedStats.totalOuroTitles > 0 ? 'text-blue-400' : 'text-slate-600'}`} />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {selectedStats.totalOuroTitles}
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[11px] text-slate-300 flex items-center justify-between">
              <span>{selectedStats.totalOuroTitles === 1 ? '1 título' : `${selectedStats.totalOuroTitles} títulos`}</span>
              <span className="text-slate-400">{selectedStats.totalOuroVices} vices</span>
            </div>
          </div>

          {/* Série Prata */}
          <div
            className={`rounded-2xl p-4 sm:p-5 border transition flex flex-col justify-between ${
              selectedStats.totalPrataTitles > 0
                ? 'bg-slate-400/10 border-slate-400/40 shadow-lg'
                : 'bg-slate-900/70 border-slate-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Série Prata
                </span>
                <Medal className={`w-4 h-4 ${selectedStats.totalPrataTitles > 0 ? 'text-slate-300' : 'text-slate-600'}`} />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {selectedStats.totalPrataTitles}
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[11px] text-slate-300 flex items-center justify-between">
              <span>{selectedStats.totalPrataTitles === 1 ? '1 título' : `${selectedStats.totalPrataTitles} títulos`}</span>
              <span className="text-slate-400">{selectedStats.totalPrataVices} vices</span>
            </div>
          </div>

          {/* Série Bronze */}
          <div
            className={`rounded-2xl p-4 sm:p-5 border transition flex flex-col justify-between ${
              selectedStats.totalBronzeTitles > 0
                ? 'bg-amber-700/15 border-amber-600/40 shadow-lg'
                : 'bg-slate-900/70 border-slate-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wider">
                  Série Bronze
                </span>
                <Medal className={`w-4 h-4 ${selectedStats.totalBronzeTitles > 0 ? 'text-amber-500' : 'text-slate-600'}`} />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {selectedStats.totalBronzeTitles}
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[11px] text-slate-300 flex items-center justify-between">
              <span>{selectedStats.totalBronzeTitles === 1 ? '1 título' : `${selectedStats.totalBronzeTitles} títulos`}</span>
              <span className="text-slate-400">{selectedStats.totalBronzeVices} vices</span>
            </div>
          </div>

          {/* Grupo de Avaliação */}
          <div
            className={`rounded-2xl p-4 sm:p-5 border transition flex flex-col justify-between ${
              selectedStats.totalAvaliacaoTitles > 0
                ? 'bg-purple-600/15 border-purple-500/40 shadow-lg'
                : 'bg-slate-900/70 border-slate-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">
                  Grupo de Avaliação
                </span>
                <Award className={`w-4 h-4 ${selectedStats.totalAvaliacaoTitles > 0 ? 'text-purple-400' : 'text-slate-600'}`} />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {selectedStats.totalAvaliacaoTitles}
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[11px] text-slate-300 flex items-center justify-between">
              <span>{selectedStats.totalAvaliacaoTitles === 1 ? '1 título' : `${selectedStats.totalAvaliacaoTitles} títulos`}</span>
              <span className="text-slate-400">{selectedStats.totalAvaliacaoVices} vices</span>
            </div>
          </div>
        </div>

        {/* Quadro Consolidado e Anos das Conquistas (Apenas o que é necessário!) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Anos de Consagração dos Títulos */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-800">
                <History className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Títulos Eternizados por Divisão
                </h3>
              </div>

              {/* Títulos do Especial */}
              {selectedStats.allEspecialYears.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-400 uppercase flex items-center gap-1">
                    <span>★ Grupo Especial ({selectedStats.totalEspecialTitles}):</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedStats.allEspecialYears.map((entry) => (
                      <span
                        key={entry.year}
                        className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30"
                      >
                        {entry.year}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Títulos da Série Ouro */}
              {selectedStats.allOuroYears.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-blue-400 uppercase flex items-center gap-1">
                    <span>✦ Série Ouro ({selectedStats.totalOuroTitles}):</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedStats.allOuroYears.map((entry) => (
                      <span
                        key={entry.year}
                        className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30"
                      >
                        {entry.year}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Títulos da Série Prata */}
              {selectedStats.allPrataYears.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1">
                    <span>◆ Série Prata ({selectedStats.totalPrataTitles}):</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedStats.allPrataYears.map((entry) => (
                      <span
                        key={entry.year}
                        className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-400/15 text-slate-200 border border-slate-400/30"
                      >
                        {entry.year}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Títulos da Série Bronze */}
              {selectedStats.allBronzeYears.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-500 uppercase flex items-center gap-1">
                    <span>▲ Série Bronze ({selectedStats.totalBronzeTitles}):</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedStats.allBronzeYears.map((entry) => (
                      <span
                        key={entry.year}
                        className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-700/20 text-amber-300 border border-amber-600/30"
                      >
                        {entry.year}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Títulos do Grupo de Avaliação */}
              {selectedStats.allAvaliacaoYears && selectedStats.allAvaliacaoYears.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-purple-400 uppercase flex items-center gap-1">
                    <span>✦ Grupo de Avaliação ({selectedStats.totalAvaliacaoTitles}):</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedStats.allAvaliacaoYears.map((entry) => (
                      <span
                        key={entry.year}
                        className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-purple-600/20 text-purple-300 border border-purple-500/30"
                      >
                        {entry.year}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Zero titles scenario */}
              {selectedStats.grandTotalTitles === 0 && (
                <div className="py-6 text-center text-xs text-slate-500 italic">
                  Esta agremiação ainda está em busca da sua primeira consagração como campeã oficial no Carnaval Carioca.
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Situação no Carnaval {lastHistory?.year || currentYear - 1}:</span>
              <span className="font-bold text-white">{selectedEntry.lastResult.badgeText}</span>
            </div>
          </div>

          {/* Tabela Resumo das 5 Divisões */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Resumo Geral de Conquistas (5 Divisões)
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {selectedStats.grandTotalConquests} conquistas
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="py-1.5 px-2">Divisão</th>
                    <th className="py-1.5 px-2 text-center text-amber-400 font-bold">Títulos</th>
                    <th className="py-1.5 px-2 text-center text-slate-300 font-bold">Vices</th>
                    <th className="py-1.5 px-2 text-right text-white font-bold">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  <tr>
                    <td className="py-2 px-2 font-sans font-semibold text-amber-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>Grupo Especial</span>
                    </td>
                    <td className="py-2 px-2 text-center text-amber-400 font-black">
                      {selectedStats.totalEspecialTitles}
                    </td>
                    <td className="py-2 px-2 text-center text-slate-400">
                      {selectedStats.totalEspecialVices}
                    </td>
                    <td className="py-2 px-2 text-right font-bold text-white">
                      {selectedStats.totalEspecialTitles + selectedStats.totalEspecialVices}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2 px-2 font-sans font-semibold text-blue-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      <span>Série Ouro</span>
                    </td>
                    <td className="py-2 px-2 text-center text-blue-400 font-black">
                      {selectedStats.totalOuroTitles}
                    </td>
                    <td className="py-2 px-2 text-center text-slate-400">
                      {selectedStats.totalOuroVices}
                    </td>
                    <td className="py-2 px-2 text-right font-bold text-white">
                      {selectedStats.totalOuroTitles + selectedStats.totalOuroVices}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2 px-2 font-sans font-semibold text-slate-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-400" />
                      <span>Série Prata</span>
                    </td>
                    <td className="py-2 px-2 text-center text-slate-300 font-black">
                      {selectedStats.totalPrataTitles}
                    </td>
                    <td className="py-2 px-2 text-center text-slate-400">
                      {selectedStats.totalPrataVices}
                    </td>
                    <td className="py-2 px-2 text-right font-bold text-white">
                      {selectedStats.totalPrataTitles + selectedStats.totalPrataVices}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2 px-2 font-sans font-semibold text-amber-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-600" />
                      <span>Série Bronze</span>
                    </td>
                    <td className="py-2 px-2 text-center text-amber-500 font-black">
                      {selectedStats.totalBronzeTitles}
                    </td>
                    <td className="py-2 px-2 text-center text-slate-400">
                      {selectedStats.totalBronzeVices}
                    </td>
                    <td className="py-2 px-2 text-right font-bold text-white">
                      {selectedStats.totalBronzeTitles + selectedStats.totalBronzeVices}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2 px-2 font-sans font-semibold text-purple-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      <span>Grupo de Avaliação</span>
                    </td>
                    <td className="py-2 px-2 text-center text-purple-400 font-black">
                      {selectedStats.totalAvaliacaoTitles}
                    </td>
                    <td className="py-2 px-2 text-center text-slate-400">
                      {selectedStats.totalAvaliacaoVices}
                    </td>
                    <td className="py-2 px-2 text-right font-bold text-white">
                      {selectedStats.totalAvaliacaoTitles + selectedStats.totalAvaliacaoVices}
                    </td>
                  </tr>

                  <tr className="bg-slate-950/60 font-black">
                    <td className="py-2 px-2 font-sans text-white text-[11px] uppercase tracking-wider">
                      TOTAL GERAL
                    </td>
                    <td className="py-2 px-2 text-center text-amber-400 text-sm">
                      {selectedStats.grandTotalTitles}
                    </td>
                    <td className="py-2 px-2 text-center text-slate-300 text-sm">
                      {selectedStats.grandTotalVices}
                    </td>
                    <td className="py-2 px-2 text-right text-emerald-400 text-sm">
                      {selectedStats.grandTotalConquests}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Conquistas Recentes no Jogo (Aparece de forma limpa se houver) */}
        {achievements.length > 0 && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Conquistas no Modo Carreira (2027+)</h3>
              </div>
              <span className="text-xs text-amber-400 font-mono font-bold">
                {achievements.length} registrada{achievements.length === 1 ? '' : 's'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {achievements.map((ach, idx) => {
                const achDivInfo = getDivisionBadge(ach.division);
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-bold text-xs text-white flex items-center gap-1.5">
                        <span>{ach.titleName}</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
                          {ach.year}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {achDivInfo.label} • {ach.placement}º Lugar
                      </div>
                    </div>
                    <div className="text-right font-mono font-black text-xs text-amber-400">
                      {ach.totalScore.toFixed(1)} pts
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* Ficha Técnica e Dados Oficiais da Agremiação */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                Ficha Cadastral Oficial da Agremiação
              </h3>
            </div>
            {selectedSchool.abbreviation && (
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Sigla: {selectedSchool.abbreviation}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1 sm:col-span-2">
              <span className="text-[10px] text-amber-400 uppercase font-semibold block">
                Razão Social / Denominação Estatutária
              </span>
              <span className="font-bold text-white text-sm block">{getSchoolCorporateName(selectedSchool)}</span>
              <span className="text-[10px] text-slate-400 block font-medium">
                {getSchoolDenominationExtenso(selectedSchool)} ({getSchoolDenomination(selectedSchool)})
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1 sm:col-span-2">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Nome Oficial da Agremiação
              </span>
              <span className="font-bold text-white text-sm block">{cleanSchoolName(selectedSchool)}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <span className="text-[10px] text-amber-400 uppercase font-semibold block">
                Nome Chamado
              </span>
              <span className="font-bold text-amber-300 text-sm block">{selectedSchool.shortName}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Fundação
              </span>
              <span className="font-bold text-white text-sm block">{selectedSchool.foundationDate || selectedSchool.foundationYear}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Bairro / Cidade
              </span>
              <span className="font-bold text-white text-sm block">{selectedSchool.neighborhood}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1 sm:col-span-2">
              <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                <Palette className="w-3 h-3 text-slate-400" />
                Cores Oficiais
              </span>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border shadow-sm"
                  style={{ backgroundColor: selectedSchool.colors.primary, borderColor: selectedSchool.colors.border || '#fff' }}
                />
                <span className="font-bold text-white text-sm">
                  {selectedSchool.colorsDescription || 'Tradicionais'}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1 sm:col-span-2">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                Símbolo Oficial
              </span>
              <span className="font-bold text-white text-sm block">{selectedSchool.symbol}</span>
            </div>
          </div>

          {/* Profissionais / Corpo Técnico */}
          {selectedSchool.staff && (
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Profissionais e Comissão de Carnaval</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60">
                  <div className="text-[9px] text-slate-500 uppercase">Carnavalesco</div>
                  <div className="text-xs font-bold text-white truncate">{selectedSchool.staff.carnavalesco?.name || 'A definir'}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60">
                  <div className="text-[9px] text-slate-500 uppercase">Mestre Bateria</div>
                  <div className="text-xs font-bold text-white truncate">{selectedSchool.staff.mestreBateria?.name || 'A definir'}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60">
                  <div className="text-[9px] text-slate-500 uppercase">Harmonia</div>
                  <div className="text-xs font-bold text-white truncate">{selectedSchool.staff.harmonia?.name || 'A definir'}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60">
                  <div className="text-[9px] text-slate-500 uppercase">1º Casal MS/PB</div>
                  <div className="text-xs font-bold text-white truncate">{selectedSchool.staff.mestreSalaPortaBandeira?.name || 'A definir'}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60">
                  <div className="text-[9px] text-slate-500 uppercase">Intérprete</div>
                  <div className="text-xs font-bold text-white truncate">{selectedSchool.staff.interprete?.name || 'A definir'}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60">
                  <div className="text-[9px] text-slate-500 uppercase">Comissão de Frente</div>
                  <div className="text-xs font-bold text-white truncate">{selectedSchool.staff.coreografo?.name || 'A definir'}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabela Geral do Palmarés Oficial (Limpa, Dinâmica & Filtrável) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>Quadro Geral de Honras (Ranking Histórico Oficial)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Clique em qualquer agremiação para visualizar seu perfil detalhado de glórias.
            </p>
          </div>

          {/* Table Division Filter */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setTableDivisionFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                tableDivisionFilter === 'all'
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Todas as Ativas ({activeSchoolsCount})
            </button>
            <button
              onClick={() => setTableDivisionFilter('especial')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                tableDivisionFilter === 'especial'
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Especial ({espCount})
            </button>
            <button
              onClick={() => setTableDivisionFilter('ouro')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                tableDivisionFilter === 'ouro'
                  ? 'bg-blue-600 text-white font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Ouro ({ouroCount})
            </button>
            <button
              onClick={() => setTableDivisionFilter('prata')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                tableDivisionFilter === 'prata'
                  ? 'bg-slate-300 text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Prata ({prataCount})
            </button>
            <button
              onClick={() => setTableDivisionFilter('bronze')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                tableDivisionFilter === 'bronze'
                  ? 'bg-amber-700 text-amber-100 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Bronze ({bronzeCount})
            </button>
            <button
              onClick={() => setTableDivisionFilter('avaliacao')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                tableDivisionFilter === 'avaliacao'
                  ? 'bg-purple-600 text-white font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Avaliação ({avaliacaoCount})
            </button>
            <button
              onClick={() => setTableDivisionFilter('inativas')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                tableDivisionFilter === 'inativas'
                  ? 'bg-rose-900 text-rose-100 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Inativas ({inativasCount})
            </button>
          </div>
        </div>

        <div className="overflow-x-auto min-w-[700px]">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-2.5 px-3 w-14">Pos</th>
                <th className="py-2.5 px-3">Escola de Samba</th>
                <th className="py-2.5 px-3 text-center">Grupo Atual</th>
                <th className="py-2.5 px-3 text-center text-amber-400 font-bold">Especial</th>
                <th className="py-2.5 px-3 text-center text-blue-400 font-bold">Ouro</th>
                <th className="py-2.5 px-3 text-center text-slate-300 font-bold">Prata</th>
                <th className="py-2.5 px-3 text-center text-amber-500 font-bold">Bronze</th>
                <th className="py-2.5 px-3 text-center text-purple-400 font-bold">Avaliação</th>
                <th className="py-2.5 px-3 text-center text-slate-400">Vices</th>
                <th className="py-2.5 px-3 text-right font-black text-amber-300">TOTAL TÍTULOS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {tableSchools.map((item, idx) => {
                const sch = item.school;
                const stats = item.stats;
                const isSelected = sch.id === selectedSchoolId;
                const divInfo = getDivisionBadge(sch);

                return (
                  <tr
                    key={sch.id}
                    onClick={() => handleSelectSchool(sch.id)}
                    className={`cursor-pointer transition hover:bg-slate-800/60 ${
                      isSelected ? 'bg-amber-500/10 font-bold' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 font-mono text-slate-400">{idx + 1}º</td>
                    <td className="py-2.5 px-3 flex items-center gap-2.5 text-white">
                      <div
                        className="w-4 h-4 rounded-full border flex-shrink-0 shadow-sm"
                        style={{
                          backgroundColor: sch.colors.primary,
                          borderColor: sch.colors.border || '#fff'
                        }}
                      />
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="font-semibold text-xs sm:text-sm truncate">{cleanSchoolName(sch)}</span>
                        {sch.id === userSchool?.id && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase font-black">
                            Sua
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase border ${divInfo.badgeClass}`}>
                        {divInfo.label}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-400">
                      {stats.totalEspecialTitles > 0 ? stats.totalEspecialTitles : <span className="text-slate-600 font-normal">0</span>}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-blue-400">
                      {stats.totalOuroTitles > 0 ? stats.totalOuroTitles : <span className="text-slate-600 font-normal">0</span>}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-300">
                      {stats.totalPrataTitles > 0 ? stats.totalPrataTitles : <span className="text-slate-600 font-normal">0</span>}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-500">
                      {stats.totalBronzeTitles > 0 ? stats.totalBronzeTitles : <span className="text-slate-600 font-normal">0</span>}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-purple-400">
                      {stats.totalAvaliacaoTitles > 0 ? stats.totalAvaliacaoTitles : <span className="text-slate-600 font-normal">0</span>}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono text-slate-400">
                      {stats.grandTotalVices}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-black text-amber-300 text-sm">
                      {stats.grandTotalTitles}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
