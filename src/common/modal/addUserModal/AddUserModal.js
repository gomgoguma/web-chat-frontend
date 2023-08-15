import { useCallback, useEffect, useState } from 'react';
import s from './AddUserModalSC'
import UserApi from '../../../api/UserApi'
import RoomApi from '../../../api/RoomApi';
import { debounce } from 'lodash';
import Text from '../../text/Text';
import Button from '../../button/Button';

const AddUserModal = ({ closeModal, getRooms }) => {

  const [selectedRow, setSelectedRow] = useState([]);
  const [userList, setUserList] = useState([]);
  const [searchName, setSearchName] = useState();

  const getUsers = async(param) => {
    const res = await UserApi.getUsers(param);
    if(res.status === 200) {
      if(res.data.resCd === 200) {
        setUserList(res.data.data);
        console.log(res.data.data);
      }
      else if(res.data.resCd === 404) {
        setUserList([]);
      }
    }
    else {
      alert('오류가 발생했습니다.');
    }
  }

  useEffect(()=>{ 
      getUsers({excludeOwnYn: 'Y'});
  },[]);

  const handleContainerClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    } 
  };

  const rowClicked = (id) => {
    setSelectedRow(
      selectedRow.includes(id) ? selectedRow.filter(el => el !== id) : [...selectedRow, id]
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
  
  const delayedSearch = useCallback(debounce((name) => {
    getUsers({excludeOwnYn: 'Y', name});
  }, 200), []);

  const onChangeSearchName = (e) => {
    const inputValue = e.target.value;
    setSearchName(inputValue);
  }

  useEffect(() => {
    delayedSearch(searchName);
  }, [searchName]);


  return (
    <s.ModalContainer onClick={handleContainerClick}>
      <s.ModalContent>
        <s.CloseButton onClick={closeModal}>&times;</s.CloseButton>
        <s.SearchBar>
          <s.InputName value={searchName} onChange={onChangeSearchName}/>
        </s.SearchBar>
        <s.UserBox>
          {userList.map(el => 
            <s.UserRow key={el.id} selected={selectedRow.includes(el.id)} onClick={() => rowClicked(el.id)}>
              <Text fontSize={'16px'} fontWeight={'100'}>{el.name}</Text>
            </s.UserRow>
          )}
        </s.UserBox>
        <s.ButtonBox>
          <Button width={'100px'} height={'50px'} onClick={createRoom} disable={selectedRow.length <= 0}>
            <Text fontSize={'15px'} fontWeight={'100'}>확인</Text>
          </Button>
          <Button width={'100px'} height={'50px'} onClick={closeModal}> 
            <Text fontSize={'15px'} fontWeight={'100'}>취소</Text>
          </Button>
        </s.ButtonBox>
      </s.ModalContent>
    </s.ModalContainer>
  )
}

export default AddUserModal;