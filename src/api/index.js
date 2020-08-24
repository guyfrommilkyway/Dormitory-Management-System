const bodyParser = require('body-parser')
const userRouter = require('./routes/user')

module.exports = async (app) => {
    await require('./routes/landing')(app)

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(userRouter)
}
