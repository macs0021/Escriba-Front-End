import Galery from '../../Components/Galery/Galery'
import './Explore.css'
import SearchBar from '../../Components/SearchBar/SearchBar';
import Chip from '../../Components/Chip/Chip';
import { useState, useEffect } from 'react';
import Card from '../../Components/Card/Card';
import DocumentService from '../../Services/DocumentService';

export default function Explore() {

    const [cards, setCards] = useState([]);

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
        DocumentService.getAllDocuments().then(data => {
            setCards(data);
        })
    }, []);

    const [selectedGenres, setSelectedGenres] = useState([]);

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
                        <Chip key={genre} data={genre} onClick={handleGenreClick} />
                    ))}
                </div>
                <div className='center'>
                    <button>Search</button>
                </div>
            </div>
            <Galery>
                {cards.map((card) => <Card card={card} key={card.id} />)}
            </Galery>
        </>
    );
}