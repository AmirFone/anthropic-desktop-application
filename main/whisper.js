// main/whisper.js
const axios = require('axios');
const FormData = require('form-data');

const transcribeAudio = async (blob) => {
  try {
    const formData = new FormData();
    formData.append('file', blob, 'audio.webm'); // Adjust name and type if needed
    formData.append('model', 'whisper-1');

    const response = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          ...formData.getHeaders(),
        },
      }
    );

    return { success: true, text: response.data.text };
  } catch (error) {
    console.error('Transcription Error:', error);
    return { success: false, message: 'Transcription failed' };
  }
};

module.exports = {
  transcribeAudio,
};