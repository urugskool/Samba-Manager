import React, { useState } from 'react';
import { School, DivisionId, Enredo, EnredoThemeType } from '../types/carnaval';
import {
  EnredoResearchService,
  EnredoResearchDossier,
  EnredoApproachOption
} from '../services/enredoResearchService';
import { ParadeScript } from '../services/paradeScriptService';
import { soundService } from '../services/soundService';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import {
  X,
  Sparkles,
  Search,
  BookOpen,
  Scroll,
  Layers,
  Crown,
  Check,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Flame,
  Shield,
  Palette,
  Lightbulb,
  Edit3,
  Feather,
  Compass,
  Trophy,
  Users,
  Music,
  Eye,
  CheckCircle2,
  Info
} from 'lucide-react';

interface EnredoCreatorModalProps {
  school: School;
  division?: DivisionId;
  onSaveEnredo: (newEnredo: Enredo, script: ParadeScript) => void;
  onClose: () => void;
  initialTheme?: string;
  initialNotes?: string;
}

const THEME_INSPIRATION_CHIPS = [
  { theme: 'Lampião e Maria Bonita no Sertão Encantado', genre: 'Regional' as EnredoThemeType },
  { theme: 'O Canto Sagrado dos Orixás: As Águas de Oxum e o Ferro de Ogum', genre: 'Afro-Brasileiro' as EnredoThemeType },
  { theme: 'Canudos: A Guerra Santa do Fim do Mundo', genre: 'Histórico' as EnredoThemeType },
  { theme: 'Amazônia: O Choro da Mata e a Resistência dos Povos da Floresta', genre: 'Regional' as EnredoThemeType },
  { theme: 'Mitologia Nórdica: Os Nove Reinos e a Batalha do Ragnarök', genre: 'Mitológico' as EnredoThemeType },
  { theme: 'A Revolta da Chibata e a Glória de João Cândido', genre: 'Crítica Social' as EnredoThemeType },
  { theme: 'A Era de Ouro do Rádio e as Divas da Música Brasileira', genre: 'Homenagem' as EnredoThemeType },
  { theme: 'O Reino da Ilusão: O Circo Mágico dos Sonhos', genre: 'Lúdico' as EnredoThemeType },
  { theme: 'Ouro Preto e o Barroco: O Mestre Aleijadinho em Minas Gerais', genre: 'Histórico' as EnredoThemeType },
  { theme: 'Inteligência Artificial: O Algoritmo que Dança no Tamborim', genre: 'Ciência e Tecnologia' as EnredoThemeType }
];

