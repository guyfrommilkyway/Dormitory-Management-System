const fs = require('fs')
const path = require('path')
const { propertyView } = require('../../../services/property')
const { catalogList } = require('../../../services/catalog')

module.exports = async (app, handlebars) => {

    // Booking
    app.get('/booking', async (req, res) => {
        // Query property
        const { property } = await propertyView(req.query.id)

        // Query catalogs
        const { catalogs } = await catalogList(property.owner)

        // Compile template
        const template = await handlebars.compile(fs.readFileSync(path.join(__dirname, '../../../../views/pages/client/booking/booking.hbs'), 'utf8'));

        // Render template
        const output = template({
            title: 'Booking',
            property,
            catalogs
        });

        res.status(200)
            .send(output)
    })

    // Booking success
    app.get('/booking/success', async (req, res) => {
        // Compile template
        const template = await handlebars.compile(fs.readFileSync(path.join(__dirname, '../../../../views/pages/client/booking/success.hbs'), 'utf8'));

        // Render template
        const output = template({
            title: 'Success!'
        });

        res.status(200)
            .send(output)
    })
}