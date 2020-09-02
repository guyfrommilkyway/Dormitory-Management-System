const express = require('express')
const { userSignup, userLogin, userLogout } = require('../../services/user')
const authentication = require('../middlewares/authentication')

const router = new express.Router()

// User signup
router.post('/user/signup', async (req, res) => {
    try {
        await userSignup(req.body)

        res.status(201)
            .redirect('/')
    } catch (e) {
        res.status(400).send()
    }
})

// User login
router.post('/user/login', async (req, res) => {
    try {
        const { user, token } = await userLogin(req.body)

        req.session.userId = user._id
        req.session.userName = user.name
        req.session.userEmail = user.email
        req.session.token = token

        res.cookie('sessionId', req.session.id)
            .redirect('/home')
    } catch (e) {
        res.status(400).send()
    }
})

// User logout
router.post('/user/logout', authentication, async (req, res) => {
    try {
        userLogout(req.session.token)

        req.session.destroy()

        res.clearCookie('sessionId')
            .redirect('/home')
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router