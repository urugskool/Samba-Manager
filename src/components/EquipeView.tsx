import React, { useState, useMemo } from 'react';
import { School, StaffMember } from '../types/carnaval';
import {
  CarnavalProfessional,
  ProfessionalRole,
  ProfessionalStatus,
  TransferEvent
} from '../types/professionals';
import { TransferMarketService } from '../services/transferMarketService';
import { SeasonMonthId } from '../types/seasonCycle';
import {
  Users,
  UserPlus,
  Star,
  Award,
  DollarSign,
  Check,
  ArrowRight,
  Split,
  Layers,
  MapPin,
  Newspaper,
  Sparkles,
  Zap,
  Info,
  Flame,
  Briefcase,
  Clock,
  Lock,
  Unlock,
  AlertTriangle,
  History,
  ShieldAlert,
  ArrowLeftRight,
  UserMinus,
  CheckCircle2,
  X,
  Crown
} from 'lucide-react';
import { soundService } from '../services/soundService';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import { getUnifiedTransferHistory, HistoricalTransferItem } from '../data/historicalTransfersData';

interface EquipeViewProps {
  school: School;
  allSchools?: School[];
  onUpdateSchool: (updatedSchool: School) => void;
  onUpdateAllSchools?: (updatedSchools: School[]) => void;
  onShowMessage: (msg: string, type?: 'info' | 'success' | 'warning' | 'alert') => void;
  onOpenNewsPortal?: () => void;
  onOpenTransferHistory?: () => void;
  currentYear?: number;
  currentSeasonMonth?: SeasonMonthId;
}

