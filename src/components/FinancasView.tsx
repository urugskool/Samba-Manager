import React from 'react';
import { School } from '../types/carnaval';
import { Landmark, TrendingUp, DollarSign, Utensils, Award, Users, ShieldAlert } from 'lucide-react';
import { soundService } from '../services/soundService';

interface FinancasViewProps {
  school: School;
  onUpdateSchool: (updatedSchool: School) => void;
  onShowMessage: (msg: string, type?: 'info' | 'success' | 'warning' | 'alert') => void;
}

export const FinancasView: React.FC<FinancasViewProps> = ({
  school,
  onUpdateSchool,
  onShowMessage
}) => {
  const staffTotal = Object.values(school.staff).reduce((acc, m) => acc + m.salary, 0);

  const handleOrganizeFeijoada = () => {
    // Generate between 40k and 75k profit
    const profit = Math.floor(Math.random() * 35000) + 40000;
    soundService.playSurdoBeat(true);

    const updated: School = {
      ...school,
      budget: school.budget + profit,
      fanBaseMorale: Math.min(100, school.fanBaseMorale + 4)
    };

    onUpdateSchool(updated);
    onShowMessage(
      `Feijoada da ${school.name} foi um estouro de público! R$ ${profit.toLocaleString('pt-BR')} arrecadados e moral nas alturas!`,
      'success'
    );
  };

  const handleSignSponsor = (tier: 'local' | 'master') => {
    const revenue = tier === 'master' ? 350000 : 120000;
    soundService.playGavel();

    const updated: School = {
      ...school,
      budget: school.budget + revenue
    };

    onUpdateSchool(updated);
    onShowMessage(
      tier === 'master'
        ? `Contrato Master fechado! R$ ${revenue.toLocaleString('pt-BR')} creditados nos cofres da agremiação!`
        : `Patrocínio de ala assinado! R$ ${revenue.toLocaleString('pt-BR')} adicionados ao orçamento!`,
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
            <h2 className="text-2xl font-black text-white">Tesouraria & Finanças da Escola</h2>
            <p className="text-xs text-slate-400">
              Gerencie as contas da agremiação, feche patrocínios e promova eventos na quadra.
            </p>
          </div>
        </div>

        <div className="bg-slate-950/60 px-5 py-3 rounded-xl border border-slate-800 text-right">
          <div className="text-[10px] text-slate-400 uppercase">Saldo Disponível em Caixa</div>
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
            {school.division === 'especial' ? 'R$ 1.200.000 / ano' : 'R$ 600.000 / ano'}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            Receita garantida ao final de cada temporada.
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
            R$ {school.division === 'especial' ? '2.000.000' : '1.000.000'}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            Incentivo ao Patrimônio Cultural Carioca.
          </p>
        </div>
      </div>

      {/* Fund Raising Actions */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <span>Ações de Captação de Recursos</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Feijoada */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Utensils className="w-5 h-5 text-amber-400" />
                <span>Grande Feijoada da Bateria na Quadra</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Reúna os torcedores e a velha guarda para um almoço com muito samba de raiz.
                Gera receita imediata de ingressos e eleva a moral da comunidade.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-semibold font-mono">
                Estimativa: +R$ 40k a 75k
              </span>
              <button
                onClick={handleOrganizeFeijoada}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition shadow-md shadow-amber-500/20"
              >
                Organizar Feijoada
              </button>
            </div>
          </div>

          {/* Patrocínio Master */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <span>Patrocínio Master de Ala & Apoio Cultural</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Comercialize cotas institucionais e apoios com empresas privadas para estampar a marca nos camarotes e barracão.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-semibold font-mono">
                Cota Master: +R$ 350.000
              </span>
              <button
                onClick={() => handleSignSponsor('master')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition shadow-md shadow-emerald-600/20"
              >
                Firmar Contrato Master
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
