import { useState } from 'react';
import s from './AddUserModalSC'

const AddUserModal = ({ closeModal }) => {
  const [selectedRow, setSelectedRow] = useState([]);

  const handleContainerClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    } 
  };

  const list = [{id:1, name: '고구마'},{id:2, name: '감자'},{id:3, name: '버섯'},{id:4, name: '고구마'},{id:5, name: '감자'},{id:6, name: '버섯'},{id:7, name: '고구마'},{id:8, name: '감자'},{id:9, name: '버섯'}];

  const rowClicked = (id) => {
    setSelectedRow(
      selectedRow.includes(id) ? selectedRow.filter(el => el != id) : [...selectedRow, id]
    );
  }

  const createRoom = async () => {
    if(selectedRow.length <= 0)
      alert('대화할 사용자를 선택해주세요');
    else {
      alert(selectedRow);
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
          {list.map(el => 
            <s.UserRow key={el.id} isSelected={selectedRow.includes(el.id)} onClick={() => rowClicked(el.id)}>
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