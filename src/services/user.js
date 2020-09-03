const fs = require('fs')
const jwt = require('jsonwebtoken')
const sharp = require('sharp')
const User = require('../models/user')

// User signup
const userSignup = async (userObject, fileObject) => {
    const img = fs.readFileSync(fileObject[0].path)
    const encoded_image = await sharp(img).resize({ width: 250, height: 250 }).png().toBuffer()
    const type = fileObject[0].mimetype
    const user = new User({
        name: userObject.name,
        email: userObject.email,
        password: userObject.password,
        avatar: {
            data: encoded_image,
            contentType: type
        }
    })
    await user.save()
}

// User login
const userLogin = async (userObject) => {
    const user = await User.findByCredentials(userObject.email, userObject.password)
    const token = await user.generateAuthToken()

    return { user, token }
}

// User logout
const userLogout = async (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    user.tokens = user.tokens.filter((tokenFiltered) => {
        return tokenFiltered.token !== token
    })

    await user.save()
}

module.exports = {
    userSignup,
    userLogin,
    userLogout
}