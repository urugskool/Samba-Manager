/**
 * SERVIÇO DE PARTICIPAÇÕES HISTÓRICAS POR GRUPO
 * 
 * Computa de forma unificada e autoritativa o ranking de presenças,
 * títulos e vices para cada divisão do Carnaval Carioca:
 * - Grupo Especial
 * - Série Ouro
 * - Série Prata
 * - Série Bronze
 * - Grupo de Avaliação
 */

import type { School, YearHistory, DivisionId } from '../types/carnaval';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import { HISTORICAL_CARNAVAL_RECORDS, INITIAL_SCHOOLS } from '../data/carnavalData';
import { OFFICIAL_LIESA_HISTORICAL_STANDINGS } from './liesaRankingService';
import { OFFICIAL_OURO_HISTORICAL_STANDINGS } from '../data/ouroHistoricalData';
import { OFFICIAL_AVALIACAO_YEARLY_RESULTS, OFFICIAL_AVALIACAO_RECORDS_BY_SCHOOL } from '../data/avaliacaoChampionsData';

export interface GroupParticipationRecord {
  position: number;
  schoolId: string;
  schoolName: string;
  school?: School;
  totalParticipations: number;
  years: number[];
  firstYear: number;
  lastYear: number;
  titlesCount: number;
  vicesCount: number;
  currentDivision?: DivisionId;
  isCurrentlyInGroup?: boolean;
}

/**
 * Normaliza e resolve o ID canônico de uma escola a partir de ID ou nome
 */
function resolveSchoolId(rawId: string, rawName?: string, schoolsMap?: Map<string, School>): string {
  const clean = (rawId || '').toLowerCase().trim();
  if (clean === 'renascer_de_jacarepagua' || clean === 'renascer_jacarepagua') return 'renascer_jacarepagua';
  if (clean && schoolsMap?.has(clean)) return clean;

  const name = (rawName || '').toLowerCase().trim();
  if (name.includes('maricá') || name.includes('marica')) return 'marica';
  if (name.includes('imperio serrano') || name.includes('império serrano')) return 'imperio_serrano';
  if (name.includes('padre miguel') && name.includes('unidos')) return 'unidos_padre_miguel';
  if (name.includes('ilha do governador') || (name.includes('união') && name.includes('ilha'))) return 'uniao_da_ilha';
  if (name.includes('cima da hora')) return 'em_cima_da_hora';
  if (name.includes('estácio') || name.includes('estacio')) return 'estacio_de_sa';
  if (name.includes('porto da pedra')) return 'porto_da_pedra';
  if (name.includes('parque acari')) return 'parque_acari';
  if (name.includes('botafogo')) return 'botafogo_samba_clube';
  if (name.includes('vigário') || name.includes('vigario')) return 'vigario_geral';
  if (name.includes('ponte')) return 'unidos_da_ponte';
  if (name.includes('bangu')) return 'unidos_de_bangu';
  if (name.includes('arranco')) return 'arranco';
  if (name.includes('inocentes')) return 'inocentes';
  if (name.includes('jacarezinho')) return 'jacarezinho';
  if (name.includes('portela')) return 'portela';
  if (name.includes('mangueira')) return 'mangueira';
  if (name.includes('viradouro')) return 'viradouro';
  if (name.includes('beija-flor') || name.includes('beija flor')) return 'beija_flor';
  if (name.includes('salgueiro')) return 'salgueiro';
  if (name.includes('vila isabel')) return 'vila_isabel';
  if (name.includes('imperatriz')) return 'imperatriz';
  if (name.includes('tijuca') && !name.includes('império')) return 'tijuca';
  if (name.includes('grande rio')) return 'grande_rio';
  if (name.includes('tuiuti')) return 'tuiuti';
  if (name.includes('mocidade') && !name.includes('santa marta')) return 'mocidade';
  if (name.includes('niterói') || name.includes('niteroi')) return 'niteroi';
  if (name.includes('santa cruz')) return 'santa_cruz';
  if (name.includes('são clemente') || name.includes('sao clemente')) return 'sao_clemente';
  if (name.includes('tradição') || name.includes('tradicao')) return 'tradicao';
  if (name.includes('cubango')) return 'cubango';
  if (name.includes('rocinha')) return 'rocinha';
  if (name.includes('lins')) return 'lins_imperial';
  if (name.includes('sossego')) return 'academicos_do_sossego';
  if (name.includes('renascer de nova iguaçu') || name.includes('renascer de nova iguacu')) return 'renascer_de_nova_iguacu';
  if (name.includes('renascer de vaz lobo')) return 'gres_renascer_de_vaz_lobo';
  if (name.includes('renascer')) return 'renascer_jacarepagua';
  if (name.includes('alegria da zona sul') || clean.includes('alegria_da_zona_sul')) return 'alegria_da_zona_sul';
  if (name.includes('curicica') || clean.includes('curicica')) return 'curicica';
  if (name.includes('caprichosos')) return 'caprichosos_de_pilares';
  if (name.includes('lucas')) return 'unidos_de_lucas';

  return clean || name.replace(/\s+/g, '_');
}

