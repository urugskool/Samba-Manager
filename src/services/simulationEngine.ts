import {
  DivisionId,
  JuradoScores,
  QuesitoId,
  School,
  SchoolParadeScores,
  DivisionResult,
  YearHistory
} from '../types/carnaval';
import { QUESITOS, getSchoolConsolidatedStats, generateRandomCarnavalSchool } from '../data/carnavalData';
import { PARADE_CONFIG } from '../config/paradeConfig';
import { evaluateSchoolParadeObrigatoriedades } from '../config/obrigatoriedadesConfig';
import { cleanSchoolName } from '../utils/schoolNameUtils';

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
   * Simulates dynamic parade time for a school based on andamento, evolução, harmonia,
   * allegories, barracão progress and rehearsal level.
   * Regra oficial: cada minuto que a escola exceder o tempo máximo ou ficar abaixo do tempo mínimo
   * acarreta uma punição de -0,1 pontos por minuto fora do limite.
   */
  public static simulateSchoolParadeTime(school: School): {
    timeMinutes: number;
    timePenalty: number;
    timeStatus: 'regular' | 'estouro' | 'abaixo';
    diffMinutes: number;
  } {
    const config = PARADE_CONFIG[school.division] || { minMinutes: 70, maxMinutes: 80 };
    const { minMinutes, maxMinutes } = config;
    const targetIdeal = Math.round((minMinutes + maxMinutes) / 2);

    // Factors: Harmonia, Evolução, Bateria, Alegorias, Barracão, Rehearsal
    const harmonia = school.attributes.harmonia ?? 80;
    const evolucao = school.attributes.evolucao ?? 80;
    const rehearsal = school.rehearsalLevel ?? 70;
    const barracao = school.barracaoProgress ?? 70;

    // Quality factor roughly from -15 to +15
    const qualityFactor = ((harmonia + evolucao) / 2 - 80) * 0.4 + (rehearsal - 75) * 0.2 + (barracao - 75) * 0.1;

    // Variance spread: higher variance for schools with lower preparation
    const varianceSpread = qualityFactor > 5 ? 2 : qualityFactor < -5 ? 5.5 : 3.5;
    const randOffset = (Math.random() - 0.5) * varianceSpread * 2;

    // Pacing incidents during parade (buracos, alegorias emperradas, correria)
    let incidentDelay = 0;
    const incidentRoll = Math.random();
    if (barracao < 70 && incidentRoll < 0.28) {
      // Float problem: delay +2 to +4 minutes
      incidentDelay += Math.floor(Math.random() * 3) + 2;
    } else if (rehearsal < 65 && incidentRoll < 0.25) {
      // Big hole in evolution: delay +1 to +3 minutes
      incidentDelay += Math.floor(Math.random() * 3) + 1;
    } else if (rehearsal < 60 && incidentRoll > 0.82) {
      // Panicked rush through runway: finishes early (-1 to -3 min)
      incidentDelay -= (Math.floor(Math.random() * 3) + 1);
    }

    let simulatedMinutes = Math.round(targetIdeal + randOffset + incidentDelay);

    let timePenalty = 0;
    let timeStatus: 'regular' | 'estouro' | 'abaixo' = 'regular';
    let diffMinutes = 0;

    if (simulatedMinutes > maxMinutes) {
      diffMinutes = simulatedMinutes - maxMinutes;
      timePenalty = Math.round(diffMinutes * 0.1 * 10) / 10;
      timeStatus = 'estouro';
    } else if (simulatedMinutes < minMinutes) {
      diffMinutes = minMinutes - simulatedMinutes;
      timePenalty = Math.round(diffMinutes * 0.1 * 10) / 10;
      timeStatus = 'abaixo';
    }

    return {
      timeMinutes: simulatedMinutes,
      timePenalty,
      timeStatus,
      diffMinutes
    };
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

      // Regulamento Oficial do Carnaval Carioca (LIESA / Superliga):
      // A menor nota de cada um dos 9 quesitos é descartada!
      // Cada quesito possui 4 jurados; a menor nota é eliminada e somam-se as 3 maiores notas (máximo 30.0 por quesito, total máximo 270.0).
      let sum = 0;
      QUESITOS.forEach((q) => {
        const scores = scoresByQuesito[q.id];
        const minScore = Math.min(...scores);
        const validSum = scores[0] + scores[1] + scores[2] + scores[3] - minScore;
        sum += validSum;
      });

      // Round to 1 decimal place to prevent JS floating point inaccuracies
      sum = Math.round(sum * 10) / 10;

      // Dynamic parade time simulation
      const timeSim = this.simulateSchoolParadeTime(school);

      // Technical obrigatoriedades evaluation based on official regulations
      const techEval = evaluateSchoolParadeObrigatoriedades(school);
      const totalPenalties = Math.round((timeSim.timePenalty + techEval.technicalPenalty) * 10) / 10;
      const finalScore = Math.max(0, Math.round((sum - totalPenalties) * 10) / 10);

      // Assign a consistent sorteioRandomValue for transparent tie-breaking draw if needed
      const sorteioRandomValue = Math.random();

      results.push({
        schoolId: school.id,
        scoresByQuesito,
        totalScore: sum,
        penalties: totalPenalties,
        finalScore,
        sorteioRandomValue,
        paradeTimeMinutes: timeSim.timeMinutes,
        timePenalty: timeSim.timePenalty,
        timeStatus: timeSim.timeStatus,
        timeDifferenceMinutes: timeSim.diffMinutes,
        technicalPenalty: techEval.technicalPenalty,
        infractions: techEval.infractions,
        paradeComposition: techEval.composition
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
    const schoolIndexMap = new Map(schools.map((s, idx) => [s.id, idx]));
    const scoresMap = new Map(paradeScores.map((ps) => [ps.schoolId, ps]));

    // Compute running score for each school in this division
    const computed = schools.map((school) => {
      const sIdx = schoolIndexMap.get(school.id) ?? 0;
      let ps = scoresMap.get(school.id);
      if (!ps) {
        ps = {
          schoolId: school.id,
          scoresByQuesito: {
            bateria: [10, 10, 10, 10],
            comissaoDeFrente: [10, 10, 10, 10],
            evolucao: [10, 10, 10, 10],
            harmonia: [10, 10, 10, 10],
            enredo: [10, 10, 10, 10],
            fantasias: [10, 10, 10, 10],
            alegorias: [10, 10, 10, 10],
            sambaEnredo: [10, 10, 10, 10],
            mestreSalaPortaBandeira: [10, 10, 10, 10]
          },
          totalScore: 270,
          penalties: 0,
          finalScore: 270,
          sorteioRandomValue: Math.random()
        };
      }
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
            // Fully revealed quesito (all 4 judges): discard lowest note!
            const jurados = ps.scoresByQuesito[q.id];
            const minScore = Math.min(...jurados);
            const qSum = jurados[0] + jurados[1] + jurados[2] + jurados[3] - minScore;
            quesitoSums[q.id] = Math.round(qSum * 10) / 10;
            runningTotal += quesitoSums[q.id];
          } else if (qIdx === revealedUpToQuesitoIndex) {
            // Partially revealed quesito up to current judge
            const jurados = ps.scoresByQuesito[q.id];
            const revealedScores: number[] = [];
            for (let j = 0; j <= revealedUpToJudgeIndex; j++) {
              if (j < revealedUpToJudgeIndex) {
                revealedScores.push(jurados[j]);
              } else if (j === revealedUpToJudgeIndex) {
                // Current judge: only awarded if school's envelope has been opened
                if (revealedUpToSchoolIndex === undefined || sIdx <= revealedUpToSchoolIndex) {
                  revealedScores.push(jurados[j]);
                }
              }
            }

            if (revealedScores.length === 4) {
              // All 4 judges revealed for this school: discard lowest note!
              const minScore = Math.min(...revealedScores);
              const qSum = revealedScores[0] + revealedScores[1] + revealedScores[2] + revealedScores[3] - minScore;
              quesitoSums[q.id] = Math.round(qSum * 10) / 10;
              runningTotal += quesitoSums[q.id];
            } else if (revealedScores.length > 0) {
              // During reading of judges 1, 2, 3:
              const qSum = revealedScores.reduce((a, b) => a + b, 0);
              quesitoSums[q.id] = Math.round(qSum * 10) / 10;
              runningTotal += quesitoSums[q.id];
            }
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
    ouroCountThisSeason: number = 17,
    prataCountThisSeason: number = 24,
    bronzeCountThisSeason: number = 22
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
      // Relegation to Bronze:
      // When Prata > 16: relegate 4
      // When Prata === 15 (transição 2031): relegate 2 (and promote 3 from Bronze to stabilize at 16)
      // When Prata === 16 (stabilized): relegate 3
      const prataRelegatedCount = prataCountThisSeason > 16 ? 4 : prataCountThisSeason === 15 ? 2 : 3;
      const relegatedSlice = rankedList.slice(-prataRelegatedCount);
      relegatedSlice.forEach((item) => relegatedSchoolIds.push(item.school.id));
    } else if (division === 'bronze') {
      // Promotion to Prata:
      // When Prata > 16: promote 1 (champion)
      // When Prata === 15 (transição 2031): promote 3 (Campeã, Vice, 3º lugar) so Prata stabilizes at 16
      // When Prata === 16 (stabilized): promote 3
      const bronzePromotedCount = prataCountThisSeason > 16 ? 1 : 3;
      const promotedSlice = rankedList.slice(0, bronzePromotedCount);
      promotedSlice.forEach((item) => promotedSchoolIds.push(item.school.id));

      // Relegation to Grupo de Avaliação:
      // "Suba apenas 2 escolas do Grupo de Avaliação para Série Bronze até a Série Bronze chegar a 18 escolas, após isso rebaixar 3 do Bronze e subir 3 da Avaliação."
      const prataRelegatedCount = prataCountThisSeason > 16 ? 4 : prataCountThisSeason === 15 ? 2 : 3;
      const netFromPrata = prataRelegatedCount - bronzePromotedCount;
      let bronzeRelegatedCount: number;
      if (bronzeCountThisSeason > 18) {
        const targetReduction = Math.min(2, bronzeCountThisSeason - 18);
        bronzeRelegatedCount = netFromPrata + 2 + targetReduction;
      } else {
        bronzeRelegatedCount = Math.max(0, 3 + netFromPrata);
      }
      const relegatedSlice = bronzeRelegatedCount > 0 ? rankedList.slice(-bronzeRelegatedCount) : [];
      relegatedSlice.forEach((item) => relegatedSchoolIds.push(item.school.id));
    } else if (division === 'avaliacao') {
      // Promotion to Série Bronze:
      // "Suba apenas 2 escolas do Grupo de Avaliação para Série Bronze até a Série Bronze chegar a 18 escolas, após isso rebaixar 3 do Bronze e subir 3 da Avaliação."
      const avaliacaoPromotedCount = bronzeCountThisSeason > 18 ? 2 : 3;
      const promotedSlice = rankedList.slice(0, avaliacaoPromotedCount);
      promotedSlice.forEach((item) => promotedSchoolIds.push(item.school.id));

      // Afastamento do Carnaval (mínimo 1 ano fora):
      // The bottom schools are evaluated and suspended. Ensure Grupo de Avaliação never exceeds 20 schools next year!
      const currentCount = rankedList.length;
      const prataRelegatedCount = prataCountThisSeason > 16 ? 4 : prataCountThisSeason === 15 ? 2 : 3;
      const bronzePromotedCount = prataCountThisSeason > 16 ? 1 : 3;
      const netFromPrata = prataRelegatedCount - bronzePromotedCount;
      const incomingFromBronze = bronzeCountThisSeason > 18 ? (netFromPrata + 2 + Math.min(2, bronzeCountThisSeason - 18)) : Math.max(0, 3 + netFromPrata);
      const neededAfastadas = Math.max(2, (currentCount - avaliacaoPromotedCount + incomingFromBronze + 1) - 20);
      const afastadasSlice = neededAfastadas > 0 ? rankedList.slice(-neededAfastadas) : [];
      afastadasSlice.forEach((item) => relegatedSchoolIds.push(item.school.id));
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
    history: YearHistory[],
    avaliacaoResult?: DivisionResult
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
      bronzeRelegatedNames: string[];
      avaliacaoChampionName: string;
      avaliacaoPromotedNames: string[];
      avaliacaoAfastadasNames: string[];
      reactivatedSchoolNames: string[];
      newSchoolNames: string[];
      ouroCountNextSeason: number;
      prataCountNextSeason: number;
      bronzeCountNextSeason: number;
      avaliacaoCountNextSeason: number;
    };
  } {
    const schoolMap = new Map(allSchools.map(s => [s.id, {
      ...s,
      honors: {
        ...s.honors,
        inGameAchievements: [...(s.honors?.inGameAchievements || [])]
      }
    }]));

    // Calculate final standings of all 5 divisions
    const isSchoolActive = (s: School) => !s.isInactive && !s.inactive;

    const espSchools = allSchools.filter(s => s.division === 'especial' && isSchoolActive(s));
    const espRanked = this.calculateStandings(espSchools, especialResult.schoolResults, 8, 3).rankedList;

    const ouroSchools = allSchools.filter(s => s.division === 'ouro' && isSchoolActive(s));
    const ouroRanked = this.calculateStandings(ouroSchools, ouroResult.schoolResults, 8, 3).rankedList;

    const prataSchools = allSchools.filter(s => s.division === 'prata' && isSchoolActive(s));
    const prataRanked = this.calculateStandings(prataSchools, prataResult.schoolResults, 8, 3).rankedList;

    const bronzeSchools = allSchools.filter(s => s.division === 'bronze' && isSchoolActive(s));
    const bronzeRanked = this.calculateStandings(bronzeSchools, bronzeResult.schoolResults, 8, 3).rankedList;

    const avaliacaoSchools = allSchools.filter(s => s.division === 'avaliacao' && isSchoolActive(s));
    const avaResult =
      avaliacaoResult ||
      this.finalizeSeasonDivision(
        'avaliacao',
        currentYear,
        avaliacaoSchools,
        this.simulateDivisionParades(avaliacaoSchools),
        ouroSchools.length,
        prataSchools.length,
        bronzeSchools.length
      );
    const avaliacaoRanked = this.calculateStandings(avaliacaoSchools, avaResult.schoolResults, 8, 3).rankedList;

    const currentOuroCount = ouroSchools.length;
    // Condition specified by user:
    // If currentOuroCount > 14: rebaixe 2 de Ouro e suba 1 de Prata
    // Once currentOuroCount <= 14: rebaixe 2 de Ouro e subam 2 de Prata
    const ouroNeedsReduction = currentOuroCount > 14;
    const prataPromotedCount = ouroNeedsReduction ? 1 : 2;

    const currentPrataCount = prataSchools.length;
    // Condition specified by user:
    // If currentPrataCount > 16: rebaixe 4 da Prata e suba 1 da Bronze
    // If currentPrataCount === 15 (ano 2031): rebaixe 2 da Prata e suba 3 da Bronze (fazendo com que a Série Prata estabilize em 16 escolas)
    // If currentPrataCount === 16 (estabilizada): rebaixe 3 da Prata e suba 3 da Bronze
    let prataRelegatedCount = 3;
    let bronzePromotedCount = 3;
    if (currentPrataCount > 16) {
      prataRelegatedCount = 4;
      bronzePromotedCount = 1;
    } else if (currentPrataCount === 15) {
      prataRelegatedCount = 2;
      bronzePromotedCount = 3;
    } else {
      prataRelegatedCount = 3;
      bronzePromotedCount = 3;
    }

    // Condition specified by user for Bronze ⇄ Avaliação:
    // "Suba apenas 2 escolas do Grupo de Avaliação para Série Bronze até a Série Bronze chegar a 18 escolas, após isso rebaixar 3 do Bronze e subir 3 da Avaliação."
    const currentBronzeCount = bronzeSchools.length;
    let avaliacaoPromotedCount: number;
    let bronzeRelegatedCount: number;
    const netFromPrata = prataRelegatedCount - bronzePromotedCount;

    if (currentBronzeCount > 18) {
      avaliacaoPromotedCount = 2;
      const targetReduction = Math.min(2, currentBronzeCount - 18);
      bronzeRelegatedCount = netFromPrata + avaliacaoPromotedCount + targetReduction;
    } else {
      avaliacaoPromotedCount = 3;
      bronzeRelegatedCount = Math.max(0, 3 + netFromPrata);
    }

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
    const prataRelegatedThreshold = prataRanked.length - prataRelegatedCount;
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
    const bronzeRelegatedThreshold = bronzeRelegatedCount > 0 ? bronzeRanked.length - bronzeRelegatedCount : Infinity;
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
        if (bronzePromotedCount >= 2) {
          sch.budget += 250000;
          sch.fanBaseMorale = Math.min(100, sch.fanBaseMorale + 10);
        }
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'bronze',
          placement: 2,
          titleName: bronzePromotedCount >= 2
            ? `Vice-Campeã da Série Bronze & Acesso à Série Prata ${currentYear}`
            : `Vice-Campeã da Série Bronze ${currentYear}`,
          badgeType: 'vice_bronze',
          totalScore: item.currentScore
        });
      } else if (item.rank === 3) {
        if (bronzePromotedCount >= 3) {
          sch.budget += 200000;
          sch.fanBaseMorale = Math.min(100, sch.fanBaseMorale + 8);
          sch.honors.inGameAchievements.push({
            year: currentYear,
            division: 'bronze',
            placement: 3,
            titleName: `3º Lugar da Série Bronze & Acesso à Série Prata ${currentYear}`,
            badgeType: 'promoted_bronze',
            totalScore: item.currentScore
          });
        } else {
          sch.honors.inGameAchievements.push({
            year: currentYear,
            division: 'bronze',
            placement: 3,
            titleName: `3º Lugar na Série Bronze ${currentYear}`,
            badgeType: 'regular',
            totalScore: item.currentScore
          });
        }
      } else if (item.rank > bronzeRelegatedThreshold) {
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'bronze',
          placement: item.rank,
          titleName: `${item.rank}º Lugar - Rebaixada para o Grupo de Avaliação (${currentYear})`,
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

    // Record In-Game achievements for Grupo de Avaliação
    // Number of bottom schools suspended / afastadas:
    const currentAvaliacaoCount = avaliacaoSchools.length;
    const neededAfastadas = Math.max(2, (currentAvaliacaoCount - avaliacaoPromotedCount + bronzeRelegatedCount + 1) - 20);
    const avaliacaoAfastadasThreshold = avaliacaoRanked.length - neededAfastadas;

    avaliacaoRanked.forEach((item) => {
      const sch = schoolMap.get(item.school.id);
      if (!sch) return;

      if (item.rank === 1) {
        sch.championshipsAvaliacao = (sch.championshipsAvaliacao || 0) + 1;
        sch.budget += 220000;
        sch.fanBaseMorale = Math.min(100, sch.fanBaseMorale + 15);
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'avaliacao',
          placement: 1,
          titleName: `Campeã do Grupo de Avaliação & Acesso à Série Bronze ${currentYear}`,
          badgeType: 'champion_avaliacao',
          totalScore: item.currentScore
        });
      } else if (item.rank === 2) {
        sch.runnerUpsAvaliacao = (sch.runnerUpsAvaliacao || 0) + 1;
        sch.budget += 160000;
        sch.fanBaseMorale = Math.min(100, sch.fanBaseMorale + 10);
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'avaliacao',
          placement: 2,
          titleName: `Vice-Campeã do Grupo de Avaliação & Acesso à Série Bronze ${currentYear}`,
          badgeType: 'vice_avaliacao',
          totalScore: item.currentScore
        });
      } else if (item.rank === 3) {
        if (avaliacaoPromotedCount >= 3) {
          sch.budget += 130000;
          sch.fanBaseMorale = Math.min(100, sch.fanBaseMorale + 8);
          sch.honors.inGameAchievements.push({
            year: currentYear,
            division: 'avaliacao',
            placement: 3,
            titleName: `3º Lugar no Grupo de Avaliação & Acesso à Série Bronze ${currentYear}`,
            badgeType: 'promoted_avaliacao',
            totalScore: item.currentScore
          });
        } else {
          sch.honors.inGameAchievements.push({
            year: currentYear,
            division: 'avaliacao',
            placement: 3,
            titleName: `3º Lugar no Grupo de Avaliação ${currentYear}`,
            badgeType: 'regular',
            totalScore: item.currentScore
          });
        }
      } else if (item.rank > avaliacaoAfastadasThreshold) {
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'avaliacao',
          placement: item.rank,
          titleName: `${item.rank}º Lugar - Afastada temporariamente do Carnaval (${currentYear})`,
          badgeType: 'suspended',
          totalScore: item.currentScore
        });
      } else {
        sch.honors.inGameAchievements.push({
          year: currentYear,
          division: 'avaliacao',
          placement: item.rank,
          titleName: `${item.rank}º Lugar no Grupo de Avaliação ${currentYear}`,
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

    // 5. Relegate bottom schools from Série Prata to Série Bronze (4 while >16, then 3 when 16)
    const prataRelegatedItems = prataRanked.slice(-prataRelegatedCount);
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

    // 6. Promote schools from Série Bronze to Série Prata (1 while Prata >16, then 3 when 16)
    const bronzePromotedItems = bronzeRanked.slice(0, bronzePromotedCount);
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

    // 7. Relegate bottom schools from Série Bronze to Grupo de Avaliação (until Bronze reaches 18, then 3 when 18)
    const bronzeRelegatedItems = bronzeRelegatedCount > 0 ? bronzeRanked.slice(-bronzeRelegatedCount) : [];
    const bronzeRelegatedNames: string[] = [];
    bronzeRelegatedItems.forEach(item => {
      const sch = schoolMap.get(item.school.id);
      if (sch) {
        sch.division = 'avaliacao';
        sch.isInactive = false;
        sch.inactive = false;
        sch.budget = Math.max(200000, sch.budget - 100000);
        sch.fanBaseMorale = Math.max(50, sch.fanBaseMorale - 12);
        bronzeRelegatedNames.push(sch.name);
      }
    });

    // 8. Promote top schools from Grupo de Avaliação to Série Bronze (2 while Bronze >18, then 3 when 18)
    const avaliacaoPromotedItems = avaliacaoRanked.slice(0, avaliacaoPromotedCount);
    const avaliacaoPromotedNames: string[] = [];
    avaliacaoPromotedItems.forEach(item => {
      const sch = schoolMap.get(item.school.id);
      if (sch) {
        sch.division = 'bronze';
        sch.isInactive = false;
        sch.inactive = false;
        sch.budget += 200000;
        sch.fanBaseMorale = Math.min(100, sch.fanBaseMorale + 15);
        avaliacaoPromotedNames.push(sch.name);
      }
    });

    // 9. Afastamento in Grupo de Avaliação (bottom schools, minimum 1 year out)
    const avaliacaoAfastadasItems = neededAfastadas > 0 ? avaliacaoRanked.slice(-neededAfastadas) : [];
    const avaliacaoAfastadasNames: string[] = [];
    avaliacaoAfastadasItems.forEach(item => {
      const sch = schoolMap.get(item.school.id);
      if (sch) {
        sch.isInactive = true;
        sch.inactive = true;
        sch.inactiveYearsCount = 0;
        sch.suspensionReason = 'Afastada pelo regulamento da LIGA para reestruturação financeira e institucional (mínimo 1 ano fora)';
        sch.budget = Math.max(120000, sch.budget - 50000);
        sch.fanBaseMorale = Math.max(45, sch.fanBaseMorale - 15);
        avaliacaoAfastadasNames.push(sch.name);
      }
    });

    // 10. Increment inactive years for other inactive schools (minimum 1 year out enforced)
    schoolMap.forEach(sch => {
      if ((sch.isInactive || sch.inactive) && !avaliacaoAfastadasNames.includes(sch.name)) {
        sch.inactiveYearsCount = (sch.inactiveYearsCount || 0) + 1;
      }
    });

    // 11. Reactivate at least 1 agremiação or create a new random school!
    // "pelo menos 1 agremiação deve voltar todo ano ou o jogo criar uma nova aleatória. O Grupo deve a cada carnaval ser disputado por no máximo 20 escolas."
    const activeAvaliacaoAfterMovements = currentAvaliacaoCount - avaliacaoPromotedCount + bronzeRelegatedCount - neededAfastadas;
    const eligibleInactive = Array.from(schoolMap.values()).filter(
      (s) => (s.isInactive || s.inactive) && (s.inactiveYearsCount || 0) >= 1 && !avaliacaoAfastadasNames.includes(s.name)
    );

    const reactivatedSchoolNames: string[] = [];
    const newSchoolNames: string[] = [];

    // Ensure we do not exceed 20 schools
    if (activeAvaliacaoAfterMovements < 20) {
      if (eligibleInactive.length > 0 && Math.random() < 0.7) {
        const chosen = eligibleInactive[Math.floor(Math.random() * eligibleInactive.length)];
        chosen.isInactive = false;
        chosen.inactive = false;
        chosen.inactiveYearsCount = 0;
        chosen.suspensionReason = undefined;
        chosen.division = 'avaliacao';
        chosen.budget = 250000; // Economically revitalized
        chosen.fanBaseMorale = 80;
        chosen.rehearsalLevel = 72;
        chosen.barracaoProgress = 70;
        reactivatedSchoolNames.push(chosen.name);
      } else {
        const newSchool = generateRandomCarnavalSchool(currentYear + 1, Array.from(schoolMap.keys()));
        schoolMap.set(newSchool.id, newSchool);
        newSchoolNames.push(newSchool.name);
      }
    }

    const prataChamp = schoolMap.get(prataResult.championId) || prataRanked[0]?.school;
    const bronzeChamp = schoolMap.get(bronzeResult.championId) || bronzeRanked[0]?.school;
    const avaliacaoChamp = schoolMap.get(avaResult.championId) || avaliacaoRanked[0]?.school;

    const nextOuroCount = currentOuroCount - 2 + prataPromotedCount;
    const nextPrataCount = currentPrataCount + 2 - prataPromotedCount - prataRelegatedCount + bronzePromotedCount;
    const nextBronzeCount = currentBronzeCount + prataRelegatedCount - bronzePromotedCount - bronzeRelegatedCount + avaliacaoPromotedCount;
    const nextAvaliacaoCount = activeAvaliacaoAfterMovements + reactivatedSchoolNames.length + newSchoolNames.length;

    // Reset parade flags, update attributes, sync consolidated stats
    const updatedSchools: School[] = Array.from(schoolMap.values()).map((s) => {
      const isInactive = Boolean(s.isInactive || s.inactive);

      // Annual revenue from Liga + TV cotas
      let tvRevenue = 160000;
      if (isInactive) {
        tvRevenue = 0;
      } else if (s.division === 'especial') tvRevenue = 1400000;
      else if (s.division === 'ouro') tvRevenue = 750000;
      else if (s.division === 'prata') tvRevenue = 450000;
      else if (s.division === 'bronze') tvRevenue = 280000;
      else if (s.division === 'avaliacao') tvRevenue = 160000;

      // Staff expenses
      const staffTotalSalary = isInactive ? 0 : Object.values(s.staff).reduce((acc, member) => acc + member.salary, 0);

      // Slight natural attribute evolution (+/- 1-2 points)
      const evolveAttr = (val: number) => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
        return Math.min(99, Math.max(68, val + delta));
      };

      const cons = getSchoolConsolidatedStats(s);

      return {
        ...s,
        isInactive,
        inactive: isInactive,
        championshipsEspecial: cons.totalEspecialTitles,
        runnerUpsEspecial: cons.totalEspecialVices,
        championshipsOuro: cons.totalOuroTitles,
        runnerUpsOuro: cons.totalOuroVices,
        championshipsPrata: cons.totalPrataTitles,
        runnerUpsPrata: cons.totalPrataVices,
        championshipsBronze: cons.totalBronzeTitles,
        runnerUpsBronze: cons.totalBronzeVices,
        championshipsAvaliacao: cons.totalAvaliacaoTitles,
        runnerUpsAvaliacao: cons.totalAvaliacaoVices,
        budget: s.isInactive ? s.budget : Math.max(200000, s.budget + tvRevenue - staffTotalSalary),
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
      schoolName: cleanSchoolName(r.school),
      totalScore: r.currentScore
    }));

    const ouroStandings = ouroRanked.map(r => ({
      rank: r.rank,
      schoolId: r.school.id,
      schoolName: cleanSchoolName(r.school),
      totalScore: r.currentScore
    }));

    const prataStandings = prataRanked.map(r => ({
      rank: r.rank,
      schoolId: r.school.id,
      schoolName: cleanSchoolName(r.school),
      totalScore: r.currentScore
    }));

    const bronzeStandings = bronzeRanked.map(r => ({
      rank: r.rank,
      schoolId: r.school.id,
      schoolName: cleanSchoolName(r.school),
      totalScore: r.currentScore
    }));

    const avaliacaoStandings = avaliacaoRanked.map(r => ({
      rank: r.rank,
      schoolId: r.school.id,
      schoolName: cleanSchoolName(r.school),
      totalScore: r.currentScore
    }));

    const historyRecord: YearHistory = {
      year: currentYear,
      especialChampion: cleanSchoolName(espRanked[0]?.school) || 'Desconhecida',
      especialRelegated: especialRelegated ? [cleanSchoolName(especialRelegated)] : [],
      ouroChampion: ouroChamp ? cleanSchoolName(ouroChamp) : 'Desconhecida',
      ouroRelegated: ouroRelegatedNames.map(n => cleanSchoolName(n)),
      prataChampion: prataChamp ? cleanSchoolName(prataChamp) : 'Desconhecida',
      prataPromoted: prataPromotedNames.map(n => cleanSchoolName(n)),
      prataRelegated: prataRelegatedNames.map(n => cleanSchoolName(n)),
      bronzeChampion: bronzeChamp ? cleanSchoolName(bronzeChamp) : 'Desconhecida',
      bronzePromoted: bronzePromotedNames.map(n => cleanSchoolName(n)),
      bronzeRelegated: bronzeRelegatedNames.map(n => cleanSchoolName(n)),
      avaliacaoChampion: avaliacaoChamp ? cleanSchoolName(avaliacaoChamp) : 'Desconhecida',
      avaliacaoPromoted: avaliacaoPromotedNames.map(n => cleanSchoolName(n)),
      avaliacaoRelegated: avaliacaoAfastadasNames.map(n => cleanSchoolName(n)),
      especialStandings: espStandings,
      ouroStandings: ouroStandings,
      prataStandings: prataStandings,
      bronzeStandings: bronzeStandings,
      avaliacaoStandings: avaliacaoStandings,
      reactivatedSchools: reactivatedSchoolNames.map(n => cleanSchoolName(n)),
      newSchoolsCreated: newSchoolNames.map(n => cleanSchoolName(n))
    };

    return {
      nextSchools: updatedSchools,
      nextYear: currentYear + 1,
      newHistory: [historyRecord, ...history],
      summary: {
        especialChampionName: cleanSchoolName(espRanked[0]?.school) || '',
        especialRelegatedName: cleanSchoolName(especialRelegated) || '',
        ouroChampionName: cleanSchoolName(ouroChamp) || '',
        ouroRelegatedNames: ouroRelegatedNames.map(n => cleanSchoolName(n)),
        prataChampionName: cleanSchoolName(prataChamp) || '',
        prataPromotedNames: prataPromotedNames.map(n => cleanSchoolName(n)),
        prataRelegatedNames: prataRelegatedNames.map(n => cleanSchoolName(n)),
        bronzeChampionName: cleanSchoolName(bronzeChamp) || '',
        bronzePromotedNames: bronzePromotedNames.map(n => cleanSchoolName(n)),
        bronzeRelegatedNames: bronzeRelegatedNames.map(n => cleanSchoolName(n)),
        avaliacaoChampionName: cleanSchoolName(avaliacaoChamp) || '',
        avaliacaoPromotedNames: avaliacaoPromotedNames.map(n => cleanSchoolName(n)),
        avaliacaoAfastadasNames: avaliacaoAfastadasNames.map(n => cleanSchoolName(n)),
        reactivatedSchoolNames,
        newSchoolNames,
        ouroCountNextSeason: nextOuroCount,
        prataCountNextSeason: nextPrataCount,
        bronzeCountNextSeason: nextBronzeCount,
        avaliacaoCountNextSeason: nextAvaliacaoCount
      }
    };
  }
}
