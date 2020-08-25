const userRouter = require('./routes/user')

module.exports = async (app) => {
    await require('./routes/landing')(app)
    app.use(userRouter)
}