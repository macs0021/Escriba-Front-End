import Modal from "../Modal/Modal";
import './CreateDocumentButton.css'
import CreationFormulary from "../Modal/CreationFormulary";
import { useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const CreateDocumentButton = () => {

    const [modalState, setModalState] = useState(false);
    function onClick() {
        setModalState(true);
    }

    return (<>
        <div className='CDB-background' onClick={onClick}>
            <div className="CDB-inner-div">
                <AddCircleIcon className="CDB-icon"></AddCircleIcon>
            </div>
        </div>

        <Modal modalState={modalState} setModalState={setModalState}>
            <div className='modal-content'>
                <CreationFormulary />
            </div>
        </Modal>
    </>);


}

export default CreateDocumentButton;