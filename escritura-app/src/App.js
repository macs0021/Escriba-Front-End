import './App.css';
import TextEditor from './Components/TextEditor/TextEditor';
import Explore from './Components/Explore/Explore';
import Profile from './Components/Profile/Profile';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar/navBar';

function App() {
  return (
    <>
    <Router>
      <NavBar/>
      <div className='container'>
      <Routes>
        <Route path="/home" element = {<Home/>}/>
        <Route path="/profile" element = {<Profile/>}/>
        <Route path="/explore" element = {<Explore/>}/>
        <Route path="/documents/:id" element = {<TextEditor/>}/>
      </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
