const express = require('express')
const authentication = require('../../middlewares/authentication')
const { catalogNew, catalogUpdate, catalogDelete } = require('../../../services/catalog')

const router = new express.Router()

// Create new catalog
router.post('/api/catalog/add', authentication, async (req, res) => {
    try {
        // Create new catalog
        await catalogNew(req.body)

        // Assign id
        const _id = req.body.property

        res.status(201)
            .redirect(`/property/${_id}`)
    } catch (e) {
        // Assign id
        const _id = req.body.property

        res.status(400)
            .redirect(`/property/${_id}`)
    }
})

// Update catalog info
router.post('/api/catalog/update', authentication, async (req, res) => {
    try {
        // Update catalog
        await catalogUpdate(req.body)

        // Assign id
        const _id = req.body.property

        res.status(201)
            .redirect(`/property/${_id}`)
    } catch (e) {
        // Assign id
        const _id = req.body.property

        res.status(400)
            .redirect(`/property/${_id}`)
    }
})

// Delete catalog
router.post('/api/catalog/delete', authentication, async (req, res) => {
    try {
        // Delete catalog
        await catalogDelete(req.body)

        // Assign id
        const _id = req.body.property

        res.status(201)
            .redirect(`/property/${_id}`)
    } catch (e) {
        // Assign id
        const _id = req.body.property

        res.status(400)
            .redirect(`/property/${_id}`)
    }
})

module.exports = router