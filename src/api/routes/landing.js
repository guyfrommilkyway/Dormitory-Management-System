const authentication = require('../middlewares/authentication')
const user = require('../../services/user')

module.exports = async (app) => {
    // Index
    app.get('', async (req, res) => {
        res.render('pages/login', {
            layout: 'index',
            title: 'Login'
        })
    })

    // Signup
    app.get('/signup', async (req, res) => {
        res.render('pages/signup', {
            layout: 'index',
            title: 'Signup'
        })
    })

    // Home
    app.get('/home', authentication, async (req, res) => {
        res.render('pages/landing/home', {
            layout: 'index',
            title: 'Home',
            user: req.session.user,
        })
    })
}