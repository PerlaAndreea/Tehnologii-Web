const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

const mysql = require('mysql2/promise')

// const DB_USERNAME = 'root'
// const DB_PASSWORD = 'welcome12#'

const DB_USERNAME = 'diana'
const DB_PASSWORD = 'diana'

let conn

mysql.createConnection({
    user : DB_USERNAME,
    password : DB_PASSWORD
})
.then((connection) => {
    conn = connection
    return connection.query('CREATE DATABASE IF NOT EXISTS tw_exam')
})
.then(() => {
    return conn.end()
})
.catch((err) => {
    console.warn(err.stack)
})

const sequelize = new Sequelize('tw_exam', DB_USERNAME, DB_PASSWORD,{
    dialect : 'mysql',
    logging: false
})

let Ship = sequelize.define('student', {
    name : Sequelize.STRING,
    portOfSail : Sequelize.STRING,
    displacement : Sequelize.INTEGER
},{
    timestamps : false
})


const app = express()
app.use(bodyParser.json())

app.get('/create', async (req, res) => {
    try{
        await sequelize.sync({force : true})
        for (let i = 0; i < 10; i++){
            let ship = new Ship({
                name : `name${i}`,
                portOfSail : `port ${i}`,
                displacement : 3000 + 10 * i
            })
            await ship.save()
        }
        res.status(201).json({message : 'created'})
    }
    catch(err){
        console.warn(err.stack)
        res.status(500).json({message : 'server error'})
    }
})

app.get('/ships', async (req, res) => {
    try{
        let ships = await Ship.findAll()
        res.status(200).json(ships)
    }
    catch(err){
        console.warn(err.stack)
        res.status(500).json({message : 'server error'})        
    }
})

app.post('/ships', async (req, res) => {
    try {
        // check if the request body is empty
        if (req.body.constructor !== Object || Object.keys(req.body).length === 0) {
            res.status(400).json({
                message : 'body is missing'
            });
        } else {
            // if properties are missing from the request body
            if (req.body.name === undefined || req.body.portOfSail === undefined || req.body.displacement === undefined) {
                res.status(400).json({
                    message : 'malformed request'
                });
            } else {
                // check if the displacement is correct
                if (req.body.displacement < 1000) {
                    res.status(400).json({
                        message : 'displacement should be over 1000'
                    });
                } else {
                    // finally if everything is ok create the ship
                    await Ship.create(req.body);
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