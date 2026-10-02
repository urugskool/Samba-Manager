import { DivisionId, School, YearHistory } from '../types/carnaval';
import { CarnavalSorteio, DivisionSorteio, ParadeDay, SorteioSlot, PARADE_DAYS_ORDER } from '../types/sorteio';

export interface SorteioChoice {
  schoolId: string;
  day: ParadeDay;
  order: number;
}

export class SorteioEngine {
  /**
   * Embaralha um array aleatoriamente (Fisher-Yates)
   */
  private static shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /**
   * Obtém o histórico do ano imediatamente anterior
   */
  public static getPreviousYearHistory(currentYear: number, history: YearHistory[]): YearHistory | undefined {
    return history.find((h) => h.year === currentYear - 1) || history[0];
  }

  /**
   * Sorteio do Grupo Especial (12 escolas em 3 noites: Domingo, Segunda e Terça de Carnaval)
   * Regras Oficiais LIESA:
   * - Campeã da Série Ouro (promovida) abre a 1ª noite (Domingo, 1ª a desfilar).
   * - 11ª colocada no último Carnaval abre a 2ª noite (Segunda-Feira, 1ª a desfilar).
   * - 10ª colocada no último Carnaval abre a 3ª noite (Terça-Feira, 1ª a desfilar).
   * - As demais 9 agremiações sorteiam aleatoriamente entre as posições restantes (3 por noite: 2ª, 3ª, 4ª).
   */
  public static generateEspecialSorteio(
    especialSchools: School[],
    currentYear: number,
    history: YearHistory[]
  ): DivisionSorteio {
    const prevHistory = this.getPreviousYearHistory(currentYear, history);
    const slots: SorteioSlot[] = [];

    // Identificar a Campeã da Série Ouro promovida
    let promotedFromOuroId: string | undefined;
    if (prevHistory?.ouroChampion) {
      const match = especialSchools.find(
        (s) => s.name === prevHistory.ouroChampion || s.shortName === prevHistory.ouroChampion
      );
      if (match) promotedFromOuroId = match.id;
    }
    if (!promotedFromOuroId && prevHistory?.ouroStandings && prevHistory.ouroStandings.length > 0) {
      promotedFromOuroId = prevHistory.ouroStandings[0].schoolId;
    }
    // Fallback se não encontrar por nome no histórico
    if (!promotedFromOuroId || !especialSchools.some((s) => s.id === promotedFromOuroId)) {
      promotedFromOuroId = especialSchools[especialSchools.length - 1]?.id;
    }

    // Identificar a 11ª colocada no último Carnaval (abre Segunda)
    let eleventhPlaceId: string | undefined;
    if (prevHistory?.especialStandings && prevHistory.especialStandings.length >= 11) {
      const eleventh = prevHistory.especialStandings.find((s) => s.rank === 11);
      if (eleventh?.schoolId && especialSchools.some((s) => s.id === eleventh.schoolId)) {
        eleventhPlaceId = eleventh.schoolId;
      }
    }
    // Fallback se não achar
    if (!eleventhPlaceId || eleventhPlaceId === promotedFromOuroId) {
      const candidates = especialSchools.filter((s) => s.id !== promotedFromOuroId);
      eleventhPlaceId = candidates[candidates.length - 2]?.id || candidates[0]?.id;
    }

    // Identificar a 10ª colocada no último Carnaval (abre Terça)
    let tenthPlaceId: string | undefined;
    if (prevHistory?.especialStandings && prevHistory.especialStandings.length >= 10) {
      const tenth = prevHistory.especialStandings.find((s) => s.rank === 10);
      if (
        tenth?.schoolId &&
        tenth.schoolId !== eleventhPlaceId &&
        tenth.schoolId !== promotedFromOuroId &&
        especialSchools.some((s) => s.id === tenth.schoolId)
      ) {
        tenthPlaceId = tenth.schoolId;
      }
    }
    // Fallback se não achar
    if (!tenthPlaceId || tenthPlaceId === promotedFromOuroId || tenthPlaceId === eleventhPlaceId) {
      const candidates = especialSchools.filter(
        (s) => s.id !== promotedFromOuroId && s.id !== eleventhPlaceId
      );
      tenthPlaceId = candidates[candidates.length - 1]?.id || candidates[0]?.id;
    }

    const promotedSchool = especialSchools.find((s) => s.id === promotedFromOuroId)!;
    const eleventhSchool = especialSchools.find((s) => s.id === eleventhPlaceId)!;
    const tenthSchool = especialSchools.find((s) => s.id === tenthPlaceId)!;

    // Slot 1 de Domingo: Campeã da Série Ouro
    slots.push({
      id: 'especial_domingo_1',
      division: 'especial',
      day: 'domingo',
      dayLabel: 'Domingo de Carnaval',
      order: 1,
      schoolId: promotedSchool.id,
      schoolName: promotedSchool.name,
      reason: 'Campeã da Série Ouro (Acesso à Elite) • Abre a 1ª noite (Domingo) por regulamento',
      isFixedRule: true,
      ballLabel: 'Bolinha #1 (Abertura Domingo)'
    });

    // Slot 1 de Segunda: 11ª colocada do último ano
    slots.push({
      id: 'especial_segunda_1',
      division: 'especial',
      day: 'segunda',
      dayLabel: 'Segunda-Feira de Carnaval',
      order: 1,
      schoolId: eleventhSchool.id,
      schoolName: eleventhSchool.name,
      reason: '11ª colocada no último Carnaval do Especial • Abre a 2ª noite (Segunda) por regulamento',
      isFixedRule: true,
      ballLabel: 'Bolinha #1 (Abertura Segunda)'
    });

    // Slot 1 de Terça: 10ª colocada do último ano
    slots.push({
      id: 'especial_terca_1',
      division: 'especial',
      day: 'terca',
      dayLabel: 'Terça-Feira de Carnaval',
      order: 1,
      schoolId: tenthSchool.id,
      schoolName: tenthSchool.name,
      reason: '10ª colocada no último Carnaval do Especial • Abre a 3ª noite (Terça-Feira) por regulamento',
      isFixedRule: true,
      ballLabel: 'Bolinha #1 (Abertura Terça)'
    });

    // Demais 9 escolas restantes do Grupo Especial
    const remainingSchools = especialSchools.filter(
      (s) => s.id !== promotedSchool.id && s.id !== eleventhSchool.id && s.id !== tenthSchool.id
    );
    const shuffled = this.shuffle(remainingSchools);

    // Vagas restantes no Especial distribuídas equilibradamente entre Domingo, Segunda e Terça
    const openSlotsConfig: Array<{ day: ParadeDay; dayLabel: string; order: number }> = [];
    const daysConfig: Array<{ day: ParadeDay; dayLabel: string }> = [
      { day: 'domingo', dayLabel: 'Domingo de Carnaval' },
      { day: 'segunda', dayLabel: 'Segunda-Feira de Carnaval' },
      { day: 'terca', dayLabel: 'Terça-Feira de Carnaval' }
    ];
    const nextOrderPerDay: Record<string, number> = { domingo: 2, segunda: 2, terca: 2 };

    for (let i = 0; i < remainingSchools.length; i++) {
      const targetDay = daysConfig[i % 3];
      const ord = nextOrderPerDay[targetDay.day];
      nextOrderPerDay[targetDay.day]++;
      openSlotsConfig.push({
        day: targetDay.day,
        dayLabel: targetDay.dayLabel,
        order: ord
      });
    }

    shuffled.forEach((sch, idx) => {
      const cfg = openSlotsConfig[idx];
      if (cfg) {
        slots.push({
          id: `especial_${cfg.day}_${cfg.order}`,
          division: 'especial',
          day: cfg.day,
          dayLabel: cfg.dayLabel,
          order: cfg.order,
          schoolId: sch.id,
          schoolName: sch.name,
          reason: 'Sorteio Oficial no Globo da LIESA',
          ballLabel: `Bolinha #${cfg.order} (${cfg.dayLabel.split(' ')[0]})`
        });
      }
    });

    // Ordenar slots por dia e ordem
    slots.sort((a, b) => {
      const dayOrder = { domingo: 1, segunda: 2, terca: 3 };
      const diffDay = (dayOrder[a.day as keyof typeof dayOrder] || 0) - (dayOrder[b.day as keyof typeof dayOrder] || 0);
      if (diffDay !== 0) return diffDay;
      return a.order - b.order;
    });

    return {
      division: 'especial',
      isCompleted: true,
      slots,
      drawDate: `Sorteio Oficial LIESA ${currentYear}`
    };
  }

