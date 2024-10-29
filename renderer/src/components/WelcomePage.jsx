// renderer/src/components/WelcomePage.jsx
import React, { useState, useContext } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { FirebaseAuthContext } from '../contexts/FirebaseAuthContext';

const WelcomePage = ({ onApiKeySaved }) => {
  const [apiKey, setApiKey] = useState('');
  const { user } = useContext(FirebaseAuthContext);
  const db = getFirestore();

  const handleSaveApiKey = async () => {
    if (!apiKey) {
      alert('Please enter your Anthropic API key.');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(
        userDocRef,
        { anthropicApiKey: apiKey.trim() },
        { merge: true }
      );
      alert('API key saved successfully!');
      onApiKeySaved();
    } catch (error) {
      console.error('Error saving API key:', error);
      alert('Failed to save API key.');
    }
  };

  return (
    <div className="welcome-page">
      <h2>Welcome to the Chat App</h2>
      <p>
        Please enter your Anthropic API key to start using the application. You
        can obtain your API key from Anthropic's website.
      </p>
      <input
        type="text"
        placeholder="Enter your Anthropic API key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <button onClick={handleSaveApiKey}>Save API Key</button>
    </div>
  );
};

export default WelcomePage;