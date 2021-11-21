import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, SearchOutlined } from '@material-ui/icons';
import MoreVert from '@material-ui/icons/MoreVert';
import MicIcon from '@material-ui/icons/Mic';
import React, { useState } from 'react';
import "./Chat.css";
import axios from './axios.js';
import { useStateValue } from './StateProvider';

function Chat({ messages }) {
    const [input, setInput] = useState('');
    const [{ user, room }] = useStateValue();


    const sendMessage = async (e) => {
        console.log('sending')
        e.preventDefault();

        await axios.post('/messages/new', {
            message: input,
            name: !!user ? user.displayName : "unkown",
            timestamp: new Date().toString(),
            received: false,
            roomId: !!room ? room.roomId : "unkown"
        });

        setInput('');
    };

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>Room name</h3>
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
                {messages.map(message => (
                    <p className={`chat_message ${message.name === user.displayName /**
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
