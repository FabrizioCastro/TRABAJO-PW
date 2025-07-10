import React from 'react';

interface MensajeEstadoProps {
  tipo?: 'error' | 'exito' | 'info';
  mensaje: string;
  onCerrar?: () => void;
}

const colores = {
  error: 'bg-danger text-white',
  exito: 'bg-success text-white',
  info: 'bg-info text-white'
};

const MensajeEstado: React.FC<MensajeEstadoProps> = ({ tipo = 'error', mensaje, onCerrar }) => {
  return (
    <div className={`alert ${colores[tipo]} d-flex justify-content-between align-items-center`} role="alert">
      <span>{mensaje}</span>
      {onCerrar && (
        <button type="button" className="btn-close btn-close-white" aria-label="Cerrar" onClick={onCerrar}></button>
      )}
    </div>
  );
};

export default MensajeEstado;
