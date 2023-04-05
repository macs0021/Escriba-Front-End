import React from 'react';
import './Comment.css';
import { useEffect } from 'react';
import { getUser } from '../../Services/UserService';
import { useState } from 'react';

const Comment = ({ comment }) => {

    const [commentImage, setCommentImage] = useState("");

    useEffect(() => {
        getUser(comment.postedBy).then((result) => {
            setCommentImage(result);
        })
    }, []);

    return (
        <div className="comment-container">
            <div className="comment-header">
                <img
                    src={`data:image/png;base64,${commentImage}`}
                    alt={`${comment.postedBy}'s avatar`}
                    className="comment-avatar"
                />
                <div>
                    <h4 className="comment-info">{comment.postedBy}</h4>
                    <p className="comment-info" style={{ fontSize: '12px' }}>
                        {new Date(comment.date).toLocaleString()}
                    </p>
                </div>
            </div>
            <div className="comment-text">
                <p>{comment.text}</p>
            </div>
        </div>
    );
};

export default Comment;