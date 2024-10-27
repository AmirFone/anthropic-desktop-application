// main/whisper.js
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const transcribeAudio = async (audioPath) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY; // Store securely
    const formData = new FormData();
    formData.append('file', fs.createReadStream(audioPath));
    formData.append('model', 'whisper-1');

    const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        ...formData.getHeaders(),
      },
    });

    return response.data.text;
  } catch (error) {
    console.error('Transcription Error:', error);
    throw new Error('Transcription failed');
  }
};

module.exports = {
  transcribeAudio,
};