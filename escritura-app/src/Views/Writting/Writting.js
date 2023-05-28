import Galery from '../../Components/Galery/Galery'
import './Writting.css';
import { useState, useEffect } from 'react';
import { getUsername } from '../../Services/TokenService';
import Card from '../../Components/Card/Card';
import CreateDocumentButton from '../../Components/CreateDocumentButton/CreateDocumentButton';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Loader from '../../Components/Loader/Loader';
import { getPublicDocumentsByUsername, getPrivateDocumentsByUsername } from '../../Services/DocumentService';

export default function Writting() {

    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Public');
    const [publicBooks, setPublicBooks] = useState([]);
    const [privateBooks, setPrivateBooks] = useState([]);

    useEffect(() => {
        getPublicDocumentsByUsername(getUsername()).then(data => {
            setPublicBooks(data);
            console.log("MOSTRANDO RATING:" + data[0].rating)
        })

        getPrivateDocumentsByUsername(getUsername()).then(data => {
            setPrivateBooks(data);
        })


        setLoading(false);
    }, []);

    return (
        <>
            <div className='search-container'>
                <SearchBar setValue={setSearch} value={search}></SearchBar>
            </div>
            <div className='tab-container'>
                <div className={`clickable tab ${activeTab === 'Public' ? 'active' : ''}`} onClick={() => setActiveTab('Public')}>
                    Public
                </div>
                <div className={` clickable tab ${activeTab === 'Private' ? 'active' : ''}`} onClick={() => setActiveTab('Private')}>
                    Private
                </div>
            </div>
            <div>
                {!loading ? (
                    <Galery>
                        <>
                            <CreateDocumentButton />
                            {activeTab === 'Public' ? (
                                publicBooks
                                    .filter(book => book?.tittle && book?.tittle.includes(String(search)))
                                    .map(card => <Card card={card} key={card.id} />)
                            ) : (
                                privateBooks
                                    .filter(book => book?.tittle && book?.tittle.includes(String(search)))
                                    .map(card => <Card card={card} key={card.id} />)
                            )}
                        </>
                    </Galery>
                ) : (
                    <div className='center'><Loader /></div>
                )}
            </div>
        </>
    );

}