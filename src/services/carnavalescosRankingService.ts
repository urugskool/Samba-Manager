import { School, StaffMember, YearHistory } from '../types/carnaval';
import { cleanSchoolName } from '../utils/schoolNameUtils';

export interface TopDivisionMetadata {
  periodLabel: string;
  startYear: number;
  endYear: number | null; // null = presente
  divisionName: string;
  organizer: string;
  organizerFull: string;
  badgeText: string;
  notes: string;
}

/**
 * Linha do tempo oficial da nomenclatura da 1ª Divisão do Carnaval Carioca
 * e suas respectivas entidades organizadoras (1932–Presente).
 */
export const HISTORICAL_DIVISION_TIMELINE: TopDivisionMetadata[] = [
  {
    periodLabel: '1932–1934',
    startYear: 1932,
    endYear: 1934,
    divisionName: 'Pré-oficialização',
    organizer: 'Jornais Cariocas',
    organizerFull: 'Periódicos Cariocas (Mundo Sportivo, Diário Carioca, O País e A Hora)',
    badgeText: 'PRÉ-OFICIALIZAÇÃO • JORNAIS CARIOCAS',
    notes: 'Primeiros concursos competitivos de escolas de samba realizados na Praça Onze com patrocínio e organização da imprensa carioca.'
  },
  {
    periodLabel: '1935–1948',
    startYear: 1935,
    endYear: 1948,
    divisionName: 'Desfile Oficial',
    organizer: 'UGESB',
    organizerFull: 'União Geral das Escolas de Samba do Brasil (UGES / UGESB)',
    badgeText: 'DESFILE OFICIAL • UGESB',
    notes: 'Oficialização dos desfiles no calendário municipal pela UGES/UGESB com subvenção pública e regulamento unificado.'
  },
  {
    periodLabel: '1949–1951',
    startYear: 1949,
    endYear: 1951,
    divisionName: 'Oficiais e Não-oficiais',
    organizer: 'FBES, UCES e UGESB',
    organizerFull: 'FBES (Federação), UCES (União Cívica) e UGESB (União Geral)',
    badgeText: 'DESFILES PARALELOS • FBES / UCES / UGESB',
    notes: 'Período de cisão entre ligas paralelas (desfiles oficiais e não-oficiais) até a fusão institucional em 1952.'
  },
  {
    periodLabel: '1952–1961',
    startYear: 1952,
    endYear: 1961,
    divisionName: 'Supercampeonato',
    organizer: 'AESB',
    organizerFull: 'Associação das Escolas de Samba do Brasil (AESB)',
    badgeText: 'SUPERCAMPEONATO • AESB',
    notes: 'Unificação dos desfiles com a criação do Supercampeonato (1ª divisão) e do Campeonato (2ª divisão / atual Série Ouro) em 1952.'
  },
  {
    periodLabel: '1962–1978',
    startYear: 1962,
    endYear: 1978,
    divisionName: 'Grupo 1',
    organizer: 'AESEG',
    organizerFull: 'Associação das Escolas de Samba do Estado da Guanabara (AESEG)',
    badgeText: 'GRUPO 1 • AESEG',
    notes: 'Nomenclatura Grupo 1 sob administração da AESEG durante a existência do Estado da Guanabara e transição pós-fusão.'
  },
  {
    periodLabel: '1979–1984',
    startYear: 1979,
    endYear: 1984,
    divisionName: 'Grupo 1-A',
    organizer: 'AESCRJ',
    organizerFull: 'Associação das Escolas de Samba da Cidade do Rio de Janeiro (AESCRJ)',
    badgeText: 'GRUPO 1-A • AESCRJ',
    notes: 'Subdivisão do Grupo 1 com criação do Grupo 1-A na Marquês de Sapucaí, culminando na inauguração do Sambódromo em 1984.'
  },
  {
    periodLabel: '1985–1986',
    startYear: 1985,
    endYear: 1986,
    divisionName: 'Grupo 1-A',
    organizer: 'LIESA',
    organizerFull: 'Liga Independente das Escolas de Samba do Rio de Janeiro (LIESA)',
    badgeText: 'GRUPO 1-A • LIESA',
    notes: 'Primeiros carnavais sob administração da LIESA (fundada em 24 de julho de 1984), mantendo a nomenclatura Grupo 1-A.'
  },
  {
    periodLabel: '1987–1989',
    startYear: 1987,
    endYear: 1989,
    divisionName: 'Grupo 1',
    organizer: 'LIESA',
    organizerFull: 'Liga Independente das Escolas de Samba do Rio de Janeiro (LIESA)',
    badgeText: 'GRUPO 1 • LIESA',
    notes: 'Retomada do nome simplificado Grupo 1 pela LIESA no triênio que antecedeu a adoção definitiva de Grupo Especial.'
  },
  {
    periodLabel: '1990–Presente',
    startYear: 1990,
    endYear: null,
    divisionName: 'Grupo Especial',
    organizer: 'LIESA',
    organizerFull: 'Liga Independente das Escolas de Samba do Rio de Janeiro (LIESA)',
    badgeText: 'GRUPO ESPECIAL • LIESA',
    notes: 'Nomenclatura consolidada em 1990 que permanece vigente até os dias atuais para a elite do Carnaval Carioca.'
  }
];

