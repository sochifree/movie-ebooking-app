const express = require('express');
const { signup, login } = require('../controllers/userController')

const { authenticate } = require('../middlewares/token');
const { roleCheck, verifyRole} = require('../middlewares/roleCheck');

const router = express.Router();

//Signup Route
router.post('/signup', signup)

//Login Route 
router.post('/login', login)

//Route accessible to bot instructor and students
router.get('/dashboard', authenticate, (req, res)=>{
    res.status(200).json({message: `Welcome ${req.user.role}`})
})

//Route accessible to admin only
router.get('/admin', authenticate, roleCheck(['admin']), verifyRole, (req, res)=>{
    res.status(200).json({message:'Welcome Admin'})
});

//Route accessible to customer only
router.get('/user', authenticate, roleCheck(['customer']), verifyRole, (req, res)=>{
    res.status(200).json({message:'Welcome customer'})
});

module.exports = router;