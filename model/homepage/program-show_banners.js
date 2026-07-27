const mongoose = require('mongoose')

const programShowBannersSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },

  order: {
    type: Number,
    required: true
  },

  programId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'program'
  },
})

const Banners = mongoose.model('banners', programShowBannersSchema)
module.exports = Banners