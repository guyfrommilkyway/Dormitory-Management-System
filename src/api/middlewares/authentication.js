const jwt = require('jsonwebtoken')
const { client, getAsync } = require('../../loaders/redis')
const User = require('../../models/user')

const authentication = async (req, res, next) => {
    try {
        // Get sessionId in cookie
        const sessionId = req.signedCookies.sessionId

        // Check if sessionId is associated with a record in the redis database
        if (!sessionId || !sessionId === '') {
            throw new Error('Error: Access denied.')
        }

        // Check if sessionId has a token
        async () => { client.hget('user', sessionId) }
        const token = await getAsync('user', sessionId)

        if (!token || token === '') {
            throw new Error('Error: Invalid token.')
        }

        // Validate token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error('Error: Invalid token.')
        }

        let userStringified = JSON.stringify(user.toJSON())

        req.user = JSON.parse(userStringified)
        req.token = token

        next()
    } catch (e) {
        console.log(e)

        res.status(401)
            .redirect('/')
    }
}

module.exports = authentication