import React, { useState } from 'react';
import { School, DivisionId } from '../types/carnaval';
import { ParadeScriptService, ParadeScriptElement, ParadeElementType } from '../services/paradeScriptService';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import {
  X,
  Scroll,
  BookOpen,
  Layers,
  Sparkles,
  Users,
  ShieldCheck,
  CheckCircle2,
  Crown,
  Music,
  Compass,
  Printer,
  Drum,
  FileText,
  Palette,
  Flag,
  Search,
  Wrench,
  Award,
  Heart
} from 'lucide-react';

interface RoteiroDesfileModalProps {
  school: School;
  division?: DivisionId;
  onClose: () => void;
}

export const RoteiroDesfileModal: React.FC<RoteiroDesfileModalProps> = ({
  school,
  division,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'cortejo' | 'sinopse_setores' | 'bateria' | 'samba' | 'comissao_casais'>('cortejo');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'alegorias' | 'alas' | 'principais'>('all');
  const [selectedSector, setSelectedSector] = useState<number | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const div = division || school.division;
  const script = ParadeScriptService.getOrGenerateParadeScript(school, div);

  const filteredElements = script.elements.filter((el) => {
    if (selectedSector !== 'all' && el.sectorNumber !== selectedSector) return false;
    if (selectedFilter === 'alegorias') return el.isAllegoryOrTripod;
    if (selectedFilter === 'alas') return el.type === 'ala' || el.type === 'baianas' || el.type === 'passistas' || el.type === 'velha_guarda';
    if (selectedFilter === 'principais') {
      return (
        el.type === 'comissao_frente' ||
        el.type === 'casal_mspb' ||
        el.type === 'abre_alas' ||
        el.type === 'bateria' ||
        el.type === 'baianas' ||
        el.type === 'apoteose'
      );
    }

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

  const getElementBadge = (type: ParadeElementType) => {
    switch (type) {
      case 'comissao_frente':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'casal_mspb':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'abre_alas':
      case 'alegoria':
      case 'apoteose':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'tripe':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      case 'baianas':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/40';
      case 'bateria':
        return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'passistas':
        return 'bg-teal-500/20 text-teal-300 border-teal-500/40';
      case 'velha_guarda':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'musa_destaque_chao':
        return 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-5 animate-fadeIn">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl w-full max-w-5xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Glow Decorativo */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none -mr-20 -mt-20"
          style={{ backgroundColor: school.colors.primary }}
        />

        {/* Modal Header */}
        <div
          className="p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between gap-4 relative z-10"
          style={{
            background: `linear-gradient(135deg, ${school.colors.primary}25 0%, #0f172a 100%)`
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl font-black shadow-xl border-2 shrink-0"
              style={{
                backgroundColor: school.colors.primary,
                color: school.colors.text,
                borderColor: school.colors.border || '#fff'
              }}
            >
              {school.shortName.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 flex items-center gap-1 shadow">
                  <Scroll className="w-3 h-3" />
                  ROTEIRO OFICIAL DO DESFILE • LIVRO ABRE-ALAS (LIESA)
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {script.divisionLabel}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {cleanSchoolName(school)}
              </h2>
              <p className="text-xs text-amber-300 font-serif italic mt-0.5">
                "{script.enredoTitle}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer shrink-0"
              title="Imprimir Livro Abre-Alas"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer shrink-0"
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
            <Scroll className="w-3.5 h-3.5" />
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

        {/* Modal Body Scrollable */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-300 text-xs">
          {/* TAB 1: CORTEJO OFICIAL NA PISTA */}
          {activeTab === 'cortejo' && (
            <div className="space-y-5">
              {/* Setores Narrativos (Filtro Superior) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1 text-amber-400">
                    <Compass className="w-4 h-4" />
                    Setores Dramatúrgicos do Desfile
                  </span>
                  <span>{script.setores.length} Setores</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                  <div
                    onClick={() => setSelectedSector('all')}
                    className={`p-3 rounded-xl border transition cursor-pointer ${
                      selectedSector === 'all'
                        ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-[10px] font-black text-amber-400 uppercase">Todos os Setores</div>
                    <div className="text-xs font-bold text-white mt-0.5">Cortejo Completo</div>
                    <div className="text-[10px] text-slate-400 mt-1">{script.elements.length} elementos</div>
                  </div>

                  {script.setores.map((setor) => (
                    <div
                      key={setor.sectorNumber}
                      onClick={() => setSelectedSector(selectedSector === setor.sectorNumber ? 'all' : setor.sectorNumber)}
                      className={`p-3 rounded-xl border transition cursor-pointer ${
                        selectedSector === setor.sectorNumber
                          ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/30 shadow'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-[10px] font-black text-amber-400 uppercase">Setor {setor.sectorNumber}</div>
                      <div className="text-xs font-bold text-white mt-0.5 line-clamp-2 leading-snug">
                        {setor.title.replace(/^\d+º\s*Setor\s*[-–—:]\s*/i, '').replace(/["“”]/g, '')}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 line-clamp-1 italic">
                        {setor.themeSynopsis}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filtros e Busca */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-bold text-slate-400 mr-1">Filtrar:</span>
                  <button
                    onClick={() => setSelectedFilter('all')}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition cursor-pointer ${
                      selectedFilter === 'all' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Todos ({script.elements.length})
                  </button>
                  <button
                    onClick={() => setSelectedFilter('principais')}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition cursor-pointer ${
                      selectedFilter === 'principais' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Principais
                  </button>
                  <button
                    onClick={() => setSelectedFilter('alegorias')}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition cursor-pointer ${
                      selectedFilter === 'alegorias' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Alegorias & Tripés ({script.obrigatoriedades.totalAlegorias + script.obrigatoriedades.totalTripes})
                  </button>
                  <button
                    onClick={() => setSelectedFilter('alas')}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition cursor-pointer ${
                      selectedFilter === 'alas' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Alas ({script.obrigatoriedades.totalAlas})
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

              {/* Lista do Cortejo */}
              <div className="space-y-3">
                {filteredElements.map((el) => {
                  const badgeClass = getElementBadge(el.type);

                  return (
                    <div
                      key={el.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        el.isAllegoryOrTripod
                          ? 'bg-amber-950/20 border-amber-500/40'
                          : el.type === 'bateria'
                          ? 'bg-red-950/20 border-red-500/40'
                          : el.type === 'comissao_frente' || el.type === 'casal_mspb'
                          ? 'bg-blue-950/20 border-blue-500/40'
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono font-bold text-[11px] text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                              #{String(el.orderNumber).padStart(2, '0')}
                            </span>
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${badgeClass}`}>
                              {el.categoryLabel}
                            </span>
                            <span className="text-[10px] text-amber-300 font-semibold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                              {el.sectorTitle}
                            </span>
                            {el.componentsCount > 0 && (
                              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                <Users className="w-3 h-3 text-slate-500" />
                                {el.componentsCount} desfilantes
                              </span>
                            )}
                          </div>

                          <h4 className="text-sm font-black text-white mt-1">
                            {el.name}
                          </h4>

                          {/* Defesa do Enredo */}
                          <div className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-900/60 p-3 rounded-xl border border-slate-800/70">
                            <span className="text-[10px] font-bold text-amber-400 uppercase block mb-0.5">
                              Defesa do Quesito Enredo & Concepção Dramática:
                            </span>
                            {el.defesaEnredo || el.description}
                          </div>

                          {/* Detalhes Plásticos e Indumentária */}
                          {el.costumeDetails && (
                            <div className="text-[11px] text-amber-200/90 pt-1 font-serif italic border-l-2 border-amber-500/40 pl-2.5">
                              <strong>👗 Indumentária & Concepção Plástica:</strong> {el.costumeDetails}
                            </div>
                          )}

                          {/* Destaques e Composições para Alegorias */}
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

          {/* TAB 2: HISTÓRICO, SINOPSE & SETORIZAÇÃO */}
          {activeTab === 'sinopse_setores' && (
            <div className="space-y-6">
              {/* Capa do Livro Abre-Alas */}
              <div className="p-6 rounded-3xl bg-slate-950 border border-amber-500/30 text-center space-y-3 relative overflow-hidden">
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

              {/* Justificativa do Enredo */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                  <FileText className="w-4 h-4" />
                  <span>Justificativa do Enredo (Defesa Perante o Egrégio Júri)</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line font-serif">
                  {script.justificativaEnredo}
                </div>
              </div>

              {/* Sinopse Oficial Completa */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Sinopse Oficial do Enredo</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line border-l-2 border-amber-500/40 pl-4 py-1 italic font-serif bg-slate-900/40 rounded-r-xl">
                  {script.synopsis}
                </div>
              </div>

              {/* Abordagem Setorizada */}
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

              {/* Pesquisa Bibliográfica */}
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

          {/* TAB 3: FICHA DA BATERIA & BOSSAS */}
          {activeTab === 'bateria' && script.fichaBateria && (
            <div className="space-y-5">
              {/* Cabeçalho da Bateria */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-red-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-black text-red-400 uppercase tracking-wider">
                    <Drum className="w-4 h-4" />
                    <span>Ficha Técnica Oficial da Bateria</span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40">
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

              {/* Quantitativo por Instrumento */}
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

              {/* Defesa dos Arranjos / Bossas */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-red-400 uppercase tracking-wider flex items-center gap-2">
                  <Music className="w-4 h-4" />
                  Defesa dos Arranjos Musicais, Bossas e Paradinhas
                </h4>

                <div className="space-y-3">
                  {script.fichaBateria.bossas.map((b) => (
                    <div key={b.numero} className="p-4 rounded-2xl bg-slate-950/80 border border-red-500/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-white">
                          Arranjo {b.numero}: {b.nome}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40">
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

          {/* TAB 4: SAMBA-ENREDO & DEFESAS */}
          {activeTab === 'samba' && script.fichaSambaEnredo && (
            <div className="space-y-5">
              {/* Ficha Técnica */}
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

              {/* Letra Oficial & Defesa da Melodia */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Letra Oficial */}
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">
                    Letra Oficial do Samba-Enredo
                  </h4>
                  <pre className="text-xs text-amber-200/90 leading-relaxed font-serif whitespace-pre-wrap font-sans bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    {script.fichaSambaEnredo.letra}
                  </pre>
                </div>

                {/* Defesa da Melodia & Letra */}
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

          {/* TAB 5: COMISSÃO, CASAIS & EQUIPE */}
          {activeTab === 'comissao_casais' && (
            <div className="space-y-6">
              {/* Comissão de Frente */}
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

              {/* Casais de Mestre-Sala e Porta-Bandeira */}
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

              {/* Equipe de Barracão e Ateliês */}
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
            <span>Roteiro oficial do Livro Abre-Alas homologado para os 36 julgadores das cabines de notas da LIESA.</span>
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
