import Interceptor from './Interceptor';
import { getUsername } from './TokenService';

const url = "readings";

export async function getReading(id) {
  try {
    const response = await Interceptor.get(`${url}/get/${getUsername()}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function checkReading(id) {
  try {
    const response = await Interceptor.get(`${url}/check/${getUsername()}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function putReading(id, spot) {
  try {
    const reading = {'username': getUsername(), 'document': id,'readingSpot': spot};
    const response = await Interceptor.put(url, JSON.stringify(reading));
    return response.data;
  } catch (error) {
    console.log("Esperando al refresco del token");
  }
}

export async function postReading(id) {
  const reading = {'username': getUsername(), 'document': id};
  console.log("enviando reading...");
  try {
    const response = await Interceptor.post(url, JSON.stringify(reading));
    return response.data;
  } catch (error) {
    console.log("Esperando al refresco del token");
    return null;
  }
}