const fs = require('fs')
const path = require('path')

module.exports = async (app, handlebars) => {

    // Sign up
    app.get('/booking', async (req, res) => {
        // Compile template
        const template = await handlebars.compile(fs.readFileSync(path.join(__dirname, '../../../../views/pages/client/booking.hbs'), 'utf8'));

        // Render template
        const output = template({
            title: 'Booking'
        });

        res.status(200)
            .send(output)
    })
}