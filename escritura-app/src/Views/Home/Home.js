import './Home.css'
import Logo from '../../files/logo.png'
import Identification from '../Identification/Identification';
import Register from '../../Components/Register/Register';
import Login from '../../Components/Login/Login';
import { useState } from 'react';

const Home = () => {

    const [inRegister, setInRegister] = useState(true);

    const link = <a className="home-login-link" onClick={() => setInRegister(!inRegister)}>login</a>;

    return (<>

        <div className='home-colunm-container'>
            <div className='home-colunm home-left-colunm'>
                <div className='home-tittle-background'>
                    <h1 className='home-tittle'>ESCRIBA</h1>
                </div>
                <div className='home-text-container'>
                    <p className='home-text'>
                        Un texto placeholder​ o sencillamente placeholder, también llamado en español texto provisional, ​ texto falso, ​ texto de marcador o texto de marcador de posición​, es un término prestado del inglés
                    </p>
                </div>
            </div>
            <div className='home-colunm home-right-colunm'>
                <div className='home-form-card'>
                    {inRegister ? (
                        <>
                            <Register></Register>
                            <p className="home-change-form">Already have an account? <a className="home-login-link" onClick={() => setInRegister(!inRegister)}>login</a></p>
                        </>
                    ) : (
                        <>
                            <Login></Login>
                            <p className="home-change-form">Dont you have an account? <a className="home-login-link" onClick={() => setInRegister(!inRegister)}>sign in</a></p>
                        </>
                    )}
                </div>
            </div>
        </div>

    </>
    );
}

export default Home;