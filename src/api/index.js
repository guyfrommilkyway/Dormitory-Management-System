const userRouter = require('./routes/user')
const propertyRouter = require('./routes/property')
const catalogRouter = require('./routes/catalog')
const roomRouter = require('./routes/room')
const tenantRouter = require('./routes/tenant')

module.exports = async (app) => {
    app.use(userRouter)
    app.use(propertyRouter)
    app.use(catalogRouter)
    app.use(roomRouter)
    app.use(tenantRouter)
    await require('./routes/landing')(app)
}