import type { ReactNode } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

interface ModalProps {
  children: ReactNode;
  mostrarCerrar?: boolean;
  onCerrar?: () => void;
}

const Modal = ({ children, mostrarCerrar = false, onCerrar }: ModalProps) => {
  return (
    <div className="modal d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content position-relative p-4" style={{ backgroundColor: 'var(--card-bg)', border: '2px dashed #ccc', borderRadius: '12.124px' }}>
          {mostrarCerrar && (
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-3"
              aria-label="Cerrar"
              onClick={onCerrar}
            ></button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
