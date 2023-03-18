import './Reading.css'
import SearchBar from '../../Components/SearchBar/SearchBar';
import Galery from '../../Components/Galery/Galery';
import Card from '../../Components/Card/Card';
import { useEffect, useState } from 'react';
import DocumentService from '../../Services/DocumentService';

const Reading = () => {

    const [savedBooks, setSavedBooks] = useState([]);
    const [unsavedBooks, setUnsavedBooks] = useState([]);

    useEffect(() => {
        DocumentService.getDocumentsSavedByUsername().then(data => {
            setSavedBooks(data);
        })
    }, []);

    function addUnsavedBooks(book) {
        setUnsavedBooks([...unsavedBooks, book]);
        console.log("quitando libro: " + unsavedBooks);
    }

    const savedBooksToShow = savedBooks.filter(card => !unsavedBooks.find(book => book.id === card.id));

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
                    {savedBooksToShow.map((card) => <Card card={card} key={card.id} addUnsavedBooks={addUnsavedBooks} />)}
                </Galery>
            </div>
        </>


    );
}

export default Reading;