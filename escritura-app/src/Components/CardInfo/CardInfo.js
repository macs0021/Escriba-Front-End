import './CardInfo.css'
import { userSavesDocument, userUnsavesDocument } from '../../Services/DocumentService';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUsername } from '../../Services/TokenService';

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
            userSavesDocument(data.id).then(data => {
                setSaved(!saved);
            });
        } else if (saved) {
            userUnsavesDocument(data.id).then(data => {
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
        setSaved(savedByList.includes(getUsername()));
    }, [data]);

    return (<>
        <div style={{ height: '100%' }}>
            <div className='content-line'>
                <h1>{tittle}</h1>
            </div>
            <div className='card-info-main-content column'>
                <div className='listed-content'>
                    <h2 className='center'>Genres </h2>
                    <div className='listed-element'>
                        {genres.length > 0 ? (
                            genres.map(genre => (
                                <span key={genre} style={{ marginLeft: 10 }}>{genre}</span>
                            ))
                        ) : (
                            <span>There are no genres yet</span>
                        )}
                    </div>
                </div>
                <div className='text-line column'>
                    <p style={{ overflow: 'visible', marginTop: '4rem' }}>
                    <h2 className='center' >Synopsis </h2>
                        {synopsis ? synopsis : "There is not a synopsis yet"}
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