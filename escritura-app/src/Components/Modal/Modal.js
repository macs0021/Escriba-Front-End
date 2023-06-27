import React, { useEffect } from 'react'
import './Modal.css'
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ children, modalState, setModalState, tittle, fullscreen }) => {

    useEffect(() => {
        if (modalState) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [modalState]);
    
    return (
        <>
            {modalState &&
                <div className='overlay'>
                    <div className={`modal-container ${fullscreen ? 'fullscreen' : ''}`}>
                        <div className='header'>
                            <h3> {tittle}</h3>
                            <CloseIcon className='close-button' onClick={() => setModalState(false)}></CloseIcon>
                        </div>
                        {children}
                    </div>
                </div>
            }
        </>
    );

}
export default Modal;