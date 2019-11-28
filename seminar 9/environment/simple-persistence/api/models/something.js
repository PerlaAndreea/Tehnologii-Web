const Sequelize = require('sequelize'); // ceva care sa contina o conexiune

let sequelize = new Sequelize('bike_db', 'app', 'welcome123', {
    dialect: 'mysql'
});

let Something = sequelize.define('something', {
   name : Sequelize.STRING
});

module.exports = Something;