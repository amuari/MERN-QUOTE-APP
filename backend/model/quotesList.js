const mongoose = require('mongoose')

const quotesSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Quotelist', quotesSchema, 'Quotelist')