/**
 * Computa o ranking de participações para qualquer divisão solicitada
 */
export function computeDivisionParticipationsList(
  division: DivisionId,
  allSchools: School[] = INITIAL_SCHOOLS,
  inGameHistory: YearHistory[] = []
): GroupParticipationRecord[] {
  const effectiveSchools = allSchools && allSchools.length > 0 ? allSchools : INITIAL_SCHOOLS;
  const schoolsMap = new Map<string, School>();
  effectiveSchools.forEach((s) => schoolsMap.set(s.id, s));

  const participationsMap = new Map<
    string,
    {
      schoolId: string;
      schoolName: string;
      years: Set<number>;
      titlesCount: number;
      vicesCount: number;
    }
  >();

  const getOrCreate = (rawId?: string, rawName?: string) => {
    const sId = resolveSchoolId(rawId || '', rawName, schoolsMap);
    if (!participationsMap.has(sId)) {
      const sch = schoolsMap.get(sId);
      participationsMap.set(sId, {
        schoolId: sId,
        schoolName: sch ? cleanSchoolName(sch) : rawName || sId,
        years: new Set<number>(),
        titlesCount: 0,
        vicesCount: 0
      });
    }
    return participationsMap.get(sId)!;
  };

  // 1. GRUPO ESPECIAL
  if (division === 'especial') {
    // Processa todos os anos catalogados oficiais (1932 a 2026)
    Object.entries(OFFICIAL_LIESA_HISTORICAL_STANDINGS).forEach(([yrStr, standings]) => {
      const yr = Number(yrStr);
      if (yr === 2021 || yr === 1952 || !standings || standings.length === 0) return;

      standings.forEach((st) => {
        const item = getOrCreate(st.schoolId, st.schoolName);
        item.years.add(yr);
        if (!st.isHorsConcours) {
          if (st.rank === 1) item.titlesCount++;
          else if (st.rank === 2) item.vicesCount++;
          if (yr === 1984 && item.schoolId === 'mangueira') item.titlesCount++;
          if (yr === 1984 && item.schoolId === 'portela') item.vicesCount++;
        }
      });
    });

    // Processa anos decorridos no save (> 2026)
    inGameHistory.forEach((h) => {
      if (h.year > 2026 && h.especialStandings && h.especialStandings.length > 0) {
        h.especialStandings.forEach((st) => {
          if (!st.schoolId && !st.schoolName) return;
          const item = getOrCreate(st.schoolId, st.schoolName);
          item.years.add(h.year);
          if (st.rank === 1) item.titlesCount++;
          else if (st.rank === 2) item.vicesCount++;
        });
      }
    });
  }

  // 2. SÉRIE OURO
  else if (division === 'ouro') {
    // Registros históricos canônicos (títulos e vices da Série Ouro)
    Object.entries(HISTORICAL_CARNAVAL_RECORDS).forEach(([id, rec]) => {
      if ((rec.ouroYears && rec.ouroYears.length > 0) || (rec.ouroRunnerUpYears && rec.ouroRunnerUpYears.length > 0)) {
        const sch = schoolsMap.get(id);
        const item = getOrCreate(id, sch ? sch.name : undefined);
        rec.ouroYears?.forEach((y) => {
          item.years.add(y);
          item.titlesCount++;
        });
        rec.ouroRunnerUpYears?.forEach((y) => {
          item.years.add(y);
          item.vicesCount++;
        });
      }
    });

    // Resultados oficiais catalogados da Série Ouro (ex: 2026 e anteriores)
    Object.entries(OFFICIAL_OURO_HISTORICAL_STANDINGS).forEach(([yrStr, standings]) => {
      const yr = Number(yrStr);
      standings.forEach((st) => {
        const item = getOrCreate(st.schoolId, st.schoolName);
        const alreadyHadYear = item.years.has(yr);
        item.years.add(yr);
        if (st.rank === 1 && !alreadyHadYear && !st.isHorsConcours) item.titlesCount++;
        else if (st.rank === 2 && !alreadyHadYear && !st.isHorsConcours) item.vicesCount++;
      });
    });

    // In-game history (temporadas do save)
    inGameHistory.forEach((h) => {
      if (h.ouroStandings && h.ouroStandings.length > 0) {
        h.ouroStandings.forEach((st) => {
          const item = getOrCreate(st.schoolId, st.schoolName);
          item.years.add(h.year);
          if (st.rank === 1) item.titlesCount++;
          else if (st.rank === 2) item.vicesCount++;
        });
      }
    });
  }

  // 3. SÉRIE PRATA
  else if (division === 'prata') {
    Object.entries(HISTORICAL_CARNAVAL_RECORDS).forEach(([id, rec]) => {
      if ((rec.prataYears && rec.prataYears.length > 0) || (rec.prataRunnerUpYears && rec.prataRunnerUpYears.length > 0)) {
        const sch = schoolsMap.get(id);
        const item = getOrCreate(id, sch ? sch.name : undefined);
        rec.prataYears?.forEach((y) => {
          item.years.add(y);
          item.titlesCount++;
        });
        rec.prataRunnerUpYears?.forEach((y) => {
          item.years.add(y);
          item.vicesCount++;
        });
      }
    });

    inGameHistory.forEach((h) => {
      if (h.prataStandings && h.prataStandings.length > 0) {
        h.prataStandings.forEach((st) => {
          const item = getOrCreate(st.schoolId, st.schoolName);
          item.years.add(h.year);
          if (st.rank === 1) item.titlesCount++;
          else if (st.rank === 2) item.vicesCount++;
        });
      }
    });
  }

  // 4. SÉRIE BRONZE
  else if (division === 'bronze') {
    Object.entries(HISTORICAL_CARNAVAL_RECORDS).forEach(([id, rec]) => {
      if ((rec.bronzeYears && rec.bronzeYears.length > 0) || (rec.bronzeRunnerUpYears && rec.bronzeRunnerUpYears.length > 0)) {
        const sch = schoolsMap.get(id);
        const item = getOrCreate(id, sch ? sch.name : undefined);
        rec.bronzeYears?.forEach((y) => {
          item.years.add(y);
          item.titlesCount++;
        });
        rec.bronzeRunnerUpYears?.forEach((y) => {
          item.years.add(y);
          item.vicesCount++;
        });
      }
    });

    inGameHistory.forEach((h) => {
      if (h.bronzeStandings && h.bronzeStandings.length > 0) {
        h.bronzeStandings.forEach((st) => {
          const item = getOrCreate(st.schoolId, st.schoolName);
          item.years.add(h.year);
          if (st.rank === 1) item.titlesCount++;
          else if (st.rank === 2) item.vicesCount++;
        });
      }
    });
  }

  // 5. GRUPO DE AVALIAÇÃO
  else if (division === 'avaliacao') {
    // Registros consolidados de Avaliação (1989-2026)
    OFFICIAL_AVALIACAO_YEARLY_RESULTS.forEach((yrRes) => {
      yrRes.champions.forEach((c) => {
        const item = getOrCreate(c.schoolId, c.schoolName);
        item.years.add(yrRes.year);
        item.titlesCount++;
      });
      yrRes.runnerUps.forEach((r) => {
        const item = getOrCreate(r.schoolId, r.schoolName);
        item.years.add(yrRes.year);
        item.vicesCount++;
      });
    });

    Object.entries(OFFICIAL_AVALIACAO_RECORDS_BY_SCHOOL).forEach(([sId, rec]) => {
      const sch = schoolsMap.get(sId);
      const item = getOrCreate(sId, sch ? sch.name : undefined);
      rec.titleYears?.forEach((y) => item.years.add(y));
      rec.runnerUpYears?.forEach((y) => item.years.add(y));
    });

    inGameHistory.forEach((h) => {
      if (h.avaliacaoStandings && h.avaliacaoStandings.length > 0) {
        h.avaliacaoStandings.forEach((st) => {
          const item = getOrCreate(st.schoolId, st.schoolName);
          item.years.add(h.year);
          if (st.rank === 1) item.titlesCount++;
          else if (st.rank === 2) item.vicesCount++;
        });
      }
    });
  }

  // Converte para array ordenado
  const list = Array.from(participationsMap.values())
    .filter((item) => item.years.size > 0)
    .map((item) => {
      const sortedYears = Array.from(item.years).sort((a, b) => b - a);
      const sch = schoolsMap.get(item.schoolId);
      return {
        schoolId: item.schoolId,
        schoolName: sch ? cleanSchoolName(sch) : item.schoolName,
        school: sch,
        totalParticipations: sortedYears.length,
        years: sortedYears,
        firstYear: sortedYears.length > 0 ? sortedYears[sortedYears.length - 1] : 0,
        lastYear: sortedYears.length > 0 ? sortedYears[0] : 0,
        titlesCount: item.titlesCount,
        vicesCount: item.vicesCount,
        currentDivision: sch?.division,
        isCurrentlyInGroup: sch?.division === division
      };
    });

  list.sort((a, b) => {
    if (b.totalParticipations !== a.totalParticipations) {
      return b.totalParticipations - a.totalParticipations;
    }
    if (b.titlesCount !== a.titlesCount) {
      return b.titlesCount - a.titlesCount;
    }
    if (b.vicesCount !== a.vicesCount) {
      return b.vicesCount - a.vicesCount;
    }
    if (b.lastYear !== a.lastYear) {
      return b.lastYear - a.lastYear;
    }
    return a.schoolName.localeCompare(b.schoolName);
  });

  return list.map((item, idx) => ({
    ...item,
    position: idx + 1
  }));
}
