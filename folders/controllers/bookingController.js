const Booking = require('../models/booking');
const movie = require('../models/movie');
const nodemailer = require('nodemailer');

module.exports={
    bookTicket: async (req, res) => {
        const { seatsBooked, screeningTime } = req.body;
            try {
                const movie = await movie.findById(req.params.movieId);
            if (!movie) return res.status(404).json({ error: 'Movie not found' });
      
          // Check if enough seats are available
            if (movie.availableSeats < seatsBooked) {
            return res.status(400).json({ error: 'Not enough seats available' });
            }
      
          // Create booking
          const booking = new Booking({
            user: req.user,
            movie: movie._id,
            screeningTime,
            seatsBooked,
          });
          
          await booking.save();
      
          // Update available seats in the movie
          movie.availableSeats -= seatsBooked;
          await movie.save();

 // Send confirmation email
 //const transporter = nodemailer.createTransport({
   // service: 'gmail',
   // auth: {
     // user: process.env.EMAIL_USER,
     // pass: process.env.EMAIL_PASS,
   // },
  //});

 // const mailOptions = {
   // from: process.env.EMAIL_USER,
    //to: req.user.email,
   // subject: 'Booking Confirmation',
   // text: `Your booking for ${movie.title} at ${screeningTime} has been confirmed.`,
 // };

 // await transporter.sendMail(mailOptions);

  //res.json({ message: 'Booking confirmed and email sent' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        }
    }
};