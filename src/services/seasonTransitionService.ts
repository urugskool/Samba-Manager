import { atribuirEnredosAleatorios } from './enredoService';

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
