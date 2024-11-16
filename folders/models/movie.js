const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

  const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    screeningTimes: [Date],
    availableSeats: { type: Number, required: true },
    reviews: [reviewSchema], // Add reviews array
    averageRating: { type: Number, default: 0 }
  });

module.exports = mongoose.model('Movie', movieSchema);