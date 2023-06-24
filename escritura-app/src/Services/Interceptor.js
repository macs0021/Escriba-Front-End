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
Interceptor.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      const newToken = await refreshToken();
      setToken(newToken.data.token);
      error.config.headers['Authorization'] = `Bearer ${newToken.data.token}`;
      return axios(error.config);
    }else if(error.config._retry){
      const navigate = useNavigate();
      logoutUser();
      navigate("/authentication")
    }
    throw error;
  }
);

export default Interceptor;