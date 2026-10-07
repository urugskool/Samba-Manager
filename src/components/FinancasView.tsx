import React, { useState } from 'react';
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
  Compass
} from 'lucide-react';
import { soundService } from '../services/soundService';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import { LogisticsService } from '../services/logisticsService';

interface FinancasViewProps {
  school: School;
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
  currentYear = 2027,
  currentSeasonMonth = 'marco',
  history = [],
  sorteio,
  onUpdateSchool,
  onShowMessage
}) => {
  const [showCriteriaDetail, setShowCriteriaDetail] = useState<boolean>(false);

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

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Cota da LIGA & Transmissão de TV</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-white font-mono">
            {school.division === 'especial'
              ? 'R$ 1.400.000 / ano'
              : school.division === 'ouro'
              ? 'R$ 750.000 / ano'
              : school.division === 'prata'
              ? 'R$ 450.000 / ano'
              : school.division === 'bronze'
              ? 'R$ 280.000 / ano'
              : 'R$ 160.000 / ano'}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            Receita garantida aos filiados da entidade carnavalesca.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Despesas com Folha da Equipe</span>
            <DollarSign className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-lg font-bold text-rose-400 font-mono">
            R$ {staffTotal.toLocaleString('pt-BR')} / ano
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            Carnavalesco, Mestre de Bateria, Intérprete, 1º Casal e Diretores.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Subvenção Pública do Município</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-lg font-bold text-amber-400 font-mono">
            {school.division === 'especial'
              ? 'R$ 2.000.000'
              : school.division === 'ouro'
              ? 'R$ 1.000.000'
              : school.division === 'prata'
              ? 'R$ 400.000'
              : school.division === 'bronze'
              ? 'R$ 200.000'
              : 'R$ 120.000'}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            Incentivo ao Patrimônio Cultural e Popular.
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SEÇÃO DE LOGÍSTICA & DESPESAS DE DESLOCAMENTO / DESFILE */}
      {/* ======================================================== */}
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

              <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-right">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Custo Total de Logística</div>
                <div className="text-xl font-black text-amber-400 font-mono">
                  R$ {logistics.totalLogisticsCost.toLocaleString('pt-BR')}
                </div>
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
    </div>
  );
};
