import './CommentPosting.css'
import { postComment, putComment } from '../../Services/CommentService'
import { useState } from 'react'
import TokenService from '../../Services/TokenService';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const CommentPosting = ({ documentId, reloadContent, setEditing, editing, comment }) => {

    const [text, setText] = useState(comment?.text || '');

    const [review, setReview] = useState(comment?.rating || 0);

    const handleRatingClick = (clickedRating) => {
        setReview(clickedRating);
    };

    const postingComment = () => {

        const post = { "text": text, "postedBy": TokenService.getUsername(), "postedIn": documentId, "rating": review, "commentType": "REVIEW" }

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
        <div className='comment-posting'>
            <div className="center red">
                <input onChange={(event) => setText(event.target.value)} defaultValue={text} className='comment-text-area' />
            </div>
            <div className='row center posting-stars'>
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        onClick={() => handleRatingClick(i + 1)}
                    >
                        {i + 1 <= review ? <StarIcon /> : <StarOutlineIcon />}
                    </div>
                ))}
            </div>
            <div className="center post-comment-button">
                <button onClick={postingComment}>Post comment</button>
            </div>
        </div>
    </>)

}
export default CommentPosting