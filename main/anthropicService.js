// main/anthropicService.js
const axios = require('axios');
const admin = require('firebase-admin');

// Assuming Firebase Admin SDK is initialized in FirebaseService.js
const db = admin.firestore();

const getAIResponse = async (userId, model, messages) => {
  try {
    // Fetch user's Anthropic API key from Firestore
    const userDocRef = db.collection('users').doc(userId);
    const userDoc = await userDocRef.get();
    if (!userDoc.exists) {
      throw new Error('User not found');
    }
    const userData = userDoc.data();
    const apiKey = userData.anthropicApiKey;
    if (!apiKey) {
      throw new Error('Anthropic API key not found for user');
    }

    const response = await axios.post(
      `https://api.anthropic.com/v1/models/${model}/completions`,
      {
        prompt: constructPrompt(messages),
        max_tokens: 150,
        // Add other parameters as needed
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    return {
      role: 'ai',
      content: response.data.choices[0].text.trim(),
    };
  } catch (error) {
    console.error('AI Response Error:', error);
    return { role: 'ai', content: 'Error generating response.' };
  }
};

const constructPrompt = (messages) => {
  // Convert message history into a prompt format required by Anthropic
  let prompt = '';
  messages.forEach((msg) => {
    if (msg.role === 'user') {
      prompt += `User: ${msg.content}\n`;
    } else if (msg.role === 'ai') {
      prompt += `AI: ${msg.content}\n`;
    }
  });
  prompt += 'AI:';
  return prompt;
};

module.exports = {
  getAIResponse,
};