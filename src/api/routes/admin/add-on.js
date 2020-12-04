const express = require('express')
const authentication = require('../../middlewares/authentication')
const { addOnNew, addOnUpdate, addOnDelete } = require('../../../services/add-on')

const router = new express.Router()

// Create new add-on
router.post('/api/addOn/add', authentication, async (req, res) => {
    try {
        // Create new add-on
        await addOnNew(req.body)

        // Assign id
        const id = req.body.property

        res.status(201)
            .redirect(`/property/${id}`)
    } catch (e) {
        // Assign id
        const id = req.body.property

        res.status(400)
            .redirect(`/property/${id}`)
    }
})

// Update add-on info
router.post('/api/addOn/update', authentication, async (req, res) => {
    try {
        //Update add-on
        await addOnUpdate(req.body)

        // Assign id
        const _id = req.body.property

        res.status(200)
            .redirect(`/property/${_id}`)
    } catch (e) {
        // Assign id
        const _id = req.body.property

        res.status(400)
            .redirect(`/property/${_id}`)
    }
})

// Delete add-on
router.post('/api/addOn/delete', authentication, async (req, res) => {
    try {
        // Delete add-on
        await addOnDelete(req.body)

        // Assign id
        const _id = req.body.property

        res.status(200)
            .redirect(`/property/${_id}`)
    } catch (e) {
        // Assign id
        const _id = req.body.property

        res.status(400)
            .redirect(`/property/${_id}`)
    }
})


module.exports = router