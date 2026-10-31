/**
 * REGISTRO HISTÓRICO OFICIAL DA SÉRIE OURO (LIGA-RJ)
 * 
 * Fonte da verdade para resultados históricos oficiais, colocações, enredos
 * e movimentações de acesso e rebaixamento da Série Ouro do Carnaval Carioca.
 */

import type { YearHistory, School } from '../types/carnaval';
import { cleanSchoolName } from '../utils/schoolNameUtils';

export interface OuroStandingRecord {
  rank: number;
  schoolId: string;
  schoolName: string;
  totalScore?: number;
  enredo?: string;
  promoted?: boolean; // Subiu ao Grupo Especial
  relegated?: boolean; // Rebaixada para Série Prata
  isHorsConcours?: boolean; // Desfilou sem julgamento
  statusDescription?: string;
}

export interface OuroHistoricalCarnaval {
  year: number;
  standings: OuroStandingRecord[];
  notes?: string;
  championNames: string[];
  viceChampionNames: string[];
  promotedNames: string[];
  relegatedNames: string[];
  totalSchools: number;
  isNoCarnaval?: boolean;
}

/**
 * Resultados Oficiais da Série Ouro catalogados por ano
 */
export const OFFICIAL_OURO_HISTORICAL_STANDINGS: Record<number, OuroStandingRecord[]> = {
  2026: [
    {
      rank: 1,
      schoolId: 'marica',
      schoolName: 'União de Maricá',
      enredo: 'Berenguendéns & Balangandãs',
      totalScore: 269.9,
      promoted: true,
      statusDescription: 'Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'imperio_serrano',
      schoolName: 'Império Serrano',
      enredo: 'Ponciá Evaristo, Flor do Mulungu',
      totalScore: 269.8,
      statusDescription: 'Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Kunhã-Eté: O Sopro Sagrado da Jurema',
      totalScore: 269.7,
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'uniao_da_ilha',
      schoolName: 'União da Ilha do Governador',
      enredo: 'Viva o hoje! O amanhã? Fica pra Depois',
      totalScore: 269.5,
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Salve Todas as Marias – Laroyê, Pombagiras!',
      totalScore: 269.4,
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'Tata Tancredo - O Papa Negro no Terreiro do Estácio',
      totalScore: 269.2,
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'porto_da_pedra',
      schoolName: 'Unidos do Porto da Pedra',
      enredo: 'Das Mais Antigas da Vida, o Doce e Amargo Beijo da Noite',
      totalScore: 269.0,
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'parque_acari',
      schoolName: 'União do Parque Acari',
      enredo: 'Brasiliana',
      totalScore: 268.8,
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'botafogo_samba_clube',
      schoolName: 'Botafogo Samba Clube',
      enredo: 'O Brasil que Floresce em Arte',
      totalScore: 268.7,
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'vigario_geral',
      schoolName: 'Acadêmicos de Vigário Geral',
      enredo: 'Brasil Incógnito - O Que Os Seus Olhos Não Veem, A Minha Imaginação Reinventa',
      totalScore: 268.5,
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Tamborzão – O Rio é Baile! O Poder é Black!',
      totalScore: 268.4,
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'As Coisas que Mamãe me Ensinou',
      totalScore: 268.2,
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'arranco',
      schoolName: 'Arranco do Engenho de Dentro',
      enredo: 'A Gargalhada é o Xamego da Vida',
      totalScore: 268.0,
      statusDescription: '13º Lugar'
    },
    {
      rank: 14,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'O Sonho de um Tal Pagode Russo nos Frevos do meu Pernambuco',
      totalScore: 267.8,
      statusDescription: '14º Lugar'
    },
    {
      rank: 15,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'O ar que se respira agora inspira novos tempos',
      totalScore: 267.6,
      statusDescription: '15º Lugar'
    }
  ],
  2025: [
    {
      rank: 1,
      schoolId: 'niteroi',
      schoolName: 'Acadêmicos de Niterói',
      enredo: 'Vixe Maria',
      totalScore: 269.8,
      promoted: true,
      statusDescription: 'Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'O Leão se Engerou em Encantado Amazônico',
      totalScore: 269.6,
      statusDescription: 'Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'porto_da_pedra',
      schoolName: 'Unidos do Porto da Pedra',
      enredo: 'A História que a Borracha do Tempo não Apagou!',
      totalScore: 269.5,
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'uniao_da_ilha',
      schoolName: 'União da Ilha do Governador',
      enredo: 'BA-DER-NA! Maria do Povo',
      totalScore: 269.3,
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'marica',
      schoolName: 'União de Maricá',
      enredo: 'O Cavalo de Santíssimo e a Coroa do Seu 7',
      totalScore: 269.2,
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'vigario_geral',
      schoolName: 'Acadêmicos de Vigário Geral',
      enredo: 'Ecos de um Vagalume',
      totalScore: 269.0,
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'arranco',
      schoolName: 'Arranco do Engenho de Dentro',
      enredo: 'Mães que Alimentam o Sagrado',
      totalScore: 268.8,
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'parque_acari',
      schoolName: 'União do Parque Acari',
      enredo: 'Cordas de Prata, o Retrato Musical do Povo',
      totalScore: 268.6,
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Ópera dos Terreiros - O Canto do Encanto da Alma Brasileira',
      totalScore: 268.5,
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'Ewe, a Cura vem da Floresta',
      totalScore: 268.4,
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'botafogo_samba_clube',
      schoolName: 'Botafogo Samba Clube',
      enredo: 'Uma Gloriosa História em Preto e Branco',
      totalScore: 268.2,
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'A São Clemente dá Voz a quem não tem',
      totalScore: 267.9,
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para a Série Prata'
    },
    {
      rank: 13,
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'Reza',
      totalScore: 267.7,
      relegated: true,
      statusDescription: '13º Lugar • Rebaixada para a Série Prata'
    },
    {
      rank: 0,
      schoolId: 'imperio_serrano',
      schoolName: 'Império Serrano',
      enredo: 'O que Espanta Miséria é Festa',
      isHorsConcours: true,
      statusDescription: 'Não julgada - hors concours'
    },
    {
      rank: 0,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Antropoceno',
      isHorsConcours: true,
      statusDescription: 'Não julgada - hors concours'
    },
    {
      rank: 0,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: "Maraka' Anandê: Resistência Ancestral",
      isHorsConcours: true,
      statusDescription: 'Não julgada - hors concours'
    }
  ],
  2024: [
    {
      rank: 1,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'O Redentor do Sertão',
      totalScore: 270.0,
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Promovida ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'imperio_serrano',
      schoolName: 'Império Serrano',
      enredo: 'Ilú-ọba Ọ̀yọ́: a gira dos ancestrais',
      totalScore: 269.8,
      statusDescription: '2º Lugar • Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'Chão de devoção: orgulho ancestral',
      totalScore: 269.6,
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'marica',
      schoolName: 'União de Maricá',
      enredo: 'O esperançar do poeta',
      totalScore: 269.5,
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Que grande destino reservam pra você!',
      totalScore: 269.4,
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'Debret pintou, camelô gritou: compre 2 leve 3! Tudo para agradar o freguês!',
      totalScore: 269.4,
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'uniao_da_ilha',
      schoolName: 'União da Ilha do Governador',
      enredo: 'Doum e Amora: crianças para transformar o mundo!',
      totalScore: 268.8,
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'niteroi',
      schoolName: 'Acadêmicos de Niterói',
      enredo: 'Catopês – Um céu de fitas',
      totalScore: 268.7,
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'vigario_geral',
      schoolName: 'Acadêmicos de Vigário Geral',
      enredo: 'Maracanaú: Bem-vindos ao maior São João do Planeta!',
      totalScore: 268.7,
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'Jorge da Capadócia',
      totalScore: 268.1,
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Tendendém - O axé do epô pupá',
      totalScore: 267.9,
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'A nossa luta continua',
      totalScore: 267.7,
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'parque_acari',
      schoolName: 'União do Parque Acari',
      enredo: 'Ilê Aiyê, 50 anos de luta e de resistência',
      totalScore: 267.3,
      statusDescription: '13º Lugar'
    },
    {
      rank: 14,
      schoolId: 'arranco',
      schoolName: 'Arranco do Engenho de Dentro',
      enredo: 'Nise - Reimaginação da Loucura',
      totalScore: 267.3,
      statusDescription: '14º Lugar'
    },
    {
      rank: 15,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Sou Lia de Itamaracá cirandando a vida na beira do mar',
      totalScore: 266.4,
      relegated: true,
      statusDescription: '15ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 16,
      schoolId: 'sereno_campo_grande',
      schoolName: 'Sereno de Campo Grande',
      enredo: '4 de dezembro',
      totalScore: 265.5,
      relegated: true,
      statusDescription: '16ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  2023: [
    {
      rank: 1,
      schoolId: 'porto_da_pedra',
      schoolName: 'Unidos do Porto da Pedra',
      enredo: 'A Invenção da Amazônia',
      totalScore: 269.7,
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Promovida ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Baião de Mouros',
      totalScore: 269.5,
      statusDescription: '2º Lugar • Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'Mulheres de Barro',
      totalScore: 269.4,
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Cores do Axé',
      totalScore: 269.1,
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'niteroi',
      schoolName: 'Acadêmicos de Niterói',
      enredo: 'O Carnaval da Vitória',
      totalScore: 269.0,
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'uniao_da_ilha',
      schoolName: 'União da Ilha do Governador',
      enredo: 'O Encontro das Águias no Templo de Momo',
      totalScore: 268.9,
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'O Achamento do Velho Mundo',
      totalScore: 268.8,
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'São João, São Luís, Maranhão! Acende a Fogueira do Meu Coração!',
      totalScore: 268.7,
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'Aganjú - A Visão do Fogo, A Voz do Trovão no Reino de Oyó',
      totalScore: 268.6,
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'vigario_geral',
      schoolName: 'Acadêmicos de Vigário Geral',
      enredo: 'A Fantástica Fábrica da Alegria',
      totalScore: 268.5,
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Liberte Nosso Sagrado: O Legado Ancestral de Mãe Meninazinha de Oxum',
      totalScore: 268.4,
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Zé Espinguela - Chão do Meu Terreiro',
      totalScore: 268.3,
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Esperança, Presente!',
      totalScore: 268.2,
      statusDescription: '13º Lugar'
    },
    {
      rank: 14,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Madame Satã: Resistir Para Existir',
      totalScore: 267.6,
      relegated: true,
      statusDescription: '14ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 15,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Manoel Congo, Mariana Crioula - Heróis da Liberdade no Vale do Café',
      totalScore: 266.9,
      relegated: true,
      statusDescription: '15ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  2022: [
    {
      rank: 1,
      schoolId: 'imperio_serrano',
      schoolName: 'Império Serrano',
      enredo: 'Mangangá',
      totalScore: 269.9,
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Promovida ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'porto_da_pedra',
      schoolName: 'Unidos do Porto da Pedra',
      enredo: 'O Caçador que traz Alegrias',
      totalScore: 269.5,
      statusDescription: '2º Lugar • Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'uniao_da_ilha',
      schoolName: 'União da Ilha do Governador',
      enredo: 'O Vendedor de Orações',
      totalScore: 269.4,
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'A Meia-Noite dos Tambores Silenciosos',
      totalScore: 269.4,
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Iroko - É Tempo de Xirê',
      totalScore: 269.3,
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'academicos_do_sossego',
      schoolName: 'Acadêmicos do Sossego',
      enredo: 'Visões Xamânicas',
      totalScore: 268.6,
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'Deu Castor na Cabeça',
      totalScore: 268.5,
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'Cobra Coral, Papagaio-Vintém. #VESTIRUBRONEGRO não tem pra ninguém',
      totalScore: 268.4,
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Samba de Quilombo - A Resistência pela Raiz',
      totalScore: 268.2,
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'vigario_geral',
      schoolName: 'Acadêmicos de Vigário Geral',
      enredo: 'Pequena África: da Escravidão ao Pertencimento - Camadas de Memórias entre o Mar e o Morro',
      totalScore: 268.1,
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Santa Dulce dos Pobres - O Anjo Bom da Bahia',
      totalScore: 268.0,
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Mussum Pra Sempris - Traga o Mé que hoje com a Lins vai ter muito samba no pé!',
      totalScore: 267.8,
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: '33 - Destino Dom Pedro II',
      totalScore: 267.5,
      statusDescription: '13º Lugar'
    },
    {
      rank: 14,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Axé! Milton Gonçalves no Catupé da Santa Cruz',
      totalScore: 267.3,
      relegated: true,
      statusDescription: '14ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 15,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'O Amor Preto Cura: Chica Xavier, a Mãe Baiana do Brasil',
      totalScore: 266.6,
      relegated: true,
      statusDescription: '15ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  2021: [],
  2020: [
    {
      rank: 1,
      schoolId: 'imperatriz',
      schoolName: 'Imperatriz Leopoldinense',
      enredo: 'Só dá Lalá',
      totalScore: 270.0,
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã e Promovida ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Ginga',
      totalScore: 269.6,
      statusDescription: 'Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'porto_da_pedra',
      schoolName: 'Unidos do Porto da Pedra',
      enredo: 'O que é que a Baiana tem? Do Bonfim à Sapucaí',
      totalScore: 269.2,
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'Marta do Brasil - Chorar no Começo para Sorrir no Fim',
      totalScore: 268.8,
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'A Voz da Liberdade',
      totalScore: 268.8,
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Quimeras de um Eterno Aprendiz',
      totalScore: 268.6,
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Santa Cruz de Barbalha - Um conto popular no Cariri Cearense',
      totalScore: 268.5,
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'academicos_do_sossego',
      schoolName: 'Acadêmicos do Sossego',
      enredo: 'Os Tambores de Olokun',
      totalScore: 268.1,
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'imperio_serrano',
      schoolName: 'Império Serrano',
      enredo: 'Lugar de Mulher é onde ela Quiser!',
      totalScore: 268.1,
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'Memórias de um Griô: a Diáspora Africana numa Idade nada Moderna e muito menos Contemporânea',
      totalScore: 268.1,
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'vigario_geral',
      schoolName: 'Acadêmicos de Vigário Geral',
      enredo: 'O Conto do Vigário',
      totalScore: 267.8,
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Elos da Eternidade',
      totalScore: 267.2,
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'Eu que te Benzo, Deus que te Cura',
      totalScore: 266.1,
      relegated: true,
      statusDescription: '13ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 14,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'A Guerreira Negra que Dominou Dois Mundos',
      totalScore: 265.4,
      relegated: true,
      statusDescription: '14ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  2019: [
    {
      rank: 1,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'A Fé que Emerge das Águas',
      totalScore: 270.0,
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã e Promovida ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Igbá Cubango - A Alma das Coisas e a Arte dos Milagres',
      totalScore: 269.3,
      statusDescription: 'Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'porto_da_pedra',
      schoolName: 'Unidos do Porto da Pedra',
      enredo: 'Antônio Pitanga - Um Negro em Movimento',
      totalScore: 269.0,
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Império do Café, o Vale da Esperança',
      totalScore: 269.0,
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Ruth de Souza – Senhora Liberdade, Abre as Asas sobre Nós',
      totalScore: 268.8,
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Qualquer Semelhança não terá sido mera Coincidência',
      totalScore: 268.8,
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'Dois de Fevereiro, no Rio Vermelho',
      totalScore: 268.6,
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'Do Ventre da Terra, Raízes para o Mundo',
      totalScore: 268.6,
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'O Frasco do Bandoleiro',
      totalScore: 268.4,
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Oferendas',
      totalScore: 267.7,
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Bananas para o Preconceito',
      totalScore: 267.3,
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'academicos_do_sossego',
      schoolName: 'Acadêmicos do Sossego',
      enredo: 'Não se meta com minha fé, acredito em quem quiser',
      totalScore: 267.3,
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'alegria_da_zona_sul',
      schoolName: 'Alegria da Zona Sul',
      enredo: 'Saravá, Umbanda!',
      totalScore: 265.3,
      relegated: true,
      statusDescription: '13ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  2018: [
    {
      rank: 1,
      schoolId: 'viradouro',
      schoolName: 'Unidos do Viradouro',
      enredo: 'Vira a Cabeça, pira o Coração. Loucos Gênios da Criação',
      totalScore: 269.7,
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã e Promovida ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'O Eldorado Submerso - Delírio Tupi-Parintintin',
      totalScore: 269.4,
      statusDescription: 'Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'porto_da_pedra',
      schoolName: 'Unidos do Porto da Pedra',
      enredo: 'Rainhas do Rádio - Nas Ondas da Emoção, o Tigre Coroa as Divas da Canção!',
      totalScore: 269.0,
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'Mojú, Magé, Mojubá - Sinfonias e Batuques',
      totalScore: 268.4,
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'O Rei que Bordou o Mundo',
      totalScore: 268.0,
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'No Pregão da Folia sou Comerciante da Alegria e com a Estácio Boto Banca na Avenida',
      totalScore: 267.8,
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Olubajé – Um Banquete para o Rei',
      totalScore: 267.7,
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'alegria_da_zona_sul',
      schoolName: 'Alegria da Zona Sul',
      enredo: 'Bravos Malês! A Saga de Luiza Mahin',
      totalScore: 267.7,
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'Renascer de Flechas e de Lobos',
      totalScore: 267.4,
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'No Vôo Mágico da Esperança, quem Acredita sempre Alcança',
      totalScore: 267.1,
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Madeira Matriz',
      totalScore: 267.1,
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'A Travessia da Calunga Grande e a Nobreza Negra no Brasil',
      totalScore: 266.7,
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'academicos_do_sossego',
      schoolName: 'Acadêmicos do Sossego',
      enredo: 'Ritualis',
      totalScore: 265.9,
      statusDescription: '13º Lugar'
    }
  ],
  2017: [
    {
      rank: 1,
      schoolId: 'imperio_serrano',
      schoolName: 'Império Serrano',
      enredo: 'Meu quintal é maior do que o mundo',
      totalScore: 269.8,
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã e Promovida ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'viradouro',
      schoolName: 'Unidos do Viradouro',
      enredo: 'E todo menino é um Rei',
      totalScore: 269.7,
      statusDescription: 'Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'É! O moleque desceu o São Carlos, pegou um sonho e partiu com a Estácio!',
      totalScore: 269.1,
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Ossaim: o poder da cura',
      totalScore: 268.9,
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'porto_da_pedra',
      schoolName: 'Unidos do Porto da Pedra',
      enredo: 'O Abre-alas que as Marchinhas vão passar! Porto da Pedra é quem vai ganhar... seu coração!',
      totalScore: 268.2,
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'No saçarico do Marquês, tem mais um freguês. Viriato Ferreira',
      totalScore: 266.6,
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'O Último dos Profetas',
      totalScore: 266.3,
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Versando Nogueira nos cem anos do ritmo que é nó na madeira!',
      totalScore: 265.6,
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'Vilões - o verso do inverso',
      totalScore: 265.2,
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'O Papel e o Mar',
      totalScore: 265.1,
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'academicos_do_sossego',
      schoolName: 'Acadêmicos do Sossego',
      enredo: 'Zezé Motta - A deusa de ébano!',
      totalScore: 264.5,
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Vou levar somente o que couber no bolso e no coração... uma viagem de sabedoria além da imaginação',
      totalScore: 264.2,
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'alegria_da_zona_sul',
      schoolName: 'Alegria da Zona Sul',
      enredo: 'Vou festejar com Beth Carvalho, a Madrinha do Samba',
      totalScore: 263.3,
      statusDescription: '13º Lugar'
    },
    {
      rank: 14,
      schoolId: 'curicica',
      schoolName: 'União do Parque Curicica',
      enredo: 'O importante é ser feliz e mais nada!',
      totalScore: 262.1,
      relegated: true,
      statusDescription: '14ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  2016: [
    {
      rank: 1,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'A Farra do Boi',
      totalScore: 269.9,
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã e Promovida ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'O Quinto dos Infernos!',
      totalScore: 269.2,
      statusDescription: 'Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'viradouro',
      schoolName: 'Unidos do Viradouro',
      enredo: 'O Alabê de Jerusalém, a saga de Ogundana!',
      totalScore: 269.0,
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'imperio_serrano',
      schoolName: 'Império Serrano',
      enredo: 'Silas canta Serrinha!',
      totalScore: 268.4,
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'porto_da_pedra',
      schoolName: 'Unidos do Porto da Pedra',
      enredo: 'Palhaço Carequinha, paixão e orgulho de São Gonçalo. Tá certo ou não tá?',
      totalScore: 267.9,
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Um banho de mar à fantasia',
      totalScore: 267.8,
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'O tempo ruge, A Sapucaí é grande e o Império aplaude o Felomenal!',
      totalScore: 267.7,
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'Ibejís - Nas brincadeiras de criança: os orixás que viraram santos no Brasil',
      totalScore: 266.5,
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'Cacá Diegues - Retratos de um Brasil em cena!',
      totalScore: 266.1,
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'alegria_da_zona_sul',
      schoolName: 'Alegria da Zona Sul',
      enredo: 'Ogum',
      totalScore: 265.9,
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'curicica',
      schoolName: 'União do Parque Curicica',
      enredo: 'Corações Mamulengos',
      totalScore: 265.6,
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Diz mata! Digo verde. A natureza veste a incerteza. E o amanhã?',
      totalScore: 265.3,
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Nova Roma é Brasil, Brasil é Rocinha!',
      totalScore: 263.5,
      statusDescription: '13º Lugar'
    },
    {
      rank: 14,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Tem gringo no samba!',
      totalScore: 262.0,
      relegated: true,
      statusDescription: '14ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  2015: [
    {
      rank: 1,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'De braços abertos, de janeiro à janeiro. Sorrio, sou Rio, sou Estácio de Sá!',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'O cavaleiro armorial mandacariza o Carnaval',
      statusDescription: '2ª Colocada • Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'imperio_serrano',
      schoolName: 'Império Serrano',
      enredo: 'Poema aos peregrinos da fé!',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Cubango, a realeza africana de Niterói!',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Curumim chama Cunhantã que eu vou contar...',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'O Império nas águas doces de Oxum',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Na minha mão é mais barato!',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'Nelson Sargento - Samba, inocente pé no chão!',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'Candeia! Manifesto ao povo em forma de arte!',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Um pequeno menino se tonou um Grande Otelo!',
      statusDescription: '10ª Colocada'
    },
    {
      rank: 11,
      schoolId: 'porto_da_pedra',
      schoolName: 'Unidos do Porto da Pedra',
      enredo: 'Há uma luz que nunca se apaga!',
      statusDescription: '11ª Colocada'
    },
    {
      rank: 12,
      schoolId: 'curicica',
      schoolName: 'União do Parque Curicica',
      enredo: 'Os três tenores... do samba!',
      statusDescription: '12ª Colocada'
    },
    {
      rank: 13,
      schoolId: 'alegria_da_zona_sul',
      schoolName: 'Alegria da Zona Sul',
      enredo: 'Kari’Oka',
      statusDescription: '13ª Colocada'
    },
    {
      rank: 14,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'Imperium',
      relegated: true,
      statusDescription: '14ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 15,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'No coração da cidade, uma história das Mil e Uma Noites: O Rio das Arábias',
      relegated: true,
      statusDescription: '15ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  2014: [
    {
      rank: 1,
      schoolId: 'viradouro',
      schoolName: 'Unidos do Viradouro',
      enredo: 'Sou a terra de Ismael. Guanabaran vou cruzar, para você tiro o chapéu, Rio eu vim te abraçar',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'Um Rio à beira-mar: ventos do passado em direção ao futuro!',
      statusDescription: '2ª Colocada • Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Decifra-me ou te devoro: enigmas da vida!',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'porto_da_pedra',
      schoolName: 'Unidos do Porto da Pedra',
      enredo: 'Majestades do Samba: os defensores do meu pavilhão!',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Continente Negro - uma epopeia africana',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'imperio_serrano',
      schoolName: 'Império Serrano',
      enredo: 'Angra com os Reis',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'curicica',
      schoolName: 'União do Parque Curicica',
      enredo: 'Na garrafa, no barril, salve a cachaça, patrimônio cultural do Brasil',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Kizomba - A festa da raça',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Dos malandros e das madames: Lapa, a estrela da noite carioca',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'O triunfo da América - o canto lírico de Joaquina Lapinha',
      statusDescription: '10ª Colocada'
    },
    {
      rank: 11,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'Olhar caricato. Simplesmente, Lan!',
      statusDescription: '11ª Colocada'
    },
    {
      rank: 12,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Do toque do criador à cidade saudável do Brasil – Jundiaí, uma referência nacional',
      statusDescription: '12ª Colocada'
    },
    {
      rank: 13,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Os Sertões',
      statusDescription: '13ª Colocada'
    },
    {
      rank: 14,
      schoolId: 'alegria_da_zona_sul',
      schoolName: 'Alegria da Zona Sul',
      enredo: 'Sacopenapã',
      statusDescription: '14ª Colocada'
    },
    {
      rank: 15,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Os Iorubás - A história do povo nagô',
      relegated: true,
      statusDescription: '15ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 16,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Do paraíso sonhado um sonho realizado...',
      relegated: true,
      statusDescription: '16ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 17,
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'Sonhar com Rei dá Leão!',
      relegated: true,
      statusDescription: '17ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  2013: [
    {
      rank: 1,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Negra, pérola mulher',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'viradouro',
      schoolName: 'Unidos do Viradouro',
      enredo: 'Nem melhor nem pior, que não sai da minha mente. Inspiração para o meu samba, eu também sou diferente!',
      statusDescription: '2ª Colocada • Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'imperio_serrano',
      schoolName: 'Império Serrano',
      enredo: 'Caxambu - O milagre das águas na fonte do samba',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'Rildo Hora: A ópera de um menino... O toque do realejo rege o seu destino!',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Mistura de sabores e raças: uma feijoada à brasileira',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Fanatismo... Enigma da mente humana',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'O reencontro entre o céu e a terra no reino de Aláàfin Óyo',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'Rio, uma viagem alucinante',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'porto_da_pedra',
      schoolName: 'Unidos do Porto da Pedra',
      enredo: 'Me digas o que calças e eu te direis quem és!',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'O dragão do mar e a lenda do Ceará',
      statusDescription: '10ª Colocada'
    },
    {
      rank: 11,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Teimosias da imaginação',
      statusDescription: '11ª Colocada'
    },
    {
      rank: 12,
      schoolId: 'curicica',
      schoolName: 'União do Parque Curicica',
      enredo: 'Quando o samba era samba',
      statusDescription: '12ª Colocada'
    },
    {
      rank: 13,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Ao mestre do riso com carinho: as caras do Brasil',
      statusDescription: '13ª Colocada'
    },
    {
      rank: 14,
      schoolId: 'alegria_da_zona_sul',
      schoolName: 'Alegria da Zona Sul',
      enredo: 'Quem não chora, não mama...',
      statusDescription: '14ª Colocada'
    },
    {
      rank: 15,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Dos Barões do café à cidade universitária. Vassouras, ouro verde do Brasil!',
      statusDescription: '15ª Colocada'
    },
    {
      rank: 16,
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'Das maravilhas do mar, fez-se o esplendor de uma noite',
      statusDescription: '16ª Colocada'
    },
    {
      rank: 17,
      schoolId: 'sereno_campo_grande',
      schoolName: 'Sereno de Campo Grande',
      enredo: 'Na busca da paz, equilíbrio e harmonia. Bem aventurados sejam os que ouvem a voz de Deus!',
      relegated: true,
      statusDescription: '17ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 18,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Puxador, não. Intérprete! Por Mestre Jamelão!',
      relegated: true,
      statusDescription: '18ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 19,
      schoolId: 'vila_santa_tereza',
      schoolName: 'Unidos da Vila Santa Tereza',
      enredo: 'Axé - No caminho das águas sagradas',
      relegated: true,
      statusDescription: '19ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  2012: [
    {
      rank: 1,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'Corumbá – Ópera Tupi Guaikuru',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'imperio_serrano',
      schoolName: 'Império Serrano',
      enredo: 'Dona Ivone Lara: O enredo do meu samba',
      statusDescription: '2ª Colocada • Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Utopias - viagens aos confins da imaginação',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Barão de Mauá — Sonho de um Brasil moderno',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'viradouro',
      schoolName: 'Unidos do Viradouro',
      enredo: 'A vida como ela é, bonitinha, mas ordinária... Assim falou Nelson Rodrigues',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Nas ondas do rádio... Acorda Brasil para escutar! O show do Antônio Carlos está no ar!',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'Luma de Oliveira: coração de um país em festa!',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Vou colocar teu nome na praça',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Clara Nunes - A tal mineira',
      statusDescription: '9ª Colocada'
    }
  ],
  2011: [
    {
      rank: 1,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'Águas de Março',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'viradouro',
      schoolName: 'Unidos do Viradouro',
      enredo: 'Quem sou eu sem você?',
      statusDescription: '2ª Colocada • Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'Rosas',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'A emoção está no ar!',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Paz e amor, o sonho não acabou...',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'imperio_serrano',
      schoolName: 'Império Serrano',
      enredo: 'A Benção, Vinícius',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'O Mundo em Carnaval - Um olhar sobre a cultura dos povos',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'De Guarulhos para o palco da folia, sonhos, irreverência e alegria. Mamonas para sempre!',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Rocinha! Estou Vidrado em Você',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Gente Humilde',
      relegated: true,
      statusDescription: '10ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 11,
      schoolId: 'alegria_da_zona_sul',
      schoolName: 'Alegria da Zona Sul',
      enredo: 'Os Doze Obás de Xangô',
      relegated: true,
      statusDescription: '11ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  2010: [
    {
      rank: 1,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Choque de Ordem na folia',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'Água para prover a vida',
      statusDescription: '2ª Colocada • Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'Deixa falar. A Estácio é isso ai! Eu visto esse manto e vou por ai...',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Nos passos do compasso',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Suprema Jinga - Senhora do trono Brazngola',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'imperio_serrano',
      schoolName: 'Império Serrano',
      enredo: 'João das ruas do Rio',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'E por falar em saudade',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'Aquaticópolis',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Os loucos da praia chamada saudade',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Ykamiabas',
      statusDescription: '10ª Colocada'
    },
    {
      rank: 11,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Aço – Universo presente na riqueza da Terra – O futuro a ti pertence!',
      relegated: true,
      statusDescription: '11ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 12,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Eneida, o pierrôt está de volta!',
      relegated: true,
      statusDescription: '12ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  2009: [
    {
      rank: 1,
      schoolId: 'uniao_da_ilha',
      schoolName: 'União da Ilha do Governador',
      enredo: 'Viajar é Preciso - Extraordinárias Através de Mundos Conhecidos e Desconhecidos',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'Como vai, vai bem? Veio a pé ou de trem?',
      statusDescription: '2ª Colocada • Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Tem Francesinha no Salão... O Rio no meu Coração',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'O Beijo Moleque da São Clemente',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'Que Chita Bacana',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'S.O.S Planeta Terra - Santuário da Vida',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'O Cassino da Urca',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'O Mundo de Barro de Mestre Vitalino',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'Do Rio Grande do Sul ao Rio de Janeiro, a Inocentes canta Brizola, a voz do povo brasileiro',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'No transporte da alegria... Me leva Caprichosos a caminho da folia',
      statusDescription: '10ª Colocada'
    }
  ],
  2008: [
    {
      rank: 1,
      schoolId: 'imperio_serrano',
      schoolName: 'Império Serrano',
      enredo: 'Taí, eu fiz tudo pra você gostar de mim',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Rocinha é minha vida... Nordeste é minha história',
      statusDescription: '2ª Colocada • Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Da abertura dos Portos à cidade do porto, Itaguaí - uma história real',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'É chegado a Portugal o tempo de padecer, se te oprime a cruel França, sorte melhor hás de ter',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'uniao_da_ilha',
      schoolName: 'União da Ilha do Governador',
      enredo: 'É hoje o dia!',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'De Santo Antônio de Sá ao pólo petroquímico, Itaboraí... Uma terra abençoada!',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'A história do futuro',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Duzentos anos da corte real nos jardins da família imperial',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Mercedes Baptista, de passo a passo, um passo',
      relegated: true,
      statusDescription: '9ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 10,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Apresento-lhes com louvor, meu pai querido, D. João VI',
      relegated: true,
      statusDescription: '10ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  2007: [
    {
      rank: 1,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Barrados no Baile',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Com todo o gás, a Caprichosos acende a chama do carnaval',
      statusDescription: '2ª Colocada • Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'O Tempo que o Tempo tem',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'uniao_da_ilha',
      schoolName: 'União da Ilha do Governador',
      enredo: 'Ripa na Tulipa, Ilha!',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'O Intrépido Santo Guerreiro',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'Jacarepaguá - Fábrica de Sonhos',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'De fio a fio na Real, pra lá pra lí. Paracambi',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'O Gigante Mundo dos Pequenos',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'Passarinho, Passarola, quero ver Voar',
      relegated: true,
      statusDescription: '9ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 10,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'A Sinfonia Brasileira das Quatro Estações',
      relegated: true,
      statusDescription: '10ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  2006: [
    {
      rank: 1,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'Quem é você?',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'De Gonzagão a Gonzaquinha: em vida de viajante',
      statusDescription: '2ª Colocada • Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'uniao_da_ilha',
      schoolName: 'União da Ilha do Governador',
      enredo: 'As minas Del Rei São João',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'Bahia de todos os deuses',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'A divina comédia brasileira',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Liberdade, igualdade e fraternidade - Um sonho chamado França',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Guelédés, o retrato das almas',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Na magia da escrita, a viagem do saber',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'Adorável loucura na cidade do encantamento',
      relegated: true,
      statusDescription: '9ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 10,
      schoolId: 'alegria_da_zona_sul',
      schoolName: 'Alegria da Zona Sul',
      enredo: 'A Alegria é show de bola',
      relegated: true,
      statusDescription: '10ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  2005: [
    {
      rank: 1,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Um Mundo sem Fronteiras',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'uniao_da_ilha',
      schoolName: 'União da Ilha do Governador',
      enredo: 'Das Veredas dos Trilhos a Um Sonho de Fé... A Ilha Traz a Conquista do Pináculo, Corcovado Tentação!',
      statusDescription: '2ª Colocada • Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Velha É a Vovozinha: a São Clemente Enrugadinha e Gostosinha',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Rio - Conquistas e Glórias de Uma Cidade de Histórias',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'alegria_da_zona_sul',
      schoolName: 'Alegria da Zona Sul',
      enredo: 'Teatro Rival - 70 Anos de Resistência Cultural',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'O Fruto da África de Todos os Deuses no Brasil de Fé. Candomblé...',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: '222 Gil, o Expresso da Cultura do Brasil',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'Espelho, Espelho Meu!',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Cravo de Ouro, Eu Também Sou da Lira e Não Quero Negar',
      relegated: true,
      statusDescription: '9ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 10,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Iriruama-arara-o-ama por Toda Eternidade',
      relegated: true,
      statusDescription: '10ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  2004: [
    {
      rank: 1,
      schoolId: 'vila_isabel',
      schoolName: 'Unidos de Vila Isabel',
      enredo: 'A Vila É Para Ti...',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Nas Páginas do Brasil, Santa Cruz Escreve Sua História',
      statusDescription: '2ª Colocada • Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'O Mago do Novo, João do Povo',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Rio de Janeiro, o Rio que o Mundo Inteiro Ama',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Cubango é Shopping no Mundo do Toma Lá, Dá Cá',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'alegria_da_zona_sul',
      schoolName: 'Alegria da Zona Sul',
      enredo: 'Dorival Caymmi, o Mar e o Tempo nas Areias de Copacabana',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'uniao_da_ilha',
      schoolName: 'União da Ilha do Governador',
      enredo: 'Com Pandeiro ou sem Pandeiro... Eu Brinco. Com Dinheiro ou sem Dinheiro... Eu Também Brinco!',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Olha que Coisa Mais Linda, o Poeta Está no Paraíso',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'A Estácio é Dez, o Brasil é Mil e a Fome é Zero',
      relegated: true,
      statusDescription: '9ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 10,
      schoolId: 'inocentes',
      schoolName: 'Inocentes da Baixada (Inocentes de Belford Roxo)',
      enredo: 'Sorria! Sou Rio, Sou Inocentes, Sou Pan, Serei Olimpíadas',
      relegated: true,
      statusDescription: '10ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 11,
      schoolId: 'leao_de_nova_iguacu',
      schoolName: 'Leão de Nova Iguaçu',
      enredo: 'Insone Planeta Insano',
      relegated: true,
      statusDescription: '11ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 12,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: '75 Anos da Mangueira. É Bom Se Segurar que a Poeira Vai Subir!',
      relegated: true,
      statusDescription: '12ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  2003: [
    {
      rank: 1,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Mangaratiba, uma História de Lutas para todos que Amam a Terra e a Liberdade',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'uniao_da_ilha',
      schoolName: 'União da Ilha do Governador',
      enredo: 'Chega em seu cavalinho azul uma bruxinha boa. A Ilha trouxe do céu Maria Clara Machado',
      statusDescription: '2ª Colocada • Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'vila_isabel',
      schoolName: 'Unidos de Vila Isabel',
      enredo: 'Oscar Niemeyer, o arquiteto no Recanto da Princesa',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Tuiuti desfila o Brasil nas Telas de Portinari',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'Um Banho da Natureza. Cachoeiras de Macacu',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'inocentes',
      schoolName: 'Inocentes da Baixada (Inocentes de Belford Roxo)',
      enredo: 'O gênio da Inocentes e a lâmpada maravilhosa',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'O cupim é do capim',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'leao_de_nova_iguacu',
      schoolName: 'Leão de Nova Iguaçu',
      enredo: 'Beleza: a Eterna Busca do Ser',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Cândido Mendes, um século de paixão na história da educação',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Nas asas da realização entre glórias e tradições. A Rocinha faz a festa dos 100 anos de um clube campeão. Sou Tricolor de Coração!',
      statusDescription: '10ª Colocada'
    },
    {
      rank: 11,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'De Graham Bell à Sérgio Motta - Um Salto para a Modernidade',
      relegated: true,
      statusDescription: '11ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 12,
      schoolId: 'boi_da_ilha',
      schoolName: 'Boi da Ilha do Governador',
      enredo: 'Em 500 Anos de Glórias, Cabo Frio conta sua História',
      relegated: true,
      statusDescription: '12ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  2002: [
    {
      rank: 1,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Papel - Das Origens à Folia - História, Arte e Magia',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'vila_isabel',
      schoolName: 'Unidos de Vila Isabel',
      enredo: 'O glorioso Nilton Santos... Sua bola, sua vida, nossa Vila...',
      statusDescription: '2ª Colocada • Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'uniao_da_ilha',
      schoolName: 'União da Ilha do Governador',
      enredo: 'Folias de Caxias: de João a João... É o carnaval da União',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Arlindo, Arlequins e Querubins: Um Carnaval no Paraíso',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'leao_de_nova_iguacu',
      schoolName: 'Leão de Nova Iguaçu',
      enredo: 'Do Esplendor Diamantino aos Sonhos Dourados de Juscelino',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'boi_da_ilha',
      schoolName: 'Boi da Ilha do Governador',
      enredo: 'Boi da Ilha é Holambra, a Tulipa Brasileira',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Na Rocinha, o povo é sempre notícia',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'Nos Braços do Povo, na Passarela do Samba... Cinqüenta Anos de O Dia',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Asas: sonho de muitos, privilégio de poucos, tecnologia de todos',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'De Minas para o Brasil, o Mártir da Nova República',
      statusDescription: '10ª Colocada'
    },
    {
      rank: 11,
      schoolId: 'villa_rica',
      schoolName: 'Unidos da Villa Rica',
      enredo: 'Sou Rio, sou Grande, sou Villa Rica do Norte',
      relegated: true,
      statusDescription: '11ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 12,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Vossa excelência: feijão com arroz',
      relegated: true,
      statusDescription: '12ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  2001: [
    {
      rank: 1,
      schoolId: 'porto_da_pedra',
      schoolName: 'Unidos do Porto da Pedra',
      enredo: 'Um sonho possível: crescer e viver! Agora é lei',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'A São Clemente Mostrou, e Nada Mudou nesse Brasil Gigante',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Mário Lago, na Rolança do Tempo, uma Vida de Histórias',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'vila_isabel',
      schoolName: 'Unidos de Vila Isabel',
      enredo: 'Estado maravilhoso cheios de encantos mil',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'villa_rica',
      schoolName: 'Unidos da Villa Rica',
      enredo: 'Da Vila Olímpica à Villa Rica, Chiquinho da Mangueira, um Exemplo de Vida',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'boi_da_ilha',
      schoolName: 'Boi da Ilha do Governador',
      enredo: 'Orun-Ayê',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'E aí Tem Patrocínio ? Tenho, José',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'leao_de_nova_iguacu',
      schoolName: 'Leão de Nova Iguaçu',
      enredo: 'Allah-la-ô, um Carnaval das Arábias',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Macaé, a princesinha do Atlântico',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Em Azul e Branco, Meu Coração se Deixou Levar',
      statusDescription: '10ª Colocada'
    },
    {
      rank: 11,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'Região dos Lagos, a Inocentes é folia na terra do sal e do sol',
      relegated: true,
      statusDescription: '11ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 12,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Goiá tacá amopí - O campo das delícias',
      relegated: true,
      statusDescription: '12ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ]
};

/**
 * Notas históricas por edição da Série Ouro
 */
export const OFFICIAL_OURO_NOTES_BY_YEAR: Record<number, string> = {
  2026: 'Carnaval de 2026: (Não Houve Rebaixamento) • União de Maricá Campeã e promovida ao Grupo Especial.',
  2025: 'Carnaval de 2025: Acadêmicos de Niterói Campeã e promovida ao Grupo Especial. São Clemente e Tradição rebaixadas para a Série Prata. Três escolas desfilaram como Hors concours (não julgadas): Império Serrano, Unidos da Ponte e Unidos de Bangu.',
  2024: 'Carnaval de 2024: Unidos de Padre Miguel Campeã e promovida ao Grupo Especial (com nota máxima). Império da Tijuca e Sereno de Campo Grande rebaixadas para a Série Prata.',
  2023: 'Carnaval de 2023: Unidos do Porto da Pedra Campeã e promovida ao Grupo Especial. Lins Imperial e União de Jacarepaguá rebaixadas para a Série Prata.',
  2022: 'Carnaval de 2022: Império Serrano Campeã e promovida ao Grupo Especial com o enredo "Mangangá". Acadêmicos de Santa Cruz e Acadêmicos do Cubango rebaixadas para a Série Prata.',
  2021: 'Carnaval de 2021: Não houve desfiles da Série Ouro no Sambódromo da Marquês de Sapucaí em virtude da pandemia de COVID-19.',
  2020: 'Carnaval de 2020: Imperatriz Leopoldinense Campeã com nota máxima e promovida ao Grupo Especial com o enredo "Só dá Lalá". Renascer de Jacarepaguá e Acadêmicos da Rocinha rebaixadas para a Série Prata.',
  2019: 'Carnaval de 2019: Estácio de Sá Campeã com nota máxima e promovida ao Grupo Especial com o enredo "A Fé que Emerge das Águas". Alegria da Zona Sul rebaixada para a Série Prata.',
  2018: 'Carnaval de 2018: (Não houve rebaixamento) • Unidos do Viradouro Campeã e promovida ao Grupo Especial com o enredo "Vira a Cabeça, pira o Coração. Loucos Gênios da Criação".',
  2017: 'Carnaval de 2017: Império Serrano Campeã e promovida ao Grupo Especial com o enredo "Meu quintal é maior do que o mundo". União do Parque Curicica rebaixada para a Série Prata.',
  2016: 'Carnaval de 2016: Paraíso do Tuiuti Campeã e promovida ao Grupo Especial com o enredo "A Farra do Boi". Caprichosos de Pilares rebaixada para a Série Prata.',
  2015: 'Carnaval de 2015: Estácio de Sá Campeã e promovida ao Grupo Especial com o enredo "De braços abertos, de janeiro à janeiro. Sorrio, sou Rio, sou Estácio de Sá!". Unidos de Bangu e Em Cima da Hora rebaixadas para a Série Prata.',
  2014: 'Carnaval de 2014: Unidos do Viradouro Campeã e promovida ao Grupo Especial com o enredo "Sou a terra de Ismael. Guanabaran vou cruzar, para você tiro o chapéu, Rio eu vim te abraçar". União de Jacarepaguá, Acadêmicos da Rocinha e Tradição rebaixadas para a Série Prata.',
  2013: 'Carnaval de 2013: Império da Tijuca Campeã e promovida ao Grupo Especial com o enredo "Negra, pérola mulher". Sereno de Campo Grande, Unidos do Jacarezinho e Unidos da Vila Santa Tereza rebaixadas para a Série Prata.',
  2012: 'Carnaval de 2012: (Não houve rebaixamento) • Inocentes de Belford Roxo Campeã e promovida ao Grupo Especial com o enredo "Corumbá – Ópera Tupi Guaikuru".',
  2011: 'Carnaval de 2011: Renascer de Jacarepaguá Campeã e promovida ao Grupo Especial com o enredo "Águas de Março". Caprichosos de Pilares e Alegria da Zona Sul rebaixadas para a Série Prata.',
  2010: 'Carnaval de 2010: São Clemente Campeã e promovida ao Grupo Especial com o enredo "Choque de Ordem na folia". Unidos de Padre Miguel e Paraíso do Tuiuti rebaixadas para a Série Prata.',
  2009: 'Carnaval de 2009: (Não houve rebaixamento) • União da Ilha do Governador Campeã e promovida ao Grupo Especial com o enredo "Viajar é Preciso - Extraordinárias Através de Mundos Conhecidos e Desconhecidos".',
  2008: 'Carnaval de 2008: Império Serrano Campeã e promovida ao Grupo Especial com o enredo "Taí, eu fiz tudo pra você gostar de mim". Acadêmicos do Cubango e Lins Imperial rebaixadas para a Série Prata.',
  2007: 'Carnaval de 2007: São Clemente Campeã e promovida ao Grupo Especial com o enredo "Barrados no Baile". Tradição e Arranco rebaixadas para a Série Prata.',
  2006: 'Carnaval de 2006: Estácio de Sá Campeã e promovida ao Grupo Especial com o enredo "Quem é você?". Vizinha Faladeira e Alegria da Zona Sul rebaixadas para a Série Prata.',
  2005: 'Carnaval de 2005: Acadêmicos da Rocinha Campeã e promovida ao Grupo Especial com o enredo "Um Mundo sem Fronteiras". Paraíso do Tuiuti e União de Jacarepaguá rebaixadas para a Série Prata.',
  2004: 'Carnaval de 2004: Unidos de Vila Isabel Campeã e promovida ao Grupo Especial com o enredo "A Vila É Para Ti...". Estácio de Sá, Inocentes da Baixada, Leão de Nova Iguaçu e Lins Imperial rebaixadas para a Série Prata.',
  2003: 'Carnaval de 2003: São Clemente Campeã e promovida ao Grupo Especial com o enredo "Mangaratiba, uma História de Lutas para todos que Amam a Terra e a Liberdade". Unidos da Ponte e Boi da Ilha do Governador rebaixadas para a Série Prata.',
  2002: 'Carnaval de 2002: Acadêmicos de Santa Cruz Campeã e promovida ao Grupo Especial com o enredo "Papel - Das Origens à Folia - História, Arte e Magia". Unidos da Villa Rica e Império da Tijuca rebaixadas para a Série Prata.',
  2001: 'Carnaval de 2001: Unidos do Porto da Pedra (Campeã) e São Clemente (Vice-Campeã) promovidas ao Grupo Especial. Inocentes de Belford Roxo e Em Cima da Hora rebaixadas para a Série Prata.'
};

/**
 * Retorna lista de carnavais históricos da Série Ouro catalogados somados aos simulados no save
 */
export function getHistoricalOuroCarnavalsList(inGameHistory: YearHistory[] = []): OuroHistoricalCarnaval[] {
  const result: OuroHistoricalCarnaval[] = [];

  // Anos simulados in-game (> 2026)
  const inGameYears = inGameHistory
    .filter((h) => h.year > 2026 && h.ouroStandings && h.ouroStandings.length > 0)
    .sort((a, b) => b.year - a.year);

  inGameYears.forEach((h) => {
    const stands = h.ouroStandings || [];
    const champs = stands.filter((s) => s.rank === 1).map((s) => s.schoolName);
    const vices = stands.filter((s) => s.rank === 2).map((s) => s.schoolName);
    const promoted = h.ouroChampion ? [h.ouroChampion] : champs;
    const relegated = h.ouroRelegated || [];

    result.push({
      year: h.year,
      standings: stands.map((s) => ({
        rank: s.rank,
        schoolId: s.schoolId || '',
        schoolName: s.schoolName,
        totalScore: s.totalScore,
        promoted: s.rank === 1,
        relegated: relegated.includes(s.schoolName) || (s.schoolId ? relegated.includes(s.schoolId) : false),
        statusDescription:
          s.rank === 1
            ? 'Campeã • Subiu ao Grupo Especial'
            : relegated.includes(s.schoolName)
            ? 'Rebaixada para a Série Prata'
            : undefined
      })),
      notes: `Série Ouro simulada durante o save (Ano ${h.year}).`,
      championNames: champs,
      viceChampionNames: vices,
      promotedNames: promoted,
      relegatedNames: relegated,
      totalSchools: stands.length,
      isNoCarnaval: false
    });
  });

  // Anos oficiais catalogados (a começar por 2026)
  const catalogedYears = Object.keys(OFFICIAL_OURO_HISTORICAL_STANDINGS)
    .map(Number)
    .sort((a, b) => b - a);

  catalogedYears.forEach((yr) => {
    const stands = OFFICIAL_OURO_HISTORICAL_STANDINGS[yr] || [];

    if (yr === 2021) {
      result.push({
        year: 2021,
        standings: [],
        notes: OFFICIAL_OURO_NOTES_BY_YEAR[2021] || 'Carnaval de 2021: Não houve desfiles em 2021.',
        championNames: [],
        viceChampionNames: [],
        promotedNames: [],
        relegatedNames: [],
        totalSchools: 0,
        isNoCarnaval: true
      });
      return;
    }

    const champs = stands.filter((s) => s.rank === 1).map((s) => s.schoolName);
    const vices = stands.filter((s) => s.rank === 2).map((s) => s.schoolName);
    const promoted = stands.filter((s) => s.promoted).map((s) => s.schoolName);
    const relegated = stands.filter((s) => s.relegated).map((s) => s.schoolName);

    result.push({
      year: yr,
      standings: stands,
      notes: OFFICIAL_OURO_NOTES_BY_YEAR[yr] || `Desfile Oficial da Série Ouro de ${yr}`,
      championNames: champs,
      viceChampionNames: vices,
      promotedNames: promoted,
      relegatedNames: relegated,
      totalSchools: stands.length,
      isNoCarnaval: false
    });
  });

  return result;
}
