import { useEffect } from 'react';
import './HomeNotification.css'
import { getUser } from '../../Services/UserService';
import DocumentService from '../../Services/DocumentService';
import { getReplyByID, getReviewByID } from '../../Services/CommentService';
import { useState } from 'react';
import MiniProfile from '../MiniProfile/MiniProfile'
import { followUser, getFollowers, getFollowing } from '../../Services/UserService';
import Card from '../Card/Card'
import Comment from '../Comment/Comment';
import Galery from '../Galery/Galery'
import { Link } from 'react-router-dom';


const HomeNotification = ({ notification }) => {

    const [user, setUser] = useState(null);
    const [notificationData, setNotificationData] = useState(null);
    const [extraData, setExtraData] = useState(null);

    const handleFollow = (username) => {
        followUser(username);
    }

    useEffect(() => {
        console.log("Notificacion: " + JSON.stringify(notification))
        //Recibo los datos del usuario
        getUser(notification.username).then((result) => {
            setUser(result);
        })

        //Pido la información de la acción realizada
        switch (notification.entityType) {
            case "USER":
                getUser(notification.entityId).then((result) => {
                    setNotificationData(result);
                })
                break;
            case "DOCUMENT":
                DocumentService.getDocumentById(notification.entityId).then((result) => {
                    setNotificationData(result);
                })
                break;
            case "REVIEW":
                getReviewByID(notification.entityId).then((result) => {
                    setNotificationData(result);
                })
                break;
            case "REPLY":
                getReplyByID(notification.entityId).then((result) => {
                    setNotificationData(result);
                })
                break;
        }

    }, [])

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
        }
    }

    return (<>
        <div className='notification' style={{ margin: '3rem' }}>
            <div className='notification-header'>
                <div className='profile-picture-name row'>
                    <img className="small-profile-picture" src={`data:image/png;base64,${user?.image}`} alt="user" key={user?.name} />
                    <Link to={`/profile/${notification.username}`} replace={false} className="card-link">
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
                        }
                    })()}
                </div>

            </div>
            <div className='notification-content center'>
                {notificationDisplay()}
            </div>
        </div>
    </>);
}

export default HomeNotification;