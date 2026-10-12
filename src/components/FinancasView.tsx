import React, { useState, useMemo } from 'react';
import { School, DivisionId, YearHistory } from '../types/carnaval';
import { CarnavalSorteio } from '../types/sorteio';
import { SeasonMonthId } from '../types/seasonCycle';
import {
  Landmark,
  TrendingUp,
  DollarSign,
  Utensils,
  Award,
  Users,
  ShieldAlert,
  CheckCircle2,
  Lock,
  Star,
  Info,
  Sparkles,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  Building2,
  Hammer,
  Music,
  Flame,
  ShieldCheck,
  Store,
  MapPin,
  Truck,
  Bus,
  Compass,
  Crown,
  Tv,
  Ticket,
  Coins,
  FileSpreadsheet,
  Layers,
  Percent,
  HelpCircle,
  Trophy,
  Medal
} from 'lucide-react';
import { soundService } from '../services/soundService';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import { LogisticsService } from '../services/logisticsService';
import { ParadeLogisticsModal } from './ParadeLogisticsModal';
import {
  LigaFinancialService,
  CLASSIFICATION_PRIZE_TABLE,
  LIGA_FINANCIAL_CONSTANTS,
  SchoolLigaPayout,
  LigaSeasonFinancialReport
} from '../services/ligaFinancialService';
import {
  RepassesFinanceirosService,
  ExtratoFinanceiroEscola,
  RateioFundo800kLinha,
  DivisaoCarnaval
} from '../services/repassesFinanceirosService';

export type RepasseDivisionTab = 'especial' | 'ouro' | 'prata' | 'bronze' | 'avaliacao';

interface FinancasViewProps {
  school: School;
  allSchools?: School[];
  currentYear?: number;
  currentSeasonMonth?: SeasonMonthId;
  history?: YearHistory[];
  sorteio?: CarnavalSorteio;
  onUpdateSchool: (updatedSchool: School) => void;
  onShowMessage: (msg: string, type?: 'info' | 'success' | 'warning' | 'alert') => void;
}

const MONTH_NAMES: Record<SeasonMonthId, string> = {
  marco: 'Março',
  abril: 'Abril',
  maio: 'Maio',
  junho: 'Junho',
  julho: 'Julho',
  agosto: 'Agosto',
  setembro: 'Setembro',
  outubro: 'Outubro',
  novembro: 'Novembro',
  dezembro: 'Dezembro',
  janeiro: 'Janeiro',
  fevereiro: 'Fevereiro'
};

interface QuadraLevelConfig {
  level: number;
  title: string;
  capacity: number;
  bonusMultiplier: number;
  bonusLabel: string;
  upgradeCost: number;
  description: string;
}

const QUADRA_LEVELS: QuadraLevelConfig[] = [
  {
    level: 1,
    title: 'Galpão Rústico Comunitário',
    capacity: 500,
    bonusMultiplier: 1.0,
    bonusLabel: 'Básico (sem bônus)',
    upgradeCost: 0,
    description: 'Piso cimentado rústico, cobertura básica e sistema de som comunitário.'
  },
  {
    level: 2,
    title: 'Quadra Coberta & Cimentada',
    capacity: 1000,
    bonusMultiplier: 1.2,
    bonusLabel: '+20% de lucro em eventos',
    upgradeCost: 45000,
    description: 'Estrutura metálica termoacústica, piso cimentado e nivelado e palco para bateria.'
  },
  {
    level: 3,
    title: 'Espaço Cultural & Pavilhão Social',
    capacity: 2200,
    bonusMultiplier: 1.45,
    bonusLabel: '+45% de lucro em eventos',
    upgradeCost: 90000,
    description: 'Camarotes laterais, sanitários reformados, boutique de produtos oficiais e palco ampliado.'
  },
  {
    level: 4,
    title: 'Arena Show Climatizada',
    capacity: 4000,
    bonusMultiplier: 1.75,
    bonusLabel: '+75% de lucro em eventos',
    upgradeCost: 180000,
    description: 'Iluminação cênica digital, sistema de exaustão e climatização, camarotes VIP e acústica profissional.'
  },
  {
    level: 5,
    title: 'Palácio do Samba & Templo do Carnaval',
    capacity: 6500,
    bonusMultiplier: 2.2,
    bonusLabel: '+120% de lucro em eventos',
    upgradeCost: 350000,
    description: 'Mega-estrutura multiuso climatizada, camarotes presidenciais, memorial histórico e padrão internacional.'
  }
];

