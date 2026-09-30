import React, { useState } from 'react';
import { School, Enredo, SchoolParadeComposition } from '../types/carnaval';
import { SAMPLE_ENREDOS } from '../data/carnavalData';
import {
  Hammer,
  Sparkles,
  Feather,
  Palette,
  CheckCircle,
  AlertTriangle,
  Scale,
  Users,
  Flame,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  Plus,
  Minus,
  CheckCircle2
} from 'lucide-react';
import {
  DIVISION_REGULATIONS,
  generateDefaultParadeComposition,
  evaluateSchoolParadeObrigatoriedades
} from '../config/obrigatoriedadesConfig';
import { RegulamentoObrigatoriedadesModal } from './RegulamentoObrigatoriedadesModal';

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
  const [showRegulamentoModal, setShowRegulamentoModal] = useState<boolean>(false);

  const composition: SchoolParadeComposition =
    school.paradeComposition || generateDefaultParadeComposition(school);

  const evaluation = evaluateSchoolParadeObrigatoriedades(school, composition);
  const divReg = DIVISION_REGULATIONS[school.division];

  const handleUpdateComp = (delta: Partial<SchoolParadeComposition>) => {
    const updatedComp = { ...composition, ...delta };
    onUpdateSchool({
      ...school,
      paradeComposition: updatedComp
    });
  };

  const handleAutoComply = () => {
    let ideal: SchoolParadeComposition;
    switch (school.division) {
      case 'especial':
        ideal = {
          componentes: 2800,
          ritmistas: 230,
          baianas: 65,
          comissaoDeFrente: 13,
          alegorias: 5,
          tripes: 2,
          componentesPorTripe: 2,
          componentesPorAla: 40,
          cumpreFolhaObrigatoriedades: true,
          respeitaIdentidadeVisual: true,
          respeitaVestimentaEMerchandising: true,
          semAnimaisOuGenitalia: true
        };
        break;
      case 'ouro':
        ideal = {
          componentes: 1100,
          ritmistas: 160,
          baianas: 50,
          comissaoDeFrente: 14,
          alegorias: 3,
          tripes: 1,
          componentesPorTripe: 2,
          componentesPorAla: 35,
          cumpreFolhaObrigatoriedades: true,
          respeitaIdentidadeVisual: true,
          respeitaVestimentaEMerchandising: true,
          semAnimaisOuGenitalia: true
        };
        break;
      case 'prata':
        ideal = {
          componentes: 800,
          ritmistas: 130,
          baianas: 45,
          comissaoDeFrente: 11,
          alegorias: 3,
          tripes: 1,
          componentesPorTripe: 2,
          componentesPorAla: 35,
          cumpreFolhaObrigatoriedades: true,
          respeitaIdentidadeVisual: true,
          respeitaVestimentaEMerchandising: true,
          semAnimaisOuGenitalia: true
        };
        break;
      case 'bronze':
        ideal = {
          componentes: 680,
          ritmistas: 110,
          baianas: 35,
          comissaoDeFrente: 10,
          alegorias: 2,
          tripes: 0,
          componentesPorTripe: 0,
          componentesPorAla: 28,
          cumpreFolhaObrigatoriedades: true,
          respeitaIdentidadeVisual: true,
          respeitaVestimentaEMerchandising: true,
          semAnimaisOuGenitalia: true
        };
        break;
      case 'avaliacao':
        ideal = {
          componentes: 450,
          ritmistas: 85,
          baianas: 18,
          comissaoDeFrente: 9,
          alegorias: 2,
          tripes: 0,
          componentesPorTripe: 0,
          componentesPorAla: 22,
          cumpreFolhaObrigatoriedades: true,
          respeitaIdentidadeVisual: true,
          respeitaVestimentaEMerchandising: true,
          semAnimaisOuGenitalia: true
        };
        break;
    }

    onUpdateSchool({
      ...school,
      paradeComposition: ideal
    });
    onShowMessage('Ficha técnica ajustada em total conformidade com o regulamento oficial!', 'success');
  };
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

      {/* Ficha Técnica & Obrigatoriedades do Desfile Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">
                  Ficha Técnica & Obrigatoriedades Regulamentares
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                  {divReg.divisionLabel}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Fiscalização de concentração e pista da {divReg.governingBody}. Cada item não cumprido acarreta{' '}
                <strong className="text-rose-400">
                  {school.division === 'bronze' ? 'de -0,4 a -2,3 pts' : '-0,5 ponto por item'}
                </strong>{' '}
                na Apuração!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRegulamentoModal(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center gap-1.5 border border-slate-700 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Ver Regulamento Completo</span>
            </button>

            {evaluation.infractions.length > 0 && (
              <button
                onClick={handleAutoComply}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shadow shadow-amber-500/20 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Adequar ao Regulamento</span>
              </button>
            )}
          </div>
        </div>

        {/* Compliance Status Banner */}
        {evaluation.infractions.length === 0 ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 text-emerald-300 text-xs">
            <div className="flex items-center gap-2.5 font-bold">
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>
                Ficha técnica 100% em conformidade com o regulamento oficial da {divReg.divisionLabel}! Sem penalidades de obrigatoriedade.
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[11px] whitespace-nowrap">
              Penalidade: 0.0 pts
            </span>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/40 space-y-2 text-xs">
            <div className="flex items-center justify-between gap-3 text-rose-300 font-bold">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <span>
                  Atenção, Diretoria! {evaluation.infractions.length} item(ns) irregular(es) detectado(s) pela fiscalização técnica.
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-rose-500/30 text-rose-200 font-mono font-black text-sm whitespace-nowrap border border-rose-500/50">
                Penalidade Total: -{evaluation.technicalPenalty.toFixed(1)} pts
              </span>
            </div>

            <div className="space-y-1.5 pt-1 border-t border-rose-500/20">
              {evaluation.infractions.map((inf) => (
                <div key={inf.id} className="flex items-center justify-between text-[11px] text-rose-200 bg-rose-950/40 px-3 py-1.5 rounded-lg border border-rose-800/40">
                  <span className="flex items-center gap-1.5">
                    <span className="text-rose-400">✕</span>
                    <strong>{inf.ruleName}:</strong> {inf.description}
                  </span>
                  <span className="font-mono font-bold text-rose-300 whitespace-nowrap ml-2">
                    -{inf.pointsDeducted.toFixed(1)} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Parameters Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Componentes */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">👥 Total de Componentes</span>
              <span className="text-[10px] text-slate-500 font-mono">
                {school.division === 'especial'
                  ? 'Faixa: 2.500 a 3.200'
                  : school.division === 'ouro'
                  ? 'Mínimo: 900'
                  : school.division === 'prata'
                  ? 'Mínimo: 700'
                  : school.division === 'bronze'
                  ? 'Mínimo: 600'
                  : 'Mínimo: 400'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-black text-white font-mono">
                {composition.componentes.toLocaleString('pt-BR')}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleUpdateComp({ componentes: Math.max(100, composition.componentes - 50) })}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-xs transition cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleUpdateComp({ componentes: composition.componentes + 50 })}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-xs transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Ritmistas na Bateria */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">🥁 Ritmistas na Bateria</span>
              <span className="text-[10px] text-slate-500 font-mono">
                {school.division === 'especial'
                  ? 'Mínimo: 200'
                  : school.division === 'prata'
                  ? 'Mínimo: 120'
                  : school.division === 'avaliacao'
                  ? 'Mínimo: 80'
                  : 'Oficial'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-black text-white font-mono">
                {composition.ritmistas}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleUpdateComp({ ritmistas: Math.max(30, composition.ritmistas - 5) })}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-xs transition cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleUpdateComp({ ritmistas: composition.ritmistas + 5 })}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-xs transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Ala das Baianas */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">👵 Ala das Baianas</span>
              <span className="text-[10px] text-slate-500 font-mono">
                {school.division === 'especial'
                  ? 'Mínimo: 60'
                  : school.division === 'prata'
                  ? 'Mínimo: 40'
                  : school.division === 'bronze'
                  ? 'Mínimo: 30'
                  : school.division === 'avaliacao'
                  ? 'Mínimo: 15'
                  : 'Mínimo: 50'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-black text-white font-mono">
                {composition.baianas}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleUpdateComp({ baianas: Math.max(5, composition.baianas - 2) })}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-xs transition cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleUpdateComp({ baianas: composition.baianas + 2 })}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-xs transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Comissão de Frente */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">🎭 Comissão de Frente</span>
              <span className="text-[10px] text-slate-500 font-mono">
                {school.division === 'especial'
                  ? '10 a 15 Dançarinos'
                  : school.division === 'ouro'
                  ? 'Máx. 15 Componentes'
                  : school.division === 'prata'
                  ? '10 a 12 Integrantes'
                  : school.division === 'avaliacao'
                  ? 'Máx. 10 Integrantes'
                  : 'Padrão'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-black text-white font-mono">
                {composition.comissaoDeFrente}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleUpdateComp({ comissaoDeFrente: Math.max(5, composition.comissaoDeFrente - 1) })}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-xs transition cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleUpdateComp({ comissaoDeFrente: composition.comissaoDeFrente + 1 })}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-xs transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Carros Alegóricos */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">🏰 Carros Alegóricos</span>
              <span className="text-[10px] text-slate-500 font-mono">
                {school.division === 'especial'
                  ? '4 a 6 Carros'
                  : school.division === 'ouro'
                  ? '2 a 3 Alegorias'
                  : school.division === 'prata'
                  ? '2 a 4 Alegorias'
                  : school.division === 'avaliacao'
                  ? '1 a 2 Alegorias'
                  : '2 Carros'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-black text-white font-mono">
                {composition.alegorias}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleUpdateComp({ alegorias: Math.max(0, composition.alegorias - 1) })}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-xs transition cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleUpdateComp({ alegorias: composition.alegorias + 1 })}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-xs transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tripés (Grupo Especial) ou Alas */}
          {school.division === 'especial' ? (
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">🎪 Tripés Cenográficos</span>
                <span className="text-[10px] text-slate-500 font-mono">Até 3 (máx 2 comp/tripé)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-black text-white font-mono">
                  {composition.tripes ?? 2}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleUpdateComp({ tripes: Math.max(0, (composition.tripes ?? 2) - 1) })}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-xs transition cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleUpdateComp({ tripes: (composition.tripes ?? 2) + 1 })}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-xs transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">👕 Média por Ala</span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {school.division === 'prata'
                    ? 'Mínimo: 30'
                    : school.division === 'bronze'
                    ? 'Mínimo: 25'
                    : 'Regulamentar'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-black text-white font-mono">
                  {composition.componentesPorAla ?? 35}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      handleUpdateComp({
                        componentesPorAla: Math.max(10, (composition.componentesPorAla ?? 35) - 2)
                      })
                    }
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-xs transition cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateComp({
                        componentesPorAla: (composition.componentesPorAla ?? 35) + 2
                      })
                    }
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-xs transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Vedações & Regulamento Disciplinar Toggles */}
        <div className="pt-2 border-t border-slate-800/80 space-y-3">
          <div className="text-xs font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Vistoria Disciplinar & Conformidade Regulamentar</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer hover:bg-slate-950">
              <input
                type="checkbox"
                checked={composition.semAnimaisOuGenitalia !== false}
                onChange={(e) => handleUpdateComp({ semAnimaisOuGenitalia: e.target.checked })}
                className="w-4 h-4 accent-amber-500 rounded"
              />
              <span className="text-slate-300">
                Sem animais vivos na pista e sem genitália exposta (Vedação estrita LIESA/Superliga)
              </span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer hover:bg-slate-950">
              <input
                type="checkbox"
                checked={composition.respeitaVestimentaEMerchandising !== false}
                onChange={(e) => handleUpdateComp({ respeitaVestimentaEMerchandising: e.target.checked })}
                className="w-4 h-4 accent-amber-500 rounded"
              />
              <span className="text-slate-300">
                Sem propaganda/merchandising em microfones e respeito às regras de vestimenta (sem camisetas)
              </span>
            </label>

            {school.division === 'bronze' && (
              <>
                <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer hover:bg-slate-950">
                  <input
                    type="checkbox"
                    checked={composition.cumpreFolhaObrigatoriedades !== false}
                    onChange={(e) => handleUpdateComp({ cumpreFolhaObrigatoriedades: e.target.checked })}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <span className="text-slate-300">
                    Folha de obrigatoriedades assinada perante a direção de carnaval da Superliga
                  </span>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer hover:bg-slate-950">
                  <input
                    type="checkbox"
                    checked={composition.respeitaIdentidadeVisual !== false}
                    onChange={(e) => handleUpdateComp({ respeitaIdentidadeVisual: e.target.checked })}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <span className="text-slate-300">
                    Identidade visual própria respeitada (proibido fantasias de outra agremiação)
                  </span>
                </label>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Regulation Modal */}
      {showRegulamentoModal && (
        <RegulamentoObrigatoriedadesModal
          initialDivision={school.division}
          onClose={() => setShowRegulamentoModal(false)}
        />
      )}
    </div>
  );
};
