import { School, StaffMember, YearHistory } from '../types/carnaval';
import { OFFICIAL_OURO_HISTORICAL_STANDINGS } from '../data/ouroHistoricalData';
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

/**
 * Linha do tempo oficial da nomenclatura da 2ª Divisão (atual Série Ouro)
 * e suas respectivas entidades organizadoras (1952–Presente).
 */
export const HISTORICAL_OURO_DIVISION_TIMELINE: TopDivisionMetadata[] = [
  {
    periodLabel: '1952–1961',
    startYear: 1952,
    endYear: 1961,
    divisionName: 'Desfile Intermediário / Campeonato',
    organizer: 'AESB',
    organizerFull: 'Associação das Escolas de Samba do Brasil (AESB)',
    badgeText: 'DESFILE INTERMEDIÁRIO / CAMPEONATO • AESB',
    notes: 'Criação da segunda divisão do Carnaval Carioca em 1952 sob organização da AESB, originalmente chamada de Desfile Intermediário ou Campeonato.'
  },
  {
    periodLabel: '1962–1978',
    startYear: 1962,
    endYear: 1978,
    divisionName: 'Grupo 2',
    organizer: 'AESEG',
    organizerFull: 'Associação das Escolas de Samba do Estado da Guanabara (AESEG)',
    badgeText: 'GRUPO 2 • AESEG',
    notes: 'A segunda divisão passa a se chamar Grupo 2 sob administração da AESEG durante o Estado da Guanabara e pós-fusão.'
  },
  {
    periodLabel: '1979–1986',
    startYear: 1979,
    endYear: 1986,
    divisionName: 'Grupo 1-B',
    organizer: 'AESCRJ',
    organizerFull: 'Associação das Escolas de Samba da Cidade do Rio de Janeiro (AESCRJ)',
    badgeText: 'GRUPO 1-B • AESCRJ',
    notes: 'Com a criação dos Grupos 1-A e 1-B pela AESCRJ, a divisão de acesso recebe o nome de Grupo 1-B e passa a desfilar no Sambódromo em 1984.'
  },
  {
    periodLabel: '1987–1989',
    startYear: 1987,
    endYear: 1989,
    divisionName: 'Grupo 2',
    organizer: 'AESCRJ',
    organizerFull: 'Associação das Escolas de Samba da Cidade do Rio de Janeiro (AESCRJ)',
    badgeText: 'GRUPO 2 • AESCRJ',
    notes: 'Retomada da nomenclatura Grupo 2 pela AESCRJ no triênio final da década de 1980.'
  },
  {
    periodLabel: '1990–1994',
    startYear: 1990,
    endYear: 1994,
    divisionName: 'Grupo A',
    organizer: 'AESCRJ',
    organizerFull: 'Associação das Escolas de Samba da Cidade do Rio de Janeiro (AESCRJ)',
    badgeText: 'GRUPO A • AESCRJ',
    notes: 'Em sintonia com a criação do Grupo Especial, a segunda divisão passa a se chamar Grupo A sob tutela da AESCRJ.'
  },
  {
    periodLabel: '1995',
    startYear: 1995,
    endYear: 1995,
    divisionName: 'Grupo A',
    organizer: 'LIESGA',
    organizerFull: 'Liga Independente das Escolas de Samba do Grupo A (LIESGA)',
    badgeText: 'GRUPO A • LIESGA',
    notes: 'Em 1995, o Grupo A foi administrado pela liga dissidente LIESGA em experiência isolada antes do retorno à AESCRJ.'
  },
  {
    periodLabel: '1996–2008',
    startYear: 1996,
    endYear: 2008,
    divisionName: 'Grupo A',
    organizer: 'AESCRJ',
    organizerFull: 'Associação das Escolas de Samba da Cidade do Rio de Janeiro (AESCRJ)',
    badgeText: 'GRUPO A • AESCRJ',
    notes: 'Retorno do Grupo A à administração da AESCRJ por treze carnavais consecutivos.'
  },
  {
    periodLabel: '2009–2012',
    startYear: 2009,
    endYear: 2012,
    divisionName: 'Grupo A',
    organizer: 'LESGA',
    organizerFull: 'Liga das Escolas de Samba do Grupo de Acesso (LESGA)',
    badgeText: 'GRUPO A • LESGA',
    notes: 'Criação da LESGA para organizar o Grupo A na Marquês de Sapucaí entre 2009 e 2012.'
  },
  {
    periodLabel: '2013–2020',
    startYear: 2013,
    endYear: 2020,
    divisionName: 'Série A',
    organizer: 'LIERJ',
    organizerFull: 'Liga das Escolas de Samba do Rio de Janeiro (LIERJ)',
    badgeText: 'SÉRIE A • LIERJ',
    notes: 'Rebranding da segunda divisão para Série A sob gestão da LIERJ, com desfiles na sexta e no sábado de Carnaval.'
  },
  {
    periodLabel: '2022–Presente',
    startYear: 2022,
    endYear: null,
    divisionName: 'Série Ouro',
    organizer: 'LIGA RJ',
    organizerFull: 'Liga Independente das Escolas de Samba do Rio de Janeiro (LIGA-RJ)',
    badgeText: 'SÉRIE OURO • LIGA RJ',
    notes: 'Consolidação da nomenclatura Série Ouro e fundação da LIGA-RJ após a paralisação pandêmica de 2021.'
  }
];

