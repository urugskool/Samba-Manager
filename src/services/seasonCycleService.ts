import { SeasonMonthId, SeasonPeriodConfig } from '../types/seasonCycle';
import { School } from '../types/carnaval';

export const SEASON_PERIODS: SeasonPeriodConfig[] = [
  {
    id: 'marco',
    monthIndex: 0,
    name: 'Março',
    shortName: 'MAR',
    activityTitle: 'Avaliação da temporada anterior',
    description: 'Análise minuciosa das justificativas dos jurados, balanço patrimonial, reunião com a diretoria executiva e definição das metas estratégicas da agremiação.',
    focusTab: 'dashboard',
    actionButtonLabel: 'Concluir Avaliação da Temporada',
    icon: 'ClipboardCheck',
    phaseCategory: 'planejamento'
  },
  {
    id: 'abril',
    monthIndex: 1,
    name: 'Abril',
    shortName: 'ABR',
    activityTitle: 'Planejamento financeiro',
    description: 'Elaboração do orçamento anual, projeção de cotas de subvenção da Liga (LIESA, LIGA-RJ ou Superliga), direitos de transmissão e captação de patrocínios.',
    focusTab: 'financas',
    actionButtonLabel: 'Aprovar Orçamento Financeiro',
    icon: 'Wallet',
    phaseCategory: 'planejamento'
  },
  {
    id: 'maio',
    monthIndex: 2,
    name: 'Maio',
    shortName: 'MAI',
    activityTitle: 'Contratação de profissionais',
    description: 'Janela oficial de transferências do Carnaval! Renovação e contratação de carnavalesco, mestre de bateria, 1º casal de MS e PB, intérprete, coreógrafo e diretor de harmonia.',
    focusTab: 'equipe',
    actionButtonLabel: 'Definir Equipe de Ponta',
    icon: 'Users',
    phaseCategory: 'preparacao'
  },
  {
    id: 'junho',
    monthIndex: 3,
    name: 'Junho',
    shortName: 'JUN',
    activityTitle: 'Escolha do enredo',
    description: 'Pesquisa histórica e cultural, lançamento oficial do tema de enredo da escola, aprovação da sinopse e distribuição da carta de enredo aos poetas e compositores.',
    focusTab: 'barracao',
    actionButtonLabel: 'Lançar Enredo Oficial',
    icon: 'BookOpen',
    phaseCategory: 'preparacao'
  },
  {
    id: 'julho',
    monthIndex: 4,
    name: 'Julho',
    shortName: 'JUL',
    activityTitle: 'Desenvolvimento artístico e Sorteio da Ordem de Desfiles',
    description: 'Início da concepção visual dos figurinos e maquetes de alegorias no barracão, além da realização dos Sorteios Oficiais da Ordem de Desfile (LIESA na Cidade do Samba, LIGA-RJ e Superliga na ordem regulamentar).',
    focusTab: 'sorteio',
    actionButtonLabel: 'Realizar Sorteio da Ordem & Croquis',
    icon: 'Dices',
    phaseCategory: 'preparacao'
  },
  {
    id: 'agosto',
    monthIndex: 5,
    name: 'Agosto',
    shortName: 'AGO',
    activityTitle: 'Eliminatórias para escolha do Samba Enredo',
    description: 'Disputas eletrizantes na quadra da escola! Apresentação das parcerias concorrentes, cortes semanais de sambas e a apoteótica final para consagrar o hino oficial.',
    focusTab: 'ensaios',
    actionButtonLabel: 'Eleger Samba Enredo Campeão',
    icon: 'Music',
    phaseCategory: 'preparacao'
  },
  {
    id: 'setembro',
    monthIndex: 6,
    name: 'Setembro',
    shortName: 'SET',
    activityTitle: 'Início dos ensaios',
    description: 'Abertura oficial dos ensaios de quadra! O canto da comunidade ecoa, os ritmistas alinham o andamento dos tamborins e o primeiro casal aprimora o bailado do pavilhão.',
    focusTab: 'ensaios',
    actionButtonLabel: 'Abrir Ensaios de Quadra',
    icon: 'Flame',
    phaseCategory: 'ensaio'
  },
  {
    id: 'outubro',
    monthIndex: 7,
    name: 'Outubro',
    shortName: 'OUT',
    activityTitle: 'Produção das alegorias e fantasias',
    description: 'Pico febril de trabalho nos barracões! Serralheria pesada, esculturas em isopor e fibra, confecção de chapéus, adereços e costura das fantasias de todas as alas.',
    focusTab: 'barracao',
    actionButtonLabel: 'Acelerar Produção no Barracão',
    icon: 'Hammer',
    phaseCategory: 'preparacao'
  },
  {
    id: 'novembro',
    monthIndex: 8,
    name: 'Novembro',
    shortName: 'NOV',
    activityTitle: 'Ensaios de rua',
    description: 'A agremiação desce para a avenida da comunidade! Teste real de evolução das alas compactadas, harmonia sob marcha e simulação de velocidade de desfile.',
    focusTab: 'ensaios',
    actionButtonLabel: 'Realizar Ensaios de Rua',
    icon: 'Navigation',
    phaseCategory: 'ensaio'
  },
  {
    id: 'dezembro',
    monthIndex: 9,
    name: 'Dezembro',
    shortName: 'DEZ',
    activityTitle: 'Finalização do projeto',
    description: 'Vistorias técnicas dos engenheiros e corpo de bombeiros, acabamentos de iluminação cênica nos carros alegóricos, prova geral de protótipos e entrega dos figurinos.',
    focusTab: 'barracao',
    actionButtonLabel: 'Concluir Obras do Barracão',
    icon: 'CheckCircle2',
    phaseCategory: 'preparacao'
  },
  {
    id: 'janeiro',
    monthIndex: 10,
    name: 'Janeiro',
    shortName: 'JAN',
    activityTitle: 'Ensaios Técnicos',
    description: 'O grande Ensaio Técnico Geral na passarela oficial (Marquês de Sapucaí / Intendente Magalhães)! Cronometragem oficial de pista, teste acústico da bateria e impacto da comissão de frente.',
    focusTab: 'ensaios',
    actionButtonLabel: 'Comandar Ensaio Técnico Oficial',
    icon: 'Sparkles',
    phaseCategory: 'ensaio'
  },
  {
    id: 'fevereiro',
    monthIndex: 11,
    name: 'Fevereiro',
    shortName: 'FEV',
    activityTitle: 'Desfile, apuração e Desfile das Campeãs',
    description: 'O ápice da festa e consagração máxima! Dias de desfiles oficiais na passarela do samba, a apuração das notas com leitura dos 36 envelopes e a apoteose no Sábado das Campeãs.',
    focusTab: 'desfile',
    actionButtonLabel: 'Ir para a Avenida & Apuração',
    icon: 'Crown',
    phaseCategory: 'execucao'
  }
];

