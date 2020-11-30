const Catalog = require('../models/catalog')
const Room = require('../models/room')

// Create new catalog
const catalogNew = async (catalogObject, userId) => {
    const catalog = new Catalog({
        ...catalogObject,
        owner: userId
    })

    await catalog.save()
}

// List catalog
const catalogList = async (userId) => {
    const catalogs = await Catalog.find({ owner: userId })
        .lean()

    return { catalogs }
}

// Update catalog info
const catalogUpdate = async (catalogObject) => {
    const catalog = await Catalog.findByIdAndUpdate(catalogObject._id, {
        name: catalogObject.name,
        rate: catalogObject.rate
    })

    return { catalog }
}

// Delete catalog info
const catalogDelete = async (catalogObject, userId) => {
    const rooms = await Room.find({ catalog: catalogObject._id })

    if (rooms.length > 0) {
        throw new Error('Error: Catalog deletion failed.')
    } else {
        await Catalog.findOneAndDelete({ _id: catalogObject._id, owner: userId })
    }
}

module.exports = {
    catalogNew,
    catalogList,
    catalogUpdate,
    catalogDelete
} 