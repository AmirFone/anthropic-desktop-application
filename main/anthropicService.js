// main/anthropicService.js
const axios = require('axios');

const getAIResponse = async (chatId, model, messages) => {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY; // Store securely
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