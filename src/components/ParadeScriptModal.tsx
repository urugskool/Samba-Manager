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
  Printer,
  Drum,
  FileText,
  Flag,
  Wrench,
  Award,
  Compass
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

  const [activeTab, setActiveTab] = useState<'cortejo' | 'sinopse_setores' | 'bateria' | 'samba' | 'comissao_casais'>('cortejo');
  const [selectedSector, setSelectedSector] = useState<number | 'all'>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredElements = script.elements.filter((el) => {
    if (selectedSector !== 'all' && el.sectorNumber !== selectedSector) return false;
    if (filterType === 'alas' && el.type !== 'ala') return false;
    if (filterType === 'alegorias' && el.type !== 'abre_alas' && el.type !== 'alegoria' && el.type !== 'tripe' && el.type !== 'apoteose') return false;
    if (filterType === 'segmentos' && (el.type === 'ala' || el.type === 'abre_alas' || el.type === 'alegoria' || el.type === 'tripe' || el.type === 'apoteose')) return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = el.name.toLowerCase().includes(q);
      const matchDesc = el.description?.toLowerCase().includes(q) || false;
      const matchCat = el.categoryLabel.toLowerCase().includes(q);
      const matchCostume = el.costumeDetails?.toLowerCase().includes(q) || false;
      const matchDef = el.defesaEnredo?.toLowerCase().includes(q) || false;
      return matchName || matchDesc || matchCat || matchCostume || matchDef;
    }
    return true;
  });

  const getElementBadgeColor = (type: ParadeElementType) => {
    switch (type) {
      case 'comissao_frente':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'abre_alas':
      case 'alegoria':
      case 'apoteose':
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
      case 'musa_destaque_chao':
        return 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[94vh] flex flex-col bg-slate-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 p-5 sm:p-6 text-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-slate-950/20 border border-slate-950/30 flex items-center justify-center shrink-0 shadow-inner">
              <BookOpen className="w-7 h-7 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-950 text-amber-300 shadow">
                  ROTEIRO OFICIAL DE DESFILE • LIVRO ABRE-ALAS (LIESA)
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-5 pt-3 border-b border-slate-800 bg-slate-950/90 overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => setActiveTab('cortejo')}
            className={`px-4 py-2 text-xs font-black rounded-t-xl transition cursor-pointer flex items-center gap-1.5 border-b-2 ${
              activeTab === 'cortejo'
                ? 'bg-slate-900 text-amber-400 border-amber-400'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Roteiro do Desfile (Cortejo)</span>
          </button>
          <button
            onClick={() => setActiveTab('sinopse_setores')}
            className={`px-4 py-2 text-xs font-black rounded-t-xl transition cursor-pointer flex items-center gap-1.5 border-b-2 ${
              activeTab === 'sinopse_setores'
                ? 'bg-slate-900 text-amber-400 border-amber-400'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Histórico, Sinopse & Setores</span>
          </button>
          <button
            onClick={() => setActiveTab('bateria')}
            className={`px-4 py-2 text-xs font-black rounded-t-xl transition cursor-pointer flex items-center gap-1.5 border-b-2 ${
              activeTab === 'bateria'
                ? 'bg-slate-900 text-amber-400 border-amber-400'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Drum className="w-3.5 h-3.5" />
            <span>Ficha da Bateria & Bossas</span>
          </button>
          <button
            onClick={() => setActiveTab('samba')}
            className={`px-4 py-2 text-xs font-black rounded-t-xl transition cursor-pointer flex items-center gap-1.5 border-b-2 ${
              activeTab === 'samba'
                ? 'bg-slate-900 text-amber-400 border-amber-400'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Samba-Enredo & Defesas</span>
          </button>
          <button
            onClick={() => setActiveTab('comissao_casais')}
            className={`px-4 py-2 text-xs font-black rounded-t-xl transition cursor-pointer flex items-center gap-1.5 border-b-2 ${
              activeTab === 'comissao_casais'
                ? 'bg-slate-900 text-amber-400 border-amber-400'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Comissão, Casais & Equipe</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-300 text-xs">
          {activeTab === 'cortejo' && (
            <div className="space-y-5">
              {/* Setores Header Buttons */}
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span className="text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Compass className="w-4 h-4" /> Setores do Desfile (Dramaturgia na Pista)
                  </span>
                  <span>{script.setores.length} Setores</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-xs">
                  <button
                    onClick={() => setSelectedSector('all')}
                    className={`p-2.5 rounded-xl text-left transition cursor-pointer border ${
                      selectedSector === 'all'
                        ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/30'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-[10px] font-black uppercase text-amber-400">Todos</div>
                    <div className="text-xs font-bold text-white mt-0.5">Visão Geral</div>
                  </button>

                  {script.setores.map((sec) => (
                    <button
                      key={sec.sectorNumber}
                      onClick={() => setSelectedSector(selectedSector === sec.sectorNumber ? 'all' : sec.sectorNumber)}
                      className={`p-2.5 rounded-xl text-left transition cursor-pointer border ${
                        selectedSector === sec.sectorNumber
                          ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/30 shadow'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-[10px] font-black uppercase text-amber-400">Setor {sec.sectorNumber}</div>
                      <div className="text-xs font-bold text-white mt-0.5 line-clamp-1">
                        {sec.title.replace(/^\d+º\s*Setor\s*[-–—:]\s*/i, '').replace(/["“”]/g, '')}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-bold text-slate-400 mr-1">Filtrar:</span>
                  <button
                    onClick={() => setFilterType('all')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      filterType === 'all' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Todos ({script.elements.length})
                  </button>
                  <button
                    onClick={() => setFilterType('alas')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      filterType === 'alas' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Alas ({script.obrigatoriedades.totalAlas})
                  </button>
                  <button
                    onClick={() => setFilterType('alegorias')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      filterType === 'alegorias' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Alegorias & Tripés ({script.obrigatoriedades.totalAlegorias + script.obrigatoriedades.totalTripes})
                  </button>
                  <button
                    onClick={() => setFilterType('segmentos')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      filterType === 'segmentos' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Segmentos
                  </button>
                </div>

                <div className="relative min-w-[220px]">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar ala, alegoria ou personagem..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Elements List */}
              <div className="space-y-3">
                {filteredElements.map((el) => {
                  const badgeColor = getElementBadgeColor(el.type);

                  return (
                    <div
                      key={el.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        el.isAllegoryOrTripod
                          ? 'bg-amber-950/20 border-amber-500/40'
                          : el.type === 'bateria'
                          ? 'bg-rose-950/20 border-rose-500/40'
                          : el.type === 'comissao_frente' || el.type === 'casal_mspb'
                          ? 'bg-purple-950/20 border-purple-500/40'
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono font-bold text-[11px] text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                              #{String(el.orderNumber).padStart(2, '0')}
                            </span>
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${badgeColor}`}>
                              {el.categoryLabel}
                            </span>
                            <span className="text-[10px] text-amber-300 font-semibold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                              {el.sectorTitle}
                            </span>
                            {el.componentsCount > 0 && (
                              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                <Users className="w-3 h-3 text-slate-500" />
                                {el.componentsCount} componentes
                              </span>
                            )}
                          </div>

                          <h4 className="text-sm font-black text-white mt-1">
                            {el.name}
                          </h4>

                          <div className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-900/60 p-3 rounded-xl border border-slate-800/70">
                            <span className="text-[10px] font-bold text-amber-400 uppercase block mb-0.5">
                              Defesa do Quesito Enredo & Concepção Dramática:
                            </span>
                            {el.defesaEnredo || el.description}
                          </div>

                          {el.costumeDetails && (
                            <div className="text-[11px] text-amber-200/90 pt-1 font-serif italic border-l-2 border-amber-500/40 pl-2.5">
                              <strong>👗 Indumentária & Concepção Plástica:</strong> {el.costumeDetails}
                            </div>
                          )}

                          {el.detalhesPlasticos?.destaquesComposicoes && (
                            <div className="text-[11px] text-slate-300 pt-1 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                              <strong className="text-amber-400">🏛️ Destaques & Composições de Chassi:</strong> {el.detalhesPlasticos.destaquesComposicoes}
                            </div>
                          )}
                        </div>

                        {el.highlightPeople && (
                          <div className="shrink-0 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 sm:max-w-xs self-start">
                            <span className="text-amber-400 font-bold block text-[10px] uppercase tracking-wider">
                              Destaque / Responsável
                            </span>
                            <span>{el.highlightPeople}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'sinopse_setores' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-slate-950 border border-amber-500/30 text-center space-y-3">
                <div className="text-[10px] uppercase tracking-widest font-black text-amber-400">
                  LIGA INDEPENDENTE DAS ESCOLAS DE SAMBA • LIVRO ABRE-ALAS OFICIAL
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  G.R.E.S. {cleanSchoolName(school).toUpperCase()}
                </h1>
                <div className="text-sm font-serif italic text-amber-300">
                  "{script.enredoTitle}"
                </div>
                <div className="pt-3 border-t border-slate-800 flex flex-wrap justify-center gap-6 text-xs text-slate-300">
                  <span>Presidente: <strong>{script.presidente || 'Diretoria Executiva'}</strong></span>
                  <span>Carnavalesco: <strong>{script.carnavalesco}</strong></span>
                  <span>Linha Temática: <strong>{script.enredoTheme}</strong></span>
                  <span>Divisão: <strong>{script.divisionLabel}</strong></span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                  <FileText className="w-4 h-4" />
                  <span>Justificativa do Enredo (Defesa para a Comissão Julgadora)</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line font-serif">
                  {script.justificativaEnredo}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Sinopse Oficial do Enredo</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line border-l-2 border-amber-500/40 pl-4 py-1 italic font-serif bg-slate-900/40 rounded-r-xl">
                  {script.synopsis}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                  <Compass className="w-4 h-4" />
                  <span>Abordagem Setorizada (Dramaturgia do Desfile)</span>
                </div>
                <div className="space-y-3">
                  {script.setores.map((sec) => (
                    <div key={sec.sectorNumber} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black text-amber-400 uppercase">
                          {sec.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                          Setor {sec.sectorNumber}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {sec.resumoConceitual || sec.themeSynopsis}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {script.pesquisaBibliografica && script.pesquisaBibliografica.length > 0 && (
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                    <Award className="w-4 h-4" />
                    <span>Pesquisa Bibliográfica & Documental</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-5 font-serif">
                    {script.pesquisaBibliografica.map((ref, i) => (
                      <li key={i}>{ref}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'bateria' && script.fichaBateria && (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-rose-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-black text-rose-400 uppercase tracking-wider">
                    <Drum className="w-4 h-4" />
                    <span>Ficha Técnica Oficial da Bateria</span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    {script.fichaBateria.totalRitmistas} Ritmistas
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Diretor Geral de Bateria:</span>
                    <strong className="text-white text-sm">{script.fichaBateria.mestreGeral}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Diretoria de Naipes:</span>
                    <span className="text-slate-300">{script.fichaBateria.diretores}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800 font-sans">
                  {script.fichaBateria.particularidades}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                  Quantitativo de Instrumentos por Grupo
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {Object.entries(script.fichaBateria.instrumentos).map(([inst, count]) => (
                    <div key={inst} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400 truncate">{inst}</div>
                      <div className="text-sm font-black text-white font-mono">{count}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-black text-rose-400 uppercase tracking-wider flex items-center gap-2">
                  <Music className="w-4 h-4" />
                  Defesa dos Arranjos Musicais, Bossas e Paradinhas
                </h4>

                <div className="space-y-3">
                  {script.fichaBateria.bossas.map((b) => (
                    <div key={b.numero} className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-white">
                          Arranjo {b.numero}: {b.nome}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                          Bossa {b.numero}
                        </span>
                      </div>
                      <div className="text-[11px] text-amber-300 font-serif italic">
                        🎶 <strong>Trecho do Samba:</strong> "{b.trechoSamba}"
                      </div>
                      <div className="text-[11px] text-slate-400">
                        ✋ <strong>Sinal do Mestre:</strong> {b.sinal}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1 border-t border-slate-800/80">
                        {b.defesa}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'samba' && script.fichaSambaEnredo && (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-amber-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                    <Music className="w-4 h-4" />
                    <span>Ficha Técnica do Samba-Enredo</span>
                  </div>
                  <span className="text-xs font-bold text-white">
                    Intérprete: {script.fichaSambaEnredo.interprete}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Autoria: <strong className="text-white">{script.fichaSambaEnredo.compositores.join(', ')}</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">
                    Letra Oficial do Samba-Enredo
                  </h4>
                  <pre className="text-xs text-amber-200/90 leading-relaxed font-serif whitespace-pre-wrap font-sans bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    {script.fichaSambaEnredo.letra}
                  </pre>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                      Defesa da Melodia & Harmonia
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {script.fichaSambaEnredo.defesaMelodia}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                    <h4 className="text-xs font-black text-white uppercase tracking-wider">
                      Defesa da Letra (Verso a Verso)
                    </h4>
                    <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                      {script.fichaSambaEnredo.defesaLetra.map((def, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                          <div className="text-[11px] font-bold text-amber-300 font-serif italic">
                            "{def.versoOuEstrofe}"
                          </div>
                          <p className="text-[11px] text-slate-300 font-sans leading-snug">
                            {def.explicacao}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comissao_casais' && (
            <div className="space-y-6">
              {script.fichaComissaoFrente && (
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-purple-500/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-black text-purple-400 uppercase tracking-wider">
                      <Crown className="w-4 h-4" />
                      <span>Ficha Técnica: Comissão de Frente</span>
                    </div>
                    <span className="text-xs font-bold text-purple-300">
                      {script.fichaComissaoFrente.totalComponentes} Integrantes
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Coreógrafo(a):</span>
                      <strong className="text-white">{script.fichaComissaoFrente.coreografo}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Encenação:</span>
                      <strong className="text-white">{script.fichaComissaoFrente.nomeApresentacao}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {script.fichaComissaoFrente.sinopseAcao}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                      Atos Coreográficos Perante as Cabines de Julgamento:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {script.fichaComissaoFrente.atos.map((ato, i) => (
                        <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                          <div className="text-[11px] font-bold text-purple-300">{ato.ato}</div>
                          <p className="text-[11px] text-slate-300 leading-snug">{ato.descricao}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {script.casaisMSPB && script.casaisMSPB.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-blue-400 uppercase tracking-wider flex items-center gap-2">
                    <Flag className="w-4 h-4" />
                    Casais Oficiais de Mestre-Sala e Porta-Bandeira
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {script.casaisMSPB.map((c) => (
                      <div key={c.numeroCasal} className="p-4 rounded-2xl bg-slate-950/80 border border-blue-500/30 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-white">
                            {c.numeroCasal}º Casal de MS & PB
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40">
                            Pavilhão Oficial
                          </span>
                        </div>
                        <div className="text-xs">
                          Porta-Bandeira: <strong className="text-white">{c.portaBandeira}</strong>
                          <br />
                          Mestre-Sala: <strong className="text-white">{c.mestreSala}</strong>
                        </div>
                        <div className="text-[11px] text-amber-300 font-serif italic">
                          👗 <strong>Fantasia:</strong> {c.fantasiaCasal}
                        </div>
                        {c.fantasiaGuardioes && (
                          <div className="text-[10px] text-slate-400">
                            🛡️ <strong>Guardiões:</strong> {c.fantasiaGuardioes}
                          </div>
                        )}
                        <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1 border-t border-slate-800">
                          {c.defesaDança}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {script.profissionaisEscola && (
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                    <Wrench className="w-4 h-4" />
                    <span>Profissionais da Escola & Equipe de Criação</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Carnavalesco</span>
                      <strong className="text-white">{script.carnavalesco}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Direção de Carnaval</span>
                      <strong className="text-white">{script.profissionaisEscola.diretorCarnaval || 'Direção Executiva'}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Harmonia Geral</span>
                      <strong className="text-white">{script.profissionaisEscola.diretorHarmonia || 'Direção de Harmonia'}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Produção de Barracão</span>
                      <strong className="text-white">{script.profissionaisEscola.diretorBarracao || 'Diretoria de Barracão'}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Ateliê de Costura</span>
                      <strong className="text-white">{script.profissionaisEscola.chefeCostura || 'Equipe de Ateliê'}</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Esculturas & Formas</span>
                      <strong className="text-white">{script.profissionaisEscola.chefeEscultura || 'Equipe de Escultura'}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Roteiro oficial homologado para os julgadores da LIESA / Superliga.</span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer shadow-lg shadow-amber-500/20"
          >
            Fechar Roteiro
          </button>
        </div>
      </div>
    </div>
  );
};