  /**
   * Sorteio da Série Ouro (16 escolas em 2 noites: Sexta e Sábado de Carnaval)
   * Regras:
   * - Se 1 escola sobe da Prata:
   *   - Campeã da Prata abre Sexta-feira (1ª da Sexta).
   *   - Última colocada não rebaixada no último Carnaval na Ouro abre Sábado (1ª do Sábado).
   * - Se 2 escolas sobem da Prata:
   *   - Vice-campeã da Prata abre Sexta-feira (1ª da Sexta).
   *   - Campeã da Prata abre Sábado (1ª do Sábado).
   * - Vice-campeã da Série Ouro no último ano escolhe sua posição (dia e posição de desfile).
   * - As demais sorteiam aleatoriamente entre as vagas restantes.
   */
  public static generateOuroSorteio(
    ouroSchools: School[],
    currentYear: number,
    history: YearHistory[],
    userChoice?: SorteioChoice
  ): DivisionSorteio {
    const prevHistory = this.getPreviousYearHistory(currentYear, history);
    const slots: SorteioSlot[] = [];

    // Verificar quantas escolas subiram da Prata (enquanto Ouro tiver > 14 agremiações, apenas 1 sobe)
    const prataPromoted = prevHistory?.prataPromoted || [];
    const isSinglePromotion = ouroSchools.length > 14 || prataPromoted.length <= 1;

    let sextaOpenerId: string | undefined;
    let sabadoOpenerId: string | undefined;
    let sextaReason = '';
    let sabadoReason = '';

    if (isSinglePromotion) {
      // 1 escola subiu
      const championName = prevHistory?.prataChampion || prataPromoted[0];
      const championSchool = ouroSchools.find(
        (s) => s.name === championName || s.shortName === championName
      );
      sextaOpenerId = championSchool?.id || ouroSchools[ouroSchools.length - 1]?.id;
      sextaReason = 'Campeã da Série Prata • Abre a Sexta-Feira por regulamento';

      // Última colocada não rebaixada no último Carnaval na Série Ouro
      if (prevHistory?.ouroStandings && prevHistory.ouroStandings.length > 0) {
        const relegated = prevHistory.ouroRelegated || [];
        const nonRelegated = prevHistory.ouroStandings.filter(
          (s) => !relegated.includes(s.schoolName) && (!s.schoolId || !relegated.includes(s.schoolId))
        );
        const lastSafe = nonRelegated[nonRelegated.length - 1];
        if (lastSafe?.schoolId && ouroSchools.some((s) => s.id === lastSafe.schoolId)) {
          sabadoOpenerId = lastSafe.schoolId;
        }
      }
      if (!sabadoOpenerId || sabadoOpenerId === sextaOpenerId) {
        const candidates = ouroSchools.filter((s) => s.id !== sextaOpenerId);
        sabadoOpenerId = candidates[candidates.length - 2]?.id || candidates[0]?.id;
      }
      sabadoReason = 'Última colocada não rebaixada no Carnaval anterior • Abre o Sábado por regulamento';
    } else {
      // 2 escolas subiram da Série Prata
      const viceChampionName = prataPromoted[1];
      const championName = prevHistory?.prataChampion || prataPromoted[0];

      const viceSchool = ouroSchools.find(
        (s) => s.name === viceChampionName || s.shortName === viceChampionName
      );
      const champSchool = ouroSchools.find(
        (s) => s.name === championName || s.shortName === championName
      );

      sextaOpenerId = viceSchool?.id || ouroSchools[ouroSchools.length - 2]?.id;
      sextaReason = 'Vice-Campeã da Série Prata • Abre a Sexta-Feira por regulamento';

      sabadoOpenerId = champSchool?.id || ouroSchools[ouroSchools.length - 1]?.id;
      sabadoReason = 'Campeã da Série Prata • Abre o Sábado por regulamento';
    }

    const sextaOpener = ouroSchools.find((s) => s.id === sextaOpenerId)!;
    const sabadoOpener = ouroSchools.find((s) => s.id === sabadoOpenerId)!;

    slots.push({
      id: 'ouro_sexta_1',
      division: 'ouro',
      day: 'sexta',
      dayLabel: 'Sexta-Feira de Carnaval',
      order: 1,
      schoolId: sextaOpener.id,
      schoolName: sextaOpener.name,
      reason: sextaReason,
      isFixedRule: true,
      ballLabel: 'Bolinha #1 (Abertura Sexta)'
    });

    slots.push({
      id: 'ouro_sabado_1',
      division: 'ouro',
      day: 'sabado',
      dayLabel: 'Sábado de Carnaval',
      order: 1,
      schoolId: sabadoOpener.id,
      schoolName: sabadoOpener.name,
      reason: sabadoReason,
      isFixedRule: true,
      ballLabel: 'Bolinha #1 (Abertura Sábado)'
    });

    // Identificar a Vice-Campeã da Série Ouro no último ano (escolhe sua posição)
    let ouroViceId: string | undefined;
    if (prevHistory?.ouroStandings && prevHistory.ouroStandings.length >= 2) {
      const viceEntry = prevHistory.ouroStandings.find((s) => s.rank === 2);
      if (viceEntry?.schoolId && ouroSchools.some((s) => s.id === viceEntry.schoolId)) {
        ouroViceId = viceEntry.schoolId;
      }
    }
    if (!ouroViceId || ouroViceId === sextaOpenerId || ouroViceId === sabadoOpenerId) {
      const candidates = ouroSchools.filter(
        (s) => s.id !== sextaOpenerId && s.id !== sabadoOpenerId
      );
      ouroViceId = candidates[0]?.id;
    }

    const ouroViceSchool = ouroSchools.find((s) => s.id === ouroViceId);

    // Definir slot da Vice-Campeã da Ouro
    let viceDay: ParadeDay = 'sabado';
    let viceOrder = 7; // Posição nobre (penúltima de sábado)
    if (
      userChoice &&
      ouroViceSchool &&
      userChoice.schoolId === ouroViceSchool.id &&
      (userChoice.day === 'sexta' || userChoice.day === 'sabado') &&
      userChoice.order >= 2 &&
      userChoice.order <= 8
    ) {
      viceDay = userChoice.day;
      viceOrder = userChoice.order;
    }

    if (ouroViceSchool) {
      slots.push({
        id: `ouro_${viceDay}_${viceOrder}`,
        division: 'ouro',
        day: viceDay,
        dayLabel: viceDay === 'sexta' ? 'Sexta-Feira de Carnaval' : 'Sábado de Carnaval',
        order: viceOrder,
        schoolId: ouroViceSchool.id,
        schoolName: ouroViceSchool.name,
        reason: 'Vice-Campeã da Série Ouro no ano anterior • Escolha estatutária de dia e posição',
        chosenBySchool: true,
        ballLabel: `Bolinha Escolhida #${viceOrder} (${viceDay === 'sexta' ? 'Sexta' : 'Sábado'})`
      });
    }

    // Criar lista de vagas restantes na Série Ouro
    // Regra oficial para grupos de 2 noites:
    // - Se o total de escolas for ímpar: 1ª noite (Sexta) tem 1 escola a menos, 2ª noite (Sábado) tem 1 a mais.
    //   Exemplo: 17 escolas -> 8 na Sexta, 9 no Sábado.
    // - Se for par: divide por igual nas duas noites (ex: 16 -> 8 e 8, 14 -> 7 e 7).
    const totalSchools = ouroSchools.length;
    const sextaCount = Math.floor(totalSchools / 2);
    const sabadoCount = Math.ceil(totalSchools / 2);

    const assignedIds = new Set(slots.map((s) => s.schoolId));
    const assignedSlotKeys = new Set(slots.map((s) => `${s.day}_${s.order}`));

    const remainingSchools = ouroSchools.filter((s) => !assignedIds.has(s.id));
    const shuffledRemaining = this.shuffle(remainingSchools);

    const availableSlots: Array<{ day: ParadeDay; dayLabel: string; order: number }> = [];
    for (let o = 2; o <= sextaCount; o++) {
      if (!assignedSlotKeys.has(`sexta_${o}`)) {
        availableSlots.push({ day: 'sexta', dayLabel: 'Sexta-Feira de Carnaval', order: o });
      }
    }
    for (let o = 2; o <= sabadoCount; o++) {
      if (!assignedSlotKeys.has(`sabado_${o}`)) {
        availableSlots.push({ day: 'sabado', dayLabel: 'Sábado de Carnaval', order: o });
      }
    }

    shuffledRemaining.forEach((sch, idx) => {
      const targetSlot = availableSlots[idx];
      if (targetSlot) {
        slots.push({
          id: `ouro_${targetSlot.day}_${targetSlot.order}`,
          division: 'ouro',
          day: targetSlot.day,
          dayLabel: targetSlot.dayLabel,
          order: targetSlot.order,
          schoolId: sch.id,
          schoolName: sch.name,
          reason: 'Sorteio Oficial no Globo da LIGA RJ',
          ballLabel: `Bolinha #${targetSlot.order} (${targetSlot.dayLabel.split(' ')[0]})`
        });
      }
    });

    // Ordenar slots por dia e ordem
    slots.sort((a, b) => {
      const dayOrder = { sexta: 1, sabado: 2 };
      const diffDay = (dayOrder[a.day as keyof typeof dayOrder] || 0) - (dayOrder[b.day as keyof typeof dayOrder] || 0);
      if (diffDay !== 0) return diffDay;
      return a.order - b.order;
    });

    return {
      division: 'ouro',
      isCompleted: true,
      slots,
      drawDate: `Sorteio Oficial LIGA RJ ${currentYear}`
    };
  }

