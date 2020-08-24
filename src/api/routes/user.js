const express = require('express')
const { signup } = require('../../services/signup')

const router = new express.Router()

// create a new user
router.post('/users', async (req, res) => {
    try {
        await signup(req.body)

        res.status(201).send()
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router