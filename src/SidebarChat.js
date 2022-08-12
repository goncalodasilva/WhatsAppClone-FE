import { Avatar } from '@material-ui/core';
import React from 'react'
import "./SidebarChat.css";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function SidebarChat({chatInfo}) {
    const [{ }, dispatch] = useStateValue();
    
    const setChat = (chatId) => dispatch({
        type: actionTypes.SET_CHAT,
        chat: chatId
    })
    return (
        <div className="sidebarChat" onClick={() => setChat(chatInfo.chatId)}>
                <Avatar />
                <div className="sidebarChat_info">
                    <h2>{chatInfo.chatName}</h2>
                    <p>Last message</p>
                </div>
            </div>
    )
}

export default SidebarChat
