# Expense Tracker API

A simple and efficient RESTful API built with Node.js and Express for tracking personal income and expense transactions. This API provides full CRUD (Create, Read, Update, Delete) operations for managing financial transactions with MongoDB as the database.

## Features

- **Transaction Management**: Create, read, update, and delete financial transactions
- **Category Tracking**: Organize transactions by categories (e.g., Groceries, Entertainment, Salary)
- **Transaction Types**: Support for both income and expense transactions
- **Notes Support**: Add optional notes to transactions for better tracking
- **RESTful Design**: Clean and intuitive API endpoints following REST principles

## Technology Stack

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Environment Management**: dotenv for configuration
- **Development**: Nodemon for auto-restart during development

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 14.x or higher)
- **npm** (Node Package Manager)
- **MongoDB** (local installation or MongoDB Atlas account)

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Akash-Adhya/expense-tracker-api.git
cd expense-tracker-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and configure the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/expense-tracker
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker

# Server Configuration
PORT=5000

# Optional: Additional configurations
NODE_ENV=development
```

### 4. Database Setup

**For Local MongoDB:**
- Ensure MongoDB is running on your local machine
- The application will automatically create the database and collections

**For MongoDB Atlas:**
- Create a MongoDB Atlas account
- Set up a cluster and get the connection string
- Replace the MONGODB_URI in your `.env` file

## 🚀 Running the Application

### Development Mode
Start the server with auto-restart on file changes:

```bash
npm run dev
# or
nodemon server.js
```

### Production Mode
Start the server in production mode:

```bash
npm start
# or
node server.js
```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Get All Transactions
- **Method**: `GET`
- **Endpoint**: `/transactions`
- **Description**: Retrieve all transactions from the database
- **Response**: Array of transaction objects

**Example Response:**
```json
[
  {
    "_id": "64a7b8c9d1234567890abcde",
    "amount": 500,
    "category": "Groceries",
    "type": "expense",
    "note": "Weekly shopping",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### 2. Create New Transaction
- **Method**: `POST`
- **Endpoint**: `/transactions`
- **Description**: Create a new income or expense transaction
- **Request Body**:

```json
{
  "amount": 500,
  "category": "Groceries",
  "type": "expense",
  "note": "Weekly shopping"
}
```

**Response:**
```json
{
  "_id": "64a7b8c9d1234567890abcde",
  "amount": 500,
  "category": "Groceries",
  "type": "expense",
  "note": "Weekly shopping",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### 3. Update Transaction
- **Method**: `PUT`
- **Endpoint**: `/transactions/:id`
- **Description**: Update an existing transaction by its ID
- **Parameters**: `id` - Transaction ID
- **Request Body**: Any combination of updatable fields

```json
{
  "amount": 750,
  "category": "Groceries",
  "note": "Monthly grocery shopping"
}
```

#### 4. Delete Transaction
- **Method**: `DELETE`
- **Endpoint**: `/transactions/:id`
- **Description**: Delete a transaction by its ID
- **Parameters**: `id` - Transaction ID
- **Response**: Success message or error

### Transaction Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| amount | Number | Yes | Transaction amount (positive number) |
| category | String | Yes | Transaction category |
| type | String | Yes | "income" or "expense" |
| note | String | No | Optional description/note |
| createdAt | Date | Auto | Timestamp of creation |
| updatedAt | Date | Auto | Timestamp of last update |

## 🧪 API Testing Examples

### Using cURL

**Get all transactions:**
```bash
curl -X GET http://localhost:5000/api/transactions
```

**Create a new expense:**
```bash
curl -X POST http://localhost:5000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1200,
    "category": "Rent",
    "type": "expense",
    "note": "Monthly rent payment"
  }'
```

**Create a new income:**
```bash
curl -X POST http://localhost:5000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 5000,
    "category": "Salary",
    "type": "income",
    "note": "Monthly salary"
  }'
```

**Update a transaction:**
```bash
curl -X PUT http://localhost:5000/api/transactions/64a7b8c9d1234567890abcde \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1300,
    "note": "Updated rent amount"
  }'
```

**Delete a transaction:**
```bash
curl -X DELETE http://localhost:5000/api/transactions/64a7b8c9d1234567890abcde
```

### Using Postman or Thunder Client

1. **Import Collection**: Create a new collection in Postman
2. **Set Base URL**: `http://localhost:5000/api`
3. **Test Endpoints**: Use the examples above to test each endpoint

## 🗄️ Database Integration

### MongoDB Connection
The application uses Mongoose ODM to connect to MongoDB. The connection is established in the main server file with the following features:

- **Connection String**: Configured via environment variables
- **Auto-Reconnection**: Automatic reconnection on connection loss
- **Schema Validation**: Mongoose schemas ensure data integrity
- **Indexes**: Optimized queries with proper indexing

### Transaction Model
```javascript
const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['income', 'expense']
  },
  note: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});
```

## 📁 Project Structure

```
expense-tracker-api/
├── models/
│   └── Transaction.js      # Mongoose transaction model
├── routes/
│   └── transactions.js     # Transaction routes
├── middleware/
│   └── errorHandler.js     # Error handling middleware
├── config/
│   └── database.js         # Database configuration
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
├── package.json           # Project dependencies
├── server.js              # Main server file
└── README.md              # Project documentation
```

## 🚨 Error Handling

The API includes comprehensive error handling for:

- **Validation Errors**: Invalid data format or missing required fields
- **Database Errors**: Connection issues or query failures
- **Not Found Errors**: When requesting non-existent resources
- **Server Errors**: Internal server errors with appropriate status codes

Example error response:
```json
{
  "error": "Transaction not found",
  "status": 404,
  "message": "The requested transaction does not exist"
}
```

## 🔒 Security Considerations

Current implementation includes basic security measures:
- Input validation using Mongoose schemas
- Error message sanitization
- Environment variable usage for sensitive data

**Recommended Enhancements:**
- Add authentication middleware (JWT)
- Implement rate limiting
- Add request validation middleware
- Use CORS for cross-origin requests
- Add API key authentication

## Deployment

### Local Deployment
Follow the installation and setup instructions above.

### Production Deployment Options

1. **Heroku**:
   - Add Procfile: `web: node server.js`
   - Set environment variables in Heroku dashboard
   - Connect to MongoDB Atlas

2. **Railway/Render**:
   - Connect GitHub repository
   - Set environment variables
   - Deploy automatically

3. **Docker**:
   ```dockerfile
   FROM node:16-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 5000
   CMD ["node", "server.js"]
   ```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request


## 👤 Author

**Akash Adhya**
- GitHub: [@Akash-Adhya](https://github.com/Akash-Adhya)


---
