const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

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
	logging: false,
	define: {
    	timestamps: false
	},
})

let Author = sequelize.define('author', {
	name : Sequelize.STRING,
	email : Sequelize.STRING,
	address : Sequelize.STRING,
	age : Sequelize.INTEGER
})

let Book = sequelize.define('book', {
	title : Sequelize.STRING,
	pages : Sequelize.INTEGER 
})

Author.hasMany(Book)

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

app.get('/authors', async (req, res) => {
	// should get all authors
	try{
		let authors = await Author.findAll()
		res.status(200).json(authors)
	}
	catch(err){
		console.warn(err.stack)
		res.status(500).json({message : 'server error'})		
	}
})

app.get('/books', async (req, res) => {
	// should get all authors
	try{
		let books = await Book.findAll()
		res.status(200).json(books)
	}
	catch(err){
		console.warn(err.stack)
		res.status(500).json({message : 'server error'})		
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

app.post('/authors/:id/books', async (req, res) => {
	// TODO: implementați funcția
	// ar trebui să adauge o carte la un autor
	try {
		let author = await Author.findByPk(req.params.id);
		if (author) {
			let book = req.body;
			book.authorId = author.id;
			await Book.create(book);
			
			res.status(201).json({
				message : 'created'
			});
		} else {
			res.status(404).json({
				message : 'not found'
			});
		}
	} catch (err) {
		console.warn(err);
	}

})

app.get('/authors/:id/books', async (req, res) => {
	// TODO: implementați funcția
	// ar trebui să listeze toate cărțile unui autor
	try {
		let author = await Author.findByPk(req.params.id, {
			include : [Book]
		});
		
		if (author) {
			res.status(200).json(author.books);
		} else {
			res.status(404).json({
				message : 'not found'
			});
		}
	} catch (err) {
		console.warn(err);
	}

})


app.listen(8080)

module.exports = app