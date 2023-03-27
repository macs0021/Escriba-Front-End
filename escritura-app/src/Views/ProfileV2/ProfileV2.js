import './ProfileV2.css'
import { useEffect } from 'react';
import profileHolder from '../../files/profile-holder.jpg'
import Galery from '../../Components/Galery/Galery';
import Cover from '../../files/sizeImage.png'
import TokenService from '../../Services/TokenService';
import DocumentService from '../../Services/DocumentService';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../Components/Card/Card';
import UserService from '../../Services/UserService';
import { Token } from '@mui/icons-material';
import Modal from '../../Components/Modal/Modal';
import { Link } from 'react-router-dom';
import MiniProfile from '../../Components/MiniProfile/MiniProfile';

const ProfileV2 = () => {

    const [modalState, setModalState] = useState(false);
    const [written, setWritten] = useState([]);
    const [userData, setUserData] = useState("");
    const [read, setRead] = useState([]);
    const { username: user } = useParams();
    const [isFollowing, setIsFollowing] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [modalList, setModalList] = useState([]);

    //Inicializo la vista, recogiendo datos del usuario del perfil y de sus libros
    useEffect(() => {
        resetStates();
        UserService.getUser(user).then(data => {
            setUserData(data);
            setFollowers(data.followers);
            setFollowing(data.following);
            if (data.followers.includes(TokenService.getUsername())) setIsFollowing(true);

            console.log("userData: " + JSON.stringify(data));

        })
        console.log("llamando libros de " + user);
        DocumentService.getDocumentsByUsername(user).then(data => {
            setWritten(data);
        })
    }, [user]);


    const handleFollow = (username) => {
        UserService.followUser(username).then(data => {
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
        UserService.getFollowers(user).then(data => {
            setModalList(data);
            setModalState(true);
            console.log("seguidor: " + JSON.stringify(data));
        })
    }

    const followingClick = () => {
        if (following.length === 0) return;
        UserService.getFollowing(user).then(data => {
            setModalList(data);
            setModalState(true);
        })
    }

    const handleModal = () => {
        setModalState(true);
    }

    const resetStates = () => {
        setModalState(false);
        setIsFollowing(false);
        setFollowers([]);
        setFollowing([]);
        setModalList([]);
    }

    return (<>
        <div className="header__wrapper">
            <header></header>
            <div className="cols__container">
                <div className="left__col">
                    <div>
                        <div className="img__container">
                            <img src={profileHolder} alt="user" />
                            <span></span>
                        </div>
                        <h2>{user}</h2>

                    </div>
                    <div>
                        <ul className="about">
                            <li onClick={followersClick}><span>{followers.length}</span>Followers</li>
                            <li onClick={followingClick}><span>{following.length}</span>Following</li>
                            <li onClick={handleModal}><span>200,543</span>Score</li>
                        </ul>

                        <div className="profile-content">
                            <p>
                                {userData.description}
                            </p>
                            <ul>

                            </ul>
                            {<button className='follow-button' onClick={() => handleFollow(user)}>
                                {user !== TokenService.getUsername() ? isFollowing ? 'Unfollow' : isFollowing ? 'Followed' : 'Follow' : 'Edit profile'}
                            </button>}
                        </div>
                    </div>
                </div>
                {(written.length !== 0 || read.length !== 0) &&
                    <div className="right__col">
                        <nav>
                            <ul>
                                {written.length !== 0 && <li><a href="">Escritos</a></li>}
                                {read.length !== 0 && <li><a href="">Leidos</a></li>}

                            </ul>
                        </nav>
                        <div className="photos">
                            <Galery>
                                {written.map((card) => <Card card={card} key={card.id} />)}
                            </Galery>
                        </div>
                    </div>}
            </div>

            <Modal modalState={modalState} setModalState={setModalState}>
                {modalList.map((user) => 
                    <MiniProfile user={user} handleFollow={handleFollow}></MiniProfile>
                )}
            </Modal>
        </div>
    </>);
}

export default ProfileV2;