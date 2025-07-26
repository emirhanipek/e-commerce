import axios from 'axios';

// Çevre değişkenlerinden API URL'lerini al
export const API_URL = process.env.REACT_APP_API_URL;
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function api() {
  return axios.create({
    baseURL: API_BASE_URL
  });
}