import { setToken, dropToken } from './TokenService';
import axios from 'axios';

const authUrl = "http://localhost:8080/auth";

export async function registerUser(user) {
    try {
        const response = await axios.post(`${authUrl}/register`, user);
        return response;
    } catch (error) {
        return error;
    }
}

export async function loginUser(user) {
    const response = await axios.post(`${authUrl}/login`, user);
    const token = response.data.token;

    if (token !== null) {
        setToken(token);
    }
    return response;
}

export function logoutUser() {
    dropToken();
}