// Catalog model
const mongoose = require('mongoose')

const catalogSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    rate: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Catalog = mongoose.model('Catalog', catalogSchema)

module.exports = Catalog 