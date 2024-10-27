// renderer/src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css'; // Import global styles
import { ClerkProvider } from '@clerk/clerk-react';

const clerkFrontendApi = process.env.CLERK_FRONTEND_API;

ReactDOM.render(
  <ClerkProvider frontendApi={clerkFrontendApi}>
    <App />
  </ClerkProvider>,
  document.getElementById('root')
);