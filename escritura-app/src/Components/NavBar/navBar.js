import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navBar.css'
import {Link} from 'react-router-dom';

function NavBar() {
  return <nav className='nav'>
  <Link to="/home" className='main-tittle'>Home</Link>
  <ul>
    <li>
    <CustomLink to="/Profile" className='item'>Prueba-1</CustomLink>
    </li>
    <li>
    <CustomLink to="/Explore" className='item'>Prueba-2</CustomLink>
    </li>
    <li>
    <CustomLink to="/" className='item'>Prueba-3</CustomLink>
    </li>
  </ul>
  </nav>
}

export default NavBar;

function CustomLink({to,children,...props}){

  const path = window.location.pathname;

  return(
    <li className={path === to ? "active" : ""}>
      <Link to={to} {...props}> 
        {children}
      </Link>
    </li>
  )
}