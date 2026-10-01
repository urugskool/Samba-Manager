import React, { useState } from 'react';
import { School, DivisionId } from '../types/carnaval';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import {
  Trophy,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Sparkles,
  RotateCcw,
  Coins,
  Heart,
  AlertTriangle,
  Menu,
  X,
  LayoutDashboard,
  Table,
  Hammer,
  Users,
  Wallet,
  Music,
  Award
} from 'lucide-react';

interface NavbarProps {
  currentYear: number;
  userSchool: School | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  voiceEnabled: boolean;
  setVoiceEnabled: (enabled: boolean) => void;
  sfxEnabled: boolean;
  setSfxEnabled: (enabled: boolean) => void;
  onResetGame: () => void;
  onRestartNewSave?: () => void;
  isSpectatorMode: boolean;
  hasSeasonResults: boolean;
  allParadesCompleted?: boolean;
  completedParadesCount?: number;
  totalSchoolsCount?: number;
  onOpenStartScreen?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentYear,
  userSchool,
  activeTab,
  setActiveTab,
  voiceEnabled,
  setVoiceEnabled,
  sfxEnabled,
  setSfxEnabled,
  onResetGame,
  onRestartNewSave,
  isSpectatorMode,
  hasSeasonResults,
  allParadesCompleted = false,
  completedParadesCount = 0,
  totalSchoolsCount = 80,
  onOpenStartScreen
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const tabs = [
    { id: 'dashboard', label: 'Painel', icon: LayoutDashboard, badge: null },
    { id: 'tabela', label: 'Escolas', icon: Table, badge: null },
    { id: 'glorias', label: 'Glórias & Títulos', icon: Trophy, badge: 'Honras' },
    { id: 'barracao', label: 'Barracão', icon: Hammer, badge: userSchool?.barracaoProgress ? `${userSchool.barracaoProgress}%` : null, hideIfSpectator: true },
    { id: 'ensaios', label: 'Ensaios', icon: Music, badge: userSchool?.rehearsalLevel ? `${userSchool.rehearsalLevel}%` : null, hideIfSpectator: true },
    { id: 'equipe', label: 'Equipe & Mercado', icon: Users, badge: null, hideIfSpectator: true },
    { id: 'financas', label: 'Finanças', icon: Wallet, badge: null, hideIfSpectator: true },
    {
      id: 'desfile',
      label: 'Desfiles',
      icon: Sparkles,
      badge: allParadesCompleted ? 'Concluído' : completedParadesCount > 0 ? `${completedParadesCount}/${totalSchoolsCount}` : 'Ao Vivo'
    },
    {
      id: 'apuracao',
      label: 'Apuração',
      icon: Award,
      badge: allParadesCompleted ? 'Liberado' : 'Aguardando Desfiles'
    }
  ];

  const visibleTabs = tabs.filter((t) => !isSpectatorMode || !t.hideIfSpectator);

