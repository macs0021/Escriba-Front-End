import axios from 'axios';
import { getToken, setToken, refreshToken } from './TokenService';
import { logoutUser } from './AuthService';
import { useNavigate } from 'react-router-dom';

const Interceptor = axios.create({
  baseURL: 'http://localhost:8080/',
});

// Añado el token a la cabecera de todas las peticiones.
Interceptor.interceptors.request.use(
  (config) => {
    const token = getToken();
    console.log("ENVIANDO TOKEN " + token)
    console.log(`Making a ${config.method.toUpperCase()} request to ${config.url}`);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Si el token está caducado se pide otro y se envía la petición de nuevo
let isRefreshing = false;
let freshTokenPromise = null;

Interceptor.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response: { status } } = error;
    const originalRequest = config;

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        freshTokenPromise = refreshToken()
          .then(({data}) => {
            isRefreshing = false;
            setToken(data.token);
            return data.token;
          })
          .catch((err) => {
            isRefreshing = false;
            return Promise.reject(err);
          });
      }
      return freshTokenPromise
        .then((token) => {
          console.log("ENVIANDO TOKEN EN REFRESCO" + token)
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axios(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }
    return Promise.reject(error);
  }
);

export default Interceptor;