import s from './MainSC';
import { useState } from 'react';
import Header from '../../common/header/Header';
import ChatRoom from './chat-room/ChatRoom';
import ChatContent from './chat-content/ChatContent';

const Main = () => {
    const [selectedRoom, setSelectedRoom] = useState();
    const [msgList, setMsgList] = useState([]);

    return (
    <>
        <s.Container>            
            <Header />
            <s.Content>
                <ChatRoom setSelectedRoom={setSelectedRoom} selectedRoom={selectedRoom} msgList={msgList} setMsgList={setMsgList}/>
                <ChatContent selectedRoom={selectedRoom} msgList={msgList} setMsgList={setMsgList}/>
            </s.Content>
        </s.Container>
    </>
    );
}

export default Main;