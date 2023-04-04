const mongoose = require('mongoose')
const { Schema } = mongoose

const cartSchema = new Schema({
    product: { type: mongoose.Types.ObjectId, ref: 'Product'},
    quantity: { type: Number, default: 1 },
})

const userSchema = new Schema({

    firstName:      { type: String, required: true },
    lastName:       { type: String, required: true },
    email:          { type: String, required: true, lowercase: true, unique: true }, 
    passwordHash:   { type: String, required: true },
    cart:           [cartSchema]
    // cart:           [
    //     {
    //     product: { type: mongoose.Types.ObjectId, ref: 'Product'},
    //     quantity: { type: Number, default: 1 }
    //     }
        
    // ]

})


// const cartSchema = new Schema({

//     order:  { type: mongoose.Types.ObjectId, ref: 'User' },
//     amount: { type: Number, default: 1 }

// })

module.exports = mongoose.model('Cart', cartSchema)
module.exports = mongoose.model('User', userSchema)