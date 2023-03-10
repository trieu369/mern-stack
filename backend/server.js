const express = require('express')

const app = express()

app.listen(400, () =>{
    console.log('App ias liaasteninga on port 4000')
})
// routes
app.get('/',(req,res) => {
    res.json({mssg: 'Welcome'})
})