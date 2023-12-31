import { useCallback, useEffect, useRef, useState, React } from 'react';
import MsgApi from '../../../api/MsgApi';
import * as s from './ChatContentSC';
import { userAtom } from '../../../states/atom';
import { useAtom } from 'jotai';
import Text from '../../../common/text/Text';
import { padStart } from 'lodash';
import AddUserModal from '../../../common/modal/addUserModal/AddUserModal';

const ChatContent = ({ selectedRoom, msgList, setMsgList }) => {
  const [userInfo,] = useAtom(userAtom);
  const msgApi = MsgApi();
  const [isAddUserModal, setIsAddUserModal] = useState(false);
  const [pageNum, setPageNum] = useState();
  const [lastMsgCnt, setLastMsgCnt] = useState(0);
  const msgRef = useRef(null);
  const prevFirstMsgRef = useRef(null);
  const lastMsgRef = useRef(null);
  
  const [isInitial, setIsInitial] = useState(false);
  

  const getMsgs = useCallback(async () => {
    if (selectedRoom?.id) {
      if(pageNum === 0 && !isInitial) {
        return;
      }
      const res = await msgApi.getMsgs({ roomId: selectedRoom?.id, pageNum: pageNum });
      if (res.status === 200) {
        const {resCd, resMsg, data, pageInfo} = res.data;
        if (resCd === 200) {
          setMsgList((msgList) => [...data, ...msgList]);
          setLastMsgCnt(pageInfo.pageDataCount);

          if (!pageInfo?.hasNext) {
            msgRef.current.removeEventListener('scroll', getExtraMsg, true);            
          }
        }
        else {
          setMsgList();
        }
        
        // AS-IS >> mongo db에 userId, name 모두 저장
        // TO-BE >> mongo db에는 userId만 저장하고 채팅방에 있는 사용자 리스트 조회하여 name 매핑 (name 변경 고려)
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
    }

    return () => {
      if(msgRef.current) {
        msgRef.current.removeEventListener('scroll', getExtraMsg, true);
      }
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
    console.log(msgList);
    if (msgRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = msgRef.current;
      const lastMsgHeight = lastMsgRef?.current?.offsetHeight;
      if(isInitial && (msgList?.length > 0 || !msgList)) { // 채팅방 최초 입장 시 스크롤 최하단으로 이동
        msgRef.current.scrollTop = msgRef.current.scrollHeight;
        setIsInitial(false);
      }else if ( scrollTop + clientHeight >= scrollHeight - lastMsgHeight - 11) { // 스크롤 최하단일 때 
        msgRef.current.scrollTop = msgRef.current.scrollHeight;
      }
      else if (scrollTop === 0 && pageNum > 0 && prevFirstMsgRef.current) { // 윗방향 무한스크롤 스크롤 위치 유지
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
          dtm: new Date(new Date().getTime() + (9 * 60 * 60 * 1000)),
          msg: e.target.value,
          name: userInfo?.name,
          roomId: selectedRoom.id,
          userId: userInfo?.userId,
          type: 'chat'
      };
      e.target.value = '';
      const res = await msgApi.sendMessage(msg);
      
      // TODO
      // 메시지를 연속으로 빠르게 보내는 경우 메시지 순서 관리
      }
    }
  
  const renderTextWithLineBreaks = (text) => {
    const lines = text?.split('\n');
    return lines?.map((line, index) => (
      <Text key={index} fontSize={'17px'} fontWeight={'100'}>
        {line}
        <br />
      </Text>
    ));
  };

  const renderTimeFormat = (text) => {
    let time = text.toString().substring(11,16);
    let hours = Number(time.substring(0,2));
    const timeDv = hours/12 > 0 ? '오후' : '오전';
    time = String(hours%12 || 12).padStart(2, '0') + time.substring(time.length - 3);
    return timeDv + ' ' + time;
  }

    return (
    <>
        <s.Container>
            {selectedRoom ? 
                <>
                    <s.Title> 
                      <div>
                        <Text fontSize={'17px'} fontWeight={'600'} margin={'0 0 0 10px'}>{selectedRoom.roomName}</Text>
                      </div>
                      {/* <div style={{margin:'10px'}} onClick={() => setIsAddUserModal(true)}>
                        <img src="/assets/icon/add-room-icon.svg" width={'20px'} style={{cursor:'pointer'}}/>
                      </div> */}
                    </s.Title>
                    <s.MsgListBox ref={(ref) => msgRef.current = ref} >
                        {msgList?.map((el, index) => 
                            <s.MsgBox ref={ index === msgList.length-1 ? lastMsgRef : index === Math.min(15-1, lastMsgCnt-1) ? prevFirstMsgRef : null}  key={index} myChat={Number(el.userId) === Number(userInfo.userId)} chatType={el.type}>
                                <s.MsgContent chatType={el.type}>
                                    <s.MsgUser> <Text fontSize={'13px'} fontWeight={'100'}>{el.name}</Text> </s.MsgUser>
                                    <s.MsgText myChat={Number(el.userId) === Number(userInfo.userId)}> {renderTextWithLineBreaks(el.msg)} </s.MsgText>
                                    <s.MsgDtm> 
                                      <Text fontSize={'12px'} fontWeight={'100'}>
                                        {renderTimeFormat(el.dtm)}
                                      </Text> 
                                    </s.MsgDtm>
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
                  <Text fontSize={'18px'} fontWeight={'600'}>대화를 선택해주세요</Text>
                </>
            }
        </s.Container>
        {isAddUserModal && <AddUserModal closeModal={() => setIsAddUserModal(false)} roomId={selectedRoom.id}/> }
    </>
    );
}

export default ChatContent;