import s from './ChatRoomSC';
import RoomApi from '../../api/RoomApi';
import AddUserModal from '../modal/addUserModal/AddUserModal';
import { useEffect, useState } from 'react';

const ChatRoom = ({setSelectedRoomId, selectedRoomId}) => {
  const [isAddUserModal, setIsAddUserModal] = useState(false);
  const [roomList, setRoomList] = useState([]);

  const getRooms = async() => {
    const res = await RoomApi.getRooms();
    if(res.status === 200) {
      setRoomList(res.data);
    }
  }
  
  useEffect(() => {
    getRooms();
  }, []);

  const getMessage = async(roomId) => {
    setSelectedRoomId(roomId);
  }

  return (
    <>
      <s.Container>
        <div onClick={() => setIsAddUserModal(true)} style={{width:'100%', height:'30px', cursor: 'pointer', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor: 'white', borderBottom: '1px solid black'}}> + </div>
        <s.RoomList>
          { roomList.map((el, index) =>  
            <s.RoomBox key={el.id} onClick={() => getMessage(el.id)} selected={el.id === selectedRoomId}>
              <s.RoomName>
                { el.id }
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