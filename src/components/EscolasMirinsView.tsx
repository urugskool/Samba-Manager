import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Coins,
  Eye,
  FastForward,
  GraduationCap,
  HeartHandshake,
  Info,
  Lock,
  MapPin,
  Pause,
  Play,
  Plus,
  Search,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import { QuesitoId, School } from '../types/carnaval';
import {
  CreateMirimSchoolParams,
  MirimDenomination,
  MirimParadeSlotId,
  MirimSchool,
} from '../types/mirim';
import { SeasonMonthId } from '../types/seasonCycle';
import { SeasonCycleService } from '../services/seasonCycleService';
import { MirimService, MIRIM_MAX_ESPECIAL_YEARS_WITHOUT_MIRIM } from '../services/mirimService';
import { SchoolFlag, FlagPatternId, FlagEmblemStyle } from './SchoolFlag';
import { cleanSchoolName } from '../utils/schoolNameUtils';

interface EscolasMirinsViewProps {
  mirimSchools: MirimSchool[];
  adultSchools: School[];
  currentYear: number;
  currentSeasonMonth: SeasonMonthId;
  initialSubTab?: MirimSubTab;
  playerSchoolId: string;
  isSpectatorMode: boolean;
  especialWithoutMirimTracker: Record<string, number>;
  onPromoteTalent: (mirimId: string, talentId: string, targetAdultSchoolId: string) => void;
  onInvestAcademy: (mirimId: string, motherSchoolId: string) => void;
  onCompleteSingleMirimParade: (mirimId: string) => void;
  onSimulateParadeDay: (slotId: MirimParadeSlotId) => void;
  onSimulateAllParades: () => void;
  onCreateMirimSchool: (params: CreateMirimSchoolParams) => void;
  onOpenSeasonCycleModal?: () => void;
  onNavigateToAdultDesfile?: () => void;
}

export type MirimSubTab = 'catalogo' | 'desfile' | 'talentos' | 'regulamento';
type CatalogFilter = 'all' | 'vinculadas' | 'sociais' | 'minha';

const QUESITO_LABELS: Record<QuesitoId, string> = {
  bateria: 'Bateria',
  comissaoDeFrente: 'Comissão de Frente',
  evolucao: 'Evolução',
  harmonia: 'Harmonia',
  enredo: 'Enredo',
  fantasias: 'Fantasias',
  alegorias: 'Alegorias e Adereços',
  sambaEnredo: 'Samba-Enredo',
  mestreSalaPortaBandeira: 'Mestre-Sala e Porta-Bandeira',
};

const PARADE_SLOTS_ORDER: Array<{
  slotId: MirimParadeSlotId;
  shortLabel: string;
  subtitle: string;
}> = [
  {
    slotId: 'ensaio_tecnico_1',
    shortLabel: '31 de Janeiro · 18h',
    subtitle: 'Ensaio Técnico na Marquês de Sapucaí',
  },
  {
    slotId: 'ensaio_tecnico_2',
    shortLabel: '1º de Fevereiro · 18h',
    subtitle: 'Ensaio Técnico na Marquês de Sapucaí',
  },
  {
    slotId: 'ensaio_tecnico_3',
    shortLabel: '8 de Fevereiro · 18h',
    subtitle: 'Ensaio Técnico na Marquês de Sapucaí',
  },
  {
    slotId: 'desfile_principal',
    shortLabel: 'Sexta-feira Pós-Carnaval · 18h',
    subtitle: 'Desfile Oficial das Escolas Mirins · Sapucaí',
  },
];

