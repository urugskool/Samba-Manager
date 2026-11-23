/**
 * REGISTRO HISTÓRICO OFICIAL DA SÉRIE PRATA (SUPERLIGA CARNAVALESCA / TERCEIRA DIVISÃO)
 *
 * Fonte da verdade para resultados históricos oficiais, colocações, enredos
 * e movimentações de acesso e rebaixamento da Série Prata do Carnaval Carioca.
 */

import type { YearHistory } from '../types/carnaval';

export interface PrataStandingRecord {
  rank: number;
  nightRank?: number;
  night?: string;
  league?: string;
  schoolId: string;
  schoolName: string;
  totalScore?: number;
  enredo?: string;
  promoted?: boolean; // Subiu para a Série Ouro
  relegated?: boolean; // Rebaixada para a Série Bronze
  isHorsConcours?: boolean; // Desfilou sem julgamento / Não desfilou
  statusDescription?: string;
}

export interface PrataHistoricalCarnaval {
  year: number;
  standings: PrataStandingRecord[];
  subgroups?: {
    noite1?: PrataStandingRecord[];
    noite2?: PrataStandingRecord[];
    liesb?: PrataStandingRecord[];
    livres?: PrataStandingRecord[];
  };
  notes?: string;
  championNames: string[];
  viceChampionNames: string[];
  promotedNames: string[];
  relegatedNames: string[];
  totalSchools: number;
  isNoCarnaval?: boolean;
}

/**
 * Resultados Oficiais da Série Prata catalogados por ano
 */