export const FinancasView: React.FC<FinancasViewProps> = ({
  school,
  allSchools,
  currentYear = 2027,
  currentSeasonMonth = 'marco',
  history = [],
  sorteio,
  onUpdateSchool,
  onShowMessage
}) => {
  const [showCriteriaDetail, setShowCriteriaDetail] = useState<boolean>(false);
  const [isLogisticsModalOpen, setIsLogisticsModalOpen] = useState<boolean>(false);
  const [showClassificationModal, setShowClassificationModal] = useState<boolean>(false);
  const [activeRepasseDivision, setActiveRepasseDivision] = useState<RepasseDivisionTab>(() => {
    if (['especial', 'ouro', 'prata', 'bronze', 'avaliacao'].includes(school.division)) {
      return school.division as RepasseDivisionTab;
    }
    return 'especial';
  });
  const [selectedOuroRateioEscolas, setSelectedOuroRateioEscolas] = useState<16 | 15 | 14>(16);
  const [showOuroRateioAccordion, setShowOuroRateioAccordion] = useState<boolean>(false);
  
  // Ano selecionado para o demonstrativo de repasses da Liga
  const [selectedLigaYear, setSelectedLigaYear] = useState<number>(() => {
    if (history && history.length > 0) return history[0].year;
    return currentYear;
  });

  const availableYears = useMemo(() => {
    const yearsSet = new Set<number>();
    if (history && history.length > 0) {
      history.forEach((h) => yearsSet.add(h.year));
    }
    yearsSet.add(currentYear);
    return Array.from(yearsSet).sort((a, b) => b - a);
  }, [history, currentYear]);

  const selectedHistory = useMemo(() => {
    return history?.find((h) => h.year === selectedLigaYear);
  }, [history, selectedLigaYear]);

  const isSelectedYearProjected =
    selectedLigaYear === currentYear && (!selectedHistory || !selectedHistory.especialStandings);

  const ligaReport: LigaSeasonFinancialReport = useMemo(() => {
    if (selectedHistory?.ligaFinancialReport) {
      return selectedHistory.ligaFinancialReport as LigaSeasonFinancialReport;
    }
    const standings = selectedHistory?.especialStandings;
    return LigaFinancialService.calculateSeasonFinancials(
      selectedLigaYear,
      standings,
      allSchools,
      isSelectedYearProjected
    );
  }, [selectedHistory, selectedLigaYear, allSchools, isSelectedYearProjected]);

  const userSchoolPayout = useMemo(() => {
    if (!ligaReport) return undefined;
    return (
      LigaFinancialService.getSchoolPayout(ligaReport, school.id) ||
      LigaFinancialService.getSchoolPayout(ligaReport, school.name)
    );
  }, [ligaReport, school.id, school.name]);

  // Série Ouro standings ou lista de escolas
  const ouroSchoolsList = useMemo(() => {
    if (selectedHistory?.ouroStandings && selectedHistory.ouroStandings.length > 0) {
      return selectedHistory.ouroStandings.map((s, idx) => ({
        escolaId: s.schoolId || `ouro_${idx + 1}`,
        nomeEscola: s.schoolName,
        posicao: s.rank || idx + 1
      }));
    }
    const activeOuro = (allSchools || [])
      .filter((s) => s.division === 'ouro' && !s.isInactive && !s.inactive)
      .map((s, idx) => ({
        escolaId: s.id,
        nomeEscola: s.name,
        posicao: idx + 1
      }));
    if (activeOuro.length > 0) return activeOuro;
    return Array.from({ length: 16 }, (_, i) => ({
      escolaId: `ouro_escola_${i + 1}`,
      nomeEscola: `Escola Série Ouro ${i + 1}`,
      posicao: i + 1
    }));
  }, [selectedHistory, allSchools]);

  const ouroFinancialReport: ExtratoFinanceiroEscola[] = useMemo(() => {
    if (selectedHistory?.ouroFinancialReport) {
      return selectedHistory.ouroFinancialReport as ExtratoFinanceiroEscola[];
    }
    return RepassesFinanceirosService.calcularRepassesSerieOuro(ouroSchoolsList);
  }, [selectedHistory, ouroSchoolsList]);

  const userOuroPayout = useMemo(() => {
    if (!ouroFinancialReport) return undefined;
    return (
      RepassesFinanceirosService.obterExtratoEscola(ouroFinancialReport, school.id) ||
      RepassesFinanceirosService.obterExtratoEscola(ouroFinancialReport, school.name)
    );
  }, [ouroFinancialReport, school.id, school.name]);

  const ouroRateioLinhas = useMemo(() => {
    return RepassesFinanceirosService.calcularTabelaRateioFundo800k(selectedOuroRateioEscolas);
  }, [selectedOuroRateioEscolas]);

  // SÉRIE PRATA
  const prataSchoolsList = useMemo(() => {
    if (selectedHistory?.prataStandings && selectedHistory.prataStandings.length > 0) {
      return selectedHistory.prataStandings.map((s, idx) => ({
        escolaId: s.schoolId || `prata_${idx + 1}`,
        nomeEscola: s.schoolName,
        posicao: s.rank || idx + 1
      }));
    }
    const activePrata = (allSchools || [])
      .filter((s) => s.division === 'prata' && !s.isInactive && !s.inactive)
      .map((s, idx) => ({
        escolaId: s.id,
        nomeEscola: s.name,
        posicao: idx + 1
      }));
    if (activePrata.length > 0) return activePrata;
    return Array.from({ length: 16 }, (_, i) => ({
      escolaId: `prata_escola_${i + 1}`,
      nomeEscola: `Escola Série Prata ${i + 1}`,
      posicao: i + 1
    }));
  }, [selectedHistory, allSchools]);

  const prataFinancialReport: ExtratoFinanceiroEscola[] = useMemo(() => {
    if (selectedHistory?.prataFinancialReport) {
      return selectedHistory.prataFinancialReport as ExtratoFinanceiroEscola[];
    }
    return RepassesFinanceirosService.calcularRepassesSeriePrata(prataSchoolsList);
  }, [selectedHistory, prataSchoolsList]);

  const userPrataPayout = useMemo(() => {
    if (!prataFinancialReport) return undefined;
    return (
      RepassesFinanceirosService.obterExtratoEscola(prataFinancialReport, school.id) ||
      RepassesFinanceirosService.obterExtratoEscola(prataFinancialReport, school.name)
    );
  }, [prataFinancialReport, school.id, school.name]);

  // SÉRIE BRONZE
  const bronzeSchoolsList = useMemo(() => {
    if (selectedHistory?.bronzeStandings && selectedHistory.bronzeStandings.length > 0) {
      return selectedHistory.bronzeStandings.map((s, idx) => ({
        escolaId: s.schoolId || `bronze_${idx + 1}`,
        nomeEscola: s.schoolName,
        posicao: s.rank || idx + 1
      }));
    }
    const activeBronze = (allSchools || [])
      .filter((s) => s.division === 'bronze' && !s.isInactive && !s.inactive)
      .map((s, idx) => ({
        escolaId: s.id,
        nomeEscola: s.name,
        posicao: idx + 1
      }));
    if (activeBronze.length > 0) return activeBronze;
    return Array.from({ length: 12 }, (_, i) => ({
      escolaId: `bronze_escola_${i + 1}`,
      nomeEscola: `Escola Série Bronze ${i + 1}`,
      posicao: i + 1
    }));
  }, [selectedHistory, allSchools]);

  const bronzeFinancialReport: ExtratoFinanceiroEscola[] = useMemo(() => {
    if (selectedHistory?.bronzeFinancialReport) {
      return selectedHistory.bronzeFinancialReport as ExtratoFinanceiroEscola[];
    }
    return RepassesFinanceirosService.calcularRepassesSerieBronze(bronzeSchoolsList);
  }, [selectedHistory, bronzeSchoolsList]);

  const userBronzePayout = useMemo(() => {
    if (!bronzeFinancialReport) return undefined;
    return (
      RepassesFinanceirosService.obterExtratoEscola(bronzeFinancialReport, school.id) ||
      RepassesFinanceirosService.obterExtratoEscola(bronzeFinancialReport, school.name)
    );
  }, [bronzeFinancialReport, school.id, school.name]);

  // GRUPO DE AVALIAÇÃO
  const avaliacaoSchoolsList = useMemo(() => {
    if (selectedHistory?.avaliacaoStandings && selectedHistory.avaliacaoStandings.length > 0) {
      return selectedHistory.avaliacaoStandings.map((s, idx) => ({
        escolaId: s.schoolId || `avaliacao_${idx + 1}`,
        nomeEscola: s.schoolName,
        posicao: s.rank || idx + 1
      }));
    }
    const activeAvaliacao = (allSchools || [])
      .filter((s) => s.division === 'avaliacao' && !s.isInactive && !s.inactive)
      .map((s, idx) => ({
        escolaId: s.id,
        nomeEscola: s.name,
        posicao: idx + 1
      }));
    if (activeAvaliacao.length > 0) return activeAvaliacao;
    return Array.from({ length: 15 }, (_, i) => ({
      escolaId: `avaliacao_escola_${i + 1}`,
      nomeEscola: `Escola Grupo de Avaliação ${i + 1}`,
      posicao: i + 1
    }));
  }, [selectedHistory, allSchools]);

  const avaliacaoFinancialReport: ExtratoFinanceiroEscola[] = useMemo(() => {
    if (selectedHistory?.avaliacaoFinancialReport) {
      return selectedHistory.avaliacaoFinancialReport as ExtratoFinanceiroEscola[];
    }
    return RepassesFinanceirosService.calcularRepassesGrupoAvaliacao(avaliacaoSchoolsList);
  }, [selectedHistory, avaliacaoSchoolsList]);

  const userAvaliacaoPayout = useMemo(() => {
    if (!avaliacaoFinancialReport) return undefined;
    return (
      RepassesFinanceirosService.obterExtratoEscola(avaliacaoFinancialReport, school.id) ||
      RepassesFinanceirosService.obterExtratoEscola(avaliacaoFinancialReport, school.name)
    );
  }, [avaliacaoFinancialReport, school.id, school.name]);

  const userSlot = sorteio?.divisions?.[school.division]?.slots.find((s) => s.schoolId === school.id);
  const staffTotal = Object.values(school.staff).reduce((acc, m) => acc + m.salary, 0);

  // ==========================================
  // 1. QUADRA SOCIAL E REFORMA ESTRUTURAL
  // ==========================================
  const currentQuadraLevel = Math.max(1, Math.min(5, school.quadraLevel || 1));
  const currentQuadraConfig = QUADRA_LEVELS.find((q) => q.level === currentQuadraLevel) || QUADRA_LEVELS[0];
  const nextQuadraConfig = QUADRA_LEVELS.find((q) => q.level === currentQuadraLevel + 1) || null;
  const quadraMultiplier = currentQuadraConfig.bonusMultiplier;
  const effectiveQuadraName = school.quadraName || 'Quadra Social da Comunidade';

  const handleUpgradeQuadra = () => {
    if (!nextQuadraConfig) return;

    if (school.budget < nextQuadraConfig.upgradeCost) {
      soundService.playBuzzer();
      onShowMessage(
        `Orçamento insuficiente! A reforma para ${nextQuadraConfig.title} custa R$ ${nextQuadraConfig.upgradeCost.toLocaleString('pt-BR')}, mas a tesouraria dispõe de R$ ${school.budget.toLocaleString('pt-BR')}.`,
        'warning'
      );
      return;
    }

    soundService.playLevelUp();

    const updated: School = {
      ...school,
      budget: school.budget - nextQuadraConfig.upgradeCost,
      quadraLevel: nextQuadraConfig.level,
      fanBaseMorale: Math.min(100, school.fanBaseMorale + 6)
    };

    onUpdateSchool(updated);
    onShowMessage(
      `Reforma Concluída com Sucesso! A ${effectiveQuadraName} agora é uma "${nextQuadraConfig.title}"! Capacidade expandida para ${nextQuadraConfig.capacity.toLocaleString('pt-BR')} pessoas e bônus de ${nextQuadraConfig.bonusLabel}!`,
      'success'
    );
  };

  // ==========================================
  // 2. EVENTOS COMUNITÁRIOS NA QUADRA
  // ==========================================
  const isFeijoadaDoneThisMonth = school.lastFeijoadaMonth === currentSeasonMonth;
  const isNoiteSambaDoneThisMonth = school.lastNoiteSambaMonth === currentSeasonMonth;
  const isEnsaioShowDoneThisMonth = school.lastEnsaioShowMonth === currentSeasonMonth;

  // Componentes e Moral
  const componentes =
    school.paradeComposition?.componentes ||
    (school.division === 'especial'
      ? 3200
      : school.division === 'ouro'
      ? 2200
      : school.division === 'prata'
      ? 1500
      : school.division === 'bronze'
      ? 1000
      : 700);

  const morale = school.fanBaseMorale;

  // Evento 1: Grande Feijoada da Bateria
  let minFeijoadaProfit: number;
  let maxFeijoadaProfit: number;
  let feijoadaBracketLabel: string;
  let feijoadaBadgeColor: string;

  if (morale >= 90) {
    minFeijoadaProfit = 60000;
    maxFeijoadaProfit = 75000;
    feijoadaBracketLabel = 'Comunidade Eufórica (Moral ≥ 90%)';
    feijoadaBadgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
  } else if (morale >= 77) {
    minFeijoadaProfit = 45000;
    maxFeijoadaProfit = 55000;
    feijoadaBracketLabel = 'Comunidade Empolgada (Moral entre 77% e 89%)';
    feijoadaBadgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
  } else {
    minFeijoadaProfit = 30000;
    maxFeijoadaProfit = 45000;
    feijoadaBracketLabel = 'Comunidade em Reconstrução (Moral ≤ 77%)';
    feijoadaBadgeColor = 'bg-slate-700/40 text-slate-300 border-slate-600/40';
  }

  const compRatio = Math.min(1, Math.max(0, (componentes - 600) / 2800));

  const handleOrganizeFeijoada = () => {
    if (isFeijoadaDoneThisMonth) {
      soundService.playBuzzer();
      onShowMessage(
        `Limite mensal atingido! A Feijoada já foi realizada no mês de ${MONTH_NAMES[currentSeasonMonth]}. Avance o mês da temporada para realizar outra.`,
        'warning'
      );
      return;
    }

    const spread = maxFeijoadaProfit - minFeijoadaProfit;
    const baseWeight = 0.35 + 0.55 * compRatio + 0.1 * Math.random();
    const rawProfit = (minFeijoadaProfit + spread * baseWeight) * quadraMultiplier;
    const profit = Math.round(rawProfit / 500) * 500;

    soundService.playSurdoBeat(true);

    const updated: School = {
      ...school,
      budget: school.budget + profit,
      fanBaseMorale: Math.min(100, school.fanBaseMorale + 3),
      lastFeijoadaMonth: currentSeasonMonth
    };

    onUpdateSchool(updated);
    onShowMessage(
      `Grande Feijoada de ${MONTH_NAMES[currentSeasonMonth]} na ${effectiveQuadraName} foi um sucesso! Com ${componentes.toLocaleString('pt-BR')} componentes e bônus de quadra (${currentQuadraConfig.bonusLabel}), a escola lucrou R$ ${profit.toLocaleString('pt-BR')}!`,
      'success'
    );
  };

  // Evento 2: Noite de Samba & Botequim da Velha Guarda
  const minNoiteProfit = Math.round(14000 * quadraMultiplier);
  const maxNoiteProfit = Math.round(26000 * quadraMultiplier);

  const handleOrganizeNoiteSamba = () => {
    if (isNoiteSambaDoneThisMonth) {
      soundService.playBuzzer();
      onShowMessage(
        `Limite mensal atingido! A Noite de Samba da Velha Guarda já foi realizada no mês de ${MONTH_NAMES[currentSeasonMonth]}.`,
        'warning'
      );
      return;
    }

    const rawProfit = minNoiteProfit + Math.random() * (maxNoiteProfit - minNoiteProfit);
    const profit = Math.round(rawProfit / 500) * 500;

    soundService.playLevelUp();

    const updated: School = {
      ...school,
      budget: school.budget + profit,
      fanBaseMorale: Math.min(100, school.fanBaseMorale + 2),
      lastNoiteSambaMonth: currentSeasonMonth
    };

    onUpdateSchool(updated);
    onShowMessage(
      `Noite de Samba & Botequim da Velha Guarda em ${MONTH_NAMES[currentSeasonMonth]} reuniu baluartes e compositores! Lucro de R$ ${profit.toLocaleString('pt-BR')} creditado no caixa!`,
      'success'
    );
  };

  // Evento 3: Ensaio Show com Bateria & Apresentação dos Segmentos
  const minEnsaioShowProfit = Math.round(20000 * quadraMultiplier);
  const maxEnsaioShowProfit = Math.round(38000 * quadraMultiplier);

  const handleOrganizeEnsaioShow = () => {
    if (isEnsaioShowDoneThisMonth) {
      soundService.playBuzzer();
      onShowMessage(
        `Limite mensal atingido! O Ensaio Show dos Segmentos já foi realizado no mês de ${MONTH_NAMES[currentSeasonMonth]}.`,
        'warning'
      );
      return;
    }

    const rawProfit = minEnsaioShowProfit + Math.random() * (maxEnsaioShowProfit - minEnsaioShowProfit);
    const profit = Math.round(rawProfit / 500) * 500;

    soundService.playSurdoBeat(true);

    const updated: School = {
      ...school,
      budget: school.budget + profit,
      fanBaseMorale: Math.min(100, school.fanBaseMorale + 3),
      rehearsalLevel: Math.min(100, school.rehearsalLevel + 2),
      lastEnsaioShowMonth: currentSeasonMonth
    };

    onUpdateSchool(updated);
    onShowMessage(
      `Ensaio Show dos Segmentos lotou a ${effectiveQuadraName}! Passistas, bateria e o casal de MS/PB deram show. Lucro de R$ ${profit.toLocaleString('pt-BR')} e ensaio +2%!`,
      'success'
    );
  };

  // ==========================================
  // 3. PATROCÍNIOS & APOIO INSTITUCIONAL
  // ==========================================
  // Grupo Especial, Série Ouro, Série Prata: Patrocínio Master
  const isMasterEligible =
    school.division === 'especial' || school.division === 'ouro' || school.division === 'prata';

  const masterCap =
    school.division === 'especial'
      ? 2500000
      : school.division === 'ouro'
      ? 500000
      : school.division === 'prata'
      ? 125000
      : 0;

  const isMasterClaimedThisSeason = school.masterSponsorClaimedYear === currentYear;

  // Série Bronze e Grupo de Avaliação: Patrocínio Comunitário & Apoio Local
  const isCommunitySponsorEligible = school.division === 'bronze' || school.division === 'avaliacao';
  const isCommunityClaimedThisSeason = school.communitySponsorClaimedYear === currentYear;

  const communityCap = school.division === 'bronze' ? 70000 : 45000;
  const communityMin = school.division === 'bronze' ? 52000 : 35000;
  const communityAmount = Math.round(
    (communityMin +
      (communityCap - communityMin) *
        (0.3 + 0.4 * (morale / 100) + 0.3 * (currentQuadraLevel / 5))) /
      1000
  ) * 1000;

  const sponsorTerritoryTitle =
    school.originType === 'outra_cidade' && school.cityState
      ? `Apoio Institucional & Comércio Municipal de ${school.cityState}`
      : `Apoio do Comércio Local & Empresariado de ${school.neighborhood || 'Madureira'}`;

  // Critérios de Avaliação Comercial para Master (Especial, Ouro, Prata)
  const ancientTitles =
    (school.championshipsEspecial || 0) * 3 +
    (school.runnerUpsEspecial || 0) * 1.5 +
    (school.championshipsOuro || 0) * 1;
  const historicalPedigreeScore = Math.min(1.0, Math.max(0.55, 0.55 + ancientTitles * 0.04));

  const staffRatings = Object.values(school.staff).map((s) => s.rating);
  const avgStaffRating =
    staffRatings.length > 0 ? staffRatings.reduce((a, b) => a + b, 0) / staffRatings.length : 75;
  const staffPedigreeScore = Math.min(1.0, Math.max(0.5, (avgStaffRating - 60) / 38));

  const prevHistory = history.find((h) => h.year === currentYear - 1);
  let prevRank = 7;
  let isPromoted = false;
  let isRelegated = false;

  if (prevHistory) {
    if (school.division === 'especial' && prevHistory.especialStandings) {
      const match = prevHistory.especialStandings.find((s) => s.schoolId === school.id || s.schoolName === school.name);
      if (match) prevRank = match.rank;
      if (prevHistory.ouroChampion === school.name || prevHistory.ouroStandings?.[0]?.schoolId === school.id) {
        isPromoted = true;
      }
    } else if (school.division === 'ouro' && prevHistory.ouroStandings) {
      const match = prevHistory.ouroStandings.find((s) => s.schoolId === school.id || s.schoolName === school.name);
      if (match) prevRank = match.rank;
      if (prevHistory.especialRelegated?.includes(school.name)) {
        isRelegated = true;
      }
      if (prevHistory.prataPromoted?.includes(school.name) || prevHistory.prataChampion === school.name) {
        isPromoted = true;
      }
    } else if (school.division === 'prata' && prevHistory.prataStandings) {
      const match = prevHistory.prataStandings.find((s) => s.schoolId === school.id || s.schoolName === school.name);
      if (match) prevRank = match.rank;
      if (prevHistory.ouroRelegated?.includes(school.name)) {
        isRelegated = true;
      }
      if (prevHistory.bronzePromoted?.includes(school.name) || prevHistory.bronzeChampion === school.name) {
        isPromoted = true;
      }
    }
  }

  let prevRankScore = 0.7;
  if (prevRank === 1) prevRankScore = 1.0;
  else if (prevRank === 2) prevRankScore = 0.92;
  else if (prevRank <= 6) prevRankScore = 0.85;
  else if (prevRank <= 9) prevRankScore = 0.72;
  else prevRankScore = 0.58;

  let promoRelegScore = 0.75;
  if (isPromoted) promoRelegScore = 1.0;
  else if (isRelegated) promoRelegScore = 0.55;

  let paradeTimeScore = 0.8;
  const schoolSlot = sorteio?.divisions[school.division]?.slots.find((s) => s.schoolId === school.id);
  if (schoolSlot) {
    if (school.division === 'especial') {
      paradeTimeScore = schoolSlot.order >= 2 ? 1.0 : 0.78;
    } else if (school.division === 'ouro') {
      paradeTimeScore = schoolSlot.order >= 4 && schoolSlot.order <= 7 ? 1.0 : 0.82;
    } else {
      paradeTimeScore = 0.85;
    }
  }

  const compositeSponsorScore =
    0.25 * historicalPedigreeScore +
    0.20 * staffPedigreeScore +
    0.25 * prevRankScore +
    0.15 * promoRelegScore +
    0.15 * paradeTimeScore;

  const finalMultiplier = Math.min(1.0, Math.max(0.5, compositeSponsorScore));
  const roundingBase = school.division === 'prata' ? 2500 : 10000;
  const calculatedMasterAmount = Math.min(
    masterCap,
    Math.round((masterCap * finalMultiplier) / roundingBase) * roundingBase
  );

  const handleSignMasterSponsor = () => {
    if (!isMasterEligible) return;

    if (isMasterClaimedThisSeason) {
      soundService.playBuzzer();
      onShowMessage(
        `Limite regulamentar atingido! O Patrocínio Master pode ser assinado apenas uma vez por temporada.`,
        'warning'
      );
      return;
    }

    soundService.playGavel();

    const updated: School = {
      ...school,
      budget: school.budget + calculatedMasterAmount,
      masterSponsorClaimedYear: currentYear
    };

    onUpdateSchool(updated);
    onShowMessage(
      `Contrato Master Homologado com Sucesso! R$ ${calculatedMasterAmount.toLocaleString('pt-BR')} creditados nos cofres da agremiação para o Carnaval ${currentYear}!`,
      'success'
    );
  };

  const handleSignCommunitySponsor = () => {
    if (!isCommunitySponsorEligible) return;

    if (isCommunityClaimedThisSeason) {
      soundService.playBuzzer();
      onShowMessage(
        `Limite anual atingido! O apoio comercial regional já foi homologado para o Carnaval ${currentYear}.`,
        'warning'
      );
      return;
    }

    soundService.playGavel();

    const updated: School = {
      ...school,
      budget: school.budget + communityAmount,
      communitySponsorClaimedYear: currentYear,
      fanBaseMorale: Math.min(100, school.fanBaseMorale + 4)
    };

    onUpdateSchool(updated);
    onShowMessage(
      `Parceria Comercial Regional Fechada! R$ ${communityAmount.toLocaleString('pt-BR')} creditados via ${sponsorTerritoryTitle}! Moral da comunidade +4%.`,
      'success'
    );
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <Landmark className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                TEMPORADA {currentYear} • MÊS: {MONTH_NAMES[currentSeasonMonth]?.toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1">Tesouraria & Finanças da Escola</h2>
            <p className="text-xs text-slate-400">
              Gerencie os cofres da agremiação, feche cotas de patrocínio, organize eventos e reforme a quadra social.
            </p>
          </div>
        </div>

        <div className="bg-slate-950/60 px-5 py-3 rounded-xl border border-slate-800 text-right">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Saldo Disponível em Caixa</div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            R$ {school.budget.toLocaleString('pt-BR')}
          </div>
        </div>
      </div>

      {/* Extrato de Receitas & Despesas da Agremiação */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Subvenção / Repasse Fixo */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-300">
              {school.division === 'prata' ? 'Fundo da Liga (Rateio)' : school.division === 'bronze' ? 'Repasse Fixo da Liga' : 'Subvenção Governamental'}
            </span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-amber-400 font-mono">
            {school.division === 'especial'
              ? 'R$ 4.000.000'
              : school.division === 'ouro'
              ? 'R$ 600.000'
              : school.division === 'prata'
              ? `R$ ${(Math.round(1500000 / Math.max(1, prataSchoolsList.length))).toLocaleString('pt-BR')}`
              : school.division === 'bronze'
              ? 'R$ 80.000'
              : 'R$ 0'}
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            {school.division === 'especial'
              ? 'Aporte de R$ 4M (Governo do Estado + Prefeitura do Rio).'
              : school.division === 'ouro'
              ? 'Aporte de R$ 600 mil (Governo do Estado + Prefeitura do Rio).'
              : school.division === 'prata'
              ? `Fundo de R$ 1,5M dividido igualmente (${prataSchoolsList.length} escolas).`
              : school.division === 'bronze'
              ? 'Repasse fixo de R$ 80 mil para todas as participantes.'
              : 'Sem repasse de valores fixos no Grupo de Avaliação.'}
          </p>
        </div>

        {/* 2. Cota de TV e Liga */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-300">Cota de TV e Transmissão</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono">
            {school.division === 'especial'
              ? 'R$ 17.000.000'
              : school.division === 'ouro'
              ? 'R$ 1.200.000'
              : school.division === 'prata'
              ? 'R$ 80.000'
              : school.division === 'bronze'
              ? 'R$ 0'
              : 'R$ 0'}
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            {school.division === 'especial'
              ? 'R$ 14M Patrocínio Liga + R$ 3M TV Regular (LIESA).'
              : school.division === 'ouro'
              ? 'R$ 500k Cota Liga + R$ 700k Direitos de TV (LIGA-RJ).'
              : school.division === 'prata'
              ? 'R$ 80 mil garantidos pela cota de transmissão de TV.'
              : school.division === 'bronze'
              ? 'Sem direitos de transmissão na Série Bronze.'
              : 'Sem direitos de transmissão no Grupo de Avaliação.'}
          </p>
        </div>

        {/* 3. Prêmio por Colocação */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-300">Prêmio por Colocação</span>
            <Trophy className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-purple-300 font-mono">
            {(() => {
              if (school.division === 'especial') {
                if (userSchoolPayout) {
                  return `R$ ${userSchoolPayout.classificationPrize.toLocaleString('pt-BR')}`;
                }
                return 'Até R$ 4.400.000';
              }
              if (school.division === 'ouro') {
                if (userOuroPayout) {
                  return `R$ ${userOuroPayout.premiacaoClassificacao.toLocaleString('pt-BR')}`;
                }
                return 'Até R$ 2.000.000';
              }
              if (school.division === 'prata') {
                if (userPrataPayout) {
                  return `R$ ${userPrataPayout.premiacaoClassificacao.toLocaleString('pt-BR')}`;
                }
                return 'Até R$ 300.000';
              }
              if (school.division === 'bronze') {
                if (userBronzePayout) {
                  return `R$ ${userBronzePayout.premiacaoClassificacao.toLocaleString('pt-BR')}`;
                }
                return 'Até R$ 90.000';
              }
              if (school.division === 'avaliacao') {
                if (userAvaliacaoPayout) {
                  return `R$ ${userAvaliacaoPayout.premiacaoClassificacao.toLocaleString('pt-BR')}`;
                }
                return 'Até R$ 20.000';
              }
              return 'R$ 0';
            })()}
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            {(() => {
              if (school.division === 'especial') {
                if (userSchoolPayout) {
                  return `${userSchoolPayout.rank}º Lugar apurado (${userSchoolPayout.classificationPercentage.toFixed(1).replace('.', ',')}% do fundo de R$ 20M).`;
                }
                return 'Mérito esportivo: 1º R$ 4.4M a 12º R$ 300k (Fundo de R$ 20M).';
              }
              if (school.division === 'ouro') {
                if (userOuroPayout) {
                  return `${userOuroPayout.posicao}º Lugar • ${userOuroPayout.posicao === 1 ? 'Campeã (Acesso ao Especial)' : userOuroPayout.posicao === 2 ? 'Vice-campeã' : userOuroPayout.posicao === 3 ? '3.º Lugar' : 'Rateio do fundo de R$ 800k'}.`;
                }
                return 'Mérito esportivo: 1º R$ 2M, 2º R$ 900k, 3º R$ 700k e rateio de R$ 800k.';
              }
              if (school.division === 'prata') {
                if (userPrataPayout) {
                  return `${userPrataPayout.posicao}º Lugar • ${userPrataPayout.posicao === 1 ? 'Campeã (R$ 300k)' : userPrataPayout.posicao === 2 ? 'Vice (R$ 150k)' : userPrataPayout.posicao === 3 ? '3.º Lugar (R$ 70k)' : 'Sem bonificação em dinheiro'}.`;
                }
                return 'Top 3: 1º R$ 300k (Acesso Ouro), 2º R$ 150k e 3º R$ 70k.';
              }
              if (school.division === 'bronze') {
                if (userBronzePayout) {
                  return `${userBronzePayout.posicao}º Lugar • ${userBronzePayout.posicao === 1 ? 'Campeã (R$ 90k)' : userBronzePayout.posicao === 2 ? 'Vice (R$ 60k)' : userBronzePayout.posicao === 3 ? '3.º Lugar (R$ 30k)' : 'Sem bonificação em dinheiro'}.`;
                }
                return 'Top 3: 1º R$ 90k (Acesso Prata), 2º R$ 60k e 3º R$ 30k.';
              }
              if (school.division === 'avaliacao') {
                if (userAvaliacaoPayout) {
                  return `${userAvaliacaoPayout.posicao}º Lugar • ${userAvaliacaoPayout.posicao === 1 ? 'Campeã (R$ 20k)' : userAvaliacaoPayout.posicao === 2 ? 'Vice (R$ 12k)' : userAvaliacaoPayout.posicao === 3 ? '3.º Lugar (R$ 6k)' : 'Sem bonificação em dinheiro'}.`;
                }
                return 'Top 3: 1º R$ 20k (Acesso Bronze), 2º R$ 12k e 3º R$ 6k.';
              }
              return 'Premiação de mérito esportivo apurada na avenida.';
            })()}
          </p>
        </div>

        {/* 4. Despesas com Folha da Equipe */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-300">Folha da Equipe</span>
            <DollarSign className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-xl font-bold text-rose-400 font-mono">
            R$ {staffTotal.toLocaleString('pt-BR')} / ano
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            Carnavalesco, Mestre de Bateria, Intérprete, 1º Casal e Diretores.
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SEÇÃO DO SISTEMA FINANCEIRO DE REPASSES DA LIGA / LIGA-RJ */}
      {/* ======================================================== */}
      <div className="bg-slate-900/95 border border-amber-500/30 rounded-2xl p-6 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Subtle background decorative glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border border-amber-500/40 rounded-2xl text-amber-400 shadow-inner">
              <Coins className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-mono tracking-wider">
                  {activeRepasseDivision === 'especial'
                    ? 'LIESA • RIO CARNAVAL'
                    : activeRepasseDivision === 'ouro'
                    ? 'LIGA-RJ • SAMBÓDROMO'
                    : activeRepasseDivision === 'prata'
                    ? 'SUPERLIGA • INTENDENTE'
                    : activeRepasseDivision === 'bronze'
                    ? 'SUPERLIGA • INTENDENTE'
                    : 'SUPERLIGA • AVALIAÇÃO'}
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  {activeRepasseDivision === 'especial'
                    ? 'GRUPO ESPECIAL (12 ESCOLAS)'
                    : activeRepasseDivision === 'ouro'
                    ? `SÉRIE OURO (${ouroSchoolsList.length} ESCOLAS)`
                    : activeRepasseDivision === 'prata'
                    ? `SÉRIE PRATA (${prataSchoolsList.length} ESCOLAS)`
                    : activeRepasseDivision === 'bronze'
                    ? `SÉRIE BRONZE (${bronzeSchoolsList.length} ESCOLAS)`
                    : `GRUPO DE AVALIAÇÃO (${avaliacaoSchoolsList.length} ESCOLAS)`}
                </span>
                <span className="text-[10px] font-bold text-slate-400">
                  {selectedLigaYear === currentYear ? '• Projeção da Temporada Atual' : '• Demonstrativo Homologado em Ata'}
                </span>
              </div>
              <h3 className="text-2xl font-black text-white mt-1 flex items-center gap-2 flex-wrap">
                <span>
                  {activeRepasseDivision === 'especial'
                    ? 'Sistema Financeiro de Repasses da LIGA'
                    : activeRepasseDivision === 'ouro'
                    ? 'Repasses e Premiações da Série Ouro'
                    : activeRepasseDivision === 'prata'
                    ? 'Repasses e Premiações da Série Prata'
                    : activeRepasseDivision === 'bronze'
                    ? 'Repasses e Premiações da Série Bronze'
                    : 'Premiações do Grupo de Avaliação'}
                </span>
                <span className="text-xs font-mono font-normal text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                  {activeRepasseDivision === 'especial'
                    ? `Fundo Global: R$ ${ligaReport.grandTotalDisbursed.toLocaleString('pt-BR')}`
                    : activeRepasseDivision === 'ouro'
                    ? `Piso Fixo: R$ 1.800.000 / escola • Premiações: R$ 4.400.000`
                    : activeRepasseDivision === 'prata'
                    ? `Fundo: R$ 1.500.000 (R$ ${Math.round(1500000 / Math.max(1, prataSchoolsList.length)).toLocaleString('pt-BR')}/escola) • TV: R$ 80k • Top 3: R$ 520k`
                    : activeRepasseDivision === 'bronze'
                    ? `Repasse Fixo: R$ 80.000 / escola • Premiações Top 3: R$ 180.000`
                    : `Repasse Fixo: R$ 0 • Premiações Top 3: R$ 38.000`}
                </span>
              </h3>
              <p className="text-xs text-slate-400 max-w-3xl mt-0.5">
                {activeRepasseDivision === 'especial'
                  ? 'Demonstrativo oficial de distribuição de receitas aos 12 integrantes da elite: cotas fixas de patrocinadores (R$ 14M), direitos de TV (R$ 3M), fundo geral de bilheteira (15%), fundo de classificação por apuração (R$ 20M) e bônus das Campeãs (Top 6).'
                  : activeRepasseDivision === 'ouro'
                  ? 'Cada agremiação conta com um piso fixo garantido de R$ 1.800.000 (Cota da Liga R$ 500k + Direitos de TV R$ 700k + Subvenção Pública R$ 600k) e premiação de mérito esportivo concedida após a apuração das notas (1º R$ 2M, 2º R$ 900k, 3º R$ 700k e fundo de R$ 800k rateado de forma decrescente pela posição).'
                  : activeRepasseDivision === 'prata'
                  ? 'As escolas da Série Prata recebem um repasse de R$ 1,5 milhão dividido igualmente entre todas as escolas do Grupo, além de R$ 80 mil para cada escola pela cota de transmissão de televisão. As 3 primeiras colocadas recebem premiação esportiva: 1º R$ 300 mil, 2º R$ 150 mil e 3º R$ 70 mil.'
                  : activeRepasseDivision === 'bronze'
                  ? 'Na Série Bronze, cada escola participante recebe um repasse fixo garantido de R$ 80 mil. Além disso, há premiação de mérito esportivo para as 3 primeiras colocadas na apuração: 1º R$ 90 mil, 2º R$ 60 mil e 3º R$ 30 mil.'
                  : 'No Grupo de Avaliação não há repasse de valores fixos para as participantes, apenas premiação de mérito esportivo concedida às 3 primeiras colocadas: 1º R$ 20 mil, 2º R$ 12 mil e 3º R$ 6 mil.'}
              </p>
            </div>
          </div>

          {/* Division Selector & Year Selector Tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            {/* Division Switcher */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 gap-1 flex-wrap">
              <button
                onClick={() => setActiveRepasseDivision('especial')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                  activeRepasseDivision === 'especial'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Especial</span>
              </button>
              <button
                onClick={() => setActiveRepasseDivision('ouro')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                  activeRepasseDivision === 'ouro'
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ouro</span>
              </button>
              <button
                onClick={() => setActiveRepasseDivision('prata')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                  activeRepasseDivision === 'prata'
                    ? 'bg-slate-200 text-slate-950 shadow-md shadow-slate-200/30 font-black'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Medal className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                <span>Prata</span>
              </button>
              <button
                onClick={() => setActiveRepasseDivision('bronze')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                  activeRepasseDivision === 'bronze'
                    ? 'bg-amber-700 text-white shadow-md shadow-amber-700/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Bronze</span>
              </button>
              <button
                onClick={() => setActiveRepasseDivision('avaliacao')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                  activeRepasseDivision === 'avaliacao'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Avaliação</span>
              </button>
            </div>

            {/* Year Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Ano:
              </span>
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 gap-1">
                {availableYears.map((yr) => {
                  const isSelected = yr === selectedLigaYear;
                  const isCurrent = yr === currentYear;
                  return (
                    <button
                      key={yr}
                      onClick={() => setSelectedLigaYear(yr)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                          : 'text-slate-400 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{yr}</span>
                      {isCurrent && (
                        <span className={`text-[9px] px-1 py-0.2 rounded font-normal ${isSelected ? 'bg-slate-950/40 text-slate-950' : 'bg-slate-800 text-amber-400'}`}>
                          Atual
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CONDICIONAL: CONTEÚDO DA SÉRIE OURO                      */}
        {/* ======================================================== */}
        {activeRepasseDivision === 'ouro' && (
          <div className="space-y-6 animate-fadeIn">
            {/* 5 Pilares Financeiros da Série Ouro */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {/* Pilar 1: Cota da Liga */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 relative hover:border-slate-700 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-slate-300">Cota da Liga</span>
                  <Building2 className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-xl font-black text-white font-mono">
                  R$ 500.000
                </div>
                <div className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 inline-block">
                  Fixo por Escola (LIGA-RJ)
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Cota fixa institucional da liga organizadora aos filiados da Série Ouro.
                </p>
              </div>

              {/* Pilar 2: Direitos de Transmissão de TV */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 relative hover:border-slate-700 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-slate-300">Direitos de TV</span>
                  <Tv className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-xl font-black text-white font-mono">
                  R$ 700.000
                </div>
                <div className="text-[10px] font-bold text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/30 inline-block">
                  Fixo por Escola
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Transmissão ao vivo dos desfiles oficiais da Sexta e Sábado de Carnaval.
                </p>
              </div>

              {/* Pilar 3: Subvenção Pública */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 relative hover:border-slate-700 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-slate-300">Subvenção Pública</span>
                  <Award className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xl font-black text-emerald-400 font-mono">
                  R$ 600.000
                </div>
                <div className="text-[10px] font-bold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 inline-block">
                  Governo + Prefeitura
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Incentivo público da Prefeitura do Rio e Governo do Estado do RJ.
                </p>
              </div>

              {/* Pilar 4: Base Fixa Total */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-1.5 relative hover:border-amber-500/50 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-amber-300">Base Fixa Total</span>
                  <Landmark className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-xl font-black text-amber-400 font-mono">
                  R$ 1.800.000
                </div>
                <div className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 inline-block">
                  Piso Garantido por Escola
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Soma das cotas fixas (R$ 500k + R$ 700k + R$ 600k) antes das notas da apuração.
                </p>
              </div>

              {/* Pilar 5: Premiação por Classificação */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/30 space-y-1.5 relative hover:border-purple-500/50 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-purple-300">Premiações de Mérito</span>
                  <Trophy className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-xl font-black text-purple-300 font-mono">
                  R$ 4.400.000
                </div>
                <div className="text-[10px] font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30 inline-block">
                  Total de Premiações
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  1º R$ 2M • 2º R$ 900k • 3º R$ 700k • 4º ao fim: R$ 800k rateado por mérito.
                </p>
              </div>
            </div>

            {/* User School Highlight Card for Série Ouro */}
            {(() => {
              if (userOuroPayout) {
                return (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-950 to-emerald-500/15 border border-amber-500/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg border-2 shadow-md shrink-0 bg-amber-500/20 text-amber-300 border-amber-400">
                        {userOuroPayout.posicao}º
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                            SUA AGREMIAÇÃO NA SÉRIE OURO
                          </span>
                          <span className="text-xs font-bold text-white">
                            {userOuroPayout.nomeEscola}
                          </span>
                          <span className="text-xs font-mono text-amber-300">
                            (
                            {userOuroPayout.posicao === 1
                              ? 'Campeã da Série Ouro • Acesso ao Grupo Especial'
                              : userOuroPayout.posicao === 2
                              ? 'Vice-Campeã da Série Ouro'
                              : userOuroPayout.posicao === 3
                              ? '3.º Lugar na Apuração'
                              : userOuroPayout.posicao >= ouroSchoolsList.length - 1
                              ? 'Zona de Rebaixamento para Série Prata'
                              : 'Manutenção na Série Ouro'}
                            )
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-300 mt-1 flex-wrap">
                          <span>Subvenção: <strong>R$ 600k</strong></span>
                          <span>•</span>
                          <span>Cota Liga: <strong>R$ 500k</strong></span>
                          <span>•</span>
                          <span>TV: <strong>R$ 700k</strong></span>
                          <span>•</span>
                          <span>Base Fixa: <strong>R$ 1.800.000</strong></span>
                          <span>•</span>
                          <span className="text-purple-300 font-bold">
                            Premiação Esportiva: +R$ {userOuroPayout.premiacaoClassificacao.toLocaleString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 py-2.5 rounded-xl bg-slate-950/90 border border-emerald-500/40 text-right shrink-0">
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                        Repasse Total Série Ouro ({selectedLigaYear})
                      </div>
                      <div className="text-2xl font-black text-emerald-400 font-mono">
                        R$ {userOuroPayout.totalRecebido.toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>
                );
              }

              if (school.division !== 'ouro') {
                return (
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-white">
                          Visão Geral da Série Ouro (LIGA-RJ)
                        </span>
                        <p className="text-slate-400">
                          Sua escola ({school.name}) disputa atualmente a <strong>{school.division.toUpperCase()}</strong>. Na Série Ouro, o piso garantido é de <strong>R$ 1.800.000</strong> por agremiação, podendo atingir até <strong>R$ 3.800.000</strong> com o título de campeã e acesso ao Grupo Especial!
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })()}

            {/* Accordion / Regulamento do Rateio do Fundo de R$ 800.000 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setShowOuroRateioAccordion(!showOuroRateioAccordion)}
                className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-slate-900/50 transition cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <Percent className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-white uppercase tracking-wider block">
                      Tabela de Rateio do Fundo de R$ 800.000 (Série Ouro)
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Clique para {showOuroRateioAccordion ? 'recolher' : 'ver'} as cotas proporcionais para 16, 15 e 14 escolas (4.º lugar até a última colocada)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30">
                    {selectedOuroRateioEscolas} Escolas • R$ 800k Rateado
                  </span>
                  {showOuroRateioAccordion ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </button>

              {showOuroRateioAccordion && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-4">
                  {/* Pódio Fixo Summary */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/40">
                      <span className="text-[10px] font-bold text-amber-400 uppercase block">1.º Lugar (Campeã)</span>
                      <div className="text-lg font-black text-white font-mono">R$ 2.000.000</div>
                      <span className="text-[10px] text-slate-400 block">Base Fixa + Prêmio = <strong>R$ 3.800.000</strong> (Sobe p/ Especial)</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                      <span className="text-[10px] font-bold text-slate-300 uppercase block">2.º Lugar (Vice-campeã)</span>
                      <div className="text-lg font-black text-white font-mono">R$ 900.000</div>
                      <span className="text-[10px] text-slate-400 block">Base Fixa + Prêmio = <strong>R$ 2.700.000</strong></span>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-900/30 border border-amber-800/40">
                      <span className="text-[10px] font-bold text-amber-300 uppercase block">3.º Lugar</span>
                      <div className="text-lg font-black text-white font-mono">R$ 700.000</div>
                      <span className="text-[10px] text-slate-400 block">Base Fixa + Prêmio = <strong>R$ 2.500.000</strong></span>
                    </div>
                  </div>

                  {/* Switcher de Quantidade de Escolas */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
                    <p className="text-xs text-slate-300">
                      Rateio decrescente do 4.º lugar em diante por pesos lineares <strong>(N - i + 1)</strong>:
                    </p>

                    <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-bold px-2 uppercase">Simular Tamanho:</span>
                      {([16, 15, 14] as const).map((count) => (
                        <button
                          key={count}
                          onClick={() => setSelectedOuroRateioEscolas(count)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                            selectedOuroRateioEscolas === count
                              ? 'bg-amber-500 text-slate-950 shadow-sm'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {count} Escolas {count === 16 ? '(Inicial)' : count === 15 ? '(Transição)' : '(Meta)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Grid de Rateio */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                    {ouroRateioLinhas.map((item) => (
                      <div
                        key={item.posicao}
                        className="p-3 rounded-xl border border-slate-800 bg-slate-900/70 flex items-center justify-between gap-2 hover:border-slate-700 transition"
                      >
                        <div>
                          <span className="text-[11px] font-black block text-slate-200">
                            {item.posicao}.º Lugar
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            Peso: {item.peso} • {item.percentual.toFixed(2).replace('.', ',')}%
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-black text-amber-400 font-mono block">
                            R$ {item.valor.toLocaleString('pt-BR')}
                          </span>
                          <span className="text-[9px] text-slate-500 font-mono block">
                            Total: R$ {(1800000 + item.valor).toLocaleString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono font-bold pt-2 border-t border-slate-800 text-slate-400">
                    <span>Total Consolidado do Rateio (4.º ao {selectedOuroRateioEscolas}.º):</span>
                    <span className="text-amber-400">
                      100,0% = R$ 800.000 ({ouroRateioLinhas.length} agremiações contempladas)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Demonstrativo Detalhado de Repasses das Escolas da Série Ouro */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                    <span>Demonstrativo Oficial de Repasses da Série Ouro</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Tabela contábil oficial com a discriminação individual dos repasses e premiações da LIGA-RJ para o Carnaval {selectedLigaYear}.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400">
                    {ouroFinancialReport.length} agremiações auditadas
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 overflow-hidden shadow-xl bg-slate-950/90">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900 border-b border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-400">
                        <th className="py-3 px-3 text-center w-12">Pos.</th>
                        <th className="py-3 px-4 min-w-[200px]">Escola de Samba</th>
                        <th className="py-3 px-3 text-right">Subvenção</th>
                        <th className="py-3 px-3 text-right">Cota Liga</th>
                        <th className="py-3 px-3 text-right">Direitos TV</th>
                        <th className="py-3 px-3 text-right">Base Fixa</th>
                        <th className="py-3 px-3 text-right">Premiação</th>
                        <th className="py-3 px-4 text-right min-w-[140px] text-emerald-400">Total Recebido</th>
                        <th className="py-3 px-3 text-center">Status Oficial</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 font-mono">
                      {ouroFinancialReport.map((row) => {
                        const isUser =
                          row.escolaId === school.id ||
                          row.nomeEscola.toLowerCase() === school.name.toLowerCase();

                        const matchedSchool = (allSchools || []).find(
                          (s) => s.id === row.escolaId || s.name.toLowerCase() === row.nomeEscola.toLowerCase()
                        );

                        return (
                          <tr
                            key={row.escolaId}
                            className={`transition ${
                              isUser
                                ? 'bg-amber-500/10 hover:bg-amber-500/15 ring-1 ring-amber-500/30'
                                : row.posicao === 1
                                ? 'bg-amber-500/5 hover:bg-slate-900/80'
                                : row.posicao === 2
                                ? 'bg-slate-800/40 hover:bg-slate-900/80'
                                : row.posicao === 3
                                ? 'bg-amber-950/20 hover:bg-slate-900/80'
                                : 'hover:bg-slate-900/60'
                            }`}
                          >
                            {/* Posição */}
                            <td className="py-3 px-3 text-center">
                              <span
                                className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-black text-xs ${
                                  row.posicao === 1
                                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 ring-1 ring-amber-300'
                                    : row.posicao === 2
                                    ? 'bg-slate-300 text-slate-950'
                                    : row.posicao === 3
                                    ? 'bg-amber-700 text-white'
                                    : row.posicao >= ouroFinancialReport.length - 1
                                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                    : 'bg-slate-800 text-slate-300'
                                }`}
                              >
                                {row.posicao}º
                              </span>
                            </td>

                            {/* Escola de Samba */}
                            <td className="py-3 px-4 font-sans font-bold text-white">
                              <div className="flex items-center gap-2.5">
                                <div
                                  className="w-3.5 h-3.5 rounded-full border shadow-sm shrink-0"
                                  style={{
                                    backgroundColor: matchedSchool?.colors?.primary || '#1e3a8a',
                                    borderColor: matchedSchool?.colors?.secondary || '#ffffff'
                                  }}
                                />
                                <div className="truncate">
                                  <span className="block truncate text-slate-100 font-bold">
                                    {cleanSchoolName(row.nomeEscola)}
                                  </span>
                                </div>
                                {isUser && (
                                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 shrink-0">
                                    SUA ESCOLA
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Subvenção Pública */}
                            <td className="py-3 px-3 text-right text-slate-300 font-normal">
                              R$ {row.subvencaoPublica.toLocaleString('pt-BR')}
                            </td>

                            {/* Cota Liga */}
                            <td className="py-3 px-3 text-right text-slate-300 font-normal">
                              R$ {row.cotaLiga.toLocaleString('pt-BR')}
                            </td>

                            {/* Direitos TV */}
                            <td className="py-3 px-3 text-right text-slate-300 font-normal">
                              R$ {row.cotaTv.toLocaleString('pt-BR')}
                            </td>

                            {/* Base Fixa */}
                            <td className="py-3 px-3 text-right text-amber-300 font-bold">
                              R$ {(row.subvencaoPublica + row.cotaLiga + row.cotaTv).toLocaleString('pt-BR')}
                            </td>

                            {/* Premiação */}
                            <td className="py-3 px-3 text-right">
                              <span className="text-purple-300 font-bold block">
                                R$ {row.premiacaoClassificacao.toLocaleString('pt-BR')}
                              </span>
                              <span className="text-[9px] text-slate-400 block font-sans">
                                {row.posicao === 1
                                  ? 'Campeã'
                                  : row.posicao === 2
                                  ? 'Vice'
                                  : row.posicao === 3
                                  ? '3.º Lugar'
                                  : 'Rateio R$ 800k'}
                              </span>
                            </td>

                            {/* Total Recebido */}
                            <td className="py-3 px-4 text-right">
                              <span className="text-sm font-black text-emerald-400 block">
                                R$ {row.totalRecebido.toLocaleString('pt-BR')}
                              </span>
                              <span className="text-[9px] text-slate-400 font-normal block font-sans">
                                {RepassesFinanceirosService.formatCompact(row.totalRecebido)}
                              </span>
                            </td>

                            {/* Status Oficial */}
                            <td className="py-3 px-3 text-center font-sans">
                              <span
                                className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                  row.posicao === 1
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                    : row.posicao === 2
                                    ? 'bg-slate-700 text-slate-200 border-slate-600'
                                    : row.posicao === 3
                                    ? 'bg-amber-900/30 text-amber-300 border-amber-800'
                                    : row.posicao >= ouroFinancialReport.length - 1
                                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                    : 'bg-slate-800 text-slate-300 border-slate-700'
                                }`}
                              >
                                {row.posicao === 1
                                  ? 'Campeã (Acesso Especial)'
                                  : row.posicao === 2
                                  ? 'Vice-Campeã'
                                  : row.posicao === 3
                                  ? '3.º Lugar'
                                  : row.posicao >= ouroFinancialReport.length - 1
                                  ? 'Rebaixada p/ Prata'
                                  : 'Manutenção na Ouro'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>

                    {/* Footer Totals */}
                    <tfoot className="bg-slate-900 border-t-2 border-slate-700 font-mono font-bold text-slate-200 text-xs">
                      <tr>
                        <td colSpan={2} className="py-3.5 px-4 font-sans font-black uppercase tracking-wider text-white">
                          Totais da Série Ouro ({ouroFinancialReport.length} escolas):
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          R$ {(ouroFinancialReport.reduce((a, b) => a + b.subvencaoPublica, 0)).toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          R$ {(ouroFinancialReport.reduce((a, b) => a + b.cotaLiga, 0)).toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          R$ {(ouroFinancialReport.reduce((a, b) => a + b.cotaTv, 0)).toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3.5 px-3 text-right text-amber-300 font-black">
                          R$ {(ouroFinancialReport.reduce((a, b) => a + b.subvencaoPublica + b.cotaLiga + b.cotaTv, 0)).toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3.5 px-3 text-right text-purple-300 font-black">
                          R$ {(ouroFinancialReport.reduce((a, b) => a + b.premiacaoClassificacao, 0)).toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3.5 px-4 text-right text-base font-black text-emerald-400">
                          R$ {(ouroFinancialReport.reduce((a, b) => a + b.totalRecebido, 0)).toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3.5 px-3 text-center text-[10px] text-slate-400 font-sans">
                          100% Repassado
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* Regulatory Rules Footer Notes para Série Ouro */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
              <div className="font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wide">
                <Info className="w-4 h-4" />
                <span>Regulamento Financeiro & Premiações da Série Ouro (LIGA-RJ):</span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-slate-400 list-disc list-inside">
                <li>
                  <strong>Piso Fixo Garantido:</strong> Cota da Liga de R$ 500.000 + Direitos de Transmissão de TV de R$ 700.000 + Subvenção Pública de R$ 600.000 = <strong>Base Fixa Total de R$ 1.800.000</strong> para cada escola.
                </li>
                <li>
                  <strong>1.º Lugar (Campeã da Série Ouro):</strong> Premiação esportiva de <strong>R$ 2.000.000</strong> (totalizando R$ 3.800.000) e acesso consagrado ao Grupo Especial do Carnaval.
                </li>
                <li>
                  <strong>2.º Lugar (Vice-campeã):</strong> Premiação esportiva de <strong>R$ 900.000</strong> (totalizando R$ 2.700.000).
                </li>
                <li>
                  <strong>3.º Lugar:</strong> Premiação esportiva de <strong>R$ 700.000</strong> (totalizando R$ 2.500.000).
                </li>
                <li className="md:col-span-2 text-amber-300 font-medium">
                  <strong>4.º Lugar até a Última Colocada:</strong> Fundo de <strong>R$ 800.000</strong> rateado de forma decrescente pela posição com pesos lineares decrescentes <em>(N - i + 1)</em>, garantindo bonificação meritocrática a todas as agremiações da Série Ouro.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* CONDICIONAL: CONTEÚDO DO GRUPO ESPECIAL                  */}
        {/* ======================================================== */}
        {activeRepasseDivision === 'especial' && (
          <div className="space-y-6 animate-fadeIn">
            {/* 5 Core Financial Pillars Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {/* Pilar 1: Patrocinadores Fixos */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 relative hover:border-slate-700 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-slate-300">Patrocinadores LIGA</span>
                  <Building2 className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-xl font-black text-white font-mono">
                  R$ 14.000.000
                </div>
                <div className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 inline-block">
                  Fixo por Escola (12 escolas)
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Cota corporativa garantida a todas as agremiações. Total: <strong>R$ 168.000.000</strong>.
                </p>
              </div>

              {/* Pilar 2: Direitos de TV Regular */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 relative hover:border-slate-700 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-slate-300">Direitos de TV (Regular)</span>
                  <Tv className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-xl font-black text-white font-mono">
                  R$ 3.000.000
                </div>
                <div className="text-[10px] font-bold text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/30 inline-block">
                  Fixo por Escola (12 escolas)
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Transmissão ao vivo das noites oficiais de desfile. Total: <strong>R$ 36.000.000</strong>.
                </p>
              </div>

              {/* Pilar 3: Fundo de Bilheteira Geral (15%) */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 relative hover:border-slate-700 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-slate-300">Bilheteira Geral (15%)</span>
                  <Ticket className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xl font-black text-emerald-400 font-mono">
                  R$ 1.000.000
                </div>
                <div className="text-[10px] font-bold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 inline-block">
                  Divisão Igualitária (÷ 12)
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  15% dos ingressos do Desfile Oficial (R$ 80M arrecadados no Sambódromo = <strong>R$ 12M</strong>).
                </p>
              </div>

              {/* Pilar 4: Fundo de Classificação */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 relative hover:border-slate-700 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-slate-300">Fundo de Classificação</span>
                  <Trophy className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-xl font-black text-amber-400 font-mono">
                  R$ 300k a 4,4M
                </div>
                <div className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 inline-block">
                  Total: R$ 20.000.000
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Premiação meritocrática decrescente pela posição na apuração (22% à campeã até 1,5% ao 12º).
                </p>
              </div>

              {/* Pilar 5: Bônus das Campeãs (Top 6) */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/30 space-y-1.5 relative hover:border-purple-500/50 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-purple-300">Bônus Campeãs (Top 6)</span>
                  <Crown className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-xl font-black text-purple-300 font-mono">
                  +R$ 5.720.000
                </div>
                <div className="text-[10px] font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30 inline-block">
                  Exclusivo Top 6 (G6)
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  R$ 5M de TV extra + 15% da bilheteria do Sábado das Campeãs (R$ 720k cada). Total: <strong>R$ 34.320.000</strong>.
                </p>
              </div>
            </div>

            {/* User School Highlight Card (if in Especial or if participated in selected year) */}
            {(() => {
              if (userSchoolPayout) {
                return (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-950 to-emerald-500/15 border border-amber-500/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg border-2 shadow-md shrink-0"
                        style={{
                          backgroundColor: userSchoolPayout.primaryColor || '#1e3a8a',
                          borderColor: userSchoolPayout.secondaryColor || '#fbbf24',
                          color: '#ffffff'
                        }}
                      >
                        {userSchoolPayout.rank}º
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                            SUA AGREMIAÇÃO
                          </span>
                          <span className="text-xs font-bold text-white">
                            {userSchoolPayout.schoolName}
                          </span>
                          <span className="text-xs font-mono text-amber-300">
                            ({userSchoolPayout.statusLabel})
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-300 mt-1 flex-wrap">
                          <span>Cota Fixa: <strong>R$ 14,0M</strong></span>
                          <span>•</span>
                          <span>TV Regular: <strong>R$ 3,0M</strong></span>
                          <span>•</span>
                          <span>Bilheteira Geral: <strong>R$ 1,0M</strong></span>
                          <span>•</span>
                          <span>Classificação: <strong>R$ {userSchoolPayout.classificationPrize.toLocaleString('pt-BR')} ({userSchoolPayout.classificationPercentage.toFixed(1).replace('.', ',')}%)</strong></span>
                          {userSchoolPayout.isTop6 && (
                            <>
                              <span>•</span>
                              <span className="text-purple-300 font-bold">
                                Bônus Campeãs: +R$ {userSchoolPayout.totalBonusCampeas.toLocaleString('pt-BR')}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="px-5 py-2.5 rounded-xl bg-slate-950/90 border border-emerald-500/40 text-right shrink-0">
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                        Repasse Total da LIGA ({selectedLigaYear})
                      </div>
                      <div className="text-2xl font-black text-emerald-400 font-mono">
                        R$ {userSchoolPayout.totalPayout.toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>
                );
              }

              if (school.division !== 'especial') {
                return (
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-white">
                          Objetivo de Acesso: Partilha Financeira da LIESA
                        </span>
                        <p className="text-slate-400">
                          Sua escola ({school.name}) disputa a <strong>{school.division.toUpperCase()}</strong>. Ao conquistar o acesso para o Grupo Especial, sua agremiação terá direito ao repasse global de <strong>R$ 18.300.000 a mais de R$ 28.120.000</strong> por temporada!
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })()}

            {/* Toggle / Accordion for Classification Fund Regulatory Table (R$ 20.000.000) */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setShowClassificationModal(!showClassificationModal)}
                className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-slate-900/50 transition cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <Percent className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-white uppercase tracking-wider block">
                      Regulamento do Fundo de Classificação (R$ 20.000.000)
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Clique para {showClassificationModal ? 'recolher' : 'ver'} a tabela oficial com percentagens e valores por colocação final da apuração
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30">
                    12 Faixas • 100% da Cota
                  </span>
                  {showClassificationModal ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </button>

              {showClassificationModal && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-3">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    O Fundo de Classificação de R$ 20.000.000 é distribuído de forma decrescente pela posição final da apuração dos 36 envelopes de notas na Apoteose:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                    {CLASSIFICATION_PRIZE_TABLE.map((item) => (
                      <div
                        key={item.rank}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${
                          item.rank === 1
                            ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                            : item.rank === 2
                            ? 'bg-slate-800/60 border-slate-700 text-slate-200'
                            : item.rank <= 6
                            ? 'bg-purple-950/30 border-purple-800/40 text-purple-200'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300'
                        }`}
                      >
                        <div>
                          <span className="text-[11px] font-black block">
                            {item.label}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            Quota: <strong>{item.percentage.toFixed(1).replace('.', ',')}%</strong>
                          </span>
                        </div>

                        <div className="text-right font-mono font-black text-sm text-white">
                          R$ {item.amount.toLocaleString('pt-BR')}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono font-bold pt-2 border-t border-slate-800 text-slate-400">
                    <span>Total Consolidado da Quota de Classificação:</span>
                    <span className="text-amber-400">100,0% = R$ 20.000.000</span>
                  </div>
                </div>
              )}
            </div>

            {/* Detailed Demonstrative Table of All 12 Schools in Grupo Especial */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                    <span>Demonstrativo Detalhado de Repasses das 12 Agremiações</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Tabela contábil oficial com a discriminação individual dos repasses financeiros ao fechar o Carnaval {selectedLigaYear}.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400">
                    12 agremiações auditadas
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 overflow-hidden shadow-xl bg-slate-950/90">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900 border-b border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-400">
                        <th className="py-3 px-3 text-center w-12">Pos.</th>
                        <th className="py-3 px-4 min-w-[200px]">Escola de Samba</th>
                        <th className="py-3 px-3 text-right">Patrocínio Fixo</th>
                        <th className="py-3 px-3 text-right">TV Regular</th>
                        <th className="py-3 px-3 text-right">Bilheteira (15%)</th>
                        <th className="py-3 px-3 text-right">Classificação</th>
                        <th className="py-3 px-3 text-right">Bônus Campeãs (G6)</th>
                        <th className="py-3 px-4 text-right min-w-[140px] text-emerald-400">Total Repassado</th>
                        <th className="py-3 px-3 text-center">Status Oficial</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 font-mono">
                      {ligaReport.payouts.map((row: SchoolLigaPayout) => {
                        const isUser =
                          row.schoolId === school.id ||
                          row.schoolName.toLowerCase() === school.name.toLowerCase();

                        return (
                          <tr
                            key={row.schoolId}
                            className={`transition ${
                              isUser
                                ? 'bg-amber-500/10 hover:bg-amber-500/15 ring-1 ring-amber-500/30'
                                : row.rank === 1
                                ? 'bg-amber-500/5 hover:bg-slate-900/80'
                                : row.isTop6
                                ? 'bg-purple-950/10 hover:bg-slate-900/80'
                                : 'hover:bg-slate-900/60'
                            }`}
                          >
                            {/* Posição */}
                            <td className="py-3 px-3 text-center">
                              <span
                                className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-black text-xs ${
                                  row.rank === 1
                                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 ring-1 ring-amber-300'
                                    : row.rank === 2
                                    ? 'bg-slate-300 text-slate-950'
                                    : row.rank === 3
                                    ? 'bg-amber-700 text-white'
                                    : row.isTop6
                                    ? 'bg-purple-900/60 text-purple-200 border border-purple-700'
                                    : row.rank === 12
                                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                    : 'bg-slate-800 text-slate-300'
                                }`}
                              >
                                {row.rank}º
                              </span>
                            </td>

                            {/* Escola de Samba */}
                            <td className="py-3 px-4 font-sans font-bold text-white">
                              <div className="flex items-center gap-2.5">
                                <div
                                  className="w-3.5 h-3.5 rounded-full border shadow-sm shrink-0"
                                  style={{
                                    backgroundColor: row.primaryColor || '#1e3a8a',
                                    borderColor: row.secondaryColor || '#ffffff'
                                  }}
                                />
                                <div className="truncate">
                                  <span className="block truncate text-slate-100 font-bold">
                                    {cleanSchoolName(row.schoolName)}
                                  </span>
                                  {row.totalScore && (
                                    <span className="block text-[10px] text-slate-400 font-mono font-normal">
                                      Nota: {row.totalScore.toFixed(1)} pts
                                    </span>
                                  )}
                                </div>
                                {isUser && (
                                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 shrink-0">
                                    SUA ESCOLA
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Patrocínio Fixo */}
                            <td className="py-3 px-3 text-right text-slate-300 font-normal">
                              R$ {row.sponsorFixed.toLocaleString('pt-BR')}
                            </td>

                            {/* TV Regular */}
                            <td className="py-3 px-3 text-right text-slate-300 font-normal">
                              R$ {row.tvRegular.toLocaleString('pt-BR')}
                            </td>

                            {/* Bilheteira Geral */}
                            <td className="py-3 px-3 text-right text-slate-300 font-normal">
                              R$ {row.generalTicketShare.toLocaleString('pt-BR')}
                            </td>

                            {/* Fundo Classificação */}
                            <td className="py-3 px-3 text-right">
                              <span className="text-amber-300 font-bold block">
                                R$ {row.classificationPrize.toLocaleString('pt-BR')}
                              </span>
                              <span className="text-[9px] text-slate-400 block">
                                ({row.classificationPercentage.toFixed(1).replace('.', ',')}%)
                              </span>
                            </td>

                            {/* Bônus Campeãs (Top 6) */}
                            <td className="py-3 px-3 text-right">
                              {row.isTop6 ? (
                                <div>
                                  <span className="text-purple-300 font-bold block">
                                    +R$ {row.totalBonusCampeas.toLocaleString('pt-BR')}
                                  </span>
                                  <span className="text-[9px] text-slate-400 block">
                                    (R$ 5M TV + R$ 720k Bilh.)
                                  </span>
                                </div>
                              ) : (
                                <span className="text-slate-600 font-normal">—</span>
                              )}
                            </td>

                            {/* Total Repassado */}
                            <td className="py-3 px-4 text-right">
                              <span className="text-sm font-black text-emerald-400 block">
                                R$ {row.totalPayout.toLocaleString('pt-BR')}
                              </span>
                              <span className="text-[9px] text-slate-400 font-normal block font-sans">
                                {LigaFinancialService.formatCompact(row.totalPayout)}
                              </span>
                            </td>

                            {/* Status Oficial */}
                            <td className="py-3 px-3 text-center font-sans">
                              <span
                                className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                  row.rank === 1
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                    : row.rank === 2
                                    ? 'bg-slate-700 text-slate-200 border-slate-600'
                                    : row.isTop6
                                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                    : row.rank === 12
                                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                    : 'bg-slate-800 text-slate-300 border-slate-700'
                                }`}
                              >
                                {row.statusLabel}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>

                    {/* Footer Totals */}
                    <tfoot className="bg-slate-900 border-t-2 border-slate-700 font-mono font-bold text-slate-200 text-xs">
                      <tr>
                        <td colSpan={2} className="py-3.5 px-4 font-sans font-black uppercase tracking-wider text-white">
                          Totais Globais Repassados pela LIGA:
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          R$ {ligaReport.totalSponsorsDisbursed.toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          R$ {ligaReport.totalTvRegularDisbursed.toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          R$ {ligaReport.officialTicketPool15.toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3.5 px-3 text-right text-amber-300 font-black">
                          R$ {ligaReport.totalClassificationDisbursed.toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3.5 px-3 text-right text-purple-300 font-black">
                          R$ {(ligaReport.totalCampeasTvDisbursed + ligaReport.totalCampeasTicketDisbursed).toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3.5 px-4 text-right text-base font-black text-emerald-400">
                          R$ {ligaReport.grandTotalDisbursed.toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3.5 px-3 text-center text-[10px] text-slate-400 font-sans">
                          100% Repassado
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* Regulatory Rules Footer Notes */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
              <div className="font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wide">
                <Info className="w-4 h-4" />
                <span>Regulamento Financeiro de Repasses & Premiação da LIGA:</span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-slate-400 list-disc list-inside">
                <li>
                  <strong>Patrocinadores Fixos:</strong> Todas as 12 escolas do Grupo Especial recebem R$ 14.000.000 fixos de cota corporativa.
                </li>
                <li>
                  <strong>Direitos de Transmissão de TV:</strong> Todas as 12 escolas recebem R$ 3.000.000 fixos das transmissões da Temporada Regular.
                </li>
                <li>
                  <strong>Fundo de Bilheteira Geral:</strong> 15% da arrecadação total dos ingressos do Desfile Oficial é dividido igualmente entre as 12 escolas (R$ 1.000.000 para cada agremiação).
                </li>
                <li>
                  <strong>Fundo de Classificação (R$ 20.000.000):</strong> Distribuído de forma decrescente pela posição final da apuração oficial.
                </li>
                <li className="md:col-span-2 text-purple-300 font-medium">
                  <strong>Bônus do Desfile das Campeãs (Top 6):</strong> R$ 5.000.000 adicionais de direitos de TV para cada uma das 6 escolas + 15% do valor arrecadado com ingressos do Sábado das Campeãs dividido igualmente entre as 6 (+R$ 5.720.000 no total por escola no G6).
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* CONDICIONAL: CONTEÚDO DA SÉRIE PRATA                     */}
        {/* ======================================================== */}
        {activeRepasseDivision === 'prata' && (
          <div className="space-y-6 animate-fadeIn">
            {/* 5 Pilares Financeiros da Série Prata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {/* Pilar 1: Fundo Global da Liga */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 relative hover:border-slate-700 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-slate-300">Fundo da Liga (Rateio)</span>
                  <Building2 className="w-4 h-4 text-slate-300" />
                </div>
                <div className="text-xl font-black text-white font-mono">
                  R$ 1.500.000
                </div>
                <div className="text-[10px] font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 inline-block">
                  Dividido Igualmente ({prataSchoolsList.length} Escolas)
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Cota global rateada em partes iguais: <strong>R$ {Math.round(1500000 / Math.max(1, prataSchoolsList.length)).toLocaleString('pt-BR')}</strong> por agremiação.
                </p>
              </div>

              {/* Pilar 2: Cota de Transmissão de TV */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 relative hover:border-slate-700 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-slate-300">Direitos de TV</span>
                  <Tv className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-xl font-black text-white font-mono">
                  R$ 80.000
                </div>
                <div className="text-[10px] font-bold text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/30 inline-block">
                  Fixo por Escola
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Cota individual garantida pela transmissão dos desfiles da Série Prata.
                </p>
              </div>

              {/* Pilar 3: Base Fixa Garantida */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-700 space-y-1.5 relative hover:border-slate-600 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-slate-200">Base Fixa Garantida</span>
                  <Landmark className="w-4 h-4 text-slate-300" />
                </div>
                <div className="text-xl font-black text-slate-200 font-mono">
                  R$ {(Math.round(1500000 / Math.max(1, prataSchoolsList.length)) + 80000).toLocaleString('pt-BR')}
                </div>
                <div className="text-[10px] font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 inline-block">
                  Piso por Escola (Pré-Apuração)
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Parcela do fundo de R$ 1,5M somada à cota de transmissão de TV.
                </p>
              </div>

              {/* Pilar 4: Premiação Top 3 */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/30 space-y-1.5 relative hover:border-purple-500/50 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-purple-300">Premiações Top 3</span>
                  <Trophy className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-xl font-black text-purple-300 font-mono">
                  R$ 520.000
                </div>
                <div className="text-[10px] font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30 inline-block">
                  Pódio da Apuração
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  1º R$ 300.000 • 2º R$ 150.000 • 3º R$ 70.000.
                </p>
              </div>

              {/* Pilar 5: Desembolso Global Estimado */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-1.5 relative hover:border-emerald-500/50 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-emerald-300">Total Desembolsado</span>
                  <Coins className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xl font-black text-emerald-400 font-mono">
                  R$ {(1500000 + (prataSchoolsList.length * 80000) + 520000).toLocaleString('pt-BR')}
                </div>
                <div className="text-[10px] font-bold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 inline-block">
                  Fundo + TV + Prêmios
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Investimento total da Superliga e emissora na Série Prata.
                </p>
              </div>
            </div>

            {/* Card de Destaque da Escola na Série Prata */}
            {(() => {
              if (userPrataPayout) {
                return (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-400/15 via-slate-950 to-emerald-500/15 border border-slate-400/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg border-2 shadow-md shrink-0 bg-slate-300/20 text-slate-200 border-slate-300">
                        {userPrataPayout.posicao}º
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-950">
                            SUA AGREMIAÇÃO NA SÉRIE PRATA
                          </span>
                          <span className="text-xs font-bold text-white">
                            {userPrataPayout.nomeEscola}
                          </span>
                          <span className="text-xs font-mono text-slate-300">
                            (
                            {userPrataPayout.posicao === 1
                              ? 'Campeã da Série Prata • Acesso à Série Ouro'
                              : userPrataPayout.posicao === 2
                              ? 'Vice-Campeã da Série Prata'
                              : userPrataPayout.posicao === 3
                              ? '3.º Lugar na Apuração'
                              : userPrataPayout.posicao >= prataSchoolsList.length - 2
                              ? 'Zona de Rebaixamento para Série Bronze'
                              : 'Manutenção na Série Prata'}
                            )
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-300 mt-1 flex-wrap">
                          <span>Rateio Fundo R$ 1,5M: <strong>R$ {userPrataPayout.cotaLiga.toLocaleString('pt-BR')}</strong></span>
                          <span>•</span>
                          <span>Cota TV: <strong>R$ 80.000</strong></span>
                          <span>•</span>
                          <span>Base Fixa: <strong>R$ {(userPrataPayout.cotaLiga + userPrataPayout.cotaTv).toLocaleString('pt-BR')}</strong></span>
                          <span>•</span>
                          <span className="text-purple-300 font-bold">
                            Premiação Esportiva: +R$ {userPrataPayout.premiacaoClassificacao.toLocaleString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 py-2.5 rounded-xl bg-slate-950/90 border border-emerald-500/40 text-right shrink-0">
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                        Repasse Total Série Prata ({selectedLigaYear})
                      </div>
                      <div className="text-2xl font-black text-emerald-400 font-mono">
                        R$ {userPrataPayout.totalRecebido.toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>
                );
              }

              if (school.division !== 'prata') {
                return (
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-slate-500/10 border border-slate-500/30 text-slate-300 shrink-0">
                        <Medal className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-white">
                          Visão Geral da Série Prata (Superliga Carnavalesca do Brasil)
                        </span>
                        <p className="text-slate-400">
                          Sua escola ({school.name}) disputa a <strong>{school.division.toUpperCase()}</strong>. Na Série Prata, cada escola recebe a sua cota do fundo de R$ 1,5 milhão somada a R$ 80 mil de TV, com prêmio de <strong>R$ 300.000</strong> para a campeã que sobe para a Série Ouro!
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })()}

            {/* Demonstrativo Detalhado de Repasses das Escolas da Série Prata */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-slate-300" />
                    <span>Demonstrativo Oficial de Repasses da Série Prata</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Tabela com a divisão igualitária de R$ 1.500.000, cotas de TV e premiações das 3 primeiras colocadas para o Carnaval {selectedLigaYear}.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400">
                    {prataFinancialReport.length} agremiações auditadas
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 overflow-hidden shadow-xl bg-slate-950/90">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900 border-b border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-400">
                        <th className="py-3 px-3 text-center w-12">Pos.</th>
                        <th className="py-3 px-4 min-w-[200px]">Escola de Samba</th>
                        <th className="py-3 px-3 text-right">Fundo Liga (1,5M)</th>
                        <th className="py-3 px-3 text-right">Cota TV</th>
                        <th className="py-3 px-3 text-right">Base Fixa</th>
                        <th className="py-3 px-3 text-right">Premiação Top 3</th>
                        <th className="py-3 px-4 text-right min-w-[140px] text-emerald-400">Total Recebido</th>
                        <th className="py-3 px-3 text-center">Status Oficial</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 font-mono">
                      {prataFinancialReport.map((row) => {
                        const isUser =
                          row.escolaId === school.id ||
                          row.nomeEscola.toLowerCase() === school.name.toLowerCase();

                        const matchedSchool = (allSchools || []).find(
                          (s) => s.id === row.escolaId || s.name.toLowerCase() === row.nomeEscola.toLowerCase()
                        );

                        return (
                          <tr
                            key={row.escolaId}
                            className={`transition ${
                              isUser
                                ? 'bg-amber-500/10 hover:bg-amber-500/15 ring-1 ring-amber-500/30'
                                : row.posicao === 1
                                ? 'bg-amber-500/5 hover:bg-slate-900/80'
                                : row.posicao === 2
                                ? 'bg-slate-800/40 hover:bg-slate-900/80'
                                : row.posicao === 3
                                ? 'bg-amber-950/20 hover:bg-slate-900/80'
                                : 'hover:bg-slate-900/60'
                            }`}
                          >
                            {/* Posição */}
                            <td className="py-3 px-3 text-center">
                              <span
                                className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-black text-xs ${
                                  row.posicao === 1
                                    ? 'bg-amber-500 text-slate-950 shadow-md ring-1 ring-amber-300'
                                    : row.posicao === 2
                                    ? 'bg-slate-300 text-slate-950'
                                    : row.posicao === 3
                                    ? 'bg-amber-700 text-white'
                                    : row.posicao >= prataFinancialReport.length - 2
                                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                    : 'bg-slate-800 text-slate-300'
                                }`}
                              >
                                {row.posicao}º
                              </span>
                            </td>

                            {/* Escola de Samba */}
                            <td className="py-3 px-4 font-sans font-bold text-white">
                              <div className="flex items-center gap-2.5">
                                <div
                                  className="w-3.5 h-3.5 rounded-full border shadow-sm shrink-0"
                                  style={{
                                    backgroundColor: matchedSchool?.colors?.primary || '#334155',
                                    borderColor: matchedSchool?.colors?.secondary || '#ffffff'
                                  }}
                                />
                                <div className="truncate">
                                  <span className="block truncate text-slate-100 font-bold">
                                    {cleanSchoolName(row.nomeEscola)}
                                  </span>
                                </div>
                                {isUser && (
                                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 shrink-0">
                                    SUA ESCOLA
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Parcela Fundo da Liga */}
                            <td className="py-3 px-3 text-right text-slate-300 font-normal">
                              R$ {row.cotaLiga.toLocaleString('pt-BR')}
                            </td>

                            {/* Cota TV */}
                            <td className="py-3 px-3 text-right text-slate-300 font-normal">
                              R$ {row.cotaTv.toLocaleString('pt-BR')}
                            </td>

                            {/* Base Fixa */}
                            <td className="py-3 px-3 text-right text-slate-200 font-bold">
                              R$ {(row.cotaLiga + row.cotaTv).toLocaleString('pt-BR')}
                            </td>

                            {/* Premiação */}
                            <td className="py-3 px-3 text-right">
                              <span className="text-purple-300 font-bold block">
                                R$ {row.premiacaoClassificacao.toLocaleString('pt-BR')}
                              </span>
                              <span className="text-[9px] text-slate-400 block font-sans">
                                {row.posicao === 1
                                  ? 'Campeã'
                                  : row.posicao === 2
                                  ? 'Vice'
                                  : row.posicao === 3
                                  ? '3.º Lugar'
                                  : '-'}
                              </span>
                            </td>

                            {/* Total Recebido */}
                            <td className="py-3 px-4 text-right">
                              <span className="text-sm font-black text-emerald-400 block">
                                R$ {row.totalRecebido.toLocaleString('pt-BR')}
                              </span>
                              <span className="text-[9px] text-slate-400 font-normal block font-sans">
                                {RepassesFinanceirosService.formatCompact(row.totalRecebido)}
                              </span>
                            </td>

                            {/* Status Oficial */}
                            <td className="py-3 px-3 text-center font-sans">
                              <span
                                className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                  row.posicao === 1
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                    : row.posicao === 2
                                    ? 'bg-slate-700 text-slate-200 border-slate-600'
                                    : row.posicao === 3
                                    ? 'bg-amber-900/30 text-amber-300 border-amber-800'
                                    : row.posicao >= prataFinancialReport.length - 2
                                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                    : 'bg-slate-800 text-slate-300 border-slate-700'
                                }`}
                              >
                                {row.posicao === 1
                                  ? 'Campeã (Acesso à Ouro)'
                                  : row.posicao === 2
                                  ? 'Vice-Campeã'
                                  : row.posicao === 3
                                  ? '3.º Lugar'
                                  : row.posicao >= prataFinancialReport.length - 2
                                  ? 'Rebaixada p/ Bronze'
                                  : 'Permanência na Prata'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>

                    {/* Footer Totals */}
                    <tfoot className="bg-slate-900 border-t-2 border-slate-700 font-mono font-bold text-slate-200 text-xs">
                      <tr>
                        <td colSpan={2} className="py-3.5 px-4 font-sans font-black uppercase tracking-wider text-white">
                          Totais da Série Prata ({prataFinancialReport.length} escolas):
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          R$ {(prataFinancialReport.reduce((a, b) => a + b.cotaLiga, 0)).toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          R$ {(prataFinancialReport.reduce((a, b) => a + b.cotaTv, 0)).toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3.5 px-3 text-right text-slate-200 font-black">
                          R$ {(prataFinancialReport.reduce((a, b) => a + b.cotaLiga + b.cotaTv, 0)).toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3.5 px-3 text-right text-purple-300 font-black">
                          R$ {(prataFinancialReport.reduce((a, b) => a + b.premiacaoClassificacao, 0)).toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3.5 px-4 text-right text-base font-black text-emerald-400">
                          R$ {(prataFinancialReport.reduce((a, b) => a + b.totalRecebido, 0)).toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3.5 px-3 text-center text-[10px] text-slate-400 font-sans">
                          100% Repassado
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* Regulamento da Série Prata */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
              <div className="font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wide">
                <Info className="w-4 h-4 text-slate-400" />
                <span>Regulamento Financeiro da Série Prata:</span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-slate-400 list-disc list-inside">
                <li>
                  <strong>Fundo de R$ 1,5 Milhão:</strong> Rateado em quotas rigorosamente iguais entre todas as agremiações que integram a Série Prata.
                </li>
                <li>
                  <strong>Cota de Transmissão de TV:</strong> R$ 80.000 fixos para cada agremiação participante.
                </li>
                <li className="md:col-span-2 text-purple-300 font-medium">
                  <strong>Premiação de Mérito Esportivo:</strong> 1.º Lugar (Campeã • Acesso à Série Ouro): <strong>R$ 300.000</strong> | 2.º Lugar (Vice-campeã): <strong>R$ 150.000</strong> | 3.º Lugar: <strong>R$ 70.000</strong>.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* CONDICIONAL: CONTEÚDO DA SÉRIE BRONZE                     */}
        {/* ======================================================== */}
        {activeRepasseDivision === 'bronze' && (
          <div className="space-y-6 animate-fadeIn">
            {/* 4 Pilares Financeiros da Série Bronze */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* Pilar 1: Repasse Fixo Institucional */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 relative hover:border-slate-700 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-slate-300">Repasse Fixo Garantido</span>
                  <Award className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-xl font-black text-amber-500 font-mono">
                  R$ 80.000
                </div>
                <div className="text-[10px] font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800 inline-block">
                  Fixo por Escola ({bronzeSchoolsList.length} Escolas)
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Repasse garantido para todas as agremiações participantes da Série Bronze.
                </p>
              </div>

              {/* Pilar 2: Premiação Campeã */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-700/30 space-y-1.5 relative hover:border-amber-700/50 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-amber-300">1.º Lugar (Campeã)</span>
                  <Trophy className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-xl font-black text-amber-400 font-mono">
                  R$ 90.000
                </div>
                <div className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 inline-block">
                  Acesso à Série Prata
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Premiação máxima esportiva concedida à grande campeã da Série Bronze.
                </p>
              </div>

              {/* Pilar 3: Premiação Vice e 3º Lugar */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/30 space-y-1.5 relative hover:border-purple-500/50 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-purple-300">Vice & 3.º Colocada</span>
                  <Medal className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-xl font-black text-purple-300 font-mono">
                  R$ 60k / R$ 30k
                </div>
                <div className="text-[10px] font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30 inline-block">
                  Pódio da Bronze
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  2º Lugar: R$ 60.000 • 3º Lugar: R$ 30.000. Total Top 3: <strong>R$ 180.000</strong>.
                </p>
              </div>

              {/* Pilar 4: Total Geral Série Bronze */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-1.5 relative hover:border-emerald-500/50 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-emerald-300">Total Desembolsado</span>
                  <Coins className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xl font-black text-emerald-400 font-mono">
                  R$ {(bronzeSchoolsList.length * 80000 + 180000).toLocaleString('pt-BR')}
                </div>
                <div className="text-[10px] font-bold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 inline-block">
                  Repasses + Premiações
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Soma dos repasses fixos de R$ 80k e o fundo de premiações de R$ 180k.
                </p>
              </div>
            </div>

            {/* Card de Destaque da Escola na Série Bronze */}
            {(() => {
              if (userBronzePayout) {
                return (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-700/20 via-slate-950 to-emerald-500/15 border border-amber-700/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg border-2 shadow-md shrink-0 bg-amber-700/20 text-amber-300 border-amber-600">
                        {userBronzePayout.posicao}º
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-700 text-white">
                            SUA AGREMIAÇÃO NA SÉRIE BRONZE
                          </span>
                          <span className="text-xs font-bold text-white">
                            {userBronzePayout.nomeEscola}
                          </span>
                          <span className="text-xs font-mono text-amber-300">
                            (
                            {userBronzePayout.posicao === 1
                              ? 'Campeã da Série Bronze • Acesso à Série Prata'
                              : userBronzePayout.posicao === 2
                              ? 'Vice-Campeã da Série Bronze'
                              : userBronzePayout.posicao === 3
                              ? '3.º Lugar na Apuração'
                              : userBronzePayout.posicao >= bronzeSchoolsList.length - 2
                              ? 'Zona de Rebaixamento para Grupo de Avaliação'
                              : 'Manutenção na Série Bronze'}
                            )
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-300 mt-1 flex-wrap">
                          <span>Repasse Fixo: <strong>R$ 80.000</strong></span>
                          <span>•</span>
                          <span className="text-purple-300 font-bold">
                            Premiação Esportiva: +R$ {userBronzePayout.premiacaoClassificacao.toLocaleString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 py-2.5 rounded-xl bg-slate-950/90 border border-emerald-500/40 text-right shrink-0">
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                        Repasse Total Série Bronze ({selectedLigaYear})
                      </div>
                      <div className="text-2xl font-black text-emerald-400 font-mono">
                        R$ {userBronzePayout.totalRecebido.toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>
                );
              }

              if (school.division !== 'bronze') {
                return (
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-amber-700/10 border border-amber-700/30 text-amber-400 shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-white">
                          Visão Geral da Série Bronze
                        </span>
                        <p className="text-slate-400">
                          Sua escola ({school.name}) disputa a <strong>{school.division.toUpperCase()}</strong>. Na Série Bronze, todas as participantes recebem R$ 80.000 garantidos, e as três primeiras dividem R$ 180.000 em prêmios esportivos!
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })()}

            {/* Demonstrativo Detalhado de Repasses das Escolas da Série Bronze */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-amber-500" />
                    <span>Demonstrativo Oficial de Repasses da Série Bronze</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Tabela oficial de repasses de R$ 80.000 por escola e bonificações do pódio para o Carnaval {selectedLigaYear}.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400">
                    {bronzeFinancialReport.length} agremiações auditadas
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 overflow-hidden shadow-xl bg-slate-950/90">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900 border-b border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-400">
                        <th className="py-3 px-3 text-center w-12">Pos.</th>
                        <th className="py-3 px-4 min-w-[200px]">Escola de Samba</th>
                        <th className="py-3 px-3 text-right">Repasse Fixo</th>
                        <th className="py-3 px-3 text-right">Premiação Top 3</th>
                        <th className="py-3 px-4 text-right min-w-[140px] text-emerald-400">Total Recebido</th>
                        <th className="py-3 px-3 text-center">Status Oficial</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 font-mono">
                      {bronzeFinancialReport.map((row) => {
                        const isUser =
                          row.escolaId === school.id ||
                          row.nomeEscola.toLowerCase() === school.name.toLowerCase();

                        const matchedSchool = (allSchools || []).find(
                          (s) => s.id === row.escolaId || s.name.toLowerCase() === row.nomeEscola.toLowerCase()
                        );

                        return (
                          <tr
                            key={row.escolaId}
                            className={`transition ${
                              isUser
                                ? 'bg-amber-500/10 hover:bg-amber-500/15 ring-1 ring-amber-500/30'
                                : row.posicao === 1
                                ? 'bg-amber-500/5 hover:bg-slate-900/80'
                                : row.posicao === 2
                                ? 'bg-slate-800/40 hover:bg-slate-900/80'
                                : row.posicao === 3
                                ? 'bg-amber-950/20 hover:bg-slate-900/80'
                                : 'hover:bg-slate-900/60'
                            }`}
                          >
                            {/* Posição */}
                            <td className="py-3 px-3 text-center">
                              <span
                                className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-black text-xs ${
                                  row.posicao === 1
                                    ? 'bg-amber-500 text-slate-950 shadow-md ring-1 ring-amber-300'
                                    : row.posicao === 2
                                    ? 'bg-slate-300 text-slate-950'
                                    : row.posicao === 3
                                    ? 'bg-amber-700 text-white'
                                    : row.posicao >= bronzeFinancialReport.length - 2
                                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                    : 'bg-slate-800 text-slate-300'
                                }`}
                              >
                                {row.posicao}º
                              </span>
                            </td>

                            {/* Escola de Samba */}
                            <td className="py-3 px-4 font-sans font-bold text-white">
                              <div className="flex items-center gap-2.5">
                                <div
                                  className="w-3.5 h-3.5 rounded-full border shadow-sm shrink-0"
                                  style={{
                                    backgroundColor: matchedSchool?.colors?.primary || '#b45309',
                                    borderColor: matchedSchool?.colors?.secondary || '#ffffff'
                                  }}
                                />
                                <div className="truncate">
                                  <span className="block truncate text-slate-100 font-bold">
                                    {cleanSchoolName(row.nomeEscola)}
                                  </span>
                                </div>
                                {isUser && (
                                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 shrink-0">
                                    SUA ESCOLA
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Repasse Fixo */}
                            <td className="py-3 px-3 text-right text-slate-300 font-bold">
                              R$ {row.subvencaoPublica.toLocaleString('pt-BR')}
                            </td>

                            {/* Premiação */}
                            <td className="py-3 px-3 text-right">
                              <span className="text-purple-300 font-bold block">
                                R$ {row.premiacaoClassificacao.toLocaleString('pt-BR')}
                              </span>
                              <span className="text-[9px] text-slate-400 block font-sans">
                                {row.posicao === 1
                                  ? 'Campeã'
                                  : row.posicao === 2
                                  ? 'Vice'
                                  : row.posicao === 3
                                  ? '3.º Lugar'
                                  : '-'}
                              </span>
                            </td>

                            {/* Total Recebido */}
                            <td className="py-3 px-4 text-right">
                              <span className="text-sm font-black text-emerald-400 block">
                                R$ {row.totalRecebido.toLocaleString('pt-BR')}
                              </span>
                              <span className="text-[9px] text-slate-400 font-normal block font-sans">
                                {RepassesFinanceirosService.formatCompact(row.totalRecebido)}
                              </span>
                            </td>

                            {/* Status Oficial */}
                            <td className="py-3 px-3 text-center font-sans">
                              <span
                                className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                  row.posicao === 1
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                    : row.posicao === 2
                                    ? 'bg-slate-700 text-slate-200 border-slate-600'
                                    : row.posicao === 3
                                    ? 'bg-amber-900/30 text-amber-300 border-amber-800'
                                    : row.posicao >= bronzeFinancialReport.length - 2
                                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                    : 'bg-slate-800 text-slate-300 border-slate-700'
                                }`}
                              >
                                {row.posicao === 1
                                  ? 'Campeã (Acesso à Prata)'
                                  : row.posicao === 2
                                  ? 'Vice-Campeã'
                                  : row.posicao === 3
                                  ? '3.º Lugar'
                                  : row.posicao >= bronzeFinancialReport.length - 2
                                  ? 'Rebaixada p/ Avaliação'
                                  : 'Permanência na Bronze'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>

                    {/* Footer Totals */}
                    <tfoot className="bg-slate-900 border-t-2 border-slate-700 font-mono font-bold text-slate-200 text-xs">
                      <tr>
                        <td colSpan={2} className="py-3.5 px-4 font-sans font-black uppercase tracking-wider text-white">
                          Totais da Série Bronze ({bronzeFinancialReport.length} escolas):
                        </td>
                        <td className="py-3.5 px-3 text-right text-amber-400 font-bold">
                          R$ {(bronzeFinancialReport.reduce((a, b) => a + b.subvencaoPublica, 0)).toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3.5 px-3 text-right text-purple-300 font-black">
                          R$ {(bronzeFinancialReport.reduce((a, b) => a + b.premiacaoClassificacao, 0)).toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3.5 px-4 text-right text-base font-black text-emerald-400">
                          R$ {(bronzeFinancialReport.reduce((a, b) => a + b.totalRecebido, 0)).toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3.5 px-3 text-center text-[10px] text-slate-400 font-sans">
                          100% Repassado
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* Regulamento da Série Bronze */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
              <div className="font-bold text-amber-500 flex items-center gap-1.5 uppercase tracking-wide">
                <Info className="w-4 h-4" />
                <span>Regulamento Financeiro da Série Bronze:</span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-slate-400 list-disc list-inside">
                <li>
                  <strong>Repasse Fixo:</strong> Cada agremiação participante recebe R$ 80.000 garantidos para custeio de carnaval.
                </li>
                <li className="text-purple-300 font-medium">
                  <strong>Premiação do Pódio:</strong> 1.º Lugar (Campeã • Acesso à Série Prata): <strong>R$ 90.000</strong> | 2.º Lugar: <strong>R$ 60.000</strong> | 3.º Lugar: <strong>R$ 30.000</strong>.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* CONDICIONAL: CONTEÚDO DO GRUPO DE AVALIAÇÃO              */}
        {/* ======================================================== */}
        {activeRepasseDivision === 'avaliacao' && (
          <div className="space-y-6 animate-fadeIn">
            {/* 4 Pilares Financeiros do Grupo de Avaliação */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* Pilar 1: Repasse Fixo */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 relative hover:border-slate-700 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-slate-300">Repasse Fixo de Valores</span>
                  <Award className="w-4 h-4 text-slate-500" />
                </div>
                <div className="text-xl font-black text-slate-400 font-mono">
                  R$ 0
                </div>
                <div className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 inline-block">
                  Sem Repasses Fixos
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  No Grupo de Avaliação não há repasse de valores fixos para as agremiações.
                </p>
              </div>

              {/* Pilar 2: Premiação Campeã */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/30 space-y-1.5 relative hover:border-purple-500/50 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-purple-300">1.º Lugar (Campeã)</span>
                  <Trophy className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-xl font-black text-purple-300 font-mono">
                  R$ 20.000
                </div>
                <div className="text-[10px] font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30 inline-block">
                  Acesso à Série Bronze
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Bonificação por mérito concedida à agremiação campeã do Grupo de Avaliação.
                </p>
              </div>

              {/* Pilar 3: Premiação Vice e 3º Lugar */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/30 space-y-1.5 relative hover:border-purple-500/50 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-purple-300">Vice & 3.º Colocada</span>
                  <Medal className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-xl font-black text-purple-300 font-mono">
                  R$ 12k / R$ 6k
                </div>
                <div className="text-[10px] font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30 inline-block">
                  Pódio de Avaliação
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  2º Lugar: R$ 12.000 • 3º Lugar: R$ 6.000. Total Top 3: <strong>R$ 38.000</strong>.
                </p>
              </div>

              {/* Pilar 4: Total de Premiações */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-1.5 relative hover:border-emerald-500/50 transition">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-emerald-300">Fundo Total de Prêmios</span>
                  <Coins className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xl font-black text-emerald-400 font-mono">
                  R$ 38.000
                </div>
                <div className="text-[10px] font-bold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 inline-block">
                  Mérito Esportivo
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Premiação total exclusiva para as três agremiações promovidas.
                </p>
              </div>
            </div>

            {/* Card de Destaque da Escola no Grupo de Avaliação */}
            {(() => {
              if (userAvaliacaoPayout) {
                return (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/15 via-slate-950 to-emerald-500/15 border border-purple-500/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg border-2 shadow-md shrink-0 bg-purple-500/20 text-purple-300 border-purple-400">
                        {userAvaliacaoPayout.posicao}º
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-purple-600 text-white">
                            SUA AGREMIAÇÃO NO GRUPO DE AVALIAÇÃO
                          </span>
                          <span className="text-xs font-bold text-white">
                            {userAvaliacaoPayout.nomeEscola}
                          </span>
                          <span className="text-xs font-mono text-purple-300">
                            (
                            {userAvaliacaoPayout.posicao === 1
                              ? 'Campeã do Grupo de Avaliação • Acesso à Série Bronze'
                              : userAvaliacaoPayout.posicao === 2
                              ? 'Vice-Campeã • Acesso à Série Bronze'
                              : userAvaliacaoPayout.posicao === 3
                              ? '3.º Lugar • Acesso à Série Bronze'
                              : userAvaliacaoPayout.posicao >= avaliacaoSchoolsList.length - 2
                              ? 'Zona de Afastamento / Suspensão por 1 ano'
                              : 'Manutenção no Grupo de Avaliação'}
                            )
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-300 mt-1 flex-wrap">
                          <span>Repasse Fixo: <strong>R$ 0</strong></span>
                          <span>•</span>
                          <span className="text-purple-300 font-bold">
                            Premiação Esportiva: +R$ {userAvaliacaoPayout.premiacaoClassificacao.toLocaleString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 py-2.5 rounded-xl bg-slate-950/90 border border-emerald-500/40 text-right shrink-0">
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                        Repasse Total Avaliação ({selectedLigaYear})
                      </div>
                      <div className="text-2xl font-black text-emerald-400 font-mono">
                        R$ {userAvaliacaoPayout.totalRecebido.toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>
                );
              }

              if (school.division !== 'avaliacao') {
                return (
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 shrink-0">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-white">
                          Visão Geral do Grupo de Avaliação
                        </span>
                        <p className="text-slate-400">
                          Sua escola ({school.name}) disputa a <strong>{school.division.toUpperCase()}</strong>. No Grupo de Avaliação, não há repasse de valores fixos, apenas premiações por mérito esportivo para as três primeiras colocadas que sobem para a Série Bronze (R$ 20k, R$ 12k e R$ 6k)!
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })()}

            {/* Demonstrativo Detalhado do Grupo de Avaliação */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-purple-400" />
                    <span>Demonstrativo Oficial do Grupo de Avaliação</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Tabela de premiações de mérito esportivo concedidas às agremiações no Carnaval {selectedLigaYear}.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400">
                    {avaliacaoFinancialReport.length} agremiações auditadas
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 overflow-hidden shadow-xl bg-slate-950/90">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900 border-b border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-400">
                        <th className="py-3 px-3 text-center w-12">Pos.</th>
                        <th className="py-3 px-4 min-w-[200px]">Escola de Samba</th>
                        <th className="py-3 px-3 text-right">Repasse Fixo</th>
                        <th className="py-3 px-3 text-right">Premiação Top 3</th>
                        <th className="py-3 px-4 text-right min-w-[140px] text-emerald-400">Total Recebido</th>
                        <th className="py-3 px-3 text-center">Status Oficial</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 font-mono">
                      {avaliacaoFinancialReport.map((row) => {
                        const isUser =
                          row.escolaId === school.id ||
                          row.nomeEscola.toLowerCase() === school.name.toLowerCase();

                        const matchedSchool = (allSchools || []).find(
                          (s) => s.id === row.escolaId || s.name.toLowerCase() === row.nomeEscola.toLowerCase()
                        );

                        return (
                          <tr
                            key={row.escolaId}
                            className={`transition ${
                              isUser
                                ? 'bg-amber-500/10 hover:bg-amber-500/15 ring-1 ring-amber-500/30'
                                : row.posicao === 1
                                ? 'bg-amber-500/5 hover:bg-slate-900/80'
                                : row.posicao === 2
                                ? 'bg-slate-800/40 hover:bg-slate-900/80'
                                : row.posicao === 3
                                ? 'bg-amber-950/20 hover:bg-slate-900/80'
                                : 'hover:bg-slate-900/60'
                            }`}
                          >
                            {/* Posição */}
                            <td className="py-3 px-3 text-center">
                              <span
                                className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-black text-xs ${
                                  row.posicao === 1
                                    ? 'bg-amber-500 text-slate-950 shadow-md ring-1 ring-amber-300'
                                    : row.posicao === 2
                                    ? 'bg-slate-300 text-slate-950'
                                    : row.posicao === 3
                                    ? 'bg-amber-700 text-white'
                                    : row.posicao >= avaliacaoFinancialReport.length - 2
                                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                    : 'bg-slate-800 text-slate-300'
                                }`}
                              >
                                {row.posicao}º
                              </span>
                            </td>

                            {/* Escola de Samba */}
                            <td className="py-3 px-4 font-sans font-bold text-white">
                              <div className="flex items-center gap-2.5">
                                <div
                                  className="w-3.5 h-3.5 rounded-full border shadow-sm shrink-0"
                                  style={{
                                    backgroundColor: matchedSchool?.colors?.primary || '#7c3aed',
                                    borderColor: matchedSchool?.colors?.secondary || '#ffffff'
                                  }}
                                />
                                <div className="truncate">
                                  <span className="block truncate text-slate-100 font-bold">
                                    {cleanSchoolName(row.nomeEscola)}
                                  </span>
                                </div>
                                {isUser && (
                                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 shrink-0">
                                    SUA ESCOLA
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Repasse Fixo */}
                            <td className="py-3 px-3 text-right text-slate-400 font-normal">
                              R$ 0
                            </td>

                            {/* Premiação */}
                            <td className="py-3 px-3 text-right">
                              <span className="text-purple-300 font-bold block">
                                R$ {row.premiacaoClassificacao.toLocaleString('pt-BR')}
                              </span>
                              <span className="text-[9px] text-slate-400 block font-sans">
                                {row.posicao === 1
                                  ? 'Campeã'
                                  : row.posicao === 2
                                  ? 'Vice'
                                  : row.posicao === 3
                                  ? '3.º Lugar'
                                  : '-'}
                              </span>
                            </td>

                            {/* Total Recebido */}
                            <td className="py-3 px-4 text-right">
                              <span className="text-sm font-black text-emerald-400 block">
                                R$ {row.totalRecebido.toLocaleString('pt-BR')}
                              </span>
                              <span className="text-[9px] text-slate-400 font-normal block font-sans">
                                {RepassesFinanceirosService.formatCompact(row.totalRecebido)}
                              </span>
                            </td>

                            {/* Status Oficial */}
                            <td className="py-3 px-3 text-center font-sans">
                              <span
                                className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                  row.posicao === 1
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                    : row.posicao === 2
                                    ? 'bg-slate-700 text-slate-200 border-slate-600'
                                    : row.posicao === 3
                                    ? 'bg-amber-900/30 text-amber-300 border-amber-800'
                                    : row.posicao >= avaliacaoFinancialReport.length - 2
                                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                    : 'bg-slate-800 text-slate-300 border-slate-700'
                                }`}
                              >
                                {row.posicao === 1
                                  ? 'Campeã (Acesso à Bronze)'
                                  : row.posicao === 2
                                  ? 'Vice (Acesso à Bronze)'
                                  : row.posicao === 3
                                  ? '3.º Lugar (Acesso à Bronze)'
                                  : row.posicao >= avaliacaoFinancialReport.length - 2
                                  ? 'Afastada por 1 ano'
                                  : 'Permanência na Avaliação'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>

                    {/* Footer Totals */}
                    <tfoot className="bg-slate-900 border-t-2 border-slate-700 font-mono font-bold text-slate-200 text-xs">
                      <tr>
                        <td colSpan={2} className="py-3.5 px-4 font-sans font-black uppercase tracking-wider text-white">
                          Totais do Grupo de Avaliação ({avaliacaoFinancialReport.length} escolas):
                        </td>
                        <td className="py-3.5 px-3 text-right text-slate-400">
                          R$ 0
                        </td>
                        <td className="py-3.5 px-3 text-right text-purple-300 font-black">
                          R$ {(avaliacaoFinancialReport.reduce((a, b) => a + b.premiacaoClassificacao, 0)).toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3.5 px-4 text-right text-base font-black text-emerald-400">
                          R$ {(avaliacaoFinancialReport.reduce((a, b) => a + b.totalRecebido, 0)).toLocaleString('pt-BR')}
                        </td>
                        <td className="py-3.5 px-3 text-center text-[10px] text-slate-400 font-sans">
                          100% Repassado
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* Regulamento do Grupo de Avaliação */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
              <div className="font-bold text-purple-400 flex items-center gap-1.5 uppercase tracking-wide">
                <Info className="w-4 h-4" />
                <span>Regulamento Financeiro do Grupo de Avaliação:</span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-slate-400 list-disc list-inside">
                <li>
                  <strong>Sem Repasses Fixos:</strong> Não há repasse de quotas ou valores fixos para as agremiações no Grupo de Avaliação.
                </li>
                <li className="text-purple-300 font-medium">
                  <strong>Premiação de Mérito Esportivo:</strong> 1.º Lugar (Campeã): <strong>R$ 20.000</strong> | 2.º Lugar (Vice): <strong>R$ 12.000</strong> | 3.º Lugar: <strong>R$ 6.000</strong>. Todas garantem vaga na Série Bronze do próximo Carnaval!
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {(() => {
        const userSlot = sorteio?.divisions?.[school.division]?.slots.find((s) => s.schoolId === school.id);
        const logistics = LogisticsService.calculateSchoolLogistics(school, userSlot);

        return (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-500 text-slate-950">
                      LOGÍSTICA & DESLOCAMENTO
                    </span>
                    <span className="text-xs text-slate-400">
                      Sede: {school.neighborhood} → Passarela: {logistics.venueName} ({logistics.distanceKm} km)
                    </span>
                    {userSlot && (
                      <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                        {userSlot.order}ª a Desfilar ({userSlot.dayLabel.split(' ')[0]})
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-black text-white mt-0.5">
                    Gastos de Locomoção: Ensaios Técnicos & Desfile Oficial
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Custo Total de Logística</div>
                  <div className="text-xl font-black text-amber-400 font-mono">
                    R$ {logistics.totalLogisticsCost.toLocaleString('pt-BR')}
                  </div>
                </div>

                <button
                  onClick={() => setIsLogisticsModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shadow-lg shadow-amber-500/20 cursor-pointer shrink-0"
                  title="Abrir mapa de geolocalização e relatório detalhado de frota"
                >
                  <Truck className="w-4 h-4" />
                  <span>Ver Mapa & Frota</span>
                </button>
              </div>
            </div>

            {/* Position Interference & Distance Info */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-amber-400" />
                  Interferência da Posição ({logistics.paradePosition.orderTitle}):
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {logistics.positionImpactSummary}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                  Frota: {logistics.busesNeeded} ônibus + {logistics.trucksNeeded} carretas
                </span>
                <span className={`text-[11px] font-bold px-2.5 py-1.5 rounded-lg border ${
                  logistics.budgetAffordability === 'confortavel'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : logistics.budgetAffordability === 'adequado'
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}>
                  Situação: {logistics.budgetAffordability.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Detailed Expense Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-white text-xs flex items-center gap-1.5">
                    <Bus className="w-4 h-4 text-amber-400" />
                    Ensaio Técnico na Passarela
                  </span>
                  <span className="font-mono font-bold text-amber-400 text-xs">
                    R$ {logistics.ensaioTecnicoCosts.total.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="space-y-1 text-[11px] text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Transporte de Componentes:</span>
                    <span className="font-mono">R$ {logistics.ensaioTecnicoCosts.transporteComponentes.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Transporte de Instrumentos da Bateria:</span>
                    <span className="font-mono">R$ {logistics.ensaioTecnicoCosts.transporteBateria.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Alimentação & Hidratação:</span>
                    <span className="font-mono">R$ {logistics.ensaioTecnicoCosts.alimentacaoHidratacao.toLocaleString('pt-BR')}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-white text-xs flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-blue-400" />
                    Desfile Oficial de Carnaval
                  </span>
                  <span className="font-mono font-bold text-blue-400 text-xs">
                    R$ {logistics.desfileOficialCosts.total.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="space-y-1 text-[11px] text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Frota Geral de Ônibus:</span>
                    <span className="font-mono">R$ {logistics.desfileOficialCosts.transporteComponentes.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Comboio de Alegorias & Carretas:</span>
                    <span className="font-mono">R$ {logistics.desfileOficialCosts.transporteAlegoriasETripes.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Apoio na Concentração & Dispersão:</span>
                    <span className="font-mono">R$ {logistics.desfileOficialCosts.apoioConcentracaoDispersao.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Hidratação dos Desfilantes:</span>
                    <span className="font-mono">R$ {logistics.desfileOficialCosts.hidratacaoEquipe.toLocaleString('pt-BR')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ========================================== */}
      {/* SEÇÃO DA QUADRA SOCIAL & MODERNIZAÇÃO      */}
      {/* ========================================== */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                  SEDE OFICIAL & PATRIMÔNIO
                </span>
                <span className="text-xs text-slate-400">
                  {school.neighborhood} {school.cityState ? `(${school.cityState})` : ''}
                </span>
              </div>
              <h3 className="text-xl font-black text-white mt-0.5">
                {effectiveQuadraName}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-right">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Nível da Quadra</div>
              <div className="text-sm font-black text-amber-300 font-mono">
                Nível {currentQuadraLevel} de 5 • {currentQuadraConfig.title}
              </div>
            </div>
          </div>
        </div>

        {/* Status da Quadra e Benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 block font-semibold">Capacidade de Público:</span>
            <span className="text-base font-black text-white font-mono">
              {currentQuadraConfig.capacity.toLocaleString('pt-BR')} pessoas
            </span>
            <p className="text-[10px] text-slate-400">
              Contingente suportado para ensaios e grandes eventos.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 block font-semibold">Bônus de Arrecadação:</span>
            <span className="text-base font-black text-emerald-400 font-mono">
              {currentQuadraConfig.bonusLabel}
            </span>
            <p className="text-[10px] text-slate-400">
              Multiplicador aplicado a todos os eventos comunitários.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 block font-semibold">Estrutura Atual:</span>
            <span className="text-xs font-bold text-slate-200">
              {currentQuadraConfig.description}
            </span>
          </div>
        </div>

        {/* Barra de Progresso dos Níveis da Quadra */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-bold">Evolução Estrutural da Quadra:</span>
            <span className="font-mono text-amber-400">Nível {currentQuadraLevel} / 5</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 h-3">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <div
                key={lvl}
                className={`rounded-full transition-all ${
                  lvl <= currentQuadraLevel
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card de Próxima Reforma da Quadra */}
        {nextQuadraConfig ? (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-950 to-indigo-950/30 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <Hammer className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-black text-amber-300 uppercase tracking-wide">
                  Próxima Reforma Disponível: Nível {nextQuadraConfig.level} • {nextQuadraConfig.title}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {nextQuadraConfig.description}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                <span>Capacidade: <strong>{nextQuadraConfig.capacity.toLocaleString('pt-BR')} pessoas</strong></span>
                <span>•</span>
                <span className="text-emerald-300">Bônus de eventos: <strong>{nextQuadraConfig.bonusLabel}</strong></span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase font-semibold">Custo da Reforma</span>
                <span className="text-lg font-black text-amber-400 font-mono">
                  R$ {nextQuadraConfig.upgradeCost.toLocaleString('pt-BR')}
                </span>
              </div>

              <button
                onClick={handleUpgradeQuadra}
                disabled={school.budget < nextQuadraConfig.upgradeCost}
                className={`px-5 py-3 rounded-xl font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                  school.budget < nextQuadraConfig.upgradeCost
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20'
                }`}
              >
                <Hammer className="w-4 h-4" />
                <span>
                  {school.budget < nextQuadraConfig.upgradeCost
                    ? 'Saldo Insuficiente'
                    : `Reformar Quadra (Nível ${nextQuadraConfig.level})`}
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              <strong>Parabéns!</strong> A {effectiveQuadraName} atingiu o nível máximo (Palácio do Samba & Templo do Carnaval)! A infraestrutura social está no mais alto patamar do Carnaval brasileiro.
            </span>
          </div>
        )}
      </div>

      {/* ========================================== */}
      {/* SEÇÃO DE EVENTOS NA QUADRA                 */}
      {/* ========================================== */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span>Eventos Comunitários na Quadra da Escola</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Realize eventos festivos e culturais na quadra para engajar a comunidade e abastecer a tesouraria.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Evento 1: Grande Feijoada da Quadra */}
          <div
            className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition ${
              isFeijoadaDoneThisMonth
                ? 'bg-slate-950/40 border-slate-800/80 opacity-90'
                : 'bg-slate-950/70 border-amber-500/30 ring-1 ring-amber-500/20 shadow-lg'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-white font-black text-sm">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <span>Grande Feijoada</span>
                    <span className="block text-[10px] text-slate-400 font-normal">
                      Tradição mensal da bateria
                    </span>
                  </div>
                </div>

                {isFeijoadaDoneThisMonth ? (
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    Realizada ({MONTH_NAMES[currentSeasonMonth]?.slice(0, 3)})
                  </span>
                ) : (
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Disponível
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Almoço tradicional com samba de raiz na quadra. Atrai torcedores, baianas, passistas e comunidade.
              </p>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Moral da Escola:</span>
                  <span className="text-amber-400 font-bold">{morale}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Bônus da Quadra:</span>
                  <span className="text-emerald-400 font-bold">{currentQuadraConfig.bonusLabel}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              <button
                onClick={handleOrganizeFeijoada}
                disabled={isFeijoadaDoneThisMonth}
                className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow ${
                  isFeijoadaDoneThisMonth
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-amber-500/20'
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>
                  {isFeijoadaDoneThisMonth ? 'Feijoada Já Realizada no Mês' : 'Realizar Feijoada da Quadra'}
                </span>
              </button>
            </div>
          </div>

          {/* Evento 2: Noite de Samba & Botequim da Velha Guarda */}
          <div
            className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition ${
              isNoiteSambaDoneThisMonth
                ? 'bg-slate-950/40 border-slate-800/80 opacity-90'
                : 'bg-slate-950/70 border-indigo-500/30 ring-1 ring-indigo-500/20 shadow-lg'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-white font-black text-sm">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    <Music className="w-4 h-4" />
                  </div>
                  <div>
                    <span>Noite de Samba</span>
                    <span className="block text-[10px] text-slate-400 font-normal">
                      Botequim da Velha Guarda
                    </span>
                  </div>
                </div>

                {isNoiteSambaDoneThisMonth ? (
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    Realizada ({MONTH_NAMES[currentSeasonMonth]?.slice(0, 3)})
                  </span>
                ) : (
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Disponível
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Roda de samba acústica com os compositores da escola, petiscos e homenagem aos baluartes do pavilhão.
              </p>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Expectativa de Lucro:</span>
                  <span className="text-emerald-400 font-bold">R$ {minNoiteProfit.toLocaleString('pt-BR')} - {maxNoiteProfit.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Impacto na Comunidade:</span>
                  <span className="text-amber-400 font-bold">+2% Moral</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              <button
                onClick={handleOrganizeNoiteSamba}
                disabled={isNoiteSambaDoneThisMonth}
                className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow ${
                  isNoiteSambaDoneThisMonth
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white font-black shadow-indigo-600/20'
                }`}
              >
                <Music className="w-3.5 h-3.5" />
                <span>
                  {isNoiteSambaDoneThisMonth ? 'Noite de Samba Já Realizada' : 'Abrir Noite de Samba'}
                </span>
              </button>
            </div>
          </div>

          {/* Evento 3: Ensaio Show com Bateria & Segmentos */}
          <div
            className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition ${
              isEnsaioShowDoneThisMonth
                ? 'bg-slate-950/40 border-slate-800/80 opacity-90'
                : 'bg-slate-950/70 border-purple-500/30 ring-1 ring-purple-500/20 shadow-lg'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-white font-black text-sm">
                  <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <span>Ensaio Show</span>
                    <span className="block text-[10px] text-slate-400 font-normal">
                      Apresentação dos Segmentos
                    </span>
                  </div>
                </div>

                {isEnsaioShowDoneThisMonth ? (
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    Realizado ({MONTH_NAMES[currentSeasonMonth]?.slice(0, 3)})
                  </span>
                ) : (
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Disponível
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Grande festa com apresentação do 1º Casal, passistas, comissão e show completo da bateria ritmada.
              </p>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Expectativa de Lucro:</span>
                  <span className="text-emerald-400 font-bold">R$ {minEnsaioShowProfit.toLocaleString('pt-BR')} - {maxEnsaioShowProfit.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Evolução Técnica:</span>
                  <span className="text-amber-400 font-bold">+2% Ensaio / +3% Moral</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              <button
                onClick={handleOrganizeEnsaioShow}
                disabled={isEnsaioShowDoneThisMonth}
                className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow ${
                  isEnsaioShowDoneThisMonth
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-purple-600 hover:bg-purple-500 text-white font-black shadow-purple-600/20'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>
                  {isEnsaioShowDoneThisMonth ? 'Ensaio Show Já Realizado' : 'Comandar Ensaio Show'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* SEÇÃO DE PATROCÍNIOS & APOIO INSTITUCIONAL */}
      {/* ========================================== */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <span>Captação de Patrocínios & Parcerias Oficiais</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {isMasterEligible
              ? 'Negociação de cotas master e institucionais com investidores corporativos de grande porte.'
              : 'Captação junto ao comércio regional, empresariado local e incentivos culturais do território da escola.'}
          </p>
        </div>

        {/* Card para Divisões de Base (Bronze e Avaliação) */}
        {isCommunitySponsorEligible && (
          <div
            className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition ${
              isCommunityClaimedThisSeason
                ? 'bg-slate-950/60 border-slate-800'
                : 'bg-slate-950/70 border-emerald-500/30 ring-1 ring-emerald-500/20 shadow-lg'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-white font-black text-base">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <span>{sponsorTerritoryTitle}</span>
                    <span className="block text-[10px] text-slate-400 font-normal">
                      Cota de Apoio Comercial Regional • Série {school.division === 'bronze' ? 'Bronze' : 'Avaliação'}
                    </span>
                  </div>
                </div>

                {isCommunityClaimedThisSeason ? (
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Contrato {currentYear} Vigente</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 shrink-0">
                    <Sparkles className="w-3 h-3" />
                    <span>Cota Aberta</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Nas divisões de base, a agremiação capta apoio financeiro com o comércio do seu bairro ou cidade de origem (redes de varejo, supermercados locais, associações de lojistas e apoio cultural municipal).
                <br />
                <span className="text-slate-400 text-[11px]">
                  Regulamento: <strong>Limite rigoroso de 1 contrato comercial por temporada</strong>.
                </span>
              </p>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] space-y-1.5 text-slate-400">
                <div className="font-bold text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Origem da Escola: {school.neighborhood} {school.cityState ? `• ${school.cityState}` : ''}</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-400">
                    Teto da Divisão: R$ {communityCap.toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                  Proposta Fechada para a Temporada {currentYear}:
                </span>
                <span className="text-sm font-black text-emerald-400 font-mono">
                  R$ {communityAmount.toLocaleString('pt-BR')}
                </span>
              </div>

              <button
                onClick={handleSignCommunitySponsor}
                disabled={isCommunityClaimedThisSeason}
                className={`px-5 py-3 rounded-xl font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                  isCommunityClaimedThisSeason
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                }`}
              >
                {isCommunityClaimedThisSeason ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cota {currentYear} Já Assinada (1x/temporada)</span>
                  </>
                ) : (
                  <>
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Firmar Patrocínio Regional (R$ {communityAmount.toLocaleString('pt-BR')})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Card para Divisões de Topo (Especial, Ouro, Prata) */}
        {isMasterEligible && (
          <div
            className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition ${
              isMasterClaimedThisSeason
                ? 'bg-slate-950/60 border-slate-800'
                : 'bg-slate-950/70 border-emerald-500/30 ring-1 ring-emerald-500/20 shadow-lg'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-white font-black text-base">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <span>Patrocínio Master & Apoio Cultural Corporativo</span>
                    <span className="block text-[10px] text-slate-400 font-normal">
                      Cota Institucional de Grande Porte ({school.division.toUpperCase()})
                    </span>
                  </div>
                </div>

                {isMasterClaimedThisSeason ? (
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Contrato {currentYear} Vigente</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 shrink-0">
                    <Sparkles className="w-3 h-3" />
                    <span>Cota Aberta</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Comercialize a cota master oficial com investidores e marcas privadas para estampar nos camarotes, barracão e alas comerciais.
                <br />
                <span className="text-slate-400 text-[11px]">
                  Regulamento: <strong>Limite rigoroso de 1 contrato por temporada</strong>.
                </span>
              </p>

              {/* Tetos Oficiais por Divisão */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] space-y-1.5 text-slate-400">
                <div className="font-bold text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Teto Regulamentar da Categoria ({school.division.toUpperCase()}):</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-400">
                    Até R$ {masterCap.toLocaleString('pt-BR')}
                  </span>
                </div>

                <button
                  onClick={() => setShowCriteriaDetail(!showCriteriaDetail)}
                  className="text-[10px] text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1 cursor-pointer pt-1"
                >
                  <span>{showCriteriaDetail ? 'Ocultar' : 'Ver'} Critérios de Avaliação Comercial</span>
                  {showCriteriaDetail ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                {showCriteriaDetail && (
                  <div className="pt-2 border-t border-slate-800 space-y-1 font-mono text-[10px] text-slate-300">
                    <div className="flex justify-between">
                      <span>• Posição no Ranking Histórico & Tradição:</span>
                      <span className="text-amber-400 font-bold">{Math.round(historicalPedigreeScore * 100)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Nível Técnico da Equipe ({Math.round(avgStaffRating)} pts):</span>
                      <span className="text-amber-400 font-bold">{Math.round(staffPedigreeScore * 100)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Classificação no Carnaval Anterior ({prevRank}º lugar):</span>
                      <span className="text-amber-400 font-bold">{Math.round(prevRankScore * 100)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Status da Temporada ({isPromoted ? 'Promovida' : isRelegated ? 'Rebaixada' : 'Manutenção'}):</span>
                      <span className="text-amber-400 font-bold">{Math.round(promoRelegScore * 100)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Horário e Ordem de Desfile no Sorteio:</span>
                      <span className="text-amber-400 font-bold">{Math.round(paradeTimeScore * 100)}%</span>
                    </div>
                    <div className="pt-1 border-t border-slate-800/80 flex justify-between font-bold text-emerald-400">
                      <span>= Índice de Avaliação de Mercado:</span>
                      <span>{Math.round(finalMultiplier * 100)}% do teto</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                  Proposta Comercial da Temporada {currentYear}:
                </span>
                <span className="text-sm font-black text-emerald-400 font-mono">
                  R$ {calculatedMasterAmount.toLocaleString('pt-BR')}
                </span>
              </div>

              <button
                onClick={handleSignMasterSponsor}
                disabled={isMasterClaimedThisSeason}
                className={`px-5 py-3 rounded-xl font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                  isMasterClaimedThisSeason
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                }`}
              >
                {isMasterClaimedThisSeason ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cota Já Assinada em {currentYear} (1x/temporada)</span>
                  </>
                ) : (
                  <>
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Firmar Contrato Master (R$ {calculatedMasterAmount.toLocaleString('pt-BR')})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Interativo de Logística & Geolocalização */}
      {isLogisticsModalOpen && (
        <ParadeLogisticsModal
          school={school}
          slot={userSlot}
          onClose={() => setIsLogisticsModalOpen(false)}
        />
      )}
    </div>
  );
};
