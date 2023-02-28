import placeHolderImg from '../../files/bookCover.jpg';
import sizeImage from '../../files/sizeImage.png'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import './Card.css'
import Modal from '../Modal/Modal'
import { useState } from 'react';
import CardInfo from '../Modal/CardInfo'
import { PhotoSizeSelectSmallOutlined } from '@mui/icons-material';

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
                <img className="galery-cover" src={props.card.cover} />
                <div className="cover-title">
                    <h2 className='book-title'>{props.card.tittle}</h2>
                </div>
            </div>
            <Modal modalState={modalState} setModalState={setModalState}>
                <div className='modal-content'>
                    <CardInfo data={props.card}/>
                </div>
            </Modal>
        </>
    );
}