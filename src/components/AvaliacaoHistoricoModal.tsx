import React from 'react';
import { School } from '../types/carnaval';
import { GaleriaDosCampeoesModal } from './GaleriaDosCampeoesModal';

interface AvaliacaoHistoricoModalProps {
  isOpen: boolean;
  onClose: () => void;
  schools: School[];
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
  onSelectSchool
}) => {
  return (
    <GaleriaDosCampeoesModal
      isOpen={isOpen}
      onClose={onClose}
      schools={schools}
      initialDivision="avaliacao"
      onSelectSchool={onSelectSchool}
    />
  );
};
