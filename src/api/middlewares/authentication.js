const jwt = require('jsonwebtoken')
const { client, getAsync } = require('../../loaders/redis')
const User = require('../../models/user')

const authentication = async (req, res, next) => {
    try {
        // Get hash id in cookie
        const hashId = req.signedCookies.id

        // Check if hash id is associated with a record in the redis database
        if (!hashId) {
            throw new Error('Error: Access denied.')
        }

        // Check if hash id has a token
        async () => { client.hget(hashId, 'token') }
        const token = await getAsync(hashId, 'token')

        if (!token || token === '') {
            throw new Error('Error: Access denied.')
        }

        // Validate token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error('Error: Access denied.')
        }

        next()
    } catch (e) {
        console.log('Error: Access denied.')
        res.status(401)
            .redirect('/')
    }
}

module.exports = authentication