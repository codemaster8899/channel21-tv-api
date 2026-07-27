const express = require('express')
const cors = require("cors")
const router = require('./routes/routes')
const corsOptions = require('./utils/cors-option')
require('./db/mongoose.js')
require('dotenv').config()
const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static('./public'));
app.use(router)
 
const port = process.env.PORT ||  process.env.LOCAL_PORT

app.listen(port, ()=>{
  console.log(`Server is listening on port ${port}`)
})

