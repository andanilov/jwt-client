import AuthService from '../services/AuthService';
import { useDispatch } from 'react-redux';
import { setAuth, setUser, setLoading, setAuthError, setAuthMessage, setPopUpAuthType } from '../store/userSlice';

export function useAuth() {
  const dispatch = useDispatch();

  const login = async (email, password) => {
    try {
      // 1. Login in server by AuthService
      const response = await AuthService.login(email, password);

      // 2. Set the token from server to localStorage
      response.data.accessToken && localStorage.setItem('token', response.data.accessToken);
      
      // 3. Set user info to global state
      dispatch(setAuth({ isAuth: true }));
      dispatch(setUser({ user: response.data.user }));

      // 4. Clear and close form data
      _formData({ err: '', msg: '', type: '' });
    } catch (e) {
      dispatch(setAuthError(e.response?.data?.error));
    }
  };

  const registration = async (email, password, name) => {
    try {
      // 1. Register in server by AuthService
      const response = await AuthService.registration(email, password, name);

      // 2. Set the token from server to localStorage
      response.data.accessToken && localStorage.setItem('token', response.data.accessToken);

      // 3. Set user info to global state
      dispatch(setAuth({ isAuth: true }));
      dispatch(setUser({ user: response.data.user }));
      
      // 4. Message output
      _formData({ err: '', type: 'log', msg: `
        Благодарим за регистрацию!\n
        На Ваш Email ${email} было отправлено письмо\n
        с ссылкой на подтверждение Вашего аккаунта!
      `});      
    } catch (e) {
      dispatch(setAuthError(e.response?.data?.error));
    }
  };

  const remember = async (email) => {
    try {
      const response = await AuthService.remember(email);
    } catch (e) {
      dispatch(setAuthError(e.response?.data?.error));
    }
  };

  const logout = async () => {
    try {
      // 1. Logout from server by Service
      const response = await AuthService.logout();

      // 2. Delete token from LocalStorage
      localStorage.removeItem('token');

      // 3. Update user info to global state
      dispatch(setAuth({ isAuth: false }));
      dispatch(setUser({ user: {} }));

      // 4. Clear and close form data
      _formData({ err: '', msg: '', type: '' });
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };

  const checkAuth = async () => {
    try {      
      // 0. Set Loading
      dispatch(setLoading({ isLoading: true }));

      // 1. Get pair accesToken and RefreshToken
      const response = await AuthService.refresh();
      // console.log('checkAuth: ', response);

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
  };

  const _formData = ({ err, msg, type }) => {    
    dispatch(setPopUpAuthType(type));
    dispatch(setAuthError(err));
    dispatch(setAuthMessage(msg));
  };

  return { registration, login, logout, checkAuth, remember }
}
