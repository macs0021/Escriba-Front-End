import Modal from "../Modal/Modal";
import './CreateDocumentButton.css'
import CreationFormulary from "../Modal/CreationFormulary";
import { useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DocumentService from "../../Services/DocumentService";
import TokenService from "../../Services/TokenService";
import sizeImage from '../../files/sizeImage.png'
import ImageGeneratorService from '../../Services/ImageGeneratorService';
import { useNavigate } from 'react-router-dom';
import loadingImg from '../../files/cargaV3.gif';

const CreateDocumentButton = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [synopsis, setSynopsis] = useState("");

    const [cover, setCover] = useState(sizeImage);

    const [modalState, setModalState] = useState(false);
    function onClick() {
        setModalState(true);
    }

    const createDocument = (event) => {

        event.preventDefault();

        const document = { "privateText": "", "cover": cover, "tittle": title, "synopsis": synopsis, "creatorUsername": TokenService.getUsername(), "genres": selectedGenres, "readings": [] };
        console.log("User: " + TokenService.getUsername());

        DocumentService.postDocument(document).then(data => {
            navigate('/documents/' + data);
        });
    }

    return (<>
        <div className='CDB-background' onClick={onClick}>
            <div className="CDB-inner-div">
                <AddCircleIcon className="CDB-icon"></AddCircleIcon>
            </div>
        </div>

        <Modal modalState={modalState} setModalState={setModalState} tittle={"Create document"}>
            <div className='modal-content'>
                <CreationFormulary title={title} setTitle={setTitle} 
                image={image} cover={cover} selectedGenres={selectedGenres}
                 setCover={setCover} setSynopsis={setSynopsis} setImage={setImage} setSelectedGenres={setSelectedGenres} synopsis={synopsis}/>
            </div>
            <div className='center-element'>
                <button onClick={createDocument} className='create-document-button'>Enviar</button>
            </div>
        </Modal>
    </>);


}

export default CreateDocumentButton;