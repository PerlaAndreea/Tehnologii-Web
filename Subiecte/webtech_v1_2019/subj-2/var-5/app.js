const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.locals.products = [
    {
        name: "Iphone XS",
        category: "Smartphone",
        price: 5000
    },
    {
        name: "Samsung Galaxy S10",
        category: "Smartphone",
        price: 3000
    },
    {
        name: "Huawei Mate 20 Pro",
        category: "Smartphone",
        price: 3500
    }
];

app.get('/products', (req, res) => {
    res.status(200).json(app.locals.products);
});

app.post('/products', (req, res, next) => {
    try {
        if (req.body.constructor !== Object || Object.keys(req.body).length === 0) {
            res.status(500).json({
                message : 'Body is missing'
            });
        } else {
            if (req.body.name === undefined || req.body.category === undefined || req.body.price === undefined) {
                res.status(500).json({
                    message : 'Invalid body format'
                });
            } else {
                if (req.body.price < 0) {
                    res.status(500).json({
                        message : 'Price should be a positive number'
                    });
                } else {
                    const allProducts = app.locals.products;
                    let exists = false;
                    allProducts.forEach(product => {
                        if (product.name === req.body.name) {
                            exists = true;
                            //break;
                        }
                    });

                    if (exists) {
                        console.warn('Product name already exists');
                        res.status(500).json({
                            message : 'Product already exists'
                        });
                    } else {
                        let product = {
                            name : req.body.name,
                            category : req.body.category,
                            price : req.body.price
                        };

                        app.locals.products.push(product);
                        res.status(201).json({
                            message : 'Created'
                        });
                    }

                }
            }
        }

    } catch (err) {
        console.warn(err);
        next(err);
    }
})

module.exports = app;