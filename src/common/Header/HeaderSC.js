import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background-color: hsl(240, 3%, 23%);
`;

export const TitleBox = styled.div`
    margin-left: 10px;
`;

export const UserBtnBox = styled.div`
    margin-right: 10px;

    & span:hover {
        cursor: pointer;    
    }
`;