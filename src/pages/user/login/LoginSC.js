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
        width: 400px;
        height: 500px;
        gap: 20px;
    `,
    InputRow: styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 10%;
    `,
    InputElement: styled.input`
        width: 80%;
        height: 30px;
    `,
    LoginButton: styled.button`
        width: 100%;
        height: 40px;
    `,
};

export default LoginSC;