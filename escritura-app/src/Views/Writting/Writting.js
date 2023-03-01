import Galery from '../../Components/Galery/Galery'
import './Writting.css';
import DocumentService from '../../Services/DocumentService';
import CreationFormulary from '../../Components/Modal/CreationFormulary';
import Modal from '../../Components/Modal/Modal';
import { useState, useEffect } from 'react';
import TokenService from '../../Services/TokenService';

export default function Writting() {

    const [modalState, setModalState] = useState(false);
    const [books, setBooks] = useState([]);

    function onClick() {
        setModalState(true);
    }

    useEffect(() => {
        DocumentService.getDocumentsByUsername(TokenService.getUsername()).then(data => {
            console.log(JSON.stringify(books));
            setBooks(data);
        })
    }, []);

    return (
        <>
            <div className='tittle-div'><p className='tittle'>Your Writtings</p> </div>
            <div className='button-div'>
                <div className='create-button'>
                    <button type="submit" onClick={onClick} className='create-button'> + </button>
                </div>
            </div>

            <div>
                <Galery cards={books} />
            </div>

            <Modal modalState={modalState} setModalState={setModalState}>
                <div className='modal-content'>
                    <CreationFormulary />
                </div>
            </Modal>

        </>
    );




}