  /**
   * Sorteio da Série Prata (dividida em duas noites: Segunda e Terça de Carnaval)
   * Regra oficial:
   * - Se o total de escolas for ímpar: 1ª noite (Segunda) tem 1 escola a menos, 2ª noite (Terça) tem 1 a mais.
   * - Se for par: divide por igual nas duas noites.
   * Todas as escolas homologadas no grupo são sorteadas.
   */
  public static generatePrataSorteio(prataSchools: School[], currentYear: number): DivisionSorteio {
    const slots: SorteioSlot[] = [];
    const shuffled = this.shuffle(prataSchools);
    const totalSchools = prataSchools.length;
    const segundaCount = Math.floor(totalSchools / 2);
    const tercaCount = Math.ceil(totalSchools / 2);

    const segundaSchools = shuffled.slice(0, segundaCount);
    const tercaSchools = shuffled.slice(segundaCount);

    segundaSchools.forEach((sch, idx) => {
      slots.push({
        id: `prata_segunda_${idx + 1}`,
        division: 'prata',
        day: 'segunda',
        dayLabel: 'Segunda-Feira de Carnaval (Intendente)',
        order: idx + 1,
        schoolId: sch.id,
        schoolName: sch.name,
        reason: idx === 0 ? 'Abertura da Segunda-Feira • Superliga' : 'Sorteio Oficial da Superliga Carnavalesca',
        ballLabel: `Bolinha #${idx + 1} (Segunda)`
      });
    });

    tercaSchools.forEach((sch, idx) => {
      slots.push({
        id: `prata_terca_${idx + 1}`,
        division: 'prata',
        day: 'terca',
        dayLabel: 'Terça-Feira de Carnaval (Intendente)',
        order: idx + 1,
        schoolId: sch.id,
        schoolName: sch.name,
        reason: idx === 0 ? 'Abertura da Terça-Feira • Superliga' : 'Sorteio Oficial da Superliga Carnavalesca',
        ballLabel: `Bolinha #${idx + 1} (Terça)`
      });
    });

    slots.sort((a, b) => {
      const dayOrder = { segunda: 1, terca: 2 };
      const diffDay = (dayOrder[a.day as keyof typeof dayOrder] || 0) - (dayOrder[b.day as keyof typeof dayOrder] || 0);
      if (diffDay !== 0) return diffDay;
      return a.order - b.order;
    });

    return {
      division: 'prata',
      isCompleted: true,
      slots,
      drawDate: `Sorteio Oficial Superliga Série Prata ${currentYear}`
    };
  }

