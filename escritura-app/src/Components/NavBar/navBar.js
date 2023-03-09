import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navBar.css'
import { Link } from 'react-router-dom';
import TokenService from '../../Services/TokenService';
import { useNavigate } from 'react-router-dom';
import BurguerButton from '../BurguerButton/BuguerButton';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CreateIcon from '@mui/icons-material/Create';
import Person2Icon from '@mui/icons-material/Person2';
import SearchIcon from '@mui/icons-material/Search';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

function NavBar() {

  const navigate = useNavigate();

  const [clicked, setClicked] = useState(false);

  const handleLogout = () => {
    TokenService.dropToken();
    navigate("/authentication")
  };

  const handleClick = () => {
    const icon = document.querySelector('.nav-icon');
    icon.classList.toggle("open");
    setClicked(!clicked);
  };
  const linkClick = () => {
    if (clicked) {
      const icon = document.querySelector('.nav-icon');
      icon.classList.toggle("open");
      setClicked(false);
    }
  };


  return <>
    <nav className='nav'>
      <h2> Escriba </h2>
      <div className={`links ${clicked ? 'links-active' : ''}`}>
        <div>
          <CustomLink to="/" className='item' onClick={linkClick}><HomeIcon className='button-icon' />Home</CustomLink>
        </div>
        <div>
          <CustomLink to="/reading" className='item' onClick={linkClick}><AutoStoriesIcon className='button-icon' /> Reading</CustomLink>
        </div>
        <div>
          <CustomLink to="/write" className='item' onClick={linkClick}><HistoryEduIcon className='button-icon' /> Writting</CustomLink>
        </div>
        <div>
          <CustomLink to="/profile" className='item' onClick={linkClick}><Person2Icon className='button-icon' />Profile</CustomLink>
        </div>
        <div>
          <CustomLink to="/explore" className='item' onClick={linkClick}><SearchIcon className='button-icon'></SearchIcon>Explore</CustomLink>
        </div>
        <div className='logout-button-container'>
          <LogoutIcon className='logout-button'> boton</LogoutIcon>
        </div>
      </div>
      <div className='burguer-container'>
        <BurguerButton handleClick={handleClick} clicked={clicked} />
      </div>
      <div className={`drop-background ${clicked ? 'drop-background-active' : ''}`}></div>
    </nav>
  </>
}

export default NavBar;

function CustomLink({ to, children, ...props }) {

  const path = window.location.pathname;

  return (
    <a className={path === to ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </a>
  )
}