import React, { createContext, useState, useMemo } from 'react';

/**
 * Creates a context for managing and persisting filter state across the application.
 * (Properties are documented in the contextValue)
 */
export const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('A-Z');
  // We'll use this for the new genre filter
  const [genreId, setGenreId] = useState(null);
  // New state for pagination
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Resets all filters to their default state.
   */
  const clearFilters = () => {
    setSearchTerm('');
    setSortOrder('A-Z');
    setGenreId(null);
    setCurrentPage(1); // Also reset the page
  };

  const contextValue = useMemo(() => ({
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
    genreId,
    setGenreId,
    currentPage,
    setCurrentPage,
    clearFilters,
  }), [searchTerm, sortOrder, genreId, currentPage]); // Add new state to dependencies

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};