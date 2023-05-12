import Galery from '../../Components/Galery/Galery'
import './Explore.css'
import SearchBar from '../../Components/SearchBar/SearchBar';
import Chip from '../../Components/Chip/Chip';
import { useState, useEffect } from 'react';
import Card from '../../Components/Card/Card';
import DocumentService from '../../Services/DocumentService';
import InfiniteScroll from 'react-infinite-scroll-component';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function Explore() {

    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(0);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [end, setEnd] = useState(false);
    const [showGenres, setShowGenres] = useState(false);

    const genres = [
        "Novel",
        "Short Story",
        "Poetry",
        "Drama",
        "Science Fiction",
        "Fantasy",
        "Horror",
        "Mystery",
        "Romance",
        "Adventure",
        "Humor",
        "Historical",
        "Detective",
        "Western",
        "Dystopian",
        "Realistic",
        "Juvenile",
        "Children's",
        "History",
        "Biography and Memoir",
        "Self-Help and Personal Development",
        "Business and Finance",
        "Politics and Current Affairs",
        "Travel",
        "Food and Gastronomy",
        "Art and Photography",
        "Sports and Outdoor Activities",
        "Education and Reference",
        "Science and Technology",
        "Religion and Spirituality",
        "Environment and Ecology",
        "Philosophy and Thought",
        "Sociology and Anthropology",
        "Journalism and Essays"
    ];

    useEffect(() => {
        documentsPetition();
    }, [page]);

    const documentsPetition = () => {
        console.log("PAGINA: " + page)
        if (selectedGenres.length === 0) {
            DocumentService.getAllDocuments(page, 12).then(data => {
                setCards(prevCards => prevCards.concat(data));
                if (data.length < 12) {
                    setEnd(true);
                } else {
                    setEnd(false);
                }
                console.log("datos: " + JSON.stringify(data));
            })
        } else {
            DocumentService.getDocumentsByGenreAndPage(selectedGenres, page, 12).then(data => {
                setCards(prevCards => prevCards.concat(data));
                if (data.length < 12) {
                    setEnd(true);
                } else {
                    setEnd(false);
                }
            })
        }
    }


    const search = () => {
        setCards([]);
        if (page === 0) {
            setPage(0);
            documentsPetition();
        }
        setPage(0);
        setShowGenres(false);
        setEnd(false);
    }

    const handleGenreClick = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
        } else {
            setSelectedGenres(selectedGenres.concat([genre]));
        }
    };

    return (
        <>

            <div className='explore-search-container'>
                <SearchBar></SearchBar>
            </div>
            <div className='center top-bot-margin clickable bold' onClick={() => setShowGenres(!showGenres)}>
                <button className='explore-genres-button bold'>GENRE SELECTOR </button> {showGenres ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </div>
            {showGenres && <div className='explore-center'>
                <div className='explore-chips-container'>
                    {genres.map((genre) => (
                        <Chip key={genre + " - explore"} id={genre + " - explore"} data={genre} onClick={handleGenreClick} active={!selectedGenres.includes(genre)} />
                    ))}
                </div>
            </div>}
            <div className='center'>
                <button className='button' onClick={search}>Search</button>
            </div>

            <InfiniteScroll dataLength={cards.length} hasMore={!end} next={() => setPage((prevPage) => prevPage + 1)} loader={"Loading..."} endMessage={"no more"}>
                <Galery>
                    {cards.map((card) => <Card card={card} key={card.id} />)}
                </Galery>
            </InfiniteScroll>

        </>
    );
}