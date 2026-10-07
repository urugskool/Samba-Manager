import React, { useState } from 'react';
import { School, DivisionId } from '../types/carnaval';
import { SorteioSlot } from '../types/sorteio';
import {
  ParadeScriptService,
  ParadeScript,
  ParadeScriptElement,
  ParadeElementType
} from '../services/paradeScriptService';
import {
  X,
  BookOpen,
  Sparkles,
  Users,
  Castle,
  Music,
  Heart,
  Crown,
  Layers,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  Printer
} from 'lucide-react';
import { cleanSchoolName } from '../utils/schoolNameUtils';

interface ParadeScriptModalProps {
  school: School;
  division?: DivisionId;
  slot?: SorteioSlot;
  onClose: () => void;
}

export const ParadeScriptModal: React.FC<ParadeScriptModalProps> = ({
  school,
  division,
  slot,
  onClose
}) => {
  const effectiveDivision = division || school.division;
  const script: ParadeScript = ParadeScriptService.getOrGenerateParadeScript(school, effectiveDivision);

  const [selectedSector, setSelectedSector] = useState<number | 'all'>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredElements = script.elements.filter((el) => {
    if (selectedSector !== 'all' && el.sectorNumber !== selectedSector) return false;
    if (filterType === 'alas' && el.type !== 'ala') return false;
    if (filterType === 'alegorias' && el.type !== 'abre_alas' && el.type !== 'alegoria' && el.type !== 'tripe') return false;
    if (filterType === 'segmentos' && (el.type === 'ala' || el.type === 'abre_alas' || el.type === 'alegoria' || el.type === 'tripe')) return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = el.name.toLowerCase().includes(q);
      const matchDesc = el.description.toLowerCase().includes(q);
      const matchCat = el.categoryLabel.toLowerCase().includes(q);
      const matchCostume = el.costumeDetails?.toLowerCase().includes(q);
      return matchName || matchDesc || matchCat || matchCostume;
    }
    return true;
  });

  const getElementBadgeColor = (type: ParadeElementType) => {
    switch (type) {
      case 'comissao_frente':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'abre_alas':
      case 'alegoria':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'tripe':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      case 'bateria':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'casal_mspb':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'baianas':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'velha_guarda':
      case 'passistas':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getElementIcon = (type: ParadeElementType) => {
    switch (type) {
      case 'comissao_frente':
        return <Crown className="w-4 h-4 text-purple-400" />;
      case 'abre_alas':
      case 'alegoria':
        return <Castle className="w-4 h-4 text-amber-400" />;
      case 'tripe':
        return <Layers className="w-4 h-4 text-yellow-400" />;
      case 'bateria':
        return <Music className="w-4 h-4 text-rose-400" />;
      case 'casal_mspb':
        return <Sparkles className="w-4 h-4 text-emerald-400" />;
      case 'baianas':
        return <Heart className="w-4 h-4 text-blue-400" />;
      default:
        return <Users className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-slate-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 p-5 sm:p-6 text-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-slate-950/20 border border-slate-950/30 flex items-center justify-center shrink-0 shadow-inner">
              <BookOpen className="w-7 h-7 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-950 text-amber-300 shadow">
                  ROTEIRO OFICIAL DE DESFILE • LIVRO ABRE-ALAS
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-950/20 text-slate-950 border border-slate-950/30">
                  {script.divisionLabel}
                </span>
                {slot && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-950/30 text-slate-950">
                    {slot.order}ª a desfilar ({slot.dayLabel.split(' ')[0]})
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mt-0.5">
                {cleanSchoolName(school)}
              </h2>
              <p className="text-xs font-semibold text-slate-900">
                Enredo: <span className="font-black italic">"{script.enredoTitle}"</span> • Carnavalesco: {script.carnavalesco}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => window.print()}
              className="p-2.5 rounded-xl bg-slate-950/15 hover:bg-slate-950/30 text-slate-950 transition cursor-pointer"
              title="Imprimir Roteiro Oficial"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-950 text-amber-300 hover:bg-slate-900 transition cursor-pointer shadow"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Summary Cards: Synopsis & Official Requirements */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Synopsis Card */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
                <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Sinopse & Proposta Temática do Enredo
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px]">
                  Vertente: {script.enredoTheme}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic border-l-2 border-amber-500/40 pl-3">
                "{script.synopsis}"
              </p>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Estrutura Dramatúrgica: <strong>{script.setores.length} Setores Temáticos</strong></span>
                <span>Total de Itens Inscritos: <strong>{script.elements.length} Elementos</strong></span>
              </div>
            </div>

            {/* Official Regulations & Composition Breakdown */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                <Layers className="w-4 h-4 text-amber-400" />
                Obrigatoriedades Homologadas
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Componentes</div>
                  <div className="text-sm font-black text-white font-mono">
                    {script.obrigatoriedades.totalComponentes.toLocaleString('pt-BR')}
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Alas Oficiais</div>
                  <div className="text-sm font-black text-amber-300 font-mono">
                    {script.obrigatoriedades.totalAlas} alas
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Alegorias & Tripés</div>
                  <div className="text-sm font-black text-white font-mono">
                    {script.obrigatoriedades.totalAlegorias} aleg. + {script.obrigatoriedades.totalTripes} tripés
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Ala das Baianas</div>
                  <div className="text-sm font-black text-blue-300 font-mono">
                    {script.obrigatoriedades.baianasCount} baianas
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Bateria (Ritmo)</div>
                  <div className="text-sm font-black text-rose-300 font-mono">
                    {script.obrigatoriedades.ritmistasCount} ritmistas
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Comissão de Frente</div>
                  <div className="text-sm font-black text-purple-300 font-mono">
                    {script.obrigatoriedades.comissaoDeFrenteCount} bailarinos
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sector Navigation & Filters */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Sector Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setSelectedSector('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                    selectedSector === 'all'
                      ? 'bg-amber-500 text-slate-950 font-black shadow'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Todos os Setores ({script.elements.length})
                </button>
                {script.setores.map((sec) => (
                  <button
                    key={sec.sectorNumber}
                    onClick={() => setSelectedSector(sec.sectorNumber)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer flex items-center gap-1 ${
                      selectedSector === sec.sectorNumber
                        ? 'bg-amber-500 text-slate-950 font-black shadow'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span>Setor {sec.sectorNumber}</span>
                  </button>
                ))}
              </div>

              {/* Type Filter Buttons */}
              <div className="flex items-center gap-1 self-start sm:self-auto shrink-0">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                    filterType === 'all' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Tudo
                </button>
                <button
                  onClick={() => setFilterType('alas')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                    filterType === 'alas' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Alas
                </button>
                <button
                  onClick={() => setFilterType('alegorias')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                    filterType === 'alegorias' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Alegorias & Tripés
                </button>
                <button
                  onClick={() => setFilterType('segmentos')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                    filterType === 'segmentos' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Segmentos & Bateria
                </button>
              </div>
            </div>

            {/* Search Input & Sector Description */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
              <div className="text-xs text-slate-300">
                {selectedSector === 'all' ? (
                  <span>Exibindo a marcha completa da agremiação do início à apoteose.</span>
                ) : (
                  <span>
                    <strong>Setor {selectedSector}:</strong> {script.setores.find((s) => s.sectorNumber === selectedSector)?.title} —{' '}
                    <span className="text-slate-400 italic">
                      {script.setores.find((s) => s.sectorNumber === selectedSector)?.themeSynopsis}
                    </span>
                  </span>
                )}
              </div>

              <div className="relative min-w-[200px] sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar ala, alegoria ou personagem..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Sequential Parade Elements Timeline */}
          <div className="space-y-3">
            {filteredElements.map((el) => {
              const badgeClass = getElementBadgeColor(el.type);
              const icon = getElementIcon(el.type);

              return (
                <div
                  key={el.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    el.isAllegoryOrTripod
                      ? 'bg-gradient-to-r from-amber-950/20 via-slate-900 to-slate-950 border-amber-500/50 shadow-md ring-1 ring-amber-500/20'
                      : el.type === 'bateria'
                      ? 'bg-gradient-to-r from-rose-950/20 via-slate-900 to-slate-950 border-rose-500/40 shadow-sm'
                      : el.type === 'comissao_frente'
                      ? 'bg-gradient-to-r from-purple-950/20 via-slate-900 to-slate-950 border-purple-500/40 shadow-sm'
                      : el.type === 'casal_mspb'
                      ? 'bg-gradient-to-r from-emerald-950/20 via-slate-900 to-slate-950 border-emerald-500/40 shadow-sm'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center justify-center shrink-0">
                        <span className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 font-mono font-bold text-xs text-amber-300 flex items-center justify-center">
                          {el.orderNumber}
                        </span>
                        <span className="text-[9px] text-slate-500 font-mono mt-0.5">#{el.orderNumber}</span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border flex items-center gap-1 ${badgeClass}`}
                          >
                            {icon}
                            <span>{el.categoryLabel}</span>
                          </span>

                          <span className="text-[10px] font-medium text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            Setor {el.sectorNumber}: {el.sectorTitle}
                          </span>

                          {el.componentsCount > 0 && (
                            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                              <Users className="w-3 h-3 text-slate-500" />
                              <span>{el.componentsCount} componentes</span>
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm sm:text-base font-black text-white">
                          {el.name}
                        </h4>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {el.description}
                        </p>

                        {el.costumeDetails && (
                          <div className="text-[11px] text-amber-200/90 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 mt-1">
                            <span className="font-bold text-amber-300">Indumentária / Alegoria:</span> {el.costumeDetails}
                          </div>
                        )}

                        {el.highlightPeople && (
                          <div className="text-[11px] text-purple-200/90 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20 mt-1">
                            <span className="font-bold text-purple-300">Destaque de Chão / Personagens:</span> {el.highlightPeople}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredElements.length === 0 && (
              <div className="p-8 text-center text-slate-500 bg-slate-950/40 rounded-2xl border border-dashed border-slate-800">
                Nenhum elemento encontrado para os filtros selecionados.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Documento oficial registrado de acordo com as diretrizes da LIESA / LIGA-RJ / Superliga.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer"
          >
            Fechar Roteiro
          </button>
        </div>
      </div>
    </div>
  );
};
