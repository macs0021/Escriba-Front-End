import { useEffect } from "react";
import Modal from "../Modal";
import CommentPosting from "../../CommentPosting/CommentPosting";
import Comment from "../../Comment/Comment";
import { useState } from "react";
import { getReviewsOfDocument } from "../../../Services/CommentService";
import TokenService from "../../../Services/TokenService";
import './CommentModal.css'

const CommentModal = ({ documentId, modalState, setModalState }) => {

    const [comments, setComments] = useState([]);
    const [editing, setEditing] = useState(false);
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

    const closeModalAndEditMode = () => {
        setModalState(false);
        setEditing(false);
    }

    const editMode = () => {
        setEditing(true);
        console.log(editing);
    }

    return (<>
        <Modal modalState={modalState} setModalState={closeModalAndEditMode} tittle={"Comments"} fullscreen={true}>
            <div className = "comments-container">
                {userComment && !editing ? (
                    <Comment comment={userComment} reloadContent={reloadContent} setEditing={editMode} />
                ) : (
                    <CommentPosting documentId={documentId}
                        reloadContent={reloadContent}
                        editing={editing}
                        setEditing={setEditing}
                        comment={userComment} />
                )}
                <div className="comments">
                    {comments.map(comment => (
                        <Comment key={comment.id} comment={comment} />))}
                </div>
            </div>
        </Modal >

    </>)
}

export default CommentModal;