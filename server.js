const Sequelize = require('sequelize');
const config = require('./config/config.json')[process.env.NODE_ENV || 'development'];
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add routes as middleware
app.use(routes);

// Sync Sequelize models to the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
