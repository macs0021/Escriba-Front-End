import placeHolderImg from '../../files/bookCover.jpg';
import sizeImage from '../../files/sizeImage.png'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './Card.css'
import Modal from '../Modal/Modal'
import { useState } from 'react';
import CardInfo from '../Modal/CardInfo'
import { Edit, PhotoSizeSelectSmallOutlined } from '@mui/icons-material';
import DocumentService from '../../Services/DocumentService';

export default function Card({ card, addUnsavedBooks }) {
    const [modalState, setModalState] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    const toggleDropdown = (event) => {
        event.stopPropagation();
        setShowDropdown(!showDropdown);
    };

    const OnCardClick = (event) => {
        event.stopPropagation();
        setIsFlipped(!isFlipped);
    }

    const OnDeleteClick = (event) => {
        event.stopPropagation();
        DocumentService.deleteDocument(card.id).then(data => {
            setDeleted(true);
        });
    }

    const OnEditClick = (event) => {
        event.stopPropagation();
    }

    return (
        <>
            {!deleted && (
                <article
                    className={`card${isFlipped ? " is-flipped" : ""}`}
                    onClick={OnCardClick}
                >
                    <div className="card__inner">
                        <div className="card__body card__body--front">
                            <div className="galery-card">
                                <img className="galery-cover" src={card.cover} />
                            </div>
                        </div>
                        <div className="card__body card__body--back">
                            <div className="galery-card">
                                <div className='card-data-container'>
                                    <div className="cover-title">
  
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </article>
            )}

            <Modal modalState={modalState} setModalState={setModalState}>
                <div className="modal-content">
                    <CardInfo data={card} addUnsavedBooks={addUnsavedBooks} />
                </div>
            </Modal>
        </>
    );
}