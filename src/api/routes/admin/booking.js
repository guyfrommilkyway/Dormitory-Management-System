const express = require('express')
const { bookingNew } = require('../../../services/booking')

const router = new express.Router()

// Create new booking
router.post('/api/booking/:id', async (req, res) => {
    try {
        // Create new booking
        await bookingNew(req.body, req.params.id)

        res.status(201)
            .redirect('/booking')
    } catch (e) {
        res.status(400)
            .redirect('/booking')
    }
})

module.exports = router