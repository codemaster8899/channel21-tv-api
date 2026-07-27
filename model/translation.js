const mongoose = require('mongoose')
const translationSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  values: {
    en: {type: String, required: true },
    ru: {type: String, required: true },
    am: {type: String, required: true }, 
  } 
 
})
const Translation = new mongoose.model('translation', translationSchema)

module.exports = Translation
