const express = require('express')
const authentication = require('../middlewares/authentication')
const { client, getAsync } = require('../../loaders/redis')
const {
    propertyNew,
    propertyList,
    propertyView,
    propertyEdit,
    propertyDelete
} = require('../../services/property')
const { catalogList } = require('../../services/catalog')
const { roomList } = require('../../services/room')
const { tenantList } = require('../../services/tenant')

const router = new express.Router()

// Create new property
router.post('/user/property/add', authentication, async (req, res) => {
    try {
        async () => { client.get('user') }
        const userCached = await getAsync('user')
        const user = JSON.parse(userCached)

        await propertyNew(req.body, user)

        res.status(201)
            .redirect('/management/property')
    } catch (e) {
        res.status(400)
            .send()
    }
})

// View property
router.get('/property/:id', authentication, async (req, res) => {
    try {
        async () => { client.get('user') }
        const userCached = await getAsync('user')
        const user = JSON.parse(userCached)

        const { properties } = await propertyList(user)
        const { property } = await propertyView(req.params.id, user)
        const { catalogs } = await catalogList(user)
        const { rooms } = await roomList(req.params.id)
        const { tenants } = await tenantList(req.params.id)

        res.status(200)
            .render('pages/property/view', {
                layout: 'index',
                title: property.name,
                header: 'Property',
                user,
                properties,
                property,
                catalogs,
                rooms,
                tenants
            })
    } catch (e) {
        res.status(400)
            .send(e)
    }
})


// Update property info
router.post('/user/property/edit', authentication, async (req, res) => {
    try {
        await propertyEdit(req.body)

        res.status(201)
            .redirect('/management/property')
    } catch (e) {
        res.status(400)
            .send()
    }
})

// Delete property info
router.post('/user/property/delete', authentication, async (req, res) => {
    try {
        async () => { client.get('user') }
        const userCached = await getAsync('user')
        const user = JSON.parse(userCached)

        await propertyDelete(req.body, user)

        res.status(200)
            .redirect('/management/property')
    } catch (e) {
        res.status(400)
            .send()
    }
})


module.exports = router