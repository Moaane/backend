const express = require('express')
const cors = require('cors')
require('dotenv').config()

const UserRoute = require('./Routes/UserRoute.js')
const AuthRoute = require('./Routes/AuthRoute.js')
const ProductRoute = require('./Routes/ProductRoute.js')

const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT

const myLogger = function (req, res, next) {
    next()
}

app.use(myLogger)

app.use('/api/product', ProductRoute)
app.use('/api/user', UserRoute)
app.use('/api/auth', AuthRoute)

app.listen(port, "192.168.18.213", () => {
    console.log('Server Ready')
})