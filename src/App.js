import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from './axios.js';
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatchUser] = useStateValue();
  const [{ room }, dispachRoom] = useStateValue();

  useEffect(() => {
    axios.get('/messages/sync').then(response => {
      setMessages(response.data.filter((msg) => msg.roomId === room.roomId));
    })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('0b13950db72a15911ff2', {
      cluster: 'eu'
    });
    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      //alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Router>
            <Sidebar />

            <Switch>
              <Route path="/rooms/:room.roomId">
                <Chat messages={messages}/>
              </Route>
              <Route path="/">
                <Chat messages={messages}/>
              </Route>
            </Switch>
            
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
