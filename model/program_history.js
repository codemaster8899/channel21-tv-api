const mongoose = require('mongoose')

const historySchema = mongoose.Schema({
  programId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "program",
    required: true
  },

  episode: {
    type: Number,
    required: true 
  },

  link: {
    type: String,
    required: true
  },

 
  title: {
    am: {type: String},
    ru: {type: String},
    en: {type: String},
  },

  duration: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    required: true  
  },

  image: {
    type: String,
    required: true
  }
},{timestamps: true})

const ProgramHistory = mongoose.model('program_history', historySchema)
module.exports = ProgramHistory