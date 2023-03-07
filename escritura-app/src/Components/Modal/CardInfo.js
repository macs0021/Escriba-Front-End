import './CardInfo.css'
import DocumentService from '../../Services/DocumentService';

import { useNavigate } from 'react-router-dom';

const CardInfo = (data) => {

    const navigate = useNavigate();
    console.log(JSON.stringify(data.data));

    const read = () => {
        navigate('/documents/read/' + data.data.id);
    }

    const save = () => {

    }

    return (<>
        <div className='content-line'>
            <h1>{data.data.tittle}</h1>
        </div>
        <div className='listed-content'>
            <div className='listed-element'>Tags: Prueba-1 Prueba-2 Prueba-3 </div>
            <div className='listed-element'>Genero:
                {data.data.genres.map(genre => (
                    <span key={genre} style={{ marginLeft: 10 }}>{genre}</span>
                ))}

            </div>
        </div>
        <div className='text-line'>
            <p>
                {data.data.synopsis}
            </p>

        </div>
        <div className='content-line border-top'>
            <div className='buttons-line'>
                <button className='accept-button' >Guardar</button>
                <button className='accept-button' onClick={read}>Leer</button>

            </div>
        </div>

    </>);
}

export default CardInfo;