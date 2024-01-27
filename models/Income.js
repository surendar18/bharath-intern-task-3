const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
