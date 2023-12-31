import s from './ChatRoomSC';
import RoomApi from '../../../api/RoomApi';
import AddUserModal from '../../../common/modal/addUserModal/AddUserModal';
import { useCallback, useEffect, useState } from 'react';
import Text from '../../../common/text/Text';
import RoomContextMenu from '../../../common/context-menu/room/RoomContextMenu';
import { useAtom } from 'jotai';
import { accessTokenAtom, userAtom } from '../../../states/atom';
import SockJsClient from "react-stomp";

const ChatRoom = ({setSelectedRoom, selectedRoom, msgList, setMsgList}) => {
  const [createRoomModal, setCreateRoomModal] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const [isRoomContextMenu, setIsRoomContextMenu] = useState(false);
  const [selectMenu, setSelectMenu] = useState();
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [roomList, setRoomList] = useState([]);
  const [userInfo,] = useAtom(userAtom);
  const [menuRoomId, setMenuRoomId] = useState();

  const roomApi = RoomApi();

  const [accessToken,] = useAtom(accessTokenAtom);
  const [stompHeaders, setStompHeaders] = useState();
  
  useEffect(() => {
    if(accessToken){
      setStompHeaders({
        "Authorization": accessToken
      });
    }
  }, [accessToken])
  

  const getRooms = async() => {
    const res = await roomApi.getMyRooms();
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
    const res = await roomApi.getMyRooms();
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
    if(msg.type !== 'notification' && !roomList.some(el => el.id === msg.roomId)) {
      const res = await roomApi.getRoom({roomId: msg.roomId});
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
        if(msg.type !== 'notification' ) {
          newMsgRoom.recentMsg = msg.msg;
          newMsgRoom.recentMsgDtm = msg.dtm;
          setRoomList([
            newMsgRoom,
            ...roomList.filter(el => el.id != msg.roomId)
          ]);
        }
        if(selectedRoom?.id === msg.roomId) {
          if(msgList) {
            setMsgList([...msgList, msg]);
          }
          else {
            setMsgList([msg]);
          }
        }
      }
    }
  };
  
  // const stompConnect = useCallback(() => {
  //   if(userInfo) {
  //     const socket = new SockJS('http://localhost:8080/my-chat');
  //     const options = {debug: false};
      
  //     const stompClient = Stomp.over(socket, options);
  //     const headers = {
  //       Authorization: accessToken
  //     }
      
  //     stompClient.connect(headers, () => {
  //       stompClient.subscribe(`/topic/user/${userInfo.userId}`, (message) => {
  //         handleOnMessage(roomList, JSON.parse(message.body));
  //       });
  //     });

  //     return () => {
  //       stompClient.disconnect();
  //     };
  //   }
  // }, [userInfo]);

  // useEffect(() => {
  //   stompConnect();
  // }, [stompConnect]);
  
  const openInviteModal = (menuRoomId) => {
    setMenuRoomId(menuRoomId);
    setInviteModal(true);
  }

  return (
    <>
      {userInfo && stompHeaders && <SockJsClient
          url={"http://localhost:8080/my-chat/"}
          topics={[`/topic/user/${userInfo.userId}`]}
          onMessage={(msg) => handleOnMessage(msg)}
          debug={ false }
          headers={stompHeaders}
      />}
      <s.Container>
        <s.RoomBtnBox>
          <img onClick={() => setCreateRoomModal(true)} src="/assets/icon/add-room-icon.svg" width={'20px'} style={{cursor:'pointer'}}/>
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
      {createRoomModal && <AddUserModal closeModal={() => setCreateRoomModal(false) } selectCreateRoom={selectCreateRoom}/> }
      {inviteModal && <AddUserModal closeModal={() => setInviteModal(false) } roomId={menuRoomId} />} 
      {isRoomContextMenu && <RoomContextMenu menuPosition={menuPosition} selectMenu={selectMenu} closeContextMenu={() => setIsRoomContextMenu(false)} getRooms={() => getRooms()} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} openInviteModal={openInviteModal}/>}
    </>
  );
}
export default ChatRoom;