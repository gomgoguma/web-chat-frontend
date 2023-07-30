import styled from 'styled-components';

const ChatRoomSC = {
  Container: styled.div`
      min-width: 300px;
      border-right:1px solid black;
      height: calc(100vh - 52px);
  `,
  RoomList: styled.div`
    overflow-y: auto;
    height: calc(100vh - 82px);
  `,
  RoomBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 70px;
    border-bottom: 1px solid black;
    cursor: pointer;
    background-color: ${(props) => (props.selected ? '#566270' : 'transparent')};
    color: ${(props) => (props.selected ? 'white' : 'black')};
  `,
  RoomName: styled.div`
    font-size: 16px;
    margin-left: 10px;
    margin-bottom: 10px;
  `,
  RecentMessage: styled.div`
    font-size: 14px;
    color: #999;
    margin-left: 10px;
  `
}

export default ChatRoomSC;