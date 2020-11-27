const { v4: uuidv4 } = require('uuid')
const Property = require('../models/property')
const Room = require('../models/room')

// Create property
const propertyNew = async (propertyObject, _id) => {
    const property = new Property({
        ...propertyObject,
        bookingId: uuidv4(),
        owner: _id
    })

    await property.save()
}

// List all properties
const propertyListAll = async () => {
    const properties = await Property.find({})
        .lean()

    return { properties }
}

// List all properties of specific user
const propertyList = async (_id) => {
    const properties = await Property.find({ owner: _id })
        .lean()

    return { properties }
}

// View property
const propertyView = async (_id) => {
    const property = await Property.findOne({ bookingId: _id })
        .lean()

    return { property }
}

// Update property info
const propertyEdit = async (propertyObject) => {
    const property = await Property.findByIdAndUpdate(propertyObject._id, {
        name: propertyObject.name,
        location: propertyObject.location
    })

    return { property }
}

// Delete property info
const propertyDelete = async (propertyObject, _id) => {
    const rooms = await Room.find({ property: propertyObject._id })

    if (rooms.length > 0) {
        throw new Error('Error: Property deletion failed.')
    } else {
        await Property.findOneAndDelete({ _id: propertyObject._id, owner: _id })
    }
}

module.exports = {
    propertyNew,
    propertyListAll,
    propertyList,
    propertyView,
    propertyEdit,
    propertyDelete
} 