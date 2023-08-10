import axios from 'axios';
import {ServerAddr} from '../config/Server';

const api = axios.create({
  baseURL: `${ServerAddr}/api/room`,
  withCredentials: true
});

const RoomApi = {
  createRoom: async(obj) => {
    try {
      const res = await api.post('', obj);
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
  },
  deleteRoom: async(obj) => {
    try {
      const res = await api.delete('', { params: obj });
      return res;
    } catch (err) {
      return err;
    }
  }
};

export default RoomApi;