const express = require('express')
const authentication = require('../../middlewares/authentication')
const { roomNew, roomList, roomEdit, roomDelete } = require('../../../services/room')

const router = new express.Router()

// Create new room
router.post('/api/room/add', authentication, async (req, res) => {
    try {
        // Create new room
        await roomNew(req.body)

        // Assign id
        const id = req.body.property

        res.status(201)
            .redirect(`/property/${id}`)
    } catch (e) {
        res.status(400)
            .redirect(`/property/${id}`)
    }
})

// Update room info
router.post('/api/room/edit', authentication, async (req, res) => {
    try {
        //Update room
        await roomEdit(req.body)

        // Assign id
        const id = req.body.property

        res.status(200)
            .redirect(`/property/${id}`)
    } catch (e) {
        res.status(400)
            .redirect(`/property/${id}`)
    }
})

// Delete room
router.post('/api/room/delete', authentication, async (req, res) => {
    try {
        // Delete room
        await roomDelete(req.body)

        // Assign id
        const id = req.body.property

        res.status(200)
            .redirect(`/property/${id}`)
    } catch (e) {
        res.status(400)
            .redirect(`/property/${id}`)
    }
})

module.exports = router