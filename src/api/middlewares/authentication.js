const jwt = require('jsonwebtoken')
require('cookie-parser')
const User = require('../../models/user')

const authentication = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        next()
    } catch (e) {
        res.redirect('/')
    }
}

module.exports = authentication