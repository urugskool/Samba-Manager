import { School, YearHistory } from '../types/carnaval';
import { INITIAL_HISTORY } from '../data/carnavalData';

/**
 * Verifica se uma escola é inativa, extinta ou suspensa.
 */
export function isSchoolInactiveOrExtinct(school: School): boolean {
  return Boolean(
    school.isInactive ||
    (school as any).inactive ||
    (school.inactiveReason && school.inactiveReason.length > 0) ||
    (school.suspensionReason && school.suspensionReason.length > 0)
  );
}

export interface SchoolLastCarnavalRank {
  tier: number; // 1: Especial, 2: Ouro, 3: Prata, 4: Bronze, 5: Avaliação, 6: Inativa/Extinta
  rank: number; // 1, 2, 3...
  score: number;
  badgeText: string;
  divisionLabel: string;
  isInactive: boolean;
}

/**
 * Obtém a posição e classificação oficial da agremiação no último Carnaval realizado.
 * Utiliza o histórico mais recente disponível ou INITIAL_HISTORY[0] (Carnaval 2026).
 */
export function getSchoolLastCarnavalRank(
  school: School,
  history?: YearHistory[]
): SchoolLastCarnavalRank {
  const isInactive = isSchoolInactiveOrExtinct(school);
  const lastHistory = history && history.length > 0 ? history[0] : INITIAL_HISTORY[0];

  if (isInactive) {
    return {
      tier: 6,
      rank: 999,
      score: 0,
      badgeText: school.inactiveReason || school.suspensionReason || 'Agremiação Inativa / Extinta',
      divisionLabel: 'Inativa / Extinta',
      isInactive: true
    };
  }

  if (!lastHistory) {
    const tier =
      school.division === 'especial' ? 1 :
      school.division === 'ouro' ? 2 :
      school.division === 'prata' ? 3 :
      school.division === 'bronze' ? 4 : 5;
    return {
      tier,
      rank: 99,
      score: 0,
      badgeText: 'Participante',
      divisionLabel: school.division.toUpperCase(),
      isInactive: false
    };
  }

  const sId = school.id?.toLowerCase();
  const sName = school.name?.toLowerCase();
  const sShort = school.shortName?.toLowerCase();

  const matchesSchool = (item: { schoolId?: string; schoolName: string }) => {
    if (item.schoolId && sId && item.schoolId.toLowerCase() === sId) return true;
    const iName = item.schoolName.toLowerCase();
    return iName === sName || (sShort && iName.includes(sShort));
  };

  // 1. Grupo Especial
  const esp = lastHistory.especialStandings?.find(matchesSchool);
  if (esp) {
    return {
      tier: 1,
      rank: esp.rank,
      score: esp.totalScore,
      badgeText:
        esp.rank === 1
          ? '🏆 Campeã do Grupo Especial'
          : esp.rank === 2
          ? '🥈 Vice-Campeã do Especial'
          : esp.rank <= 6
          ? `${esp.rank}º Lugar • G6 Especial`
          : `${esp.rank}º Lugar • Grupo Especial`,
      divisionLabel: 'Grupo Especial',
      isInactive: false
    };
  }

  // 2. Série Ouro
  const ouro = lastHistory.ouroStandings?.find(matchesSchool);
  if (ouro) {
    return {
      tier: 2,
      rank: ouro.rank,
      score: ouro.totalScore,
      badgeText:
        ouro.rank === 1
          ? '🏆 Campeã da Série Ouro • Acesso'
          : ouro.rank === 2
          ? '🥈 Vice-Campeã da Série Ouro'
          : `${ouro.rank}º Lugar • Série Ouro`,
      divisionLabel: 'Série Ouro',
      isInactive: false
    };
  }

  // 3. Série Prata
  const prata = lastHistory.prataStandings?.find(matchesSchool);
  if (prata) {
    return {
      tier: 3,
      rank: prata.rank,
      score: prata.totalScore,
      badgeText:
        prata.rank === 1
          ? '🏆 Campeã da Série Prata • Acesso'
          : prata.rank === 2
          ? '🥈 Vice-Campeã da Série Prata'
          : `${prata.rank}º Lugar • Série Prata`,
      divisionLabel: 'Série Prata',
      isInactive: false
    };
  }

  // 4. Série Bronze
  const bronze = lastHistory.bronzeStandings?.find(matchesSchool);
  if (bronze) {
    return {
      tier: 4,
      rank: bronze.rank,
      score: bronze.totalScore,
      badgeText:
        bronze.rank === 1
          ? '🏆 Campeã da Série Bronze • Acesso'
          : bronze.rank === 2
          ? '🥈 Vice-Campeã da Série Bronze'
          : `${bronze.rank}º Lugar • Série Bronze`,
      divisionLabel: 'Série Bronze',
      isInactive: false
    };
  }

  // 5. Grupo de Avaliação
  const ava = lastHistory.avaliacaoStandings?.find(matchesSchool);
  if (ava) {
    return {
      tier: 5,
      rank: ava.rank,
      score: ava.totalScore,
      badgeText:
        ava.rank === 1
          ? '🏆 Campeã do Grupo de Avaliação'
          : ava.rank === 2
          ? '🥈 Vice-Campeã de Avaliação'
          : `${ava.rank}º Lugar • Grupo de Avaliação`,
      divisionLabel: 'Grupo de Avaliação',
      isInactive: false
    };
  }

  const defaultTier =
    school.division === 'especial' ? 1 :
    school.division === 'ouro' ? 2 :
    school.division === 'prata' ? 3 :
    school.division === 'bronze' ? 4 : 5;

  return {
    tier: defaultTier,
    rank: 99,
    score: 0,
    badgeText: 'Participante do Carnaval',
    divisionLabel: school.division.toUpperCase(),
    isInactive: false
  };
}

/**
 * Ordena as escolas rigorosamente conforme as regras:
 * 1. Escolas ativas: sempre ordenadas pela classificação do último Carnaval (tier de divisão + colocação 1º, 2º, 3º...).
 * 2. Escolas extintas ou inativas: organizadas em estrita ordem alfabética.
 * Se a lista contiver agremiações ativas e inativas, as ativas aparecem primeiro (pela ordem de classificação)
 * e as inativas/extintas ao final (em ordem alfabética A-Z).
 */
export function sortSchools(schools: School[], history?: YearHistory[]): School[] {
  const active: School[] = [];
  const inactive: School[] = [];

  schools.forEach((s) => {
    if (isSchoolInactiveOrExtinct(s)) {
      inactive.push(s);
    } else {
      active.push(s);
    }
  });

  // Ativas ordenadas pela classificação do último carnaval
  active.sort((a, b) => {
    const resA = getSchoolLastCarnavalRank(a, history);
    const resB = getSchoolLastCarnavalRank(b, history);

    if (resA.tier !== resB.tier) {
      return resA.tier - resB.tier;
    }
    if (resA.rank !== resB.rank) {
      return resA.rank - resB.rank;
    }
    return a.name.localeCompare(b.name, 'pt-BR');
  });

  // Inativas ou extintas organizadas em ordem alfabética
  inactive.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

  return [...active, ...inactive];
}

/**
 * Ordena exclusivamente uma lista de escolas inativas ou extintas em ordem alfabética A-Z.
 */
export function sortInactiveSchoolsAlphabetically(schools: School[]): School[] {
  return [...schools].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}
