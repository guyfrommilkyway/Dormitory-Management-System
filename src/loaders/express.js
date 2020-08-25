const path = require('path')
const hbs = require('hbs')

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
}