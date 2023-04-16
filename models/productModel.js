const { json } = require('express')
const Product = require('../schemas/productSchema')
const User = require('../schemas/userSchema')

exports.addProduct = (req, res) => {

    const { name, description, price, imageUrl } = req.body

    if(!name || !description || !price || !imageUrl ) {
        return res.status(400).json({
            message: 'You need to enter all the fields'
        })
    }

    Product.create({ name, description, price, imageUrl })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong when creating the Product',
                err: err.message
            })
        })
}

exports.getAllProducts = (req, res) => {

    Product.find()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong when fetching all the data',
                err: err.message
            })
        })

}


exports.getProductById = (req, res) => {

    Product.findById(req.params.id)
    // .populate('User')
        .then(data => {
            if(!data) {
                res.status(404).json({
                    message: 'Could not find that product'
                })
            }
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong when fetching the product',
                err: err.message
            })
        })

}


exports.deleteProduct = (req, res) => {

    Product.findByIdAndDelete(req.params.id)
        .then(data => {
            if(!data) {
                return res.status(404).json({
                    message: 'Product not found'
                })
            }

            res.status(204).json({ id: data._id })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong while deleting product',
                err: err.message
            })
        })
}


exports.updateProduct = async (req, res) => {

    const _product = await Product.findOne({ _id: req.params.id })
        if(!_product) {
            return res.status(404).json({
                message: 'Could not find that product'
            })
        }

        _product.name = req.body.name || _product.name
        _product.description = req.body.description || _product.description
        _product.price = req.body.price || _product.price
        _product.imageUrl = req.body.imageUrl || _product.imageUrl

        const updatedProduct = await _product.save()

        res.status(200).json(updatedProduct)

}