import { useDispatch } from 'react-redux';
import UserService from '../services/UserService';
import { setLoading } from '../store/userSlice';

export function useUsers() {
  const dispatch = useDispatch();  

  const getUsers = async () => { 
    try {
      // 0. Set loading
      dispatch(setLoading({ isLoading: true }));

      // 1. Get users from server
      const response = await UserService.fetchUsers();
      console.log('Response is ', response);

      // 2. unset loading
      dispatch(setLoading({ isLoading: false }));

      // 3. Return users
      return response.data;

    } catch (e) {
      dispatch(setLoading({ isLoading: false }));
      console.log('Error', e.response?.data?.message);
    }
  }

  return { getUsers };
}