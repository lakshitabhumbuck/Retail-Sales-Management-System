# Retail Sales Management System - Architecture Documentation

## Overview

The Retail Sales Management System is a full-stack application designed to manage and analyze retail sales transactions with advanced search, filtering, sorting, and pagination capabilities. 

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (HTTP server)
- **Language**: JavaScript (ES Modules)


### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Styling**: CSS3 with CSS Variables


## Backend Architecture

### Project Structure

```
backend/
├── src/
│   ├── controllers/          # Request handlers
│   │   └── SalesController.js
│   ├── services/             # Business logic
│   │   └── SalesService.js
│   ├── routes/               # API route definitions
│   │   └── salesRoutes.js
│   ├── models/               # Data models
│   │   └── sampleData.js
│   ├── utils/                # Utility functions
│   │   └── dataProcessor.js
│   └── index.js              # Server entry point
├── package.json
└── README.md
```

### Layer Responsibilities

#### 1. **Controllers Layer** (SalesController.js)
- Handles HTTP request/response cycle
- Validates query parameters
- Calls service methods
- Returns JSON responses with proper status codes
- Manages error responses

Key Methods:
- `getTransactions()` - Fetch transactions with filters
- `getFilterOptions()` - Get available filter values
- `getTransactionById()` - Fetch single transaction
- `getSummary()` - Get statistics
- `search()` - Simplified search

#### 2. **Services Layer** (SalesService.js)
- Contains business logic
- Orchestrates utility functions
- Manages data operations
- Provides high-level APIs for controllers

Key Methods:
- `getTransactions(params)` - Applies search, filters, sort, and pagination in sequence
- `getFilterOptions()` - Extracts unique values for filter dropdowns
- `getTransactionById(id)` - Finds transaction by ID
- `getSummary()` - Calculates summary statistics
- `search(term, page, pageSize)` - Simplified search API

#### 3. **Utils Layer** (dataProcessor.js)
- Pure utility functions for data manipulation
- No side effects
- Highly reusable and testable

Key Functions:
- `performSearch(data, term, fields)` - Case-insensitive full-text search
- `applyFilters(data, filters)` - Applies all filter types
- `applySorting(data, sortBy, sortOrder)` - Sorts data
- `paginate(data, page, pageSize)` - Paginates results
- `getUniqueValues(data, field)` - Extracts unique values

#### 4. **Models Layer** (sampleData.js)
- Static dataset for demonstration
- Can be replaced with database queries
- Contains 10+ sample transactions with all required fields

#### 5. **Routes Layer** (salesRoutes.js)
- Express router with API endpoints
- Maps HTTP methods to controller actions
- Creates service instance
- Exports router for use in main server

### Data Flow

```
HTTP Request
    ↓
Routes (salesRoutes.js) - Route matching
    ↓
Controllers (SalesController) - Parameter validation
    ↓
Services (SalesService) - Business logic orchestration
    ↓
Utils (dataProcessor) - Data manipulation
    ↓
Data (sampleData) - Source data
    ↓
Utils - Process data (search → filter → sort → paginate)
    ↓
Services - Return processed result
    ↓
Controllers - Format response
    ↓
Routes - Send JSON response
    ↓
HTTP Response
```

### API Endpoints

```
GET /api/transactions
- Query Parameters: search, filters, sortBy, sortOrder, page, pageSize
- Returns: Paginated transactions with metadata

GET /api/filters/options
- Returns: Available filter values (regions, genders, categories, etc.)

GET /api/search
- Query Parameters: q, page, pageSize
- Returns: Search results with pagination

GET /api/summary
- Returns: Summary statistics (total transactions, amounts, etc.)

GET /api/transactions/:id
- Returns: Single transaction by ID
```

## Frontend Architecture

### Project Structure

```
frontend/
├── src/
│   ├── components/           # Reusable React components
│   │   ├── SearchBar.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── SortingDropdown.jsx
│   │   ├── TransactionTable.jsx
│   │   └── Pagination.jsx
│   ├── services/             # API communication
│   │   └── api.js
│   ├── hooks/                # Custom React hooks
│   │   └── useTransactions.js
│   ├── styles/               # CSS styles
│   │   ├── globals.css
│   │   ├── App.css
│   │   ├── SearchBar.css
│   │   └── ...
│   ├── App.jsx               # Root component
│   └── main.jsx              # Entry point
├── public/
├── index.html
├── vite.config.js
└── package.json
```

### Component Hierarchy

```
App (Main Container)
├── SearchBar (Search Input)
├── FilterPanel (Filter Sidebar)
│   ├── Region Filter
│   ├── Gender Filter
│   ├── Age Range Filter
│   ├── Category Filter
│   ├── Tags Filter
│   ├── Payment Method Filter
│   └── Date Range Filter
├── SortingDropdown (Sort Controls)
├── TransactionTable (Data Display)
│   └── Table Rows
└── Pagination (Page Navigation)
```

### Key Components

#### SearchBar.jsx
- Input field for search term
- Clear button functionality
- Debounced search (via parent hook)

#### FilterPanel.jsx
- Expandable filter groups
- Multi-select checkboxes
- Range input fields
- Clear all filters button

#### SortingDropdown.jsx
- Sort field selector
- Sort order toggle button
- Visual indicators

#### TransactionTable.jsx
- Responsive table display
- Formatted data (dates, currency)
- Status badges
- Loading and error states

#### Pagination.jsx
- Page navigation buttons
- Current page indicator
- Previous/Next controls
- Results summary

### Custom Hooks

#### useTransactions.js
Comprehensive state management hook providing:

**State:**
- `transactions` - Array of transaction records
- `pagination` - Pagination metadata
- `filterOptions` - Available filter values
- `loading` - Loading state
- `error` - Error messages
- `searchTerm` - Current search input
- `filters` - Applied filters object
- `sortBy` - Sort field
- `sortOrder` - Sort direction
- `currentPage` - Current page number

**Methods:**
- `handleSearch(term)` - Update search term
- `handleFilterChange(name, value)` - Update filter
- `handleSort(field)` - Toggle sort or change field
- `goToPage(page)` - Navigate to specific page
- `goNextPage()` - Go to next page
- `goPreviousPage()` - Go to previous page
- `clearFilters()` - Reset all filters and search

**Automatic Behaviors:**
- Fetches transactions when any filter changes
- Maintains state across component remounts
- Resets to page 1 when filters change


### Frontend Data Flow

```
User Interaction
    ↓
Event Handler (e.g., handleSearch, handleFilterChange)
    ↓
Hook State Update (setSearchTerm, setFilters, etc.)
    ↓
useEffect Trigger (when dependencies change)
    ↓
API Call (transactionService.getTransactions)
    ↓
HTTP Request to Backend
    ↓
Receive Response
    ↓
Update State (setTransactions, setPagination)
    ↓
Component Re-render
    ↓
UI Update
```




# Module Responsibilities

## Backend

| Module     | Responsibility                               |
| ---------- | -------------------------------------------- |
| Controller | Handles HTTP requests, calls service methods |
| Service    | Applies search, filter, sort, pagination     |
| Utils      | Pure functions for data processing           |
| Data       | Dataset storage                              |
| Routes     | Maps endpoints to controllers                |
| Index.js   | Server setup and initialization              |

## Frontend

| Module      | Responsibility                               |
| ----------- | -------------------------------------------- |
| Components  | UI elements (SearchBar, Filters, Table, etc) |
| Custom Hook | Manages frontend state and API calls         |
| Services    | Handles communication with backend           |
| Styles      | CSS for layout and design                    |


