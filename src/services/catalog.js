const Catalog = require('../models/catalog')

// Create new catalog
const catalogNew = async (catalogObject, userObject) => {
    const catalog = new Catalog({
        ...catalogObject,
        owner: userObject._id
    })

    await catalog.save()
}

// List catalog
const catalogList = async (userObject) => {
    const catalogs = await Catalog.find({ owner: userObject._id })

    return { catalogs }
}

module.exports = {
    catalogNew,
    catalogList
} 