// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  // Point directly to the Vercel proxy route, not the external URL
  baseURL: '/api', 
  withCredentials: true 
});

export default instance;