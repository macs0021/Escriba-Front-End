import {useState } from "react";
import './Login.css'
import AuthService from "../../Services/AuthService";
import TokenService from "../../Services/TokenService";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const userObject = { username: user, password: password };

        AuthService.loginUser(userObject)
            .then((data) => {
                if (TokenService.Logged) {
                    navigate('/');
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    // La solicitud ha sido rechazada debido a falta de autenticación (401 Unauthorized)
                    setLoginError(true);
                } else {
                    console.log("Error en la solicitud");
                }
            });
    };

    const onUserChange = (value) =>{
        setUser(value);
        setLoginError(false);
    }

    const onPasswordChange = (value) =>{
        setPassword(value);
        setLoginError(false);
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-tittle center">Login now</h2>
            <div className="">
                <p className="">Email</p>
            </div>
            <input type="text" placeholder="User" value={user} onChange={(event) => onUserChange(event.target.value)} />
            <p className="">Password</p>
            <input type="password" placeholder="Contraseña" value={password} onChange={(event) => onPasswordChange(event.target.value)} />
            {loginError && <p className="login-form-error center">Incorrect credentials</p>}
            <div className="center column">
                <button type="submit" className="button">Login</button>
            </div>

        </form>
    );

}

export default Login;