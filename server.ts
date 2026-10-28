import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { generateProceduralLabEnredo } from './src/services/laboratorioEnredoService';

dotenv.config();

const distPath = path.resolve(process.cwd(), 'dist');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Inicializa cliente Gemini com header obrigatório User-Agent: aistudio-build
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
});

/**
 * Endpoint de Pesquisa Temática Integrada com IA & Busca
 */
app.post('/api/enredo/pesquisar', async (req: Request, res: Response) => {
  const { theme, notes, genre, schoolName, division } = req.body;

  if (!theme || typeof theme !== 'string') {
    res.status(400).json({ error: 'Tema não fornecido' });
    return;
  }

  // Se houver chave Gemini, tenta realizar pesquisa aprofundada com Gemini
  if (process.env.GEMINI_API_KEY) {
    try {
      const prompt = `Você é um renomado carnavalesco e pesquisador de enredos do Carnaval do Rio de Janeiro (LIESA e Superliga).
Realize uma pesquisa aprofundada para estruturar um enredo de escola de samba baseado nas informações:
- Escola de Samba: ${schoolName || 'Escola de Samba'}
- Divisão: ${division || 'especial'}
- Tema indicado pelo jogador: "${theme}"
- Resumo / Ideias preliminares: "${notes || 'Apenas o tema fornecido'}"
- Vertente temática: ${genre || 'A definir na pesquisa'}

Retorne APENAS um objeto JSON com a seguinte estrutura:
{
  "theme": "${theme}",
  "detectedGenre": "Histórico" | "Afro-Brasileiro" | "Regional" | "Mitológico" | "Crítica Social" | "Cultural" | "Lúdico" | "Homenagem" | "Ciência e Tecnologia",
  "historicalContext": "resumo conciso de 3 a 5 linhas da pesquisa histórica e cultural real",
  "centralFigures": ["figura 1", "figura 2", "figura 3"],
  "iconography": ["símbolo 1", "símbolo 2", "símbolo 3"],
  "dramaticTension": "a mensagem dramática ou conflito que levantará a Sapucaí",
  "recommendedPalette": {
    "name": "Nome da Paleta",
    "colors": ["#hex1", "#hex2", "#hex3", "#hex4"],
    "concept": "explicação da paleta"
  },
  "researchHighlights": ["destaque 1", "destaque 2", "destaque 3"],
  "approaches": [
    {
      "id": "approach_1",
      "name": "Abordagem 1 (ex: Mística)",
      "badge": "Mítica",
      "tagline": "frase de efeito",
      "suggestedTitle": "Título oficial poético do enredo",
      "subTitle": "Subtítulo do enredo",
      "themeType": "Mitológico",
      "narrativeAxis": "tese narrativa",
      "synopsis": "sinopse carnavalesca poética com 3 parágrafos",
      "aestheticStyle": "estilo plástico",
      "dominatColors": ["#hex1", "#hex2"],
      "qualityBoost": 15,
      "cost": 210000,
      "setorizacaoPreview": [
        { "sectorNumber": 1, "title": "Setor 1: ...", "synopsis": "..." },
        { "sectorNumber": 2, "title": "Setor 2: ...", "synopsis": "..." },
        { "sectorNumber": 3, "title": "Setor 3: ...", "synopsis": "..." },
        { "sectorNumber": 4, "title": "Setor 4: ...", "synopsis": "..." }
      ],
      "elementsPreview": {
        "comissaoDeFrente": { "name": "...", "concept": "...", "costume": "..." },
        "casal1": { "name": "...", "costume": "...", "representation": "..." },
        "abreAlas": { "name": "...", "concept": "...", "materials": "..." },
        "baianas": { "name": "...", "costume": "...", "symbolism": "..." },
        "bateria": { "name": "...", "costume": "...", "bossas": "..." },
        "allegories": [{ "number": 2, "name": "...", "concept": "..." }],
        "alasHighlights": [{ "name": "...", "sector": 1, "concept": "..." }]
      }
    }
  ]
}`;

      // Usa gemini-3.1-flash-lite para resposta ultrarrápida e confiável
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        if (parsed && parsed.approaches && parsed.approaches.length > 0) {
          res.json(parsed);
          return;
        }
      }
    } catch {
      // Se houver 429 ou erro na API externa, o fluxo responde 204 para acionar o motor procedural
    }
  }

  // Retorna status 204 para que o cliente use o motor enciclopédico procedural instantâneo
  res.status(204).end();
});

