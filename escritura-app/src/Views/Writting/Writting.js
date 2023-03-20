import Galery from '../../Components/Galery/Galery'
import './Writting.css';
import DocumentService from '../../Services/DocumentService';
import { useState, useEffect } from 'react';
import TokenService from '../../Services/TokenService';
import Card from '../../Components/Card/Card';
import CreateDocumentButton from '../../Components/CreateDocumentButton/CreateDocumentButton';
import SearchBar from '../../Components/SearchBar/SearchBar';

export default function Writting() {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        DocumentService.getDocumentsByUsername(TokenService.getUsername()).then(data => {
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
                <div className='tab'>Public</div>
                <div className='tab'>Private</div>
            </div>
            <div>
                <Galery>
                    <CreateDocumentButton></CreateDocumentButton>
                    {books.map((card) => <Card card={card} key={card.id} />)}
                </Galery>
            </div>
        </>
    );




}