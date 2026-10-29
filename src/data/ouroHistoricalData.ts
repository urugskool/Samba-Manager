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
  2019: 'Carnaval de 2019: Estácio de Sá Campeã com nota máxima e promovida ao Grupo Especial com o enredo "A Fé que Emerge das Águas". Alegria da Zona Sul rebaixada para a Série Prata.'
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
