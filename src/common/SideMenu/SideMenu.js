import s from './SideMenuSC';
import roomApi from '../../api/RoomApi';

const SideMenu = () => {
  const list = [{name: '고구마', recentMessage: '안녕'},{name: '감자', recentMessage: '안녕'},{name: '버섯', recentMessage: '안녕'}];

  const createRoom = async() => {
    const res = await roomApi.createRoom();
    console.log(res);
  }
    
  return (
    <>
      <s.Container>
        <button onClick={createRoom}> 대화 상대 추가 </button>
          { list.map(el =>  
          
            <s.RoomBox>
              <s.RoomName>
                  { el.name }
              </s.RoomName>
              <s.RecentMessage>
                  { el.recentMessage }
              </s.RecentMessage>
            </s.RoomBox>
          ) }
      </s.Container>
    </>
  );
}
export default SideMenu;