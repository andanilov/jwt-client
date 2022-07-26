import axios from 'axios';
import config from '../conf';
import api from '../http';

export default class AuthService {

  static async login(email, password) {
    return await api.post('/user/login', { email, password }); 
  }

  static async registration(email, password, name) {
    return await api.post('/user/registration', { email, password, name });
  }

  static async remember(email) {
    return await api.post('/user/remember', { email });
  }

  static async logout() {
    return await api.post('/user/logout');
  }

  static async refresh() {
    // 1. Send request for pair tokens (access and refresh)
    const response = await axios.get(`${config.API_URL}/user/refresh`, {
      withCredentials: true, // automatically send cookie with request
    });

    // 2. Save access token to localStorage
    response?.data?.accessToken && localStorage.setItem('token', response.data.accessToken);
    
    return response;
  }

}