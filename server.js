const Sequelize = require('sequelize');
const config = require('./config/config.json')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
