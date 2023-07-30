import { useEffect, useState } from 'react';
import MsgApi from '../../../api/MsgApi';
import s from './ChatContentSC';
import { userAtom } from '../../../states/atom';
import { useAtom } from 'jotai';

const ChatContent = ({selectedRoomId}) => {
    const [userInfo,] = useAtom(userAtom);
    const [msgList, setMsgList] = useState([]);

    const getMsgs = async() => {
        const res = await MsgApi.getMsgs(selectedRoomId);
        if(res.status === 200) {
            setMsgList(res.data);
            // AS-IS >> mongo db에 userId, name 모두 저장
            // TO-BE >> mongo db에는 userId만 저장하고 채팅방에 있는 사용자 리스트 조회하여 name 매핑 (name 변경 고려)
        }
    }

    useEffect(() => {
        if(selectedRoomId > 0) {
            setMsgList([]);
            getMsgs(selectedRoomId);
            // to-do
            // 웹소켓 연결
        }
    }, [selectedRoomId]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            setMsgList([...msgList, {
                dtm: new Date().toISOString().substring(0, 19).replaceAll('T', ' '),
                msg: e.target.value,
                name: userInfo?.name,
                roomId:"6",
                userId:"4"
            }]);
            e.target.value = '';
        }
    }

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
                        <s.SendMsg onKeyDown={handleKeyDown}/>
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