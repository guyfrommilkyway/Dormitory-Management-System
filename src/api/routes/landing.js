const authentication = require('../middlewares/authentication')
const user = require('../../services/user')

module.exports = async (app) => {
    // Index
    app.get('', async (req, res) => {
        res.render('components/login', {
            layout: 'layouts/index',
            title: 'Login'
        })
    })

    // Signup
    app.get('/signup', async (req, res) => {
        res.render('components/signup', {
            layout: 'layouts/index',
            title: 'Signup'
        })
    })

    // Home
    app.get('/home', authentication, async (req, res) => {
        res.render('components/landing/home', {
            layout: 'layouts/main',
            title: 'Home',
            user: req.session.user,
        })
    })
}