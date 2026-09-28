import {
  DivisionId,
  JuradoScores,
  QuesitoId,
  School,
  SchoolParadeScores,
  DivisionResult,
  YearHistory
} from '../types/carnaval';
import { QUESITOS, getSchoolConsolidatedStats } from '../data/carnavalData';

// Reverse order of quesitos for tiebreaking as required by user prompt:
// "Em caso de empate o desempate ocorrerá pela soma maior no último quesito e assim sucessivamente"
export const TIEBREAKER_QUESITO_ORDER: QuesitoId[] = [
  'mestreSalaPortaBandeira', // 9º quesito (último)
  'sambaEnredo',              // 8º quesito
  'alegorias',                // 7º quesito
  'fantasias',                // 6º quesito
  'enredo',                   // 5º quesito
  'harmonia',                 // 4º quesito
  'evolucao',                 // 3º quesito
  'comissaoDeFrente',         // 2º quesito
  'bateria'                   // 1º quesito
];

export class SimulationEngine {
  /**
   * Generates authentic judge scores for a school in a specific quesito.
   * Scores in Rio carnival realistically range between 9.7 and 10.0 (occasional 9.5-9.6 for incidents).
   */
  private static generateScoresForQuesito(
    school: School,
    quesitoId: QuesitoId
  ): JuradoScores {
    const attr = school.attributes[quesitoId] || 85;
    
    // Influence of rehearsal, barracao, staff
    let modifier = 0;
    if (quesitoId === 'bateria') {
      modifier += (school.staff.mestreBateria.rating - 85) * 0.15;
    } else if (quesitoId === 'comissaoDeFrente') {
      modifier += (school.staff.coreografo.rating - 85) * 0.15;
    } else if (quesitoId === 'evolucao' || quesitoId === 'harmonia') {
      modifier += (school.staff.harmonia.rating - 85) * 0.12;
      modifier += (school.rehearsalLevel - 80) * 0.1;
    } else if (quesitoId === 'enredo') {
      modifier += (school.staff.carnavalesco.rating - 85) * 0.12;
      if (school.currentEnredo) modifier += (school.currentEnredo.qualityBoost - 8) * 0.4;
    } else if (quesitoId === 'fantasias' || quesitoId === 'alegorias') {
      modifier += (school.staff.carnavalesco.rating - 85) * 0.12;
      modifier += (school.barracaoProgress - 80) * 0.15;
    } else if (quesitoId === 'sambaEnredo') {
      modifier += (school.staff.interprete.rating - 85) * 0.15;
    } else if (quesitoId === 'mestreSalaPortaBandeira') {
      modifier += (school.staff.mestreSalaPortaBandeira.rating - 85) * 0.18;
    }

    const effectiveScore = attr + modifier; // approx 75 - 105

    // Probabilities of 10.0, 9.9, 9.8, 9.7, 9.6
    const jurados: number[] = [];
    for (let j = 0; j < 4; j++) {
      const rand = Math.random() * 100;
      let score = 10.0;

      // School level threshold
      const tenThreshold = Math.min(88, Math.max(25, (effectiveScore - 75) * 3.5));
      const nineNineThreshold = tenThreshold + 25;
      const nineEightThreshold = nineNineThreshold + 12;

      if (rand < tenThreshold) {
        score = 10.0;
      } else if (rand < nineNineThreshold) {
        score = 9.9;
      } else if (rand < nineEightThreshold) {
        score = 9.8;
      } else if (rand < 98) {
        score = 9.7;
      } else {
        score = 9.6;
      }

      jurados.push(score);
    }

    return [jurados[0], jurados[1], jurados[2], jurados[3]];
  }

