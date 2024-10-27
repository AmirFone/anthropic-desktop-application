// main/S3Service.js
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,       // Ensure these are set in .env
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,                   // e.g., 'us-east-1'
});

const s3 = new AWS.S3();
const bucketName = process.env.AWS_S3_BUCKET_NAME;   // e.g., 'your-s3-bucket'

const uploadImage = async (filePath) => {
  try {
    const fileContent = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);
    const params = {
      Bucket: bucketName,
      Key: `images/${Date.now()}-${fileName}`,
      Body: fileContent,
      ContentType: 'image/png', // Adjust based on file type
      ACL: 'public-read',       // Adjust permissions as needed
    };

    const data = await s3.upload(params).promise();
    return data.Location;       // URL of the uploaded image
  } catch (error) {
    console.error('S3 Upload Error:', error);
    throw new Error('Image upload failed');
  }
};

module.exports = {
  uploadImage,
};