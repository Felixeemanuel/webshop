const router = require('express').Router()
const { addProduct, getAllProducts, deleteProduct, updateProduct, getProductById } = require('../models/productModel')

router.post('/add', addProduct)

router.get('/', getAllProducts)

router.delete('/:id', deleteProduct)

router.put('/:id', updateProduct)

router.get('/:id', getProductById)



module.exports = router