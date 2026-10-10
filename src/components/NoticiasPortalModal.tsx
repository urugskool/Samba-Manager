import React, { useState, useMemo } from 'react';
import { NewsArticle, NewsCategory, NewsPortal } from '../types/news';
import { NewsService } from '../services/newsService';
import {
  Newspaper,
  Flame,
  Search,
  Filter,
  X,
  MessageSquare,
  Award,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  TrendingUp,
  UserCheck,
  Radio,
  Share2,
  Calendar
} from 'lucide-react';

interface NoticiasPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: NewsArticle[];
  currentYear: number;
  onOpenSchoolProfile?: (schoolId: string) => void;
}

export const NoticiasPortalModal: React.FC<NoticiasPortalModalProps> = ({
  isOpen,
  onClose,
  articles,
  currentYear,
  onOpenSchoolProfile
}) => {
  const [selectedPortal, setSelectedPortal] = useState<NewsPortal | 'todos'>('todos');
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'todas'>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [readingArticle, setReadingArticle] = useState<NewsArticle | null>(null);
  const [copiedJson, setCopiedJson] = useState<boolean>(false);

  const portals: { id: NewsPortal | 'todos'; label: string; desc: string; icon: string }[] = [
    { id: 'todos', label: 'Todos os Veículos', desc: 'Feed Geral Integrado', icon: '🌐' },
    { id: 'G1 Carnaval', label: 'G1 Carnaval', desc: 'Tradicional & Informativo', icon: '📰' },
    { id: 'Portal SRzd / Carnavalesco', label: 'SRzd / Carnavalesco', desc: 'Bastidores & Quesitos', icon: '🎭' },
    { id: 'Resenha dos Sambistas', label: 'Resenha dos Sambistas', desc: 'Polêmicas & Torcida', icon: '🔥' },
    { id: 'Voz do Terreiro', label: 'Voz do Terreiro', desc: 'Comunidade & Raiz', icon: '🥁' }
  ];

  const categories: { id: NewsCategory | 'todas'; label: string }[] = [
    { id: 'todas', label: 'Todas as Categorias' },
    { id: 'MERCADO', label: 'Mercado da Folia' },
    { id: 'ENREDO', label: 'Enredos & Sinopses' },
    { id: 'ORDEM_DESFILE', label: 'Ordem de Desfile' },
    { id: 'BARRACAO', label: 'Barracão & Ensaios' },
    { id: 'APURACAO', label: 'Apuração & Campeãs' },
    { id: 'HISTORICO', label: 'Histórico & LIESA' }
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchPortal = selectedPortal === 'todos' || art.portal === selectedPortal;
      const matchCat = selectedCategory === 'todas' || art.categoria === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        art.manchete.toLowerCase().includes(q) ||
        art.subtitulo.toLowerCase().includes(q) ||
        art.escolaEnvolvida.toLowerCase().includes(q) ||
        art.corpo.toLowerCase().includes(q);
      return matchPortal && matchCat && matchQuery;
    });
  }, [articles, selectedPortal, selectedCategory, searchQuery]);

  const heroArticle = filteredArticles[0] || null;
  const feedArticles = filteredArticles.slice(1);

  const handleCopyJson = (article: NewsArticle) => {
    const formattedJson = JSON.stringify(NewsService.exportArticleAsJson(article), null, 2);
    navigator.clipboard.writeText(formattedJson);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400">
                  TEMPORADA {currentYear}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-xs text-slate-400">Imprensa Oficial do Samba</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <span>Voz da Passarela</span>
                <span className="text-amber-400 font-light">/ Folia News</span>
              </h2>
              <p className="text-xs text-slate-400 max-w-xl">
                Cobertura jornalística ao vivo: bastidores, dança das cadeiras, notas de apuração e comentários de torcida.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
              title="Fechar Portal de Notícias"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Portais Filter Segmented Bar */}
        <div className="bg-slate-950 px-5 py-3 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-x-auto">
          {/* Veículos de Imprensa */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {portals.map((p) => {
              const isSelected = selectedPortal === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPortal(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>{p.icon}</span>
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar matérias ou escolas..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="bg-slate-900/60 px-5 py-2 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">
            Categorias:
          </span>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition cursor-pointer shrink-0 ${
                selectedCategory === c.id
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {filteredArticles.length === 0 ? (
            <div className="p-12 text-center text-slate-500 bg-slate-950/40 rounded-2xl border border-slate-800 space-y-2">
              <Newspaper className="w-10 h-10 mx-auto text-slate-600" />
              <h4 className="text-base font-bold text-slate-400">Nenhuma matéria encontrada</h4>
              <p className="text-xs text-slate-500">
                Tente ajustar os filtros de portal, categoria ou limpar a busca.
              </p>
            </div>
          ) : (
            <>
              {/* Hero Headline Card */}
              {heroArticle && (
                <div
                  onClick={() => setReadingArticle(heroArticle)}
                  className="group relative bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 border border-amber-500/30 hover:border-amber-400/60 rounded-2xl p-6 sm:p-8 shadow-xl transition cursor-pointer transform hover:-translate-y-0.5 space-y-3"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-black uppercase text-[10px] tracking-wider">
                      {heroArticle.portal}
                    </span>
                    <span className="text-slate-500">·</span>
                    <span className="text-amber-400/90 font-mono font-bold text-xs">
                      {heroArticle.dataTemporada}
                    </span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-300 font-bold">
                      {heroArticle.escolaEnvolvida}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition leading-snug">
                    {heroArticle.manchete}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">
                    {heroArticle.subtitulo}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 border-t border-slate-800/80">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-slate-300">
                        <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                        <span>{heroArticle.comentarios.length} reações no X</span>
                      </span>
                      <span>·</span>
                      <span className="text-amber-400 font-bold">
                        Impacto Moral: {heroArticle.impactoMoral > 0 ? `+${heroArticle.impactoMoral}` : heroArticle.impactoMoral}
                      </span>
                    </div>

                    <span className="text-amber-400 group-hover:translate-x-1 transition font-bold flex items-center gap-1">
                      <span>Ler Matéria Completa</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              )}

              {/* Grid of Feed Articles */}
              {feedArticles.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-black text-slate-400 tracking-wider flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-500" />
                    <span>Últimas Notícias da Passarela ({feedArticles.length})</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {feedArticles.map((art, artIdx) => (
                      <div
                        key={`${art.id || 'article'}-${artIdx}`}
                        onClick={() => setReadingArticle(art)}
                        className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 hover:bg-slate-950 transition cursor-pointer flex flex-col justify-between space-y-3 group"
                      >
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2 text-[11px]">
                            <span className="font-bold text-amber-400">{art.portal}</span>
                            <span className="text-slate-600">·</span>
                            <span className="text-slate-400 font-mono">{art.dataTemporada}</span>
                            <span className="text-slate-600">·</span>
                            <span className="text-slate-300 font-semibold truncate">
                              {art.escolaEnvolvida}
                            </span>
                          </div>

                          <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition leading-snug line-clamp-2">
                            {art.manchete}
                          </h4>

                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {art.subtitulo}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3 text-slate-400" />
                            <span>{art.comentarios.length} comentários</span>
                          </span>
                          <span className="text-amber-400 font-bold group-hover:underline flex items-center gap-1 text-[11px]">
                            <span>Ler</span>
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              O portal Folia News atualiza automaticamente a cada transferência, contratação e avanço de mês.
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer shadow-md"
          >
            Fechar Portal
          </button>
        </div>
      </div>

      {/* Article Detail Reader Modal (Full View with Comments, Reactions & JSON Export) */}
      {readingArticle && (
        <div className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-black text-[10px] uppercase">
                  {readingArticle.portal}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400 font-mono">{readingArticle.dataTemporada}</span>
                <span className="text-slate-500">·</span>
                <span className="text-amber-400 font-bold">{readingArticle.categoria}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyJson(readingArticle)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  title="Copiar estrutura JSON da notícia"
                >
                  {copiedJson ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">JSON Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-400" />
                      <span>Copiar JSON</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setReadingArticle(null)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
              {/* Title & Subtitle */}
              <div className="space-y-2 pb-4 border-b border-slate-800">
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {readingArticle.manchete}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  {readingArticle.subtitulo}
                </p>
                <div className="pt-1 flex items-center gap-2 text-xs text-slate-400">
                  <span>Escola Envolvida: <strong className="text-white">{readingArticle.escolaEnvolvida}</strong></span>
                  <span>·</span>
                  <span>Impacto Moral: <strong className="text-amber-400 font-mono">{readingArticle.impactoMoral > 0 ? `+${readingArticle.impactoMoral}` : readingArticle.impactoMoral}</strong></span>
                </div>
              </div>

              {/* Article Content */}
              <div className="text-sm text-slate-200 leading-relaxed space-y-4">
                <p className="first-letter:text-3xl first-letter:font-black first-letter:text-amber-400 first-letter:mr-1">
                  {readingArticle.corpo}
                </p>
              </div>

              {/* Repercussão & Comentários (Twitter / X Style) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h4 className="text-xs uppercase font-black text-amber-400 tracking-wider flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                    <span>Repercussão Pública & Voz da Torcida</span>
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {readingArticle.comentarios.length} declarações
                  </span>
                </div>

                <div className="space-y-3">
                  {readingArticle.comentarios.map((c, idx) => {
                    const isDiretoria = c.tipo === 'DIRETORIA';
                    const isEspecialista = c.tipo === 'ESPECIALISTA';
                    const isTorcedor = c.tipo === 'TORCEDOR';

                    return (
                      <div
                        key={`${readingArticle.id}-com-${idx}`}
                        className={`p-3.5 rounded-xl border text-xs space-y-1.5 transition ${
                          isDiretoria
                            ? 'bg-blue-950/20 border-blue-500/30 text-blue-200'
                            : isEspecialista
                            ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                            : 'bg-slate-900 border-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-white">{c.autor}</span>
                            <span
                              className={`text-[9px] px-1.5 py-0.2 rounded uppercase font-bold tracking-wider ${
                                isDiretoria
                                  ? 'bg-blue-500/20 text-blue-300'
                                  : isEspecialista
                                  ? 'bg-amber-500/20 text-amber-300'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {isDiretoria
                                ? 'Oficial / Diretoria'
                                : isEspecialista
                                ? 'Veredito Especialista'
                                : 'Voz da Torcida (X)'}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs leading-relaxed italic">
                          "{c.texto}"
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
              <button
                onClick={() => handleCopyJson(readingArticle)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-amber-400" />
                <span>Exportar Notícia em JSON</span>
              </button>

              <button
                onClick={() => setReadingArticle(null)}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer"
              >
                Voltar ao Feed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
