const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,       // Database name
  process.env.DB_USER,       // Database username
  process.env.DB_PASSWORD,   // Database password
  {
    host: process.env.DB_HOST, // Database host (e.g., 'localhost')
    dialect: 'mysql',          // Use 'mysql' as the dialect
  }
);

module.exports = sequelize;