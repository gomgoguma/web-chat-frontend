import axios from 'axios';
import {ServerAddr} from '../config/Server';

const api = axios.create({
  baseURL: `${ServerAddr}/api/msg`,
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