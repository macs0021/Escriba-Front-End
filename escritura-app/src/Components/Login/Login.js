import { useState } from "react";
import './Login.css'
import AuthService from "../../Services/AuthService";
import TokenService from "../../Services/TokenService";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const userObject = { "username": user, "password": password };

        AuthService.loginUser(userObject).then(data => {
            if (TokenService.Logged) {
                navigate('/');
            }

        })

    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="login-tittle">Login now</h2>
            <p className="login-form-error"></p>
            <input type="text" placeholder="User" value={user} onChange={(event) => setUser(event.target.value)} />
            <p className="login-form-error"></p>
            <input type="password" placeholder="Contraseña" value={password} onChange={(event) => setPassword(event.target.value)} />
            <button type="submit" className="login-button">Iniciar sesión</button>
        </form>
    );

}

export default Login;