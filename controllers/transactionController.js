
const Transaction = require('../models/Transaction');

exports.getAllTransactions = async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.json(transactions);
};

exports.createTransaction = async (req, res) => {
  const { amount, category, type, date, note } = req.body;
  const newTransaction = new Transaction({ amount, category, type, date, note });
  await newTransaction.save();
  res.status(201).json(newTransaction);
};

exports.updateTransaction = async (req, res) => {
  const { id } = req.params;
  const updated = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  await Transaction.findByIdAndDelete(id);
  res.json({ message: 'Transaction deleted' });
};
