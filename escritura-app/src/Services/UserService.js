import Interceptor from './Interceptor';
import TokenService from './TokenService';

const url = "user";

export async function getUser(username) {
    try {
        const response = await Interceptor.get(`${url}/${username}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function putUser(id, user) {
    try {
        const response = await Interceptor.put(`${url}/${id}`, JSON.stringify(user));
        return response.data;
    } catch (error) {
        console.error("Esperando al refresco del token");
    }
}

export async function followUser(following) {
    try {
        const response = await Interceptor.patch(`${url}/${following}/followers/${TokenService.getUsername()}`)
        return response.data;
    } catch (error) {
        console.error("Esperando al refresco del token");
    }
}

export async function getFollowers(username) {
    try {
        const response = await Interceptor.get(`${url}/${username}/followers`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getFollowing(username) {
    try {
        const response = await Interceptor.get(`${url}/${username}/following`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getRecommendations(username) {
    try {
        const response = await Interceptor.get(`${url}/recommendations/${username}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getSearch(username) {
    try {
        const response = await Interceptor.get(`${url}/contains/${username}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}