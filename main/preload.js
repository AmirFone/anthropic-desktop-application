// main/preload.js
const { contextBridge, ipcRenderer } = require('electron');
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getAIResponse: async (userId, chatId, model) => {
    return await ipcRenderer.invoke('get-ai-response', userId, chatId, model);
  },
  createChat: async (title, model, userId) => {
    return await ipcRenderer.invoke('create-chat', title, model, userId);
  },
  getChats: async (userId) => {
    return await ipcRenderer.invoke('get-chats', userId);
  },
  getChatMessages: async (chatId) => {
    return await ipcRenderer.invoke('get-chat-messages', chatId);
  },
  addMessage: async (chatId, message) => {
    return await ipcRenderer.invoke('add-message', chatId, message);
  },
  uploadImage: async (imagePath) => {
    return await ipcRenderer.invoke('upload-image', imagePath);
  },
  takeScreenshot: async () => {
    return await ipcRenderer.invoke('take-screenshot');
  },
  transcribeAudio: async (audioPath) => {
    return await ipcRenderer.invoke('transcribe-audio', audioPath);
  },
});