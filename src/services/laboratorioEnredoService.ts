import { Enredo, EnredoThemeType, School } from '../types/carnaval';

export interface LaboratorioEnredoParams {
  themeType: string;
  complexity: number; // 1 a 5
  tone: string;
  customKeywords?: string;
  schoolName?: string;
  division?: string;
  colors?: string[];
  carnavalescoName?: string;
}

export interface LaboratorioSector {
  sector: number;
  title: string;
  description: string;
}

export interface LaboratorioVisualHighlights {
  comissaoDeFrente?: string;
  abreAlas?: string;
  bateria?: string;
}

export interface LaboratorioEnredoResult {
  id: string;
  title: string;
  subTitle?: string;
  themeType: string;
  complexity: number;
  complexityLabel: string;
  tone: string;
  synopsis: string;
  justificativa?: string;
  qualityBoost: number;
  cost: number;
  suggestedSectors: LaboratorioSector[];
  visualHighlights: LaboratorioVisualHighlights;
  generatedWithAI: boolean;
}

export const LAB_THEME_TYPES: { id: string; label: string; icon: string; description: string }[] = [
  { id: 'Afro-Brasileiro', label: 'Afro-Brasileiro', icon: '🥁', description: 'Ancestralidade, orixás, quilombos e herança negra' },
  { id: 'Histórico', label: 'Histórico', icon: '📜', description: 'Fatos marcantes, revoltas, epopeias e biografias' },
  { id: 'Homenagem', label: 'Homenagem', icon: '⭐', description: 'Grandes personalidades da música, arte e cultura' },
  { id: 'Crítica Social', label: 'Crítica Social', icon: '📢', description: 'Voz da favela, cidadania, sátira e resistência' },
  { id: 'Mitológico', label: 'Mitológico', icon: '✨', description: 'Mitos da criação, cosmogonias e deuses' },
  { id: 'Folclore & Lendas', label: 'Folclore & Lendas', icon: '🌿', description: 'Encantados, assombrações, cordel e misticismo' },
  { id: 'Regional', label: 'Regional', icon: '☀️', description: 'O sertão, as águas amazônicas, o sul e o interior' },
  { id: 'Cultural', label: 'Cultural & Artístico', icon: '🎭', description: 'Manifestações populares, danças, teatro e telas' },
  { id: 'Lúdico', label: 'Lúdico & Fantasia', icon: '🎪', description: 'Circo, brinquedos, imaginação e doces loucuras' },
  { id: 'Ciência e Tecnologia', label: 'Ciência & Futuro', icon: '🔭', description: 'Invenções, astronomia, tempo e o amanhã' },
  { id: 'Ambiental & Natureza', label: 'Natureza & Biomas', icon: '🦜', description: 'Florestas, rios, animais sagrados e preservação' },
  { id: 'Literário & Artes', label: 'Literário', icon: '📚', description: 'Obras-primas da literatura, versos e escritores' }
];

export const LAB_TONES = [
  { id: 'Poético & Lírico', label: 'Poético & Lírico', desc: 'Versos profundos, metáforas delicadas e emoção pura' },
  { id: 'Místico & Ancestral', label: 'Místico & Ancestral', desc: 'Axé, fumaça de incenso, tambores e força espiritual' },
  { id: 'Crítico & Combustivo', label: 'Crítico & Combustivo', desc: 'Indignação legítima, pegada popular e sátira afiada' },
  { id: 'Lúdico & Festivo', label: 'Lúdico & Festivo', desc: 'Cores vibrantes, sorriso aberto e carnaval descompromissado' },
  { id: 'Dramático & Épico', label: 'Dramático & Épico', desc: 'Grandiosidade de ópera, confrontos e apoteose apolínea' }
];

export const LAB_COMPLEXITY_LEVELS = [
  { level: 1, label: 'Leve (Nível 1)', badge: 'Leve', desc: 'Narrativa linear e festiva, fácil leitura visual e canto solto na avenida', bonus: 8, cost: 70000 },
  { level: 2, label: 'Acessível (Nível 2)', badge: 'Acessível', desc: 'Imagens populares, metáforas diretas e enredo de forte empatia imediata', bonus: 10, cost: 95000 },
  { level: 3, label: 'Equilibrada (Nível 3)', badge: 'Equilibrada', desc: 'Pesquisa histórica estruturada, dramaturgia sólida e bom equilíbrio poético', bonus: 12, cost: 125000 },
  { level: 4, label: 'Densa (Nível 4)', badge: 'Densa', desc: 'Pesquisa aprofundada, simbologias ricas e múltiplas camadas de significado', bonus: 14, cost: 155000 },
  { level: 5, label: 'Monumental (Nível 5)', badge: 'Monumental', desc: 'Tratado lírico épico, tese conceitual desafiadora e ápice de rigor plástico', bonus: 15, cost: 190000 }
];

