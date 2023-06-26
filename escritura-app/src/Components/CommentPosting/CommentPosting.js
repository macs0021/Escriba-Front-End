import './CommentPosting.css'
import { postComment, putComment } from '../../Services/CommentService'
import { useState } from 'react'
import { getUsername } from '../../Services/TokenService';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const CommentPosting = ({ documentId, reloadContent, setEditing, editing, comment, isReply, respondingTo }) => {

    const [text, setText] = useState(comment?.text || '');

    const [review, setReview] = useState(comment?.rating || 0);

    const handleRatingClick = (clickedRating) => {
        setReview(clickedRating);
    };

    const postingComment = () => {

        const post = { "text": text, "postedBy": getUsername(), "postedIn": documentId, "rating": review, "commentType": "", "responding": respondingTo }

        if (!isReply) {
            post.commentType = "REVIEW";
        }else{
            post.commentType = "RESPONSE";
        }
        
        if (editing) {
            putComment(comment.id, post).then(() => {
                setEditing(false);
                reloadContent();
            })
        } else {
            postComment(post).then(() => {
                reloadContent();
            })
        }

    }

    return (<>
        <div style={{marginTop: '3rem'}}>
            <div className="center">
                <input onChange={(event) => setText(event.target.value)} defaultValue={text} className='comment-text-area' />
            </div>
            {!isReply && <div className='row center posting-stars'>
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        onClick={() => handleRatingClick(i + 1)}
                    >
                        {i + 1 <= review ? <StarIcon /> : <StarOutlineIcon />}
                    </div>
                ))}
            </div>}
            {!editing ? (
                <div className="center">
                    <button className="button" onClick={postingComment}>Post comment</button>
                </div>) : (
                <div className='center'>
                    <div className="center gap">
                        <button className="button" onClick={postingComment}>Save changes</button>
                        <button className="button" onClick={() => setEditing(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    </>)

}
export default CommentPosting