// renderer/src/components/ChatList.jsx
import React, { useEffect, useState } from 'react';
import { getChats } from '../../main/db'; // Assuming you expose DB methods via preload

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Fetch chats from local storage or database
    window.api.getChats().then((data) => setChats(data));
  }, []);

  const handleSelect = (chatId) => {
    onSelectChat(chatId);
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
      <button onClick={() => {/* Implement new chat creation */}}>New Chat</button>
    </div>
  );
};

export default ChatList;