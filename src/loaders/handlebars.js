const fs = require('fs')
const path = require('path')

module.exports = async (handlebars, layouts) => {
    // Handlebars layouts
    handlebars.registerHelper(layouts(handlebars))

    // Layouts
    // Main
    handlebars.registerPartial('main', fs.readFileSync(path.join(__dirname, '../../views/layouts/main.hbs'), 'utf8'));
    // Admin
    handlebars.registerPartial('layout-admin', fs.readFileSync(path.join(__dirname, '../../views/layouts/admin/layout-admin.hbs'), 'utf8'));
    // Client
    handlebars.registerPartial('layout', fs.readFileSync(path.join(__dirname, '../../views/layouts/client/layout.hbs'), 'utf8'));

    // Modals
    // Property
    handlebars.registerPartial('modals_property', fs.readFileSync(path.join(__dirname, '../../views/pages/admin/_modals/property.hbs'), 'utf8'));
    // Catalog
    handlebars.registerPartial('modals_catalog', fs.readFileSync(path.join(__dirname, '../../views/pages/admin/_modals/catalog.hbs'), 'utf8'));
    // Add-on
    handlebars.registerPartial('modals_add_on', fs.readFileSync(path.join(__dirname, '../../views/pages/admin/_modals/add-on.hbs'), 'utf8'));
    // Room
    handlebars.registerPartial('modals_room', fs.readFileSync(path.join(__dirname, '../../views/pages/admin/_modals/room.hbs'), 'utf8'));
    // Tenant
    handlebars.registerPartial('modals_tenant', fs.readFileSync(path.join(__dirname, '../../views/pages/admin/_modals/tenant.hbs'), 'utf8'));
    // Booking
    handlebars.registerPartial('modals_booking', fs.readFileSync(path.join(__dirname, '../../views/pages/admin/_modals/booking.hbs'), 'utf8'));
    // Profile Picture
    handlebars.registerPartial('modals_profile_photo', fs.readFileSync(path.join(__dirname, '../../views/pages/admin/_modals/profile-photo.hbs'), 'utf8'));

    // Tables
    // Property
    handlebars.registerPartial('table_property', fs.readFileSync(path.join(__dirname, '../../views/pages/admin/_DataTables/property.hbs'), 'utf8'));
    // Catalog
    handlebars.registerPartial('table_catalog', fs.readFileSync(path.join(__dirname, '../../views/pages/admin/_DataTables/catalog.hbs'), 'utf8'));
    // Add-on
    handlebars.registerPartial('table_add_on', fs.readFileSync(path.join(__dirname, '../../views/pages/admin/_DataTables/add-on.hbs'), 'utf8'));
    // Room
    handlebars.registerPartial('table_room', fs.readFileSync(path.join(__dirname, '../../views/pages/admin/_DataTables/room.hbs'), 'utf8'));
    // Tenant
    handlebars.registerPartial('table_tenant', fs.readFileSync(path.join(__dirname, '../../views/pages/admin/_DataTables/tenant.hbs'), 'utf8'));
    // Booking
    handlebars.registerPartial('table_booking', fs.readFileSync(path.join(__dirname, '../../views/pages/admin/_DataTables/booking.hbs'), 'utf8'));
}