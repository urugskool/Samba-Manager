import React, { useState, useMemo, useEffect } from 'react';
import { School, YearHistory } from '../types/carnaval';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import {
  computeCarnavalescosRanking,
  CarnavalescoRankingEntry
} from '../services/carnavalescosRankingService';
import { getLatestCompletedCarnavalYear } from '../services/liesaRankingService';
import {
  X,
  Search,
  Crown,
  Palette,
  ChevronRight,
  Building2,
  User,
  Users,
  Info,
  RotateCcw
} from 'lucide-react';

interface CarnavalescosRankingModalProps {
  isOpen: boolean;
  onClose: () => void;
  schools: School[];
  inGameHistory?: YearHistory[];
  currentYear?: number;
  onSelectSchool?: (schoolId: string) => void;
}

type CategoryFilter = 'individual' | 'all' | 'institutional';
type SortMode = 'titles' | 'solo' | 'recent' | 'name';

export const CarnavalescosRankingModal: React.FC<CarnavalescosRankingModalProps> = ({
  isOpen,
  onClose,
  schools,
  inGameHistory = [],
  currentYear = 2027,
  onSelectSchool
}) => {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('individual');
  const [sortMode, setSortMode] = useState<SortMode>('titles');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const latestCompletedYear = useMemo(
    () => getLatestCompletedCarnavalYear(inGameHistory, currentYear),
    [inGameHistory, currentYear]
  );

  const rankingSummary = useMemo(
    () => computeCarnavalescosRanking(schools, inGameHistory),
    [schools, inGameHistory]
  );

  const individualCount = useMemo(
    () => rankingSummary.entries.filter((e) => e.entryType === 'individual').length,
    [rankingSummary.entries]
  );

  const institutionalCount = useMemo(
    () => rankingSummary.entries.filter((e) => e.entryType === 'institutional').length,
    [rankingSummary.entries]
  );

  const filteredAndSortedEntries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    let list = rankingSummary.entries.filter((entry) => {
      if (categoryFilter === 'individual' && entry.entryType !== 'individual') return false;
      if (categoryFilter === 'institutional' && entry.entryType !== 'institutional') return false;
      if (!q) return true;

      const matchesName = entry.name.toLowerCase().includes(q);
      const matchesSchool = entry.schools.some((s) => s.schoolName.toLowerCase().includes(q));
      const matchesTitleDetail = entry.titles.some(
        (t) =>
          t.year.toString().includes(q) ||
          (t.enredo && t.enredo.toLowerCase().includes(q)) ||
          t.divisionName.toLowerCase().includes(q) ||
          t.organizer.toLowerCase().includes(q)
      );
      return matchesName || matchesSchool || matchesTitleDetail;
    });

    list = [...list].sort((a, b) => {
      if (sortMode === 'solo') {
        if (b.soloTitles !== a.soloTitles) return b.soloTitles - a.soloTitles;
        if (b.totalTitles !== a.totalTitles) return b.totalTitles - a.totalTitles;
        return b.lastYear - a.lastYear;
      }
      if (sortMode === 'recent') {
        if (b.lastYear !== a.lastYear) return b.lastYear - a.lastYear;
        if (b.totalTitles !== a.totalTitles) return b.totalTitles - a.totalTitles;
        return a.name.localeCompare(b.name, 'pt-BR');
      }
      if (sortMode === 'name') {
        return a.name.localeCompare(b.name, 'pt-BR');
      }
      // Default: 'titles'
      if (b.totalTitles !== a.totalTitles) return b.totalTitles - a.totalTitles;
      if (b.soloTitles !== a.soloTitles) return b.soloTitles - a.soloTitles;
      if (b.lastYear !== a.lastYear) return b.lastYear - a.lastYear;
      return a.name.localeCompare(b.name, 'pt-BR');
    });

    return list;
  }, [rankingSummary.entries, categoryFilter, searchQuery, sortMode]);

  // Calcula posição real considerando empates quando ordenado por títulos
  const computedDisplayPositions = useMemo(() => {
    const posMap = new Map<string, number>();
    let currentRank = 1;
    filteredAndSortedEntries.forEach((entry, idx) => {
      if (idx > 0 && sortMode === 'titles') {
        const prev = filteredAndSortedEntries[idx - 1];
        if (entry.totalTitles === prev.totalTitles) {
          posMap.set(entry.canonicalKey, posMap.get(prev.canonicalKey) || currentRank);
          return;
        }
      }
      if (idx > 0 && sortMode === 'solo') {
        const prev = filteredAndSortedEntries[idx - 1];
        if (entry.soloTitles === prev.soloTitles) {
          posMap.set(entry.canonicalKey, posMap.get(prev.canonicalKey) || currentRank);
          return;
        }
      }
      currentRank = idx + 1;
      posMap.set(entry.canonicalKey, currentRank);
    });
    return posMap;
  }, [filteredAndSortedEntries, sortMode]);

  if (!isOpen) return null;

  const resetFilters = () => {
    setCategoryFilter('individual');
    setSortMode('titles');
    setSearchQuery('');
  };

  const handleSchoolNavigate = (schoolId: string, schoolName: string) => {
    if (!onSelectSchool) return;
    const match =
      schools.find((s) => s.id === schoolId) ||
      schools.find((s) => cleanSchoolName(s).toLowerCase() === schoolName.toLowerCase());
    if (match) {
      onClose();
      onSelectSchool(match.id);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-purple-300">
              <Palette className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Palmarés da 1ª Divisão • 1932–{latestCompletedYear}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white mt-0.5 truncate">
              Ranking Histórico de Carnavalescos Campeões
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar Ranking de Carnavalescos"
            className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* KPI Summary Strip + Section Tabs */}
        <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 space-y-3 shrink-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Recordista Histórico
              </div>
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <span className="text-sm font-black text-white truncate">
                  {rankingSummary.leader?.name || 'Joãosinho Trinta'}
                </span>
                <span className="text-sm font-black font-mono tabular-nums text-amber-400 shrink-0">
                  {rankingSummary.leader?.totalTitles || 9}x
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Carnavalescos Campeões
              </div>
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <span className="text-sm font-black font-mono tabular-nums text-white">
                  {individualCount}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  + {institutionalCount} entidades/direções
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Edições & Títulos Catalogados
              </div>
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <span className="text-sm font-black font-mono tabular-nums text-white">
                  {rankingSummary.totalCatalogedEditions} anos
                </span>
                <span className="text-[11px] font-mono tabular-nums text-slate-400">
                  {rankingSummary.totalChampionRecords} faixas de campeã
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Nomenclatura & Liga Atual
              </div>
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <span className="text-sm font-black text-amber-300 truncate">
                  Grupo Especial
                </span>
                <span className="text-[11px] font-mono text-slate-400 shrink-0">
                  LIESA (1990–{latestCompletedYear})
                </span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>Clique em qualquer linha para ver escolas, enredos e parcerias</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <>
              {/* Filter & Search Toolbar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Category Filter */}
                  <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setCategoryFilter('individual')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                        categoryFilter === 'individual'
                          ? 'bg-purple-500/20 text-purple-200 border border-purple-500/40'
                          : 'text-slate-400 hover:text-white border border-transparent'
                      }`}
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Carnavalescos ({individualCount})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCategoryFilter('institutional')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                        categoryFilter === 'institutional'
                          ? 'bg-purple-500/20 text-purple-200 border border-purple-500/40'
                          : 'text-slate-400 hover:text-white border border-transparent'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Direções / Entidades ({institutionalCount})</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCategoryFilter('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                        categoryFilter === 'all'
                          ? 'bg-purple-500/20 text-purple-200 border border-purple-500/40'
                          : 'text-slate-400 hover:text-white border border-transparent'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Todos ({rankingSummary.entries.length})</span>
                    </button>
                  </div>

                  {/* Sort Control */}
                  <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800">
                    {(
                      [
                        { id: 'titles', label: 'Mais Títulos' },
                        { id: 'solo', label: 'Solo' },
                        { id: 'recent', label: 'Mais Recente' },
                        { id: 'name', label: 'A–Z' }
                      ] as { id: SortMode; label: string }[]
                    ).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSortMode(opt.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition whitespace-nowrap shrink-0 cursor-pointer ${
                          sortMode === opt.id
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Box */}
                <div className="relative w-full lg:w-72 shrink-0">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar nome, escola, enredo ou ano..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500/60 rounded-xl pl-8 pr-8 py-2 text-xs text-white placeholder-slate-500 outline-none transition"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Limpar busca"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Main Table */}
              {filteredAndSortedEntries.length === 0 ? (
                <div className="p-10 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
                  <p className="text-sm font-bold text-slate-300">
                    Nenhum carnavalesco encontrado para os filtros aplicados.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Limpar filtros</span>
                  </button>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-900 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          <th className="py-3 px-4 w-16 text-center">Pos.</th>
                          <th className="py-3 px-4">Carnavalesco / Comissão</th>
                          <th className="py-3 px-4 hidden md:table-cell">Escolas Campeãs</th>
                          <th className="py-3 px-3 text-center w-20">Solo</th>
                          <th className="py-3 px-3 text-center w-24">Dupla / Com.</th>
                          <th className="py-3 px-3 text-center w-28">Período</th>
                          <th className="py-3 px-4 text-right w-24">Títulos</th>
                          <th className="py-3 px-3 w-10"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/70">
                        {filteredAndSortedEntries.map((entry: CarnavalescoRankingEntry) => {
                          const displayPos = computedDisplayPositions.get(entry.canonicalKey) || entry.position;
                          const isExpanded = expandedKey === entry.canonicalKey;
                          const isTop3 = sortMode === 'titles' && displayPos <= 3 && entry.entryType === 'individual';

                          return (
                            <React.Fragment key={entry.canonicalKey}>
                              <tr
                                onClick={() =>
                                  setExpandedKey((prev) =>
                                    prev === entry.canonicalKey ? null : entry.canonicalKey
                                  )
                                }
                                className={`hover:bg-slate-900/70 transition cursor-pointer ${
                                  isExpanded ? 'bg-slate-900/80' : ''
                                }`}
                              >
                                <td className="py-3 px-4 text-center font-mono tabular-nums font-black">
                                  {isTop3 ? (
                                    <span
                                      className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs border ${
                                        displayPos === 1
                                          ? 'bg-amber-500/20 text-amber-300 border-amber-400/50'
                                          : displayPos === 2
                                          ? 'bg-slate-300/20 text-slate-200 border-slate-400/40'
                                          : 'bg-amber-700/25 text-amber-400 border-amber-600/40'
                                      }`}
                                    >
                                      {displayPos}º
                                    </span>
                                  ) : (
                                    <span className="text-slate-400">{displayPos}º</span>
                                  )}
                                </td>

                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-bold text-white text-sm">
                                      {entry.name}
                                    </span>
                                    {entry.entryType === 'institutional' && (
                                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                        Entidade / Direção
                                      </span>
                                    )}
                                  </div>
                                  <div className="md:hidden text-[11px] text-slate-400 mt-0.5">
                                    {entry.schools
                                      .map((s) => (s.count > 1 ? `${s.schoolName} (${s.count}x)` : s.schoolName))
                                      .join(', ')}
                                  </div>
                                </td>

                                <td className="py-3 px-4 hidden md:table-cell text-slate-300">
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    {entry.schools.map((s) => (
                                      <span
                                        key={`${entry.canonicalKey}-${s.schoolName}`}
                                        className="inline-flex items-center gap-1.5 text-[11px] text-slate-200 bg-slate-900 border border-slate-800 rounded-md px-2 py-0.5"
                                      >
                                        {s.colors?.primary && (
                                          <span
                                            className="w-2 h-2 rounded-full shrink-0"
                                            style={{ backgroundColor: s.colors.primary }}
                                          />
                                        )}
                                        <span>{s.schoolName}</span>
                                        {s.count > 1 && (
                                          <span className="font-mono tabular-nums text-amber-300 font-bold">
                                            {s.count}x
                                          </span>
                                        )}
                                      </span>
                                    ))}
                                  </div>
                                </td>

                                <td className="py-3 px-3 text-center font-mono tabular-nums text-slate-200 font-semibold">
                                  {entry.soloTitles}
                                </td>

                                <td className="py-3 px-3 text-center font-mono tabular-nums text-slate-400 font-semibold">
                                  {entry.sharedTitles}
                                </td>

                                <td className="py-3 px-3 text-center font-mono tabular-nums text-slate-400 whitespace-nowrap">
                                  {entry.firstYear === entry.lastYear
                                    ? entry.firstYear
                                    : `${entry.firstYear}–${entry.lastYear}`}
                                </td>

                                <td className="py-3 px-4 text-right">
                                  <span className="inline-flex items-center gap-1 font-mono tabular-nums font-black text-sm text-amber-300">
                                    {displayPos === 1 && sortMode === 'titles' && entry.entryType === 'individual' && (
                                      <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                    )}
                                    {entry.totalTitles}
                                  </span>
                                </td>

                                <td className="py-3 px-3 text-right">
                                  <ChevronRight
                                    className={`w-4 h-4 text-slate-500 transition-transform ${
                                      isExpanded ? 'rotate-90 text-amber-400' : ''
                                    }`}
                                  />
                                </td>
                              </tr>

                              {isExpanded && (
                                <tr className="bg-slate-900/50">
                                  <td colSpan={8} className="p-4 border-t border-slate-800">
                                    <div className="space-y-2">
                                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                                        Conquistas de {entry.name} ({entry.totalTitles}{' '}
                                        {entry.totalTitles === 1 ? 'título' : 'títulos'})
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {entry.titles.map((title, tIdx) => (
                                          <div
                                            key={`${entry.canonicalKey}-${title.year}-${title.schoolId}-${tIdx}`}
                                            className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3"
                                          >
                                            <div className="space-y-1 min-w-0">
                                              <div className="flex flex-wrap items-center gap-2">
                                                <span className="font-mono tabular-nums font-black text-amber-300 text-xs">
                                                  {title.year}
                                                </span>
                                                <button
                                                  type="button"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSchoolNavigate(title.schoolId, title.schoolName);
                                                  }}
                                                  className={`font-bold text-white text-xs text-left ${
                                                    onSelectSchool
                                                      ? 'hover:text-amber-300 underline decoration-dotted cursor-pointer'
                                                      : ''
                                                  }`}
                                                >
                                                  {title.schoolName}
                                                </button>
                                                {title.isInGame && (
                                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                                    Simulação
                                                  </span>
                                                )}
                                              </div>

                                              {title.enredo && (
                                                <div className="text-[11px] text-slate-300 italic truncate" title={title.enredo}>
                                                  "{title.enredo}"
                                                </div>
                                              )}

                                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400">
                                                <span>
                                                  {title.divisionName} ({title.organizer})
                                                  {title.leagueOrRound &&
                                                  title.leagueOrRound !== title.organizer
                                                    ? ` • ${title.leagueOrRound}`
                                                    : ''}
                                                </span>
                                                <span>•</span>
                                                <span>
                                                  {title.isSolo
                                                    ? 'Título solo'
                                                    : `Com: ${title.coCreators.join(', ')}`}
                                                </span>
                                              </div>

                                              {title.note && (
                                                <div className="text-[10px] text-slate-400 pt-0.5">
                                                  {title.note}
                                                </div>
                                              )}
                                            </div>
                                          </div>
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
              )}

              {/* Methodological Note */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="font-bold text-slate-300">Critérios de Contabilização Histórica</div>
                <p>
                  • Em títulos conquistados em dupla ou comissão de carnaval, cada carnavalesco integrante recebe 1 título na soma total, com discriminação clara entre conquistas <strong>Solo</strong> e <strong>Dupla / Comissão</strong>.
                </p>
                <p>
                  • Edições sem julgamento oficial (<strong>1938</strong> e <strong>1952</strong> por chuvas torrenciais) e sem desfile (<strong>2021</strong> pela pandemia de COVID-19) não geram títulos. Em <strong>1984</strong>, a dobradinha da Mangueira (Segunda-Feira e Supercampeonato) conta como 1 conquista da edição para Max Lopes. Os títulos de <strong>1934 (A Hora)</strong> e <strong>1950 (UGESB)</strong> não possuem carnavalescos registrados nos arquivos históricos e não são atribuídos artificialmente.
                </p>
              </div>
          </>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 text-xs text-slate-400 shrink-0">
          <span className="text-[11px]">
            Acervo histórico 1932–2026 integrado às temporadas simuladas a partir de 2027.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition cursor-pointer whitespace-nowrap shrink-0"
          >
            Fechar Ranking
          </button>
        </div>
      </div>
    </div>
  );
};
