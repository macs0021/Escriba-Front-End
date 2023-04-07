import './CommentPosting.css'
import { postComment } from '../../Services/CommentService'
import { useState } from 'react'
import TokenService from '../../Services/TokenService';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const CommentPosting = ({ documentId, reloadContent }) => {

    const [text, setText] = useState("");

    const [rating, setRating] = useState(0);

    const handleRatingClick = (clickedRating) => {
        setRating(clickedRating);
    };

    const postingComment = () => {

        const comment = { "text": text, "postedBy": TokenService.getUsername(), "postedIn": documentId, "rating": rating, "commentType": "REVIEW" }

        postComment(comment).then((result) => {
            reloadContent();
        })
    }


    return (<>
        <div className='comment-posting'>
            <div className="center red">
                <input onChange={(event) => setText(event.target.value)} className='comment-text-area' />
            </div>
            <div className='row center posting-stars'>
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        onClick={() => handleRatingClick(i + 1)}
                    >
                        {i + 1 <= rating ? <StarIcon /> : <StarOutlineIcon />}
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