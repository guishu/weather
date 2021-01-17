const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//Paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

//Setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publicPath))


//Routes
app.get('', (req, res) => {
	res.render('index', {title: 'Weather', author: 'Guishu'})
})

app.get('/about', (req, res) => {
	res.render('about', {title: 'About', author: 'Guishu'})
})

app.get('/help', (req, res) => {
	res.render('help', {title: 'Help', author: 'Guishu'})
})


app.get('/weather', (req, res) => {
	if(!req.query.address)
		return res.send({error: 'You must provide an address'})

	geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
		if(error)
			return res.send({error: 'An error occured while processing the request'})
		
		forecast(latitude, longitude, (error, {temperature, feelsLike} = {}) => {
			if(error)
				return res.send({error: 'An error occured while contacting the weather servicce'})
	
			res.send({forecast: 'In ' + location + ' it is ' + temperature + ' degrees but it feels like ' + feelsLike + ' degrees', address: req.query.address})
		})
	})
})

app.get('*', (req, res) => {
	res.render('404', {title: '404', author: 'Guishu'})
})

app.listen(3000, () => {
	console.log('Server is up on port 3000')
})