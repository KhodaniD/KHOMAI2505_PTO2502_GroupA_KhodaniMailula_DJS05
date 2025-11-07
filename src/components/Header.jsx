import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

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
          {/* The icon is hidden from screen readers (aria-hidden) 
            because it's decorative and the title provides context.
          */}
          <span className="header-icon" aria-hidden="true">🎙️</span>
          <span className="header-title">Podcast App</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;