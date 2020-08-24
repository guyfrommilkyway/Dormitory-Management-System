const express = require('express')

async function startServer() {
    // Initialize express application
    const app = express()

    // Assign port from config
    const port = process.env.PORT || 3000

    // Express
    await require('../src/loaders/express')(app, express)

    // Routes
    await require('../src/api/index')(app)

    app.listen(port, () => {
        console.log(`The server is up on port ${port}.`)
    })
}

startServer()