export const LAB_INSPIRATION_PROMPTS = [
  'A cura pelas mãos das rezadeiras e o sopro das folhas sagradas',
  'O trem do samba que parte da Central e borda a história do subúrbio',
  'Mestre Didi e as esculturas sagradas que dialogam com os ancestrais',
  'O duelo entre o Sol e a Lua nas festas de São João do Nordeste',
  'A lira dos poetas malditos e os boêmios da Lapa carioca',
  'O choro das águas doces e os encantos das sereias de água doce',
  'O barro vivo que vira arte nas mãos dos mestres artesãos',
  'A revolta dos marinheiros e o almirante que domou a chibata',
  'Os cortejos das congadas e o coroar dos reis negros no Brasil',
  'A utopia das cidades flutuantes sob a constelação do Cruzeiro do Sul'
];

/**
 * Procedural fallback em caso de falta de conexão ou de API key
 */
export function generateProceduralLabEnredo(params: LaboratorioEnredoParams): LaboratorioEnredoResult {
  const compInfo = LAB_COMPLEXITY_LEVELS.find((c) => c.level === params.complexity) || LAB_COMPLEXITY_LEVELS[2];
  const school = params.schoolName || 'Nossa Agremiação';
  const kw = params.customKeywords?.trim();

  let title = '';
  let subTitle = '';
  let synopsisP1 = '';
  let synopsisP2 = '';
  let synopsisP3 = '';
  let synopsisP4 = '';

  const theme = params.themeType || 'Cultural';

  if (theme === 'Afro-Brasileiro') {
    title = kw ? `O Mistério de ${kw}: Alafia nas Contas do Rosário` : 'Lonã das Matriarcas: O Banquete Sagrado das Yabás';
    subTitle = 'Do ventre da África ao manto sagrado do Morro, o axé que forja a vitória';
    synopsisP1 = `Sob o silêncio respeitoso que antecede o toque dos atabaques, a ${school} curva a cabeça perante o tempo imemorial. É das terras quentes do além-mar que sopram os cantos de travessia, onde a sabedoria ancestral teceu, com fios de palha da costa e búzios sagrados, a proteção dos orixás para os filhos do Brasil.`;
    synopsisP2 = `Na encruzilhada das memórias, erguem-se as rezadeiras, os filhos de santo e as quituteiras do asfalto. Cada passo é um terreiro a céu aberto; cada tamborim afinado pela bateria ecoa o som primordial do trovão de Xangô e a doçura espelhada das águas de Oxum.`;
    synopsisP3 = `O cortejo avança em manto azul e branco de esperança, afirmando que a fé preta é a própria coluna dorsal que sustenta o chão carioca. Não há amarras capazes de conter o brilho que emana do xirê da passarela.`;
    synopsisP4 = `Na apoteose triunfal, o Morro e o Asfalto se unem em um só clamor: é a consagração da dignidade negra, celebrando a bênção dos ancestrais na mais pura comunhão de axé e poesia.`;
  } else if (theme === 'Histórico') {
    title = kw ? `A Epopeia de ${kw}: Páginas de Glória e Bravura` : 'Trilhos da Memória: A Saga dos Esquecidos na Terra do Sol';
    subTitle = 'A voz insubmissa daqueles que escreveram a história sem pedir permissão';
    synopsisP1 = `A história oficial muitas vezes esquece as mãos calejadas que ergueram os palácios e traçaram os mapas. Neste Carnaval, a ${school} resgata do pó do esquecimento os verdadeiros artífices da liberdade brasileira.`;
    synopsisP2 = `Das revoltas populares nos sertões bravios às esquinas rebeldes do Rio antigo, o povo sempre soube cantar para não sucumbir. Os heróis de pés descalços ganham vida em cada ala, empunhando bandeiras de dignidade e cidadania.`;
    synopsisP3 = `A pesquisa documental revela que a bravura nasce no coração comunitário. Cada setor do desfile desmonta as versões dos poderosos para dar lugar ao grito dos jangadeiros, operários e poetas da periferia.`;
    synopsisP4 = `Desponta na passarela a apoteose republicana do povo: a certeza de que a maior riqueza desta terra reside na coragem daqueles que nunca deixaram de lutar por justiça e igualdade.`;
  } else if (theme === 'Crítica Social') {
    title = kw ? `O Brasil de ${kw}: Quem dá as Cartas na Mesa da Vida?` : 'Banquete dos Deserdados: O Pão, a Festa e a Esperança';
    subTitle = 'Uma sátira afiada sobre a realidade brasileira com a alegria que desarma o preconceito';
    synopsisP1 = `O Carnaval é a hora solene em que a ordem se inverte: o rei desce do pedestal e o gari veste a coroa de ouro da Sapucaí. A ${school} convoca seu povo a olhar no espelho e rir das próprias contradições sociais com a astúcia do malandro de terno de linho.`;
    synopsisP2 = `Pelos labirintos do consumo desenfreado e das promessas não cumpridas, desfilam as alegorias do cotidiano: o prato que sonha com a comida, a fila do ônibus que vira cortejo e a burocracia transformada em circo de horrores.`;
    synopsisP3 = `Mas a crítica do sambista não é amarga: é dinamite de purpurina. É o riso que desmascara as hipocrisias e a poesia do morro que exige respeito perante as arquibancadas do mundo.`;
    synopsisP4 = `Ao fim da jornada, ergue-se o verdadeiro monumento da cidade: a solidariedade das favelas e das comunidades que, contra todas as tempestades, insistem em construir a felicidade diária.`;
  } else if (theme === 'Regional' || theme === 'Folclore & Lendas') {
    title = kw ? `O Sertão de ${kw}: Luar de Prata e Encantaria` : 'Sinfonia das Águas e Matas: O Canto dos Curupiras no Chão das Gerais';
    subTitle = 'O folclore vivo e as lendas do povo contadas no ritmo envolvente da Sapucaí';
    synopsisP1 = `Onde o asfalto cede lugar à poeira vermelha e às águas barrentas dos grandes rios, nascem os mitos que alimentam a imaginação brasileira. A ${school} abre a porteira do imaginário para revelar os mistérios guardados pelas noites de lua cheia.`;
    synopsisP2 = `É a hora em que curupiras, sacis, iaras e lobisomens deixam a escuridão para sambar com a cabocla rezadeira. Os fogos de artifício iluminam os mastros juninos, os xotes e baiões ganham a cadência acelerada dos tamborins cariocas.`;
    synopsisP3 = `As cores da floresta e da caatinga se fundem no pavilhão da escola. Não se trata de uma paisagem distante, mas do sangue pulsante do migrante que trouxe sua memória para as vielas do Rio de Janeiro.`;
    synopsisP4 = `Na apoteose da encantaria, o Brasil profundo abraça a Marques de Sapucaí, selando um pacto de amor entre a tradição dos antigos sertões e a modernidade da folia.`;
  } else if (theme === 'Homenagem') {
    title = kw ? `Canta, ${kw}! A Estrela que Alumia o Infinito` : 'Vozes da Glória: O Eclodir de um Gênio nos Terreiros do Samba';
    subTitle = 'Uma reverência poética a quem doou a própria vida para encantar a alma brasileira';
    synopsisP1 = `Há vidas que não cabem no tempo cronológico; transbordam para a eternidade como um rio de notas musicais e pinceladas de emoção. A ${school} pede a bênção para homenagear uma trajetória ímpar que ensinou o Brasil a sonhar.`;
    synopsisP2 = `Da infância humilde aos palcos monumentais, cada etapa dessa caminhada é retratada com requinte cenográfico e fidelidade afetiva. Os versos compostos para a ocasião traduzem a gratidão de gerações que cresceram inspiradas por este legado.`;
    synopsisP3 = `Os amigos, as parcerias de estrada e os baluartes da velha-guarda se unem na passarela para formar um cordão inquebrantável de afeto. A memória viva emociona os jurados e faz pulsar o coração das arquibancadas.`;
    synopsisP4 = `A consagração final é um abraço coletivo: o pavilhão da escola desce em reverência e o homenageado é coroado imortal no altar sagrado do Carnaval.`;
  } else {
    title = kw ? `O Despertar de ${kw}: A Arte que Transfigura a Realidade` : 'Metamorfoses do Infinito: O Teatro Mágico da Imaginação';
    subTitle = 'Uma viagem fascinante pelas fronteiras da estética, da ciência e dos sonhos';
    synopsisP1 = `A imaginação humana é o único território onde as leis da física se curvam à vontade poética. A ${school} propõe uma travessia cósmica pelo poder transformador da criação artística e do engenho humano.`;
    synopsisP2 = `Pelas lentes do ilusionismo e da invenção, máquinas fantásticas e personagens dos sonhos desfilam em harmonia com a cadência ritmada dos ritmistas. O passado e o futuro se encontram em um eterno presente carnavalesco.`;
    synopsisP3 = `A estética inovadora desafia o óbvio: materiais reflexivos, paletas cromáticas ousadas e esculturas articuladas que ganham vida sob a luz dos holofotes do sambódromo.`;
    synopsisP4 = `No desfecho apoteótico, a escola celebra a vitória do pensamento livre e da sensibilidade, provando que o samba é a mais perfeita síntese da genialidade do povo brasileiro.`;
  }

  const sectors: LaboratorioSector[] = [
    {
      sector: 1,
      title: 'Setor 1: O Alvorecer e a Semente Mística',
      description: 'Apresentação do conceito primordial, o impacto inaugural com a Comissão de Frente e o Abre-Alas imponente.'
    },
    {
      sector: 2,
      title: 'Setor 2: As Rotas da Memória e a Travessia',
      description: 'O desenvolvimento dramático da narrativa histórica e cultural, com alas coreografadas e riqueza de indumentária.'
    },
    {
      sector: 3,
      title: 'Setor 3: Os Saberes, a Fé e a Resistência',
      description: 'Momento de profunda emoção com a Ala das Baianas monumentais, o ritmo pulsante da Bateria e o segundo casal.'
    },
    {
      sector: 4,
      title: 'Setor 4: A Apoteose Triunfal na Passarela',
      description: 'O desfecho de consagração temática, a celebração do orgulho comunitário e o último carro com efeitos de palco.'
    }
  ];

  if (params.complexity >= 4) {
    sectors.push({
      sector: 5,
      title: 'Setor 5: O Legado Eterno e a Coroação do Povo',
      description: 'Quinto setor exclusivo para enredos densos e monumentais, com defesa bibliográfica e alegoria de encerramento.'
    });
  }

  return {
    id: `enr_lab_${Date.now()}`,
    title,
    subTitle,
    themeType: theme,
    complexity: params.complexity,
    complexityLabel: compInfo.label,
    tone: params.tone,
    synopsis: `${synopsisP1}\n\n${synopsisP2}\n\n${synopsisP3}\n\n${synopsisP4}`,
    justificativa: `O enredo proposto para a ${school} harmoniza profundidade de pesquisa cultural com extraordinário apelo plástico e musical. Estruturado em ${sectors.length} setores narrativos coerentes, atende a todos os critérios de clareza temática, encadeamento dramático e adequação ao manual de julgamento oficial da LIESA.`,
    qualityBoost: compInfo.bonus,
    cost: compInfo.cost,
    suggestedSectors: sectors,
    visualHighlights: {
      comissaoDeFrente: 'Encenação teatral de impacto imediato com figurinos cinéticos e elemento cênico articulado.',
      abreAlas: 'Monumento cenográfico com dupla composição de chassis, acabamento luxuoso e iluminação programada.',
      bateria: 'Indumentária temática contextualizada com adereços de cabeça ergonômicos para máxima afinação acústica.'
    },
    generatedWithAI: false
  };
}

