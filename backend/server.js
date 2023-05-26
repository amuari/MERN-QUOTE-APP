const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 4000
const connectDB = require('./config/db')
const homeRoutes = require('./routes/home')
const cors = require('cors')
// middlewares
require('dotenv').config({ path: './config/.env' })
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
// connect to database
connectDB()

// routes

app.use('/', homeRoutes)

app.listen(process.env.PORT || PORT, () => {
  console.log(`we're live on ${PORT}`)
})
