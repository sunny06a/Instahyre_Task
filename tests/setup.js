const { sequelize } = require('../src/config/database'); // Correct import
const app = require('../src/app');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
  // Close Express server properly
  await new Promise(resolve => app.close(resolve));
});