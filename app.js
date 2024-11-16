const express = require ('express');
const bodyParser = require('body-parser')
const db = require('./config/db')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000

const bookingRoute = require('./folders/routes/bookingRoute')
const movieRoute = require('./folders/routes/movieRoute')
const userRoute = require('./folders/routes/userRoute')
const reviewRoute = require('./folders/routes/reviewRoute');

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/api/user', userRoute);
app.use('/api/movie', movieRoute);
app.use('/api/booking', bookingRoute);
app.use('/api/movies', reviewRoute);

app.get('/', (req, res)=>{
    console.log('App Running')
    res.status(200)
})

app.listen(port, ()=>{
    console.log(`Speak Lord, the server is running on port ${port}`)
})