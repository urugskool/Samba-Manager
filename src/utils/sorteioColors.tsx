import React from 'react';
import { DivisionId } from '../types/carnaval';
import { ParadeDay } from '../types/sorteio';

export type SorteioBallColorType = 'amarelo' | 'azul' | 'branca';

export interface SorteioBallConfig {
  color: SorteioBallColorType;
  colorName: string; // 'Amarela' | 'Azul' | 'Branca'
  nightDescription: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  sphereGradient: string;
  sphereShadow: string;
  numberBg: string;
  numberText: string;
  dotColor: string;
}

/**
 * Retorna a configuração oficial de cor da bola referente ao dia e divisão:
 * - Grupo Especial:
 *   - 1ª Noite (Domingo): Amarelo
 *   - 2ª Noite (Segunda): Azul
 *   - 3ª Noite (Terça): Branca
 * - Séries Ouro, Prata e Bronze:
 *   - 1ª Noite: Azul
 *   - 2ª Noite: Branca
 * - Grupo de Avaliação:
 *   - Noite Única (Quarta de Cinzas): Branca
 */
export function getSorteioBallConfig(division: DivisionId, day: ParadeDay): SorteioBallConfig {
  if (division === 'especial') {
    if (day === 'domingo') {
      return {
        color: 'amarelo',
        colorName: 'Amarela',
        nightDescription: '1ª Noite (Domingo)',
        badgeBg: 'bg-amber-500/20',
        badgeText: 'text-amber-300',
        badgeBorder: 'border-amber-500/40',
        sphereGradient: 'bg-gradient-to-br from-yellow-200 via-amber-400 to-amber-600',
        sphereShadow: 'shadow-[inset_-5px_-5px_10px_rgba(0,0,0,0.45),inset_5px_5px_10px_rgba(255,255,255,0.7),0_8px_20px_rgba(245,158,11,0.4)]',
        numberBg: 'bg-white',
        numberText: 'text-slate-950',
        dotColor: 'bg-amber-400'
      };
    } else if (day === 'segunda') {
      return {
        color: 'azul',
        colorName: 'Azul',
        nightDescription: '2ª Noite (Segunda-Feira)',
        badgeBg: 'bg-blue-500/20',
        badgeText: 'text-blue-300',
        badgeBorder: 'border-blue-500/40',
        sphereGradient: 'bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-800',
        sphereShadow: 'shadow-[inset_-5px_-5px_10px_rgba(0,0,0,0.55),inset_5px_5px_10px_rgba(255,255,255,0.55),0_8px_20px_rgba(37,99,235,0.45)]',
        numberBg: 'bg-white',
        numberText: 'text-blue-950',
        dotColor: 'bg-blue-400'
      };
    } else {
      // 'terca'
      return {
        color: 'branca',
        colorName: 'Branca',
        nightDescription: '3ª Noite (Terça-Feira)',
        badgeBg: 'bg-slate-200/20',
        badgeText: 'text-slate-100',
        badgeBorder: 'border-slate-300/40',
        sphereGradient: 'bg-gradient-to-br from-white via-slate-100 to-slate-300',
        sphereShadow: 'shadow-[inset_-5px_-5px_10px_rgba(0,0,0,0.3),inset_5px_5px_10px_rgba(255,255,255,0.9),0_8px_20px_rgba(255,255,255,0.25)] border border-slate-300',
        numberBg: 'bg-slate-900/10',
        numberText: 'text-slate-950',
        dotColor: 'bg-slate-200'
      };
    }
  }

  if (division === 'ouro') {
    if (day === 'sexta') {
      return {
        color: 'azul',
        colorName: 'Azul',
        nightDescription: '1ª Noite (Sexta-Feira)',
        badgeBg: 'bg-blue-500/20',
        badgeText: 'text-blue-300',
        badgeBorder: 'border-blue-500/40',
        sphereGradient: 'bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-800',
        sphereShadow: 'shadow-[inset_-5px_-5px_10px_rgba(0,0,0,0.55),inset_5px_5px_10px_rgba(255,255,255,0.55),0_8px_20px_rgba(37,99,235,0.45)]',
        numberBg: 'bg-white',
        numberText: 'text-blue-950',
        dotColor: 'bg-blue-400'
      };
    } else {
      return {
        color: 'branca',
        colorName: 'Branca',
        nightDescription: '2ª Noite (Sábado)',
        badgeBg: 'bg-slate-200/20',
        badgeText: 'text-slate-100',
        badgeBorder: 'border-slate-300/40',
        sphereGradient: 'bg-gradient-to-br from-white via-slate-100 to-slate-300',
        sphereShadow: 'shadow-[inset_-5px_-5px_10px_rgba(0,0,0,0.3),inset_5px_5px_10px_rgba(255,255,255,0.9),0_8px_20px_rgba(255,255,255,0.25)] border border-slate-300',
        numberBg: 'bg-slate-900/10',
        numberText: 'text-slate-950',
        dotColor: 'bg-slate-200'
      };
    }
  }

  if (division === 'prata') {
    if (day === 'segunda') {
      return {
        color: 'azul',
        colorName: 'Azul',
        nightDescription: '1ª Noite (Segunda-Feira)',
        badgeBg: 'bg-blue-500/20',
        badgeText: 'text-blue-300',
        badgeBorder: 'border-blue-500/40',
        sphereGradient: 'bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-800',
        sphereShadow: 'shadow-[inset_-5px_-5px_10px_rgba(0,0,0,0.55),inset_5px_5px_10px_rgba(255,255,255,0.55),0_8px_20px_rgba(37,99,235,0.45)]',
        numberBg: 'bg-white',
        numberText: 'text-blue-950',
        dotColor: 'bg-blue-400'
      };
    } else {
      return {
        color: 'branca',
        colorName: 'Branca',
        nightDescription: '2ª Noite (Terça-Feira)',
        badgeBg: 'bg-slate-200/20',
        badgeText: 'text-slate-100',
        badgeBorder: 'border-slate-300/40',
        sphereGradient: 'bg-gradient-to-br from-white via-slate-100 to-slate-300',
        sphereShadow: 'shadow-[inset_-5px_-5px_10px_rgba(0,0,0,0.3),inset_5px_5px_10px_rgba(255,255,255,0.9),0_8px_20px_rgba(255,255,255,0.25)] border border-slate-300',
        numberBg: 'bg-slate-900/10',
        numberText: 'text-slate-950',
        dotColor: 'bg-slate-200'
      };
    }
  }

  if (division === 'bronze') {
    if (day === 'sabado') {
      return {
        color: 'azul',
        colorName: 'Azul',
        nightDescription: '1ª Noite (Sábado)',
        badgeBg: 'bg-blue-500/20',
        badgeText: 'text-blue-300',
        badgeBorder: 'border-blue-500/40',
        sphereGradient: 'bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-800',
        sphereShadow: 'shadow-[inset_-5px_-5px_10px_rgba(0,0,0,0.55),inset_5px_5px_10px_rgba(255,255,255,0.55),0_8px_20px_rgba(37,99,235,0.45)]',
        numberBg: 'bg-white',
        numberText: 'text-blue-950',
        dotColor: 'bg-blue-400'
      };
    } else {
      return {
        color: 'branca',
        colorName: 'Branca',
        nightDescription: '2ª Noite (Domingo)',
        badgeBg: 'bg-slate-200/20',
        badgeText: 'text-slate-100',
        badgeBorder: 'border-slate-300/40',
        sphereGradient: 'bg-gradient-to-br from-white via-slate-100 to-slate-300',
        sphereShadow: 'shadow-[inset_-5px_-5px_10px_rgba(0,0,0,0.3),inset_5px_5px_10px_rgba(255,255,255,0.9),0_8px_20px_rgba(255,255,255,0.25)] border border-slate-300',
        numberBg: 'bg-slate-900/10',
        numberText: 'text-slate-950',
        dotColor: 'bg-slate-200'
      };
    }
  }

  // division === 'avaliacao'
  return {
    color: 'branca',
    colorName: 'Branca',
    nightDescription: 'Noite Única (Quarta-Feira de Cinzas)',
    badgeBg: 'bg-slate-200/20',
    badgeText: 'text-slate-100',
    badgeBorder: 'border-slate-300/40',
    sphereGradient: 'bg-gradient-to-br from-white via-slate-100 to-slate-300',
    sphereShadow: 'shadow-[inset_-5px_-5px_10px_rgba(0,0,0,0.3),inset_5px_5px_10px_rgba(255,255,255,0.9),0_8px_20px_rgba(255,255,255,0.25)] border border-slate-300',
    numberBg: 'bg-slate-900/10',
    numberText: 'text-slate-950',
    dotColor: 'bg-slate-200'
  };
}

