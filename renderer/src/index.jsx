// renderer/src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css'; // Import global styles
import { ClerkProvider } from '@clerk/clerk-react';

// Ensure that CLERK_FRONTEND_API is available
const clerkFrontendApi = process.env.REACT_APP_CLERK_FRONTEND_API;

ReactDOM.render(
  <ClerkProvider frontendApi={clerkFrontendApi}>
    <App />
  </ClerkProvider>,
  document.getElementById('root')
);