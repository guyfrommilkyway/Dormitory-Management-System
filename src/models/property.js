// Property model
const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true
    },
    room: {
        type: Number,
        required: true
    },
    available: {
        type: Number
    },
    occupied: {
        type: Number,
        default: 0
    },
    resident: {
        type: Number,
        default: 0
    },
    booking: {
        type: Number,
        default: 0
    },
    avatar: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

propertySchema.virtual('rooms', {
    ref: 'Room',
    localField: '_id',
    foreignField: 'property'
})

const Property = mongoose.model('Property', propertySchema)

module.exports = Property 