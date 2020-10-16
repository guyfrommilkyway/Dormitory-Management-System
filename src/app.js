const express = require('express')

async function startServer() {
    // Initialize express application
    const app = express()

    // Database connection
    await require('../src/loaders/mongoose')

    // Express
    await require('../src/loaders/express')(app, express)
}

startServer()