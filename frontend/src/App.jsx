import React from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SortingDropdown from './components/SortingDropdown';
import TransactionTable from './components/TransactionTable';
import Pagination from './components/Pagination';
import ActiveFilters from './components/ActiveFilters';
import useTransactions from './hooks/useTransactions';
import './styles/App.css';

function App() {
  const {
    transactions,
    pagination,
    filterOptions,
    loading,
    error,
    searchTerm,
    filters,
    sortBy,
    sortOrder,
    currentPage,
    handleSearch,
    handleFilterChange,
    handleSort,
    goToPage,
    goNextPage,
    goPreviousPage,
    clearFilters
  } = useTransactions();

  const activeFiltersCount = Object.keys(filters).filter(key => {
    const value = filters[key];
    return value && (Array.isArray(value) ? value.length > 0 : Object.keys(value).length > 0);
  }).length;

  return (
    <div className="app">
      <div className="app-container">
        {/* Header */}
        <div className="app-header">
          <h1>🛍️ Retail Sales Management System</h1>
          <p></p>
        </div>

        {/* Main Layout */}
        <div className="main-layout">
          {/* Filter Section */}
          <aside className="filter-section">
            <FilterPanel
              filterOptions={filterOptions}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </aside>

          {/* Content Section */}
          <main className="content-section">
            {/* Search Bar */}
            <SearchBar
              searchTerm={searchTerm}
              onSearch={handleSearch}
              onClear={() => handleSearch('')}
            />

            {/* Active Filters Display */}
            {(searchTerm || activeFiltersCount > 0) && (
              <ActiveFilters
                searchTerm={searchTerm}
                filters={filters}
                activeFiltersCount={activeFiltersCount}
                onClearFilters={clearFilters}
              />
            )}

            {/* Content Header */}
            <div className="content-header">
              <div className="content-header-left">
                <div className="results-info">
                  {searchTerm && <strong>Search:</strong>} {searchTerm || '(All)'} 
                  {activeFiltersCount > 0 && <span> • {activeFiltersCount} active filters</span>}
                </div>
              </div>
              <div className="content-header-right">
                <SortingDropdown
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
              </div>
            </div>

            {/* Transaction Table */}
            <TransactionTable
              transactions={transactions}
              sortBy={sortBy}
              sortOrder={sortOrder}
              loading={loading}
              error={error}
            />

            {/* Pagination */}
            <Pagination
              pagination={pagination}
              onPageChange={goToPage}
              onNextPage={goNextPage}
              onPreviousPage={goPreviousPage}
              loading={loading}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