  /**
   * Sorteio da Série Bronze (dividida em duas noites: Sábado e Domingo de Carnaval)
   * Regra oficial:
   * - Se o total de escolas for ímpar: 1ª noite (Sábado) tem 1 escola a menos, 2ª noite (Domingo) tem 1 a mais.
   * - Se for par: divide por igual nas duas noites.
   * Todas as escolas homologadas no grupo são sorteadas.
   */
  public static generateBronzeSorteio(bronzeSchools: School[], currentYear: number): DivisionSorteio {
    const slots: SorteioSlot[] = [];
    const shuffled = this.shuffle(bronzeSchools);
    const totalSchools = bronzeSchools.length;
    const sabadoCount = Math.floor(totalSchools / 2);
    const domingoCount = Math.ceil(totalSchools / 2);

    const sabadoSchools = shuffled.slice(0, sabadoCount);
    const domingoSchools = shuffled.slice(sabadoCount);

    sabadoSchools.forEach((sch, idx) => {
      slots.push({
        id: `bronze_sabado_${idx + 1}`,
        division: 'bronze',
        day: 'sabado',
        dayLabel: 'Sábado de Carnaval (Intendente)',
        order: idx + 1,
        schoolId: sch.id,
        schoolName: sch.name,
        reason: idx === 0 ? 'Abertura do Sábado • Superliga' : 'Sorteio Oficial da Superliga Carnavalesca',
        ballLabel: `Bolinha #${idx + 1} (Sábado)`
      });
    });

    domingoSchools.forEach((sch, idx) => {
      slots.push({
        id: `bronze_domingo_${idx + 1}`,
        division: 'bronze',
        day: 'domingo',
        dayLabel: 'Domingo de Carnaval (Intendente)',
        order: idx + 1,
        schoolId: sch.id,
        schoolName: sch.name,
        reason: idx === 0 ? 'Abertura do Domingo • Superliga' : 'Sorteio Oficial da Superliga Carnavalesca',
        ballLabel: `Bolinha #${idx + 1} (Domingo)`
      });
    });

    slots.sort((a, b) => {
      const dayOrder = { sabado: 1, domingo: 2 };
      const diffDay = (dayOrder[a.day as keyof typeof dayOrder] || 0) - (dayOrder[b.day as keyof typeof dayOrder] || 0);
      if (diffDay !== 0) return diffDay;
      return a.order - b.order;
    });

    return {
      division: 'bronze',
      isCompleted: true,
      slots,
      drawDate: `Sorteio Oficial Superliga Série Bronze ${currentYear}`
    };
  }

