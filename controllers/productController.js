const router = require('express').Router()
const { addProduct, getAllProducts, deleteProduct, updateProduct, getProductById } = require('../models/productModel')

router.post('/add', addProduct)

router.get('/', getAllProducts)
router.get('/:id', getProductById)

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)




module.exports = router