/**
 * Chama o backend com Gemini ou executa o fallback procedural
 */
export async function generateLabEnredoWithGemini(params: LaboratorioEnredoParams): Promise<LaboratorioEnredoResult> {
  try {
    const res = await fetch('/api/enredo/laboratorio-gerar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    if (res.ok && res.status !== 204) {
      const data = await res.json();
      if (data && data.title && data.synopsis) {
        return {
          id: `enr_gemini_${Date.now()}`,
          title: data.title,
          subTitle: data.subTitle || '',
          themeType: data.themeType || params.themeType,
          complexity: params.complexity,
          complexityLabel: data.complexityLabel || `Nível ${params.complexity}`,
          tone: params.tone,
          synopsis: data.synopsis,
          justificativa: data.justificativa,
          qualityBoost: data.qualityBoost || (8 + Math.floor(params.complexity * 1.4)),
          cost: data.cost || (params.complexity * 30000 + 40000),
          suggestedSectors: data.suggestedSectors || [
            { sector: 1, title: 'Setor 1: O Ponto de Partida', description: 'Abertura do desfile' },
            { sector: 2, title: 'Setor 2: O Desenvolvimento', description: 'Corpo do enredo' },
            { sector: 3, title: 'Setor 3: O Clímax Dramático', description: 'Força da comunidade' },
            { sector: 4, title: 'Setor 4: A Apoteose', description: 'Encerramento triunfal' }
          ],
          visualHighlights: data.visualHighlights || {
            comissaoDeFrente: 'Apresentação coreografada dos personagens centrais',
            abreAlas: 'Impacto visual monumental com as cores da escola',
            bateria: 'Fantasia rítmica com elementos temáticos'
          },
          generatedWithAI: true
        };
      }
    }
  } catch (err) {
    console.warn('Falha na chamada Gemini server-side, utilizando motor procedural:', err);
  }

  // Fallback procedural garantido
  return generateProceduralLabEnredo(params);
}