  /**
   * Sorteio do Grupo de Avaliação (Quarta-Feira de Cinzas)
   * Regra:
   * - Apenas a escola que vem das inativas (ou escolas criadas durante o save / reativadas) será a primeira a desfilar sempre;
   * - As demais são sorteadas de forma aleatória.
   */
  public static generateAvaliacaoSorteio(
    avaliacaoSchools: School[],
    currentYear: number,
    history: YearHistory[]
  ): DivisionSorteio {
    const prevHistory = this.getPreviousYearHistory(currentYear, history);
    const slots: SorteioSlot[] = [];

    // Identificar escola que veio de inativa / reativada
    let openerSchoolId: string | undefined;

    // Verificar se houve reativação no histórico
    const reactivatedList = prevHistory?.reactivatedSchools || prevHistory?.newSchoolsCreated || [];
    if (reactivatedList.length > 0) {
      const match = avaliacaoSchools.find(
        (s) => reactivatedList.includes(s.id) || reactivatedList.includes(s.name)
      );
      if (match) openerSchoolId = match.id;
    }

    // Se nenhuma reativada recente, pega a agremiação mais recente ou primeira da lista
    if (!openerSchoolId) {
      // Escola mais recente por ano de fundação
      const sortedByFoundation = [...avaliacaoSchools].sort((a, b) => b.foundationYear - a.foundationYear);
      openerSchoolId = sortedByFoundation[0]?.id;
    }

    const openerSchool = avaliacaoSchools.find((s) => s.id === openerSchoolId) || avaliacaoSchools[0];

    slots.push({
      id: 'avaliacao_quarta_1',
      division: 'avaliacao',
      day: 'quarta_cinzas',
      dayLabel: 'Quarta-Feira de Cinzas (Intendente)',
      order: 1,
      schoolId: openerSchool.id,
      schoolName: openerSchool.name,
      reason: 'Escola recém-reativada/estreante no Grupo de Avaliação • Abre o desfile por regulamento',
      isFixedRule: true
    });

    // Demais escolas sorteadas aleatoriamente
    const remaining = avaliacaoSchools.filter((s) => s.id !== openerSchool.id);
    const shuffled = this.shuffle(remaining);

    shuffled.forEach((sch, idx) => {
      slots.push({
        id: `avaliacao_quarta_${idx + 2}`,
        division: 'avaliacao',
        day: 'quarta_cinzas',
        dayLabel: 'Quarta-Feira de Cinzas (Intendente)',
        order: idx + 2,
        schoolId: sch.id,
        schoolName: sch.name,
        reason: 'Sorteio Oficial da Superliga Carnavalesca'
      });
    });

    slots.sort((a, b) => a.order - b.order);

    return {
      division: 'avaliacao',
      isCompleted: true,
      slots,
      drawDate: `Sorteio Oficial Superliga Avaliação ${currentYear}`
    };
  }

  /**
   * Cria uma estrutura vazia de Sorteio (ainda não realizado) para o início do ciclo carnavalesco
   */
  public static createInitialSorteio(year: number): CarnavalSorteio {
    return {
      year,
      isCompleted: false,
      divisions: {
        especial: { division: 'especial', isCompleted: false, slots: [] },
        ouro: { division: 'ouro', isCompleted: false, slots: [] },
        prata: { division: 'prata', isCompleted: false, slots: [] },
        bronze: { division: 'bronze', isCompleted: false, slots: [] },
        avaliacao: { division: 'avaliacao', isCompleted: false, slots: [] }
      }
    };
  }

  /**
   * Gera o Sorteio Completo de todas as 5 divisões do Carnaval
   */
  public static generateCompleteSorteio(
    schools: School[],
    history: YearHistory[],
    currentYear: number,
    userChoice?: SorteioChoice
  ): CarnavalSorteio {
    const isSchoolActive = (s: School) => !s.isInactive && !s.inactive;

    const especialSchools = schools.filter((s) => s.division === 'especial' && isSchoolActive(s));
    const ouroSchools = schools.filter((s) => s.division === 'ouro' && isSchoolActive(s));
    const prataSchools = schools.filter((s) => s.division === 'prata' && isSchoolActive(s));
    const bronzeSchools = schools.filter((s) => s.division === 'bronze' && isSchoolActive(s));
    const avaliacaoSchools = schools.filter((s) => s.division === 'avaliacao' && isSchoolActive(s));

    const especial = this.generateEspecialSorteio(especialSchools, currentYear, history);
    const ouro = this.generateOuroSorteio(ouroSchools, currentYear, history, userChoice);
    const prata = this.generatePrataSorteio(prataSchools, currentYear);
    const bronze = this.generateBronzeSorteio(bronzeSchools, currentYear);
    const avaliacao = this.generateAvaliacaoSorteio(avaliacaoSchools, currentYear, history);

    return {
      year: currentYear,
      isCompleted: true,
      divisions: {
        especial,
        ouro,
        prata,
        bronze,
        avaliacao
      }
    };
  }

