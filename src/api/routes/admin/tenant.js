const express = require('express')
const authentication = require('../../middlewares/authentication')
const { tenantNew, tenantInfoUpdate, tenantDelete } = require('../../../services/tenant')

const router = new express.Router()

// Create new tenant
router.post('/user/property/tenant/add', authentication, async (req, res) => {
    try {
        // Create new tenant
        await tenantNew(req.body)

        // Assign id
        const id = req.body.property

        res.status(201)
            .redirect(`/property/${id}`)
    } catch (e) {
        res.status(400)
            .send()
    }
})

// Update tenant info
router.post('/user/property/tenant/edit', authentication, async (req, res) => {
    try {
        // Update tenant
        await tenantInfoUpdate(req.body)

        //Assign id
        const id = req.body.property

        res.status(200)
            .redirect(`/property/${id}`)
    } catch (e) {
        res.status(400)
            .send()
    }
})

// Delete tenant
router.post('/user/property/tenant/delete', authentication, async (req, res) => {
    try {
        // Delete tenant
        await tenantDelete(req.body)

        //Assign id
        const id = req.body.property

        res.status(200)
            .redirect(`/property/${id}`)
    } catch (e) {
        res.status(400)
            .send()
    }
})

module.exports = router