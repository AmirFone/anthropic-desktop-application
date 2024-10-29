// renderer/src/index.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css'; // Import global styles
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { FirebaseAuthProvider } from './contexts/FirebaseAuthContext';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

console.log('Firestore Initialized:', db); // For debugging purposes

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <FirebaseAuthProvider>
    <App />
  </FirebaseAuthProvider>
);