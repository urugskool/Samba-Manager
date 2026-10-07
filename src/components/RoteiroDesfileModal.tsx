import React, { useState } from 'react';
import { School, DivisionId } from '../types/carnaval';
import { ParadeScriptService, ParadeScriptElement } from '../services/paradeScriptService';
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
  Palette,
  Compass,
  Eye
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
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'alegorias' | 'alas' | 'principais'>('all');
  const [selectedSector, setSelectedSector] = useState<number | 'all'>('all');

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
    return true;
  });

  const getElementBadge = (type: ParadeScriptElement['type']) => {
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
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Glow Decorativo */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none -mr-20 -mt-20"
          style={{ backgroundColor: school.colors.primary }}
        />

        {/* Modal Header */}
        <div
          className="p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between gap-4 relative z-10"
          style={{
            background: `linear-gradient(135deg, ${school.colors.primary}22 0%, #0f172a 100%)`
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
                <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 flex items-center gap-1">
                  <Scroll className="w-3 h-3" />
                  ROTEIRO OFICIAL DO DESFILE • LIVRO ABRE-ALAS
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

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-300 text-xs">
          {/* Ficha Técnica & Sinopse do Enredo */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Sinopse */}
            <div className="lg:col-span-2 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-white text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Argumento & Sinopse do Enredo</span>
                <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-slate-800 text-amber-300 ml-auto">
                  Tema: {script.enredoTheme}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {script.synopsis}
              </p>
              <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400">
                <span>Carnavalesco(a): <strong className="text-white">{script.carnavalesco}</strong></span>
                <span>•</span>
                <span>Intérprete Oficial: <strong className="text-white">{school.staff.interprete.name}</strong></span>
                <span>•</span>
                <span>Mestre de Bateria: <strong className="text-white">{school.staff.mestreBateria.name}</strong></span>
              </div>
            </div>

            {/* Quadro de Obrigatoriedades Homologadas */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-white text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Obrigatoriedades na Pista</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Total Componentes</span>
                  <span className="font-bold text-white text-sm font-mono">
                    {script.obrigatoriedades.totalComponentes.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Alas de Enredo</span>
                  <span className="font-bold text-amber-300 text-sm font-mono">
                    {script.obrigatoriedades.totalAlas} alas
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Carros Alegóricos</span>
                  <span className="font-bold text-white text-sm font-mono">
                    {script.obrigatoriedades.totalAlegorias} carros
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Tripés Cenográficos</span>
                  <span className="font-bold text-white text-sm font-mono">
                    {script.obrigatoriedades.totalTripes} tripés
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Ala das Baianas</span>
                  <span className="font-bold text-pink-300 text-sm font-mono">
                    {script.obrigatoriedades.baianasCount} baianas
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Bateria Oficial</span>
                  <span className="font-bold text-red-300 text-sm font-mono">
                    {script.obrigatoriedades.ritmistasCount} ritmistas
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Setores Narrativos do Enredo */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-white text-xs uppercase tracking-wider">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Divisão em Setores Narrativos (Avenida)</span>
              </div>
              <span className="text-[11px] text-slate-400">
                {script.setores.length} Setores de Desfile
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {script.setores.map((setor) => (
                <div
                  key={setor.sectorNumber}
                  onClick={() => setSelectedSector(selectedSector === setor.sectorNumber ? 'all' : setor.sectorNumber)}
                  className={`p-3.5 rounded-2xl border transition cursor-pointer ${
                    selectedSector === setor.sectorNumber
                      ? 'bg-amber-500/15 border-amber-400 ring-2 ring-amber-400/40 shadow-lg'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-black text-amber-400 mb-1">
                    <span>SETOR {setor.sectorNumber}</span>
                    {selectedSector === setor.sectorNumber && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400 text-slate-950">Filtro Ativo</span>
                    )}
                  </div>
                  <h4 className="font-bold text-white text-xs leading-snug line-clamp-2">
                    {setor.title.replace(`Setor ${setor.sectorNumber}: `, '')}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {setor.themeSynopsis}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Filtros da Lista de Elementos */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-slate-400 mr-1">Filtrar Elementos:</span>
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                  selectedFilter === 'all'
                    ? 'bg-amber-500 text-slate-950 font-black shadow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Todos ({script.elements.length})
              </button>
              <button
                onClick={() => setSelectedFilter('principais')}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                  selectedFilter === 'principais'
                    ? 'bg-amber-500 text-slate-950 font-black shadow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Principais (Comissão, Casal, Bateria, Carros)
              </button>
              <button
                onClick={() => setSelectedFilter('alegorias')}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                  selectedFilter === 'alegorias'
                    ? 'bg-amber-500 text-slate-950 font-black shadow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Alegorias & Tripés ({script.obrigatoriedades.totalAlegorias + script.obrigatoriedades.totalTripes})
              </button>
              <button
                onClick={() => setSelectedFilter('alas')}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                  selectedFilter === 'alas'
                    ? 'bg-amber-500 text-slate-950 font-black shadow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Alas de Enredo ({script.obrigatoriedades.totalAlas})
              </button>
            </div>

            {selectedSector !== 'all' && (
              <button
                onClick={() => setSelectedSector('all')}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Limpar filtro de Setor {selectedSector}</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Lista Sequencial dos Elementos do Roteiro */}
          <div className="space-y-3">
            {filteredElements.map((el) => {
              const badgeClass = getElementBadge(el.type);

              return (
                <div
                  key={el.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    el.isAllegoryOrTripod
                      ? 'bg-amber-950/15 border-amber-500/30'
                      : el.type === 'bateria'
                      ? 'bg-red-950/15 border-red-500/30'
                      : el.type === 'comissao_frente' || el.type === 'casal_mspb'
                      ? 'bg-blue-950/15 border-blue-500/30'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-bold text-[11px] text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                          #{el.orderNumber}
                        </span>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${badgeClass}`}>
                          {el.categoryLabel}
                        </span>
                        <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          Setor {el.sectorNumber}
                        </span>
                        {el.componentsCount > 0 && (
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Users className="w-3 h-3 text-slate-500" />
                            ~{el.componentsCount} desfilantes
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-black text-white mt-1">
                        {el.name}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {el.description}
                      </p>
                      {el.costumeDetails && (
                        <div className="text-[11px] text-amber-300/90 pt-1 font-serif italic">
                          👗 <strong>Indumentária & Estrutura:</strong> {el.costumeDetails}
                        </div>
                      )}
                    </div>

                    {el.highlightPeople && (
                      <div className="shrink-0 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 sm:max-w-xs self-start">
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

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-4">
          <div className="text-[11px] text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Roteiro oficial homologado para os 36 julgadores das cabines de notas.</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer shadow-lg shadow-amber-500/20"
          >
            Fechar Roteiro
          </button>
        </div>
      </div>
    </div>
  );
};
