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

export default function Card(props) {

    const [modalState, setModalState] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [deleted,setDeleted] = useState(false);

    const toggleDropdown = (event) => {
        event.stopPropagation();
        setShowDropdown(!showDropdown);
    };

    const OnCardClick = (event) => {
        setModalState(true);
    }
    const OnDeleteClick = (event) => {
        event.stopPropagation();
        DocumentService.deleteDocument(props.card.id).then(data => {
            setDeleted(true);
        });
    }

    const OnEditClick = (event) => {
        event.stopPropagation();
    }
    if (deleted) { return (<></>) }

    return (
        <>
            <div className='galery-card' onClick={OnCardClick}>
                <img className="galery-cover" src={props.card.cover} />
                <div className="cover-title">
                    <h2 className='book-title'>{props.card.tittle}</h2>
                </div>
                <div className="dropdown-container" style={{ display: showDropdown ? "block" : "none" }} >
                    <div className="dropdown">
                        <DeleteIcon className='dropdown-icon' onClick={OnDeleteClick} />
                        <Edit className='dropdown-icon' onClick={OnEditClick} />
                    </div>
                </div>
                <div className="dots-container" onClick={toggleDropdown}>
                    <div className="dots" >
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>

            </div>
            <Modal modalState={modalState} setModalState={setModalState}>
                <div className='modal-content'>
                    <CardInfo data={props.card} />
                </div>
            </Modal>
        </>
    );
}