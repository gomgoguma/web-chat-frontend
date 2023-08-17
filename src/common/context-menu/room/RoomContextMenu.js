import { useEffect, useRef, useState } from "react";
import * as s from './RoomContextMenuSC';

const RoomContextMenu = ({menuPosition, selectMenu, closeContextMenu}) => {
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

    return (
        <>
            <div ref={contextMenuRef} style={{position:'fixed' ,left: menuPosition.x, top: menuPosition.y, width:'200px', height:'200px', backgroundColor:'white', border:'1px solid black'}}>
                {selectMenu.roomName}
            </div>
        </>
    )
}

export default RoomContextMenu;