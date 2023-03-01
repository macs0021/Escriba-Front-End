import Interceptor from './Interceptor';
import TokenService from './TokenService';

const registerUrl = "http://localhost:8080/user";
const loginUrl = "http://localhost:8080/login";

async function registerUser(user) {
    try {
        const response = await Interceptor.post(registerUrl, user);
        return response;
    } catch (error) {
        return error;
    }
}

async function loginUser(user) {
    try {
        const response = await Interceptor.post(loginUrl, user);
        const bearerToken = response.headers.authorization;

        const token = bearerToken.replace("Bearer ","");

        TokenService.setToken(token);

        TokenService.getUsername();

        return response;

    } catch (error) {
        return error;
    }
}

export default {
    registerUser,
    loginUser,
};