/**
 * Retorna a nomenclatura exata da 2ª divisão (Série Ouro) e o organizador oficial para determinado ano.
 */
export function getOuroDivisionMetadata(year: number): TopDivisionMetadata {
  if (year < 1952) {
    return {
      periodLabel: 'Pré-1952',
      startYear: 1932,
      endYear: 1951,
      divisionName: 'Segunda Divisão Inexistente',
      organizer: '—',
      organizerFull: 'Divisão de acesso criada apenas em 1952',
      badgeText: 'DIVISÃO CRIADA EM 1952',
      notes: 'Nos anos anteriores a 1952, todas as escolas competiam exclusivamente na divisão principal.'
    };
  }
  if (year === 2021) {
    return HISTORICAL_OURO_DIVISION_TIMELINE[HISTORICAL_OURO_DIVISION_TIMELINE.length - 1];
  }
  const found = HISTORICAL_OURO_DIVISION_TIMELINE.find(
    (entry) => year >= entry.startYear && (entry.endYear === null || year <= entry.endYear)
  );
  return found || HISTORICAL_OURO_DIVISION_TIMELINE[HISTORICAL_OURO_DIVISION_TIMELINE.length - 1];
}

/**
 * Rótulo curto da 2ª divisão + organizador para exibição em cards cronológicos e badges.
 */
