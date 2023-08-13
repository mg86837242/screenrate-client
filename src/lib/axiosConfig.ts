import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
  // withCredentials: true; // enable this line when necessary, e.g. when using cross-origin server-side session
});
