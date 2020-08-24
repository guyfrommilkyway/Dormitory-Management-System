const User = require('../models/user')

signup = async (value) => {
    const user = new User(value)

    await user.save()
}

module.exports = {
    signup
}