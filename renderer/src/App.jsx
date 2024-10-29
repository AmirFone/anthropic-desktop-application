// renderer/src/App.jsx
import React, { useState, useContext, useEffect } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import Settings from './components/Settings';
import ModelSelector from './components/ModelSelector';
import SignIn from './components/SignIn';
import WelcomePage from './components/WelcomePage';
import { FirebaseAuthContext } from './contexts/FirebaseAuthContext';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import './App.css';

const App = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [model, setModel] = useState('sonic-3.5'); // Default model
  const { user } = useContext(FirebaseAuthContext);
  const [hasApiKey, setHasApiKey] = useState(false);
  const db = getFirestore();

  useEffect(() => {
    const checkApiKey = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.anthropicApiKey) {
            setHasApiKey(true);
          } else {
            setHasApiKey(false);
          }
        } else {
          setHasApiKey(false);
        }
      }
    };
    checkApiKey();
  }, [user]);

  if (!user) {
    return (
      <div className="auth-container">
        <SignIn />
      </div>
    );
  }

  if (!hasApiKey) {
    return (
      <div className="welcome-container">
        <WelcomePage onApiKeySaved={() => setHasApiKey(true)} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <aside className="sidebar">
        <ChatList onSelectChat={setActiveChat} />
        <ModelSelector selectedModel={model} onChangeModel={setModel} />
        <Settings />
      </aside>
      <main className="main-content">
        {activeChat ? (
          <ChatWindow chatId={activeChat} model={model} />
        ) : (
          <div>Select a chat to start</div>
        )}
      </main>
    </div>
  );
};

export default App;