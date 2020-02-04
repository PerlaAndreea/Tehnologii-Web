const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.locals.students = [
    {
        name: "Gigel",
        surname: "Popel",
        age: 23
    },
    {
        name: "Gigescu",
        surname: "Ionel",
        age: 25
    }
];

app.get('/students', (req, res) => {
    res.status(200).json(app.locals.students);
});

app.post('/students', (req, res, next) => {
    try {
        if (req.body.constructor !== Object || Object.keys(req.body).length === 0) {
            res.status(500).json({
                message : 'Body is missing'
            });
        } else {
            if (req.body.name === undefined || req.body.surname === undefined || req.body.age === undefined) {
                res.status(500).json({
                    message : 'Invalid body format'
                });
            } else {
                if (req.body.age < 0) {
                    res.status(500).json({
                        message : 'Age should be a positive number'
                    });
                } else {
                    let exists = false;
                    const allStudents = app.locals.students;
                    allStudents.forEach(student => {
                        if (student.name === req.body.name) {
                            exists = true;
                        }
                    });
                    
                    if (exists) {
                        res.status(500).json({
                            message : 'Student already exists'
                        });
                    } else {
                        let student = {
                            name: req.body.name,
                            surname: req.body.surname,
                            age: req.body.age
                        };
                        
                        app.locals.students.push(student);
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