const formatCurrency = (val: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(val);

const MIRIM_SAPUCAI_SECTORS = [
  'Concentração (Balança Mas Não Cai)',
  'Setor 1 · Abertura da Comissão Mirim',
  'Setores 2 e 3 · Evolução das Alas Infantis',
  'Recuo da Bateria Mirim · Show de Ritmo',
  'Passarela Central · 1º Casal Mirim de MS/PB',
  'Praça da Apoteose · Encerramento Festivo',
];

export const EscolasMirinsView: React.FC<EscolasMirinsViewProps> = ({
  mirimSchools,
  adultSchools,
  currentYear,
  currentSeasonMonth,
  initialSubTab,
  playerSchoolId,
  isSpectatorMode,
  especialWithoutMirimTracker,
  onPromoteTalent,
  onInvestAcademy,
  onCompleteSingleMirimParade,
  onSimulateParadeDay,
  onSimulateAllParades,
  onCreateMirimSchool,
  onOpenSeasonCycleModal,
  onNavigateToAdultDesfile,
}) => {
  const [subTab, setSubTab] = useState<MirimSubTab>(initialSubTab || 'catalogo');
  const [catalogFilter, setCatalogFilter] = useState<CatalogFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMirimId, setSelectedMirimId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Estado do visualizador ao vivo do desfile mirim (disponível apenas em Fevereiro)
  const [watchingMirimId, setWatchingMirimId] = useState<string | null>(null);
  const [watchProgress, setWatchProgress] = useState<number>(0); // 0 a 100
  const [watchPlaying, setWatchPlaying] = useState<boolean>(false);
  const [watchFast, setWatchFast] = useState<boolean>(false);

  const isCarnavalMonth = currentSeasonMonth === 'fevereiro';
  const currentPeriod = SeasonCycleService.getPeriod(currentSeasonMonth);

  useEffect(() => {
    if (initialSubTab) {
      setSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  // Avança a linha do tempo do desfile mirim assistido ao vivo (festivo, sem julgamento)
  useEffect(() => {
    if (!watchingMirimId || !watchPlaying) return;
    if (watchProgress >= 100) {
      setWatchPlaying(false);
      return;
    }
    const timer = setInterval(() => {
      setWatchProgress((prev) => {
        const next = Math.min(100, prev + (watchFast ? 12 : 4));
        if (next >= 100) {
          setWatchPlaying(false);
        }
        return next;
      });
    }, 300);
    return () => clearInterval(timer);
  }, [watchingMirimId, watchPlaying, watchFast, watchProgress]);

  const watchingMirim = useMemo(
    () => (watchingMirimId ? mirimSchools.find((m) => m.id === watchingMirimId) || null : null),
    [mirimSchools, watchingMirimId]
  );

  const handleOpenWatchMirim = (mirim: MirimSchool) => {
    if (!isCarnavalMonth) return;
    setWatchingMirimId(mirim.id);
    setWatchProgress(0);
    setWatchPlaying(true);
    setWatchFast(false);
  };

  const handleFinishWatchingMirim = () => {
    if (!watchingMirim) return;
    onCompleteSingleMirimParade(watchingMirim.id);
    setWatchingMirimId(null);
    setWatchPlaying(false);
    setWatchProgress(0);
  };

  // Estado do formulário de criação rápida de Escola Mirim
  const [newDenom, setNewDenom] = useState<MirimDenomination>('G.R.C.E.S.M.');
  const [newName, setNewName] = useState('');
  const [newAbbrev, setNewAbbrev] = useState('');
  const [newIsSocial, setNewIsSocial] = useState(false);
  const [newMotherId, setNewMotherId] = useState<string>('');
  const [newNeighborhood, setNewNeighborhood] = useState('');
  const [newCity, setNewCity] = useState('Rio de Janeiro');
  const [newPrimaryColor, setNewPrimaryColor] = useState('#1d4ed8');
  const [newSecondaryColor, setNewSecondaryColor] = useState('#ffffff');
  const [newColorsDesc, setNewColorsDesc] = useState('Azul e Branco');
  const [newSymbol, setNewSymbol] = useState('');
  const [newEmoji, setNewEmoji] = useState('🥁');
  const [newPattern, setNewPattern] = useState<FlagPatternId>('raios_16');
  const [newEmblem, setNewEmblem] = useState<FlagEmblemStyle>('circulo');
  const [newEnredoTitle, setNewEnredoTitle] = useState('');
  const [newEnredoSynopsis, setNewEnredoSynopsis] = useState('');
  const [newEnredoTheme, setNewEnredoTheme] = useState('Lúdico');
  const [formError, setFormError] = useState<string | null>(null);

  const playerSchool = useMemo(
    () => (!isSpectatorMode ? adultSchools.find((s) => s.id === playerSchoolId) : undefined),
    [adultSchools, isSpectatorMode, playerSchoolId]
  );

  const playerMirim = useMemo(
    () =>
      playerSchool ? mirimSchools.find((m) => m.motherSchoolId === playerSchool.id) : undefined,
    [mirimSchools, playerSchool]
  );

  const especialCompliance = useMemo(
    () =>
      MirimService.getEspecialComplianceStatuses(
        adultSchools,
        mirimSchools,
        especialWithoutMirimTracker
      ),
    [adultSchools, mirimSchools, especialWithoutMirimTracker]
  );

  const especialWithoutMirim = useMemo(
    () => especialCompliance.filter((c) => !c.hasMirim),
    [especialCompliance]
  );

  const adultSchoolsWithoutMirim = useMemo(() => {
    const linkedIds = new Set(mirimSchools.map((m) => m.motherSchoolId).filter(Boolean));
    return adultSchools
      .filter((s) => !linkedIds.has(s.id))
      .sort((a, b) => cleanSchoolName(a.name).localeCompare(cleanSchoolName(b.name), 'pt-BR'));
  }, [adultSchools, mirimSchools]);

  const stats = useMemo(() => {
    const socialCount = mirimSchools.filter((m) => m.isSocialProject).length;
    const linkedCount = mirimSchools.length - socialCount;
    const readyTalents = mirimSchools.reduce(
      (acc, m) => acc + m.talents.filter((t) => t.readyToGraduate && !t.graduatedYear).length,
      0
    );
    const totalYouth = mirimSchools.reduce((acc, m) => acc + (m.youthSquadSize || 0), 0);
    const paradedCount = mirimSchools.filter((m) => m.paradeSchedule.completed).length;
    return {
      total: mirimSchools.length,
      linkedCount,
      socialCount,
      readyTalents,
      totalYouth,
      paradedCount,
    };
  }, [mirimSchools]);

  const filteredMirims = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return mirimSchools
      .filter((m) => {
        if (catalogFilter === 'vinculadas' && m.isSocialProject) return false;
        if (catalogFilter === 'sociais' && !m.isSocialProject) return false;
        if (catalogFilter === 'minha' && m.motherSchoolId !== playerSchoolId) return false;
        if (!q) return true;
        return (
          m.calledName.toLowerCase().includes(q) ||
          m.name.toLowerCase().includes(q) ||
          (m.motherSchoolName || '').toLowerCase().includes(q) ||
          (m.neighborhood || '').toLowerCase().includes(q) ||
          m.city.toLowerCase().includes(q) ||
          m.currentEnredo.title.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        // Destaca a escola mirim do jogador no topo
        if (a.motherSchoolId === playerSchoolId && b.motherSchoolId !== playerSchoolId) return -1;
        if (b.motherSchoolId === playerSchoolId && a.motherSchoolId !== playerSchoolId) return 1;
        return a.calledName.localeCompare(b.calledName, 'pt-BR');
      });
  }, [mirimSchools, catalogFilter, searchQuery, playerSchoolId]);

  const selectedMirim = useMemo(
    () => (selectedMirimId ? mirimSchools.find((m) => m.id === selectedMirimId) || null : null),
    [mirimSchools, selectedMirimId]
  );

  const openCreateModalForPlayer = (preselectPlayerSchool: boolean) => {
    setFormError(null);
    if (preselectPlayerSchool && playerSchool && !playerMirim) {
      const cleanMother = cleanSchoolName(playerSchool.name);
      setNewIsSocial(false);
      setNewMotherId(playerSchool.id);
      setNewName(`Sementes da ${playerSchool.shortName || cleanMother}`);
      setNewAbbrev((playerSchool.shortName || cleanMother).slice(0, 12));
      setNewNeighborhood(playerSchool.neighborhood || '');
      setNewCity(playerSchool.city || playerSchool.cityState || 'Rio de Janeiro');
      setNewPrimaryColor(playerSchool.colors?.primary || '#1d4ed8');
      setNewSecondaryColor(playerSchool.colors?.secondary || '#ffffff');
      setNewColorsDesc(playerSchool.colorsDescription || 'Cores da escola-mãe');
      setNewSymbol(playerSchool.symbol || `Pavilhão juvenil da ${cleanMother}`);
    } else {
      setNewIsSocial(true);
      setNewMotherId('');
      setNewName('');
      setNewAbbrev('');
      setNewNeighborhood('');
      setNewCity('Rio de Janeiro');
      setNewPrimaryColor('#15803d');
      setNewSecondaryColor('#facc15');
      setNewColorsDesc('Verde e Amarelo');
      setNewSymbol('');
    }
    setNewEnredoTitle('');
    setNewEnredoSynopsis('');
    setShowCreateModal(true);
  };

  const handleSubmitCreateMirim = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = newName.trim();
    if (trimmedName.length < 3) {
      setFormError('Informe o nome completo da escola mirim (mínimo 3 caracteres).');
      return;
    }

    if (!newIsSocial && !newMotherId) {
      setFormError('Selecione a escola-mãe vinculada ou marque como Projeto Social (LIESA).');
      return;
    }

    const mother = !newIsSocial ? adultSchools.find((s) => s.id === newMotherId) : undefined;
    if (!newIsSocial && mother && mirimSchools.some((m) => m.motherSchoolId === mother.id)) {
      setFormError(`A escola ${cleanSchoolName(mother.name)} já possui uma escola mirim vinculada.`);
      return;
    }

    onCreateMirimSchool({
      denomination: newDenom,
      name: trimmedName,
      calledName: trimmedName,
      abbreviation: newAbbrev.trim() || trimmedName.slice(0, 14),
      motherSchoolId: mother?.id,
      motherSchoolName: mother ? cleanSchoolName(mother.name) : undefined,
      isSocialProject: newIsSocial,
      neighborhood: newNeighborhood.trim() || 'Rio de Janeiro',
      city: newCity.trim() || 'Rio de Janeiro',
      foundationYear: currentYear,
      foundationDate: `Carnaval de ${currentYear}`,
      colors: [newPrimaryColor, newSecondaryColor],
      colorsDescription: newColorsDesc.trim() || 'Cores oficiais',
      symbol: newSymbol.trim() || 'Símbolo da nova geração do samba',
      symbolEmoji: newEmoji || '🥁',
      flagConfig: {
        primaryColor: newPrimaryColor,
        secondaryColor: newSecondaryColor,
        accentColor: '#facc15',
        pattern: newPattern,
        emblemStyle: newEmblem,
        symbolEmoji: newEmoji || '🥁',
        abbreviation: (newAbbrev.trim() || trimmedName).slice(0, 10).toUpperCase(),
        foundationYear: currentYear,
        schoolName: trimmedName,
        denomination: newDenom,
        showBanner: true,
      },
      initialEnredoTitle: newEnredoTitle.trim(),
      initialEnredoSynopsis: newEnredoSynopsis.trim(),
      initialEnredoThemeType: newEnredoTheme,
    });

    setShowCreateModal(false);
  };

  // Lista unificada de talentos para a aba Formação de Talentos
  const allTalents = useMemo(() => {
    const items: Array<{
      mirim: MirimSchool;
      talent: MirimSchool['talents'][number];
      canPlayerPromote: boolean;
    }> = [];

    for (const mirim of mirimSchools) {
      for (const talent of mirim.talents) {
        if (talent.graduatedYear) continue;
        // Jogador pode promover talentos prontos da própria escola mirim ou acolher talentos de Projetos Sociais da LIESA
        const canPlayerPromote =
          !isSpectatorMode &&
          !!playerSchool &&
          talent.readyToGraduate &&
          (mirim.motherSchoolId === playerSchool.id || mirim.isSocialProject);

        items.push({ mirim, talent, canPlayerPromote });
      }
    }

    return items.sort((a, b) => {
      if (a.canPlayerPromote && !b.canPlayerPromote) return -1;
      if (!a.canPlayerPromote && b.canPlayerPromote) return 1;
      if (a.talent.readyToGraduate && !b.talent.readyToGraduate) return -1;
      if (!a.talent.readyToGraduate && b.talent.readyToGraduate) return 1;
      return b.talent.potential - a.talent.potential;
    });
  }, [mirimSchools, isSpectatorMode, playerSchool]);

  const playerCompliance = useMemo(
    () => (playerSchool ? especialCompliance.find((c) => c.schoolId === playerSchool.id) : undefined),
    [especialCompliance, playerSchool]
  );

  return (
    <div className="space-y-6 pb-10">
      {/* Cabeçalho Editorial & Ações */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            Categoria de Base · Gestão LIESA · Carnaval {currentYear}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Escolas de Samba Mirins
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Formação de novos talentos, preservação cultural e desfiles oficiais não julgados no
            Sambódromo da Marquês de Sapucaí.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {playerSchool && !playerMirim && (
            <button
              onClick={() => openCreateModalForPlayer(true)}
              className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Fundar Mirim da {playerSchool.shortName || cleanSchoolName(playerSchool.name)}
            </button>
          )}
          <button
            onClick={() => openCreateModalForPlayer(false)}
            className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-100 font-medium text-sm flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            Criar Escola Mirim
          </button>
        </div>
      </div>

      {/* Alerta da Regra Obrigatória do Grupo Especial (2 anos) */}
      {(playerCompliance && !playerCompliance.hasMirim) || especialWithoutMirim.length > 0 ? (
        <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-semibold text-amber-200">
                Regra Obrigatória do Grupo Especial (Prazo Máximo de 2 Anos)
              </h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Toda agremiação da elite precisa manter uma Escola de Samba Mirim.{' '}
                {especialWithoutMirim.map((c) => (
                  <span key={c.schoolId} className="font-semibold text-white">
                    {c.schoolName} (Ano {c.yearsInEspecialWithoutMirim} de {c.maxYearsAllowed})
                  </span>
                ))}
                {' '}— caso não crie até o fim do 2º ano, a LIESA oficializará automaticamente sua escola mirim.
              </p>
            </div>
          </div>
          {playerCompliance && !playerCompliance.hasMirim && (
            <button
              onClick={() => openCreateModalForPlayer(true)}
              className="shrink-0 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
            >
              Fundar Agora
            </button>
          )}
        </div>
      ) : null}

      {/* Faixa de Indicadores (KPIs) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Agremiações Mirins</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums mt-1.5">{stats.total}</div>
          <div className="text-xs text-slate-400 mt-1">
            {stats.linkedCount} vinculadas · {stats.socialCount} projetos sociais
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Jovens em Formação</span>
            <GraduationCap className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums mt-1.5">
            {stats.totalYouth.toLocaleString('pt-BR')}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {stats.readyTalents} talentos prontos para subir
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Desfiles na Sapucaí</span>
            <Calendar className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums mt-1.5">
            {stats.paradedCount}/{stats.total}
          </div>
          <div className="text-xs text-slate-400 mt-1">4 dias oficiais · Sem julgamento</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Grupo Especial Regular</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums mt-1.5">
            {especialCompliance.filter((c) => c.hasMirim).length}/{especialCompliance.length}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {especialWithoutMirim.length === 0
              ? '100% com escola mirim ativa'
              : `${especialWithoutMirim.length} em prazo de criação`}
          </div>
        </div>
      </div>

      {/* Navegação Interna */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        {(
          [
            { id: 'catalogo', label: 'Catálogo & Base', icon: BookOpen },
            { id: 'desfile', label: 'Desfile na Sapucaí (LIESA)', icon: Calendar },
            { id: 'talentos', label: 'Formação de Talentos', icon: GraduationCap },
            { id: 'regulamento', label: 'Regulamento & Verbas', icon: Coins },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const active = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                active
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ==================== ABA 1: CATÁLOGO & BASE ==================== */}
      {subTab === 'catalogo' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { id: 'all', label: `Todas (${stats.total})` },
                  { id: 'vinculadas', label: `Escolas-Mães (${stats.linkedCount})` },
                  { id: 'sociais', label: `Projetos Sociais LIESA (${stats.socialCount})` },
                  ...(playerMirim ? [{ id: 'minha' as const, label: 'Minha Base' }] : []),
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  onClick={() => setCatalogFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    catalogFilter === f.id
                      ? 'bg-slate-100 text-slate-950 font-semibold'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar escola mirim, mãe ou bairro..."
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredMirims.map((mirim) => {
              const isPlayers = !isSpectatorMode && mirim.motherSchoolId === playerSchoolId;
              const readyCount = mirim.talents.filter(
                (t) => t.readyToGraduate && !t.graduatedYear
              ).length;

              return (
                <div
                  key={mirim.id}
                  onClick={() => setSelectedMirimId(mirim.id)}
                  className={`bg-slate-900 border rounded-xl p-4 hover:border-amber-500/60 transition-colors cursor-pointer flex flex-col justify-between gap-3 ${
                    isPlayers ? 'border-amber-500/70' : 'border-slate-800'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-12 shrink-0 rounded-md overflow-hidden border border-slate-700">
                        <SchoolFlag config={mirim.flagConfig} compact className="w-full h-full" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white truncate">
                            {mirim.calledName}
                          </h3>
                          {isPlayers && (
                            <span className="text-[11px] font-semibold text-amber-400 shrink-0">
                              Sua Base
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">
                          {mirim.denomination} ·{' '}
                          {mirim.isSocialProject
                            ? 'Projeto Social (Verba LIESA)'
                            : `Escola-mãe: ${mirim.motherSchoolName}`}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400">
                          <div className="flex items-center gap-1">
                            {mirim.colors.slice(0, 3).map((hex, i) => (
                              <span
                                key={i}
                                className="w-2.5 h-2.5 rounded-full border border-slate-600 inline-block"
                                style={{ backgroundColor: hex }}
                              />
                            ))}
                          </div>
                          <span className="truncate">
                            {mirim.neighborhood ? `${mirim.neighborhood} · ` : ''}
                            {mirim.city}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-800/80 pt-2.5">
                      <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                        Enredo {mirim.currentEnredo.year} · {mirim.currentEnredo.themeType}
                      </div>
                      <p className="text-xs font-medium text-slate-200 mt-0.5 line-clamp-2">
                        {mirim.currentEnredo.title}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-800/80 pt-2.5 flex items-center justify-between text-xs text-slate-400">
                    <span className="tabular-nums">
                      Verba: <strong className="text-slate-200">{formatCurrency(mirim.annualGrant)}</strong>
                    </span>
                    <span className="tabular-nums">
                      {readyCount > 0 ? (
                        <span className="text-emerald-400 font-semibold">
                          {readyCount} talento{readyCount > 1 ? 's' : ''} pronto{readyCount > 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span>Base Nv. {mirim.academyLevel}</span>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================== ABA 2: DESFILE NA SAPUCAÍ (LIESA) ==================== */}
      {subTab === 'desfile' && (
        <div className="space-y-5">
          {/* Bloqueio de Calendário: só libera em Fevereiro (Mês do Carnaval) */}
          {!isCarnavalMonth ? (
            <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h2 className="text-sm font-bold text-amber-200">
                    Desfiles Mirins Bloqueados · Aguardando o Mês do Carnaval (Fevereiro)
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                    Você está atualmente em <strong className="text-white">{currentPeriod.name}</strong> ({currentPeriod.activityTitle}). Os desfiles das Escolas Mirins não podem ser assistidos nem simulados antes da data oficial do Carnaval em <strong className="text-white">Fevereiro</strong>, quando abrem a programação na Marquês de Sapucaí antes das escolas adultas.
                  </p>
                </div>
              </div>
              {onOpenSeasonCycleModal && (
                <button
                  onClick={onOpenSeasonCycleModal}
                  className="shrink-0 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Abrir Calendário da Temporada
                </button>
              )}
            </div>
          ) : stats.paradedCount === stats.total ? (
            <div className="bg-emerald-950/35 border border-emerald-500/40 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h2 className="text-sm font-bold text-emerald-200">
                    Desfiles das Escolas Mirins Concluídos · Passarela Adulta Liberada!
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Todas as {stats.total} agremiações mirins brilharam na Marquês de Sapucaí (sem julgamento). Os desfiles das escolas grandes (Especial, Ouro, Prata, Bronze e Avaliação) já estão desbloqueados!
                  </p>
                </div>
              </div>
              {onNavigateToAdultDesfile && (
                <button
                  onClick={onNavigateToAdultDesfile}
                  className="shrink-0 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Ir para Desfiles das Escolas Adultas</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <div className="bg-slate-900 border border-amber-500/40 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Abertura Oficial do Carnaval {currentYear} · Desfiles Mirins (LIESA)
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                  Assista ou simule primeiro as apresentações das <strong className="text-white">{stats.total} Escolas Mirins</strong> na Marquês de Sapucaí (sem julgamento) para liberar os desfiles das escolas grandes (Especial, Ouro, Prata, Bronze e Avaliação).
                </p>
              </div>

              <button
                onClick={onSimulateAllParades}
                className="shrink-0 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-semibold transition-colors cursor-pointer"
              >
                Simular Todos os Desfiles Mirins
              </button>
            </div>
          )}

          <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <span>
              4 dias oficiais LIESA na Sapucaí · 8 escolas nos Ensaios Técnicos (31/01, 1º/02 e 08/02 às 18h) + {Math.max(0, stats.total - 8)} escolas na Sexta-feira · <strong className="text-slate-200">Sem julgamento nem notas</strong>
            </span>
            <span className="font-mono tabular-nums text-slate-300">
              Progresso: {stats.paradedCount}/{stats.total}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {PARADE_SLOTS_ORDER.map((slotMeta) => {
              const daySchools = mirimSchools
                .filter((m) => m.paradeSchedule.slotId === slotMeta.slotId)
                .sort((a, b) => a.paradeSchedule.orderInDay - b.paradeSchedule.orderInDay);

              const allDone =
                daySchools.length > 0 && daySchools.every((m) => m.paradeSchedule.completed);

              return (
                <div
                  key={slotMeta.slotId}
                  className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col"
                >
                  <div className="px-4 py-3.5 border-b border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-bold text-white">{slotMeta.shortLabel}</div>
                      <div className="text-xs text-slate-400">
                        {slotMeta.subtitle} · {daySchools.length} escola
                        {daySchools.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <button
                      onClick={() => onSimulateParadeDay(slotMeta.slotId)}
                      disabled={!isCarnavalMonth || allDone || daySchools.length === 0}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        allDone
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-700/50 cursor-default'
                          : !isCarnavalMonth
                          ? 'bg-slate-800/80 text-slate-500 border border-slate-700 cursor-not-allowed'
                          : 'bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-100 cursor-pointer'
                      }`}
                    >
                      {!isCarnavalMonth && !allDone && <Lock className="w-3.5 h-3.5" />}
                      <span>
                        {allDone
                          ? 'Realizado'
                          : !isCarnavalMonth
                          ? 'Liberado em Fevereiro'
                          : 'Simular Dia'}
                      </span>
                    </button>
                  </div>

                  <div className="divide-y divide-slate-800/70">
                    {daySchools.map((m, idx) => (
                      <div
                        key={m.id}
                        className="px-4 py-3 hover:bg-slate-800/30 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div
                            onClick={() => setSelectedMirimId(m.id)}
                            className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
                          >
                            <span className="text-xs font-mono text-slate-500 w-5 shrink-0 tabular-nums">
                              {idx + 1}ª
                            </span>
                            <div className="w-9 h-6 shrink-0 rounded overflow-hidden border border-slate-700">
                              <SchoolFlag config={m.flagConfig} compact className="w-full h-full" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-white truncate">
                                {m.calledName}
                              </div>
                              <div className="text-xs text-slate-400 truncate">
                                {m.currentEnredo.title}
                              </div>
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center gap-2">
                            {m.paradeSchedule.completed ? (
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Desfilou
                              </span>
                            ) : isCarnavalMonth ? (
                              <button
                                onClick={() => handleOpenWatchMirim(m)}
                                className="px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                Assistir
                              </button>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                                <Lock className="w-3 h-3" />
                                Fevereiro
                              </span>
                            )}
                          </div>
                        </div>

                        {m.paradeSchedule.completed && m.paradeSchedule.highlightNote && (
                          <p className="text-xs text-slate-400 mt-1.5 pl-8 italic">
                            “{m.paradeSchedule.highlightNote}”
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================== ABA 3: FORMAÇÃO DE TALENTOS ==================== */}
      {subTab === 'talentos' && (
        <div className="space-y-5">
          {playerSchool && playerMirim && (
            <div className="bg-slate-900 border border-amber-500/40 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-16 h-11 rounded-md overflow-hidden border border-slate-700 shrink-0">
                  <SchoolFlag config={playerMirim.flagConfig} compact className="w-full h-full" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Sua Categoria de Base
                  </div>
                  <h3 className="text-base font-bold text-white">{playerMirim.calledName}</h3>
                  <p className="text-xs text-slate-400 mt-0.5 tabular-nums">
                    Estrutura Nível {playerMirim.academyLevel}/5 · {playerMirim.youthSquadSize}{' '}
                    integrantes · Verba anual {formatCurrency(playerMirim.annualGrant)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => onInvestAcademy(playerMirim.id, playerSchool.id)}
                  disabled={playerMirim.academyLevel >= 5}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                    playerMirim.academyLevel >= 5
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  {playerMirim.academyLevel >= 5
                    ? 'Base no Nível Máximo'
                    : `Investir na Base (${formatCurrency(playerMirim.academyLevel * 120000)})`}
                </button>
              </div>
            </div>
          )}

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3.5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-bold text-white">
                  Jovens Talentos das Escolas Mirins ({allTalents.length})
                </h2>
                <p className="text-xs text-slate-400">
                  Jovens com 17+ anos podem ser promovidos à escola-mãe ou recrutados de Projetos
                  Sociais LIESA para reforçar quesitos do elenco principal.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
                    <th className="py-2.5 px-4 font-semibold">Talento</th>
                    <th className="py-2.5 px-4 font-semibold">Escola Mirim</th>
                    <th className="py-2.5 px-4 font-semibold">Função · Quesito</th>
                    <th className="py-2.5 px-4 font-semibold text-center">Idade</th>
                    <th className="py-2.5 px-4 font-semibold text-center">Potencial</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Status / Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 text-sm">
                  {allTalents.map(({ mirim, talent, canPlayerPromote }) => (
                    <tr key={talent.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4 font-medium text-white">{talent.name}</td>
                      <td className="py-3 px-4">
                        <div className="text-slate-200 text-xs font-medium">{mirim.calledName}</div>
                        <div className="text-[11px] text-slate-500">
                          {mirim.isSocialProject
                            ? 'Projeto Social · LIESA'
                            : mirim.motherSchoolName}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-xs text-slate-200">{talent.roleLabel}</div>
                        <div className="text-[11px] text-slate-500">
                          Reforça {QUESITO_LABELS[talent.targetQuesito]}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center text-xs text-slate-300 tabular-nums">
                        {talent.age} anos
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`text-xs font-bold tabular-nums ${
                            talent.potential >= 90
                              ? 'text-amber-400'
                              : talent.potential >= 84
                              ? 'text-emerald-400'
                              : 'text-slate-300'
                          }`}
                        >
                          {talent.potential}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {canPlayerPromote && playerSchool ? (
                          <button
                            onClick={() =>
                              onPromoteTalent(mirim.id, talent.id, playerSchool.id)
                            }
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                          >
                            {mirim.isSocialProject ? 'Acolher na Escola' : 'Promover p/ Principal'}
                          </button>
                        ) : talent.readyToGraduate ? (
                          <span className="text-xs text-emerald-400 font-medium">
                            Pronto p/ {mirim.isSocialProject ? 'Mercado' : mirim.motherSchoolName}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-500">Em formação na base</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==================== ABA 4: REGULAMENTO & VERBAS LIESA ==================== */}
      {subTab === 'regulamento' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Conformidade Grupo Especial */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3.5 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white">
                Obrigatoriedade no Grupo Especial ({currentYear})
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Toda escola da elite deve manter uma escola mirim. Escolas recém-promovidas sem
                mirim têm até {MIRIM_MAX_ESPECIAL_YEARS_WITHOUT_MIRIM} anos para criar uma
                obrigatoriamente.
              </p>
            </div>

            <div className="divide-y divide-slate-800/70">
              {especialCompliance.map((row) => (
                <div
                  key={row.schoolId}
                  className="px-4 py-3 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-sm font-semibold text-white">{row.schoolName}</div>
                    <div className="text-xs text-slate-400">
                      {row.hasMirim
                        ? `Mirim vinculada: ${row.mirimName}`
                        : `Sem escola mirim · Ano ${row.yearsInEspecialWithoutMirim} de ${row.maxYearsAllowed}`}
                    </div>
                  </div>
                  <div className="shrink-0">
                    {row.hasMirim ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        {row.status === 'criada_automaticamente' ? 'Criada (Regra 2 anos)' : 'Regular'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                        <ShieldAlert className="w-4 h-4" />
                        {row.status === 'prazo_final_ano_2'
                          ? 'Criação obrigatória na virada'
                          : 'Prazo: 1 ano restante'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financiamento e Projetos Sociais */}
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Coins className="w-4 h-4 text-amber-400" />
                Origem das Verbas Anuais
              </div>
              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <div className="border-l-2 border-amber-500 pl-3">
                  <div className="font-semibold text-white">Departamentos Mirins (Escolas-Mães)</div>
                  <p className="text-slate-400 mt-0.5">
                    Recebem repasses anuais diretamente de suas escolas-mães para custear fantasias,
                    oficinas musicais e enredos próprios.
                  </p>
                </div>
                <div className="border-l-2 border-emerald-500 pl-3">
                  <div className="font-semibold text-white">Projetos Sociais Independentes (LIESA)</div>
                  <p className="text-slate-400 mt-0.5">
                    Escolas mirins sem escola-mãe atuam como projetos sociais comunitários e recebem
                    verba anual garantida diretamente pela LIESA.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <HeartHandshake className="w-4 h-4 text-emerald-400" />
                Projetos Sociais Mantidos pela LIESA
              </div>
              <div className="divide-y divide-slate-800/70">
                {mirimSchools
                  .filter((m) => m.isSocialProject)
                  .map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setSelectedMirimId(m.id)}
                      className="py-2 flex items-center justify-between gap-2 cursor-pointer hover:text-amber-300"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white truncate">
                          {m.calledName}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {m.neighborhood || m.city}
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-emerald-400 tabular-nums shrink-0">
                        {formatCurrency(m.annualGrant)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL DE DETALHES DA ESCOLA MIRIM ==================== */}
      {selectedMirim && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedMirimId(null)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[88vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-800 flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-20 h-14 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                  <SchoolFlag config={selectedMirim.flagConfig} compact className="w-full h-full" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    {selectedMirim.denomination}
                  </div>
                  <h2 className="text-xl font-bold text-white">{selectedMirim.calledName}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedMirim.corporateName}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMirimId(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                aria-label="Fechar ficha"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Ficha Cadastral */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
                  <div className="text-slate-500">Vínculo & Financiamento</div>
                  <div className="text-slate-100 font-semibold mt-1">
                    {selectedMirim.isSocialProject
                      ? 'Projeto Social Independente (Verba LIESA)'
                      : `Departamento Mirim · ${selectedMirim.motherSchoolName}`}
                  </div>
                  <div className="text-emerald-400 font-semibold tabular-nums mt-1">
                    Verba anual: {formatCurrency(selectedMirim.annualGrant)}
                  </div>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
                  <div className="text-slate-500">Fundação & Localidade</div>
                  <div className="text-slate-100 font-semibold mt-1">
                    {selectedMirim.foundationDate || selectedMirim.foundationYear || 'Registro LIESA'}
                  </div>
                  <div className="text-slate-400 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {selectedMirim.neighborhood ? `${selectedMirim.neighborhood}, ` : ''}
                    {selectedMirim.city}
                  </div>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
                  <div className="text-slate-500">Cores Oficiais</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    {selectedMirim.colors.map((c, idx) => (
                      <span
                        key={idx}
                        className="w-4 h-4 rounded-full border border-slate-600"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                    <span className="text-slate-100 font-medium">
                      {selectedMirim.colorsDescription}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
                  <div className="text-slate-500">Símbolo Oficial</div>
                  <div className="text-slate-100 font-medium mt-1">
                    {selectedMirim.symbolEmoji} {selectedMirim.symbol}
                  </div>
                </div>
              </div>

              {/* Enredo Atual & Agenda Sapucaí */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-semibold uppercase tracking-wider text-amber-400">
                    Enredo Próprio · Carnaval {selectedMirim.currentEnredo.year}
                  </span>
                  <span className="text-slate-400">{selectedMirim.currentEnredo.themeType}</span>
                </div>
                <div className="text-base font-bold text-white">
                  {selectedMirim.currentEnredo.title}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedMirim.currentEnredo.synopsis}
                </p>
                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                  <span>
                    Sapucaí: <strong className="text-slate-200">{selectedMirim.paradeSchedule.dateLabel}</strong> às{' '}
                    {selectedMirim.paradeSchedule.timeLabel}
                  </span>
                  <span>
                    {selectedMirim.paradeSchedule.completed
                      ? 'Apresentação realizada (sem notas)'
                      : 'Desfile festivo · Sem julgamento'}
                  </span>
                </div>
              </div>

              {/* Talentos da Base */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Jovens Talentos em Formação (Base Nível {selectedMirim.academyLevel}/5 ·{' '}
                  {selectedMirim.youthSquadSize} componentes)
                </h3>
                <div className="space-y-2">
                  {selectedMirim.talents.map((t) => {
                    const canPromote =
                      !isSpectatorMode &&
                      !!playerSchool &&
                      t.readyToGraduate &&
                      !t.graduatedYear &&
                      (selectedMirim.motherSchoolId === playerSchool.id ||
                        selectedMirim.isSocialProject);

                    return (
                      <div
                        key={t.id}
                        className="bg-slate-950/50 border border-slate-800 rounded-lg px-3.5 py-2.5 flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="text-sm font-semibold text-white">
                            {t.name}{' '}
                            <span className="text-xs font-normal text-slate-400">
                              · {t.age} anos
                            </span>
                          </div>
                          <div className="text-xs text-slate-400">
                            {t.roleLabel} · {QUESITO_LABELS[t.targetQuesito]} · Potencial{' '}
                            <strong className="text-amber-400 tabular-nums">{t.potential}</strong>
                          </div>
                        </div>
                        {t.graduatedYear ? (
                          <span className="text-xs text-emerald-400 font-medium">
                            Promovido ({t.graduatedYear}) → {t.graduatedToSchoolName}
                          </span>
                        ) : canPromote && playerSchool ? (
                          <button
                            onClick={() =>
                              onPromoteTalent(selectedMirim.id, t.id, playerSchool.id)
                            }
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer"
                          >
                            Promover
                          </button>
                        ) : (
                          <span className="text-xs text-slate-500">
                            {t.readyToGraduate ? 'Pronto p/ subir' : 'Em formação'}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Histórico de Enredos */}
              {selectedMirim.enredoHistory.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Histórico de Enredos Mirins
                  </h3>
                  <div className="divide-y divide-slate-800/70 bg-slate-950/40 border border-slate-800 rounded-lg">
                    {[...selectedMirim.enredoHistory].reverse().map((enr) => (
                      <div key={enr.year} className="px-3.5 py-2 flex items-center justify-between gap-3 text-xs">
                        <span className="font-mono text-amber-400 shrink-0">{enr.year}</span>
                        <span className="text-slate-200 flex-1">{enr.title}</span>
                        <span className="text-slate-500 shrink-0">{enr.themeType}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL DE CRIAÇÃO DE ESCOLA MIRIM ==================== */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Criar Escola de Samba Mirim</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Vincule a uma escola-mãe ou funde um Projeto Social com verba da LIESA.
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitCreateMirim} className="p-5 space-y-4">
              {formError && (
                <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2">
                  <Info className="w-4 h-4 shrink-0 text-rose-400" />
                  {formError}
                </div>
              )}

              {/* Vínculo: Escola-Mãe vs Projeto Social */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setNewIsSocial(false)}
                  className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                    !newIsSocial
                      ? 'bg-amber-500/10 border-amber-500 text-white'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">Departamento de Escola-Mãe</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Recebe verba anual da escola-mãe e forma talentos para ela.
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewIsSocial(true);
                    setNewMotherId('');
                  }}
                  className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                    newIsSocial
                      ? 'bg-emerald-500/10 border-emerald-500 text-white'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">Projeto Social Independente</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Sem escola-mãe · Recebe verba oficial direta da LIESA.
                  </div>
                </button>
              </div>

              {!newIsSocial && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Escola-Mãe (apenas escolas sem mirim vinculada)
                  </label>
                  <select
                    value={newMotherId}
                    onChange={(e) => {
                      const id = e.target.value;
                      setNewMotherId(id);
                      const found = adultSchools.find((s) => s.id === id);
                      if (found) {
                        if (!newName) setNewName(`Sementes da ${found.shortName || cleanSchoolName(found.name)}`);
                        if (found.colors?.primary) setNewPrimaryColor(found.colors.primary);
                        if (found.colors?.secondary) setNewSecondaryColor(found.colors.secondary);
                        if (found.neighborhood) setNewNeighborhood(found.neighborhood);
                      }
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="">Selecione a escola-mãe...</option>
                    {adultSchoolsWithoutMirim.map((s) => (
                      <option key={s.id} value={s.id}>
                        {cleanSchoolName(s.name)} ({s.division.toUpperCase()})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Denominação
                  </label>
                  <select
                    value={newDenom}
                    onChange={(e) => setNewDenom(e.target.value as MirimDenomination)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white"
                  >
                    <option value="G.R.C.E.S.M.">G.R.C.E.S.M.</option>
                    <option value="G.R.E.S.M.">G.R.E.S.M.</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Nome da Escola Mirim *
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Ex: Sementes de Botafogo"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Abreviação
                  </label>
                  <input
                    type="text"
                    value={newAbbrev}
                    onChange={(e) => setNewAbbrev(e.target.value)}
                    placeholder="Ex: Sementes"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Bairro</label>
                  <input
                    type="text"
                    value={newNeighborhood}
                    onChange={(e) => setNewNeighborhood(e.target.value)}
                    placeholder="Ex: Botafogo"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Cidade</label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white"
                  />
                </div>
              </div>

              {/* Cores, Símbolo e Prévia do Pavilhão */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center bg-slate-950/60 border border-slate-800 rounded-xl p-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={newPrimaryColor}
                      onChange={(e) => setNewPrimaryColor(e.target.value)}
                      className="w-9 h-9 rounded cursor-pointer bg-transparent"
                    />
                    <input
                      type="color"
                      value={newSecondaryColor}
                      onChange={(e) => setNewSecondaryColor(e.target.value)}
                      className="w-9 h-9 rounded cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={newEmoji}
                      onChange={(e) => setNewEmoji(e.target.value)}
                      maxLength={2}
                      className="w-12 px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-center text-base"
                      title="Ícone do pavilhão"
                    />
                  </div>
                  <input
                    type="text"
                    value={newColorsDesc}
                    onChange={(e) => setNewColorsDesc(e.target.value)}
                    placeholder="Ex: Azul e Branco"
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>

                <div className="space-y-2">
                  <select
                    value={newPattern}
                    onChange={(e) => setNewPattern(e.target.value as FlagPatternId)}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                  >
                    <option value="raios_16">Raios (16)</option>
                    <option value="faixa_diagonal">Faixa Diagonal</option>
                    <option value="faixas_horizontais">Faixas Horizontais</option>
                    <option value="losango">Losango</option>
                    <option value="bicolor_meio">Bicolor</option>
                    <option value="estrelas_espalhadas">Estrelas</option>
                  </select>
                  <select
                    value={newEmblem}
                    onChange={(e) => setNewEmblem(e.target.value as FlagEmblemStyle)}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                  >
                    <option value="circulo">Emblema Circular</option>
                    <option value="escudo">Escudo</option>
                    <option value="coroa">Coroa</option>
                    <option value="estrela">Estrela</option>
                    <option value="losango">Losango</option>
                  </select>
                </div>

                <div className="h-20 rounded-lg overflow-hidden border border-slate-700">
                  <SchoolFlag
                    compact
                    className="w-full h-full"
                    config={{
                      primaryColor: newPrimaryColor,
                      secondaryColor: newSecondaryColor,
                      accentColor: '#facc15',
                      pattern: newPattern,
                      emblemStyle: newEmblem,
                      symbolEmoji: newEmoji || '🥁',
                      abbreviation: (newAbbrev || newName || 'MIRIM').slice(0, 10).toUpperCase(),
                      foundationYear: currentYear,
                      schoolName: newName || 'Nova Mirim',
                      denomination: newDenom,
                      showBanner: true,
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Descrição do Símbolo
                </label>
                <input
                  type="text"
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value)}
                  placeholder="Ex: Um tamborim cercado por estrelas"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white"
                />
              </div>

              {/* Enredo Inaugural */}
              <div className="border-t border-slate-800 pt-3 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Enredo Próprio Inaugural ({currentYear})
                    </label>
                    <input
                      type="text"
                      value={newEnredoTitle}
                      onChange={(e) => setNewEnredoTitle(e.target.value)}
                      placeholder="Deixe vazio para gerar automaticamente"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Tema</label>
                    <select
                      value={newEnredoTheme}
                      onChange={(e) => setNewEnredoTheme(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white"
                    >
                      <option value="Lúdico">Lúdico</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Afro-brasileiro">Afro-brasileiro</option>
                      <option value="Ambiental & Natureza">Ambiental & Natureza</option>
                      <option value="Folclore & Lendas">Folclore & Lendas</option>
                      <option value="Histórico">Histórico</option>
                      <option value="Regional">Regional</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Sinopse do Enredo (opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={newEnredoSynopsis}
                    onChange={(e) => setNewEnredoSynopsis(e.target.value)}
                    placeholder="Descreva a proposta pedagógica e carnavalesca do desfile mirim..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-semibold cursor-pointer"
                >
                  Oficializar Escola Mirim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL AO VIVO: ASSISTIR DESFILE MIRIM NA SAPUCAÍ ==================== */}
      {watchingMirim && isCarnavalMonth && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => {
            setWatchingMirimId(null);
            setWatchPlaying(false);
          }}
        >
          <div
            className="bg-slate-900 border border-amber-500/50 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-800 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-16 h-11 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                  <SchoolFlag config={watchingMirim.flagConfig} compact className="w-full h-full" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                    Desfile Festivo Oficial LIESA · Sem Julgamento
                  </div>
                  <h2 className="text-lg font-bold text-white">{watchingMirim.calledName}</h2>
                  <p className="text-xs text-slate-400">
                    {watchingMirim.paradeSchedule.dateLabel} · Marquês de Sapucaí
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setWatchingMirimId(null);
                  setWatchPlaying(false);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                aria-label="Fechar transmissão"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-1.5">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                  Enredo na Avenida ({watchingMirim.currentEnredo.year})
                </div>
                <div className="text-sm font-bold text-white">
                  {watchingMirim.currentEnredo.title}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {watchingMirim.currentEnredo.synopsis}
                </p>
              </div>

              {/* Progresso na Sapucaí */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-amber-300">
                    {
                      MIRIM_SAPUCAI_SECTORS[
                        Math.min(
                          MIRIM_SAPUCAI_SECTORS.length - 1,
                          Math.floor((watchProgress / 100) * MIRIM_SAPUCAI_SECTORS.length)
                        )
                      ]
                    }
                  </span>
                  <span className="font-mono text-slate-300 tabular-nums">{watchProgress}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 transition-all duration-200"
                    style={{ width: `${watchProgress}%` }}
                  />
                </div>
                <div className="text-xs text-slate-400 flex items-center justify-between">
                  <span>{watchingMirim.youthSquadSize} crianças e adolescentes na passarela</span>
                  <span>Apresentação sem notas oficiais</span>
                </div>
              </div>

              {/* Controles */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setWatchPlaying((p) => !p)}
                    disabled={watchProgress >= 100}
                    className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                  >
                    {watchPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    {watchPlaying ? 'Pausar' : 'Continuar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setWatchFast((f) => !f)}
                    disabled={watchProgress >= 100}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-40 ${
                      watchFast
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <FastForward className="w-3.5 h-3.5" />
                    {watchFast ? '3x Ativo' : 'Acelerar'}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleFinishWatchingMirim}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {watchProgress >= 100 ? 'Concluir Desfile na Apoteose' : 'Encerrar e Registrar Desfile'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
