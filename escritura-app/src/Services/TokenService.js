import jwt_decode from 'jwt-decode';

function setToken(token) {
    localStorage.setItem("token", token);
}

function getToken() {
    return localStorage.getItem("token");
}

function Logged() {
    if (getToken()) return true;
    else return false;
}

function getUsername() {
    if (!Logged()) return null

    const decodedToken = jwt_decode(getToken());

    return decodedToken.sub;
}

export default {
    setToken, Logged, getToken, getUsername,
};