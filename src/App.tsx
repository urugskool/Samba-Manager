/**
 * SambaFoot - O Brasfoot das Escolas de Samba
 * Simulador e Gerenciador de Carnaval Carioca
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  School,
  DivisionId,
  SchoolParadeScores,
  DivisionResult,
  YearHistory,
  NewsItem
} from './types/carnaval';
import { INITIAL_SCHOOLS, INITIAL_HISTORY, RESULTS_2026, HISTORICAL_CARNAVAL_RECORDS, getSchoolConsolidatedStats } from './data/carnavalData';
import { SimulationEngine } from './services/simulationEngine';
import { soundService } from './services/soundService';

import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { BarracaoView } from './components/BarracaoView';
import { EnsaiosView } from './components/EnsaiosView';
import { EquipeView } from './components/EquipeView';
import { FinancasView } from './components/FinancasView';
import { DesfileSimulator } from './components/DesfileSimulator';
import { ApuracaoView } from './components/ApuracaoView';
import { TabelaView } from './components/TabelaView';
import { GloriasView } from './components/GloriasView';
import { NewGameModal } from './components/NewGameModal';
import { StartScreenView } from './components/StartScreenView';

import { Sparkles, Trophy, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const STORAGE_KEY = 'sambamanager_save_v7';

function sanitizeSchoolsData(loadedSchools: School[]): School[] {
  const loadedIds = new Set(loadedSchools.map((s) => s.id));
  const missingFromInitial = INITIAL_SCHOOLS.filter((s) => !loadedIds.has(s.id));
  const fullSchoolList = [...loadedSchools, ...missingFromInitial];

  return fullSchoolList.map((s) => {
    // In-game achievements are strictly from 2027 onwards (up to 2026 are historical)
    const existingAchievements = (s.honors?.inGameAchievements || []).filter((a) => a.year >= 2027);

    const historicalBaseline = HISTORICAL_CARNAVAL_RECORDS[s.id] || {
      championshipsEspecial: 0,
      runnerUpsEspecial: 0,
      championshipsOuro: 0,
      runnerUpsOuro: 0,
      championshipsPrata: 0,
      runnerUpsPrata: 0,
      championshipsBronze: 0,
      runnerUpsBronze: 0
    };

    const updatedSchool: School = {
      ...s,
      honors: {
        ...s.honors,
        historicalEspecialTitles: historicalBaseline.championshipsEspecial,
        historicalEspecialYears: historicalBaseline.especialYears || [],
        historicalEspecialRunnerUps: historicalBaseline.runnerUpsEspecial,
        historicalOuroTitles: historicalBaseline.championshipsOuro,
        historicalOuroYears: historicalBaseline.ouroYears || [],
        historicalOuroRunnerUps: historicalBaseline.runnerUpsOuro,
        historicalPrataTitles: historicalBaseline.championshipsPrata || 0,
        historicalPrataYears: historicalBaseline.prataYears || [],
        historicalPrataRunnerUps: historicalBaseline.runnerUpsPrata || 0,
        historicalBronzeTitles: historicalBaseline.championshipsBronze || 0,
        historicalBronzeYears: historicalBaseline.bronzeYears || [],
        historicalBronzeRunnerUps: historicalBaseline.runnerUpsBronze || 0,
        inGameAchievements: existingAchievements
      }
    };

    const cons = getSchoolConsolidatedStats(updatedSchool);
    return {
      ...updatedSchool,
      championshipsEspecial: cons.totalEspecialTitles,
      runnerUpsEspecial: cons.totalEspecialVices,
      championshipsOuro: cons.totalOuroTitles,
      runnerUpsOuro: cons.totalOuroVices,
      championshipsPrata: cons.totalPrataTitles,
      runnerUpsPrata: cons.totalPrataVices,
      championshipsBronze: cons.totalBronzeTitles,
      runnerUpsBronze: cons.totalBronzeVices
    };
  });
}

function sanitizeHistoryData(loadedHistory: YearHistory[]): YearHistory[] {
  const has2026 = loadedHistory.some((h) => h.year === 2026);
  if (!has2026 && INITIAL_HISTORY.length > 0) {
    return [...INITIAL_HISTORY, ...loadedHistory];
  }
  return loadedHistory;
}

export default function App() {
  const [schools, setSchools] = useState<School[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('sambamanager_save_v4') || localStorage.getItem('sambamanager_save_v3');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.schools && parsed.schools.length > 0) {
            return sanitizeSchoolsData(parsed.schools);
          }
        } catch {}
      }
    }
    return INITIAL_SCHOOLS;
  });

  const [currentYear, setCurrentYear] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.currentYear) return parsed.currentYear;
        } catch {}
      }
    }
    return 2027;
  });

  const [userSchoolId, setUserSchoolId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed.userSchoolId ?? null;
        } catch {}
      }
    }
    return null;
  });

  const [isSpectatorMode, setIsSpectatorMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return !!parsed.isSpectatorMode;
        } catch {}
      }
    }
    return false;
  });

  const [managerName, setManagerName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed.managerName || 'Diretor Presidente';
        } catch {}
      }
    }
    return 'Diretor Presidente';
  });

  // Start Screen Control: Always launch on start screen with school selection or spectator mode!
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  const [history, setHistory] = useState<YearHistory[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('sambamanager_save_v4') || localStorage.getItem('sambamanager_save_v3');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.history && parsed.history.length > 0) {
            return sanitizeHistoryData(parsed.history);
          }
        } catch {}
      }
    }
    return INITIAL_HISTORY;
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [sfxEnabled, setSfxEnabled] = useState<boolean>(true);
  const [isNewGameModalOpen, setIsNewGameModalOpen] = useState<boolean>(false);

  // Parade Scores
  const [especialScores, setEspecialScores] = useState<SchoolParadeScores[]>([]);
  const [ouroScores, setOuroScores] = useState<SchoolParadeScores[]>([]);
  const [prataScores, setPrataScores] = useState<SchoolParadeScores[]>([]);
  const [bronzeScores, setBronzeScores] = useState<SchoolParadeScores[]>([]);
  const [hasParadeResults, setHasParadeResults] = useState<boolean>(false);
  const [completedParadeSchoolIds, setCompletedParadeSchoolIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed.completedParadeSchoolIds)) {
            return parsed.completedParadeSchoolIds;
          }
        } catch {}
      }
    }
    return [];
  });

  // Notifications Toast
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: 'info' | 'success' | 'warning' | 'alert';
  } | null>(null);

  // News ticker
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: 'news_1',
      year: 2027,
      title: 'Abertura Oficial do Samba Manager • Carnaval 2027!',
      body: 'Os barracões do Especial, os terreiros da Série Ouro e a vibração das 24 escolas da Série Prata dão a largada para o Carnaval 2027!',
      type: 'info',
      date: 'Hoje'
    },
    {
      id: 'news_2',
      year: 2027,
      title: 'Sala de Glórias Inaugurada com Palmarés Histórico',
      body: 'Consulte os títulos históricos e vices das três divisões. Todas as novas honras conquistadas a partir de 2027 serão eternizadas no avanço do jogo!',
      type: 'info',
      date: 'Ontem'
    }
  ]);

  // Sync audio service flags
  useEffect(() => {
    soundService.setVoiceEnabled(voiceEnabled);
  }, [voiceEnabled]);

  useEffect(() => {
    soundService.setSoundEffectsEnabled(sfxEnabled);
  }, [sfxEnabled]);

  // Pre-generate parade scores if none exist for current year
  useEffect(() => {
    if (!hasParadeResults) {
      generateScores();
    }
  }, [currentYear, schools]);

  const generateScores = () => {
    const espSchools = schools.filter((s) => s.division === 'especial');
    const ourSchools = schools.filter((s) => s.division === 'ouro');
    const praSchools = schools.filter((s) => s.division === 'prata');
    const broSchools = schools.filter((s) => s.division === 'bronze');

    const espScores = SimulationEngine.simulateDivisionParades(espSchools);
    const ourScores = SimulationEngine.simulateDivisionParades(ourSchools);
    const praScores = SimulationEngine.simulateDivisionParades(praSchools);
    const broScores = SimulationEngine.simulateDivisionParades(broSchools);

    setEspecialScores(espScores);
    setOuroScores(ourScores);
    setPrataScores(praScores);
    setBronzeScores(broScores);
    setHasParadeResults(true);
  };

  // Save game state to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dataToSave = {
        schools,
        currentYear,
        userSchoolId,
        isSpectatorMode,
        managerName,
        history,
        completedParadeSchoolIds
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    }
  }, [schools, currentYear, userSchoolId, isSpectatorMode, managerName, history, completedParadeSchoolIds]);

  // Show Toast
  const showToast = useCallback((text: string, type: 'info' | 'success' | 'warning' | 'alert' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  }, []);

  const handleFinishParade = useCallback(() => {
    showToast('Desfile oficial concluído! As notas dos 36 jurados foram seladas!', 'success');
  }, [showToast]);

  const handleCompleteParade = useCallback((schoolId: string) => {
    setCompletedParadeSchoolIds((prev) => {
      if (prev.includes(schoolId)) return prev;
      return [...prev, schoolId];
    });
    const school = schools.find((s) => s.id === schoolId);
    showToast(`Desfile da ${school ? school.name : 'agremiação'} concluído na passarela! As notas dos 36 jurados foram lacradas.`, 'success');
  }, [schools, showToast]);

  const handleCompleteParadesForDivision = useCallback((division: DivisionId) => {
    const divSchoolIds = schools.filter((s) => s.division === division).map((s) => s.id);
    setCompletedParadeSchoolIds((prev) => {
      const set = new Set([...prev, ...divSchoolIds]);
      return Array.from(set);
    });
    const divName =
      division === 'especial'
        ? 'Grupo Especial'
        : division === 'ouro'
        ? 'Série Ouro'
        : division === 'prata'
        ? 'Série Prata'
        : 'Série Bronze';
    showToast(`Todos os desfiles da ${divName} foram realizados e avaliados pelos jurados!`, 'success');
  }, [schools, showToast]);

  const handleCompleteAllParades = useCallback(() => {
    const allIds = schools.map((s) => s.id);
    setCompletedParadeSchoolIds(allIds);
    showToast('Todos os desfiles do Carnaval foram realizados! A apuração oficial das notas está liberada!', 'success');
  }, [schools, showToast]);

  // Find user school & division lists
  const userSchool = schools.find((s) => s.id === userSchoolId) || null;
  const especialSchools = schools.filter((s) => s.division === 'especial');
  const ouroSchools = schools.filter((s) => s.division === 'ouro');
  const prataSchools = schools.filter((s) => s.division === 'prata');
  const bronzeSchools = schools.filter((s) => s.division === 'bronze');

  const totalSchoolsCount = schools.length;
  const isAllParadesCompleted = totalSchoolsCount > 0 && completedParadeSchoolIds.length >= totalSchoolsCount;

  // Update a single school
  const handleUpdateSchool = (updatedSchool: School) => {
    setSchools((prev) => prev.map((s) => (s.id === updatedSchool.id ? updatedSchool : s)));
  };

  // Start from Title Screen
  const handleStartGame = (schoolId: string | null, name: string) => {
    setUserSchoolId(schoolId);
    setIsSpectatorMode(!schoolId);
    setManagerName(name);
    setIsGameStarted(true);
    setActiveTab('dashboard');

    const chosen = schoolId ? schools.find((s) => s.id === schoolId) : null;
    showToast(
      chosen
        ? `Bem-vindo ao comando da ${chosen.name}! Temporada do Carnaval ${currentYear} iniciada!`
        : `Modo Observador ativado! Você preside a LIGA no Carnaval ${currentYear}!`,
      'success'
    );
  };

  // Start New Career / Fresh Reset
  const handleStartNewGame = (schoolId: string | null, name: string) => {
    handleRestartNewSave(schoolId, name);
  };

  // Full Reset Game: Return to year 2027 and clear all saved progress
  const handleRestartNewSave = (schoolId: string | null = null, name: string = 'Diretor Presidente') => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('sambamanager_save_v4');
      localStorage.removeItem('sambamanager_save_v3');
    }
    setSchools(INITIAL_SCHOOLS);
    setCurrentYear(2027);
    setUserSchoolId(schoolId);
    setIsSpectatorMode(!schoolId);
    setManagerName(name);
    setHistory(INITIAL_HISTORY);
    setHasParadeResults(false);
    setCompletedParadeSchoolIds([]);
    setEspecialScores([]);
    setOuroScores([]);
    setPrataScores([]);
    setBronzeScores([]);
    setIsNewGameModalOpen(false);
    setIsGameStarted(schoolId !== null);
    setActiveTab('dashboard');

    showToast('Novo save criado! O Carnaval 2027 foi reiniciado no estado original de todas as 4 divisões.', 'success');
  };

  // Reset Game / Return to Start Screen
  const handleResetGamePrompt = () => {
    setIsGameStarted(false);
  };

  // Advance Season to Next Year
  const handleAdvanceYear = (
    espResult: DivisionResult,
    ouroResult: DivisionResult,
    prataResult: DivisionResult,
    bronzeResult: DivisionResult
  ) => {
    const nextSeasonData = SimulationEngine.advanceToNextYear(
      schools,
      espResult,
      ouroResult,
      prataResult,
      bronzeResult,
      currentYear,
      history
    );

    setSchools(nextSeasonData.nextSchools);
    setCurrentYear(nextSeasonData.nextYear);
    setHistory(nextSeasonData.newHistory);
    setHasParadeResults(false);
    setCompletedParadeSchoolIds([]);

    // Add News
    const newsHeadline: NewsItem = {
      id: `news_${nextSeasonData.nextYear}`,
      year: nextSeasonData.nextYear,
      title: `Temporada do Carnaval ${nextSeasonData.nextYear} Iniciada!`,
      body: `${nextSeasonData.summary.especialChampionName} defende o título do Especial! ${nextSeasonData.summary.ouroChampionName} subiu para a elite. Na Série Prata, ${nextSeasonData.summary.prataChampionName} sagrou-se campeã! Na Série Bronze, ${nextSeasonData.summary.bronzeChampionName} conquistou o título e a vaga na Série Prata!`,
      type: 'success',
      date: 'Agora'
    };
    setNews((prev) => [newsHeadline, ...prev]);

    setActiveTab('dashboard');
    showToast(
      `Carnaval ${nextSeasonData.nextYear} iniciado! Agremiações rebaixadas e promovidas foram transferidas de divisão!`,
      'success'
    );
  };

  // START SCREEN: Displayed first to choose which school to command or spectator mode
  if (!isGameStarted) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
        <StartScreenView
          currentYear={currentYear}
          especialSchools={especialSchools}
          ouroSchools={ouroSchools}
          prataSchools={prataSchools}
          bronzeSchools={bronzeSchools}
          allSchools={schools}
          onStartGame={handleStartGame}
          onResetSave={() => handleRestartNewSave(null, managerName)}
          initialSchoolId={userSchoolId}
          initialSpectator={isSpectatorMode}
        />
        {/* Floating Notification Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 animate-bounce">
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-xs font-bold ${
                toastMessage.type === 'success'
                  ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/50'
                  : toastMessage.type === 'warning'
                  ? 'bg-amber-950/90 text-amber-200 border-amber-500/50'
                  : toastMessage.type === 'alert'
                  ? 'bg-rose-950/90 text-rose-200 border-rose-500/50'
                  : 'bg-slate-900/90 text-white border-slate-700'
              }`}
            >
              {toastMessage.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
              {toastMessage.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
              {toastMessage.type === 'info' && <Info className="w-4 h-4 text-blue-400" />}
              <span>{toastMessage.text}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        currentYear={currentYear}
        userSchool={userSchool}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        voiceEnabled={voiceEnabled}
        setVoiceEnabled={setVoiceEnabled}
        sfxEnabled={sfxEnabled}
        setSfxEnabled={setSfxEnabled}
        onResetGame={handleResetGamePrompt}
        onRestartNewSave={() => handleRestartNewSave(null, managerName)}
        onOpenStartScreen={() => setIsGameStarted(false)}
        isSpectatorMode={isSpectatorMode}
        hasSeasonResults={hasParadeResults}
        allParadesCompleted={isAllParadesCompleted}
        completedParadesCount={completedParadeSchoolIds.length}
        totalSchoolsCount={totalSchoolsCount}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6">
        {activeTab === 'dashboard' && userSchool && (
          <DashboardView
            school={userSchool}
            currentYear={currentYear}
            onNavigateTab={setActiveTab}
            news={news}
            onStartSimulation={generateScores}
            hasParadeResults={hasParadeResults}
            allParadesCompleted={isAllParadesCompleted}
            completedParadesCount={completedParadeSchoolIds.length}
            totalParadesCount={totalSchoolsCount}
            onSimulateAllParades={handleCompleteAllParades}
          />
        )}

        {activeTab === 'dashboard' && (!userSchool || isSpectatorMode) && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                MODO OBSERVADOR / PRESIDENTE DA LIGA
              </span>
              <h1 className="text-3xl font-black text-white">
                Carnaval Carioca {currentYear} • Grupo Especial, Série Ouro, Série Prata & Série Bronze
              </h1>
              <p className="text-sm text-slate-300 max-w-xl mx-auto">
                Você está acompanhando a temporada das {schools.length} agremiações como Presidente da LIGA.
                Assista e simule os desfiles de todos os 4 grupos na Passarela do Samba e realize a apuração completa das notas dos 36 jurados!
              </p>

              {/* Parades Progress status in Spectator Dashboard */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-slate-400">Desfiles Realizados:</span>
                <span className={`font-mono font-bold ${isAllParadesCompleted ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {completedParadeSchoolIds.length} / {totalSchoolsCount} {isAllParadesCompleted ? '(Concluídos)' : '(Pendentes)'}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('desfile')}
                  className={`px-6 py-3 rounded-xl font-black text-xs shadow-lg transition flex items-center gap-2 cursor-pointer ${
                    !isAllParadesCompleted
                      ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-amber-500/20 animate-pulse'
                      : 'bg-slate-800 hover:bg-slate-700 text-amber-300'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Assistir & Simular Desfiles na Sapucaí</span>
                </button>
                <button
                  onClick={() => setActiveTab('apuracao')}
                  className={`px-6 py-3 rounded-xl font-black text-xs shadow-lg transition flex items-center gap-2 cursor-pointer ${
                    isAllParadesCompleted
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-emerald-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700'
                  }`}
                >
                  <Trophy className="w-4 h-4" />
                  <span>{isAllParadesCompleted ? 'Abrir Apuração Oficial (Liberada)' : 'Apuração (Aguardando Desfiles)'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('glorias')}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Sala de Glórias & Títulos</span>
                </button>
                <button
                  onClick={() => setActiveTab('tabela')}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
                >
                  Ver Tabela das Escolas
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'glorias' && (
          <GloriasView
            schools={schools}
            userSchool={userSchool}
            currentYear={currentYear}
            history={history}
          />
        )}

        {activeTab === 'barracao' && userSchool && (
          <BarracaoView
            school={userSchool}
            onUpdateSchool={handleUpdateSchool}
            onShowMessage={showToast}
          />
        )}

        {activeTab === 'ensaios' && userSchool && (
          <EnsaiosView
            school={userSchool}
            onUpdateSchool={handleUpdateSchool}
            onShowMessage={showToast}
          />
        )}

        {activeTab === 'equipe' && userSchool && (
          <EquipeView
            school={userSchool}
            onUpdateSchool={handleUpdateSchool}
            onShowMessage={showToast}
          />
        )}

        {activeTab === 'financas' && userSchool && (
          <FinancasView
            school={userSchool}
            onUpdateSchool={handleUpdateSchool}
            onShowMessage={showToast}
          />
        )}

        {activeTab === 'desfile' && (
          <DesfileSimulator
            currentYear={currentYear}
            userSchool={userSchool}
            schools={schools}
            especialSchools={especialSchools}
            ouroSchools={ouroSchools}
            prataSchools={prataSchools}
            bronzeSchools={bronzeSchools}
            especialScores={especialScores}
            ouroScores={ouroScores}
            prataScores={prataScores}
            bronzeScores={bronzeScores}
            completedSchoolIds={completedParadeSchoolIds}
            onCompleteParade={handleCompleteParade}
            onCompleteParadesForDivision={handleCompleteParadesForDivision}
            onCompleteAllParades={handleCompleteAllParades}
            onNavigateToApuracao={() => setActiveTab('apuracao')}
          />
        )}

        {activeTab === 'apuracao' && (
          <ApuracaoView
            currentYear={currentYear}
            especialSchools={especialSchools}
            ouroSchools={ouroSchools}
            prataSchools={prataSchools}
            bronzeSchools={bronzeSchools}
            especialScores={especialScores}
            ouroScores={ouroScores}
            prataScores={prataScores}
            bronzeScores={bronzeScores}
            userSchool={userSchool}
            onAdvanceYear={handleAdvanceYear}
            onSimulateNewScores={generateScores}
            allParadesCompleted={isAllParadesCompleted}
            completedParadeCount={completedParadeSchoolIds.length}
            totalParadeCount={totalSchoolsCount}
            onNavigateToDesfile={() => setActiveTab('desfile')}
            onSimulateAllParades={handleCompleteAllParades}
          />
        )}

        {activeTab === 'tabela' && (
          <TabelaView
            currentYear={currentYear}
            especialSchools={especialSchools}
            ouroSchools={ouroSchools}
            prataSchools={prataSchools}
            bronzeSchools={bronzeSchools}
            userSchool={userSchool}
            history={history}
          />
        )}
      </main>

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-xs font-bold ${
              toastMessage.type === 'success'
                ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/50'
                : toastMessage.type === 'warning'
                ? 'bg-amber-950/90 text-amber-200 border-amber-500/50'
                : toastMessage.type === 'alert'
                ? 'bg-rose-950/90 text-rose-200 border-rose-500/50'
                : 'bg-slate-900/90 text-white border-slate-700'
            }`}
          >
            {toastMessage.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
            {toastMessage.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
            {toastMessage.type === 'info' && <Info className="w-4 h-4 text-blue-400" />}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* New Game / Setup Modal */}
      <NewGameModal
        isOpen={isNewGameModalOpen}
        especialSchools={especialSchools}
        ouroSchools={ouroSchools}
        prataSchools={prataSchools}
        bronzeSchools={bronzeSchools}
        onStartGame={handleStartNewGame}
        onClose={() => setIsNewGameModalOpen(false)}
      />
    </div>
  );
}
