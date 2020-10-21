const express = require('express')
const { roomNew } = require('../../services/room')
const authentication = require('../middlewares/authentication')

const router = new express.Router()

// Create new room
router.post('/user/property/room/add', authentication, async (req, res) => {
    try {
        await roomNew(req.body)

        const id = req.body.property

        res.status(201)
            .redirect(`/property/${id}`)
    } catch (e) {
        console.log(e)
        res.status(400)
            .send()
    }
})

module.exports = router