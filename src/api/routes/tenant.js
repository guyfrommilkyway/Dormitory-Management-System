const express = require('express')
const { tenantNew, tenantInfoUpdate, tenantDelete } = require('../../services/tenant')
const authentication = require('../middlewares/authentication')

const router = new express.Router()

// Create new tenant
router.post('/user/property/tenant/add', authentication, async (req, res) => {
    try {
        await tenantNew(req.body)

        const id = req.body.property

        res.status(201)
            .redirect(`/property/${id}`)
    } catch (e) {
        console.log(e)
        res.status(400)
            .send()
    }
})

// Update tenant info
router.post('/user/property/tenant/edit', authentication, async (req, res) => {
    try {
        await tenantInfoUpdate(req.body)

        const id = req.body.property

        res.status(200)
            .redirect(`/property/${id}`)
    } catch (e) {
        console.log(e)
        res.status(400)
            .send()
    }
})

// Delete tenant
router.post('/user/property/tenant/delete', authentication, async (req, res) => {
    try {
        await tenantDelete(req.body)

        const id = req.body.property

        res.status(200)
            .redirect(`/property/${id}`)
    } catch (e) {
        console.log(e)
        res.status(400)
            .send()
    }
})

module.exports = router