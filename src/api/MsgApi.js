import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/msg',
  withCredentials: true,
});

const MsgApi = {
  getMsgs: async(roomId) => {
    try {
      const res = await api.get('', { params: { roomId } });
      return res;
    } catch (err) {
      return err;
    }
  }
};

export default MsgApi;