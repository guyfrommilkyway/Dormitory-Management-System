const Property = require('../models/property')

// Create property
const propertyNew = async (propertyObject, userObject) => {
    const property = new Property({
        ...propertyObject,
        owner: userObject._id
    })

    await property.save()
}

// List properties
const propertyList = async (userObject) => {
    const properties = await Property.find({ owner: userObject._id })

    return { properties }
}

// View property
const propertyView = async (propertyId, userObject) => {
    const property = await Property.findOne({ _id: propertyId, owner: userObject._id })

    return { property }
}

module.exports = {
    propertyNew,
    propertyList,
    propertyView
} 