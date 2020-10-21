const userRouter = require('./routes/user')
const propertyRouter = require('./routes/property')
const catalogRouter = require('./routes/catalog')
const roomRouter = require('./routes/room')

module.exports = async (app) => {
    await require('./routes/landing')(app)
    app.use(userRouter)
    app.use(propertyRouter)
    app.use(catalogRouter)
    app.use(roomRouter)
}