import React, { useState, useMemo } from 'react';
import { School } from '../types/carnaval';
import {
  OFFICIAL_AVALIACAO_YEARLY_RESULTS,
  OFFICIAL_AVALIACAO_RECORDS_BY_SCHOOL,
  AvaliacaoYearResult
} from '../data/avaliacaoChampionsData';
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
  AlertCircle
} from 'lucide-react';

interface AvaliacaoHistoricoModalProps {
  isOpen: boolean;
  onClose: () => void;
  schools: School[];
  onSelectSchool?: (schoolId: string) => void;
}

export const AvaliacaoHistoricoModal: React.FC<AvaliacaoHistoricoModalProps> = ({
  isOpen,
  onClose,
  schools,
  onSelectSchool
}) => {
  const [tab, setTab] = useState<'campeas' | 'vices' | 'ano_a_ano'>('campeas');
  const [searchQuery, setSearchQuery] = useState('');

  // Map of schools by id for quick color/logo lookup
  const schoolsMap = useMemo(() => {
    const map = new Map<string, School>();
    schools.forEach((s) => map.set(s.id, s));
    return map;
  }, [schools]);

  // Ranking de Campeãs
  const campeasRanking = useMemo(() => {
    const list: {
      schoolId: string;
      schoolName: string;
      titles: number;
      years: number[];
      isExtinct: boolean;
      school?: School;
    }[] = [];

    Object.entries(OFFICIAL_AVALIACAO_RECORDS_BY_SCHOOL).forEach(([id, rec]) => {
      if (rec.titles > 0) {
        const sch = schoolsMap.get(id);
        const name = sch ? cleanSchoolName(sch) : id;
        list.push({
          schoolId: id,
          schoolName: name,
          titles: rec.titles,
          years: rec.titleYears,
          isExtinct: sch?.isInactive || id === 'imperio_da_praca_seca',
          school: sch
        });
      }
    });

    list.sort((a, b) => b.titles - a.titles || b.years[b.years.length - 1] - a.years[a.years.length - 1]);
    return list;
  }, [schoolsMap]);

  // Ranking de Vice-Campeãs
  const vicesRanking = useMemo(() => {
    const list: {
      schoolId: string;
      schoolName: string;
      vices: number;
      years: number[];
      isExtinct: boolean;
      school?: School;
    }[] = [];

    Object.entries(OFFICIAL_AVALIACAO_RECORDS_BY_SCHOOL).forEach(([id, rec]) => {
      if (rec.runnerUps > 0) {
        const sch = schoolsMap.get(id);
        const name = sch ? cleanSchoolName(sch) : id;
        list.push({
          schoolId: id,
          schoolName: name,
          vices: rec.runnerUps,
          years: rec.runnerUpYears,
          isExtinct:
            sch?.isInactive ||
            id === 'boemios_de_inhauma' ||
            id === 'mocidade_de_vasconcelos' ||
            id === 'unidos_do_cabral',
          school: sch
        });
      }
    });

    list.sort((a, b) => b.vices - a.vices || b.years[b.years.length - 1] - a.years[a.years.length - 1]);
    return list;
  }, [schoolsMap]);

  const filteredCampeas = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return campeasRanking;
    return campeasRanking.filter(
      (c) =>
        c.schoolName.toLowerCase().includes(q) ||
        c.years.some((y) => y.toString().includes(q))
    );
  }, [campeasRanking, searchQuery]);

  const filteredVices = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return vicesRanking;
    return vicesRanking.filter(
      (v) =>
        v.schoolName.toLowerCase().includes(q) ||
        v.years.some((y) => y.toString().includes(q))
    );
  }, [vicesRanking, searchQuery]);

  const filteredYearlyResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const sorted = [...OFFICIAL_AVALIACAO_YEARLY_RESULTS].sort((a, b) => b.year - a.year);
    if (!q) return sorted;
    return sorted.filter(
      (r) =>
        r.year.toString().includes(q) ||
        r.champions.some((c) => c.schoolName.toLowerCase().includes(q)) ||
        r.runnerUps.some((ru) => ru.schoolName.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-hidden">
      <div className="bg-slate-900 border border-purple-500/30 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-950/80 via-slate-900 to-slate-900 border-b border-purple-900/50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/25 border border-purple-500/40 flex items-center justify-center shadow-inner">
              <Trophy className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-wide">
                  Quadro Histórico Oficial • Grupo de Avaliação
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase">
                  5ª Divisão RJ
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Estatísticas oficiais de todas as Campeãs e Vice-Campeãs (1989 – 2026) da Passarela da Intendente
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Navigation Bar */}
        <div className="px-4 sm:px-6 py-3 bg-slate-950/70 border-b border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800">
            <button
              onClick={() => setTab('campeas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                tab === 'campeas'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Campeãs ({campeasRanking.length})</span>
            </button>
            <button
              onClick={() => setTab('vices')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                tab === 'vices'
                  ? 'bg-slate-700 text-slate-100 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Medal className="w-3.5 h-3.5" />
              <span>Vice-Campeãs ({vicesRanking.length})</span>
            </button>
            <button
              onClick={() => setTab('ano_a_ano')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                tab === 'ano_a_ano'
                  ? 'bg-amber-600/90 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Ano a Ano (1989–2026)</span>
            </button>
          </div>

          {/* Search */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar agremiação ou ano..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {tab === 'campeas' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span>Total de {filteredCampeas.length} agremiações campeãs registradas</span>
                <span className="text-purple-400 font-medium">38 títulos distribuídos (1989–2026)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredCampeas.map((item, idx) => {
                  const sch = item.school;
                  return (
                    <div
                      key={item.schoolId}
                      onClick={() => {
                        if (onSelectSchool) onSelectSchool(item.schoolId);
                        onClose();
                      }}
                      className="p-3.5 rounded-xl bg-slate-950/60 border border-purple-500/20 hover:border-purple-500/50 hover:bg-slate-900/80 transition cursor-pointer flex items-start justify-between gap-3 group"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div
                          className="w-4 h-4 rounded-full mt-1 border flex-shrink-0 shadow-sm"
                          style={{
                            backgroundColor: sch?.colors.primary || '#9333ea',
                            borderColor: sch?.colors.border || '#c084fc'
                          }}
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white group-hover:text-purple-300 transition truncate">
                              {item.schoolName}
                            </span>
                            {item.isExtinct && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase font-bold">
                                Inativa
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {item.years.map((yr) => (
                              <span
                                key={yr}
                                className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-purple-600/20 text-purple-300 border border-purple-500/30"
                              >
                                {yr}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="text-xl font-black text-purple-400 font-mono">
                          {item.titles}
                        </div>
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">
                          {item.titles === 1 ? 'Título' : 'Títulos'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === 'vices' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span>Total de {filteredVices.length} agremiações com vice-campeonato registradas</span>
                <span className="text-slate-300 font-medium">35 vice-campeonatos oficiais (1989–2026)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredVices.map((item) => {
                  const sch = item.school;
                  return (
                    <div
                      key={item.schoolId}
                      onClick={() => {
                        if (onSelectSchool) onSelectSchool(item.schoolId);
                        onClose();
                      }}
                      className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-600 hover:bg-slate-900/80 transition cursor-pointer flex items-start justify-between gap-3 group"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div
                          className="w-4 h-4 rounded-full mt-1 border flex-shrink-0 shadow-sm"
                          style={{
                            backgroundColor: sch?.colors.primary || '#64748b',
                            borderColor: sch?.colors.border || '#94a3b8'
                          }}
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white group-hover:text-amber-300 transition truncate">
                              {item.schoolName}
                            </span>
                            {item.isExtinct && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase font-bold">
                                Inativa
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {item.years.map((yr) => (
                              <span
                                key={yr}
                                className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700"
                              >
                                {yr}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="text-xl font-black text-slate-300 font-mono">
                          {item.vices}
                        </div>
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">
                          {item.vices === 1 ? 'Vice' : 'Vices'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === 'ano_a_ano' && (
            <div className="space-y-3">
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                      <th className="py-2.5 px-3 w-20">Ano</th>
                      <th className="py-2.5 px-3">Campeã Oficial</th>
                      <th className="py-2.5 px-3">Vice-Campeã</th>
                      <th className="py-2.5 px-3">Observações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-950/30">
                    {filteredYearlyResults.map((row) => (
                      <tr key={row.year} className="hover:bg-slate-800/40 transition">
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-400">
                          {row.year}
                        </td>
                        <td className="py-2.5 px-3">
                          {row.champions.length > 0 ? (
                            <div className="space-y-1">
                              {row.champions.map((c) => (
                                <div
                                  key={c.schoolId}
                                  onClick={() => {
                                    if (onSelectSchool) onSelectSchool(c.schoolId);
                                    onClose();
                                  }}
                                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-purple-600/20 text-purple-300 border border-purple-500/30 font-semibold cursor-pointer hover:bg-purple-600/40 transition mr-1.5"
                                >
                                  <span>🏆 {c.schoolName}</span>
                                  {c.isExtinct && (
                                    <span className="text-[8px] px-1 rounded bg-rose-500/20 text-rose-300">
                                      Inativa
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-slate-500 italic">Não houve</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3">
                          {row.runnerUps.length > 0 ? (
                            <div className="space-y-1">
                              {row.runnerUps.map((ru) => (
                                <div
                                  key={ru.schoolId}
                                  onClick={() => {
                                    if (onSelectSchool) onSelectSchool(ru.schoolId);
                                    onClose();
                                  }}
                                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-semibold cursor-pointer hover:bg-slate-700 transition mr-1.5"
                                >
                                  <span>🥈 {ru.schoolName}</span>
                                  {ru.isExtinct && (
                                    <span className="text-[8px] px-1 rounded bg-rose-500/20 text-rose-300">
                                      Inativa
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-slate-500 italic">—</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                          {row.note || 'Desfile Oficial da Intendente'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 px-6 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-purple-400" />
            <span>Dados consolidados em conformidade com as atas oficiais dos desfiles cariocas.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition cursor-pointer text-xs"
          >
            Fechar Galeria
          </button>
        </div>
      </div>
    </div>
  );
};
