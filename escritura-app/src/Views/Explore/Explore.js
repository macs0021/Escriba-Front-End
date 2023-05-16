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
import MiniProfile from '../../Components/MiniProfile/MiniProfile'
import { followUser } from '../../Services/UserService';
import TokenService from '../../Services/TokenService';
import Loader from '../../Components/Loader/Loader';
import { getSearch } from '../../Services/UserService';
import Modal from '../../Components/Modal/Modal';

export default function Explore() {

    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(0);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [end, setEnd] = useState(false);
    const [showGenres, setShowGenres] = useState(false);
    const [searchBarValue, setSearchBarValue] = useState("");
    const [users, setUsers] = useState([])
    const [showUsers, setShowUsers] = useState(false);
    const [usersModalState, setUsersModalState] = useState(false);

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

    const handleFollow = (username) => {
        followUser(username);
    }

    useEffect(() => {
        documentsPetition();
    }, [page]);

    const documentsPetition = () => {
        DocumentService.getDocumentsByGenreAndPage(selectedGenres, searchBarValue, page, 12).then(data => {
            setCards(prevCards => prevCards.concat(data));
            if (data.length < 12) {
                setEnd(true);
            } else {
                setEnd(false);
            }
        })
    }


    const getSearchedUsers = () => {
        getSearch(searchBarValue).then((result) => {
            const username = TokenService.getUsername();
            const updatedUsers = result.filter(user => user.name !== username);
            console.log("USERNAMES:" + JSON.stringify(updatedUsers))
            setUsers(updatedUsers);
        });
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

        if (searchBarValue !== "") {
            getSearchedUsers();
            setShowUsers(true);
        } else {
            setShowUsers(false);
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
            <div className='explore-search-container'>
                <SearchBar value={searchBarValue} setValue={setSearchBarValue}></SearchBar>
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
            <div className='center explore-search'>
                <button className='button' onClick={search}>Search</button>
            </div>

            {showUsers && <div className='explore-users-div center column' style={{ marginBottom: '1rem' }}>
                <div className="explore-users-result center" style={{ marginTop: '1rem', marginBottom: '1rem', gap: '2rem' }}>
                    {Array.from({ length: 4 }).map((_, index) => {
                        if (index < users?.length) {
                            return (
                                <div key={index} style={{ backgroundColor: 'white', padding: '10px', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)' }}>
                                    <MiniProfile handleFollow={handleFollow} user={users[index]}></MiniProfile>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                <div className='bold clickable' onClick={() => setUsersModalState(true)}>explore users</div>
            </div>}
            <InfiniteScroll dataLength={cards.length} hasMore={!end} next={() => setPage((prevPage) => prevPage + 1)} loader={<div className='center'><Loader></Loader></div>} endMessage={""}>
                <Galery>
                    {cards.map((card) => <Card card={card} key={card.id} />)}
                </Galery>
            </InfiniteScroll>

            <Modal modalState={usersModalState} setModalState={setUsersModalState} tittle={"Searched users"} fullscreen={true}>
                <div className='mini-profile-container modal-space' style={{ overflow: 'auto' }}>
                    {users.map((user) =>
                        <MiniProfile user={user} handleFollow={handleFollow}></MiniProfile>
                    )}
                </div>
            </Modal>

        </>
    );
}