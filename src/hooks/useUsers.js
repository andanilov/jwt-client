import { useDispatch, useSelector } from 'react-redux';
import UserService from '../services/UserService';
import { setUser } from '../store/userSlice';
import { useLoading } from '../components/UI/Loading/LoadingContext';
import { useAlert } from '../components/UI/Alert/AlertContext';

export function useUsers() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { setLoading, unsetLoading } = useLoading();
  const { setAlert } = useAlert();

  // { actor, user, password, name, newPassword, access }
  const changeUserData = async (data) => {
    try {
      // 0. Set loading and delete msg
      setLoading();

      // 1. Send request to change user data
      const response = await UserService.changeUserData(data);
      console.log('Response is ', response);

      // 2. Set success message
      setAlert('Информация обновлена успешно!', 'success');
      dispatch(setUser({ user: { ...user, name: data.name }}));
    } catch (e) {
      setAlert(`Информацию обновить не удалось: ${e.response?.data?.error}!`, 'error');
    } finally {      
      unsetLoading();
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

  const deleteUser = async (email) => {
    try {
      await UserService.deleteUser(email);
      setAlert(`Пользователь ${email} Успешно удалён!`, 'success');
    } catch (e) {      
      setAlert(`При удалении пользователя ${email} произошла ошибка: ${e.response?.data?.message}`, 'error');
    }
    return true;
  }

  return { getUsers, changeUserData, deleteUser };
}
