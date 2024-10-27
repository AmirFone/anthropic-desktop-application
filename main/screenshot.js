// main/screenshot.js
const screenshot = require('screenshot-desktop');
const fs = require('fs');
const path = require('path');

const takeScreenshot = async () => {
  try {
    const img = await screenshot({ format: 'png' });
    const screenshotPath = path.join(app.getPath('pictures'), `screenshot-${Date.now()}.png`);
    fs.writeFileSync(screenshotPath, img);
    return screenshotPath;
  } catch (error) {
    throw new Error('Screenshot failed');
  }
};

module.exports = {
  takeScreenshot,
};