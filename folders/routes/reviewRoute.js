const express = require('express');
const router = express.Router();
const { roleCheck, verifyRole} = require('../middlewares/roleCheck');
const { authenticate } = require('../middlewares/token');
const { addReview, editReview, deleteReview } = require('../controllers/reviewController');

// Add a review for a movie (only authenticated customers)
router.post('/:movieId/review', authenticate, addReview);

//Edit Review for authnticated User
router.put('/editReview/review', authenticate, roleCheck(['admin', 'user']), verifyRole, editReview);

//delete Review for the original user and Amin
router.delete('/deleteReview/review', authenticate, roleCheck(['admin', 'user']), verifyRole, deleteReview);

module.exports = router;
