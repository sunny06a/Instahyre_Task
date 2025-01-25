const request = require('supertest');
const { app } = require('../src/app'); // New import style

describe('Spam APIs', () => {
  let token;

  beforeAll(async () => {
    // Register and login a user to get a token
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'John Doe',
        phoneNumber: '1234567890',
        password: 'password123',
        email: 'john.doe@example.com',
      });

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        phoneNumber: '1234567890',
        password: 'password123',
      });

    token = loginResponse.body.token;
  });

  it('should mark a number as spam', async () => {
    const response = await request(app)
      .post('/api/spam')
      .set('Authorization', `Bearer ${token}`)
      .send({
        phoneNumber: '9876543210',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Number marked as spam');
  });
});