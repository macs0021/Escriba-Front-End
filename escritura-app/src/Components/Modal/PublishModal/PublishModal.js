import Modal from "../Modal";
import Card from "../../Card/Card";
import DocumentService from "../../../Services/DocumentService";
import { useState, useEffect } from "react";


const PublishModal = ({ publishModalState, setPublishModalState, card }) => {

    const [canBePublished, setCanBePublished] = useState(false);

    const OnDeleteClick = (event) => {
        event.stopPropagation();
        DocumentService.deleteDocument(card.id).then(data => {
        });
    }

    useEffect(() => {
        console.log("COMPROBANDO " + JSON.stringify(card));
        setCanBePublished(card.tittle.trim() !== '' && card.synopsis.trim() !== '' && card.synopsis.trim().split(" ").length >= 10 && card.genres.length > 0);
    }, [card]);

    return (<>
        <Modal modalState={publishModalState} setModalState={setPublishModalState} tittle={"Publish document"}>
            <div>
                <p>Are you sure you want to publish this document?  Any user will be able to read, review and share this document</p>
                {!canBePublished && <p className="info-warning">You need to complete all the fields of the document in order to publish it. Edit this document and complete the fields</p>}
            </div>
            <div className='space-evenly'>
                <button onClick={OnDeleteClick}>Publish</button>
                <button onClick={() => setPublishModalState(false)}>Cancel</button>
            </div>
        </Modal>

    </>)

}

export default PublishModal;