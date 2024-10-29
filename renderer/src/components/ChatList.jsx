// renderer/src/components/ChatList.jsx
import React, { useEffect, useState, useContext } from 'react';
import { FirebaseAuthContext } from '../contexts/FirebaseAuthContext';

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const { user } = useContext(FirebaseAuthContext);

  useEffect(() => {
    if (user) {
      window.api.getChats(user.uid).then((response) => {
        if (response.success) {
          setChats(response.chats);
        } else {
          console.error(response.message);
        }
      });
    }
  }, [user]);

  const handleSelect = (chatId) => {
    onSelectChat(chatId);
  };

  const handleNewChat = async () => {
    const title = prompt('Enter chat title:');
    if (title) {
      // Choose default model or prompt for model
      const model = 'sonic-3.5';
      window.api.createChat(title, model, user.uid).then((response) => {
        if (response.success) {
          setChats([...chats, { id: response.chatId, title, model }]);
        } else {
          console.error(response.message);
        }
      });
    }
  };

  return (
    <div className="chat-list">
      <h2>Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id} onClick={() => handleSelect(chat.id)}>
            {chat.title || 'Untitled Chat'}
          </li>
        ))}
      </ul>
      <button onClick={handleNewChat}>New Chat</button>
    </div>
  );
};

export default ChatList;