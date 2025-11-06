import React from 'react';
import './Pagination.css';

/**
 * A component for rendering pagination controls.
 *
 * @param {object} props
 * @param {number} props.currentPage - The current active page.
 * @param {number} props.totalPageCount - The total number of pages.
 * @param {function} props.onPageChange - Function to call when page changes.
 * @returns {JSX.Element} The pagination component.
 */
const Pagination = ({ currentPage, totalPageCount, onPageChange }) => {
  if (totalPageCount <= 1) {
    return null; // Don't render pagination if there's only one page
  }

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &larr; Previous
      </button>
      <span className="pagination-info">
        Page {currentPage} of {totalPageCount}
      </span>
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPageCount}
      >
        Next &rarr;
      </button>
    </div>
  );
};

export default Pagination;