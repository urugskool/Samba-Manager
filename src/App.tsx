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
import { OFFICIAL_AVALIACAO_RECORDS_BY_SCHOOL } from './data/avaliacaoChampionsData';
import { OFFICIAL_GRUPO_E_RECORDS_BY_SCHOOL } from './data/grupoEChampionsData';
import { simulateParadeDuration } from './config/paradeConfig';
import { SimulationEngine } from './services/simulationEngine';
import { soundService } from './services/soundService';
import { cleanSchoolName } from './utils/schoolNameUtils';
import { sortSchools, sortInactiveSchoolsAlphabetically } from './utils/schoolSortingUtils';

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
import { EnredoService, atribuirEnredosAleatorios, gerarEnredoAleatorio } from './services/enredoService';
import { criarNovoJogo, iniciarNovaTemporada } from './utils/novoJogo';
import { CarnavalSorteio, ParadeDay, PARADE_DAYS_ORDER, CarnavalQuesitosDrawState } from './types/sorteio';
import { SorteioEngine } from './services/sorteioEngine';
import { SeasonMonthId } from './types/seasonCycle';
import { SEASON_PERIODS, SeasonCycleService } from './services/seasonCycleService';
import { TemporadaCycleModal } from './components/TemporadaCycleModal';
import { LiesaRankingModal } from './components/LiesaRankingModal';
import { NoticiasPortalModal } from './components/NoticiasPortalModal';
import { HistoricoTransferenciasModal } from './components/HistoricoTransferenciasModal';
import { NewsService } from './services/newsService';
import { NewsArticle } from './types/news';
import { TransferMarketService } from './services/transferMarketService';
import { getCanonical2026Enredo } from './data/canonicalEnredosRegistry';
import { SaveGameModal } from './components/SaveGameModal';
import { saveManager } from './services/saveManager';

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
  'unidos_do_salgueiro',
  'filhos_do_deserto',
  'indios_do_acau',
  'uniao_do_catete',
  'vai_se_quiser',
  'unidos_da_congonha',
  'aventureiros_da_matriz',
  'paraiso_das_baianas',
  'unidos_do_grajau',
  'floresta_do_andarai',
  'unidos_da_tamarineira',
  'unidos_do_pecado',
  'combinado_do_amor',
  'irmaos_unidos_do_catete',
  'coracoes_unidos_da_favela',
  'unidos_de_santo_amaro',
  'unidos_do_outeiro',
  'estrela_de_ouro',
  'unidos_de_cordovil',
  'unidos_do_itambi',
  'capricho_do_centenario',
  'unidos_dos_arcos',
  'paraiso_do_grotao',
  'mocidade_de_um_paraiso',
  'vitoria_de_bento_ribeiro',
  'unidos_dos_telegrafos',
  'trovadores_do_maracana',
  'uniao_dos_casados',
  'unidos_de_campo_grande',
  'recreio_de_inhauma',
  'unidos_do_morro_azul',
  'independentes_de_turiacu',
  'unidos_do_coqueiro',
  'em_cima_da_hora_catumbi',
  'embaixadores_sao_joao_meriti',
  'nao_e_o_que_dizem',
  'unidos_do_jacare',
  'guarani_de_realengo',
  'fiquei_firme',
  'uniao_de_sampaio',
  'unidos_de_terra_nova',
  'unidos_de_riachuelo',
  'paraiso_da_floresta',
  'prazer_da_mocidade',
  'unidos_de_turiacu',
  'voz_do_orion',
  'uniao_do_realengo',
  'de_nos_ninguem_esquece',
  'coracoes_da_liberdade',
  'uniao_dos_topazios',
  'unidos_da_barao_de_petropolis',
  'unidos_da_lagoa',
  'sem_voce_vivo_bem',
  'imperio_do_samba',
  'orgulho_de_cordovil',
  'imperio_da_colina',
  'paraiso_da_mocidade',
  'unidos_do_engenho_velho',
  'unidos_de_bras_de_pina',
  'unidos_de_cavalcante',
  'mocidade_de_cachambi',
  'inimigos_da_tristeza',
  'unidos_do_castelo',
  'grbc_birita_mas_nao_cai',
  'ccbc_vai_barrar_nunca',
  'grbc_uniao_da_ponte',
  'gres_renascer_de_vaz_lobo',
  'grbc_imperio_do_gramacho',
  'gres_unidos_dos_bandeirantes',
  'grbc_bloco_do_barriga',
  'grbc_novo_horizonte',
  'grbc_cometas_do_bispo',
  'grbc_unidos_do_alto_da_boa_vista',
  'gres_independente_de_nova_america',
  'bccr_raizes_da_tijuca',
  'grbcc_resistentes_da_lapa',
  'grbc_amigos_de_tingua',
  'grbc_mocidade_unida_da_mineira',
  'grbc_bloco_do_china',
  'grbc_diamante',
  'grbc_quilombo_da_baixada',
  'lira_do_amor',
  'unidos_do_catete',
  'escalao_de_tupa',
  'cenaculo_do_samba',
  'aprendizes_de_copacabana',
  'academicos_da_gavea',
  'deixa_malhar',
  'papagaio_linguarudo',
  'unidos_do_tuiuti',
  'paraiso_de_anchieta',
  'uniao_de_colegio',
  'flor_da_infancia_bras_de_pina',
  'uniao_barao_da_gamboa',
  'unidos_da_mangueira',
  'ultima_hora',
  'uniao_parada_de_lucas',
  'uniao_da_mocidade',
  'unidos_de_rocha_miranda',
  'rainha_das_pretas',
  'uniao_de_madureira',
  'uniao_entre_nos',
  'paraiso_de_campo_grande',
  'na_hora_e_que_se_ve',
  'mocidade_unidos_do_riachuelo',
  'depois_te_explico',
  'uniao_do_uruguai',
  'de_mim_ninguem_se_lembra',
  'para_o_ano_sai_melhor',
  'fale_quem_quizer',
  'uniao_do_sape',
  'unidos_da_saude',
  'filhos_de_ninguem',
  'uniao_do_amor',
  'capricho_do_engenho_novo',
  'e_assim_que_nos_queremos',
  'e_o_que_se_ve',
  'amizade_do_realengo',
  'estrela_da_tijuca',
  'nos_nao_somos_la_essas_coisas',
  'podia_ser_pior',
  'principes_da_floresta',
  'sport_club_guarany',
  'escola_tuiuti',
  'segunda_linha_do_estacio'
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

    const avaRecord = OFFICIAL_AVALIACAO_RECORDS_BY_SCHOOL[s.id];
    const grupoERecord = OFFICIAL_GRUPO_E_RECORDS_BY_SCHOOL[s.id];

    const updatedSchool: School = {
      ...s,
      ...(initialSchool
        ? {
            name: initialSchool.name,
            shortName: initialSchool.shortName,
            calledName: initialSchool.calledName,
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
            mascot: initialSchool.mascot,
            neighborhood: initialSchool.neighborhood,
            city: initialSchool.city,
            isBlocoCarnavalesco: initialSchool.isBlocoCarnavalesco,
            blocoOriginalDenomination: initialSchool.blocoOriginalDenomination,
            federation: initialSchool.federation,
            paradeVenue: initialSchool.paradeVenue,
            suspensionReason: initialSchool.suspensionReason
          }
        : {}),
      isInactive,
      inactive: isInactive,
      relegationsEspecial: historicalBaseline.relegationsEspecial || 0,
      especialRelegationYears: historicalBaseline.especialRelegationYears || [],
      rebaixamentosEspecial: historicalBaseline.rebaixamentosEspecial || 0,
      rebaixamentosEspecialAnos: historicalBaseline.rebaixamentosEspecialAnos || [],
      honors: {
        ...s.honors,
        historicalEspecialTitles: historicalBaseline.championshipsEspecial,
        historicalEspecialYears: historicalBaseline.especialYears || [],
        historicalEspecialRunnerUps: historicalBaseline.runnerUpsEspecial,
        historicalEspecialRunnerUpYears: historicalBaseline.especialRunnerUpYears || [],
        historicalEspecialRelegations: historicalBaseline.relegationsEspecial || 0,
        historicalEspecialRelegationYears: historicalBaseline.especialRelegationYears || [],
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
        historicalAvaliacaoTitles: avaRecord ? avaRecord.titles : (s.honors?.historicalAvaliacaoTitles || 0),
        historicalAvaliacaoYears: avaRecord ? avaRecord.titleYears : (s.honors?.historicalAvaliacaoYears || []),
        historicalAvaliacaoRunnerUps: avaRecord ? avaRecord.runnerUps : (s.honors?.historicalAvaliacaoRunnerUps || 0),
        historicalAvaliacaoRunnerUpYears: avaRecord ? avaRecord.runnerUpYears : (s.honors?.historicalAvaliacaoRunnerUpYears || []),
        historicalGrupoETitles: grupoERecord ? grupoERecord.titles : (s.honors?.historicalGrupoETitles || 0),
        historicalGrupoEYears: grupoERecord ? grupoERecord.titleYears : (s.honors?.historicalGrupoEYears || []),
        historicalGrupoERunnerUps: grupoERecord ? grupoERecord.runnerUps : (s.honors?.historicalGrupoERunnerUps || 0),
        historicalGrupoERunnerUpYears: grupoERecord ? grupoERecord.runnerUpYears : (s.honors?.historicalGrupoERunnerUpYears || []),
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
      runnerUpsAvaliacao: cons.totalAvaliacaoVices,
      championshipsGrupoE: cons.totalGrupoETitles,
      runnerUpsGrupoE: cons.totalGrupoEVices
    };
  });

  // Ensure active schools have randomized, unique procedural enredos
  const usedTitlesThisSeason = new Set<string>();

  return processedSchools.map((school) => {
    if (school.isInactive || (school as any).inactive) {
      return {
        ...school,
        currentEnredo: undefined,
        enredo: undefined,
        tituloEnredo: undefined,
        temaEnredo: undefined,
        sinopseEnredo: undefined,
        complexidadeEnredo: undefined
      };
    }

    const targetYear = (school as any).currentYear || 2026;
    const canonical = getCanonical2026Enredo(school.id, school.name);

    // Se for o ano de 2026 e houver enredo canônico oficial catalogado, ele é a autoridade máxima
    if (canonical && targetYear === 2026) {
      usedTitlesThisSeason.add(canonical.title);
      return {
        ...school,
        currentEnredo: {
          id: `enr_${school.id}_2026`,
          title: canonical.title,
          synopsis: canonical.synopsis || school.currentEnredo?.synopsis || '',
          themeType: canonical.themeType || school.currentEnredo?.themeType || 'Cultural',
          qualityBoost: school.currentEnredo?.qualityBoost || 11,
          cost: school.currentEnredo?.cost || 130000,
          proponent: school.currentEnredo?.proponent || 'Carnavalesco'
        },
        enredo: canonical.title,
        tituloEnredo: canonical.title,
        temaEnredo: canonical.themeType || 'Cultural',
        sinopseEnredo: canonical.synopsis || '',
        complexidadeEnredo: 'Média'
      } as any;
    }

    const currentTitle = school.currentEnredo?.title || (school as any).enredo || (school as any).tituloEnredo;

    const isSampleOrDuplicate =
      !currentTitle ||
      currentTitle.includes('SAMPLE') ||
      currentTitle.includes('O Império do Sol Nascente') ||
      currentTitle.includes('Os Mistérios de Tutancâmon') ||
      usedTitlesThisSeason.has(currentTitle);

    if (!isSampleOrDuplicate && currentTitle && school.currentEnredo) {
      usedTitlesThisSeason.add(currentTitle);
      return school;
    }

    const freshEnredo = EnredoService.generateUniqueEnredoForSchool(school, targetYear, usedTitlesThisSeason);
    usedTitlesThisSeason.add(freshEnredo.title);
    return {
      ...school,
      currentEnredo: freshEnredo,
      enredo: freshEnredo.title,
      tituloEnredo: freshEnredo.title,
      temaEnredo: freshEnredo.themeType,
      sinopseEnredo: freshEnredo.synopsis,
      complexidadeEnredo: (freshEnredo as any).complexity || 'Média'
    } as any;
  });
}