  /**
   * Pre-calculates the entire parade scoring for a division.
   */
  public static simulateDivisionParades(schools: School[]): SchoolParadeScores[] {
    const results: SchoolParadeScores[] = [];

    schools.forEach((school) => {
      const scoresByQuesito: Record<QuesitoId, JuradoScores> = {
        bateria: this.generateScoresForQuesito(school, 'bateria'),
        comissaoDeFrente: this.generateScoresForQuesito(school, 'comissaoDeFrente'),
        evolucao: this.generateScoresForQuesito(school, 'evolucao'),
        harmonia: this.generateScoresForQuesito(school, 'harmonia'),
        enredo: this.generateScoresForQuesito(school, 'enredo'),
        fantasias: this.generateScoresForQuesito(school, 'fantasias'),
        alegorias: this.generateScoresForQuesito(school, 'alegorias'),
        sambaEnredo: this.generateScoresForQuesito(school, 'sambaEnredo'),
        mestreSalaPortaBandeira: this.generateScoresForQuesito(school, 'mestreSalaPortaBandeira')
      };

      // Calculate sum of all 36 judges (9 quesitos * 4 jurados)
      let sum = 0;
      QUESITOS.forEach((q) => {
        const scores = scoresByQuesito[q.id];
        sum += scores[0] + scores[1] + scores[2] + scores[3];
      });

      // Round to 1 decimal place to prevent JS floating point inaccuracies
      sum = Math.round(sum * 10) / 10;

      // Small chance of penalty if rehearsal level was very low (<60)
      let penalties = 0;
      if (school.rehearsalLevel < 50 && Math.random() < 0.2) {
        penalties = 0.1; // Estouro de cronômetro
      }

      const finalScore = Math.round((sum - penalties) * 10) / 10;

      // Assign a consistent sorteioRandomValue for transparent tie-breaking draw if needed
      const sorteioRandomValue = Math.random();

      results.push({
        schoolId: school.id,
        scoresByQuesito,
        totalScore: sum,
        penalties,
        finalScore,
        sorteioRandomValue
      });
    });

    return results;
  }

