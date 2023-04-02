
import Modal from "../Modal";
import CreationFormulary from "../CreationFormulary";
import { useState } from "react";
import TokenService from "../../../Services/TokenService";
import DocumentService from "../../../Services/DocumentService";
import { useNavigate } from "react-router";


const EditDocumentModal = ({ tittle, setTittle, cover, setCover, synopsis, setSynopsis, editModalState, setEditModalState, card }) => {

    const navigate = useNavigate();

    const document = {
        "id": card.id,
        "privateText": card.privateText,
        "cover": cover,
        "tittle": tittle,
        "synopsis": synopsis,
        "creatorUsername": TokenService.getUsername(),
        "genres": card.genres,
        "savedBy": card.savedBy,
        "readings": card.readings
    };

    const updateDocument = () => {
        DocumentService.putDocument(document);
        setEditModalState(false);
    }

    const moveToEdit = () => {
        DocumentService.putDocument(document).then(() => {
            navigate('/documents/' + card.id);
        })
    }


    return (<>
        <Modal modalState={editModalState} setModalState={setEditModalState} tittle={"Edit document"}>
            <div className='modal-content'>
                <CreationFormulary card={card} tittle={tittle} cover={cover} synopsis={synopsis} setCover={setCover} setTitle={setTittle} setSynopsis={setSynopsis}></CreationFormulary>
            </div>
            <div className='center'>
                <div className='buttons-line'>
                    <button onClick={() => setEditModalState(false)}>Cancel</button>
                    <button onClick={updateDocument}>Save</button>
                    <button onClick={moveToEdit}>Edit content</button>
                </div>
            </div>
        </Modal>
    </>)
}
export default EditDocumentModal;