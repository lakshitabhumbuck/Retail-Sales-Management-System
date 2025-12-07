# Retail Sales Management System - Frontend

Modern React frontend for the Retail Sales Management System with real-time search, filtering, sorting, and pagination.

## Features

- **Real-time Search** - Full-text search on customer name and phone number
- **Advanced Filters** - Multi-select dropdowns and range filters
- **Smart Sorting** - Sort by date, quantity, or customer name
- **Responsive Pagination** - Page navigation with status indicators
- **Clean UI** - Professional, intuitive interface
- **State Management** - Custom hook for efficient state handling

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx          # Search input component
│   │   ├── FilterPanel.jsx        # Filter options sidebar
│   │   ├── SortingDropdown.jsx    # Sort controls
│   │   ├── TransactionTable.jsx   # Main data table
│   │   └── Pagination.jsx         # Pagination controls
│   ├── pages/
│   ├── services/
│   │   └── api.js                 # API communication
│   ├── hooks/
│   │   └── useTransactions.js     # State management hook
│   ├── styles/
│   │   ├── globals.css            # Global styles
│   │   ├── App.css                # App layout styles
│   │   ├── SearchBar.css
│   │   ├── FilterPanel.css
│   │   ├── SortingDropdown.css
│   │   ├── TransactionTable.css
│   │   └── Pagination.css
│   ├── App.jsx                    # Root component
│   └── main.jsx                   # Entry point
├── public/
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Installation

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Frontend

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

Frontend will run on `http://localhost:3000`

## Features Overview

### Search
- Case-insensitive full-text search
- Search in customer name and phone number
- Works alongside filters and sorting
- Clear button to reset search

### Filters
- **Customer Region** - Multi-select filter
- **Gender** - Multi-select filter
- **Age Range** - Min/Max range selector
- **Product Category** - Multi-select filter
- **Tags** - Multi-select filter
- **Payment Method** - Multi-select filter
- **Date Range** - Date picker for start and end dates
- **Clear All** button to reset all filters

### Sorting
- Sort by Date (Newest First)
- Sort by Quantity
- Sort by Customer Name (A-Z)
- Toggle ascending/descending order

### Pagination
- 10 items per page
- Page navigation buttons
- Current page indicator
- Previous/Next buttons
- Total items count

## Component Documentation

### SearchBar
Handles search input with clear functionality.

### FilterPanel
Collapsible filter groups with multi-select checkboxes and range inputs.

### SortingDropdown
Sort field selector with order toggle button.

### TransactionTable
Responsive table displaying transaction data with status indicators.

### Pagination
Navigation controls with page indicators and status information.

## Styling

- Custom CSS with CSS variables for theming
- Responsive design for mobile and desktop
- Smooth transitions and hover effects
- Accessible color schemes



