import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // We'll update this next

/**
 * Renders the global application header with icon and title.
 *
 * @returns {JSX.Element} The Header component.
 */
const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="header-title-link">
          {/* Add the icon before the title */}
          <span className="header-icon" role="img" aria-label="podcast icon">🎙️</span>
          <span className="header-title">Podcast App</span>
        </Link>
        {/* We can add search/profile icons here later */}
      </div>
    </header>
  );
};

export default Header;