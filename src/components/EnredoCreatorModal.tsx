import React, { useState } from 'react';
import { School, DivisionId, Enredo, EnredoThemeType } from '../types/carnaval';
import {
  EnredoResearchService,
  EnredoResearchDossier,
  EnredoApproachOption
} from '../services/enredoResearchService';
import { ParadeScript, ParadeScriptService } from '../services/paradeScriptService';
import { soundService } from '../services/soundService';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import { DIVISION_REGULATIONS } from '../config/obrigatoriedadesConfig';
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
  CheckCircle2,
  Info,
  Scale,
  FileText,
  FileCheck2,
  Wand2
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
  const reg = DIVISION_REGULATIONS[effectiveDiv];
  const schoolClean = cleanSchoolName(school);

  // Modo de Criação: Pesquisa Integrada do Jogo vs. Criação Autoral da Sinopse pelo Jogador
  const [creationOrigin, setCreationOrigin] = useState<'pesquisa' | 'autoral'>('pesquisa');

  // Estados de Navegação
  // input -> researching -> dossier -> synopsis_ready -> script
  const [step, setStep] = useState<'input' | 'researching' | 'dossier' | 'synopsis_ready' | 'script'>('input');

  // Modo 1: Pesquisa do Jogo
  const [themeInput, setThemeInput] = useState(initialTheme);
  const [notesInput, setNotesInput] = useState(initialNotes);
  const [genreInput, setGenreInput] = useState<EnredoThemeType | 'auto'>('auto');
  const [dossier, setDossier] = useState<EnredoResearchDossier | null>(null);
  const [researchPhase, setResearchPhase] = useState<string>('Conectando ao acervo carnavalesco...');

  // Modo 2: Criação Autoral da Sinopse pelo Jogador
  const [authorTitle, setAuthorTitle] = useState(initialTheme || '');
  const [authorGenre, setAuthorGenre] = useState<EnredoThemeType>('Histórico');
  const [authorSynopsis, setAuthorSynopsis] = useState(initialNotes || '');

  // Abordagem e Sinopse Final (Comum a ambos os fluxos)
  const [selectedApproach, setSelectedApproach] = useState<EnredoApproachOption | null>(null);
  const [customTitle, setCustomTitle] = useState('');
  const [customSynopsis, setCustomSynopsis] = useState('');
  const [isEditingSynopsis, setIsEditingSynopsis] = useState(false);

  // Roteiro Gerado
  const [generatedScript, setGeneratedScript] = useState<ParadeScript | null>(null);
  const [isBuildingScript, setIsBuildingScript] = useState(false);
  const [selectedScriptTab, setSelectedScriptTab] = useState<'setores' | 'segmentos' | 'regulamento' | 'resumo'>('setores');

  // --------------------------------------------------------------------------
  // FLUXO 1: PESQUISA INTEGRADA DO JOGO
  // --------------------------------------------------------------------------
  const handleStartResearch = async () => {
    if (!themeInput.trim()) return;

    soundService.playClick();
    setStep('researching');
    setResearchPhase('Consultando acervo histórico e referências culturais...');

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

  const handleSelectApproach = (approach: EnredoApproachOption) => {
    soundService.playClick();
    setSelectedApproach(approach);
    setCustomTitle(approach.suggestedTitle);
    setCustomSynopsis(approach.synopsis);
  };

  // Do Dossiê para a etapa de "Sinopse Pronta"
  const handleProceedToSynopsisReadyFromDossier = () => {
    if (!selectedApproach) return;
    soundService.playClick();

    // Aplica eventuais edições no título ou sinopse
    const finalApproach: EnredoApproachOption = {
      ...selectedApproach,
      suggestedTitle: customTitle.trim() || selectedApproach.suggestedTitle,
      synopsis: customSynopsis.trim() || selectedApproach.synopsis
    };
    setSelectedApproach(finalApproach);
    setStep('synopsis_ready');
  };

  // --------------------------------------------------------------------------
  // FLUXO 2: CRIAÇÃO AUTORAL DA SINOPSE PELO JOGADOR
  // --------------------------------------------------------------------------
  const handleInsertSynopsisTemplate = () => {
    soundService.playClick();
    const t = authorTitle.trim() || 'O Canto Sagrado da Passarela';
    setAuthorSynopsis(
      `Setor 1: O Prólogo e o Chamado da Memória\nDescortina-se na passarela o amanhecer das lendas em torno de ${t}. As raízes ancestrais e a magia que inspiram a nossa agremiação ganham vida nas cores do pavilhão.\n\nSetor 2: O Desenvolvimento e os Caminhos da História\nO desfile aprofunda os cenários, tradições e personagens marcantes desta epopeia, retratando as cores e a poesia do povo.\n\nSetor 3: O Conflito, a Resistência e a Voz Popular\nA dramaticidade atinge o seu ponto alto na avenida, com a força do batuque e o clamor das lutas e superações da comunidade.\n\nSetor 4: A Apoteose e a Glória Eterna na Sapucaí\nO manto sagrado da ${schoolClean} consagra ${t} no panteão dos grandes carnavais, celebrando a imortalidade do samba sob a bênção dos baluartes.`
    );
  };

  const handleProceedToSynopsisReadyFromAuthor = () => {
    if (!authorTitle.trim() || !authorSynopsis.trim()) return;
    soundService.playClick();

    const approach = EnredoResearchService.createApproachFromCustomSynopsis(
      school,
      authorTitle,
      authorSynopsis,
      authorGenre,
      effectiveDiv
    );

    setSelectedApproach(approach);
    setCustomTitle(approach.suggestedTitle);
    setCustomSynopsis(approach.synopsis);
    setStep('synopsis_ready');
  };

  // --------------------------------------------------------------------------
  // MONTAGEM DO ROTEIRO: SEGUINDO A SINOPSE & REGULAMENTOS VIGENTES
  // --------------------------------------------------------------------------
  const handleBuildParadeScript = async () => {
    if (!selectedApproach) return;
    soundService.playClick();
    setIsBuildingScript(true);

    // Garante que qualquer alteração final feita na sinopse seja refletida
    const title = customTitle.trim() || selectedApproach.suggestedTitle;
    const synopsis = customSynopsis.trim() || selectedApproach.synopsis;

    const finalApproach: EnredoApproachOption = {
      ...selectedApproach,
      suggestedTitle: title,
      synopsis: synopsis
    };

    // Tenta primeiro gerar o roteiro canônico via IA (se online com Gemini)
    let script: ParadeScript | null = null;
    try {
      script = await ParadeScriptService.gerarRoteiroAbreAlasIA(
        school,
        title,
        synopsis,
        finalApproach.themeType,
        effectiveDiv
      );
    } catch {
      // Fallback procedural local
    }

    // Se offline ou não retornado da API, executa o motor procedural canônico da LIESA
    if (!script) {
      script = EnredoResearchService.buildParadeScript(school, finalApproach, effectiveDiv);
    }

    setGeneratedScript(script);
    setIsBuildingScript(false);
    setStep('script');
    soundService.playLevelUp();
  };

  // --------------------------------------------------------------------------
  // HOMOLOGAÇÃO FINAL DO ENREDO E ROTEIRO NA ESCOLA
  // --------------------------------------------------------------------------
  const handleConfirmAndHomologate = () => {
    if (!selectedApproach || !generatedScript) return;

    const enredo = EnredoResearchService.createEnredoFromApproach(school, selectedApproach);
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
                  Criação de Enredo & Roteiro
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {schoolClean} • {reg.divisionLabel}
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-black text-white tracking-tight">
                Criação do Enredo, Sinopse & Roteiro do Desfile
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Indicador de Passos */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] font-bold text-slate-400">
              <span className={step === 'input' ? 'text-amber-400 font-black' : 'text-slate-500'}>1. Origem da Sinopse</span>
              <span>›</span>
              <span className={step === 'researching' || step === 'dossier' ? 'text-amber-400 font-black' : 'text-slate-500'}>2. Pesquisa / Dossiê</span>
              <span>›</span>
              <span className={step === 'synopsis_ready' ? 'text-amber-400 font-black' : 'text-slate-500'}>3. Sinopse Pronta & Regulamento</span>
              <span>›</span>
              <span className={step === 'script' ? 'text-emerald-400 font-black' : 'text-slate-500'}>4. Roteiro Vigente</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Conteúdo Dinâmico Baseado no Passo */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* ================================================================= */}
          {/* PASSO 1: ESCOLHA DA ORIGEM DA SINOPSE (PESQUISA vs. AUTORAL)     */}
          {/* ================================================================= */}
          {step === 'input' && (
            <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
              {/* Seletor de Origem da Sinopse */}
              <div className="p-1 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-2 gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setCreationOrigin('pesquisa');
                    soundService.playClick();
                  }}
                  className={`p-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
                    creationOrigin === 'pesquisa'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span>Pesquisa Integrada do Jogo</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCreationOrigin('autoral');
                    soundService.playClick();
                  }}
                  className={`p-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
                    creationOrigin === 'autoral'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Criar Sinopse Própria (Jogador)</span>
                </button>
              </div>

              {/* MODO 1: PESQUISA DO JOGO */}
              {creationOrigin === 'pesquisa' && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed flex items-start gap-3">
                    <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300 block mb-1">
                        Pesquisa Histórica & Cultural Integrada:
                      </strong>
                      Indique o tema desejado. O sistema do jogo investigará fatos históricos, simbolismos e iconografias, oferecendo abordagens com sinopses prontas para você selecionar e validar!
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

                  {/* Sugestões Rápidas */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      Sugestões para inspiração rápida:
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
                      <span>Resumo ou Diretrizes Específicas (Opcional)</span>
                      <span className="text-[10px] text-slate-500 lowercase font-normal">pode deixar em branco</span>
                    </label>
                    <textarea
                      value={notesInput}
                      onChange={(e) => setNotesInput(e.target.value)}
                      placeholder="Ex: Gostaria de focar no misticismo e na arte popular do sertão..."
                      rows={3}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
                    />
                  </div>

                  {/* Vertente Temática */}
                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                      Vertente Temática Desejada
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {[
                        { id: 'auto', label: '🤖 Automática' },
                        { id: 'Histórico', label: '📜 Histórico' },
                        { id: 'Afro-Brasileiro', label: '🥁 Afro-Brasileiro' },
                        { id: 'Regional', label: '🌵 Regional' },
                        { id: 'Mitológico', label: '⚡ Mitológico' },
                        { id: 'Crítica Social', label: '✊ Crítica Social' },
                        { id: 'Cultural', label: '🎭 Cultural' },
                        { id: 'Lúdico', label: '🎪 Lúdico' }
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

                  {/* Botão de Disparo */}
                  <div className="pt-3 flex justify-end">
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

              {/* MODO 2: CRIAÇÃO AUTORAL DA SINOPSE PELO JOGADOR */}
              {creationOrigin === 'autoral' && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-200/90 leading-relaxed flex items-start gap-3">
                    <Feather className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-indigo-300 block mb-1">
                        Criação Autoral Direta da Sinopse:
                      </strong>
                      Você redige pessoalmente o título e a sinopse oficial do enredo. Uma vez pronta, o jogo construirá o roteiro completo de desfile seguindo a progressão dramática da sua sinopse e o regulamento vigente da {reg.governingBody}.
                    </div>
                  </div>

                  {/* Título Oficial */}
                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-300 flex items-center justify-between">
                      <span>Título Oficial do Enredo *</span>
                      <span className="text-[10px] text-amber-400 font-bold lowercase">obrigatório</span>
                    </label>
                    <input
                      type="text"
                      value={authorTitle}
                      onChange={(e) => setAuthorTitle(e.target.value)}
                      placeholder="Ex: O Canto Sagrado das Águas de Yemanjá"
                      className="w-full px-4 py-3.5 bg-slate-950 border-2 border-slate-700 rounded-2xl text-sm font-bold text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
                    />
                  </div>

                  {/* Vertente Temática */}
                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                      Gênero / Vertente Temática
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {[
                        { id: 'Histórico', label: '📜 Histórico' },
                        { id: 'Afro-Brasileiro', label: '🥁 Afro-Brasileiro' },
                        { id: 'Regional', label: '🌵 Regional' },
                        { id: 'Mitológico', label: '⚡ Mitológico' },
                        { id: 'Crítica Social', label: '✊ Crítica Social' },
                        { id: 'Cultural', label: '🎭 Cultural' },
                        { id: 'Homenagem', label: '🎖️ Homenagem' },
                        { id: 'Lúdico', label: '🎪 Lúdico' }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setAuthorGenre(opt.id as EnredoThemeType)}
                          className={`p-2 rounded-xl text-left font-bold text-xs border transition cursor-pointer ${
                            authorGenre === opt.id
                              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                              : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sinopse Completa */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                        Texto Integral da Sinopse Oficial *
                      </label>
                      <button
                        type="button"
                        onClick={handleInsertSynopsisTemplate}
                        className="text-[11px] text-amber-400 hover:text-amber-300 font-bold underline flex items-center gap-1 cursor-pointer"
                      >
                        <Wand2 className="w-3.5 h-3.5" />
                        Inserir Guia Estruturado (4 Setores)
                      </button>
                    </div>

                    <textarea
                      value={authorSynopsis}
                      onChange={(e) => setAuthorSynopsis(e.target.value)}
                      placeholder="Redija a sinopse oficial da sua agremiação. Você pode estruturar por parágrafos ou indicar 'Setor 1', 'Setor 2', etc. para que o roteiro do desfile siga perfeitamente sua narrativa..."
                      rows={8}
                      className="w-full px-4 py-3 bg-slate-950 border-2 border-slate-700 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition leading-relaxed font-sans"
                    />

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{authorSynopsis.trim().split(/\s+/).filter(Boolean).length} palavras escritas</span>
                      <span>O roteiro e as alegorias serão derivados desta narrativa</span>
                    </div>
                  </div>

                  {/* Botão de Avanço */}
                  <div className="pt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={handleProceedToSynopsisReadyFromAuthor}
                      disabled={!authorTitle.trim() || !authorSynopsis.trim()}
                      className={`px-6 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2.5 shadow-xl transition cursor-pointer ${
                        authorTitle.trim() && authorSynopsis.trim()
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 hover:brightness-110 shadow-emerald-500/20 active:scale-95'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <FileCheck2 className="w-4 h-4" />
                      <span>Concluir Sinopse & Prosseguir</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* PASSO DE CARREGAMENTO / PESQUISA NO ACERVO                       */}
          {/* ================================================================= */}
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
                    Elaboração de 4 abordagens narrativas com sinopses prontas
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* PASSO: DOSSIÊ DE PESQUISA & SELEÇÃO DE ABORDAGEM                 */}
          {/* ================================================================= */}
          {step === 'dossier' && dossier && (
            <div className="space-y-6 animate-fadeIn">
              {/* Banner de Síntese da Pesquisa */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border border-amber-500/40 shadow-xl space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase">
                      Dossiê da Pesquisa Concluído
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Gênero: <strong>{dossier.detectedGenre}</strong>
                    </span>
                  </div>
                  <button
                    onClick={() => setStep('input')}
                    className="text-xs text-amber-400 hover:text-amber-300 font-bold underline flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Voltar / Mudar tema
                  </button>
                </div>

                <h4 className="text-base sm:text-xl font-black text-white">
                  Resultados da Pesquisa: "{dossier.theme}"
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {dossier.historicalContext}
                </p>

                {/* Cards de Elementos Revelados */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5 text-[11px]">
                      <Users className="w-3.5 h-3.5" /> Personagens Centrais:
                    </span>
                    <p className="text-[11px] text-slate-300 truncate">
                      {dossier.centralFigures.slice(0, 3).join(', ')}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <span className="font-bold text-blue-400 flex items-center gap-1.5 text-[11px]">
                      <Palette className="w-3.5 h-3.5" /> Iconografia & Símbolos:
                    </span>
                    <p className="text-[11px] text-slate-300 truncate">
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

              {/* Escolha da Abordagem */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                      <Feather className="w-4 h-4 text-amber-400" />
                      <span>Escolha a Abordagem Narrativa da Pesquisa</span>
                    </h4>
                    <p className="text-xs text-slate-400">
                      Cada opção oferece uma sinopse própria e uma perspectiva estética diferente para a {schoolClean}:
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
                            {approach.synopsis}
                          </p>
                        </div>

                        {/* Setores Preview */}
                        <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            Setores Planejados:
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
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Botão de Avanço para a Sinopse Pronta */}
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
                  onClick={handleProceedToSynopsisReadyFromDossier}
                  disabled={!selectedApproach}
                  className="px-6 py-3.5 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-110 shadow-xl shadow-amber-500/20 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Aprovar Sinopse & Prosseguir</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* PASSO 2: SINOPSE PRONTA & REGULAMENTOS VIGENTES                   */}
          {/* ================================================================= */}
          {step === 'synopsis_ready' && selectedApproach && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
              {/* Banner de Confirmação da Sinopse Pronta */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-amber-950/40 border-2 border-emerald-500/40 shadow-xl space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Sinopse Pronta & Oficializada
                    </span>
                    <span className="text-xs text-amber-300 font-mono font-bold">
                      {selectedApproach.themeType}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Origem: <strong>{selectedApproach.badge}</strong>
                  </span>
                </div>

                <h4 className="text-lg sm:text-2xl font-black text-white">
                  "{customTitle || selectedApproach.suggestedTitle}"
                </h4>
                <p className="text-xs text-slate-400 italic">
                  {selectedApproach.subTitle}
                </p>
              </div>

              {/* Quadro do Texto Integral da Sinopse */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    Sinopse Oficial do Enredo
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEditingSynopsis(!isEditingSynopsis)}
                    className="text-xs text-slate-400 hover:text-white font-bold underline flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    {isEditingSynopsis ? 'Salvar Edição' : 'Ajustar Texto da Sinopse'}
                  </button>
                </div>

                {isEditingSynopsis ? (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-400 uppercase">Título Oficial</label>
                      <input
                        type="text"
                        value={customTitle}
                        onChange={(e) => setCustomTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-bold focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-400 uppercase">Texto da Sinopse</label>
                      <textarea
                        value={customSynopsis}
                        onChange={(e) => setCustomSynopsis(e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 leading-relaxed font-sans"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line bg-slate-900/50 p-4 rounded-xl border border-slate-800/60 max-h-60 overflow-y-auto">
                    {customSynopsis || selectedApproach.synopsis}
                  </div>
                )}
              </div>

              {/* PAINEL DE REGULAMENTOS VIGENTES DA LIGA / DIVISÃO */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/20 border-2 border-amber-500/40 shadow-xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Scale className="w-5 h-5 text-amber-400" />
                    <div>
                      <h5 className="text-sm font-black text-white">
                        Regulamentos Oficiais Vigentes para a Montagem do Roteiro
                      </h5>
                      <p className="text-[11px] text-slate-400">
                        {reg.governingBody} • {reg.divisionLabel} ({reg.venue})
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold uppercase">
                    Normas Técnicas Aplicadas
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Alegorias</span>
                    <strong className="text-sm font-mono text-amber-400 block">
                      {reg.rules.alegorias?.min || 1} a {reg.rules.alegorias?.max || 6}
                    </strong>
                    <span className="text-[9px] text-slate-500 block">Carros Oficiais</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Comissão Frente</span>
                    <strong className="text-sm font-mono text-blue-400 block">
                      {reg.rules.comissaoDeFrente?.min || 10} a {reg.rules.comissaoDeFrente?.max || 15}
                    </strong>
                    <span className="text-[9px] text-slate-500 block">Bailarinos</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Baianas</span>
                    <strong className="text-sm font-mono text-emerald-400 block">
                      Mín. {reg.rules.baianas?.min || 15}
                    </strong>
                    <span className="text-[9px] text-slate-500 block">Em Ala Sagrada</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Bateria</span>
                    <strong className="text-sm font-mono text-purple-400 block">
                      Mín. {reg.rules.ritmistas?.min || 80}
                    </strong>
                    <span className="text-[9px] text-slate-500 block">Ritmistas</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Tripés</span>
                    <strong className="text-sm font-mono text-yellow-400 block">
                      Até {reg.rules.tripes?.max || 0}
                    </strong>
                    <span className="text-[9px] text-slate-500 block">Cenografia Móvel</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Componentes</span>
                    <strong className="text-sm font-mono text-pink-400 block">
                      {reg.rules.componentes?.min || 400}+
                    </strong>
                    <span className="text-[9px] text-slate-500 block">Desfilantes em Pista</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Ao clicar abaixo, o cortejo e o Livro Abre-Alas serão modelados diretamente a partir da sinopse acima, respeitando cada parâmetro do regulamento da <strong>{reg.governingBody}</strong>.</span>
                  </span>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(creationOrigin === 'autoral' ? 'input' : 'dossier')}
                  className="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800 transition cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" /> Voltar
                </button>

                <button
                  type="button"
                  disabled={isBuildingScript}
                  onClick={handleBuildParadeScript}
                  className="px-7 py-4 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-2xl shadow-amber-500/30 active:scale-95 flex items-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Sparkles className={`w-5 h-5 text-slate-950 ${isBuildingScript ? 'animate-spin' : ''}`} />
                  <span>{isBuildingScript ? 'Redigindo Livro Abre-Alas Oficial da LIESA...' : 'Criar Roteiro de Desfile (Livro Abre-Alas Oficial)'}</span>
                  <ArrowRight className="w-5 h-5 text-slate-950" />
                </button>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* PASSO 3: ROTEIRO DE DESFILE GERADO & HOMOLOGAÇÃO                 */}
          {/* ================================================================= */}
          {step === 'script' && generatedScript && selectedApproach && (
            <div className="space-y-6 animate-fadeIn">
              {/* Ficha Técnica do Desfile Criado */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-indigo-950/60 border-2 border-amber-500/50 shadow-xl space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Roteiro Criado em Conformidade com o Regulamento
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Divisão: <strong>{generatedScript.divisionLabel}</strong> ({reg.governingBody})
                    </span>
                  </div>
                  <span className="text-xs text-amber-300 font-bold">
                    A sinopse ditou 100% da narrativa e dos setores!
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
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setSelectedScriptTab('setores')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    selectedScriptTab === 'setores'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Setores da Sinopse na Passarela ({generatedScript.setores.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedScriptTab('segmentos')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    selectedScriptTab === 'segmentos'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>Cortejo Completo ({generatedScript.elements.length} Elementos)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedScriptTab('regulamento')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    selectedScriptTab === 'regulamento'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Checklist do Regulamento Vigente</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedScriptTab('resumo')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    selectedScriptTab === 'resumo'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Sinopse Oficial Completa</span>
                </button>
              </div>

              {/* ABA 1: SETORES DA PASSARELA DERIVADOS DA SINOPSE */}
              {selectedScriptTab === 'setores' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                    A narrativa da sinopse foi decomposta em <strong>{generatedScript.setores.length} setores oficiais</strong> para evolução na passarela, cada um conduzindo um arco temático do enredo:
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {generatedScript.setores.map((setor) => (
                      <div
                        key={setor.sectorNumber}
                        className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
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
                </div>
              )}

              {/* ABA 2: CORTEJO COMPLETO & ELEMENTOS */}
              {selectedScriptTab === 'segmentos' && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {generatedScript.elements.slice(0, 12).map((el) => (
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
                  {generatedScript.elements.length > 12 && (
                    <p className="text-[11px] text-slate-400 text-center italic">
                      + mais {generatedScript.elements.length - 12} alas e segmentos detalhados no Livro Abre-Alas completo!
                    </p>
                  )}
                </div>
              )}

              {/* ABA 3: CHECKLIST DE REGULAMENTO VIGENTE */}
              {selectedScriptTab === 'regulamento' && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 animate-fadeIn text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="font-black text-white text-sm block">
                        Conformidade com o Regulamento da {reg.governingBody}
                      </span>
                      <span className="text-slate-400 text-[11px]">
                        Verificação dos requisitos técnicos e disciplinares da divisão {reg.divisionLabel}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold uppercase text-[10px]">
                      100% Homologado
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span>Alegorias & Carros</span>
                        <span className="text-emerald-400 flex items-center gap-1 font-mono">
                          <Check className="w-3.5 h-3.5" /> {generatedScript.obrigatoriedades.totalAlegorias} (Regulamento: {reg.rules.alegorias?.min || 1}-{reg.rules.alegorias?.max || 6})
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{reg.rules.alegorias?.description || 'Quantidade rigorosamente dentro dos limites regulamentares.'}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span>Comissão de Frente</span>
                        <span className="text-emerald-400 flex items-center gap-1 font-mono">
                          <Check className="w-3.5 h-3.5" /> {generatedScript.obrigatoriedades.comissaoDeFrenteCount} (Regulamento: {reg.rules.comissaoDeFrente?.min || 10}-{reg.rules.comissaoDeFrente?.max || 15})
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{reg.rules.comissaoDeFrente?.description || 'Dançarinos oficiais cadastrados.'}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span>Ala das Baianas</span>
                        <span className="text-emerald-400 flex items-center gap-1 font-mono">
                          <Check className="w-3.5 h-3.5" /> {generatedScript.obrigatoriedades.baianasCount} (Mínimo: {reg.rules.baianas?.min || 15})
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{reg.rules.baianas?.description || 'Matriarcas agrupadas em ala exclusiva.'}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span>Bateria Oficial</span>
                        <span className="text-emerald-400 flex items-center gap-1 font-mono">
                          <Check className="w-3.5 h-3.5" /> {generatedScript.obrigatoriedades.ritmistasCount} (Mínimo: {reg.rules.ritmistas?.min || 80})
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{reg.rules.ritmistas?.description || 'Ritmistas uniformizados na bateria oficial.'}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span>Tripés Cenográficos</span>
                        <span className="text-emerald-400 flex items-center gap-1 font-mono">
                          <Check className="w-3.5 h-3.5" /> {generatedScript.obrigatoriedades.totalTripes} (Máximo: {reg.rules.tripes?.max || 0})
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{reg.rules.tripes?.description || 'Estruturas cenográficas móveis sem motorização.'}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span>Total de Componentes</span>
                        <span className="text-emerald-400 flex items-center gap-1 font-mono">
                          <Check className="w-3.5 h-3.5" /> {generatedScript.obrigatoriedades.totalComponentes} desfilantes
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{reg.rules.componentes?.description || 'Contingente total dentro da faixa regulamentar.'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ABA 4: SINOPSE OFICIAL COMPLETA */}
              {selectedScriptTab === 'resumo' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs leading-relaxed text-slate-200 animate-fadeIn whitespace-pre-line">
                  {generatedScript.synopsis}
                </div>
              )}

              {/* Botões de Ação Final */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep('synopsis_ready')}
                  className="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800 transition cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" /> Voltar à Sinopse
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
