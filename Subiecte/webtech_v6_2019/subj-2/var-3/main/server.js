const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const mysql = require('mysql2/promise')

// const DB_USERNAME = 'root'
// const DB_PASSWORD = 'welcome12#'

const DB_USERNAME = 'diana'
const DB_PASSWORD = 'diana'

mysql.createConnection({
	user : DB_USERNAME,
	password : DB_PASSWORD
})
.then(async (connection) => {
	await connection.query('DROP DATABASE IF EXISTS tw_exam')
	await connection.query('CREATE DATABASE IF NOT EXISTS tw_exam')
})
.catch((err) => {
	console.warn(err.stack)
})

const sequelize = new Sequelize('tw_exam', DB_USERNAME, DB_PASSWORD,{
	dialect : 'mysql',
	logging: false
})

let Author = sequelize.define('author', {
	name : Sequelize.STRING,
	email : Sequelize.STRING,
	address : Sequelize.STRING,
	age : Sequelize.INTEGER
})

const app = express()
app.use(bodyParser.json())

app.get('/create', async (req, res) => {
	try{
		await sequelize.sync({force : true})
		for (let i = 0; i < 10; i++){
			let author = new Author({
				name : 'name ' + i,
				email : 'name' + i + '@nowhere.com',
				address : 'some address on ' + i + 'th street'
			})
			await author.save()
		}
		res.status(201).json({message : 'created'})
	}
	catch(err){
		console.warn(err.stack)
		res.status(500).json({message : 'server error'})
	}
})

// /authors?email=...&address=...
app.get('/authors', async (req, res) => {
	try {
		let email = req.query.email ? req.query.email : null;
		let address = req.query.address ? req.query.address : null;
		
		if (!email && !address) {
			let authors = await Author.findAll();
			res.status(200).json(authors);
		} else {
			if (email && !address) {
				let authors = await Author.findAll({
					where : {
						email : {
							[Op.like] : `%${email}%`
						}
					}	
				});
				
				res.status(200).json(authors);
			} else {
				if (!email && address) {
					let authors = await Author.findAll({
						where : {
							address : {
								[Op.like] : `%${address}%`
							}
						}
					});
					
					res.status(200).json(authors);
				} else {
					if (email && address) {
						let authors = await Author.findAll({
							where : {
								email : {
									[Op.like] : `%${email}%`
								},
								address : {
									[Op.like] : `%${address}%`
								}
							}
						});
						
						res.status(200).json(authors);
					}
				}
			}
		}
	} catch (err) {
		console.warn(err);
	}
})

app.post('/authors', async (req, res) => {
	try{
		let author = new Author(req.body)
		await author.save()
		res.status(201).json({message : 'created'})
	}
	catch(err){
		// console.warn(err.stack)
		res.status(500).json({message : 'server error'})		
	}
})

app.listen(8080)

module.exports = app