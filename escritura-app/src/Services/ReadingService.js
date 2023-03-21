import { Token } from '@mui/icons-material';
import Interceptor from './Interceptor';
import TokenService from './TokenService';

const url = "readings";

async function getReading(id) {
    try {
        const response = await Interceptor.get(`${url}/get/${id}/${TokenService.getUsername()}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function putReading(id, spot) {
    try {
        const reading = {'username': TokenService.getUsername(), 'document': id,'readingSpot': spot}
        const response = await Interceptor.put(url, JSON.stringify(reading));
        return response.data;
    } catch (error) {
        console.log("Esperando al refresco del token");
    }
}

async function postReading(id) {
    const reading = {'username': TokenService.getUsername(), 'document': id}
    console.log("enviando reading...")
    try {
        const response = await Interceptor.post(url, JSON.stringify(reading));
        return response.data;
    } catch (error) {
        console.log("Esperando al refresco del token");
    }
}

export default {
    getReading,
    putReading,
    postReading,
};