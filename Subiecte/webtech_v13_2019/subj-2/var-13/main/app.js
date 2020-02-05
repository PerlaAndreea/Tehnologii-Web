const express = require('express')
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.json())

app.locals.cars = [{
    brand : 'Ferrari',
    make : 'Testarosa',
    year : 1984
},{
    brand : 'Ferrari',
    make : '250 GT California',
    year : 1957
}]

// /cars?filter=GT
app.get('/cars', async (req, res) => {
   try {
       let filter = req.query.filter ? req.query.filter : null;
       if (!filter) {
           res.status(200).json(app.locals.cars);
       } else {
           const filteredCars = app.locals.cars.filter(car => car.make.includes(filter));
           res.status(200).json(filteredCars);
       }
   } catch (err) {
       console.warn(err);
   }
})

app.post('/cars', async (req, res) => {
    try {
        if (req.body.constructor !== Object || Object.keys(req.body).length === 0) {
            res.status(400).json({
                message : 'body is missing'
            });
        } else {
            if (req.body.brand === undefined || req.body.make === undefined || req.body.year === undefined) {
                res.status(400).json({
                    message : 'malformed request'
                });
            } else {
                if (req.body.year < 1860) {
                    res.status(400).json({
                        message : 'year should be > 1860'
                    });
                } else {
                    let car = {
                        brand : req.body.brand,
                        make : req.body.make,
                        year : req.body.year
                    };
                    
                    app.locals.cars.push(car);
                    res.status(201).json({
                        message : 'created'
                    });
                }
            }
        }
    } catch (err) {
        console.warn(err);
    }
})

module.exports = app