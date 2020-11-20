const fs = require('fs')
const path = require('path')
const userRouter = require('./routes/admin/user')
const propertyRouter = require('./routes/admin/property')
const catalogRouter = require('./routes/admin/catalog')
const roomRouter = require('./routes/admin/room')
const tenantRouter = require('./routes/admin/tenant')
const bookingRouter = require('./routes/admin/booking')

module.exports = async (app, handlebars) => {
    // Landing endpoints
    await require('./routes/admin/landing')(app, handlebars)
    await require('./routes/client/landing')(app, handlebars)

    // API
    app.use(userRouter)
    app.use(propertyRouter)
    app.use(catalogRouter)
    app.use(roomRouter)
    app.use(tenantRouter)
    app.use(bookingRouter)

    // 404 page
    app.get('*', async (req, res) => {
        // Compile template
        const template = await handlebars.compile(fs.readFileSync(path.join(__dirname, '../../views/pages/404.hbs'), 'utf8'));

        // Render template
        const output = template({
            title: 'Page not found'
        });

        res.status(200)
            .send(output)
    })
}