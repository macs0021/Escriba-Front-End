import './Profile.css'
import profileHolder from '../../files/profile-holder.jpg'
import Galery from '../../Components/Galery/Galery'
import Tab from '../../Components/Tab/Tab'
import Modal from '../../Components/Modal/Modal'
import Cover from '../../files/sizeImage.png'

export default function Profile() {

    const cards = [
        { id: 4,title: 'Caperucita roja5',cover: Cover, reviewAverage: 4.2, comments: 10 },
        { id: 5,title: 'El lobo feroz5',cover: Cover, reviewAverage: 4.9, comments: 20 },
        { id: 6,title: 'Transformers5',cover: Cover,  reviewAverage: 2.3, comments: 7 },
        { id: 15,title: 'Transformers8', cover: Cover, reviewAverage: 2.3, comments: 7 },
        { id: 16,title: 'Transformers8', cover: Cover, reviewAverage: 2.3, comments: 7 },
        { id: 17,title: 'Transformers8', cover: Cover, reviewAverage: 2.3, comments: 7 },
        { id: 18,title: 'Transformers8', cover: Cover, reviewAverage: 2.3, comments: 7 }
    ];

    const cards2 = [
        { id: 7,title: 'Caperucita roja8',cover: Cover, reviewAverage: 4.2, comments: 10 },
        { id: 8,title: 'El lobo feroz8',cover: Cover, reviewAverage: 4.9, comments: 20 },
        { id: 9,title: 'Transformers8', cover: Cover, reviewAverage: 2.3, comments: 7 },
        { id: 10,title: 'Transformers8', cover: Cover, reviewAverage: 2.3, comments: 7 },
        { id: 11,title: 'Transformers8', cover: Cover, reviewAverage: 2.3, comments: 7 },
        { id: 12,title: 'Transformers8', cover: Cover, reviewAverage: 2.3, comments: 7 },
        { id: 13,title: 'Transformers8', cover: Cover, reviewAverage: 2.3, comments: 7 },
        { id: 14,title: 'Transformers8', cover: Cover, reviewAverage: 2.3, comments: 7 },
    ];
    const tabs = [
        { id: 4, title: 'Tab 1', content: <Galery cards={cards} /> },
        { id: 5, title: 'Tab 2', content: <Galery cards={cards2} /> },
    ];

    return (
        <>
            <div className='top-side'>
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
            </div>
            <div className='bot-side'>
                <Tab tabs={tabs}></Tab>
            </div>
        </>
    )
}