const fs = require('fs')
const path = require('path')

module.exports = async (app, handlebars) => {

    // Booking
    app.get('/booking', async (req, res) => {
        // Compile template
        const template = await handlebars.compile(fs.readFileSync(path.join(__dirname, '../../../../views/pages/client/booking/booking.hbs'), 'utf8'));

        // Render template
        const output = template({
            title: 'Booking'
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