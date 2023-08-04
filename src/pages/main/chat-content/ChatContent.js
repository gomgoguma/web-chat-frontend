import { useCallback, useEffect, useRef, useState, React } from 'react';
import MsgApi from '../../../api/MsgApi';
import * as s from './ChatContentSC';
import { userAtom } from '../../../states/atom';
import { useAtom } from 'jotai';
import SockJsClient from "react-stomp";
import ChatApi from '../../../api/ChatApi';

const ChatContent = ({ selectedRoom }) => {
  const [userInfo,] = useAtom(userAtom);
  const [pageNum, setPageNum] = useState(0);
  const [lastMsgCnt, setLastMsgCnt] = useState(0);
  const [msgList, setMsgList] = useState([]);
  const msgRef = useRef(null);
  const firstMsgRef = useRef(null);

  const getMsgs = useCallback(async () => {
    if (selectedRoom?.id) {
      
      const res = await MsgApi.getMsgs({ roomId: selectedRoom?.id, pageNum: pageNum });
      if (res.status === 200) {
        if (res.data.resCd === 200) {
          setMsgList((msgList) => [...res.data.data, ...msgList]);
          setLastMsgCnt(res.data.data.length);
        } else if (res.data.resCd === 404) {
          msgRef.current.removeEventListener('scroll', getExtraMsg);
        }
        // AS-IS >> mongo db에 userId, name 모두 저장
        // TO-BE >> mongo db에는 userId만 저장하고 채팅방에 있는 사용자 리스트 조회하여 name 매핑 (name 변경 고려)
      }
      else {
        alert('오류가 발생했습니다.');
      }
    }
  }, [pageNum, selectedRoom]);

  useEffect(() => {
    getMsgs();
  }, [getMsgs]);

  const getExtraMsg = () => {
        console.log('스크롤');
        if (msgRef.current) {
            const { scrollTop } = msgRef.current;
            if (scrollTop === 0) {
              setPageNum((prev) => prev + 1);
            }
        }
    }

    useEffect(() => {
        if(selectedRoom?.id) {
            setMsgList([]);
            setPageNum(0);
            msgRef.current.removeEventListener('scroll', getExtraMsg);
            msgRef.current.addEventListener('scroll', getExtraMsg);
            return () => {
                msgRef.current.removeEventListener('scroll', getExtraMsg);
            };
        }
    }, [selectedRoom?.id]);

  useEffect(() => {
        if (msgRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = msgRef.current;
          // TODO ------------------------------
      // 스크롤이 
      // -----------------------------------
            if (scrollTop + clientHeight >= scrollHeight - 150 || pageNum === 0) {
                msgRef.current.scrollTop = msgRef.current.scrollHeight;
          }
            else if (scrollTop === 0 && pageNum > 0 && firstMsgRef.current) {
              msgRef.current.scrollTop = firstMsgRef.current.offsetTop-17;
          }
        }
    }, [msgList]);

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      
      if (!e.target.value) {
        return;
      }
      console.log(e.target.value);
            let msg = {
                dtm: new Date().toISOString().substring(0, 19).replaceAll('T', ' '),
                msg: e.target.value,
                name: userInfo?.name,
                roomId: selectedRoom.id,
                userId: userInfo?.userId
            };
          e.target.value = '';
          // 본인 메시지는 바로 표시
          if (msg.userId === userInfo.userId) {
            setMsgList([...msgList, msg]);
          }
      const res = await ChatApi.sendMessage(msg);
      
      // TODO ------------------------------
      // 메시지를 연속으로 빠르게 보내는 경우
      // 1. jwt 검증 시 사용자 조회(db) 로직 반복 성능 개선
      // 2. 메시지 순서 관리
      // -----------------------------------
        }
    }

    const handleOnMessage = (msg) => {
        // 다른 사람 메시지는 응답 받고 표시
      if (msg.userId !== userInfo.userId) {
        setMsgList([...msgList, msg]);
      }
      else { // 본인 메시지 전송 결과 못받으면 오류 처리
 
      }
        
  }
  
  const renderTextWithLineBreaks = (text) => {
    const lines = text.split('\n');
    return lines.map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

    return (
    <>
        <s.Container>
            {selectedRoom ? 
                <>
                    <SockJsClient
                        url={"http://localhost:8080/my-chat/"}
                        topics={[`/topic/group/${selectedRoom.id}`]}
                        // onConnect={console.log("connected!")}
                        // onDisconnect={console.log("disconnected!")}
                        onMessage={(msg) => handleOnMessage(msg)}
                        debug={false}
                    />

                    <s.Title> <span style={{marginLeft: '10px'}}>{selectedRoom.roomName}</span> </s.Title>
                    <s.MsgListBox ref={msgRef} >
                        {msgList.map((el, index) => 
                            <s.MsgBox ref={ index === Math.min(15-1, lastMsgCnt-1) ? firstMsgRef : null}  key={index} myChat={Number(el.userId) === Number(userInfo.userId)}>
                                <s.MsgContent>
                                    <s.MsgUser> <span style={{fontSize:12}}> {el.name} </span> </s.MsgUser>
                                    <s.MsgText myChat={Number(el.userId) === Number(userInfo.userId)}> {renderTextWithLineBreaks(el.msg)} </s.MsgText>
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