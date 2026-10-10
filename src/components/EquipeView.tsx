import React, { useState, useMemo } from 'react';
import { School, StaffMember } from '../types/carnaval';
import { CarnavalProfessional, ProfessionalRole, ProfessionalStatus } from '../types/professionals';
import { TransferMarketService } from '../services/transferMarketService';
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
  Briefcase
} from 'lucide-react';
import { soundService } from '../services/soundService';
import { cleanSchoolName } from '../utils/schoolNameUtils';

interface EquipeViewProps {
  school: School;
  allSchools?: School[];
  onUpdateSchool: (updatedSchool: School) => void;
  onUpdateAllSchools?: (updatedSchools: School[]) => void;
  onShowMessage: (msg: string, type?: 'info' | 'success' | 'warning' | 'alert') => void;
  onOpenNewsPortal?: () => void;
  currentYear?: number;
}

export const EquipeView: React.FC<EquipeViewProps> = ({
  school,
  allSchools = [],
  onUpdateSchool,
  onUpdateAllSchools,
  onShowMessage,
  onOpenNewsPortal,
  currentYear = 2026
}) => {
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSimulatingMarket, setIsSimulatingMarket] = useState<boolean>(false);

  // Carrega base de profissionais atualizada
  const professionals = useMemo(() => {
    return TransferMarketService.getAllProfessionals(allSchools);
  }, [allSchools]);

  const staffRoles = [
    {
      key: 'carnavalesco',
      label: 'Carnavalesco',
      member: school.staff.carnavalesco,
      boostInfo: 'Enredo, Fantasias, Alegorias',
      allowDupla: true
    },
    {
      key: 'mestreBateria',
      label: 'Mestre de Bateria',
      member: school.staff.mestreBateria,
      boostInfo: 'Bateria & Ritmo',
      allowDupla: true
    },
    {
      key: 'interprete',
      label: 'Intérprete Oficial',
      member: school.staff.interprete,
      boostInfo: 'Samba-Enredo & Canto',
      allowDupla: true
    },
    {
      key: 'mestreSalaPortaBandeira',
      label: '1º Casal MS e PB',
      member: school.staff.mestreSalaPortaBandeira,
      boostInfo: 'Mestre-Sala e Porta-Bandeira',
      allowDupla: false
    },
    {
      key: 'coreografo',
      label: 'Coreógrafo Comissão',
      member: school.staff.coreografo,
      boostInfo: 'Comissão de Frente',
      allowDupla: false
    },
    {
      key: 'harmonia',
      label: 'Diretor de Harmonia',
      member: school.staff.harmonia,
      boostInfo: 'Evolução & Harmonia',
      allowDupla: false
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
    const signingBonus = prof.signingBonus || Math.floor(prof.salary * 0.4);

    if (school.budget < signingBonus) {
      soundService.playBuzzer();
      onShowMessage(
        `Orçamento insuficiente! Você precisa de R$ ${signingBonus.toLocaleString('pt-BR')} em caixa para pagar as luvas de contratação de ${prof.name}.`,
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
      'maio',
      allSchools
    );

    onUpdateSchool(result.updatedSchool);

    if (onUpdateAllSchools && allSchools.length > 0) {
      const updatedAll = allSchools.map((s) => (s.id === school.id ? result.updatedSchool : s));
      onUpdateAllSchools(updatedAll);
    }

    onShowMessage(
      mode === 'dupla'
        ? `Parceria oficial firmada! ${prof.name} formará uma grande dupla no elenco da ${cleanSchoolName(school)}! Matéria publicada no Folia News.`
        : `Contratação de peso! ${prof.name} assinou com a ${cleanSchoolName(school)} como ${prof.roleName}! Matéria publicada no Folia News.`,
      'success'
    );
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

  // Simular janela de transferências da liga (outras agremiações)
  const handleSimulateLeagueTransfers = () => {
    setIsSimulatingMarket(true);
    soundService.playLevelUp();

    setTimeout(() => {
      const result = TransferMarketService.simulateAITransfers(
        allSchools.length > 0 ? allSchools : [school],
        school.id,
        currentYear
      );

      if (onUpdateAllSchools && result.updatedSchools.length > 0) {
        onUpdateAllSchools(result.updatedSchools);
      }

      setIsSimulatingMarket(false);
      onShowMessage(
        `Mercado da Folia agitado! ${result.generatedTransfers.length} grandes transferências foram concluídas na Liga com matérias publicadas no Folia News!`,
        'success'
      );
    }, 600);
  };

  const totalPayroll = Object.values(school.staff).reduce((acc, m) => acc + m.salary, 0);

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
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
              <span className="text-xs text-slate-400">Janela de Transferências</span>
            </div>
            <h2 className="text-2xl font-black text-white">Equipe & Mercado da Folia</h2>
            <p className="text-xs text-slate-400">
              Contrate solo ou em duplas: carnavalescos, intérpretes, mestres e o time inteiro para brigar pelo título.
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
            disabled={isSimulatingMarket}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black transition flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/20 disabled:opacity-50"
            title="Simular contratações e movimentações das outras escolas da Liga"
          >
            <Zap className={`w-4 h-4 ${isSimulatingMarket ? 'animate-spin' : ''}`} />
            <span>{isSimulatingMarket ? 'Negociando na Liga...' : 'Simular Mercado da Liga'}</span>
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

      {/* Current Team Display */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400" />
            <span>Comissão Técnica Atual da {cleanSchoolName(school)}</span>
          </h3>
          <span className="text-xs text-slate-400">
            6 de 6 cargos preenchidos para a temporada {currentYear}
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
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Salário Anual:</span>
                    <span className="font-bold text-white font-mono">
                      R$ {role.member.salary.toLocaleString('pt-BR')}
                    </span>
                  </div>

                  {isDupla && role.allowDupla && (
                    <button
                      onClick={() => handleSplitDupla(role.key as keyof typeof school.staff)}
                      className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Desfazer parceria para deixar o profissional em voo solo"
                    >
                      <Split className="w-3.5 h-3.5 text-amber-400" />
                      <span>Desfazer Dupla (Voo Solo)</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mercado de Transferências & Contratações */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-bold text-white">Mercado da Folia • Contratações Disponíveis</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Contrate solo ou una forças em duplas com carnavalescos, cantores e mestres de bateria.
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
          <span className="text-[10px] uppercase font-bold text-slate-500 mr-1">Origem:</span>
          {[
            { id: 'all', label: 'Todos os Status' },
            { id: 'free_agent', label: 'Agentes Livres (Sem Clube)' },
            { id: 'outra_cidade', label: 'Outras Cidades (São Paulo / Sul)' },
            { id: 'destaque_acesso', label: 'Destaques do Acesso (Ouro/Prata)' },
            { id: 'em_escola', label: 'Atuando no Especial' }
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
                (s) => s.name === prof.name || (s.id === prof.id)
              );
              const isEmployedInUserSchool = Boolean(currentInSchool);

              const roleConfig = staffRoles.find((r) => r.key === prof.role);
              const canFormDupla = Boolean(roleConfig?.allowDupla && prof.willingToFormDupla);
              const signingBonus = prof.signingBonus || Math.floor(prof.salary * 0.4);
              const canAfford = school.budget >= signingBonus;

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
                            Free Agent
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
                      <p className="text-[10px] text-slate-500">
                        Atualmente em: <strong className="text-slate-300">{prof.currentSchoolName}</strong>
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Salário Anual</span>
                        <span className="font-bold text-white font-mono">
                          R$ {prof.salary.toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block">Luvas (Assinatura)</span>
                        <span className={`font-bold font-mono ${canAfford ? 'text-amber-400' : 'text-rose-400'}`}>
                          R$ {signingBonus.toLocaleString('pt-BR')}
                        </span>
                      </div>
                    </div>

                    {isEmployedInUserSchool ? (
                      <div className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                        <Check className="w-4 h-4" />
                        <span>Contratado na Sua Escola</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => handleHire(prof, 'solo')}
                          disabled={!canAfford}
                          className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                          title={`Contratar ${prof.name} em voo solo`}
                        >
                          Contratar Solo
                        </button>

                        {canFormDupla && (
                          <button
                            onClick={() => handleHire(prof, 'dupla')}
                            disabled={!canAfford}
                            className="py-2 px-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition cursor-pointer shadow-md flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
                            title={`Formar dupla unindo ${prof.name} ao membro atual da escola`}
                          >
                            <Layers className="w-3.5 h-3.5" />
                            <span>Formar Dupla</span>
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
    </div>
  );
};
