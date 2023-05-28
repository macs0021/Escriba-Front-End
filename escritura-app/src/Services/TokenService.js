import jwt_decode from 'jwt-decode';
import axios from 'axios';

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export async function refreshToken() {
  const token = getToken();
  return axios.post('http://localhost:8080/auth/refresh', { "token": token });
}

export function Logged() {
  if (getToken()) return true;
  else return false;
}

export function getUsername() {
  if (!Logged()) return null;
  try {
    const decodedToken = jwt_decode(getToken());
    return decodedToken.sub;
  } catch {
    return "";
  }
}

export function dropToken() {
  localStorage.removeItem('token');
}