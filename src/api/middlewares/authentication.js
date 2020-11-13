const { client, getAsync } = require('../../loaders/redis')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')

const authentication = async (req, res, next) => {
    try {
        async () => { client.get('token') }
        const token = await getAsync('token')

        if (token != '') {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const userLogged = await User.findOne({ _id: decoded._id, 'tokens.token': token })

            if (!userLogged) {
                throw new Error()
            }

            next()
        } else {
            throw new Error()
        }
    } catch (e) {
        console.log('Error: Authentication failed.')
        res.status(401)
            .redirect('/')
    }
}

module.exports = authentication