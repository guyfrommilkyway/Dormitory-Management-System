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
            const { properties } = await propertyList(req.session.user)

            res.status(200)
                .render('pages/dashboard', {
                    layout: 'index',
                    title: 'Dashboard',
                    header: 'Dashboard',
                    user: req.session.user,
                    properties
                })
        } else {
            res.render('pages/login', {
                layout: 'index',
                title: 'Login'
            })
        }
    })

    // Signup
    app.get('/signup', async (req, res) => {
        if (req.session.user && req.session.token) {
            res.render('pages/dashboard', {
                layout: 'index',
                title: 'Dashboard',
                header: 'Dashboard',
                user: req.session.user,
                properties
            })
        } else {
            res.render('pages/signup', {
                layout: 'index',
                title: 'Signup'
            })
        }
    })

    // Property Management
    app.get('/management/property', authentication, async (req, res) => {
        if (req.session.user && req.session.token) {
            const { properties } = await propertyList(req.session.user)

            res.status(200)
                .render('pages/management/property', {
                    layout: 'index',
                    title: 'Property management',
                    header: 'Property management',
                    user: req.session.user,
                    properties
                })
        } else {
            res.render('pages/login', {
                layout: 'index',
                title: 'Login'
            })
        }
    })

    // Catalog Management
    app.get('/management/catalog', authentication, async (req, res) => {
        if (req.session.user && req.session.token) {
            const { properties } = await propertyList(req.session.user)
            const { catalogs } = await catalogList(req.session.user)

            res.status(200)
                .render('pages/management/catalog', {
                    layout: 'index',
                    title: 'Catalog management',
                    header: 'Catalog management',
                    user: req.session.user,
                    properties,
                    catalogs
                })
        } else {
            res.render('pages/login', {
                layout: 'index',
                title: 'Login'
            })
        }
    })


    // Edit profile
    app.get('/account/profile', authentication, async (req, res) => {
        if (req.session.user && req.session.token) {
            const { properties } = await propertyList(req.session.user)

            res.status(200)
                .render('pages/account/profile', {
                    layout: 'index',
                    title: 'Profile',
                    header: 'Profile',
                    user: req.session.user,
                    properties
                })
        } else {
            res.render('pages/login', {
                layout: 'index',
                title: 'Login'
            })
        }
    })

    // Change password
    app.get('/account/password', authentication, async (req, res) => {
        if (req.session.user && req.session.token) {
            const { properties } = await propertyList(req.session.user)

            res.status(200)
                .render('pages/account/password', {
                    layout: 'index',
                    title: 'Security',
                    header: 'Security',
                    user: req.session.user,
                    properties
                })
        } else {
            res.render('pages/login', {
                layout: 'index',
                title: 'Login'
            })
        }
    })
}