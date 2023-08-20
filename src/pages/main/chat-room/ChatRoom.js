import s from './ChatRoomSC';
import RoomApi from '../../../api/RoomApi';
import AddUserModal from '../../../common/modal/addUserModal/AddUserModal';
import { useEffect, useState } from 'react';
import Text from '../../../common/text/Text';
import RoomContextMenu from '../../../common/context-menu/room/RoomContextMenu';

const ChatRoom = ({setSelectedRoom, selectedRoom}) => {
  const [isAddUserModal, setIsAddUserModal] = useState(false);
  const [isRoomContextMenu, setIsRoomContextMenu] = useState(false);
  const [selectMenu, setSelectMenu] = useState();
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
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


  const handleContextMenu = (event, room) => {
    event.preventDefault();
    setSelectMenu(room);
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setIsRoomContextMenu(true);
  }

  return (
    <>
      <s.Container>
        <s.RoomBtnBox>
          <img onClick={() => setIsAddUserModal(true)} src="/assets/icon/add-room-icon.svg" width={'20px'} style={{cursor:'pointer'}}/>
        </s.RoomBtnBox>
        <s.RoomList>
          { roomList.map((el, index) =>  
            <s.RoomBox key={el.id} onClick={() => getMessage(el)} selected={el.id === selectedRoom?.id} onContextMenu={(e) => handleContextMenu(e, el)}>
              <s.RoomName>
                <Text fontSize={'15px'} fontWeight={'700'}>{ el.roomName }</Text>
              </s.RoomName>
              <s.RecentMessage>
                <Text fontSize={'15px'} fontWeight={'100'} color={"#777"}>{ el.recentMsg }</Text>
              </s.RecentMessage>
              {/* <s.RoomBtn onClick={() => deleteRoom(el.id)}>x</s.RoomBtn> */}
            </s.RoomBox>
          ) }
        </s.RoomList>
      </s.Container>
      {isAddUserModal && <AddUserModal closeModal={() => setIsAddUserModal(false) } getRooms={getRooms} /> }
      {isRoomContextMenu && <RoomContextMenu menuPosition={menuPosition} selectMenu={selectMenu} closeContextMenu={() => setIsRoomContextMenu(false)} callback={() => getRooms()}/>}
    </>
  );
}
export default ChatRoom;