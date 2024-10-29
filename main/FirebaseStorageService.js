// main/FirebaseStorageService.js
const admin = require('firebase-admin');
const path = require('path');

// Assuming Firebase Admin SDK is already initialized in FirebaseService.js
const bucket = admin.storage().bucket();

const uploadImage = async (filePath) => {
  try {
    const fileName = path.basename(filePath);
    const destination = `images/${Date.now()}-${fileName}`;

    await bucket.upload(filePath, {
      destination: destination,
      metadata: {
        contentType: 'image/png', // Adjust as necessary
        metadata: {
          firebaseStorageDownloadTokens: Date.now(),
        },
      },
    });

    // Get public URL
    const file = bucket.file(destination);
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2491', // Some far future date
    });

    return url;
  } catch (error) {
    console.error('Firebase Storage Upload Error:', error);
    throw new Error('Image upload failed');
  }
};

module.exports = {
  uploadImage,
};