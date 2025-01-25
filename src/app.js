const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const spamRoutes = require('./routes/spamRoutes');
const searchRoutes = require('./routes/searchRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/spam', spamRoutes);
app.use('/api', searchRoutes);

// Sync database
sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
}).catch((error) => {
  console.error('Error syncing database:', error);
});

// Add this at the end
const server = app.listen(process.env.PORT || 3000, () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  }
});

// Export both app and server
module.exports = { app, server };