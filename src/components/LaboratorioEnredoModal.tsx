import React, { useState } from 'react';
import { School, Enredo, EnredoThemeType } from '../types/carnaval';
import {
  LAB_THEME_TYPES,
  LAB_TONES,
  LAB_COMPLEXITY_LEVELS,
  LAB_INSPIRATION_PROMPTS,
  LaboratorioEnredoResult,
  generateLabEnredoWithGemini
} from '../services/laboratorioEnredoService';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import { soundService } from '../services/soundService';
import {
  X,
  FlaskConical,
  Sparkles,
  Wand2,
  Sliders,
  Layers,
  ScrollText,
  Palette,
  CheckCircle2,
  RefreshCw,
  Coins,
  Award,
  ChevronRight,
  Flame,
  Info,
  Edit3,
  Bot,
  Zap
} from 'lucide-react';

interface LaboratorioEnredoModalProps {
  isOpen: boolean;
  onClose: () => void;
  school: School;
  onApplyEnredo: (enredo: Enredo) => void;
}

export const LaboratorioEnredoModal: React.FC<LaboratorioEnredoModalProps> = ({
  isOpen,
  onClose,
  school,
  onApplyEnredo
}) => {
  // Parameters state
  const [selectedTheme, setSelectedTheme] = useState<string>('Afro-Brasileiro');
  const [complexity, setComplexity] = useState<number>(3);
  const [selectedTone, setSelectedTone] = useState<string>('Poético & Lírico');
  const [keywords, setKeywords] = useState<string>('');

  // Generation state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [result, setResult] = useState<LaboratorioEnredoResult | null>(null);

  // Editable fields in result
  const [editableTitle, setEditableTitle] = useState<string>('');
  const [editableSubTitle, setEditableSubTitle] = useState<string>('');
  const [editableSynopsis, setEditableSynopsis] = useState<string>('');

  // Tabs for result viewing
  const [activeResultTab, setActiveResultTab] = useState<'sinopse' | 'setores' | 'visuais'>('sinopse');

  if (!isOpen) return null;

  const currentComplexityInfo =
    LAB_COMPLEXITY_LEVELS.find((c) => c.level === complexity) || LAB_COMPLEXITY_LEVELS[2];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationStep('Iniciando o laboratório lírico...');
    soundService.playClick();

    const steps = [
      'Consultando a cosmogonia e as matrizes do samba...',
      'Invocando a inspiração poética e narrativa...',
      'Estruturando a dramaturgia dos setores e alas...',
      'Redigindo a sinopse oficial no padrão da LIESA...'
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setGenerationStep(steps[stepIdx]);
      }
    }, 700);

    try {
      const generated = await generateLabEnredoWithGemini({
        themeType: selectedTheme,
        complexity,
        tone: selectedTone,
        customKeywords: keywords.trim(),
        schoolName: cleanSchoolName(school),
        division: school.division,
        colors: [school.colors?.primary, school.colors?.secondary, school.colors?.accent].filter(Boolean) as string[]
      });

      clearInterval(interval);
      setResult(generated);
      setEditableTitle(generated.title);
      setEditableSubTitle(generated.subTitle || '');
      setEditableSynopsis(generated.synopsis);
      setActiveResultTab('sinopse');
      soundService.playSuccess();
    } catch (err) {
      clearInterval(interval);
      console.error('Erro na geração:', err);
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  const handleApply = () => {
    if (!result) return;

    soundService.playSuccess();
    const finalEnredo: Enredo = {
      id: result.id,
      title: editableTitle.trim() || result.title,
      themeType: (result.themeType as EnredoThemeType) || 'Cultural',
      synopsis: editableSynopsis.trim() || result.synopsis,
      qualityBoost: result.qualityBoost,
      cost: result.cost,
      proponent: 'Laboratório de Criação do Barracão',
      isSponsored: false
    };

    onApplyEnredo(finalEnredo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/70 border-b border-purple-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-400 shadow-inner">
              <FlaskConical className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white tracking-wide">
                  Laboratório de Enredo
                </h2>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-sm flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Criação Autoral
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Ajuste os parâmetros narrativos e crie sinopses originais e sofisticadas para {cleanSchoolName(school)}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Two columns if result exists, or single parameter column */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Parâmetros de Criação */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Coluna Esquerda: Controles de Parâmetros */}
            <div className={`space-y-5 ${result ? 'lg:col-span-5' : 'lg:col-span-12'}`}>
              <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-5 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                    <Sliders className="w-4 h-4" />
                    <span>Configuração dos Parâmetros</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Sapucaí • Padrão Oficial LIESA
                  </span>
                </div>

                {/* 1. Tipo de Tema */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                    <span>1. Vertente Temática</span>
                    <span className="text-purple-400 text-[11px] font-bold">
                      {selectedTheme}
                    </span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                    {LAB_THEME_TYPES.map((theme) => {
                      const isSelected = selectedTheme === theme.id;
                      return (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => {
                            setSelectedTheme(theme.id);
                            soundService.playClick();
                          }}
                          className={`p-2 rounded-xl text-left border transition text-xs flex flex-col gap-1 cursor-pointer ${
                            isSelected
                              ? 'bg-purple-950/60 border-purple-500 text-purple-200 shadow-md shadow-purple-500/20'
                              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 font-bold">
                            <span>{theme.icon}</span>
                            <span className="truncate">{theme.label}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 line-clamp-1">
                            {theme.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Complexidade Narrativa */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <span>2. Complexidade Narrativa</span>
                      <span className="text-[10px] text-slate-400">({complexity}/5)</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/40">
                      {currentComplexityInfo.label}
                    </span>
                  </div>

                  {/* Level Slider / Selector */}
                  <div className="grid grid-cols-5 gap-1.5">
                    {LAB_COMPLEXITY_LEVELS.map((comp) => {
                      const isSelected = complexity === comp.level;
                      return (
                        <button
                          key={comp.level}
                          type="button"
                          onClick={() => {
                            setComplexity(comp.level);
                            soundService.playClick();
                          }}
                          className={`py-2 px-1 rounded-xl text-center border font-bold text-xs transition cursor-pointer flex flex-col items-center gap-0.5 ${
                            isSelected
                              ? 'bg-gradient-to-b from-purple-600 to-indigo-700 border-purple-400 text-white shadow-lg shadow-purple-500/30'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                          }`}
                        >
                          <span className="text-sm">Nível {comp.level}</span>
                          <span className="text-[9px] font-medium opacity-80">{comp.badge}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] space-y-1.5">
                    <p className="text-slate-300">{currentComplexityInfo.desc}</p>
                    <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-800/80">
                      <span className="text-amber-400 font-bold flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        Bônus de Enredo: +{currentComplexityInfo.bonus} pts
                      </span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Coins className="w-3 h-3" />
                        Custo Estimado: R$ {currentComplexityInfo.cost.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Tom & Atmosfera */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">
                    3. Tom & Atmosfera Poética
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {LAB_TONES.map((tone) => {
                      const isSelected = selectedTone === tone.id;
                      return (
                        <button
                          key={tone.id}
                          type="button"
                          onClick={() => {
                            setSelectedTone(tone.id);
                            soundService.playClick();
                          }}
                          className={`p-2.5 rounded-xl text-left border transition text-xs cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-950/70 border-indigo-400 text-indigo-100 shadow-md shadow-indigo-500/20'
                              : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                          }`}
                        >
                          <div className="font-bold flex items-center gap-1.5">
                            <Flame className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                            <span>{tone.label}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                            {tone.desc}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Palavras-chave / Ideia Central */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                    <span>4. Motivo Central / Inspiração (Opcional)</span>
                    <span className="text-[10px] text-slate-500">Ex: Personagem, mito ou verso</span>
                  </div>
                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="Ex: Rezadeiras e folhas sagradas, Trem do Samba, Zumbi dos Palmares..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
                  />

                  {/* Chips rápidos de inspiração */}
                  <div className="space-y-1">
                    <div className="text-[10px] text-slate-400 font-medium">Sugestões de faísca criativa:</div>
                    <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                      {LAB_INSPIRATION_PROMPTS.slice(0, 6).map((prompt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setKeywords(prompt);
                            soundService.playClick();
                          }}
                          className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-purple-950/50 hover:border-purple-500/50 border border-slate-800 text-[10px] text-slate-300 transition text-left cursor-pointer truncate max-w-xs"
                          title={prompt}
                        >
                          ✨ {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Botão de Ação: Gerar Enredo */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className={`w-full py-3.5 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2.5 shadow-xl transition cursor-pointer ${
                      isGenerating
                        ? 'bg-purple-800/60 text-purple-200 cursor-wait'
                        : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 hover:from-purple-500 hover:via-indigo-500 hover:to-amber-400 text-white shadow-purple-600/30 hover:scale-[1.01]'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin text-purple-200" />
                        <span>{generationStep || 'Processando sinopse...'}</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-5 h-5 text-amber-300" />
                        <span>{result ? 'Regerar com Novos Parâmetros' : 'Gerar Sinopse no Laboratório'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Coluna Direita: Resultado / Sinopse Gerada */}
            {result && (
              <div className="lg:col-span-7 space-y-4 animate-fadeIn">
                <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                  {/* Topo do Resultado: Badges de Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      {result.generatedWithAI ? (
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5 shadow-sm">
                          <Bot className="w-3.5 h-3.5 text-purple-400" />
                          <span>Geração Avançada de Sinopse</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shadow-sm">
                          <Zap className="w-3.5 h-3.5 text-amber-400" />
                          <span>Motor de Criação do Barracão</span>
                        </span>
                      )}

                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                        {result.themeType}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-amber-400 font-bold flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        +{result.qualityBoost} pts
                      </span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Coins className="w-3.5 h-3.5" />
                        R$ {result.cost.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>

                  {/* Título & Subtítulo Editáveis */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1 font-bold text-slate-300">
                        <Edit3 className="w-3 h-3 text-amber-400" /> Título Oficial do Enredo
                      </span>
                      <span>Você pode editar diretamente</span>
                    </div>
                    <input
                      type="text"
                      value={editableTitle}
                      onChange={(e) => setEditableTitle(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-base font-black text-amber-300 focus:outline-none focus:border-amber-400 transition"
                      placeholder="Título Oficial do Enredo"
                    />

                    <input
                      type="text"
                      value={editableSubTitle}
                      onChange={(e) => setEditableSubTitle(e.target.value)}
                      className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-1.5 text-xs text-slate-300 italic focus:outline-none focus:border-slate-600 transition"
                      placeholder="Subtítulo ou epígrafe poética..."
                    />
                  </div>

                  {/* Abas do Resultado */}
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                    <button
                      type="button"
                      onClick={() => setActiveResultTab('sinopse')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        activeResultTab === 'sinopse'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <ScrollText className="w-3.5 h-3.5" />
                      <span>Sinopse Oficial</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveResultTab('setores')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        activeResultTab === 'setores'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Setorização ({result.suggestedSectors.length} Setores)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveResultTab('visuais')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        activeResultTab === 'visuais'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Palette className="w-3.5 h-3.5" />
                      <span>Destaques Plásticos</span>
                    </button>
                  </div>

                  {/* Conteúdo da Aba Ativa */}
                  <div className="min-h-[220px]">
                    {activeResultTab === 'sinopse' && (
                      <div className="space-y-2">
                        <textarea
                          rows={8}
                          value={editableSynopsis}
                          onChange={(e) => setEditableSynopsis(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 leading-relaxed font-serif focus:outline-none focus:border-amber-500/50 transition resize-y"
                          placeholder="Texto completo da sinopse..."
                        />
                        <div className="flex items-center justify-between text-[10px] text-slate-500">
                          <span>Linguagem lírica ajustada para os cadernos de jurados da Sapucaí</span>
                          <span>{editableSynopsis.length} caracteres</span>
                        </div>
                      </div>
                    )}

                    {activeResultTab === 'setores' && (
                      <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
                        {result.suggestedSectors.map((sector) => (
                          <div
                            key={sector.sector}
                            className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1"
                          >
                            <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] font-black">
                                {sector.sector}
                              </span>
                              <span>{sector.title}</span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed pl-6">
                              {sector.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeResultTab === 'visuais' && (
                      <div className="space-y-3">
                        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                          <div className="text-xs font-bold text-purple-400">
                            🎭 Comissão de Frente
                          </div>
                          <p className="text-xs text-slate-300">
                            {result.visualHighlights.comissaoDeFrente ||
                              'Apresentação teatral coreografada com elemento cênico articulado.'}
                          </p>
                        </div>

                        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                          <div className="text-xs font-bold text-amber-400">
                            👑 Carro Abre-Alas
                          </div>
                          <p className="text-xs text-slate-300">
                            {result.visualHighlights.abreAlas ||
                              'Alegoria monumental com o símbolo da agremiação e acabamento refinado.'}
                          </p>
                        </div>

                        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                          <div className="text-xs font-bold text-indigo-400">
                            🥁 Bateria & Ritmo
                          </div>
                          <p className="text-xs text-slate-300">
                            {result.visualHighlights.bateria ||
                              'Indumentária temática rica com afinação acústica exemplar.'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Justificativa dos Jurados */}
                  {result.justificativa && (
                    <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                      <div className="font-bold text-slate-300 flex items-center gap-1">
                        <Info className="w-3 h-3 text-amber-400" />
                        <span>Defesa Curatorial para a Cabine de Julgamento</span>
                      </div>
                      <p className="leading-relaxed">{result.justificativa}</p>
                    </div>
                  )}

                  {/* Ação de Homologação no Barracão */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
                    <div className="text-xs text-slate-400 text-center sm:text-left">
                      Ao homologar, este enredo torna-se o tema oficial da agremiação no Barracão.
                    </div>

                    <button
                      type="button"
                      onClick={handleApply}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-slate-950" />
                      <span>Homologar no Barracão</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
