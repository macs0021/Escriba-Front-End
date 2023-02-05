import './Profile.css'
import profileHolder from '../../files/profile-holder.jpg'
import Galery from '../Galery/Galery'
import Tab from '../Tab/Tab'

export default function Profile() {

    const cards = [
        { title: 'Caperucita roja', reviewAverage: 4.2, comments: 10 },
        { title: 'El lobo feroz', reviewAverage: 4.9, comments: 20 },
        { title: 'Transformers', reviewAverage: 2.3, comments: 7 },
    ];

    const cards2 = [
        { title: 'Caperucita roja2', reviewAverage: 4.2, comments: 10 },
        { title: 'El lobo feroz2', reviewAverage: 4.9, comments: 20 },
        { title: 'Transformers2', reviewAverage: 2.3, comments: 7 },
    ];
    const tabs = [
        { id: 4, title: 'Tab 1', content: <Galery cards={cards} /> },
        { id: 5, title: 'Tab 2', content: <Galery cards={cards2} /> },
    ];

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
                <Tab tabs={tabs}></Tab>
            </div>

        </>
    )
}