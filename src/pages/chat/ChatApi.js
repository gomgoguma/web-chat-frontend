import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/kafka',
  withCredentials: true,
});

const ChatApi = {
    getMessages: (groupId) => {
        console.log("Calling get messages from API");
        return api.get(`/messages/${groupId}`);
    },
    sendMessage: (username, text) => {
        let msg = {
            author: username,
            content: text,
        };
        return api.post(`/publish`, msg, {
            headers: { "Content-Type": "application/json" },
        });
    },
};

export default ChatApi;