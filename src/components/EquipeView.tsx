import React, { useState } from 'react';
import { School, StaffMember } from '../types/carnaval';
import { AVAILABLE_STAFF_MARKET } from '../data/carnavalData';
import { Users, UserPlus, Star, Award, DollarSign, Check, ArrowRight } from 'lucide-react';
import { soundService } from '../services/soundService';

interface EquipeViewProps {
  school: School;
  onUpdateSchool: (updatedSchool: School) => void;
  onShowMessage: (msg: string, type?: 'info' | 'success' | 'warning' | 'alert') => void;
}

export const EquipeView: React.FC<EquipeViewProps> = ({
  school,
  onUpdateSchool,
  onShowMessage
}) => {
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');

  const staffRoles = [
    { key: 'carnavalesco', label: 'Carnavalesco', member: school.staff.carnavalesco, boostInfo: 'Enredo, Fantasias, Alegorias' },
    { key: 'mestreBateria', label: 'Mestre de Bateria', member: school.staff.mestreBateria, boostInfo: 'Bateria & Ritmo' },
    { key: 'interprete', label: 'Intérprete Oficial', member: school.staff.interprete, boostInfo: 'Samba-Enredo & Canto' },
    { key: 'mestreSalaPortaBandeira', label: '1º Casal MS e PB', member: school.staff.mestreSalaPortaBandeira, boostInfo: 'Mestre-Sala e Porta-Bandeira' },
    { key: 'coreografo', label: 'Coreógrafo Comissão', member: school.staff.coreografo, boostInfo: 'Comissão de Frente' },
    { key: 'harmonia', label: 'Diretor de Harmonia', member: school.staff.harmonia, boostInfo: 'Evolução & Harmonia' }
  ];

  const filteredMarket = AVAILABLE_STAFF_MARKET.filter(
    (member) => selectedRoleFilter === 'all' || member.role === selectedRoleFilter
  );

  const handleHireStaff = (newMember: StaffMember) => {
    const roleKey = newMember.role as keyof typeof school.staff;
    const currentMember = school.staff[roleKey];

    // Check budget for signing bonus (half salary)
    const signingBonus = Math.floor(newMember.salary * 0.4);
    if (school.budget < signingBonus) {
      onShowMessage(`Orçamento insuficiente para pagar as luvas de contratação de ${newMember.name} (R$ ${signingBonus.toLocaleString('pt-BR')})!`, 'warning');
      return;
    }

    soundService.playGavel();

    const updatedStaff = {
      ...school.staff,
      [roleKey]: newMember
    };

    // Calculate rating difference and boost school attribute
    const ratingDiff = newMember.rating - currentMember.rating;
    const updatedAttrs = { ...school.attributes };

    if (newMember.role === 'mestreBateria') {
      updatedAttrs.bateria = Math.min(99, Math.max(70, updatedAttrs.bateria + Math.ceil(ratingDiff / 2)));
    } else if (newMember.role === 'coreografo') {
      updatedAttrs.comissaoDeFrente = Math.min(99, Math.max(70, updatedAttrs.comissaoDeFrente + Math.ceil(ratingDiff / 2)));
    } else if (newMember.role === 'mestreSalaPortaBandeira') {
      updatedAttrs.mestreSalaPortaBandeira = Math.min(99, Math.max(70, updatedAttrs.mestreSalaPortaBandeira + Math.ceil(ratingDiff / 2)));
    } else if (newMember.role === 'interprete') {
      updatedAttrs.sambaEnredo = Math.min(99, Math.max(70, updatedAttrs.sambaEnredo + Math.ceil(ratingDiff / 2)));
    } else if (newMember.role === 'harmonia') {
      updatedAttrs.harmonia = Math.min(99, Math.max(70, updatedAttrs.harmonia + Math.ceil(ratingDiff / 2)));
    } else if (newMember.role === 'carnavalesco') {
      updatedAttrs.enredo = Math.min(99, Math.max(70, updatedAttrs.enredo + Math.ceil(ratingDiff / 3)));
      updatedAttrs.fantasias = Math.min(99, Math.max(70, updatedAttrs.fantasias + Math.ceil(ratingDiff / 3)));
    }

    const updatedSchool: School = {
      ...school,
      budget: school.budget - signingBonus,
      staff: updatedStaff,
      attributes: updatedAttrs,
      fanBaseMorale: Math.min(100, school.fanBaseMorale + (ratingDiff > 0 ? 4 : -2))
    };

    onUpdateSchool(updatedSchool);
    onShowMessage(
      `Grande contratação! ${newMember.name} foi anunciado como o novo ${newMember.roleName} da ${school.name}!`,
      'success'
    );
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Mercado do Samba • Equipe & Contratações</h2>
            <p className="text-xs text-slate-400">
              Monte uma comissão técnica de ouro para liderar as notas do carnaval.
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-slate-400 uppercase">Folha Salarial Anual</div>
          <div className="text-lg font-black text-white font-mono">
            R${' '}
            {Object.values(school.staff)
              .reduce((acc, m) => acc + m.salary, 0)
              .toLocaleString('pt-BR')}
          </div>
        </div>
      </div>

      {/* Current Team Display */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400" />
          <span>Equipe Atual da {school.name}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {staffRoles.map((role) => (
            <div
              key={role.key}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between space-y-2"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    {role.label}
                  </span>
                  <span className="text-xs font-black px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    Nota {role.member.rating}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mt-1">{role.member.name}</h4>
                <p className="text-[11px] text-slate-400 italic">"{role.member.reputation}"</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Salário Anual</span>
                <span className="font-bold text-white font-mono">
                  R$ {role.member.salary.toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mercado da Bola do Samba / Transfer Market */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Mercado de Transferências Disponível</h3>
          </div>

          {/* Role Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setSelectedRoleFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                selectedRoleFilter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedRoleFilter('carnavalesco')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                selectedRoleFilter === 'carnavalesco'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Carnavalescos
            </button>
            <button
              onClick={() => setSelectedRoleFilter('mestreBateria')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                selectedRoleFilter === 'mestreBateria'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Mestres de Bateria
            </button>
            <button
              onClick={() => setSelectedRoleFilter('interprete')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                selectedRoleFilter === 'interprete'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Intérpretes
            </button>
            <button
              onClick={() => setSelectedRoleFilter('mestreSalaPortaBandeira')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                selectedRoleFilter === 'mestreSalaPortaBandeira'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Casais MS & PB
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMarket.map((member) => {
            const isCurrentlyEmployed = Object.values(school.staff).some(
              (s) => s.name === member.name
            );

            return (
              <div
                key={member.id}
                className={`p-4 rounded-xl border flex flex-col justify-between transition ${
                  isCurrentlyEmployed
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {member.roleName}
                    </span>
                    <span className="text-xs font-black text-amber-400 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> Nota {member.rating}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white pt-1">{member.name}</h4>
                  <p className="text-xs text-slate-400 italic">"{member.reputation}"</p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 mt-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[10px] text-slate-500">Salário / Luvas</div>
                    <div className="font-bold text-white font-mono">
                      R$ {member.salary.toLocaleString('pt-BR')}
                    </div>
                  </div>

                  {isCurrentlyEmployed ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                      <Check className="w-3.5 h-3.5" /> Na Sua Escola
                    </span>
                  ) : (
                    <button
                      onClick={() => handleHireStaff(member)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs transition shadow-md shadow-blue-600/20"
                    >
                      Contratar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
