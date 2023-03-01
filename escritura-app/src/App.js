import './App.css';
import TextEditor from './Views/TextEditor/TextEditor';
import Explore from './Views/Explore/Explore';
import Profile from './Views/Profile/Profile';
import Writting from './Views/Writting/Writting'
import Home from './Views/Home/Home';
import Document from './Components/Document/Document'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar/navBar';

function App() {
  return (
    <>
    <Router>
      <NavBar/>
      <div className='container'>
      <Routes>
        <Route path="/authentication" element = {<Home/>}/>
        <Route path="/profile" element = {<Profile/>}/>
        <Route path="/explore" element = {<Explore/>}/>
        <Route path="/write" element = {<Writting/>}/>
        <Route path="/documents/:id" element = {<TextEditor/>}/>
        <Route path="/documents/read/:id" element = {<Document/>}/>
      </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
