const Room = require('../models/room')

// Create room
const roomNew = async (roomObject) => {
    const room = new Room(roomObject)

    await room.save()
}

module.exports = {
    roomNew
} 