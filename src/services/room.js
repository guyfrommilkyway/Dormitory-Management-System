const Room = require('../models/room')
const { v4: uuidv4 } = require('uuid')

// Create room
const roomNew = async (roomObject) => {
    let i = 0

    for (i = 0; i < roomObject.number; i++) {
        const room = new Room({
            catalog: roomObject.catalog,
            name: uuidv4(),
            floor: roomObject.floor,
            property: roomObject.property
        })

        await room.save()
    }
}

// List rooms
const roomList = async (_id) => {
    const rooms = await Room.find({ property: _id })
        .lean()
        .populate('catalog')
        .populate('tenant')
        .exec()

    return { rooms }
}

// Update room info
const roomEdit = async (roomObject) => {
    const room = await Room.findByIdAndUpdate(roomObject._id, {
        name: roomObject.name,
        floor: roomObject.floor,
        catalog: roomObject.catalog
    }, { new: true })

    return { room }
}

// Delete room
const roomDelete = async (roomObject) => {
    const room = await Room.findById(roomObject._id)
        .lean()

    if (room.tenant) {
        throw new Error('Error: Room deletion failed.')
    } else {
        await Room.findOneAndDelete({ _id: roomObject._id, property: roomObject.property })
    }
}


module.exports = {
    roomNew,
    roomList,
    roomEdit,
    roomDelete
}