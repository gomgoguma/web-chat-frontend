import s from './SideMenuSC';
import roomApi from '../../api/RoomApi';
import AddUserModal from '../Modal/AddUserModal.js/AddUserModal';
import { useState } from 'react';

const SideMenu = () => {
  const [isAddUserModal, setIsAddUserModal] = useState(false);
  const list = [{name: '고구마', recentMessage: '안녕'},{name: '감자', recentMessage: '안녕'},{name: '버섯', recentMessage: '안녕'}];

  const createRoom = async() => {
    const res = await roomApi.createRoom();
    console.log(res);
  }
  
  const getMessage = async => {
    alert(`메시지 가져오기`);
    //to-do
    //mongo db 조회
  }

  return (
    <>
      <s.Container>
        <button onClick={() => setIsAddUserModal(true)}> 대화 상대 추가 </button>
          { list.map(el =>  
            <s.RoomBox onClick={getMessage}>
              <s.RoomName>
                  { el.name }
              </s.RoomName>
              <s.RecentMessage>
                  { el.recentMessage }
              </s.RecentMessage>
            </s.RoomBox>
          ) }
      </s.Container>
      {isAddUserModal && <AddUserModal closeModal={() => setIsAddUserModal(false) } /> }
    </>
  );
}
export default SideMenu;