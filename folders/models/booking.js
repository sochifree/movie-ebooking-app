const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  screeningTime: { type: Date, required: true },
  seatsBooked: { type: Number, required: true },
});

module.exports = mongoose.model('Booking', BookingSchema);
