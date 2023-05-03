import './MiniProfile.css'
import { Link } from 'react-router-dom';
import TokenService from '../../Services/TokenService';
import { useEffect, useState } from 'react';
import profileHolder from '../../files/profile-holder.jpg'


const MiniProfile = ({ user, handleFollow }) => {

    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        if (user?.followers.includes(TokenService.getUsername()))
            setClicked(true);
    }, []);


    const handleClick = () => {
        setClicked(!clicked);
        handleFollow(user.name);
    }

    return (<>
        <div className="profile-small-profile">
            <div className='profile-picture-name'>
                <img className="small-profile-picture" src={`data:image/png;base64,${user?.image}`} alt="user" key={user?.name} />
                <Link to={`/profile/${user?.name}`} replace={false} className="card-link">
                    {user?.name}
                </Link>
            </div>
            {user?.name !== TokenService.getUsername() && <button className='follow-button button' onClick={() => handleClick()}>
                {clicked ? 'Unfollow' : 'Follow'}
            </button>}
        </div>
    </>)
}
export default MiniProfile;