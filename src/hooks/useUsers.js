import { useDispatch, useSelector } from 'react-redux';
import UserService from '../services/UserService';
import { setLoading, setUser } from '../store/userSlice';

export function useUsers() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const changeUserData = async (data, setError, setMessage) => { 
    try {
      // 0. Set loading
      dispatch(setLoading({ isLoading: true }));

      // 1. Send request to change user data
      const response = await UserService.changeUserData(data);
      console.log('Response is ', response);

      // 2. Set success message
      setMessage((prevState) => [...prevState, 'Информация обновлена успешно!']);
      dispatch(setUser({ user: { ...user, name: data.name }}));
    } catch (e) {
      setError((prevState) => [...prevState, e.response?.data?.error]);
    } finally {      
      dispatch(setLoading({ isLoading: false }));
    }
  }

  const getUsers = async () => { 
    try {
      // 1. Get users from server
      const { data: usersService } = await UserService.fetchUsers();

      // 2. Prepare users data
      return usersService;      
    } catch (e) {
      console.log('Error', e.response?.data?.message);
    } finally {
    }
  }

  const deleteUser = async (email, setError, setMessage) => {
    try {
      await UserService.deleteUser(email);
      setMessage([`Пользователь ${email} Успешно удалён!`]);
    } catch (e) {
      setError([`При удалении пользователя ${email} произошла ошибка: ${e.response?.data?.message}`]);
    }
    return true;
  }

  return { getUsers, changeUserData, deleteUser };
}