/**
 * Retorna a nomenclatura exata da 1ª divisão e o organizador oficial para determinado ano.
 */
export function getTopDivisionMetadata(year: number): TopDivisionMetadata {
  const found = HISTORICAL_DIVISION_TIMELINE.find(
    (entry) => year >= entry.startYear && (entry.endYear === null || year <= entry.endYear)
  );
  return found || HISTORICAL_DIVISION_TIMELINE[HISTORICAL_DIVISION_TIMELINE.length - 1];
}

/**
 * Rótulo curto da divisão + organizador para exibição em cards cronológicos e badges.
 */
export function getTopDivisionDisplayLabel(year: number): string {
  const meta = getTopDivisionMetadata(year);
  if (year === 1932) return `${meta.divisionName} • Mundo Sportivo`;
  if (year === 1933) return `${meta.divisionName} • Jornais Cariocas`;
  if (year === 1934) return `${meta.divisionName} • O País / A Hora`;
  if (year === 1950) return `${meta.divisionName} • FBES / UCES / UGESB`;
  if (year === 1949 || year === 1951) return `${meta.divisionName} • FBES / UGESB`;
  if (year === 1984) return `${meta.divisionName} • AESCRJ (Sambódromo)`;
  return `${meta.divisionName} • ${meta.organizer}`;
}

export type CarnavalescoEntryType = 'individual' | 'institutional' | 'unknown';

export interface ChampionCarnavalescoRecord {
  year: number;
  schoolId: string;
  schoolName: string;
  carnavalescos: string[];
  entryType: CarnavalescoEntryType;
  leagueOrRound?: string;
  enredoOverride?: string;
  notes?: string;
}

/**
 * Catálogo histórico integral de carnavalescos campeões da 1ª divisão do Rio de Janeiro (1932–2026).
 * Sem duplicações de reimpressão (ex.: 1962, 2001) e contabilizando 1984 (Mangueira: Segunda + Supercampeonato)
 * como 1 conquista de carnavalesco na edição para Max Lopes.
 */
