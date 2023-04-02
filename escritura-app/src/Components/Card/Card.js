import placeHolderImg from '../../files/bookCover.jpg';
import sizeImage from '../../files/sizeImage.png'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './Card.css'
import Modal from '../Modal/Modal'
import { useEffect, useState } from 'react';
import CardInfo from '../Modal/CardInfo'
import { Edit, PhotoSizeSelectSmallOutlined } from '@mui/icons-material';
import DocumentService from '../../Services/DocumentService';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import profileHolder from '../../files/profile-holder.jpg'
import { Link } from 'react-router-dom';
import UserService from '../../Services/UserService';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TokenService from '../../Services/TokenService';
import CreationFormulary from '../Modal/CreationFormulary';
import CardBack from './CardBack.js/CardBack';
import DeleteDocumentModal from '../Modal/DeleteDocumentModal/DeleteDocumentModal';
import EditDocumentModal from '../Modal/EditDocumentModal/EditDocumentModal';

export default function Card({ card, addUnsavedBooks }) {
    //Estados de las modales
    const [modalState, setModalState] = useState(false);
    const [deleteWarningModalState, setDeleteWarningModalState] = useState(false);
    const [editModalState, setEditModalState] = useState(false);

    const [showDropdown, setShowDropdown] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [creatorPicture, setCreatorPicture] = useState("");

    const [tittle, setTittle] = useState(card.tittle);
    const [cover, setCover] = useState(card.cover);
    const [synopsis, setSynopsis] = useState(card.synopsis)

    useEffect(() => {
        UserService.getUser(card.creatorUsername).then(data => {
            setCreatorPicture(data.image);
        });
    }, []);

    const enableDeleteModal = (event) => {
        event.stopPropagation();
        setDeleteWarningModalState(true);
    };

    const enableEditModal = (event) => {
        event.stopPropagation();
        setEditModalState(true);
    };

    const OnCardClick = (event) => {
        event.stopPropagation();
        setIsFlipped(!isFlipped);
    }

    const openInfo = (event) => {
        event.stopPropagation();
        setModalState(true);
    }

    return (
        <>
            {!deleted && (
                <article
                    className={`card${isFlipped ? " is-flipped" : ""}`}
                    onClick={OnCardClick}>
                    <div className="card__inner">
                        <div className="card__body card__body--front">
                            <div className="galery-card">
                                <img className="galery-cover" src={cover} />
                            </div>
                        </div>
                        <div className="card__body card__body--back">
                            <CardBack card={card}
                                tittle={tittle}
                                genres={card.genres}
                                synopsis={synopsis}
                                creatorPicture={creatorPicture}
                                addUnsavedBooks={addUnsavedBooks}
                                enableDeleteModal={enableDeleteModal}
                                openInfo={openInfo}
                                enableEditModal={enableEditModal}></CardBack>
                        </div>
                    </div>
                </article>
            )}

            <DeleteDocumentModal card={card} deleteWarningModalState={deleteWarningModalState} setDeleteWarningModalState={setDeleteWarningModalState} setDeleted={setDeleted} />
            <EditDocumentModal tittle={tittle} card={card} synopsis={synopsis} cover={cover} setCover={setCover} setSynopsis={setSynopsis} setTittle={setTittle} editModalState={editModalState} setEditModalState={setEditModalState} />

            <Modal modalState={modalState} setModalState={setModalState}>
                <div className="modal-content">
                    <CardInfo data={card} tittle={tittle} synopsis={synopsis} addUnsavedBooks={addUnsavedBooks} />
                </div>
            </Modal>
        </>
    );
}