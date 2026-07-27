const mongoose = require('mongoose')

const pageContentSchema = mongoose.Schema({
  image: {
    type: String,
    require: true
  },
 
  title: {
    am: {type: String, unique: true, required: true },
    ru: {type: String, unique: true, required: true },
    en: {type: String, unique: true, required: true },
  },
})

const PageContent = mongoose.model('page-content', pageContentSchema)
module.exports = PageContent