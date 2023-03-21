import './CardInfo.css'
import DocumentService from '../../Services/DocumentService';
import ReadingService from '../../Services/ReadingService';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TokenService from '../../Services/TokenService';

const CardInfo = ({ data, addUnsavedBooks }) => {

    const [saved, setSaved] = useState(false);


    const navigate = useNavigate();
    console.log("data: " + JSON.stringify(data));

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
        <div className='content-line'>
            <h1>{data.tittle}</h1>
        </div>
        <div className='listed-content'>
            <div className='listed-element'>Genero:
                {data.genres.map(genre => (
                    <span key={genre} style={{ marginLeft: 10 }}>{genre}</span>
                ))}

            </div>
        </div>
        <div className='text-line'>
            <p>
                {data.synopsis}
            </p>

        </div>
        <div className='content-line border-top'>
            <div className='buttons-line'>
                <button className='accept-button' onClick={save}>{saved ? 'Eliminar de guardados' : 'Guardar'}</button>
                <button className='accept-button' onClick={read}>Leer</button>
            </div>
        </div>

    </>);
}

export default CardInfo;