export class SeasonCycleService {
  /**
   * Retorna a configuração de um determinado mês
   */
  public static getPeriod(monthId: SeasonMonthId): SeasonPeriodConfig {
    const found = SEASON_PERIODS.find((p) => p.id === monthId);
    return found || SEASON_PERIODS[0];
  }

  /**
   * Retorna o próximo mês na linha do tempo da temporada
   */
  public static getNextMonth(currentMonthId: SeasonMonthId): SeasonMonthId | null {
    const idx = SEASON_PERIODS.findIndex((p) => p.id === currentMonthId);
    if (idx >= 0 && idx < SEASON_PERIODS.length - 1) {
      return SEASON_PERIODS[idx + 1].id;
    }
    return null; // Fevereiro é o último mês antes do encerramento da temporada
  }

  /**
   * Retorna a lista de meses até o mês atual
   */
  public static getCompletedMonthsUpTo(currentMonthId: SeasonMonthId): SeasonMonthId[] {
    const idx = SEASON_PERIODS.findIndex((p) => p.id === currentMonthId);
    if (idx < 0) return [];
    return SEASON_PERIODS.slice(0, idx).map((p) => p.id);
  }

  /**
   * Valida se uma determinada aba/atividade está desbloqueada de acordo com o mês atual do ciclo
   */
  public static isTabUnlockedForMonth(tab: string, currentMonthId: SeasonMonthId): {
    unlocked: boolean;
    availableFromMonth: SeasonMonthId;
    availableFromMonthName: string;
    reason: string;
  } {
    const currentIdx = SEASON_PERIODS.findIndex((p) => p.id === currentMonthId);
    const currentPeriod = SeasonCycleService.getPeriod(currentMonthId);

    // Desfiles, Apuração e Desfile das Campeãs só acontecem em Fevereiro (Mês 11)
    if (tab === 'desfile' || tab === 'apuracao' || tab === 'campeas') {
      if (currentMonthId !== 'fevereiro') {
        const tabName = tab === 'desfile' ? 'Os Desfiles' : tab === 'apuracao' ? 'A Apuração das Notas' : 'O Desfile das Campeãs';
        return {
          unlocked: false,
          availableFromMonth: 'fevereiro',
          availableFromMonthName: 'Fevereiro',
          reason: `${tabName} ocorrem exclusivamente em Fevereiro (mês do Carnaval)! Você está atualmente em ${currentPeriod.name} (${currentPeriod.activityTitle}). Avance o ciclo mês a mês cumprindo as etapas da temporada para chegar aos desfiles.`
        };
      }
    }

    // Sorteio da Ordem de Desfiles é realizado em Julho (Mês 4)
    if (tab === 'sorteio') {
      if (currentIdx < 4) {
        return {
          unlocked: false,
          availableFromMonth: 'julho',
          availableFromMonthName: 'Julho',
          reason: `O Sorteio Oficial da Ordem de Desfile (LIESA, LIGA-RJ e Superliga) é realizado no mês de Julho! Você está atualmente em ${currentPeriod.name} (${currentPeriod.activityTitle}). Avance o ciclo mês a mês até Julho.`
        };
      }
    }

    return {
      unlocked: true,
      availableFromMonth: currentMonthId,
      availableFromMonthName: currentPeriod.name,
      reason: ''
    };
  }

