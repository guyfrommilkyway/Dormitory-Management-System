const express = require('express')
const { catalogNew, catalogEdit, catalogDelete } = require('../../services/catalog')
const authentication = require('../middlewares/authentication')

const router = new express.Router()

// Create new catalog
router.post('/user/catalog/add', authentication, async (req, res) => {
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

// Update catalog info
router.post('/user/catalog/edit', authentication, async (req, res) => {
    try {
        await catalogEdit(req.body, req.session.user)

        res.status(201)
            .redirect('/management/catalog')
    } catch (e) {
        console.log(e)
        res.status(400)
            .send()
    }
})

// Delete catalog
router.post('/user/catalog/delete', authentication, async (req, res) => {
    try {
        await catalogDelete(req.body, req.session.user)

        res.status(201)
            .redirect('/management/catalog')
    } catch (e) {
        console.log(e)
        res.status(400)
            .send()
    }
})

module.exports = router