import s from './MainSC';
import { useState } from 'react';
import Header from '../../common/header/Header';
import ChatRoom from './chat-room/ChatRoom';
import ChatContent from './chat-content/ChatContent';

const Main = () => {
    const [selectedRoomId, setSelectedRoomId] = useState(0);

    return (
    <>
        <s.Container>            
            <Header />
            <s.Content>
                <ChatRoom setSelectedRoomId={setSelectedRoomId} selectedRoomId={selectedRoomId} />
                <ChatContent selectedRoomId={selectedRoomId} />
            </s.Content>
        </s.Container>
    </>
    );
}

export default Main;