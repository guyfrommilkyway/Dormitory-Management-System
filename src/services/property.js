const Property = require('../models/property')

// Create property
const propertyNew = async (propertyObject, userId) => {
    const property = new Property({
        ...propertyObject,
        author: userId
    })

    await property.save()
}

const propertyList = async (userId) => {
    const properties = await Property.find({ author: userId })

    return { properties }
}

module.exports = {
    propertyNew,
    propertyList
} 