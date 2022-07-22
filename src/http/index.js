// Axios preference
import axios from 'axios';
import config from '../conf';
import AuthService from '../services/AuthService';

// export const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  withCredentials: true, // add cookie to request auto
  baseURL: config.API_URL,
});

// --- Interceptors - functions, called before axios act
// 1. For request - add authorization token to request header
api.interceptors.request.use((config) => { // config like axios config
// Put token from localStorage to request header
  config.headers.Authorization = `Bearer ${localStorage.getItem('token') ?? ''}`;
  return config;
});
// .use(resolveCallback, rejectCallback);

// 2. For response - if 401 go to refresh token and repeat original request (one time)
api.interceptors.response.use((config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        // 1. Request to refresh tokens and save access token ti localStorage
        const response = await AuthService.refresh();
      
        // 2. Repeat original request
        return api.request(originalRequest);      
      } catch (e) {
        console.log('Не авторизован!');
      }
    }
    throw error;
  }
);

export default api;
