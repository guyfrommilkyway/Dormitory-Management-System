const express = require('express')
const authentication = require('../../middlewares/authentication')
const { bookingNew } = require('../../../services/booking')

const router = new express.Router()

// Create new booking
router.post('/api/booking/add', authentication, async (req, res) => {
    try {
        // Create new booking
        await bookingNew(req.body)

        // Assign id
        const id = req.body.property

        res.status(201)
            .redirect(`/property/${id}` + '#booking')
    } catch (e) {
        res.status(400)
            .redirect(`/property/${id}` + '#booking')
    }
})

module.exports = router