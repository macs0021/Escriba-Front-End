import { useEffect } from 'react';
import HomeNotification from '../../Components/HomeNotification/HomeNotification';
import './Home.css'
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getActivityOfUsers } from '../../Services/ActivityService';
import { getFollowing, getUser, followUser, getRecommendations } from '../../Services/UserService';
import TokenService from '../../Services/TokenService';
import MiniProfile from '../../Components/MiniProfile/MiniProfile';
import Galery from '../../Components/Galery/Galery';
import Card from '../../Components/Card/Card';
import DocumentService from '../../Services/DocumentService';
import Loader from '../../Components/Loader/Loader';
const Home = () => {

    const [users, setUsers] = useState([]);
    const [activities, setActivities] = useState([]);
    const [end, setEnd] = useState(false);
    const [page, setPage] = useState(0);
    const [recommendedUsers, setRecommendedUsers] = useState([]);
    const [testUser, setTestUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [testDocument, setTestDocument] = useState(null);

    const handleFollow = (username) => {
        followUser(username);
    }

    useEffect(() => {
        getFollowing(TokenService.getUsername()).then((result) => {
            console.log("PIDO USERS")
            if (result !== []) {
                setUsers(result.map(user => user.name));
            }
        })
        getRecommendations(TokenService.getUsername()).then((result) => {
            setRecommendedUsers(result);
        })

        /*DocumentService.getRecommendation().then((result) => {
            setTestDocument(result);
        })*/

    }, [])



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
                {testDocument && <Card card={testDocument}></Card>}
            </Galery>
        </div>
        <div className='center column home-main'>
            <InfiniteScroll dataLength={activities.length} hasMore={!end} next={() => setPage((prevPage) => prevPage + 1)} loader={<div className='center' style={{ marginTop: '3rem' }}> <Loader></Loader></div>} endMessage={""} style={{ padding: '15px', overflowY: 'visible', overflowX: 'hidden' }}>
                {activities.map((activity) => activity && <HomeNotification key={activity.id} notification={activity}></HomeNotification>)}
            </InfiniteScroll>
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