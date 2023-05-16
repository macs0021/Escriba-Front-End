import Galery from '../../Components/Galery/Galery'
import './Writting.css';
import DocumentService from '../../Services/DocumentService';
import { useState, useEffect } from 'react';
import TokenService from '../../Services/TokenService';
import Card from '../../Components/Card/Card';
import CreateDocumentButton from '../../Components/CreateDocumentButton/CreateDocumentButton';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Loader from '../../Components/Loader/Loader';

export default function Writting() {

    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        DocumentService.getDocumentsByUsername(TokenService.getUsername()).then(data => {
            setBooks(data);
            setLoading(false);
        })
    }, []);

    return (
        <>
            <div className='search-container'>
                <SearchBar setValue={setSearch} value={search}></SearchBar>
            </div>
            <div className='tab-container'>
                <div className='tab'>Public</div>
                <div className='tab'>Private</div>
            </div>
            <div>
                <Galery>
                    {!loading && <CreateDocumentButton></CreateDocumentButton>}
                    {!loading ? (books.filter((book) => book.tittle && book.tittle.includes(String(search))).map((card) => (
                        <Card card={card} key={card.id} />
                    ))) : (
                        <Loader></Loader>
                    )}
                </Galery>
            </div>
        </>
    );




}