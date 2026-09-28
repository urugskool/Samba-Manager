import React from 'react';
import { School, Enredo } from '../types/carnaval';
import { SAMPLE_ENREDOS } from '../data/carnavalData';
import { Hammer, Sparkles, Feather, Palette, CheckCircle, AlertTriangle } from 'lucide-react';

interface BarracaoViewProps {
  school: School;
  onUpdateSchool: (updatedSchool: School) => void;
  onShowMessage: (msg: string, type?: 'info' | 'success' | 'warning' | 'alert') => void;
}

export const BarracaoView: React.FC<BarracaoViewProps> = ({
  school,
  onUpdateSchool,
  onShowMessage
}) => {
  const handleSelectEnredo = (enredo: Enredo) => {
    if (school.budget < enredo.cost) {
      onShowMessage('Orçamento insuficiente para bancar os direitos e pesquisa deste enredo!', 'warning');
      return;
    }

    const updated: School = {
      ...school,
      budget: school.budget - enredo.cost,
      currentEnredo: enredo,
      attributes: {
        ...school.attributes,
        enredo: Math.min(99, school.attributes.enredo + Math.floor(enredo.qualityBoost / 2))
      }
    };

    onUpdateSchool(updated);
    onShowMessage(`Novo enredo definido: "${enredo.title}"! O barracão iniciou os trabalhos!`, 'success');
  };

  const handleInvestBarracao = (type: 'alegorias' | 'fantasias', cost: number, boost: number) => {
    if (school.budget < cost) {
      onShowMessage('Orçamento insuficiente na tesouraria!', 'warning');
      return;
    }

    const newProgress = Math.min(100, school.barracaoProgress + 10);
    const updated: School = {
      ...school,
      budget: school.budget - cost,
      barracaoProgress: newProgress,
      attributes: {
        ...school.attributes,
        [type]: Math.min(99, school.attributes[type] + boost)
      }
    };

    onUpdateSchool(updated);
    onShowMessage(
      type === 'alegorias'
        ? `Investimento de R$ ${cost.toLocaleString('pt-BR')} realizado nas Alegorias e Carros! Acabamento impecável!`
        : `Investimento de R$ ${cost.toLocaleString('pt-BR')} no ateliê de costura e adereços de Fantasias!`,
      'success'
    );
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
            <Hammer className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Cidade do Samba • Barracão da {school.name}</h2>
            <p className="text-xs text-slate-400">
              Desenvolva as alegorias, o ateliê de fantasias e o enredo para conquistar nota 10 dos jurados.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-950/60 px-4 py-2 rounded-xl border border-slate-800">
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Progresso Geral</div>
            <div className="text-lg font-black text-amber-400">{school.barracaoProgress}% Concluído</div>
          </div>
          <div className="w-24 bg-slate-800 rounded-full h-2">
            <div
              className="bg-amber-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${school.barracaoProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Enredo Selection Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">Escolha do Enredo do Carnaval</h3>
          </div>
          <span className="text-xs text-slate-400">
            Responsável: <strong>{school.staff.carnavalesco.name}</strong> (Nota {school.staff.carnavalesco.rating})
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SAMPLE_ENREDOS.map((enr) => {
            const isSelected = school.currentEnredo?.id === enr.id;

            return (
              <div
                key={enr.id}
                className={`p-4 rounded-xl border flex flex-col justify-between transition ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500 shadow-md shadow-amber-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-300">
                      {enr.themeType}
                    </span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
                        <CheckCircle className="w-3.5 h-3.5" /> Enredo Atual
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-white leading-snug">
                    "{enr.title}"
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {enr.synopsis}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 mt-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[10px] text-slate-500">Custo de Pesquisa</div>
                    <div className="font-bold text-white">R$ {enr.cost.toLocaleString('pt-BR')}</div>
                  </div>
                  <button
                    disabled={isSelected}
                    onClick={() => handleSelectEnredo(enr)}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs transition ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-300 cursor-default'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                    }`}
                  >
                    {isSelected ? 'Em Produção' : 'Definir Enredo'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Barracão Investments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alegorias e Adereços */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">Alegorias & Carros Alegóricos</h3>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400">
              Quesito: {school.attributes.alegorias} pts
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Construção de chassis, sistemas hidráulicos, esculturas volumosas e iluminação cenográfica.
            Garante nota máxima nos quesitos Alegorias e Conjunto.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-xs text-white">Carro Abre-Alas & Impacto Visual</div>
                <div className="text-[10px] text-slate-400">+1 ponto em Alegorias • R$ 80.000</div>
              </div>
              <button
                onClick={() => handleInvestBarracao('alegorias', 80000, 1)}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition"
              >
                Aprimorar
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-xs text-white">Efeitos Hidráulicos & Iluminação LED</div>
                <div className="text-[10px] text-slate-400">+2 pontos em Alegorias • R$ 150.000</div>
              </div>
              <button
                onClick={() => handleInvestBarracao('alegorias', 150000, 2)}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition"
              >
                Aprimorar
              </button>
            </div>
          </div>
        </div>

        {/* Fantasias */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Feather className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">Ateliê de Fantasias das Alas</h3>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400">
              Quesito: {school.attributes.fantasias} pts
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Materiais nobres, acabamento das costureiras, peso adequado para a evolução dos componentes
            e uniformidade das alas de comunidade.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-xs text-white">Acabamento & Resinas Nobres</div>
                <div className="text-[10px] text-slate-400">+1 ponto em Fantasias • R$ 70.000</div>
              </div>
              <button
                onClick={() => handleInvestBarracao('fantasias', 70000, 1)}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition"
              >
                Aprimorar
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-xs text-white">Plumagem Ecológica & Leveza das Alas</div>
                <div className="text-[10px] text-slate-400">+2 pontos em Fantasias • R$ 130.000</div>
              </div>
              <button
                onClick={() => handleInvestBarracao('fantasias', 130000, 2)}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition"
              >
                Aprimorar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
