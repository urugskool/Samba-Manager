export type DivisaoCarnaval = 'ESPECIAL' | 'OURO' | 'PRATA' | 'BRONZE' | 'AVALIACAO';

export interface ParametrosReceitaEspecial {
  arrecadacaoBilheteiraOficial: number;   // Ex: R$ 80.000.000 (ou R$ 60.000.000)
  arrecadacaoBilheteiraCampeas: number;   // Ex: R$ 28.800.000 (ou R$ 20.000.000)
}

export interface ExtratoFinanceiroEscola {
  escolaId: string;
  nomeEscola: string;
  divisao: DivisaoCarnaval;
  posicao: number;
  subvencaoPublica: number;
  cotaLiga: number;
  cotaTv: number;
  bilheteira: number;
  premiacaoClassificacao: number;
  bonusCampeasTv: number;
  bonusCampeasBilheteira: number;
  totalRecebido: number;
}

export interface RateioFundo800kLinha {
  posicao: number;
  peso: number;
  valor: number;
  percentual: number;
}

export class RepassesFinanceirosService {
  // 1. Tabela de Subvenção Pública (Governo + Prefeitura)
  public static readonly SUBVENCAO_PUBLICA: Record<DivisaoCarnaval, number> = {
    ESPECIAL: 4000000,
    OURO: 600000,
    PRATA: 200000,
    BRONZE: 80000,
    AVALIACAO: 0
  };

  // Constantes da Série Ouro
  public static readonly OURO_CONSTANTES = {
    COTA_LIGA: 500000,
    COTA_TV: 700000,
    SUBVENCAO: 600000,
    BASE_FIXA: 1800000,
    PREMIO_CAMPEA: 2000000,
    PREMIO_VICE: 900000,
    PREMIO_TERCEIRO: 700000,
    FUNDO_RESTANTE_4_EM_DIANTE: 800000
  };

  // Constantes da Série Prata
  public static readonly PRATA_CONSTANTES = {
    FUNDO_GLOBAL: 1500000,      // R$ 1,5 milhão dividido igualmente entre todas as escolas do Grupo
    COTA_TV_POR_ESCOLA: 80000, // R$ 80 mil fixos por escola pela cota de transmissão de TV
    PREMIO_CAMPEA: 300000,     // 1.º Lugar (Campeã): R$ 300.000
    PREMIO_VICE: 150000,       // 2.º Lugar (Vice-campeã): R$ 150.000
    PREMIO_TERCEIRO: 70000     // 3.º Lugar: R$ 70.000
  };

  // Constantes da Série Bronze
  public static readonly BRONZE_CONSTANTES = {
    REPASSE_FIXO: 80000,       // R$ 80 mil para cada escola participante
    PREMIO_CAMPEA: 90000,      // 1.º Lugar (Campeã): R$ 90.000
    PREMIO_VICE: 60000,        // 2.º Lugar (Vice-campeã): R$ 60.000
    PREMIO_TERCEIRO: 30000     // 3.º Lugar: R$ 30.000
  };

  // Constantes do Grupo de Avaliação
  public static readonly AVALIACAO_CONSTANTES = {
    REPASSE_FIXO: 0,           // Não há repasse de valores fixos (R$ 0)
    PREMIO_CAMPEA: 20000,      // 1.º Lugar (Campeã): R$ 20.000
    PREMIO_VICE: 12000,        // 2.º Lugar (Vice-campeã): R$ 12.000
    PREMIO_TERCEIRO: 6000      // 3.º Lugar: R$ 6.000
  };

