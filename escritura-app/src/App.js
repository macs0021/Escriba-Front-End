import './App.css';
import TextEditor from './Views/TextEditor/TextEditor';
import Explore from './Views/Explore/Explore';
import Profile from './Views/Profile/Profile';
import Writting from './Views/Writting/Writting'
import Authentication from './Views/Authentication/Authentication';
import Document from './Components/Document/Document'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar/navBar';
import TokenService from './Services/TokenService';
import Home from './Views/Home/Home';
import Guard from './Guard/Guard';
import ProfileV2 from './Views/ProfileV2/ProfileV2';



function App() {

  const pathname = window.location.pathname ;
  console.log("LOGUEADO: " + TokenService.Logged());
  console.log("TOKEN: " + TokenService.getToken());
  console.log("USER: " + TokenService.getUsername());
  
  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route path="/authentication" element={<Authentication />} />
            <Route
              path="/profile"
              element={<Guard>
                <ProfileV2/>
              </Guard>}
            />
            <Route
              path="/"
              element={<Guard>
                <Home/>
              </Guard>}
            />
            <Route
              path="/reading"
              element={<Guard>
                <Writting/>
              </Guard>}
            />
            <Route
              path="/explore"
              element={<Guard>
                <Explore/>
              </Guard>}
            />
            <Route
              path="/write"
              element={<Guard>
                <Writting/>
              </Guard>}
            />
            <Route
              path="/documents/:id"
              element={<Guard>
                <TextEditor/>
              </Guard>}
            />
            <Route
              path="/documents/read/:id"
              element={<Guard>
                <Document/>
              </Guard>}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
