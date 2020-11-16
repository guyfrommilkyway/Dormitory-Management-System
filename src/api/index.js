const userRouter = require('./routes/admin/user')
const propertyRouter = require('./routes/admin/property')
const catalogRouter = require('./routes/admin/catalog')
const roomRouter = require('./routes/admin/room')
const tenantRouter = require('./routes/admin/tenant')

module.exports = async (app, handlebars) => {
    app.use(userRouter)
    app.use(propertyRouter)
    app.use(catalogRouter)
    app.use(roomRouter)
    app.use(tenantRouter)
    await require('./routes/admin/landing')(app, handlebars)
}