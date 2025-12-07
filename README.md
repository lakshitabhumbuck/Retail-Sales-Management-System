# Retail Sales Management System

 Retail Sales Management System is a sales data management platform that enables efficient browsing and analysis of retail transactions. The system provides real-time search, multi-select filtering, dynamic sorting, and responsive pagination for seamless data exploration.

## Tech Stack

### Backend
- Node.js with Express.js
- Pure JavaScript (ES Modules)
- CORS enabled for frontend integration

### Frontend
- React 18 with Vite
- Axios for HTTP requests
- CSS3 with responsive design


## Search Implementation Summary

**Approach:**  
Employed a **case-insensitive, full-text search** mechanism to enable users to quickly find relevant transactions. 

**Implementation Details:**
- **Fields Searched:** Customer Name, Phone Number (configurable to extend to other fields)
- **Case-insensitive Matching:** Both input and dataset values are converted to lowercase before comparison to avoid missing results due to case differences.
- **Substring Matching:** Uses `String.includes()` to allow partial matches, improving usability (e.g., typing "Neha" will match "Neha Yadav").
- **Integration with Filters:** Works in conjunction with active filters, applying an **AND logic** between search results and filtered datasets.
- **Interaction with Sorting & Pagination:** Search results are fully compatible with sorting and pagination workflows; selecting a new search term automatically updates the paginated dataset.
- **UI Behavior:** Provides a clear search input field with a **dedicated "Clear Search" button** for resetting results without affecting active filters.

**Key Code Example:**
```javascript
export const performSearch = (data, searchTerm, searchFields) => {
  const lowerSearchTerm = searchTerm.toLowerCase();
  return data.filter(record => {
    return searchFields.some(field => {
      const fieldValue = record[field];
      return String(fieldValue).toLowerCase().includes(lowerSearchTerm);
    });
  });
};
```


## Filter Implementation Summary

**Approach:**  
Implemented a **multi-layered filtering system** that allows users to refine transaction results using both **multi-select categorical filters** and **range-based filters**. 

**Supported Filters:**
1. **Customer Region** – Multi-select dropdown (North, South, East, West)  
2. **Gender** – Multi-select dropdown (Male, Female)  
3. **Age Range** – Minimum and maximum numeric inputs  
4. **Product Category** – Multi-select dropdown for product categories  
5. **Tags** – Multi-select dropdown for tags/labels  
6. **Payment Method** – Multi-select dropdown (Card, UPI, EMI)  
7. **Date Range** – Start and End date pickers  

**Filter Logic & Behavior:**
- **OR logic within a filter:** A record matches if it satisfies any of the selected values within that filter (e.g., Region = North **OR** South).  
- **AND logic across filters:** A record must satisfy all active filters to appear in the result set (e.g., Region = North **AND** Gender = Female).  
- **Sequential Application:** Filters are applied one after another in a defined sequence to ensure predictable results.  
- **UI Enhancements:** Filters are grouped and collapsible for better organization; a **"Clear All Filters" button** resets filters without affecting search input.  
- Fully integrated with **search and sorting**, so changing a filter dynamically updates the displayed transactions.  


**Key Code Example:**
```javascript
export const applyFilters = (data, filters = {}) => {
  let filtered = [...data];
  
  // Filter by Region
  if (filters.regions?.length > 0) {
    filtered = filtered.filter(r => filters.regions.includes(r.customerRegion));
  }
  
  // Filter by Age Range
  if (filters.ageRange?.min !== undefined) {
    filtered = filtered.filter(r => 
      r.age >= filters.ageRange.min && r.age <= filters.ageRange.max
    );
  }
  
  // Additional filters (Gender, Category, Tags, Payment Method, Date Range) applied sequentially
  return filtered;
};

## Sorting Implementation Summary

**Approach:**  
Implemented a **dynamic, multi-field sorting system** that allows users to order transaction data by **Date, Quantity, or Customer Name**. Sorting is **toggleable between ascending and descending order**, ensuring flexibility in how results are viewed. 

**Supported Sort Fields:**
1. **Date** – Temporal sorting, newest first by default  
2. **Quantity** – Numeric sorting (low to high or high to low)  
3. **Customer Name** – Alphabetical sorting (A-Z or Z-A)  

**Sort Order & Behavior:**
- **Toggleable order:** Users can click on the sort field to switch between ascending and descending.  
- **State preservation:** Sort state persists even when filters or search terms change.  
- **Pagination integration:** Sorted results maintain correct page indices without resetting unexpectedly.  
- **UI feedback:** Sort direction indicator (arrow icon) reflects the current order.  
- **Sequential integration:** Sorting is applied **after search and filters** to ensure accurate display of filtered data.

**Performance Considerations:**
- Sorting uses JavaScript's `Array.sort()` for efficient in-memory sorting.  
- Works well for moderate datasets; large datasets can be optimized with server-side sorting.

**Key Code Example:**
```javascript
export const applySorting = (data, sortBy = 'date', sortOrder = 'desc') => {
  const sorted = [...data];
  
  switch (sortBy) {
    case 'date':
      sorted.sort((a, b) => 
        sortOrder === 'desc' 
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date)
      );
      break;

    case 'quantity':
      sorted.sort((a, b) => 
        sortOrder === 'desc'
          ? b.quantity - a.quantity
          : a.quantity - b.quantity
      );
      break;

    case 'customerName':
      sorted.sort((a, b) => {
        const nameA = a.customerName.toLowerCase();
        const nameB = b.customerName.toLowerCase();
        if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1;
        if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
      break;

    default:
      break;
  }

  return sorted;
};


## Pagination Implementation Summary

**Approach:**  
Implemented **stateless server-side pagination** complemented by **client-side state management**. This ensures efficient handling of large datasets while maintaining fast, responsive UI updates. 

**Pagination Details:**
- **Page Size:** 10 items per page (fixed for consistent UX)  
- **Navigation Controls:** Previous and Next buttons  
- **Page Indicators:** Displays current page, total pages, and total items  
- **State Preservation:** Maintains applied search, filters, and sort state when navigating between pages  
- **Direct Navigation:** Supports jumping to a specific page if needed  

**Behavior:**
- Previous button is **disabled on the first page**  
- Next button is **disabled on the last page**  
- Applying a new search term or filter **resets pagination to page 1**  
- UI updates dynamically without full page reloads  
- Supports smooth integration with table rendering and dynamic data updates  

**Performance Considerations:**
- Uses **array slicing (`Array.slice`)** for fast client-side pagination  
- Lightweight and efficient for moderate dataset sizes  
- Server-side pagination can be integrated for larger datasets  

**Key Code Example:**
```javascript
export const paginate = (data, page = 1, pageSize = 10) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  return {
    data: data.slice(startIndex, endIndex),
    pagination: {
      currentPage: page,
      pageSize,
      totalItems: data.length,
      totalPages: Math.ceil(data.length / pageSize),
      hasNextPage: endIndex < data.length,
      hasPreviousPage: page > 1
    }
  };
};


## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm run dev    
# OR
npm start     
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`


