import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/msg',
  withCredentials: true,
});

const MsgApi = {
  getMsgs: async(dto) => {
    try {
      const res = await api.get('', { params: dto });
      return res;
    } catch (err) {
      return err;
    }
  }
};

export default MsgApi;