// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  categoryLetter: {
    type: String,
    required: true,
  },
  cta_cont: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Category', categorySchema);