import React, { useState } from 'react';
import { School, DivisionId } from '../types/carnaval';
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
  AlertTriangle
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
  totalSchoolsCount = 75,
  onOpenStartScreen
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  const tabs = [
    { id: 'dashboard', label: 'Painel', badge: null },
    { id: 'tabela', label: 'Escolas', badge: null },
    { id: 'glorias', label: 'Glórias & Títulos', badge: 'Honras' },
    { id: 'barracao', label: 'Barracão', badge: userSchool?.barracaoProgress ? `${userSchool.barracaoProgress}%` : null },
    { id: 'ensaios', label: 'Ensaios', badge: userSchool?.rehearsalLevel ? `${userSchool.rehearsalLevel}%` : null },
    { id: 'equipe', label: 'Equipe & Mercado', badge: null },
    { id: 'financas', label: 'Finanças', badge: null },
    {
      id: 'desfile',
      label: 'Desfile Sapucaí',
      badge: allParadesCompleted ? 'Concluído' : completedParadesCount > 0 ? `${completedParadesCount}/${totalSchoolsCount}` : 'Ao Vivo'
    },
    {
      id: 'apuracao',
      label: 'Apuração 36 Jurados',
      badge: allParadesCompleted ? 'Liberado' : 'Aguardando Desfiles'
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Bar with School & System Status */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Year */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/30">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
                SAMBA MANAGER
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40 tracking-wider">
                CARNAVAL {currentYear}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              O Gerenciador do Carnaval Carioca • 9 Quesitos • 36 Jurados
            </p>
          </div>
        </div>

        {/* User School or Spectator Info */}
        {userSchool && !isSpectatorMode ? (
          <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5 shadow-inner">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shadow"
              style={{
                backgroundColor: userSchool.colors.primary,
                color: userSchool.colors.text,
                border: `1.5px solid ${userSchool.colors.border || '#fff'}`
              }}
            >
              {userSchool.name.charAt(0)}
            </div>

            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-white max-w-[140px] truncate">
                  {userSchool.name}
                </span>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
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
                    ? 'Grupo Especial'
                    : userSchool.division === 'ouro'
                    ? 'Série Ouro'
                    : userSchool.division === 'prata'
                    ? 'Série Prata'
                    : 'Série Bronze'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-300">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold font-mono">
                  <Coins className="w-3 h-3 text-emerald-400" />
                  R$ {(userSchool.budget / 1000).toFixed(0)}k
                </span>
                <span className="flex items-center gap-1 text-rose-400 font-semibold">
                  <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                  {userSchool.fanBaseMorale}%
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modo Observador / Presidente da LIESA</span>
          </div>
        )}

        {/* Global Controls: Audio & Reset */}
        <div className="flex items-center gap-1.5">
          {/* Voice Narrator Toggle */}
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            title={voiceEnabled ? 'Locutor da Apuração: Ativado' : 'Locutor da Apuração: Mudo'}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              voiceEnabled
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-slate-900 text-slate-500 border border-slate-800'
            }`}
          >
            {voiceEnabled ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">Voz Apuração</span>
          </button>

          {/* Sound Effects Toggle */}
          <button
            onClick={() => setSfxEnabled(!sfxEnabled)}
            title={sfxEnabled ? 'Efeitos Sonoros: Ativados' : 'Efeitos Sonoros: Mudos'}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              sfxEnabled
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-slate-900 text-slate-500 border border-slate-800'
            }`}
          >
            {sfxEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">Som</span>
          </button>

          {/* Return to Start Screen / Change School */}
          <button
            onClick={onOpenStartScreen || onResetGame}
            title="Tela de Início • Trocar de Escola ou Modo"
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Tela de Início</span>
          </button>

          {/* Restart Game / Fresh Save Button */}
          {onRestartNewSave && (
            <button
              onClick={() => setShowResetConfirm(true)}
              title="Reiniciar Save • Começar novo jogo em 2027"
              className="px-2.5 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/90 text-rose-300 hover:text-white border border-rose-500/40 transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden md:inline">Novo Save</span>
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal to Reset Game & Start Fresh Save */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border-2 border-rose-500/60 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
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
                O jogo voltará para o <strong>Carnaval 2027</strong> com todas as <strong>{totalSchoolsCount} agremiações</strong> configuradas em suas 4 divisões originais (Especial, Ouro, Prata e Bronze).
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

      {/* Navigation Tabs (Brasfoot style) */}
      <div className="bg-slate-900/60 border-t border-slate-800/80 px-2 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center overflow-x-auto no-scrollbar gap-1 py-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
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
    </header>
  );
};
