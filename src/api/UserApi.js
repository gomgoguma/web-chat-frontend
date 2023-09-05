import CreateApi from '../config/Api';

const UserApi = () => {
  const api = CreateApi({
    resource: 'user',
    requireAuth: false
  });

  const authApi = CreateApi({
    resource: 'user',
    requireAuth: true
  });

  const loginApi = CreateApi({
    resource: 'user',
    requireAuth: false,
    requireCredentials: true
  });

  const userApi = {
    login: async (dto) => {
      try {
        const res = await loginApi.post('/login', { username: dto.username, password: dto.password });
        return res;
      } catch (err) {
        return err;
      }
    },
    getUsers: async (dto) => {
      try {
        const res = await authApi.get('', {params: dto});
        return res;
      } catch (err) {
        return err;
      }
    },
    check: async (dto) => {
      try {
        const res = await authApi.post('/check');
        return res;
      } catch (err) {
        return err;
      }
    },
    signUp: async (obj) => {
      try {
        const res = await api.post('/signup', obj);
        return res;
      } catch (err) {
        return err;
      }
    },
  };

  return userApi;
}

export default UserApi;