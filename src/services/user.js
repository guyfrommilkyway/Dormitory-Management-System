const fs = require('fs')
const jwt = require('jsonwebtoken')
const sharp = require('sharp')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

// Sign up
const userSignup = async (userObject) => {
    const user = new User(userObject)

    await user.save()
}

// Log in
const userLogin = async (userObject) => {
    const user = await User.findByCredentials(userObject.email, userObject.password)
    const token = await user.generateAuthToken()

    return { user, token }
}

// Update avatar
const userAvatarUpdate = async (userObject, fileObject) => {
    const img = fs.readFileSync(fileObject[0].path)
    const encoded_image = await sharp(img).resize({ width: 250, height: 250 }).png().toBuffer()
    const type = fileObject[0].mimetype

    const user = await User.findByIdAndUpdate(userObject._id, {
        avatar: {
            data: encoded_image,
            contentType: type
        }
    }, { new: true })

    return { user }
}

// Update info
const userInfoUpdate = async (userObject) => {
    const user = await User.findByIdAndUpdate(userObject._id, {
        username: userObject.username,
        first_name: userObject.first_name,
        last_name: userObject.last_name,
        contact: userObject.contact,
        email: userObject.email
    }, { new: true })

    return { user }
}

// Update password
const userPasswordChange = async (userObject) => {
    const userToFind = await User.findByCredentials(userObject.email, userObject.currentPassword)

    if (userToFind) {
        const newPassword = await bcrypt.hash(userObject.newPassword, 8)
        const user = await User.findByIdAndUpdate(userObject._id, {
            password: newPassword
        }, { new: true })

        return { user }
    } else {
        throw new Error()
    }
}

// Log out
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
    userAvatarUpdate,
    userInfoUpdate,
    userPasswordChange,
    userLogout
}