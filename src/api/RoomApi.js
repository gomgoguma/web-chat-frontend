import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/room',
  withCredentials: true,
});

const RoomApi = {
  createRoom: async (dto) => {
    try {
      const res = await api.post('', dto);
      return res;
    } catch (err) {
      return err;
    }
  },
  getRooms: async() => {
    try {
      const res = await api.get('');
      return res;
    } catch (err) {
      return err;
    }
  }
};

export default RoomApi;