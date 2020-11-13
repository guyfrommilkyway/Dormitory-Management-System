const authentication = require('../middlewares/authentication')
const { client, getAsync } = require('../../loaders/redis')
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
        res.render('pages/login', {
            layout: 'index',
            title: 'Log in',
            message: req.cookies.message
        })
    })

    // Sign up
    app.get('/signup', async (req, res) => {
        res.render('pages/signup', {
            layout: 'index',
            title: 'Sign up'
        })
    })

    // Dashboard
    app.get('/dashboard', authentication, async (req, res) => {
        async () => { client.get('user') }
        const userCached = await getAsync('user')
        const user = JSON.parse(userCached)

        const { properties } = await propertyList(user)

        res.render('pages/dashboard', {
            layout: 'index',
            title: 'Dashboard',
            header: 'Dashboard',
            user,
            properties
        })
    })

    // Management

    // Property
    app.get('/management/property', authentication, async (req, res) => {
        async () => { client.get('user') }
        const userCached = await getAsync('user')
        const user = JSON.parse(userCached)

        const { properties } = await propertyList(user)

        res.status(200)
            .render('pages/management/property', {
                layout: 'index',
                title: 'Property management',
                header: 'Property management',
                user,
                properties
            })
    })

    // Catalog
    app.get('/management/catalog', authentication, async (req, res) => {
        async () => { client.get('user') }
        const userCached = await getAsync('user')
        const user = JSON.parse(userCached)

        const { properties } = await propertyList(user)
        const { catalogs } = await catalogList(user)

        res.status(200)
            .render('pages/management/catalog', {
                layout: 'index',
                title: 'Catalog management',
                header: 'Catalog management',
                user,
                properties,
                catalogs
            })
    })

    // Account

    // Edit profile
    app.get('/account/profile', authentication, async (req, res) => {
        async () => { client.get('user') }
        const userCached = await getAsync('user')
        const user = JSON.parse(userCached)

        const { properties } = await propertyList(user)

        res.status(200)
            .render('pages/account/profile', {
                layout: 'index',
                title: 'Profile',
                header: 'Profile',
                user,
                properties
            })
    })

    // Change password
    app.get('/account/password', authentication, async (req, res) => {
        async () => { client.get('user') }
        const userCached = await getAsync('user')
        const user = JSON.parse(userCached)

        const { properties } = await propertyList(user)

        res.status(200)
            .render('pages/account/password', {
                layout: 'index',
                title: 'Security',
                header: 'Security',
                user,
                properties
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