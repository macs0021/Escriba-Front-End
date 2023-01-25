import './Profile.css'
import profileHolder from '../../files/profile-holder.jpg'
import Galery from '../Galery/Galery'

export default function Profile() {
    return (
        <>
            <div className='top-side'>
                <div className='portrait left'></div>
                <div className="user-data">
                    <div className='stats-container'>
                        <div className='user-stat'>
                            <div className='stat' style={{ width: '3rem' }}>
                                <p>Post</p>
                            </div>
                            <div className='stat-value'>
                                100
                            </div>
                        </div>
                        <div className='user-stat'>
                            <div className='stat' style={{ width: '5rem' }}>
                                Followers
                            </div>
                            <div className='stat-value'>
                                100
                            </div>
                        </div>
                        <div className='user-stat'>
                            <div className='stat' style={{ width: '3rem' }}>
                                Likes
                            </div>
                            <div className='stat-value'>
                                100
                            </div>
                        </div>

                    </div>
                    <div className='center-data'>
                        <div className='data-container img-container'>
                            <img className="profile-img" src={profileHolder} />
                        </div>
                        <div className='data-container user-name'>
                            User name
                        </div>
                    </div>
                    <div className='stats-container'>
                        <div className='user-stat'>
                            <div className='stat' style={{ width: '3rem' }}>
                                <p>Post</p>
                            </div>
                            <div className='stat-value'>
                                100
                            </div>
                        </div>
                        <div className='user-stat'>
                            <div className='stat' style={{ width: '5rem' }}>
                                Followers
                            </div>
                            <div className='stat-value'>
                                100
                            </div>
                        </div>
                        <div className='user-stat'>
                            <div className='stat' style={{ width: '3rem' }}>
                                Likes
                            </div>
                            <div className='stat-value'>
                                100
                            </div>
                        </div>
                    </div>
                </div>
                <div className='portrait right'></div>
            </div>
            <div className='bot-side'>
                <Galery/>
            </div>

        </>
    )
}