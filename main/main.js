// main/main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { authenticateUser } = require('./auth');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // security configurations
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadURL('http://localhost:3000'); // During development
  // For production, load the built index.html
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handler for authentication
ipcMain.handle('authenticate', async (event, credentials) => {
  try {
    const user = await authenticateUser(credentials);
    return { success: true, user };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

// main/main.js (continued)
const { takeScreenshot } = require('./screenshot');

ipcMain.handle('take-screenshot', async () => {
  try {
    const imgPath = await takeScreenshot();
    return { success: true, path: imgPath };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

// main/main.js (continued)
const { transcribeAudio } = require('./whisper');

ipcMain.handle('transcribe-audio', async (event, audioPath) => {
  try {
    const text = await transcribeAudio(audioPath);
    return { success: true, text };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

// main/main.js (continued)
const { getChats, getChatMessages, addMessage, createChat } = require('./db');

ipcMain.handle('get-chats', async () => {
  return getChats();
});

ipcMain.handle('get-chat-messages', async (event, chatId) => {
  return getChatMessages(chatId);
});

ipcMain.handle('add-message', async (event, chatId, message) => {
  addMessage(chatId, message);
  return { success: true };
});

ipcMain.handle('create-chat', async (event, title, model) => {
  const chatId = createChat(title, model);
  return { success: true, chatId };
});

// main/main.js (continued)
const { getAIResponse } = require('./anthropicService');

ipcMain.handle('get-ai-response', async (event, chatId, model) => {
  try {
    const messages = getChatMessages(chatId);
    const aiMessage = await getAIResponse(chatId, model, messages);
    return { success: true, message: aiMessage };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

// main/main.js (continued)
const { uploadImage } = require('./S3Service');

ipcMain.handle('upload-image', async (event, imagePath) => {
  try {
    const imageUrl = await uploadImage(imagePath);
    return { success: true, url: imageUrl };
  } catch (error) {
    return { success: false, message: error.message };
  }
});