  /**
   * Calcula a tabela teórica do rateio do fundo de R$ 800.000
   * para 16, 15, 14 ou qualquer número N de escolas na Série Ouro.
   */
  public static calcularTabelaRateioFundo800k(totalEscolas: number = 16): RateioFundo800kLinha[] {
    const FUNDO_RESTANTE = 800000;
    let somaPesos = 0;
    for (let pos = 4; pos <= totalEscolas; pos++) {
      somaPesos += (totalEscolas - pos + 1);
    }

    if (somaPesos <= 0) return [];

    const linhas: RateioFundo800kLinha[] = [];
    for (let pos = 4; pos <= totalEscolas; pos++) {
      const peso = totalEscolas - pos + 1;
      const valor = Math.round((FUNDO_RESTANTE * peso) / somaPesos);
      const percentual = Number(((peso / somaPesos) * 100).toFixed(2));
      linhas.push({
        posicao: pos,
        peso,
        valor,
        percentual
      });
    }

    return linhas;
  }

  /**
   * Calcula o repasse para escolas da Série Ouro
   * Piso Fixo: Cota Liga (500k) + TV (700k) + Subvenção (600k) = R$ 1.800.000
   * Premiação: 1º R$ 2M, 2º R$ 900k, 3º R$ 700k, 4º até última: rateio linear de R$ 800k
   */
  public static calcularRepassesSerieOuro(
    classificacaoFinal: { escolaId: string; nomeEscola: string; posicao: number }[]
  ): ExtratoFinanceiroEscola[] {
    const COTA_LIGA = 500000;
    const COTA_TV = 700000;
    const SUBVENCAO = this.SUBVENCAO_PUBLICA.OURO;
    const FUNDO_RESTANTE = 800000;

    const totalEscolas = classificacaoFinal.length;

    // Cálculo de pesos lineares decrescentes para o fundo de 800 mil
    // Peso para posição i (onde i vai de 4 até N): (N - i + 1)
    let somaPesos = 0;
    for (let pos = 4; pos <= totalEscolas; pos++) {
      somaPesos += (totalEscolas - pos + 1);
    }

    return classificacaoFinal.map((escola) => {
      let premiacao = 0;

      if (escola.posicao === 1) {
        premiacao = 2000000;
      } else if (escola.posicao === 2) {
        premiacao = 900000;
      } else if (escola.posicao === 3) {
        premiacao = 700000;
      } else if (escola.posicao >= 4 && somaPesos > 0) {
        const peso = totalEscolas - escola.posicao + 1;
        premiacao = Math.round((FUNDO_RESTANTE * peso) / somaPesos);
      }

      const total = SUBVENCAO + COTA_LIGA + COTA_TV + premiacao;

      return {
        escolaId: escola.escolaId,
        nomeEscola: escola.nomeEscola,
        divisao: 'OURO',
        posicao: escola.posicao,
        subvencaoPublica: SUBVENCAO,
        cotaLiga: COTA_LIGA,
        cotaTv: COTA_TV,
        bilheteira: 0,
        premiacaoClassificacao: premiacao,
        bonusCampeasTv: 0,
        bonusCampeasBilheteira: 0,
        totalRecebido: total
      };
    });
  }

