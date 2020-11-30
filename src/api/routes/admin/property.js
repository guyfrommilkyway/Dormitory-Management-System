const express = require('express')
const authentication = require('../../middlewares/authentication')
const {
    propertyNew,
    propertyEdit,
    propertyDelete
} = require('../../../services/property')

const router = new express.Router()

// Create new property
router.post('/api/property/add', authentication, async (req, res) => {
    try {
        // Create new property
        await propertyNew(req.body, req.user._id)

        res.status(201)
            .redirect('/management/property')
    } catch (e) {
        res.status(400)
            .redirect('/management/property')
    }
})

// Update property info
router.post('/api/property/edit', authentication, async (req, res) => {
    try {
        // Update property
        await propertyEdit(req.body)

        res.status(201)
            .redirect('/management/property')
    } catch (e) {
        res.status(400)
            .redirect('/management/property')
    }
})

// Delete property info
router.post('/api/property/delete', authentication, async (req, res) => {
    try {
        // Delete property
        await propertyDelete(req.body, req.user._id)

        res.status(200)
            .redirect('/management/property')
    } catch (e) {
        res.status(400)
            .redirect('/management/property')
    }
})


module.exports = router