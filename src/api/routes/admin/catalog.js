const express = require('express')
const authentication = require('../../middlewares/authentication')
const { client, getAsync } = require('../../../loaders/redis')
const { catalogNew, catalogList, catalogEdit, catalogDelete } = require('../../../services/catalog')

const router = new express.Router()

// Create new catalog
router.post('/api/catalog/add', authentication, async (req, res) => {
    try {
        // Get user in cache
        async () => { client.get('user') }
        const userCache = await getAsync('user')
        const user = JSON.parse(userCache)

        // Create new catalog
        await catalogNew(req.body, user)

        // List catalogs
        const { catalogs } = await catalogList(user)

        // Update catalogs in cache
        client.set('catalogs', [JSON.stringify(catalogs)])

        res.status(201)
            .redirect('/management/catalog')
    } catch (e) {
        res.status(400)
            .redirect('/management/catalog')
    }
})

// Update catalog info
router.post('/api/catalog/edit', authentication, async (req, res) => {
    try {
        // Get user in cache
        async () => { client.get('user') }
        const userCache = await getAsync('user')
        const user = JSON.parse(userCache)

        // Update catalog
        await catalogEdit(req.body, user)

        // List catalogs
        const { catalogs } = await catalogList(user)

        // Update catalogs in cache
        client.set('catalogs', [JSON.stringify(catalogs)])

        res.status(201)
            .redirect('/management/catalog')
    } catch (e) {
        res.status(400)
            .redirect('/management/catalog')
    }
})

// Delete catalog
router.post('/api/catalog/delete', authentication, async (req, res) => {
    try {
        // Get user in cache
        async () => { client.get('user') }
        const userCache = await getAsync('user')
        const user = JSON.parse(userCache)

        // Delete catalog
        await catalogDelete(req.body, user)

        // List catalogs
        const { catalogs } = await catalogList(user)

        // Update catalogs in cache
        client.set('catalogs', [JSON.stringify(catalogs)])

        res.status(201)
            .redirect('/management/catalog')
    } catch (e) {
        res.status(400)
            .redirect('/management/catalog')
    }
})

module.exports = router