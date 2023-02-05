import placeHolderImg from '../../files/bookCover.jpg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import './Card.css'

export default function Card(props) {
    return (
        <>
            <div className='galery-card'>
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
        </>
    );
}