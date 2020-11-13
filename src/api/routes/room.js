const express = require('express')
const authentication = require('../middlewares/authentication')
const { roomNew, roomEdit, roomDelete } = require('../../services/room')

const router = new express.Router()

// Create new room
router.post('/user/property/room/add', authentication, async (req, res) => {
    try {
        await roomNew(req.body)

        const id = req.body.property

        res.status(201)
            .redirect(`/property/${id}`)
    } catch (e) {
        res.status(400)
            .send()
    }
})

// Update room info
router.post('/user/property/room/edit', authentication, async (req, res) => {
    try {
        await roomEdit(req.body)

        const id = req.body.property

        res.status(200)
            .redirect(`/property/${id}`)
    } catch (e) {
        res.status(400)
            .send()
    }
})

// Delete room
router.post('/user/property/room/delete', authentication, async (req, res) => {
    try {
        await roomDelete(req.body)

        const id = req.body.property

        res.status(200)
            .redirect(`/property/${id}`)
    } catch (e) {
        res.status(400)
            .send()
    }
})

module.exports = router