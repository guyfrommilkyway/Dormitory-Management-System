const jwt = require('jsonwebtoken')
const { client, getAsync } = require('../../loaders/redis')
const User = require('../../models/user')

const authentication = async (req, res, next) => {
    try {
        async () => { client.get('token') }
        const token = await getAsync('token')

        if (token != '') {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

            if (!user) {
                throw new Error('Error: Authentication failed.')
            }

            next()
        } else {
            throw new Error('Error: Authentication failed.')
        }
    } catch (e) {
        console.log('Error: Authentication failed.')
        res.status(401)
            .redirect('/')
    }
}

module.exports = authentication