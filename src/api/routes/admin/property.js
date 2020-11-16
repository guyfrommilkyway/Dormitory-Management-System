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
        // Get user in cache
        async () => { client.get('user') }
        const userCached = await getAsync('user')
        const user = JSON.parse(userCached)

        // Create new property
        await propertyNew(req.body, user)

        // List all properties
        const { properties } = await propertyList(user)

        // Update properties in cache
        client.set('properties', [JSON.stringify(properties)])

        res.status(201)
            .redirect('/management/property')
    } catch (e) {
        res.status(400)
            .send()
    }
})

// Update property info
router.post('/api/property/edit', authentication, async (req, res) => {
    try {
        // Get user in cache
        async () => { client.get('user') }
        const userCached = await getAsync('user')
        const user = JSON.parse(userCached)

        // Update property
        await propertyEdit(req.body)

        // List all properties
        const { properties } = await propertyList(user)

        // Update properties in cache
        client.set('properties', [JSON.stringify(properties)])

        res.status(201)
            .redirect('/management/property')
    } catch (e) {
        res.status(400)
            .send()
    }
})

// Delete property info
router.post('/api/property/delete', authentication, async (req, res) => {
    try {
        // Get user in cache
        async () => { client.get('user') }
        const userCached = await getAsync('user')
        const user = JSON.parse(userCached)

        // Delete property
        await propertyDelete(req.body, user)

        // List all properties
        const { properties } = await propertyList(user)

        // Update properties in cache
        client.set('properties', [JSON.stringify(properties)])

        res.status(200)
            .redirect('/management/property')
    } catch (e) {
        res.status(400)
            .send()
    }
})


module.exports = router