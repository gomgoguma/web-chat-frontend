import { useEffect, useState } from 'react';
import MsgApi from '../../api/MsgApi';
import s from './ChatContentSC';

const ChatContent = ({selectedRoomId}) => {
    const [msgList, setMsgList] = useState([]);
    const getMsgs = async() => {
        const res = await MsgApi.getMsgs(selectedRoomId);
        if(res.status === 200) {
            setMsgList(res.data);
            console.log(res.data);
        }
    }

    useEffect(() => {
        if(selectedRoomId > 0) {
            getMsgs(selectedRoomId);

            // to-do
            // 웹소켓 연결
        }
    }, [selectedRoomId]);

    return (
    <>
        <s.Container>
            {selectedRoomId !== 0 ? 
                <>
                    <s.Title> <span style={{marginLeft: '10px'}}>{selectedRoomId}방</span> </s.Title>
                    <s.MessageBox>
                        {msgList.map((el, index) => 
                            <div key={index}>
                                {el.name} : {el.msg} <br />
                                {el.dtm}
                            </div>
                        )}
                    </s.MessageBox> 
                    <s.SendBox>
                        <s.SendMsg />
                    </s.SendBox>
                </>
                : 
                <>대화를 선택해주세요</>
            }
        </s.Container>
    </>
    );
}

export default ChatContent;