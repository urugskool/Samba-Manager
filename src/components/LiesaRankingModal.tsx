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
  Sparkles,
  BookOpen,
  Palette,
  CheckCircle2,
  Building2,
  ExternalLink
} from 'lucide-react';
import {
  cleanSchoolName,
  getSchoolCorporateName,
  getSchoolDenomination
} from '../utils/schoolNameUtils';
import { getHistoricalEnredo } from '../data/historicalEnredosData';

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
              <span>Ranking Histórico da LIESA (1933 a {currentYear || 2026})</span>
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
                              <tr className="bg-slate-900/90 border-t border-slate-800">
                                <td colSpan={7} className="p-4 sm:p-5">
                                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
                                    {/* Header da Ficha do Quinquênio */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-800/80">
                                      <div className="flex items-center gap-3">
                                        {entry.school?.colors ? (
                                          <div
                                            className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white shadow-md border border-white/20 shrink-0"
                                            style={{
                                              background: `linear-gradient(135deg, ${entry.school.colors.primary}, ${entry.school.colors.secondary || entry.school.colors.primary})`
                                            }}
                                          >
                                            <Award className="w-5 h-5 text-white drop-shadow" />
                                          </div>
                                        ) : (
                                          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                                            <Crown className="w-5 h-5" />
                                          </div>
                                        )}
                                        <div>
                                          <div className="flex items-center gap-2 flex-wrap">
                                            <h4 className="font-black text-white text-base sm:text-lg">
                                              {entry.schoolName}
                                            </h4>
                                            {entry.school && (
                                              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                                {entry.school.division === 'especial' ? 'Grupo Especial' : entry.school.division.toUpperCase()}
                                              </span>
                                            )}
                                          </div>
                                          <p className="text-xs text-slate-400 mt-0.5">
                                            {entry.school ? getSchoolCorporateName(entry.school) : entry.schoolName}
                                            {entry.school?.foundationYear ? ` • Fundada em ${entry.school.foundationYear}` : ''}
                                            {entry.school?.neighborhood ? ` • ${entry.school.neighborhood}` : ''}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-2 self-start sm:self-auto">
                                        <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-right">
                                          <span className="text-[10px] text-slate-500 uppercase font-bold block">Pontos no Quinquênio</span>
                                          <span className="text-sm font-black text-amber-400 font-mono">{entry.totalPoints} pts</span>
                                        </div>
                                        {onSelectSchool && entry.schoolId && (
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              onSelectSchool(entry.schoolId);
                                              onClose();
                                            }}
                                            className="px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                                            title="Ver perfil completo da escola"
                                          >
                                            <span>Ver Perfil</span>
                                            <ExternalLink className="w-3.5 h-3.5" />
                                          </button>
                                        )}
                                      </div>
                                    </div>

                                    {/* Resumo do Quinquênio */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
                                        <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                                        <div>
                                          <span className="text-[10px] text-slate-500 block uppercase font-bold">Títulos (5 anos)</span>
                                          <span className="font-black text-amber-300 font-mono">{entry.titlesInWindow}</span>
                                        </div>
                                      </div>
                                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
                                        <Medal className="w-4 h-4 text-slate-300 shrink-0" />
                                        <div>
                                          <span className="text-[10px] text-slate-500 block uppercase font-bold">Vices (5 anos)</span>
                                          <span className="font-black text-slate-200 font-mono">{entry.vicesInWindow}</span>
                                        </div>
                                      </div>
                                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
                                        <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                                        <div>
                                          <span className="text-[10px] text-slate-500 block uppercase font-bold">Posição Geral</span>
                                          <span className="font-black text-emerald-300 font-mono">{entry.position}º Lugar</span>
                                        </div>
                                      </div>
                                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
                                        <Award className="w-4 h-4 text-amber-400 shrink-0" />
                                        <div>
                                          <span className="text-[10px] text-slate-500 block uppercase font-bold">Total LIESA</span>
                                          <span className="font-black text-amber-400 font-mono">{entry.totalPoints} pts</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Grade detalhada dos 5 anos com Resultados, Pontuações e Enredos */}
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                                        <span>Desempenhos Ano a Ano na Janela Oficial ({entry.yearsCovered.join(' • ')})</span>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
                                        {entry.yearsCovered.map((yr) => {
                                          const p = entry.performancesByYear[yr];
                                          const enredo = getHistoricalEnredo(
                                            yr,
                                            entry.schoolId,
                                            entry.schoolName,
                                            entry.school,
                                            inGameHistory
                                          );
                                          const rank = p?.rank;
                                          const pts = p?.points || 0;
                                          const participated = Boolean(p && p.participated);

                                          return (
                                            <div
                                              key={yr}
                                              className={`p-3 rounded-xl border flex flex-col justify-between transition ${
                                                rank === 1
                                                  ? 'bg-amber-500/10 border-amber-500/40 shadow-sm shadow-amber-500/10'
                                                  : rank === 2
                                                  ? 'bg-slate-300/10 border-slate-300/30'
                                                  : rank && rank <= 6
                                                  ? 'bg-emerald-500/10 border-emerald-500/30'
                                                  : participated
                                                  ? 'bg-slate-900 border-slate-800'
                                                  : 'bg-slate-950/60 border-slate-800/60 opacity-60'
                                              }`}
                                            >
                                              <div>
                                                <div className="flex items-center justify-between gap-1 mb-1.5">
                                                  <span className="text-xs font-black font-mono text-slate-300">{yr}</span>
                                                  <span
                                                    className={`text-[10px] font-black px-1.5 py-0.5 rounded font-mono ${
                                                      pts > 0 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-800 text-slate-500'
                                                    }`}
                                                  >
                                                    {pts > 0 ? `+${pts} pts` : '0 pts'}
                                                  </span>
                                                </div>

                                                <div className="font-bold text-xs text-white flex items-center gap-1.5">
                                                  {rank === 1 && <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                                                  {rank === 2 && <Medal className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
                                                  {rank === 3 && <Medal className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                                                  <span>
                                                    {participated ? (rank ? `${rank}º Lugar` : 'Desfilou') : 'Fora do Especial'}
                                                  </span>
                                                </div>
                                              </div>

                                              {enredo && (
                                                <div className="mt-2.5 pt-2 border-t border-slate-800/80">
                                                  <div className="text-[10px] text-slate-500 flex items-center gap-1 mb-0.5">
                                                    <BookOpen className="w-3 h-3 text-slate-400 shrink-0" />
                                                    <span>Enredo:</span>
                                                  </div>
                                                  <p className="text-[11px] text-slate-300 line-clamp-2 italic leading-tight" title={enredo}>
                                                    "{enredo}"
                                                  </p>
                                                </div>
                                              )}
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
            </div>
          )}

          {/* TAB 2: RANKING HISTÓRICO DA LIESA */}
          {rankingMode === 'historico' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
                <span>
                  Pontuação Oficial Histórica acumulada desde 1933 (20 pts campeã, 15 vice, 12 a 1 para colocações detalhadas).
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
                              <tr className="bg-slate-900/90 border-t border-slate-800">
                                <td colSpan={7} className="p-4 sm:p-5">
                                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
                                    {/* Header da Ficha Histórica */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-800/80">
                                      <div className="flex items-center gap-3">
                                        {entry.school?.colors ? (
                                          <div
                                            className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-white shadow-md border border-white/20 shrink-0"
                                            style={{
                                              background: `linear-gradient(135deg, ${entry.school.colors.primary}, ${entry.school.colors.secondary || entry.school.colors.primary})`
                                            }}
                                          >
                                            <Award className="w-6 h-6 text-white drop-shadow" />
                                          </div>
                                        ) : (
                                          <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                                            <Crown className="w-6 h-6" />
                                          </div>
                                        )}
                                        <div>
                                          <div className="flex items-center gap-2 flex-wrap">
                                            <h4 className="font-black text-white text-base sm:text-lg">
                                              {entry.schoolName}
                                            </h4>
                                            {entry.school && (
                                              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                                {entry.school.division === 'especial' ? 'Grupo Especial' : entry.school.division.toUpperCase()}
                                              </span>
                                            )}
                                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800">
                                              {entry.totalParticipations} carnavais na elite
                                            </span>
                                          </div>
                                          <p className="text-xs text-slate-400 mt-0.5">
                                            {entry.school ? getSchoolCorporateName(entry.school) : entry.schoolName}
                                            {entry.school?.foundationYear ? ` • Fundada em ${entry.school.foundationYear}` : ''}
                                            {entry.school?.neighborhood ? ` • ${entry.school.neighborhood}` : ''}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-2 self-start sm:self-auto">
                                        <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-right">
                                          <span className="text-[10px] text-slate-500 uppercase font-bold block">Pontuação Total Histórica</span>
                                          <span className="text-base font-black text-amber-400 font-mono">{entry.totalPoints} pts</span>
                                        </div>
                                        {onSelectSchool && entry.schoolId && (
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              onSelectSchool(entry.schoolId);
                                              onClose();
                                            }}
                                            className="px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                                            title="Ver perfil completo da escola"
                                          >
                                            <span>Ver Perfil</span>
                                            <ExternalLink className="w-3.5 h-3.5" />
                                          </button>
                                        )}
                                      </div>
                                    </div>

                                    {/* Estatísticas Resumidas de Pontos */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                                      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Por Títulos (+20 pts)</span>
                                        <div className="flex items-baseline gap-1.5 mt-0.5">
                                          <span className="text-base font-black text-amber-300 font-mono">{entry.totalEspecialTitles}</span>
                                          <span className="text-[11px] text-slate-400 font-mono">({entry.titlePoints} pts)</span>
                                        </div>
                                      </div>
                                      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Por Vices (+15 pts)</span>
                                        <div className="flex items-baseline gap-1.5 mt-0.5">
                                          <span className="text-base font-black text-slate-200 font-mono">{entry.totalEspecialVices}</span>
                                          <span className="text-[11px] text-slate-400 font-mono">({entry.vicePoints} pts)</span>
                                        </div>
                                      </div>
                                      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Por Colocações (3º a 10º)</span>
                                        <div className="mt-0.5">
                                          <span className="text-base font-black text-emerald-300 font-mono">
                                            {entry.totalPoints - entry.titlePoints - entry.vicePoints} pts
                                          </span>
                                        </div>
                                      </div>
                                      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Temporadas na Elite</span>
                                        <div className="mt-0.5">
                                          <span className="text-base font-black text-amber-400 font-mono">
                                            {entry.totalParticipations} carnavais
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Grade/Tabela Completa de Resultados e Pontuações Conquistadas */}
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between gap-2 text-xs font-bold text-slate-300">
                                        <div className="flex items-center gap-2">
                                          <History className="w-3.5 h-3.5 text-amber-400" />
                                          <span>Resultados & Pontuações Conquistadas ({entry.yearsInEspecial.length} carnavais catalogados)</span>
                                        </div>
                                        <span className="text-[11px] text-slate-500 font-normal">
                                          Ordenado do mais recente ao mais antigo
                                        </span>
                                      </div>

                                      <div className="max-h-80 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar border border-slate-800/80 rounded-xl p-2 bg-slate-950/70">
                                        {entry.yearsInEspecial.map((yr) => {
                                          const perf = entry.performancesDetailed[yr];
                                          const enredo = getHistoricalEnredo(
                                            yr,
                                            entry.schoolId,
                                            entry.schoolName,
                                            entry.school,
                                            inGameHistory
                                          );
                                          const rank = perf?.rank;
                                          const pts = perf?.points ?? 0;
                                          const league = perf?.league;
                                          const statusDesc = perf?.statusDescription;

                                          return (
                                            <div
                                              key={yr}
                                              className={`p-2.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition ${
                                                rank === 1
                                                  ? 'bg-amber-500/10 border-amber-500/40 shadow-sm shadow-amber-500/10'
                                                  : rank === 2
                                                  ? 'bg-slate-300/10 border-slate-300/30'
                                                  : rank && rank <= 6
                                                  ? 'bg-emerald-500/10 border-emerald-500/30'
                                                  : pts > 0
                                                  ? 'bg-slate-900 border-slate-800'
                                                  : 'bg-slate-950/80 border-slate-800/60 opacity-70'
                                              }`}
                                            >
                                              <div className="flex items-start sm:items-center gap-3">
                                                {/* Badge do Ano */}
                                                <div className="w-12 text-center shrink-0">
                                                  <span className="text-xs font-black font-mono text-white block bg-slate-900 py-0.5 px-1.5 rounded border border-slate-800">
                                                    {yr}
                                                  </span>
                                                  {league && (
                                                    <span className="text-[9px] font-bold text-amber-400/90 uppercase block mt-0.5">
                                                      {league}
                                                    </span>
                                                  )}
                                                </div>

                                                {/* Colocação e Enredo */}
                                                <div className="space-y-0.5">
                                                  <div className="flex items-center gap-2 flex-wrap">
                                                    <span
                                                      className={`font-black text-xs ${
                                                        rank === 1
                                                          ? 'text-amber-300 flex items-center gap-1'
                                                          : rank === 2
                                                          ? 'text-slate-200 flex items-center gap-1'
                                                          : rank && rank <= 6
                                                          ? 'text-emerald-300'
                                                          : 'text-white'
                                                      }`}
                                                    >
                                                      {rank === 1 && <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                                                      {rank === 2 && <Medal className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
                                                      {rank === 1
                                                        ? '1º Lugar (Campeã)'
                                                        : rank === 2
                                                        ? '2º Lugar (Vice-Campeã)'
                                                        : rank
                                                        ? `${rank}º Lugar`
                                                        : 'Desfilou no Especial'}
                                                    </span>

                                                    {statusDesc && statusDesc !== `${rank}º Lugar (+${pts} pts)` && (
                                                      <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                                                        {statusDesc}
                                                      </span>
                                                    )}
                                                  </div>

                                                  {enredo && (
                                                    <p className="text-[11px] text-slate-300 italic flex items-center gap-1">
                                                      <BookOpen className="w-3 h-3 text-slate-500 shrink-0" />
                                                      <span className="line-clamp-1">"{enredo}"</span>
                                                    </p>
                                                  )}
                                                </div>
                                              </div>

                                              {/* Pontos Conquistados */}
                                              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                                <span
                                                  className={`text-xs font-mono font-black px-2.5 py-1 rounded-lg ${
                                                    rank === 1
                                                      ? 'bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/30'
                                                      : rank === 2
                                                      ? 'bg-slate-300 text-slate-950 font-black'
                                                      : pts > 0
                                                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold'
                                                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                                                  }`}
                                                >
                                                  {pts > 0 ? `+${pts} pts` : '0 pts'}
                                                </span>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
