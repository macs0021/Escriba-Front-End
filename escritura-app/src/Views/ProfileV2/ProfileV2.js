import './ProfileV2.css'
import { useEffect } from 'react';
import Galery from '../../Components/Galery/Galery';
import TokenService from '../../Services/TokenService';
import DocumentService from '../../Services/DocumentService';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../Components/Card/Card';
import Modal from '../../Components/Modal/Modal';
import MiniProfile from '../../Components/MiniProfile/MiniProfile';
import ProfileEditFormulary from '../../Components/Modal/ProfileEditFormulary';
import { getUser, followUser, getFollowers, getFollowing } from '../../Services/UserService';
import NoBooksImage from '../../files/cute.png'

const ProfileV2 = () => {

    const [usersModalState, setUsersModalState] = useState(false);
    const [written, setWritten] = useState([]);
    const [userData, setUserData] = useState("");
    const [read, setRead] = useState([]);
    const { username: user } = useParams();
    const [isFollowing, setIsFollowing] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [modalList, setModalList] = useState([]);
    const [followModalTittle, setFollowModalTittle] = useState("");
    const [profileImage, setProfileImage] = useState([]);
    const [profileEditModalState, setProfileEditModalState] = useState(false);

    useEffect(() => {
        if (user === null) return;
        resetStates();
        getUser(user).then(data => {

            setUserData(data);
            setFollowers(data.followers);
            setFollowing(data.following);
            setProfileImage(data.image);
            if (data.followers.includes(TokenService.getUsername())) setIsFollowing(true);
        });

        DocumentService.getPublicDocumentsByUsername(user).then(data => {
            setWritten(data);
        });
    }, [user]);


    const handleFollow = (username) => {
        followUser(username).then(data => {
            if (user === TokenService.getUsername()) {
                if (following.includes(username))
                    setFollowing(prevFollowing => prevFollowing.filter(followedUser => followedUser !== username));
                else
                    setFollowing(prevFollowing => prevFollowing.concat(username));
            } else {
                if (followers.includes(TokenService.getUsername()))
                    setFollowers(prevFollowers => prevFollowers.filter(follower => follower !== TokenService.getUsername()));
                else
                    setFollowers(prevFollowers => prevFollowers.concat(TokenService.getUsername()));
            }
        })
        setIsFollowing(!isFollowing);
    }

    const followersClick = () => {
        if (followers.length === 0) return;
        getFollowers(user).then(data => {
            setModalList(data);
            setFollowModalTittle(user + " followers")
            setUsersModalState(true);
        })
    }

    const followingClick = () => {
        if (following.length === 0) return;
        getFollowing(user).then(data => {
            setModalList(data);
            setFollowModalTittle(user + " followings")
            setUsersModalState(true);
        })
    }

    const resetStates = () => {
        setUsersModalState(false);
        setIsFollowing(false);
        setProfileEditModalState(false);
        setFollowers([]);
        setFollowing([]);
        setModalList([]);
    }
    const editProfile = () => {
        setProfileEditModalState(true);
    }

    return (<>
        <div class="header__wrapper">
            <div class="cols__container">
                <div class="left__col">
                    <div class="img__container">
                        <img src={`data:image/png;base64,${userData.image}`} alt="user" />
                        <span></span>
                    </div>
                    <h2 className='light'>{user}</h2>
                    <p>{userData.email}</p>

                    <ul className="about">
                        <li className='light clickable' onClick={followersClick}><span className='light'>{followers.length}</span>Followers</li>
                        <li className='clickable' onClick={followingClick}><span className='light'>{following.length}</span>Following</li>
                        <li><span className='light'>{written.length}</span>Writtings</li>
                    </ul>

                    <div class="content">
                        <p>
                            {userData.description}
                        </p>

                        <ul>
                            <li><i class="fab fa-twitter"></i></li>
                            <i class="fab fa-pinterest"></i>
                            <i class="fab fa-facebook"></i>
                            <i class="fab fa-dribbble"></i>
                        </ul>
                        {user !== TokenService.getUsername() && <button id="main-follow-button" className='follow-button button' onClick={() => handleFollow(user)}>
                            {isFollowing ? 'Unfollow' : isFollowing ? 'Followed' : 'Follow'}
                        </button>}
                        {user === TokenService.getUsername() && <button id="main-follow-button" className='follow-button button' onClick={() => editProfile()}>
                            Edit profile
                        </button>}
                    </div>
                </div>

                <div className="right__col">
                    <nav>
                        <ul>
                            <li><a className='light' href="">Written</a></li>
                        </ul>
                    </nav>
                    {(written.length !== 0 || read.length !== 0) ? <div>
                        <Galery>
                            {written.map((card) => <Card card={card} key={card.id} />)}
                        </Galery>
                    </div> : <div className='center top-bot-margin'> <img className='no-books-image' src={NoBooksImage}></img></div>}
                </div>
            </div>

            <Modal modalState={usersModalState} setModalState={setUsersModalState} tittle={followModalTittle} fullscreen={true}>
                <div className='mini-profile-container modal-space' style={{ overflow: 'auto' }}>
                    {modalList.map((user) =>
                        <MiniProfile user={user} handleFollow={handleFollow}></MiniProfile>
                    )}
                </div>
            </Modal>

            <Modal modalState={profileEditModalState} setModalState={setProfileEditModalState} fullscreen={true}>
                <div style={{height:'100%'}} className='center'>
                    <ProfileEditFormulary userData={userData} setUserData={setUserData} setModalState={setProfileEditModalState}></ProfileEditFormulary>
                </div>
            </Modal>

        </div>
    </>);
}

export default ProfileV2;