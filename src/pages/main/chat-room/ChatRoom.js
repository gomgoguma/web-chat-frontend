import s from './ChatRoomSC';
import RoomApi from '../../../api/RoomApi';
import AddUserModal from '../../../common/modal/addUserModal/AddUserModal';
import { useEffect, useState } from 'react';

const ChatRoom = ({setSelectedRoom, selectedRoom}) => {
  const [isAddUserModal, setIsAddUserModal] = useState(false);
  const [roomList, setRoomList] = useState([]);

  const getRooms = async() => {
    const res = await RoomApi.getRooms();
    if(res.status === 200) {
      if(res.data.resCd === 200) {
        setRoomList(res.data.data);
        console.log(res.data.data);
      }
      else {
        alert(res.data.resMsg);
      }
    }
    else {
      alert('오류가 발생했습니다.');
    }
  }
  
  useEffect(() => {
    getRooms();
  }, []);

  const getMessage = async(el) => {
    setSelectedRoom(el);
  }

  return (
    <>
      <s.Container>
        <div onClick={() => setIsAddUserModal(true)} style={{width:'100%', height:'30px', cursor: 'pointer', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor: 'white', borderBottom: '1px solid black'}}> + </div>
        <s.RoomList>
          { roomList.map((el, index) =>  
            <s.RoomBox key={el.id} onClick={() => getMessage(el)} selected={el.id === selectedRoom?.id}>
              <s.RoomName>
                { el.roomName }
              </s.RoomName>
              <s.RecentMessage>
                { el.recentMessage }
              </s.RecentMessage>
            </s.RoomBox>
          ) }
        </s.RoomList>
      </s.Container>
      {isAddUserModal && <AddUserModal closeModal={() => setIsAddUserModal(false) } getRooms={getRooms} /> }
    </>
  );
}
export default ChatRoom;