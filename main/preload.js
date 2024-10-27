// main/preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  authenticate: async (credentials) => {
    return await ipcRenderer.invoke('authenticate', credentials);
  },
  // Expose other APIs as needed
});
// main/preload.js (updated)
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  authenticate: async (credentials) => {
    return await ipcRenderer.invoke('authenticate', credentials);
  },
  getChats: async () => {
    return await ipcRenderer.invoke('get-chats');
  },
  getChatMessages: async (chatId) => {
    return await ipcRenderer.invoke('get-chat-messages', chatId);
  },
  addMessage: async (chatId, message) => {
    return await ipcRenderer.invoke('add-message', chatId, message);
  },
  createChat: async (title, model) => {
    return await ipcRenderer.invoke('create-chat', title, model);
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