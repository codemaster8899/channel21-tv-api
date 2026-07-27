const mongoose = require('mongoose')

const sliderSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },

  title: {
    am: {type: String, required: true},
    ru: {type: String, required: true},
    en: {type: String, required: true}
  },

  description: {
    am: {type: String, required: true},
    ru: {type: String, required: true},
    en: {type: String, required: true}
  },

  link: {
    type: String,
    required: true,
  },

  slider_order: {
    type: Number,
    required: true,
  }
})

const Slider = mongoose.model('slider', sliderSchema)
module.exports = Slider