export const OFFICIAL_PRATA_HISTORICAL_STANDINGS: Record<number, PrataStandingRecord[]> = {
  2026: [
    {
      rank: 1,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Brasil de Mil Faces em Um Só Coração',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'sao_clemente',
      schoolName: 'São Clemente',
      enredo: 'Na Tamarineira, é pagode, é carioca, é São Clemente',
      promoted: true,
      statusDescription: 'Vice-Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 3,
      schoolId: 'vila_santa_tereza',
      schoolName: 'Unidos da Vila Santa Tereza',
      enredo: 'Vila Santa Tereza não marca bobeira e festeja os 65 anos do Cacique de Ramos',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'O Menino Sonhador do Sertão',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'imperio_da_uva',
      schoolName: 'Império da Uva',
      enredo: 'Nos Caminhos da Fé, o Meu Sonho Anunciou… Salve Nossa Senhora Aparecida, a Mãe Preta do Brasil!',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'A Divina Comédia Brasileira',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'fla_manguaca',
      schoolName: 'Flamanguaça',
      enredo: 'Ecos de Sortilégios',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'O povo escreve sua história em um sublime pergaminho',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'abolicao',
      schoolName: 'Acadêmicos da Abolição',
      enredo: 'Chão é Gente. Cultivar, Cultuar e Colher Ancestralidade',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'feitico_carioca',
      schoolName: 'Feitiço Carioca',
      enredo: 'Meu Malvado do Fundo do Coração',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'O Intrépido Santo Guerreiro',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'tubarao_mesquita',
      schoolName: 'Tubarão de Mesquita',
      enredo: 'Berta Ribeiro: Da Praça Onze ao Coração da Floresta',
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'A Menina do Sertão que virou Estrela de TV - Gardênia Cavalcanti',
      statusDescription: '13º Lugar'
    },
    {
      rank: 14,
      schoolId: 'alegria_do_vilar',
      schoolName: 'Alegria do Vilar',
      enredo: 'Regido e guiado pelas Lâminas do Rei da Justiça',
      statusDescription: '14º Lugar'
    },
    {
      rank: 15,
      schoolId: 'santa_marta',
      schoolName: 'Mocidade Unida do Santa Marta',
      enredo: 'Samba é minha Cachaça',
      statusDescription: '15º Lugar'
    },
    {
      rank: 16,
      schoolId: 'independentes_olaria',
      schoolName: 'Independentes de Olaria',
      enredo: 'O balanço do cabra que embolou o som e no compasso da mistura fez um Brasil pandeiro',
      statusDescription: '16º Lugar'
    },
    {
      rank: 17,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Alafiou! Caminhos Abertos para a Vitória!',
      statusDescription: '17º Lugar'
    },
    {
      rank: 18,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Macacu - No caminho das águas cristalinas, reflete a alma da criação',
      statusDescription: '18º Lugar'
    },
    {
      rank: 19,
      schoolId: 'curicica',
      schoolName: 'União do Parque Curicica',
      enredo: 'As Viagens de Arlindo - Minha Loucura é Ser Artista',
      statusDescription: '19º Lugar'
    },
    {
      rank: 20,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Santa Rosa - Negro, Moderno, Plural',
      statusDescription: '20º Lugar'
    },
    {
      rank: 21,
      schoolId: 'arrastao_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'Cascadura se diverte nas culturas populares do Nordeste',
      statusDescription: '21º Lugar'
    },
    {
      rank: 22,
      schoolId: 'imperio_nova_iguacu',
      schoolName: 'Império de Nova Iguaçu',
      enredo: 'Kupapa Unsaba - Morada Ancestral',
      relegated: true,
      statusDescription: '22º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 23,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Quingombô - Entre Dois Mundos',
      relegated: true,
      statusDescription: '23º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 24,
      schoolId: 'siri_de_ramos',
      schoolName: 'Siri de Ramos',
      enredo: 'Jóias do Axé',
      relegated: true,
      statusDescription: '24º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 25,
      schoolId: 'academicos_do_dende',
      schoolName: 'Acadêmicos do Dendê',
      enredo: 'No Carnaval dos 7 Mares, vai dar Zebra!',
      relegated: true,
      statusDescription: '25º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 26,
      schoolId: 'praca_da_bandeira',
      schoolName: 'Independente da Praça da Bandeira',
      enredo: 'Grande Sertão Negro',
      relegated: true,
      statusDescription: '26º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 27,
      schoolId: 'chatuba',
      schoolName: 'Chatuba de Mesquita',
      enredo: 'BenEdita do povo',
      relegated: true,
      statusDescription: '27º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 28,
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'A Voz que vem do Mar é Ancestral',
      relegated: true,
      statusDescription: '28º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 29,
      schoolId: 'leao_de_nova_iguacu',
      schoolName: 'Leão de Nova Iguaçu',
      enredo: 'Maria Felipa',
      relegated: true,
      statusDescription: '29º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  2025: [
    {
      rank: 1,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Eureka! E Fez-se a Luz!',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'imperio_da_uva',
      schoolName: 'Império da Uva',
      enredo: 'Abayomis. Boneca Preta do Brasil… Da Ancestral Referência à Resistência Atual!',
      statusDescription: 'Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'abolicao',
      schoolName: 'Acadêmicos da Abolição',
      enredo: 'Os Reis da Rua',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'Aqualtune, a Inspiração Forjada em Pele Preta',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Os Sagrados Altares Tupiniquins',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'As Lambanças de Dois Cabras da Peste, o Testamento, Alguns Tostões e o Livramento da Compadecida',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Asas: Sonho de Muitos, Privilégio de Poucos, Tecnologia de Todos',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Àyàn, o Espírito dos Tambores',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'feitico_carioca',
      schoolName: 'Feitiço Carioca',
      enredo: 'Griot: Memórias da Carne',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Ebó, Oferendas Para os Deuses',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'chatuba',
      schoolName: 'Chatuba de Mesquita',
      enredo: 'Funk-se Quem Quiser',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'alegria_do_vilar',
      schoolName: 'Alegria do Vilar',
      enredo: 'Zé Lourenço: do Caldeirão da Fé à Semeadura da Vida',
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'fla_manguaca',
      schoolName: 'Fla Manguaça',
      enredo: 'Coletivo Gazela Negra – O Quilombo Contra o Racismo',
      statusDescription: '13º Lugar'
    },
    {
      rank: 14,
      schoolId: 'santa_marta',
      schoolName: 'Mocidade Unida do Santa Marta',
      enredo: 'Ajeum - Alimento de Corpo e Alma',
      statusDescription: '14º Lugar'
    },
    {
      rank: 15,
      schoolId: 'tubarao_mesquita',
      schoolName: 'Tubarão de Mesquita',
      enredo: 'Repense, Reflita, Recicle. Vem na Onda da Sustentabilidade com a Tubarão de Mesquita',
      statusDescription: '15º Lugar'
    },
    {
      rank: 16,
      schoolId: 'vila_santa_tereza',
      schoolName: 'Unidos da Vila Santa Tereza',
      enredo: 'Salve Vovó Maria Joanna Rezadeira! Salve o Jongo da Serrinha! Saravá, Saravá, Saravá!',
      statusDescription: '16º Lugar'
    },
    {
      rank: 17,
      schoolId: 'independentes_olaria',
      schoolName: 'Independentes de Olaria',
      enredo: 'Vagalume',
      statusDescription: '17º Lugar'
    },
    {
      rank: 18,
      schoolId: 'imperio_nova_iguacu',
      schoolName: 'Império de Nova Iguaçu',
      enredo: 'O Paraíso Noçokem',
      statusDescription: '18º Lugar'
    },
    {
      rank: 19,
      schoolId: 'arrastao_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'Teatro Experimental do Negro - Arte, Cultura e Resistência',
      statusDescription: '19º Lugar'
    },
    {
      rank: 20,
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'Carnaval para Gringo Ver',
      statusDescription: '20º Lugar'
    },
    {
      rank: 21,
      schoolId: 'concentra_imperial',
      schoolName: 'Concentra Imperial',
      enredo: 'Quem Me Guia!',
      relegated: true,
      statusDescription: '21º Lugar (2 últimas de sua noite) • Rebaixada para a Série Bronze'
    },
    {
      rank: 22,
      schoolId: 'praca_da_bandeira',
      schoolName: 'Independente da Praça da Bandeira',
      enredo: 'Sinfonia Poética Daqueles que Não Se Deixaram Calar',
      statusDescription: '22º Lugar'
    },
    {
      rank: 23,
      schoolId: 'boi_da_ilha',
      schoolName: 'Boi da Ilha do Governador',
      enredo: 'Arrepia Boi da Ilha',
      relegated: true,
      statusDescription: '23º Lugar (2 últimas de sua noite) • Rebaixada para a Série Bronze'
    },
    {
      rank: 24,
      schoolId: 'unidos_da_barra_da_tijuca',
      schoolName: 'Unidos da Barra da Tijuca',
      enredo: 'Sapucaí - Uma Viagem em Quatro Tempos',
      relegated: true,
      statusDescription: '24º Lugar (2 últimas de sua noite) • Rebaixada para a Série Bronze'
    },
    {
      rank: 25,
      schoolId: 'sereno_campo_grande',
      schoolName: 'Sereno de Campo Grande',
      enredo: 'No Sertão, Se Onde Tem Sereno, Têm Corujas... Onde Existem Profetas... Têm Chuvas!!!',
      relegated: true,
      statusDescription: '25º Lugar (2 últimas de sua noite) • Rebaixada para a Série Bronze'
    },
    {
      rank: 26,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Ijexá',
      statusDescription: '26º Lugar'
    },
    {
      rank: 27,
      schoolId: 'leao_de_nova_iguacu',
      schoolName: 'Leão de Nova Iguaçu',
      enredo: 'O Grande Obá',
      statusDescription: '27º Lugar'
    },
    {
      rank: 28,
      schoolId: 'flor_da_mina',
      schoolName: 'Flor da Mina do Andaraí',
      enredo: 'Vento que Venta Lá, Venta Cá. Salve o Caboclo Ventania',
      relegated: true,
      statusDescription: '28º Lugar (2 últimas de sua noite) • Rebaixada para a Série Bronze'
    },
    {
      rank: 29,
      schoolId: 'alegria_de_copacabana',
      schoolName: 'Alegria de Copacabana',
      enredo: 'Carnaval, a Alegria de Copacabana',
      relegated: true,
      statusDescription: '29º Lugar (2 últimas de sua noite) • Rebaixada para a Série Bronze'
    },
    {
      rank: 0,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'O Menor Espetáculo da Terra',
      isHorsConcours: true,
      statusDescription: 'Hors concours • Desfilou sem julgamento'
    }
  ],
  2024: [
    {
      rank: 1,
      nightRank: 1,
      night: '2ª Noite',
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'Trono Negro',
      promoted: true,
      statusDescription: 'Campeã Geral (1ª da 2ª Noite) • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      nightRank: 1,
      night: '1ª Noite',
      schoolId: 'botafogo_samba_clube',
      schoolName: 'Botafogo Samba Clube',
      enredo: 'Taina-Kan: A Estrela Solitária',
      promoted: true,
      statusDescription: 'Vice-Campeã Geral (1ª da 1ª Noite) • Subiu para a Série Ouro'
    },
    {
      rank: 0,
      nightRank: 2,
      night: '1ª Noite',
      schoolId: 'fla_manguaca',
      schoolName: 'Fla Manguaça',
      enredo: 'Quer Apostar?',
      statusDescription: '2º Lugar • 1ª Noite'
    },
    {
      rank: 0,
      nightRank: 2,
      night: '2ª Noite',
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'Ubuntu - Do Berço Ancestral, um Ideal Pra Mudar o Mundo',
      statusDescription: '2º Lugar • 2ª Noite'
    },
    {
      rank: 0,
      nightRank: 3,
      night: '1ª Noite',
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'A Criação Vodun e o Candomblé Jeje',
      statusDescription: '3º Lugar • 1ª Noite'
    },
    {
      rank: 0,
      nightRank: 3,
      night: '2ª Noite',
      schoolId: 'tubarao_mesquita',
      schoolName: 'Tubarão de Mesquita',
      enredo: 'A Água de Nossos Rios Deságua Num Rio Maior!',
      statusDescription: '3º Lugar • 2ª Noite'
    },
    {
      rank: 0,
      nightRank: 4,
      night: '1ª Noite',
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'A Floresta do Amazonas',
      statusDescription: '4º Lugar • 1ª Noite'
    },
    {
      rank: 0,
      nightRank: 4,
      night: '2ª Noite',
      schoolId: 'vila_santa_tereza',
      schoolName: 'Unidos da Vila Santa Tereza',
      enredo: 'Solange - Da minha, da sua e da nossa Morada do Samba',
      statusDescription: '4º Lugar • 2ª Noite'
    },
    {
      rank: 0,
      nightRank: 5,
      night: '1ª Noite',
      schoolId: 'arrastao_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'Icamiabas',
      statusDescription: '5º Lugar • 1ª Noite'
    },
    {
      rank: 0,
      nightRank: 5,
      night: '2ª Noite',
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Na Fé dos Padroeiros, o Rio Pede Paz!',
      statusDescription: '5º Lugar • 2ª Noite'
    },
    {
      rank: 0,
      nightRank: 6,
      night: '1ª Noite',
      schoolId: 'unidos_da_barra_da_tijuca',
      schoolName: 'Unidos da Barra da Tijuca',
      enredo: 'Encontro das Águas',
      statusDescription: '6º Lugar • 1ª Noite'
    },
    {
      rank: 0,
      nightRank: 6,
      night: '2ª Noite',
      schoolId: 'independentes_olaria',
      schoolName: 'Independentes de Olaria',
      enredo: 'Ao Som do Chorinho Vou Sorrir... Serei Feliz, Bem Feliz!',
      statusDescription: '6º Lugar • 2ª Noite'
    },
    {
      rank: 0,
      nightRank: 7,
      night: '1ª Noite',
      schoolId: 'feitico_carioca',
      schoolName: 'Feitiço Carioca',
      enredo: 'Vai Dizer que Tá Com Medo do Meu Feitiço!?',
      statusDescription: '7º Lugar • 1ª Noite'
    },
    {
      rank: 0,
      nightRank: 7,
      night: '2ª Noite',
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Os Pássaros da Noite e o Segredo das Criações',
      statusDescription: '7º Lugar • 2ª Noite'
    },
    {
      rank: 0,
      nightRank: 8,
      night: '1ª Noite',
      schoolId: 'santa_marta',
      schoolName: 'Mocidade Unida do Santa Marta',
      enredo: 'Sextou #É Só Sucesso',
      statusDescription: '8º Lugar • 1ª Noite'
    },
    {
      rank: 0,
      nightRank: 8,
      night: '2ª Noite',
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Rudá, a Criação do Mundo em um Conto de Amor',
      statusDescription: '8º Lugar • 2ª Noite'
    },
    {
      rank: 0,
      nightRank: 9,
      night: '1ª Noite',
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'As Bruxas Estão Soltas!',
      statusDescription: '9º Lugar • 1ª Noite'
    },
    {
      rank: 0,
      nightRank: 9,
      night: '2ª Noite',
      schoolId: 'abolicao',
      schoolName: 'Acadêmicos da Abolição',
      enredo: 'Axé Ngoma! A Festa do Batuque Ancestral!',
      statusDescription: '9º Lugar • 2ª Noite'
    },
    {
      rank: 0,
      nightRank: 10,
      night: '1ª Noite',
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'Cais da Resistência',
      statusDescription: '10º Lugar • 1ª Noite'
    },
    {
      rank: 0,
      nightRank: 10,
      night: '2ª Noite',
      schoolId: 'flor_da_mina',
      schoolName: 'Flor da Mina do Andaraí',
      enredo: 'Renascença Clube - Quilombo Urbano da Resistência Negra',
      statusDescription: '10º Lugar • 2ª Noite'
    },
    {
      rank: 0,
      nightRank: 11,
      night: '1ª Noite',
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Pra Não Dizer Que Não Falei das Flores',
      statusDescription: '11º Lugar • 1ª Noite'
    },
    {
      rank: 0,
      nightRank: 11,
      night: '2ª Noite',
      schoolId: 'alegria_da_zona_sul',
      schoolName: 'Alegria da Zona Sul',
      enredo: 'Festa no Quilombo',
      statusDescription: '11º Lugar • 2ª Noite'
    },
    {
      rank: 0,
      nightRank: 12,
      night: '1ª Noite',
      schoolId: 'praca_da_bandeira',
      schoolName: 'Independente da Praça da Bandeira',
      enredo: 'Da Brisa do Mar à Luz do Luar de Maricá',
      statusDescription: '12º Lugar • 1ª Noite'
    },
    {
      rank: 0,
      nightRank: 12,
      night: '2ª Noite',
      schoolId: 'leao_de_nova_iguacu',
      schoolName: 'Leão de Nova Iguaçu',
      enredo: 'Festa de Preto',
      statusDescription: '12º Lugar • 2ª Noite'
    },
    {
      rank: 0,
      nightRank: 13,
      night: '1ª Noite',
      schoolId: 'imperio_da_uva',
      schoolName: 'Império da Uva',
      enredo: 'Dos Trilhos do Passado a um Novo Tempo: Japeri!',
      statusDescription: '13º Lugar • 1ª Noite'
    },
    {
      rank: 0,
      nightRank: 13,
      night: '2ª Noite',
      schoolId: 'concentra_imperial',
      schoolName: 'Concentra Imperial',
      enredo: 'Recreio... Sol, Mar e Folia',
      statusDescription: '13º Lugar • 2ª Noite'
    },
    {
      rank: 0,
      nightRank: 14,
      night: '1ª Noite',
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'A Cobra Vai Fumar!',
      relegated: true,
      statusDescription: '14º Lugar (1ª Noite) • Rebaixada para a Série Bronze'
    },
    {
      rank: 0,
      nightRank: 14,
      night: '2ª Noite',
      schoolId: 'academicos_do_dende',
      schoolName: 'Acadêmicos do Dendê',
      enredo: 'Na Beleza das Flores e no Brilho das Cores, Mulheres Guerreiras do Nosso Brasil',
      relegated: true,
      statusDescription: '14º Lugar (2ª Noite) • Rebaixada para a Série Bronze'
    },
    {
      rank: 0,
      nightRank: 15,
      night: '1ª Noite',
      schoolId: 'academicos_de_jacarepagua',
      schoolName: 'Acadêmicos de Jacarepaguá',
      enredo: 'Quem Tem Sua Capa, Escapa!',
      relegated: true,
      statusDescription: '15º Lugar (1ª Noite) • Rebaixada para a Série Bronze'
    },
    {
      rank: 0,
      nightRank: 15,
      night: '2ª Noite',
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Jovelina, A Pérola Negra do Samba!',
      relegated: true,
      statusDescription: '15º Lugar (2ª Noite) • Rebaixada para a Série Bronze'
    },
    {
      rank: 0,
      nightRank: 16,
      night: '1ª Noite',
      schoolId: 'arame_de_ricardo',
      schoolName: 'Arame de Ricardo',
      enredo: 'Quando Crescer, Quero Ser Criança. O Arame Te Ensina Brincando!!!',
      relegated: true,
      statusDescription: '16º Lugar (1ª Noite) • Rebaixada para a Série Bronze'
    },
    {
      rank: 0,
      nightRank: 16,
      night: '2ª Noite',
      schoolId: 'uniao_cruzmaltina',
      schoolName: 'Força Jovem (União Cruzmaltina)',
      enredo: 'São Januário, a Força de um povo',
      relegated: true,
      statusDescription: '16º Lugar (2ª Noite) • Rebaixada para a Série Bronze'
    }
  ],
  2023: [
    {
      rank: 1,
      nightRank: 1,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'marica',
      schoolName: 'União de Maricá',
      enredo: 'Eu sigo nordestino',
      promoted: true,
      statusDescription: 'Campeã Geral (Superliga • 1ª da 1ª Noite) • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      nightRank: 1,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'sereno_campo_grande',
      schoolName: 'Sereno de Campo Grande',
      enredo: 'As três princesas turcas no Reino de Pindorama',
      promoted: true,
      statusDescription: 'Vice-Campeã Geral (Superliga • 1ª da 2ª Noite) • Subiu para a Série Ouro'
    },
    {
      rank: 1,
      nightRank: 1,
      night: 'Grupo B',
      league: 'LIVRES',
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'Um passeio na Pequena África - A herança do meu Rio de Janeiro',
      statusDescription: 'Campeã LIVRES (Grupo B)'
    },
    {
      rank: 0,
      nightRank: 2,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'parque_acari',
      schoolName: 'União do Parque Acari',
      enredo: 'Uma doce ilusão no mundo da imaginação',
      promoted: true,
      statusDescription: '2º Lugar (1ª Noite) • Melhor colocada geral • Subiu para a Série Ouro'
    },
    {
      rank: 0,
      nightRank: 2,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'O Afro-Brasil reluzente de Nei Lopes',
      statusDescription: '2º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 2,
      nightRank: 2,
      night: 'Grupo B',
      league: 'LIVRES',
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'Filho da Águia, pai do Condor. Nésio Nascimento, o eterno gato mestre da Passarela',
      statusDescription: 'Vice-Campeã LIVRES (Grupo B)'
    },
    {
      rank: 0,
      nightRank: 3,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'As borboletas encantadas da bela Oyá',
      statusDescription: '3º Lugar • 1ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 3,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'santa_marta',
      schoolName: 'Mocidade Unida do Santa Marta',
      enredo: 'Cangaceiras - Mulé di resistência e coragem, nem o cangaço assutou, quando o sertão virou mar, o Morro da Santa sambou',
      statusDescription: '3º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 3,
      night: 'Grupo B',
      league: 'LIVRES',
      schoolId: 'novo_imperio',
      schoolName: 'Novo Império',
      enredo: 'Cais do Valongo - De mar a mar, batalhas e glórias',
      statusDescription: '3º Lugar • LIVRES (Grupo B)'
    },
    {
      rank: 0,
      nightRank: 4,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'leao_de_nova_iguacu',
      schoolName: 'Leão de Nova Iguaçu',
      enredo: 'Orlando Orfei - O circo que vive em mim',
      statusDescription: '4º Lugar • 1ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 4,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'botafogo_samba_clube',
      schoolName: 'Botafogo Samba Clube',
      enredo: 'Pelos trilhos da história: Engenho de Dentro de lutas, batuques e glórias',
      statusDescription: '4º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 4,
      night: 'Grupo B',
      league: 'LIVRES',
      schoolId: 'academicos_da_pedra_branca',
      schoolName: 'Acadêmicos da Pedra Branca',
      enredo: "Aldeia Maraka'Ná: a universidade que existe e resiste",
      statusDescription: '4º Lugar • LIVRES (Grupo B)'
    },
    {
      rank: 0,
      nightRank: 5,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'santa_cruz',
      schoolName: 'Acadêmicos de Santa Cruz',
      enredo: 'Santa é minha Cruz. É luz da preservação. O meu canto é flecha certeira, para findar o pranto da devastação!',
      statusDescription: '5º Lugar • 1ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 5,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'independentes_olaria',
      schoolName: 'Independentes de Olaria',
      enredo: 'Merìndílógún - A fala dos ancestrais',
      statusDescription: '5º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 5,
      night: 'Grupo B',
      league: 'LIVRES',
      schoolId: 'siri_de_ramos',
      schoolName: 'Siri de Ramos',
      enredo: 'Personalidade mulher',
      statusDescription: '5º Lugar • LIVRES (Grupo B)'
    },
    {
      rank: 0,
      nightRank: 6,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'O bem, Amado Jorge',
      statusDescription: '6º Lugar • 1ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 6,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'academicos_do_dende',
      schoolName: 'Acadêmicos do Dendê',
      enredo: 'Gosto que me enrosco!',
      statusDescription: '6º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 6,
      night: 'Grupo B',
      league: 'LIVRES',
      schoolId: 'mensageiros_da_paz',
      schoolName: 'Mensageiros da Paz',
      enredo: 'Contos e resistência de um povo',
      statusDescription: '6º Lugar • LIVRES (Grupo B)'
    },
    {
      rank: 0,
      nightRank: 7,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'É ela... a maravilhosa Rainha do Samba',
      statusDescription: '7º Lugar • 1ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 7,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'imperio_da_uva',
      schoolName: 'Império da Uva',
      enredo: 'Laroyê, rainha das Marias',
      statusDescription: '7º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 7,
      night: 'Grupo B',
      league: 'LIVRES',
      schoolId: 'garras_do_tigre',
      schoolName: 'Garras do Tigre',
      enredo: 'Belém do Pará - Um show de brasilidade',
      statusDescription: '7º Lugar • LIVRES (Grupo B)'
    },
    {
      rank: 0,
      nightRank: 8,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Alô alô, algodão doce pra vocês!',
      statusDescription: '8º Lugar • 1ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 8,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'uniao_cruzmaltina',
      schoolName: 'União Cruzmaltina',
      enredo: 'Rodeia, rodeia... rodeia, meu Pai Santana, rodeia',
      statusDescription: '8º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 8,
      night: 'Grupo B',
      league: 'LIVRES',
      schoolId: 'academia_niteroi_de_samba',
      schoolName: 'Academia Niterói de Samba',
      enredo: 'A alegria que renasce das cinzas',
      statusDescription: '8º Lugar • LIVRES (Grupo B)'
    },
    {
      rank: 0,
      nightRank: 9,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'vila_santa_tereza',
      schoolName: 'Unidos da Vila Santa Tereza',
      enredo: 'Santa Teresa, rogai por nós!',
      statusDescription: '9º Lugar • 1ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 9,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'flor_da_mina',
      schoolName: 'Flor da Mina do Andaraí',
      enredo: 'Obá Xirê',
      statusDescription: '9º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 10,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Gosto que me enrosco. Caprichosamente vamos reviver',
      statusDescription: '10º Lugar • 1ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 10,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'alegria_da_zona_sul',
      schoolName: 'Alegria da Zona Sul',
      enredo: 'Dorival Caymmi, o mar e o tempo nas areias de Copacabana',
      statusDescription: '10º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 11,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'praca_da_bandeira',
      schoolName: 'Independente da Praça da Bandeira',
      enredo: 'Pindorama, da utopia das visões gerais do paraíso ao progresso da Terra Brasilis',
      statusDescription: '11º Lugar • 1ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 11,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'arame_de_ricardo',
      schoolName: 'Arame de Ricardo',
      enredo: 'Da Baixada para o Brasil, André Ceciliano! Nas estações do progresso pela união de um povo',
      statusDescription: '11º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 12,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'abolicao',
      schoolName: 'Acadêmicos da Abolição',
      enredo: 'Bato tambor, logo existo". Luiz Antonio Simas - a essência e resistência da rua',
      statusDescription: '12º Lugar • 1ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 12,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'arrastao_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'Sou caipira peregrino pirapora',
      statusDescription: '12º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 13,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'academicos_de_jacarepagua',
      schoolName: 'Acadêmicos de Jacarepaguá',
      enredo: 'De Maria a Marias',
      statusDescription: '13º Lugar • 1ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 13,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Fruto da África no Brasil de fé: Candomblé',
      statusDescription: '13º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 14,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'academicos_do_peixe',
      schoolName: 'Acadêmicos do Peixe',
      enredo: 'Preto de berço, espoliação branca',
      relegated: true,
      statusDescription: '14º Lugar (1ª Noite • Superliga) • Rebaixada para a Série Bronze'
    },
    {
      rank: 0,
      nightRank: 14,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'academicos_da_diversidade',
      schoolName: 'Acadêmicos da Diversidade',
      enredo: 'Umbanda - Diversidade é paz, amor e caridade!',
      relegated: true,
      statusDescription: '14º Lugar (2ª Noite • Superliga) • Rebaixada para a Série Bronze'
    },
    {
      rank: 0,
      nightRank: 15,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'rosa_de_ouro',
      schoolName: 'Rosa de Ouro',
      enredo: 'Inhame, a raiz do fundamento que me faz feliz! Sou popo, sou ouro, sou Costa do Marfim no Carnaval do Rio',
      relegated: true,
      statusDescription: '15º Lugar (1ª Noite • Superliga) • Rebaixada para a Série Bronze'
    },
    {
      rank: 0,
      nightRank: 15,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'curicica',
      schoolName: 'União do Parque Curicica',
      enredo: 'Pedro Scooby - Amante desse mar de gente da Curicica!',
      relegated: true,
      statusDescription: '15º Lugar (2ª Noite • Superliga) • Rebaixada para a Série Bronze'
    },
    {
      rank: 0,
      nightRank: 16,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'raca_rubro_negra',
      schoolName: 'Raça Rubro-Negra',
      enredo: 'Raízes de uma raça',
      relegated: true,
      statusDescription: '16º Lugar (1ª Noite • Superliga) • Rebaixada para a Série Bronze'
    },
    {
      rank: 0,
      nightRank: 16,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'sao_cristovao',
      schoolName: 'Unidos de São Cristóvão',
      enredo: 'Águas de Oxalá',
      relegated: true,
      statusDescription: '16º Lugar (2ª Noite • Superliga) • Rebaixada para a Série Bronze'
    }
  ],
  2022: [
    {
      rank: 1,
      nightRank: 1,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'De Ventres Africanos, os Sonhos por Liberdade!',
      promoted: true,
      statusDescription: 'Campeã Geral (Superliga • 1ª da 2ª Noite) • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      nightRank: 1,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'arranco',
      schoolName: 'Arranco do Engenho de Dentro',
      enredo: 'Arranco anuncia Alceu Valença - O Rei do Frevo e do Maracatu',
      promoted: true,
      statusDescription: 'Vice-Campeã Geral (Superliga • 1ª da 1ª Noite) • Subiu para a Série Ouro'
    },
    {
      rank: 1,
      nightRank: 1,
      night: 'Grupo B',
      league: 'LIVRES',
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Punga, Crioula!',
      statusDescription: 'Campeã LIVRES (Grupo B)'
    },
    {
      rank: 0,
      nightRank: 2,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'Jacarepaguá - Fábrica dos Sonhos',
      statusDescription: '2º Lugar • 1ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 2,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Eu sou o Samba, a Voz do Morro sou eu mesmo sim senhor: Carnaval e Samba, a mais bela Expressão Cultural de uma Raça',
      statusDescription: '2º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 2,
      nightRank: 2,
      night: 'Grupo B',
      league: 'LIVRES',
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'A Fórmula da Água',
      statusDescription: 'Vice-Campeã LIVRES (Grupo B)'
    },
    {
      rank: 0,
      nightRank: 3,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'independentes_olaria',
      schoolName: 'Independentes de Olaria',
      enredo: 'Batuque pra Penha',
      statusDescription: '3º Lugar • 1ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 3,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'marica',
      schoolName: 'União de Maricá',
      enredo: 'A Revolução pela Alegria... uma Ópera Popular',
      statusDescription: '3º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 3,
      night: 'Grupo B',
      league: 'LIVRES',
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Deu a Louca na História! E agora Stanislaw, como é que fica?',
      statusDescription: '3º Lugar • LIVRES (Grupo B)'
    },
    {
      rank: 0,
      nightRank: 4,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'imperio_da_uva',
      schoolName: 'Império da Uva',
      enredo: 'Andar com Fé eu Vou',
      statusDescription: '4º Lugar • 1ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 4,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Ave, Ave Rainha Senhora da Berlinda',
      statusDescription: '4º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 4,
      night: 'Grupo B',
      league: 'LIVRES',
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Festejando, eu mando a tristeza embora. A Unidos de Lucas é só alegria',
      statusDescription: '4º Lugar • LIVRES (Grupo B)'
    },
    {
      rank: 0,
      nightRank: 5,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'sereno_campo_grande',
      schoolName: 'Sereno de Campo Grande',
      enredo: 'Se o Samba tem Mandinga, vem da África a nossa Ginga',
      statusDescription: '5º Lugar • 1ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 5,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Circo Brazuca',
      statusDescription: '5º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 5,
      night: 'Grupo B',
      league: 'LIVRES',
      schoolId: 'sao_cristovao',
      schoolName: 'Unidos de São Cristóvão',
      enredo: 'Menino Silas',
      statusDescription: '5º Lugar • LIVRES (Grupo B)'
    },
    {
      rank: 0,
      nightRank: 6,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'praca_da_bandeira',
      schoolName: 'Independente da Praça da Bandeira',
      enredo: 'Dos Encantos do Capibaribe a Frevança Atual… Pernambuco Respira Diversidade Cultural',
      statusDescription: '6º Lugar • 1ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 6,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'curicica',
      schoolName: 'União do Parque Curicica',
      enredo: 'Abayomis - O Encontro Precioso das Yas',
      statusDescription: '6º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 6,
      night: 'Grupo B',
      league: 'LIVRES',
      schoolId: 'flor_da_mina',
      schoolName: 'Flor da Mina do Andaraí',
      enredo: 'Em Romaria a Juazeiro do Norte, a Flor da Mina do Andaraí vem pedir a benção a meu Padim Pade Ciço',
      statusDescription: '6º Lugar • LIVRES (Grupo B)'
    },
    {
      rank: 0,
      nightRank: 7,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'arame_de_ricardo',
      schoolName: 'Arame de Ricardo',
      enredo: 'Amor de Carnaval - O que passou, passou!',
      statusDescription: '7º Lugar • 1ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 7,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'vila_santa_tereza',
      schoolName: 'Unidos da Vila Santa Tereza',
      enredo: 'Obinrin Agbara, a Saga das Guerreiras',
      statusDescription: '7º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 7,
      night: 'Grupo B',
      league: 'LIVRES',
      schoolId: 'imperadores_rubro_negros',
      schoolName: 'Imperadores Rubro-Negros',
      enredo: 'Olelé, Olelé: uma Herança do Continente Africano',
      statusDescription: '7º Lugar • LIVRES (Grupo B)'
    },
    {
      rank: 0,
      nightRank: 8,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'botafogo_samba_clube',
      schoolName: 'Botafogo Samba Clube',
      enredo: 'João Saldanha - Um apaixonado pela verdade caminhando em tempos de ilusão',
      statusDescription: '8º Lugar • 1ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 8,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'rosa_de_ouro',
      schoolName: 'Rosa de Ouro',
      enredo: 'Coroaci, a Terra do Sol',
      statusDescription: '8º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 8,
      night: 'Grupo B',
      league: 'LIVRES',
      schoolId: 'chatuba',
      schoolName: 'Chatuba de Mesquita',
      enredo: 'Cortejo aos Reis do Congo',
      statusDescription: '8º Lugar • LIVRES (Grupo B)'
    },
    {
      rank: 0,
      nightRank: 9,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'raca_rubro_negra',
      schoolName: 'Raça Rubro-Negra',
      enredo: 'Aquarela Brasileira',
      statusDescription: '9º Lugar • 1ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 9,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'leao_de_nova_iguacu',
      schoolName: 'Leão de Nova Iguaçu',
      enredo: 'Dedé da Portela - Fez da Vida Poesia e Cantou sua Alegria em Tempo de Carnaval',
      statusDescription: '9º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 9,
      night: 'Grupo B',
      league: 'LIVRES',
      schoolId: 'siri_de_ramos',
      schoolName: 'Siri de Ramos',
      enredo: 'Entre percussão, coração e a coroa que te rege, mestre Beto é nota 10!',
      statusDescription: '9º Lugar • LIVRES (Grupo B)'
    },
    {
      rank: 0,
      nightRank: 10,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'academicos_da_diversidade',
      schoolName: 'Acadêmicos da Diversidade',
      enredo: 'Os Guardiões Indígenas da Floresta Natural, Salve Oxóssi e a Preservação Ambiental',
      statusDescription: '10º Lugar • 1ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 10,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'parque_acari',
      schoolName: 'União do Parque Acari',
      enredo: 'A Coroa Imperiana nos Braços da Nação Acariense',
      statusDescription: '10º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 10,
      night: 'Grupo B',
      league: 'LIVRES',
      schoolId: 'feitico_carioca',
      schoolName: 'Feitiço Carioca',
      enredo: 'O Circo do Zé Povão: o Picadeiro Brasileiro',
      statusDescription: '10º Lugar • LIVRES (Grupo B)'
    },
    {
      rank: 0,
      nightRank: 11,
      night: '1ª Noite',
      league: 'Superliga',
      schoolId: 'dificil_e_o_nome',
      schoolName: 'Difícil é o Nome',
      enredo: 'Nobreza na Cor, Soberanas na Raça... Rainhas do Ventre da Humanidade',
      relegated: true,
      statusDescription: '11º Lugar (1ª Noite • Superliga) • Rebaixada para a Série Bronze'
    },
    {
      rank: 0,
      nightRank: 11,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'alegria_da_zona_sul',
      schoolName: 'Alegria da Zona Sul',
      enredo: 'Até que Enfim... Aroldo Santos',
      statusDescription: '11º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 12,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'abolicao',
      schoolName: 'Acadêmicos da Abolição',
      enredo: 'É Samba, é Popular. É Alex Escobar',
      statusDescription: '12º Lugar • 2ª Noite (Superliga)'
    },
    {
      rank: 0,
      nightRank: 13,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'villa_rica',
      schoolName: 'Unidos da Villa Rica',
      enredo: 'Caboclo - Bradou na Mata. Hoje é dia de festa. Traz o Axé dos seus irmãos. Viva o Povo da Floresta',
      relegated: true,
      statusDescription: '13º Lugar (2ª Noite • Superliga) • Rebaixada para a Série Bronze'
    },
    {
      rank: 0,
      nightRank: 14,
      night: '2ª Noite',
      league: 'Superliga',
      schoolId: 'unidos_da_vila_kennedy',
      schoolName: 'Unidos da Vila Kennedy',
      enredo: 'I Have a Dream... e os Sonhos de Liberdade',
      relegated: true,
      statusDescription: '14º Lugar (2ª Noite • Superliga) • Rebaixada para a Série Bronze'
    }
  ],
  2021: [],
  2020: [
    {
      rank: 1,
      nightRank: 1,
      night: 'LIESB',
      league: 'LIESB',
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Pinah, a Soberana',
      promoted: true,
      statusDescription: 'Campeã (LIESB) • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      nightRank: 2,
      night: 'LIESB',
      league: 'LIESB',
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Malandro - O Rei da Boêmia e o Barão da Ralé',
      promoted: true,
      statusDescription: 'Vice-Campeã (LIESB) • Subiu para a Série Ouro'
    },
    {
      rank: 1,
      nightRank: 1,
      night: 'Série B',
      league: 'LIVRES',
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'Mãe Gentil, Seus Filhos Clamam Por Ti!',
      statusDescription: 'Campeã LIVRES (Série B)'
    },
    {
      rank: 2,
      nightRank: 2,
      night: 'Série B',
      league: 'LIVRES',
      schoolId: 'alegria_da_zona_sul',
      schoolName: 'Alegria da Zona Sul',
      enredo: 'Ypanema',
      statusDescription: 'Vice-Campeã LIVRES (Série B)'
    },
    {
      rank: 0,
      nightRank: 3,
      night: 'LIESB',
      league: 'LIESB',
      schoolId: 'curicica',
      schoolName: 'União do Parque Curicica',
      enredo: 'Fulô de Maria',
      statusDescription: '3º Lugar • LIESB'
    },
    {
      rank: 0,
      nightRank: 3,
      night: 'Série B',
      league: 'LIVRES',
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'O Big Bang Tupiniquim Explode na Intendente!',
      statusDescription: '3º Lugar • LIVRES (Série B)'
    },
    {
      rank: 0,
      nightRank: 4,
      night: 'LIESB',
      league: 'LIESB',
      schoolId: 'imperio_da_uva',
      schoolName: 'Império da Uva',
      enredo: 'Darcy Ribeiro - O Homem Muito Além do Seu Tempo',
      statusDescription: '4º Lugar • LIESB'
    },
    {
      rank: 0,
      nightRank: 4,
      night: 'Série B',
      league: 'LIVRES',
      schoolId: 'siri_de_ramos',
      schoolName: 'Siri de Ramos',
      enredo: 'Ganga Zumba - A Dinastia de um Guerreiro',
      statusDescription: '4º Lugar • LIVRES (Série B)'
    },
    {
      rank: 0,
      nightRank: 5,
      night: 'LIESB',
      league: 'LIESB',
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'De Roliúde ao Sertão - Luz, Câmera, Ação!',
      statusDescription: '5º Lugar • LIESB'
    },
    {
      rank: 0,
      nightRank: 5,
      night: 'Série B',
      league: 'LIVRES',
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'Aqui ou Acolá, Este É o Meu Lugar',
      statusDescription: '5º Lugar • LIVRES (Série B)'
    },
    {
      rank: 0,
      nightRank: 6,
      night: 'LIESB',
      league: 'LIESB',
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'A Brasilidade Feita à Mão',
      statusDescription: '6º Lugar • LIESB'
    },
    {
      rank: 0,
      nightRank: 6,
      night: 'Série B',
      league: 'LIVRES',
      schoolId: 'arame_de_ricardo',
      schoolName: 'Arame de Ricardo',
      enredo: 'Sou Eu Quem Faz Você Sambar',
      statusDescription: '6º Lugar • LIVRES (Série B)'
    },
    {
      rank: 0,
      nightRank: 7,
      night: 'LIESB',
      league: 'LIESB',
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Gueledés - O Retrato da Alma',
      statusDescription: '7º Lugar • LIESB'
    },
    {
      rank: 0,
      nightRank: 8,
      night: 'LIESB',
      league: 'LIESB',
      schoolId: 'vila_santa_tereza',
      schoolName: 'Unidos da Vila Santa Tereza',
      enredo: 'No Saçarico da Intendente, a Vila Canta Rosa',
      statusDescription: '8º Lugar • LIESB'
    },
    {
      rank: 0,
      nightRank: 9,
      night: 'LIESB',
      league: 'LIESB',
      schoolId: 'parque_acari',
      schoolName: 'União do Parque Acari',
      enredo: 'No Início a Criação, o Céu, a Terra e o Mar, com Isso a Junção Cada Um com o Seu Par. Viva o Amor!',
      statusDescription: '9º Lugar • LIESB'
    },
    {
      rank: 0,
      nightRank: 10,
      night: 'LIESB',
      league: 'LIESB',
      schoolId: 'botafogo_samba_clube',
      schoolName: 'Botafogo Samba Clube',
      enredo: 'Seria Injusto não Falar de Você, Beth Carvalho. Esse É o Botafogo Que Eu Gosto!',
      statusDescription: '10º Lugar • LIESB'
    },
    {
      rank: 0,
      nightRank: 11,
      night: 'LIESB',
      league: 'LIESB',
      schoolId: 'unidos_da_vila_kennedy',
      schoolName: 'Unidos da Vila Kennedy',
      enredo: 'Um Rei à Bangu',
      statusDescription: '11º Lugar • LIESB'
    },
    {
      rank: 0,
      nightRank: 12,
      night: 'LIESB',
      league: 'LIESB',
      schoolId: 'dificil_e_o_nome',
      schoolName: 'Difícil é o Nome',
      enredo: 'As Vozes das Divindades na Proteção dos Ogãns',
      statusDescription: '12º Lugar • LIESB'
    },
    {
      rank: 0,
      nightRank: 13,
      night: 'LIESB',
      league: 'LIESB',
      schoolId: 'marica',
      schoolName: 'União de Maricá',
      enredo: 'Nos Tempos Idos',
      statusDescription: '13º Lugar • LIESB'
    },
    {
      rank: 0,
      nightRank: 14,
      night: 'LIESB',
      league: 'LIESB',
      schoolId: 'independentes_olaria',
      schoolName: 'Independentes de Olaria',
      enredo: 'O Acólito do Rei - As Memórias do Padre Perereca',
      statusDescription: '14º Lugar • LIESB'
    },
    {
      rank: 0,
      nightRank: 15,
      night: 'LIESB',
      league: 'LIESB',
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Do Professor ao Sucessor - Brilha o Passado e o Presente Azul e Branco',
      statusDescription: '15º Lugar • LIESB'
    },
    {
      rank: 0,
      nightRank: 16,
      night: 'LIESB',
      league: 'LIESB',
      schoolId: 'flor_da_mina',
      schoolName: 'Flor da Mina do Andaraí',
      enredo: 'O Clamor de Mandela',
      statusDescription: '16º Lugar • LIESB'
    },
    {
      rank: 0,
      nightRank: 17,
      night: 'LIESB',
      league: 'LIESB',
      schoolId: 'villa_rica',
      schoolName: 'Unidos da Villa Rica',
      enredo: 'Muito Prazer, Eu Sou o Samba',
      statusDescription: '17º Lugar • LIESB'
    },
    {
      rank: 0,
      nightRank: 18,
      night: 'LIESB',
      league: 'LIESB',
      schoolId: 'sereno_campo_grande',
      schoolName: 'Sereno de Campo Grande',
      enredo: 'Essa Noite Eu Vou Te Deixar no... Sereno',
      statusDescription: '18º Lugar • LIESB'
    },
    {
      rank: 0,
      nightRank: 19,
      night: 'LIESB',
      league: 'LIESB',
      schoolId: 'passa_regua',
      schoolName: 'Passa Régua',
      enredo: 'Porque Sou Homem das Ruas, Filho da Noite Estrelada',
      statusDescription: '19º Lugar • LIESB'
    },
    {
      rank: 0,
      nightRank: 20,
      night: 'LIESB',
      league: 'LIESB',
      schoolId: 'academicos_do_jardim_bangu',
      schoolName: 'Acadêmicos do Jardim Bangu',
      enredo: 'Da Mãe África aos Filhos do Brasil, a Força Ancestral que Atravessa Gerações',
      relegated: true,
      statusDescription: '20º Lugar (LIESB) • Rebaixada para a Série Bronze'
    }
  ],
  2019: [
    {
      rank: 1,
      schoolId: 'vigario_geral',
      schoolName: 'Acadêmicos de Vigário Geral',
      enredo: 'Mwene Kongo: O Reino Europeu na África que se Tornou Folclore no Brasil',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'curicica',
      schoolName: 'União do Parque Curicica',
      enredo: 'Eu Vi Deus, Ela É Negra!',
      statusDescription: 'Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'Gira, Baiana. Salve as Mães do Samba!',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'marica',
      schoolName: 'União de Maricá',
      enredo: 'Nelson Gonçalves - O Autorretrato do Rei do Rádio',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Orlando Baptista: o Menino e a Bola',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Malandro É Malandro, Bezerra É da Silva',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Matamba, o Sonho de Uma Rainha',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Do Galo de Barcelos ao Galo de Ouro, Lucas Conta Uma História de Fé e Justiça',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'siri_de_ramos',
      schoolName: 'Siri de Ramos',
      enredo: 'A Soberana Ordem dos Barões. Os Caminhos Te Conduzem à Leopoldina',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'arame_de_ricardo',
      schoolName: 'Arame de Ricardo',
      enredo: 'O Primeiro Bailarino do Carnaval',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'De Catulo à Lampião, Bem-Vindos à Terra do Cão!',
      statusDescription: '11º Lugar'
    }
  ],
  2018: [
    {
      rank: 1,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Romance de Xangô: A Dança do Fogo',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'curicica',
      schoolName: 'União do Parque Curicica',
      enredo: 'O Reino Está Nú!',
      statusDescription: 'Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'Sabá - Soberana da Etiópia, Sedutora de Jerusalém',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'O Marquês Numa Viagem Pioneira, Vê Nascer Um Rei na Vizinha Faladeira - Paulo Barros, o DNA do Carnaval',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Deixa Falar: O Que É Que Há? Academia do Samba, Hoje Sou Estácio de Sá',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Zicartola',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Uma Fantástica Viagem por Uma Cidade em Aquarela',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'arame_de_ricardo',
      schoolName: 'Arame de Ricardo',
      enredo: 'Agbayê - Dos Orixás Renasce a Vida',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'vigario_geral',
      schoolName: 'Acadêmicos de Vigário Geral',
      enredo: 'Dos Tambores Africanos ao Bandoneón - Tango, Um Sentimento Que Se Dança',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Um Reinado Preto Brasileiro',
      relegated: true,
      statusDescription: '10º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 11,
      schoolId: 'unidos_das_vargens',
      schoolName: 'Unidos das Vargens',
      enredo: 'Na Semente de Oxum e Odè… O Equilíbrio, a Paz e a Beleza do Amor',
      relegated: true,
      statusDescription: '11º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 12,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'O Cântico do Poeta pelo Amor de Euzébia',
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  2017: [
    {
      rank: 1,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'Onde Há Fumaça, Há Fogo!',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Domingo Menino Dominguinhos',
      statusDescription: 'Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'O Lago dos Cisnes',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'arame_de_ricardo',
      schoolName: 'Arame de Ricardo',
      enredo: 'Ora, Pois… Hoje o Banquete É Real',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Maria, Nossa Mãe Aparecida: 300 Anos de Bençãos!',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Zé Keti... A Voz do Morro Sou Eu Mesmo sim Senhor',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'A Última do Português a Que nem Camões Contaria...',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Roberto Ribeiro, o Menino Rei',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'O Dia em Que o Jacaré Comeu a Noite',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'leao_de_nova_iguacu',
      schoolName: 'Leão de Nova Iguaçu',
      enredo: 'llê Axé Opô Afonjá - O Rei Está na Terra',
      relegated: true,
      statusDescription: '10º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 11,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'Não Deu pra Mudar o Começo, mas Vamos Mudar o Final',
      relegated: true,
      statusDescription: '11º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 12,
      schoolId: 'favo_de_acari',
      schoolName: 'Favo de Acari',
      enredo: 'O Samba não Tem Fronteiras, o Favo de Acari Conta a História dos Bambas da Mangueira',
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 13,
      schoolId: 'santa_marta',
      schoolName: 'Mocidade Unida do Santa Marta',
      enredo: 'Bip Bip, Um Bar a Serviço da Alegria. Lá Onde o Samba Está em Casa!',
      relegated: true,
      statusDescription: '13º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  2016: [
    {
      rank: 1,
      schoolId: 'academicos_do_sossego',
      schoolName: 'Acadêmicos do Sossego',
      enredo: 'O Circo do Menino Passarinho',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'Clementina, cade você?',
      statusDescription: 'Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'leao_de_nova_iguacu',
      schoolName: 'Leão de Nova Iguaçu',
      enredo: 'Pas de Dance. Hoje tem festa no arraia!',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Na rota das especiarias: O leva e traz de cheiros, as surpresas da nova terra!',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'arame_de_ricardo',
      schoolName: 'Arame de Ricardo',
      enredo: 'No sassarico das vedetes, do brotinho e da madame; Sassaricando no meu Rio, levo a vida no Arame!',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: '60 anos de glórias. A Estrela Guia Bangu rumo à vitória!',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'santa_marta',
      schoolName: 'Mocidade Unida do Santa Marta',
      enredo: 'Santa Marta conta historia encantada dos brinquedos!',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Aha, Uhu! É festa do Jacarezinho: 50 anos de cultura, arte e alegria de uma comunidade!',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Africanidades - Do continente negro à pequena África... Nossa identidade cultural!',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'favo_de_acari',
      schoolName: 'Favo de Acari',
      enredo: 'Os Deuses do Olimpo rasgam o céu do Rio de Janeiro na festa do esporte para brincar no Carnaval',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'A festa é nossa e ninguém tasca! São 70 anos de Xou da Cabuçu no mundo mágico do carnaval!',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Salve, Rainha!',
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'De grão em grão a galinha enche o papo!',
      relegated: true,
      statusDescription: '13º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 14,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Unidos de Lucas, 50 anos de glórias... Parabéns aos bambas e a força do samba!',
      relegated: true,
      statusDescription: '14º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 15,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Pelo Engenho de Dentro, de amores eu me Arranco!',
      relegated: true,
      statusDescription: '15º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 16,
      schoolId: 'unidos_das_vargens',
      schoolName: 'Unidos das Vargens',
      enredo: 'A fala da favela para o mundo',
      relegated: true,
      statusDescription: '16º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  2015: [
    {
      rank: 1,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Borboleteando nos destinos da vida! O que te desafia te transforma!',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Pirilampos – Uma lenda Curumim!',
      statusDescription: 'Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Da Corte de Obatalá à terra dos Tupinambas!',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'Nhá Chica: a beata negra e guerreira do Brasil!',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'santa_marta',
      schoolName: 'Mocidade Unida do Santa Marta',
      enredo: 'O dia que o povo tomar a rua será carnaval!',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Oh! Que saudades que eu tenho!',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Em busca do destino!',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'arame_de_ricardo',
      schoolName: 'Arame de Ricardo',
      enredo: 'Tá de brincadeira?',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'academicos_do_sossego',
      schoolName: 'Acadêmicos do Sossego',
      enredo: 'Banananás - O encontro da Rainha Mariola Banana Pacova do Congo e d’Angola com o Rei Amazônico Ananás Ibá-Cachi, da Corte dos Abacaxis de Serpa',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Ojuobá: O vencedor se ergue além da dor!',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'O rei da mata pede passagem - São Sebastião, nosso padroeiro. Da Ponte e do Rio de Janeiro',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Nossa senhora Aparecida – O Milagre!',
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'favo_de_acari',
      schoolName: 'Favo de Acari',
      enredo: 'Favo de Acari apresenta: Ceasa, 40 anos de história a serviço do povo!',
      statusDescription: '13º Lugar'
    },
    {
      rank: 14,
      schoolId: 'sereno_campo_grande',
      schoolName: 'Sereno de Campo Grande',
      enredo: 'De azul e branco a Coruja pinta o sete na Avenida!',
      relegated: true,
      statusDescription: '14º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 15,
      schoolId: 'vila_santa_tereza',
      schoolName: 'Unidos da Vila Santa Tereza',
      enredo: 'Aquarela negra de Debret',
      relegated: true,
      statusDescription: '15º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 16,
      schoolId: 'rosa_de_ouro',
      schoolName: 'Rosa de Ouro',
      enredo: 'Maquiagem: A arte da transformação!',
      relegated: true,
      statusDescription: '16º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 17,
      schoolId: 'unidos_da_vila_kennedy',
      schoolName: 'Unidos da Vila Kennedy',
      enredo: 'Saçaricando por aí a Vedete escolheu seu paraíso: Piraí',
      relegated: true,
      statusDescription: '17º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 18,
      schoolId: 'abolicao',
      schoolName: 'Acadêmicos da Abolição',
      enredo: 'E assim se descobriu o Rio de Janeiro do Brasil!',
      relegated: true,
      statusDescription: '18º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  2014: [
    {
      rank: 1,
      schoolId: 'unidos_de_bangu',
      schoolName: 'Unidos de Bangu',
      enredo: 'Eternamente Bangu',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Tire Sua Mordaça do Caminho... Que Eu Quero Gritar a Minha Cor...',
      statusDescription: 'Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'favo_de_acari',
      schoolName: 'Favo de Acari',
      enredo: 'Amebras, 15 Anos Transformando Vidas Através da Qualificação no Carnaval',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Do Velho Brejo, a Cidade do Amor... Belford Roxo, Rumo a Um Futuro Promissor!',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'academicos_do_sossego',
      schoolName: 'Acadêmicos do Sossego',
      enredo: 'Pernambucando',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'sereno_campo_grande',
      schoolName: 'Sereno de Campo Grande',
      enredo: 'Bahia - Negra Alquimia do Brasil',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Aqua Vitae, Ignis Dei! Água da Vida, Fogo de Deus....São Lourenço Nosso Guia!',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Africanidades',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'vila_santa_tereza',
      schoolName: 'Unidos da Vila Santa Tereza',
      enredo: 'Ururaí',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Minha História É Você, Nossa Paixão É Por Ti: São João de Meriti',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Missicofe, Missicofe, Dari, Dari...',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'unidos_da_vila_kennedy',
      schoolName: 'Unidos da Vila Kennedy',
      enredo: 'Sob a Luz de Tupã, o Raiar da Criação',
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'imperio_rubro_negro',
      schoolName: 'Império Rubro-Negro',
      enredo: 'As Vozes da Nação',
      relegated: true,
      statusDescription: '13º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  2013: [
    {
      rank: 1,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Além do Espelho, João Nogueira de Todos os Sambas',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Boca de Cena',
      statusDescription: 'Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'imperio_da_praca_seca',
      schoolName: 'Império da Praça Seca',
      enredo: 'Valei-me Jorge!',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'favo_de_acari',
      schoolName: 'Favo de Acari',
      enredo: 'Muito Prazer! Sou Acari em Verde, Rosa e Ouro. E a Favo Faz a Festa na Intendente!',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'academicos_do_sossego',
      schoolName: 'Acadêmicos do Sossego',
      enredo: 'De Luiza D’Oyá a Carmem Miranda. O que é que a Baiana Tem?',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Livros de História Infantil - Páginas Recheadas de Fantasias, Sonhos e Imaginações. Uma Viagem na Intendente Magalhães',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'unidos_da_vila_kennedy',
      schoolName: 'Unidos da Vila Kennedy',
      enredo: 'Brincadeiras de Criança',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'É Carnaval!',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'villa_rica',
      schoolName: 'Unidos da Villa Rica',
      enredo: 'Em Busca da Felicidade',
      relegated: true,
      statusDescription: '9º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 10,
      schoolId: 'dificil_e_o_nome',
      schoolName: 'Difícil é o Nome',
      enredo: 'Rio de Janeiro, o Filme',
      relegated: true,
      statusDescription: '10º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 11,
      schoolId: 'rosa_de_ouro',
      schoolName: 'Rosa de Ouro',
      enredo: 'Sou Rosa, Sou de Ouro!',
      relegated: true,
      statusDescription: '11º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 12,
      schoolId: 'boi_da_ilha',
      schoolName: 'Boi da Ilha do Governador',
      enredo: 'África, o Esplendor das Máscaras. Magia, Encanto e Sedução na Festa da Folia!',
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 13,
      schoolId: 'vicente_de_carvalho',
      schoolName: 'Mocidade de Vicente de Carvalho',
      enredo: 'Cora, Coração, Coralina',
      relegated: true,
      statusDescription: '13º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  2012: [
    {
      rank: 1,
      schoolId: 'caprichosos_de_pilares',
      schoolName: 'Caprichosos de Pilares',
      enredo: 'A Caprichosos Faz o Seu Papel... Levanta, Sacode a Poeira e Dá a Volta por Cima!',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'alegria_da_zona_sul',
      schoolName: 'Alegria da Zona Sul',
      enredo: 'Os Saltimbancos',
      promoted: true,
      statusDescription: 'Vice-Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 3,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Arte - Um Universo Fascinante',
      promoted: true,
      statusDescription: '3º Lugar • Subiu para a Série Ouro'
    },
    {
      rank: 4,
      schoolId: 'sereno_campo_grande',
      schoolName: 'Sereno de Campo Grande',
      enredo: 'Mistérios e Magia no Sereno da Noite',
      promoted: true,
      statusDescription: '4º Lugar • Subiu para a Série Ouro'
    },
    {
      rank: 5,
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'Ziraldo: Páginas da Vida de Um Maluco Genial!',
      promoted: true,
      statusDescription: '5º Lugar • Subiu para a Série Ouro'
    },
    {
      rank: 6,
      schoolId: 'curicica',
      schoolName: 'União do Parque Curicica',
      enredo: 'As Cartas não Mentem Jamais!',
      promoted: true,
      statusDescription: '6º Lugar • Subiu para a Série Ouro'
    },
    {
      rank: 7,
      schoolId: 'vila_santa_tereza',
      schoolName: 'Unidos da Vila Santa Tereza',
      enredo: 'A Vila na Magia dos Brinquedos',
      promoted: true,
      statusDescription: '7º Lugar • Subiu para a Série Ouro'
    },
    {
      rank: 8,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'O Pequeno Grande Rei',
      promoted: true,
      statusDescription: '8º Lugar • Subiu para a Série Ouro'
    },
    {
      rank: 9,
      schoolId: 'vicente_de_carvalho',
      schoolName: 'Mocidade de Vicente de Carvalho',
      enredo: 'Caruarú, a Princesinha do Nordeste!',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'dificil_e_o_nome',
      schoolName: 'Difícil é o Nome',
      enredo: 'Flor de Lis - Símbolo Universal! Hoje se Faz Presente no Nosso Carnaval!',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Nasceu, Balançou, Dançou!',
      statusDescription: '11º Lugar'
    }
  ],
  2011: [
    {
      rank: 1,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'O Mais Doce Bárbaro - Caetano Veloso',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'curicica',
      schoolName: 'União do Parque Curicica',
      enredo: 'Eu Sou o Samba, a Voz de Um Povo Brasileiro!',
      statusDescription: 'Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Hilária Batista de Almeida',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Arranco Aplausos para Exaltar a Mulher Brasileira em Primeiro Lugar',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'sereno_campo_grande',
      schoolName: 'Sereno de Campo Grande',
      enredo: 'Sereno... A Essência do Carnaval',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Feijoada - Mistura e Tempero, da Cor do Samba, Sabor Brasileiro',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'Juazeiro do Norte, Terra de Oração e Trabalho. Cem Anos de Fé, Poder e Tradição',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'dificil_e_o_nome',
      schoolName: 'Difícil é o Nome',
      enredo: 'Aniversarius! Dies Sollemnis Natalis',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'vicente_de_carvalho',
      schoolName: 'Mocidade de Vicente de Carvalho',
      enredo: 'Uma Viagem ao Universo dos Cabelos',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'academicos_do_sossego',
      schoolName: 'Acadêmicos do Sossego',
      enredo: 'Sua Majestade, o Rei Sol',
      relegated: true,
      statusDescription: '10º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 11,
      schoolId: 'praca_da_bandeira',
      schoolName: 'Independente de São João de Meriti (Independente da Praça da Bandeira)',
      enredo: 'Refavela',
      relegated: true,
      statusDescription: '11º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 12,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Um Lugar Chamado Favela',
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  2010: [
    {
      rank: 1,
      schoolId: 'alegria_da_zona_sul',
      schoolName: 'Alegria da Zona Sul',
      enredo: 'No mundo da fantasia... vejo as cores da Alegria',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Bendita baderna numa rua chamada felicidade',
      statusDescription: 'Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'sereno_campo_grande',
      schoolName: 'Sereno de Campo Grande',
      enredo: 'Abracadabra... o circo Sereno chegou!',
      statusDescription: '3º Lugar (Empate)'
    },
    {
      rank: 3,
      schoolId: 'curicica',
      schoolName: 'União do Parque Curicica',
      enredo: 'Lendas, mistérios e magias. Não creio, mas... sei lá, né?',
      statusDescription: '3º Lugar (Empate)'
    },
    {
      rank: 5,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Da morada da esperança ao grande palco do sambista, somos todos iguais nesta noite, somos todos artistas',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'academicos_do_sossego',
      schoolName: 'Acadêmicos do Sossego',
      enredo: 'Made in Nictheroy',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'Rei Senhor, Rei Zumbi, Rei Nagô! Eu tô aí, tô aí sim Senhor!',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Folia de Reis',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'vicente_de_carvalho',
      schoolName: 'Mocidade de Vicente de Carvalho',
      enredo: 'Bonecas. Impossível não se apaixonar por elas...',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Jacarezinho.com.br',
      relegated: true,
      statusDescription: '10º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 11,
      schoolId: 'boi_da_ilha',
      schoolName: 'Boi da Ilha do Governador',
      enredo: 'Do sagrado ao profano... E o Boi, quem diria, foi parar na Freguesia',
      relegated: true,
      statusDescription: '11º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 12,
      schoolId: 'flor_da_mina',
      schoolName: 'Flor da Mina do Andaraí',
      enredo: 'Vela',
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  2009: [
    {
      rank: 1,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Afoxé É Cortejo, É Ritual, É Festa. Afoxé É Carnaval!',
      promoted: true,
      statusDescription: 'Campeã (Empate) • Subiu para a Série Ouro'
    },
    {
      rank: 1,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Vinho, Néctar dos Deuses - A Celebração da Vida',
      promoted: true,
      statusDescription: 'Campeã (Empate) • Subiu para a Série Ouro'
    },
    {
      rank: 3,
      schoolId: 'curicica',
      schoolName: 'União do Parque Curicica',
      enredo: 'O Carioca É Aquele: Espírito, Paixão e Fé',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Ora, Pois, Pois... Tem Patimcum Bum à Vista!',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'O Arranco é Todo Amor...',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'sereno_campo_grande',
      schoolName: 'Sereno de Campo Grande',
      enredo: "Eu Fiz Tudo pra Você não Esquecer de Mim. 'Ta-hí' – Cem Anos de Carmen Miranda",
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'A Toda Hora Rola Uma História, com Samba e Chorinho de Paulinho da Viola',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'boi_da_ilha',
      schoolName: 'Boi da Ilha do Governador',
      enredo: 'Abram-se as Cortinas! Bravo! 100 anos do Theatro Municipal em Cena Aberta na Sapucaí',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Lapa: Estrela da Vida Inteira',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'Saquarema, Princesinha da Costa do Sol. De Capital do Surfe à Casa do Vôlei',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'alegria_da_zona_sul',
      schoolName: 'Alegria da Zona Sul',
      enredo: 'Heitor dos Prazeres, Carioca da Gema, Um Artista de Corpo e Alma',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'praca_da_bandeira',
      schoolName: 'Independente da Praça da Bandeira',
      enredo: 'Redescobrindo a História e a Cultura do Rio de Janeiro',
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 13,
      schoolId: 'arrastao_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'E Foram Felizes para Sempre... A Química Perfeita das Duplas',
      relegated: true,
      statusDescription: '13º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 14,
      schoolId: 'amarelinho',
      schoolName: 'Corações Unidos do Amarelinho',
      enredo: 'O Grito de Amor e Rebeldia de Uma Pátria Livre',
      relegated: true,
      statusDescription: '14º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  2008: [
    {
      rank: 1,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'Ewe, a Cura Vem da Floresta',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Cartola, Teu Cenário É Uma Beleza',
      promoted: true,
      statusDescription: 'Vice-Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 3,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'No Reino das Águas de Olocun',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Andanças e Folias',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'alegria_da_zona_sul',
      schoolName: 'Alegria da Zona Sul',
      enredo: 'Chegou o General da Banda! Albino Pinheiro, Alegria do Rio',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'praca_da_bandeira',
      schoolName: 'Independente da Praça da Bandeira',
      enredo: 'Viagem Fantástica ao Mundo do Circo: Seja de Lona ou Social',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'tradicao',
      schoolName: 'Tradição',
      enredo: 'Isto Sim É a Tradição!',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'sereno_campo_grande',
      schoolName: 'Sereno de Campo Grande',
      enredo: 'O Gigante Chamado Brasil',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'boi_da_ilha',
      schoolName: 'Boi da Ilha do Governador',
      enredo: 'Gaia, a Reação da Mãe Terra - Uma História que Deve Ser Contada de Outra Maneira',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: "Miquié - 'Maca ê', Sou a Princesinha do Atlântico, Capital Macaé",
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'curicica',
      schoolName: 'União do Parque Curicica',
      enredo: 'O Mundo Místico das Águas em Berço Esplêndido, Derrama ao Planeta o Seu Clamor!',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'vicente_de_carvalho',
      schoolName: 'Mocidade de Vicente de Carvalho',
      enredo: 'Brasil, País Mulato',
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 13,
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'Vizinha Faladeira no Brasil das Maravilhas',
      relegated: true,
      statusDescription: '13º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 14,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Piauí, Filho do Sol do Equador - Teresina, Terra do Sonho e do Amor',
      relegated: true,
      statusDescription: '14º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  2007: [
    {
      rank: 1,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Chico Mendes, o Arauto da Natureza',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'Chatô - A fanfarra do homem mais sério e engraçado do Brasil',
      statusDescription: 'Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Vamos Falar de Amor',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Circo, Samba e Futebol: a expressão de um povo',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'Oduduya - a volta ao templo da criação',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'unidos_padre_miguel',
      schoolName: 'Unidos de Padre Miguel',
      enredo: 'Unidos pelos caminhos da fé, desbravando os carnavais',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'alegria_da_zona_sul',
      schoolName: 'Alegria da Zona Sul',
      enredo: 'Negro não humilha e nem se humilha a ninguém, todas as raças já foram escravas também',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'curicica',
      schoolName: 'União do Parque Curicica',
      enredo: 'Brazil S/A... é a pátria que nos pariu!',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Chá: elixir da vida, herança milenar de aroma, arte e cultura',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'sereno_campo_grande',
      schoolName: 'Sereno de Campo Grande',
      enredo: 'É carnaval! A Coruja manda avisar.... Deu Águia, viva a Portela!',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'boi_da_ilha',
      schoolName: 'Boi da Ilha do Governador',
      enredo: 'Alô, Alô, Se Liga! Tem Boi na Linha',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'praca_da_bandeira',
      schoolName: 'Independente da Praça da Bandeira',
      enredo: 'Ecoa um grito de liberdade nos Quilombos da Baixada',
      statusDescription: '12º Lugar'
    },
    {
      rank: 13,
      schoolId: 'dificil_e_o_nome',
      schoolName: 'Difícil é o Nome',
      enredo: 'Rio das Ostras, a pérola brasileira',
      relegated: true,
      statusDescription: '13º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 14,
      schoolId: 'flor_da_mina',
      schoolName: 'Flor da Mina do Andaraí',
      enredo: 'O grande estadista do Brasil - João Maria José Francisco Xavier de Paula Luis Antônio Domingos Rafael de Bragança',
      relegated: true,
      statusDescription: '14º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  2006: [
    {
      rank: 1,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Tijuca, Cantos, Recantos e Encantos',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'O Imperador Morava Ali, do Outro Lado do Tuiuti',
      statusDescription: 'Vice-Campeã'
    },
    {
      rank: 3,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'A Lenda das Sereias, Rainha do Mar',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'curicica',
      schoolName: 'União do Parque Curicica',
      enredo: 'GLS Com a Bandeira da Alegria; o Babado da Curicica no Carnaval É Só Alegria!',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Lua Viajante',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'dificil_e_o_nome',
      schoolName: 'Difícil é o Nome',
      enredo: 'Olubajé, a Festa da Libertação',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Arraial do Pavulagem',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'flor_da_mina',
      schoolName: 'Flor da Mina do Andaraí',
      enredo: 'O Direito de Ir e Vir. Da Aldeia do Andira-Y, da Cadeirinha ao Metrô, Eu Também Vou...',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'praca_da_bandeira',
      schoolName: 'Independente da Praça da Bandeira',
      enredo: 'O Sertão Vai Virar Mar, o Velho Chico Quem Vem Avisar',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'boi_da_ilha',
      schoolName: 'Boi da Ilha do Governador',
      enredo: 'O Amanhã',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Alô, Alô, Intendente! Aquele Abraço!',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Da Cor do Pecado',
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  2005: [
    {
      rank: 1,
      schoolId: 'estacio_de_sa',
      schoolName: 'Estácio de Sá',
      enredo: 'Arte Negra na Legendária Bahia',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Quem vai Querer?',
      promoted: true,
      statusDescription: 'Vice-Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 3,
      schoolId: 'boi_da_ilha',
      schoolName: 'Boi da Ilha do Governador',
      enredo: 'As Águas de Oxalá',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'O Bêbado e a Equilibrista. O Show tem que Continuar...',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'O Ouro do Lixo - De onde vai, para onde vem. Reciclando com o Pé no Futuro',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'E Eles Verão a Deus',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'Sargentelli Carioca do Brasil. É Samba, é Alegria, é Mulata nota mil',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Mar Baiano em Noite de Gala',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'praca_da_bandeira',
      schoolName: 'Independente da Praça da Bandeira',
      enredo: 'Josué de Castro: Ecoa um Grito contra a Fome, pela Cidadania e pela Paz na Terra',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Monarco, Voz e Memória do Samba, um Passado de Glória',
      relegated: true,
      statusDescription: '10º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 11,
      schoolId: 'leao_de_nova_iguacu',
      schoolName: 'Leão de Nova Iguaçu',
      enredo: 'Na Magia do Palco da Vida. Emilinha Borba, a Rainha do Brasil!',
      relegated: true,
      statusDescription: '11º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 12,
      schoolId: 'vicente_de_carvalho',
      schoolName: 'Mocidade de Vicente de Carvalho',
      enredo: 'Da Lenda à História de Itaguaí',
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  2004: [
    {
      rank: 1,
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'A Bela Adormecida',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'A Riqueza da Criação em Cada Canto Desse Chão',
      promoted: true,
      statusDescription: 'Vice-Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 3,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'A Império da Tijuca É Doce, mas não É Mole não!',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Unisuam no Mundo Jacaré, Coruja É Rei',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'Hei de Torcer, Torcer, Torcer... América, 100 Anos de Paixão',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Da Pedra Bonita ao Resgate Social, Itaboraí Uma História sem Igual',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'boi_da_ilha',
      schoolName: 'Boi da Ilha do Governador',
      enredo: 'Uni-duni-tê, Brincando, Construí Um Mundo Novo pra Você',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Maria Augusta, o Sonho nas Estrelas',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'academicos_da_barra_da_tijuca',
      schoolName: 'Acadêmicos da Barra da Tijuca',
      enredo: 'Luz, Câmera e Ação, Cacá Diegues na Barra da Tijuca, é Pura Emoção!',
      relegated: true,
      statusDescription: '9º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 10,
      schoolId: 'curicica',
      schoolName: 'União do Parque Curicica',
      enredo: 'Verdade pra Quem Viveu, Miragem pra Quem não Viu, Invasão de Amor e Paz nas Terras do Meu Brasil',
      relegated: true,
      statusDescription: '10º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 11,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Therezinha Monte - A Guerreira do Samba e Seus 20 Anos de Folia na Cabuçu',
      relegated: true,
      statusDescription: '11º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 12,
      schoolId: 'villa_rica',
      schoolName: 'Unidos da Villa Rica',
      enredo: 'Odoiá, a Poderosa Força das Águas, o Símbolo Gerador da Vida',
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  2003: [
    {
      rank: 1,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Segura Marimba, Aroldo Melodia vem aí!',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'alegria_da_zona_sul',
      schoolName: 'Alegria da Zona Sul',
      enredo: 'Festa do quilombo na coroação de um rei negro',
      promoted: true,
      statusDescription: 'Vice-Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 3,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'Arré égua! Hoje nós vamos pras comédias!',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'academicos_da_barra_da_tijuca',
      schoolName: 'Acadêmicos da Barra da Tijuca',
      enredo: 'É arte e carnaval! A Barra da Tijuca apresenta o Teatro do Oprimido na vida real',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'curicica',
      schoolName: 'União do Parque Curicica',
      enredo: 'Da Criação a Reconstrução - 90 anos do Mercadão de Madureira',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Saravá! Negritude, Saravá!',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'Todo mundo tem família – A história é a mesma, só muda o endereço',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Jacarezinho roda, roda, roda e avisa: que saudades do Velho Guerreiro - Chacrinha!',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'imperio_da_tijuca',
      schoolName: 'Império da Tijuca',
      enredo: 'A magia imperial põe a mão na massa e encanta a massa na Sapucaí',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'villa_rica',
      schoolName: 'Unidos da Villa Rica',
      enredo: 'Do Trigo da Terra... Arte do Pão',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'XVª Região - Nossa vida, nosso progresso, nossa paixão...',
      relegated: true,
      statusDescription: '11º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 12,
      schoolId: 'academicos_do_sossego',
      schoolName: 'Acadêmicos do Sossego',
      enredo: 'Sossego atravessa a baía na Barca da Folia',
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  2002: [
    {
      rank: 1,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'África, o exuberante paraíso negro',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'inocentes',
      schoolName: 'Inocentes da Baixada (Inocentes de Belford Roxo)',
      enredo: 'É carnaval, é tititi, é São João, é Meriti',
      promoted: true,
      statusDescription: 'Vice-Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 3,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Jacarezinho brincando com Daniel Azulay nos 25 anos da Turma do Lambe-lambe',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Feira de São Cristóvão, o Nordeste também é Aqui',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'Nem tudo que reluz é ouro',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'alegria_da_zona_sul',
      schoolName: 'Alegria da Zona Sul',
      enredo: 'O Sonho Dourado de Percy',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Os Cucumbis: a trajetória do samba',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'Dos dias de reis aos contos históricos nos 500 anos de Angra',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'academicos_do_sossego',
      schoolName: 'Acadêmicos do Sossego',
      enredo: 'Andar com Fé eu Vou... Brasil, Tua Alma é Barroca',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'A poesia anda de bonde e a Em Cima da Hora conta essa linda história',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Se reciclar não vai faltar',
      relegated: true,
      statusDescription: '11º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 12,
      schoolId: 'folioes_de_botafogo',
      schoolName: 'Foliões de Botafogo',
      enredo: 'Deus ajuda a quem cedo madruga?',
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  2001: [
    {
      rank: 1,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'E Deus criou a mulher',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'A magia da dança',
      promoted: true,
      statusDescription: 'Vice-Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 3,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Maracanã, 50 anos de emoções',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Oh, Que Saudades que Eu Tenho !',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'O Canto da Guerreira - Homenagem a Clara Nunes',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'A Cubango mostra tua raça, Niterói é teu berço, a cidade te abraça',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'Ousadia de um Homem a Frente do Seu Tempo - Nelson Carneiro',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Cabuçu canta e encanta com o canto das sereias',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'folioes_de_botafogo',
      schoolName: 'Foliões de Botafogo',
      enredo: 'Quando 3001 chegar',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'Uarará, o fruto da vida',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'unidos_da_vila_kennedy',
      schoolName: 'Unidos da Vila Kennedy',
      enredo: 'Paraíba, o Portal das Américas',
      relegated: true,
      statusDescription: '11º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 12,
      schoolId: 'dificil_e_o_nome',
      schoolName: 'Difícil é o Nome',
      enredo: 'O Gigante Suburbano - Norte Shopping',
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  2000: [
    {
      rank: 1,
      schoolId: 'leao_de_nova_iguacu',
      schoolName: 'Leão de Nova Iguaçu',
      enredo: 'O Leão no Caminho do Ouro',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'unidos_da_ponte',
      schoolName: 'Unidos da Ponte',
      enredo: 'As Damas do Samba - D. Zica e D. Neuma',
      promoted: true,
      statusDescription: 'Vice-Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 3,
      schoolId: 'villa_rica',
      schoolName: 'Unidos da Villa Rica',
      enredo: 'Coração de Três Raças',
      promoted: true,
      statusDescription: '3º Lugar • Subiu para a Série Ouro'
    },
    {
      rank: 4,
      schoolId: 'boi_da_ilha',
      schoolName: 'Boi da Ilha do Governador',
      enredo: 'Paranapuan - Governador na História de uma Ilha, Memórias de uma Nação',
      promoted: true,
      statusDescription: '4º Lugar • Subiu para a Série Ouro'
    },
    {
      rank: 5,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'O vento que venta lá, venta cá',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'No ano 2000, o Rei Conga é cultura nos 500 anos do Brasil',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Brasil, 500 Anos em três raças',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'folioes_de_botafogo',
      schoolName: 'Foliões de Botafogo',
      enredo: 'Palmares em Festa',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'academicos_do_sossego',
      schoolName: 'Acadêmicos do Sossego',
      enredo: 'Bahia em Quatro Tempos : de Caymmi ao Axé, Música Baiana leva Fé',
      relegated: true,
      statusDescription: '9º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 10,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Se eu não cumprir promessa, me processa',
      relegated: true,
      statusDescription: '10º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 11,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Nos 500 anos, o Engenho engrossa o caldo e mostra a cana',
      relegated: true,
      statusDescription: '11º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 12,
      schoolId: 'arrastao_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'Caxambu, da hidrópolis teal a corte no carnaval',
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  1999: [
    {
      rank: 1,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: '1999, Fim de Século. Recordar É Viver',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'Viva a Baixada, Longos Passos do Progresso Rumo ao Terceiro Milênio',
      promoted: true,
      statusDescription: 'Vice-Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 3,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Uma Delícia Glacial no País do Carnaval',
      promoted: true,
      statusDescription: '3º Lugar • Subiu para a Série Ouro'
    },
    {
      rank: 4,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Numa Fuga Alucinada entre Piolhos e Galinhas, Veio até Uma Rainha',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'As Quatro Damas Negras',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'boi_da_ilha',
      schoolName: 'Boi da Ilha do Governador',
      enredo: 'A Saga de Kananciuê na Aurora do Mundo Carajá',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'arrastao_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'No Palco da Alegria, Sou o Rei Nesta Folia',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'academicos_do_sossego',
      schoolName: 'Acadêmicos do Sossego',
      enredo: '500 Anos de Brasil, o que Caminha Viu e não Viu',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'De Cabral a Zito, Salve Caxias',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'Sou Vizinha Delirando a Passarela, É Paulínia na Sapucaí',
      relegated: true,
      statusDescription: '10º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 11,
      schoolId: 'vigario_geral',
      schoolName: 'Acadêmicos de Vigário Geral',
      enredo: 'Vigário, Um Sonho de Liberdade',
      relegated: true,
      statusDescription: '11º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 12,
      schoolId: 'canarios_laranjeiras',
      schoolName: 'Canários das Laranjeiras',
      enredo: 'Bar Luiz, 112 Anos de Boemia Feliz',
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  1998: [
    {
      rank: 1,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Jacarezinho é ... Etnias na Sapucaí',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'villa_rica',
      schoolName: 'Unidos da Villa Rica',
      enredo: 'Ferrogun',
      promoted: true,
      statusDescription: 'Vice-Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 3,
      schoolId: 'cabucu',
      schoolName: 'Unidos do Cabuçu',
      enredo: 'Toda a Sorte do Mundo',
      promoted: true,
      statusDescription: '3º Lugar • Subiu para a Série Ouro'
    },
    {
      rank: 4,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Oui Oui, a França Esteve Aqui!',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'Memórias de um Brasil Holandês',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'A Lenda do Aguapé na Tribo de Yacaré',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'Cem Anos de Existência, Tome Providência',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'canarios_laranjeiras',
      schoolName: 'Canários das Laranjeiras',
      enredo: 'Livre Como um Passarinho',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'arrastao_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'Florindo o Rio de Alegria',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'vigario_geral',
      schoolName: 'Acadêmicos de Vigário Geral',
      enredo: 'Conto Dourado de um Povo Sonhador',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'academicos_do_dende',
      schoolName: 'Acadêmicos do Dendê',
      enredo: 'Africano ou Baiano? Sou Natural dos Orixás, Sou o Tempero do meu Rio de Janeiro, Sou Carnaval',
      relegated: true,
      statusDescription: '11º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 12,
      schoolId: 'santa_marta',
      schoolName: 'Mocidade Unida do Santa Marta',
      enredo: 'Zumbi, a Tróia Negra',
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  1997: [
    {
      rank: 1,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Tudo isso é Brasil',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Os pontos de nossos contos',
      promoted: true,
      statusDescription: 'Vice-Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 3,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Sonhando com a infância, oh! Como é doce ser criança',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'villa_rica',
      schoolName: 'Unidos da Villa Rica',
      enredo: "Cores d'África",
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'engenho_da_rainha',
      schoolName: 'Acadêmicos do Engenho da Rainha',
      enredo: 'De Bufalo Bill ao cowboy brasileiro, viva o peão boiadeiro',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'vigario_geral',
      schoolName: 'Acadêmicos de Vigário Geral',
      enredo: 'Rio de Janeiro a Janeiro, uma sinfonia apoteótica',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'canarios_laranjeiras',
      schoolName: 'Canários das Laranjeiras',
      enredo: 'Do mundo da emoção à nova era da comunicação',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'arrastao_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'Oju-Obá, os olhos do rei',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'boi_da_ilha',
      schoolName: 'Boi da Ilha do Governador',
      enredo: 'Galanga no Congo, Chico em terras de Vila Rica',
      relegated: true,
      statusDescription: '9º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 10,
      schoolId: 'dificil_e_o_nome',
      schoolName: 'Difícil é o Nome',
      enredo: 'O samba que virou suco',
      relegated: true,
      statusDescription: '10º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 11,
      schoolId: 'vicente_de_carvalho',
      schoolName: 'Mocidade de Vicente de Carvalho',
      enredo: 'Da caminhada de glórias ao jubileu de ouro',
      relegated: true,
      statusDescription: '11º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 12,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Capela e Aprendizes, o Galo conta a sua história',
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  1996: [
    {
      rank: 1,
      schoolId: 'arranco',
      schoolName: 'Arranco',
      enredo: 'Ser Brasil, Ser Brasileiro',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'academicos_do_dende',
      schoolName: 'Acadêmicos do Dendê',
      enredo: 'Prédio Roubado, Ponha-se na Rua... Ora pois, pois!',
      promoted: true,
      statusDescription: 'Vice-Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 3,
      schoolId: 'jacarezinho',
      schoolName: 'Unidos do Jacarezinho',
      enredo: 'Vapt Vupt - 44 Anos de Cultura, Humor e Fantasia',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'dificil_e_o_nome',
      schoolName: 'Difícil é o Nome',
      enredo: 'João Nosso João',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'canarios_laranjeiras',
      schoolName: 'Canários das Laranjeiras',
      enredo: 'Aruanda, Um Sonho de Zumbi',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'unidos_de_lucas',
      schoolName: 'Unidos de Lucas',
      enredo: 'Rua da Carioca a Mais Carioca do Rio',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'lins_imperial',
      schoolName: 'Lins Imperial',
      enredo: 'Méier, Ponto de Encontro de Cantos e Encantos',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'vigario_geral',
      schoolName: 'Acadêmicos de Vigário Geral',
      enredo: 'Fica o Dito pelo não Dito',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'leao_de_nova_iguacu',
      schoolName: 'Leão de Nova Iguaçu',
      enredo: 'Tudo Isto Quer Dizer Brasil',
      relegated: true,
      statusDescription: '9º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 10,
      schoolId: 'abolicao',
      schoolName: 'Acadêmicos da Abolição',
      enredo: 'Quem É que Faz a Alegria do Povo?',
      relegated: true,
      statusDescription: '10º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 11,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes de Cordovil',
      enredo: 'Que Rei Sou Eu?',
      relegated: true,
      statusDescription: '11º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 12,
      schoolId: 'mocidade_cidade_de_deus',
      schoolName: 'Mocidade Unida da Cidade de Deus',
      enredo: 'Quilombo dos Palmares, Um Paraíso Negro',
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  1995: [
    {
      rank: 1,
      schoolId: 'academicos_do_dende',
      schoolName: 'Acadêmicos do Dendê',
      enredo: 'Essa Água É Fogo',
      statusDescription: 'Campeã • Mantida na Série Prata (reorganização dos grupos de acesso)'
    },
    {
      rank: 2,
      schoolId: 'vigario_geral',
      schoolName: 'Acadêmicos de Vigário Geral',
      enredo: 'Ontem, Hoje e Sempre Mestre Marçal',
      statusDescription: 'Vice-Campeã • Mantida na Série Prata (reorganização dos grupos de acesso)'
    },
    {
      rank: 3,
      schoolId: 'abolicao',
      schoolName: 'Acadêmicos da Abolição',
      enredo: 'Crescendo e Aprendendo',
      statusDescription: '3º Lugar • Mantida na Série Prata'
    },
    {
      rank: 4,
      schoolId: 'unidos_da_vila_kennedy',
      schoolName: 'Unidos da Vila Kennedy',
      enredo: 'História e Herança de Uma Raça',
      relegated: true,
      statusDescription: '4º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 5,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Recicla Brasil, o Lixo É Um Luxo',
      relegated: true,
      statusDescription: '5º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 6,
      schoolId: 'boi_da_ilha',
      schoolName: 'Boi da Ilha do Governador',
      enredo: 'Zero Dá Sorte',
      relegated: true,
      statusDescription: '6º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 7,
      schoolId: 'folioes_de_botafogo',
      schoolName: 'Foliões de Botafogo',
      enredo: 'Marlene Paiva, das Passarelas de Luxo à Passarela do Samba',
      relegated: true,
      statusDescription: '7º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 8,
      schoolId: 'santa_marta',
      schoolName: 'Mocidade Unida do Santa Marta',
      enredo: 'Faça Amor, não Faça Guerra',
      relegated: true,
      statusDescription: '8º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 9,
      schoolId: 'unidos_do_campinho',
      schoolName: 'Unidos do Campinho',
      enredo: 'Do Milho ao Milhão',
      relegated: true,
      statusDescription: '9º Lugar • Rebaixada para o Grupo de Avaliação'
    },
    {
      rank: 10,
      schoolId: 'renascer_jacarepagua',
      schoolName: 'Renascer de Jacarepaguá',
      enredo: 'Minha Terra Tem Lagoas Onde Vivem os Jacarés',
      relegated: true,
      statusDescription: '10º Lugar • Rebaixada para o Grupo de Avaliação'
    },
    {
      rank: 11,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'De Geração em Geração quem É Discriminado É o Negão',
      relegated: true,
      statusDescription: '11º Lugar • Rebaixada para o Grupo de Avaliação'
    },
    {
      rank: 12,
      schoolId: 'imperio_do_maranga',
      schoolName: 'Império do Marangá',
      enredo: 'No Balanço das Ondas do Mar',
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para o Grupo de Avaliação'
    },
    {
      rank: 13,
      schoolId: 'uniao_de_rocha_miranda',
      schoolName: 'União de Rocha Miranda',
      enredo: 'O Grito da Flor',
      relegated: true,
      statusDescription: '13º Lugar • Rebaixada para o Grupo de Avaliação'
    },
    {
      rank: 14,
      schoolId: 'unidos_de_manguinhos',
      schoolName: 'Unidos de Manguinhos',
      enredo: 'Manguinhos, Ouro, Saúde e Folia',
      relegated: true,
      statusDescription: '14º Lugar • Rebaixada para o Grupo de Avaliação'
    },
    {
      rank: 0,
      schoolId: 'inocentes',
      schoolName: 'Inocentes de Belford Roxo',
      enredo: 'Grande Otelo, uma vida que se acaba na ribalta',
      relegated: true,
      isHorsConcours: true,
      statusDescription: 'Não desfilou • Rebaixada para o Grupo de Avaliação'
    }
  ],
  1994: [
    {
      rank: 1,
      schoolId: 'dificil_e_o_nome',
      schoolName: 'Difícil é o Nome',
      enredo: 'Olubajé, a Festa da Libertação',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'Sou Rei, Sou Rainha, na Corte da Vizinha',
      promoted: true,
      statusDescription: 'Vice-Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 3,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'De Frequência em Frequência na Cadência do Samba',
      promoted: true,
      statusDescription: '3º Lugar • Subiu para a Série Ouro'
    },
    {
      rank: 4,
      schoolId: 'tupy_bras_de_pina',
      schoolName: 'Tupy de Brás de Pina',
      enredo: 'Sargentelli, Hoje o Show É na Avenida',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'boi_da_ilha',
      schoolName: 'Boi da Ilha do Governador',
      enredo: 'Das Terras do Congo ao Reinado da Luz',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Tropicália, Aquele Abraço',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'unidos_do_campinho',
      schoolName: 'Unidos do Campinho',
      enredo: 'Anastácia, Um Grito de Liberdade na Sapucaí',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'mocidade_cidade_de_deus',
      schoolName: 'Mocidade Unida da Cidade de Deus',
      enredo: 'Me Engana que Eu Gosto',
      promoted: true,
      statusDescription: '8º Lugar • Convidada para a Série Ouro (1995)'
    },
    {
      rank: 9,
      schoolId: 'boemios_de_inhauma',
      schoolName: 'Boêmios de Inhaúma',
      enredo: 'Segura o Andor Boêmio que Vai Passar na Avenida Um Samba Popular',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Nas Asas do Tuiuti',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'unidos_de_manguinhos',
      schoolName: 'Unidos de Manguinhos',
      enredo: 'Quatzacoat, Uma Chocante Tentação',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'vigario_geral',
      schoolName: 'Acadêmicos de Vigário Geral',
      enredo: 'Ah! Que Saudades que Eu Tenho',
      statusDescription: '12º Lugar'
    }
  ],
  1993: [
    {
      rank: 1,
      schoolId: 'villa_rica',
      schoolName: 'Unidos da Villa Rica',
      enredo: 'Quem não arrisca não petisca, façam o jogo',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'canarios_laranjeiras',
      schoolName: 'Canários das Laranjeiras',
      enredo: 'Kaleidoscópio',
      promoted: true,
      statusDescription: 'Vice-Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 3,
      schoolId: 'independentes_cordovil',
      schoolName: 'Independentes de Cordovil',
      enredo: 'Ogum, o que veio da África',
      promoted: true,
      statusDescription: '3º Lugar • Subiu para a Série Ouro'
    },
    {
      rank: 4,
      schoolId: 'tupy_bras_de_pina',
      schoolName: 'Tupy de Brás de Pina',
      enredo: 'Armando Campos, uma vida que dá samba',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'unidos_de_manguinhos',
      schoolName: 'Unidos de Manguinhos',
      enredo: 'E tá danado de bom',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Arte negra em noite de gala',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'ECA 8069',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'unidos_do_campinho',
      schoolName: 'Unidos do Campinho',
      enredo: 'Entre confetes e serpentinas, o sonho do carnaval',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'dificil_e_o_nome',
      schoolName: 'Difícil é o Nome',
      enredo: 'Ela Merece, Paula do Salgueiro',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'vizinha_faladeira',
      schoolName: 'Vizinha Faladeira',
      enredo: 'Um ser criança',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Os anjos',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'vila_santa_tereza',
      schoolName: 'Unidos da Vila Santa Tereza',
      enredo: 'O que é que o negro tem?',
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  1992: [
    {
      rank: 1,
      schoolId: 'arrastao_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'Carnaval, ontem, hoje e amanhã',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Negro que te quero negro',
      promoted: true,
      statusDescription: 'Vice-Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 3,
      schoolId: 'mocidade_cidade_de_deus',
      schoolName: 'Mocidade Unida da Cidade de Deus',
      enredo: 'Pepê, Esporte, Ecologia e Carnaval',
      promoted: true,
      statusDescription: '3º Lugar • Subiu para a Série Ouro'
    },
    {
      rank: 4,
      schoolId: 'canarios_laranjeiras',
      schoolName: 'Canários das Laranjeiras',
      enredo: 'Mãe África',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'unidos_de_manguinhos',
      schoolName: 'Unidos de Manguinhos',
      enredo: 'Moreira da Silva, 90 Anos de um Malandro',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'tupy_bras_de_pina',
      schoolName: 'Tupy de Brás de Pina',
      enredo: 'Tributo às Raízes',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Mar de Ilusões',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'A sombra da ilusão, uma fantasia brasileira',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'vila_santa_tereza',
      schoolName: 'Unidos da Vila Santa Tereza',
      enredo: 'Portela e Império Encantam Madureira',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'tuiuti',
      schoolName: 'Paraíso do Tuiuti',
      enredo: 'Será que vai Dar Praia ?',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'unidos_da_vila_kennedy',
      schoolName: 'Unidos da Vila Kennedy',
      enredo: 'Divindade dos Deuses',
      relegated: true,
      statusDescription: '11º Lugar • Rebaixada para a Série Bronze'
    },
    {
      rank: 12,
      schoolId: 'uniao_vaz_lobo',
      schoolName: 'União de Vaz Lobo',
      enredo: 'É uma casa brasileira com certeza',
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para a Série Bronze'
    }
  ],
  1991: [
    {
      rank: 1,
      schoolId: 'rocinha',
      schoolName: 'Acadêmicos da Rocinha',
      enredo: 'Do esplendor da Roma pagã ao despertar da Rocinha',
      promoted: true,
      statusDescription: 'Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 2,
      schoolId: 'unidos_do_campinho',
      schoolName: 'Unidos do Campinho',
      enredo: 'Dourados sonhos do Axuí',
      promoted: true,
      statusDescription: 'Vice-Campeã • Subiu para a Série Ouro'
    },
    {
      rank: 3,
      schoolId: 'cubango',
      schoolName: 'Acadêmicos do Cubango',
      enredo: 'Terra de Santa Cruz, dos abacaxis e dos filhos da fruta',
      statusDescription: '3º Lugar'
    },
    {
      rank: 4,
      schoolId: 'em_cima_da_hora',
      schoolName: 'Em Cima da Hora',
      enredo: 'Elymar, um sonho que virou canção',
      statusDescription: '4º Lugar'
    },
    {
      rank: 5,
      schoolId: 'tupy_bras_de_pina',
      schoolName: 'Tupy de Brás de Pina',
      enredo: 'Acredite se quiser',
      statusDescription: '5º Lugar'
    },
    {
      rank: 6,
      schoolId: 'unidos_de_manguinhos',
      schoolName: 'Unidos de Manguinhos',
      enredo: 'Do sonho do futebol à estrela do carnaval - Neguinho da Beija-Flor',
      statusDescription: '6º Lugar'
    },
    {
      rank: 7,
      schoolId: 'arrastao_cascadura',
      schoolName: 'Arrastão de Cascadura',
      enredo: 'A procura da sorte',
      statusDescription: '7º Lugar'
    },
    {
      rank: 8,
      schoolId: 'mocidade_cidade_de_deus',
      schoolName: 'Mocidade Unida da Cidade de Deus',
      enredo: 'O retrato sincero de um povo',
      statusDescription: '8º Lugar'
    },
    {
      rank: 9,
      schoolId: 'uniao_vaz_lobo',
      schoolName: 'União de Vaz Lobo',
      enredo: 'Berço de Estrela',
      statusDescription: '9º Lugar'
    },
    {
      rank: 10,
      schoolId: 'uniao_de_jacarepagua',
      schoolName: 'União de Jacarepaguá',
      enredo: 'Aperta meu pescoço, mas não paro de gritar: sou mais Brasil',
      statusDescription: '10º Lugar'
    },
    {
      rank: 11,
      schoolId: 'vila_santa_tereza',
      schoolName: 'Unidos da Vila Santa Tereza',
      enredo: 'Palmas para mim que eu mereço',
      statusDescription: '11º Lugar'
    },
    {
      rank: 12,
      schoolId: 'uniao_de_rocha_miranda',
      schoolName: 'União de Rocha Miranda',
      enredo: 'A coroação de Tia Ciata, mãe da batucada brasileira',
      relegated: true,
      statusDescription: '12º Lugar • Rebaixada para a Série Bronze'
    }
  ]
};

export const OFFICIAL_PRATA_HISTORICAL_SUBGROUPS: Record<
  number,
  {
    noite1?: PrataStandingRecord[];
    noite2?: PrataStandingRecord[];
    liesb?: PrataStandingRecord[];
    livres?: PrataStandingRecord[];
  }
> = {
  2024: {
    noite1: [
      { rank: 1, night: '1ª Noite', schoolId: 'botafogo_samba_clube', schoolName: 'Botafogo Samba Clube', enredo: 'Taina-Kan: A Estrela Solitária', promoted: true, statusDescription: '1ª da 1ª Noite (Vice-Campeã Geral) • Subiu para a Série Ouro' },
      { rank: 2, night: '1ª Noite', schoolId: 'fla_manguaca', schoolName: 'Fla Manguaça', enredo: 'Quer Apostar?', statusDescription: '2º Lugar • 1ª Noite' },
      { rank: 3, night: '1ª Noite', schoolId: 'uniao_de_jacarepagua', schoolName: 'União de Jacarepaguá', enredo: 'A Criação Vodun e o Candomblé Jeje', statusDescription: '3º Lugar • 1ª Noite' },
      { rank: 4, night: '1ª Noite', schoolId: 'unidos_de_lucas', schoolName: 'Unidos de Lucas', enredo: 'A Floresta do Amazonas', statusDescription: '4º Lugar • 1ª Noite' },
      { rank: 5, night: '1ª Noite', schoolId: 'arrastao_cascadura', schoolName: 'Arrastão de Cascadura', enredo: 'Icamiabas', statusDescription: '5º Lugar • 1ª Noite' },
      { rank: 6, night: '1ª Noite', schoolId: 'unidos_da_barra_da_tijuca', schoolName: 'Unidos da Barra da Tijuca', enredo: 'Encontro das Águas', statusDescription: '6º Lugar • 1ª Noite' },
      { rank: 7, night: '1ª Noite', schoolId: 'feitico_carioca', schoolName: 'Feitiço Carioca', enredo: 'Vai Dizer que Tá Com Medo do Meu Feitiço!?', statusDescription: '7º Lugar • 1ª Noite' },
      { rank: 8, night: '1ª Noite', schoolId: 'santa_marta', schoolName: 'Mocidade Unida do Santa Marta', enredo: 'Sextou #É Só Sucesso', statusDescription: '8º Lugar • 1ª Noite' },
      { rank: 9, night: '1ª Noite', schoolId: 'santa_cruz', schoolName: 'Acadêmicos de Santa Cruz', enredo: 'As Bruxas Estão Soltas!', statusDescription: '9º Lugar • 1ª Noite' },
      { rank: 10, night: '1ª Noite', schoolId: 'vizinha_faladeira', schoolName: 'Vizinha Faladeira', enredo: 'Cais da Resistência', statusDescription: '10º Lugar • 1ª Noite' },
      { rank: 11, night: '1ª Noite', schoolId: 'rocinha', schoolName: 'Acadêmicos da Rocinha', enredo: 'Pra Não Dizer Que Não Falei das Flores', statusDescription: '11º Lugar • 1ª Noite' },
      { rank: 12, night: '1ª Noite', schoolId: 'praca_da_bandeira', schoolName: 'Independente da Praça da Bandeira', enredo: 'Da Brisa do Mar à Luz do Luar de Maricá', statusDescription: '12º Lugar • 1ª Noite' },
      { rank: 13, night: '1ª Noite', schoolId: 'imperio_da_uva', schoolName: 'Império da Uva', enredo: 'Dos Trilhos do Passado a um Novo Tempo: Japeri!', statusDescription: '13º Lugar • 1ª Noite' },
      { rank: 14, night: '1ª Noite', schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares', enredo: 'A Cobra Vai Fumar!', relegated: true, statusDescription: '14º Lugar (1ª Noite) • Rebaixada para a Série Bronze' },
      { rank: 15, night: '1ª Noite', schoolId: 'academicos_de_jacarepagua', schoolName: 'Acadêmicos de Jacarepaguá', enredo: 'Quem Tem Sua Capa, Escapa!', relegated: true, statusDescription: '15º Lugar (1ª Noite) • Rebaixada para a Série Bronze' },
      { rank: 16, night: '1ª Noite', schoolId: 'arame_de_ricardo', schoolName: 'Arame de Ricardo', enredo: 'Quando Crescer, Quero Ser Criança. O Arame Te Ensina Brincando!!!', relegated: true, statusDescription: '16º Lugar (1ª Noite) • Rebaixada para a Série Bronze' }
    ],
    noite2: [
      { rank: 1, night: '2ª Noite', schoolId: 'tradicao', schoolName: 'Tradição', enredo: 'Trono Negro', promoted: true, statusDescription: 'Campeã Geral (1ª da 2ª Noite) • Subiu para a Série Ouro' },
      { rank: 2, night: '2ª Noite', schoolId: 'renascer_jacarepagua', schoolName: 'Renascer de Jacarepaguá', enredo: 'Ubuntu - Do Berço Ancestral, um Ideal Pra Mudar o Mundo', statusDescription: '2º Lugar • 2ª Noite' },
      { rank: 3, night: '2ª Noite', schoolId: 'tubarao_mesquita', schoolName: 'Tubarão de Mesquita', enredo: 'A Água de Nossos Rios Deságua Num Rio Maior!', statusDescription: '3º Lugar • 2ª Noite' },
      { rank: 4, night: '2ª Noite', schoolId: 'vila_santa_tereza', schoolName: 'Unidos da Vila Santa Tereza', enredo: 'Solange - Da minha, da sua e da nossa Morada do Samba', statusDescription: '4º Lugar • 2ª Noite' },
      { rank: 5, night: '2ª Noite', schoolId: 'jacarezinho', schoolName: 'Unidos do Jacarezinho', enredo: 'Na Fé dos Padroeiros, o Rio Pede Paz!', statusDescription: '5º Lugar • 2ª Noite' },
      { rank: 6, night: '2ª Noite', schoolId: 'independentes_olaria', schoolName: 'Independentes de Olaria', enredo: 'Ao Som do Chorinho Vou Sorrir... Serei Feliz, Bem Feliz!', statusDescription: '6º Lugar • 2ª Noite' },
      { rank: 7, night: '2ª Noite', schoolId: 'cubango', schoolName: 'Acadêmicos do Cubango', enredo: 'Os Pássaros da Noite e o Segredo das Criações', statusDescription: '7º Lugar • 2ª Noite' },
      { rank: 8, night: '2ª Noite', schoolId: 'engenho_da_rainha', schoolName: 'Acadêmicos do Engenho da Rainha', enredo: 'Rudá, a Criação do Mundo em um Conto de Amor', statusDescription: '8º Lugar • 2ª Noite' },
      { rank: 9, night: '2ª Noite', schoolId: 'abolicao', schoolName: 'Acadêmicos da Abolição', enredo: 'Axé Ngoma! A Festa do Batuque Ancestral!', statusDescription: '9º Lugar • 2ª Noite' },
      { rank: 10, night: '2ª Noite', schoolId: 'flor_da_mina', schoolName: 'Flor da Mina do Andaraí', enredo: 'Renascença Clube - Quilombo Urbano da Resistência Negra', statusDescription: '10º Lugar • 2ª Noite' },
      { rank: 11, night: '2ª Noite', schoolId: 'alegria_da_zona_sul', schoolName: 'Alegria da Zona Sul', enredo: 'Festa no Quilombo', statusDescription: '11º Lugar • 2ª Noite' },
      { rank: 12, night: '2ª Noite', schoolId: 'leao_de_nova_iguacu', schoolName: 'Leão de Nova Iguaçu', enredo: 'Festa de Preto', statusDescription: '12º Lugar • 2ª Noite' },
      { rank: 13, night: '2ª Noite', schoolId: 'concentra_imperial', schoolName: 'Concentra Imperial', enredo: 'Recreio... Sol, Mar e Folia', statusDescription: '13º Lugar • 2ª Noite' },
      { rank: 14, night: '2ª Noite', schoolId: 'academicos_do_dende', schoolName: 'Acadêmicos do Dendê', enredo: 'Na Beleza das Flores e no Brilho das Cores, Mulheres Guerreiras do Nosso Brasil', relegated: true, statusDescription: '14º Lugar (2ª Noite) • Rebaixada para a Série Bronze' },
      { rank: 15, night: '2ª Noite', schoolId: 'lins_imperial', schoolName: 'Lins Imperial', enredo: 'Jovelina, A Pérola Negra do Samba!', relegated: true, statusDescription: '15º Lugar (2ª Noite) • Rebaixada para a Série Bronze' },
      { rank: 16, night: '2ª Noite', schoolId: 'uniao_cruzmaltina', schoolName: 'Força Jovem (União Cruzmaltina)', enredo: 'São Januário, a Força de um povo', relegated: true, statusDescription: '16º Lugar (2ª Noite) • Rebaixada para a Série Bronze' }
    ]
  },
  2023: {
    noite1: [
      { rank: 1, night: '1ª Noite', league: 'Superliga', schoolId: 'marica', schoolName: 'União de Maricá', enredo: 'Eu sigo nordestino', promoted: true, statusDescription: 'Campeã Geral (1ª da 1ª Noite) • Subiu para a Série Ouro' },
      { rank: 2, night: '1ª Noite', league: 'Superliga', schoolId: 'parque_acari', schoolName: 'União do Parque Acari', enredo: 'Uma doce ilusão no mundo da imaginação', promoted: true, statusDescription: '2º Lugar (1ª Noite) • Melhor colocada geral • Subiu para a Série Ouro' },
      { rank: 3, night: '1ª Noite', league: 'Superliga', schoolId: 'rocinha', schoolName: 'Acadêmicos da Rocinha', enredo: 'As borboletas encantadas da bela Oyá', statusDescription: '3º Lugar • 1ª Noite (Superliga)' },
      { rank: 4, night: '1ª Noite', league: 'Superliga', schoolId: 'leao_de_nova_iguacu', schoolName: 'Leão de Nova Iguaçu', enredo: 'Orlando Orfei - O circo que vive em mim', statusDescription: '4º Lugar • 1ª Noite (Superliga)' },
      { rank: 5, night: '1ª Noite', league: 'Superliga', schoolId: 'santa_cruz', schoolName: 'Acadêmicos de Santa Cruz', enredo: 'Santa é minha Cruz. É luz da preservação. O meu canto é flecha certeira, para findar o pranto da devastação!', statusDescription: '5º Lugar • 1ª Noite (Superliga)' },
      { rank: 6, night: '1ª Noite', league: 'Superliga', schoolId: 'engenho_da_rainha', schoolName: 'Acadêmicos do Engenho da Rainha', enredo: 'O bem, Amado Jorge', statusDescription: '6º Lugar • 1ª Noite (Superliga)' },
      { rank: 7, night: '1ª Noite', league: 'Superliga', schoolId: 'unidos_de_lucas', schoolName: 'Unidos de Lucas', enredo: 'É ela... a maravilhosa Rainha do Samba', statusDescription: '7º Lugar • 1ª Noite (Superliga)' },
      { rank: 8, night: '1ª Noite', league: 'Superliga', schoolId: 'jacarezinho', schoolName: 'Unidos do Jacarezinho', enredo: 'Alô alô, algodão doce pra vocês!', statusDescription: '8º Lugar • 1ª Noite (Superliga)' },
      { rank: 9, night: '1ª Noite', league: 'Superliga', schoolId: 'vila_santa_tereza', schoolName: 'Unidos da Vila Santa Tereza', enredo: 'Santa Teresa, rogai por nós!', statusDescription: '9º Lugar • 1ª Noite (Superliga)' },
      { rank: 10, night: '1ª Noite', league: 'Superliga', schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares', enredo: 'Gosto que me enrosco. Caprichosamente vamos reviver', statusDescription: '10º Lugar • 1ª Noite (Superliga)' },
      { rank: 11, night: '1ª Noite', league: 'Superliga', schoolId: 'praca_da_bandeira', schoolName: 'Independente da Praça da Bandeira', enredo: 'Pindorama, da utopia das visões gerais do paraíso ao progresso da Terra Brasilis', statusDescription: '11º Lugar • 1ª Noite (Superliga)' },
      { rank: 12, night: '1ª Noite', league: 'Superliga', schoolId: 'abolicao', schoolName: 'Acadêmicos da Abolição', enredo: 'Bato tambor, logo existo". Luiz Antonio Simas - a essência e resistência da rua', statusDescription: '12º Lugar • 1ª Noite (Superliga)' },
      { rank: 13, night: '1ª Noite', league: 'Superliga', schoolId: 'academicos_de_jacarepagua', schoolName: 'Acadêmicos de Jacarepaguá', enredo: 'De Maria a Marias', statusDescription: '13º Lugar • 1ª Noite (Superliga)' },
      { rank: 14, night: '1ª Noite', league: 'Superliga', schoolId: 'academicos_do_peixe', schoolName: 'Acadêmicos do Peixe', enredo: 'Preto de berço, espoliação branca', relegated: true, statusDescription: '14º Lugar (1ª Noite • Superliga) • Rebaixada para a Série Bronze' },
      { rank: 15, night: '1ª Noite', league: 'Superliga', schoolId: 'rosa_de_ouro', schoolName: 'Rosa de Ouro', enredo: 'Inhame, a raiz do fundamento que me faz feliz! Sou popo, sou ouro, sou Costa do Marfim no Carnaval do Rio', relegated: true, statusDescription: '15º Lugar (1ª Noite • Superliga) • Rebaixada para a Série Bronze' },
      { rank: 16, night: '1ª Noite', league: 'Superliga', schoolId: 'raca_rubro_negra', schoolName: 'Raça Rubro-Negra', enredo: 'Raízes de uma raça', relegated: true, statusDescription: '16º Lugar (1ª Noite • Superliga) • Rebaixada para a Série Bronze' }
    ],
    noite2: [
      { rank: 1, night: '2ª Noite', league: 'Superliga', schoolId: 'sereno_campo_grande', schoolName: 'Sereno de Campo Grande', enredo: 'As três princesas turcas no Reino de Pindorama', promoted: true, statusDescription: 'Vice-Campeã Geral (1ª da 2ª Noite) • Subiu para a Série Ouro' },
      { rank: 2, night: '2ª Noite', league: 'Superliga', schoolId: 'renascer_jacarepagua', schoolName: 'Renascer de Jacarepaguá', enredo: 'O Afro-Brasil reluzente de Nei Lopes', statusDescription: '2º Lugar • 2ª Noite (Superliga)' },
      { rank: 3, night: '2ª Noite', league: 'Superliga', schoolId: 'santa_marta', schoolName: 'Mocidade Unida do Santa Marta', enredo: 'Cangaceiras - Mulé di resistência e coragem, nem o cangaço assutou, quando o sertão virou mar, o Morro da Santa sambou', statusDescription: '3º Lugar • 2ª Noite (Superliga)' },
      { rank: 4, night: '2ª Noite', league: 'Superliga', schoolId: 'botafogo_samba_clube', schoolName: 'Botafogo Samba Clube', enredo: 'Pelos trilhos da história: Engenho de Dentro de lutas, batuques e glórias', statusDescription: '4º Lugar • 2ª Noite (Superliga)' },
      { rank: 5, night: '2ª Noite', league: 'Superliga', schoolId: 'independentes_olaria', schoolName: 'Independentes de Olaria', enredo: 'Merìndílógún - A fala dos ancestrais', statusDescription: '5º Lugar • 2ª Noite (Superliga)' },
      { rank: 6, night: '2ª Noite', league: 'Superliga', schoolId: 'academicos_do_dende', schoolName: 'Acadêmicos do Dendê', enredo: 'Gosto que me enrosco!', statusDescription: '6º Lugar • 2ª Noite (Superliga)' },
      { rank: 7, night: '2ª Noite', league: 'Superliga', schoolId: 'imperio_da_uva', schoolName: 'Império da Uva', enredo: 'Laroyê, rainha das Marias', statusDescription: '7º Lugar • 2ª Noite (Superliga)' },
      { rank: 8, night: '2ª Noite', league: 'Superliga', schoolId: 'uniao_cruzmaltina', schoolName: 'União Cruzmaltina', enredo: 'Rodeia, rodeia... rodeia, meu Pai Santana, rodeia', statusDescription: '8º Lugar • 2ª Noite (Superliga)' },
      { rank: 9, night: '2ª Noite', league: 'Superliga', schoolId: 'flor_da_mina', schoolName: 'Flor da Mina do Andaraí', enredo: 'Obá Xirê', statusDescription: '9º Lugar • 2ª Noite (Superliga)' },
      { rank: 10, night: '2ª Noite', league: 'Superliga', schoolId: 'alegria_da_zona_sul', schoolName: 'Alegria da Zona Sul', enredo: 'Dorival Caymmi, o mar e o tempo nas areias de Copacabana', statusDescription: '10º Lugar • 2ª Noite (Superliga)' },
      { rank: 11, night: '2ª Noite', league: 'Superliga', schoolId: 'arame_de_ricardo', schoolName: 'Arame de Ricardo', enredo: 'Da Baixada para o Brasil, André Ceciliano! Nas estações do progresso pela união de um povo', statusDescription: '11º Lugar • 2ª Noite (Superliga)' },
      { rank: 12, night: '2ª Noite', league: 'Superliga', schoolId: 'arrastao_cascadura', schoolName: 'Arrastão de Cascadura', enredo: 'Sou caipira peregrino pirapora', statusDescription: '12º Lugar • 2ª Noite (Superliga)' },
      { rank: 13, night: '2ª Noite', league: 'Superliga', schoolId: 'cubango', schoolName: 'Acadêmicos do Cubango', enredo: 'Fruto da África no Brasil de fé: Candomblé', statusDescription: '13º Lugar • 2ª Noite (Superliga)' },
      { rank: 14, night: '2ª Noite', league: 'Superliga', schoolId: 'academicos_da_diversidade', schoolName: 'Acadêmicos da Diversidade', enredo: 'Umbanda - Diversidade é paz, amor e caridade!', relegated: true, statusDescription: '14º Lugar (2ª Noite • Superliga) • Rebaixada para a Série Bronze' },
      { rank: 15, night: '2ª Noite', league: 'Superliga', schoolId: 'curicica', schoolName: 'União do Parque Curicica', enredo: 'Pedro Scooby - Amante desse mar de gente da Curicica!', relegated: true, statusDescription: '15º Lugar (2ª Noite • Superliga) • Rebaixada para a Série Bronze' },
      { rank: 16, night: '2ª Noite', league: 'Superliga', schoolId: 'sao_cristovao', schoolName: 'Unidos de São Cristóvão', enredo: 'Águas de Oxalá', relegated: true, statusDescription: '16º Lugar (2ª Noite • Superliga) • Rebaixada para a Série Bronze' }
    ],
    livres: [
      { rank: 1, night: 'Grupo B', league: 'LIVRES', schoolId: 'vizinha_faladeira', schoolName: 'Vizinha Faladeira', enredo: 'Um passeio na Pequena África - A herança do meu Rio de Janeiro', statusDescription: 'Campeã LIVRES (Grupo B)' },
      { rank: 2, night: 'Grupo B', league: 'LIVRES', schoolId: 'tradicao', schoolName: 'Tradição', enredo: 'Filho da Águia, pai do Condor. Nésio Nascimento, o eterno gato mestre da Passarela', statusDescription: 'Vice-Campeã LIVRES (Grupo B)' },
      { rank: 3, night: 'Grupo B', league: 'LIVRES', schoolId: 'novo_imperio', schoolName: 'Novo Império', enredo: 'Cais do Valongo - De mar a mar, batalhas e glórias', statusDescription: '3º Lugar • LIVRES (Grupo B)' },
      { rank: 4, night: 'Grupo B', league: 'LIVRES', schoolId: 'academicos_da_pedra_branca', schoolName: 'Acadêmicos da Pedra Branca', enredo: "Aldeia Maraka'Ná: a universidade que existe e resiste", statusDescription: '4º Lugar • LIVRES (Grupo B)' },
      { rank: 5, night: 'Grupo B', league: 'LIVRES', schoolId: 'siri_de_ramos', schoolName: 'Siri de Ramos', enredo: 'Personalidade mulher', statusDescription: '5º Lugar • LIVRES (Grupo B)' },
      { rank: 6, night: 'Grupo B', league: 'LIVRES', schoolId: 'mensageiros_da_paz', schoolName: 'Mensageiros da Paz', enredo: 'Contos e resistência de um povo', statusDescription: '6º Lugar • LIVRES (Grupo B)' },
      { rank: 7, night: 'Grupo B', league: 'LIVRES', schoolId: 'garras_do_tigre', schoolName: 'Garras do Tigre', enredo: 'Belém do Pará - Um show de brasilidade', statusDescription: '7º Lugar • LIVRES (Grupo B)' },
      { rank: 8, night: 'Grupo B', league: 'LIVRES', schoolId: 'academia_niteroi_de_samba', schoolName: 'Academia Niterói de Samba', enredo: 'A alegria que renasce das cinzas', statusDescription: '8º Lugar • LIVRES (Grupo B)' }
    ]
  },
  2022: {
    noite1: [
      { rank: 1, night: '1ª Noite', league: 'Superliga', schoolId: 'arranco', schoolName: 'Arranco do Engenho de Dentro', enredo: 'Arranco anuncia Alceu Valença - O Rei do Frevo e do Maracatu', promoted: true, statusDescription: 'Vice-Campeã Geral (1ª da 1ª Noite) • Subiu para a Série Ouro' },
      { rank: 2, night: '1ª Noite', league: 'Superliga', schoolId: 'renascer_jacarepagua', schoolName: 'Renascer de Jacarepaguá', enredo: 'Jacarepaguá - Fábrica dos Sonhos', statusDescription: '2º Lugar • 1ª Noite (Superliga)' },
      { rank: 3, night: '1ª Noite', league: 'Superliga', schoolId: 'independentes_olaria', schoolName: 'Independentes de Olaria', enredo: 'Batuque pra Penha', statusDescription: '3º Lugar • 1ª Noite (Superliga)' },
      { rank: 4, night: '1ª Noite', league: 'Superliga', schoolId: 'imperio_da_uva', schoolName: 'Império da Uva', enredo: 'Andar com Fé eu Vou', statusDescription: '4º Lugar • 1ª Noite (Superliga)' },
      { rank: 5, night: '1ª Noite', league: 'Superliga', schoolId: 'sereno_campo_grande', schoolName: 'Sereno de Campo Grande', enredo: 'Se o Samba tem Mandinga, vem da África a nossa Ginga', statusDescription: '5º Lugar • 1ª Noite (Superliga)' },
      { rank: 6, night: '1ª Noite', league: 'Superliga', schoolId: 'praca_da_bandeira', schoolName: 'Independente da Praça da Bandeira', enredo: 'Dos Encantos do Capibaribe a Frevança Atual… Pernambuco Respira Diversidade Cultural', statusDescription: '6º Lugar • 1ª Noite (Superliga)' },
      { rank: 7, night: '1ª Noite', league: 'Superliga', schoolId: 'arame_de_ricardo', schoolName: 'Arame de Ricardo', enredo: 'Amor de Carnaval - O que passou, passou!', statusDescription: '7º Lugar • 1ª Noite (Superliga)' },
      { rank: 8, night: '1ª Noite', league: 'Superliga', schoolId: 'botafogo_samba_clube', schoolName: 'Botafogo Samba Clube', enredo: 'João Saldanha - Um apaixonado pela verdade caminhando em tempos de ilusão', statusDescription: '8º Lugar • 1ª Noite (Superliga)' },
      { rank: 9, night: '1ª Noite', league: 'Superliga', schoolId: 'raca_rubro_negra', schoolName: 'Raça Rubro-Negra', enredo: 'Aquarela Brasileira', statusDescription: '9º Lugar • 1ª Noite (Superliga)' },
      { rank: 10, night: '1ª Noite', league: 'Superliga', schoolId: 'academicos_da_diversidade', schoolName: 'Acadêmicos da Diversidade', enredo: 'Os Guardiões Indígenas da Floresta Natural, Salve Oxóssi e a Preservação Ambiental', statusDescription: '10º Lugar • 1ª Noite (Superliga)' },
      { rank: 11, night: '1ª Noite', league: 'Superliga', schoolId: 'dificil_e_o_nome', schoolName: 'Difícil é o Nome', enredo: 'Nobreza na Cor, Soberanas na Raça... Rainhas do Ventre da Humanidade', relegated: true, statusDescription: '11º Lugar (1ª Noite • Superliga) • Rebaixada para a Série Bronze' }
    ],
    noite2: [
      { rank: 1, night: '2ª Noite', league: 'Superliga', schoolId: 'uniao_de_jacarepagua', schoolName: 'União de Jacarepaguá', enredo: 'De Ventres Africanos, os Sonhos por Liberdade!', promoted: true, statusDescription: 'Campeã Geral (1ª da 2ª Noite) • Subiu para a Série Ouro' },
      { rank: 2, night: '2ª Noite', league: 'Superliga', schoolId: 'rocinha', schoolName: 'Acadêmicos da Rocinha', enredo: 'Eu sou o Samba, a Voz do Morro sou eu mesmo sim senhor: Carnaval e Samba, a mais bela Expressão Cultural de uma Raça', statusDescription: '2º Lugar • 2ª Noite (Superliga)' },
      { rank: 3, night: '2ª Noite', league: 'Superliga', schoolId: 'marica', schoolName: 'União de Maricá', enredo: 'A Revolução pela Alegria... uma Ópera Popular', statusDescription: '3º Lugar • 2ª Noite (Superliga)' },
      { rank: 4, night: '2ª Noite', league: 'Superliga', schoolId: 'jacarezinho', schoolName: 'Unidos do Jacarezinho', enredo: 'Ave, Ave Rainha Senhora da Berlinda', statusDescription: '4º Lugar • 2ª Noite (Superliga)' },
      { rank: 5, night: '2ª Noite', league: 'Superliga', schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares', enredo: 'Circo Brazuca', statusDescription: '5º Lugar • 2ª Noite (Superliga)' },
      { rank: 6, night: '2ª Noite', league: 'Superliga', schoolId: 'curicica', schoolName: 'União do Parque Curicica', enredo: 'Abayomis - O Encontro Precioso das Yas', statusDescription: '6º Lugar • 2ª Noite (Superliga)' },
      { rank: 7, night: '2ª Noite', league: 'Superliga', schoolId: 'vila_santa_tereza', schoolName: 'Unidos da Vila Santa Tereza', enredo: 'Obinrin Agbara, a Saga das Guerreiras', statusDescription: '7º Lugar • 2ª Noite (Superliga)' },
      { rank: 8, night: '2ª Noite', league: 'Superliga', schoolId: 'rosa_de_ouro', schoolName: 'Rosa de Ouro', enredo: 'Coroaci, a Terra do Sol', statusDescription: '8º Lugar • 2ª Noite (Superliga)' },
      { rank: 9, night: '2ª Noite', league: 'Superliga', schoolId: 'leao_de_nova_iguacu', schoolName: 'Leão de Nova Iguaçu', enredo: 'Dedé da Portela - Fez da Vida Poesia e Cantou sua Alegria em Tempo de Carnaval', statusDescription: '9º Lugar • 2ª Noite (Superliga)' },
      { rank: 10, night: '2ª Noite', league: 'Superliga', schoolId: 'parque_acari', schoolName: 'União do Parque Acari', enredo: 'A Coroa Imperiana nos Braços da Nação Acariense', statusDescription: '10º Lugar • 2ª Noite (Superliga)' },
      { rank: 11, night: '2ª Noite', league: 'Superliga', schoolId: 'alegria_da_zona_sul', schoolName: 'Alegria da Zona Sul', enredo: 'Até que Enfim... Aroldo Santos', statusDescription: '11º Lugar • 2ª Noite (Superliga)' },
      { rank: 12, night: '2ª Noite', league: 'Superliga', schoolId: 'abolicao', schoolName: 'Acadêmicos da Abolição', enredo: 'É Samba, é Popular. É Alex Escobar', statusDescription: '12º Lugar • 2ª Noite (Superliga)' },
      { rank: 13, night: '2ª Noite', league: 'Superliga', schoolId: 'villa_rica', schoolName: 'Unidos da Villa Rica', enredo: 'Caboclo - Bradou na Mata. Hoje é dia de festa. Traz o Axé dos seus irmãos. Viva o Povo da Floresta', relegated: true, statusDescription: '13º Lugar (2ª Noite • Superliga) • Rebaixada para a Série Bronze' },
      { rank: 14, night: '2ª Noite', league: 'Superliga', schoolId: 'unidos_da_vila_kennedy', schoolName: 'Unidos da Vila Kennedy', enredo: 'I Have a Dream... e os Sonhos de Liberdade', relegated: true, statusDescription: '14º Lugar (2ª Noite • Superliga) • Rebaixada para a Série Bronze' }
    ],
    livres: [
      { rank: 1, night: 'Grupo B', league: 'LIVRES', schoolId: 'engenho_da_rainha', schoolName: 'Acadêmicos do Engenho da Rainha', enredo: 'Punga, Crioula!', statusDescription: 'Campeã LIVRES (Grupo B)' },
      { rank: 2, night: 'Grupo B', league: 'LIVRES', schoolId: 'vizinha_faladeira', schoolName: 'Vizinha Faladeira', enredo: 'A Fórmula da Água', statusDescription: 'Vice-Campeã LIVRES (Grupo B)' },
      { rank: 3, night: 'Grupo B', league: 'LIVRES', schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', enredo: 'Deu a Louca na História! E agora Stanislaw, como é que fica?', statusDescription: '3º Lugar • LIVRES (Grupo B)' },
      { rank: 4, night: 'Grupo B', league: 'LIVRES', schoolId: 'unidos_de_lucas', schoolName: 'Unidos de Lucas', enredo: 'Festejando, eu mando a tristeza embora. A Unidos de Lucas é só alegria', statusDescription: '4º Lugar • LIVRES (Grupo B)' },
      { rank: 5, night: 'Grupo B', league: 'LIVRES', schoolId: 'sao_cristovao', schoolName: 'Unidos de São Cristóvão', enredo: 'Menino Silas', statusDescription: '5º Lugar • LIVRES (Grupo B)' },
      { rank: 6, night: 'Grupo B', league: 'LIVRES', schoolId: 'flor_da_mina', schoolName: 'Flor da Mina do Andaraí', enredo: 'Em Romaria a Juazeiro do Norte, a Flor da Mina do Andaraí vem pedir a benção a meu Padim Pade Ciço', statusDescription: '6º Lugar • LIVRES (Grupo B)' },
      { rank: 7, night: 'Grupo B', league: 'LIVRES', schoolId: 'imperadores_rubro_negros', schoolName: 'Imperadores Rubro-Negros', enredo: 'Olelé, Olelé: uma Herança do Continente Africano', statusDescription: '7º Lugar • LIVRES (Grupo B)' },
      { rank: 8, night: 'Grupo B', league: 'LIVRES', schoolId: 'chatuba', schoolName: 'Chatuba de Mesquita', enredo: 'Cortejo aos Reis do Congo', statusDescription: '8º Lugar • LIVRES (Grupo B)' },
      { rank: 9, night: 'Grupo B', league: 'LIVRES', schoolId: 'siri_de_ramos', schoolName: 'Siri de Ramos', enredo: 'Entre percussão, coração e a coroa que te rege, mestre Beto é nota 10!', statusDescription: '9º Lugar • LIVRES (Grupo B)' },
      { rank: 10, night: 'Grupo B', league: 'LIVRES', schoolId: 'feitico_carioca', schoolName: 'Feitiço Carioca', enredo: 'O Circo do Zé Povão: o Picadeiro Brasileiro', statusDescription: '10º Lugar • LIVRES (Grupo B)' }
    ]
  },
  2020: {
    liesb: [
      { rank: 1, night: 'LIESB', league: 'LIESB', schoolId: 'lins_imperial', schoolName: 'Lins Imperial', enredo: 'Pinah, a Soberana', promoted: true, statusDescription: 'Campeã (LIESB) • Subiu para a Série Ouro' },
      { rank: 2, night: 'LIESB', league: 'LIESB', schoolId: 'em_cima_da_hora', schoolName: 'Em Cima da Hora', enredo: 'Malandro - O Rei da Boêmia e o Barão da Ralé', promoted: true, statusDescription: 'Vice-Campeã (LIESB) • Subiu para a Série Ouro' },
      { rank: 3, night: 'LIESB', league: 'LIESB', schoolId: 'curicica', schoolName: 'União do Parque Curicica', enredo: 'Fulô de Maria', statusDescription: '3º Lugar • LIESB' },
      { rank: 4, night: 'LIESB', league: 'LIESB', schoolId: 'imperio_da_uva', schoolName: 'Império da Uva', enredo: 'Darcy Ribeiro - O Homem Muito Além do Seu Tempo', statusDescription: '4º Lugar • LIESB' },
      { rank: 5, night: 'LIESB', league: 'LIESB', schoolId: 'engenho_da_rainha', schoolName: 'Acadêmicos do Engenho da Rainha', enredo: 'De Roliúde ao Sertão - Luz, Câmera, Ação!', statusDescription: '5º Lugar • LIESB' },
      { rank: 6, night: 'LIESB', league: 'LIESB', schoolId: 'uniao_de_jacarepagua', schoolName: 'União de Jacarepaguá', enredo: 'A Brasilidade Feita à Mão', statusDescription: '6º Lugar • LIESB' },
      { rank: 7, night: 'LIESB', league: 'LIESB', schoolId: 'arranco', schoolName: 'Arranco', enredo: 'Gueledés - O Retrato da Alma', statusDescription: '7º Lugar • LIESB' },
      { rank: 8, night: 'LIESB', league: 'LIESB', schoolId: 'vila_santa_tereza', schoolName: 'Unidos da Vila Santa Tereza', enredo: 'No Saçarico da Intendente, a Vila Canta Rosa', statusDescription: '8º Lugar • LIESB' },
      { rank: 9, night: 'LIESB', league: 'LIESB', schoolId: 'parque_acari', schoolName: 'União do Parque Acari', enredo: 'No Início a Criação, o Céu, a Terra e o Mar, com Isso a Junção Cada Um com o Seu Par. Viva o Amor!', statusDescription: '9º Lugar • LIESB' },
      { rank: 10, night: 'LIESB', league: 'LIESB', schoolId: 'botafogo_samba_clube', schoolName: 'Botafogo Samba Clube', enredo: 'Seria Injusto não Falar de Você, Beth Carvalho. Esse É o Botafogo Que Eu Gosto!', statusDescription: '10º Lugar • LIESB' },
      { rank: 11, night: 'LIESB', league: 'LIESB', schoolId: 'unidos_da_vila_kennedy', schoolName: 'Unidos da Vila Kennedy', enredo: 'Um Rei à Bangu', statusDescription: '11º Lugar • LIESB' },
      { rank: 12, night: 'LIESB', league: 'LIESB', schoolId: 'dificil_e_o_nome', schoolName: 'Difícil é o Nome', enredo: 'As Vozes das Divindades na Proteção dos Ogãns', statusDescription: '12º Lugar • LIESB' },
      { rank: 13, night: 'LIESB', league: 'LIESB', schoolId: 'marica', schoolName: 'União de Maricá', enredo: 'Nos Tempos Idos', statusDescription: '13º Lugar • LIESB' },
      { rank: 14, night: 'LIESB', league: 'LIESB', schoolId: 'independentes_olaria', schoolName: 'Independentes de Olaria', enredo: 'O Acólito do Rei - As Memórias do Padre Perereca', statusDescription: '14º Lugar • LIESB' },
      { rank: 15, night: 'LIESB', league: 'LIESB', schoolId: 'jacarezinho', schoolName: 'Unidos do Jacarezinho', enredo: 'Do Professor ao Sucessor - Brilha o Passado e o Presente Azul e Branco', statusDescription: '15º Lugar • LIESB' },
      { rank: 16, night: 'LIESB', league: 'LIESB', schoolId: 'flor_da_mina', schoolName: 'Flor da Mina do Andaraí', enredo: 'O Clamor de Mandela', statusDescription: '16º Lugar • LIESB' },
      { rank: 17, night: 'LIESB', league: 'LIESB', schoolId: 'villa_rica', schoolName: 'Unidos da Villa Rica', enredo: 'Muito Prazer, Eu Sou o Samba', statusDescription: '17º Lugar • LIESB' },
      { rank: 18, night: 'LIESB', league: 'LIESB', schoolId: 'sereno_campo_grande', schoolName: 'Sereno de Campo Grande', enredo: 'Essa Noite Eu Vou Te Deixar no... Sereno', statusDescription: '18º Lugar • LIESB' },
      { rank: 19, night: 'LIESB', league: 'LIESB', schoolId: 'passa_regua', schoolName: 'Passa Régua', enredo: 'Porque Sou Homem das Ruas, Filho da Noite Estrelada', statusDescription: '19º Lugar • LIESB' },
      { rank: 20, night: 'LIESB', league: 'LIESB', schoolId: 'academicos_do_jardim_bangu', schoolName: 'Acadêmicos do Jardim Bangu', enredo: 'Da Mãe África aos Filhos do Brasil, a Força Ancestral que Atravessa Gerações', relegated: true, statusDescription: '20º Lugar (LIESB) • Rebaixada para a Série Bronze' }
    ],
    livres: [
      { rank: 1, night: 'Série B', league: 'LIVRES', schoolId: 'tradicao', schoolName: 'Tradição', enredo: 'Mãe Gentil, Seus Filhos Clamam Por Ti!', statusDescription: 'Campeã LIVRES (Série B)' },
      { rank: 2, night: 'Série B', league: 'LIVRES', schoolId: 'alegria_da_zona_sul', schoolName: 'Alegria da Zona Sul', enredo: 'Ypanema', statusDescription: 'Vice-Campeã LIVRES (Série B)' },
      { rank: 3, night: 'Série B', league: 'LIVRES', schoolId: 'unidos_de_lucas', schoolName: 'Unidos de Lucas', enredo: 'O Big Bang Tupiniquim Explode na Intendente!', statusDescription: '3º Lugar • LIVRES (Série B)' },
      { rank: 4, night: 'Série B', league: 'LIVRES', schoolId: 'siri_de_ramos', schoolName: 'Siri de Ramos', enredo: 'Ganga Zumba - A Dinastia de um Guerreiro', statusDescription: '4º Lugar • LIVRES (Série B)' },
      { rank: 5, night: 'Série B', league: 'LIVRES', schoolId: 'vizinha_faladeira', schoolName: 'Vizinha Faladeira', enredo: 'Aqui ou Acolá, Este É o Meu Lugar', statusDescription: '5º Lugar • LIVRES (Série B)' },
      { rank: 6, night: 'Série B', league: 'LIVRES', schoolId: 'arame_de_ricardo', schoolName: 'Arame de Ricardo', enredo: 'Sou Eu Quem Faz Você Sambar', statusDescription: '6º Lugar • LIVRES (Série B)' }
    ]
  }
};

export const OFFICIAL_PRATA_NOTES_BY_YEAR: Record<number, string> = {
  2026: 'Carnaval de 2026: Acadêmicos de Santa Cruz (Campeã) e São Clemente (Vice-Campeã) garantiram o acesso à Série Ouro. Império de Nova Iguaçu, União de Jacarepaguá, Siri de Ramos, Acadêmicos do Dendê, Independente da Praça da Bandeira, Chatuba de Mesquita, Vizinha Faladeira e Leão de Nova Iguaçu foram rebaixadas para a Série Bronze.',
  2025: 'Carnaval de 2025: O desfile foi realizado em três noites, com rebaixamento das duas últimas colocadas de cada noite (Concentra Imperial, Boi da Ilha do Governador, Unidos da Barra da Tijuca, Sereno de Campo Grande, Flor da Mina do Andaraí e Alegria de Copacabana). Unidos do Jacarezinho (Campeã) subiu à Série Ouro, e Acadêmicos da Rocinha desfilou como Hors concours.',
  2024: 'Carnaval de 2024: Desfile em duas noites (16 escolas por noite). Tradição (1ª da 2ª Noite • Campeã Geral) e Botafogo Samba Clube (1ª da 1ª Noite • Vice-Campeã Geral) conquistaram o acesso à Série Ouro. As três últimas de cada noite foram rebaixadas para a Série Bronze: Caprichosos de Pilares, Acadêmicos de Jacarepaguá e Arame de Ricardo (1ª Noite); Acadêmicos do Dendê, Lins Imperial e Força Jovem / União Cruzmaltina (2ª Noite).',
  2023: 'Carnaval de 2023: Houve dois desfiles competitivos — Superliga (em duas noites, com acesso à Série Ouro para União de Maricá como Campeã Geral, Sereno de Campo Grande como Vice-Campeã Geral e União do Parque Acari como melhor colocada geral, além do rebaixamento das três últimas de cada noite: Acadêmicos do Peixe, Rosa de Ouro, Raça Rubro-Negra, Acadêmicos da Diversidade, União do Parque Curicica e Unidos de São Cristóvão) e LIVRES (Grupo B, com título da Vizinha Faladeira e vice-campeonato da Tradição).',
  2022: 'Carnaval de 2022: Houve dois desfiles — Superliga (dividido em duas noites, com acesso à Série Ouro para União de Jacarepaguá como Campeã Geral e Arranco do Engenho de Dentro como Vice-Campeã Geral, além do rebaixamento de Difícil é o Nome, Unidos da Villa Rica e Unidos da Vila Kennedy para a Série Bronze) e LIVRES (Grupo B, com título da Acadêmicos do Engenho da Rainha e vice-campeonato da Vizinha Faladeira).',
  2021: 'Carnaval de 2021: Não houve desfiles da Série Prata na Estrada Intendente Magalhães em virtude da pandemia de COVID-19.',
  2020: 'Carnaval de 2020: Ocorreram dois desfiles — o primeiro organizado pela LIESB (com acesso à Série Ouro para a campeã Lins Imperial e a vice-campeã Em Cima da Hora, e rebaixamento da 20ª colocada Acadêmicos do Jardim Bangu para a Série Bronze) e o desfile da LIVRES denominado Série B (com título da Tradição e vice-campeonato da Alegria da Zona Sul).',
  2019: 'Carnaval de 2019: Acadêmicos de Vigário Geral foi a campeã e garantiu o acesso à Série Ouro (Série A), com União do Parque Curicica como vice-campeã. Não houve rebaixamento neste ano.',
  2018: 'Carnaval de 2018: Unidos da Ponte foi a campeã e garantiu o acesso à Série Ouro (Série A), com União do Parque Curicica como vice-campeã. Unidos do Cabuçu, Unidos das Vargens e Unidos do Jacarezinho foram rebaixadas para a Série Bronze.',
  2017: 'Carnaval de 2017: Unidos de Bangu foi a campeã e garantiu o acesso à Série Ouro (Série A), com Unidos do Cabuçu como vice-campeã. Leão de Nova Iguaçu, Caprichosos de Pilares, Favo de Acari e Mocidade Unida do Santa Marta foram rebaixadas para a Série Bronze.',
  2016: 'Carnaval de 2016: Acadêmicos do Sossego foi a campeã e garantiu o acesso à Série Ouro (Série A), com Tradição como vice-campeã. União de Jacarepaguá, Unidos de Lucas, Arranco e Unidos das Vargens foram rebaixadas para a Série Bronze.',
  2015: 'Carnaval de 2015: Acadêmicos da Rocinha foi a campeã e garantiu o acesso à Série Ouro (Série A), com Unidos do Jacarezinho como vice-campeã. Sereno de Campo Grande, Unidos da Vila Santa Tereza, Rosa de Ouro, Unidos da Vila Kennedy e Acadêmicos da Abolição foram rebaixadas para a Série Bronze.',
  2014: 'Carnaval de 2014: Unidos de Bangu foi a campeã e garantiu o acesso à Série Ouro (Série A), com Unidos do Cabuçu como vice-campeã. Império Rubro-Negro foi rebaixada para a Série Bronze.',
  2013: 'Carnaval de 2013: Em Cima da Hora foi a campeã e garantiu o acesso à Série Ouro (Série A), com Arranco como vice-campeã. Unidos da Villa Rica, Difícil é o Nome, Rosa de Ouro, Boi da Ilha do Governador e Mocidade de Vicente de Carvalho foram rebaixadas para a Série Bronze.',
  2012: 'Carnaval de 2012: Caprichosos de Pilares foi a campeã e Alegria da Zona Sul a vice-campeã. Não houve rebaixamento e as oito primeiras colocadas (Caprichosos de Pilares, Alegria da Zona Sul, Unidos de Padre Miguel, Sereno de Campo Grande, Tradição, União do Parque Curicica, Unidos da Vila Santa Tereza e União de Jacarepaguá) subiram para a Série Ouro junto com a campeã da Série Bronze de 2012, devido à reorganização da pirâmide do carnaval carioca com a adoção de duas noites de desfile na Série Ouro em 2013.',
  2011: 'Carnaval de 2011: Paraíso do Tuiuti foi a campeã e garantiu o acesso à Série Ouro (Grupo A), com União do Parque Curicica como vice-campeã. Acadêmicos do Sossego, Independente de São João de Meriti (Independente da Praça da Bandeira) e Lins Imperial foram rebaixadas para a Série Bronze.',
  2010: 'Carnaval de 2010: Alegria da Zona Sul foi a campeã e garantiu o acesso à Série Ouro (Grupo A), com Arranco como vice-campeã e empate em 3º lugar entre Sereno de Campo Grande e União do Parque Curicica. Unidos do Jacarezinho, Boi da Ilha do Governador e Flor da Mina do Andaraí foram rebaixadas para a Série Bronze.',
  2009: 'Carnaval de 2009: Acadêmicos do Cubango e Unidos de Padre Miguel empataram no 1º lugar, sagrando-se campeãs e garantindo acesso à Série Ouro (Grupo A), com União do Parque Curicica em 3º lugar. Independente da Praça da Bandeira, Arrastão de Cascadura e Corações Unidos do Amarelinho foram rebaixadas para a Série Bronze.',
  2008: 'Carnaval de 2008: Inocentes de Belford Roxo foi a campeã e Paraíso do Tuiuti a vice-campeã, ambas garantindo acesso à Série Ouro (Grupo A). Mocidade de Vicente de Carvalho, Vizinha Faladeira e Unidos de Lucas foram rebaixadas para a Série Bronze.',
  2007: 'Carnaval de 2007: Lins Imperial foi a campeã e garantiu o acesso à Série Ouro (Grupo A), com Inocentes de Belford Roxo como vice-campeã. Difícil é o Nome e Flor da Mina do Andaraí foram rebaixadas para a Série Bronze.',
  2006: 'Carnaval de 2006: Império da Tijuca foi a campeã e garantiu o acesso à Série Ouro (Grupo A), com Paraíso do Tuiuti como vice-campeã. Unidos da Ponte foi rebaixada para a Série Bronze.',
  2005: 'Carnaval de 2005: Estácio de Sá foi a campeã e Arranco a vice-campeã, ambas garantindo acesso à Série Ouro (Grupo A). Unidos do Jacarezinho, Leão de Nova Iguaçu e Mocidade de Vicente de Carvalho foram rebaixadas para a Série Bronze.',
  2004: 'Carnaval de 2004: Vizinha Faladeira foi a campeã e Renascer de Jacarepaguá a vice-campeã, ambas garantindo acesso à Série Ouro (Grupo A). Acadêmicos da Barra da Tijuca, União do Parque Curicica, Unidos do Cabuçu e Unidos da Villa Rica foram rebaixadas para a Série Bronze.',
  2003: 'Carnaval de 2003: Lins Imperial foi a campeã e Alegria da Zona Sul a vice-campeã, ambas garantindo acesso à Série Ouro (Grupo A). Em Cima da Hora e Acadêmicos do Sossego foram rebaixadas para a Série Bronze.',
  2002: 'Carnaval de 2002: Acadêmicos do Cubango foi a campeã e Inocentes da Baixada (Inocentes de Belford Roxo) a vice-campeã, ambas garantindo acesso à Série Ouro (Grupo A). Unidos do Cabuçu e Foliões de Botafogo foram rebaixadas para a Série Bronze.',
  2001: 'Carnaval de 2001: Acadêmicos da Rocinha foi a campeã e União de Jacarepaguá a vice-campeã, ambas garantindo acesso à Série Ouro (Grupo A). Unidos da Vila Kennedy e Difícil é o Nome foram rebaixadas para a Série Bronze.',
  2000: 'Carnaval de 2000: Leão de Nova Iguaçu foi a campeã e Unidos da Ponte a vice-campeã; também conquistaram acesso à Série Ouro (Grupo A) Unidos da Villa Rica (3ª) e Boi da Ilha do Governador (4ª). Acadêmicos do Sossego, Unidos de Lucas, Acadêmicos do Engenho da Rainha e Arrastão de Cascadura foram rebaixadas para a Série Bronze.',
  1999: 'Carnaval de 1999: Acadêmicos da Rocinha foi a campeã, Inocentes de Belford Roxo a vice-campeã e Paraíso do Tuiuti a 3ª colocada, todas garantindo acesso à Série Ouro (Grupo A). Vizinha Faladeira, Acadêmicos de Vigário Geral e Canários das Laranjeiras foram rebaixadas para a Série Bronze.',
  1998: 'Carnaval de 1998: Unidos do Jacarezinho foi a campeã, Unidos da Villa Rica a vice-campeã e Unidos do Cabuçu a 3ª colocada, todas garantindo acesso à Série Ouro (Grupo A). Acadêmicos do Dendê e Mocidade Unida do Santa Marta foram rebaixadas para a Série Bronze.',
  1997: 'Carnaval de 1997: Lins Imperial foi a campeã e Acadêmicos do Cubango a vice-campeã, ambas garantindo acesso à Série Ouro (Grupo A). Boi da Ilha do Governador, Difícil é o Nome, Mocidade de Vicente de Carvalho e Unidos de Lucas foram rebaixadas para a Série Bronze.',
  1996: 'Carnaval de 1996: Arranco foi a campeã e Acadêmicos do Dendê a vice-campeã, ambas garantindo acesso à Série Ouro (Grupo A). Leão de Nova Iguaçu, Acadêmicos da Abolição, Independentes de Cordovil e Mocidade Unida da Cidade de Deus foram rebaixadas para a Série Bronze.',
  1995: 'Carnaval de 1995: Não houve acesso para a Série Ouro em 1996 devido à reorganização dos grupos de acesso. As três primeiras colocadas — Acadêmicos do Dendê (Campeã), Acadêmicos de Vigário Geral (Vice-Campeã) e Acadêmicos da Abolição (3ª) — foram mantidas na Série Prata (Grupo B). Do 4º ao 8º lugar (Unidos da Vila Kennedy, Paraíso do Tuiuti, Boi da Ilha do Governador, Foliões de Botafogo e Mocidade Unida do Santa Marta) foram rebaixadas para a Série Bronze (Grupo C em 1996). Do 9º ao 14º lugar (Unidos do Campinho, Renascer de Jacarepaguá, União de Jacarepaguá, Império do Marangá, União de Rocha Miranda e Unidos de Manguinhos) e a Inocentes de Belford Roxo (que não desfilou) foram rebaixadas para o Grupo de Avaliação (Grupo D em 1996).',
  1994: 'Carnaval de 1994: Difícil é o Nome foi a campeã, Vizinha Faladeira a vice-campeã e Em Cima da Hora a 3ª colocada, todas garantindo acesso à Série Ouro (segunda divisão) em 1995. Além das três primeiras colocadas, a 8ª colocada Mocidade Unida da Cidade de Deus foi convidada para integrar a Série Ouro no ano seguinte. Não houve rebaixamento neste ano devido à reformulação dos grupos do carnaval a partir de 1995.',
  1993: 'Carnaval de 1993: Unidos da Villa Rica foi a campeã, Canários das Laranjeiras a vice-campeã e Independentes de Cordovil a 3ª colocada, todas garantindo acesso à Série Ouro (segunda divisão). Unidos da Vila Santa Tereza foi rebaixada para a Série Bronze.',
  1992: 'Carnaval de 1992: Arrastão de Cascadura foi a campeã, Acadêmicos do Cubango a vice-campeã e Mocidade Unida da Cidade de Deus a 3ª colocada, todas garantindo acesso à Série Ouro (segunda divisão). Unidos da Vila Kennedy e União de Vaz Lobo foram rebaixadas para a Série Bronze.',
  1991: 'Carnaval de 1991: Acadêmicos da Rocinha foi a campeã e Unidos do Campinho a vice-campeã, ambas garantindo acesso à Série Ouro (segunda divisão). União de Rocha Miranda foi rebaixada para a Série Bronze.'
};

/**
 * Retorna lista de carnavais históricos da Série Prata catalogados somados aos simulados no save
 */
export function getHistoricalPrataCarnavalsList(inGameHistory: YearHistory[] = []): PrataHistoricalCarnaval[] {
  const result: PrataHistoricalCarnaval[] = [];

  // Anos simulados in-game (> 2026)
  const inGameYears = inGameHistory
    .filter((h) => h.year > 2026 && h.prataStandings && h.prataStandings.length > 0)
    .sort((a, b) => b.year - a.year);

  inGameYears.forEach((h) => {
    const stands = h.prataStandings || [];
    const champs = stands.filter((s) => s.rank === 1).map((s) => s.schoolName);
    const vices = stands.filter((s) => s.rank === 2).map((s) => s.schoolName);
    const promoted = h.prataPromoted && h.prataPromoted.length > 0
      ? h.prataPromoted
      : h.prataChampion
      ? [h.prataChampion]
      : champs;
    const relegated = h.prataRelegated || [];

    result.push({
      year: h.year,
      standings: stands.map((s) => {
        const isPromoted =
          promoted.includes(s.schoolName) ||
          (s.schoolId ? promoted.includes(s.schoolId) : false) ||
          s.rank <= 2;
        const isRelegated =
          relegated.includes(s.schoolName) ||
          (s.schoolId ? relegated.includes(s.schoolId) : false);
        return {
          rank: s.rank,
          schoolId: s.schoolId || '',
          schoolName: s.schoolName,
          totalScore: s.totalScore,
          promoted: isPromoted,
          relegated: isRelegated,
          statusDescription:
            s.rank === 1
              ? 'Campeã • Subiu para a Série Ouro'
              : isPromoted
              ? 'Subiu para a Série Ouro'
              : isRelegated
              ? 'Rebaixada para a Série Bronze'
              : undefined
        };
      }),
      notes: `Série Prata simulada durante o save (Ano ${h.year}).`,
      championNames: champs,
      viceChampionNames: vices,
      promotedNames: promoted,
      relegatedNames: relegated,
      totalSchools: stands.length,
      isNoCarnaval: false
    });
  });

  // Anos oficiais catalogados (em ordem decrescente)
  const catalogedYears = Object.keys(OFFICIAL_PRATA_HISTORICAL_STANDINGS)
    .map(Number)
    .sort((a, b) => b - a);

  catalogedYears.forEach((yr) => {
    const stands = OFFICIAL_PRATA_HISTORICAL_STANDINGS[yr] || [];

    if (yr === 2021) {
      result.push({
        year: 2021,
        standings: [],
        notes: OFFICIAL_PRATA_NOTES_BY_YEAR[2021] || 'Carnaval de 2021: Não houve desfiles em 2021.',
        championNames: [],
        viceChampionNames: [],
        promotedNames: [],
        relegatedNames: [],
        totalSchools: 0,
        isNoCarnaval: true
      });
      return;
    }

    const champs = stands
      .filter((s) => s.rank === 1 && !s.isHorsConcours)
      .map((s) => (s.league === 'LIVRES' ? `${s.schoolName} (LIVRES)` : s.schoolName));
    const vices = stands
      .filter((s) => s.rank === 2 && !s.isHorsConcours)
      .map((s) => (s.league === 'LIVRES' ? `${s.schoolName} (LIVRES)` : s.schoolName));
    const promoted = stands.filter((s) => s.promoted).map((s) => s.schoolName);
    const relegated = stands.filter((s) => s.relegated).map((s) => s.schoolName);

    result.push({
      year: yr,
      standings: stands,
      subgroups: OFFICIAL_PRATA_HISTORICAL_SUBGROUPS[yr],
      notes: OFFICIAL_PRATA_NOTES_BY_YEAR[yr] || `Desfile Oficial da Série Prata de ${yr}`,
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
