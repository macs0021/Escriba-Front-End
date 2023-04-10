
import './Card.css'
import Modal from '../Modal/Modal'
import { useEffect, useState } from 'react';
import CardInfo from '../Modal/CardInfo'
import UserService from '../../Services/UserService';
import CardBack from './CardBack.js/CardBack';
import DeleteDocumentModal from '../Modal/DeleteDocumentModal/DeleteDocumentModal';
import EditDocumentModal from '../Modal/EditDocumentModal/EditDocumentModal';
import CommentModal from '../Modal/CommentsModal/CommentModal';
import { getUser } from '../../Services/UserService';
import PublishModal from '../Modal/PublishModal/PublishModal';

export default function Card({ card, addUnsavedBooks }) {
    //Estados de las modales
    const [modalState, setModalState] = useState(false);
    const [deleteWarningModalState, setDeleteWarningModalState] = useState(false);
    const [editModalState, setEditModalState] = useState(false);
    const [commentModalState, setCommentModalState] = useState(false);
    const [publishModalState, setPublishModalState] = useState(false);

    const [deleted, setDeleted] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [creatorPicture, setCreatorPicture] = useState("");

    const [document, setDocument] = useState(card);

    useEffect(() => {
        getUser(card.creatorUsername).then(data => {
            setCreatorPicture(data.image);
        });
    }, []);

    const enableDeleteModal = (event) => {
        event.stopPropagation();
        setDeleteWarningModalState(true);
    };

    const enableEditModal = (event) => {
        event.stopPropagation();
        setEditModalState(true);
    };

    const OnCardClick = (event) => {
        event.stopPropagation();
        setIsFlipped(!isFlipped);
    }

    const openInfo = (event) => {
        event.stopPropagation();
        setModalState(true);
    }

    const enableCommentModal = (event) => {
        event.stopPropagation();
        setCommentModalState(true);
    }
    const enablePublishModal = (event) => {
        event.stopPropagation();
        setPublishModalState(true);
    }

    return (
        <>
            {!deleted && (
                <article
                    className={`card${isFlipped ? " is-flipped" : ""}`}
                    onClick={OnCardClick}>
                    <div className="card__inner">
                        <div className="card__body card__body--front">
                            <div className="galery-card">
                                <img className="galery-cover" src={document.cover} />
                            </div>
                        </div>
                        <div className="card__body card__body--back">
                            <CardBack card={card}
                                tittle={document.tittle}
                                genres={document.genres}
                                synopsis={document.synopsis}
                                creatorPicture={creatorPicture}
                                addUnsavedBooks={addUnsavedBooks}
                                enableDeleteModal={enableDeleteModal}
                                openInfo={openInfo}
                                enableEditModal={enableEditModal}
                                enableCommentModal={enableCommentModal}
                                enablePublishModal={enablePublishModal}>
                            </CardBack>
                        </div>
                    </div>
                </article>
            )}

            <DeleteDocumentModal card={card} deleteWarningModalState={deleteWarningModalState} setDeleteWarningModalState={setDeleteWarningModalState} setDeleted={setDeleted} />
            <EditDocumentModal card={document} setCard={setDocument} editModalState={editModalState} setEditModalState={setEditModalState} />
            <CommentModal documentId={card.id} modalState={commentModalState} setModalState={setCommentModalState} ></CommentModal>
            <PublishModal card={document} publishModalState={publishModalState} setPublishModalState={setPublishModalState}></PublishModal>

            <Modal modalState={modalState} setModalState={setModalState}>
                <div className="modal-content">
                    <CardInfo data={card} genres={document.genres} tittle={document.tittle} synopsis={document.synopsis} addUnsavedBooks={addUnsavedBooks} />
                </div>
            </Modal>
        </>
    );
}