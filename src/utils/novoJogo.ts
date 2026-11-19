import { atribuirEnredosAleatorios } from '../services/enredoService';
import { ESCOLAS_INICIAIS } from '../data/carnavalData';
import { DemonstrativoFinanceiroService } from '../services/demonstrativoFinanceiroService';
import { School } from '../types/carnaval';

// Ao inicializar o novo jogo:
export function criarNovoJogo(escolaEscolhidaId: string) {
  // Gera enredos aleatórios para todas as escolas desde o ano 1
  const escolasComEnredoAleatorio = atribuirEnredosAleatorios(
    ESCOLAS_INICIAIS,
    escolaEscolhidaId // Apenas a escola do jogador pode iniciar vazia para ele escolher, ou remova para sortear todas
  ) as School[];

  // Aplica valores igualitários de abertura de temporada por divisão (LIESA / LIGA-RJ / Superliga)
  const escolasComOrcamentoIgualitario = DemonstrativoFinanceiroService.inicializarOrcamentosIgualitarios(
    escolasComEnredoAleatorio,
    2027
  );

  return {
    ano: 2027,
    escolas: escolasComOrcamentoIgualitario,
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

