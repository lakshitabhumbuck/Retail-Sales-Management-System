// Custom hook for managing transactions with search, filters, sort, pagination
import { useState, useEffect, useCallback } from 'react';
import { transactionService } from '../services/api';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [filterOptions, setFilterOptions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for search, filters, sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch transactions
  const fetchTransactions = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const result = await transactionService.getTransactions({
        search: searchTerm,
        filters,
        sortBy,
        sortOrder,
        page,
        pageSize: 10
      });

      setTransactions(result.data);
      setPagination(result.pagination);
      setCurrentPage(page);
    } catch (err) {
      setError(err.message || 'Error fetching transactions');
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filters, sortBy, sortOrder]);

  // Fetch filter options
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const result = await transactionService.getFilterOptions();
        setFilterOptions(result.data);
      } catch (err) {
        console.error('Error loading filter options:', err);
      }
    };
    loadFilterOptions();
  }, []);

  // Fetch transactions when params change
  useEffect(() => {
    setCurrentPage(1);
    fetchTransactions(1);
  }, [searchTerm, filters, sortBy, sortOrder, fetchTransactions]);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Handle sort
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Handle pagination
  const goToPage = (page) => {
    if (pagination && page >= 1 && page <= pagination.totalPages) {
      fetchTransactions(page);
    }
  };

  const goNextPage = () => {
    if (pagination?.hasNextPage) {
      goToPage(currentPage + 1);
    }
  };

  const goPreviousPage = () => {
    if (pagination?.hasPreviousPage) {
      goToPage(currentPage - 1);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setFilters({});
    setSortBy('date');
    setSortOrder('desc');
  };

  return {
    // Data
    transactions,
    pagination,
    filterOptions,
    loading,
    error,

    // State
    searchTerm,
    filters,
    sortBy,
    sortOrder,
    currentPage,

    // Handlers
    handleSearch,
    handleFilterChange,
    handleSort,
    goToPage,
    goNextPage,
    goPreviousPage,
    clearFilters,

    // Utilities
    setFilters,
    setSortBy,
    setSortOrder
  };
};

export default useTransactions;
