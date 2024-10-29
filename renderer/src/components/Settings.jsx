// renderer/src/components/Settings.jsx
import React, { useContext } from 'react';
import { FirebaseAuthContext } from '../contexts/FirebaseAuthContext';

const Settings = () => {
  const { user, auth } = useContext(FirebaseAuthContext);

  if (!user) return null;

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <div className="settings">
      <p>{user.email}</p>
      <button onClick={handleSignOut}>Sign Out</button>
      {/* Add additional settings as needed */}
    </div>
  );
};

export default Settings;