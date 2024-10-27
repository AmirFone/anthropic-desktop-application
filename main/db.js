// main/db.js
const path = require('path');
const Database = require('better-sqlite3');
const { app } = require('electron');

const dbPath = path.join(app.getPath('userData'), 'chat.db');
const db = new Database(dbPath);

// Initialize tables
const initDB = () => {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS chats (
      id TEXT PRIMARY KEY,
      title TEXT,
      model TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chat_id TEXT,
      role TEXT,
      content TEXT,
      image_path TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(chat_id) REFERENCES chats(id)
    )
  `).run();
};

// Initialize database
initDB();

// IPC handlers for database operations
const getChats = () => {
  return db.prepare('SELECT * FROM chats').all();
};

const getChatMessages = (chatId) => {
  return db.prepare('SELECT * FROM messages WHERE chat_id = ? ORDER BY timestamp').all(chatId);
};

const addMessage = (chatId, message) => {
  const stmt = db.prepare('INSERT INTO messages (chat_id, role, content, image_path) VALUES (?, ?, ?, ?)');
  stmt.run(chatId, message.role, message.content, message.image || null);
};

const createChat = (title, model) => {
  const id = `chat-${Date.now()}`;
  const stmt = db.prepare('INSERT INTO chats (id, title, model) VALUES (?, ?, ?)');
  stmt.run(id, title, model);
  return id;
};

module.exports = {
  getChats,
  getChatMessages,
  addMessage,
  createChat,
};