import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  left: ${props => props.menuPosition.x}px;
  top: ${props => props.menuPosition.y}px;
  width: 140px;
  background-color: white;
  border: 1px solid black;
  border-radius: 4px;
  padding: 7px 5px;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const MenuBtn = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    cursor: pointer;
`;

export const DeleteBtn = styled(MenuBtn)`
    
`;
