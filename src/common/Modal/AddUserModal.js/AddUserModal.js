import s from './AddUserModalSC'

const AddUserModal = ({ setIsAddUserModal }) => {

  const handleContainerClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsAddUserModal(false); // 모달 컨테이너를 클릭한 경우에만 모달 닫기 이벤트를 호출
    } 
  };

  return (
    <s.ModalContainer onClick={handleContainerClick}>
      <s.ModalContent onClick={(e) => e.stopPropagation()}>
        <s.CloseButton onClick={setIsAddUserModal}>&times;</s.CloseButton>
          <h2>Modal Content</h2>
          <p>12312</p>
      </s.ModalContent>
    </s.ModalContainer>
  )
}

export default AddUserModal;