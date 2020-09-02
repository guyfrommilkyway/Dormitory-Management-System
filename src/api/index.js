const userRouter = require('./routes/user')
const propertyRouter = require('./routes/property')

module.exports = async (app) => {
    await require('./routes/landing')(app)
    app.use(userRouter)
    app.use(propertyRouter)
}