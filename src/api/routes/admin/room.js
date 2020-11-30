const express = require('express')
const authentication = require('../../middlewares/authentication')
const { roomNew, roomUpdate, roomDelete } = require('../../../services/room')

const router = new express.Router()

// Create new room
router.post('/api/room/add', authentication, async (req, res) => {
    try {
        // Create new room
        await roomNew(req.body)

        // Assign id
        const _id = req.body.property

        res.status(201)
            .redirect(`/property/${_id}` + '#room')
    } catch (e) {
        // Assign id
        const _id = req.body.property

        res.status(400)
            .redirect(`/property/${_id}` + '#room')
    }
})

// Update room info
router.post('/api/room/update', authentication, async (req, res) => {
    try {
        //Update room
        await roomUpdate(req.body)

        // Assign id
        const _id = req.body.property

        res.status(200)
            .redirect(`/property/${_id}` + '#room')
    } catch (e) {
        // Assign id
        const _id = req.body.property

        res.status(400)
            .redirect(`/property/${_id}` + '#room')
    }
})

// Delete room
router.post('/api/room/delete', authentication, async (req, res) => {
    try {
        // Delete room
        await roomDelete(req.body)

        // Assign id
        const _id = req.body.property

        res.status(200)
            .redirect(`/property/${_id}` + '#room')
    } catch (e) {
        // Assign id
        const _id = req.body.property

        res.status(400)
            .redirect(`/property/${_id}` + '#room')
    }
})

module.exports = router