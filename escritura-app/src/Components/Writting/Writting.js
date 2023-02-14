import Galery from '../Galery/Galery'
import './Writting.css';
import DocumentService from '../../Services/DocumentService';
import CreationFormulary from '../Modal/CreationFormulary';
import Modal from '../Modal/Modal';
import { useState } from 'react';

export default function Writting() {

    const [modalState,setModalState] = useState(false);

    function onClick(){
        setModalState(true);
    }

    const cards = [
        { id: 1, title: 'Caperucita roja', reviewAverage: 4.2, comments: 10 },
        { id: 2, title: 'El lobo feroz', reviewAverage: 4.9, comments: 20 },
        { id: 3, title: 'Transformers', reviewAverage: 2.3, comments: 7 },
    ];
    return (
        <>
            <div className='tittle-div'><p className='tittle'>Your Writtings</p> </div>
            <div className='button-div'>
                <div className='create-button'>
                    <button type="submit" onClick={onClick} className='create-button'> + </button>
                </div>
            </div>

            <div>
                <Galery cards={cards} />
            </div>

            <Modal modalState={modalState} setModalState={setModalState}>
                <div className='modal-content'>
                    <CreationFormulary/>
                </div>
            </Modal>

        </>
    );




}