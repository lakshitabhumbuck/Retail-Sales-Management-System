# Retail Sales Management System - Backend

This is the backend service for the Retail Sales Management System, providing REST APIs for sales transactions with advanced search, filtering, sorting, and pagination capabilities.

## Features

- **RESTful API** with Express.js
- **Advanced Search** - Full-text search on customer name and phone number
- **Multi-Select Filtering** - Filter by region, gender, category, tags, payment method
- **Range Filtering** - Age range and date range filters
- **Sorting** - Sort by date, quantity, and customer name
- **Pagination** - Configurable page size with next/previous navigation
- **CORS Enabled** - Ready for frontend integration

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── SalesController.js      # Request handlers
│   ├── services/
│   │   └── SalesService.js         # Business logic
│   ├── utils/
│   │   └── dataProcessor.js        # Search, filter, sort, paginate utilities
│   ├── routes/
│   │   └── salesRoutes.js          # API route definitions
│   ├── models/
│   │   └── sampleData.js           # Sample dataset
│   └── index.js                    # Server entry point
├── package.json
└── README.md
```

## Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Get Transactions
```
GET /api/transactions?search=&filters={}&sortBy=date&sortOrder=desc&page=1&pageSize=10
```

### Get Filter Options
```
GET /api/filters/options
```

### Search Transactions
```
GET /api/search?q=&page=1&pageSize=10
```

### Get Summary
```
GET /api/summary
```

### Get Transaction by ID
```
GET /api/transactions/:id
```

## Query Parameters

- `search` - Search term (searched in customer name and phone number)
- `filters` - JSON object with filter criteria
- `sortBy` - Sort field (date, quantity, customerName)
- `sortOrder` - Sort order (asc, desc)
- `page` - Page number (default: 1)
- `pageSize` - Items per page (default: 10)

## Filter Object Structure

```javascript
{
  "regions": ["North", "South"],
  "genders": ["Male", "Female"],
  "ageRange": { "min": 20, "max": 40 },
  "categories": ["Clothing", "Accessories"],
  "tags": ["Fashion", "Casual"],
  "paymentMethods": ["Card", "UPI"],
  "dateRange": { "startDate": "2023-09-01", "endDate": "2023-09-30" }
}
```

## Example Requests

### Search with filters and pagination
```
GET /api/transactions?search=Neha&filters={"regions":["South"]}&sortBy=date&sortOrder=desc&page=1&pageSize=10
```

### Get filtered transactions
```
GET /api/transactions?filters={"genders":["Female"],"ageRange":{"min":20,"max":35}}&page=1
```

### Sort by quantity
```
GET /api/transactions?sortBy=quantity&sortOrder=desc&page=1
```
