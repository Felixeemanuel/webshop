const User = require('../schemas/userSchema')
const Cart = require('../schemas/userSchema')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const auth = require('../authentication/auth')
const productSchema = require('../schemas/productSchema')

exports.registerUser = async (req, res) => {

    const { firstName, lastName, email, password, orders } = req.body

    if(!firstName || !lastName || !email || !password) {
        return res.status(404).json({
            message: 'Bad request! you need to enter all the fields.'
        })
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
    
        const _user = new User({ firstName, lastName, email, passwordHash: hashedPassword, orders })
        const user = await _user.save()
    
        res.status(200).json(auth.generateToken(user))
    }
    catch(err) {
        res.status(500).json({
            message: 'Something went wrong when registering user',
            err: err.message
        })
    }
}


exports.getAllUsers = (req, res) => {

    User.find()
    .populate('cart.product')
    .exec()
    .then(data => {

        res.status(200).json(data)

    })
    .catch(err => {
        res.status(500).json({
            message: 'Something went wrong when fetching the users',
            err: err.message
        })
    })

}


exports.loginUser = (req, res) => {
    const { email, password } = req.body
    if(!email || !password) {
        res.status(400).json({
            message: 'You need to enter all the fields'
        })
    }

    User.findOne({ email })
    .then(user => {
        if(!user) {
            return res.status(401).json({
                message: 'No match found'
            })
        }

        const equals = bcrypt.compare(password, user.passwordHash)
        if(!equals) {
            return res.status(401).json({
                message: 'No match found'
            })
        }
        
        res.status(200).json(auth.generateToken(user))
    })
    .catch(err => {
        res.status(500).json({
            message: 'Something went wrong when logging in user',
            err: err.message
        })
    })

}


exports.addToCart = (req, res) => {
    User.findByIdAndUpdate(
      req.params.id, 
    //   { $push: {cart: req.body} },
      { new: true }
    )
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: 'Could not find user'
        });
      }
  
      const existingOrder = user.cart.filter(order => order.product.equals(req.body.product))[0];
  
      if (existingOrder) {
        existingOrder.quantity++;
      } else {
        user.cart.push(req.body);
      }
  
      user.save();
      res.status(200).json(user);
  
    })
    .catch(err => {
      res.status(500).json({
        message: 'Something went wrong when placing order',
        error: err.message
      });
    });
  };

  exports.getUserById = (req, res) => {

    User.findById(req.params.id)
    .then(user => {
        if(!user) {
            res.status(404).json({
                message: 'Could not find that user'
            })
        }

        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({
            message: 'Something went wrong when fetching user',
            err: err.message
        })
    })
  }
  




