const path = require('path')
const express = require('express')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const { propertyNew, propertyList } = require('../../services/property')
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
        await propertyNew(req.body, req.files, req.session.user)

        res.status(201)
            .redirect('/property')
    } catch (e) {
        res.status(400)
            .send()
    }
})

router.get('/property', authentication, async (req, res) => {
    try {
        const { properties } = await propertyList(req.session.user)

        res.status(200)
            .render('pages/landing/property', {
                layout: 'index',
                title: 'Property',
                user: req.session.user,
                properties: properties
            })
    } catch (e) {
        res.status(400)
            .send(e)
    }
})

module.exports = router