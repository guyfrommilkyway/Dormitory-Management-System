const express = require('express')
const authentication = require('../../middlewares/authentication')
const { tenantNew, tenantInfoUpdate, tenantDelete } = require('../../../services/tenant')

const router = new express.Router()

// Create new tenant
router.post('/api/tenant/add', authentication, async (req, res) => {
    try {
        // Create new tenant
        await tenantNew(req.body)

        // Assign id
        const id = req.body.property

        res.status(201)
            .redirect(`/property/${id}` + '#tenant')
    } catch (e) {
        //Assign id
        const id = req.body.property

        res.status(400)
            .redirect(`/property/${id}` + '#tenant')
    }
})

// Update tenant info
router.post('/api/tenant/edit', authentication, async (req, res) => {
    try {
        // Update tenant
        await tenantInfoUpdate(req.body)

        //Assign id
        const id = req.body.property

        res.status(200)
            .redirect(`/property/${id}` + '#tenant')
    } catch (e) {
        //Assign id
        const id = req.body.property

        res.status(400)
            .redirect(`/property/${id}` + '#tenant')
    }
})

// Delete tenant
router.post('/api/tenant/delete', authentication, async (req, res) => {
    try {
        // Delete tenant
        await tenantDelete(req.body)

        //Assign id
        const id = req.body.property

        res.status(200)
            .redirect(`/property/${id}` + '#tenant')
    } catch (e) {
        //Assign id
        const id = req.body.property

        res.status(400)
            .redirect(`/property/${id}` + '#tenant')
    }
})

module.exports = router