import { Token } from '@mui/icons-material';
import Interceptor from './Interceptor';
import TokenService from './TokenService';

const url = "readings";

async function getReading(id) {

    try {
        const response = await Interceptor.get(`${url}/${encodeURIComponent(id)}/${encodeURIComponent(TokenService.getUsername())}`);
        return response.data;
    } catch (error) {
        console.log("Esperando al refresco del token");
    }
}

async function putReading(id) {
    try {
        const response = await Interceptor.put(url, JSON.stringify(document));
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