import { atribuirEnredosAleatorios } from '../services/enredoService';
import { ESCOLAS_INICIAIS } from '../data/carnavalData';

// Ao inicializar o novo jogo:
export function criarNovoJogo(escolaEscolhidaId: string) {
  // Gera enredos aleatórios para todas as escolas desde o ano 1
  const escolasComEnredoAleatorio = atribuirEnredosAleatorios(
    ESCOLAS_INICIAIS,
    escolaEscolhidaId // Apenas a escola do jogador pode iniciar vazia para ele escolher, ou remova para sortear todas
  );

  return {
    ano: 2026,
    escolas: escolasComEnredoAleatorio,
    // ...demais dados do save
  };
}

export function iniciarNovaTemporada(estadoAtual: any) {
  // Sorteia novos enredos para as IAs para a temporada seguinte
  const escolasAtualizadas = atribuirEnredosAleatorios(
    estadoAtual.escolas,
    estadoAtual.jogadorEscolaId // Mantém a do jogador limpa para ele definir na tela de enredo
  );

  return {
    ...estadoAtual,
    ano: estadoAtual.ano + 1,
    faseTemporada: 'escolha_enredo',
    escolas: escolasAtualizadas
  };
}

