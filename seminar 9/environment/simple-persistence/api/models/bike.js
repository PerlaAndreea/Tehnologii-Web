const Sequelize = require('sequelize'); // ceva care sa contina o conexiune

let sequelize = new Sequelize('bike_db', 'app', 'welcome123', {
    dialect: 'mysql'
});

let Bike = sequelize.define('bike', {
   gears : Sequelize.INTEGER,
   brand : Sequelize.STRING,
   weight : Sequelize.INTEGER
});

module.exports = Bike;