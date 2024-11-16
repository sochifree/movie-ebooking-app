const express = require('express');
const router = express.Router();
const {authenticate} = require('../middlewares/token');
const { roleCheck, verifyRole} = require('../middlewares/roleCheck');
const { getAllMovies, addMovies, editMovie, deleteMovie } = require('../controllers/movieController')

// Get all movies
router.get('/AllMovies', getAllMovies);

// Add a new movie (Admin only)
router.post('/addMovies', authenticate, roleCheck(['admin']), verifyRole, addMovies);

//Update movie (admin only)
router.put('/:movieId', authenticate, roleCheck(['admin']), verifyRole, editMovie)

//delete Movie(admin only)
router.delete('/:movieId', authenticate, roleCheck(['admin']), verifyRole, deleteMovie)

module.exports = router;
