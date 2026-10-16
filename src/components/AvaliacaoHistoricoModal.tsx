import React from 'react';
import { School, YearHistory } from '../types/carnaval';
import { GaleriaDosCampeoesModal } from './GaleriaDosCampeoesModal';

interface AvaliacaoHistoricoModalProps {
  isOpen: boolean;
  onClose: () => void;
  schools: School[];
  history?: YearHistory[];
  currentYear?: number;
  onSelectSchool?: (schoolId: string) => void;
}

/**
 * AvaliacaoHistoricoModal wraps GaleriaDosCampeoesModal with initialDivision="avaliacao".
 * Kept for full backwards-compatibility.
 */
export const AvaliacaoHistoricoModal: React.FC<AvaliacaoHistoricoModalProps> = ({
  isOpen,
  onClose,
  schools,
  history,
  currentYear,
  onSelectSchool
}) => {
  return (
    <GaleriaDosCampeoesModal
      isOpen={isOpen}
      onClose={onClose}
      schools={schools}
      history={history}
      currentYear={currentYear}
      initialDivision="avaliacao"
      onSelectSchool={onSelectSchool}
    />
  );
};
