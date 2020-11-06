const express = require('express')
const { catalogNew } = require('../../services/catalog')
const authentication = require('../middlewares/authentication')

const router = new express.Router()

// Create new catalog
router.post('/user/property/catalog/add', authentication, async (req, res) => {
    try {
        await catalogNew(req.body, req.session.user)

        res.status(201)
            .redirect('/management/catalog')
    } catch (e) {
        console.log(e)
        res.status(400)
            .send()
    }
})

module.exports = router