  /**
   * Retorna a sequência planejada da cerimônia de sorteio para uma divisão específica.
   * As escolas são ordenadas pela ordem em que sobem ao palco:
   * 1. Escolas com prerrogativa fixa de abertura estatutária (ex: campeã da série de acesso, 11ª, 10ª).
   * 2. Escolas com prerrogativa de escolha (ex: vice-campeã da Série Ouro).
   * 3. Demais escolas que giram o globo oficial e retiram a bolinha da posição.
   */
  public static getCeremonySequenceForDivision(
    division: DivisionId,
    schools: School[],
    currentYear: number,
    history: YearHistory[],
    userChoice?: SorteioChoice
  ): SorteioSlot[] {
    const isSchoolActive = (s: School) => !s.isInactive && !s.inactive;
    const divSchools = schools.filter((s) => s.division === division && isSchoolActive(s));

    let divSorteio: DivisionSorteio;
    if (division === 'especial') {
      divSorteio = this.generateEspecialSorteio(divSchools, currentYear, history);
    } else if (division === 'ouro') {
      divSorteio = this.generateOuroSorteio(divSchools, currentYear, history, userChoice);
    } else if (division === 'prata') {
      divSorteio = this.generatePrataSorteio(divSchools, currentYear);
    } else if (division === 'bronze') {
      divSorteio = this.generateBronzeSorteio(divSchools, currentYear);
    } else {
      divSorteio = this.generateAvaliacaoSorteio(divSchools, currentYear, history);
    }

    const fixed = divSorteio.slots.filter((s) => s.isFixedRule);
    const chosen = divSorteio.slots.filter((s) => s.chosenBySchool && !s.isFixedRule);
    const regular = divSorteio.slots.filter((s) => !s.isFixedRule && !s.chosenBySchool);

    return [...fixed, ...chosen, ...regular];
  }

  /**
   * Obtém a lista linear cronológica de todos os desfiles do Carnaval
   * Mapeamento cronológico das noites:
   * 1. Sexta-feira: Série Ouro (Noite 1)
   * 2. Sábado: Série Bronze (Noite 1) & Série Ouro (Noite 2)
   * 3. Domingo: Série Bronze (Noite 2) & Grupo Especial (Noite 1)
   * 4. Segunda: Série Prata (Noite 1) & Grupo Especial (Noite 2)
   * 5. Terça: Série Prata (Noite 2) & Grupo Especial (Noite 3)
   * 6. Quarta de Cinzas: Grupo de Avaliação
   */
  public static getChronologicalParadeOrder(
    sorteio: CarnavalSorteio,
    schools: School[]
  ): Array<{
    slot: SorteioSlot;
    school: School;
    dayOrder: number;
    globalIndex: number;
  }> {
    const schoolMap = new Map(schools.map((s) => [s.id, s]));
    const result: Array<{
      slot: SorteioSlot;
      school: School;
      dayOrder: number;
      globalIndex: number;
    }> = [];

    // Agrupar slots por dia
    const allSlots: SorteioSlot[] = [];
    Object.values(sorteio.divisions).forEach((div) => {
      allSlots.push(...div.slots);
    });

    PARADE_DAYS_ORDER.forEach((dayInfo) => {
      const daySlots = allSlots.filter((s) => s.day === dayInfo.id);

      // No mesmo dia, ordenar por divisão prioritária ou ordem
      // No Sábado: Bronze (tarde/noite na Intendente) e Ouro (noite na Sapucaí)
      // No Domingo: Bronze (tarde/noite na Intendente) e Especial (noite na Sapucaí)
      // Na Segunda: Prata (Intendente) e Especial (Sapucaí)
      // Na Terça: Prata (Intendente) e Especial (Sapucaí)
      daySlots.sort((a, b) => {
        // Se divisões diferentes no mesmo dia, Intendente desfila em paralelo ou Sapucaí
        // Para uma ordem sequencial linear sem conflito:
        const divPriority: Record<DivisionId, number> = {
          ouro: 1,
          bronze: 2,
          especial: 3,
          prata: 4,
          avaliacao: 5
        };
        const pDiff = (divPriority[a.division] || 0) - (divPriority[b.division] || 0);
        if (pDiff !== 0) return pDiff;
        return a.order - b.order;
      });

      daySlots.forEach((slot) => {
        const sch = schoolMap.get(slot.schoolId);
        if (sch) {
          result.push({
            slot,
            school: sch,
            dayOrder: slot.order,
            globalIndex: result.length
          });
        }
      });
    });

    return result;
  }

  /**
   * Verifica se um dia específico de Carnaval está liberado para desfiles
   * Regra rígida: Para liberar o dia N, todas as escolas dos dias anteriores devem ter desfilado!
   */
  public static isDayUnlocked(
    day: ParadeDay,
    sorteio: CarnavalSorteio,
    completedSchoolIds: string[]
  ): { unlocked: boolean; reason?: string } {
    const currentDayInfo = PARADE_DAYS_ORDER.find((d) => d.id === day);
    if (!currentDayInfo) return { unlocked: false, reason: 'Dia inválido' };

    // Se é Sexta-feira (primeiro dia), está sempre liberada
    if (currentDayInfo.order === 1) {
      return { unlocked: true };
    }

    // Coletar todas as escolas dos dias anteriores
    const allSlots: SorteioSlot[] = [];
    Object.values(sorteio.divisions).forEach((div) => {
      allSlots.push(...div.slots);
    });

    const previousDays = PARADE_DAYS_ORDER.filter((d) => d.order < currentDayInfo.order);
    for (const prevDay of previousDays) {
      const prevDaySlots = allSlots.filter((s) => s.day === prevDay.id);
      const pendingCount = prevDaySlots.filter((s) => !completedSchoolIds.includes(s.schoolId)).length;
      if (pendingCount > 0) {
        return {
          unlocked: false,
          reason: `Bloqueado • Aguarda a conclusão dos desfiles de ${prevDay.label} (${pendingCount} restantes)`
        };
      }
    }

    return { unlocked: true };
  }

