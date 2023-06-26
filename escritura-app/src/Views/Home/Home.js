import { useEffect } from 'react';
import HomeNotification from '../../Components/HomeNotification/HomeNotification';
import './Home.css'
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getActivityOfUsers } from '../../Services/ActivityService';
import { getFollowing, followUser, getRecommendations } from '../../Services/UserService';
import { getUsername } from '../../Services/TokenService';
import MiniProfile from '../../Components/MiniProfile/MiniProfile';
import Galery from '../../Components/Galery/Galery';
import Card from '../../Components/Card/Card';
import Loader from '../../Components/Loader/Loader';
import { getRecommendation } from '../../Services/DocumentService';

const Home = () => {

    const [users, setUsers] = useState([]);
    const [activities, setActivities] = useState([]);
    const [end, setEnd] = useState(false);
    const [page, setPage] = useState(0);
    const [recommendedUsers, setRecommendedUsers] = useState([]);
    const [documentRecommendation, setDocumentRecommendation] = useState(null);

    //Controlador para el seguimiento de un usuario
    const handleFollow = (username) => {
        followUser(username);
    }

    useEffect(() => {
        //Pido los usuarios a los que estoy siguiendo
        console.log("PIDO USUARIOS HOME")
        getFollowing(getUsername()).then((result) => {
            if (result !== []) {
                setUsers(result.map(user => user.name));
            }
        })
        //Pido recomendaciones de usuarios a los que seguir
        getRecommendations(getUsername()).then((result) => {
            setRecommendedUsers(result);
        })
        //Pido la recomendación de un libro
        getRecommendation().then((result) => {
            setDocumentRecommendation(result);
        })

    }, [])

    //Pido cinco notificaciones de usuarios a los que sigo
    useEffect(() => {
        if (users.length > 0) {
            getActivityOfUsers(5, page, users).then((result) => {
                console.log("PROBANDO: " + result)
                if (!result || result.length < 5) {
                    setEnd(true);
                } else {
                    setEnd(false);
                }
                setActivities(prevActivities => prevActivities.concat(result));
            });
        } else {
            setEnd(true);
        }

    }, [page, users]);

    return (<div className='home-div'>
        <div className='book-recomendations'>
            <div className='book-recomendations-header home-text'>
                Recommended document for you
            </div>
            <Galery style={{ marginTop: '0 !important' }}>
                {documentRecommendation && <Card card={documentRecommendation}></Card>}
            </Galery>
        </div>
        <div className='center column home-main'>
            {activities.length === 0 ? (
                <h2 className='center' style={{ height: '20rem', color: '#333', textAlign: 'center', padding: '15px' }}>Start following users to see their activity!</h2>
            ) : (
                <InfiniteScroll
                    dataLength={activities.length}
                    hasMore={!end}
                    next={() => setPage((prevPage) => prevPage + 1)}
                    loader={<div className='center' style={{ marginTop: '3rem' }}><Loader></Loader></div>}
                    endMessage={""}
                    className='infinity-scroll-home'
                >
                    {activities.map((activity) => activity && <HomeNotification key={activity.id} notification={activity}></HomeNotification>)}
                </InfiniteScroll>
            )}
        </div>
        <div className='user-recomendations'>
            <div className='user-recomendations-header home-text'>
                Users we recommend you to follow
            </div>
            {recommendedUsers && recommendedUsers.map((recommendedUser) => <MiniProfile user={recommendedUser} handleFollow={handleFollow}></MiniProfile>)}
        </div>
    </div>);
}

export default Home;