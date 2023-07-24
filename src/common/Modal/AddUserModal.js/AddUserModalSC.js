import styled from 'styled-components';

const AddUserModalSC = {
  ModalContainer: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `,
  ModalContent: styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    max-width: 400px;
    position: relative; /* 수정: CloseButton을 배치하기 위해 position을 relative로 설정 */
  `,
  CloseButton: styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
    background: transparent;
    border: none;
  `
} 
export default AddUserModalSC;