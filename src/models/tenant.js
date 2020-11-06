const mongoose = require('mongoose')
const validator = require('validator')

// Tenant model
const tenantSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        trim: true
    },
    contact: {
        type: String,
        min: 11,
        max: 11,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Please provide a valid email address')
            }
        }
    },
    profile: {
        data: Buffer,
        contentType: String
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Room'
    },
}, {
    timestamps: true
})

tenantSchema.virtual('rooms', {
    ref: 'Room',
    localField: '_id',
    foreignField: 'tenant'
})


const Tenant = mongoose.model('Tenant', tenantSchema)

module.exports = Tenant