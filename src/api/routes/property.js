const path = require('path')
const express = require('express')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const { propertyNew, propertyList, propertyView} = require('../../services/property')
const { catalogList } = require('../../services/catalog')
const authentication = require('../middlewares/authentication')

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
            .redirect('/')
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

        res.status(200)
            .render('pages/landing/property/view', {
                layout: 'index',
                title: property.name,
                user: req.session.user,
                properties,
                property,
                catalogs
            })
    } catch (e) {
        res.status(400)
            .send(e)
    }
})

module.exports = router