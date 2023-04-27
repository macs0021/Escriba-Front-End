import './Authentication.css'
import Logo from '../../files/logo.png'
import Register from '../../Components/Register/Register';
import Login from '../../Components/Login/Login';
import { useState } from 'react';

const Authentication = () => {

    const [inRegister, setInRegister] = useState(true);

    const link = <a className="authentication-login-link" onClick={() => setInRegister(!inRegister)}>login</a>;

    return (<>

        <div className='authentication-background center'>
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

    </>
    );
}

export default Authentication;