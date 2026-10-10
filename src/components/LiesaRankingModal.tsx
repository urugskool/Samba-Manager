import React, { useState, useMemo } from 'react';
import { School, YearHistory } from '../types/carnaval';
import {
  computeLiesa5YearRanking,
  computeHistoricalLiesaRanking,
  getHistoricalCarnavalsList,
  LIESA_POINTS_BY_RANK,
  LiesaRankingEntry,
  HistoricalLiesaEntry,
  HistoricalCarnavalInfo
} from '../services/liesaRankingService';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import {
  Trophy,
  Award,
  Crown,
  Medal,
  Calendar,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  Search,
  History,
  TrendingUp,
  HelpCircle,
  ExternalLink,
  AlertTriangle,
  Flame,
  CheckCircle2
} from 'lucide-react';

interface LiesaRankingModalProps {
  isOpen: boolean;
  onClose: () => void;
  schools: School[];
  inGameHistory?: YearHistory[];
  currentYear: number;
  userSchool?: School | null;
  onSelectSchool?: (schoolId: string) => void;
}

export const LiesaRankingModal: React.FC<LiesaRankingModalProps> = ({
  isOpen,
  onClose,
  schools,
  inGameHistory = [],
  currentYear,
  userSchool,
  onSelectSchool
}) => {
  const [rankingMode, setRankingMode] = useState<'quinquennio' | 'historico' | 'carnavais_passados'>('quinquennio');
  const [selectedPastYear, setSelectedPastYear] = useState<number>(2020);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSchoolId, setExpandedSchoolId] = useState<string | null>(null);
  const [expandedHistSchoolId, setExpandedHistSchoolId] = useState<string | null>(null);
  const [showRegulamento, setShowRegulamento] = useState(false);

  // Calcula ranking dos últimos 5 carnavais
  const liesa5YearData = useMemo(() => {
    return computeLiesa5YearRanking(schools, inGameHistory, currentYear);
  }, [schools, inGameHistory, currentYear]);

  // Calcula ranking histórico geral
  const historicalLiesaData = useMemo(() => {
    return computeHistoricalLiesaRanking(schools, inGameHistory);
  }, [schools, inGameHistory]);

  // Lista dos carnavais catalogados (2015 em diante + save)
  const historicalCarnavals = useMemo(() => {
    return getHistoricalCarnavalsList(inGameHistory);
  }, [inGameHistory]);

  const currentPastCarnaval = useMemo(() => {
    return historicalCarnavals.find((c) => c.year === selectedPastYear) || historicalCarnavals[0];
  }, [historicalCarnavals, selectedPastYear]);

  const filtered5YearEntries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return liesa5YearData.entries;
    return liesa5YearData.entries.filter(
      (e) =>
        e.schoolName.toLowerCase().includes(q) ||
        (e.school?.shortName && e.school.shortName.toLowerCase().includes(q))
    );
  }, [liesa5YearData.entries, searchQuery]);

  const filteredHistoricalEntries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return historicalLiesaData;
    return historicalLiesaData.filter(
      (e) =>
        e.schoolName.toLowerCase().includes(q) ||
        (e.school?.shortName && e.school.shortName.toLowerCase().includes(q))
    );
  }, [historicalLiesaData, searchQuery]);

  const filteredPastCarnavalStandings = useMemo(() => {
    if (!currentPastCarnaval) return [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return currentPastCarnaval.standings;
    return currentPastCarnaval.standings.filter((st) =>
      st.schoolName.toLowerCase().includes(q)
    );
  }, [currentPastCarnaval, searchQuery]);

  if (!isOpen) return null;

  const toggleExpand = (schoolId: string) => {
    setExpandedSchoolId((prev) => (prev === schoolId ? null : schoolId));
  };

  const toggleHistExpand = (schoolId: string) => {
    setExpandedHistSchoolId((prev) => (prev === schoolId ? null : schoolId));
  };

  const getPositionBadge = (pos: number) => {
    if (pos === 1) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/50 font-black text-xs shadow-sm">
          <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          1º LÍDER
        </span>
      );
    }
    if (pos === 2) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-300/20 text-slate-200 border border-slate-300/40 font-bold text-xs">
          <Medal className="w-3 h-3 text-slate-300" />
          2º
        </span>
      );
    }
    if (pos === 3) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-700/20 text-amber-400 border border-amber-600/40 font-bold text-xs">
          <Medal className="w-3 h-3 text-amber-500" />
          3º
        </span>
      );
    }
    if (pos <= 6) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold text-xs">
          {pos}º (G6)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-slate-800 text-slate-400 font-mono text-xs">
        {pos}º
      </span>
    );
  };

  const getPastRankBadge = (rank: number, total: number, isHorsConcours?: boolean, year?: number) => {
    if (isHorsConcours || rank === 0) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold text-xs shadow-sm">
          Hors concours
        </span>
      );
    }
    if (rank === 1) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/50 font-black text-xs shadow-sm">
          <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          1º CAMPEÃ
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-300/20 text-slate-200 border border-slate-300/40 font-bold text-xs">
          <Medal className="w-3 h-3 text-slate-300" />
          2º VICE
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-700/20 text-amber-400 border border-amber-600/40 font-bold text-xs">
          <Medal className="w-3 h-3 text-amber-500" />
          3º LUGAR
        </span>
      );
    }
    if (rank <= 6) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold text-xs">
          {rank}º (G6)
        </span>
      );
    }
    if (rank <= 10) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-blue-500/15 text-blue-300 border border-blue-500/30 font-mono text-xs">
          {rank}º (Top 10)
        </span>
      );
    }
    if (year === 2011) {
      // Em 2011 não houve rebaixamento
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-slate-800 text-slate-400 font-mono text-xs">
          {rank}º
        </span>
      );
    }
    if (year === 2012 && rank === 12) {
      // Em 2012 duas escolas foram rebaixadas (Porto da Pedra 12º e Renascer 13º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (rank === total) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs">
          {rank}º (Rebaixada)
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
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  LIESA OFICIAL
                </span>
                <span className="text-xs text-slate-400">
                  Liga Independente das Escolas de Samba do Rio de Janeiro
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5 flex items-center gap-2">
                Ranking Oficial da LIESA
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => setShowRegulamento(!showRegulamento)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
              title="Regulamento Oficial da LIESA"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Regulamento</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Regulamento Accordion Dropdown */}
        {showRegulamento && (
          <div className="p-4 bg-slate-950/90 border-b border-amber-500/30 text-xs text-slate-300 space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <Info className="w-4 h-4 text-amber-400" />
              <span>Critérios Oficiais do Ranking LIESA (Extraído do Regulamento da Liga):</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Com o objetivo de oferecer ao público e à mídia um desfile competitivo e alto nível artístico, a <strong>LIESA</strong> mantém um ranking para estimular as Escolas de Samba a apresentarem um trabalho cada vez melhor. As dez primeiras colocadas do desfile recebem pontuação e o somatório abrange os <strong>cinco últimos carnavais</strong>.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 font-mono text-[11px]">
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-amber-400 font-bold block">1º lugar</span> 20 pontos
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-slate-300 font-bold block">2º lugar</span> 15 pontos
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-amber-600 font-bold block">3º lugar</span> 12 pontos
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-blue-400 font-bold block">4º lugar</span> 10 pontos
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-emerald-400 font-bold block">5º lugar</span> 8 pontos
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-purple-400 font-bold block">6º lugar</span> 6 pontos
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-pink-400 font-bold block">7º lugar</span> 4 pontos
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-yellow-400 font-bold block">8º lugar</span> 3 pontos
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-teal-400 font-bold block">9º lugar</span> 2 pontos
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-slate-400 font-bold block">10º lugar</span> 1 ponto
              </div>
            </div>
            <p className="text-[11px] text-slate-400 italic">
              * Escolas que ficam em 11º lugar em diante recebem 0 pontos. Anos sem desfiles oficiais (como 2021) contam com zero pontos. O ranking atualiza-se automaticamente a cada nova apuração finalizada no save.
            </p>
          </div>
        )}

        {/* Sub-Header: Mode Switcher & Search */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-2xl border border-slate-800 self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setRankingMode('quinquennio')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                rankingMode === 'quinquennio'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Últimos 5 Carnavais ({liesa5YearData.yearsWindow[0]} - {liesa5YearData.yearsWindow[liesa5YearData.yearsWindow.length - 1]})</span>
            </button>
            <button
              onClick={() => setRankingMode('historico')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                rankingMode === 'historico'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Ranking Histórico Geral</span>
            </button>
            <button
              onClick={() => setRankingMode('carnavais_passados')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                rankingMode === 'carnavais_passados'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Carnavais Passados (2010-2026)</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar agremiação..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          {rankingMode === 'quinquennio' ? (
            /* TABELA DOS ÚLTIMOS 5 ANOS */
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>
                  Mostrando classificação acumulada da janela móvel ({liesa5YearData.yearsWindow.join(' · ')}):
                </span>
                <span className="font-bold text-amber-400">
                  {filtered5YearEntries.length} agremiações pontuadas
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60 shadow-xl">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] bg-slate-900/90">
                      <th className="py-3 px-3.5 w-16">Pos</th>
                      <th className="py-3 px-3.5">Escola de Samba</th>
                      {liesa5YearData.yearsWindow.map((yr) => (
                        <th key={yr} className="py-3 px-2.5 text-center font-mono">
                          {yr}
                        </th>
                      ))}
                      <th className="py-3 px-3 text-center text-amber-300 font-bold">Títulos</th>
                      <th className="py-3 px-3 text-center text-slate-300 font-bold">Vices</th>
                      <th className="py-3 px-4 text-right font-black text-amber-400 text-xs">
                        TOTAL PONTOS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filtered5YearEntries.map((entry) => {
                      const isUser = userSchool && (userSchool.id === entry.schoolId || userSchool.name === entry.schoolName);
                      const isExpanded = expandedSchoolId === entry.schoolId;
                      const sch = entry.school;

                      return (
                        <React.Fragment key={entry.schoolId}>
                          <tr
                            onClick={() => toggleExpand(entry.schoolId)}
                            className={`cursor-pointer transition hover:bg-slate-800/50 ${
                              isUser ? 'bg-emerald-500/10 font-bold' : ''
                            } ${entry.position === 1 ? 'bg-amber-500/10' : ''}`}
                          >
                            <td className="py-3 px-3.5 font-mono">
                              {getPositionBadge(entry.position)}
                            </td>
                            <td className="py-3 px-3.5 text-white">
                              <div className="flex items-center gap-2.5">
                                {sch && (
                                  <div
                                    className="w-4 h-4 rounded-full border shrink-0 shadow-sm"
                                    style={{
                                      backgroundColor: sch.colors.primary,
                                      borderColor: sch.colors.border || '#fff'
                                    }}
                                  />
                                )}
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-black text-xs sm:text-sm truncate">
                                      {entry.schoolName}
                                    </span>
                                    {isUser && (
                                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase font-black">
                                        Sua
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-slate-400 block truncate">
                                    {sch?.nickname || 'Agremiação do Carnaval Carioca'}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Detalhes por ano na janela */}
                            {liesa5YearData.yearsWindow.map((yr) => {
                              const perf = entry.performancesByYear[yr];
                              if (!perf || !perf.participated) {
                                return (
                                  <td key={yr} className="py-3 px-2.5 text-center text-slate-600 font-mono text-[11px]">
                                    —
                                  </td>
                                );
                              }

                              const isChampion = perf.rank === 1;
                              const isVice = perf.rank === 2;
                              const isG6 = perf.rank && perf.rank <= 6;

                              return (
                                <td key={yr} className="py-3 px-2.5 text-center">
                                  <div className="inline-flex flex-col items-center">
                                    <span
                                      className={`text-[11px] font-bold font-mono px-1.5 py-0.5 rounded ${
                                        isChampion
                                          ? 'bg-amber-400 text-slate-950 font-black ring-1 ring-amber-300'
                                          : isVice
                                          ? 'bg-slate-300 text-slate-950 font-black'
                                          : isG6
                                          ? 'bg-emerald-500/20 text-emerald-300'
                                          : perf.points > 0
                                          ? 'bg-slate-800 text-slate-300'
                                          : 'text-slate-500'
                                      }`}
                                    >
                                      {perf.rank ? `${perf.rank}º` : '—'}
                                    </span>
                                    <span className="text-[9px] text-slate-400 font-mono">
                                      {perf.points > 0 ? `+${perf.points}p` : '0p'}
                                    </span>
                                  </div>
                                </td>
                              );
                            })}

                            <td className="py-3 px-3 text-center font-mono font-bold text-amber-300">
                              {entry.titlesInWindow > 0 ? entry.titlesInWindow : <span className="text-slate-600 font-normal">0</span>}
                            </td>
                            <td className="py-3 px-3 text-center font-mono font-bold text-slate-300">
                              {entry.vicesInWindow > 0 ? entry.vicesInWindow : <span className="text-slate-600 font-normal">0</span>}
                            </td>
                            <td className="py-3 px-4 text-right font-mono font-black text-amber-400 text-base">
                              {entry.totalPoints} <span className="text-xs text-slate-400 font-sans font-normal">pts</span>
                            </td>
                          </tr>

                          {/* Expanded breakdown row */}
                          {isExpanded && (
                            <tr className="bg-slate-900/90 border-b border-slate-800">
                              <td colSpan={liesa5YearData.yearsWindow.length + 5} className="p-4">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-[11px] font-bold text-amber-300">
                                    <span>
                                      Detalhamento do Desempenho de {entry.schoolName} na Janela de 5 Anos:
                                    </span>
                                    {onSelectSchool && entry.school && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          onSelectSchool(entry.schoolId);
                                          onClose();
                                        }}
                                        className="text-[10px] text-amber-400 hover:text-amber-300 underline flex items-center gap-1 cursor-pointer"
                                      >
                                        <span>Abrir Perfil de Glórias</span>
                                        <ExternalLink className="w-3 h-3" />
                                      </button>
                                    )}
                                  </div>
                                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px]">
                                    {liesa5YearData.yearsWindow.map((yr) => {
                                      const perf = entry.performancesByYear[yr];
                                      return (
                                        <div
                                          key={yr}
                                          className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1"
                                        >
                                          <div className="flex items-center justify-between text-slate-400 text-[10px]">
                                            <span>Carnaval {yr}</span>
                                            <span className="font-mono font-bold text-amber-400">
                                              {perf?.points || 0} pts
                                            </span>
                                          </div>
                                          <div className="font-bold text-white text-xs">
                                            {perf?.rank ? `${perf.rank}º Lugar` : 'Não disputou Especial'}
                                          </div>
                                          <div className="text-[10px] text-slate-500">
                                            {perf?.rank === 1
                                              ? '🏆 Grande Campeã'
                                              : perf?.rank === 2
                                              ? '🥈 Vice-Campeã'
                                              : perf?.rank && perf.rank <= 6
                                              ? '🌟 Desfile das Campeãs (G6)'
                                              : perf?.rank && perf.rank <= 10
                                              ? 'Pontuou no Top 10'
                                              : 'Sem pontos'}
                                          </div>
                                        </div>
                                      );
                                    })}
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
          ) : rankingMode === 'historico' ? (
            /* TABELA DO RANKING HISTÓRICO GERAL */
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200/90 leading-relaxed">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300">Classificação Histórica Oficial da LIESA:</span>{' '}
                  Atribui 20 pontos por título e 15 pontos por vice-campeonato na história do Grupo Especial, somados às colocações completas de 1º a 10º lugar para todos os carnavais catalogados com apuração completa (de 2010 em diante). Clique em qualquer agremiação para ver o histórico ano a ano.
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>
                  Mostrando ranking cumulativo de todas as agremiações:
                </span>
                <span className="font-bold text-amber-400">
                  {filteredHistoricalEntries.length} agremiações registradas
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60 shadow-xl">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] bg-slate-900/90">
                      <th className="py-3 px-3.5 w-16">Pos</th>
                      <th className="py-3 px-3.5">Escola de Samba</th>
                      <th className="py-3 px-3 text-center text-amber-400 font-bold">Títulos Especial (20p)</th>
                      <th className="py-3 px-3 text-center text-slate-300 font-bold">Vices Especial (15p)</th>
                      <th className="py-3 px-3 text-center text-blue-400 font-bold">Era 2010+ (Top 10)</th>
                      <th className="py-3 px-4 text-right font-black text-amber-400 text-xs">
                        TOTAL PONTOS HISTÓRICOS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredHistoricalEntries.map((entry) => {
                      const isUser = userSchool && (userSchool.id === entry.schoolId || userSchool.name === entry.schoolName);
                      const isExpanded = expandedHistSchoolId === entry.schoolId;
                      const sch = entry.school;

                      return (
                        <React.Fragment key={entry.schoolId}>
                          <tr
                            onClick={() => toggleHistExpand(entry.schoolId)}
                            className={`cursor-pointer transition hover:bg-slate-800/50 ${
                              isUser ? 'bg-emerald-500/10 font-bold' : ''
                            } ${entry.position === 1 ? 'bg-amber-500/10' : ''}`}
                          >
                            <td className="py-3 px-3.5 font-mono">
                              {getPositionBadge(entry.position)}
                            </td>
                            <td className="py-3 px-3.5 text-white">
                              <div className="flex items-center gap-2.5">
                                {sch && (
                                  <div
                                    className="w-4 h-4 rounded-full border shrink-0 shadow-sm"
                                    style={{
                                      backgroundColor: sch.colors.primary,
                                      borderColor: sch.colors.border || '#fff'
                                    }}
                                  />
                                )}
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-black text-xs sm:text-sm truncate">
                                      {entry.schoolName}
                                    </span>
                                    {isUser && (
                                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase font-black">
                                        Sua
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-slate-400 block truncate">
                                    {sch?.nickname || 'Agremiação Histórica'}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-center font-mono font-bold text-amber-400">
                              {entry.totalEspecialTitles > 0 ? (
                                <span>
                                  {entry.totalEspecialTitles}{' '}
                                  <span className="text-[10px] text-slate-500">
                                    ({entry.totalEspecialTitles * 20}p)
                                  </span>
                                </span>
                              ) : (
                                <span className="text-slate-600 font-normal">0</span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-center font-mono font-bold text-slate-300">
                              {entry.totalEspecialVices > 0 ? (
                                <span>
                                  {entry.totalEspecialVices}{' '}
                                  <span className="text-[10px] text-slate-500">
                                    ({entry.totalEspecialVices * 15}p)
                                  </span>
                                </span>
                              ) : (
                                <span className="text-slate-600 font-normal">0</span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-center font-mono font-bold text-blue-400">
                              {entry.pointsDetailedEra > 0 ? (
                                <span>+{entry.pointsDetailedEra}p</span>
                              ) : (
                                <span className="text-slate-600 font-normal">0</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-right font-mono font-black text-amber-400 text-base">
                              {entry.totalPoints}{' '}
                              <span className="text-xs text-slate-400 font-sans font-normal">pts</span>
                            </td>
                          </tr>

                          {/* Historical Detailed Breakdown Row */}
                          {isExpanded && (
                            <tr className="bg-slate-900/95 border-b border-slate-800">
                              <td colSpan={6} className="p-4 sm:p-5">
                                <div className="space-y-3">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                                    <div>
                                      <h4 className="font-black text-sm text-white flex items-center gap-2">
                                        <span>Desempenho Histórico Detalhado: {entry.schoolName}</span>
                                      </h4>
                                      <p className="text-[11px] text-slate-400">
                                        {entry.totalEspecialTitles} Título(s) ({entry.totalEspecialTitles * 20}p) · {entry.totalEspecialVices} Vice(s) ({entry.totalEspecialVices * 15}p) · Era 2010+: {entry.pointsDetailedEra} pts
                                      </p>
                                    </div>
                                    {onSelectSchool && entry.school && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          onSelectSchool(entry.schoolId);
                                          onClose();
                                        }}
                                        className="text-[11px] text-amber-400 hover:text-amber-300 font-bold underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                                      >
                                        <span>Ver Perfil de Glórias Completo</span>
                                        <ExternalLink className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>

                                  <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                                      Carnavais Catalogados na Era Moderna (2010 em diante):
                                    </span>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                                      {historicalCarnavals.map((c) => {
                                        const perf = entry.performancesDetailed[c.year];
                                        if (c.year === 2021) {
                                          return (
                                            <div
                                              key={c.year}
                                              className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] space-y-0.5"
                                            >
                                              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                                                <span>2021</span>
                                                <span>0p</span>
                                              </div>
                                              <div className="text-[10px] text-slate-400 italic">
                                                Sem Desfile (COVID)
                                              </div>
                                            </div>
                                          );
                                        }

                                        if (!perf || !perf.participated) {
                                          return (
                                            <div
                                              key={c.year}
                                              className="p-2 rounded-xl bg-slate-950/40 border border-slate-800/40 text-[11px] space-y-0.5 opacity-60"
                                            >
                                              <div className="flex items-center justify-between text-[10px] text-slate-600 font-mono">
                                                <span>{c.year}</span>
                                                <span>0p</span>
                                              </div>
                                              <div className="text-[10px] text-slate-500">
                                                Fora do Especial
                                              </div>
                                            </div>
                                          );
                                        }

                                        const isCamp = perf.rank === 1 && !perf.isHorsConcours;
                                        const isVice = perf.rank === 2 && !perf.isHorsConcours;
                                        const isG6 = perf.rank && perf.rank <= 6 && !perf.isHorsConcours;

                                        return (
                                          <div
                                            key={c.year}
                                            className={`p-2 rounded-xl border text-[11px] space-y-0.5 transition ${
                                              perf.isHorsConcours
                                                ? 'bg-purple-950/30 border-purple-500/40 text-purple-200'
                                                : isCamp
                                                ? 'bg-amber-500/15 border-amber-500/40 text-amber-200'
                                                : isVice
                                                ? 'bg-slate-300/15 border-slate-300/40 text-slate-200'
                                                : isG6
                                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                                                : 'bg-slate-950 border-slate-800 text-slate-300'
                                            }`}
                                          >
                                            <div className="flex items-center justify-between text-[10px] font-mono">
                                              <span className="font-bold text-white">{c.year}</span>
                                              <span className="font-bold text-amber-400">
                                                {perf.points > 0 ? `+${perf.points}p` : '0p'}
                                              </span>
                                            </div>
                                            <div className="font-bold text-xs truncate">
                                              {perf.isHorsConcours ? 'Hors concours' : perf.rank ? `${perf.rank}º Lugar` : '—'}
                                            </div>
                                            <div className="text-[9px] text-slate-400 truncate">
                                              {perf.isHorsConcours
                                                ? '🎭 Hors concours'
                                                : isCamp
                                                ? '🏆 Campeã'
                                                : isVice
                                                ? '🥈 Vice'
                                                : isG6
                                                ? '🌟 G6'
                                                : perf.rank && perf.rank <= 10
                                                ? 'Top 10'
                                                : 'Sem pontos'}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
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
          ) : (
            /* TABELA DE CARNAVAIS PASSADOS (RESULTADOS OFICIAIS POR ANO) */
            <div className="space-y-4">
              {/* Barra de seleção rápida de anos */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Selecione o Carnaval Histórico para Consultar:</span>
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {historicalCarnavals.length} edições catalogadas
                  </span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                  {historicalCarnavals.map((carnaval) => {
                    const isSelected = selectedPastYear === carnaval.year;
                    const is2021 = carnaval.year === 2021;
                    const is2017 = carnaval.year === 2017;

                    return (
                      <button
                        key={carnaval.year}
                        onClick={() => setSelectedPastYear(carnaval.year)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition shrink-0 flex items-center gap-1.5 cursor-pointer border ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md shadow-amber-500/20'
                            : is2021
                            ? 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <span>{carnaval.year}</span>
                        {is2021 && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            Sem Desfile
                          </span>
                        )}
                        {is2017 && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            2 Campeãs
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Informações detalhadas do Carnaval Selecionado */}
              {currentPastCarnaval && (
                <div className="space-y-4">
                  {/* Banner do Carnaval */}
                  {currentPastCarnaval.isNoCarnaval ? (
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
                        <AlertTriangle className="w-6 h-6 text-amber-500" />
                      </div>
                      <h3 className="text-lg font-black text-white">
                        Carnaval 2021 — Não Houve Carnaval
                      </h3>
                      <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
                        Em virtude do ápice da pandemia mundial de COVID-19 e das medidas sanitárias vigentes, a LIESA e os órgãos públicos cancelaram os desfiles das escolas de samba no Sambódromo da Marquês de Sapucaí em 2021. Nenhuma agremiação pontuou no Ranking Oficial.
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Banner de destaques */}
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              RESULTADO OFICIAL LIESA
                            </span>
                            <span className="text-xs text-slate-400 font-mono font-bold">
                              Ano {currentPastCarnaval.year}
                            </span>
                          </div>
                          <h3 className="text-lg font-black text-white mt-1">
                            {currentPastCarnaval.championNames.length > 1
                              ? `Campeãs Oficiais: ${currentPastCarnaval.championNames.join(' e ')}`
                              : `Campeã: ${currentPastCarnaval.championNames[0] || 'A Definir'}`}
                          </h3>
                          {currentPastCarnaval.notes && (
                            <p className="text-[11px] text-amber-200/80 mt-1 max-w-2xl leading-relaxed">
                              {currentPastCarnaval.notes}
                            </p>
                          )}
                        </div>

                        {/* Cards de pódio */}
                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          {currentPastCarnaval.championNames.map((champ, idx) => (
                            <div
                              key={idx}
                              className="px-3 py-2 rounded-xl bg-amber-500/15 border border-amber-400/40 text-center"
                            >
                              <span className="text-[9px] uppercase font-black text-amber-400 block">
                                🏆 Campeã (+20p)
                              </span>
                              <span className="text-xs font-black text-white">{champ}</span>
                            </div>
                          ))}
                          {currentPastCarnaval.viceChampionNames.length > 0 && (
                            <div className="px-3 py-2 rounded-xl bg-slate-300/15 border border-slate-300/40 text-center">
                              <span className="text-[9px] uppercase font-black text-slate-300 block">
                                🥈 Vice (+15p)
                              </span>
                              <span className="text-xs font-black text-white">
                                {currentPastCarnaval.viceChampionNames.join(', ')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tabela de Colocação Oficial do Ano */}
                      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60 shadow-xl">
                        <table className="w-full text-xs text-left">
                          <thead>
                            <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] bg-slate-900/90">
                              <th className="py-3 px-3.5 w-16">Colocação</th>
                              <th className="py-3 px-3.5">Escola de Samba</th>
                              <th className="py-3 px-3 text-center text-amber-400 font-bold">Pontos LIESA</th>
                              <th className="py-3 px-4 text-right text-slate-300 font-bold">Status Oficial</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60">
                            {filteredPastCarnavalStandings.map((st) => {
                              const pts = LIESA_POINTS_BY_RANK[st.rank] || 0;
                              const sch = schools.find(
                                (s) => s.id === st.schoolId || s.name === st.schoolName
                              );
                              const isUser = userSchool && (userSchool.id === st.schoolId || userSchool.name === st.schoolName);
                              const totalSchools = currentPastCarnaval.standings.length;

                              return (
                                <tr
                                  key={st.schoolId || st.schoolName}
                                  onClick={() => onSelectSchool && st.schoolId && onSelectSchool(st.schoolId)}
                                  className={`cursor-pointer transition hover:bg-slate-800/50 ${
                                    isUser ? 'bg-emerald-500/10 font-bold' : ''
                                  } ${st.rank === 1 ? 'bg-amber-500/10' : ''}`}
                                >
                                  <td className="py-3 px-3.5 font-mono">
                                    {getPastRankBadge(st.rank, totalSchools, st.isHorsConcours, currentPastCarnaval.year)}
                                  </td>
                                  <td className="py-3 px-3.5 text-white">
                                    <div className="flex items-center gap-2.5">
                                      {sch && (
                                        <div
                                          className="w-4 h-4 rounded-full border shrink-0 shadow-sm"
                                          style={{
                                            backgroundColor: sch.colors.primary,
                                            borderColor: sch.colors.border || '#fff'
                                          }}
                                        />
                                      )}
                                      <div className="min-w-0">
                                        <div className="flex items-center gap-1.5">
                                          <span className="font-black text-xs sm:text-sm truncate">
                                            {st.schoolName}
                                          </span>
                                          {isUser && (
                                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase font-black">
                                              Sua
                                            </span>
                                          )}
                                        </div>
                                        <span className="text-[10px] text-slate-400 block truncate">
                                          {sch?.nickname || 'Agremiação do Carnaval'}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-3 px-3 text-center font-mono font-black text-amber-400 text-sm">
                                    {pts > 0 ? (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-amber-500/15 border border-amber-500/30">
                                        +{pts} pts
                                      </span>
                                    ) : (
                                      <span className="text-slate-600 font-normal">0 pts</span>
                                    )}
                                  </td>
                                  <td className="py-3 px-4 text-right">
                                    {st.isHorsConcours || st.rank === 0 ? (
                                      <span className="text-xs font-bold text-purple-300">
                                        Desfile Hors concours (Incêndio Cidade do Samba)
                                      </span>
                                    ) : st.rank === 1 ? (
                                      <span className="text-xs font-bold text-amber-300">
                                        🏆 Campeã Oficial
                                      </span>
                                    ) : st.rank === 2 ? (
                                      <span className="text-xs font-bold text-slate-300">
                                        🥈 Vice-Campeã
                                      </span>
                                    ) : st.rank === 3 ? (
                                      <span className="text-xs font-bold text-amber-500">
                                        🥉 3º Lugar
                                      </span>
                                    ) : st.rank <= 6 ? (
                                      <span className="text-xs font-bold text-emerald-400">
                                        🌟 Desfile das Campeãs (G6)
                                      </span>
                                    ) : st.rank <= 10 ? (
                                      <span className="text-xs text-blue-300">
                                        🏅 Pontuou no Top 10
                                      </span>
                                    ) : currentPastCarnaval.year === 2011 ? (
                                      <span className="text-xs text-slate-400">
                                        Manteve no Especial (Sem Rebaixamento em 2011)
                                      </span>
                                    ) : currentPastCarnaval.year === 2012 && (st.rank === 12 || st.rank === 13) ? (
                                      <span className="text-xs text-rose-400">
                                        ⚠️ Rebaixada para Acesso / Ouro
                                      </span>
                                    ) : st.rank === totalSchools ? (
                                      <span className="text-xs text-rose-400">
                                        ⚠️ Rebaixada para Ouro
                                      </span>
                                    ) : (
                                      <span className="text-xs text-slate-500">
                                        Manteve no Especial
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              O ranking LIESA estimula o mérito contínuo e a competitividade artística nas passarelas.
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer shadow-md"
          >
            Fechar Ranking
          </button>
        </div>
      </div>
    </div>
  );
};
