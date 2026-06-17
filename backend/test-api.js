import { MongoMemoryServer } from 'mongodb-memory-server';

async function runTests() {
  console.log('\n==================================================');
  console.log('STARTING INTEGRATION TESTS WITH IN-MEMORY MONGODB');
  console.log('==================================================\n');

  let mongoServer;
  let mongoose;
  let User;
  let server;

  try {
    console.log('Starting in-memory MongoDB server...');
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    console.log(`In-memory MongoDB started: ${mongoUri}`);

    // Set the environment variable before importing the server so it connects to the test database
    process.env.MONGODB_URI = mongoUri;

    // Dynamically import mongoose and other internal modules
    mongoose = (await import('mongoose')).default;
    User = (await import('./src/models/User.js')).default;
    server = (await import('./src/server.js')).default;
  } catch (initError) {
    console.error('Initialization failed:', initError);
    if (mongoServer) await mongoServer.stop();
    process.exit(1);
  }

  const PORT = process.env.PORT || 5000;
  const BASE_URL = `http://127.0.0.1:${PORT}`;

  // Helper delay function
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Wait a brief moment for database connection in server.js to establish
  console.log('Waiting for database connection to establish...');
  await delay(2000);

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  const testUser = {
    username: 'testuser123',
    email: 'testuser123@example.com',
    password: 'securepassword123',
  };

  let token = '';

  try {
    // 1. Test unprotected base route
    console.log('\n--- Test 1: Base Route ---');
    const baseRes = await fetch(`${BASE_URL}/`);
    const baseData = await baseRes.json();
    assert(baseRes.status === 200, 'Base endpoint returns 200 OK');
    assert(
      baseData.message && baseData.message.includes('API is running'),
      'Base response contains expected running message'
    );

    // 2. Test access to protected route without JWT
    console.log('\n--- Test 2: Protected Route without Token ---');
    const protectedNoTokenRes = await fetch(`${BASE_URL}/api/protected/profile`);
    const protectedNoTokenData = await protectedNoTokenRes.json();
    assert(protectedNoTokenRes.status === 401, 'Accessing protected route without token returns 401 Unauthorized');
    assert(
      protectedNoTokenData.message && protectedNoTokenData.message.includes('no token provided'),
      'Missing token error message is correct'
    );

    // 3. Test signup validation errors
    console.log('\n--- Test 3: Signup Validation (Short password, Invalid email/username) ---');
    const invalidSignupRes = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'ab', // too short (min 3)
        email: 'invalid-email-format', // invalid email format
        password: '123', // too short (min 6)
      }),
    });
    const invalidSignupData = await invalidSignupRes.json();
    assert(invalidSignupRes.status === 400, 'Signup with invalid payload returns 400 Bad Request');
    assert(
      invalidSignupData.errors && invalidSignupData.errors.length >= 3,
      `Payload validation returned error messages for all 3 fields (errors: ${invalidSignupData.errors?.length || 0})`
    );

    // 4. Test valid signup
    console.log('\n--- Test 4: Valid Signup ---');
    const signupRes = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser),
    });
    const signupData = await signupRes.json();
    assert(signupRes.status === 201, 'Signup with valid data returns 201 Created');
    assert(signupData.token !== undefined, 'Signup response returns JWT token successfully');
    assert(signupData.username === testUser.username, 'Signup response returns registered username');
    
    // Store token for subsequent tests
    token = signupData.token;

    // 5. Test duplicate signup (should fail)
    console.log('\n--- Test 5: Duplicate Signup ---');
    const duplicateRes = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser),
    });
    const duplicateData = await duplicateRes.json();
    assert(duplicateRes.status === 400, 'Signing up with existing email returns 400 Bad Request');
    assert(
      duplicateData.message && duplicateData.message.includes('already exists'),
      'Duplicate email error message is correct'
    );

    // 6. Test valid login
    console.log('\n--- Test 6: Valid Login ---');
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password,
      }),
    });
    const loginData = await loginRes.json();
    assert(loginRes.status === 200, 'Login with correct credentials returns 200 OK');
    assert(loginData.token !== undefined, 'Login response returns JWT token successfully');
    assert(loginData.email === testUser.email, 'Login response returns user email');

    // 7. Test invalid login password
    console.log('\n--- Test 7: Invalid Login Password ---');
    const invalidLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUser.email,
        password: 'wrongpassword',
      }),
    });
    assert(invalidLoginRes.status === 401, 'Login with incorrect credentials returns 401 Unauthorized');

    // 8. Test protected route with valid token
    console.log('\n--- Test 8: Access Protected Route with Token ---');
    const protectedWithTokenRes = await fetch(`${BASE_URL}/api/protected/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const protectedWithTokenData = await protectedWithTokenRes.json();
    assert(protectedWithTokenRes.status === 200, 'Accessing protected route with valid token returns 200 OK');
    assert(
      protectedWithTokenData.message && protectedWithTokenData.message.includes('Access granted'),
      'Protected response message is correct'
    );
    assert(
      protectedWithTokenData.user.username === testUser.username,
      'Response user object matches registered user details'
    );
    assert(
      protectedWithTokenData.user.password === undefined,
      'Sensitive password field is properly stripped from the user object response'
    );

  } catch (error) {
    console.error('\n[ERROR] An unexpected error occurred during test execution:', error);
    failed++;
  } finally {
    console.log('\n==================================================');
    console.log('TEST SUMMARY');
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log('==================================================\n');

    // Close HTTP and Database Connections to allow clean exit
    console.log('Cleaning up resources...');
    if (server) {
      server.close(() => {
        console.log('Express HTTP Server closed.');
      });
    }
    if (mongoose && mongoose.connection) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed.');
    }
    if (mongoServer) {
      await mongoServer.stop();
      console.log('In-memory MongoDB server stopped.');
    }

    // Exit with failure code if any assertion failed
    process.exit(failed > 0 ? 1 : 0);
  }
}

runTests();
