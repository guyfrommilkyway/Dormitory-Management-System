const Cookies = require('js-cookie')
const User = require('../models/user')
const { response } = require('express')

// User signup
const userSignup = async (object) => {
    const user = new User(object)

    await user.save()
}

// User login
const userLogin = async (object) => {
    const user = await User.findByCredentials(object.email, object.password)
    const token = await user.generateAuthToken()

    return token
}

module.exports = {
    userSignup,
    userLogin
}