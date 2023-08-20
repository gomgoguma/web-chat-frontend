import styled from 'styled-components';

    export const Container = styled.div`
        width: calc(100vw - 330px);
        height: calc(100vh - 52px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow-y: hidden;
    `;

    export const Title = styled.div`
        display: flex;
        align-items: center;
        width:100%;
        min-height: 40px;
        border-bottom: 1px solid #bbb;
    `;

    export const MsgListBox = styled.div`
        width: calc(100vw - 355px);
        height: calc(100vh - 240px);
        border-bottom: 1px solid #bbb;
        overflow-y: auto;
        padding: 10px;
    `;

    export const MsgBox = styled.div`
        width: 100%;
        min-width: 800px;
        display: flex;
        justify-content: ${(props) => (props.myChat ? 'end': 'left')};
        margin: 10px 0;
    `;

    export const MsgContent = styled.div`
        max-width: 700px;
        display: flex;
        flex-direction: column;
    `;

    export const MsgUser = styled.div`

    `;

    export const MsgText = styled.div`
        border: 1px solid #bbb;
        border-radius: 10px;
        padding: 10px;
    `;

    export const MsgDtm = styled.div`
        display: flex;
        justify-content: right;
        margin: 5px 5px 0 0;
    `;

    export const SendBox =  styled.div`
        display: flex;
        justify-content: space-between;
        width:100%;
        min-height: 130px;
    `;

    export const SendMsg = styled.textarea`
        width: 100%;
        height: 130px;
        resize: none;
        border: none;
        outline: none;
        padding: 10px;
        font-size:18px;
        font-family: 'SUITE-Regular', sans-serif;
        @font-face {
            font-family: 'SUITE-Regular';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
        }
    `;
    
