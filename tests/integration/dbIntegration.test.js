const mongoose = require('mongoose');
const Transaction = require('../../backend/models/Transaction');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Transaction Model - Integration', () => {
  it('saves a transaction to the database', async () => {
    const txn = new Transaction({ amount: 100, category: 'Test', type: 'income', note: 'Integration test' });
    const saved = await txn.save();
    expect(saved.amount).toBe(100);
    expect(saved._id).toBeDefined();
  });

  it('should fail validation for missing required fields', async () => {
    const txn = new Transaction({ category: 'Test' }); // missing amount, type
    let error;
    try {
      await txn.save();
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error.name).toBe('ValidationError');
  });
});