/**
 * Endpoint de Geração do Roteiro Oficial do Desfile (Livro Abre-Alas) com IA
 * Cria o roteiro 100% derivado da sinopse e do tema no padrão LIESA
 */
app.post('/api/enredo/gerar-roteiro', async (req: Request, res: Response) => {
  const { schoolName, shortName, enredoTitle, synopsis, themeType, division, colors, staff } = req.body;

  if (!synopsis || typeof synopsis !== 'string') {
    res.status(400).json({ error: 'Sinopse não fornecida' });
    return;
  }

  if (process.env.GEMINI_API_KEY) {
    try {
      const prompt = `Você é um Enredista e Carnavalesco consagrado do Carnaval do Rio de Janeiro (LIESA/Série Ouro).
Sua missão é redigir o roteiro oficial do desfile no formato rigoroso do "Livro Abre-Alas" da LIESA para a agremiação ${schoolName || 'Escola de Samba'} (Cores: ${colors?.join(', ') || 'Tradicionais'}), Divisão ${division || 'especial'}.

Título do Enredo: "${enredoTitle || 'Enredo Oficial'}"
Linha Temática: ${themeType || 'Cultural'}
Sinopse Oficial do Enredo:
"""
${synopsis}
"""

DIRETRIZES FUNDAMENTAIS:
1. SEM PRÉ-DEFINIÇÕES OU CLICHÊS GENÉRICOS: Todo o roteiro, cada setor, ala, alegoria e personagem deve nascer EXCLUSIVAMENTE das passagens, metáforas, histórias e conceitos da sinopse e do tema fornecidos.
2. TRANSPOSIÇÃO VISUAL RIGOROSA: Cada ala e alegoria deve traduzir um trecho concreto da sinopse em indumentária (cabeça, costeiro, adereço de mão, tecidos, texturas e paleta de cores).
3. DRAMATURGIA SETORIZADA: O desfile deve ser dividido entre 4 e 5 setores numerados, cada um com um título poético extraído da narrativa da sinopse e um resumo da sua função narrativa no enredo.
4. SEGMENTOS OBRIGATÓRIOS INTEGRADOS AO ENREDO:
   - Comissão de Frente: Nome da encenação, elemento cênico e ação coreográfica (atos).
   - 1º Casal de Mestre-Sala e Porta-Bandeira: Fantasia do casal e dos seus guardiões inserida no Setor 1 com defesa da dança ritual.
   - 2º Casal de Mestre-Sala e Porta-Bandeira: Fantasia inserida nos setores intermediários.
   - Ala das Baianas: Figurino monumental e simbólico em setor de grande peso.
   - Bateria e Rainha: Fantasia contextualizada ao setor em que desfilam.
   - Passistas e Velha-Guarda: Fantasias temáticas.
5. ALEGORIAS DETALHADAS: Para cada carro alegórico e tripé, forneça título poético, descrição cenográfica minuciosa (esculturas, módulos, iluminação, acabamento), Destaque Central Alto, Destaques Baixos/Médios, Semi-Destaques Laterais, Composições e Convidados.
6. FICHAS TÉCNICAS:
   - Bateria com 4 arranjos/bossas (nome, trecho do samba, sinal do mestre e defesa rítmica).
   - Samba-enredo com letra poética, defesa estrofe a estrofe e defesa melódica.

Retorne APENAS um objeto JSON válido, pronto para o motor do jogo, seguindo este esquema:
{
  "tituloEnredo": "${enredoTitle}",
  "justificativaEnredo": "Texto denso e formal de justificativa do enredo para os jurados da LIESA",
  "pesquisaBibliografica": ["Livro ou documento 1", "Tese ou consulta 2", "Arquivo 3"],
  "setores": [
    {
      "numeroSetor": 1,
      "tituloSetor": "Título Poético do Setor 1",
      "resumoConceitual": "Resumo conceitual do setor desdobrado da sinopse"
    }
  ],
  "elementos": [
    {
      "tipo": "comissao_frente" | "casal_mspb" | "ala" | "baianas" | "bateria" | "passistas" | "velha_guarda" | "tripe" | "abre_alas" | "alegoria" | "apoteose" | "musa_destaque_chao",
      "ordem": 1,
      "nomeElemento": "Nome poético do elemento",
      "categoryLabel": "Categoria (ex: Comissão de Frente, Ala 01, Abre-Alas, etc.)",
      "setorNumero": 1,
      "setorTitulo": "Título do Setor",
      "personagemOuConceito": "O que representa na narrativa",
      "defesaEnredo": "Texto de defesa para a comissão julgadora",
      "responsavelAla": "Nome do responsável ou ateliê",
      "highlightPeople": "Destaque central ou coreógrafo/mestre",
      "componentsCount": 15,
      "isAllegoryOrTripod": false,
      "detalhesPlasticos": {
        "paletaCores": ["#cor1", "#cor2"],
        "elementosVisuais": "Descrição minuciosa da cabeça, costeiro, corpo, tecidos e adereço de mão",
        "destaquesComposicoes": "Destaques centrais, laterais e composições de chassi (para alegorias)"
      }
    }
  ],
  "fichaBateria": {
    "mestreGeral": "${staff?.mestreBateria?.name || 'Mestre da Bateria'}",
    "diretores": "Diretores de Tamborim, Repique, Caixa e Marcação",
    "totalRitmistas": 250,
    "instrumentos": { "1ª Marcação": 14, "2ª Marcação": 14, "3ª Marcação": 14, "Caixa": 90, "Tarol": 30, "Tamborim": 35, "Repinique": 40, "Cuíca": 25, "Agogô": 24, "Chocalho": 25 },
    "particularidades": "Defesa conceitual da bateria alinhada ao enredo",
    "bossas": [
      {
        "numero": 1,
        "nome": "Nome do arranjo 1",
        "trechoSamba": "Verso do samba em que ocorre a bossa",
        "sinal": "Gesto do mestre",
        "defesa": "Defesa da convenção rítmica"
      }
    ]
  },
  "fichaSambaEnredo": {
    "compositores": ["Compositor 1", "Compositor 2"],
    "interprete": "${staff?.interprete?.name || 'Intérprete Oficial'}",
    "letra": "Letra completa do samba dividida em estrofes",
    "defesaLetra": [
      { "versoOuEstrofe": "Trecho da letra", "explicacao": "Defesa de como o verso traduz a sinopse" }
    ],
    "defesaMelodia": "Análise da tonalidade, modulações harmônicas e andamento"
  },
  "fichaComissaoFrente": {
    "coreografo": "${staff?.coreografo?.name || 'Coreógrafo Oficial'}",
    "nomeApresentacao": "Nome da coreografia",
    "elementoCenografico": "Nome e tipo do tripé/plataforma cênica",
    "totalComponentes": 15,
    "sinopseAcao": "Sinopse dramatúrgica da apresentação na pista",
    "atos": [
      { "ato": "Ato 1 - O Chamado", "descricao": "Descrição da movimentação cênica" },
      { "ato": "Ato 2 - O Conflito", "descricao": "Transformação e impacto visual" },
      { "ato": "Ato 3 - A Celebração", "descricao": "Bailado e efeito de palco" },
      { "ato": "Ato 4 - A Apoteose", "descricao": "Desfecho perante as cabines de jurados" }
    ]
  },
  "casaisMSPB": [
    {
      "numeroCasal": 1,
      "portaBandeira": "Nome da Porta-Bandeira",
      "mestreSala": "Nome do Mestre-Sala",
      "fantasiaCasal": "Nome da fantasia oficial",
      "fantasiaGuardioes": "Nome da fantasia dos guardiões",
      "defesaDança": "Defesa ritual da coreografia e reverência ao pavilhão"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        if (parsed && parsed.setores && parsed.elementos) {
          res.json(parsed);
          return;
        }
      }
    } catch {
      // Falha silenciosa na IA -> status 204 para fallback procedural local
    }
  }

  res.status(204).end();
});

/**
 * Endpoint do Laboratório de Enredo: Geração e ajuste de parâmetros com IA Gemini
 */
app.post('/api/enredo/laboratorio-gerar', async (req: Request, res: Response) => {
  const {
    themeType = 'Cultural',
    complexity = 3,
    tone = 'Poético & Lírico',
    customKeywords = '',
    schoolName = 'Escola de Samba',
    division = 'especial',
    colors = ['Verde', 'Rosa']
  } = req.body;

  if (process.env.GEMINI_API_KEY) {
    try {
      const complexityDesc =
        complexity === 1
          ? 'Nível 1 (Leve): narrativa festiva e direta, leitura visual transparente, refrões populares'
          : complexity === 2
          ? 'Nível 2 (Acessível): enredo comunicativo, imagens claras e forte empatia com o público'
          : complexity === 3
          ? 'Nível 3 (Equilibrada): pesquisa histórica bem delineada, metáforas sólidas e dramaturgia bem estruturada'
          : complexity === 4
          ? 'Nível 4 (Densa): rigor bibliográfico, passagens místicas, simbologias profundas e iconografia rica'
          : 'Nível 5 (Monumental): epopeia lírica monumental, camadas conceituais complexas, ápice de ambição plástica e poética';

      const prompt = `Você é um consagrado carnavalesco e enredista premiado do Carnaval do Rio de Janeiro (padrão LIESA / Série Ouro na Marquês de Sapucaí).
Sua missão no "Laboratório de Enredo" é conceber uma sinopse e estrutura de enredo totalmente original, lírica e cativante para a agremiação:
- Escola de Samba: ${schoolName}
- Divisão Atual: ${division}
- Cores Oficiais: ${Array.isArray(colors) ? colors.join(' e ') : colors}

PARÂMETROS DEFINIDOS PELO JOGADOR:
- Vertente Temática: "${themeType}"
- Grau de Complexidade Narrativa: ${complexity}/5 (${complexityDesc})
- Tom e Atmosfera da Proposta: "${tone}"
- Motivo Central / Inspiração / Palavras-chave do Jogador: "${customKeywords || 'Inovação poética conectada à tradição e ao pulsar da comunidade'}"

DIRETRIZES DA REDAÇÃO:
1. TÍTULO: Um título oficial autêntico de escola de samba, poético e musical.
2. SUBTÍTULO: Epígrafe ou subtítulo lírico de 1 a 2 linhas.
3. SINOPSE: Redija entre 3 e 4 parágrafos densos, fluídos e poéticos no padrão dos cadernos oficiais da LIESA. Use linguagem rica em metáforas carnavalescas (o alvorecer, a travessia, os saberes e a apoteose na passarela).
4. SETORIZAÇÃO: Liste exatamente ${complexity >= 4 ? 5 : 4} setores numerados com título poético e resumo da função narrativa na avenida.
5. DESTAQUES VISUAIS: Descreva brevemente a ideia para a Comissão de Frente, Carro Abre-Alas e a fantasia da Bateria.
6. JUSTIFICATIVA: Defesa concisa do enredo perante a comissão de jurados da LIESA.

Retorne EXCLUSIVAMENTE um objeto JSON válido (sem tags markdown ou texto fora do JSON):
{
  "title": "Título Oficial do Enredo",
  "subTitle": "Subtítulo / Epígrafe lírica",
  "themeType": "${themeType}",
  "complexity": ${complexity},
  "complexityLabel": "${
    complexity === 1 ? 'Leve (Nível 1)' :
    complexity === 2 ? 'Acessível (Nível 2)' :
    complexity === 3 ? 'Equilibrada (Nível 3)' :
    complexity === 4 ? 'Densa (Nível 4)' : 'Monumental (Nível 5)'
  }",
  "tone": "${tone}",
  "synopsis": "Texto completo da sinopse em 3 a 4 parágrafos separados por duas quebras de linha...",
  "justificativa": "Texto de defesa para os jurados da LIESA...",
  "qualityBoost": ${Math.min(15, 8 + Math.floor(complexity * 1.4))},
  "cost": ${Math.max(60000, complexity * 32000)},
  "suggestedSectors": [
    { "sector": 1, "title": "Título do Setor 1", "description": "Resumo do que o setor narra" },
    { "sector": 2, "title": "Título do Setor 2", "description": "Resumo do que o setor narra" },
    { "sector": 3, "title": "Título do Setor 3", "description": "Resumo do que o setor narra" },
    { "sector": 4, "title": "Título do Setor 4", "description": "Resumo do que o setor narra" }
  ],
  "visualHighlights": {
    "comissaoDeFrente": "Descrição da comissão de frente",
    "abreAlas": "Descrição cenográfica do abre-alas",
    "bateria": "Descrição da indumentária e bossas"
  }
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        if (parsed && parsed.title && parsed.synopsis) {
          res.json({
            ...parsed,
            id: `enr_gemini_${Date.now()}`,
            generatedWithAI: true
          });
          return;
        }
      }
    } catch (err) {
      console.warn('Erro ao chamar Gemini no Laboratório de Enredo, acionando fallback:', err);
    }
  }

  // Fallback procedural garantido
  const fallback = generateProceduralLabEnredo({
    themeType,
    complexity,
    tone,
    customKeywords,
    schoolName,
    division,
    colors
  });
  res.json(fallback);
});

// Inicialização do Vite middleware (dev) ou arquivos estáticos (prod)
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 SambaFoot Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
