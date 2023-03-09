import './ProfileV2.css'
import { useEffect } from 'react';
import profileHolder from '../../files/profile-holder.jpg'
import Galery from '../../Components/Galery/Galery';
import Tab from '../../Components/Tab/Tab';
import Cover from '../../files/sizeImage.png'
import TokenService from '../../Services/TokenService';
import DocumentService from '../../Services/DocumentService';
import { useState } from 'react';

const ProfileV2 = () => {

    const [written, setWritten] = useState([]);
    const [read, setRead] = useState([]);

    const cards = [
        { id: 4, title: 'Caperucita roja5', cover: Cover, reviewAverage: 4.2, comments: 10 },
        { id: 5, title: 'El lobo feroz5', cover: Cover, reviewAverage: 4.9, comments: 20 },
        { id: 6, title: 'Transformers5', cover: Cover, reviewAverage: 2.3, comments: 7 },
        { id: 15, title: 'Transformers8', cover: Cover, reviewAverage: 2.3, comments: 7 },
        { id: 16, title: 'Transformers8', cover: Cover, reviewAverage: 2.3, comments: 7 },
        { id: 17, title: 'Transformers8', cover: Cover, reviewAverage: 2.3, comments: 7 },
        { id: 18, title: 'Transformers8', cover: Cover, reviewAverage: 2.3, comments: 7 }
    ];

    const cards2 = [
        { id: 7, title: 'Caperucita roja8', cover: Cover, reviewAverage: 4.2, comments: 10 },
        { id: 8, title: 'El lobo feroz8', cover: Cover, reviewAverage: 4.9, comments: 20 },
        { id: 9, title: 'Transformers8', cover: Cover, reviewAverage: 2.3, comments: 7 },
        { id: 10, title: 'Transformers8', cover: Cover, reviewAverage: 2.3, comments: 7 },
        { id: 11, title: 'Transformers8', cover: Cover, reviewAverage: 2.3, comments: 7 },
        { id: 12, title: 'Transformers8', cover: Cover, reviewAverage: 2.3, comments: 7 },
        { id: 13, title: 'Transformers8', cover: Cover, reviewAverage: 2.3, comments: 7 },
        { id: 14, title: 'Transformers8', cover: Cover, reviewAverage: 2.3, comments: 7 },
    ];
    const tabs = [
        { id: 4, title: 'Tab 1', content: <Galery cards={cards} /> },
        { id: 5, title: 'Tab 2', content: <Galery cards={cards2} /> },
    ];



    useEffect(() => {
        DocumentService.getDocumentsByUsername(TokenService.getUsername()).then(data => {
            setWritten(data);
        })
    }, []);


    return (<>
        <div className="header__wrapper">
            <header></header>
            <div className="cols__container">
                <div className="left__col">
                    <div className="img__container">
                        <img src={profileHolder} alt="Anna Smith" />
                        <span></span>
                    </div>
                    <h2>{TokenService.getUsername()}</h2>
                    <p>Aquí van cositas</p>
                    <p>macs0021@red.ujaen.es</p>

                    <ul className="about">
                        <li><span>4,073</span>Seguidores</li>
                        <li><span>322</span>Siguiendo</li>
                        <li><span>200,543</span>Reseñas</li>
                    </ul>

                    <div className="profile-content">
                        <p>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam
                            erat volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl
                            ligula egestas nulla.
                        </p>

                        <ul>

                        </ul>
                        <button className='follow-button'>Follow</button>
                    </div>
                </div>
                {(written.length!==0||read.length!==0) &&
                <div className="right__col">
                    <nav>
                        <ul>
                            {written.length!==0 && <li><a href="">Escritos</a></li>}
                            {read.length!==0 && <li><a href="">Leidos</a></li>}

                        </ul>
                    </nav>
                    <div className="photos">
                        <Galery cards={written}></Galery>
                    </div>
                </div>}
            </div>
        </div>


    </>);
}

export default ProfileV2;