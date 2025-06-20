
# Expense Tracker API

## Description
A simple RESTful API to track income and expense transactions.

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose

## Setup Instructions
1. Clone the repo and `cd expense-tracker-api`
2. Run `npm install`
3. Set up MongoDB and update `.env`
4. Run server with `nodemon server.js`

## API Endpoints

### GET /transactions
Returns all transactions.

### POST /transactions
Creates a transaction.

### PUT /transactions/:id
Updates a transaction by ID.

### DELETE /transactions/:id
Deletes a transaction by ID.

## Sample Transaction JSON
```json
{
  "amount": 500,
  "category": "Groceries",
  "type": "expense",
  "note": "Weekly shopping"
}
```