  /**
   * Verifica se uma escola específica está liberada para desfilar na ordem correta
   * Regra:
   * 1. O dia da escola deve estar liberado.
   * 2. Todas as escolas anteriores na mesma noite/dia devem ter desfilado.
   */
  public static isSchoolUnlocked(
    schoolId: string,
    sorteio: CarnavalSorteio,
    completedSchoolIds: string[]
  ): { unlocked: boolean; reason?: string; slot?: SorteioSlot } {
    // Se já desfilou, está liberada/concluída
    if (completedSchoolIds.includes(schoolId)) {
      return { unlocked: true };
    }

    // Encontrar slot da escola
    let targetSlot: SorteioSlot | undefined;
    for (const div of Object.values(sorteio.divisions)) {
      const found = div.slots.find((s) => s.schoolId === schoolId);
      if (found) {
        targetSlot = found;
        break;
      }
    }

    if (!targetSlot) {
      return { unlocked: false, reason: 'Escola não encontrada no sorteio' };
    }

    // Verificar se o dia da escola está liberado
    const dayCheck = this.isDayUnlocked(targetSlot.day, sorteio, completedSchoolIds);
    if (!dayCheck.unlocked) {
      return { unlocked: false, reason: dayCheck.reason, slot: targetSlot };
    }

    // Dentro da mesma noite e divisão, todas as posições anteriores devem ter desfilado
    const sameNightDivSlots = Object.values(sorteio.divisions)
      .flatMap((d) => d.slots)
      .filter((s) => s.division === targetSlot!.division && s.day === targetSlot!.day);

    const precedingInNight = sameNightDivSlots.filter((s) => s.order < targetSlot!.order);
    const pendingPreceding = precedingInNight.filter((s) => !completedSchoolIds.includes(s.schoolId));

    if (pendingPreceding.length > 0) {
      const nextInLine = pendingPreceding[0];
      return {
        unlocked: false,
        reason: `Aguarde a sua vez • Próxima na pista: ${nextInLine.order}ª - ${nextInLine.schoolName}`,
        slot: targetSlot
      };
    }

    return { unlocked: true, slot: targetSlot };
  }

  /**
   * Ordem oficial e estrita de realização dos Sorteios da Ordem dos Desfiles:
   * 1. Grupo Especial (realizado em evento na Cidade do Samba pela LIESA)
   * 2. Série Ouro (realizado pela LIGA-RJ em evento)
   * 3. Superliga Carnavalesca do Brasil em ordem:
   *    3.1. Grupo de Avaliação
   *    3.2. Série Bronze
   *    3.3. Série Prata
   */
  public static readonly SORTEIO_ORDER: DivisionId[] = ['especial', 'ouro', 'avaliacao', 'bronze', 'prata'];

  /**
   * Ordem oficial e estrita de realização das Apurações das Notas:
   * 1. Grupo Especial
   * 2. Série Ouro
   * 3. Superliga em ordem: Grupo de Avaliação -> Série Bronze -> Série Prata
   */
  public static readonly APURACAO_ORDER: DivisionId[] = ['especial', 'ouro', 'avaliacao', 'bronze', 'prata'];

  /**
   * Ordem cronológica oficial dos desfiles na Passarela do Samba (quem entra na pista primeiro no calendário):
   * 1. Série Ouro (Sexta e Sábado • Marquês de Sapucaí)
   * 2. Série Bronze (Sábado e Domingo • Intendente Magalhães)
   * 3. Grupo Especial (Domingo, Segunda e Terça • Marquês de Sapucaí)
   * 4. Série Prata (Segunda e Terça • Intendente Magalhães)
   * 5. Grupo de Avaliação (Quarta-Feira de Cinzas • Intendente Magalhães)
   */
  public static readonly PARADE_GROUPS_CHRONOLOGICAL_ORDER: DivisionId[] = [
    'ouro',
    'bronze',
    'especial',
    'prata',
    'avaliacao'
  ];

  /**
   * Informações detalhadas do evento e entidade promotora de cada sorteio
   */
  public static readonly SORTEIO_EVENT_INFO: Record<
    DivisionId,
    {
      name: string;
      league: string;
      leagueFull: string;
      eventTitle: string;
      venue: string;
      description: string;
      color: string;
      border: string;
      bg: string;
      badgeBg: string;
      badgeText: string;
    }
  > = {
    especial: {
      name: 'Grupo Especial',
      league: 'LIESA',
      leagueFull: 'Liga Independente das Escolas de Samba do Rio de Janeiro',
      eventTitle: 'Sorteio Oficial da Cidade do Samba',
      venue: 'Cidade do Samba • Gamboa, Rio de Janeiro',
      description: 'Evento de gala oficial organizado pela LIESA na Cidade do Samba com presença das 12 agremiações da elite.',
      color: 'text-amber-400',
      border: 'border-amber-500/40',
      bg: 'bg-amber-500/10',
      badgeBg: 'bg-amber-500/20',
      badgeText: 'text-amber-300'
    },
    ouro: {
      name: 'Série Ouro',
      league: 'LIGA-RJ',
      leagueFull: 'Liga Independente do Grupo A do Rio de Janeiro',
      eventTitle: 'Cerimônia Oficial de Sorteio da Série Ouro',
      venue: 'Salão Nobre / Marquês de Sapucaí',
      description: 'Evento oficial realizado pela LIGA-RJ para definir a ordem das agremiações que disputam a vaga no Grupo Especial.',
      color: 'text-blue-400',
      border: 'border-blue-500/40',
      bg: 'bg-blue-500/10',
      badgeBg: 'bg-blue-500/20',
      badgeText: 'text-blue-300'
    },
    avaliacao: {
      name: 'Grupo de Avaliação',
      league: 'SUPERLIGA',
      leagueFull: 'Superliga Carnavalesca do Brasil',
      eventTitle: 'Sorteio de Abertura do Grupo de Avaliação',
      venue: 'Palco Superliga • Intendente Magalhães',
      description: 'Sorteio inicial da Superliga Carnavalesca do Brasil que define a ordem das escolas estreantes e postulantes ao acesso.',
      color: 'text-purple-400',
      border: 'border-purple-500/40',
      bg: 'bg-purple-500/10',
      badgeBg: 'bg-purple-500/20',
      badgeText: 'text-purple-300'
    },
    bronze: {
      name: 'Série Bronze',
      league: 'SUPERLIGA',
      leagueFull: 'Superliga Carnavalesca do Brasil',
      eventTitle: 'Sorteio Oficial da Série Bronze',
      venue: 'Palco Superliga • Intendente Magalhães',
      description: 'Sorteio oficial da Superliga definindo os desfiles de Sábado e Domingo na histórica Passarela da Intendente Magalhães.',
      color: 'text-amber-600',
      border: 'border-amber-700/40',
      bg: 'bg-amber-700/10',
      badgeBg: 'bg-amber-700/20',
      badgeText: 'text-amber-200'
    },
    prata: {
      name: 'Série Prata',
      league: 'SUPERLIGA',
      leagueFull: 'Superliga Carnavalesca do Brasil',
      eventTitle: 'Grande Sorteio da Série Prata',
      venue: 'Palco Superliga • Intendente Magalhães',
      description: 'Definição da ordem de desfile das noites de Segunda e Terça-Feira da divisão que concede vaga na Marquês de Sapucaí.',
      color: 'text-slate-300',
      border: 'border-slate-400/40',
      bg: 'bg-slate-500/10',
      badgeBg: 'bg-slate-400/20',
      badgeText: 'text-slate-200'
    }
  };