  /**
   * Calcula o repasse para escolas do Grupo Especial
   */
  public static calcularRepassesGrupoEspecial(
    classificacaoFinal: { escolaId: string; nomeEscola: string; posicao: number }[],
    parametros?: ParametrosReceitaEspecial
  ): ExtratoFinanceiroEscola[] {
    const params = parametros || {
      arrecadacaoBilheteiraOficial: 80000000,
      arrecadacaoBilheteiraCampeas: 28800000
    };

    const COTA_PATROCINIO = 14000000;
    const COTA_TV_BASE = 3000000;
    const COTA_TV_CAMPEAS = 5000000;
    const SUBVENCAO = this.SUBVENCAO_PUBLICA.ESPECIAL;
    const TAXA_BILHETEIRA = 0.15;

    const DISTRIBUICAO_20M: Record<number, number> = {
      1: 4400000, 2: 3200000, 3: 2600000, 4: 2100000,
      5: 1800000, 6: 1500000, 7: 1200000, 8: 1000000,
      9: 800000,  10: 600000, 11: 500000, 12: 300000
    };

    const parcelaBilheteiraBase = Math.round(
      (params.arrecadacaoBilheteiraOficial * TAXA_BILHETEIRA) / (classificacaoFinal.length || 12)
    );
    const parcelaBilheteiraCampeas = Math.round(
      (params.arrecadacaoBilheteiraCampeas * TAXA_BILHETEIRA) / 6
    );

    return classificacaoFinal.map((escola) => {
      const eCampea = escola.posicao <= 6;
      const premiacao = DISTRIBUICAO_20M[escola.posicao] || 0;
      const bonusTv = eCampea ? COTA_TV_CAMPEAS : 0;
      const bonusBilheteira = eCampea ? parcelaBilheteiraCampeas : 0;

      const total =
        SUBVENCAO +
        COTA_PATROCINIO +
        COTA_TV_BASE +
        parcelaBilheteiraBase +
        premiacao +
        bonusTv +
        bonusBilheteira;

      return {
        escolaId: escola.escolaId,
        nomeEscola: escola.nomeEscola,
        divisao: 'ESPECIAL',
        posicao: escola.posicao,
        subvencaoPublica: SUBVENCAO,
        cotaLiga: COTA_PATROCINIO,
        cotaTv: COTA_TV_BASE,
        bilheteira: parcelaBilheteiraBase,
        premiacaoClassificacao: premiacao,
        bonusCampeasTv: bonusTv,
        bonusCampeasBilheteira: bonusBilheteira,
        totalRecebido: total
      };
    });
  }

  /**
   * Calcula o repasse para escolas da Série Prata
   * - R$ 1.500.000 divididos igualmente entre todas as escolas do Grupo
   * - R$ 80.000 fixos para cada escola pela cota de transmissão de TV
   * - Premiação para as 3 primeiras: 1º R$ 300.000, 2º R$ 150.000, 3º R$ 70.000
   */
  public static calcularRepassesSeriePrata(
    classificacaoFinal: { escolaId: string; nomeEscola: string; posicao: number }[]
  ): ExtratoFinanceiroEscola[] {
    const totalEscolas = Math.max(1, classificacaoFinal.length);
    const parcelaFundoGlobal = Math.round(this.PRATA_CONSTANTES.FUNDO_GLOBAL / totalEscolas);
    const cotaTv = this.PRATA_CONSTANTES.COTA_TV_POR_ESCOLA;

    return classificacaoFinal.map((escola) => {
      let premiacao = 0;
      if (escola.posicao === 1) {
        premiacao = this.PRATA_CONSTANTES.PREMIO_CAMPEA;
      } else if (escola.posicao === 2) {
        premiacao = this.PRATA_CONSTANTES.PREMIO_VICE;
      } else if (escola.posicao === 3) {
        premiacao = this.PRATA_CONSTANTES.PREMIO_TERCEIRO;
      }

      const total = parcelaFundoGlobal + cotaTv + premiacao;

      return {
        escolaId: escola.escolaId,
        nomeEscola: escola.nomeEscola,
        divisao: 'PRATA',
        posicao: escola.posicao,
        subvencaoPublica: 0,
        cotaLiga: parcelaFundoGlobal,
        cotaTv,
        bilheteira: 0,
        premiacaoClassificacao: premiacao,
        bonusCampeasTv: 0,
        bonusCampeasBilheteira: 0,
        totalRecebido: total
      };
    });
  }

