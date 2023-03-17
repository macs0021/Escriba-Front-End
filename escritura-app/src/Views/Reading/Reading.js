import './Reading.css'
import SearchBar from '../../Components/SearchBar/SearchBar';
import Galery from '../../Components/Galery/Galery';
import Card from '../../Components/Card/Card';
import { useEffect, useState } from 'react';
import DocumentService from '../../Services/DocumentService';
import TokenService from '../../Services/TokenService';

const Reading = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        DocumentService.getDocumentsSavedByUsername(TokenService.getUsername()).then(data => {
            console.log(JSON.stringify(books));
            setBooks(data);
        })
    }, []);

    return (
        <>
            <div className='search-container'>
                <SearchBar></SearchBar>
            </div>
            <div className='tab-container'>
                <div className='tab'><a href="">Reading</a></div>
                <div className='tab'><a href="">Saved</a></div>
            </div>
            <div>
                <Galery>
                    {books.map((card) => <Card card={card} key={card.id} />)}
                </Galery>
            </div>
        </>


    );
}

export default Reading;