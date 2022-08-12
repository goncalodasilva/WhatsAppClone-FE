import React from 'react'
import "./Sidebar.css"


import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core';

import { MessageSharp, SearchOutlined } from "@material-ui/icons";
import SidebarChat from './SidebarChat';
import { useStateValue } from './StateProvider';

function Sidebar(chats) {
    const [{ user }, dispatch] = useStateValue();

    return (
        <div className='sidebar'>
            <div className="sidebar_header">
                <Avatar src={user?.photoURL} referrerPolicy="no-referrer"/>
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>

            <div className="sidebar_chats">
                {!!chats && !!chats.chats && Array.isArray(chats.chats) && chats.chats.length > 0 ? 
                    chats.chats.map(c => (
                        <SidebarChat key={c.chatId} chatInfo={c}/>
                    )) : null}
            </div>
        </div>
    )
}

export default Sidebar
