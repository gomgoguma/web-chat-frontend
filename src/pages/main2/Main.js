import s from './MainSC';
import { useState } from 'react';
import Header from '../../common/header/Header';
import ChatRoom from './chat-room/ChatRoom';
import ChatContent from './chat-content/ChatContent';

const Main2 = () => {
    const [selectedRoom, setSelectedRoom] = useState();

    return (
    <>
        <s.Container>            
            <Header />
            <s.Content>
                <ChatRoom setSelectedRoom={setSelectedRoom} selectedRoom={selectedRoom} />
                <ChatContent selectedRoom={selectedRoom} />
            </s.Content>
        </s.Container>
    </>
    );
}

export default Main2;