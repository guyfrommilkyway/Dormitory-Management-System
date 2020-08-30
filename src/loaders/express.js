const path = require('path')
const hbs = require('hbs')
const cookieParser = require('cookie-parser')

module.exports = async (app, express) => {
    // Database connection
    await require('./mongoose')

    // Setup handlebars and engine views
    app.set('view engine', 'hbs')
    app.engine('hbs', hbs.__express)
    app.set('views', path.join(__dirname, '../../templates/views'))
    hbs.registerPartials(path.join(__dirname, '../../templates/partials'))

    // Setup static directory to serve
    app.use(express.static(path.join(__dirname, '../../public')))
    app.use('/mdbootstrap', express.static(path.join(__dirname, '../../node_modules/mdbootstrap')))

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())

    // Routes
    await require('../api/index')(app)
}