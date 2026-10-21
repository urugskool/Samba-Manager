import React, { useState, useMemo } from 'react';
import { School, YearHistory } from '../types/carnaval';
import {
  computeLiesa5YearRanking,
  computeHistoricalLiesaRanking,
  LiesaRankingEntry,
  HistoricalLiesaEntry,
  LIESA_POINTS_BY_RANK
} from '../services/liesaRankingService';
import {
  Trophy,
  Crown,
  Medal,
  Calendar,
  Search,
  History,
  TrendingUp,
  HelpCircle,
  X,
  ChevronRight,
  ShieldCheck,
  Award,
  Sparkles
} from 'lucide-react';

interface LiesaRankingModalProps {
  isOpen: boolean;
  onClose: () => void;
  schools: School[];
  inGameHistory?: YearHistory[];
  currentYear: number;
  userSchool?: School | null;
  onSelectSchool?: (schoolId: string) => void;
  initialTab?: 'quinquennio' | 'historico';
}

export const LiesaRankingModal: React.FC<LiesaRankingModalProps> = ({
  isOpen,
  onClose,
  schools,
  inGameHistory = [],
  currentYear,
  userSchool,
  onSelectSchool,
  initialTab = 'quinquennio'
}) => {
  const [rankingMode, setRankingMode] = useState<'quinquennio' | 'historico'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSchoolId, setExpandedSchoolId] = useState<string | null>(null);
  const [expandedHistSchoolId, setExpandedHistSchoolId] = useState<string | null>(null);
  const [sortHistoricoBy, setSortHistoricoBy] = useState<'pontos' | 'participacoes'>('pontos');
  const [showRegulamento, setShowRegulamento] = useState(false);

  // Calcula ranking dos últimos 5 carnavais (Janela móvel oficial da LIESA)
  const liesa5YearData = useMemo(() => {
    return computeLiesa5YearRanking(schools, inGameHistory, currentYear);
  }, [schools, inGameHistory, currentYear]);

  // Calcula ranking histórico geral da LIESA
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
    let base = historicalLiesaData;
    if (q) {
      base = base.filter(
        (e) =>
          e.schoolName.toLowerCase().includes(q) ||
          (e.school?.shortName && e.school.shortName.toLowerCase().includes(q))
      );
    }
    if (sortHistoricoBy === 'participacoes') {
      return [...base].sort((a, b) => {
        if (b.totalParticipations !== a.totalParticipations) {
          return b.totalParticipations - a.totalParticipations;
        }
        return b.totalPoints - a.totalPoints;
      });
    }
    return base;
  }, [historicalLiesaData, searchQuery, sortHistoricoBy]);

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
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/50 font-black text-xs shadow-sm">
          <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          1º Líder
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
          {pos}º G6
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
              <Crown className="w-6 h-6" />
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
                Ranking da LIESA
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => setShowRegulamento(!showRegulamento)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5 border border-slate-700 cursor-pointer"
              title="Regulamento Oficial da LIESA"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Regulamento</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Regulamento Accordion Dropdown */}
        {showRegulamento && (
          <div className="p-4 bg-slate-950/90 border-b border-amber-500/30 text-xs text-slate-300 space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Critérios de Pontuação e Regulamento da LIESA:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-slate-300 text-[11px]">
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-amber-400 font-bold block">1º lugar (Campeã)</span> 20 pontos
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-slate-300 font-bold block">2º lugar (Vice)</span> 15 pontos
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-amber-500 font-bold block">3º lugar</span> 12 pontos
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
              * Do 11º lugar em diante: 0 pontos. Desempate: 1º Pontos, 2º Títulos no período, 3º Vices, 4º Colocação no ano mais recente.
            </p>
          </div>
        )}

        {/* Tab Switcher & Search Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-3">
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
              <span>Ranking Histórico da LIESA (1950 a {currentYear || 2026})</span>
            </button>
          </div>

          {/* Search Input & Sort for Histórico */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            {rankingMode === 'historico' && (
              <select
                value={sortHistoricoBy}
                onChange={(e) => setSortHistoricoBy(e.target.value as 'pontos' | 'participacoes')}
                className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-amber-300 font-bold focus:outline-none cursor-pointer"
              >
                <option value="pontos">Ordenar: Pontos Totais</option>
                <option value="participacoes">Ordenar: Mais Temporadas</option>
              </select>
            )}

            <div className="relative w-full md:w-60">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar escola..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 transition"
              />
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar">
          {/* TAB 1: RANKING DOS ÚLTIMOS 5 CARNAVAIS */}
          {rankingMode === 'quinquennio' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
                <span>
                  Janela Oficial LIESA: Carnavais de <strong>{liesa5YearData.yearsWindow.join(', ')}</strong>
                </span>
                <span className="text-amber-300 font-medium">
                  {filtered5YearEntries.length} agremiações ranqueadas
                </span>
              </div>

              {/* Table */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-900/90 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                        <th className="py-3 px-4 w-28">Posição</th>
                        <th className="py-3 px-4">Agremiação</th>
                        <th className="py-3 px-3 text-center">Títulos</th>
                        <th className="py-3 px-3 text-center">Vices</th>
                        <th className="py-3 px-3 text-center hidden md:table-cell">Desempenho por Ano</th>
                        <th className="py-3 px-4 text-center font-bold text-amber-400">Total Pontos</th>
                        <th className="py-3 px-3 text-right w-14"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {filtered5YearEntries.map((entry) => {
                        const isExpanded = expandedSchoolId === entry.schoolId;
                        const isUser = userSchool && userSchool.id === entry.schoolId;

                        return (
                          <React.Fragment key={entry.schoolId}>
                            <tr
                              onClick={() => toggleExpand(entry.schoolId)}
                              className={`hover:bg-slate-800/40 transition cursor-pointer ${
                                isUser ? 'bg-amber-500/10' : ''
                              }`}
                            >
                              <td className="py-2.5 px-4 whitespace-nowrap">
                                {getPositionBadge(entry.position)}
                              </td>
                              <td className="py-2.5 px-4 font-bold text-white">
                                <div className="flex items-center gap-2">
                                  {entry.school?.colors && (
                                    <div
                                      className="w-3 h-3 rounded-full shrink-0 border border-white/20"
                                      style={{ backgroundColor: entry.school.colors.primary }}
                                    />
                                  )}
                                  <span className={isUser ? 'text-amber-300' : ''}>{entry.schoolName}</span>
                                </div>
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-300">
                                {entry.titlesInWindow > 0 ? entry.titlesInWindow : '—'}
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono text-slate-300">
                                {entry.vicesInWindow > 0 ? entry.vicesInWindow : '—'}
                              </td>
                              <td className="py-2.5 px-3 text-center hidden md:table-cell">
                                <div className="flex items-center justify-center gap-1.5">
                                  {entry.yearsCovered.map((yr) => {
                                    const p = entry.performancesByYear[yr];
                                    if (!p || !p.participated) {
                                      return (
                                        <span
                                          key={yr}
                                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-600 border border-slate-800"
                                          title={`${yr}: Não desfilou no Especial`}
                                        >
                                          —
                                        </span>
                                      );
                                    }
                                    return (
                                      <span
                                        key={yr}
                                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                                          p.rank === 1
                                            ? 'bg-amber-500 text-slate-950 font-black'
                                            : p.rank === 2
                                            ? 'bg-slate-300 text-slate-950'
                                            : p.rank && p.rank <= 6
                                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                            : 'bg-slate-900 text-slate-400 border border-slate-800'
                                        }`}
                                        title={`${yr}: ${p.rank ? `${p.rank}º Lugar` : 'Desfilou'} (+${p.points} pts)`}
                                      >
                                        {p.rank ? `${p.rank}º` : 'D'}
                                      </span>
                                    );
                                  })}
                                </div>
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-black text-amber-400 text-sm">
                                {entry.totalPoints}
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
                                <td colSpan={7} className="p-4 border-t border-slate-800 space-y-2">
                                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                                    {entry.yearsCovered.map((yr) => {
                                      const p = entry.performancesByYear[yr];
                                      return (
                                        <div key={yr} className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-center">
                                          <div className="text-[10px] text-slate-400 font-mono">{yr}</div>
                                          <div className="font-bold text-white mt-0.5">
                                            {p && p.participated ? (p.rank ? `${p.rank}º Lugar` : 'Desfilou') : 'Fora do Especial'}
                                          </div>
                                          <div className="text-[11px] font-mono text-amber-300 mt-0.5">
                                            {p ? `+${p.points} pts` : '0 pts'}
                                          </div>
                                        </div>
                                      );
                                    })}
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

          {/* TAB 2: RANKING HISTÓRICO DA LIESA */}
          {rankingMode === 'historico' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
                <span>
                  Pontuação Oficial Histórica acumulada desde 1950 (20 pts campeã, 15 vice, 12 a 1 para colocações detalhadas).
                </span>
                <span className="text-amber-300 font-medium">
                  {filteredHistoricalEntries.length} agremiações catalogadas
                </span>
              </div>

              {/* Table */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-900/90 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                        <th className="py-3 px-4 w-28">Posição</th>
                        <th className="py-3 px-4">Agremiação</th>
                        <th className="py-3 px-3 text-center">Títulos</th>
                        <th className="py-3 px-3 text-center">Vices</th>
                        <th className="py-3 px-3 text-center hidden sm:table-cell">Temporadas</th>
                        <th className="py-3 px-4 text-center font-bold text-amber-400">Total Pontos</th>
                        <th className="py-3 px-3 text-right w-14"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {filteredHistoricalEntries.map((entry) => {
                        const isExpanded = expandedHistSchoolId === entry.schoolId;
                        const isUser = userSchool && userSchool.id === entry.schoolId;

                        return (
                          <React.Fragment key={entry.schoolId}>
                            <tr
                              onClick={() => toggleHistExpand(entry.schoolId)}
                              className={`hover:bg-slate-800/40 transition cursor-pointer ${
                                isUser ? 'bg-amber-500/10' : ''
                              }`}
                            >
                              <td className="py-2.5 px-4 whitespace-nowrap">
                                {getPositionBadge(entry.position)}
                              </td>
                              <td className="py-2.5 px-4 font-bold text-white">
                                <div className="flex items-center gap-2">
                                  {entry.school?.colors && (
                                    <div
                                      className="w-3 h-3 rounded-full shrink-0 border border-white/20"
                                      style={{ backgroundColor: entry.school.colors.primary }}
                                    />
                                  )}
                                  <span className={isUser ? 'text-amber-300' : ''}>{entry.schoolName}</span>
                                </div>
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-300">
                                {entry.totalEspecialTitles > 0 ? entry.totalEspecialTitles : '—'}
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono text-slate-300">
                                {entry.totalEspecialVices > 0 ? entry.totalEspecialVices : '—'}
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono text-slate-400 hidden sm:table-cell">
                                {entry.totalParticipations}
                              </td>
                              <td className="py-2.5 px-4 text-center font-mono font-black text-amber-400 text-sm">
                                {entry.totalPoints}
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
                                <td colSpan={7} className="p-4 border-t border-slate-800 space-y-2">
                                  <div className="flex flex-wrap items-center justify-between text-xs gap-3">
                                    <div className="flex items-center gap-4">
                                      <div>
                                        <span className="text-slate-400">Pontos por Título: </span>
                                        <strong className="text-amber-300 font-bold">{entry.titlePoints} pts</strong>
                                      </div>
                                      <div>
                                        <span className="text-slate-400">Pontos por Vice: </span>
                                        <strong className="text-slate-200 font-bold">{entry.vicePoints} pts</strong>
                                      </div>
                                      <div>
                                        <span className="text-slate-400">Pontos por Colocações: </span>
                                        <strong className="text-emerald-300 font-bold">{entry.totalPoints - entry.titlePoints - entry.vicePoints} pts</strong>
                                      </div>
                                    </div>
                                    <div className="text-[11px] text-slate-400">
                                      {entry.yearsInEspecial.length > 0 && (
                                        <span>Anos no Especial: {entry.yearsInEspecial.slice(0, 10).join(', ')}{entry.yearsInEspecial.length > 10 ? '...' : ''}</span>
                                      )}
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
