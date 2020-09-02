const express = require('express')
const { propertyNew } = require('../../services/property')
const authentication = require('../middlewares/authentication')

const router = new express.Router()

// Create new property
router.post('/user/property/add', authentication, async (req, res) => {
    try {
        await propertyNew(req.body, req.session.userId)

        res.status(201)
            .redirect('/property')
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router