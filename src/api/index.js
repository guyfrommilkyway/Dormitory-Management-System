const bodyParser = require('body-parser')
const userRouter = require('./routes/user')

module.exports = async (app, express) => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    await require('./routes/landing')(app)
    app.use(userRouter)
}
