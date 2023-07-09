import styled from 'styled-components';

const LoginSC = {
    Container: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    `,
    LoginBox: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: 1px solid black;
        width: 600px;
        height: 600px;
    `,
    InputRow: styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        height: 10%;
    `,
    InputElement: styled.input`
        width: 85%;
        height: 30px;
    `,
    LoginButton: styled.button`
        width: 90%;
        height: 40px;
        margin: 20px 0 0 0;
    `,
};

export default LoginSC;