const express = require('express')
const authentication = require('../../middlewares/authentication')
const { client, getAsync } = require('../../../loaders/redis')
const {
    propertyNew,
    propertyList,
    propertyEdit,
    propertyDelete
} = require('../../../services/property')

const router = new express.Router()

// Create new property
router.post('/api/property/add', authentication, async (req, res) => {
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

        // Create new property
        await propertyNew(req.body, user._id)

        // List all properties
        const { properties } = await propertyList(user)

        // Update properties in cache
        client.hset(hashId, 'properties', JSON.stringify(properties))

        res.status(201)
            .redirect('/management/property')
    } catch (e) {
        res.status(400)
            .redirect('/management/property')
    }
})

// Update property info
router.post('/api/property/edit', authentication, async (req, res) => {
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

        // Update property
        await propertyEdit(req.body)

        // List all properties
        const { properties } = await propertyList(user._id)

        // Update properties in cache
        client.hset(hashId, 'properties', JSON.stringify(properties))

        res.status(201)
            .redirect('/management/property')
    } catch (e) {
        res.status(400)
            .redirect('/management/property')
    }
})

// Delete property info
router.post('/api/property/delete', authentication, async (req, res) => {
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

        // Delete property
        await propertyDelete(req.body, user._id)

        // List all properties
        const { properties } = await propertyList(user._id)

        // Update properties in cache
        client.hset(hashId, 'properties', JSON.stringify(properties))

        res.status(200)
            .redirect('/management/property')
    } catch (e) {
        res.status(400)
            .redirect('/management/property')
    }
})


module.exports = router