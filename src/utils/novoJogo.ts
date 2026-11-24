import { atribuirEnredosAleatorios } from '../services/enredoService';
import { ESCOLAS_INICIAIS } from '../data/carnavalData';
import { DemonstrativoFinanceiroService } from '../services/demonstrativoFinanceiroService';
import { School } from '../types/carnaval';

// Ao inicializar o novo jogo:
export function criarNovoJogo(escolaEscolhidaId: string) {
  // Gera enredos aleatórios para todas as escolas ativas desde o ano 1 (2027)
  const escolasComEnredoAleatorio = atribuirEnredosAleatorios(
    ESCOLAS_INICIAIS,
    escolaEscolhidaId,
    { ano: 2027, preservarEnredoValido: false }
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
  const proximoAno = (estadoAtual.ano || 2027) + 1;
  // Garante enredos válidos, exclusivos e sincronizados para todas as escolas ativas,
  // preservando os enredos já atribuídos na virada de temporada (incluindo escolas recém-criadas e reativadas)
  const escolasAtualizadas = atribuirEnredosAleatorios(
    estadoAtual.escolas,
    estadoAtual.jogadorEscolaId,
    { ano: proximoAno, preservarEnredoValido: true }
  );

  return {
    ...estadoAtual,
    ano: proximoAno,
    faseTemporada: 'escolha_enredo',
    escolas: escolasAtualizadas
  };
}

