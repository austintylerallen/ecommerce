const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

// Setup Sequelize instance
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false, // Set to true if you want to see SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Define models
const Category = sequelize.define('Category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // Add more fields as necessary
});

// Define relationships if any
// Example: Category.hasMany(Product);

// You can add other models similarly and define their relationships

// Export everything you need from this file
const db = {
  sequelize,
  Sequelize,
  Category
  // Add other models to export here
};

module.exports = db;
