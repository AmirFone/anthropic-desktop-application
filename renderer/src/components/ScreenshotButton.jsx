// renderer/src/components/ScreenshotButton.jsx
import React from 'react';

const ScreenshotButton = ({ onScreenshot }) => {
  const handleScreenshot = async () => {
    const response = await window.api.takeScreenshot();
    if (response.success) {
      onScreenshot(response.path);
    } else {
      alert(response.message);
    }
  };

  return (
    <button onClick={handleScreenshot}>
      <img src="/images/screenshot-icon.png" alt="Screenshot" />
    </button>
  );
};

export default ScreenshotButton;