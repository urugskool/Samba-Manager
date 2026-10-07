import React, { useState } from 'react';
import { School, DivisionId, YearHistory } from '../types/carnaval';
import { QUESITOS, getSchoolConsolidatedStats } from '../data/carnavalData';
import { Trophy, History, Shield, ArrowUp, ArrowDown, Star, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import {
  cleanSchoolName,
  getSchoolCorporateName,
  getSchoolDenomination,
  getSchoolDenominationExtenso
} from '../utils/schoolNameUtils';

interface TabelaViewProps {
  currentYear: number;
  especialSchools: School[];
  ouroSchools: School[];
  prataSchools: School[];
  bronzeSchools: School[];
  avaliacaoSchools?: School[];
  inactiveSchools?: School[];
  userSchool: School | null;
  history: YearHistory[];
  onReactivateSchool?: (schoolId: string) => void;
}

export const TabelaView: React.FC<TabelaViewProps> = ({
  currentYear,
  especialSchools,
  ouroSchools,
  prataSchools,
  bronzeSchools,
  avaliacaoSchools = [],
  inactiveSchools = [],
  userSchool,
  history,
  onReactivateSchool
}) => {
  const [selectedDivision, setSelectedDivision] = useState<DivisionId | 'inativas'>('especial');
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');
  const [expandedSchoolId, setExpandedSchoolId] = useState<string | null>(null);

  const lastHistory = history.length > 0 ? history[0] : null;

  const getSchoolLastCarnavalResult = (school: School) => {
    const isInactive = Boolean(school.isInactive || school.inactive);

    if (!lastHistory) {
      return {
        tier: school.division === 'especial' ? 1 : school.division === 'ouro' ? 2 : school.division === 'prata' ? 3 : school.division === 'bronze' ? 4 : 5,
        rank: 99,
        score: 0,
        badgeText: isInactive ? `Afastada das disputas (${school.inactiveReason || 'Sem desfile oficial'})` : 'Sem dados do carnaval anterior'
      };
    }

    if (isInactive) {
      const wasSuspendedLastYear = lastHistory.avaliacaoSuspended?.includes(school.name);
      return {
        tier: 6,
        rank: 99,
        score: 0,
        badgeText: wasSuspendedLastYear
          ? `⚠️ Afastada do Carnaval em ${lastHistory.year} (Mínimo 1 ano fora)`
          : `💤 Fora de atividade desde ${school.inactiveSince || 'anos anteriores'} (${school.inactiveReason || 'Aguardando reativação'})`
      };
    }

    // Check if was reactivated this season
    if (lastHistory.reactivatedSchools?.includes(school.name)) {
      return {
        tier: 5,
        rank: 1,
        score: 0,
        badgeText: `🔄 Agremiação Reativada para o Grupo de Avaliação ${currentYear}!`
      };
    }

    // Check if is newly founded school
    if (lastHistory.newSchools?.includes(school.name)) {
      return {
        tier: 5,
        rank: 1,
        score: 0,
        badgeText: `✨ Nova Escola Fundada para o Grupo de Avaliação ${currentYear}!`
      };
    }

    // 1. Check especialStandings
    const esp = lastHistory.especialStandings?.find(
      (s) => s.schoolId === school.id || s.schoolName.toLowerCase() === school.name.toLowerCase()
    );
    if (esp) {
      return {
        tier: 1,
        rank: esp.rank,
        score: esp.totalScore,
        badgeText: esp.rank === 1
          ? `🏆 Campeã do Grupo Especial ${lastHistory.year} (${esp.totalScore.toFixed(1)} pts)`
          : esp.rank === 2
          ? `🥈 Vice-Campeã do Especial ${lastHistory.year} (${esp.totalScore.toFixed(1)} pts)`
          : esp.rank <= 6
          ? `${esp.rank}º Lugar - G6 Especial ${lastHistory.year} (${esp.totalScore.toFixed(1)} pts)`
          : esp.rank === 12
          ? `⬇️ 12º Lugar Especial ${lastHistory.year} • Rebaixada (${esp.totalScore.toFixed(1)} pts)`
          : `${esp.rank}º Lugar no Especial ${lastHistory.year} (${esp.totalScore.toFixed(1)} pts)`
      };
    }

    // 2. Check ouroStandings
    const ouro = lastHistory.ouroStandings?.find(
      (s) => s.schoolId === school.id || s.schoolName.toLowerCase() === school.name.toLowerCase()
    );
    if (ouro) {
      return {
        tier: 2,
        rank: ouro.rank,
        score: ouro.totalScore,
        badgeText: ouro.rank === 1
          ? `⬆️ Campeã da Série Ouro ${lastHistory.year} • Acesso (${ouro.totalScore.toFixed(1)} pts)`
          : ouro.rank === 2
          ? `🥈 Vice-Campeã da Série Ouro ${lastHistory.year} (${ouro.totalScore.toFixed(1)} pts)`
          : ouro.rank >= 16
          ? `⬇️ ${ouro.rank}º Lugar Série Ouro ${lastHistory.year} • Rebaixada (${ouro.totalScore.toFixed(1)} pts)`
          : `${ouro.rank}º Lugar na Série Ouro ${lastHistory.year} (${ouro.totalScore.toFixed(1)} pts)`
      };
    }

    // 3. Check prataStandings
    const prata = lastHistory.prataStandings?.find(
      (s) => s.schoolId === school.id || s.schoolName.toLowerCase() === school.name.toLowerCase()
    );
    if (prata) {
      const prataTotalInSeason = lastHistory.prataStandings?.length || 24;
      const prataRelegatedCount = lastHistory.prataRelegated?.length || (prataTotalInSeason > 16 ? 4 : 3);
      const isPrataRelegated = prata.rank > prataTotalInSeason - prataRelegatedCount;
      const isPrataPromoted = lastHistory.prataPromoted?.includes(prata.schoolName) || prata.rank === 1;

      return {
        tier: 3,
        rank: prata.rank,
        score: prata.totalScore,
        badgeText: prata.rank === 1
          ? `⬆️ Campeã da Série Prata ${lastHistory.year} • Acesso (${prata.totalScore.toFixed(1)} pts)`
          : isPrataPromoted
          ? `⬆️ Vice-Campeã da Série Prata ${lastHistory.year} • Acesso (${prata.totalScore.toFixed(1)} pts)`
          : prata.rank === 2
          ? `🥈 Vice-Campeã da Série Prata ${lastHistory.year} (${prata.totalScore.toFixed(1)} pts)`
          : isPrataRelegated
          ? `⬇️ ${prata.rank}º Lugar Série Prata ${lastHistory.year} • Rebaixada (${prata.totalScore.toFixed(1)} pts)`
          : `${prata.rank}º Lugar na Série Prata ${lastHistory.year} (${prata.totalScore.toFixed(1)} pts)`
      };
    }

    // 4. Check bronzeStandings
    const bronze = lastHistory.bronzeStandings?.find(
      (s) => s.schoolId === school.id || s.schoolName.toLowerCase() === school.name.toLowerCase()
    );
    if (bronze) {
      const isBronzePromoted = lastHistory.bronzePromoted?.includes(bronze.schoolName) || bronze.rank <= (lastHistory.bronzePromoted?.length || 1);
      const bronzeTotalInSeason = lastHistory.bronzeStandings?.length || 24;
      const bronzeRelegatedCount = lastHistory.bronzeRelegated?.length || (bronzeTotalInSeason > 18 ? 4 : 3);
      const isBronzeRelegated = lastHistory.bronzeRelegated?.includes(bronze.schoolName) || bronze.rank > bronzeTotalInSeason - bronzeRelegatedCount;

      return {
        tier: 4,
        rank: bronze.rank,
        score: bronze.totalScore,
        badgeText: bronze.rank === 1
          ? `🏆 Campeã da Série Bronze ${lastHistory.year} • Acesso (${bronze.totalScore.toFixed(1)} pts)`
          : isBronzePromoted
          ? `⬆️ ${bronze.rank}º Lugar Série Bronze ${lastHistory.year} • Acesso (${bronze.totalScore.toFixed(1)} pts)`
          : bronze.rank === 2
          ? `🥈 Vice-Campeã da Série Bronze ${lastHistory.year} (${bronze.totalScore.toFixed(1)} pts)`
          : isBronzeRelegated
          ? `⬇️ ${bronze.rank}º Lugar Série Bronze ${lastHistory.year} • Rebaixada p/ Avaliação (${bronze.totalScore.toFixed(1)} pts)`
          : `${bronze.rank}º Lugar na Série Bronze ${lastHistory.year} (${bronze.totalScore.toFixed(1)} pts)`
      };
    }

    // 5. Check avaliacaoStandings
    const ava = lastHistory.avaliacaoStandings?.find(
      (s) => s.schoolId === school.id || s.schoolName.toLowerCase() === school.name.toLowerCase()
    );
    if (ava) {
      const isAvaPromoted = lastHistory.avaliacaoPromoted?.includes(ava.schoolName) || ava.rank <= (lastHistory.avaliacaoPromoted?.length || 2);
      const isAvaSuspended = lastHistory.avaliacaoSuspended?.includes(ava.schoolName);

      return {
        tier: 5,
        rank: ava.rank,
        score: ava.totalScore,
        badgeText: ava.rank === 1
          ? `🏆 Campeã do Grupo de Avaliação ${lastHistory.year} • Acesso (${ava.totalScore.toFixed(1)} pts)`
          : isAvaPromoted
          ? `⬆️ ${ava.rank}º Lugar Avaliação ${lastHistory.year} • Acesso à Série Bronze (${ava.totalScore.toFixed(1)} pts)`
          : ava.rank === 2
          ? `🥈 Vice-Campeã de Avaliação ${lastHistory.year} (${ava.totalScore.toFixed(1)} pts)`
          : isAvaSuspended
          ? `⚠️ ${ava.rank}º Lugar Avaliação ${lastHistory.year} • Afastada do Carnaval (${ava.totalScore.toFixed(1)} pts)`
          : `${ava.rank}º Lugar no Grupo de Avaliação ${lastHistory.year} (${ava.totalScore.toFixed(1)} pts)`
      };
    }

    return {
      tier: school.division === 'especial' ? 1 : school.division === 'ouro' ? 2 : school.division === 'prata' ? 3 : school.division === 'bronze' ? 4 : 5,
      rank: 99,
      score: 0,
      badgeText: `Participante do Carnaval ${lastHistory.year}`
    };
  };

  const rawSchools =
    selectedDivision === 'especial'
      ? especialSchools
      : selectedDivision === 'ouro'
      ? ouroSchools
      : selectedDivision === 'prata'
      ? prataSchools
      : selectedDivision === 'bronze'
      ? bronzeSchools
      : selectedDivision === 'avaliacao'
      ? avaliacaoSchools
      : inactiveSchools;

  // Sort schools in order according to the result of the last carnival
  const schools = [...rawSchools].sort((a, b) => {
    const resA = getSchoolLastCarnavalResult(a);
    const resB = getSchoolLastCarnavalResult(b);

    if (selectedDivision === 'especial') {
      if (resA.tier !== resB.tier) return resA.tier - resB.tier;
      return resA.rank - resB.rank;
    } else if (selectedDivision === 'ouro') {
      if (resA.tier !== resB.tier) return resA.tier - resB.tier;
      return resA.rank - resB.rank;
    } else if (selectedDivision === 'prata') {
      if (resA.tier !== resB.tier) return resA.tier - resB.tier;
      return resA.rank - resB.rank;
    } else {
      // Série Bronze
      if (resA.tier !== resB.tier) return resA.tier - resB.tier;
      return resA.rank - resB.rank;
    }
  });

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" />
            <span>Tabela Geral de Agremiações & Histórico</span>
          </h2>
          <p className="text-xs text-slate-400">
            Acompanhe a divisão atual, atributos dos quesitos e o hall de campeãs de anos anteriores.
          </p>
        </div>

        {/* View Switcher: Current Table vs Historical Record */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('current')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'current'
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Tabela Atual {currentYear}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Galeria de Campeãs ({history.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'current' ? (
        <div className="space-y-4">
          {/* Division Selector Separated by Governing League */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  LIGAS & DIVISÕES DO CARNAVAL CARIOCA
                </span>
                <h3 className="text-base font-black text-white mt-1">
                  Administração das 5 Divisões
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                LIESA (Especial) • LIGA RJ (Ouro) • Superliga (Prata, Bronze, Avaliação)
              </span>
            </div>

            <div className="flex items-center overflow-x-auto no-scrollbar gap-2.5 pb-1 max-w-full">
              {/* LIESA */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                <span className="text-[10px] font-black uppercase px-2 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  LIESA
                </span>
                <button
                  onClick={() => setSelectedDivision('especial')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    selectedDivision === 'especial'
                      ? 'bg-amber-500 text-slate-950 font-black shadow'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>Grupo Especial</span>
                  <span className="text-[10px] font-mono opacity-80">({especialSchools.length})</span>
                </button>
              </div>

              {/* LIGA RJ */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                <span className="text-[10px] font-black uppercase px-2 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  LIGA RJ
                </span>
                <button
                  onClick={() => setSelectedDivision('ouro')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    selectedDivision === 'ouro'
                      ? 'bg-blue-500 text-white font-black shadow'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>Série Ouro</span>
                  <span className="text-[10px] font-mono opacity-80">({ouroSchools.length})</span>
                </button>
              </div>

              {/* SUPERLIGA */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                <span className="text-[10px] font-black uppercase px-2 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  SUPERLIGA
                </span>
                <button
                  onClick={() => setSelectedDivision('prata')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                    selectedDivision === 'prata'
                      ? 'bg-slate-300 text-slate-950 font-black shadow'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>Série Prata</span>
                  <span className="text-[10px] font-mono opacity-80">({prataSchools.length})</span>
                </button>
                <button
                  onClick={() => setSelectedDivision('bronze')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                    selectedDivision === 'bronze'
                      ? 'bg-amber-700 text-amber-100 font-black shadow ring-1 ring-amber-500'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>Série Bronze</span>
                  <span className="text-[10px] font-mono opacity-80">({bronzeSchools.length})</span>
                </button>
                <button
                  onClick={() => setSelectedDivision('avaliacao')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                    selectedDivision === 'avaliacao'
                      ? 'bg-purple-600 text-white font-black shadow ring-1 ring-purple-400'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>Grupo Avaliação</span>
                  <span className="text-[10px] font-mono opacity-80">({avaliacaoSchools.length})</span>
                </button>
              </div>

              {/* INATIVAS */}
              <button
                onClick={() => setSelectedDivision('inativas')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
                  selectedDivision === 'inativas'
                    ? 'bg-slate-700 text-white font-black ring-1 ring-slate-500'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-300'
                }`}
              >
                <span>Inativas / Afastadas ({inactiveSchools.length})</span>
              </button>
            </div>

            {/* League Administration Information Banner */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                {selectedDivision === 'especial' && (
                  <span>
                    <strong className="text-amber-300">LIESA (Liga Independente das Escolas de Samba do Rio de Janeiro)</strong> • É responsável e administra o Grupo Especial no Sambódromo Marquês de Sapucaí.
                  </span>
                )}
                {selectedDivision === 'ouro' && (
                  <span>
                    <strong className="text-blue-300">LIGA RJ (Liga Independente do Grupo A do Rio de Janeiro)</strong> • Administra e é responsável pela Série Ouro no Sambódromo Marquês de Sapucaí.
                  </span>
                )}
                {['prata', 'bronze', 'avaliacao'].includes(selectedDivision) && (
                  <span>
                    <strong className="text-purple-300">Superliga Carnavalesca do Brasil</strong> • É responsável por administrar a Série Prata, Série Bronze e o Grupo de Avaliação na Estrada Intendente Magalhães.
                  </span>
                )}
                {selectedDivision === 'inativas' && (
                  <span>
                    <strong className="text-slate-300">Histórico do Carnaval</strong> • Agremiações temporariamente inativas ou afastadas com direito de retorno através da Superliga.
                  </span>
                )}
              </div>

              <div className="text-[11px] text-slate-400 sm:text-right shrink-0">
                {selectedDivision === 'especial' && '1º ao 6º no Desfile das Campeãs | 12º Rebaixado'}
                {selectedDivision === 'ouro' && 'Campeã sobe ao Especial | 2 últimas caem para a Prata'}
                {selectedDivision === 'prata' && 'Acesso para a Série Ouro | Rebaixamento para Série Bronze'}
                {selectedDivision === 'bronze' && 'Acesso para a Série Prata | Rebaixamento para Grupo de Avaliação'}
                {selectedDivision === 'avaliacao' && 'Acesso para a Série Bronze | Últimas colocadas são afastadas'}
              </div>
            </div>
          </div>

          {/* School Roster Cards with Accordion Details */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-3">
            {schools.map((school, index) => {
              const isUser = school.id === userSchool?.id;
              const isExpanded = expandedSchoolId === school.id;
              const stats = getSchoolConsolidatedStats(school);

              const lastCarnavalInfo = getSchoolLastCarnavalResult(school);

              return (
                <div
                  key={school.id}
                  className={`rounded-xl border transition-all ${
                    isUser
                      ? 'bg-slate-800/80 border-amber-500/50 shadow-md'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div
                    onClick={() => setExpandedSchoolId(isExpanded ? null : school.id)}
                    className="p-4 flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center font-mono font-bold text-xs text-slate-300 flex-shrink-0">
                        {index + 1}
                      </div>

                      <div
                        className="w-4 h-4 rounded-full border flex-shrink-0"
                        style={{
                          backgroundColor: school.colors.primary,
                          borderColor: school.colors.border || '#fff'
                        }}
                      />

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-white text-sm truncate">
                            {cleanSchoolName(school)}
                          </h4>
                          {isUser && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500 text-slate-950">
                              Sua Escola
                            </span>
                          )}
                        </div>
                        <div className="sm:hidden text-[10px] text-amber-400/90 font-medium">
                          {stats.grandTotalTitles > 0 ? `${stats.grandTotalTitles} título${stats.grandTotalTitles === 1 ? '' : 's'}` : 'Em busca do 1º título'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <div className="text-right hidden sm:block">
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">Títulos & Conquistas</div>
                        <div className="font-bold text-amber-400">
                          {stats.totalEspecialTitles} Esp ({stats.totalEspecialVices} vices) • {stats.totalOuroTitles} Ouro ({stats.totalOuroVices} vices)
                          {stats.totalPrataTitles > 0 ? ` • ${stats.totalPrataTitles} Prata` : ''}
                          {stats.totalBronzeTitles > 0 ? ` • ${stats.totalBronzeTitles} Bronze` : ''}
                        </div>
                        <div className="text-[10px] text-slate-300 font-semibold mt-0.5">
                          Total Acumulado: {stats.grandTotalTitles} Título{stats.grandTotalTitles === 1 ? '' : 's'} • {stats.grandTotalConquests} Conquista{stats.grandTotalConquests === 1 ? '' : 's'}
                        </div>
                      </div>

                      <div className="text-slate-400">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details Breakdown - Perfil da Agremiação */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-slate-800/80 space-y-3 text-xs animate-fadeIn">
                      {/* Informações Cadastrais Oficiais com Denominação Estatutária */}
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2.5">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                          <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                            Perfil Cadastral da Agremiação
                          </div>
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            {getSchoolDenomination(school)} • {getSchoolDenominationExtenso(school)}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-slate-300">
                          <div className="sm:col-span-2">
                            <span className="text-slate-500 text-[10px] block uppercase">Razão Social / Nome de Registro</span>
                            <span className="font-semibold text-white">{getSchoolCorporateName(school)}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 text-[10px] block uppercase">Nome Completo</span>
                            <span className="font-semibold text-white">{cleanSchoolName(school)}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 text-[10px] block uppercase">Nome Chamado</span>
                            <span className="font-semibold text-white">{school.shortName}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 text-[10px] block uppercase">Abreviação / Sigla</span>
                            <span className="font-mono font-bold text-amber-300">{school.abbreviation || '—'}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 text-[10px] block uppercase">Fundação</span>
                            <span className="font-semibold text-white">{school.foundationDate || school.foundationYear}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 text-[10px] block uppercase">Bairro / Sede</span>
                            <span className="font-semibold text-white">{school.neighborhood}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 text-[10px] block uppercase">Cores Oficiais</span>
                            <span className="font-semibold text-white">{school.colorsDescription || 'Tradicionais'}</span>
                          </div>
                          <div className="sm:col-span-4">
                            <span className="text-slate-500 text-[10px] block uppercase">Símbolo Oficial</span>
                            <span className="font-semibold text-white">{school.symbol}</span>
                          </div>
                          {(school.motto || school.nickname) && (
                            <div className="sm:col-span-4">
                              <span className="text-slate-500 text-[10px] block uppercase">Lema / Apelido Comunitário</span>
                              <span className="font-semibold text-amber-300 italic">"{school.motto || school.nickname}"</span>
                            </div>
                          )}

                          {(school.suspensionReason || school.inactiveReason) && (
                            <div className="sm:col-span-4 p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-200">
                              <span className="text-[10px] text-rose-400 block uppercase font-bold tracking-wider">
                                Situação Estatutária na Superliga / LIESA
                              </span>
                              <span className="text-xs font-medium">
                                {school.suspensionReason || school.inactiveReason}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quadro Histórico de Títulos e Glórias */}
                      {(stats.allEspecialYears.length > 0 || (stats.allEspecialRunnerUpYears && stats.allEspecialRunnerUpYears.length > 0) || stats.allOuroYears.length > 0 || (stats.allOuroRunnerUpYears && stats.allOuroRunnerUpYears.length > 0)) && (
                        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                          <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center justify-between">
                            <span>Histórico Oficial de Conquistas no Carnaval</span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              Total: {stats.grandTotalTitles} título{stats.grandTotalTitles === 1 ? '' : 's'} • {stats.grandTotalVices} vice{stats.grandTotalVices === 1 ? '' : 's'}
                            </span>
                          </div>

                          {/* Títulos Especial */}
                          {stats.allEspecialYears.length > 0 && (
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-amber-300 uppercase block">
                                ★ Títulos do Grupo Especial ({stats.totalEspecialTitles}):
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {stats.allEspecialYears.map((entry, idx) => (
                                  <span
                                    key={`${entry.year}-${idx}`}
                                    className={`px-1.5 py-0.5 rounded text-[11px] font-mono font-bold border ${
                                      entry.label?.includes('Supercampeã')
                                        ? 'bg-amber-400 text-slate-950 border-amber-300 font-black'
                                        : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                    }`}
                                  >
                                    {entry.label || entry.year}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Vices Especial */}
                          {stats.allEspecialRunnerUpYears && stats.allEspecialRunnerUpYears.length > 0 && (
                            <div className="space-y-1 pt-1">
                              <span className="text-[10px] font-bold text-slate-300 uppercase block">
                                🥈 Vice-Campeonatos do Grupo Especial ({stats.totalEspecialVices}):
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {stats.allEspecialRunnerUpYears.map((entry, idx) => (
                                  <span
                                    key={`${entry.year}-${idx}`}
                                    className="px-1.5 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-800/90 text-slate-300 border border-slate-700/70"
                                  >
                                    {entry.label || entry.year}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Títulos Ouro */}
                          {stats.allOuroYears.length > 0 && (
                            <div className="space-y-1 pt-1">
                              <span className="text-[10px] font-bold text-blue-400 uppercase block">
                                ✦ Títulos da Série Ouro ({stats.totalOuroTitles}):
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {stats.allOuroYears.map((entry) => (
                                  <span
                                    key={entry.year}
                                    className="px-1.5 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30"
                                  >
                                    {entry.year}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Vices Ouro */}
                          {stats.allOuroRunnerUpYears && stats.allOuroRunnerUpYears.length > 0 && (
                            <div className="space-y-1 pt-1">
                              <span className="text-[10px] font-bold text-blue-300 uppercase block">
                                🥈 Vice-Campeonatos da Série Ouro ({stats.totalOuroVices}):
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {stats.allOuroRunnerUpYears.map((entry, idx) => (
                                  <span
                                    key={`${entry.year}-${idx}`}
                                    className="px-1.5 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-800/90 text-blue-200 border border-blue-500/30"
                                  >
                                    {entry.label || entry.year}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Atributos Técnicos da Escola (Pontuação Base de Desfile)
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                        {QUESITOS.map((q) => (
                          <div
                            key={q.id}
                            className="p-2.5 rounded-lg bg-slate-900 border border-slate-800"
                          >
                            <div className="text-[10px] text-slate-400 truncate">{q.name}</div>
                            <div className="text-sm font-bold text-amber-400 font-mono">
                              {school.attributes[q.id]} pts
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Profissionais / Corpo Técnico */}
                      {school.staff && (
                        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                          <div className="text-[10px] font-bold text-slate-400 uppercase">
                            Corpo Técnico & Profissionais Oficiais
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-[11px]">
                            <div>
                              <span className="text-slate-500 text-[10px] block">Carnavalesco</span>
                              <strong className="text-white truncate block">{school.staff.carnavalesco?.name || 'A definir'}</strong>
                            </div>
                            <div>
                              <span className="text-slate-500 text-[10px] block">Mestre Bateria</span>
                              <strong className="text-white truncate block">{school.staff.mestreBateria?.name || 'A definir'}</strong>
                            </div>
                            <div>
                              <span className="text-slate-500 text-[10px] block">Harmonia</span>
                              <strong className="text-white truncate block">{school.staff.harmonia?.name || 'A definir'}</strong>
                            </div>
                            <div>
                              <span className="text-slate-500 text-[10px] block">1º Casal MS/PB</span>
                              <strong className="text-white truncate block">{school.staff.mestreSalaPortaBandeira?.name || 'A definir'}</strong>
                            </div>
                            <div>
                              <span className="text-slate-500 text-[10px] block">Intérprete</span>
                              <strong className="text-white truncate block">{school.staff.interprete?.name || 'A definir'}</strong>
                            </div>
                            <div>
                              <span className="text-slate-500 text-[10px] block">Comissão Frente</span>
                              <strong className="text-white truncate block">{school.staff.coreografo?.name || 'A definir'}</strong>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="pt-2 flex flex-wrap items-center justify-between text-slate-400 text-xs gap-2">
                        <div>
                          Lema: <strong className="text-amber-200">"{school.nickname}"</strong>
                        </div>
                        <div>
                          Orçamento Anual: <strong className="text-emerald-400 font-mono">R$ {school.budget.toLocaleString('pt-BR')}</strong>
                        </div>
                      </div>

                      {(school.isInactive || (school as any).inactive) && onReactivateSchool && (
                        <div className="pt-2.5 mt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                          <div className="text-[11px] text-slate-300">
                            Ficha oficial preservada na LIGA / Superliga com direito estatutário de retorno às disputas.
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onReactivateSchool(school.id);
                            }}
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md shrink-0"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Reativar Agremiação para Avaliação</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* History Hall of Fame */
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">
              Histórico Temporada a Temporada (Acessos, Rebaixamentos e Campeãs)
            </h3>
          </div>

          {history.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              Nenhuma temporada concluída ainda! Conclua a primeira apuração do Carnaval {currentYear}
              para inaugurar o livro de ouro da LIESA!
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((record) => (
                <div
                  key={record.year}
                  className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-base font-black text-amber-400 font-mono">
                      CARNAVAL {record.year}
                    </span>
                    <span className="text-xs text-slate-400">Resultados Oficiais Homologados</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                    {/* Especial Summary */}
                    <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-2">
                      <div className="font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Trophy className="w-4 h-4 text-amber-400" />
                        <span>Grupo Especial {record.year}</span>
                      </div>
                      <div>
                        Campeã: <strong className="text-white text-sm">{cleanSchoolName(record.especialChampion)}</strong>
                      </div>
                      <div className="text-rose-400">
                        Rebaixada p/ Série Ouro: <strong>{record.especialRelegated.map(s => cleanSchoolName(s)).join(', ') || 'Nenhuma'}</strong>
                      </div>
                    </div>

                    {/* Série Ouro Summary */}
                    <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-2">
                      <div className="font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-blue-400" />
                        <span>Série Ouro {record.year}</span>
                      </div>
                      <div>
                        Campeã & Acesso: <strong className="text-emerald-400 text-sm">{cleanSchoolName(record.ouroChampion)}</strong>
                      </div>
                      <div className="text-rose-400">
                        Rebaixadas p/ Série Prata: <strong>{record.ouroRelegated.map(s => cleanSchoolName(s)).join(', ') || 'Nenhuma'}</strong>
                      </div>
                    </div>

                    {/* Série Prata Summary */}
                    <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-2">
                      <div className="font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                        <Trophy className="w-4 h-4 text-slate-400" />
                        <span>Série Prata {record.year}</span>
                      </div>
                      <div>
                        Campeã da Prata: <strong className="text-white text-sm">{cleanSchoolName(record.prataChampion) || 'Desconhecida'}</strong>
                      </div>
                      <div className="text-emerald-400">
                        Promovidas p/ Série Ouro: <strong>{record.prataPromoted?.map(s => cleanSchoolName(s)).join(', ') || cleanSchoolName(record.prataChampion) || 'Nenhuma'}</strong>
                      </div>
                      {record.prataRelegated && record.prataRelegated.length > 0 && (
                        <div className="text-rose-400">
                          Rebaixadas p/ Bronze: <strong>{record.prataRelegated.map(s => cleanSchoolName(s)).join(', ')}</strong>
                        </div>
                      )}
                    </div>

                    {/* Série Bronze Summary */}
                    <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-2">
                      <div className="font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Trophy className="w-4 h-4 text-amber-600" />
                        <span>Série Bronze {record.year}</span>
                      </div>
                      <div>
                        Campeã da Bronze: <strong className="text-amber-300 text-sm">{cleanSchoolName(record.bronzeChampion) || 'Desconhecida'}</strong>
                      </div>
                      <div className="text-emerald-400">
                        Promovidas p/ Prata: <strong>{record.bronzePromoted?.map(s => cleanSchoolName(s)).join(', ') || cleanSchoolName(record.bronzeChampion) || 'Nenhuma'}</strong>
                      </div>
                      {record.bronzeRelegated && record.bronzeRelegated.length > 0 && (
                        <div className="text-rose-400">
                          Rebaixadas p/ Avaliação: <strong>{record.bronzeRelegated.map(s => cleanSchoolName(s)).join(', ')}</strong>
                        </div>
                      )}
                    </div>

                    {/* Grupo de Avaliação Summary */}
                    <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-2">
                      <div className="font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Trophy className="w-4 h-4 text-purple-500" />
                        <span>Grupo Avaliação {record.year}</span>
                      </div>
                      <div>
                        Campeã da Avaliação: <strong className="text-purple-300 text-sm">{cleanSchoolName(record.avaliacaoChampion) || 'Desconhecida'}</strong>
                      </div>
                      <div className="text-emerald-400">
                        Promovidas p/ Bronze: <strong>{record.avaliacaoPromoted?.map(s => cleanSchoolName(s)).join(', ') || cleanSchoolName(record.avaliacaoChampion) || 'Nenhuma'}</strong>
                      </div>
                      {record.avaliacaoSuspended && record.avaliacaoSuspended.length > 0 && (
                        <div className="text-purple-300">
                          Afastadas (Mín. 1 ano fora): <strong>{record.avaliacaoSuspended.map(s => cleanSchoolName(s)).join(', ')}</strong>
                        </div>
                      )}
                      {(record.reactivatedSchools && record.reactivatedSchools.length > 0) && (
                        <div className="text-cyan-300 text-[11px]">
                          Reativadas: <strong>{record.reactivatedSchools.map(s => cleanSchoolName(s)).join(', ')}</strong>
                        </div>
                      )}
                      {(record.newSchools && record.newSchools.length > 0) && (
                        <div className="text-amber-300 text-[11px]">
                          Novas Fundações: <strong>{record.newSchools.map(s => cleanSchoolName(s)).join(', ')}</strong>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
