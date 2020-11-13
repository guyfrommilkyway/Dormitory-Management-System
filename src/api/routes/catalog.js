const express = require('express')
const authentication = require('../middlewares/authentication')
const { client, getAsync } = require('../../loaders/redis')
const { catalogNew, catalogEdit, catalogDelete } = require('../../services/catalog')

const router = new express.Router()

// Create new catalog
router.post('/user/catalog/add', authentication, async (req, res) => {
    try {
        async () => { client.get('user') }
        const userCached = await getAsync('user')
        const user = JSON.parse(userCached)

        await catalogNew(req.body, user)

        res.status(201)
            .redirect('/management/catalog')
    } catch (e) {
        res.status(400)
            .redirect('/management/catalog')
    }
})

// Update catalog info
router.post('/user/catalog/edit', authentication, async (req, res) => {
    try {
        async () => { client.get('user') }
        const userCached = await getAsync('user')
        const user = JSON.parse(userCached)

        await catalogEdit(req.body, user)

        res.status(201)
            .redirect('/management/catalog')
    } catch (e) {
        res.status(400)
            .redirect('/management/catalog')
    }
})

// Delete catalog
router.post('/user/catalog/delete', authentication, async (req, res) => {
    try {
        async () => { client.get('user') }
        const userCached = await getAsync('user')
        const user = JSON.parse(userCached)

        await catalogDelete(req.body, user)

        res.status(201)
            .redirect('/management/catalog')
    } catch (e) {
        res.status(400)
            .redirect('/management/catalog')
    }
})

module.exports = router