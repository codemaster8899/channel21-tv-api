const mongoose = require('mongoose')

const liveSchema = mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
})

const Live = mongoose.model('live', liveSchema)
module.exports = Live