  /**
   * Aplica o progresso mensal simulado na escola do jogador
   */
  public static simulateMonthProgress(
    school: School,
    monthId: SeasonMonthId
  ): {
    updatedSchool: School;
    summaryTitle: string;
    summaryDescription: string;
    budgetDelta: number;
    moraleDelta: number;
    barracaoDelta: number;
    rehearsalDelta: number;
  } {
    let budgetDelta = 0;
    let moraleDelta = 0;
    let barracaoDelta = 0;
    let rehearsalDelta = 0;
    let summaryTitle = '';
    let summaryDescription = '';

    switch (monthId) {
      case 'marco':
        moraleDelta = 3;
        summaryTitle = 'Avaliação da Temporada Concluída!';
        summaryDescription = `A diretoria da ${school.name} reuniu seus conselheiros e departamentos. As falhas do carnaval anterior foram mapeadas e o plano diretor da temporada foi homologado com apoio da comunidade.`;
        break;

      case 'abril':
        // Subvenção e patrocínios aportados no caixa
        budgetDelta =
          school.division === 'especial'
            ? 500000
            : school.division === 'ouro'
            ? 250000
            : school.division === 'prata'
            ? 120000
            : school.division === 'bronze'
            ? 80000
            : 50000;
        moraleDelta = 2;
        summaryTitle = 'Planejamento Financeiro Aprovado!';
        summaryDescription = `Orçamento selado! As cotas de subvenção da liga e os adiantamentos de patrocinadores injetaram R$ ${budgetDelta.toLocaleString('pt-BR')} no caixa da agremiação.`;
        break;

      case 'maio':
        moraleDelta = 4;
        summaryTitle = 'Contratações e Renovações Homologadas!';
        summaryDescription = `O mercado do Carnaval esteve movimentado. A equipe de carnavalesco, ritmistas e casais de mestre-sala e porta-bandeira confirmaram total lealdade ao projeto do Carnaval.`;
        break;

      case 'junho':
        moraleDelta = 3;
        barracaoDelta = 8;
        summaryTitle = 'Enredo Oficial Lançado com Louvor!';
        summaryDescription = `A sinopse do enredo foi entregue com aclamação popular. Os primeiros croquis de figurinos começaram a ser delineados e a quadra ferveu de orgulho cultural.`;
        break;

      case 'julho':
        moraleDelta = 3;
        barracaoDelta = 12;
        summaryTitle = 'Sorteio Oficial e Concepção Artística!';
        summaryDescription = `A ordem de desfiles foi sorteada e a Cidade do Samba viveu um grande espetáculo. No barracão, as maquetes dos carros foram validadas pelo corpo diretivo.`;
        break;

      case 'agosto':
        moraleDelta = 5;
        rehearsalDelta = 10;
        summaryTitle = 'Samba Enredo Campeão Consagrado!';
        summaryDescription = `Após noites de eliminatórias ferrenhas, a parceria vencedora foi ovacionada pela comunidade. O samba-enredo promete contagiar a avenida!`;
        break;

      case 'setembro':
        rehearsalDelta = 15;
        moraleDelta = 3;
        summaryTitle = 'Ensaios de Quadra a Pleno Vapor!';
        summaryDescription = `Quadra lotada e canto uníssono! A bateria acertou as primeiras paradinhas e o primeiro casal bailou com graça e sincronia invejáveis.`;
        break;

      case 'outubro':
        barracaoDelta = 25;
        moraleDelta = 2;
        summaryTitle = 'Pico de Produção no Barracão!';
        summaryDescription = `Serralheiros, escultores e costureiras trabalharam dia e noite. As armações de ferro ganharam formas majestosas e as alas começaram a ser adereçadas.`;
        break;

      case 'novembro':
        rehearsalDelta = 20;
        moraleDelta = 3;
        summaryTitle = 'Ensaios de Rua Inesquecíveis!';
        summaryDescription = `A escola tomou a avenida da comunidade! O treino de marcha, compasso e evolução garantiu que as alas mantenham densidade sem abrir buracos.`;
        break;

      case 'dezembro':
        barracaoDelta = 20;
        moraleDelta = 4;
        summaryTitle = 'Projeto Artístico Finalizado!';
        summaryDescription = `Alvarás aprovados, iluminação cênica testada e figurinos ensacados para distribuição. O barracão atingiu excelência operacional para o desfile!`;
        break;

      case 'janeiro':
        rehearsalDelta = 15;
        moraleDelta = 5;
        summaryTitle = 'Consagração no Ensaio Técnico Geral!';
        summaryDescription = `A escola pisou forte na passarela oficial! Cronômetro fechado no tempo ideal, bateria dando espetáculo e comunidade cantando o samba de cor.`;
        break;

      case 'fevereiro':
        summaryTitle = 'Carnaval na Pista: Desfile e Apuração!';
        summaryDescription = `Chegou o grande momento! A passarela da Sapucaí e da Intendente Magalhães aguardam o espetáculo oficial, as notas dos 36 jurados e o Sábado das Campeãs!`;
        break;
    }

    const updatedSchool: School = {
      ...school,
      budget: Math.max(0, school.budget + budgetDelta),
      fanBaseMorale: Math.min(100, Math.max(40, school.fanBaseMorale + moraleDelta)),
      barracaoProgress: Math.min(100, (school.barracaoProgress || 50) + barracaoDelta),
      rehearsalLevel: Math.min(100, (school.rehearsalLevel || 50) + rehearsalDelta),
      technicalParadeDone: monthId === 'janeiro' ? true : school.technicalParadeDone
    };

    return {
      updatedSchool,
      summaryTitle,
      summaryDescription,
      budgetDelta,
      moraleDelta,
      barracaoDelta,
      rehearsalDelta
    };
  }
}
