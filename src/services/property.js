const { v4: uuidv4 } = require('uuid')
const Property = require('../models/property')

// Create property
const propertyNew = async (propertyObject, userObject) => {
    const property = new Property({
        ...propertyObject,
        bookingId: uuidv4(),
        owner: userObject._id
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
const propertyList = async (userObject) => {
    const properties = await Property.find({ owner: userObject._id })

    return { properties }
}

// View property
const propertyView = async (propertyBookingId) => {
    const property = await Property.findOne({ bookingId: propertyBookingId })

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
const propertyDelete = async (propertyObject, userObject) => {
    await Property.findOneAndDelete({ _id: propertyObject._id, owner: userObject._id })
}

module.exports = {
    propertyNew,
    propertyListAll,
    propertyList,
    propertyView,
    propertyEdit,
    propertyDelete
} 