import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
  // withCredentials: true; // enable this line when necessary, e.g. when using cross-origin server-side session
});

export default api;