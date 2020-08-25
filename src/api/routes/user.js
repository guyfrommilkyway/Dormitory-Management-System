const express = require('express')
const { userSignup, userLogin, userLogout } = require('../../services/user')
const authentication = require('../middlewares/authentication')

const router = new express.Router()

// User signup
router.post('/user/signup', async (req, res) => {
    try {
        await userSignup(req.body)

        req.method = 'get'
        res.redirect('/')
    } catch (e) {
        res.status(400).send()
    }
})

// User login
router.post('/user/login', async (req, res) => {
    try {
        const { user, token } = await userLogin(req.body)

        res.cookie('accessToken', token)
            .redirect('/home')
    } catch (e) {
        res.status(400).send()
    }
})

// User logout
router.post('/users/logout', authentication, async (req, res) => {
    try {
        userLogout(req.cookies.accessToken)

        res.cookie('accessToken', '')
            .redirect('/home')
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router