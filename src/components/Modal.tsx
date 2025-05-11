const Modal = ({ children, mostrarCerrar = false }) => {
    return (
        <div className="modal">
            <div className="modal-contenido">
                {mostrarCerrar && (
                    <button className="cerrar-modal">&times;</button>
                )}
                {children}
            </div>
        </div>
    );
};

export default Modal;
