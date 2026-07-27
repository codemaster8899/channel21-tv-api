const mongoose = require('mongoose')

const programSchema = new mongoose.Schema({
 
  name: {
    am: {type: String, unique: true, required: true},
    ru: {type: String, unique: true, required: true},
    en: {type: String, unique: true, required: true},
  },

  description: {
    am: {type: String, required: true},
    ru: {type: String, required: true},
    en: {type: String, required: true},
  },

  image: {
    type: String,
    required: true

  },

  banners_order: {
    type: Number,
    required: true
  },

  link: {
    type: String
  },

  program_type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'program_type',
    required: true
  }
},{timestamps: true})

const Program = mongoose.model('program', programSchema)
module.exports = Program