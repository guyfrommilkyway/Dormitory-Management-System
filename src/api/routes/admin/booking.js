const express = require('express')
const authentication = require('../../middlewares/authentication')
const { bookingNew, bookingDecline } = require('../../../services/booking')

const router = new express.Router()

// Create new booking
router.post('/api/booking/list/:id', async (req, res) => {
    try {
        // Create new booking
        await bookingNew(req.body, req.params.id)

        // Assign id
        const id = req.params.id

        res.status(201)
            .redirect(`/booking/${id}`)
    } catch (e) {
        // Assign id
        const id = req.params.id

        res.status(400)
            .redirect(`/booking/${id}`)
    }
})

// Decline booking
router.post('/api/booking/decline', authentication, async (req, res) => {
    try {
        // Delete booking
        await bookingDecline(req.body)

        //Assign id
        const _id = req.body.property

        res.status(200)
            .redirect(`/property/${_id}` + '#.js-booking-panel')
    } catch (e) {
        //Assign id
        const _id = req.body.property

        res.status(400)
            .redirect(`/property/${_id}` + '#.js-booking-panel')
    }
})

module.exports = router