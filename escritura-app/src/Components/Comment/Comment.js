import React from 'react';
import './Comment.css';
import { useEffect } from 'react';
import { getUser } from '../../Services/UserService';
import { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Comment = ({ comment }) => {

    const [commentImage, setCommentImage] = useState("");

    useEffect(() => {
        getUser(comment.postedBy).then((result) => {
            setCommentImage(result.image);
        })
    }, []);

    return (
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
                    </div>
                    <div className='center gap'>
                        <DeleteIcon></DeleteIcon>
                        <EditIcon></EditIcon>
                    </div>
                </div>
            </div>
            <div className="comment-text">
                <p>{comment.text}</p>
            </div>
        </div>
    );
};

export default Comment;