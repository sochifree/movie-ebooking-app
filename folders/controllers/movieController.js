const movie = require('../models/movie');

module.exports = {
    getAllMovies: async(req, res, next)=>{
    try {
        const movies = await movie.find();
            res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
},

//Only admin permitted
    addMovies: async (req, res, next)=>{
     const { title, genre, screeningTimes, availableSeats } = req.body;
    try {
        const movie = new movie(
            { title, genre, screeningTimes, availableSeats });
        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
     }
},

// Edit (Update) a movie
    editMovie: async (req, res, next) => {
    const { title, genre, screeningTimes, availableSeats } = req.body;
  
    try {
      const movie = await movie.findById(req.params.movieId);
      if (!movie) return res.status(404).json({ error: 'Movie not found' });
  
      // Update the movie details
      if (title) movie.title = title;
      if (genre) movie.genre = genre;
      if (screeningTimes) movie.screeningTimes = screeningTimes;
      if (availableSeats !== undefined) movie.availableSeats = availableSeats;
  
      await movie.save();
      res.json({ message: 'Movie updated successfully', movie });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  
  // Delete a movie
    deleteMovie: async (req, res, next) => {
    try {
      const movie = await movie.findById(req.params.movieId);
      if (!movie) return res.status(404).json({ error: 'Movie not found' });
  
      await movie.remove();
      res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
}
