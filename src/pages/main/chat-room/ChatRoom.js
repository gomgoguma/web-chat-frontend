import s from './ChatRoomSC';
import RoomApi from '../../../api/RoomApi';
import AddUserModal from '../../../common/modal/addUserModal/AddUserModal';
import { useEffect, useState } from 'react';
import Text from '../../../common/text/Text';

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

  const deleteRoom = async(id) => {
    const res = await RoomApi.deleteRoom({roomId: id});
    if(res.status === 200) {
      if(res.data.resCd === 200) {
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

  return (
    <>
      <s.Container>
        <div onClick={() => setIsAddUserModal(true)} style={{width:'100%', height:'30px', cursor: 'pointer', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor: 'white', borderBottom: '1px solid #bbb'}}> + </div>
        <s.RoomList>
          { roomList.map((el, index) =>  
            <s.RoomBox key={el.id} onClick={() => getMessage(el)} selected={el.id === selectedRoom?.id}>
              <s.RoomName>
                <Text fontSize={'15px'} fontWeight={'700'}>{ el.roomName }</Text>
              </s.RoomName>
              <s.RecentMessage>
                <Text fontSize={'15px'} fontWeight={'100'}>안녕하세요{ el.recentMessage }</Text>
              </s.RecentMessage>
              <s.RoomBtn onClick={() => deleteRoom(el.id)}>x</s.RoomBtn>
            </s.RoomBox>
          ) }
        </s.RoomList>
      </s.Container>
      {isAddUserModal && <AddUserModal closeModal={() => setIsAddUserModal(false) } getRooms={getRooms} /> }
    </>
  );
}
export default ChatRoom;