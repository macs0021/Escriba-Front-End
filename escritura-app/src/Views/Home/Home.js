import { useEffect } from 'react';
import HomeNotification from '../../Components/HomeNotification/HomeNotification';
import './Home.css'
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getActivityOfUsers } from '../../Services/ActivityService';
import { getFollowing } from '../../Services/UserService';
import TokenService from '../../Services/TokenService';

const Home = () => {

    const [users, setUsers] = useState([]);
    const [activities, setActivities] = useState([]);
    const [end, setEnd] = useState(false);
    const [page, setPage] = useState(0);

    useEffect(() => {
        getFollowing(TokenService.getUsername()).then((result) => {
            console.log("PIDO USERS")
            if (result !== []) {
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

    return (
        <div className='center column' style={{ margin: '4rem' }} >

            <InfiniteScroll dataLength={activities.length} hasMore={!end} next={() => setPage((prevPage) => prevPage + 1)} loader={"Loading..."} endMessage={"no more"} style={{ padding: '15px' }}>
                {activities.map((activity) => <HomeNotification key={activity.id} notification={activity}></HomeNotification>)}
            </InfiniteScroll>
        </div>
    );



}

export default Home;