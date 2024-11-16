const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/token');
const { bookTicket } = require('../controllers/bookingController')

// Book a movie ticket
router.post('/:movieId/bookTicket', authenticate, bookTicket)

module.exports = router;
