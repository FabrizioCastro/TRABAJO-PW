

const Modal = ({children}) => {
    return (
        <div className="modal">
            <div className="modal-contenido">
               
                <button className="cerrar-modal">&times;</button>
                
                {children}
            </div>
        </div>
    );
};

export default Modal