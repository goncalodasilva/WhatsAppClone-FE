import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, SearchOutlined } from '@material-ui/icons';
import MoreVert from '@material-ui/icons/MoreVert';
import MicIcon from '@material-ui/icons/Mic';
import React, { useState } from 'react';
import "./Chat.css";
import axios from './axios.js';
import { useStateValue } from './StateProvider';

function Chat({ messages, chatInfo }) {
    const [input, setInput] = useState('');
    const [{ user, chat }] = useStateValue();


    const sendMessage = async (e) => {
        console.log('sending')
        e.preventDefault();

        await axios.post('/messages/new', {
            message: input,
            senderId: !!user ? user.uid : "unknown",
            senderName: !!user ? user.displayName : "unknown",
            timestamp: new Date().toString(),
            chatId: !!chat ? chat.chatId : "unknown"/*,
            receiverId: !!chat ? chat.chatUserIds.length > 1 ? chat.chatUserIds : chat.chatId : "unknown",
            receiverName: !!chat ? chat.chatName : "unknown"*/
        });

        setInput('');
    };

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>{!!chatInfo ? chatInfo.chatName : "unknown"}</h3>
                    <p>Last seen at {messages[messages.length -1]?.timestamp.split(" GMT")[0]}</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
                {messages
                    .map(message => (
                    <p className={`chat_message ${message.senderName === user.displayName /**
                        TODO: change to user unique identifier
                    */ && "chat_sender"}`}>
                        <span className="chat_name">{message.name}</span>
                        {message.message}
                        <span className="chat_timestamp">{message.timestamp.split(" GMT")[0]}</span>
                    </p>    
                ))}
            </div>

            <div className="chat_footer">
                <InsertEmoticon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit">Send a mesage</button>
                </form>
                <MicIcon />
            </div>
            
        </div>
    )
}

export default Chat
