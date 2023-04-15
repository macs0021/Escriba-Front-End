import Galery from '../../Components/Galery/Galery'
import './Explore.css'
import SearchBar from '../../Components/SearchBar/SearchBar';
import Chip from '../../Components/Chip/Chip';
import { useState, useEffect } from 'react';
import Card from '../../Components/Card/Card';
import DocumentService from '../../Services/DocumentService';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Explore() {

    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(0);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [end, setEnd] = useState(false);

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
        if (selectedGenres.length === 0) {
            DocumentService.getAllDocuments(page, 10).then(data => {
                setCards(prevCards => prevCards.concat(data));
                if (data.length < 10) {
                    setEnd(true);
                }
                console.log("datos: " + JSON.stringify(data));
            })
        } else {
            DocumentService.getDocumentsByGenreAndPage(selectedGenres, page, 10).then(data => {
                setCards(prevCards => prevCards.concat(data));
                if (data.length > 10) {
                    setEnd(true);
                }
            })
        }
    }, [page]);


    const search = () => {
        if (selectedGenres.length === 0) {
            DocumentService.getAllDocuments(page, 10).then(data => {
                setCards(data);
                if (data.length < 10) {
                    setEnd(true);
                }
                console.log("datos: " + JSON.stringify(data));
            })
        } else {
            DocumentService.getDocumentsByGenreAndPage(selectedGenres, page, 10).then(data => {
                setCards(data);
                if (data.length > 10) {
                    setEnd(true);
                }
            })
        }
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
            <div className='explore-center'>
                <div className='explore-search-container'>
                    <SearchBar></SearchBar>
                </div>
                <div className='explore-chips-container'>
                    {genres.map((genre) => (
                        <Chip key={genre + " - explore"} id={genre + " - explore"} data={genre} onClick={handleGenreClick} active={!selectedGenres.includes(genre)} />
                    ))}
                </div>
                <div className='center'>
                    <button onClick={search}>Search</button>
                </div>
            </div>

            <InfiniteScroll dataLength={cards.length} hasMore={!end} next={() => setPage((prevPage) => prevPage + 1)} loader={"Loading..."} endMessage={"no more"}>
                <Galery>
                    {cards.map((card) => <Card card={card} key={card.id} />)}
                </Galery>
            </InfiniteScroll>

        </>
    );
}