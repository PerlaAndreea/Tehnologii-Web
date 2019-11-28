const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize'); // ceva care sa contina o conexiune
const Op = Sequelize.Op;

let sequelize = new Sequelize('bike_db', 'app', 'welcome123', {
    dialect: 'mysql'
});

let Bike = sequelize.define('bike', {
   gears : {
     type : Sequelize.INTEGER,
     allowNull : false,
     validate : {
         isInt : true,
         min : 1
     }
   },

   brand : {
       type : Sequelize.STRING,
       allowNull : false,
       validate : {
           len : [1, 20]
       }
   },
   
   weight : {
       type : Sequelize.INTEGER,
       allowNull : false,
       validate : {
           min : 6
       }
   }
});

let Rider = sequelize.define("raider", {
   name : {
       type : Sequelize.STRING,
       allowNull : false,
       len : [5, 30]
   },
   
   accesibleOn : {
       type : Sequelize.ENUM,
       allowNull : false,
       values : ['ODD', 'EVEN']
   }
});

Bike.hasMany(Rider);

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


// get /bikes?filter='aaa'&pageSize=10&page=4
app.get('/bikes', async(req, res, next) => {
    try {
        let filter = req.query.filter ? req.query.filter : '';
        let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
        let page = req.query.page ? parseInt(req.query.page) : 0;
        let bikes;
        
        if (filter || page) {
            bikes = await Bike.findAll({
                where : {
                    brand : {
                        [Op.like] : `%${filter}%`
                    }
                },
                limit : pageSize,
                    
                    offset : page * pageSize
                
            });
        } else {
            bikes = await Bike.findAll();    
        }
        
        
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

app.get('/bikes/:bid/raiders', async(req, res, next) => {
    try {
        let bike = await Bike.findByPk(req.params.bid, {
            include : [Rider]
        });
        
        if (bike) {
            res.status(200).json(bike.raiders)
        } else {
            req.status(404).json({
                message : 'not found'
            });
        }
        
    } catch (err) {
        next(err);
    }
});

app.post('/bikes/:bid/raiders', async(req, res, next) => {
    try {
        let bike = await Bike.findByPk(req.params.bid);
        
        if (bike) {
            let raider = req.body;
            raider.bikeId = bike.id;
            await Rider.create(raider);
            
            res.status(201).json({
                message : 'created'
            });
            
        } else {
            res.status(404).json({
                message : 'not found'
            });
        }
        
    } catch (err) {
        next(err);
    }
});

app.get('/bikes/:bid/raiders/:rid', async(req, res, next) => {
    try {
        let bike = await Bike.findByPk(req.params.bid);
        
        if (bike) {
            let raiders = await bike.getRaiders({
                where : {
                    id : req.params.rid
                    }
            });
            
            let raider = raiders.shift();
            if (raider) {
                res.status(200).json(raider);
            } else {
                res.status(404).json( {
                    message : 'not found'
                });
            }
            
        } else {
            res.status(404).json({
                message : 'not found'
            });
        }
        
        
    } catch (err) {
        next(err);
    }
});

app.put('/bikes/:bid/raiders/:rid', async(req, res, next) => {
    try {
        let bike = await Bike.findByPk(req.params.bid);
        
        if (bike) {
            let raiders = await bike.getRaiders({
                where : {
                    id : req.params.rid
                    }
            });
            
            let raider = raiders.shift();
            if (raider) {
                await raider.update(req.body, {
                    fields : ['name', 'accesibleOn']
                });
                
                res.status(200).json({
                    message : 'accepted'
                });
                
            } else {
                res.status(404).json( {
                    message : 'not found'
                });
            }
            
        } else {
            res.status(404).json({
                message : 'not found'
            });
        }
        
        
    } catch (err) {
        next(err);
    }
});

app.delete('/bikes/:bid/raiders/:rid', async(req, res, next) => {
     try {
        let bike = await Bike.findByPk(req.params.bid);
        
        if (bike) {
            let raiders = await bike.getRaiders({
                where : {
                    id : req.params.rid
                    }
            });
            
            let raider = raiders.shift();
            if (raider) {
                await raider.destroy(req.body);
                
                res.status(200).json({
                    message : 'accepted'
                });
                
            } else {
                res.status(404).json( {
                    message : 'not found'
                });
            }
            
        } else {
            res.status(404).json({
                message : 'not found'
            });
        }
        
        
    } catch (err) {
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