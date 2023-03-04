import './Authentication.css'
import Logo from '../../files/logo.png'
import Register from '../../Components/Register/Register';
import Login from '../../Components/Login/Login';
import { useState } from 'react';

const Authentication = () => {

    const [inRegister, setInRegister] = useState(true);

    const link = <a className="authentication-login-link" onClick={() => setInRegister(!inRegister)}>login</a>;

    return (<>

        <div className='authentication-colunm-container'>
            <div className='authentication-colunm authentication-left-colunm'>
                <div className='authentication-tittle-background'>
                    <h1 className='authentication-tittle'>ESCRIBA</h1>
                </div>
                <div className='authentication-text-container'>
                    <p className='authentication-text'>
                        Un texto placeholder​ o sencillamente placeholder, también llamado en español texto provisional, ​ texto falso, ​ texto de marcador o texto de marcador de posición​, es un término prestado del inglés
                    </p>
                </div>
            </div>
            <div className='authentication-colunm authentication-right-colunm'>
                <div className='authentication-form-card'>
                    {inRegister ? (
                        <>
                            <Register setInRegister={setInRegister}></Register>
                            <p className="authentication-change-form">Already have an account? <a className="authentication-login-link" onClick={() => setInRegister(!inRegister)}>login</a></p>
                        </>
                    ) : (
                        <>
                            <Login></Login>
                            <p className="authentication-change-form">Dont you have an account? <a className="authentication-login-link" onClick={() => setInRegister(!inRegister)}>sign in</a></p>
                        </>
                    )}
                </div>
            </div>
        </div>

    </>
    );
}

export default Authentication;