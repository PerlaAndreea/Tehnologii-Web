const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize'); // ceva care sa contina o conexiune

let sequelize = new Sequelize('bike_db', 'app', 'welcome123', {
    dialect: 'mysql'
});

let Bike = sequelize.define('bike', {
   gears : Sequelize.INTEGER,
   brand : Sequelize.STRING,
   weight : Sequelize.INTEGER
});

const app = express();
app.use(bodyParser.json());

app.post('/sync', async(req, res, next) => {
    try {
        await sequelize.sync({
            force : true // se sterg tabelele si se rescriu
        });
        res.status(201).json({
           message : 'created' 
        });
        
    } catch(err) {
        next(err);
    }
})

app.get('/bikes', async(req, res, next) => {
    try {
        let bikes = await Bike.findAll();
        res.status(200).json(bikes);
        
    } catch(err) {
        next(err);
    }
});

app.post('/bikes', async(req, res, next) => {
    try {
        await Bike.create(req.body);
        res.status(200).json( {
            message : 'created'
        });
        
    } catch(err) {
        next(err);
    }
});

app.get('/bikes/:id', async(req, res, next) => {
   try {
       let bike = await Bike.findByPk(req.params.id);
     
       if (bike) {
           res.status(200).json({
                message : 'bike found!',
                bike : bike
           });
       } else {
           res.status(404).json({
               message : 'not found :('
           });
       }
   } catch(err) {
       next(err);
   }
});

app.put('/bikes/:id', async(req, res, next) => {
    try {
       let bike = await Bike.findByPk(req.params.id);
       
       if (bike) {
           await bike.update(req.body);
           res.status(200).json({
              message : 'accepted' 
           });
           
       } else {
           res.status(404).json({
               message : 'not found :('
           });
       }
   } catch(err) {
       next(err);
   }
});

app.delete('/bikes/:id', async(req, res, next) => {
    try {
       let bike = await Bike.findByPk(req.params.id);
       
       if (bike) {
           await bike.destroy();
           res.status(200).json({
              message : 'accepted' 
           });
           
       } else {
           res.status(404).json({
               message : 'not found :('
           });
       }
   } catch(err) {
       next(err);
   }
});

app.use((err, req, res, next) => {
    console.warn(err);
    res.status(500).json({
        message : ':('
    });
});

app.listen(8080);