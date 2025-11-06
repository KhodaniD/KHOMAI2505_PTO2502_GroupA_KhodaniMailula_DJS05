import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShowDetailPage from './pages/ShowDetailPage';
import { FilterProvider } from './context/FilterContext';
import Header from './components/Header'; // 1. Import the Header

/**
 * Main application component.
 * Sets up the application's routing, header, and global state.
 *
 * @returns {JSX.Element} The App component.
 */
function App() {
  return (
    <> {/* 2. Use a Fragment to wrap everything */}
      <Header /> {/* 3. Add the Header here, outside the Provider */}
      <FilterProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/show/:showId" element={<ShowDetailPage />} />
        </Routes>
      </FilterProvider>
    </>
  );
}

export default App;