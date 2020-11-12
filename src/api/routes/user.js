const express = require('express')
const authentication = require('../middlewares/authentication')
const uploadUserAvatar = require('../middlewares/multer')
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
            .redirect('/')
    } catch (e) {
        console.log(e.message)
        res.status(400)
            .redirect('/signup')
    }
})

// Log in
router.post('/user/login', async (req, res) => {
    try {
        const { user, token } = await userLogin(req.body)

        req.session.user = user
        req.session.token = token

        res.status(202)
            .cookie('sessionId', req.session.id, {
                httpOnly: true
            })
            .redirect('/')
    } catch (e) {
        console.log(e)

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
        const { user } = await userAvatarUpdate(req.session.user, req.files)

        req.session.user = user

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
        const { user } = await userInfoUpdate(req.body)

        req.session.user = user

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
        const { user } = await userPasswordChange(req.body)

        req.session.user = user

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
        userLogout(req.session.token)

        req.session.destroy()

        res.clearCookie('sessionId')
            .redirect('/')
    } catch (e) {
        res.status(500)
            .send()
    }
})

module.exports = router