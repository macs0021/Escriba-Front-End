import { useEffect } from "react";
import Modal from "../Modal";
import CommentPosting from "../../CommentPosting/CommentPosting";
import Comment from "../../Comment/Comment";
import { useState } from "react";
import { getReviewsOfDocument } from "../../../Services/CommentService";
import TokenService from "../../../Services/TokenService";

const CommentModal = ({ documentId, modalState, setModalState }) => {

    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState(null);

    useEffect(() => {
        reloadContent();
    }, []);

    const reloadContent = () => {
        getReviewsOfDocument(documentId).then((result) => {

            console.log(JSON.stringify(result));
            const userComment = result.find(comment => comment.postedBy === TokenService.getUsername());
            setUserComment(userComment);

            const othersComments = result.filter(comment => comment.postedBy !== TokenService.getUsername());

            const sortedComments = othersComments.sort((a, b) => {
                const dateA = new Date(a.postedAt);
                const dateB = new Date(b.postedAt);
                return dateB - dateA;
            });
            setComments(sortedComments);

        })
    }

    return (<>
        <Modal modalState={modalState} setModalState={setModalState} tittle={"Comments"}>
            {userComment ? (
                <Comment comment={userComment} />
            ) : (
                <CommentPosting documentId={documentId} reloadContent={reloadContent} />
            )}
            <div className="comments">
                {comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />))}
            </div>
        </Modal >

    </>)
}

export default CommentModal;