  /**
   * Verifica se uma divisão está liberada para sorteio (bloqueio sequencial obrigatório)
   */
  public static isDivisionSorteioUnlocked(
    division: DivisionId,
    sorteio: CarnavalSorteio
  ): { unlocked: boolean; reason?: string; requiredDivision?: DivisionId; requiredName?: string } {
    if (division === 'especial') {
      return { unlocked: true };
    }
    if (division === 'ouro') {
      if (!sorteio.divisions.especial?.isCompleted) {
        return {
          unlocked: false,
          reason: 'O sorteio da Série Ouro (LIGA-RJ) só pode ser realizado após a conclusão oficial do sorteio do Grupo Especial na Cidade do Samba (LIESA).',
          requiredDivision: 'especial',
          requiredName: 'Grupo Especial (LIESA • Cidade do Samba)'
        };
      }
      return { unlocked: true };
    }
    if (division === 'avaliacao') {
      if (!sorteio.divisions.ouro?.isCompleted) {
        return {
          unlocked: false,
          reason: 'O sorteio do Grupo de Avaliação (Superliga) só pode ser realizado após a conclusão oficial do sorteio da Série Ouro (LIGA-RJ).',
          requiredDivision: 'ouro',
          requiredName: 'Série Ouro (LIGA-RJ)'
        };
      }
      return { unlocked: true };
    }
    if (division === 'bronze') {
      if (!sorteio.divisions.avaliacao?.isCompleted) {
        return {
          unlocked: false,
          reason: 'O sorteio da Série Bronze (Superliga) só pode ser realizado após a conclusão oficial do sorteio do Grupo de Avaliação (Superliga).',
          requiredDivision: 'avaliacao',
          requiredName: 'Grupo de Avaliação (Superliga)'
        };
      }
      return { unlocked: true };
    }
    if (division === 'prata') {
      if (!sorteio.divisions.bronze?.isCompleted) {
        return {
          unlocked: false,
          reason: 'O sorteio da Série Prata (Superliga) só pode ser realizado após a conclusão oficial do sorteio da Série Bronze (Superliga).',
          requiredDivision: 'bronze',
          requiredName: 'Série Bronze (Superliga)'
        };
      }
      return { unlocked: true };
    }
    return { unlocked: true };
  }

  /**
   * Verifica se uma divisão está liberada para apuração (bloqueio sequencial obrigatório)
   */
  public static isDivisionApuracaoUnlocked(
    division: DivisionId,
    completedMap: Record<DivisionId, boolean>
  ): { unlocked: boolean; reason?: string; requiredDivision?: DivisionId; requiredName?: string } {
    if (division === 'especial') {
      return { unlocked: true };
    }
    if (division === 'ouro') {
      if (!completedMap.especial) {
        return {
          unlocked: false,
          reason: 'A apuração da Série Ouro (LIGA-RJ) só pode ser iniciada após a proclamação oficial do resultado e encerramento da apuração do Grupo Especial (LIESA).',
          requiredDivision: 'especial',
          requiredName: 'Grupo Especial (LIESA)'
        };
      }
      return { unlocked: true };
    }
    if (division === 'avaliacao') {
      if (!completedMap.ouro) {
        return {
          unlocked: false,
          reason: 'A apuração do Grupo de Avaliação (Superliga) só pode ser iniciada após a conclusão da apuração da Série Ouro (LIGA-RJ).',
          requiredDivision: 'ouro',
          requiredName: 'Série Ouro (LIGA-RJ)'
        };
      }
      return { unlocked: true };
    }
    if (division === 'bronze') {
      if (!completedMap.avaliacao) {
        return {
          unlocked: false,
          reason: 'A apuração da Série Bronze (Superliga) só pode ser iniciada após a conclusão da apuração do Grupo de Avaliação (Superliga).',
          requiredDivision: 'avaliacao',
          requiredName: 'Grupo de Avaliação (Superliga)'
        };
      }
      return { unlocked: true };
    }
    if (division === 'prata') {
      if (!completedMap.bronze) {
        return {
          unlocked: false,
          reason: 'A apuração da Série Prata (Superliga) só pode ser iniciada após a conclusão da apuração da Série Bronze (Superliga).',
          requiredDivision: 'bronze',
          requiredName: 'Série Bronze (Superliga)'
        };
      }
      return { unlocked: true };
    }
    return { unlocked: true };
  }
}
