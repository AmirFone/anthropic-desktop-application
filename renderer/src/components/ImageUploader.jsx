// renderer/src/components/ImageUploader.jsx
import React from 'react';
// renderer/src/components/ImageUploader.jsx (updated handleFileSelect)
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
const ImageUploader = ({ onUpload }) => {
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Send file to Main Process for handling (e.g., upload to S3)
      const imagePath = await window.api.uploadImage(file.path);
      onUpload(imagePath);
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