const router = require('express').Router()
const { verifyToken } = require('../authentication/auth')
const { registerUser, getAllUsers, loginUser, addToCart, getUserById } = require('../models/userModel')

router.post('/register', registerUser)

router.get('/', getAllUsers)
router.get('/:id', verifyToken, getUserById)

router.post('/login', loginUser)

router.post('/cart/:id', verifyToken, addToCart)



module.exports = router