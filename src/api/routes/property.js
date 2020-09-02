const express = require('express')
const { propertyNew, propertyList } = require('../../services/property')
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

router.get('/property', authentication, async (req, res) => {
    try {
        const { properties } = await propertyList(req.session.userId)
        console.log(properties)
        res.status(200)
            .render('components/landing/property', {
                layout: 'layouts/main',
                title: 'Property',
                username: req.session.userName,
                email: req.session.userEmail,
                properties: properties
            })
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router