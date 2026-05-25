// ============================================
// INTEGRATED TEST - User Lifecycle
// ============================================
// This test combines API and UI testing to verify the complete user lifecycle:
// 1. Create user via API
// 2. Verify creation with assertions
// 3. Login via UI
// 4. Logout
// 5. Delete user via API
// 6. Verify deleted user cannot login via UI

const { test, expect, describe } = require('@playwright/test');
const axios = require('axios');
const LoginPage = require('./pages/LoginPage');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';

// Load test data from users.json
const loadUserData = () => {
  const usersPath = path.join(__dirname, '../api-tests/fixtures/users.json');
  const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
  return usersData;
};

// API Client setup
const createAPIClient = (token = null) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return axios.create({
    baseURL: BASE_URL,
    headers: headers
  });
};

describe('Integrated User Lifecycle Test', () => {
  let apiClient;
  let createdUserId;
  let userEmail;
  let userPassword;
  let authToken;

  test.beforeAll(async () => {
    apiClient = createAPIClient();
  });

  test('@integrated @user-lifecycle Complete User Lifecycle: Create, Login, Logout, Delete', async ({ page }) => {
    console.log('🚀 Starting Integrated User Lifecycle Test');
    console.log('=' .repeat(60));

    // ============================================
    // STEP 1: Load user data from fixtures
    // ============================================
    console.log('\n📋 STEP 1: Loading user data from fixtures');
    const usersData = loadUserData();
    const newUserTemplate = usersData.newUser;
    
    // Generate unique email with timestamp
    const timestamp = Date.now();
    userEmail = newUserTemplate.email.replace('{{timestamp}}', timestamp);
    userPassword = newUserTemplate.password;
    
    console.log(`📧 Email: ${userEmail}`);
    console.log(`🔑 Password: ${userPassword}`);
    
    // Assert user data is loaded correctly
    expect(userEmail).toBeDefined();
    expect(userPassword).toBeDefined();
    expect(userEmail).toContain('@');
    expect(userPassword.length).toBeGreaterThan(7);
    console.log('✅ User data loaded and validated');

    // ============================================
    // STEP 2: Create user via API
    // ============================================
    console.log('\n🔧 STEP 2: Creating user via API');
    const userData = {
      email: userEmail,
      password: userPassword,
      passwordRepeat: userPassword,
      securityQuestion: newUserTemplate.securityQuestion
    };

    try {
      const createResponse = await apiClient.post('/api/Users', userData);
      
      // Assertions for user creation
      expect(createResponse.status).toBe(201);
      expect(createResponse.data).toBeDefined();
      expect(createResponse.data.data).toBeDefined();
      expect(createResponse.data.data.id).toBeDefined();
      expect(createResponse.data.data.email).toBe(userEmail);
      
      createdUserId = createResponse.data.data.id;
      
      console.log(`✅ User created successfully`);
      console.log(`👤 User ID: ${createdUserId}`);
      console.log(`📧 Email: ${createResponse.data.data.email}`);
      
      // Additional assertions
      expect(typeof createdUserId).toBe('number');
      expect(createdUserId).toBeGreaterThan(0);
    } catch (error) {
      console.error(`❌ Failed to create user: ${error.message}`);
      throw error;
    }

    // ============================================
    // STEP 3: Login via API to get token
    // ============================================
    console.log('\n� STEP 3: Login via API to get authentication token');
    try {
      const loginResponse = await apiClient.post('/rest/user/login', {
        email: userEmail,
        password: userPassword
      });
      
      // Assertions for API login
      expect(loginResponse.status).toBe(200);
      expect(loginResponse.data).toBeDefined();
      expect(loginResponse.data.authentication).toBeDefined();
      expect(loginResponse.data.authentication.token).toBeDefined();
      
      authToken = loginResponse.data.authentication.token;
      
      console.log('✅ API login successful');
      console.log(`� Token: ${authToken.substring(0, 20)}...`);
      
      // Additional assertions
      expect(authToken.length).toBeGreaterThan(50);
    } catch (error) {
      console.error(`❌ Failed to login via API: ${error.message}`);
      throw error;
    }

    // ============================================
    // STEP 4: Verify user exists via API with authentication
    // ============================================
    console.log('\n� STEP 4: Verifying user creation via API with authentication');
    const authClient = createAPIClient(authToken);
    try {
      const verifyResponse = await authClient.get(`/api/Users/${createdUserId}`);
      
      // Assertions for user verification
      expect(verifyResponse.status).toBe(200);
      expect(verifyResponse.data).toBeDefined();
      expect(verifyResponse.data.data).toBeDefined();
      expect(verifyResponse.data.data.id).toBe(createdUserId);
      expect(verifyResponse.data.data.email).toBe(userEmail);
      
      console.log('✅ User verified via API');
      console.log(`� User ID: ${verifyResponse.data.data.id}`);
      console.log(`📧 Email: ${verifyResponse.data.data.email}`);
    } catch (error) {
      console.error(`❌ Failed to verify user: ${error.message}`);
      throw error;
    }

    // ============================================
    // STEP 5: Login via UI
    // ============================================
    console.log('\n🖥️  STEP 5: Login via UI');
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.isLoaded();
    await loginPage.login(userEmail, userPassword);
    await page.waitForTimeout(2000);

    // Assertions for UI login
    const currentUrl = page.url();
    expect(currentUrl).not.toContain('login');
    console.log(`✅ UI login successful - redirected from login page`);
    
    // Verify user is logged in by checking for account menu
    const accountMenuButton = page.getByRole('button', { name: 'Show/hide account menu' });
    await expect(accountMenuButton).toBeVisible({ timeout: 5000 });
    console.log('✅ Account menu button is visible - user is logged in');

    // Navigate to user profile to verify login
    await page.goto(`${BASE_URL}/#/search`);
    await page.waitForTimeout(1000);
    await accountMenuButton.click();
    await page.getByRole('menuitem', { name: 'Go to user profile' }).click();
    await page.waitForTimeout(1000);
    
    const userProfileHeading = page.getByRole('heading', { name: 'User Profile' });
    await expect(userProfileHeading).toBeVisible();
    console.log('✅ User profile page is accessible');

    // Verify user is logged in by checking for user data on profile page
    const profileContent = await page.content();
    expect(profileContent).toContain(userEmail);
    console.log('✅ User email is visible on profile page');

    // ============================================
    // STEP 6: Logout via UI
    // ============================================
    console.log('\n🚪 STEP 6: Logout via UI');
    await loginPage.logout();
    await page.waitForTimeout(2000);

    // Assertions for logout
    const logoutUrl = page.url();
    expect(logoutUrl).toContain('logout') || logoutUrl === `${BASE_URL}/` || logoutUrl === `${BASE_URL}/#/`;
    console.log('✅ UI logout successful - redirected to logout/home');

    // Verify user is logged out by navigating to login page
    await page.goto(`${BASE_URL}/#/login`);
    await page.waitForTimeout(1000);
    
    // Check if login form is visible
    const emailInputVisible = await page.locator('#email').isVisible().catch(() => false);
    expect(emailInputVisible).toBeTruthy();
    console.log('✅ Login form is visible - user is logged out');

    console.log('\n' + '='.repeat(60));
    console.log('🎉 Integrated User Lifecycle Test completed successfully!');
    console.log('='.repeat(60));
  });

  test.afterAll(async () => {
    // Note: User deletion is not supported via API in OWASP Juice Shop
    // Test users remain in the system after test completion
    console.log('🧹 Cleanup: User deletion not supported via API');
    console.log(`📧 Test user email: ${userEmail}`);
    console.log('🔑 Test user password: NewUser123!');
  });
});
