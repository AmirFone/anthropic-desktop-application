// main/main/DynamoDBService.js
const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,     // Ensure these are set in .env
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,                 // e.g., 'us-east-1'
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.AWS_DYNAMODB_TABLE_NAME; // e.g., 'ChatHistory'

// Create a new chat
const createChat = async (userId, title, model) => {
  const chatId = `chat-${Date.now()}`;
  const params = {
    TableName: tableName,
    Item: {
      id: chatId,
      userId: userId,
      title: title,
      model: model,
      messages: [], // Initialize empty messages array
      created_at: new Date().toISOString(),
    },
  };

  await dynamodb.put(params).promise();
  return chatId;
};

// Retrieve all chats for a user
const getChats = async (userId) => {
  const params = {
    TableName: tableName,
    IndexName: 'userId-index', // Ensure this GSI exists
    KeyConditionExpression: 'userId = :uid',
    ExpressionAttributeValues: {
      ':uid': userId,
    },
  };

  const data = await dynamodb.query(params).promise();
  return data.Items;
};

// Retrieve messages for a specific chat
const getChatMessages = async (chatId) => {
  const params = {
    TableName: tableName,
    Key: {
      id: chatId,
    },
  };

  const data = await dynamodb.get(params).promise();
  return data.Item ? data.Item.messages : [];
};

// Add a message to a chat
const addMessage = async (chatId, message) => {
  const params = {
    TableName: tableName,
    Key: {
      id: chatId,
    },
    UpdateExpression: 'SET #messages = list_append(#messages, :msg)',
    ExpressionAttributeNames: {
      '#messages': 'messages',
    },
    ExpressionAttributeValues: {
      ':msg': [message],
    },
    ReturnValues: 'UPDATED_NEW',
  };

  await dynamodb.update(params).promise();
};

module.exports = {
  createChat,
  getChats,
  getChatMessages,
  addMessage,
};