const fs = require('fs');
const path = require('path');

class Logger {
  constructor(logDir = './logs') {
    this.logDir = logDir;
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  logUserCredentials(userData, filename = 'user-credentials.json') {
    const filePath = path.join(this.logDir, filename);
    let credentials = [];

    if (fs.existsSync(filePath)) {
      credentials = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    credentials.push(userData);
    fs.writeFileSync(filePath, JSON.stringify(credentials, null, 2));
  }

  logTestResult(testName, result, filename = 'test-results.json') {
    const filePath = path.join(this.logDir, filename);
    let results = [];

    if (fs.existsSync(filePath)) {
      results = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    results.push({
      testName,
      result,
      timestamp: new Date().toISOString(),
    });

    fs.writeFileSync(filePath, JSON.stringify(results, null, 2));
  }

  readUserCredentials(filename = 'user-credentials.json') {
    const filePath = path.join(this.logDir, filename);
    if (!fs.existsSync(filePath)) {
      return [];
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
}

module.exports = Logger;
