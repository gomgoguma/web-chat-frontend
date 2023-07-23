import chatApi from './ChatApi';
import React, { useState, useEffect } from "react";
import SockJsClient from "react-stomp";

import Content from "./Content";
import Input from "./Input";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(null);

    const onMessageReceived = (msg) => {
        console.log("New Message Received!!", msg);
        setMessages(messages.concat(msg));
    };

    useEffect(() => {
        setUser({ name: '곰고구마', color: '#5829A8' });
    }, []);

    const handleMessageSubmit = (msg) => {
        chatApi
            .sendMessage(user.name, msg)
            .then((res) => {
            console.log("sent", res);
            })
            .catch((e) => {
            console.log(e);
            });
    };

    return (
        <div>
          <SockJsClient
            url={"http://localhost:8080/my-chat/"}
            topics={["/topic/group"]}
            onConnect={console.log("connected!")}
            onDisconnect={console.log("disconnected!")}
            onMessage={(msg) => onMessageReceived(msg)}
            debug={false}
          />
          <Content messages={messages} currentUser={user} />
          <Input handleOnSubmit={handleMessageSubmit} />
        </div>
    );
}

export default Chat;