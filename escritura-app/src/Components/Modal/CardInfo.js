import './CardInfo.css'
import DocumentService from '../../Services/DocumentService';
import ReadingService from '../../Services/ReadingService';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TokenService from '../../Services/TokenService';

const CardInfo = ({ data, tittle, synopsis, addUnsavedBooks, genres }) => {

    const [saved, setSaved] = useState(false);


    const navigate = useNavigate();

    const read = () => {
        navigate('/documents/read/' + data.id);
    }

    const save = (event) => {
        event.preventDefault();
        console.log("guardando " + data.id);
        if (!saved) {
            DocumentService.userSavesDocument(data.id).then(data => {
                setSaved(!saved);
            });
        } else if (saved) {
            DocumentService.userUnsavesDocument(data.id).then(data => {
                setSaved(!saved);
            });
            console.log("Añadiendo id: " + data.id);
            if (addUnsavedBooks) {
                addUnsavedBooks(data);
            }
        }
    }

    useEffect(() => {
        const savedByList = data.savedBy;
        setSaved(savedByList.includes(TokenService.getUsername()));
    }, []);

    return (<>
        <div style={{ height: '100%' }}>
            <div className='content-line'>
                <h1>{tittle}</h1>
            </div>
            <div className='card-info-main-content column'>
                <div className='listed-content'>
                    <h2 className='center'>Genres </h2>
                    <div className='listed-element'>
                        {genres.map(genre => (
                            <span key={genre} style={{ marginLeft: 10 }}>{genre}</span>
                        ))}

                    </div>
                </div>
                <div className='text-line column'>
                    <h2 className='center' >Synopsis </h2>
                    <p style={{ overflow: 'visible' }}>
                        {synopsis}
                    </p>
                </div>
            </div>
        </div>
        <div className='content-line border-top'>
            <div className='buttons-line'>
                <button className='accept-button button' onClick={save}>{saved ? 'Unsave' : 'Save'}</button>
                <button className='accept-button button' onClick={read}>Read</button>
            </div>
        </div>

    </>);
}

export default CardInfo;