// Mongoose schema and model definition for financial transactions

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  note: {
    type: String
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
