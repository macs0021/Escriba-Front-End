import React from 'react'
import './Modal.css'
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ children, modalState, setModalState, tittle }) => {
    return (
        <>
            {modalState &&
                <div className='overlay'>
                    <div className='modal-container'>
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