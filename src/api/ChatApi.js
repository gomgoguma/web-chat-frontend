import axios from 'axios';
import {ServerAddr} from '../config/Server';

const api = axios.create({
  baseURL: `${ServerAddr}/api/chat`,
  withCredentials: true,
});

const ChatApi = {
    getMessages: (groupId) => {
        console.log("Calling get messages from API");
        return api.get(`/messages/${groupId}`);
    },
    sendMessage: (dto) => {
        return api.post(`/send`, dto);
    },
};

export default ChatApi;