  /**
   * Calculates real-time standings up to a certain quesito and judge.
   * Applies the exact tiebreaker rule specified by the user:
   * 1. Higher total score
   * 2. Sum of scores in the last quesito (Mestre-Sala e Porta-Bandeira)
   * 3. Successively backwards through quesitos (Samba Enredo -> Alegorias -> Fantasias -> Enredo -> Harmonia -> Evolução -> Comissão -> Bateria)
   * 4. Sorteio (transparent random draw) if complete tie persists.
   */
  public static calculateStandings(
    schools: School[],
    paradeScores: SchoolParadeScores[],
    revealedUpToQuesitoIndex = 8, // 0 to 8
    revealedUpToJudgeIndex = 3, // 0 to 3
    revealedUpToSchoolIndex?: number,
    hasStarted = true
  ): {
    rankedList: {
      school: School;
      scores: SchoolParadeScores;
      currentScore: number;
      rank: number;
      tiebreakerNote?: string;
      quesitoSums: Record<QuesitoId, number>;
    }[];
  } {
    const schoolMap = new Map(schools.map(s => [s.id, s]));
    const schoolIndexMap = new Map(schools.map((s, idx) => [s.id, idx]));

    // Compute running score for each school based on revealed quesitos and judges
    const computed = paradeScores.map((ps) => {
      const school = schoolMap.get(ps.schoolId)!;
      const sIdx = schoolIndexMap.get(ps.schoolId) ?? 0;
      let runningTotal = 0;
      const quesitoSums: Record<QuesitoId, number> = {
        bateria: 0,
        comissaoDeFrente: 0,
        evolucao: 0,
        harmonia: 0,
        enredo: 0,
        fantasias: 0,
        alegorias: 0,
        sambaEnredo: 0,
        mestreSalaPortaBandeira: 0
      };

      if (hasStarted) {
        QUESITOS.forEach((q, qIdx) => {
          if (qIdx < revealedUpToQuesitoIndex) {
            // Fully revealed quesito (all 4 judges)
            const jurados = ps.scoresByQuesito[q.id];
            const qSum = jurados[0] + jurados[1] + jurados[2] + jurados[3];
            quesitoSums[q.id] = Math.round(qSum * 10) / 10;
            runningTotal += qSum;
          } else if (qIdx === revealedUpToQuesitoIndex) {
            // Partially revealed quesito up to current judge
            const jurados = ps.scoresByQuesito[q.id];
            let qSum = 0;
            for (let j = 0; j <= revealedUpToJudgeIndex; j++) {
              if (j < revealedUpToJudgeIndex) {
                qSum += jurados[j];
              } else if (j === revealedUpToJudgeIndex) {
                // Current judge: only awarded if school's envelope has been opened
                if (revealedUpToSchoolIndex === undefined || sIdx <= revealedUpToSchoolIndex) {
                  qSum += jurados[j];
                }
              }
            }
            quesitoSums[q.id] = Math.round(qSum * 10) / 10;
            runningTotal += qSum;
          }
        });

        // Deduct penalties if fully revealed
        if (
          revealedUpToQuesitoIndex === 8 &&
          revealedUpToJudgeIndex === 3 &&
          (revealedUpToSchoolIndex === undefined || revealedUpToSchoolIndex >= schools.length - 1)
        ) {
          runningTotal -= ps.penalties;
        }
      }

      runningTotal = Math.round(runningTotal * 10) / 10;

      return {
        school,
        scores: ps,
        currentScore: runningTotal,
        rank: 1,
        quesitoSums,
        tiebreakerNote: undefined as string | undefined
      };
    });

    if (!hasStarted) {
      // Before start of apuração: preserve default order, no tiebreaker notes, all 0.0
      computed.sort((a, b) => {
        const idxA = schoolIndexMap.get(a.school.id) ?? 0;
        const idxB = schoolIndexMap.get(b.school.id) ?? 0;
        return idxA - idxB;
      });
      computed.forEach((item, index) => {
        item.rank = index + 1;
      });
      return { rankedList: computed };
    }

    // Sort according to user specification:
    // "Em caso de empate o desempate ocorrerá pela soma maior no último quesito e assim sucessivamente caso empate ocorra tanto nas notas gerais como nos quesitos de desempates, haverá um sorteio que definirá quais das empatadas ficam a frente."
    computed.sort((a, b) => {
      // 1. Overall Score
      if (Math.abs(b.currentScore - a.currentScore) > 0.001) {
        return b.currentScore - a.currentScore;
      }

      // If tied, check quesitos backwards starting with the last quesito (Mestre-Sala e Porta-Bandeira)
      for (const quesitoId of TIEBREAKER_QUESITO_ORDER) {
        const sumA = a.quesitoSums[quesitoId] || 0;
        const sumB = b.quesitoSums[quesitoId] || 0;
        if (Math.abs(sumB - sumA) > 0.001) {
          const quesitoConfig = QUESITOS.find(q => q.id === quesitoId);
          const qName = quesitoConfig ? quesitoConfig.name : quesitoId;
          if (sumA > sumB) {
            a.tiebreakerNote = `Desempate: Maior pontuação em ${qName} (${sumA.toFixed(1)} vs ${sumB.toFixed(1)})`;
          } else {
            b.tiebreakerNote = `Desempate: Maior pontuação em ${qName} (${sumB.toFixed(1)} vs ${sumA.toFixed(1)})`;
          }
          return sumB - sumA;
        }
      }

      // If still tied on all quesitos: transparent Sorteio (raffle)
      const sorteioA = a.scores.sorteioRandomValue ?? 0;
      const sorteioB = b.scores.sorteioRandomValue ?? 0;
      if (sorteioA > sorteioB) {
        a.tiebreakerNote = 'Desempate por Sorteio Oficial da LIESA';
      } else {
        b.tiebreakerNote = 'Desempate por Sorteio Oficial da LIESA';
      }
      return sorteioB - sorteioA;
    });

    // Assign rank numbers (1, 2, 3...)
    computed.forEach((item, index) => {
      item.rank = index + 1;
    });

    return { rankedList: computed };
  }

