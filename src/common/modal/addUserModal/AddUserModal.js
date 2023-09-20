import { useCallback, useEffect, useState } from 'react';
import s from './AddUserModalSC'
import UserApi from '../../../api/UserApi'
import RoomApi from '../../../api/RoomApi';
import { debounce } from 'lodash';
import Text from '../../text/Text';
import Button from '../../button/Button';

const AddUserModal = ({ closeModal, selectCreateRoom, roomId }) => {

  const userApi = UserApi();
  const roomApi = RoomApi();
  const [selectedRow, setSelectedRow] = useState([]);
  const [userList, setUserList] = useState([]);
  const [searchName, setSearchName] = useState();

  const getUsers = async(param) => {
    const res = await userApi.getUsers(param);
    if(res.status === 200) {
      const {resCd, resMsg, data} = res.data;
      if(resCd === 200) {
        setUserList(data);
      }
      else if(resCd === 404) {
        setUserList([]);
      }
    }
  }

  const handleContainerClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    } 
  };

  const rowClicked = (user) => {
    setSelectedRow(
      selectedRow.includes(user) ? selectedRow.filter(el => el !== user) : [...selectedRow, user]
    );
  }

  const addRoomUser = async () => {
    if(selectedRow.length <= 0)
      alert('대화할 사용자를 선택해주세요');
    else {
      const userIds = selectedRow.map(el => el.id);
      const res = await roomApi.addRoomUser({
        userIdList: userIds,
        roomId: roomId,
      });
      if(res.status === 200) {
        closeModal();
        const {resCd, resMsg, data} = res.data;
        if(resCd === 200) {
          if(!roomId) {
            selectCreateRoom(data);
          }
        }
        else {
          alert(resMsg);
        }
      }
    }
  }
  
  const delayedSearch = useCallback(debounce((name) => {
    let obj = {excludeOwnYn: 'Y'};
    if(roomId) {
      obj.roomId = roomId;
      obj.excludeExitingUserYn = 'Y';
    }
    getUsers(obj);
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
            <s.UserRow key={el.id} selected={selectedRow.includes(el)} onClick={() => rowClicked(el)}>
              <Text fontSize={'16px'} fontWeight={'100'}>{el.name}</Text>
            </s.UserRow>
          )}
        </s.UserBox>
        <s.ButtonBox>
          <Button width={'100px'} height={'50px'} onClick={addRoomUser} disable={selectedRow.length <= 0}>
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