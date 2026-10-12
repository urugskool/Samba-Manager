import { School } from '../types/carnaval';

export interface ClassificationPrizeConfig {
  rank: number;
  label: string;
  percentage: number; // e.g. 22.0
  amount: number; // e.g. 4_400_000
}

export const CLASSIFICATION_PRIZE_TABLE: ClassificationPrizeConfig[] = [
  { rank: 1, label: '1.º Lugar (Campeã)', percentage: 22.0, amount: 4_400_000 },
  { rank: 2, label: '2.º Lugar (Vice-campeã)', percentage: 16.0, amount: 3_200_000 },
  { rank: 3, label: '3.º Lugar', percentage: 13.0, amount: 2_600_000 },
  { rank: 4, label: '4.º Lugar', percentage: 10.5, amount: 2_100_000 },
  { rank: 5, label: '5.º Lugar', percentage: 9.0, amount: 1_800_000 },
  { rank: 6, label: '6.º Lugar', percentage: 7.5, amount: 1_500_000 },
  { rank: 7, label: '7.º Lugar', percentage: 6.0, amount: 1_200_000 },
  { rank: 8, label: '8.º Lugar', percentage: 5.0, amount: 1_000_000 },
  { rank: 9, label: '9.º Lugar', percentage: 4.0, amount: 800_000 },
  { rank: 10, label: '10.º Lugar', percentage: 3.0, amount: 600_000 },
  { rank: 11, label: '11.º Lugar', percentage: 2.5, amount: 500_000 },
  { rank: 12, label: '12.º Lugar', percentage: 1.5, amount: 300_000 }
];

export const LIGA_FINANCIAL_CONSTANTS = {
  // Cota Fixa de Patrocinadores da LIGA
  SPONSOR_FIXED_PER_SCHOOL: 14_000_000,
  TOTAL_SPONSORS_12_SCHOOLS: 168_000_000,

  // Direitos de Transmissão de TV (Temporada Regular)
  TV_REGULAR_PER_SCHOOL: 3_000_000,
  TOTAL_TV_REGULAR_12_SCHOOLS: 36_000_000,

  // Fundo Geral de Bilheteria (Desfile Oficial - Marquês de Sapucaí)
  // Arrecadação total estimada: R$ 80.000.000 (144.000 ingressos pagantes nas noites oficiais)
  OFFICIAL_PARADE_TICKETS_TOTAL: 144_000,
  OFFICIAL_PARADE_TICKET_REVENUE: 80_000_000,
  OFFICIAL_PARADE_POOL_PERCENT: 15.0, // 15%
  OFFICIAL_PARADE_POOL_TOTAL: 12_000_000, // 15% de R$ 80M
  OFFICIAL_PARADE_SHARE_PER_SCHOOL: 1_000_000, // R$ 12M ÷ 12 escolas

  // Fundo de Classificação (R$ 20.000.000 pela apuração final)
  CLASSIFICATION_TOTAL_FUND: 20_000_000,

  // Bônus do Desfile das Campeãs (Top 6 / G6)
  CAMPEAS_TV_BONUS_PER_SCHOOL: 5_000_000,
  TOTAL_CAMPEAS_TV_BONUS: 30_000_000, // 6 × R$ 5M

  // Bilheteria do Sábado das Campeãs (72.000 ingressos / R$ 28.800.000 arrecadação)
  CAMPEAS_PARADE_TICKETS_TOTAL: 72_000,
  CAMPEAS_PARADE_TICKET_REVENUE: 28_800_000,
  CAMPEAS_PARADE_POOL_PERCENT: 15.0, // 15%
  CAMPEAS_PARADE_POOL_TOTAL: 4_320_000, // 15% de R$ 28.8M
  CAMPEAS_PARADE_SHARE_PER_SCHOOL: 720_000, // R$ 4.320.000 ÷ 6 escolas

  // Total Geral Distribuído pela LIGA no Grupo Especial
  // 168M (Patrocínios) + 36M (TV) + 12M (Bilheteria Oficial) + 20M (Classificação) + 30M (TV Campeãs) + 4.32M (Bilheteria Campeãs)
  GRAND_TOTAL_DISBURSED: 270_320_000
};

export interface SchoolLigaPayout {
  rank: number;
  schoolId: string;
  schoolName: string;
  shortName?: string;
  badge?: string;
  primaryColor?: string;
  secondaryColor?: string;
  totalScore?: number;
  sponsorFixed: number; // R$ 14.000.000
  tvRegular: number; // R$ 3.000.000
  generalTicketShare: number; // R$ 1.000.000 (15% da bilheteria oficial ÷ 12)
  classificationPrize: number; // De R$ 4.4M a R$ 300k
  classificationPercentage: number; // De 22% a 1.5%
  isTop6: boolean;
  campeasTvBonus: number; // R$ 5.000.000 se Top 6, 0 caso contrário
  campeasTicketShare: number; // R$ 720.000 se Top 6, 0 caso contrário
  totalBonusCampeas: number; // campeasTvBonus + campeasTicketShare
  totalPayout: number;
  statusLabel: string;
}

