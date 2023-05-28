import './Authentication.css';
import Register from '../../Components/Register/Register';
import Login from '../../Components/Login/Login';
import { useState } from 'react';

const Authentication = () => {
  const [inRegister, setInRegister] = useState(true);

  return (
    <div className='authentication-background center'>
      <div className='authentication-form-card'>
        {inRegister ? (
          <>
            <Register setInRegister={setInRegister} />
            <p className="authentication-change-form">Already have an account? <span className="authentication-login-link" onClick={() => setInRegister(!inRegister)}>login</span></p>
          </>
        ) : (
          <>
            <Login />
            <p className="authentication-change-form">Don't you have an account? <span className="authentication-login-link" onClick={() => setInRegister(!inRegister)}>sign in</span></p>
          </>
        )}
      </div>
    </div>
  );
};

export default Authentication;