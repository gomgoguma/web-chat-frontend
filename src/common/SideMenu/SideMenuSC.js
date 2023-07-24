import styled from 'styled-components';

const SideMenuSC = {
  Container: styled.div`
      width: 300px;
      height: 100vh;
      border-right:1px solid black;
  `,
  RoomBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 70px;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
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

export default SideMenuSC;