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
    .replace(/^Clube Carnavalesco Escola de Samba\s+/i, '')
    .replace(/^G\.?R\.?E\.?S\.?V?\.?\s+/i, '')
    .replace(/^GRESV?\s+/i, '')
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
 * (Ex: "G.R.E.S." para a grande maioria, "C.C.E.S." para Canários das Laranjeiras).
 */
export function getSchoolDenomination(school: School): string {
  if (school.denomination) return school.denomination;
  if (school.id === 'canarios_laranjeiras') return 'C.C.E.S.';
  return 'G.R.E.S.';
}

/**
 * Obtém a denominação por extenso (Ex: "Grêmio Recreativo Escola de Samba" ou "Clube Carnavalesco Escola de Samba").
 */
export function getSchoolDenominationExtenso(school: School): string {
  const denom = getSchoolDenomination(school);
  if (denom === 'C.C.E.S.') {
    return 'Clube Carnavalesco Escola de Samba';
  }
  return 'Grêmio Recreativo Escola de Samba';
}

/**
 * Obtém a Razão Social / Nome de Registro completo da escola para exibição exclusiva no perfil.
 * (Ex: "G.R.E.S. Estação Primeira de Mangueira", "C.C.E.S. Canários das Laranjeiras").
 */
export function getSchoolCorporateName(school: School): string {
  if (school.corporateName) return school.corporateName;
  const denom = getSchoolDenomination(school);
  const clean = cleanSchoolName(school);
  if (denom === 'C.C.E.S.' || school.id === 'canarios_laranjeiras') {
    return `Clube Carnavalesco Escola de Samba ${clean}`;
  }
  return `${denom} ${clean}`;
}
