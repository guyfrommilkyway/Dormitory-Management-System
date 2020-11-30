const express = require('express')
const authentication = require('../../middlewares/authentication')
const { tenantNew, tenantUpdate, tenantDelete } = require('../../../services/tenant')

const router = new express.Router()

// Create new tenant
router.post('/api/tenant/add', authentication, async (req, res) => {
    try {
        // Create new tenant
        await tenantNew(req.body)

        // Assign id
        const _id = req.body.property

        res.status(201)
            .redirect(`/property/${_id}` + '#tenant')
    } catch (e) {
        //Assign id
        const _id = req.body.property

        res.status(400)
            .redirect(`/property/${_id}` + '#tenant')
    }
})

// Update tenant info
router.post('/api/tenant/update', authentication, async (req, res) => {
    try {
        // Update tenant
        await tenantUpdate(req.body)

        //Assign id
        const _id = req.body.property

        res.status(200)
            .redirect(`/property/${_id}` + '#tenant')
    } catch (e) {
        //Assign id
        const _id = req.body.property

        res.status(400)
            .redirect(`/property/${_id}` + '#tenant')
    }
})

// Delete tenant
router.post('/api/tenant/delete', authentication, async (req, res) => {
    try {
        // Delete tenant
        await tenantDelete(req.body)

        //Assign id
        const _id = req.body.property

        res.status(200)
            .redirect(`/property/${_id}` + '#tenant')
    } catch (e) {
        //Assign id
        const _id = req.body.property

        res.status(400)
            .redirect(`/property/${_id}` + '#tenant')
    }
})

module.exports = router