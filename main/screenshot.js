// main/screenshot.js
const screenshot = require('screenshot-desktop');
const fs = require('fs');
const path = require('path');
const { app } = require('electron');

const takeScreenshot = async () => {
  try {
    const img = await screenshot({ format: 'png' });
    const screenshotPath = path.join(app.getPath('pictures'), `screenshot-${Date.now()}.png`);
    fs.writeFileSync(screenshotPath, img);
    return screenshotPath;
  } catch (error) {
    console.error('Screenshot Error:', error);
    throw new Error('Screenshot failed');
  }
};

module.exports = {
  takeScreenshot,
};