function sanitizeHistoryData(loadedHistory: YearHistory[]): YearHistory[] {
  let list = loadedHistory;
  const has2026 = list.some((h) => h.year === 2026);
  if (!has2026 && INITIAL_HISTORY.length > 0) {
    list = [...INITIAL_HISTORY, ...list];
  }
  return list.map((h) => {
    if (h.year === 2026 && (!h.schoolEnredos || Object.keys(h.schoolEnredos).length === 0)) {
      return {
        ...h,
        schoolEnredos: INITIAL_HISTORY[0]?.schoolEnredos || {}
      };
    }
    return h;
  });
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
    const novoJogo = criarNovoJogo('');
    return sanitizeSchoolsData(novoJogo.escolas as School[]);
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
  const [isTransferHistoryModalOpen, setIsTransferHistoryModalOpen] = useState<boolean>(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);

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
            const completedIds = Array.isArray(parsed.completedParadeSchoolIds)
              ? new Set<string>(parsed.completedParadeSchoolIds)
              : new Set<string>();
            // Migração: saves antigos podiam conter notas pré-simuladas.
            // Só restauramos notas de escolas cujo desfile já foi concluído.
            return parsed.especialScores.filter((score: SchoolParadeScores) => completedIds.has(score.schoolId));
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
            const completedIds = Array.isArray(parsed.completedParadeSchoolIds)
              ? new Set<string>(parsed.completedParadeSchoolIds)
              : new Set<string>();
            // Migração: saves antigos podiam conter notas pré-simuladas.
            // Só restauramos notas de escolas cujo desfile já foi concluído.
            return parsed.ouroScores.filter((score: SchoolParadeScores) => completedIds.has(score.schoolId));
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
            const completedIds = Array.isArray(parsed.completedParadeSchoolIds)
              ? new Set<string>(parsed.completedParadeSchoolIds)
              : new Set<string>();
            // Migração: saves antigos podiam conter notas pré-simuladas.
            // Só restauramos notas de escolas cujo desfile já foi concluído.
            return parsed.prataScores.filter((score: SchoolParadeScores) => completedIds.has(score.schoolId));
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
            const completedIds = Array.isArray(parsed.completedParadeSchoolIds)
              ? new Set<string>(parsed.completedParadeSchoolIds)
              : new Set<string>();
            // Migração: saves antigos podiam conter notas pré-simuladas.
            // Só restauramos notas de escolas cujo desfile já foi concluído.
            return parsed.bronzeScores.filter((score: SchoolParadeScores) => completedIds.has(score.schoolId));
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
            const completedIds = Array.isArray(parsed.completedParadeSchoolIds)
              ? new Set<string>(parsed.completedParadeSchoolIds)
              : new Set<string>();
            // Migração: saves antigos podiam conter notas pré-simuladas.
            // Só restauramos notas de escolas cujo desfile já foi concluído.
            return parsed.avaliacaoScores.filter((score: SchoolParadeScores) => completedIds.has(score.schoolId));
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

  // Sistema de Imprensa Carioca e Notícias (Folia News / Voz da Passarela)
  const [isNewsModalOpen, setIsNewsModalOpen] = useState<boolean>(false);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(() => {
    return NewsService.loadNews(currentYear, schools);
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

  // Show Toast
  const showToast = useCallback((text: string, type: 'info' | 'success' | 'warning' | 'alert' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  }, []);

  // IMPORTANTE: não pré-simular notas aqui.
  // As notas são criadas pelo handleRecordParadeTime(), no momento em que cada desfile termina.
  // Esta função permanece somente por compatibilidade com a prop antiga da DashboardView.
  const generateScores = useCallback(() => {
    showToast('As notas serão geradas individualmente quando os desfiles forem concluídos.', 'info');
  }, [showToast]);

  // Save game state to localStorage
  // Serialização do estado global do jogo para persistência
  const currentGameState = useMemo(() => ({
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
  }), [
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

  // Metadados enriquecidos para identificação nos slots de save do Dexie.js
  const currentSaveMetadata = useMemo(() => {
    const userSchool = schools.find((s) => s.id === userSchoolId);
    const periodName = SeasonCycleService.getPeriod(currentSeasonMonth)?.name || 'Temporada';
    const schoolName = userSchool?.name || (isSpectatorMode ? 'Modo Observador' : 'Sem Agremiação');
    const divisionName = userSchool
      ? userSchool.division.toUpperCase()
      : isSpectatorMode
      ? 'OBSERVADOR'
      : 'LIVRE';

    return {
      title: `${schoolName} • ${currentYear}`,
      schoolName,
      year: currentYear,
      division: divisionName,
      month: periodName,
      summary: `${schoolName} (${divisionName}) • Temporada ${currentYear} [${periodName}]`
    };
  }, [schools, userSchoolId, isSpectatorMode, currentYear, currentSeasonMonth]);

  // Persistência síncrona de fallback no localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentGameState));
      } catch (err) {
        console.warn('[LocalStorage warning]', err);
      }
    }
  }, [currentGameState]);

  // Persistência assíncrona automática no slot 'autosave' do Dexie.js (IndexedDB)
  useEffect(() => {
    const timer = setTimeout(() => {
      saveManager.saveToSlot('autosave', currentGameState, {
        ...currentSaveMetadata,
        title: `Auto-save: ${currentSaveMetadata.title}`,
        summary: `Salvamento automático: ${currentSaveMetadata.summary}`
      }).catch((err) => {
        console.warn('[Auto-save IndexedDB warning]', err);
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [currentGameState, currentSaveMetadata]);

  // Manipulador de carregamento seguro de save (IndexedDB ou Importação JSON)
  const handleLoadGameFromSave = useCallback((loadedState: any) => {
    if (!loadedState || typeof loadedState !== 'object') {
      showToast('Erro: dados de save inválidos ou corrompidos.', 'alert');
      return;
    }

    try {
      if (Array.isArray(loadedState.schools) && loadedState.schools.length > 0) {
        setSchools(sanitizeSchoolsData(loadedState.schools));
      }
      if (typeof loadedState.currentYear === 'number') {
        setCurrentYear(loadedState.currentYear);
      }
      setUserSchoolId(loadedState.userSchoolId ?? null);
      setIsSpectatorMode(Boolean(loadedState.isSpectatorMode));
      if (loadedState.managerName) {
        setManagerName(loadedState.managerName);
      }
      if (Array.isArray(loadedState.history)) {
        setHistory(sanitizeHistoryData(loadedState.history));
      }
      if (Array.isArray(loadedState.completedParadeSchoolIds)) {
        setCompletedParadeSchoolIds(loadedState.completedParadeSchoolIds);
      }
      if (Array.isArray(loadedState.especialScores)) setEspecialScores(loadedState.especialScores);
      if (Array.isArray(loadedState.ouroScores)) setOuroScores(loadedState.ouroScores);
      if (Array.isArray(loadedState.prataScores)) setPrataScores(loadedState.prataScores);
      if (Array.isArray(loadedState.bronzeScores)) setBronzeScores(loadedState.bronzeScores);
      if (Array.isArray(loadedState.avaliacaoScores)) setAvaliacaoScores(loadedState.avaliacaoScores);
      if (typeof loadedState.hasParadeResults === 'boolean') setHasParadeResults(loadedState.hasParadeResults);
      if (loadedState.divisionStates) setDivisionStates(loadedState.divisionStates);
      if (loadedState.campeasParadeResults) setCampeasParadeResults(loadedState.campeasParadeResults);
      if (loadedState.sorteio) setSorteio(loadedState.sorteio);
      if (loadedState.quesitosDraw) setQuesitosDraw(loadedState.quesitosDraw);
      if (loadedState.currentSeasonMonth) setCurrentSeasonMonth(loadedState.currentSeasonMonth);

      setIsGameStarted(true);
      showToast('Save carregado com sucesso via IndexedDB!', 'success');
      soundService.playLevelUp();
    } catch (err: any) {
      console.error('Falha ao restaurar save:', err);
      showToast(`Falha ao restaurar save: ${err.message || 'Erro de leitura'}`, 'alert');
    }
  }, [showToast]);

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
          const [sim] = SimulationEngine.simulateDivisionParades([schoolObj], sorteio);
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
      setHasParadeResults(true);
    },
    [schools, sorteio]
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

  const activeSchools = useMemo(() => sortSchools(schools.filter(isSchoolActive), history), [schools, isSchoolActive, history]);
  const especialSchools = useMemo(() => sortSchools(schools.filter((s) => s.division === 'especial' && isSchoolActive(s)), history), [schools, isSchoolActive, history]);
  const ouroSchools = useMemo(() => sortSchools(schools.filter((s) => s.division === 'ouro' && isSchoolActive(s)), history), [schools, isSchoolActive, history]);
  const prataSchools = useMemo(() => sortSchools(schools.filter((s) => s.division === 'prata' && isSchoolActive(s)), history), [schools, isSchoolActive, history]);
  const bronzeSchools = useMemo(() => sortSchools(schools.filter((s) => s.division === 'bronze' && isSchoolActive(s)), history), [schools, isSchoolActive, history]);
  const avaliacaoSchools = useMemo(() => sortSchools(schools.filter((s) => s.division === 'avaliacao' && isSchoolActive(s)), history), [schools, isSchoolActive, history]);
  const inactiveSchools = useMemo(() => sortInactiveSchoolsAlphabetically(schools.filter(isSchoolInactive)), [schools, isSchoolInactive]);

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
    let wasBloco = false;
    let schoolConvertedName = '';

    setSchools((prev) =>
      prev.map((s) => {
        if (s.id === schoolId) {
          const novoEnredo = gerarEnredoAleatorio();
          wasBloco = Boolean(s.isBlocoCarnavalesco || s.federation === 'FBCERJ' || (s.denomination && s.denomination !== 'G.R.E.S.'));
          schoolConvertedName = s.name;

          let newDenomination = s.denomination || 'G.R.E.S.';
          let newCorporateName = s.corporateName || s.name;

          // Ao se tornarem escolas de samba, mudam sua denominação para G.R.E.S.
          // e ajustam a razão social trocando Bloco Carnavalesco por Escola de Samba
          if (wasBloco) {
            newDenomination = 'G.R.E.S.';
            newCorporateName = newCorporateName
              .replace(/Grêmio Recreativo Bloco Carnavalesco e Cultural/gi, 'Grêmio Recreativo Escola de Samba')
              .replace(/Grêmio Recreativo Bloco Carnavalesco/gi, 'Grêmio Recreativo Escola de Samba')
              .replace(/Centro Cultural Bloco Carnavalesco/gi, 'Grêmio Recreativo Escola de Samba')
              .replace(/Bloco Carnavalesco Cultural e Recreativo/gi, 'Grêmio Recreativo Escola de Samba')
              .replace(/^GRBCC\s+/gi, 'GRES ')
              .replace(/^GRBC\s+/gi, 'GRES ')
              .replace(/^CCBC\s+/gi, 'GRES ')
              .replace(/^BCCR\s+/gi, 'GRES ');

            if (!newCorporateName.startsWith('GRES') && !newCorporateName.startsWith('Grêmio Recreativo Escola de Samba')) {
              newCorporateName = `Grêmio Recreativo Escola de Samba ${s.name}`;
            }
          }

          return {
            ...s,
            denomination: newDenomination,
            corporateName: newCorporateName,
            isInactive: false,
            inactive: false,
            division: 'avaliacao',
            inactiveYearsCount: 0,
            suspensionReason: undefined,
            inactiveReason: undefined,
            currentEnredo: {
              id: novoEnredo.id,
              title: novoEnredo.titulo,
              themeType: novoEnredo.tema as any,
              synopsis: novoEnredo.sinopse,
              cost: 100000,
              qualityBoost: Math.round((novoEnredo.potencialNota - 9.0) * 10),
              complexity: novoEnredo.complexidade
            }
          };
        }
        return s;
      })
    );

    if (wasBloco) {
      showToast(`${schoolConvertedName} agora é oficialmente uma Escola de Samba (G.R.E.S.) e disputa o Grupo de Avaliação pela Superliga!`, 'success');
    } else {
      showToast('Agremiação reativada com sucesso! Agora disputa o Grupo de Avaliação pela Superliga com novo enredo.', 'success');
    }
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

      // Reinicia o sorteio da temporada para que o globo do Grupo de Avaliação inclua a nova agremiação
      const freshSorteio = SorteioEngine.createInitialSorteio(currentYear);
      setSorteio(freshSorteio);

      showToast(
        `🎉 Agremiação ${customSchool.name} fundada com sucesso! Seja bem-vindo ao comando no Grupo de Avaliação na Intendente Magalhães!`,
        'success'
      );
      return;
    }

    setSchools((prev) => atribuirEnredosAleatorios(prev, schoolId || undefined) as School[]);

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
    const novoJogo = criarNovoJogo(schoolId || '');
    setSchools(sanitizeSchoolsData(novoJogo.escolas as School[]));
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

      // Inicia a nova temporada distribuindo novos enredos para as IAs
      // e mantendo a do jogador limpa para ele definir na tela de enredo
      const novaTemporadaEstado = iniciarNovaTemporada({
        escolas: nextSeasonData.nextSchools,
        jogadorEscolaId: userSchoolId || undefined,
        ano: currentYear
      });

      setSchools(novaTemporadaEstado.escolas);
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
      const ingressantesCount = (nextSeasonData.summary.reactivatedSchoolNames?.length || 0) + (nextSeasonData.summary.newSchoolNames?.length || 0);
      const ingressantesInfo = ingressantesCount > 0
        ? ` No Grupo de Avaliação, ${ingressantesCount} agremiações foram reativadas/fundadas para a disputa deste ano.`
        : '';

      const newsHeadline: NewsItem = {
        id: `news_${nextSeasonData.nextYear}`,
        year: nextSeasonData.nextYear,
        title: `Temporada do Carnaval ${nextSeasonData.nextYear} Iniciada!`,
        body: `${nextSeasonData.summary.especialChampionName} defende o título do Especial! ${nextSeasonData.summary.ouroChampionName} subiu para a elite. Na Série Prata, ${nextSeasonData.summary.prataChampionName} sagrou-se campeã! Na Série Bronze, ${nextSeasonData.summary.bronzeChampionName} subiu de divisão. No Grupo de Avaliação, ${nextSeasonData.summary.avaliacaoChampionName || 'a campeã'} garantiu o acesso!${ingressantesInfo} Demonstrativo contábil e repasses da LIGA (${nextSeasonData.nextYear - 1}) homologados em Finanças!`,
        type: 'success',
        date: 'Agora'
      };
      setNews((prev) => [newsHeadline, ...prev]);

      setActiveTab('dashboard');
      showToast(
        `Carnaval ${nextSeasonData.nextYear} iniciado! Repasses e demonstrativo oficial da LIGA disponíveis em Finanças!`,
        'success'
      );
    } catch (err) {
      console.error('Falha ao avançar temporada:', err);
      showToast('Ocorreu um erro ao avançar para a próxima temporada. Tente novamente.', 'alert');
    }
  };

  const handleFinalizeSeasonFromCampeas = useCallback(() => {
    const espResult = SimulationEngine.finalizeSeasonDivision(
      'especial',
      currentYear,
      especialSchools,
      especialScores,
      ouroSchools.length,
      prataSchools.length,
      bronzeSchools.length,
      SorteioEngine.getQuesitosOrderForDivision('especial', quesitosDraw)
    );
    const ouroResult = SimulationEngine.finalizeSeasonDivision(
      'ouro',
      currentYear,
      ouroSchools,
      ouroScores,
      ouroSchools.length,
      prataSchools.length,
      bronzeSchools.length,
      SorteioEngine.getQuesitosOrderForDivision('ouro', quesitosDraw)
    );
    const prataResult = SimulationEngine.finalizeSeasonDivision(
      'prata',
      currentYear,
      prataSchools,
      prataScores,
      ouroSchools.length,
      prataSchools.length,
      bronzeSchools.length,
      SorteioEngine.getQuesitosOrderForDivision('prata', quesitosDraw)
    );
    const bronzeResult = SimulationEngine.finalizeSeasonDivision(
      'bronze',
      currentYear,
      bronzeSchools,
      bronzeScores,
      ouroSchools.length,
      prataSchools.length,
      bronzeSchools.length,
      SorteioEngine.getQuesitosOrderForDivision('bronze', quesitosDraw)
    );
    const avaResult = SimulationEngine.finalizeSeasonDivision(
      'avaliacao',
      currentYear,
      avaliacaoSchools,
      avaliacaoScores,
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
        const fullSorteio = SorteioEngine.generateCompleteSorteio(schools, history, currentYear, undefined, sorteio);
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
            const canonical = currentYear === 2026 ? getCanonical2026Enredo(s.id, s.name) : undefined;
            if (canonical) {
              currentEnredo = {
                id: `enr_${s.id}_2026`,
                title: canonical.title,
                synopsis: canonical.synopsis || '',
                themeType: canonical.themeType || 'Cultural',
                qualityBoost: 11,
                cost: 130000,
                proponent: 'Carnavalesco'
              };
            } else {
              currentEnredo = EnredoService.generateUniqueEnredoForSchool(
                s,
                currentYear,
                new Set<string>()
              );
            }
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

    // Gera notícias da imprensa carioca para o novo mês do ciclo
    const newPressArticles = NewsService.generateMonthAdvanceNews(nextId, currentYear, schools, userSchool);
    if (newPressArticles.length > 0) {
      setNewsArticles((prev) => {
        const existingIds = new Set(prev.map((a) => a.id));
        const filteredNew = newPressArticles.filter((a) => !existingIds.has(a.id));
        const updated = [...filteredNew, ...prev];
        NewsService.saveNews(currentYear, updated);
        return updated;
      });
    }

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
      const fullSorteio = SorteioEngine.generateCompleteSorteio(schools, history, currentYear, undefined, sorteio);
      setSorteio(fullSorteio);
    }

    // 2. Prepara todas as escolas ativas com prontidão máxima de fevereiro
    setSchools((prev) =>
      prev.map((s) => {
        if (s.isInactive || (s as any).inactive) return s;
        let schoolEnredo = s.currentEnredo;
        if (!schoolEnredo || schoolEnredo.title.includes('SAMPLE') || schoolEnredo.title.trim() === '') {
          const canonical = currentYear === 2026 ? getCanonical2026Enredo(s.id, s.name) : undefined;
          if (canonical) {
            schoolEnredo = {
              id: `enr_${s.id}_2026`,
              title: canonical.title,
              synopsis: canonical.synopsis || '',
              themeType: canonical.themeType || 'Cultural',
              qualityBoost: 11,
              cost: 130000,
              proponent: 'Carnavalesco'
            };
          } else {
            schoolEnredo = EnredoService.generateUniqueEnredoForSchool(
              s,
              currentYear,
              new Set<string>()
            );
          }
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
        onOpenNewsPortal={() => setIsNewsModalOpen(true)}
        onOpenTransferHistory={() => setIsTransferHistoryModalOpen(true)}
        onOpenSaveModal={() => setIsSaveModalOpen(true)}
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
            onOpenNewsPortal={() => setIsNewsModalOpen(true)}
          />
        )}

        {/* MODO OBSERVADOR: Dashboard e categorias de panorama das agremiações */}
        {(!userSchool || isSpectatorMode) && (
          (activeTab === 'dashboard' || activeTab === 'barracao' || activeTab === 'ensaios' || activeTab === 'equipe' || activeTab === 'financas') && (
            <SpectatorSeasonOverview
              schools={schools}
              currentYear={currentYear}
              currentMonth={currentSeasonMonth}
              history={history}
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
            allSchools={schools}
            onUpdateSchool={handleUpdateSchool}
            onUpdateAllSchools={setSchools}
            onShowMessage={showToast}
            onOpenNewsPortal={() => setIsNewsModalOpen(true)}
            onOpenTransferHistory={() => setIsTransferHistoryModalOpen(true)}
            currentYear={currentYear}
            currentSeasonMonth={currentSeasonMonth}
          />
        )}

        {activeTab === 'financas' && userSchool && (
          <FinancasView
            school={userSchool}
            allSchools={schools}
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
            onOpenLiesaRanking={() => setIsLiesaModalOpen(true)}
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

      {/* Portal Oficial de Notícias Voz da Passarela / Folia News */}
      <NoticiasPortalModal
        isOpen={isNewsModalOpen}
        onClose={() => setIsNewsModalOpen(false)}
        articles={newsArticles}
        currentYear={currentYear}
        onOpenSchoolProfile={(schoolId) => {
          setActiveTab('glorias');
        }}
      />

      {/* Central Oficial do Histórico de Transferências (1976 a 2026+) */}
      <HistoricoTransferenciasModal
        isOpen={isTransferHistoryModalOpen}
        onClose={() => setIsTransferHistoryModalOpen(false)}
        allSchools={schools}
        inGameTransfers={TransferMarketService.getTransferHistory()}
        currentYear={currentYear}
      />

      {/* Gerenciador de Saves Dexie.js (IndexedDB + Slots + JSON Import/Export) */}
      <SaveGameModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        currentGameState={currentGameState}
        currentMetadata={currentSaveMetadata}
        onLoadGame={handleLoadGameFromSave}
      />
    </div>
  );
}
