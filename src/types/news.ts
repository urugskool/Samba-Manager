export type NewsPortal =
  | 'G1 Carnaval'
  | 'Portal SRzd / Carnavalesco'
  | 'Resenha dos Sambistas'
  | 'Voz do Terreiro';

export type NewsCategory =
  | 'MERCADO'
  | 'ENREDO'
  | 'ORDEM_DESFILE'
  | 'BARRACAO'
  | 'APURACAO'
  | 'HISTORICO';

export interface NewsComment {
  autor: string;
  tipo: 'DIRETORIA' | 'TORCEDOR' | 'ESPECIALISTA';
  texto: string;
}

export interface NewsArticle {
  id: string;
  portal: NewsPortal;
  dataTemporada: string;
  manchete: string;
  subtitulo: string;
  corpo: string;
  categoria: NewsCategory;
  escolaEnvolvida: string;
  escolaId?: string;
  impactoMoral: number; // -10 a +10
  comentarios: NewsComment[];
  year: number;
  monthId?: string;
  timestamp: string;
  read?: boolean;
}

export interface NewsExportFormat {
  noticia: {
    portal: string;
    dataTemporada: string;
    manchete: string;
    subtitulo: string;
    corpo: string;
    categoria: string;
    escolaEnvolvida: string;
    impactoMoral: number;
    comentarios: NewsComment[];
  };
}
