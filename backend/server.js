require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

const app = express()

const PORT = process.env.PORT || 3030;

app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path,req.method)
    next()
})

// routes
app.use('/api/workouts',workoutRoutes)

// connect to db
mongoose.connect(process.env.MONG_URL)
.then(() => {
    app.listen(process.env.PORT, () =>{
        console.log(`Server started on port ${PORT}`)
    })
} )
.catch((err) => {
    console.log(err)
})

