import jwt_decode from 'jwt-decode';
import axios from 'axios';

function setToken(token) {
    localStorage.setItem("token", token);
}

function getToken() {
    return localStorage.getItem("token");
}

async function refreshToken() {
    const token = this.getToken();
    return axios.post('http://localhost:8080/auth/refresh', { "token": token });
}

function Logged() {
    if (getToken()) return true;
    else return false;
}

function getUsername() {
    if (!Logged()) return null
    try {
        const decodedToken = jwt_decode(getToken());

        return decodedToken.sub;
    } catch {
        return "";
    }
}
function dropToken() {
    localStorage.removeItem('token');
}



export default {
    setToken, Logged, getToken, getUsername, dropToken, refreshToken,
};