import { useEffect } from 'react';
import './HomeNotification.css'
import { getUser } from '../../Services/UserService';
import { getDocumentById } from '../../Services/DocumentService';
import { getReplyByID, getReviewByID } from '../../Services/CommentService';
import { useState } from 'react';
import MiniProfile from '../MiniProfile/MiniProfile'
import { followUser } from '../../Services/UserService';
import Card from '../Card/Card'
import Comment from '../Comment/Comment';
import Galery from '../Galery/Galery'
import { Link } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import Modal from '../Modal/Modal';



const HomeNotification = ({ notification }) => {

    const [user, setUser] = useState(null);
    const [notificationData, setNotificationData] = useState(null);
    const [document, setDocument] = useState(null);
    const [review, setReview] = useState(null);
    const [reply, setReply] = useState(null);
    const [modalState, setModalState] = useState(false);

    const handleFollow = (username) => {
        followUser(username);
    }

    useEffect(() => {
        getUser(notification.username).then((result) => {
            setUser(result);
        });

        switch (notification.entityType) {
            case "USER":
                getUser(notification.entityId).then((result) => {
                    setUser(result);
                    setNotificationData(result);
                });
                break;
            case "DOCUMENT":
                getDocumentById(notification.entityId).then((result) => {
                    setDocument(result);
                    setNotificationData(result);
                });
                break;
            case "REVIEW":
                getReviewByID(notification.entityId).then((reviewResult) => {
                    getDocumentById(reviewResult?.postedIn).then((documentResult) => {
                        setDocument(documentResult);
                        setReview(reviewResult);
                        setNotificationData(reviewResult);
                    });
                });
                break;
            case "REPLY":
                getReplyByID(notification.entityId).then((replyResult) => {
                    getReviewByID(replyResult.responding).then((reviewResult) => {
                        getDocumentById(reviewResult?.postedIn).then((documentResult) => {
                            setDocument(documentResult);
                            setReply(replyResult);
                            setNotificationData(replyResult);
                            setReview(reviewResult);
                        });
                    });
                });
                break;
            default:
                console.log("Tipo de entidad de notificación no reconocido");
        }
    }, [notification]);

    const notificationDisplay = () => {
        if (notificationData === null) return (<></>);
        switch (notification.entityType) {
            case "USER":
                return (<MiniProfile user={notificationData} handleFollow={() => handleFollow(notification.entityId)}></MiniProfile>)
            case "DOCUMENT":
                return (<Galery><Card card={notificationData}></Card></Galery>)
            case "REVIEW":
                return (<Comment comment={notificationData}></Comment>)
            case "REPLY":
                return (<Comment comment={notificationData} isReply={true}></Comment>)
            default:
                console.log("Tipo de entidad de notificación no reconocido");
        }
    }
    return (<>
        <div className='notification'>
            <div className='notification-header'>
                <div className='profile-picture-name row'>
                    <img className="small-profile-picture" src={`data:image/png;base64,${user?.image}`} alt="user" key={user?.name} />
                    <Link to={`/profile/${notification.username}`} replace={false} className="card-link" style={{ marginRight: '-10px' }}>
                        {notification.username}
                    </Link>
                    {(() => {
                        switch (notification.action) {
                            case 'PUBLISHED':
                                return 'published a document';
                            case 'FOLLOWS':
                                return 'started following';
                            case 'READING':
                                return 'started reading.';
                            case 'REVIEWED':
                                return 'posted a review.';
                            case 'REPLIED':
                                return 'posted a reply';
                            default:
                                return '';
                        }
                    })().trim()}
                </div>
                {notification.action !== 'PUBLISHED' && notification.action !== 'READING' && notification.action !== 'FOLLOWS' &&
                    <InfoIcon onClick={() => setModalState(true)} style={{ color: '#333' }}></InfoIcon>}
            </div>
            <div className='notification-content center'>
                {notificationDisplay()}
            </div>
        </div>
        <Modal setModalState={setModalState} modalState={modalState} fullscreen={true} tittle={"Notification info"} >
            <div className='notification-modal' style={{ height: '100%' }}>
                <h3 className='center'>Document</h3>
                <Galery>
                    <Card card={document}></Card>
                </Galery>
                {notification.action !== 'READING' && notification.action !== 'PUBLISHED' && (
                    <div className='center column'>
                        <h3 className='center'>Review</h3>
                        <Comment comment={review}></Comment>
                        {notification.action !== 'REVIEWED' && <div>
                            <h3 className='center' style={{ borderBottomColor: '#E8E8E8', borderBottomWidth: '1px', borderBottomStyle: 'solid', padding: '10px' }}>Reply</h3>
                            <Comment isReply={true} comment={reply}></Comment>
                        </div>
                        }
                    </div>
                )}
            </div>
        </Modal >
    </>);
}

export default HomeNotification;