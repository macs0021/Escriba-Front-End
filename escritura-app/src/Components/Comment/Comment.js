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
import TokenService from '../../Services/TokenService';

const Comment = ({ comment, reloadContent, setEditing }) => {

    const [deleteModal, setDeleteModal] = useState(false);

    const [commentImage, setCommentImage] = useState("");

    useEffect(() => {
        getUser(comment.postedBy).then((result) => {
            setCommentImage(result.image);
        })
    }, []);

    const onDeleteClick = () => {
        deleteComment(comment.id).then(() => {
            reloadContent();
        })
    }


    return (<>
        <div>
            <div className="comment-container">
                <div className='comment-header'>
                    <div className="space-between">
                        <div className='row'>
                            <img
                                src={`data:image/png;base64,${commentImage}`}
                                alt={`${comment.postedBy}'s avatar`}
                                className="comment-avatar"
                            />
                            <div>
                                <h4 className="comment-info">{comment.postedBy}</h4>
                                <p className="comment-info" style={{ fontSize: '12px' }}>
                                    {new Date(comment.postedAt).toLocaleString()}
                                </p>
                            </div>

                        </div>
                        <div className='comment-stars'>
                            {(() => {
                                const stars = [];
                                for (let i = 1; i <= 5; i++) {
                                    if (i <= comment.rating) {
                                        stars.push(<StarIcon key={i} />);
                                    } else {
                                        stars.push(<StarOutlineIcon key={i} />);
                                    }
                                }
                                return stars;
                            })()}
                        </div>
                        {comment.postedBy === TokenService.getUsername() && <div className='center gap'>
                            <DeleteIcon onClick={() => setDeleteModal(true)}></DeleteIcon>
                            <EditIcon onClick={() => setEditing(true)}></EditIcon>
                        </div>}
                    </div>
                </div>
                <div className="comment-text">
                    <p>{comment.text}</p>
                </div>
            </div>
            <div className='comment-responses-button center'>responses</div>
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