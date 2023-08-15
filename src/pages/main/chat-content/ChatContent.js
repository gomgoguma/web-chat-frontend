import { useCallback, useEffect, useRef, useState, React } from 'react';
import MsgApi from '../../../api/MsgApi';
import * as s from './ChatContentSC';
import { userAtom } from '../../../states/atom';
import { useAtom } from 'jotai';
import SockJsClient from "react-stomp";
import ChatApi from '../../../api/ChatApi';
import Text from '../../../common/text/Text';

const ChatContent = ({ selectedRoom }) => {
  const [userInfo,] = useAtom(userAtom);
  const [pageNum, setPageNum] = useState();
  const [lastMsgCnt, setLastMsgCnt] = useState(0);
  const [msgList, setMsgList] = useState([]);
  const msgRef = useRef(null);
  const prevFirstMsgRef = useRef(null);
  const lastMsgRef = useRef(null);

  const [isInitial, setIsInitial] = useState(false);

  const getMsgs = useCallback(async () => {
    if (selectedRoom?.id) {
      if(pageNum === 0 && !isInitial) {
        return;
      }
      const res = await MsgApi.getMsgs({ roomId: selectedRoom?.id, pageNum: pageNum });
      if (res.status === 200) {
        if (res.data.resCd === 200) {
          setMsgList((msgList) => [...res.data.data, ...msgList]);
          setLastMsgCnt(res.data.data.length);
        } else if (res.data.resCd === 404) {
          msgRef.current.removeEventListener('scroll', getExtraMsg, true);
          if(isInitial)
            setIsInitial(false);
        }
        // AS-IS >> mongo db에 userId, name 모두 저장
        // TO-BE >> mongo db에는 userId만 저장하고 채팅방에 있는 사용자 리스트 조회하여 name 매핑 (name 변경 고려)
      }
      else {
        alert('오류가 발생했습니다.');
      }
    }
  }, [pageNum, isInitial]);

  useEffect(() => {
    getMsgs();
  }, [getMsgs]);

  const getExtraMsg = useCallback(() => {
    const { scrollTop } = msgRef.current;
    if (scrollTop === 0 && !isInitial) {
      if (selectedRoom?.id) {
        setPageNum((prev) => prev + 1);
      }
    }
  }, [isInitial, selectedRoom?.id]);

  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.addEventListener('scroll', getExtraMsg, true);
      return () => {
        msgRef.current.removeEventListener('scroll', getExtraMsg, true);
      };
    }
  }, [getExtraMsg]);

  useEffect(() => {
    if (selectedRoom?.id) {
      setMsgList([]);
      setIsInitial(true);
      setPageNum(0);
    }
  }, [selectedRoom?.id]);

  useEffect(() => {
    if (msgRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = msgRef.current;
      const lastMsgHeight = lastMsgRef?.current?.offsetHeight;
      if(msgList.length > 0 && isInitial) {
        setIsInitial(false);
        msgRef.current.scrollTop = msgRef.current.scrollHeight;
      } else if ( scrollTop + clientHeight >= scrollHeight - lastMsgHeight - 11) {
        msgRef.current.scrollTop = msgRef.current.scrollHeight;
      }
      else if (scrollTop === 0 && pageNum > 0 && prevFirstMsgRef.current) {
        msgRef.current.scrollTop = prevFirstMsgRef.current.offsetTop-17;
      }
    }
  }, [msgList]);

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      
      if (!e.target.value) {
        return;
      }
      let msg = {
          dtm: new Date(Date.now()).toISOString(),
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
      
      // TODO
      // 메시지를 연속으로 빠르게 보내는 경우 메시지 순서 관리
      }
    }

  const handleOnMessage = (msg) => {
    if (msg.userId !== userInfo.userId) {
      setMsgList([...msgList, msg]);
    }
    else { // 본인 메시지 전송 결과 못받으면 오류 처리

    }
  }
  
  const renderTextWithLineBreaks = (text) => {
    const lines = text.split('\n');
    return lines.map((line, index) => (
      <Text key={index} fontSize={'17px'} fontWeight={'100'}>
        {line}
        <br />
      </Text>
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
                        onMessage={(msg) => handleOnMessage(msg)}
                        debug={false}
                    />

                    <s.Title> <Text fontSize={'17px'} fontWeight={'600'} margin={'0 0 0 10px'}>{selectedRoom.roomName}</Text> </s.Title>
                    <s.MsgListBox ref={(ref) => msgRef.current = ref} >
                        {msgList.map((el, index) => 
                            <s.MsgBox ref={ index === msgList.length-1 ? lastMsgRef : index === Math.min(15-1, lastMsgCnt-1) ? prevFirstMsgRef : null}  key={index} myChat={Number(el.userId) === Number(userInfo.userId)}>
                                <s.MsgContent>
                                    <s.MsgUser> <Text fontSize={'14px'} fontWeight={'100'}>{el.name}</Text> </s.MsgUser>
                                    <s.MsgText myChat={Number(el.userId) === Number(userInfo.userId)}> {renderTextWithLineBreaks(el.msg)} </s.MsgText>
                                    <s.MsgDtm> <Text fontSize={'14px'} fontWeight={'100'}>{el.dtm.substring(11,16)}</Text> </s.MsgDtm>
                                </s.MsgContent>
                            </s.MsgBox>
                        )}
                    </s.MsgListBox> 
                    <s.SendBox>
                        <s.SendMsg onKeyDown={handleKeyDown}/>
                    </s.SendBox>
                </>
                : 
                <>
                  <Text fontSize={'18px'} fontWeight={'100'}>대화를 선택해주세요</Text>
                </>
            }
        </s.Container>
    </>
    );
}

export default ChatContent;