import axios from 'axios';

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  // timeout: 20_000,
  // withCredentials: true; // enable this line when necessary, e.g. when using cross-origin server-side session
});
