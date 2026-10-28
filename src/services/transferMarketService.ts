import { CarnavalProfessional, ProfessionalRole, TransferEvent, TransferWindowStatus } from '../types/professionals';
import { School, StaffMember } from '../types/carnaval';
import { INITIAL_PROFESSIONALS_DATABASE } from '../data/professionalsDatabase';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import { NewsService } from './newsService';
import { NewsArticle } from '../types/news';
import { SeasonMonthId } from '../types/seasonCycle';

export class TransferMarketService {
  private static STORAGE_KEY = 'samba_manager_professionals_db_v4';
  private static HISTORY_STORAGE_KEY = 'samba_manager_transfers_history_v2';

  /**
   * Meses oficiais em que a janela de transferências está aberta na pré-temporada
   * - Março (Pós-carnaval imediato / rescisões)
   * - Abril (Planejamento e sondagens)
   * - Maio (Janela oficial principal de contratações)
   * - Junho (Ajustes finais de elenco antes do anúncio do enredo)
   */
  public static TRANSFER_WINDOW_MONTHS: SeasonMonthId[] = ['marco', 'abril', 'maio', 'junho'];

  /**
   * Verifica o status da janela de transferências de acordo com o mês atual da pré-temporada
   */
  public static getWindowStatus(currentMonthId: SeasonMonthId = 'maio'): TransferWindowStatus {
    const isOpen = this.TRANSFER_WINDOW_MONTHS.includes(currentMonthId);

    const monthNames: Record<SeasonMonthId, string> = {
      marco: 'Março (Abertura da Janela Pós-Apuração)',
      abril: 'Abril (Sondagens & Planejamento Financeiro)',
      maio: 'Maio (Pico da Janela Oficial de Contratações)',
      junho: 'Junho (Últimos Ajustes de Elenco Pré-Enredo)',
      julho: 'Julho (Janela Fechada · Sorteio Oficial)',
      agosto: 'Agosto (Janela Fechada · Disputas de Samba)',
      setembro: 'Setembro (Janela Fechada · Gravações)',
      outubro: 'Outubro (Janela Fechada · Ensaios de Quadra)',
      novembro: 'Novembro (Janela Fechada · Ensaios de Rua)',
      dezembro: 'Dezembro (Janela Fechada · Vistorias de Barracão)',
      janeiro: 'Janeiro (Janela Fechada · Ensaios Técnicos)',
      fevereiro: 'Fevereiro (Janela Fechada · Carnaval & Desfiles)'
    };

    return {
      isOpen,
      currentMonth: monthNames[currentMonthId] || currentMonthId,
      deadlineName: isOpen
        ? 'Janela de Pré-Temporada Aberta até o fim de Junho'
        : 'Janela de Transferências Fechada (Reabre na Pré-Temporada de Março a Junho)',
      daysRemainingInWindow: isOpen ? Math.max(0, (4 - this.TRANSFER_WINDOW_MONTHS.indexOf(currentMonthId)) * 30) : 0
    };
  }

