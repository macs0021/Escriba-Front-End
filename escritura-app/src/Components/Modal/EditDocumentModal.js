
import Modal from "./Modal";
import CreationFormulary from "../CreationFormulary/CreationFormulary";
import { useState } from "react";
import { getUsername } from "../../Services/TokenService";
import { putDocument } from "../../Services/DocumentService";
import { useNavigate } from "react-router";


const EditDocumentModal = ({ editModalState, setEditModalState, card, setCard }) => {

    const navigate = useNavigate();

    const [tittle, setTittle] = useState(card?.tittle);
    const [cover, setCover] = useState(card?.cover);
    const [synopsis, setSynopsis] = useState(card?.synopsis);
    const [genres, SetGenres] = useState(card?.genres);

    const document = {
        "id": card?.id,
        "text": card?.text,
        "cover": cover,
        "tittle": tittle,
        "synopsis": synopsis,
        "creatorUsername": getUsername(),
        "genres": genres,
        "savedBy": card?.savedBy,
        "readings": card?.readings,
        "public": card?.public,
    };

    const updateDocument = () => {
        putDocument(card?.id, document).then((result) => {
            setCard(result);
        });
        setEditModalState(false);
    }

    const moveToEdit = () => {
        putDocument(card?.id, document).then(() => {
            navigate('/documents/' + card?.id);
        })
    }


    return (<>
        <Modal modalState={editModalState} setModalState={setEditModalState} tittle={"Edit document"} fullscreen={true}>
            <div className='modal-content'>
                <CreationFormulary card={card} tittle={tittle} cover={cover} synopsis={synopsis} setCover={setCover} setTitle={setTittle} setSynopsis={setSynopsis} selectedGenres={genres} setSelectedGenres={SetGenres}></CreationFormulary>
            </div>
            <div className='center'>
                <div className='buttons-line'>
                    <button className='button' onClick={() => setEditModalState(false)}>Cancel</button>
                    <button className='button' onClick={updateDocument}>Save</button>
                    <button className='button' onClick={moveToEdit}>Content</button>
                </div>
            </div>
        </Modal>
    </>)
}
export default EditDocumentModal;