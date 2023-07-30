import s from './MainSC';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import ChatRoom from '../../common/chatRoom/ChatRoom';
import Header from '../../common/header/Header';
import ChatContent from '../../common/chatContent/ChatContent';

const Main = () => {
    const userInfo = useAuth();
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