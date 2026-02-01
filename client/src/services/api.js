import axios from 'axios';

// 1. Determine the URL
// If VITE_API_URL is set (in .env), use it. Otherwise, default to localhost:5000
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
});

// 2. Automatically attach the Admin Token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;