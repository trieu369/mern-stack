require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

const app = express()


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
        console.log('App ias liaasteninga on port ',process.env.PORT)
    })
} )
.catch((err) => {
    console.log(err)
})

