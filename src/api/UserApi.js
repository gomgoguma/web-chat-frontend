import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/user',
  withCredentials: true,
});

const UserApi = {
  login: async (dto) => {
    try {
      const res = await api.post('/login', { username: dto.username, password: dto.password });
      return res;
    } catch (err) {
      return err;
    }
  },
  getUsers: async () => {
    try {
      const res = await api.get('');
      return res;
    } catch (err) {
      return err;
    }
  },
  check: async (dto) => {
    try {
      const res = await api.post('/check');
      return res;
    } catch (err) {
      return err;
    }
  }
};

export default UserApi;