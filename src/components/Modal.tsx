const Modal = ({ children, mostrarCerrar = false, onCerrar }) => {
    return (
        <div className="modal">
            <div className="modal-contenido">
                {mostrarCerrar && (
                    <button className="cerrar-modal" onClick={onCerrar}>&times;</button>
                )}
                {children}
            </div>
        </div>
    );
};

export default Modal;
