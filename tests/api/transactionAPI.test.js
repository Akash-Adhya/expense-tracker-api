const request = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.test' });

const app = require('../../server'); // Make sure to export app from server.js

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI_TEST);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Transaction API - Endpoints', () => {
  let txnId;

  it('POST /transactions - should create a transaction', async () => {
    const res = await request(app)
      .post('/transactions')
      .send({ amount: 50, category: 'Books', type: 'expense', date: new Date(), note: 'Test' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    txnId = res.body._id;
  });

  it('GET /transactions - should fetch transactions', async () => {
    const res = await request(app).get('/transactions');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('PUT /transactions/:id - should update a transaction', async () => {
    const res = await request(app)
      .put(`/transactions/${txnId}`)
      .send({ amount: 75 });
    expect(res.statusCode).toBe(200);
    expect(res.body.amount).toBe(75);
  });

  it('DELETE /transactions/:id - should delete a transaction', async () => {
    const res = await request(app).delete(`/transactions/${txnId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Transaction deleted');
  });

  it('POST /transactions - should fail with missing required fields', async () => {
    const res = await request(app)
      .post('/transactions')
      .send({ category: 'Books' }); // missing amount, type
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it('PUT /transactions/:id - should return 404 for invalid id', async () => {
    const res = await request(app)
      .put('/transactions/invalidid')
      .send({ amount: 75 });
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it('DELETE /transactions/:id - should return 404 for invalid id', async () => {
    const res = await request(app).delete('/transactions/invalidid');
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it('GET /transactions - should return empty array if no transactions', async () => {
    // Clean DB and check
    await mongoose.connection.dropDatabase();
    const res = await request(app).get('/transactions');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });
});
