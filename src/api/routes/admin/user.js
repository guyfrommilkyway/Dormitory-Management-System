const express = require('express')
const randomstring = require('randomstring')
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
        // Sign up
        await userSignup(req.body)

        res.status(201)
            .redirect('/')
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

        // Get properties of user
        const { properties } = await propertyList(user)

        // Save user data in cache
        client.set('user', [JSON.stringify(user)])
        client.set('token', token)
        client.set('properties', [JSON.stringify(properties)])

        // Generate a unique id
        const hashId = await randomstring.generate({
            length: 255,
            charset: 'alphabetic'
        });

        // Save data in cache
        client.hset(hashId, 'user', JSON.stringify(user))
        client.hset(hashId, 'token', token)
        client.hset(hashId, 'properties', JSON.stringify(properties))

        res.status(202)
            .cookie('id', hashId, { httpOnly: true, signed: true })
            .cookie('test', 'test')
            .redirect('/')
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
        // Get hash id in cookie
        const hashId = req.signedCookies.id

        // Check if hash id is associated with a record in the redis database
        if (!hashId) {
            throw new Error('Error: Access denied.')
        }

        // Get user in cache
        async () => { client.hget(hashId, 'user') }
        const userHash = await getAsync(hashId, 'user')
        const user = await JSON.parse(userHash)

        // Update user avatar
        const { userUpdated } = await userAvatarUpdate(user._id, req.files)

        // Update user in cache
        client.hdel(hashId, 'user')
        client.hset(hashId, 'user', JSON.stringify(userUpdated))

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
        // Get hash id in cookie
        const hashId = req.signedCookies.id

        // Check if hash id is associated with a record in the redis database
        if (!hashId) {
            throw new Error('Error: Access denied.')
        }

        // Update user info
        const { userUpdated } = await userInfoUpdate(req.body)

        // Update user in cache
        client.hdel(hashId, 'user')
        client.hset(hashId, 'user', JSON.stringify(userUpdated))

        res.status(200)
            .redirect('/account/profile')
    } catch (e) {
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
        // Get hash id in cookie
        const hashId = req.signedCookies.id

        // Get token
        async () => { client.hget(hashId, 'token') }
        const token = await getAsync(hashId, 'token')

        // Log out
        await userLogout(token)

        // Delete hash id record in the redis database
        client.del(hashId)

        res.status(200)
            .clearCookie('id')
            .redirect('/')
    } catch (e) {
        console.log(e)
        res.status(500)
            .send()
    }
})

module.exports = router