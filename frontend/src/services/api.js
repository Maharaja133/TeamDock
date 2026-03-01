// src/api/axios.js (or wherever your instance is)
import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true // This automatically attaches the httpOnly cookie
});

export default instance;
