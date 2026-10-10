import { School } from '../types/carnaval';

/**
 * Remove qualquer denominação (GRES, G.R.E.S., CCES, SRES, ACES, etc.) do nome da agremiação,
 * retornando apenas o nome completo oficial (Ex: "Estação Primeira de Mangueira", "Portela", "Arame de Ricardo").
 */
export function cleanSchoolName(nameOrSchool?: string | School | null): string {
  if (!nameOrSchool) return '';
  const name = typeof nameOrSchool === 'string' ? nameOrSchool : nameOrSchool.name || '';
  return name
    .replace(/^Grêmio Recreativo Escola de Samba\s+/i, '')
    .replace(/^Grêmio Recreativo Escola de Artes e Samba\s+/i, '')
    .replace(/^Grêmio Recreativo Escola de Artes\s+/i, '')
    .replace(/^Clube Carnavalesco Escola de Samba\s+/i, '')
    .replace(/^Associação Recreativista Escola de Samba\s+/i, '')
    .replace(/^Associação Recreativa Escola de Samba\s+/i, '')
    .replace(/^Sociedade Esportiva Recreativa Escola de Samba\s+/i, '')
    .replace(/^G\.?R\.?E\.?S\.?V?\.?\s+/i, '')
    .replace(/^GRESV?\s+/i, '')
    .replace(/^A\.?R\.?E\.?S\.?\s+/i, '')
    .replace(/^ARES\s+/i, '')
    .replace(/^S\.?E\.?R\.?E\.?S\.?\s+/i, '')
    .replace(/^SERES\s+/i, '')
    .replace(/^G\.?R\.?E\.?A\.?\s+/i, '')
    .replace(/^GREA\s+/i, '')
    .replace(/^G\.?R\.?C\.?E\.?S\.?\s+/i, '')
    .replace(/^GRCES\s+/i, '')
    .replace(/^C\.?C\.?E\.?S\.?\s+/i, '')
    .replace(/^CCES\s+/i, '')
    .replace(/^S\.?R\.?E\.?S\.?\s+/i, '')
    .replace(/^SRES\s+/i, '')
    .replace(/^A\.?C\.?E\.?S\.?\s+/i, '')
    .replace(/^ACES\s+/i, '')
    .replace(/^G\.?R\.?B\.?C\.?\s+/i, '')
    .replace(/^GRBC\s+/i, '')
    .trim();
}

/**
 * Obtém a denominação jurídica da agremiação para exibição exclusiva no perfil da escola
 * (Ex: "G.R.E.S." para a grande maioria, "C.C.E.S." para Canários das Laranjeiras e Flor da Mina, "A.R.E.S." para Vizinha Faladeira e Novo Império, "SERES" para Unidos do Cabuçu).
 */
export function getSchoolDenomination(school: School): string {
  if (school.denomination) return school.denomination;
  if (school.id === 'canarios_laranjeiras' || school.id === 'flor_da_mina') return 'C.C.E.S.';
  if (school.id === 'vizinha_faladeira' || school.id === 'novo_imperio') return 'A.R.E.S.';
  if (school.id === 'cabucu') return 'SERES';
  return 'G.R.E.S.';
}

/**
 * Obtém a denominação por extenso (Ex: "Grêmio Recreativo Escola de Samba" ou "Clube Carnavalesco Escola de Samba").
 */
export function getSchoolDenominationExtenso(school: School): string {
  const denom = getSchoolDenomination(school);
  if (denom === 'C.C.E.S.' || denom === 'CCES') {
    return 'Clube Carnavalesco Escola de Samba';
  }
  if (denom === 'G.R.E.A.' || denom === 'GREA') {
    return 'Grêmio Recreativo Escola de Artes';
  }
  if (denom === 'A.R.E.S.' || denom === 'ARES') {
    if (school.id === 'vizinha_faladeira') return 'Associação Recreativista Escola de Samba';
    return 'Associação Recreativa Escola de Samba';
  }
  if (denom === 'SERES' || denom === 'S.E.R.E.S.') {
    return 'Sociedade Esportiva Recreativa Escola de Samba';
  }
  return 'Grêmio Recreativo Escola de Samba';
}

/**
 * Obtém a Razão Social / Nome de Registro completo da escola para exibição exclusiva no perfil.
 * (Ex: "G.R.E.S. Estação Primeira de Mangueira", "A.R.E.S. Vizinha Faladeira", "SERES Unidos do Cabuçu").
 */
export function getSchoolCorporateName(school: School): string {
  if (school.corporateName) return school.corporateName;
  const denom = getSchoolDenomination(school);
  const clean = cleanSchoolName(school);
  if (denom === 'C.C.E.S.' || school.id === 'canarios_laranjeiras' || school.id === 'flor_da_mina') {
    return `Clube Carnavalesco Escola de Samba ${clean}`;
  }
  if (denom === 'A.R.E.S.') {
    if (school.id === 'vizinha_faladeira') return `A.R.E.S. ${clean}`;
    return `Associação Recreativa Escola de Samba ${clean}`;
  }
  if (denom === 'SERES') {
    return `SERES ${clean}`;
  }
  return `${denom} ${clean}`;
}
