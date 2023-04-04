const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()


const PORT = process.env.PORT || 8888

app.listen(PORT, () => console.log('server running on port ' + PORT))
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('connected to db'))