import React, { useState } from 'react';
import { School, DivisionId } from '../types/carnaval';
import { getSchoolConsolidatedStats } from '../data/carnavalData';
import { Trophy, Shield, Sparkles, Check, User } from 'lucide-react';
import { soundService } from '../services/soundService';

interface NewGameModalProps {
  isOpen: boolean;
  especialSchools: School[];
  ouroSchools: School[];
  prataSchools: School[];
  bronzeSchools: School[];
  onStartGame: (selectedSchoolId: string | null, managerName: string) => void;
  onClose?: () => void;
}

export const NewGameModal: React.FC<NewGameModalProps> = ({
  isOpen,
  especialSchools,
  ouroSchools,
  prataSchools,
  bronzeSchools,
  onStartGame,
  onClose
}) => {
  const [managerName, setManagerName] = useState<string>('Diretor Presidente');
  const [selectedDivision, setSelectedDivision] = useState<DivisionId>('especial');
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>(especialSchools[0]?.id || 'viradouro');
  const [isSpectator, setIsSpectator] = useState<boolean>(false);

  if (!isOpen) return null;

  const activeSchoolList =
    selectedDivision === 'especial'
      ? especialSchools
      : selectedDivision === 'ouro'
      ? ouroSchools
      : selectedDivision === 'prata'
      ? prataSchools
      : bronzeSchools;
  const currentSelectedSchool = activeSchoolList.find(s => s.id === selectedSchoolId) || activeSchoolList[0];

  const handleConfirm = () => {
    soundService.playGavel();
    onStartGame(isSpectator ? null : selectedSchoolId, managerName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Title */}
        <div className="text-center pb-4 border-b border-slate-800 space-y-1 relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-0 top-0 text-slate-400 hover:text-white p-1 rounded-lg text-xs"
            >
              ✕
            </button>
          )}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
            <Trophy className="w-3.5 h-3.5" />
            <span>NOVA CARREIRA • CARNAVAL 2027</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Samba Manager • O Simulador das Escolas de Samba
          </h2>
          <p className="text-xs text-slate-400">
            Assuma o comando de uma agremiação no Grupo Especial, Série Ouro, Série Prata ou Série Bronze a partir do Carnaval 2027.
          </p>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-5 pr-1">
          {/* Manager Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <User className="w-4 h-4 text-amber-400" />
              <span>Nome do Diretor / Presidente da Agremiação</span>
            </label>
            <input
              type="text"
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-semibold"
              placeholder="Ex: Laíla da Beija-Flor, Fernando Pamplona..."
            />
          </div>

          {/* Mode Switch: Manage School vs Spectator Mode */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <button
              onClick={() => setIsSpectator(false)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                !isSpectator
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Comandar uma Escola</span>
            </button>
            <button
              onClick={() => setIsSpectator(true)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                isSpectator
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Modo Observador (LIESA)</span>
            </button>
          </div>

          {!isSpectator && (
            <div className="space-y-4">
              {/* Division Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1 gap-2">
                <span className="text-xs font-bold text-slate-300">Escolha a Divisão de Início:</span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedDivision('especial');
                      setSelectedSchoolId(especialSchools[0]?.id || '');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      selectedDivision === 'especial'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Grupo Especial ({especialSchools.length})
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDivision('ouro');
                      setSelectedSchoolId(ouroSchools[0]?.id || '');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      selectedDivision === 'ouro'
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Série Ouro ({ouroSchools.length})
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDivision('prata');
                      setSelectedSchoolId(prataSchools[0]?.id || '');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      selectedDivision === 'prata'
                        ? 'bg-slate-300 text-slate-950'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Série Prata ({prataSchools.length})
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDivision('bronze');
                      setSelectedSchoolId(bronzeSchools[0]?.id || '');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      selectedDivision === 'bronze'
                        ? 'bg-amber-700 text-amber-100 ring-1 ring-amber-500'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Série Bronze ({bronzeSchools.length})
                  </button>
                </div>
              </div>

              {/* Schools Grid Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-1">
                {activeSchoolList.map((school) => {
                  const isSelected = selectedSchoolId === school.id;
                  return (
                    <button
                      key={school.id}
                      onClick={() => setSelectedSchoolId(school.id)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-500 shadow-md ring-1 ring-amber-400'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full border flex-shrink-0"
                        style={{
                          backgroundColor: school.colors.primary,
                          borderColor: school.colors.border || '#fff'
                        }}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">
                          {school.shortName || school.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {school.neighborhood}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected School Preview Details */}
              {currentSelectedSchool && (() => {
                const stats = getSchoolConsolidatedStats(currentSelectedSchool);
                return (
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-300 text-sm">
                        {currentSelectedSchool.name}
                      </span>
                      <span className="text-slate-400 italic">
                        "{currentSelectedSchool.nickname}"
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                      <Trophy className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>
                        Palmarés: <strong>{stats.totalEspecialTitles}</strong> Esp ({stats.totalEspecialVices} vices) • <strong>{stats.totalOuroTitles}</strong> Ouro ({stats.totalOuroVices} vices){stats.totalPrataTitles > 0 ? ` • ${stats.totalPrataTitles} Prata` : ''} — <em>(🏛️ {stats.ancientEspecialTitles + stats.ancientOuroTitles + stats.ancientPrataTitles} Históricos + 🌟 {stats.inGameEspecialTitles + stats.inGameOuroTitles + stats.inGamePrataTitles} no Jogo/2027 em diante)</em>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] text-slate-300">
                      <div>
                        Orçamento: <strong className="text-emerald-400">R$ {(currentSelectedSchool.budget / 1000).toFixed(0)}k</strong>
                      </div>
                      <div>
                        Moral: <strong className="text-white">{currentSelectedSchool.fanBaseMorale}%</strong>
                      </div>
                      <div>
                        Bateria: <strong className="text-amber-400">{currentSelectedSchool.attributes.bateria} pts</strong>
                      </div>
                      <div>
                        Harmonia: <strong className="text-amber-400">{currentSelectedSchool.attributes.harmonia} pts</strong>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={handleConfirm}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black rounded-xl text-sm transition shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>INICIAR CARREIRA DE SAMBA</span>
          </button>
        </div>
      </div>
    </div>
  );
};
