const authentication = require('../middlewares/authentication')
const { propertyList } = require('../../services/property')

module.exports = async (app) => {

    // Demo
    app.get('/demo', async (req, res) => {
        res.render('pages/demo', {
            layout: 'index',
            title: 'Demo'
        })
    })

    // Index
    app.get('', async (req, res) => {
        if (req.session.user && req.session.token) {
            const { properties } = await propertyList(req.session.user)

            res.status(200)
                .render('pages/landing/dashboard', {
                    layout: 'index',
                    title: 'Dashboard',
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
            res.render('pages/landing/dashboard', {
                layout: 'index',
                title: 'Dashboard',
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

    // Edit profile
    app.get('/account/profile', authentication ,async (req, res) => {
        if (req.session.user && req.session.token) {
            const { properties } = await propertyList(req.session.user)

            res.status(200)
                .render('pages/landing/account/profile', {
                    layout: 'index',
                    title: 'Edit profile',
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
    app.get('/account/password', authentication ,async (req, res) => {
        if (req.session.user && req.session.token) {
            const { properties } = await propertyList(req.session.user)

            res.status(200)
                .render('pages/landing/account/password', {
                    layout: 'index',
                    title: 'Change password',
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