  /**
   * Finalizes division results, determines champion, promotion, and relegation.
   * Rules:
   * Grupo Especial (12 schools):
   * - Champion: Rank 1
   * - Relegated: Rank 12 (bottom 1 school)
   *
   * Série Ouro (17 schools):
   * - Champion: Rank 1 -> Promoted to Grupo Especial!
   * - Relegated: Rank 16 and Rank 17 (bottom 2 schools relegated to Série Prata, replaced by traditional newcomers).
   */
  /**
   * Finalizes the division results at season end.
   * - Grupo Especial (12 schools):
   *   - Champion: Rank 1
   *   - Relegated: Rank 12 (1 school relegated to Série Ouro)
   * - Série Ouro (17 schools originally -> reduced season-by-season until 14 schools):
   *   - Champion: Rank 1 (promoted to Grupo Especial)
   *   - Relegated: Last 2 schools relegated to Série Prata
   * - Série Prata (24 schools):
   *   - Champion: Rank 1 (promoted to Série Ouro)
   *   - Vice-Champion (Rank 2): also promoted to Série Ouro once Série Ouro reaches 14 schools.
   */
  public static finalizeSeasonDivision(
    division: DivisionId,
    year: number,
    schools: School[],
    paradeScores: SchoolParadeScores[],
    ouroCountThisSeason: number = 17
  ): DivisionResult {
    const { rankedList } = this.calculateStandings(schools, paradeScores, 8, 3);
    const championId = rankedList[0]?.school.id || '';

    const promotedSchoolIds: string[] = [];
    const relegatedSchoolIds: string[] = [];
    const tiebreakersApplied: { schoolAId: string; schoolBId: string; reason: string }[] = [];

    // Check tiebreakers applied in final table
    for (let i = 0; i < rankedList.length - 1; i++) {
      const a = rankedList[i];
      const b = rankedList[i + 1];
      if (Math.abs(a.currentScore - b.currentScore) < 0.001) {
        tiebreakersApplied.push({
          schoolAId: a.school.id,
          schoolBId: b.school.id,
          reason: a.tiebreakerNote || 'Critério de desempate nos quesitos'
        });
      }
    }

    if (division === 'especial') {
      // Last placed school (12th) is relegated to Série Ouro
      if (rankedList.length > 0) {
        const relegatedSchool = rankedList[rankedList.length - 1].school;
        relegatedSchoolIds.push(relegatedSchool.id);
      }
    } else if (division === 'ouro') {
      // Série Ouro champion is promoted to Especial
      promotedSchoolIds.push(championId);
      // Bottom 2 schools relegated to Série Prata
      if (rankedList.length >= 2) {
        relegatedSchoolIds.push(rankedList[rankedList.length - 1].school.id);
        relegatedSchoolIds.push(rankedList[rankedList.length - 2].school.id);
      }
    } else if (division === 'prata') {
      // Série Prata champion is always promoted to Série Ouro
      promotedSchoolIds.push(championId);
      // If Série Ouro already reached target of <= 14 schools, 2nd place is also promoted!
      if (ouroCountThisSeason <= 14 && rankedList.length >= 2) {
        promotedSchoolIds.push(rankedList[1].school.id);
      }
    }

    return {
      division,
      year,
      schoolResults: paradeScores,
      championId,
      promotedSchoolIds,
      relegatedSchoolIds,
      tiebreakersApplied
    };
  }

