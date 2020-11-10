const jwt = require('jsonwebtoken')
const User = require('../../models/user')

const authentication = async (req, res, next) => {
    try {
        const token = req.session.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        await User.findOne({ _id: decoded._id, 'tokens.token': token })

        next()
    } catch (e) {
        console.log('Authentication failed.')
        res.status(401)
            .redirect('/')
    }
}

module.exports = authentication