import { useEffect, useRef, useState } from 'react';
import MsgApi from '../../../api/MsgApi';
import * as s from './ChatContentSC';
import { userAtom } from '../../../states/atom';
import { useAtom } from 'jotai';
import SockJsClient from "react-stomp";
import ChatApi from '../../../api/ChatApi';

const ChatContent = ({selectedRoom}) => {
    const [userInfo,] = useAtom(userAtom);
    const [pageNum, setPageNum] = useState(0);
    const [msgList, setMsgList] = useState([]);
    const msgRef = useRef(null);

    const getMsgs = async() => {
        const res = await MsgApi.getMsgs( { roomId:selectedRoom.id, pageNum: pageNum} );
        if(res.status === 200) {
            if(res.data.resCd === 200) {
                setMsgList((msgList) => [...res.data.data, ...msgList]);
                setPageNum((pageNum) => pageNum+1);
            } else if(res.data.resCd === 404) {
                msgRef.current.removeEventListener('scroll', getExtraMsg);
            }
            // AS-IS >> mongo db에 userId, name 모두 저장
            // TO-BE >> mongo db에는 userId만 저장하고 채팅방에 있는 사용자 리스트 조회하여 name 매핑 (name 변경 고려)
        }
        else {
            alert('오류가 발생했습니다.');
        }
    }

    const getExtraMsg = () => {
        if (msgRef.current) {
            const { scrollTop } = msgRef.current;
            if (scrollTop === 0) {
                getMsgs();
            }
        }
    }

    useEffect(() => {
        if(selectedRoom) {
            setMsgList([]);
            setPageNum(0);
            getMsgs();

            scrollDown();
            msgRef.current.addEventListener('scroll', getExtraMsg);
            return () => {
                msgRef.current.removeEventListener('scroll', getExtraMsg);
            };
        }

        
    }, [selectedRoom]);

    const scrollDown = () => {
        if (msgRef.current) {
            msgRef.current.scrollTop = msgRef.current.scrollHeight;
        }
    }

    useEffect(() => {
        if (msgRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = msgRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                scrollDown();
            }
        }
    }, [msgList]);

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            let dto = {
                dtm: new Date().toISOString().substring(0, 19).replaceAll('T', ' '),
                msg: e.target.value,
                name: userInfo?.name,
                roomId: selectedRoom.id,
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
            {selectedRoom ? 
                <>
                    <SockJsClient
                        url={"http://localhost:8080/my-chat/"}
                        topics={[`/topic/group/${selectedRoom.id}`]}
                        onConnect={console.log("connected!")}
                        onDisconnect={console.log("disconnected!")}
                        onMessage={(msg) => handleOnMessage(msg)}
                        debug={false}
                    />

                    <s.Title> <span style={{marginLeft: '10px'}}>{selectedRoom.roomName}</span> </s.Title>
                    <s.MsgListBox ref={msgRef}>
                        {msgList.map((el, index) => 
                            <s.MsgBox key={index} myChat={Number(el.userId) === Number(userInfo.userId)}>
                                <s.MsgContent>
                                    <s.MsgUser> <span style={{fontSize:12}}> {el.name} </span> </s.MsgUser>
                                    <s.MsgText myChat={Number(el.userId) === Number(userInfo.userId)}> {el.msg} </s.MsgText>
                                    <s.MsgDtm> <span style={{fontSize:12}}> {el.dtm.substring(10,16)} </span> </s.MsgDtm>
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