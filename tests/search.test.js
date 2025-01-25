const request = require('supertest');
const { app } = require('../src/app'); // New import style

describe('Search APIs', () => {
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

    // Add some sample data for testing
    await request(app)
      .post('/api/spam')
      .set('Authorization', `Bearer ${token}`)
      .send({
        phoneNumber: '9876543210',
      });
  });

  it('should search by name', async () => {
    const response = await request(app)
      .get('/api/search/name?query=John')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should search by phone number', async () => {
    const response = await request(app)
      .get('/api/search/phone?phoneNumber=1234567890')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get contact details', async () => {
    const response = await request(app)
      .get('/api/contact/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('phoneNumber');
    expect(response.body).toHaveProperty('spamLikelihood');
  });
});