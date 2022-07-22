import AuthService from '../services/AuthService';
import { useDispatch } from 'react-redux';
import { setAuth, setUser, setLoading } from '../store/userSlice';

export function useAuth() {
  const dispatch = useDispatch();

  const login = async (email, password) => {
    try {
      // 1. Login in server by AuthService
      const response = await AuthService.login(email, password);
      console.log('login: ', response);

      // 2. Set the token from server to localStorage
      response.data.accessToken && localStorage.setItem('token', response.data.accessToken);
      
      // 3. Set user info to global state
      dispatch(setAuth({ isAuth: true }));
      dispatch(setUser({ user: response.data.user }));
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };

  const registration = async (email, password, name) => {
    try {
      // 1. Register in server by AuthService
      const response = await AuthService.registration(email, password, name);
      console.log('registration: ', response);

      // 2. Set the token from server to localStorage
      response.data.accessToken && localStorage.setItem('token', response.data.accessToken);

      // 3. Set user info to global state
      dispatch(setAuth({ isAuth: true }));
      dispatch(setUser({ user: response.data.user }));
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };

  const logout = async () => {
    try {
      // 1. Logout from server by Service
      const response = await AuthService.logout();
      console.log('logout: ', response);

      // 2. Delete token from LocalStorage
      localStorage.removeItem('token');

      // 3. Update user info to global state
      dispatch(setAuth({ isAuth: false }));
      dispatch(setUser({ user: {} }));

    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  const checkAuth = async () => {
    try {      
      // 0. Set Loading
      dispatch(setLoading({ isLoading: true }));

      // 1. Get pair accesToken and RefreshToken
      // const response = await axios.get(`${config.API_URL}/user/refresh`, {
      //   withCredentials: true, // automatically send cookie with request
      // });
      const response = await AuthService.refresh();
      console.log('checkAuth: ', response);

      // 2. Set accessToken and update user info
      // response.data.accessToken && localStorage.setItem('token', response.data.accessToken);
      dispatch(setAuth({ isAuth: true }));
      dispatch(setUser({ user: response.data.user }));
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      // Delete loading
      dispatch(setLoading({ isLoading: false }));
    }
  }

  return { registration, login, logout, checkAuth }
}