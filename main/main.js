// main/main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { createChat, getChats, getChatMessages, addMessage } = require('./FirebaseService');
const { takeScreenshot } = require('./screenshot');
const { transcribeAudio } = require('./whisper');
const { uploadImage } = require('./FirebaseStorageService');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true, // Enable contextIsolation
      webSecurity: false,
    },
  });
win.webContents.openDevTools(); 
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:3000'); // During development
    win.webContents.openDevTools();
  } else {
    win.loadFile('renderer/public/index.html'); // For production
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// For macOS re-opening the app
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// IPC handler for Firebase operations
ipcMain.handle('create-chat', async (event, title, model, userId) => {
  try {
    const chatId = await createChat(userId, title, model);
    return { success: true, chatId };
  } catch (error) {
    console.error('Create Chat Error:', error);
    return { success: false, message: error.message };
  }
});

ipcMain.handle('get-chats', async (event, userId) => {
  try {
    const chats = await getChats(userId);
    return { success: true, chats };
  } catch (error) {
    console.error('Get Chats Error:', error);
    return { success: false, message: error.message };
  }
});

ipcMain.handle('get-chat-messages', async (event, chatId) => {
  try {
    const messages = await getChatMessages(chatId);
    return { success: true, messages };
  } catch (error) {
    console.error('Get Chat Messages Error:', error);
    return { success: false, message: error.message };
  }
});

ipcMain.handle('add-message', async (event, chatId, message) => {
  try {
    await addMessage(chatId, message);
    return { success: true };
  } catch (error) {
    console.error('Add Message Error:', error);
    return { success: false, message: error.message };
  }
});

// IPC handler for taking screenshots
ipcMain.handle('take-screenshot', async () => {
  try {
    const imgPath = await takeScreenshot();
    return { success: true, path: imgPath };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

// IPC handler for transcribing audio
ipcMain.handle('transcribe-audio', async (event, audioPath) => {
  try {
    const text = await transcribeAudio(audioPath);
    return { success: true, text };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

// IPC handler for uploading images
ipcMain.handle('upload-image', async (event, imagePath) => {
  try {
    const imageUrl = await uploadImage(imagePath);
    return { success: true, url: imageUrl };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

const { getAIResponse } = require('./anthropicService');

// Add IPC handler for getting AI response
ipcMain.handle('get-ai-response', async (event, userId, chatId, model) => {
  try {
    // Fetch messages for the chat
    const messages = await getChatMessages(chatId);
    // Get AI response
    const aiMessage = await getAIResponse(userId, model, messages);
    // Add AI message to chat
    await addMessage(chatId, aiMessage);
    return { success: true, message: aiMessage };
  } catch (error) {
    console.error('Get AI Response Error:', error);
    return { success: false, message: error.message };
  }
});