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
  ]
};

export const OFFICIAL_PRATA_HISTORICAL_SUBGROUPS: Record<
  number,
  { noite1?: PrataStandingRecord[]; noite2?: PrataStandingRecord[]; livres?: PrataStandingRecord[] }
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
  }
};

export const OFFICIAL_PRATA_NOTES_BY_YEAR: Record<number, string> = {
  2026: 'Carnaval de 2026: Acadêmicos de Santa Cruz (Campeã) e São Clemente (Vice-Campeã) garantiram o acesso à Série Ouro. Império de Nova Iguaçu, União de Jacarepaguá, Siri de Ramos, Acadêmicos do Dendê, Independente da Praça da Bandeira, Chatuba de Mesquita, Vizinha Faladeira e Leão de Nova Iguaçu foram rebaixadas para a Série Bronze.',
  2025: 'Carnaval de 2025: O desfile foi realizado em três noites, com rebaixamento das duas últimas colocadas de cada noite (Concentra Imperial, Boi da Ilha do Governador, Unidos da Barra da Tijuca, Sereno de Campo Grande, Flor da Mina do Andaraí e Alegria de Copacabana). Unidos do Jacarezinho (Campeã) subiu à Série Ouro, e Acadêmicos da Rocinha desfilou como Hors concours.',
  2024: 'Carnaval de 2024: Desfile em duas noites (16 escolas por noite). Tradição (1ª da 2ª Noite • Campeã Geral) e Botafogo Samba Clube (1ª da 1ª Noite • Vice-Campeã Geral) conquistaram o acesso à Série Ouro. As três últimas de cada noite foram rebaixadas para a Série Bronze: Caprichosos de Pilares, Acadêmicos de Jacarepaguá e Arame de Ricardo (1ª Noite); Acadêmicos do Dendê, Lins Imperial e Força Jovem / União Cruzmaltina (2ª Noite).',
  2023: 'Carnaval de 2023: Houve dois desfiles competitivos — Superliga (em duas noites, com acesso à Série Ouro para União de Maricá como Campeã Geral, Sereno de Campo Grande como Vice-Campeã Geral e União do Parque Acari como melhor colocada geral, além do rebaixamento das três últimas de cada noite: Acadêmicos do Peixe, Rosa de Ouro, Raça Rubro-Negra, Acadêmicos da Diversidade, União do Parque Curicica e Unidos de São Cristóvão) e LIVRES (Grupo B, com título da Vizinha Faladeira e vice-campeonato da Tradição).'
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