export function getOuroDivisionDisplayLabel(year: number): string {
  if (year < 1952) return 'Divisão criada em 1952';
  const meta = getOuroDivisionMetadata(year);
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

/**
 * Catálogo histórico integral de carnavalescos campeões da 2ª divisão (Série Ouro) do Rio de Janeiro (1952–2026).
 * Registros marcados com `*` nos arquivos históricos (1952, 1953, 1955, 1956, 1960, 1961, 1963) permanecem
 * como 'unknown' sem atribuição artificial de autoria.
 */
export const OURO_CARNAVALESCOS_CAMPEOES_HISTORICO: ChampionCarnavalescoRecord[] = [
  { year: 1952, schoolId: 'unidos_do_indaia', schoolName: 'Unidos do Indaiá', carnavalescos: [], entryType: 'unknown', leagueOrRound: 'AESB', notes: 'Carnavalesco não registrado nos arquivos históricos (*).' },
  { year: 1953, schoolId: 'engenho_da_rainha', schoolName: 'Acadêmicos do Engenho da Rainha', carnavalescos: [], entryType: 'unknown', leagueOrRound: 'AESB', notes: 'Carnavalesco não registrado nos arquivos históricos (*).' },
  { year: 1954, schoolId: 'beija_flor', schoolName: 'Beija-Flor de Nilópolis', carnavalescos: ['Cabana'], entryType: 'individual', leagueOrRound: 'AESB' },
  { year: 1955, schoolId: 'coracoes_unidos_jacarepagua', schoolName: 'Corações Unidos de Jacarepaguá', carnavalescos: [], entryType: 'unknown', leagueOrRound: 'AESB', notes: 'Campeã empatada; carnavalesco não registrado nos arquivos históricos (*).' },
  { year: 1955, schoolId: 'paz_e_amor', schoolName: 'Paz e Amor', carnavalescos: [], entryType: 'unknown', leagueOrRound: 'AESB', notes: 'Campeã empatada; carnavalesco não registrado nos arquivos históricos (*).' },
  { year: 1956, schoolId: 'flor_do_lins', schoolName: 'Flor do Lins', carnavalescos: [], entryType: 'unknown', leagueOrRound: 'AESB', notes: 'Campeã empatada; carnavalesco não registrado nos arquivos históricos (*).' },
  { year: 1956, schoolId: 'uniao_do_centenario', schoolName: 'União do Centenário', carnavalescos: [], entryType: 'unknown', leagueOrRound: 'AESB', notes: 'Campeã empatada; carnavalesco não registrado nos arquivos históricos (*).' },
  { year: 1957, schoolId: 'unidos_de_bangu', schoolName: 'Unidos de Bangu', carnavalescos: ['Maza'], entryType: 'individual', leagueOrRound: 'AESB' },
  { year: 1958, schoolId: 'mocidade', schoolName: 'Mocidade Independente de Padre Miguel', carnavalescos: ['Ari de Lima'], entryType: 'individual', leagueOrRound: 'AESB' },
  { year: 1959, schoolId: 'unidos_padre_miguel', schoolName: 'Unidos de Padre Miguel', carnavalescos: ['Valter Monteiro'], entryType: 'individual', leagueOrRound: 'AESB' },
  { year: 1960, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares', carnavalescos: [], entryType: 'unknown', leagueOrRound: 'AESB', notes: 'Carnavalesco não registrado nos arquivos históricos (*).' },
  { year: 1961, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', carnavalescos: [], entryType: 'unknown', leagueOrRound: 'AESB', notes: 'Carnavalesco não registrado nos arquivos históricos (*).' },
  { year: 1962, schoolId: 'unidos_de_bangu', schoolName: 'Unidos de Bangu', carnavalescos: ['Darcy de Jesus'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1963, schoolId: 'unidos_da_capela', schoolName: 'Unidos da Capela', carnavalescos: [], entryType: 'unknown', leagueOrRound: 'AESEG', notes: 'Carnavalesco não registrado nos arquivos históricos (*).' },
  { year: 1964, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', carnavalescos: ['João Quadrado', 'Mário Pereira'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1965, schoolId: 'santa_cruz', schoolName: 'Acadêmicos de Santa Cruz', carnavalescos: ['Abílio Correia de Souza'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1966, schoolId: 'sao_clemente', schoolName: 'São Clemente', carnavalescos: ['Ivo Rocha Gomes'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1967, schoolId: 'estacio_de_sa', schoolName: 'Unidos de São Carlos (Estácio de Sá)', carnavalescos: ['José Coelho'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1968, schoolId: 'em_cima_da_hora', schoolName: 'Em Cima da Hora', carnavalescos: ['Ney Roriz'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1969, schoolId: 'santa_cruz', schoolName: 'Acadêmicos de Santa Cruz', carnavalescos: ['Wilson Paixão', 'Abílio Correia de Souza'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1970, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', carnavalescos: ['Jorge Melodia', 'Chicão'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1971, schoolId: 'em_cima_da_hora', schoolName: 'Em Cima da Hora', carnavalescos: ['Sebastião Souza de Oliveira'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1972, schoolId: 'tupy_bras_de_pina', schoolName: 'Tupy de Brás de Pina', carnavalescos: ['Jairo de Souza'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1973, schoolId: 'estacio_de_sa', schoolName: 'Unidos de São Carlos (Estácio de Sá)', carnavalescos: ['Walter Belisário'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1974, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador', carnavalescos: ['Mário Barcellos'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1975, schoolId: 'lins_imperial', schoolName: 'Lins Imperial', carnavalescos: ['José Félix'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1976, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', carnavalescos: ['Joãosinho Trinta'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1977, schoolId: 'arrastao_cascadura', schoolName: 'Arrastão de Cascadura', carnavalescos: ['Luiz Fernandes', 'Ricardo Aquino'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1978, schoolId: 'estacio_de_sa', schoolName: 'Unidos de São Carlos (Estácio de Sá)', carnavalescos: ['Roberto Nascimento', 'Célia de Oliveira', 'Beth Filipecki', 'Paulo Luís'], entryType: 'individual', leagueOrRound: 'AESEG' },
  { year: 1979, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', carnavalescos: ['Fernando Costa', 'Sílvio Cunha'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1980, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', carnavalescos: ['Renato Lage'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1981, schoolId: 'estacio_de_sa', schoolName: 'Unidos de São Carlos (Estácio de Sá)', carnavalescos: ['Ney Ayan', 'Gil Costa'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1982, schoolId: 'caprichosos_de_pilares', schoolName: 'Caprichosos de Pilares', carnavalescos: ['Luiz Fernando Reis'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1983, schoolId: 'estacio_de_sa', schoolName: 'Unidos de São Carlos (Estácio de Sá)', carnavalescos: ['Sílvio Cunha'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1984, schoolId: 'cabucu', schoolName: 'Unidos do Cabuçu', carnavalescos: ['Sidelson'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1985, schoolId: 'unidos_da_ponte', schoolName: 'Unidos da Ponte', carnavalescos: ['Geraldo Cavalcanti'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1986, schoolId: 'jacarezinho', schoolName: 'Unidos do Jacarezinho', carnavalescos: ['Flávio Tavares'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1987, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', carnavalescos: ['Sílvio Cunha'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1988, schoolId: 'arranco', schoolName: 'Arranco', carnavalescos: ['Carlinhos de Andrade', 'Roberto Costa', 'César Azevedo'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1989, schoolId: 'santa_cruz', schoolName: 'Acadêmicos de Santa Cruz', carnavalescos: ['José Félix'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1990, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro', carnavalescos: ['Max Lopes', 'Mauro Quintaes'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1991, schoolId: 'tradicao', schoolName: 'Tradição', carnavalescos: ['Jorge Luiz Vilela'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1992, schoolId: 'grande_rio', schoolName: 'Acadêmicos do Grande Rio', carnavalescos: ['Lucas Pinto', 'Sônia Regina'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1993, schoolId: 'tradicao', schoolName: 'Tradição', carnavalescos: ['Lícia Lacerda'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1994, schoolId: 'villa_rica', schoolName: 'Unidos da Villa Rica', carnavalescos: ['Antônio Sérgio', 'Maria José (Zezé)'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1995, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra', carnavalescos: ['Mauro Quintaes'], entryType: 'individual', leagueOrRound: 'LIESGA' },
  { year: 1996, schoolId: 'santa_cruz', schoolName: 'Acadêmicos de Santa Cruz', carnavalescos: ['Albeci Pereira'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1997, schoolId: 'tradicao', schoolName: 'Tradição', carnavalescos: ['Orlando Júnior'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1998, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', carnavalescos: ['João Luís de Moura'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 1999, schoolId: 'tijuca', schoolName: 'Unidos da Tijuca', carnavalescos: ['Oswaldo Jardim'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 2000, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', carnavalescos: ['Sílvio Cunha'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 2001, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra', carnavalescos: ['Cahê Rodrigues'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 2002, schoolId: 'santa_cruz', schoolName: 'Acadêmicos de Santa Cruz', carnavalescos: ['Fernando Alvarez'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 2003, schoolId: 'sao_clemente', schoolName: 'São Clemente', carnavalescos: ['Lane Santana'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 2004, schoolId: 'vila_isabel', schoolName: 'Unidos de Vila Isabel', carnavalescos: ['João Luís de Moura'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 2005, schoolId: 'rocinha', schoolName: 'Acadêmicos da Rocinha', carnavalescos: ['Alex de Souza'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 2006, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá', carnavalescos: ['Paulo Barros', 'Sandro Carvalho', 'Edgley Cunha'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 2007, schoolId: 'sao_clemente', schoolName: 'São Clemente', carnavalescos: ['Edward Moraes', 'Fábio Santos'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 2008, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', carnavalescos: ['Renato Lage', 'Márcia Lage'], entryType: 'individual', leagueOrRound: 'AESCRJ' },
  { year: 2009, schoolId: 'uniao_da_ilha', schoolName: 'União da Ilha do Governador', carnavalescos: ['Jack Vasconcelos'], entryType: 'individual', leagueOrRound: 'LESGA' },
  { year: 2010, schoolId: 'sao_clemente', schoolName: 'São Clemente', carnavalescos: ['Mauro Quintaes'], entryType: 'individual', leagueOrRound: 'LESGA' },
  { year: 2011, schoolId: 'renascer_jacarepagua', schoolName: 'Renascer de Jacarepaguá', carnavalescos: ['Edson Pereira', 'Paulo Barros'], entryType: 'individual', leagueOrRound: 'LESGA' },
  { year: 2012, schoolId: 'inocentes', schoolName: 'Inocentes de Belford Roxo', carnavalescos: ['Wagner Gonçalves'], entryType: 'individual', leagueOrRound: 'LESGA' },
  { year: 2013, schoolId: 'imperio_da_tijuca', schoolName: 'Império da Tijuca', carnavalescos: ['Júnior Pernambucano'], entryType: 'individual', leagueOrRound: 'LIERJ' },
  { year: 2014, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro', carnavalescos: ['João Vitor Araújo'], entryType: 'individual', leagueOrRound: 'LIERJ' },
  { year: 2015, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá', carnavalescos: ['Amauri Santos', 'Tarcísio Zanon'], entryType: 'individual', leagueOrRound: 'LIERJ' },
  { year: 2016, schoolId: 'tuiuti', schoolName: 'Paraíso do Tuiuti', carnavalescos: ['Jack Vasconcelos'], entryType: 'individual', leagueOrRound: 'LIERJ' },
  { year: 2017, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', carnavalescos: ['Marcus Ferreira'], entryType: 'individual', leagueOrRound: 'LIERJ' },
  { year: 2018, schoolId: 'viradouro', schoolName: 'Unidos do Viradouro', carnavalescos: ['Edson Pereira'], entryType: 'individual', leagueOrRound: 'LIERJ' },
  { year: 2019, schoolId: 'estacio_de_sa', schoolName: 'Estácio de Sá', carnavalescos: ['Tarcísio Zanon'], entryType: 'individual', leagueOrRound: 'LIERJ' },
  { year: 2020, schoolId: 'imperatriz', schoolName: 'Imperatriz Leopoldinense', carnavalescos: ['Leandro Vieira'], entryType: 'individual', leagueOrRound: 'LIERJ' },
  // 2021: Sem desfile oficial devido à pandemia de COVID-19
  { year: 2022, schoolId: 'imperio_serrano', schoolName: 'Império Serrano', carnavalescos: ['Leandro Vieira'], entryType: 'individual', leagueOrRound: 'LIGA RJ' },
  { year: 2023, schoolId: 'porto_da_pedra', schoolName: 'Unidos do Porto da Pedra', carnavalescos: ['Mauro Quintaes'], entryType: 'individual', leagueOrRound: 'LIGA RJ' },
  { year: 2024, schoolId: 'unidos_padre_miguel', schoolName: 'Unidos de Padre Miguel', carnavalescos: ['Edson Pereira', 'Lucas Milato'], entryType: 'individual', leagueOrRound: 'LIGA RJ' },
  { year: 2025, schoolId: 'niteroi', schoolName: 'Acadêmicos de Niterói', carnavalescos: ['Tiago Martins'], entryType: 'individual', leagueOrRound: 'LIGA RJ' },
  { year: 2026, schoolId: 'marica', schoolName: 'União de Maricá', carnavalescos: ['Leandro Vieira'], entryType: 'individual', leagueOrRound: 'LIGA RJ' }
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
  'silvio cunha': 'Sílvio Cunha',
  'joao quadrado': 'João Quadrado',
  'mario pereira': 'Mário Pereira',
  'abilio correia de souza': 'Abílio Correia de Souza',
  'jose coelho': 'José Coelho',
  'chicao': 'Chicão',
  'sebastiao souza de oliveira': 'Sebastião Souza de Oliveira',
  'walter belisario': 'Walter Belisário',
  'mario barcellos': 'Mário Barcellos',
  'jose felix': 'José Félix',
  'celia de oliveira': 'Célia de Oliveira',
  'paulo luis': 'Paulo Luís',
  'cesar azevedo': 'César Azevedo',
  'sonia regina': 'Sônia Regina',
  'antonio sergio': 'Antônio Sérgio',
  'maria jose (zeze)': 'Maria José (Zezé)',
  'orlando junior': 'Orlando Júnior',
  'joao luis de moura': 'João Luís de Moura',
  'cahe rodrigues': 'Cahê Rodrigues',
  'fabio santos': 'Fábio Santos',
  'marcia lage': 'Márcia Lage',
  'wagner goncalves': 'Wagner Gonçalves',
  'junior pernambucano': 'Júnior Pernambucano',
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
  divisionTier?: 'especial' | 'ouro';
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
      divisionTier: 'especial',
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
      divisionTier: 'especial',
      leagueOrRound: 'LIESA',
      isInGame: true
    };
  });
}

/**
 * Retorna os carnavalescos campeões da 2ª divisão (Série Ouro) para um ano específico (1952–2026 + anos simulados >= 2027).
 */
export function getOuroChampionCarnavalescosByYear(
  year: number,
  inGameHistory: YearHistory[] = [],
  schools: School[] = []
): YearChampionCarnavalescoInfo[] {
  const histRecords = OURO_CARNAVALESCOS_CAMPEOES_HISTORICO.filter((r) => r.year === year);
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
      divisionTier: 'ouro',
      leagueOrRound: r.leagueOrRound,
      notes: r.notes,
      isInGame: false
    }));
  }

  const simRecord = inGameHistory.find((h) => h.year === year);
  if (!simRecord || !simRecord.ouroStandings || simRecord.ouroStandings.length === 0) {
    return [];
  }

  const champStandings = simRecord.ouroStandings.filter((s) => s.rank === 1);
  if (champStandings.length === 0) return [];

  return champStandings.map((st) => {
    let names: string[] = [];
    if (simRecord.ouroChampionCarnavalescoNames && simRecord.ouroChampionCarnavalescoNames.length > 0) {
      names = simRecord.ouroChampionCarnavalescoNames.map(canonicalizeCarnavalescoName).filter(Boolean);
    } else if (simRecord.ouroChampionCarnavalesco) {
      names = simRecord.ouroChampionCarnavalesco
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
      divisionTier: 'ouro',
      leagueOrRound: 'LIGA RJ',
      isInGame: true
    };
  });
}

export type CarnavalescosRankingScope = 'especial' | 'ouro' | 'all';

export interface CarnavalescoTitleDetail {
  year: number;
  schoolId: string;
  schoolName: string;
  schoolColors?: { primary: string; secondary: string };
  enredo?: string;
  coCreators: string[];
  isSolo: boolean;
  divisionTier: 'especial' | 'ouro';
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
 * Resolve o enredo de uma escola em um determinado ano usando YearHistory, standings da Série Ouro ou school.enredoHistory.
 */
function resolveHistoricalEnredoForSchool(
  year: number,
  schoolId: string,
  schoolName: string,
  schoolsMap: Map<string, School>,
  inGameHistory: YearHistory[],
  divisionTier: 'especial' | 'ouro'
): string | undefined {
  const simYear = inGameHistory.find((h) => h.year === year);
  if (simYear?.schoolEnredos) {
    if (simYear.schoolEnredos[schoolId]) return simYear.schoolEnredos[schoolId];
    if (simYear.schoolEnredos[schoolName]) return simYear.schoolEnredos[schoolName];
  }
  if (divisionTier === 'ouro' && OFFICIAL_OURO_HISTORICAL_STANDINGS[year]) {
    const ouroRow = OFFICIAL_OURO_HISTORICAL_STANDINGS[year].find(
      (r) => r.schoolId === schoolId || r.schoolName.toLowerCase() === schoolName.toLowerCase()
    );
    if (ouroRow?.enredo) return ouroRow.enredo;
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
 * Calcula o Ranking Geral de Carnavalescos Campeões do Rio de Janeiro (1ª Divisão, Série Ouro ou Unificado).
 * Soma os registros históricos oficiais (até 2026) com todas as edições concluídas in-game (>= 2027).
 */
export function computeCarnavalescosRanking(
  schools: School[] = [],
  inGameHistory: YearHistory[] = [],
  scope: CarnavalescosRankingScope = 'especial'
): CarnavalescosRankingSummary {
  const schoolsMap = new Map<string, School>();
  schools.forEach((s) => schoolsMap.set(s.id, s));

  const allChampionRecords: YearChampionCarnavalescoInfo[] = [];

  if (scope === 'especial' || scope === 'all') {
    CARNAVALESCOS_CAMPEOES_HISTORICO.forEach((r) => {
      allChampionRecords.push({
        year: r.year,
        schoolId: r.schoolId,
        schoolName: r.schoolName,
        carnavalescos: r.carnavalescos.map(canonicalizeCarnavalescoName),
        displayLabel: r.carnavalescos.join(', '),
        entryType: r.entryType,
        divisionTier: 'especial',
        leagueOrRound: r.leagueOrRound,
        notes: r.notes,
        isInGame: false
      });
    });

    const simulatedEspecialYearsAdded = new Set<number>();
    inGameHistory.forEach((h) => {
      if (!h.year || h.year <= 2026 || simulatedEspecialYearsAdded.has(h.year)) return;
      const simEntries = getChampionCarnavalescosByYear(h.year, inGameHistory, schools);
      if (simEntries.length > 0) {
        simulatedEspecialYearsAdded.add(h.year);
        allChampionRecords.push(...simEntries);
      }
    });
  }

  if (scope === 'ouro' || scope === 'all') {
    OURO_CARNAVALESCOS_CAMPEOES_HISTORICO.forEach((r) => {
      allChampionRecords.push({
        year: r.year,
        schoolId: r.schoolId,
        schoolName: r.schoolName,
        carnavalescos: r.carnavalescos.map(canonicalizeCarnavalescoName),
        displayLabel: r.carnavalescos.join(', '),
        entryType: r.entryType,
        divisionTier: 'ouro',
        leagueOrRound: r.leagueOrRound,
        notes: r.notes,
        isInGame: false
      });
    });

    const simulatedOuroYearsAdded = new Set<number>();
    inGameHistory.forEach((h) => {
      if (!h.year || h.year <= 2026 || simulatedOuroYearsAdded.has(h.year)) return;
      const simEntries = getOuroChampionCarnavalescosByYear(h.year, inGameHistory, schools);
      if (simEntries.length > 0) {
        simulatedOuroYearsAdded.add(h.year);
        allChampionRecords.push(...simEntries);
      }
    });
  }

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
  const catalogedYearsSet = new Set<string>();

  allChampionRecords.forEach((rec) => {
    const tier: 'especial' | 'ouro' = rec.divisionTier === 'ouro' ? 'ouro' : 'especial';
    catalogedYearsSet.add(`${tier}::${rec.year}`);
    if (rec.entryType === 'unknown' || rec.carnavalescos.length === 0) {
      unregisteredRecordsCount += 1;
      return;
    }

    const divMeta =
      tier === 'ouro' ? getOuroDivisionMetadata(rec.year) : getTopDivisionMetadata(rec.year);
    const schoolObj =
      schoolsMap.get(rec.schoolId) ||
      schools.find((s) => cleanSchoolName(s).toLowerCase() === rec.schoolName.toLowerCase());
    const enredo = resolveHistoricalEnredoForSchool(
      rec.year,
      rec.schoolId,
      rec.schoolName,
      schoolsMap,
      inGameHistory,
      tier
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
      // Garante no máximo 1 título por edição+divisão+escola (evita duplicatas de PDF ou recontagem)
      const dedupeKey = `${tier}::${rec.year}::${rec.schoolId || rec.schoolName}::${rec.leagueOrRound || ''}`;
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
        divisionTier: tier,
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
