const router = require('express').Router()
const { verifyToken } = require('../authentication/auth')
const { registerUser, getAllUsers, loginUser, addToCart } = require('../models/userModel')

router.post('/register', registerUser)

router.get('/', getAllUsers)

router.post('/login', loginUser)

router.post('/cart/:id', addToCart)



module.exports = router