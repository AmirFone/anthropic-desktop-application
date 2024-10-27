// renderer/src/components/Settings.jsx
import React from 'react';
import { useUser, UserButton } from '@clerk/clerk-react';

const Settings = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="settings">
      <UserButton />
      {/* Add additional settings as needed */}
    </div>
  );
};

export default Settings;