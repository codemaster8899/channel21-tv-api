const mongoose = require('mongoose')

const socialMediaSchema = mongoose.Schema({
  
  title: {
    am: {type: String, required: true},
    ru: {type: String, required: true},
    en: {type: String, required: true},
  },

  description: {
    am: {type: String, required: true},
    ru: {type: String, required: true},
    en: {type: String, required: true},
  },

  facebookLink: {
    type: String
  },

  twitterLink: {
    type: String
  },

  youtubeLink: {
    type: String
  },
  
  instagramLink: {
    type: String
  }
  
})

const Media = mongoose.model('social_media', socialMediaSchema)
module.exports = Media