  /**
   * Calcula o repasse para escolas da Série Bronze
   * - R$ 80.000 fixos para todas as escolas participantes
   * - Premiação para as 3 primeiras: 1º R$ 90.000, 2º R$ 60.000, 3º R$ 30.000
   */
  public static calcularRepassesSerieBronze(
    classificacaoFinal: { escolaId: string; nomeEscola: string; posicao: number }[]
  ): ExtratoFinanceiroEscola[] {
    const repasseFixo = this.BRONZE_CONSTANTES.REPASSE_FIXO;

    return classificacaoFinal.map((escola) => {
      let premiacao = 0;
      if (escola.posicao === 1) {
        premiacao = this.BRONZE_CONSTANTES.PREMIO_CAMPEA;
      } else if (escola.posicao === 2) {
        premiacao = this.BRONZE_CONSTANTES.PREMIO_VICE;
      } else if (escola.posicao === 3) {
        premiacao = this.BRONZE_CONSTANTES.PREMIO_TERCEIRO;
      }

      const total = repasseFixo + premiacao;

      return {
        escolaId: escola.escolaId,
        nomeEscola: escola.nomeEscola,
        divisao: 'BRONZE',
        posicao: escola.posicao,
        subvencaoPublica: repasseFixo,
        cotaLiga: 0,
        cotaTv: 0,
        bilheteira: 0,
        premiacaoClassificacao: premiacao,
        bonusCampeasTv: 0,
        bonusCampeasBilheteira: 0,
        totalRecebido: total
      };
    });
  }

  /**
   * Calcula o repasse para escolas do Grupo de Avaliação
   * - Sem repasse de valores fixos (R$ 0)
   * - Premiação para as 3 primeiras: 1º R$ 20.000, 2º R$ 12.000, 3º R$ 6.000
   */
  public static calcularRepassesGrupoAvaliacao(
    classificacaoFinal: { escolaId: string; nomeEscola: string; posicao: number }[]
  ): ExtratoFinanceiroEscola[] {
    return classificacaoFinal.map((escola) => {
      let premiacao = 0;
      if (escola.posicao === 1) {
        premiacao = this.AVALIACAO_CONSTANTES.PREMIO_CAMPEA;
      } else if (escola.posicao === 2) {
        premiacao = this.AVALIACAO_CONSTANTES.PREMIO_VICE;
      } else if (escola.posicao === 3) {
        premiacao = this.AVALIACAO_CONSTANTES.PREMIO_TERCEIRO;
      }

      return {
        escolaId: escola.escolaId,
        nomeEscola: escola.nomeEscola,
        divisao: 'AVALIACAO',
        posicao: escola.posicao,
        subvencaoPublica: 0,
        cotaLiga: 0,
        cotaTv: 0,
        bilheteira: 0,
        premiacaoClassificacao: premiacao,
        bonusCampeasTv: 0,
        bonusCampeasBilheteira: 0,
        totalRecebido: premiacao
      };
    });
  }

  /**
   * Repasse para as divisões de base (Prata, Bronze e Avaliação)
   */
  public static calcularRepassesDivisoesAcesso(
    divisao: 'PRATA' | 'BRONZE' | 'AVALIACAO',
    escolas: { escolaId: string; nomeEscola: string; posicao: number }[]
  ): ExtratoFinanceiroEscola[] {
    if (divisao === 'PRATA') {
      return this.calcularRepassesSeriePrata(escolas);
    }
    if (divisao === 'BRONZE') {
      return this.calcularRepassesSerieBronze(escolas);
    }
    return this.calcularRepassesGrupoAvaliacao(escolas);
  }

  /**
   * Encontra o extrato financeiro de uma escola
   */
  public static obterExtratoEscola(
    extratos: ExtratoFinanceiroEscola[],
    escolaIdOuNome: string
  ): ExtratoFinanceiroEscola | undefined {
    const term = escolaIdOuNome.toLowerCase();
    return extratos.find(
      (e) => e.escolaId.toLowerCase() === term || e.nomeEscola.toLowerCase() === term
    );
  }

  /**
   * Formata moeda brasileira R$ completo
   */
  public static formatCurrency(val: number): string {
    return `R$ ${val.toLocaleString('pt-BR')}`;
  }

  /**
   * Formata abreviado em Milhões ou Mil (Ex: R$ 3,8M / R$ 800k)
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
