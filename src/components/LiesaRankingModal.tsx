import React, { useState, useMemo, useEffect } from 'react';
import { School, YearHistory } from '../types/carnaval';
import {
  computeLiesa5YearRanking,
  computeHistoricalLiesaRanking,
  computeEspecialParticipationsList,
  getHistoricalCarnavalsList,
  LIESA_POINTS_BY_RANK,
  LiesaRankingEntry,
  HistoricalLiesaEntry,
  HistoricalCarnavalInfo,
  EspecialParticipationRecord
} from '../services/liesaRankingService';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import {
  Trophy,
  Award,
  Crown,
  Medal,
  Calendar,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  Search,
  History,
  TrendingUp,
  HelpCircle,
  ExternalLink,
  AlertTriangle,
  Flame,
  CheckCircle2,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import {
  getHistoricalEnredo,
  getSchoolHistoricalEnredosList
} from '../data/historicalEnredosData';

interface LiesaRankingModalProps {
  isOpen: boolean;
  onClose: () => void;
  schools: School[];
  inGameHistory?: YearHistory[];
  currentYear: number;
  userSchool?: School | null;
  onSelectSchool?: (schoolId: string) => void;
}

export const LiesaRankingModal: React.FC<LiesaRankingModalProps> = ({
  isOpen,
  onClose,
  schools,
  inGameHistory = [],
  currentYear,
  userSchool,
  onSelectSchool
}) => {
  const [rankingMode, setRankingMode] = useState<'quinquennio' | 'historico' | 'participacoes' | 'carnavais_passados'>('quinquennio');
  const [selectedPastYear, setSelectedPastYear] = useState<number>(2026);
  const [subgroup1984Tab, setSubgroup1984Tab] = useState<'supercampeonato' | 'domingo' | 'segunda' | 'geral'>('supercampeonato');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSchoolId, setExpandedSchoolId] = useState<string | null>(null);
  const [expandedHistSchoolId, setExpandedHistSchoolId] = useState<string | null>(null);
  const [expandedPartSchoolId, setExpandedPartSchoolId] = useState<string | null>(null);
  const [sortHistoricoBy, setSortHistoricoBy] = useState<'pontos' | 'participacoes'>('pontos');
  const [showRegulamento, setShowRegulamento] = useState(false);

  // Calcula ranking dos últimos 5 carnavais
  const liesa5YearData = useMemo(() => {
    return computeLiesa5YearRanking(schools, inGameHistory, currentYear);
  }, [schools, inGameHistory, currentYear]);

  // Calcula ranking histórico geral
  const historicalLiesaData = useMemo(() => {
    return computeHistoricalLiesaRanking(schools, inGameHistory);
  }, [schools, inGameHistory]);

  // Calcula lista de participações das escolas no Grupo Especial em ordem decrescente
  const participationsList = useMemo(() => {
    return computeEspecialParticipationsList(schools, inGameHistory);
  }, [schools, inGameHistory]);

  // Lista dos carnavais catalogados (2015 em diante + save)
  const historicalCarnavals = useMemo(() => {
    return getHistoricalCarnavalsList(inGameHistory);
  }, [inGameHistory]);

  const currentPastCarnaval = useMemo(() => {
    return historicalCarnavals.find((c) => c.year === selectedPastYear) || historicalCarnavals[0];
  }, [historicalCarnavals, selectedPastYear]);

  // Sempre iniciar quando aberto pelo jogador pelo Carnaval mais recente (2026 ou ano mais atual catalogado)
  useEffect(() => {
    if (isOpen && historicalCarnavals.length > 0) {
      setSelectedPastYear(historicalCarnavals[0].year);
    }
  }, [isOpen, historicalCarnavals]);

  const filtered5YearEntries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return liesa5YearData.entries;
    return liesa5YearData.entries.filter(
      (e) =>
        e.schoolName.toLowerCase().includes(q) ||
        (e.school?.shortName && e.school.shortName.toLowerCase().includes(q))
    );
  }, [liesa5YearData.entries, searchQuery]);

  const filteredHistoricalEntries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    let base = historicalLiesaData;
    if (q) {
      base = base.filter(
        (e) =>
          e.schoolName.toLowerCase().includes(q) ||
          (e.school?.shortName && e.school.shortName.toLowerCase().includes(q))
      );
    }
    if (sortHistoricoBy === 'participacoes') {
      return [...base].sort((a, b) => {
        if (b.totalParticipations !== a.totalParticipations) {
          return b.totalParticipations - a.totalParticipations;
        }
        return b.totalPoints - a.totalPoints;
      });
    }
    return base;
  }, [historicalLiesaData, searchQuery, sortHistoricoBy]);

  const filteredParticipations = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return participationsList;
    return participationsList.filter(
      (item) =>
        item.schoolName.toLowerCase().includes(q) ||
        (item.school?.shortName && item.school.shortName.toLowerCase().includes(q)) ||
        (item.school?.calledName && item.school.calledName.toLowerCase().includes(q))
    );
  }, [participationsList, searchQuery]);

  const filteredPastCarnavalStandings = useMemo(() => {
    if (!currentPastCarnaval) return [];
    let baseList = currentPastCarnaval.standings || [];
    if (currentPastCarnaval.year === 1984 && currentPastCarnaval.subgroups) {
      if (subgroup1984Tab === 'domingo' && currentPastCarnaval.subgroups.domingo) {
        baseList = currentPastCarnaval.subgroups.domingo;
      } else if (subgroup1984Tab === 'segunda' && currentPastCarnaval.subgroups.segunda) {
        baseList = currentPastCarnaval.subgroups.segunda;
      } else if (subgroup1984Tab === 'supercampeonato' && currentPastCarnaval.subgroups.supercampeonato) {
        baseList = currentPastCarnaval.subgroups.supercampeonato;
      }
    }
    const q = searchQuery.toLowerCase().trim();
    if (!q) return baseList;
    return baseList.filter((st) =>
      st.schoolName.toLowerCase().includes(q)
    );
  }, [currentPastCarnaval, searchQuery, subgroup1984Tab]);

  const isNoRelegationYear = currentPastCarnaval
    ? [1971, 1974, 1975, 1979, 1981, 1983, 1988, 1993, 1994, 2011, 2017, 2018].includes(currentPastCarnaval.year)
    : false;

  const pastCarnavalRelegations = useMemo(() => {
    if (!currentPastCarnaval || currentPastCarnaval.isNoCarnaval || isNoRelegationYear) return [];

    // Busca agremiações marcadas com rebaixamento nas colocações catalogadas
    const relegated = currentPastCarnaval.standings.filter((s) =>
      s.statusDescription?.toLowerCase().includes('rebaixada')
    );
    if (relegated.length > 0) {
      return Array.from(new Set(relegated.map((s) => s.schoolName)));
    }

    // Histórico oficial por ano caso não venha no statusDescription
    const yr = currentPastCarnaval.year;
    if (yr === 1970) return ['Unidos do Jacarezinho', 'Acadêmicos de Santa Cruz'];
    if (yr === 1972) return ['Unidos de São Carlos (Estácio de Sá)', 'Império da Tijuca', 'Unidos de Lucas', 'Unidos de Padre Miguel'];
    if (yr === 1973) return ['Tupy de Brás de Pina', 'Unidos do Jacarezinho'];
    if (yr === 1976) return ['Lins Imperial', 'Unidos de Lucas', 'Em Cima da Hora', 'Tupy de Brás de Pina'];
    if (yr === 1977) return ['Imperatriz Leopoldinense', 'Unidos de São Carlos (Estácio de Sá)', 'Império da Tijuca', 'Unidos do Cabuçu'];
    if (yr === 1978) return ['Império Serrano', 'Unidos de Vila Isabel', 'Arrastão de Cascadura', 'Arranco'];
    if (yr === 1985) return ['Acadêmicos de Santa Cruz', 'São Clemente', 'Em Cima da Hora'];
    if (yr === 1986) return ['Unidos da Tijuca'];
    if (yr === 1987) return ['Unidos do Jacarezinho', 'Império da Tijuca'];
    if (yr === 1989) return ['Unidos da Ponte', 'Tradição', 'Arranco', 'Unidos do Jacarezinho'];
    if (yr === 1990) return ['Acadêmicos de Santa Cruz', 'Unidos do Cabuçu'];
    if (yr === 1991) return ['São Clemente', 'Lins Imperial', 'Império Serrano', 'Acadêmicos do Grande Rio'];
    if (yr === 1992) return ['Leão de Nova Iguaçu', 'Tradição', 'Acadêmicos de Santa Cruz'];
    if (yr === 1995) return ['São Clemente', 'Unidos da Villa Rica'];
    if (yr === 1996) return ['Caprichosos de Pilares', 'Tradição', 'Império da Tijuca', 'Unidos da Ponte'];
    if (yr === 1997) return ['Estácio de Sá', 'Acadêmicos de Santa Cruz', 'Império Serrano', 'Acadêmicos da Rocinha'];
    if (yr === 1998) return ['Unidos da Tijuca', 'Unidos do Porto da Pedra'];
    if (yr === 1999) return ['Império Serrano', 'São Clemente'];
    if (yr === 2000) return ['Unidos de Vila Isabel', 'Porto da Pedra'];
    if (yr === 2001) return ['União da Ilha do Governador', 'Paraíso do Tuiuti'];
    if (yr === 2002) return ['São Clemente'];
    if (yr === 2003) return ['Acadêmicos de Santa Cruz'];
    if (yr === 2004) return ['São Clemente'];
    if (yr === 2005) return ['Tradição'];
    if (yr === 2006) return ['Caprichosos de Pilares', 'Acadêmicos da Rocinha'];
    if (yr === 2007) return ['Império Serrano', 'Estácio de Sá'];
    if (yr === 2008) return ['São Clemente'];
    if (yr === 2009) return ['Império Serrano'];
    if (yr === 2010) return ['Unidos do Viradouro'];
    if (yr === 2012) return ['Porto da Pedra', 'Renascer de Jacarepaguá'];
    if (yr === 2013) return ['Inocentes de Belford Roxo'];
    if (yr === 2014) return ['Império da Tijuca'];
    if (yr === 2019) return ['Imperatriz Leopoldinense', 'Império Serrano'];
    if (yr === 2020) return ['Estácio de Sá', 'União da Ilha do Governador'];
    if (yr === 2022) return ['São Clemente'];
    if (yr === 2023) return ['Império Serrano'];
    if (yr === 2024) return ['Porto da Pedra'];
    if (yr === 2025) return ['Unidos de Padre Miguel'];
    if (yr === 2026) return ['Paraíso do Tuiuti'];

    return [];
  }, [currentPastCarnaval, isNoRelegationYear]);

  if (!isOpen) return null;

  const toggleExpand = (schoolId: string) => {
    setExpandedSchoolId((prev) => (prev === schoolId ? null : schoolId));
  };

  const toggleHistExpand = (schoolId: string) => {
    setExpandedHistSchoolId((prev) => (prev === schoolId ? null : schoolId));
  };

  const togglePartExpand = (schoolId: string) => {
    setExpandedPartSchoolId((prev) => (prev === schoolId ? null : schoolId));
  };

  const getPositionBadge = (pos: number) => {
    if (pos === 1) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/50 font-black text-xs shadow-sm">
          <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          1º LÍDER
        </span>
      );
    }
    if (pos === 2) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-300/20 text-slate-200 border border-slate-300/40 font-bold text-xs">
          <Medal className="w-3 h-3 text-slate-300" />
          2º
        </span>
      );
    }
    if (pos === 3) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-700/20 text-amber-400 border border-amber-600/40 font-bold text-xs">
          <Medal className="w-3 h-3 text-amber-500" />
          3º
        </span>
      );
    }
    if (pos <= 6) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold text-xs">
          {pos}º (G6)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-slate-800 text-slate-400 font-mono text-xs">
        {pos}º
      </span>
    );
  };

  const getPastRankBadge = (rank: number, total: number, isHorsConcours?: boolean, year?: number, statusDescription?: string) => {
    if (isHorsConcours || rank === 0) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold text-xs shadow-sm">
          Hors concours
        </span>
      );
    }
    if (statusDescription && statusDescription.toLowerCase().includes('rebaixada')) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs font-bold">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (rank === 1) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/50 font-black text-xs shadow-sm">
          <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          1º CAMPEÃ
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-300/20 text-slate-200 border border-slate-300/40 font-bold text-xs">
          <Medal className="w-3 h-3 text-slate-300" />
          2º VICE
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-700/20 text-amber-400 border border-amber-600/40 font-bold text-xs">
          <Medal className="w-3 h-3 text-amber-500" />
          3º LUGAR
        </span>
      );
    }
    if (rank <= 6) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold text-xs">
          {rank}º (G6)
        </span>
      );
    }
    if (rank <= 10) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-blue-500/15 text-blue-300 border border-blue-500/30 font-mono text-xs">
          {rank}º (Top 10)
        </span>
      );
    }
    if (year === 1984 && rank >= 15) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs font-bold">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 1982 && (rank === 11 || rank === 12)) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs font-bold">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 1980 && rank === 6) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs font-bold">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 1978 && rank >= 7) {
      // Em 1978 quatro escolas foram rebaixadas (Império Serrano 7º, Vila Isabel 8º, Arrastão de Cascadura 9º e Arranco 10º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs font-bold">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 1977 && rank >= 9) {
      // Em 1977 quatro escolas foram rebaixadas (Imperatriz 9º, Estácio de Sá 10º, Império da Tijuca 11º e Unidos do Cabuçu 12º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs font-bold">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 1976 && rank >= 11) {
      // Em 1976 quatro escolas foram rebaixadas (Lins Imperial 11º, Unidos de Lucas 12º, Em Cima da Hora 13º e Tupy de Brás de Pina 14º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs font-bold">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 1973 && rank >= 9) {
      // Em 1973 duas escolas foram rebaixadas (Tupy de Brás de Pina 9º e Unidos do Jacarezinho 10º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs font-bold">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 1972 && rank >= 9) {
      // Em 1972 quatro escolas foram rebaixadas (Unidos de São Carlos 9º, Império da Tijuca 10º, Unidos de Lucas 11º e Unidos de Padre Miguel 12º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs font-bold">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 1970 && rank >= 9) {
      // Em 1970 duas escolas foram rebaixadas (Unidos do Jacarezinho 9º e Acadêmicos de Santa Cruz 10º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs font-bold">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 1971 || year === 1974 || year === 1975 || year === 1979 || year === 1981 || year === 1983 || year === 1988 || year === 1993 || year === 1994 || year === 2011 || year === 2017 || year === 2018) {
      // Não houve rebaixamento no Grupo Especial por deliberação oficial
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-slate-800 text-slate-400 font-mono text-xs">
          {rank}º
        </span>
      );
    }
    if (year === 1985 && rank >= 14 && rank <= 16) {
      // Em 1985 três escolas foram rebaixadas (Santa Cruz 14º, São Clemente 15º e Em Cima da Hora 16º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 1986 && rank === 15) {
      // Em 1986 uma escola foi rebaixada (Unidos da Tijuca 15º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 1987 && (rank === 11 || rank === 12)) {
      // Em 1987 duas escolas foram rebaixadas (Jacarezinho 11º e Império da Tijuca 12º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 1989 && rank >= 15 && rank <= 18) {
      // Em 1989 quatro escolas foram rebaixadas (Ponte 15º, Tradição 16º, Arranco 17º e Jacarezinho 18º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 1990 && (rank === 15 || rank === 16)) {
      // Em 1990 duas escolas foram rebaixadas (Santa Cruz 15º e Unidos do Cabuçu 16º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 1991 && rank >= 13 && rank <= 16) {
      // Em 1991 quatro escolas foram rebaixadas (São Clemente 13º, Lins Imperial 14º, Império Serrano 15º e Grande Rio 16º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 1992 && rank >= 13 && rank <= 15) {
      // Em 1992 três escolas foram rebaixadas (Leão de Nova Iguaçu 13º, Tradição 14º e Santa Cruz 15º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 1995 && (rank === 17 || rank === 18)) {
      // Em 1995 duas escolas foram rebaixadas (São Clemente 17º e Villa Rica 18º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 1996 && rank >= 15 && rank <= 18) {
      // Em 1996 quatro escolas foram rebaixadas (Caprichosos 15º, Tradição 16º, Império da Tijuca 17º e Unidos da Ponte 18º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 1997 && rank >= 13 && rank <= 16) {
      // Em 1997 quatro escolas foram rebaixadas (Estácio 13º, Santa Cruz 14º, Império Serrano 15º e Rocinha 16º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 1998 && (rank === 13 || rank === 14)) {
      // Em 1998 duas escolas foram rebaixadas (Unidos da Tijuca 13º e Porto da Pedra 14º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 1999 && (rank === 13 || rank === 14)) {
      // Em 1999 duas escolas foram rebaixadas (Império Serrano 13º e São Clemente 14º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 2000 && (rank === 13 || rank === 14)) {
      // Em 2000 duas escolas foram rebaixadas (Vila Isabel 13º e Porto da Pedra 14º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 2001 && (rank === 13 || rank === 14)) {
      // Em 2001 duas escolas foram rebaixadas (União da Ilha 13º e Paraíso do Tuiuti 14º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 2006 && (rank === 13 || rank === 14)) {
      // Em 2006 duas escolas foram rebaixadas (Caprichosos de Pilares 13º e Rocinha 14º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 2007 && (rank === 12 || rank === 13)) {
      // Em 2007 duas escolas foram rebaixadas (Império Serrano 12º e Estácio de Sá 13º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 2012 && (rank === 12 || rank === 13)) {
      // Em 2012 duas escolas foram rebaixadas (Porto da Pedra 12º e Renascer 13º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 2019 && (rank === 13 || rank === 14)) {
      // Em 2019 duas escolas foram rebaixadas (Imperatriz 13º e Império Serrano 14º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (year === 2020 && (rank === 12 || rank === 13)) {
      // Em 2020 duas escolas foram rebaixadas (Estácio 12º e União da Ilha 13º)
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs">
          {rank}º (Rebaixada)
        </span>
      );
    }
    if (rank === total) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-xs">
          {rank}º (Rebaixada)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-slate-800 text-slate-400 font-mono text-xs">
        {rank}º
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center text-amber-400 shrink-0 shadow-lg shadow-amber-500/10">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  LIESA OFICIAL
                </span>
                <span className="text-xs text-slate-400">
                  Liga Independente das Escolas de Samba do Rio de Janeiro
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5 flex items-center gap-2">
                Ranking Oficial da LIESA
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => setShowRegulamento(!showRegulamento)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
              title="Regulamento Oficial da LIESA"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Regulamento</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Regulamento Accordion Dropdown */}
        {showRegulamento && (
          <div className="p-4 bg-slate-950/90 border-b border-amber-500/30 text-xs text-slate-300 space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <Info className="w-4 h-4 text-amber-400" />
              <span>Critérios Oficiais do Ranking LIESA (Extraído do Regulamento da Liga):</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Com o objetivo de oferecer ao público e à mídia um desfile competitivo e alto nível artístico, a <strong>LIESA</strong> mantém um ranking para estimular as Escolas de Samba a apresentarem um trabalho cada vez melhor. As dez primeiras colocadas do desfile recebem pontuação e o somatório abrange os <strong>cinco últimos carnavais</strong>.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 font-mono text-[11px]">
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-amber-400 font-bold block">1º lugar</span> 20 pontos
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-slate-300 font-bold block">2º lugar</span> 15 pontos
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-amber-600 font-bold block">3º lugar</span> 12 pontos
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-blue-400 font-bold block">4º lugar</span> 10 pontos
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-emerald-400 font-bold block">5º lugar</span> 8 pontos
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-purple-400 font-bold block">6º lugar</span> 6 pontos
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-pink-400 font-bold block">7º lugar</span> 4 pontos
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-yellow-400 font-bold block">8º lugar</span> 3 pontos
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-teal-400 font-bold block">9º lugar</span> 2 pontos
              </div>
              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-slate-400 font-bold block">10º lugar</span> 1 ponto
              </div>
            </div>
            <p className="text-[11px] text-slate-400 italic">
              * Escolas que ficam em 11º lugar em diante recebem 0 pontos. Anos sem desfiles oficiais (como 2021) contam com zero pontos. O ranking atualiza-se automaticamente a cada nova apuração finalizada no save.
            </p>
          </div>
        )}

        {/* Sub-Header: Mode Switcher & Search */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-2xl border border-slate-800 self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setRankingMode('quinquennio')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                rankingMode === 'quinquennio'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Últimos 5 Carnavais ({liesa5YearData.yearsWindow[0]} - {liesa5YearData.yearsWindow[liesa5YearData.yearsWindow.length - 1]})</span>
            </button>
            <button
              onClick={() => setRankingMode('historico')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                rankingMode === 'historico'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Ranking Histórico Geral (1970-{currentYear || 2026})</span>
            </button>
            <button
              onClick={() => setRankingMode('participacoes')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                rankingMode === 'participacoes'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Participações no Especial</span>
            </button>
            <button
              onClick={() => {
                setRankingMode('carnavais_passados');
                if (historicalCarnavals.length > 0) {
                  setSelectedPastYear(historicalCarnavals[0].year);
                }
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                rankingMode === 'carnavais_passados'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Carnavais Passados (1970-{currentYear || 2026})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar agremiação..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          {rankingMode === 'quinquennio' ? (
            /* TABELA DOS ÚLTIMOS 5 ANOS */
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>
                  Mostrando classificação acumulada da janela móvel ({liesa5YearData.yearsWindow.join(' · ')}):
                </span>
                <span className="font-bold text-amber-400">
                  {filtered5YearEntries.length} agremiações pontuadas
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60 shadow-xl">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] bg-slate-900/90">
                      <th className="py-3 px-3.5 w-16">Pos</th>
                      <th className="py-3 px-3.5">Escola de Samba</th>
                      {liesa5YearData.yearsWindow.map((yr) => (
                        <th key={yr} className="py-3 px-2.5 text-center font-mono">
                          {yr}
                        </th>
                      ))}
                      <th className="py-3 px-3 text-center text-amber-300 font-bold">Títulos</th>
                      <th className="py-3 px-3 text-center text-slate-300 font-bold">Vices</th>
                      <th className="py-3 px-4 text-right font-black text-amber-400 text-xs">
                        TOTAL PONTOS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filtered5YearEntries.map((entry) => {
                      const isUser = userSchool && (userSchool.id === entry.schoolId || userSchool.name === entry.schoolName);
                      const isExpanded = expandedSchoolId === entry.schoolId;
                      const sch = entry.school;

                      return (
                        <React.Fragment key={entry.schoolId}>
                          <tr
                            onClick={() => toggleExpand(entry.schoolId)}
                            className={`cursor-pointer transition hover:bg-slate-800/50 ${
                              isUser ? 'bg-emerald-500/10 font-bold' : ''
                            } ${entry.position === 1 ? 'bg-amber-500/10' : ''}`}
                          >
                            <td className="py-3 px-3.5 font-mono">
                              {getPositionBadge(entry.position)}
                            </td>
                            <td className="py-3 px-3.5 text-white">
                              <div className="flex items-center gap-2.5">
                                {sch && (
                                  <div
                                    className="w-4 h-4 rounded-full border shrink-0 shadow-sm"
                                    style={{
                                      backgroundColor: sch.colors.primary,
                                      borderColor: sch.colors.border || '#fff'
                                    }}
                                  />
                                )}
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-black text-xs sm:text-sm truncate">
                                      {entry.schoolName}
                                    </span>
                                    {isUser && (
                                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase font-black">
                                        Sua
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-slate-400 block truncate">
                                    {sch?.nickname || 'Agremiação do Carnaval Carioca'}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Detalhes por ano na janela */}
                            {liesa5YearData.yearsWindow.map((yr) => {
                              const perf = entry.performancesByYear[yr];
                              if (!perf || !perf.participated) {
                                return (
                                  <td key={yr} className="py-3 px-2.5 text-center text-slate-600 font-mono text-[11px]">
                                    —
                                  </td>
                                );
                              }

                              const isChampion = perf.rank === 1;
                              const isVice = perf.rank === 2;
                              const isG6 = perf.rank && perf.rank <= 6;

                              return (
                                <td key={yr} className="py-3 px-2.5 text-center">
                                  <div className="inline-flex flex-col items-center">
                                    <span
                                      className={`text-[11px] font-bold font-mono px-1.5 py-0.5 rounded ${
                                        isChampion
                                          ? 'bg-amber-400 text-slate-950 font-black ring-1 ring-amber-300'
                                          : isVice
                                          ? 'bg-slate-300 text-slate-950 font-black'
                                          : isG6
                                          ? 'bg-emerald-500/20 text-emerald-300'
                                          : perf.points > 0
                                          ? 'bg-slate-800 text-slate-300'
                                          : 'text-slate-500'
                                      }`}
                                    >
                                      {perf.rank ? `${perf.rank}º` : '—'}
                                    </span>
                                    <span className="text-[9px] text-slate-400 font-mono">
                                      {perf.points > 0 ? `+${perf.points}p` : '0p'}
                                    </span>
                                  </div>
                                </td>
                              );
                            })}

                            <td className="py-3 px-3 text-center font-mono font-bold text-amber-300">
                              {entry.titlesInWindow > 0 ? entry.titlesInWindow : <span className="text-slate-600 font-normal">0</span>}
                            </td>
                            <td className="py-3 px-3 text-center font-mono font-bold text-slate-300">
                              {entry.vicesInWindow > 0 ? entry.vicesInWindow : <span className="text-slate-600 font-normal">0</span>}
                            </td>
                            <td className="py-3 px-4 text-right font-mono font-black text-amber-400 text-base">
                              {entry.totalPoints} <span className="text-xs text-slate-400 font-sans font-normal">pts</span>
                            </td>
                          </tr>

                          {/* Expanded breakdown row */}
                          {isExpanded && (
                            <tr className="bg-slate-900/90 border-b border-slate-800">
                              <td colSpan={liesa5YearData.yearsWindow.length + 5} className="p-4">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-[11px] font-bold text-amber-300">
                                    <span>
                                      Detalhamento do Desempenho de {entry.schoolName} na Janela de 5 Anos:
                                    </span>
                                    {onSelectSchool && entry.school && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          onSelectSchool(entry.schoolId);
                                          onClose();
                                        }}
                                        className="text-[10px] text-amber-400 hover:text-amber-300 underline flex items-center gap-1 cursor-pointer"
                                      >
                                        <span>Abrir Perfil de Glórias</span>
                                        <ExternalLink className="w-3 h-3" />
                                      </button>
                                    )}
                                  </div>
                                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px]">
                                    {liesa5YearData.yearsWindow.map((yr) => {
                                      const perf = entry.performancesByYear[yr];
                                      return (
                                        <div
                                          key={yr}
                                          className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1"
                                        >
                                          <div className="flex items-center justify-between text-slate-400 text-[10px]">
                                            <span>Carnaval {yr}</span>
                                            <span className="font-mono font-bold text-amber-400">
                                              {perf?.points || 0} pts
                                            </span>
                                          </div>
                                          <div className="font-bold text-white text-xs">
                                            {perf?.rank ? `${perf.rank}º Lugar` : 'Não disputou Especial'}
                                          </div>
                                          <div className="text-[10px] text-slate-500">
                                            {perf?.rank === 1
                                              ? '🏆 Grande Campeã'
                                              : perf?.rank === 2
                                              ? '🥈 Vice-Campeã'
                                              : perf?.rank && perf.rank <= 6
                                              ? '🌟 Desfile das Campeãs (G6)'
                                              : perf?.rank && perf.rank <= 10
                                              ? 'Pontuou no Top 10'
                                              : 'Sem pontos'}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : rankingMode === 'historico' ? (
            /* TABELA DO RANKING HISTÓRICO GERAL */
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200/90 leading-relaxed">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300">Classificação Histórica Oficial da LIESA:</span>{' '}
                  Atribui 20 pontos por título e 15 pontos por vice-campeonato na história do Grupo Especial, somados às colocações completas de 1º a 10º lugar para todos os carnavais catalogados com apuração completa (1970 a 2026). A LIESA foi fundada em 24 de julho de 1984 para administrar o Grupo Especial a partir do Carnaval de 1985; as edições de 1970 a 1984 foram administradas pela AESCRJ. Clique em qualquer agremiação para ver o histórico ano a ano.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-300">Ordenar por:</span>
                  <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                    <button
                      onClick={() => setSortHistoricoBy('pontos')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition cursor-pointer ${
                        sortHistoricoBy === 'pontos'
                          ? 'bg-amber-500 text-slate-950 shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Pontos Históricos
                    </button>
                    <button
                      onClick={() => setSortHistoricoBy('participacoes')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition cursor-pointer ${
                        sortHistoricoBy === 'participacoes'
                          ? 'bg-purple-500 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Nº de Participações (Decrescente)
                    </button>
                  </div>
                </div>
                <span className="font-bold text-amber-400">
                  {filteredHistoricalEntries.length} agremiações registradas
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60 shadow-xl">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] bg-slate-900/90">
                      <th className="py-3 px-3.5 w-16">Pos</th>
                      <th className="py-3 px-3.5">Escola de Samba</th>
                      <th className="py-3 px-3 text-center text-purple-400 font-bold">Participações Especial</th>
                      <th className="py-3 px-3 text-center text-amber-400 font-bold">Títulos Especial (20p)</th>
                      <th className="py-3 px-3 text-center text-slate-300 font-bold">Vices Especial (15p)</th>
                      <th className="py-3 px-3 text-center text-blue-400 font-bold">Era 1970+ (Top 10)</th>
                      <th className="py-3 px-4 text-right font-black text-amber-400 text-xs">
                        TOTAL PONTOS HISTÓRICOS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredHistoricalEntries.map((entry) => {
                      const isUser = userSchool && (userSchool.id === entry.schoolId || userSchool.name === entry.schoolName);
                      const isExpanded = expandedHistSchoolId === entry.schoolId;
                      const sch = entry.school;

                      return (
                        <React.Fragment key={entry.schoolId}>
                          <tr
                            onClick={() => toggleHistExpand(entry.schoolId)}
                            className={`cursor-pointer transition hover:bg-slate-800/50 ${
                              isUser ? 'bg-emerald-500/10 font-bold' : ''
                            } ${entry.position === 1 ? 'bg-amber-500/10' : ''}`}
                          >
                            <td className="py-3 px-3.5 font-mono">
                              {getPositionBadge(entry.position)}
                            </td>
                            <td className="py-3 px-3.5 text-white">
                              <div className="flex items-center gap-2.5">
                                {sch && (
                                  <div
                                    className="w-4 h-4 rounded-full border shrink-0 shadow-sm"
                                    style={{
                                      backgroundColor: sch.colors.primary,
                                      borderColor: sch.colors.border || '#fff'
                                    }}
                                  />
                                )}
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-black text-xs sm:text-sm truncate">
                                      {entry.schoolName}
                                    </span>
                                    {isUser && (
                                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase font-black">
                                        Sua
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-slate-400 block truncate">
                                    {sch?.nickname || 'Agremiação Histórica'}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <span className="font-mono font-bold text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full text-[11px]">
                                {entry.totalParticipations} {entry.totalParticipations === 1 ? 'ano' : 'anos'}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-center font-mono font-bold text-amber-400">
                              {entry.totalEspecialTitles > 0 ? (
                                <span>
                                  {entry.totalEspecialTitles}{' '}
                                  <span className="text-[10px] text-slate-500">
                                    ({entry.totalEspecialTitles * 20}p)
                                  </span>
                                </span>
                              ) : (
                                <span className="text-slate-600 font-normal">0</span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-center font-mono font-bold text-slate-300">
                              {entry.totalEspecialVices > 0 ? (
                                <span>
                                  {entry.totalEspecialVices}{' '}
                                  <span className="text-[10px] text-slate-500">
                                    ({entry.totalEspecialVices * 15}p)
                                  </span>
                                </span>
                              ) : (
                                <span className="text-slate-600 font-normal">0</span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-center font-mono font-bold text-blue-400">
                              {entry.pointsDetailedEra > 0 ? (
                                <span>+{entry.pointsDetailedEra}p</span>
                              ) : (
                                <span className="text-slate-600 font-normal">0</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-right font-mono font-black text-amber-400 text-base">
                              {entry.totalPoints}{' '}
                              <span className="text-xs text-slate-400 font-sans font-normal">pts</span>
                            </td>
                          </tr>

                          {/* Historical Detailed Breakdown Row */}
                          {isExpanded && (
                            <tr className="bg-slate-900/95 border-b border-slate-800">
                              <td colSpan={7} className="p-4 sm:p-5">
                                <div className="space-y-3">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                                    <div>
                                      <h4 className="font-black text-sm text-white flex items-center gap-2">
                                        <span>Desempenho Histórico Detalhado: {entry.schoolName}</span>
                                      </h4>
                                      <p className="text-[11px] text-slate-400">
                                        {entry.totalEspecialTitles} Título(s) ({entry.totalEspecialTitles * 20}p) · {entry.totalEspecialVices} Vice(s) ({entry.totalEspecialVices * 15}p) · Era 1970+: {entry.pointsDetailedEra} pts
                                      </p>
                                    </div>
                                    {onSelectSchool && entry.school && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          onSelectSchool(entry.schoolId);
                                          onClose();
                                        }}
                                        className="text-[11px] text-amber-400 hover:text-amber-300 font-bold underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                                      >
                                        <span>Ver Perfil de Glórias Completo</span>
                                        <ExternalLink className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>

                                  <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                                      Carnavais Catalogados na Era Moderna (1970 a 2026):
                                    </span>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                                      {historicalCarnavals.map((c) => {
                                        const perf = entry.performancesDetailed[c.year];
                                        if (c.year === 2021) {
                                          return (
                                            <div
                                              key={c.year}
                                              className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] space-y-0.5"
                                            >
                                              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                                                <span>2021</span>
                                                <span>0p</span>
                                              </div>
                                              <div className="text-[10px] text-slate-400 italic">
                                                Sem Desfile (COVID)
                                              </div>
                                            </div>
                                          );
                                        }

                                        if (!perf || !perf.participated) {
                                          return (
                                            <div
                                              key={c.year}
                                              className="p-2 rounded-xl bg-slate-950/40 border border-slate-800/40 text-[11px] space-y-0.5 opacity-60"
                                            >
                                              <div className="flex items-center justify-between text-[10px] text-slate-600 font-mono">
                                                <span>{c.year}</span>
                                                <span>0p</span>
                                              </div>
                                              <div className="text-[10px] text-slate-500">
                                                Fora do Especial
                                              </div>
                                            </div>
                                          );
                                        }

                                        const isCamp = perf.rank === 1 && !perf.isHorsConcours;
                                        const isVice = perf.rank === 2 && !perf.isHorsConcours;
                                        const isG6 = perf.rank && perf.rank <= 6 && !perf.isHorsConcours;

                                        return (
                                          <div
                                            key={c.year}
                                            className={`p-2 rounded-xl border text-[11px] space-y-0.5 transition ${
                                              perf.isHorsConcours
                                                ? 'bg-purple-950/30 border-purple-500/40 text-purple-200'
                                                : isCamp
                                                ? 'bg-amber-500/15 border-amber-500/40 text-amber-200'
                                                : isVice
                                                ? 'bg-slate-300/15 border-slate-300/40 text-slate-200'
                                                : isG6
                                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                                                : 'bg-slate-950 border-slate-800 text-slate-300'
                                            }`}
                                          >
                                            <div className="flex items-center justify-between text-[10px] font-mono">
                                              <span className="font-bold text-white">{c.year}</span>
                                              <span className="font-bold text-amber-400">
                                                {perf.points > 0 ? `+${perf.points}p` : '0p'}
                                              </span>
                                            </div>
                                            <div className="font-bold text-xs truncate">
                                              {perf.isHorsConcours ? 'Hors concours' : perf.rank ? `${perf.rank}º Lugar` : '—'}
                                            </div>
                                            <div className="text-[9px] text-slate-400 truncate">
                                              {perf.isHorsConcours
                                                ? '🎭 Hors concours'
                                                : isCamp
                                                ? '🏆 Campeã'
                                                : isVice
                                                ? '🥈 Vice'
                                                : isG6
                                                ? '🌟 G6'
                                                : perf.rank && perf.rank <= 10
                                                ? 'Top 10'
                                                : 'Sem pontos'}
                                            </div>
                                            {(() => {
                                              const yrEnredo = getHistoricalEnredo(c.year, entry.schoolId, entry.schoolName);
                                              if (!yrEnredo) return null;
                                              return (
                                                <div className="text-[9px] text-amber-300/80 italic truncate pt-0.5 border-t border-slate-800/60" title={`Enredo ${c.year}: ${yrEnredo}`}>
                                                  &ldquo;{yrEnredo}&rdquo;
                                                </div>
                                              );
                                            })()}
                                          </div>
                                        );
                                      })}
                                    </div>

                                    {/* Catálogo Completo do Histórico de Enredos da Escola */}
                                    {(() => {
                                      const schoolEnredos = getSchoolHistoricalEnredosList(entry.schoolId, entry.schoolName, entry.school, inGameHistory, currentYear);
                                      if (schoolEnredos.length === 0) return null;
                                      return (
                                        <div className="pt-3 border-t border-slate-800/80 space-y-2">
                                          <div className="flex items-center justify-between text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                                            <span className="flex items-center gap-1.5">
                                              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                                              <span>Histórico Oficial de Enredos no Grupo Especial ({schoolEnredos.length} Edições)</span>
                                            </span>
                                            <span className="text-slate-400 font-mono font-normal">1970 a {currentYear || 2026}</span>
                                          </div>
                                          <div className="max-h-52 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                                            {schoolEnredos.map((item) => {
                                              const perf = entry.performancesDetailed[item.year];
                                              return (
                                                <div
                                                  key={item.year}
                                                  className="p-1.5 px-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-2 text-xs"
                                                >
                                                  <div className="flex items-center gap-2 min-w-0">
                                                    <span className="font-mono font-bold text-amber-400 text-[10px] bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 shrink-0">
                                                      {item.year}
                                                    </span>
                                                    <span className="text-slate-200 italic truncate text-[11px]">
                                                      &ldquo;{item.enredo}&rdquo;
                                                    </span>
                                                  </div>
                                                  <div className="shrink-0 text-[10px] font-mono font-bold">
                                                    {perf?.isHorsConcours ? (
                                                      <span className="text-purple-300">Hors concours</span>
                                                    ) : perf?.rank === 1 ? (
                                                      <span className="text-amber-400 font-black">🏆 Campeã (+20p)</span>
                                                    ) : perf?.rank === 2 ? (
                                                      <span className="text-slate-300 font-bold">🥈 Vice (+15p)</span>
                                                    ) : perf?.rank && perf.rank <= 6 ? (
                                                      <span className="text-emerald-400">{perf.rank}º Lugar (+{perf.points}p)</span>
                                                    ) : perf?.rank ? (
                                                      <span className="text-slate-400">{perf.rank}º Lugar {perf.points > 0 ? `(+${perf.points}p)` : ''}</span>
                                                    ) : (
                                                      <span className="text-slate-600">—</span>
                                                    )}
                                                  </div>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      );
                                    })()}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : rankingMode === 'participacoes' ? (
            /* TABELA DE PARTICIPAÇÕES NO GRUPO ESPECIAL (ORDEM DECRESCENTE) */
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-start gap-2.5 text-xs text-purple-200/90 leading-relaxed">
                <Award className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-purple-300">Quadro Histórico de Participações no Grupo Especial:</span>{' '}
                  Contabiliza o total exato de edições em que cada agremiação participou na divisão principal do Carnaval carioca (desde a era de 1970 até o ano corrente {currentYear || 2026}). O cálculo integra todos os anos oficiais dos Carnavais Passados com os anos transcorridos no seu save, atualizando-se automaticamente temporada a temporada. As escolas estão organizadas em ordem estritamente <strong>DECRESCENTE de participações</strong>. Clique em qualquer agremiação para visualizar os anos disputados e o histórico de enredos.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
                <span className="flex items-center gap-1.5">
                  <span>Mostrando escolas que já integraram a elite:</span>
                  <span className="font-bold text-purple-300 font-mono">
                    {filteredParticipations.length} agremiações
                  </span>
                </span>
                {participationsList.length > 0 && (
                  <span className="text-[11px] text-slate-400">
                    Recordista histórica: <strong className="text-amber-400">{participationsList[0].schoolName}</strong> ({participationsList[0].totalParticipations} participações)
                  </span>
                )}
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60 shadow-xl">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] bg-slate-900/90">
                      <th className="py-3 px-3.5 w-16">Pos</th>
                      <th className="py-3 px-3.5">Escola de Samba</th>
                      <th className="py-3 px-3 text-center text-purple-400 font-bold">Participações no Especial</th>
                      <th className="py-3 px-3 text-center text-slate-300 font-bold">Período na Elite</th>
                      <th className="py-3 px-3 text-center text-amber-400 font-bold">Títulos Especial</th>
                      <th className="py-3 px-3 text-center text-slate-300 font-bold">Vices Especial</th>
                      <th className="py-3 px-3 text-center text-slate-400 font-bold">Situação no Save</th>
                      <th className="py-3 px-3 text-center w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredParticipations.map((item) => {
                      const isUser = userSchool && (userSchool.id === item.schoolId || userSchool.name === item.schoolName);
                      const isExpanded = expandedPartSchoolId === item.schoolId;
                      const sch = item.school;
                      const schoolEnredos = getSchoolHistoricalEnredosList(
                        item.schoolId,
                        item.schoolName,
                        sch,
                        inGameHistory,
                        currentYear
                      );

                      return (
                        <React.Fragment key={item.schoolId}>
                          <tr
                            onClick={() => togglePartExpand(item.schoolId)}
                            className={`cursor-pointer transition hover:bg-slate-800/50 ${
                              isUser ? 'bg-emerald-500/10 font-bold' : ''
                            } ${item.position === 1 ? 'bg-purple-500/10' : ''}`}
                          >
                            <td className="py-3 px-3.5 font-mono">
                              {getPositionBadge(item.position)}
                            </td>
                            <td className="py-3 px-3.5 text-white">
                              <div className="flex items-center gap-2.5">
                                {sch && (
                                  <div
                                    className="w-4 h-4 rounded-full border shrink-0 shadow-sm"
                                    style={{
                                      backgroundColor: sch.colors.primary,
                                      borderColor: sch.colors.border || '#fff'
                                    }}
                                  />
                                )}
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-black text-xs sm:text-sm truncate">
                                      {item.schoolName}
                                    </span>
                                    {isUser && (
                                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase font-black">
                                        Sua
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-slate-400 block truncate">
                                    {sch?.nickname || sch?.calledName || 'Agremiação Histórica'}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <div className="inline-flex flex-col items-center">
                                <span className="font-mono font-black text-purple-300 bg-purple-500/20 border border-purple-500/40 px-3 py-1 rounded-xl text-xs sm:text-sm shadow-sm">
                                  {item.totalParticipations} {item.totalParticipations === 1 ? 'edição' : 'edições'}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-center text-slate-300 font-mono text-xs">
                              {item.firstYear > 0 ? (
                                <span>
                                  {item.firstYear} <span className="text-slate-500">→</span> {item.lastYear}
                                </span>
                              ) : (
                                <span className="text-slate-600">—</span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-center font-mono font-bold text-amber-400">
                              {item.titlesCount > 0 ? (
                                <span className="inline-flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-lg">
                                  <Trophy className="w-3 h-3 text-amber-400" />
                                  <span>{item.titlesCount}</span>
                                </span>
                              ) : (
                                <span className="text-slate-600 font-normal">0</span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-center font-mono font-bold text-slate-300">
                              {item.vicesCount > 0 ? (
                                <span className="inline-flex items-center gap-1 bg-slate-300/15 border border-slate-300/30 px-2 py-0.5 rounded-lg">
                                  <Medal className="w-3 h-3 text-slate-300" />
                                  <span>{item.vicesCount}</span>
                                </span>
                              ) : (
                                <span className="text-slate-600 font-normal">0</span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-center text-[11px]">
                              {sch?.division === 'especial' ? (
                                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                                  Grupo Especial
                                </span>
                              ) : sch?.division === 'ouro' ? (
                                <span className="px-2 py-0.5 rounded-md bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 font-medium">
                                  Série Ouro
                                </span>
                              ) : sch?.division === 'prata' ? (
                                <span className="px-2 py-0.5 rounded-md bg-slate-400/20 text-slate-300 border border-slate-400/40 font-medium">
                                  Série Prata
                                </span>
                              ) : sch?.division === 'bronze' ? (
                                <span className="px-2 py-0.5 rounded-md bg-amber-700/20 text-amber-400 border border-amber-700/40 font-medium">
                                  Série Bronze
                                </span>
                              ) : sch?.division === 'avaliacao' ? (
                                <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/40 font-medium">
                                  Avaliação
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                                  Inativa / Histórica
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-center text-slate-400">
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-purple-400 mx-auto" />
                              ) : (
                                <ChevronDown className="w-4 h-4 mx-auto" />
                              )}
                            </td>
                          </tr>

                          {/* Participations Detailed Breakdown Row */}
                          {isExpanded && (
                            <tr className="bg-slate-900/95 border-b border-slate-800">
                              <td colSpan={8} className="p-4 sm:p-5">
                                <div className="space-y-4">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                                    <div>
                                      <h4 className="font-black text-sm text-white flex items-center gap-2">
                                        <Award className="w-4 h-4 text-purple-400" />
                                        <span>Trajetória no Grupo Especial: {item.schoolName}</span>
                                      </h4>
                                      <p className="text-[11px] text-slate-400 mt-0.5">
                                        Total de <strong className="text-purple-300">{item.totalParticipations} participações</strong> na elite · Estreia em {item.firstYear} · Mais recente em {item.lastYear} · {item.titlesCount} título(s) e {item.vicesCount} vice-campeonato(s)
                                      </p>
                                    </div>
                                    {onSelectSchool && sch && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          onSelectSchool(sch.id);
                                          onClose();
                                        }}
                                        className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-500/40 text-xs font-bold transition flex items-center gap-1.5 self-start cursor-pointer"
                                      >
                                        <span>Ver Ficha da Agremiação</span>
                                        <ExternalLink className="w-3 h-3" />
                                      </button>
                                    )}
                                  </div>

                                  {/* Anos de Desfile no Grupo Especial */}
                                  <div className="space-y-1.5">
                                    <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                                      <span>Anos em que Desfilou no Grupo Especial ({item.years.length} Carnavais)</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                      {item.years.map((yr) => (
                                        <span
                                          key={yr}
                                          className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-bold border ${
                                            yr > 2026
                                              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                                              : 'bg-slate-950 border-slate-800 text-slate-300'
                                          }`}
                                          title={yr > 2026 ? `Ano ${yr} disputado no seu save` : `Ano oficial ${yr}`}
                                        >
                                          {yr}
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Catálogo de Enredos Atualizado com o Save */}
                                  {schoolEnredos.length > 0 && (
                                    <div className="pt-3 border-t border-slate-800/80 space-y-2">
                                      <div className="flex items-center justify-between text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                                        <span className="flex items-center gap-1.5">
                                          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                                          <span>Histórico Oficial de Enredos no Grupo Especial ({schoolEnredos.length} Edições - Atualizado com o Save)</span>
                                        </span>
                                        <span className="text-slate-400 font-mono font-normal">1970 a {currentYear || 2026}</span>
                                      </div>
                                      <div className="max-h-56 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                                        {schoolEnredos.map((enr) => (
                                          <div
                                            key={enr.year}
                                            className="p-1.5 px-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-2 text-xs"
                                          >
                                            <div className="flex items-center gap-2 min-w-0">
                                              <span
                                                className={`font-mono font-bold text-[10px] px-1.5 py-0.5 rounded border shrink-0 ${
                                                  enr.year > 2026
                                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                }`}
                                              >
                                                {enr.year}
                                              </span>
                                              <span className="text-white italic truncate font-medium">
                                                &ldquo;{enr.enredo}&rdquo;
                                              </span>
                                            </div>
                                            {enr.year > 2026 && (
                                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0">
                                                No Save
                                              </span>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* TABELA DE CARNAVAIS PASSADOS (RESULTADOS OFICIAIS POR ANO) */
            <div className="space-y-4">
              {/* Barra de seleção rápida de anos */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Selecione o Carnaval Histórico para Consultar:</span>
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {historicalCarnavals.length} edições catalogadas
                  </span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                  {historicalCarnavals.map((carnaval) => {
                    const isSelected = selectedPastYear === carnaval.year;
                    const is2021 = carnaval.year === 2021;

                    return (
                      <button
                        key={carnaval.year}
                        onClick={() => setSelectedPastYear(carnaval.year)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition shrink-0 cursor-pointer border ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md shadow-amber-500/20'
                            : is2021
                            ? 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <span>{carnaval.year}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Informações detalhadas do Carnaval Selecionado */}
              {currentPastCarnaval && (
                <div className="space-y-4">
                  {/* Banner do Carnaval */}
                  {currentPastCarnaval.isNoCarnaval ? (
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
                        <AlertTriangle className="w-6 h-6 text-amber-500" />
                      </div>
                      <h3 className="text-lg font-black text-white">
                        Carnaval 2021 — Não Houve Carnaval
                      </h3>
                      <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
                        Em virtude do ápice da pandemia mundial de COVID-19 e das medidas sanitárias vigentes, a LIESA e os órgãos públicos cancelaram os desfiles das escolas de samba no Sambódromo da Marquês de Sapucaí em 2021. Nenhuma agremiação pontuou no Ranking Oficial.
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Banner de destaques */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              {currentPastCarnaval.year <= 1984 ? 'RESULTADO OFICIAL AESCRJ' : 'RESULTADO OFICIAL LIESA'}
                            </span>
                            <span className="text-xs text-slate-300 font-mono font-bold">
                              Ano {currentPastCarnaval.year}
                            </span>

                            {currentPastCarnaval.year <= 1984 && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                                Gestão AESCRJ
                              </span>
                            )}
                            {currentPastCarnaval.year === 1985 && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                1º Carnaval LIESA (Fundada em 24/07/1984)
                              </span>
                            )}

                            {/* Informações de Campeãs */}
                            {currentPastCarnaval.championNames.length > 1 && (
                              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-amber-500/25 text-amber-300 border border-amber-500/50 flex items-center gap-1">
                                <Crown className="w-3 h-3 text-amber-400" />
                                {currentPastCarnaval.championNames.length} Campeãs Oficiais
                              </span>
                            )}
                            {currentPastCarnaval.viceChampionNames.length > 1 && (
                              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-slate-400/20 text-slate-200 border border-slate-400/40 flex items-center gap-1">
                                <Medal className="w-3 h-3 text-slate-300" />
                                {currentPastCarnaval.viceChampionNames.length} Vice-Campeãs
                              </span>
                            )}

                            {/* Informações de Rebaixamento ou Não Rebaixamento */}
                            {isNoRelegationYear ? (
                              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3 text-indigo-400" />
                                Sem Rebaixamento
                              </span>
                            ) : pastCarnavalRelegations.length > 0 ? (
                              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3 text-rose-400" />
                                {pastCarnavalRelegations.length} {pastCarnavalRelegations.length === 1 ? 'Rebaixada' : 'Rebaixadas'}
                              </span>
                            ) : null}
                          </div>

                          <h3 className="text-lg font-black text-white">
                            {currentPastCarnaval.championNames.length > 1
                              ? `Campeãs Oficiais: ${currentPastCarnaval.championNames.join(' e ')}`
                              : `Campeã: ${currentPastCarnaval.championNames[0] || 'A Definir'}`}
                          </h3>

                          {/* Bloco de Informações do Carnaval Aberto: Rebaixamento e Campeãs */}
                          <div className="flex flex-wrap gap-2 text-xs pt-0.5">
                            {isNoRelegationYear && (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-800/70 text-indigo-200 text-xs">
                                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                                <span>
                                  <strong>Sem Rebaixamento:</strong> Neste carnaval não houve rebaixamento para o grupo de acesso por deliberação oficial {currentPastCarnaval.year <= 1984 ? 'da AESCRJ' : 'da LIESA'}.
                                </span>
                              </div>
                            )}

                            {!isNoRelegationYear && pastCarnavalRelegations.length > 0 && (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/50 border border-rose-800/60 text-rose-200 text-xs">
                                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                                <span>
                                  <strong>Rebaixamento ({pastCarnavalRelegations.length}):</strong>{' '}
                                  {pastCarnavalRelegations.join(', ')}
                                </span>
                              </div>
                            )}
                          </div>

                          {currentPastCarnaval.notes && (
                            <p className="text-[11px] text-amber-200/90 mt-1 max-w-2xl leading-relaxed">
                              {currentPastCarnaval.notes}
                            </p>
                          )}
                        </div>

                        {/* Cards de pódio */}
                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          {currentPastCarnaval.championNames.map((champ, idx) => (
                            <div
                              key={idx}
                              className="px-3.5 py-2 rounded-xl bg-amber-500/15 border border-amber-400/40 text-center"
                            >
                              <span className="text-[9px] uppercase font-black text-amber-400 block">
                                🏆 Campeã (+20p)
                              </span>
                              <span className="text-xs font-black text-white">{champ}</span>
                            </div>
                          ))}
                          {currentPastCarnaval.viceChampionNames.length > 0 && (
                            <div className="px-3.5 py-2 rounded-xl bg-slate-300/15 border border-slate-300/40 text-center">
                              <span className="text-[9px] uppercase font-black text-slate-300 block">
                                🥈 Vice (+15p)
                              </span>
                              <span className="text-xs font-black text-white">
                                {currentPastCarnaval.viceChampionNames.join(', ')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Seletor Especial para os 3 Resultados Oficiais de 1984 */}
                      {currentPastCarnaval.year === 1984 && currentPastCarnaval.subgroups && (
                        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-2.5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <Crown className="w-4 h-4 text-amber-400" />
                              <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
                                Resultados Oficiais do Carnaval de 1984 (Inauguração do Sambódromo • Gestão AESCRJ):
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-400">
                              3 Campeãs • Domingo, Segunda-Feira e Supercampeonato
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <button
                              onClick={() => setSubgroup1984Tab('supercampeonato')}
                              className={`p-2.5 rounded-xl text-left border transition cursor-pointer ${
                                subgroup1984Tab === 'supercampeonato'
                                  ? 'bg-amber-500/20 border-amber-400 text-white shadow-md shadow-amber-500/10'
                                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/50'
                              }`}
                            >
                              <div className="text-[10px] font-black uppercase text-amber-400 flex items-center justify-between">
                                <span>Supercampeonato</span>
                                <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/30 text-amber-200">Sábado</span>
                              </div>
                              <div className="text-xs font-bold text-white mt-0.5 truncate">Mangueira Supercampeã</div>
                              <div className="text-[10px] text-slate-400 truncate">8 escolas (G6 + Grupo 1-B)</div>
                            </button>

                            <button
                              onClick={() => setSubgroup1984Tab('domingo')}
                              className={`p-2.5 rounded-xl text-left border transition cursor-pointer ${
                                subgroup1984Tab === 'domingo'
                                  ? 'bg-amber-500/20 border-amber-400 text-white shadow-md shadow-amber-500/10'
                                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/50'
                              }`}
                            >
                              <div className="text-[10px] font-black uppercase text-blue-400 flex items-center justify-between">
                                <span>Desfiles de Domingo</span>
                                <span className="text-[9px] px-1 py-0.2 rounded bg-blue-500/30 text-blue-200">Domingo</span>
                              </div>
                              <div className="text-xs font-bold text-white mt-0.5 truncate">Portela Campeã</div>
                              <div className="text-[10px] text-rose-300 truncate">Rebaixada: Tijuca</div>
                            </button>

                            <button
                              onClick={() => setSubgroup1984Tab('segunda')}
                              className={`p-2.5 rounded-xl text-left border transition cursor-pointer ${
                                subgroup1984Tab === 'segunda'
                                  ? 'bg-amber-500/20 border-amber-400 text-white shadow-md shadow-amber-500/10'
                                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/50'
                              }`}
                            >
                              <div className="text-[10px] font-black uppercase text-pink-400 flex items-center justify-between">
                                <span>Desfiles de Segunda</span>
                                <span className="text-[9px] px-1 py-0.2 rounded bg-pink-500/30 text-pink-200">Segunda</span>
                              </div>
                              <div className="text-xs font-bold text-white mt-0.5 truncate">Mangueira Campeã</div>
                              <div className="text-[10px] text-rose-300 truncate">Rebaixada: Ponte</div>
                            </button>

                            <button
                              onClick={() => setSubgroup1984Tab('geral')}
                              className={`p-2.5 rounded-xl text-left border transition cursor-pointer ${
                                subgroup1984Tab === 'geral'
                                  ? 'bg-amber-500/20 border-amber-400 text-white shadow-md shadow-amber-500/10'
                                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/50'
                              }`}
                            >
                              <div className="text-[10px] font-black uppercase text-slate-300 flex items-center justify-between">
                                <span>Classificação Geral</span>
                                <span className="text-[9px] px-1 py-0.2 rounded bg-slate-800 text-slate-300">AESCRJ</span>
                              </div>
                              <div className="text-xs font-bold text-white mt-0.5 truncate">Pontuação Oficial AESCRJ</div>
                              <div className="text-[10px] text-slate-400 truncate">Todas as 16 colocações</div>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Tabela de Colocação Oficial do Ano */}
                      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60 shadow-xl">
                        <table className="w-full text-xs text-left">
                          <thead>
                            <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] bg-slate-900/90">
                              <th className="py-3 px-3.5 w-16">Colocação</th>
                              <th className="py-3 px-3.5">Escola de Samba</th>
                              <th className="py-3 px-3 text-center text-amber-400 font-bold">
                                {currentPastCarnaval.year <= 1984 ? 'Pontos no Ranking Histórico' : 'Pontos LIESA'}
                              </th>
                              <th className="py-3 px-4 text-right text-slate-300 font-bold">Status Oficial</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60">
                            {filteredPastCarnavalStandings.map((st) => {
                              const pts = st.statusDescription?.includes('(+20 pts)')
                                ? 20
                                : st.statusDescription?.includes('(+15 pts)')
                                ? 15
                                : st.statusDescription?.includes('(+12 pts)')
                                ? 12
                                : st.statusDescription?.includes('(+10 pts)')
                                ? 10
                                : st.statusDescription?.includes('(+8 pts)')
                                ? 8
                                : st.statusDescription?.includes('(+6 pts)')
                                ? 6
                                : st.statusDescription?.includes('(+4 pts)')
                                ? 4
                                : st.statusDescription?.includes('(+3 pts)')
                                ? 3
                                : LIESA_POINTS_BY_RANK[st.rank] || 0;

                              const sch = schools.find(
                                (s) => s.id === st.schoolId || s.name === st.schoolName
                              );
                              const isUser = userSchool && (userSchool.id === st.schoolId || userSchool.name === st.schoolName);
                              const totalSchools = currentPastCarnaval.standings.length;

                              const enredo = getHistoricalEnredo(currentPastCarnaval.year, st.schoolId, st.schoolName);

                              return (
                                <tr
                                  key={(st.subgroup ? `${st.subgroup}_` : '') + (st.schoolId || st.schoolName)}
                                  onClick={() => onSelectSchool && st.schoolId && onSelectSchool(st.schoolId)}
                                  className={`cursor-pointer transition hover:bg-slate-800/50 ${
                                    isUser ? 'bg-emerald-500/10 font-bold' : ''
                                  } ${st.rank === 1 ? 'bg-amber-500/10' : ''}`}
                                >
                                  <td className="py-3 px-3.5 font-mono">
                                    {getPastRankBadge(st.rank, totalSchools, st.isHorsConcours, currentPastCarnaval.year, st.statusDescription)}
                                  </td>
                                  <td className="py-3 px-3.5 text-white">
                                    <div className="flex items-center gap-2.5">
                                      {sch && (
                                        <div
                                          className="w-4 h-4 rounded-full border shrink-0 shadow-sm"
                                          style={{
                                            backgroundColor: sch.colors.primary,
                                            borderColor: sch.colors.border || '#fff'
                                          }}
                                        />
                                      )}
                                      <div className="min-w-0">
                                        <div className="flex items-center gap-1.5">
                                          <span className="font-black text-xs sm:text-sm truncate">
                                            {st.schoolName}
                                          </span>
                                          {isUser && (
                                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase font-black">
                                              Sua
                                            </span>
                                          )}
                                        </div>
                                        {enredo ? (
                                          <div className="flex items-center gap-1.5 mt-0.5 min-w-0" title={`Enredo ${currentPastCarnaval.year}: ${enredo}`}>
                                            <BookOpen className="w-3 h-3 text-amber-400/80 shrink-0" />
                                            <span className="text-[11px] text-amber-200/90 font-medium italic truncate max-w-[260px] sm:max-w-md md:max-w-lg">
                                              Enredo: &ldquo;{enredo}&rdquo;
                                            </span>
                                          </div>
                                        ) : (
                                          <span className="text-[10px] text-slate-500 block truncate">
                                            {st.schoolName}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-3 px-3 text-center font-mono font-black text-amber-400 text-sm">
                                    {pts > 0 ? (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-amber-500/15 border border-amber-500/30">
                                        +{pts} pts
                                      </span>
                                    ) : (
                                      <span className="text-slate-600 font-normal">0 pts</span>
                                    )}
                                  </td>
                                  <td className="py-3 px-4 text-right">
                                    {st.statusDescription ? (
                                      <span className={`text-xs font-bold ${
                                        st.statusDescription.includes('Supercampeã') || st.statusDescription.includes('Campeã')
                                          ? 'text-amber-300'
                                          : st.statusDescription.includes('Supervice') || st.statusDescription.includes('Vice')
                                          ? 'text-slate-200'
                                          : st.statusDescription.includes('Rebaixada')
                                          ? 'text-rose-400 font-bold'
                                          : st.statusDescription.includes('Classificada') || st.statusDescription.includes('Supercampeonato')
                                          ? 'text-emerald-300'
                                          : 'text-slate-300'
                                      }`}>
                                        {st.statusDescription}
                                      </span>
                                    ) : st.isHorsConcours || st.rank === 0 ? (
                                      <span className="text-xs font-bold text-purple-300">
                                        Desfile Hors concours (Incêndio Cidade do Samba)
                                      </span>
                                    ) : st.rank === 1 ? (
                                      <span className="text-xs font-bold text-amber-300">
                                        🏆 Campeã Oficial
                                      </span>
                                    ) : st.rank === 2 ? (
                                      <span className="text-xs font-bold text-slate-300">
                                        🥈 Vice-Campeã
                                      </span>
                                    ) : st.rank === 3 ? (
                                      <span className="text-xs font-bold text-amber-500">
                                        🥉 3º Lugar
                                      </span>
                                    ) : st.rank <= 6 ? (
                                      <span className="text-xs font-bold text-emerald-400">
                                        🌟 Desfile das Campeãs (G6)
                                      </span>
                                    ) : st.rank <= 10 ? (
                                      <span className="text-xs text-blue-300">
                                        🏅 Pontuou no Top 10
                                      </span>
                                    ) : (currentPastCarnaval.year === 2011 || currentPastCarnaval.year === 2017 || currentPastCarnaval.year === 2018) ? (
                                      <span className="text-xs text-slate-400">
                                        Manteve no Especial (Sem Rebaixamento em {currentPastCarnaval.year})
                                      </span>
                                    ) : currentPastCarnaval.year === 2012 && (st.rank === 12 || st.rank === 13) ? (
                                      <span className="text-xs text-rose-400">
                                        ⚠️ Rebaixada para Acesso / Ouro
                                      </span>
                                    ) : currentPastCarnaval.year === 2019 && (st.rank === 13 || st.rank === 14) ? (
                                      <span className="text-xs text-rose-400">
                                        ⚠️ Rebaixada para Série Ouro
                                      </span>
                                    ) : currentPastCarnaval.year === 2020 && (st.rank === 12 || st.rank === 13) ? (
                                      <span className="text-xs text-rose-400">
                                        ⚠️ Rebaixada para Série Ouro
                                      </span>
                                    ) : st.rank === totalSchools ? (
                                      <span className="text-xs text-rose-400">
                                        ⚠️ Rebaixada para Ouro
                                      </span>
                                    ) : (
                                      <span className="text-xs text-slate-500">
                                        Manteve no Especial
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              O ranking LIESA estimula o mérito contínuo e a competitividade artística nas passarelas.
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer shadow-md"
          >
            Fechar Ranking
          </button>
        </div>
      </div>
    </div>
  );
};
