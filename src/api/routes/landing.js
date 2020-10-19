const authentication = require('../middlewares/authentication')
const {propertyList} = require('../../services/property')

module.exports = async (app) => {
    // Index
    app.get('', async (req, res) => {
        if (req.session.user && req.session.token) {
            const { properties } = await propertyList(req.session.user)

            res.status(200)
                .render('pages/landing/dashboard', {
                    layout: 'index',
                    title: 'Dashboard',
                    user: req.session.user,
                    properties: properties
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
                properties: properties
            })
        } else {
            res.render('pages/signup', {
                layout: 'index',
                title: 'Signup'
            })
        }
    })

    // Settings
    app.get('/settings', authentication, async (req, res) => {
        const { properties } = await propertyList(req.session.user)

        res.render('pages/landing/settings', {
            layout: 'index',
            title: 'Settings',
            user: req.session.user,
            properties: properties
        })
    })

    // Demo
    app.get('/demo', async (req, res) => {
        res.render('pages/demo', {
            layout: 'index',
            title: 'Demo'
        })
    })
}