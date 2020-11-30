const express = require('express')
const authentication = require('../../middlewares/authentication')
const { catalogNew, catalogUpdate, catalogDelete } = require('../../../services/catalog')

const router = new express.Router()

// Create new catalog
router.post('/api/catalog/add', authentication, async (req, res) => {
    try {
        // Create new catalog
        await catalogNew(req.body, req.user._id)

        res.status(201)
            .redirect('/management/catalog')
    } catch (e) {
        res.status(400)
            .redirect('/management/catalog')
    }
})

// Update catalog info
router.post('/api/catalog/update', authentication, async (req, res) => {
    try {
        // Update catalog
        await catalogUpdate(req.body)

        res.status(201)
            .redirect('/management/catalog')
    } catch (e) {
        res.status(400)
            .redirect('/management/catalog')
    }
})

// Delete catalog
router.post('/api/catalog/delete', authentication, async (req, res) => {
    try {
        // Delete catalog
        await catalogDelete(req.body, req.user._id)

        res.status(201)
            .redirect('/management/catalog')
    } catch (e) {
        res.status(400)
            .redirect('/management/catalog')
    }
})

module.exports = router