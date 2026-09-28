import React, { useState, useRef } from 'react';
import { School, DivisionId, YearHistory } from '../types/carnaval';
import { getSchoolConsolidatedStats, INITIAL_HISTORY } from '../data/carnavalData';
import {
  Trophy,
  Award,
  Medal,
  Star,
  Sparkles,
  Calendar,
  History,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  PlusCircle,
  Equal,
  Layers,
  ArrowUpCircle,
  ArrowDownCircle,
  CheckCircle2
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

  // Group tab for the initial last-carnaval classification view
  const [groupTab, setGroupTab] = useState<'especial' | 'ouro' | 'prata' | 'bronze' | 'all'>('especial');
  const [divisionFilter, setDivisionFilter] = useState<'all' | DivisionId>('all');

  // Helper to extract a school's standing and badge in the last carnival
  const getSchoolLastCarnavalResult = (school: School) => {
    if (!lastHistory) {
      return {
        tier: school.division === 'especial' ? 1 : school.division === 'ouro' ? 2 : school.division === 'prata' ? 3 : 4,
        rank: 99,
        score: 0,
        badgeText: 'Participante',
        shortBadge: school.division.toUpperCase()
      };
    }

    // 1. Check especialStandings
    const esp = lastHistory.especialStandings?.find(
      (s) => s.schoolId === school.id || s.schoolName.toLowerCase() === school.name.toLowerCase()
    );
    if (esp) {
      return {
        tier: 1,
        rank: esp.rank,
        score: esp.totalScore,
        badgeText:
          esp.rank === 1
            ? `🏆 Campeã Especial ${lastHistory.year} (${esp.totalScore.toFixed(1)} pts)`
            : esp.rank === 2
            ? `🥈 Vice Especial ${lastHistory.year} (${esp.totalScore.toFixed(1)} pts)`
            : esp.rank <= 6
            ? `${esp.rank}º Lugar - G6 ${lastHistory.year} (${esp.totalScore.toFixed(1)} pts)`
            : esp.rank === 12
            ? `⬇️ 12º Rebaixada p/ Ouro (${esp.totalScore.toFixed(1)} pts)`
            : `${esp.rank}º Lugar Especial ${lastHistory.year} (${esp.totalScore.toFixed(1)} pts)`,
        shortBadge:
          esp.rank === 1
            ? '🏆 1º Campeã'
            : esp.rank === 2
            ? '🥈 2º Vice'
            : esp.rank <= 6
            ? `${esp.rank}º (G6)`
            : esp.rank === 12
            ? '⬇️ 12º Rebaixada'
            : `${esp.rank}º Lugar`
      };
    }

    // 2. Check ouroStandings
    const ouro = lastHistory.ouroStandings?.find(
      (s) => s.schoolId === school.id || s.schoolName.toLowerCase() === school.name.toLowerCase()
    );
    if (ouro) {
      return {
        tier: 2,
        rank: ouro.rank,
        score: ouro.totalScore,
        badgeText:
          ouro.rank === 1
            ? `⬆️ Campeã Ouro ${lastHistory.year} • Acesso (${ouro.totalScore.toFixed(1)} pts)`
            : ouro.rank === 2
            ? `🥈 Vice Ouro ${lastHistory.year} (${ouro.totalScore.toFixed(1)} pts)`
            : ouro.rank >= 16
            ? `⬇️ ${ouro.rank}º Rebaixada p/ Prata (${ouro.totalScore.toFixed(1)} pts)`
            : `${ouro.rank}º Lugar Ouro ${lastHistory.year} (${ouro.totalScore.toFixed(1)} pts)`,
        shortBadge:
          ouro.rank === 1
            ? '⬆️ 1º Acesso Especial'
            : ouro.rank === 2
            ? '🥈 2º Vice'
            : ouro.rank >= 16
            ? `⬇️ ${ouro.rank}º Rebaixada`
            : `${ouro.rank}º Lugar`
      };
    }

    // 3. Check prataStandings
    const prata = lastHistory.prataStandings?.find(
      (s) => s.schoolId === school.id || s.schoolName.toLowerCase() === school.name.toLowerCase()
    );
    if (prata) {
      return {
        tier: 3,
        rank: prata.rank,
        score: prata.totalScore,
        badgeText:
          prata.rank === 1
            ? `⬆️ Campeã Prata ${lastHistory.year} • Acesso (${prata.totalScore.toFixed(1)} pts)`
            : prata.rank === 2
            ? `🥈 Vice Prata ${lastHistory.year} (${prata.totalScore.toFixed(1)} pts)`
            : prata.rank >= 24
            ? `⬇️ ${prata.rank}º Rebaixada p/ Bronze (${prata.totalScore.toFixed(1)} pts)`
            : `${prata.rank}º Lugar Prata ${lastHistory.year} (${prata.totalScore.toFixed(1)} pts)`,
        shortBadge:
          prata.rank === 1
            ? '⬆️ 1º Acesso Ouro'
            : prata.rank === 2
            ? '🥈 2º Vice'
            : prata.rank >= 24
            ? `⬇️ ${prata.rank}º Rebaixada`
            : `${prata.rank}º Lugar`
      };
    }

    // 4. Check bronzeStandings
    const bronze = lastHistory.bronzeStandings?.find(
      (s) => s.schoolId === school.id || s.schoolName.toLowerCase() === school.name.toLowerCase()
    );
    if (bronze) {
      return {
        tier: 4,
        rank: bronze.rank,
        score: bronze.totalScore,
        badgeText:
          bronze.rank === 1
            ? `🏆 Campeã Série Bronze ${lastHistory.year} • Acesso (${bronze.totalScore.toFixed(1)} pts)`
            : bronze.rank === 2
            ? `🥈 Vice Série Bronze ${lastHistory.year} • Acesso (${bronze.totalScore.toFixed(1)} pts)`
            : `${bronze.rank}º Lugar Série Bronze ${lastHistory.year} (${bronze.totalScore.toFixed(1)} pts)`,
        shortBadge:
          bronze.rank === 1
            ? '🏆 1º Acesso Prata'
            : bronze.rank === 2
            ? '🥈 2º Vice'
            : `${bronze.rank}º Lugar`
      };
    }

    return {
      tier: school.division === 'especial' ? 1 : school.division === 'ouro' ? 2 : school.division === 'prata' ? 3 : 4,
      rank: 99,
      score: 0,
      badgeText: `Participante do Carnaval ${lastHistory.year}`,
      shortBadge: school.division.toUpperCase()
    };
  };

  // Sort schools per group based on last carnival standing
  const sortSchoolsByLastCarnaval = (divSchools: School[], div: DivisionId) => {
    return [...divSchools].sort((a, b) => {
      const resA = getSchoolLastCarnavalResult(a);
      const resB = getSchoolLastCarnavalResult(b);

      if (resA.tier !== resB.tier) return resA.tier - resB.tier;
      return resA.rank - resB.rank;
    });
  };

  const especialSchoolsByCarnaval = sortSchoolsByLastCarnaval(
    schools.filter((s) => s.division === 'especial'),
    'especial'
  );
  const ouroSchoolsByCarnaval = sortSchoolsByLastCarnaval(
    schools.filter((s) => s.division === 'ouro'),
    'ouro'
  );
  const prataSchoolsByCarnaval = sortSchoolsByLastCarnaval(
    schools.filter((s) => s.division === 'prata'),
    'prata'
  );
  const bronzeSchoolsByCarnaval = sortSchoolsByLastCarnaval(
    schools.filter((s) => s.division === 'bronze'),
    'bronze'
  );

  // Pre-calculate consolidated stats for all schools to rank by titles
  const rankedSchoolsWithStats = schools.map((sch) => {
    const stats = getSchoolConsolidatedStats(sch);
    return {
      school: sch,
      stats
    };
  });

  // Overall ranking sorted strictly by number of titles:
  // 1. Total Especial titles (somados)
  // 2. Total Especial vices (somados)
  // 3. Total Ouro titles (somados)
  // 4. Total Ouro vices (somados)
  // 5. Total Prata titles (somados)
  // 6. Grand Total Titles
  const allTimeRanking = [...rankedSchoolsWithStats].sort((a, b) => {
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
    return b.stats.grandTotalTitles - a.stats.grandTotalTitles;
  });

  // Open with the school having the MOST titles (#1 in ranking, Portela with 22 titles), NOT Viradouro!
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>(() => {
    return allTimeRanking[0]?.school.id || 'portela';
  });

  const selectedSchool = schools.find((s) => s.id === selectedSchoolId) || allTimeRanking[0]?.school || schools[0];

  // Schools sorted by titles for the carousel
  const schoolsSortedByTitles = allTimeRanking.map((r) => r.school);
  const filteredSchools = schoolsSortedByTitles.filter(
    (s) => divisionFilter === 'all' || s.division === divisionFilter
  );

  const selectedStats = getSchoolConsolidatedStats(selectedSchool);
  const achievements = [...selectedStats.achievements].sort((a, b) => b.year - a.year);

  const handleSelectSchool = (schoolId: string) => {
    setSelectedSchoolId(schoolId);
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              👑 SALA DE GLÓRIAS & HONRAS DO SAMBA
            </span>
            <span className="text-xs text-slate-400">Palmarés Oficial & Conquistas Somadas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Galeria de Títulos e Estatísticas
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
            Agremiações ordenadas por número total de títulos e posicionadas por grupos conforme a classificação do último carnaval.
          </p>
        </div>

        {/* Quick Action: Select My School */}
        {userSchool && (
          <button
            onClick={() => handleSelectSchool(userSchool.id)}
            className="px-4 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold rounded-xl text-xs transition flex items-center gap-2 self-start md:self-auto shadow-md"
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Ver Minha Escola ({userSchool.shortName})</span>
          </button>
        )}
      </div>

      {/* SEÇÃO NO INÍCIO: Escolas Separadas por Grupos (Posicionadas pelo Último Carnaval) */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                🏛️ QUADRO DE ACESSO & CLASSIFICAÇÃO
              </span>
              <span className="text-xs text-slate-400">
                Carnaval {lastHistory?.year || currentYear - 1} • Clique para abrir a galeria
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <span>Agremiações por Grupos • Ordem do Último Carnaval</span>
            </h3>
          </div>

          {/* Group Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setGroupTab('especial')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                groupTab === 'especial'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Grupo Especial</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900/60 font-mono">
                {especialSchoolsByCarnaval.length}
              </span>
            </button>

            <button
              onClick={() => setGroupTab('ouro')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                groupTab === 'ouro'
                  ? 'bg-blue-500 text-white font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Série Ouro</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-950/60 font-mono">
                {ouroSchoolsByCarnaval.length}
              </span>
            </button>

            <button
              onClick={() => setGroupTab('prata')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                groupTab === 'prata'
                  ? 'bg-slate-300 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Série Prata</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-400/60 font-mono">
                {prataSchoolsByCarnaval.length}
              </span>
            </button>

            <button
              onClick={() => setGroupTab('bronze')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                groupTab === 'bronze'
                  ? 'bg-amber-700 text-amber-100 font-black shadow-md ring-1 ring-amber-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Série Bronze</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-950/60 font-mono">
                {bronzeSchoolsByCarnaval.length}
              </span>
            </button>

            <button
              onClick={() => setGroupTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                groupTab === 'all'
                  ? 'bg-slate-800 text-white font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos os 4 Grupos
            </button>
          </div>
        </div>

        {/* Group Renderers */}
        <div className="space-y-6">
          {(groupTab === 'especial' || groupTab === 'all') && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <h4 className="text-xs font-black uppercase text-amber-300 tracking-wider">
                    Grupo Especial ({especialSchoolsByCarnaval.length} agremiações • Ordenadas pelo Carnaval {lastHistory?.year || currentYear - 1})
                  </h4>
                </div>
                <span className="text-[11px] text-slate-400">12 agremiações na elite</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                {especialSchoolsByCarnaval.map((s, idx) => {
                  const isSelected = s.id === selectedSchoolId;
                  const stats = getSchoolConsolidatedStats(s);
                  const lastRes = getSchoolLastCarnavalResult(s);

                  return (
                    <button
                      key={s.id}
                      onClick={() => handleSelectSchool(s.id)}
                      className={`p-3 rounded-xl border text-left transition flex flex-col justify-between gap-2.5 cursor-pointer relative overflow-hidden group ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/60 shadow-lg shadow-amber-500/20'
                          : 'bg-slate-950/70 border-slate-800 hover:border-amber-500/40 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 w-full">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                          {idx + 1}º
                        </span>
                        <span
                          className={`text-[10px] font-black font-mono px-1.5 py-0.5 rounded ${
                            stats.totalEspecialTitles > 0
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'text-slate-500 bg-slate-900/60'
                          }`}
                        >
                          ★ {stats.totalEspecialTitles} {stats.totalEspecialTitles === 1 ? 'título' : 'títulos'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-4 h-4 rounded-full border flex-shrink-0"
                          style={{
                            backgroundColor: s.colors.primary,
                            borderColor: s.colors.border || '#fff'
                          }}
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-white truncate group-hover:text-amber-300 transition">
                            {s.shortName || s.name}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            {lastRes.shortBadge}
                          </div>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="text-[9px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 pt-1 border-t border-amber-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Galeria Aberta</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {(groupTab === 'ouro' || groupTab === 'all') && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  <h4 className="text-xs font-black uppercase text-blue-300 tracking-wider">
                    Série Ouro ({ouroSchoolsByCarnaval.length} agremiações • Ordenadas pelo Carnaval {lastHistory?.year || currentYear - 1})
                  </h4>
                </div>
                <span className="text-[11px] text-slate-400">Sambódromo Marquês de Sapucaí</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                {ouroSchoolsByCarnaval.map((s, idx) => {
                  const isSelected = s.id === selectedSchoolId;
                  const stats = getSchoolConsolidatedStats(s);
                  const lastRes = getSchoolLastCarnavalResult(s);

                  return (
                    <button
                      key={s.id}
                      onClick={() => handleSelectSchool(s.id)}
                      className={`p-3 rounded-xl border text-left transition flex flex-col justify-between gap-2.5 cursor-pointer relative overflow-hidden group ${
                        isSelected
                          ? 'bg-blue-500/20 border-blue-400 ring-2 ring-blue-400/60 shadow-lg shadow-blue-500/20'
                          : 'bg-slate-950/70 border-slate-800 hover:border-blue-500/40 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 w-full">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                          {idx + 1}º
                        </span>
                        <span
                          className={`text-[10px] font-black font-mono px-1.5 py-0.5 rounded ${
                            stats.grandTotalTitles > 0
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                              : 'text-slate-500 bg-slate-900/60'
                          }`}
                        >
                          {stats.totalEspecialTitles > 0 ? `★ ${stats.totalEspecialTitles}` : `✦ ${stats.totalOuroTitles} Ouro`}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-4 h-4 rounded-full border flex-shrink-0"
                          style={{
                            backgroundColor: s.colors.primary,
                            borderColor: s.colors.border || '#fff'
                          }}
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-white truncate group-hover:text-blue-300 transition">
                            {s.shortName || s.name}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            {lastRes.shortBadge}
                          </div>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="text-[9px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1 pt-1 border-t border-blue-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Galeria Aberta</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {(groupTab === 'prata' || groupTab === 'all') && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider">
                    Série Prata ({prataSchoolsByCarnaval.length} agremiações • Ordenadas pelo Carnaval {lastHistory?.year || currentYear - 1})
                  </h4>
                </div>
                <span className="text-[11px] text-slate-400">Intendente Magalhães</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                {prataSchoolsByCarnaval.map((s, idx) => {
                  const isSelected = s.id === selectedSchoolId;
                  const stats = getSchoolConsolidatedStats(s);
                  const lastRes = getSchoolLastCarnavalResult(s);

                  return (
                    <button
                      key={s.id}
                      onClick={() => handleSelectSchool(s.id)}
                      className={`p-3 rounded-xl border text-left transition flex flex-col justify-between gap-2.5 cursor-pointer relative overflow-hidden group ${
                        isSelected
                          ? 'bg-slate-300/20 border-slate-300 ring-2 ring-slate-300/60 shadow-lg'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-500/40 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 w-full">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                          {idx + 1}º
                        </span>
                        <span
                          className={`text-[10px] font-black font-mono px-1.5 py-0.5 rounded ${
                            stats.grandTotalTitles > 0
                              ? 'bg-slate-300/20 text-slate-200 border border-slate-400/40'
                              : 'text-slate-500 bg-slate-900/60'
                          }`}
                        >
                          {stats.grandTotalTitles > 0 ? `★ ${stats.grandTotalTitles}` : '0 títulos'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-4 h-4 rounded-full border flex-shrink-0"
                          style={{
                            backgroundColor: s.colors.primary,
                            borderColor: s.colors.border || '#fff'
                          }}
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-white truncate group-hover:text-slate-200 transition">
                            {s.shortName || s.name}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            {lastRes.shortBadge}
                          </div>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="text-[9px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1 pt-1 border-t border-slate-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Galeria Aberta</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {(groupTab === 'bronze' || groupTab === 'all') && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                  <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider">
                    Série Bronze ({bronzeSchoolsByCarnaval.length} agremiações • Ordenadas pelo Carnaval {lastHistory?.year || currentYear - 1})
                  </h4>
                </div>
                <span className="text-[11px] text-slate-400">Intendente Magalhães • Superliga</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                {bronzeSchoolsByCarnaval.map((s, idx) => {
                  const isSelected = s.id === selectedSchoolId;
                  const stats = getSchoolConsolidatedStats(s);
                  const lastRes = getSchoolLastCarnavalResult(s);

                  return (
                    <button
                      key={s.id}
                      onClick={() => handleSelectSchool(s.id)}
                      className={`p-3 rounded-xl border text-left transition flex flex-col justify-between gap-2.5 cursor-pointer relative overflow-hidden group ${
                        isSelected
                          ? 'bg-amber-700/20 border-amber-600 ring-2 ring-amber-500/60 shadow-lg'
                          : 'bg-slate-950/70 border-slate-800 hover:border-amber-600/40 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 w-full">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                          {idx + 1}º
                        </span>
                        <span
                          className={`text-[10px] font-black font-mono px-1.5 py-0.5 rounded ${
                            stats.grandTotalTitles > 0
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'text-slate-500 bg-slate-900/60'
                          }`}
                        >
                          {stats.grandTotalTitles > 0 ? `★ ${stats.grandTotalTitles}` : '0 títulos'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-4 h-4 rounded-full border flex-shrink-0"
                          style={{
                            backgroundColor: s.colors.primary,
                            borderColor: s.colors.border || '#fff'
                          }}
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-white truncate group-hover:text-amber-300 transition">
                            {s.shortName || s.name}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            {lastRes.shortBadge}
                          </div>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="text-[9px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 pt-1 border-t border-amber-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Galeria Aberta</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* School Selector Carousel / Buttons - STRICTLY in order of number of titles */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Ranking por Número de Títulos (Maior Campeã ➔ Menor):</span>
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setDivisionFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                divisionFilter === 'all'
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Todas ({schools.length})
            </button>
            <button
              onClick={() => setDivisionFilter('especial')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                divisionFilter === 'especial'
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Grupo Especial
            </button>
            <button
              onClick={() => setDivisionFilter('ouro')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                divisionFilter === 'ouro'
                  ? 'bg-blue-500 text-white font-black'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Série Ouro
            </button>
            <button
              onClick={() => setDivisionFilter('prata')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                divisionFilter === 'prata'
                  ? 'bg-slate-300 text-slate-950 font-black'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Série Prata
            </button>
            <button
              onClick={() => setDivisionFilter('bronze')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                divisionFilter === 'bronze'
                  ? 'bg-amber-700 text-amber-100 font-black'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Série Bronze
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {filteredSchools.map((s, idx) => {
            const isSelected = s.id === selectedSchoolId;
            const stats = getSchoolConsolidatedStats(s);
            return (
              <button
                key={s.id}
                onClick={() => handleSelectSchool(s.id)}
                className={`flex-shrink-0 px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500 text-white shadow-md ring-1 ring-amber-400'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <span className="font-mono text-[10px] text-slate-500">#{idx + 1}</span>
                <div
                  className="w-3.5 h-3.5 rounded-full border"
                  style={{
                    backgroundColor: s.colors.primary,
                    borderColor: s.colors.border || '#fff'
                  }}
                />
                <span>{s.shortName || s.name}</span>
                {stats.totalEspecialTitles > 0 && (
                  <span className="text-[10px] text-amber-400 font-mono font-black">
                    ★{stats.totalEspecialTitles}
                  </span>
                )}
                {stats.totalOuroTitles > 0 && stats.totalEspecialTitles === 0 && (
                  <span className="text-[10px] text-blue-400 font-mono font-black">
                    ✦{stats.totalOuroTitles}
                  </span>
                )}
                {stats.totalPrataTitles > 0 && stats.totalEspecialTitles === 0 && stats.totalOuroTitles === 0 && (
                  <span className="text-[10px] text-slate-300 font-mono font-black">
                    ◆{stats.totalPrataTitles}
                  </span>
                )}
                {stats.grandTotalTitles === 0 && (
                  <span className="text-[10px] text-slate-600 font-mono">
                    0
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected School Glory Showcase */}
      {selectedSchool && (
        <div ref={galleryRef} className="space-y-6 scroll-mt-20">
          {/* Banner with School Identity */}
          <div
            className="rounded-2xl p-6 sm:p-8 border shadow-2xl relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${selectedSchool.colors.primary}cc 0%, #090d16 85%)`,
              borderColor: selectedSchool.colors.border || '#334155'
            }}
          >
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                      selectedSchool.division === 'especial'
                        ? 'bg-amber-400 text-slate-950'
                        : selectedSchool.division === 'ouro'
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-300 text-slate-950'
                    }`}
                  >
                    {selectedSchool.division === 'especial'
                      ? 'Grupo Especial'
                      : selectedSchool.division === 'ouro'
                      ? 'Série Ouro'
                      : 'Série Prata'}
                  </span>
                  <span className="text-xs text-slate-300 bg-black/40 px-2.5 py-0.5 rounded-full border border-white/10">
                    Fundação: {selectedSchool.foundationYear} • {selectedSchool.neighborhood}
                  </span>
                  {selectedSchool.id === userSchool?.id && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                      Sua Agremiação
                    </span>
                  )}
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {selectedSchool.name}
                </h2>
                <p className="text-sm text-amber-200/90 italic font-semibold">
                  "{selectedSchool.nickname}" • Pavilhão: {selectedSchool.symbol}
                </p>
              </div>

              {/* Total Stars Counter */}
              <div className="bg-black/70 border border-amber-500/30 rounded-2xl p-4 text-center min-w-[200px] shadow-xl backdrop-blur-sm">
                <div className="text-[10px] text-amber-300 uppercase tracking-wider font-extrabold flex items-center justify-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Total de Títulos Acumulados</span>
                </div>
                <div className="text-4xl font-black text-amber-400 font-mono mt-0.5">
                  {selectedStats.grandTotalTitles}
                </div>
                <div className="text-[11px] text-slate-300 font-medium">
                  {selectedStats.totalEspecialTitles} Especial • {selectedStats.totalOuroTitles} Ouro
                  {selectedStats.totalPrataTitles > 0 ? ` • ${selectedStats.totalPrataTitles} Prata` : ''} • {selectedStats.grandTotalVices} Vices
                </div>
                <div className="mt-1 pt-1 border-t border-white/10 text-[10px] text-amber-300/90 font-bold">
                  {selectedStats.grandTotalConquests} Conquistas Oficiais
                </div>
              </div>
            </div>
          </div>

          {/* Glory Metrics Cards with UNIFIED values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Especial Titles */}
            <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Títulos Grupo Especial
                  </span>
                  <Trophy className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-3xl font-black text-white font-mono">
                  {selectedStats.totalEspecialTitles}
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-800/80">
                <div className="text-[11px] font-semibold text-slate-300">
                  {selectedStats.totalEspecialTitles === 1 ? '1 título de campeã' : `${selectedStats.totalEspecialTitles} títulos de campeã`}
                </div>
              </div>
            </div>

            {/* Especial Runner-Ups (2º Lugar) */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Vices Grupo Especial
                  </span>
                  <Medal className="w-5 h-5 text-slate-300" />
                </div>
                <div className="text-3xl font-black text-slate-200 font-mono">
                  {selectedStats.totalEspecialVices}
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-800/80">
                <div className="text-[11px] font-semibold text-slate-300">
                  {selectedStats.totalEspecialVices === 1 ? '1 vice-campeonato' : `${selectedStats.totalEspecialVices} vice-campeonatos`}
                </div>
              </div>
            </div>

            {/* Série Ouro Titles */}
            <div className="bg-slate-900/90 border border-blue-500/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    Títulos Série Ouro
                  </span>
                  <Award className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-3xl font-black text-white font-mono">
                  {selectedStats.totalOuroTitles}
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-800/80">
                <div className="text-[11px] font-semibold text-slate-300">
                  {selectedStats.totalOuroTitles === 1 ? '1 título de acesso' : `${selectedStats.totalOuroTitles} títulos de acesso`}
                </div>
              </div>
            </div>

            {/* Série Ouro Runner-Ups */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Vices Série Ouro
                  </span>
                  <Medal className="w-5 h-5 text-amber-600" />
                </div>
                <div className="text-3xl font-black text-slate-200 font-mono">
                  {selectedStats.totalOuroVices}
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-800/80">
                <div className="text-[11px] font-semibold text-slate-300">
                  {selectedStats.totalOuroVices === 1 ? '1 vice-campeonato' : `${selectedStats.totalOuroVices} vice-campeonatos`}
                </div>
              </div>
            </div>
          </div>

          {/* Quadro Unificado de Conquistas das Divisões */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">
                  Quadro de Conquistas e Títulos Unificados
                </h3>
              </div>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Total Geral: {selectedStats.grandTotalTitles} Título{selectedStats.grandTotalTitles === 1 ? '' : 's'} e {selectedStats.grandTotalVices} Vice{selectedStats.grandTotalVices === 1 ? '' : 's'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="py-2.5 px-3">Divisão</th>
                    <th className="py-2.5 px-3 text-center">Nível Oficial</th>
                    <th className="py-2.5 px-3 text-center font-bold text-amber-400">Títulos (Campeã)</th>
                    <th className="py-2.5 px-3 text-center font-bold text-slate-300">Vice-Campeonatos (2º)</th>
                    <th className="py-2.5 px-3 text-right font-bold text-white">TOTAL DE CONQUISTAS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  <tr>
                    <td className="py-3 px-3 font-sans font-bold text-amber-300 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>Grupo Especial</span>
                    </td>
                    <td className="py-3 px-3 text-center font-sans">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">1ª Divisão</span>
                    </td>
                    <td className="py-3 px-3 text-center text-amber-400 font-black text-sm">
                      {selectedStats.totalEspecialTitles}
                    </td>
                    <td className="py-3 px-3 text-center text-slate-300 font-bold">
                      {selectedStats.totalEspecialVices}
                    </td>
                    <td className="py-3 px-3 text-right font-black text-amber-300 text-sm">
                      {selectedStats.totalEspecialTitles + selectedStats.totalEspecialVices}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-3 font-sans font-bold text-blue-300 flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span>Série Ouro</span>
                    </td>
                    <td className="py-3 px-3 text-center font-sans">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">2ª Divisão</span>
                    </td>
                    <td className="py-3 px-3 text-center text-blue-400 font-black text-sm">
                      {selectedStats.totalOuroTitles}
                    </td>
                    <td className="py-3 px-3 text-center text-slate-300 font-bold">
                      {selectedStats.totalOuroVices}
                    </td>
                    <td className="py-3 px-3 text-right font-black text-blue-300 text-sm">
                      {selectedStats.totalOuroTitles + selectedStats.totalOuroVices}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-3 font-sans font-bold text-slate-300 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span>Série Prata</span>
                    </td>
                    <td className="py-3 px-3 text-center font-sans">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-300/20 text-slate-200 font-bold">3ª Divisão</span>
                    </td>
                    <td className="py-3 px-3 text-center text-slate-200 font-black text-sm">
                      {selectedStats.totalPrataTitles}
                    </td>
                    <td className="py-3 px-3 text-center text-slate-400 font-bold">
                      {selectedStats.totalPrataVices}
                    </td>
                    <td className="py-3 px-3 text-right font-black text-slate-200 text-sm">
                      {selectedStats.totalPrataTitles + selectedStats.totalPrataVices}
                    </td>
                  </tr>

                  <tr className="bg-slate-950/80 font-black">
                    <td className="py-3.5 px-3 font-sans text-white text-xs uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>TOTAL GERAL ACUMULADO</span>
                    </td>
                    <td className="py-3.5 px-3 text-center font-sans text-slate-400">Todas</td>
                    <td className="py-3.5 px-3 text-center text-amber-400 text-base">
                      {selectedStats.grandTotalTitles}
                    </td>
                    <td className="py-3.5 px-3 text-center text-slate-300 text-base">
                      {selectedStats.grandTotalVices}
                    </td>
                    <td className="py-3.5 px-3 text-right text-emerald-400 text-lg">
                      {selectedStats.grandTotalConquests}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Historical Years of Titles Section with Tags (Histórico vs Recente) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <History className="w-5 h-5 text-amber-400" />
              <span>Anos de Consagração das Conquistas (Títulos Eternizados)</span>
            </h3>

            <div className="space-y-3">
              {/* Especial Titles List */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-xs font-bold text-amber-400 uppercase mb-2 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4" />
                  <span>
                    Conquistas no Grupo Especial ({selectedStats.totalEspecialTitles} títulos acumulados):
                  </span>
                </div>
                {selectedStats.allEspecialYears.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedStats.allEspecialYears.map((entry) => (
                      <span
                        key={entry.year}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 border shadow-sm bg-amber-500/15 text-amber-300 border-amber-500/30"
                      >
                        <span>★ {entry.year}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-slate-500 italic">
                    Ainda em busca da primeira estrela dourada no Grupo Especial.
                  </span>
                )}
              </div>

              {/* Ouro Titles List */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-xs font-bold text-blue-400 uppercase mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>
                    Conquistas na Série Ouro ({selectedStats.totalOuroTitles} títulos acumulados):
                  </span>
                </div>
                {selectedStats.allOuroYears.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedStats.allOuroYears.map((entry) => (
                      <span
                        key={entry.year}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 border shadow-sm bg-blue-500/15 text-blue-300 border-blue-500/30"
                      >
                        <span>✦ {entry.year}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-slate-500 italic">
                    Nenhum título registrado na Série Ouro.
                  </span>
                )}
              </div>

              {/* Prata Titles List */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-xs font-bold text-slate-300 uppercase mb-2 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-slate-400" />
                  <span>
                    Conquistas na Série Prata ({selectedStats.totalPrataTitles} títulos acumulados):
                  </span>
                </div>
                {selectedStats.allPrataYears.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedStats.allPrataYears.map((entry) => (
                      <span
                        key={entry.year}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 border shadow-sm bg-slate-400/15 text-slate-200 border-slate-400/30"
                      >
                        <span>◆ {entry.year}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-slate-500 italic">
                    Nenhum título registrado na Série Prata.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* In-Game Achievements from Carnaval 2027 onwards */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Galeria de Conquistas no Jogo (Carnaval 2027 em Diante)
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Os resultados até 2026 são históricos. As novas honras conquistadas no avanço do jogo aparecerão aqui.
                  </p>
                </div>
              </div>
              <span className="text-xs text-amber-300 font-mono font-bold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 self-start sm:self-auto">
                🌟 {achievements.length} conquista(s) no jogo
              </span>
            </div>

            {achievements.length === 0 ? (
              <div className="text-center py-8 px-4 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-2">
                <Trophy className="w-8 h-8 text-slate-600 mx-auto" />
                <div className="text-sm font-bold text-slate-300">
                  Nenhum resultado gravado ainda no jogo!
                </div>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Os títulos e vices até 2026 já estão integrados nas glórias históricas da agremiação. Dispute o <strong>Carnaval de 2027</strong> e realize a Apuração Oficial para eternizar novas conquistas no jogo!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {achievements.map((ach, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
                      ach.badgeType === 'champion_especial'
                        ? 'bg-amber-500/15 border-amber-500/60 shadow-lg shadow-amber-500/10'
                        : ach.badgeType === 'champion_ouro'
                        ? 'bg-blue-500/15 border-blue-500/60 shadow-lg shadow-blue-500/10'
                        : ach.badgeType === 'champion_prata'
                        ? 'bg-slate-300/15 border-slate-300/60 shadow-lg shadow-slate-300/10'
                        : ach.badgeType === 'vice_especial' || ach.badgeType === 'vice_ouro' || ach.badgeType === 'vice_prata'
                        ? 'bg-slate-800/90 border-slate-600 shadow-md'
                        : ach.badgeType === 'g6'
                        ? 'bg-indigo-950/40 border-indigo-500/40'
                        : ach.badgeType === 'relegated'
                        ? 'bg-rose-950/25 border-rose-900/50'
                        : 'bg-slate-950/60 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                          ach.badgeType === 'champion_especial'
                            ? 'bg-amber-400 text-slate-950'
                            : ach.badgeType === 'champion_ouro'
                            ? 'bg-blue-500 text-white'
                            : ach.badgeType === 'champion_prata'
                            ? 'bg-slate-200 text-slate-950'
                            : ach.badgeType === 'vice_especial' || ach.badgeType === 'vice_ouro' || ach.badgeType === 'vice_prata'
                            ? 'bg-slate-300 text-slate-950'
                            : ach.badgeType === 'g6'
                            ? 'bg-indigo-500 text-white'
                            : ach.badgeType === 'relegated'
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {ach.placement}º
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>{ach.titleName}</span>
                          {ach.year === 2026 && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase font-black">
                              2026
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Temporada {ach.year} • {ach.division === 'especial' ? 'Grupo Especial' : ach.division === 'ouro' ? 'Série Ouro' : 'Série Prata'}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 uppercase">Pontuação Final</div>
                      <div className="text-base font-black text-amber-400 font-mono">
                        {ach.totalScore.toFixed(1)} pts
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global All-Time Carnival Ranking Table with Summed Columns */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">
              Quadro Geral de Honras das Escolas de Samba (Estatísticas Somadas)
            </h3>
          </div>
          <span className="text-xs text-slate-400">Glórias Antigas + Conquistas do Jogo</span>
        </div>

        <div className="overflow-x-auto min-w-[760px]">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-2.5 px-3">Posição</th>
                <th className="py-2.5 px-3">Escola de Samba</th>
                <th className="py-2.5 px-3 text-center">Divisão</th>
                <th className="py-2.5 px-3 text-center">Títulos Especial</th>
                <th className="py-2.5 px-3 text-center">Vices Especial</th>
                <th className="py-2.5 px-3 text-center">Títulos Ouro</th>
                <th className="py-2.5 px-3 text-center">Vices Ouro</th>
                <th className="py-2.5 px-3 text-center">Títulos Prata</th>
                <th className="py-2.5 px-3 text-right font-black text-amber-300">TOTAL DE TÍTULOS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {allTimeRanking.map((item, idx) => {
                const sch = item.school;
                const stats = item.stats;
                const isSelected = sch.id === selectedSchoolId;

                return (
                  <tr
                    key={sch.id}
                    onClick={() => handleSelectSchool(sch.id)}
                    className={`cursor-pointer transition hover:bg-slate-800/50 ${
                      isSelected ? 'bg-amber-500/10 font-bold' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 font-mono text-slate-400">{idx + 1}º</td>
                    <td className="py-2.5 px-3 flex items-center gap-2 text-white">
                      <div
                        className="w-3.5 h-3.5 rounded-full border flex-shrink-0"
                        style={{
                          backgroundColor: sch.colors.primary,
                          borderColor: sch.colors.border || '#fff'
                        }}
                      />
                      <span className="font-semibold">{sch.name}</span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          sch.division === 'especial'
                            ? 'bg-amber-500/20 text-amber-300'
                            : sch.division === 'ouro'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-slate-300/20 text-slate-200'
                        }`}
                      >
                        {sch.division === 'especial' ? 'Especial' : sch.division === 'ouro' ? 'Ouro' : 'Prata'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-amber-400">
                      {stats.totalEspecialTitles}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono text-slate-300">
                      {stats.totalEspecialVices}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-blue-400">
                      {stats.totalOuroTitles}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono text-slate-400">
                      {stats.totalOuroVices}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono text-slate-300">
                      {stats.totalPrataTitles}
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
