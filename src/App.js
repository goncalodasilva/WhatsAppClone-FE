import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from './axios.js';
import Login from './Login';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';


function App() {
  const [messages, setMessages] = useState([]);
  const [chats, setChats] =  useState([]);
  const [{ user, chat }] = useStateValue();
  
  const loadMessages = () => {
    if (!chat) {
      console.log('chat null')
      return
    }
    const url = '/messages/' + chat
    axios.get(url).then(response => {
      console.log('getMessages response.data', response.data)
      setMessages(response.data)
    })
  }
  // load messages
  useEffect(() => {
    console.log('Get Messages', chat)
    loadMessages();
    
  }, [chat])
  /*useEffect(() => {
    console.log('loading messages', user)
    if (!user || !user.uid) {
      console.log('user null')
      return
    }
    const userId = user.uid
    const url = '/messages/sync/' + userId 
    axios.get(url)
    .then(response => {
      console.log('response.data', response.data)
      if (chatIds !== response.data.chatKeys) {
        setChatIds(response.data.chatKeys)
      }
      setMessages(!!chat ? response.data[chat] : []);
      if ((!chat || chatIds.indexOf(chat) === -1) && chatIds.length > 0) {
        dispatch({
          type: actionTypes.SET_CHAT,
          chat: chatIds[0]
        })
      }
    })
  }, [user, chat, chatIds, dispatch])*/



  // load chats info
  useEffect(() => {
    console.log('Get Chats')
    if (!user || !user.uid) {
      console.log('user null')
      return
    }
    const url = '/chats/' + user.uid
    axios.get(url).then(response => {
      console.log('getChats response.data', response.data)
      setChats(response.data)
    })
  }, [user])
  /*useEffect(() => {
    console.log('loading chats info: chatIds:', chatIds)
    chatIds.forEach(id => {
      if (!id || id === '') {
        return;
      }
      const url = '/chats/' + id
      axios.get(url)
      .then(response => {
          console.log('chats info loaded:', response)
          dispatch({
            type: actionTypes.SET_CHATS,
            chats: [...chats, {
              chatId: response.data.chatId,
              chatName: response.data.chatName,
              chatUsersIds: response.data.chatUsersIds
            }]
          })
        })
      });

      if (chats.length > 0 && !!chats[0].chatId) {
        dispatch({
          type: actionTypes.SET_CHAT,
          chat: chats[0]
        })
      }
    }, [chats, dispatch, chatIds])*/
    

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


  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Router>
            <Sidebar chats={chats}/>

            <Switch>
              <Route path="/">
                {console.log('chats', chats)}
                <Chat messages={messages} chatInfo={chats.filter(c => c.chatId === chat)[0]}/>
              </Route>
            </Switch>
            
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
