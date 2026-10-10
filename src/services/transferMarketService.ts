import { CarnavalProfessional, ProfessionalRole, TransferEvent } from '../types/professionals';
import { School, StaffMember } from '../types/carnaval';
import { INITIAL_PROFESSIONALS_DATABASE } from '../data/professionalsDatabase';
import { cleanSchoolName } from '../utils/schoolNameUtils';
import { NewsService } from './newsService';
import { NewsArticle } from '../types/news';

export class TransferMarketService {
  private static STORAGE_KEY = 'samba_manager_professionals_db_v1';

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
            return parsed;
          }
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar profissionais do storage:', e);
    }

    // Inicializa a partir da base e sincroniza com as escolas atuais
    const base = [...INITIAL_PROFESSIONALS_DATABASE];
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
   * Sincroniza agremiações com profissionais contratados
   */
  private static syncSchoolsWithProfessionals(
    professionals: CarnavalProfessional[],
    schools: School[]
  ): void {
    schools.forEach((school) => {
      const staff = school.staff;
      if (!staff) return;

      Object.entries(staff).forEach(([roleKey, member]: [string, StaffMember]) => {
        if (!member) return;
        const found = professionals.find(
          (p) => p.id === member.id || p.name.toLowerCase() === member.name.toLowerCase()
        );
        if (found) {
          found.currentSchoolId = school.id;
          found.currentSchoolName = cleanSchoolName(school);
          found.status = 'em_escola';
          found.rating = member.rating;
          found.salary = member.salary;
        }
      });
    });
  }

  /**
   * Executa a contratação de um profissional pelo jogador ou por IA
   */
  public static hireProfessional(
    school: School,
    professional: CarnavalProfessional,
    mode: 'solo' | 'dupla' | 'separacao_dupla',
    currentYear: number,
    monthId: string = 'maio',
    allSchools: School[] = []
  ): {
    updatedSchool: School;
    transferEvent: TransferEvent;
    newsArticle: NewsArticle;
  } {
    const roleKey = professional.role as keyof typeof school.staff;
    const currentMember = school.staff[roleKey];
    const signingBonus = professional.signingBonus || Math.floor(professional.salary * 0.4);

    let finalName = professional.name;
    let finalRating = professional.rating;
    let isDupla = false;
    let partnerName: string | undefined = undefined;

    if (mode === 'dupla') {
      isDupla = true;
      if (currentMember && currentMember.name !== professional.name) {
        partnerName = currentMember.name;
        finalName = `${professional.name} & ${currentMember.name}`;
        // Bônus de sinergia de dupla para puxadores, carnavalescos ou mestres (+1 a +2 de rating)
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

    // Ajuste nos atributos da escola conforme a evolução do rating
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
      budget: school.budget - signingBonus,
      staff: updatedStaff,
      attributes: updatedAttrs,
      fanBaseMorale: Math.min(100, Math.max(20, school.fanBaseMorale + (ratingDiff > 0 ? 5 : -2)))
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
      year: currentYear,
      monthId
    };

    // Gera notícia jornalística correspondente
    const newsArticle = NewsService.generateTransferNewsArticle(transferEvent, allSchools.length > 0 ? allSchools : [school]);

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
        partnerName
      };
      this.saveProfessionals(allProfs);
    }

    return {
      updatedSchool,
      transferEvent,
      newsArticle
    };
  }

  /**
   * Simula a janela de transferências das outras agremiações (IA)
   * As escolas contratam e reestruturam equipes conforme orçamentos de cada divisão
   */
  public static simulateAITransfers(
    schools: School[],
    userSchoolId: string | undefined,
    currentYear: number
  ): {
    updatedSchools: School[];
    generatedTransfers: TransferEvent[];
    generatedNews: NewsArticle[];
  } {
    const allProfs = this.getAllProfessionals(schools);
    const availablePool = allProfs.filter(
      (p) => p.status === 'free_agent' || p.status === 'outra_cidade' || p.status === 'destaque_acesso'
    );

    const generatedTransfers: TransferEvent[] = [];
    const generatedNews: NewsArticle[] = [];

    // Filtra escolas controladas pela IA (focando em Especial e Série Ouro que mais movimentam o mercado)
    const aiSchools = schools.filter(
      (s) => s.id !== userSchoolId && !s.isInactive && !(s as any).inactive && (s.division === 'especial' || s.division === 'ouro')
    );

    // Seleciona de 2 a 4 movimentações de impacto para gerar dinamismo sem saturar o jogo
    const candidateSchools = [...aiSchools].sort(() => Math.random() - 0.5).slice(0, 3);

    const updatedSchoolsMap = new Map<string, School>();
    schools.forEach((s) => updatedSchoolsMap.set(s.id, s));

    candidateSchools.forEach((school) => {
      if (availablePool.length === 0) return;

      // Escolhe uma função que a escola deseja reforçar
      const roles: ProfessionalRole[] = ['carnavalesco', 'interprete', 'mestreBateria', 'coreografo'];
      const targetRole = roles[Math.floor(Math.random() * roles.length)];

      const eligibleProfs = availablePool.filter(
        (p) => p.role === targetRole && (school.division === 'especial' ? p.rating >= 85 : p.rating >= 75)
      );

      if (eligibleProfs.length === 0) return;

      const chosenProf = eligibleProfs[Math.floor(Math.random() * eligibleProfs.length)];

      // Decide modo: solo ou formação de dupla
      let mode: 'solo' | 'dupla' = 'solo';
      if ((targetRole === 'interprete' || targetRole === 'carnavalesco' || targetRole === 'mestreBateria') && Math.random() > 0.65) {
        mode = 'dupla';
      }

      const result = this.hireProfessional(
        school,
        chosenProf,
        mode,
        currentYear,
        'maio',
        schools
      );

      updatedSchoolsMap.set(school.id, result.updatedSchool);
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
}
