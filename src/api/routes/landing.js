const authentication = require('../middlewares/authentication')

module.exports = async (app) => {
    // Index
    app.get('', async (req, res) => {
        if (req.session.user && req.session.token) {
            res.render('pages/landing/home', {
                layout: 'index',
                title: 'Home',
                user: req.session.user,
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
            res.render('pages/landing/home', {
                layout: 'index',
                title: 'Home',
                user: req.session.user,
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
        res.render('pages/landing/settings', {
            layout: 'index',
            title: 'Settings',
            user: req.session.user,
        })
    })
}