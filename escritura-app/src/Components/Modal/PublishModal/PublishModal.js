import Modal from "../Modal";
import Card from "../../Card/Card";
import DocumentService from "../../../Services/DocumentService";
import { useState, useEffect } from "react";


const PublishModal = ({ publishModalState, setPublishModalState, card, setEditModalState, setIsPublic, isPublic }) => {

    const [canBePublished, setCanBePublished] = useState(false);

    const onActionClick = () => {
        console.log("entro");
        if (canBePublished) {
            console.log("publishing...");
            DocumentService.changeVisibility(card.id).then(() => {
                setIsPublic(!isPublic);
                setPublishModalState(false);
            });

        } else {
            console.log("not publishing...");
            setPublishModalState(false);
            setEditModalState(true);
        }
    }

    useEffect(() => {
        setCanBePublished(card.tittle.trim() !== '' && card.synopsis.trim() !== '' && card.synopsis.trim().split(" ").length >= 10 && card.genres.length > 0);
    }, [card]);

    return (<>
        <Modal modalState={publishModalState} setModalState={setPublishModalState} tittle={ card.tittle + " document visibility"}>
            <div className="info-modal-text-width colunm">
                <p>{isPublic ? "By pressing this button you will make this document private, only you will be able to see it. You can make it public again at any momment.": "Are you sure you want to publish this document?  Any user will be able to read, review and share this document" }</p>
                {!canBePublished && <p className="info-warning">You need to complete all the fields of the document in order to publish it. Edit this document and complete the fields.</p>}
            </div>
            <div className='center'>
                <div className="row">
                    <button onClick={onActionClick} className={canBePublished ? "green" : "red"}>
                        {isPublic ? "Make Private" : (canBePublished ? "Publish" : "Edit")}
                    </button>
                    <button onClick={() => setPublishModalState(false)}>Cancel</button>
                </div>
            </div>
        </Modal>

    </>)

}

export default PublishModal;