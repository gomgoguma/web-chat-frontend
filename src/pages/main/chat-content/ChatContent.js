import { useEffect, useState } from 'react';
import MsgApi from '../../../api/MsgApi';
import * as s from './ChatContentSC';
import { userAtom } from '../../../states/atom';
import { useAtom } from 'jotai';
import SockJsClient from "react-stomp";
import ChatApi from '../../../api/ChatApi';

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

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            let dto = {
                dtm: new Date().toISOString().substring(0, 19).replaceAll('T', ' '),
                msg: e.target.value,
                name: userInfo?.name,
                roomId: selectedRoomId,
                userId: userInfo?.userId
            };
            e.target.value = '';

            const res = await ChatApi.sendMessage(dto);
        }
    }

    const handleOnMessage = (msg) => {
        setMsgList([...msgList, msg]);
    }

    return (
    <>
        <s.Container>
            {selectedRoomId !== 0 ? 
                <>
                    <SockJsClient
                        url={"http://localhost:8080/my-chat/"}
                        topics={[`/topic/group/${selectedRoomId}`]}
                        onConnect={console.log("connected!")}
                        onDisconnect={console.log("disconnected!")}
                        onMessage={(msg) => handleOnMessage(msg)}
                        debug={false}
                    />

                    <s.Title> <span style={{marginLeft: '10px'}}>{selectedRoomId}방</span> </s.Title>
                    <s.MsgListBox>
                        {msgList.map((el, index) => 
                            <s.MsgBox key={index} myChat={Number(el.userId) === Number(userInfo.userId)}>
                                <s.MsgContent>
                                    <s.MsgUser> {el.name} </s.MsgUser>
                                    <s.MsgText myChat={Number(el.userId) === Number(userInfo.userId)}> {el.msg} </s.MsgText>
                                    <s.MsgDtm> {el.dtm.substring(10,16)} </s.MsgDtm>
                                </s.MsgContent>
                            </s.MsgBox>
                        )}
                    </s.MsgListBox> 
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