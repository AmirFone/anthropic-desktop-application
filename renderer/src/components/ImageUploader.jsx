// renderer/src/components/ImageUploader.jsx
import React from 'react';

const ImageUploader = ({ onUpload }) => {
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Send file path to Main Process for uploading
      const response = await window.api.uploadImage(file.path);
      if (response.success) {
        onUpload(response.url); // Pass S3 URL to ChatWindow
      } else {
        alert(response.message);
      }
    }
  };

  return (
    <div className="image-uploader">
      <label htmlFor="image-upload">
        <img src="/images/upload-icon.png" alt="Upload" />
      </label>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default ImageUploader;