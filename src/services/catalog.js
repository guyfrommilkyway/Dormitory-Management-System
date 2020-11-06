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

// Update catalog info
const catalogEdit = async (catalogObject) => {
    const catalog = await Catalog.findByIdAndUpdate(catalogObject._id, {
        name: catalogObject.name,
        rate: catalogObject.rate
    })

    return { catalog }
}

// Delete catalog info
const catalogDelete = async (catalogObject, userObject) => {
    await Catalog.findOneAndDelete({ _id: catalogObject._id, owner: userObject._id })
}


module.exports = {
    catalogNew,
    catalogList,
    catalogEdit,
    catalogDelete
} 