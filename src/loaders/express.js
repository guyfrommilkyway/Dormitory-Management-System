const path = require('path')
const hbs = require('hbs')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { v4: uuidv4 } = require('uuid')

module.exports = async (app, express) => {
    // Express
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.use(session({
        genid: function (req) {
            return uuidv4()
        },
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
        }
    }))
    app.use(express.static(path.join(__dirname, '../../public')))
    app.use('/mdbootstrap', express.static(path.join(__dirname, '../../node_modules/mdbootstrap')))
    app.listen(process.env.PORT, () => {
        console.log('The server is up on port ' + process.env.PORT + '.')
    })

    // Handlebars
    app.set('view engine', 'hbs')
    app.engine('hbs', hbs.__express)
    app.set('views', path.join(__dirname, '../../templates/'))
    hbs.registerPartials(path.join(__dirname, '../../templates/components'))

    // Routes
    await require('../api/index')(app)
}