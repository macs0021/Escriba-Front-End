import { Token } from '@mui/icons-material';
import Interceptor from './Interceptor';
import TokenService from './TokenService';

const url = "user";

async function getUser(username) {
    try {
        const response = await Interceptor.get(`${url}/${username}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function putUser(username, user) {
    try {
        const response = await Interceptor.put(`${url}/${username}`, JSON.stringify(user));
        return response.data;
    } catch (error) {
        console.log("Esperando al refresco del token");
    }
}
async function followUser(following) {
    try {
        const response = await Interceptor.patch(`${url}/${following}/followers/${TokenService.getUsername()}`)
        return response.data;
    } catch (error) {
        console.log("Esperando al refresco del token");
    }
}


export default {
    getUser,
    putUser,
    followUser,
};