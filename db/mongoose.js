const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.DB_URL
mongoose.connect(url,{
  useNewUrlParser: true,
  useUnifiedTopology: true
},(err)=>{
  if(!err)console.log("db is connected")
  else console.log("db error")  
})