export const EquipeView: React.FC<EquipeViewProps> = ({
  school,
  allSchools = [],
  onUpdateSchool,
  onUpdateAllSchools,
  onShowMessage,
  onOpenNewsPortal,
  onOpenTransferHistory,
  currentYear = 2026,
  currentSeasonMonth = 'maio'
}) => {
  const [activeTab, setActiveTab] = useState<'mercado' | 'comissao' | 'historico'>('mercado');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSimulatingMarket, setIsSimulatingMarket] = useState<boolean>(false);
  const [selectedProfForModal, setSelectedProfForModal] = useState<CarnavalProfessional | null>(null);

  // Status da Janela de Transferências
  const windowStatus = useMemo(() => {
    return TransferMarketService.getWindowStatus(currentSeasonMonth);
  }, [currentSeasonMonth]);

  // Carrega base de profissionais atualizada
  const professionals = useMemo(() => {
    return TransferMarketService.getAllProfessionals(allSchools);
  }, [allSchools]);

  // Histórico de transferências do save
  const transferHistory = useMemo(() => {
    return TransferMarketService.getTransferHistory();
  }, [professionals]);

  // Histórico unificado (1976 a 2026+ com marcos históricos)
  const unifiedTransfers = useMemo(() => {
    return getUnifiedTransferHistory(transferHistory);
  }, [transferHistory]);

  const staffRoles = [
    {
      key: 'carnavalesco',
      label: 'Carnavalesco',
      member: school.staff.carnavalesco,
      boostInfo: 'Enredo, Fantasias, Alegorias',
      allowDupla: true,
      description: 'Responsável pela concepção artística, pesquisa de enredo, maquetes e carros.'
    },
    {
      key: 'mestreBateria',
      label: 'Mestre de Bateria',
      member: school.staff.mestreBateria,
      boostInfo: 'Bateria & Ritmo',
      allowDupla: true,
      description: 'Comanda os ritmistas, cadência, afinação dos surdos e bossas/paradinhas.'
    },
    {
      key: 'interprete',
      label: 'Intérprete Oficial',
      member: school.staff.interprete,
      boostInfo: 'Samba-Enredo & Canto',
      allowDupla: true,
      description: 'Comanda o carro de som, puxa o samba e sustenta o canto da comunidade.'
    },
    {
      key: 'mestreSalaPortaBandeira',
      label: '1º Casal MS e PB',
      member: school.staff.mestreSalaPortaBandeira,
      boostInfo: 'Mestre-Sala e Porta-Bandeira',
      allowDupla: false,
      description: 'Conduz o pavilhão sagrado da escola com elegância, giro e harmonia.'
    },
    {
      key: 'coreografo',
      label: 'Coreógrafo Comissão',
      member: school.staff.coreografo,
      boostInfo: 'Comissão de Frente',
      allowDupla: false,
      description: 'Cria o impacto teatral e cênico na abertura do desfile perante os jurados.'
    },
    {
      key: 'harmonia',
      label: 'Diretor de Harmonia',
      member: school.staff.harmonia,
      boostInfo: 'Evolução & Harmonia',
      allowDupla: false,
      description: 'Cronometra a pista, alinha alas e evita buracos ou correrias na Sapucaí.'
    }
  ];

  // Filtro de mercado
  const filteredProfessionals = useMemo(() => {
    return professionals.filter((prof) => {
      const matchRole = selectedRoleFilter === 'all' || prof.role === selectedRoleFilter;
      const matchStatus =
        selectedStatusFilter === 'all' ||
        (selectedStatusFilter === 'free_agent' && prof.status === 'free_agent') ||
        (selectedStatusFilter === 'outra_cidade' && prof.status === 'outra_cidade') ||
        (selectedStatusFilter === 'destaque_acesso' && prof.status === 'destaque_acesso') ||
        (selectedStatusFilter === 'em_escola' && prof.status === 'em_escola');
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        prof.name.toLowerCase().includes(q) ||
        prof.reputation.toLowerCase().includes(q) ||
        prof.originCity.toLowerCase().includes(q) ||
        (prof.currentSchoolName && prof.currentSchoolName.toLowerCase().includes(q));

      return matchRole && matchStatus && matchQuery;
    });
  }, [professionals, selectedRoleFilter, selectedStatusFilter, searchQuery]);

  // Contratação individual ou em dupla
  const handleHire = (prof: CarnavalProfessional, mode: 'solo' | 'dupla') => {
    if (!windowStatus.isOpen) {
      soundService.playBuzzer();
      onShowMessage(
        'Janela de transferências fechada! Contratações e quebras contratuais só podem ser homologadas na pré-temporada (Março a Junho).',
        'warning'
      );
      return;
    }

    const signingBonus = prof.signingBonus || Math.floor(prof.salary * 0.4);
    const buyoutClause =
      prof.currentSchoolId && prof.currentSchoolId !== school.id && prof.status === 'em_escola'
        ? prof.buyoutClause || Math.floor(prof.salary * 1.2)
        : 0;

    const totalCost = signingBonus + buyoutClause;

    if (school.budget < totalCost) {
      soundService.playBuzzer();
      onShowMessage(
        `Orçamento insuficiente! Você precisa de R$ ${totalCost.toLocaleString('pt-BR')} em caixa (${
          buyoutClause > 0
            ? `R$ ${buyoutClause.toLocaleString('pt-BR')} de multa rescisória para a ${prof.currentSchoolName} + R$ ${signingBonus.toLocaleString('pt-BR')} de luvas`
            : `R$ ${signingBonus.toLocaleString('pt-BR')} de luvas`
        }) para assinar com ${prof.name}.`,
        'warning'
      );
      return;
    }

    soundService.playGavel();

    const result = TransferMarketService.hireProfessional(
      school,
      prof,
      mode,
      currentYear,
      currentSeasonMonth,
      allSchools
    );

    onUpdateSchool(result.updatedSchool);

    if (onUpdateAllSchools && allSchools.length > 0) {
      const updatedAll = allSchools.map((s) => {
        if (s.id === school.id) return result.updatedSchool;
        if (result.previousSchoolUpdated && s.id === result.previousSchoolUpdated.id) {
          return result.previousSchoolUpdated;
        }
        return s;
      });
      onUpdateAllSchools(updatedAll);
    }

    setSelectedProfForModal(null);

    const message =
      buyoutClause > 0
        ? `Transferência Bombástica! A ${cleanSchoolName(school)} pagou a multa rescisória de R$ ${buyoutClause.toLocaleString('pt-BR')} à ${prof.currentSchoolName} e anunciou ${prof.name} como ${prof.roleName}! Matéria publicada no Folia News.`
        : mode === 'dupla'
        ? `Parceria oficial firmada! ${prof.name} formará uma grande dupla no elenco da ${cleanSchoolName(school)}! Matéria publicada no Folia News.`
        : `Contratação de peso! ${prof.name} assinou com a ${cleanSchoolName(school)} como ${prof.roleName}! Matéria publicada no Folia News.`;

    onShowMessage(message, 'success');
  };

  // Desfazer dupla para voo solo
  const handleSplitDupla = (roleKey: keyof typeof school.staff) => {
    const member = school.staff[roleKey];
    if (!member || !member.isDupla) return;

    soundService.playGavel();

    const firstName = member.name.split('&')[0].trim();
    const updatedMember: StaffMember = {
      ...member,
      name: firstName,
      isDupla: false,
      partnerName: undefined,
      rating: Math.max(70, member.rating - 1)
    };

    const updatedSchool: School = {
      ...school,
      staff: {
        ...school.staff,
        [roleKey]: updatedMember
      }
    };

    onUpdateSchool(updatedSchool);
    onShowMessage(
      `Parceria desfeita! ${firstName} assumirá projeto solo como ${member.roleName} da ${cleanSchoolName(school)}.`,
      'info'
    );
  };

  // Rescindir contrato com membro atual
  const handleReleaseMember = (roleKey: keyof typeof school.staff) => {
    if (!windowStatus.isOpen) {
      soundService.playBuzzer();
      onShowMessage(
        'Janela fechada! Rescisões contratuais devem ser feitas durante a janela de pré-temporada (Março a Junho).',
        'warning'
      );
      return;
    }

    const member = school.staff[roleKey];
    if (!member) return;

    soundService.playGavel();

    const result = TransferMarketService.releaseMember(
      school,
      roleKey,
      currentYear,
      currentSeasonMonth
    );

    onUpdateSchool(result.updatedSchool);
    if (onUpdateAllSchools && allSchools.length > 0) {
      const updatedAll = allSchools.map((s) => (s.id === school.id ? result.updatedSchool : s));
      onUpdateAllSchools(updatedAll);
    }

    onShowMessage(
      `Contrato rescindido com ${result.releasedProfessionalName}. O profissional agora é um Free Agent no mercado.`,
      'info'
    );
  };

  // Simular janela de transferências da liga (outras agremiações)
  const handleSimulateLeagueTransfers = () => {
    if (!windowStatus.isOpen) {
      soundService.playBuzzer();
      onShowMessage(
        'Janela fechada! As agremiações da Liga só negociam durante a pré-temporada (Março a Junho).',
        'warning'
      );
      return;
    }

    setIsSimulatingMarket(true);
    soundService.playLevelUp();

    setTimeout(() => {
      const result = TransferMarketService.simulateAITransfers(
        allSchools.length > 0 ? allSchools : [school],
        school.id,
        currentYear,
        currentSeasonMonth
      );

      if (onUpdateAllSchools && result.updatedSchools.length > 0) {
        onUpdateAllSchools(result.updatedSchools);
      }

      setIsSimulatingMarket(false);
      onShowMessage(
        `Mercado da Folia aquecido! ${result.generatedTransfers.length} grandes transferências foram concluídas entre agremiações da Liga com matérias no Folia News!`,
        'success'
      );
    }, 600);
  };

  const totalPayroll = Object.values(school.staff).reduce((acc, m) => acc + m.salary, 0);

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Transfer Window Status Banner */}
      <div
        className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
          windowStatus.isOpen
            ? 'bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500/30'
            : 'bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border-rose-500/30'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-xl border flex items-center justify-center shrink-0 ${
              windowStatus.isOpen
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                : 'bg-rose-500/20 border-rose-500/40 text-rose-400'
            }`}
          >
            {windowStatus.isOpen ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-[10px] uppercase font-black px-2 py-0.5 rounded ${
                  windowStatus.isOpen
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}
              >
                {windowStatus.isOpen ? 'Janela Aberta' : 'Janela Fechada'}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-bold text-white">{windowStatus.currentMonth}</span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">{windowStatus.deadlineName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          {windowStatus.isOpen ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <Clock className="w-3.5 h-3.5 animate-pulse" />
              <span>Contratações Livres</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold">
              <Lock className="w-3.5 h-3.5" />
              <span>Elencos Trancados</span>
            </div>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-400">
                TEMPORADA {currentYear}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-xs text-slate-400">Mercado de Transferências</span>
            </div>
            <h2 className="text-2xl font-black text-white">Mercado da Folia & Elenco Técnico</h2>
            <p className="text-xs text-slate-400">
              Contrate solo ou em duplas: carnavalescos, intérpretes, mestres e defensores do pavilhão para brigar pelo título.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          {onOpenNewsPortal && (
            <button
              onClick={onOpenNewsPortal}
              className="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md"
              title="Abrir o Portal de Notícias Voz da Passarela / Folia News"
            >
              <Newspaper className="w-4 h-4 text-amber-400" />
              <span>Ver Folia News</span>
            </button>
          )}

          <button
            onClick={handleSimulateLeagueTransfers}
            disabled={isSimulatingMarket || !windowStatus.isOpen}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black transition flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/20 disabled:opacity-40 disabled:cursor-not-allowed"
            title={
              windowStatus.isOpen
                ? 'Simular contratações e movimentações de carnavalescos, mestres e intérpretes na Liga'
                : 'Janela fechada no momento'
            }
          >
            <Zap className={`w-4 h-4 ${isSimulatingMarket ? 'animate-spin' : ''}`} />
            <span>{isSimulatingMarket ? 'Negociando na Liga...' : 'Agitar Mercado da Liga'}</span>
          </button>
        </div>
      </div>

      {/* Orçamento e Resumo de Folha */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-bold">Orçamento em Caixa</span>
            <span className="text-lg font-black text-emerald-400 font-mono">
              R$ {school.budget.toLocaleString('pt-BR')}
            </span>
          </div>
          <DollarSign className="w-6 h-6 text-emerald-500/40" />
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-bold">Folha Salarial Anual da Equipe</span>
            <span className="text-lg font-black text-white font-mono">
              R$ {totalPayroll.toLocaleString('pt-BR')}
            </span>
          </div>
          <Briefcase className="w-6 h-6 text-slate-500/40" />
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-bold">Moral da Torcida</span>
            <span className="text-lg font-black text-amber-400 font-mono">
              {school.fanBaseMorale}%
            </span>
          </div>
          <Flame className="w-6 h-6 text-amber-500/40" />
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('mercado')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'mercado'
              ? 'bg-amber-400 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <UserPlus className="w-4 h-4" />
          <span>Mercado de Transferências</span>
        </button>

        <button
          onClick={() => setActiveTab('comissao')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'comissao'
              ? 'bg-amber-400 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Comissão Técnica Atual ({cleanSchoolName(school)})</span>
        </button>

        <button
          onClick={() => setActiveTab('historico')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'historico'
              ? 'bg-amber-400 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Histórico de Transferências ({transferHistory.length})</span>
        </button>
      </div>

      {/* TAB 1: COMISSÃO TÉCNICA ATUAL */}
      {activeTab === 'comissao' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" />
                <span>Comissão Técnica Atual da {cleanSchoolName(school)}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Gerencie os contratos dos seus 6 segmentos estratégicos. Você pode rescindir contratos ou desmembrar duplas.
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-lg">
              6 de 6 cargos preenchidos
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {staffRoles.map((role) => {
              const isDupla = role.member.isDupla || role.member.name.includes('&');

              return (
                <div
                  key={role.key}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                          {role.label}
                        </span>
                        {isDupla && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold uppercase">
                            Dupla
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-black px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-mono">
                        Nota {role.member.rating}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white leading-tight">
                      {role.member.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 italic">
                      "{role.member.reputation}"
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Impacto: <strong className="text-slate-300">{role.boostInfo}</strong>
                    </p>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      {role.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Salário Anual:</span>
                      <span className="font-bold text-white font-mono">
                        R$ {role.member.salary.toLocaleString('pt-BR')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      {isDupla && role.allowDupla && (
                        <button
                          onClick={() => handleSplitDupla(role.key as keyof typeof school.staff)}
                          className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                          title="Desfazer parceria para deixar o profissional em voo solo"
                        >
                          <Split className="w-3.5 h-3.5 text-amber-400" />
                          <span>Voo Solo</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleReleaseMember(role.key as keyof typeof school.staff)}
                        disabled={!windowStatus.isOpen}
                        className="flex-1 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        title={
                          windowStatus.isOpen
                            ? 'Rescindir contrato amigavelmente com custo de 25% da folha'
                            : 'Janela fechada'
                        }
                      >
                        <UserMinus className="w-3.5 h-3.5" />
                        <span>Rescindir</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: MERCADO DE TRANSFERÊNCIAS */}
      {activeTab === 'mercado' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">
                  Mercado da Folia • Contratações & Transferências
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Contrate profissionais livres ou pague multas rescisórias para tirar carnavalescos, intérpretes e mestres de escolas rivais.
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nome, reputação, cidade..."
                className="w-full pl-3 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Role Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-500 mr-1">Função:</span>
            {[
              { id: 'all', label: 'Todos os Cargos' },
              { id: 'carnavalesco', label: 'Carnavalescos' },
              { id: 'mestreBateria', label: 'Mestres de Bateria' },
              { id: 'interprete', label: 'Intérpretes' },
              { id: 'mestreSalaPortaBandeira', label: 'Casais MS & PB' },
              { id: 'coreografo', label: 'Coreógrafos' },
              { id: 'harmonia', label: 'Diretores Harmonia' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedRoleFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedRoleFilter === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Origin / Status Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-500 mr-1">Situação:</span>
            {[
              { id: 'all', label: 'Todos os Status' },
              { id: 'free_agent', label: 'Agentes Livres (Sem Clube)' },
              { id: 'em_escola', label: 'Em Atividade (Com Multa Rescisória)' },
              { id: 'outra_cidade', label: 'Outras Cidades (São Paulo / Sul)' },
              { id: 'destaque_acesso', label: 'Destaques do Acesso' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatusFilter(tab.id)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition cursor-pointer ${
                  selectedStatusFilter === tab.id
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Professional Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {filteredProfessionals.length === 0 ? (
              <div className="col-span-full p-8 text-center text-slate-500 bg-slate-950/40 rounded-xl border border-slate-800">
                Nenhum profissional encontrado com os filtros selecionados.
              </div>
            ) : (
              filteredProfessionals.map((prof) => {
                const currentInSchool = Object.values(school.staff).find(
                  (s) => s.name === prof.name || s.id === prof.id
                );
                const isEmployedInUserSchool = Boolean(currentInSchool);

                const roleConfig = staffRoles.find((r) => r.key === prof.role);
                const canFormDupla = Boolean(roleConfig?.allowDupla && prof.willingToFormDupla);
                const signingBonus = prof.signingBonus || Math.floor(prof.salary * 0.4);

                const hasBuyout =
                  prof.status === 'em_escola' &&
                  prof.currentSchoolId &&
                  prof.currentSchoolId !== school.id;
                const buyoutClause = hasBuyout ? prof.buyoutClause || Math.floor(prof.salary * 1.2) : 0;
                const totalCost = signingBonus + buyoutClause;
                const canAfford = school.budget >= totalCost;

                return (
                  <div
                    key={prof.id}
                    className={`p-4 rounded-xl border flex flex-col justify-between transition space-y-3 ${
                      isEmployedInUserSchool
                        ? 'bg-emerald-500/10 border-emerald-500/30'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {prof.roleName}
                          </span>

                          {prof.status === 'free_agent' && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                              Livre no Mercado
                            </span>
                          )}
                          {hasBuyout && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold flex items-center gap-0.5">
                              <ShieldAlert className="w-2.5 h-2.5" /> Sob Contrato
                            </span>
                          )}
                          {prof.status === 'outra_cidade' && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold flex items-center gap-0.5">
                              <MapPin className="w-2.5 h-2.5" /> {prof.originCity}
                            </span>
                          )}
                          {prof.status === 'destaque_acesso' && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                              Destaque Acesso
                            </span>
                          )}
                        </div>

                        <span className="text-xs font-black text-amber-400 flex items-center gap-1 shrink-0 font-mono">
                          <Star className="w-3.5 h-3.5 fill-amber-400" /> Nota {prof.rating}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-white leading-tight">{prof.name}</h4>
                        <p className="text-xs text-slate-400 italic">"{prof.reputation}"</p>
                      </div>

                      {prof.bio && (
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                          {prof.bio}
                        </p>
                      )}

                      {prof.currentSchoolName && prof.status === 'em_escola' && (
                        <div className="flex items-center gap-1 text-[11px] text-slate-300 bg-slate-900/60 px-2 py-1 rounded border border-slate-800">
                          <span className="text-slate-500">Agremiação Atual:</span>
                          <strong className="text-amber-300">{prof.currentSchoolName}</strong>
                        </div>
                      )}

                      {prof.specialties && prof.specialties.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {prof.specialties.slice(0, 2).map((spec, i) => (
                            <span
                              key={i}
                              className="text-[9px] px-1.5 py-0.5 bg-slate-900 rounded text-slate-400 border border-slate-800"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-500 block">Salário Anual</span>
                          <span className="font-bold text-white font-mono">
                            R$ {prof.salary.toLocaleString('pt-BR')}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 block">
                            {hasBuyout ? 'Multa + Luvas' : 'Luvas de Assinatura'}
                          </span>
                          <span
                            className={`font-bold font-mono ${
                              canAfford ? 'text-amber-400' : 'text-rose-400'
                            }`}
                          >
                            R$ {totalCost.toLocaleString('pt-BR')}
                          </span>
                        </div>
                      </div>

                      {hasBuyout && (
                        <p className="text-[10px] text-rose-400/90 italic">
                          * Inclui multa rescisória de R$ {buyoutClause.toLocaleString('pt-BR')} para quebrar o vínculo com a {prof.currentSchoolName}.
                        </p>
                      )}

                      {isEmployedInUserSchool ? (
                        <div className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                          <Check className="w-4 h-4" />
                          <span>Contratado na Sua Escola</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => handleHire(prof, 'solo')}
                            disabled={!canAfford || !windowStatus.isOpen}
                            className={`flex-1 py-2 rounded-lg text-white font-bold text-xs transition cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed ${
                              hasBuyout ? 'bg-amber-600 hover:bg-amber-500' : 'bg-blue-600 hover:bg-blue-500'
                            }`}
                            title={
                              !windowStatus.isOpen
                                ? 'Janela de transferências fechada no momento'
                                : hasBuyout
                                ? `Pagar multa e contratar ${prof.name}`
                                : `Contratar ${prof.name} em voo solo`
                            }
                          >
                            {hasBuyout ? 'Pagar Multa & Contratar' : 'Contratar Solo'}
                          </button>

                          {canFormDupla && (
                            <button
                              onClick={() => handleHire(prof, 'dupla')}
                              disabled={!canAfford || !windowStatus.isOpen}
                              className="py-2 px-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition cursor-pointer shadow-md flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
                              title={`Formar dupla unindo ${prof.name} ao membro atual da escola`}
                            >
                              <Layers className="w-3.5 h-3.5" />
                              <span>Dupla</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 3: HISTÓRICO DE TRANSFERÊNCIAS */}
      {activeTab === 'historico' && (
        <div className="space-y-4">
          {/* Hero Banner da Central de Transferências */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/40">
                  <ArrowLeftRight className="w-4 h-4 text-blue-400" />
                </span>
                <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                  Histórico de Transferências do Carnaval Carioca
                </h3>
              </div>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Explore a dança das cadeiras de carnavalescos, mestres de bateria, intérpretes e casais de MS/PB desde 1976 até a temporada atual, com crônicas e títulos imediatos.
              </p>
            </div>

            {onOpenTransferHistory && (
              <button
                onClick={onOpenTransferHistory}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 shrink-0 cursor-pointer transition"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Abrir Central Completa (Dossiês & Linha do Tempo)</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
              </button>
            )}
          </div>

          {/* Container de Registros */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800 text-xs">
              <div>
                <h4 className="font-bold text-white flex items-center gap-2">
                  <History className="w-4 h-4 text-amber-400" />
                  <span>Movimentações Registradas ({unifiedTransfers.length})</span>
                </h4>
                <span className="text-[11px] text-slate-400">
                  {transferHistory.length} movimentações no save • {unifiedTransfers.length - transferHistory.length} registros históricos oficiais
                </span>
              </div>

              {onOpenTransferHistory && (
                <button
                  onClick={onOpenTransferHistory}
                  className="text-amber-400 hover:text-amber-300 font-bold underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver Linha do Tempo Filtrável</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="space-y-3">
              {unifiedTransfers.slice(0, 20).map((tr) => (
                <div
                  key={tr.id}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-slate-700 transition"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30 shrink-0">
                      <ArrowLeftRight className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-white">{tr.professionalName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold uppercase">
                          {tr.roleName}
                        </span>
                        {tr.wonTitleInFirstYear && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black flex items-center gap-1">
                            <Crown className="w-2.5 h-2.5" /> Campeão 1º Ano
                          </span>
                        )}
                        {tr.isHistoricalMilestone && !tr.wonTitleInFirstYear && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-bold">
                            Marco Histórico
                          </span>
                        )}
                        {tr.mode === 'dupla' && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-bold">
                            Formou Dupla
                          </span>
                        )}
                        {tr.buyoutPaid && tr.buyoutPaid > 0 && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 font-bold">
                            Multa Rescisória Paga
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 flex-wrap">
                        <span>De:</span>
                        <strong className="text-slate-300">
                          {cleanSchoolName(tr.previousSchoolName) || 'Sem Clube (Free Agent)'}
                        </strong>
                        <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                        <span>Para:</span>
                        <strong className="text-emerald-400">{cleanSchoolName(tr.newSchoolName)}</strong>
                      </div>

                      {tr.notes && (
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 font-sans">
                          {tr.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-slate-800">
                    <span className="text-[10px] font-mono font-bold text-amber-400 block">
                      {tr.dateStr || `Temporada ${tr.year}`}
                    </span>
                    {tr.valueSalary && tr.valueSalary > 0 && (
                      <span className="text-xs font-mono font-bold text-white">
                        Salário R$ {tr.valueSalary.toLocaleString('pt-BR')}
                      </span>
                    )}
                    {tr.buyoutPaid && tr.buyoutPaid > 0 && (
                      <span className="text-[10px] font-mono text-rose-400 block">
                        Multa: R$ {tr.buyoutPaid.toLocaleString('pt-BR')}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {unifiedTransfers.length > 20 && onOpenTransferHistory && (
              <div className="pt-2 text-center">
                <button
                  onClick={onOpenTransferHistory}
                  className="px-5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-amber-300 transition cursor-pointer"
                >
                  Ver todas as {unifiedTransfers.length} movimentações no Histórico Completo ➔
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
