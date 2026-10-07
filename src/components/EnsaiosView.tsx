import React from 'react';
import { School } from '../types/carnaval';
import { Music, Flag, Users, CheckCircle, Sparkles, Zap, Award } from 'lucide-react';
import { soundService } from '../services/soundService';

interface EnsaiosViewProps {
  school: School;
  onUpdateSchool: (updatedSchool: School) => void;
  onShowMessage: (msg: string, type?: 'info' | 'success' | 'warning' | 'alert') => void;
}

export const EnsaiosView: React.FC<EnsaiosViewProps> = ({
  school,
  onUpdateSchool,
  onShowMessage
}) => {
  const handleEnsaioQuadra = () => {
    const cost = 25000;
    if (school.budget < cost) {
      onShowMessage('Orçamento insuficiente para custear os custos do ensaio de quadra!', 'warning');
      return;
    }

    soundService.playSurdoBeat(true);

    const updated: School = {
      ...school,
      budget: school.budget - cost,
      rehearsalLevel: Math.min(100, school.rehearsalLevel + 6),
      fanBaseMorale: Math.min(100, school.fanBaseMorale + 2),
      attributes: {
        ...school.attributes,
        harmonia: Math.min(99, school.attributes.harmonia + 1),
        bateria: Math.min(99, school.attributes.bateria + 1)
      }
    };

    onUpdateSchool(updated);
    onShowMessage('Ensaio de quadra fervendo! A comunidade cantou o samba com força!', 'success');
  };

  const handleEnsaioTecnicoSapucai = () => {
    if (school.technicalParadeDone) {
      onShowMessage('O ensaio técnico no Sambódromo deste ano já foi realizado!', 'info');
      return;
    }

    const cost = 80000;
    if (school.budget < cost) {
      onShowMessage('Orçamento insuficiente para a logística do ensaio técnico na Sapucaí!', 'warning');
      return;
    }

    soundService.playGavel();
    soundService.playSurdoBeat(true);

    const updated: School = {
      ...school,
      budget: school.budget - cost,
      rehearsalLevel: Math.min(100, school.rehearsalLevel + 15),
      fanBaseMorale: Math.min(100, school.fanBaseMorale + 6),
      technicalParadeDone: true,
      attributes: {
        ...school.attributes,
        evolucao: Math.min(99, school.attributes.evolucao + 2),
        comissaoDeFrente: Math.min(99, school.attributes.comissaoDeFrente + 2),
        mestreSalaPortaBandeira: Math.min(99, school.attributes.mestreSalaPortaBandeira + 1)
      }
    };

    onUpdateSchool(updated);
    onShowMessage('Sucesso absoluto no Ensaio Técnico da Sapucaí! Povo cantou "É Campeã" nas arquibancadas!', 'success');
  };

  const handleTuneSamba = (type: 'cadencia' | 'explosao') => {
    const cost = 40000;
    if (school.budget < cost) {
      onShowMessage('Orçamento insuficiente na tesouraria!', 'warning');
      return;
    }

    const updated: School = {
      ...school,
      budget: school.budget - cost,
      attributes: {
        ...school.attributes,
        sambaEnredo: Math.min(99, school.attributes.sambaEnredo + 1),
        harmonia: type === 'cadencia' ? Math.min(99, school.attributes.harmonia + 1) : school.attributes.harmonia,
        evolucao: type === 'explosao' ? Math.min(99, school.attributes.evolucao + 1) : school.attributes.evolucao
      }
    };

    onUpdateSchool(updated);
    onShowMessage(
      type === 'cadencia'
        ? 'Ajuste de andamento: Bateria acertou a cadência e o canto melódico ganhou corpo!'
        : 'Ajuste de pegada: Bateria impôs ritmo forte e explosão no refrão principal!',
      'success'
    );
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <Music className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Quadra de Ensaios & Passarela do Samba</h2>
            <p className="text-xs text-slate-400">
              Afine a bateria, treine a evolução das alas e ensaie o 1º casal na Marquês de Sapucaí.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/60 px-4 py-2 rounded-xl border border-slate-800">
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Nível de Entrosamento</div>
            <div className="text-lg font-black text-emerald-400">{school.rehearsalLevel}%</div>
          </div>
        </div>
      </div>

      {/* Main Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ensaio Técnico no Sambódromo */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Flag className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Ensaio Técnico na Sapucaí</h3>
              </div>
              {school.technicalParadeDone ? (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <CheckCircle className="w-3.5 h-3.5" /> Realizado
                </span>
              ) : (
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  Disponível
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              O teste oficial de fogo da escola na pista da Marquês de Sapucaí diante de 40 mil pessoas.
              Permite aos diretores de harmonia corrigirem buracos e sincronizarem a comissão de frente com a bateria.
            </p>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1">
              <div className="flex items-center justify-between text-slate-300">
                <span>Ganho em Evolução & Comissão</span>
                <span className="text-emerald-400 font-bold">+2 pts em cada</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Moral da Comunidade</span>
                <span className="text-rose-400 font-bold">+6%</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Custo de Logística & Ônibus</span>
                <span className="text-white font-bold">R$ 80.000</span>
              </div>
            </div>
          </div>

          <button
            disabled={school.technicalParadeDone}
            onClick={handleEnsaioTecnicoSapucai}
            className={`w-full py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
              school.technicalParadeDone
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{school.technicalParadeDone ? 'Ensaio na Sapucaí Concluído' : 'Realizar Ensaio Técnico no Sambódromo'}</span>
          </button>
        </div>

        {/* Ensaio Geral na Quadra */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">Ensaio de Quadra com a Bateria</h3>
                  <span className="text-[11px] text-amber-300 font-semibold block">
                    {school.quadraName || 'Quadra da Comunidade'} • Nível {school.quadraLevel || 1}
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">
                Bateria: {school.attributes.bateria} pts
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Ensaio semanal na quadra da escola. O mestre de bateria afina os tamborins, caixas e surdos,
              enquanto o intérprete oficial puxa as alas de comunidade no gogó.
            </p>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1">
              <div className="flex items-center justify-between text-slate-300">
                <span>Ganho em Harmonia & Bateria</span>
                <span className="text-emerald-400 font-bold">+1 pt em cada</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Aumento do Entrosamento</span>
                <span className="text-emerald-400 font-bold">+6%</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Custo de Sonorização e Apoio</span>
                <span className="text-white font-bold">R$ 25.000</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleEnsaioQuadra}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            <span>Fazer Ensaio Geral de Quadra</span>
          </button>
        </div>
      </div>

      {/* Ajustes Táticos de Samba e Andamento */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">Ajustes de Andamento do Samba-Enredo</h3>
          </div>
          <span className="text-xs font-mono font-bold text-amber-400">
            Samba-Enredo: {school.attributes.sambaEnredo} pts
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <h4 className="font-bold text-white text-sm">Andamento Cadenciado & Melódico</h4>
              <p className="text-xs text-slate-400 mt-1">
                Foco no canto das cordas, afinação dos naipes e clareza da letra na avenida. Melhora Harmonia.
              </p>
            </div>
            <button
              onClick={() => handleTuneSamba('cadencia')}
              className="py-2 px-4 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition text-center"
            >
              Aplicar Andamento Cadenciado (R$ 40.000)
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <h4 className="font-bold text-white text-sm">Andamento Valente & Explosivo</h4>
              <p className="text-xs text-slate-400 mt-1">
                Foco em paradinhas eletrizantes e pegada acelerada para empolgar o público. Melhora Evolução.
              </p>
            </div>
            <button
              onClick={() => handleTuneSamba('explosao')}
              className="py-2 px-4 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition text-center"
            >
              Aplicar Andamento Explosivo (R$ 40.000)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
