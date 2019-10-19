const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDicrectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDicrectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Faraz Habib'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Faraz Habib'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        subtitle: 'Let me help you!',
        name: 'Faraz Habib'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, name } = {}) => {
        if (error) {
            return res.send({
                error
            })
        } 
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send ({
                forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    console.log(req.query.search)
    console.log(req.query.rating)

    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Looking for help!!',
        name: 'Faraz Habib'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not Found!',
        name: 'Faraz Habib'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})