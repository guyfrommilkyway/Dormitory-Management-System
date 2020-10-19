// Room model
const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true
    },
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Tenant'
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Property'
    }
}, {
    timestamps: true
})

const Room = mongoose.model('Room', roomSchema)

module.exports = Room 