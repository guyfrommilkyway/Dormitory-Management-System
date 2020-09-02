const jwt = require('jsonwebtoken')
const User = require('../../models/user')

const authentication = async (req, res, next) => {
    try {
        if (req.cookies.sessionId === req.session.id) {
            const token = req.session.token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

            if (!user) {
                console.log('Authentication required!')
                res.status(401)
                    .redirect('/')
            }

            next()
        } else {
            console.log('Authentication required!')
            res.status(401)
                .redirect('/')
        }
    } catch (e) {
        console.log('Authentication required!')
        res.status(401)
            .redirect('/')
    }
}

module.exports = authentication