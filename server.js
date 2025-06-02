require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./db/db')
const authRoutes = require('./routes/authRoutes')
const homeRoutes = require('./routes/homeRoutes')
const adminRoutes = require('./routes/adminRoutes')
const uploadRoutes = require('./routes/imageRoute')

connectDB()

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/home', homeRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/image', uploadRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})