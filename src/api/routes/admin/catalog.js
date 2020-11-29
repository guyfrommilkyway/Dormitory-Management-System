const express = require('express')
const authentication = require('../../middlewares/authentication')
const { client, getAsync } = require('../../../loaders/redis')
const { catalogNew, catalogList, catalogEdit, catalogDelete } = require('../../../services/catalog')

const router = new express.Router()

// Create new catalog
router.post('/api/catalog/add', authentication, async (req, res) => {
    try {
        // Get hash id in cookie
        const hashId = req.signedCookies.id

        // Check if hash id is associated with a record in the redis database
        if (!hashId) {
            throw new Error('Error: Access denied.')
        }

        // Get user in cache
        async () => { client.hget(hashId, 'user') }
        const userHash = await getAsync(hashId, 'user')
        const user = await JSON.parse(userHash)

        // Create new catalog
        await catalogNew(req.body, user._id)

        // List catalogs
        const { catalogs } = await catalogList(user._id)

        // Update catalogs in cache
        client.hset(hashId, 'properties', JSON.stringify(properties))

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
        // Get hash id in cookie
        const hashId = req.signedCookies.id

        // Check if hash id is associated with a record in the redis database
        if (!hashId) {
            throw new Error('Error: Access denied.')
        }

        // Get user in cache
        async () => { client.hget(hashId, 'user') }
        const userHash = await getAsync(hashId, 'user')
        const user = await JSON.parse(userHash)

        // Update catalog
        await catalogEdit(req.body, user)

        // List catalogs
        const { catalogs } = await catalogList(user._id)

        // Update catalogs in cache
        client.hset(hashId, 'properties', JSON.stringify(properties))

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
        // Get hash id in cookie
        const hashId = req.signedCookies.id

        // Check if hash id is associated with a record in the redis database
        if (!hashId) {
            throw new Error('Error: Access denied.')
        }

        // Get user in cache
        async () => { client.hget(hashId, 'user') }
        const userHash = await getAsync(hashId, 'user')
        const user = await JSON.parse(userHash)

        // Delete catalog
        await catalogDelete(req.body, user._id)

        // List catalogs
        const { catalogs } = await catalogList(user._id)

        // Update catalogs in cache
        client.hset(hashId, 'properties', JSON.stringify(properties))

        res.status(201)
            .redirect('/management/catalog')
    } catch (e) {
        res.status(400)
            .redirect('/management/catalog')
    }
})

module.exports = router