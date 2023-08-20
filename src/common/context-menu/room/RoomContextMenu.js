import { useEffect, useRef, useState } from "react";
import * as s from './RoomContextMenuSC';
import Text from "../../text/Text";
import RoomApi from "../../../api/RoomApi";

const RoomContextMenu = ({menuPosition, selectMenu, closeContextMenu, callback}) => {
    const contextMenuRef = useRef(null);

    useEffect(() => {
        const handleGlobalClick = (event) => {
            if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
                closeContextMenu();
            }
        };
    
        window.addEventListener('click', handleGlobalClick);
        return () => {
          window.removeEventListener('click', handleGlobalClick);
        };
    }, [closeContextMenu]);

    const deleteRoom = async() => {
        const check = window.confirm('삭제하시겠습니까?');
        closeContextMenu();
        if(check) {
            const res = await RoomApi.deleteRoom({roomId: selectMenu.id});
            if(res.status === 200) {
                if(res.data.resCd === 200) {
                    console.log(res.data.data);
                    callback();
                }
                else {
                    alert(res.data.resMsg);
                }
            }
            else {
                alert('오류가 발생했습니다.');
            }
        }
    }

    return (
        <>
            <s.Container ref={contextMenuRef} menuPosition={menuPosition}>
                <s.MenuBtn>
                    <Text fontSize={'14px'} fontWeight={'600'}> 채팅방 상단 고정 </Text> 
                </s.MenuBtn>
                <s.MenuBtn>
                    <Text fontSize={'14px'} fontWeight={'600'}> 채팅방 이름 설정 </Text> 
                </s.MenuBtn>
                <s.MenuBtn>
                    <Text fontSize={'14px'} fontWeight={'600'}> 대화 상대 초대 </Text> 
                </s.MenuBtn>
                <s.DeleteBtn onClick={() => deleteRoom()}> 
                    <Text fontSize={'14px'} fontWeight={'600'} color={'#bb0000bc'}> 채팅방 나가기 </Text> 
                </s.DeleteBtn>
            </s.Container>
        </>
    )
}

export default RoomContextMenu;