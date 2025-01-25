const request = require('supertest');
const { app } = require('../src/app');
describe('Auth APIs', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'John Doe',
        phoneNumber: '1234567890',
        password: 'password123',
        email: 'john.doe@example.com',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  it('should login a user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        phoneNumber: '1234567890',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});