import React, { useState } from 'react';
import { DivisionId } from '../types/carnaval';
import { DIVISION_REGULATIONS } from '../config/obrigatoriedadesConfig';
import { X, ShieldCheck, AlertTriangle, Users, Flame, Flag, Scale, Sparkles, BookOpen } from 'lucide-react';

interface RegulamentoObrigatoriedadesModalProps {
  initialDivision?: DivisionId;
  onClose: () => void;
}

export const RegulamentoObrigatoriedadesModal: React.FC<RegulamentoObrigatoriedadesModalProps> = ({
  initialDivision = 'especial',
  onClose
}) => {
  const [selectedDiv, setSelectedDiv] = useState<DivisionId>(initialDivision);
  const reg = DIVISION_REGULATIONS[selectedDiv];

  const divisions: { id: DivisionId; label: string; badge: string; color: string }[] = [
    { id: 'especial', label: 'Grupo Especial', badge: 'LIESA', color: 'from-amber-400 to-amber-600' },
    { id: 'ouro', label: 'Série Ouro', badge: 'Liga-RJ', color: 'from-yellow-500 to-amber-600' },
    { id: 'prata', label: 'Série Prata', badge: 'Superliga', color: 'from-slate-300 to-slate-500' },
    { id: 'bronze', label: 'Série Bronze', badge: 'Superliga', color: 'from-amber-700 to-amber-900' },
    { id: 'avaliacao', label: 'Grupo de Avaliação', badge: 'Superliga', color: 'from-purple-500 to-purple-700' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <span>Regulamento Oficial & Obrigatoriedades de Desfile</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                  Carnaval Carioca
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Critérios técnicos e vedações legais fiscalizados pela comissão de pista de cada divisão.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Division Selector Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 p-2 gap-2 overflow-x-auto">
          {divisions.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDiv(d.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                selectedDiv === d.id
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800'
              }`}
            >
              <span>{d.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  selectedDiv === d.id ? 'bg-slate-950/30 text-slate-950 font-extrabold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {d.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Header Card for Division */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 shadow-inner flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                {reg.governingBody} • {reg.venue}
              </div>
              <h3 className="text-2xl font-black text-white">{reg.divisionLabel}</h3>
              <p className="text-xs text-slate-400 mt-1">
                {selectedDiv === 'bronze'
                  ? 'Sanções variáveis entre 0,4 e 2,3 pontos dependendo da gravidade e reincidência de itens não cumpridos.'
                  : 'Cada item de obrigatoriedade não cumprido acarreta perda oficial de -0,5 ponto na apuração.'}
              </p>
            </div>

            <div className="bg-slate-950/80 border border-amber-500/30 px-4 py-2.5 rounded-xl text-right flex-shrink-0">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Punição Padrão</div>
              <div className="text-xl font-black text-rose-400 font-mono">
                {selectedDiv === 'bronze' ? '-0.4 a -2.3 pts' : '-0.5 ponto / item'}
              </div>
            </div>
          </div>

          {/* Division Detailed Rules */}
          {selectedDiv === 'especial' && (
            <div className="space-y-4">
              {/* Composição Mínima */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Users className="w-4 h-4" />
                  <span>Composição Mínima da Escola (Grupo Especial)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">🥁 Bateria</div>
                    <div className="text-lg font-black text-white font-mono mt-0.5">≥ 200 Ritmistas</div>
                    <p className="text-[10px] text-slate-400 mt-1">Todos posicionados na bateria oficial.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">👵 Ala das Baianas</div>
                    <div className="text-lg font-black text-white font-mono mt-0.5">≥ 60 Baianas</div>
                    <p className="text-[10px] text-slate-400 mt-1">Obrigatoriamente agrupadas em ala.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">🎭 Comissão de Frente</div>
                    <div className="text-lg font-black text-white font-mono mt-0.5">10 a 15 Dançarinos</div>
                    <p className="text-[10px] text-slate-400 mt-1">Nem menos de 10, nem mais de 15.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">👥 Total de Componentes</div>
                    <div className="text-lg font-black text-white font-mono mt-0.5">2.500 a 3.200</div>
                    <p className="text-[10px] text-slate-400 mt-1">Faixa rigorosa de desfilantes.</p>
                  </div>
                </div>
              </div>

              {/* Alegorias e Tripés */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Flame className="w-4 h-4" />
                  <span>Alegorias & Tripés (Cenografia de Pista)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>🏰 Carros Alegóricos</span>
                      <span className="font-mono text-amber-400">4 a 6 Carros</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      É obrigatório o uso de <strong>no mínimo 4 e no máximo 6 carros alegóricos</strong>. É permitida acoplagem em apenas um carro alegórico.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>🎪 Tripés Cenográficos</span>
                      <span className="font-mono text-amber-400">Até 3 Tripés</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Podem ser apresentados <strong>até 3 tripés</strong> (elementos cenográficos de chão), com <strong>no máximo 2 componentes</strong> cada tripé.
                    </p>
                  </div>
                </div>
              </div>

              {/* Vedações e Penalidades */}
              <div className="bg-slate-950/60 border border-rose-900/40 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Vedações Absolutas & Sanções Disciplinares</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/30 flex items-start gap-2.5">
                    <span className="text-rose-400 font-black text-sm">✕</span>
                    <div>
                      <strong className="text-white">Proibições Estritas:</strong> É terminantemente proibido o uso de <strong>animais vivos</strong> em alegorias ou na pista, bem como <strong>genitália à mostra</strong> e <strong>uso de microfones para propaganda política ou comercial</strong>.
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/30 flex items-start gap-2.5">
                    <span className="text-rose-400 font-black text-sm">✕</span>
                    <div>
                      <strong className="text-white">Multas Financeiras e Perda de Pontos:</strong> O descumprimento de regras de vestimenta (como camisetas na pista) ou propaganda/merchandising gera <strong>multas de até R$ 250 mil</strong> e perda de pontos.
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30 flex items-start gap-2.5">
                    <span className="text-amber-400 font-black text-sm">⚠️</span>
                    <div>
                      <strong className="text-white">Ausência de Ritmistas ou Baianas:</strong> A falta de componentes mínimos na bateria (&lt;200) ou na ala das baianas (&lt;60) resulta em desconto de <strong>-0,5 ponto por item</strong> diretamente na apuração dos jurados.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedDiv === 'ouro' && (
            <div className="space-y-4">
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Users className="w-4 h-4" />
                  <span>Exigências Técnicas da Série Ouro (Liga-RJ)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">👥 Desfilantes</div>
                    <div className="text-lg font-black text-white font-mono mt-0.5">≥ 900 Desfilantes</div>
                    <p className="text-[10px] text-slate-400 mt-1">Presença obrigatória de pelo menos 900 pessoas na pista.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">🏰 Carros Alegóricos</div>
                    <div className="text-lg font-black text-white font-mono mt-0.5">2 a 3 Alegorias</div>
                    <p className="text-[10px] text-slate-400 mt-1">Obrigatório no mínimo 2 e no máximo 3 alegorias durante o desfile.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">🎭 Comissão de Frente</div>
                    <div className="text-lg font-black text-white font-mono mt-0.5">Máx. 15 Componentes</div>
                    <p className="text-[10px] text-slate-400 mt-1">Comissão de Frente com no máximo 15 integrantes.</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                  ⚠️ <strong>Penalidade:</strong> Cada exigência técnica não cumprida acarreta desconto de <strong>-0,5 ponto</strong> na nota final da apuração.
                </div>
              </div>
            </div>
          )}

          {selectedDiv === 'prata' && (
            <div className="space-y-4">
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Users className="w-4 h-4" />
                  <span>Composição & Exigências da Série Prata (Superliga)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">👥 Componentes em Pista</div>
                    <div className="text-lg font-black text-white font-mono mt-0.5">≥ 700 Componentes</div>
                    <p className="text-[10px] text-slate-400 mt-1">Mínimo de 700 pessoas em pista.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">👵 Ala das Baianas</div>
                    <div className="text-lg font-black text-white font-mono mt-0.5">≥ 40 Baianas</div>
                    <p className="text-[10px] text-slate-400 mt-1">Mínimo de 40 Baianas agrupadas em ala.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">🏰 Alegorias</div>
                    <div className="text-lg font-black text-white font-mono mt-0.5">2 a 4 Alegorias</div>
                    <p className="text-[10px] text-slate-400 mt-1">Permitido o uso de no mínimo 2 e no máximo 4 alegorias.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">🎭 Comissão de Frente</div>
                    <div className="text-lg font-black text-white font-mono mt-0.5">10 a 12 Integrantes</div>
                    <p className="text-[10px] text-slate-400 mt-1">Deve reunir rigorosamente entre 10 e 12 integrantes.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">🥁 Ritmistas na Bateria</div>
                    <div className="text-lg font-black text-white font-mono mt-0.5">≥ 120 Ritmistas</div>
                    <p className="text-[10px] text-slate-400 mt-1">Exige-se um contingente mínimo de 120 ritmistas.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">👕 Alas de Enredo</div>
                    <div className="text-lg font-black text-white font-mono mt-0.5">≥ 30 por Ala</div>
                    <p className="text-[10px] text-slate-400 mt-1">Cada ala deve ter no mínimo 30 componentes.</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                  ⚠️ <strong>Penalidade:</strong> Cada item não cumprido acarreta desconto de <strong>-0,5 ponto</strong> por item na apuração.
                </div>
              </div>
            </div>
          )}

          {selectedDiv === 'bronze' && (
            <div className="space-y-4">
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Users className="w-4 h-4" />
                  <span>Composição & Identidade Visual da Série Bronze (Superliga)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">👥 Componentes Mínimos</div>
                    <div className="text-lg font-black text-white font-mono mt-0.5">≥ 600 Componentes</div>
                    <p className="text-[10px] text-slate-400 mt-1">Perda de pontos por não atingir o mínimo de 600 componentes na agremiação.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">👵 Ala das Baianas</div>
                    <div className="text-lg font-black text-white font-mono mt-0.5">≥ 30 Baianas</div>
                    <p className="text-[10px] text-slate-400 mt-1">Penalidade por não desfilar com o mínimo de 30 baianas igualmente vestidas.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">👕 Alas de Componentes</div>
                    <div className="text-lg font-black text-white font-mono mt-0.5">≥ 25 por Ala</div>
                    <p className="text-[10px] text-slate-400 mt-1">Perda de pontos por não manter alas com o mínimo de 25 componentes.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">📋 Identidade Visual & Documentação</div>
                    <div className="text-lg font-black text-white font-mono mt-0.5">Folha & Fantasias</div>
                    <p className="text-[10px] text-slate-400 mt-1">Penalidades por desfilar com fantasia de outra agremiação ou por não assinar a folha de obrigatoriedades.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-300">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Graduação das Sanções da Série Bronze:</span>
                  </div>
                  <p className="leading-relaxed">
                    As sanções variam, com <strong>perdas de 0,4 a 2,3 pontos</strong> dependendo da gravidade e quantidade de itens não cumpridos pela escola de samba.
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedDiv === 'avaliacao' && (
            <div className="space-y-4">
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Users className="w-4 h-4" />
                  <span>Exigências do Grupo de Avaliação (Superliga)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">👥 Componentes Mínimos</div>
                    <div className="text-lg font-black text-white font-mono mt-0.5">≥ 400 Componentes</div>
                    <p className="text-[10px] text-slate-400 mt-1">Perda de pontos por não atingir o contingente mínimo de 400 componentes.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">👵 Ala das Baianas</div>
                    <div className="text-lg font-black text-white font-mono mt-0.5">≥ 15 Baianas</div>
                    <p className="text-[10px] text-slate-400 mt-1">Penalidade por não desfilar com o mínimo de 15 baianas igualmente vestidas.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">🥁 Ritmistas na Bateria</div>
                    <div className="text-lg font-black text-white font-mono mt-0.5">≥ 80 Ritmistas</div>
                    <p className="text-[10px] text-slate-400 mt-1">Exige-se um mínimo de 80 ritmistas na bateria.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">🎭 Comissão de Frente</div>
                    <div className="text-lg font-black text-white font-mono mt-0.5">Máx. 10 Integrantes</div>
                    <p className="text-[10px] text-slate-400 mt-1">Deve reunir no máximo 10 componentes.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 sm:col-span-2">
                    <div className="text-[11px] text-slate-400 font-medium">🏰 Carros Alegóricos</div>
                    <div className="text-lg font-black text-white font-mono mt-0.5">1 a 2 Alegorias</div>
                    <p className="text-[10px] text-slate-400 mt-1">Obrigatório o uso de no mínimo 1 alegoria e no máximo 2 alegorias.</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                  ⚠️ <strong>Punição:</strong> Cada item não cumprido acarretará em punição de <strong>-0,5 pontos</strong> por item.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Vistoria oficial de dispersão e armação aplicada antes e durante os desfiles.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
