import api from "../http";

export default class UserService {
  static async fetchUsers() {
    return await api.get('/user/users');
  }

  static async changeUserData(data) {
    return await api.post('/user/changeData', data);
  }

  static async deleteUser(email) {
    return await api.post('/user/delete', { email });
  }
}
