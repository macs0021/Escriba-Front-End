import Modal from "../Modal";
import Card from "../../Card/Card";
import DocumentService from "../../../Services/DocumentService";


const DeleteDocumentModal = ({ deleteWarningModalState, setDeleteWarningModalState, card, setDeleted }) => {

    const OnDeleteClick = (event) => {
        event.stopPropagation();
        DocumentService.deleteDocument(card.id).then(data => {
            setDeleted(true);
        });
        setDeleteWarningModalState(false);
    }

    return (<>
        <Modal modalState={deleteWarningModalState} setModalState={setDeleteWarningModalState} tittle={"Delete document"}>
            <p>Are you sure you want to delete this document?</p>
            <p>You can't undo this action</p>
            <div className='space-evenly'>
                <button className='delete-button button' onClick={OnDeleteClick}>Delete</button>
                <button className='button' onClick={() => setDeleteWarningModalState(false)}>Cancel</button>
            </div>
        </Modal>

    </>)

}

export default DeleteDocumentModal;