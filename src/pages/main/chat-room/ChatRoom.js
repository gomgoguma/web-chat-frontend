import s from './ChatRoomSC';
import RoomApi from '../../../api/RoomApi';
import AddUserModal from '../../../common/modal/addUserModal/AddUserModal';
import { useEffect, useState } from 'react';
import Text from '../../../common/text/Text';
import RoomContextMenu from '../../../common/context-menu/room/RoomContextMenu';
import { useAtom } from 'jotai';
import { userAtom } from '../../../states/atom';
import SockJsClient from "react-stomp";

const ChatRoom = ({setSelectedRoom, selectedRoom, msgList, setMsgList}) => {
  const [isAddUserModal, setIsAddUserModal] = useState(false);
  const [isRoomContextMenu, setIsRoomContextMenu] = useState(false);
  const [selectMenu, setSelectMenu] = useState();
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [roomList, setRoomList] = useState([]);
  const [userInfo,] = useAtom(userAtom);

  const getRooms = async() => {
    const res = await RoomApi.getMyRooms();
    if(res.status === 200) {
      const {resCd, data} = res.data;
      if(resCd === 200) {
        setRoomList(data);
      }
      else if(resCd === 404) {
        setRoomList([]);
      }
    }
  }

  const selectCreateRoom = async(roomId) => {
    const res = await RoomApi.getMyRooms();
    if(res.status === 200) {
      const {resCd, resMsg, data} = res.data;
      if(resCd === 200) {
        setRoomList(data);
        setSelectedRoom(data.find(el => el.id === roomId));
      }
      else {
        alert(resMsg);
      }
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

  const handleOnMessage = async(msg) => {
    if (!roomList.some(el => el.id === msg.roomId)) {
      const res = await RoomApi.getRoom({roomId: msg.roomId});
      if(res.status === 200) {
        let {resCd, resMsg, data} = res.data;
        if(resCd === 200) {
          data.recentMsg = msg.msg;
          data.recentMsgDtm = msg.dtm;
          setRoomList([data, ...roomList]);
        }
      }
    }
    else {
      let newMsgRoom = roomList.find(el => el.id === msg.roomId);
      if(newMsgRoom) {
        newMsgRoom.recentMsg = msg.msg;
        newMsgRoom.recentMsgDtm = msg.dtm;
        setRoomList([
          newMsgRoom,
          ...roomList.filter(el => el.id != msg.roomId)
        ]);

        if(selectedRoom?.id === msg.roomId && userInfo.userId !== msg.userId) {
          setMsgList([...msgList, msg]);
        }
      }
    }
  }

  return (
    <>
      <SockJsClient
          url={"http://localhost:8080/my-chat/"}
          topics={[`/topic/user/${userInfo.userId}`]}
          onMessage={(msg) => handleOnMessage(msg)}
          debug={ false }
      />
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
                <Text fontSize={'13px'} fontWeight={'100'} color={"#777"}>{ el.recentMsgDtm?.substring(11,16) }</Text>
              </s.RecentMessage>
            </s.RoomBox>
          ) }
        </s.RoomList>
      </s.Container>
      {isAddUserModal && <AddUserModal closeModal={() => setIsAddUserModal(false) } selectCreateRoom={selectCreateRoom}/> }
      {isRoomContextMenu && <RoomContextMenu menuPosition={menuPosition} selectMenu={selectMenu} closeContextMenu={() => setIsRoomContextMenu(false)} getRooms={() => getRooms()} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom}/>}
    </>
  );
}
export default ChatRoom;