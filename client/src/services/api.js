import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get the token from storage (you can modify this based on your implementation)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach the token to the Authorization header
    console.log(token);
  }
  return config;
});

export default api;
