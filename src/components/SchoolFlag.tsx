import React from 'react';
import { School } from '../types/carnaval';

export type FlagPatternId =
  | 'raios_16'
  | 'raios_8'
  | 'raios_24'
  | 'raios_ondulados'
  | 'faixa_diagonal'
  | 'faixa_diagonal_dupla'
  | 'cruz'
  | 'losango'
  | 'faixas_horizontais'
  | 'faixas_verticais'
  | 'quatro_quadrantes'
  | 'bicolor_meio'
  | 'circulos_concentricos'
  | 'estrelas_espalhadas';

export type FlagEmblemStyle = 'circulo' | 'escudo' | 'losango' | 'coroa' | 'estrela' | 'nenhum';

export interface FlagDesignConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  pattern: FlagPatternId;
  emblemStyle: FlagEmblemStyle;
  symbolEmoji: string;
  symbolLabel?: string;
  abbreviation?: string;
  foundationYear?: number;
  schoolName?: string;
  denomination?: string;
  showBanner?: boolean;
  borderWidth?: number;
  patternOpacity?: number; // 0.2 a 1.0
  secondaryInEmblem?: boolean;
}

interface SchoolFlagProps {
  config: FlagDesignConfig;
  className?: string;
  compact?: boolean;
}

export const SchoolFlag: React.FC<SchoolFlagProps> = ({
  config,
  className = '',
  compact = false
}) => {
  const {
    primaryColor,
    secondaryColor,
    accentColor = '#f59e0b',
    pattern,
    emblemStyle,
    symbolEmoji,
    abbreviation = '',
    foundationYear,
    schoolName = '',
    denomination = 'G.R.E.S.',
    showBanner = true,
    patternOpacity = 0.55
  } = config;

  const renderPattern = () => {
    switch (pattern) {
      case 'raios_16':
        return (
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-300"
            style={{
              opacity: patternOpacity,
              background: `repeating-conic-gradient(from 0deg, ${secondaryColor} 0deg 11.25deg, transparent 11.25deg 22.5deg)`
            }}
          />
        );

      case 'raios_8':
        return (
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-300"
            style={{
              opacity: patternOpacity,
              background: `repeating-conic-gradient(from 0deg, ${secondaryColor} 0deg 22.5deg, transparent 22.5deg 45deg)`
            }}
          />
        );

      case 'raios_24':
        return (
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-300"
            style={{
              opacity: patternOpacity,
              background: `repeating-conic-gradient(from 0deg, ${secondaryColor} 0deg 7.5deg, transparent 7.5deg 15deg)`
            }}
          />
        );

      case 'raios_ondulados':
        return (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <g opacity={patternOpacity} fill={secondaryColor}>
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <path
                  key={deg}
                  d="M 50 50 Q 60 25, 75 0 L 85 0 Q 65 25, 50 50 Z"
                  transform={`rotate(${deg} 50 50)`}
                />
              ))}
            </g>
          </svg>
        );

      case 'faixa_diagonal':
        return (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon
              points="0,85 100,0 100,20 0,100"
              fill={secondaryColor}
              opacity={patternOpacity}
            />
            {accentColor && (
              <>
                <line x1="0" y1="85" x2="100" y2="0" stroke={accentColor} strokeWidth="1.5" opacity="0.8" />
                <line x1="0" y1="100" x2="100" y2="20" stroke={accentColor} strokeWidth="1.5" opacity="0.8" />
              </>
            )}
          </svg>
        );

      case 'faixa_diagonal_dupla':
        return (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="0,65 100,0 100,12 0,77" fill={secondaryColor} opacity={patternOpacity} />
            <polygon points="0,88 100,23 100,35 0,100" fill={secondaryColor} opacity={patternOpacity} />
          </svg>
        );

      case 'cruz':
        return (
          <div className="absolute inset-0 pointer-events-none">
            {/* Faixa Horizontal */}
            <div
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1/4"
              style={{ backgroundColor: secondaryColor, opacity: patternOpacity }}
            />
            {/* Faixa Vertical */}
            <div
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1/4"
              style={{ backgroundColor: secondaryColor, opacity: patternOpacity }}
            />
            {accentColor && (
              <>
                <div
                  className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[30%] pointer-events-none border-y"
                  style={{ borderColor: accentColor, opacity: 0.7 }}
                />
                <div
                  className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[30%] pointer-events-none border-x"
                  style={{ borderColor: accentColor, opacity: 0.7 }}
                />
              </>
            )}
          </div>
        );

      case 'losango':
        return (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon
              points="50,6 94,50 50,94 6,50"
              fill={secondaryColor}
              opacity={patternOpacity}
              stroke={accentColor || '#ffffff'}
              strokeWidth="1.2"
            />
          </svg>
        );

      case 'faixas_horizontais':
        return (
          <div className="absolute inset-0 flex flex-col pointer-events-none">
            <div className="flex-1" style={{ backgroundColor: primaryColor }} />
            <div className="flex-1" style={{ backgroundColor: secondaryColor, opacity: patternOpacity }} />
            <div className="flex-1" style={{ backgroundColor: primaryColor }} />
          </div>
        );

      case 'faixas_verticais':
        return (
          <div className="absolute inset-0 flex pointer-events-none">
            <div className="flex-1" style={{ backgroundColor: secondaryColor, opacity: patternOpacity }} />
            <div className="flex-1" style={{ backgroundColor: primaryColor }} />
            <div className="flex-1" style={{ backgroundColor: secondaryColor, opacity: patternOpacity }} />
          </div>
        );

      case 'quatro_quadrantes':
        return (
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
            <div style={{ backgroundColor: primaryColor }} />
            <div style={{ backgroundColor: secondaryColor, opacity: patternOpacity }} />
            <div style={{ backgroundColor: secondaryColor, opacity: patternOpacity }} />
            <div style={{ backgroundColor: primaryColor }} />
          </div>
        );

      case 'bicolor_meio':
        return (
          <div className="absolute inset-0 flex pointer-events-none">
            <div className="w-1/2" style={{ backgroundColor: primaryColor }} />
            <div className="w-1/2" style={{ backgroundColor: secondaryColor, opacity: patternOpacity }} />
          </div>
        );

      case 'circulos_concentricos':
        return (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke={secondaryColor} strokeWidth="6" opacity={patternOpacity} />
            <circle cx="50" cy="50" r="28" fill="none" stroke={secondaryColor} strokeWidth="4" opacity={patternOpacity * 0.8} />
            {accentColor && (
              <circle cx="50" cy="50" r="35" fill="none" stroke={accentColor} strokeWidth="1.5" opacity="0.7" />
            )}
          </svg>
        );

      case 'estrelas_espalhadas':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
              { top: '15%', left: '15%', size: 'text-sm' },
              { top: '15%', right: '15%', size: 'text-sm' },
              { bottom: '25%', left: '18%', size: 'text-sm' },
              { bottom: '25%', right: '18%', size: 'text-sm' },
              { top: '48%', left: '8%', size: 'text-xs' },
              { top: '48%', right: '8%', size: 'text-xs' },
              { top: '8%', left: '50%', size: 'text-xs' }
            ].map((st, i) => (
              <div
                key={i}
                className={`absolute -translate-x-1/2 ${st.size}`}
                style={{
                  top: st.top,
                  left: st.left,
                  right: st.right,
                  color: accentColor || secondaryColor,
                  opacity: patternOpacity
                }}
              >
                ★
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const renderEmblem = () => {
    if (emblemStyle === 'nenhum') {
      return (
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-2 drop-shadow-lg">
          <span className={compact ? 'text-2xl' : 'text-3xl sm:text-4xl'}>
            {symbolEmoji}
          </span>
          {abbreviation && (
            <span
              className="text-[9px] font-black uppercase tracking-wider font-mono mt-0.5"
              style={{ color: secondaryColor }}
            >
              {abbreviation}
            </span>
          )}
        </div>
      );
    }

    // Estilos de Moldura Central (Círculo, Escudo, Losango, Coroa, Estrela)
    const baseEmblemClass = compact
      ? 'w-16 h-16'
      : 'w-24 h-24 sm:w-28 sm:h-28';

    if (emblemStyle === 'losango') {
      return (
        <div className={`relative z-10 ${baseEmblemClass} flex items-center justify-center`}>
          <div
            className="absolute inset-0 rotate-45 border-4 shadow-2xl transition-transform hover:rotate-[50deg] duration-300"
            style={{
              backgroundColor: secondaryColor,
              borderColor: accentColor || primaryColor
            }}
          />
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-1">
            <span className={compact ? 'text-2xl' : 'text-3xl sm:text-4xl drop-shadow'}>
              {symbolEmoji}
            </span>
            <span
              className="text-[9px] font-black uppercase tracking-wider font-mono line-clamp-1 mt-0.5"
              style={{ color: primaryColor }}
            >
              {abbreviation || 'SAMBA'}
            </span>
            {foundationYear && !compact && (
              <span className="text-[8px] font-bold text-slate-800">
                {foundationYear}
              </span>
            )}
          </div>
        </div>
      );
    }

    if (emblemStyle === 'escudo') {
      return (
        <div
          className={`relative z-10 ${baseEmblemClass} rounded-b-3xl rounded-t-lg border-4 shadow-2xl flex flex-col items-center justify-center text-center p-2 transition-transform hover:scale-105 duration-300`}
          style={{
            backgroundColor: secondaryColor,
            borderColor: accentColor || primaryColor
          }}
        >
          <span className={compact ? 'text-2xl' : 'text-3xl sm:text-4xl drop-shadow'}>
            {symbolEmoji}
          </span>
          <span
            className="text-[9px] font-black uppercase tracking-wider font-mono line-clamp-1 mt-0.5"
            style={{ color: primaryColor }}
          >
            {abbreviation || 'SAMBA'}
          </span>
          {foundationYear && !compact && (
            <span className="text-[8px] font-bold text-slate-800">
              {foundationYear}
            </span>
          )}
        </div>
      );
    }

    if (emblemStyle === 'coroa') {
      return (
        <div
          className={`relative z-10 ${baseEmblemClass} rounded-full border-4 shadow-2xl flex flex-col items-center justify-center text-center p-2 relative`}
          style={{
            backgroundColor: secondaryColor,
            borderColor: accentColor || primaryColor
          }}
        >
          <div
            className="absolute -top-3.5 text-base drop-shadow-md"
            style={{ color: accentColor }}
          >
            👑
          </div>
          <span className={compact ? 'text-2xl' : 'text-3xl sm:text-4xl drop-shadow'}>
            {symbolEmoji}
          </span>
          <span
            className="text-[9px] font-black uppercase tracking-wider font-mono line-clamp-1 mt-0.5"
            style={{ color: primaryColor }}
          >
            {abbreviation || 'SAMBA'}
          </span>
          {foundationYear && !compact && (
            <span className="text-[8px] font-bold text-slate-800">
              {foundationYear}
            </span>
          )}
        </div>
      );
    }

    if (emblemStyle === 'estrela') {
      return (
        <div
          className={`relative z-10 ${baseEmblemClass} rounded-full border-4 shadow-2xl flex flex-col items-center justify-center text-center p-2 ring-4 ring-offset-1`}
          style={{
            backgroundColor: secondaryColor,
            borderColor: accentColor || primaryColor
          }}
        >
          <span className={compact ? 'text-2xl' : 'text-3xl sm:text-4xl drop-shadow'}>
            {symbolEmoji}
          </span>
          <span
            className="text-[9px] font-black uppercase tracking-wider font-mono line-clamp-1 mt-0.5"
            style={{ color: primaryColor }}
          >
            {abbreviation || 'SAMBA'}
          </span>
          {foundationYear && !compact && (
            <span className="text-[8px] font-bold text-slate-800">
              {foundationYear}
            </span>
          )}
        </div>
      );
    }

    // Default: Círculo Clássico
    return (
      <div
        className={`relative z-10 ${baseEmblemClass} rounded-full border-4 shadow-2xl flex flex-col items-center justify-center text-center p-2 transition-transform hover:scale-105 duration-300`}
        style={{
          backgroundColor: secondaryColor,
          borderColor: accentColor || primaryColor
        }}
      >
        <span className={compact ? 'text-2xl' : 'text-3xl sm:text-4xl drop-shadow'}>
          {symbolEmoji}
        </span>
        <span
          className="text-[9px] font-black uppercase tracking-wider font-mono line-clamp-1 mt-0.5"
          style={{ color: primaryColor }}
        >
          {abbreviation || 'SAMBA'}
        </span>
        {foundationYear && !compact && (
          <span className="text-[8px] font-bold text-slate-800">
            {foundationYear}
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      className={`relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border-2 flex items-center justify-center p-4 transition-all duration-300 select-none ${className}`}
      style={{
        backgroundColor: primaryColor,
        borderColor: accentColor || '#ffffff'
      }}
    >
      {/* Padrão / Traçado Geométrico */}
      {renderPattern()}

      {/* Brasão / Emblema Central */}
      {renderEmblem()}

      {/* Faixa Inferior com Nome da Agremiação */}
      {showBanner && !compact && (
        <div
          className="absolute bottom-2 left-2 right-2 text-center py-1.5 px-3 rounded-lg backdrop-blur-md shadow-md z-20 border"
          style={{
            backgroundColor: `${primaryColor}ed`,
            borderColor: accentColor || '#ffffff80'
          }}
        >
          <div className="text-xs sm:text-sm font-black text-white truncate tracking-wide drop-shadow">
            {denomination ? `${denomination} ` : ''}
            {schoolName || 'Sua Escola'}
          </div>
        </div>
      )}

      {/* Franjas Douradas nas bordas (Detalhe realista do Pavilhão de Mestre-Sala e Porta-Bandeira) */}
      <div
        className="absolute inset-x-0 bottom-0 h-1 pointer-events-none opacity-80"
        style={{
          background: `repeating-linear-gradient(90deg, ${accentColor || '#f59e0b'} 0px, ${accentColor || '#f59e0b'} 3px, transparent 3px, transparent 5px)`
        }}
      />
    </div>
  );
};
