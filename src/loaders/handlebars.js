const fs = require('fs')
const path = require('path')

module.exports = async (handlebars, layouts) => {
    // Handlebars layouts
    handlebars.registerHelper(layouts(handlebars))

    // Handlebars layouts
    handlebars.registerHelper(layouts(handlebars));

    // Main layout
    handlebars.registerPartial('main', fs.readFileSync(path.join(__dirname, '../../views/layouts/main.hbs'), 'utf8'));

    // Admin layout
    handlebars.registerPartial('layout-admin', fs.readFileSync(path.join(__dirname, '../../views/layouts/admin/layout-admin.hbs'), 'utf8'));
}