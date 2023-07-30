import styled from 'styled-components';

const ChatContentSC = {
    Container: styled.div`
        width: calc(100vw - 300px);
        height: calc(100vh - 52px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow-y: hidden;
    `,
    Title: styled.div`
        display: flex;
        align-items: center;
        width:100%;
        min-height: 40px;
        border-bottom: 1px solid black;
    `,
    MessageBox: styled.div`
        width:100%;
        height: calc(100vh - 242px);
        border-bottom: 1px solid black;
    `,
    SendBox: styled.div`
        display: flex;
        justify-content: space-between;
        width:100%;
        min-height: 150px;
    `,
    SendMsg: styled.textarea`
        width: 100%;
        height: 150px;
        resize: none;
        border: none;
        font-size:17px;
    `,
}

export default ChatContentSC;