interface SorteioBallProps {
  number: number;
  division: DivisionId;
  day: ParadeDay;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  className?: string;
}

export const SorteioBall: React.FC<SorteioBallProps> = ({
  number,
  division,
  day,
  size = 'md',
  showBadge = false,
  className = ''
}) => {
  const cfg = getSorteioBallConfig(division, day);

  const sizeClasses = {
    sm: 'w-7 h-7 text-[11px]',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 sm:w-28 sm:h-28 text-3xl sm:text-4xl'
  }[size];

  const innerCircleSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14 sm:w-16 sm:h-16'
  }[size];

  const highlightSizes = {
    sm: 'w-2 h-1 top-0.5 left-1',
    md: 'w-3 h-1.5 top-1 left-1.5',
    lg: 'w-5 h-2 top-1.5 left-2',
    xl: 'w-8 h-3.5 top-2.5 left-3.5'
  }[size];

  return (
    <div className={`inline-flex flex-col items-center justify-center gap-1.5 ${className}`}>
      {/* 3D Ball Sphere */}
      <div
        className={`relative rounded-full flex items-center justify-center shrink-0 transition-transform ${sizeClasses} ${cfg.sphereGradient} ${cfg.sphereShadow}`}
      >
        {/* Light glare / gloss highlight */}
        <div
          className={`absolute rounded-full bg-white/70 pointer-events-none blur-[0.6px] ${highlightSizes}`}
        />

        {/* Crisp Center Number Circle (Lotto / Bingo Ball Style) */}
        <div
          className={`rounded-full flex items-center justify-center font-black font-mono shadow-inner ${innerCircleSizes} ${cfg.numberBg} ${cfg.numberText}`}
        >
          {number}
        </div>
      </div>

      {showBadge && (
        <span
          className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${cfg.badgeBg} ${cfg.badgeText} ${cfg.badgeBorder} flex items-center gap-1 text-center`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotColor}`} />
          <span>Bola {cfg.colorName} • {number}º</span>
        </span>
      )}
    </div>
  );
};
