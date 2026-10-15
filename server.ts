import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

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
