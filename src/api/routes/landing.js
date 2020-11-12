const authentication = require('../middlewares/authentication')
const { propertyList } = require('../../services/property')
const { catalogList } = require('../../services/catalog')

module.exports = async (app) => {

    // Demo
    app.get('/demo', async (req, res) => {
        res.render('pages/demo', {
            layout: 'index',
            title: 'Demo',
            header: 'Demo'
        })
    })

    // Index
    app.get('', async (req, res) => {
        if (req.session.user && req.session.token) {
            res.render('pages/dashboard', {
                layout: 'index',
                title: 'Dashboard',
                header: 'Dashboard',
                user: req.session.user
            })
        } else {
            res.render('pages/login', {
                layout: 'index',
                title: 'Login',
                message: req.cookies.message
            })
        }
    })

    // Sign up
    app.get('/signup', async (req, res) => {
        if (req.session.user && req.session.token) {
            res.render('pages/dashboard', {
                layout: 'index',
                title: 'Dashboard',
                header: 'Dashboard',
                user: req.session.user
            })
        } else {
            res.render('pages/signup', {
                layout: 'index',
                title: 'Signup'
            })
        }
    })

    // Management

    // Property
    app.get('/management/property', authentication, async (req, res) => {
        const { properties } = await propertyList(req.session.user)

        res.status(200)
            .render('pages/management/property', {
                layout: 'index',
                title: 'Property management',
                header: 'Property management',
                user: req.session.user,
                properties
            })
    })

    // Catalog
    app.get('/management/catalog', authentication, async (req, res) => {
        const { catalogs } = await catalogList(req.session.user)

        res.status(200)
            .render('pages/management/catalog', {
                layout: 'index',
                title: 'Catalog management',
                header: 'Catalog management',
                user: req.session.user,
                catalogs
            })
    })

    // Account

    // Edit profile
    app.get('/account/profile', authentication, async (req, res) => {
        res.status(200)
            .render('pages/account/profile', {
                layout: 'index',
                title: 'Profile',
                header: 'Profile',
                user: req.session.user
            })
    })

    // Change password
    app.get('/account/password', authentication, async (req, res) => {
        res.status(200)
            .render('pages/account/password', {
                layout: 'index',
                title: 'Security',
                header: 'Security',
                user: req.session.user
            })
    })

    // 404
    app.get('*', async (req, res) => {
        res.status(404)
            .render('pages/404', {
                layout: 'index',
                title: 'Page not found'
            })
    })
}