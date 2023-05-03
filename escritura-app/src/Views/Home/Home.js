import { useEffect } from 'react';
import HomeNotification from '../../Components/HomeNotification/HomeNotification';
import './Home.css'
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getActivityOfUsers } from '../../Services/ActivityService';
import { getFollowing, getUser, followUser } from '../../Services/UserService';
import TokenService from '../../Services/TokenService';
import MiniProfile from '../../Components/MiniProfile/MiniProfile';

const Home = () => {

    const [users, setUsers] = useState([]);
    const [activities, setActivities] = useState([]);
    const [end, setEnd] = useState(false);
    const [page, setPage] = useState(0);
    const [recommendedUsers, setRecommendedUsers] = useState([]);
    const [testUser, setTestUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollow = (username) => {
        followUser(username);
    }

    useEffect(() => {
        getFollowing(TokenService.getUsername()).then((result) => {
            console.log("PIDO USERS")
            if (result !== []) {
                setRecommendedUsers(result);
                console.log(JSON.stringify("MUESTRO USERS: " + result));
                setUsers(result.map(user => user.name));
            }
        })
    }, [])



    useEffect(() => {
        if (users.length > 0) { // Verificar si la lista de usuarios tiene elementos
            getActivityOfUsers(10, page, users).then((result) => {
                if (result.length < 10) {
                    setEnd(true);
                } else {
                    setEnd(false);
                }
                setActivities(prevActivities => prevActivities.concat(result));
            });
        }

    }, [page, users]);

    return (<div className='home-div'>
        <div className='user-recomendations'>
            <div className='user-recomendations-header'>
                Users we recommend you to follow:
            </div>
            {recommendedUsers.map((recommendedUser) => <MiniProfile user={recommendedUser} handleFollow={handleFollow}></MiniProfile>)}
        </div>
        <div className='center column' style={{ margin: '0rem', minWidth: '45rem' }} >
            <InfiniteScroll dataLength={activities.length} hasMore={!end} next={() => setPage((prevPage) => prevPage + 1)} loader={"Loading..."} endMessage={"no more"} style={{ padding: '15px', overflow: 'visible' }}>
                {activities.map((activity) => <HomeNotification key={activity.id} notification={activity}></HomeNotification>)}
            </InfiniteScroll>
        </div>
    </div>);
}

export default Home;