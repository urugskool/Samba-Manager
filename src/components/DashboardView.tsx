import React from 'react';
import { School, NewsItem } from '../types/carnaval';
import { getSchoolConsolidatedStats } from '../data/carnavalData';
import {
  cleanSchoolName,
  getSchoolCorporateName,
  getSchoolDenomination
} from '../utils/schoolNameUtils';
import {
  Trophy,
  Calendar,
  Sparkles,
  Award,
  Users,
  Compass,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface DashboardViewProps {
  school: School;
  currentYear: number;
  onNavigateTab: (tab: string) => void;
  news: NewsItem[];
  onStartSimulation: () => void;
  hasParadeResults: boolean;
  allParadesCompleted?: boolean;
  completedParadesCount?: number;
  totalParadesCount?: number;
  onSimulateAllParades?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  school,
  currentYear,
  onNavigateTab,
  news,
  onStartSimulation,
  hasParadeResults,
  allParadesCompleted = false,
  completedParadesCount = 0,
  totalParadesCount = 53,
  onSimulateAllParades
}) => {
  const stats = getSchoolConsolidatedStats(school);

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Hero Banner with School Colors & Heritage */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 sm:p-8 border shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${school.colors.primary}dd 0%, #090d16 80%)`,
          borderColor: school.colors.border || '#334155'
        }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm ${
                  school.division === 'especial'
                    ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
                    : school.division === 'ouro'
                    ? 'bg-blue-500 text-white ring-2 ring-blue-400'
                    : school.division === 'prata'
                    ? 'bg-slate-300 text-slate-950 ring-2 ring-slate-200'
                    : school.division === 'bronze'
                    ? 'bg-amber-700 text-amber-100 ring-2 ring-amber-500'
                    : 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                }`}
              >
                {school.division === 'especial'
                  ? '🌟 Grupo Especial'
                  : school.division === 'ouro'
                  ? '✨ Série Ouro'
                  : school.division === 'prata'
                  ? '🥈 Série Prata'
                  : school.division === 'bronze'
                  ? '🥉 Série Bronze'
                  : '🟢 Grupo de Avaliação'}
              </span>
              <span className="text-xs text-slate-300 bg-slate-900/60 px-2.5 py-0.5 rounded-full border border-slate-700">
                Fundada em {school.foundationYear} • {school.neighborhood}
              </span>
              <span className="text-xs font-bold text-amber-300 bg-amber-950/70 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                {getSchoolDenomination(school)} • {getSchoolCorporateName(school)}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>{cleanSchoolName(school)}</span>
            </h1>

            <p className="text-sm font-semibold text-amber-200/90 italic flex items-center gap-1.5">
              <span>"{school.nickname}"</span> • <span>Símbolo: {school.symbol}</span>
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-200">
              <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                <Trophy className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>
                  <strong>{stats.totalEspecialTitles}</strong> Título{stats.totalEspecialTitles === 1 ? '' : 's'} ({stats.totalEspecialVices} Vices) Especial
                </span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                <Award className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>
                  <strong>{stats.totalOuroTitles}</strong> Título{stats.totalOuroTitles === 1 ? '' : 's'} ({stats.totalOuroVices} Vices) Ouro
                </span>
              </div>
              {stats.totalPrataTitles > 0 && (
                <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                  <Award className="w-4 h-4 text-slate-300 flex-shrink-0" />
                  <span>
                    <strong>{stats.totalPrataTitles}</strong> Título{stats.totalPrataTitles === 1 ? '' : 's'} ({stats.totalPrataVices} Vices) Prata
                  </span>
                </div>
              )}
              {stats.totalBronzeTitles > 0 && (
                <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                  <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>
                    <strong>{stats.totalBronzeTitles}</strong> Título{stats.totalBronzeTitles === 1 ? '' : 's'} ({stats.totalBronzeVices} Vices) Bronze
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1.5 bg-amber-500/15 px-3 py-1.5 rounded-lg border border-amber-500/30 text-amber-300 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Total: {stats.grandTotalTitles} Título{stats.grandTotalTitles === 1 ? '' : 's'} • {stats.grandTotalConquests} Conquistas</span>
              </div>
              <button
                onClick={() => onNavigateTab('glorias')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold transition text-xs"
              >
                <span>Sala de Glórias & Conquistas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Action Button to Parade or Apuração */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => onNavigateTab('desfile')}
              className={`px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-black text-xs sm:text-sm transition shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                !allParadesCompleted
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 hover:from-amber-300 hover:to-amber-500 shadow-amber-500/25 ring-2 ring-amber-400/40 animate-pulse'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/40'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span className="truncate">
                {!allParadesCompleted
                  ? `Assistir & Simular Desfiles (${completedParadesCount}/${totalParadesCount})`
                  : 'Ver Desfiles (Concluídos)'}
              </span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <button
              onClick={() => {
                if (!hasParadeResults) {
                  onStartSimulation();
                }
                onNavigateTab('apuracao');
              }}
              className={`px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-black text-xs sm:text-sm transition shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                allParadesCompleted
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-emerald-500/25 ring-2 ring-emerald-400/50'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              <Trophy className={`w-4 h-4 shrink-0 ${allParadesCompleted ? 'text-slate-950' : 'text-amber-400/60'}`} />
              <span className="truncate">
                {allParadesCompleted
                  ? 'Apuração das Notas (Liberada)'
                  : 'Apuração (Aguarda Desfiles)'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Preparation Metrics & Readiness Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Barracão Progress */}
        <div
          onClick={() => onNavigateTab('barracao')}
          className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 rounded-xl p-4 transition cursor-pointer group shadow"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Alegorias & Fantasias</span>
            <span className="font-mono text-amber-400 font-bold">{school.barracaoProgress}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5 mb-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-yellow-400 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${school.barracaoProgress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>Status no Barracão</span>
            <span className="text-amber-400 font-bold group-hover:underline flex items-center gap-1">
              Gerenciar <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Rehearsal / Quadra Progress */}
        <div
          onClick={() => onNavigateTab('ensaios')}
          className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 rounded-xl p-4 transition cursor-pointer group shadow"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Harmonia & Ensaios</span>
            <span className="font-mono text-emerald-400 font-bold">{school.rehearsalLevel}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5 mb-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${school.rehearsalLevel}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>Ensaio Técnico na Sapucaí</span>
            <span className="text-emerald-400 font-bold group-hover:underline flex items-center gap-1">
              {school.technicalParadeDone ? 'Realizado' : 'Pendente'} <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Budget Status */}
        <div
          onClick={() => onNavigateTab('financas')}
          className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 rounded-xl p-4 transition cursor-pointer group shadow"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Tesouraria</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-black text-white font-mono mb-2">
            R$ {school.budget.toLocaleString('pt-BR')}
          </div>
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>Patrocínios & Bilheteria</span>
            <span className="text-emerald-400 font-bold group-hover:underline flex items-center gap-1">
              Ver Caixa <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Fan Base & Community */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Moral da Comunidade</span>
            <Users className="w-4 h-4 text-rose-400" />
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5 mb-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-rose-500 to-pink-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${school.fanBaseMorale}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>Empolgação dos Componentes</span>
            <span className="text-rose-400 font-bold">{school.fanBaseMorale}%</span>
          </div>
        </div>
      </div>

      {/* Enredo Banner & Staff Quick Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enredo Info */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Compass className="w-4 h-4" />
              <span>Enredo do Carnaval {currentYear}</span>
            </div>
            <button
              onClick={() => onNavigateTab('barracao')}
              className="text-xs text-amber-400 hover:underline font-semibold"
            >
              Trocar Enredo
            </button>
          </div>

          {school.currentEnredo ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {school.currentEnredo.themeType}
                </span>
                <h3 className="text-lg font-bold text-white">
                  "{school.currentEnredo.title}"
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {school.currentEnredo.synopsis}
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
                <span>
                  Bônus Estético: <strong className="text-emerald-400">+{school.currentEnredo.qualityBoost} pts</strong>
                </span>
                <span>
                  Investimento de Produção: <strong className="text-white">R$ {school.currentEnredo.cost.toLocaleString('pt-BR')}</strong>
                </span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
              <p className="text-xs text-amber-300 font-semibold mb-2">
                Nenhum enredo selecionado ainda para a escola!
              </p>
              <button
                onClick={() => onNavigateTab('barracao')}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs"
              >
                Escolher Enredo no Barracão
              </button>
            </div>
          )}

          {/* Key Staff Cards */}
          <div className="pt-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Comissão de Carnaval & Mestres Titulares
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Carnavalesco</div>
                <div className="text-xs font-bold text-white truncate">{school.staff.carnavalesco.name}</div>
                <div className="text-[10px] text-amber-400 font-semibold">Nota {school.staff.carnavalesco.rating}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Mestre de Bateria</div>
                <div className="text-xs font-bold text-white truncate">{school.staff.mestreBateria.name}</div>
                <div className="text-[10px] text-amber-400 font-semibold">Nota {school.staff.mestreBateria.rating}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Intérprete Oficial</div>
                <div className="text-xs font-bold text-white truncate">{school.staff.interprete.name}</div>
                <div className="text-[10px] text-amber-400 font-semibold">Nota {school.staff.interprete.rating}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Jornal do Samba (Brasfoot News Feed) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow flex flex-col">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-amber-400 font-bold text-sm">
            <Calendar className="w-4 h-4" />
            <span>Jornal da Sapucaí</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pt-3 pr-1 max-h-72">
            {news.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-lg bg-slate-950/50 border border-slate-800/80 text-xs space-y-1 hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300">{item.title}</span>
                  <span className="text-[10px] text-slate-500">{item.date}</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
