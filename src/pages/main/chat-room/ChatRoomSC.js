import styled from 'styled-components';

const ChatRoomSC = {
  Container: styled.div`
      min-width: 330px;
      max-width: 330px;
      border-right:1px solid #bbb;
      height: calc(100vh - 52px);
  `,
  RoomBtnBox: styled.div`
    height: 30px;
    display: flex;
    justify-content: right;
    align-items: center;
    border-bottom: 1px solid #bbb;
    padding-right: 5px;
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
    border-bottom: 1px solid #bbb;
    cursor: pointer;
    color: black;
    position: relative;
    gap : 5px;
  `,
  RoomName: styled.div`
    font-size: 14px;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 20px;
  `,
  RecentMessage: styled.div`
    font-size: 14px;
    color: #999;
    margin-left: 10px;
    height: 20px;
  `,
  RoomBtn: styled.button`
    position: absolute;
    right: 5px;
    bottom: 5px;
  `
}

export default ChatRoomSC;