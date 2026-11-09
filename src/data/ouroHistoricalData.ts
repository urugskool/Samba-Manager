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
  ],
  2000: [
    {
      rank: 1,
      schoolId: 'imperio_serrano',
      schoolName: 'Império Serrano',
      enredo: 'Os canhões de Guararapes',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Um Monarca na Fuzarca',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Oswaldo Cruz, a saga de um herói brasileiro',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'No ano 2000, a São Clemente é Tupi com Sergipe na Sapucaí',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'Petrópolis, roxo de amor por você',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Brasil, do extrativismo à reciclagem, 500 anos de riqueza',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'O ouro vermelho de Pati do Alferes',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'Envergo, Mas Não Quebro',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'O sonho da França Antártica de Villegagnon',
      relegated: true,
      statusDescription: '9ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 10,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Do Barão à fundação, 100 anos a serviço da nação',
      relegated: true,
      statusDescription: '10ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 11,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Por uma independência de fato',
      relegated: true,
      statusDescription: '11ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 12,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Brasil 500... Ano 2000, Cabral faz a festa no Brasil',
      relegated: true,
      statusDescription: '12ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1999: [
    {
      rank: 1,
      schoolId: 'tijuca',
      schoolName: 'Unidos da Tijuca',
      enredo: 'O dono da terra',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'porto_da_pedra',
      schoolName: 'Unidos do Porto da Pedra',
      enredo: 'E na farofa do confete, tem limão, tem serpentina',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'No passo do Compasso, a Estácio no Sapatinho',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Abraham Medina em noite de gala',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Jacarezinho canta e se encanta com os mistérios do Senhor da Luz',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Horas... Eras de glórias... E outras histórias...',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'O meu cabelo não nega',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Tempero, uma pitada na história',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'No palco da alegria, Molejão é rei nesta folia',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'O Samba é a Minha Voz',
      relegated: true,
      statusDescription: '10ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 11,
      schoolId: 'villa_rica',
      schoolName: 'Unidos da Villa Rica',
      enredo: 'Sargentelli, Lenda Viva do Ziriguidum',
      relegated: true,
      statusDescription: '11ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1998: [
    {
      rank: 1,
      schoolId: 'imperio_serrano',
      schoolName: 'Império Serrano',
      enredo: 'Sou o ouro negro da Mãe África',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Maiores são os Poderes do Povo ! Se Liga na São Clemente !',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'O exagerado Cazuza nas terras de Santa Cruz',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Nausicaa - A odisséia Cubanga nos verdes mares',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Elymar superpopular',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Quem Pode, Pode, no Pagode se Sacode',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Quem é você, Zuzu Angel? Um anjo feito mulher',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'Cem Anos de Cultura - Academia Brasileira de Letras',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Tá... Na ponta da língua',
      relegated: true,
      statusDescription: '9ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 10,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Búzios : o Paraíso da Humanidade',
      relegated: true,
      statusDescription: '10ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1997: [
    {
      rank: 1,
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'Os balagandãs',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Do tambor ao computador',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'A São Clemente Botafogo na Sapucaí',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'A coroa do perdão na terra de Oyó',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Sérgio Cabral, a cara do Rio',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Da lata de lixo ao luxo da lata',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Todas as Marias de nossa terra',
      relegated: true,
      statusDescription: '7ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 8,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Chico Anísio, 50 anos de Humor',
      relegated: true,
      statusDescription: '8ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 9,
      schoolId: 'academicos_do_dende',
      schoolName: 'Acadêmicos do Dendê',
      enredo: 'Do pasto, fantasia, do gado, alegoria',
      relegated: true,
      statusDescription: '9ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 10,
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'Lan, a cara alegre e colorida do Rio',
      relegated: true,
      statusDescription: '10ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1996: [
    {
      rank: 1,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Ribalta - Luz, Sonho e Ilusão',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Bahia com muito amor',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Se a Canoa não Virar, a São Clemente Chega Lá',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'Elba Popular Brasileira',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Do reclame ao merchandising, a história da propaganda no Brasil',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Yara cigana, canta, dança e toca, é Rio, é rua, é Carioca',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'arrastao_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'As Icamiabas',
      relegated: true,
      statusDescription: '7ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 8,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Anjo azul',
      relegated: true,
      statusDescription: '8ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 9,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Dos brasões do reino de Portugal, ao esplendor da bandeira nacional',
      relegated: true,
      statusDescription: '9ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 10,
      schoolId: 'villa_rica',
      schoolName: 'Unidos da Villa Rica',
      enredo: 'A Lavagem do Bonfim',
      relegated: true,
      statusDescription: '10ª (rebaixada) • Não desfilou • Rebaixada para a Série Prata'
    }
  ],
  1995: [
    {
      rank: 1,
      schoolId: 'porto_da_pedra',
      schoolName: 'Unidos do Porto da Pedra',
      enredo: 'Campo Cidade em Busca da Felicidade',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'No Sassarico da Colombo',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'arrastao_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'Frevança',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Sem Medo de ser Feliz',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Deuses e Costumes nas Terras de Santa Cruz',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'O Relicário do Samba',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Da Aldeia de São Lourenço a Niterói, a Cidade Sorriso',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Um Abraço à Cinelândia, 60 anos de Teatro Rival',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Yolhesman Crisbeles, a República de Ipanema é um Desbunde',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'No Reflexo do Espelho, a Arte de Dançar (Homenagem à Carlinhos de Jesus)',
      statusDescription: '10ª Colocada'
    },
    {
      rank: 11,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'E o Jacarezinho Descobriu a Atlântida, a Tela Perdida',
      relegated: true,
      statusDescription: '11ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 12,
      schoolId: 'dificil_e_o_nome',
      schoolName: 'Difícil é o Nome',
      enredo: 'A Grande Estrela, o Sol',
      relegated: true,
      statusDescription: '12ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 13,
      schoolId: 'leao_de_nova_iguacu',
      schoolName: 'Leão de Nova Iguaçu',
      enredo: 'Arautos do Brasil Mulato',
      relegated: true,
      statusDescription: '13ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 14,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Os Quindins de Yayá',
      relegated: true,
      statusDescription: '14ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 15,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Uma Festa em Verde e Rosa',
      totalScore: 266.0,
      relegated: true,
      statusDescription: '15ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 16,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Ria ... Se Puder',
      relegated: true,
      statusDescription: '16ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 17,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes de Cordovil',
      enredo: 'Retratos e Canções',
      relegated: true,
      statusDescription: '17ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 18,
      schoolId: 'mocidade_cidade_de_deus',
      schoolName: 'Mocidade Unida da Cidade de Deus',
      enredo: 'Domingo é Dia de Quinta',
      relegated: true,
      statusDescription: '18ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 19,
      schoolId: 'canarios_laranjeiras',
      schoolName: 'Canários das Laranjeiras',
      enredo: 'Seu Conductor, Din Din Seu Condutor',
      relegated: true,
      statusDescription: '19ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1994: [
    {
      rank: 1,
      schoolId: 'villa_rica',
      schoolName: 'Unidos da Villa Rica',
      enredo: 'Copacabana, meu amor',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Uma andorinha só não faz verão ou Aonde vai a corda vai a caçamba',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Humor pra dar e vender',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Nélson Rodrigues, um beijo na Sapucaí',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Brajiru, meu Japão brasileiro',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'leao_de_nova_iguacu',
      schoolName: 'Leão de Nova Iguaçu',
      enredo: 'Da França tropical a Orfeu do Carnaval',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'A rota dos mercadores',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'E agora eu, ao vivo e a cores',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Sapucaia Oroca',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Entre festas e fitas',
      statusDescription: '10ª Colocada'
    },
    {
      rank: 11,
      schoolId: 'canarios_laranjeiras',
      schoolName: 'Canários das Laranjeiras',
      enredo: 'Quem é bom já nasce feito',
      statusDescription: '11ª Colocada'
    },
    {
      rank: 12,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Conservatória, cidade serenata sambando na Sapucaí',
      statusDescription: '12ª Colocada'
    },
    {
      rank: 13,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Magos da oitava maravilha',
      statusDescription: '13ª Colocada'
    },
    {
      rank: 14,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes de Cordovil',
      enredo: 'Garotinho vem... Sacudindo a Sapucaí',
      statusDescription: '14ª Colocada'
    },
    {
      rank: 15,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Ao mestre com carinho (Homenagem a Fernando Pamplona)',
      statusDescription: '15ª Colocada'
    },
    {
      rank: 16,
      schoolId: 'arrastao_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'Assim caminha a humanidade',
      statusDescription: '16ª Colocada'
    }
  ],
  1993: [
    {
      rank: 1,
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'Não me leve a mal, hoje é carnaval',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'imperio_serrano',
      schoolName: 'Império Serrano',
      enredo: 'Império Serrano, um ato de amor',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'De quadrinho em quadrinho, lá vai meu recado... Maurício de Souza',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Quo vadis, meu negro de ouro',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'leao_de_nova_iguacu',
      schoolName: 'Leão de Nova Iguaçu',
      enredo: 'O que é que a Baixada tem',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Tristão e Isolda, uma ópera no asfalto',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'O pão nosso de cada dia',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Vitis vinífera, o Império é uma uva',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'No mundo encantado de Beto Carrero',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Ciranda, cirandinha, vamos todos sonhar',
      statusDescription: '10ª Colocada'
    },
    {
      rank: 11,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Do fogo às águas, recriando a terra',
      statusDescription: '11ª Colocada'
    },
    {
      rank: 12,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'O Galo cantou e Lucas saboreou',
      statusDescription: '12ª Colocada'
    },
    {
      rank: 13,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Mangueira, beleza que a natureza criou',
      statusDescription: '13ª Colocada'
    },
    {
      rank: 14,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Acredite se quiser',
      statusDescription: '14ª Colocada'
    },
    {
      rank: 15,
      schoolId: 'arrastao_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'Quem canta seus males espanta',
      statusDescription: '15ª Colocada'
    },
    {
      rank: 16,
      schoolId: 'mocidade_cidade_de_deus',
      schoolName: 'Mocidade Unida da Cidade de Deus',
      enredo: 'Dona Zica e Dona Neuma, enredos de verdade',
      relegated: true,
      statusDescription: '16ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1992: [
    {
      rank: 1,
      schoolId: 'grande_rio',
      schoolName: 'Acadêmicos do Grande Rio',
      enredo: 'Águas claras para um rei negro',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Da cor do pecado',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'imperio_serrano',
      schoolName: 'Império Serrano',
      enredo: 'Fala Serrinha, a voz do samba sou eu mesmo, sim senhor',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Mandacaru, fruta-flor do querer',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Para não dizer que não falei das flores',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'A visita do Jacarezinho ao reino encantado de Maria Clara Machado',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'E o salário Ó ...',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Xuxa, a realidade vira sonho no xou da Cabuçu',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Baía com I',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Um mistério chamado Brasil (Homenagem a Sinval Silva)',
      statusDescription: '10ª Colocada'
    },
    {
      rank: 11,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Rio - Eco 92',
      statusDescription: '11ª Colocada'
    },
    {
      rank: 12,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Mãe Terra: e o homem refez a criação. O mito do Engenho da Rainha',
      statusDescription: '12ª Colocada'
    },
    {
      rank: 13,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes de Cordovil',
      enredo: 'Um negro chamado felicidade, Neguinho da Beija-Flor',
      relegated: true,
      statusDescription: '13ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 14,
      schoolId: 'unidos_do_campinho',
      schoolName: 'Unidos do Campinho',
      enredo: 'Passa, passa o tempo',
      relegated: true,
      statusDescription: '14ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1991: [
    {
      rank: 1,
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'De geração à geração nas asas da Tradição',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'leao_de_nova_iguacu',
      schoolName: 'Leão de Nova Iguaçu',
      enredo: 'Quem te viu, quem TV',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Sou negro, sou raça, sou gente',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Aconteceu, virou Manchete',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Pare a big bang-bang, nem todo amarelo é ouro, nem todo vermelho é sangue',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Meu padrinho padre Cícero do Juazeiro do Norte, olhai pelo Cariri',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Barracão, pregos, panos e paetês',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Canaã, a terra prometida Brasil',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Quando o Rio ria',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes de Cordovil',
      enredo: 'Ela, ele e eles, possuidores da noite',
      statusDescription: '10ª Colocada'
    },
    {
      rank: 11,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Asa branca',
      relegated: true,
      statusDescription: '11ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 0,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'O Boca do Inferno',
      isHorsConcours: true,
      promoted: true,
      statusDescription: 'Hors concours • Subiu ao Grupo Especial'
    }
  ],
  1990: [
    {
      rank: 1,
      schoolId: 'viradouro',
      schoolName: 'Unidos do Viradouro',
      enredo: 'Só vale o que está escrito',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'grande_rio',
      schoolName: 'Acadêmicos do Grande Rio',
      enredo: 'Porque sou carioca?',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Robauto, uma ova',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'A coroação',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Jurupari, a voz da mata',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Dan, a serpente encantada do arco-íris',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Do leite de cabra ao silicone',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'O magnífico Niemeyer',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Eneida, o pierrô está de volta',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes de Cordovil',
      enredo: 'Cantares ao meu povo, Solano Trindade',
      statusDescription: '10ª Colocada'
    }
  ],
  1989: [
    {
      rank: 1,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Stanislaw, uma história sem final',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Gênios da ilusão',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Estrelas Solitárias, Linda e Dircinha Batista',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Canta Brasil',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes de Cordovil',
      enredo: 'Marrom som Brasil',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Folclore, Tradição Popular',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Rio, samba e carnaval',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'arrastao_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'Zezé, um canto de amor e raça',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Num passe de mágica',
      relegated: true,
      statusDescription: '9ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 10,
      schoolId: 'tupy_bras_de_pina',
      schoolName: 'Tupy de Brás de Pina',
      enredo: 'Rio Boa Praça',
      relegated: true,
      statusDescription: '10ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1988: [
    {
      rank: 1,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Pra ver a banda passar',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Parabéns pra Vocês',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Na Ginga do Samba, aí vem Ataulfo',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Nosso Sinhô, rei do samba',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Como se bebe nesta terra',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Filho de Branco é Menino, Filho de Negro é Moleque. Moleque taí, Moleque vem cá, vem cá Apanhar',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Primavera é tempo de saudade, tributo a Zinco e Caxambu',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'De sete em sete, pintando o sete',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes de Cordovil',
      enredo: 'Burle Marx',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'tupy_bras_de_pina',
      schoolName: 'Tupy de Brás de Pina',
      enredo: 'E agora, José?',
      statusDescription: '10ª Colocada'
    }
  ],
  1987: [
    {
      rank: 1,
      schoolId: 'tijuca',
      schoolName: 'Unidos da Tijuca',
      enredo: 'As Três Faces da Moeda',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'Sonhos de Natal',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Olha que Coisa mais Linda, mais Cheia de Graça',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Quem Espera só se Cansa',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Tradição de uma Raça',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'E o Rio Amanheceu Cantando',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes de Cordovil',
      enredo: 'Amado, Jorge, Amante',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Tenda dos Milagres',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Kid Morangueira da Silva, o Embaixador dos Morros',
      relegated: true,
      statusDescription: '9ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1986: [
    {
      rank: 1,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Candeia, luz de inspiração',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Pouca saúde, muita saúva, os males do Brasil são',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes de Cordovil',
      enredo: 'Quem não discute, tem que engolir',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Ganga Zumba, raiz da liberdade',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Terra Brasilis',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Sai mais uma',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'No ano da copa, bota no meio',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'E você, o que é que dá?',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'No cheiro, no trago, no mastigo ou de baforada',
      relegated: true,
      statusDescription: '9ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1985: [
    {
      rank: 1,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Dez, nota dez',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'tijuca',
      schoolName: 'Unidos da Tijuca',
      enredo: 'Mas o que foi que aconteceu?',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Chuê, chuá, moronguetá cruz credo',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Não existe pecado do lado de baixo do Equador',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Essa gente brasileira',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Do batuque à apoteose, o samba pede passagem',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'É hoje só, amanhã não tem mais',
      relegated: true,
      statusDescription: '7ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 8,
      schoolId: 'arrastao_de_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'Depois do mal feito, chorar não é proveito',
      relegated: true,
      statusDescription: '8ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 9,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Feliz por um dia',
      relegated: true,
      statusDescription: '9ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 10,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Folia, amor e fantasia',
      relegated: true,
      statusDescription: '10ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1984: [
    {
      rank: 1,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Beth Carvalho, a enamorada do samba',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Disputou Supercampeonato e Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Acima da Coroa de um Rei, só um Deus',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Disputou Supercampeonato e Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: '33, Destino D. Pedro II',
      promoted: true,
      statusDescription: '3ª (subiu) • Subiu ao Grupo Especial'
    },
    {
      rank: 4,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Não Corra, não Mate, não Morra - O Diabo está Solto no Asfalto',
      promoted: true,
      statusDescription: '4ª (subiu) • Subiu ao Grupo Especial'
    },
    {
      rank: 5,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'O Tucá Juê',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'Atrás do Trio Elétrico',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'arrastao_de_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'O Conto Lendário de Marabá',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Dança Brasil',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Só Vale Quem tem Dinheiro',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Ziguezagueando no Zum Zum da Fantasia',
      statusDescription: '10ª Colocada'
    },
    {
      rank: 11,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: '1984 - um Ano de Otimismo',
      relegated: true,
      statusDescription: '11ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 12,
      schoolId: 'imperio_do_maranga',
      schoolName: 'Império do Marangá',
      enredo: 'Águas Lendárias',
      relegated: true,
      statusDescription: '12ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1983: [
    {
      rank: 1,
      schoolId: 'estacio_de_sa',
      schoolName: 'Unidos de São Carlos (Estácio de Sá)',
      enredo: 'Orfeu do Carnaval',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Santos e Pecadores',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Uma Andorinha Só não Faz Verão',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'A Visita de Ony de Ifé ao Obá de Oió',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'Obrigado, Brasil',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Senta que o Leão É Manso',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'O Dragão da Maldade Contra o Santo Guerreiro',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Vamos Falar de Amor',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Quente como Inferno, Negro como Noite, Doce como Amor',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Enredo sem Enredo',
      statusDescription: '10ª Colocada'
    },
    {
      rank: 11,
      schoolId: 'arrastao_de_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'Barravilhosa',
      statusDescription: '11ª Colocada'
    },
    {
      rank: 12,
      schoolId: 'imperio_do_maranga',
      schoolName: 'Império do Marangá',
      enredo: 'A Coroa do Rei não É de Ouro, nem de Prata',
      statusDescription: '12ª Colocada'
    }
  ],
  1982: [
    {
      rank: 1,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Moça bonita não paga',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'O casamento de Dona Baratinha',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Braguinha, carnaval de sonho',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Popô, papá, bubu, babá',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Lua viajante',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'arrastao_de_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'Brasil verde e amarelo',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Clementina, uma rainha negra',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'A lenda do dragão dourado',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'imperio_do_maranga',
      schoolName: 'Império do Marangá',
      enredo: 'Lágrimas',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'Você sabe como é',
      statusDescription: '10ª Colocada'
    },
    {
      rank: 11,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Como vencer na vida sem fazer força',
      relegated: true,
      statusDescription: '11ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 12,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Gosto que me enrosco',
      relegated: true,
      statusDescription: '12ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1981: [
    {
      rank: 1,
      schoolId: 'estacio_de_sa',
      schoolName: 'Unidos de São Carlos (Estácio de Sá)',
      enredo: 'Quem Diria, da Monarquia à Boemia ao Esplendor da Praça Tiradentes',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Cataratas do Iguaçu',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'O Imperador de Parada de Lucas',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Meu Padim Pade Ciço',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'De Daomé a São Luis, a Pureza Mina Jêje',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Amazonas, Verde que Te Quero Verde',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'É Hoje, a História do Carnaval',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Ou Isto ou Aquilo',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'arrastao_de_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'Rudá, o Deus do Amor',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'imperio_do_maranga',
      schoolName: 'Império do Marangá',
      enredo: 'Dos Balões aos Aviões',
      statusDescription: '10ª Colocada'
    },
    {
      rank: 11,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Mauricéia em Noite de Festa',
      statusDescription: '11ª Colocada'
    },
    {
      rank: 12,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Amor, Sublime Amor',
      statusDescription: '12ª Colocada'
    }
  ],
  1980: [
    {
      rank: 1,
      schoolId: 'tijuca',
      schoolName: 'Unidos da Tijuca',
      enredo: 'Delmiro Gouveia',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'O Guarani - José de Alencar',
      statusDescription: '2ª Colocada'
    },
    {
      rank: 3,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Guarda Velha, Velha Guarda',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'De Sacristão a Barão de Ouro',
      statusDescription: '4ª Colocada (empatada)'
    },
    {
      rank: 4,
      schoolId: 'arrastao_de_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'Mambembes e Mamulengos',
      statusDescription: '4ª Colocada (empatada)'
    },
    {
      rank: 5,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'É a Maior - Emilinha Borba',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'A Lenda de Juparanã, a Lagoa Encantada',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Tua obra não nega, Lalá',
      statusDescription: '7ª Colocada (empatada)'
    },
    {
      rank: 7,
      schoolId: 'imperio_do_maranga',
      schoolName: 'Império do Marangá',
      enredo: 'Brasil, Terra do Amor',
      statusDescription: '7ª Colocada (empatada)'
    },
    {
      rank: 8,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'França, bumba e assombrações no Maranhão',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'A Doce Ilusão do Sambista',
      relegated: true,
      statusDescription: '9ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 10,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Maravilhosa Marajó',
      relegated: true,
      statusDescription: '10ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1979: [
    {
      rank: 1,
      schoolId: 'vila_isabel',
      schoolName: 'Unidos de Vila Isabel',
      enredo: 'Os Dourados Anos de Carlos Machado',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'imperio_serrano',
      schoolName: 'Império Serrano',
      enredo: 'Municipal maravilhoso, 70 anos de glória',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'arrastao_de_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'Da Lapinha ao coreto, um folguedo popular',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Quem conta um conto aumenta um ponto',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'O Rio de Janeiro em Tempo de Debret',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Uruçumirim, paraíso tupinambá',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Gigante negro da Abolição à República',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Sonho da vovó',
      statusDescription: '8ª Colocada'
    }
  ],
  1978: [
    {
      rank: 1,
      schoolId: 'estacio_de_sa',
      schoolName: 'Unidos de São Carlos (Estácio de Sá)',
      enredo: 'Céu de Orestes no chão de estrelas',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'imperatriz',
      schoolName: 'Imperatriz Leopoldinense',
      enredo: 'Vamos Brincar de ser Criança',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Exaltação às pedras preciosas do Brasil',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Preta, Preta, Pretinha',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Festa de Olubajé',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Festa da Uva no Rio Grande do Sul',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'imperio_do_maranga',
      schoolName: 'Império do Marangá',
      enredo: 'Salamanca do Jarau',
      relegated: true,
      statusDescription: '7ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 8,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Viagem Encantada do Tio Benjamim do Vale da Esperança',
      relegated: true,
      statusDescription: '8ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 9,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Apoteose ao Teatro de Revista',
      relegated: true,
      statusDescription: '9ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 10,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Todas as Rosas do meu Rio',
      relegated: true,
      statusDescription: '10ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 11,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Calendário do Rio',
      relegated: true,
      statusDescription: '11ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 12,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Cor, Ação e Samba',
      relegated: true,
      statusDescription: '12ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 13,
      schoolId: 'tupy_bras_de_pina',
      schoolName: 'Tupy de Brás de Pina',
      enredo: 'Manôa, um sonho dourado',
      relegated: true,
      statusDescription: '13ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 14,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Criação do Mundo, Segundo os Carajás',
      relegated: true,
      statusDescription: '14ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 15,
      schoolId: 'tijuca',
      schoolName: 'Unidos da Tijuca',
      enredo: 'A Praça dos Sonhos, Amor, Alegria e Fantasia',
      relegated: true,
      statusDescription: '15ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 16,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'O Mestre da Musicologia Nacional',
      relegated: true,
      statusDescription: '16ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1977: [
    {
      rank: 1,
      schoolId: 'arrastao_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'Um talismã para Iaiá',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Logum, o príncipe de Efan',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Cruz credo, eta diabo',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Insurreição do Queimado',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Banzo',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'imperio_do_maranga',
      schoolName: 'Império do Marangá',
      enredo: 'Lenda do Arco-Íris',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'tupy_bras_de_pina',
      schoolName: 'Tupy de Brás de Pina',
      enredo: 'Um sonho colorido',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'A glória dos quilombos ou Congoleses, sudaneses, angoleses, bantus e os ciclos da mineração, açúcar e café',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'tijuca',
      schoolName: 'Unidos da Tijuca',
      enredo: 'Paraíso dos Sonhos',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Acredite se quiser',
      statusDescription: '10ª Colocada'
    },
    {
      rank: 11,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Heitor dos Prazeres, um artista carioca',
      relegated: true,
      statusDescription: '11ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 12,
      schoolId: 'folioes_de_botafogo',
      schoolName: 'Foliões de Botafogo',
      enredo: 'O cortiço',
      relegated: true,
      statusDescription: '12ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 13,
      schoolId: 'unidos_de_nilopolis',
      schoolName: 'Unidos de Nilópolis',
      enredo: 'Império negro, um sonho de liberdade',
      relegated: true,
      statusDescription: '13ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 14,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes de Cordovil',
      enredo: 'Manjares do céu e da terra',
      relegated: true,
      statusDescription: '14ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 15,
      schoolId: 'grande_rio_duque_de_caxias',
      schoolName: 'Grande Rio',
      enredo: 'Os precursores',
      relegated: true,
      statusDescription: '15ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 16,
      schoolId: 'mocidade_unida_da_cidade_de_deus',
      schoolName: 'Mocidade Unida da Cidade de Deus',
      enredo: 'Baronesa da Taquara',
      relegated: true,
      statusDescription: '16ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 17,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Brasil caboclo',
      relegated: true,
      statusDescription: '17ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 18,
      schoolId: 'unidos_de_manguinhos',
      schoolName: 'Unidos de Manguinhos',
      enredo: 'O tesouro maldito',
      relegated: true,
      statusDescription: '18ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1976: [
    {
      rank: 1,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Guerreiro das Alagoas',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Promovida ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Reisado da terra das Alagoas',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Promovida ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Acalanto para Uiara',
      statusDescription: '3ª Colocada'
    },
    {
      rank: 4,
      schoolId: 'tijuca',
      schoolName: 'Unidos da Tijuca',
      enredo: 'No mundo encantado dos deuses afro-brasileiros',
      statusDescription: '4ª Colocada'
    },
    {
      rank: 5,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Piaburú, o caminho da montanha do sol',
      statusDescription: '5ª Colocada'
    },
    {
      rank: 6,
      schoolId: 'imperio_do_maranga',
      schoolName: 'Império do Marangá',
      enredo: 'Glórias do Teatro Municipal',
      statusDescription: '6ª Colocada'
    },
    {
      rank: 7,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Canudos, sua história, sua gente',
      statusDescription: '7ª Colocada'
    },
    {
      rank: 8,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Cobra Norato',
      statusDescription: '8ª Colocada'
    },
    {
      rank: 9,
      schoolId: 'unidos_de_nilopolis',
      schoolName: 'Unidos de Nilópolis',
      enredo: 'Maranhão em tempo de bumba-meu-boi',
      statusDescription: '9ª Colocada'
    },
    {
      rank: 10,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Recife, nosso amor distante',
      statusDescription: '10ª Colocada'
    },
    {
      rank: 11,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes de Cordovil',
      enredo: 'Recordar é viver, o passado manda lembrança',
      statusDescription: '11ª Colocada'
    },
    {
      rank: 12,
      schoolId: 'folioes_de_botafogo',
      schoolName: 'Foliões de Botafogo',
      enredo: 'Festa do Bonfim',
      statusDescription: '12ª Colocada'
    },
    {
      rank: 13,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Sonho de pierrot',
      relegated: true,
      statusDescription: '13ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 14,
      schoolId: 'independentes_do_zumbi',
      schoolName: 'Independentes do Zumbi',
      enredo: 'Símbolos e cenários do carnaval carioca',
      relegated: true,
      statusDescription: '14ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 15,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Mar em tempo de carnaval',
      relegated: true,
      statusDescription: '15ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 16,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'Festas e tradições de nossa gente',
      relegated: true,
      statusDescription: '16ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 17,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Brasília, sonho imperial, realidade nacional',
      relegated: true,
      statusDescription: '17ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 18,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Ajuricaba, um herói amazonense',
      relegated: true,
      statusDescription: '18ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 19,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'O negro em três tempos',
      relegated: true,
      statusDescription: '19ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 20,
      schoolId: 'vila_santa_tereza',
      schoolName: 'Unidos da Vila Santa Tereza',
      enredo: 'Ídolos do rádio brasileiro',
      relegated: true,
      statusDescription: '20ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1975: [
    {
      rank: 1,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Dona Flor e seus dois maridos',
      promoted: true,
      statusDescription: '1ª (Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'tupy_bras_de_pina',
      schoolName: 'Tupy de Brás de Pina',
      enredo: 'Brasil, Glória e Integração',
      promoted: true,
      statusDescription: '2ª (Vice-Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Muiraquitã, o amuleto do amor',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'folioes_de_botafogo',
      schoolName: 'Foliões de Botafogo',
      enredo: 'Glória em pedra-sabão',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Quem Quebrou meu Violão - Tra-Lá-Lá',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'tijuca',
      schoolName: 'Unidos da Tijuca',
      enredo: 'Magia africana no Brasil e seus mistérios',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Obra e Vida de Cecília Meireles',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Uiara a Deusa da Terra Grande',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Bahia de São Salvador, Tenda dos Milagres',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Congada do Rei David',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'Emília no país da gramática',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Catarina Mina',
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Reais pessoas - chegada de D. João VI',
      statusDescription: '13º Lugar'
    },
    {
      rank: 14,
      schoolId: 'vila_santa_tereza',
      schoolName: 'Unidos da Vila Santa Tereza',
      enredo: 'Acaiaca, Esplendor do Tijuco',
      statusDescription: '14º Lugar'
    },
    {
      rank: 15,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes de Cordovil',
      enredo: 'O mestiço predestinado',
      statusDescription: '15º Lugar'
    },
    {
      rank: 16,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'O Folclore Carioca',
      statusDescription: '16º Lugar'
    },
    {
      rank: 17,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Resplendor de um Grande Festival',
      statusDescription: '17º Lugar'
    },
    {
      rank: 0,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Eleição e coroação da Boneca do Café',
      isHorsConcours: true,
      statusDescription: 'Não desfilou'
    }
  ],
  1974: [
    {
      rank: 1,
      schoolId: 'uniao_da_ilha',
      schoolName: 'União da Ilha do Governador',
      enredo: 'Lendas e festas das Yabás',
      promoted: true,
      statusDescription: '1ª (Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Mulata maior',
      promoted: true,
      statusDescription: '2ª (Vice-Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Minas de prata',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Devaneios de um poeta',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes de Cordovil',
      enredo: 'Festas tradicionais da Bahia',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Cobra Norato',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'tupy_bras_de_pina',
      schoolName: 'Tupy de Brás de Pina',
      enredo: 'Essa nega Fulô',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'O rouxinol da canção brasileira',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Bandeira Branca - Homenagem a Dalva de Oliveira',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Duduca Lunga, a maravilhosa arte negra',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Sonhos fascinantes de um jovem adolescente',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Olimpíadas, festa de um povo',
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Rio em festa - tradição e folclore',
      statusDescription: '13º Lugar'
    },
    {
      rank: 14,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'Rio, pé de moleque',
      statusDescription: '14º Lugar'
    },
    {
      rank: 15,
      schoolId: 'tijuca',
      schoolName: 'Unidos da Tijuca',
      enredo: 'Petrópolis, nossa flor serrana',
      statusDescription: '15º Lugar'
    },
    {
      rank: 16,
      schoolId: 'vila_santa_tereza',
      schoolName: 'Unidos da Vila Santa Tereza',
      enredo: 'Primavera, estação das flores',
      statusDescription: '16º Lugar'
    }
  ],
  1973: [
    {
      rank: 1,
      schoolId: 'estacio_de_sa',
      schoolName: 'Unidos de São Carlos (Estácio de Sá)',
      enredo: 'Trá, lá, lá, um hino ao carnaval brasileiro de Lamartine Babo',
      promoted: true,
      statusDescription: '1ª (Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'beija_flor',
      schoolName: 'Beija-Flor de Nilópolis',
      enredo: 'Educação para o desenvolvimento',
      promoted: true,
      statusDescription: '2ª (Vice-Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Bahia de Jorge Amado',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Brasil, explosão do progresso',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Os imortais da música brasileira',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Estórias que ouvimos na infância',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Momentos inesquecíveis de Tapoagipe',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'tijuca',
      schoolName: 'Unidos da Tijuca',
      enredo: 'Bom dia, café!',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'uniao_da_ilha',
      schoolName: 'União da Ilha do Governador',
      enredo: 'Y-Juca Pirama',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes de Cordovil',
      enredo: 'Festival do cinema brasileiro',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Samba, dança para os orixás',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'As sete portas da Bahia de Carybé',
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Aclamação e coroação de D. Pedro I',
      relegated: true,
      statusDescription: '13ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 14,
      schoolId: 'imperio_do_maranga',
      schoolName: 'Império do Marangá',
      enredo: 'Os Imortais da Música - Aquarela do Brasil',
      relegated: true,
      statusDescription: '14ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 15,
      schoolId: 'imperio_de_campo_grande',
      schoolName: 'Império de Campo Grande',
      enredo: 'Casa grande e senzala',
      relegated: true,
      statusDescription: '15ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 16,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Cazuza',
      relegated: true,
      statusDescription: '16ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1972: [
    {
      rank: 1,
      schoolId: 'tupy_bras_de_pina',
      schoolName: 'Tupy de Brás de Pina',
      enredo: 'Chiquinha Gonzaga, alma cantante do Brasil',
      promoted: true,
      statusDescription: '1ª (Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Banzo Ayê',
      promoted: true,
      statusDescription: '2ª (Vice-Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Sempre Brasil (Brasil de ponta a ponta)',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Salve, salve Independência',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Dança de um Povo Livre',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'beija_flor',
      schoolName: 'Beija-Flor de Nilópolis',
      enredo: 'Bahia dos meus amores',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'A Festa da Independência',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'uniao_da_ilha',
      schoolName: 'União da Ilha do Governador',
      enredo: 'A Festa da Cavalhada',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes de Cordovil',
      enredo: 'Datas, personagens e fatos históricos',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'tijuca',
      schoolName: 'Unidos da Tijuca',
      enredo: 'Ganga Zumba',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Brasil, a flor que desabrocha',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Brasil folclórico',
      relegated: true,
      statusDescription: '12ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 13,
      schoolId: 'unidos_de_manguinhos',
      schoolName: 'Unidos de Manguinhos',
      enredo: 'Zumbi dos Palmares',
      relegated: true,
      statusDescription: '13ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 14,
      schoolId: 'grande_rio_duque_de_caxias',
      schoolName: 'Grande Rio',
      enredo: 'A outra força do Brasil',
      relegated: true,
      statusDescription: '14ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 15,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Laços de amizade',
      relegated: true,
      statusDescription: '15ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 16,
      schoolId: 'vila_santa_tereza',
      schoolName: 'Unidos da Vila Santa Tereza',
      enredo: 'Heróis da Liberdade',
      relegated: true,
      statusDescription: '16ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 0,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'Um dos motivos da Independência do Brasil',
      relegated: true,
      isHorsConcours: true,
      statusDescription: 'Não desfilou (Rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1971: [
    {
      rank: 1,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Este Rio que Eu Amo',
      promoted: true,
      statusDescription: '1ª (Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Tributo às Raízes, Pixinguinha, Donga e João da Baiana',
      promoted: true,
      statusDescription: '2ª (Vice-Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Casa-Grande e Senzala',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'tupy_bras_de_pina',
      schoolName: 'Tupy de Brás de Pina',
      enredo: 'São Francisco a Caminho do Sertão',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'O Beijo de Três Saudades',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Rio, Carnaval e Batucada',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'beija_flor',
      schoolName: 'Beija-Flor de Nilópolis',
      enredo: 'Carnaval, Sublime Ilusão',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Bahia de Ontem, de Hoje e de Sempre',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Três Fases da Poesia',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'tijuca',
      schoolName: 'Unidos da Tijuca',
      enredo: 'Quiva e Iaiá',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Marília de Dirceu',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes do Leblon (Independentes de Cordovil)',
      enredo: 'Baile das Rosas',
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Ninguém Segura este País',
      statusDescription: '13º Lugar'
    },
    {
      rank: 14,
      schoolId: 'uniao_da_ilha',
      schoolName: 'União da Ilha do Governador',
      enredo: 'Ritual Afro-Brasileiro',
      statusDescription: '14º Lugar'
    },
    {
      rank: 15,
      schoolId: 'unidos_de_manguinhos',
      schoolName: 'Unidos de Manguinhos',
      enredo: 'Ouro Verde',
      statusDescription: '15º Lugar'
    },
    {
      rank: 16,
      schoolId: 'cartolinhas_de_caxias',
      schoolName: 'Cartolinhas de Caxias',
      enredo: 'Viagem ao Norte e Nordeste Brasileiro',
      statusDescription: '16º Lugar'
    }
  ],
  1970: [
    {
      rank: 1,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Segredos e encantos da Bahia',
      promoted: true,
      statusDescription: '1ª (Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Primavera',
      promoted: true,
      statusDescription: '2ª (Vice-Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'tupy_bras_de_pina',
      schoolName: 'Tupy de Brás de Pina',
      enredo: 'Praça XI, Berço do Samba',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Memórias da rua do Ouvidor',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Salões e damas imperiais',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'beija_flor',
      schoolName: 'Beija-Flor de Nilópolis',
      enredo: 'Rio, quatro séculos de glórias',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'paraiso_do_tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Alencar, Patriarca da Literatura Brasileira',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'O mundo maravilhoso de Debret',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Histórias fantásticas',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Arte barroca',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'As musas de Chico Buarque de Holanda',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'tijuca',
      schoolName: 'Unidos da Tijuca',
      enredo: 'Festas da Bahia',
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'aprendizes_da_gavea',
      schoolName: 'Aprendizes da Gávea',
      enredo: 'Evolução dos transportes na terra carioca',
      relegated: true,
      statusDescription: '13ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 14,
      schoolId: 'uniao_do_centenario',
      schoolName: 'União do Centenário',
      enredo: 'Brasil, berço de riquezas',
      relegated: true,
      statusDescription: '14ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 0,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes do Leblon (Independentes de Cordovil)',
      enredo: 'Não desfilou',
      relegated: true,
      isHorsConcours: true,
      statusDescription: 'Não desfilou (Rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 0,
      schoolId: 'uniao_vaz_lobo',
      schoolName: 'União de Vaz Lobo',
      enredo: 'Iracema, a virgem Tupã',
      relegated: true,
      isHorsConcours: true,
      statusDescription: 'Não desfilou (Rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1969: [
    {
      rank: 1,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'O Rio dos Vice-Reis',
      promoted: true,
      statusDescription: '1ª (Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Vila Rica do Pilar',
      promoted: true,
      statusDescription: '2ª (Vice-Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'paraiso_do_tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'O Mundo da Poesia de Olavo Bilac',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Memórias Históricas do Primeiro Império',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'aprendizes_da_gavea',
      schoolName: 'Aprendizes da Gávea',
      enredo: 'Último Baile Imperial',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Imperatriz das Rosas',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Três Lendas de Amor',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'tijuca',
      schoolName: 'Unidos da Tijuca',
      enredo: 'Tijuca Sempre Jovem',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'beija_flor',
      schoolName: 'Beija-Flor de Nilópolis',
      enredo: 'O Paquete do Exílio',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'uniao_do_centenario',
      schoolName: 'União do Centenário',
      enredo: 'Barão de Mauá',
      statusDescription: '10º Lugar'
    },
    {
      rank: 0,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'O negro na civilização brasileira',
      isHorsConcours: true,
      statusDescription: 'Não desfilou • Problemas com o som da avenida'
    },
    {
      rank: 0,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes do Leblon (Independentes de Cordovil)',
      enredo: 'Baile das Rosas',
      isHorsConcours: true,
      statusDescription: 'Não desfilou • Problemas com o som da avenida'
    },
    {
      rank: 0,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Assim dança o Brasil',
      isHorsConcours: true,
      statusDescription: 'Não desfilou • Problemas com o som da avenida'
    },
    {
      rank: 0,
      schoolId: 'tupy_bras_de_pina',
      schoolName: 'Tupy de Brás de Pina',
      enredo: 'Senzala em festa',
      isHorsConcours: true,
      statusDescription: 'Não desfilou • Problemas com o som da avenida'
    }
  ],
  1968: [
    {
      rank: 1,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Anita Garibaldi, amor e revolução',
      promoted: true,
      statusDescription: '1ª (Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'imperatriz',
      schoolName: 'Imperatriz Leopoldinense',
      enredo: 'Bahia em festa',
      promoted: true,
      statusDescription: '2ª (Vice-Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'tijuca',
      schoolName: 'Unidos da Tijuca',
      enredo: 'Danças do Brasil',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Promulgação da lei áurea',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Moedas e medalhas do Brasil',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'tupy_bras_de_pina',
      schoolName: 'Tupy de Brás de Pina',
      enredo: 'Bodas Imperiais',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Vultos da cultura imperial',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Salões e damas do Segundo Império',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'beija_flor',
      schoolName: 'Beija-Flor de Nilópolis',
      enredo: 'Exaltação a José de Alencar',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Exaltação à cultura nacional',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'aprendizes_da_gavea',
      schoolName: 'Aprendizes da Gávea',
      enredo: 'Dragão do mar ou Jangadeiro da abolição',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Exaltação às façanhas heróicas dos bravos bandeirantes',
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Brasil em plena primavera',
      relegated: true,
      statusDescription: '13ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 14,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'A primazia da Bahia',
      relegated: true,
      statusDescription: '14ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1967: [
    {
      rank: 1,
      schoolId: 'estacio_de_sa',
      schoolName: 'Unidos de São Carlos (Estácio de Sá)',
      enredo: 'Lendas e costumes do Brasil',
      promoted: true,
      statusDescription: '1ª (Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes do Leblon (Independentes de Cordovil)',
      enredo: 'Último baile da Ilha Fiscal',
      promoted: true,
      statusDescription: '2ª (Vice-Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Vida e amores de Beja',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'O penacho do capitão-mor',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Núpcias Imperiais',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'tupy_bras_de_pina',
      schoolName: 'Tupy de Brás de Pina',
      enredo: 'O homem que não quis ser rei',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Contratadores de diamantes',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Bandeiras e brasões na história do Brasil',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'aprendizes_da_gavea',
      schoolName: 'Aprendizes da Gávea',
      enredo: 'Dorotéia de Vila Rica',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'A Condessa de Barral',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'O Brasil através de sua música',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'unidos_de_manguinhos',
      schoolName: 'Unidos de Manguinhos',
      enredo: 'Espumas flutuantes - Homenagem a Castro Alves',
      relegated: true,
      statusDescription: '12ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 13,
      schoolId: 'unidos_do_jardim',
      schoolName: 'Unidos do Jardim',
      enredo: 'Brasil, reino, império',
      relegated: true,
      statusDescription: '13ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1966: [
    {
      rank: 1,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Apoteose ao Folclore Brasileiro',
      promoted: true,
      statusDescription: '1ª (Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'imperatriz',
      schoolName: 'Imperatriz Leopoldinense',
      enredo: 'Monarquia e esplendor da história',
      promoted: true,
      statusDescription: '2ª (Vice-Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'estacio_de_sa',
      schoolName: 'Unidos de São Carlos (Estácio de Sá)',
      enredo: 'História da Escola Nacional de Belas Artes',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'aprendizes_da_gavea',
      schoolName: 'Aprendizes da Gávea',
      enredo: 'A Vida em Flor de Dona Beja',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes do Leblon (Independentes de Cordovil)',
      enredo: 'D. Beja, a feiticeira de Araxá',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Galeria de vultos imperiais',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Conquista de Araci',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Chiquinha Gonzaga e sua época',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'tupy_bras_de_pina',
      schoolName: 'Tupy de Brás de Pina',
      enredo: 'Exaltação à Bahia',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Apoteose ao trabalho',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'tijuca',
      schoolName: 'Unidos da Tijuca',
      enredo: 'O Império em Três Atos',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Vida e obra de D. João VI',
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'unidos_do_jardim',
      schoolName: 'Unidos do Jardim',
      enredo: 'Os Três Acontecimentos Históricos',
      statusDescription: '13º Lugar'
    },
    {
      rank: 14,
      schoolId: 'uniao_do_centenario',
      schoolName: 'União do Centenário',
      enredo: 'Sua Majestade, o Carnaval',
      relegated: true,
      statusDescription: '14ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 15,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Sonho de uma Noite de Carnaval',
      relegated: true,
      statusDescription: '15ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1965: [
    {
      rank: 1,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Rio, quatro séculos de glórias',
      promoted: true,
      statusDescription: '1ª (Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'vila_isabel',
      schoolName: 'Unidos de Vila Isabel',
      enredo: 'Epopéia do Teatro Municipal',
      promoted: true,
      statusDescription: '2ª (Vice-Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Relíquias e Memórias do Rio',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes do Leblon (Independentes de Cordovil)',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'tijuca',
      schoolName: 'Unidos da Tijuca',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Rio através da história',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'aprendizes_da_gavea',
      schoolName: 'Aprendizes da Gávea',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Quatro séculos de glória',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'tupy_bras_de_pina',
      schoolName: 'Tupy de Brás de Pina',
      enredo: 'Outros carnavais',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Rio de 400 janeiros',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'O IV centenário do Rio de Janeiro',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Viagem através do Rio',
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'uniao_do_centenario',
      schoolName: 'União do Centenário',
      statusDescription: '13º Lugar'
    },
    {
      rank: 14,
      schoolId: 'imperio_do_maranga',
      schoolName: 'Império do Marangá',
      enredo: 'Exaltação ao IV centenário do Rio de Janeiro',
      relegated: true,
      statusDescription: '14ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 15,
      schoolId: 'vila_santa_tereza',
      schoolName: 'Unidos da Vila Santa Tereza',
      enredo: 'Rio Antigo',
      relegated: true,
      statusDescription: '15ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1964: [
    {
      rank: 1,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'O esplendor do Rio Imperial',
      promoted: true,
      statusDescription: '1ª (Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'imperatriz',
      schoolName: 'Imperatriz Leopoldinense',
      enredo: 'A Favorita do Imperador, Marquesa de Santos',
      promoted: true,
      statusDescription: '2ª (Vice-Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'vila_isabel',
      schoolName: 'Unidos de Vila Isabel',
      enredo: 'Exaltação à Bahia',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'tijuca',
      schoolName: 'Unidos da Tijuca',
      enredo: 'Homenagem ao Rio Grande do Sul',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Costumes e Tradições da Bahia',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'uniao_do_centenario',
      schoolName: 'União do Centenário',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes do Leblon (Independentes de Cordovil)',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'aprendizes_da_gavea',
      schoolName: 'Aprendizes da Gávea',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'O sonho das esmeraldas',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'O último baile da corte imperial',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'imperio_do_maranga',
      schoolName: 'Império do Marangá',
      enredo: 'Aclamação a D. Pedro I',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'beija_flor',
      schoolName: 'Beija-Flor de Nilópolis',
      enredo: 'Café, riqueza do Brasil',
      relegated: true,
      statusDescription: '12ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 13,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'Jóias da poesia',
      relegated: true,
      statusDescription: '13ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1963: [
    {
      rank: 1,
      schoolId: 'unidos_da_capela',
      schoolName: 'Unidos da Capela',
      promoted: true,
      statusDescription: '1ª (Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Costumes e tradição do Rio Grande do Sul',
      promoted: true,
      statusDescription: '2ª (Vice-Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'imperatriz',
      schoolName: 'Imperatriz Leopoldinense',
      enredo: 'As Três Capitais',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'vila_isabel',
      schoolName: 'Unidos de Vila Isabel',
      enredo: 'Três acontecimentos históricos',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes do Leblon (Independentes de Cordovil)',
      enredo: 'Brasil turístico',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Reminiscências da música popular brasileira',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'uniao_do_centenario',
      schoolName: 'União do Centenário',
      enredo: 'Uma página da história do Brasil',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'tijuca',
      schoolName: 'Unidos da Tijuca',
      enredo: 'Do Oiapoque ao Chuí',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Ilusão de um bandeirante (A lenda da pedra verde)',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'tupy_bras_de_pina',
      schoolName: 'Tupy de Brás de Pina',
      enredo: 'Vinte anos a serviço do carnaval',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'flor_do_lins',
      schoolName: 'Flor do Lins',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'filhos_do_deserto',
      schoolName: 'Filhos do Deserto',
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'imperio_do_maranga',
      schoolName: 'Império do Marangá',
      enredo: 'Exaltação ao Barão do Rio Branco',
      statusDescription: '13º Lugar'
    },
    {
      rank: 14,
      schoolId: 'unidos_de_nilopolis',
      schoolName: 'Unidos de Nilópolis',
      enredo: 'O Último baile imperial da Ilha Fiscal',
      relegated: true,
      statusDescription: '14ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 15,
      schoolId: 'academicos_bento_ribeiro',
      schoolName: 'Acadêmicos de Bento Ribeiro',
      relegated: true,
      statusDescription: '15ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1962: [
    {
      rank: 1,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'A fragata de D. Afonso',
      promoted: true,
      statusDescription: '1ª (Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'beija_flor',
      schoolName: 'Beija-Flor de Nilópolis',
      enredo: 'Dia do Fico',
      promoted: true,
      statusDescription: '2ª (Vice-Campeã) • Subiu ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Rapsódia brasileira',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Galeria dos bravos',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'imperatriz',
      schoolName: 'Imperatriz Leopoldinense',
      enredo: 'Rio no século XVIII, Apoteose a Carlos Gomes de Andrade, o Conde de Bobadela',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'academicos_bento_ribeiro',
      schoolName: 'Acadêmicos de Bento Ribeiro',
      enredo: 'Marília de Dirceu',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'tijuca',
      schoolName: 'Unidos da Tijuca',
      enredo: 'Rio pitoresco',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'vila_isabel',
      schoolName: 'Unidos de Vila Isabel',
      enredo: 'Dom João VI',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'uniao_do_centenario',
      schoolName: 'União do Centenário',
      enredo: 'A cultura a serviço do progresso do Brasil',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Cinco fatos históricos',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'imperio_do_maranga',
      schoolName: 'Império do Marangá',
      enredo: 'Cenas do carnaval na Rua do Ouvidor',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'filhos_do_deserto',
      schoolName: 'Filhos do Deserto',
      enredo: 'Jóias da poesia brasileira - Castro Alves',
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'flor_do_lins',
      schoolName: 'Flor do Lins',
      enredo: 'Exaltação aos vultos republicanos',
      statusDescription: '13º Lugar'
    },
    {
      rank: 14,
      schoolId: 'uniao_da_ilha',
      schoolName: 'União da Ilha do Governador',
      enredo: 'Homenagem a Catulo da Paixão Cearense',
      relegated: true,
      statusDescription: '14ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 15,
      schoolId: 'unidos_da_vila_sao_luis',
      schoolName: 'Unidos da Vila São Luís',
      enredo: 'Reminiscências da história do Brasil',
      relegated: true,
      statusDescription: '15ª (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1961: [
    {
      rank: 1,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Relíquias do Rio Antigo',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Promovida ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'tupy_bras_de_pina',
      schoolName: 'Tupy de Brás de Pina',
      enredo: 'Seca no Nordeste',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Promovida ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'Os bandeirantes',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'vila_isabel',
      schoolName: 'Unidos de Vila Isabel',
      enredo: 'A Imprensa Através dos Tempos',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'filhos_do_deserto',
      schoolName: 'Filhos do Deserto',
      enredo: 'Homenagem a Santos Dumont',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'uniao_do_centenario',
      schoolName: 'União do Centenário',
      enredo: 'Anhangüera',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'tijuca',
      schoolName: 'Unidos da Tijuca',
      enredo: 'Leilão de Escravos',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'beija_flor',
      schoolName: 'Beija-Flor de Nilópolis',
      enredo: 'Homenagem à Brasília',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'flor_do_lins',
      schoolName: 'Flor do Lins',
      enredo: 'Um Dia na Primavera',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Brasil em três épocas',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'imperio_do_maranga',
      schoolName: 'Império do Marangá',
      enredo: 'Vultos que Engrandeceram a História da Bahia',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'unidos_da_vila_sao_luis',
      schoolName: 'Unidos da Vila São Luís',
      enredo: 'Reminiscências do Carnaval',
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'aprendizes_boca_do_mato',
      schoolName: 'Aprendizes da Boca do Mato',
      enredo: 'Três vultos da Independência do Brasil',
      relegated: true,
      statusDescription: '13ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 14,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Exaltação a Pedro Américo, Castro Alves e Rui Barbosa',
      relegated: true,
      statusDescription: '14ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 15,
      schoolId: 'uniao_vaz_lobo',
      schoolName: 'União de Vaz Lobo',
      enredo: 'Chico Rei',
      relegated: true,
      statusDescription: '15ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 16,
      schoolId: 'unidos_de_nilopolis',
      schoolName: 'Unidos de Nilópolis',
      enredo: 'Guanabara em Foco',
      relegated: true,
      statusDescription: '16ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 17,
      schoolId: 'cartolinhas_de_caxias',
      schoolName: 'Cartolinhas de Caxias',
      enredo: 'Iracema',
      relegated: true,
      statusDescription: 'Não desfilou (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1960: [
    {
      rank: 1,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Invasão holandesa na Bahia',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Promovida ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'academicos_bento_ribeiro',
      schoolName: 'Acadêmicos de Bento Ribeiro',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Promovida ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'imperio_do_maranga',
      schoolName: 'Império do Marangá',
      enredo: 'Rio antigo Colonial',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'De Cabral a JK',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'tupy_bras_de_pina',
      schoolName: 'Tupy de Brás de Pina',
      enredo: 'Exaltação à Arte e Pintura de Almeida Jr.',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Brasil universitário',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'filhos_do_deserto',
      schoolName: 'Filhos do Deserto',
      enredo: 'Brasil Colonial',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'tijuca',
      schoolName: 'Unidos da Tijuca',
      enredo: 'Sonho de Bravos',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'cartolinhas_de_caxias',
      schoolName: 'Cartolinhas de Caxias',
      enredo: 'As Três Heroínas',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'flor_do_lins',
      schoolName: 'Flor do Lins',
      enredo: 'Glória a Memória de Carlos Gomes',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Exaltação a Villa Lobos',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'unidos_da_vila_sao_luis',
      schoolName: 'Unidos da Vila São Luís',
      enredo: 'Entradas e Bandeiras através dos Séculos',
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'unidos_de_nilopolis',
      schoolName: 'Unidos de Nilópolis',
      enredo: 'Exaltação a Brasília',
      statusDescription: '13º Lugar'
    },
    {
      rank: 14,
      schoolId: 'uniao_da_piedade',
      schoolName: 'União da Piedade',
      enredo: 'Academia de Letras',
      relegated: true,
      statusDescription: '14ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 15,
      schoolId: 'unidos_do_jacare',
      schoolName: 'Unidos do Jacaré',
      enredo: 'Adeus Cidade Maravilhosa',
      relegated: true,
      statusDescription: '15ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 16,
      schoolId: 'unidos_do_morro_azul',
      schoolName: 'Unidos do Morro Azul',
      enredo: 'Três Gigantes do Patriotismo',
      relegated: true,
      statusDescription: '16ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 17,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Exaltação ao Estado do Rio de Janeiro',
      relegated: true,
      statusDescription: '17ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 18,
      schoolId: 'unidos_do_salgueiro',
      schoolName: 'Unidos do Salgueiro',
      relegated: true,
      statusDescription: '18ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 19,
      schoolId: 'estacio_de_sa',
      schoolName: 'Unidos de São Carlos (Estácio de Sá)',
      relegated: true,
      statusDescription: 'Não desfilou (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1959: [
    {
      rank: 1,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Lampião',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Promovida ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'aprendizes_boca_do_mato',
      schoolName: 'Aprendizes da Boca do Mato',
      enredo: 'Machado de Assis',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Promovida ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Homenagem aos bombeiros',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'unidos_bento_ribeiro',
      schoolName: 'Unidos de Bento Ribeiro',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'unidos_do_morro_azul',
      schoolName: 'Unidos do Morro Azul',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'unidos_da_piedade',
      schoolName: 'Unidos da Piedade',
      enredo: 'Noite de núpcias',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'imperio_do_maranga',
      schoolName: 'Império do Marangá',
      enredo: 'Três Páginas da História do Brasil',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'unidos_do_coqueiro',
      schoolName: 'Unidos do Coqueiro',
      enredo: 'Exaltação a Barão de Mauá',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'unidos_de_nilopolis',
      schoolName: 'Unidos de Nilópolis',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'unidos_do_jacare',
      schoolName: 'Unidos do Jacaré',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'estacio_de_sa',
      schoolName: 'Unidos de São Carlos (Estácio de Sá)',
      enredo: 'Marechal Rondon',
      statusDescription: '11º Lugar (empatada)'
    },
    {
      rank: 11,
      schoolId: 'flor_do_lins',
      schoolName: 'Flor do Lins',
      statusDescription: '11º Lugar (empatada)'
    },
    {
      rank: 11,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Revista brasileira',
      statusDescription: '11º Lugar (empatada)'
    },
    {
      rank: 11,
      schoolId: 'unidos_da_vila_sao_luis',
      schoolName: 'Unidos da Vila São Luís',
      statusDescription: '11º Lugar (empatada)'
    },
    {
      rank: 12,
      schoolId: 'uniao_vaz_lobo',
      schoolName: 'União de Vaz Lobo',
      relegated: true,
      statusDescription: '12ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 12,
      schoolId: 'vila_isabel',
      schoolName: 'Unidos de Vila Isabel',
      enredo: 'Homenagem à Saldanha da Gama',
      relegated: true,
      statusDescription: '12ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 13,
      schoolId: 'uniao_do_catete',
      schoolName: 'União do Catete',
      relegated: true,
      statusDescription: '13ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 14,
      schoolId: 'aprendizes_da_penha_circular',
      schoolName: 'Aprendizes da Penha Circular',
      relegated: true,
      statusDescription: '14ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 15,
      schoolId: 'aprendizes_da_gavea',
      schoolName: 'Aprendizes da Gávea',
      relegated: true,
      statusDescription: '15ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 15,
      schoolId: 'imperio_de_campo_grande',
      schoolName: 'Império de Campo Grande',
      relegated: true,
      statusDescription: '15ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 15,
      schoolId: 'independentes_de_mesquita',
      schoolName: 'Independentes de Mesquita',
      relegated: true,
      statusDescription: '15ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 16,
      schoolId: 'capricho_do_centenario',
      schoolName: 'Capricho do Centenário',
      relegated: true,
      statusDescription: '16ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 17,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      relegated: true,
      statusDescription: '17ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 18,
      schoolId: 'universitaria_de_rocha_miranda',
      schoolName: 'Universitária de Rocha Miranda',
      relegated: true,
      statusDescription: '18ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 19,
      schoolId: 'alem_do_horizonte',
      schoolName: 'Além do Horizonte',
      relegated: true,
      statusDescription: '19ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 20,
      schoolId: 'unidos_da_congonha',
      schoolName: 'Unidos da Congonha',
      relegated: true,
      statusDescription: '20ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 21,
      schoolId: 'unidos_da_favela',
      schoolName: 'Unidos da Favela',
      enredo: 'Quatro vultos da Bahia',
      relegated: true,
      statusDescription: '21ª (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 22,
      schoolId: 'filhos_do_deserto',
      schoolName: 'Filhos do Deserto',
      relegated: true,
      statusDescription: 'Não desfilou (rebaixada) • Rebaixada para a Série Prata'
    },
    {
      rank: 23,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes do Leblon (Independentes de Cordovil)',
      relegated: true,
      statusDescription: 'Não desfilou (rebaixada) • Rebaixada para a Série Prata'
    }
  ],
  1958: [
    {
      rank: 1,
      schoolId: 'mocidade',
      schoolName: 'Mocidade Independente de Padre Miguel',
      enredo: 'Apoteose do samba',
      promoted: true,
      statusDescription: '1ª (subiu) • Campeã • Promovida ao Grupo Especial'
    },
    {
      rank: 2,
      schoolId: 'unidos_do_salgueiro',
      schoolName: 'Unidos do Salgueiro',
      enredo: 'Ouro Negro',
      promoted: true,
      statusDescription: '2ª (subiu) • Vice-Campeã • Promovida ao Grupo Especial'
    },
    {
      rank: 3,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Homenagem às Forças Armadas',
      promoted: true,
      statusDescription: '3ª (subiu) • 3º Lugar • Promovida ao Grupo Especial'
    },
    {
      rank: 4,
      schoolId: 'estacio_de_sa',
      schoolName: 'Unidos de São Carlos (Estácio de Sá)',
      enredo: 'Homenagem a Alberto Santos Dumont',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'vila_isabel',
      schoolName: 'Unidos de Vila Isabel',
      enredo: 'Riquezas do Brasil',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'unidos_da_vila_sao_luis',
      schoolName: 'Unidos da Vila São Luís',
      enredo: 'Como é Grande o Meu Brasil',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'uniao_do_catete',
      schoolName: 'União do Catete',
      enredo: 'Homenagem ao Gaúcho',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'unidos_da_piedade',
      schoolName: 'Unidos da Piedade',
      enredo: 'Brasília, Novo Horizonte',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'unidos_de_nilopolis',
      schoolName: 'Unidos de Nilópolis',
      enredo: 'As Minas de Prata',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes do Leblon (Independentes de Cordovil)',
      enredo: 'Escravatura',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Amores de D. Pedro I',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'unidos_do_morro_azul',
      schoolName: 'Unidos do Morro Azul',
      enredo: 'Homenagem a José Bonifácio',
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'paz_e_amor',
      schoolName: 'Paz e Amor',
      enredo: 'Sonho Infantil',
      statusDescription: '13º Lugar'
    },
    {
      rank: 14,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Relicário histórico',
      statusDescription: '14º Lugar'
    },
    {
      rank: 15,
      schoolId: 'aprendizes_da_gavea',
      schoolName: 'Aprendizes da Gávea',
      enredo: 'Anita Garibaldi',
      statusDescription: '15º Lugar'
    },
    {
      rank: 16,
      schoolId: 'imperio_de_campo_grande',
      schoolName: 'Império de Campo Grande',
      enredo: 'Bandeirante no Século',
      statusDescription: '16º Lugar'
    },
    {
      rank: 17,
      schoolId: 'aprendizes_boca_do_mato',
      schoolName: 'Aprendizes da Boca do Mato',
      enredo: 'Exaltação à Tamandaré',
      statusDescription: '17º Lugar'
    },
    {
      rank: 18,
      schoolId: 'imperio_do_maranga',
      schoolName: 'Império do Marangá',
      enredo: 'Proclamação da República ou Três Páginas da História do Brasil',
      statusDescription: '18º Lugar'
    },
    {
      rank: 19,
      schoolId: 'alem_do_horizonte',
      schoolName: 'Além do Horizonte',
      enredo: 'O Tigre da Abolição',
      statusDescription: '19º Lugar'
    },
    {
      rank: 20,
      schoolId: 'uniao_vaz_lobo',
      schoolName: 'União de Vaz Lobo',
      enredo: 'Recordar é viver',
      statusDescription: '20º Lugar'
    },
    {
      rank: 21,
      schoolId: 'alunos_da_penha_circular',
      schoolName: 'Alunos da Penha Circular',
      enredo: 'Trajes regionais',
      statusDescription: '21º Lugar'
    },
    {
      rank: 22,
      schoolId: 'universitaria_de_rocha_miranda',
      schoolName: 'Universitária de Rocha Miranda',
      enredo: 'A vida no morro',
      statusDescription: '22º Lugar'
    },
    {
      rank: 23,
      schoolId: 'unidos_da_congonha',
      schoolName: 'Unidos da Congonha',
      enredo: 'Proclamação da República',
      statusDescription: '23º Lugar'
    },
    {
      rank: 24,
      schoolId: 'unidos_do_jacare',
      schoolName: 'Unidos do Jacaré',
      enredo: 'Fernão Dias Paes Leme',
      statusDescription: '24º Lugar'
    },
    {
      rank: 25,
      schoolId: 'imperio_de_bonsucesso',
      schoolName: 'Império de Bonsucesso',
      statusDescription: 'Não desfilou'
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
  2001: 'Carnaval de 2001: Unidos do Porto da Pedra (Campeã) e São Clemente (Vice-Campeã) promovidas ao Grupo Especial. Inocentes de Belford Roxo e Em Cima da Hora rebaixadas para a Série Prata.',
  2000: 'Carnaval de 2000: Império Serrano (Campeã) e Paraíso do Tuiuti (Vice-Campeã) promovidas ao Grupo Especial. Acadêmicos da Rocinha, Unidos do Jacarezinho, Acadêmicos do Cubango e Unidos do Cabuçu rebaixadas para a Série Prata.',
  1999: 'Carnaval de 1999: Unidos da Tijuca (Campeã) e Unidos do Porto da Pedra (Vice-Campeã) promovidas ao Grupo Especial. Unidos da Ponte e Unidos da Villa Rica rebaixadas para a Série Prata.',
  1998: 'Carnaval de 1998: Império Serrano (Campeã) e São Clemente (Vice-Campeã) promovidas ao Grupo Especial. Acadêmicos da Rocinha e Lins Imperial rebaixadas para a Série Prata.',
  1997: 'Carnaval de 1997: Tradição (Campeã) e Caprichosos de Pilares (Vice-Campeã) promovidas ao Grupo Especial. Unidos do Cabuçu, Arranco, Acadêmicos do Dendê e Vizinha Faladeira rebaixadas para a Série Prata.',
  1996: 'Carnaval de 1996: Acadêmicos de Santa Cruz (Campeã) e Acadêmicos da Rocinha (Vice-Campeã) promovidas ao Grupo Especial. Arrastão de Cascadura, Acadêmicos do Engenho da Rainha, Acadêmicos do Cubango e Unidos da Villa Rica rebaixadas para a Série Prata (a Unidos da Villa Rica não desfilou).',
  1995: 'Carnaval de 1995: Unidos do Porto da Pedra (Campeã) e Império da Tijuca (Vice-Campeã) promovidas ao Grupo Especial. Nove escolas rebaixadas para a Série Prata: Unidos do Jacarezinho, Difícil é o Nome, Leão de Nova Iguaçu, Unidos de Lucas, Lins Imperial, Arranco, Independentes de Cordovil, Mocidade Unida da Cidade de Deus e Canários das Laranjeiras.',
  1994: 'Carnaval de 1994: (Não Houve Rebaixamento) • Unidos da Villa Rica (Campeã) e São Clemente (Vice-Campeã) promovidas ao Grupo Especial.',
  1993: 'Carnaval de 1993: Tradição (Campeã) e Império Serrano (Vice-Campeã) promovidas ao Grupo Especial. Mocidade Unida da Cidade de Deus rebaixada para a Série Prata.',
  1992: 'Carnaval de 1992: Acadêmicos do Grande Rio (Campeã) e Unidos da Ponte (Vice-Campeã) promovidas ao Grupo Especial. Independentes de Cordovil e Unidos do Campinho rebaixadas para a Série Prata.',
  1991: 'Carnaval de 1991: Tradição (Campeã) e Leão de Nova Iguaçu (Vice-Campeã) promovidas ao Grupo Especial. A Acadêmicos de Santa Cruz desfilou como Hors concours após uma queda de energia no Sambódromo durante seu desfile e ganhou o direito de desfilar no Grupo Especial em 1992. Paraíso do Tuiuti rebaixada para a Série Prata.',
  1990: 'Carnaval de 1990: (Não Houve Rebaixamento) • Unidos do Viradouro (Campeã) e Acadêmicos do Grande Rio (Vice-Campeã) promovidas ao Grupo Especial.',
  1989: 'Carnaval de 1989: Acadêmicos de Santa Cruz (Campeã) e Lins Imperial (Vice-Campeã) promovidas ao Grupo Especial. Em Cima da Hora e Tupy de Brás de Pina rebaixadas para a Série Prata.',
  1988: 'Carnaval de 1988: (Não Houve Rebaixamento) • Arranco (Campeã) e Unidos do Jacarezinho (Vice-Campeã) promovidas ao Grupo Especial.',
  1987: 'Carnaval de 1987: Unidos da Tijuca (Campeã) e Tradição (Vice-Campeã) promovidas ao Grupo Especial. Em Cima da Hora rebaixada para a Série Prata.',
  1986: 'Carnaval de 1986: Unidos do Jacarezinho (Campeã) e São Clemente (Vice-Campeã) promovidas ao Grupo Especial. União de Jacarepaguá rebaixada para a Série Prata.',
  1985: 'Carnaval de 1985: Unidos da Ponte (Campeã) e Unidos da Tijuca (Vice-Campeã) promovidas ao Grupo Especial. Quatro agremiações rebaixadas para a Série Prata: Unidos de Bangu, Arrastão de Cascadura, Lins Imperial e Unidos de Padre Miguel.',
  1984: 'Carnaval de 1984: Unidos do Cabuçu (Campeã), Acadêmicos de Santa Cruz (Vice-Campeã), Em Cima da Hora (3ª) e São Clemente (4ª) promovidas ao Grupo Especial. Cabuçu e Santa Cruz receberam o direito de disputar o Supercampeonato do Sambódromo. Paraíso do Tuiuti e Império do Marangá rebaixadas para a Série Prata.',
  1983: 'Carnaval de 1983: (Não Houve Rebaixamento) • Unidos de São Carlos (Estácio de Sá) Campeã e Império da Tijuca Vice-Campeã promovidas ao Grupo Especial.',
  1982: 'Carnaval de 1982: Caprichosos de Pilares (Campeã) e Unidos da Ponte (Vice-Campeã) promovidas ao Grupo Especial. Arranco e União de Jacarepaguá rebaixadas para a Série Prata.',
  1981: 'Carnaval de 1981: (Não Houve Rebaixamento) • Unidos de São Carlos (Estácio de Sá) Campeã e Império da Tijuca Vice-Campeã promovidas ao Grupo Especial.',
  1980: 'Carnaval de 1980: Unidos da Tijuca Campeã e promovida ao Grupo Especial. São Clemente e Unidos da Ponte rebaixadas para a Série Prata.',
  1979: 'Carnaval de 1979: (Não Houve Rebaixamento) • Unidos de Vila Isabel Campeã e Império Serrano Vice-Campeã promovidas ao Grupo Especial.',
  1978: 'Carnaval de 1978: Unidos de São Carlos (Campeã) e Imperatriz Leopoldinense (Vice-Campeã) promovidas ao Grupo Especial. Rebaixamento da 7ª à 16ª colocada para a Série Prata (Grupo 2A/Grupo 3) em virtude da reestruturação dos grupos para a criação do Grupo 1-A e 1-B em 1979.',
  1977: 'Carnaval de 1977: Arrastão de Cascadura (Campeã) e Arranco (Vice-Campeã) promovidas ao Grupo Especial. Oito escolas rebaixadas para a Série Prata (Grupo 3): Em Cima da Hora, Foliões de Botafogo, Unidos de Nilópolis, Independentes de Cordovil, G.R.E.S. Grande Rio (antiga agremiação de Duque de Caxias, anterior à fundação da Acadêmicos do Grande Rio em 1988), Mocidade Unida da Cidade de Deus, Paraíso do Tuiuti e Unidos de Manguinhos.',
  1976: 'Carnaval de 1976: Império da Tijuca (Campeã) e Unidos do Cabuçu (Vice-Campeã) promovidas ao Grupo Especial. Oito agremiações foram rebaixadas para a Série Prata (Grupo 3): Caprichosos de Pilares, Independentes do Zumbi, Acadêmicos do Engenho da Rainha, Unidos de Bangu, Acadêmicos de Santa Cruz, Unidos de Padre Miguel, Unidos da Ponte e Unidos da Vila Santa Tereza.',
  1975: 'Carnaval de 1975: (Não houve rebaixamento) • Lins Imperial (Campeã) e Tupy de Brás de Pina (Vice-Campeã) promovidas ao Grupo Especial. A Unidos da Ponte não desfilou.',
  1974: 'Carnaval de 1974: (Não houve rebaixamento) • União da Ilha do Governador (Campeã) e Unidos de Lucas (Vice-Campeã) promovidas ao Grupo Especial.',
  1973: 'Carnaval de 1973: Unidos de São Carlos (Campeã) e Beija-Flor de Nilópolis (Vice-Campeã) promovidas ao Grupo Especial. Quatro agremiações foram rebaixadas para a Série Prata (Grupo 3): Caprichosos de Pilares, Império do Marangá, Império de Campo Grande e Unidos de Padre Miguel.',
  1972: 'Carnaval de 1972: Tupy de Brás de Pina (Campeã) e Unidos do Jacarezinho (Vice-Campeã) promovidas ao Grupo Especial. Seis agremiações foram rebaixadas para a Série Prata (Grupo 3): Acadêmicos de Santa Cruz, Unidos de Manguinhos, G.R.E.S. Grande Rio (antiga agremiação de Duque de Caxias), Unidos do Cabuçu, Unidos da Vila Santa Tereza e Unidos de Bangu (não desfilou).',
  1971: 'Carnaval de 1971: (Não houve rebaixamento) • Em Cima da Hora (Campeã) e Unidos de Lucas (Vice-Campeã) promovidas ao Grupo Especial.',
  1970: 'Carnaval de 1970: Império da Tijuca (Campeã) e Unidos de Padre Miguel (Vice-Campeã) promovidas ao Grupo Especial. Quatro agremiações foram rebaixadas para a Série Prata: Aprendizes da Gávea, União do Centenário, Independentes do Leblon (não desfilou) e União de Vaz Lobo (não desfilou).',
  1969: 'Carnaval de 1969: (Não houve rebaixamento) • Acadêmicos de Santa Cruz (Campeã) e Unidos do Jacarezinho (Vice-Campeã) promovidas ao Grupo Especial. Quatro agremiações (Império da Tijuca, Independentes do Leblon, São Clemente e Tupy de Brás de Pina) não conseguiram desfilar devido a problemas técnicos no sistema de som da avenida e não participaram da apuração.',
  1968: 'Carnaval de 1968: Em Cima da Hora (Campeã) e Imperatriz Leopoldinense (Vice-Campeã) promovidas ao Grupo Especial. Duas agremiações foram rebaixadas para a Série Prata: Caprichosos de Pilares e Unidos do Cabuçu.',
  1967: 'Carnaval de 1967: Unidos de São Carlos (Campeã) e Independentes do Leblon (Vice-Campeã) promovidas ao Grupo Especial. Duas agremiações foram rebaixadas para a Série Prata: Unidos de Manguinhos e Unidos do Jardim.',
  1966: 'Carnaval de 1966: São Clemente (Campeã) e Imperatriz Leopoldinense (Vice-Campeã) promovidas ao Grupo Especial. Duas agremiações foram rebaixadas para a Série Prata: União do Centenário e Paraíso do Tuiuti.',
  1965: 'Carnaval de 1965 (IV Centenário do Rio de Janeiro): Acadêmicos de Santa Cruz (Campeã) e Unidos de Vila Isabel (Vice-Campeã) promovidas ao Grupo Especial. Duas agremiações foram rebaixadas para a Série Prata: Império do Marangá e Unidos da Vila Santa Tereza.',
  1964: 'Carnaval de 1964: Império da Tijuca (Campeã) e Imperatriz Leopoldinense (Vice-Campeã) promovidas ao Grupo Especial. Duas agremiações foram rebaixadas para a Série Prata: Beija-Flor de Nilópolis e Unidos de Bangu.',
  1963: 'Carnaval de 1963: Unidos da Capela (Campeã) e Unidos de Padre Miguel (Vice-Campeã) promovidas ao Grupo Especial. Duas agremiações foram rebaixadas para a Série Prata: Unidos de Nilópolis e Acadêmicos de Bento Ribeiro.',
  1962: 'Carnaval de 1962: Unidos de Bangu (Campeã) e Beija-Flor de Nilópolis (Vice-Campeã) promovidas ao Grupo Especial. Duas agremiações foram rebaixadas para a Série Prata: União da Ilha do Governador e Unidos da Vila São Luís.',
  1961: 'Carnaval de 1961: Unidos do Cabuçu (Campeã) e Tupy de Brás de Pina (Vice-Campeã) promovidas ao Grupo Especial. Cinco agremiações foram rebaixadas para a Série Prata: Aprendizes da Boca do Mato, Paraíso do Tuiuti, União de Vaz Lobo, Unidos de Nilópolis e Cartolinhas de Caxias (não desfilou).',
  1960: 'Carnaval de 1960: Caprichosos de Pilares (Campeã) e Acadêmicos de Bento Ribeiro (Vice-Campeã) promovidas ao Grupo Especial. Seis agremiações foram rebaixadas para a Série Prata: União da Piedade, Unidos do Jacaré, Unidos do Morro Azul, Unidos da Ponte, Unidos do Salgueiro e Unidos de São Carlos (não desfilou).',
  1959: 'Carnaval de 1959: Unidos de Padre Miguel (Campeã) e Aprendizes da Boca do Mato (Vice-Campeã) promovidas ao Grupo Especial. Primeiro ano em que houve rebaixamento para a Série Prata (criada em 1960): foram rebaixadas da 12ª à 21ª colocada (incluindo Unidos de Vila Isabel e União de Vaz Lobo), além de Filhos do Deserto e Independentes do Leblon (não desfilaram).',
  1958: 'Carnaval de 1958: Mocidade Independente de Padre Miguel (Campeã), Unidos do Salgueiro (Vice-Campeã) e Paraíso do Tuiuti (3ª colocada) promovidas ao Grupo Especial. (Não Houve Rebaixamento na Série Ouro). O Império de Bonsucesso não desfilou.'
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
