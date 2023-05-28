import React from 'react';
import './Comment.css';
import { useEffect } from 'react';
import { getUser } from '../../Services/UserService';
import { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteComment } from '../../Services/CommentService';
import Modal from '../Modal/Modal';
import { getUsername } from '../../Services/TokenService';

const Comment = ({ comment, reloadContent, setEditing, isReply }) => {

    const [deleteModal, setDeleteModal] = useState(false);

    const [commentImage, setCommentImage] = useState("");

    useEffect(() => {
        getUser(comment?.postedBy).then((result) => {
            setCommentImage(result.image);
        })
    }, [comment?.postedBy]);

    const onDeleteClick = () => {
        deleteComment(comment?.id).then(() => {
            reloadContent();
        })
    }

    return (<>
        <div>
            <div className={`comment-container ${isReply ? 'reply' : ''}`}>
                <div className='comment-header'>
                    <div className="space-between">
                        <div className='row'>
                            <img
                                src={`data:image/png;base64,${commentImage}`}
                                alt={`${comment?.postedBy}'s avatar`}
                                className="comment-avatar"
                            />
                            <div className='comment-date-name'>
                                <h4 className="comment-info">{comment?.postedBy}</h4>
                                <p className="comment-info" style={{ fontSize: '12px' }}>
                                    {new Date(comment?.postedAt).toLocaleDateString()}
                                </p>
                            </div>

                        </div>
                        {!isReply && <div className='comment-stars'>
                            {(() => {
                                const stars = [];
                                for (let i = 1; i <= 5; i++) {
                                    if (i <= comment?.rating) {
                                        stars.push(<StarIcon className='star-icon' key={i} />);
                                    } else {
                                        stars.push(<StarOutlineIcon className='star-icon' key={i} />);
                                    }
                                }
                                return stars;
                            })()}
                        </div>}
                        {comment?.postedBy === getUsername() && <div className='center'>
                            <DeleteIcon onClick={() => setDeleteModal(true)}></DeleteIcon>
                            <EditIcon onClick={() => setEditing(true)}></EditIcon>
                        </div>}
                    </div>
                </div>
                <div className="comment-text">
                    <p>{comment?.text}</p>
                </div>
            </div>
        </div>
        <Modal modalState={deleteModal} setModalState={setDeleteModal} tittle={"Delete comment"}>
            <p>Are you sure you want to delete this comment?</p>
            <p>You can't undo this action</p>
            <div className='space-evenly'>
                <button className='delete-button' onClick={onDeleteClick}>Delete</button>
                <button onClick={() => setDeleteModal(false)}>Cancel</button>
            </div>
        </Modal>

    </>
    );
};

export default Comment;