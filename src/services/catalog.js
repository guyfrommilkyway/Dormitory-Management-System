const Catalog = require('../models/catalog')
const Room = require('../models/room')

// Create new catalog
const catalogNew = async (catalogObject, _id) => {
    const catalog = new Catalog({
        ...catalogObject,
        owner: _id
    })

    await catalog.save()
}

// List catalog
const catalogList = async (_id) => {
    const catalogs = await Catalog.find({ owner: _id })
        .lean()

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
const catalogDelete = async (catalogObject, _id) => {
    const rooms = await Room.find({ catalog: catalogObject._id })

    if (rooms.length > 0) {
        throw new Error('Error: Catalog deletion failed.')
    } else {
        await Catalog.findOneAndDelete({ _id: catalogObject._id, owner: _id })
    }
}

module.exports = {
    catalogNew,
    catalogList,
    catalogEdit,
    catalogDelete
} 