  /**
   * Advances the game to the next year:
   * - Swaps promoted Série Ouro champion into Grupo Especial.
   * - Moves relegated Grupo Especial bottom school into Série Ouro.
   * - Dynamic between Série Ouro and Série Prata:
   *   "a Série Ouro deve ficar em 14 escolas. Então da primeira temporada até o numero
   *   de escolas da Série Ouro chegar nesse número rebaixe 2 escolas da Série Ouro e suba 1 da Prata
   *   após isso o rebaixamento entre eles deve ficar em 2 sendo rebaixadas da Série Ouro e 2 subindo da Prata."
   * - Distributes prize money & league payouts.
   * - Resets parade flags and updates history.
   */
  public static advanceToNextYear(
    allSchools: School[],
    especialResult: DivisionResult,
    ouroResult: DivisionResult,
    prataResult: DivisionResult,
    bronzeResult: DivisionResult,
    currentYear: number,
    history: YearHistory[]
  ): {
    nextSchools: School[];
    nextYear: number;
    newHistory: YearHistory[];
    summary: {
      especialChampionName: string;
      especialRelegatedName: string;
      ouroChampionName: string;
      ouroRelegatedNames: string[];
      prataChampionName: string;
      prataPromotedNames: string[];
      prataRelegatedNames: string[];
      bronzeChampionName: string;
      bronzePromotedNames: string[];
      ouroCountNextSeason: number;
    };
  } {
    const schoolMap = new Map(allSchools.map(s => [s.id, {
      ...s,
      honors: {
        ...s.honors,
        inGameAchievements: [...(s.honors?.inGameAchievements || [])]
      }
    }]));

    // Calculate final standings of all 4 divisions
    const espSchools = allSchools.filter(s => s.division === 'especial');
    const espRanked = this.calculateStandings(espSchools, especialResult.schoolResults, 8, 3).rankedList;

    const ouroSchools = allSchools.filter(s => s.division === 'ouro');
    const ouroRanked = this.calculateStandings(ouroSchools, ouroResult.schoolResults, 8, 3).rankedList;

    const prataSchools = allSchools.filter(s => s.division === 'prata');
    const prataRanked = this.calculateStandings(prataSchools, prataResult.schoolResults, 8, 3).rankedList;

    const bronzeSchools = allSchools.filter(s => s.division === 'bronze');
    const bronzeRanked = this.calculateStandings(bronzeSchools, bronzeResult.schoolResults, 8, 3).rankedList;

    const currentOuroCount = ouroSchools.length;
    // Condition specified by user:
    // If currentOuroCount > 14: rebaixe 2 de Ouro e suba 1 de Prata
    // Once currentOuroCount <= 14: rebaixe 2 de Ouro e subam 2 de Prata
    const ouroNeedsReduction = currentOuroCount > 14;
    const prataPromotedCount = ouroNeedsReduction ? 1 : 2;

    // Record In-Game achievements for Grupo Especial (2027 onwards)
    espRanked.forEach((item) => {
      const sch = schoolMap.get(item.school.id);
      if (!sch) return;

      if (item.rank === 1) {
        sch.championshipsEspecial = (sch.championshipsEspecial || 0) + 1;
        sch.budget += 1500000; // Champion prize
        sch.fanBaseMorale = Math.min(100, sch.fanBaseMorale + 10);
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'especial',
          placement: 1,
          titleName: `Campeã do Grupo Especial ${currentYear}`,
          badgeType: 'champion_especial',
          totalScore: item.currentScore
        });
      } else if (item.rank === 2) {
        sch.runnerUpsEspecial = (sch.runnerUpsEspecial || 0) + 1;
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'especial',
          placement: 2,
          titleName: `Vice-Campeã do Grupo Especial ${currentYear}`,
          badgeType: 'vice_especial',
          totalScore: item.currentScore
        });
      } else if (item.rank <= 6) {
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'especial',
          placement: item.rank,
          titleName: `${item.rank}º Lugar - Desfile das Campeãs (G6) ${currentYear}`,
          badgeType: 'g6',
          totalScore: item.currentScore
        });
      } else if (item.rank === espRanked.length) {
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'especial',
          placement: item.rank,
          titleName: `Rebaixada para a Série Ouro (${currentYear})`,
          badgeType: 'relegated',
          totalScore: item.currentScore
        });
      } else {
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'especial',
          placement: item.rank,
          titleName: `${item.rank}º Lugar no Grupo Especial ${currentYear}`,
          badgeType: 'regular',
          totalScore: item.currentScore
        });
      }
    });

    // Record In-Game achievements for Série Ouro
    const ouroRelegatedThreshold = ouroRanked.length - 2;
    ouroRanked.forEach((item) => {
      const sch = schoolMap.get(item.school.id);
      if (!sch) return;

      if (item.rank === 1) {
        sch.championshipsOuro = (sch.championshipsOuro || 0) + 1;
        sch.budget += 800000; // Promotion prize
        sch.fanBaseMorale = Math.min(100, sch.fanBaseMorale + 12);
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'ouro',
          placement: 1,
          titleName: `Campeã da Série Ouro & Acesso ao Especial ${currentYear}`,
          badgeType: 'champion_ouro',
          totalScore: item.currentScore
        });
      } else if (item.rank === 2) {
        sch.runnerUpsOuro = (sch.runnerUpsOuro || 0) + 1;
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'ouro',
          placement: 2,
          titleName: `Vice-Campeã da Série Ouro ${currentYear}`,
          badgeType: 'vice_ouro',
          totalScore: item.currentScore
        });
      } else if (item.rank > ouroRelegatedThreshold) {
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'ouro',
          placement: item.rank,
          titleName: `${item.rank}º Lugar - Rebaixada para a Série Prata (${currentYear})`,
          badgeType: 'relegated',
          totalScore: item.currentScore
        });
      } else {
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'ouro',
          placement: item.rank,
          titleName: `${item.rank}º Lugar na Série Ouro ${currentYear}`,
          badgeType: 'regular',
          totalScore: item.currentScore
        });
      }
    });

    // Record In-Game achievements for Série Prata
    const prataRelegatedThreshold = prataRanked.length - 2;
    prataRanked.forEach((item) => {
      const sch = schoolMap.get(item.school.id);
      if (!sch) return;

      if (item.rank === 1) {
        sch.championshipsPrata = (sch.championshipsPrata || 0) + 1;
        sch.budget += 500000;
        sch.fanBaseMorale = Math.min(100, sch.fanBaseMorale + 15);
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'prata',
          placement: 1,
          titleName: `Campeã da Série Prata & Acesso à Série Ouro ${currentYear}`,
          badgeType: 'champion_prata',
          totalScore: item.currentScore
        });
      } else if (item.rank === 2) {
        sch.runnerUpsPrata = (sch.runnerUpsPrata || 0) + 1;
        if (!ouroNeedsReduction) {
          sch.budget += 400000;
          sch.fanBaseMorale = Math.min(100, sch.fanBaseMorale + 10);
        }
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'prata',
          placement: 2,
          titleName: !ouroNeedsReduction
            ? `Vice-Campeã da Série Prata & Acesso à Série Ouro ${currentYear}`
            : `Vice-Campeã da Série Prata ${currentYear}`,
          badgeType: 'vice_prata',
          totalScore: item.currentScore
        });
      } else if (item.rank > prataRelegatedThreshold) {
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'prata',
          placement: item.rank,
          titleName: `${item.rank}º Lugar - Rebaixada para a Série Bronze (${currentYear})`,
          badgeType: 'relegated',
          totalScore: item.currentScore
        });
      } else {
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'prata',
          placement: item.rank,
          titleName: `${item.rank}º Lugar na Série Prata ${currentYear}`,
          badgeType: 'regular',
          totalScore: item.currentScore
        });
      }
    });

    // Record In-Game achievements for Série Bronze
    const bronzeRelegatedThreshold = bronzeRanked.length - 2;
    bronzeRanked.forEach((item) => {
      const sch = schoolMap.get(item.school.id);
      if (!sch) return;

      if (item.rank === 1) {
        sch.championshipsBronze = (sch.championshipsBronze || 0) + 1;
        sch.budget += 350000;
        sch.fanBaseMorale = Math.min(100, sch.fanBaseMorale + 15);
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'bronze',
          placement: 1,
          titleName: `Campeã da Série Bronze & Acesso à Série Prata ${currentYear}`,
          badgeType: 'champion_bronze',
          totalScore: item.currentScore
        });
      } else if (item.rank === 2) {
        sch.runnerUpsBronze = (sch.runnerUpsBronze || 0) + 1;
        sch.budget += 250000;
        sch.fanBaseMorale = Math.min(100, sch.fanBaseMorale + 10);
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'bronze',
          placement: 2,
          titleName: `Vice-Campeã da Série Bronze & Acesso à Série Prata ${currentYear}`,
          badgeType: 'vice_bronze',
          totalScore: item.currentScore
        });
      } else if (item.rank > bronzeRelegatedThreshold) {
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'bronze',
          placement: item.rank,
          titleName: `${item.rank}º Lugar - Zona de Risco da Série Bronze (${currentYear})`,
          badgeType: 'relegated',
          totalScore: item.currentScore
        });
      } else {
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'bronze',
          placement: item.rank,
          titleName: `${item.rank}º Lugar na Série Bronze ${currentYear}`,
          badgeType: 'regular',
          totalScore: item.currentScore
        });
      }
    });

    // 1. Move Especial relegated school (last place) to Série Ouro
    const especialRelegatedId = especialResult.relegatedSchoolIds[0] || espRanked[espRanked.length - 1]?.school.id;
    const especialRelegated = schoolMap.get(especialRelegatedId);
    if (especialRelegated) {
      especialRelegated.division = 'ouro';
      especialRelegated.budget = Math.max(800000, especialRelegated.budget - 400000);
      especialRelegated.fanBaseMorale = Math.max(50, especialRelegated.fanBaseMorale - 15);
    }

    // 2. Promote Série Ouro champion to Especial
    const ouroChamp = schoolMap.get(ouroResult.championId) || ouroRanked[0]?.school;
    if (ouroChamp) {
      ouroChamp.division = 'especial';
      ouroChamp.budget += 1000000; // Additional TV rights for Grupo Especial
    }

    // 3. Relegate bottom 2 schools from Série Ouro to Série Prata
    const ouroRelegatedItems = ouroRanked.slice(-2);
    const ouroRelegatedNames: string[] = [];
    ouroRelegatedItems.forEach(item => {
      const sch = schoolMap.get(item.school.id);
      if (sch) {
        sch.division = 'prata';
        sch.budget = Math.max(600000, sch.budget - 350000);
        sch.fanBaseMorale = Math.max(50, sch.fanBaseMorale - 15);
        ouroRelegatedNames.push(sch.name);
      }
    });

    // 4. Promote 1 (or 2) schools from Série Prata to Série Ouro
    const prataPromotedItems = prataRanked.slice(0, prataPromotedCount);
    const prataPromotedNames: string[] = [];
    prataPromotedItems.forEach(item => {
      const sch = schoolMap.get(item.school.id);
      if (sch) {
        sch.division = 'ouro';
        sch.budget += 600000; // Increase budget for Série Ouro
        sch.fanBaseMorale = Math.min(100, sch.fanBaseMorale + 15);
        prataPromotedNames.push(sch.name);
      }
    });

    // 5. Relegate bottom 2 schools from Série Prata to Série Bronze
    const prataRelegatedItems = prataRanked.slice(-2);
    const prataRelegatedNames: string[] = [];
    prataRelegatedItems.forEach(item => {
      const sch = schoolMap.get(item.school.id);
      if (sch) {
        sch.division = 'bronze';
        sch.budget = Math.max(400000, sch.budget - 250000);
        sch.fanBaseMorale = Math.max(50, sch.fanBaseMorale - 12);
        prataRelegatedNames.push(sch.name);
      }
    });

    // 6. Promote top 2 schools from Série Bronze to Série Prata (Campeã e Vice)
    const bronzePromotedItems = bronzeRanked.slice(0, 2);
    const bronzePromotedNames: string[] = [];
    bronzePromotedItems.forEach(item => {
      const sch = schoolMap.get(item.school.id);
      if (sch) {
        sch.division = 'prata';
        sch.budget += 350000; // Increase budget for Série Prata
        sch.fanBaseMorale = Math.min(100, sch.fanBaseMorale + 15);
        bronzePromotedNames.push(sch.name);
      }
    });

    const prataChamp = schoolMap.get(prataResult.championId) || prataRanked[0]?.school;
    const bronzeChamp = schoolMap.get(bronzeResult.championId) || bronzeRanked[0]?.school;
    const nextOuroCount = currentOuroCount - 2 + prataPromotedCount;

    // Reset parade flags, update attributes, sync consolidated stats
    const updatedSchools: School[] = Array.from(schoolMap.values()).map((s) => {
      // Annual revenue from Liga + TV cotas
      let tvRevenue = 300000;
      if (s.division === 'especial') tvRevenue = 1400000;
      else if (s.division === 'ouro') tvRevenue = 750000;
      else if (s.division === 'prata') tvRevenue = 450000;
      else if (s.division === 'bronze') tvRevenue = 280000;

      // Staff expenses
      const staffTotalSalary = Object.values(s.staff).reduce((acc, member) => acc + member.salary, 0);

      // Slight natural attribute evolution (+/- 1-2 points)
      const evolveAttr = (val: number) => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
        return Math.min(99, Math.max(70, val + delta));
      };

      const cons = getSchoolConsolidatedStats(s);

      return {
        ...s,
        championshipsEspecial: cons.totalEspecialTitles,
        runnerUpsEspecial: cons.totalEspecialVices,
        championshipsOuro: cons.totalOuroTitles,
        runnerUpsOuro: cons.totalOuroVices,
        championshipsPrata: cons.totalPrataTitles,
        runnerUpsPrata: cons.totalPrataVices,
        championshipsBronze: cons.totalBronzeTitles,
        runnerUpsBronze: cons.totalBronzeVices,
        budget: Math.max(250000, s.budget + tvRevenue - staffTotalSalary),
        rehearsalLevel: 70,
        barracaoProgress: 70,
        technicalParadeDone: false,
        attributes: {
          bateria: evolveAttr(s.attributes.bateria),
          comissaoDeFrente: evolveAttr(s.attributes.comissaoDeFrente),
          evolucao: evolveAttr(s.attributes.evolucao),
          harmonia: evolveAttr(s.attributes.harmonia),
          enredo: evolveAttr(s.attributes.enredo),
          fantasias: evolveAttr(s.attributes.fantasias),
          alegorias: evolveAttr(s.attributes.alegorias),
          sambaEnredo: evolveAttr(s.attributes.sambaEnredo),
          mestreSalaPortaBandeira: evolveAttr(s.attributes.mestreSalaPortaBandeira)
        }
      };
    });

    // Compute standings summary for history
    const espStandings = espRanked.map(r => ({
      rank: r.rank,
      schoolId: r.school.id,
      schoolName: r.school.name,
      totalScore: r.currentScore
    }));

    const ouroStandings = ouroRanked.map(r => ({
      rank: r.rank,
      schoolId: r.school.id,
      schoolName: r.school.name,
      totalScore: r.currentScore
    }));

    const prataStandings = prataRanked.map(r => ({
      rank: r.rank,
      schoolId: r.school.id,
      schoolName: r.school.name,
      totalScore: r.currentScore
    }));

    const bronzeStandings = bronzeRanked.map(r => ({
      rank: r.rank,
      schoolId: r.school.id,
      schoolName: r.school.name,
      totalScore: r.currentScore
    }));

    const historyRecord: YearHistory = {
      year: currentYear,
      especialChampion: espRanked[0]?.school.name || 'Desconhecida',
      especialRelegated: especialRelegated ? [especialRelegated.name] : [],
      ouroChampion: ouroChamp ? ouroChamp.name : 'Desconhecida',
      ouroRelegated: ouroRelegatedNames,
      prataChampion: prataChamp ? prataChamp.name : 'Desconhecida',
      prataPromoted: prataPromotedNames,
      prataRelegated: prataRelegatedNames,
      bronzeChampion: bronzeChamp ? bronzeChamp.name : 'Desconhecida',
      bronzePromoted: bronzePromotedNames,
      bronzeRelegated: bronzeRanked.slice(-2).map(r => r.school.name),
      especialStandings: espStandings,
      ouroStandings: ouroStandings,
      prataStandings: prataStandings,
      bronzeStandings: bronzeStandings
    };

    return {
      nextSchools: updatedSchools,
      nextYear: currentYear + 1,
      newHistory: [historyRecord, ...history],
      summary: {
        especialChampionName: espRanked[0]?.school.name || '',
        especialRelegatedName: especialRelegated?.name || '',
        ouroChampionName: ouroChamp?.name || '',
        ouroRelegatedNames,
        prataChampionName: prataChamp?.name || '',
        prataPromotedNames,
        prataRelegatedNames,
        bronzeChampionName: bronzeChamp?.name || '',
        bronzePromotedNames,
        ouroCountNextSeason: nextOuroCount
      }
    };
  }
}
