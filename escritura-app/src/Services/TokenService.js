import jwt_decode from 'jwt-decode';
import axios from 'axios';

export function setToken(token) {
  if (token !== null)
    localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export async function refreshToken() {
  const token = getToken();
  const response = await axios.post('http://localhost:8080/auth/refresh', { "token": token });
  return response;
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