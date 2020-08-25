const jwt = require('jsonwebtoken')
const Cookies = require('js-cookie')
const User = require('../../models/user')

const authentication = async (req, res, next) => {
    try {
        // const token = req.header('Authorization').replace('Bearer ', '')
        // const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        // if (!user) {
        //     console.log('User doesn\'t exist')
        // }

        // req.user = user
        // req.token = token

        console.log('Authentication middleware')

        next()
    } catch (e) {
        res.redirect('/')
    }
}

module.exports = authentication