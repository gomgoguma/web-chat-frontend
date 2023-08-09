import styled from 'styled-components';

    export const Container = styled.div`
        width: calc(100vw - 300px);
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
        border-bottom: 1px solid black;
    `;

    export const MsgListBox = styled.div`
        width: calc(100vw - 325px);
        height: calc(100vh - 240px);
        border-bottom: 1px solid black;
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
        max-width: 400px;
        display: flex;
        flex-direction: column;
    `;

    export const MsgUser = styled.div`

    `;

    export const MsgText = styled.div`
        //background-color: ${(props) => (props.myChat ? '#609966': '#EDF1D6')};
        border: 1px solid black;
        border-radius: 10px;
        padding: 10px;
    `;

    export const MsgDtm = styled.div`

    `;

    export const SendBox =  styled.div`
        display: flex;
        justify-content: space-between;
        width:100%;
        min-height: 150px;
    `;

    export const SendMsg = styled.textarea`
        width: 100%;
        height: 150px;
        resize: none;
        border: none;
        font-size:17px;
    `;
    