  /**
   * Obtém a base completa de profissionais atualizada
   */
  public static getAllProfessionals(currentSchools?: School[]): CarnavalProfessional[] {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
          const parsed: CarnavalProfessional[] = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Sincroniza dados vitais com as escolas se fornecidas
            if (currentSchools && currentSchools.length > 0) {
              this.syncSchoolsWithProfessionals(parsed, currentSchools);
            }
            return parsed;
          }
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar profissionais do storage:', e);
    }

    // Inicializa a partir da base e sincroniza com as escolas atuais
    const base = INITIAL_PROFESSIONALS_DATABASE.map((p) => {
      const buyout = p.buyoutClause || Math.floor(p.salary * 1.5);
      return {
        ...p,
        buyoutClause: buyout,
        contractYearsLeft: 1, // Todos os contratos valem por um ano conforme regulamento
        loyaltyLevel: p.loyaltyLevel || Math.floor(60 + Math.random() * 35)
      };
    });

    if (currentSchools && currentSchools.length > 0) {
      this.syncSchoolsWithProfessionals(base, currentSchools);
    }
    this.saveProfessionals(base);
    return base;
  }

  public static saveProfessionals(list: CarnavalProfessional[]): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
      }
    } catch (e) {
      console.warn('Erro ao salvar profissionais:', e);
    }
  }

  /**
   * Histórico persistente de transferências registradas
   */
  public static getTransferHistory(): TransferEvent[] {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem(this.HISTORY_STORAGE_KEY);
        if (stored) {
          const parsed: TransferEvent[] = JSON.parse(stored);
          if (Array.isArray(parsed)) return parsed;
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar histórico de transferências:', e);
    }
    return [];
  }

  public static saveTransferHistory(history: TransferEvent[]): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(this.HISTORY_STORAGE_KEY, JSON.stringify(history.slice(0, 100)));
      }
    } catch (e) {
      console.warn('Erro ao salvar histórico de transferências:', e);
    }
  }

  /**
   * Sincroniza agremiações com profissionais contratados
   */
  /**
   * Sincroniza agremiações com profissionais contratados
   */
  private static syncSchoolsWithProfessionals(
    professionals: CarnavalProfessional[],
    schools: School[]
  ): void {
    schools.forEach((school) => {
      const staff = school.staff;
      if (!staff) return;

      Object.entries(staff).forEach(([roleKey, member]: [string, StaffMember | undefined]) => {
        if (!member) return;
        const found = professionals.find(
          (p) => p.id === member.id || p.name.toLowerCase() === member.name.toLowerCase()
        );
        if (found) {
          if (!found.currentSchoolId || found.currentSchoolId === school.id) {
            found.currentSchoolId = school.id;
            found.currentSchoolName = cleanSchoolName(school);
            found.currentSchoolDivision = school.division;
            found.status = 'em_escola';
            found.contractYearsLeft = 1;
            found.rating = member.rating;
            found.salary = member.salary;
            if (!found.buyoutClause) {
              found.buyoutClause = Math.floor(member.salary * 1.5);
            }
          } else if (found.currentSchoolDivision !== school.division) {
            // Dupla atuação autorizada em grupos diferentes (exclusividade de 1 agremiação por grupo)
            found.secondarySchoolId = school.id;
            found.secondarySchoolName = cleanSchoolName(school);
            found.secondarySchoolDivision = school.division;
          }
        }
      });
    });
  }

  /**
   * Regulamento Oficial de Contratos (LIESA / LIGA-RJ / Superliga):
   * 1. Exclusividade por Grupo: Nenhum profissional pode trabalhar ou ter função em mais de uma escola no mesmo Grupo.
   * 2. Multigrupo Permitido: Podem trabalhar em escolas de grupos separados (ex: Especial + Série Ouro), mantendo 1 escola por grupo.
   * 3. Anualidade: Todos os contratos valem por 1 ano e são refeitos a cada início de projeto de carnaval.
   */
  public static checkExclusivityRule(
    professional: CarnavalProfessional,
    targetSchool: School,
    allSchools: School[] = []
  ): {
    canSign: boolean;
    violatesSameGroup: boolean;
    sameGroupSchoolName?: string;
    isDualGroupAllowed: boolean;
    message: string;
    requiresBuyout: boolean;
  } {
    // Se o profissional já está na própria agremiação
    if (professional.currentSchoolId === targetSchool.id || professional.secondarySchoolId === targetSchool.id) {
      return {
        canSign: true,
        violatesSameGroup: false,
        isDualGroupAllowed: false,
        message: `${professional.name} já possui contrato ativo na ${cleanSchoolName(targetSchool)}.`,
        requiresBuyout: false
      };
    }

    // Se é Free Agent ou não tem agremiação atual
    if (!professional.currentSchoolId || professional.status !== 'em_escola') {
      return {
        canSign: true,
        violatesSameGroup: false,
        isDualGroupAllowed: false,
        message: `${professional.name} é Agente Livre e está 100% elegível para contrato anual na ${cleanSchoolName(targetSchool)}.`,
        requiresBuyout: false
      };
    }

    const currentSchool = allSchools.find((s) => s.id === professional.currentSchoolId);
    const currentDivision = currentSchool?.division || professional.currentSchoolDivision;

    // Se pertence ao MESMO grupo/divisão:
    // Não pode atuar em duas agremiações do mesmo grupo simultaneamente!
    // Apenas pode vir transferido rompendo o contrato anterior (com pagamento de multa rescisória).
    if (currentDivision === targetSchool.division) {
      return {
        canSign: true,
        violatesSameGroup: true,
        sameGroupSchoolName: professional.currentSchoolName || currentSchool?.name,
        isDualGroupAllowed: false,
        message: `Exclusividade por Grupo Obrigatória: ${professional.name} já atua na ${professional.currentSchoolName} neste mesmo grupo (${targetSchool.division.toUpperCase()}). O regulamento veda atuar em 2 agremiações na mesma divisão. A assinatura exigirá rescisão e pagamento de multa rescisória para assumir exclusivamente na ${cleanSchoolName(targetSchool)}.`,
        requiresBuyout: true
      };
    }

    // Se pertence a grupo DIFERENTE (ex: Especial e Série Ouro):
    // Permitido atuar em ambas!
    return {
      canSign: true,
      violatesSameGroup: false,
      isDualGroupAllowed: true,
      message: `Dupla Atuação Permitida: ${professional.name} atua na ${professional.currentSchoolName} (${(currentDivision || 'acesso').toUpperCase()}). O regulamento autoriza atuação concomitante por pertencerem a grupos separados, assegurando exclusividade de 1 agremiação por grupo.`,
      requiresBuyout: false
    };
  }

  /**
   * Refaz ou renova contrato anual de um profissional para a temporada
   */
  public static renewStaffContract(
    school: School,
    roleKey: keyof School['staff']
  ): School {
    const member = school.staff[roleKey];
    if (!member) return school;

    return {
      ...school,
      staff: {
        ...school.staff,
        [roleKey]: {
          ...member,
          reputation: member.reputation.includes('Contrato Renovado')
            ? member.reputation
            : `${member.reputation} · Contrato Renovado 2026`
        }
      }
    };
  }

  /**
   * Executa a contratação ou transferência de um profissional pelo jogador ou pela IA
   */
  public static hireProfessional(
    school: School,
    professional: CarnavalProfessional,
    mode: 'solo' | 'dupla' | 'separacao_dupla',
    currentYear: number,
    monthId: SeasonMonthId = 'maio',
    allSchools: School[] = []
  ): {
    updatedSchool: School;
    transferEvent: TransferEvent;
    newsArticle: NewsArticle;
    previousSchoolUpdated?: School;
  } {
    const roleKey = professional.role as keyof typeof school.staff;
    const currentMember = school.staff[roleKey];
    const signingBonus = professional.signingBonus || Math.floor(professional.salary * 0.4);

    // Se o profissional estava em outra escola rival, calcula a multa rescisória (buyout)
    let buyoutPaid = 0;
    let previousSchoolUpdated: School | undefined = undefined;

    if (
      professional.currentSchoolId &&
      professional.currentSchoolId !== school.id &&
      professional.status === 'em_escola'
    ) {
      buyoutPaid = professional.buyoutClause || Math.floor(professional.salary * 1.2);

      // Localiza a escola anterior para creditar a multa rescisória e preencher o cargo vago com um substituto
      const prevSchool = allSchools.find((s) => s.id === professional.currentSchoolId);
      if (prevSchool) {
        // Encontra um profissional da base ou promove um assistente temporário
        const substituteStaffMember: StaffMember = {
          id: `sub_${Date.now()}_${roleKey}`,
          name: `Comissão Interina de ${professional.roleName}`,
          role: professional.role,
          roleName: professional.roleName,
          rating: Math.max(70, professional.rating - 10),
          salary: Math.floor(professional.salary * 0.6),
          reputation: 'Equipe Interina da Comunidade',
          isDupla: false
        };

        previousSchoolUpdated = {
          ...prevSchool,
          budget: prevSchool.budget + buyoutPaid,
          staff: {
            ...prevSchool.staff,
            [roleKey]: substituteStaffMember
          },
          fanBaseMorale: Math.max(20, prevSchool.fanBaseMorale - 5)
        };
      }
    }

    const totalCashNeeded = signingBonus + buyoutPaid;

    let finalName = professional.name;
    let finalRating = professional.rating;
    let isDupla = false;
    let partnerName: string | undefined = undefined;

    if (mode === 'dupla') {
      isDupla = true;
      if (currentMember && currentMember.name !== professional.name) {
        partnerName = currentMember.name;
        finalName = `${professional.name} & ${currentMember.name}`;
        // Bônus de sinergia de dupla para carnavalescos, puxadores ou mestres (+1 a +2 de rating)
        finalRating = Math.min(99, Math.max(professional.rating, currentMember.rating) + 1);
      } else if (professional.isDupla && professional.partnerName) {
        partnerName = professional.partnerName;
        finalName = professional.name;
      }
    } else if (mode === 'separacao_dupla') {
      isDupla = false;
      partnerName = undefined;
      // Voo solo
      finalName = professional.name.split('&')[0].trim();
    }

    const updatedMember: StaffMember = {
      id: professional.id,
      name: finalName,
      role: professional.role,
      roleName: professional.roleName,
      rating: finalRating,
      salary: professional.salary,
      reputation: professional.reputation,
      isDupla,
      partnerName,
      originCity: professional.originCity,
      previousSchoolName: professional.currentSchoolName
    };

    const updatedStaff = {
      ...school.staff,
      [roleKey]: updatedMember
    };

    // Ajuste nos atributos técnicos da escola conforme a evolução do rating
    const ratingDiff = finalRating - (currentMember?.rating || 75);
    const updatedAttrs = { ...school.attributes };

    if (professional.role === 'mestreBateria') {
      updatedAttrs.bateria = Math.min(99, Math.max(70, updatedAttrs.bateria + Math.ceil(ratingDiff / 2)));
    } else if (professional.role === 'coreografo') {
      updatedAttrs.comissaoDeFrente = Math.min(99, Math.max(70, updatedAttrs.comissaoDeFrente + Math.ceil(ratingDiff / 2)));
    } else if (professional.role === 'mestreSalaPortaBandeira') {
      updatedAttrs.mestreSalaPortaBandeira = Math.min(99, Math.max(70, updatedAttrs.mestreSalaPortaBandeira + Math.ceil(ratingDiff / 2)));
    } else if (professional.role === 'interprete') {
      updatedAttrs.sambaEnredo = Math.min(99, Math.max(70, updatedAttrs.sambaEnredo + Math.ceil(ratingDiff / 2)));
    } else if (professional.role === 'harmonia') {
      updatedAttrs.harmonia = Math.min(99, Math.max(70, updatedAttrs.harmonia + Math.ceil(ratingDiff / 2)));
    } else if (professional.role === 'carnavalesco') {
      updatedAttrs.enredo = Math.min(99, Math.max(70, updatedAttrs.enredo + Math.ceil(ratingDiff / 3)));
      updatedAttrs.fantasias = Math.min(99, Math.max(70, updatedAttrs.fantasias + Math.ceil(ratingDiff / 3)));
    }

    const updatedSchool: School = {
      ...school,
      budget: school.budget - totalCashNeeded,
      staff: updatedStaff,
      attributes: updatedAttrs,
      fanBaseMorale: Math.min(100, Math.max(20, school.fanBaseMorale + (ratingDiff > 0 ? 6 : -2)))
    };

    const transferEvent: TransferEvent = {
      id: `tr_${Date.now()}_${professional.id}`,
      professionalId: professional.id,
      professionalName: professional.name,
      role: professional.role,
      roleName: professional.roleName,
      previousSchoolId: professional.currentSchoolId,
      previousSchoolName: professional.currentSchoolName,
      newSchoolId: school.id,
      newSchoolName: cleanSchoolName(school),
      mode,
      partnerName,
      valueSalary: professional.salary,
      valueBonus: signingBonus,
      buyoutPaid: buyoutPaid > 0 ? buyoutPaid : undefined,
      year: currentYear,
      monthId,
      dateStr: `${monthId.charAt(0).toUpperCase() + monthId.slice(1)} de ${currentYear}`
    };

    // Gera notícia jornalística correspondente
    const newsArticle = NewsService.generateTransferNewsArticle(
      transferEvent,
      allSchools.length > 0 ? allSchools : [school]
    );

    // Atualiza status do profissional no banco de dados geral
    const allProfs = this.getAllProfessionals();
    const profIndex = allProfs.findIndex((p) => p.id === professional.id);
    if (profIndex !== -1) {
      allProfs[profIndex] = {
        ...allProfs[profIndex],
        status: 'em_escola',
        currentSchoolId: school.id,
        currentSchoolName: cleanSchoolName(school),
        isDupla,
        partnerName,
        contractYearsLeft: 1
      };
      this.saveProfessionals(allProfs);
    }

    // Registra no histórico de transferências
    const currentHistory = this.getTransferHistory();
    this.saveTransferHistory([transferEvent, ...currentHistory]);

    return {
      updatedSchool,
      transferEvent,
      newsArticle,
      previousSchoolUpdated
    };
  }

  /**
   * Simula a janela de transferências das outras agremiações (IA)
   * Agremiações do Especial, Ouro e Prata contratam e reestruturam equipes com notícias publicadas
   */
  public static simulateAITransfers(
    schools: School[],
    userSchoolId: string | undefined,
    currentYear: number,
    currentMonthId: SeasonMonthId = 'maio'
  ): {
    updatedSchools: School[];
    generatedTransfers: TransferEvent[];
    generatedNews: NewsArticle[];
  } {
    const allProfs = this.getAllProfessionals(schools);

    // Pool de alvos: free agents, destaques do acesso, profissionais de fora ou profissionais que aceitam transferência
    const availablePool = allProfs.filter(
      (p) =>
        p.status === 'free_agent' ||
        p.status === 'outra_cidade' ||
        p.status === 'destaque_acesso' ||
        (p.status === 'em_escola' && p.currentSchoolId !== userSchoolId && Math.random() < 0.25)
    );

    const generatedTransfers: TransferEvent[] = [];
    const generatedNews: NewsArticle[] = [];

    // Filtra escolas controladas pela IA (focando em Especial, Série Ouro e Prata)
    const aiSchools = schools.filter(
      (s) =>
        s.id !== userSchoolId &&
        !s.isInactive &&
        !(s as any).inactive &&
        (s.division === 'especial' || s.division === 'ouro' || s.division === 'prata')
    );

    // Seleciona de 2 a 4 movimentações de impacto por rodada de mercado
    const count = Math.floor(Math.random() * 3) + 2;
    const candidateSchools = [...aiSchools].sort(() => Math.random() - 0.5).slice(0, count);

    const updatedSchoolsMap = new Map<string, School>();
    schools.forEach((s) => updatedSchoolsMap.set(s.id, s));

    candidateSchools.forEach((school) => {
      if (availablePool.length === 0) return;

      // Escolhe uma função que a escola deseja reforçar (prioridade carnavalesco, interprete, mestreBateria)
      const roles: ProfessionalRole[] = [
        'carnavalesco',
        'interprete',
        'mestreBateria',
        'mestreSalaPortaBandeira',
        'coreografo'
      ];
      const targetRole = roles[Math.floor(Math.random() * roles.length)];

      const eligibleProfs = availablePool.filter(
        (p) =>
          p.role === targetRole &&
          p.currentSchoolId !== school.id &&
          (school.division === 'especial'
            ? p.rating >= 84
            : school.division === 'ouro'
            ? p.rating >= 75 && p.rating <= 92
            : p.rating >= 68 && p.rating <= 84)
      );

      if (eligibleProfs.length === 0) return;

      const chosenProf = eligibleProfs[Math.floor(Math.random() * eligibleProfs.length)];

      // Decide modo: solo ou formação de dupla para funções compatíveis
      let mode: 'solo' | 'dupla' = 'solo';
      if (
        (targetRole === 'interprete' || targetRole === 'carnavalesco' || targetRole === 'mestreBateria') &&
        chosenProf.willingToFormDupla &&
        Math.random() > 0.6
      ) {
        mode = 'dupla';
      }

      const currentSchoolState = updatedSchoolsMap.get(school.id) || school;
      const currentAllSchoolsState = Array.from(updatedSchoolsMap.values());

      const result = this.hireProfessional(
        currentSchoolState,
        chosenProf,
        mode,
        currentYear,
        currentMonthId,
        currentAllSchoolsState
      );

      updatedSchoolsMap.set(school.id, result.updatedSchool);
      if (result.previousSchoolUpdated) {
        updatedSchoolsMap.set(result.previousSchoolUpdated.id, result.previousSchoolUpdated);
      }

      generatedTransfers.push(result.transferEvent);
      generatedNews.push(result.newsArticle);

      // Remove o profissional contratado do pool temporário
      const poolIdx = availablePool.findIndex((p) => p.id === chosenProf.id);
      if (poolIdx !== -1) availablePool.splice(poolIdx, 1);
    });

    const updatedSchools = schools.map((s) => updatedSchoolsMap.get(s.id) || s);

    // Salva notícias geradas no storage
    if (generatedNews.length > 0) {
      const existingNews = NewsService.loadNews(currentYear, schools);
      NewsService.saveNews(currentYear, [...generatedNews, ...existingNews]);
    }

    return {
      updatedSchools,
      generatedTransfers,
      generatedNews
    };
  }

  /**
   * Rescinde contrato amigavelmente com um membro da equipe (demissão / quebra de contrato)
   */
  public static releaseMember(
    school: School,
    roleKey: keyof typeof school.staff,
    currentYear: number,
    monthId: SeasonMonthId = 'maio'
  ): {
    updatedSchool: School;
    releasedProfessionalName: string;
  } {
    const member = school.staff[roleKey];
    if (!member) {
      return { updatedSchool: school, releasedProfessionalName: '' };
    }

    const releasedName = member.name;
    const severanceFee = Math.floor(member.salary * 0.25); // Custo de rescisão 25%

    // Substitui por comissão técnica básica da comunidade
    const baseMember: StaffMember = {
      id: `comissao_base_${roleKey}`,
      name: `Comissão de ${member.roleName}`,
      role: member.role,
      roleName: member.roleName,
      rating: 70,
      salary: 15000,
      reputation: 'Pratas da Casa da Comunidade',
      isDupla: false
    };

    const updatedSchool: School = {
      ...school,
      budget: Math.max(0, school.budget - severanceFee),
      staff: {
        ...school.staff,
        [roleKey]: baseMember
      },
      fanBaseMorale: Math.max(20, school.fanBaseMorale - 3)
    };

    // Marca o profissional como Free Agent na base
    const allProfs = this.getAllProfessionals();
    const profIndex = allProfs.findIndex((p) => p.name.toLowerCase() === releasedName.toLowerCase());
    if (profIndex !== -1) {
      allProfs[profIndex] = {
        ...allProfs[profIndex],
        status: 'free_agent',
        currentSchoolId: undefined,
        currentSchoolName: undefined,
        isDupla: false,
        contractYearsLeft: 0
      };
      this.saveProfessionals(allProfs);
    }

    return {
      updatedSchool,
      releasedProfessionalName: releasedName
    };
  }
}
