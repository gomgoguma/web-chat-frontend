import styled from 'styled-components';

const AddUserModalSC = {
  ModalContainer: styled.div`
    width: 100%;
    min-width: 1200px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `,
  ModalContent: styled.div`
    position: relative;
    background-color: #fff;
    border:1px solid black;
    width: 400px;
    height: 500px;
  `,
  CloseButton: styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 25px;
    cursor: pointer;
    background: transparent;
    border: none;
  `,
  SearchBar: styled.div`
    position: absolute;
    width: 100%;
    top: 10px;
    left: 10px;
  `,
  InputName: styled.input`
    width: 50%;
    height: 30px;
  `,
  UserBox: styled.div`
    margin-top: 60px;
    width: 100%;
    height: 400px;
    overflow-y: scroll;
  `,
  UserRow: styled.div`
    display: flex;
    align-items: center;
    height: 40px;
    padding-left: 10px;
    &:hover {
      background-color: ${(props) => (props.isSelected ? '#ccc' : '#ddd')};
    }
    background-color: ${(props) => (props.isSelected ? '#ccc' : 'transparent')};
    cursor: pointer;
  `
  
} 
export default AddUserModalSC;