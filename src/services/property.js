const Property = require('../models/property')

// Create property
const propertyNew = async (propertyObject, fileObject, userObject) => {
    const avatar = fileObject[0].filename
    const property = new Property({
        name: propertyObject.name,
        location: propertyObject.location,
        about: propertyObject.about,
        room: propertyObject.room,
        avatar,
        author: userObject._id
    })

    await property.save()
}

const propertyList = async (userObject) => {
    const properties = await Property.find({ author: userObject._id })

    return { properties }
}

module.exports = {
    propertyNew,
    propertyList
} 