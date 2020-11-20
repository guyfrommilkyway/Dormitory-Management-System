const Booking = require('../models/booking')

// Create booking
const bookingNew = async (bookingObject) => {
    const booking = new Booking(bookingObject)

    await booking.save()
}

// List bookings
const bookingList = async (propertyId) => {
    const bookings = await Booking.find({ property: propertyId })
        .lean()

    return { bookings }
}

module.exports = {
    bookingNew,
    bookingList
}