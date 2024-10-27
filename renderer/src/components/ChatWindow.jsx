// renderer/src/components/ChatWindow.jsx
import React, { useEffect, useState, useRef } from 'react';
import ImageUploader from './ImageUploader';
import Microphone from './Microphone';
// renderer/src/components/ChatWindow.jsx (updated sendMessage)
const sendMessage = async () => {
	if (!input.trim()) return;
	// Save user message
	const userMessage = { role: 'user', content: input };
	await window.api.addMessage(chatId, userMessage);
	setMessages([...messages, userMessage]);
	setInput('');
      
	// Fetch AI response from Anthropic
	const response = await window.api.getAIResponse(chatId, model);
	if (response.success) {
	  setMessages((prev) => [...prev, response.message]);
	  await window.api.addMessage(chatId, response.message);
	} else {
	  alert(response.message);
	}
      };
const ChatWindow = ({ chatId, model }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Fetch chat messages from the database
    window.api.getChatMessages(chatId).then((msgs) => setMessages(msgs));
  }, [chatId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    // Save user message
    const userMessage = { role: 'user', content: input };
    await window.api.addMessage(chatId, userMessage);
    setMessages([...messages, userMessage]);
    setInput('');

    // Fetch AI response from Anthropic
    const aiResponse = await window.api.getAIResponse(chatId, model);
    if (aiResponse) {
      setMessages((prev) => [...prev, aiResponse]);
      await window.api.addMessage(chatId, aiResponse);
    }
  };

  const handleImageUpload = async (imagePath) => {
    // Save image message
    const imageMessage = { role: 'user', content: 'Sent an image', image: imagePath };
    await window.api.addMessage(chatId, imageMessage);
    setMessages([...messages, imageMessage]);

    // Optionally, handle AI response to image
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <div className="message-content">
              {msg.content}
              {msg.image && <img src={msg.image} alt="uploaded" />}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <ImageUploader onUpload={handleImageUpload} />
        <Microphone onTranscribe={(text) => setInput(text)} />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;