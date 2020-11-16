const express = require('express')
const authentication = require('../../middlewares/authentication')
const uploadUserAvatar = require('../../middlewares/multer')
const { client, getAsync } = require('../../../loaders/redis')
const {
    usernameCheck,
    emailCheck,
    userSignup,
    userLogin,
    userAvatarUpdate,
    userInfoUpdate,
    userPasswordChange,
    userLogout
} = require('../../../services/user')
const { propertyList } = require('../../../services/property')
const { catalogList } = require('../../../services/catalog')

const router = new express.Router()

// Username check
router.post('/api/user/signup/username_check', async (req, res) => {
    try {
        // Check username
        await usernameCheck(req.body)

        res.json({
            result: 'available'
        })
    } catch (e) {
        res.json({
            result: 'taken'
        })
    }
})

// Email check
router.post('/api/user/signup/email_check', async (req, res) => {
    try {
        // Check email
        await emailCheck(req.body)

        res.json({
            result: 'available'
        })
    } catch (e) {
        res.json({
            result: 'taken'
        })
    }
})

// Sign up
router.post('/api/user/signup', async (req, res) => {
    try {
        await userSignup(req.body)

        res.status(201)
            .redirect('/signup')
    } catch (e) {
        res.status(400)
            .redirect('/signup')
    }
})

// Log in
router.post('/api/user/login', async (req, res) => {
    try {
        // Validate credentials
        const { user, token } = await userLogin(req.body)

        // Hide private data
        user.toJSON()

        // List properties
        const { properties } = await propertyList(user)

        // List catalogs
        const { catalogs } = await catalogList(user)

        // Save data in cache
        client.set('user', [JSON.stringify(user)])
        client.set('token', token)
        client.set('properties', [JSON.stringify(properties)])
        client.set('catalogs', [JSON.stringify(catalogs)])

        res.status(202)
            .redirect('/dashboard')
    } catch (e) {
        res.status(401)
            .cookie('message', e.message, {
                expire: 1000,
                maxAge: 1000,
            })
            .redirect('/')
    }
})

// Update user avatar
router.post('/api/user/profile/avatar/update', authentication, uploadUserAvatar.any(), async (req, res) => {
    try {
        // Get user in cache
        async () => { client.get('user') }
        const userCache = await getAsync('user')
        const user = JSON.parse(userCache)

        // Update user avatar
        const { userUpdated } = await userAvatarUpdate(user, req.files)

        // Hide private data
        userUpdated.toJSON()

        // Update user in cache
        client.set('user', [JSON.stringify(userUpdated)])

        res.status(200)
            .redirect('/account/profile')
    } catch (e) {
        res.status(400)
            .redirect('/account/profile')
    }
})

// Update user info
router.post('/api/user/profile/info/update', authentication, async (req, res) => {
    try {
        // Update user info
        const { userUpdated } = await userInfoUpdate(req.body)

        // Hide private data
        userUpdated.toJSON()

        // Update user in cache
        client.set('user', [JSON.stringify(userUpdated)])

        res.status(200)
            .redirect('/account/profile')
    } catch (e) {
        console.log(e)
        res.status(400)
            .redirect('/account/profile')
    }
})


// Update password
router.post('/api/user/profile/password/update', authentication, async (req, res) => {
    try {
        // Update password
        await userPasswordChange(req.body)

        res.status(200)
            .redirect('/account/password')
    } catch (e) {
        res.status(400)
            .redirect('/account/password')
    }
})

// Log out
router.post('/api/user/logout', authentication, async (req, res) => {
    try {
        // Get token in cache
        async () => { client.get('token') }
        const tokenCache = await getAsync('token')

        // Log out
        await userLogout(tokenCache)

        // Delete all data in cache
        client.flushdb()

        res.status(200)
            .redirect('/')
    } catch (e) {
        res.status(500)
            .send()
    }
})

module.exports = router