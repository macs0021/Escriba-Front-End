import axios from 'axios';
import TokenService from './TokenService';

const Interceptor = axios.create({
  baseURL: 'http://localhost:8080/',
});

Interceptor.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken();
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

export default Interceptor;