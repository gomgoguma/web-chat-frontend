import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/room',
  withCredentials: true,
});

const RoomApi = {
  createRoom: async (dto) => {
    try {
      const res = await api.post('', { userIdList : [3] });
      return res;
    } catch (err) {
      return err;
    }
  },
};

export default RoomApi;