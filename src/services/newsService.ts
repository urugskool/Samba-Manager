import { NewsArticle, NewsCategory, NewsComment, NewsExportFormat, NewsPortal } from '../types/news';
import { School } from '../types/carnaval';
import { SeasonMonthId } from '../types/seasonCycle';
import { TransferEvent } from '../types/professionals';
import { cleanSchoolName } from '../utils/schoolNameUtils';

export class NewsService {
  private static STORAGE_KEY = 'samba_manager_folia_news_v1';

  /**
   * Converte uma notícia para o formato JSON estrito requisitado pelo sistema
   */
  public static exportArticleAsJson(article: NewsArticle): NewsExportFormat {
    return {
      noticia: {
        portal: article.portal,
        dataTemporada: article.dataTemporada,
        manchete: article.manchete,
        subtitulo: article.subtitulo,
        corpo: article.corpo,
        categoria: article.categoria,
        escolaEnvolvida: article.escolaEnvolvida,
        impactoMoral: article.impactoMoral,
        comentarios: article.comentarios
      }
    };
  }

  /**
   * Carrega notícias armazenadas ou inicializa com notícias base
   */
  public static loadNews(currentYear: number, schools: School[]): NewsArticle[] {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem(`${this.STORAGE_KEY}_${currentYear}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Garante IDs estritamente únicos mesmo se o storage possuir duplicidades legadas
            const seenIds = new Set<string>();
            const sanitized: NewsArticle[] = [];
            parsed.forEach((art, idx) => {
              let uniqueId = art.id;
              if (!uniqueId || seenIds.has(uniqueId)) {
                uniqueId = `${art.id || 'news'}_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`;
              }
              seenIds.add(uniqueId);
              sanitized.push({ ...art, id: uniqueId });
            });
            return sanitized;
          }
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar notícias do storage:', e);
    }

    const initial = this.generateInitialNewsCatalog(currentYear, schools);
    this.saveNews(currentYear, initial);
    return initial;
  }

  public static saveNews(currentYear: number, newsList: NewsArticle[]): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        // Deduplica por ID antes de salvar
        const seenIds = new Set<string>();
        const deduped: NewsArticle[] = [];
        newsList.forEach((art, idx) => {
          let uniqueId = art.id;
          if (!uniqueId || seenIds.has(uniqueId)) {
            uniqueId = `${art.id || 'news'}_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`;
          }
          seenIds.add(uniqueId);
          deduped.push({ ...art, id: uniqueId });
        });
        window.localStorage.setItem(`${this.STORAGE_KEY}_${currentYear}`, JSON.stringify(deduped));
      }
    } catch (e) {
      console.warn('Erro ao salvar notícias no storage:', e);
    }
  }

  /**
   * Gera notícia bombástica no Mercado da Folia quando ocorre uma contratação
   */
  public static generateTransferNewsArticle(
    transfer: TransferEvent,
    schools: School[]
  ): NewsArticle {
    const school = schools.find((s) => s.id === transfer.newSchoolId);
    const schoolName = school ? cleanSchoolName(school) : transfer.newSchoolName;
    const prevSchool = transfer.previousSchoolName || 'agremiação rival';

    const isDupla = transfer.mode === 'dupla';
    const isSeparacao = transfer.mode === 'separacao_dupla';

    let portal: NewsPortal = 'Portal SRzd / Carnavalesco';
    let manchete = '';
    let subtitulo = '';
    let corpo = '';
    let impactoMoral = 6;

    if (transfer.role === 'carnavalesco') {
      if (isSeparacao) {
        portal = 'Resenha dos Sambistas';
        manchete = `Fim da parceria! ${transfer.professionalName} rompe dupla e aposta em projeto solo milionário na ${schoolName}`;
        subtitulo = `Após temporadas vitoriosas em conjunto, artista assume sozinho o barracão com promessa de autonomia estética total.`;
        corpo = `O mercado do Carnaval Carioca foi sacudido com a confirmação de que ${transfer.professionalName} decidiu trilhar voo solo e assinou com a ${schoolName}. A negociação, mantida em sigilo absoluto até a última assinatura, garante ao profissional um dos maiores orçamentos de barracão da Cidade do Samba. Nos bastidores da antiga escola, a notícia causou espanto, mas a diretoria da ${schoolName} comemora a chegada de uma mente criativa pronta para remodelar a identidade visual da agremiação para a disputa do próximo campeonato.`;
        impactoMoral = 7;
      } else {
        portal = 'Portal SRzd / Carnavalesco';
        manchete = `Bomba no Sambódromo: ${schoolName} contrata carnavalesco renomado ${transfer.professionalName}`;
        subtitulo = `Movimentação audaciosa garante artista consagrado com carta branca para criação do enredo e barracão de luxo.`;
        corpo = `A ${schoolName} deu a resposta que a sua comunidade tanto cobrava ao anunciar a contratação de ${transfer.professionalName} para comandar o projeto do Carnaval. A diretoria desembolsou luvas generosas de R$ ${transfer.valueBonus.toLocaleString('pt-BR')} para vencer a concorrência de outras agremiações e fechar com o artista. O carnavalesco já solicitou reuniões com a comissão de frente e a direção de harmonia para integrar os primeiros conceitos do espetáculo.`;
        impactoMoral = 8;
      }
    } else if (transfer.role === 'interprete') {
      if (isDupla) {
        portal = 'G1 Carnaval';
        manchete = `Super Dupla no Carro de Som: ${schoolName} une ${transfer.professionalName} e ${transfer.partnerName || 'parceiro de peso'} no microfone`;
        subtitulo = `Agremiação aposta em potência vocal compartilhada para garantir nota máxima em Samba-Enredo e Harmonia.`;
        corpo = `Em uma cartada histórica para o carro de som da Marquês de Sapucaí, a ${schoolName} anunciou a formação de uma parceria de peso no microfone oficial. A união entre ${transfer.professionalName} e ${transfer.partnerName || 'novo parceiro'} promete combinar potência nos agudos com condução melódica precisa. A diretoria aposta que a alternância de vozes dará fôlego extra aos 70 minutos de desfile na passarela.`;
        impactoMoral = 8;
      } else if (isSeparacao) {
        portal = 'Portal SRzd / Carnavalesco';
        manchete = `Voo solo no microfone: ${transfer.professionalName} deixa parceria e assume como voz principal da ${schoolName}`;
        subtitulo = `Cantor assume a responsabilidade única de conduzir o hino da escola após encerrar ciclo em dupla.`;
        corpo = `A dança das cadeiras dos cantores do samba fez mais uma vítima na Sapucaí. ${transfer.professionalName} encerrou sua fase cantando em dupla e foi apresentado na quadra da ${schoolName} como o único dono do microfone número 1. Com salário anual estimado em R$ ${transfer.valueSalary.toLocaleString('pt-BR')}, o artista prometeu levar o canto da comunidade ao patamar mais alto da avenida.`;
        impactoMoral = 7;
      } else {
        portal = 'Voz do Terreiro';
        manchete = `Grito de guerra afinado: ${transfer.professionalName} é a nova voz da ${schoolName}`;
        subtitulo = `Comunidade abraça chegada do intérprete que promete incendiar os ensaios de quadra e a Sapucaí.`;
        corpo = `A quadra da ${schoolName} veio abaixo com o anúncio oficial de ${transfer.professionalName} no comando do carro de som. O intérprete, que coleciona atuações memoráveis na avenida, agradeceu a confiança dos segmentos da escola e garantiu que o hino oficial será defendido com a garra de quem conhece a raiz do morro.`;
        impactoMoral = 8;
      }
    } else if (transfer.role === 'mestreBateria') {
      portal = 'Resenha dos Sambistas';
      manchete = `Trovão na Sapucaí: ${transfer.professionalName} assume o comando da bateria da ${schoolName}`;
      subtitulo = `Mestre traz novas bossas e afinação arrojada para buscar as notas máximas do júri oficial.`;
      corpo = `A ${schoolName} mudou o comando dos seus ritmistas ao trazer ${transfer.professionalName}. Com bagagem pesada e passagens consagradas em grandes escolas, o mestre chega prometendo implantar um ritmo cadenciado, afinações de surdo precisas e paradinhas estratégicas que casem com a evolução da comunidade.`;
      impactoMoral = 7;
    } else if (transfer.role === 'mestreSalaPortaBandeira') {
      portal = 'Portal SRzd / Carnavalesco';
      manchete = `Nobreza na passarela: ${schoolName} fecha com o casal ${transfer.professionalName}`;
      subtitulo = `Defensores do pavilhão chegam com status de gabarito para buscar o 40 absoluto dos jurados.`;
      corpo = `A disputa pelo 1º Casal de Mestre-Sala e Porta-Bandeira terminou com festa na ${schoolName}. A agremiação fechou a contratação de ${transfer.professionalName}, reconhecidos pela elegância clássica, velocidade no bailado e respeito irretocável à bandeira da escola. O contrato prevê ateliê exclusivo e treinamento intensivo com preparadores de dança.`;
      impactoMoral = 9;
    } else {
      portal = 'G1 Carnaval';
      manchete = `Reforço estratégico: ${schoolName} anuncia ${transfer.professionalName} para liderar ${transfer.roleName}`;
      subtitulo = `Contratação fecha o time de ponta da escola para a disputa do próximo título.`;
      corpo = `A ${schoolName} deu mais um passo na estruturação da sua equipe técnica ao confirmar ${transfer.professionalName} na função de ${transfer.roleName}. O profissional já iniciou os trabalhos de planejamento para o próximo carnaval.`;
      impactoMoral = 6;
    }

    const comentarios: NewsComment[] = [
      {
        autor: `Presidente da ${schoolName}`,
        tipo: 'DIRETORIA',
        texto: `Fomos ao mercado buscar quem tem compromisso com a vitória e DNA vencedor. A ${schoolName} entra na avenida para ser campeã e esse reforço mostra a nossa força!`
      },
      {
        autor: '@SambistaApaixonado',
        tipo: 'TORCEDOR',
        texto: `ALÔ BATERIA! Que contratação gigantesca! Nossa diretoria calou a boca dos corneteiros. Esse ano a arrancada rumo à taça é sem freio!`
      },
      {
        autor: '@CorneteiroDaAvenida',
        tipo: 'TORCEDOR',
        texto: `Quero ver sustentar na pista! Gastaram o orçamento quase todo em luvas... Se a caneta dos jurados pesar na hora da nota, não adianta reclamar de garfada!`
      },
      {
        autor: 'Milton Cunha',
        tipo: 'ESPECIALISTA',
        texto: `Um acerto suntuoso, meu bem! Mostra ambição estética e entendimento da liturgia da Sapucaí. Se o barracão der respaldo, a escola entra no páreo com força de Sábado das Campeãs!`
      }
    ];

    return {
      id: `art_transfer_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      portal,
      dataTemporada: `${transfer.monthId === 'maio' ? 'Maio' : 'Abril'} - Janela de Transferências`,
      manchete,
      subtitulo,
      corpo,
      categoria: 'MERCADO',
      escolaEnvolvida: schoolName,
      escolaId: transfer.newSchoolId,
      impactoMoral,
      comentarios,
      year: transfer.year,
      monthId: transfer.monthId,
      timestamp: new Date().toISOString(),
      read: false
    };
  }

