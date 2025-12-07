import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ pagination, onPageChange, onNextPage, onPreviousPage, loading }) => {
  if (!pagination) {
    return null;
  }

  const { currentPage, totalPages, pageSize, totalItems } = pagination;

  return (
    <div className="pagination">
      <div className="pagination-info">
        <span>
          Page {currentPage} of {totalPages} | Total: {totalItems} items
        </span>
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={onPreviousPage}
          disabled={!pagination.hasPreviousPage || loading}
          title="Previous Page"
        >
          ← Previous
        </button>

        <div className="pagination-pages">
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                className={`page-btn ${pageNum === currentPage ? 'active' : ''}`}
                onClick={() => onPageChange(pageNum)}
                disabled={loading}
              >
                {pageNum}
              </button>
            );
          })}
          {totalPages > 5 && <span className="pagination-ellipsis">...</span>}
        </div>

        <button
          className="pagination-btn"
          onClick={onNextPage}
          disabled={!pagination.hasNextPage || loading}
          title="Next Page"
        >
          Next →
        </button>
      </div>

      <div className="page-size-info">
        <span>{pageSize} items per page</span>
      </div>
    </div>
  );
};

export default Pagination;
