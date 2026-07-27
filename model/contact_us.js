const mongoose  = require('mongoose')
const validator = require('validator')

const contactUsSchema = mongoose.Schema({
  title: {
    am: {type: String, required: true},
    ru: {type: String, required: true},
    en: {type: String, required: true},
  },

  description: {
    am: {type: String, required: true},
    ru: {type: String, required: true},
    en: {type: String, required: true}
  },

  email:{
    type: String,
    required: true,
    unique:true,
    trim: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Email is invalid!')
      }
    }
  },

  phone: {
    type: String,
    unique: true,
    required: true
  },

  address: {
    am: {type: String},
    ru: {type: String},
    en: {type: String}
  },
})

const Contact = mongoose.model("contact_us",contactUsSchema)
module.exports = Contact