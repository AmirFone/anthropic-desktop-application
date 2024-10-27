// renderer/src/App.jsx
import React, { useState } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import Settings from './components/Settings';
import ModelSelector from './components/ModelSelector';
import { SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react';
import './App.css';

const App = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [model, setModel] = useState('sonic-3.5'); // Default model

  return (
    <div className="app-container">
      <SignedIn>
        <aside className="sidebar">
          <ChatList onSelectChat={setActiveChat} />
          <ModelSelector selectedModel={model} onChangeModel={setModel} />
          <Settings />
        </aside>
        <main className="main-content">
          {activeChat ? <ChatWindow chatId={activeChat} model={model} /> : <div>Select a chat to start</div>}
        </main>
      </SignedIn>
      <SignedOut>
        <div className="auth-container">
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
          <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
        </div>
      </SignedOut>
    </div>
  );
};

export default App;