import s from './MainSC';
import roomApi from '../../api/RoomApi';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import SideMenu from '../../common/SideMenu/SideMenu';
import Header from '../../common/Header/Header';

const Main = () => {
    const userInfo = useAuth();

    const createRoom = async() => {
        const res = await roomApi.createRoom();
        console.log(res);
    }

    return (
        <>
            <Header />
            <s.Container>
                <SideMenu />
                <s.Content>
                    <button onClick={createRoom}> 채팅방 만들기 </button>
                </s.Content>
            </s.Container>
            
        </>
    );
}

export default Main;