  /**
   * Gera matérias exclusivas para os 4 portais quando o mês avança
   */
  public static generateMonthAdvanceNews(
    monthId: SeasonMonthId,
    currentYear: number,
    schools: School[],
    userSchool?: School | null
  ): NewsArticle[] {
    const articles: NewsArticle[] = [];
    const activeSchools = schools.filter((s) => !s.isInactive && !(s as any).inactive);
    const espSchools = activeSchools.filter((s) => s.division === 'especial');
    const randomEspSchool = espSchools[Math.floor(Math.random() * espSchools.length)] || activeSchools[0];
    const highlightedSchoolName = userSchool ? cleanSchoolName(userSchool) : cleanSchoolName(randomEspSchool);

    const uid = () => `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    if (monthId === 'marco') {
      // Pós-apuração e Campeãs
      articles.push({
        id: `news_marco_${currentYear}_g1_${uid()}`,
        portal: 'G1 Carnaval',
        dataTemporada: 'Março - Pós-Apuração e Desfile das Campeãs',
        manchete: `Balanço Oficial da Sapucaí: Notas por décimos acirram disputa e LIESA planeja novo ciclo`,
        subtitulo: `Comemoração do título, choro de rebaixadas e promessas de reformulação marcam o encerramento do carnaval carioca.`,
        corpo: `A apuração das notas da Marquês de Sapucaí deixou um rastro de euforia para a campeã e desabafo para as escolas que perderam décimos preciosos em quesitos de pista como Evolução e Harmonia. Com o Sábado das Campeãs consagrando as seis melhores colocadas, os presidentes de agremiações já iniciam as primeiras reuniões de avaliação de desempenho e corte de custos para o próximo calendário.`,
        categoria: 'APURACAO',
        escolaEnvolvida: highlightedSchoolName,
        impactoMoral: 6,
        year: currentYear,
        monthId: 'marco',
        timestamp: new Date().toISOString(),
        comentarios: [
          {
            autor: 'Diretoria LIESA',
            tipo: 'DIRETORIA',
            texto: 'O nível técnico apresentado na pista foi o mais alto da história. O regulamento foi cumprido à risca e os jurados justificaram cada décimo.'
          },
          {
            autor: '@FiscalDeQuesito',
            tipo: 'TORCEDOR',
            texto: 'Teve jurado de Fantasias que viu desfile em outro sambódromo, só pode! Fomos garfados na segunda bandeira, mas ano que vem o troco vem na avenida!'
          },
          {
            autor: 'Milton Cunha',
            tipo: 'ESPECIALISTA',
            texto: 'Um carnaval feérico e apoteótico, meu bem! A campeã venceu no detalhe cirúrgico do conjunto visual e da emoção popular!'
          }
        ]
      });

      articles.push({
        id: `news_marco_${currentYear}_resenha_${uid()}`,
        portal: 'Resenha dos Sambistas',
        dataTemporada: 'Março - Quarta-feira de Cinzas',
        manchete: `Choro na quadra e festa na avenida: O desfecho mais dramático da apuração das notas`,
        subtitulo: `Corneteiros de plantão não perdoam: quedas de notas por décimos provocam demissões sumárias nos bastidores.`,
        corpo: `Não deu tempo nem de curtir o almoço da Quarta-feira de Cinzas. Com a confirmação do resultado oficial, o telefone dos dirigentes não parou de tocar. Diretores de carnaval que não entregaram nota máxima já recolheram crachás, enquanto as arquibancadas debatem nas redes sociais as notas misteriosas que definiram o rebaixamento e a glória.`,
        categoria: 'APURACAO',
        escolaEnvolvida: highlightedSchoolName,
        impactoMoral: -2,
        year: currentYear,
        monthId: 'marco',
        timestamp: new Date().toISOString(),
        comentarios: [
          {
            autor: 'Torcida Organizada',
            tipo: 'TORCEDOR',
            texto: 'Diretoria frouxa! Perder décimo em Harmonia na frente do setor 3 é incompetência pura. Queremos barca de demissão agora!'
          },
          {
            autor: '@SapucaiSemFiltro',
            tipo: 'TORCEDOR',
            texto: 'Caneta pesada pros pequenos e vista grossa pros gigantes. Todo ano a mesma ladainha. Parabéns aos guerreiros da comunidade!'
          },
          {
            autor: 'Aydano André Motta',
            tipo: 'ESPECIALISTA',
            texto: 'A apuração do Rio pune qualquer vacilo de cronometragem. Quem não entendeu que o carnaval virou ciência exata vai continuar chorando nas cinzas.'
          }
        ]
      });
    } else if (monthId === 'abril') {
      // Mercado da Folia / Janela de Transferências
      articles.push({
        id: `news_abril_${currentYear}_srzd_${uid()}`,
        portal: 'Portal SRzd / Carnavalesco',
        dataTemporada: 'Abril - Janela de Transferências e Mercado da Folia',
        manchete: `Dança das cadeiras esquenta a Cidade do Samba: ${highlightedSchoolName} lidera contratações de peso`,
        subtitulo: `Agremiações investem pesado para blindar quesitos de notas máximas com contratações de carnavalescos, puxadores e mestres consagrados.`,
        corpo: `O mês de abril marca o auge do Mercado da Folia no Rio de Janeiro. Com orçamentos milionários e promessas de novos patrocínios, os barracões do Grupo Especial e da Série Ouro travam duelos intensos pelos principais talentos livres no mercado. A ${highlightedSchoolName} movimentou a semana com negociações audaciosas, atraindo olhares de especialistas que veem uma clara guinada rumo ao campeonato.`,
        categoria: 'MERCADO',
        escolaEnvolvida: highlightedSchoolName,
        impactoMoral: 8,
        year: currentYear,
        monthId: 'abril',
        timestamp: new Date().toISOString(),
        comentarios: [
          {
            autor: 'Diretoria Executiva',
            tipo: 'DIRETORIA',
            texto: 'Montamos uma comissão técnica de primeiro nível. No carnaval de hoje não há margem para amadorismo: quem quer levantar a taça tem que ter os melhores em cada quesito.'
          },
          {
            autor: '@MercadoDaFolia',
            tipo: 'TORCEDOR',
            texto: 'A diretoria canetou certo! Se mantiver esse ritmo de investimentos, o barracão vai virar uma máquina de nota 10!'
          },
          {
            autor: 'Milton Cunha',
            tipo: 'ESPECIALISTA',
            texto: 'É o xadrez do samba, meu bem! Quem contrata com sabedoria em abril desfila com tranquilidade em fevereiro!'
          }
        ]
      });

      articles.push({
        id: `news_abril_${currentYear}_resenha_${uid()}`,
        portal: 'Resenha dos Sambistas',
        dataTemporada: 'Abril - Bastidores e Especulações',
        manchete: `Guerra de orçamentos: Propostas de luvas milionárias agitam agentes livres e desmontam parcerias`,
        subtitulo: `Profissionais trocam de pavilhão em busca de projetos solos com autonomia criativa total e salários astronômicos.`,
        corpo: `A dança das cadeiras do Carnaval Carioca está mais imprevisível do que nunca. Carnavalescos renomados desfazem duplas para comandar barracões exclusivos, enquanto intérpretes e mestres de bateria avaliam propostas que chegam a incluir apartamentos e carros de luxo como luvas de assinatura. As redes sociais fervem com corneteiros e entusiastas discutindo quem sai ganhando na montagem das equipes.`,
        categoria: 'MERCADO',
        escolaEnvolvida: highlightedSchoolName,
        impactoMoral: 6,
        year: currentYear,
        monthId: 'abril',
        timestamp: new Date().toISOString(),
        comentarios: [
          {
            autor: 'Agente de Carnavalescos',
            tipo: 'DIRETORIA',
            texto: 'A valorização dos profissionais da folia é justa e urgente. O espetáculo movimenta bilhões e merece artistas com contratos de alto rendimento.'
          },
          {
            autor: '@ResenhaFoliã',
            tipo: 'TORCEDOR',
            texto: 'O que adianta pagar luvas milionárias se na hora de soltar a grana do barracão contingenciam? Quero ver alegoria de ferro na avenida!'
          },
          {
            autor: 'Aydano André Motta',
            tipo: 'ESPECIALISTA',
            texto: 'Contratações midiáticas empolgam torcida, mas o que ganha carnaval é entrosamento de barracão com diretoria de harmonia.'
          }
        ]
      });
    } else if (monthId === 'maio') {
      // Lançamento de Enredos e Sinopses
      articles.push({
        id: `news_maio_${currentYear}_srzd_${uid()}`,
        portal: 'Portal SRzd / Carnavalesco',
        dataTemporada: 'Maio - Lançamento de Enredos e Sinopses',
        manchete: `Manifesto Estético: ${highlightedSchoolName} apresenta sinopse densa e promete enredo arrebatador`,
        subtitulo: `Pesquisa aprofundada aposta em narrativa histórica e alas com forte apelo cromático para seduzir a comissão julgadora.`,
        corpo: `A ${highlightedSchoolName} entregou aos poetas da quadra o roteiro oficial do seu enredo para o próximo carnaval. A sinopse, elogiada pela crítica pela consistência lírica, estrutura a agremiação em setores bem delineados, abrindo espaço para soluções plásticas inovadoras de barracão e uma narrativa que emociona a comunidade da quadra ao Sambódromo.`,
        categoria: 'ENREDO',
        escolaEnvolvida: highlightedSchoolName,
        impactoMoral: 7,
        year: currentYear,
        monthId: 'maio',
        timestamp: new Date().toISOString(),
        comentarios: [
          {
            autor: 'Carnavalesco Titular',
            tipo: 'DIRETORIA',
            texto: 'Esse enredo é uma declaração de amor à nossa história e às nossas raízes. Vamos transformar a Sapucaí num verdadeiro templo de cultura popular.'
          },
          {
            autor: '@CompositorDeQuadra',
            tipo: 'TORCEDOR',
            texto: 'Sinopse maravilhosa! Caneta afinada no botequim, o samba nota 10 já começou a nascer no cavaquinho!'
          },
          {
            autor: 'Milton Cunha',
            tipo: 'ESPECIALISTA',
            texto: 'Uma poesia de ouro, meu amor! Se a melodia respeitar a cadência do enredo, teremos um hino antológico para as próximas gerações!'
          }
        ]
      });
    } else if (monthId === 'junho') {
      // Disputas de Samba e Sinopses
      articles.push({
        id: `news_junho_${currentYear}_srzd_${uid()}`,
        portal: 'Portal SRzd / Carnavalesco',
        dataTemporada: 'Junho - Lançamento de Enredos e Sinopses',
        manchete: `Tese de Doutorado na Pista: ${highlightedSchoolName} divulga sinopse densa e aposta em temática autoral`,
        subtitulo: `Carnavalesco aposta em pesquisa histórica aprofundada, dividindo o enredo em cinco setores de forte apelo plástico.`,
        corpo: `A ${highlightedSchoolName} entregou aos compositores a sinopse oficial do seu enredo para o próximo carnaval. Em um texto denso e poético de quase 15 páginas, o carnavalesco delineou a estrutura cenográfica da escola, prometendo alas de impacto cromático e alegorias com acabamento barroco. A comissão de carnaval alertou os poetas da quadra sobre a exigência de refrãos de fácil assimilação para que o canto da comunidade contagie a avenida.`,
        categoria: 'ENREDO',
        escolaEnvolvida: highlightedSchoolName,
        impactoMoral: 7,
        year: currentYear,
        monthId: 'junho',
        timestamp: new Date().toISOString(),
        comentarios: [
          {
            autor: `Carnavalesco da ${highlightedSchoolName}`,
            tipo: 'DIRETORIA',
            texto: 'Não é um enredo de plástico, é um manifesto da nossa ancestralidade. Quem colocar a poesia verdadeira do povo na melodia vai levar o hino pra pista!'
          },
          {
            autor: '@AlaDosCompositores',
            tipo: 'TORCEDOR',
            texto: 'Sinopse pesada e linda demais! A caneta dos poetas já tá fumegando aqui no botequim. Esse ano o samba do ano é nosso!'
          },
          {
            autor: 'Milton Cunha',
            tipo: 'ESPECIALISTA',
            texto: 'Uma poesia refinada, meu amor! Se a ala de compositores acertar a métrica dos versos e evitar samba acelerado, teremos um clássico eterno na boca do povo!'
          }
        ]
      });

      articles.push({
        id: `news_junho_${currentYear}_terreiro_${uid()}`,
        portal: 'Voz do Terreiro',
        dataTemporada: 'Junho - Raízes do Enredo',
        manchete: `A força do chão da comunidade: Velha Guarda aprova temática e abençoa o próximo desfile`,
        subtitulo: `Em feijoada lotada na quadra, baianas e baluartes celebram resgate das tradições populares da escola.`,
        corpo: `O anúncio do tema do próximo carnaval foi celebrado com muita emoção no terreiro da ${highlightedSchoolName}. Baianas históricas, integrantes da Velha Guarda e jovens ritmistas uniram as mãos em oração para benzer a bandeira e pedir proteção aos orixás e padroeiros para o trabalho de barracão que se inicia.`,
        categoria: 'ENREDO',
        escolaEnvolvida: highlightedSchoolName,
        impactoMoral: 8,
        year: currentYear,
        monthId: 'junho',
        timestamp: new Date().toISOString(),
        comentarios: [
          {
            autor: 'Baluarte da Velha Guarda',
            tipo: 'DIRETORIA',
            texto: 'A escola voltou a falar a língua da sua gente. Quando o morro se reconhece no que tá na bandeira, ninguém segura a nossa arrancada.'
          },
          {
            autor: '@CriaDaComunidade',
            tipo: 'TORCEDOR',
            texto: 'Isso é Carnaval de verdade! Chega de enredo patrocinado sem alma. Esse ano a Sapucaí vai ver a força do nosso povo descer o morro!'
          },
          {
            autor: 'Milton Cunha',
            tipo: 'ESPECIALISTA',
            texto: 'O chão da escola é soberano, meu bem! Quando a comunidade compra a ideia no coração, a comissão de frente e a bateria desfilam flutuando!'
          }
        ]
      });
    } else if (monthId === 'julho') {
      // Sorteio das Ordens de Desfile
      articles.push({
        id: `news_julho_${currentYear}_g1_${uid()}`,
        portal: 'G1 Carnaval',
        dataTemporada: 'Julho - Sorteio da Ordem de Desfile',
        manchete: `Estratégia na Cidade do Samba: Sorteio define posições cruciais de apresentação na Sapucaí`,
        subtitulo: `Especialistas debatem: abrir o domingo corre risco de jurado frio ou fechar a segunda-feira favorece a apoteose do título?`,
        corpo: `A Cidade do Samba viveu noite de festa e pura matemática com a realização do sorteio oficial das ordens de desfile da LIESA. Presidentes comemoraram e lamentaram as bolinhas que definiram os dias e horários de apresentação. A posição de fechar o desfile com o dia amanhecendo é disputada a tapas pelas favoritas, enquanto abrir os trabalhos exige baterias com afinação altíssima para acordar as primeiras cabines de jurados.`,
        categoria: 'ORDEM_DESFILE',
        escolaEnvolvida: highlightedSchoolName,
        impactoMoral: 5,
        year: currentYear,
        monthId: 'julho',
        timestamp: new Date().toISOString(),
        comentarios: [
          {
            autor: 'Diretor de Carnaval',
            tipo: 'DIRETORIA',
            texto: 'Quem quer ser campeão não escolhe adversário nem posição de desfile. Vamos fazer um desfile para tirar 10 em qualquer horário!'
          },
          {
            autor: '@EstrategiaDoSamba',
            tipo: 'TORCEDOR',
            texto: 'Pegamos a melhor posição da história! Fechar o desfile com o sol raiando na Apoteose é a cara do nosso título! Prepara o coração!'
          },
          {
            autor: 'Milton Cunha',
            tipo: 'ESPECIALISTA',
            texto: 'Desfilar no amanhecer é um presente dos deuses, meu bem! Mas cuidado com a dispersão: se uma alegoria agarrar na curva da estátua, o sonho vira pesadelo no cronômetro!'
          }
        ]
      });
    } else if (monthId === 'dezembro') {
      // Ensaios Técnicos e Barracão
      articles.push({
        id: `news_dezembro_${currentYear}_srzd_${uid()}`,
        portal: 'Portal SRzd / Carnavalesco',
        dataTemporada: 'Dezembro - Ensaios Técnicos na Sapucaí',
        manchete: `Arrancada avassaladora no ensaio técnico: ${highlightedSchoolName} levanta o Setor 1 e crava favoritismo`,
        subtitulo: `Comunidade cantou o samba a plenos pulmões, bateria executou bossas arriscadas e casal bailou sem nenhuma falha.`,
        corpo: `A Marquês de Sapucaí viveu uma noite mágica no ensaio técnico da ${highlightedSchoolName}. Mesmo sob chuva fina, as arquibancadas dos setores 1, 3 e 4 vieram abaixo com o canto uníssono das alas. A bateria realizou duas convenções ousadas em frente ao módulo dos julgadores e o primeiro casal mostrou que a nota 40 já está no bolso. O termômetro do carnaval coloca a escola na linha de frente para disputar a taça.`,
        categoria: 'BARRACAO',
        escolaEnvolvida: highlightedSchoolName,
        impactoMoral: 9,
        year: currentYear,
        monthId: 'dezembro',
        timestamp: new Date().toISOString(),
        comentarios: [
          {
            autor: `Mestre de Bateria da ${highlightedSchoolName}`,
            tipo: 'DIRETORIA',
            texto: 'A bateria respondeu no olhar! Fizemos a paradinha nova sem perder um milímetro de andamento. No desfile oficial vai ser mais bonito ainda!'
          },
          {
            autor: '@SapucaiaEmChamas',
            tipo: 'TORCEDOR',
            texto: 'ARREPIOU ATÉ A ALMA! Quem não cantou o nosso samba no ensaio técnico é louco! A arrancada do campeão tá desenhada, segura a nossa onda!'
          },
          {
            autor: 'Milton Cunha',
            tipo: 'ESPECIALISTA',
            texto: 'Uma surra de canto, meu bem! A escola desfilou compacta, com evolução de veludo e uma bateria atrevida. Se o barracão não atrasar as alegorias, o troféu tem endereço certo!'
          }
        ]
      });
    } else {
      // Notícia geral de rotina / barracão para os outros meses
      articles.push({
        id: `news_generic_${currentYear}_${monthId}_${uid()}`,
        portal: 'Portal SRzd / Carnavalesco',
        dataTemporada: `${monthId.toUpperCase()} - Preparativos da Temporada`,
        manchete: `Segredos de barracão: ${highlightedSchoolName} acelera ritmo de ferragens e confecção de protótipos`,
        subtitulo: `Equipe trabalha em três turnos na Cidade do Samba para garantir que as alegorias fiquem prontas sem contingenciamento.`,
        corpo: `O ritmo dentro da Cidade do Samba é frenético. Soldadores, escultores de isopor, costureiras e aderecistas trabalham dia e noite para dar forma ao projeto de carnaval da ${highlightedSchoolName}. O diretor de barracão confirmou que as primeiras duas alegorias já entraram na fase de empapa e pintura de arte, com materiais nobres que prometem brilho único sob os holofotes da Sapucaí.`,
        categoria: 'BARRACAO',
        escolaEnvolvida: highlightedSchoolName,
        impactoMoral: 6,
        year: currentYear,
        monthId,
        timestamp: new Date().toISOString(),
        comentarios: [
          {
            autor: 'Diretor de Barracão',
            tipo: 'DIRETORIA',
            texto: 'Aqui a poeira não baixa. Estamos cumprindo os prazos à risca para não sofrer na reta final. O espetáculo está ficando cinematográfico.'
          },
          {
            autor: '@OlhoNoBarracao',
            tipo: 'TORCEDOR',
            texto: 'Disseram que o abre-alas tem mais de 60 metros e três movimentos articulados! Se entrar na pista inteiro, a caneta dos jurados chora de emoção!'
          },
          {
            autor: 'Milton Cunha',
            tipo: 'ESPECIALISTA',
            texto: 'O barracão é onde o milagre acontece, meu amor! Ferro, espuma, cola quente e paixão popular virando poesia monumental!'
          }
        ]
      });
    }

    return articles;
  }

  /**
   * Catálogo de notícias de abertura com os 4 portais cobrindo o início da temporada
   */
  private static generateInitialNewsCatalog(currentYear: number, schools: School[]): NewsArticle[] {
    return [
      {
        id: `init_news_1_${currentYear}`,
        portal: 'Portal SRzd / Carnavalesco',
        dataTemporada: 'Abril - Mercado da Folia & Dança das Cadeiras',
        manchete: 'Terremoto na Cidade do Samba: Dança das cadeiras movimenta os bastidores e duplas apostam em voos solo',
        subtitulo: 'Após a apuração, agremiações abrem os cofres em busca de carnavalescos, intérpretes e mestres de bateria de ponta.',
        corpo: 'A janela de transferências do Carnaval Carioca registrou nesta semana o seu capítulo mais intenso. Com as justificativas dos jurados em mãos, diretorias de diversas agremiações do Grupo Especial e da Série Ouro deflagraram uma verdadeira corrida pelo ouro na contratação de profissionais. Intérpretes consagrados avaliam convites para cantar em dupla ou assumir o comando solo de carros de som, enquanto duplas históricas de carnavalescos negociam projetos com orçamentos milionários.',
        categoria: 'MERCADO',
        escolaEnvolvida: 'Unidos do Viradouro',
        impactoMoral: 8,
        year: currentYear,
        monthId: 'abril',
        timestamp: new Date().toISOString(),
        comentarios: [
          {
            autor: 'Diretoria de Carnaval',
            tipo: 'DIRETORIA',
            texto: 'Quem almeja o título precisa agir com precisão cirúrgica no mercado. O nosso elenco foi montado para buscar a nota máxima em todos os nove quesitos.'
          },
          {
            autor: '@SambistaDaGema',
            tipo: 'TORCEDOR',
            texto: 'ALÔ BATERIA! O mercado tá pegando fogo! Agora é a diretoria segurar o bolso e não deixar os nossos destaques escaparem pro rival!'
          },
          {
            autor: '@CorneteiroDoSamba',
            tipo: 'TORCEDOR',
            texto: 'Quero ver pagar essa folha salarial toda quando chegar em dezembro... Carnaval se ganha no chão da quadra e não só em contratação de grife!'
          },
          {
            autor: 'Milton Cunha',
            tipo: 'ESPECIALISTA',
            texto: 'Um tabuleiro de xadrez fabuloso, meu bem! A dança das cadeiras revigora o sangue das escolas e promete um dos campeonatos mais acirrados de todos os tempos!'
          }
        ]
      },
      {
        id: `init_news_2_${currentYear}`,
        portal: 'G1 Carnaval',
        dataTemporada: 'Março - Planejamento da LIESA',
        manchete: 'LIESA anuncia diretrizes para o novo ciclo e confirma calendário oficial da temporada',
        subtitulo: 'Cronograma prevê sorteio da ordem de desfile em julho e ensaios técnicos com som acoplado na Sapucaí.',
        corpo: 'A diretoria da Liga Independente das Escolas de Samba (LIESA) reuniu os presidentes das 12 agremiações do Grupo Especial na sede da entidade para traçar as metas da próxima temporada. Ficou aprovada a manutenção dos quesitos de julgamento, reforço nas vistorias de segurança nas alegorias e ampliação do sistema de captação sonora em toda a extensão da passarela Darcy Ribeiro.',
        categoria: 'HISTORICO',
        escolaEnvolvida: 'Acadêmicos do Salgueiro',
        impactoMoral: 5,
        year: currentYear,
        monthId: 'marco',
        timestamp: new Date().toISOString(),
        comentarios: [
          {
            autor: 'Presidência da LIESA',
            tipo: 'DIRETORIA',
            texto: 'O público e os componentes merecem um espetáculo com o mais rigoroso nível de pontualidade, arte e segurança.'
          },
          {
            autor: '@PassistaDeRaiz',
            tipo: 'TORCEDOR',
            texto: 'Muito bom o som acoplado, mas o que a gente quer mesmo é ingresso popular e a bateria descendo o morro com liberdade!'
          },
          {
            autor: 'Milton Cunha',
            tipo: 'ESPECIALISTA',
            texto: 'Organização é o oxigênio da beleza, meu amor! Quando a liga trabalha afinada, a Sapucaí se transforma no maior teatro a céu aberto do planeta!'
          }
        ]
      },
      {
        id: `init_news_3_${currentYear}`,
        portal: 'Voz do Terreiro',
        dataTemporada: 'Abril - Comunidade em Foco',
        manchete: 'Escolas de Acesso revelam novos talentos e alimentam o celeiro da Sapucaí',
        subtitulo: 'Jovens carnavalescos e puxadores da Série Prata e Bronze chamam a atenção de olheiros das grandes potências.',
        corpo: 'A força do samba carioca não brota do asfalto, nasce nos terreiros e quadras das divisões de acesso. Na Intendente Magalhães e nos desfiles de Niterói e Baixada, dezenas de jovens artistas, mestres-salas mirins e puxadores com fôlego de leão estão brilhando intensamente. Escolas do Especial já monitoram de perto os talentos em ascensão para compor suas comissões técnicas.',
        categoria: 'MERCADO',
        escolaEnvolvida: 'União de Maricá',
        impactoMoral: 7,
        year: currentYear,
        monthId: 'abril',
        timestamp: new Date().toISOString(),
        comentarios: [
          {
            autor: 'Diretoria da Série Ouro',
            tipo: 'DIRETORIA',
            texto: 'Somos o celeiro onde o samba renasce todo ano. O talento da nossa juventude é a garantia de que o carnaval nunca vai morrer.'
          },
          {
            autor: '@CriaDaBaixada',
            tipo: 'TORCEDOR',
            texto: 'Tem gente no acesso dando aula de afinação e criatividade em quem gasta milhões no Especial! Olho vivo nos crias da comunidade!'
          },
          {
            autor: 'Milton Cunha',
            tipo: 'ESPECIALISTA',
            texto: 'O acesso é o chão sagrado da criatividade nua e crua, meu bem! Quem sabe pescar lá traz para a avenida a verdadeira emoção popular!'
          }
        ]
      },
      {
        id: `init_news_4_${currentYear}`,
        portal: 'Resenha dos Sambistas',
        dataTemporada: 'Maio - Bastidores do Mercado',
        manchete: 'Duplas de Intérpretes viram tendência: Cantores de São Paulo e veteranos livres são cortejados no Rio',
        subtitulo: 'Com carência de timbres potentes, agremiações cogitam dividir o microfone oficial para garantir notas máximas.',
        corpo: 'A fórmula de dois cantores de peso dividindo o carro de som ganhou adeptos fervorosos nesta temporada. Após experiências bem-sucedidas onde veteranos conduziram o canto ao lado de jovens revelações, escolas tradicionais estão sondando agentes livres e até mesmo vozes consagradas do carnaval de São Paulo para fechar parcerias inéditas no Sambódromo.',
        categoria: 'MERCADO',
        escolaEnvolvida: 'Imperatriz Leopoldinense',
        impactoMoral: 6,
        year: currentYear,
        monthId: 'maio',
        timestamp: new Date().toISOString(),
        comentarios: [
          {
            autor: 'Direção de Harmonia',
            tipo: 'DIRETORIA',
            texto: 'Dupla no microfone é estratégia pura: um puxador dá a pressão e o outro segura a melodia. O canto da escola não cai nem um segundo.'
          },
          {
            autor: '@TorcedorDeArquibancada',
            tipo: 'TORCEDOR',
            texto: 'Só não pode virar disputa de ego no carro de som! Se os dois se entenderem e souberem revezar a estrofe, a Sapucaí vem abaixo!'
          },
          {
            autor: 'Milton Cunha',
            tipo: 'ESPECIALISTA',
            texto: 'Casamento vocal de luxo, meu amor! Harmonia dividida com maestria é garantia de arrepiar até o último jurado do setor 10!'
          }
        ]
      }
    ];
  }
}
