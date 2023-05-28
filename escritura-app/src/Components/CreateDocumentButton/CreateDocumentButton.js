import Modal from "../Modal/Modal";
import './CreateDocumentButton.css'
import CreationFormulary from "../CreationFormulary/CreationFormulary";
import { useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { postDocument } from "../../Services/DocumentService";
import { getUsername } from '../../Services/TokenService';
import sizeImage from '../../files/sizeImage.png'
import { useNavigate } from 'react-router-dom';

const CreateDocumentButton = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [synopsis, setSynopsis] = useState("");

    const [cover, setCover] = useState(sizeImage);

    const [modalState, setModalState] = useState(false);
    function onClick() {
        setModalState(true);
    }

    const createDocument = (event) => {
        event.preventDefault();

        const document = {
            "privateText": "",
            "cover": cover,
            "tittle": title ? title : "Unnamed document",
            "synopsis": synopsis,
            "creatorUsername": getUsername(),
            "genres": selectedGenres,
            "readings": []
        };

        postDocument(document).then(data => {
            navigate('/documents/' + data);
        });
    };
    
    return (<>
        <div className='CDB-background' onClick={onClick}>
            <div className="CDB-inner-div">
                <AddCircleIcon className="CDB-icon"></AddCircleIcon>
            </div>
        </div>

        <Modal modalState={modalState} setModalState={setModalState} tittle={"Create document"} fullscreen={true}>
            <div className='modal-content'>
                <CreationFormulary tittle={title} setTitle={setTitle}
                    image={image} cover={cover} selectedGenres={selectedGenres}
                    setCover={setCover} setSynopsis={setSynopsis} setImage={setImage} setSelectedGenres={setSelectedGenres} synopsis={synopsis} />
            </div>
            <div className='center'>
                <button onClick={createDocument} className='create-document-button'>Save</button>
            </div>
        </Modal>
    </>);


}

export default CreateDocumentButton;