export const EnredoCreatorModal: React.FC<EnredoCreatorModalProps> = ({
  school,
  division,
  onSaveEnredo,
  onClose,
  initialTheme = '',
  initialNotes = ''
}) => {
  const effectiveDiv = division || school.division;
  const schoolClean = cleanSchoolName(school);

  // Estados de Navegação
  const [step, setStep] = useState<'input' | 'researching' | 'dossier' | 'script'>('input');

  // Estados do Formulário de Entrada
  const [themeInput, setThemeInput] = useState(initialTheme);
  const [notesInput, setNotesInput] = useState(initialNotes);
  const [genreInput, setGenreInput] = useState<EnredoThemeType | 'auto'>('auto');

  // Estados do Sistema de Pesquisa
  const [dossier, setDossier] = useState<EnredoResearchDossier | null>(null);
  const [researchPhase, setResearchPhase] = useState<string>('Conectando ao acervo carnavalesco...');
  const [selectedApproach, setSelectedApproach] = useState<EnredoApproachOption | null>(null);

  // Estados de Customização
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customSynopsis, setCustomSynopsis] = useState('');

  // Roteiro Gerado
  const [generatedScript, setGeneratedScript] = useState<ParadeScript | null>(null);
  const [selectedScriptTab, setSelectedScriptTab] = useState<'setores' | 'segmentos' | 'resumo'>('setores');

  // Dispara o Sistema de Pesquisa Integrado
  const handleStartResearch = async () => {
    if (!themeInput.trim()) return;

    soundService.playClick();
    setStep('researching');
    setResearchPhase('Consultando acervo histórico e referências culturais...');

    // Feedback progressivo da pesquisa temática
    const timer1 = setTimeout(() => {
      setResearchPhase('Catalogando figuras históricas, simbolismos e iconografia...');
    }, 600);

    const timer2 = setTimeout(() => {
      setResearchPhase('Modelando abordagens dramáticas e paletas estéticas para a passarela...');
    }, 1300);

    try {
      const result = await EnredoResearchService.conductResearch(
        school,
        themeInput,
        notesInput,
        genreInput === 'auto' ? undefined : genreInput
      );

      clearTimeout(timer1);
      clearTimeout(timer2);

      setDossier(result);
      if (result.approaches && result.approaches.length > 0) {
        const initial = result.approaches[0];
        setSelectedApproach(initial);
        setCustomTitle(initial.suggestedTitle);
        setCustomSynopsis(initial.synopsis);
      }
      setStep('dossier');
      soundService.playSuccess();
    } catch {
      clearTimeout(timer1);
      clearTimeout(timer2);
      // Fallback
      const fallback = EnredoResearchService.generateProceduralDossier(
        school,
        themeInput,
        notesInput,
        genreInput === 'auto' ? undefined : genreInput
      );
      setDossier(fallback);
      if (fallback.approaches.length > 0) {
        setSelectedApproach(fallback.approaches[0]);
        setCustomTitle(fallback.approaches[0].suggestedTitle);
        setCustomSynopsis(fallback.approaches[0].synopsis);
      }
      setStep('dossier');
    }
  };

  // Seleciona uma abordagem e atualiza os campos de customização
  const handleSelectApproach = (approach: EnredoApproachOption) => {
    soundService.playClick();
    setSelectedApproach(approach);
    setCustomTitle(approach.suggestedTitle);
    setCustomSynopsis(approach.synopsis);
  };

  // Gera o desfile e o roteiro a partir da abordagem escolhida
  const handleGenerateParade = () => {
    if (!selectedApproach) return;

    soundService.playClick();

    // Aplica customizações caso o jogador tenha alterado o título ou sinopse
    const finalApproach: EnredoApproachOption = {
      ...selectedApproach,
      suggestedTitle: customTitle.trim() || selectedApproach.suggestedTitle,
      synopsis: customSynopsis.trim() || selectedApproach.synopsis
    };

    const script = EnredoResearchService.buildParadeScript(school, finalApproach, effectiveDiv);
    setGeneratedScript(script);
    setStep('script');
    soundService.playLevelUp();
  };

  // Homologa e salva o enredo e o roteiro na escola do jogador
  const handleConfirmAndHomologate = () => {
    if (!selectedApproach || !generatedScript) return;

    const finalApproach: EnredoApproachOption = {
      ...selectedApproach,
      suggestedTitle: customTitle.trim() || selectedApproach.suggestedTitle,
      synopsis: customSynopsis.trim() || selectedApproach.synopsis
    };

    const enredo = EnredoResearchService.createEnredoFromApproach(school, finalApproach);
    soundService.playVictory();
    onSaveEnredo(enredo, generatedScript);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border-2 border-amber-500/60 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Cabeçalho do Modal */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-950 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Pesquisa Temática & Criação Autoral
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {schoolClean}
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-black text-white tracking-tight">
                Criador de Enredo & Roteiro de Desfile
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Indicador de Passos */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] font-bold text-slate-400">
              <span className={step === 'input' ? 'text-amber-400' : 'text-slate-500'}>1. Tema</span>
              <span>›</span>
              <span className={step === 'researching' || step === 'dossier' ? 'text-amber-400' : 'text-slate-500'}>2. Pesquisa & Abordagem</span>
              <span>›</span>
              <span className={step === 'script' ? 'text-amber-400' : 'text-slate-500'}>3. Roteiro do Desfile</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Conteúdo Dinâmico Baseado no Passo */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* PASSO 1: INDICAÇÃO DO TEMA E RESUMO */}
          {step === 'input' && (
            <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 block mb-1">
                    Liberdade Criativa Total: Você escolhe a história, o jogo cria o desfile!
                  </strong>
                  Indique o tema que deseja levar para a passarela e, opcionalmente, um resumo ou ideias centrais. Nosso
                  <strong> sistema de pesquisa carnavalesca integrado</strong> investigará as raízes históricas, personagens,
                  simbolismos e apresentará diferentes abordagens para você decidir como sua escola contará essa história!
                </div>
              </div>

              {/* Campo do Tema */}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Tema / Assunto do Enredo *</span>
                  <span className="text-[10px] text-amber-400 font-bold lowercase">obrigatório</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={themeInput}
                    onChange={(e) => setThemeInput(e.target.value)}
                    placeholder="Ex: Lampião e o Cangaço, O Egito dos Faraós, Canudos, Mitologia Nórdica..."
                    className="w-full px-4 py-3.5 bg-slate-950 border-2 border-slate-700 rounded-2xl text-sm font-bold text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
                    autoFocus
                  />
                  <Search className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Sugestões Rápidas de Temas */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  Sugestões de temas criativos para inspiração rápida:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {THEME_INSPIRATION_CHIPS.map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setThemeInput(chip.theme);
                        setGenreInput(chip.genre);
                        soundService.playClick();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-slate-700/60 hover:border-amber-500/40 text-[11px] font-medium transition cursor-pointer"
                    >
                      {chip.theme}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resumo Opcional */}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Resumo / Ideias Preliminares (Opcional)</span>
                  <span className="text-[10px] text-slate-500 lowercase font-normal">pode deixar em branco</span>
                </label>
                <textarea
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="Ex: Gostaria de focar no lado poético e místico do sertão, mostrando Padre Cícero, o cordel e uma apoteose com Maria Bonita como rainha guerreira..."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
                />
                <p className="text-[10px] text-slate-500">
                  💡 Caso você informe apenas o tema, o sistema de pesquisa fará o levantamento temático completo de forma automática!
                </p>
              </div>

              {/* Vertente / Gênero Temático Opcional */}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                  Vertente Temática Desejada
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'auto', label: '🤖 Automática (Identificar)' },
                    { id: 'Histórico', label: '📜 Histórico' },
                    { id: 'Afro-Brasileiro', label: '🥁 Afro-Brasileiro' },
                    { id: 'Regional', label: '🌵 Regional / Sertão' },
                    { id: 'Mitológico', label: '⚡ Mitológico' },
                    { id: 'Crítica Social', label: '✊ Crítica Social' },
                    { id: 'Cultural', label: '🎭 Cultural & Folclore' },
                    { id: 'Lúdico', label: '🎪 Lúdico / Sonho' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setGenreInput(opt.id as any)}
                      className={`p-2.5 rounded-xl text-left font-bold text-xs border transition cursor-pointer ${
                        genreInput === opt.id
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botão de Ação */}
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleStartResearch}
                  disabled={!themeInput.trim()}
                  className={`px-6 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2.5 shadow-xl transition cursor-pointer ${
                    themeInput.trim()
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-110 shadow-amber-500/20 active:scale-95'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span>Iniciar Pesquisa Temática Integrada</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* PASSO DE CARREGAMENTO / PESQUISA */}
          {step === 'researching' && (
            <div className="max-w-md mx-auto py-16 text-center space-y-6 animate-fadeIn">
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin" />
                <div className="absolute inset-3 rounded-full bg-slate-950 flex items-center justify-center text-amber-400">
                  <Search className="w-8 h-8 animate-pulse" />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-black text-white">
                  Investigando o Enredo: "{themeInput}"
                </h4>
                <p className="text-xs text-amber-300 font-mono animate-pulse">
                  {researchPhase}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left text-[11px] text-slate-400 space-y-2">
                <div className="flex items-center gap-2 text-slate-300 font-bold">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>Etapas da Pesquisa Integrada:</span>
                </div>
                <ul className="space-y-1 text-slate-400">
                  <li className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="w-3 h-3" /> Resgate de matrizes históricas e culturais
                  </li>
                  <li className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="w-3 h-3" /> Identificação de arquétipos, símbolos e paleta cromática
                  </li>
                  <li className="flex items-center gap-1.5 text-amber-300">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping mr-1" />
                    Elaboração de 4 abordagens narrativas contrastantes
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* PASSO 2: DOSSIÊ DE PESQUISA & SELEÇÃO DE ABORDAGEM */}
          {step === 'dossier' && dossier && (
            <div className="space-y-6 animate-fadeIn">
              {/* Banner de Síntese da Pesquisa */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border border-amber-500/40 shadow-xl space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase">
                      Dossiê Concluído
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Gênero: <strong>{dossier.detectedGenre}</strong>
                    </span>
                  </div>
                  <button
                    onClick={() => setStep('input')}
                    className="text-xs text-amber-400 hover:text-amber-300 font-bold underline flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Alterar tema ou termo de pesquisa
                  </button>
                </div>

                <h4 className="text-base sm:text-xl font-black text-white">
                  Resultados da Pesquisa: "{dossier.theme}"
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {dossier.historicalContext}
                </p>

                {/* Cards de Elementos Revelados pela Pesquisa */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5 text-[11px]">
                      <Users className="w-3.5 h-3.5" /> Personagens Centrais:
                    </span>
                    <p className="text-[11px] text-slate-300">
                      {dossier.centralFigures.slice(0, 3).join(', ')}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <span className="font-bold text-blue-400 flex items-center gap-1.5 text-[11px]">
                      <Palette className="w-3.5 h-3.5" /> Iconografia & Símbolos:
                    </span>
                    <p className="text-[11px] text-slate-300">
                      {dossier.iconography.slice(0, 3).join(', ')}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-[11px]">
                      <Flame className="w-3.5 h-3.5" /> Paleta Recomendada:
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="flex gap-1">
                        {dossier.recommendedPalette.colors.map((c, i) => (
                          <span
                            key={i}
                            className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-300 truncate">
                        {dossier.recommendedPalette.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEÇÃO PRINCIPAL: ESCOLHA DA ABORDAGEM NARRATIVA */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                      <Feather className="w-4 h-4 text-amber-400" />
                      <span>Escolha a Abordagem Narrativa do seu Desfile</span>
                    </h4>
                    <p className="text-xs text-slate-400">
                      O enredo dita o desfile. Selecione qual vertente você deseja que a {schoolClean} defenda na passarela:
                    </p>
                  </div>
                  <span className="text-xs text-amber-400 font-bold">
                    {dossier.approaches.length} opções modeladas
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dossier.approaches.map((approach) => {
                    const isSelected = selectedApproach?.id === approach.id;

                    return (
                      <div
                        key={approach.id}
                        onClick={() => handleSelectApproach(approach)}
                        className={`p-4 sm:p-5 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden ${
                          isSelected
                            ? 'bg-gradient-to-br from-amber-950/50 via-slate-900 to-slate-900 border-amber-400 shadow-xl shadow-amber-500/10'
                            : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 p-1 rounded-full bg-amber-400 text-slate-950">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                isSelected
                                  ? 'bg-amber-500 text-slate-950'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {approach.badge}
                            </span>
                            <span className="text-xs font-bold text-white">
                              {approach.name}
                            </span>
                          </div>

                          <h5 className="text-sm font-black text-amber-300 leading-snug">
                            "{approach.suggestedTitle}"
                          </h5>

                          <p className="text-[11px] text-slate-400 italic">
                            {approach.subTitle}
                          </p>

                          <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                            {approach.narrativeAxis}
                          </p>
                        </div>

                        {/* Setores Preview */}
                        <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            Setorização na Passarela (4 Setores):
                          </span>
                          <div className="space-y-1 text-[11px] text-slate-300">
                            {approach.setorizacaoPreview.slice(0, 3).map((s, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 truncate">
                                <span className="w-4 h-4 rounded-full bg-slate-800 text-amber-400 text-[9px] font-bold flex items-center justify-center shrink-0">
                                  {s.sectorNumber}
                                </span>
                                <span className="truncate">{s.title.replace(/^Setor \d+:\s*/, '')}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Destaque das Cores & Estilo */}
                        <div className="flex items-center justify-between text-[11px] pt-2 text-slate-400">
                          <span className="truncate">{approach.aestheticStyle.split(',')[0]}</span>
                          <div className="flex gap-1 shrink-0">
                            {approach.dominatColors.map((c, i) => (
                              <span
                                key={i}
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PAINEL DE PERSONALIZAÇÃO LIVRE DO TÍTULO E SINOPSE */}
              {selectedApproach && (
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Edit3 className="w-3.5 h-3.5" />
                      Personalizar Título e Sinopse da Abordagem Escolhida (Opcional):
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEditingTitle(!isEditingTitle)}
                      className="text-xs text-slate-400 hover:text-white font-bold underline cursor-pointer"
                    >
                      {isEditingTitle ? 'Fechar Edição' : 'Editar Detalhes'}
                    </button>
                  </div>

                  {isEditingTitle ? (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-400 uppercase">
                          Título Oficial do Enredo
                        </label>
                        <input
                          type="text"
                          value={customTitle}
                          onChange={(e) => setCustomTitle(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-bold focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-400 uppercase">
                          Sinopse Oficial do Enredo
                        </label>
                        <textarea
                          value={customSynopsis}
                          onChange={(e) => setCustomSynopsis(e.target.value)}
                          rows={4}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-300">
                      <strong>Título Atual:</strong> "{customTitle}"
                    </div>
                  )}
                </div>
              )}

              {/* Botão de Ação: Gerar Desfile */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800 transition cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" /> Voltar ao Tema
                </button>

                <button
                  type="button"
                  onClick={handleGenerateParade}
                  disabled={!selectedApproach}
                  className="px-6 py-3.5 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-110 shadow-xl shadow-amber-500/20 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Gerar Desfile & Roteiro Completo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* PASSO 3: ROTEIRO DE DESFILE GERADO & HOMOLOGAÇÃO */}
          {step === 'script' && generatedScript && selectedApproach && (
            <div className="space-y-6 animate-fadeIn">
              {/* Ficha Técnica do Desfile Criado */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-indigo-950/60 border-2 border-amber-500/50 shadow-xl space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase">
                      Desfile Formado com Sucesso
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Divisão: <strong>{generatedScript.divisionLabel}</strong>
                    </span>
                  </div>
                  <span className="text-xs text-amber-300 font-bold">
                    O enredo ditou todo o cortejo!
                  </span>
                </div>

                <div>
                  <h4 className="text-base sm:text-2xl font-black text-white leading-tight">
                    {generatedScript.enredoTitle}
                  </h4>
                  <p className="text-xs text-amber-300/90 font-medium italic mt-0.5">
                    {selectedApproach.subTitle}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300 border-t border-slate-800">
                  <span><strong>Comissão de Frente:</strong> {generatedScript.obrigatoriedades.comissaoDeFrenteCount} bailarinos</span>
                  <span>•</span>
                  <span><strong>Alegorias:</strong> {generatedScript.obrigatoriedades.totalAlegorias}</span>
                  <span>•</span>
                  <span><strong>Tripés:</strong> {generatedScript.obrigatoriedades.totalTripes}</span>
                  <span>•</span>
                  <span><strong>Baianas:</strong> {generatedScript.obrigatoriedades.baianasCount}</span>
                  <span>•</span>
                  <span><strong>Bateria:</strong> {generatedScript.obrigatoriedades.ritmistasCount}</span>
                  <span>•</span>
                  <span><strong>Total Alas:</strong> {generatedScript.obrigatoriedades.totalAlas}</span>
                </div>
              </div>

              {/* Navegação de Abas do Roteiro */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <button
                  type="button"
                  onClick={() => setSelectedScriptTab('setores')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    selectedScriptTab === 'setores'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Setores da Passarela ({generatedScript.setores.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedScriptTab('segmentos')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    selectedScriptTab === 'segmentos'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>Segmentos & Alegorias ({generatedScript.elements.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedScriptTab('resumo')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    selectedScriptTab === 'resumo'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Sinopse Oficial Completa</span>
                </button>
              </div>

              {/* ABA 1: SETORES DA PASSARELA */}
              {selectedScriptTab === 'setores' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                  {generatedScript.setores.map((setor) => (
                    <div
                      key={setor.sectorNumber}
                      className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                          {setor.sectorNumber}
                        </span>
                        <h5 className="font-bold text-sm text-white">
                          {setor.title}
                        </h5>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {setor.themeSynopsis}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* ABA 2: SEGMENTOS & ELEMENTOS TEMÁTICOS */}
              {selectedScriptTab === 'segmentos' && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {generatedScript.elements.slice(0, 10).map((el) => (
                      <div
                        key={el.id}
                        className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold uppercase">
                            {el.categoryLabel}
                          </span>
                          <span className="text-slate-400">Setor {el.sectorNumber}</span>
                        </div>
                        <h5 className="text-xs font-black text-white">
                          {el.name}
                        </h5>
                        <p className="text-[11px] text-slate-300 line-clamp-2">
                          {el.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  {generatedScript.elements.length > 10 && (
                    <p className="text-[11px] text-slate-400 text-center italic">
                      + mais {generatedScript.elements.length - 10} alas e segmentos detalhados no Livro Abre-Alas completo!
                    </p>
                  )}
                </div>
              )}

              {/* ABA 3: SINOPSE OFICIAL COMPLETA */}
              {selectedScriptTab === 'resumo' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs leading-relaxed text-slate-200 animate-fadeIn whitespace-pre-line">
                  {generatedScript.synopsis}
                </div>
              )}

              {/* Botões de Ação Final */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep('dossier')}
                  className="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800 transition cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" /> Escolher Outra Abordagem
                </button>

                <button
                  type="button"
                  onClick={handleConfirmAndHomologate}
                  className="px-6 py-3.5 rounded-2xl font-black text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 hover:brightness-110 shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Homologar Enredo & Assinar Projeto no Barracão</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
