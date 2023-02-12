import placeHolderImg from '../../files/bookCover.jpg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import './Card.css'
import Modal from '../Modal/Modal'
import { useState } from 'react';
import CardInfo from '../Modal/CardInfo'

export default function Card(props) {

    const [modalState,setModalState] = useState(false);

    function OnCardClick(){
        setModalState(true);
    }

    return (
        <>
            <div className='galery-card' onClick={OnCardClick}>
                <div className="icon-holder">
                    <FavoriteBorderIcon className='card-icon' />
                    <div className='icon-number'>{props.card.reviewAverage}</div>

                    <ChatBubbleOutlineIcon className='card-icon' />
                    <div className='icon-number'>{props.card.comments}</div>
                </div>
                <img className="galery-cover" src={placeHolderImg} />
                <div className="cover-title">
                    <h2 className='book-title'>{props.card.title}</h2>
                </div>
            </div>
            <Modal modalState={modalState} setModalState={setModalState}>
                <div className='modal-content'>
                    <CardInfo/>
                </div>
            </Modal>
        </>
    );
}