export interface LigaSeasonFinancialReport {
  year: number;
  isProjected: boolean; // Se ainda não ocorreu a apuração da temporada atual
  sourceSeasonTitle: string;
  officialTicketTotalRevenue: number;
  officialTicketPool15: number;
  officialTicketSharePerSchool: number;
  campeasTicketTotalRevenue: number;
  campeasTicketPool15: number;
  campeasTicketSharePerSchool: number;
  totalSponsorsDisbursed: number;
  totalTvRegularDisbursed: number;
  totalClassificationDisbursed: number;
  totalCampeasTvDisbursed: number;
  totalCampeasTicketDisbursed: number;
  grandTotalDisbursed: number;
  payouts: SchoolLigaPayout[];
}

export class LigaFinancialService {
  /**
   * Obtém a cota de classificação para uma determinada colocação (1 a 12).
   */
  public static getClassificationPrizeConfig(rank: number): ClassificationPrizeConfig {
    const clampedRank = Math.max(1, Math.min(12, rank));
    return (
      CLASSIFICATION_PRIZE_TABLE.find((c) => c.rank === clampedRank) || {
        rank: clampedRank,
        label: `${clampedRank}.º Lugar`,
        percentage: 0,
        amount: 0
      }
    );
  }

  /**
   * Calcula o relatório financeiro completo de repasses da LIGA para os 12 integrantes do Grupo Especial.
   */
  public static calculateSeasonFinancials(
    year: number,
    standings?: Array<{ rank: number; schoolName: string; schoolId?: string; totalScore?: number }>,
    allSchools?: School[],
    isProjected: boolean = false
  ): LigaSeasonFinancialReport {
    const schoolsMap = new Map<string, School>();
    if (allSchools) {
      allSchools.forEach((s) => {
        schoolsMap.set(s.id, s);
        schoolsMap.set(s.name.toLowerCase(), s);
        schoolsMap.set(s.shortName.toLowerCase(), s);
      });
    }

    // Se temos standings fornecidos, usamos. Caso contrário, pegamos as 12 escolas do Grupo Especial ativas.
    let list: Array<{ rank: number; schoolName: string; schoolId: string; totalScore?: number }> = [];

    if (standings && standings.length > 0) {
      list = standings.slice(0, 12).map((item, idx) => {
        const rank = item.rank || idx + 1;
        const matchedSchool =
          (item.schoolId ? schoolsMap.get(item.schoolId) : undefined) ||
          schoolsMap.get(item.schoolName.toLowerCase()) ||
          allSchools?.find((s) => s.name.toLowerCase() === item.schoolName.toLowerCase());

        return {
          rank,
          schoolId: matchedSchool?.id || item.schoolId || `school_${rank}`,
          schoolName: matchedSchool?.name || item.schoolName,
          totalScore: item.totalScore
        };
      });
    } else if (allSchools) {
      const especialSchools = allSchools
        .filter((s) => s.division === 'especial' && !s.isInactive && !s.inactive)
        .slice(0, 12);

      list = especialSchools.map((s, idx) => ({
        rank: idx + 1,
        schoolId: s.id,
        schoolName: s.name,
        totalScore: 270.0 - idx * 0.2
      }));
    }

    // Se a lista tiver menos de 12 agremiações (ex: mock inicial), preenche até 12
    while (list.length < 12) {
      const nextRank = list.length + 1;
      list.push({
        rank: nextRank,
        schoolId: `especial_escola_${nextRank}`,
        schoolName: `Escola do Grupo Especial ${nextRank}`,
        totalScore: 268.0 - nextRank * 0.1
      });
    }

    // Calcula os repasses linha por linha
    const payouts: SchoolLigaPayout[] = list.map((item) => {
      const rank = item.rank;
      const classifConfig = this.getClassificationPrizeConfig(rank);
      const isTop6 = rank <= 6;

      const sponsorFixed = LIGA_FINANCIAL_CONSTANTS.SPONSOR_FIXED_PER_SCHOOL;
      const tvRegular = LIGA_FINANCIAL_CONSTANTS.TV_REGULAR_PER_SCHOOL;
      const generalTicketShare = LIGA_FINANCIAL_CONSTANTS.OFFICIAL_PARADE_SHARE_PER_SCHOOL;
      const classificationPrize = classifConfig.amount;
      const classificationPercentage = classifConfig.percentage;

      const campeasTvBonus = isTop6 ? LIGA_FINANCIAL_CONSTANTS.CAMPEAS_TV_BONUS_PER_SCHOOL : 0;
      const campeasTicketShare = isTop6 ? LIGA_FINANCIAL_CONSTANTS.CAMPEAS_PARADE_SHARE_PER_SCHOOL : 0;
      const totalBonusCampeas = campeasTvBonus + campeasTicketShare;

      const totalPayout =
        sponsorFixed +
        tvRegular +
        generalTicketShare +
        classificationPrize +
        campeasTvBonus +
        campeasTicketShare;

      const matched = schoolsMap.get(item.schoolId) || schoolsMap.get(item.schoolName.toLowerCase());

      let statusLabel = 'Manutenção na Elite';
      if (rank === 1) statusLabel = 'Campeã do Carnaval';
      else if (rank === 2) statusLabel = 'Vice-Campeã (Desfile das Campeãs)';
      else if (rank <= 6) statusLabel = 'Desfile das Campeãs (G6)';
      else if (rank === 12) statusLabel = 'Rebaixada para a Série Ouro';

      return {
        rank,
        schoolId: item.schoolId,
        schoolName: item.schoolName,
        shortName: matched?.shortName || item.schoolName,
        primaryColor: matched?.colors?.primary || '#1e3a8a',
        secondaryColor: matched?.colors?.secondary || '#ffffff',
        totalScore: item.totalScore,
        sponsorFixed,
        tvRegular,
        generalTicketShare,
        classificationPrize,
        classificationPercentage,
        isTop6,
        campeasTvBonus,
        campeasTicketShare,
        totalBonusCampeas,
        totalPayout,
        statusLabel
      };
    });

    return {
      year,
      isProjected,
      sourceSeasonTitle: isProjected
        ? `Projeção Oficial de Repasses • Temporada ${year}`
        : `Demonstrativo Contábil Homologado • Carnaval ${year}`,
      officialTicketTotalRevenue: LIGA_FINANCIAL_CONSTANTS.OFFICIAL_PARADE_TICKET_REVENUE,
      officialTicketPool15: LIGA_FINANCIAL_CONSTANTS.OFFICIAL_PARADE_POOL_TOTAL,
      officialTicketSharePerSchool: LIGA_FINANCIAL_CONSTANTS.OFFICIAL_PARADE_SHARE_PER_SCHOOL,
      campeasTicketTotalRevenue: LIGA_FINANCIAL_CONSTANTS.CAMPEAS_PARADE_TICKET_REVENUE,
      campeasTicketPool15: LIGA_FINANCIAL_CONSTANTS.CAMPEAS_PARADE_POOL_TOTAL,
      campeasTicketSharePerSchool: LIGA_FINANCIAL_CONSTANTS.CAMPEAS_PARADE_SHARE_PER_SCHOOL,
      totalSponsorsDisbursed: LIGA_FINANCIAL_CONSTANTS.TOTAL_SPONSORS_12_SCHOOLS,
      totalTvRegularDisbursed: LIGA_FINANCIAL_CONSTANTS.TOTAL_TV_REGULAR_12_SCHOOLS,
      totalClassificationDisbursed: LIGA_FINANCIAL_CONSTANTS.CLASSIFICATION_TOTAL_FUND,
      totalCampeasTvDisbursed: LIGA_FINANCIAL_CONSTANTS.TOTAL_CAMPEAS_TV_BONUS,
      totalCampeasTicketDisbursed: LIGA_FINANCIAL_CONSTANTS.CAMPEAS_PARADE_POOL_TOTAL,
      grandTotalDisbursed: LIGA_FINANCIAL_CONSTANTS.GRAND_TOTAL_DISBURSED,
      payouts
    };
  }

  /**
   * Obtém o repasse individual de uma escola a partir de um relatório da liga.
   */
  public static getSchoolPayout(
    report: LigaSeasonFinancialReport,
    schoolIdOrName: string
  ): SchoolLigaPayout | undefined {
    const term = schoolIdOrName.toLowerCase();
    return report.payouts.find(
      (p) => p.schoolId.toLowerCase() === term || p.schoolName.toLowerCase() === term
    );
  }

  /**
   * Formata moeda brasileira R$ completo
   */
  public static formatCurrency(val: number): string {
    return `R$ ${val.toLocaleString('pt-BR')}`;
  }

  /**
   * Formata abreviado em Milhões ou Mil (Ex: R$ 14,0M / R$ 800k)
   */
  public static formatCompact(val: number): string {
    if (val >= 1_000_000) {
      const millions = val / 1_000_000;
      return `R$ ${millions.toFixed(millions % 1 === 0 ? 0 : 1).replace('.', ',')}M`;
    }
    if (val >= 1_000) {
      return `R$ ${Math.round(val / 1000)}k`;
    }
    return `R$ ${val.toLocaleString('pt-BR')}`;
  }
}
