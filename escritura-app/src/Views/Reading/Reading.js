import './Reading.css'
import SearchBar from '../../Components/SearchBar/SearchBar';
import Galery from '../../Components/Galery/Galery';
import Card from '../../Components/Card/Card';
import { useEffect, useState } from 'react';
import DocumentService from '../../Services/DocumentService';
import Loader from '../../Components/Loader/Loader';

const Reading = () => {

    const [savedBooks, setSavedBooks] = useState([]);
    const [readingBooks, setReadingBooks] = useState([]);
    const [unsavedBooks, setUnsavedBooks] = useState([]);
    const [onReading, setOnReading] = useState(true);
    const [search, setSearch] = useState("");
    const [loadingSaved, setLoadingSaved] = useState(true);
    const [loadingReading, setLoadingReading] = useState(true);
    const [activeTab, setActiveTab] = useState('Reading');

    useEffect(() => {
        DocumentService.getDocumentsSavedByUsername().then(data => {
            setSavedBooks(data);
            setLoadingSaved(false);
        })
        DocumentService.getDocumentsReadByUsername().then(data => {
            setReadingBooks(data);
            setLoadingReading(false);
        })
    }, [onReading]);

    function addUnsavedBooks(book) {
        setUnsavedBooks([...unsavedBooks, book]);
        console.log("quitando libro: " + unsavedBooks);
    }

    const savedBooksToShow = savedBooks.filter(card => !unsavedBooks.find(book => book.id === card.id));

    const changeOnReading = (bool) => {
        setOnReading(bool)
        if (bool === true) {
            setLoadingReading(true);
        } else {
            setLoadingSaved(true);
        }
    }

    return (
        <>
            <div className='search-container'>
                <SearchBar setValue={setSearch} value={search}></SearchBar>
            </div>
            <div className='tab-container'>
                <div className={`clickable tab ${activeTab === 'Reading' ? 'active' : ''}`} onClick={() => { setActiveTab('Reading'); changeOnReading(true) }}>
                    Reading
                </div>
                <div className={` clickable tab ${activeTab === 'Saved' ? 'active' : ''}`} onClick={() => { setActiveTab('Saved'); changeOnReading(false) }}>
                    Saved
                </div>
            </div>
            <div>
                {!onReading ? (
                    !loadingSaved ? (
                        <Galery>
                            {savedBooksToShow
                                .filter((book) => book.tittle && book.tittle.includes(String(search)))
                                .map((card) => (
                                    <Card card={card} key={card.id} addUnsavedBooks={addUnsavedBooks} />
                                ))}
                        </Galery>
                    ) : (
                        <div className='center'>
                            <Loader />
                        </div>
                    )
                ) : (
                    !loadingReading ? (
                        <Galery>
                            {readingBooks.filter((book) => book.tittle && book.tittle.includes(String(search))).map((card) => (
                                <Card card={card} key={card.id} addUnsavedBooks={addUnsavedBooks} />
                            ))}
                        </Galery>) : (
                        <div className='center'>
                            <Loader />
                        </div>
                    )
                )}
            </div>
        </>


    );
}

export default Reading;