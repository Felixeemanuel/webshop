const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.SECRET_KEY


exports.generateToken = (user) => {

    return jwt.sign({ _id: user._id}, secretKey, { expiresIn: '1d' })

}


exports.verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        req.userId = jwt.verify(token, secretKey)._id
        next()
    }
    catch {
        return res.status(401).json({
            message: 'Access denied. You need to login first'
        })
    }
}