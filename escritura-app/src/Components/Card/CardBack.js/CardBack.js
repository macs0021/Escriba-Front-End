
import '../Card.css'
import Modal from '../../Modal/Modal'
import { useEffect, useState } from 'react';
import CardInfo from '../../Modal/CardInfo'
import DocumentService from '../../../Services/DocumentService';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';

import { Link } from 'react-router-dom';

import TokenService from '../../../Services/TokenService';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const CardBack = ({ card, tittle, genres, creatorPicture, enableEditModal, enableDeleteModal, openInfo, enableCommentModal }) => {

    return (<>
        <div className="galery-card">
            <div className='card-data-container'>
                <div className='card-creator-data'>
                    <div className='card-profile-data'>
                        <div className='row'>
                            <img className="card-profile-img" src={`data:image/png;base64,${creatorPicture}`}></img>
                            <div >
                                <Link to={`/profile/${card.creatorUsername}`} className="card-link">
                                    {card.creatorUsername}
                                </Link>
                            </div>
                        </div>
                        {card.creatorUsername === TokenService.getUsername() && <div className='icon-gap'>
                            <DeleteIcon className='dropdown-icon' onClick={enableDeleteModal}></DeleteIcon>
                            <EditIcon className='dropdown-icon' onClick={enableEditModal}></EditIcon>
                        </div>}
                    </div>
                </div>
                <div className="cover-title">
                    {tittle}
                </div>

                <div className='card-genre-data'>
                    <div>{genres.join(' - ')}</div>
                </div>
                <div className='card-stars-data'>
                    <div className='card-stars-background' onClick={enableCommentModal}>
                        <StarOutlinedIcon></StarOutlinedIcon>
                        <StarOutlinedIcon></StarOutlinedIcon>
                        <StarOutlinedIcon></StarOutlinedIcon>
                        <StarOutlineOutlinedIcon></StarOutlineOutlinedIcon>
                        <StarOutlineOutlinedIcon></StarOutlineOutlinedIcon>
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