import './CommentPosting.css'
import { postComment } from '../../Services/CommentService'
import { useState } from 'react'
import TokenService from '../../Services/TokenService';

const CommentPosting = ({ documentId }) => {

    const [text, setText] = useState("");
    const [review, setReview] = useState(0);

    const postingComment = () => {

        const comment = { "text": text, "postedBy": TokenService.getUsername(), "postedIn": documentId, "rating": review, "commentType": "REVIEW" }

        postComment(comment).then((result) => {

        })
    }


    return (<>
        <div className="center red">
            <input onChange={(event) => setText(event.target.value)} className='comment-text-area' />
        </div>
        <div className="center post-comment-button">
            <button onClick={postingComment}>Post comment</button>
        </div>
    </>)

}
export default CommentPosting