  const handleMobileTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
        {/* Top Bar with School & System Status */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand & Year */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/30">
              <Trophy className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-black text-sm sm:text-lg tracking-tight bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
                  SAMBA MANAGER
                </span>
                <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40 tracking-wider font-mono">
                  {currentYear}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden md:block">
                O Gerenciador do Carnaval Carioca • 9 Quesitos • Menor Nota Descartada
              </p>
            </div>
          </div>

          {/* User School or Spectator Info */}
          {userSchool && !isSpectatorMode ? (
            <div className="flex items-center gap-2 sm:gap-3 bg-slate-900/90 border border-slate-800 rounded-xl px-2 sm:px-3 py-1 sm:py-1.5 shadow-inner max-w-[200px] sm:max-w-none">
              <div
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center font-bold text-xs shadow shrink-0"
                style={{
                  backgroundColor: userSchool.colors.primary,
                  color: userSchool.colors.text,
                  border: `1.5px solid ${userSchool.colors.border || '#fff'}`
                }}
              >
                {cleanSchoolName(userSchool).charAt(0)}
              </div>

              <div className="text-left min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs text-white truncate max-w-[90px] sm:max-w-[150px]">
                    {cleanSchoolName(userSchool)}
                  </span>
                  <span
                    className={`text-[8px] sm:text-[9px] font-bold px-1 py-0.2 rounded uppercase shrink-0 ${
                      userSchool.division === 'especial'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : userSchool.division === 'ouro'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : userSchool.division === 'prata'
                        ? 'bg-slate-400/20 text-slate-300 border border-slate-500/30'
                        : 'bg-amber-800/30 text-amber-300 border border-amber-600/40'
                    }`}
                  >
                    {userSchool.division === 'especial'
                      ? 'Especial'
                      : userSchool.division === 'ouro'
                      ? 'Ouro'
                      : userSchool.division === 'prata'
                      ? 'Prata'
                      : 'Bronze'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-300">
                  <span className="flex items-center gap-0.5 text-emerald-400 font-semibold font-mono">
                    <Coins className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" />
                    R$ {(userSchool.budget / 1000).toFixed(0)}k
                  </span>
                  <span className="flex items-center gap-0.5 text-rose-400 font-semibold">
                    <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-400 fill-rose-400" />
                    {userSchool.fanBaseMorale}%
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Modo Observador • LIESA, LIGA RJ & Superliga</span>
            </div>
          )}

          {/* Global Controls: Audio, Reset & Mobile Menu button */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Voice Narrator Toggle */}
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              title={voiceEnabled ? 'Locutor da Apuração: Ativado' : 'Locutor da Apuração: Mudo'}
              className={`p-1.5 sm:p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                voiceEnabled
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-slate-900 text-slate-500 border border-slate-800'
              }`}
            >
              {voiceEnabled ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
              <span className="hidden lg:inline">Voz Apuração</span>
            </button>

            {/* Sound Effects Toggle */}
            <button
              onClick={() => setSfxEnabled(!sfxEnabled)}
              title={sfxEnabled ? 'Efeitos Sonoros: Ativados' : 'Efeitos Sonoros: Mudos'}
              className={`p-1.5 sm:p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                sfxEnabled
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-slate-900 text-slate-500 border border-slate-800'
              }`}
            >
              {sfxEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden lg:inline">Som</span>
            </button>

            {/* Return to Start Screen / Change School */}
            <button
              onClick={onOpenStartScreen || onResetGame}
              title="Tela de Início • Trocar de Escola ou Modo"
              className="hidden sm:flex px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Início</span>
            </button>

            {/* Restart Game / Fresh Save Button */}
            {onRestartNewSave && (
              <button
                onClick={() => setShowResetConfirm(true)}
                title="Reiniciar Save • Começar novo jogo em 2027"
                className="hidden md:flex px-2.5 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/90 text-rose-300 hover:text-white border border-rose-500/40 transition items-center gap-1.5 text-xs font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                <span>Novo Save</span>
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menu de navegação"
              className="sm:hidden p-2 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 hover:bg-slate-800 transition"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-amber-400" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Confirmation Modal to Reset Game & Start Fresh Save */}
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="bg-slate-900 border-2 border-rose-500/60 rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 flex-shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Reiniciar Jogo e Criar Novo Save?</h3>
                  <p className="text-xs text-slate-400">Esta ação não poderá ser desfeita.</p>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed">
                <p>
                  Todo o progresso das temporadas será apagado e você retornará ao início com um novo save limpo.
                </p>
                <p className="text-amber-300">
                  O jogo voltará para o <strong>Carnaval 2027</strong> com todas as <strong>{totalSchoolsCount} agremiações</strong> configuradas em suas 5 divisões originais (Especial, Ouro, Prata, Bronze e Avaliação).
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setShowResetConfirm(false);
                    if (onRestartNewSave) onRestartNewSave();
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition shadow-lg shadow-rose-600/30 flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Sim, Iniciar Novo Save</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs (Horizontal on tablet / desktop with smooth scroll) */}
        <div className="bg-slate-900/60 border-t border-slate-800/80 px-2 sm:px-4 hidden sm:block">
          <div className="max-w-7xl mx-auto flex items-center overflow-x-auto no-scrollbar gap-1 py-1.5">
            {visibleTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-slate-950/30 text-slate-950'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Dropdown Drawer Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-800 bg-slate-950/98 px-3 py-3 space-y-3 animate-fadeIn shadow-2xl">
            {isSpectatorMode && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Modo Observador • LIESA, LIGA RJ & Superliga</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-1.5">
              {visibleTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleMobileTabClick(tab.id)}
                    className={`p-2.5 rounded-xl text-left text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-black shadow'
                        : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{tab.label}</span>
                    </div>
                    {tab.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                          isActive ? 'bg-slate-950/30 text-slate-950' : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Mobile Action Buttons */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenStartScreen) onOpenStartScreen();
                  else onResetGame();
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Tela Início</span>
              </button>

              {onRestartNewSave && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowResetConfirm(true);
                  }}
                  className="py-2 px-3 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                  <span>Novo Save</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav
        aria-label="Navegação rápida móvel"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 pb-safe shadow-2xl"
      >
        <div className="flex items-center justify-around px-1 py-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 text-[10px] font-bold transition ${
              activeTab === 'dashboard' ? 'text-amber-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Painel</span>
          </button>

          <button
            onClick={() => setActiveTab('tabela')}
            className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 text-[10px] font-bold transition ${
              activeTab === 'tabela' ? 'text-amber-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>Escolas</span>
          </button>

          {!isSpectatorMode && userSchool ? (
            <button
              onClick={() => setActiveTab('barracao')}
              className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 text-[10px] font-bold transition ${
                activeTab === 'barracao' ? 'text-amber-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Hammer className="w-4 h-4" />
              <span>Barracão</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('glorias')}
              className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 text-[10px] font-bold transition ${
                activeTab === 'glorias' ? 'text-amber-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Glórias</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('desfile')}
            className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 text-[10px] font-bold transition relative ${
              activeTab === 'desfile' ? 'text-amber-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className="relative">
              <Sparkles className="w-4 h-4" />
              {completedParadesCount > 0 && !allParadesCompleted && (
                <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
            </div>
            <span>Desfiles</span>
          </button>

          <button
            onClick={() => setActiveTab('apuracao')}
            className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 text-[10px] font-bold transition relative ${
              activeTab === 'apuracao' ? 'text-amber-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            <div className="relative">
              <Award className="w-4 h-4" />
              {allParadesCompleted && (
                <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}
            </div>
            <span>Apuração</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 text-[10px] font-bold transition ${
              mobileMenuOpen ? 'text-amber-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Menu className="w-4 h-4" />
            <span>Mais</span>
          </button>
        </div>
      </nav>
    </>
  );
};
