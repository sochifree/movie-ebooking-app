const Movie = require('../models/movie');

module.exports = {
    // Add a review for a movie
addReview:async (req, res) => {
    const { rating, comment } = req.body;
  
    try {
      // Find the movie by ID
      const movie = await Movie.findById(req.params.movieId);
  
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
  
      // Check if the user has already reviewed the movie
      const alreadyReviewed = movie.reviews.find(
        (review) => review.user.toString() === req.user.id.toString()
      );
  
      if (alreadyReviewed) {
        return res.status(400).json({ error: 'You have already reviewed this movie' });
      }
  
      // Add the new review
      const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment
      };
  
      movie.reviews.push(review);
  
      // Calculate the average rating
      movie.averageRating =
        movie.reviews.reduce((acc, review) => acc + review.rating, 0) / movie.reviews.length;
  
      await movie.save();
      res.status(201).json({ message: 'Review added', review });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  //edit review
  editReview: async(req, res)=>{
    const { rating, comment } = req.body;

    try{
        const userId = req.user.id.toString(); 
        const  movie  = await Movie.findById(req.params.movieId)
            if(!movie){
                res.status(404).json({message: 'Movie not found'})
            }
           
            const existingReview = movie.reviews.find(( review ) => review._id.toString() === req.params.reviewId)

            if (!existingReview) {
                return res.status(404).json({ error: 'Review not found' });
              }

                // Check if the user is the owner of the review or if they are an admin
            if (review.user.toString() !== req.user.id && !req.user.isAdmin) {
                return res.status(403).json({ message: 'Not authorized to edit this review' });
            }

             // Update the review with new data
            if (rating) review.rating = Number(rating);
            if (comment) review.comment = comment;

             // Recalculate the average rating
            movie.averageRating =
            movie.reviews.reduce((acc, review) => acc + review.rating, 0) / movie.reviews.length;

            await movie.save();

            res.status(200).json({message:'Review updated', review})
        
        } catch (error){
            res.status(500).json({ message:'Internal error', error })
            }
    },

    deleteReview: async (req, res)=>{
        try{
            const movie = await Movie.findById(req.params.movieId)
            
            if(!movie){
                res.status(404).json({message: 'Movie not found'})
            }

            const review = movie.reviews.find( review => review._id.toString() === req.params.reviewId);

            if(!review){
                return res.status(404).json({message:'No review made'})
            }

            // Check if the user is the owner of the review or if they are an admin
            if (review.user.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to delete this review' });
            }

            // Remove the review
            movie.reviews = movie.reviews.filter(review => review._id.toString() !== req.params.reviewId);

             // Recalculate the average rating
            if (movie.reviews.length > 0) {
                movie.averageRating = movie.reviews.reduce((acc, review) => acc + review.rating, 0) / movie.reviews.length;
            } else {
                movie.averageRating = 0; // No reviews left, so reset the average rating
            }

            await movie.save()

            res.status(200).json({message:'Review Deleted'})

        }catch(error){
            res.status(500).json({message:'Internal Error', error})
        }
    }
}
