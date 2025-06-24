const { createTransaction, getAllTransactions, updateTransaction, deleteTransaction } = require('../../backend/controllers/transactionController');
const Transaction = require('../../models/Transaction.js');

jest.mock('../../backend/models/Transaction');

describe('Transaction Controller - Unit', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch all transactions', async () => {
    const mockData = [{ amount: 100 }];
    Transaction.find.mockReturnValue({ sort: jest.fn().mockResolvedValue(mockData) });

    const req = {};
    const res = { json: jest.fn() };

    await getAllTransactions(req, res);

    expect(Transaction.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  test('should create a new transaction', async () => {
    const body = { amount: 200, category: 'Food', type: 'expense', date: new Date(), note: 'Lunch' };
    const savedTxn = { ...body, save: jest.fn().mockResolvedValue(body) };
    Transaction.mockImplementation(() => savedTxn);

    const req = { body };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await createTransaction(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(savedTxn);
  });

  test('should handle errors when fetching transactions', async () => {
    Transaction.find.mockImplementation(() => { throw new Error('DB error'); });
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await expect(getAllTransactions(req, res)).rejects.toThrow('DB error');
  });

  test('should handle missing required fields when creating transaction', async () => {
    const req = { body: { category: 'Food' } }; // missing amount, type
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    Transaction.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(new Error('ValidationError'))
    }));
    await expect(createTransaction(req, res)).rejects.toThrow('ValidationError');
  });

  test('should update a transaction', async () => {
    const req = { params: { id: '123' }, body: { amount: 300 } };
    const res = { json: jest.fn() };
    Transaction.findByIdAndUpdate = jest.fn().mockResolvedValue({ _id: '123', amount: 300 });
    await updateTransaction(req, res);
    expect(Transaction.findByIdAndUpdate).toHaveBeenCalledWith('123', { amount: 300 }, { new: true });
    expect(res.json).toHaveBeenCalledWith({ _id: '123', amount: 300 });
  });

  test('should delete a transaction', async () => {
    const req = { params: { id: '123' } };
    const res = { json: jest.fn() };
    Transaction.findByIdAndDelete = jest.fn().mockResolvedValue({});
    await deleteTransaction(req, res);
    expect(Transaction.findByIdAndDelete).toHaveBeenCalledWith('123');
    expect(res.json).toHaveBeenCalledWith({ message: 'Transaction deleted' });
  });

  test('should handle error on updateTransaction', async () => {
    const req = { params: { id: 'badid' }, body: { amount: 100 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    Transaction.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Update error'));
    await expect(updateTransaction(req, res)).rejects.toThrow('Update error');
  });

  test('should handle error on deleteTransaction', async () => {
    const req = { params: { id: 'badid' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    Transaction.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Delete error'));
    await expect(deleteTransaction(req, res)).rejects.toThrow('Delete error');
  });
});
