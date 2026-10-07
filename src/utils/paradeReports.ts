import { School, SchoolParadeScores, TechnicalInfraction } from '../types/carnaval';

export interface ParadeReport {
  schoolId: string;
  totalScore: number;
  penalties: number;
  timePenalty: number;
  technicalPenalty: number;
  infractions: TechnicalInfraction[];
  verdictTitle: string;
  verdictStars: number;
  criticaSummary: string;
  timeMinutes: number;
  highlights: {
    bateria: string;
    comissao: string;
    casal: string;
    harmonia: string;
    alegorias: string;
    evolucao: string;
    obrigatoriedades?: string;
  };
}

export function generateParadeReport(
  school: School,
  scores?: SchoolParadeScores
): ParadeReport {
  const totalScore = scores?.finalScore ?? (scores?.totalScore ? scores.totalScore - (scores.penalties || 0) : school.attributes.harmonia * 2.7);
  const penalties = scores?.penalties ?? (scores?.timePenalty ?? 0);
  const timePenalty = scores?.timePenalty ?? 0;
  const technicalPenalty = scores?.technicalPenalty ?? 0;
  const infractions = scores?.infractions ?? [];
  const timeMinutes = scores?.paradeTimeMinutes ?? (penalties > 0 ? 82 : 75);

  let verdictTitle = 'Desfile Vibrante e Firme na Avenida';
  let verdictStars = 4;
  let criticaSummary = 'A agremiação cumpriu o regulamento com vigor, agradou o público nas arquibancadas e deixou uma impressão positiva na passarela.';

  // Escala oficial de até 270.0 pontos (com descarte da menor nota)
  if (totalScore >= 269.4) {
    verdictTitle = 'Desfile Apoteótico • Forte Candidata ao Título!';
    verdictStars = 5;
    criticaSummary = 'Um espetáculo antológico que levantou as arquibancadas do início ao fim! Forte candidata a erguer o troféu de campeã.';
  } else if (totalScore >= 268.4) {
    verdictTitle = 'Desfile Impecável • Destaque Técnico e Canto Forte';
    verdictStars = 4.5;
    criticaSummary = 'Apresentação técnica irrepreensível, harmonia afinadíssima e forte presença plástica. Postulante consolidada às primeiras posições.';
  } else if (totalScore >= 267.0) {
    verdictTitle = 'Desfile Técnico e Empolgante';
    verdictStars = 4;
    criticaSummary = 'Passagem segura pelos setores da avenida, sustentação de canto consistente e boa recepção dos jurados em todos os módulos.';
  } else if (totalScore >= 265.0) {
    verdictTitle = 'Desfile Regular com Pequenas Oscilações';
    verdictStars = 3.5;
    criticaSummary = 'A escola desfilou com garra, mas enfrentou momentos de lentidão ou oscilação na evolução que podem acarretar perda de décimos preciosos.';
  } else {
    verdictTitle = 'Desfile Tenso com Dificuldades Técnicas';
    verdictStars = 3;
    criticaSummary = 'Desfile com falhas perceptíveis de acabamento ou compasso, exigindo superação na apuração para evitar a zona perigosa da tabela.';
  }

  const enredoTitle = school.currentEnredo?.title || 'o enredo do Carnaval';

  const bateriaHighlight =
    (scores?.scoresByQuesito.bateria?.[0] ?? 10) >= 9.95
      ? `A bateria comandada por ${school.staff.mestreBateria.name} arrebatou o público! Paradinhas históricas, afinação impecável e o recuo veio abaixo em festa.`
      : `O mestre ${school.staff.mestreBateria.name} manteve a cadência firme e segura, garantindo o ritmo contagiante dos componentes do começo ao fim.`;

  const comissaoHighlight =
    (scores?.scoresByQuesito.comissaoDeFrente?.[0] ?? 10) >= 9.95
      ? `Impacto teatral deslumbrante concebido por ${school.staff.coreografo.name}! Coreografia emocionante e aplausos unânimes nas cabines de jurados.`
      : `A comissão coreografada por ${school.staff.coreografo.name} abriu os trabalhos com precisão geométrica e reverência impecável ao público.`;

  const casalHighlight =
    (scores?.scoresByQuesito.mestreSalaPortaBandeira?.[0] ?? 10) >= 9.95
      ? `O 1º casal ${school.staff.mestreSalaPortaBandeira.name} flutuou pela passarela! Giros milimétricos e o pavilhão sagrado protegido com nobreza magistral.`
      : `${school.staff.mestreSalaPortaBandeira.name} defenderam as cores da agremiação com sincronismo apurado e elegância tradicional.`;

  const harmoniaHighlight =
    (scores?.scoresByQuesito.harmonia?.[0] ?? 10) >= 9.95
      ? `O intérprete ${school.staff.interprete.name} incendiou a avenida! A comunidade cantou '${enredoTitle}' a plenos pulmões sem deixar o samba cair.`
      : `${school.staff.interprete.name} conduziu o canto com segurança e a escola respondeu aos refrões com entusiasmo e fidelidade melódica.`;

  const alegoriasHighlight =
    (scores?.scoresByQuesito.alegorias?.[0] ?? 10) >= 9.95
      ? `Trabalho monumental de ${school.staff.carnavalesco.name}! Alegorias suntuosas, acabamento de alto luxo e efeito visual digno dos grandes carnavais.`
      : `${school.staff.carnavalesco.name} apresentou um conjunto plástico harmônico, com alas coloridas que contaram a história com clareza.`;

  let evolucaoHighlight = `Evolução cronometrada com perfeição! Portões fechados com tranquilidade aos ${timeMinutes} minutos regulamentares, dentro da janela oficial sem qualquer penalidade de tempo.`;
  if (scores?.timeStatus === 'estouro' || (timePenalty > 0 && (scores?.timeDifferenceMinutes ?? 1) > 0 && scores?.timeStatus !== 'abaixo')) {
    const diff = scores?.timeDifferenceMinutes || Math.round(timePenalty * 10);
    evolucaoHighlight = `⚠️ Atenção: A agremiação encerrou o desfile aos ${timeMinutes} minutos com estouro de cronômetro (+${diff} min além do tempo máximo regulamentar), sofrendo penalidade oficial de -${timePenalty.toFixed(1)} ponto (-0,1 pt por minuto excedido).`;
  } else if (scores?.timeStatus === 'abaixo') {
    const diff = scores?.timeDifferenceMinutes || Math.round(timePenalty * 10);
    evolucaoHighlight = `⚠️ Atenção: A agremiação encerrou o desfile aos ${timeMinutes} minutos abaixo do tempo mínimo regulamentar (-${diff} min abaixo), sofrendo penalidade oficial de -${timePenalty.toFixed(1)} ponto (-0,1 pt por minuto fora do limite).`;
  } else if (timePenalty > 0) {
    evolucaoHighlight = `⚠️ Atenção: A agremiação encerrou o desfile aos ${timeMinutes} minutos fora do tempo regulamentar, sofrendo penalidade de -${timePenalty.toFixed(1)} ponto.`;
  }

  let obrigatoriedadesHighlight = '✓ Vistoria de pista aprovada: Todas as obrigatoriedades técnicas e contingentes mínimos foram plenamente cumpridos.';
  if (infractions.length > 0) {
    obrigatoriedadesHighlight = `⚠️ Infração de Regulamento: Foram detectadas ${infractions.length} irregularidades na vistoria técnica, acarretando penalização de -${technicalPenalty.toFixed(1)} ponto(s): ${infractions.map(i => i.ruleName).join('; ')}.`;
  }

  return {
    schoolId: school.id,
    totalScore,
    penalties,
    timePenalty,
    technicalPenalty,
    infractions,
    verdictTitle,
    verdictStars,
    criticaSummary,
    timeMinutes,
    highlights: {
      bateria: bateriaHighlight,
      comissao: comissaoHighlight,
      casal: casalHighlight,
      harmonia: harmoniaHighlight,
      alegorias: alegoriasHighlight,
      evolucao: evolucaoHighlight,
      obrigatoriedades: obrigatoriedadesHighlight
    }
  };
}
