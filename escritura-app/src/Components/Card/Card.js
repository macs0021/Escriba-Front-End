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
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import profileHolder from '../../files/profile-holder.jpg'

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
                    onClick={OnCardClick}>
                    <div className="card__inner">
                        <div className="card__body card__body--front">
                            <div className="galery-card">
                                <img className="galery-cover" src={card.cover} />
                            </div>
                        </div>
                        <div className="card__body card__body--back">
                            <div className="galery-card">
                                <div className='card-data-container'>
                                    <div className='card-creator-data'>
                                        <div className='card-profile-data'>
                                            <img className="card-profile-img" src={profileHolder}></img>
                                            <div>
                                                {card.creatorUsername}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cover-title">
                                        {card.tittle}
                                    </div>

                                    <div className='card-genre-data'>
                                    <div>{card.genres.join(' - ')}</div>
                                    </div>
                                    <div className='card-stars-data'>
                                        <div className='card-stars-background'>
                                            <StarOutlinedIcon></StarOutlinedIcon>
                                            <StarOutlinedIcon></StarOutlinedIcon>
                                            <StarOutlinedIcon></StarOutlinedIcon>
                                            <StarOutlineOutlinedIcon></StarOutlineOutlinedIcon>
                                            <StarOutlineOutlinedIcon></StarOutlineOutlinedIcon>
                                        </div>
                                    </div>
                                    <div className='card-button-data'>
                                        <div className='more-info-button'> More info</div>
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