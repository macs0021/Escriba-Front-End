import './Reading.css'
import SearchBar from '../../Components/SearchBar/SearchBar';
import Galery from '../../Components/Galery/Galery';
import Card from '../../Components/Card/Card';
import { useEffect, useState } from 'react';
import DocumentService from '../../Services/DocumentService';

const Reading = () => {

    const [savedBooks, setSavedBooks] = useState([]);
    const [readingBooks, setReadingBooks] = useState([]);
    const [unsavedBooks, setUnsavedBooks] = useState([]);
    const [onReading, setOnReading] = useState(true);

    useEffect(() => {
        DocumentService.getDocumentsSavedByUsername().then(data => {
            setSavedBooks(data);
        })
        DocumentService.getDocumentsReadByUsername().then(data => {
            setReadingBooks(data);
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
                <div className='tab' onClick={() => setOnReading(true)}>Reading</div>
                <div className='tab' onClick={() => setOnReading(false)}>Saved</div>
            </div>
            <div>
                {!onReading ? (
                    <Galery>
                        {savedBooksToShow.map((card) => <Card card={card} key={card.id} addUnsavedBooks={addUnsavedBooks} />)}
                    </Galery>
                ) : (
                    <Galery>
                        {readingBooks.map((card) => <Card card={card} key={card.id} />)}
                    </Galery>
                )}
            </div>
        </>


    );
}

export default Reading;