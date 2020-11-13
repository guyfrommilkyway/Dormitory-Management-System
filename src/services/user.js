const fs = require('fs')
const jwt = require('jsonwebtoken')
const sharp = require('sharp')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

// Username check
const usernameCheck = async (userObject) => {
    const userLogged = await User.findOne({ username: userObject.username })

    if (userLogged) {
        throw new Error('Username is already taken.')
    }

    return true
}

// Email check
const emailCheck = async (userObject) => {
    const userLogged = await User.findOne({ email: userObject.email })

    if (userLogged) {
        throw new Error('Username is already taken.')
    }

    return true
}

// Sign up
const userSignup = async (userObject) => {
    const userLogged = new User(userObject)

    await userLogged.save()
}

// Log in
const userLogin = async (userObject) => {
    const userLogged = await User.findByCredentials(userObject.email, userObject.password)
    const token = await userLogged.generateAuthToken()

    return { userLogged, token }
}

// Update avatar
const userAvatarUpdate = async (userObject, fileObject) => {
    const img = fs.readFileSync(fileObject[0].path)
    const encoded_image = await sharp(img).resize({ width: 250, height: 250 }).png().toBuffer()
    const type = fileObject[0].mimetype

    const userLogged = await User.findByIdAndUpdate(userObject._id, {
        avatar: {
            data: encoded_image,
            contentType: type
        }
    }, { new: true })

    return { userLogged }
}

// Update info
const userInfoUpdate = async (userObject) => {
    const userLogged = await User.findByIdAndUpdate(userObject._id, {
        username: userObject.username,
        first_name: userObject.first_name,
        last_name: userObject.last_name,
        contact: userObject.contact,
        email: userObject.email
    }, { new: true })

    return { userLogged }
}

// Update password
const userPasswordChange = async (userObject) => {
    const userToFind = await User.findByCredentials(userObject.email, userObject.currentPassword)

    if (userToFind) {
        const newPassword = await bcrypt.hash(userObject.newPassword, 8)
        const userLogged = await User.findByIdAndUpdate(userObject._id, {
            password: newPassword
        }, { new: true })

        return { userLogged }
    } else {
        throw new Error()
    }
}

// Log out
const userLogout = async (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userLogged = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    userLogged.tokens = userLogged.tokens.filter((tokenFiltered) => {
        return tokenFiltered.token !== token
    })

    await userLogged.save()
}

module.exports = {
    usernameCheck,
    emailCheck,
    userSignup,
    userLogin,
    userAvatarUpdate,
    userInfoUpdate,
    userPasswordChange,
    userLogout
}