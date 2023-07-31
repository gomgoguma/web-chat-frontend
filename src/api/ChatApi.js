import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/chat',
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