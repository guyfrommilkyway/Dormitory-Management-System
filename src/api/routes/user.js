const express = require('express')
const authentication = require('../middlewares/authentication')
const uploadUserAvatar = require('../middlewares/multer')
const { client, getAsync } = require('../../loaders/redis')
const {
    usernameCheck,
    emailCheck,
    userSignup,
    userLogin,
    userAvatarUpdate,
    userInfoUpdate,
    userPasswordChange,
    userLogout
} = require('../../services/user')

const router = new express.Router()

// Username check
router.post('/user/signup/username_check', async (req, res) => {
    try {
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
router.post('/user/signup/email_check', async (req, res) => {
    try {
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
router.post('/user/signup', async (req, res) => {
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
router.post('/user/login', async (req, res) => {
    try {
        const { userLogged, token } = await userLogin(req.body)

        userLogged.toJSON()

        client.set('user', [JSON.stringify(userLogged)])
        client.set('token', token)

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

// Update avatar
router.post('/user/profile/avatar/update', authentication, uploadUserAvatar.any(), async (req, res) => {
    try {
        async () => { client.get('user') }
        const userCached = await getAsync('user')
        const user = JSON.parse(userCached)

        const { userLogged } = await userAvatarUpdate(user, req.files)

        userLogged.toJSON()

        client.set('user', [JSON.stringify(userLogged)])

        res.status(200)
            .redirect('/account/profile')
    } catch (e) {
        res.status(400)
            .redirect('/')
    }
})

// Update info
router.post('/user/profile/info/update', authentication, async (req, res) => {
    try {
        const { userLogged } = await userInfoUpdate(req.body)

        userLogged.toJSON()

        client.set('user', [JSON.stringify(userLogged)])

        res.status(200)
            .redirect('/account/profile')
    } catch (e) {
        res.status(400)
            .redirect('/')
    }
})


// Update password
router.post('/user/profile/password/change', authentication, async (req, res) => {
    try {
        await userPasswordChange(req.body)

        res.status(200)
            .redirect('/account/password')
    } catch (e) {
        res.status(400)
            .redirect('/')
    }
})

// Log out
router.post('/user/logout', authentication, async (req, res) => {
    try {
        async () => { client.get('token') }
        const tokenCached = await getAsync('token')

        await userLogout(tokenCached)

        client.set('token', '')

        res.status(200)
            .redirect('/')
    } catch (e) {
        res.status(500)
            .send()
    }
})

module.exports = router