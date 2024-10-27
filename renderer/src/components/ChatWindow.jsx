// renderer/src/components/ChatWindow.jsx
import React, { useEffect, useState, useRef } from 'react';
import ImageUploader from './ImageUploader';
import Microphone from './Microphone';
import ScreenshotButton from './ScreenshotButton';

const ChatWindow = ({ chatId, model }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Fetch chat messages from DynamoDB
    window.api.getChatMessages(chatId).then((response) => {
      if (response.success) {
        setMessages(response.messages);
      } else {
        console.error(response.message);
      }
    });
  }, [chatId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    // Save user message
    const userMessage = { role: 'user', content: input };
    const addMsgResponse = await window.api.addMessage(chatId, userMessage);
    if (addMsgResponse.success) {
      setMessages([...messages, userMessage]);
      setInput('');

      // Fetch AI response from Anthropic
      const aiResponse = await window.api.getAIResponse(chatId, model);
      if (aiResponse.success) {
        setMessages((prev) => [...prev, aiResponse.message]);
        await window.api.addMessage(chatId, aiResponse.message);
      } else {
        console.error(aiResponse.message);
        const errorMsg = { role: 'ai', content: 'Error generating response.' };
        setMessages((prev) => [...prev, errorMsg]);
        await window.api.addMessage(chatId, errorMsg);
      }
    } else {
      console.error(addMsgResponse.message);
    }
  };

  const handleImageUpload = async (imageUrl) => {
    // Save image message
    const imageMessage = { role: 'user', content: 'Sent an image', image: imageUrl };
    const addMsgResponse = await window.api.addMessage(chatId, imageMessage);
    if (addMsgResponse.success) {
      setMessages([...messages, imageMessage]);
      // Optionally, handle AI response to image
    } else {
      console.error(addMsgResponse.message);
    }
  };

  const handleScreenshot = async (screenshotPath) => {
    // Upload screenshot to S3 and get URL
    const response = await window.api.uploadImage(screenshotPath);
    if (response.success) {
      const imageUrl = response.url;
      const screenshotMessage = { role: 'user', content: 'Sent a screenshot', image: imageUrl };
      await window.api.addMessage(chatId, screenshotMessage);
      setMessages([...messages, screenshotMessage]);
    } else {
      console.error(response.message);
    }
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
        <ScreenshotButton onScreenshot={handleScreenshot} />
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