export const CARNAVALESCOS_CAMPEOES_HISTORICO: ChampionCarnavalescoRecord[] = [
  { year: 1932, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', carnavalescos: ['Sr. Armando'], entryType: 'individual', leagueOrRound: 'Mundo Sportivo' },
  { year: 1933, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', carnavalescos: ['Pedro Palheta', 'Maçu da Mangueira'], entryType: 'individual', leagueOrRound: 'Diário Carioca' },
  { year: 1934, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', carnavalescos: ['Sr. Armando'], entryType: 'individual', leagueOrRound: 'O País' },
  { year: 1934, schoolId: 'recreio_de_ramos', schoolName: 'Recreio de Ramos', carnavalescos: [], entryType: 'unknown', leagueOrRound: 'A Hora', notes: 'Carnavalesco não registrado nos arquivos históricos do concurso do jornal A Hora (**).' },
  { year: 1935, schoolId: 'portela', schoolName: 'Vai Como Pode (Portela)', carnavalescos: ['Antônio Caetano'], entryType: 'individual', leagueOrRound: 'UGESB' },
  { year: 1936, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', carnavalescos: ['Departamento de Carnaval'], entryType: 'institutional', leagueOrRound: 'UGESB' },
  { year: 1937, schoolId: 'vizinha_faladeira', schoolName: 'Vizinha Faladeira', carnavalescos: ['Irmãos Garido'], entryType: 'individual', leagueOrRound: 'UGESB', notes: 'Dupla dos Irmãos Garido' },
  // 1938: Sem apuração oficial devido às fortes chuvas
  { year: 1939, schoolId: 'portela', schoolName: 'Portela', carnavalescos: ['Paulo da Portela'], entryType: 'individual', leagueOrRound: 'UGESB' },
  { year: 1940, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', carnavalescos: ['Sr. Armando'], entryType: 'individual', leagueOrRound: 'UGESB' },
  { year: 1941, schoolId: 'portela', schoolName: 'Portela', carnavalescos: ['Paulo da Portela', 'Lino Manoel dos Reis'], entryType: 'individual', leagueOrRound: 'UGESB' },
  { year: 1942, schoolId: 'portela', schoolName: 'Portela', carnavalescos: ['Lino Manoel dos Reis'], entryType: 'individual', leagueOrRound: 'UGESB' },
  { year: 1943, schoolId: 'portela', schoolName: 'Portela', carnavalescos: ['Liga da Defesa Nacional'], entryType: 'institutional', leagueOrRound: 'UGESB' },
  { year: 1944, schoolId: 'portela', schoolName: 'Portela', carnavalescos: ['Liga da Defesa Nacional'], entryType: 'institutional', leagueOrRound: 'UGESB' },
  { year: 1945, schoolId: 'portela', schoolName: 'Portela', carnavalescos: ['Liga da Defesa Nacional'], entryType: 'institutional', leagueOrRound: 'UGESB' },
  { year: 1946, schoolId: 'portela', schoolName: 'Portela', carnavalescos: ['Lino Manoel dos Reis'], entryType: 'individual', leagueOrRound: 'UGESB' },
  { year: 1947, schoolId: 'portela', schoolName: 'Portela', carnavalescos: ['Euzébio', 'Lino Manoel dos Reis'], entryType: 'individual', leagueOrRound: 'UGESB' },
  { year: 1948, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', carnavalescos: ['Sebastião Molequinho', 'Eulália do Nascimento'], entryType: 'individual', leagueOrRound: 'UGESB' },
  { year: 1949, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', carnavalescos: ['Antônio Caetano'], entryType: 'individual', leagueOrRound: 'FBES' },
  { year: 1949, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', carnavalescos: ['Sr. Armando'], entryType: 'individual', leagueOrRound: 'UGESB' },
  { year: 1950, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', carnavalescos: ['Antônio Caetano'], entryType: 'individual', leagueOrRound: 'FBES' },
  { year: 1950, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', carnavalescos: ['Funcionários da Casa da Moeda'], entryType: 'institutional', leagueOrRound: 'UCES' },
  { year: 1950, schoolId: 'prazer_da_serrinha', schoolName: 'Prazer da Serrinha', carnavalescos: [], entryType: 'unknown', leagueOrRound: 'UGESB', notes: 'Carnavalesco não registrado nos arquivos do desfile da UGESB (*).' },
  { year: 1950, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', carnavalescos: [], entryType: 'unknown', leagueOrRound: 'UGESB', notes: 'Carnavalesco não registrado nos arquivos do desfile da UGESB (*).' },
  { year: 1951, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', carnavalescos: ['Frederico Ferreira'], entryType: 'individual', leagueOrRound: 'FBES' },
  { year: 1951, schoolId: 'portela', schoolName: 'Portela', carnavalescos: ['Lino Manoel dos Reis'], entryType: 'individual', leagueOrRound: 'UGESB' },
  // 1952: Sem julgamento oficial devido às chuvas (Supercampeonato AESB)
  { year: 1953, schoolId: 'portela', schoolName: 'Portela', carnavalescos: ['Lino Manoel dos Reis'], entryType: 'individual', leagueOrRound: 'AESB' },
  { year: 1954, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', carnavalescos: ['Funcionários da Casa da Moeda'], entryType: 'institutional', leagueOrRound: 'AESB' },
  { year: 1955, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', carnavalescos: ['Direção de Carnaval'], entryType: 'institutional', leagueOrRound: 'AESB' },
  { year: 1956, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', carnavalescos: ['Direção de Carnaval'], entryType: 'institutional', leagueOrRound: 'AESB' },
  { year: 1957, schoolId: 'portela', schoolName: 'Portela', carnavalescos: ['Djalma Vogue', 'Candeia', 'Joacir'], entryType: 'individual', leagueOrRound: 'AESB' },
  { year: 1958, schoolId: 'portela', schoolName: 'Portela', carnavalescos: ['Djalma Vogue'], entryType: 'individual', leagueOrRound: 'AESB' },
  { year: 1959, schoolId: 'portela', schoolName: 'Portela', carnavalescos: ['Djalma Vogue'], entryType: 'individual', leagueOrRound: 'AESB' },
  { year: 1960, schoolId: 'portela', schoolName: 'Portela', carnavalescos: ['Djalma Vogue'], entryType: 'individual', leagueOrRound: 'AESB' },
  { year: 1960, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', carnavalescos: ['Roberto Paulino', 'Darque Dias Moreira'], entryType: 'individual', leagueOrRound: 'AESB' },
  { year: 1960, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', carnavalescos: ['Fernando Pamplona', 'Arlindo Rodrigues', 'Newton de Sá'], entryType: 'individual', leagueOrRound: 'AESB' },
  { year: 1960, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', carnavalescos: ['João Moleque'], entryType: 'individual', leagueOrRound: 'AESB' },
  { year: 1960, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', carnavalescos: ['Direção de Carnaval'], entryType: 'institutional', leagueOrRound: 'AESB' },
  { year: 1961, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', carnavalescos: ['Roberto Paulino', 'Darque Dias Moreira'], entryType: 'individual', leagueOrRound: 'AESB' },
  { year: 1962, schoolId: 'portela', schoolName: 'Portela', carnavalescos: ['Nelson de Andrade'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1963, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', carnavalescos: ['Arlindo Rodrigues'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1964, schoolId: 'portela', schoolName: 'Portela', carnavalescos: ['Nelson de Andrade'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1965, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', carnavalescos: ['Arlindo Rodrigues', 'Fernando Pamplona'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1966, schoolId: 'portela', schoolName: 'Portela', carnavalescos: ['Nelson de Andrade'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1967, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', carnavalescos: ['Júlio Mattos'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1968, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', carnavalescos: ['Júlio Mattos'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1969, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', carnavalescos: ['Arlindo Rodrigues', 'Fernando Pamplona'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1970, schoolId: 'portela', schoolName: 'Portela', carnavalescos: ['Clóvis Bornay', 'Arnaldo Pederneiras'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1971, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', carnavalescos: ['Arlindo Rodrigues', 'Fernando Pamplona', 'Maria Augusta', 'Joãosinho Trinta'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1972, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', carnavalescos: ['Fernando Pinto'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1973, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', carnavalescos: ['Júlio Mattos'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1974, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', carnavalescos: ['Joãosinho Trinta', 'Maria Augusta'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1975, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', carnavalescos: ['Joãosinho Trinta'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1976, schoolId: 'beija_flor', schoolName: 'Beija-Flor', carnavalescos: ['Joãosinho Trinta'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1977, schoolId: 'beija_flor', schoolName: 'Beija-Flor', carnavalescos: ['Joãosinho Trinta'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1978, schoolId: 'beija_flor', schoolName: 'Beija-Flor', carnavalescos: ['Joãosinho Trinta'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1979, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', carnavalescos: ['Arlindo Rodrigues'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1980, schoolId: 'beija_flor', schoolName: 'Beija-Flor', carnavalescos: ['Joãosinho Trinta'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1980, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', carnavalescos: ['Arlindo Rodrigues'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1980, schoolId: 'portela', schoolName: 'Portela', carnavalescos: ['Viriato Ferreira'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1981, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', carnavalescos: ['Arlindo Rodrigues'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1982, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', carnavalescos: ['Rosa Magalhães', 'Lícia Lacerda'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1983, schoolId: 'beija_flor', schoolName: 'Beija-Flor', carnavalescos: ['Joãosinho Trinta'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1984, schoolId: 'portela', schoolName: 'Portela', carnavalescos: ['Edmundo Braga', 'Paulino Espírito Santo'], entryType: 'individual', leagueOrRound: 'Domingo (AESCRJ)' },
  { year: 1984, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', carnavalescos: ['Max Lopes'], entryType: 'individual', leagueOrRound: 'Segunda-Feira / Supercampeonato (AESCRJ)', notes: 'Campeã de Segunda-Feira e Supercampeã no Sábado das Campeãs (contabilizado como 1 título da edição 1984 para o carnavalesco).' },
  { year: 1985, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', carnavalescos: ['Fernando Pinto'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 1986, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', carnavalescos: ['Júlio Mattos'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 1987, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', carnavalescos: ['Júlio Mattos'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 1988, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', carnavalescos: ['Paulo César Cardoso', 'Milton Siqueira', 'Ilvamar Magalhães'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 1989, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', carnavalescos: ['Max Lopes'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 1990, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', carnavalescos: ['Renato Lage', 'Lilian Rabello'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 1991, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', carnavalescos: ['Renato Lage', 'Lilian Rabello'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 1992, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá', carnavalescos: ['Chico Spinoza', 'Mário Monteiro'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 1993, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', carnavalescos: ['Mário Borriello'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 1994, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', carnavalescos: ['Rosa Magalhães'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 1995, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', carnavalescos: ['Rosa Magalhães'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 1996, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', carnavalescos: ['Renato Lage'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 1997, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro', carnavalescos: ['Joãosinho Trinta'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 1998, schoolId: 'beija_flor', schoolName: 'Beija-Flor', carnavalescos: ['Cid Carvalho', 'Amarildo de Mello', 'Anderson Müller', 'Fran Sérgio', 'Ubiratan Silva', 'Nelson Ricardo', 'Paulo Führo', 'Victor Santos'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 1998, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', carnavalescos: ['Alexandre Louzada'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 1999, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', carnavalescos: ['Rosa Magalhães'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2000, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', carnavalescos: ['Rosa Magalhães'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2001, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', carnavalescos: ['Rosa Magalhães'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2002, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', carnavalescos: ['Max Lopes'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2003, schoolId: 'beija_flor', schoolName: 'Beija-Flor', carnavalescos: ['Laíla', 'Cid Carvalho', 'Fran Sérgio', 'Ubiratan Silva', 'Shangai'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2004, schoolId: 'beija_flor', schoolName: 'Beija-Flor', carnavalescos: ['Laíla', 'Cid Carvalho', 'Fran Sérgio', 'Ubiratan Silva', 'Shangai'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2005, schoolId: 'beija_flor', schoolName: 'Beija-Flor', carnavalescos: ['Laíla', 'Cid Carvalho', 'Fran Sérgio', 'Ubiratan Silva', 'Shangai'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2006, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', carnavalescos: ['Alexandre Louzada'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2007, schoolId: 'beija_flor', schoolName: 'Beija-Flor', carnavalescos: ['Laíla', 'Alexandre Louzada', 'Fran Sérgio', 'Ubiratan Silva', 'Shangai'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2008, schoolId: 'beija_flor', schoolName: 'Beija-Flor', carnavalescos: ['Laíla', 'Alexandre Louzada', 'Fran Sérgio', 'Ubiratan Silva', 'Shangai'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2009, schoolId: 'salgueiro', schoolName: 'Acadêmicos do Salgueiro', carnavalescos: ['Renato Lage'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2010, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', carnavalescos: ['Paulo Barros'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2011, schoolId: 'beija_flor', schoolName: 'Beija-Flor', carnavalescos: ['Laíla', 'Alexandre Louzada', 'Fran Sérgio', 'Ubiratan Silva', 'Victor Santos'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2012, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', carnavalescos: ['Paulo Barros'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2013, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', carnavalescos: ['Rosa Magalhães'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2014, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', carnavalescos: ['Paulo Barros'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2015, schoolId: 'beija_flor', schoolName: 'Beija-Flor', carnavalescos: ['Laíla', 'Fran Sérgio', 'Ubiratan Silva', 'Victor Santos', 'André Cezari', 'Bianca Behrends', 'Cláudio Russo'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2016, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', carnavalescos: ['Leandro Vieira'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2017, schoolId: 'portela', schoolName: 'Portela', carnavalescos: ['Paulo Barros'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2017, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', carnavalescos: ['Alexandre Louzada'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2018, schoolId: 'beija_flor', schoolName: 'Beija-Flor', carnavalescos: ['Laíla', 'Cid Carvalho', 'Victor Santos', 'Bianca Behrends', 'Rodrigo Pacheco', 'Léo Mídia'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2019, schoolId: 'mangueira', schoolName: 'Estação Primeira de Mangueira', carnavalescos: ['Leandro Vieira'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2020, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro', carnavalescos: ['Marcus Ferreira', 'Tarcísio Zanon'], entryType: 'individual', leagueOrRound: 'LIESA' },
  // 2021: Sem desfile oficial devido à pandemia de COVID-19
  { year: 2022, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio', carnavalescos: ['Gabriel Haddad', 'Leonardo Bora'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2023, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', carnavalescos: ['Leandro Vieira'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2024, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro', carnavalescos: ['Tarcísio Zanon'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2025, schoolId: 'beija_flor', schoolName: 'Beija-Flor', carnavalescos: ['João Vitor Araújo'], entryType: 'individual', leagueOrRound: 'LIESA' },
  { year: 2026, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro', carnavalescos: ['Tarcísio Zanon'], entryType: 'individual', leagueOrRound: 'LIESA' }
];

const CARNAVALESCO_ALIASES: Record<string, string> = {
  'tarcisio zanon': 'Tarcísio Zanon',
  'nelson de andrade': 'Nelson de Andrade',
  'joao vitor de araujo': 'João Vitor Araújo',
  'joao vitor araujo': 'João Vitor Araújo',
  'depertamento de carnaval': 'Departamento de Carnaval',
  'irmaos garido': 'Irmãos Garido',
  'mário borriello': 'Mário Borriello',
  'mario borriello': 'Mário Borriello',
  'mario monteiro': 'Mário Monteiro',
  'julio mattos': 'Júlio Mattos',
  'antonio caetano': 'Antônio Caetano',
  'sebastiao molequinho': 'Sebastião Molequinho',
  'eulalia do nascimento': 'Eulália do Nascimento',
  'joao moleque': 'João Moleque',
  'euzebio': 'Euzébio',
  'clovis bornay': 'Clóvis Bornay',
  'joaosinho trinta': 'Joãosinho Trinta',
  'licia lacerda': 'Lícia Lacerda',
  'paulo cesar cardoso': 'Paulo César Cardoso',
  'paulo fuhro': 'Paulo Führo',
  'anderson muller': 'Anderson Müller',
  'fran sergio': 'Fran Sérgio',
  'andre cezari': 'André Cezari',
  'claudio russo': 'Cláudio Russo',
  'leo midia': 'Léo Mídia',
  'laila': 'Laíla',
  'rosa magalhaes': 'Rosa Magalhães',
  'direcao de carnaval': 'Direção de Carnaval',
  'funcionarios da casa da moeda': 'Funcionários da Casa da Moeda',
  'liga da defesa nacional': 'Liga da Defesa Nacional'
};

function stripDiacritics(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function canonicalizeCarnavalescoName(rawName: string): string {
  const cleaned = rawName.trim().replace(/\s+/g, ' ');
  if (!cleaned) return '';
  const key = stripDiacritics(cleaned);
  return CARNAVALESCO_ALIASES[key] || cleaned;
}

/**
 * Extrai nomes individuais de um StaffMember (inclusive duplas separadas por "e", "&" ou vírgula).
 */
export function extractCarnavalescoNamesFromStaff(staffMember?: StaffMember | null): string[] {
  if (!staffMember?.name) return [];
  const raw = staffMember.name.trim();
  if (!raw || raw.toLowerCase() === 'comissão de carnaval') return [];

  const parts = raw
    .split(/\s*,\s*|\s+&\s+|\s+e\s+/)
    .map((p) => canonicalizeCarnavalescoName(p))
    .filter(Boolean);

  if (staffMember.isDupla && staffMember.partnerName) {
    const partnerParts = staffMember.partnerName
      .split(/\s*,\s*|\s+&\s+|\s+e\s+/)
      .map((p) => canonicalizeCarnavalescoName(p))
      .filter(Boolean);
    partnerParts.forEach((p) => {
      if (!parts.includes(p)) parts.push(p);
    });
  }

  return Array.from(new Set(parts));
}

export interface YearChampionCarnavalescoInfo {
  year: number;
  schoolId: string;
  schoolName: string;
  carnavalescos: string[];
  displayLabel: string;
  entryType: CarnavalescoEntryType;
  leagueOrRound?: string;
  notes?: string;
  isInGame?: boolean;
}

/**
 * Retorna os carnavalescos campeões da 1ª divisão para um ano específico (histórico 1932–2026 + anos simulados >= 2027).
 */
export function getChampionCarnavalescosByYear(
  year: number,
  inGameHistory: YearHistory[] = [],
  schools: School[] = []
): YearChampionCarnavalescoInfo[] {
  const histRecords = CARNAVALESCOS_CAMPEOES_HISTORICO.filter((r) => r.year === year);
  if (histRecords.length > 0 && year <= 2026) {
    return histRecords.map((r) => ({
      year: r.year,
      schoolId: r.schoolId,
      schoolName: r.schoolName,
      carnavalescos: r.carnavalescos,
      displayLabel:
        r.entryType === 'unknown'
          ? 'Não registrado'
          : r.carnavalescos.join(', '),
      entryType: r.entryType,
      leagueOrRound: r.leagueOrRound,
      notes: r.notes,
      isInGame: false
    }));
  }

  const simRecord = inGameHistory.find((h) => h.year === year);
  if (!simRecord || !simRecord.especialStandings || simRecord.especialStandings.length === 0) {
    return [];
  }

  const champStandings = simRecord.especialStandings.filter((s) => s.rank === 1);
  if (champStandings.length === 0) return [];

  return champStandings.map((st) => {
    let names: string[] = [];
    if (simRecord.especialChampionCarnavalescoNames && simRecord.especialChampionCarnavalescoNames.length > 0) {
      names = simRecord.especialChampionCarnavalescoNames.map(canonicalizeCarnavalescoName).filter(Boolean);
    } else if (simRecord.especialChampionCarnavalesco) {
      names = simRecord.especialChampionCarnavalesco
        .split(/\s*,\s*|\s+&\s+|\s+e\s+/)
        .map(canonicalizeCarnavalescoName)
        .filter(Boolean);
    } else {
      const matchedSchool = schools.find(
        (sch) =>
          (st.schoolId && sch.id === st.schoolId) ||
          cleanSchoolName(sch).toLowerCase() === st.schoolName.toLowerCase()
      );
      if (matchedSchool?.staff?.carnavalesco) {
        names = extractCarnavalescoNamesFromStaff(matchedSchool.staff.carnavalesco);
      }
    }

    return {
      year,
      schoolId: st.schoolId || '',
      schoolName: st.schoolName,
      carnavalescos: names,
      displayLabel: names.length > 0 ? names.join(', ') : 'Carnavalesco não registrado',
      entryType: names.length > 0 ? 'individual' : 'unknown',
      leagueOrRound: 'LIESA',
      isInGame: true
    };
  });
}

export interface CarnavalescoTitleDetail {
  year: number;
  schoolId: string;
  schoolName: string;
  schoolColors?: { primary: string; secondary: string };
  enredo?: string;
  coCreators: string[];
  isSolo: boolean;
  divisionName: string;
  organizer: string;
  leagueOrRound?: string;
  isInGame: boolean;
  note?: string;
}

export interface CarnavalescoRankingEntry {
  position: number;
  name: string;
  canonicalKey: string;
  entryType: 'individual' | 'institutional';
  totalTitles: number;
  soloTitles: number;
  sharedTitles: number;
  firstYear: number;
  lastYear: number;
  schools: { schoolId: string; schoolName: string; count: number; colors?: { primary: string; secondary: string } }[];
  titles: CarnavalescoTitleDetail[];
}

export interface CarnavalescosRankingSummary {
  entries: CarnavalescoRankingEntry[];
  totalCatalogedEditions: number;
  totalChampionRecords: number;
  unregisteredRecordsCount: number;
  leader: CarnavalescoRankingEntry | null;
}

/**
 * Resolve o enredo de uma escola em um determinado ano usando school.enredoHistory ou YearHistory.
 */
function resolveHistoricalEnredoForSchool(
  year: number,
  schoolId: string,
  schoolName: string,
  schoolsMap: Map<string, School>,
  inGameHistory: YearHistory[]
): string | undefined {
  const simYear = inGameHistory.find((h) => h.year === year);
  if (simYear?.schoolEnredos) {
    if (simYear.schoolEnredos[schoolId]) return simYear.schoolEnredos[schoolId];
    if (simYear.schoolEnredos[schoolName]) return simYear.schoolEnredos[schoolName];
  }
  const school = schoolsMap.get(schoolId) || Array.from(schoolsMap.values()).find(
    (s) => cleanSchoolName(s).toLowerCase() === schoolName.toLowerCase()
  );
  if (school?.enredoHistory) {
    const hit = school.enredoHistory.find((e) => e.year === year);
    if (hit?.enredo) return hit.enredo;
  }
  return undefined;
}

/**
 * Calcula o Ranking Geral de Carnavalescos Campeões da 1ª Divisão do Rio de Janeiro (1932–Presente).
 * Soma os registros históricos oficiais (1932–2026) com todas as edições concluídas in-game (>= 2027).
 */
export function computeCarnavalescosRanking(
  schools: School[] = [],
  inGameHistory: YearHistory[] = []
): CarnavalescosRankingSummary {
  const schoolsMap = new Map<string, School>();
  schools.forEach((s) => schoolsMap.set(s.id, s));

  // Unifica registros históricos (<= 2026) e simulados (> 2026)
  const allChampionRecords: YearChampionCarnavalescoInfo[] = CARNAVALESCOS_CAMPEOES_HISTORICO.map((r) => ({
    year: r.year,
    schoolId: r.schoolId,
    schoolName: r.schoolName,
    carnavalescos: r.carnavalescos.map(canonicalizeCarnavalescoName),
    displayLabel: r.carnavalescos.join(', '),
    entryType: r.entryType,
    leagueOrRound: r.leagueOrRound,
    notes: r.notes,
    isInGame: false
  }));

  const simulatedYearsAdded = new Set<number>();
  inGameHistory.forEach((h) => {
    if (!h.year || h.year <= 2026 || simulatedYearsAdded.has(h.year)) return;
    const simEntries = getChampionCarnavalescosByYear(h.year, inGameHistory, schools);
    if (simEntries.length > 0) {
      simulatedYearsAdded.add(h.year);
      allChampionRecords.push(...simEntries);
    }
  });

  const aggregator = new Map<
    string,
    {
      name: string;
      canonicalKey: string;
      entryType: 'individual' | 'institutional';
      titles: CarnavalescoTitleDetail[];
      seenEditionKeys: Set<string>;
    }
  >();

  let unregisteredRecordsCount = 0;
  const catalogedYearsSet = new Set<number>();

  allChampionRecords.forEach((rec) => {
    catalogedYearsSet.add(rec.year);
    if (rec.entryType === 'unknown' || rec.carnavalescos.length === 0) {
      unregisteredRecordsCount += 1;
      return;
    }

    const divMeta = getTopDivisionMetadata(rec.year);
    const schoolObj =
      schoolsMap.get(rec.schoolId) ||
      schools.find((s) => cleanSchoolName(s).toLowerCase() === rec.schoolName.toLowerCase());
    const enredo = resolveHistoricalEnredoForSchool(
      rec.year,
      rec.schoolId,
      rec.schoolName,
      schoolsMap,
      inGameHistory
    );

    const isSolo = rec.carnavalescos.length === 1;

    rec.carnavalescos.forEach((rawName) => {
      const canonicalName = canonicalizeCarnavalescoName(rawName);
      if (!canonicalName) return;
      const canonicalKey = stripDiacritics(canonicalName);

      if (!aggregator.has(canonicalKey)) {
        aggregator.set(canonicalKey, {
          name: canonicalName,
          canonicalKey,
          entryType: rec.entryType === 'institutional' ? 'institutional' : 'individual',
          titles: [],
          seenEditionKeys: new Set()
        });
      }

      const bucket = aggregator.get(canonicalKey)!;
      // Garante no máximo 1 título por edição+escola (evita duplicatas de PDF ou recontagem)
      const dedupeKey = `${rec.year}::${rec.schoolId || rec.schoolName}::${rec.leagueOrRound || ''}`;
      if (bucket.seenEditionKeys.has(dedupeKey)) return;
      bucket.seenEditionKeys.add(dedupeKey);

      const coCreators = rec.carnavalescos
        .map(canonicalizeCarnavalescoName)
        .filter((other) => stripDiacritics(other) !== canonicalKey);

      bucket.titles.push({
        year: rec.year,
        schoolId: rec.schoolId,
        schoolName: schoolObj ? cleanSchoolName(schoolObj) : rec.schoolName,
        schoolColors: schoolObj?.colors,
        enredo,
        coCreators,
        isSolo,
        divisionName: divMeta.divisionName,
        organizer: divMeta.organizer,
        leagueOrRound: rec.leagueOrRound,
        isInGame: Boolean(rec.isInGame),
        note: rec.notes
      });
    });
  });

  const unsortedEntries: Omit<CarnavalescoRankingEntry, 'position'>[] = Array.from(
    aggregator.values()
  ).map((bucket) => {
    const sortedTitles = [...bucket.titles].sort((a, b) => b.year - a.year);
    const soloTitles = sortedTitles.filter((t) => t.isSolo).length;
    const totalTitles = sortedTitles.length;
    const sharedTitles = totalTitles - soloTitles;
    const years = sortedTitles.map((t) => t.year);

    const schoolCounts = new Map<
      string,
      { schoolId: string; schoolName: string; count: number; colors?: { primary: string; secondary: string } }
    >();
    sortedTitles.forEach((t) => {
      const sKey = t.schoolId || t.schoolName;
      if (!schoolCounts.has(sKey)) {
        schoolCounts.set(sKey, {
          schoolId: t.schoolId,
          schoolName: t.schoolName,
          count: 0,
          colors: t.schoolColors
        });
      }
      schoolCounts.get(sKey)!.count += 1;
    });

    const schoolsList = Array.from(schoolCounts.values()).sort(
      (a, b) => b.count - a.count || a.schoolName.localeCompare(b.schoolName, 'pt-BR')
    );

    return {
      name: bucket.name,
      canonicalKey: bucket.canonicalKey,
      entryType: bucket.entryType,
      totalTitles,
      soloTitles,
      sharedTitles,
      firstYear: Math.min(...years),
      lastYear: Math.max(...years),
      schools: schoolsList,
      titles: sortedTitles
    };
  });

  unsortedEntries.sort((a, b) => {
    if (a.entryType !== b.entryType) {
      return a.entryType === 'individual' ? -1 : 1;
    }
    if (b.totalTitles !== a.totalTitles) return b.totalTitles - a.totalTitles;
    if (b.soloTitles !== a.soloTitles) return b.soloTitles - a.soloTitles;
    if (b.lastYear !== a.lastYear) return b.lastYear - a.lastYear;
    return a.name.localeCompare(b.name, 'pt-BR');
  });

  // Ranking posicional por totalTitles dentro de cada grupo ou geral ao ordenar individual+institucional
  const entries: CarnavalescoRankingEntry[] = unsortedEntries.map((entry, idx) => ({
    ...entry,
    position: idx + 1
  }));

  const individualLeader = entries.find((e) => e.entryType === 'individual') || null;

  return {
    entries,
    totalCatalogedEditions: catalogedYearsSet.size,
    totalChampionRecords: allChampionRecords.length,
    unregisteredRecordsCount,
    leader: individualLeader
  };
}
