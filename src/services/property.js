const Property = require('../models/property')

// Create property
const propertyNew = async (propertyObject, userObject) => {
    const property = new Property({
        name: propertyObject.name,
        location: propertyObject.location,
        about: propertyObject.about,
        room: propertyObject.room,
        available: propertyObject.room,
        author: userObject._id
    })

    await property.save()
}

// List properties
const propertyList = async (userObject) => {
    const properties = await Property.find({ author: userObject._id })

    return { properties }
}

// View property
const propertyView = async (propertyId, userObject) => {
    const property = await Property.findOne({ _id: propertyId, author: userObject._id })

    return { property }
}

module.exports = {
    propertyNew,
    propertyList,
    propertyView
} 