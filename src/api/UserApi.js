import axios from 'axios';
import {ServerAddr} from '../config/Server';

const api = axios.create({
  baseURL: `${ServerAddr}/api/user`,
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
  getUsers: async (dto) => {
    try {
      const res = await api.get('', {params: dto});
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
  },
  signUp: async (obj) => {
    try {
      const res = await api.post('', obj);
      return res;
    } catch (err) {
      return err;
    }
  },
};

export default UserApi;