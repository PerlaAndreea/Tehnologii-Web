const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.locals.cars = [
    {
        make: "BMW",
        model: "X6",
        price: 50000
    },
    {
        make: "Lamborghini",
        model: "Huracan",
        price: 200000
    },
];

app.get('/cars', (req, res) => {
    res.status(200).json(app.locals.cars);
});

app.post('/cars', (req, res, next) => {
    try {
        if (req.body.constructor !== Object || Object.keys(req.body).length === 0) {
            res.status(500).json({
                message : 'Body is missing'
            });
        } else {
            if (req.body.make === undefined || req.body.model === undefined || req.body.price === undefined) {
                res.status(500).json({
                    message : 'Invalid body format'
                });
            } else {
                if (req.body.price < 0) {
                    res.status(500).json({
                        message : 'Price should be a positive number'
                    });
                } else {
                    const allCars = app.locals.cars;
                    let exists = false;
                    allCars.forEach(car => {
                        if (car.model === req.body.model) {
                            exists = true;
                        }
                    });

                    if (exists) {
                        res.status(500).json({
                            message : 'Car already exists'
                        });
                    } else {
                        let car = {
                            make : req.body.make,
                            model : req.body.model,
                            price : req.body.price
                        };

                        app.locals.cars.push(car);
                        console.warn(app.locals.cars.length);
                        res.status(201).json({
                            message : 'Created'
                        });
                    }
                }
            }
        }
    } catch (err) {
        console.warn(err);
        //next(err);
    }
})

module.exports = app;