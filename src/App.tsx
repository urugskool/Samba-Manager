/**
 * SambaFoot - O Brasfoot das Escolas de Samba
 * Simulador e Gerenciador de Carnaval Carioca
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  School,
  DivisionId,
  SchoolParadeScores,
  DivisionResult,
  YearHistory,
  NewsItem,
  DivisionStatesMap,
  CampeasParadeResult,
  QuesitoId
} from './types/carnaval';
import { INITIAL_SCHOOLS, INITIAL_HISTORY, RESULTS_2026, HISTORICAL_CARNAVAL_RECORDS, getSchoolConsolidatedStats } from './data/carnavalData';
import { simulateParadeDuration } from './config/paradeConfig';
import { SimulationEngine } from './services/simulationEngine';
import { soundService } from './services/soundService';
import { cleanSchoolName } from './utils/schoolNameUtils';

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
import { DesfileCampeãsView } from './components/DesfileCampeãsView';
import { SorteioOrdemView } from './components/SorteioOrdemView';
import { SpectatorSeasonOverview } from './components/SpectatorSeasonOverview';
import { EnredoService } from './services/enredoService';
import { CarnavalSorteio, ParadeDay, PARADE_DAYS_ORDER, CarnavalQuesitosDrawState } from './types/sorteio';
import { SorteioEngine } from './services/sorteioEngine';
import { SeasonMonthId } from './types/seasonCycle';
import { SEASON_PERIODS, SeasonCycleService } from './services/seasonCycleService';
import { TemporadaCycleModal } from './components/TemporadaCycleModal';
import { LiesaRankingModal } from './components/LiesaRankingModal';

import { Sparkles, Trophy, CheckCircle, AlertTriangle, Info, Dices, Lock, Calendar, ChevronRight } from 'lucide-react';

const STORAGE_KEY = 'sambamanager_save_v10';

// The 16 active schools in Grupo de Avaliação
const ACTIVE_AVALIACAO_IDS = new Set([
  'academicos_do_peixe',
  'concentra_imperial',
  'flor_da_mina',
  'gato_de_bonsucesso',
  'guardioes_da_capadocia',
  'imperio_da_penha',
  'imperio_da_resistencia',
  'imperio_ricardense',
  'independente_de_jacarepagua',
  'mocidade_de_inhauma',
  'mocidade_cidade_de_deus',
  'raca_rubro_negra',
  'renascer_de_nova_iguacu',
  'unidos_da_barra_da_tijuca',
  'unidos_da_vila_kennedy',
  'unidos_de_manguinhos'
]);

// Initial inactive / afastadas schools (including historical extinct schools)
const INITIAL_INACTIVE_SCHOOL_IDS = new Set([
  'imperio_bras_de_pina',
  'tpm_madureira',
  'amarelinho',
  'uniao_vaz_lobo',
  'imperio_petropolis',
  'sao_cristovao',
  'manguariba',
  'unidos_anil',
  'canarios_laranjeiras',
  'mocidade_louca_sao_cristovao',
  'cada_ano_sai_melhor',
  'tres_mosqueteiros',
  'depois_eu_digo',
  'azul_e_branco_salgueiro',
  'aprendizes_de_lucas',
  'recreio_de_ramos',
  'prazer_da_serrinha',
  'unidos_da_capela',
  'coracoes_unidos_jacarepagua',
  'flor_do_lins',
  'paz_e_amor',
  'tupy_bras_de_pina',
  'uniao_do_centenario',
  'unidos_do_indaia',
  'academicos_bento_ribeiro',
  'aprendizes_boca_do_mato',
  'independentes_cordovil',
  'independentes_do_rio',
  'unidos_bento_ribeiro',
  'unidos_do_salgueiro'
]);

function sanitizeSchoolsData(loadedSchools: School[]): School[] {
  const loadedIds = new Set(loadedSchools.map((s) => s.id));
  const missingFromInitial = INITIAL_SCHOOLS.filter((s) => !loadedIds.has(s.id));
  const fullSchoolList = [...loadedSchools, ...missingFromInitial];

  const processedSchools = fullSchoolList.map((s) => {
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
      runnerUpsBronze: 0,
      championshipsAvaliacao: 0,
      runnerUpsAvaliacao: 0
    };

    const initialSchool = INITIAL_SCHOOLS.find((init) => init.id === s.id);

    // Determine inactive state cleanly:
    // Respect explicit inactive flag if defined in saved school; otherwise use initial baseline.
    let isInactive = false;
    if (s.isInactive !== undefined || (s as any).inactive !== undefined) {
      isInactive = Boolean(s.isInactive || (s as any).inactive);
    } else if (INITIAL_INACTIVE_SCHOOL_IDS.has(s.id)) {
      isInactive = true;
    } else {
      isInactive = Boolean(initialSchool?.isInactive || initialSchool?.inactive);
    }

    const updatedSchool: School = {
      ...s,
      ...(initialSchool
        ? {
            name: initialSchool.name,
            shortName: initialSchool.shortName,
            abbreviation: initialSchool.abbreviation,
            denomination: initialSchool.denomination,
            corporateName: initialSchool.corporateName,
            nickname: initialSchool.nickname,
            motto: initialSchool.motto,
            colors: initialSchool.colors,
            colorsDescription: initialSchool.colorsDescription,
            foundationYear: initialSchool.foundationYear,
            foundationDate: initialSchool.foundationDate,
            symbol: initialSchool.symbol,
            neighborhood: initialSchool.neighborhood
          }
        : {}),
      isInactive,
      inactive: isInactive,
      honors: {
        ...s.honors,
        historicalEspecialTitles: historicalBaseline.championshipsEspecial,
        historicalEspecialYears: historicalBaseline.especialYears || [],
        historicalEspecialRunnerUps: historicalBaseline.runnerUpsEspecial,
        historicalEspecialRunnerUpYears: historicalBaseline.especialRunnerUpYears || [],
        historicalOuroTitles: historicalBaseline.championshipsOuro,
        historicalOuroYears: historicalBaseline.ouroYears || [],
        historicalOuroRunnerUps: historicalBaseline.runnerUpsOuro,
        historicalOuroRunnerUpYears: historicalBaseline.ouroRunnerUpYears || [],
        historicalPrataTitles: historicalBaseline.championshipsPrata || 0,
        historicalPrataYears: historicalBaseline.prataYears || [],
        historicalPrataRunnerUps: historicalBaseline.runnerUpsPrata || 0,
        historicalPrataRunnerUpYears: historicalBaseline.prataRunnerUpYears || [],
        historicalBronzeTitles: historicalBaseline.championshipsBronze || 0,
        historicalBronzeYears: historicalBaseline.bronzeYears || [],
        historicalBronzeRunnerUps: historicalBaseline.runnerUpsBronze || 0,
        historicalAvaliacaoTitles: historicalBaseline.championshipsAvaliacao || 0,
        historicalAvaliacaoYears: historicalBaseline.avaliacaoYears || [],
        historicalAvaliacaoRunnerUps: historicalBaseline.runnerUpsAvaliacao || 0,
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
      runnerUpsBronze: cons.totalBronzeVices,
      championshipsAvaliacao: cons.totalAvaliacaoTitles,
      runnerUpsAvaliacao: cons.totalAvaliacaoVices
    };
  });

  // Ensure active schools have 100% unique, non-repeating tailored enredos (no duplicates or generic sample enredos)
  const usedTitlesThisSeason = new Set<string>();
  return processedSchools.map((school) => {
    if (school.isInactive || (school as any).inactive) return school;

    const currentTitle = school.currentEnredo?.title;
    const isSampleOrDuplicate =
      !currentTitle ||
      currentTitle.includes('SAMPLE') ||
      usedTitlesThisSeason.has(currentTitle);

    if (!isSampleOrDuplicate && currentTitle) {
      usedTitlesThisSeason.add(currentTitle);
      return school;
    }

    const freshEnredo = EnredoService.generateUniqueEnredoForSchool(school, 2027, usedTitlesThisSeason);
    usedTitlesThisSeason.add(freshEnredo.title);
    return {
      ...school,
      currentEnredo: freshEnredo
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
      const saved =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem('sambamanager_save_v8') ||
        localStorage.getItem('sambamanager_save_v7');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.schools && parsed.schools.length > 0) {
            return sanitizeSchoolsData(parsed.schools);
          }
        } catch {}
      }
    }
    return sanitizeSchoolsData(INITIAL_SCHOOLS);
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
  const [startScreenInitialMode, setStartScreenInitialMode] = useState<'manage' | 'create' | 'spectator'>('manage');

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
  const [isLiesaModalOpen, setIsLiesaModalOpen] = useState<boolean>(false);

  // Parade Scores & Apuração persistent states
  const DEFAULT_DIVISION_STATES: DivisionStatesMap = {
    especial: { hasStarted: false, quesitoIdx: 0, judgeIdx: 0, schoolIdx: 0, isCompleted: false },
    ouro: { hasStarted: false, quesitoIdx: 0, judgeIdx: 0, schoolIdx: 0, isCompleted: false },
    prata: { hasStarted: false, quesitoIdx: 0, judgeIdx: 0, schoolIdx: 0, isCompleted: false },
    bronze: { hasStarted: false, quesitoIdx: 0, judgeIdx: 0, schoolIdx: 0, isCompleted: false },
    avaliacao: { hasStarted: false, quesitoIdx: 0, judgeIdx: 0, schoolIdx: 0, isCompleted: false }
  };

  const [especialScores, setEspecialScores] = useState<SchoolParadeScores[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed.especialScores) && parsed.especialScores.length > 0) {
            return parsed.especialScores;
          }
        } catch {}
      }
    }
    return [];
  });

  const [ouroScores, setOuroScores] = useState<SchoolParadeScores[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed.ouroScores) && parsed.ouroScores.length > 0) {
            return parsed.ouroScores;
          }
        } catch {}
      }
    }
    return [];
  });

  const [prataScores, setPrataScores] = useState<SchoolParadeScores[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed.prataScores) && parsed.prataScores.length > 0) {
            return parsed.prataScores;
          }
        } catch {}
      }
    }
    return [];
  });

  const [bronzeScores, setBronzeScores] = useState<SchoolParadeScores[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed.bronzeScores) && parsed.bronzeScores.length > 0) {
            return parsed.bronzeScores;
          }
        } catch {}
      }
    }
    return [];
  });

  const [avaliacaoScores, setAvaliacaoScores] = useState<SchoolParadeScores[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed.avaliacaoScores) && parsed.avaliacaoScores.length > 0) {
            return parsed.avaliacaoScores;
          }
        } catch {}
      }
    }
    return [];
  });

  const [hasParadeResults, setHasParadeResults] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (typeof parsed.hasParadeResults === 'boolean') {
            return parsed.hasParadeResults;
          }
        } catch {}
      }
    }
    return false;
  });

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

  const [divisionStates, setDivisionStates] = useState<DivisionStatesMap>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.divisionStates && typeof parsed.divisionStates === 'object') {
            return parsed.divisionStates;
          }
        } catch {}
      }
    }
    return DEFAULT_DIVISION_STATES;
  });

  const [campeasParadeResults, setCampeasParadeResults] = useState<Record<string, CampeasParadeResult>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.campeasParadeResults && typeof parsed.campeasParadeResults === 'object') {
            return parsed.campeasParadeResults;
          }
        } catch {}
      }
    }
    return {};
  });

  const [sorteio, setSorteio] = useState<CarnavalSorteio>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const yr = parsed.currentYear || 2027;
          if (parsed.sorteio && parsed.sorteio.year === yr) {
            return parsed.sorteio;
          }
        } catch {}
      }
    }
    return SorteioEngine.createInitialSorteio(currentYear);
  });

  // Ensure sorteio matches currentYear
  useEffect(() => {
    if (!sorteio || sorteio.year !== currentYear) {
      setSorteio(SorteioEngine.createInitialSorteio(currentYear));
    }
  }, [currentYear, sorteio]);

  // Verifica se o sorteio de todas as divisões foi concluído
  const isSorteioDone = Boolean(
    sorteio?.isCompleted ||
    (sorteio?.divisions &&
      sorteio.divisions.especial?.isCompleted &&
      sorteio.divisions.ouro?.isCompleted &&
      sorteio.divisions.prata?.isCompleted &&
      sorteio.divisions.bronze?.isCompleted &&
      sorteio.divisions.avaliacao?.isCompleted)
  );

  // Sorteio da Ordem de Leitura dos Quesitos e Critérios de Desempate (LIESA -> LIGA-RJ -> Superliga)
  const [quesitosDraw, setQuesitosDraw] = useState<CarnavalQuesitosDrawState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const yr = parsed.currentYear || 2027;
          if (parsed.quesitosDraw && parsed.quesitosDraw.year === yr) {
            return parsed.quesitosDraw;
          }
        } catch {}
      }
    }
    return SorteioEngine.createInitialQuesitosDraw(currentYear);
  });

  // Ensure quesitosDraw matches currentYear
  useEffect(() => {
    if (!quesitosDraw || quesitosDraw.year !== currentYear) {
      setQuesitosDraw(SorteioEngine.createInitialQuesitosDraw(currentYear));
    }
  }, [currentYear, quesitosDraw]);

  // Ciclo da Temporada (Passagem de Tempo de Março a Fevereiro)
  const [currentSeasonMonth, setCurrentSeasonMonth] = useState<SeasonMonthId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.currentSeasonMonth) return parsed.currentSeasonMonth;
        } catch {}
      }
    }
    return 'marco';
  });

  const [isSeasonCycleModalOpen, setIsSeasonCycleModalOpen] = useState<boolean>(false);

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
      body: 'Os barracões do Especial, os terreiros da Série Ouro, a vibrante Série Prata, a disputadíssima Série Bronze e o Grupo de Avaliação dão a largada para o Carnaval 2027!',
      type: 'info',
      date: 'Hoje'
    },
    {
      id: 'news_2',
      year: 2027,
      title: 'Pirâmide do Carnaval com 5 Divisões e Grupo de Avaliação',
      body: 'Consulte os títulos históricos e a dinâmica de acessos, rebaixamentos e o processo de afastamento no Grupo de Avaliação. Todas as novas honras serão eternizadas!',
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

  const isSchoolActive = useCallback((s: School) => !s.isInactive && !s.inactive, []);
  const isSchoolInactive = useCallback((s: School) => Boolean(s.isInactive || s.inactive), []);

  const generateScores = useCallback(() => {
    const espSchools = schools.filter((s) => s.division === 'especial' && isSchoolActive(s));
    const ourSchools = schools.filter((s) => s.division === 'ouro' && isSchoolActive(s));
    const praSchools = schools.filter((s) => s.division === 'prata' && isSchoolActive(s));
    const broSchools = schools.filter((s) => s.division === 'bronze' && isSchoolActive(s));
    const avaSchools = schools.filter((s) => s.division === 'avaliacao' && isSchoolActive(s));

    const espScores = SimulationEngine.simulateDivisionParades(espSchools, sorteio);
    const ourScores = SimulationEngine.simulateDivisionParades(ourSchools, sorteio);
    const praScores = SimulationEngine.simulateDivisionParades(praSchools, sorteio);
    const broScores = SimulationEngine.simulateDivisionParades(broSchools, sorteio);
    const avaScores = SimulationEngine.simulateDivisionParades(avaSchools, sorteio);

    setEspecialScores(espScores);
    setOuroScores(ourScores);
    setPrataScores(praScores);
    setBronzeScores(broScores);
    setAvaliacaoScores(avaScores);
    setHasParadeResults(true);
  }, [schools, isSchoolActive, sorteio]);

  // Pre-generate parade scores if none exist for current year
  useEffect(() => {
    if (!hasParadeResults && schools.length > 0) {
      generateScores();
    }
  }, [hasParadeResults, schools.length, generateScores]);

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
        completedParadeSchoolIds,
        especialScores,
        ouroScores,
        prataScores,
        bronzeScores,
        avaliacaoScores,
        hasParadeResults,
        divisionStates,
        campeasParadeResults,
        sorteio,
        quesitosDraw,
        currentSeasonMonth
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    }
  }, [
    schools,
    currentYear,
    userSchoolId,
    isSpectatorMode,
    managerName,
    history,
    completedParadeSchoolIds,
    especialScores,
    ouroScores,
    prataScores,
    bronzeScores,
    avaliacaoScores,
    hasParadeResults,
    divisionStates,
    campeasParadeResults,
    sorteio,
    quesitosDraw,
    currentSeasonMonth
  ]);

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

  const handleRecordParadeTime = useCallback(
    (
      schoolId: string,
      duration: number,
      penalty: number,
      status: 'regular' | 'estouro' | 'abaixo',
      diffMinutes: number
    ) => {
      const updateScores = (prev: SchoolParadeScores[], div: DivisionId) => {
        const schoolObj = schools.find((s) => s.id === schoolId);
        const belongsToDiv = schoolObj?.division === div;
        const exists = prev.some((s) => s.schoolId === schoolId);

        if (!exists && belongsToDiv && schoolObj) {
          const [sim] = SimulationEngine.simulateDivisionParades([schoolObj]);
          const techPenalty = sim.technicalPenalty ?? 0;
          const totalPenalty = Math.round((penalty + techPenalty) * 10) / 10;
          const finalScore = Math.max(0, Math.round((sim.totalScore - totalPenalty) * 10) / 10);
          return [
            ...prev,
            {
              ...sim,
              paradeTimeMinutes: duration,
              penalties: totalPenalty,
              timePenalty: penalty,
              timeStatus: status,
              timeDifferenceMinutes: diffMinutes,
              finalScore
            }
          ];
        }

        return prev.map((s) => {
          if (s.schoolId === schoolId) {
            const techPenalty = s.technicalPenalty ?? 0;
            const totalPenalty = Math.round((penalty + techPenalty) * 10) / 10;
            const finalScore = Math.max(0, Math.round((s.totalScore - totalPenalty) * 10) / 10);
            return {
              ...s,
              paradeTimeMinutes: duration,
              penalties: totalPenalty,
              timePenalty: penalty,
              timeStatus: status,
              timeDifferenceMinutes: diffMinutes,
              finalScore
            };
          }
          return s;
        });
      };

      setEspecialScores((prev) => updateScores(prev, 'especial'));
      setOuroScores((prev) => updateScores(prev, 'ouro'));
      setPrataScores((prev) => updateScores(prev, 'prata'));
      setBronzeScores((prev) => updateScores(prev, 'bronze'));
      setAvaliacaoScores((prev) => updateScores(prev, 'avaliacao'));
    },
    [schools]
  );

  const handleCompleteParade = useCallback(
    (
      schoolId: string,
      simulatedData?: {
        duration: number;
        penalty: number;
        status: 'regular' | 'estouro' | 'abaixo';
        diffMinutes: number;
      }
    ) => {
      setCompletedParadeSchoolIds((prev) => (prev.includes(schoolId) ? prev : [...prev, schoolId]));
      if (simulatedData) {
        handleRecordParadeTime(
          schoolId,
          simulatedData.duration,
          simulatedData.penalty,
          simulatedData.status,
          simulatedData.diffMinutes
        );
      }
      const school = schools.find((s) => s.id === schoolId);
      showToast(
        `Desfile da ${school ? cleanSchoolName(school) : 'agremiação'} concluído na passarela! As notas dos 36 jurados foram lacradas.`,
        'success'
      );
    },
    [schools, showToast, handleRecordParadeTime]
  );

  const handleCompleteParadesForDivision = useCallback(
    (division: DivisionId) => {
      const divSchools = schools.filter((s) => s.division === division && isSchoolActive(s));
      const divSchoolIds = divSchools.map((s) => s.id);
      const divSlots = sorteio?.divisions?.[division]?.slots || [];
      const slotOrderMap = new Map(divSlots.map((slot, idx) => [slot.schoolId, idx]));

      const pendingSchools = divSchools
        .filter((s) => !completedParadeSchoolIds.includes(s.id))
        .sort((a, b) => (slotOrderMap.get(a.id) ?? 999) - (slotOrderMap.get(b.id) ?? 999));

      pendingSchools.forEach((sch) => {
        const timeResult = simulateParadeDuration(sch);
        handleRecordParadeTime(
          sch.id,
          timeResult.duration,
          timeResult.penalty,
          timeResult.timeStatus,
          timeResult.diffMinutes
        );
      });

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
          : division === 'bronze'
          ? 'Série Bronze'
          : 'Grupo de Avaliação';
      showToast(`Todos os desfiles da ${divName} foram realizados na ordem oficial e avaliados pelos jurados!`, 'success');
    },
    [schools, completedParadeSchoolIds, showToast, isSchoolActive, handleRecordParadeTime, sorteio]
  );

  const handleCompleteDayParades = useCallback(
    (day: ParadeDay) => {
      const daySlots = sorteio.divisions
        ? Object.values(sorteio.divisions).flatMap((d) => d.slots).filter((s) => s.day === day)
        : [];
      const daySchoolIds = daySlots.map((s) => s.schoolId);
      const daySchools = daySchoolIds
        .map((id) => schools.find((s) => s.id === id))
        .filter((s): s is School => !!s && !completedParadeSchoolIds.includes(s.id));

      daySchools.forEach((sch) => {
        const timeResult = simulateParadeDuration(sch);
        handleRecordParadeTime(
          sch.id,
          timeResult.duration,
          timeResult.penalty,
          timeResult.timeStatus,
          timeResult.diffMinutes
        );
      });

      setCompletedParadeSchoolIds((prev) => {
        const updated = new Set([...prev, ...daySchools.map((s) => s.id)]);
        return Array.from(updated);
      });

      const dayInfo = PARADE_DAYS_ORDER.find((d) => d.id === day);
      showToast(`Desfiles de ${dayInfo?.label || day} concluídos na ordem oficial!`, 'success');
    },
    [sorteio, schools, completedParadeSchoolIds, showToast, handleRecordParadeTime]
  );

  const activeSchools = useMemo(() => schools.filter(isSchoolActive), [schools, isSchoolActive]);
  const especialSchools = useMemo(() => schools.filter((s) => s.division === 'especial' && isSchoolActive(s)), [schools, isSchoolActive]);
  const ouroSchools = useMemo(() => schools.filter((s) => s.division === 'ouro' && isSchoolActive(s)), [schools, isSchoolActive]);
  const prataSchools = useMemo(() => schools.filter((s) => s.division === 'prata' && isSchoolActive(s)), [schools, isSchoolActive]);
  const bronzeSchools = useMemo(() => schools.filter((s) => s.division === 'bronze' && isSchoolActive(s)), [schools, isSchoolActive]);
  const avaliacaoSchools = useMemo(() => schools.filter((s) => s.division === 'avaliacao' && isSchoolActive(s)), [schools, isSchoolActive]);
  const inactiveSchools = useMemo(() => schools.filter(isSchoolInactive), [schools, isSchoolInactive]);

  // Canonical official standings for Grupo Especial (single source of truth)
  const officialEspecialStandings = useMemo(() => {
    return SimulationEngine.getOfficialEspecialStandings(
      especialSchools,
      especialScores,
      sorteio,
      currentYear,
      history,
      quesitosDraw
    );
  }, [
    especialSchools,
    especialScores,
    sorteio,
    currentYear,
    history,
    quesitosDraw
  ]);

  const handleReactivateSchool = useCallback((schoolId: string) => {
    setSchools((prev) =>
      prev.map((s) => {
        if (s.id === schoolId) {
          return {
            ...s,
            isInactive: false,
            inactive: false,
            division: 'avaliacao',
            inactiveYearsCount: 0,
            suspensionReason: undefined
          };
        }
        return s;
      })
    );
    showToast('Agremiação reativada com sucesso! Agora disputa o Grupo de Avaliação pela Superliga.', 'success');
  }, [showToast]);

  const totalSchoolsCount = activeSchools.length;
  const isAllParadesCompleted = totalSchoolsCount > 0 && completedParadeSchoolIds.length >= totalSchoolsCount;
  const isAllApuracoesCompleted = Boolean(
    divisionStates.especial.isCompleted &&
    divisionStates.ouro.isCompleted &&
    divisionStates.prata.isCompleted &&
    divisionStates.bronze.isCompleted &&
    divisionStates.avaliacao.isCompleted
  );

  const handleCompleteAllParades = useCallback(() => {
    const chronologicalList = sorteio?.isCompleted
      ? SorteioEngine.getChronologicalParadeOrder(sorteio, schools)
      : [];
    const pendingItems = chronologicalList.filter((item) => !completedParadeSchoolIds.includes(item.school.id));

    pendingItems.forEach((item) => {
      const sch = item.school;
      const timeResult = simulateParadeDuration(sch);
      handleRecordParadeTime(
        sch.id,
        timeResult.duration,
        timeResult.penalty,
        timeResult.timeStatus,
        timeResult.diffMinutes
      );
    });

    const allIds = activeSchools.map((s: School) => s.id);
    setCompletedParadeSchoolIds(allIds);
    showToast('Todos os desfiles do Carnaval foram realizados na ordem cronológica oficial! A apuração oficial das notas está liberada!', 'success');
  }, [sorteio, schools, activeSchools, completedParadeSchoolIds, showToast, handleRecordParadeTime]);

  // Find user school & division lists
  const userSchool = schools.find((s) => s.id === userSchoolId) || null;

  // Update a single school
  const handleUpdateSchool = (updatedSchool: School) => {
    setSchools((prev) => prev.map((s) => (s.id === updatedSchool.id ? updatedSchool : s)));
  };

  // Start from Title Screen
  const handleStartGame = (schoolId: string | null, name: string, customSchool?: School) => {
    if (customSchool) {
      const updatedSchools = [customSchool, ...schools.filter((s) => s.id !== customSchool.id)];
      setSchools(updatedSchools);
      setUserSchoolId(customSchool.id);
      setIsSpectatorMode(false);
      setManagerName(name);
      setIsGameStarted(true);
      setActiveTab('dashboard');

      // Garante que o Grupo de Avaliação já contenha as notas simuladas da escola criada
      const avaSchools = updatedSchools.filter((s) => s.division === 'avaliacao' && isSchoolActive(s));
      const newAvaScores = SimulationEngine.simulateDivisionParades(avaSchools);
      setAvaliacaoScores(newAvaScores);
      setHasParadeResults(true);

      // Reinicia o sorteio da temporada para que o globo do Grupo de Avaliação inclua a nova agremiação
      const freshSorteio = SorteioEngine.createInitialSorteio(currentYear);
      setSorteio(freshSorteio);

      showToast(
        `🎉 Agremiação ${customSchool.name} fundada com sucesso! Seja bem-vindo ao comando no Grupo de Avaliação na Intendente Magalhães!`,
        'success'
      );
      return;
    }

    setUserSchoolId(schoolId);
    setIsSpectatorMode(!schoolId);
    setManagerName(name);
    setIsGameStarted(true);
    setActiveTab('dashboard');

    const chosen = schoolId ? schools.find((s) => s.id === schoolId) : null;
    showToast(
      chosen
        ? `Bem-vindo ao comando da ${chosen.name}! Temporada do Carnaval ${currentYear} iniciada!`
        : `Modo Observador ativado! Supervisão geral do Carnaval ${currentYear} (LIESA, LIGA RJ e Superliga)!`,
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
      localStorage.removeItem('sambamanager_save_v9');
      localStorage.removeItem('sambamanager_save_v8');
      localStorage.removeItem('sambamanager_save_v7');
      localStorage.removeItem('sambamanager_save_v4');
      localStorage.removeItem('sambamanager_save_v3');
    }
    setSchools(sanitizeSchoolsData(INITIAL_SCHOOLS));
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
    setAvaliacaoScores([]);
    setDivisionStates(DEFAULT_DIVISION_STATES);
    setCampeasParadeResults({});
    const freshSorteio = SorteioEngine.createInitialSorteio(2027);
    setSorteio(freshSorteio);
    const freshQuesitosDraw = SorteioEngine.createInitialQuesitosDraw(2027);
    setQuesitosDraw(freshQuesitosDraw);
    setCurrentSeasonMonth('marco');
    setIsNewGameModalOpen(false);
    setIsGameStarted(schoolId !== null);
    setActiveTab('dashboard');

    showToast('Novo save criado! O Carnaval 2027 foi reiniciado no estado original de todas as 5 divisões.', 'success');
  };

  // Reset Game / Return to Start Screen
  const handleResetGamePrompt = (mode: 'manage' | 'create' | 'spectator' = 'manage') => {
    setStartScreenInitialMode(mode);
    setIsGameStarted(false);
  };

  // Fine for overtime in Campeãs
  const handleApplyFineToUserSchool = useCallback((amount: number) => {
    if (userSchoolId && amount > 0) {
      setSchools((prev) =>
        prev.map((s) => (s.id === userSchoolId ? { ...s, budget: Math.max(0, s.budget - amount) } : s))
      );
      showToast(`Multa estatutária de R$ ${amount.toLocaleString('pt-BR')} debitada da tesouraria por estouro de tempo no Sábado das Campeãs!`, 'alert');
    }
  }, [userSchoolId, showToast]);

  // Advance Season to Next Year
  const handleAdvanceYear = (
    espResult: DivisionResult,
    ouroResult: DivisionResult,
    prataResult: DivisionResult,
    bronzeResult: DivisionResult,
    avaResult?: DivisionResult
  ) => {
    try {
      const quesitoOrders: Partial<Record<DivisionId, QuesitoId[]>> = {
        especial: SorteioEngine.getQuesitosOrderForDivision('especial', quesitosDraw),
        ouro: SorteioEngine.getQuesitosOrderForDivision('ouro', quesitosDraw),
        prata: SorteioEngine.getQuesitosOrderForDivision('prata', quesitosDraw),
        bronze: SorteioEngine.getQuesitosOrderForDivision('bronze', quesitosDraw),
        avaliacao: SorteioEngine.getQuesitosOrderForDivision('avaliacao', quesitosDraw)
      };

      const nextSeasonData = SimulationEngine.advanceToNextYear(
        schools,
        espResult,
        ouroResult,
        prataResult,
        bronzeResult,
        currentYear,
        history,
        avaResult,
        quesitoOrders
      );

      setSchools(nextSeasonData.nextSchools);
      setCurrentYear(nextSeasonData.nextYear);
      setHistory(nextSeasonData.newHistory);
      setHasParadeResults(false);
      setCompletedParadeSchoolIds([]);
      setEspecialScores([]);
      setOuroScores([]);
      setPrataScores([]);
      setBronzeScores([]);
      setAvaliacaoScores([]);
      setDivisionStates(DEFAULT_DIVISION_STATES);
      setCampeasParadeResults({});
      const freshSorteio = SorteioEngine.createInitialSorteio(nextSeasonData.nextYear);
      setSorteio(freshSorteio);
      const freshQuesitosDraw = SorteioEngine.createInitialQuesitosDraw(nextSeasonData.nextYear);
      setQuesitosDraw(freshQuesitosDraw);
      setCurrentSeasonMonth('marco');

      // Add News
      const newsHeadline: NewsItem = {
        id: `news_${nextSeasonData.nextYear}`,
        year: nextSeasonData.nextYear,
        title: `Temporada do Carnaval ${nextSeasonData.nextYear} Iniciada!`,
        body: `${nextSeasonData.summary.especialChampionName} defende o título do Especial! ${nextSeasonData.summary.ouroChampionName} subiu para a elite. Na Série Prata, ${nextSeasonData.summary.prataChampionName} sagrou-se campeã! Na Série Bronze, ${nextSeasonData.summary.bronzeChampionName} subiu de divisão. No Grupo de Avaliação, ${nextSeasonData.summary.avaliacaoChampionName || 'a campeã'} garantiu o acesso!`,
        type: 'success',
        date: 'Agora'
      };
      setNews((prev) => [newsHeadline, ...prev]);

      setActiveTab('dashboard');
      showToast(
        `Carnaval ${nextSeasonData.nextYear} iniciado! Agremiações rebaixadas e promovidas foram transferidas de divisão!`,
        'success'
      );
    } catch (err) {
      console.error('Falha ao avançar temporada:', err);
      showToast('Ocorreu um erro ao avançar para a próxima temporada. Tente novamente.', 'alert');
    }
  };

  const handleFinalizeSeasonFromCampeas = useCallback(() => {
    // Grupo Especial: garantir ordem oficial dos desfiles e notas completas
    const espParadeOrdered = SorteioEngine.getDivisionOfficialParadeOrder(
      'especial',
      especialSchools,
      sorteio,
      currentYear,
      history
    ).map((i) => i.school);
    const espScoresMap = new Map((especialScores || []).map((s) => [s.schoolId, s]));
    const guaranteedEspScores = espParadeOrdered.map((school) => {
      const existing = espScoresMap.get(school.id);
      if (existing && existing.scoresByQuesito) return existing;
      const [generated] = SimulationEngine.simulateDivisionParades([school], sorteio);
      return generated;
    });

    const espResult = SimulationEngine.finalizeSeasonDivision(
      'especial',
      currentYear,
      espParadeOrdered,
      guaranteedEspScores,
      ouroSchools.length,
      prataSchools.length,
      bronzeSchools.length,
      SorteioEngine.getQuesitosOrderForDivision('especial', quesitosDraw)
    );

    // Série Ouro
    const ouroParadeOrdered = SorteioEngine.getDivisionOfficialParadeOrder(
      'ouro',
      ouroSchools,
      sorteio,
      currentYear,
      history
    ).map((i) => i.school);
    const ouroScoresMap = new Map((ouroScores || []).map((s) => [s.schoolId, s]));
    const guaranteedOuroScores = ouroParadeOrdered.map((school) => {
      const existing = ouroScoresMap.get(school.id);
      if (existing && existing.scoresByQuesito) return existing;
      const [generated] = SimulationEngine.simulateDivisionParades([school], sorteio);
      return generated;
    });
    const ouroResult = SimulationEngine.finalizeSeasonDivision(
      'ouro',
      currentYear,
      ouroParadeOrdered,
      guaranteedOuroScores,
      ouroSchools.length,
      prataSchools.length,
      bronzeSchools.length,
      SorteioEngine.getQuesitosOrderForDivision('ouro', quesitosDraw)
    );

    // Série Prata
    const prataParadeOrdered = SorteioEngine.getDivisionOfficialParadeOrder(
      'prata',
      prataSchools,
      sorteio,
      currentYear,
      history
    ).map((i) => i.school);
    const prataScoresMap = new Map((prataScores || []).map((s) => [s.schoolId, s]));
    const guaranteedPrataScores = prataParadeOrdered.map((school) => {
      const existing = prataScoresMap.get(school.id);
      if (existing && existing.scoresByQuesito) return existing;
      const [generated] = SimulationEngine.simulateDivisionParades([school], sorteio);
      return generated;
    });
    const prataResult = SimulationEngine.finalizeSeasonDivision(
      'prata',
      currentYear,
      prataParadeOrdered,
      guaranteedPrataScores,
      ouroSchools.length,
      prataSchools.length,
      bronzeSchools.length,
      SorteioEngine.getQuesitosOrderForDivision('prata', quesitosDraw)
    );

    // Série Bronze
    const bronzeParadeOrdered = SorteioEngine.getDivisionOfficialParadeOrder(
      'bronze',
      bronzeSchools,
      sorteio,
      currentYear,
      history
    ).map((i) => i.school);
    const bronzeScoresMap = new Map((bronzeScores || []).map((s) => [s.schoolId, s]));
    const guaranteedBronzeScores = bronzeParadeOrdered.map((school) => {
      const existing = bronzeScoresMap.get(school.id);
      if (existing && existing.scoresByQuesito) return existing;
      const [generated] = SimulationEngine.simulateDivisionParades([school], sorteio);
      return generated;
    });
    const bronzeResult = SimulationEngine.finalizeSeasonDivision(
      'bronze',
      currentYear,
      bronzeParadeOrdered,
      guaranteedBronzeScores,
      ouroSchools.length,
      prataSchools.length,
      bronzeSchools.length,
      SorteioEngine.getQuesitosOrderForDivision('bronze', quesitosDraw)
    );

    // Grupo de Avaliação
    const avaParadeOrdered = SorteioEngine.getDivisionOfficialParadeOrder(
      'avaliacao',
      avaliacaoSchools,
      sorteio,
      currentYear,
      history
    ).map((i) => i.school);
    const avaScoresMap = new Map((avaliacaoScores || []).map((s) => [s.schoolId, s]));
    const guaranteedAvaScores = avaParadeOrdered.map((school) => {
      const existing = avaScoresMap.get(school.id);
      if (existing && existing.scoresByQuesito) return existing;
      const [generated] = SimulationEngine.simulateDivisionParades([school], sorteio);
      return generated;
    });
    const avaResult = SimulationEngine.finalizeSeasonDivision(
      'avaliacao',
      currentYear,
      avaParadeOrdered,
      guaranteedAvaScores,
      ouroSchools.length,
      prataSchools.length,
      bronzeSchools.length,
      SorteioEngine.getQuesitosOrderForDivision('avaliacao', quesitosDraw)
    );

    handleAdvanceYear(espResult, ouroResult, prataResult, bronzeResult, avaResult);
  }, [
    currentYear,
    especialSchools,
    especialScores,
    ouroSchools,
    ouroScores,
    prataSchools,
    prataScores,
    bronzeSchools,
    bronzeScores,
    avaliacaoSchools,
    avaliacaoScores,
    quesitosDraw,
    sorteio,
    history,
    handleAdvanceYear
  ]);

  // Avançar mês no Ciclo da Temporada (estritamente sequencial, sem pular etapas)
  const handleAdvanceSeasonMonth = useCallback((targetMonth?: SeasonMonthId, targetTab?: string) => {
    const expectedNext = SeasonCycleService.getNextMonth(currentSeasonMonth);
    if (!expectedNext) {
      showToast('Você já está em Fevereiro! Realize os Desfiles, Apuração e Desfile das Campeãs.', 'info');
      return;
    }

    if (targetMonth && targetMonth !== expectedNext) {
      showToast('O calendário do Carnaval não permite pular etapas. Avance mês a mês para cumprir o ciclo da temporada.', 'warning');
      return;
    }

    // Participação obrigatória no Sorteio das Ordens de Desfile (Julho)
    const isSorteioDone = Boolean(
      sorteio?.isCompleted ||
      (sorteio?.divisions &&
        sorteio.divisions.especial?.isCompleted &&
        sorteio.divisions.ouro?.isCompleted &&
        sorteio.divisions.prata?.isCompleted &&
        sorteio.divisions.bronze?.isCompleted &&
        sorteio.divisions.avaliacao?.isCompleted)
    );

    if (currentSeasonMonth === 'julho' && !isSorteioDone) {
      if (targetMonth === 'agosto' || targetTab === 'ensaios' || targetTab === 'dashboard') {
        const fullSorteio = SorteioEngine.generateCompleteSorteio(schools, history, currentYear);
        setSorteio(fullSorteio);
      } else {
        soundService.playBuzzer();
        showToast(
          'O Sorteio Oficial das Ordens de Desfile é obrigatório pelo regulamento e deve ser realizado em Julho antes de avançar para Agosto!',
          'warning'
        );
        setActiveTab('sorteio');
        return;
      }
    }

    const nextId = expectedNext;
    const nextPeriod = SeasonCycleService.getPeriod(nextId);

    if (userSchool) {
      const sim = SeasonCycleService.simulateMonthProgress(userSchool, currentSeasonMonth);
      setSchools((prev) => prev.map((s) => (s.id === userSchool.id ? sim.updatedSchool : s)));
      soundService.playLevelUp();
      showToast(`${SeasonCycleService.getPeriod(currentSeasonMonth).name}: ${sim.summaryTitle}`, 'success');

      const monthNews: NewsItem = {
        id: `news_month_${nextId}_${Date.now()}`,
        year: currentYear,
        title: `${SeasonCycleService.getPeriod(currentSeasonMonth).name}: ${sim.summaryTitle}`,
        body: sim.summaryDescription,
        type: 'info',
        date: SeasonCycleService.getPeriod(currentSeasonMonth).name
      };
      setNews((prev) => [monthNews, ...prev]);
    } else {
      // MODO OBSERVADOR: Simula organicamente o progresso de todas as 80+ agremiações
      soundService.playLevelUp();
      const currentPeriodInfo = SeasonCycleService.getPeriod(currentSeasonMonth);

      setSchools((prev) =>
        prev.map((s) => {
          if (s.isInactive || (s as any).inactive) return s;

          // Garante que cada escola tem um enredo autêntico sem duplicidades
          let currentEnredo = s.currentEnredo;
          if (!currentEnredo || currentEnredo.title.includes('SAMPLE') || currentEnredo.title.trim() === '') {
            currentEnredo = EnredoService.generateUniqueEnredoForSchool(
              s,
              currentYear,
              new Set<string>()
            );
          }

          const sim = SeasonCycleService.simulateMonthProgress(s, currentSeasonMonth);
          const organicVariation = Math.floor((Math.random() * 5) - 2);

          return {
            ...sim.updatedSchool,
            currentEnredo,
            barracaoProgress: Math.min(100, Math.max(10, (sim.updatedSchool.barracaoProgress || 50) + organicVariation)),
            rehearsalLevel: Math.min(100, Math.max(10, (sim.updatedSchool.rehearsalLevel || 50) + organicVariation))
          };
        })
      );

      const spectatorNews: NewsItem = {
        id: `news_spectator_${nextId}_${Date.now()}`,
        year: currentYear,
        title: `${currentPeriodInfo.name}: ${currentPeriodInfo.activityTitle}`,
        body: `Acompanhamento oficial de todas as agremiações do Rio: ${currentPeriodInfo.description}`,
        type: 'info',
        date: currentPeriodInfo.name
      };
      setNews((prev) => [spectatorNews, ...prev]);

      showToast(
        `Ciclo avançado para ${nextPeriod.name}: ${nextPeriod.activityTitle}`,
        'info'
      );
    }

    setCurrentSeasonMonth(nextId);

    if (!userSchool) {
      // No modo observador, abas exclusivas de dirigente nunca abrem telas em branco!
      if (targetTab === 'sorteio' || targetTab === 'desfile' || targetTab === 'apuracao' || targetTab === 'campeas' || targetTab === 'glorias' || targetTab === 'tabela') {
        setActiveTab(targetTab);
      } else {
        setActiveTab('dashboard');
      }
    } else {
      if (targetTab) {
        setActiveTab(targetTab);
      } else if (activeTab === 'sorteio' && nextPeriod.focusTab) {
        setActiveTab(nextPeriod.focusTab);
      }
    }
  }, [currentSeasonMonth, userSchool, currentYear, showToast, sorteio, activeTab, schools]);

  // Simulação rápida para o modo observador: avança todos os meses até Fevereiro (Desfiles)
  const handleSimulateAllMonthsToCarnaval = useCallback(() => {
    soundService.playLevelUp();

    // 1. Se o sorteio de julho ainda não foi realizado, conclui oficialmente
    const isSorteioDone = Boolean(
      sorteio?.isCompleted ||
      (sorteio?.divisions && SorteioEngine.SORTEIO_ORDER.every((d) => sorteio.divisions[d]?.isCompleted))
    );
    if (!isSorteioDone) {
      const fullSorteio = SorteioEngine.generateCompleteSorteio(schools, history, currentYear);
      setSorteio(fullSorteio);
    }

    // 2. Prepara todas as escolas ativas com prontidão máxima de fevereiro
    setSchools((prev) =>
      prev.map((s) => {
        if (s.isInactive || (s as any).inactive) return s;
        let schoolEnredo = s.currentEnredo;
        if (!schoolEnredo || schoolEnredo.title.includes('SAMPLE') || schoolEnredo.title.trim() === '') {
          schoolEnredo = EnredoService.generateUniqueEnredoForSchool(
            s,
            currentYear,
            new Set<string>()
          );
        }

        const finalBarracao = Math.min(100, Math.max(90, 88 + Math.floor(Math.random() * 12)));
        const finalRehearsal = Math.min(100, Math.max(88, 86 + Math.floor(Math.random() * 14)));

        return {
          ...s,
          currentEnredo: schoolEnredo,
          barracaoProgress: finalBarracao,
          rehearsalLevel: finalRehearsal,
          technicalParadeDone: true
        };
      })
    );

    setCurrentSeasonMonth('fevereiro');
    setActiveTab('desfile');

    const carnivalSimNews: NewsItem = {
      id: `news_carnaval_sim_${Date.now()}`,
      year: currentYear,
      title: `Carnaval ${currentYear}: Preparação Concluída nas Passarelas!`,
      body: `Todas as 80+ agremiações finalizaram seus projetos de barracão e ensaios técnicos. A Marquês de Sapucaí e a Intendente Magalhães estão prontas para os grandes desfiles oficiais!`,
      type: 'success',
      date: 'Fevereiro'
    };
    setNews((prev) => [carnivalSimNews, ...prev]);

    showToast(
      'Ciclo da temporada simulado até Fevereiro! Todas as agremiações estão prontas na concentração!',
      'success'
    );
  }, [schools, history, currentYear, sorteio, showToast]);

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
          avaliacaoSchools={avaliacaoSchools}
          allSchools={schools}
          onStartGame={handleStartGame}
          onResetSave={() => handleRestartNewSave(null, managerName)}
          initialSchoolId={userSchoolId}
          initialSpectator={isSpectatorMode}
          initialMode={startScreenInitialMode}
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
        isCampeasAvailable={isAllApuracoesCompleted}
        isSorteioCompleted={isSorteioDone}
        currentMonth={currentSeasonMonth}
        onOpenSeasonCycleModal={() => setIsSeasonCycleModalOpen(true)}
        onBlockedTabClick={(reason) => showToast(reason, 'warning')}
        onOpenLiesaRanking={() => setIsLiesaModalOpen(true)}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-24 sm:pb-8">
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
            allApuracoesCompleted={isAllApuracoesCompleted}
            isSorteioCompleted={isSorteioDone}
            currentMonth={currentSeasonMonth}
            onOpenSeasonCycleModal={() => setIsSeasonCycleModalOpen(true)}
            onAdvanceMonth={handleAdvanceSeasonMonth}
          />
        )}

        {/* MODO OBSERVADOR: Dashboard e categorias de panorama das agremiações */}
        {(!userSchool || isSpectatorMode) && (
          (activeTab === 'dashboard' || activeTab === 'barracao' || activeTab === 'ensaios' || activeTab === 'equipe' || activeTab === 'financas') && (
            <SpectatorSeasonOverview
              schools={activeSchools}
              currentYear={currentYear}
              currentMonth={currentSeasonMonth}
              onNavigateTab={(tab) => {
                if (tab === 'sorteio' || tab === 'desfile' || tab === 'apuracao' || tab === 'campeas' || tab === 'glorias' || tab === 'tabela') {
                  setActiveTab(tab);
                } else {
                  setActiveTab(tab);
                }
              }}
              onAdvanceMonth={handleAdvanceSeasonMonth}
              sorteio={sorteio}
              news={news}
              defaultCategory={
                activeTab === 'barracao' || activeTab === 'ensaios' || activeTab === 'equipe' || activeTab === 'financas'
                  ? activeTab
                  : 'dashboard'
              }
              isAllParadesCompleted={isAllParadesCompleted}
              isAllApuracoesCompleted={isAllApuracoesCompleted}
              completedParadeCount={completedParadeSchoolIds.length}
              totalParadeCount={totalSchoolsCount}
              onOpenSeasonCycleModal={() => setIsSeasonCycleModalOpen(true)}
              onSimulateAllMonthsToCarnaval={handleSimulateAllMonthsToCarnaval}
            />
          )
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
            currentYear={currentYear}
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
            currentYear={currentYear}
            currentSeasonMonth={currentSeasonMonth}
            history={history}
            sorteio={sorteio}
            onUpdateSchool={handleUpdateSchool}
            onShowMessage={showToast}
          />
        )}

        {/* Trava Geral de Ciclo do Calendário da Temporada: impede assistir desfiles em agosto/setembro ou acessar sorteio antes de julho */}
        {(() => {
          const tabCheck = SeasonCycleService.isTabUnlockedForMonth(activeTab, currentSeasonMonth);
          if (!tabCheck.unlocked) {
            const currentPeriod = SeasonCycleService.getPeriod(currentSeasonMonth);
            const nextMonthId = SeasonCycleService.getNextMonth(currentSeasonMonth);
            const nextPeriod = nextMonthId ? SeasonCycleService.getPeriod(nextMonthId) : null;

            return (
              <div className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 text-center max-w-2xl mx-auto my-8 space-y-6 shadow-2xl animate-fadeIn">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400 shadow-xl shadow-amber-500/10">
                  <Lock className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-flex items-center gap-1.5">
                    CALENDÁRIO OFICIAL DO CARNAVAL • CICLO TEMPORAL
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    Atividade Indisponível em {currentPeriod.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
                    {tabCheck.reason}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-left space-y-2">
                  <div className="flex items-center justify-between text-amber-300 font-bold">
                    <span>Período Atual: {currentPeriod.name}</span>
                    <span>Mês {currentPeriod.monthIndex + 1} de 12</span>
                  </div>
                  <p className="text-slate-400">
                    <strong>Atividade Oficial da Temporada:</strong> {currentPeriod.activityTitle}
                  </p>
                  <p className="text-slate-400">
                    {currentPeriod.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  {nextPeriod && (
                    <button
                      onClick={() => handleAdvanceSeasonMonth(nextMonthId || undefined, userSchool ? undefined : 'dashboard')}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer transition transform hover:scale-[1.02]"
                    >
                      <span>Concluir {currentPeriod.name} & Avançar para {nextPeriod.name}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (!userSchool) {
                        setActiveTab('dashboard');
                      } else if (currentPeriod.focusTab && currentPeriod.focusTab !== activeTab) {
                        setActiveTab(currentPeriod.focusTab);
                      } else {
                        setActiveTab('dashboard');
                      }
                    }}
                    className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition"
                  >
                    <span>{userSchool ? `Ir para Atividade de ${currentPeriod.name}` : 'Ir para o Painel do Observador'}</span>
                  </button>

                  <button
                    onClick={() => setIsSeasonCycleModalOpen(true)}
                    className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition"
                  >
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Ver Linha do Tempo</span>
                  </button>
                </div>
              </div>
            );
          }
          return null;
        })()}

        {activeTab === 'sorteio' && SeasonCycleService.isTabUnlockedForMonth('sorteio', currentSeasonMonth).unlocked && (
          <SorteioOrdemView
            currentYear={currentYear}
            userSchool={userSchool}
            schools={activeSchools}
            history={history}
            sorteio={sorteio}
            completedParadesCount={completedParadeSchoolIds.length}
            onUpdateSorteio={(updated) => setSorteio(updated)}
            onNavigateToDesfile={() => setActiveTab('desfile')}
            onNavigateTab={setActiveTab}
            currentSeasonMonth={currentSeasonMonth}
            onAdvanceMonth={handleAdvanceSeasonMonth}
          />
        )}

        {activeTab === 'desfile' && SeasonCycleService.isTabUnlockedForMonth('desfile', currentSeasonMonth).unlocked && (
          <DesfileSimulator
            currentYear={currentYear}
            userSchool={userSchool}
            schools={activeSchools}
            especialSchools={especialSchools}
            ouroSchools={ouroSchools}
            prataSchools={prataSchools}
            bronzeSchools={bronzeSchools}
            avaliacaoSchools={avaliacaoSchools}
            especialScores={especialScores}
            ouroScores={ouroScores}
            prataScores={prataScores}
            bronzeScores={bronzeScores}
            avaliacaoScores={avaliacaoScores}
            completedSchoolIds={completedParadeSchoolIds}
            sorteio={sorteio}
            onNavigateToSorteio={() => setActiveTab('sorteio')}
            onCompleteDayParades={handleCompleteDayParades}
            onCompleteParade={handleCompleteParade}
            onRecordParadeTime={handleRecordParadeTime}
            onCompleteParadesForDivision={handleCompleteParadesForDivision}
            onCompleteAllParades={handleCompleteAllParades}
            onNavigateToApuracao={() => setActiveTab('apuracao')}
          />
        )}

        {activeTab === 'apuracao' && SeasonCycleService.isTabUnlockedForMonth('apuracao', currentSeasonMonth).unlocked && (
          <ApuracaoView
            currentYear={currentYear}
            especialSchools={especialSchools}
            ouroSchools={ouroSchools}
            prataSchools={prataSchools}
            bronzeSchools={bronzeSchools}
            avaliacaoSchools={avaliacaoSchools}
            especialScores={especialScores}
            ouroScores={ouroScores}
            prataScores={prataScores}
            bronzeScores={bronzeScores}
            avaliacaoScores={avaliacaoScores}
            userSchool={userSchool}
            onAdvanceYear={handleAdvanceYear}
            allParadesCompleted={isAllParadesCompleted}
            completedParadeCount={completedParadeSchoolIds.length}
            totalParadeCount={totalSchoolsCount}
            onNavigateToDesfile={() => setActiveTab('desfile')}
            onSimulateAllParades={handleCompleteAllParades}
            onNavigateToCampeas={() => setActiveTab('campeas')}
            divisionStates={divisionStates}
            onUpdateDivisionStates={setDivisionStates}
            quesitosDrawState={quesitosDraw}
            onUpdateQuesitosDraw={setQuesitosDraw}
            sorteio={sorteio}
            history={history}
          />
        )}

        {activeTab === 'campeas' && SeasonCycleService.isTabUnlockedForMonth('campeas', currentSeasonMonth).unlocked && (
          <DesfileCampeãsView
            currentYear={currentYear}
            especialSchools={especialSchools}
            especialScores={especialScores}
            userSchool={userSchool}
            onAdvanceYear={handleFinalizeSeasonFromCampeas}
            onApplyFineToUserSchool={handleApplyFineToUserSchool}
            onShowMessage={showToast}
            paradeResults={campeasParadeResults}
            onUpdateParadeResults={setCampeasParadeResults}
            allApuracoesCompleted={isAllApuracoesCompleted}
            onNavigateToApuracao={() => setActiveTab('apuracao')}
            quesitosDraw={quesitosDraw}
            sorteio={sorteio}
            history={history}
            officialEspecialStandings={officialEspecialStandings}
          />
        )}

        {activeTab === 'tabela' && (
          <TabelaView
            currentYear={currentYear}
            especialSchools={especialSchools}
            ouroSchools={ouroSchools}
            prataSchools={prataSchools}
            bronzeSchools={bronzeSchools}
            avaliacaoSchools={avaliacaoSchools}
            inactiveSchools={inactiveSchools}
            userSchool={userSchool}
            history={history}
            onReactivateSchool={handleReactivateSchool}
          />
        )}
      </main>

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-50 animate-bounce max-w-[90vw] sm:max-w-md">
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
        avaliacaoSchools={avaliacaoSchools}
        onStartGame={handleStartNewGame}
        onOpenCreateMode={() => {
          setIsNewGameModalOpen(false);
          handleResetGamePrompt('create');
        }}
        onClose={() => setIsNewGameModalOpen(false)}
      />

      {/* Season Cycle / Passagem de Tempo Modal */}
      <TemporadaCycleModal
        isOpen={isSeasonCycleModalOpen}
        onClose={() => setIsSeasonCycleModalOpen(false)}
        currentYear={currentYear}
        currentMonth={currentSeasonMonth}
        userSchool={userSchool}
        onAdvanceMonth={handleAdvanceSeasonMonth}
        onNavigateTab={setActiveTab}
        isSorteioCompleted={isSorteioDone}
        onSimulateAllMonthsToCarnaval={handleSimulateAllMonthsToCarnaval}
      />

      {/* Global Ranking Oficial da LIESA Modal */}
      <LiesaRankingModal
        isOpen={isLiesaModalOpen}
        onClose={() => setIsLiesaModalOpen(false)}
        schools={schools}
        inGameHistory={history}
        currentYear={currentYear}
        userSchool={userSchool}
        onSelectSchool={(schoolId) => {
          setActiveTab('glorias');
        }}
      />
    </div>
  );
}
