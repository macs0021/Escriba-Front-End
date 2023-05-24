import './App.css';
import TextEditor from './Views/TextEditor/TextEditor';
import Explore from './Views/Explore/Explore';
import Writting from './Views/Writting/Writting'
import Authentication from './Views/Authentication/Authentication';
import Document from './Components/Document/Document'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import TokenService from './Services/TokenService';
import Home from './Views/Home/Home';
import Guard from './Guard/Guard';
import ProfileV2 from './Views/ProfileV2/ProfileV2';
import Reading from './Views/Reading/Reading';
import DocumentGuard from './Guard/DocumentGuard';
import PrivateDocumentGuard from './Guard/PrivateDocumentGuard';
import UrlDoesntExistGuard from './Guard/UrlDoesntExistGuard';

function App() {

  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route path="/authentication" element={<Authentication />} />
            <Route
              path="/profile/:username"
              element={<Guard>
                <ProfileV2 />
              </Guard>}
            />
            <Route
              path="/"
              element={<Guard>
                <Home />
              </Guard>}
            />
            <Route
              path="/reading"
              element={<Guard>
                <Reading />
              </Guard>}
            />
            <Route
              path="/explore"
              element={<Guard>
                <Explore />
              </Guard>}
            />
            <Route
              path="/write"
              element={<Guard>
                <Writting />
              </Guard>}
            />
            <Route
              path="/documents/:id"
              element={<Guard>
                <DocumentGuard>
                  <TextEditor />
                </DocumentGuard>
              </Guard>}
            />
            <Route
              path="/documents/read/:id"
              element={<Guard>
                <PrivateDocumentGuard>
                  <Document />
                </PrivateDocumentGuard>
              </Guard>}
            />
            <Route
              path="*"
              element={<Guard><UrlDoesntExistGuard /></Guard>}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
