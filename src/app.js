const path = require('path')
const express = require('express')
const hbs = require('hbs')

async function startServer() {
    // Initialize express application
    const app = express()

    // Assign port from config
    const port = process.env.PORT || 3000

    // Database connection
    await require('./loaders/mongoose')

    // Setup handlebars and engine views
    app.set('view engine', 'hbs')
    app.set('views', path.join(__dirname, '../templates/views'))
    hbs.registerPartials(path.join(__dirname, '../templates/partials'))

    // Setup static directory to serve
    app.use(express.static(path.join(__dirname, '../public')))
    app.use('/mdbootstrap', express.static(path.join(__dirname, '../node_modules/mdbootstrap')))

    // Landing routes
    await require('../src/api/routes/landing')(app)

    app.listen(port, () => {
        console.log(`The server is up on port ${port}.`)
    })
}

startServer()