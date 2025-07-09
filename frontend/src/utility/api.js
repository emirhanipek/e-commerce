import axios from 'axios';

export const API_URL = 'http://localhost:8000';

export function api() {
  return axios.create({
    baseURL: API_URL
  });
}