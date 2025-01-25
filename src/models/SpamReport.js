const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SpamReport = sequelize.define('SpamReport', {
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = SpamReport;