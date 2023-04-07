import Interceptor from './Interceptor';
import TokenService from './TokenService';
import axios from 'axios';

const authUrl = "http://localhost:8080/auth";

async function registerUser(user) {
    try {
        const response = await axios.post(authUrl + "/register", user);
        return response;
    } catch (error) {
        return error;
    }
}

async function loginUser(user) {
    try {
        const response = await axios.post(authUrl + "/login", user);
        const token = response.data.token;
        console.log(response.data.token);

        TokenService.setToken(token);

        TokenService.getUsername();

        return response;

    } catch (error) {
        return error;
    }
}

function logoutUser(){
    TokenService.dropToken();
}

export default {
    registerUser,
    loginUser,
    logoutUser,
};