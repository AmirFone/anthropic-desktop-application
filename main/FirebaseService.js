// main/FirebaseService.js
const admin = require('firebase-admin');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  }),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const db = admin.firestore();

// Create a new chat
const createChat = async (userId, title, model) => {
  const chatId = `chat-${Date.now()}`;
  await db.collection('chats').doc(chatId).set({
    id: chatId,
    userId: userId,
    title: title,
    model: model,
    messages: [],
    created_at: new Date().toISOString(),
  });
  return chatId;
};

// Retrieve all chats for a user
const getChats = async (userId) => {
  const chatsRef = db.collection('chats');
  const snapshot = await chatsRef.where('userId', '==', userId).get();
  if (snapshot.empty) {
    return [];
  }
  const chats = [];
  snapshot.forEach((doc) => {
    chats.push(doc.data());
  });
  return chats;
};

// Retrieve messages for a specific chat
const getChatMessages = async (chatId) => {
  const chatDoc = await db.collection('chats').doc(chatId).get();
  if (!chatDoc.exists) {
    return [];
  }
  const chatData = chatDoc.data();
  return chatData.messages || [];
};

// Add a message to a chat
const addMessage = async (chatId, message) => {
  const chatRef = db.collection('chats').doc(chatId);
  await chatRef.update({
    messages: admin.firestore.FieldValue.arrayUnion(message),
  });
};

module.exports = {
  createChat,
  getChats,
  getChatMessages,
  addMessage,
};