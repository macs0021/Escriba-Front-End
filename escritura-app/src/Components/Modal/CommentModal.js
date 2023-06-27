import { useEffect } from "react";
import Modal from "./Modal";
import CommentPosting from "../CommentPosting/CommentPosting";
import Comment from "../Comment/Comment";
import { useState } from "react";
import { getReviewsOfDocument, getRepliesOfReview } from "../../Services/CommentService";
import { getUsername } from "../../Services/TokenService";

const CommentModal = ({ documentId, modalState, setModalState }) => {

    const [comments, setComments] = useState([]);
    const [editing, setEditing] = useState(false);
    const [userComment, setUserComment] = useState(null);
    const [userReply, setUserReply] = useState(null);
    const [editingReply, setEditingReply] = useState(false);
    const [selectReplies, setSelectedReplies] = useState(-1);
    const [actualReplies, setActualReplies] = useState([]);

    useEffect(() => {
        if (modalState) {
            reloadContent();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalState]);

    const reloadContent = () => {
        getReviewsOfDocument(documentId).then((result) => {

            const userComment = result.find(comment => comment.postedBy === getUsername());
            setUserComment(userComment);

            const othersComments = result.filter(comment => comment.postedBy !== getUsername());

            const sortedComments = othersComments.sort((a, b) => {
                const dateA = new Date(a.postedAt);
                const dateB = new Date(b.postedAt);
                return dateB - dateA;
            });
            setComments(sortedComments);
            getReplies(selectReplies);
        })
    }

    const getReplies = (commentID) => {
        if (commentID === -1 || (!(comments.some(comment => comment.id === commentID)) && commentID !== userComment.id)) return;
        getRepliesOfReview(commentID).then((result) => {
            const reply = result.find(comment => comment.postedBy === getUsername());
            setUserReply(reply);
            const updatedReplies = result.filter(comment => comment !== reply);
            setActualReplies(updatedReplies);
        })
    }

    const showReplies = (commentID) => {
        if (selectReplies !== commentID) {
            setSelectedReplies(commentID);
            setUserReply(null);
            getReplies(commentID);
        } else {
            setSelectedReplies(-1);
        }
    }

    const closeModalAndEditMode = () => {
        setModalState(false);
        setEditing(false);
    }

    const editMode = () => {
        setEditing(true);
    }

    const editReply = () => {
        setEditingReply(true);
    }

    return (<>
        <Modal modalState={modalState} setModalState={closeModalAndEditMode} tittle={"Comments"} fullscreen={true}>
            <div className='modal-space' style={{ overflowY: 'auto' }}>
                <div className="comments-container">
                    {userComment && !editing ? (<>
                        <Comment comment={userComment} reloadContent={reloadContent} setEditing={editMode} />
                        <div className='comment-responses-button center' onClick={() => showReplies(userComment.id)}>replies</div>
                        {selectReplies === userComment.id && <div className="center column" style={{ marginBot: '1rem' }}>
                            {!editingReply && userReply ? (
                                <Comment comment={userReply} reloadContent={reloadContent} setEditing={editReply} isReply={true} />
                            ) : (

                                <CommentPosting documentId={documentId}
                                    reloadContent={reloadContent}
                                    editing={editingReply}
                                    setEditing={setEditingReply}
                                    comment={userReply}
                                    isReply={true}
                                    respondingTo={userComment.id} />
                            )}

                            {actualReplies.map(comment => (<>
                                <Comment key={comment.id} comment={comment} isReply={true} />
                            </>
                            ))}
                        </div>}
                    </>
                    ) : (
                        <CommentPosting documentId={documentId}
                            reloadContent={reloadContent}
                            editing={editing}
                            setEditing={setEditing}
                            comment={userComment} />
                    )}
                    <div className="comments">
                        {comments.map(comment => (<>
                            <Comment key={comment.id} comment={comment} />
                            <div className='comment-responses-button center' onClick={() => showReplies(comment.id)}>replies</div>

                            {selectReplies === comment.id && <div className="center column" style={{ marginBot: '1rem' }}>
                                {!editingReply && userReply ? (
                                    <Comment comment={userReply} reloadContent={reloadContent} setEditing={editReply} isReply={true} />
                                ) : (
                                    <CommentPosting documentId={documentId}
                                        reloadContent={reloadContent}
                                        editing={editingReply}
                                        setEditing={setEditingReply}
                                        comment={userReply}
                                        isReply={true}
                                        respondingTo={comment.id} />
                                )}

                                {actualReplies.map(comment => (<>
                                    <Comment key={comment.id} comment={comment} isReply={true} />
                                </>
                                ))}

                            </div>}
                        </>
                        ))}

                    </div>
                </div>
            </div>
        </Modal >

    </>)
}

export default CommentModal;