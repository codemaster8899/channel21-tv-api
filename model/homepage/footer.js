const mongoose = require('mongoose')

const footerSchema = mongoose.Schema({
  title: {
    am: {type: String, required: true},
    ru: {type: String, required: true},
    en: {type: String, required: true},
  },
})

const Footer = mongoose.model('footer', footerSchema)
module.exports = Footer