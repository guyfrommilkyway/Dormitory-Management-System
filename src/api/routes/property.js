const path = require('path')
const express = require('express')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const authentication = require('../middlewares/authentication')
const { propertyNew, propertyList, propertyView, propertyEdit, propertyDelete } = require('../../services/property')
const { catalogList } = require('../../services/catalog')
const { roomList } = require('../../services/room')
const { tenantList } = require('../../services/tenant')

const router = new express.Router()

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../../public/uploads/property'),
    filename: function (req, file, cb) {
        cb(null, uuidv4())
    }
})
const uploadPropertyAvatar = multer({ storage: storage })

// Create new property
router.post('/user/property/add', authentication, uploadPropertyAvatar.any(), async (req, res) => {
    try {
        await propertyNew(req.body, req.session.user)

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
        const { properties } = await propertyList(req.session.user)
        const { property } = await propertyView(req.params.id, req.session.user)
        const { catalogs } = await catalogList(req.session.user)
        const { rooms } = await roomList(req.params.id)
        const { tenants } = await tenantList(req.params.id)

        res.status(200)
            .render('pages/property/view', {
                layout: 'index',
                title: property.name,
                header: 'Property',
                user: req.session.user,
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
        await propertyDelete(req.body, req.session.user)

        res.status(200)
            .redirect('/management/property')
    } catch (e) {
        res.status(400)
            .send()
    }
})


module.exports = router