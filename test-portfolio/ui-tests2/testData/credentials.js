const credentials = {
  admin: {
    email: 'admin@juice-sh.op',
    password: 'admin123'
  },
  
  generateUserCredentials() {
    const timestamp = Date.now();
    return {
      email: `testuser${timestamp}@test.com`,
      password: `TestPass${timestamp}!`
    };
  },
  
  getApiUserCredentials() {
    return {
      email: 'api_test@example.com',
      password: 'ApiTest123!'
    };
  }
};

module.exports = credentials;
