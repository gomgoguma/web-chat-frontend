import { useEffect, useState } from 'react';
import s from './AddUserModalSC'
import UserApi from '../../../api/UserApi'
import RoomApi from '../../../api/RoomApi';

const AddUserModal = ({ closeModal, getRooms }) => {

  const [selectedRow, setSelectedRow] = useState([]);
  const [userList, setUserList] = useState([]);

  const getUser = async() => {
    const res = await UserApi.getUsers({excludeOwnYn: 'Y'});
    if(res.status === 200) {
      setUserList(res.data);
    }
  }

  useEffect(()=>{ 
      getUser();
  },[]);

  const handleContainerClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    } 
  };

  const rowClicked = (id) => {
    setSelectedRow(
      selectedRow.includes(id) ? selectedRow.filter(el => el != id) : [...selectedRow, id]
    );
  }

  const createRoom = async () => {
    if(selectedRow.length <= 0)
      alert('대화할 사용자를 선택해주세요');
    else {
      const res = await RoomApi.createRoom({userIdList: selectedRow});
      if(res.status === 200) {
        alert('대화 시작');
        closeModal();
        getRooms();
      }
    }
  }

  return (
    <s.ModalContainer onClick={handleContainerClick}>
      <s.ModalContent>
        <s.CloseButton onClick={closeModal}>&times;</s.CloseButton>
        <s.SearchBar>
          <s.InputName />
        </s.SearchBar>
        <s.UserBox>
          {userList.map(el => 
            <s.UserRow key={el.id} selected={selectedRow.includes(el.id)} onClick={() => rowClicked(el.id)}>
              {el.name}
            </s.UserRow>
          )}
        </s.UserBox>
        <button>취소</button>
        <button onClick={createRoom}>확인</button>
      </s.ModalContent>
    </s.ModalContainer>
  )
}

export default AddUserModal;