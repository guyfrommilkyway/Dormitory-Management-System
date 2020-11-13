const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cookieParser = require('cookie-parser')

const app = express()

app.engine('hbs', hbs.__express)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../../templates/'))
hbs.registerPartials(path.join(__dirname, '../../templates/components'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../../public')))
app.use('/mdbootstrap', express.static(path.join(__dirname, '../../node_modules/mdbootstrap')))

app.listen(process.env.PORT, () => {
    console.log('Application is up and running on port ' + process.env.PORT + '.')
})

// Routes
require('../api/index')(app)