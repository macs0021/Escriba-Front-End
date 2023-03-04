import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navBar.css'
import { Link } from 'react-router-dom';
import TokenService from '../../Services/TokenService';
import { useNavigate } from 'react-router-dom';

function NavBar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    // borra el token aquí
    TokenService.dropToken();
    navigate("/authentication")
  };


  return <nav className='nav'>
    <Link to="/" className='main-tittle'>Home</Link>
    <ul>
      <li>
        <CustomLink to="/reading" className='item'>Reading</CustomLink>
      </li>
      <li>
        <CustomLink to="/write" className='item'>Writting</CustomLink>
      </li>
      <li>
        <CustomLink to="/profile" className='item'>Profile</CustomLink>
      </li>
      <li>
        <CustomLink to="/explore" className='item'>Explore</CustomLink>
      </li>
      <li>
        <button onClick={handleLogout}>Logout</button>
      </li>
    </ul>
  </nav>
}

export default NavBar;

function CustomLink({ to, children, ...props }) {

  const path = window.location.pathname;

  return (
    <li className={path === to ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}