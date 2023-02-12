import React from 'react'
import './Modal.css'

const Modal = ({children, modalState, setModalState}) =>{
    return(
        <>
        {modalState &&
            <div className='overlay'>
                <div className='modal-container'>
                    <div className='header'>
                        <h3> title</h3>
                    </div>
                    <button className='close-button' onClick={()=>setModalState(false)}>X</button>
                    {children}
                </div>
                
            </div>
        }
        </>
    );

}
export default Modal;