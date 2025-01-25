// In tests/setup.js, modify to:
const sequelize = require('../src/config/database');
const app = require('../src/app');

beforeAll(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error('Sync error:', error);
  }
});

afterAll(async () => {
  try {
    await sequelize.close();
    // Properly close server
    if (app.server) {
      await new Promise(resolve => app.server.close(resolve));
    }
  } catch (error) {
    console.error('Teardown error:', error);
  }
});