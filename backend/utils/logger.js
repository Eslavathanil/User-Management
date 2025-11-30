const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFile = path.join(logDir, 'app.log');

const getTimestamp = () => {
  return new Date().toISOString();
};

const writeLog = (level, message) => {
  const logMessage = `[${getTimestamp()}] [${level}] ${message}\n`;
  
  // Write to file
  fs.appendFileSync(logFile, logMessage);
  
  // Also log to console in development
  if (process.env.NODE_ENV !== 'production') {
    console.log(logMessage.trim());
  }
};

module.exports = {
  info: (message) => writeLog('INFO', message),
  error: (message) => writeLog('ERROR', message),
  warn: (message) => writeLog('WARN', message),
  debug: (message) => writeLog('DEBUG', message)
};
