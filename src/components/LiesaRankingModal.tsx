import React, { useState, useMemo } from 'react';
import { School, YearHistory } from '../types/carnaval';
import {
  computeLiesa5YearRanking,
  computeHistoricalLiesaRanking,
  LIESA_POINTS_BY_RANK,
  LiesaRankingEntry,
  HistoricalLiesaEntry
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
  ExternalLink
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
  const [rankingMode, setRankingMode] = useState<'quinquennio' | 'historico'>('quinquennio');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSchoolId, setExpandedSchoolId] = useState<string | null>(null);
  const [showRegulamento, setShowRegulamento] = useState(false);

  // Calcula ranking dos últimos 5 carnavais
  const liesa5YearData = useMemo(() => {
    return computeLiesa5YearRanking(schools, inGameHistory, currentYear);
  }, [schools, inGameHistory, currentYear]);

  // Calcula ranking histórico
  const historicalLiesaData = useMemo(() => {
    return computeHistoricalLiesaRanking(schools, inGameHistory);
  }, [schools, inGameHistory]);

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

  if (!isOpen) return null;

  const toggleExpand = (schoolId: string) => {
    setExpandedSchoolId((prev) => (prev === schoolId ? null : schoolId));
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
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-2xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setRankingMode('quinquennio')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
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
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                rankingMode === 'historico'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Ranking Histórico Geral</span>
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
          ) : (
            /* TABELA DO RANKING HISTÓRICO GERAL */
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>
                  Classificação histórica acumulada de todos os carnavais da história sob a pontuação LIESA:
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
                      <th className="py-3 px-3 text-center text-blue-400 font-bold">Era 2022+ (Top 10)</th>
                      <th className="py-3 px-4 text-right font-black text-amber-400 text-xs">
                        TOTAL PONTOS HISTÓRICOS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredHistoricalEntries.map((entry) => {
                      const isUser = userSchool && (userSchool.id === entry.schoolId || userSchool.name === entry.schoolName);
                      const sch = entry.school;

                      // Pontos na era 2022 em diante
                      const pointsRecent = Object.values(entry.performances2022Onward).reduce(
                        (acc, curr) => acc + curr.points,
                        0
                      );

                      return (
                        <tr
                          key={entry.schoolId}
                          onClick={() => onSelectSchool && onSelectSchool(entry.schoolId)}
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
                            {pointsRecent > 0 ? (
                              <span>+{pointsRecent}p</span>
                            ) : (
                              <span className="text-slate-600 font-normal">0</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right font-mono font-black text-amber-400 text-base">
                            {entry.totalPoints}{' '}
                            <span className="text-xs text-slate-400 font-sans font-normal">pts</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
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
