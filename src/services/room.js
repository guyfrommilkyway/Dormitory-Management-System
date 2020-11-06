const Room = require('../models/room')
const { v4: uuidv4 } = require('uuid')

// Create room
const roomNew = async(roomObject) => {
    let i = 0
 
    for (i = 0; i < roomObject.number; i++) {
        const room = new Room({
            catalog: roomObject.catalog,
            name: 'Room-' + uuidv4(),
            floor: roomObject.floor,
            property: roomObject.property
        })

        await room.save()
    }
}

// List rooms
const roomList = async(propertyId) => {
    const rooms = await Room.find({ property: propertyId })
        .populate('catalog')
        .exec()

    return { rooms }
}

module.exports = {
    roomNew,
    roomList
}