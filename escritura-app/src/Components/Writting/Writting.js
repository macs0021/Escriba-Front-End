import Galery from '../Galery/Galery'
import Card from '../Card/Card';
import './Writting.css';
import { Link } from 'react-router-dom';

export default function Writting() {

    const id = 1;
    const createDocument = () => {
        
    }
    const cards = [
        { id: 1, title: 'Caperucita roja', reviewAverage: 4.2, comments: 10 },
        { id: 2, title: 'El lobo feroz', reviewAverage: 4.9, comments: 20 },
        { id: 3, title: 'Transformers', reviewAverage: 2.3, comments: 7 },
    ];
    return (
        <>
            <div className='tittle-div'><p className='tittle'>Your Writtings</p> </div>
            <div className='button-div'>
                <Link to={{
                    pathname: '/documents/' + id,
                    state: { id: id }
                }} className='create-button'>
                    <button type="submit" onClick={createDocument} className='create-button'> + </button>
                </Link>
            </div>

            <div>
                <Galery cards={cards} />
            </div>

        </>
    );




}