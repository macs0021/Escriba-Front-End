import { useEffect } from "react";
import Modal from "../Modal";
import CommentPosting from "../../CommentPosting/CommentPosting";
import Comment from "../../Comment/Comment";
import { useState } from "react";
import { getReviewsOfDocument } from "../../../Services/CommentService";

const CommentModal = ({ documentId, modalState, setModalState }) => {

    const comment = { "postedBy": "Marco", "text": "prueba de comentario" }
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getReviewsOfDocument(documentId).then((result) => {
            console.log("RESULT: " + JSON.stringify(result))
            setComments(result);
        })
    }, []);

    return (<>
        <Modal modalState={modalState} setModalState={setModalState} tittle={"Comments"}>
            <CommentPosting documentId={documentId} />
            {comments.map(comment => (
                <Comment key={comment.id} comment={comment} />))}
        </Modal>

    </>)
}

export default CommentModal;