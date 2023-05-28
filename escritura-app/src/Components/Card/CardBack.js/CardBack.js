
import '../Card.css'
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import PublicIcon from '@mui/icons-material/Public';

import { Link } from 'react-router-dom';

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { PublicOff } from '@mui/icons-material';
import { getUsername } from '../../../Services/TokenService';

const CardBack = ({ card, tittle, genres, creatorPicture, enableEditModal, enableDeleteModal, openInfo, enableCommentModal, enablePublishModal, isPublic }) => {

    return (<>
        <div className="galery-card">
            <div className='card-data-container'>
                <div className='card-creator-data'>
                    <div className='card-profile-data'>
                        <div className='row'>
                            <img className="card-profile-img" src={`data:image/png;base64,${creatorPicture}`} alt='profile'></img>
                            <div >
                                <Link to={`/profile/${card?.creatorUsername}`} className="card-link">
                                    {card?.creatorUsername}
                                </Link>
                            </div>
                        </div>
                        {card?.creatorUsername === getUsername() && <div className='icon-gap'>
                            <DeleteIcon className='dropdown-icon' onClick={enableDeleteModal}></DeleteIcon>
                            <EditIcon className='dropdown-icon' onClick={enableEditModal}></EditIcon>
                            {isPublic ? <PublicIcon className='dropdown-icon' onClick={enablePublishModal}></PublicIcon> :
                                <PublicOff className='dropdown-icon' onClick={enablePublishModal}></PublicOff>}

                        </div>}
                    </div>
                </div>
                <div className="cover-title">
                    {tittle}
                </div>
                <div className='card-stars-data'>
                    <div className='card-stars-background' onClick={enableCommentModal}>
                        {(() => {
                            const stars = [];
                            for (let i = 1; i <= 5; i++) {
                                if (i <= card?.rating) {
                                    stars.push(<StarIcon className='star-icon' key={i} />);
                                } else {
                                    stars.push(<StarOutlineIcon className='star-icon' key={i} />);
                                }
                            }
                            return stars;
                        })()}
                    </div>
                </div>
                <div className='card-button-data'>
                    <div className='more-info-button' onClick={openInfo}> More info</div>
                </div>
            </div>
        </div>

    </>)
}
export default CardBack;